# User Flow: Student – Start Learning Flow

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
- **Actor:** Student
- **Purpose:** Student bắt đầu học một Chapter hợp lệ

---

## 2. PRECONDITIONS (ĐIỀU KIỆN TRƯỚC)

- Student đã đăng nhập hợp lệ
- Student có role = STUDENT
- Student có StudentProfile tồn tại
- Student.lifecycle_state cho phép học
- Chapter đã được admin gán cho Student (assignment tồn tại)
- ChapterProgress cho Chapter này đang ở trạng thái LOCKED

**Không tồn tại:**

- Trial
- License
- Payment
- Device restriction

---

## 3. TRIGGER (HÀNH ĐỘNG KÍCH HOẠT)

- Student chọn một Chapter trong danh sách Chapter được phép học
- Student nhấn hành động "Bắt đầu học" (Start Learning)

---

## 4. STEP-BY-STEP FLOW

### Step 1

Student gửi request "start learning chapter" đến backend.

### Step 2

Backend Controller (ChapterProgressController):

- Xác thực JWT
- Xác định actor là STUDENT
- Chuyển request vào ChapterProgressService

### Step 3

ChapterProgressService thực hiện các guard bắt buộc:

- RoleGuard: chỉ STUDENT được phép
- LifecycleGuard: kiểm tra Student.lifecycle_state
- ChapterAccessGuard: Student chỉ truy cập Chapter của mình

Nếu guard FAIL → trả về lỗi, flow kết thúc.

### Step 4

ChapterProgressService gọi ChapterProgressDomainLogic.startChapter()

### Step 5

ChapterProgressDomainLogic kiểm tra invariant:

- ChapterProgress hiện tại phải ở trạng thái LOCKED
- Student không có Chapter nào khác đang IN_PROGRESS

Nếu invariant FAIL → reject, flow kết thúc.

### Step 6

ChapterProgressDomainLogic:

- Chuyển chapter_state từ LOCKED → IN_PROGRESS
- Persist trạng thái mới
- KHÔNG emit event ở bước này.

### Step 7

ChapterProgressService trả kết quả thành công cho Controller.

### Step 8

Controller trả response cho Student:

- Chapter đã ở trạng thái IN_PROGRESS
- Student có thể bắt đầu Practice

---

## 5. DOMAIN OWNERSHIP & AUTHORITY

- ChapterProgress là owner duy nhất của chapter_state
- Chỉ ChapterProgressDomainLogic được phép đổi state
- Không class nào khác được phép can thiệp

---

## 6. EVENTS

Không emit domain event trong flow này.

**Lý do:**

- Start learning không phải completion
- Không có side-effect hệ thống

---

## 7. FORBIDDEN PATHS (ĐƯỜNG CẤM)

Flow này TUYỆT ĐỐI KHÔNG cho phép:

- Student bắt đầu học khi lifecycle không cho phép
- Student có 2 Chapter cùng lúc ở trạng thái IN_PROGRESS
- Admin gọi API này thay Student
- AI gọi API này
- Cron hoặc background job kích hoạt flow
- Bypass guard vì mục đích test

---

## 8. POSTCONDITIONS (TRẠNG THÁI SAU)

- ChapterProgress.chapter_state = IN_PROGRESS
- Student vẫn giữ nguyên lifecycle_state
- Không có Chapter nào khác IN_PROGRESS
- System sẵn sàng cho Practice Flow

---

## 9. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Do Practice Flow](do-practice-flow.md)
  - [Complete Chapter Flow](complete-chapter-flow.md)
  - [Backend Skeleton](../../phase-01.03-architecture/phase-1-backend-skeleton.md)

---

[← Quay lại Overview](../README.md)

