# STUDENT APP - TUTOR MODE PROMPTS

**Project:** Tutor  
**Screen Group:** Tutor Mode (Giải bài Toán)  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

- ← Quay lại: [Figma Prompt Library](../README.md)

---

## DESIGN STANDARDS REFERENCE

**Xem [Design Standards Template](design_standards_template.md) cho checklist và quick reference về:**
- Accessibility checklist (touch targets, contrast, screen reader, etc.)
- Color & Typography quick reference
- Interaction patterns (button states, feedback, animations)
- Component specs (buttons, cards, inputs, progress indicators)
- Navigation patterns (bottom nav, AppBar, deep linking)
- Spacing scale
- Microcopy guidelines

**Tài liệu chi tiết:**
- [Design Principles](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/design-principles.md)
- [Color & Typography](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md)
- [Components](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/components.md)
- [Interaction Patterns](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md)
- [Navigation & Flow](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md)
- [Accessibility](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md)

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
- Rate limit indicator (trial mode):
  - "Số lượt giải hôm nay: 3/5"
  - Progress bar: Visual indicator
  - Warning (nếu ≥ 4/5): "⚠️ Còn 1 lượt. Hãy liên kết với phụ huynh để tiếp tục!"
- 2 large action cards:
  - Card 1: "📷 Chụp ảnh"
    - Icon camera
    - Description: "Chụp đề bài từ sách vở"
    - Button "Chụp ảnh" (disabled nếu đã hết lượt)
  - Card 2: "✏️ Nhập văn bản"
    - Icon keyboard
    - Description: "Gõ đề bài trực tiếp"
    - Button "Nhập đề bài" (disabled nếu đã hết lượt)
- Recent problems section (nếu có):
  - "Đề bài gần đây"
  - List các đề đã giải (tối đa 5 đề)
  - Tap để xem lại lời giải
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

[ACCESSIBILITY]
- Action cards: Touch target ≥ 44x44px (card height 140px đã đạt yêu cầu)
- Buttons: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Cards: Có semantic labels "Chụp ảnh đề bài" và "Nhập văn bản đề bài"
- Rate limit indicator: Có semantic label "Số lượt giải hôm nay: 3/5"
- Recent problems: Có semantic labels cho mỗi problem card
- Disabled buttons: Có semantic label "Đã hết lượt giải hôm nay"

[STATES]
- Default: Hiển thị action cards và recent problems
- Button disabled: Khi đã hết lượt (trial mode), grey (#BDBDBD), không clickable
- Button enabled: Khi còn lượt, primary color
- Button pressed: Scale down 0.95, duration 100-200ms
- Warning visible: Khi ≥ 4/5 lượt, hiển thị warning card màu cam
- Loading: Skeleton khi đang fetch recent problems

[NAVIGATION]
- Entry: Từ Bottom navigation (Tutor tab) hoặc từ Today's Learning Plan
- Exit:
  - Button "Chụp ảnh" → Camera Capture screen
  - Button "Nhập đề bài" → Text Input screen
  - Tap recent problem → Step-by-Step Solution screen (xem lại)
- Back button: Không có (main screen trong Tutor tab)
- Deep link: `/tutor` hoặc `/tutor/solve`

[CONTENT EXAMPLES]
- Header: "Giải bài Toán"
- Subtitle: "Chụp ảnh hoặc nhập đề bài"
- Rate limit: "Số lượt giải hôm nay: 3/5"
- Warning: "⚠️ Còn 1 lượt. Hãy liên kết với phụ huynh để tiếp tục!" (nếu ≥ 4/5)
- Card 1: "📷 Chụp ảnh" - "Chụp đề bài từ sách vở"
- Card 2: "✏️ Nhập văn bản" - "Gõ đề bài trực tiếp"
- Recent: "Đề bài gần đây: Tính 2/3 + 1/4..."
- Empty recent: "Bạn chưa giải bài nào"
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

[ACCESSIBILITY]
- Buttons: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Camera permission: Hiển thị message rõ ràng nếu chưa có permission
- Instructions: Có semantic label "Hướng dẫn: Đặt đề bài trong khung"
- Image preview: Có semanticLabel "Ảnh đề bài đã chụp"

[STATES]
- Default: Camera preview hiển thị, chưa chụp
- Camera permission denied: Hiển thị message "Cần quyền truy cập camera. Vui lòng cấp quyền trong Settings."
- Image captured: Hiển thị preview, button "Xác nhận" enabled
- Button pressed: Scale down 0.95, duration 100-200ms
- Loading: Hiển thị spinner và message "Đang nhận dạng đề bài..." khi đang OCR
- OCR error: Hiển thị error message "Không thể nhận dạng đề bài. Vui lòng chụp lại rõ hơn." với button "Thử lại"
- OCR success: Chuyển đến OCR Confirmation screen (nếu confidence < 90%) hoặc Step-by-Step Solution (nếu confidence ≥ 90%)

[NAVIGATION]
- Entry: Từ Tutor Mode Entry screen (khi click "Chụp ảnh")
- Exit:
  - Button "Xác nhận" → OCR Confirmation screen (nếu confidence < 90%) hoặc Step-by-Step Solution (nếu confidence ≥ 90%)
  - Button "Chụp lại" → Reset camera, chụp lại
  - Button "Chọn từ thư viện" → Image picker → OCR Confirmation hoặc Step-by-Step
  - Back button → Tutor Mode Entry screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Instructions: "Đặt đề bài trong khung"
- Button 1: "Chụp lại" (khi đã có ảnh)
- Button 2: "Chọn từ thư viện"
- Button 3: "Xác nhận" (khi đã có ảnh)
- Loading: "Đang nhận dạng đề bài..."
- Error: "Không thể nhận dạng đề bài. Vui lòng chụp lại rõ hơn."
- Permission denied: "Cần quyền truy cập camera. Vui lòng cấp quyền trong Settings."
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

[ACCESSIBILITY]
- Textarea: Touch target đủ lớn, có label "Nhập đề bài"
- Math toolbar buttons: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Toolbar buttons: Có semantic labels cho mỗi symbol (ví dụ: "Dấu cộng", "Dấu trừ")
- Example cards: Touch target ≥ 44x44px, có semantic labels
- Button: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)

[STATES]
- Default: Textarea trống, button "Giải bài" disabled
- Input focused: Border 2px #4CAF50
- Input filled: Button "Giải bài" enabled
- Button disabled: Grey (#BDBDBD), không clickable khi textarea trống
- Button enabled: Primary color khi có text
- Button loading: Hiển thị spinner khi đang giải bài
- Button pressed: Scale down 0.95, duration 100-200ms
- Example tapped: Copy text vào textarea, focus vào textarea

[NAVIGATION]
- Entry: Từ Tutor Mode Entry screen (khi click "Nhập đề bài")
- Exit:
  - Button "Giải bài" → Step-by-Step Solution screen
  - Button "Xóa" → Clear textarea
  - Back button → Tutor Mode Entry screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Placeholder: "Ví dụ: Tính 2/3 + 1/4"
- Example 1: "Tính: 2/3 + 1/4" (tappable để copy)
- Example 2: "Rút gọn: 12/18" (tappable để copy)
- Button: "Giải bài" (disabled khi rỗng)
- Button clear: "Xóa"
- Error: "Không thể giải bài này. Vui lòng thử lại hoặc nhập đề bài khác."
- Loading: "Đang giải bài..."
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
- Related skills section (ở bước cuối):
  - "Kỹ năng liên quan:"
  - List skills: "Rút gọn phân số", "Cộng phân số khác mẫu"
  - Tap để xem skill detail hoặc luyện tập
- Actions (ở bước cuối):
  - Button "Luyện tập kỹ năng này" (primary)
  - Button "Giải bài khác" (secondary)
  - Button "Lưu vào lịch sử" (tertiary)

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

[ACCESSIBILITY]
- Navigation buttons: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Step card: Có semantic label "Bước 1: Phân tích đề bài"
- Progress dots: Có semantic label "Bước 1 trong tổng số 4 bước"
- Related skills: Có semantic labels cho mỗi skill card
- Math expressions: Có semantic labels mô tả công thức

[STATES]
- Default: Hiển thị bước hiện tại
- Button "Bước trước" disabled: Ở bước 1, grey (#BDBDBD)
- Button "Bước trước" enabled: Từ bước 2 trở đi
- Button "Bước tiếp theo" enabled: Trừ bước cuối
- Button pressed: Scale down 0.95, duration 100-200ms
- Step transition: Animation slide hoặc fade, duration 200-300ms
- Final step: Hiển thị final answer card, common mistakes, related skills, action buttons
- Loading: Skeleton khi đang fetch solution steps

[NAVIGATION]
- Entry: Từ Camera Capture/Text Input screen (sau khi xác nhận) hoặc OCR Confirmation
- Exit:
  - Button "Bước tiếp theo" → Next step (trong cùng screen)
  - Button "Bước trước" → Previous step (trong cùng screen)
  - Button "Luyện tập kỹ năng này" (bước cuối) → Skill Selection hoặc Practice Question
  - Button "Giải bài khác" (bước cuối) → Tutor Mode Entry screen
  - Button "Lưu vào lịch sử" (bước cuối) → Recent Problems List
  - Back button → Tutor Mode Entry screen
- Deep link: `/tutor/solution/{problemId}`

[CONTENT EXAMPLES]
- Step indicator: "Bước 1/4"
- Step title: "Phân tích đề bài"
- Step content: "Đây là phép cộng phân số khác mẫu. Ta cần quy đồng mẫu số trước."
- Math: "2/3 + 1/4 = ?"
- Button previous: "◀ Bước trước" (disabled ở bước 1)
- Button next: "Bước tiếp theo ▶"
- Final answer: "Đáp án: 11/12"
- Common mistakes: "⚠️ Lưu ý: Lỗi sai thường gặp - Không quy đồng mẫu số trước khi cộng"
- Related skills: "Rút gọn phân số", "Cộng phân số khác mẫu"
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

[ACCESSIBILITY]
- Input field: Touch target ≥ 44x44px (min height 100px đã đạt yêu cầu)
- Input field: Có label "Đề bài đã nhận dạng" và helper text
- Buttons: Touch target ≥ 44x44px
- Image preview: Có semanticLabel "Ảnh đề bài đã chụp"
- Confidence indicator: Có semantic label "Độ chính xác nhận dạng: 85%"

[STATES]
- Default: Hiển thị OCR result, có thể edit
- Input focused: Border 2px #4CAF50
- Confidence warning: Background #FFF9E6 khi confidence < 90%
- Button pressed: Scale down 0.95, duration 100-200ms
- Button loading: Hiển thị spinner khi đang giải bài
- Error: "Không thể giải bài này. Vui lòng kiểm tra lại đề bài."

[NAVIGATION]
- Entry: Từ Camera Capture screen (sau khi OCR, nếu confidence < 90%)
- Exit:
  - Button "Xác nhận và giải" → Step-by-Step Solution screen
  - Button "Sửa đề bài" → Focus vào input field để edit
  - Button "Chụp lại" → Camera Capture screen
  - Back button → Camera Capture screen
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Header: "Xác nhận đề bài"
- Confidence: "Độ chính xác: 85%" (màu cam #FF9800 khi < 90%)
- Instructions: "Vui lòng kiểm tra và sửa nếu cần"
- Input label: "Đề bài đã nhận dạng"
- Input placeholder: "Đề bài đã nhận dạng..."
- Button primary: "Xác nhận và giải"
- Button secondary: "Chụp lại"
- Error: "Không thể giải bài này. Vui lòng kiểm tra lại đề bài."
```

---

## SCREEN 6: SOLUTION COMPLETE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Solution Complete Screen

[SCREEN PURPOSE]
- Màn hình tổng kết sau khi xem hết các bước giải
- User story: US-07, US-08
- Acceptance criteria: Hiển thị đáp án cuối cùng, related skills, next actions

[DESIGN REQUIREMENTS]
- Celebration: Confetti animation hoặc icon 🎉
- Title: "Đã giải xong!"
- Final answer display:
  - Large, prominent: "Đáp án: 11/12"
  - Background highlight: Green (#E8F5E9)
- Problem summary:
  - "Đề bài: Tính 2/3 + 1/4"
  - "Số bước giải: 4 bước"
- Related skills:
  - "Kỹ năng liên quan:"
  - List skills với mastery (nếu có):
    - "Rút gọn phân số - 65%"
    - "Cộng phân số khác mẫu - 58%"
  - Tap để xem skill detail
- Learning insights:
  - "Bạn đã học được:"
  - "✓ Quy đồng mẫu số"
  - "✓ Cộng phân số cùng mẫu"
- Actions:
  - Primary: "Luyện tập kỹ năng này" (nếu có skill yếu)
  - Secondary: "Giải bài khác"
  - Tertiary: "Xem lại lời giải"
- Rate limit reminder (nếu trial):
  - "Số lượt còn lại hôm nay: 2/5"

[VISUAL GUIDELINES]
- Background: Gradient celebration (#E8F5E9 → #FFFFFF)
- Final answer: Large text 32px Bold, green background
- Related skills: Cards với mastery progress
- Learning insights: Checkmark list, green
- Typography: Title 24px Bold, Answer 32px Bold

[SPECIFICATIONS]
- Screen size: 375x812px
- Final answer card: Padding 24px, rounded 16px
- Button height: 56px

[ACCESSIBILITY]
- Buttons: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Related skills cards: Touch target ≥ 44x44px
- Celebration animation: Respect reduced motion preference
- Final answer: Có semantic label "Đáp án cuối cùng: 11/12"
- Related skills: Có semantic labels cho mỗi skill card

[STATES]
- Default: Hiển thị celebration và summary
- Celebration animation: Confetti hoặc icon 🎉 (có thể disable nếu reduced motion)
- Button pressed: Scale down 0.95, duration 100-200ms
- Skill card tap: Navigate đến Skill Detail hoặc Practice Question

[NAVIGATION]
- Entry: Từ Step-by-Step Solution screen (khi xem hết tất cả bước)
- Exit:
  - Button "Luyện tập kỹ năng này" → Skill Selection hoặc Practice Question
  - Button "Giải bài khác" → Tutor Mode Entry screen
  - Button "Xem lại lời giải" → Step-by-Step Solution screen (bước 1)
  - Tap related skill → Skill Detail screen
- Back button: Có, quay lại Step-by-Step Solution screen
- Deep link: `/tutor/complete/{problemId}`

[CONTENT EXAMPLES]
- Title: "Đã giải xong!"
- Answer: "Đáp án: 11/12"
- Problem: "Đề bài: Tính 2/3 + 1/4 - 4 bước giải"
- Related: "Rút gọn phân số - 65% | Cộng phân số khác mẫu - 58%"
- Insights: "✓ Quy đồng mẫu số | ✓ Cộng phân số cùng mẫu"
- Button primary: "Luyện tập kỹ năng này" (nếu có skill yếu)
- Button secondary: "Giải bài khác"
- Button tertiary: "Xem lại lời giải"
- Rate limit: "Số lượt còn lại hôm nay: 2/5" (nếu trial mode)
```
---

## SCREEN 7: RECENT PROBLEMS LIST

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Recent Problems List Screen

[SCREEN PURPOSE]
- Hiển thị danh sách đề bài đã giải gần đây
- User story: US-05, US-06
- Acceptance criteria: Có thể xem lại lời giải

[DESIGN REQUIREMENTS]
- Header: "Đề bài gần đây" + Filter button
- Filter options:
  - "Tất cả" / "Hôm nay" / "Tuần này"
- Problems list:
  - Mỗi problem card:
    - Problem preview: "Tính: 2/3 + 1/4"
    - Date: "15/12/2025 10:30"
    - Answer: "Đáp án: 11/12"
    - Related skills: "Rút gọn phân số, Cộng phân số"
    - Status icon: ✅ (đã xem hết) / ⏸️ (chưa xem hết)
    - Tap để xem lại lời giải
- Empty state:
  - Icon: 📚
  - Message: "Bạn chưa giải bài nào"
  - Button "Giải bài ngay"
- Pull to refresh
- Load more (pagination)

[VISUAL GUIDELINES]
- Problem cards: White, rounded 12px, padding 16px, margin 8px
- Problem preview: 16px Regular, truncated if long
- Date: 14px Regular, gray (#757575)
- Answer: 16px Bold, green (#4CAF50)
- Related skills: Tags, small, gray background
- Typography: Problem 16px Regular, Answer 16px Bold

[SPECIFICATIONS]
- Screen size: 375x812px
- Card height: 100px minimum
- Filter bar: Height 48px, sticky top

[ACCESSIBILITY]
- Problem cards: Touch target ≥ 44x44px (height 100px đã đạt yêu cầu)
- Problem cards: Có semantic labels với problem preview, date, answer
- Filter buttons: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Status icons: Kết hợp icon với text để hỗ trợ color blind users
- Empty state: Có semantic label "Chưa có đề bài đã giải"

[STATES]
- Default: Hiển thị danh sách problems
- Loading: Skeleton cards khi đang fetch problems
- Filter selected: Active filter có background primary color
- Filter unselected: Grey background
- Card tap: Navigate đến Step-by-Step Solution screen (xem lại)
- Pull to refresh: Loading indicator khi refresh
- Load more: Loading indicator ở cuối list
- Empty state: Icon + message + CTA button

[NAVIGATION]
- Entry: Từ Tutor Mode Entry screen (khi scroll xuống Recent problems section) hoặc từ Solution Complete (khi click "Lưu vào lịch sử")
- Exit:
  - Tap problem card → Step-by-Step Solution screen (xem lại)
  - Back button → Tutor Mode Entry screen
- Deep link: `/tutor/history` hoặc `/tutor/history/{problemId}`

[CONTENT EXAMPLES]
- Header: "Đề bài gần đây"
- Filter: "Tất cả | Hôm nay | Tuần này"
- Problem: "Tính: 2/3 + 1/4 - 15/12/2025 10:30 - Đáp án: 11/12"
- Status: ✅ (đã xem hết) / ⏸️ (chưa xem hết)
- Empty: "Bạn chưa giải bài nào" + "Hãy giải bài đầu tiên để xem ở đây" + Button "Giải bài ngay"
- Loading: Skeleton cards
- Error: "Không thể tải danh sách. Vui lòng thử lại." + Button "Thử lại"
```
---

## NOTES

- **Rate Limiting:**
  - Trial mode: 3-5 lượt giải bài/ngày
  - Hiển thị rõ ràng số lượt còn lại
  - Warning khi sắp hết lượt
  - Disable buttons khi hết lượt
  
- **Loading states:**
  - Tất cả screens cần có loading state khi AI đang xử lý
  - Loading khi OCR, khi giải bài, khi fetch related skills
  
- **Error states:**
  - OCR error: "Không thể nhận dạng đề bài. Vui lòng chụp lại rõ hơn."
  - Solve error: "Không thể giải bài này. Vui lòng thử lại hoặc nhập đề bài khác."
  - Network error: "Không thể kết nối. Vui lòng thử lại."
  
- **Success states:**
  - Celebration khi giải đúng
  - Confetti animation khi hoàn thành
  
- **Step-by-step:**
  - Phải có animation nhẹ khi chuyển bước
  - Smooth scroll khi chuyển bước
  - Progress indicator rõ ràng
  
- **Related skills:**
  - Hiển thị skills liên quan từ API response
  - Cho phép tap để xem skill detail hoặc luyện tập

---

- ← Quay lại: [Figma Prompt Library](../README.md)

