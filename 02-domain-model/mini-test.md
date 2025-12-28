# MINI TEST - DOMAIN MODEL

← Quay lại: [README.md](../README.md)

## Tổng quan

Mini Test là bài kiểm tra nhỏ theo Chapter - gồm 5-7 câu hỏi để kiểm tra kiến thức của học sinh trong một Chapter. Mini Test có scope theo Chapter nhưng phân tích kết quả theo Skill.

## Thuộc tính (Attributes)

### Cơ bản
- **id** (UUID): Primary key, UUID v7
- **studentId** (UUID): Foreign key đến StudentProfile
- **chapterId** (UUID): Foreign key đến Chapter (scope của Mini Test)

### Kết quả
- **score** (Integer): Điểm số (0-100)
- **details** (JSON): Chi tiết kết quả theo Skill
  - Skills làm đúng
  - Skills làm sai
  - Phân tích từng Skill

### Cấu hình (từ Chapter)
- **totalQuestions** (Integer): Số câu hỏi (5-7, mặc định 6)
- **timeLimitSec** (Integer): Thời gian làm bài (mặc định 600 giây = 10 phút)
- **passingScore** (Integer): Điểm đạt (mặc định 70)

### Metadata
- **createdAt** (Timestamp): Thời gian làm bài

## Scope: Theo Chapter

### Mini Test được tổ chức theo Chapter
- Mỗi Mini Test thuộc về một Chapter
- Unlock condition: Hoàn thành ≥10 bài practice trong Chapter
- Hiển thị cho học sinh: "Mini Test - Phân số"

### Cấu hình ở Chapter level
- Số câu hỏi: `chapter.mini_test_total_questions` (mặc định 6)
- Thời gian: `chapter.mini_test_time_limit_sec` (mặc định 600)
- Điểm đạt: `chapter.mini_test_passing_score` (mặc định 70)
- Unlock condition: `chapter.mini_test_required_practice_count` (mặc định 10)

## Phân tích: Theo Skill

### Kết quả được phân tích chi tiết theo Skill
- Mỗi câu hỏi trong Mini Test gắn với một Skill
- Kết quả được tổng hợp theo Skill:
  - Skills làm đúng
  - Skills làm sai
  - Số câu đúng/sai cho mỗi Skill

### Ví dụ details JSON
```json
{
  "skills": [
    {
      "skillId": "01234567-89ab-cdef-0123-456789abcdef",
      "skillName": "Cộng trừ phân số cùng mẫu",
      "correctCount": 2,
      "totalCount": 2,
      "mastery": 85
    },
    {
      "skillId": "01234567-89ab-cdef-0123-456789abcdef",
      "skillName": "Nhân chia phân số",
      "correctCount": 1,
      "totalCount": 2,
      "mastery": 50
    }
  ],
  "totalCorrect": 3,
  "totalQuestions": 6,
  "score": 50
}
```

## Unlock Condition

### Điều kiện mở khóa Mini Test
- Hoàn thành ≥10 bài practice trong Chapter
- Practice count được đếm từ tất cả Skills trong Chapter
- Config: `chapter.mini_test_required_practice_count` (mặc định 10)

### Logic kiểm tra
```pseudo
practice_count = COUNT(practice WHERE practice.skill_id IN (
  SELECT id FROM skill WHERE chapter_id = ?
))

if practice_count >= chapter.mini_test_required_practice_count:
    unlock_mini_test()
```

## Question Selection

### Chọn câu hỏi từ Skills trong Chapter
- Mini Test gồm 5-7 câu hỏi
- Câu hỏi được chọn từ các Skills trong Chapter
- Phân bổ:
  - 60-70%: Skills chính trong Chapter
  - 30-40%: Prerequisite skills (nếu có)

### Ví dụ
```
Chapter: "Phân số" (6 skills)
Mini Test: 6 câu hỏi
├── 4 câu: Skills chính trong Chapter
└── 2 câu: Prerequisite skills
```

## Scoring

### Tính điểm
- Điểm = (số câu đúng / tổng số câu) * 100
- Điểm đạt: ≥70% (có thể config ở Chapter level)

### Ảnh hưởng đến Mastery
- Nếu điểm ≥70%:
  - Tăng mastery cho các Skills làm đúng
  - Cho phép chuyển Chapter tiếp theo
- Nếu điểm <70%:
  - Giảm mastery cho các Skills làm sai
  - Đề xuất luyện tập lại Skills yếu

Xem chi tiết: [Mastery Calculation](../03-product-rules/mastery-calculation.md)

## Business Rules

### 1. One Mini Test per Chapter
- Mỗi học sinh chỉ có thể làm một Mini Test cho mỗi Chapter
- Có thể làm lại nếu điểm <70%

### 2. Unlock Condition
- Phải hoàn thành đủ số practice trong Chapter
- Practice count được đếm từ tất cả Skills trong Chapter

### 3. Question Count
- Số câu hỏi: 5-7 (mặc định 6)
- Có thể config ở Chapter level

### 4. Time Limit
- Thời gian làm bài: 10 phút (mặc định)
- Có thể config ở Chapter level

### 5. Passing Score
- Điểm đạt: 70% (mặc định)
- Có thể config ở Chapter level

## API Response Example

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "studentId": "01234567-89ab-cdef-0123-456789abcdef",
  "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
  "score": 83,
  "details": {
    "skills": [
      {
        "skillId": "01234567-89ab-cdef-0123-456789abcdef",
        "skillName": "Cộng trừ phân số cùng mẫu",
        "correctCount": 2,
        "totalCount": 2
      },
      {
        "skillId": "01234567-89ab-cdef-0123-456789abcdef",
        "skillName": "Nhân chia phân số",
        "correctCount": 3,
        "totalCount": 4
      }
    ],
    "totalCorrect": 5,
    "totalQuestions": 6
  },
  "totalQuestions": 6,
  "timeLimitSec": 600,
  "passingScore": 70,
  "createdAt": "2025-01-01T10:30:00Z"
}
```

## Tài liệu liên quan

- [Chapter](./chapter.md)
- [Skill](./skill.md)
- [Mini Test Rules](../03-product-rules/mini-test-rules.md)
- [Mastery Calculation](../03-product-rules/mastery-calculation.md)
- [Database Schema](../07-architecture-and-data/database-schema.md)

---

← Quay lại: [README.md](../README.md)

