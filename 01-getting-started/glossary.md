# GLOSSARY - THUẬT NGỮ

## Thuật ngữ chung

**Tutor**: Hệ thống gia sư Toán AI

**MVP**: Minimum Viable Product - Sản phẩm tối thiểu khả thi

**Phase 1**: Giai đoạn 1 của dự án (MVP)

## Thuật ngữ kỹ thuật

**Skill**: Kỹ năng toán học, ví dụ: "Cộng trừ phân số"

**Skill Graph**: Đồ thị biểu diễn mối quan hệ giữa các skills (prerequisites)

**Mastery**: Mức độ thành thạo của học sinh với một skill (0-100)

**Practice**: Record kết quả làm bài của học sinh cho một Question. Lưu student response (student_answer, is_correct, duration_sec, submitted_at), session info (session_id + session_type), và link với Question. Một Question có thể có nhiều Practice records (re-attempt logic).

**Exercise**: Bài tập template được tạo bởi Admin hoặc AI Service. Sau khi được approve, Exercise có thể được dùng để generate Questions.

**Question**: Instance của Exercise được assign cho học sinh. Chứa nội dung câu hỏi (snapshot Exercise data tại thời điểm assign), status (DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED), nhưng KHÔNG lưu response data (đã chuyển sang Practice table) và KHÔNG có session_id (được quản lý qua Practice records).

**Adaptive Learning**: Học tập thích ứng - hệ thống tự động điều chỉnh độ khó và nội dung theo năng lực học sinh

**Tutor Mode**: Chế độ gia sư - học sinh có thể chụp ảnh hoặc nhập bài toán để được giải thích từng bước

## Thuật ngữ người dùng

**Student**: Học sinh - người sử dụng ứng dụng mobile

**Parent**: Phụ huynh - người sử dụng dashboard web để theo dõi tiến độ

**Admin**: Quản trị viên - người quản lý hệ thống và nội dung

## Thuật ngữ API

**Core Service**: Backend service chính (Java Spring Boot)

**AI Service**: Service xử lý AI (Python FastAPI) - OCR, giải toán, gợi ý

**Internal API**: API nội bộ giữa các services

**Public API**: API công khai cho frontend

---

← Quay lại: [README.md](../README.md)

