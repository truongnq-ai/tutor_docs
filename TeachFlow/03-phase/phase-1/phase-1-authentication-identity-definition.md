Dưới đây là **tài liệu chính thức – độc lập** để **khóa Authentication & Identity cho Phase 1**, đúng theo quyết định kiến trúc bạn vừa chốt.

# PHASE 1 – AUTHENTICATION & IDENTITY DEFINITION

**TeachFlow**

---

## I. MỤC ĐÍCH CỦA TÀI LIỆU

Tài liệu này tồn tại để:

* Xác định **cách TeachFlow Phase 1 xử lý danh tính & đăng nhập**
* Tách bạch rõ:

  * **Authentication & Identity**
  * **User / Account Management** (KHÔNG làm trong Phase 1)
* Là **hàng rào kiến trúc** để:

  * Dev không mở rộng sai
  * AI/Prompt không suy diễn sai
  * Phase 1 không bị “trượt scope” vì auth

> ⚠️ Tài liệu này **bổ sung**, không sửa, không override:
>
> * System Law
> * Scope Phase 1
> * Domain Model
> * UI-Spec Skeleton

---

## II. PHẠM VI ÁP DỤNG

* Áp dụng **chỉ cho Phase 1**
* Không mô tả chi tiết Phase 2+
* Mọi thay đổi vượt nội dung tài liệu này:
  → **ngoài Phase 1 scope**

---

## III. PHÂN BIỆT THUẬT NGỮ (RẤT QUAN TRỌNG)

### 1. Authentication & Identity (PHASE 1 – CÓ)

TeachFlow Phase 1 **CÓ**:

* Đăng nhập bằng username + password
* Xác định danh tính người dùng
* Hiển thị tên giáo viên trên UI
* Gắn danh tính với domain role (Teacher)

👉 Đây là **identity tối thiểu**, không phải user management.

---

### 2. User / Account Management (PHASE 1 – KHÔNG)

TeachFlow Phase 1 **KHÔNG** có:

* Đăng ký (register)
* Quên mật khẩu
* Đổi mật khẩu từ UI
* Xác minh email / OTP
* Phân quyền
* Quản lý vai trò
* Lifecycle user (active / inactive / banned)

Nếu một feature chạm tới các nội dung trên
→ **ngoài Phase 1 scope**

---

## IV. QUYẾT ĐỊNH KIẾN TRÚC CỐT LÕI

### 1. Tách `users` và `teachers`

TeachFlow Phase 1 **cố tình tách**:

* `users` → **Authentication Identity**
* `teachers` → **Domain Role**

Đây là **nền móng dài hạn**, không phải giải pháp tạm.

---

### 2. Lý do tách

* Tránh:

  * Hardcode teacher là user
  * Migration đau về sau
* Cho phép:

  * Mở rộng role ở Phase 2+ (nếu cần)
  * Giữ Domain Model sạch

---

## V. IDENTITY MODEL – `users` (PHASE 1)

### 1. Vai trò của `users`

* Đại diện **danh tính đăng nhập**
* Không đại diện nghiệp vụ
* Không có quyền quyết định domain

### 2. Cấu trúc logic

```
users
- id (PK)
- username (UNIQUE)
- password_hash
- name
- created_at
- updated_at
```

### 3. Nguyên tắc bắt buộc

* `username`:

  * Do admin tạo
  * Giáo viên không tự đăng ký
* `password_hash`:

  * Không lưu plaintext
  * Reset = admin set lại
* `name`:

  * Chỉ dùng hiển thị UI
  * Không phải profile

---

## VI. DOMAIN ROLE MODEL – `teachers` (PHASE 1)

### 1. Vai trò của `teachers`

* Đại diện **giáo viên trong TeachFlow**
* Là **owner toàn bộ domain data**

### 2. Cấu trúc logic

```
teachers
- id (PK)
- user_id (FK → users.id)
- created_at
- updated_at
```

### 3. Luật bất biến Phase 1

* 1 user ↔ 1 teacher
* Không tồn tại:

  * student user
  * parent user
  * admin user nghiệp vụ

> Admin trong Phase 1 chỉ là **technical operator**,
> không phải actor trong domain TeachFlow.

---

## VII. AUTH FLOW ĐƯỢC PHÉP (PHASE 1)

### 1. Login

* Giáo viên nhập:

  * username
  * password
* Hệ thống:

  * Xác thực
  * Gán session
  * Map `user_id` → `teacher_id`

### 2. Sau login

* Mọi API nghiệp vụ:

  * Hoạt động theo `teacher_id`
  * Không xử lý logic bằng `user_id`

---

## VIII. NHỮNG HÀNH VI BỊ CẤM (PHASE 1)

### CẤM TUYỆT ĐỐI:

* Đăng ký tài khoản
* Quên mật khẩu
* Đổi mật khẩu từ UI
* Quản lý danh sách user
* Phân quyền
* Gán nhiều role cho 1 user
* Trạng thái user (active/inactive)

Nếu cần:
→ **Hoãn sang Phase sau**

---

## IX. VAI TRÒ CỦA ADMIN (PHASE 1)

Admin **KHÔNG** là user trong hệ thống TeachFlow.

Admin chỉ có quyền **ngoài hệ thống**:

* Tạo user
* Reset password
* Cung cấp username/password cho giáo viên

Admin:

* Không login TeachFlow
* Không xuất hiện trên UI
* Không can thiệp nghiệp vụ

---

## X. TÁC ĐỘNG LÊN DOMAIN & API

### 1. Domain Logic

* Domain chỉ biết:

  * `teacher_id`
* Domain **không biết**:

  * username
  * password
  * auth method

---

### 2. API Design

* Auth API:

  * Chỉ phục vụ login
* Business API:

  * Luôn assume “caller = teacher”
  * Không nhận `user_id` trực tiếp

---

## XI. VAI TRÒ CỦA AI

AI trong Phase 1:

* ❌ Không tạo user
* ❌ Không reset password
* ❌ Không đọc danh sách user
* ❌ Không suy luận identity

AI **không liên quan** đến authentication.

---

## XII. Ý ĐỊNH MIGRATION (GHI NHẬN, KHÔNG TRIỂN KHAI)

Tài liệu này **cố tình mở đường** cho Phase sau:

* Thêm role khác (nếu cần)
* Thêm forgot password
* Thêm lifecycle user
* Thêm admin UI

👉 **KHÔNG triển khai trong Phase 1**

---

## XIII. CHECKLIST REVIEW (PHASE 1 SAFE)

* [x] Có login
* [x] Không register
* [x] Không forgot password
* [x] Admin không là domain actor
* [x] Domain không phụ thuộc user management

👉 **PASS – Phase 1 Authentication & Identity Locked**

---

## XIV. KẾT LUẬN

* TeachFlow Phase 1:

  * Có **authentication tối thiểu**
  * Không có **user management**
* Kiến trúc:

  * Sạch
  * Không tạm bợ
  * Dễ migrate

> Đây là **nền móng đúng**, không phải giải pháp nhanh.

---
