# Luồng OAuth login với cập nhật số điện thoại
[← Quay lại Overview](README.md)

## Bối cảnh

- Phụ huynh đăng nhập bằng Google hoặc Apple
- Hệ thống cần số điện thoại đã verified để học sinh có thể liên kết

## Luồng chi tiết

```
Phụ huynh click "Đăng nhập bằng Google/Apple"
→ OAuth authentication
→ Hệ thống kiểm tra tài khoản (theo oauth_id)
→ Nếu chưa có → Tạo ParentAccount (oauth_provider, oauth_id, email, name, phone_verified: false)
→ Nếu đã có → Lấy ParentAccount
→ Kiểm tra phone_verified
```

### Nếu phone_verified = false:
```
→ Redirect đến màn hình "Cập nhật số điện thoại"
→ Nhập số điện thoại
→ Gửi OTP
→ Nhập OTP
→ Xác thực OTP
→ Cập nhật phone_number và phone_verified = true
→ Redirect đến dashboard
```

### Nếu phone_verified = true:
```
→ Redirect đến dashboard bình thường
```

## Lưu ý

- **Bắt buộc**: Phụ huynh phải có số điện thoại đã verified mới được vào dashboard
- **Lý do**: Để học sinh có thể liên kết bằng số điện thoại
- **Không cho vào dashboard**: Nếu phone_verified = false, không cho truy cập dashboard

[← Quay lại Overview](README.md)

