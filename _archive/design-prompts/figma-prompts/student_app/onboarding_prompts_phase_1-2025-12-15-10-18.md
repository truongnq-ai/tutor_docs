# STUDENT APP - ONBOARDING PROMPTS

**Project:** Tutor  
**Screen Group:** Onboarding & Setup  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

- ← Quay lại: [Figma Prompt Library](../README.md)

---

## DESIGN STANDARDS REFERENCE

**Xem [Design Standards Template](design_standards_template.md) cho checklist và quick reference về:**
- Accessibility checklist (touch targets, contrast, screen reader, etc.)
- Color & Typography quick reference
- Interaction patterns (button states, feedback, animations)
- Component specs (buttons, cards, inputs, progress indicators)
- Navigation patterns (bottom nav, AppBar, deep linking)
- Spacing scale
- Microcopy guidelines

**Tài liệu chi tiết:**
- [Design Principles](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/design-principles.md)
- [Color & Typography](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md)
- [Components](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/components.md)
- [Interaction Patterns](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md)
- [Navigation & Flow](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md)
- [Accessibility](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md)

---

## SCREEN 0: SPLASH / LAUNCH SCREEN

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor for Grade 6-7
- Target User: Student 11-13 tuổi
- Platform: Mobile App (iOS/Android)
- Screen: Splash/Launch Screen

[SCREEN PURPOSE]
- Màn hình đầu tiên khi mở ứng dụng
- Hiển thị logo và branding của Tutor
- Kiểm tra trạng thái đăng nhập và điều hướng phù hợp
- Thời gian hiển thị: 2-3 giây (hoặc cho đến khi app sẵn sàng)

[DESIGN REQUIREMENTS]
- Full screen background: Gradient từ #4CAF50 đến #2196F3 (hoặc solid color #4CAF50)
- Logo/Icon: Logo Tutor ở giữa màn hình
  - Size: 120x120px (hoặc tương đương)
  - Animation: Fade in hoặc scale in nhẹ nhàng
- App name: "Tutor" (optional, dưới logo)
  - Typography: 32px Bold, màu trắng
- Loading indicator (optional): Circular progress ở dưới cùng
  - Màu trắng, size nhỏ
- Version info (optional): "Version 1.0.0" ở góc dưới
  - Typography: 12px Regular, màu trắng với opacity 70%

[VISUAL GUIDELINES]
- Background: Solid color hoặc gradient, không có pattern phức tạp
- Logo: Centered, có animation nhẹ khi xuất hiện
- Typography: White text, high contrast
- Spacing: Logo cách top 40%, app name cách logo 24px
- Animation duration: 300-500ms cho fade in

[SPECIFICATIONS]
- Screen size: 375x812px (iPhone X) - Full screen
- Logo size: 120x120px (hoặc scale theo screen)
- Safe area: Không cần safe area cho splash (full screen)
- Animation: Fade in 300ms, scale in 400ms (optional)

[CONTENT EXAMPLES]
- Logo: Tutor logo/icon
- App name: "Tutor" (optional)
- Version: "v1.0.0" (optional, bottom corner)
- Loading: Circular spinner (optional)

[ACCESSIBILITY]
- Logo image: Có semanticLabel "Tutor logo"
- Loading indicator: Có semanticLabel "Đang tải ứng dụng"
- Contrast: White text trên gradient background đảm bảo ≥ 4.5:1
- Touch targets: Không có interactive elements (splash screen)

[STATES]
- Default: Logo fade in, hiển thị 2-3 giây
- Loading: Có thể hiển thị progress indicator nếu cần check network/auth
- Error: Nếu có lỗi network, vẫn chuyển sang màn hình tiếp theo sau timeout (sau 3 giây)

[NAVIGATION]
- Entry: Từ app launch
- Exit: Tự động chuyển đến Welcome screen hoặc Home (nếu đã đăng nhập) sau 2-3 giây
- Deep link: Không áp dụng (entry point)
```

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

[ACCESSIBILITY]
- Buttons: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Illustration: Có semanticLabel mô tả nội dung (ví dụ: "Học sinh đang học Toán với AI tutor")
- Contrast: Text trên gradient background đảm bảo ≥ 4.5:1
- Screen reader: Buttons có semantic labels từ text content

[STATES]
- Default: Tất cả elements hiển thị bình thường
- Button pressed: Scale down 0.95, duration 100-200ms
- Button disabled: Không có disabled state cho màn hình này
- Loading: Không có loading state (màn hình tĩnh)

[NAVIGATION]
- Entry: Từ Splash screen hoặc app launch (nếu chưa đăng nhập)
- Exit: 
  - Primary button "Dùng thử ngay" → Trial Start screen
  - Secondary button "Tìm hiểu thêm" → (có thể là info screen hoặc skip)
  - Footer link "Đã có tài khoản? Đăng nhập" → Auth Entry screen
- Back button: Không có (entry point)
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Title: "Chào mừng đến với Tutor!"
- Subtitle: "Gia sư Toán AI cá nhân hoá cho bạn"
- Trial badge: "🎁 Dùng thử miễn phí 7 ngày - Đầy đủ tính năng"
- Button 1: "Dùng thử ngay"
- Button 2: "Tìm hiểu thêm"
- Footer link: "Đã có tài khoản? Đăng nhập"
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

[ACCESSIBILITY]
- Button: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Illustration: Có semanticLabel mô tả (ví dụ: "Học sinh bắt đầu dùng thử ứng dụng")
- Cards: Có semantic labels cho trial info card
- Contrast: Text trên background đảm bảo ≥ 4.5:1

[STATES]
- Default: Tất cả elements hiển thị bình thường
- Button pressed: Scale down 0.95, duration 100-200ms
- Button loading: Hiển thị spinner khi đang tạo trial profile
- Success: Chuyển đến Select Grade screen sau khi tạo trial thành công

[NAVIGATION]
- Entry: Từ Welcome screen (khi click "Dùng thử ngay")
- Exit:
  - Button "Bắt đầu" → Select Grade screen
  - Link "Đã có tài khoản? Đăng nhập" → Auth Entry screen
- Back button: Có, quay lại Welcome screen

[CONTENT EXAMPLES]
- Title: "Bắt đầu dùng thử miễn phí!"
- Description: "Bạn có 7 ngày để trải nghiệm đầy đủ tính năng của Tutor"
- Feature 1: "✅ Giải bài Toán không giới hạn (3-5 lượt/ngày)"
- Feature 2: "✅ Lộ trình học hằng ngày"
- Feature 3: "✅ Luyện tập cá nhân hoá"
- Feature 4: "✅ Mini test kiểm tra kiến thức"
- Button: "Bắt đầu"
- Link: "Đã có tài khoản? Đăng nhập"
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

[ACCESSIBILITY]
- Selection cards: Touch target ≥ 44x44px (card height 120px đã đạt yêu cầu)
- Cards: Có semantic labels "Lớp 6" và "Lớp 7" với description
- Button: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Selected state: Kết hợp màu xanh với border để hỗ trợ color blind users
- Screen reader: Announce selection khi tap card

[STATES]
- Default: Không có card nào được chọn, button "Tiếp tục" disabled (grey #BDBDBD)
- Card selected: Border 2px #4CAF50, background #E8F5E9
- Card unselected: Border 1px #E0E0E0, background #FFFFFF
- Button enabled: Khi đã chọn 1 card, button chuyển sang primary color
- Button pressed: Scale down 0.95, duration 100-200ms
- Button loading: Hiển thị spinner khi đang lưu selection

[NAVIGATION]
- Entry: Từ Trial Start screen
- Exit:
  - Button "Tiếp tục" → Select Learning Goal screen
  - Back button → Trial Start screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Header: "Bạn đang học lớp mấy?"
- Card 1 Title: "Lớp 6"
- Card 1 Description: "Chương trình Toán lớp 6"
- Card 2 Title: "Lớp 7"
- Card 2 Description: "Chương trình Toán lớp 7"
- Button: "Tiếp tục" (disabled khi chưa chọn)
- Error message: Không có (chỉ có 2 options, không thể invalid)
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

[ACCESSIBILITY]
- Selection cards: Touch target ≥ 44x44px (card height đủ lớn)
- Checkboxes: Touch target ≥ 44x44px (size 24x24px, cần padding để đạt 44px)
- Cards: Có semantic labels cho mỗi option
- Button: Touch target ≥ 44x44px
- Selected state: Kết hợp màu xanh với checkbox icon để hỗ trợ color blind users
- Screen reader: Announce selection khi tap card/checkbox

[STATES]
- Default: Không có card nào được chọn, button "Bắt đầu học" disabled
- Card selected: Background #E8F5E9, border #4CAF50, checkbox checked
- Card unselected: Background #FFFFFF, border #E0E0E0, checkbox unchecked
- Button enabled: Khi đã chọn ≥ 1 card, button chuyển sang primary color
- Button pressed: Scale down 0.95, duration 100-200ms
- Button loading: Hiển thị spinner khi đang lưu selections

[NAVIGATION]
- Entry: Từ Select Grade screen
- Exit:
  - Button "Bắt đầu học" → Today's Learning Plan (Home/Dashboard)
  - Back button → Select Grade screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Header: "Mục tiêu học tập của bạn là gì?"
- Option 1: "Học theo chương" - "Học đúng tiến độ chương trình"
- Option 2: "Củng cố kiến thức còn yếu" - "Tập trung vào phần bạn chưa vững"
- Option 3: "Ôn tập cho bài kiểm tra" - "Chuẩn bị cho kỳ thi sắp tới"
- Button: "Bắt đầu học" (disabled khi chưa chọn)
- Error message: Không có (có thể chọn nhiều, minimum 1)
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

[ACCESSIBILITY]
- Input field: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Input field: Có label "Nhập số điện thoại phụ huynh" và helper text
- Button: Touch target ≥ 44x44px
- Illustration: Có semanticLabel mô tả (ví dụ: "Thông báo hết thời gian dùng thử")
- Error state: Error message hiển thị dưới input field, có icon error

[STATES]
- Default: Input field trống, button enabled
- Input focused: Border 2px #4CAF50
- Input error: Border #F44336, error message "Số điện thoại không hợp lệ" hoặc "Đã gửi quá 3 lần/ngày"
- Button disabled: Khi input trống hoặc invalid
- Button loading: Hiển thị spinner khi đang gửi OTP
- Button pressed: Scale down 0.95, duration 100-200ms
- Success: Chuyển đến OTP Verification screen sau khi gửi OTP thành công

[NAVIGATION]
- Entry: Tự động hiển thị khi trial hết hạn (sau 7 ngày)
- Exit:
  - Button "Gửi mã OTP" → OTP Verification screen
  - Alternative "Hoặc nhận mã liên kết" → (có thể là modal hoặc screen khác)
- Back button: Không có (hoặc có nhưng chỉ cho phép logout)
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Title: "Thời gian dùng thử đã kết thúc!"
- Description: "Bạn đã hoàn thành 7 ngày dùng thử. Để tiếp tục học, bạn cần liên kết với tài khoản phụ huynh"
- Achievement: "📚 45 bài tập | 🎯 3 skill cải thiện | 🔥 7 ngày liên tiếp"
- Note: "Dữ liệu học tập của bạn sẽ được giữ lại khi liên kết"
- Input label: "Nhập số điện thoại phụ huynh"
- Input placeholder: "0912345678"
- Input helper: "Ví dụ: 0912345678"
- Button: "Gửi mã OTP"
- Footer: "Mã OTP sẽ được gửi đến số điện thoại của phụ huynh"
- Alternative: "Hoặc nhận mã liên kết"
- Error message: "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam (10 số)."
- Rate limit warning: "⚠️ Bạn đã gửi quá 3 lần hôm nay. Vui lòng thử lại vào ngày mai."
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

[ACCESSIBILITY]
- OAuth buttons: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Buttons: Có semantic labels từ text content ("Tiếp tục với Google", "Tiếp tục với Apple")
- Icons: Google/Apple icons có alt text hoặc được bao bởi semantic label
- Manual button: Có semantic label "Đăng nhập hoặc đăng ký thủ công"

[STATES]
- Default: Tất cả buttons enabled
- Button pressed: Scale down 0.95, duration 100-200ms
- Button loading: Hiển thị spinner khi đang xử lý OAuth (Google/Apple)
- OAuth success: Chuyển đến Set Username/Password screen
- OAuth error: Hiển thị error message "Không thể đăng nhập. Vui lòng thử lại." với button "Thử lại"
- Manual button: Chuyển đến Manual Signup/Login screen

[NAVIGATION]
- Entry: Từ Welcome screen (khi click "Đã có tài khoản? Đăng nhập")
- Exit:
  - Button "Tiếp tục với Google" → Set Username/Password screen (sau OAuth)
  - Button "Tiếp tục với Apple" → Set Username/Password screen (sau OAuth)
  - Button "Đăng nhập / Đăng ký thủ công" → Manual Signup screen hoặc Manual Login screen
- Back button: Có, quay lại Welcome screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Title: "Chọn cách đăng nhập"
- Button 1: "Tiếp tục với Google" (có Google icon)
- Button 2: "Tiếp tục với Apple" (có Apple icon)
- Divider: "Hoặc"
- Manual: "Đăng nhập / Đăng ký thủ công"
- Footer: "Bạn chưa có tài khoản? Đăng ký thủ công"
- Error message: "Không thể đăng nhập. Vui lòng thử lại."
- Loading message: "Đang đăng nhập..."
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

[ACCESSIBILITY]
- Input fields: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Input fields: Có labels và helper text
- Password fields: Có show/hide toggle với semantic label
- Button: Touch target ≥ 44x44px
- Error messages: Hiển thị dưới field, có icon error

[STATES]
- Default: Tất cả fields trống, button disabled
- Input focused: Border 2px #4CAF50
- Input error: Border #F44336, error message dưới field
  - Username: "Tên đăng nhập chỉ được dùng chữ và số"
  - Password: "Mật khẩu phải có ít nhất 8 ký tự"
  - Confirm password: "Mật khẩu không khớp"
- Button enabled: Khi tất cả fields hợp lệ
- Button loading: Hiển thị spinner khi đang lưu
- Button pressed: Scale down 0.95, duration 100-200ms
- Success: Chuyển đến Select Grade screen hoặc Home (nếu đã có grade)

[NAVIGATION]
- Entry: Từ Auth Entry screen (sau khi OAuth thành công)
- Exit:
  - Button "Lưu" → Select Grade screen (nếu chưa có) hoặc Home
- Back button: Có, nhưng có thể hiển thị warning "Bạn chưa hoàn tất đăng ký"
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Title: "Tạo tài khoản đăng nhập"
- Username label: "Tên đăng nhập"
- Username placeholder: "student123"
- Username helper: "Chỉ dùng chữ và số, không phân biệt hoa/thường"
- Password label: "Mật khẩu"
- Password placeholder: "Tối thiểu 8 ký tự"
- Confirm password label: "Xác nhận mật khẩu"
- Confirm password placeholder: "Nhập lại mật khẩu"
- Button: "Lưu"
- Error username: "Tên đăng nhập chỉ được dùng chữ và số"
- Error password: "Mật khẩu phải có ít nhất 8 ký tự"
- Error confirm: "Mật khẩu không khớp"
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

[ACCESSIBILITY]
- Input fields: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Input fields: Có labels và helper text
- Password fields: Có show/hide toggle
- Button: Touch target ≥ 44x44px
- Link: Touch target ≥ 44x44px

[STATES]
- Default: Tất cả fields trống, button disabled
- Input focused: Border 2px #4CAF50
- Input error: Border #F44336, error message dưới field
  - Username: "Tên đăng nhập chỉ được dùng chữ và số" hoặc "Tên đăng nhập đã tồn tại"
  - Password: "Mật khẩu phải có ít nhất 8 ký tự"
  - Confirm password: "Mật khẩu không khớp"
- Button enabled: Khi tất cả fields hợp lệ
- Button loading: Hiển thị spinner khi đang đăng ký
- Button pressed: Scale down 0.95, duration 100-200ms
- Success: Chuyển đến Trial Start screen hoặc Select Grade screen

[NAVIGATION]
- Entry: Từ Auth Entry screen (khi click "Đăng nhập / Đăng ký thủ công")
- Exit:
  - Button "Đăng ký" → Trial Start screen hoặc Select Grade screen
  - Link "Đã có tài khoản? Đăng nhập" → Manual Login screen
- Back button: Có, quay lại Auth Entry screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Title: "Đăng ký"
- Name label: "Họ và tên" (optional)
- Name placeholder: "Nguyễn Văn A"
- Username label: "Tên đăng nhập"
- Username placeholder: "student123"
- Username helper: "Chỉ dùng chữ và số, không phân biệt hoa/thường"
- Password label: "Mật khẩu"
- Password placeholder: "Tối thiểu 8 ký tự"
- Confirm password label: "Xác nhận mật khẩu"
- Button: "Đăng ký"
- Link: "Đã có tài khoản? Đăng nhập"
- Error messages: Tương tự Set Username/Password screen
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

[ACCESSIBILITY]
- Input fields: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Input fields: Có labels
- Password field: Có show/hide toggle với semantic label
- Button: Touch target ≥ 44x44px
- Link: Touch target ≥ 44x44px

[STATES]
- Default: Tất cả fields trống, button disabled
- Input focused: Border 2px #4CAF50
- Input error: Border #F44336, error message "Tên đăng nhập hoặc mật khẩu không đúng"
- Button enabled: Khi cả 2 fields đã điền
- Button loading: Hiển thị spinner khi đang đăng nhập
- Button pressed: Scale down 0.95, duration 100-200ms
- Success: Chuyển đến Home/Dashboard

[NAVIGATION]
- Entry: Từ Auth Entry screen hoặc Manual Signup screen (khi click link)
- Exit:
  - Button "Đăng nhập" → Home/Dashboard
  - Link "Chưa có tài khoản? Đăng ký" → Manual Signup screen
- Back button: Có, quay lại Auth Entry screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Title: "Đăng nhập"
- Username label: "Tên đăng nhập"
- Username placeholder: "student123"
- Password label: "Mật khẩu"
- Password placeholder: "Nhập mật khẩu"
- Button: "Đăng nhập"
- Link: "Chưa có tài khoản? Đăng ký"
- Error message: "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại."
- Loading message: "Đang đăng nhập..."
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

[ACCESSIBILITY]
- OTP input boxes: Touch target ≥ 44x44px (size 48x48px đã đạt yêu cầu)
- OTP boxes: Có semantic labels "Ô nhập mã OTP số 1", "Ô nhập mã OTP số 2", etc.
- Button: Touch target ≥ 44x44px
- Link: Touch target ≥ 44x44px
- Timer: Có semantic label "Thời gian còn lại: 4 phút 32 giây"

[STATES]
- Default: Tất cả OTP boxes trống, button disabled
- OTP box focused: Border 2px #4CAF50
- OTP box filled: Border 1px #E0E0E0, có số
- OTP error: Border #F44336, error message "Mã OTP không đúng. Vui lòng thử lại."
- Button enabled: Khi đã nhập đủ 6 số
- Button loading: Hiển thị spinner khi đang xác thực OTP
- Button pressed: Scale down 0.95, duration 100-200ms
- Timer warning: Màu #FF9800 khi < 1 phút, màu #F44336 khi hết thời gian
- Link disabled: Trong 60 giây đầu, hiển thị "Gửi lại mã OTP (còn 45 giây)"
- Link enabled: Sau 60 giây, có thể click để gửi lại
- Success: Chuyển đến Linking Success screen

[NAVIGATION]
- Entry: Từ Trial Expiry/Paywall screen (sau khi gửi OTP)
- Exit:
  - Button "Xác nhận" → Linking Success screen (nếu OTP đúng)
  - Link "Gửi lại mã OTP" → Gửi lại OTP, reset timer
  - Back button → Trial Expiry/Paywall screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Header: "Nhập mã OTP"
- Description: "Mã OTP đã được gửi đến số điện thoại 0912345678. Vui lòng hỏi phụ huynh lấy mã."
- Button: "Xác nhận" (disabled khi chưa nhập đủ 6 số)
- Link: "Gửi lại mã OTP" (disabled trong 60 giây đầu)
- Timer: "Còn lại: 4:32"
- Error message: "Mã OTP không đúng. Vui lòng thử lại."
- Timer expired: "Mã OTP đã hết hạn. Vui lòng gửi lại mã."
- Loading message: "Đang xác thực..."
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

[ACCESSIBILITY]
- Buttons: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Cards: Có semantic labels cho status card và usage stats
- Progress bar: Có semantic label "Tiến độ: 2/7 ngày"
- Badges: Có semantic labels cho status badges

[STATES]
- Default: Hiển thị thông tin trial status
- Status badge: 
  - "Đang dùng thử" (màu xanh #4CAF50) - khi còn ≥ 3 ngày
  - "Sắp hết hạn" (màu cam #FF9800) - khi còn 1-2 ngày
  - "Đã hết hạn" (màu đỏ #F44336) - khi đã hết hạn
- Button loading: Hiển thị spinner khi đang fetch data
- Warning visible: Khi < 2 ngày, hiển thị warning card

[NAVIGATION]
- Entry: Từ Profile/Settings screen (khi click "Trạng thái dùng thử")
- Exit:
  - Button "Liên kết với phụ huynh" → Trial Expiry/Paywall screen
  - Button "Tiếp tục học" → Home/Dashboard
  - Back button → Profile/Settings screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Header: "Trạng thái dùng thử"
- Status: "Đang dùng thử" / "Sắp hết hạn" / "Đã hết hạn"
- Days: "5 ngày còn lại"
- Progress: "Đã dùng: 2/7 ngày"
- Usage: "Số lượt giải bài hôm nay: 3/5"
- Warning: "⚠️ Còn 2 ngày. Hãy liên kết với phụ huynh để tiếp tục học!"
- Button primary: "Liên kết với phụ huynh" (nếu chưa liên kết)
- Button secondary: "Tiếp tục học"
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

[ACCESSIBILITY]
- Copy buttons: Touch target ≥ 44x44px (size 32x32px, cần padding để đạt 44px)
- Copy buttons: Có semantic labels "Sao chép tên đăng nhập", "Sao chép mật khẩu", "Sao chép liên kết"
- Information card: Có semantic label "Thông tin đăng nhập cho phụ huynh"
- Success icon: Có semanticLabel "Liên kết thành công"

[STATES]
- Default: Hiển thị success message và thông tin
- Copy button pressed: Hiển thị toast "Đã sao chép [username/password/link]" trong 2 giây
- Button pressed: Scale down 0.95, duration 100-200ms
- Success: Chuyển đến Home/Dashboard sau khi click "Hoàn tất"

[NAVIGATION]
- Entry: Từ OTP Verification screen (sau khi xác thực OTP thành công)
- Exit:
  - Button "Hoàn tất" → Home/Dashboard
- Back button: Không có (hoặc disabled, vì đã hoàn tất flow)
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Title: "Liên kết thành công!"
- Description: "Tài khoản của bạn đã được liên kết với phụ huynh. Dữ liệu học tập trong 7 ngày dùng thử đã được giữ lại."
- Data note: "✅ Dữ liệu đã được lưu: 📚 45 bài tập | 🎯 8 skill | 🔥 7 ngày"
- Username label: "Tên đăng nhập:"
- Username: "0912345678" (có copy button)
- Password label: "Mật khẩu:"
- Password: "0912345678" (có copy button)
- Note: "Mật khẩu tạm thời, vui lòng đổi sau khi đăng nhập"
- Dashboard link label: "Truy cập dashboard:"
- Dashboard link: "https://dashboard.tutor.app/activate?token=..." (có copy button)
- Button: "Hoàn tất"
- Copy success toast: "Đã sao chép [username/password/link]"
```

---

## NOTES

- Tất cả màn hình onboarding phải có loading state
- Tất cả buttons phải có disabled state
- Error states: Hiển thị message rõ ràng, không technical
- Success states: Confirmation message, next action rõ ràng

---

- ← Quay lại: [Figma Prompt Library](../README.md)

