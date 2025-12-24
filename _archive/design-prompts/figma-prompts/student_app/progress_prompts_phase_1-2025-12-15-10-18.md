# STUDENT APP - PROGRESS & TRACKING PROMPTS

**Project:** Tutor  
**Screen Group:** Progress Tracking & Mini Test  
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
- Weak skills section (nếu có):
  - "Kỹ năng cần cải thiện:"
  - List 3-5 skill yếu nhất (mastery < 70)
  - Quick action: "Luyện tập ngay"
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

[ACCESSIBILITY]
- Skill cards: Touch target ≥ 44x44px (height 80px đã đạt yêu cầu)
- Skill cards: Có semantic labels với skill name, mastery, status
- Mastery circles: Có semantic label "Mastery 65%" với color coding
- Charts: Có semantic labels mô tả data (ví dụ: "Tiến bộ 7 ngày: tăng từ 45% lên 65%")
- Buttons: Touch target ≥ 44x44px
- Status badges: Kết hợp màu với text để hỗ trợ color blind users

[STATES]
- Default: Hiển thị progress data
- Loading: Skeleton cards khi đang fetch progress data
- Empty: "Chưa có dữ liệu tiến độ. Hãy bắt đầu học để xem tiến độ ở đây." với button "Bắt đầu học"
- Skill card tap: Navigate đến Skill Detail screen
- Button pressed: Scale down 0.95, duration 100-200ms

[NAVIGATION]
- Entry: Từ Bottom navigation (Progress tab) hoặc từ Today's Learning Plan
- Exit:
  - Tap skill card → Skill Detail screen
  - Button "Xem chi tiết" → Skill Detail screen (skill đầu tiên)
  - Button "Luyện tập ngay" (weak skills) → Skill Selection screen
  - Bottom nav: Home, Practice, Tutor, Profile
- Back button: Không có (main screen trong Progress tab)
- Deep link: `/progress` hoặc `/progress/dashboard`

[CONTENT EXAMPLES]
- Header: "Tiến độ học tập"
- Streak: "🔥 5 ngày liên tiếp"
- Stats: "142 bài | 78% | 12 giờ"
- Skill: "Rút gọn phân số - 65% - Đang cải thiện"
- Weak skills: "Kỹ năng cần cải thiện: Rút gọn phân số (45%)" + Button "Luyện tập ngay"
- Empty: "Chưa có dữ liệu tiến độ. Hãy bắt đầu học để xem tiến độ ở đây."
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

[ACCESSIBILITY]
- Buttons: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Mastery circle: Có semantic label "Mastery 65%, đang cải thiện"
- Timeline/chart: Có semantic labels mô tả progress (ví dụ: "Tiến bộ: 45% ngày 1, 52% ngày 3, 58% ngày 5, 65% hôm nay")
- Practice cards: Có semantic labels với question preview, result, date
- Prerequisite cards: Có semantic labels với skill name và mastery

[STATES]
- Default: Hiển thị skill detail
- Loading: Skeleton khi đang fetch skill data
- Button "Làm Mini Test" visible: Khi mastery ≥ 70%
- Button "Làm Mini Test" hidden: Khi mastery < 70%
- Button pressed: Scale down 0.95, duration 100-200ms
- Practice card tap: (có thể là modal review hoặc navigate)

[NAVIGATION]
- Entry: Từ Progress Dashboard (khi tap skill card) hoặc từ Recommendations
- Exit:
  - Button "Luyện tập thêm" → Skill Selection hoặc Practice Question (session mới)
  - Button "Làm Mini Test" → Mini Test Start screen
  - Tap prerequisite skill → Skill Detail screen (skill đó)
  - Back button → Progress Dashboard
- Deep link: `/progress/skill/{skillId}`

[CONTENT EXAMPLES]
- Skill: "Rút gọn phân số"
- Mastery: "65% - Đang cải thiện"
- Description: "Bạn đã làm 23 bài về kỹ năng này"
- Timeline: "45% → 52% → 58% → 65%"
- Button primary: "Luyện tập thêm"
- Button secondary: "Làm Mini Test" (chỉ hiện khi mastery ≥ 70%)
- Prerequisites: "Kỹ năng cần có: Nhận biết phân số (80%)"
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
- Unlock condition: Đã làm đủ số bài luyện tập (ví dụ: 10 bài) về skill đó

[DESIGN REQUIREMENTS]
- Header: "Mini Test"
- Skill info:
  - Skill name: "Rút gọn phân số"
  - Mastery current: "65%"
- Unlock status (nếu vừa unlock):
  - "🎉 Bạn đã làm đủ bài luyện tập! Sẵn sàng cho Mini Test"
  - "Đã làm: 10/10 bài luyện tập"
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

[ACCESSIBILITY]
- Button: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Test details card: Có semantic labels cho số câu, thời gian, điểm đạt
- Unlock status: Có semantic label "Đã làm đủ 10/10 bài luyện tập, sẵn sàng cho Mini Test"
- Instructions: Có semantic labels cho mỗi rule

[STATES]
- Default: Hiển thị test details và instructions
- Unlock celebration: Khi vừa unlock, hiển thị celebration animation
- Button pressed: Scale down 0.95, duration 100-200ms
- Button loading: Không có (màn hình này chỉ hiển thị info)

[NAVIGATION]
- Entry: Từ Skill Detail screen (khi click "Làm Mini Test") hoặc từ Practice Session Complete (khi mastery ≥ 70%)
- Exit:
  - Button "Bắt đầu làm bài" → Mini Test Question screen (câu 1)
  - Back button → Skill Detail screen hoặc Progress Dashboard
- Deep link: `/progress/mini-test/{skillId}/start`

[CONTENT EXAMPLES]
- Header: "Mini Test"
- Skill: "Rút gọn phân số (65%)"
- Unlock: "🎉 Bạn đã làm đủ bài luyện tập! Sẵn sàng cho Mini Test" + "Đã làm: 10/10 bài luyện tập"
- Details: "Số câu hỏi: 6 | Thời gian: 10 phút | Điểm đạt: ≥ 70%"
- Instructions: "Bài test này sẽ kiểm tra kiến thức của bạn về: Rút gọn phân số, So sánh phân số"
- Rules: "✓ Không được quay lại câu trước | ✓ Phải hoàn thành trong thời gian quy định | ✓ Điểm ≥ 70% để pass"
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

[ACCESSIBILITY]
- Answer options: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Answer options: Có semantic labels "Đáp án A: 2/3", "Đáp án B: 3/4", etc.
- Selected option: Kết hợp màu xanh với border để hỗ trợ color blind users
- Timer: Có semantic label "Thời gian còn lại: 9 phút 45 giây"
- Progress indicator: Có semantic label "Câu 2 trong tổng số 6 câu"
- Button "Câu trước": Disabled ở câu 1, có semantic label "Không thể quay lại câu trước"

[STATES]
- Default: Question hiển thị, chưa chọn đáp án
- Option selected: Border 2px #4CAF50, background #E8F5E9
- Option unselected: Border 1px #E0E0E0, background #FFFFFF
- Button "Câu trước" disabled: Ở câu 1, grey (#BDBDBD)
- Button "Câu trước" enabled: Từ câu 2 trở đi
- Button "Câu tiếp theo" enabled: Trừ câu cuối
- Button "Nộp bài" visible: Chỉ ở câu cuối
- Timer warning: Màu #F44336 khi < 2 phút
- Timer expired: Hiển thị "Hết thời gian" và tự động nộp bài
- Note visible: "Không thể quay lại sau khi chuyển câu" (có thể ẩn sau khi đã chuyển câu)

[NAVIGATION]
- Entry: Từ Mini Test Start screen (khi click "Bắt đầu làm bài")
- Exit:
  - Button "Câu tiếp theo" → Next question (trong cùng screen)
  - Button "Câu trước" → Previous question (trong cùng screen, chỉ từ câu 2)
  - Button "Nộp bài" (câu cuối) → Mini Test Result screen
  - Timer expired → Tự động nộp bài → Mini Test Result screen
- Back button: Disabled hoặc có confirmation dialog "Bạn có chắc muốn thoát? Tiến độ sẽ bị mất."
- Deep link: Không áp dụng (test đang diễn ra)

[CONTENT EXAMPLES]
- Progress: "Câu 2/6"
- Timer: "09:45" (màu đỏ khi < 2 phút)
- Question: "Rút gọn phân số: 24/36"
- Options: A: "2/3", B: "3/4", C: "4/5", D: "6/9"
- Button previous: "◀ Câu trước" (disabled ở câu 1)
- Button next: "Câu tiếp theo ▶" (hoặc "Nộp bài" ở câu cuối)
- Note: "Không thể quay lại sau khi chuyển câu"
- Timer expired: "Hết thời gian! Đang nộp bài..."
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

[ACCESSIBILITY]
- Buttons: Touch target ≥ 44x44px (height 56px đã đạt yêu cầu)
- Result header: Có semantic label "Hoàn thành với điểm 83%" hoặc "Chưa đạt với điểm 50%"
- Stats cards: Có semantic labels cho mỗi stat
- Skills breakdown: Có semantic labels cho mỗi skill với số câu đúng/sai
- Pass/Fail indicators: Kết hợp icon với text để hỗ trợ color blind users

[STATES]
- Default: Hiển thị result sau khi nộp bài
- Pass state: Background #E8F5E9, icon ✅ màu #4CAF50, celebration animation
- Fail state: Background #FFF9E6, icon ❌ màu #FF9800, encouraging message
- Mastery animation: Progress bar animate từ 65% → 75% trong 0.5s
- Button pressed: Scale down 0.95, duration 100-200ms
- Celebration animation: Confetti hoặc icon 🎉 (có thể disable nếu reduced motion)

[NAVIGATION]
- Entry: Từ Mini Test Question screen (khi click "Nộp bài" hoặc hết thời gian)
- Exit:
  - Button "Học skill tiếp theo" (pass) → Skill Detail screen (skill tiếp theo) hoặc Progress Dashboard
  - Button "Luyện tập lại" (fail) → Skill Selection hoặc Practice Question
  - Button "Xem lại bài làm" → (có thể là modal hoặc screen review)
  - Button "Về trang chủ" → Today's Learning Plan
- Back button: Không có (hoặc disabled, vì đã hoàn thành test)
- Deep link: Không áp dụng

[CONTENT EXAMPLES]
- Pass: "✅ Hoàn thành! 83%"
- Fail: "❌ Chưa đạt 50%"
- Stats: "Đúng: 5/6 câu | Thời gian: 8 phút 32 giây | Mastery: 65% → 75%"
- Skills: "Rút gọn phân số: 4/5 ✅ | So sánh phân số: 1/1 ✅"
- Recommendation pass: "Bạn đã sẵn sàng học skill tiếp theo!"
- Recommendation fail: "Nên luyện thêm về: Rút gọn phân số"
- Button primary pass: "Học skill tiếp theo"
- Button primary fail: "Luyện tập lại"
- Button secondary: "Xem lại bài làm"
- Button tertiary: "Về trang chủ"
```

---

## SCREEN 6: RECOMMENDATIONS (Gợi ý cải thiện)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Student 11-13 tuổi
- Platform: Mobile App
- Screen: Recommendations Screen

[SCREEN PURPOSE]
- Hiển thị gợi ý cải thiện học tập dựa trên dữ liệu thực tế
- User story: US-14
- Acceptance criteria: Gợi ý dựa trên dữ liệu học tập, ngôn ngữ đơn giản

[DESIGN REQUIREMENTS]
- Header: "Gợi ý học tập" + Back button
- Summary card:
  - "Dựa trên tiến độ học tập của bạn, chúng tôi gợi ý:"
- Recommendations list:
  - Mỗi recommendation card:
    - Icon: 💡 / 🎯 / ⚠️
    - Title: "Luyện tập thêm về Rút gọn phân số"
    - Description: "Bạn đã làm sai 3/5 bài về kỹ năng này. Hãy luyện tập thêm để cải thiện!"
    - Action: "Luyện tập ngay" (button)
    - Priority: "Ưu tiên cao" badge (nếu là skill yếu nhất)
- Weak skills section:
  - "Kỹ năng cần cải thiện:"
  - List 3-5 skill yếu nhất với:
    - Skill name
    - Mastery: "45%"
    - Status: "Yếu"
    - Recommendation: "Làm thêm 5 bài để đạt 70%"
- Prerequisites section (nếu có):
  - "⚠️ Bạn cần học kỹ năng cơ bản trước:"
  - List prerequisite skills với mastery
  - "Học skill này trước"
- Next steps:
  - "Bước tiếp theo:"
  - "1. Luyện tập về Rút gọn phân số (5 bài)"
  - "2. Làm Mini Test khi đạt 70%"
  - "3. Chuyển sang skill tiếp theo"

[VISUAL GUIDELINES]
- Recommendation cards: White, rounded 12px, padding 20px, shadow nhẹ
- Priority badge: Orange (#FF9800), rounded pill
- Weak skills: Cards với mastery progress bar
- Prerequisites: Warning style, yellow background (#FFF9E6)
- Typography: Title 18px Bold, Description 16px Regular

[SPECIFICATIONS]
- Screen size: 375x812px
- Card padding: 20px
- Card spacing: 12px
- Button height: 48px

[ACCESSIBILITY]
- Recommendation cards: Touch target ≥ 44x44px (card height đủ lớn)
- Buttons: Touch target ≥ 44x44px (height 48px đã đạt yêu cầu)
- Cards: Có semantic labels với recommendation title và description
- Priority badges: Có semantic label "Ưu tiên cao"
- Weak skills: Có semantic labels với skill name, mastery, recommendation
- Prerequisites: Có semantic labels với skill name và mastery

[STATES]
- Default: Hiển thị recommendations
- Loading: Skeleton cards khi đang fetch recommendations
- Button pressed: Scale down 0.95, duration 100-200ms
- Button loading: Hiển thị spinner khi đang navigate
- Empty: "Không có gợi ý nào. Bạn đang học rất tốt!" với button "Về trang chủ"

[NAVIGATION]
- Entry: Từ Progress Dashboard (khi có recommendations) hoặc từ Mini Test Result (khi fail)
- Exit:
  - Button "Luyện tập ngay" (recommendation) → Skill Selection hoặc Practice Question
  - Button "Học skill này trước" (prerequisite) → Skill Detail screen
  - Tap weak skill card → Skill Detail screen
  - Back button → Progress Dashboard
- Deep link: `/progress/recommendations`

[CONTENT EXAMPLES]
- Header: "Gợi ý học tập"
- Summary: "Dựa trên tiến độ học tập của bạn, chúng tôi gợi ý:"
- Recommendation: "💡 Luyện tập thêm về Rút gọn phân số - Bạn đã làm sai 3/5 bài. Hãy luyện tập thêm!" + Button "Luyện tập ngay"
- Weak skill: "Rút gọn phân số - 45% - Yếu - Làm thêm 5 bài để đạt 70%"
- Prerequisite: "⚠️ Bạn cần học: Nhận biết phân số (30%) trước" + Button "Học skill này trước"
- Next steps: "1. Luyện tập về Rút gọn phân số (5 bài) | 2. Làm Mini Test khi đạt 70% | 3. Chuyển sang skill tiếp theo"
- Empty: "Không có gợi ý nào. Bạn đang học rất tốt!"
```
---

## NOTES

- Tất cả progress screens cần có loading state
- Charts phải đơn giản, dễ hiểu cho học sinh
- Celebrations khi đạt milestone (streak, mastery)
- Encouragement messages khi chưa đạt
- Recommendations phải dựa trên dữ liệu thực tế, không generic
- Ngôn ngữ gợi ý đơn giản, không thuật ngữ kỹ thuật

---

- ← Quay lại: [Figma Prompt Library](../README.md)

