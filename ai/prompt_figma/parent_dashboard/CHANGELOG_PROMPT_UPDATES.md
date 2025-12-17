# TỔNG HỢP CÁC THAY ĐỔI TRONG PARENT DASHBOARD PROMPTS

**Ngày cập nhật:** 2025-12-16  
**Phiên bản:** 2025-12-15-10-18 (Updated)

---

## MỤC ĐÍCH

Tài liệu này tổng hợp tất cả các thay đổi đã thực hiện trong các prompt Figma cho Parent Dashboard, đảm bảo đồng bộ với:
- Trial 7 ngày với đầy đủ tính năng
- Student linking flow (student-first và parent-first)
- Data preservation khi linking
- Refresh token flow
- Empty states và error handling

---

## 1. AUTHENTICATION PROMPTS (`authentication_prompts_phase_1-2025-12-15-10-18.md`)

### 1.1. Màn hình mới được thêm

#### SCREEN 10: DASHBOARD ACTIVATION
- **Mục đích:** Kích hoạt dashboard sau khi tài khoản được tạo tự động từ student linking
- **User story:** PU-01a (Auto-created account)
- **Tính năng:**
  - Form đặt mật khẩu mới
  - Hiển thị thông tin tài khoản (số điện thoại, email nếu có)
  - Info box về việc giữ lại dữ liệu học tập từ trial
  - Note về cách đăng nhập sau khi kích hoạt

### 1.2. Cập nhật NOTES

#### Refresh Token Flow
- **Thêm:** Hướng dẫn về refresh token flow
  - Sau khi login nhận cả `accessToken` và `refreshToken`
  - Khi `accessToken` hết hạn, gọi `/api/v1/auth/refresh_token`
  - Refresh token rotation (token cũ bị revoke)

#### Auto-created Account Flow
- **Thêm:** Hướng dẫn về flow khi tài khoản được tạo tự động
  - Phụ huynh nhận SMS với link kích hoạt
  - Link dẫn đến SCREEN 10 (Dashboard Activation)
  - Sau khi kích hoạt, có thể đăng nhập bằng số điện thoại và mật khẩu

---

## 2. DASHBOARD PROMPTS (`dashboard_prompts_phase_1-2025-12-15-10-18.md`)

### 2.1. Cập nhật SCREEN 1: DASHBOARD OVERVIEW

#### Student Status Badge
- **Thêm:** Badge hiển thị trạng thái liên kết
  - "Đã liên kết" (green) - nếu status = linked
  - "Chờ liên kết" (yellow) - nếu status = pending
  - Luôn hiển thị ở header

#### Empty State khi Status = Pending
- **Thêm:** Empty state khi học sinh chưa liên kết
  - Icon và title: "Chờ con liên kết"
  - Description: Hướng dẫn về việc con cần nhập mã liên kết
  - Hiển thị link token và QR code
  - Button "Xem lại mã liên kết"

#### Data Preservation Note
- **Thêm:** Info box về việc giữ lại dữ liệu trial
  - Chỉ hiển thị nếu vừa linking trong tuần này
  - Thông tin về số bài tập và skills đã học trong trial
  - Background màu xanh (#E3F2FD)

#### Conditional Display
- **Cập nhật:** Các elements chỉ hiển thị khi status = linked
  - Key metrics cards
  - Study activity chart
  - Quick actions

### 2.2. Cập nhật các screens khác

#### SCREEN 2: STUDY ACTIVITY DETAIL
- **Thêm:** Empty state khi chưa có data
- **Thêm:** Message về việc cần liên kết để bắt đầu học

#### SCREEN 3: WEAK SKILLS
- **Thêm:** Empty state khi chưa linked
- **Cập nhật:** Empty state khi không có điểm yếu

#### SCREEN 4: PROGRESS OVER TIME
- **Thêm:** Empty state khi chưa có đủ data
- **Thêm:** Message khuyến khích đợi thêm vài ngày

### 2.3. Cập nhật NOTES

#### Student Linking Status
- **Thêm:** Section về cách xử lý các trạng thái linking
  - Status = "Pending": Empty state với link token
  - Status = "Linked": Hiển thị đầy đủ dashboard
  - Status badge luôn hiển thị ở header

#### Data Preservation
- **Thêm:** Section về việc giữ lại dữ liệu trial
  - Hiển thị note khi vừa linking
  - Thông tin về số bài tập và skills trong trial
  - Note chỉ hiển thị trong tuần đầu tiên

#### Empty States
- **Thêm:** Hướng dẫn về các empty states
  - Status = pending: Empty state với link token
  - Chưa có đủ data: Message friendly, encouraging

#### Error States
- **Thêm:** Hướng dẫn về error handling
  - Hiển thị message rõ ràng nếu không load được data

---

## 3. REPORTING PROMPTS (`reporting_prompts_phase_1-2025-12-15-10-18.md`)

### 3.1. Cập nhật SCREEN 1: WEEKLY REPORT

#### Data Preservation Note
- **Thêm:** Info box về dữ liệu từ trial
  - Chỉ hiển thị nếu vừa linking trong tuần này
  - "📝 Bao gồm X bài tập từ thời gian dùng thử (7 ngày)"
  - "Dữ liệu học tập trong trial đã được giữ lại khi liên kết"
  - Background màu xanh (#E3F2FD)

#### Empty State
- **Thêm:** Empty state khi chưa có đủ data
  - Message friendly về việc đợi thêm vài ngày

### 3.2. Cập nhật SCREEN 2: MONTHLY REPORT

#### Empty State
- **Thêm:** Empty state khi chưa có đủ data
  - Message về việc đợi đến cuối tháng

### 3.3. Cập nhật SCREEN 3: RECOMMENDATIONS

#### Empty State
- **Thêm:** Empty state khi chưa có data
  - Message về việc cần liên kết để nhận gợi ý cá nhân hoá

### 3.4. Cập nhật NOTES

#### Data Preservation
- **Thêm:** Section về việc bao gồm dữ liệu trial trong báo cáo
  - Hiển thị note rõ ràng nếu có dữ liệu từ trial
  - Note chỉ hiển thị trong tuần/tháng đầu tiên sau khi linking

#### Empty States
- **Thêm:** Hướng dẫn về các empty states
  - Chưa có student linked: Message về việc cần liên kết
  - Chưa có đủ data: Message về việc đợi thêm

#### Error States
- **Thêm:** Hướng dẫn về error handling
  - Hiển thị message rõ ràng nếu không tạo được báo cáo

---

## TỔNG KẾT CÁC THAY ĐỔI

### Màn hình mới
1. **SCREEN 10: DASHBOARD ACTIVATION** (authentication_prompts)
   - Kích hoạt tài khoản được tạo tự động từ student linking

### Cập nhật màn hình hiện có
1. **SCREEN 1: DASHBOARD OVERVIEW** (dashboard_prompts)
   - Thêm student status badge
   - Thêm empty state khi pending
   - Thêm data preservation note
   - Conditional display các elements

2. **SCREEN 1: WEEKLY REPORT** (reporting_prompts)
   - Thêm data preservation note
   - Thêm empty state

3. **SCREEN 2: MONTHLY REPORT** (reporting_prompts)
   - Thêm empty state

4. **SCREEN 3: RECOMMENDATIONS** (reporting_prompts)
   - Thêm empty state

### Cập nhật NOTES
1. **authentication_prompts:**
   - Refresh Token Flow
   - Auto-created Account Flow

2. **dashboard_prompts:**
   - Student Linking Status
   - Data Preservation
   - Empty States
   - Error States

3. **reporting_prompts:**
   - Data Preservation
   - Empty States
   - Error States

---

## CÁC TÍNH NĂNG ĐÃ ĐƯỢC ĐỒNG BỘ

✅ **Trial 7 ngày:** Thông tin về trial được hiển thị trong các màn hình liên quan  
✅ **Student Linking:** Status badge và empty states được thêm vào  
✅ **Data Preservation:** Notes về việc giữ lại dữ liệu trial được thêm vào  
✅ **Refresh Token:** Flow được document trong NOTES  
✅ **Empty States:** Tất cả các screens đều có empty states phù hợp  
✅ **Error Handling:** Error states được thêm vào NOTES  

---

## LƯU Ý KHI SỬ DỤNG

1. **Student Status:** Luôn kiểm tra student status trước khi hiển thị data
2. **Data Preservation:** Note chỉ hiển thị trong tuần/tháng đầu tiên sau linking
3. **Empty States:** Sử dụng empty states phù hợp với từng trường hợp
4. **Error Handling:** Luôn có error states cho các API calls

---

**Tài liệu này được tạo để đảm bảo consistency giữa các prompt và tài liệu hệ thống.**
