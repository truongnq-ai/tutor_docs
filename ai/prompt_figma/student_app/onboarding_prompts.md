# STUDENT APP - ONBOARDING PROMPTS

**Project:** Tutor  
**Screen Group:** Onboarding & Setup  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

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
- 2 CTA buttons:
  - Primary: "Dùng thử ngay" (màu xanh #4CAF50)
  - Secondary: "Tìm hiểu thêm" (outlined)
- Footer: "Đã có tài khoản? Đăng nhập"

[VISUAL GUIDELINES]
- Background: Gradient từ #E3F2FD đến #FFFFFF
- Typography: Title 24px Bold, Subtitle 16px Regular
- Spacing: Padding 24px, gap giữa elements 16px
- Illustration: Friendly, educational, không quá trẻ con

[SPECIFICATIONS]
- Screen size: 375x812px (iPhone X)
- Button height: 48px
- Button border-radius: 12px
- Safe area: Top 44px, Bottom 34px

[CONTENT EXAMPLES]
- Title: "Chào mừng đến với Tutor!"
- Subtitle: "Gia sư Toán AI cá nhân hoá cho bạn"
- Button 1: "Dùng thử ngay"
- Button 2: "Tìm hiểu thêm"
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

## SCREEN 4: TRIAL LIMIT / PAYWALL

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi (Trial user)
- Platform: Mobile App
- Screen: Trial Limit / Paywall Screen

[SCREEN PURPOSE]
- Thông báo hết lượt dùng thử
- Yêu cầu liên kết với phụ huynh bằng số điện thoại
- User story: US-15 (Liên kết phụ huynh bằng số điện thoại)

[DESIGN REQUIREMENTS]
- Illustration: Friendly, không đe dọa
- Title: "Bạn đã dùng hết lượt miễn phí!"
- Description: "Để tiếp tục học, bạn cần liên kết với tài khoản phụ huynh"
- Input field: "Nhập số điện thoại phụ huynh"
  - Placeholder: "0912345678"
  - Icon: Phone icon
  - Format: Vietnamese phone number format
- Button "Gửi mã OTP" (primary)
- Footer: "Mã OTP sẽ được gửi đến số điện thoại của phụ huynh"
- Alternative option: "Hoặc nhận mã liên kết" (secondary, cho parent-first flow)

[VISUAL GUIDELINES]
- Background: #FFF9E6 (warm yellow, friendly)
- Illustration: Positive, encouraging
- Input field: Rounded 12px, có icon phone, height 48px
- Button: Primary color #4CAF50
- reCaptcha: Hiển thị khi click "Gửi mã OTP"

[SPECIFICATIONS]
- Screen size: 375x812px
- Input height: 48px
- Rate limiting: Hiển thị warning nếu đã gửi quá 3 lần/ngày

[CONTENT EXAMPLES]
- Title: "Bạn đã dùng hết lượt miễn phí!"
- Description: "Để tiếp tục học, bạn cần liên kết với tài khoản phụ huynh"
- Input placeholder: "0912345678"
- Button: "Gửi mã OTP"
- Footer: "Mã OTP sẽ được gửi đến số điện thoại của phụ huynh"
- Alternative: "Hoặc nhận mã liên kết"
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
- Description: "Tài khoản của bạn đã được liên kết với phụ huynh"
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
- Description: "Tài khoản của bạn đã được liên kết với phụ huynh"
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

