# GLOSSARY - THUẬT NGỮ

← Quay lại: [README.md](../README.md)

## Thuật ngữ chung

**Tutor**: Hệ thống gia sư Toán AI

**MVP**: Minimum Viable Product - Sản phẩm tối thiểu khả thi

**Phase 1**: Giai đoạn 1 của dự án (MVP)

## Thuật ngữ kỹ thuật

**Chapter**: Chương học - đơn vị tổ chức nội dung học tập theo chương trình. Ví dụ: "Phân số" (lớp 6), "Số nguyên" (lớp 7). Chapter dùng cho:
- Điều hướng học tập và lộ trình
- Phạm vi Mini Test
- Báo cáo tiến độ và progress tracking

**Skill**: Kỹ năng toán học atomic - đơn vị năng lực nhỏ nhất. Ví dụ: "Cộng trừ phân số", "Nhân chia phân số". Skill dùng cho:
- Practice (luyện tập)
- Mastery tracking (theo dõi mức độ thành thạo)
- Adaptive learning logic (logic học tập thích ứng)
- Phân tích sai lầm

**Chapter vs Skill**:
- **Chapter**: Trục học tập - tổ chức nội dung theo chương trình, dùng cho navigation và reporting
- **Skill**: Trục AI - đơn vị năng lực atomic, dùng cho practice và adaptive logic
- Một Chapter chứa nhiều Skills
- Mini Test được tổ chức theo Chapter (scope), nhưng phân tích kết quả theo Skill (detail)

Xem chi tiết: [Chapter vs Skill](./chapter-vs-skill.md)

**Skill Graph**: Đồ thị biểu diễn mối quan hệ giữa các skills (prerequisites)

**Mastery**: Mức độ thành thạo của học sinh với một skill (0-100)

**Practice**: Record kết quả làm bài của học sinh cho một Question. Lưu student response (student_answer, is_correct, duration_sec, submitted_at), session info (session_id + session_type), và link với Question. Một Question có thể có nhiều Practice records (re-attempt logic).

**Exercise**: Bài tập template được tạo bởi Admin hoặc AI Service. Sau khi được approve, Exercise có thể được dùng để generate Questions. Exercise gắn với Skill (skill_id, bắt buộc) và Chapter (chapter_id, lấy từ Skill để dễ query).

**Question**: Instance của Exercise được assign cho học sinh. Chứa nội dung câu hỏi (snapshot Exercise data tại thời điểm assign), status (DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED), nhưng KHÔNG lưu response data (đã chuyển sang Practice table) và KHÔNG có session_id (được quản lý qua Practice records). Question gắn với Skill (skill_id) và Chapter (chapter_id, lấy từ Skill để dễ query).

**Mini Test**: Bài kiểm tra nhỏ theo Chapter - gồm 5-7 câu hỏi để kiểm tra kiến thức của học sinh trong một Chapter. Mini Test:
- Scope: Theo Chapter (không theo Skill)
- Unlock condition: Hoàn thành ≥10 bài practice trong Chapter
- Phân tích kết quả: Theo Skill (chi tiết các skill làm đúng/sai)
- Cấu hình: Được định nghĩa ở Chapter level (số câu, thời gian, điểm đạt)

**Learning Plan**: Lộ trình học tập hằng ngày - hệ thống đề xuất Chapter và Skills cần học. Learning Plan recommend:
- Chapter: Chương học nên tập trung
- Skills: Các kỹ năng cụ thể trong Chapter cần luyện tập

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

