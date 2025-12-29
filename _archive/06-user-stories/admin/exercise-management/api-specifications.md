# API Specifications
← Quay lại: [README.md](../README.md)

## Image Upload & OCR

### POST /api/admin/exercises/upload-and-process-image

Upload ảnh và tự động xử lý OCR.

**Request (multipart/form-data):**
```
file: <image file> (JPEG/PNG, max 5MB)
autoProcess: true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://res.cloudinary.com/.../image.jpg",
    "ocrResult": {
      "problemText": "Rút gọn phân số: 12/18",
      "latex": "\\frac{12}{18}",
      "confidence": 0.95
    },
    "draftExerciseId": "uuid"
  }
}
```

### PUT /api/admin/exercises/:draftId/preview

Cập nhật draft exercise và validate.

### POST /api/admin/exercises/:draftId/submit

Submit draft exercise (chuyển thành exercise thật).

## DOCX Upload & Parse

### POST /api/admin/exercises/upload-and-parse-docx

Upload DOCX và parse exercises.

**Request (multipart/form-data):**
```
file: <docx file> (max 10MB)
autoParse: true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "fileId": "uuid",
    "parsedExercises": [...],
    "totalExercises": 10,
    "validExercises": 8,
    "invalidExercises": 2,
    "draftBatchId": "uuid"
  }
}
```

### PUT /api/admin/exercises/:draftBatchId/preview

Cập nhật draft batch exercises.

### POST /api/admin/exercises/:draftBatchId/submit

Submit batch exercises.

## Error Responses

- `400 VALIDATION_ERROR`: File không hợp lệ
- `413 PAYLOAD_TOO_LARGE`: File quá lớn
- `503 SERVICE_UNAVAILABLE`: OCR service không available
- `500 INTERNAL_ERROR`: Upload hoặc OCR failed

← Quay lại: [README.md](../README.md)

