PHASE 0 – DEPLOYMENT SCOPE & INTENT DEFINITION
Project: Gia sư Toán AI
Status: ACTIVE – FREEZE AFTER APPROVAL
Owner: Project Architect / PM
Purpose: Define deployment intent & scope BEFORE any implementation

==================================================
1. MỤC ĐÍCH CỦA PHASE 0
==================================================

Phase 0 tồn tại để:
- Xác định RÕ ứng dụng đang được xây dựng cho MỤC ĐÍCH GÌ
- Khóa phạm vi triển khai ở từng giai đoạn
- Tránh over-engineering, lệch kiến trúc và tự mâu thuẫn về sau
- Tạo “lá chắn quyết định” trước khi viết lại hệ thống

Phase 0 KHÔNG tạo ra code.
Phase 0 CHỈ tạo ra quyết định mang tính chiến lược và ràng buộc.

==================================================
2. DEPLOYMENT INTENT (Ý ĐỊNH TRIỂN KHAI)
==================================================

Ứng dụng Gia sư Toán AI trong Phase 1 được xác định là:

→ PERSONAL / FAMILY LEARNING SYSTEM
→ CLOSED SCOPE
→ NON-COMMERCIAL MODE

Đối tượng sử dụng:
- Gia đình (phụ huynh + con)
- Một số bạn bè quen biết (nếu cần)

Ứng dụng KHÔNG được xem là:
- MVP thị trường
- Sản phẩm thương mại
- Hệ thống mở cho người lạ

==================================================
3. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)
==================================================

3.1. Ưu tiên sử dụng thực tế
- Ứng dụng phải dùng được thật
- Đơn giản, rõ ràng, không thừa tính năng

3.2. Không chuẩn bị sẵn cho scale / abuse
- Không anti-abuse
- Không rate-limit phức tạp
- Không defensive design cho user lạ

3.3. Không hy sinh System Law
- System Law được GIỮ NGUYÊN
- Chỉ có trạng thái:
  - ACTIVE
  - DORMANT (chưa kích hoạt)

==================================================
4. PHẠM VI PHASE 1 (ĐƯỢC PHÉP LÀM)
==================================================

Phase 1 chỉ bao gồm các năng lực CỐT LÕI sau:

- User & Role:
  - User được tạo thủ công (seed DB)
  - Vai trò đơn giản: phụ huynh / học sinh

- Chapter:
  - Tạo chapter thủ công
  - Gán chapter trực tiếp cho học sinh

- Skill:
  - Skill có prerequisite
  - Không có mastery nâng cao

- Practice:
  - Sinh bài tập
  - Xem lời giải

- AI:
  - Sinh bài tập
  - Giải thích bài
  - KHÔNG quyết định quyền
  - KHÔNG suy luận license/trial

==================================================
5. NHỮNG THỨ CỐ TÌNH KHÔNG LÀM Ở PHASE 1
==================================================

Các chức năng sau BỊ CẤM triển khai ở Phase 1:

- Trial
- License
- Payment
- Commercial permission matrix
- Device binding
- Anti-abuse / anti-fraud
- Analytics / tracking thương mại
- Public registration / OTP / reset password

Lý do:
- Không phục vụ deployment intent
- Tạo gánh nặng kiến trúc không cần thiết

==================================================
6. TRẠNG THÁI SYSTEM LAW TRONG PHASE 1
==================================================

System Law được phân loại như sau:

ACTIVE (được enforce):
- Lifecycle Law
- Chapter Law
- Skill Law
- Permission Law (hard-coded)
- AI Law

DORMANT (chưa kích hoạt):
- Trial Law
- License Law

Dormant nghĩa là:
- Không có trạng thái active
- Không có transition
- Không có logic xử lý
- Nhưng KHÔNG bị xóa khỏi thiết kế tổng thể

==================================================
7. NGUYÊN TẮC THIẾT KẾ KIẾN TRÚC CHO PHASE 1
==================================================

- Backend:
  - Ưu tiên guard đơn giản
  - Logic rõ ràng, đọc được
  - Không over-abstraction

- AI:
  - Stateless
  - Không cache vượt scope
  - Không tự suy luận quyền

- Database:
  - Thiết kế tối giản
  - Chỉ phục vụ Phase 1

==================================================
8. ĐIỀU KIỆN ĐÓNG BĂNG PHASE 1
==================================================

Phase 1 được xem là HOÀN THÀNH khi:

- Phụ huynh dùng được
- Học sinh học được
- Người phát triển không cảm thấy “khó chịu” khi đọc code
- Không còn ý định thêm feature ngoài scope

Sau khi đạt:
- Tag version
- Ghi nhận trạng thái FROZEN
- TẠM DỪNG DỰ ÁN

==================================================
9. CAM KẾT KHÔNG VI PHẠM PHASE 0
==================================================

Trong suốt Phase 1:
- KHÔNG thêm feature ngoài scope
- KHÔNG kích hoạt Trial / License
- KHÔNG “chuẩn bị sẵn cho tương lai”

Mọi thay đổi scope bắt buộc:
- Phải quay lại Phase 0
- Phải cập nhật tài liệu này
- Phải được chấp thuận rõ ràng

==================================================
END OF PHASE 0
==================================================
