# Backend Skeleton – Phase 1

**Project:** Tutor  
**Document type:** Architecture Design  
**Audience:** Developer | Tech  
**Status:** DESIGN – IMPLEMENT ONLY AFTER APPROVAL  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này định nghĩa cấu trúc backend thực thi Domain Model và System Law cho Phase 1 của dự án Tutor.

---

## 2. NGUYÊN TẮC TỔNG QUÁT

Backend Phase 1 được thiết kế để:

- Thực thi Domain Model một cách NGHIÊM NGẶT
- Bảo vệ invariant ở đúng Aggregate
- Không chuẩn bị cho Phase sau
- Không over-engineering
- Không cho phép bypass domain bằng admin, AI hoặc tiện tay code

Mọi quyết định trong backend:

- KHÔNG được mâu thuẫn Domain Model
- KHÔNG được mâu thuẫn Phase 1 Law Constraints
- KHÔNG được suy luận trial / license (đang dormant)

---

## 3. REPOSITORY MAPPING

Backend Phase 1 sử dụng 2 repository tách biệt rõ ràng.

### 3.1. tutor-core-service

- Technology: Java 17, Spring Boot 3.x, PostgreSQL
- Chứa TOÀN BỘ domain logic, application logic, persistence
- Là nguồn quyết định nghiệp vụ duy nhất

### 3.2. tutor-ai-service

- Technology: Python 3.11+, FastAPI
- Chỉ chứa AI capability (generate bài, giải thích)
- Stateless
- Không biết user, chapter, permission, lifecycle

**Giao tiếp:**

```
Frontend
↓
tutor-core-service (API + Domain + Application)
↓ HTTP (AIServiceClient)
tutor-ai-service (AI only)
```

AI KHÔNG BAO GIỜ gọi ngược Core Service.

---

## 4. KIẾN TRÚC BACKEND – NGUYÊN TẮC

- Single core service (không microservice)
- Monolithic nhưng modular
- Domain-centric, không CRUD-centric
- Aggregate Root bảo vệ invariant
- Service KHÔNG được mutate state ngoài authority

**Không tồn tại:**

- Policy engine
- Rule engine
- Permission matrix
- Feature toggle cho Phase sau

---

## 5. PACKAGE STRUCTURE – TOP LEVEL

Package gốc trong tutor-core-service:

```
com.tutor.core
```

Các module cấp cao:

- config
- common
- auth
- user
- admin
- chapter
- chapterprogress
- skill
- practice
- exercise
- ai
- bootstrap

Mỗi module có boundary rõ ràng, không truy cập chéo bừa bãi.

---

## 6. COMMON MODULE

**Package:** `com.tutor.core.common`

**Mục đích:**

- Dùng chung, KHÔNG chứa domain logic

**Bao gồm:**

- **exception**
  - ForbiddenException
  - NotFoundException
  - BadRequestException

- **guard**
  - RoleGuard (ADMIN, PARENT, STUDENT)
  - LifecycleGuard (bắt buộc trước mọi action học tập)
  - ChapterAccessGuard (student chỉ truy cập chapter của mình)
  - ParentStudentGuard (parent chỉ truy cập con của mình)

- **model**
  - BaseEntity (id, created_at, updated_at)
  - Role enum

**Không tồn tại:**

- TrialGuard
- LicenseGuard
- PermissionResolver
- PermissionMatrix

---

## 7. AUTH MODULE

**Package:** `com.tutor.core.auth`

**Mục đích:**

- Xác thực, KHÔNG quyết định nghiệp vụ

**Bao gồm:**

- AuthenticationController
- AuthenticationService
- JwtService
- RefreshTokenService
- CustomUserDetailsService

**Chức năng:**

- Login bằng username/password
- Issue JWT + refresh token
- Refresh token
- Logout (revoke refresh token)

**Không có:**

- OAuth
- OTP
- Registration
- Password recovery

User được tạo thủ công bởi admin.

---

## 8. USER MODULE

**Package:** `com.tutor.core.user`

**Mục đích:**

- Quản lý user profile, KHÔNG quản lý học tập

**Bao gồm:**

- UserEntity
- StudentProfileEntity
- ParentProfileEntity
- AdminProfileEntity
- UserRepository
- UserService
- UserController

**Chức năng:**

- Load user
- Xác định role
- CRUD user (admin only)
- Get profile

**KHÔNG:**

- Đổi lifecycle học tập
- Can thiệp ChapterProgress

---

## 9. ADMIN MODULE

**Package:** `com.tutor.core.admin`

**Mục đích:**

- Quản lý nội dung và cấu hình ban đầu
- KHÔNG bypass domain

**Bao gồm:**

- AdminController
- AdminService

**Admin được phép:**

- Tạo / sửa / xóa Chapter
- Tạo / sửa / xóa Skill
- Gán Chapter ban đầu cho Student (assignment)

**Admin KHÔNG được:**

- Đổi chapter_state
- Đánh dấu COMPLETED
- Cho học ngoài domain flow
- Bypass lifecycle

---

## 10. CHAPTER MODULE

**Package:** `com.tutor.core.chapter`

**Mục đích:**

- Quản lý Chapter như content

**Bao gồm:**

- ChapterEntity
- ChapterRepository
- ChapterService
- ChapterController

**Chức năng:**

- CRUD Chapter (admin)
- Read-only cho student/parent

**Chapter module KHÔNG:**

- Giữ tiến độ
- Giữ trạng thái học tập

---

## 11. CHAPTER PROGRESS MODULE (CỰC KỲ QUAN TRỌNG)

**Package:** `com.tutor.core.chapterprogress`

Đây là MODULE TRUNG TÂM của Phase 1.

**Bao gồm:**

- ChapterProgressEntity
- ChapterProgressRepository
- ChapterProgressService
- ChapterProgressDomainLogic
- ChapterProgressController

**Responsibilities:**

- Sở hữu chapter_state (LOCKED, IN_PROGRESS, COMPLETED)
- Enforce invariant: chỉ 1 Chapter IN_PROGRESS tại 1 thời điểm
- Tạo Practice
- Nhận Practice submission
- Emit PRACTICE_SUBMITTED
- Quyết định và emit CHAPTER_COMPLETED

**KHÔNG module nào khác được:**

- Đổi chapter_state
- Emit CHAPTER_COMPLETED

---

## 12. SKILL MODULE

**Package:** `com.tutor.core.skill`

**Mục đích:**

- Quản lý Skill và prerequisite
- KHÔNG quản lý tiến độ

**Bao gồm:**

- SkillEntity
- SkillPrerequisiteEntity
- SkillRepository
- SkillPrerequisiteRepository
- SkillService
- SkillController

**Skill KHÔNG:**

- Có state progression
- Có boolean completion

**SkillMastery:**

- Là Value Object
- Gắn với Student + Skill
- Được cập nhật qua Practice hợp lệ
- KHÔNG trigger Chapter state

---

## 13. EXERCISE MODULE

**Package:** `com.tutor.core.exercise`

**Mục đích:**

- Quản lý template bài tập

**Bao gồm:**

- ExerciseEntity
- ExerciseRepository
- ExerciseService
- ExerciseController

**Exercise:**

- Là template
- Không có trạng thái
- Không gắn Student

---

## 14. PRACTICE MODULE

**Package:** `com.tutor.core.practice`

**Mục đích:**

- Lưu kết quả luyện tập
- KHÔNG quyết định progression

**Bao gồm:**

- PracticeEntity
- PracticeRepository
- PracticeService
- PracticeController

**Practice:**

- Được tạo bởi ChapterProgress
- Chỉ tồn tại khi Chapter IN_PROGRESS
- Chỉ lưu kết quả (student_answer, is_correct, submitted_at)

**Practice KHÔNG:**

- Unlock chapter
- Đánh dấu completed
- Gọi AI trực tiếp

---

## 15. AI INTEGRATION MODULE

**Package:** `com.tutor.core.ai`

**Bao gồm:**

- AIServiceClient
- AIClientConfig
- AIServiceProperties

**AIServiceClient:**

- Gọi tutor-ai-service qua HTTP
- Validate input (skill_id, difficulty, count)
- Handle error

**AI KHÔNG:**

- Biết lifecycle
- Biết chapter_state
- Quyết định nghiệp vụ

System Core luôn override AI.

---

## 16. BOOTSTRAP MODULE

**Package:** `com.tutor.core.bootstrap`

**Bao gồm:**

- DataSeeder
- BootstrapConfig

**Chức năng:**

- Seed super admin
- Seed chapter
- Seed skill

**KHÔNG:**

- Seed trial
- Seed license
- Runtime mutation

---

## 17. CÁC THÀNH PHẦN BỊ CẤM TUYỆT ĐỐI

Không được tồn tại trong Phase 1:

**Service:**

- TrialService
- LicenseService
- PaymentService
- DeviceService
- PracticeSessionService
- ProgressService
- MasteryService (ngoài Value Object)

**Controller:**

- TrialController
- LicenseController
- PaymentController
- ProgressController

**Entity:**

- Trial*
- License*
- Device*
- PracticeSession*
- SkillCompletion (boolean)

**Guard:**

- TrialGuard
- LicenseGuard
- PermissionMatrixGuard

Nếu phát hiện → VI PHẠM SYSTEM LAW.

---

## 18. QUY TẮC TRIỂN KHAI

- Implement theo module
- Hoàn thành domain guard trước
- Không code tắt cho test
- Không bypass domain vì "tiện"

**Thứ tự triển khai khuyến nghị:**

1. common
2. auth
3. user
4. admin
5. chapter
6. chapterprogress
7. skill
8. exercise
9. practice
10. ai
11. bootstrap

---

## 19. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Phase 1 Core Scope](../phase-01.01-scope/phase-1-core-scope.md)
  - [System Law Constraints](../phase-01.02-system-law/)
  - [Domain Model](phase-1-domain-model.md)
  - [Java Package Mapping](phase-1-java-package-mapping.md)
  - [DB Schema](phase-1-db-schema-and-flyway-plan.md)

---

[← Quay lại Overview](../../README.md)
