PHASE 1 – ACTIVE SYSTEM LAWS
Project: Gia sư Toán AI
Applies to: Phase 1 – Core Personal Learning System
Status: ACTIVE – FROZEN WITH PHASE 1
Purpose: Define EXACTLY which System Laws are enforced in Phase 1

==================================================
1. MỤC ĐÍCH CỦA TÀI LIỆU NÀY
==================================================

Tài liệu này xác định:
- Những System Law ĐANG CÓ HIỆU LỰC trong Phase 1
- Những System Law CHƯA KÍCH HOẠT (Dormant)
- Ranh giới rõ ràng cho việc viết code và review code

Mọi code trong Phase 1:
- PHẢI tuân thủ các luật ACTIVE
- KHÔNG được giả lập, stub, hoặc suy diễn các luật DORMANT

==================================================
2. TỔNG QUAN TRẠNG THÁI SYSTEM LAW
==================================================

ACTIVE:
- Lifecycle Law
- Chapter Law
- Skill Law
- Permission Law (hard-coded)
- AI Law

DORMANT:
- Trial Law
- License Law

Không có System Law nào ở trạng thái “partial”.

==================================================
3. LIFECYCLE LAW (ACTIVE – SIMPLIFIED)
==================================================

3.1. Trạng thái hợp lệ

- User: ACTIVE
- Chapter: ACTIVE
- Skill: ACTIVE

Không tồn tại:
- Suspended
- Expired
- Archived
- Deleted (logic-level)

3.2. Nguyên tắc

- Mọi entity ACTIVE đều được sử dụng
- Không có transition phức tạp
- Không có lifecycle automation

==================================================
4. CHAPTER LAW (ACTIVE)
==================================================

4.1. Quy tắc

- Chapter phải được gán trực tiếp cho học sinh
- Học sinh CHỈ nhìn thấy chapter được gán
- Không có chapter discovery

4.2. Enforcement

- Backend kiểm tra chapter assignment trước mọi hành động
- AI không biết và không xử lý chapter assignment

==================================================
5. SKILL LAW (ACTIVE)
==================================================

5.1. Quy tắc

- Skill thuộc đúng 1 chapter
- Skill có thể có prerequisite
- Skill KHÔNG được học nếu prerequisite chưa hoàn thành

5.2. Completion

- Completion ở mức boolean
- Không có mastery level
- Không có adaptive difficulty

==================================================
6. PERMISSION LAW (ACTIVE – HARD-CODED)
==================================================

6.1. Role

- ADMIN
- PARENT
- STUDENT

6.2. Quyền

- ADMIN:
  - tạo / sửa / xóa user (parent, student, admin)
  - tạo / sửa / xóa chapter
  - tạo / sửa / xóa skill
  - gán chapter cho học sinh (bất kỳ học sinh nào)
  - xem tất cả tiến trình
  - xem system metrics

- PARENT:
  - gán chapter cho học sinh (chỉ con của mình)
  - xem tiến trình học sinh (chỉ con của mình)

- STUDENT:
  - học skill
  - làm bài tập
  - xem lời giải
  - xem tiến độ của chính mình

6.3. Nguyên tắc

- Permission được hard-code
- Không permission matrix động
- Không config runtime

==================================================
7. AI LAW (ACTIVE – RESTRICTED)
==================================================

7.1. AI được phép

- Sinh bài tập theo skill
- Giải thích bài tập
- Trả lời trong scope đã được backend xác nhận

7.2. AI bị cấm

- Suy luận quyền
- Ghi nhớ trạng thái user
- Biết trial / license
- Quyết định nội dung học

7.3. Nguyên tắc

- AI là stateless worker
- Backend chịu trách nhiệm toàn bộ enforcement

==================================================
8. TRIAL LAW (DORMANT)
==================================================

- Không tồn tại trial
- Không có trạng thái trial
- Không có code stub
- Không có DB field
- Không có API liên quan

==================================================
9. LICENSE LAW (DORMANT)
==================================================

- Không tồn tại license
- Không có entitlement
- Không có payment
- Không có permission suy diễn từ license

==================================================
10. QUY TẮC REVIEW CODE PHASE 1
==================================================

Mọi code Phase 1 PHẢI trả lời được:

- Luật ACTIVE nào đang enforce?
- Có vô tình chạm vào luật DORMANT không?

Nếu câu trả lời không rõ ràng:
→ Code bị coi là VI PHẠM Phase 1

==================================================
END OF PHASE 1 ACTIVE LAWS
==================================================
