# Phase Documentation

Tài liệu này mô tả các phase (giai đoạn) triển khai của dự án Tutor, bao gồm định nghĩa phạm vi, ràng buộc, và kiến trúc cho từng phase.

[← Quay lại Overview](../README.md)

---

## Tổng quan

Phase Documentation định nghĩa:
- **Phase 0**: Deployment Scope & Intent Definition – Xác định mục đích và phạm vi triển khai trước khi bắt đầu implementation
- **Phase 1**: Core Implementation – Triển khai các tính năng cốt lõi theo phạm vi đã định nghĩa

**Lưu ý quan trọng:** Mỗi phase có phạm vi và ràng buộc riêng. Không được thêm feature ngoài scope của phase hiện tại.

---

## Cấu trúc tài liệu

### Phase 0 – Scope Definition

- **[Phase 0 – Scope Definition](phase-0-scope-definition.md)** – Định nghĩa deployment intent và phạm vi Phase 1
  - Mục đích của Phase 0
  - Deployment Intent (Ý định triển khai)
  - Nguyên tắc cốt lõi (Core Principles)
  - Phạm vi Phase 1 (Được phép làm)
  - Những thứ cố tình không làm ở Phase 1
  - Trạng thái System Law trong Phase 1
  - Nguyên tắc thiết kế kiến trúc cho Phase 1
  - Điều kiện đóng băng Phase 1
  - Cam kết không vi phạm Phase 0

### Phase 1 – Core Implementation

- **[Phase 1 Documentation](phase-1/)** – Tài liệu chi tiết về Phase 1
  - **Core Scope**: Phạm vi cốt lõi của Phase 1
  - **System Law Constraints**: Ràng buộc System Law trong Phase 1
  - **Architecture**: Kiến trúc và database schema cho Phase 1
  - **User Flows**: Luồng người dùng cho Phase 1

---

## Quy tắc sử dụng Phase Documentation

### 1. Phase 0 là lá chắn quyết định

- Phase 0 tồn tại để xác định rõ ứng dụng đang được xây dựng cho mục đích gì
- Khóa phạm vi triển khai ở từng giai đoạn
- Tránh over-engineering, lệch kiến trúc và tự mâu thuẫn về sau

### 2. Không vi phạm Phase 0

- Trong suốt Phase 1: KHÔNG thêm feature ngoài scope
- Mọi thay đổi scope bắt buộc phải quay lại Phase 0 và cập nhật tài liệu

### 3. System Law trong Phase 1

- System Law được phân loại thành ACTIVE (được enforce) và DORMANT (chưa kích hoạt)
- Dormant nghĩa là không có trạng thái active, không có transition, không có logic xử lý
- Nhưng KHÔNG bị xóa khỏi thiết kế tổng thể

---

## Tài liệu liên quan

- [System Law](../01-system-law/README.md) – Các luật hệ thống cốt lõi
- [Phase 1 – System Law Constraints](phase-1/phase-01.02-system-law/) – Ràng buộc System Law trong Phase 1

---

[← Quay lại Overview](../README.md)

