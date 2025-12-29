# System Law – Luật hệ thống

Tài liệu này mô tả các luật hệ thống (System Law) của dự án Tutor. Đây là các quy tắc nghiêm ngặt, bất biến, và là nguồn sự thật duy nhất (Source of Truth) cho logic nghiệp vụ cốt lõi.

[← Quay lại Overview](../README.md)

---

## Tổng quan

System Law định nghĩa các quy tắc cốt lõi của hệ thống, bao gồm:
- Student Lifecycle: Vòng đời và trạng thái của học sinh
- Trial Policy: Chính sách và giới hạn trial
- Chapter Progression: Logic tiến độ học tập theo Chapter
- License Rules: Quy tắc License và quyền học đầy đủ
- Skill & Mastery Rules: Quy tắc Skill và Mastery
- Permission Matrix: Ma trận quyền API-level
- AI Scoring & Practice Generation Contract: Contract giữa AI Service và System Core

**Lưu ý quan trọng:** Tất cả các tài liệu System Law đều ở trạng thái **Frozen – System Law**, có nghĩa là không được thay đổi nội dung logic. Code phải tuân theo System Law, không được sửa System Law để hợp thức hóa code.

---

## Cấu trúc tài liệu

### Core System Laws

1. **[Student Lifecycle](01-student-lifecycle.md)** – Định nghĩa vòng đời học sinh trong hệ thống
   - Các trạng thái lifecycle chính thức
   - Sơ đồ chuyển trạng thái (FSM)
   - Event chuyển trạng thái
   - Quy tắc dữ liệu & tính nhất quán

2. **[Trial Policy](02-trial-policy.md)** – Định nghĩa phạm vi, giới hạn và hành vi của trial
   - Phạm vi học tập của trial (Learning Scope)
   - Giới hạn Practice & Question
   - Mastery trong trial
   - Thời gian trial
   - Anti-abuse rules

3. **[Chapter Progression](03-chapter-progression.md)** – Định nghĩa tiến độ học tập theo Chapter
   - Trạng thái Chapter
   - Quy tắc chuyển trạng thái Chapter
   - Logic hoàn thành Chapter
   - Unlock Chapter tiếp theo

4. **[License Rules](04-license-rules.md)** – Định nghĩa logic License và quyền học đầy đủ
   - Trạng thái License
   - License FSM
   - Thời gian License
   - Gia hạn License
   - License Scope

5. **[Skill & Mastery Rules](05-skill-mastery-rules.md)** – Định nghĩa Skill là gì, Mastery được tính – cập nhật – sử dụng như thế nào
   - Phân loại Skill (REQUIRED vs OPTIONAL)
   - Định nghĩa & giá trị Mastery
   - Điều kiện cập nhật Mastery
   - Logic tính Mastery
   - Mastery & Chapter Progression

6. **[Permission Matrix](06-permission-matrix.md)** – Map Lifecycle × Chapter State × Action → Quyền API
   - Thứ tự kiểm tra (Invariant)
   - Action Groups
   - Permission theo Lifecycle
   - Permission theo Chapter State
   - Trial-specific Guards

7. **[AI Scoring & Practice Generation Contract](07-ai-scoring-practice-generation-contract.md)** – Định nghĩa contract giữa AI Service và System Core
   - Vai trò của AI
   - Ranh giới trách nhiệm (AI vs System)
   - Input Contract (System → AI)
   - Output Contract (AI → System)
   - Practice Flow chuẩn

---

## Mối quan hệ giữa các System Law

```
Student Lifecycle (Foundation)
    ↓
Trial Policy ──┐
    ↓          │
Chapter Progression ──┐
    ↓                 │
License Rules ────────┼──→ Permission Matrix
    ↓                 │
Skill & Mastery Rules ┘
    ↓
AI Scoring & Practice Generation Contract
```

**Thứ tự đọc đề xuất:**
1. Student Lifecycle (nền tảng)
2. Trial Policy (phụ thuộc Student Lifecycle)
3. Chapter Progression (phụ thuộc Student Lifecycle, Trial Policy)
4. License Rules (phụ thuộc Student Lifecycle, Trial Policy, Chapter Progression)
5. Skill & Mastery Rules (phụ thuộc tất cả các System Law trên)
6. Permission Matrix (phụ thuộc tất cả các System Law trên)
7. AI Scoring & Practice Generation Contract (phụ thuộc tất cả các System Law trên)

---

## Quy tắc sử dụng System Law

### 1. System Law là Source of Truth

- Mọi quyết định về thiết kế, triển khai, và kiểm thử phải dựa trên System Law
- Code phải tuân theo System Law, không được sửa System Law để hợp thức hóa code

### 2. Trạng thái Frozen

- Tất cả System Law đều ở trạng thái **Frozen – System Law**
- Không được thay đổi logic, nội dung nghiệp vụ
- Chỉ được phép chuẩn hóa format, thêm metadata, navigation links

### 3. Checklist ép code

- Mỗi System Law đều có phần "Checklist ép code" liệt kê các hành vi vi phạm
- Code vi phạm phải được sửa lại để tuân theo System Law

---

## Tài liệu liên quan

- [Phase 0 – Scope Definition](../03-phase/phase-0-scope-definition.md) – Phạm vi triển khai Phase 1
- [Phase 1 – System Law Constraints](../03-phase/phase-1/phase-01.02-system-law/) – Ràng buộc System Law trong Phase 1

---

[← Quay lại Overview](../README.md)

