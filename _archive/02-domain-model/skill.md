# SKILL - DOMAIN MODEL

← Quay lại: [README.md](../README.md)

## Tổng quan

Skill là đơn vị năng lực atomic - đơn vị nhỏ nhất để đánh giá và luyện tập. Skill đóng vai trò là **trục AI / luyện tập** trong hệ thống Tutor.

Xem thêm: [Chapter vs Skill](../00-core-concepts/chapter-vs-skill.md)

## Thuộc tính (Attributes)

### Cơ bản
- **id** (UUID): Primary key, UUID v7
- **code** (String): Mã skill human-readable, format: "6.1.1", "7.2.3" (unique)
- **grade** (Integer): Lớp học (6 hoặc 7)
- **chapterId** (UUID): Foreign key đến Chapter
- **name** (String): Tên skill, ví dụ: "Cộng trừ phân số cùng mẫu"
- **description** (String, optional): Mô tả chi tiết skill cho AI context

### Prerequisites
- **prerequisiteIds** (List<UUID>): Danh sách UUID của các prerequisite skills
- Lưu dưới dạng JSON array trong database
- Skill không thể học nếu prerequisite có mastery < 70

## Mastery

### Định nghĩa
Mastery là mức độ thành thạo của học sinh với một skill, giá trị từ 0-100.

### Trạng thái theo Mastery

| Mastery | Trạng thái | Ý nghĩa |
|---------|-----------|---------|
| < 40 | Yếu | Chưa nắm được kiến thức |
| 40-69 | Chưa vững | Cần luyện tập thêm |
| 70-89 | Đạt | Đã nắm kiến thức |
| ≥ 90 | Thành thạo | Có thể nâng cao |

### Cập nhật Mastery
- Sau mỗi practice: +5~+8 (đúng) hoặc -5~-10 (sai)
- Sau mini test: Tăng/giảm dựa trên kết quả
- Bounds: 0 ≤ mastery ≤ 100

Xem chi tiết: [Mastery Calculation](../03-product-rules/mastery-calculation.md)

## Quan hệ (Relationships)

### N:1 với Chapter
- Mỗi Skill thuộc về một Chapter
- `skill.chapter_id` → `chapter.id`
- Query: `SELECT * FROM skill WHERE chapter_id = ?`

### 1:N với Exercise
- Một Skill có nhiều Exercises
- `exercise.skill_id` → `skill.id` (bắt buộc)
- Exercise phải gắn với Skill

### 1:N với Question
- Một Skill có nhiều Questions
- `question.skill_id` → `skill.id` (bắt buộc)
- Question phải gắn với Skill

### 1:N với Practice
- Một Skill có nhiều Practice records
- `practice.skill_id` → `skill.id` (bắt buộc)
- Practice phải gắn với Skill

### Prerequisites (Self-referential)
- Skill có thể có nhiều prerequisite skills
- Lưu trong `prerequisite_ids` (JSON array)
- Skill không thể học nếu prerequisite có mastery < 70

## Skill Graph

### Định nghĩa
Skill Graph là đồ thị có hướng biểu diễn mối quan hệ prerequisite giữa các skills.

### Ví dụ
```
Skill A (prerequisite: [])
  └─> Skill B (prerequisite: [A])
      └─> Skill C (prerequisite: [B])
      └─> Skill D (prerequisite: [B])
```

### Sử dụng trong Adaptive Learning
- Kiểm tra prerequisite trước khi recommend skill
- Truy ngược prerequisite khi học sinh sai liên tục
- Xây dựng learning path dựa trên skill graph

## Role trong AI

### 1. Practice Generation
- AI Service sinh bài tập theo Skill và độ khó
- Request: `{skill_id, difficulty_level, count}`
- Response: List of Questions

### 2. Adaptive Learning
- AI chọn Skill cần luyện tập dựa trên mastery
- Kiểm tra prerequisite skills
- Điều chỉnh độ khó theo Skill

### 3. Error Analysis
- Phân tích kết quả Mini Test theo Skill
- Xác định Skill nào học sinh làm đúng/sai
- Đề xuất luyện tập lại Skill yếu

## Business Rules

### 1. Prerequisite Check
- Skill không thể học nếu prerequisite có mastery < 70
- Hệ thống tự động quay về luyện prerequisite nếu cần

### 2. Code Format
- Format: `"{grade}.{chapter_order}.{skill_order}"`
- Ví dụ: "6.1.1", "6.1.2", "7.3.5"
- Code phải unique toàn hệ thống

### 3. Mastery Bounds
- Mastery không thể < 0 hoặc > 100
- Clamp về 0 hoặc 100 nếu vượt quá

### 4. Required Fields
- `skill_id` bắt buộc cho Exercise, Question, Practice
- Không thể tạo Exercise/Question/Practice mà không có Skill

## API Response Example

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "code": "6.1.1",
  "grade": 6,
  "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
  "name": "Cộng trừ phân số cùng mẫu",
  "description": "Thực hiện phép cộng và trừ các phân số có cùng mẫu số",
  "prerequisiteIds": [],
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

## Tài liệu liên quan

- [Chapter vs Skill](../00-core-concepts/chapter-vs-skill.md)
- [Mastery Calculation](../03-product-rules/mastery-calculation.md)
- [Learning Plan Rules](../03-product-rules/learning-plan-rules.md)
- [Database Schema](../07-architecture-and-data/database-schema.md)

---

← Quay lại: [README.md](../README.md)

