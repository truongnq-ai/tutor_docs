Dưới đây là **phiên bản viết lại TOÀN BỘ tài liệu `mvp_functional_spec_ai_debate`**, ở dạng **text thuần**, đã **tích hợp đầy đủ phần “Entertainment Hook & Replay Value”** và chỉnh lại một số diễn đạt để:

* Rõ **vì sao sản phẩm đáng quay lại**
* Giữ đúng tinh thần **MVP giải trí + AI**
* Đồng bộ tốt hơn với **UX / Prompt / Orchestration** hiện có
* Không phát sinh thêm feature hay độ phức tạp kỹ thuật

Tôi viết tài liệu này như một **PM chịu trách nhiệm bàn giao cho team FE/BE/AI cùng code**.

---

# TÀI LIỆU CHỨC NĂNG / NGHIỆP VỤ – MVP

## Sản phẩm: AI Debate (“AI cãi nhau”)

---

## 1. Mục tiêu của MVP

### 1.1. Mục tiêu chính

MVP nhằm chứng minh rằng:

* Người dùng **chỉ cần nhập 1 chủ đề ngắn**
* Hệ thống có thể **tổ chức một cuộc tranh luận có cấu trúc** giữa 2 AI với lập trường đối lập rõ ràng
* Trải nghiệm mang tính **giải trí cao**:

  * Dễ hiểu
  * Nhanh
  * Có nhịp điệu
  * Đủ “đã” để người dùng muốn thử lại

Trọng tâm của MVP **không phải độ đúng học thuật**, mà là:

> **Cảm giác “xem tranh luận” thú vị, mạch lạc và có cá tính.**

---

### 1.2. Câu hỏi sản phẩm cốt lõi cần trả lời

MVP phải trả lời được 2 câu hỏi:

1. *“Chỉ trong 5–10 giây, user có hiểu đây là sản phẩm gì không?”*
2. *“Sau lần xem đầu tiên, điều gì khiến user muốn nhập chủ đề khác?”*

Toàn bộ scope MVP được thiết kế để trả lời **2 câu hỏi trên**, không hơn.

---

### 1.3. Mục tiêu KHÔNG thuộc MVP

MVP **không** nhằm:

* Tạo hệ thống tranh luận học thuật chuẩn chỉnh
* Cho user tham gia tranh luận
* Cá nhân hoá AI theo user
* Social, share, login, lưu lịch sử
* Monetization

Mọi thứ không trực tiếp phục vụ **trải nghiệm “xem AI cãi nhau”** đều bị loại khỏi MVP.

---

## 2. Định vị sản phẩm (Product Positioning – MVP)

### 2.1. Bản chất sản phẩm

AI Debate là:

* Một **trải nghiệm giải trí tương tác**
* User đóng vai trò **khán giả + người khơi mào**
* AI đóng vai **nhân vật tranh luận**, không phải trợ lý

Sản phẩm **không yêu cầu học cách dùng**.

---

### 2.2. Entertainment Hook & Replay Value (BẮT BUỘC)

Đây là phần **trước đây còn thiếu**, nay được bổ sung để làm rõ vì sao user quay lại.

MVP phải tạo được các “hook” sau:

#### Hook 1 – Chủ đề vào nhanh, không cần nghĩ nhiều

* User có thể:

  * Gõ tự do
  * Hoặc chọn chủ đề gợi ý (trending / gây tranh cãi / hài hước)
* Chủ đề càng “đụng chạm quan điểm” → tranh luận càng thú vị

> Mục tiêu: **giảm friction suy nghĩ**, tăng số lần thử.

---

#### Hook 2 – Cảm giác “AI có cá tính”

Dù logic tranh luận bị ép chặt, người dùng **phải cảm nhận được**:

* AI A: chủ động, bảo vệ quan điểm
* AI B: phản biện sắc, bắt lỗi

Cá tính được tạo ra bằng:

* Prompt role rõ ràng
* Nhịp lượt nói dứt khoát
* Không nói kiểu trung lập, nước đôi

---

#### Hook 3 – Nhịp độ nhanh, không lê thê

* Mỗi lượt:

  * Ngắn
  * Tập trung 1–2 luận điểm
* Số round giới hạn (MVP: 3)
* User **không bị “mắc kẹt”** trong tranh luận dài

> Mục tiêu: xem xong vẫn còn “thèm”, không bị mệt.

---

## 3. Đối tượng người dùng (User Scope – MVP)

### 3.1. Persona chính

* Developer, PM, người làm tech
* Người tò mò về AI
* Người thích tranh luận, phản biện, hoặc xem tranh luận

---

### 3.2. Hành vi kỳ vọng

* Vào trang → hiểu ngay phải làm gì
* Nhập chủ đề trong < 10 giây
* Xem AI tranh luận như xem “trận đấu”
* Sau khi xong:

  * Muốn thử chủ đề khác
  * Hoặc xem tổng kết
  * Hoặc vote cho vui

---

## 4. Phạm vi chức năng MVP (Functional Scope)

### 4.1. Nhóm chức năng CORE (BẮT BUỘC)

---

### F1. Nhập chủ đề tranh luận

* User nhập 1 đoạn text ngắn (1–3 câu)
* Không giới hạn domain:

  * Tech
  * Đời sống
  * Triết học
  * Công việc
  * Chủ đề gây tranh cãi

**Acceptance Criteria**

* Không cho submit input rỗng
* Có placeholder gợi ý rõ ràng
* Không yêu cầu đăng nhập

---

### F2. Khởi tạo phiên tranh luận (Debate Session)

* Mỗi lần submit tạo **1 session mới**
* Gán vai trò cố định:

  * AI A: ỦNG HỘ (Pro)
  * AI B: PHẢN ĐỐI (Contra)

**Acceptance Criteria**

* Session không reuse context cũ
* Topic là immutable trong session

---

### F3. Tranh luận theo vòng (Round-based Debate)

* Tranh luận diễn ra theo vòng
* Mỗi vòng gồm:

  1. AI A đưa luận điểm
  2. AI B phản biện trực tiếp

MVP config mặc định:

* 3 rounds

**Acceptance Criteria**

* AI B bắt buộc phản hồi luận điểm AI A vừa nói
* Không nói lan man ngoài chủ đề
* Không kết luận thắng thua

---

### F4. Hiển thị tranh luận dạng đối đầu

* UI chia 2 phía rõ ràng
* Mỗi AI có:

  * Avatar cố định
  * Nhãn lập trường

**Acceptance Criteria**

* Thứ tự message rõ ràng theo thời gian
* Có indicator “AI đang trả lời”
* Không render message sai state

---

### F5. Dừng tranh luận (Stop)

* User có thể Stop bất kỳ lúc nào khi AI đang nói
* Khi Stop:

  * Huỷ request AI đang chạy
  * Không gọi thêm lượt mới
  * Chuyển sang trạng thái FINISHED

**Acceptance Criteria**

* Không phát sinh message sau khi Stop
* UI phản hồi ngay lập tức

---

## 5. Nhóm chức năng HẬU TRANH LUẬN

### F6. Tổng kết tranh luận (Summarize)

* Chỉ khả dụng sau khi tranh luận kết thúc
* AI tổng kết:

  * Luận điểm chính của AI A
  * Luận điểm chính của AI B
  * Điểm còn tranh cãi

**Acceptance Criteria**

* Không thêm luận điểm mới
* Không phán xét bên nào đúng

---

### F7. Bình chọn kết quả (Vote)

* User chọn:

  * AI A thuyết phục hơn
  * AI B thuyết phục hơn
  * Không bên nào

**Acceptance Criteria**

* Mỗi session chỉ vote 1 lần
* Vote không ảnh hưởng logic tranh luận

---

## 6. Luật nghiệp vụ cốt lõi (Business Rules)

* Lập trường AI là **bất biến**
* Mỗi lượt phải có phản biện thực chất
* Giới hạn độ dài mỗi message (80–150 từ)
* Không công kích cá nhân
* Không ngôn ngữ thù ghét, kích động

---

## 7. User Flow – Happy Path (MVP)

1. User vào trang
2. Nhập hoặc chọn chủ đề
3. Nhấn Enter / Start
4. Xem AI tranh luận
5. (Optional) Stop
6. (Optional) Summarize
7. (Optional) Vote
8. User có thể bắt đầu session mới

---

## 8. Tiêu chí hoàn thành MVP

MVP được xem là đạt khi:

* User hiểu cách dùng trong < 10 giây
* Tranh luận mạch lạc, không lỗi state
* Có cảm giác giải trí, không khô
* User **tự nhiên muốn thử chủ đề khác**

---

### Nhận định cuối cùng (PM)

Sau khi bổ sung phần **Entertainment Hook & Replay Value**, tài liệu này:

* Trả lời rõ “vì sao user quay lại”
* Định hướng đúng cho UX + Prompt
* Không làm phình scope kỹ thuật
* Phù hợp để **build – demo – iterate nhanh**

Nếu bạn muốn, bước tiếp theo hợp lý là:

* Viết **Checklist đánh giá trải nghiệm replay (qualitative)** cho mỗi iteration MVP.
