# DATABASE SCHEMA

Tài liệu này mô tả chi tiết database schema của hệ thống Tutor.

## ERD & DDL

Xem chi tiết: [Database Design](../04-for-developers/architecture/database-design.md)

## Migration

Xem chi tiết: [Migration & Seeding Guide](../04-for-developers/architecture/database-design.md)

## Entities chính

- **User**: Tài khoản người dùng (Student, Parent, Admin)
- **Skill**: Kỹ năng toán học
- **Exercise**: Bài tập template (được tạo bởi Admin hoặc AI Service)
- **Question**: Instance của Exercise được assign cho học sinh. Chứa nội dung câu hỏi (snapshot Exercise), status, nhưng KHÔNG lưu response data và session info (đã chuyển sang Practice).
- **Practice**: Record kết quả làm bài của học sinh. Lưu response data (student_answer, is_correct, duration_sec, submitted_at), session info (session_id + session_type), và link với Question (required). Một Question có thể có nhiều Practice records (re-attempt logic).

## Model Changes (2025-12-26)

**Question-Practice-Session Model Refactoring:**
- Question: Removed `session_id`, response data fields (student_answer, is_correct, time_taken_sec, submitted_at)
- Question status: Updated to `DRAFT`, `ASSIGNED`, `SUBMITTED`, `RESUBMITTED`, `SKIPPED` (replaced `COMPLETED`)
- Practice: `question_id` is now required (NOT NULL), added `session_id` + `session_type` (polymorphic relationship), added response data fields
- Practice: Supports 1:N relationship with Question (re-attempt logic)

Xem chi tiết thay đổi: [Database Design](../04-for-developers/architecture/database-design.md#6-lịch-sử-thay-đổi)

---

← Quay lại: [README.md](../README.md)

