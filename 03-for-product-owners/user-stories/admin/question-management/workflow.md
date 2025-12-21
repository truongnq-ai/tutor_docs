# Workflow chi tiết
[← Quay lại Overview](README.md)

## Workflow: Exercise → Question → Practice

```
Exercise APPROVED
  → Generate/Assign
    → Question ASSIGNED
      → Student submits answer
        → Practice Record
          → Update Question COMPLETED
```

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

### Bước 5: Học sinh làm Question → Practice record được tạo
- Học sinh submit answer qua `POST /api/practice/questions/:id/submit`
- Service tạo Practice record:
  - Link với Question qua `question_id`
  - Lưu `is_correct`, `duration_sec`, `skill_id`
  - Update Question status: `ASSIGNED` → `COMPLETED`
- Transaction: Question submit → Practice record + Mastery update

### Bước 6: Mastery của Skill được cập nhật
- PracticeService cập nhật Skill Mastery dựa trên kết quả
- Logic: Đúng +5~+8, Sai -5~-10 (theo Adaptive Learning Logic)

[← Quay lại Overview](README.md)

