# Phase 1 – System Law Snapshot

**Project:** Tutor  
**Document type:** Phase Definition  
**Audience:** Developer | Product | Tech  
**Status:** FROZEN (after approval)  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Thư mục này chứa **ảnh chụp (snapshot) luật hệ thống** được áp dụng cho **Phase 1** của dự án Tutor.

**Mục tiêu:**
- Chỉ rõ **luật nào đang ACTIVE**
- Chỉ rõ **luật nào tồn tại nhưng đang DORMANT**
- Ép code, kiến trúc và Domain Model **không được diễn giải lại luật**

👉 Thư mục này **KHÔNG định nghĩa luật mới**.  
👉 Thư mục này **KHÔNG chỉnh sửa System Law gốc**.

Nó chỉ làm một việc:
> Chốt cách *áp dụng* System Law trong Phase 1.

---

## 2. QUAN HỆ VỚI PHASE 0 & SYSTEM LAW TOÀN CỤC

- Phase 0 định nghĩa **deployment intent & scope**
- Thư mục `01-system-law/` định nghĩa **luật toàn cục**
- Thư mục này:
  - Chọn lọc luật
  - Đóng băng cách hiểu luật
  - Áp dụng riêng cho Phase 1

**Nếu có mâu thuẫn:**
> **Phase 0 → ưu tiên cao nhất**  
> **System Law gốc → không được sửa**  
> **File trong thư mục này → hướng dẫn áp dụng**

---

## 3. SINGLE SOURCE OF TRUTH (QUAN TRỌNG)

Trong Phase 1:
- Mọi quyết định kiến trúc
- Mọi Domain Model
- Mọi code backend / AI
- Mọi review

👉 **CHỈ được phép đọc luật từ thư mục này**  
👉 Không được suy luận luật từ nơi khác

---

## 4. CẤU TRÚC TÀI LIỆU

| File | Purpose |
|------|---------|
| [Active Laws](active-laws.md) | Danh sách luật đang ACTIVE trong Phase 1 |
| [Dormant Laws](dormant-laws.md) | Danh sách luật tồn tại nhưng bị khóa |
| [Phase 1 Law Constraints](phase-1-law-constraints.md) | Checklist ép code & cấm triển khai |

---

## 5. QUY TẮC ĐÓNG BĂNG (FREEZE RULE)

Sau khi Phase 1 được đánh dấu hoàn thành:
- Thư mục này được coi là **FROZEN**
- Mọi thay đổi phạm vi:
  - BẮT BUỘC quay lại Phase 0
  - BẮT BUỘC cập nhật lại snapshot này

---

## 6. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Phase 0 – Scope Definition](../../phase-0-scope-definition.md)
  - [System Law](../../../01-system-law/README.md)
  - [Phase 1 Core Scope](../phase-01.01-scope/phase-1-core-scope.md)

---

[← Quay lại Overview](../../README.md)

