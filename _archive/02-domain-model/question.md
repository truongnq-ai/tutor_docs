# QUESTION - DOMAIN MODEL

← Quay lại: [README.md](../README.md)

## Tổng quan

Question là instance của Exercise được assign cho học sinh. Question lưu snapshot của Exercise data tại thời điểm assign, nhưng KHÔNG lưu response data (đã chuyển sang Practice table).

## Thuộc tính (Attributes)

### Cơ bản
- **id** (UUID): Primary key, UUID v7
- **exerciseId** (UUID): Foreign key đến Exercise (template)
- **skillId** (UUID): Foreign key đến Skill (bắt buộc)
- **chapterId** (UUID): Foreign key đến Chapter (lấy từ Skill để dễ query)
- **assignedToStudentId** (UUID, nullable): Foreign key đến StudentProfile

### Snapshot Data (từ Exercise)
- **problemText** (String): Nội dung câu hỏi (snapshot)
- **problemLatex** (String, optional): LaTeX format (snapshot)
- **problemImageUrl** (String, optional): URL hình ảnh (snapshot)
- **solutionSteps** (JSONB): Các bước giải chi tiết (snapshot)
- **finalAnswer** (String): Đáp án cuối cùng (snapshot)
- **commonMistakes** (JSONB, optional): Các lỗi sai phổ biến (snapshot)
- **hints** (JSONB, optional): Gợi ý từng bước (snapshot)
- **difficultyLevel** (Integer): Độ khó (1-5)

### Customization
- **customizedData** (JSONB, optional): Lưu các thay đổi (số liệu mới, etc.)

### Assignment Info
- **assignedAt** (Timestamp): Thời gian assign
- **questionType** (String): Loại câu hỏi (PRACTICE, MINI_TEST, REVIEW)
- **status** (String): Trạng thái (DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED)

### Metadata
- **createdAt** (Timestamp): Thời gian tạo
- **updatedAt** (Timestamp): Thời gian cập nhật

## Trạng thái (Status)

### DRAFT
- Question được tạo nhưng chưa assign
- Có thể chỉnh sửa

### ASSIGNED
- Question đã được assign cho học sinh
- Học sinh chưa làm

### SUBMITTED
- Học sinh đã submit answer lần đầu
- Có Practice record với status = SUBMITTED

### RESUBMITTED
- Học sinh đã làm lại (re-attempt)
- Có nhiều Practice records

### SKIPPED
- Học sinh đã skip question
- Không có Practice record

## Quan hệ (Relationships)

### N:1 với Exercise
- Question là instance của Exercise
- `question.exercise_id` → `exercise.id`
- Question lưu snapshot của Exercise tại thời điểm assign

### N:1 với Skill
- Question phải gắn với Skill (bắt buộc)
- `question.skill_id` → `skill.id`

### N:1 với Chapter
- Question có `chapter_id` để dễ query
- Lấy từ Skill: `question.chapter_id = skill.chapter_id`

### N:1 với StudentProfile
- Question có thể được assign cho học sinh
- `question.assigned_to_student_id` → `student_profile.id` (nullable)

### 1:N với Practice
- Một Question có thể có nhiều Practice records (re-attempt logic)
- `practice.question_id` → `question.id` (required, NOT NULL)
- Response data được lưu trong Practice, không phải Question

## Snapshot Logic

### Khi tạo Question từ Exercise
Question lưu snapshot của Exercise data tại thời điểm assign:
- `question.problem_text` = `exercise.problem_text` (snapshot)
- `question.solution_steps` = `exercise.solution_steps` (snapshot)
- `question.final_answer` = `exercise.final_answer` (snapshot)

### Lý do snapshot
- Đảm bảo Question không thay đổi nếu Exercise được update sau
- Học sinh luôn thấy đúng nội dung đã được assign
- Có thể track version của Exercise qua Question

## Response Data (Moved to Practice)

### Không lưu trong Question
- `student_answer`: Lưu trong `practice.student_answer`
- `is_correct`: Lưu trong `practice.is_correct`
- `duration_sec`: Lưu trong `practice.duration_sec`
- `submitted_at`: Lưu trong `practice.submitted_at`

### Session Info (Moved to Practice)
- `session_id`: Lưu trong `practice.session_id`
- `session_type`: Lưu trong `practice.session_type`

## Re-attempt Logic

### Một Question có nhiều Practices
- Học sinh có thể làm lại cùng một Question
- Mỗi lần làm lại tạo Practice record mới
- Question status: ASSIGNED → SUBMITTED (first practice) → RESUBMITTED (re-attempt)

## Business Rules

### 1. Required Exercise
- Question phải có `exercise_id` (NOT NULL)
- Foreign key constraint: `ON DELETE RESTRICT`

### 2. Required Skill
- Question phải có `skill_id` (NOT NULL)
- Foreign key constraint: `ON DELETE RESTRICT`

### 3. Chapter ID
- Question nên có `chapter_id` để optimize query
- Lấy từ Skill: `question.chapter_id = skill.chapter_id`

### 4. Status Transitions
- DRAFT → ASSIGNED: Khi assign cho học sinh
- ASSIGNED → SUBMITTED: Khi học sinh submit lần đầu
- SUBMITTED → RESUBMITTED: Khi học sinh làm lại
- ASSIGNED/SUBMITTED → SKIPPED: Khi học sinh skip

## API Response Example

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "exerciseId": "01234567-89ab-cdef-0123-456789abcdef",
  "skillId": "01234567-89ab-cdef-0123-456789abcdef",
  "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
  "assignedToStudentId": "01234567-89ab-cdef-0123-456789abcdef",
  "problemText": "Tính: 1/2 + 1/4",
  "problemLatex": "$\\frac{1}{2} + \\frac{1}{4}$",
  "solutionSteps": [
    {
      "step": 1,
      "description": "Quy đồng mẫu số",
      "calculation": "1/2 = 2/4"
    }
  ],
  "finalAnswer": "3/4",
  "difficultyLevel": 2,
  "questionType": "PRACTICE",
  "status": "ASSIGNED",
  "assignedAt": "2025-01-01T10:00:00Z",
  "createdAt": "2025-01-01T10:00:00Z",
  "updatedAt": "2025-01-01T10:00:00Z"
}
```

## Tài liệu liên quan

- [Exercise](./exercise.md)
- [Practice](./practice.md)
- [Skill](./skill.md)
- [Database Schema](../07-architecture-and-data/database-schema.md)

---

← Quay lại: [README.md](../README.md)

