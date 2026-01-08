# GUIDELINES - DESIGN SYSTEM

← Quay lại: [README.md](./README.md)

## Tổng quan

Tài liệu này mô tả best practices và design principles cho việc sử dụng design system của Tutor Platform. Tuân theo các guidelines này đảm bảo consistency, accessibility, và maintainability.

## Design Principles

### 1. Consistency

**Nguyên tắc:** Tất cả UI elements phải nhất quán trong toàn bộ application.

**Áp dụng:**
- Sử dụng design tokens thay vì hardcode values
- Reuse components thay vì tạo mới
- Follow patterns đã được document

**Examples:**
```tsx
// ✅ ĐÚNG: Consistent color usage
<button className="bg-brand-500 text-white">Button</button>
<div className="text-brand-500">Link</div>

// ❌ SAI: Inconsistent colors
<button className="bg-blue-500 text-white">Button</button>
<div className="text-purple-500">Link</div>
```

### 2. Accessibility

**Nguyên tắc:** Tất cả UI phải accessible cho mọi người dùng.

**Áp dụng:**
- WCAG AA compliance (minimum 4.5:1 contrast ratio)
- Keyboard navigation support
- ARIA labels cho screen readers
- Focus indicators rõ ràng
- Support `prefers-reduced-motion`

**Examples:**
```tsx
// ✅ ĐÚNG: Accessible button
<button 
  className="bg-brand-500 text-white focus:shadow-focus-ring focus:outline-none"
  aria-label="Submit form"
>
  Submit
</button>

// ✅ ĐÚNG: Accessible form
<label htmlFor="email" className="text-theme-sm font-medium">
  Email Address
</label>
<input 
  id="email"
  type="email"
  aria-describedby="email-hint"
  className="focus:shadow-focus-ring focus:outline-none"
/>
<p id="email-hint" className="text-theme-xs text-gray-500">
  We'll never share your email
</p>
```

### 3. Performance

**Nguyên tắc:** UI phải fast và responsive.

**Áp dụng:**
- Sử dụng GPU-accelerated properties (transform, opacity)
- Tránh animate width/height
- Optimize images và assets
- Lazy load khi cần

**Examples:**
```tsx
// ✅ ĐÚNG: GPU-accelerated animation
<div className="hover:scale-105 transition-transform">
  Content
</div>

// ❌ SAI: Non-GPU-accelerated animation
<div className="hover:w-full transition-all">
  Content
</div>
```

## Color Usage Guidelines

### Khi nào dùng Brand Colors

**Sử dụng brand colors cho:**
- Primary actions (buttons, links)
- Active states (selected items, current page)
- Focus states (input focus rings)
- Brand elements (logo, highlights)

**Không sử dụng brand colors cho:**
- Error states (dùng error colors)
- Success states (dùng success colors)
- Warning states (dùng warning colors)
- Neutral content (dùng gray scale)

**Examples:**
```tsx
// ✅ ĐÚNG: Brand color cho primary action
<button className="bg-brand-500 text-white">
  Primary Action
</button>

// ✅ ĐÚNG: Brand color cho active state
<a className="bg-brand-50 text-brand-500">
  Active Link
</a>

// ❌ SAI: Brand color cho error
<div className="bg-brand-500 text-white">
  Error Message
</div>

// ✅ ĐÚNG: Error color cho error
<div className="bg-error-50 text-error-700">
  Error Message
</div>
```

### Khi nào dùng Semantic Colors

**Success Colors:**
- Completed actions
- Success messages
- Positive feedback
- Validation success

**Error Colors:**
- Error messages
- Validation errors
- Destructive actions
- Critical alerts

**Warning Colors:**
- Warnings
- Cautions
- Important notices
- Pending states

**Examples:**
```tsx
// ✅ ĐÚNG: Semantic colors cho appropriate states
<div className="bg-success-50 text-success-700">
  Operation completed successfully
</div>

<div className="bg-error-50 text-error-700">
  An error occurred
</div>

<div className="bg-warning-50 text-warning-700">
  Please review before submitting
</div>
```

### Khi nào dùng Gray Scale

**Gray scale được sử dụng cho:**
- Text content (primary và secondary)
- Borders và dividers
- Backgrounds (page, cards)
- Disabled states
- Placeholder text

**Examples:**
```tsx
// ✅ ĐÚNG: Gray scale cho text
<p className="text-gray-900 dark:text-white/90">
  Primary text
</p>
<p className="text-gray-500 dark:text-gray-400">
  Secondary text
</p>

// ✅ ĐÚNG: Gray scale cho borders
<div className="border border-gray-200 dark:border-gray-800">
  Content
</div>
```

## Typography Guidelines

### Hierarchy

**Heading Hierarchy:**
- `h1`: `text-title-xl` - Page titles
- `h2`: `text-title-lg` - Section headings
- `h3`: `text-title-md` - Subsection headings
- `h4`: `text-title-sm` - Sub-subsection headings

**Body Text:**
- `text-theme-xl`: Large body text, emphasized content
- `text-theme-sm`: Default body text, labels
- `text-theme-xs`: Small text, captions, helper text

**Examples:**
```tsx
// ✅ ĐÚNG: Proper typography hierarchy
<h1 className="text-title-xl font-medium">Page Title</h1>
<h2 className="text-title-lg font-medium">Section Title</h2>
<p className="text-theme-sm font-normal">Body text</p>
<p className="text-theme-xs font-normal text-gray-500">Helper text</p>
```

### Readability

**Line Height:**
- Luôn sử dụng line height từ typography tokens
- Không override line height trừ khi cần thiết

**Font Weight:**
- `font-normal` (400): Body text
- `font-medium` (500): Headings, buttons, emphasized text
- `font-semibold` (600): Strong emphasis (ít dùng)

**Examples:**
```tsx
// ✅ ĐÚNG: Proper line height và weight
<p className="text-theme-sm font-normal">
  Body text với proper line height
</p>

// ❌ SAI: Override line height không cần thiết
<p className="text-theme-sm font-normal leading-tight">
  Body text với line height bị override
</p>
```

## Spacing Guidelines

### Rhythm

**Visual Rhythm:**
- Sử dụng consistent spacing để tạo visual rhythm
- Follow spacing scale (4px base unit)
- Sử dụng spacing tokens thay vì arbitrary values

**Examples:**
```tsx
// ✅ ĐÚNG: Consistent spacing
<div className="space-y-4">
  <div className="p-4">Item 1</div>
  <div className="p-4">Item 2</div>
  <div className="p-4">Item 3</div>
</div>

// ❌ SAI: Inconsistent spacing
<div>
  <div className="p-3">Item 1</div>
  <div className="p-5">Item 2</div>
  <div className="p-4">Item 3</div>
</div>
```

### Padding vs Margin

**Padding:**
- Internal spacing của element
- Sử dụng cho cards, buttons, inputs

**Margin:**
- External spacing giữa elements
- Sử dụng cho section spacing, element spacing

**Examples:**
```tsx
// ✅ ĐÚNG: Padding cho card content
<div className="bg-white dark:bg-gray-dark rounded-lg p-4">
  Card content
</div>

// ✅ ĐÚNG: Margin cho section spacing
<section className="mb-6">
  Section content
</section>
```

### Gap vs Margin

**Gap:**
- Spacing trong flexbox/grid containers
- Sử dụng cho item spacing trong lists, grids

**Margin:**
- Spacing giữa individual elements
- Sử dụng khi không dùng flexbox/grid

**Examples:**
```tsx
// ✅ ĐÚNG: Gap trong flexbox
<div className="flex gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>

// ✅ ĐÚNG: Margin cho individual elements
<div>
  <button className="mr-4">Button 1</button>
  <button>Button 2</button>
</div>
```

## Component Guidelines

### Khi nào tạo Component mới

**Tạo component mới khi:**
- Component được reuse trong nhiều places
- Component có complex logic hoặc state
- Component có multiple variants
- Component cần testing riêng

**Không tạo component mới khi:**
- Chỉ dùng một lần
- Quá simple (có thể dùng utility classes)
- Có thể compose từ existing components

**Examples:**
```tsx
// ✅ ĐÚNG: Tạo component vì reuse nhiều
function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-dark rounded-lg p-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-theme-xs text-gray-500">{title}</p>
          <p className="text-title-md font-medium">{value}</p>
        </div>
      </div>
    </div>
  );
}

// ❌ SAI: Không cần component cho one-off usage
function OneTimeCard() {
  return <div className="bg-white rounded-lg p-4">One time content</div>;
}
```

### Component Composition

**Compose components thay vì tạo monolith:**

```tsx
// ✅ ĐÚNG: Compose từ existing components
<Card>
  <CardHeader>
    <h3 className="text-title-md font-medium">Title</h3>
  </CardHeader>
  <CardBody>
    <p className="text-theme-sm font-normal">Content</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>

// ❌ SAI: Monolith component
<ComplexCard 
  title="Title"
  content="Content"
  buttonText="Action"
  onButtonClick={handleClick}
/>
```

## Dark Mode Guidelines

### Color Adaptation

**Light Mode → Dark Mode:**
- Backgrounds: `bg-white` → `bg-gray-dark` hoặc `bg-gray-900`
- Text: `text-gray-900` → `text-white/90`
- Borders: `border-gray-200` → `border-gray-800`
- Semantic colors: Giữ nguyên hoặc adjust opacity

**Examples:**
```tsx
// ✅ ĐÚNG: Dark mode support
<div className="
  bg-white 
  dark:bg-gray-dark 
  text-gray-900 
  dark:text-white/90 
  border 
  border-gray-200 
  dark:border-gray-800
">
  Content
</div>
```

### Testing Dark Mode

**Luôn test components trong cả light và dark mode:**
- Check contrast ratios
- Verify colors readable
- Test interactive states
- Check shadows và borders

## Responsive Design Guidelines

### Breakpoint Usage

**Mobile First:**
- Design cho mobile trước
- Add breakpoints cho larger screens
- Test trên các screen sizes

**Breakpoints:**
- `2xsm`: 375px - Very small phones
- `xsm`: 425px - Small phones
- `sm`: 640px - Large phones
- `md`: 768px - Tablets
- `lg`: 1024px - Small desktops
- `xl`: 1280px - Desktops
- `2xl`: 1536px - Large desktops
- `3xl`: 2000px - Extra large screens

**Examples:**
```tsx
// ✅ ĐÚNG: Mobile first responsive
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6
">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

// ✅ ĐÚNG: Responsive typography
<h1 className="text-title-lg md:text-title-xl lg:text-title-2xl">
  Responsive Heading
</h1>
```

### Touch Targets

**Minimum touch target size:**
- 44x44px (iOS guideline)
- 48x48px (Material Design guideline)

**Examples:**
```tsx
// ✅ ĐÚNG: Adequate touch target
<button className="h-11 w-11 min-w-[44px] min-h-[44px]">
  <Icon />
</button>

// ❌ SAI: Touch target quá nhỏ
<button className="h-6 w-6">
  <Icon />
</button>
```

## Accessibility Guidelines

### WCAG Compliance

**Contrast Ratios:**
- **Normal text**: Minimum 4.5:1
- **Large text** (18px+): Minimum 3:1
- **Interactive elements**: Minimum 3:1

**Examples:**
```tsx
// ✅ ĐÚNG: High contrast text
<div className="bg-brand-500 text-white">
  High contrast text (4.5:1+)
</div>

// ✅ ĐÚNG: Accessible gray text
<p className="text-gray-700 dark:text-gray-300">
  Accessible text (4.5:1+)
</p>

// ❌ SAI: Low contrast
<div className="bg-gray-100 text-gray-200">
  Low contrast - không đọc được
</div>
```

### Keyboard Navigation

**Tất cả interactive elements phải keyboard accessible:**
- Focus indicators rõ ràng
- Tab order hợp lý
- Enter/Space để activate
- ESC để close modals

**Examples:**
```tsx
// ✅ ĐÚNG: Keyboard accessible button
<button 
  className="
    focus:outline-none 
    focus:ring-2 
    focus:ring-brand-500 
    focus:shadow-focus-ring
  "
>
  Button
</button>

// ✅ ĐÚNG: Keyboard accessible modal
<Modal 
  isOpen={isOpen} 
  onClose={handleClose}  // ESC key support
>
  Content
</Modal>
```

### Screen Readers

**ARIA labels và semantic HTML:**
- Sử dụng semantic HTML elements
- Add ARIA labels khi cần
- Provide alt text cho images
- Use proper heading hierarchy

**Examples:**
```tsx
// ✅ ĐÚNG: Semantic HTML với ARIA
<button 
  aria-label="Close modal"
  onClick={handleClose}
>
  <CloseIcon />
</button>

// ✅ ĐÚNG: Proper heading hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

## Performance Guidelines

### Animation Performance

**GPU-Accelerated Properties:**
- `transform`: scale, translate, rotate
- `opacity`: fade in/out
- `filter`: blur, brightness (cẩn thận)

**Avoid:**
- `width`, `height`: Layout reflow
- `top`, `left`: Layout reflow
- `margin`, `padding`: Layout reflow

**Examples:**
```tsx
// ✅ ĐÚNG: GPU-accelerated
<div className="hover:scale-105 transition-transform">
  Content
</div>

// ❌ SAI: Non-GPU-accelerated
<div className="hover:w-full transition-all">
  Content
</div>
```

### Image Optimization

**Next.js Image component:**
- Automatic optimization
- Lazy loading
- Responsive images

**Examples:**
```tsx
// ✅ ĐÚNG: Optimized image
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
/>
```

## Common Patterns

### Card Pattern

```tsx
// ✅ ĐÚNG: Standard card pattern
<div className="
  bg-white 
  dark:bg-gray-dark 
  border 
  border-gray-200 
  dark:border-gray-800 
  rounded-lg 
  p-4 
  shadow-theme-sm
">
  <h3 className="text-title-md font-medium mb-2">Card Title</h3>
  <p className="text-theme-sm font-normal text-gray-700 dark:text-gray-300">
    Card content
  </p>
</div>
```

### Form Pattern

```tsx
// ✅ ĐÚNG: Standard form pattern
<form className="space-y-4">
  <div>
    <label className="block text-theme-sm font-medium mb-2">
      Label
    </label>
    <input 
      className="
        w-full 
        px-3 
        py-2.5 
        border 
        border-gray-300 
        dark:border-gray-700 
        rounded-lg
        focus:outline-none 
        focus:ring-2 
        focus:ring-brand-500
      "
    />
    <p className="text-theme-xs text-gray-500 dark:text-gray-400 mt-1">
      Helper text
    </p>
  </div>
</form>
```

### Button Group Pattern

```tsx
// ✅ ĐÚNG: Button group pattern
<div className="flex gap-4">
  <Button variant="primary">Primary</Button>
  <Button variant="outline">Secondary</Button>
</div>
```

## Tài liệu liên quan

- [Colors](./colors.md) - Color usage guidelines
- [Typography](./typography.md) - Typography guidelines
- [Spacing](./spacing.md) - Spacing guidelines
- [Components](./components.md) - Component guidelines
- [Animations](./animations.md) - Animation guidelines

---

← Quay lại: [README.md](./README.md)
