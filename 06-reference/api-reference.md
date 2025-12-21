# API REFERENCE

Tài liệu này cung cấp tham chiếu chi tiết về tất cả API endpoints.

## Core Service APIs

Xem chi tiết: [API Specification](../04-for-developers/architecture/api-specification.md)

## AI Service APIs

### Internal APIs (chỉ Core Service gọi)

- `POST /internal/ai/ocr` - OCR từ image URL
- `POST /internal/ai/solve` - Giải bài Toán (text hoặc image URL)
- `POST /internal/ai/hint` - Sinh gợi ý theo ngữ cảnh
- `POST /internal/ai/recommend` - Đề xuất skill và độ khó

## Authentication

Xem chi tiết: [Authentication Flow](../04-for-developers/architecture/sequence-diagrams.md)

## Response Format

Tất cả API trả về format:
```json
{
  "errorCode": "0000",
  "errorDetail": "Operation successful",
  "data": {...}
}
```

---

← Quay lại: [README.md](../README.md)

