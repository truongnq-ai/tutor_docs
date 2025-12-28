# Interaction Patterns
[← Quay lại Overview](README.md)

Tài liệu này mô tả các patterns cho feedback, loading states, error handling, và empty states trong Student App.

## Feedback Patterns

### Immediate Visual Feedback

**Nguyên tắc**: Mọi interaction phải có feedback ngay lập tức

#### Button Press
- **Visual**: Button scale down (0.95) hoặc darker shade
- **Duration**: 100-200ms
- **Haptic**: Light haptic feedback (optional)

#### Card Tap
- **Visual**: Slight elevation change hoặc ripple effect
- **Duration**: 200ms
- **Haptic**: Light haptic feedback

#### Swipe Actions
- **Visual**: Follow finger movement, snap back nếu không đủ distance
- **Duration**: 300ms animation
- **Haptic**: Medium haptic khi complete

### Success Feedback

**Khi dùng**: Khi action thành công (submit answer, save progress)

**Patterns**:
- **Toast message**: Hiển thị 2-3 giây, tự động dismiss
- **Checkmark animation**: Icon checkmark với animation
- **Color change**: Background chuyển sang green nhẹ
- **Haptic**: Success haptic (double tap)

**Ví dụ Flutter**:
```dart
// Toast message
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Đã lưu tiến độ!'),
    duration: Duration(seconds: 2),
    backgroundColor: Colors.green,
    behavior: SnackBarBehavior.floating,
  ),
);
```

### Error Feedback

**Khi dùng**: Khi có lỗi (validation, network error)

**Patterns**:
- **Error message**: Hiển thị rõ ràng, dễ hiểu
- **Visual indicator**: Red border, error icon
- **Action**: Có button "Thử lại" nếu có thể
- **Haptic**: Error haptic (vibration)

**Ví dụ Flutter**:
```dart
// Error widget
Column(
  children: [
    Icon(Icons.error_outline, color: Colors.red, size: 48),
    SizedBox(height: 16),
    Text(
      'Không thể kết nối',
      style: Theme.of(context).textTheme.headlineSmall,
    ),
    SizedBox(height: 8),
    Text(
      'Vui lòng kiểm tra kết nối internet và thử lại',
      style: Theme.of(context).textTheme.bodyMedium,
      textAlign: TextAlign.center,
    ),
    SizedBox(height: 24),
    ElevatedButton(
      onPressed: onRetry,
      child: Text('Thử lại'),
    ),
  ],
)
```

## Loading States

### Skeleton Screens

**Khi dùng**: Khi load data lần đầu (danh sách bài học, profile)

**Patterns**:
- Hiển thị skeleton với shape tương tự content
- Shimmer effect (optional)
- Không hiển thị empty state khi đang loading

**Ví dụ Flutter**:
```dart
// Skeleton card
Container(
  height: 120,
  decoration: BoxDecoration(
    color: Colors.grey[200],
    borderRadius: BorderRadius.circular(12),
  ),
  child: Shimmer.fromColors(
    baseColor: Colors.grey[300]!,
    highlightColor: Colors.grey[100]!,
    child: Container(),
  ),
)
```

### Progress Indicators

**Khi dùng**: Khi có async operation (submit answer, upload image)

**Patterns**:
- **Linear progress**: Cho operations có duration rõ ràng
- **Circular progress**: Cho operations không rõ duration
- **Percentage**: Hiển thị % nếu có thể (ví dụ: upload 60%)

**Ví dụ Flutter**:
```dart
// Loading overlay
Stack(
  children: [
    content,
    if (isLoading)
      Container(
        color: Colors.black54,
        child: Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
          ),
        ),
      ),
  ],
)
```

### Optimistic Updates

**Khi dùng**: Khi có thể (ví dụ: like, bookmark)

**Patterns**:
- Update UI ngay lập tức
- Rollback nếu API call fail
- Show loading indicator nhỏ (không block UI)

## Error Handling UI

### Network Errors

**Khi dùng**: Không có internet, timeout

**Pattern**:
- Error message: "Không thể kết nối. Vui lòng kiểm tra internet."
- Action: "Thử lại" button
- Retry logic: Tự động retry sau 3 giây (optional)

### Validation Errors

**Khi dùng**: Form validation, input errors

**Pattern**:
- Inline error message ngay dưới field
- Red border trên input field
- Error icon (optional)
- Clear error khi user sửa

**Ví dụ Flutter**:
```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Email',
    errorText: errorMessage,
    errorBorder: OutlineInputBorder(
      borderSide: BorderSide(color: Colors.red, width: 2),
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
    ),
  ),
)
```

### Business Logic Errors

**Khi dùng**: Lỗi từ backend (errorCode từ API)

**Pattern**:
- Map errorCode sang user-friendly message
- Hiển thị trong SnackBar hoặc Dialog
- Có action nếu cần (ví dụ: "Đăng nhập lại")

**Ví dụ**:
```dart
// Error handler
void handleError(ResponseObject response) {
  String message;
  switch (response.errorCode) {
    case '1001':
      message = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      break;
    case '2001':
      message = 'Vui lòng nhập đầy đủ thông tin.';
      break;
    default:
      message = response.errorDetail ?? 'Đã có lỗi xảy ra.';
  }
  
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(message)),
  );
}
```

## Empty States

### No Content

**Khi dùng**: Danh sách rỗng (chưa có bài tập, chưa có tiến độ)

**Pattern**:
- Illustration hoặc icon lớn (48-64px)
- Title: "Chưa có bài tập nào"
- Description: "Hãy bắt đầu học để xem bài tập ở đây"
- CTA: "Bắt đầu học" button

**Ví dụ Flutter**:
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Icon(Icons.assignment_outlined, size: 64, color: Colors.grey),
    SizedBox(height: 16),
    Text(
      'Chưa có bài tập nào',
      style: Theme.of(context).textTheme.headlineSmall,
    ),
    SizedBox(height: 8),
    Text(
      'Hãy bắt đầu học để xem bài tập ở đây',
      style: Theme.of(context).textTheme.bodyMedium,
      textAlign: TextAlign.center,
    ),
    SizedBox(height: 24),
    ElevatedButton(
      onPressed: onStartLearning,
      child: Text('Bắt đầu học'),
    ),
  ],
)
```

### No Results

**Khi dùng**: Search không có kết quả

**Pattern**:
- Icon: Search icon
- Title: "Không tìm thấy kết quả"
- Description: "Thử tìm kiếm với từ khóa khác"
- Action: Clear search button

### Error State

**Khi dùng**: Load data fail

**Pattern**:
- Icon: Error icon
- Title: "Không thể tải dữ liệu"
- Description: Error message cụ thể
- Action: "Thử lại" button

## Animation Guidelines

### Duration

- **Quick feedback**: 100-200ms (button press, hover)
- **Standard transitions**: 200-300ms (page transitions, card animations)
- **Complex animations**: 300-500ms (modal, drawer)

### Easing

- **Standard**: `Curves.easeInOut`
- **Enter**: `Curves.easeOut`
- **Exit**: `Curves.easeIn`
- **Bounce**: `Curves.elasticOut` (sparingly)

### Performance

- Sử dụng `AnimatedContainer`, `AnimatedOpacity` cho simple animations
- Sử dụng `AnimationController` cho complex animations
- Tránh rebuild không cần thiết trong animations

## Best Practices

### Do's
- ✅ Feedback ngay lập tức cho mọi interaction
- ✅ Loading states rõ ràng, không để user chờ đợi không rõ lý do
- ✅ Error messages dễ hiểu, có hướng dẫn sửa lỗi
- ✅ Empty states có CTA rõ ràng
- ✅ Animations mượt mà, không quá nhanh hoặc quá chậm

### Don'ts
- ❌ Không có feedback khi user tương tác
- ❌ Loading states quá lâu không có progress indicator
- ❌ Error messages technical, khó hiểu
- ❌ Empty states chỉ hiển thị "Không có dữ liệu"
- ❌ Animations quá phức tạp, ảnh hưởng performance

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Components](components.md) - Tiêu chuẩn component UI
- [Navigation & Flow](navigation-flow.md) - Flow patterns

[← Quay lại Overview](README.md)

