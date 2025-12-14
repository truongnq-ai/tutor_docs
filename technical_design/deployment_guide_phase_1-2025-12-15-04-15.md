# DEPLOYMENT GUIDE – PHASE 1 (MVP)

**Project:** Tutor  
**Document type:** Technical Design  
**Audience:** DevOps / Backend Developer  
**Status:** Draft  
**Version:** 2025-12-15-04-15  
**Author:** Product Consultant (ChatGPT)


---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này hướng dẫn **deployment** cho Tutor – Phase 1, bao gồm:
- Infrastructure setup (Docker, PostgreSQL, S3)
- Environment variables configuration
- CI/CD pipeline
- Deployment steps
- Rollback procedures
- Monitoring và logging setup
- Health check endpoints

Tài liệu này đảm bảo deployment nhất quán và có thể reproduce được.

---


## 2. INFRASTRUCTURE OVERVIEW

### 2.1. Architecture

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

### 2.2. Components

- **Core Service:** Java Spring Boot (port 8080)
- **AI Service:** Python FastAPI (port 8001)
- **Database:** PostgreSQL 15
- **Object Storage:** S3-compatible (MinIO cho dev, AWS S3 cho prod)
- **Load Balancer:** Nginx hoặc cloud load balancer

---


## 3. DOCKER SETUP

### 3.1. Dockerfile – Core Service

**File:** `core-service/Dockerfile`

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build application
RUN ./mvnw clean package -DskipTests

# Run application
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/core-service-1.0.0.jar"]
```

---

### 3.2. Dockerfile – AI Service

**File:** `ai-service/Dockerfile`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy dependency files
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry config virtualenvs.create false && \
    poetry install --no-dev

# Copy source code
COPY . .

# Expose port
EXPOSE 8001

# Run application
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
```

---

### 3.3. Docker Compose – Production

**File:** `docker-compose.prod.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: tutor-postgres
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - tutor-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  core-service:
    build:
      context: ./core-service
      dockerfile: Dockerfile
    container_name: tutor-core
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/${DB_NAME}
      - SPRING_DATASOURCE_USERNAME=${DB_USER}
      - SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
      - AI_SERVICE_URL=http://ai-service:8001
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - tutor-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  ai-service:
    build:
      context: ./ai-service
      dockerfile: Dockerfile
    container_name: tutor-ai
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - CORE_SERVICE_URL=http://core-service:8080
    networks:
      - tutor-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    container_name: tutor-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - core-service
      - ai-service
    networks:
      - tutor-network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  tutor-network:
    driver: bridge
```

---

## 4. DATABASE DEPLOYMENT

### 4.1. Initial Setup

```bash
# 1. Create database
psql -U postgres -c "CREATE DATABASE tutor_db;"

# 2. Run migrations
cd core-service
mvn flyway:migrate

# Hoặc với Docker
docker exec -it tutor-postgres psql -U tutor -d tutor_db -f /migrations/V1__Initial_schema.sql
```

### 4.2. Backup Strategy

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DATE}.sql"

pg_dump -U tutor -d tutor_db > /backups/${BACKUP_FILE}
gzip /backups/${BACKUP_FILE}

# Keep only last 7 days
find /backups -name "backup_*.sql.gz" -mtime +7 -delete
```

---

## 5. CI/CD PIPELINE

### 5.1. GitHub Actions

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      
      - name: Build Core Service
        run: |
          cd core-service
          mvn clean package -DskipTests
      
      - name: Run Tests
        run: |
          cd core-service
          mvn test
      
      - name: Build Docker Image
        run: |
          docker build -t tutor-core:latest ./core-service
      
      - name: Push to Registry
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
          docker push tutor-core:latest

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /opt/tutor
            docker-compose pull
            docker-compose up -d
            docker-compose exec core-service mvn flyway:migrate
```

---

## 6. DEPLOYMENT STEPS

### 6.1. Pre-deployment Checklist

- [ ] All tests passing
- [ ] Database migrations ready
- [ ] Environment variables configured
- [ ] Secrets updated
- [ ] Backup database
- [ ] Notify team

### 6.2. Deployment Process

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

# 6. Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 6.3. Blue-Green Deployment (Optional)

```bash
# Deploy to green environment
docker-compose -f docker-compose.green.yml up -d

# Test green environment
curl http://green.tutor.app/actuator/health

# Switch traffic (update load balancer)
# Shutdown blue environment
docker-compose -f docker-compose.blue.yml down
```

---

## 7. ROLLBACK PROCEDURES

### 7.1. Quick Rollback

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

### 7.2. Database Rollback

```bash
# Restore from backup
psql -U tutor -d tutor_db < backup_20251215.sql

# Hoặc với Flyway
mvn flyway:repair
```

---

## 8. MONITORING & LOGGING

### 8.1. Health Check Endpoints

**Core Service:**
```
GET /actuator/health
GET /actuator/info
GET /actuator/metrics
```

**AI Service:**
```
GET /health
GET /metrics
```

### 8.2. Logging

**Log Levels:**
- Development: `DEBUG`
- Staging: `INFO`
- Production: `WARN`

**Log Aggregation:**
- Use centralized logging (ELK stack, CloudWatch, etc.)
- Structured logging (JSON format)

**Example:**
```java
logger.info("Practice submitted", Map.of(
    "studentId", studentId,
    "skillId", skillId,
    "isCorrect", isCorrect
));
```

### 8.3. Metrics

**Key Metrics:**
- API response time
- Error rate
- Database connection pool
- AI Service latency
- Request count

**Tools:**
- Prometheus + Grafana
- CloudWatch (AWS)
- Application Insights (Azure)

---

## 9. NGINX CONFIGURATION

**File:** `nginx/nginx.conf`

```nginx
upstream core_service {
    server core-service:8080;
}

upstream ai_service {
    server ai-service:8001;
}

server {
    listen 80;
    server_name api.tutor.app;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.tutor.app;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # API routes
    location /api/ {
        proxy_pass http://core_service;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Internal AI Service
    location /internal/ai/ {
        proxy_pass http://ai_service;
        allow 10.0.0.0/8;  # Internal network only
        deny all;
    }

    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

---

## 10. SECURITY

### 10.1. SSL/TLS

- Use Let's Encrypt for free SSL certificates
- Auto-renew certificates
- Force HTTPS redirect

### 10.2. Firewall

```bash
# Allow only necessary ports
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH
ufw enable
```

### 10.3. Secrets Management

- Never commit secrets to git
- Use environment variables or secrets manager
- Rotate secrets regularly

---

## 11. SCALING

### 11.1. Horizontal Scaling

```yaml
# docker-compose.prod.yml
services:
  core-service:
    deploy:
      replicas: 3
    # ...
```

### 11.2. Database Scaling

- Read replicas cho reporting
- Connection pooling
- Query optimization

---

## 12. DISASTER RECOVERY

### 12.1. Backup Strategy

- **Database:** Daily backups, keep 30 days
- **Files:** S3 versioning enabled
- **Configuration:** Version controlled

### 12.2. Recovery Procedures

1. Restore database from backup
2. Restore files from S3
3. Redeploy application
4. Verify functionality

---

## 13. TÀI LIỆU LIÊN QUAN

- [Environment Configuration](./environment_config_phase_1-2025-12-15-04-00.md)
- [System Architecture](./system_architecture_phase_1-2025-12-15-00-21.md)
- [Development Setup Guide](./development_setup_phase_1-2025-12-15-03-00.md)

---

## 14. GHI CHÚ / TODO

- [ ] Setup monitoring dashboard (Grafana)
- [ ] Configure alerting (PagerDuty/Slack)
- [ ] Document disaster recovery procedures
- [ ] Add performance benchmarks

---

## 15. LỊCH SỬ THAY ĐỔI

- 2025-12-15-04-15: Tạo mới Deployment Guide



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)