# Core Service Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor Core Service - Java Spring Boot backend service.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | spring-security-jwt template | ✅ |
| **Java** | 17 LTS | ✅ Meets requirement |
| **Spring Boot** | 3.5.8 | ✅ Upgraded from 3.2.5 |
| **Spring Security** | 6.5.4+ | ✅ Auto-managed by Spring Boot |
| **PostgreSQL** | 15+ | ✅ Supported (JDBC Driver: 42.7.8) |
| **JWT** | Configured | ✅ Ready (JJWT 0.12.3) |
| **Liquibase** | 4.31.0+ | ✅ Included (auto-managed) |
| **Swagger/OpenAPI** | 2.8.14 | ✅ Upgraded from 2.2.0 |
| **Firebase Admin SDK** | 9.7.0 | ✅ Upgraded from 9.2.0 |
| **Spring WebFlux** | Included | ✅ For AI Service HTTP client |
| **Cloudinary SDK** | 2.3.2 | ✅ For image storage |

### Missing Dependencies

Add to `pom.xml`:

```xml
<!-- AWS SDK for S3 (Object Storage) -->
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>s3</artifactId>
    <version>2.20.0</version>
</dependency>
```

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Firebase Admin SDK**: Integrated and configured
- ✅ **OTP Service**: Fully implemented with Firebase
- ✅ **Phone-based Authentication**: Customized for phone/password login
- ✅ **OAuth Providers**: Google and Apple OAuth token verification implemented
- ✅ **Rate Limiting**: Implemented for OTP endpoints (3 requests/day per phone)
- ✅ **Refresh Token**: Rotation-based refresh token implementation
- ✅ **Image Upload**: Cloudinary integration for image storage
- ✅ **User Management**: Student, Parent, and Admin user management

### Pending Tasks 📋

- [ ] **SMS Gateway Abstraction**: Create abstraction layer (currently using Firebase directly)
- [ ] **AI Service Client**: HTTP client for AI Service communication
- [ ] **Learning Progress APIs**: Practice sessions, mastery tracking
- [ ] **Reporting APIs**: Learning summary, weak skills, progress reports
- [ ] **Object Storage (S3) Integration**: For production image storage

---

## 4. NEXT STEPS PRIORITY

1. **High**: AI Service client - HTTP client for AI Service communication
2. **Medium**: Learning Progress APIs - Practice sessions, mastery tracking
3. **Medium**: Reporting APIs - Learning summary, weak skills, progress reports
4. **Low**: SMS Gateway abstraction layer
5. **Low**: Object Storage (S3) integration

---

## 5. DEPENDENCIES

### External Services

- **PostgreSQL**: Database for data persistence
- **Firebase**: Authentication (OTP, OAuth verification)
- **AI Service**: For OCR, math solving, hints, recommendations
- **Object Storage (S3/Cloudinary)**: For image storage

### Module Dependencies

- Frontend modules (Admin Dashboard, Parent Dashboard, Student App) depend on Core Service
- Core Service depends on AI Service for AI capabilities

---

## 6. TIMELINE

### Completed ✅

- Week 2-3: Firebase Admin SDK integration, OTP service, Phone authentication
- Week 3-4: OAuth providers (Google/Apple), Rate limiting

### In Progress 🚧

- Week 8-10: AI Service client integration
- Week 8-10: Learning Progress APIs

### Planned 📋

- Week 11-12: Reporting APIs
- Future: SMS Gateway abstraction, S3 integration

---

## 7. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Core Service README](../../../../tutor-core-service/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints

---

**Last Updated**: 2025-12-21

[← Quay lại Roadmap](README.md)

