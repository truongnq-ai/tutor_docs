# PARENT DASHBOARD - REPORTING PROMPTS

**Project:** Tutor  
**Screen Group:** Reports & Recommendations  
**Platform:** Web Dashboard (Next.js)  
**Version:** 2025-12-15-10-18

---

## SCREEN 1: WEEKLY REPORT

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Weekly Report View

[SCREEN PURPOSE]
- Báo cáo học tập hằng tuần
- User story: PU-08, PU-09
- Acceptance criteria: Thời gian học, kết quả học tập, điểm yếu chính, ngôn ngữ dễ hiểu

[DESIGN REQUIREMENTS]
- Header: "Báo cáo tuần [Date range]" + Export button
- Summary section:
  - "Tổng kết tuần này:"
  - Large card với key metrics:
    - "Số ngày học: 5/7"
    - "Thời gian học: 2.5 giờ"
    - "Số bài đã làm: 42 bài"
    - "Tỉ lệ đúng: 78%"
- Weekly breakdown:
  - "Hoạt động theo ngày:"
  - Table hoặc cards:
    - Mỗi ngày: Ngày | Thời gian | Số bài | Tỉ lệ đúng | Trạng thái
    - Visual indicators (green/yellow/red)
- Skills progress:
  - "Kỹ năng đã học:"
  - List skills với mastery change:
    - "Rút gọn phân số: 45% → 52% (+7%)"
    - "So sánh phân số: 70% → 75% (+5%)"
- Weak points:
  - "Điểm yếu cần chú ý:"
  - List 2-3 skills yếu nhất
    - Skill name
    - Mastery: "45%"
    - Recommendation: "Nên luyện tập thêm"
- Recommendations:
  - "Gợi ý cho tuần tới:"
  - Bullet points, simple language:
    - "Khuyến khích con học đều đặn mỗi ngày"
    - "Tập trung luyện tập: Rút gọn phân số"
- Comparison:
  - "So với tuần trước:"
  - "Tốt hơn" / "Tương đương" / "Cần cải thiện"
  - Key improvements listed
- Actions:
  - "Gửi báo cáo qua email"
  - "In báo cáo"
  - "Chia sẻ với giáo viên" (optional)

[VISUAL GUIDELINES]
- Summary card: Prominent, white, rounded, shadow
- Breakdown: Table hoặc cards, clear hierarchy
- Skills: Color-coded progress indicators
- Weak points: Highlighted, red/orange
- Recommendations: Highlighted box, actionable
- Typography: Title 24px Bold, Body 16px Regular
- Spacing: Generous, clear sections

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Summary card: Padding 32px
- Table: Full width, scrollable
- Export button: Top right

[CONTENT EXAMPLES]
- Header: "Báo cáo tuần 08/12 - 15/12/2025"
- Summary: "5/7 ngày | 2.5 giờ | 42 bài | 78%"
- Skills: "Rút gọn phân số: 45% → 52% (+7%)"
- Weak points: "Rút gọn phân số - 45% - Cần luyện tập thêm"
- Recommendation: "Khuyến khích con học đều đặn mỗi ngày"
```

---

## SCREEN 2: MONTHLY REPORT

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Monthly Report View

[SCREEN PURPOSE]
- Báo cáo học tập hằng tháng
- User story: PU-08, PU-09
- Acceptance criteria: Tổng kết tháng, tiến bộ, so sánh với tháng trước

[DESIGN REQUIREMENTS]
- Header: "Báo cáo tháng [Month/Year]" + Export button
- Monthly summary:
  - Large metrics:
    - "Tổng thời gian học: 12 giờ"
    - "Tổng số bài: 180 bài"
    - "Tỉ lệ đúng trung bình: 75%"
    - "Số ngày học: 22/30"
- Progress overview:
  - "Tiến bộ tháng này:"
  - Comparison card:
    - "Mastery trung bình: 68%"
    - "Tháng trước: 62%"
    - "Thay đổi: +6%" (green, up arrow)
- Skills achievement:
  - "Kỹ năng đã đạt:"
  - List skills đạt mastery ≥ 70%:
    - "So sánh phân số: 75% ✅"
    - "Cộng trừ phân số: 72% ✅"
  - Count: "5/10 kỹ năng đã vững"
- Skills improvement:
  - "Kỹ năng đã cải thiện:"
  - Top 5 skills với improvement:
    - "Rút gọn phân số: +15%"
    - "So sánh phân số: +8%"
- Weak skills:
  - "Kỹ năng cần chú ý:"
  - List 3-5 skills yếu nhất
- Monthly chart:
  - "Mastery trung bình theo tuần"
  - Line chart: 4 data points (4 weeks)
  - Trend line, clear labels
- Recommendations:
  - "Gợi ý cho tháng tới:"
  - 3-5 actionable recommendations
    - "Tiếp tục duy trì thói quen học đều đặn"
    - "Tập trung luyện tập: [skill names]"
    - "Khuyến khích con làm mini test thường xuyên"
- Comparison:
  - "So với tháng trước:"
  - Summary: "Tốt hơn" / "Tương đương" / "Cần cải thiện"
  - Key metrics comparison

[VISUAL GUIDELINES]
- Summary: Large, prominent numbers
- Comparison: Side-by-side, clear
- Chart: Simple, clear trend
- Skills: Color-coded, badges
- Recommendations: Highlighted, actionable
- Typography: Numbers 32px Bold, Body 16px

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Summary metrics: 32px font
- Chart height: 300px
- Export: PDF/Email options

[CONTENT EXAMPLES]
- Header: "Báo cáo tháng 12/2025"
- Summary: "12 giờ | 180 bài | 75% | 22/30 ngày"
- Comparison: "68% vs 62% | +6%"
- Achievement: "5/10 kỹ năng đã vững"
- Improvement: "Rút gọn phân số: +15%"
- Recommendation: "Tiếp tục duy trì thói quen học đều đặn"
```

---

## SCREEN 3: RECOMMENDATIONS

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Recommendations / Gợi ý Cải thiện

[SCREEN PURPOSE]
- Hiển thị gợi ý cải thiện học tập
- User story: PU-07
- Acceptance criteria: Ngôn ngữ đời thường, không yêu cầu phụ huynh tự dạy

[DESIGN REQUIREMENTS]
- Header: "Gợi ý cải thiện học tập"
- Summary:
  - "Dựa trên kết quả học tập của con, đây là các gợi ý:"
- Recommendations cards (list):
  - Each card:
    - Priority: "Ưu tiên cao" / "Ưu tiên trung bình" (badge)
    - Title: "Tập trung luyện tập: Rút gọn phân số"
    - Description: "Con đang yếu kỹ năng này (45%). Nên luyện tập thêm mỗi ngày 15 phút."
    - Action: "Con nên làm gì:"
      - "Làm thêm 10 bài về rút gọn phân số"
      - "Xem lại các bài đã sai"
    - Expected outcome: "Kỳ vọng: Đạt 70% trong 1 tuần"
    - Skill link: "Xem chi tiết kỹ năng"
- General recommendations:
  - "Gợi ý chung:"
  - Bullet points:
    - "Khuyến khích con học đều đặn mỗi ngày ít nhất 15 phút"
    - "Theo dõi tiến bộ qua dashboard này"
    - "Khen ngợi khi con đạt milestone"
- Tips for parents:
  - "Cách hỗ trợ con:"
  - Simple, actionable tips:
    - "Không cần dạy Toán, chỉ cần khuyến khích"
    - "Kiểm tra dashboard mỗi tuần"
    - "Đặt mục tiêu nhỏ, dễ đạt"
- Actions:
  - "Đánh dấu đã đọc" (per recommendation)
  - "Lưu gợi ý"

[VISUAL GUIDELINES]
- Cards: White, rounded 12px, shadow, padding 24px
- Priority badges: Color-coded (red high, orange medium)
- Title: 18px Semi-bold
- Description: 16px Regular
- Action items: Bullet points, clear
- Tips: Highlighted box, friendly tone
- Typography: Clear hierarchy

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Card: Padding 24px, margin 16px
- Priority badge: 24px height

[CONTENT EXAMPLES]
- Header: "Gợi ý cải thiện học tập"
- Recommendation: "Tập trung luyện tập: Rút gọn phân số"
- Description: "Con đang yếu kỹ năng này (45%). Nên luyện tập thêm mỗi ngày 15 phút."
- Action: "Làm thêm 10 bài về rút gọn phân số"
- Expected: "Đạt 70% trong 1 tuần"
- General: "Khuyến khích con học đều đặn mỗi ngày ít nhất 15 phút"
```

---

## SCREEN 4: EMAIL REPORT PREVIEW

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Parent 35-50 tuổi
- Platform: Web Dashboard
- Screen: Email Report Preview

[SCREEN PURPOSE]
- Preview báo cáo sẽ gửi qua email
- User story: PU-08, PU-09
- Acceptance criteria: Format email, nội dung dễ hiểu

[DESIGN REQUIREMENTS]
- Header: "Xem trước báo cáo email"
- Email preview (styled như email):
  - From: "Tutor - Gia sư Toán AI"
  - To: "[Parent email]"
  - Subject: "Báo cáo học tập tuần [Date]"
  - Body:
    - Greeting: "Xin chào [Parent name],"
    - Introduction: "Đây là báo cáo học tập của [Student name] tuần vừa qua:"
    - Summary section:
      - "Tổng kết:"
      - Bullet points: Số ngày, thời gian, số bài, tỉ lệ đúng
    - Highlights:
      - "Điểm nổi bật:"
      - 2-3 achievements
    - Weak points:
      - "Cần chú ý:"
      - 2-3 skills yếu
    - Recommendations:
      - "Gợi ý:"
      - 2-3 actionable items
    - Call to action:
      - "Xem chi tiết trên dashboard: [Link]"
    - Footer:
      - "Trân trọng,"
      - "Đội ngũ Tutor"
- Settings:
  - "Tần suất gửi:"
  - Radio: "Hàng tuần" | "Hàng tháng" | "Tắt"
  - "Gửi vào:"
  - Day selector: "Chủ nhật" (default)
  - Time selector: "20:00" (default)
- Actions:
  - "Gửi thử email" (test)
  - "Lưu cài đặt"
  - "Gửi ngay" (manual)

[VISUAL GUIDELINES]
- Email preview: Styled như email client, white background
- Settings: Form, clear labels
- Typography: Email body 16px, Settings 14px
- Spacing: Comfortable, readable

[SPECIFICATIONS]
- Screen size: Desktop 1440px, Tablet 768px
- Email preview: Max width 600px (email standard)
- Settings form: 400px width

[CONTENT EXAMPLES]
- Subject: "Báo cáo học tập tuần 08/12 - 15/12/2025"
- Greeting: "Xin chào [Tên phụ huynh],"
- Summary: "5/7 ngày | 2.5 giờ | 42 bài | 78%"
- Highlights: "Con đã cải thiện kỹ năng Rút gọn phân số"
- Weak points: "Cần luyện tập thêm: Rút gọn phân số"
- Recommendation: "Khuyến khích con học đều đặn mỗi ngày"
```

---

## NOTES

- Tất cả report screens phải có export functionality
- Email format phải mobile-friendly
- Ngôn ngữ phải đơn giản, không technical
- Charts phải đơn giản, dễ hiểu
- Recommendations phải actionable, không abstract
- Loading states cho report generation
- Success states khi gửi email

