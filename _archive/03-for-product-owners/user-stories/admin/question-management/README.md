# Question Management

Tài liệu này mô tả hệ thống quản lý Questions (Câu hỏi) trong Tutor Phase 1 (MVP).

## Tổng quan

Questions là practice item instances được sinh từ Exercises khi assign cho học sinh. Questions bridge giữa Exercise (template) và Practice (result).

## Workflow tổng thể

```
Exercise (APPROVED) 
  → Generate/Assign 
    → Question (ASSIGNED) 
      → Student submits answer 
        → Practice Record (với question_id)
          → Update Question (COMPLETED)
```

## Cấu trúc tài liệu

### Khái niệm
- [Định nghĩa và Khái niệm](concepts.md)
- [Mối quan hệ giữa các Entities](relationships.md)

### Business Logic
- [Workflow chi tiết](workflow.md)
- [Business Rules và Validation](business-rules.md)

### Technical Details
- [Database Schema](database-schema.md)
- [API Endpoints](api-endpoints.md)
- [Integration Points](integration-points.md)

[← Quay lại Overview](../../README.md)

