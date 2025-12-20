# UI Components Conventions
[← Quay lại Overview](overview.md)

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

#### 4. Custom Trigger Button (Optional)

Nếu muốn custom trigger button:

```tsx
<ActionsDropdown
  actions={getActions(item)}
  trigger={
    <button className="custom-button">
      <MoreIcon />
    </button>
  }
/>
```

### Ví dụ thực tế

#### Admin Management

```tsx
const getActions = (admin: Admin): ActionItem[] => {
  const actions: ActionItem[] = [
    {
      id: 'view',
      label: 'Xem chi tiết',
      type: 'info',
      icon: <EyeIcon />,
      onClick: () => onViewDetail?.(admin),
    },
  ];

  if (admin.status === 'ACTIVE') {
    actions.push({
      id: 'deactivate',
      label: 'Vô hiệu hóa',
      type: 'danger',
      onClick: () => handleStatusChange(admin, 'INACTIVE'),
      disabled: updatingId === admin.id,
    });
  } else if (admin.status === 'INACTIVE') {
    actions.push({
      id: 'activate',
      label: 'Kích hoạt',
      type: 'success',
      onClick: () => handleStatusChange(admin, 'ACTIVE'),
      disabled: updatingId === admin.id,
    });
  }

  return actions;
};
```

#### Skills Management

```tsx
const getActions = (skill: Skill): ActionItem[] => {
  return [
    {
      id: 'view',
      label: 'Xem chi tiết',
      type: 'info',
      icon: <EyeIcon />,
      onClick: () => handleViewDetail(skill),
    },
    {
      id: 'edit',
      label: 'Chỉnh sửa',
      type: 'warning',
      icon: <EditIcon />,
      onClick: () => handleEdit(skill),
      disabled: true, // Disabled trong Phase 1
    },
    {
      id: 'view-questions',
      label: 'Xem câu hỏi liên quan',
      type: 'info',
      icon: <QuestionMarkCircleIcon />,
      onClick: () => handleViewRelatedQuestions(skill),
    },
  ];
};
```

### Best Practices

1. **Consistent Action Types**: Luôn sử dụng đúng action type phù hợp với hành động:
   - `success` cho các hành động tích cực
   - `danger` cho các hành động xóa/vô hiệu hóa
   - `warning` cho các hành động cảnh báo
   - `info` cho các hành động xem/thông tin

2. **Icon Usage**: Nên sử dụng icon cho mỗi action để tăng tính trực quan

3. **Disabled State**: Sử dụng `disabled` prop khi action không thể thực hiện (ví dụ: đang loading, không có quyền)

4. **Conditional Actions**: Thêm/xóa actions dựa trên trạng thái hoặc quyền của item

5. **Error Handling**: Đảm bảo `onClick` handler có error handling phù hợp

6. **Accessibility**: Component đã được thiết kế với accessibility in mind (keyboard navigation, ARIA attributes)

### Dark Mode Support

Component tự động hỗ trợ dark mode thông qua Tailwind CSS dark mode classes. Không cần thêm styling riêng.

### Testing

Khi test component ActionsDropdown:

1. Test dropdown mở/đóng khi click vào trigger
2. Test animation của color bar khi hover
3. Test disabled state
4. Test click outside để đóng dropdown
5. Test keyboard navigation (nếu có)

[↑ Quay lại Overview](overview.md)

