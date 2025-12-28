# PRACTICE - DOMAIN MODEL

← Quay lại: [README.md](../README.md)

## Tổng quan

Practice là record kết quả làm bài của học sinh cho một Question. Practice lưu student response, session info, và link với Question.

## Thuộc tính (Attributes)

### Cơ bản
- **id** (UUID): Primary key, UUID v7
- **studentId** (UUID, nullable): Foreign key đến StudentProfile (nếu là user đã link)
- **trialId** (UUID, nullable): Foreign key đến StudentTrialProfile (nếu là trial user)
- **skillId** (UUID): Foreign key đến Skill (bắt buộc)
- **questionId** (UUID): Foreign key đến Question (bắt buộc, NOT NULL)

### Session Info
- **sessionId** (UUID, nullable): ID của session (polymorphic relationship)
- **sessionType** (String, nullable): Loại session (PRACTICE, PRACTICE_SESSION, MINI_TEST, etc.)
- Session info được quản lý qua `session_id + session_type`

### Response Data
- **studentAnswer** (String): Câu trả lời của học sinh
- **isCorrect** (Boolean): Đúng hay sai
- **durationSec** (Integer): Thời gian làm bài (giây)
- **submittedAt** (Timestamp): Thời gian submit

### Status
- **status** (String): Trạng thái practice (NOT_STARTED, SUBMITTED, CANCELLED)
- **difficultyLevel** (Integer): Độ khó (1-5)

### Metadata
- **createdAt** (Timestamp): Thời gian tạo

## Quan hệ (Relationships)

### N:1 với StudentProfile (polymorphic)
- Practice có thể thuộc về StudentProfile (user đã link) hoặc StudentTrialProfile (trial user)
- Constraint: `(student_id IS NOT NULL AND trial_id IS NULL) OR (student_id IS NULL AND trial_id IS NOT NULL)`

### N:1 với Skill
- Practice phải gắn với Skill (bắt buộc)
- `practice.skill_id` → `skill.id`
- Dùng để tính mastery và phân tích kết quả

### N:1 với Question
- Practice phải gắn với Question (bắt buộc, NOT NULL)
- `practice.question_id` → `question.id`
- Một Question có thể có nhiều Practice records (re-attempt logic)

### N:1 với Session (polymorphic)
- Practice link với session qua `session_id + session_type`
- Session types: PRACTICE, PRACTICE_SESSION, MINI_TEST, TEST_30MIN, etc.
- Constraint: `(session_id IS NULL AND session_type IS NULL) OR (session_id IS NOT NULL AND session_type IS NOT NULL)`

## Status Flow

### NOT_STARTED
- Practice record được tạo ngay khi generate questions cho session
- Chưa có response data
- `student_answer`, `is_correct`, `submitted_at` = null

### SUBMITTED
- Học sinh đã submit answer
- Có đầy đủ response data
- `student_answer`, `is_correct`, `submitted_at` được set

### CANCELLED
- Session bị hủy
- Practice record được đánh dấu CANCELLED
- Không tính vào mastery

## Re-attempt Logic

### Một Question có nhiều Practices
- Học sinh có thể làm lại cùng một Question
- Mỗi lần làm lại tạo Practice record mới
- Question status: ASSIGNED → SUBMITTED (first practice) → RESUBMITTED (re-attempt)

### Ví dụ
```
Question: "Tính 1/2 + 1/4"
├── Practice 1: student_answer = "2/6", is_correct = false, status = SUBMITTED
├── Practice 2: student_answer = "3/4", is_correct = true, status = SUBMITTED
└── Practice 3: student_answer = "3/4", is_correct = true, status = SUBMITTED
```

## Session Types

### PRACTICE
- Practice đơn lẻ, không thuộc session nào
- `session_id = null`, `session_type = null`

### PRACTICE_SESSION
- Practice trong một practice session
- `session_type = "PRACTICE_SESSION"`

### MINI_TEST
- Practice trong mini test
- `session_type = "MINI_TEST"`

### TEST_30MIN, TEST_45MIN, etc.
- Practice trong các bài test dài hơn
- `session_type = "TEST_30MIN"`, etc.

## Business Rules

### 1. Required Question
- Practice phải có `question_id` (NOT NULL)
- Foreign key constraint: `ON DELETE RESTRICT` (data consistency)

### 2. Student or Trial
- Practice phải thuộc về StudentProfile hoặc StudentTrialProfile
- Constraint: `(student_id IS NOT NULL AND trial_id IS NULL) OR (student_id IS NULL AND trial_id IS NOT NULL)`

### 3. Session Consistency
- Nếu có `session_id` thì phải có `session_type`
- Constraint: `(session_id IS NULL AND session_type IS NULL) OR (session_id IS NOT NULL AND session_type IS NOT NULL)`

### 4. Status Transitions
- NOT_STARTED → SUBMITTED: Khi submit answer
- NOT_STARTED → CANCELLED: Khi cancel session
- SUBMITTED → không thể thay đổi (immutable)

### 5. Mastery Update
- Mastery được cập nhật sau mỗi Practice với status = SUBMITTED
- Practice với status = CANCELLED không tính vào mastery

## API Response Example

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "studentId": "01234567-89ab-cdef-0123-456789abcdef",
  "trialId": null,
  "skillId": "01234567-89ab-cdef-0123-456789abcdef",
  "questionId": "01234567-89ab-cdef-0123-456789abcdef",
  "sessionId": "01234567-89ab-cdef-0123-456789abcdef",
  "sessionType": "PRACTICE_SESSION",
  "status": "SUBMITTED",
  "studentAnswer": "3/4",
  "isCorrect": true,
  "durationSec": 45,
  "submittedAt": "2025-01-01T10:30:00Z",
  "difficultyLevel": 2,
  "createdAt": "2025-01-01T10:29:15Z"
}
```

## Tài liệu liên quan

- [Question](./question.md)
- [Skill](./skill.md)
- [Mastery Calculation](../03-product-rules/mastery-calculation.md)
- [Database Schema](../07-architecture-and-data/database-schema.md)

---

← Quay lại: [README.md](../README.md)

