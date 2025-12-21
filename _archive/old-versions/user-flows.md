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
→ Chọn “Dùng thử ngay” (hoặc Login/Signup bằng Google/Apple/Manual)
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
- Nhập số điện thoại phụ huynh
- Gửi OTP xác thực
- Nhập OTP để liên kết

**Luồng chi tiết:**
1. Học sinh nhập số điện thoại phụ huynh
2. Hệ thống kiểm tra phụ huynh đã có tài khoản chưa
3. Gửi OTP qua SMS (qua Firebase Auth)
4. Học sinh nhập OTP (hỏi phụ huynh lấy OTP)
5. Xác thực OTP thành công
6. Nếu phụ huynh chưa có tài khoản → Tự động tạo tài khoản
7. Liên kết StudentTrialProfile → StudentProfile
8. Hiển thị thông tin đăng nhập (username: số điện thoại, password: số điện thoại) và link dashboard

**Lưu ý:**
- Rate limiting: Tối đa 3 lần gửi OTP/ngày/số điện thoại
- reCaptcha bắt buộc khi gửi OTP
- OTP có thời hạn 5 phút

---

## 4.6. Đăng nhập / Đăng ký học sinh (Phase 1) – chuẩn bị cho Phase 2

- Phương thức:
  - Google OAuth
  - Apple OAuth
  - Manual: Họ và tên / username / password
- Sau khi login/signup bằng Google/Apple: **bắt buộc đặt username/password ngay** (username dùng để đăng nhập thủ công; mật khẩu để hỗ trợ đăng nhập trên thiết bị khác/đa hồ sơ ở Phase 2).
- Quy tắc username (manual): chuỗi chữ + số (alphanumeric), không phân biệt hoa/thường.
- Phase 1 giữ 1:1 (mỗi phụ huynh một học sinh), nhưng cần chuẩn bị cho Phase 2 (1:N) bằng việc đảm bảo mỗi học sinh có credential riêng (username/password) để đăng nhập đúng hồ sơ trên thiết bị chia sẻ.
- Cho phép đa thiết bị cho học sinh (hạn chế thiết bị sẽ xem xét sau Phase 3).

---

## 5. LUỒNG 2: PHỤ HUYNH TIẾP CẬN TRƯỚC (PARENT-FIRST FLOW)

### 5.1. Bối cảnh

- Phụ huynh thấy quảng cáo hoặc tìm kiếm thông tin trên web.
- Phụ huynh truy cập web dashboard của Tutor.

### 5.2. Luồng chi tiết

Phụ huynh truy cập website
→ Xem giới thiệu sản phẩm
→ Đăng ký ParentAccount (Tên, Số điện thoại, Password, Email optional)
→ Xác thực số điện thoại bằng OTP
→ Tạo StudentProfile
→ Nhận mã liên kết hoặc QR
→ Gửi mã cho học sinh
→ Học sinh nhập mã trong ứng dụng

**Lưu ý:**
- Số điện thoại là username cho đăng nhập
- Email là optional (không bắt buộc)
- Bắt buộc xác thực số điện thoại bằng OTP trong quá trình đăng ký


### 5.3. Trạng thái StudentProfile

| Trạng thái | Mô tả |
|-----------|------|
| Pending | Hồ sơ đã tạo nhưng chưa liên kết thiết bị |
| Linked | Hồ sơ đã liên kết thành công với ứng dụng |

---

## 6. LUỒNG LIÊN KẾT TÀI KHOẢN (LINKING FLOW)

### 6.1. Luồng liên kết bằng số điện thoại (Student-first)

**Bước 1: Học sinh nhập số điện thoại**
- Học sinh nhập số điện thoại phụ huynh
- Hệ thống validate format số điện thoại
- Kiểm tra rate limit (tối đa 3 lần/ngày)
- Verify reCaptcha

**Bước 2: Gửi OTP**
- Hệ thống kiểm tra phụ huynh đã có tài khoản chưa (theo phone_number)
- Gửi OTP qua Firebase Auth → SMS
- Lưu OTP session vào database (expires 5 phút)

**Bước 3: Xác thực OTP**
- Học sinh nhập OTP (hỏi phụ huynh lấy OTP)
- Hệ thống verify OTP với Firebase
- Nếu đúng:
  - Nếu phụ huynh đã có tài khoản: Liên kết StudentTrialProfile → StudentProfile
  - Nếu phụ huynh chưa có: Tạo ParentAccount (status: pending_activation, phone_verified: true) → Tạo StudentProfile → Liên kết
  - Merge dữ liệu học tập từ trial
  - Gửi SMS kích hoạt dashboard (nếu tài khoản mới)
  - Hiển thị thông tin đăng nhập cho phụ huynh

**Bước 4: Kích hoạt dashboard (nếu tài khoản mới)**
- Phụ huynh nhận SMS với link kích hoạt
- Click link → Đặt mật khẩu → Status = 'active'
- Có thể đăng nhập dashboard

### 6.2. Luồng liên kết bằng Link Token (Parent-first)

**Điều kiện liên kết hợp lệ:**
- LinkToken tồn tại và hợp lệ
- Chưa hết hạn
- Chưa được sử dụng trước đó

**Sau khi liên kết thành công:**
- StudentTrialProfile được chuyển thành StudentProfile
- Dữ liệu học tập trong thời gian dùng thử được giữ lại
- Học sinh được cấp quyền sử dụng đầy đủ

### 6.3. Quy tắc liên kết (Phase 1)

- **Liên kết 1 chiều**: Chỉ học sinh có thể liên kết đến phụ huynh bằng số điện thoại
- **Phụ huynh không thể tìm học sinh**: Phụ huynh không có chức năng tìm kiếm học sinh trong Phase 1
- **Parent-first flow**: Vẫn giữ nguyên flow dùng Link Token (không thay đổi)

---

## 7. LUỒNG OAuth LOGIN VỚI CẬP NHẬT SỐ ĐIỆN THOẠI

### 7.1. Bối cảnh

- Phụ huynh đăng nhập bằng Google hoặc Apple
- Hệ thống cần số điện thoại đã verified để học sinh có thể liên kết

### 7.2. Luồng chi tiết

Phụ huynh click "Đăng nhập bằng Google/Apple"
→ OAuth authentication
→ Hệ thống kiểm tra tài khoản (theo oauth_id)
→ Nếu chưa có → Tạo ParentAccount (oauth_provider, oauth_id, email, name, phone_verified: false)
→ Nếu đã có → Lấy ParentAccount
→ Kiểm tra phone_verified

**Nếu phone_verified = false:**
→ Redirect đến màn hình "Cập nhật số điện thoại"
→ Nhập số điện thoại
→ Gửi OTP
→ Nhập OTP
→ Xác thực OTP
→ Cập nhật phone_number và phone_verified = true
→ Redirect đến dashboard

**Nếu phone_verified = true:**
→ Redirect đến dashboard bình thường

### 7.3. Lưu ý

- **Bắt buộc**: Phụ huynh phải có số điện thoại đã verified mới được vào dashboard
- **Lý do**: Để học sinh có thể liên kết bằng số điện thoại
- **Không cho vào dashboard**: Nếu phone_verified = false, không cho truy cập dashboard

---

## 8. TRẠNG THÁI NGƯỜI DÙNG (PHASE 1)

### 8.1. Học sinh

| Trạng thái | Mô tả |
|-----------|------|
| Trial | Đang sử dụng ở chế độ dùng thử |
| Linked | Đã liên kết với phụ huynh |

### 8.2. Phụ huynh

| Trạng thái | Mô tả |
|-----------|------|
| pending_activation | Tài khoản được tạo tự động (từ học sinh), chưa kích hoạt dashboard |
| inactive | Đã tạo tài khoản nhưng chưa liên kết học sinh |
| active | Có học sinh đã liên kết và đã kích hoạt dashboard |

### 8.3. Trạng thái số điện thoại

| Trạng thái | Mô tả |
|-----------|------|
| phone_verified = false | Số điện thoại chưa được xác thực (sau OAuth) |
| phone_verified = true | Số điện thoại đã được xác thực bằng OTP |

---

## 9. CÁC QUYẾT ĐỊNH THIẾT KẾ QUAN TRỌNG

- Không cho phép học sinh tạo tài khoản vĩnh viễn độc lập.
- Không bắt buộc phụ huynh đăng ký ngay khi học sinh bắt đầu dùng app.
- Luôn hỗ trợ khả năng chuyển đổi từ trial sang tài khoản chính thức.
- **Số điện thoại là username** cho đăng nhập phụ huynh.
- **Liên kết 1 chiều**: Chỉ học sinh có thể liên kết đến phụ huynh bằng số điện thoại (Phase 1).
- **OAuth bắt buộc phone verification**: Phụ huynh đăng nhập OAuth phải cập nhật và verify số điện thoại trước khi vào dashboard.
- **Email optional**: Email không bắt buộc trong đăng ký.
- **Chuẩn bị Phase 2**: Học sinh có credential riêng (username/password, đặt ngay sau OAuth), hỗ trợ đăng nhập trên thiết bị chia sẻ; Phase 1 vẫn 1:1 nhưng kiến trúc login đã sẵn cho 1:N.
- **Validation backend 1:1**: Trong Phase 1, backend cần chặn tạo >1 StudentProfile cho mỗi phụ huynh dù DB cho phép 1:N, tránh sai logic cho đến khi Phase 2 sẵn sàng.

---

## 10. TÀI LIỆU LIÊN QUAN

- [PRD MVP](../prd/prd_mvp_phase_1-2025-12-14-22-15.md)
- [Student User Stories](../user_stories/student_user_stories_phase_1-2025-12-14-22-45.md)
- [Parent User Stories](../user_stories/parent_user_stories_phase_1-2025-12-14-23-05.md)

---

## 11. LỊCH SỬ THAY ĐỔI

- 2025-12-14-23-40: Tạo mới tài liệu
- 2025-12-15-XX-XX: Cập nhật linking flow từ email sang số điện thoại + OTP, thêm OAuth login flow với phone verification, xác nhận linking 1 chiều


---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)