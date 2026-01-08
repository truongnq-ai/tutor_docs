# COLORS - DESIGN SYSTEM

← Quay lại: [README.md](./README.md)

## Tổng quan

Color palette của Tutor Platform được thiết kế để đảm bảo tính nhất quán, accessibility, và hỗ trợ đầy đủ dark mode. Tất cả colors được định nghĩa trong `globals.css` với Tailwind CSS v4 `@theme` syntax.

## Color System

### Brand Colors

Brand colors là màu chính của Tutor Platform, được sử dụng cho primary actions, links, và brand elements.

#### Brand Color Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-25` | `#f2f7ff` | Lightest background, subtle highlights |
| `brand-50` | `#ecf3ff` | Light background, hover states |
| `brand-100` | `#dde9ff` | Lighter background |
| `brand-200` | `#c2d6ff` | Light border, subtle elements |
| `brand-300` | `#9cb9ff` | Disabled states, inactive elements |
| `brand-400` | `#7592ff` | Secondary actions |
| `brand-500` | `#465fff` | **Primary brand color** - buttons, links, active states |
| `brand-600` | `#3641f5` | Hover states, pressed buttons |
| `brand-700` | `#2a31d8` | Active pressed states |
| `brand-800` | `#252dae` | Dark mode primary |
| `brand-900` | `#262e89` | Dark mode hover |
| `brand-950` | `#161950` | Darkest brand color |

#### Usage Guidelines

**Primary Actions:**
```tsx
// ✅ ĐÚNG: Sử dụng brand-500 cho primary buttons
<button className="bg-brand-500 text-white hover:bg-brand-600">
  Submit
</button>

// ✅ ĐÚNG: Sử dụng brand-500 cho active states
<div className="bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400">
  Active Item
</div>
```

**Hover States:**
```tsx
// ✅ ĐÚNG: Sử dụng brand-600 cho hover
<button className="bg-brand-500 hover:bg-brand-600">
  Click me
</button>
```

**Disabled States:**
```tsx
// ✅ ĐÚNG: Sử dụng brand-300 cho disabled
<button className="bg-brand-300 cursor-not-allowed" disabled>
  Disabled
</button>
```

### Gray Scale

Gray scale được sử dụng cho text, borders, backgrounds, và neutral elements.

#### Gray Color Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `gray-25` | `#fcfcfd` | Lightest background |
| `gray-50` | `#f9fafb` | Page background, card backgrounds |
| `gray-100` | `#f2f4f7` | Subtle backgrounds, dividers |
| `gray-200` | `#e4e7ec` | Borders, dividers |
| `gray-300` | `#d0d5dd` | Light borders, disabled text |
| `gray-400` | `#98a2b3` | Placeholder text, icons |
| `gray-500` | `#667085` | Secondary text, labels |
| `gray-600` | `#475467` | Body text (dark mode) |
| `gray-700` | `#344054` | Body text, emphasis |
| `gray-800` | `#1d2939` | Headings (dark mode) |
| `gray-900` | `#101828` | **Primary text color**, headings |
| `gray-950` | `#0c111d` | Darkest text (dark mode) |
| `gray-dark` | `#1a2231` | Dark mode background |

#### Usage Guidelines

**Text Colors:**
```tsx
// ✅ ĐÚNG: Sử dụng gray-900 cho primary text
<p className="text-gray-900 dark:text-white/90">
  Primary text content
</p>

// ✅ ĐÚNG: Sử dụng gray-500 cho secondary text
<p className="text-gray-500 dark:text-gray-400">
  Secondary information
</p>

// ✅ ĐÚNG: Sử dụng gray-400 cho placeholder
<input placeholder="Enter text" className="placeholder:text-gray-400" />
```

**Borders:**
```tsx
// ✅ ĐÚNG: Sử dụng gray-200 cho borders
<div className="border border-gray-200 dark:border-gray-800">
  Content
</div>
```

**Backgrounds:**
```tsx
// ✅ ĐÚNG: Sử dụng gray-50 cho page background
<body className="bg-gray-50 dark:bg-gray-900">

// ✅ ĐÚNG: Sử dụng gray-100 cho card backgrounds
<div className="bg-white dark:bg-gray-dark border border-gray-200 dark:border-gray-800">
  Card content
</div>
```

### Semantic Colors

Semantic colors được sử dụng để communicate status, feedback, và alerts.

#### Success Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success-25` | `#f6fef9` | Success background (lightest) |
| `success-50` | `#ecfdf3` | Success background |
| `success-100` | `#d1fadf` | Success background (light) |
| `success-200` | `#a6f4c5` | Success border (light) |
| `success-300` | `#6ce9a6` | Success accent |
| `success-400` | `#32d583` | Success accent (medium) |
| `success-500` | `#12b76a` | **Primary success color** |
| `success-600` | `#039855` | Success hover |
| `success-700` | `#027a48` | Success active |
| `success-800` | `#05603a` | Success dark |
| `success-900` | `#054f31` | Success darkest |
| `success-950` | `#053321` | Success darkest (dark mode) |

**Usage:**
```tsx
// ✅ ĐÚNG: Success message
<div className="bg-success-50 border border-success-200 text-success-700">
  Operation completed successfully
</div>

// ✅ ĐÚNG: Success icon
<div className="text-success-500">
  <CheckIcon />
</div>
```

#### Error Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `error-25` | `#fffbfa` | Error background (lightest) |
| `error-50` | `#fef3f2` | Error background |
| `error-100` | `#fee4e2` | Error background (light) |
| `error-200` | `#fecdca` | Error border (light) |
| `error-300` | `#fda29b` | Error accent |
| `error-400` | `#f97066` | Error accent (medium) |
| `error-500` | `#f04438` | **Primary error color** |
| `error-600` | `#d92d20` | Error hover |
| `error-700` | `#b42318` | Error active |
| `error-800` | `#912018` | Error dark |
| `error-900` | `#7a271a` | Error darkest |
| `error-950` | `#55160c` | Error darkest (dark mode) |

**Usage:**
```tsx
// ✅ ĐÚNG: Error message
<div className="bg-error-50 border border-error-200 text-error-700">
  An error occurred
</div>

// ✅ ĐÚNG: Error validation
<input className="border-error-500 focus:ring-error-500" />
```

#### Warning Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `warning-25` | `#fffcf5` | Warning background (lightest) |
| `warning-50` | `#fffaeb` | Warning background |
| `warning-100` | `#fef0c7` | Warning background (light) |
| `warning-200` | `#fedf89` | Warning border (light) |
| `warning-300` | `#fec84b` | Warning accent |
| `warning-400` | `#fdb022` | Warning accent (medium) |
| `warning-500` | `#f79009` | **Primary warning color** |
| `warning-600` | `#dc6803` | Warning hover |
| `warning-700` | `#b54708` | Warning active |
| `warning-800` | `#93370d` | Warning dark |
| `warning-900` | `#7a2e0e` | Warning darkest |
| `warning-950` | `#4e1d09` | Warning darkest (dark mode) |

**Usage:**
```tsx
// ✅ ĐÚNG: Warning message
<div className="bg-warning-50 border border-warning-200 text-warning-700">
  Please review before submitting
</div>
```

### Accent Colors

#### Blue Light

Blue light được sử dụng cho informational elements và secondary actions.

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-light-25` | `#f5fbff` | Lightest background |
| `blue-light-50` | `#f0f9ff` | Light background |
| `blue-light-100` | `#e0f2fe` | Lighter background |
| `blue-light-200` | `#b9e6fe` | Light border |
| `blue-light-300` | `#7cd4fd` | Light accent |
| `blue-light-400` | `#36bffa` | Medium accent |
| `blue-light-500` | `#0ba5ec` | **Primary blue light** |
| `blue-light-600` | `#0086c9` | Hover state |
| `blue-light-700` | `#026aa2` | Active state |
| `blue-light-800` | `#065986` | Dark variant |
| `blue-light-900` | `#0b4a6f` | Darker variant |
| `blue-light-950` | `#062c41` | Darkest variant |

**Usage:**
```tsx
// ✅ ĐÚNG: Info message
<div className="bg-blue-light-50 border border-blue-light-200 text-blue-light-700">
  Information message
</div>
```

#### Orange

Orange được sử dụng cho highlights, accents, và special elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `orange-25` | `#fffaf5` | Lightest background |
| `orange-50` | `#fff6ed` | Light background |
| `orange-100` | `#ffead5` | Lighter background |
| `orange-200` | `#fddcab` | Light border |
| `orange-300` | `#feb273` | Light accent |
| `orange-400` | `#fd853a` | Medium accent |
| `orange-500` | `#fb6514` | **Primary orange** |
| `orange-600` | `#ec4a0a` | Hover state |
| `orange-700` | `#c4320a` | Active state |
| `orange-800` | `#9c2a10` | Dark variant |
| `orange-900` | `#7e2410` | Darker variant |
| `orange-950` | `#511c10` | Darkest variant |

**Usage:**
```tsx
// ✅ ĐÚNG: Highlight badge
<span className="bg-orange-50 text-orange-700 border border-orange-200">
  New
</span>
```

### Theme Colors

#### Pink
- `theme-pink-500`: `#ee46bc` - Special accents, highlights

#### Purple
- `theme-purple-500`: `#7a5af8` - Special accents, highlights

**Usage:**
```tsx
// ✅ ĐÚNG: Special accent
<div className="text-theme-pink-500">
  Special content
</div>
```

### Base Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `white` | `#ffffff` | Pure white background, text on dark |
| `black` | `#101828` | Primary text (same as gray-900) |
| `current` | `currentColor` | Inherit text color |
| `transparent` | `transparent` | Transparent background |

**Usage:**
```tsx
// ✅ ĐÚNG: White background
<div className="bg-white dark:bg-gray-dark">

// ✅ ĐÚNG: Transparent overlay
<div className="bg-transparent">
```

## Dark Mode

Tất cả colors đều hỗ trợ dark mode thông qua Tailwind `dark:` variant.

### Dark Mode Patterns

**Backgrounds:**
```tsx
// ✅ ĐÚNG: Light background với dark mode variant
<div className="bg-white dark:bg-gray-dark">

// ✅ ĐÚNG: Gray background với dark mode
<div className="bg-gray-50 dark:bg-gray-900">
```

**Text:**
```tsx
// ✅ ĐÚNG: Text với dark mode variant
<p className="text-gray-900 dark:text-white/90">
  Primary text
</p>

// ✅ ĐÚNG: Secondary text với dark mode
<p className="text-gray-500 dark:text-gray-400">
  Secondary text
</p>
```

**Borders:**
```tsx
// ✅ ĐÚNG: Border với dark mode
<div className="border border-gray-200 dark:border-gray-800">
```

**Brand Colors trong Dark Mode:**
```tsx
// ✅ ĐÚNG: Brand color với opacity trong dark mode
<div className="bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400">
  Active item
</div>
```

## Usage Guidelines

### Khi nào dùng Brand Colors

- **Primary actions**: Buttons, links, CTAs
- **Active states**: Selected items, current page
- **Focus states**: Input focus rings
- **Brand elements**: Logo, brand highlights

### Khi nào dùng Semantic Colors

- **Success**: Completed actions, success messages, positive feedback
- **Error**: Error messages, validation errors, destructive actions
- **Warning**: Warnings, cautions, important notices

### Khi nào dùng Gray Scale

- **Text**: Primary và secondary text
- **Borders**: Dividers, card borders, input borders
- **Backgrounds**: Page backgrounds, card backgrounds, subtle highlights

### Khi nào dùng Accent Colors

- **Blue Light**: Informational messages, secondary actions
- **Orange**: Highlights, badges, special accents
- **Pink/Purple**: Special accents, decorative elements

## Color Accessibility

### Contrast Ratios

Tất cả color combinations đều đảm bảo WCAG AA compliance:
- **Text on background**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 contrast ratio

### Examples

```tsx
// ✅ ĐÚNG: High contrast text
<div className="bg-brand-500 text-white">
  High contrast text
</div>

// ✅ ĐÚNG: Accessible gray text
<p className="text-gray-700 dark:text-gray-300">
  Accessible text
</p>

// ❌ SAI: Low contrast
<div className="bg-gray-100 text-gray-200">
  Low contrast - không đọc được
</div>
```

## Examples

### Button Colors

```tsx
// Primary button
<button className="bg-brand-500 text-white hover:bg-brand-600">
  Primary Action
</button>

// Success button
<button className="bg-success-500 text-white hover:bg-success-600">
  Success Action
</button>

// Error button
<button className="bg-error-500 text-white hover:bg-error-600">
  Delete
</button>
```

### Alert Colors

```tsx
// Success alert
<div className="bg-success-50 border border-success-200 text-success-700">
  Operation completed successfully
</div>

// Error alert
<div className="bg-error-50 border border-error-200 text-error-700">
  An error occurred
</div>

// Warning alert
<div className="bg-warning-50 border border-warning-200 text-warning-700">
  Please review before submitting
</div>
```

### Card Colors

```tsx
// Default card
<div className="bg-white dark:bg-gray-dark border border-gray-200 dark:border-gray-800">
  Card content
</div>

// Branded card
<div className="bg-brand-50 dark:bg-brand-500/[0.12] border border-brand-200">
  Branded content
</div>
```

## Tài liệu liên quan

- [Typography](./typography.md) - Typography system
- [Components](./components.md) - Component usage
- [Guidelines](./guidelines.md) - Best practices

---

← Quay lại: [README.md](./README.md)
