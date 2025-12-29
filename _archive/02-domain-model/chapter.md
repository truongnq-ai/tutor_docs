# CHAPTER - DOMAIN MODEL

← Quay lại: [README.md](../README.md)

## Tổng quan

Chapter là đơn vị tổ chức nội dung học tập theo chương trình giáo dục. Chapter đóng vai trò là **trục sư phạm / UX** trong hệ thống Tutor.

Xem thêm: [Chapter vs Skill](../00-core-concepts/chapter-vs-skill.md)

## Thuộc tính (Attributes)

### Cơ bản
- **id** (UUID): Primary key, UUID v7
- **grade** (Integer): Lớp học (6 hoặc 7)
- **code** (String): Mã chương unique toàn hệ thống, format: "6.3"
- **name** (String): Tên chương, ví dụ: "Phân số", "Số nguyên"
- **description** (String, optional): Mô tả chi tiết chương học

### Mini Test Configuration
- **miniTestTotalQuestions** (Integer, nullable): Số câu hỏi trong Mini Test (mặc định: 6)
- **miniTestTimeLimitSec** (Integer, nullable): Thời gian làm bài (mặc định: 600 giây = 10 phút)
- **miniTestPassingScore** (Integer, nullable): Điểm đạt (mặc định: 70)
- **miniTestRequiredPracticeCount** (Integer, nullable): Số bài practice cần hoàn thành để unlock Mini Test (mặc định: 10)

### Metadata
- **createdAt** (Timestamp): Thời gian tạo
- **updatedAt** (Timestamp): Thời gian cập nhật

## Trạng thái (States)

Chapter có các trạng thái progress dựa trên mastery của các Skills trong Chapter:

### 1. NEW
- **Điều kiện**: Chưa có practice nào trong Chapter
- **Ý nghĩa**: Chapter chưa được bắt đầu
- **Hiển thị**: "Chưa bắt đầu"

### 2. IN_PROGRESS
- **Điều kiện**: 
  - Đã có ít nhất 1 practice trong Chapter
  - Completion percentage < 100%
- **Ý nghĩa**: Đang học Chapter này
- **Hiển thị**: "Đang học" + completion percentage

### 3. MASTERED
- **Điều kiện**:
  - Completion percentage = 100% (tất cả Skills có mastery ≥ 70)
  - Đã hoàn thành Mini Test (nếu có)
- **Ý nghĩa**: Đã thành thạo Chapter này
- **Hiển thị**: "Đã hoàn thành"

## Progress Tracking

### Completion Percentage
```
completion_percentage = (mastered_skills / total_skills) * 100
```
- **mastered_skills**: Số Skills có mastery ≥ 70
- **total_skills**: Tổng số Skills trong Chapter

### Average Mastery
```
average_mastery = sum(skill_mastery) / total_skills
```
- Tính trung bình mastery của tất cả Skills trong Chapter

### Practice Count
- Đếm tổng số practice records trong Chapter
- Dùng để kiểm tra unlock condition cho Mini Test

## Quan hệ (Relationships)

### 1:N với Skill
- Một Chapter chứa nhiều Skills
- Skill có `chapter_id` (FK) để link với Chapter
- Query: `SELECT * FROM skill WHERE chapter_id = ?`

### 1:N với Exercise
- Một Chapter có nhiều Exercises
- Exercise có `chapter_id` (FK) để dễ query
- Exercise lấy `chapter_id` từ Skill (skill.chapter_id)

### 1:N với Question
- Một Chapter có nhiều Questions
- Question có `chapter_id` (FK) để dễ query
- Question lấy `chapter_id` từ Skill (skill.chapter_id)

## Mini Test Configuration

### Default Values
Nếu các config fields là null, sử dụng giá trị mặc định:
- `miniTestTotalQuestions`: 6
- `miniTestTimeLimitSec`: 600 (10 phút)
- `miniTestPassingScore`: 70
- `miniTestRequiredPracticeCount`: 10

### Override per Chapter
Mỗi Chapter có thể override các giá trị mặc định:
- Ví dụ: Chapter khó có thể có `miniTestTotalQuestions = 7`
- Ví dụ: Chapter dễ có thể có `miniTestTimeLimitSec = 300` (5 phút)

## Business Rules

### 1. Unique Constraint
- `(grade, name)` phải unique: Mỗi grade không thể có 2 Chapter cùng tên
- `code` phải unique toàn hệ thống: Format "6.3" không thể trùng

### 2. Code Format
- Format: `"{grade}.{order}"`
- Ví dụ: "6.1", "6.2", "7.3"
- Order được tính theo thứ tự trong chương trình

### 3. Progress Calculation
- Progress được tính từ Skills trong Chapter
- Không có progress riêng cho Chapter (chỉ là aggregate)

### 4. Mini Test Unlock
- Unlock condition: `practice_count >= miniTestRequiredPracticeCount`
- Practice count được đếm từ tất cả Skills trong Chapter

## API Response Example

```json
{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "grade": 6,
  "code": "6.3",
  "name": "Phân số",
  "description": "Chương học về phân số, bao gồm so sánh, cộng trừ, nhân chia",
  "miniTestTotalQuestions": 6,
  "miniTestTimeLimitSec": 600,
  "miniTestPassingScore": 70,
  "miniTestRequiredPracticeCount": 10,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

## Tài liệu liên quan

- [Chapter vs Skill](../00-core-concepts/chapter-vs-skill.md)
- [Chapter Progress Rules](../03-product-rules/chapter-progress-rules.md)
- [Mini Test Rules](../03-product-rules/mini-test-rules.md)
- [Database Schema](../07-architecture-and-data/database-schema.md)

---

← Quay lại: [README.md](../README.md)

