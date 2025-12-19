# Kiểm tra chất lượng code & làm sạch
[← Quay lại Overview](overview.md)

## Mục đích

Đảm bảo code không có lỗi syntax, warning, và loại bỏ các import không sử dụng để duy trì chất lượng code và dễ bảo trì.

## Quy trình thực hiện

### Bước 1: Kiểm tra lỗi syntax và TypeScript

- Chạy linter/compiler để phát hiện:
  - Lỗi syntax
  - Lỗi TypeScript (TS errors)
  - Warning từ TypeScript compiler
  - Warning từ ESLint
- Công cụ kiểm tra:
  - IDE linter (TypeScript Language Service trong VS Code)
  - `npm run build` hoặc `next build`
  - `npm run lint` (ESLint)
  - `tsc --noEmit` (nếu có)
- **Yêu cầu**: Không có lỗi (errors) trước khi tiếp tục.

### Bước 2: Sửa lỗi và warning

- **Ưu tiên sửa**:
  1. Lỗi syntax
  2. Lỗi TypeScript (TS errors)
  3. Warning nghiêm trọng từ ESLint
  4. Warning khác
- **Các lỗi thường gặp**:
  - `TS2554`: Sai số lượng tham số (Expected N arguments, but got M)
  - `TS2339`: Property không tồn tại trên type
  - `TS2729`: Property được sử dụng trước khi khởi tạo
  - `TS2322`: Type không khớp (Type X is not assignable to type Y)
  - `TS2532`: Object có thể là `undefined`
  - `react-hooks/exhaustive-deps`: Missing dependencies in useEffect/useMemo
- **Nguyên tắc sửa**:
  - Sửa đúng nguyên nhân, không chỉ che lỗi
  - Giữ type safety của TypeScript
  - Tuân thủ React hooks rules
  - Tuân thủ coding standards của dự án

### Bước 3: Kiểm tra và xóa unused imports

- **Kiểm tra**:
  - Import không được sử dụng trong file
  - Import chỉ xuất hiện trong khai báo nhưng không được dùng
  - Import React hooks không được sử dụng
- **Cách xác định**:
  - Dùng IDE (gạch xám/gợi ý)
  - Tìm kiếm tên import trong file
  - Kiểm tra các hooks và components
- **Xóa**:
  - Xóa import statement không sử dụng
  - Xóa import trong destructuring nếu không dùng
  - Xóa unused React hooks imports
- **Lưu ý**:
  - Không xóa import dùng trong JSX (React components)
  - Không xóa import dùng trong type annotation
  - Không xóa import dùng trong Next.js metadata/API routes

### Bước 4: Kiểm tra unused code

- **Kiểm tra**:
  - Unused variables/constants
  - Unused functions/components
  - Dead code (code không bao giờ được gọi)
- **Xử lý**:
  - Xóa code không sử dụng (nếu chắc chắn)
  - Comment code nếu có thể cần sau này (và thêm TODO)

### Bước 5: Xác minh lại

- Sau khi sửa:
  1. Chạy lại `npm run lint`
  2. Chạy lại `npm run build` (nếu có)
  3. Đảm bảo không còn lỗi/warning
  4. Đảm bảo không còn unused imports
  5. Kiểm tra code vẫn hoạt động đúng (nếu có thể test nhanh)

## Thứ tự ưu tiên

```
1. Lỗi Syntax (Errors)
   ↓
2. Lỗi TypeScript (TS Errors)
   ↓
3. Warning nghiêm trọng từ ESLint (Critical Warnings)
   ↓
4. Warning khác (Warnings)
   ↓
5. Xóa Unused Imports
   ↓
6. Xóa Unused Code
   ↓
7. Xác minh lại (Verification)
```

## Checklist sau khi chỉnh sửa file

- [ ] Không có lỗi syntax
- [ ] Không có lỗi TypeScript (TS errors)
- [ ] Không có warning nghiêm trọng từ ESLint
- [ ] Đã xóa tất cả unused imports
- [ ] Đã xóa unused code (nếu có)
- [ ] Code vẫn hoạt động đúng (nếu có thể test)
- [ ] File đã được format đúng chuẩn

## Ví dụ minh họa

### Trước khi sửa:

```typescript
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Unused import

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const router = useRouter(); // Warning: unused variable
  
  useEffect(() => {
    // fetch students
  }, []); // Warning: missing dependencies
  
  const unusedFunction = () => {
    // ...
  };
  
  return <div>Student List</div>;
}
```

### Sau khi sửa:

```typescript
import { useState, useEffect } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    // fetch students
    // ... logic
  }, []);
  
  return <div>Student List</div>;
}
```

## Công cụ hỗ trợ

- **IDE**: TypeScript Language Service, ESLint extension
- **Build tools**: `npm run build`, `next build`
- **Linter**: ESLint với Next.js rules (`next/core-web-vitals`)
- **Auto-fix**: IDE có thể tự xóa một số unused imports, ESLint `--fix`

## Lưu ý quan trọng

1. **Không bỏ qua warning**: Một số warning có thể dẫn đến lỗi runtime hoặc performance issues
2. **Không xóa import vội**: Kiểm tra kỹ trước khi xóa, đặc biệt với React hooks
3. **React hooks rules**: Tuân thủ rules của hooks (không gọi trong conditions, đúng dependencies)
4. **Test sau khi sửa**: Đảm bảo chức năng vẫn hoạt động
5. **Commit riêng**: Tách commit sửa lỗi và commit xóa unused imports để dễ review
6. **Next.js specific**: Một số import có thể được dùng trong metadata hoặc API routes

[↑ Quay lại Overview](overview.md)
