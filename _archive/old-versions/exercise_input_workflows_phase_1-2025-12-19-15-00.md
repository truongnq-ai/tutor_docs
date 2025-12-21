# Exercise Input Workflows – Phase 1

**Project:** Tutor  
**Document type:** Technical Design / User Story  
**Audience:** Developer / Product / Backend / Frontend  
**Status:** Draft  
**Version:** 2025-12-19-15-00  
**Author:** System Architect

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả chi tiết **các workflow nhập bài tập** cho hệ thống Exercise Management, bao gồm:

- 6 cách nhập bài tập khác nhau
- Workflow chi tiết cho từng cách nhập
- API specifications
- Database schema cho draft management
- Implementation plan
- Dependencies và resources cần thiết

Mục tiêu: Chuẩn hóa quy trình nhập bài tập, đảm bảo chất lượng và hiệu quả trong việc số hóa nội dung giáo dục.

---

## 2. TỔNG QUAN CÁC CÁCH NHẬP BÀI TẬP

### 2.1. Danh sách Các Cách Nhập

| # | Cách Nhập | Mô tả | Use Case | Complexity |
|---|-----------|-------|----------|------------|
| 1 | **Manual Form** | Nhập thủ công qua form | Nhập từng bài, có thời gian chỉnh sửa | ⭐ Low |
| 2 | **CSV Import** | Import từ file CSV | Nhập hàng loạt từ Excel | ⭐⭐ Medium |
| 3 | **JSON Import** | Import từ file JSON | Import từ hệ thống khác | ⭐⭐ Medium |
| 4 | **AI Generate** | Tạo bài tập từ AI | Tạo bài tập mới tự động | ⭐⭐⭐ High |
| 5 | **Image Upload** | Upload ảnh và OCR | Scan từ sách, đề thi | ⭐⭐⭐ High |
| 6 | **DOCX Upload** | Upload file Word và parse | Import từ Word document | ⭐⭐⭐⭐ Very High |

### 2.2. So Sánh Các Cách Nhập

| Cách nhập | Upload | Xử lý | Preview/Edit | Submit | Batch Support |
|-----------|--------|-------|--------------|--------|---------------|
| **Manual Form** | ❌ | ❌ | ✅ (Form) | ✅ | ❌ |
| **CSV Import** | ✅ | ✅ (Parse) | ✅ (Table) | ✅ (Batch) | ✅ |
| **JSON Import** | ✅ | ✅ (Parse) | ✅ (Table) | ✅ (Batch) | ✅ |
| **AI Generate** | ❌ | ✅ (AI) | ✅ (Form) | ✅ | ❌ |
| **Image Upload** | ✅ | ✅ (OCR) | ✅ (Form) | ✅ | ❌ |
| **DOCX Upload** | ✅ | ✅ (Parse) | ✅ (Bulk Edit) | ✅ (Batch) | ✅ |

---

## 3. WORKFLOW CHI TIẾT

### 3.1. Manual Form Input

#### Workflow

```
┌─────────────────────────────────────┐
│ Admin mở form tạo bài tập mới       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Điền thông tin bài tập:             │
│ - Skill, Grade, Chapter             │
│ - Problem Text (Tiptap editor)      │
│ - Problem LaTeX (KaTeX editor)      │
│ - Solution Steps                    │
│ - Common Mistakes                    │
│ - Hints, Metadata                    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Validate form data                  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Save as Draft / Submit for Review  │
└─────────────────────────────────────┘
```

#### API Endpoint

**POST /api/admin/exercises**

Request:
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
  "status": "draft"  // hoặc "pending"
}
```

---

### 3.2. CSV Import

#### Workflow

```
┌─────────────────────────────────────┐
│ Upload CSV file                     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Parse CSV → Validate format         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Map skill_code → skill_id           │
│ Validate data                       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Preview table với parsed data       │
│ - Highlight validation errors       │
│ - Edit individual rows              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Confirm & Batch Insert               │
│ Return import report                 │
└─────────────────────────────────────┘
```

#### API Endpoints

**POST /api/admin/exercises/import/csv**

Request (multipart/form-data):
```
file: <csv file>
autoValidate: true
```

Response:
```json
{
  "success": true,
  "data": {
    "importId": "uuid",
    "totalRows": 100,
    "validRows": 95,
    "invalidRows": 5,
    "preview": [
      {
        "row": 1,
        "data": {...},
        "status": "valid"
      },
      {
        "row": 5,
        "data": {...},
        "status": "invalid",
        "errors": ["Invalid skill_code: 6.99.99"]
      }
    ]
  }
}
```

**POST /api/admin/exercises/import/:importId/submit**

Request:
```json
{
  "selectedRows": [1, 2, 3, ...],  // Optional: chỉ import selected rows
  "skipInvalid": true
}
```

Response:
```json
{
  "success": true,
  "data": {
    "importReport": {
      "total": 95,
      "success": 93,
      "failed": 2,
      "successIds": ["uuid1", "uuid2", ...],
      "failed": [
        {
          "row": 10,
          "error": "Duplicate exercise"
        }
      ]
    }
  }
}
```

---

### 3.3. JSON Import

#### Workflow

Tương tự CSV Import, nhưng:
- Parse JSON thay vì CSV
- JSON có thể có nested structure phức tạp hơn
- Có thể import từ API của hệ thống khác

#### API Endpoints

**POST /api/admin/exercises/import/json**

Request (multipart/form-data hoặc JSON body):
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

Response: Tương tự CSV import

---

### 3.4. AI Generate

#### Workflow

```
┌─────────────────────────────────────┐
│ Input: skillId, difficulty, grade   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Call AI Service: Generate Exercise │
│ - Lấy seed data từ database         │
│ - Generate bài tập mới              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Preview generated exercise         │
│ - Problem text                     │
│ - Solution steps                   │
│ - Confidence score                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ Edit nếu cần → Submit for Review    │
└─────────────────────────────────────┘
```

#### API Endpoints

**POST /api/admin/exercises/generate**

Request:
```json
{
  "skillId": "uuid",
  "grade": 6,
  "difficultyLevel": 2,
  "count": 1  // Số lượng bài tập muốn generate
}
```

Response:
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

---

### 3.5. Image Upload (OCR Workflow)

#### Workflow Chi Tiết

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Upload Image                                       │
│ Admin Dashboard → Core Service → Cloudinary                 │
│ - Upload ảnh bài tập (JPEG/PNG, max 5MB)                   │
│ - Validate (size, format)                                  │
│ - Upload to Cloudinary (category: exercise-import)         │
│ - Return imageUrl                                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Process Image (OCR)                                │
│ Admin Dashboard → Core Service → AI Service                │
│ - Gửi imageUrl đến AI Service                               │
│ - AI Service: OCR extraction (PaddleOCR)                   │
│ - Extract: problem_text, latex, confidence                 │
│ - Return OCR result                                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Preview & Edit (Draft Mode)                        │
│ Admin Dashboard:                                            │
│ - Hiển thị preview kết quả OCR                             │
│ - Form edit với các fields:                                 │
│   • Problem Text (editable, từ OCR)                        │
│   • Problem LaTeX (editable, từ OCR)                      │
│   • Problem Image (preview từ Cloudinary)                  │
│   • Skill selector (required)                               │
│   • Grade selector (required)                               │
│   • Chapter (optional)                                      │
│   • Problem Type (optional)                                │
│   • Difficulty level (1-5)                                  │
│   • Solution steps (có thể generate từ AI hoặc nhập thủ công)│
│   • Final Answer                                            │
│   • Common Mistakes                                         │
│   • Learning Objective                                      │
│   • Hints                                                   │
│   • Tags                                                    │
│ - Confidence indicator:                                     │
│   • Green (≥0.9): High confidence                          │
│   • Yellow (0.7-0.9): Medium confidence                    │
│   • Red (<0.7): Low confidence, cần review kỹ             │
│ - Warning nếu confidence < 0.8                              │
│ - Save as Draft / Submit for Review                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Submit Exercise                                    │
│ Admin Dashboard → Core Service                             │
│ - Gửi exercise data (JSON format)                           │
│ - Core Service: Validate & Save                            │
│ - Link imageUrl với exercise                                │
│ - Return: Exercise ID                                       │
└─────────────────────────────────────────────────────────────┘
```

#### API Endpoints

**POST /api/admin/exercises/upload-and-process-image**

Request (multipart/form-data):
```
file: <image file>
autoProcess: true  // Nếu true, tự động gọi OCR sau khi upload
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://res.cloudinary.com/.../image.jpg",
    "publicId": "exercise-import/{timestamp}-{uuid}",
    "ocrResult": {
      "problemText": "Rút gọn phân số: 12/18",
      "latex": "\\frac{12}{18}",
      "confidence": 0.95,
      "rawOcrOutput": {
        "text": "...",
        "boxes": [...]
      }
    },
    "draftExerciseId": "uuid",  // Auto-created draft
    "status": "draft"
  }
}
```

**PUT /api/admin/exercises/:draftId/preview**

Request:
```json
{
  "problemText": "Rút gọn phân số: 12/18",
  "problemLatex": "\\frac{12}{18}",
  "skillId": "uuid",
  "grade": 6,
  "chapter": "Phân số",
  "problemType": "rút_gọn_phân_số",
  "difficultyLevel": 1,
  "solutionSteps": [
    {
      "stepNumber": 1,
      "description": "Tìm ƯCLN",
      "content": "ƯCLN(12, 18) = 6",
      "explanation": "..."
    }
  ],
  "finalAnswer": "2/3",
  "commonMistakes": [...],
  "learningObjective": "...",
  "timeEstimateSec": 120,
  "hints": [...],
  "tags": ["phân_số", "rút_gọn"]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "draftExerciseId": "uuid",
    "status": "draft",
    "preview": {
      // Full exercise data với validation
    },
    "validation": {
      "isValid": true,
      "errors": [],
      "warnings": ["Missing prerequisite_skill_ids"]
    }
  }
}
```

**POST /api/admin/exercises/:draftId/submit**

Request:
```json
{
  "status": "pending"  // hoặc "draft" để lưu tiếp
}
```

Response:
```json
{
  "success": true,
  "data": {
    "exerciseId": "uuid",
    "status": "pending",
    "message": "Exercise submitted for review"
  }
}
```

---

### 3.6. DOCX Upload (Parse Workflow)

#### Workflow Chi Tiết

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Upload DOCX File                                  │
│ Admin Dashboard → Core Service → Temporary Storage        │
│ - Upload file DOCX (max 10MB)                             │
│ - Validate (size, format)                                  │
│ - Store temporarily (hoặc Cloudinary)                      │
│ - Return fileId                                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Parse DOCX                                         │
│ Core Service → DOCX Parser (Apache POI)                    │
│ - Parse DOCX structure:                                    │
│   • Extract paragraphs (text content)                      │
│   • Extract images (nếu có) → Upload to Cloudinary         │
│   • Detect exercise structure:                             │
│     - Numbered lists (1., 2., 3.)                          │
│     - Bullet points                                         │
│     - Tables                                                │
│     - Headings (Problem, Solution, etc.)                   │
│   • Parse formatting (bold, italic, LaTeX)                 │
│   • Extract solution steps (nếu có structure)              │
│ - Return: Parsed exercises array                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Preview & Edit (Bulk Edit Mode)                    │
│ Admin Dashboard:                                            │
│ - Hiển thị danh sách exercises đã parse (table view)      │
│ - Mỗi exercise có form edit inline:                       │
│   • Problem Text (editable, từ DOCX)                       │
│   • Problem Image (nếu có trong DOCX, preview)            │
│   • Skill selector (required, có thể bulk apply)          │
│   • Grade selector (required, có thể bulk apply)           │
│   • Chapter (optional)                                      │
│   • Problem Type (optional)                                │
│   • Difficulty level (1-5)                                  │
│   • Solution Steps (editable, từ DOCX hoặc nhập thủ công)   │
│   • Final Answer                                            │
│   • Common Mistakes                                         │
│   • Learning Objective                                      │
│   • Hints                                                   │
│   • Tags                                                    │
│ - Bulk actions:                                             │
│   • Select All / Deselect All                              │
│   • Apply skill to selected                                │
│   • Apply grade to selected                                │
│   • Apply chapter to selected                              │
│   • Delete selected exercises                              │
│ - Validation indicators:                                    │
│   • Green: Valid                                            │
│   • Red: Invalid (highlight errors)                        │
│   • Yellow: Warnings (missing optional fields)            │
│ - Summary:                                                  │
│   • Total exercises: 10                                    │
│   • Valid: 8                                                │
│   • Invalid: 2                                             │
│ - Save as Draft / Submit for Review (all or selected)      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Submit Exercises (Batch)                           │
│ Admin Dashboard → Core Service                             │
│ - Gửi exercises array (JSON format)                         │
│ - Core Service: Validate & Batch Insert (transaction)     │
│ - Return: Import report (success/failed)                    │
└─────────────────────────────────────────────────────────────┘
```

#### API Endpoints

**POST /api/admin/exercises/upload-and-parse-docx**

Request (multipart/form-data):
```
file: <docx file>
autoParse: true
```

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "fileId": "uuid",
    "fileName": "exercises.docx",
    "parsedExercises": [
      {
        "index": 1,
        "problemText": "Rút gọn phân số: 12/18",
        "problemLatex": "\\frac{12}{18}",
        "problemImageUrl": "https://...",  // Nếu có ảnh trong DOCX
        "solutionSteps": [
          {
            "stepNumber": 1,
            "description": "Tìm ƯCLN",
            "content": "ƯCLN(12, 18) = 6"
          }
        ],
        "confidence": 0.85,  // Confidence của parsing
        "warnings": ["Missing skill_id", "Missing difficulty_level"],
        "status": "draft"
      },
      // ... more exercises
    ],
    "totalExercises": 10,
    "validExercises": 8,
    "invalidExercises": 2,
    "draftBatchId": "uuid"  // Auto-created draft batch
  }
}
```

**PUT /api/admin/exercises/:draftBatchId/preview**

Request:
```json
{
  "exercises": [
    {
      "index": 1,
      "problemText": "Rút gọn phân số: 12/18",
      "problemLatex": "\\frac{12}{18}",
      "skillId": "uuid",
      "grade": 6,
      "difficultyLevel": 1,
      "solutionSteps": [...],
      // ... other fields
    },
    // ... more exercises
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "draftBatchId": "uuid",
    "exercises": [...],
    "validation": {
      "valid": 8,
      "invalid": 2,
      "errors": [
        {
          "index": 3,
          "errors": ["Invalid skill_id"]
        },
        {
          "index": 7,
          "errors": ["Missing problem_text"]
        }
      ]
    }
  }
}
```

**POST /api/admin/exercises/:draftBatchId/submit**

Request:
```json
{
  "exerciseIndexes": [1, 2, 3, 5, 7],  // Optional: chỉ submit selected exercises
  "skipInvalid": true  // Skip exercises có validation errors
}
```

Response:
```json
{
  "success": true,
  "data": {
    "importReport": {
      "total": 5,
      "success": 4,
      "failed": 1,
      "successIds": ["uuid1", "uuid2", "uuid3", "uuid4"],
      "failed": [
        {
          "index": 3,
          "error": "Invalid skill_id: skill not found"
        }
      ]
    }
  }
}
```

---

## 4. DATABASE SCHEMA

### 4.1. Bảng `exercise_draft`

Lưu trữ draft exercises từ các nguồn khác nhau (image, manual, AI).

```sql
CREATE TABLE exercise_draft (
  id UUID PRIMARY KEY,
  source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('manual', 'image', 'docx', 'csv', 'json', 'ai')),
  source_data JSON,  -- Original data (imageUrl, fileId, aiPrompt, etc.)
  exercise_data JSON NOT NULL,  -- Parsed/edited exercise data
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review')),
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,  -- Auto-delete sau 7 ngày nếu không submit
  
  CONSTRAINT check_expires_at CHECK (expires_at IS NULL OR expires_at > created_at)
);

CREATE INDEX idx_exercise_draft_status ON exercise_draft(status);
CREATE INDEX idx_exercise_draft_created_by ON exercise_draft(created_by);
CREATE INDEX idx_exercise_draft_expires_at ON exercise_draft(expires_at) WHERE expires_at IS NOT NULL;
```

### 4.2. Bảng `exercise_draft_batch`

Lưu trữ batch imports (DOCX, CSV, JSON).

```sql
CREATE TABLE exercise_draft_batch (
  id UUID PRIMARY KEY,
  source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('docx', 'csv', 'json')),
  source_file_id VARCHAR(255),  -- File ID hoặc URL
  source_file_name VARCHAR(255),
  total_exercises INT NOT NULL,
  valid_exercises INT DEFAULT 0,
  invalid_exercises INT DEFAULT 0,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,  -- Auto-delete sau 7 ngày nếu không submit
  
  CONSTRAINT check_expires_at CHECK (expires_at IS NULL OR expires_at > created_at)
);

CREATE INDEX idx_exercise_draft_batch_created_by ON exercise_draft_batch(created_by);
CREATE INDEX idx_exercise_draft_batch_expires_at ON exercise_draft_batch(expires_at) WHERE expires_at IS NOT NULL;
```

### 4.3. Bảng `exercise_draft_batch_item`

Lưu trữ từng exercise trong batch.

```sql
CREATE TABLE exercise_draft_batch_item (
  id UUID PRIMARY KEY,
  batch_id UUID NOT NULL,
  exercise_index INT NOT NULL,
  exercise_data JSON NOT NULL,
  validation_errors JSON,  -- Array of validation errors
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'valid', 'invalid')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_draft_batch FOREIGN KEY (batch_id) 
    REFERENCES exercise_draft_batch(id) ON DELETE CASCADE,
  CONSTRAINT unique_batch_index UNIQUE (batch_id, exercise_index)
);

CREATE INDEX idx_exercise_draft_batch_item_batch_id ON exercise_draft_batch_item(batch_id);
CREATE INDEX idx_exercise_draft_batch_item_status ON exercise_draft_batch_item(status);
```

### 4.4. Scheduled Cleanup

Tự động xóa draft sau khi hết hạn:

```sql
-- Scheduled job chạy hàng ngày
DELETE FROM exercise_draft 
WHERE expires_at IS NOT NULL 
  AND expires_at < CURRENT_TIMESTAMP;

DELETE FROM exercise_draft_batch 
WHERE expires_at IS NOT NULL 
  AND expires_at < CURRENT_TIMESTAMP;
```

---

## 5. API SPECIFICATIONS

### 5.1. Image Upload & OCR

#### POST /api/admin/exercises/upload-and-process-image

**Description:** Upload ảnh và tự động xử lý OCR.

**Request (multipart/form-data):**
```
file: <image file> (JPEG/PNG, max 5MB)
autoProcess: true (boolean, default: true)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://res.cloudinary.com/.../image.jpg",
    "publicId": "exercise-import/{timestamp}-{uuid}",
    "ocrResult": {
      "problemText": "Rút gọn phân số: 12/18",
      "latex": "\\frac{12}{18}",
      "confidence": 0.95,
      "rawOcrOutput": {
        "text": "...",
        "boxes": [...]
      }
    },
    "draftExerciseId": "uuid",
    "status": "draft"
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: File không hợp lệ (size, format)
- `413 PAYLOAD_TOO_LARGE`: File > 5MB
- `503 SERVICE_UNAVAILABLE`: OCR service không available
- `500 INTERNAL_ERROR`: Upload hoặc OCR failed

---

#### PUT /api/admin/exercises/:draftId/preview

**Description:** Cập nhật draft exercise và validate.

**Request:**
```json
{
  "problemText": "Rút gọn phân số: 12/18",
  "problemLatex": "\\frac{12}{18}",
  "skillId": "uuid",
  "grade": 6,
  "chapter": "Phân số",
  "problemType": "rút_gọn_phân_số",
  "difficultyLevel": 1,
  "solutionSteps": [...],
  "finalAnswer": "2/3",
  "commonMistakes": [...],
  "learningObjective": "...",
  "timeEstimateSec": 120,
  "hints": [...],
  "tags": ["phân_số", "rút_gọn"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "draftExerciseId": "uuid",
    "status": "draft",
    "preview": {
      // Full exercise data
    },
    "validation": {
      "isValid": true,
      "errors": [],
      "warnings": ["Missing prerequisite_skill_ids"]
    }
  }
}
```

---

#### POST /api/admin/exercises/:draftId/submit

**Description:** Submit draft exercise (chuyển thành exercise thật).

**Request:**
```json
{
  "status": "pending"  // hoặc "draft" để lưu tiếp
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exerciseId": "uuid",
    "status": "pending",
    "message": "Exercise submitted for review"
  }
}
```

---

### 5.2. DOCX Upload & Parse

#### POST /api/admin/exercises/upload-and-parse-docx

**Description:** Upload DOCX và parse exercises.

**Request (multipart/form-data):**
```
file: <docx file> (max 10MB)
autoParse: true (boolean, default: true)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "fileId": "uuid",
    "fileName": "exercises.docx",
    "parsedExercises": [
      {
        "index": 1,
        "problemText": "Rút gọn phân số: 12/18",
        "problemLatex": "\\frac{12}{18}",
        "problemImageUrl": "https://...",
        "solutionSteps": [...],
        "confidence": 0.85,
        "warnings": ["Missing skill_id"],
        "status": "draft"
      }
    ],
    "totalExercises": 10,
    "validExercises": 8,
    "invalidExercises": 2,
    "draftBatchId": "uuid"
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: File không hợp lệ
- `413 PAYLOAD_TOO_LARGE`: File > 10MB
- `500 INTERNAL_ERROR`: Parse failed

---

#### PUT /api/admin/exercises/:draftBatchId/preview

**Description:** Cập nhật draft batch exercises.

**Request:**
```json
{
  "exercises": [
    {
      "index": 1,
      "problemText": "...",
      "skillId": "uuid",
      "grade": 6,
      // ... other fields
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "draftBatchId": "uuid",
    "exercises": [...],
    "validation": {
      "valid": 8,
      "invalid": 2,
      "errors": [...]
    }
  }
}
```

---

#### POST /api/admin/exercises/:draftBatchId/submit

**Description:** Submit batch exercises.

**Request:**
```json
{
  "exerciseIndexes": [1, 2, 3],  // Optional
  "skipInvalid": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "importReport": {
      "total": 5,
      "success": 4,
      "failed": 1,
      "successIds": ["uuid1", "uuid2", ...],
      "failed": [
        {
          "index": 3,
          "error": "Invalid skill_id"
        }
      ]
    }
  }
}
```

---

## 6. IMPLEMENTATION PLAN

### Phase 1: Image Upload Workflow (Tuần 1-2)

#### Core Service

**Tuần 1:**
- [ ] Tạo migration cho `exercise_draft` table
- [ ] Tạo Entity `ExerciseDraft`
- [ ] Tạo Repository `ExerciseDraftRepository`
- [ ] Tạo DTOs: `ImageUploadRequest`, `OcrResultResponse`, `DraftExerciseResponse`
- [ ] Implement `ExerciseDraftService`:
  - `createDraftFromImage()`
  - `updateDraft()`
  - `submitDraft()`
  - `deleteExpiredDrafts()`

**Tuần 2:**
- [ ] Implement `ExerciseImageController`:
  - `POST /api/admin/exercises/upload-and-process-image`
  - `PUT /api/admin/exercises/:draftId/preview`
  - `POST /api/admin/exercises/:draftId/submit`
- [ ] Integrate với AI Service OCR endpoint
- [ ] Integrate với Cloudinary image upload
- [ ] Add validation logic
- [ ] Unit tests

#### AI Service

- [ ] Verify OCR service đã có sẵn (`/internal/ai/ocr`)
- [ ] Enhance OCR nếu cần (better LaTeX detection)

#### Admin Dashboard

**Tuần 1:**
- [ ] Install dependencies:
  - `react-dropzone` (file upload)
  - `react-image-crop` (nếu cần crop)
- [ ] Create `ImageUploadComponent`
- [ ] Create `OcrProcessingIndicator` component

**Tuần 2:**
- [ ] Create `ExerciseDraftForm` component với OCR result
- [ ] Create confidence indicator component
- [ ] Create preview/edit form
- [ ] Integrate với API endpoints
- [ ] Add error handling

---

### Phase 2: DOCX Upload Workflow (Tuần 3-4)

#### Core Service

**Tuần 3:**
- [ ] Add Apache POI dependency
- [ ] Tạo migration cho `exercise_draft_batch` và `exercise_draft_batch_item`
- [ ] Tạo Entities: `ExerciseDraftBatch`, `ExerciseDraftBatchItem`
- [ ] Tạo Repositories
- [ ] Implement `DocxParserService`:
  - `parseDocx()`
  - `extractExercises()`
  - `extractImages()`
  - `detectExerciseStructure()`

**Tuần 4:**
- [ ] Implement `ExerciseDraftBatchService`:
  - `createBatchFromDocx()`
  - `updateBatch()`
  - `submitBatch()`
- [ ] Implement `ExerciseDocxController`:
  - `POST /api/admin/exercises/upload-and-parse-docx`
  - `PUT /api/admin/exercises/:draftBatchId/preview`
  - `POST /api/admin/exercises/:draftBatchId/submit`
- [ ] Add batch validation logic
- [ ] Unit tests

#### Admin Dashboard

**Tuần 3:**
- [ ] Create `DocxUploadComponent`
- [ ] Create `BulkEditTable` component với TanStack Table
- [ ] Create inline edit form cho mỗi exercise

**Tuần 4:**
- [ ] Implement bulk actions (apply skill, grade, etc.)
- [ ] Create validation indicators
- [ ] Create import report display
- [ ] Integrate với API endpoints

---

### Phase 3: CSV/JSON Import Enhancement (Tuần 5)

#### Core Service

- [ ] Enhance CSV import với draft batch support
- [ ] Enhance JSON import với draft batch support
- [ ] Add preview/edit endpoints tương tự DOCX

#### Admin Dashboard

- [ ] Enhance CSV/JSON import UI với preview/edit
- [ ] Add bulk edit support

---

### Phase 4: AI Generate Integration (Tuần 6)

#### Core Service

- [ ] Implement `ExerciseAIGenerateService`
- [ ] Create `POST /api/admin/exercises/generate` endpoint
- [ ] Integrate với AI Service

#### Admin Dashboard

- [ ] Create AI generate form
- [ ] Create preview/edit form cho AI-generated exercises

---

## 7. DEPENDENCIES & RESOURCES

### 7.1. Core Service

#### Dependencies

```xml
<!-- DOCX Processing -->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.5</version>
</dependency>

<!-- CSV Processing (nếu chưa có) -->
<dependency>
    <groupId>com.opencsv</groupId>
    <artifactId>opencsv</artifactId>
    <version>5.9</version>
</dependency>

<!-- JSON Processing (đã có Jackson, verify) -->
<!-- File Upload (đã có Spring Multipart, verify) -->
```

#### Configuration

- [ ] Verify Jackson configuration cho JSON processing
- [ ] Verify Spring Multipart configuration (max file size: 10MB)
- [ ] Database indexes (đã có trong schema)

#### Environment Variables

- [ ] `EXERCISE_IMPORT_MAX_FILE_SIZE` (default: 10MB)
- [ ] `EXERCISE_DRAFT_EXPIRY_DAYS` (default: 7)
- [ ] `CLOUDINARY_EXERCISE_IMPORT_FOLDER` (default: "exercise-import")

---

### 7.2. AI Service

#### Dependencies

- [ ] Verify OCR service đã có sẵn
- [ ] Verify httpx cho HTTP client (nếu cần gọi Core Service)

#### Configuration

- [ ] Core Service API base URL (nếu cần gọi ngược lại)

---

### 7.3. Admin Dashboard

#### Dependencies

```bash
# File Upload
npm install react-dropzone

# Image Preview/Crop (optional)
npm install react-image-crop

# DOCX Preview (optional)
npm install mammoth  # Convert DOCX to HTML for preview

# Data Tables (đã có trong plan)
npm install @tanstack/react-table

# CSV/JSON Processing
npm install papaparse

# Form Handling (đã có trong plan)
npm install react-hook-form @hookform/resolvers zod

# Rich Text Editor (đã có trong plan)
npm install @tiptap/react @tiptap/starter-kit

# LaTeX Editor (đã có trong plan)
npm install katex react-katex
```

#### Configuration

- [ ] API client configuration
- [ ] File upload size limits (5MB cho image, 10MB cho DOCX)
- [ ] Cloudinary configuration (đã có)

---

## 8. ERROR HANDLING

### 8.1. Image Upload Errors

| Error | HTTP Status | Message |
|-------|-------------|---------|
| File too large | 413 | "Image size exceeds 5MB limit" |
| Invalid format | 400 | "Only JPEG and PNG formats are supported" |
| OCR failed | 503 | "OCR processing failed. Please try again or enter manually." |
| Low confidence | 200 (warning) | "OCR confidence is low (<0.8). Please review carefully." |

### 8.2. DOCX Upload Errors

| Error | HTTP Status | Message |
|-------|-------------|---------|
| File too large | 413 | "DOCX file size exceeds 10MB limit" |
| Invalid format | 400 | "Only DOCX format is supported" |
| Parse failed | 500 | "Failed to parse DOCX file. Please check file format." |
| No exercises found | 400 | "No exercises detected in DOCX file." |

### 8.3. Validation Errors

- Missing required fields (skillId, grade, problemText)
- Invalid skill_id (not found in database)
- Invalid grade (not 6 or 7)
- Invalid difficulty_level (not 1-5)
- Invalid JSON structure (solution_steps, common_mistakes, hints)

---

## 9. UX CONSIDERATIONS

### 9.1. Image Upload

- **Progress Indicator**: Hiển thị progress khi upload và OCR
- **Confidence Indicator**: 
  - Green badge (≥0.9): "High confidence"
  - Yellow badge (0.7-0.9): "Medium confidence"
  - Red badge (<0.7): "Low confidence - Please review"
- **Image Preview**: Hiển thị ảnh đã upload để reference
- **Auto-save Draft**: Tự động lưu draft mỗi 30 giây
- **Undo/Redo**: Hỗ trợ undo/redo khi edit

### 9.2. DOCX Upload

- **Progress Indicator**: Hiển thị progress khi upload và parse
- **Bulk Edit Table**:
  - Sortable columns
  - Filterable rows
  - Select all / Deselect all
  - Inline editing
- **Validation Indicators**:
  - Green row: Valid
  - Red row: Invalid (highlight errors)
  - Yellow row: Warnings
- **Bulk Actions Toolbar**: 
  - Apply skill to selected
  - Apply grade to selected
  - Delete selected
- **Summary Card**: Total, Valid, Invalid counts
- **Import Report**: Chi tiết success/failed sau khi submit

---

## 10. TESTING STRATEGY

### 10.1. Unit Tests

- Image upload validation
- DOCX parsing logic
- Draft management (create, update, submit)
- Batch processing logic
- Validation logic

### 10.2. Integration Tests

- Image upload → OCR → Draft creation flow
- DOCX upload → Parse → Batch creation flow
- Draft submit → Exercise creation flow
- Batch submit → Batch exercise creation flow

### 10.3. E2E Tests

- Complete image upload workflow
- Complete DOCX upload workflow
- Error handling scenarios
- Bulk edit operations

---

## 11. SECURITY CONSIDERATIONS

### 11.1. File Upload Security

- Validate file type (check MIME type, not just extension)
- Validate file size (max 5MB cho image, 10MB cho DOCX)
- Scan for malicious content (Cloudinary có built-in scanning)
- Rate limiting: Max 10 uploads per minute per user
- File quarantine: Store uploaded files temporarily, scan before processing

### 11.2. Access Control

- Chỉ admin mới có quyền upload/import
- Validate `created_by` khi submit draft
- Audit log: Log tất cả upload và import activities

---

## 12. PERFORMANCE OPTIMIZATION

### 12.1. Image Upload

- Stream upload trực tiếp đến Cloudinary (không lưu tạm trên disk)
- Async OCR processing (nếu file lớn)
- Cache OCR results (đã có trong AI Service)

### 12.2. DOCX Upload

- Stream parse (không load toàn bộ file vào memory)
- Batch insert với transaction (hiệu quả hơn insert từng cái)
- Parallel processing cho multiple exercises (nếu có)

### 12.3. Draft Management

- Auto-delete expired drafts (scheduled job)
- Index database tables để query nhanh
- Pagination cho draft list (nếu có nhiều)

---

## 13. MONITORING & ANALYTICS

### 13.1. Metrics to Track

- Upload success rate (by type: image, DOCX, CSV, JSON)
- OCR confidence distribution
- Parse success rate (DOCX)
- Draft submission rate
- Average time to submit (from draft to exercise)
- Error rates by error type

### 13.2. Alerts

- OCR service unavailable
- High error rate (>10%)
- Low confidence rate (<0.7) > 50%
- Parse failure rate > 20%

---

## 14. FUTURE ENHANCEMENTS (Phase 2+)

### 14.1. Advanced Features

- **PDF Upload**: Parse PDF files (tương tự DOCX)
- **Bulk Image Upload**: Upload nhiều ảnh cùng lúc
- **AI-Assisted Editing**: AI suggest improvements cho draft
- **Template System**: Save và reuse exercise templates
- **Version Comparison**: Compare draft với approved exercise

### 14.2. Integration

- **Google Drive Integration**: Import từ Google Drive
- **OneDrive Integration**: Import từ OneDrive
- **API Import**: Import từ external APIs

---

## 15. TÀI LIỆU LIÊN QUAN

### Internal Documentation

- [Exercise Management Research](./exercise_management_research_phase_1-2025-12-19-10-13.md)
- [Image Upload & Processing](../technical_design/image_upload_processing_phase_1-2025-12-16.md)
- [API Specification](../technical_design/api_specification_phase_1-2025-12-15-03-30.md)
- [Database ERD & DDL](../database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md)

### External References

- [Apache POI Documentation](https://poi.apache.org/)
- [PaddleOCR Documentation](https://github.com/PaddlePaddle/PaddleOCR)
- [React Dropzone](https://react-dropzone.js.org/)
- [TanStack Table](https://tanstack.com/table)

---

## 16. GHI CHÚ QUAN TRỌNG

1. **Draft Expiry**: Draft tự động xóa sau 7 ngày nếu không submit
2. **Confidence Threshold**: OCR confidence < 0.8 cần review kỹ
3. **Batch Processing**: DOCX/CSV/JSON import nên dùng transaction để đảm bảo data integrity
4. **Error Recovery**: Cho phép retry khi OCR/Parse failed
5. **User Feedback**: Hiển thị rõ ràng validation errors và warnings

---

## 17. LỊCH SỬ THAY ĐỔI

- 2025-12-19-15-00: Tạo mới tài liệu Exercise Input Workflows

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)
