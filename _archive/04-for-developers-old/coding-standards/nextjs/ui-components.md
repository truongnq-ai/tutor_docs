# UI Components Conventions
[← Quay lại Overview](README.md)

## Actions Column & ActionsDropdown

### Tổng quan

Tất cả các màn hình có cột **Actions** (Thao tác) phải sử dụng component `ActionsDropdown` để hiển thị các hành động dưới dạng dropdown menu. Component này đảm bảo tính nhất quán về UI/UX và styling across toàn bộ ứng dụng.

### Component Location

- **Path**: `src/components/common/ActionsDropdown.tsx`
- **Type Definition**: `src/types/common.ts` - Interface `ActionItem`

### Cấu trúc ActionItem

```typescript
interface ActionItem {
  id: string;                    // Unique identifier cho action
  label: string;                 // Text hiển thị cho action
  type: 'success' | 'warning' | 'danger' | 'info';  // Loại action (quyết định màu sắc)
  icon?: ReactNode;              // Icon tùy chọn (optional)
  onClick: () => void;           // Callback khi click vào action
  disabled?: boolean;             // Trạng thái disabled (optional)
}
```

### Action Types & Màu sắc

Mỗi action type có màu sắc riêng để người dùng dễ nhận biết:

- **`success`**: Màu xanh lá (green) - Dùng cho các hành động tích cực như "Kích hoạt", "Xác nhận"
- **`warning`**: Màu vàng (yellow) - Dùng cho các hành động cảnh báo như "Tạm dừng", "Ngừng hoạt động"
- **`danger`**: Màu đỏ (red) - Dùng cho các hành động nguy hiểm như "Xóa", "Vô hiệu hóa"
- **`info`**: Màu xanh dương (blue) - Dùng cho các hành động thông tin như "Xem chi tiết", "Xem thêm"

### Animation & Styling

- **Animated Color Bar**: Mỗi action item có một dải màu ở phía dưới (height: 0.5, `h-0.5`)
- **Hover Animation**: Khi hover vào action item, dải màu sẽ chuyển động từ trái sang phải (từ `w-0` sang `w-full`)
- **Animation Duration**: 500ms (`duration-500`) với easing `ease-in-out`
- **Color Bar Position**: `absolute bottom-0 left-0`

### Cách sử dụng

#### 1. Import Component

```tsx
import ActionsDropdown from '@/components/common/ActionsDropdown';
import { ActionItem } from '@/types/common';
```

#### 2. Định nghĩa Actions

```tsx
const getActions = (item: YourItemType): ActionItem[] => {
  const actions: ActionItem[] = [
    {
      id: 'view',
      label: 'Xem chi tiết',
      type: 'info',
      icon: <EyeIcon />,
      onClick: () => handleViewDetail(item),
    },
    {
      id: 'edit',
      label: 'Chỉnh sửa',
      type: 'warning',
      icon: <EditIcon />,
      onClick: () => handleEdit(item),
      disabled: !canEdit, // Optional: disable nếu không có quyền
    },
    {
      id: 'delete',
      label: 'Xóa',
      type: 'danger',
      icon: <TrashIcon />,
      onClick: () => handleDelete(item),
    },
  ];

  // Có thể thêm logic điều kiện
  if (item.status === 'ACTIVE') {
    actions.push({
      id: 'deactivate',
      label: 'Ngừng hoạt động',
      type: 'warning',
      onClick: () => handleDeactivate(item),
    });
  }

  return actions;
};
```

#### 3. Sử dụng trong Table

```tsx
<TableCell className="px-4 py-3 text-start">
  <ActionsDropdown actions={getActions(item)} />
</TableCell>
```

### Best Practices

1. **Consistent Action Types**: Luôn sử dụng đúng action type phù hợp với hành động
2. **Icon Usage**: Nên sử dụng icon cho mỗi action để tăng tính trực quan
3. **Disabled State**: Sử dụng `disabled` prop khi action không thể thực hiện
4. **Conditional Actions**: Thêm/xóa actions dựa trên trạng thái hoặc quyền của item
5. **Error Handling**: Đảm bảo `onClick` handler có error handling phù hợp
6. **Accessibility**: Component đã được thiết kế với accessibility in mind

### Dark Mode Support

Component tự động hỗ trợ dark mode thông qua Tailwind CSS dark mode classes. Không cần thêm styling riêng.

---

## Button Loading State

### Tổng quan

Tất cả các button có hành động async (gọi API, xử lý dữ liệu) **bắt buộc** phải có loading state với các quy định sau để đảm bảo tính nhất quán về UI/UX và trải nghiệm người dùng.

### Quy định bắt buộc

#### 1. Disabled State
- Button **phải** bị disable khi đang trong trạng thái loading
- Sử dụng `disabled={loading}` prop
- Thêm class `disabled:opacity-50 disabled:cursor-not-allowed` để hiển thị trạng thái disabled rõ ràng

#### 2. Loading Spinner Icon
- **Bắt buộc** hiển thị loading spinner icon (vòng tròn xoay) phía trước text khi loading
- Spinner phải có animation xoay tròn liên tục
- Sử dụng SVG với class `animate-spin` của Tailwind CSS
- Kích thước: `h-4 w-4` (16x16px) hoặc tương đương
- Màu sắc: phù hợp với màu text của button (thường là `text-white` cho button primary)

#### 3. Text Animation
- Text phải thay đổi từ text ban đầu sang format: `"Đang [action] ..."`
- Dấu chấm (`.`) phải có animation thay đổi: `.` → `..` → `...` → `.` (lặp lại)
- Interval: Sử dụng constant `BUTTON_LOADING_CONFIG.DOTS_ANIMATION_INTERVAL` từ `@/lib/config/ui.config` (mặc định: 500ms)
- Animation phải mượt và rõ ràng
- **Bắt buộc**: Không được hardcode interval, phải sử dụng constant để dễ điều chỉnh

#### 4. Layout & Spacing
- Button phải sử dụng `flex items-center gap-2` để căn chỉnh icon và text
- Icon và text phải được căn giữa theo chiều dọc

### Ví dụ Text Mapping

| Text ban đầu | Text khi loading |
|--------------|------------------|
| "Tạo bài tập" | "Đang tạo..." |
| "Lưu" | "Đang lưu..." |
| "Xóa" | "Đang xóa..." |
| "Cập nhật" | "Đang cập nhật..." |
| "Gửi" | "Đang gửi..." |
| "Tải lên" | "Đang tải lên..." |
| "Xác nhận" | "Đang xác nhận..." |

### Configuration

Tất cả các cấu hình liên quan đến button loading state được tập trung trong file `src/lib/config/ui.config.ts` để dễ dàng điều chỉnh:

```typescript
export const BUTTON_LOADING_CONFIG = {
  /**
   * Interval (in milliseconds) for loading dots animation
   * Controls how fast the dots change: . → .. → ... → .
   * Default: 500ms
   */
  DOTS_ANIMATION_INTERVAL: 500,
} as const;
```

**Lưu ý**: 
- Để thay đổi tốc độ animation, chỉ cần sửa giá trị `DOTS_ANIMATION_INTERVAL` trong file config
- Tất cả button trong project sẽ tự động sử dụng giá trị mới
- Không được hardcode interval trong code, phải sử dụng constant

### Implementation Pattern

#### 1. Import Configuration

```tsx
import { BUTTON_LOADING_CONFIG } from '@/lib/config/ui.config';
```

#### 2. State Management

```tsx
const [loading, setLoading] = useState(false);
const [loadingDots, setLoadingDots] = useState('.');

// Animation for loading dots
useEffect(() => {
  if (loading) {
    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev === '.') return '..';
        if (prev === '..') return '...';
        return '.';
      });
    }, BUTTON_LOADING_CONFIG.DOTS_ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  } else {
    setLoadingDots('.');
  }
}, [loading]);
```

#### 3. Loading Spinner Component

```tsx
{loading && (
  <svg
    className="animate-spin h-4 w-4 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)}
```

#### 4. Button Implementation

```tsx
<button
  type="submit"
  disabled={loading}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
>
  {loading && (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )}
  {loading ? `Đang tạo${loadingDots}` : 'Tạo bài tập'}
</button>
```

### Complete Example

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { BUTTON_LOADING_CONFIG } from '@/lib/config/ui.config';

export default function ExampleForm() {
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('.');

  // Animation for loading dots
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === '.') return '..';
          if (prev === '..') return '...';
          return '.';
        });
      }, BUTTON_LOADING_CONFIG.DOTS_ANIMATION_INTERVAL);

      return () => clearInterval(interval);
    } else {
      setLoadingDots('.');
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call or async operation
      await someAsyncOperation();
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {loading ? `Đang lưu${loadingDots}` : 'Lưu'}
      </button>
    </form>
  );
}
```

### Best Practices

1. **Consistent Loading Text**: Luôn sử dụng format `"Đang [action]..."` cho tất cả button
2. **Animation Timing**: Giữ interval 500ms để animation mượt mà và không quá nhanh
3. **Spinner Size**: Sử dụng kích thước phù hợp với button (thường là `h-4 w-4` cho button nhỏ, `h-5 w-5` cho button lớn)
4. **Color Consistency**: Spinner color phải phù hợp với text color của button
5. **Cleanup**: Luôn cleanup interval trong useEffect để tránh memory leak
6. **Reset State**: Reset `loadingDots` về `'.'` khi loading kết thúc
7. **Accessibility**: Button disabled state đã được xử lý tự động bởi browser, đảm bảo screen reader có thể đọc được trạng thái

### Dark Mode Support

Loading spinner và button tự động hỗ trợ dark mode thông qua Tailwind CSS dark mode classes. Không cần thêm styling riêng.

### Checklist khi implement

- [ ] Button có `disabled={loading}` prop
- [ ] Button có class `disabled:opacity-50 disabled:cursor-not-allowed`
- [ ] Button có class `flex items-center gap-2`
- [ ] Loading spinner icon được hiển thị khi `loading === true`
- [ ] Spinner có class `animate-spin`
- [ ] Text thay đổi từ text ban đầu sang `"Đang [action]..."`
- [ ] Dấu chấm có animation: `.` → `..` → `...` → `.`
- [ ] Interval được cleanup trong useEffect
- [ ] `loadingDots` được reset về `'.'` khi loading kết thúc

---

## Clickable ID Column

### Tổng quan

Tất cả các màn hình danh sách có cột **ID** phải cho phép click vào giá trị ID để điều hướng đến trang chi tiết tương ứng. ID sẽ được hiển thị theo format `...xxx` trong đó `xxx` là 3 ký tự cuối cùng của UUID để tiết kiệm không gian và tăng tính nhất quán.

### Format hiển thị cột ID

**Quy định bắt buộc**: Tất cả các cột ID trong bảng danh sách phải hiển thị theo format `...xxx` trong đó `xxx` là 3 ký tự cuối cùng của UUID.

#### Quy tắc format

- **Format**: `...xxx` (3 ký tự cuối của UUID)
- **Ví dụ**: 
  - `019b452c-e31e-75b3-b7d9-02cd5b31459d` → `...59d`
  - `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → `...890`
  - `123` → `123` (nếu ID có ≤ 3 ký tự, hiển thị nguyên ID)
- **Utility Function**: `formatIdShort()` trong `src/lib/utils/formatters.ts`
- **Bắt buộc**: Không được hardcode format, phải sử dụng `formatIdShort()` function

#### Lý do sử dụng format này

1. **Tiết kiệm không gian**: UUID thường rất dài (36 ký tự), format ngắn gọn giúp bảng gọn hơn
2. **Dễ nhận biết**: 3 ký tự cuối đủ để phân biệt các item trong cùng một view
3. **Nhất quán**: Tất cả các màn hình danh sách sử dụng cùng một format
4. **Clickable**: Vẫn có thể click để xem chi tiết đầy đủ

### Utility Function

```typescript
/**
 * Format ID to show only last 3 characters with ellipsis prefix
 * Example: "019b452c-e31e-75b3-b7d9-02cd5b31459d" -> "...59d"
 */
export function formatIdShort(id: string | null | undefined): string {
  if (!id) {
    return '';
  }
  if (id.length <= 3) {
    return id;
  }
  return '...' + id.slice(-3);
}
```

### Styling Pattern

Tất cả các ID cell phải có các classes sau:

- `cursor-pointer` - Hiển thị pointer cursor khi hover
- `hover:text-blue-600 dark:hover:text-blue-400` - Hover effect với màu xanh
- `font-mono` - Font monospace để dễ đọc ID

### Cách sử dụng

#### 1. Import Utility Function

```tsx
import { formatIdShort } from '@/lib/utils/formatters';
import { useRouter } from 'next/navigation';
```

#### 2. Implementation cho Navigation (Exercises, Questions)

```tsx
const router = useRouter();

<TableCell 
  className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-white/90 font-mono cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
  onClick={() => router.push(`/content/exercises/${exercise.id}`)}
>
  {formatIdShort(exercise.id)}
</TableCell>
```

#### 3. Implementation với Event Bubbling (khi row có onClick)

```tsx
<TableRow
  onClick={() => router.push(`/content/questions/${question.id}`)}
>
  <TableCell 
    className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-white/90 font-mono cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
    onClick={(e) => {
      e.stopPropagation(); // Ngăn event bubbling nếu row có onClick
      router.push(`/content/questions/${question.id}`);
    }}
  >
    {formatIdShort(question.id)}
  </TableCell>
</TableRow>
```

#### 4. Implementation cho Modal (Prompt Templates)

```tsx
<TableCell 
  className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-white/90 font-mono cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
  onClick={() => onViewDetail?.(template)}
>
  {formatIdShort(template.id)}
</TableCell>
```

### Best Practices

1. **Consistent Format**: Luôn sử dụng `formatIdShort()` để format ID, không hardcode format
2. **Click Handler**: ID cell phải có `onClick` handler để điều hướng hoặc mở modal
3. **Event Bubbling**: Sử dụng `e.stopPropagation()` khi row có onClick riêng
4. **Styling**: Áp dụng đúng các classes theo pattern đã định nghĩa
5. **Accessibility**: Đảm bảo ID cell có thể được focus và activate bằng keyboard

### Dark Mode Support

ID cell tự động hỗ trợ dark mode thông qua Tailwind CSS dark mode classes (`dark:hover:text-blue-400`, `dark:text-white/90`).

### Checklist khi implement

- [ ] Import `formatIdShort` từ `@/lib/utils/formatters`
- [ ] ID cell có class `cursor-pointer`
- [ ] ID cell có class `hover:text-blue-600 dark:hover:text-blue-400`
- [ ] ID cell có class `font-mono`
- [ ] Sử dụng `formatIdShort(id)` để hiển thị ID
- [ ] ID cell có `onClick` handler để điều hướng hoặc mở modal
- [ ] Nếu row có onClick, sử dụng `e.stopPropagation()` trong ID cell onClick
- [ ] Test navigation/modal hoạt động đúng khi click vào ID

[← Quay lại Overview](README.md)

