# Luồng phụ huynh tiếp cận trước (Parent-first)
[← Quay lại Overview](README.md)

## Bối cảnh

- Phụ huynh thấy quảng cáo hoặc tìm kiếm thông tin trên web.
- Phụ huynh truy cập web dashboard của Tutor.

## Luồng chi tiết

```
Phụ huynh truy cập website
→ Xem giới thiệu sản phẩm
→ Đăng ký ParentAccount (Tên, Số điện thoại, Password, Email optional)
→ Xác thực số điện thoại bằng OTP
→ Tạo StudentProfile
→ Nhận mã liên kết hoặc QR
→ Gửi mã cho học sinh
→ Học sinh nhập mã trong ứng dụng
```

## Lưu ý

- Số điện thoại là username cho đăng nhập
- Email là optional (không bắt buộc)
- Bắt buộc xác thực số điện thoại bằng OTP trong quá trình đăng ký

## Trạng thái StudentProfile

| Trạng thái | Mô tả |
|-----------|------|
| Pending | Hồ sơ đã tạo nhưng chưa liên kết thiết bị |
| Linked | Hồ sơ đã liên kết thành công với ứng dụng |

[← Quay lại Overview](README.md)

