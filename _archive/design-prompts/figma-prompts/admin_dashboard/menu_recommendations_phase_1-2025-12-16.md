# ADMIN DASHBOARD - MENU RECOMMENDATIONS

**Project:** Tutor  
**Document type:** Menu Structure & Navigation  
**Audience:** Developer / Product / Designer  
**Status:** Draft  
**Version:** 2025-12-16  
**Author:** System Architect

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này đề xuất cấu trúc menu và navigation cho Admin Dashboard dựa trên:
- Phân tích toàn diện các tính năng hệ thống từ PRD, System Architecture, API Specification
- Vai trò và trách nhiệm của Admin trong hệ thống Tutor
- Scope Phase 1 (MVP) và định hướng Phase 3

---

## 2. PHÂN TÍCH VAI TRÒ ADMIN

### 2.1. Trách nhiệm chính (theo System Architecture)

1. **Quản lý nội dung học tập**
   - Quản lý Skill Graph (Toán lớp 6-7)
   - Quản lý Questions/Practice items
   - Review và approve content

2. **Giám sát chất lượng AI**
   - Review AI solutions (OCR, Math Solver)
   - Theo dõi accuracy metrics
   - Xử lý lỗi AI và cải thiện model

3. **Theo dõi hệ thống**
   - System metrics (uptime, performance)
   - User analytics (students, parents)
   - Error logs và health checks

4. **Quản lý người dùng**
   - View users (students, parents, admins)
   - User status management
   - Support và troubleshooting

### 2.2. Scope Phase 1 vs Phase 3

**Phase 1 (MVP):**
- Admin dashboard cơ bản
- System monitoring cơ bản
- User management (view only)
- AI quality monitoring (basic)

**Phase 3 (Mở rộng):**
- Admin/Ops dashboard nâng cao
- Quản trị nội dung chi tiết
- Giám sát chất lượng AI nâng cao
- Advanced analytics và reporting

---

## 3. ĐỀ XUẤT CẤU TRÚC MENU

### 3.1. Menu chính (Main Navigation)

```typescript
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <UserCircleIcon />,
    name: "Users",
    subItems: [
      { name: "Students", path: "/users/students" },
      { name: "Parents", path: "/users/parents" },
      { name: "Admins", path: "/users/admins" },
    ],
  },
  {
    icon: <PageIcon />,
    name: "Content",
    subItems: [
      { name: "Skills", path: "/content/skills" },
      { name: "Questions", path: "/content/questions" },
    ],
  },
  {
    icon: <BoltIcon />,
    name: "AI Quality",
    subItems: [
      { name: "Solutions Review", path: "/ai-quality/solutions" },
      { name: "Accuracy Metrics", path: "/ai-quality/accuracy" },
      { name: "Error Analysis", path: "/ai-quality/errors" },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "System",
    subItems: [
      { name: "Metrics", path: "/system/metrics" },
      { name: "Logs", path: "/system/logs" },
      { name: "Health", path: "/system/health" },
    ],
  },
];
```

### 3.2. Chi tiết từng menu item

#### 3.2.1. Dashboard (`/dashboard`)
- **Mục đích:** Trang chủ sau khi login, tổng quan hệ thống
- **Nội dung:** Xem phần 4 (Dashboard Overview Recommendations)

#### 3.2.2. Users (`/users/*`)
- **Students** (`/users/students`)
  - Danh sách học sinh (table với pagination, search, filter)
  - Columns: ID, Name, Grade, Status, Created At, Last Activity
  - Actions: View detail, View progress, Change status (active/inactive)
  - Filters: Grade, Status, Registration date range

- **Parents** (`/users/parents`)
  - Danh sách phụ huynh (table với pagination, search, filter)
  - Columns: ID, Name, Phone, Email, Phone Verified, Status, Created At, Linked Students
  - Actions: View detail, View linked students, Change status
  - Filters: Status, Phone verified, Registration date range

- **Admins** (`/users/admins`)
  - Danh sách admin (table với pagination, search)
  - Columns: ID, Username, Email, Role, Status, Last Login, Created At
  - Actions: View detail, Change status (chỉ super admin)
  - Filters: Status, Role

#### 3.2.3. Content (`/content/*`)
- **Skills** (`/content/skills`)
  - Danh sách skills (tree view hoặc table)
  - Columns: Code, Name, Grade, Chapter, Prerequisites, Status
  - Actions: View detail, Edit (Phase 3), View related questions
  - Filters: Grade, Chapter, Status
  - View: Skill graph visualization (Phase 3)

- **Questions** (`/content/questions`)
  - Danh sách questions/practice items
  - Columns: ID, Skill Code, Question Text (truncated), Difficulty, Status, Created At
  - Actions: View detail, Edit (Phase 3), Approve/Reject
  - Filters: Skill, Difficulty, Status
  - Note: Phase 1 có thể chỉ view, Phase 3 mới có CRUD

#### 3.2.4. AI Quality (`/ai-quality/*`)
- **Solutions Review** (`/ai-quality/solutions`)
  - Danh sách AI solutions cần review
  - Columns: ID, Problem Text (truncated), Solution Type (OCR/Text), Confidence, Status, Created At
  - Actions: View detail, Approve, Reject, Flag for review
  - Filters: Status, Solution Type, Date range
  - View: Solution detail với step-by-step, confidence scores

- **Accuracy Metrics** (`/ai-quality/accuracy`)
  - Dashboard metrics về độ chính xác AI
  - Charts: Accuracy over time, Accuracy by skill, Error rate
  - Metrics: Overall accuracy, OCR accuracy, Solver accuracy, Hint accuracy
  - Filters: Date range, Skill filter

- **Error Analysis** (`/ai-quality/errors`)
  - Danh sách errors và failed requests
  - Columns: ID, Error Type, Error Message, Timestamp, User ID (if available)
  - Actions: View detail, Mark as resolved
  - Filters: Error Type, Date range, Severity

#### 3.2.5. System (`/system/*`)
- **Metrics** (`/system/metrics`)
  - Real-time system metrics
  - Cards: API Response Time, Request Rate, Error Rate, Active Users
  - Charts: Request volume over time, Response time distribution, Error rate trend
  - Filters: Time range (1h, 24h, 7d, 30d)

- **Logs** (`/system/logs`)
  - System logs viewer
  - Columns: Timestamp, Level, Service, Message, User ID
  - Actions: Filter, Search, Export
  - Filters: Level (INFO, WARN, ERROR), Service, Date range
  - Real-time updates (optional)

- **Health** (`/system/health`)
  - Health check status của các services
  - Services: Core Service, AI Service, Database, Object Storage
  - Status indicators: Healthy (green), Warning (yellow), Down (red)
  - Details: Response time, Last check, Uptime percentage

---

## 4. MENU HIỆN TẠI VÀ ĐỀ XUẤT CẬP NHẬT

### 4.1. Menu hiện tại (từ AppSidebar.tsx)

```typescript
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Login", path: "/login", pro: false },
      { name: "Reset Password", path: "/reset-password", pro: false },
    ],
  },
];
```

### 4.2. Đề xuất cập nhật

**Giữ lại:**
- Dashboard (đã có, cần customize)
- Authentication menu trong "Others" (cho development/testing)

**Thêm mới:**
- Users (với submenu: Students, Parents, Admins)
- Content (với submenu: Skills, Questions)
- AI Quality (với submenu: Solutions Review, Accuracy Metrics, Error Analysis)
- System (với submenu: Metrics, Logs, Health)

**Xóa:**
- Calendar (không cần cho admin dashboard Phase 1)

---

## 5. PRIORITY IMPLEMENTATION

### Phase 1 (MVP) - Ưu tiên cao

1. **Dashboard** (`/dashboard`)
   - System metrics cards
   - Quick stats
   - Charts cơ bản
   - Quick actions

2. **Users/Students** (`/users/students`)
   - Table view với pagination
   - Search và filter cơ bản
   - View detail modal/page

3. **System/Health** (`/system/health`)
   - Health check status
   - Service status indicators

4. **AI Quality/Solutions Review** (`/ai-quality/solutions`)
   - List view với pagination
   - View solution detail
   - Approve/Reject actions

### Phase 1 (MVP) - Ưu tiên trung bình

5. **Users/Parents** (`/users/parents`)
6. **Users/Admins** (`/users/admins`)
7. **System/Metrics** (`/system/metrics`)
8. **AI Quality/Accuracy Metrics** (`/ai-quality/accuracy`)

### Phase 3 (Mở rộng)

9. **Content/Skills** - Full CRUD, skill graph visualization
10. **Content/Questions** - Full CRUD, bulk import
11. **System/Logs** - Advanced log viewer với real-time
12. **AI Quality/Error Analysis** - Advanced error tracking và analytics

---

## 6. API ENDPOINTS CẦN THIẾT

### 6.1. User Management APIs (cần implement)

```
GET /api/admin/users/students
GET /api/admin/users/students/:id
PUT /api/admin/users/students/:id/status
GET /api/admin/users/parents
GET /api/admin/users/parents/:id
PUT /api/admin/users/parents/:id/status
GET /api/admin/users/admins
GET /api/admin/users/admins/:id
```

### 6.2. Content Management APIs (cần implement)

```
GET /api/admin/content/skills
GET /api/admin/content/skills/:id
GET /api/admin/content/questions
GET /api/admin/content/questions/:id
```

### 6.3. AI Quality APIs (cần implement)

```
GET /api/admin/ai-quality/solutions
GET /api/admin/ai-quality/solutions/:id
POST /api/admin/ai-quality/solutions/:id/review
GET /api/admin/ai-quality/accuracy
GET /api/admin/ai-quality/errors
```

### 6.4. System APIs (cần implement)

```
GET /api/admin/system/metrics
GET /api/admin/system/logs
GET /api/admin/system/health
```

### 6.5. Dashboard APIs (cần implement)

```
GET /api/admin/dashboard/overview
GET /api/admin/dashboard/stats
```

---

## 7. TÀI LIỆU THAM KHẢO

- [PRD MVP](../../../prd/prd_mvp_phase_1-2025-12-14-22-15.md)
- [System Architecture](../../../technical_design/system_architecture_phase_1-2025-12-15-00-21.md)
- [API Specification](../../../technical_design/api_specification_phase_1-2025-12-15-03-30.md)
- [Database Design](../../../database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md)
- [Admin Dashboard README](../../../../tutor-admin-dashboard/README.md)

---

## 8. GHI CHÚ

- Menu structure có thể điều chỉnh theo feedback từ admin users
- Một số features có thể được ẩn/hiện dựa trên admin role (nếu có role-based access)
- Calendar có thể được thêm lại nếu cần scheduling features trong tương lai

---

**Last Updated:** 2025-12-16  
**Author:** System Architect
