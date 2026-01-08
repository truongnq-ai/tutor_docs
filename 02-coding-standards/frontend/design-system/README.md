# DESIGN SYSTEM - TUTOR PLATFORM

← Quay lại: [README.md](../../README.md)

## Tổng quan

Design System của Tutor Platform là bộ quy tắc, tokens, và components được sử dụng thống nhất trong toàn bộ frontend applications (tutor-teacher, tutor-admin-dashboard). Design system này đảm bảo tính nhất quán về giao diện, trải nghiệm người dùng, và dễ dàng maintain.

## Mục đích

- **Consistency**: Đảm bảo UI/UX nhất quán giữa các modules
- **Efficiency**: Tăng tốc độ phát triển với reusable components và tokens
- **Maintainability**: Dễ dàng update và maintain design system
- **Scalability**: Dễ dàng mở rộng và thêm mới components

## Cấu trúc

Design System được tổ chức thành các phần:

### Tokens
- **[Colors](./colors.md)**: Color palette (brand, semantic, gray scale)
- **[Typography](./typography.md)**: Font families, sizes, line heights
- **[Spacing](./spacing.md)**: Spacing scale và usage guidelines
- **[Shadows](./shadows.md)**: Shadow tokens và elevation system

### Components
- **[Components](./components.md)**: UI components và form components
- **[Animations](./animations.md)**: Animation system và patterns

### Guidelines
- **[Guidelines](./guidelines.md)**: Best practices và design principles
- **[Examples](./examples.md)**: Code examples cho common patterns

## Cách sử dụng

### 1. Đọc documentation

Trước khi implement component mới, đọc các file documentation để hiểu:
- Tokens nào có sẵn
- Components nào có thể reuse
- Patterns nào nên follow

### 2. Sử dụng tokens

Luôn sử dụng design tokens thay vì hardcode values:

```tsx
// ✅ ĐÚNG: Sử dụng color token
<div className="bg-brand-500 text-white">

// ❌ SAI: Hardcode color
<div style={{ backgroundColor: '#465fff' }}>
```

### 3. Reuse components

Sử dụng existing components thay vì tạo mới:

```tsx
// ✅ ĐÚNG: Sử dụng Button component
import Button from '@/components/ui/button/Button';
<Button variant="primary">Submit</Button>

// ❌ SAI: Tạo button mới
<button className="custom-button">Submit</button>
```

### 4. Follow patterns

Tuân theo patterns đã được document:

```tsx
// ✅ ĐÚNG: Follow component pattern
interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'outlined';
}

// ❌ SAI: Tạo pattern mới không document
```

## Quy tắc khi thêm mới

### Thêm mới Token

1. **Xác định nhu cầu**: Token mới có thực sự cần thiết không?
2. **Check existing**: Đã có token tương tự chưa?
3. **Update globals.css**: Thêm token vào `@theme` block
4. **Document**: Update file tương ứng (colors.md, spacing.md, etc.)
5. **Examples**: Thêm examples vào examples.md

### Thêm mới Component

1. **Check existing**: Component tương tự đã tồn tại chưa?
2. **Follow patterns**: Tuân theo component patterns đã có
3. **Use tokens**: Sử dụng design tokens, không hardcode
4. **Document**: Update components.md với component mới
5. **Examples**: Thêm examples vào examples.md

### Thêm mới Pattern

1. **Validate**: Pattern có phù hợp với design system không?
2. **Document**: Update guidelines.md hoặc tạo file mới
3. **Examples**: Thêm examples cụ thể
4. **Review**: Review với team trước khi áp dụng rộng rãi

## Tech Stack

Design System được implement với:
- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **Next.js 16.0.10**: React framework
- **TypeScript 5.9.3**: Type safety
- **React 19.2.0**: UI library

## Dark Mode

Design System hỗ trợ đầy đủ dark mode:
- Tất cả colors có dark mode variants
- Components tự động adapt với dark mode
- Sử dụng `dark:` prefix trong Tailwind classes

## Responsive Design

Design System hỗ trợ responsive với breakpoints:
- `2xsm`: 375px
- `xsm`: 425px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `3xl`: 2000px

## Tài liệu liên quan

- [State Management](../state-management.md) - State management patterns
- [UI/UX Guidelines](../ui-ux-guidelines.md) - UI/UX rules
- [General Principles](../../general-principles.md) - General coding principles

## Files trong Design System

1. **[colors.md](./colors.md)**: Color palette và usage guidelines
2. **[typography.md](./typography.md)**: Typography system và font usage
3. **[spacing.md](./spacing.md)**: Spacing scale và layout guidelines
4. **[shadows.md](./shadows.md)**: Shadow tokens và elevation system
5. **[components.md](./components.md)**: Component library và patterns
6. **[animations.md](./animations.md)**: Animation system và patterns
7. **[guidelines.md](./guidelines.md)**: Best practices và design principles
8. **[examples.md](./examples.md)**: Code examples cho common patterns

---

← Quay lại: [README.md](../../README.md)
