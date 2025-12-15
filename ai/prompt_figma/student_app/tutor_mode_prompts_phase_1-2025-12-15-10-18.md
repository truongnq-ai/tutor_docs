# STUDENT APP - TUTOR MODE PROMPTS

**Project:** Tutor  
**Screen Group:** Tutor Mode (Giải bài Toán)  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

- ← Quay lại: [Figma Prompt Library](../README.md)

---

## SCREEN 1: TUTOR MODE ENTRY

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Tutor Mode Entry / Choose Input Method

[SCREEN PURPOSE]
- Cho học sinh chọn cách nhập đề bài
- User story: US-05, US-06
- Acceptance criteria: Upload ảnh hoặc nhập text

[DESIGN REQUIREMENTS]
- Header: "Giải bài Toán"
- Subtitle: "Chụp ảnh hoặc nhập đề bài"
- 2 large action cards:
  - Card 1: "📷 Chụp ảnh"
    - Icon camera
    - Description: "Chụp đề bài từ sách vở"
    - Button "Chụp ảnh"
  - Card 2: "✏️ Nhập văn bản"
    - Icon keyboard
    - Description: "Gõ đề bài trực tiếp"
    - Button "Nhập đề bài"
- Recent problems section (nếu có):
  - "Đề bài gần đây"
  - List các đề đã giải
- Bottom navigation: Home, Practice, Tutor, Progress

[VISUAL GUIDELINES]
- Action cards: Large, prominent, rounded 16px
- Camera card: Blue accent (#2196F3)
- Text input card: Green accent (#4CAF50)
- Icon size: 64x64px
- Card height: 140px
- Typography: Title 20px Bold, Description 14px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Card spacing: 16px
- Button height: 48px

[CONTENT EXAMPLES]
- Header: "Giải bài Toán"
- Subtitle: "Chụp ảnh hoặc nhập đề bài"
- Card 1: "📷 Chụp ảnh" - "Chụp đề bài từ sách vở"
- Card 2: "✏️ Nhập văn bản" - "Gõ đề bài trực tiếp"
```

---

## SCREEN 2: CAMERA CAPTURE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Camera Capture Screen

[SCREEN PURPOSE]
- Cho phép chụp ảnh đề bài
- User story: US-05
- Acceptance criteria: Chụp ảnh hoặc chọn từ gallery

[DESIGN REQUIREMENTS]
- Camera preview: Full screen hoặc large viewport
- Overlay guides: Frame để căn đề bài
- Instructions: "Đặt đề bài trong khung"
- Action buttons:
  - "Chụp lại" (nếu đã chụp)
  - "Chọn từ thư viện"
  - "Xác nhận" (khi đã có ảnh)
- Image preview: Hiển thị ảnh đã chụp
- OCR status: "Đang nhận dạng..." (loading state)
- Back button

[VISUAL GUIDELINES]
- Camera overlay: Semi-transparent frame
- Instructions: White text, shadow for readability
- Buttons: Fixed bottom, prominent
- Loading indicator: Spinner hoặc progress bar

[SPECIFICATIONS]
- Screen size: 375x812px
- Camera viewport: Full screen hoặc 80% height
- Button height: 56px

[CONTENT EXAMPLES]
- Instructions: "Đặt đề bài trong khung"
- Button 1: "Chụp lại"
- Button 2: "Chọn từ thư viện"
- Button 3: "Xác nhận"
- Loading: "Đang nhận dạng đề bài..."
```

---

## SCREEN 3: TEXT INPUT

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Text Input for Problem

[SCREEN PURPOSE]
- Cho phép nhập đề bài bằng text
- User story: US-06
- Acceptance criteria: Hỗ trợ ký hiệu Toán học cơ bản

[DESIGN REQUIREMENTS]
- Header: "Nhập đề bài"
- Text input area:
  - Large textarea
  - Placeholder: "Ví dụ: Tính 2/3 + 1/4"
  - Math symbols toolbar: +, -, ×, ÷, =, (, ), ², √
  - Character count (optional)
- Examples section:
  - "Ví dụ đề bài:"
  - "Tính: 2/3 + 1/4"
  - "Rút gọn: 12/18"
- Button "Giải bài" (disabled khi rỗng)
- Button "Xóa" (clear text)
- Back button

[VISUAL GUIDELINES]
- Textarea: Rounded 12px, padding 16px, min height 120px
- Math toolbar: Horizontal scroll, icon buttons
- Examples: Gray cards, tappable để copy
- Button: Primary color, full width

[SPECIFICATIONS]
- Screen size: 375x812px
- Textarea: Min height 120px
- Toolbar height: 48px
- Button height: 48px

[CONTENT EXAMPLES]
- Placeholder: "Ví dụ: Tính 2/3 + 1/4"
- Example 1: "Tính: 2/3 + 1/4"
- Example 2: "Rút gọn: 12/18"
- Button: "Giải bài"
```

---

## SCREEN 4: SOLUTION STEP-BY-STEP

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Step-by-Step Solution

[SCREEN PURPOSE]
- Hiển thị lời giải từng bước
- User story: US-07, US-08
- Acceptance criteria: Chỉ hiển thị 1 bước tại một thời điểm, có nút "Xem bước tiếp theo"

[DESIGN REQUIREMENTS]
- Header: "Lời giải" + Step indicator "Bước 1/4"
- Problem display: Hiển thị lại đề bài
- Current step card:
  - Step number: "Bước 1"
  - Step title: "Phân tích đề bài"
  - Step content: "Đây là phép cộng phân số khác mẫu..."
  - Math expression: Formatted nicely
  - Explanation: Text giải thích
- Navigation:
  - "◀ Bước trước" (disabled ở bước 1)
  - "Bước tiếp theo ▶" (primary button)
- Progress dots: Hiển thị tổng số bước
- Common mistakes section (ở bước cuối):
  - "⚠️ Lưu ý: Lỗi sai thường gặp"
  - List các lỗi phổ biến
- Final answer card (ở bước cuối):
  - "Đáp án: 11/12"
  - Highlighted, prominent

[VISUAL GUIDELINES]
- Step card: White, rounded 16px, padding 20px, shadow
- Step number: Badge, màu primary
- Math expression: Monospace font, larger size
- Navigation buttons: Fixed bottom hoặc inline
- Progress dots: Small, indicate current step
- Final answer: Green background (#E8F5E9), bold, large

[SPECIFICATIONS]
- Screen size: 375x812px
- Step card: Padding 20px, margin 16px
- Button height: 48px
- Math expression: 18-20px font

[CONTENT EXAMPLES]
- Step indicator: "Bước 1/4"
- Step title: "Phân tích đề bài"
- Step content: "Đây là phép cộng phân số khác mẫu. Ta cần quy đồng mẫu số trước."
- Math: "2/3 + 1/4 = ?"
- Button: "Bước tiếp theo ▶"
- Final answer: "Đáp án: 11/12"
```

---

## SCREEN 5: OCR CONFIRMATION

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: OCR Confirmation (khi OCR không chắc chắn)

[SCREEN PURPOSE]
- Xác nhận lại đề bài sau khi OCR
- User story: US-05
- Acceptance criteria: Yêu cầu xác nhận nếu OCR không chắc chắn

[DESIGN REQUIREMENTS]
- Header: "Xác nhận đề bài"
- Image preview: Ảnh đã chụp (small)
- OCR result:
  - Text field hiển thị text đã nhận dạng
  - Editable: Học sinh có thể sửa
  - Placeholder: "Đề bài đã nhận dạng..."
- Confidence indicator:
  - "Độ chính xác: 85%" (nếu < 90%)
  - Warning icon
- Instructions: "Vui lòng kiểm tra và sửa nếu cần"
- Buttons:
  - "Sửa đề bài" (edit text)
  - "Xác nhận và giải" (primary)
  - "Chụp lại" (secondary)

[VISUAL GUIDELINES]
- Image preview: Rounded, small (120x120px)
- Text field: Rounded, padding 16px, editable
- Warning: Yellow background (#FFF9E6)
- Button: Primary color

[SPECIFICATIONS]
- Screen size: 375x812px
- Image preview: 120x120px
- Text field: Min height 100px

[CONTENT EXAMPLES]
- Header: "Xác nhận đề bài"
- Confidence: "Độ chính xác: 85%"
- Instructions: "Vui lòng kiểm tra và sửa nếu cần"
- Button: "Xác nhận và giải"
```

---

## NOTES

- Tất cả screens cần có loading state khi AI đang xử lý
- Error states: Hiển thị message rõ ràng nếu OCR/solve thất bại
- Success states: Celebration khi giải đúng
- Step-by-step phải có animation nhẹ khi chuyển bước

---

- ← Quay lại: [Figma Prompt Library](../README.md)

