# Student User Flows – Phase 1

**Project:** Tutor  
**Document type:** User Flow  
**Audience:** Developer | Product | Tech  
**Status:** ACTIVE  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Thư mục này chứa các user flows cho Student trong Phase 1 của dự án Tutor.

---

## 2. CẤU TRÚC TÀI LIỆU

### Student Flows

- **[Start Learning Flow](start-learning-flow.md)** – Student bắt đầu học một Chapter hợp lệ
  - Preconditions
  - Trigger
  - Step-by-step flow
  - Domain ownership & authority

- **[Do Practice Flow](do-practice-flow.md)** – Student thực hiện một Practice trong Chapter đang học
  - Request practice
  - Submit practice
  - Domain events
  - Forbidden paths

- **[Complete Chapter Flow](complete-chapter-flow.md)** – Hệ thống xác nhận hoàn thành Chapter hợp lệ
  - Completion conditions
  - Domain events
  - System reaction

---

## 3. THỨ TỰ FLOW

Các flows được thực hiện theo thứ tự:

1. **Start Learning Flow** → Student bắt đầu học Chapter
2. **Do Practice Flow** → Student làm bài tập
3. **Complete Chapter Flow** → Hệ thống xác nhận hoàn thành (tự động)

---

## 4. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [User Flows Overview](../README.md)
  - [Backend Skeleton](../../phase-01.03-architecture/phase-1-backend-skeleton.md)
  - [Domain Model](../../phase-01.03-architecture/phase-1-domain-model.md)

---

[← Quay lại Overview](../README.md)

