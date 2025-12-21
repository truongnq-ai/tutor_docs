# STUDENT APP - ONBOARDING PROMPTS

**Project:** Tutor  
**Screen Group:** Onboarding & Setup  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

- ← Quay lại: [Figma Prompt Library](../README.md)

---

## SCREEN 1: WELCOME / INTRODUCTION

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor for Grade 6-7
- Target User: Student 11-13 tuổi
- Platform: Mobile App (iOS/Android)
- Screen: Welcome/Introduction Screen

[SCREEN PURPOSE]
- Màn hình đầu tiên khi mở app
- Giới thiệu sản phẩm một cách thân thiện
- User story: US-01 (Chọn lớp học)
- Acceptance criteria: Cho phép chọn lớp 6 hoặc 7

[DESIGN REQUIREMENTS]
- Hero section với illustration hoặc icon Toán học
- Title: "Chào mừng đến với Tutor!"
- Subtitle: "Gia sư Toán AI cá nhân hoá cho bạn"
- Trial badge: "🎁 Dùng thử miễn phí 7 ngày - Đầy đủ tính năng"
- 2 CTA buttons:
  - Primary: "Dùng thử ngay" (màu xanh #4CAF50)
  - Secondary: "Tìm hiểu thêm" (outlined)
- Footer: "Đã có tài khoản? Đăng nhập"

[VISUAL GUIDELINES]
- Background: Gradient từ #E3F2FD đến #FFFFFF
- Typography: Title 24px Bold, Subtitle 16px Regular
- Trial badge: Rounded pill, background #FFF9E6, text #FF9800, padding 8px 16px
- Spacing: Padding 24px, gap giữa elements 16px
- Illustration: Friendly, educational, không quá trẻ con

[SPECIFICATIONS]
- Screen size: 375x812px (iPhone X)
- Button height: 48px
- Button border-radius: 12px
- Safe area: Top 44px, Bottom 34px
- Trial badge: Height 32px

[CONTENT EXAMPLES]
- Title: "Chào mừng đến với Tutor!"
- Subtitle: "Gia sư Toán AI cá nhân hoá cho bạn"
- Trial badge: "🎁 Dùng thử miễn phí 7 ngày - Đầy đủ tính năng"
- Button 1: "Dùng thử ngay"
- Button 2: "Tìm hiểu thêm"
```

---

## SCREEN 0A: TRIAL START (Sau Welcome, trước Select Grade)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Trial Start Screen

[SCREEN PURPOSE]
- Tạo trial profile cho học sinh mới
- Thông báo về trial 7 ngày với đầy đủ tính năng
- User story: US-15 (Trial profile)

[DESIGN REQUIREMENTS]
- Illustration: Friendly, welcoming
- Title: "Bắt đầu dùng thử miễn phí!"
- Description: "Bạn có 7 ngày để trải nghiệm đầy đủ tính năng của Tutor"
- Features list:
  - "✅ Giải bài Toán không giới hạn (3-5 lượt/ngày)"
  - "✅ Lộ trình học hằng ngày"
  - "✅ Luyện tập cá nhân hoá"
  - "✅ Mini test kiểm tra kiến thức"
- Trial info card:
  - "Thời gian: 7 ngày"
  - "Bắt đầu: [Date]"
  - "Kết thúc: [Date + 7 days]"
- Note: "Dữ liệu học tập sẽ được lưu lại khi bạn liên kết với phụ huynh"
- Button "Bắt đầu" (primary)
- Link "Đã có tài khoản? Đăng nhập"

[VISUAL GUIDELINES]
- Background: #F5F5F5
- Features list: Icon + text, green checkmark
- Trial info card: White, rounded 16px, padding 20px, shadow nhẹ
- Typography: Title 24px Bold, Description 16px Regular, Features 14px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Card padding: 20px
- Button height: 56px

[CONTENT EXAMPLES]
- Title: "Bắt đầu dùng thử miễn phí!"
- Description: "Bạn có 7 ngày để trải nghiệm đầy đủ tính năng của Tutor"
- Feature 1: "✅ Giải bài Toán không giới hạn (3-5 lượt/ngày)"
- Feature 2: "✅ Lộ trình học hằng ngày"
- Feature 3: "✅ Luyện tập cá nhân hoá"
- Feature 4: "✅ Mini test kiểm tra kiến thức"
- Button: "Bắt đầu"
```
---

## SCREEN 2: SELECT GRADE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor for Grade 6-7
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Select Grade Screen

[SCREEN PURPOSE]
- Cho học sinh chọn lớp học (6 hoặc 7)
- User story: US-01
- Acceptance criteria: Chỉ cho phép chọn lớp 6 hoặc 7

[DESIGN REQUIREMENTS]
- Header: "Bạn đang học lớp mấy?"
- 2 large selection cards:
  - Card "Lớp 6": Có icon, title, description ngắn
  - Card "Lớp 7": Có icon, title, description ngắn
- Mỗi card có:
  - Icon Toán học (khác nhau cho lớp 6 và 7)
  - Title: "Lớp 6" / "Lớp 7"
  - Description: "Chương trình Toán lớp 6" / "Chương trình Toán lớp 7"
  - Border khi selected
- Button "Tiếp tục" (disabled khi chưa chọn)
- Back button ở header

[VISUAL GUIDELINES]
- Cards: Rounded 16px, có shadow nhẹ, padding 24px
- Selected state: Border 2px màu #4CAF50, background #E8F5E9
- Unselected state: Border 1px #E0E0E0, background #FFFFFF
- Icon size: 48x48px
- Card height: 120px

[SPECIFICATIONS]
- Screen size: 375x812px
- Card spacing: 16px
- Button: Fixed bottom, height 56px

[CONTENT EXAMPLES]
- Header: "Bạn đang học lớp mấy?"
- Card 1 Title: "Lớp 6"
- Card 1 Description: "Chương trình Toán lớp 6"
- Card 2 Title: "Lớp 7"
- Card 2 Description: "Chương trình Toán lớp 7"
- Button: "Tiếp tục"
```

---

## SCREEN 3: SELECT LEARNING GOAL

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Select Learning Goal

[SCREEN PURPOSE]
- Cho học sinh chọn mục tiêu học tập
- User story: US-02
- Acceptance criteria: 3 mục tiêu (Học theo chương, Củng cố kiến thức yếu, Ôn tập cho bài kiểm tra)

[DESIGN REQUIREMENTS]
- Header: "Mục tiêu học tập của bạn là gì?"
- 3 selection cards (có thể chọn nhiều):
  - "Học theo chương" - Icon sách, description ngắn
  - "Củng cố kiến thức còn yếu" - Icon target, description ngắn
  - "Ôn tập cho bài kiểm tra" - Icon calendar, description ngắn
- Mỗi card có checkbox ở góc trên bên phải
- Button "Bắt đầu học" (disabled khi chưa chọn)
- Back button

[VISUAL GUIDELINES]
- Cards: Similar to grade selection
- Checkbox: 24x24px, màu #4CAF50 khi checked
- Selected card: Background #E8F5E9, border #4CAF50

[SPECIFICATIONS]
- Screen size: 375x812px
- Card spacing: 12px
- Minimum 1 selection required

[CONTENT EXAMPLES]
- Header: "Mục tiêu học tập của bạn là gì?"
- Option 1: "Học theo chương" - "Học đúng tiến độ chương trình"
- Option 2: "Củng cố kiến thức còn yếu" - "Tập trung vào phần bạn chưa vững"
- Option 3: "Ôn tập cho bài kiểm tra" - "Chuẩn bị cho kỳ thi sắp tới"
- Button: "Bắt đầu học"
```

---

## SCREEN 4: TRIAL EXPIRY / PAYWALL

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi (Trial user sau 7 ngày)
- Platform: Mobile App
- Screen: Trial Expiry / Paywall Screen

[SCREEN PURPOSE]
- Thông báo hết thời gian dùng thử (7 ngày)
- Yêu cầu liên kết với phụ huynh bằng số điện thoại để tiếp tục
- User story: US-15 (Liên kết phụ huynh bằng số điện thoại)

[DESIGN REQUIREMENTS]
- Illustration: Friendly, không đe dọa, encouraging
- Title: "Thời gian dùng thử đã kết thúc!"
- Description: "Bạn đã hoàn thành 7 ngày dùng thử. Để tiếp tục học, bạn cần liên kết với tài khoản phụ huynh"
- Achievement summary (nếu có):
  - "Bạn đã làm được:"
  - "📚 X bài tập"
  - "🎯 Y skill đã cải thiện"
  - "🔥 Z ngày học liên tiếp"
- Note: "Dữ liệu học tập của bạn sẽ được giữ lại khi liên kết"
- Input field: "Nhập số điện thoại phụ huynh"
  - Placeholder: "0912345678"
  - Icon: Phone icon
  - Format: Vietnamese phone number format
- Button "Gửi mã OTP" (primary)
- Footer: "Mã OTP sẽ được gửi đến số điện thoại của phụ huynh"
- Alternative option: "Hoặc nhận mã liên kết" (secondary, cho parent-first flow)

[VISUAL GUIDELINES]
- Background: #FFF9E6 (warm yellow, friendly)
- Illustration: Positive, encouraging, celebration
- Achievement cards: White, rounded 12px, padding 16px, có icon
- Input field: Rounded 12px, có icon phone, height 48px
- Button: Primary color #4CAF50
- reCaptcha: Hiển thị khi click "Gửi mã OTP"

[SPECIFICATIONS]
- Screen size: 375x812px
- Input height: 48px
- Rate limiting: Hiển thị warning nếu đã gửi quá 3 lần/ngày
- Achievement cards: 2x2 grid hoặc list

[CONTENT EXAMPLES]
- Title: "Thời gian dùng thử đã kết thúc!"
- Description: "Bạn đã hoàn thành 7 ngày dùng thử. Để tiếp tục học, bạn cần liên kết với tài khoản phụ huynh"
- Achievement: "📚 45 bài tập | 🎯 3 skill cải thiện | 🔥 7 ngày liên tiếp"
- Note: "Dữ liệu học tập của bạn sẽ được giữ lại khi liên kết"
- Input placeholder: "0912345678"
- Button: "Gửi mã OTP"
- Footer: "Mã OTP sẽ được gửi đến số điện thoại của phụ huynh"
- Alternative: "Hoặc nhận mã liên kết"
```

---

## SCREEN 0: AUTH ENTRY (CHỌN PHƯƠNG THỨC ĐĂNG NHẬP)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Auth Entry - chọn phương thức đăng nhập

[SCREEN PURPOSE]
- Cho học sinh chọn 1 trong 3 phương thức login/signup:
  - Google
  - Apple
  - Manual (username/password)
- Chuẩn bị cho việc sau OAuth phải đặt username/password riêng

[DESIGN REQUIREMENTS]
- Header: "Chọn cách đăng nhập"
- Buttons:
  - Primary OAuth buttons: "Tiếp tục với Google", "Tiếp tục với Apple" (có icon)
  - Divider "Hoặc"
  - Manual: Button "Đăng nhập / Đăng ký thủ công"
- Footer: "Bạn chưa có tài khoản? Đăng ký thủ công"
- State: Loading khi gọi OAuth

[VISUAL GUIDELINES]
- Buttons full-width, height 48px, icon Google/Apple bên trái
- Divider: đường kẻ + chữ "Hoặc"
- Manual button: neutral/secondary

[SPECIFICATIONS]
- Screen size: 375x812px
- Button spacing: 12px

[CONTENT EXAMPLES]
- Title: "Chọn cách đăng nhập"
- Button 1: "Tiếp tục với Google"
- Button 2: "Tiếp tục với Apple"
- Manual: "Đăng nhập / Đăng ký thủ công"
```

---

## SCREEN 0B: SET USERNAME/PASSWORD SAU KHI OAUTH

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Set username/password (bắt buộc sau OAuth)

[SCREEN PURPOSE]
- Sau khi OAuth (Google/Apple), yêu cầu học sinh đặt username/password riêng
- Username rule: alphanumeric (chữ + số), không phân biệt hoa/thường
- Mật khẩu: tối thiểu 8 ký tự

[DESIGN REQUIREMENTS]
- Header: "Tạo tài khoản đăng nhập"
- Fields:
  - Username (placeholder: "student123"; helper: "Chỉ dùng chữ và số")
  - Password
  - Confirm password
- CTA: "Lưu"
- Error states:
  - Username không alphanumeric
  - Password không đủ mạnh / không khớp confirm

[VISUAL GUIDELINES]
- Input height 48px, rounded 12px
- Helper text dưới ô nhập
- Error text màu đỏ, ngắn gọn

[SPECIFICATIONS]
- Screen size: 375x812px
- Button height: 48px
- Password strength indicator (simple text ok)

[CONTENT EXAMPLES]
- Title: "Tạo tài khoản đăng nhập"
- Username helper: "Chỉ dùng chữ và số, không phân biệt hoa/thường"
- Button: "Lưu"
```

---

## SCREEN 0C: MANUAL SIGNUP (USERNAME/PASSWORD)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Manual Signup

[SCREEN PURPOSE]
- Cho phép học sinh tạo tài khoản thủ công
- Username rule: alphanumeric (chữ + số), không phân biệt hoa/thường

[DESIGN REQUIREMENTS]
- Fields:
  - Họ và tên (optional/hoặc required tùy team, đề xuất optional)
  - Username (helper: "Chỉ chữ và số, không phân biệt hoa/thường")
  - Password
  - Confirm password
- CTA: "Đăng ký"
- Link: "Đã có tài khoản? Đăng nhập"
- Error states: username không hợp lệ, password yếu/không khớp

[VISUAL GUIDELINES]
- Form centered, max width mobile
- Inputs 48px, rounded 12px
- Error text ngắn gọn

[SPECIFICATIONS]
- Screen size: 375x812px
- Button height: 48px

[CONTENT EXAMPLES]
- Title: "Đăng ký"
- Username placeholder: "student123"
- Username helper: "Chỉ dùng chữ và số"
- Button: "Đăng ký"
- Link: "Đã có tài khoản? Đăng nhập"
```

---

## SCREEN 0D: MANUAL LOGIN (USERNAME/PASSWORD)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Manual Login

[SCREEN PURPOSE]
- Đăng nhập bằng username/password (hỗ trợ đa thiết bị)

[DESIGN REQUIREMENTS]
- Fields:
  - Username
  - Password (show/hide)
- CTA: "Đăng nhập"
- Link: "Chưa có tài khoản? Đăng ký"
- Error: username/password sai
- Loading state trên nút

[VISUAL GUIDELINES]
- Form gọn, tối giản
- Inputs 48px, rounded 12px
- Error text rõ ràng

[SPECIFICATIONS]
- Screen size: 375x812px
- Button height: 48px

[CONTENT EXAMPLES]
- Title: "Đăng nhập"
- Button: "Đăng nhập"
- Link: "Chưa có tài khoản? Đăng ký"
```

---

## SCREEN 5: OTP VERIFICATION

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: OTP Verification Screen

[SCREEN PURPOSE]
- Nhập OTP để xác thực số điện thoại phụ huynh
- User story: US-15

[DESIGN REQUIREMENTS]
- Header: "Nhập mã OTP"
- Description: "Mã OTP đã được gửi đến số điện thoại [phone_number]. Vui lòng hỏi phụ huynh lấy mã."
- OTP input: 6 digits
  - 6 input boxes (mỗi box 1 số)
  - Auto-focus next box khi nhập
  - Có thể paste toàn bộ mã
- Timer: "Còn lại: [X] giây" (5 phút)
- Button "Xác nhận" (disabled khi chưa nhập đủ 6 số)
- Link "Gửi lại mã OTP" (disabled trong 60 giây đầu)
- Back button

[VISUAL GUIDELINES]
- OTP boxes: Square 48x48px, border 2px, rounded 8px
- Active box: Border #4CAF50
- Inactive box: Border #E0E0E0
- Timer: Màu #FF9800 khi < 1 phút
- Error state: Border đỏ, message "Mã OTP không đúng"

[SPECIFICATIONS]
- Screen size: 375x812px
- OTP box spacing: 8px
- Timer font: 14px Regular

[CONTENT EXAMPLES]
- Header: "Nhập mã OTP"
- Description: "Mã OTP đã được gửi đến số điện thoại 0912345678. Vui lòng hỏi phụ huynh lấy mã."
- Button: "Xác nhận"
- Link: "Gửi lại mã OTP"
- Timer: "Còn lại: 4:32"
```

---

## SCREEN 0E: TRIAL STATUS (Trong app, có thể truy cập từ settings)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi (Trial user)
- Platform: Mobile App
- Screen: Trial Status Screen

[SCREEN PURPOSE]
- Hiển thị trạng thái trial hiện tại
- Thông báo số ngày còn lại
- User story: US-15 (Trial profile)

[DESIGN REQUIREMENTS]
- Header: "Trạng thái dùng thử" + Back button
- Trial status card:
  - Status badge: "Đang dùng thử" (màu xanh) hoặc "Sắp hết hạn" (màu cam) hoặc "Đã hết hạn" (màu đỏ)
  - Days remaining: Large number "5" + "ngày còn lại"
  - Started: "Bắt đầu: 10/12/2025"
  - Expires: "Kết thúc: 17/12/2025"
  - Progress bar: Visual indicator số ngày đã dùng / tổng 7 ngày
- Usage stats:
  - "Số lượt giải bài hôm nay: 3/5"
  - "Tổng bài đã làm: 45 bài"
  - "Số skill đã học: 8 skill"
- Features reminder:
  - "Bạn đang có quyền truy cập:"
  - "✅ Giải bài Toán (3-5 lượt/ngày)"
  - "✅ Lộ trình học hằng ngày"
  - "✅ Luyện tập cá nhân hoá"
  - "✅ Mini test"
- Warning (nếu < 2 ngày):
  - "⚠️ Còn [X] ngày. Hãy liên kết với phụ huynh để tiếp tục học!"
- Button "Liên kết với phụ huynh" (primary, nếu chưa liên kết)
- Button "Tiếp tục học" (secondary)

[VISUAL GUIDELINES]
- Status card: White, rounded 16px, padding 24px, shadow nhẹ
- Status badge: Rounded pill, padding 8px 16px
- Days remaining: Large number 48px Bold, màu primary
- Progress bar: Green gradient, height 8px, rounded
- Warning: Yellow background (#FFF9E6), padding 16px, rounded 12px
- Typography: Days 48px Bold, Labels 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Card padding: 24px
- Progress bar: Height 8px, full width
- Button height: 56px

[CONTENT EXAMPLES]
- Header: "Trạng thái dùng thử"
- Status: "Đang dùng thử"
- Days: "5 ngày còn lại"
- Progress: "Đã dùng: 2/7 ngày"
- Usage: "Số lượt giải bài hôm nay: 3/5"
- Warning: "⚠️ Còn 2 ngày. Hãy liên kết với phụ huynh để tiếp tục học!"
- Button: "Liên kết với phụ huynh"
```
---

## SCREEN 6: LINKING SUCCESS

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Linking Success Screen

[SCREEN PURPOSE]
- Hiển thị thông tin đăng nhập cho phụ huynh sau khi liên kết thành công
- User story: US-15

[DESIGN REQUIREMENTS]
- Success icon: Checkmark circle, màu xanh
- Title: "Liên kết thành công!"
- Description: "Tài khoản của bạn đã được liên kết với phụ huynh. Dữ liệu học tập trong 7 ngày dùng thử đã được giữ lại."
- Data preservation note:
  - "✅ Dữ liệu đã được lưu:"
  - "📚 X bài tập đã làm"
  - "🎯 Y skill đã học"
  - "🔥 Z ngày học liên tiếp"
- Information card: Hiển thị thông tin đăng nhập cho phụ huynh
  - "Thông tin đăng nhập cho phụ huynh:"
  - Username: [phone_number]
  - Password: [phone_number] (tạm thời)
  - Note: "Mật khẩu tạm thời, vui lòng đổi sau khi đăng nhập"
  - Dashboard link: "Truy cập dashboard: [link]"
- Button "Hoàn tất" (primary)
- Copy button cho username, password, và link

[VISUAL GUIDELINES]
- Success icon: 64x64px, #4CAF50
- Information card: Background #F5F5F5, padding 16px, rounded 12px
- Copy buttons: Icon button, 32x32px
- Text: Monospace font cho username/password

[SPECIFICATIONS]
- Screen size: 375x812px
- Card spacing: 16px
- Button height: 48px

[CONTENT EXAMPLES]
- Title: "Liên kết thành công!"
- Description: "Tài khoản của bạn đã được liên kết với phụ huynh. Dữ liệu học tập trong 7 ngày dùng thử đã được giữ lại."
- Data note: "✅ Dữ liệu đã được lưu: 📚 45 bài tập | 🎯 8 skill | 🔥 7 ngày"
- Username: "0912345678"
- Password: "0912345678"
- Note: "Mật khẩu tạm thời, vui lòng đổi sau khi đăng nhập"
- Dashboard link: "https://dashboard.tutor.app/activate?token=..."
- Button: "Hoàn tất"
```

---

## NOTES

- Tất cả màn hình onboarding phải có loading state
- Tất cả buttons phải có disabled state
- Error states: Hiển thị message rõ ràng, không technical
- Success states: Confirmation message, next action rõ ràng

---

- ← Quay lại: [Figma Prompt Library](../README.md)

