# AI Service Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor AI Service - Python FastAPI service cho OCR, Math Solver, và Adaptive Learning.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | fastapi-microservice-template | ✅ |
| **Python** | 3.11+ | ✅ Upgraded |
| **FastAPI** | 0.104+ | ✅ Upgraded |
| **Pydantic** | 2.5.0+ | ✅ Upgraded |
| **Pydantic Settings** | 2.1.0+ | ✅ Included |
| **Uvicorn** | 0.24.0+ | ✅ Included |
| **PaddleOCR** | 2.7.0+ | ✅ Implemented |
| **SymPy** | 1.12.0+ | ✅ Implemented |
| **OpenAI SDK** | 1.3.0+ | ✅ Implemented |
| **Pillow** | 10.1.0+ | ✅ Implemented |
| **OpenCV** | 4.8.0+ | ✅ Implemented |
| **Redis** | 5.0.0+ | ✅ For caching |
| **SQLAlchemy** | 2.0.0+ | ✅ Included |
| **Alembic** | 1.12.0+ | ✅ Included |
| **httpx** | 0.25.0+ | ✅ For HTTP client |
| **Architecture** | Clean Architecture + DDD | ✅ |
| **Docker** | Configured | ✅ |
| **Testing** | pytest setup | ✅ |

### Role & API Endpoints

- **Vai trò**: OCR (nhận dạng đề Toán từ ảnh), Math Solver (giải bài từng bước), Hint Generator (gợi ý học tập), Adaptive Logic (đề xuất skill/độ khó)
- **API Endpoints** (Internal, chỉ Core Service gọi):
  - `POST /internal/ai/ocr` - OCR từ imageUrl
  - `POST /internal/ai/solve` - Giải bài Toán (text hoặc imageUrl)
  - `POST /internal/ai/hint` - Sinh gợi ý theo ngữ cảnh
  - `POST /internal/ai/recommend` - Đề xuất skill và độ khó
  - `POST /internal/ai/generate-exercises` - Tạo bài tập tự động
  - `POST /internal/ai/validate-latex` - Validate LaTeX formula
- **Performance Requirements**: OCR <3s, Solver <2s, Hint <5s, Overall <5s

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Python Upgrade**: Upgraded to 3.11+
- ✅ **FastAPI Upgrade**: Upgraded to 0.104+
- ✅ **PaddleOCR**: Added and implemented OCR service
- ✅ **SymPy**: Added and implemented math solver service
- ✅ **Step-by-Step Solution Generator**: Created solution generator
- ✅ **OCR + Math Solver Integration**: Integrated OCR and solver
- ✅ **Hint Generator**: Added hint generator using OpenAI
- ✅ **Adaptive Learning Engine**: Implemented adaptive learning recommendations
- ✅ **Redis Caching**: Added caching for OCR results
- ✅ **API Endpoints**: Implemented all core endpoints (`/internal/ai/ocr`, `/internal/ai/solve`, `/internal/ai/hint`, `/internal/ai/recommend`)
- ✅ **Exercise Generation**: Implemented exercise generation endpoints (`/internal/ai/generate-exercises`, `/internal/ai/validate-latex`)
- ✅ **Dependency Injection**: Setup dependency injection
- ✅ **Error Handling Middleware**: Added error handling middleware

### Pending Tasks 📋

- [ ] **End-to-End Testing**: Test complete flow from OCR to solution
- [ ] **Unit Tests**: Service layer tests for OCR and solver
- [ ] **Integration Tests**: API endpoint tests
- [ ] **API Key Authentication**: Add authentication for internal endpoints
- [ ] **Performance Optimization**: Optimize OCR and solver performance
- [ ] **Comprehensive Logging**: Enhance logging for debugging

---

## 4. NEXT STEPS PRIORITY

1. **High**: End-to-end testing - Test complete flow
2. **Medium**: Unit and integration tests - Service layer and API tests
3. **Medium**: API key authentication - Secure internal endpoints
4. **Low**: Performance optimization - Optimize OCR and solver
5. **Low**: Comprehensive logging - Enhance logging

---

## 5. DEPENDENCIES

### External Services

- **OpenAI API**: For hint generation
- **Redis**: For caching OCR results
- **PostgreSQL**: For data persistence (if needed)

### Module Dependencies

- Core Service depends on AI Service for AI capabilities
- AI Service is called by Core Service only (internal service)

---

## 6. TIMELINE

### Completed ✅

- Week 5: Upgrade Python/FastAPI, Add PaddleOCR, Implement OCR service
- Week 6: Add SymPy, Implement math solver, Create step-by-step solution generator
- Week 7: Integrate OCR + Math Solver, Add hint generator, Add adaptive learning engine, Add Redis caching, Implement all core API endpoints, Setup dependency injection, Add error handling middleware
- Week 8+: Exercise Generation endpoints (generate-exercises, validate-latex)

### Planned 📋

- Week 8-10: End-to-end testing, Unit and integration tests
- Future: API key authentication, Performance optimization

---

## 7. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [AI Service README](../../../../tutor-ai-service/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [Adaptive Learning](../education-logic/adaptive-learning.md) - Logic học tập thích ứng

---

**Last Updated**: 2025-12-21 (Updated: Exercise Generation endpoints added - generate-exercises and validate-latex endpoints are now available)

[← Quay lại Roadmap](README.md)

