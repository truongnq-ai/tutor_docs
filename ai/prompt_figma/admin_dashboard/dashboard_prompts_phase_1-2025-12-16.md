# ADMIN DASHBOARD - DASHBOARD PROMPTS

**Project:** Tutor  
**Screen Group:** Main Dashboard & Overview  
**Platform:** Web Dashboard (Next.js)  
**Version:** 2025-12-16

- ← Quay lại: [Figma Prompt Library](../README.md)

---

## SCREEN 1: DASHBOARD OVERVIEW

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Admin/Operations team (có kiến thức kỹ thuật)
- Platform: Web Dashboard (Desktop)
- Screen: Dashboard Overview / Home (sau khi login)
- Phase: Phase 1 (MVP)

[SCREEN PURPOSE]
- Tổng quan hệ thống và metrics quan trọng
- Quick actions và navigation đến các chức năng chính
- Monitoring system health và user activity
- User story: Admin cần nhanh chóng nắm được tình trạng hệ thống

[DESIGN REQUIREMENTS]
- Header:
  - "Dashboard" hoặc "Tổng quan hệ thống"
  - Time range selector: "Hôm nay" | "7 ngày qua" | "30 ngày qua" | "Tùy chọn"
  - Last updated: "Cập nhật lúc: [timestamp]" (auto-refresh mỗi 30s)
  - Refresh button: Manual refresh

- System Health Status Bar (top section, prominent):
  - Overall status indicator:
    - "Healthy" (green) - Tất cả services OK
    - "Warning" (yellow) - Có service warning
    - "Critical" (red) - Có service down
  - Service status quick view (4 services):
    - Core Service: Green/Yellow/Red dot + "Core Service" + response time
    - AI Service: Green/Yellow/Red dot + "AI Service" + response time
    - Database: Green/Yellow/Red dot + "Database" + connection status
    - Object Storage: Green/Yellow/Red dot + "Storage" + status
  - Click vào status bar → Navigate to /system/health

- Key Metrics Cards (6-8 cards, grid layout):
  - Card 1: "Total Users"
    - Large number: "1,234"
    - Label: "người dùng"
    - Breakdown: "Students: 890 | Parents: 344"
    - Trend: "+12% so với tháng trước" (green arrow)
    - Icon: Users icon
  - Card 2: "Active Users (24h)"
    - Large number: "456"
    - Label: "người dùng hoạt động"
    - Trend: "+8% so với hôm qua"
    - Icon: Active users icon
  - Card 3: "Total Practice Sessions"
    - Large number: "5,678"
    - Label: "lượt luyện tập"
    - Period: "Trong 7 ngày qua"
    - Trend: "+15%"
    - Icon: Book icon
  - Card 4: "AI Solutions Generated"
    - Large number: "3,456"
    - Label: "lời giải AI"
    - Period: "Trong 7 ngày qua"
    - Trend: "+22%"
    - Icon: Brain/AI icon
  - Card 5: "AI Accuracy Rate"
    - Large number: "94.5%"
    - Label: "độ chính xác"
    - Progress bar: Visual indicator
    - Trend: "+2.1%"
    - Status: "Good" (green) / "Warning" (yellow) / "Critical" (red)
    - Icon: Target/Accuracy icon
  - Card 6: "System Uptime"
    - Large number: "99.8%"
    - Label: "thời gian hoạt động"
    - Period: "30 ngày qua"
    - Trend: "Stable"
    - Icon: Server/Monitor icon
  - Card 7: "Average Response Time"
    - Large number: "245ms"
    - Label: "thời gian phản hồi"
    - Status: "Good" (< 500ms) / "Warning" (500-1000ms) / "Critical" (> 1000ms)
    - Trend: "-12ms"
    - Icon: Speed/Performance icon
  - Card 8: "Error Rate"
    - Large number: "0.2%"
    - Label: "tỉ lệ lỗi"
    - Status: "Good" (< 1%) / "Warning" (1-3%) / "Critical" (> 3%)
    - Trend: "-0.1%"
    - Icon: Alert/Error icon

- Charts Section (2-3 charts, side by side hoặc stacked):
  - Chart 1: "User Activity (7 ngày qua)"
    - Line chart hoặc area chart
    - X-axis: Days
    - Y-axis: Number of active users
    - Show: Students, Parents (different colors)
    - Interactive: Hover để xem chi tiết
  - Chart 2: "AI Solutions & Accuracy Trend"
    - Dual-axis chart (line + bar)
    - Primary axis: Number of solutions (bar chart)
    - Secondary axis: Accuracy rate (line chart)
    - X-axis: Days (7 ngày qua)
    - Show trend và correlation
  - Chart 3: "System Performance (24h)"
    - Line chart
    - X-axis: Hours
    - Y-axis: Response time (ms)
    - Show: Core Service, AI Service (different lines)
    - Highlight: Peak times, average

- Quick Actions Section:
  - Title: "Thao tác nhanh"
  - Grid layout (2-3 columns):
    - Button: "Xem Users" → Navigate to /users/students
      - Icon: Users icon
      - Description: "Quản lý học sinh và phụ huynh"
    - Button: "Review AI Solutions" → Navigate to /ai-quality/solutions
      - Icon: Brain icon
      - Description: "Kiểm tra và phê duyệt lời giải AI"
      - Badge: "12 pending" (nếu có solutions chờ review)
    - Button: "System Logs" → Navigate to /system/logs
      - Icon: Logs icon
      - Description: "Xem logs hệ thống"
    - Button: "Content Management" → Navigate to /content/skills
      - Icon: Book icon
      - Description: "Quản lý skills và questions"
    - Button: "AI Accuracy Report" → Navigate to /ai-quality/accuracy
      - Icon: Chart icon
      - Description: "Báo cáo độ chính xác AI"

- Recent Activity / Alerts Section:
  - Title: "Hoạt động gần đây" hoặc "Cảnh báo"
  - List view (scrollable, max 5-10 items):
    - Item format:
      - Timestamp: "2 giờ trước"
      - Icon: Type icon (error, warning, info, success)
      - Message: "AI Service response time tăng 15%"
      - Action: "Xem chi tiết" (link)
    - Types:
      - Error alerts (red)
      - Warning alerts (yellow)
      - Info messages (blue)
      - Success notifications (green)
  - "View All" link → Navigate to /system/logs

- Empty State (nếu chưa có data):
  - Icon: Dashboard icon
  - Title: "Chưa có dữ liệu"
  - Description: "Hệ thống đang khởi tạo hoặc chưa có hoạt động"
  - Action: "Kiểm tra lại sau" hoặc "Refresh"

[VISUAL GUIDELINES]
- Background: #FAFAFA hoặc white
- Status indicators: Rounded badges, color-coded (green/yellow/red)
- Cards: White background, rounded 12px, shadow nhẹ, padding 24px
- Metrics: Large numbers (36-48px Bold), labels (14px Regular)
- Trend indicators: Green/red arrows, small text (12px)
- Charts: Clean, professional, color-coded, có legend
- Quick actions: Button cards, hover effect, icon + text
- Typography: H1 28px Bold, H2 20px Semi-bold, Body 14px Regular
- Spacing: Generous, clear sections, 24px gap between sections
- Color scheme:
  - Primary: Brand color (blue)
  - Success: Green (#10B981)
  - Warning: Yellow (#F59E0B)
  - Error: Red (#EF4444)
  - Info: Blue (#3B82F6)

[SPECIFICATIONS]
- Screen size: Desktop 1440px+ (responsive down to 1024px)
- Status bar: Height 60px, full width
- Card grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Card padding: 24px
- Chart height: 300-400px
- Quick actions: 2-3 columns grid
- Recent activity: Max height 300px, scrollable

[CONTENT EXAMPLES]
- Header: "Dashboard - 7 ngày qua | Cập nhật lúc: 15:30:45"
- Status: "Healthy | Core Service: 120ms | AI Service: 450ms | Database: Connected | Storage: OK"
- Metric 1: "1,234 người dùng | +12% | Students: 890 | Parents: 344"
- Metric 5: "94.5% độ chính xác | +2.1% | Status: Good"
- Chart 1: "User Activity (7 ngày qua) - Students: 456, Parents: 123"
- Quick action: "Review AI Solutions - 12 pending"
- Alert: "2 giờ trước - AI Service response time tăng 15% - Xem chi tiết"
```

---

## SCREEN 2: DASHBOARD EMPTY STATE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Admin/Operations team
- Platform: Web Dashboard
- Screen: Dashboard Empty State (khi chưa có data hoặc hệ thống mới setup)

[SCREEN PURPOSE]
- Hiển thị khi dashboard chưa có dữ liệu
- Hướng dẫn admin các bước tiếp theo
- Không để màn hình trống, tạo cảm giác professional

[DESIGN REQUIREMENTS]
- Centered layout
- Icon: Dashboard/Chart icon (large, 64-80px)
- Title: "Chưa có dữ liệu" hoặc "Hệ thống đang khởi tạo"
- Description:
  - "Dashboard sẽ hiển thị metrics và thống kê sau khi có hoạt động trong hệ thống."
  - "Vui lòng kiểm tra lại sau hoặc liên hệ support nếu cần hỗ trợ."
- Actions:
  - Button: "Refresh" (primary)
  - Button: "Kiểm tra System Health" (secondary)
  - Link: "Xem System Logs"
- Optional: Loading skeleton (nếu đang fetch data)

[VISUAL GUIDELINES]
- Centered vertically and horizontally
- Icon: Gray (#9CA3AF), large size
- Typography: Title 24px Bold, Description 16px Regular
- Spacing: 32px gap between elements
- Buttons: Standard button styles
```

---

## SCREEN 3: DASHBOARD LOADING STATE

### Prompt:
```
[CONTEXT]
- Project: Tutor - AI Math Tutor
- Target User: Admin/Operations team
- Platform: Web Dashboard
- Screen: Dashboard Loading State (khi đang fetch data)

[DESIGN REQUIREMENTS]
- Skeleton loaders cho:
  - Status bar (animated placeholder)
  - Metrics cards (8 cards với skeleton)
  - Charts (placeholder với shimmer effect)
  - Quick actions (button placeholders)
- Loading indicator: Spinner hoặc progress bar
- Message: "Đang tải dữ liệu..." (optional)

[VISUAL GUIDELINES]
- Skeleton: Gray (#E5E7EB), shimmer animation
- Maintain layout structure (không shift khi load xong)
- Smooth transition khi data load xong
```

---

## NOTES & CONSIDERATIONS

1. **Real-time Updates:**
   - Dashboard nên auto-refresh mỗi 30-60 giây
   - Có thể thêm WebSocket cho real-time updates (Phase 3)

2. **Performance:**
   - Lazy load charts
   - Pagination cho recent activity
   - Cache metrics data

3. **Accessibility:**
   - ARIA labels cho charts
   - Keyboard navigation
   - Screen reader support

4. **Responsive:**
   - Desktop: Full layout
   - Tablet: 2-column grid cho cards
   - Mobile: 1-column, stacked layout

5. **Customization:**
   - Admin có thể chọn metrics hiển thị (Phase 3)
   - Save dashboard preferences (Phase 3)

---

**Last Updated:** 2025-12-16  
**Author:** System Architect
