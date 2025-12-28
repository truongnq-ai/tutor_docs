# DOCX Upload
← Quay lại: [README.md](../README.md)

## Mô tả

Upload file Word (.docx) và parse thành nhiều bài tập. Phù hợp cho việc import từ Word document.

## Workflow

```
STEP 1: Upload DOCX File
Admin Dashboard → Core Service
- Upload file DOCX (max 10MB)
- Validate (size, format)
- Store temporarily
- Return fileId

STEP 2: Parse DOCX
Core Service → DOCX Parser (Apache POI)
- Parse DOCX structure
- Extract paragraphs, images
- Detect exercise structure
- Extract solution steps
- Return: Parsed exercises array

STEP 3: Preview & Edit (Bulk Edit Mode)
Admin Dashboard:
- Hiển thị danh sách exercises (table view)
- Mỗi exercise có form edit inline
- Bulk actions (apply skill, grade, etc.)
- Validation indicators
- Save as Draft / Submit for Review

STEP 4: Submit Exercises (Batch)
Admin Dashboard → Core Service
- Gửi exercises array
- Validate & Batch Insert (transaction)
- Return: Import report
```

## API Endpoints

**POST /api/admin/exercises/upload-and-parse-docx**

Upload DOCX và parse exercises.

**PUT /api/admin/exercises/:draftBatchId/preview**

Cập nhật draft batch exercises.

**POST /api/admin/exercises/:draftBatchId/submit**

Submit batch exercises.

## Bulk Actions

- Select All / Deselect All
- Apply skill to selected
- Apply grade to selected
- Apply chapter to selected
- Delete selected exercises

## Độ phức tạp

⭐⭐⭐⭐ Very High - Cần parse DOCX và bulk processing

← Quay lại: [README.md](../README.md)

