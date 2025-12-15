# STUDENT APP - LEARNING FLOW PROMPTS

**Project:** Tutor  
**Screen Group:** Learning Flow & Practice  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

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
- Hiển thị câu hỏi luyện tập
- User story: US-09, US-10
- Acceptance criteria: Điều chỉnh độ khó theo năng lực

[DESIGN REQUIREMENTS]
- Header: Progress indicator "Câu 3/8" + Timer (nếu có)
- Question card:
  - Question text: "Rút gọn phân số: 12/18"
  - Format: Có thể là text, image, hoặc cả hai
- Answer options (nếu multiple choice):
  - 4 options: A, B, C, D
  - Mỗi option là card riêng, có thể tap
  - Selected state: Border màu #4CAF50, background #E8F5E9
- Or: Text input field (nếu tự luận)
- Button "Kiểm tra" (disabled khi chưa chọn/điền)
- Hint button: "💡 Gợi ý" (optional)
- Bottom: Skill indicator "Skill: Rút gọn phân số"

[VISUAL GUIDELINES]
- Question card: White, padding 20px, rounded 12px
- Options: Rounded 12px, padding 16px, có shadow nhẹ
- Selected option: Border 2px #4CAF50
- Timer: Red (#F44336) nếu < 30 giây
- Typography: Question 18px Semi-bold, Options 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Option height: 56px minimum
- Button: Fixed bottom, height 56px

[CONTENT EXAMPLES]
- Progress: "Câu 3/8"
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
- Screen: Practice Result / Feedback Screen

[SCREEN PURPOSE]
- Hiển thị kết quả sau khi làm bài
- User story: US-09, US-10
- Acceptance criteria: Ghi nhận đúng/sai, cập nhật mastery

[DESIGN REQUIREMENTS]
- Result indicator:
  - Correct: ✅ Icon + "Chính xác!" (màu xanh)
  - Incorrect: ❌ Icon + "Chưa đúng" (màu đỏ)
- Correct answer display:
  - "Đáp án đúng: 2/3"
  - Explanation: "12/18 = (12:6)/(18:6) = 2/3"
- Mastery update:
  - "Mastery: 45% → 52% (+7%)"
  - Progress bar animation
- Common mistakes section (nếu sai):
  - "Lưu ý: Không được rút gọn khi tử và mẫu không cùng chia hết cho một số"
- Button "Câu tiếp theo" hoặc "Xem lại"
- Skill link: "Luyện thêm: Rút gọn phân số"

[VISUAL GUIDELINES]
- Success state: Background #E8F5E9, icon màu #4CAF50
- Error state: Background #FFEBEE, icon màu #F44336
- Explanation: Gray background (#F5F5F5), padding 16px
- Mastery progress: Animated, green gradient
- Typography: Result 20px Bold, Explanation 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Result card: Padding 24px
- Button: Full width, height 48px

[CONTENT EXAMPLES]
- Success: "✅ Chính xác!"
- Answer: "Đáp án đúng: 2/3"
- Explanation: "12/18 = (12:6)/(18:6) = 2/3"
- Mastery: "45% → 52% (+7%)"
- Button: "Câu tiếp theo"
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
- Tổng kết sau khi hoàn thành session luyện tập
- User story: US-04
- Acceptance criteria: Hiển thị tiến độ, mastery update

[DESIGN REQUIREMENTS]
- Celebration element: Confetti animation hoặc icon
- Title: "Hoàn thành!"
- Summary stats:
  - "8/8 câu đã làm"
  - "Đúng: 6 câu"
  - "Sai: 2 câu"
  - "Tỉ lệ: 75%"
- Mastery improvement:
  - "Mastery tăng: 45% → 58%"
  - Visual progress bar
- Skill status:
  - "Rút gọn phân số: Đang cải thiện"
- Recommendations:
  - "Làm thêm 5 bài để đạt 70%"
  - Hoặc "Sẵn sàng cho Mini Test!"
- Buttons:
  - Primary: "Làm thêm bài" hoặc "Làm Mini Test"
  - Secondary: "Về trang chủ"

[VISUAL GUIDELINES]
- Background: Gradient celebration colors
- Stats cards: White, rounded, có icon
- Success color: #4CAF50
- Typography: Title 24px Bold, Stats 18px Semi-bold

[SPECIFICATIONS]
- Screen size: 375x812px
- Stats card: Padding 16px, margin 8px

[CONTENT EXAMPLES]
- Title: "Hoàn thành!"
- Stats: "8/8 câu | Đúng: 6 | Sai: 2 | Tỉ lệ: 75%"
- Mastery: "45% → 58% (+13%)"
- Recommendation: "Làm thêm 5 bài để đạt 70%"
```

---

## NOTES

- Tất cả practice screens cần có loading state khi submit
- Timer nên có visual warning khi sắp hết thời gian
- Progress indicators phải rõ ràng, dễ hiểu
- Feedback phải tích cực, khuyến khích học sinh

