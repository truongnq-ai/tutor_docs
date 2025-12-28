
================================================================================
# File: 01-getting-started/overview.md
================================================================================

# TUTOR – PROJECT OVERVIEW

**Gia sư Toán AI** là hệ thống trợ giảng toán cho học sinh từ lớp 6–7, sử dụng LLM để:

- **Cung cấp bài tập** cá nhân hoá theo năng lực học sinh
- **Giải thích bước–bước** các bài toán theo chuẩn chương trình Việt Nam
- **Theo dõi tiến độ** học tập và báo cáo minh bạch cho phụ huynh

## Mục tiêu MVP Giai đoạn 1

- **Nền tảng web/mobile**: Student App (Flutter) + Parent Dashboard (Next.js)
- **Adaptive Learning Engine**: Hệ thống học tập thích ứng dựa trên skill graph và mastery tracking
- **Tính năng hỗ trợ phụ huynh**: Dashboard báo cáo, theo dõi điểm yếu, báo cáo tuần

## Định vị sản phẩm

Sản phẩm **KHÔNG phải**:
- App giải bài đơn thuần (Photomath-style)
- App học video
- Nền tảng lớp học online

Sản phẩm **LÀ**:
- Gia sư Toán 1–1 dựa trên AI + logic giáo dục
- Hệ thống học tập có kiểm soát và báo cáo cho phụ huynh

## Mục tiêu học tập

- Học sinh học đúng trọng tâm, lấp lỗ hổng kiến thức
- Phụ huynh theo dõi được việc học và kết quả học tập một cách minh bạch
- Tạo nền tảng dữ liệu để mở rộng sang giáo viên/gia sư ở các giai đoạn sau

## Chỉ số thành công (KPIs)

### Sản phẩm
- **Activation rate** (giải ≥1 bài): ≥ 60%
- **Retention D7**: ≥ 30%
- **Thời gian học/ngày**: ≥ 10 phút

### Giáo dục
- **Mastery trung bình tăng** sau 7 ngày: +15–25 điểm
- **Giảm số skill yếu** sau 1 tháng

### Hiệu năng
- Thời gian trả lời AI: < 5 giây
- Load dashboard: < 2 giây

### Độ chính xác
- Bài Toán đúng ≥ 95% (chương trình phổ thông)

---

← Quay lại: [README.md](../README.md)



================================================================================
# End of: 01-getting-started/overview.md
================================================================================

================================================================================
# File: 01-getting-started/quick-start.md
================================================================================

# QUICK START GUIDE

Hướng dẫn bắt đầu nhanh với hệ thống Tutor.

## Cho End Users (Người dùng cuối)

### Học sinh
1. Tải và cài đặt ứng dụng Tutor Student App
2. Đăng ký/đăng nhập bằng Google, Apple, hoặc số điện thoại
3. Bắt đầu học với lộ trình được đề xuất

Xem chi tiết: [Hướng dẫn cho Học sinh](../02-for-end-users/student-guide.md)

### Phụ huynh
1. Truy cập Parent Dashboard
2. Đăng ký/đăng nhập và liên kết với tài khoản học sinh
3. Xem báo cáo tiến độ học tập

Xem chi tiết: [Hướng dẫn cho Phụ huynh](../02-for-end-users/parent-guide.md)

## Cho Product Owners / Stakeholders

1. Đọc [Tổng quan Sản phẩm](../03-for-product-owners/product-overview.md) để hiểu phạm vi và mục tiêu
2. Xem [User Stories](../03-for-product-owners/user-stories/README.md) để hiểu các tính năng
3. Tham khảo [KPIs và Metrics](../03-for-product-owners/kpis-metrics.md) để theo dõi thành công

## Cho Developers

1. **Setup môi trường**: Xem [Development Setup](../04-for-developers/setup/development-setup.md)
2. **Hiểu kiến trúc**: Đọc [System Architecture](../04-for-developers/architecture/system-architecture.md)
3. **Bắt đầu code**: Tham khảo [Project Structure](../04-for-developers/setup/project-structure.md) và [Coding Standards](../04-for-developers/coding-standards/)

## Cho DevOps

1. Xem [Deployment Guide](../05-for-devops/deployment.md) để triển khai hệ thống
2. Tham khảo [Infrastructure](../05-for-devops/infrastructure.md) để hiểu cấu trúc hạ tầng

---

← Quay lại: [README.md](../README.md)



================================================================================
# End of: 01-getting-started/quick-start.md
================================================================================

================================================================================
# File: 01-getting-started/glossary.md
================================================================================

# GLOSSARY - THUẬT NGỮ

## Thuật ngữ chung

**Tutor**: Hệ thống gia sư Toán AI

**MVP**: Minimum Viable Product - Sản phẩm tối thiểu khả thi

**Phase 1**: Giai đoạn 1 của dự án (MVP)

## Thuật ngữ kỹ thuật

**Skill**: Kỹ năng toán học, ví dụ: "Cộng trừ phân số"

**Skill Graph**: Đồ thị biểu diễn mối quan hệ giữa các skills (prerequisites)

**Mastery**: Mức độ thành thạo của học sinh với một skill (0-100)

**Practice**: Record kết quả làm bài của học sinh cho một Question. Lưu student response (student_answer, is_correct, duration_sec, submitted_at), session info (session_id + session_type), và link với Question. Một Question có thể có nhiều Practice records (re-attempt logic).

**Exercise**: Bài tập template được tạo bởi Admin hoặc AI Service. Sau khi được approve, Exercise có thể được dùng để generate Questions.

**Question**: Instance của Exercise được assign cho học sinh. Chứa nội dung câu hỏi (snapshot Exercise data tại thời điểm assign), status (DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED), nhưng KHÔNG lưu response data (đã chuyển sang Practice table) và KHÔNG có session_id (được quản lý qua Practice records).

**Adaptive Learning**: Học tập thích ứng - hệ thống tự động điều chỉnh độ khó và nội dung theo năng lực học sinh

**Tutor Mode**: Chế độ gia sư - học sinh có thể chụp ảnh hoặc nhập bài toán để được giải thích từng bước

## Thuật ngữ người dùng

**Student**: Học sinh - người sử dụng ứng dụng mobile

**Parent**: Phụ huynh - người sử dụng dashboard web để theo dõi tiến độ

**Admin**: Quản trị viên - người quản lý hệ thống và nội dung

## Thuật ngữ API

**Core Service**: Backend service chính (Java Spring Boot)

**AI Service**: Service xử lý AI (Python FastAPI) - OCR, giải toán, gợi ý

**Internal API**: API nội bộ giữa các services

**Public API**: API công khai cho frontend

---

← Quay lại: [README.md](../README.md)



================================================================================
# End of: 01-getting-started/glossary.md
================================================================================

================================================================================
# File: README.md
================================================================================

# TUTOR – PROJECT DOCUMENTATION

**Gia sư Toán AI** - Hệ thống trợ giảng toán cho học sinh từ lớp 6–7

---

## 📚 NAVIGATION THEO VAI TRÒ

### 🚀 [Bắt đầu nhanh](./01-getting-started/quick-start.md)
Hướng dẫn bắt đầu nhanh cho tất cả người đọc.

### 👥 [Cho End Users](./02-for-end-users/user-guide.md)
- [Hướng dẫn cho Học sinh](./02-for-end-users/student-guide.md)
- [Hướng dẫn cho Phụ huynh](./02-for-end-users/parent-guide.md)

### 📋 [Cho Product Owners](./03-for-product-owners/product-overview.md)
- [Tổng quan Sản phẩm](./03-for-product-owners/product-overview.md)
- [User Stories](./03-for-product-owners/user-stories/README.md)
- [User Flows](./03-for-product-owners/user-flows/README.md)
- [KPIs & Metrics](./03-for-product-owners/kpis-metrics.md)
- [Roadmap](./03-for-product-owners/roadmap.md)

### 💻 [Cho Developers](./04-for-developers/setup/development-setup.md)
- **Architecture**: [System Architecture](./04-for-developers/architecture/system-architecture.md), [API Specification](./04-for-developers/architecture/api-specification.md), [Database Design](./04-for-developers/architecture/database-design.md)
- **Setup**: [Development Setup](./04-for-developers/setup/development-setup.md), [Environment Config](./04-for-developers/setup/environment-config.md), [Project Structure](./04-for-developers/setup/project-structure.md)
- **Roadmap**: [Roadmap Overview](./04-for-developers/roadmap/overview.md), [Roadmap by Module](./04-for-developers/roadmap/README.md)
- **Implementation**: [API-DB Mapping](./04-for-developers/implementation/api-db-mapping.md)
- **Education Logic**: [Adaptive Learning](./04-for-developers/education-logic/adaptive-learning.md), [Skill Graph](./04-for-developers/education-logic/skill-graph.md)
- **Coding Standards**: [Java](./04-for-developers/coding-standards/java/README.md), [Python](./04-for-developers/coding-standards/python/README.md), [Next.js](./04-for-developers/coding-standards/nextjs/README.md), [Flutter](./04-for-developers/coding-standards/flutter/README.md)
- **Testing**: [Testing Strategy](./04-for-developers/testing/testing-strategy.md)

### 🔧 [Cho DevOps](./05-for-devops/deployment.md)
- [Deployment Guide](./05-for-devops/deployment.md)
- [Infrastructure](./05-for-devops/infrastructure.md)
- [Monitoring](./05-for-devops/monitoring.md)

### 📖 [Tài liệu Tham khảo](./06-reference/api-reference.md)
- [API Reference](./06-reference/api-reference.md)
- [Database Schema](./06-reference/database-schema.md)
- [AI Prompts](./06-reference/ai-prompts.md)

---

## 🎯 TỔNG QUAN DỰ ÁN

**Gia sư Toán AI** là hệ thống trợ giảng toán cho học sinh từ lớp 6–7, sử dụng LLM để:

- **Cung cấp bài tập** cá nhân hoá theo năng lực học sinh
- **Giải thích bước–bước** các bài toán theo chuẩn chương trình Việt Nam
- **Theo dõi tiến độ** học tập và báo cáo minh bạch cho phụ huynh

### Mục tiêu MVP Giai đoạn 1

- **Nền tảng web/mobile**: Student App (Flutter) + Parent Dashboard (Next.js)
- **Adaptive Learning Engine**: Hệ thống học tập thích ứng dựa trên skill graph và mastery tracking
- **Tính năng hỗ trợ phụ huynh**: Dashboard báo cáo, theo dõi điểm yếu, báo cáo tuần

### Định vị sản phẩm

Sản phẩm **KHÔNG phải**:
- App giải bài đơn thuần (Photomath-style)
- App học video
- Nền tảng lớp học online

Sản phẩm **LÀ**:
- Gia sư Toán 1–1 dựa trên AI + logic giáo dục
- Hệ thống học tập có kiểm soát và báo cáo cho phụ huynh

Xem chi tiết: [Tổng quan Dự án](./01-getting-started/overview.md)

---

## 📊 QUICK LINKS

### Tài liệu quan trọng nhất

- 📋 [Product Overview](./03-for-product-owners/product-overview.md) - Bắt đầu từ đây
- 🏗️ [System Architecture](./04-for-developers/architecture/system-architecture.md) - Kiến trúc hệ thống
- 🔌 [API Specification](./04-for-developers/architecture/api-specification.md) - API reference
- 🛠️ [Development Setup](./04-for-developers/setup/development-setup.md) - Setup môi trường
- 📊 [Database Design](./04-for-developers/architecture/database-design.md) - Database schema

### Tài liệu theo chủ đề

**Onboarding & User Management:**
- [User Flows](./03-for-product-owners/user-flows/README.md)
- [User Stories](./03-for-product-owners/user-stories/README.md)

**Education & Learning:**
- [Adaptive Learning](./04-for-developers/education-logic/adaptive-learning.md)
- [Skill Graph](./04-for-developers/education-logic/skill-graph.md)

**Development:**
- [Project Structure](./04-for-developers/setup/project-structure.md)
- [Testing Strategy](./04-for-developers/testing/testing-strategy.md)

**Deployment:**
- [Deployment Guide](./05-for-devops/deployment.md)
- [Environment Configuration](./04-for-developers/setup/environment-config.md)

---

## 🗂️ CẤU TRÚC TÀI LIỆU

```
tutor_docs/
├── 01-getting-started/          # Bắt đầu nhanh
├── 02-for-end-users/            # Hướng dẫn người dùng
├── 03-for-product-owners/       # Tài liệu sản phẩm
├── 04-for-developers/           # Tài liệu kỹ thuật
│   ├── architecture/
│   ├── setup/
│   ├── implementation/
│   ├── education-logic/
│   ├── coding-standards/
│   └── testing/
├── 05-for-devops/               # Deployment & Infrastructure
├── 06-reference/                # Tài liệu tham khảo
├── _archive/                    # Archive (file cũ)
└── _templates/                  # Templates
```

---

## 📝 QUY ƯỚC

- Tất cả file dùng Markdown
- Tên file không có timestamps (ví dụ: `system-architecture.md`)
- Tất cả tài liệu có link quay về README.md ở đầu và cuối file

---

## 🔄 CẬP NHẬT

**Last Updated**: 2025-12-21

---

## 📞 LIÊN HỆ

- Product owner: [TBD]
- Technical lead: [TBD]


================================================================================
# End of: README.md
================================================================================
