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

**Định nghĩa**: Practice item instance được sinh từ Exercise khi assign cho học sinh.

**Đặc điểm**:
- Entity riêng trong database
- Được sinh từ Exercise (snapshot Exercise data tại thời điểm assign)
- Có thể customize (thay số liệu) nhưng giữ nguyên logic
- Liên kết với Exercise qua `exercise_id`
- Liên kết với Skill qua `skill_id`
- Liên kết với Student qua `assigned_to_student_id`
- Có status: `ASSIGNED`, `COMPLETED`, `SKIPPED`
- Track student response: `student_answer`, `is_correct`, `time_taken_sec`

**Vai trò**: Bài tập thực tế được assign cho học sinh, bridge giữa Exercise (template) và Practice (result)

## Practice (Luyện tập)

**Định nghĩa**: Result record lưu kết quả làm bài của học sinh.

**Đặc điểm**:
- Entity trong database (đã có sẵn)
- Lưu kết quả: `is_correct`, `duration_sec`, `skill_id`
- **Mới thêm**: `question_id` (nullable) để link với Question
- Liên kết với Student/Trial qua `student_id`/`trial_id`

**Vai trò**: Record kết quả làm bài, link với Question để track đầy đủ workflow

[← Quay lại Overview](README.md)

