# PARENT DASHBOARD - AUTHENTICATION PROMPTS

**Project:** Tutor  
**Screen Group:** Authentication & Account Setup  
**Platform:** Web Dashboard (Next.js)  
**Version:** 2025-12-15-10-18

---

## SCREEN 1: LANDING PAGE / INTRODUCTION

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard (Desktop/Tablet)
- Screen: Landing Page

[SCREEN PURPOSE]
- Giới thiệu sản phẩm cho phụ huynh
- User story: Parent-first onboarding flow
- Acceptance criteria: Rõ ràng, dễ hiểu, không technical

[DESIGN REQUIREMENTS]
- Hero section:
  - Title: "Theo dõi việc học Toán của con một cách minh bạch"
  - Subtitle: "Dashboard báo cáo chi tiết, dễ hiểu cho phụ huynh"
  - CTA button: "Đăng ký ngay" (primary)
  - Secondary button: "Tìm hiểu thêm"
- Features section (3 columns):
  - Feature 1: "📊 Báo cáo chi tiết"
    - "Xem tiến độ học tập, điểm yếu, tiến bộ"
  - Feature 2: "⏰ Theo dõi thời gian thực"
    - "Biết con có học thật hay không"
  - Feature 3: "💡 Gợi ý cải thiện"
    - "Nhận khuyến nghị học tập cụ thể"
- How it works (simple steps):
  - "1. Đăng ký tài khoản"
  - "2. Tạo hồ sơ học sinh"
  - "3. Nhận mã liên kết"
  - "4. Con nhập mã trong app"
- Footer: Links, contact info

[VISUAL GUIDELINES]
- Background: Clean, professional (#FAFAFA)
- Hero: Centered, large typography
- Features: Cards, white background, shadow nhẹ
- Colors: Primary #1976D2, Accent #FF6F00
- Typography: H1 32px Bold, Body 16px Regular
- Spacing: Generous padding, clear sections

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Hero section: Min height 500px
- Feature cards: 300px width, padding 24px
- Button: Height 48px, padding 16px 32px

[CONTENT EXAMPLES]
- Title: "Theo dõi việc học Toán của con một cách minh bạch"
- Subtitle: "Dashboard báo cáo chi tiết, dễ hiểu cho phụ huynh"
- Feature 1: "📊 Báo cáo chi tiết"
- Button: "Đăng ký ngay"
```

---

## SCREEN 2: REGISTER

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Registration Screen

[SCREEN PURPOSE]
- Đăng ký tài khoản phụ huynh
- User story: PU-01a (Parent-first flow)
- Acceptance criteria: Tên, số điện thoại (username), password, email optional, OTP verification

[DESIGN REQUIREMENTS]
- Header: "Đăng ký tài khoản"
- Form fields:
  - Name input:
    - Label: "Họ và tên" (bắt buộc)
    - Placeholder: "Nguyễn Văn A"
    - Validation: Real-time check
  - Phone input:
    - Label: "Số điện thoại" (bắt buộc, là username)
    - Placeholder: "0912345678"
    - Icon: Phone icon
    - Validation: Vietnamese phone format
    - Note: "Số điện thoại này sẽ là tên đăng nhập của bạn"
  - Password input:
    - Label: "Mật khẩu"
    - Placeholder: "Tối thiểu 8 ký tự"
    - Show/hide toggle
    - Strength indicator
  - Confirm password:
    - Label: "Xác nhận mật khẩu"
    - Match indicator
  - Email input (optional):
    - Label: "Email (không bắt buộc)"
    - Placeholder: "email@example.com"
    - Note: "Email giúp khôi phục tài khoản"
- Terms & conditions:
  - Checkbox: "Tôi đồng ý với điều khoản sử dụng"
  - Link to terms
- Button "Tiếp tục" (disabled until valid)
- Link "Đã có tài khoản? Đăng nhập"
- Note: Sau khi submit, sẽ chuyển sang màn hình verify OTP

[VISUAL GUIDELINES]
- Form: Centered, max width 450px
- Input fields: Rounded 8px, padding 12px, border 1px #E0E0E0
- Focus state: Border #1976D2, shadow
- Error state: Border #D32F2F, error message below
- Button: Primary color, full width, height 48px
- Typography: Labels 14px Semi-bold, Input 16px
- Required fields: Asterisk (*) màu đỏ

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Form width: 450px max
- Input height: 48px
- Button height: 48px

[CONTENT EXAMPLES]
- Header: "Đăng ký tài khoản"
- Name placeholder: "Nguyễn Văn A"
- Phone placeholder: "0912345678"
- Phone note: "Số điện thoại này sẽ là tên đăng nhập của bạn"
- Password placeholder: "Tối thiểu 8 ký tự"
- Email placeholder: "email@example.com"
- Email note: "Email giúp khôi phục tài khoản"
- Button: "Tiếp tục"
- Link: "Đã có tài khoản? Đăng nhập"
```

---

## SCREEN 3: LOGIN

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Login Screen

[SCREEN PURPOSE]
- Đăng nhập vào dashboard
- User story: PU-01
- Acceptance criteria: Số điện thoại + password, hoặc OAuth (Google/Apple)

[DESIGN REQUIREMENTS]
- Header: "Đăng nhập"
- Form fields:
  - Phone input:
    - Label: "Số điện thoại"
    - Placeholder: "0912345678"
    - Icon: Phone icon
    - Note: "Số điện thoại là tên đăng nhập của bạn"
  - Password input:
    - Label: "Mật khẩu"
    - Placeholder: "Nhập mật khẩu"
    - Show/hide toggle
- Options:
  - Checkbox: "Ghi nhớ đăng nhập"
  - Link: "Quên mật khẩu?"
- Divider: "Hoặc"
- OAuth buttons:
  - "Đăng nhập bằng Google" (button với Google icon)
  - "Đăng nhập bằng Apple" (button với Apple icon)
- Button "Đăng nhập" (primary, full width)
- Link "Chưa có tài khoản? Đăng ký"
- Error messages: Clear, not technical
- Loading state: Spinner on button

[VISUAL GUIDELINES]
- Form: Centered, max width 400px
- Input fields: Same as registration
- OAuth buttons: Secondary style, full width, height 48px, có icon
- Divider: Text "Hoặc" với line trên/dưới
- Button: Primary color, full width
- Link: Secondary color, underline on hover
- Error: Red text, clear message
- Typography: Consistent with registration

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Form width: 400px max
- Input height: 48px
- Button height: 48px
- OAuth button spacing: 12px

[CONTENT EXAMPLES]
- Header: "Đăng nhập"
- Phone placeholder: "0912345678"
- Phone note: "Số điện thoại là tên đăng nhập của bạn"
- Password placeholder: "Nhập mật khẩu"
- Checkbox: "Ghi nhớ đăng nhập"
- Link: "Quên mật khẩu?"
- Divider: "Hoặc"
- OAuth button 1: "Đăng nhập bằng Google"
- OAuth button 2: "Đăng nhập bằng Apple"
- Button: "Đăng nhập"
```

---

## SCREEN 4: CREATE STUDENT PROFILE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Create Student Profile

[SCREEN PURPOSE]
- Tạo hồ sơ học sinh sau khi đăng ký
- User story: Parent-first onboarding
- Acceptance criteria: Chọn lớp, tạo link token

[DESIGN REQUIREMENTS]
- Header: "Tạo hồ sơ học sinh"
- Subtitle: "Thông tin này giúp hệ thống cá nhân hoá nội dung học tập"
- Form:
  - Student name (optional):
    - Label: "Tên học sinh (tùy chọn)"
    - Placeholder: "Ví dụ: Nguyễn Văn A"
  - Grade selection:
    - Label: "Lớp học"
    - Radio buttons: "Lớp 6" | "Lớp 7"
    - Description: "Chọn lớp con đang học"
- Info box:
  - "Sau khi tạo hồ sơ, bạn sẽ nhận mã liên kết để con sử dụng trong app"
- Button "Tạo hồ sơ" (primary)
- Back button

[VISUAL GUIDELINES]
- Form: Centered, max width 500px
- Radio buttons: Large, clear labels
- Info box: Blue background (#E3F2FD), padding 16px, rounded
- Button: Primary color, full width
- Typography: Clear hierarchy

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Form width: 500px max
- Radio button: 24px size
- Button height: 48px

[CONTENT EXAMPLES]
- Header: "Tạo hồ sơ học sinh"
- Subtitle: "Thông tin này giúp hệ thống cá nhân hoá nội dung học tập"
- Name placeholder: "Ví dụ: Nguyễn Văn A"
- Grade options: "Lớp 6" | "Lớp 7"
- Info: "Sau khi tạo hồ sơ, bạn sẽ nhận mã liên kết để con sử dụng trong app"
- Button: "Tạo hồ sơ"
```

---

## SCREEN 5: VERIFY PHONE OTP (REGISTRATION)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Verify Phone OTP (during registration)

[SCREEN PURPOSE]
- Xác thực số điện thoại bằng OTP sau khi đăng ký
- User story: PU-01a
- Acceptance criteria: Nhập OTP, verify, hoàn tất đăng ký

[DESIGN REQUIREMENTS]
- Header: "Xác thực số điện thoại"
- Description: "Mã OTP đã được gửi đến số điện thoại [phone_number]"
- OTP input: 6 digits
  - 6 input boxes (mỗi box 1 số)
  - Auto-focus next box khi nhập
  - Có thể paste toàn bộ mã
- Timer: "Còn lại: [X] giây" (5 phút)
- Button "Xác nhận" (disabled khi chưa nhập đủ 6 số)
- Link "Gửi lại mã OTP" (disabled trong 60 giây đầu)
- Back button

[VISUAL GUIDELINES]
- Form: Centered, max width 400px
- OTP boxes: Square 48x48px, border 2px, rounded 8px
- Active box: Border #1976D2
- Inactive box: Border #E0E0E0
- Timer: Màu #FF9800 khi < 1 phút
- Error state: Border đỏ, message "Mã OTP không đúng"
- Success: Redirect to dashboard

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- OTP box spacing: 8px
- Timer font: 14px Regular

[CONTENT EXAMPLES]
- Header: "Xác thực số điện thoại"
- Description: "Mã OTP đã được gửi đến số điện thoại 0912345678"
- Button: "Xác nhận"
- Link: "Gửi lại mã OTP"
- Timer: "Còn lại: 4:32"
```

---

## SCREEN 6: OAuth LOGIN SUCCESS / PHONE UPDATE REQUIRED

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: OAuth Login Success / Phone Update Required

[SCREEN PURPOSE]
- Hiển thị sau khi đăng nhập OAuth thành công
- Nếu phone_verified = false → Yêu cầu cập nhật số điện thoại
- User story: PU-11, PU-12

[DESIGN REQUIREMENTS]
- Success icon: Checkmark circle, màu xanh
- Title: "Đăng nhập thành công!"
- Description: "Để sử dụng dashboard, bạn cần cập nhật và xác thực số điện thoại"
- Info box:
  - "Số điện thoại giúp học sinh có thể liên kết với tài khoản của bạn"
- Button "Cập nhật số điện thoại" (primary)
- Alternative: "Bỏ qua" (secondary, nhưng không cho vào dashboard)

[VISUAL GUIDELINES]
- Success icon: 64x64px, #4CAF50
- Info box: Background #E3F2FD, padding 16px, rounded 12px
- Button: Primary color, full width
- Warning: Nếu bỏ qua, hiển thị message "Bạn cần xác thực số điện thoại để sử dụng dashboard"

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Card spacing: 16px
- Button height: 48px

[CONTENT EXAMPLES]
- Title: "Đăng nhập thành công!"
- Description: "Để sử dụng dashboard, bạn cần cập nhật và xác thực số điện thoại"
- Info: "Số điện thoại giúp học sinh có thể liên kết với tài khoản của bạn"
- Button: "Cập nhật số điện thoại"
```

---

## SCREEN 7: UPDATE PHONE NUMBER (AFTER OAuth)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Update Phone Number (after OAuth login)

[SCREEN PURPOSE]
- Cập nhật số điện thoại sau khi đăng nhập OAuth
- User story: PU-12

[DESIGN REQUIREMENTS]
- Header: "Cập nhật số điện thoại"
- Description: "Nhập số điện thoại để học sinh có thể liên kết với tài khoản của bạn"
- Form:
  - Phone input:
    - Label: "Số điện thoại"
    - Placeholder: "0912345678"
    - Icon: Phone icon
    - Validation: Vietnamese phone format
- Button "Gửi mã OTP" (primary, disabled khi chưa nhập phone)
- Back button (nhưng không cho vào dashboard nếu chưa verify)

[VISUAL GUIDELINES]
- Form: Centered, max width 400px
- Input: Same style as registration
- Button: Primary color, full width
- Error: Red text, clear message

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Form width: 400px max
- Input height: 48px
- Button height: 48px

[CONTENT EXAMPLES]
- Header: "Cập nhật số điện thoại"
- Description: "Nhập số điện thoại để học sinh có thể liên kết với tài khoản của bạn"
- Phone placeholder: "0912345678"
- Button: "Gửi mã OTP"
```

---

## SCREEN 8: VERIFY PHONE OTP (AFTER OAuth)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Verify Phone OTP (after OAuth login)

[SCREEN PURPOSE]
- Xác thực số điện thoại sau khi cập nhật (OAuth flow)
- User story: PU-12
- Acceptance criteria: Nhập OTP, verify, redirect to dashboard

[DESIGN REQUIREMENTS]
- Header: "Xác thực số điện thoại"
- Description: "Mã OTP đã được gửi đến số điện thoại [phone_number]"
- OTP input: 6 digits (same as registration OTP screen)
- Timer: "Còn lại: [X] giây" (5 phút)
- Button "Xác nhận" (disabled khi chưa nhập đủ 6 số)
- Link "Gửi lại mã OTP" (disabled trong 60 giây đầu)
- Success: Redirect to dashboard

[VISUAL GUIDELINES]
- Same as Screen 5 (Verify Phone OTP during registration)
- Success state: Show success message, then redirect

[SPECIFICATIONS]
- Same as Screen 5

[CONTENT EXAMPLES]
- Header: "Xác thực số điện thoại"
- Description: "Mã OTP đã được gửi đến số điện thoại 0912345678"
- Button: "Xác nhận"
- Link: "Gửi lại mã OTP"
- Timer: "Còn lại: 4:32"
```

---

## SCREEN 9: LINK TOKEN / QR CODE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Link Token / QR Code Display

[SCREEN PURPOSE]
- Hiển thị mã liên kết hoặc QR code cho học sinh
- User story: Parent-first onboarding
- Acceptance criteria: Token có thời hạn, có thể copy/share

[DESIGN REQUIREMENTS]
- Header: "Liên kết với ứng dụng"
- Instructions:
  - "Hướng dẫn con mở app và nhập mã này:"
  - Hoặc "Cho con quét mã QR này:"
- Link token display:
  - Large text: "ABC123XYZ"
  - Copy button: "Sao chép"
  - Status: "Mã hợp lệ trong 24 giờ"
- QR code:
  - Large, scannable
  - Download button: "Tải QR code"
- Alternative methods:
  - "Hoặc gửi email cho con"
  - Email input + "Gửi email"
- Status indicator:
  - "Chưa liên kết" (pending)
  - "Đã liên kết" (success, green)
- Back button

[VISUAL GUIDELINES]
- Token: Large, monospace font, prominent
- QR code: 200x200px minimum
- Copy button: Secondary style, icon
- Status: Color-coded (yellow pending, green success)
- Instructions: Clear, step-by-step
- Typography: Token 24px Bold, Instructions 16px

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- QR code: 200x200px
- Token display: 24px font
- Button height: 40px

[CONTENT EXAMPLES]
- Header: "Liên kết với ứng dụng"
- Instructions: "Hướng dẫn con mở app và nhập mã này:"
- Token: "ABC123XYZ"
- Status: "Mã hợp lệ trong 24 giờ"
- Button: "Sao chép"
```

---

## NOTES

- Tất cả auth screens cần có loading states
- Error messages phải rõ ràng, không technical
- Success states cần confirmation rõ ràng
- Responsive design cho tablet và mobile web
- Accessibility: Keyboard navigation, screen reader support

