# Luồng học sinh tiếp cận trước (Student-first)
[← Quay lại Overview](README.md)

## Bối cảnh

- Học sinh thấy quảng cáo hoặc được giới thiệu từ bạn bè.
- Học sinh tải ứng dụng trên thiết bị cá nhân.

## Luồng chi tiết

```
Mở ứng dụng lần đầu
→ Màn hình giới thiệu
→ Chọn "Đăng ký" (hoặc Login/Signup bằng Google/Apple/Manual)
→ Tạo StudentProfile
→ Chọn lớp (6 hoặc 7)
→ Chọn mục tiêu học tập
→ Bắt đầu học
→ Có thể liên kết với phụ huynh để phụ huynh theo dõi tiến độ
```

## Cách liên kết phụ huynh

Học sinh có thể liên kết với phụ huynh để phụ huynh theo dõi tiến độ học tập:
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
7. Liên kết StudentProfile với ParentAccount
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

