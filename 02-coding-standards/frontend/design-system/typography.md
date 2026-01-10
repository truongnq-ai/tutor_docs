# TYPOGRAPHY - DESIGN SYSTEM

← Quay lại: [README.md](./README.md)

## Tổng quan

Typography system của Tutor Platform sử dụng font Inter làm primary font family, với hai scale chính: Title scale (cho headings) và Theme scale (cho body text và UI elements).

## Font Family

### Primary Font: Inter

Inter là font chính của Tutor Platform, được sử dụng cho tất cả text content.

**Font Stack:**
```css
--font-inter: var(--font-inter), ui-sans-serif, system-ui, -apple-system, 
  BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", 
  sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", 
  "Noto Color Emoji";
```

**Usage:**
```tsx
// ✅ ĐÚNG: Sử dụng font-inter class
<body className="font-inter">

// ✅ ĐÚNG: Font được apply tự động qua body
<p>Text sẽ tự động dùng Inter font</p>
```

### Font Loading

Inter được load từ Google Fonts trong Next.js layout:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
```

## Typography Scales

### Title Scale

Title scale được sử dụng cho headings và large display text.

| Token | Size | Line Height | Usage |
|-------|------|--------------|-------|
| `text-title-2xl` | 60px | 75px | Hero headings, landing page titles |
| `text-title-xl` | 50px | 63px | Page titles, section headers |
| `text-title-lg` | 36px | 45px | Major section headings |
| `text-title-md` | 32px | 40px | Section headings |
| `text-title-sm` | 28px | 35px | Subsection headings |

**Usage:**
```tsx
// ✅ ĐÚNG: Hero heading
<h1 className="text-title-2xl font-medium">
  Welcome to Tutor Platform
</h1>

// ✅ ĐÚNG: Page title
<h1 className="text-title-xl font-medium">
  Dashboard
</h1>

// ✅ ĐÚNG: Section heading
<h2 className="text-title-lg font-medium">
  Recent Activities
</h2>

// ✅ ĐÚNG: Subsection heading
<h3 className="text-title-md font-medium">
  User Settings
</h3>

// ✅ ĐÚNG: Small heading
<h4 className="text-title-sm font-medium">
  Profile Information
</h4>
```

### Functional Title Pattern

Functional titles (tiêu đề chức năng) sử dụng responsive pattern để đảm bảo hiển thị phù hợp trên mọi kích thước màn hình.

**Responsive Pattern:**
- Mobile: `text-title-sm` (28px)
- Tablet (md): `text-title-md` (32px)
- Desktop (lg): `text-title-lg` (36px)

**Usage:**
```tsx
// ✅ ĐÚNG: Sử dụng utility class
<h1 className="text-title-functional text-gray-900 dark:text-white">
  Quản lý Admin
</h1>

// ✅ ĐÚNG: Sử dụng responsive pattern trực tiếp
<h1 className="text-title-sm md:text-title-md lg:text-title-lg font-medium">
  Quản lý Học sinh
</h1>
```

**Áp dụng cho:**
- Page titles (Quản lý Admin, Quản lý Học sinh)
- Modal titles (Tạo mới Admin, Chi tiết Học sinh)
- Section headings trong pages (nếu có)

**Rule:** Tất cả tiêu đề chức năng phải dùng cùng responsive pattern này.

### Theme Scale

Theme scale được sử dụng cho body text, labels, và UI elements.

| Token | Size | Line Height | Usage |
|-------|------|--------------|-------|
| `text-theme-xl` | 20px | 30px | Large body text, emphasized content |
| `text-theme-sm` | 14px | 20px | **Default body text**, labels, buttons |
| `text-theme-xs` | 12px | 18px | Small text, captions, helper text |

**Usage:**
```tsx
// ✅ ĐÚNG: Large body text
<p className="text-theme-xl">
  Important information or emphasized content
</p>

// ✅ ĐÚNG: Default body text
<p className="text-theme-sm">
  Regular paragraph text. This is the default size for body content.
</p>

// ✅ ĐÚNG: Small text
<p className="text-theme-xs text-gray-500">
  Helper text or captions
</p>
```

## Font Weights

### Available Weights

| Weight | Value | Usage |
|--------|-------|-------|
| `font-normal` | 400 | Default weight, body text |
| `font-medium` | 500 | **Default for headings**, emphasized text, buttons |
| `font-semibold` | 600 | Strong emphasis (ít dùng) |

**Usage:**
```tsx
// ✅ ĐÚNG: Normal weight cho body text
<p className="text-theme-sm font-normal">
  Body text với normal weight
</p>

// ✅ ĐÚNG: Medium weight cho headings
<h2 className="text-title-lg font-medium">
  Section Heading
</h2>

// ✅ ĐÚNG: Medium weight cho buttons
<button className="text-theme-sm font-medium">
  Button Text
</button>
```

## Typography Hierarchy

### Heading Hierarchy

```tsx
// ✅ ĐÚNG: Proper heading hierarchy
<h1 className="text-title-xl font-medium">Page Title</h1>
<h2 className="text-title-lg font-medium">Section Title</h2>
<h3 className="text-title-md font-medium">Subsection Title</h3>
<h4 className="text-title-sm font-medium">Sub-subsection Title</h4>
```

### Body Text Hierarchy

```tsx
// ✅ ĐÚNG: Body text với proper sizing
<p className="text-theme-xl font-normal">
  Large body text for important content
</p>
<p className="text-theme-sm font-normal">
  Default body text for regular content
</p>
<p className="text-theme-xs font-normal text-gray-500">
  Small text for captions and helper text
</p>
```

## Usage Guidelines

### Khi nào dùng Title Scale

- **Page titles**: Main heading của page
- **Section headings**: Major sections trong page
- **Card titles**: Titles trong cards
- **Modal titles**: Titles trong modals
- **Form section headings**: Headings trong forms

### Khi nào dùng Theme Scale

- **Body text**: Paragraphs, descriptions
- **Labels**: Form labels, field labels
- **Buttons**: Button text (text-theme-sm)
- **Navigation**: Menu items, links
- **Captions**: Helper text, small descriptions

### Khi nào dùng Font Weights

- **font-normal (400)**: Body text, descriptions
- **font-medium (500)**: Headings, buttons, emphasized text
- **font-semibold (600)**: Strong emphasis (ít dùng)

## Dark Mode Typography

Typography tự động adapt với dark mode thông qua color classes:

```tsx
// ✅ ĐÚNG: Text với dark mode
<h1 className="text-title-xl font-medium text-gray-900 dark:text-white/90">
  Heading
</h1>

<p className="text-theme-sm font-normal text-gray-700 dark:text-gray-300">
  Body text
</p>

<p className="text-theme-xs font-normal text-gray-500 dark:text-gray-400">
  Helper text
</p>
```

## Examples

### Page Layout

```tsx
// ✅ ĐÚNG: Complete page typography
<div>
  <h1 className="text-title-xl font-medium text-gray-900 dark:text-white/90">
    Dashboard
  </h1>
  <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400 mt-2">
    Overview of your activities and statistics
  </p>
  
  <section className="mt-8">
    <h2 className="text-title-lg font-medium text-gray-900 dark:text-white/90">
      Recent Activities
    </h2>
    <p className="text-theme-sm font-normal text-gray-700 dark:text-gray-300 mt-4">
      Your recent activities will appear here...
    </p>
  </section>
</div>
```

### Card Typography

```tsx
// ✅ ĐÚNG: Card với proper typography
<div className="bg-white dark:bg-gray-dark border border-gray-200 dark:border-gray-800 rounded-lg p-6">
  <h3 className="text-title-md font-medium text-gray-900 dark:text-white/90">
    Card Title
  </h3>
  <p className="text-theme-sm font-normal text-gray-700 dark:text-gray-300 mt-2">
    Card description and content goes here.
  </p>
  <p className="text-theme-xs font-normal text-gray-500 dark:text-gray-400 mt-4">
    Last updated: 2 hours ago
  </p>
</div>
```

### Form Typography

```tsx
// ✅ ĐÚNG: Form với proper typography
<form>
  <label className="text-theme-sm font-medium text-gray-700 dark:text-gray-300">
    Email Address
  </label>
  <input 
    type="email"
    className="text-theme-sm font-normal text-gray-900 dark:text-white/90"
    placeholder="Enter your email"
  />
  <p className="text-theme-xs font-normal text-gray-500 dark:text-gray-400 mt-1">
    We'll never share your email with anyone else.
  </p>
</form>
```

### Button Typography

```tsx
// ✅ ĐÚNG: Button text
<button className="text-theme-sm font-medium">
  Submit
</button>

// ✅ ĐÚNG: Button với icon
<button className="text-theme-sm font-medium flex items-center gap-2">
  <Icon />
  Submit
</button>
```

### Navigation Typography

```tsx
// ✅ ĐÚNG: Menu items
<nav>
  <a className="text-theme-sm font-medium text-gray-700 dark:text-gray-300">
    Dashboard
  </a>
  <a className="text-theme-sm font-medium text-brand-500 dark:text-brand-400">
    Active Item
  </a>
</nav>
```

## Best Practices

1. **Consistency**: Luôn sử dụng typography tokens, không hardcode sizes
2. **Hierarchy**: Follow proper heading hierarchy (h1 → h2 → h3 → h4)
3. **Readability**: Đảm bảo contrast ratio đủ cho accessibility
4. **Line Height**: Sử dụng line height mặc định từ tokens
5. **Font Weight**: Sử dụng font-medium cho headings và buttons
6. **Responsive**: Typography tự động scale với responsive design

## Common Mistakes

```tsx
// ❌ SAI: Hardcode font size
<h1 style={{ fontSize: '48px' }}>Title</h1>

// ✅ ĐÚNG: Sử dụng token
<h1 className="text-title-lg">Title</h1>

// ❌ SAI: Không dùng proper weight
<h2 className="text-title-lg font-normal">Heading</h2>

// ✅ ĐÚNG: Sử dụng font-medium cho headings
<h2 className="text-title-lg font-medium">Heading</h2>

// ❌ SAI: Không có dark mode variant
<p className="text-gray-900">Text</p>

// ✅ ĐÚNG: Có dark mode variant
<p className="text-gray-900 dark:text-white/90">Text</p>
```

## Tài liệu liên quan

- [Colors](./colors.md) - Color usage với typography
- [Spacing](./spacing.md) - Spacing cho typography
- [Components](./components.md) - Component typography

---

← Quay lại: [README.md](./README.md)
