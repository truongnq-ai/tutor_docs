# ANIMATIONS - DESIGN SYSTEM

← Quay lại: [README.md](./README.md)

## Tổng quan

Animation system của Tutor Platform bao gồm cả animations hiện tại (transitions cơ bản) và animation system mới được thiết kế để cải thiện UX và consistency. Tất cả animations đều tuân theo principles: purposeful, fast, smooth, và accessible.

## Animation Principles

1. **Purposeful**: Mọi animation phải có mục đích rõ ràng
2. **Fast**: Animation nhanh, không làm chậm UX (100-300ms)
3. **Smooth**: Sử dụng easing functions phù hợp
4. **Accessible**: Respect `prefers-reduced-motion`

## Current Animations

### Transition Classes

Hiện tại, components sử dụng Tailwind `transition` class cho basic transitions.

**Button Transitions:**
```tsx
// ✅ ĐÚNG: Button với transition
<button className="bg-brand-500 hover:bg-brand-600 transition">
  Button
</button>
```

**Task Drag Animation:**
```css
/* Trong globals.css */
.task {
  transition: all 0.2s ease; /* Smooth transition for visual effects */
}
```

**Swiper Pagination Animation:**
```tsx
// ✅ ĐÚNG: Swiper pagination với animation
<div className="duration-200 ease-in-out">
  Pagination bullet
</div>
```

### Hover States

Hover states sử dụng transition để smooth color changes:

```tsx
// ✅ ĐÚNG: Hover với transition
<div className="bg-gray-100 hover:bg-gray-200 transition-colors">
  Hover me
</div>
```

## Animation Tokens (New)

### Duration Tokens

Animation duration tokens được thiết kế cho different use cases:

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 100ms | Micro-interactions, instant feedback |
| `duration-normal` | 200ms | **Default transitions**, most animations |
| `duration-slow` | 300ms | Page transitions, complex animations |

**Implementation:**
```css
/* Trong globals.css @theme block */
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

**Usage:**
```tsx
// ✅ ĐÚNG: Sử dụng duration tokens
<div className="transition-all duration-normal">
  Animated content
</div>
```

### Easing Tokens

Easing functions cho smooth animations:

| Token | Value | Usage |
|-------|-------|-------|
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | **Default** cho most transitions |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Enter animations, fade in |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exit animations, fade out |
| `ease-spring` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bouncy interactions, buttons |

**Implementation:**
```css
/* Trong globals.css @theme block */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Usage:**
```tsx
// ✅ ĐÚNG: Sử dụng easing tokens
<div className="transition-all duration-normal ease-out">
  Fade in content
</div>
```

## Animation Patterns (New)

### Button Interactions

Buttons có smooth interactions cho better UX.

**Hover Animation:**
- Scale: `scale(1.02)` - Subtle scale up
- Shadow: Increase shadow size
- Duration: `duration-normal` (200ms)
- Easing: `ease-out`

**Active Animation:**
- Scale: `scale(0.98)` - Pressed effect
- Duration: `duration-fast` (100ms)
- Easing: `ease-in`

**Loading Animation:**
- Pulse animation cho loading spinner
- Duration: Continuous
- Easing: Linear

**Examples:**
```tsx
// ✅ ĐÚNG: Button với hover và active animations
<button className="
  bg-brand-500 
  hover:bg-brand-600 
  hover:scale-[1.02] 
  hover:shadow-theme-sm
  active:scale-[0.98]
  transition-all 
  duration-normal 
  ease-out
">
  Button
</button>
```

### Form Interactions

Form elements có smooth focus và validation animations.

**Focus Animation:**
- Border color change: Smooth transition
- Focus ring: Fade in với `shadow-focus-ring`
- Duration: `duration-normal` (200ms)
- Easing: `ease-out`

**Error Animation:**
- Shake animation: Horizontal shake
- Duration: `duration-slow` (300ms)
- Easing: `ease-in-out`

**Success Animation:**
- Checkmark fade in
- Duration: `duration-normal` (200ms)
- Easing: `ease-out`

**Examples:**
```tsx
// ✅ ĐÚNG: Input với focus animation
<input 
  className="
    border border-gray-300 
    focus:border-brand-500 
    focus:shadow-focus-ring
    transition-all 
    duration-normal 
    ease-out
  "
/>

// ✅ ĐÚNG: Input với error shake
<input 
  className={`
    ${error ? 'animate-shake' : ''}
    transition-all 
    duration-normal
  `}
/>
```

### Page Transitions

Page transitions cho smooth navigation.

**Fade Out → Fade In:**
- Fade out: `duration-fast` (100ms)
- Fade in: `duration-normal` (200ms)
- Easing: `ease-out`

**Examples:**
```tsx
// ✅ ĐÚNG: Page transition component
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`
        transition-opacity 
        duration-normal 
        ease-out
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {children}
    </div>
  );
}
```

### Loading States

Loading states có smooth animations.

**Skeleton Loading:**
- Shimmer animation: Continuous gradient animation
- Duration: Continuous
- Easing: Linear

**Spinner Loading:**
- Rotation animation: Continuous rotation
- Duration: Continuous
- Easing: Linear

**Progress Loading:**
- Fill animation: Smooth width/height change
- Duration: `duration-slow` (300ms)
- Easing: `ease-out`

**Examples:**
```tsx
// ✅ ĐÚNG: Skeleton với shimmer
<div className="
  bg-gray-200 
  dark:bg-gray-700 
  rounded 
  animate-shimmer
  h-4
">
</div>

// ✅ ĐÚNG: Spinner với rotation
<svg className="animate-spin h-6 w-6">
  {/* Spinner SVG */}
</svg>
```

### List/Grid Animations

List và grid items có stagger animations.

**Stagger Animation:**
- Delay: 50ms per item
- Fade in + slide up
- Duration: `duration-normal` (200ms)
- Easing: `ease-out`

**Examples:**
```tsx
// ✅ ĐÚNG: List với stagger animation
{items.map((item, index) => (
  <div
    key={item.id}
    className="
      opacity-0 
      translate-y-2
      animate-fade-in 
      animate-slide-up
    "
    style={{
      animationDelay: `${index * 50}ms`,
      animationFillMode: 'forwards',
    }}
  >
    {item.content}
  </div>
))}
```

### Modal Animations

Modals có smooth open/close animations.

**Open Animation:**
- Backdrop: Fade in
- Modal: Scale up + fade in
- Duration: `duration-normal` (200ms)
- Easing: `ease-out`

**Close Animation:**
- Backdrop: Fade out
- Modal: Scale down + fade out
- Duration: `duration-fast` (100ms)
- Easing: `ease-in`

**Examples:**
```tsx
// ✅ ĐÚNG: Modal với animations
<div className={`
  fixed inset-0 
  bg-gray-400/50 
  backdrop-blur-[32px]
  transition-opacity 
  duration-normal 
  ease-out
  ${isOpen ? 'opacity-100' : 'opacity-0'}
`}>
  <div className={`
    bg-white 
    dark:bg-gray-dark 
    rounded-xl 
    shadow-theme-lg
    transition-all 
    duration-normal 
    ease-out
    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
  `}>
    Modal content
  </div>
</div>
```

## Custom Animations

### Shimmer Animation

Shimmer animation cho skeleton loading.

**Implementation:**
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
}
```

**Usage:**
```tsx
// ✅ ĐÚNG: Skeleton với shimmer
<div className="bg-gray-200 dark:bg-gray-700 rounded animate-shimmer h-20">
</div>
```

### Shake Animation

Shake animation cho error states.

**Implementation:**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
```

**Usage:**
```tsx
// ✅ ĐÚNG: Input với error shake
<input 
  className={`
    ${error ? 'animate-shake' : ''}
    border 
    ${error ? 'border-error-500' : 'border-gray-300'}
  `}
/>
```

### Fade In Animation

Fade in animation cho content appearance.

**Implementation:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
```

**Usage:**
```tsx
// ✅ ĐÚNG: Content với fade in
<div className="animate-fade-in">
  Content
</div>
```

### Slide Up Animation

Slide up animation cho content appearance.

**Implementation:**
```css
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
```

**Usage:**
```tsx
// ✅ ĐÚNG: Content với slide up
<div className="animate-slide-up">
  Content
</div>
```

### Scale In Animation

Scale in animation cho modals và popovers.

**Implementation:**
```css
@keyframes scaleIn {
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}
```

**Usage:**
```tsx
// ✅ ĐÚNG: Modal với scale in
<div className="animate-scale-in">
  Modal content
</div>
```

## Accessibility

### Prefers Reduced Motion

Tất cả animations phải respect `prefers-reduced-motion`:

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JavaScript Check:**
```tsx
// ✅ ĐÚNG: Check prefers-reduced-motion
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Sử dụng trong component
const shouldAnimate = !prefersReducedMotion();
```

**Usage:**
```tsx
// ✅ ĐÚNG: Conditional animation
<div className={shouldAnimate ? 'animate-fade-in' : ''}>
  Content
</div>
```

## Performance Best Practices

1. **Use transform và opacity**: GPU-accelerated properties
2. **Avoid animating width/height**: Sử dụng transform scale thay vì width/height
3. **Use will-change sparingly**: Chỉ dùng khi cần thiết
4. **Limit simultaneous animations**: Không animate quá nhiều elements cùng lúc

**Examples:**
```tsx
// ✅ ĐÚNG: Animate transform (GPU-accelerated)
<div className="hover:scale-105 transition-transform duration-normal">
  Content
</div>

// ❌ SAI: Animate width (không GPU-accelerated)
<div className="hover:w-full transition-all">
  Content
</div>

// ✅ ĐÚNG: Animate opacity (GPU-accelerated)
<div className="opacity-0 hover:opacity-100 transition-opacity duration-normal">
  Content
</div>
```

## Examples

### Button với Full Animations

```tsx
// ✅ ĐÚNG: Button với complete animations
<button className="
  bg-brand-500 
  text-white 
  shadow-theme-xs
  hover:bg-brand-600 
  hover:scale-[1.02] 
  hover:shadow-theme-sm
  active:scale-[0.98]
  disabled:opacity-50 
  disabled:cursor-not-allowed
  transition-all 
  duration-normal 
  ease-out
">
  {loading ? (
    <svg className="animate-spin h-4 w-4">
      {/* Spinner */}
    </svg>
  ) : (
    'Submit'
  )}
</button>
```

### Form với Validation Animations

```tsx
// ✅ ĐÚNG: Form với error/success animations
<form>
  <div>
    <input 
      className={`
        border 
        ${error ? 'border-error-500 animate-shake' : 'border-gray-300'}
        ${success ? 'border-success-500' : ''}
        focus:border-brand-500 
        focus:shadow-focus-ring
        transition-all 
        duration-normal 
        ease-out
      `}
    />
    {success && (
      <div className="animate-fade-in mt-2">
        <CheckIcon className="text-success-500" />
      </div>
    )}
  </div>
</form>
```

### List với Stagger Animation

```tsx
// ✅ ĐÚNG: List với stagger animation
<div className="space-y-4">
  {items.map((item, index) => (
    <div
      key={item.id}
      className="
        opacity-0 
        translate-y-2
        animate-fade-in 
        animate-slide-up
      "
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'forwards',
      }}
    >
      <Card>{item.content}</Card>
    </div>
  ))}
</div>
```

## Best Practices

1. **Purpose**: Mọi animation phải có mục đích rõ ràng
2. **Duration**: Sử dụng duration tokens (fast/normal/slow)
3. **Easing**: Sử dụng easing tokens phù hợp
4. **Accessibility**: Luôn check `prefers-reduced-motion`
5. **Performance**: Sử dụng transform và opacity
6. **Consistency**: Sử dụng animation patterns đã document

## Common Mistakes

```tsx
// ❌ SAI: Animation quá chậm
<div className="transition-all duration-1000">
  Content
</div>

// ✅ ĐÚNG: Sử dụng duration token
<div className="transition-all duration-normal">
  Content
</div>

// ❌ SAI: Không check prefers-reduced-motion
<div className="animate-shake">
  Content
</div>

// ✅ ĐÚNG: Check prefers-reduced-motion
<div className={!prefersReducedMotion() ? 'animate-shake' : ''}>
  Content
</div>

// ❌ SAI: Animate width/height
<div className="hover:w-full transition-all">
  Content
</div>

// ✅ ĐÚNG: Animate transform
<div className="hover:scale-105 transition-transform">
  Content
</div>
```

## Tài liệu liên quan

- [Components](./components.md) - Component animations
- [Guidelines](./guidelines.md) - Animation best practices
- [Examples](./examples.md) - Animation examples

---

← Quay lại: [README.md](./README.md)
