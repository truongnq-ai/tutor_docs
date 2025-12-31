# Phase 1 – API Definition & Inventory

**Project:** Tutor  
**Document type:** API Documentation & Audit  
**Audience:** Developer | Tech Lead | System Analyst  
**Status:** ACTIVE  
**Version:** 1.0  
**Author:** System Analyst

---

## MỤC ĐÍCH TÀI LIỆU

Tài liệu này liệt kê **TẤT CẢ API ĐÃ TỒN TẠI** trong codebase Phase 1, phân loại theo domain, và đánh giá tuân thủ System Law & Domain Boundary.

**LƯU Ý QUAN TRỌNG:**
- Chỉ liệt kê API **ĐÃ IMPLEMENT** trong code
- **KHÔNG** suy đoán API "sẽ có"
- **KHÔNG** đề xuất API mới
- Đây là bước **INVENTORY & AUDIT**, không phải design

---

## PHẠM VI

### Services được quét

1. **tutor-core-service** (Java, Spring Boot)
   - Source of Truth
   - Phục vụ: Admin Dashboard, Parent Dashboard, Student App

2. **tutor-ai-service** (Python, FastAPI)
   - AI tool / AI assistant
   - **KHÔNG có authority**
   - Chỉ được gọi bởi Core Service

### Domain phân loại

- **A1** – Auth & Identity
- **A2** – Parent / Student Relation
- **B1** – Chapter / Skill
- **B2** – Exercise Domain
- **C1** – ChapterProgress
- **C2** – Practice + AI
- **C3** – Content Ingestion
- **AI Tooling** – tutor-ai-service APIs

---

## BẢNG TỔNG HỢP API

| # | Service | Domain | Method | Endpoint | Caller | Ý nghĩa | Thay đổi state | Error Codes | Ghi chú |
|---|---------|--------|--------|----------|--------|---------|----------------|-------------|----------|
| 1 | core-service | A1 | POST | `/api/v1/auth/login` | Admin/Parent/Student Dashboard | Đăng nhập với username/password | No | 200, 401 | Trả access_token, refresh_token, role |
| 2 | core-service | A1 | GET | `/api/v1/auth/refresh_token` | Admin/Parent/Student Dashboard | Làm mới access token | No | 200, 401 | Header: Authorization (Bearer refresh_token) |
| 3 | core-service | A1 | POST | `/api/v1/auth/logout` | Admin/Parent/Student Dashboard | Đăng xuất, revoke refresh token | Yes | 200, 401 | Header: Authorization (Bearer refresh_token) |
| 4 | core-service | A1 | POST | `/api/v1/admin/users` | Admin Dashboard | Tạo user mới (ADMIN/PARENT/STUDENT) | Yes | 200, 400, 403 | Requires ADMIN role |
| 5 | core-service | A1 | POST | `/api/v1/admin/users/{id}/reset-password` | Admin Dashboard | Reset mật khẩu user, trả plaintext | Yes | 200, 404, 403 | Requires ADMIN role |
| 6 | core-service | A2 | POST | `/api/v1/admin/parent-student/link` | Admin Dashboard | Gán quan hệ Parent ↔ Student | Yes | 200, 400, 404, 403 | Requires ADMIN role |
| 7 | core-service | A2 | DELETE | `/api/v1/admin/parent-student/unlink` | Admin Dashboard | Hủy quan hệ Parent ↔ Student | Yes | 200, 404, 403 | Requires ADMIN role |
| 8 | core-service | A2 | GET | `/api/v1/admin/parent-student` | Admin Dashboard | Xem danh sách quan hệ Parent-Student | No | 200, 403 | Query: parentId?, studentId? |
| 9 | core-service | C1 | POST | `/api/v1/admin/students/{studentId}/chapters/{chapterId}/assign` | Admin Dashboard | Gán Chapter cho Student (tạo ChapterProgress với state = LOCKED) | Yes | 200, 400, 403, 404, 409 | Requires ADMIN role, student phải ACTIVE |
| 10 | core-service | B1 | POST | `/api/v1/admin/chapters` | Admin Dashboard | Tạo Chapter mới | Yes | 200, 400, 403 | Requires ADMIN role |
| 11 | core-service | B1 | PUT | `/api/v1/admin/chapters/{id}` | Admin Dashboard | Cập nhật Chapter | Yes | 200, 404, 403 | Code không được sửa |
| 12 | core-service | B1 | GET | `/api/v1/admin/chapters` | Admin Dashboard | Lấy danh sách tất cả Chapter | No | 200, 403 | Requires ADMIN role |
| 13 | core-service | B1 | GET | `/api/v1/admin/chapters/{id}` | Admin Dashboard | Lấy chi tiết Chapter | No | 200, 404, 403 | Requires ADMIN role |
| 54 | core-service | B1 | GET | `/api/v1/admin/chapters/{chapterId}/skills` | Admin Dashboard | Lấy danh sách kỹ năng của Chapter với đầy đủ thông tin | No | 200, 404, 403 | Requires ADMIN role |
| 55 | core-service | B1 | GET | `/api/v1/admin/chapters/{chapterId}/available-skills` | Admin Dashboard | Lấy danh sách kỹ năng chưa có trong Chapter | No | 200, 404, 403 | Requires ADMIN role |
| 14 | core-service | B1 | POST | `/api/v1/admin/chapters/{chapterId}/skills` | Admin Dashboard | Gán Skill vào Chapter | Yes | 200, 400, 404, 403 | Requires ADMIN role, skill_type: REQUIRED/OPTIONAL |
| 15 | core-service | B1 | DELETE | `/api/v1/admin/chapters/{chapterId}/skills/{skillId}` | Admin Dashboard | Xóa Skill khỏi Chapter | Yes | 200, 404, 403 | Requires ADMIN role |
| 16 | core-service | B1 | POST | `/api/v1/admin/skills` | Admin Dashboard | Tạo Skill mới | Yes | 200, 400, 403 | Requires ADMIN role |
| 17 | core-service | B1 | PUT | `/api/v1/admin/skills/{id}` | Admin Dashboard | Cập nhật Skill | Yes | 200, 404, 403 | Code không được sửa |
| 18 | core-service | B1 | GET | `/api/v1/admin/skills` | Admin Dashboard | Lấy danh sách tất cả Skill | No | 200, 403 | Requires ADMIN role |
| 19 | core-service | B1 | GET | `/api/v1/admin/skills/{id}` | Admin Dashboard | Lấy chi tiết Skill | No | 200, 404, 403 | Requires ADMIN role |
| 20 | core-service | B1 | POST | `/api/v1/admin/skills/{skillId}/prerequisites` | Admin Dashboard | Thêm Skill Prerequisite | Yes | 200, 400, 404, 403 | Requires ADMIN role |
| 21 | core-service | B1 | DELETE | `/api/v1/admin/skills/{skillId}/prerequisites/{prerequisiteSkillId}` | Admin Dashboard | Xóa Skill Prerequisite | Yes | 200, 404, 403 | Requires ADMIN role |
| 56 | core-service | B1 | GET | `/api/v1/admin/skills/{skillId}/prerequisites` | Admin Dashboard | Lấy danh sách kỹ năng tiên quyết của Skill với đầy đủ thông tin | No | 200, 404, 403 | Requires ADMIN role |
| 57 | core-service | B1 | GET | `/api/v1/admin/skills/{skillId}/available-prerequisites` | Admin Dashboard | Lấy danh sách kỹ năng có thể thêm làm tiên quyết (cùng chương, chưa có trong prerequisites, loại trừ chính nó) | No | 200, 404, 403 | Requires ADMIN role |
| 22 | core-service | B2 | POST | `/api/v1/admin/exercises` | Admin Dashboard | Tạo Exercise mới | Yes | 200, 400, 403 | Requires ADMIN role |
| 23 | core-service | B2 | PUT | `/api/v1/admin/exercises/{id}` | Admin Dashboard | Cập nhật Exercise | Yes | 200, 404, 403 | Requires ADMIN role |
| 24 | core-service | B2 | GET | `/api/v1/admin/exercises` | Admin Dashboard | Lấy danh sách Exercise (có filter và pagination) | No | 200, 403 | Query: chapterId?, skillId?, status? (ExerciseStatus), difficulty?, createdBy?, page? (default 0), size? (default 10). Response: PageResponse<ExerciseResponse> với fields: chapterName, skillName, grade, problemText |
| 25 | core-service | B2 | GET | `/api/v1/admin/exercises/{id}` | Admin Dashboard | Lấy chi tiết Exercise | No | 200, 404, 403 | Requires ADMIN role |
| 26 | core-service | B2 | POST | `/api/v1/admin/exercises/{exerciseId}/solutions` | Admin Dashboard | Tạo ExerciseSolution | Yes | 200, 400, 404, 403 | Requires ADMIN role |
| 27 | core-service | B2 | GET | `/api/v1/admin/exercises/{exerciseId}/solutions` | Admin Dashboard | Lấy danh sách Solution của Exercise | No | 200, 404, 403 | Requires ADMIN role |
| 28 | core-service | B2 | POST | `/api/v1/admin/exercises/{exerciseId}/tags` | Admin Dashboard | Tạo ExerciseTag | Yes | 200, 400, 404, 403 | Requires ADMIN role |
| 29 | core-service | B2 | DELETE | `/api/v1/admin/exercises/{exerciseId}/tags/{tagId}` | Admin Dashboard | Xóa ExerciseTag | Yes | 200, 404, 403 | Requires ADMIN role |
| 30 | core-service | B2 | POST | `/api/v1/admin/exercises/{exerciseId}/review` | Admin Dashboard | Tạo ExerciseReviewLog | Yes | 200, 400, 404, 403 | Reviewer ID từ token |
| 31 | core-service | C3 | POST | `/api/v1/admin/exercises/ai-generate` | Admin Dashboard | Generate Exercise từ AI | Yes | 200, 400, 403, 500 | Status = DRAFT, created_by = AI |
| 32 | core-service | C3 | POST | `/api/v1/admin/exercises/import-json` | Admin Dashboard | Import Exercise từ JSON | Yes | 200, 400, 403 | Status = DRAFT, created_by = ADMIN |
| 33 | core-service | C1 | POST | `/api/v1/students/me/chapters/{chapterId}/start` | Student App | Bắt đầu học Chapter (LOCKED → IN_PROGRESS) | Yes | 200, 400, 403, 404, 409 | Requires STUDENT role, student ACTIVE, ChapterProgress phải đã được assign bởi Admin |
| 34 | core-service | C1 | GET | `/api/v1/students/me/chapters/{chapterId}/progress` | Student App | Lấy tiến độ Chapter | No | 200, 404, 403 | Requires STUDENT role |
| 35 | core-service | C1 | GET | `/api/v1/students/me/chapters/progress` | Student App | Lấy tất cả tiến độ Chapter | No | 200, 403 | Requires STUDENT role |
| 36 | core-service | C1 | GET | `/api/v1/parents/students/{studentId}/chapters/progress` | Parent Dashboard | Lấy tất cả tiến độ Chapter của student | No | 200, 403, 404 | Requires PARENT role, validate parent-student relationship |
| 37 | core-service | C1 | GET | `/api/v1/parents/students/{studentId}/chapters/{chapterId}/progress` | Parent Dashboard | Lấy tiến độ Chapter cụ thể của student | No | 200, 403, 404 | Requires PARENT role, validate parent-student relationship |
| 38 | core-service | C2 | POST | `/api/v1/student/practices` | Student App | Tạo Practice mới | Yes | 200, 400, 403, 404 | Requires STUDENT role, chapter IN_PROGRESS, student ACTIVE |
| 39 | core-service | C2 | POST | `/api/v1/student/practices/{practiceId}/submit` | Student App | Submit Practice với answer | Yes | 200, 400, 403, 404, 409 | Requires STUDENT role, có thể trigger completion |
| 40 | core-service | C2 | GET | `/api/v1/student/practices/{practiceId}` | Student App | Lấy chi tiết Practice | No | 200, 403, 404 | Requires STUDENT role, student phải sở hữu practice |
| 41 | core-service | C2 | GET | `/api/v1/student/practices` | Student App | Lấy danh sách Practice theo chapter | No | 200, 404 | Query: chapterId, Requires STUDENT role |
| 42 | ai-service | AI Tooling | POST | `/internal/ai/ocr` | Core Service | OCR extract math problem từ image | No | 200, 503, 500 | Error codes: 4002 (OCRException), 5001 (generic) |
| 43 | ai-service | AI Tooling | POST | `/internal/ai/solve` | Core Service | Giải bài toán step-by-step | No | 200, 400, 503, 500 | Hỗ trợ image_url hoặc problem_text, error codes: 5001 |
| 44 | ai-service | AI Tooling | POST | `/internal/ai/hint` | Core Service | Generate hint cho học sinh | No | 200, 503, 500 | Error codes: 4002 (HintGeneratorException), 5001 (generic) |
| 45 | ai-service | AI Tooling | POST | `/internal/ai/generate-exercises` | Core Service | Generate exercises cho skill | No | 200, 503, 500 | Error codes: 4001-4004, 5001 |
| 46 | ai-service | AI Tooling | POST | `/internal/ai/validate-latex` | Core Service | Validate LaTeX formulas (Tier 2) | No | 200, 500 | Error code: 5001 |
| 47 | ai-service | AI Tooling | POST | `/internal/ai/generate-exercise-content` | Core Service | Generate exercise content từ prompt (C3) | No | 200, 503, 500 | Error codes: 4001, 5001 |
| 48 | ai-service | AI Tooling | POST | `/internal/ai/score-practice` | Core Service | Score practice submission | No | 200, 503, 500 | Error codes: 4001-4004, 5001 |
| 49 | ai-service | AI Tooling | GET | `/health` | Core Service | Health check | No | 200 | Không yêu cầu auth |
| 50 | ai-service | AI Tooling | GET | `/` | Core Service | Root endpoint | No | 200 | Không yêu cầu auth |
| 51 | core-service | A1 | GET | `/api/v1/admin/users` | Admin Dashboard | Lấy danh sách users với pagination và filter | No | 200, 403 | Query: role?, page?, size? |
| 52 | core-service | A1 | GET | `/api/v1/admin/users/{id}` | Admin Dashboard | Lấy chi tiết user | No | 200, 404, 403 | Requires ADMIN role |
| 53 | core-service | A1 | PUT | `/api/v1/auth/users/{id}` | Admin/Parent/Student Dashboard | User tự cập nhật thông tin (name) | Yes | 200, 400, 404, 403 | User chỉ có thể update chính mình |

---

## CHI TIẾT API THEO DOMAIN

### A1 – Auth & Identity

#### 1. POST `/api/v1/auth/login`
- **Caller:** Admin Dashboard, Parent Dashboard, Student App
- **Request DTO:** `LoginRequest` (username, password)
- **Response DTO:** `LoginResponse` (access_token, refresh_token, role)
- **State Change:** Tạo refresh token trong DB
- **Error Codes:**
  - 200: Thành công
  - 401: Invalid credentials
- **Ghi chú:** Không có phân biệt role trong logic login, tất cả role dùng chung endpoint

#### 2. GET `/api/v1/auth/refresh_token`
- **Caller:** Admin Dashboard, Parent Dashboard, Student App
- **Request:** Header `Authorization: Bearer <refresh_token>`
- **Response DTO:** `RefreshTokenResponse` (access_token)
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 401: Invalid or expired refresh token

#### 3. POST `/api/v1/auth/logout`
- **Caller:** Admin Dashboard, Parent Dashboard, Student App
- **Request:** Header `Authorization: Bearer <refresh_token>`
- **Response DTO:** `ResponseObject<Void>`
- **State Change:** Revoke refresh token
- **Error Codes:**
  - 200: Thành công
  - 401: Invalid refresh token

#### 4. POST `/api/v1/admin/users`
- **Caller:** Admin Dashboard
- **Request DTO:** `CreateUserRequest` (username, password, role, name?)
- **Response DTO:** `CreateUserResponse` (user_id, role, username)
- **State Change:** Tạo user mới trong DB
- **Error Codes:**
  - 200: Thành công
  - 400: Username đã tồn tại hoặc validation error
  - 403: Không có quyền ADMIN
- **Ghi chú:** Admin là authority duy nhất tạo user

#### 5. POST `/api/v1/admin/users/{id}/reset-password`
- **Caller:** Admin Dashboard
- **Request:** Path variable `id` (UUID)
- **Response DTO:** `ResetPasswordResponse` (plaintext password)
- **State Change:** Update user.password
- **Error Codes:**
  - 200: Thành công
  - 404: User not found
  - 403: Không có quyền ADMIN
- **Ghi chú:** Trả plaintext password 1 lần duy nhất, không gửi email

#### 51. GET `/api/v1/admin/users`
- **Caller:** Admin Dashboard
- **Request:** Query params: `role?` (Role enum: ADMIN, PARENT, STUDENT), `page?` (int, default 0), `size?` (int, default 10)
- **Response DTO:** `ResponseObject<PageResponse<UserResponse>>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 403: Không có quyền ADMIN
- **Ghi chú:** 
  - Pagination: page (0-indexed), size (default 10)
  - Filter theo role nếu có
  - Response bao gồm: content (List<UserResponse>), totalElements, totalPages, page, pageSize

#### 52. GET `/api/v1/admin/users/{id}`
- **Caller:** Admin Dashboard
- **Request:** Path variable `id` (UUID)
- **Response DTO:** `ResponseObject<UserResponse>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 404: User not found
  - 403: Không có quyền ADMIN
- **Ghi chú:** UserResponse bao gồm: id, username, name, role, createdAt

#### 53. PUT `/api/v1/auth/users/{id}`
- **Caller:** Admin Dashboard, Parent Dashboard, Student App
- **Request DTO:** `UpdateUserRequest` (name)
- **Response DTO:** `ResponseObject<UserResponse>`
- **State Change:** Update user.name
- **Error Codes:**
  - 200: Thành công
  - 400: Invalid request hoặc user đang cố update user khác
  - 404: User not found
  - 403: Không có quyền (user chỉ có thể update chính mình)
- **Ghi chú:** 
  - User chỉ có thể update thông tin của chính mình (userId phải match với current user)
  - Chỉ có thể update field `name`
  - Requires authentication (ADMIN, PARENT, hoặc STUDENT role)

---

### A2 – Parent / Student Relation

#### 6. POST `/api/v1/admin/parent-student/link`
- **Caller:** Admin Dashboard
- **Request DTO:** `LinkParentStudentRequest` (parent_id, student_id)
- **Response DTO:** `ParentStudentResponse`
- **State Change:** Tạo bản ghi parent_student
- **Error Codes:**
  - 200: Thành công
  - 400: Validation error hoặc relationship đã tồn tại
  - 404: Parent hoặc student not found
  - 403: Không có quyền ADMIN
- **Ghi chú:** Chỉ ADMIN được gán quan hệ, không tạo student_profile

#### 7. DELETE `/api/v1/admin/parent-student/unlink`
- **Caller:** Admin Dashboard
- **Request DTO:** `UnlinkParentStudentRequest` (parent_id, student_id)
- **Response DTO:** `ResponseObject<Void>`
- **State Change:** Xóa bản ghi parent_student
- **Error Codes:**
  - 200: Thành công
  - 404: Relationship not found
  - 403: Không có quyền ADMIN

#### 8. GET `/api/v1/admin/parent-student`
- **Caller:** Admin Dashboard
- **Request:** Query params: `parentId?`, `studentId?`
- **Response DTO:** `List<ParentStudentResponse>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 403: Không có quyền ADMIN

---

### B1 – Chapter / Skill

#### 9-14, 54. Chapter APIs
- **Caller:** Admin Dashboard
- **Authority:** ADMIN duy nhất
- **State Change:** CRUD Chapter, gán Skill vào Chapter
- **Error Codes:** 200, 400, 404, 403
- **Ghi chú:** Chapter là content asset, không gắn với student

#### 54. GET `/api/v1/admin/chapters/{chapterId}/skills`
- **Caller:** Admin Dashboard
- **Request:** Path variable `chapterId` (UUID)
- **Response DTO:** `ResponseObject<List<ChapterSkillDetailResponse>>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 404: Chapter not found
  - 403: Không có quyền ADMIN
- **Ghi chú:**
  - Trả về danh sách kỹ năng của chapter với đầy đủ thông tin skill (code, name, description, skillType)
  - Frontend không cần gọi thêm API để lấy thông tin skill
  - `ChapterSkillDetailResponse` bao gồm: `skillId`, `skillCode`, `skillName`, `skillDescription`, `skillType`

#### 55. GET `/api/v1/admin/chapters/{chapterId}/available-skills`
- **Caller:** Admin Dashboard
- **Request:** Path variable `chapterId` (UUID)
- **Response DTO:** `ResponseObject<List<SkillResponse>>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 404: Chapter not found
  - 403: Không có quyền ADMIN
- **Ghi chú:**
  - Trả về danh sách kỹ năng chưa có trong chapter (có thể thêm vào chapter)
  - Backend filter skills dựa trên chapter_skill mapping
  - Sử dụng để hiển thị dropdown khi thêm skill vào chapter
  - Sau khi xóa skill khỏi chapter, skill đó sẽ xuất hiện lại trong danh sách này

#### 15-20. Skill APIs
- **Caller:** Admin Dashboard
- **Authority:** ADMIN duy nhất
- **State Change:** CRUD Skill, quản lý Prerequisite
- **Error Codes:** 200, 400, 404, 403
- **Ghi chú:** Skill là content asset, không có mastery trong B1

#### 56. GET `/api/v1/admin/skills/{skillId}/prerequisites`
- **Caller:** Admin Dashboard
- **Request:** Path variable `skillId` (UUID)
- **Response DTO:** `ResponseObject<List<SkillPrerequisiteDetailResponse>>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 404: Skill not found
  - 403: Không có quyền ADMIN
- **Ghi chú:**
  - Trả về danh sách kỹ năng tiên quyết của skill với đầy đủ thông tin prerequisite skill (code, name, description)
  - Frontend không cần gọi thêm API để lấy thông tin prerequisite skill
  - `SkillPrerequisiteDetailResponse` bao gồm: `skillId`, `skillCode`, `skillName`, `skillDescription`

#### 57. GET `/api/v1/admin/skills/{skillId}/available-prerequisites`
- **Caller:** Admin Dashboard
- **Request:** Path variable `skillId` (UUID)
- **Response DTO:** `ResponseObject<List<SkillResponse>>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 404: Skill not found
  - 403: Không có quyền ADMIN
- **Ghi chú:**
  - Trả về danh sách kỹ năng có thể thêm làm tiên quyết (trong cùng chương với skill, chưa có trong prerequisites, loại trừ chính skill đó)
  - Backend filter skills dựa trên:
    1. Cùng chương với skill (từ `chapter_skill` table)
    2. Chưa có trong danh sách prerequisites hiện tại
    3. Loại trừ chính skill đó (không thể tự tham chiếu)
  - Sử dụng để hiển thị dropdown khi thêm prerequisite vào skill
  - Sau khi xóa prerequisite khỏi skill, skill đó sẽ xuất hiện lại trong danh sách này

---

### B2 – Exercise Domain

#### 21-29. Exercise CRUD & Review APIs
- **Caller:** Admin Dashboard
- **Authority:** ADMIN duy nhất
- **State Change:** CRUD Exercise, Solution, Tag, ReviewLog
- **Error Codes:** 200, 400, 404, 403
- **Ghi chú:** Exercise là content asset, không gắn với Practice runtime

#### 24. GET `/api/v1/admin/exercises`
- **Caller:** Admin Dashboard
- **Request:** Query params: 
  - `chapterId?` (UUID) - Filter by chapter
  - `skillId?` (UUID) - Filter by skill
  - `status?` (ExerciseStatus: DRAFT, REVIEWED, APPROVED) - Filter by status
  - `difficulty?` (Integer 1-5) - Filter by difficulty level
  - `createdBy?` (ExerciseCreatedBy) - Filter by creator
  - `page?` (int, default 0) - Page number (0-indexed)
  - `size?` (int, default 10) - Page size
- **Response DTO:** `ResponseObject<PageResponse<ExerciseResponse>>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 403: Không có quyền ADMIN
- **Ghi chú:**
  - Response includes pagination: `PageResponse` with `content` (List<ExerciseResponse>), `totalElements`, `totalPages`, `page`, `pageSize`
  - `ExerciseResponse` includes additional fields: `chapterName` (String), `skillName` (String), `grade` (Integer), `problemText` (String, alias for `contentText`)
  - Backend fetches Chapter and Skill entities to populate names
  - Status filter supports: DRAFT, REVIEWED, APPROVED (separate options)

---

### C3 – Content Ingestion

#### 30. POST `/api/v1/admin/exercises/ai-generate`
- **Caller:** Admin Dashboard
- **Request DTO:** `AIGenerateExerciseRequest` (chapterCode, skillCode, difficultyLevel, exerciseCount)
- **Response DTO:** `ExerciseResponse`
- **State Change:** Tạo Exercise với status = DRAFT, created_by = AI
- **Error Codes:**
  - 200: Thành công
  - 400: JSON validation failed (C3_001) hoặc LaTeX validation failed (C3_002)
  - 403: Không có quyền ADMIN
  - 500: AI Service error (C3_003) hoặc Ingestion error (C3_004)
- **Flow:**
  1. Load & render prompt template
  2. Call AI Service
  3. Validate JSON schema (Tier 1)
  4. Validate LaTeX Guard (Tier 1)
  5. Ingest Exercise
- **Ghi chú:** Exercise lưu ở DRAFT, không auto approve

#### 31. POST `/api/v1/admin/exercises/import-json`
- **Caller:** Admin Dashboard
- **Request DTO:** `ImportExerciseJsonRequest` (rawExerciseJson)
- **Response DTO:** `ExerciseResponse`
- **State Change:** Tạo Exercise với status = DRAFT, created_by = ADMIN
- **Error Codes:**
  - 200: Thành công
  - 400: JSON validation failed (C3_001) hoặc LaTeX validation failed (C3_002) hoặc Ingestion error (C3_004)
  - 403: Không có quyền ADMIN
- **Flow:**
  1. Validate JSON schema
  2. Validate LaTeX Guard (Tier 1)
  3. Ingest Exercise

---

### C1 – ChapterProgress

#### 9. POST `/api/v1/admin/students/{studentId}/chapters/{chapterId}/assign`
- **Caller:** Admin Dashboard
- **Request:** Path variables: `studentId` (UUID), `chapterId` (UUID)
- **Response DTO:** `ChapterProgressResponse`
- **State Change:** Tạo ChapterProgress với state = LOCKED
- **Error Codes:**
  - 200: Thành công
  - 400: Invalid input hoặc validation error
  - 403: Không có quyền ADMIN hoặc student không ACTIVE
  - 404: Student hoặc chapter not found
  - 409: Chapter đã được gán cho student (ChapterAlreadyAssignedException)
- **Business Rules:**
  1. Student phải tồn tại và có role = STUDENT
  2. Student profile phải tồn tại và lifecycle_state = ACTIVE
  3. Chapter phải tồn tại
  4. ChapterProgress chưa tồn tại cho (student, chapter)
  5. Tạo ChapterProgress với state = LOCKED
- **Ghi chú:** 
  - Admin là authority duy nhất gán chapter cho student
  - Student KHÔNG thể tự tạo ChapterProgress
  - ChapterProgress phải được assign trước khi student start chapter

#### 33. POST `/api/v1/students/me/chapters/{chapterId}/start`
- **Caller:** Student App
- **Request DTO:** `StartChapterRequest` (optional)
- **Response DTO:** `StartChapterResponse` (ChapterProgressResponse)
- **State Change:** Chuyển chapter_state: LOCKED → IN_PROGRESS
- **Error Codes:**
  - 200: Thành công
  - 400: Invalid request hoặc validation error
  - 403: Student not ACTIVE hoặc insufficient permissions
  - 404: Chapter not found
  - 409: Conflict - Another chapter already IN_PROGRESS hoặc invalid state transition
- **Ghi chú:** 
  - Student phải ACTIVE
  - Không được có chapter khác IN_PROGRESS
  - ChapterProgress phải đã được assign bởi Admin (KHÔNG tự tạo)
  - ChapterProgress phải ở trạng thái LOCKED
  - Nếu ChapterProgress chưa tồn tại → throw ChapterProgressNotFoundException

#### 34. GET `/api/v1/students/me/chapters/{chapterId}/progress`
- **Caller:** Student App
- **Response DTO:** `ChapterProgressResponse`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 404: Chapter progress not found
  - 403: STUDENT role required

#### 34. GET `/api/v1/students/me/chapters/progress`
- **Caller:** Student App
- **Response DTO:** `List<ChapterProgressResponse>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 403: STUDENT role required

#### 35. GET `/api/v1/parents/students/{studentId}/chapters/progress`
- **Caller:** Parent Dashboard
- **Response DTO:** `List<ChapterProgressResponse>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 403: PARENT role required hoặc không có quyền xem student này
  - 404: Parent-student relationship not found
- **Ghi chú:** Validate parent-student relationship trước khi trả dữ liệu

#### 37. GET `/api/v1/parents/students/{studentId}/chapters/{chapterId}/progress`
- **Caller:** Parent Dashboard
- **Response DTO:** `ChapterProgressResponse`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 403: PARENT role required hoặc không có quyền xem student này
  - 404: Chapter progress not found hoặc parent-student relationship not found

---

### C2 – Practice + AI

#### 38. POST `/api/v1/student/practices`
- **Caller:** Student App
- **Request DTO:** `CreatePracticeRequest` (chapterId, exerciseId?)
- **Response DTO:** `PracticeResponse`
- **State Change:** Tạo Practice record
- **Error Codes:**
  - 200: Thành công
  - 400: Invalid request hoặc validation error
  - 403: Student not ACTIVE hoặc insufficient permissions
  - 404: Chapter not found hoặc not IN_PROGRESS
- **Ghi chú:**
  - Student phải ACTIVE
  - Chapter phải IN_PROGRESS
  - Nếu không có exerciseId, chọn random APPROVED exercise từ chapter

#### 39. POST `/api/v1/student/practices/{practiceId}/submit`
- **Caller:** Student App
- **Request DTO:** `SubmitPracticeRequest` (answer)
- **Response DTO:** `PracticeResponse`
- **State Change:** 
  - Update Practice với submitted_answer, is_correct
  - Có thể trigger Completion Rule (nếu là practice hợp lệ đầu tiên)
- **Error Codes:**
  - 200: Thành công
  - 400: Invalid request hoặc validation error
  - 403: Student không sở hữu practice
  - 404: Practice not found
  - 409: Conflict - Practice already submitted
- **Ghi chú:**
  - Gọi AI Service để score (với fallback)
  - Completion được trigger bởi ChapterProgress Domain Logic (C1), không phải C2

#### 40. GET `/api/v1/student/practices/{practiceId}`
- **Caller:** Student App
- **Response DTO:** `PracticeResponse`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 403: Student không sở hữu practice
  - 404: Practice not found

#### 41. GET `/api/v1/student/practices`
- **Caller:** Student App
- **Request:** Query param: `chapterId` (required)
- **Response DTO:** `List<PracticeResponse>`
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 404: Chapter progress not found

---

### AI Tooling (tutor-ai-service)

#### 42. POST `/internal/ai/ocr`
- **Caller:** Core Service
- **Request DTO:** `OCRRequest` (image_url)
- **Response DTO:** `OCRResponse` (problem_text, latex, confidence)
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 503: OCRException (errorCode: 4002)
  - 500: Generic error (errorCode: 5001)
- **Ghi chú:** AI Service không có authority, chỉ trả dữ liệu

#### 43. POST `/internal/ai/solve`
- **Caller:** Core Service
- **Request DTO:** `SolveRequest` (problem_text?, image_url?, grade)
- **Response DTO:** `SolveResponse` (solve_id, problem_text, solution, related_skills)
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 400: Validation error (problem_text hoặc image_url phải có)
  - 503: Service unavailable
  - 500: MathSolverException hoặc generic error (errorCode: 5001)
- **Ghi chú:** Hỗ trợ OCR nếu có image_url, fallback sang problem_text nếu OCR fail

#### 44. POST `/internal/ai/hint`
- **Caller:** Core Service
- **Request DTO:** `HintRequest` (problem_text, current_step, grade, context?)
- **Response DTO:** `HintResponse` (hint)
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 503: HintGeneratorException (errorCode: 4002)
  - 500: Generic error (errorCode: 5001)

#### 45. POST `/internal/ai/generate-exercises`
- **Caller:** Core Service
- **Request DTO:** `GenerateExercisesRequest` (skill_id, grade, difficulty_level, count, ...)
- **Response DTO:** `GenerateExercisesResponse` (exercises, metadata)
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 503: ExternalServiceException (errorCode: 4001-4004)
  - 500: Generic error (errorCode: 5001)
- **Ghi chú:** Error codes: 4001 (timeout), 4002 (unavailable), 4003 (invalid response), 4004 (auth error)

#### 46. POST `/internal/ai/validate-latex`
- **Caller:** Core Service
- **Request DTO:** `ValidateLaTeXRequest` (exercise fields)
- **Response DTO:** `ValidateLaTeXResponse` (is_valid, errors, auto_fixable_count, ...)
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 500: Generic error (errorCode: 5001)
- **Ghi chú:** Tier 2 validation (QA), không ghi DB

#### 47. POST `/internal/ai/generate-exercise-content`
- **Caller:** Core Service (C3)
- **Request DTO:** `GenerateExerciseContentRequest` (prompt)
- **Response DTO:** `GenerateExerciseContentResponse` (content - raw text)
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 503: ExternalServiceException (errorCode: 4001)
  - 500: Generic error (errorCode: 5001)
- **Ghi chú:** C3 endpoint, Core Service chịu trách nhiệm validate và parse

#### 48. POST `/internal/ai/score-practice`
- **Caller:** Core Service (C2)
- **Request DTO:** `ScorePracticeRequest` (exercise_snapshot, student_answer, skill_id, grade)
- **Response DTO:** `ScorePracticeResponse` (is_correct, explanation?, ...)
- **State Change:** No
- **Error Codes:**
  - 200: Thành công
  - 503: ExternalServiceException (errorCode: 4001-4004)
  - 500: Generic error (errorCode: 5001)
- **Ghi chú:** AI chỉ trả kết quả, Core Service quyết định lưu và trigger completion

#### 49. GET `/health`
- **Caller:** Core Service (health check)
- **Response:** `{"status": "ok", "service": "tutor-ai-service"}`
- **State Change:** No
- **Error Codes:** 200

#### 50. GET `/`
- **Caller:** Core Service (root)
- **Response:** Root endpoint info
- **State Change:** No
- **Error Codes:** 200

---

## PHÂN TÍCH ERROR CODES

### Core Service Error Codes

**Error Code Ranges:**
- `0000`: Success
- `0001-0999`: Business errors
- `1000-1999`: Authentication & Authorization errors
- `2000-2999`: Validation errors
- `3000-3999`: Resource errors
- `4000-4999`: Service integration errors
- `5000-5999`: System errors

**Các Error Code cụ thể:**
- `0002`: Invalid state transition
- `0003`: Multiple IN_PROGRESS chapters
- `0004`: Student not ACTIVE
- `0005`: Chapter already IN_PROGRESS
- `1001`: Unauthorized (invalid credentials)
- `1002`: Token expired
- `1003`: Forbidden
- `1004`: Token missing or invalid
- `1006`: Refresh token invalid
- `2001`: Validation error
- `2005`: HTTP message not readable
- `2006`: Method argument not valid
- `2007`: Missing request parameter
- `3001`: Resource not found
- `3002`: Resource already exists
- `3007`: Entity not found
- `3008`: Entity exists
- `4002`: External service error
- `5001`: Internal server error
- `5002`: Constraint violation
- `5003`: Transaction error
- `5004`: Method not allowed
- `5005`: No resource found

**C3 Error Codes:**
- `C3_001`: JSON validation failed
- `C3_002`: LaTeX validation failed (Tier 1)
- `C3_003`: AI Service error
- `C3_004`: Ingestion error

### AI Service Error Codes

**Error Code Ranges:**
- `4001`: AI Service timeout
- `4002`: AI Service unavailable / OCRException / HintGeneratorException
- `4003`: Invalid AI response
- `4004`: AI provider authentication error
- `5001`: Generic internal error

**HTTP Status Mapping:**
- `200`: Success
- `400`: Bad Request (validation)
- `401`: Unauthorized (auth error)
- `404`: Not Found
- `409`: Conflict
- `422`: Unprocessable Entity
- `429`: Too Many Requests (rate limit)
- `500`: Internal Server Error
- `502`: Bad Gateway
- `503`: Service Unavailable
- `504`: Gateway Timeout

---

## NHẬN XÉT TỔNG QUAN API PHASE 1

### 1. Các domain đã đủ API hay chưa?

#### ✅ Đủ API:
- **A1 (Auth & Identity):** Đủ 8 API (login, refresh, logout, create user, reset password, list users, get user detail, update user)
- **A2 (Parent/Student Relation):** Đủ 3 API (link, unlink, list)
- **B1 (Chapter/Skill):** Đủ 14 API (CRUD Chapter, CRUD Skill, gán Skill vào Chapter, Prerequisite - add, remove, get list, get available)
- **B2 (Exercise):** Đủ 9 API (CRUD Exercise, Solution, Tag, Review)
- **C3 (Content Ingestion):** Đủ 2 API (AI generate, import JSON)
- **C1 (ChapterProgress):** Đủ 6 API (assign chapter - Admin, start chapter - Student, get progress - student & parent)
- **C2 (Practice):** Đủ 4 API (create, submit, get detail, list)
- **AI Tooling:** Đủ 9 API (OCR, solve, hint, generate-exercises, validate-latex, generate-exercise-content, score-practice, health, root)

#### ✅ Đã bổ sung:
- **C1 - Admin assign chapter:** API `POST /api/v1/admin/students/{studentId}/chapters/{chapterId}/assign` đã được implement. Admin có thể gán Chapter cho Student, tạo ChapterProgress với state = LOCKED.

### 2. Có API nào trùng chức năng?

**Không phát hiện** API trùng chức năng. Mỗi API có mục đích rõ ràng.

### 3. Có API nào vi phạm boundary?

#### ✅ Tuân thủ boundary:
- **A1:** Không có logic học tập, chỉ auth & identity
- **A2:** Không tạo student_profile, chỉ quan hệ ownership
- **B1:** Không có logic runtime, chỉ content asset
- **B2:** Không tạo Practice runtime, chỉ content asset
- **C1:** Start chapter chỉ chuyển state, không tạo Practice
- **C2:** Practice không quyết định completion trực tiếp (trigger qua Domain Logic)
- **C3:** Chỉ ingestion, không ảnh hưởng learning domain
- **AI Service:** Không có authority, chỉ trả dữ liệu

#### ✅ Đã sửa:
- **C1 Start Chapter:** Đã sửa logic `startChapter()` để KHÔNG tự tạo ChapterProgress. Student chỉ có thể start chapter đã được Admin assign. Nếu ChapterProgress chưa tồn tại → throw `ChapterProgressNotFoundException`.

### 4. Có API nào vượt Phase 1?

**Không phát hiện** API vượt Phase 1 scope. Tất cả API đều phục vụ:
- A1, A2: Identity domain
- B1, B2, C3: Content domain
- C1, C2: Learning runtime domain

### 5. Gợi ý (nếu có)

#### ✅ Đã implement:
1. **Admin assign chapter API:** Đã implement API `POST /api/v1/admin/students/{studentId}/chapters/{chapterId}/assign`. Admin có thể gán Chapter cho Student, tạo ChapterProgress với state = LOCKED.

#### ⚠️ Error handling:
- Một số API trả error code chung chung (400, 500) mà không có error code cụ thể trong response body. Nên đảm bảo tất cả error response đều có `errorCode` và `errorDetail` theo chuẩn `ResponseObject`.

#### ✅ Điểm tốt:
- Phân quyền rõ ràng: ADMIN, PARENT, STUDENT
- AI Service không có authority, chỉ là tool
- Domain boundary được tuân thủ tốt
- Error codes có cấu trúc rõ ràng

---

## KẾT LUẬN

Tài liệu này đã liệt kê **57 API endpoints** đã tồn tại trong codebase Phase 1:
- **46 API** từ tutor-core-service
- **9 API** từ tutor-ai-service

**Tổng kết:**
- ✅ Tất cả domain đã có đủ API
- ✅ Đã implement API Admin assign chapter (C1)
- ✅ Đã sửa logic startChapter() để tuân thủ System Law
- ✅ Đã bổ sung API list users, get user detail, update user (A1)
- ✅ Đã bổ sung API get chapter skills và available skills (B1)
- ✅ Đã bổ sung API get skill prerequisites và available prerequisites (B1)
- ✅ Không có API trùng chức năng
- ✅ Không có API vi phạm boundary nghiêm trọng
- ✅ Không có API vượt Phase 1 scope

**Khuyến nghị:**
1. ✅ Đã implement API Admin assign chapter
2. ✅ Đã sửa startChapter() để không tự tạo ChapterProgress
3. ✅ Đã bổ sung API quản lý prerequisites cho skill
4. Đảm bảo tất cả error response có errorCode và errorDetail đầy đủ

---

**Tài liệu này là bản INVENTORY & AUDIT, không phải design document.**
**Mọi thay đổi code phải tuân theo System Law và Domain Boundary đã định nghĩa.**

