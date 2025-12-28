# EXERCISE - DOMAIN MODEL

← Quay lại: [README.md](../README.md)

## Tổng quan

Exercise là bài tập template được tạo bởi Admin hoặc AI Service. Sau khi được approve, Exercise có thể được dùng để generate Questions cho học sinh.

## Thuộc tính (Attributes)

### Cơ bản
- **id** (UUID): Primary key, UUID v7
- **skillId** (UUID): Foreign key đến Skill (bắt buộc)
- **chapterId** (UUID): Foreign key đến Chapter (lấy từ Skill để dễ query)
- **grade** (Integer): Lớp học (6 hoặc 7), lấy từ Skill

### Nội dung
- **problemText** (String): Nội dung câu hỏi (text)
- **problemLatex** (String, optional): Nội dung câu hỏi (LaTeX format)
- **problemImageUrl** (String, optional): URL hình ảnh câu hỏi
- **solutionSteps** (JSONB): Các bước giải chi tiết
- **finalAnswer** (String): Đáp án cuối cùng
- **commonMistakes** (JSONB, optional): Các lỗi sai phổ biến
- **hints** (JSONB, optional): Gợi ý từng bước

### Cấu hình
- **difficultyLevel** (Integer): Độ khó (1-5)
- **reviewStatus** (String): Trạng thái review (PENDING, APPROVED, REJECTED)

### Metadata
- **createdAt** (Timestamp): Thời gian tạo
- **updatedAt** (Timestamp): Thời gian cập nhật

## Quan hệ (Relationships)

### N:1 với Skill
- Exercise phải gắn với một Skill (bắt buộc)
- `exercise.skill_id` → `skill.id`
- Skill xác định nội dung và độ khó của Exercise

### N:1 với Chapter
- Exercise có `chapter_id` để dễ query
- Lấy từ Skill: `exercise.chapter_id = skill.chapter_id`
- Không bắt buộc set trực tiếp, nhưng nên có để optimize query

### 1:N với Question
- Một Exercise có thể sinh nhiều Questions
- `question.exercise_id` → `exercise.id`
- Question lưu snapshot của Exercise tại thời điểm assign

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

## Review Status

### PENDING
- Exercise mới được tạo, chưa được review
- Không thể dùng để generate Questions

### APPROVED
- Exercise đã được Admin approve
- Có thể dùng để generate Questions

### REJECTED
- Exercise bị reject, không đạt chất lượng
- Không thể dùng để generate Questions

## Business Rules

### 1. Required Skill
- Exercise phải gắn với Skill (bắt buộc)
- Không thể tạo Exercise mà không có Skill

### 2. Chapter ID
- Exercise nên có `chapter_id` để optimize query
- Lấy từ Skill: `exercise.chapter_id = skill.chapter_id`

### 3. Review Before Use
- Chỉ Exercise có `review_status = APPROVED` mới có thể dùng để generate Questions
- Exercise PENDING hoặc REJECTED không thể generate Questions

### 4. Difficulty Level
- Difficulty level: 1 (dễ nhất) đến 5 (khó nhất)
- Phải phù hợp với Skill level

## API Response Example

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "skillId": "01234567-89ab-cdef-0123-456789abcdef",
  "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
  "grade": 6,
  "problemText": "Tính: 1/2 + 1/4",
  "problemLatex": "$\\frac{1}{2} + \\frac{1}{4}$",
  "problemImageUrl": null,
  "solutionSteps": [
    {
      "step": 1,
      "description": "Quy đồng mẫu số",
      "calculation": "1/2 = 2/4"
    },
    {
      "step": 2,
      "description": "Cộng tử số",
      "calculation": "2/4 + 1/4 = 3/4"
    }
  ],
  "finalAnswer": "3/4",
  "commonMistakes": [
    {
      "mistake": "Cộng tử và mẫu",
      "explanation": "Sai: 1/2 + 1/4 = 2/6"
    }
  ],
  "hints": [
    "Quy đồng mẫu số trước",
    "Cộng tử số, giữ nguyên mẫu số"
  ],
  "difficultyLevel": 2,
  "reviewStatus": "APPROVED",
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

## Tài liệu liên quan

- [Question](./question.md)
- [Practice](./practice.md)
- [Database Schema](../07-architecture-and-data/database-schema.md)

---

← Quay lại: [README.md](../README.md)

