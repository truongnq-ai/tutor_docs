# SPACING - DESIGN SYSTEM

← Quay lại: [README.md](./README.md)

## Tổng quan

Spacing system của Tutor Platform sử dụng base unit 4px để tạo spacing scale nhất quán. Spacing được sử dụng cho padding, margin, gap, và layout spacing.

## Base Unit

**Base Unit: 4px**

Tất cả spacing values đều là bội số của 4px để đảm bảo tính nhất quán và alignment.

## Spacing Scale

### Standard Spacing Scale

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `0` | 0px | `p-0`, `m-0`, `gap-0` | No spacing |
| `1` | 4px | `p-1`, `m-1`, `gap-1` | Tight spacing, icons |
| `2` | 8px | `p-2`, `m-2`, `gap-2` | Small spacing, compact elements |
| `3` | 12px | `p-3`, `m-3`, `gap-3` | Medium-small spacing |
| `4` | 16px | `p-4`, `m-4`, `gap-4` | **Default spacing**, standard padding |
| `5` | 20px | `p-5`, `m-5`, `gap-5` | Medium spacing |
| `6` | 24px | `p-6`, `m-6`, `gap-6` | Large spacing, section spacing |
| `8` | 32px | `p-8`, `m-8`, `gap-8` | Extra large spacing |
| `10` | 40px | `p-10`, `m-10`, `gap-10` | Very large spacing |
| `12` | 48px | `p-12`, `m-12`, `gap-12` | Huge spacing |
| `16` | 64px | `p-16`, `m-16`, `gap-16` | Massive spacing |
| `20` | 80px | `p-20`, `m-20`, `gap-20` | Hero spacing |
| `24` | 96px | `p-24`, `m-24`, `gap-24` | Maximum spacing |

### Fractional Spacing

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `0.5` | 2px | `p-0.5`, `m-0.5`, `gap-0.5` | Very tight spacing |
| `1.5` | 6px | `p-1.5`, `m-1.5`, `gap-1.5` | Between small and medium |
| `2.5` | 10px | `p-2.5`, `m-2.5`, `gap-2.5` | Between small and default |
| `3.5` | 14px | `p-3.5`, `m-3.5`, `gap-3.5` | Between medium-small and default |

## Usage Patterns

### Padding

Padding được sử dụng cho internal spacing của elements.

**Card Padding:**
```tsx
// ✅ ĐÚNG: Standard card padding
<div className="bg-white dark:bg-gray-dark rounded-lg p-4">
  Card content
</div>

// ✅ ĐÚNG: Large card padding
<div className="bg-white dark:bg-gray-dark rounded-lg p-6">
  Large card content
</div>

// ✅ ĐÚNG: Compact card padding
<div className="bg-white dark:bg-gray-dark rounded-lg p-3">
  Compact card content
</div>
```

**Button Padding:**
```tsx
// ✅ ĐÚNG: Button padding (from Button component)
<button className="px-5 py-3.5">
  Button
</button>

// ✅ ĐÚNG: Small button padding
<button className="px-4 py-3">
  Small Button
</button>
```

**Input Padding:**
```tsx
// ✅ ĐÚNG: Input padding
<input className="px-3 py-2.5" />

// ✅ ĐÚNG: Textarea padding
<textarea className="px-3 py-2.5" />
```

### Margin

Margin được sử dụng cho external spacing giữa elements.

**Vertical Spacing:**
```tsx
// ✅ ĐÚNG: Section spacing
<section className="mb-6">
  Content
</section>

// ✅ ĐÚNG: Element spacing
<div className="mt-4">
  Next element
</div>

// ✅ ĐÚNG: Large section spacing
<section className="mb-8">
  Major section
</section>
```

**Horizontal Spacing:**
```tsx
// ✅ ĐÚNG: Horizontal spacing
<div className="flex gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### Gap

Gap được sử dụng trong flexbox và grid layouts.

**Flexbox Gap:**
```tsx
// ✅ ĐÚNG: Flexbox với gap
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// ✅ ĐÚNG: Vertical flexbox với gap
<div className="flex flex-col gap-6">
  <div>Section 1</div>
  <div>Section 2</div>
</div>
```

**Grid Gap:**
```tsx
// ✅ ĐÚNG: Grid với gap
<div className="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Spacing Guidelines

### Component Spacing

**Cards:**
- **Default padding**: `p-4` (16px)
- **Large padding**: `p-6` (24px)
- **Compact padding**: `p-3` (12px)

**Buttons:**
- **Default**: `px-5 py-3.5` (20px horizontal, 14px vertical)
- **Small**: `px-4 py-3` (16px horizontal, 12px vertical)

**Forms:**
- **Input padding**: `px-3 py-2.5` (12px horizontal, 10px vertical)
- **Label margin**: `mb-2` (8px bottom)
- **Field spacing**: `mb-4` (16px between fields)

**Sections:**
- **Section spacing**: `mb-6` hoặc `mb-8` (24px hoặc 32px)
- **Subsection spacing**: `mb-4` (16px)

### Layout Spacing

**Page Layout:**
```tsx
// ✅ ĐÚNG: Page với proper spacing
<div className="p-6">
  <h1 className="mb-4">Page Title</h1>
  <section className="mb-8">
    <h2 className="mb-4">Section Title</h2>
    <p className="mb-4">Content</p>
  </section>
</div>
```

**Card Layout:**
```tsx
// ✅ ĐÚNG: Card grid với proper spacing
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="p-4">Card 1</div>
  <div className="p-4">Card 2</div>
  <div className="p-4">Card 3</div>
</div>
```

**Form Layout:**
```tsx
// ✅ ĐÚNG: Form với proper spacing
<form className="space-y-4">
  <div>
    <label className="block mb-2">Label</label>
    <input className="w-full" />
  </div>
  <div>
    <label className="block mb-2">Label</label>
    <input className="w-full" />
  </div>
</form>
```

## Responsive Spacing

Spacing có thể thay đổi theo breakpoints:

```tsx
// ✅ ĐÚNG: Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  Responsive content
</div>

// ✅ ĐÚNG: Responsive gap
<div className="flex gap-4 md:gap-6 lg:gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ✅ ĐÚNG: Responsive margin
<section className="mb-4 md:mb-6 lg:mb-8">
  Section content
</section>
```

## Spacing Utilities

### Space Between

Sử dụng `space-y-*` và `space-x-*` cho automatic spacing:

```tsx
// ✅ ĐÚNG: Vertical spacing
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// ✅ ĐÚNG: Horizontal spacing
<div className="flex space-x-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### Negative Margin

Sử dụng negative margin khi cần overlap hoặc tight spacing:

```tsx
// ✅ ĐÚNG: Negative margin cho overlap
<div className="-mt-4">
  Overlapping content
</div>
```

## Examples

### Card Component

```tsx
// ✅ ĐÚNG: Card với proper spacing
<div className="bg-white dark:bg-gray-dark border border-gray-200 dark:border-gray-800 rounded-lg p-6">
  <h3 className="text-title-md font-medium mb-4">Card Title</h3>
  <p className="text-theme-sm font-normal mb-4">Card description</p>
  <div className="flex gap-4">
    <button>Action 1</button>
    <button>Action 2</button>
  </div>
</div>
```

### Form Component

```tsx
// ✅ ĐÚNG: Form với proper spacing
<form className="space-y-4">
  <div>
    <label className="block text-theme-sm font-medium mb-2">
      Email Address
    </label>
    <input 
      type="email"
      className="w-full px-3 py-2.5"
      placeholder="Enter email"
    />
  </div>
  <div>
    <label className="block text-theme-sm font-medium mb-2">
      Password
    </label>
    <input 
      type="password"
      className="w-full px-3 py-2.5"
      placeholder="Enter password"
    />
  </div>
  <button className="w-full">Submit</button>
</form>
```

### List Component

```tsx
// ✅ ĐÚNG: List với proper spacing
<ul className="space-y-2">
  <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
    List item 1
  </li>
  <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
    List item 2
  </li>
  <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
    List item 3
  </li>
</ul>
```

### Dashboard Layout

```tsx
// ✅ ĐÚNG: Dashboard với proper spacing
<div className="p-6">
  <h1 className="text-title-xl font-medium mb-4">Dashboard</h1>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div className="p-4 bg-white dark:bg-gray-dark rounded-lg">
      Stat Card 1
    </div>
    <div className="p-4 bg-white dark:bg-gray-dark rounded-lg">
      Stat Card 2
    </div>
    <div className="p-4 bg-white dark:bg-gray-dark rounded-lg">
      Stat Card 3
    </div>
  </div>
  
  <section className="mb-8">
    <h2 className="text-title-lg font-medium mb-4">Recent Activities</h2>
    <div className="space-y-4">
      <div className="p-4">Activity 1</div>
      <div className="p-4">Activity 2</div>
    </div>
  </section>
</div>
```

## Best Practices

1. **Consistency**: Luôn sử dụng spacing tokens, không hardcode values
2. **4px Base**: Tất cả spacing phải là bội số của 4px
3. **Visual Rhythm**: Sử dụng consistent spacing để tạo visual rhythm
4. **Padding vs Margin**: 
   - Padding: Internal spacing của element
   - Margin: External spacing giữa elements
5. **Gap vs Margin**: 
   - Gap: Spacing trong flexbox/grid containers
   - Margin: Spacing giữa individual elements
6. **Responsive**: Adjust spacing cho mobile vs desktop khi cần

## Common Mistakes

```tsx
// ❌ SAI: Hardcode spacing
<div style={{ padding: '15px' }}>Content</div>

// ✅ ĐÚNG: Sử dụng token
<div className="p-4">Content</div>

// ❌ SAI: Không phải bội số của 4px
<div className="p-[13px]">Content</div>

// ✅ ĐÚNG: Sử dụng token hợp lệ
<div className="p-3">Content</div>

// ❌ SAI: Mix padding và margin không nhất quán
<div className="p-4 mb-6">Content</div>
<div className="p-5 mb-7">Content</div>

// ✅ ĐÚNG: Consistent spacing
<div className="p-4 mb-6">Content</div>
<div className="p-4 mb-6">Content</div>
```

## Tài liệu liên quan

- [Typography](./typography.md) - Typography spacing
- [Components](./components.md) - Component spacing
- [Guidelines](./guidelines.md) - Spacing best practices

---

← Quay lại: [README.md](./README.md)
