# Phase 1 – Architecture Documentation

**Project:** Tutor  
**Document type:** Architecture Design  
**Audience:** Developer | Tech  
**Status:** ACTIVE  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Thư mục này chứa tài liệu kiến trúc cho Phase 1 của dự án Tutor, bao gồm backend skeleton, domain model, database schema, và Java package mapping.

---

## 2. CẤU TRÚC TÀI LIỆU

### Core Architecture Documents

- **[Backend Skeleton](phase-1-backend-skeleton.md)** – Định nghĩa cấu trúc backend thực thi Domain Model và System Law
  - Repository mapping
  - Kiến trúc backend – nguyên tắc
  - Package structure
  - Module details

- **[Domain Model](phase-1-domain-model.md)** – Mô hình domain cốt lõi của Phase 1
  - Các Aggregate và Ownership
  - Domain Events
  - AI Boundary
  - Content Domain

- **[DB Schema and Flyway Plan](phase-1-db-schema-and-flyway-plan.md)** – Nguồn sự thật duy nhất cho database Phase 1
  - Auth & Identity tables
  - Content Domain tables
  - Learning Domain tables
  - Flyway migration plan

- **[Java Package & Class Mapping](phase-1-java-package-mapping.md)** – Map Domain Model & Backend Skeleton sang Java package và class structure
  - Nguyên tắc chung cho Java package
  - Package structure chi tiết
  - Forbidden class patterns

### Database Migration

- **[DB Migration Scripts](db_migration/)** – Flyway migration scripts cho Phase 1
  - V1__create_users_and_refresh_token.sql
  - V2__create_student_profile_and_parent_relation.sql
  - V3__create_chapter_and_skill.sql
  - V4__create_exercise_content.sql
  - V5__create_chapter_progress.sql
  - V6__create_practice.sql
  - V7__create_skill_mastery.sql

---

## 3. MỐI QUAN HỆ GIỮA CÁC TÀI LIỆU

```
System Law
    ↓
Domain Model ← → Backend Skeleton
    ↓                    ↓
DB Schema ← → Java Package Mapping
    ↓
DB Migration Scripts
```

**Thứ tự đọc đề xuất:**
1. Backend Skeleton (tổng quan kiến trúc)
2. Domain Model (ownership và authority)
3. DB Schema (cấu trúc dữ liệu)
4. Java Package Mapping (hiện thực hóa)

---

## 4. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Phase 1 Core Scope](../phase-01.01-scope/phase-1-core-scope.md)
  - [System Law Constraints](../phase-01.02-system-law/)
  - [User Flows](../phase-01.05-user-flows/)

---

[← Quay lại Overview](../../README.md)

