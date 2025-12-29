USER FLOWS – PHASE 1
Project: Gia sư Toán AI
Applies to: Phase 1 – Core Personal Learning System
Status: ACTIVE (to be frozen before coding)

Mục đích của User Flow trong Phase 1

User Flow trong Phase 1 được sử dụng để:

Xác nhận lại toàn bộ kiến trúc hệ thống dưới góc nhìn runtime

Kiểm tra tính khả thi của:

Domain Model

Backend Skeleton

Authority & Invariant

Phát hiện sớm:

bước thiếu guard

điểm authority chưa rõ

entry point API chưa hợp lý

User Flow:

KHÔNG tạo luật mới

KHÔNG mở rộng scope

KHÔNG mô tả UI chi tiết

KHÔNG thay thế Domain Model

User Flow chỉ mô tả:

“Người dùng đi qua hệ thống như thế nào,
hệ thống phản ứng ra sao ở mỗi bước”

Phạm vi User Flow Phase 1

User Flow Phase 1 chỉ bao gồm:

Student flows

Parent flows (read-only)

Admin flows (content & assignment)

User Flow Phase 1 TUYỆT ĐỐI KHÔNG bao gồm:

Trial

License

Payment

Device binding

Commercial permission

Recommendation engine

Adaptive learning nâng cao

Nguyên tắc viết User Flow

Mỗi User Flow BẮT BUỘC phải có:

Actor (ai thực hiện)

Preconditions (điều kiện trước)

Trigger (hành động kích hoạt)

Step-by-step flow

System checks tại mỗi bước

Domain owner xử lý

Event (nếu có)

Forbidden paths (đường cấm)

Không mô tả:

UI layout

Animation

UX chi tiết

Cấu trúc thư mục

phase-01.05-user-flows/

README.txt

student/

parent/

admin/

Mỗi flow là 1 file text độc lập.

Quy tắc đóng băng (Freeze Rule)

Sau khi:

Các User Flow được review

Không phát hiện lệch Domain / Law

→ Thư mục này được coi là FROZEN.

Mọi thay đổi flow sau đó:

BẮT BUỘC quay lại Phase 0

Hoặc cập nhật System Law Snapshot

END OF README – USER FLOWS PHASE 1