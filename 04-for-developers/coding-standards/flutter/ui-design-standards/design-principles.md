# Design Principles
[← Quay lại Overview](README.md)

Tài liệu này mô tả các nguyên tắc thiết kế UI/UX dành cho Student App, được xây dựng dựa trên nhu cầu thực tế của học sinh lớp 6/7 và best practices cho edtech.

## Nguyên tắc cốt lõi

### 1. UX dễ dùng cho học sinh lớp 6/7

**Trọng tâm**: Khó khăn thực tế, UX dễ dùng, hướng dẫn rõ ràng, thời lượng ngắn

#### Touch Targets
- **Tối thiểu 44x44px** cho mọi interactive element
- Spacing rộng rãi giữa các button (tối thiểu 8px)
- Tránh đặt các button quan trọng quá gần nhau

#### Visual Clarity
- Font size tối thiểu **14px** cho body text
- Contrast ratio tối thiểu **4.5:1** cho text
- Sử dụng icons rõ ràng, dễ hiểu
- Tránh clutter - mỗi màn hình tập trung vào một task chính

#### Guidance & Onboarding
- Hướng dẫn rõ ràng cho mọi action quan trọng
- Tooltips và helper text khi cần
- Onboarding flow ngắn gọn (< 2 phút)
- Progressive disclosure - chỉ hiển thị thông tin cần thiết

### 2. Thời lượng ngắn, tập trung

**Trọng tâm**: Học sinh lớp 6/7 có thời gian chú ý ngắn

#### Chunking Content
- Chia nhỏ nội dung học thành các phần ngắn (5-10 phút)
- Progress indicators rõ ràng (ví dụ: "Câu 2/10")
- Time estimates cho mỗi activity
- Break options sau mỗi session

#### Immediate Feedback
- Feedback ngay lập tức cho mọi action
- Không để học sinh chờ đợi không rõ lý do
- Loading states với progress indicators
- Success/error messages rõ ràng

### 3. Flow ngắn, thông điệp rõ

**Trọng tâm**: Flow ngắn, thông điệp rõ, giảm ma sát (UX designer edtech perspective)

#### Minimize Steps
- Giảm số bước để hoàn thành task
- Auto-save khi có thể
- Smart defaults - pre-fill thông tin khi có thể
- Skip options cho các bước không bắt buộc

#### Clear Messaging
- Microcopy đơn giản, không dùng jargon
- Thông điệp tích cực, khuyến khích
- Error messages dễ hiểu, có hướng dẫn sửa lỗi
- CTAs rõ ràng (ví dụ: "Bắt đầu học" thay vì "Submit")

#### Reduce Friction
- Giảm form fields tối đa
- Validation real-time, không đợi submit
- Remember user preferences
- Quick actions cho các task thường dùng

### 4. Minh bạch tiến độ (cho Phụ huynh)

**Trọng tâm**: Minh bạch tiến độ, điểm yếu, báo cáo dễ hiểu, nhắc học hiệu quả

#### Progress Transparency
- Progress bars và mastery levels rõ ràng
- Visual charts đơn giản, dễ hiểu
- Color coding nhất quán (xanh = tốt, đỏ = cần cải thiện)
- Plain language - không dùng thuật ngữ kỹ thuật

#### Weak Points Visibility
- Highlight rõ các điểm yếu
- Gợi ý bài tập bổ trợ cụ thể
- Lộ trình cải thiện rõ ràng

#### Effective Reminders
- Notifications thân thiện, không spam
- Reminders có context (ví dụ: "Bạn đã bỏ lỡ 2 ngày, hãy quay lại!")
- Streak tracking để tạo động lực

## Áp dụng trong thực tế

### Ví dụ: Practice Session Flow

**❌ Không tốt:**
- Nhiều bước: Chọn môn → Chọn chủ đề → Chọn độ khó → Chọn số câu → Xác nhận → Bắt đầu
- Không có progress indicator
- Error message: "Validation failed"

**✅ Tốt:**
- Flow ngắn: Chọn môn → Bắt đầu (auto-select defaults)
- Progress indicator: "Câu 1/10" luôn hiển thị
- Error message: "Vui lòng chọn ít nhất 1 câu hỏi"

### Ví dụ: Learning Card

**❌ Không tốt:**
- Text nhỏ (12px)
- Nhiều thông tin trên một card
- Button nhỏ (32x32px)

**✅ Tốt:**
- Text đủ lớn (16px body, 20px heading)
- Một thông điệp chính mỗi card
- Button lớn (44x44px minimum)

## Checklist khi thiết kế

- [ ] Touch targets ≥ 44x44px
- [ ] Font size ≥ 14px cho body text
- [ ] Contrast ratio ≥ 4.5:1
- [ ] Progress indicators rõ ràng
- [ ] Error messages dễ hiểu, có hướng dẫn
- [ ] Flow ngắn, giảm số bước
- [ ] Microcopy đơn giản, không jargon
- [ ] Feedback ngay lập tức cho mọi action
- [ ] Onboarding < 2 phút

## Tài liệu liên quan

- [Color & Typography](color-typography.md) - Bảng màu và typography system
- [Components](components.md) - Tiêu chuẩn component UI
- [Interaction Patterns](interaction-patterns.md) - Feedback, loading, error states
- [Navigation & Flow](navigation-flow.md) - Flow patterns và navigation

[← Quay lại Overview](README.md)

