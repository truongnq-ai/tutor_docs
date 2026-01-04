SCOPE PHASE 1 – TEACHFLOW
(Phục vụ triển khai MVP thực tế)

---

## I. MỤC TIÊU PHASE 1

Phase 1 nhằm tạo ra một **MVP có thể sử dụng hằng tuần bởi giáo viên**, giúp họ:

* Quản lý lớp và học sinh cơ bản
* Soạn và sử dụng bài tập nhanh hơn
* Ghi nhận kết quả và nhận xét một cách gọn gàng
* Được AI hỗ trợ ở mức **nháp – gợi ý – chỉnh sửa**

Phase 1 **không nhằm**:

* Tự động hóa quá trình dạy học
* Đánh giá năng lực học sinh
* Tạo hệ thống báo cáo hay ra quyết định

---

## II. ĐỐI TƯỢNG PHỤC VỤ (IN SCOPE)

Phase 1 **chỉ phục vụ một loại người dùng**:

* Giáo viên (bao gồm gia sư, giáo viên trung tâm nhỏ, giáo viên dạy thêm)

Phase 1 **không phục vụ trực tiếp**:

* Học sinh
* Phụ huynh

---

## III. NỀN TẢNG & KÊNH TRUY CẬP

* Chỉ triển khai **Web cho giáo viên**
* Không có mobile app
* Không có cổng phụ huynh
* Không có dashboard cho học sinh

---

## IV. PHẠM VI CHỨC NĂNG (IN SCOPE)

### 1. Quản lý lớp học

Giáo viên có thể:

* Tạo lớp học
* Đặt tên lớp
* Ghi chú mô tả lớp
* Gán môn học cho lớp

Giáo viên có thể:

* Thêm / sửa / xóa học sinh trong lớp
* Lưu thông tin học sinh ở mức tối thiểu (tên, ghi chú)

---

### 2. Quản lý bài tập (Exercise Management)

Giáo viên có thể:

* Tạo bài tập thủ công
* Tạo bài tập với AI hỗ trợ (dạng nháp)
* Chỉnh sửa nội dung bài tập
* Duyệt bài tập để sử dụng cho lớp của mình

Bài tập có các thuộc tính cơ bản:

* Nội dung
* Môn học
* Topic (đã tồn tại trong hệ thống)
* Độ khó (metadata)
* Loại bài (practice / quiz – chỉ metadata)

---

### 3. AI hỗ trợ soạn bài (Giới hạn chặt)

AI trong Phase 1 chỉ được dùng để:

* Gợi ý nội dung bài tập theo môn và topic
* Gợi ý nhận xét ngắn cho học sinh

AI:

* Không tự gán topic
* Không tự chọn độ khó
* Không tự publish nội dung

Mọi nội dung AI sinh ra đều:

* Ở trạng thái nháp
* Bắt buộc giáo viên xem và sửa

---

### 4. Sử dụng bài tập cho lớp

Giáo viên có thể:

* Gán bài tập cho lớp
* Ghi nhận kết quả làm bài (điểm / đạt – không đạt)
* Ghi nhận nhận xét thủ công
* Sử dụng AI để gợi ý nhận xét (có thể chỉnh sửa)

---

### 5. Quyền riêng tư & chia sẻ bài tập

* Bài tập do giáo viên tạo:

  * Mặc định là PRIVATE
* Giáo viên **chưa thể** public bài tập trong Phase 1
* Giáo viên chỉ sử dụng bài tập của chính mình
* Không có thư viện bài tập dùng chung trong Phase 1

---

### 6. Topic & môn học

* Môn học:

  * Có sẵn trong hệ thống (seed data)
* Topic:

  * Được định nghĩa sẵn
  * Có cấu trúc phân cấp (n cấp)
* Giáo viên:

  * Chỉ chọn topic
  * Không tạo / sửa / xóa topic trong Phase 1

---

## V. NHỮNG GÌ CỐ TÌNH KHÔNG LÀM (OUT OF SCOPE)

Phase 1 **không bao gồm**:

1. Phụ huynh đăng nhập
2. Học sinh đăng nhập
3. Gửi bài tập trực tiếp cho học sinh
4. Chấm bài tự động
5. Đánh giá năng lực học sinh
6. Theo dõi tiến bộ dài hạn
7. Báo cáo học tập
8. So sánh học sinh
9. Marketplace bài tập
10. Xếp hạng bài tập
11. Public library
12. AI chạy nền hoặc tự động

---

## VI. NHỮNG GÌ CHỦ ĐÍCH HOÃN LẠI (LATER PHASE)

Các nội dung sau được **cố tình hoãn**:

* Chia sẻ bài tập public
* Copy bài tập giữa giáo viên
* Soạn tin nhắn phụ huynh
* Tổng hợp nhận xét theo tháng
* Upload bài làm (ảnh / file)
* Báo cáo cho phụ huynh

---

## VII. TIÊU CHÍ HOÀN THÀNH PHASE 1 (EXIT CRITERIA)

Phase 1 được xem là thành công nếu:

1. Giáo viên có thể dùng hệ thống mỗi tuần
2. Việc soạn bài tập nhanh hơn so với cách thủ công
3. AI không gây mất kiểm soát
4. Không có tính năng vi phạm System Law
5. Scope không bị tràn sang Phase 2

---

## VIII. NGUYÊN TẮC BẢO VỆ SCOPE

Bất kỳ đề xuất nào trong Phase 1 nếu:

* Tạo authority cho AI
* Giảm quyền kiểm soát của giáo viên
* Tạo automation không minh bạch

→ **Phải bị loại khỏi Phase 1**, dù có giá trị kỹ thuật hay tiện lợi.

---

PHASE 1 LAW – TEACHFLOW
(Luật thực thi cho Phase 1)

---

## I. MỤC ĐÍCH CỦA PHASE 1 LAW

Phase 1 Law tồn tại để:

* Ngăn code và UI vượt ra ngoài Scope Phase 1
* Ngăn AI vượt quá vai trò hỗ trợ
* Ngăn product “trượt dốc” sang automation hoặc authority
* Làm tiêu chuẩn kiểm tra mọi PR, mọi feature, mọi prompt

Nếu một hành vi **không được mô tả rõ ràng trong Phase 1 Law** → hành vi đó **không được phép tồn tại trong Phase 1**.

---

## II. LUẬT VỀ VAI TRÒ & QUYỀN HẠN

### Law 2.1 – Người dùng

Trong Phase 1:

* Chỉ tồn tại **một loại người dùng: Giáo viên**
* Không có:

  * Học sinh user
  * Phụ huynh user
  * Admin nghiệp vụ

Mọi UI, API, logic đều phải giả định:

> “Người đang thao tác là giáo viên.”

---

### Law 2.2 – Admin

Trong Phase 1:

* Admin chỉ tồn tại ở mức **system/technical**
* Admin:

  * Không can thiệp nghiệp vụ
  * Không duyệt bài tập của giáo viên
  * Không xuất hiện trên UI

Approval trong Phase 1:

* Luôn là **giáo viên tự duyệt bài của mình**

---

## III. LUẬT VỀ AI (RẤT QUAN TRỌNG)

### Law 3.1 – AI không có authority

AI trong Phase 1:

* Không được tự động:

  * Tạo bài tập hoàn chỉnh để sử dụng ngay
  * Duyệt bài tập
  * Gán bài tập cho lớp
  * Gửi nhận xét

Mọi output của AI:

* Bắt buộc ở trạng thái **draft**
* Bắt buộc có thao tác của giáo viên trước khi lưu

---

### Law 3.2 – AI không được suy diễn

AI **không được**:

* Suy luận trình độ học sinh
* Suy luận mức độ tiến bộ
* Gán nhãn học sinh (yếu, khá, giỏi…)
* So sánh học sinh với nhau

Prompt và code phải **chủ động chặn** các hành vi trên.

---

### Law 3.3 – AI chỉ phản hồi theo input tường minh

AI:

* Chỉ sinh nội dung dựa trên:

  * Môn học được chọn
  * Topic được chọn
  * Yêu cầu cụ thể của giáo viên

AI:

* Không được tự chọn topic
* Không được tự quyết định độ khó
* Không được “mở rộng ngữ cảnh” ngoài input

---

## IV. LUẬT VỀ BÀI TẬP (EXERCISE)

### Law 4.1 – Trạng thái bài tập

Trong Phase 1, bài tập chỉ có 2 trạng thái:

* DRAFT
* APPROVED

Ý nghĩa:

* DRAFT: chưa được dùng
* APPROVED: giáo viên cho phép dùng cho lớp của mình

Không tồn tại:

* REVIEW
* PUBLISHED
* ARCHIVED

---

### Law 4.2 – Approval không đồng nghĩa chia sẻ

Approval trong Phase 1:

* Chỉ có ý nghĩa **cho phép sử dụng nội bộ**
* Không liên quan đến public / private

Trong Phase 1:

* Mọi bài tập đều là PRIVATE
* Không có public library
* Không có chia sẻ giữa giáo viên

---

### Law 4.3 – Ownership bài tập

Mọi bài tập:

* Thuộc sở hữu của giáo viên tạo ra
* Không thể bị giáo viên khác nhìn thấy
* Không thể bị chỉnh sửa bởi người khác

Không tồn tại:

* Copy bài tập
* Fork bài tập
* Clone bài tập

---

### Law 4.4 – Metadata bài tập

Mỗi bài tập trong Phase 1:

* Bắt buộc có:

  * Môn học
  * 1 topic chính
* Có thể có:

  * Độ khó (do giáo viên chọn)
  * Loại bài (practice / quiz – chỉ metadata)

AI:

* Chỉ được gợi ý metadata
* Không được tự ghi metadata vào hệ thống

---

## V. LUẬT VỀ TOPIC & MÔN HỌC

### Law 5.1 – Topic là read-only với giáo viên

Trong Phase 1:

* Topic do hệ thống định nghĩa
* Giáo viên:

  * Chỉ được chọn
  * Không được tạo
  * Không được sửa
  * Không được xóa

---

### Law 5.2 – Không tạo root mới

Trong Phase 1:

* Không có hành vi tạo topic gốc
* Không có phân nhánh taxonomy mới

Mọi topic đều thuộc cấu trúc có sẵn.

---

## VI. LUẬT VỀ LỚP & HỌC SINH

### Law 6.1 – Dữ liệu học sinh tối thiểu

Trong Phase 1:

* Chỉ lưu dữ liệu cần thiết để dạy học
* Không lưu:

  * Thông tin nhạy cảm
  * Thông tin suy diễn

---

### Law 6.2 – Không đánh giá năng lực

Trong Phase 1:

* Không tồn tại:

  * Hồ sơ năng lực học sinh
  * Theo dõi tiến bộ dài hạn
  * So sánh kết quả

Điểm số và nhận xét:

* Chỉ có giá trị trong ngữ cảnh lớp học
* Không dùng để phân tích hệ thống

---

## VII. LUẬT VỀ NHẬN XÉT & GIAO TIẾP

### Law 7.1 – Nhận xét luôn editable

* Nhận xét do AI gợi ý:

  * Phải chỉnh sửa được
  * Không có auto-send

---

### Law 7.2 – Không giao tiếp ngoài hệ thống

Trong Phase 1:

* Không gửi:

  * Email
  * Tin nhắn
  * Thông báo

Mọi nội dung chỉ tồn tại trong hệ thống.

---

## VIII. LUẬT VỀ UI & UX

### Law 8.1 – Không gây ảo giác quyền lực AI

UI:

* Không dùng ngôn từ:

  * “AI đánh giá”
  * “AI quyết định”
  * “AI đề xuất lộ trình”

AI luôn được hiển thị như:

* “Gợi ý”
* “Bản nháp”

---

### Law 8.2 – Giáo viên luôn là người bấm nút cuối

Không có:

* Auto-save không kiểm soát
* Auto-approve
* Auto-assign

---

## IX. LUẬT VỀ PHÁT TRIỂN & REVIEW CODE

### Law 9.1 – Mọi PR phải pass Phase 1 Law

Mỗi PR phải trả lời được:

* Có vi phạm System Law không?
* Có vượt Scope Phase 1 không?
* Có vi phạm Phase 1 Law không?

Nếu không trả lời được → PR không được merge.

---

## X. KẾT LUẬN

Phase 1 Law tồn tại để:

* Giữ TeachFlow **đúng bản chất**
* Giữ AI **đúng vai trò**
* Giữ product **không vượt rào sớm**

Phase 1 không phải nơi để “làm cho đủ”,
mà là nơi để **làm cho đúng**.

---

FEATURE CHECKLIST – TEACHFLOW
(Áp dụng cho Phase 1)

---

## I. CHECKLIST TUÂN THỦ SYSTEM LAW (NON-NEGOTIABLE)

### 1. Vai trò AI

* [ ] AI **không** có quyền quyết định cuối cùng
* [ ] AI **không** tự động thực hiện hành động (approve, assign, send…)
* [ ] AI output **luôn ở trạng thái draft**
* [ ] AI output **luôn editable bởi giáo viên**

❌ FAIL nếu:

* AI tự gán giá trị vào DB
* AI tạo nội dung “ready-to-use” mà không cần giáo viên xác nhận

---

### 2. Trách nhiệm nội dung

* [ ] Nội dung được gắn trách nhiệm cho **con người**, không phải AI
* [ ] Không có text/UI nào ám chỉ “AI chịu trách nhiệm”
* [ ] Giáo viên luôn là người xác nhận nội dung cuối

❌ FAIL nếu:

* Có câu chữ kiểu “AI đánh giá”, “AI xác định”, “AI quyết định”

---

### 3. Human-in-the-loop

* [ ] Mọi hành động có ý nghĩa đều do giáo viên bấm
* [ ] Không có automation không thể can thiệp
* [ ] Không có background job AI chạy ngầm

❌ FAIL nếu:

* Có auto-approve
* Có auto-send
* Có auto-assign

---

### 4. Hành vi bị cấm vĩnh viễn

* [ ] Không đánh giá năng lực học sinh
* [ ] Không phân loại / xếp hạng học sinh
* [ ] Không so sánh học sinh
* [ ] Không tự động giao tiếp với học sinh / phụ huynh
* [ ] Không suy luận thông tin nhạy cảm

❌ FAIL nếu:

* Feature có logic phân tích “tiến bộ”, “yếu – khá – giỏi”
* Feature tạo bảng xếp hạng, ranking

---

## II. CHECKLIST TUÂN THỦ SCOPE PHASE 1

### 5. Đối tượng sử dụng

* [ ] Feature **chỉ phục vụ giáo viên**
* [ ] Không cần học sinh login
* [ ] Không cần phụ huynh login

❌ FAIL nếu:

* Cần thêm role mới (student / parent)
* Cần UI cho phụ huynh

---

### 6. Kênh & nền tảng

* [ ] Chỉ dùng Web cho giáo viên
* [ ] Không yêu cầu mobile app
* [ ] Không yêu cầu notification ngoài hệ thống

❌ FAIL nếu:

* Có email / SMS / push notification

---

### 7. Phạm vi chức năng cho phép

Feature có thuộc một trong các nhóm sau không?

* [ ] Quản lý lớp
* [ ] Quản lý học sinh (tối thiểu)
* [ ] Soạn bài tập
* [ ] Sử dụng bài tập cho lớp
* [ ] Ghi nhận điểm / nhận xét

❌ FAIL nếu:

* Feature thuộc báo cáo nâng cao
* Feature thuộc phân tích dài hạn
* Feature thuộc marketplace

---

### 8. Những thứ cố tình KHÔNG LÀM trong Phase 1

* [ ] Không public bài tập
* [ ] Không chia sẻ bài tập giữa giáo viên
* [ ] Không copy / fork / clone bài tập
* [ ] Không thư viện chung

❌ FAIL nếu:

* Feature cho phép “xem bài của giáo viên khác”
* Feature cho phép “dùng chung bài”

---

## III. CHECKLIST TUÂN THỦ PHASE 1 LAW (THỰC THI)

### 9. User & quyền hạn

* [ ] Chỉ tồn tại 1 role: giáo viên
* [ ] Không có admin nghiệp vụ
* [ ] Giáo viên tự duyệt nội dung của mình

❌ FAIL nếu:

* Có flow “chờ admin duyệt”
* Có UI admin nghiệp vụ

---

### 10. Bài tập (Exercise)

* [ ] Trạng thái chỉ gồm: DRAFT / APPROVED
* [ ] APPROVED chỉ có nghĩa là “dùng cho lớp của mình”
* [ ] Mọi bài tập đều PRIVATE

❌ FAIL nếu:

* Có trạng thái khác (REVIEW, PUBLISHED…)
* APPROVED = public

---

### 11. Ownership bài tập

* [ ] Mỗi bài tập thuộc 1 giáo viên
* [ ] Không giáo viên nào khác nhìn thấy
* [ ] Không có copy / fork / clone

❌ FAIL nếu:

* Có reference bài của người khác
* Có logic chia sẻ

---

### 12. Topic & môn học

* [ ] Topic là read-only với giáo viên
* [ ] Giáo viên chỉ chọn, không tạo
* [ ] Không tạo root topic mới

❌ FAIL nếu:

* UI cho phép “thêm topic”
* Logic cho phép sửa taxonomy

---

### 13. Metadata bài tập

* [ ] Bắt buộc có môn học
* [ ] Bắt buộc có 1 topic
* [ ] Độ khó là metadata do giáo viên chọn

❌ FAIL nếu:

* AI tự gán metadata vào DB
* Metadata được suy diễn từ học sinh

---

### 14. Nhận xét & điểm số

* [ ] Nhận xét AI luôn editable
* [ ] Không auto-save nhận xét AI
* [ ] Điểm số không dùng cho phân tích hệ thống

❌ FAIL nếu:

* Có tổng hợp tiến bộ
* Có biểu đồ đánh giá học sinh

---

### 15. UI / UX

* [ ] UI không tạo “ảo giác quyền lực AI”
* [ ] Từ ngữ luôn là “gợi ý”, “bản nháp”
* [ ] Giáo viên luôn là người bấm nút cuối

❌ FAIL nếu:

* Có text “AI đánh giá”
* Có flow “AI đã quyết định”

---

## IV. CHECKLIST REVIEW CUỐI (GO / NO-GO)

Một feature **CHỈ ĐƯỢC PHÉP MERGE** khi:

* [ ] Pass toàn bộ mục I (System Law)
* [ ] Pass toàn bộ mục II (Scope Phase 1)
* [ ] Pass toàn bộ mục III (Phase 1 Law)

Nếu **FAIL ≥ 1 mục**:
→ Feature **BỊ LOẠI hoặc HOÃN sang phase sau**

---

## V. CÁCH SỬ DỤNG CHECKLIST NÀY

Checklist này được dùng để:

* Review PR
* Review UI spec
* Review prompt AI
* Review ý tưởng feature trước khi code

Checklist này **có quyền phủ quyết cao hơn cảm tính**, tốc độ dev, hay “ý tưởng hay”.

---

### CHỐT

Checklist này là:

* Hàng rào bảo vệ Phase 1
* Công cụ chống scope creep
* Cách giữ TeachFlow đúng bản chất từ ngày đầu

---

Dưới đây là **TÀI LIỆU ONBOARDING CHO DEV + AI PROMPT – TEACHFLOW (PHASE 1)**
Tài liệu này được viết để **đưa cho bất kỳ dev / AI engineer / prompt writer nào đọc là hiểu ngay:**

* Product này là gì
* AI được phép làm gì / không được làm gì
* Code & prompt phải tuân theo luật nào
* Viết sai ở đâu là **rollback ngay**

---

ONBOARDING DOCUMENT
TEACHFLOW – PHASE 1
(Dành cho Developer & AI Prompt Author)

---

## I. MỤC ĐÍCH CỦA TÀI LIỆU NÀY

Tài liệu này tồn tại để:

* Đồng bộ tư duy cho toàn bộ dev team
* Ngăn việc code hoặc prompt vượt rào ngay từ đầu
* Tránh “làm được nhưng làm sai”
* Là tiêu chuẩn **bắt buộc** trước khi viết:

  * Code backend
  * Code frontend
  * Prompt AI
  * UI copy

Nếu một quyết định kỹ thuật **mâu thuẫn với tài liệu này**, quyết định đó **không hợp lệ**.

---

## II. TEACHFLOW LÀ GÌ? (PRODUCT CONTEXT)

TeachFlow là **công cụ hỗ trợ giáo viên làm việc hằng ngày**.

TeachFlow:

* Không phải LMS đầy đủ
* Không phải hệ thống đánh giá học sinh
* Không phải AI teacher

TeachFlow giúp giáo viên:

* Tổ chức lớp
* Soạn bài tập
* Ghi nhận kết quả
* Viết nhận xét nhanh hơn

---

## III. AI TRONG TEACHFLOW – TƯ DUY BẮT BUỘC

### 1. AI KHÔNG PHẢI CREATOR

AI:

* Không phải tác giả
* Không phải chủ sở hữu nội dung
* Không chịu trách nhiệm nội dung

Mọi nội dung AI sinh ra:

* Luôn là **draft**
* Luôn cần giáo viên duyệt

Trong code và DB:

* Không có concept “AI-owned content”
* Creator luôn là **human**

---

### 2. AI KHÔNG CÓ AUTHORITY

AI **không bao giờ được**:

* Approve nội dung
* Assign bài tập
* Gửi nhận xét
* Tự động lưu dữ liệu cuối

Nếu code hoặc prompt cho phép điều này → **VI PHẠM SYSTEM LAW**

---

## IV. QUY TẮC VIẾT PROMPT AI (BẮT BUỘC)

### 1. Prompt luôn xác định rõ vai trò AI

Mọi prompt **phải thể hiện rõ**:

* AI là trợ lý
* AI không quyết định
* Output là gợi ý / bản nháp

Ví dụ đúng (tinh thần):

> “You are an assistant helping a teacher draft content.
> The teacher will review and edit before using.”

Ví dụ sai:

> “Generate a final exercise for students.”

---

### 2. Prompt KHÔNG được cho phép suy diễn

Prompt **không được yêu cầu AI**:

* Đánh giá trình độ học sinh
* So sánh học sinh
* Suy luận tiến bộ

Prompt **chỉ được phép** dựa trên input tường minh:

* Môn học
* Topic
* Yêu cầu giáo viên

---

### 3. Prompt phải giới hạn phạm vi

Prompt phải:

* Chỉ sinh nội dung được yêu cầu
* Không mở rộng ngoài scope

Ví dụ sai:

> “Suggest improvements to student learning.”

Ví dụ đúng:

> “Draft a short practice exercise based on the selected topic.”

---

## V. QUY TẮC CODE BACKEND (PHASE 1)

### 1. Không có automation ngầm

Backend **không được**:

* Auto-approve
* Auto-assign
* Auto-save output AI như dữ liệu cuối

AI output:

* Chỉ được lưu nếu giáo viên bấm xác nhận

---

### 2. Trạng thái & quyền hạn

* Exercise chỉ có: `DRAFT`, `APPROVED`
* APPROVED ≠ public
* Mọi dữ liệu gắn với teacher_id

Không có:

* Global visibility
* Cross-teacher access

---

### 3. Không encode logic sư phạm

Backend **không được**:

* Tính toán tiến bộ
* Phân tích điểm số
* Tổng hợp đánh giá học sinh

---

## VI. QUY TẮC FRONTEND / UI

### 1. UI không tạo ảo giác quyền lực AI

UI text:

* Phải dùng: “Gợi ý”, “Bản nháp”
* Tránh: “AI đánh giá”, “AI quyết định”

Button:

* Giáo viên luôn là người bấm nút cuối

---

### 2. Không giấu hành động AI

* AI output phải được hiển thị rõ
* Giáo viên biết đâu là AI-generated

Không có:

* AI chạy ngầm
* AI tự sửa dữ liệu

---

## VII. NHỮNG LỖI PHỔ BIẾN DEV CẦN TRÁNH

❌ “Cho tiện nên auto-approve”
❌ “AI làm được thì để AI quyết luôn”
❌ “Cứ lưu AI output trước, giáo viên sửa sau”
❌ “Thêm tí logic phân tích cho hay”

👉 Tất cả các trường hợp trên đều **vi phạm Phase 1 Law**.

---

## VIII. CHECKLIST ONBOARDING BẮT BUỘC

Trước khi code hoặc viết prompt, dev phải tự hỏi:

* Feature này có trao authority cho AI không?
* Có automation nào giáo viên không kiểm soát không?
* Có suy diễn về học sinh không?
* Có mở đường cho public / chia sẻ không?

Nếu **có ít nhất 1 câu trả lời là “có”** → dừng lại.

---

## IX. NGUYÊN TẮC LÀM VIỆC TRONG PHASE 1

* Ưu tiên **đúng luật hơn nhanh**
* Thà thiếu feature hơn sai bản chất
* Phase 1 là nền móng, không phải showcase

---

## X. KẾT LUẬN CHO DEV & PROMPT AUTHOR

TeachFlow Phase 1:

* Không phải nơi để thử nghiệm AI “cho vui”
* Không phải nơi để thể hiện kỹ thuật phức tạp
* Là nơi để xây **niềm tin cho giáo viên**

Nếu một dòng code hay prompt:

* Làm giáo viên mất quyền kiểm soát
  → Dòng đó **không được phép tồn tại**

---

Dưới đây là **RULE-SET VIẾT PROMPT CHO CURSOR – TEACHFLOW (PHASE 1)**
Tài liệu này được viết để **dán thẳng vào đầu mọi prompt dùng với Cursor**, đảm bảo:

* Cursor không vượt System Law
* Cursor không “vibe coding” vượt scope
* Code sinh ra **đúng luật – đúng phase – đúng vai trò AI**

---

RULE-SET FOR CURSOR PROMPT
TEACHFLOW – PHASE 1

---

## I. MỤC ĐÍCH CỦA RULE-SET

Rule-set này là **luật tối cao khi làm việc với Cursor**.

Mọi prompt gửi cho Cursor **phải mặc định tuân theo** rule-set này, kể cả khi:

* Refactor code
* Viết API mới
* Viết UI
* Viết prompt AI
* Review code

Nếu Cursor đề xuất giải pháp **vi phạm rule-set** → giải pháp đó **không hợp lệ**, dù có đúng kỹ thuật hay tiện lợi.

---

## II. BỐI CẢNH BẮT BUỘC (ALWAYS-ON CONTEXT)

Khi làm việc với Cursor, **luôn giả định**:

* Dự án: TeachFlow
* Phase: Phase 1
* Người dùng duy nhất: Giáo viên
* AI: trợ lý, không authority
* Product ưu tiên đúng luật hơn tốc độ

---

## III. NHỮNG ĐIỀU CURSOR PHẢI TUÂN THỦ (NON-NEGOTIABLE)

### Rule 3.1 – Không tạo authority cho AI

Cursor **KHÔNG ĐƯỢC**:

* Sinh code auto-approve
* Sinh code auto-assign
* Sinh code auto-send
* Sinh code để AI ghi trực tiếp dữ liệu cuối

Mọi AI output:

* Phải đi qua UI giáo viên
* Phải có hành động xác nhận

---

### Rule 3.2 – Không thêm role mới

Cursor **KHÔNG ĐƯỢC**:

* Thêm student role
* Thêm parent role
* Thêm admin nghiệp vụ

Mọi code:

* Chỉ xoay quanh teacher

---

### Rule 3.3 – Không vượt Scope Phase 1

Cursor **KHÔNG ĐƯỢC**:

* Đề xuất public library
* Đề xuất sharing bài tập
* Đề xuất marketplace
* Đề xuất báo cáo nâng cao

Nếu cần → ghi rõ:

> “Out of Phase 1 scope – do not implement”

---

### Rule 3.4 – Không suy diễn sư phạm

Cursor **KHÔNG ĐƯỢC**:

* Viết code phân tích năng lực học sinh
* Viết code tính tiến bộ
* Viết code so sánh học sinh

---

## IV. CẤU TRÚC PROMPT BẮT BUỘC KHI DÙNG CURSOR

Mọi prompt gửi cho Cursor **phải có cấu trúc tối thiểu sau**:

1. Phase & Law context
2. Mục tiêu cụ thể của task
3. Những điều KHÔNG ĐƯỢC làm
4. Output mong muốn (format, mức độ)

---

### Mẫu khung prompt chuẩn

```markdown
### Bối cảnh (Context)
- Dự án: TeachFlow  
- Giai đoạn: Phase 1  
- Áp dụng nghiêm ngặt System Law & Phase 1 Law  
- AI không có quyền quyết định, chỉ đóng vai trò hỗ trợ  

### Nhiệm vụ (Task)
- [Mô tả rõ ràng và cụ thể công việc cần thực hiện]

### Ràng buộc (Constraints)
- Không tạo hoặc giới thiệu thêm vai trò người dùng mới  
- Không thêm automation hoặc cơ chế auto-approval  
- Không mở rộng phạm vi vượt quá Phase 1  
- Không suy luận hoặc đánh giá năng lực học sinh  

### Kết quả mong muốn (Output)
- Cung cấp [kế hoạch / code / review] theo yêu cầu  
- Nếu có nội dung nằm ngoài phạm vi Phase 1, phải **chỉ rõ và nói rõ là ngoài scope**
```


---

## V. QUY TẮC THEO TỪNG LOẠI TASK

### 1. Khi yêu cầu Cursor VIẾT CODE

Prompt **bắt buộc** phải có:

* Nhấn mạnh: “manual confirmation required”
* Nhấn mạnh: “teacher-controlled”

Cursor phải:

* Ưu tiên giải pháp đơn giản
* Không “optimize sớm”
* Không đề xuất automation

---

### 2. Khi yêu cầu Cursor REVIEW CODE

Prompt phải yêu cầu Cursor:

* Check vi phạm System Law
* Check vi phạm Scope Phase 1
* Check vi phạm Phase 1 Law

Cursor **không được**:

* Chỉ review syntax / performance
* Bỏ qua logic sản phẩm

---

### 3. Khi yêu cầu Cursor VIẾT PROMPT AI

Prompt phải yêu cầu:

* AI role = assistant
* Output = draft
* Teacher = final decision

Cursor **không được**:

* Viết prompt kiểu “final answer”
* Viết prompt có authority ngầm

---

### 4. Khi yêu cầu Cursor ĐỀ XUẤT KIẾN TRÚC

Cursor phải:

* Đề xuất kiến trúc nhỏ nhất
* Phù hợp Phase 1
* Tránh design “để sau dùng”

Nếu có ý tưởng lớn:

* Phải ghi rõ “future consideration”

---

## VI. CÁC TÌNH HUỐNG PHẢI CHẶN NGAY

Nếu Cursor:

* Đề xuất auto-save AI output
* Đề xuất background AI job
* Đề xuất scoring / ranking
* Đề xuất public sharing

→ **DỪNG LẠI – VI PHẠM RULE-SET**

---

## VII. CHECKLIST NHANH TRƯỚC KHI DÁN PROMPT

Trước khi gửi prompt cho Cursor, tự hỏi:

* Prompt này có nhắc rõ Phase 1 không?
* Prompt này có nhắc rõ AI không authority không?
* Prompt này có liệt kê điều KHÔNG ĐƯỢC làm không?
* Prompt này có yêu cầu Cursor nói “out of scope” nếu cần không?

Nếu thiếu **1 trong 4** → chỉnh prompt lại.

---

## VIII. NGUYÊN TẮC CUỐI CÙNG

Cursor là **công cụ tăng tốc**, không phải người quyết định.

Nếu có mâu thuẫn giữa:

* Tốc độ dev
* Và System Law

→ **System Law thắng tuyệt đối.**

---

## KẾT LUẬN

Rule-set này đảm bảo:

* TeachFlow Phase 1 không bị “vỡ form”
* AI không lấn vai trò giáo viên
* Code sinh ra dùng được, không phải sửa lại

---