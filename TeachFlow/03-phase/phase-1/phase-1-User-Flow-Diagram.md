# USER FLOW DIAGRAM – OVERVIEW

## Phase 1 – TeachFlow

---

## 1. Mục đích của Overview Diagram

Overview Diagram tồn tại để:

* Thể hiện **chuỗi giá trị cốt lõi duy nhất** của Phase 1
* Khóa **thứ tự bắt buộc** giữa các flow
* Chỉ rõ:

  * Flow nào tạo nền
  * Flow nào tạo giá trị
  * Flow nào chỉ là vòng lặp sử dụng

Overview Diagram **không nhằm**:

* Tối ưu UX
* Gợi ý hành vi
* Tạo insight hệ thống

---

## 2. Giả định & ràng buộc toàn cục (Phase 1 Hard Lock)

Áp dụng cho **toàn bộ sơ đồ A–B–C–D**:

* User duy nhất: **Giáo viên**
* Không tồn tại:

  * Student flow
  * Parent flow
  * Admin nghiệp vụ
* AI:

  * Chỉ xuất hiện ở Flow B và C
  * Luôn là *assistant / draft*
* Không có:

  * Automation
  * Background job
  * Auto-trigger giữa các flow

👉 Bất kỳ diagram nào vi phạm các điểm trên → **không hợp lệ cho Phase 1**.

---

## 3. Tổng quan chuỗi Flow A–B–C–D

### Chuỗi giá trị duy nhất của Phase 1

```
[ Flow A ]
   ↓
[ Flow B ]
   ↓
[ Flow C ]
   ↓
[ Flow D ]
   ↺ (quay lại Flow B hoặc C)
```

**Không tồn tại chuỗi thay thế.**
**Không tồn tại flow song song.**

---

## 4. Vai trò của từng Flow trong tổng thể

### Flow A – Class Setup Flow

**Vai trò:** Tạo nền tảng làm việc
**Tạo dữ liệu:** Class, Student (tối thiểu)
**AI:** Không tham gia

👉 Nếu không có Flow A → hệ thống **không có ngữ cảnh dạy học**.

---

### Flow B – Exercise Creation Flow

**Vai trò:** Chuẩn bị nội dung dạy
**Tạo dữ liệu:** Exercise (`DRAFT` → `APPROVED`)
**AI:** Có (soạn nháp)

👉 Flow B **không tạo hành động dạy**, chỉ tạo **công cụ để dạy**.

---

### Flow C – Exercise Usage Flow

**Vai trò:** Thực thi dạy học tối thiểu
**Tạo dữ liệu:** Result, Comment
**AI:** Có (gợi ý nhận xét)

👉 Đây là **flow duy nhất chạm tới học sinh**, dù học sinh không login.

---

### Flow D – Weekly Teacher Loop

**Vai trò:** Vòng lặp sử dụng thực tế
**Tạo dữ liệu:** Không tạo mới
**AI:** Không tham gia trực tiếp

👉 Flow D **không phải feature**, mà là **pattern hành vi**.

---

## 5. Entry & Exit ở mức toàn hệ thống

### Entry toàn hệ thống (Phase 1)

* Giáo viên đăng nhập
* Chưa yêu cầu:

  * Lớp
  * Bài
  * Dữ liệu lịch sử

👉 Entry luôn dẫn vào **Flow A hoặc danh sách lớp đã có**.

---

### Exit toàn hệ thống (mỗi phiên làm việc)

* Giáo viên:

  * Hoàn thành một hành động có ý nghĩa:

    * Tạo lớp
    * Soạn bài
    * Ghi nhận kết quả
* Không có:

  * Tổng kết tự động
  * Báo cáo
  * Nhắc việc

---

## 6. Quan hệ phụ thuộc giữa các Flow (Dependency Rules)

### Phụ thuộc bắt buộc

* Flow B **phải phụ thuộc** Flow A
* Flow C **phải phụ thuộc** Flow B (`APPROVED`)
* Flow D **chỉ tồn tại nếu** A + B + C đã từng xảy ra

---

### Không tồn tại shortcut

CẤM tuyệt đối:

* A → C (chưa có bài)
* A → D
* B (`DRAFT`) → C
* AI → C (không qua giáo viên)

---

## 7. Điểm xuất hiện của AI trong toàn sơ đồ

| Flow   | AI có mặt | Vai trò            |
| ------ | --------- | ------------------ |
| Flow A | ❌         | Không tham gia     |
| Flow B | ✅         | Soạn nội dung nháp |
| Flow C | ✅         | Gợi ý nhận xét     |
| Flow D | ❌         | Không tham gia     |

👉 Không có flow nào AI là **actor chính**.

---

## 8. Forbidden Global Transitions (CẤM TOÀN CỤC)

Toàn bộ Phase 1 **không bao giờ cho phép**:

* AI khởi tạo flow
* AI kết thúc flow
* Flow tự chuyển trạng thái
* Flow chạy nền

Nếu một proposal cần các điều trên → **ngoài Phase 1 scope**.

---

## 9. Mapping sang bước tiếp theo (Lock-in)

Overview Diagram này **là chuẩn gốc** cho:

* UI-spec skeleton
  → UI **chỉ được render những flow này**
* API boundary
  → API **chỉ tồn tại để phục vụ các bước trong flow**

Mọi UI / API **không gắn được vào A–B–C–D**
→ **Không được phép tồn tại trong Phase 1**.

---

## 10. Ghi chú chốt Phase 1 (PM Final Lock)

Phase 1 của TeachFlow **chỉ có một vòng giá trị**:

> Tạo lớp → Soạn bài → Dùng bài → Lặp lại hàng tuần

Không dashboard.
Không insight.
Không AI quyết định.

Nếu vòng này **đủ dùng trong đời thực**
→ Phase 1 thành công.

---

### ✅ CHỐT OVERVIEW DIAGRAM

* A–B–C–D là **xương sống duy nhất**
* Mọi thứ khác hoặc:

  * Chưa cần, hoặc
  * Để Phase sau

---

# USER FLOW DIAGRAM

## Flow A – Class Setup Flow (Thiết lập lớp)

---

## 1. Mục đích của Flow A (Flow Intent)

**Giá trị cốt lõi (Core Value):**
👉 **Tạo không gian làm việc ban đầu cho giáo viên**

Flow A tồn tại để:

* Tạo ra **đơn vị làm việc tối thiểu** (Class)
* Gom học sinh vào một ngữ cảnh cụ thể
* Chuẩn bị điều kiện cần cho:

  * Flow B – Soạn bài
  * Flow C – Sử dụng bài

Flow A **không tạo ra hoạt động dạy học**, chỉ tạo **cấu trúc làm việc**.

---

## 2. Giả định & ràng buộc toàn cục (Hard Constraints)

Flow A **bắt buộc tuân thủ**:

* Người dùng duy nhất: **Giáo viên**
* Không tồn tại:

  * Học sinh login
  * Phụ huynh login
  * Admin nghiệp vụ
* Không có AI tham gia
* Không có:

  * Phân tích
  * Thống kê
  * Gợi ý thông minh
  * Automation ngầm

👉 Nếu trong diagram xuất hiện **AI node / analytics node** → **Flow A sai**.

---

## 3. Entry Condition (Điều kiện bắt đầu Flow)

Flow A bắt đầu khi:

* Giáo viên đã đăng nhập hệ thống
* Giáo viên:

  * Chưa có lớp nào **hoặc**
  * Muốn tạo thêm lớp mới

**Không yêu cầu trước:**

* Có học sinh
* Có bài tập
* Có lịch dạy

---

## 4. Main User Flow (Happy Path)

### Bước A1 – Khởi tạo lớp học

**Actor:** Giáo viên
**Hành động:**

* Chọn hành động “Tạo lớp”
* Nhập:

  * Tên lớp (bắt buộc)
  * Mô tả ngắn (không bắt buộc)

**Kết quả:**

* Một Class mới được tạo
* Class **luôn gắn với 1 teacher**

**Luật bất biến:**

* Không có trạng thái public / shared
* Không có trạng thái “nháp / duyệt”

---

### Bước A2 – Gán môn học cho lớp

**Actor:** Giáo viên
**Hành động:**

* Chọn **1 môn học** từ danh sách có sẵn

**Đặc điểm:**

* Môn học là seed data
* Read-only với giáo viên

**Luật nghiêm cấm:**

* Giáo viên tạo / sửa / xóa môn học
* Hệ thống tự gán môn học

---

### Bước A3 – Thêm học sinh (tối thiểu)

**Actor:** Giáo viên
**Hành động:**

* Thêm học sinh vào lớp
* Có thể:

  * Thêm
  * Sửa tên
  * Xóa

**Dữ liệu được phép:**

* Tên / biệt danh
* Ghi chú tự do (text)

**Luật cấm tuyệt đối:**

* Không lưu thông tin nhạy cảm
* Không suy diễn năng lực
* Không có điểm số
* Không có phân loại học sinh

👉 Việc thêm học sinh **không bắt buộc** để hoàn thành Flow A.

---

### Bước A4 – Ghi chú lớp (tùy chọn)

**Actor:** Giáo viên
**Hành động:**

* Nhập ghi chú lớp:

  * Đặc điểm lớp
  * Lưu ý cá nhân
  * Nhắc việc riêng

**Đặc điểm:**

* Hoàn toàn thủ công
* Không có AI hỗ trợ
* Không có xử lý ngôn ngữ

---

## 5. Optional Paths (Nhánh phụ hợp lệ)

Flow A **chỉ cho phép các nhánh sau**:

* Tạo lớp **không thêm học sinh**
* Tạo lớp **không ghi chú**
* Thêm học sinh **sau** khi lớp đã tồn tại

Không tồn tại:

* Nhánh “hoàn tất nhanh bằng AI”
* Nhánh “tạo lớp mẫu”
* Nhánh “import danh sách học sinh”

---

## 6. Exit Condition (Điều kiện kết thúc Flow)

Flow A được xem là **hoàn thành hợp lệ** khi:

* Lớp tồn tại trong hệ thống
* Lớp có:

  * Tên lớp
  * Môn học

Sau Exit:

* Lớp **sẵn sàng để dùng cho Flow B**
* Không có hành động tự động tiếp theo

---

## 7. Dữ liệu được tạo ra (Data Outcome – Logical)

### Class (Phase 1 – tối thiểu)

* `class_id`
* `teacher_id`
* `name`
* `subject_id`
* `description` (optional)
* `note` (optional)

### Student (Phase 1 – tối thiểu)

* `student_id`
* `class_id`
* `name`
* `note` (optional)

Không tồn tại:

* Trạng thái học tập
* Kết quả
* Phân tích

---

## 8. Forbidden Transitions (CẤM TUYỆT ĐỐI)

Flow A **không bao giờ được phép dẫn tới**:

* Flow B nếu **chưa có môn học**
* Bất kỳ flow nào liên quan:

  * Bài tập
  * Điểm số
  * Nhận xét
  * AI

Cấm tuyệt đối:

* “Tạo lớp → gợi ý bài tập”
* “Tạo lớp → AI phân tích lớp”

---

## 9. Liên kết với các Flow khác

* Flow A là **tiền đề bắt buộc** cho:

  * Flow B – Exercise Creation
  * Flow C – Exercise Usage
* Flow D **không tồn tại** nếu không có Flow A

---

## 10. Ghi chú khóa phạm vi (PM Lock-in Note)

Flow A **cố tình đơn giản**.

> Nếu Flow A trở nên “thông minh”,
> Phase 1 sẽ trượt scope ngay lập tức.

Do đó:

* Không thêm insight
* Không thêm automation
* Không thêm AI

---

### ✅ CHỐT FLOW A

Flow A tồn tại để:

* Tạo **không gian làm việc**
* Không tạo quyết định
* Không tạo phân tích
* Không tạo authority cho AI

---

## Flow B – Exercise Creation Flow

*(Soạn bài tập + AI hỗ trợ ở mức nháp)*

---

## 1. Mục đích của Flow B (Flow Intent)

**Giá trị cốt lõi (Core Value):**
👉 **Giảm thời gian soạn bài cho giáo viên, nhưng giữ toàn quyền kiểm soát**

Flow B tồn tại để:

* Giúp giáo viên tạo bài tập nhanh hơn
* Chuẩn hóa cách lưu trữ bài tập
* Cho phép AI hỗ trợ **ở mức soạn thảo**

Flow B **không nhằm**:

* Tự động hóa dạy học
* Chuẩn hóa sư phạm
* Tạo bài “dùng ngay” không cần đọc lại

---

## 2. Giả định & ràng buộc toàn cục (Hard Constraints)

Flow B **bắt buộc tuân thủ**:

* Người dùng duy nhất: **Giáo viên**
* Bài tập **luôn thuộc sở hữu của giáo viên**
* Trạng thái bài tập (Phase 1):

  * `DRAFT`
  * `APPROVED`
* AI:

  * Không có authority
  * Không auto-save dữ liệu cuối
  * Không auto-approve
* Không có:

  * Chia sẻ bài tập
  * Public library
  * Review bởi người khác

👉 Nếu flow cho phép **AI quyết định** → **Flow B sai**.

---

## 3. Entry Condition (Điều kiện bắt đầu Flow)

Flow B bắt đầu khi:

* Giáo viên đã đăng nhập
* Giáo viên **đã có ít nhất 1 lớp** (Flow A)

Giáo viên có thể khởi động Flow B từ:

* Trang danh sách bài tập
* Trang lớp học
* Hành động “Tạo bài tập”

---

## 4. Flow Overview (Tách nhánh – Hội tụ)

Flow B có **2 nhánh khởi tạo**, nhưng **chỉ 1 lối ra hợp lệ**:

```
          ┌─ Tạo thủ công ─┐
Start ────┤                 ├─→ Chỉnh sửa → Gán metadata → APPROVE
          └─ Tạo với AI ───┘
```

👉 Không có nhánh “AI tạo xong → dùng luôn”.

---

## 5. Main User Flow (Happy Path)

### Bước B1 – Chọn cách tạo bài tập

**Actor:** Giáo viên
**Hành động:**

* Chọn 1 trong 2:

  1. Tạo bài tập thủ công
  2. Tạo bài tập với AI hỗ trợ

**Luật:**

* Hai nhánh **phải hội tụ** ở cùng một luồng chỉnh sửa
* Không có nhánh ưu tiên AI

---

### Bước B2A – Tạo bài tập thủ công

**Actor:** Giáo viên
**Hành động:**

* Nhập nội dung bài tập bằng tay

**Đặc điểm:**

* Hệ thống không can thiệp
* Không có AI tự động chỉnh sửa

---

### Bước B2B – Tạo bài tập với AI hỗ trợ (Draft)

**Actor:** Giáo viên
**Hành động:**

* Cung cấp input tường minh:

  * Môn học
  * Topic (chọn từ danh sách có sẵn)
  * Yêu cầu nội dung (text)

**Vai trò AI:**

* Sinh **nội dung nháp**
* Ngôn từ trung lập
* Không suy diễn trình độ học sinh

**Luật bắt buộc:**

* Output AI:

  * Luôn ở trạng thái `DRAFT`
  * Không tự lưu thành dữ liệu cuối
  * Không tự gán metadata

---

### Bước B3 – Chỉnh sửa nội dung bài tập (Bắt buộc)

**Actor:** Giáo viên
**Hành động:**

* Chỉnh sửa toàn bộ nội dung:

  * Viết lại
  * Xóa
  * Giữ một phần AI sinh

**Luật tuyệt đối:**

* Giáo viên chịu trách nhiệm **100% nội dung**
* Không tồn tại khái niệm “AI-generated final content”

---

### Bước B4 – Gán metadata (Teacher-controlled)

**Actor:** Giáo viên

**Metadata bắt buộc:**

* Môn học (read-only)
* **1 topic chính** (read-only taxonomy)

**Metadata tùy chọn:**

* Độ khó
* Loại bài (practice / quiz – chỉ metadata)

**Luật cấm:**

* AI tự chọn topic
* AI tự gán độ khó
* AI suy diễn metadata từ nội dung

---

### Bước B5 – APPROVE bài tập (Human-in-the-loop)

**Actor:** Giáo viên
**Hành động:**

* Chủ động bấm **APPROVE**

**Ý nghĩa APPROVE:**

* Cho phép dùng bài này cho **lớp của chính mình**
* Không liên quan:

  * Public
  * Share
  * Chuẩn sư phạm

**Luật nghiêm ngặt:**

* Không auto-approve
* Không background approve
* Không AI-triggered approve

---

## 6. Optional Paths (Nhánh phụ hợp lệ)

Flow B **cho phép**:

* Lưu bài ở trạng thái `DRAFT`
* Quay lại chỉnh sửa bài `DRAFT`
* Hủy bỏ bài chưa APPROVED

Flow B **không cho phép**:

* Gán bài khi còn `DRAFT`
* Bỏ qua bước chỉnh sửa
* APPROVE ngay sau khi AI sinh

---

## 7. Exit Condition (Điều kiện kết thúc Flow)

Flow B kết thúc hợp lệ khi:

* Bài tập ở trạng thái **`APPROVED`**
* Bài tập:

  * Thuộc giáo viên hiện tại
  * Sẵn sàng cho Flow C

Nếu bài ở `DRAFT`:

* Flow **chưa kết thúc**
* Bài **chưa được dùng**

---

## 8. Dữ liệu được tạo ra (Data Outcome – Logical)

### Exercise (Phase 1)

* `exercise_id`
* `teacher_id`
* `content`
* `subject_id`
* `topic_id`
* `difficulty` (optional)
* `type` (optional)
* `status` (`DRAFT` / `APPROVED`)

Không tồn tại:

* Quality score
* Usage count
* Visibility scope

---

## 9. Forbidden Transitions (CẤM TUYỆT ĐỐI)

Flow B **cấm**:

* `DRAFT` → Flow C
* AI output → auto-save final
* AI output → auto-approve
* AI output → auto-assign

Cấm tuyệt đối:

* “AI tạo xong → dùng ngay”
* “AI chọn topic giúp”

---

## 10. Liên kết với các Flow khác

* Flow B:

  * **Phụ thuộc Flow A**
  * Là tiền đề bắt buộc cho Flow C
* Flow C **chỉ nhận** bài:

  * `APPROVED`
  * Thuộc giáo viên hiện tại

---

## 11. Ghi chú khóa phạm vi (PM Lock-in Note)

Flow B là **điểm rủi ro lớn nhất của Phase 1**.

> Chỉ cần 1 nút “Dùng luôn”
> → TeachFlow biến thành “AI teacher”.

Do đó:

* Luật phải siết chặt
* UX phải phòng thủ
* AI phải “ở vai phụ”

---

### ✅ CHỐT FLOW B

Flow B tồn tại để:

* **Giảm tải soạn bài**
* Không thay giáo viên
* Không tạo authority cho AI
* Không mở đường sang LMS

---

## Flow C – Exercise Usage Flow

*(Gán bài – Ghi nhận kết quả – Nhận xét thủ công / AI gợi ý)*

---

## 1. Mục đích của Flow C (Flow Intent)

**Giá trị cốt lõi (Core Value):**
👉 **Giúp giáo viên sử dụng bài tập trong thực tế dạy học và ghi nhận kết quả một cách gọn gàng, có kiểm soát**

Flow C cho phép giáo viên:

* Gán bài tập đã soạn cho lớp
* Ghi nhận kết quả làm bài
* Viết nhận xét nhanh hơn (AI chỉ gợi ý)

Flow C **không nhằm**:

* Đánh giá năng lực học sinh
* Theo dõi tiến bộ
* Tạo báo cáo, biểu đồ, insight

---

## 2. Giả định & ràng buộc toàn cục (Hard Constraints)

Flow C **bắt buộc tuân thủ**:

* User duy nhất: **Giáo viên**
* Không tồn tại:

  * Student login
  * Parent login
  * Admin nghiệp vụ
* AI:

  * Không đánh giá học sinh
  * Không quyết định nội dung nhận xét
  * Không auto-save / auto-apply
* Không có:

  * Chấm bài tự động
  * Phân tích kết quả
  * Tổng hợp tiến bộ
  * Giao tiếp ngoài hệ thống

👉 Nếu Flow C có **analytics node** → sai Phase 1.

---

## 3. Entry Condition (Điều kiện bắt đầu Flow)

Flow C bắt đầu khi:

* Giáo viên đã đăng nhập
* Đã tồn tại:

  * Ít nhất 1 lớp (Flow A)
  * Ít nhất 1 bài tập ở trạng thái **`APPROVED`** (Flow B)

**Luật cứng:**

* Bài `DRAFT` **không được phép** đi vào Flow C

---

## 4. Main User Flow (Happy Path)

### Bước C1 – Chọn lớp & bài tập

**Actor:** Giáo viên
**Hành động:**

* Chọn:

  * 1 lớp
  * 1 bài tập đã `APPROVED` (thuộc sở hữu của mình)

**Luật:**

* Không hiển thị bài của giáo viên khác
* Không hiển thị bài `DRAFT`

---

### Bước C2 – Gán bài tập cho lớp

**Actor:** Giáo viên
**Hành động:**

* Chủ động bấm **“Gán bài”**

**Ý nghĩa gán bài:**

* Bài được sử dụng trong **ngữ cảnh lớp**
* Không tạo bản sao bài tập
* Không gửi thông báo

**Luật tuyệt đối:**

* Không auto-assign
* Không assign nền
* Không assign hàng loạt không kiểm soát

---

### Bước C3 – Ghi nhận kết quả làm bài

**Actor:** Giáo viên
**Hành động:**

* Với từng học sinh:

  * Nhập **điểm số** *hoặc*
  * Chọn **Đạt / Không đạt**

**Luật áp dụng:**

* Kết quả:

  * Chỉ có giá trị trong **bài + lớp**
  * Không dùng cho phân tích hệ thống

**Luật cấm:**

* Không tính trung bình
* Không xếp hạng
* Không gán nhãn năng lực

---

### Bước C4 – Ghi nhận nhận xét thủ công

**Actor:** Giáo viên
**Hành động:**

* Nhập nhận xét tự do cho từng học sinh

**Đặc điểm:**

* Không bắt buộc
* Không có chuẩn hệ thống
* Không bị xử lý tự động

---

### Bước C5 – AI gợi ý nhận xét (TÙY CHỌN)

**Actor:** Giáo viên
**Hành động:**

* Chủ động yêu cầu AI:

  * Gợi ý **nhận xét ngắn**

**Input cho AI (tường minh):**

* Kết quả bài
* Nội dung bài tập
* Yêu cầu cụ thể của giáo viên

**Vai trò AI:**

* Chỉ sinh **gợi ý câu chữ**
* Không đánh giá học sinh
* Không kết luận sư phạm

**Luật bắt buộc:**

* Nhận xét AI:

  * Luôn editable
  * Không auto-save
  * Không auto-apply

---

### Bước C6 – Lưu kết quả (Human-in-the-loop)

**Actor:** Giáo viên
**Hành động:**

* Chủ động bấm **“Lưu”**

**Ý nghĩa lưu:**

* Xác nhận dữ liệu cuối
* AI **không liên quan** tới hành động này

---

## 5. Optional Paths (Nhánh phụ hợp lệ)

Flow C **cho phép**:

* Ghi kết quả **từng phần**
* Lưu tạm (nếu cần UX), nhưng:

  * Không tạo insight
  * Không trigger logic khác
* Sửa nhận xét trước khi lưu

Flow C **không cho phép**:

* Lưu tự động khi AI sinh
* Lưu hàng loạt không kiểm soát
* Áp dụng nhận xét AI cho nhiều học sinh cùng lúc

---

## 6. Exit Condition (Điều kiện kết thúc Flow)

Flow C được xem là **hoàn thành cho một bài tập** khi:

* Bài đã được gán cho lớp
* Giáo viên đã:

  * Ghi nhận kết quả
  * (Tùy chọn) ghi nhận nhận xét
* Dữ liệu đã được **giáo viên xác nhận lưu**

Flow C **có thể lặp lại** nhiều lần trong tuần.

---

## 7. Dữ liệu được tạo ra (Data Outcome – Logical)

### Assignment / Usage Record (Phase 1)

* `assignment_id`
* `class_id`
* `exercise_id`
* `student_id`
* `result` (score / pass-fail)
* `comment` (optional)

Không tồn tại:

* Progress
* Trend
* Aggregate metrics

---

## 8. Forbidden Transitions (CẤM TUYỆT ĐỐI)

Flow C **cấm**:

* `DRAFT` Exercise → Flow C
* AI → Lưu dữ liệu
* AI → Áp dụng nhận xét
* Kết quả → Phân tích

Cấm tuyệt đối:

* “AI đánh giá học sinh”
* “AI tổng hợp nhận xét”
* “AI kết luận tiến bộ”

---

## 9. Liên kết với các Flow khác

* Flow C:

  * Phụ thuộc Flow A (Class)
  * Phụ thuộc Flow B (`APPROVED`)
* Flow D:

  * Sử dụng lại dữ liệu Flow C
  * **Không** phân tích dữ liệu Flow C

---

## 10. Ghi chú khóa phạm vi (PM Lock-in Note)

Flow C là **ranh giới cuối** trước khi TeachFlow biến thành LMS.

> Chỉ cần thêm:
>
> * 1 biểu đồ
> * 1 câu “nhận xét tổng hợp”
>   → Phase 1 coi như vỡ.

Do đó:

* Giữ Flow C **thủ công**
* AI chỉ là **trợ lý viết chữ**
* Mọi quyết định thuộc về giáo viên

---

### ✅ CHỐT FLOW C

Flow C tồn tại để:

* **Ghi nhận**, không phân tích
* **Hỗ trợ**, không đánh giá
* **Con người quyết định**, AI gợi ý

---

## BƯỚC TIẾP THEO (KHUYẾN NGHỊ CHỐT)

Sau khi hoàn tất User Flow Diagram A–B–C–D, bước đúng tiếp theo trong **Hướng 1 – Khóa sản phẩm** là:

👉 **UI-spec skeleton (khung UI theo flow, không thiết kế chi tiết)**

Nếu bạn muốn, tôi có thể:

* Viết **UI-spec skeleton tổng thể**
  hoặc
* Viết **UI-spec skeleton cho từng flow (A → D)**

Chỉ cần trả lời: **“Làm UI-spec skeleton”** hoặc nói rõ phạm vi bạn muốn bắt đầu.
