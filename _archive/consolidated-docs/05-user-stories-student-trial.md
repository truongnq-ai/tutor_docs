
================================================================================
# File: 03-for-product-owners/user-stories/README.md
================================================================================

# USER STORIES

Tài liệu này tổng hợp tất cả user stories cho hệ thống Tutor Phase 1 (MVP).

## Mục đích

Tài liệu này mô tả toàn bộ user stories dành cho:
- **Học sinh**: 15 user stories
- **Phụ huynh**: 12 user stories
- **Admin**: Exercise và Question management workflows

Làm cơ sở cho:
- Thiết kế UI/UX
- Chia task cho đội phát triển
- Viết test case và acceptance test

## Cấu trúc tài liệu

### Student User Stories
- [Onboarding & Thiết lập ban đầu](student/onboarding.md)
- [Lộ trình học hằng ngày](student/learning-path.md)
- [Giải bài Toán (Tutor Mode)](student/tutor-mode.md)
- [Luyện tập cá nhân hoá](student/practice.md)
- [Mini Test](student/mini-test.md)
- [Theo dõi tiến độ cá nhân](student/progress-tracking.md)
- [Liên kết phụ huynh](student/parent-linking.md)

Xem [Overview Student Stories](student/README.md) để biết chi tiết.

### Parent User Stories
- [Truy cập & Xác thực](parent/authentication.md)
- [Tổng quan học tập](parent/overview.md)
- [Đánh giá kết quả học tập](parent/assessment.md)
- [Điểm yếu & Gợi ý cải thiện](parent/weaknesses.md)
- [Báo cáo định kỳ](parent/reporting.md)
- [Quyền riêng tư & Bảo mật](parent/privacy.md)

Xem [Overview Parent Stories](parent/README.md) để biết chi tiết.

### Admin User Stories
- [Exercise và Question Management](admin/README.md)

### Trial & Licence Management
- [Trial & Licence Overview](trial-licence/README.md) - Logic quản lý trial và licence
- [Trial & Device Management](trial-licence/trial-and-device.md) - Logic trial, device tracking
- [Licence Management](trial-licence/licence.md) - Logic licence, lifecycle, multi-device

## QUY TẮC ƯU TIÊN

### Must-have (Phase 1)
- Tất cả Student User Stories (US-01 → US-15)
- Tất cả Parent User Stories (PU-01 → PU-12)

### Nice-to-have (Có thể lùi Phase 2)
- US-13, US-14 (Theo dõi tiến độ cá nhân - có thể đơn giản hóa)

## PHỤ THUỘC & LIÊN KẾT

- [Product Overview](../product-overview.md)
- [User Flows](../user-flows/README.md)
- [KPIs & Metrics](../kpis-metrics.md)

---

← Quay lại: [README.md](../../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/README.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/student/README.md
================================================================================

# Student User Stories

Tài liệu này mô tả tất cả user stories dành cho học sinh trong hệ thống Tutor Phase 1 (MVP).

## Tổng quan

Học sinh có **15 user stories** được chia thành các nhóm chức năng:

1. **Onboarding & Thiết lập ban đầu** (2 stories)
   - [Chọn lớp học](onboarding.md#us-01-chọn-lớp-học)
   - [Chọn mục tiêu học tập](onboarding.md#us-02-chọn-mục-tiêu-học-tập)

2. **Lộ trình học hằng ngày** (2 stories)
   - [Xem gợi ý học tập trong ngày](learning-path.md#us-03-xem-gợi-ý-học-tập-trong-ngày)
   - [Theo dõi việc hoàn thành lộ trình ngày](learning-path.md#us-04-theo-dõi-việc-hoàn-thành-lộ-trình-ngày)

3. **Giải bài Toán (Tutor Mode)** (4 stories)
   - [Giải bài Toán bằng hình ảnh](tutor-mode.md#us-05-giải-bài-toán-bằng-hình-ảnh)
   - [Giải bài Toán bằng văn bản](tutor-mode.md#us-06-giải-bài-toán-bằng-văn-bản)
   - [Xem lời giải theo từng bước](tutor-mode.md#us-07-xem-lời-giải-theo-từng-bước)
   - [Nhận cảnh báo lỗi sai thường gặp](tutor-mode.md#us-08-nhận-cảnh-báo-lỗi-sai-thường-gặp)

4. **Luyện tập cá nhân hoá** (2 stories)
   - [Luyện tập tập trung vào skill yếu](practice.md#us-09-luyện-tập-tập-trung-vào-skill-yếu)
   - [Điều chỉnh độ khó bài tập](practice.md#us-10-điều-chỉnh-độ-khó-bài-tập)

5. **Mini Test** (2 stories)
   - [Làm mini test kiểm tra kiến thức](mini-test.md#us-11-làm-mini-test-kiểm-tra-kiến-thức)
   - [Xem kết quả mini test](mini-test.md#us-12-xem-kết-quả-mini-test)

6. **Theo dõi tiến độ cá nhân** (2 stories)
   - [Xem tiến độ học tập cá nhân](progress-tracking.md#us-13-xem-tiến-độ-học-tập-cá-nhân)
   - [Nhận gợi ý cải thiện học tập](progress-tracking.md#us-14-nhận-gợi-ý-cải-thiện-học-tập)

7. **Liên kết phụ huynh** (1 story)
   - [Liên kết phụ huynh bằng số điện thoại](parent-linking.md#us-15-liên-kết-phụ-huynh-bằng-số-điện-thoại)

## Tài liệu chi tiết

- [Onboarding & Thiết lập ban đầu](onboarding.md)
- [Lộ trình học hằng ngày](learning-path.md)
- [Giải bài Toán (Tutor Mode)](tutor-mode.md)
- [Luyện tập cá nhân hoá](practice.md)
- [Mini Test](mini-test.md)
- [Theo dõi tiến độ cá nhân](progress-tracking.md)
- [Liên kết phụ huynh](parent-linking.md)

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/student/README.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/student/onboarding.md
================================================================================

# Onboarding & Thiết lập ban đầu
[← Quay lại Overview](../README.md)

## US-01: Chọn lớp học

**User story**  
Là một học sinh, tôi muốn chọn lớp học của mình để ứng dụng dạy đúng chương trình Toán mà tôi đang học.

**Acceptance criteria**
- [ ] Cho phép chọn lớp 6 hoặc lớp 7
- [ ] Lưu thông tin lớp vào hồ sơ học sinh
- [ ] Không cho phép tự ý đổi lớp sau khi đã thiết lập (chỉ admin can thiệp)

## US-02: Chọn mục tiêu học tập

**User story**  
Là một học sinh, tôi muốn chọn mục tiêu học tập để ứng dụng xây dựng lộ trình học phù hợp cho tôi mỗi ngày.

**Acceptance criteria**
- [ ] Các mục tiêu bao gồm: Học theo chương, Củng cố kiến thức còn yếu, Ôn tập cho bài kiểm tra
- [ ] Mục tiêu học tập ảnh hưởng trực tiếp đến lộ trình học hằng ngày

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/student/onboarding.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/student/learning-path.md
================================================================================

# Lộ trình học hằng ngày
[← Quay lại Overview](../README.md)

## US-03: Xem gợi ý học tập trong ngày

**User story**  
Là một học sinh, tôi muốn biết hôm nay mình nên học những nội dung gì để không học lan man, mất định hướng.

**Acceptance criteria**
- [ ] Hiển thị 1–2 skill trọng tâm trong ngày
- [ ] Tổng số bài luyện tập: 5–10 bài
- [ ] Thời lượng học gợi ý: 15–30 phút

## US-04: Theo dõi việc hoàn thành lộ trình ngày

**User story**  
Là một học sinh, tôi muốn biết mình đã hoàn thành bao nhiêu phần trong lộ trình học hôm nay.

**Acceptance criteria**
- [ ] Đánh dấu các bài đã hoàn thành
- [ ] Hiển thị phần trăm tiến độ trong ngày
- [ ] Cho phép tạm dừng và tiếp tục học sau

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/student/learning-path.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/student/practice.md
================================================================================

# Luyện tập cá nhân hoá
[← Quay lại Overview](../README.md)

## US-09: Luyện tập tập trung vào skill yếu

**User story**  
Là một học sinh, tôi muốn được luyện tập nhiều hơn vào những skill mà tôi đang yếu.

**Acceptance criteria**
- [ ] Xác định skill yếu dựa trên mastery (< 70)
- [ ] Sinh bài tập cùng dạng với skill yếu
- [ ] Thay đổi dữ liệu bài toán, không lặp lại đề cũ

## US-10: Điều chỉnh độ khó bài tập

**User story**  
Là một học sinh, tôi muốn độ khó bài tập được điều chỉnh phù hợp với khả năng của mình.

**Acceptance criteria**
- [ ] Làm đúng ≥ 5 bài liên tiếp → tăng độ khó
- [ ] Làm sai ≥ 2 bài liên tiếp → giảm độ khó

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/student/practice.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/student/mini-test.md
================================================================================

# Mini Test
[← Quay lại Overview](../README.md)

## US-11: Làm mini test kiểm tra kiến thức

**User story**  
Là một học sinh, tôi muốn làm mini test để kiểm tra xem mình đã thực sự hiểu bài hay chưa.

**Acceptance criteria**
- [ ] Mini test gồm 5–7 câu hỏi
- [ ] Trộn skill chính và skill prerequisite
- [ ] Có giới hạn thời gian làm bài

## US-12: Xem kết quả mini test

**User story**  
Là một học sinh, tôi muốn xem kết quả mini test để biết mình đang mạnh hay yếu ở phần nào.

**Acceptance criteria**
- [ ] Hiển thị điểm số theo %
- [ ] Chỉ rõ các skill làm sai
- [ ] Đề xuất nội dung luyện tập tiếp theo

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/student/mini-test.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/student/tutor-mode.md
================================================================================

# Giải bài Toán (Tutor Mode)
[← Quay lại Overview](../README.md)

## US-05: Giải bài Toán bằng hình ảnh

**User story**  
Là một học sinh, tôi muốn chụp ảnh đề Toán để được hướng dẫn cách giải chi tiết.

**Acceptance criteria**
- [ ] Cho phép chụp ảnh hoặc chọn ảnh từ thư viện
- [ ] Sử dụng OCR để nhận dạng đề bài
- [ ] Nếu OCR không chắc chắn, yêu cầu học sinh xác nhận lại đề bài

## US-06: Giải bài Toán bằng văn bản

**User story**  
Là một học sinh, tôi muốn nhập đề Toán bằng văn bản để giải những bài đơn giản.

**Acceptance criteria**
- [ ] Hỗ trợ nhập các ký hiệu Toán học cơ bản
- [ ] Kiểm tra và xác thực nội dung trước khi gửi xử lý

## US-07: Xem lời giải theo từng bước

**User story**  
Là một học sinh, tôi muốn xem lời giải từng bước một để hiểu cách làm bài, thay vì chỉ chép đáp án.

**Acceptance criteria**
- [ ] Chỉ hiển thị một bước giải tại một thời điểm
- [ ] Có nút "Xem bước tiếp theo"
- [ ] Mỗi bước có giải thích ngắn gọn, dễ hiểu

## US-08: Nhận cảnh báo lỗi sai thường gặp

**User story**  
Là một học sinh, tôi muốn biết những lỗi sai thường gặp để tránh lặp lại trong các bài sau.

**Acceptance criteria**
- [ ] Hiển thị mục "Lưu ý" trong lời giải
- [ ] Gắn lỗi sai với skill tương ứng

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/student/tutor-mode.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/student/progress-tracking.md
================================================================================

# Theo dõi tiến độ cá nhân
[← Quay lại Overview](../README.md)

## US-13: Xem tiến độ học tập cá nhân

**User story**  
Là một học sinh, tôi muốn xem tiến độ học tập của mình để có thêm động lực học.

**Acceptance criteria**
- [ ] Hiển thị số ngày học liên tiếp
- [ ] Hiển thị tổng số bài đã làm
- [ ] Hiển thị mastery theo từng skill

## US-14: Nhận gợi ý cải thiện học tập

**User story**  
Là một học sinh, tôi muốn nhận được các gợi ý học tập phù hợp để cải thiện điểm yếu của mình.

**Acceptance criteria**
- [ ] Gợi ý dựa trên dữ liệu học tập thực tế
- [ ] Ngôn ngữ gợi ý đơn giản, dễ hiểu

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/student/progress-tracking.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/student/parent-linking.md
================================================================================

# Liên kết phụ huynh
[← Quay lại Overview](../README.md)

## US-15: Liên kết phụ huynh bằng số điện thoại

**User story**  
Là một học sinh, tôi muốn liên kết tài khoản với phụ huynh bằng số điện thoại để tiếp tục sử dụng ứng dụng sau khi hết lượt dùng thử.

**Acceptance criteria**
- [ ] Nhập số điện thoại phụ huynh
- [ ] Gửi OTP qua SMS (qua Firebase Auth)
- [ ] Rate limiting: Tối đa 3 lần gửi OTP/ngày/số điện thoại
- [ ] OTP có thời hạn 5 phút
- [ ] Nếu phụ huynh chưa có tài khoản → Tự động tạo tài khoản
- [ ] Dữ liệu học tập trong thời gian dùng thử được giữ lại

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/student/parent-linking.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/trial-licence/README.md
================================================================================

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



================================================================================
# End of: 03-for-product-owners/user-stories/trial-licence/README.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/trial-licence/licence.md
================================================================================

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



================================================================================
# End of: 03-for-product-owners/user-stories/trial-licence/licence.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/trial-licence/trial-and-device.md
================================================================================

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



================================================================================
# End of: 03-for-product-owners/user-stories/trial-licence/trial-and-device.md
================================================================================
