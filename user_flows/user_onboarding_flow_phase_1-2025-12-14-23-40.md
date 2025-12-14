# USER ONBOARDING FLOW – PHASE 1 (MVP)

Project: Tutor  
Document type: User Flow  
Audience: Product / UX / Developer  
Status: Draft  
Version: 2025-12-14-23-40  
Author: Product Consultant (ChatGPT)

---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả các luồng onboarding người dùng trong Phase 1 (MVP), tập trung vào:
- Hành vi tiếp cận ứng dụng của học sinh và phụ huynh
- Cách tạo và liên kết tài khoản học sinh – phụ huynh
- Các quyết định thiết kế ảnh hưởng đến UX, backend và dữ liệu

Tài liệu này được sử dụng làm cơ sở cho:
- Thiết kế UI/UX onboarding
- Thiết kế API (authentication, account linking)
- Thiết kế database liên quan đến user

---


## 2. NGUYÊN TẮC THIẾT KẾ ONBOARDING

1. Học sinh có thể sử dụng ứng dụng trước mà không cần đăng ký phụ huynh ngay.
2. Phụ huynh là chủ tài khoản cuối cùng và có toàn quyền giám sát.
3. Không tồn tại lâu dài hồ sơ học sinh không liên kết phụ huynh.
4. Quy trình onboarding phải ngắn gọn, ít bước, phù hợp hành vi tự nhiên.

---


## 3. MÔ HÌNH TÀI KHOẢN TỔNG THỂ (PHASE 1)

### 3.1. Tài khoản chính

ParentAccount

└── StudentProfile


- ParentAccount là tài khoản gốc.
- Mỗi ParentAccount gắn với 1 StudentProfile trong Phase 1.

### 3.2. Hồ sơ học sinh dùng thử (Trial)

StudentTrialProfile

- anonymous_id
- device_id
- trial_started_at


StudentTrialProfile chỉ tồn tại trong thời gian dùng thử và sẽ bị xoá hoặc chuyển đổi khi liên kết phụ huynh.

---


## 4. LUỒNG 1: HỌC SINH TIẾP CẬN TRƯỚC (STUDENT-FIRST FLOW)

### 4.1. Bối cảnh

- Học sinh thấy quảng cáo hoặc được giới thiệu từ bạn bè.
- Học sinh tải ứng dụng trên thiết bị cá nhân.

### 4.2. Luồng chi tiết

Mở ứng dụng lần đầu
→ Màn hình giới thiệu
→ Chọn “Dùng thử ngay”
→ Tạo StudentTrialProfile
→ Chọn lớp (6 hoặc 7)
→ Bắt đầu học với quyền hạn giới hạn
→ Gặp paywall
→ Yêu cầu liên kết phụ huynh


### 4.3. Quyền hạn của StudentTrialProfile

Được phép:
- Giải bài Toán với số lượng giới hạn
- Học theo lộ trình trong 1–2 ngày
- Luyện tập các bài cơ bản

Không được phép:
- Xem báo cáo học tập dài hạn
- Lưu tiến độ học vĩnh viễn
- Sử dụng ứng dụng không giới hạn

### 4.4. Paywall và yêu cầu liên kết phụ huynh

Paywall được hiển thị khi:
- Hết số lượt sử dụng miễn phí
- Hoặc hết thời gian dùng thử

Thông điệp hiển thị yêu cầu học sinh nhờ phụ huynh xác nhận tài khoản.

### 4.5. Cách liên kết phụ huynh

Học sinh có thể:
- Nhập email phụ huynh
- Hoặc nhận mã liên kết (LinkToken)

LinkToken có thời hạn sử dụng và chỉ dùng được một lần.

---

## 5. LUỒNG 2: PHỤ HUYNH TIẾP CẬN TRƯỚC (PARENT-FIRST FLOW)

### 5.1. Bối cảnh

- Phụ huynh thấy quảng cáo hoặc tìm kiếm thông tin trên web.
- Phụ huynh truy cập web dashboard của Tutor.

### 5.2. Luồng chi tiết

Phụ huynh truy cập website
→ Xem giới thiệu sản phẩm
→ Đăng ký ParentAccount
→ Tạo StudentProfile
→ Nhận mã liên kết hoặc QR
→ Gửi mã cho học sinh
→ Học sinh nhập mã trong ứng dụng


### 5.3. Trạng thái StudentProfile

| Trạng thái | Mô tả |
|-----------|------|
| Pending | Hồ sơ đã tạo nhưng chưa liên kết thiết bị |
| Linked | Hồ sơ đã liên kết thành công với ứng dụng |

---

## 6. LUỒNG LIÊN KẾT TÀI KHOẢN (LINKING FLOW)

### 6.1. Điều kiện liên kết hợp lệ

- LinkToken tồn tại và hợp lệ
- Chưa hết hạn
- Chưa được sử dụng trước đó

### 6.2. Sau khi liên kết thành công

- StudentTrialProfile được chuyển thành StudentProfile
- Dữ liệu học tập trong thời gian dùng thử được giữ lại
- Học sinh được cấp quyền sử dụng đầy đủ

---

## 7. TRẠNG THÁI NGƯỜI DÙNG (PHASE 1)

### 7.1. Học sinh

| Trạng thái | Mô tả |
|-----------|------|
| Trial | Đang sử dụng ở chế độ dùng thử |
| Linked | Đã liên kết với phụ huynh |

### 7.2. Phụ huynh

| Trạng thái | Mô tả |
|-----------|------|
| Inactive | Đã tạo tài khoản nhưng chưa liên kết học sinh |
| Active | Có học sinh đã liên kết |

---

## 8. CÁC QUYẾT ĐỊNH THIẾT KẾ QUAN TRỌNG

- Không cho phép học sinh tạo tài khoản vĩnh viễn độc lập.
- Không bắt buộc phụ huynh đăng ký ngay khi học sinh bắt đầu dùng app.
- Luôn hỗ trợ khả năng chuyển đổi từ trial sang tài khoản chính thức.

---

## 9. TÀI LIỆU LIÊN QUAN

- ../prd/prd_mvp-2025-12-14-22-15.md
- ../user_stories/student_user_stories-2025-12-14-22-45.md
- ../user_stories/parent_user_stories-2025-12-14-23-05.md

---

## 10. LỊCH SỬ THAY ĐỔI

- 2025-12-14-23-40: Tạo mới tài liệu


---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)