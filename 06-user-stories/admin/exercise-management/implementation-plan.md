# Implementation Plan
← Quay lại: [README.md](../README.md)

## Phase 1: Image Upload Workflow (Tuần 1-2)

### Core Service
- Tạo migration cho `exercise_draft` table
- Tạo Entity `ExerciseDraft`
- Implement `ExerciseImageController`
- Integrate với AI Service OCR endpoint
- Integrate với Cloudinary image upload

### Admin Dashboard
- Create `ImageUploadComponent`
- Create `ExerciseDraftForm` component với OCR result
- Create confidence indicator component

## Phase 2: DOCX Upload Workflow (Tuần 3-4)

### Core Service
- Add Apache POI dependency
- Tạo migration cho `exercise_draft_batch` và `exercise_draft_batch_item`
- Implement `DocxParserService`
- Implement `ExerciseDraftBatchService`

### Admin Dashboard
- Create `DocxUploadComponent`
- Create `BulkEditTable` component
- Implement bulk actions

## Phase 3: CSV/JSON Import Enhancement (Tuần 5)

- Enhance CSV import với draft batch support
- Enhance JSON import với draft batch support
- Add preview/edit endpoints

## Phase 4: AI Generate Integration (Tuần 6)

- Implement `ExerciseAIGenerateService`
- Create `POST /api/admin/exercises/generate` endpoint
- Integrate với AI Service

## Dependencies

### Core Service
- Apache POI (DOCX processing)
- OpenCSV (CSV processing)
- Jackson (JSON processing)

### Admin Dashboard
- react-dropzone (file upload)
- @tanstack/react-table (data tables)
- papaparse (CSV/JSON processing)
- react-hook-form (form handling)

← Quay lại: [README.md](../README.md)

