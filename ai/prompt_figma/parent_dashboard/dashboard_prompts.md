# PARENT DASHBOARD - DASHBOARD PROMPTS

**Project:** Tutor  
**Screen Group:** Main Dashboard & Overview  
**Platform:** Web Dashboard (Next.js)  
**Version:** 2025-12-15-10-18

---

## SCREEN 1: DASHBOARD OVERVIEW

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard (Desktop/Tablet)
- Screen: Dashboard Overview / Home

[SCREEN PURPOSE]
- Tổng quan tình hình học tập của con
- User story: PU-02, PU-03
- Acceptance criteria: Số ngày học, thời gian học, số bài đã làm, tỉ lệ đúng/sai

[DESIGN REQUIREMENTS]
- Header:
  - "Dashboard" hoặc "Tổng quan"
  - Period selector: "Tuần này" | "Tháng này" | "Tùy chọn"
  - Student name: "Con: [Tên học sinh]"
- Key metrics cards (4 cards, grid layout):
  - Card 1: "Số ngày học"
    - Large number: "5"
    - Label: "ngày trong tuần"
    - Trend: "+2 so với tuần trước" (green arrow)
  - Card 2: "Thời gian học"
    - Large number: "2.5"
    - Label: "giờ"
    - Trend: "+0.5 giờ"
  - Card 3: "Số bài đã làm"
    - Large number: "42"
    - Label: "bài tập"
    - Trend: "+8 bài"
  - Card 4: "Tỉ lệ đúng"
    - Large number: "78%"
    - Label: "đúng/sai"
    - Progress bar: Visual indicator
    - Trend: "+5%"
- Study activity chart:
  - Title: "Hoạt động học tập 7 ngày qua"
  - Bar chart hoặc line chart
  - X-axis: Days
  - Y-axis: Số bài / Thời gian
  - Simple, easy to understand
- Quick actions:
  - "Xem báo cáo chi tiết"
  - "Xem điểm yếu"
  - "Xem tiến bộ"

[VISUAL GUIDELINES]
- Background: #FAFAFA
- Cards: White, rounded 12px, shadow nhẹ, padding 24px
- Metrics: Large numbers (32-40px Bold), labels (14px Regular)
- Trend indicators: Green/red arrows, small text
- Chart: Simple colors, clear labels
- Typography: H1 24px Bold, Body 16px Regular
- Spacing: Generous, clear sections

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Card grid: 4 columns (desktop), 2 columns (tablet)
- Card padding: 24px
- Chart height: 300px

[CONTENT EXAMPLES]
- Header: "Dashboard - Tuần này"
- Metric 1: "5 ngày học | +2 so với tuần trước"
- Metric 2: "2.5 giờ | +0.5 giờ"
- Metric 3: "42 bài | +8 bài"
- Metric 4: "78% đúng | +5%"
- Chart: "Hoạt động học tập 7 ngày qua"
```

---

## SCREEN 2: STUDY ACTIVITY DETAIL

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Study Activity Detail

[SCREEN PURPOSE]
- Chi tiết hoạt động học tập theo ngày
- User story: PU-02, PU-03
- Acceptance criteria: Phân biệt thời gian học thực tế vs thời gian mở app

[DESIGN REQUIREMENTS]
- Header: "Hoạt động học tập" + Period selector
- Summary stats:
  - "Tổng thời gian học: 2.5 giờ"
  - "Số bài đã làm: 42 bài"
  - "Thời gian trung bình/bài: 3.5 phút"
- Daily breakdown table:
  - Columns: Ngày | Thời gian học | Số bài | Tỉ lệ đúng | Trạng thái
  - Rows: Mỗi ngày trong period
  - Status indicators:
    - "Tích cực" (green) - > 30 phút
    - "Bình thường" (yellow) - 15-30 phút
    - "Ít" (red) - < 15 phút
- Activity timeline (optional):
  - "Thời gian học trong ngày"
  - Simple bar chart per day
- Filters:
  - "Tất cả" | "Tích cực" | "Bình thường" | "Ít"
- Export button: "Xuất báo cáo"

[VISUAL GUIDELINES]
- Table: Clean, readable, alternating row colors
- Status badges: Color-coded, rounded
- Chart: Simple, clear
- Typography: Table 14px, Headers 16px Semi-bold
- Spacing: Comfortable row height

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Table: Full width, scrollable on mobile
- Row height: 48px
- Status badge: 24px height

[CONTENT EXAMPLES]
- Header: "Hoạt động học tập - Tuần này"
- Summary: "2.5 giờ | 42 bài | 3.5 phút/bài"
- Table columns: "Ngày | Thời gian | Số bài | Tỉ lệ | Trạng thái"
- Status: "Tích cực" (green badge)
```

---

## SCREEN 3: WEAK SKILLS

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Weak Skills / Điểm Yếu

[SCREEN PURPOSE]
- Hiển thị các kỹ năng con đang yếu
- User story: PU-06, PU-07
- Acceptance criteria: Danh sách chương/dạng yếu, không dùng thuật ngữ kỹ thuật, sắp xếp theo mức độ yếu

[DESIGN REQUIREMENTS]
- Header: "Điểm yếu của con" + Info icon (tooltip)
- Summary:
  - "Con đang yếu ở 3 kỹ năng"
  - "Cần luyện tập thêm để cải thiện"
- Skills list (cards):
  - Each card:
    - Skill name: "Rút gọn phân số" (simple language)
    - Mastery: "45%" (large, red if < 50%)
    - Progress bar: Visual indicator
    - Status: "Yếu" (red badge)
    - Description: "Con đang gặp khó khăn với kỹ năng này"
    - Recommendation: "Nên luyện tập thêm mỗi ngày 15 phút"
    - Trend: "Đang cải thiện" / "Chưa cải thiện"
- Priority indicator:
  - "Ưu tiên cao" (red) - Mastery < 40%
  - "Ưu tiên trung bình" (orange) - Mastery 40-60%
  - "Ưu tiên thấp" (yellow) - Mastery 60-70%
- Actions:
  - "Xem chi tiết" (per skill)
  - "Gợi ý luyện tập" (per skill)
- Empty state (nếu không có):
  - "Con không có điểm yếu nào!"
  - "Tiếp tục duy trì nhé!"

[VISUAL GUIDELINES]
- Cards: White, rounded 12px, shadow, padding 20px
- Mastery: Large number, color-coded (red < 50%, orange 50-70%, green > 70%)
- Progress bar: Visual, color-coded
- Priority badges: Color-coded, clear
- Typography: Skill name 18px Semi-bold, Description 14px Regular
- Spacing: Card margin 16px

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Card: Padding 20px, min height 120px
- Mastery: 32px Bold
- Progress bar: 8px height

[CONTENT EXAMPLES]
- Header: "Điểm yếu của con"
- Summary: "3 kỹ năng yếu | Cần luyện tập thêm"
- Skill: "Rút gọn phân số - 45% - Yếu"
- Description: "Con đang gặp khó khăn với kỹ năng này"
- Recommendation: "Nên luyện tập thêm mỗi ngày 15 phút"
- Priority: "Ưu tiên cao" (red badge)
```

---

## SCREEN 4: PROGRESS OVER TIME

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Progress Over Time

[SCREEN PURPOSE]
- Hiển thị tiến bộ của con theo thời gian
- User story: PU-05
- Acceptance criteria: So sánh tuần này vs tuần trước, tháng này vs tháng trước, biểu đồ đơn giản

[DESIGN REQUIREMENTS]
- Header: "Tiến bộ của con" + Period selector
- Comparison cards (2 cards):
  - Card 1: "Tuần này vs Tuần trước"
    - Metric: "Mastery trung bình"
    - This week: "68%"
    - Last week: "62%"
    - Change: "+6%" (green, up arrow)
  - Card 2: "Tháng này vs Tháng trước"
    - Metric: "Số skill đã vững"
    - This month: "12 skills"
    - Last month: "8 skills"
    - Change: "+4 skills" (green)
- Progress chart:
  - Title: "Mastery trung bình theo thời gian"
  - Line chart hoặc area chart
  - X-axis: Weeks/Months
  - Y-axis: Mastery percentage (0-100%)
  - Simple, clear trend line
  - Highlight current period
- Skills progress table:
  - "Kỹ năng đã cải thiện:"
  - Columns: Skill name | Tuần trước | Tuần này | Thay đổi
  - Sort by: Thay đổi (descending)
  - Top 5-10 skills
- Summary:
  - "Con đã cải thiện X kỹ năng trong tháng này"
  - "Tiếp tục khuyến khích con học đều đặn!"

[VISUAL GUIDELINES]
- Comparison cards: Side-by-side, clear numbers
- Chart: Simple colors, clear labels, trend line
- Table: Clean, readable
- Positive changes: Green, up arrow
- Negative changes: Red, down arrow (rare)
- Typography: Numbers 24px Bold, Labels 14px

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Chart height: 300px
- Comparison cards: Equal width, padding 20px

[CONTENT EXAMPLES]
- Header: "Tiến bộ của con - Tháng này"
- Comparison: "68% vs 62% | +6%"
- Chart: "Mastery trung bình theo thời gian"
- Table: "Kỹ năng đã cải thiện"
- Summary: "Con đã cải thiện 4 kỹ năng trong tháng này"
```

---

## SCREEN 5: SKILL DETAIL (PARENT VIEW)

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Skill Detail (Parent View)

[SCREEN PURPOSE]
- Chi tiết về một skill cụ thể từ góc nhìn phụ huynh
- User story: PU-06, PU-07
- Acceptance criteria: Ngôn ngữ đơn giản, không thuật ngữ kỹ thuật

[DESIGN REQUIREMENTS]
- Header: Skill name "Rút gọn phân số" + Back button
- Current status:
  - Mastery: "45%" (large, color-coded)
  - Status: "Yếu" (badge)
  - Description: "Con đang gặp khó khăn với kỹ năng này"
- Progress timeline:
  - "Tiến bộ 30 ngày qua"
  - Simple line chart: 45% → 48% → 45% → 52%
  - Trend: "Đang cải thiện" / "Chưa cải thiện"
- Practice summary:
  - "Con đã làm 23 bài về kỹ năng này"
  - "Đúng: 12 bài (52%)"
  - "Sai: 11 bài (48%)"
- Common mistakes (if available):
  - "Lỗi sai thường gặp:"
  - List 2-3 lỗi phổ biến (simple language)
- Recommendations:
  - "Gợi ý:"
  - "Nên luyện tập thêm mỗi ngày 15 phút"
  - "Tập trung vào: [specific area]"
- Related skills:
  - "Kỹ năng liên quan:"
  - List prerequisite skills với mastery

[VISUAL GUIDELINES]
- Mastery: Large, prominent, color-coded
- Chart: Simple, clear trend
- Summary: Cards, easy to scan
- Mistakes: Highlighted, simple language
- Recommendations: Highlighted box, actionable
- Typography: Skill name 24px Bold, Body 16px

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Mastery display: 48px Bold
- Chart height: 200px
- Summary cards: Padding 16px

[CONTENT EXAMPLES]
- Skill: "Rút gọn phân số"
- Mastery: "45% - Yếu"
- Description: "Con đang gặp khó khăn với kỹ năng này"
- Practice: "23 bài | 12 đúng (52%) | 11 sai (48%)"
- Recommendation: "Nên luyện tập thêm mỗi ngày 15 phút"
```

---

## NOTES

- Tất cả dashboard screens phải responsive
- Charts phải đơn giản, dễ hiểu cho phụ huynh
- Ngôn ngữ không technical, đời thường
- Color coding phải consistent
- Loading states cho tất cả data fetching
- Empty states phải friendly, encouraging

