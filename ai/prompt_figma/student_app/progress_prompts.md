# STUDENT APP - PROGRESS & TRACKING PROMPTS

**Project:** Tutor  
**Screen Group:** Progress Tracking & Mini Test  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-15-10-18

---

## SCREEN 1: PROGRESS DASHBOARD

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Progress Dashboard

[SCREEN PURPOSE]
- Hiển thị tiến độ học tập tổng quan
- User story: US-13
- Acceptance criteria: Số ngày học liên tiếp, tổng số bài, mastery theo skill

[DESIGN REQUIREMENTS]
- Header: "Tiến độ học tập"
- Streak section:
  - Large number: "🔥 5"
  - Label: "ngày liên tiếp"
  - Subtitle: "Tiếp tục phát huy!"
- Stats cards (3 columns):
  - Card 1: "Tổng bài đã làm" - "142 bài"
  - Card 2: "Tỉ lệ đúng" - "78%"
  - Card 3: "Thời gian học" - "12 giờ"
- Skills overview:
  - Section title: "Kỹ năng của bạn"
  - List skills với mastery:
    - Skill name: "Rút gọn phân số"
    - Mastery: Circular progress 65%
    - Status badge: "Đang cải thiện" / "Đã vững"
- Chart section (optional):
  - "Tiến bộ 7 ngày qua"
  - Line chart hoặc bar chart đơn giản
- Button "Xem chi tiết"

[VISUAL GUIDELINES]
- Streak: Large, prominent, orange (#FF9800)
- Stats cards: White, rounded 12px, shadow nhẹ
- Skill cards: White, có progress circle
- Mastery colors:
  - < 40%: Red (#F44336)
  - 40-69%: Orange (#FF9800)
  - 70-89%: Blue (#2196F3)
  - ≥ 90%: Green (#4CAF50)
- Typography: Stats 24px Bold, Labels 14px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Stats card: Padding 16px
- Skill card: Padding 16px, height 80px
- Progress circle: 60x60px

[CONTENT EXAMPLES]
- Streak: "🔥 5 ngày liên tiếp"
- Stats: "142 bài | 78% | 12 giờ"
- Skill: "Rút gọn phân số - 65%"
- Status: "Đang cải thiện"
```

---

## SCREEN 2: SKILL DETAIL

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Skill Detail Screen

[SCREEN PURPOSE]
- Chi tiết về một skill cụ thể
- User story: US-13
- Acceptance criteria: Hiển thị mastery, lịch sử luyện tập

[DESIGN REQUIREMENTS]
- Header: Skill name "Rút gọn phân số" + Back button
- Mastery display:
  - Large circular progress: 65%
  - Status: "Đang cải thiện"
  - Description: "Bạn đã làm 23 bài về kỹ năng này"
- Progress timeline:
  - "Tiến bộ 7 ngày qua"
  - Mini chart hoặc list:
    - "Ngày 1: 45%"
    - "Ngày 3: 52%"
    - "Ngày 5: 58%"
    - "Hôm nay: 65%"
- Recent practice:
  - "Bài tập gần đây"
  - List 5-10 bài đã làm:
    - Question preview
    - Result: ✅/❌
    - Date
- Prerequisites section:
  - "Kỹ năng cần có:"
  - List prerequisite skills với mastery
- Actions:
  - Button "Luyện tập thêm"
  - Button "Làm Mini Test" (nếu mastery ≥ 70%)

[VISUAL GUIDELINES]
- Mastery circle: Large (120x120px), prominent
- Timeline: Simple, easy to read
- Practice list: Cards, alternating colors
- Prerequisites: Gray cards, show mastery
- Typography: Skill name 20px Bold

[SPECIFICATIONS]
- Screen size: 375x812px
- Mastery circle: 120x120px
- Practice card: Padding 12px, height 60px

[CONTENT EXAMPLES]
- Skill: "Rút gọn phân số"
- Mastery: "65% - Đang cải thiện"
- Description: "Bạn đã làm 23 bài về kỹ năng này"
- Timeline: "45% → 52% → 58% → 65%"
- Button: "Luyện tập thêm"
```

---

## SCREEN 3: MINI TEST START

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Mini Test Start Screen

[SCREEN PURPOSE]
- Màn hình bắt đầu mini test
- User story: US-11
- Acceptance criteria: 5-7 câu hỏi, có giới hạn thời gian

[DESIGN REQUIREMENTS]
- Header: "Mini Test"
- Skill info:
  - Skill name: "Rút gọn phân số"
  - Mastery current: "65%"
- Test details card:
  - "Số câu hỏi: 6"
  - "Thời gian: 10 phút"
  - "Điểm đạt: ≥ 70%"
- Instructions:
  - "Bài test này sẽ kiểm tra kiến thức của bạn về:"
  - List skills được test (chính + prerequisite)
- Rules:
  - "✓ Không được quay lại câu trước"
  - "✓ Phải hoàn thành trong thời gian quy định"
  - "✓ Điểm ≥ 70% để pass"
- Button "Bắt đầu làm bài" (large, prominent)
- Back button

[VISUAL GUIDELINES]
- Test card: White, rounded 16px, padding 24px
- Details: Icon + text, clear hierarchy
- Instructions: Bullet points, easy to scan
- Button: Primary color, full width, height 56px
- Typography: Title 24px Bold, Details 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Test card: Padding 24px
- Button: Height 56px

[CONTENT EXAMPLES]
- Header: "Mini Test"
- Skill: "Rút gọn phân số (65%)"
- Details: "6 câu | 10 phút | ≥ 70%"
- Button: "Bắt đầu làm bài"
```

---

## SCREEN 4: MINI TEST QUESTION

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Mini Test Question Screen

[SCREEN PURPOSE]
- Hiển thị câu hỏi trong mini test
- User story: US-11
- Acceptance criteria: 5-7 câu, có timer, không quay lại

[DESIGN REQUIREMENTS]
- Header: Progress "Câu 2/6" + Timer "09:45"
- Timer warning: Red khi < 2 phút
- Question card:
  - Question number: "Câu 2"
  - Question text: "Rút gọn phân số: 24/36"
  - Format: Text hoặc image
- Answer options:
  - 4 options: A, B, C, D
  - Cards, tappable
  - Selected: Border #4CAF50
- Navigation:
  - "Câu trước" (disabled ở câu 1)
  - "Câu tiếp theo" (enabled)
  - "Nộp bài" (chỉ hiện ở câu cuối)
- Progress bar: Linear, show % completed
- Note: "Không thể quay lại sau khi chuyển câu"

[VISUAL GUIDELINES]
- Timer: Prominent, red khi warning
- Question card: White, padding 20px
- Options: Rounded 12px, padding 16px
- Selected: Border 2px #4CAF50, background #E8F5E9
- Progress bar: Green gradient
- Typography: Question 18px Semi-bold

[SPECIFICATIONS]
- Screen size: 375x812px
- Timer: 24px Bold
- Option height: 56px
- Progress bar: 4px height

[CONTENT EXAMPLES]
- Progress: "Câu 2/6"
- Timer: "09:45"
- Question: "Rút gọn phân số: 24/36"
- Options: A, B, C, D
- Button: "Câu tiếp theo"
```

---

## SCREEN 5: MINI TEST RESULT

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Mini Test Result Screen

[SCREEN PURPOSE]
- Hiển thị kết quả mini test
- User story: US-12
- Acceptance criteria: Điểm số %, chỉ rõ skill sai, đề xuất luyện tập

[DESIGN REQUIREMENTS]
- Result header:
  - Pass: ✅ "Hoàn thành!" (green)
  - Fail: ❌ "Chưa đạt" (orange)
  - Score: Large number "83%" hoặc "50%"
- Summary stats:
  - "Đúng: 5/6 câu"
  - "Thời gian: 8 phút 32 giây"
  - "Mastery: 65% → 75%"
- Skills breakdown:
  - "Kỹ năng đã làm:"
  - List skills với số câu đúng/sai:
    - "Rút gọn phân số: 4/5 ✅"
    - "So sánh phân số: 1/1 ✅"
- Recommendations:
  - Pass: "Bạn đã sẵn sàng học skill tiếp theo!"
  - Fail: "Nên luyện thêm về: Rút gọn phân số"
- Actions:
  - Pass: "Học skill tiếp theo" (primary)
  - Fail: "Luyện tập lại" (primary)
  - "Xem lại bài làm" (secondary)
  - "Về trang chủ" (text button)

[VISUAL GUIDELINES]
- Result header: Large, prominent, color-coded
- Score: 48px Bold, color based on pass/fail
- Stats cards: White, rounded, shadow
- Skills list: Cards, green/red indicators
- Recommendations: Highlighted card
- Typography: Score 48px, Stats 18px

[SPECIFICATIONS]
- Screen size: 375x812px
- Score display: 48px font
- Stats card: Padding 16px

[CONTENT EXAMPLES]
- Pass: "✅ Hoàn thành! 83%"
- Stats: "5/6 đúng | 8:32 | 65% → 75%"
- Skills: "Rút gọn phân số: 4/5 ✅"
- Recommendation: "Bạn đã sẵn sàng học skill tiếp theo!"
- Button: "Học skill tiếp theo"
```

---

## NOTES

- Tất cả progress screens cần có loading state
- Charts phải đơn giản, dễ hiểu cho học sinh
- Celebrations khi đạt milestone (streak, mastery)
- Encouragement messages khi chưa đạt

