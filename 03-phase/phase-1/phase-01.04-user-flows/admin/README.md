# Admin User Flows – Phase 1

**Project:** Tutor  
**Document type:** User Flow  
**Audience:** Developer | Product | Tech  
**Status:** ACTIVE  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Thư mục này chứa các user flows cho Admin trong Phase 1 của dự án Tutor.

---

## 2. CẤU TRÚC TÀI LIỆU

### Admin Flows

- **[Assign Chapter Flow](assign-chapter-flow.md)** – Admin gán Chapter ban đầu cho Student (assignment only)
  - Preconditions
  - Trigger
  - Step-by-step flow
  - Domain ownership & authority

- **[Manage Content Flow](manage-content-flow.md)** – Admin quản lý nội dung học tập (Chapter, Skill, Exercise)
  - CRUD Chapter
  - CRUD Skill
  - CRUD Exercise
  - Forbidden paths

---

## 3. QUY TẮC QUAN TRỌNG

**Admin sở hữu CONTENT, KHÔNG sở hữu PROGRESSION:**

- Admin được phép: CRUD content, gán Chapter ban đầu
- Admin KHÔNG được phép: đổi chapter_state, đánh dấu COMPLETED, bypass lifecycle

---

## 4. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [User Flows Overview](../README.md)
  - [Backend Skeleton](../../phase-01.03-architecture/phase-1-backend-skeleton.md)
  - [Domain Model](../../phase-01.03-architecture/phase-1-domain-model.md)

---

[← Quay lại Overview](../README.md)

