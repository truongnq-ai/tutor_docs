# Java Package & Class Mapping – Phase 1

**Project:** Tutor  
**Document type:** Architecture Design  
**Audience:** Developer | Tech  
**Status:** DESIGN – MUST BE FOLLOWED BEFORE CODING  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

File này là "bản đồ hiện thực hóa cuối cùng" từ:

- Domain Model
- Backend Skeleton

sang:

- Java package
- Java class skeleton

**Mục tiêu:**

- Ép code Java tuân thủ đúng Domain Model
- Khóa ranh giới authority ở cấp class
- Ngăn mọi cách hiểu lệch khi code
- Tránh tình trạng "code chạy được nhưng sai hệ thống"

**File này:**

- KHÔNG phải coding style guide
- KHÔNG phải DB schema
- KHÔNG định nghĩa logic chi tiết
- KHÔNG mở rộng scope Phase 1

Nếu có mâu thuẫn giữa:

- Code Java
- File này

→ **FILE NÀY THẮNG** (sau System Law & Domain Model)

---

## 2. NGUYÊN TẮC CHUNG CHO JAVA PACKAGE

### 2.1. Package phản ánh DOMAIN, không phản ánh kỹ thuật

- Không đặt package theo REST / Controller
- Không gom theo "service type"
- Mỗi package đại diện một bounded context nhỏ trong Phase 1

### 2.2. Aggregate Root phải có package riêng

- Mỗi Aggregate Root:
  - có Entity
  - có Domain Logic
  - có Repository
- Không chia nhỏ Aggregate Root sang nhiều package

### 2.3. Controller KHÔNG được chứa domain logic

- Controller:
  - nhận request
  - gọi Application Service
  - trả response
- Controller KHÔNG:
  - đổi state
  - kiểm tra invariant

### 2.4. Domain Logic KHÔNG được bị bypass

- Không có:
  - public setter cho state
  - service "tiện tay sửa"
  - update trực tiếp trong repository

---

## 3. ROOT PACKAGE

Tất cả code Phase 1 nằm dưới:

```
com.tutor.core
```

Không tồn tại code Phase 1 ngoài namespace này.

---

## 4. COMMON PACKAGE

**Package:** `com.tutor.core.common`

Chứa các thành phần dùng chung, KHÔNG chứa domain logic.

**Class skeleton:**

- **exception**
  - ForbiddenException
  - NotFoundException
  - BadRequestException

- **guard**
  - RoleGuard
  - LifecycleGuard
  - ChapterAccessGuard
  - ParentStudentGuard

- **model**
  - BaseEntity (id, createdAt, updatedAt)
  - Role enum

**Forbidden:**

- TrialGuard
- LicenseGuard
- PermissionMatrix
- PolicyEngine

---

## 5. AUTH PACKAGE

**Package:** `com.tutor.core.auth`

**Class skeleton:**

- AuthenticationController
- AuthenticationService
- JwtService
- RefreshTokenService
- CustomUserDetailsService

**Authority rules:**

- Auth module CHỈ xác thực
- KHÔNG quyết định quyền học
- KHÔNG kiểm tra chapter / skill

---

## 6. USER PACKAGE

**Package:** `com.tutor.core.user`

**Class skeleton:**

- UserEntity
- StudentProfileEntity
- ParentProfileEntity
- AdminProfileEntity
- UserRepository
- UserService
- UserController

**Authority rules:**

- UserService KHÔNG được:
  - đổi lifecycle học tập
  - can thiệp ChapterProgress
- User module chỉ quản lý profile & role

---

## 7. ADMIN PACKAGE

**Package:** `com.tutor.core.admin`

**Class skeleton:**

- AdminService
- AdminController

**Authority rules:**

- AdminService được:
  - CRUD Chapter
  - CRUD Skill
  - Gán Chapter ban đầu cho Student

**AdminService TUYỆT ĐỐI KHÔNG được:**

- Đổi chapter_state
- Đánh dấu COMPLETED
- Bypass lifecycle
- Thao tác ChapterProgress trực tiếp

---

## 8. CHAPTER PACKAGE (CONTENT ONLY)

**Package:** `com.tutor.core.chapter`

**Class skeleton:**

- ChapterEntity
- ChapterRepository
- ChapterService
- ChapterController

**Authority rules:**

- ChapterService chỉ quản lý content
- KHÔNG chứa state học tập
- KHÔNG có progression logic

---

## 9. CHAPTER PROGRESS PACKAGE (CORE DOMAIN)

**Package:** `com.tutor.core.chapterprogress`

ĐÂY LÀ PACKAGE QUAN TRỌNG NHẤT PHASE 1.

**Class skeleton:**

- ChapterProgressEntity
  - fields: studentId, chapterId, chapterState

- ChapterProgressRepository

- ChapterProgressDomainLogic
  - startChapter()
  - createPractice()
  - submitPractice()
  - checkCompletion()
  - completeChapter()

- ChapterProgressService
  - orchestration
  - transaction boundary
  - call domain logic

- ChapterProgressController

**Authority rules (CỰC KỲ NGHIÊM NGẶT):**

- CHỈ ChapterProgressDomainLogic được:
  - đổi chapterState
  - emit CHAPTER_COMPLETED
  - tạo Practice

- Không class nào khác được phép mutate chapterState

**Forbidden:**

- Setter public cho chapterState
- AdminService gọi update state
- AI client gọi update state

---

## 10. SKILL PACKAGE

**Package:** `com.tutor.core.skill`

**Class skeleton:**

- SkillEntity
- SkillPrerequisiteEntity
- SkillRepository
- SkillPrerequisiteRepository
- SkillService
- SkillController

**SkillMastery:**

- KHÔNG phải Entity
- Là Value Object
- Có thể là class:
  - SkillMasteryValue
  - Không repository riêng
  - Được update thông qua Practice flow

**Authority rules:**

- SkillService KHÔNG được:
  - unlock Chapter
  - đánh dấu completed
- Skill chỉ là năng lực, không phải tiến độ

---

## 11. EXERCISE PACKAGE

**Package:** `com.tutor.core.exercise`

**Class skeleton:**

- ExerciseEntity
- ExerciseRepository
- ExerciseService
- ExerciseController

**Authority rules:**

- Exercise là template
- Không gắn Student
- Không có state

---

## 12. PRACTICE PACKAGE

**Package:** `com.tutor.core.practice`

**Class skeleton:**

- PracticeEntity
- PracticeRepository
- PracticeService
- PracticeController

**Authority rules:**

- PracticeService KHÔNG được:
  - unlock Chapter
  - đổi chapterState
  - emit CHAPTER_COMPLETED

**Practice:**

- Được tạo bởi ChapterProgressDomainLogic
- PracticeService chỉ persist & query

---

## 13. AI PACKAGE

**Package:** `com.tutor.core.ai`

**Class skeleton:**

- AIServiceClient
- AIClientConfig
- AIServiceProperties

**Authority rules:**

- AIServiceClient KHÔNG:
  - biết lifecycle
  - biết chapterState
  - emit domain event
- AI chỉ là helper

---

## 14. BOOTSTRAP PACKAGE

**Package:** `com.tutor.core.bootstrap`

**Class skeleton:**

- DataSeeder
- BootstrapConfig

**Authority rules:**

- Chỉ seed dữ liệu ban đầu
- Không runtime mutation
- Không seed trial / license

---

## 15. FORBIDDEN CLASS PATTERNS (PHASE 1)

TUYỆT ĐỐI KHÔNG được tồn tại:

- TrialService
- LicenseService
- PaymentService
- DeviceService
- ProgressService
- MasteryService (Entity-level)
- PracticeSessionService
- SkillCompletion (boolean)
- ChapterStateUpdater (helper class)
- GenericProgressManager

Nếu xuất hiện → VI PHẠM SYSTEM LAW.

---

## 16. TỔNG KẾT

File này đảm bảo rằng:

- Mỗi Aggregate có đúng package
- Authority không bị rò rỉ
- Invariant được bảo vệ ở đúng class
- Code Java không thể "vô tình" phá Domain Model

File này, cùng với:

- Domain Model
- Backend Skeleton
- Phase 1 Law Constraints

là nền tảng BẮT BUỘC trước khi code Java Phase 1.

---

## 17. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Backend Skeleton](phase-1-backend-skeleton.md)
  - [Domain Model](phase-1-domain-model.md)
  - [DB Schema](phase-1-db-schema-and-flyway-plan.md)
  - [System Law Constraints](../phase-01.02-system-law/)

---

[← Quay lại Overview](../../README.md)

