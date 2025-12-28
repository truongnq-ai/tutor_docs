# Accessibility
[← Quay lại Overview](README.md)

Tài liệu này mô tả các tiêu chuẩn accessibility cho Student App, đảm bảo app có thể sử dụng được bởi mọi người dùng.

## Touch Targets

### Minimum Size

- **Interactive elements**: Tối thiểu **44x44px**
- **Spacing**: Tối thiểu **8px** giữa các touch targets
- **Buttons**: Tối thiểu **44px height**, có thể wider

### Examples

**Good**:
```dart
ElevatedButton(
  style: ElevatedButton.styleFrom(
    minimumSize: Size(88, 44), // Width: 88px, Height: 44px
    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
  ),
  child: Text('Button'),
)
```

**Bad**:
```dart
IconButton(
  icon: Icon(Icons.menu),
  iconSize: 24, // Touch target < 44px
)
```

## Screen Reader Support

### Semantic Labels

**Nguyên tắc**: Mọi interactive element phải có semantic label

#### Buttons
```dart
ElevatedButton(
  onPressed: onPressed,
  child: Row(
    children: [
      Icon(Icons.save),
      Text('Lưu'),
    ],
  ),
  // Flutter tự động tạo semantic label từ child
)

// Hoặc explicit label
Semantics(
  label: 'Lưu tiến độ học tập',
  child: IconButton(
    icon: Icon(Icons.save),
    onPressed: onPressed,
  ),
)
```

#### Images
```dart
Image.asset(
  'assets/learning_illustration.png',
  semanticLabel: 'Học sinh đang học Toán trên máy tính bảng',
)
```

#### Form Fields
```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Tên học sinh',
    hintText: 'Nhập tên của bạn',
  ),
  // Flutter tự động tạo semantic label từ labelText
)
```

### ARIA Attributes

Flutter tự động tạo ARIA attributes từ semantic labels, nhưng có thể customize:

```dart
Semantics(
  label: 'Câu hỏi 1',
  hint: 'Chọn một đáp án',
  value: 'Chưa chọn',
  child: RadioListTile(
    title: Text('Đáp án A'),
    value: 'A',
    groupValue: selectedValue,
    onChanged: onChanged,
  ),
)
```

## Keyboard Navigation

### Focus States

**Nguyên tắc**: Focus states phải rõ ràng, visible

#### Focus Indicator
```dart
Focus(
  child: ElevatedButton(
    style: ElevatedButton.styleFrom(
      // Flutter tự động thêm focus indicator
    ),
    onPressed: onPressed,
    child: Text('Button'),
  ),
)
```

#### Custom Focus Style
```dart
Focus(
  child: Container(
    decoration: BoxDecoration(
      border: Border.all(
        color: isFocused ? Colors.blue : Colors.transparent,
        width: 2,
      ),
    ),
    child: child,
  ),
)
```

### Tab Order

**Nguyên tắc**: Tab order phải logical, theo flow của màn hình

- Từ trên xuống dưới
- Từ trái sang phải
- Skip decorative elements (images, icons không interactive)

## Visual Accessibility

### Contrast Ratios

**Requirements**:
- **Normal text**: Tối thiểu **4.5:1** (WCAG AA)
- **Large text (≥18px)**: Tối thiểu **3:1** (WCAG AA)
- **Interactive elements**: Tối thiểu **3:1** với background

#### Checking Contrast

**Good**:
- Black text (#212121) trên white background (#FFFFFF) = 16.6:1 ✅
- Primary color (#4CAF50) trên white = 3.2:1 ✅ (cho large text)

**Bad**:
- Grey text (#BDBDBD) trên white = 2.1:1 ❌
- Light blue (#90CAF9) trên white = 1.8:1 ❌

### Font Scaling

**Nguyên tắc**: Support system font scaling

```dart
Text(
  'Hello',
  style: TextStyle(
    fontSize: 16,
    // Flutter tự động scale theo system settings
  ),
)

// Hoặc explicit scaling
Text(
  'Hello',
  style: TextStyle(
    fontSize: 16 * MediaQuery.of(context).textScaleFactor,
  ),
)
```

### High Contrast Mode

**Nguyên tắc**: Support system high contrast mode

```dart
// Flutter tự động adapt colors trong high contrast mode
// Đảm bảo sử dụng theme colors, không hardcode colors

Theme.of(context).colorScheme.primary // Adapts to high contrast
```

## Color Blindness Support

### Don't Rely on Color Alone

**Nguyên tắc**: Không chỉ dùng màu để truyền đạt thông tin

**Bad**:
- Chỉ dùng màu đỏ/xanh để phân biệt đúng/sai
- Chỉ dùng màu để hiển thị status

**Good**:
- Kết hợp màu với icon (✓ cho đúng, ✗ cho sai)
- Kết hợp màu với text ("Đúng", "Sai")
- Kết hợp màu với pattern (nếu có)

### Color Combinations

**Avoid**:
- Red + Green (khó phân biệt cho color blind)
- Blue + Purple (khó phân biệt)

**Good**:
- Green + Red + Icon
- Blue + Orange (better contrast)

## Motion & Animation

### Reduced Motion

**Nguyên tắc**: Respect system reduced motion preference

```dart
// Check reduced motion
bool isReducedMotion = MediaQuery.of(context).disableAnimations;

if (isReducedMotion) {
  // Use simple transitions, no complex animations
  return child;
} else {
  // Use normal animations
  return AnimatedContainer(...);
}
```

### Animation Duration

- **Standard**: 200-300ms
- **Reduced motion**: 0ms hoặc instant
- Tránh animations quá nhanh (< 100ms) hoặc quá chậm (> 500ms)

## Testing Accessibility

### Manual Testing

1. **Screen Reader**: Test với TalkBack (Android) hoặc VoiceOver (iOS)
2. **Keyboard Navigation**: Test với keyboard (nếu có)
3. **Font Scaling**: Test với system font scale lớn (200%)
4. **High Contrast**: Test với high contrast mode
5. **Color Blindness**: Test với color blindness simulators

### Automated Testing

```dart
// Flutter accessibility testing
testWidgets('Button has semantic label', (WidgetTester tester) async {
  await tester.pumpWidget(
    ElevatedButton(
      onPressed: () {},
      child: Text('Save'),
    ),
  );

  final semantics = tester.getSemantics(find.text('Save'));
  expect(semantics.label, 'Save');
});
```

## Accessibility Checklist

### Touch Targets
- [ ] Tất cả interactive elements ≥ 44x44px
- [ ] Spacing ≥ 8px giữa touch targets

### Screen Reader
- [ ] Mọi button có semantic label
- [ ] Mọi image có alt text
- [ ] Form fields có labels
- [ ] Test với TalkBack/VoiceOver

### Visual
- [ ] Contrast ratio ≥ 4.5:1 cho text
- [ ] Support font scaling
- [ ] Support high contrast mode
- [ ] Không chỉ dùng màu để truyền đạt thông tin

### Keyboard Navigation
- [ ] Focus states rõ ràng
- [ ] Tab order logical
- [ ] Tất cả interactive elements có thể access bằng keyboard

### Motion
- [ ] Respect reduced motion preference
- [ ] Animations không quá nhanh hoặc quá chậm

## Best Practices

### Do's
- ✅ Sử dụng semantic labels cho mọi interactive element
- ✅ Đảm bảo contrast ratio đủ cao
- ✅ Support font scaling
- ✅ Test với screen readers
- ✅ Không chỉ dùng màu để truyền đạt thông tin

### Don'ts
- ❌ Touch targets < 44x44px
- ❌ Text contrast thấp
- ❌ Hardcode font sizes (không support scaling)
- ❌ Chỉ dùng màu để phân biệt states
- ❌ Animations quá phức tạp, không respect reduced motion

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Color & Typography](color-typography.md) - Bảng màu và typography
- [Components](components.md) - Tiêu chuẩn component UI

[← Quay lại Overview](README.md)

