# Navigation & Flow
[← Quay lại Overview](README.md)

Tài liệu này mô tả các quy tắc về flow patterns, navigation, và microcopy trong Student App.

## Flow Patterns

### Minimize Steps

**Nguyên tắc**: Giảm số bước để hoàn thành task

#### Onboarding Flow
- **Mục tiêu**: < 2 phút để hoàn thành
- **Số bước**: Tối đa 3-4 bước
- **Skip option**: Cho phép skip các bước không bắt buộc
- **Progress indicator**: Hiển thị rõ (ví dụ: "Bước 2/4")

**Ví dụ tốt**:
1. Welcome screen → Chọn lớp → Bắt đầu
2. (Optional) Nhập tên → Bắt đầu

**Ví dụ không tốt**:
1. Welcome → Chọn lớp → Nhập tên → Nhập email → Xác nhận email → Chọn môn học → Chọn chủ đề → Bắt đầu

#### Practice Flow
- **Mục tiêu**: Từ dashboard đến câu hỏi đầu tiên trong < 3 taps
- **Flow**: Dashboard → Chọn bài tập → Câu hỏi đầu tiên
- **Auto-start**: Tự động bắt đầu timer khi vào câu hỏi

#### Submission Flow
- **Mục tiêu**: Submit trong 1 tap sau khi hoàn thành
- **Auto-save**: Tự động lưu progress, không cần "Lưu" button
- **Review step**: Optional, có thể skip

### Smart Defaults

**Nguyên tắc**: Pre-fill thông tin khi có thể

- **Grade selection**: Remember last selection
- **Difficulty**: Default to "Trung bình"
- **Number of questions**: Default to 10
- **Time limit**: Default to "Không giới hạn"

### Progressive Disclosure

**Nguyên tắc**: Chỉ hiển thị thông tin cần thiết, ẩn details trong expandable sections

- **Main screen**: Chỉ hiển thị thông tin quan trọng
- **Details**: Ẩn trong "Xem thêm" hoặc expandable card
- **Advanced options**: Ẩn trong settings, không hiển thị trên main flow

## Navigation Patterns

### Bottom Navigation

**Khi dùng**: Main navigation giữa các sections chính (Dashboard, Practice, Progress, Profile)

**Specs**:
- 4-5 items maximum
- Icons + labels
- Active state rõ ràng (color change)
- Badge cho notifications (optional)

**Sections**:
1. **Dashboard** (Home icon) - Màn hình chính
2. **Practice** (Book icon) - Bài tập
3. **Progress** (Chart icon) - Tiến độ
4. **Profile** (User icon) - Hồ sơ

### AppBar Navigation

**Khi dùng**: Navigation trong feature, back button, actions

**Specs**:
- Back button: Luôn hiển thị khi có thể back
- Title: Rõ ràng, mô tả màn hình hiện tại
- Actions: Tối đa 2-3 actions (ví dụ: Search, Settings)

### Drawer Navigation

**Khi dùng**: Secondary navigation, settings, help

**Specs**:
- Trigger: Hamburger icon trong AppBar
- Items: Settings, Help, About, Logout
- Không dùng cho main navigation

### Deep Linking

**Khi dùng**: Direct navigation đến specific content

**Examples**:
- `/practice/question/123` - Direct đến câu hỏi cụ thể
- `/progress/skill/fractions` - Direct đến skill progress
- `/tutor/solve` - Direct đến tutor mode

## Microcopy Guidelines

### Tone of Voice

**Nguyên tắc**: Thân thiện, khuyến khích, dễ hiểu

- **Formal → Friendly**: "Vui lòng nhập" → "Hãy nhập"
- **Technical → Simple**: "Validation failed" → "Vui lòng kiểm tra lại"
- **Negative → Positive**: "Bạn đã sai" → "Hãy thử lại nhé!"

### Button Labels

**Nguyên tắc**: Action-oriented, rõ ràng

**Good**:
- "Bắt đầu học"
- "Nộp bài"
- "Xem kết quả"
- "Thử lại"

**Bad**:
- "Submit"
- "OK"
- "Click here"
- "Continue"

### Error Messages

**Nguyên tắc**: Dễ hiểu, có hướng dẫn sửa lỗi

**Good**:
- "Vui lòng nhập tên học sinh" (thay vì "Name is required")
- "Không thể kết nối. Vui lòng kiểm tra internet và thử lại." (thay vì "Network error")
- "Mật khẩu phải có ít nhất 8 ký tự" (thay vì "Password validation failed")

**Bad**:
- "Error 500"
- "Validation failed"
- "Invalid input"

### Success Messages

**Nguyên tắc**: Tích cực, khuyến khích

**Good**:
- "Đã lưu tiến độ!"
- "Làm tốt lắm! Bạn đã hoàn thành 5/10 câu."
- "Chúc mừng! Bạn đã đạt streak 7 ngày!"

**Bad**:
- "Success"
- "Saved"
- "OK"

### Empty States

**Nguyên tắc**: Hướng dẫn action tiếp theo

**Good**:
- "Chưa có bài tập nào. Hãy bắt đầu học để xem bài tập ở đây."
- "Không tìm thấy kết quả. Thử tìm kiếm với từ khóa khác."

**Bad**:
- "No data"
- "Empty"
- "No results found"

## Flow Examples

### Onboarding Flow

```
1. Welcome Screen
   - Title: "Chào mừng đến với Tutor!"
   - Description: "Học Toán dễ dàng, hiệu quả"
   - CTA: "Bắt đầu"

2. Select Grade
   - Title: "Bạn đang học lớp mấy?"
   - Options: Lớp 6, Lớp 7
   - CTA: "Tiếp tục"
   - Skip: "Bỏ qua"

3. (Optional) Enter Name
   - Title: "Tên của bạn là gì?"
   - Input: Text field
   - CTA: "Hoàn thành"
   - Skip: "Bỏ qua"

4. Dashboard
   - Welcome message với tên (nếu có)
   - Today's learning plan
```

### Practice Flow

```
1. Dashboard
   - Tap "Bài tập hôm nay"

2. Practice List
   - List of available practices
   - Tap practice card

3. Practice Session
   - Question 1/10
   - Answer options
   - Submit button

4. Result
   - Score
   - Review answers (optional)
   - Back to dashboard
```

### Tutor Mode Flow

```
1. Dashboard
   - Tap "Giải bài tập"

2. Camera Capture
   - Instructions: "Chụp ảnh bài tập của bạn"
   - Camera button
   - Preview & retake

3. Processing
   - Loading: "Đang phân tích bài tập..."
   - Progress indicator

4. Solution
   - Step-by-step solution
   - Explanation
   - Practice similar problems (optional)
```

## Navigation Best Practices

### Do's
- ✅ Back button luôn hoạt động, trừ khi là entry point
- ✅ Title rõ ràng, mô tả màn hình hiện tại
- ✅ Bottom navigation cho main sections
- ✅ Deep linking cho direct navigation
- ✅ Breadcrumbs cho nested flows (optional)

### Don'ts
- ❌ Navigation quá sâu (> 4 levels)
- ❌ Back button không hoạt động
- ❌ Title không rõ ràng hoặc quá dài
- ❌ Quá nhiều navigation options trên một màn hình
- ❌ Deep links không hoạt động

## Microcopy Checklist

- [ ] Button labels action-oriented, rõ ràng
- [ ] Error messages dễ hiểu, có hướng dẫn
- [ ] Success messages tích cực, khuyến khích
- [ ] Empty states có CTA rõ ràng
- [ ] Tone of voice thân thiện, không formal
- [ ] Không dùng technical jargon
- [ ] Không dùng tiếng Anh khi có thể dùng tiếng Việt

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Components](components.md) - Tiêu chuẩn component UI
- [Interaction Patterns](interaction-patterns.md) - Feedback, loading, error states

[← Quay lại Overview](README.md)

