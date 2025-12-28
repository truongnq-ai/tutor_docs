# Trial & Licence Management

**Project:** Tutor  
**Document type:** Product Requirements / Business Logic  
**Audience:** Product | Developer | Tech  
**Status:** Draft  
**Version:** 2025-01-27  
**Author:** AI Assistant

[← Quay lại Overview](../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả chi tiết logic quản lý **Trial (dùng thử 7 ngày)** và **Licence (quyền sử dụng trả phí)** trong hệ thống Tutor, bao gồm:

- Logic trial theo user và device
- Quản lý device tracking và anti-abuse
- Lifecycle từ trial → licence
- Business rules và constraints

Làm cơ sở cho:
- Thiết kế database schema
- Implementation backend logic
- API design
- Test cases

---

## 2. PHẠM VI

### 2.1. Trong phạm vi
- Trial logic: 7 ngày dùng thử, 1 user = 1 trial, 1 device = 1 trial lifetime
- Device tracking: Chống abuse, quản lý device CONSUMED
- Licence management: Lifecycle từ trial → licence (1 tháng/6 tháng/12 tháng)
- Multi-device support: User có thể dùng trial trên nhiều devices, licence giới hạn 3 devices

### 2.2. Ngoài phạm vi
- Payment processing (xử lý thanh toán)
- Subscription management (quản lý subscription)
- Invoice generation (tạo hóa đơn)
- Refund logic (hoàn tiền)

---

## 3. ĐỊNH NGHĨA / THUẬT NGỮ

| Thuật ngữ | Giải thích |
|-----------|-----------|
| **Trial** | Giai đoạn dùng thử 7 ngày miễn phí |
| **Licence** | Quyền sử dụng trả phí (1 tháng/6 tháng/12 tháng) |
| **Device CONSUMED** | Device đã từng trial và hết hạn, không thể trial lại |
| **User EXPIRED** | User đã hết hạn trial (7 ngày) |
| **student_trial_profile** | Entity lưu profile và thời gian trial gốc của user |
| **trial_device** | Entity quản lý device trong trial (quan hệ 1:N với student_trial_profile) |
| **licence_info** | Entity quản lý lifecycle trial → licence |
| **device_info** | Entity quản lý device tracking (anti-abuse) |

---

## 4. CẤU TRÚC TÀI LIỆU

### Core Logic
- [Trial & Device Management](trial-and-device.md) - Logic trial, device tracking, business rules
- [Licence Management](licence.md) - Logic licence, lifecycle, multi-device support

### Related Documents
- [Student Onboarding](../student/onboarding.md) - User flow khi bắt đầu trial
- [Parent Linking](../student/parent-linking.md) - Chuyển từ trial sang licence

---

## 5. TỔNG QUAN LOGIC

### 5.1. Trial Logic

**Nguyên tắc:**
- **1 user = 1 trial 7 ngày** (theo `student_trial_profile`)
- **1 device = 1 trial lifetime** (check `trial_device.trial_expires_at < now` → CONSUMED)
- User có thể dùng trial trên **nhiều devices** (tạo nhiều `trial_device` với cùng `trial_id`)
- Device đã CONSUMED **không thể trial lại** (dù user nào)
- Tất cả devices dùng **chung thời gian trial** (từ `student_trial_profile`)

**Flow mới:**
- User login → Gọi API `/api/v1/student/check` → Backend tự động kiểm tra và xử lý
- Nếu user chưa có trial → Frontend navigate đến trang chọn grade + learning goals
- Sau khi chọn → Gọi API `/api/v1/student/trial/create` để tạo trial
- Nếu user đã có trial active → Backend tự động add device vào `trial_device` nếu cần

### 5.2. Device Tracking

**Nguyên tắc:**
- Device CONSUMED khi: `trial_device.trial_expires_at < now` (bất kỳ user nào)
- User đang trial **không thể login** trên device đã CONSUMED
- User phải dùng **device khác** nếu device hiện tại đã CONSUMED

**Flow mới:**
- API `/api/v1/student/check` tự động kiểm tra device CONSUMED
- Nếu device CONSUMED → Trả về trạng thái `TRIAL_ACTIVE_DEVICE_CONSUMED`
- Frontend hiển thị thông báo yêu cầu đổi device

### 5.3. Licence Logic

**Nguyên tắc:**
- Licence gắn với **user** (không phụ thuộc device)
- User có thể dùng licence trên **nhiều devices** (tối đa 3 devices active đồng thời)
- Licence có các plan: 1 tháng, 6 tháng, 12 tháng
- Khi trial hết hạn → user có thể mua licence

**Flow mới:**
- API `/api/v1/student/check` tự động kiểm tra licence status
- Nếu user có licence ACTIVE → Tự động add device vào `license_device` nếu chưa có và chưa đủ 3 devices
- Trả về trạng thái `LICENCE_ACTIVE` với thông tin số ngày còn lại

### 5.4. API `/api/v1/student/check` - Trung Tâm Logic Kiểm Tra

**Mục đích:** API này tập trung toàn bộ logic kiểm tra trạng thái trial và licence, trả về 1 trong 6 trạng thái:

1. **NO_TRIAL**: User chưa có trial
2. **TRIAL_ACTIVE_DEVICE_CONSUMED**: User đang trial nhưng device đã CONSUMED
3. **TRIAL_ACTIVE**: User đang trial được phép sử dụng
4. **LICENCE_ACTIVE**: User đang trong licence
5. **LICENCE_EXPIRED**: User đã có licence nhưng hết hạn
6. **TRIAL_EXPIRED_NO_LICENCE**: User đã hết trial nhưng chưa có licence

**Chi tiết:** Xem [Trial & Device Management](trial-and-device.md#56-rule-6-apiapiv1studentcheck---kiểm-tra-trạng-thái-tổng-hợp)

---

## 6. ENTITIES OVERVIEW

### 6.1. student_trial_profile
- Lưu profile và thời gian trial gốc
- Fields: `user_id`, `grade`, `learning_goals`, `trial_started_at`, `expires_at`, `trial_status`
- Quan hệ 1:N với `trial_device`

### 6.2. trial_device
- Quản lý device trong trial
- Fields: `trial_id`, `user_id`, `device_id`, `trial_started_at`, `trial_expires_at`, `status`
- Unique constraint: `(trial_id, device_id)`

### 6.3. licence_info
- Quản lý lifecycle trial → licence
- Fields: `user_id`, `type` (TRIAL/LICENCE), `status`, `started_at`, `expires_at`, `plan_type`
- Quan hệ với `license_device` (quản lý devices active)

### 6.4. device_info (đề xuất)
- Quản lý device tracking (anti-abuse)
- Fields: `device_id`, `user_id`, `first_trial_at`, `trial_expires_at`, `status`

---

## 7. QUYẾT ĐỊNH THIẾT KẾ

- **Decision 1**: Trial theo user, không theo device
  - **Reason**: UX tốt hơn, user có thể dùng trial trên nhiều devices
- **Decision 2**: Device CONSUMED khi hết hạn (bất kỳ user nào)
  - **Reason**: Chống abuse, 1 device chỉ trial 1 lần lifetime
- **Decision 3**: Tách `student_trial_profile` và `trial_device`
  - **Reason**: Tách biệt profile (grade, learning_goals) và device tracking
- **Decision 4**: Bỏ hoàn toàn `anonymous_id`
  - **Reason**: User phải login trước khi trial, không còn anonymous trial

---

## 8. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Student Onboarding](../student/onboarding.md)
  - [Parent Linking](../student/parent-linking.md)
  - [Product Overview](../../product-overview.md)

---

## 9. GHI CHÚ / TODO

- [ ] Xác nhận logic với team
- [ ] Review database schema
- [ ] Update API specifications
- [ ] Write test cases

---

[← Quay lại Overview](../README.md)

