# Business Rules và Validation
← Quay lại: [README.md](../README.md)

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
   - `DRAFT` → `ASSIGNED`: Khi Question được assign cho học sinh
   - `ASSIGNED` → `SUBMITTED`: Khi học sinh submit answer lần đầu (tạo Practice record đầu tiên)
   - `SUBMITTED` → `RESUBMITTED`: Khi học sinh submit lại (tạo Practice record mới)
   - `ASSIGNED` → `SKIPPED`: Khi học sinh skip (Phase 2)
   - Không cho phép: `SUBMITTED` → `ASSIGNED` (trừ khi admin reset - Phase 2)

3. **Validation khi submit**
   - Question phải có status `ASSIGNED`
   - `assigned_to_student_id` phải match với student hiện tại
   - Error: `QUESTION_NOT_ASSIGNED`, `QUESTION_ALREADY_COMPLETED`, `QUESTION_STUDENT_MISMATCH`

## Practice Link Rules

1. **Practice.question_id là bắt buộc (required)**
   - Tất cả Practice records phải có `question_id` (non-nullable)
   - Validation: Return error nếu `question_id` null khi submit practice

2. **Practice Status (Option E Implementation)**
   - `NOT_STARTED`: Practice record được tạo khi generate questions cho session (chưa submit)
   - `SUBMITTED`: Practice record đã được submit với answer
   - `CANCELLED`: Practice record bị cancel khi session bị cancel
   - Status transitions:
     - `NOT_STARTED` → `SUBMITTED`: Khi học sinh submit answer
     - `NOT_STARTED` → `CANCELLED`: Khi session bị cancel
     - Không cho phép: `SUBMITTED` → `NOT_STARTED` hoặc `CANCELLED`

3. **Practice Record Creation (Option E)**
   - **Khi generate questions cho PracticeSession/MiniTest:**
     - Practice records được tạo ngay với `status = NOT_STARTED`
     - Đảm bảo questions được link với session ngay từ đầu
     - Query questions trong session: Luôn query qua Practice records (không cần fallback)
   - **Khi submit answer:**
     - Nếu Practice record đã tồn tại với `status = NOT_STARTED`: **Update** thay vì tạo mới
     - Nếu không có Practice record (standalone): **Tạo mới** với `status = SUBMITTED`

4. **Khi submit Question answer**
   - Kiểm tra Practice record đã tồn tại (Option E):
     - Nếu có với `status = NOT_STARTED`: Update → `status = SUBMITTED`
     - Nếu không: Tạo mới với `status = SUBMITTED`
   - Practice record chứa:
     - `question_id` = Question.id (required)
     - `session_id` + `session_type` (nếu có session)
     - `student_answer`, `is_correct`, `duration_sec`, `submitted_at`
   - Update Question status:
     - `ASSIGNED` → `SUBMITTED`: Nếu là Practice record đầu tiên cho Question
     - `SUBMITTED` → `RESUBMITTED`: Nếu đã có Practice records trước đó
   - Transaction: Question update + Practice update/create + Mastery update (tất cả trong cùng transaction)

5. **Re-attempt logic**
   - Một Question có thể có nhiều Practice records
   - Mỗi Practice record đại diện cho một lần attempt
   - Latest Practice record được dùng để tính điểm trong session

6. **Session linking**
   - Practice link với session qua `session_id` + `session_type`
   - Session types: `PRACTICE`, `PRACTICE_SESSION`, `MINI_TEST`, `TEST_30MIN`, etc.
   - Query Questions trong session: **Luôn query qua Practice records** (không cần fallback logic)
   - Session cancellation: Mark tất cả Practice records với `status = CANCELLED`

## Data Consistency Rules

1. **Question snapshot data**
   - Question lưu snapshot Exercise data tại thời điểm assign
   - Không tự động sync khi Exercise thay đổi
   - Nếu cần update: Tạo Question mới từ Exercise mới

2. **Question → Practice link**
   - Practice.question_id phải reference đến Question tồn tại (required, non-nullable)
   - Foreign key constraint: `ON DELETE RESTRICT` (không cho phép xóa Question nếu có Practices)
   - Index trên `practice.question_id` cho performance
   - Index trên `(session_id, session_type)` cho query Questions trong session

← Quay lại: [README.md](../README.md)

