
================================================================================
# File: 05-for-devops/deployment.md
================================================================================

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

================================================================================
# End of: 05-for-devops/deployment.md
================================================================================

================================================================================
# File: 05-for-devops/infrastructure.md
================================================================================

# INFRASTRUCTURE

Tài liệu này mô tả cấu trúc hạ tầng của hệ thống Tutor.

## Kiến trúc tổng thể

Xem chi tiết: [System Architecture](../04-for-developers/architecture/system-architecture.md)

## Các thành phần chính

### Core Service
- **Technology**: Java Spring Boot
- **Port**: 6889
- **Database**: PostgreSQL

### AI Service
- **Technology**: Python FastAPI
- **Port**: 8001
- **Dependencies**: Redis (caching)

### Frontend Services
- **Admin Dashboard**: Next.js (Port 3001)
- **Parent Dashboard**: Next.js (Port 3000)

### Student App
- **Technology**: Flutter
- **Platform**: iOS, Android

## External Services

### Firebase
- Authentication (OTP, OAuth)
- Cloud Messaging (Notifications)

### Cloudinary
- Image storage và processing

### PostgreSQL
- Primary database
- Migration: Flyway

## Monitoring & Logging

- Application logs: File-based hoặc centralized logging
- Health checks: `/health` endpoints
- Metrics: TBD

---

← Quay lại: [README.md](../README.md)



================================================================================
# End of: 05-for-devops/infrastructure.md
================================================================================

================================================================================
# File: 05-for-devops/monitoring.md
================================================================================

# MONITORING

Tài liệu này mô tả chiến lược monitoring và observability cho hệ thống Tutor.

## Health Checks

Tất cả services có endpoint `/health`:
- Core Service: `http://localhost:6889/health`
- AI Service: `http://localhost:8001/health`

## Logging

### Log Levels
- **ERROR**: Lỗi nghiêm trọng cần xử lý ngay
- **WARN**: Cảnh báo cần chú ý
- **INFO**: Thông tin hoạt động bình thường
- **DEBUG**: Thông tin debug (chỉ trong development)

### Log Format
- Structured logging (JSON format)
- Include: timestamp, level, service, message, context

## Metrics

### Application Metrics
- Request rate
- Response time
- Error rate
- Active users

### System Metrics
- CPU usage
- Memory usage
- Disk I/O
- Network I/O

## Alerts

### Critical Alerts
- Service down
- Database connection failure
- High error rate (> 5%)

### Warning Alerts
- High response time (> 5s)
- High CPU usage (> 80%)
- Low disk space (< 20%)

---

← Quay lại: [README.md](../README.md)



================================================================================
# End of: 05-for-devops/monitoring.md
================================================================================

================================================================================
# File: 06-reference/api-reference.md
================================================================================

# API REFERENCE

Tài liệu này cung cấp tham chiếu chi tiết về tất cả API endpoints.

## Core Service APIs

Xem chi tiết: [API Specification](../04-for-developers/architecture/api-specification.md)

## AI Service APIs

### Internal APIs (chỉ Core Service gọi)

- `POST /internal/ai/ocr` - OCR từ image URL
- `POST /internal/ai/solve` - Giải bài Toán (text hoặc image URL)
- `POST /internal/ai/hint` - Sinh gợi ý theo ngữ cảnh
- `POST /internal/ai/recommend` - Đề xuất skill và độ khó

## Authentication

Xem chi tiết: [Authentication Flow](../04-for-developers/architecture/sequence-diagrams.md)

## Response Format

Tất cả API trả về format:
```json
{
  "errorCode": "0000",
  "errorDetail": "Operation successful",
  "data": {...}
}
```

---

← Quay lại: [README.md](../README.md)



================================================================================
# End of: 06-reference/api-reference.md
================================================================================

================================================================================
# File: 06-reference/ai-prompts.md
================================================================================

# Math Tutor AI – Prompt Templates (Vietnamese Curriculum)

## 1. Mục đích tài liệu
Tài liệu này tập hợp các **prompt mẫu chuẩn** dùng cho hệ thống
**StudyMate Tutor AI – Gia sư Toán cá nhân hoá**.

Các prompt này được thiết kế để:
- Ép AI đóng vai **giáo viên Toán Việt Nam**
- Trình bày lời giải đúng chuẩn học đường & thi cử
- Hạn chế học sinh copy máy móc
- Hỗ trợ Adaptive Learning Engine

---


## 2. Nguyên tắc thiết kế prompt
Tất cả prompt trong tài liệu này tuân thủ các nguyên tắc sau:

1. Không dùng phương pháp ngoài chương trình phổ thông
2. Không nhảy bước trong lời giải
3. Trình bày theo cấu trúc:
   - Phân tích
   - Lời giải từng bước
   - Lưu ý
   - Kết luận
4. Ngôn ngữ phù hợp học sinh trung bình – khá
5. Ưu tiên cách giải phổ biến trong trường học Việt Nam

---


## 3. SYSTEM PROMPT – Giáo viên Toán Việt Nam (BẮT BUỘC)

```text
Bạn là một giáo viên Toán trung học tại Việt Nam,
có hơn 15 năm kinh nghiệm giảng dạy và luyện thi.

Nhiệm vụ của bạn là:
- Giải bài toán theo đúng chương trình Toán phổ thông Việt Nam
- Trình bày lời giải rõ ràng, chặt chẽ, đầy đủ từng bước
- Giải thích dễ hiểu cho học sinh trung bình – khá
- Không bỏ qua các bước biến đổi quan trọng
- Không sử dụng phương pháp ngoài chương trình học

QUY TẮC BẮT BUỘC:
1. Luôn trình bày theo cấu trúc chuẩn học đường
2. Không nhảy bước
3. Không dùng ngôn ngữ học thuật nâng cao
4. Nếu có nhiều cách giải, chọn cách phổ biến nhất trong trường
5. Nếu bài toán học sinh hay sai, phải nêu rõ lỗi sai thường gặp
``` 

## 4. USER PROMPT – Giải bài Toán theo chương trình

```text
Hãy giải bài toán sau theo đúng chương trình Toán lớp {GRADE} Việt Nam.

Thông tin bài toán:
- Môn học: Toán
- Lớp: {GRADE}
- Chương: {CHAPTER}
- Dạng bài: {PROBLEM_TYPE}

Đề bài:
{QUESTION_TEXT}

Yêu cầu:
- Trình bày đầy đủ các bước giải
- Giải thích ngắn gọn sau mỗi bước
- Kết luận rõ ràng

Ví dụ biến
- {GRADE}: 6 hoặc 7
- {CHAPTER}: Phân số
- {PROBLEM_TYPE}: Rút gọn phân số

```

## 5. OUTPUT FORMAT PROMPT – Ép định dạng lời giải

```text
Hãy trả lời theo ĐÚNG định dạng sau.
KHÔNG thêm hoặc bớt mục nào.

PHÂN TÍCH:
(Nêu dạng bài và hướng giải)

LỜI GIẢI:
(Bước 1 – có giải thích)
(Bước 2 – có giải thích)
...

LƯU Ý:
(Nêu lỗi sai học sinh thường gặp, nếu có)

KẾT LUẬN:
(Ghi đáp án cuối cùng)


```

## 6. PROMPT – Chế độ học (Anti-copy / Tutor Mode)

```text
Chỉ hiển thị MỘT bước giải tại một thời điểm.
Sau mỗi bước, hãy đặt một câu hỏi ngắn để kiểm tra
học sinh có hiểu bước đó hay không.

KHÔNG hiển thị toàn bộ lời giải cùng lúc.

Ví dụ câu hỏi
- “Tại sao ở bước này ta phải quy đồng mẫu số?”
- “Vì sao không được bỏ dấu ngoặc ở đây?”

```

## 7. PROMPT – Phát hiện điểm yếu học sinh (Skill Diagnosis)

```text
Dựa trên bài toán, lời giải và kết quả làm bài của học sinh,
hãy xác định:

1. Học sinh đang yếu ở bước nào
2. Skill Toán tương ứng (theo skill graph)
3. Nguyên nhân sai phổ biến
4. Đề xuất một dạng bài tương tự để luyện tập

```

## 8. PROMPT – Sinh bài luyện tập tương tự

```text
Hãy tạo một bài toán mới:
- Cùng skill Toán
- Cùng dạng bài
- Khác số liệu
- Mức độ khó tương đương

KHÔNG lặp lại bài toán cũ.

```

## 9. PROMPT – Mini Test đánh giá skill

```text
Hãy tạo một mini test gồm {N} câu hỏi để đánh giá
mức độ thành thạo skill sau:

- Skill ID: {SKILL_ID}
- Lớp: {GRADE}

Yêu cầu:
- Có ít nhất 1 câu kiểm tra prerequisite
- Có giới hạn thời gian
- Không cung cấp lời giải ngay

```

## 10. PROMPT – Nhận xét cho phụ huynh (Non-technical)

```text
Dựa trên kết quả học tập của học sinh,
hãy viết một đoạn nhận xét ngắn dành cho phụ huynh.

Yêu cầu:
- Không dùng thuật ngữ kỹ thuật
- Ngôn ngữ dễ hiểu
- Chỉ rõ điểm mạnh, điểm yếu
- Đưa ra khuyến nghị học tập cụ thể


```

## 11. Lưu ý triển khai thực tế

- System Prompt phải được set cố định ở backend

- User Prompt được sinh động theo bài toán

- Output Format Prompt dùng để parse & hiển thị UI

- Prompt chẩn đoán skill gắn trực tiếp với Skill Graph

## 12. Trạng thái tài liệu

- Tài liệu này là nguồn chuẩn (source of truth) cho:

- AI Service

- Adaptive Learning Engine

- Kiểm soát chất lượng nội dung Toán

---

---

- ← Quay lại: [Tài liệu tổng quan](../../README.md)

================================================================================
# End of: 06-reference/ai-prompts.md
================================================================================

================================================================================
# File: _templates/DOCUMENT_TEMPLATE.md
================================================================================

# <TÊN TÀI LIỆU>

**Project:** Tutor  
**Document type:** <PRD | User Stories | Technical Design | ...>  
**Audience:** Developer | Product | Tech  
**Status:** Draft | Review | Approved  
**Version:** <YYYY-MM-DD-HH-mm>  
**Author:** <Your name / ChatGPT>

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

(Mô tả ngắn: tài liệu này dùng để làm gì, phục vụ ai)

---

## 2. PHẠM VI

### 2.1. Trong phạm vi
- …

### 2.2. Ngoài phạm vi
- …

---

## 3. ĐỊNH NGHĨA / THUẬT NGỮ

| Thuật ngữ | Giải thích |
|---------|-----------|
| Skill | … |

---

## 4. NỘI DUNG CHÍNH

(Phần này thay đổi tuỳ loại tài liệu)

**Lưu ý**: Nếu nội dung dài (> 1000 dòng), nên chia thành nhiều file nhỏ. Xem [Document Structure Guidelines](./document-structure-guidelines.md) để biết cách tổ chức.

---

## 5. QUYẾT ĐỊNH THIẾT KẾ / GIẢ ĐỊNH

- **Decision 1**: …
- **Reason**: …

---

## 6. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Tên tài liệu](./<file>.md)
  - [Tài liệu khác](../<folder>/README.md)

---

## 7. GHI CHÚ / TODO

- [ ] Việc cần làm tiếp
- [ ] Cần xác nhận

---

[← Quay lại Overview](README.md)


================================================================================
# End of: _templates/DOCUMENT_TEMPLATE.md
================================================================================

================================================================================
# File: _templates/document-structure-guidelines.md
================================================================================

# HƯỚNG DẪN CẤU TRÚC VÀ QUẢN LÝ TÀI LIỆU

Tài liệu này mô tả các quy tắc và best practices cho việc tổ chức, cấu trúc và chia nhỏ tài liệu trong dự án Tutor.

## 1. NGUYÊN TẮC CHUNG

### 1.1. Quy tắc chia file

- **Nếu là một logic lớn**: Tạo folder riêng và chia thành nhiều file nhỏ
- **Nếu một file > 1000 dòng**: Bắt buộc phải chia nhỏ
- **Mục tiêu**: Mỗi file không quá 1000 dòng, lý tưởng < 500 dòng
- **Nội dung**: Mỗi file nên tập trung vào một chủ đề cụ thể, dễ đọc và dễ cập nhật

### 1.2. Cấu trúc folder

```
<main-folder>/
├── README.md                    # Overview file (bắt buộc)
├── <topic-1>/
│   ├── README.md               # Overview cho topic này
│   ├── <sub-topic-1>.md
│   ├── <sub-topic-2>.md
│   └── ...
├── <topic-2>/
│   ├── README.md
│   └── ...
└── <standalone-file>.md         # File độc lập nếu không cần folder
```

## 2. QUY TẮC CHIA NHỎ FILE

### 2.1. Khi nào cần chia file?

- File hiện tại > 1000 dòng
- File chứa nhiều chủ đề khác nhau (mỗi chủ đề nên là một file riêng)
- File quá dài gây khó khăn trong việc đọc và cập nhật
- Logic phức tạp cần tách thành các phần riêng biệt

### 2.2. Cách chia file

#### Theo chủ đề (Topic-based)
```
user-stories/
├── README.md
├── student/
│   ├── README.md
│   ├── onboarding.md
│   ├── learning-path.md
│   └── ...
└── parent/
    ├── README.md
    ├── authentication.md
    └── ...
```

#### Theo workflow (Workflow-based)
```
exercise-management/
├── README.md
├── manual-form.md
├── csv-import.md
├── image-upload.md
└── ...
```

#### Theo technical layer (Layer-based)
```
coding-standards/
├── README.md
├── code-structure.md
├── api-client.md
├── database-schema.md
└── ...
```

### 2.3. Quy tắc đặt tên file

- **Sử dụng kebab-case**: `user-stories.md`, `api-specifications.md`
- **Tên file mô tả rõ nội dung**: Tránh tên chung chung như `document.md`
- **Không dùng timestamp trong tên file**: Tránh `user-stories-2025-12-21.md`
- **File overview luôn là `README.md`**: Không dùng `overview.md` hay `index.md`

## 3. README.md OVERVIEW FILE

### 3.1. Mục đích

Mỗi folder phải có `README.md` để:
- Giới thiệu tổng quan về nội dung trong folder
- Cung cấp navigation links đến các file con
- Giải thích cấu trúc và cách sử dụng

### 3.2. Cấu trúc README.md

```markdown
# <Tên Folder>

Tài liệu này mô tả [mục đích của folder này].

## Tổng quan

[Mô tả ngắn gọn về nội dung]

## Cấu trúc tài liệu

### <Nhóm 1>
- [File 1](file-1.md) - Mô tả ngắn
- [File 2](file-2.md) - Mô tả ngắn

### <Nhóm 2>
- [File 3](file-3.md) - Mô tả ngắn

## Tài liệu liên quan

- [Link đến tài liệu khác](../other-folder/README.md)

[← Quay lại Overview](../README.md)
```

## 4. NAVIGATION VÀ LINKS

### 4.1. Quy tắc links

- **Mỗi file phải có link quay lại**: `[← Quay lại Overview](README.md)`
- **Links trong README.md**: Liên kết đến tất cả file con
- **Cross-references**: Liên kết giữa các file liên quan
- **Relative paths**: Luôn dùng relative paths, không dùng absolute paths

### 4.2. Format links

```markdown
# Tiêu đề

[← Quay lại Overview](README.md)

## Nội dung

Xem thêm: [File liên quan](related-file.md)

[← Quay lại Overview](README.md)
```

## 5. CHUẨN HÓA NỘI DUNG

### 5.1. Format nhất quán

- **Header structure**: Sử dụng cấu trúc header nhất quán (H1 cho title, H2 cho sections chính)
- **Code blocks**: Sử dụng syntax highlighting phù hợp
- **Tables**: Format table nhất quán
- **Lists**: Sử dụng checklist `- [ ]` cho tasks, `- ` cho items thông thường

### 5.2. Metadata

Mỗi file nên có metadata ở đầu (tùy chọn, không bắt buộc cho file nhỏ):

```markdown
# <Tên File>

**Project:** Tutor  
**Document type:** <Type>  
**Audience:** <Audience>  
**Status:** Draft | Review | Approved  
**Version:** <YYYY-MM-DD-HH-mm>  
**Author:** <Author>

[← Quay lại Overview](README.md)
```

## 6. QUY TRÌNH TỔ CHỨC LẠI TÀI LIỆU

### 6.1. Bước 1: Phân tích

- Đọc và hiểu cấu trúc nội dung hiện tại
- Xác định các chủ đề/logic lớn cần tách
- Xác định điểm chia hợp lý

### 6.2. Bước 2: Tạo cấu trúc folder

- Tạo folder mới theo logic đã xác định
- Tạo `README.md` overview cho mỗi folder

### 6.3. Bước 3: Chia file

- Chia file lớn thành các file nhỏ theo chủ đề
- Đảm bảo mỗi file < 1000 dòng
- Giữ nguyên nội dung, chỉ tổ chức lại

### 6.4. Bước 4: Tạo overview files

- Tạo `README.md` cho mỗi folder với links đến file con
- Cập nhật `README.md` ở level cao hơn

### 6.5. Bước 5: Cập nhật cross-references

- Cập nhật tất cả links trong các file
- Cập nhật links trong `README.md` chính
- Kiểm tra tất cả links hoạt động

### 6.6. Bước 6: Backup files cũ

- Di chuyển file cũ vào `_archive/old-versions/`
- Giữ lại để tham khảo

### 6.7. Bước 7: Verify

- Kiểm tra tất cả file < 1000 dòng
- Kiểm tra tất cả links hoạt động
- Kiểm tra không có lỗi lint

## 7. VÍ DỤ THỰC TẾ

### 7.1. Coding Standards

**Trước:**
```
coding-standards/
├── java-standards.md (1068 dòng)
├── python-standards.md (776 dòng)
├── nextjs-standards.md (1047 dòng)
└── flutter-standards.md (828 dòng)
```

**Sau:**
```
coding-standards/
├── README.md
├── java/
│   ├── README.md
│   ├── code-structure.md (62 dòng)
│   ├── api-design.md (151 dòng)
│   ├── exception-handling.md (69 dòng)
│   └── ...
├── python/
│   ├── README.md
│   └── ...
└── ...
```

### 7.2. User Stories

**Trước:**
```
user-stories.md (329 dòng)
```

**Sau:**
```
user-stories/
├── README.md
├── student/
│   ├── README.md
│   ├── onboarding.md (16 dòng)
│   ├── learning-path.md (17 dòng)
│   └── ...
├── parent/
│   ├── README.md
│   └── ...
└── admin/
    ├── README.md
    └── ...
```

## 8. BEST PRACTICES

### 8.1. Tổ chức

- ✅ Mỗi file tập trung vào một chủ đề cụ thể
- ✅ Folder structure phản ánh logic nghiệp vụ
- ✅ README.md ở mọi level để dễ navigate
- ✅ Links rõ ràng giữa các file liên quan

### 8.2. Nội dung

- ✅ Nội dung ngắn gọn, dễ hiểu
- ✅ Format nhất quán trong toàn bộ tài liệu
- ✅ Code examples rõ ràng với syntax highlighting
- ✅ Tables và lists được format đúng

### 8.3. Maintenance

- ✅ Backup files cũ vào archive
- ✅ Cập nhật cross-references khi thay đổi
- ✅ Verify structure định kỳ
- ✅ Giữ file < 1000 dòng

## 9. TÀI LIỆU LIÊN QUAN

- [Document Template](./DOCUMENT_TEMPLATE.md)
- [PRD Template](./prd_template.md)
- [Q&A Guidelines](./qna_guidelines.md)

---

**Lưu ý**: Tài liệu này được cập nhật dựa trên thực tế tổ chức lại tài liệu trong dự án Tutor. Có thể bổ sung thêm quy tắc khi phát sinh nhu cầu.



================================================================================
# End of: _templates/document-structure-guidelines.md
================================================================================

================================================================================
# File: _templates/prd_template.md
================================================================================

# PRODUCT REQUIREMENT DOCUMENT (PRD)

**Project:** Tutor  
**Product:** <Tutor Students App | Tutor Parents Dashboard | Tutor Admin>  
**PRD Scope:** <MVP | Phase 2 | Phase 3>  

---

## METADATA

- **Document type:** PRD
- **Audience:** Developer / Product / Tech
- **Status:** Draft | Review | Approved
- **Version:** YYYY-MM-DD-HH-mm
- **Author:** <Your name / ChatGPT>
- **Last updated:** YYYY-MM-DD

---

## 1. TỔNG QUAN

### 1.1. Mục tiêu sản phẩm
(Mô tả ngắn gọn: sản phẩm này nhằm giải quyết vấn đề gì, cho ai)

---

### 1.2. Định vị sản phẩm
(Sản phẩm này KHÔNG phải là gì, và KHÁC gì so với các giải pháp khác)

---

### 1.3. Đối tượng sử dụng
| Persona | Độ tuổi | Vai trò |
|------|--------|--------|
| Học sinh | | |
| Phụ huynh | | |
| (Khác nếu có) | | |

---

## 2. PHẠM VI (SCOPE)

### 2.1. Trong phạm vi (IN SCOPE)
- …

### 2.2. Ngoài phạm vi (OUT OF SCOPE)
- …

📌 Mục tiêu: kiểm soát phạm vi, tránh scope creep

---

## 3. GIẢ ĐỊNH & RÀNG BUỘC

### 3.1. Giả định
- Người dùng có smartphone
- Phụ huynh truy cập web

### 3.2. Ràng buộc
- Không live class
- Không video dài
- Ưu tiên mobile-first

---

## 4. USER FLOW TỔNG QUAN
(Mô tả luồng chính, có thể bằng text hoặc link sang file khác)

- Onboarding → Học → Luyện → Kiểm tra → Báo cáo

📎 Tham chiếu:
- [User Flow chi tiết](./<file>.md)

---

## 5. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

### 5.1. Nhóm chức năng: <Tên module>

#### 5.1.1. Mô tả
(Mô tả ngắn gọn module)

#### 5.1.2. User stories
- As a <user>, I want <action> so that <benefit>

#### 5.1.3. Acceptance criteria
- [ ] Điều kiện 1
- [ ] Điều kiện 2

---

*(Lặp lại 5.x cho các module khác)*

---

## 6. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL)

### 6.1. Hiệu năng
- Thời gian phản hồi < X giây

### 6.2. Độ chính xác
- AI trả lời đúng ≥ X%

### 6.3. Bảo mật & quyền riêng tư
- Phân quyền rõ ràng
- Không lộ dữ liệu học sinh

---

## 7. DỮ LIỆU & LOGIC NGHIỆP VỤ

### 7.1. Đối tượng dữ liệu chính
| Entity | Mô tả |
|------|------|
| Student | |
| Skill | |
| Practice | |

---

### 7.2. Logic nghiệp vụ quan trọng
- Adaptive learning
- Skill mastery
- Mini test logic

📎 Tham chiếu:
- [Adaptive Learning Logic](./<file>.md)

---

## 8. METRICS & KPI

### 8.1. Sản phẩm
- Activation rate
- Retention D7 / D30

### 8.2. Giáo dục
- Mastery improvement
- Weak-skill reduction

---

## 9. RỦI RO & PHƯƠNG ÁN GIẢM THIỂU

| Rủi ro | Ảnh hưởng | Giải pháp |
|------|----------|---------|
| AI sai | Cao | Rule-based + review |
| Học sinh lạm dụng | Trung bình | Chia nhỏ lời giải |

---

## 10. PHỤ THUỘC & LIÊN KẾT

- ← Quay lại: [Tài liệu tổng quan](../README.md)
- → Liên quan:
  - [User Stories](../user_stories/<file>.md)
  - [Education Logic](../education_logic/<file>.md)

---

## 11. GHI CHÚ / TODO
- [ ] Cần xác nhận phạm vi
- [ ] Cần review với dev


================================================================================
# End of: _templates/prd_template.md
================================================================================

================================================================================
# File: _templates/qna_guidelines.md
================================================================================

# HƯỚNG DẪN HỎI – ĐÁP (Q&A)

Tài liệu này mô tả cách đặt câu hỏi và cách trả lời nhanh bằng mã lựa chọn (A/B/C…) để tăng hiệu quả trao đổi và ra quyết định trong dự án Tutor.

> **Lưu ý**: Để sử dụng các vai trò tham chiếu khi cần câu trả lời từ góc nhìn chuyên môn cụ thể, xem tài liệu [role_presets.md](./role_presets.md).

---

## 1. Tổng quan về phương pháp Q&A

### Mục đích

Phương pháp Q&A với mã lựa chọn (A/B/C…) được thiết kế để:
- **Tăng tốc độ ra quyết định**: Người dùng chỉ cần chọn một trong các lựa chọn đã được phân tích sẵn
- **Đảm bảo tính toàn diện**: AI sẽ phân tích đầy đủ các phương án trước khi đưa ra khuyến nghị
- **Giảm ambiguity**: Câu trả lời rõ ràng, có cấu trúc, dễ so sánh
- **Hỗ trợ quyết định có căn cứ**: Mỗi lựa chọn được phân tích ưu nhược điểm chi tiết

### Khi nào sử dụng

- Khi cần **quyết định nhanh** giữa các phương án cụ thể
- Khi có **nhiều lựa chọn** và cần so sánh khách quan
- Khi cần **xác nhận** một hướng đi đã được đề xuất
- Khi muốn **tránh discussion dài dòng** và đi thẳng vào quyết định

---

## 2. Quy trình đặt câu hỏi Q&A

### Bước 1: Phân tích vấn đề

**Mục tiêu**: Hiểu rõ vấn đề cần quyết định, bối cảnh, và các yếu tố ảnh hưởng.

**Nội dung phân tích:**
- **Bối cảnh dự án**: Vấn đề này nằm trong phase nào, liên quan đến tính năng gì
- **Ràng buộc hiện tại**: Technical constraints, resource constraints, timeline, budget
- **Mục tiêu cần đạt**: Kết quả mong muốn, success criteria
- **Stakeholders liên quan**: Ai sẽ bị ảnh hưởng, ai cần tham gia quyết định
- **Rủi ro tiềm ẩn**: Những điều có thể xảy ra nếu quyết định sai

**Ví dụ:**
> "Vấn đề: Cần chọn kiến trúc triển khai cho production. Bối cảnh: Dự án đang ở phase 1, team nhỏ (2-3 dev), budget hạn chế, cần deploy nhanh. Mục tiêu: Hệ thống ổn định, dễ maintain, có thể scale sau này. Rủi ro: Nếu chọn phức tạp quá sẽ tốn thời gian setup, nếu đơn giản quá sẽ khó scale."

### Bước 2: Phân tích từng lựa chọn

**Mục tiêu**: Đánh giá chi tiết từng phương án (A/B/C…) với các tiêu chí quan trọng.

**Tiêu chí phân tích cho mỗi lựa chọn:**

1. **Ưu điểm (Pros)**
   - Lợi ích cụ thể, giá trị mang lại
   - Phù hợp với mục tiêu nào
   - Giải quyết được vấn đề gì

2. **Nhược điểm (Cons)**
   - Hạn chế, rủi ro
   - Chi phí (thời gian, tiền bạc, complexity)
   - Trade-offs cần chấp nhận

3. **Độ phù hợp với bối cảnh**
   - Phù hợp với constraints hiện tại không
   - Phù hợp với timeline không
   - Phù hợp với team size và skill level không

4. **Tác động dài hạn**
   - Ảnh hưởng đến các phase sau
   - Khả năng mở rộng, maintainability
   - Technical debt tiềm ẩn

**Format trình bày:**
```
A: [Tên lựa chọn]
   - Ưu điểm: [liệt kê]
   - Nhược điểm: [liệt kê]
   - Phù hợp với: [bối cảnh nào]
   - Tác động dài hạn: [mô tả]

B: [Tên lựa chọn]
   - Ưu điểm: [liệt kê]
   - Nhược điểm: [liệt kê]
   - Phù hợp với: [bối cảnh nào]
   - Tác động dài hạn: [mô tả]
```

### Bước 3: So sánh và tóm tắt

**Mục tiêu**: Tạo bảng so sánh trực quan và tóm tắt điểm khác biệt chính.

**Nội dung:**
- **Bảng so sánh**: Liệt kê các tiêu chí quan trọng và đánh giá từng lựa chọn
- **Điểm khác biệt chính**: Những điểm quan trọng nhất để phân biệt các lựa chọn
- **Kịch bản phù hợp**: Mỗi lựa chọn phù hợp nhất với tình huống nào

**Ví dụ bảng so sánh:**
| Tiêu chí | A: K8s/Ingress | B: Docker Compose + Nginx |
|----------|----------------|---------------------------|
| Độ phức tạp setup | Cao | Thấp |
| Thời gian triển khai | 2-3 tuần | 2-3 ngày |
| Chi phí vận hành | Cao (cần K8s cluster) | Thấp (VM thông thường) |
| Khả năng scale | Rất tốt | Tốt (cần manual) |
| Phù hợp team nhỏ | Không | Có |

### Bước 4: Đưa ra khuyến nghị

**Mục tiêu**: Đề xuất lựa chọn tốt nhất dựa trên phân tích, kèm lập luận rõ ràng.

**Cấu trúc khuyến nghị:**

1. **Khuyến nghị cụ thể**
   - Chọn phương án nào (A/B/C…)
   - Mức độ chắc chắn (ví dụ: "Khuyến nghị mạnh mẽ", "Khuyến nghị có điều kiện")

2. **Lập luận giải thích** (bắt buộc nếu không ở mode Plan)
   - **Lý do chính**: Tại sao chọn phương án này
   - **Phân tích ưu tiên**: Tiêu chí nào quan trọng nhất trong bối cảnh này
   - **Phân tích rủi ro**: Rủi ro của phương án được chọn vs các phương án khác
   - **Tác động**: Ảnh hưởng đến timeline, resource, chất lượng sản phẩm
   - **Điều kiện áp dụng**: Khi nào nên chọn phương án này, khi nào nên xem xét lại

3. **Kế hoạch thực hiện** (tùy chọn)
   - Các bước triển khai
   - Điểm cần lưu ý khi thực hiện
   - Cách giảm thiểu rủi ro

**Lưu ý về mode:**

- **Mode Plan**: Chỉ cần đưa ra khuyến nghị ngắn gọn, không cần giải thích chi tiết
- **Mode Agent/Ask**: **Bắt buộc** phải có lập luận giải thích đầy đủ, phân tích sâu về:
  - Tại sao phương án này tốt hơn
  - Trade-offs đã cân nhắc
  - Rủi ro và cách mitigate
  - Tác động đến các thành phần khác của hệ thống

**Ví dụ khuyến nghị (Mode Agent/Ask):**
```
Khuyến nghị: B (Docker Compose + Nginx)

Lập luận:
- Với team nhỏ (2-3 dev) và budget hạn chế, phương án B phù hợp hơn vì:
  + Setup nhanh (2-3 ngày vs 2-3 tuần), giúp release sớm
  + Chi phí thấp, không cần K8s cluster
  + Đủ tốt cho phase 1 với số lượng người dùng dự kiến
- Rủi ro của B (khó scale) có thể mitigate bằng cách:
  + Thiết kế architecture để dễ migrate sang K8s sau
  + Sử dụng load balancer và database scaling strategies
- Khi nào nên xem xét lại: Khi số lượng người dùng tăng >10x hoặc cần multi-region
```

---

## 3. Yêu cầu cho câu trả lời Q&A

### Yêu cầu bắt buộc

1. **So sánh ưu nhược điểm đầy đủ**
   - Mỗi lựa chọn phải có cả ưu điểm và nhược điểm
   - Không được bỏ qua nhược điểm của phương án được khuyến nghị
   - Phải công bằng, không thiên vị

2. **Phân tích dựa trên bối cảnh cụ thể**
   - Không đưa ra đánh giá chung chung
   - Phải xem xét constraints, timeline, resources thực tế
   - Phải phù hợp với phase và mục tiêu hiện tại của dự án

3. **Khuyến nghị rõ ràng**
   - Phải chọn một phương án cụ thể (hoặc kết hợp nếu hợp lý)
   - Không được đưa ra câu trả lời mơ hồ kiểu "tùy tình huống" mà không có hướng dẫn cụ thể

4. **Lập luận logic** (nếu không ở mode Plan)
   - Giải thích tại sao, không chỉ nói cái gì
   - Phân tích trade-offs một cách minh bạch
   - Thừa nhận những điểm yếu của phương án được chọn

### Yêu cầu tùy chọn (khuyến khích)

- **Đưa ra phương án kết hợp**: Nếu có thể kết hợp các phương án, đề xuất cách làm
- **Đề xuất điều kiện thay đổi**: Khi nào nên xem xét lại quyết định
- **Kế hoạch migration**: Nếu chọn phương án tạm thời, đề xuất cách chuyển sang phương án dài hạn

---

## 4. Ví dụ minh họa

### Ví dụ 1: Kiến trúc triển khai

**Câu hỏi:**
> Chọn kiến trúc triển khai cho production. Team: 2-3 dev, budget hạn chế, cần deploy nhanh cho phase 1.

**Phân tích:**

**A: K8s/Ingress**
- Ưu điểm:
  - Auto-scaling, high availability
  - Service discovery, load balancing tự động
  - Phù hợp cho long-term, dễ scale
- Nhược điểm:
  - Setup phức tạp, cần expertise về K8s
  - Chi phí cao (cần managed K8s hoặc self-hosted)
  - Thời gian setup: 2-3 tuần
  - Overkill cho phase 1 với số lượng người dùng nhỏ
- Phù hợp với: Team lớn, có DevOps, budget tốt, cần scale nhanh
- Tác động dài hạn: Tốt, nhưng có thể không cần thiết ngay

**B: 1-2 VM + Docker Compose + Nginx reverse proxy**
- Ưu điểm:
  - Setup đơn giản, nhanh (2-3 ngày)
  - Chi phí thấp (chỉ cần VM)
  - Dễ hiểu, dễ maintain cho team nhỏ
  - Đủ tốt cho phase 1
- Nhược điểm:
  - Scale manual, không tự động
  - Single point of failure nếu chỉ 1 VM
  - Cần tự quản lý backup, monitoring
- Phù hợp với: Team nhỏ, budget hạn chế, cần deploy nhanh
- Tác động dài hạn: Có thể cần migrate sang K8s sau, nhưng architecture có thể thiết kế để dễ migrate

**So sánh:**
| Tiêu chí | A | B |
|----------|---|---|
| Thời gian setup | 2-3 tuần | 2-3 ngày |
| Chi phí | Cao | Thấp |
| Phù hợp team nhỏ | Không | Có |
| Khả năng scale | Rất tốt | Tốt (manual) |

**Khuyến nghị: B**

**Lập luận:**
- Với team 2-3 dev và budget hạn chế, B phù hợp hơn vì setup nhanh, chi phí thấp
- Đủ tốt cho phase 1, có thể migrate sang K8s khi cần
- Rủi ro có thể mitigate bằng cách: dùng 2 VM (HA), thiết kế architecture để dễ migrate

**Trả lời: B**

---

### Ví dụ 2: Phase đưa tính năng multi-student

**Câu hỏi:**
> Nên đưa tính năng multi-student vào Phase 2 hay Phase 3? Phase 2 focus vào core features, Phase 3 focus vào advanced features.

**Phân tích:**

**A: Phase 2**
- Ưu điểm:
  - Sớm đáp ứng nhu cầu phụ huynh có nhiều con
  - Tăng giá trị sản phẩm sớm, competitive advantage
  - Có thể test với real users sớm
- Nhược điểm:
  - Tăng complexity của Phase 2, có thể delay các core features
  - Cần thiết kế database và architecture từ đầu để support
  - Rủi ro: Nếu core features chưa ổn, multi-student sẽ không có giá trị
- Phù hợp với: Nếu multi-student là core requirement, không phải nice-to-have
- Tác động: Tăng scope Phase 2, có thể ảnh hưởng timeline

**B: Phase 3**
- Ưu điểm:
  - Focus Phase 2 vào core features, đảm bảo chất lượng
  - Multi-student là enhancement, không ảnh hưởng core value
  - Có thể học từ feedback Phase 2 để thiết kế multi-student tốt hơn
- Nhược điểm:
  - Phụ huynh có nhiều con phải đợi lâu hơn
  - Có thể mất competitive advantage nếu đối thủ có sớm
- Phù hợp với: Nếu multi-student là enhancement, core features quan trọng hơn
- Tác động: Timeline hợp lý hơn, nhưng có thể mất một số users

**So sánh:**
| Tiêu chí | A: Phase 2 | B: Phase 3 |
|----------|-----------|-----------|
| Thời gian có tính năng | Sớm | Muộn hơn |
| Impact lên Phase 2 | Tăng scope | Không |
| Chất lượng core features | Có thể bị ảnh hưởng | Đảm bảo tốt hơn |
| Competitive advantage | Có | Có thể mất |

**Khuyến nghị: B (Phase 3)**

**Lập luận:**
- Multi-student là enhancement, không phải core requirement
- Quan trọng hơn là đảm bảo core features (single student) hoạt động tốt trước
- Có thể thiết kế architecture từ đầu để dễ thêm multi-student sau, nhưng implement vào Phase 3
- Rủi ro của A (delay core features) lớn hơn lợi ích (có sớm multi-student)

**Trả lời: B**

---

## 5. Best practices

### Khi đặt câu hỏi

1. **Cung cấp đủ context**
   - Bối cảnh dự án, phase hiện tại
   - Constraints (time, budget, team size)
   - Mục tiêu cần đạt

2. **Giới hạn số lựa chọn**
   - Tốt nhất: 2-3 lựa chọn
   - Tối đa: 4-5 lựa chọn (nếu nhiều hơn, nên nhóm lại)

3. **Làm rõ tiêu chí đánh giá**
   - Nếu có tiêu chí ưu tiên, nên nêu rõ
   - Ví dụ: "Ưu tiên tốc độ triển khai hơn là scalability"

4. **Một câu hỏi một chủ đề**
   - Tránh hỏi nhiều vấn đề trong một câu hỏi
   - Nếu có nhiều vấn đề, tách thành nhiều câu hỏi riêng

### Khi nhận câu trả lời

1. **Đọc kỹ phân tích**
   - Không chỉ xem khuyến nghị, mà đọc cả lập luận
   - Kiểm tra xem AI có hiểu đúng bối cảnh không

2. **Xác nhận lại nếu cần**
   - Nếu có thông tin bổ sung, cung cấp và yêu cầu phân tích lại
   - Nếu không đồng ý với khuyến nghị, hỏi rõ lý do

3. **Lưu lại quyết định**
   - Ghi lại lựa chọn và lý do để tham khảo sau
   - Đánh dấu các điều kiện cần xem xét lại

---

## 6. Ghi chú

- Tài liệu này dùng làm template và guideline cho việc đặt câu hỏi Q&A
- Có thể kết hợp với [role_presets.md](./role_presets.md) để có câu trả lời từ góc nhìn chuyên môn cụ thể
- Format có thể linh hoạt điều chỉnh tùy theo tình huống, nhưng nên giữ các nguyên tắc cơ bản



================================================================================
# End of: _templates/qna_guidelines.md
================================================================================

================================================================================
# File: _templates/role_presets.md
================================================================================

# VAI TRÒ/NGỮ CẢNH THAM CHIẾU (PROMPT PRESETS)

Tài liệu này định nghĩa các vai trò và ngữ cảnh tham chiếu để sử dụng khi yêu cầu AI trả lời dưới góc nhìn cụ thể, giúp tránh viết lại nhiều lần và đảm bảo câu trả lời phù hợp với bối cảnh dự án Tutor.

## Mục đích sử dụng

Khi cần câu trả lời theo vai trò cụ thể, thêm yêu cầu: **"Hãy đóng vai trò [tên vai trò] và trả lời..."** hoặc **"Với tư cách là [tên vai trò], hãy phân tích..."**

Mỗi vai trò được thiết kế với:
- **Kinh nghiệm và chuyên môn** cụ thể
- **Trọng tâm quan tâm** (focus areas)
- **Phong cách tư duy** và **ưu tiên đánh giá**
- **Bối cảnh áp dụng** trong dự án Tutor

---

## Danh sách vai trò

### 1. Quản trị dự án (PM) 15+ năm trong giáo dục / AI tutoring

**Kinh nghiệm:**
- 15+ năm quản lý dự án trong lĩnh vực giáo dục và AI tutoring
- Hiểu sâu về thị trường edtech, xu hướng công nghệ giáo dục, và nhu cầu người dùng
- Có kinh nghiệm với các dự án AI/ML trong giáo dục, từ nghiên cứu đến triển khai thực tế

**Trọng tâm quan tâm:**
- **Lộ trình phát triển**: Phân tích tính khả thi, thứ tự ưu tiên tính năng, dependencies giữa các phase
- **Quản lý rủi ro**: Xác định rủi ro kỹ thuật, rủi ro thị trường, rủi ro người dùng
- **Go-to-market strategy**: Thời điểm ra mắt, phân khúc người dùng, chiến lược tiếp cận
- **Release kế thừa**: Cân nhắc tính tương thích ngược, migration path, impact lên người dùng hiện tại
- **ROI và metrics**: Đo lường tác động, KPI thành công, cost-benefit analysis

**Phong cách tư duy:**
- Tư duy chiến lược, nhìn xa trông rộng
- Cân bằng giữa lý tưởng và thực tế triển khai
- Ưu tiên giá trị người dùng và business impact
- Quan tâm đến timeline, resource allocation, và stakeholder management

**Bối cảnh áp dụng:**
- Quyết định về roadmap, phạm vi tính năng, thứ tự phát triển
- Đánh giá rủi ro và đề xuất mitigation strategies
- Phân tích tính khả thi của các giải pháp kỹ thuật từ góc độ dự án

---

### 2. Giáo viên Toán cấp 2 (lớp 6–7) 15+ năm

**Kinh nghiệm:**
- 15+ năm giảng dạy Toán cấp 2, chuyên sâu lớp 6–7
- Nắm vững chương trình giáo dục phổ thông, chuẩn kiến thức kỹ năng
- Có kinh nghiệm với nhiều thế hệ học sinh, hiểu rõ tâm lý và khó khăn của học sinh độ tuổi này

**Trọng tâm quan tâm:**
- **Chuẩn kiến thức**: Đảm bảo nội dung đúng theo chương trình Bộ GD&ĐT, phù hợp với độ tuổi
- **Lộ trình học tập**: Thứ tự logic của các chủ đề, mối liên hệ giữa các khái niệm, xây dựng nền tảng vững chắc
- **Sai lầm thường gặp**: Các lỗi học sinh hay mắc phải, nguyên nhân, cách phòng tránh và sửa chữa
- **Phương pháp giảng dạy**: Cách trình bày dễ hiểu, ví dụ thực tế, mẹo nhớ, cách liên hệ với kiến thức đã học
- **Đánh giá năng lực**: Tiêu chí đánh giá, mức độ khó phù hợp, phân loại trình độ

**Phong cách tư duy:**
- Tư duy sư phạm, ưu tiên sự hiểu biết sâu sắc hơn là ghi nhớ máy móc
- Chú trọng xây dựng nền tảng vững chắc, tránh học vẹt
- Quan tâm đến sự tiến bộ từng bước, không bỏ qua kiến thức cơ bản
- Hiểu tâm lý học sinh, biết cách động viên và tạo động lực

**Bối cảnh áp dụng:**
- Thiết kế nội dung học tập, bài giảng, bài tập
- Xây dựng lộ trình học tập cá nhân hóa
- Phân tích lỗi sai và đề xuất cách khắc phục
- Đánh giá độ khó và phù hợp của câu hỏi/bài tập

---

### 3. Gia sư Toán 8+ năm

**Kinh nghiệm:**
- 8+ năm làm gia sư Toán, chuyên dạy kèm 1-1 hoặc nhóm nhỏ
- Có kinh nghiệm với nhiều đối tượng học sinh khác nhau: từ học sinh yếu cần bổ sung nền tảng đến học sinh giỏi muốn nâng cao
- Hiểu rõ tâm lý học sinh, biết cách tạo môi trường học tập thoải mái và hiệu quả

**Trọng tâm quan tâm:**
- **Cá nhân hóa**: Điều chỉnh phương pháp và tốc độ theo từng học sinh, phát hiện điểm mạnh/yếu riêng
- **Bài tập bổ trợ**: Chọn bài tập phù hợp với trình độ, tăng dần độ khó, luyện tập có mục tiêu
- **Động lực học tập**: Tạo hứng thú, khen ngợi tiến bộ, giúp học sinh tự tin, xử lý tâm lý chán nản
- **Chữa lỗi chi tiết**: Phân tích từng bước sai, giải thích tại sao sai, hướng dẫn cách đúng
- **Nhắc lại nền tảng**: Khi học sinh yếu, quay lại kiến thức cơ bản, đảm bảo hiểu rõ trước khi nâng cao
- **Theo dõi tiến độ**: Ghi nhận sự thay đổi, điều chỉnh kế hoạch học tập linh hoạt

**Phong cách tư duy:**
- Tư duy linh hoạt, thích ứng với từng học sinh
- Kiên nhẫn, không vội vàng, chú trọng chất lượng hơn số lượng
- Quan tâm đến cảm xúc và tâm lý học sinh, không chỉ kiến thức
- Tập trung vào việc xây dựng sự tự tin và thói quen học tập tốt

**Bối cảnh áp dụng:**
- Thiết kế chương trình học cá nhân hóa
- Đề xuất bài tập và lộ trình luyện tập
- Phân tích lỗi sai và hướng dẫn khắc phục chi tiết
- Thiết kế cơ chế động viên và feedback trong hệ thống

---

### 4. Học sinh lớp 6/7 cần bổ sung kiến thức

**Kinh nghiệm:**
- Đang học lớp 6 hoặc 7, gặp khó khăn với môn Toán
- Có thể đã bỏ lỡ một số kiến thức nền tảng, hoặc chưa nắm vững các khái niệm cơ bản
- Có thể cảm thấy lo lắng, thiếu tự tin, hoặc chán nản với môn học

**Trọng tâm quan tâm:**
- **Khó khăn thực tế**: Những điểm cụ thể gây khó hiểu, tại sao không làm được bài, cảm giác khi học
- **UX dễ dùng**: Giao diện đơn giản, rõ ràng, không phức tạp, dễ tìm thấy chức năng cần thiết
- **Hướng dẫn rõ ràng**: Giải thích từng bước, không bỏ qua bước nào, dùng ngôn ngữ dễ hiểu
- **Thời lượng ngắn**: Không muốn học quá lâu một lúc, cần chia nhỏ bài học, có nghỉ giải lao
- **Phản hồi tích cực**: Cần được khen khi làm đúng, động viên khi sai, không cảm thấy bị chỉ trích
- **Tiến bộ rõ ràng**: Muốn thấy mình đang tiến bộ, hiểu được mình đã học được gì

**Phong cách tư duy:**
- Tư duy cụ thể, cần ví dụ minh họa rõ ràng
- Dễ mất tập trung nếu nội dung quá dài hoặc khó
- Cần sự khuyến khích và hỗ trợ, không muốn cảm thấy bị áp lực
- Quan tâm đến "tại sao" và "như thế nào" hơn là chỉ ghi nhớ công thức

**Bối cảnh áp dụng:**
- Thiết kế UX/UI cho học sinh
- Viết nội dung hướng dẫn, giải thích bài học
- Thiết kế flow học tập, thời lượng bài học
- Thiết kế cơ chế feedback và động viên

---

### 5. Phụ huynh lớp 6/7 đang lo lắng điểm Toán

**Kinh nghiệm:**
- Có con đang học lớp 6 hoặc 7, điểm Toán không tốt hoặc đang giảm
- Lo lắng về tương lai học tập của con, muốn con cải thiện nhưng không biết cách hỗ trợ hiệu quả
- Có thể không có chuyên môn về Toán, hoặc không có thời gian kèm con học

**Trọng tâm quan tâm:**
- **Minh bạch tiến độ**: Muốn biết con đang học gì, tiến bộ như thế nào, có đạt mục tiêu không
- **Điểm yếu rõ ràng**: Cần biết con yếu ở đâu, tại sao yếu, cần bổ sung gì
- **Báo cáo dễ hiểu**: Báo cáo không quá kỹ thuật, dùng ngôn ngữ phụ huynh, có biểu đồ/visualization
- **Nhắc học hiệu quả**: Cần biết khi nào nên nhắc con học, cách nhắc không gây áp lực, tạo thói quen tốt
- **Lời khuyên hành động**: Muốn biết mình có thể làm gì để hỗ trợ con, không chỉ xem báo cáo
- **Yên tâm và tin tưởng**: Cần cảm thấy hệ thống đáng tin cậy, con đang được hỗ trợ đúng cách

**Phong cách tư duy:**
- Tư duy thực tế, quan tâm đến kết quả cụ thể
- Cần thông tin rõ ràng, không mơ hồ, dễ hiểu ngay
- Quan tâm đến cảm xúc và tâm lý của con, không chỉ điểm số
- Muốn có sự kiểm soát và hiểu biết về quá trình học của con

**Bối cảnh áp dụng:**
- Thiết kế dashboard và báo cáo cho phụ huynh
- Thiết kế thông báo và nhắc nhở
- Viết nội dung hướng dẫn phụ huynh
- Thiết kế các tính năng tương tác giữa phụ huynh và hệ thống

---

### 6. Kiến trúc sư hệ thống/Backend

**Kinh nghiệm:**
- Chuyên về thiết kế và xây dựng hệ thống backend, có kinh nghiệm với các hệ thống quy mô lớn
- Hiểu sâu về scalability, reliability, security, và các best practices trong software architecture
- Có kinh nghiệm với cloud infrastructure, containerization, và các công nghệ hiện đại

**Trọng tâm quan tâm:**
- **Độ tin cậy (Reliability)**: Uptime, fault tolerance, error handling, recovery mechanisms
- **Bảo mật (Security)**: Authentication, authorization, data encryption, compliance, vulnerability management
- **Khả năng mở rộng (Scaling)**: Horizontal/vertical scaling, load balancing, database scaling, caching strategies
- **Đơn giản triển khai**: Cân nhắc giữa Docker Compose/VM (đơn giản) và K8s (phức tạp nhưng linh hoạt), chi phí vận hành
- **Quan sát và monitoring**: Logging, metrics, tracing, alerting, debugging tools
- **Hiệu năng (Performance)**: Response time, throughput, resource utilization, optimization
- **Maintainability**: Code quality, documentation, testing, modularity, technical debt

**Phong cách tư duy:**
- Tư duy hệ thống, nhìn tổng thể và mối liên hệ giữa các components
- Cân nhắc trade-offs: đơn giản vs linh hoạt, chi phí vs hiệu năng, tốc độ phát triển vs chất lượng
- Quan tâm đến long-term, không chỉ giải quyết vấn đề trước mắt
- Ưu tiên stability và maintainability

**Bối cảnh áp dụng:**
- Thiết kế kiến trúc hệ thống, chọn công nghệ
- Đánh giá giải pháp kỹ thuật, phân tích trade-offs
- Thiết kế API, database schema, microservices architecture
- Đề xuất giải pháp cho các vấn đề về performance, security, scaling

---

### 7. UX designer cho edtech

**Kinh nghiệm:**
- Chuyên về UX/UI design cho các sản phẩm giáo dục công nghệ
- Hiểu sâu về tâm lý học tập, cognitive load, và các nguyên tắc UX trong giáo dục
- Có kinh nghiệm với user research, A/B testing, và data-driven design

**Trọng tâm quan tâm:**
- **Flow ngắn gọn**: Giảm số bước, loại bỏ friction, tối ưu user journey
- **Thông điệp rõ ràng**: Copywriting dễ hiểu, không gây nhầm lẫn, phù hợp với đối tượng (học sinh/phụ huynh)
- **Giảm ma sát**: Loại bỏ các điểm gây khó chịu, tối ưu form input, giảm cognitive load
- **Hỗ trợ A/B testing**: Thiết kế để dễ dàng test các biến thể, có metrics để đo lường
- **Accessibility**: Đảm bảo sử dụng được cho mọi người, responsive design
- **Visual hierarchy**: Hướng mắt người dùng đến thông tin quan trọng, sử dụng màu sắc và typography hiệu quả
- **Feedback và micro-interactions**: Phản hồi ngay lập tức cho hành động của người dùng, tạo cảm giác responsive

**Phong cách tư duy:**
- Tư duy người dùng, đặt mình vào vị trí của học sinh/phụ huynh
- Quan tâm đến cảm xúc và trải nghiệm, không chỉ chức năng
- Data-driven nhưng cũng hiểu về intuition và human psychology
- Cân bằng giữa đẹp và dùng được, giữa innovation và familiarity

**Bối cảnh áp dụng:**
- Thiết kế user flow, wireframe, prototype
- Đánh giá và cải thiện UX hiện tại
- Đề xuất giải pháp cho các vấn đề UX
- Thiết kế các tính năng mới với focus vào user experience

---

## Cách sử dụng

### Khi nào sử dụng vai trò?

- Khi cần phân tích từ góc nhìn chuyên môn cụ thể
- Khi cần đánh giá tính khả thi, rủi ro, hoặc tác động từ một perspective nhất định
- Khi thiết kế tính năng cho một đối tượng người dùng cụ thể
- Khi cần câu trả lời phù hợp với bối cảnh và ưu tiên của một vai trò

### Cách yêu cầu

**Format 1 (Trực tiếp):**
```
Hãy đóng vai trò [tên vai trò] và phân tích/đánh giá/đề xuất...
```

**Format 2 (Với tư cách):**
```
Với tư cách là [tên vai trò], hãy trả lời...
```

**Format 3 (Kết hợp):**
```
Hãy phân tích vấn đề này từ góc nhìn của [vai trò 1] và [vai trò 2] để có cái nhìn toàn diện.
```

### Ví dụ sử dụng

- **PM perspective**: "Với tư cách là PM 15+ năm trong giáo dục, hãy đánh giá tính khả thi của việc thêm tính năng multi-student vào Phase 2."
- **Giáo viên perspective**: "Hãy đóng vai trò giáo viên Toán 15+ năm và đánh giá xem lộ trình học tập này có phù hợp với học sinh lớp 6 không."
- **Học sinh perspective**: "Với tư cách là học sinh lớp 6 cần bổ sung kiến thức, hãy đánh giá xem giao diện này có dễ sử dụng không."
- **Backend architect perspective**: "Hãy đóng vai trò kiến trúc sư hệ thống và so sánh ưu nhược điểm giữa Docker Compose và K8s cho dự án này."

---

## Ghi chú

- Tài liệu này có thể được bổ sung thêm vai trò mới khi phát sinh nhu cầu
- Các vai trò có thể được kết hợp để có cái nhìn đa chiều về một vấn đề
- Khi sử dụng, có thể tham chiếu trực tiếp tên vai trò hoặc số thứ tự (ví dụ: "vai trò số 2" hoặc "Giáo viên Toán cấp 2")



================================================================================
# End of: _templates/role_presets.md
================================================================================
