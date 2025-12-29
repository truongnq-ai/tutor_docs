# User Flows – Phase 1

**Project:** Tutor  
**Document type:** User Flow  
**Audience:** Developer | Product | Tech  
**Status:** ACTIVE (to be frozen before coding)  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

User Flow trong Phase 1 được sử dụng để:

- Xác nhận lại toàn bộ kiến trúc hệ thống dưới góc nhìn runtime
- Kiểm tra tính khả thi của:
  - Domain Model
  - Backend Skeleton
  - Authority & Invariant
- Phát hiện sớm:
  - bước thiếu guard
  - điểm authority chưa rõ
  - entry point API chưa hợp lý

**User Flow:**

- KHÔNG tạo luật mới
- KHÔNG mở rộng scope
- KHÔNG mô tả UI chi tiết
- KHÔNG thay thế Domain Model

User Flow chỉ mô tả:

> "Người dùng đi qua hệ thống như thế nào, hệ thống phản ứng ra sao ở mỗi bước"

---

## 2. PHẠM VI USER FLOW PHASE 1

User Flow Phase 1 chỉ bao gồm:

- Student flows
- Parent flows (read-only)
- Admin flows (content & assignment)

**User Flow Phase 1 TUYỆT ĐỐI KHÔNG bao gồm:**

- Trial
- License
- Payment
- Device binding
- Commercial permission
- Recommendation engine
- Adaptive learning nâng cao

---

## 3. NGUYÊN TẮC VIẾT USER FLOW

Mỗi User Flow BẮT BUỘC phải có:

- Actor (ai thực hiện)
- Preconditions (điều kiện trước)
- Trigger (hành động kích hoạt)
- Step-by-step flow
- System checks tại mỗi bước
- Domain owner xử lý
- Event (nếu có)
- Forbidden paths (đường cấm)

**Không mô tả:**

- UI layout
- Animation
- UX chi tiết

---

## 4. CẤU TRÚC THƯ MỤC

```
phase-01.05-user-flows/
├── README.md
├── student/
│   ├── start-learning-flow.md
│   ├── do-practice-flow.md
│   └── complete-chapter-flow.md
├── parent/
│   └── view-progress-flow.md
└── admin/
    ├── assign-chapter-flow.md
    └── manage-content-flow.md
```

Mỗi flow là 1 file markdown độc lập.

---

## 5. QUY TẮC ĐÓNG BĂNG (FREEZE RULE)

Sau khi:

- Các User Flow được review
- Không phát hiện lệch Domain / Law

→ Thư mục này được coi là FROZEN.

Mọi thay đổi flow sau đó:

- BẮT BUỘC quay lại Phase 0
- Hoặc cập nhật System Law Snapshot

---

## 6. CẤU TRÚC TÀI LIỆU

### Student Flows

- [Start Learning Flow](student/start-learning-flow.md) – Student bắt đầu học một Chapter hợp lệ
- [Do Practice Flow](student/do-practice-flow.md) – Student thực hiện một Practice trong Chapter đang học
- [Complete Chapter Flow](student/complete-chapter-flow.md) – Hệ thống xác nhận hoàn thành Chapter hợp lệ

### Parent Flows

- [View Progress Flow](parent/view-progress-flow.md) – Parent xem tiến độ học tập của con ở chế độ read-only

### Admin Flows

- [Assign Chapter Flow](admin/assign-chapter-flow.md) – Admin gán Chapter ban đầu cho Student
- [Manage Content Flow](admin/manage-content-flow.md) – Admin quản lý nội dung học tập (Chapter, Skill, Exercise)

---

## 7. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Phase 1 Core Scope](../phase-01.01-scope/phase-1-core-scope.md)
  - [Backend Skeleton](../phase-01.03-architecture/phase-1-backend-skeleton.md)
  - [Domain Model](../phase-01.03-architecture/phase-1-domain-model.md)

---

[← Quay lại Overview](../../README.md)

