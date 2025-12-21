# Luồng liên kết tài khoản
[← Quay lại Overview](README.md)

## Luồng liên kết bằng số điện thoại (Student-first)

### Bước 1: Học sinh nhập số điện thoại
- Học sinh nhập số điện thoại phụ huynh
- Hệ thống validate format số điện thoại
- Kiểm tra rate limit (tối đa 3 lần/ngày)
- Verify reCaptcha

### Bước 2: Gửi OTP
- Hệ thống kiểm tra phụ huynh đã có tài khoản chưa (theo phone_number)
- Gửi OTP qua Firebase Auth → SMS
- Lưu OTP session vào database (expires 5 phút)

### Bước 3: Xác thực OTP
- Học sinh nhập OTP (hỏi phụ huynh lấy OTP)
- Hệ thống verify OTP với Firebase
- Nếu đúng:
  - Nếu phụ huynh đã có tài khoản: Liên kết StudentTrialProfile → StudentProfile
  - Nếu phụ huynh chưa có: Tạo ParentAccount (status: pending_activation, phone_verified: true) → Tạo StudentProfile → Liên kết
  - Merge dữ liệu học tập từ trial
  - Gửi SMS kích hoạt dashboard (nếu tài khoản mới)
  - Hiển thị thông tin đăng nhập cho phụ huynh

### Bước 4: Kích hoạt dashboard (nếu tài khoản mới)
- Phụ huynh nhận SMS với link kích hoạt
- Click link → Đặt mật khẩu → Status = 'active'
- Có thể đăng nhập dashboard

## Luồng liên kết bằng Link Token (Parent-first)

**Điều kiện liên kết hợp lệ:**
- LinkToken tồn tại và hợp lệ
- Chưa hết hạn
- Chưa được sử dụng trước đó

**Sau khi liên kết thành công:**
- StudentTrialProfile được chuyển thành StudentProfile
- Dữ liệu học tập trong thời gian dùng thử được giữ lại
- Học sinh được cấp quyền sử dụng đầy đủ

## Quy tắc liên kết (Phase 1)

- **Liên kết 1 chiều**: Chỉ học sinh có thể liên kết đến phụ huynh bằng số điện thoại
- **Phụ huynh không thể tìm học sinh**: Phụ huynh không có chức năng tìm kiếm học sinh trong Phase 1
- **Parent-first flow**: Vẫn giữ nguyên flow dùng Link Token (không thay đổi)

[← Quay lại Overview](README.md)

