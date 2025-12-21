# Business Rules và Validation
[← Quay lại Overview](README.md)

## Question Generation Rules

1. **Chỉ sinh Questions từ Exercises APPROVED**
   - Validation: `exercise.review_status = 'APPROVED'`
   - Error: `EXERCISE_NOT_APPROVED` nếu Exercise chưa approved

2. **Snapshot Exercise data tại thời điểm assign**
   - Question lưu snapshot đầy đủ: problem_text, solution_steps, final_answer, etc.
   - Đảm bảo Question không bị ảnh hưởng khi Exercise thay đổi sau đó

3. **Customization (Phase 1: Basic)**
   - Có thể thay số liệu trong problem_text (ví dụ: 12/18 → 24/36)
   - Giữ nguyên logic và solution steps
   - Lưu customized data trong `question.customized_data` (JSON)

4. **Validation trước khi assign**
   - Kiểm tra prerequisite skills (nếu Exercise có `prerequisite_skill_ids`)
   - Kiểm tra student mastery của prerequisite skills (phải >= 70)
   - Error: `PREREQUISITE_NOT_MET` nếu chưa đạt

## Question Assignment Rules

1. **Một Question chỉ assign cho một học sinh**
   - `assigned_to_student_id` là required khi assign
   - Status: `ASSIGNED` khi được assign

2. **Question status transitions**
   - `ASSIGNED` → `COMPLETED`: Khi học sinh submit answer
   - `ASSIGNED` → `SKIPPED`: Khi học sinh skip (Phase 2)
   - Không cho phép: `COMPLETED` → `ASSIGNED` (trừ khi retry - Phase 2)

3. **Validation khi submit**
   - Question phải có status `ASSIGNED`
   - `assigned_to_student_id` phải match với student hiện tại
   - Error: `QUESTION_NOT_ASSIGNED`, `QUESTION_ALREADY_COMPLETED`, `QUESTION_STUDENT_MISMATCH`

## Practice Link Rules

1. **Practice.question_id là optional (backward compatible)**
   - Practice records cũ không có `question_id` vẫn hoạt động
   - Practice records mới nên có `question_id` để link với Question

2. **Khi submit Question answer**
   - Tạo Practice record với `question_id` = Question.id
   - Update Question status: `ASSIGNED` → `COMPLETED`
   - Transaction: Question update + Practice create + Mastery update

3. **Khi xóa Question**
   - Practice records có `question_id` → set `question_id = NULL` (ON DELETE SET NULL)
   - Practice records vẫn được giữ lại để track lịch sử

## Data Consistency Rules

1. **Question snapshot data**
   - Question lưu snapshot Exercise data tại thời điểm assign
   - Không tự động sync khi Exercise thay đổi
   - Nếu cần update: Tạo Question mới từ Exercise mới

2. **Question → Practice link**
   - Practice.question_id phải reference đến Question tồn tại
   - Foreign key constraint: `ON DELETE SET NULL`
   - Index trên `practice.question_id` cho performance

[← Quay lại Overview](README.md)

