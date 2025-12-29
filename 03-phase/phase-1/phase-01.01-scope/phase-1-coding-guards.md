CODING GUARD – PHASE 1
Project: Gia sư Toán AI
Applies to: Phase 1 – Core Personal Learning System
Status: ACTIVE – MUST FOLLOW
Purpose: Prevent over-engineering and Phase 1 scope violations

==================================================
HOW TO USE THIS FILE
==================================================

Trước mỗi commit / PR / file mới:
- Đọc checklist này
- Nếu 1 câu trả lời là NO → KHÔNG ĐƯỢC VIẾT CODE

Checklist này có quyền cao hơn:
- cảm hứng cá nhân
- “chuẩn bị cho tương lai”
- “làm cho tiện sau này”

==================================================
1. PHASE 1 SCOPE CHECK
==================================================

[ ] Code này có phục vụ trực tiếp cho gia đình / học sinh thật không?
[ ] Nếu bỏ code này đi, Phase 1 có mất khả năng sử dụng không?
[ ] Code này có cần thiết NGAY BÂY GIỜ không?

Nếu câu trả lời là:
- “để sau này”
- “chuẩn bị sẵn”
- “phòng trường hợp”

→ CẤM VIẾT

==================================================
2. TRIAL & LICENSE GUARD (ABSOLUTE)
==================================================

[ ] Code KHÔNG chứa khái niệm trial
[ ] Code KHÔNG chứa khái niệm license
[ ] Code KHÔNG có field liên quan đến trial/license
[ ] Code KHÔNG có stub / TODO cho trial/license

Nếu vi phạm 1 dòng:
→ CODE BỊ TỪ CHỐI

==================================================
3. PERMISSION GUARD
==================================================

[ ] Permission được hard-code theo role
[ ] Không có permission matrix động
[ ] Không có config runtime cho quyền
[ ] Không có abstraction “chuẩn bị cho Phase 3”

Nếu thấy:
- enum permission dư
- bảng permission trống
- class PermissionResolver chung chung

→ CẤM

==================================================
4. AI GUARD
==================================================

[ ] AI chỉ nhận input đã được backend validate
[ ] AI chỉ generate bài tập / lời giải
[ ] AI không nhớ trạng thái user
[ ] AI không cache vượt request
[ ] AI không biết trial / license
[ ] AI không suy luận quyền

Nếu AI code có:
- state
- memory
- context kéo dài
- logic “if user…”

→ VI PHẠM PHASE 1

==================================================
5. CHAPTER & SKILL GUARD
==================================================

[ ] Mọi action đều kiểm tra chapter assignment
[ ] Skill luôn thuộc đúng chapter
[ ] Prerequisite được kiểm tra ở backend
[ ] Không có “skip skill”

Không được:
- check lỏng
- tin frontend
- tin AI

==================================================
6. DATABASE GUARD
==================================================

[ ] DB chỉ chứa field dùng cho Phase 1
[ ] Không field “dự phòng”
[ ] Không nullable chỉ để tiện
[ ] Không schema “chuẩn bị cho scale”

Nếu DB có field:
- future_*
- is_trial
- license_type
- entitlement

→ PHẢI XÓA

==================================================
7. ARCHITECTURE GUARD
==================================================

[ ] Module nhỏ, rõ ràng
[ ] Không over-abstraction
[ ] Không pattern phức tạp
[ ] Code đọc lại sau 1 tháng vẫn hiểu

Nếu phải giải thích:
- “sau này sẽ dùng”
- “để mở rộng”

→ CẤM

==================================================
8. REVIEW QUESTIONS (MANDATORY)
==================================================

Trước khi commit, tự hỏi:

- Luật ACTIVE nào đang được enforce?
- Có vô tình chạm luật DORMANT không?
- Code này có thể bị hiểu nhầm là Phase 2/3 không?

Nếu không trả lời rõ:
→ DỪNG

==================================================
9. FREEZE RULE
==================================================

Khi Phase 1 đạt điều kiện hoàn thành:

- Tag version: PHASE1_FROZEN
- Không thêm feature
- Không “tiện tay sửa”

Mọi thay đổi:
→ Phải quay lại Phase 0

==================================================
FINAL REMINDER
==================================================

Phase 1 thành công khi:
- Ít code
- Dễ đọc
- Dùng được thật

Phase 1 thất bại khi:
- “Chuẩn bị cho tương lai”
- “Làm cho chắc”
- “Tiện làm luôn”

===========================
