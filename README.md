# TUTOR – PROJECT DOCUMENTATION

**Gia sư Toán AI** - Hệ thống trợ giảng toán cho học sinh từ lớp 6–7

---

## 📚 NAVIGATION THEO VAI TRÒ

### 🚀 [Bắt đầu nhanh](./01-getting-started/quick-start.md)
Hướng dẫn bắt đầu nhanh cho tất cả người đọc.

### 👥 [Cho End Users](./04-user-experience/)
- [Trải nghiệm học tập - Học sinh](./04-user-experience/student/learning-experience.md)
- [Trải nghiệm báo cáo - Phụ huynh](./04-user-experience/parent/reporting-experience.md)

### 📋 [Cho Product Owners](./03-product-rules/)
- [Domain Model](./02-domain-model/) - Trái tim của dự án
- [Product Rules](./03-product-rules/) - Quy tắc nghiệp vụ
- [User Stories](./06-user-stories/) - User stories chuẩn hoá
- [User Flows](./05-user-flows/) - Luồng người dùng

### 💻 [Cho Developers](./07-architecture-and-data/)
- **Architecture**: [System Architecture](./07-architecture-and-data/system-architecture.md), [Database Schema](./07-architecture-and-data/database-schema.md), [Chapter-Skill ERD](./07-architecture-and-data/chapter-skill-erd.md)
- **API Contracts**: [Learning Plan](./08-api-contracts/core-service/learning-plan.md), [Mini Test](./08-api-contracts/core-service/mini-test.md)
- **Coding Standards**: [Coding Standards](./09-coding-standards/README.md)
- **Migration**: [Chapter Migration](./10-release-and-migration/chapter-migration.md), [Backward Compatibility](./10-release-and-migration/backward-compatibility.md)

### 🤖 [Cho AI Service](./03-product-rules/)
- [Domain Model](./02-domain-model/) - Chapter, Skill, Learning Plan
- [Product Rules](./03-product-rules/) - Learning Plan Rules, Mastery Calculation
- [API Contracts - AI Service](./08-api-contracts/ai-service/)

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

- 📋 [Core Concepts](./00-core-concepts/glossary.md) - Thuật ngữ và khái niệm cốt lõi
- 🏗️ [Domain Model](./02-domain-model/) - Chapter, Skill, Exercise, Practice, Mini Test, Learning Plan
- 📐 [Product Rules](./03-product-rules/) - Mini Test Rules, Learning Plan Rules, Mastery Calculation
- 🏛️ [System Architecture](./07-architecture-and-data/system-architecture.md) - Kiến trúc hệ thống
- 📊 [Database Schema](./07-architecture-and-data/database-schema.md) - Database schema

### Tài liệu theo chủ đề

**Core Concepts:**
- [Glossary](./00-core-concepts/glossary.md) - Thuật ngữ
- [Chapter vs Skill](./00-core-concepts/chapter-vs-skill.md) - Phân vai rõ ràng
- [Learning Philosophy](./00-core-concepts/learning-philosophy.md) - Vì sao chọn Chapter

**Domain Model:**
- [Chapter](./02-domain-model/chapter.md) - Trục sư phạm / UX
- [Skill](./02-domain-model/skill.md) - Trục AI / luyện tập
- [Learning Plan](./02-domain-model/learning-plan.md) - Lộ trình học tập

**Product Rules:**
- [Mini Test Rules](./03-product-rules/mini-test-rules.md) - Quy tắc Mini Test
- [Learning Plan Rules](./03-product-rules/learning-plan-rules.md) - Quy tắc Learning Plan
- [Mastery Calculation](./03-product-rules/mastery-calculation.md) - Công thức Mastery

**User Experience:**
- [Student Learning Experience](./04-user-experience/student/learning-experience.md)
- [Parent Reporting Experience](./04-user-experience/parent/reporting-experience.md)

**Architecture & Data:**
- [System Architecture](./07-architecture-and-data/system-architecture.md)
- [Database Schema](./07-architecture-and-data/database-schema.md)
- [Chapter-Skill ERD](./07-architecture-and-data/chapter-skill-erd.md)

**API Contracts:**
- [Learning Plan API](./08-api-contracts/core-service/learning-plan.md)
- [Mini Test API](./08-api-contracts/core-service/mini-test.md)

**Coding Standards:**
- [Coding Standards](./09-coding-standards/README.md)
- [General Principles](./09-coding-standards/general-principles.md)

---

## 🗂️ CẤU TRÚC TÀI LIỆU

```
tutor_docs/
├── README.md (root entry point)
├── 00-core-concepts/          # Thuật ngữ và khái niệm cốt lõi
│   ├── glossary.md
│   ├── chapter-vs-skill.md
│   └── learning-philosophy.md
├── 01-getting-started/         # Bắt đầu nhanh
│   ├── overview.md
│   └── quick-start.md
├── 02-domain-model/            # Domain model - trái tim của dự án
│   ├── chapter.md
│   ├── skill.md
│   ├── exercise.md
│   ├── practice.md
│   ├── mini-test.md
│   └── learning-plan.md
├── 03-product-rules/           # Quy tắc nghiệp vụ
│   ├── mini-test-rules.md
│   ├── learning-plan-rules.md
│   ├── chapter-progress-rules.md
│   └── mastery-calculation.md
├── 04-user-experience/         # Trải nghiệm người dùng
│   ├── student/
│   └── parent/
├── 05-user-flows/              # Luồng người dùng
│   ├── student-learning-flow.md
│   ├── mini-test-flow.md
│   └── parent-view-flow.md
├── 06-user-stories/            # User stories (chuẩn hoá)
│   ├── student/
│   ├── parent/
│   └── admin/
├── 07-architecture-and-data/   # Kiến trúc và dữ liệu
│   ├── system-architecture.md
│   ├── database-schema.md
│   ├── chapter-skill-erd.md
│   └── flyway-migration-notes.md
├── 08-api-contracts/           # API contracts
│   ├── core-service/
│   └── ai-service/
├── 09-coding-standards/        # Coding standards
│   ├── backend/
│   ├── ai-service/
│   ├── frontend/
│   └── api/
├── 10-release-and-migration/   # Release và migration
│   ├── chapter-migration.md
│   └── backward-compatibility.md
├── _templates/                 # Templates
│   ├── domain-doc.md
│   ├── product-rule.md
│   ├── user-flow.md
│   ├── api-contract.md
│   ├── migration-doc.md
│   ├── qna_guidelines.md
│   └── role_presets.md
└── _archive/                   # Archive (file cũ)
```

---

## 📝 QUY ƯỚC

- Tất cả file dùng Markdown
- Tên file không có timestamps (ví dụ: `system-architecture.md`)
- Tất cả tài liệu có link quay về README.md ở đầu và cuối file
- Templates bắt buộc dùng khi thêm file mới

---

## 🔄 CẬP NHẬT

**Last Updated**: 2025-01-XX

**Cấu trúc mới**: Tái cấu trúc từ tổ chức theo vai trò sang tổ chức theo domain/lifecycle/decision logic.

---

## 📞 LIÊN HỆ

- Product owner: [TBD]
- Technical lead: [TBD]
