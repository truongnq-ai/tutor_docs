# Roadmap Overview

**Project:** Tutor  
**Document type:** Implementation Roadmap - System Overview  
**Audience:** Developers, Project Managers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này cung cấp cái nhìn tổng quan về tiến độ triển khai của toàn bộ hệ thống Tutor, bao gồm status của các modules, timeline, milestones, và dependencies.

---

## 2. MODULE STATUS SUMMARY

| Module | Foundation | Tech Stack | Missing Dependencies | Implementation Status |
|--------|-----------|------------|----------------------|----------------------|
| **tutor-admin-dashboard** | ✅ Complete | ✅ Meets requirements | Firebase Admin SDK, API Client | 🚧 40% |
| **tutor-parent-dashboard** | ✅ Complete | ✅ Meets requirements | Firebase, Phone Auth, OTP Service | 🚧 40% |
| **tutor-core-service** | ✅ Complete | ✅ Meets requirements | SMS Gateway, AI Service Client, S3 Integration | 🚧 70% |
| **tutor-ai-service** | ✅ Complete | ✅ Meets requirements | None | 🚧 85% |
| **tutor-student-app** | ✅ Complete | ✅ Meets requirements | image_picker, camera, OAuth packages | 🚧 35% |

**Legend:**
- ✅ Complete
- 🚧 In Progress
- 📋 Not Started

**Chi tiết từng module:**
- [Core Service](core-service.md)
- [AI Service](ai-service.md)
- [Admin Dashboard](admin-dashboard.md)
- [Parent Dashboard](parent-dashboard.md)
- [Student App](student-app.md)

---

## 3. IMPLEMENTATION ROADMAP

### Phase 1: Foundation Setup (Week 1-2)

#### Week 1: Infrastructure & Dependencies
- [ ] Setup PostgreSQL database
- [ ] Create Firebase project
- [ ] Configure environment variables for all modules
- [ ] Add missing dependencies to all modules
- [ ] Verify all modules can build/run

#### Week 2: Core Service Foundation
- [x] Add Firebase Admin SDK to Core Service ✅
- [x] Implement Firebase configuration ✅
- [x] Create OTP service structure ✅
- [ ] Setup SMS Gateway abstraction layer
- [x] Implement basic phone authentication ✅

### Phase 2: Authentication (Week 3-4)

#### Week 3: Core Service Authentication
- [x] Implement OTP generation and verification ✅
- [x] Implement phone/password authentication ✅
- [x] Implement OAuth token verification ✅
- [x] Add rate limiting for OTP ✅

#### Week 4: Frontend Authentication
- [ ] Customize Parent Dashboard authentication
- [ ] Add OAuth buttons and flow
- [ ] Customize OTP verification pages
- [ ] Setup API client in Parent Dashboard

### Phase 3: AI Service (Week 5-7) ✅ **COMPLETED**

#### Week 5: Upgrade & OCR ✅
- [x] Upgrade Python to 3.11+ ✅
- [x] Upgrade FastAPI to 0.104+ ✅
- [x] Add PaddleOCR ✅
- [x] Implement OCR service ✅

#### Week 6: Math Solver ✅
- [x] Add SymPy ✅
- [x] Implement math solver service ✅
- [x] Create step-by-step solution generator ✅

#### Week 7: Integration ✅
- [x] Integrate OCR + Math Solver ✅
- [x] Add hint generator (OpenAI) ✅
- [x] Add adaptive learning engine ✅
- [x] Add Redis caching ✅
- [x] Implement all API endpoints ✅
- [x] Setup dependency injection ✅
- [x] Add error handling middleware ✅
- [ ] Test end-to-end flow (pending)

### Phase 4: Student App (Week 8-10)

#### Week 8: Setup & Onboarding
- [ ] Add missing packages
- [ ] Setup API client
- [x] Implement onboarding flow ✅

#### Week 9: Tutor Mode
- [ ] Implement camera integration
- [ ] Implement image picker
- [ ] Implement image upload
- [ ] Implement solution display

#### Week 10: Practice & Progress
- [ ] Implement practice sessions
- [ ] Implement mini tests
- [ ] Implement progress tracking

### Phase 5: Parent Dashboard (Week 11-12)

#### Week 11: Dashboard & Reporting
- [ ] Build dashboard overview
- [ ] Build weekly/monthly reports
- [ ] Build weak skills page

#### Week 12: Polish & Testing
- [ ] Add landing page
- [ ] Testing and bug fixes
- [ ] Performance optimization

---

## 4. CROSS-MODULE DEPENDENCIES

### Infrastructure Services

All modules depend on:

1. **PostgreSQL Database**
   - Status: ✅ Docker setup available
   - Action: Start with `docker-compose up -d postgres`

2. **Firebase Authentication**
   - Status: 📋 Needs setup
   - Action: Create Firebase project and configure

3. **Object Storage (S3)**
   - Status: 📋 Needs setup
   - Action: Setup MinIO (dev) or AWS S3 (prod)

### Module Dependencies

- **Frontend modules** (Admin Dashboard, Parent Dashboard, Student App) → **Core Service**
- **Core Service** → **AI Service** (for OCR, solving, hints)
- **Core Service** → **Firebase** (for authentication)
- **All modules** → **PostgreSQL** (for data persistence)

---

## 5. ENVIRONMENT SETUP CHECKLIST

### Development Environment

- [ ] **PostgreSQL**: Running on localhost:5432
- [ ] **Core Service**: Running on localhost:8080
- [ ] **AI Service**: Running on localhost:8001
- [ ] **Parent Dashboard**: Running on localhost:3000
- [ ] **Admin Dashboard**: Running on localhost:3001 (optional)
- [ ] **Student App**: Running on emulator/device

### Environment Variables

Each module needs `.env` or `.env.local` file. See:
- [Environment Configuration Guide](../setup/environment-config.md)

### Firebase Setup

1. Create Firebase project
2. Enable Authentication:
   - Phone authentication
   - Google Sign-In
   - Apple Sign-In
3. Generate service account key
4. Add credentials to Core Service

---

## 6. DEPLOYMENT READINESS

### Current Status

| Component | Local Dev | Docker | Production | Status |
|-----------|----------|--------|------------|--------|
| Core Service | ✅ | ✅ | 📋 | Ready for Docker |
| AI Service | ✅ | ✅ | 📋 | Ready for Docker |
| Parent Dashboard | ✅ | 📋 | 📋 | Needs Dockerfile |
| Admin Dashboard | ✅ | 📋 | 📋 | Needs Dockerfile |
| Student App | ✅ | N/A | 📋 | Needs build config |

### Deployment Tasks

- [ ] Create Dockerfiles for all services
- [ ] Create docker-compose.yml for local development
- [ ] Create docker-compose.prod.yml for production
- [ ] Setup CI/CD pipeline
- [ ] Configure production environment variables
- [ ] Setup monitoring and logging
- [ ] Create deployment scripts

---

## 7. TESTING STRATEGY

### Unit Tests
- [ ] Core Service: Service layer tests
- [ ] AI Service: OCR and solver tests
- [ ] Student App: Widget and unit tests

### Integration Tests
- [ ] API endpoint tests
- [ ] Database integration tests
- [ ] Service-to-service communication tests

### End-to-End Tests
- [ ] Complete user flows
- [ ] Authentication flows
- [ ] Learning flow tests

---

## 8. KNOWN ISSUES & LIMITATIONS

### Current Limitations

1. **AI Service**: ✅ FastAPI and Python versions upgraded
2. **AI Service**: Unit and integration tests pending
3. **AI Service**: API key authentication for internal endpoints pending
4. **Core Service**: SMS Gateway abstraction layer not implemented (Firebase Auth REST API used directly)
5. **All Frontends**: API clients not configured
6. **Student App**: Camera/image picker not integrated

### Technical Debt

- [x] Upgrade AI Service dependencies ✅
- [x] Standardize error handling in AI Service ✅
- [ ] Add comprehensive logging (enhancements needed)
- [ ] Implement monitoring and alerting
- [ ] Add API rate limiting
- [x] Implement caching strategies (Redis) ✅
- [ ] Add unit and integration tests for AI Service

---

## 9. QUICK START COMMANDS

### Start All Services (Development)

```bash
# 1. Start database
docker-compose up -d postgres

# 2. Start Core Service
cd tutor-core-service
mvn spring-boot:run

# 3. Start AI Service (in another terminal)
cd tutor-ai-service
poetry install
poetry run uvicorn src.presentation.main:app --reload --port 8001

# 4. Start Parent Dashboard (in another terminal)
cd tutor-parent-dashboard
npm install
npm run dev

# 5. Start Student App (in another terminal)
cd tutor-student-app
flutter pub get
flutter run
```

---

## 10. NEXT IMMEDIATE ACTIONS

### Priority 1 (This Week)

1. **Setup Firebase Project** ✅
   - Create Firebase project
   - Enable authentication methods
   - Generate service account key
   - Add to Core Service

2. **Add Missing Dependencies**
   - Core Service: Firebase Admin SDK ✅ (Đã thêm)
   - AI Service: Upgrade FastAPI, add OCR/Math libraries ✅ (Đã hoàn thành)
   - Student App: Add image_picker, camera, OAuth packages

3. **Environment Configuration**
   - Create `.env` files for all modules
   - Configure API endpoints
   - Setup database connections

### Priority 2 (Next Week)

1. **Implement OTP Service** (Core Service) ✅ (Đã hoàn thành)
2. **Implement Phone Authentication** (Core Service) ✅ (Đã hoàn thành)
3. **Implement OAuth Providers** (Core Service) ✅ (Đã hoàn thành)
4. **Implement OCR Service** (AI Service) ✅ (Đã hoàn thành)
5. **Implement Math Solver Service** (AI Service) ✅ (Đã hoàn thành)
6. **Implement Hint Generator Service** (AI Service) ✅ (Đã hoàn thành)
7. **Implement Adaptive Learning Service** (AI Service) ✅ (Đã hoàn thành)
8. **Setup API Clients** (All frontends)

### Priority 3 (Following Weeks)

1. **Authentication Flows** (All modules)
2. **Business Logic Implementation**
3. **UI Implementation** (Frontends)

---

## 11. TÀI LIỆU LIÊN QUAN

- [Roadmap README](README.md) - Cấu trúc roadmap
- [Core Service Roadmap](core-service.md) - Chi tiết Core Service
- [AI Service Roadmap](ai-service.md) - Chi tiết AI Service
- [Admin Dashboard Roadmap](admin-dashboard.md) - Chi tiết Admin Dashboard
- [Parent Dashboard Roadmap](parent-dashboard.md) - Chi tiết Parent Dashboard
- [Student App Roadmap](student-app.md) - Chi tiết Student App
- [Development Setup](../setup/development-setup.md) - Hướng dẫn setup
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống

---

**Last Updated**: 2025-12-21

[← Quay lại Roadmap](README.md)

