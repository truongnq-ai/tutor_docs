# Phase 1 – Exercise Pedagogical Metadata Specification

**Project:** Gia sư Toán AI  
**Phase:** Phase 1  
**Document type:** Specification / Clarification  
**Audience:** Backend | Frontend | AI | Product | Reviewer  
**Status:** APPROVED – ENFORCED BY DOCUMENTATION  
**Version:** 1.0  

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này ghi nhận và chuẩn hóa việc **bổ sung metadata sư phạm cho Exercise** trong Phase 1, bao gồm:

- `learning_objective`
- `common_mistakes`
- `hints`

Mục tiêu chính:

- Bảo toàn **giá trị sư phạm cốt lõi** của bài tập
- Làm rõ ranh giới giữa:
  - **Content Asset Domain**
  - **Learning Runtime Domain**
- Ngăn chặn mọi việc **sử dụng sai mục đích** các metadata này trong logic học tập

Tài liệu này **KHÔNG**:
- Định nghĩa System Law mới
- Thay đổi System Law hiện có
- Mở rộng scope Phase 1
- Chuẩn bị cho Phase 2

---

## 2. PHẠM VI ÁP DỤNG

### 2.1. Áp dụng cho

- Phase 1
- Exercise Domain (Content Asset)
- Admin / Teacher / AI khi tạo nội dung bài tập

### 2.2. KHÔNG áp dụng cho

- Chapter Progression
- Practice Runtime
- Completion Rule
- Skill Mastery Decision
- Permission / Lifecycle Logic

---

## 3. ĐỊNH NGHĨA CÁC METADATA SƯ PHẠM

### 3.1. `learning_objective`

**Kiểu dữ liệu:** `TEXT`

**Mô tả:**
- Mô tả mục tiêu học tập của bài tập
- Trả lời câu hỏi: *“Học sinh làm bài này để rèn kỹ năng gì?”*

**Đối tượng đọc:**
- Student
- Parent

**Đặc tính:**
- Read-only
- Thuần mô tả sư phạm
- Không tham gia bất kỳ logic quyết định nào

---

### 3.2. `common_mistakes`

**Kiểu dữ liệu:** `JSONB`

**Mô tả:**
- Danh sách các lỗi học sinh thường gặp khi làm bài
- Nhằm giúp học sinh:
  - nhận diện sai lầm phổ biến
  - tránh lặp lại lỗi

**Đối tượng đọc:**
- Student

**Đặc tính:**
- Thuần mô tả
- Không dùng cho chấm điểm
- Không dùng cho suy luận mastery
- Không trigger bất kỳ hành vi runtime nào

---

### 3.3. `hints`

**Kiểu dữ liệu:** `JSONB`

**Mô tả:**
- Cung cấp các gợi ý tĩnh để hỗ trợ học sinh tiếp cận bài toán
- Gợi ý mang tính định hướng, không phải lời giải

**Đối tượng đọc:**
- Student

**Đặc tính:**
- Không ảnh hưởng kết quả bài làm
- Không ảnh hưởng completion
- Không có cơ chế mở khóa, giới hạn, hoặc phạt điểm
- Không mang logic adaptive

---

## 4. PHÂN LOẠI DOMAIN (RANH GIỚI BẮT BUỘC)

Ba metadata:

- `learning_objective`
- `common_mistakes`
- `hints`

được phân loại **DUY NHẤT** là:

> **Content Asset Domain**

Chúng **KHÔNG** thuộc về Learning Runtime Domain.

### 4.1. Bảng phân loại

| Thuộc tính | Content Asset | Learning Runtime |
|---|---|---|
| Lưu trong bảng `exercise` | ✅ | ❌ |
| Ảnh hưởng FSM Chapter | ❌ | ❌ |
| Ảnh hưởng Completion | ❌ | ❌ |
| Ảnh hưởng Mastery | ❌ | ❌ |
| Dùng cho decision | ❌ | ❌ |

---

## 5. CÁC ĐIỀU BỊ CẤM TUYỆT ĐỐI

Để tránh vượt scope Phase 1, **TUYỆT ĐỐI KHÔNG ĐƯỢC**:

### 5.1. Với `learning_objective`

- Dùng để xác định skill achieved
- Dùng để quyết định completion
- Dùng để suy luận mastery

### 5.2. Với `common_mistakes`

- Dùng để auto-feedback runtime
- Dùng để trigger adaptive logic
- Dùng để điều chỉnh độ khó bài

### 5.3. Với `hints`

- Dùng để giảm điểm
- Dùng để tăng / giảm mastery
- Dùng để unlock chapter
- Gắn với bất kỳ cơ chế đếm số lần xem

Mọi hành vi vi phạm các điều trên được xem là **vi phạm Phase 1 Scope**.

---

## 6. TÁC ĐỘNG ĐẾN DATABASE SCHEMA (PHASE 1)

### 6.1. Thay đổi được phép

Bổ sung 3 cột sau vào bảng `exercise`:

- `learning_objective` (TEXT)
- `common_mistakes` (JSONB)
- `hints` (JSONB)

### 6.2. Thay đổi KHÔNG được phép

- Không thay đổi bảng runtime
- Không thay đổi bảng progression
- Không thay đổi bảng mastery
- Không thêm bất kỳ constraint logic nào liên quan đến học tập

> Đây là thay đổi **Content Asset**, không phải Learning Logic.

---

## 7. TÁC ĐỘNG ĐẾN AI SERVICE

### 7.1. AI ĐƯỢC PHÉP

- Sinh nội dung cho:
  - learning_objective
  - common_mistakes
  - hints

### 7.2. AI KHÔNG ĐƯỢC PHÉP

- Dùng các metadata này để:
  - đề xuất unlock
  - đề xuất completion
  - suy luận mastery
  - điều chỉnh progression

**Nguyên tắc bất biến:**

> System Core luôn override AI.  
> Các metadata sư phạm chỉ là dữ liệu hiển thị.

---

## 8. KẾT LUẬN & TRẠNG THÁI

- Việc bổ sung 3 metadata sư phạm:
  - KHÔNG vi phạm System Law
  - KHÔNG mở rộng Phase 1
  - KHÔNG chuẩn bị Phase 2
- Các metadata này:
  - Thuộc Content Asset Domain
  - Chỉ phục vụ giá trị sư phạm
- Tài liệu này có hiệu lực:
  - Ngay khi được commit
  - Dùng làm nguồn tham chiếu chính thức cho Phase 1

**Status:** APPROVED – ENFORCED BY DOCUMENTATION
