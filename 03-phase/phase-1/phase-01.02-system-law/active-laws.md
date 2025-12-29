# Phase 1 – Active System Laws

**Project:** Tutor  
**Document type:** Phase Definition  
**Audience:** Developer | Product | Tech  
**Status:** FROZEN  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này liệt kê các luật hệ thống đang được ENFORCE đầy đủ trong Phase 1.

---

## 2. ACTIVE LAWS (ENFORCED)

Các luật sau **đang được ENFORCE đầy đủ** trong Phase 1:

### 2.1. Student Lifecycle – System Law

- Lifecycle là **source of truth duy nhất** cho quyền học
- Chỉ sử dụng lifecycle tối giản theo Phase 1
- Không suy luận quyền từ trial / license

### 2.2. Chapter Progression – System Law

- Chapter là **đơn vị tiến độ duy nhất**
- Chapter có state rõ ràng
- Không có trạng thái ngầm
- Progression chỉ thay đổi theo flow hợp lệ

### 2.3. Skill & Mastery Rules – System Law (Simplified)

- Skill là đơn vị năng lực, không phải tiến độ
- Mastery tồn tại nhưng **không triển khai nâng cao**
- Không decay, không suy luận ngoài luật

### 2.4. AI Scoring & Practice Generation Contract

- AI là service hỗ trợ
- AI KHÔNG quyết định:
  - quyền
  - progression
  - completion
- System Core luôn override AI

### 2.5. Permission Rules (Hard-coded)

- Permission không động
- Không Permission Matrix đầy đủ
- Quyền được kiểm soát trực tiếp trong code theo Phase 1 scope

---

## 3. INTERPRETATION RULES

- Luật được áp dụng **đúng như System Law gốc**
- Không mở rộng
- Không tối giản lại để "dễ code"
- Không chuẩn bị sẵn cho Phase sau

---

## 4. NON-NEGOTIABLE

Nếu code mâu thuẫn với file này:
> **CODE SAI – không được sửa luật**

---

## 5. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [System Law](../../../01-system-law/README.md)
  - [Dormant Laws](dormant-laws.md)
  - [Phase 1 Law Constraints](phase-1-law-constraints.md)

---

[← Quay lại Overview](README.md)

