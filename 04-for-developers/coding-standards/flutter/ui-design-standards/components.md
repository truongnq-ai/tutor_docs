# Components
[← Quay lại Overview](README.md)

Tài liệu này mô tả tiêu chuẩn cho các component UI trong Student App.

## Buttons

### Primary Button

**Khi dùng**: Main actions, CTAs quan trọng (ví dụ: "Bắt đầu học", "Nộp bài")

**Specs**:
- Background: Primary color (#4CAF50)
- Text: White, 16px, Bold
- Height: Tối thiểu 44px
- Padding: 16px horizontal, 12px vertical
- Border radius: 8px
- Shadow: Nhẹ (elevation 2)
- Touch target: ≥ 44x44px

**States**:
- Default: Primary color background
- Pressed: Darker shade (80% opacity)
- Disabled: Grey (#BDBDBD), không clickable
- Loading: Show spinner, disable interaction

**Ví dụ Flutter**:
```dart
ElevatedButton(
  onPressed: onPressed,
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.green, // #4CAF50
    foregroundColor: Colors.white,
    minimumSize: Size(double.infinity, 44),
    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    elevation: 2,
  ),
  child: Text(
    'Bắt đầu học',
    style: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.bold,
    ),
  ),
)
```

### Secondary Button

**Khi dùng**: Secondary actions, cancel, skip

**Specs**:
- Background: Transparent hoặc white
- Border: 1px solid Primary color (#4CAF50)
- Text: Primary color, 16px, Semi-bold
- Height: Tối thiểu 44px
- Padding: 16px horizontal, 12px vertical
- Border radius: 8px
- No shadow

**Ví dụ Flutter**:
```dart
OutlinedButton(
  onPressed: onPressed,
  style: OutlinedButton.styleFrom(
    foregroundColor: Colors.green, // #4CAF50
    minimumSize: Size(double.infinity, 44),
    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    side: BorderSide(color: Colors.green, width: 1),
  ),
  child: Text(
    'Bỏ qua',
    style: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w600,
    ),
  ),
)
```

### Text Button

**Khi dùng**: Tertiary actions, links, "Xem thêm"

**Specs**:
- Background: Transparent
- Text: Primary color hoặc Secondary color, 16px, Regular
- Height: Tối thiểu 44px
- Padding: 8px horizontal, 8px vertical
- No border, no shadow

### Icon Button

**Khi dùng**: Actions trong AppBar, quick actions

**Specs**:
- Size: 44x44px (minimum)
- Icon size: 24px
- Background: Transparent hoặc subtle grey
- Border radius: 8px (nếu có background)

## Cards

### Learning Card

**Khi dùng**: Hiển thị bài học, chủ đề học tập

**Structure**:
- Icon/Image (left hoặc top)
- Title (Heading 2 - 20px)
- Description (Body - 16px, optional)
- Progress bar (optional)
- Action button (optional)

**Specs**:
- Background: White (#FFFFFF)
- Padding: 16px
- Border radius: 12px
- Shadow: Nhẹ (elevation 1)
- Spacing: 12px giữa các elements

**Ví dụ Flutter**:
```dart
Card(
  elevation: 1,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(Icons.book, size: 24),
            SizedBox(width: 12),
            Expanded(
              child: Text(
                'Phân số',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ),
          ],
        ),
        SizedBox(height: 8),
        Text(
          'Học cách cộng, trừ, nhân, chia phân số',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        SizedBox(height: 12),
        LinearProgressIndicator(value: 0.6),
      ],
    ),
  ),
)
```

### Skill Card

**Khi dùng**: Hiển thị kỹ năng, mastery level

**Structure**:
- Skill name (Heading 3 - 18px)
- Mastery level (Circular progress hoặc percentage)
- Status badge (optional)

**Specs**:
- Background: White với subtle border
- Padding: 16px
- Border radius: 8px
- Visual hierarchy rõ ràng

### Practice Card

**Khi dùng**: Hiển thị câu hỏi practice

**Structure**:
- Question number (Caption - 12px)
- Question text (Body - 16px)
- Options (Radio buttons hoặc checkboxes)
- Timer (optional)

**Specs**:
- Background: White
- Padding: 20px
- Border radius: 12px
- Spacing: 16px giữa question và options

## Input Fields

### Text Input

**Khi dùng**: Form inputs, search

**Specs**:
- Height: 48px (minimum)
- Padding: 12px horizontal, 14px vertical
- Border: 1px solid #E0E0E0
- Border radius: 8px
- Font size: 16px
- Label: 14px, above input
- Helper text: 12px, below input

**States**:
- Default: Grey border
- Focused: Primary color border, 2px
- Error: Red border (#F44336), error message below
- Disabled: Grey background, grey text

**Ví dụ Flutter**:
```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Tên học sinh',
    helperText: 'Nhập tên để cá nhân hóa trải nghiệm',
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 14),
  ),
  style: TextStyle(fontSize: 16),
)
```

### Number Input

**Khi dùng**: Nhập số (tuổi, điểm)

**Specs**: Tương tự Text Input, keyboard type: number

### Image Upload

**Khi dùng**: Upload ảnh bài tập

**Specs**:
- Preview area: 200x200px (minimum)
- Border: 2px dashed #E0E0E0
- Border radius: 8px
- Delete button: Icon button, top-right corner

## Progress Indicators

### Linear Progress Bar

**Khi dùng**: Progress trong session, completion percentage

**Specs**:
- Height: 4px hoặc 8px
- Background: #E0E0E0
- Progress: Primary color (#4CAF50)
- Border radius: 4px
- Show percentage (optional): 14px text, right-aligned

**Ví dụ Flutter**:
```dart
Column(
  children: [
    LinearProgressIndicator(
      value: 0.6,
      backgroundColor: Colors.grey[300],
      valueColor: AlwaysStoppedAnimation<Color>(Colors.green),
      minHeight: 8,
    ),
    SizedBox(height: 4),
    Text(
      '60% hoàn thành',
      style: Theme.of(context).textTheme.bodySmall,
      textAlign: TextAlign.right,
    ),
  ],
)
```

### Circular Progress

**Khi dùng**: Mastery level, skill progress

**Specs**:
- Size: 80px (default), có thể scale
- Stroke width: 8px
- Background: #E0E0E0
- Progress: Primary color (#4CAF50)
- Center text: Percentage, 16px Bold

### Streak Badge

**Khi dùng**: Hiển thị số ngày liên tiếp học

**Specs**:
- Background: Accent color (#FF9800)
- Text: White, 14px Bold
- Padding: 8px horizontal, 4px vertical
- Border radius: 12px
- Icon: Fire icon (optional)

## Best Practices

### Do's
- ✅ Buttons tối thiểu 44x44px
- ✅ Cards có shadow nhẹ để tạo depth
- ✅ Input fields có label và helper text rõ ràng
- ✅ Progress indicators luôn hiển thị khi có async operation
- ✅ Consistent spacing (8px, 16px, 24px)

### Don'ts
- ❌ Buttons quá nhỏ (< 44px)
- ❌ Cards quá nhiều thông tin
- ❌ Input fields không có validation feedback
- ❌ Progress indicators không rõ ràng
- ❌ Inconsistent spacing

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Color & Typography](color-typography.md) - Bảng màu và typography
- [Interaction Patterns](interaction-patterns.md) - Feedback, loading, error states
- [Widget Implementation](widget-implementation.md) - Implementation trong code

[← Quay lại Overview](README.md)

