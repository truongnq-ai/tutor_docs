# JSON Import
← Quay lại: [README.md](../README.md)

## Mô tả

Import bài tập từ file JSON hoặc API của hệ thống khác. Tương tự CSV Import nhưng hỗ trợ nested structure phức tạp hơn.

## Workflow

Tương tự CSV Import:
- Parse JSON thay vì CSV
- JSON có thể có nested structure phức tạp hơn
- Có thể import từ API của hệ thống khác

## API Endpoint

**POST /api/admin/exercises/import/json**

**Request:**
```json
{
  "file": "<json file>",
  // OR
  "exercises": [
    {
      "skillCode": "6.3.9",
      "grade": 6,
      "problemText": "...",
      ...
    }
  ]
}
```

**Response:** Tương tự CSV import

## Độ phức tạp

⭐⭐ Medium - Cần parse và validate JSON

← Quay lại: [README.md](../README.md)

