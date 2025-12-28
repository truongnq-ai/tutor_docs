# Style, format & lint
[← Quay lại Overview](README.md)

## Lint

- ESLint `next/core-web-vitals`; TypeScript strict mode.
- Khuyến nghị giữ warning sạch trước khi commit.

## Format & quote

- Tuân thủ style JS/TS hiện hành: ưu tiên single quote, trailing comma chuẩn JS/TS, indent consistent (2 spaces).
- Có thể dùng Prettier nội bộ, miễn không xung đột quy tắc ESLint (giữ core-web-vitals).

### Prettier Configuration (Recommended)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## CSS/SCSS

- Ưu tiên tái dùng class/biến có sẵn (Tailwind CSS classes, SCSS variables), tránh lồng selector sâu, hạn chế thêm CSS thừa.
- Không yêu cầu BEM bắt buộc; tránh override mạnh vào vendor trừ khi cần.
- Sử dụng Tailwind CSS utility classes khi có thể.

### Tailwind CSS Usage

```tsx
// ✓ Good: Sử dụng Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800">Students</h2>
</div>

// ✗ Avoid: Inline styles hoặc custom CSS không cần thiết
<div style={{ display: 'flex', padding: '16px' }}>
  <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Students</h2>
</div>
```

[← Quay lại Overview](README.md)

