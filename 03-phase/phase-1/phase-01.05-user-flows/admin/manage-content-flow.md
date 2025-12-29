# User Flow: Admin – Manage Content Flow

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
- **Purpose:** Admin quản lý nội dung học tập (Chapter, Skill, Exercise)

---

## 2. PRECONDITIONS (ĐIỀU KIỆN TRƯỚC)

- Admin đã đăng nhập hợp lệ
- Admin có role = ADMIN

---

## 3. TRIGGER (HÀNH ĐỘNG KÍCH HOẠT)

Admin thực hiện một trong các hành động:

- Tạo / sửa / xóa Chapter
- Tạo / sửa / xóa Skill
- Tạo / sửa / xóa Exercise

---

## 4. STEP-BY-STEP FLOW

### Step 1

Admin gửi request quản lý content đến backend.

### Step 2

AdminController:

- Xác thực JWT
- Xác định actor là ADMIN
- Forward request vào AdminService

### Step 3

AdminService thực hiện guard:

- RoleGuard: chỉ ADMIN

Nếu guard FAIL → reject.

### Step 4

AdminService thực hiện CRUD content:

- Chapter
- Skill
- Exercise

### Step 5

Persist thay đổi content.

---

## 5. DOMAIN OWNERSHIP & AUTHORITY

- Admin sở hữu CONTENT
- Admin KHÔNG sở hữu PROGRESSION

**Admin:**

- Được sửa content
- Không được sửa trạng thái học tập

---

## 6. EVENTS

- Không emit domain event

**Content change KHÔNG được:**

- thay đổi ChapterProgress
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

- Content được cập nhật
- Domain học tập giữ nguyên trạng thái
- Không có side-effect lên Student

---

## 9. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Assign Chapter Flow](assign-chapter-flow.md)
  - [Backend Skeleton](../../phase-01.03-architecture/phase-1-backend-skeleton.md)

---

[← Quay lại Overview](../README.md)

