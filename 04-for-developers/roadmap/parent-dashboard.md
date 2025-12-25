# Parent Dashboard Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor Parent Dashboard - Next.js web dashboard cho phụ huynh.

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
| **FullCalendar** | 6.1.19 | ✅ Calendar feature |
| **OTP Page** | Template available | ✅ |

### Missing Dependencies

```bash
# Firebase Admin SDK (for OAuth verification)
npm install firebase-admin

# Firebase Client SDK (for frontend OAuth)
npm install firebase

# API Client setup
# Needs configuration
```

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Foundation**: Base template setup complete
- ✅ **Tech Stack**: All required dependencies installed
- ✅ **OTP Page Template**: OTP verification page template available

### Pending Tasks 📋

- [ ] **Authentication Customization**: Customize login form for phone/password
- [ ] **OAuth Integration**: Add OAuth buttons (Google/Apple)
- [ ] **OAuth Flow**: Implement OAuth flow with phone verification
- [ ] **OTP Verification**: Customize OTP verification page
- [ ] **API Client Setup**: Setup API client for Core Service
- [ ] **Dashboard Overview**: Build dashboard overview page
- [ ] **Reporting Pages**: Build reporting pages (weekly/monthly)
- [ ] **Weak Skills Page**: Build weak skills page
- [ ] **Progress Tracking Page**: Build progress tracking page
- [ ] **Landing Page**: Create landing page

---

## 4. NEXT STEPS PRIORITY

1. **High**: Authentication customization (phone + OAuth)
2. **High**: API client setup
3. **Medium**: Dashboard and reporting pages
4. **Low**: Landing page

---

## 5. DEPENDENCIES

### External Services

- **Core Service**: API backend for all operations
- **Firebase**: For OAuth authentication

### Module Dependencies

- Parent Dashboard depends on Core Service for all data and operations
- Parent Dashboard is independent from other frontend modules

---

## 6. TIMELINE

### Completed ✅

- Week 1: Foundation setup, Tech stack installation

### Planned 📋

- Week 4: Authentication customization, OAuth integration
- Week 11-12: Dashboard overview, Reporting pages, Weak skills page, Progress tracking

---

## 7. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Parent Dashboard README](../../../../tutor-parent-dashboard/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints

---

**Last Updated**: 2025-12-21

[← Quay lại Roadmap](README.md)

