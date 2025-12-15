# FIGMA PROMPT STANDARD – TUTOR PROJECT

**Project:** Tutor  
**Document type:** Design Prompt Standard  
**Audience:** UI/UX Designer, Figma AI  
**Status:** Draft  
**Version:** 2025-12-15-10-18  
**Author:** Education Design Expert

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này định nghĩa **cấu trúc chuẩn** cho các prompt sử dụng với Figma AI để tạo prototype tĩnh cho dự án Tutor.

---

## 2. CẤU TRÚC PROMPT CHUẨN

Mỗi prompt phải tuân theo cấu trúc sau:

```
[CONTEXT]
- Project: Tutor - AI Math Tutor for Grade 6-7
- Target User: [Student 11-13 tuổi / Parent 35-50 tuổi]
- Platform: [Mobile App / Web Dashboard]

[SCREEN PURPOSE]
- Mô tả mục đích màn hình
- User story liên quan
- Acceptance criteria

[DESIGN REQUIREMENTS]
- Layout structure
- Key components
- Data/content to display
- User interactions

[VISUAL GUIDELINES]
- Color scheme
- Typography
- Spacing
- Iconography
- Responsive behavior (nếu web)

[SPECIFICATIONS]
- Screen size
- Component dimensions
- States (default, hover, active, disabled)
- Error states (nếu có)

[CONTENT EXAMPLES]
- Sample text/content
- Placeholder data
```

---

## 3. NGUYÊN TẮC VIẾT PROMPT

### 3.1. Rõ ràng và cụ thể
- ✅ Tốt: "Button có màu xanh #4CAF50, padding 12px 24px, border-radius 8px"
- ❌ Tệ: "Button đẹp"

### 3.2. Bao gồm context
- Luôn mô tả user persona
- Luôn mô tả use case cụ thể
- Luôn tham chiếu user story

### 3.3. Định nghĩa states
- Default state
- Hover/Active state
- Disabled state
- Error state (nếu có)
- Loading state (nếu có)

### 3.4. Responsive (cho web)
- Desktop (1920px, 1440px)
- Tablet (768px)
- Mobile web (375px)

---

## 4. DESIGN SYSTEM ELEMENTS

### 4.1. Color Palette (Student App)
```
Primary: #4CAF50 (Green - tích cực, học tập)
Secondary: #2196F3 (Blue - thông tin)
Accent: #FF9800 (Orange - cảnh báo, nhắc nhở)
Success: #4CAF50
Error: #F44336
Background: #F5F5F5 (Light gray)
Text Primary: #212121
Text Secondary: #757575
```

### 4.2. Color Palette (Parent Dashboard)
```
Primary: #1976D2 (Blue - tin cậy, chuyên nghiệp)
Secondary: #424242 (Dark gray)
Accent: #FF6F00 (Orange - highlight)
Success: #4CAF50
Error: #D32F2F
Background: #FAFAFA
Text Primary: #212121
Text Secondary: #616161
```

### 4.3. Typography (Student App)
```
Heading 1: 24px, Bold
Heading 2: 20px, Semi-bold
Heading 3: 18px, Semi-bold
Body: 16px, Regular
Small: 14px, Regular
Caption: 12px, Regular
```

### 4.4. Typography (Parent Dashboard)
```
H1: 32px, Bold
H2: 24px, Semi-bold
H3: 20px, Semi-bold
Body: 16px, Regular
Small: 14px, Regular
Caption: 12px, Regular
```

### 4.5. Spacing Scale
```
XS: 4px
S: 8px
M: 16px
L: 24px
XL: 32px
XXL: 48px
```

---

## 5. COMPONENT LIBRARY

### 5.1. Buttons
- Primary Button: Rounded, filled, có shadow nhẹ
- Secondary Button: Outlined, rounded
- Text Button: Chỉ text, không border
- Icon Button: Circular, có icon

### 5.2. Input Fields
- Text Input: Rounded corners, có label, placeholder
- Number Input: Chỉ nhận số
- Image Upload: Có preview, có nút xóa

### 5.3. Cards
- Learning Card: Có icon, title, description, progress bar
- Skill Card: Hiển thị skill name, mastery level, status
- Practice Card: Hiển thị câu hỏi, options, timer

### 5.4. Progress Indicators
- Progress Bar: Linear, có percentage
- Mastery Circle: Circular progress, có số %
- Streak Badge: Hiển thị số ngày liên tiếp

---

## 6. ACCESSIBILITY REQUIREMENTS

- Contrast ratio tối thiểu 4.5:1 cho text
- Touch target tối thiểu 44x44px (mobile)
- Focus states rõ ràng
- Error messages dễ hiểu

---

## 7. VÍ DỤ PROMPT HOÀN CHỈNH

Xem các file trong thư mục `student_app/` và `parent_dashboard/` để tham khảo prompt mẫu.

---

## 8. TÀI LIỆU LIÊN QUAN

- [README.md](./README.md)
- [Student App Prompts](./student_app/)
- [Parent Dashboard Prompts](./parent_dashboard/)

