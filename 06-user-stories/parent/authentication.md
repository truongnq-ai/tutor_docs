# Truy cập & Xác thực
← Quay lại: [README.md](../README.md)

## PU-01: Đăng nhập dashboard phụ huynh

**User story**  
Là một phụ huynh, tôi muốn đăng nhập vào dashboard để xem tình hình học tập của con.

**Acceptance criteria**
- [ ] Đăng nhập bằng số điện thoại (username) + password
- [ ] Hoặc đăng nhập bằng Google/Apple (OAuth)
- [ ] Nếu đăng nhập OAuth và chưa có số điện thoại hoặc chưa verified → Bắt buộc cập nhật và verify số điện thoại

## PU-01a: Đăng ký tài khoản phụ huynh

**User story**  
Là một phụ huynh, tôi muốn đăng ký tài khoản để quản lý việc học của con.

**Acceptance criteria**
- [ ] Form đăng ký gồm: Tên, Số điện thoại (username), Password, Email (không bắt buộc)
- [ ] Bắt buộc xác thực số điện thoại bằng OTP trong quá trình đăng ký
- [ ] Sau khi verify OTP → Tài khoản được kích hoạt

## PU-11: Đăng nhập bằng Google/Apple

**User story**  
Là một phụ huynh, tôi muốn đăng nhập bằng tài khoản Google hoặc Apple để tiện lợi hơn.

**Acceptance criteria**
- [ ] Đăng nhập bằng Google hoặc Apple
- [ ] Nếu chưa có tài khoản → Tự động tạo tài khoản
- [ ] Sau khi đăng nhập OAuth: Nếu chưa có số điện thoại hoặc phone_verified = false → Bắt buộc cập nhật số điện thoại

## PU-12: Cập nhật số điện thoại sau OAuth login

**User story**  
Là một phụ huynh đã đăng nhập bằng OAuth, tôi muốn cập nhật số điện thoại để học sinh có thể liên kết với tôi.

**Acceptance criteria**
- [ ] Hiển thị màn hình "Cập nhật số điện thoại" sau OAuth login nếu phone_verified = false
- [ ] Nhập số điện thoại → Gửi OTP → Verify OTP
- [ ] Sau khi verify OTP → phone_verified = true → Redirect đến dashboard

← Quay lại: [README.md](../README.md)

