# Color & Typography
[← Quay lại Overview](README.md)

Tài liệu này mô tả bảng màu và hệ thống typography chuẩn cho Student App.

## Color Palette

### Primary Colors

| Color | Hex | Usage | Contrast Ratio |
|-------|-----|-------|----------------|
| Primary | `#4CAF50` | Main actions, success states, positive feedback | 4.5:1+ |
| Secondary | `#2196F3` | Information, links, secondary actions | 4.5:1+ |
| Accent | `#FF9800` | Warnings, highlights, important notices | 4.5:1+ |

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

### Color Usage Guidelines

#### Primary Color (#4CAF50 - Green)
- **Khi dùng**: Main CTA buttons, success states, progress indicators, completed tasks
- **Không dùng**: Error states, destructive actions
- **Lý do**: Màu xanh lá tạo cảm giác tích cực, phù hợp với learning context

#### Secondary Color (#2196F3 - Blue)
- **Khi dùng**: Links, information icons, secondary buttons, navigation
- **Không dùng**: Error states, warnings
- **Lý do**: Màu xanh dương tạo cảm giác tin cậy, thông tin

#### Accent Color (#FF9800 - Orange)
- **Khi dùng**: Warnings, highlights, streaks, achievements
- **Không dùng**: Primary actions, error states
- **Lý do**: Màu cam nổi bật, thu hút sự chú ý nhưng không quá nghiêm trọng

### Contrast Requirements

- **Text trên background**: Tối thiểu 4.5:1 (WCAG AA)
- **Large text (≥18px)**: Tối thiểu 3:1 (WCAG AA)
- **Interactive elements**: Tối thiểu 3:1 với background
- **Icons**: Tối thiểu 3:1 với background

## Typography

### Font Family

- **Primary**: System default (San Francisco trên iOS, Roboto trên Android)
- **Fallback**: Sans-serif
- **Không dùng**: Decorative fonts, serif fonts (khó đọc trên mobile)

### Type Scale

| Style | Size | Weight | Usage | Line Height |
|-------|------|--------|-------|-------------|
| Heading 1 | 24px | Bold (700) | Main page titles | 32px |
| Heading 2 | 20px | Semi-bold (600) | Section titles | 28px |
| Heading 3 | 18px | Semi-bold (600) | Subsection titles | 24px |
| Body Large | 16px | Regular (400) | Body text, paragraphs | 24px |
| Body | 16px | Regular (400) | Default text | 24px |
| Body Small | 14px | Regular (400) | Secondary text, captions | 20px |
| Caption | 12px | Regular (400) | Labels, metadata | 16px |

### Typography Usage

#### Heading 1 (24px Bold)
- **Khi dùng**: Main page titles, onboarding screens
- **Ví dụ**: "Chào mừng bạn đến với Tutor", "Hôm nay học gì?"
- **Không dùng**: Body text, long paragraphs

#### Heading 2 (20px Semi-bold)
- **Khi dùng**: Section titles, card titles
- **Ví dụ**: "Bài tập hôm nay", "Tiến độ học tập"
- **Không dùng**: Body text

#### Heading 3 (18px Semi-bold)
- **Khi dùng**: Subsection titles, list item titles
- **Ví dụ**: "Câu hỏi 1", "Kỹ năng: Phân số"
- **Không dùng**: Body text

#### Body (16px Regular)
- **Khi dùng**: Default text, paragraphs, descriptions
- **Ví dụ**: "Hãy chọn đáp án đúng", "Bạn đã hoàn thành 5/10 câu"
- **Minimum**: Không dùng nhỏ hơn 14px cho body text

#### Body Small (14px Regular)
- **Khi dùng**: Secondary text, helper text, metadata
- **Ví dụ**: "Cập nhật 2 giờ trước", "Gợi ý: Hãy đọc kỹ đề bài"
- **Minimum**: Không dùng nhỏ hơn 12px

#### Caption (12px Regular)
- **Khi dùng**: Labels, timestamps, metadata
- **Ví dụ**: "Đã lưu", "10:30 AM"
- **Minimum**: Không dùng nhỏ hơn 12px

### Text Styles trong Flutter

```dart
// lib/src/presentation/core/theme/app_theme.dart
TextTheme(
  headlineLarge: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    height: 1.33, // 32px / 24px
    color: Colors.grey[900], // #212121
  ),
  headlineMedium: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.4, // 28px / 20px
    color: Colors.grey[900],
  ),
  headlineSmall: TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.33, // 24px / 18px
    color: Colors.grey[900],
  ),
  bodyLarge: TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    height: 1.5, // 24px / 16px
    color: Colors.grey[900],
  ),
  bodyMedium: TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    height: 1.5,
    color: Colors.grey[900],
  ),
  bodySmall: TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    height: 1.43, // 20px / 14px
    color: Colors.grey[600], // #757575
  ),
  labelSmall: TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    height: 1.33, // 16px / 12px
    color: Colors.grey[600],
  ),
)
```

## Spacing Scale

| Size | Value | Usage |
|------|-------|-------|
| XS | 4px | Tight spacing, icon padding |
| S | 8px | Default spacing, button padding |
| M | 16px | Section spacing, card padding |
| L | 24px | Large spacing, screen margins |
| XL | 32px | Extra large spacing, section gaps |
| XXL | 48px | Screen-level spacing |

## Best Practices

### Do's
- ✅ Sử dụng Primary color cho main CTAs
- ✅ Đảm bảo contrast ratio ≥ 4.5:1 cho text
- ✅ Font size tối thiểu 14px cho body text
- ✅ Sử dụng type scale nhất quán
- ✅ Spacing rộng rãi giữa các elements

### Don'ts
- ❌ Không dùng màu đỏ cho primary actions
- ❌ Không dùng font size < 12px
- ❌ Không dùng text màu xám nhạt trên background trắng (contrast thấp)
- ❌ Không mix nhiều font families
- ❌ Không dùng decorative fonts

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Components](components.md) - Tiêu chuẩn component UI
- [Widget Implementation](widget-implementation.md) - Theme implementation trong code

[← Quay lại Overview](README.md)

