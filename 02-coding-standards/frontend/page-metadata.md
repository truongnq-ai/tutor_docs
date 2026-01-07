# PAGE METADATA - FRONTEND

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả tiêu chuẩn về page metadata cho Next.js App Router trong các module frontend của hệ thống Tutor.

## Format chuẩn

### Admin Module

Tất cả các trang trong `tutor-admin-dashboard` phải có metadata với format:

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tên trang | Tutor Admin Dashboard',
  description: 'Mô tả trang',
};
```

### Teacher Module

Tất cả các trang trong `tutor-teacher` phải có metadata với format:

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tên trang | Tutor Teacher Dashboard',
  description: 'Mô tả trang',
};
```

## Quy tắc đặt tên title

### Format

- **Cấu trúc**: `'Tên trang | [Module] Dashboard'`
- **Tên trang**: Mô tả ngắn gọn, rõ ràng về chức năng của trang
- **Suffix**: Bắt buộc phải có suffix `| Tutor Admin Dashboard` hoặc `| Tutor Teacher Dashboard`

### Ví dụ

```typescript
// ✅ ĐÚNG
export const metadata: Metadata = {
  title: 'Quản lý Môn học | Tutor Admin Dashboard',
  description: 'Quản lý danh mục môn học',
};

export const metadata: Metadata = {
  title: 'Tạo bài tập mới | Tutor Teacher Dashboard',
  description: 'Tạo bài tập mới',
};

// ❌ SAI - Thiếu suffix
export const metadata: Metadata = {
  title: 'Quản lý Môn học',
  description: 'Quản lý danh mục môn học',
};

// ❌ SAI - Sai module
export const metadata: Metadata = {
  title: 'Quản lý Môn học | Tutor Teacher Dashboard', // Trong admin module
  description: 'Quản lý danh mục môn học',
};
```

## Xử lý client components

### Vấn đề

Trong Next.js App Router, chỉ có Server Components mới có thể export `metadata`. Client Components (`'use client'`) không thể export metadata trực tiếp.

### Giải pháp: Tách thành Server + Client Component

**Pattern:**

1. **Tạo Client Component riêng** (ví dụ: `CreateExerciseContent.tsx`)
   - Di chuyển toàn bộ logic client component hiện tại
   - Giữ nguyên `'use client'` directive
   - Giữ nguyên tất cả logic và state management

2. **Chuyển page.tsx thành Server Component**
   - Export `metadata` với format đúng
   - Import và render client component đã tách

**Ví dụ:**

```typescript
// page.tsx (Server Component)
import { Metadata } from 'next';
import CreateExerciseContent from './CreateExerciseContent';

export const metadata: Metadata = {
  title: 'Tạo bài tập mới | Tutor Teacher Dashboard',
  description: 'Tạo bài tập mới',
};

export default function CreateExercisePage() {
  return <CreateExerciseContent />;
}
```

```typescript
// CreateExerciseContent.tsx (Client Component)
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// ... existing imports and logic

export default function CreateExerciseContent() {
  // ... existing logic
  return (
    // ... existing JSX
  );
}
```

### Lưu ý

- **Không được break functionality**: Giữ nguyên tất cả logic, state management, và behavior
- **Naming convention**: Client component nên có suffix `Content` (ví dụ: `CreateExerciseContent.tsx`)
- **File location**: Client component nên đặt cùng thư mục với `page.tsx`

## Best practices

### 1. Mô tả (description)

- Mô tả ngắn gọn, rõ ràng về chức năng của trang
- Sử dụng tiếng Việt
- Không quá dài (tối đa 160 ký tự)

```typescript
// ✅ ĐÚNG
export const metadata: Metadata = {
  title: 'Quản lý Bài tập | Tutor Teacher Dashboard',
  description: 'Quản lý danh sách bài tập',
};

// ❌ SAI - Quá dài
export const metadata: Metadata = {
  title: 'Quản lý Bài tập | Tutor Teacher Dashboard',
  description: 'Trang này cho phép giáo viên quản lý danh sách bài tập, bao gồm tạo mới, chỉnh sửa, xóa, và phê duyệt bài tập...',
};
```

### 2. Đặt tên title

- Sử dụng tiếng Việt
- Ngắn gọn, rõ ràng
- Phù hợp với chức năng của trang

```typescript
// ✅ ĐÚNG
title: 'Quản lý Môn học | Tutor Admin Dashboard'
title: 'Tạo bài tập mới | Tutor Teacher Dashboard'
title: 'Chi tiết đề bài | Tutor Teacher Dashboard'

// ❌ SAI - Quá dài
title: 'Trang quản lý danh sách môn học trong hệ thống | Tutor Admin Dashboard'

// ❌ SAI - Không rõ ràng
title: 'Môn học | Tutor Admin Dashboard'
```

### 3. Consistency

- Tất cả các trang trong cùng một module phải tuân thủ cùng một format
- Kiểm tra lại sau khi tạo trang mới để đảm bảo consistency

## Ví dụ minh họa

### Server Component (có metadata)

```typescript
// app/(admin)/exercises/page.tsx
import { Metadata } from 'next';
import ExerciseList from '@/components/exercises/ExerciseList';

export const metadata: Metadata = {
  title: 'Quản lý Bài tập | Tutor Teacher Dashboard',
  description: 'Quản lý danh sách bài tập',
};

export default function ExercisesPage() {
  return <ExerciseList />;
}
```

### Client Component (cần tách)

```typescript
// app/(admin)/exercises/create/page.tsx (BEFORE - SAI)
'use client';

import React, { useState } from 'react';
// ... logic

export default function CreateExercisePage() {
  // ... logic
  return (/* ... */);
}
```

```typescript
// app/(admin)/exercises/create/page.tsx (AFTER - ĐÚNG)
import { Metadata } from 'next';
import CreateExerciseContent from './CreateExerciseContent';

export const metadata: Metadata = {
  title: 'Tạo bài tập mới | Tutor Teacher Dashboard',
  description: 'Tạo bài tập mới',
};

export default function CreateExercisePage() {
  return <CreateExerciseContent />;
}
```

```typescript
// app/(admin)/exercises/create/CreateExerciseContent.tsx
'use client';

import React, { useState } from 'react';
// ... existing logic

export default function CreateExerciseContent() {
  // ... existing logic
  return (/* ... */);
}
```

## Checklist

Khi tạo hoặc sửa một trang, đảm bảo:

- [ ] Trang có export `metadata` với format đúng
- [ ] Title có suffix `| Tutor Admin Dashboard` hoặc `| Tutor Teacher Dashboard`
- [ ] Description ngắn gọn, rõ ràng
- [ ] Nếu là client component, đã tách thành server + client component
- [ ] Không break functionality sau khi refactor
- [ ] Tuân thủ naming convention

## Tài liệu liên quan

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

← Quay lại: [README.md](../README.md)

