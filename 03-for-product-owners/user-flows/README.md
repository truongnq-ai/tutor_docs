# USER ONBOARDING FLOWS

Tài liệu này mô tả các luồng onboarding người dùng trong Phase 1 (MVP), tập trung vào:
- Hành vi tiếp cận ứng dụng của học sinh và phụ huynh
- Cách tạo và liên kết tài khoản học sinh – phụ huynh
- Các quyết định thiết kế ảnh hưởng đến UX, backend và dữ liệu

## Mục đích

Tài liệu này được sử dụng làm cơ sở cho:
- Thiết kế UI/UX onboarding
- Thiết kế API (authentication, account linking)
- Thiết kế database liên quan đến user

## Cấu trúc tài liệu

### Nguyên tắc thiết kế
- [Nguyên tắc thiết kế onboarding](design-principles.md)

### Mô hình tài khoản
- [Mô hình tài khoản tổng thể](account-model.md)

### Luồng onboarding
- [Luồng học sinh tiếp cận trước (Student-first)](student-first-flow.md)
- [Luồng phụ huynh tiếp cận trước (Parent-first)](parent-first-flow.md)
- [Luồng liên kết tài khoản](linking-flow.md)
- [Luồng OAuth login với cập nhật số điện thoại](oauth-flow.md)

### Trạng thái người dùng
- [Trạng thái người dùng (Phase 1)](user-statuses.md)

### Quyết định thiết kế
- [Các quyết định thiết kế quan trọng](design-decisions.md)

## Tài liệu liên quan

- [User Stories](../user-stories/README.md)
- [PRD MVP](../prd/prd_mvp_phase_1-2025-12-14-22-15.md)

## Lịch sử thay đổi

- 2025-12-14-23-40: Tạo mới tài liệu
- 2025-12-15-XX-XX: Cập nhật linking flow từ email sang số điện thoại + OTP, thêm OAuth login flow với phone verification, xác nhận linking 1 chiều

---

← Quay lại: [Tài liệu tổng quan](../../README.md)

