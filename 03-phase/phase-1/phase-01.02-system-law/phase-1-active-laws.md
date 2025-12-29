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

**⚠️ PHASE 1 OVERRIDE:**
- Phase 1 sử dụng lifecycle snapshot tối giản: ACTIVE | SUSPENDED | INACTIVE
- Phase 1 KHÔNG ánh xạ ngược sang license / trial (đang dormant)
- Phase 1 lifecycle KHÔNG phải là LICENSE_ACTIVE, TRIAL_ACTIVE, v.v. của System Law gốc
- System Law gốc (LICENSE_ACTIVE, TRIAL_*, ...) vẫn là nguồn sự thật cho Phase 2

### 2.2. Chapter Progression – System Law

- Chapter là **đơn vị tiến độ duy nhất**
- Chapter có state rõ ràng
- Không có trạng thái ngầm
- Progression chỉ thay đổi theo flow hợp lệ

**⚠️ PHASE 1 OVERRIDE:**
- Phase 1 LOẠI BỎ CÓ CHỦ ĐÍCH trạng thái UNLOCKED
- Phase 1 FSM: LOCKED → IN_PROGRESS → COMPLETED (bỏ qua UNLOCKED)
- Phase 1 KHÔNG có logic chuyển trạng thái LOCKED → UNLOCKED → IN_PROGRESS
- System Law gốc (có UNLOCKED) vẫn là nguồn sự thật cho Phase 2

### 2.3. Skill & Mastery Rules – System Law (Simplified)

- Skill là đơn vị năng lực, không phải tiến độ
- Mastery tồn tại nhưng **không triển khai nâng cao**
- Không decay, không suy luận ngoài luật

**⚠️ PHASE 1 OVERRIDE:**
- Phase 1 KHÔNG dùng mastery cho completion decision
- Phase 1 mastery chỉ là dữ liệu tham chiếu, không dùng để unlock / complete / decision
- Phase 1 completion rule KHÔNG dựa trên mastery threshold (xem Completion Rule override)
- System Law gốc (mastery threshold cho completion) vẫn là nguồn sự thật cho Phase 2

### 2.4. AI Scoring & Practice Generation Contract

- AI là service hỗ trợ
- AI KHÔNG quyết định:
  - quyền
  - progression
  - completion
- System Core luôn override AI

**⚠️ PHASE 1 OVERRIDE:**
- Phase 1 chỉ dùng subset cực nhỏ của AI Contract
- Phase 1 AI = generate bài + giải thích, không hơn
- Phase 1 KHÔNG dùng mastery bucket, cache, trial boundary (đang dormant)
- System Law gốc (AI Contract đầy đủ) vẫn là nguồn sự thật cho Phase 2

### 2.5. Permission Rules (Hard-coded)

- Permission không động
- Không Permission Matrix đầy đủ
- Quyền được kiểm soát trực tiếp trong code theo Phase 1 scope

---

## 2.6. COMPLETION RULE – PHASE 1 OVERRIDE (TẠM THỜI)

**⚠️ OVERRIDE NGHIÊM TRỌNG:**

Phase 1 sử dụng Completion Rule TẠM THỜI, KHÔNG dựa trên mastery threshold như System Law gốc.

**Completion Rule Phase 1:**
- Chapter COMPLETED khi có ít nhất MỘT Practice được submit hợp lệ
- KHÔNG yêu cầu mastery threshold
- KHÔNG yêu cầu 100% skill REQUIRED đạt threshold

**Lưu ý quan trọng:**
- Completion Phase 1 KHÔNG được hiểu là completion học thuật đầy đủ
- Completion Phase 1 chỉ là đánh dấu tiến độ tối giản
- System Law gốc (mastery threshold) vẫn là nguồn sự thật cho completion học thuật đầy đủ
- Khi Phase 2 triển khai, completion rule sẽ quay về System Law gốc

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

