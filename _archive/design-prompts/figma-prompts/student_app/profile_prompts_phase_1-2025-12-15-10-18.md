# STUDENT APP - PROFILE & SETTINGS PROMPTS

**Project:** Tutor  
**Screen Group:** Profile & Settings  
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

## SCREEN 1: PROFILE OVERVIEW

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Profile Overview Screen

[SCREEN PURPOSE]
- Hiển thị thông tin cá nhân của học sinh
- Truy cập các tùy chọn cài đặt và quản lý tài khoản
- Điểm vào các màn hình con (Edit Profile, Settings, etc.)

[DESIGN REQUIREMENTS]
- Header: "Hồ sơ của tôi" + Settings icon (top right)
- Profile section:
  - Avatar: Circular, 80x80px, có thể có default icon
  - Name: "Nguyễn Văn A" (hoặc username nếu không có tên)
  - Username: "@student123"
  - Grade: "Lớp 6" hoặc "Lớp 7"
  - Status badge: "Đang học" (màu xanh) hoặc "Dùng thử" (màu cam)
- Stats cards (3 columns):
  - Card 1: "Ngày học" - "🔥 5 ngày liên tiếp"
  - Card 2: "Bài đã làm" - "142 bài"
  - Card 3: "Mastery" - "65%"
- Menu items (list):
  - "✏️ Chỉnh sửa hồ sơ" → Edit Profile
  - "⚙️ Cài đặt" → Settings
  - "🔒 Đổi mật khẩu" → Change Password
  - "ℹ️ Giới thiệu & Trợ giúp" → About/Help
  - "📊 Trạng thái dùng thử" → Trial Status (nếu là trial user)
- Account info:
  - "Tài khoản: student123"
  - "Email: student@example.com" (nếu có, từ OAuth)
  - "Liên kết với: Phụ huynh" (nếu đã liên kết)
- Logout button: "Đăng xuất" (text button, màu đỏ, ở cuối)
- Bottom navigation: Home, Practice, Tutor, Progress, Profile (active)

[VISUAL GUIDELINES]
- Background: #F5F5F5
- Profile section: White card, rounded 16px, padding 24px, shadow nhẹ
- Avatar: Circular, có border 2px màu primary
- Stats cards: White, rounded 12px, padding 16px, shadow nhẹ, 3 columns
- Menu items: White cards, rounded 12px, padding 16px, có icon bên trái, arrow bên phải
- Typography: Name 20px Bold, Username 16px Regular, Menu items 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Avatar: 80x80px
- Stats card: Height 80px minimum
- Menu item: Height 56px
- Button spacing: 12px

[ACCESSIBILITY]
- Menu items: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Menu items: Có semantic labels từ text content
- Settings icon: Touch target ≥ 44x44px, có semantic label "Cài đặt"
- Stats cards: Có semantic labels cho mỗi stat
- Avatar: Có semanticLabel "Ảnh đại diện của [tên]"
- Logout button: Có semantic label "Đăng xuất"

[STATES]
- Default: Hiển thị profile info và menu
- Loading: Skeleton cards khi đang fetch profile data
- Menu item tap: Navigate đến screen tương ứng
- Logout confirmation: Hiển thị dialog "Bạn có chắc muốn đăng xuất?" khi click logout
- Button pressed: Scale down 0.95, duration 100-200ms

[NAVIGATION]
- Entry: Từ Bottom navigation (Profile tab) hoặc từ Settings
- Exit:
  - Menu "Chỉnh sửa hồ sơ" → Edit Profile screen
  - Menu "Cài đặt" → Settings screen
  - Menu "Đổi mật khẩu" → Change Password screen
  - Menu "Trạng thái dùng thử" → Trial Status screen (nếu trial)
  - Settings icon → Settings screen
  - Logout → Auth Entry screen (sau confirmation)
  - Bottom nav: Home, Practice, Tutor, Progress
- Back button: Không có (main screen trong Profile tab)
- Deep link: `/profile` hoặc `/profile/overview`

[CONTENT EXAMPLES]
- Header: "Hồ sơ của tôi"
- Name: "Nguyễn Văn A"
- Username: "@student123"
- Grade: "Lớp 6"
- Status: "Đang học" (màu xanh) hoặc "Dùng thử" (màu cam)
- Stats: "🔥 5 ngày liên tiếp | 142 bài đã làm | Mastery 65%"
- Menu: "✏️ Chỉnh sửa hồ sơ | ⚙️ Cài đặt | 🔒 Đổi mật khẩu | ℹ️ Giới thiệu & Trợ giúp | 📊 Trạng thái dùng thử"
- Account info: "Tài khoản: student123 | Email: student@example.com | Liên kết với: Phụ huynh"
- Logout: "Đăng xuất" (màu đỏ #F44336)
- Logout confirmation: "Bạn có chắc muốn đăng xuất?"
```

---

## SCREEN 2: EDIT PROFILE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Edit Profile Screen

[SCREEN PURPOSE]
- Cho phép học sinh chỉnh sửa thông tin cá nhân
- Cập nhật avatar, tên, và các thông tin khác

[DESIGN REQUIREMENTS]
- Header: "Chỉnh sửa hồ sơ" + Back button + Save button (top right)
- Avatar section:
  - Current avatar: Circular, 100x100px, centered
  - Button "Đổi ảnh đại diện" (secondary, dưới avatar)
  - Options: "Chụp ảnh" / "Chọn từ thư viện" / "Xóa ảnh"
- Form fields:
  - Họ và tên (text input)
    - Placeholder: "Nhập họ và tên"
    - Current value: "Nguyễn Văn A"
  - Username (read-only hoặc editable tùy business logic)
    - Label: "Tên đăng nhập"
    - Value: "student123"
    - Helper: "Không thể thay đổi" (nếu read-only)
  - Lớp học (read-only)
    - Label: "Lớp học"
    - Value: "Lớp 6"
    - Helper: "Liên hệ admin để thay đổi"
- Save button: "Lưu thay đổi" (primary, fixed bottom)
- Cancel button: "Hủy" (text button, top left hoặc bottom)

[VISUAL GUIDELINES]
- Background: #F5F5F5
- Avatar section: White card, rounded 16px, padding 24px, centered
- Form fields: White background, rounded 12px, padding 16px
- Input height: 48px
- Read-only fields: Gray background (#F5F5F5), không editable
- Typography: Label 14px Regular, Input 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Avatar: 100x100px
- Input height: 48px
- Button height: 56px (fixed bottom)
- Card padding: 24px

[ACCESSIBILITY]
- Input fields: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Input fields: Có labels và helper text
- Avatar button: Touch target ≥ 44x44px
- Avatar: Có semanticLabel "Ảnh đại diện hiện tại"
- Read-only fields: Có semantic label "Không thể thay đổi"
- Save button: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)

[STATES]
- Default: Hiển thị form với current values
- Input focused: Border 2px #4CAF50
- Input error: Border #F44336, error message "Tên không được để trống"
- Avatar upload: Hiển thị preview sau khi chọn ảnh, có crop functionality
- Button enabled: Khi có thay đổi
- Button disabled: Khi chưa có thay đổi, grey (#BDBDBD)
- Button loading: Hiển thị spinner khi đang lưu
- Button pressed: Scale down 0.95, duration 100-200ms
- Success: Toast message "Đã lưu thay đổi!" và navigate back sau 1 giây

[NAVIGATION]
- Entry: Từ Profile Overview screen (khi click "Chỉnh sửa hồ sơ")
- Exit:
  - Button "Lưu thay đổi" → Profile Overview screen (sau khi save thành công)
  - Button "Hủy" → Profile Overview screen (có thể có confirmation nếu có thay đổi)
  - Back button → Profile Overview screen (có thể có confirmation nếu có thay đổi)
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Header: "Chỉnh sửa hồ sơ"
- Avatar button: "Đổi ảnh đại diện"
- Avatar options: "Chụp ảnh | Chọn từ thư viện | Xóa ảnh"
- Name label: "Họ và tên"
- Name placeholder: "Nhập họ và tên"
- Name value: "Nguyễn Văn A"
- Username label: "Tên đăng nhập"
- Username value: "student123"
- Username helper: "Không thể thay đổi"
- Grade label: "Lớp học"
- Grade value: "Lớp 6"
- Grade helper: "Liên hệ admin để thay đổi"
- Button: "Lưu thay đổi" (disabled khi chưa có thay đổi)
- Button cancel: "Hủy"
- Success toast: "Đã lưu thay đổi!"
- Error: "Tên không được để trống"
```

---

## SCREEN 3: SETTINGS

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Settings Screen

[SCREEN PURPOSE]
- Quản lý các cài đặt ứng dụng
- Tùy chỉnh trải nghiệm học tập
- Quản lý thông báo và quyền riêng tư

[DESIGN REQUIREMENTS]
- Header: "Cài đặt" + Back button
- Settings sections:
  - Section 1: "Thông báo"
    - "🔔 Thông báo đẩy" (toggle switch)
    - "📧 Nhắc nhở học tập" (toggle switch)
    - "🎯 Thông báo tiến độ" (toggle switch)
  - Section 2: "Học tập"
    - "📊 Hiển thị thống kê chi tiết" (toggle switch)
    - "🎮 Chế độ luyện tập" → Dropdown: "Tự động" / "Thủ công"
  - Section 3: "Ứng dụng"
    - "🌐 Ngôn ngữ" → "Tiếng Việt" (read-only trong Phase 1)
    - "📱 Phiên bản" → "1.0.0"
    - "💾 Dung lượng cache" → "25 MB" + Button "Xóa cache"
  - Section 4: "Tài khoản"
    - "🔒 Đổi mật khẩu" → Navigate to Change Password
    - "📊 Trạng thái dùng thử" → Navigate to Trial Status (nếu trial)
    - "🚪 Đăng xuất" (text button, màu đỏ)
- Info section (bottom):
  - "Về Tutor"
  - "Điều khoản sử dụng"
  - "Chính sách bảo mật"
  - "Liên hệ hỗ trợ"

[VISUAL GUIDELINES]
- Background: #F5F5F5
- Sections: White cards, rounded 12px, padding 16px, margin 8px
- Section headers: 14px Bold, màu #757575, padding 16px 0 8px 0
- Menu items: 16px Regular, có icon bên trái, arrow/toggle bên phải
- Toggle switches: Material Design style, màu primary khi ON
- Logout: Red text (#F44336), padding 16px
- Typography: Section title 14px Bold, Item 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Section card: Padding 16px, margin 8px
- Menu item: Height 56px
- Toggle switch: Standard Material size
- Section spacing: 16px

[ACCESSIBILITY]
- Menu items: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Toggle switches: Touch target ≥ 44x44px, có semantic labels "Bật" hoặc "Tắt"
- Menu items: Có semantic labels từ text content
- Links: Có semantic labels cho mỗi link

[STATES]
- Default: Hiển thị settings với current values
- Toggle switch ON: Primary color (#4CAF50)
- Toggle switch OFF: Grey (#BDBDBD)
- Toggle switch tap: Immediate feedback, update state
- Menu item tap: Navigate đến screen tương ứng
- Logout confirmation: Hiển thị dialog "Bạn có chắc muốn đăng xuất?" khi click logout
- Cache clear: Hiển thị confirmation dialog "Bạn có chắc muốn xóa cache?" và success toast "Đã xóa cache"

[NAVIGATION]
- Entry: Từ Profile Overview screen (khi click "Cài đặt" hoặc Settings icon)
- Exit:
  - Menu "Đổi mật khẩu" → Change Password screen
  - Menu "Trạng thái dùng thử" → Trial Status screen (nếu trial)
  - Menu "Đăng xuất" → Auth Entry screen (sau confirmation)
  - Links "Về Tutor", "Điều khoản", "Chính sách", "Liên hệ" → (có thể là webview hoặc external links)
  - Back button → Profile Overview screen
- Deep link: `/profile/settings`

[CONTENT EXAMPLES]
- Header: "Cài đặt"
- Section "Thông báo": "🔔 Thông báo đẩy [ON] | 📧 Nhắc nhở học tập [ON] | 🎯 Thông báo tiến độ [ON]"
- Section "Học tập": "📊 Hiển thị thống kê chi tiết [ON] | 🎮 Chế độ luyện tập: Tự động"
- Section "Ứng dụng": "🌐 Ngôn ngữ: Tiếng Việt | 📱 Phiên bản: 1.0.0 | 💾 Dung lượng cache: 25 MB [Xóa cache]"
- Section "Tài khoản": "🔒 Đổi mật khẩu → | 📊 Trạng thái dùng thử → | 🚪 Đăng xuất"
- Info section: "Về Tutor | Điều khoản sử dụng | Chính sách bảo mật | Liên hệ hỗ trợ"
- Logout confirmation: "Bạn có chắc muốn đăng xuất?"
- Cache clear confirmation: "Bạn có chắc muốn xóa cache?"
- Cache clear success: "Đã xóa cache thành công!"
```

---

## SCREEN 4: CHANGE PASSWORD

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Change Password Screen

[SCREEN PURPOSE]
- Cho phép học sinh đổi mật khẩu
- Bảo mật tài khoản

[DESIGN REQUIREMENTS]
- Header: "Đổi mật khẩu" + Back button
- Form fields:
  - Current password (text input, password type)
    - Label: "Mật khẩu hiện tại"
    - Placeholder: "Nhập mật khẩu hiện tại"
    - Show/hide toggle
  - New password (text input, password type)
    - Label: "Mật khẩu mới"
    - Placeholder: "Tối thiểu 8 ký tự"
    - Show/hide toggle
    - Password strength indicator (optional): Weak/Medium/Strong
  - Confirm new password (text input, password type)
    - Label: "Xác nhận mật khẩu mới"
    - Placeholder: "Nhập lại mật khẩu mới"
    - Show/hide toggle
- Password requirements (helper text):
  - "Mật khẩu phải có:"
  - "✓ Tối thiểu 8 ký tự"
  - "✓ Có chữ và số"
- Error states:
  - "Mật khẩu hiện tại không đúng"
  - "Mật khẩu mới không khớp"
  - "Mật khẩu quá yếu"
- Button "Đổi mật khẩu" (primary, disabled khi chưa điền đủ)
- Success message (sau khi đổi thành công):
  - "✅ Đã đổi mật khẩu thành công!"
  - Auto navigate back sau 2 giây

[VISUAL GUIDELINES]
- Background: #F5F5F5
- Form: White card, rounded 16px, padding 24px
- Input fields: Rounded 12px, height 48px, border 1px #E0E0E0
- Error state: Red border (#F44336), error message dưới field
- Password strength: Color-coded (red/orange/green)
- Helper text: 14px Regular, màu #757575
- Typography: Label 14px Regular, Input 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Input height: 48px
- Button height: 56px
- Card padding: 24px
- Field spacing: 16px

[ACCESSIBILITY]
- Input fields: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Input fields: Có labels và helper text
- Password fields: Có show/hide toggle với semantic label
- Password strength indicator: Có semantic label "Độ mạnh mật khẩu: Yếu/Trung bình/Mạnh"
- Button: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Error messages: Hiển thị dưới field, có icon error

[STATES]
- Default: Tất cả fields trống, button disabled
- Input focused: Border 2px #4CAF50
- Input error: Border #F44336, error message dưới field
  - Current password: "Mật khẩu hiện tại không đúng"
  - New password: "Mật khẩu quá yếu" hoặc "Mật khẩu phải có ít nhất 8 ký tự"
  - Confirm password: "Mật khẩu không khớp"
- Password strength: Color-coded indicator (red/orange/green)
- Button enabled: Khi tất cả fields hợp lệ
- Button disabled: Grey (#BDBDBD), không clickable khi chưa điền đủ hoặc invalid
- Button loading: Hiển thị spinner khi đang đổi mật khẩu
- Button pressed: Scale down 0.95, duration 100-200ms
- Success: Toast message "✅ Đã đổi mật khẩu thành công!" và auto navigate back sau 2 giây

[NAVIGATION]
- Entry: Từ Profile Overview hoặc Settings screen (khi click "Đổi mật khẩu")
- Exit:
  - Button "Đổi mật khẩu" → Profile Overview screen (sau khi save thành công, auto sau 2 giây)
  - Back button → Profile Overview hoặc Settings screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Header: "Đổi mật khẩu"
- Current password label: "Mật khẩu hiện tại"
- Current password placeholder: "Nhập mật khẩu hiện tại"
- New password label: "Mật khẩu mới"
- New password placeholder: "Tối thiểu 8 ký tự"
- Confirm password label: "Xác nhận mật khẩu mới"
- Confirm password placeholder: "Nhập lại mật khẩu mới"
- Requirements: "Mật khẩu phải có: ✓ Tối thiểu 8 ký tự | ✓ Có chữ và số"
- Password strength: "Yếu" (đỏ) / "Trung bình" (cam) / "Mạnh" (xanh)
- Button: "Đổi mật khẩu" (disabled khi chưa điền đủ hoặc invalid)
- Error current: "Mật khẩu hiện tại không đúng"
- Error new: "Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn."
- Error confirm: "Mật khẩu không khớp"
- Success: "✅ Đã đổi mật khẩu thành công!"
```

---

## SCREEN 5: ABOUT / HELP

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: About/Help Screen

[SCREEN PURPOSE]
- Hiển thị thông tin về ứng dụng
- Hướng dẫn sử dụng
- Liên hệ hỗ trợ

[DESIGN REQUIREMENTS]
- Header: "Giới thiệu & Trợ giúp" + Back button
- About section:
  - Logo: Tutor logo, 80x80px
  - App name: "Tutor"
  - Tagline: "Gia sư Toán AI cá nhân hoá"
  - Version: "Phiên bản 1.0.0"
  - Description: "Tutor là ứng dụng học Toán thông minh, giúp bạn học tập hiệu quả với AI gia sư cá nhân hoá."
- Help section:
  - "❓ Câu hỏi thường gặp" → Expandable list
    - "Làm thế nào để giải bài Toán?"
    - "Làm sao để luyện tập hiệu quả?"
    - "Tôi quên mật khẩu thì sao?"
  - "📖 Hướng dẫn sử dụng" → Link to guide (nếu có)
  - "🎥 Video hướng dẫn" → Link to videos (nếu có)
- Contact section:
  - "📧 Email hỗ trợ: support@tutor.app"
  - "💬 Chat hỗ trợ" (button, nếu có)
  - "📞 Hotline: 1900-xxxx" (nếu có)
- Legal section:
  - "📄 Điều khoản sử dụng" → Link
  - "🔒 Chính sách bảo mật" → Link
  - "ℹ️ Giấy phép" → Link
- Social links (optional):
  - "Facebook" / "YouTube" / "Website"
- Footer:
  - "© 2025 Tutor. All rights reserved."

[VISUAL GUIDELINES]
- Background: #F5F5F5
- Sections: White cards, rounded 12px, padding 20px, margin 8px
- Logo: Centered, 80x80px
- App name: 24px Bold, centered
- Version: 14px Regular, màu #757575
- Help items: Expandable cards, có icon, arrow indicator
- Contact items: Icon + text, tappable
- Links: Primary color (#4CAF50), underline
- Typography: Section title 18px Bold, Content 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Logo: 80x80px
- Card padding: 20px
- Section spacing: 16px
- Link height: 48px

[ACCESSIBILITY]
- Menu items: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Menu items: Có semantic labels từ text content
- Links: Có semantic labels cho mỗi link
- Logo: Có semanticLabel "Tutor logo"
- Expandable FAQ items: Có semantic labels cho expanded/collapsed state

[STATES]
- Default: Hiển thị about info và help sections
- FAQ expanded: Hiển thị answer, arrow indicator rotate
- FAQ collapsed: Ẩn answer, arrow indicator normal
- Link tap: Navigate đến webview hoặc external link
- Button pressed: Scale down 0.95, duration 100-200ms

[NAVIGATION]
- Entry: Từ Profile Overview screen (khi click "Giới thiệu & Trợ giúp")
- Exit:
  - Links "Điều khoản sử dụng", "Chính sách bảo mật", "Giấy phép" → Webview hoặc external browser
  - Links "Hướng dẫn sử dụng", "Video hướng dẫn" → (có thể là webview hoặc external links)
  - Contact links → Email client hoặc chat app
  - Back button → Profile Overview screen
- Deep link: `/profile/about` hoặc `/profile/help`

[CONTENT EXAMPLES]
- Header: "Giới thiệu & Trợ giúp"
- Logo: Tutor logo (80x80px)
- App name: "Tutor"
- Tagline: "Gia sư Toán AI cá nhân hoá"
- Version: "Phiên bản 1.0.0"
- Description: "Tutor là ứng dụng học Toán thông minh, giúp bạn học tập hiệu quả với AI gia sư cá nhân hoá."
- FAQ: "❓ Câu hỏi thường gặp" (expandable)
  - "Làm thế nào để giải bài Toán?" (expandable)
  - "Làm sao để luyện tập hiệu quả?" (expandable)
  - "Tôi quên mật khẩu thì sao?" (expandable)
- Help: "📖 Hướng dẫn sử dụng → | 🎥 Video hướng dẫn →"
- Contact: "📧 Email hỗ trợ: support@tutor.app | 💬 Chat hỗ trợ | 📞 Hotline: 1900-xxxx"
- Legal: "📄 Điều khoản sử dụng → | 🔒 Chính sách bảo mật → | ℹ️ Giấy phép →"
- Social: "Facebook | YouTube | Website" (optional)
- Footer: "© 2025 Tutor. All rights reserved."
```

---

## NOTES

- Tất cả màn hình profile phải có loading state khi fetch data
- Avatar upload cần có preview và crop functionality
- Settings toggles phải có immediate feedback
- Password change cần validation real-time
- About/Help có thể có deep links đến specific sections

---

- ← Quay lại: [Figma Prompt Library](../README.md)

