# Các quyết định thiết kế quan trọng
[← Quay lại Overview](README.md)

## Quyết định thiết kế

1. **Không cho phép học sinh tạo tài khoản vĩnh viễn độc lập.**
   - Học sinh phải liên kết với phụ huynh để tiếp tục sử dụng

2. **Không bắt buộc phụ huynh đăng ký ngay khi học sinh bắt đầu dùng app.**
   - Học sinh có thể dùng thử trước
   - Phụ huynh đăng ký sau khi học sinh gặp paywall

3. **Luôn hỗ trợ khả năng chuyển đổi từ trial sang tài khoản chính thức.**
   - Dữ liệu học tập trong thời gian dùng thử được giữ lại
   - StudentTrialProfile được chuyển thành StudentProfile

4. **Số điện thoại là username cho đăng nhập phụ huynh.**
   - Đơn giản hóa quy trình đăng nhập
   - Dễ nhớ cho người dùng

5. **Liên kết 1 chiều: Chỉ học sinh có thể liên kết đến phụ huynh bằng số điện thoại (Phase 1).**
   - Phụ huynh không có chức năng tìm kiếm học sinh
   - Đảm bảo quyền riêng tư

6. **OAuth bắt buộc phone verification: Phụ huynh đăng nhập OAuth phải cập nhật và verify số điện thoại trước khi vào dashboard.**
   - Đảm bảo học sinh có thể liên kết bằng số điện thoại
   - Bảo mật tài khoản

7. **Email optional: Email không bắt buộc trong đăng ký.**
   - Giảm rào cản đăng ký
   - Số điện thoại là thông tin chính

8. **Chuẩn bị Phase 2: Học sinh có credential riêng (username/password, đặt ngay sau OAuth), hỗ trợ đăng nhập trên thiết bị chia sẻ; Phase 1 vẫn 1:1 nhưng kiến trúc login đã sẵn cho 1:N.**
   - Kiến trúc sẵn sàng cho mở rộng
   - Mỗi học sinh có credential riêng

9. **Validation backend 1:1: Trong Phase 1, backend cần chặn tạo >1 StudentProfile cho mỗi phụ huynh dù DB cho phép 1:N, tránh sai logic cho đến khi Phase 2 sẵn sàng.**
   - Đảm bảo logic Phase 1 đúng
   - Tránh lỗi khi chuyển sang Phase 2

[← Quay lại Overview](README.md)

