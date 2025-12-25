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
