# DEPLOYMENT GUIDE

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này hướng dẫn deployment cho Tutor, bao gồm infrastructure setup, CI/CD pipeline, deployment steps, và rollback procedures.

## Infrastructure Overview

### Architecture
```
┌─────────────────┐
│   Load Balancer │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│ Core  │ │  AI   │
│Service│ │Service│
└───┬───┘ └───┬───┘
    │         │
    └────┬────┘
         │
┌────────▼────────┐
│   PostgreSQL    │
└─────────────────┘

┌─────────────────┐
│  Object Storage │
│   (S3/MinIO)    │
└─────────────────┘
```

### Components
- **Core Service:** Java Spring Boot (port 8080)
- **AI Service:** Python FastAPI (port 8001)
- **Database:** PostgreSQL 15
- **Object Storage:** S3-compatible (MinIO cho dev, AWS S3 cho prod)
- **Load Balancer:** Nginx hoặc cloud load balancer

## Docker Setup

### Dockerfile – Core Service
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/core-service-1.0.0.jar"]
```

### Dockerfile – AI Service
```dockerfile
FROM python:3.11-slim
WORKDIR /app
RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false && \
    poetry install --no-dev
COPY . .
EXPOSE 8001
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
```

## Database Deployment

### Initial Setup
```bash
# 1. Create database
psql -U postgres -c "CREATE DATABASE tutor_db;"

# 2. Run migrations
cd core-service
mvn flyway:migrate
```

### Backup Strategy
- Daily backups, keep 30 days
- Automated backup scripts
- Test restore procedures regularly

## CI/CD Pipeline

### GitHub Actions
- Build and test on push
- Deploy to staging on merge to develop
- Deploy to production on merge to main

## Deployment Steps

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Database migrations ready
- [ ] Environment variables configured
- [ ] Secrets updated
- [ ] Backup database
- [ ] Notify team

### Deployment Process
```bash
# 1. Pull latest code
git pull origin main

# 2. Build Docker images
docker-compose -f docker-compose.prod.yml build

# 3. Run database migrations
docker-compose -f docker-compose.prod.yml run --rm core-service mvn flyway:migrate

# 4. Start services
docker-compose -f docker-compose.prod.yml up -d

# 5. Verify health
curl http://localhost:8080/actuator/health
curl http://localhost:8001/health
```

## Rollback Procedures

### Quick Rollback
```bash
# 1. Stop current containers
docker-compose -f docker-compose.prod.yml down

# 2. Checkout previous version
git checkout <previous-commit-hash>

# 3. Rebuild and start
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# 4. Rollback database (if needed)
docker-compose -f docker-compose.prod.yml run --rm core-service mvn flyway:repair
```

## Monitoring & Logging

### Health Check Endpoints
- **Core Service:** `GET /actuator/health`
- **AI Service:** `GET /health`

### Logging
- Structured logging (JSON format)
- Centralized logging (ELK stack, CloudWatch, etc.)
- Log levels: DEBUG (dev), INFO (staging), WARN (prod)

### Metrics
- API response time
- Error rate
- Database connection pool
- AI Service latency
- Request count

## Security

### SSL/TLS
- Use Let's Encrypt for free SSL certificates
- Auto-renew certificates
- Force HTTPS redirect

### Firewall
- Allow only necessary ports (80, 443, 22)
- Restrict access to internal services

### Secrets Management
- Never commit secrets to git
- Use environment variables or secrets manager
- Rotate secrets regularly

## Scaling

### Horizontal Scaling
- Multiple instances of Core Service
- Load balancer distribution
- Database read replicas

## Disaster Recovery

### Backup Strategy
- **Database:** Daily backups, keep 30 days
- **Files:** S3 versioning enabled
- **Configuration:** Version controlled

### Recovery Procedures
1. Restore database from backup
2. Restore files from S3
3. Redeploy application
4. Verify functionality

## Tài liệu liên quan

- [System Architecture](./system-architecture.md)
- [Database Schema](./database-schema.md)
- [Flyway Migration Notes](./flyway-migration-notes.md)
- [Development Setup](../01-getting-started/development-setup.md)

---

← Quay lại: [README.md](../README.md)

