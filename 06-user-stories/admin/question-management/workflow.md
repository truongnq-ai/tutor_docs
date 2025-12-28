# Workflow chi tiết
← Quay lại: [README.md](../README.md)

## Workflow: Exercise → Question → Practice → Session

```
Exercise APPROVED
  → Generate/Assign
    → Question ASSIGNED
      → (For Sessions) Practice Record created immediately (status = NOT_STARTED)
      → Student submits answer
        → Practice Record updated (status = SUBMITTED) hoặc tạo mới (standalone)
          → Update Question SUBMITTED (lần đầu) hoặc RESUBMITTED (re-attempt)
          → Update Mastery
```

**Lưu ý**: 
- Question chỉ lưu nội dung (snapshot Exercise), không lưu response data
- Practice lưu student response (student_answer, is_correct, duration_sec, submitted_at)
- Practice link với session qua session_id + session_type (polymorphic)
- **Option E**: Khi generate questions cho PracticeSession/MiniTest, Practice records được tạo ngay với `status = NOT_STARTED` để link questions với session
- Khi submit answer, Practice record được update (NOT_STARTED → SUBMITTED) thay vì tạo mới
- Một Question có thể có nhiều Practice records (re-attempt)

## Chi tiết từng bước

### Bước 1: Admin tạo Exercise → liên kết với Skill
- Admin tạo Exercise trong Admin Dashboard
- Gán `skill_id` (bắt buộc)
- Exercise có status: `PENDING`

### Bước 2: Exercise được review → APPROVED
- Admin/Expert review Exercise
- Nếu approve: `review_status = 'APPROVED'`, `quality_score >= 0.7`
- Exercise APPROVED mới được sử dụng để sinh Questions

### Bước 3: Adaptive Learning Engine query Exercises theo Skill
- Engine query Exercises có:
  - `skill_id` = skill cần luyện
  - `review_status = 'APPROVED'`
  - `difficulty_level` phù hợp với mastery của học sinh

### Bước 4: Exercise được assign cho học sinh → trở thành Question
- Engine gọi `POST /api/internal/learning/generate-questions`
- Service sinh Question từ Exercise:
  - Snapshot Exercise data (problem_text, solution_steps, etc.)
  - Customize nếu cần (thay số liệu - Phase 1: basic)
  - Set `assigned_to_student_id`, `status = 'ASSIGNED'`
- Question được trả về cho client (Student App)

### Bước 5a: Generate Questions cho Session → Practice records được tạo ngay (Option E)
- Khi tạo PracticeSession/MiniTest và generate questions:
  - Questions được generate từ Exercises APPROVED
  - **Practice records được tạo ngay** với:
    - `question_id` = Question.id (required)
    - `session_id` + `session_type` = Session info
    - `status = NOT_STARTED` (chưa submit)
    - `student_answer = null`, `is_correct = false`, `submitted_at = null`
  - Điều này đảm bảo questions được link với session ngay từ đầu
  - Query questions trong session: Luôn query qua Practice records (không cần fallback)

### Bước 5b: Học sinh làm Question → Practice record được update hoặc tạo mới
- Học sinh submit answer qua `POST /api/v1/practice/questions/{id}/submit` (với sessionId, sessionType)
- Service kiểm tra:
  - Nếu Practice record đã tồn tại với `status = NOT_STARTED` (từ Option E):
    - **Update** Practice record: `status = SUBMITTED`, `student_answer`, `is_correct`, `submitted_at`
  - Nếu không có Practice record (standalone practice):
    - **Tạo mới** Practice record với `status = SUBMITTED`
- Update Question status:
  - `ASSIGNED` → `SUBMITTED`: Nếu là Practice record đầu tiên cho Question
  - `SUBMITTED` → `RESUBMITTED`: Nếu đã có Practice records trước đó
- Transaction: Question update + Practice update/create + Mastery update (tất cả trong cùng transaction)

### Bước 6: Mastery của Skill được cập nhật
- PracticeService cập nhật Skill Mastery dựa trên kết quả
- Logic: Đúng +5~+8, Sai -5~-10 (theo Adaptive Learning Logic)

← Quay lại: [README.md](../README.md)

