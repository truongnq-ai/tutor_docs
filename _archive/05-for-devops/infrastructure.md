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

