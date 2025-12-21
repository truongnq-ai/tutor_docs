# Luồng học sinh tiếp cận trước (Student-first)
[← Quay lại Overview](README.md)

## Bối cảnh

- Học sinh thấy quảng cáo hoặc được giới thiệu từ bạn bè.
- Học sinh tải ứng dụng trên thiết bị cá nhân.

## Luồng chi tiết

```
Mở ứng dụng lần đầu
→ Màn hình giới thiệu
→ Chọn "Dùng thử ngay" (hoặc Login/Signup bằng Google/Apple/Manual)
→ Tạo StudentTrialProfile
→ Chọn lớp (6 hoặc 7)
→ Bắt đầu học với quyền hạn giới hạn
→ Gặp paywall
→ Yêu cầu liên kết phụ huynh
```

## Quyền hạn của StudentTrialProfile

### Được phép:
- Giải bài Toán với số lượng giới hạn
- Học theo lộ trình trong 1–2 ngày
- Luyện tập các bài cơ bản

### Không được phép:
- Xem báo cáo học tập dài hạn
- Lưu tiến độ học vĩnh viễn
- Sử dụng ứng dụng không giới hạn

## Paywall và yêu cầu liên kết phụ huynh

Paywall được hiển thị khi:
- Hết số lượt sử dụng miễn phí
- Hoặc hết thời gian dùng thử

Thông điệp hiển thị yêu cầu học sinh nhờ phụ huynh xác nhận tài khoản.

## Cách liên kết phụ huynh

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

## Đăng nhập / Đăng ký học sinh (Phase 1) – chuẩn bị cho Phase 2

### Phương thức:
- Google OAuth
- Apple OAuth
- Manual: Họ và tên / username / password

### Quy tắc:
- Sau khi login/signup bằng Google/Apple: **bắt buộc đặt username/password ngay** (username dùng để đăng nhập thủ công; mật khẩu để hỗ trợ đăng nhập trên thiết bị khác/đa hồ sơ ở Phase 2).
- Quy tắc username (manual): chuỗi chữ + số (alphanumeric), không phân biệt hoa/thường.
- Phase 1 giữ 1:1 (mỗi phụ huynh một học sinh), nhưng cần chuẩn bị cho Phase 2 (1:N) bằng việc đảm bảo mỗi học sinh có credential riêng (username/password) để đăng nhập đúng hồ sơ trên thiết bị chia sẻ.
- Cho phép đa thiết bị cho học sinh (hạn chế thiết bị sẽ xem xét sau Phase 3).

[← Quay lại Overview](README.md)

