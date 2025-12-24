# STUDENT APP - PROFILE & SETTINGS PROMPTS

**Project:** Tutor  
**Screen Group:** Profile & Settings  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

- ← Quay lại: [Figma Prompt Library](../README.md)

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

[CONTENT EXAMPLES]
- Name: "Nguyễn Văn A"
- Username: "@student123"
- Grade: "Lớp 6"
- Stats: "🔥 5 ngày | 142 bài | 65%"
- Menu: "✏️ Chỉnh sửa hồ sơ | ⚙️ Cài đặt | 🔒 Đổi mật khẩu"
- Logout: "Đăng xuất"
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

[CONTENT EXAMPLES]
- Header: "Chỉnh sửa hồ sơ"
- Avatar button: "Đổi ảnh đại diện"
- Name field: "Nguyễn Văn A"
- Username: "student123 (Không thể thay đổi)"
- Grade: "Lớp 6 (Liên hệ admin để thay đổi)"
- Button: "Lưu thay đổi"
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

[CONTENT EXAMPLES]
- Section: "Thông báo"
- Items: "🔔 Thông báo đẩy [ON] | 📧 Nhắc nhở học tập [ON]"
- Section: "Học tập"
- Items: "📊 Hiển thị thống kê [ON] | 🎮 Chế độ luyện tập: Tự động"
- Section: "Tài khoản"
- Items: "🔒 Đổi mật khẩu → | 🚪 Đăng xuất"
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

[CONTENT EXAMPLES]
- Header: "Đổi mật khẩu"
- Current password: "Nhập mật khẩu hiện tại"
- New password: "Tối thiểu 8 ký tự"
- Confirm: "Nhập lại mật khẩu mới"
- Requirements: "✓ Tối thiểu 8 ký tự | ✓ Có chữ và số"
- Button: "Đổi mật khẩu"
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

[CONTENT EXAMPLES]
- Logo: Tutor logo
- App name: "Tutor"
- Tagline: "Gia sư Toán AI cá nhân hoá"
- Version: "v1.0.0"
- FAQ: "❓ Câu hỏi thường gặp"
- Contact: "📧 support@tutor.app"
- Legal: "📄 Điều khoản sử dụng | 🔒 Chính sách bảo mật"
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

