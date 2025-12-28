# PRODUCT ROADMAP

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả roadmap phát triển sản phẩm Tutor theo các giai đoạn.

## Phase 1 (MVP – Hiện tại)

### Môn học
- Toán lớp 6
- Toán lớp 7

### Student App
- Onboarding học sinh
- Lộ trình học hằng ngày
- Luyện tập cá nhân hoá theo skill
- Mini test theo dạng bài
- Tutor mode (giải bài bằng ảnh/text)

### Parent Dashboard (Web)
- Đăng ký/đăng nhập (phone/password hoặc OAuth + verify phone)
- Tổng quan học tập
- Điểm yếu
- Báo cáo tuần cơ bản

### Authentication & Linking
- Trial mode cho học sinh
- Paywall và yêu cầu liên kết phụ huynh
- Liên kết phụ huynh 1:1 qua số điện thoại + OTP (Firebase Auth)
- Auto-create parent nếu chưa có

### Notification
- In-app / web (Firebase)
- Chưa gửi email/Zalo

### Billing/Payments
- Chưa có billing/payments trong Phase 1

## Phase 2 (Mở rộng)

### Quan hệ 1:N
- Một phụ huynh quản lý nhiều học sinh
- Parent có thể thêm nhiều StudentProfile
- Student-first linking auto-tạo hồ sơ mới

### Billing/Payments
- Gói Personal: 1 học sinh
- Gói Family: 3 học sinh
- Gói Enterprise: N học sinh (liên hệ)
- Thanh toán theo gói kiểu Office365

### Notification
- Vẫn chỉ in-app/web qua Firebase
- Chưa bật email/Zalo

### Secondary Screens
- Ưu tiên hoàn thiện thêm secondary screens nếu đủ nguồn lực
- Nâng cấp báo cáo chi tiết có thể lùi Phase 3

## Phase 3 (Mở rộng tiếp)

### Notification Service
- Email notifications
- Zalo OA notifications

### Báo cáo phụ huynh nâng cao
- Progress chi tiết
- Export báo cáo
- Báo cáo theo kỳ

### Admin/Ops Dashboard nâng cao
- Quản trị nội dung chi tiết
- Giám sát chất lượng AI nâng cao

### Mở rộng lớp
- Toán lớp 8–9
- Môn khác sẽ sau Phase 3

## Timeline (Dự kiến)

- **Phase 1**: Q1 2025 (MVP)
- **Phase 2**: Q2-Q3 2025 (Mở rộng)
- **Phase 3**: Q4 2025 - Q1 2026 (Nâng cao)

## Tài liệu liên quan

- [Product Overview](./product-overview.md)
- [KPIs & Metrics](./kpis-metrics.md)

---

← Quay lại: [README.md](../README.md)

