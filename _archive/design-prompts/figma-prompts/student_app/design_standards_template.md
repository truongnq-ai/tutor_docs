# DESIGN STANDARDS TEMPLATE - STUDENT APP

**Project:** Tutor  
**Document type:** Design Standards Quick Reference  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-21

- ← Quay lại: [Figma Prompt Library](../README.md)

---

## Mục đích

Template này cung cấp checklist và quick reference cho các tiêu chuẩn thiết kế chung, được reference trong tất cả các prompt files để tránh lặp lại và đảm bảo tính nhất quán.

**Lưu ý:** Xem các file chi tiết trong `../../04-for-developers/coding-standards/flutter/ui-design-standards/` để biết thêm thông tin đầy đủ.

---

## 1. ACCESSIBILITY CHECKLIST

### Touch Targets
- [ ] Tất cả interactive elements ≥ **44x44px**
- [ ] Spacing ≥ **8px** giữa các touch targets
- [ ] Buttons có minimum height **44px**

### Screen Reader
- [ ] Mọi button có semantic label (từ text hoặc explicit Semantics widget)
- [ ] Mọi image có alt text (semanticLabel)
- [ ] Form fields có labels (labelText trong InputDecoration)
- [ ] Test với TalkBack (Android) / VoiceOver (iOS)

### Visual Accessibility
- [ ] Contrast ratio ≥ **4.5:1** cho normal text
- [ ] Contrast ratio ≥ **3:1** cho large text (≥18px)
- [ ] Support font scaling (không hardcode font sizes)
- [ ] Support high contrast mode (sử dụng theme colors)
- [ ] Không chỉ dùng màu để truyền đạt thông tin (kết hợp với icon/text)

### Keyboard Navigation
- [ ] Focus states rõ ràng, visible
- [ ] Tab order logical (từ trên xuống, trái sang phải)
- [ ] Tất cả interactive elements có thể access bằng keyboard

### Motion
- [ ] Respect reduced motion preference (check `MediaQuery.disableAnimations`)
- [ ] Animation duration: 200-300ms (standard), 0ms (reduced motion)

**Chi tiết:** [Accessibility Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md)

---

## 2. COLOR & TYPOGRAPHY QUICK REFERENCE

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#4CAF50` | Main actions, success states, positive feedback |
| Secondary | `#2196F3` | Information, links, secondary actions |
| Accent | `#FF9800` | Warnings, highlights, streaks, achievements |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#4CAF50` | Correct answers, completed tasks |
| Error | `#F44336` | Wrong answers, errors, destructive actions |
| Warning | `#FF9800` | Warnings, attention needed |
| Info | `#2196F3` | Information, tips |

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#F5F5F5` | Screen background |
| Surface | `#FFFFFF` | Card, container background |
| Text Primary | `#212121` | Main text, headings |
| Text Secondary | `#757575` | Secondary text, captions |
| Border | `#E0E0E0` | Borders, dividers |
| Disabled | `#BDBDBD` | Disabled states |

### Typography Scale

| Style | Size | Weight | Usage | Line Height |
|-------|------|--------|-------|-------------|
| Heading 1 | 24px | Bold (700) | Main page titles | 32px |
| Heading 2 | 20px | Semi-bold (600) | Section titles | 28px |
| Heading 3 | 18px | Semi-bold (600) | Subsection titles | 24px |
| Body | 16px | Regular (400) | Default text, paragraphs | 24px |
| Body Small | 14px | Regular (400) | Secondary text, captions | 20px |
| Caption | 12px | Regular (400) | Labels, metadata | 16px |

**Lưu ý:** 
- Font size tối thiểu **14px** cho body text
- Font size tối thiểu **12px** cho caption
- Sử dụng system default fonts (San Francisco trên iOS, Roboto trên Android)

**Chi tiết:** [Color & Typography Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md)

---

## 3. INTERACTION PATTERNS REFERENCE

### Button States

| State | Visual | Duration |
|-------|-------|----------|
| Default | Primary color background (#4CAF50) | - |
| Pressed | Scale down (0.95) hoặc darker shade (80% opacity) | 100-200ms |
| Disabled | Grey (#BDBDBD), không clickable | - |
| Loading | Show spinner, disable interaction | - |

### Feedback Patterns

| Type | Color | Pattern |
|------|-------|---------|
| Success | Green (#4CAF50) | Toast message (2-3s), checkmark animation, haptic feedback |
| Error | Red (#F44336) | Error message, red border, error icon, "Thử lại" button |
| Loading | - | Circular progress (không rõ duration) hoặc Linear progress (có duration) |

### Animation Guidelines

- **Quick feedback**: 100-200ms (button press, hover)
- **Standard transitions**: 200-300ms (page transitions, card animations)
- **Complex animations**: 300-500ms (modal, drawer)
- **Easing**: `Curves.easeInOut` (standard), `Curves.easeOut` (enter), `Curves.easeIn` (exit)

**Chi tiết:** [Interaction Patterns](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md)

---

## 4. COMPONENT SPECS QUICK REFERENCE

### Buttons

| Type | Height | Padding | Border Radius | Shadow |
|------|--------|---------|---------------|--------|
| Primary | ≥ 44px | 16px H, 12px V | 8px | Elevation 2 |
| Secondary | ≥ 44px | 16px H, 12px V | 8px | No shadow |
| Text | ≥ 44px | 8px H, 8px V | - | No shadow |
| Icon | 44x44px | - | 8px (nếu có background) | - |

### Cards

| Type | Padding | Border Radius | Shadow |
|------|---------|---------------|--------|
| Learning Card | 16px | 12px | Elevation 1 |
| Skill Card | 16px | 8px | - |
| Practice Card | 20px | 12px | - |

### Input Fields

| Type | Height | Padding | Border Radius | Border |
|------|--------|---------|---------------|--------|
| Text Input | 48px | 12px H, 14px V | 8px | 1px #E0E0E0 |
| Number Input | 48px | 12px H, 14px V | 8px | 1px #E0E0E0 |

**States:**
- Default: Grey border (#E0E0E0)
- Focused: Primary color border (#4CAF50), 2px
- Error: Red border (#F44336), error message below
- Disabled: Grey background (#F5F5F5), grey text

### Progress Indicators

| Type | Size/Height | Stroke/Width | Color |
|------|-------------|--------------|-------|
| Linear | 4px hoặc 8px | - | #4CAF50 |
| Circular | 80px (default) | 8px | #4CAF50 |

**Chi tiết:** [Components Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/components.md)

---

## 5. NAVIGATION PATTERNS

### Bottom Navigation
- **Items**: 4-5 items maximum
- **Format**: Icons + labels
- **Active state**: Color change (primary color)
- **Sections**: Home, Practice, Tutor, Progress, Profile

### AppBar Navigation
- **Back button**: Luôn hiển thị khi có thể back
- **Title**: Rõ ràng, mô tả màn hình hiện tại
- **Actions**: Tối đa 2-3 actions (ví dụ: Search, Settings)

### Deep Linking
- **Format**: `/feature/screen/id`
- **Examples**: 
  - `/practice/question/123`
  - `/progress/skill/fractions`
  - `/tutor/solve`

**Chi tiết:** [Navigation & Flow Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md)

---

## 6. SPACING SCALE

| Size | Value | Usage |
|------|-------|-------|
| XS | 4px | Tight spacing, icon padding |
| S | 8px | Default spacing, button padding |
| M | 16px | Section spacing, card padding |
| L | 24px | Large spacing, screen margins |
| XL | 32px | Extra large spacing, section gaps |
| XXL | 48px | Screen-level spacing |

---

## 7. MICROCOPY GUIDELINES

### Tone of Voice
- **Thân thiện, khuyến khích, dễ hiểu**
- Formal → Friendly: "Vui lòng nhập" → "Hãy nhập"
- Technical → Simple: "Validation failed" → "Vui lòng kiểm tra lại"
- Negative → Positive: "Bạn đã sai" → "Hãy thử lại nhé!"

### Button Labels
- **Action-oriented, rõ ràng**
- Good: "Bắt đầu học", "Nộp bài", "Xem kết quả", "Thử lại"
- Bad: "Submit", "OK", "Click here", "Continue"

### Error Messages
- **Dễ hiểu, có hướng dẫn sửa lỗi**
- Good: "Vui lòng nhập tên học sinh", "Không thể kết nối. Vui lòng kiểm tra internet và thử lại."
- Bad: "Error 500", "Validation failed", "Invalid input"

### Success Messages
- **Tích cực, khuyến khích**
- Good: "Đã lưu tiến độ!", "Làm tốt lắm! Bạn đã hoàn thành 5/10 câu."
- Bad: "Success", "Saved", "OK"

**Chi tiết:** [Navigation & Flow Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md) (phần Microcopy Guidelines)

---

## Tài liệu liên quan

- [Design Principles](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/design-principles.md) - Nguyên tắc thiết kế
- [Color & Typography](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md) - Bảng màu và typography chi tiết
- [Components](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/components.md) - Tiêu chuẩn component UI chi tiết
- [Interaction Patterns](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md) - Feedback, loading, error states chi tiết
- [Navigation & Flow](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md) - Flow patterns và navigation chi tiết
- [Accessibility](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md) - Tiêu chuẩn accessibility chi tiết

---

**Last Updated:** 2025-12-21

- ← Quay lại: [Figma Prompt Library](../README.md)

