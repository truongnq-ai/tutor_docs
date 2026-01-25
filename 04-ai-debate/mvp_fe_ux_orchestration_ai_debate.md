Tài liệu này được viết như một **single source of truth** để:

* FE, BE, AI engineer đọc **không hiểu sai**
* Không còn mâu thuẫn ngầm giữa “UX nói một đằng – code làm một nẻo”
* Giữ nguyên kiến trúc hiện tại, **chỉ chỉnh wording & trách nhiệm**

---

# UX FLOW + FRONTEND ORCHESTRATION – MVP

## Sản phẩm: AI Debate (“AI cãi nhau”)

---

## 1. Mục tiêu của tài liệu hợp nhất

Tài liệu này mô tả **toàn bộ lifecycle của một phiên AI Debate trong MVP**, bao gồm:

* UX Flow nhìn từ phía người dùng
* UX State Machine chi tiết
* Logic điều phối (orchestration) phía Frontend
* Ranh giới trách nhiệm rõ ràng giữa FE và BE

Mục tiêu cốt lõi:

* Tránh lỗi gọi AI sai thứ tự
* Tránh race condition / double request
* Tránh UI render sai trạng thái
* Đảm bảo trải nghiệm tranh luận mạch lạc, có nhịp

---

## 2. Nguyên tắc kiến trúc CHÍNH THỨC (RẤT QUAN TRỌNG)

### 2.1. Source of Truth – Quyết định cuối cùng

**Trong MVP phase:**

* **Frontend là Source of Truth DUY NHẤT** cho:

  * UX State
  * Round hiện tại
  * Thứ tự lượt nói
  * Quyết định khi nào gọi AI A / AI B / Summarizer

* **Backend KHÔNG**:

  * Quản lý state debate
  * Đếm round
  * Quyết định AI nào nói tiếp
  * Lưu session state

Backend chỉ:

* Nhận request
* Gọi AI provider
* Trả về text response

---

### 2.2. Lý do chọn FE-centric orchestration

Quyết định này là **có chủ đích**, vì:

* Sản phẩm mang tính **giải trí thời gian thực**
* UX animation + AI call phải ăn khớp
* FE cần quyền:

  * Stop ngay lập tức
  * Validate response theo state hiện tại
  * Chủ động xử lý edge case UX

👉 BE càng “ngu” bao nhiêu, MVP càng ổn định bấy nhiêu.

---

## 3. UX Flow tổng thể (Happy Path)

Luồng chuẩn của một session:

1. IDLE – User vào trang
2. User nhập chủ đề
3. Transition sang màn tranh luận
4. AI A nói
5. AI B phản biện
6. Lặp theo round
7. Kết thúc tranh luận
8. (Optional) Tổng kết
9. (Optional) Vote
10. User có thể bắt đầu session mới

UX Flow này **được điều phối 100% bởi Frontend**.

---

## 4. UX States (FE-centric State Machine)

### S0 – IDLE

* Màn hình landing
* 1 input trung tâm
* Không có AI activity

Action cho phép:

* Nhập chủ đề
* Start

---

### S1 – INPUT_SUBMITTED

* User đã submit chủ đề
* Chưa gọi AI

UX behavior:

* Input animate / fade
* Chuẩn bị layout tranh luận

---

### S2 – TRANSITION_TO_DEBATE

* Giai đoạn chuyển cảnh
* Topic được “đóng băng” ở header

System behavior:

* Khi animation kết thúc → trigger AI A round 1

---

### S3 – AI_A_SPEAKING

* AI A (Pro) đang phát biểu

UX:

* Indicator “AI A đang trả lời…”
* Disable các control khác (trừ Stop)

System:

* FE gọi ai-service với prompt AI A

---

### S4 – AI_B_SPEAKING

* AI B (Contra) phản biện

UX:

* Indicator “AI B đang phản biện…”

System:

* FE gọi ai-service với prompt AI B
* Prompt bắt buộc chứa message AI A vừa nói

---

### S5 – DEBATE_FINISHED

* Tranh luận kết thúc (đủ round hoặc user Stop)

UX:

* Hiển thị toàn bộ message
* Enable control bar:

  * Summarize
  * Vote
  * Start new debate

---

### S6 – SUMMARIZING

* AI tổng kết đang chạy

UX:

* Loading tại khu vực summary

System:

* FE gọi ai-service với prompt Summarizer

---

### S7 – VOTED

* User đã vote

UX:

* Disable vote button
* Hiển thị lựa chọn đã chọn

---

## 5. Frontend State & Biến cốt lõi

Frontend giữ toàn bộ state sau:

* uxState (enum)
* topic
* round
* maxRounds (MVP: 3)
* messages[] (theo thứ tự thời gian)
* abortController (để huỷ request AI)

Frontend **không suy luận state từ message count**.
State chỉ thay đổi khi **FE chủ động set**.

---

## 6. Orchestration Logic (FE – Conceptual)

Nguyên tắc:

1. Mỗi UX state chỉ được phép gọi **1 loại AI**
2. Response AI chỉ được accept nếu:

   * UX state vẫn đúng như lúc gọi
3. Không có AI call song song
4. Stop có hiệu lực tức thì

### Trình tự điều phối chuẩn

* S2 kết thúc → set S3 → gọi AI A
* AI A xong → push message → set S4 → gọi AI B
* AI B xong:

  * Nếu round < max → round++ → set S3
  * Nếu đủ round → set S5

Summarize:

* Chỉ cho phép khi đang ở S5
* Kết thúc quay lại S5 (có summary)

---

## 7. Stop Logic (Global)

* Chỉ khả dụng trong S3 / S4
* Khi Stop:

  * Abort request AI đang chạy
  * Không accept response về trễ
  * Chuyển thẳng sang S5

Đây là **quyền tuyệt đối của FE**.

---

## 8. Error Handling (MVP – Fail-soft)

Nếu AI error / timeout:

* FE hiển thị thông báo nhẹ
* User có thể:

  * Kết thúc sớm và xem những gì đã có
  * Hoặc bắt đầu session mới

Không reload page bắt buộc.

---

## 9. Trách nhiệm rõ ràng FE vs BE

### Frontend chịu trách nhiệm

* UX State Machine
* Round logic
* Orchestration AI call
* Prompt assembly
* Stop / Abort
* Validate response theo state

### Backend chịu trách nhiệm

* Nhận prompt text
* Gọi AI provider
* Retry kỹ thuật (timeout, network)
* Trả về text thuần

Backend **không biết**:

* Đây là AI A hay AI B
* Round bao nhiêu
* State hiện tại là gì

---

## 10. Kết luận (Quan trọng)

Tài liệu này khẳng định rõ:

> **MVP AI Debate là FE-driven experience.**
> UX, nhịp độ, và sự “đã” của tranh luận **nằm ở Frontend orchestration**, không phải Backend.

Việc hợp nhất tài liệu giúp:

* Không còn mâu thuẫn conceptual
* FE code không cần đoán
* BE implement đúng vai trò “AI adapter”

---

Dưới đây là **nội dung bổ sung Fail-soft Error UX** cho tài liệu
**`mvp_fe_ux_orchestration_ai_debate.md`**.

Tôi giữ đúng tinh thần đã chốt:

* FE-centric
* Không retry tự động
* Ưu tiên trải nghiệm giải trí, không “đá user ra ngoài”

---

# BỔ SUNG: FAIL-SOFT ERROR UX (MVP)

## Vị trí 1 – CẬP NHẬT MỤC 4: UX States (FE-centric State Machine)

### 🔧 Thêm state mới

**Bổ sung state sau S4 – AI_B_SPEAKING**

---

### Sx – AI_ERROR (Fail-soft Error State)

**Mô tả**

* Trạng thái tạm thời khi:

  * AI provider trả lỗi
  * Timeout
  * Network error
* Không làm mất session hiện tại
* Không reset UI
* Không reload page

State này **không phải dead-end**, mà là điểm rẽ để user lựa chọn tiếp.

---

**UI hiển thị**

* Inline error message (nhẹ, không alarming)

  * Ví dụ:
    “AI gặp sự cố trong lượt này.”
* Toàn bộ message đã có **vẫn hiển thị bình thường**
* Không xoá nội dung tranh luận trước đó

---

**Action cho phép (User choice)**

1. **Thử lại lượt này**

   * Retry lại **AI call của state vừa lỗi**
   * Không tăng round
   * Không thay đổi context

2. **Kết thúc sớm & xem tổng kết**

   * Bỏ qua lượt hiện tại
   * Chuyển sang trạng thái `DEBATE_FINISHED`
   * Cho phép Summarize ngay

---

**Action KHÔNG cho phép**

* Tự động retry
* Nhảy sang lượt AI còn lại
* Reset session

---

**Transition**

* Retry → quay lại state trước đó (S3 hoặc S4)
* End early → chuyển sang S5 (DEBATE_FINISHED)

---

## Vị trí 2 – CẬP NHẬT MỤC 7: Error Handling (MVP – Fail-soft)

### 🔧 Thay thế toàn bộ nội dung mục Error Handling cũ

---

## 7. Error Handling – Fail-soft UX (MVP)

Nguyên tắc xử lý lỗi trong MVP:

1. **Không reload page**
2. **Không làm mất nội dung đã có**
3. **Không ép user chờ đợi hoặc retry tự động**
4. **Luôn cho user quyền quyết định**

---

### Các lỗi được xử lý theo Fail-soft

* AI provider error
* Timeout
* Network failure

---

### Hành vi hệ thống khi lỗi xảy ra

* Frontend:

  * Dừng orchestration hiện tại
  * Abort mọi request AI đang pending
  * Lưu lại state ngay trước khi lỗi
* Chuyển UX state sang `AI_ERROR`

---

### Lựa chọn của người dùng

Trong trạng thái `AI_ERROR`, user được chọn:

#### Option 1 – Thử lại lượt này

* Frontend gọi lại **đúng AI role bị lỗi**
* Dùng **cùng prompt & context**
* Không reset round
* Không phát sinh message trùng

#### Option 2 – Kết thúc sớm & xem tổng kết

* Chuyển session sang `DEBATE_FINISHED`
* Cho phép:

  * Summarize
  * Vote
* Tranh luận được xem là kết thúc hợp lệ

---

### Những điều hệ thống KHÔNG làm

* Không retry tự động
* Không chuyển state ngầm
* Không tự động gọi AI khác
* Không reload UI

---

## Vị trí 3 – CẬP NHẬT MỤC 9: Trách nhiệm FE vs BE

### 🔧 Bổ sung thêm 1 bullet cho Frontend

Trong phần **Frontend chịu trách nhiệm**, thêm:

* Xử lý Fail-soft Error UX
* Lưu & khôi phục state khi AI lỗi
* Điều hướng user lựa chọn Retry / End early

Backend **không tham gia** vào logic này.

---

## Vị trí 4 – GHI CHÚ THIẾT KẾ (Optional, nhưng nên có)

### 🔧 Bổ sung cuối tài liệu (Design Notes)

---

## Ghi chú thiết kế – Error UX (MVP)

* Lỗi AI trong sản phẩm giải trí **không nên bị xem là “fatal error”**
* Fail-soft UX giúp:

  * Giữ nhịp trải nghiệm
  * Không làm user bực bội
  * Tăng khả năng hoàn thành session
* Quyết định retry thuộc về user, không phải hệ thống

---

## Kết luận (PM xác nhận)

Bổ sung Fail-soft Error UX giúp:

* MVP “trông trưởng thành” hơn rất nhiều
* Demo ổn định, ít rủi ro xấu hổ
* Không tăng đáng kể độ phức tạp kỹ thuật
* Giữ đúng triết lý **FE-centric orchestration**
