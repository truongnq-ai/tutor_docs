# Admin Dashboard Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor Admin Dashboard - Next.js web dashboard cho admin quản trị.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | TailAdmin Next.js template | ✅ |
| **Next.js** | 16.0.10 | ✅ Meets requirement |
| **React** | 19.2.0 | ✅ Latest |
| **TypeScript** | 5.9.3 | ✅ Meets requirement |
| **Tailwind CSS** | 4.1.17 | ✅ Latest |
| **Charts** | ApexCharts 4.7.0 | ✅ Meets requirement |

### Missing Dependencies

```bash
# Firebase Admin SDK (if needed for OAuth verification)
npm install firebase-admin

# API Client setup (axios or fetch wrapper)
# Already available in Next.js, needs configuration
```

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Foundation**: Base template setup complete
- ✅ **Tech Stack**: All required dependencies installed

### Pending Tasks 📋

- [ ] **API Client Setup**: Setup API client for Core Service
- [ ] **Authentication Customization**: Customize authentication for admin role
- [ ] **Content Management Features**: Implement content management features
- [ ] **System Monitoring Dashboard**: Build system monitoring dashboard
- [ ] **AI Quality Monitoring Views**: Add AI quality monitoring views

---

## 4. NEXT STEPS PRIORITY

1. **High**: API client setup and Core Service integration
2. **Medium**: Authentication customization
3. **Low**: Admin-specific features (content management, monitoring)

---

## 5. DEPENDENCIES

### External Services

- **Core Service**: API backend for all operations
- **Firebase** (optional): For OAuth verification if needed

### Module Dependencies

- Admin Dashboard depends on Core Service for all data and operations
- Admin Dashboard is independent from other frontend modules

---

## 6. TIMELINE

### Completed ✅

- Week 1: Foundation setup, Tech stack installation

### Planned 📋

- Week 11-12: API client setup, Authentication customization
- Future: Content management, System monitoring, AI quality monitoring

---

## 7. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Admin Dashboard README](../../../../tutor-admin-dashboard/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints

---

**Last Updated**: 2025-12-21

[← Quay lại Roadmap](README.md)

