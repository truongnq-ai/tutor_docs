# CSV Import
[← Quay lại Overview](README.md)

## Mô tả

Import bài tập từ file CSV. Phù hợp cho việc nhập hàng loạt từ Excel.

## Workflow

```
Upload CSV file
→ Parse CSV → Validate format
→ Map skill_code → skill_id
→ Validate data
→ Preview table với parsed data
  - Highlight validation errors
  - Edit individual rows
→ Confirm & Batch Insert
→ Return import report
```

## API Endpoints

**POST /api/admin/exercises/import/csv**

**Request (multipart/form-data):**
```
file: <csv file>
autoValidate: true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "importId": "uuid",
    "totalRows": 100,
    "validRows": 95,
    "invalidRows": 5,
    "preview": [...]
  }
}
```

**POST /api/admin/exercises/import/:importId/submit**

Submit selected rows để import vào database.

## Độ phức tạp

⭐⭐ Medium - Cần parse và validate CSV

[← Quay lại Overview](README.md)

