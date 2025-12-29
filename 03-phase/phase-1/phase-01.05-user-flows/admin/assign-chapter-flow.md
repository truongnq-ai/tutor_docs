# User Flow: Admin – Assign Chapter Flow

**Project:** Tutor  
**Document type:** User Flow  
**Audience:** Developer | Product | Tech  
**Status:** ACTIVE  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../README.md)

---

## 1. THÔNG TIN CƠ BẢN

- **Phase:** Phase 1
- **Actor:** Admin
- **Purpose:** Admin gán Chapter ban đầu cho Student (assignment only)

---

## 2. PRECONDITIONS (ĐIỀU KIỆN TRƯỚC)

- Admin đã đăng nhập hợp lệ
- Admin có role = ADMIN
- Student tồn tại hợp lệ
- Chapter tồn tại hợp lệ
- Student chưa có ChapterProgress cho Chapter này

---

## 3. TRIGGER (HÀNH ĐỘNG KÍCH HOẠT)

- Admin chọn Student
- Admin chọn Chapter
- Admin thực hiện hành động "Assign Chapter"

---

## 4. STEP-BY-STEP FLOW

### Step 1

Admin gửi request "assign chapter to student".

### Step 2

AdminController:

- Xác thực JWT
- Xác định actor là ADMIN
- Forward request vào AdminService

### Step 3

AdminService thực hiện guard:

- RoleGuard: chỉ ADMIN
- Validate Student tồn tại
- Validate Chapter tồn tại

Nếu guard FAIL → reject.

### Step 4

AdminService tạo ChapterProgress:

- student_id
- chapter_id
- chapter_state = LOCKED (mặc định)

### Step 5

Persist ChapterProgress.

### Step 6

Controller trả response thành công cho Admin.

---

## 5. DOMAIN OWNERSHIP & AUTHORITY

- Admin sở hữu CONTENT
- Admin KHÔNG sở hữu PROGRESSION

**Admin:**

- Được gán Chapter ban đầu (assignment)
- Không được sửa trạng thái học tập

---

## 6. EVENTS

- Không emit domain event
- Assignment KHÔNG được:
  - thay đổi ChapterProgress state
  - ảnh hưởng Student đang học

---

## 7. FORBIDDEN PATHS (ĐƯỜNG CẤM)

Flow này TUYỆT ĐỐI KHÔNG cho phép:

- Admin chỉnh chapter_state
- Admin chỉnh Practice
- Admin chỉnh SkillMastery
- Admin ảnh hưởng Student đang học
- Admin trigger learning flow

---

## 8. POSTCONDITIONS (TRẠNG THÁI SAU)

- ChapterProgress được tạo với state = LOCKED
- Student có thể bắt đầu học Chapter này (thông qua Start Learning Flow)
- Domain học tập giữ nguyên trạng thái
- Không có side-effect lên Student đang học

---

## 9. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Manage Content Flow](manage-content-flow.md)
  - [Start Learning Flow](../student/start-learning-flow.md)
  - [Backend Skeleton](../../phase-01.03-architecture/phase-1-backend-skeleton.md)

---

[← Quay lại Overview](../README.md)

