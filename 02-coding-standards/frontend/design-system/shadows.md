# SHADOWS - DESIGN SYSTEM

← Quay lại: [README.md](./README.md)

## Tổng quan

Shadow system của Tutor Platform được thiết kế để tạo depth, hierarchy, và visual separation giữa các elements. Shadows được sử dụng cho cards, buttons, modals, và các elevated elements.

## Shadow Tokens

### Theme Shadows

Theme shadows là standard shadows được sử dụng cho most UI elements.

#### Shadow Theme XS (Extra Small)

**Token:** `shadow-theme-xs`

**Value:**
```css
0px 1px 2px 0px rgba(16, 24, 40, 0.05)
```

**Usage:**
- Small buttons
- Subtle elevations
- Light separations

**Examples:**
```tsx
// ✅ ĐÚNG: Small button với shadow-xs
<button className="bg-brand-500 text-white shadow-theme-xs">
  Button
</button>

// ✅ ĐÚNG: Subtle card elevation
<div className="bg-white dark:bg-gray-dark rounded-lg shadow-theme-xs">
  Light card
</div>
```

#### Shadow Theme SM (Small)

**Token:** `shadow-theme-sm`

**Value:**
```css
0px 1px 3px 0px rgba(16, 24, 40, 0.1),
0px 1px 2px 0px rgba(16, 24, 40, 0.06)
```

**Usage:**
- Default cards
- Input focus states
- Tooltips
- Dropdowns

**Examples:**
```tsx
// ✅ ĐÚNG: Default card với shadow-sm
<div className="bg-white dark:bg-gray-dark rounded-lg shadow-theme-sm">
  Card content
</div>

// ✅ ĐÚNG: Tooltip với shadow-sm
<div className="bg-gray-900 text-white rounded-lg p-3 shadow-theme-sm">
  Tooltip content
</div>
```

#### Shadow Theme MD (Medium)

**Token:** `shadow-theme-md`

**Value:**
```css
0px 4px 8px -2px rgba(16, 24, 40, 0.1),
0px 2px 4px -2px rgba(16, 24, 40, 0.06)
```

**Usage:**
- Elevated cards
- Modals
- Popovers
- Dropdown menus

**Examples:**
```tsx
// ✅ ĐÚNG: Elevated card với shadow-md
<div className="bg-white dark:bg-gray-dark rounded-lg shadow-theme-md">
  Elevated card
</div>

// ✅ ĐÚNG: Dropdown menu với shadow-md
<div className="bg-white dark:bg-gray-dark rounded-lg shadow-theme-md">
  Dropdown content
</div>
```

#### Shadow Theme LG (Large)

**Token:** `shadow-theme-lg`

**Value:**
```css
0px 12px 16px -4px rgba(16, 24, 40, 0.08),
0px 4px 6px -2px rgba(16, 24, 40, 0.03)
```

**Usage:**
- Large modals
- Important cards
- Floating elements
- Date pickers

**Examples:**
```tsx
// ✅ ĐÚNG: Modal với shadow-lg
<div className="bg-white dark:bg-gray-dark rounded-xl shadow-theme-lg">
  Modal content
</div>

// ✅ ĐÚNG: Important card với shadow-lg
<div className="bg-white dark:bg-gray-dark rounded-lg shadow-theme-lg">
  Important content
</div>
```

#### Shadow Theme XL (Extra Large)

**Token:** `shadow-theme-xl`

**Value:**
```css
0px 20px 24px -4px rgba(16, 24, 40, 0.08),
0px 8px 8px -4px rgba(16, 24, 40, 0.03)
```

**Usage:**
- Large modals
- Full-screen overlays
- Maximum elevation
- Date picker calendar

**Examples:**
```tsx
// ✅ ĐÚNG: Large modal với shadow-xl
<div className="bg-white dark:bg-gray-dark rounded-xl shadow-theme-xl">
  Large modal content
</div>

// ✅ ĐÚNG: Date picker với shadow-xl
<div className="bg-white dark:bg-gray-dark rounded-xl shadow-theme-xl">
  Calendar
</div>
```

### Special Shadows

#### Shadow Datepicker

**Token:** `shadow-datepicker`

**Value:**
```css
-5px 0 0 #262d3c, 5px 0 0 #262d3c
```

**Usage:**
- Date range selection trong date picker
- Range highlighting

**Examples:**
```tsx
// ✅ ĐÚNG: Date range với shadow-datepicker
<div className="shadow-datepicker">
  Selected date range
</div>
```

#### Shadow Focus Ring

**Token:** `shadow-focus-ring`

**Value:**
```css
0px 0px 0px 4px rgba(70, 95, 255, 0.12)
```

**Usage:**
- Input focus states
- Button focus states
- Accessible focus indicators

**Examples:**
```tsx
// ✅ ĐÚNG: Input với focus ring
<input 
  className="focus:shadow-focus-ring focus:outline-none"
  type="text"
/>

// ✅ ĐÚNG: Button với focus ring
<button className="focus:shadow-focus-ring focus:outline-none">
  Button
</button>
```

#### Shadow Slider Navigation

**Token:** `shadow-slider-navigation`

**Value:**
```css
0px 1px 2px 0px rgba(16, 24, 40, 0.1),
0px 1px 3px 0px rgba(16, 24, 40, 0.1)
```

**Usage:**
- Carousel navigation buttons
- Slider controls
- Swiper navigation

**Examples:**
```tsx
// ✅ ĐÚNG: Slider navigation button
<button className="bg-white/90 backdrop-blur-[10px] shadow-slider-navigation">
  <ArrowIcon />
</button>
```

#### Shadow Tooltip

**Token:** `shadow-tooltip`

**Value:**
```css
0px 4px 6px -2px rgba(16, 24, 40, 0.05),
-8px 0px 20px 8px rgba(16, 24, 40, 0.05)
```

**Usage:**
- Tooltips
- Popovers với arrow
- Contextual help

**Examples:**
```tsx
// ✅ ĐÚNG: Tooltip với shadow-tooltip
<div className="bg-gray-900 text-white rounded-lg p-3 shadow-tooltip">
  Tooltip content
</div>
```

### Drop Shadow

#### Drop Shadow 4XL

**Token:** `drop-shadow-4xl`

**Value:**
```css
0 35px 35px rgba(0, 0, 0, 0.25),
0 45px 65px rgba(0, 0, 0, 0.15)
```

**Usage:**
- Hero elements
- Large decorative elements
- Special effects

**Examples:**
```tsx
// ✅ ĐÚNG: Hero element với drop-shadow
<div className="drop-shadow-4xl">
  Hero content
</div>
```

## Elevation System

### Elevation Levels

Shadows tạo elevation hierarchy:

| Level | Shadow | Usage | Z-Index |
|-------|--------|-------|---------|
| **0** | None | Base elements | - |
| **1** | `shadow-theme-xs` | Subtle elevation | - |
| **2** | `shadow-theme-sm` | Default cards | - |
| **3** | `shadow-theme-md` | Elevated cards | - |
| **4** | `shadow-theme-lg` | Modals, popovers | `z-999` |
| **5** | `shadow-theme-xl` | Large modals | `z-9999` |

### Z-Index Scale

Z-index được sử dụng cùng với shadows để tạo layering:

| Token | Value | Usage |
|-------|-------|-------|
| `z-1` | 1 | Base elements |
| `z-9` | 9 | Slightly elevated |
| `z-99` | 99 | Dropdowns, tooltips |
| `z-999` | 999 | Modals, popovers |
| `z-9999` | 9999 | Large modals |
| `z-99999` | 99999 | Toast notifications |
| `z-999999` | 999999 | Maximum z-index |

**Usage:**
```tsx
// ✅ ĐÚNG: Modal với shadow và z-index
<div className="bg-white dark:bg-gray-dark rounded-xl shadow-theme-lg z-999">
  Modal content
</div>

// ✅ ĐÚNG: Toast với maximum z-index
<div className="bg-white dark:bg-gray-dark rounded-lg shadow-theme-md z-999999">
  Toast notification
</div>
```

## Usage Guidelines

### Khi nào dùng Shadow XS

- Small buttons
- Subtle separations
- Light elevations
- Inline elements

### Khi nào dùng Shadow SM

- Default cards
- Input focus states
- Tooltips
- Small dropdowns

### Khi nào dùng Shadow MD

- Elevated cards
- Modals
- Popovers
- Dropdown menus

### Khi nào dùng Shadow LG

- Large modals
- Important cards
- Floating elements
- Date pickers

### Khi nào dùng Shadow XL

- Full-screen modals
- Maximum elevation
- Large overlays
- Calendar pickers

## Dark Mode Shadows

Shadows tự động adapt với dark mode thông qua color opacity:

```tsx
// ✅ ĐÚNG: Shadow hoạt động tốt trong cả light và dark mode
<div className="bg-white dark:bg-gray-dark rounded-lg shadow-theme-sm">
  Card content
</div>
```

**Note:** Shadow values sử dụng `rgba(16, 24, 40, ...)` - màu này hoạt động tốt trong cả light và dark mode.

## Examples

### Card với Shadows

```tsx
// ✅ ĐÚNG: Default card
<div className="bg-white dark:bg-gray-dark border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-theme-sm">
  Card content
</div>

// ✅ ĐÚNG: Elevated card
<div className="bg-white dark:bg-gray-dark border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-theme-md">
  Elevated card content
</div>

// ✅ ĐÚNG: Important card
<div className="bg-white dark:bg-gray-dark border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-theme-lg">
  Important card content
</div>
```

### Button với Shadows

```tsx
// ✅ ĐÚNG: Primary button với shadow
<button className="bg-brand-500 text-white shadow-theme-xs hover:shadow-theme-sm">
  Button
</button>

// ✅ ĐÚNG: Button không shadow (outline variant)
<button className="bg-white text-gray-700 ring-1 ring-gray-300">
  Outline Button
</button>
```

### Modal với Shadows

```tsx
// ✅ ĐÚNG: Modal với proper shadow và z-index
<div className="fixed inset-0 z-999 flex items-center justify-center">
  <div className="bg-white dark:bg-gray-dark rounded-xl p-6 shadow-theme-lg max-w-md w-full">
    <h2 className="text-title-lg font-medium mb-4">Modal Title</h2>
    <p className="text-theme-sm font-normal">Modal content</p>
  </div>
</div>
```

### Input Focus với Shadow

```tsx
// ✅ ĐÚNG: Input với focus ring shadow
<input 
  type="text"
  className="border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:shadow-focus-ring"
/>
```

### Tooltip với Shadow

```tsx
// ✅ ĐÚNG: Tooltip với shadow-tooltip
<div className="relative">
  <button>Hover me</button>
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white rounded-lg p-3 shadow-tooltip">
    Tooltip content
  </div>
</div>
```

### Date Picker với Shadow

```tsx
// ✅ ĐÚNG: Date picker calendar với shadow-xl
<div className="bg-white dark:bg-gray-dark rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-theme-xl">
  Calendar content
</div>
```

## Best Practices

1. **Consistency**: Luôn sử dụng shadow tokens, không tạo custom shadows
2. **Elevation**: Sử dụng shadows để tạo visual hierarchy
3. **Z-Index**: Combine shadows với z-index để tạo proper layering
4. **Performance**: Shadows có thể impact performance, sử dụng hợp lý
5. **Accessibility**: Đảm bảo shadows không làm giảm contrast
6. **Dark Mode**: Shadows hoạt động tốt trong cả light và dark mode

## Common Mistakes

```tsx
// ❌ SAI: Hardcode shadow
<div style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Content</div>

// ✅ ĐÚNG: Sử dụng token
<div className="shadow-theme-sm">Content</div>

// ❌ SAI: Shadow quá mạnh cho element nhỏ
<button className="shadow-theme-xl">Small Button</button>

// ✅ ĐÚNG: Shadow phù hợp với element size
<button className="shadow-theme-xs">Small Button</button>

// ❌ SAI: Không có z-index với shadow
<div className="shadow-theme-lg">Modal</div>

// ✅ ĐÚNG: Combine shadow với z-index
<div className="shadow-theme-lg z-999">Modal</div>
```

## Tài liệu liên quan

- [Colors](./colors.md) - Colors với shadows
- [Components](./components.md) - Component shadows
- [Guidelines](./guidelines.md) - Shadow best practices

---

← Quay lại: [README.md](./README.md)
