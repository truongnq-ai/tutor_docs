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

