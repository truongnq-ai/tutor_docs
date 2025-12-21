# Image Upload (OCR)
[← Quay lại Overview](README.md)

## Mô tả

Upload ảnh bài tập và sử dụng OCR để tự động nhận dạng nội dung. Phù hợp cho việc scan từ sách, đề thi.

## Workflow

```
STEP 1: Upload Image
Admin Dashboard → Core Service → Cloudinary
- Upload ảnh (JPEG/PNG, max 5MB)
- Upload to Cloudinary
- Return imageUrl

STEP 2: Process Image (OCR)
Admin Dashboard → Core Service → AI Service
- Gửi imageUrl đến AI Service
- OCR extraction (PaddleOCR)
- Extract: problem_text, latex, confidence
- Return OCR result

STEP 3: Preview & Edit (Draft Mode)
Admin Dashboard:
- Hiển thị preview kết quả OCR
- Form edit với các fields
- Confidence indicator (Green/Yellow/Red)
- Save as Draft / Submit for Review

STEP 4: Submit Exercise
Admin Dashboard → Core Service
- Gửi exercise data
- Validate & Save
- Link imageUrl với exercise
```

## API Endpoints

**POST /api/admin/exercises/upload-and-process-image**

Upload ảnh và tự động xử lý OCR.

**PUT /api/admin/exercises/:draftId/preview**

Cập nhật draft exercise và validate.

**POST /api/admin/exercises/:draftId/submit**

Submit draft exercise (chuyển thành exercise thật).

## Confidence Levels

- **Green (≥0.9)**: High confidence
- **Yellow (0.7-0.9)**: Medium confidence
- **Red (<0.7)**: Low confidence, cần review kỹ

## Độ phức tạp

⭐⭐⭐ High - Cần tích hợp OCR và xử lý ảnh

[← Quay lại Overview](README.md)

