# Licence Management

**Project:** Tutor  
**Document type:** Product Requirements / Business Logic  
**Audience:** Product | Developer | Tech  
**Status:** Draft  
**Version:** 2025-01-27  
**Author:** AI Assistant

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả chi tiết logic quản lý **Licence (quyền sử dụng trả phí)** trong hệ thống Tutor, bao gồm lifecycle từ trial → licence và multi-device support.

---

## 2. PHẠM VI

### 2.1. Trong phạm vi
- Licence management: Lifecycle từ trial → licence
- Plan types: 1 tháng, 6 tháng, 12 tháng
- Multi-device support: Tối đa 3 devices active đồng thời
- Device activation/revocation logic

### 2.2. Ngoài phạm vi
- Payment processing (xử lý thanh toán)
- Subscription management (quản lý subscription)
- Invoice generation (tạo hóa đơn)
- Refund logic (hoàn tiền)
- Trial logic (xem [Trial & Device Management](trial-and-device.md))

---

## 3. ĐỊNH NGHĨA / THUẬT NGỮ

| Thuật ngữ | Giải thích |
|-----------|-----------|
| **Licence** | Quyền sử dụng trả phí (1 tháng/6 tháng/12 tháng) |
| **Plan Type** | Loại gói licence: MONTH_1, MONTH_6, YEAR_1 |
| **Active Device** | Device đang được sử dụng với licence (tối đa 3 devices) |
| **Device Activation** | Kích hoạt device để sử dụng licence |
| **Device Revocation** | Gỡ bỏ device khỏi licence (khi vượt quá 3 devices) |
| **licence_info** | Entity quản lý lifecycle trial → licence |
| **license_device** | Entity quản lý devices active trong licence |

---

## 4. ENTITIES & SCHEMA

### 4.1. licence_info

**Mục đích:** Quản lý lifecycle trial → licence.

```sql
licence_info
------------
id                  UUID PRIMARY KEY
user_id             UUID NOT NULL          -- User chủ của licence
type                VARCHAR(20) NOT NULL     -- TRIAL | LICENCE
status              VARCHAR(20) NOT NULL     -- TRIAL_ACTIVE | TRIAL_EXPIRED | LICENCE_ACTIVE | LICENCE_EXPIRED | LICENCE_SUSPENDED
started_at          TIMESTAMP NOT NULL      -- Thời gian bắt đầu
expires_at          TIMESTAMP NOT NULL      -- Thời gian hết hạn
plan_type           VARCHAR(20)              -- MONTH_1 | MONTH_6 | YEAR_1 (NULL nếu type = TRIAL)
parent_account_id   UUID                    -- FK to parent_account (NULL nếu type = TRIAL)
max_devices         INT DEFAULT 3            -- Số lượng devices tối đa (chỉ áp dụng cho LICENCE)
created_at          TIMESTAMP DEFAULT NOW
updated_at          TIMESTAMP DEFAULT NOW

INDEX idx_licence_user_id (user_id)
INDEX idx_licence_status (status)
INDEX idx_licence_expires_at (expires_at)
INDEX idx_licence_type (type)
```

**Business Rules:**
- 1 user có thể có nhiều `licence_info` records (history)
- `type = TRIAL`: Khi user đang trial (7 ngày)
- `type = LICENCE`: Khi user mua licence
- `status = TRIAL_ACTIVE`: User đang trial
- `status = TRIAL_EXPIRED`: User hết hạn trial
- `status = LICENCE_ACTIVE`: User có licence active
- `status = LICENCE_EXPIRED`: User hết hạn licence
- `status = LICENCE_SUSPENDED`: Licence bị tạm ngưng (nếu có)

### 4.2. license_device

**Mục đích:** Quản lý devices active trong licence (tối đa 3 devices).

```sql
license_device
--------------
id                  UUID PRIMARY KEY
licence_id          UUID NOT NULL          -- FK to licence_info
device_id           UUID NOT NULL          -- FK to device (hoặc VARCHAR nếu dùng device_uid)
activated_at        TIMESTAMP NOT NULL      -- Thời gian kích hoạt
revoked_at          TIMESTAMP               -- Thời gian gỡ bỏ (NULL nếu còn active)
is_active           BOOLEAN DEFAULT TRUE    -- Device còn active không

UNIQUE (licence_id, device_id) WHERE is_active = TRUE
INDEX idx_license_device_licence_id (licence_id)
INDEX idx_license_device_device_id (device_id)
INDEX idx_license_device_active (is_active)
```

**Business Rules:**
- 1 licence có tối đa 3 devices active (`is_active = TRUE`)
- `activated_at` = thời điểm device được kích hoạt
- `revoked_at` = thời điểm device bị gỡ bỏ (NULL nếu còn active)
- `is_active = FALSE` khi `revoked_at IS NOT NULL`
- Unique constraint: `(licence_id, device_id)` WHERE `is_active = TRUE`

---

## 5. BUSINESS RULES

### 5.1. Rule 1: Tạo Trial Licence Info

**Khi nào:** User bắt đầu trial (tạo `student_trial_profile`).

**Flow:**
1. Tạo `licence_info`:
   - `user_id` = user hiện tại
   - `type` = TRIAL
   - `status` = TRIAL_ACTIVE
   - `started_at` = now
   - `expires_at` = now + 7 days
   - `plan_type` = NULL
   - `parent_account_id` = NULL
   - `max_devices` = NULL (không giới hạn trong trial)

**Validation:**
- User chưa có `licence_info` với `type = TRIAL` và `status = TRIAL_ACTIVE`

### 5.2. Rule 2: Trial Hết Hạn

**Khi nào:** `licence_info.expires_at < now` và `type = TRIAL`.

**Flow:**
1. Update `licence_info`:
   - `status` = TRIAL_EXPIRED
2. Update `student_trial_profile`:
   - `trial_status` = EXPIRED

**Impact:**
- User không thể dùng trial nữa
- User có thể mua licence để tiếp tục

### 5.3. Rule 3: Mua Licence

**Khi nào:** Parent mua licence cho student (sau khi trial hết hạn hoặc trong trial).

**Flow:**
1. Tạo `licence_info` mới:
   - `user_id` = student user
   - `type` = LICENCE
   - `status` = LICENCE_ACTIVE
   - `started_at` = now
   - `expires_at` = now + duration (1 tháng/6 tháng/12 tháng)
   - `plan_type` = MONTH_1 | MONTH_6 | YEAR_1
   - `parent_account_id` = parent account
   - `max_devices` = 3
2. Update `student_trial_profile` (nếu có):
   - `trial_status` = CONSUMED
   - `consumed_at` = now
   - `linked_account_id` = parent account
3. Merge practice data từ `trial_id` sang `student_id` (nếu chưa merge)

**Validation:**
- User phải có `student_profile` (đã link với parent)
- Parent account phải tồn tại
- Payment phải thành công (nếu có payment gateway)

### 5.4. Rule 4: Activate Device Cho Licence

**Khi nào:** User login trên device mới khi có licence và gọi API `/api/v1/student/check`.

**Flow:**
1. API `/api/v1/student/check` tự động kiểm tra:
   - User có `licence_info` với `status = LICENCE_ACTIVE`?
   - `expires_at >= now` (licence chưa hết hạn)
2. Nếu có licence ACTIVE:
   - Kiểm tra device chưa có trong `license_device` với `is_active = TRUE`?
   - Nếu chưa có:
     - Tự động tạo `license_device`:
       - `licence_id` = `licence_info.id`
       - `device_id` = device hiện tại
       - `activated_at` = now
       - `revoked_at` = NULL
       - `is_active` = TRUE
   - Trả về trạng thái: `LICENCE_ACTIVE`

**Validation:**
- User phải có licence ACTIVE
- Device chưa được activate

**Lưu ý:**
- Logic này được xử lý tự động bởi API `/api/v1/student/check`
- Tương tự như trial, device được tự động add vào `license_device` khi check
- **Phase 1:** Chưa kiểm tra số lượng device. Device limit sẽ được enforce ở phase sau.

### 5.5. Rule 5: Revoke Device

**Khi nào:** User muốn gỡ bỏ device khỏi licence (để activate device mới).

**Flow:**
1. Check: Device có trong `license_device` với `is_active = TRUE`?
2. Nếu có:
   - Update `license_device`:
     - `revoked_at` = now
     - `is_active` = FALSE

**Validation:**
- Device phải đang active
- User phải có quyền revoke (chủ của licence)

**Impact:**
- Device không thể dùng licence nữa
- User có thể activate device khác (nếu chưa đủ 3 devices)

### 5.6. Rule 6: Licence Hết Hạn

**Khi nào:** `licence_info.expires_at < now` và `type = LICENCE`.

**Flow:**
1. Update `licence_info`:
   - `status` = LICENCE_EXPIRED
2. Update tất cả `license_device`:
   - `revoked_at` = now (nếu chưa)
   - `is_active` = FALSE

**Impact:**
- User không thể dùng licence nữa
- Tất cả devices bị revoke
- User có thể mua licence mới

### 5.7. Rule 7: Auto Revoke Device Lâu Không Dùng

**Khi nào:** Device không được sử dụng trong X ngày (tùy chọn, có thể implement sau).

**Flow:**
1. Check: `license_device.activated_at < now - X days` và `is_active = TRUE`
2. Nếu có:
   - Auto revoke device (như Rule 5)

**Lưu ý:**
- Rule này có thể implement sau (Phase 2)
- Cần xác định X ngày (ví dụ: 30 ngày)

---

## 6. SCENARIOS & EXAMPLES

### 6.1. Scenario 1: Trial → Licence

**Timeline:**
- Day 1: User A bắt đầu trial
  - `licence_info`: `type = TRIAL`, `status = TRIAL_ACTIVE`, `expires_at = Day 8`
- Day 8: Trial hết hạn
  - `licence_info`: `status = TRIAL_EXPIRED`
- Day 10: Parent mua licence 1 tháng cho User A
  - `licence_info` mới: `type = LICENCE`, `status = LICENCE_ACTIVE`, `expires_at = Day 40`

**Result:**
- User A có licence 1 tháng (Day 10 → Day 40)
- Trial đã được mark CONSUMED

### 6.2. Scenario 2: Activate 3 Devices

**Timeline:**
- Day 1: User A có licence ACTIVE
- Day 2: User A login trên Device X → Activate Device X
- Day 3: User A login trên Device Y → Activate Device Y
- Day 4: User A login trên Device Z → Activate Device Z
- Day 5: User A login trên Device W → **REJECT** (đã đủ 3 devices)

**Result:**
- User A có 3 devices active: X, Y, Z
- Device W không thể activate (phải revoke 1 device cũ)

### 6.3. Scenario 3: Revoke Device Để Activate Device Mới

**Timeline:**
- Day 1: User A có 3 devices active: X, Y, Z
- Day 10: User A revoke Device X
  - `license_device` cho Device X: `revoked_at = Day 10`, `is_active = FALSE`
- Day 11: User A login trên Device W → Activate Device W

**Result:**
- User A có 3 devices active: Y, Z, W
- Device X không thể dùng licence nữa

### 6.4. Scenario 4: Licence Hết Hạn

**Timeline:**
- Day 1: User A có licence 1 tháng (`expires_at = Day 31`)
- Day 31: Licence hết hạn
  - `licence_info`: `status = LICENCE_EXPIRED`
  - Tất cả `license_device`: `revoked_at = Day 31`, `is_active = FALSE`

**Result:**
- User A không thể dùng licence nữa
- Tất cả devices bị revoke
- User A có thể mua licence mới

---

## 7. CONSTRAINTS & VALIDATIONS

### 7.1. Database Constraints

- **Unique constraint:** `(licence_id, device_id)` WHERE `is_active = TRUE` trong `license_device`
- **Foreign key:** `license_device.licence_id` → `licence_info.id`
- **Check constraint:** `max_devices >= COUNT(license_device WHERE is_active = TRUE)`

### 7.2. Business Validations

- User chỉ có 1 licence ACTIVE tại một thời điểm
- Số lượng devices active <= 3
- Device chỉ có thể activate 1 lần cho cùng 1 licence
- Licence phải ACTIVE để activate device

---

## 8. RELATIONSHIP VỚI TRIAL

### 8.1. Trial → Licence Transition

**Flow:**
1. User có trial (`licence_info.type = TRIAL`)
2. Trial hết hạn (`licence_info.status = TRIAL_EXPIRED`)
3. Parent mua licence → Tạo `licence_info` mới (`type = LICENCE`)
4. Mark trial CONSUMED (`student_trial_profile.trial_status = CONSUMED`)

**Lưu ý:**
- Trial và Licence là 2 `licence_info` records riêng biệt (history)
- Practice data được merge từ `trial_id` sang `student_id` khi parent linking

### 8.2. Practice Data Reference

**Trong Trial:**
- Practice data gắn với `student_trial_profile.id` (FK: `trial_id`)

**Trong Licence:**
- Practice data gắn với `student_profile.id` (FK: `student_id`)
- Practice data từ trial được merge sang student khi parent linking

---

## 9. QUYẾT ĐỊNH THIẾT KẾ

- **Decision 1**: Licence gắn với user, không phụ thuộc device
  - **Reason**: User có thể dùng licence trên nhiều devices
- **Decision 2**: Giới hạn 3 devices active đồng thời
  - **Reason**: Chống abuse, quản lý tài nguyên
- **Decision 3**: Tách `licence_info` và `license_device`
  - **Reason**: Tách biệt lifecycle (licence) và device tracking
- **Decision 4**: Lưu history của trial và licence
  - **Reason**: Dễ audit, track lịch sử mua licence

---

## 10. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Trial & Device Management](trial-and-device.md)
  - [Parent Linking](../student/parent-linking.md)
  - [Student Onboarding](../student/onboarding.md)

---

## 11. GHI CHÚ / TODO

- [ ] Xác nhận logic với team
- [ ] Review database schema
- [ ] Update API specifications
- [ ] Write test cases
- [ ] Implement auto revoke device (Phase 2)
- [ ] Payment gateway integration (Phase 2)

---

[← Quay lại Overview](README.md)

