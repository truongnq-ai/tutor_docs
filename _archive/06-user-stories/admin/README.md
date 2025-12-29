# Admin User Stories

Tài liệu này mô tả user stories dành cho Admin trong hệ thống Tutor Phase 1 (MVP).

## Tổng quan

Admin có các workflows quản lý Exercise và Question, bao gồm:

- **Exercise Management**: 6 cách nhập bài tập khác nhau (Manual, CSV, JSON, AI Generate, Image Upload, DOCX Upload)
- **Question Management**: Hệ thống quản lý Questions được sinh từ Exercises và liên kết với Practice records

## Cấu trúc tài liệu

### Exercise Management
- [Overview](exercise-management/README.md)
- [Manual Form Input](exercise-management/manual-form.md)
- [CSV Import](exercise-management/csv-import.md)
- [JSON Import](exercise-management/json-import.md)
- [AI Generate](exercise-management/ai-generate.md)
- [Image Upload (OCR)](exercise-management/image-upload.md)
- [DOCX Upload](exercise-management/docx-upload.md)
- [Database Schema](exercise-management/database-schema.md)
- [API Specifications](exercise-management/api-specifications.md)
- [Implementation Plan](exercise-management/implementation-plan.md)

### Question Management
- [Overview](question-management/README.md)
- [Định nghĩa và Khái niệm](question-management/concepts.md)
- [Mối quan hệ giữa các Entities](question-management/relationships.md)
- [Workflow chi tiết](question-management/workflow.md)
- [Business Rules và Validation](question-management/business-rules.md)
- [Database Schema](question-management/database-schema.md)
- [API Endpoints](question-management/api-endpoints.md)
- [Integration Points](question-management/integration-points.md)

## Tài liệu liên quan

- [User Stories Overview](../README.md)
- [User Flows](../../user-flows/README.md)

← Quay lại: [README.md](../README.md)
