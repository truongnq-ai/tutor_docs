# ENVIRONMENT CONFIGURATION – PHASE 1 (MVP)

**Project:** Tutor  
**Document type:** Technical Design  
**Audience:** Developer / DevOps  
**Status:** Draft  
**Version:** 2025-12-15-04-00  
**Author:** Product Consultant (ChatGPT)


---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả **cấu hình environment variables** cho Tutor – Phase 1, bao gồm:
- Environment variables list (dev, staging, prod)
- Secrets management
- Database connection strings
- AI Service API keys
- Third-party service configurations
- `.env.example` templates

Tài liệu này đảm bảo cấu hình nhất quán và bảo mật.

---


## 2. ENVIRONMENTS

### 2.1. Environment Types

- **Development (dev):** Local development
- **Staging:** Pre-production testing
- **Production (prod):** Live environment

---


## 3. CORE SERVICE (JAVA SPRING BOOT)

### 3.1. Environment Variables

#### Database Configuration

```properties
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/tutor_db
SPRING_DATASOURCE_USERNAME=tutor
SPRING_DATASOURCE_PASSWORD=tutor123
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver

# Connection Pool
SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=10
SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE=5
SPRING_DATASOURCE_HIKARI_CONNECTION_TIMEOUT=30000
```

#### JWT Configuration

```properties
# JWT
JWT_SECRET=your-secret-key-min-256-bits
JWT_EXPIRATION_MS=3600000
JWT_ISSUER=tutor-app
```

#### AI Service Configuration

```properties
# AI Service
AI_SERVICE_URL=http://localhost:8001
AI_SERVICE_TIMEOUT_MS=30000
AI_SERVICE_RETRY_ATTEMPTS=3
```

#### Application Configuration

```properties
# Server
SERVER_PORT=8080
SERVER_ERROR_INCLUDE_MESSAGE=always

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_TUTOR=DEBUG

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

#### File Storage

```properties
# Object Storage (S3 compatible)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET_NAME=tutor-uploads
S3_REGION=us-east-1
```

---

### 3.2. .env.example Template

**File:** `core-service/.env.example`

```properties
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/tutor_db
SPRING_DATASOURCE_USERNAME=tutor
SPRING_DATASOURCE_PASSWORD=CHANGE_ME

# JWT
JWT_SECRET=CHANGE_ME_MIN_256_BITS
JWT_EXPIRATION_MS=3600000

# AI Service
AI_SERVICE_URL=http://localhost:8001
AI_SERVICE_TIMEOUT_MS=30000

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000

# S3
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=CHANGE_ME
S3_SECRET_KEY=CHANGE_ME
S3_BUCKET_NAME=tutor-uploads
```

---

## 4. AI SERVICE (PYTHON)

### 4.1. Environment Variables

#### OpenAI Configuration

```properties
# OpenAI API
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.3
```

#### Core Service Configuration

```properties
# Core Service
CORE_SERVICE_URL=http://localhost:8080
CORE_SERVICE_API_KEY=internal-api-key
```

#### Application Configuration

```properties
# Server
PORT=8001
HOST=0.0.0.0

# Logging
LOG_LEVEL=INFO
```

#### OCR Configuration (nếu dùng)

```properties
# OCR Service (optional)
OCR_SERVICE_URL=https://api.ocr-service.com
OCR_API_KEY=...
```

---

### 4.2. .env.example Template

**File:** `ai-service/.env.example`

```properties
# OpenAI
OPENAI_API_KEY=CHANGE_ME
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_MAX_TOKENS=2000

# Core Service
CORE_SERVICE_URL=http://localhost:8080
CORE_SERVICE_API_KEY=CHANGE_ME

# Server
PORT=8001
LOG_LEVEL=INFO
```

---

## 5. PARENT DASHBOARD (NEXT.JS)

### 5.1. Environment Variables

#### API Configuration

```properties
# API
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_API_TIMEOUT_MS=30000
```

#### Authentication

```properties
# Auth (optional - nếu dùng NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me-in-production
```

#### Application Configuration

```properties
# App
NEXT_PUBLIC_APP_NAME=Tutor
NEXT_PUBLIC_APP_ENV=development
```

---

### 5.2. .env.example Template

**File:** `parent-dashboard/.env.example`

```properties
# API
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=CHANGE_ME

# App
NEXT_PUBLIC_APP_NAME=Tutor
NEXT_PUBLIC_APP_ENV=development
```

---

## 6. STUDENT APP (FLUTTER)

### 6.1. Environment Variables

Flutter sử dụng `.env` file hoặc build configuration.

#### API Configuration

```properties
# API
API_BASE_URL=http://localhost:8080/api
API_TIMEOUT_SECONDS=30
```

#### Application Configuration

```properties
# App
APP_NAME=Tutor
APP_VERSION=1.0.0
ENVIRONMENT=development
```

---

### 6.2. Configuration File

**File:** `student-app/lib/config/env.dart`

```dart
class Env {
  static const String apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://localhost:8080/api',
  );
  
  static const String appName = 'Tutor';
  static const String environment = String.fromEnvironment(
    'ENVIRONMENT',
    defaultValue: 'development',
  );
}
```

---

## 7. ENVIRONMENT-SPECIFIC VALUES

### 7.1. Development

| Variable | Value |
|----------|-------|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/tutor_db` |
| `AI_SERVICE_URL` | `http://localhost:8001` |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080/api` |
| `LOG_LEVEL` | `DEBUG` |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000,http://localhost:5173` |

---

### 7.2. Staging

| Variable | Value |
|----------|-------|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://staging-db.tutor.app:5432/tutor_db` |
| `AI_SERVICE_URL` | `http://ai-service-staging.tutor.app:8001` |
| `NEXT_PUBLIC_API_URL` | `https://api-staging.tutor.app/api` |
| `LOG_LEVEL` | `INFO` |
| `CORS_ALLOWED_ORIGINS` | `https://dashboard-staging.tutor.app` |

---

### 7.3. Production

| Variable | Value |
|----------|-------|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://prod-db.tutor.app:5432/tutor_db` |
| `AI_SERVICE_URL` | `http://ai-service-prod.tutor.app:8001` |
| `NEXT_PUBLIC_API_URL` | `https://api.tutor.app/api` |
| `LOG_LEVEL` | `WARN` |
| `CORS_ALLOWED_ORIGINS` | `https://dashboard.tutor.app` |

---

## 8. SECRETS MANAGEMENT

### 8.1. Development

- Sử dụng `.env` files (không commit vào git)
- `.env.example` trong repository
- Secrets trong local `.env`

### 8.2. Staging/Production

**Options:**
1. **Environment Variables** (Docker/Kubernetes)
2. **AWS Secrets Manager** (nếu dùng AWS)
3. **HashiCorp Vault** (enterprise)
4. **GitHub Secrets** (cho CI/CD)

### 8.3. Best Practices

- ✅ Never commit secrets to git
- ✅ Rotate secrets regularly
- ✅ Use different secrets per environment
- ✅ Limit access to secrets
- ✅ Audit secret access

---

## 9. DATABASE CONNECTION STRINGS

### 9.1. Format

```
jdbc:postgresql://[host]:[port]/[database]?[parameters]
```

### 9.2. Examples

**Development:**
```
jdbc:postgresql://localhost:5432/tutor_db?ssl=false
```

**Staging:**
```
jdbc:postgresql://staging-db.tutor.app:5432/tutor_db?ssl=true&sslmode=require
```

**Production:**
```
jdbc:postgresql://prod-db.tutor.app:5432/tutor_db?ssl=true&sslmode=require&sslrootcert=/path/to/ca-cert.pem
```

---

## 10. THIRD-PARTY SERVICES

### 10.1. OpenAI API

```properties
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-... (optional)
```

### 10.2. Email Service (Phase 2)

```properties
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=...
SMTP_PASSWORD=...
SMTP_FROM=noreply@tutor.app
```

### 10.3. Zalo OA (Phase 2)

```properties
ZALO_OA_ID=...
ZALO_OA_SECRET=...
ZALO_OA_ACCESS_TOKEN=...
```

---

## 11. DOCKER ENVIRONMENT

### 11.1. docker-compose.yml

```yaml
version: '3.8'

services:
  core-service:
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/tutor_db
      - SPRING_DATASOURCE_USERNAME=tutor
      - SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
      - AI_SERVICE_URL=http://ai-service:8001
    env_file:
      - .env.core-service

  ai-service:
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - CORE_SERVICE_URL=http://core-service:8080
    env_file:
      - .env.ai-service

  postgres:
    environment:
      - POSTGRES_USER=tutor
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=tutor_db
```

---

## 12. VALIDATION

### 12.1. Startup Validation

**Java Spring Boot:**
```java
@Component
public class EnvironmentValidator {
    
    @PostConstruct
    public void validate() {
        if (jwtSecret.length() < 32) {
            throw new IllegalStateException("JWT_SECRET must be at least 32 characters");
        }
        // ... other validations
    }
}
```

**Python:**
```python
import os
from typing import Optional

def validate_env():
    required_vars = [
        'OPENAI_API_KEY',
        'CORE_SERVICE_URL'
    ]
    
    for var in required_vars:
        if not os.getenv(var):
            raise ValueError(f"Missing required environment variable: {var}")
```

---

## 13. ENVIRONMENT SETUP SCRIPT

### 13.1. setup-env.sh

```bash
#!/bin/bash

echo "Setting up environment..."

# Create .env files from examples
cp core-service/.env.example core-service/.env
cp ai-service/.env.example ai-service/.env
cp parent-dashboard/.env.example parent-dashboard/.env

# Prompt for secrets
read -sp "Enter JWT Secret (min 32 chars): " jwt_secret
echo "JWT_SECRET=$jwt_secret" >> core-service/.env

read -sp "Enter OpenAI API Key: " openai_key
echo "OPENAI_API_KEY=$openai_key" >> ai-service/.env

echo "Environment setup complete!"
echo "Please review .env files and update as needed."
```

---

## 14. TÀI LIỆU LIÊN QUAN

- [Development Setup Guide](./development_setup_phase_1-2025-12-15-03-00.md)
- [Deployment Guide](./deployment_guide_phase_1-2025-12-15-04-15.md)

---

## 15. GHI CHÚ / TODO

- [ ] Setup secrets management tool (AWS Secrets Manager/Vault)
- [ ] Create environment validation scripts
- [ ] Document secret rotation procedures
- [ ] Add environment-specific configuration files

---

## 16. LỊCH SỬ THAY ĐỔI

- 2025-12-15-04-00: Tạo mới Environment Configuration



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)