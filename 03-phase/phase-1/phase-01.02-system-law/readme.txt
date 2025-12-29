# Phase 1 – System Law Snapshot

**Location:** `03-phase/phase-1/phase-01.02-system-law/`  
**Status:** FROZEN (after approval)  
**Scope:** Phase 1 only

---

## 1. Purpose of this folder

Thư mục này chứa **ảnh chụp (snapshot) luật hệ thống** được áp dụng cho **Phase 1** của dự án *Gia sư Toán AI*.

Mục tiêu:
- Chỉ rõ **luật nào đang ACTIVE**
- Chỉ rõ **luật nào tồn tại nhưng đang DORMANT**
- Ép code, kiến trúc và Domain Model **không được diễn giải lại luật**

👉 Thư mục này **KHÔNG định nghĩa luật mới**.  
👉 Thư mục này **KHÔNG chỉnh sửa System Law gốc**.

Nó chỉ làm một việc:
> Chốt cách *áp dụng* System Law trong Phase 1.

---

## 2. Relationship to Phase 0 & Global System Law

- Phase 0 định nghĩa **deployment intent & scope**
- Thư mục `01-system-law/` định nghĩa **luật toàn cục**
- Thư mục này:
  - Chọn lọc luật
  - Đóng băng cách hiểu luật
  - Áp dụng riêng cho Phase 1

Nếu có mâu thuẫn:
> **Phase 0 → ưu tiên cao nhất**  
> **System Law gốc → không được sửa**  
> **File trong thư mục này → hướng dẫn áp dụng**

---

## 3. Single Source of Truth (IMPORTANT)

Trong Phase 1:
- Mọi quyết định kiến trúc
- Mọi Domain Model
- Mọi code backend / AI
- Mọi review

👉 **CHỈ được phép đọc luật từ thư mục này**  
👉 Không được suy luận luật từ nơi khác

---

## 4. File overview

| File | Purpose |
|----|----|
| `active-laws.md` | Danh sách luật đang ACTIVE trong Phase 1 |
| `dormant-laws.md` | Danh sách luật tồn tại nhưng bị khóa |
| `phase-1-law-constraints.md` | Checklist ép code & cấm triển khai |

---

## 5. Freeze rule

Sau khi Phase 1 được đánh dấu hoàn thành:
- Thư mục này được coi là **FROZEN**
- Mọi thay đổi phạm vi:
  - BẮT BUỘC quay lại Phase 0
  - BẮT BUỘC cập nhật lại snapshot này

---
