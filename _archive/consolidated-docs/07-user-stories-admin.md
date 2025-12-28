
================================================================================
# File: 03-for-product-owners/user-stories/admin/README.md
================================================================================

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

[← Quay lại Overview](../README.md)


================================================================================
# End of: 03-for-product-owners/user-stories/admin/README.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/README.md
================================================================================

# Exercise Management

Tài liệu này mô tả các workflows quản lý Exercise (Bài tập) trong hệ thống Tutor Phase 1 (MVP).

## Tổng quan

Admin có thể nhập bài tập theo 6 cách khác nhau:
1. **Manual Form** - Nhập thủ công qua form
2. **CSV Import** - Import từ file CSV
3. **JSON Import** - Import từ file JSON
4. **AI Generate** - Tạo bài tập từ AI
5. **Image Upload** - Upload ảnh và OCR
6. **DOCX Upload** - Upload file Word và parse

## Cấu trúc tài liệu

### Workflows
- [Manual Form Input](manual-form.md) ✅
- [CSV Import](csv-import.md)
- [JSON Import](json-import.md)
- [AI Generate](ai-generate.md) ✅ - [Implementation Details](ai-generate-implementation.md)
- [Image Upload (OCR)](image-upload.md)
- [DOCX Upload](docx-upload.md)

### Technical Details
- [Database Schema](database-schema.md)
- [API Specifications](api-specifications.md)
- [Implementation Plan](implementation-plan.md)

[← Quay lại Overview](../../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/README.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/implementation-plan.md
================================================================================

# Implementation Plan
[← Quay lại Overview](README.md)

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

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/implementation-plan.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/database-schema.md
================================================================================

# Database Schema
[← Quay lại Overview](README.md)

## Exercise Draft Table

Lưu trữ draft exercises từ các nguồn khác nhau (image, manual, AI).

```sql
CREATE TABLE exercise_draft (
  id UUID PRIMARY KEY,
  source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('manual', 'image', 'docx', 'csv', 'json', 'ai')),
  source_data JSON,
  exercise_data JSON NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review')),
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);
```

## Exercise Draft Batch Table

Lưu trữ batch imports (DOCX, CSV, JSON).

```sql
CREATE TABLE exercise_draft_batch (
  id UUID PRIMARY KEY,
  source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('docx', 'csv', 'json')),
  source_file_id VARCHAR(255),
  source_file_name VARCHAR(255),
  total_exercises INT NOT NULL,
  valid_exercises INT DEFAULT 0,
  invalid_exercises INT DEFAULT 0,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);
```

## Exercise Draft Batch Item Table

Lưu trữ từng exercise trong batch.

```sql
CREATE TABLE exercise_draft_batch_item (
  id UUID PRIMARY KEY,
  batch_id UUID NOT NULL,
  exercise_index INT NOT NULL,
  exercise_data JSON NOT NULL,
  validation_errors JSON,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'valid', 'invalid')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_draft_batch FOREIGN KEY (batch_id) 
    REFERENCES exercise_draft_batch(id) ON DELETE CASCADE
);
```

## Scheduled Cleanup

Tự động xóa draft sau khi hết hạn (7 ngày):

```sql
DELETE FROM exercise_draft 
WHERE expires_at IS NOT NULL 
  AND expires_at < CURRENT_TIMESTAMP;
```

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/database-schema.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/api-specifications.md
================================================================================

# API Specifications
[← Quay lại Overview](README.md)

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

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/api-specifications.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/manual-form.md
================================================================================

# Manual Form Input
[← Quay lại Overview](README.md)

## Mô tả

Nhập bài tập thủ công qua form trong Admin Dashboard. Phù hợp cho việc nhập từng bài, có thời gian chỉnh sửa kỹ lưỡng.

## Workflow

```
Admin mở form tạo bài tập mới
→ Điền thông tin bài tập:
  - Skill, Grade, Chapter
  - Problem Text (Tiptap editor)
  - Problem LaTeX (KaTeX editor)
  - Solution Steps
  - Common Mistakes
  - Hints, Metadata
→ Validate form data
→ Save as Draft / Submit for Review
```

## API Endpoint

**POST /api/admin/exercises**

**Request:**
```json
{
  "skillId": "uuid",
  "grade": 6,
  "chapter": "Phân số",
  "problemType": "rút_gọn_phân_số",
  "problemText": "Rút gọn phân số: 12/18",
  "problemLatex": "\\frac{12}{18}",
  "difficultyLevel": 1,
  "solutionSteps": [...],
  "status": "draft"
}
```

## Độ phức tạp

⭐ Low - Đơn giản, không cần xử lý file

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/manual-form.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/image-upload.md
================================================================================

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



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/image-upload.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/docx-upload.md
================================================================================

# DOCX Upload
[← Quay lại Overview](README.md)

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

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/docx-upload.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/json-import.md
================================================================================

# JSON Import
[← Quay lại Overview](README.md)

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

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/json-import.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/csv-import.md
================================================================================

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



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/csv-import.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/ai-generate.md
================================================================================

# AI Generate
[← Quay lại Overview](README.md)

## Mô tả

Tạo bài tập tự động từ AI dựa trên skill, difficulty và grade. Phù hợp cho việc tạo bài tập mới nhanh chóng.

## Workflow

```
Input: skillId, difficulty, grade
→ Call AI Service: Generate Exercise
  - Lấy seed data từ database
  - Generate bài tập mới
→ Preview generated exercise
  - Problem text
  - Solution steps
  - Confidence score
→ Edit nếu cần → Submit for Review
```

## API Endpoint

**POST /api/admin/exercises/generate**

**Request:**
```json
{
  "skillId": "uuid",
  "grade": 6,
  "difficultyLevel": 2,
  "count": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exercises": [
      {
        "problemText": "Rút gọn phân số: 24/36",
        "problemLatex": "\\frac{24}{36}",
        "solutionSteps": [...],
        "confidence": 0.92,
        "draftExerciseId": "uuid"
      }
    ]
  }
}
```

## Độ phức tạp

⭐⭐⭐ High - Cần tích hợp với AI Service

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/ai-generate.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/exercise-management/ai-generate-implementation.md
================================================================================

# AI Exercise Generation - Implementation Documentation

## Tổng quan

Tính năng AI Exercise Generation cho phép admin tự động tạo bài tập Toán cho học sinh lớp 6-7 sử dụng các LLM providers (Gemini, HuggingFace, OpenAI) với fallback mechanism.

## Kiến trúc

### Flow Diagram

```
Admin Dashboard → Core Service → AI Service → Multi-Provider Service → LLM Provider
                                                      ↓
                                              (Fallback: Gemini → HuggingFace → OpenAI)
                                                      ↓
                                              Exercise Generation Service
                                                      ↓
                                              LaTeX Validation & Conversion
                                                      ↓
                                              Redis Cache
                                                      ↓
                                              Core Service (Save as PENDING)
                                                      ↓
                                              Admin Review & Approve
```

### Components

#### 1. Core Service Layer

**Database Schema:**
- `skill` table: Thêm field `description` (TEXT) để cung cấp context cho AI
- `prompt_template` table: Quản lý prompt templates cho exercise generation
  - `id` (UUID)
  - `name` (VARCHAR, unique)
  - `version` (INT)
  - `system_prompt` (TEXT)
  - `user_prompt_template` (TEXT)
  - `output_format_schema` (JSONB)
  - `is_active` (BOOLEAN)

**Entities:**
- `PromptTemplate`: Entity cho prompt templates
- `Skill`: Updated với field `description`

**Services:**
- `PromptTemplateService`: CRUD operations cho prompt templates
- `ExerciseGenerationService`: Orchestrates AI exercise generation
  - Fetches skill metadata
  - Loads prompt template
  - Calls AI Service
  - Validates and saves exercises as PENDING

**Client:**
- `AIServiceClient`: HTTP client với WebClient, timeout, retry, error handling

**Controller:**
- `PromptTemplateController`: REST API cho prompt template management
- `ExerciseController`: Endpoint `POST /api/v1/admin/exercises/generate`

#### 2. AI Service Layer

**Providers:**
- `GeminiProvider`: Google Gemini API integration
- `HuggingFaceProvider`: HuggingFace Inference API integration
- `OpenAIProvider`: OpenAI API integration (enhanced with `generate_exercises`)

**Multi-Provider Service:**
- `MultiProviderService`: Sequential fallback (Gemini → HuggingFace → OpenAI)
- Circuit breaker pattern
- Exponential backoff retry (max 3 retries)
- Health tracking per provider

**Exercise Generation Service:**
- `ExerciseGenerationService`: Core logic for exercise generation
  - Builds prompts from templates
  - Calls multi-provider service
  - Parses LLM response
  - Validates exercise data
  - Processes LaTeX

**LaTeX Utilities:**
- `latex_validator.py`: Validates LaTeX syntax
- `latex_converter.py`: Converts text to LaTeX using SymPy

**Caching:**
- Redis cache for:
  - Generated exercises (TTL: 7 days)
  - Prompt templates (TTL: 24 hours)
  - Skill metadata (TTL: 24 hours)

**API Endpoint:**
- `POST /internal/ai/generate-exercises`: Internal endpoint for Core Service

#### 3. Admin Dashboard Layer

**Prompt Template Management:**
- `PromptTemplateList`: List view với filters
- `PromptTemplateCreateModal`: Create new templates
- `PromptTemplateEditModal`: Edit existing templates
- `PromptTemplateDetailModal`: View template details

**Exercise Generation UI:**
- (Phase 4 - Pending) ExerciseGenerateModal
- (Phase 4 - Pending) ExercisePreviewModal
- (Phase 4 - Pending) Enhanced ExerciseDetailView

## Workflow

### 1. Prompt Template Management

1. Admin tạo/chỉnh sửa prompt template qua UI
2. Template được lưu vào database với version control
3. Template có thể activate/deactivate
4. AI Service fetch template từ Core Service API (có cache)

### 2. Exercise Generation

1. Admin chọn skill, grade, difficulty, count
2. Core Service:
   - Validate skill exists
   - Fetch skill metadata (có cache)
   - Load prompt template (có cache)
   - Build user prompt với placeholders
3. AI Service:
   - Check cache cho generated exercises
   - Nếu không có cache, gọi MultiProviderService
   - MultiProviderService thử từng provider theo thứ tự:
     - Gemini (primary)
     - HuggingFace (fallback)
     - OpenAI (fallback)
   - Parse JSON response từ LLM
   - Validate và process exercises:
     - Validate LaTeX (nếu có)
     - Convert text to LaTeX nếu cần
     - Calculate confidence scores
   - Cache kết quả
4. Core Service:
   - Convert AI response to Exercise entities
   - Save với status PENDING
   - Return list of exercises
5. Admin review và approve/reject exercises

### 3. LaTeX Processing

1. AI generate `problemLatex` (có thể null)
2. Validate LaTeX syntax
3. Nếu invalid hoặc missing:
   - Thử convert từ `problemText` bằng SymPy
   - Nếu vẫn không được, mark as MISSING
4. Set `latexStatus`: VALID, CONVERTED, hoặc MISSING

## Configuration

### Environment Variables

**AI Service:**
```bash
GEMINI_API_KEY=your_gemini_key
HUGGINGFACE_API_KEY=your_huggingface_key
OPENAI_API_KEY=your_openai_key
AI_PROVIDER_FALLBACK_ORDER=gemini,huggingface,openai
AI_PROVIDER_TIMEOUT_SEC=30
AI_PROVIDER_MAX_RETRIES=3
```

**Core Service:**
```yaml
ai-service:
  url: http://localhost:6890
  api-key: internal-api-key-12345
  timeout:
    connect: 3000
    read: 30000
```

## Error Handling

### Error Codes

- `4001`: AI Service unavailable (timeout, connection error)
- `4002`: Invalid request to AI Service
- `5001`: Internal server error
- `3005`: Skill not found
- `3015`: Prompt template not found

### Retry Logic

- Max 3 retries với exponential backoff
- Chỉ retry cho transient errors (5xx, timeout)
- Không retry cho permanent errors (4xx, invalid API key)

### Circuit Breaker

- Open circuit sau 5 consecutive failures
- Close circuit sau 60 seconds
- Skip providers với circuit open

## Caching Strategy

### Cache Keys

- Generated exercises: `generated_exercises:{hash}` (TTL: 7 days)
- Prompt templates: `prompt_template:{name}` (TTL: 24 hours)
- Skill metadata: `skill_metadata:{skill_id}` (TTL: 24 hours)

### Cache Invalidation

- Manual: Admin có thể update prompt template → cache tự động invalidate sau TTL
- Automatic: TTL-based expiration

## Quality Assurance

### Confidence Scoring

Confidence score được tính dựa trên:
- Problem text quality (30%)
- Solution steps quality (40%)
- LaTeX validity (20%)
- Additional fields (10%)

### Validation Rules

1. `problemText` bắt buộc
2. `solutionSteps` phải có ít nhất 2 bước
3. LaTeX được validate và convert nếu cần
4. Difficulty level: 1-5 hoặc AI suggest

## Limitations & Future Improvements

### Current Limitations

1. Phase 4 UI components chưa được implement (pending)
2. Batch generation UI chưa có progress tracking
3. Prompt template versioning chưa có UI
4. A/B testing cho prompts chưa có

### Future Improvements

1. Implement Phase 4 UI components
2. Add prompt template versioning UI
3. Add A/B testing capability
4. Add exercise quality metrics dashboard
5. Add provider performance analytics
6. Add manual LaTeX editor for corrections

## Testing

### Unit Tests (Recommended)

- PromptTemplateService tests
- ExerciseGenerationService tests (AI Service)
- MultiProviderService tests
- LaTeX validator/converter tests

### Integration Tests (Recommended)

- End-to-end: Admin → Core → AI → LLM Provider
- Fallback logic testing
- Cache hit/miss scenarios
- Error handling scenarios

### Manual Testing Checklist

- [ ] Generate 1 exercise → Verify PENDING status
- [ ] Generate 10 exercises → Verify all saved
- [ ] Test fallback (disable Gemini → should use HuggingFace)
- [ ] Test LaTeX validation (valid/invalid/missing)
- [ ] Test cache (generate same skill+difficulty twice → second should be faster)
- [ ] Test prompt template management (create, edit, activate, deactivate)

## API Reference

### Core Service APIs

**POST /api/v1/admin/exercises/generate**
```json
{
  "skillId": "uuid",
  "grade": 6,
  "difficultyLevel": 3,
  "count": 10,
  "promptTemplateId": "uuid (optional)"
}
```

**Response:**
```json
{
  "errorCode": "0000",
  "errorDetail": "Sinh bài tập thành công",
  "data": {
    "content": [...],
    "totalElements": 10,
    "totalPages": 1
  }
}
```

### AI Service APIs

**POST /internal/ai/generate-exercises**
```json
{
  "skill_id": "uuid",
  "grade": 6,
  "difficulty_level": 3,
  "count": 10,
  "prompt_template_id": "uuid (optional)"
}
```

**Response:**
```json
{
  "exercises": [...],
  "provider_used": "gemini",
  "confidence": 0.85,
  "total_generated": 10,
  "total_valid": 10
}
```

## Dependencies

### Python (AI Service)
- `huggingface-hub` - HuggingFace API client
- `google-generativeai` - Gemini API client
- `sympy` - LaTeX conversion
- `redis` - Caching

### Java (Core Service)
- Spring WebFlux (WebClient)
- Spring Data JPA
- Flyway (migrations)

### TypeScript (Admin Dashboard)
- React Query (data fetching)
- React Hook Form (forms)

---

**Last Updated:** 2025-01-20  
**Version:** 1.0.0



================================================================================
# End of: 03-for-product-owners/user-stories/admin/exercise-management/ai-generate-implementation.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/question-management/README.md
================================================================================

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



================================================================================
# End of: 03-for-product-owners/user-stories/admin/question-management/README.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/question-management/concepts.md
================================================================================

# Định nghĩa và Khái niệm
[← Quay lại Overview](README.md)

## Exercise (Bài tập)

**Định nghĩa**: Template bài tập được admin tạo và review.

**Đặc điểm**:
- Entity trong database, có CRUD và review workflow
- Liên kết với Skill qua `skill_id` (bắt buộc)
- Có review status: `PENDING`, `APPROVED`, `REJECTED`, `NEEDS_REVISION`
- Chỉ bài tập `APPROVED` mới được sử dụng để sinh Questions
- Các trường: `problem_text`, `solution_steps`, `difficulty_level`, `final_answer`, `common_mistakes`, `hints`

**Vai trò**: Template/Blueprint cho Questions

## Question (Câu hỏi)

**Định nghĩa**: Practice item instance được sinh từ Exercise khi assign cho học sinh. Question là snapshot của Exercise tại thời điểm assign.

**Đặc điểm**:
- Entity riêng trong database
- Được sinh từ Exercise (snapshot Exercise data tại thời điểm assign)
- Có thể customize (thay số liệu) nhưng giữ nguyên logic
- Liên kết với Exercise qua `exercise_id`
- Liên kết với Skill qua `skill_id`
- Liên kết với Student qua `assigned_to_student_id`
- Có status: `DRAFT`, `ASSIGNED`, `SUBMITTED`, `RESUBMITTED`, `SKIPPED`
- **KHÔNG** lưu student response data (đã chuyển sang Practice)
- **KHÔNG** có sessionId (được quản lý qua Practice records)

**Vai trò**: Bài tập thực tế được assign cho học sinh, chứa nội dung câu hỏi (snapshot của Exercise). Response data và session info được lưu trong Practice records.

## Practice (Luyện tập)

**Định nghĩa**: Result record lưu kết quả làm bài của học sinh cho một Question cụ thể.

**Đặc điểm**:
- Entity trong database
- **Bắt buộc**: `question_id` (non-nullable) để link với Question
- **Practice Status**: `NOT_STARTED`, `SUBMITTED`, `CANCELLED`
  - `NOT_STARTED`: Được tạo khi generate questions cho session (Option E), chưa submit
  - `SUBMITTED`: Đã submit answer
  - `CANCELLED`: Bị cancel khi session bị cancel
- Lưu student response: `student_answer`, `is_correct`, `duration_sec`, `submitted_at`
- Liên kết với session qua `session_id` + `session_type` (polymorphic relationship)
- Session types: `PRACTICE`, `PRACTICE_SESSION`, `MINI_TEST`, `TEST_30MIN`, etc.
- Liên kết với Student/Trial qua `student_id`/`trial_id`
- Một Question có thể có nhiều Practice records (re-attempt logic)

**Option E Implementation**:
- Khi generate questions cho PracticeSession/MiniTest, Practice records được tạo ngay với `status = NOT_STARTED`
- Đảm bảo questions được link với session ngay từ đầu
- Khi submit answer, Practice record được update (NOT_STARTED → SUBMITTED) thay vì tạo mới
- Query questions trong session: Luôn query qua Practice records (không cần fallback)

**Vai trò**: Record kết quả làm bài, lưu student response và session info. Bridge giữa Question (content) và Session (container).

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/question-management/concepts.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/question-management/workflow.md
================================================================================

# Workflow chi tiết
[← Quay lại Overview](README.md)

## Workflow: Exercise → Question → Practice → Session

```
Exercise APPROVED
  → Generate/Assign
    → Question ASSIGNED
      → (For Sessions) Practice Record created immediately (status = NOT_STARTED)
      → Student submits answer
        → Practice Record updated (status = SUBMITTED) hoặc tạo mới (standalone)
          → Update Question SUBMITTED (lần đầu) hoặc RESUBMITTED (re-attempt)
          → Update Mastery
```

**Lưu ý**: 
- Question chỉ lưu nội dung (snapshot Exercise), không lưu response data
- Practice lưu student response (student_answer, is_correct, duration_sec, submitted_at)
- Practice link với session qua session_id + session_type (polymorphic)
- **Option E**: Khi generate questions cho PracticeSession/MiniTest, Practice records được tạo ngay với `status = NOT_STARTED` để link questions với session
- Khi submit answer, Practice record được update (NOT_STARTED → SUBMITTED) thay vì tạo mới
- Một Question có thể có nhiều Practice records (re-attempt)

## Chi tiết từng bước

### Bước 1: Admin tạo Exercise → liên kết với Skill
- Admin tạo Exercise trong Admin Dashboard
- Gán `skill_id` (bắt buộc)
- Exercise có status: `PENDING`

### Bước 2: Exercise được review → APPROVED
- Admin/Expert review Exercise
- Nếu approve: `review_status = 'APPROVED'`, `quality_score >= 0.7`
- Exercise APPROVED mới được sử dụng để sinh Questions

### Bước 3: Adaptive Learning Engine query Exercises theo Skill
- Engine query Exercises có:
  - `skill_id` = skill cần luyện
  - `review_status = 'APPROVED'`
  - `difficulty_level` phù hợp với mastery của học sinh

### Bước 4: Exercise được assign cho học sinh → trở thành Question
- Engine gọi `POST /api/internal/learning/generate-questions`
- Service sinh Question từ Exercise:
  - Snapshot Exercise data (problem_text, solution_steps, etc.)
  - Customize nếu cần (thay số liệu - Phase 1: basic)
  - Set `assigned_to_student_id`, `status = 'ASSIGNED'`
- Question được trả về cho client (Student App)

### Bước 5a: Generate Questions cho Session → Practice records được tạo ngay (Option E)
- Khi tạo PracticeSession/MiniTest và generate questions:
  - Questions được generate từ Exercises APPROVED
  - **Practice records được tạo ngay** với:
    - `question_id` = Question.id (required)
    - `session_id` + `session_type` = Session info
    - `status = NOT_STARTED` (chưa submit)
    - `student_answer = null`, `is_correct = false`, `submitted_at = null`
  - Điều này đảm bảo questions được link với session ngay từ đầu
  - Query questions trong session: Luôn query qua Practice records (không cần fallback)

### Bước 5b: Học sinh làm Question → Practice record được update hoặc tạo mới
- Học sinh submit answer qua `POST /api/v1/practice/questions/{id}/submit` (với sessionId, sessionType)
- Service kiểm tra:
  - Nếu Practice record đã tồn tại với `status = NOT_STARTED` (từ Option E):
    - **Update** Practice record: `status = SUBMITTED`, `student_answer`, `is_correct`, `submitted_at`
  - Nếu không có Practice record (standalone practice):
    - **Tạo mới** Practice record với `status = SUBMITTED`
- Update Question status:
  - `ASSIGNED` → `SUBMITTED`: Nếu là Practice record đầu tiên cho Question
  - `SUBMITTED` → `RESUBMITTED`: Nếu đã có Practice records trước đó
- Transaction: Question update + Practice update/create + Mastery update (tất cả trong cùng transaction)

### Bước 6: Mastery của Skill được cập nhật
- PracticeService cập nhật Skill Mastery dựa trên kết quả
- Logic: Đúng +5~+8, Sai -5~-10 (theo Adaptive Learning Logic)

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/question-management/workflow.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/question-management/database-schema.md
================================================================================

# Database Schema
[← Quay lại Overview](README.md)

## Question Table

```sql
CREATE TABLE question (
  id UUID PRIMARY KEY,
  
  -- Liên kết với Exercise (template)
  exercise_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  
  -- Snapshot Exercise data tại thời điểm assign
  problem_text TEXT NOT NULL,
  problem_latex TEXT,
  problem_image_url TEXT,
  solution_steps JSONB NOT NULL,
  final_answer TEXT,
  common_mistakes JSONB,
  hints JSONB,
  difficulty_level INT,
  
  -- Customization (nếu có)
  customized_data JSONB,
  
  -- Assignment info
  assigned_to_student_id UUID,
  assigned_at TIMESTAMP,
  
  -- Metadata
  question_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'ASSIGNED', -- DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED
  
  -- Note: Student response data (student_answer, is_correct, time_taken_sec, submitted_at) 
  --       đã được chuyển sang Practice table
  -- Note: session_id đã được chuyển sang Practice table (session_id + session_type)
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_question_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE RESTRICT,
  CONSTRAINT fk_question_skill FOREIGN KEY (skill_id) REFERENCES skill(id) ON DELETE RESTRICT,
  CONSTRAINT fk_question_student FOREIGN KEY (assigned_to_student_id) REFERENCES student_profile(id) ON DELETE SET NULL
);
```

## Practice Table Update

Practice table đã được refactor để lưu student response và session info:

```sql
-- question_id: Bắt buộc (non-nullable)
ALTER TABLE practice 
ALTER COLUMN question_id SET NOT NULL;

-- session_id + session_type: Polymorphic relationship với các session types
-- session_id UUID
-- session_type VARCHAR(50) -- PRACTICE, PRACTICE_SESSION, MINI_TEST, etc.

-- Practice Status (Option E Implementation)
-- status VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED'
-- Values: NOT_STARTED, SUBMITTED, CANCELLED
ALTER TABLE practice 
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED';

-- Update existing records: Set status = 'SUBMITTED' where submitted_at IS NOT NULL
UPDATE practice 
SET status = 'SUBMITTED' 
WHERE submitted_at IS NOT NULL;

-- Student response data (đã chuyển từ Question table)
-- student_answer TEXT
-- is_correct BOOLEAN
-- duration_sec INT
-- submitted_at TIMESTAMP

-- Constraints
ALTER TABLE practice
ADD CONSTRAINT check_practice_question_id CHECK (question_id IS NOT NULL);

ALTER TABLE practice
ADD CONSTRAINT check_practice_session_type 
CHECK (session_type IN (
  'PRACTICE', 'PRACTICE_SESSION', 'MINI_TEST',
  'TEST_30MIN', 'TEST_45MIN', 'TEST_60MIN', 'TEST_90MIN', 'TEST_120MIN', 'TEST_180MIN',
  'MIDTERM_EXAM', 'FINAL_EXAM'
));

ALTER TABLE practice
ADD CONSTRAINT check_practice_status 
CHECK (status IN ('NOT_STARTED', 'SUBMITTED', 'CANCELLED'));

-- Indexes
CREATE INDEX idx_practice_question_id ON practice(question_id);
CREATE INDEX idx_practice_session_id_type ON practice(session_id, session_type);
CREATE INDEX idx_practice_status ON practice(status);
CREATE INDEX idx_practice_session_status ON practice(session_id, session_type, status);
```

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/question-management/database-schema.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/question-management/business-rules.md
================================================================================

# Business Rules và Validation
[← Quay lại Overview](README.md)

## Question Generation Rules

1. **Chỉ sinh Questions từ Exercises APPROVED**
   - Validation: `exercise.review_status = 'APPROVED'`
   - Error: `EXERCISE_NOT_APPROVED` nếu Exercise chưa approved

2. **Snapshot Exercise data tại thời điểm assign**
   - Question lưu snapshot đầy đủ: problem_text, solution_steps, final_answer, etc.
   - Đảm bảo Question không bị ảnh hưởng khi Exercise thay đổi sau đó

3. **Customization (Phase 1: Basic)**
   - Có thể thay số liệu trong problem_text (ví dụ: 12/18 → 24/36)
   - Giữ nguyên logic và solution steps
   - Lưu customized data trong `question.customized_data` (JSON)

4. **Validation trước khi assign**
   - Kiểm tra prerequisite skills (nếu Exercise có `prerequisite_skill_ids`)
   - Kiểm tra student mastery của prerequisite skills (phải >= 70)
   - Error: `PREREQUISITE_NOT_MET` nếu chưa đạt

## Question Assignment Rules

1. **Một Question chỉ assign cho một học sinh**
   - `assigned_to_student_id` là required khi assign
   - Status: `ASSIGNED` khi được assign

2. **Question status transitions**
   - `DRAFT` → `ASSIGNED`: Khi Question được assign cho học sinh
   - `ASSIGNED` → `SUBMITTED`: Khi học sinh submit answer lần đầu (tạo Practice record đầu tiên)
   - `SUBMITTED` → `RESUBMITTED`: Khi học sinh submit lại (tạo Practice record mới)
   - `ASSIGNED` → `SKIPPED`: Khi học sinh skip (Phase 2)
   - Không cho phép: `SUBMITTED` → `ASSIGNED` (trừ khi admin reset - Phase 2)

3. **Validation khi submit**
   - Question phải có status `ASSIGNED`
   - `assigned_to_student_id` phải match với student hiện tại
   - Error: `QUESTION_NOT_ASSIGNED`, `QUESTION_ALREADY_COMPLETED`, `QUESTION_STUDENT_MISMATCH`

## Practice Link Rules

1. **Practice.question_id là bắt buộc (required)**
   - Tất cả Practice records phải có `question_id` (non-nullable)
   - Validation: Return error nếu `question_id` null khi submit practice

2. **Practice Status (Option E Implementation)**
   - `NOT_STARTED`: Practice record được tạo khi generate questions cho session (chưa submit)
   - `SUBMITTED`: Practice record đã được submit với answer
   - `CANCELLED`: Practice record bị cancel khi session bị cancel
   - Status transitions:
     - `NOT_STARTED` → `SUBMITTED`: Khi học sinh submit answer
     - `NOT_STARTED` → `CANCELLED`: Khi session bị cancel
     - Không cho phép: `SUBMITTED` → `NOT_STARTED` hoặc `CANCELLED`

3. **Practice Record Creation (Option E)**
   - **Khi generate questions cho PracticeSession/MiniTest:**
     - Practice records được tạo ngay với `status = NOT_STARTED`
     - Đảm bảo questions được link với session ngay từ đầu
     - Query questions trong session: Luôn query qua Practice records (không cần fallback)
   - **Khi submit answer:**
     - Nếu Practice record đã tồn tại với `status = NOT_STARTED`: **Update** thay vì tạo mới
     - Nếu không có Practice record (standalone): **Tạo mới** với `status = SUBMITTED`

4. **Khi submit Question answer**
   - Kiểm tra Practice record đã tồn tại (Option E):
     - Nếu có với `status = NOT_STARTED`: Update → `status = SUBMITTED`
     - Nếu không: Tạo mới với `status = SUBMITTED`
   - Practice record chứa:
     - `question_id` = Question.id (required)
     - `session_id` + `session_type` (nếu có session)
     - `student_answer`, `is_correct`, `duration_sec`, `submitted_at`
   - Update Question status:
     - `ASSIGNED` → `SUBMITTED`: Nếu là Practice record đầu tiên cho Question
     - `SUBMITTED` → `RESUBMITTED`: Nếu đã có Practice records trước đó
   - Transaction: Question update + Practice update/create + Mastery update (tất cả trong cùng transaction)

5. **Re-attempt logic**
   - Một Question có thể có nhiều Practice records
   - Mỗi Practice record đại diện cho một lần attempt
   - Latest Practice record được dùng để tính điểm trong session

6. **Session linking**
   - Practice link với session qua `session_id` + `session_type`
   - Session types: `PRACTICE`, `PRACTICE_SESSION`, `MINI_TEST`, `TEST_30MIN`, etc.
   - Query Questions trong session: **Luôn query qua Practice records** (không cần fallback logic)
   - Session cancellation: Mark tất cả Practice records với `status = CANCELLED`

## Data Consistency Rules

1. **Question snapshot data**
   - Question lưu snapshot Exercise data tại thời điểm assign
   - Không tự động sync khi Exercise thay đổi
   - Nếu cần update: Tạo Question mới từ Exercise mới

2. **Question → Practice link**
   - Practice.question_id phải reference đến Question tồn tại (required, non-nullable)
   - Foreign key constraint: `ON DELETE RESTRICT` (không cho phép xóa Question nếu có Practices)
   - Index trên `practice.question_id` cho performance
   - Index trên `(session_id, session_type)` cho query Questions trong session

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/question-management/business-rules.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/question-management/api-endpoints.md
================================================================================

# API Endpoints
[← Quay lại Overview](README.md)

## Admin APIs

```
GET    /api/admin/questions                    - List Questions (filter, search, pagination)
GET    /api/admin/questions/:id                - Get Question detail (kèm Practices)
GET    /api/admin/exercises/:id/questions      - Get Questions generated from Exercise
GET    /api/admin/skills/:id/questions         - Get Questions by Skill
GET    /api/admin/questions/:id/practices       - Get Practices của Question
```

## Student/Practice APIs

```
GET    /api/practice/questions                 - Get assigned Questions for practice
GET    /api/practice/questions/:id             - Get Question detail (student view)
POST   /api/practice/questions/:id/submit      - Submit answer (tạo Practice với question_id)
```

## Internal APIs

```
POST   /api/internal/learning/generate-questions - Generate Questions from Exercises (cho Adaptive Learning Engine)
```

## Practice API Update

```
POST   /api/v1/practice/questions/{id}/submit  - Submit practice answer (recommended, questionId in path)
POST   /api/v1/practice/submit                - Submit practice (DEPRECATED - use questions/{id}/submit instead)
POST   /api/v1/learning/generate-questions     - Generate questions from learning plan
```

## Practice Session API

```
POST   /api/v1/practice/sessions               - Create practice session (generates questions and Practice records)
GET    /api/v1/practice/sessions/{sessionId}   - Get practice session (session details)
GET    /api/v1/practice/session-info/{sessionId} - Get session information (progress, mastery, timestamps)
GET    /api/v1/practice/sessions/{sessionId}/questions - Get questions in session (via Practice records)
PUT    /api/v1/practice/sessions/{sessionId}/pause    - Pause session
PUT    /api/v1/practice/sessions/{sessionId}/resume  - Resume session
PUT    /api/v1/practice/sessions/{sessionId}/complete - Complete session
DELETE /api/v1/practice/sessions/{sessionId}  - Cancel session (marks Practice records as CANCELLED)
GET    /api/v1/practice/sessions/resumable    - Get resumable sessions
```

## Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `QUESTION_NOT_FOUND` | 404 | Question không tồn tại |
| `QUESTION_NOT_ASSIGNED` | 400 | Question chưa được assign |
| `QUESTION_ALREADY_COMPLETED` | 400 | Question đã được submit |
| `QUESTION_STUDENT_MISMATCH` | 403 | Question không thuộc về student này |
| `EXERCISE_NOT_APPROVED` | 400 | Exercise chưa được approve, không thể sinh Questions |
| `PREREQUISITE_NOT_MET` | 403 | Prerequisite skills chưa đạt mastery threshold |

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/question-management/api-endpoints.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/question-management/integration-points.md
================================================================================

# Integration Points
[← Quay lại Overview](README.md)

## Integration với Exercise Management

- **Query Exercises**: Question generation service query Exercises APPROVED
- **Exercise Stats**: Exercise có thể query Questions đã được sinh từ nó
- **Exercise Detail Page**: Hiển thị "Generated Questions" tab

## Integration với Adaptive Learning Engine

- **Generate Questions**: Engine gọi `POST /api/internal/learning/generate-questions`
- **Input**: skillId, studentId, difficultyLevel, count
- **Output**: List of Questions (với questionIds)
- **Usage**: Engine assign Questions cho học sinh trong practice session

## Integration với Practice Flow

- **Practice Submit**: `POST /api/practice/submit` nhận `questionId` (required), `sessionId` + `sessionType` (optional)
- **Question Submit**: `POST /api/practice/questions/:id/submit` tạo Practice với question_id, sessionId, sessionType
- **Practice History**: Hiển thị Question info từ question_id
- **Session Info**: Query Questions trong session qua Practice records (session_id + session_type)

## Integration với Skill Management

- **Related Questions**: Skills page hiển thị Questions có skill_id = skill hiện tại
- **Filter**: Chỉ hiển thị Questions từ Exercises APPROVED
- **Statistics**: Practice count, success rate per Question

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/question-management/integration-points.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/admin/question-management/relationships.md
================================================================================

# Mối quan hệ giữa các Entities
[← Quay lại Overview](README.md)

## ERD Relationships

```
Exercise (1) ──< (N) Question
  │                │
  │                │ (snapshot data)
  │                │
  └────────────────┘

Skill (1) ──< (N) Question
  │                │
  │                │
  └────────────────┘

Question (1) ──< (N) Practice
  │                │
  │                │ (via question_id)
  │                │
  └────────────────┘
```

## Quan hệ chi tiết

| Relationship | Type | Cardinality | Foreign Key | Notes |
|-------------|------|------------|-------------|-------|
| Exercise → Question | One-to-Many | 1:N | `question.exercise_id` | Một Exercise có thể sinh nhiều Questions |
| Skill → Question | One-to-Many | 1:N | `question.skill_id` | Một Skill có nhiều Questions |
| Question → Practice | One-to-Many | 1:N | `practice.question_id` | Một Question có thể có nhiều Practices (re-attempt logic) |
| Student → Question | One-to-Many | 1:N | `question.assigned_to_student_id` | Một học sinh có nhiều Questions |
| Practice → Session | Many-to-One (Polymorphic) | N:1 | `practice.session_id` + `practice.session_type` | Practice link với session qua session_id + session_type (PRACTICE_SESSION, MINI_TEST, etc.) |

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/admin/question-management/relationships.md
================================================================================
