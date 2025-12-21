# Exercise Management Research – Phase 1

**Project:** Tutor  
**Document type:** Research & Design Document  
**Audience:** Developer / Product / Education Team  
**Status:** Draft  
**Version:** 2025-12-19-10-13  
**Author:** System Architect + Education Expert

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này tổng hợp nghiên cứu về **quản lý bài tập (Exercise Management)** cho hệ thống Tutor, bao gồm:

- Mô hình dữ liệu và cấu trúc bài tập
- Tech stack và công nghệ sử dụng
- Workflow và quy trình quản lý
- API design và integration points
- Best practices từ nghiên cứu thực tế

Mục tiêu: Chuẩn hóa, số hóa, và bảo toàn tri thức sư phạm để tạo nền tảng dữ liệu bài tập chất lượng cao cho hệ thống.

---

## 2. TỔNG QUAN VỀ EXERCISE MANAGEMENT

### 2.1. Mục đích

**Exercise Management** là hệ thống quản lý tập trung các bài tập Toán đã được chuẩn hóa, nhằm:

- **Chuẩn hóa**: Đảm bảo tất cả bài tập tuân thủ chương trình Việt Nam, có cấu trúc nhất quán
- **Số hóa**: Chuyển đổi tri thức sư phạm từ sách vở, giáo viên thành dữ liệu có thể quản lý và tái sử dụng
- **Bảo toàn**: Lưu trữ và versioning để không mất đi tri thức giáo dục quý giá

### 2.2. Vai trò trong Hệ thống Tutor

Exercise Management đóng vai trò:

1. **Seed Data cho AI**: Cung cấp bài tập mẫu chất lượng cao để AI học và sinh bài tương tự
2. **Validation**: Kiểm tra chất lượng bài tập AI sinh ra so với bài tập chuẩn
3. **Fallback**: Khi AI không đủ tin cậy, sử dụng bài tập từ database
4. **Adaptive Learning**: Cung cấp bài tập phù hợp theo skill và mastery level của học sinh
5. **Quality Control**: Review và approve bài tập trước khi đưa vào sử dụng

### 2.3. Lợi ích

- **Đảm bảo chất lượng**: Bài tập được review bởi giáo viên/chuyên gia
- **Tái sử dụng**: Một bài tập có thể dùng cho nhiều học sinh, nhiều lần
- **Phân tích**: Theo dõi performance của từng bài tập (success rate, avg time)
- **Mở rộng**: Dễ dàng thêm bài tập mới, mở rộng sang lớp khác, môn khác
- **Bảo toàn tri thức**: Không mất đi kinh nghiệm và phương pháp sư phạm

---

## 3. MÔ HÌNH DỮ LIỆU

### 3.1. Database Schema

#### 3.1.1. Bảng `exercise`

```sql
CREATE TABLE exercise (
  id UUID PRIMARY KEY,
  skill_id UUID NOT NULL,
  grade INT NOT NULL CHECK (grade IN (6, 7)),
  chapter VARCHAR(255),
  problem_type VARCHAR(255),
  
  -- Nội dung bài tập
  problem_text TEXT NOT NULL,
  problem_latex TEXT,
  problem_image_url TEXT,
  
  -- Phân loại
  difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 5),
  bloom_taxonomy_level VARCHAR(50),
  
  -- Lời giải chuẩn (JSON)
  solution_steps JSON NOT NULL,
  final_answer TEXT,
  common_mistakes JSON,
  
  -- Metadata sư phạm
  learning_objective TEXT,
  prerequisite_skill_ids JSON,
  time_estimate_sec INT,
  hints JSON,
  
  -- Metadata kỹ thuật
  created_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_by VARCHAR(255),
  reviewed_at TIMESTAMP,
  review_status VARCHAR(50) DEFAULT 'pending' CHECK (review_status IN ('pending', 'approved', 'rejected', 'needs_revision')),
  quality_score DECIMAL(3,2) CHECK (quality_score BETWEEN 0 AND 1),
  
  -- Usage tracking
  usage_count INT DEFAULT 0,
  avg_success_rate DECIMAL(5,2),
  avg_time_sec INT,
  
  -- Versioning
  version INT DEFAULT 1,
  parent_exercise_id UUID,
  
  CONSTRAINT fk_exercise_skill FOREIGN KEY (skill_id) REFERENCES skill(id)
);
```

#### 3.1.2. Bảng `exercise_tag`

```sql
CREATE TABLE exercise_tag (
  id UUID PRIMARY KEY,
  exercise_id UUID NOT NULL,
  tag_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_tag_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE,
  CONSTRAINT unique_exercise_tag UNIQUE (exercise_id, tag_name)
);
```

#### 3.1.3. Bảng `exercise_review_log`

```sql
CREATE TABLE exercise_review_log (
  id UUID PRIMARY KEY,
  exercise_id UUID NOT NULL,
  reviewed_by VARCHAR(255) NOT NULL,
  review_status VARCHAR(50) NOT NULL,
  review_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_review_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
);
```

### 3.2. Cấu trúc JSON cho Bài tập

#### 3.2.1. Solution Steps

```json
{
  "solution_steps": [
    {
      "step_number": 1,
      "description": "Tìm ƯCLN",
      "content": "ƯCLN(12, 18) = 6",
      "explanation": "Ta tìm số lớn nhất mà cả 12 và 18 đều chia hết"
    },
    {
      "step_number": 2,
      "description": "Chia cả tử và mẫu cho ƯCLN",
      "content": "12/18 = (12:6)/(18:6) = 2/3",
      "explanation": "Chia cả tử số và mẫu số cho cùng một số"
    }
  ]
}
```

#### 3.2.2. Common Mistakes

```json
{
  "common_mistakes": [
    {
      "mistake": "Chỉ chia tử số",
      "explanation": "Phải chia cả tử và mẫu cho cùng một số"
    },
    {
      "mistake": "Chia cho số không phải ƯCLN",
      "explanation": "Cần tìm ƯCLN để rút gọn tối đa"
    }
  ]
}
```

#### 3.2.3. Hints

```json
{
  "hints": [
    "Hãy tìm số lớn nhất mà cả tử và mẫu đều chia hết",
    "Nhớ chia cả tử và mẫu cho cùng một số"
  ]
}
```

### 3.3. Quan hệ với Skill Graph

- Mỗi bài tập **phải** liên kết với một `skill_id` trong Skill Graph
- Bài tập có thể có `prerequisite_skill_ids` để đảm bảo học sinh đã nắm vững kiến thức nền tảng
- Khi chọn bài tập cho học sinh, hệ thống kiểm tra mastery của prerequisite skills

---

## 4. TECH STACK & CÔNG NGHỆ

### 4.1. Backend (Core Service)

- **Framework**: Java Spring Boot 3.5.8+
- **Database**: PostgreSQL 15+
- **ORM**: JPA/Hibernate
- **Migration**: Flyway
- **Validation**: Jakarta Validation (Bean Validation)
- **JSON Processing**: Jackson

### 4.2. Frontend (Admin Dashboard)

- **Framework**: Next.js 16.0.10+
- **UI Library**: React 19.2.0+
- **Language**: TypeScript 5.9.3+
- **Styling**: Tailwind CSS 4.1.17+
- **Rich Text Editor**: Tiptap + Starter Kit
- **LaTeX Editor**: KaTeX
- **Form Handling**: React Hook Form + Zod
- **Data Tables**: TanStack Table (React Table)
- **File Import/Export**: PapaParse (CSV), JSON
- **Charts**: ApexCharts (cho statistics)

### 4.3. Công nghệ Bổ sung

- **Image Storage**: Cloudinary (đã có sẵn trong Core Service)
- **File Upload**: React Dropzone
- **Date Formatting**: date-fns
- **API Client**: Axios

---

## 5. WORKFLOW & QUY TRÌNH

### 5.1. Workflow Tạo Bài tập

```
Draft → Pending Review → Approved/Rejected/Needs Revision
```

1. **Draft**: Admin/Content Creator tạo bài tập, lưu ở trạng thái draft
2. **Pending Review**: Submit để review, chuyển sang trạng thái pending
3. **Review**: Expert/Teacher review bài tập, đánh giá quality score
4. **Approved**: Bài tập được approve, có thể sử dụng trong hệ thống
5. **Rejected**: Bài tập bị reject, cần sửa lại hoặc xóa
6. **Needs Revision**: Bài tập cần chỉnh sửa, quay lại draft

### 5.1.1. Flow Hiện Trạng Chi Tiết: Từ Nhập Bài Tập Đến Sẵn Sàng Sử Dụng

#### Tổng Quan Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ BƯỚC 1: Nhập Bài Tập (Admin Dashboard)                         │
│ Admin/Content Creator mở form tạo bài tập mới                  │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│ BƯỚC 2: Điền Thông Tin Bài Tập                                 │
│ - Chọn Skill (bắt buộc)                                         │
│ - Chọn Grade: 6 hoặc 7 (bắt buộc)                              │
│ - Nhập Chapter, Problem Type (optional)                         │
│ - Nhập Problem Text (bắt buộc)                                  │
│ - Nhập Problem LaTeX (optional)                                 │
│ - Upload Problem Image (optional)                              │
│ - Chọn Difficulty Level: 1-5 (optional)                         │
│ - Chọn Bloom Taxonomy Level (optional)                          │
│ - Nhập Solution Steps (bắt buộc, JSON array)                  │
│ - Nhập Final Answer (optional)                                  │
│ - Nhập Common Mistakes (optional, JSON array)                  │
│ - Nhập Learning Objective (optional)                            │
│ - Chọn Prerequisite Skills (optional, JSON array)              │
│ - Nhập Time Estimate (optional)                                 │
│ - Nhập Hints (optional, JSON array)                            │
│ - Thêm Tags (optional)                                          │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│ BƯỚC 3: Lưu Bài Tập Vào Database                               │
│ POST /api/v1/admin/exercises                                    │
│ - Validate tất cả fields (skill_id, grade, problem_text, etc.) │
│ - Validate skill_id tồn tại trong Skill Graph                   │
│ - Validate JSON structure (solution_steps, common_mistakes)     │
│ - Tạo Exercise record với:                                      │
│   • review_status = 'PENDING' (default)                        │
│   • created_by = current admin username                         │
│   • created_at = current timestamp                              │
│   • usage_count = 0                                             │
│   • version = 1                                                 │
│ - Lưu Tags vào exercise_tag table                              │
│ - Return ExerciseResponse với status PENDING                    │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│ TRẠNG THÁI: PENDING                                             │
│ - Bài tập đã được lưu vào database                              │
│ - Đang chờ được review bởi Admin/Expert                        │
│ - Có thể được xem trong danh sách "Pending Review"              │
│ - Có thể được edit (update) hoặc delete                         │
│ - CHƯA thể sử dụng cho học sinh                                 │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│ BƯỚC 4: Review Bài Tập (Admin/Expert)                          │
│ Admin/Expert mở bài tập từ danh sách "Pending Review"          │
│ - Xem toàn bộ nội dung bài tập                                  │
│ - Đánh giá chất lượng:                                          │
│   • Quality Score: 0.0 - 1.0                                    │
│   • Review Notes: Ghi chú về điểm tốt/cần sửa                   │
│ - Quyết định:                                                    │
│   • APPROVE: Nếu chất lượng tốt (quality_score >= 0.7)         │
│   • REJECT: Nếu không đạt chất lượng (phải có review_notes)    │
│   • NEEDS_REVISION: Nếu cần sửa nhỏ (quay lại để sửa)           │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│ BƯỚC 5: Submit Review                                           │
│ POST /api/v1/admin/exercises/{id}/review                        │
│ - Validate permissions (chỉ ADMIN có quyền review)             │
│ - Validate business rules:                                      │
│   • APPROVE: quality_score phải >= 0.7                          │
│   • REJECT: phải có review_notes                                │
│ - Update Exercise:                                              │
│   • review_status = APPROVED/REJECTED/NEEDS_REVISION            │
│   • reviewed_by = current admin username                        │
│   • reviewed_at = current timestamp                             │
│   • quality_score = value từ request                            │
│ - Create ExerciseReviewLog entry                                │
│ - Return ExerciseResponse với status mới                        │
└─────────────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                     ↓
┌───────────────────────┐        ┌───────────────────────┐
│ TRẠNG THÁI: APPROVED  │        │ TRẠNG THÁI: REJECTED   │
│ - Bài tập đã được     │        │ - Bài tập bị từ chối   │
│   phê duyệt           │        │ - Có review_notes      │
│ - quality_score >= 0.7│        │ - Có thể:              │
│ - Có thể được sử dụng │        │   • Xóa bài tập        │
│   cho học sinh        │        │   • Sửa và tạo lại     │
│ - Có thể được assign  │        │ - KHÔNG thể sử dụng    │
│   trong Adaptive      │        │   cho học sinh         │
│   Learning Engine     │        └───────────────────────┘
│ - Có thể được query   │
│   bởi AI Service      │
│   (seed data)         │
│ - Khi update:         │
│   • Nếu usage_count=0:│
│     → Cho phép update │
│     → Reset về PENDING│
│   • Nếu usage_count>0:│
│     → Reject update   │
│     → Phải tạo version│
│       mới (Phase 2+)  │
└───────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│ TRẠNG THÁI: NEEDS_REVISION                                      │
│ - Bài tập cần được sửa lại                                     │
│ - Status tự động chuyển về PENDING                              │
│ - Có review_notes hướng dẫn sửa                                │
│ - Admin có thể:                                                 │
│   • Update bài tập (PUT /api/v1/admin/exercises/{id})          │
│   • Sau khi update → status vẫn là PENDING                      │
│   • Submit lại để review                                        │
│ - CHƯA thể sử dụng cho học sinh                                │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│ BƯỚC 6: Bài Tập Sẵn Sàng Sử Dụng                                │
│ Khi bài tập có status = APPROVED:                              │
│ - Có thể được query bởi Adaptive Learning Engine               │
│   GET /api/admin/exercises/by-skill/{skillId}                  │
│ - Có thể được assign cho học sinh                              │
│ - Có thể được sử dụng làm seed data cho AI Service              │
│ - Usage tracking sẽ được cập nhật khi:                        │
│   • Bài tập được assign cho học sinh                           │
│   • Học sinh submit answer                                      │
│   • Tính toán success_rate và avg_time_sec                     │
│ - Có thể xem statistics:                                        │
│   GET /api/v1/admin/exercises/{id}/stats                       │
└─────────────────────────────────────────────────────────────────┘
```

#### Chi Tiết Các Trạng Thái

| Trạng Thái | Mô Tả | Có Thể Edit? | Có Thể Delete? | Có Thể Sử Dụng? | Có Thể Review? |
|------------|-------|--------------|----------------|-----------------|----------------|
| **PENDING** | Bài tập mới tạo, đang chờ review | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| **APPROVED** | Bài tập đã được phê duyệt | ⚠️ Conditional* | ❌ No** | ✅ Yes | ❌ No |
| **REJECTED** | Bài tập bị từ chối | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **NEEDS_REVISION** | Bài tập cần sửa lại | ✅ Yes | ✅ Yes | ❌ No | ❌ No (tự động về PENDING) |

\* **Edit APPROVED exercise:**
- Nếu `usage_count = 0`: Cho phép edit → Reset về PENDING
- Nếu `usage_count > 0`: Reject edit (phải tạo version mới - Phase 2+)

\*\* **Delete APPROVED exercise:**
- Chỉ cho phép delete nếu `usage_count = 0`
- Nếu `usage_count > 0`: Reject delete (bài tập đang được sử dụng)

#### Chuyển Đổi Trạng Thái (State Transitions)

```
CREATE → PENDING
  - Khi tạo bài tập mới
  - review_status = 'PENDING'
  - created_by = admin username

PENDING → APPROVED
  - Khi review với review_status = 'APPROVED'
  - Điều kiện: quality_score >= 0.7
  - reviewed_by = admin username
  - reviewed_at = current timestamp

PENDING → REJECTED
  - Khi review với review_status = 'REJECTED'
  - Điều kiện: phải có review_notes
  - reviewed_by = admin username
  - reviewed_at = current timestamp

PENDING → NEEDS_REVISION → PENDING
  - Khi review với review_status = 'NEEDS_REVISION'
  - Tự động chuyển về PENDING
  - reviewed_by = admin username
  - reviewed_at = current timestamp

APPROVED → PENDING
  - Khi update bài tập APPROVED (nếu usage_count = 0)
  - Reset review fields (reviewed_by, reviewed_at, quality_score = null)
  - Để review lại sau khi update

REJECTED → PENDING
  - Khi update bài tập REJECTED
  - Reset review fields
  - Để review lại sau khi update
```

#### Business Rules Chi Tiết

1. **Tạo Bài Tập:**
   - Tất cả bài tập mới tạo với `review_status = 'PENDING'`
   - `created_by` = username của admin hiện tại
   - `usage_count = 0`, `version = 1`
   - Phải có: `skill_id`, `grade`, `problem_text`, `solution_steps`

2. **Review Bài Tập:**
   - Chỉ ADMIN role mới có quyền review (Phase 1)
   - APPROVE: `quality_score >= 0.7` (bắt buộc)
   - REJECT: Phải có `review_notes` (bắt buộc)
   - NEEDS_REVISION: Tự động chuyển về PENDING

3. **Update Bài Tập:**
   - PENDING/REJECTED/NEEDS_REVISION: Cho phép update bất kỳ
   - APPROVED với `usage_count = 0`: Cho phép update → Reset về PENDING
   - APPROVED với `usage_count > 0`: Reject update (cần versioning - Phase 2+)

4. **Delete Bài Tập:**
   - PENDING/REJECTED/NEEDS_REVISION: Cho phép delete
   - APPROVED với `usage_count = 0`: Cho phép delete
   - APPROVED với `usage_count > 0`: Reject delete

5. **Sử Dụng Bài Tập:**
   - Chỉ bài tập có `review_status = 'APPROVED'` mới có thể sử dụng
   - Adaptive Learning Engine chỉ query bài tập APPROVED
   - AI Service chỉ lấy seed data từ bài tập APPROVED

### 5.2. Review Workflow

- **Reviewer**: Admin hoặc Expert có quyền review
- **Quality Score**: Đánh giá từ 0.0 đến 1.0
- **Review Notes**: Ghi chú về điểm cần sửa hoặc lý do reject
- **Review History**: Lưu lại lịch sử tất cả reviews

### 5.3. Import/Export Workflow

#### Import (CSV/JSON):
1. Upload file CSV hoặc JSON
2. Validate format và data
3. Map skill_code → skill_id
4. Batch insert với transaction
5. Return import report (success/failed)

#### Export:
1. Filter bài tập theo criteria (grade, skill, status, etc.)
2. Export ra CSV hoặc JSON
3. Download file

### 5.4. Versioning

- Khi update bài tập đã **approved**, tạo version mới
- Giữ lại version cũ trong `parent_exercise_id`
- Version mới bắt đầu từ trạng thái **pending review**

---

## 6. API DESIGN

### 6.1. REST Endpoints

#### CRUD Operations

```
POST   /api/admin/exercises                    - Tạo bài tập mới
GET    /api/admin/exercises                    - Danh sách bài tập (search, filter, pagination)
GET    /api/admin/exercises/:id                - Chi tiết bài tập
PUT    /api/admin/exercises/:id                - Cập nhật bài tập
DELETE /api/admin/exercises/:id                - Xóa bài tập
```

#### Review Operations

```
POST   /api/admin/exercises/:id/review         - Review bài tập (approve/reject/needs_revision)
GET    /api/admin/exercises/:id/review-history - Lịch sử review
```

#### Statistics

```
GET    /api/admin/exercises/:id/stats          - Thống kê bài tập (usage, success rate, avg time)
```

#### Import/Export

```
POST   /api/admin/exercises/import             - Import từ file (CSV/JSON)
GET    /api/admin/exercises/export             - Export ra file (CSV/JSON)
```

#### Query by Skill

```
GET    /api/admin/exercises/by-skill/:skillId  - Bài tập theo skill
```

### 6.2. Request/Response Examples

#### Create Exercise Request

```json
{
  "skillId": "uuid",
  "grade": 6,
  "chapter": "Phân số",
  "problemType": "rút_gọn_phân_số",
  "problemText": "Rút gọn phân số: 12/18",
  "problemLatex": "\\frac{12}{18}",
  "difficultyLevel": 1,
  "bloomTaxonomyLevel": "apply",
  "solutionSteps": [
    {
      "stepNumber": 1,
      "description": "Tìm ƯCLN",
      "content": "ƯCLN(12, 18) = 6",
      "explanation": "Ta tìm số lớn nhất mà cả 12 và 18 đều chia hết"
    }
  ],
  "finalAnswer": "2/3",
  "commonMistakes": [
    {
      "mistake": "Chỉ chia tử số",
      "explanation": "Phải chia cả tử và mẫu cho cùng một số"
    }
  ],
  "learningObjective": "Học sinh biết cách rút gọn phân số bằng cách tìm ƯCLN",
  "timeEstimateSec": 120,
  "hints": [
    "Hãy tìm số lớn nhất mà cả tử và mẫu đều chia hết"
  ]
}
```

#### Exercise Response

```json
{
  "id": "uuid",
  "skillId": "uuid",
  "grade": 6,
  "chapter": "Phân số",
  "problemType": "rút_gọn_phân_số",
  "problemText": "Rút gọn phân số: 12/18",
  "problemLatex": "\\frac{12}{18}",
  "difficultyLevel": 1,
  "bloomTaxonomyLevel": "apply",
  "solutionSteps": [...],
  "finalAnswer": "2/3",
  "commonMistakes": [...],
  "learningObjective": "...",
  "timeEstimateSec": 120,
  "hints": [...],
  "createdBy": "admin_username",
  "createdAt": "2025-12-19T10:00:00Z",
  "reviewStatus": "approved",
  "qualityScore": 0.95,
  "usageCount": 150,
  "avgSuccessRate": 85.5,
  "avgTimeSec": 115,
  "version": 1
}
```

---

## 7. INTEGRATION POINTS

### 7.1. Tích hợp với Skill Graph

- Bài tập **phải** liên kết với skill trong Skill Graph
- Khi query bài tập, filter theo skill_id
- Kiểm tra prerequisite skills trước khi assign bài tập

### 7.2. Tích hợp với Adaptive Learning Engine

- **Exercise Selection Service**: Chọn bài tập phù hợp theo:
  - Skill cần luyện tập
  - Mastery level của học sinh
  - Difficulty level
  - Bài tập chưa làm hoặc làm sai
  
- **Usage Tracking**: Cập nhật khi:
  - Bài tập được assign cho học sinh
  - Học sinh submit answer
  - Tính toán success rate và avg time

### 7.3. Tích hợp với AI Service

- **Seed Data**: Cung cấp bài tập mẫu cho AI để học pattern
- **Validation**: So sánh bài tập AI sinh ra với bài tập chuẩn
- **Fallback**: Khi AI confidence < threshold, dùng bài tập từ database

---

## 8. BEST PRACTICES & KHUYẾN NGHỊ

### 8.1. Nhập liệu Bài toán (Từ nghiên cứu thực tế)

#### 8.1.1. Cấu trúc Bài tập

- **Problem Text**: Rõ ràng, đầy đủ, không ambiguous
- **Problem Latex**: Dùng LaTeX cho công thức toán học
- **Solution Steps**: Chia nhỏ từng bước, mỗi bước có explanation
- **Common Mistakes**: Liệt kê lỗi học sinh thường gặp
- **Hints**: Gợi ý từ dễ đến khó

#### 8.1.2. Chuẩn hóa Format

- Tuân thủ chương trình Toán Việt Nam
- Không dùng phương pháp ngoài chương trình
- Trình bày theo cấu trúc: Phân tích → Lời giải → Lưu ý → Kết luận

#### 8.1.3. Phân loại

- **Difficulty Level**: 1-5 (1=dễ, 5=khó)
- **Bloom Taxonomy**: remember, understand, apply, analyze, evaluate, create
- **Problem Type**: rút_gọn_phân_số, giải_phương_trình, etc.

### 8.2. Quality Control

- **Review bắt buộc**: Tất cả bài tập phải được review trước khi approve
- **Quality Score**: Đánh giá từ 0.0 đến 1.0
- **Review Notes**: Ghi chú chi tiết về điểm cần sửa
- **Versioning**: Giữ lại lịch sử thay đổi

### 8.3. Import/Export

- **CSV Format**: Dễ dàng nhập liệu hàng loạt từ Excel
- **JSON Format**: Dễ dàng migrate và backup
- **Validation**: Validate data trước khi import
- **Error Reporting**: Báo cáo chi tiết lỗi khi import

### 8.4. Usage Analytics

- **Track Usage**: Theo dõi số lần bài tập được sử dụng
- **Success Rate**: Tỷ lệ học sinh làm đúng
- **Average Time**: Thời gian trung bình làm bài
- **Performance Analysis**: Phân tích để cải thiện chất lượng bài tập

---

## 9. ROADMAP TRIỂN KHAI

### Phase 0: Foundation (Tuần 1-2)
- Database schema và migration
- Entity classes và repositories
- Basic CRUD operations

### Phase 1: Backend API (Tuần 3-4)
- Service layer và controller
- Review workflow
- Import/Export functionality

### Phase 2: Frontend Admin Dashboard (Tuần 5-7)
- Exercise list page với table, search, filter
- Exercise create/edit form
- Review panel
- Import/Export UI

### Phase 3: Integration (Tuần 8-9)
- Tích hợp với Adaptive Learning Engine
- Usage tracking
- Analytics dashboard

### Phase 4: Quality & Optimization (Tuần 10-12)
- Quality metrics
- Automated quality checks
- Performance optimization

---

## 10. TÀI LIỆU THAM CHIẾU

### Internal Documentation

- [PRD MVP](../prd/prd_mvp_phase_1-2025-12-14-22-15.md)
- [Skill Graph](../learning/skill_graph/skill-graph-math-grade-6-7_phase_1-2025-12-15-02-30.md)
- [Adaptive Learning Logic](../education_logic/adaptive_learning_logic_phase_1-2025-12-15-02-30.md)
- [Database ERD & DDL](../database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md)

### External References

- [ChatGPT - Khuyến nghị nhập liệu bài toán](https://chatgpt.com/share/6944baf4-f4ac-8009-bf26-5e43ba669be3)
- [Tiptap Documentation](https://tiptap.dev/)
- [KaTeX Documentation](https://katex.org/)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Table](https://tanstack.com/table)

---

## 11. GHI CHÚ QUAN TRỌNG

1. **Priority**: Exercise Management nên triển khai sớm để có seed data cho hệ thống
2. **Quality over Quantity**: Tốt hơn có ít bài tập chất lượng cao hơn nhiều bài tập chất lượng thấp
3. **Review Process**: Cần có quy trình review rõ ràng và nghiêm ngặt
4. **Versioning**: Luôn giữ lại version cũ khi update bài tập đã approved
5. **Integration**: Phải tích hợp chặt chẽ với Skill Graph và Adaptive Learning Engine

---

## 12. LỊCH SỬ THAY ĐỔI

- 2025-12-19-10-13: Tạo mới tài liệu nghiên cứu Exercise Management

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)
