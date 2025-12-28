# Trial & Device Management

**Project:** Tutor  
**Document type:** Product Requirements / Business Logic  
**Audience:** Product | Developer | Tech  
**Status:** Draft  
**Version:** 2025-01-27  
**Author:** AI Assistant

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả chi tiết logic quản lý **Trial (dùng thử 7 ngày)** và **Device Tracking (chống abuse)** trong hệ thống Tutor.

---

## 2. PHẠM VI

### 2.1. Trong phạm vi
- Trial logic: 7 ngày dùng thử, 1 user = 1 trial, 1 device = 1 trial lifetime
- Device tracking: Chống abuse, quản lý device CONSUMED
- Multi-device support: User có thể dùng trial trên nhiều devices
- Business rules và constraints

### 2.2. Ngoài phạm vi
- Licence management (xem [Licence Management](licence.md))
- Payment processing
- User authentication (xem [Student Onboarding](../student/onboarding.md))

---

## 3. ĐỊNH NGHĨA / THUẬT NGỮ

| Thuật ngữ | Giải thích |
|-----------|-----------|
| **Trial** | Giai đoạn dùng thử 7 ngày miễn phí |
| **Device CONSUMED** | Device đã từng trial và hết hạn, không thể trial lại |
| **User EXPIRED** | User đã hết hạn trial (7 ngày) |
| **student_trial_profile** | Entity lưu profile và thời gian trial gốc của user |
| **trial_device** | Entity quản lý device trong trial (quan hệ 1:N với student_trial_profile) |

---

## 4. ENTITIES & SCHEMA

### 4.1. student_trial_profile

**Mục đích:** Lưu profile và thời gian trial gốc của user.

```sql
student_trial_profile
---------------------
id                  UUID PRIMARY KEY
user_id             UUID NOT NULL          -- User chủ của trial
grade               INT NOT NULL            -- 6 hoặc 7
learning_goals      JSON                    -- Mục tiêu học tập
trial_started_at    TIMESTAMP NOT NULL      -- Thời gian bắt đầu trial gốc
expires_at          TIMESTAMP NOT NULL      -- Thời gian hết hạn trial gốc
trial_status        VARCHAR(20) NOT NULL     -- ACTIVE | EXPIRED | CONSUMED
consumed_at         TIMESTAMP               -- Khi parent linking thành công
linked_account_id   UUID                    -- FK to parent_account

INDEX idx_trial_user_id (user_id)
INDEX idx_trial_status (trial_status)
INDEX idx_trial_expires_at (expires_at)
```

**Business Rules:**
- 1 user chỉ có 1 `student_trial_profile` ACTIVE
- `trial_started_at` và `expires_at` là thời gian gốc, tất cả devices dùng chung
- `trial_status = EXPIRED` khi `expires_at < now`
- `trial_status = CONSUMED` khi parent linking thành công

### 4.2. trial_device

**Mục đích:** Quản lý device trong trial (quan hệ 1:N với `student_trial_profile`).

```sql
trial_device
------------
id                  UUID PRIMARY KEY
user_id             UUID NOT NULL          -- FK to student_trial_profile(user_id)
device_id           VARCHAR(255) NOT NULL   -- FK to device (hoặc VARCHAR nếu dùng device_uid)
trial_started_at    TIMESTAMP NOT NULL      -- = student_trial_profile.trial_started_at
trial_expires_at    TIMESTAMP NOT NULL      -- = student_trial_profile.expires_at
status              VARCHAR(20) NOT NULL     -- ACTIVE | CONSUMED
consumed_at         TIMESTAMP               -- Khi device bị mark CONSUMED

INDEX idx_trial_device_device_id (device_id)
INDEX idx_trial_device_user_id (user_id)
INDEX idx_trial_device_expires_at (trial_expires_at)
INDEX idx_trial_device_status (status)
```

**Business Rules:**
- `trial_device.user_id` phải = `student_trial_profile.user_id` (foreign key constraint)
- `trial_device.trial_started_at` = `student_trial_profile.trial_started_at` (tất cả devices dùng cùng thời gian bắt đầu)
- `trial_device.trial_expires_at` = `student_trial_profile.expires_at` (tất cả devices dùng cùng thời gian hết hạn)
- `status = CONSUMED` khi `trial_expires_at < now` (device đã hết hạn)
- **Lưu ý:** Schema hiện tại không có `trial_id` column. Quan hệ với `student_trial_profile` được thực hiện qua `user_id` (vì 1 user chỉ có 1 trial profile)

---

## 5. BUSINESS RULES

### 5.1. Rule 1: Tạo Trial

**Khi nào:** User đã chọn grade và learning goals, gọi API `/api/v1/student/trial/create`.

**Flow:**
1. Validation: User chưa có `student_trial_profile` ACTIVE?
2. Validation: Device chưa có `trial_device` với `trial_expires_at < now` (chưa CONSUMED - kiểm tra bất kỳ user nào)?
3. Nếu cả 2 đều OK:
   - Tạo `student_trial_profile`:
     - `user_id` = user hiện tại
     - `grade` = grade user chọn
     - `learning_goals` = learning goals user chọn
     - `trial_started_at` = now
     - `expires_at` = now + 7 days
     - `trial_status` = ACTIVE
   - Tạo `trial_device`:
     - `user_id` = `student_trial_profile.user_id`
     - `device_id` = device hiện tại
     - `trial_started_at` = `student_trial_profile.trial_started_at`
     - `trial_expires_at` = `student_trial_profile.expires_at`
     - `status` = ACTIVE

**Validation:**
- User phải login (có `user_id`)
- Device phải có `device_id` (bắt buộc)
- User chưa có trial ACTIVE
- Device chưa CONSUMED (kiểm tra tất cả user, bao gồm cả user hiện tại và user khác)

**Lưu ý:**
- API này chỉ tạo trial, không kiểm tra logic phức tạp
- Logic kiểm tra trạng thái được xử lý bởi API `/api/v1/student/check`

### 5.2. Rule 2: User Login Trên Device Mới

**Khi nào:** User đã có trial, login trên device khác và gọi API `/api/v1/student/check`.

**Flow:**
1. API `/api/v1/student/check` tự động kiểm tra:
   - User có `student_trial_profile` với `trial_status = ACTIVE`?
   - Device chưa có `trial_device` với `trial_expires_at < now` (chưa CONSUMED - kiểm tra tất cả user)?
2. Nếu device đã CONSUMED (bất kỳ user nào, bao gồm cả user hiện tại):
   - Trả về trạng thái: `TRIAL_ACTIVE_DEVICE_CONSUMED`
3. Nếu device chưa CONSUMED và user chưa có `trial_device` cho device này:
   - Tự động tạo `trial_device` mới:
     - `user_id` = `student_trial_profile.user_id`
     - `device_id` = device hiện tại
     - `trial_started_at` = `student_trial_profile.trial_started_at` (không phải now)
     - `trial_expires_at` = `student_trial_profile.expires_at` (không phải now + 7 days)
     - `status` = ACTIVE
   - Trả về trạng thái: `TRIAL_ACTIVE`

**Validation:**
- User phải có trial ACTIVE
- Device chưa CONSUMED (kiểm tra tất cả user, bao gồm cả user hiện tại và user khác)

**Lưu ý:**
- User có thể dùng trial trên nhiều devices
- Tất cả devices dùng chung thời gian trial (từ `student_trial_profile`)
- Device login sau vẫn có đủ 7 ngày (từ thời điểm bắt đầu trial gốc)
- Logic này được xử lý tự động bởi API `/api/v1/student/check`

### 5.3. Rule 3: User Khác Login Trên Device Đã Trial

**Khi nào:** User B login trên Device X (User A đã trial trên Device X).

**Flow:**
1. Check: User B chưa có `student_trial_profile` ACTIVE?
2. Check: Device X chưa có `trial_device` với `trial_expires_at < now` (chưa CONSUMED - kiểm tra tất cả user)?
3. Nếu cả 2 đều OK:
   - Tạo `student_trial_profile` mới cho User B
   - Tạo `trial_device` mới:
     - `user_id` = User B
     - `device_id` = Device X
     - `trial_started_at` = now
     - `trial_expires_at` = now + 7 days
     - `status` = ACTIVE

**Validation:**
- User B chưa có trial
- Device X chưa CONSUMED (kiểm tra tất cả user, bao gồm cả user hiện tại và user khác)

**Lưu ý:**
- Nhiều users có thể trial trên cùng 1 device (nếu device chưa CONSUMED)
- Mỗi user có trial riêng (7 ngày riêng)

### 5.4. Rule 4: Device CONSUMED

**Khi nào:** Device đã từng trial và hết hạn (bất kỳ user nào).

**Logic:**
- Check: `SELECT * FROM trial_device WHERE device_id = X AND trial_expires_at < now`
- Nếu có bất kỳ record nào (bất kỳ user nào, bao gồm cả user hiện tại và user khác) → Device CONSUMED

**Impact:**
- User đang trial **không thể login** trên device đã CONSUMED
- User phải dùng **device khác** nếu device hiện tại đã CONSUMED
- Device CONSUMED **không thể trial lại** (dù user nào)

**Update Status:**
- Khi check và phát hiện `trial_expires_at < now`:
  - Update `trial_device.status = CONSUMED`
  - Update `trial_device.consumed_at = now`

**Lưu ý:**
- Logic kiểm tra device CONSUMED được merge với Rule 2 và Rule 3
- Device CONSUMED được kiểm tra cho tất cả user (bao gồm cả user hiện tại và user khác)

### 5.5. Rule 5: User EXPIRED

**Khi nào:** User đã hết hạn trial (7 ngày).

**Logic:**
- Check: `student_trial_profile.expires_at < now`
- Nếu hết hạn → `student_trial_profile.trial_status = EXPIRED`

**Impact:**
- Tất cả `trial_device` liên quan cũng hết hạn (vì `trial_expires_at = student_trial_profile.expires_at`)
- User không thể dùng trial nữa
- User có thể mua licence để tiếp tục

**Update Status:**
- Khi gọi API `/api/v1/student/check` và phát hiện `expires_at < now`:
  - Update `student_trial_profile.trial_status = EXPIRED`
  - Update tất cả `trial_device.status = CONSUMED` (nếu chưa)

### 5.6. Rule 6: API `/api/v1/student/check` - Kiểm Tra Trạng Thái Tổng Hợp

**Khi nào:** User login thành công, gọi API để kiểm tra trạng thái hiện tại.

**Mục đích:** API này tập trung toàn bộ logic kiểm tra trạng thái trial và licence, trả về 1 trong 6 trạng thái:

#### Trạng thái 1: Chưa trial (NO_TRIAL)
- **Điều kiện:** User chưa có `student_trial_profile`
- **Response:**
  - `status`: "NO_TRIAL"
  - `daysRemaining`: null
  - `daysExpired`: null
  - `expiresAt`: null
  - `message`: null
- **Frontend xử lý:** Navigate đến trang chọn grade + learning goals (gộp 1 màn hình)

#### Trạng thái 2: Đang trial nhưng device CONSUMED (TRIAL_ACTIVE_DEVICE_CONSUMED)
- **Điều kiện:** 
  - User có `student_trial_profile` với `trial_status = ACTIVE`
  - `expires_at >= now` (trial chưa hết hạn)
  - Device có `trial_device` với `trial_expires_at < now` (device đã CONSUMED - bất kỳ user nào, bao gồm cả user hiện tại và user khác)
- **Response:**
  - `status`: "TRIAL_ACTIVE_DEVICE_CONSUMED"
  - `daysRemaining`: Số ngày còn lại của trial
  - `daysExpired`: null
  - `expiresAt`: Thời điểm hết hạn trial
  - `message`: "Tài khoản của bạn vẫn còn hiệu lực dùng thử X ngày đến Y nhưng thiết bị này đã sử dụng hết lượt dùng thử. Vui lòng truy cập trên thiết bị khác để tiếp tục"
- **Frontend xử lý:** Hiển thị dialog với message và button OK → về đăng nhập

#### Trạng thái 3: Đang trial được phép (TRIAL_ACTIVE)
- **Điều kiện:**
  - User có `student_trial_profile` với `trial_status = ACTIVE`
  - `expires_at >= now` (trial chưa hết hạn)
  - Device chưa có `trial_device` cho user này → Tự động tạo `trial_device` mới
- **Response:**
  - `status`: "TRIAL_ACTIVE"
  - `daysRemaining`: Số ngày còn lại của trial
  - `daysExpired`: null
  - `expiresAt`: Thời điểm hết hạn trial
  - `message`: null
- **Frontend xử lý:** Navigate đến trang học tập + hiển thị snackbar nhắc nhở: "Số ngày dùng thử còn lại X ngày. Thời điểm kết thúc Y"

#### Trạng thái 4: Đang trong licence (LICENCE_ACTIVE)
- **Điều kiện:**
  - User có `licence_info` với `status = LICENCE_ACTIVE`
  - `expires_at >= now` (licence chưa hết hạn)
  - Device chưa có trong `license_device` → Tự động add device vào `license_device`
  - **Lưu ý:** Phase 1 chưa kiểm tra số lượng device. Device limit sẽ được enforce ở phase sau.
- **Response:**
  - `status`: "LICENCE_ACTIVE"
  - `daysRemaining`: Số ngày còn lại của licence
  - `daysExpired`: null
  - `expiresAt`: Thời điểm hết hạn licence
  - `message`: null
- **Frontend xử lý:** Navigate đến trang học tập + snackbar nếu < 7 ngày: "Tài khoản của bạn sắp hết hiệu lực (X ngày). Thời điểm kết thúc Y"

#### Trạng thái 5: Đã có licence nhưng hết hạn (LICENCE_EXPIRED)
- **Điều kiện:**
  - User không có `licence_info` ACTIVE
  - Tìm `licence_info` gần nhất theo `expires_at DESC` → Tìm thấy
- **Response:**
  - `status`: "LICENCE_EXPIRED"
  - `daysRemaining`: null
  - `daysExpired`: Số ngày đã hết hạn
  - `expiresAt`: Thời điểm hết hạn cuối cùng
  - `message`: "Tài khoản của bạn đã hết hiệu lực X ngày trước tại thời điểm Y. Vui lòng gia hạn tài khoản để tiếp tục sử dụng"
- **Frontend xử lý:** Hiển thị dialog với message và button OK → về đăng nhập

#### Trạng thái 6: Đã hết trial nhưng chưa có licence (TRIAL_EXPIRED_NO_LICENCE)
- **Điều kiện:**
  - User có `student_trial_profile` với `expires_at < now` (trial đã hết hạn)
  - Update `trial_status = EXPIRED` và tất cả `trial_device.status = CONSUMED`
  - User không có `licence_info` nào (chưa từng mua licence)
- **Response:**
  - `status`: "TRIAL_EXPIRED_NO_LICENCE"
  - `daysRemaining`: null
  - `daysExpired`: Số ngày đã hết hạn trial
  - `expiresAt`: Thời điểm hết hạn trial
  - `message`: "Tài khoản dùng thử của bạn đã hết hiệu lực X ngày trước tại thời điểm Y. Vui lòng đăng ký gói cước để tiếp tục sử dụng"
- **Frontend xử lý:** Hiển thị dialog với message và button OK → về đăng nhập

**Flow xử lý trong API:**
1. Kiểm tra user có `student_trial_profile` chưa?
   - Nếu chưa → Trả về NO_TRIAL
   - Nếu có → Chuyển bước 2
2. Kiểm tra thời hạn trial còn không?
   - Nếu chưa hết (`expires_at >= now`):
     - Kiểm tra device có bị CONSUMED không? (kiểm tra tất cả user, bao gồm cả user hiện tại và user khác)
       - Nếu có → Trả về TRIAL_ACTIVE_DEVICE_CONSUMED
       - Nếu không:
         - Kiểm tra device đã có `trial_device` cho user này chưa?
           - Nếu chưa → Tự động tạo `trial_device` mới
         - Trả về TRIAL_ACTIVE
   - Nếu đã hết (`expires_at < now`):
     - Update `trial_status = EXPIRED` và tất cả `trial_device.status = CONSUMED`
     - Kiểm tra user có `licence_info` ACTIVE không?
       - Nếu có → Trả về LICENCE_ACTIVE (tự động add device nếu chưa có, không kiểm tra số lượng device - phase 1)
       - Nếu không:
         - Tìm `licence_info` gần nhất theo `expires_at DESC`
           - Nếu tìm thấy → Trả về LICENCE_EXPIRED
           - Nếu không tìm thấy → Trả về TRIAL_EXPIRED_NO_LICENCE

---

## 6. SCENARIOS & EXAMPLES

### 6.1. Scenario 1: User Mới Bắt Đầu Trial

**Timeline:**
- Day 1: User A login trên Device X → Tạo trial
  - `student_trial_profile`: `trial_started_at = Day 1`, `expires_at = Day 8`
  - `trial_device`: `trial_started_at = Day 1`, `trial_expires_at = Day 8`

**Result:**
- User A có trial 7 ngày (Day 1 → Day 8)
- Device X được gắn với trial của User A

### 6.2. Scenario 2: User Login Trên Device Mới

**Timeline:**
- Day 1: User A trial trên Device X
- Day 3: User A login trên Device Y → Tạo `trial_device` mới
  - `trial_device` cho Device Y: `trial_started_at = Day 1`, `trial_expires_at = Day 8`

**Result:**
- User A có thể dùng trial trên cả Device X và Device Y
- Cả 2 devices dùng chung thời gian trial (Day 1 → Day 8)
- Device Y vẫn có đủ 7 ngày (từ Day 1, không phải Day 3)

### 6.3. Scenario 3: User Khác Login Trên Device Đã Trial

**Timeline:**
- Day 1: User A trial trên Device X (`expires_at = Day 8`)
- Day 5: User B login trên Device X → Tạo trial mới cho User B
  - `student_trial_profile` cho User B: `trial_started_at = Day 5`, `expires_at = Day 12`
  - `trial_device` cho User B: `trial_started_at = Day 5`, `trial_expires_at = Day 12`

**Result:**
- User A và User B đều có trial riêng trên Device X
- User A: Day 1 → Day 8
- User B: Day 5 → Day 12

### 6.4. Scenario 4: Device CONSUMED

**Timeline:**
- Day 1: User A trial trên Device X (`expires_at = Day 8`)
- Day 8: Trial hết hạn → Device X CONSUMED
- Day 10: User A (vẫn còn trial nếu chưa hết) hoặc User B login trên Device X → **REJECT**

**Result:**
- Device X không thể trial lại (dù user nào)
- User phải dùng device khác

### 6.5. Scenario 5: User EXPIRED

**Timeline:**
- Day 1: User A trial trên Device X và Device Y (`expires_at = Day 8`)
- Day 8: Trial hết hạn → User A EXPIRED
  - `student_trial_profile.trial_status = EXPIRED`
  - Tất cả `trial_device.status = CONSUMED`

**Result:**
- User A không thể dùng trial nữa
- User A có thể mua licence để tiếp tục

---

## 7. CONSTRAINTS & VALIDATIONS

### 7.1. Database Constraints

- **Foreign key:** `trial_device.user_id` → `student_trial_profile(user_id)` (vì 1 user chỉ có 1 trial profile)
- **Foreign key:** `trial_device.device_id` → `device(device_id)`
- **Data integrity:** `trial_device.user_id` = `student_trial_profile.user_id`
- **Time constraints:** 
  - `trial_device.trial_started_at` = `student_trial_profile.trial_started_at`
  - `trial_device.trial_expires_at` = `student_trial_profile.expires_at`

### 7.2. Business Validations

- User phải login trước khi trial (không còn anonymous trial)
- Device phải có `device_id` (bắt buộc)
- User chỉ có 1 trial ACTIVE tại một thời điểm
- Device CONSUMED không thể trial lại
- Thời gian trial: 7 ngày (không thay đổi)

---

## 8. PRACTICE DATA REFERENCE

**Current Implementation:**
- Practice data (`practice`, `practice_session`, `progress_summary`) gắn với `student_trial_profile.id` (FK: `trial_id`)

**Logic:**
- Trong trial: Practice data gắn với `student_trial_profile.id` (thông qua FK `trial_id`)
- Sau khi có `student_profile`: Practice data có thể gắn với `student_id` (khi parent linking)

**Lưu ý:**
- FK `trial_id` trong practice data vẫn tham chiếu đến `student_trial_profile.id`
- Không liên quan đến việc `trial_device` không có `trial_id` column

---

## 9. QUYẾT ĐỊNH THIẾT KẾ

- **Decision 1**: Trial theo user, không theo device
  - **Reason**: UX tốt hơn, user có thể dùng trial trên nhiều devices
- **Decision 2**: Device CONSUMED khi hết hạn (bất kỳ user nào)
  - **Reason**: Chống abuse, 1 device chỉ trial 1 lần lifetime
- **Decision 3**: Tách `student_trial_profile` và `trial_device`
  - **Reason**: Tách biệt profile (grade, learning_goals) và device tracking
- **Decision 4**: Bỏ hoàn toàn `anonymous_id`
  - **Reason**: User phải login trước khi trial, không còn anonymous trial
- **Decision 5**: Tất cả devices dùng chung thời gian trial
  - **Reason**: Đơn giản hóa logic, tránh confusion về thời gian

---

## 10. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Licence Management](licence.md)
  - [Student Onboarding](../student/onboarding.md)
  - [Parent Linking](../student/parent-linking.md)

---

## 11. GHI CHÚ / TODO

- [ ] Xác nhận logic với team
- [ ] Review database schema
- [ ] Update API specifications
- [ ] Write test cases
- [ ] Migration plan từ `anonymous_id` sang `user_id`

---

[← Quay lại Overview](README.md)

