PHASE 1 – CORE SCOPE DEFINITION
Project: Gia sư Toán AI
Status: ACTIVE – TO BE FROZEN
Depends on: Phase 0 – Deployment Scope & Intent Definition
Owner: Project Architect / PM
Purpose: Define EXACTLY what is implemented in Phase 1 and nothing more

==================================================
1. MỤC TIÊU CỦA PHASE 1
==================================================

Phase 1 nhằm xây dựng một hệ thống:
- Dùng được ngay cho gia đình (phụ huynh – học sinh)
- Đáp ứng nhu cầu học Toán thực tế
- Đơn giản, rõ ràng, dễ bảo trì
- Tuân thủ System Law ở mức TỐI THIỂU CẦN THIẾT

Phase 1 KHÔNG nhằm:
- Kiếm tiền
- Thu hút người dùng đại trà
- Chứng minh scale
- Chuẩn bị cho thương mại hóa

==================================================
2. ĐỐI TƯỢNG SỬ DỤNG & QUY MÔ
==================================================

- Số lượng user:
  - 1 phụ huynh
  - 1–3 học sinh

- Quan hệ:
  - Phụ huynh quản lý trực tiếp học sinh
  - Không có user lạ
  - Không có multi-tenant

==================================================
3. PHẠM VI CHỨC NĂNG ĐƯỢC TRIỂN KHAI
==================================================

--------------------------------------------------
3.1. USER & ROLE (TĨNH)
--------------------------------------------------

- User được tạo bởi:
  - Super admin đầu tiên: seed data
  - Admin khác: tạo trên web admin (tutor-admin-dashboard)
  - Parent/Student: tạo bởi Admin trên web admin

- Không có:
  - đăng ký công khai
  - đăng nhập xã hội (OAuth Google/Apple)
  - OTP
  - reset mật khẩu

- Role:
  - ADMIN (quản trị viên)
  - PARENT (phụ huynh)
  - STUDENT (học sinh)

- Authentication:
  - Username + Password (không OAuth)
  - Admin đăng nhập: tutor-admin-dashboard (Next.js)
  - Parent đăng nhập: tutor-parent-dashboard (Next.js)
  - Student đăng nhập: tutor-student-app (Flutter)

- Permission:
  - Hard-coded theo role
  - Không dùng permission matrix động

--------------------------------------------------
3.2. CHAPTER
--------------------------------------------------

- Chapter được:
  - tạo thủ công
  - chỉnh sửa thủ công

- Chapter được gán trực tiếp cho học sinh
- Học sinh:
  - chỉ nhìn thấy chapter được gán
  - không truy cập chapter khác

--------------------------------------------------
3.3. SKILL
--------------------------------------------------

- Skill:
  - thuộc về một chapter
  - có prerequisite (0 hoặc nhiều)

- Enforcement:
  - không được học skill nếu prerequisite chưa hoàn thành
  - completion ở mức đơn giản (boolean)

--------------------------------------------------
3.4. PRACTICE / BÀI TẬP
--------------------------------------------------

- Cho phép:
  - sinh bài tập theo skill
  - số lượng nhỏ
  - không lưu lịch sử phức tạp

- Cho phép:
  - xem lời giải
  - xem từng bước giải

- Không có:
  - chấm điểm nâng cao
  - leaderboard
  - gamification

--------------------------------------------------
3.5. AI (GIỚI HẠN NGHIÊM NGẶT)
--------------------------------------------------

AI trong Phase 1 chỉ được phép:

- Sinh bài tập theo:
  - chapter_id
  - skill_id

- Giải thích bài tập

AI KHÔNG được phép:
- Quyết định quyền
- Quyết định nội dung học
- Suy luận trạng thái user
- Biết khái niệm trial
- Biết khái niệm license

--------------------------------------------------
3.6. FRONTEND APPLICATIONS
--------------------------------------------------

- Admin Dashboard (tutor-admin-dashboard):
  - Technology: Next.js
  - Dành cho: ADMIN role
  - Chức năng:
    - Quản lý user (tạo parent/student/admin)
    - Quản lý content (chapter, skill)
    - Xem system metrics
    - Gán chapter cho student

- Parent Dashboard (tutor-parent-dashboard):
  - Technology: Next.js
  - Dành cho: PARENT role
  - Chức năng:
    - Gán chapter cho học sinh (con của mình)
    - Xem tiến trình học sinh
    - Xem báo cáo học tập

- Student App (tutor-student-app):
  - Technology: Flutter
  - Dành cho: STUDENT role
  - Chức năng:
    - Học skill
    - Làm bài tập (practice)
    - Xem lời giải
    - Xem tiến độ học tập

==================================================
4. NHỮNG GÌ BỊ CẤM TRIỂN KHAI
==================================================

BỊ CẤM TUYỆT ĐỐI trong Phase 1:

- Trial
- License
- Payment
- Subscription
- Device binding
- Abuse detection
- Offline mode
- Recommendation engine
- AI tự đánh giá mastery

==================================================
5. SYSTEM LAW – TRẠNG THÁI ÁP DỤNG
==================================================

ACTIVE:
- Lifecycle Law (tối giản)
- Chapter Law
- Skill Law
- Permission Law (hard-coded)
- AI Law

DORMANT:
- Trial Law
- License Law

Không có logic trung gian / stub / fake cho law dormant.

==================================================
6. KIẾN TRÚC BACKEND PHASE 1
==================================================

- Không microservice phức tạp
- Core service đơn giản

Module tối thiểu:
- User
- Admin
- Chapter
- Skill
- Practice
- AI Gateway

Mỗi module:
- Guard rõ ràng
- Logic đọc được
- Không magic behavior

==================================================
7. DATABASE – NGUYÊN TẮC THIẾT KẾ
==================================================

- DB chỉ phục vụ Phase 1
- Schema tối giản
- Không field “chuẩn bị cho tương lai”

Cho phép:
- seed data thủ công
- migrate đơn giản

==================================================
8. ĐIỀU KIỆN HOÀN THÀNH & ĐÓNG BĂNG
==================================================

Phase 1 được coi là HOÀN THÀNH khi:

- Admin:
  - tạo user (parent/student/admin) được
  - quản lý content (chapter, skill) được
  - gán chapter cho student được
- Phụ huynh:
  - gán chapter cho học sinh được
  - xem tiến trình học sinh được
- Học sinh:
  - học skill được
  - làm bài tập được
  - xem lời giải được

- Hệ thống:
  - ổn định
  - dễ đọc
  - không gây khó chịu khi bảo trì

Sau khi hoàn thành:
- Tag version (PHASE1_FROZEN)
- Không thêm feature
- Chuyển focus sang công việc khác

==================================================
9. QUY TẮC THAY ĐỔI PHẠM VI
==================================================

Mọi yêu cầu ngoài scope Phase 1:
- Bị từ chối
- Hoặc phải quay lại Phase 0 để định nghĩa lại

Không có ngoại lệ.

==================================================
END OF PHASE 1
==================================================
