# STUDENT APP - LEARNING FLOW PROMPTS

**Project:** Tutor  
**Screen Group:** Learning Flow & Practice  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

- ← Quay lại: [Figma Prompt Library](../README.md)

---

## SCREEN 1: TODAY'S LEARNING PLAN

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Today's Learning Plan / Home Screen

[SCREEN PURPOSE]
- Hiển thị lộ trình học hôm nay
- User story: US-03, US-04
- Acceptance criteria: 1-2 skill trọng tâm, 5-10 bài tập, thời lượng 15-30 phút

[DESIGN REQUIREMENTS]
- Header: "Lộ trình hôm nay" + Date
- Progress indicator: Circular hoặc linear, hiển thị % hoàn thành
- Main card: "Học hôm nay"
  - Skill name: "Rút gọn phân số"
  - Mastery level: 45% (hiển thị bằng progress bar)
  - Number of questions: "8 bài tập"
  - Estimated time: "~20 phút"
  - Button "Bắt đầu học"
- Secondary section: "Tiến độ tuần"
  - Streak: "🔥 5 ngày liên tiếp"
  - Total questions: "42 bài đã làm"
- Bottom navigation: Home, Practice, Tutor, Progress

[VISUAL GUIDELINES]
- Background: #F5F5F5
- Main card: White background, shadow nhẹ, rounded 16px
- Progress bar: Green gradient (#4CAF50)
- Streak badge: Orange (#FF9800), có icon lửa
- Typography: Title 20px Bold, Body 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Card padding: 20px
- Progress bar height: 8px
- Button height: 48px

[CONTENT EXAMPLES]
- Header: "Lộ trình hôm nay - 15/12/2025"
- Skill: "Rút gọn phân số"
- Mastery: "45%"
- Questions: "8 bài tập"
- Time: "~20 phút"
- Streak: "🔥 5 ngày liên tiếp"
```

---

## SCREEN 2: PRACTICE QUESTION

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Practice Question Screen

[SCREEN PURPOSE]
- Hiển thị câu hỏi luyện tập trong session
- User story: US-09, US-10
- Acceptance criteria: Điều chỉnh độ khó theo năng lực, feedback ngay sau mỗi bài

[DESIGN REQUIREMENTS]
- Header: 
  - Progress indicator "Câu 3/8" 
  - Session progress bar: Linear, hiển thị "3/8 bài đã làm"
  - Difficulty badge: "Độ khó: Dễ" / "Trung bình" / "Khó" (màu xanh/cam/đỏ)
- Question card:
  - Question text: "Rút gọn phân số: 12/18"
  - Format: Có thể là text, image, hoặc cả hai
- Answer options (nếu multiple choice):
  - 4 options: A, B, C, D
  - Mỗi option là card riêng, có thể tap
  - Selected state: Border màu #4CAF50, background #E8F5E9
- Or: Text input field (nếu tự luận)
- Button "Kiểm tra" (disabled khi chưa chọn/điền)
- Hint button: "💡 Gợi ý" (optional, hiển thị khi sai ≥2 lần liên tiếp)
- Bottom: 
  - Skill indicator "Skill: Rút gọn phân số"
  - Session info: "Tiến độ: 3/8 bài"

[VISUAL GUIDELINES]
- Question card: White, padding 20px, rounded 12px
- Options: Rounded 12px, padding 16px, có shadow nhẹ
- Selected option: Border 2px #4CAF50
- Progress bar: Green gradient, height 4px, full width
- Difficulty badge: Rounded pill, padding 8px 12px
- Typography: Question 18px Semi-bold, Options 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Option height: 56px minimum
- Button: Fixed bottom, height 56px
- Progress bar: Height 4px, margin top 8px

[CONTENT EXAMPLES]
- Progress: "Câu 3/8"
- Progress bar: "3/8 bài đã làm"
- Difficulty: "Độ khó: Trung bình"
- Question: "Rút gọn phân số: 12/18"
- Option A: "2/3"
- Option B: "3/4"
- Option C: "4/5"
- Option D: "6/9"
- Button: "Kiểm tra"
```

---

## SCREEN 3: PRACTICE RESULT

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Practice Result / Feedback Screen (Immediate feedback sau mỗi bài)

[SCREEN PURPOSE]
- Hiển thị kết quả ngay sau khi làm bài (flow B+)
- User story: US-09, US-10
- Acceptance criteria: Ghi nhận đúng/sai, cập nhật mastery, adaptive difficulty notification

[DESIGN REQUIREMENTS]
- Result indicator:
  - Correct: ✅ Icon + "Chính xác!" hoặc "Tuyệt vời!" (màu xanh)
  - Incorrect: ❌ Icon + "Chưa đúng" + "Không sao, bạn đã học được điều gì đó!" (màu đỏ)
- Correct answer display:
  - "Đáp án đúng: 2/3"
  - Explanation: "12/18 = (12:6)/(18:6) = 2/3"
- Mastery update:
  - "Mastery: 45% → 52% (+7%)"
  - Progress bar animation (smooth transition)
- Adaptive difficulty notification:
  - Nếu đúng ≥5 liên tiếp: "🎉 Độ khó sẽ tăng ở câu tiếp theo!"
  - Nếu sai ≥2 liên tiếp: "💡 Độ khó sẽ giảm để bạn dễ hiểu hơn"
- Common mistakes section (nếu sai):
  - "⚠️ Lưu ý: Không được rút gọn khi tử và mẫu không cùng chia hết cho một số"
- Session progress: "Đã làm: 3/8 bài"
- Buttons:
  - Primary: "Câu tiếp theo ▶" (full width, prominent)
  - Secondary: "Tạm dừng" (lưu tiến độ, có thể quay lại sau)
  - Tertiary: "Xem lại giải thích" (nếu sai)

[VISUAL GUIDELINES]
- Success state: Background #E8F5E9, icon màu #4CAF50, celebration animation nhẹ
- Error state: Background #FFEBEE, icon màu #F44336, encouraging message
- Explanation: Gray background (#F5F5F5), padding 16px, rounded 8px
- Mastery progress: Animated progress bar, green gradient, smooth transition
- Adaptive notification: Highlighted card, màu vàng (#FFF9E6) cho warning, xanh (#E8F5E9) cho success
- Typography: Result 20px Bold, Explanation 16px Regular, Encouragement 14px Italic

[SPECIFICATIONS]
- Screen size: 375x812px
- Result card: Padding 24px, margin 16px
- Primary button: Full width, height 56px, rounded 12px
- Secondary button: Height 48px, outlined style
- Animation: Mastery progress bar có smooth animation 0.5s

[CONTENT EXAMPLES]
- Success: "✅ Chính xác!" + "Tuyệt vời!"
- Answer: "Đáp án đúng: 2/3"
- Explanation: "12/18 = (12:6)/(18:6) = 2/3"
- Mastery: "45% → 52% (+7%)"
- Adaptive: "🎉 Độ khó sẽ tăng ở câu tiếp theo!" (khi đúng ≥5)
- Adaptive: "💡 Độ khó sẽ giảm để bạn dễ hiểu hơn" (khi sai ≥2)
- Button primary: "Câu tiếp theo ▶"
- Button secondary: "Tạm dừng"
```

---

## SCREEN 4: PRACTICE SESSION COMPLETE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Practice Session Complete

[SCREEN PURPOSE]
- Tổng kết sau khi hoàn thành tất cả bài trong session
- User story: US-04
- Acceptance criteria: Hiển thị tiến độ, mastery update, đề xuất next action

[DESIGN REQUIREMENTS]
- Celebration element: Confetti animation hoặc icon 🎉
- Title: "Hoàn thành session!"
- Summary stats (4 cards):
  - Card 1: "8/8 câu đã làm" + icon checklist
  - Card 2: "Đúng: 6 câu" + icon ✅
  - Card 3: "Sai: 2 câu" + icon ❌
  - Card 4: "Tỉ lệ: 75%" + icon 📊
- Mastery improvement:
  - "Mastery tăng: 45% → 58% (+13%)"
  - Visual progress bar với animation
  - "Bạn đã cải thiện rất nhiều!"
- Skill status:
  - "Rút gọn phân số: Đang cải thiện"
  - Badge màu cam (#FF9800)
- Session persistence note:
  - "Tiến độ đã được lưu. Bạn có thể tiếp tục sau!"
- Recommendations:
  - Nếu mastery < 70%: "Làm thêm 5 bài để đạt 70%"
  - Nếu mastery ≥ 70%: "🎯 Sẵn sàng cho Mini Test!"
  - Nếu đã đủ bài luyện tập: "Bạn đã làm đủ bài! Hãy làm Mini Test để kiểm tra kiến thức"
- Buttons:
  - Primary: "Làm Mini Test" (nếu unlock) hoặc "Làm thêm bài"
  - Secondary: "Về trang chủ"
  - Tertiary: "Xem lại bài làm" (nếu có bài sai)

[VISUAL GUIDELINES]
- Background: Gradient celebration colors (#E8F5E9 → #FFFFFF)
- Stats cards: White, rounded 12px, shadow nhẹ, có icon, 2x2 grid
- Success color: #4CAF50
- Mastery progress: Large progress bar, animated, green gradient
- Typography: Title 24px Bold, Stats 18px Semi-bold, Description 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Stats card: Padding 16px, margin 8px, min height 80px
- Mastery progress bar: Height 12px, full width
- Button: Height 56px, rounded 12px

[CONTENT EXAMPLES]
- Title: "Hoàn thành session!"
- Stats: "8/8 câu | Đúng: 6 | Sai: 2 | Tỉ lệ: 75%"
- Mastery: "45% → 58% (+13%)"
- Encouragement: "Bạn đã cải thiện rất nhiều!"
- Recommendation: "🎯 Sẵn sàng cho Mini Test!" (nếu mastery ≥ 70%)
- Button primary: "Làm Mini Test"
- Button secondary: "Về trang chủ"
```

---

## SCREEN 5: SKILL SELECTION (Khi có nhiều skill yếu)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Skill Selection Screen

[SCREEN PURPOSE]
- Cho học sinh chọn skill để luyện tập khi có nhiều skill yếu
- User story: US-09
- Acceptance criteria: Hiển thị danh sách skill yếu với mastery

[DESIGN REQUIREMENTS]
- Header: "Chọn kỹ năng để luyện tập"
- Description: "Bạn có thể chọn một trong các kỹ năng sau để cải thiện"
- Skill cards (list):
  - Mỗi card hiển thị:
    - Skill name: "Rút gọn phân số"
    - Mastery: Circular progress 45%
    - Status badge: "Yếu" / "Chưa vững"
    - Number of questions: "8 bài tập"
    - Estimated time: "~20 phút"
  - Selected state: Border #4CAF50, background #E8F5E9
- Priority indicator:
  - "⭐ Ưu tiên" badge cho skill yếu nhất hoặc prerequisite quan trọng
- Button "Bắt đầu học" (disabled khi chưa chọn)
- Back button

[VISUAL GUIDELINES]
- Skill cards: White, rounded 16px, padding 20px, shadow nhẹ
- Mastery circle: 60x60px, màu theo mastery (<40: đỏ, 40-69: cam, ≥70: xanh)
- Selected: Border 2px #4CAF50, background #E8F5E9
- Priority badge: Orange (#FF9800), có icon sao
- Typography: Skill name 18px Bold, Mastery 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Card spacing: 12px
- Card height: 100px minimum
- Button: Fixed bottom, height 56px

[CONTENT EXAMPLES]
- Header: "Chọn kỹ năng để luyện tập"
- Skill 1: "Rút gọn phân số - 45% - Yếu - 8 bài - ~20 phút"
- Skill 2: "So sánh phân số - 52% - Chưa vững - 6 bài - ~15 phút"
- Button: "Bắt đầu học"
```
---

## SCREEN 6: PRACTICE HISTORY

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Practice History Screen

[SCREEN PURPOSE]
- Hiển thị lịch sử luyện tập của học sinh
- User story: US-13
- Acceptance criteria: Hiển thị bài đã làm, kết quả, thời gian

[DESIGN REQUIREMENTS]
- Header: "Lịch sử luyện tập" + Filter button
- Filter options:
  - "Tất cả" / "Hôm nay" / "Tuần này" / "Theo skill"
- Practice sessions list:
  - Mỗi session card:
    - Date: "15/12/2025"
    - Skill name: "Rút gọn phân số"
    - Stats: "8 bài | Đúng: 6 | Sai: 2 | 75%"
    - Mastery change: "45% → 58% (+13%)"
    - Time: "20 phút"
    - Result icon: ✅ (nếu tỉ lệ ≥70%) / ⚠️ (nếu <70%)
- Empty state:
  - Icon: 📚
  - Message: "Bạn chưa có bài luyện tập nào"
  - Button "Bắt đầu học"
- Pull to refresh
- Load more (pagination)

[VISUAL GUIDELINES]
- Session cards: White, rounded 12px, padding 16px, margin 8px
- Success card: Border left 4px #4CAF50
- Warning card: Border left 4px #FF9800
- Stats: Icon + text, compact layout
- Typography: Date 14px Regular, Skill name 16px Bold, Stats 14px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Card height: 100px minimum
- Filter bar: Height 48px, sticky top

[CONTENT EXAMPLES]
- Header: "Lịch sử luyện tập"
- Filter: "Tất cả | Hôm nay | Tuần này"
- Session: "15/12/2025 - Rút gọn phân số - 8 bài | Đúng: 6 | 75% - 45% → 58% - 20 phút"
- Empty: "Bạn chưa có bài luyện tập nào"
```
---

## SCREEN 7: SESSION RESUME (Khi tạm dừng)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Session Resume Screen

[SCREEN PURPOSE]
- Cho học sinh tiếp tục session đã tạm dừng
- User story: US-04
- Acceptance criteria: Hiển thị tiến độ đã làm, cho phép tiếp tục

[DESIGN REQUIREMENTS]
- Header: "Tiếp tục luyện tập"
- Session info card:
  - Skill name: "Rút gọn phân số"
  - Progress: "Đã làm: 3/8 bài"
  - Progress bar: Visual indicator
  - Started: "Bắt đầu: 15/12/2025 10:30"
  - Last activity: "Lần cuối: 15/12/2025 10:45"
- Current mastery: "Mastery hiện tại: 52%"
- Resume options:
  - Button "Tiếp tục từ câu 4" (primary)
  - Button "Bắt đầu lại từ đầu" (secondary, warning)
- Option to discard: "Bỏ session này" (text button, red)

[VISUAL GUIDELINES]
- Info card: White, rounded 16px, padding 20px
- Progress bar: Green gradient, height 8px
- Resume button: Primary color, full width, height 56px
- Warning button: Orange (#FF9800), outlined
- Typography: Skill name 20px Bold, Progress 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Card padding: 20px
- Button spacing: 12px

[CONTENT EXAMPLES]
- Header: "Tiếp tục luyện tập"
- Skill: "Rút gọn phân số"
- Progress: "Đã làm: 3/8 bài"
- Mastery: "Mastery hiện tại: 52%"
- Button: "Tiếp tục từ câu 4"
```
---

## NOTES

- **Flow B+ Implementation:**
  - Feedback ngay sau mỗi bài (SCREEN 3)
  - Có thể tạm dừng và tiếp tục (SCREEN 7)
  - Adaptive difficulty notification hiển thị rõ ràng
  - Session persistence: Tiến độ được lưu tự động
  
- **Loading states:**
  - Tất cả practice screens cần có loading state khi submit
  - Loading khi fetch next question
  
- **Error states:**
  - Network error: "Không thể kết nối. Vui lòng thử lại."
  - Session expired: "Session đã hết hạn. Bắt đầu session mới?"
  
- **Empty states:**
  - Practice History: "Bạn chưa có bài luyện tập nào"
  - Skill Selection: "Không có skill yếu. Tuyệt vời!"
  
- **Progress indicators:**
  - Session progress bar phải rõ ràng, dễ hiểu
  - Mastery progress có animation smooth
  
- **Feedback:**
  - Phải tích cực, khuyến khích học sinh
  - Encouragement messages sau mỗi bài
  - Celebration khi hoàn thành session

---

- ← Quay lại: [Figma Prompt Library](../README.md)

