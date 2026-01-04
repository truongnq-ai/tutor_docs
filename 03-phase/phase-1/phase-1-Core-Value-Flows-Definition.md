Dưới đây là tài liệu **Phase 1 – Core Value Flows Definition**
Phần **Flow A – Class Setup Flow (Thiết lập lớp)** được viết theo đúng tư duy **PM + Phase-1-safe**, bám chặt **System Law / Scope Phase 1 / Phase 1 Law** mà bạn đã khóa.

Tài liệu này có thể dùng trực tiếp để:

* Review scope
* Thiết kế UI
* Thiết kế API
* Review PR
* Viết prompt cho Cursor

---

# PHASE 1 – CORE VALUE FLOWS DEFINITION

## Flow A – Class Setup Flow (Thiết lập lớp)

---

## 1. Mục đích của Flow A

**Giá trị cốt lõi (Core Value):**
👉 **Tạo không gian làm việc cho giáo viên**

Flow A tồn tại để giúp giáo viên:

* Tạo một “đơn vị làm việc” rõ ràng (lớp học)
* Tổ chức học sinh theo lớp
* Chuẩn bị nền tảng để **soạn bài và sử dụng bài tập**

Flow này **không phục vụ dạy học trực tiếp**, mà phục vụ **tổ chức công việc**.

---

## 2. Phạm vi Flow (In Scope – Phase 1)

Flow A **chỉ bao gồm các hành động sau**:

1. Tạo lớp học
2. Gán môn học cho lớp
3. Thêm / chỉnh sửa / xóa học sinh (mức dữ liệu tối thiểu)
4. Ghi chú mô tả lớp

---

## 3. Những gì Flow A KHÔNG BAO GIỜ LÀM

Theo System Law & Phase 1 Law:

* ❌ Không có học sinh login
* ❌ Không có phụ huynh
* ❌ Không có phân tích lớp
* ❌ Không có thống kê, biểu đồ
* ❌ Không có đánh giá chất lượng lớp
* ❌ Không có logic “tiến bộ”, “mạnh/yếu”

Flow A **chỉ tạo cấu trúc**, không tạo insight.

---

## 4. Đối tượng sử dụng (User Context)

* **User duy nhất:** Giáo viên
* Mọi hành động trong flow đều giả định:

  > “Người đang thao tác là giáo viên – chủ sở hữu lớp”

Không tồn tại:

* Role học sinh
* Role phụ huynh
* Role admin nghiệp vụ

---

## 5. Entry Condition (Điều kiện bắt đầu)

Flow A bắt đầu khi:

* Giáo viên đã đăng nhập
* Giáo viên **chưa có lớp** hoặc **muốn tạo lớp mới**

Không yêu cầu:

* Dữ liệu học sinh có sẵn
* Bài tập có sẵn
* Lịch học

---

## 6. Exit Condition (Điều kiện kết thúc)

Flow A được xem là **hoàn thành hợp lệ** khi:

* Lớp học được tạo thành công
* Lớp có:

  * Tên lớp
  * Môn học
* (Tùy chọn) có danh sách học sinh
* (Tùy chọn) có ghi chú lớp

Sau Exit:

* Lớp **sẵn sàng để dùng trong Flow B (Soạn bài)**

---

## 7. Các bước logic trong Flow A

### Step A1 – Tạo lớp học

**Hành động:**

* Giáo viên nhập:

  * Tên lớp (bắt buộc)
  * Mô tả ngắn (không bắt buộc)

**Luật áp dụng:**

* Lớp luôn thuộc về **1 giáo viên**
* Không có trạng thái “public / shared”

---

### Step A2 – Gán môn học cho lớp

**Hành động:**

* Giáo viên chọn **1 môn học** từ danh sách có sẵn (seed data)

**Luật áp dụng:**

* Môn học:

  * Read-only
  * Do hệ thống định nghĩa
* Giáo viên **không được tạo / sửa môn học**

---

### Step A3 – Thêm học sinh (tối thiểu)

**Hành động:**

* Giáo viên có thể:

  * Thêm học sinh
  * Sửa tên học sinh
  * Xóa học sinh

**Dữ liệu học sinh được phép lưu (Phase 1):**

* Tên / biệt danh
* Ghi chú tự do (text)

**Luật nghiêm cấm:**

* ❌ Không lưu thông tin nhạy cảm
* ❌ Không suy diễn năng lực
* ❌ Không lưu điểm trung bình
* ❌ Không phân loại học sinh

---

### Step A4 – Ghi chú lớp

**Hành động:**

* Giáo viên nhập ghi chú:

  * Đặc điểm lớp
  * Lưu ý khi dạy
  * Nhắc việc cá nhân

**Luật áp dụng:**

* Ghi chú:

  * Hoàn toàn thủ công
  * Không có AI phân tích
  * Không có AI tóm tắt tự động

---

## 8. Trạng thái dữ liệu (Data State)

### Class Entity (Phase 1)

* `id`
* `teacher_id`
* `name`
* `subject_id`
* `description` (optional)
* `note` (optional)
* `created_at`
* `updated_at`

Không có:

* Status học tập
* Tiến độ
* Kết quả

---

### Student Entity (Phase 1 – Minimal)

* `id`
* `class_id`
* `name`
* `note` (optional)

Không có:

* Account
* Login
* Profile năng lực

---

## 9. Vai trò của AI trong Flow A

👉 **AI = KHÔNG THAM GIA**

Trong Flow A:

* Không có AI hỗ trợ
* Không có AI gợi ý
* Không có AI phân tích

**Lý do thiết kế:**

* Tránh “AI creep” ngay từ bước tổ chức cơ bản
* Giữ Flow A đơn giản – ổn định – ít bug

---

## 10. Tiêu chí PASS / FAIL cho Flow A

### PASS nếu:

* Giáo viên tạo lớp nhanh, không rối
* Không có logic ngoài scope
* Không có AI chen vào

### FAIL nếu:

* Xuất hiện phân tích lớp
* Xuất hiện đánh giá học sinh
* Xuất hiện role học sinh / phụ huynh
* Xuất hiện automation không kiểm soát

---

## 11. Mối liên hệ với các Flow khác

* Flow A **là tiền đề bắt buộc** cho:

  * Flow B – Exercise Creation Flow
  * Flow C – Exercise Usage Flow

Không tồn tại:

* Flow D (Weekly Loop) nếu không có Flow A

---

## 12. Ghi chú PM (quan trọng)

Flow A **cố tình “khô” và đơn giản**.
Đây là quyết định **chiến lược**, không phải thiếu sót.

> Nếu Flow A bắt đầu “thông minh” → Phase 1 sẽ trượt scope rất nhanh.

---

### ✅ CHỐT

Flow A tồn tại để:

* Tạo **không gian làm việc**
* Không tạo insight
* Không tạo quyết định
* Không tạo authority cho AI

---

## **Flow B – Exercise Creation Flow (Soạn bài + AI hỗ trợ)**

Tài liệu này được viết để **làm chuẩn gốc** cho:

* Thiết kế UI
* Thiết kế API
* Viết prompt AI
* Review PR
* Chặn scope creep & AI vượt quyền

Mọi nội dung **đã được siết chặt theo System Law / Scope Phase 1 / Phase 1 Law**.

---

# FLOW B – EXERCISE CREATION FLOW

*(Soạn bài tập + AI hỗ trợ ở mức nháp)*

---

## 1. Mục đích của Flow B

**Giá trị cốt lõi (Core Value):**
👉 **Giảm thời gian và công sức soạn bài tập cho giáo viên, nhưng KHÔNG làm mất quyền kiểm soát**

Flow B giúp giáo viên:

* Soạn bài tập nhanh hơn
* Chuẩn hóa nội dung
* Tận dụng AI như **trợ lý đánh máy thông minh**

Flow B **không nhằm**:

* Tự động hóa dạy học
* Chuẩn hóa sư phạm
* Tạo bài “chuẩn dùng ngay” không cần đọc lại

---

## 2. Phạm vi Flow (In Scope – Phase 1)

Flow B **chỉ bao gồm**:

1. Tạo bài tập thủ công
2. Tạo bài tập với AI hỗ trợ (draft)
3. Chỉnh sửa nội dung bài tập
4. Gán metadata (môn học, topic, độ khó – do giáo viên chọn)
5. Giáo viên **APPROVE** bài tập để dùng cho lớp của mình

---

## 3. Những gì Flow B KHÔNG BAO GIỜ LÀM

Theo Phase 1 Law (rất quan trọng):

* ❌ AI không tạo bài “ready-to-use”
* ❌ AI không tự APPROVE
* ❌ AI không tự gán metadata
* ❌ AI không tự lưu dữ liệu cuối
* ❌ Không có chia sẻ bài tập
* ❌ Không có public library
* ❌ Không có review / duyệt bởi người khác

---

## 4. Đối tượng sử dụng (User Context)

* **User duy nhất:** Giáo viên
* Giáo viên là:

  * Người khởi tạo
  * Người chỉnh sửa
  * Người duyệt cuối

Không tồn tại:

* Admin duyệt bài
* Giáo viên khác xem bài
* AI có quyền quyết định

---

## 5. Entry Condition (Điều kiện bắt đầu)

Flow B bắt đầu khi:

* Giáo viên đã đăng nhập
* Giáo viên **đã có ít nhất 1 lớp** (từ Flow A)

Giáo viên có thể bắt đầu Flow B từ:

* Trang lớp học
* Trang danh sách bài tập
* Nút “Tạo bài tập”

---

## 6. Exit Condition (Điều kiện kết thúc)

Flow B kết thúc hợp lệ khi:

* Bài tập ở trạng thái **APPROVED**
* Bài tập:

  * Thuộc sở hữu của giáo viên
  * Sẵn sàng để dùng trong Flow C

Nếu bài ở trạng thái **DRAFT**:

* Flow **chưa kết thúc**
* Bài **chưa được dùng cho lớp**

---

## 7. Các trạng thái bài tập (State Model)

Trong Phase 1, bài tập **CHỈ có 2 trạng thái**:

| Trạng thái | Ý nghĩa                                    |
| ---------- | ------------------------------------------ |
| `DRAFT`    | Bài đang soạn, chỉnh sửa, hoặc AI vừa sinh |
| `APPROVED` | Giáo viên cho phép dùng cho lớp của mình   |

Không tồn tại:

* REVIEW
* PUBLISHED
* ARCHIVED
* SHARED

---

## 8. Các bước logic trong Flow B

### Step B1 – Chọn cách tạo bài tập

Giáo viên chọn **1 trong 2 cách**:

1. **Tạo thủ công**
2. **Tạo với AI hỗ trợ**

👉 Hai nhánh này **hội tụ lại ở cùng một flow chỉnh sửa & duyệt**

---

### Step B2A – Tạo bài tập thủ công

**Hành động:**

* Giáo viên nhập nội dung bài tập bằng tay

**Luật áp dụng:**

* Hệ thống không can thiệp nội dung
* Không có AI tự động chỉnh sửa

---

### Step B2B – Tạo bài tập với AI hỗ trợ (Draft)

**Hành động:**

* Giáo viên cung cấp input tường minh:

  * Môn học
  * Topic (chọn từ danh sách có sẵn)
  * Yêu cầu nội dung (text)

**Vai trò AI:**

* Sinh **nội dung nháp**
* Ngôn từ trung lập
* Không suy diễn trình độ học sinh

**Luật bắt buộc:**

* Output AI:

  * Chỉ là **draft**
  * Không được tự lưu thành dữ liệu cuối
  * Không được tự gán metadata

---

### Step B3 – Chỉnh sửa nội dung bài tập

**Hành động:**

* Giáo viên:

  * Chỉnh sửa nội dung
  * Xóa / viết lại phần AI sinh
  * Bổ sung chi tiết

**Luật áp dụng:**

* Giáo viên chịu trách nhiệm **100% nội dung**
* Không có “AI-generated final content”

---

### Step B4 – Gán metadata (Teacher-controlled)

**Metadata bắt buộc:**

* Môn học (read-only list)
* **1 topic chính** (read-only taxonomy)

**Metadata tùy chọn:**

* Độ khó (do giáo viên chọn)
* Loại bài (practice / quiz – chỉ metadata)

**Luật nghiêm cấm:**

* ❌ AI tự chọn topic
* ❌ AI tự gán độ khó
* ❌ AI suy luận metadata từ nội dung

---

### Step B5 – APPROVE bài tập (Human-in-the-loop)

**Hành động:**

* Giáo viên bấm nút **APPROVE**

**Ý nghĩa APPROVE:**

* Cho phép **dùng bài này cho lớp của chính mình**
* KHÔNG phải:

  * Public
  * Share
  * Chuẩn sư phạm

**Luật tuyệt đối:**

* Không có auto-approve
* Không có background approve

---

## 9. Trạng thái dữ liệu (Data State)

### Exercise Entity (Phase 1)

* `id`
* `teacher_id`
* `content`
* `subject_id`
* `topic_id`
* `difficulty` (optional)
* `type` (optional)
* `status` (`DRAFT` / `APPROVED`)
* `created_at`
* `updated_at`

Không có:

* Usage count
* Quality score
* Global visibility

---

## 10. Vai trò của AI trong Flow B (CỰC KỲ QUAN TRỌNG)

AI trong Flow B:

✅ Được phép:

* Gợi ý nội dung bài tập
* Chuẩn hóa câu chữ
* Viết nháp nhanh

❌ Tuyệt đối không được:

* Quyết định nội dung cuối
* Gán metadata
* APPROVE bài tập
* Lưu dữ liệu cuối

👉 **AI = trợ lý soạn thảo, không phải giáo viên**

---

## 11. UI / UX Guardrails

UI **bắt buộc thể hiện rõ**:

* Nội dung nào là AI gợi ý
* Giáo viên là người duyệt cuối
* Ngôn từ:

  * “Gợi ý”
  * “Bản nháp”

Tránh tuyệt đối:

* “AI tạo bài”
* “AI đã duyệt”
* “Bài tập hoàn chỉnh”

---

## 12. Tiêu chí PASS / FAIL cho Flow B

### PASS nếu:

* Giáo viên soạn bài nhanh hơn
* Không mất quyền kiểm soát
* AI không vượt vai trò

### FAIL nếu:

* AI sinh bài “dùng ngay”
* AI tự lưu dữ liệu
* Có auto-approve
* Có chia sẻ bài tập

---

## 13. Mối liên hệ với các Flow khác

* Flow B:

  * Phụ thuộc Flow A (có lớp)
  * Là tiền đề cho Flow C (dùng bài cho lớp)

Không tồn tại:

* Flow C nếu bài chưa APPROVED

---

## 14. Ghi chú PM (rất quan trọng)

Flow B là **điểm rủi ro lớn nhất của Phase 1**.

> Nếu Flow B làm sai → TeachFlow sẽ trượt thành “AI teacher”.

Vì vậy:

* Luật phải **siết chặt hơn Flow A**
* UI & prompt phải **phòng thủ**, không phô diễn AI

---

### ✅ CHỐT FLOW B

Flow B tồn tại để:

* **Giảm tải công việc**
* Không thay thế giáo viên
* Không tạo authority cho AI

---

## **Flow C – Exercise Usage Flow (Gán bài, ghi nhận kết quả, nhận xét)**

Tài liệu này hoàn thiện **chuỗi giá trị dạy học tối thiểu** của Phase 1, và là nơi **System Law + Phase 1 Law phải được áp dụng chặt nhất**, vì đây là flow **chạm trực tiếp đến học sinh** (dù học sinh không login).

---

# FLOW C – EXERCISE USAGE FLOW

*(Gán bài – Ghi nhận kết quả – Nhận xét thủ công / AI gợi ý)*

---

## 1. Mục đích của Flow C

**Giá trị cốt lõi (Core Value):**
👉 **Giúp giáo viên sử dụng bài tập trong thực tế dạy học và ghi nhận kết quả một cách gọn gàng, có kiểm soát**

Flow C cho phép giáo viên:

* Dùng bài tập đã soạn
* Ghi nhận kết quả làm bài
* Viết nhận xét nhanh hơn (có AI hỗ trợ ở mức gợi ý)

Flow C **không nhằm**:

* Đánh giá năng lực học sinh
* Theo dõi tiến bộ dài hạn
* Tạo báo cáo hay insight hệ thống

---

## 2. Phạm vi Flow (In Scope – Phase 1)

Flow C **chỉ bao gồm**:

1. Gán bài tập đã APPROVED cho lớp
2. Ghi nhận kết quả làm bài (điểm / đạt – không đạt)
3. Ghi nhận nhận xét thủ công
4. Sử dụng AI để **gợi ý nhận xét ngắn** (editable)

---

## 3. Những gì Flow C KHÔNG BAO GIỜ LÀM

Theo System Law & Phase 1 Law:

* ❌ Không chấm bài tự động
* ❌ Không phân tích kết quả
* ❌ Không tổng hợp tiến bộ
* ❌ Không so sánh học sinh
* ❌ Không gửi thông báo
* ❌ Không auto-save nhận xét AI
* ❌ Không giao tiếp ngoài hệ thống

---

## 4. Đối tượng sử dụng (User Context)

* **User duy nhất:** Giáo viên
* Giáo viên là:

  * Người gán bài
  * Người ghi nhận kết quả
  * Người viết / duyệt nhận xét

Không tồn tại:

* Học sinh login
* Phụ huynh login
* Admin nghiệp vụ

---

## 5. Entry Condition (Điều kiện bắt đầu)

Flow C bắt đầu khi:

* Giáo viên đã đăng nhập
* Đã tồn tại:

  * Lớp học (Flow A)
  * Bài tập ở trạng thái **APPROVED** (Flow B)

Nếu bài tập còn ở `DRAFT` → **KHÔNG ĐƯỢC gán cho lớp**

---

## 6. Exit Condition (Điều kiện kết thúc)

Flow C được xem là hoàn thành cho **một bài tập** khi:

* Bài tập đã được gán cho lớp
* Giáo viên đã:

  * Ghi nhận kết quả cho từng học sinh
  * (Tùy chọn) ghi nhận nhận xét

Flow C **có thể lặp lại nhiều lần** trong tuần dạy.

---

## 7. Các bước logic trong Flow C

### Step C1 – Chọn lớp & bài tập

**Hành động:**

* Giáo viên chọn:

  * 1 lớp
  * 1 bài tập đã APPROVED (thuộc sở hữu của mình)

**Luật áp dụng:**

* Không hiển thị bài tập của giáo viên khác
* Không hiển thị bài chưa APPROVED

---

### Step C2 – Gán bài tập cho lớp

**Hành động:**

* Giáo viên chủ động bấm **“Gán bài”**

**Ý nghĩa gán bài:**

* Bài được dùng trong ngữ cảnh lớp
* Không tạo bản sao bài tập
* Không gửi thông báo

**Luật tuyệt đối:**

* Không auto-assign
* Không assign ngầm
* Không gán hàng loạt ngoài kiểm soát

---

### Step C3 – Ghi nhận kết quả làm bài

**Hành động:**

* Với mỗi học sinh trong lớp, giáo viên có thể:

  * Nhập **điểm số** (nếu áp dụng)
  * Hoặc chọn **Đạt / Không đạt**

**Luật áp dụng:**

* Kết quả:

  * Chỉ có ý nghĩa **trong ngữ cảnh bài + lớp**
  * Không dùng để phân tích hệ thống

**Luật nghiêm cấm:**

* ❌ Không tính trung bình
* ❌ Không xếp hạng
* ❌ Không gán nhãn năng lực

---

### Step C4 – Ghi nhận nhận xét thủ công

**Hành động:**

* Giáo viên nhập nhận xét cho từng học sinh

**Đặc điểm:**

* Nhận xét là:

  * Text tự do
  * Không bắt buộc
  * Không có chuẩn hệ thống

---

### Step C5 – AI gợi ý nhận xét (tùy chọn)

**Hành động:**

* Giáo viên có thể yêu cầu AI:

  * Gợi ý **nhận xét ngắn**
  * Dựa trên:

    * Kết quả bài
    * Nội dung bài tập
    * Input tường minh của giáo viên

**Vai trò AI:**

* Chỉ sinh **gợi ý**
* Không tự lưu
* Không tự gửi
* Không tự áp dụng

**Luật bắt buộc:**

* Nhận xét AI:

  * Luôn editable
  * Không auto-save
  * Không auto-apply

---

### Step C6 – Lưu kết quả (Teacher-controlled)

**Hành động:**

* Giáo viên bấm **Lưu**

**Ý nghĩa lưu:**

* Xác nhận dữ liệu cuối
* AI **không liên quan** đến hành động này

---

## 8. Trạng thái dữ liệu (Data State)

### Assignment / Usage Record (Phase 1 – Logical)

* `id`
* `class_id`
* `exercise_id`
* `student_id`
* `result` (score / pass-fail)
* `comment` (optional)
* `created_at`
* `updated_at`

Không có:

* Progress
* Trend
* Analytics field

---

## 9. Vai trò của AI trong Flow C

AI trong Flow C:

✅ Được phép:

* Gợi ý câu chữ nhận xét
* Chuẩn hóa ngôn từ (nếu yêu cầu)

❌ Tuyệt đối không được:

* Đánh giá học sinh
* Tổng hợp nhận xét
* So sánh kết quả
* Đưa ra kết luận sư phạm

👉 **AI = trợ lý viết nhận xét, không phải người nhận xét**

---

## 10. UI / UX Guardrails (rất quan trọng)

UI **bắt buộc**:

* Hiển thị rõ:

  * Nội dung nào là AI gợi ý
  * Nội dung nào do giáo viên nhập
* Nút hành động:

  * “Gợi ý nhận xét”
  * “Lưu”

UI **tuyệt đối tránh**:

* “AI đánh giá”
* “AI nhận xét”
* “AI đã lưu”

---

## 11. Tiêu chí PASS / FAIL cho Flow C

### PASS nếu:

* Giáo viên ghi nhận kết quả nhanh
* Nhận xét dễ viết hơn
* Không mất kiểm soát

### FAIL nếu:

* Có phân tích tiến bộ
* Có tổng hợp / biểu đồ
* Có auto-apply AI
* Có gửi thông báo ra ngoài

---

## 12. Mối liên hệ với các Flow khác

* Flow C:

  * Phụ thuộc Flow A (Class)
  * Phụ thuộc Flow B (Exercise APPROVED)
* Là phần **thực thi thực tế** của việc dạy học

---

## 13. Ghi chú PM (cảnh báo quan trọng)

Flow C là nơi **dễ trượt nhất sang LMS / Analytics**.

> Chỉ cần thêm 1 biểu đồ,
> Chỉ cần 1 câu “nhận xét tổng hợp”,
> → Phase 1 coi như vỡ.

Vì vậy:

* Giữ Flow C **thủ công – đơn giản – rõ quyền lực**
* Thà “thiếu thông minh” còn hơn “thông minh sai chỗ”

---

### ✅ CHỐT FLOW C

Flow C tồn tại để:

* **Ghi nhận**, không phân tích
* **Hỗ trợ**, không đánh giá
* **Con người quyết định**, AI chỉ gợi ý

---

## **Flow D – Weekly Teacher Loop (Vòng lặp sử dụng hàng tuần của giáo viên)**

Flow D **không tạo chức năng mới**. Đây là flow **kiểm chứng giá trị MVP**: liệu TeachFlow có được giáo viên **quay lại dùng mỗi tuần** hay không, **mà không vi phạm bất kỳ Law nào**.

---

# FLOW D – WEEKLY TEACHER LOOP

*(Vòng lặp hành vi sử dụng TeachFlow theo tuần)*

---

## 1. Mục đích của Flow D

**Giá trị cốt lõi (Core Value):**
👉 **Khiến TeachFlow trở thành công cụ làm việc quen thuộc mỗi tuần của giáo viên**

Flow D tồn tại để:

* Kiểm tra tính “dùng được trong đời thực”
* Kết nối các flow A–B–C thành **một vòng lặp tự nhiên**
* Xác định MVP có đạt tiêu chí “weekly usage” hay không

Flow D **không nhằm**:

* Tạo dashboard phân tích
* Tạo báo cáo tuần
* Tạo insight tự động

---

## 2. Bản chất của Flow D (PM Clarification)

Flow D:

* **Không phải** một màn hình riêng
* **Không phải** một tính năng riêng
* **Không có** logic xử lý riêng

Flow D là:

> **Chuỗi hành vi lặp lại của giáo viên khi sử dụng hệ thống trong 1 tuần dạy học**

---

## 3. Phạm vi Flow (In Scope – Phase 1)

Flow D **chỉ bao gồm** việc **tái sử dụng** các capability đã có:

* Truy cập lớp
* Xem bài đã dùng
* Soạn thêm bài mới
* Ghi nhận kết quả tiếp theo

Không thêm:

* Chức năng mới
* Trạng thái mới
* Dữ liệu tổng hợp

---

## 4. Đối tượng sử dụng (User Context)

* **User duy nhất:** Giáo viên
* Không có:

  * Học sinh login
  * Phụ huynh login
  * Admin nghiệp vụ

---

## 5. Entry Condition (Điều kiện bắt đầu vòng lặp)

Một vòng lặp tuần bắt đầu khi:

* Giáo viên quay lại hệ thống trong một tuần dạy mới
* Đã tồn tại:

  * Ít nhất 1 lớp (Flow A)
  * Ít nhất 1 bài tập đã tạo (Flow B)

Không yêu cầu:

* Dữ liệu “tuần trước” được phân tích
* Báo cáo tổng hợp

---

## 6. Exit Condition (Điều kiện kết thúc vòng lặp)

Vòng lặp tuần được xem là **thành công** khi:

* Giáo viên:

  * Đã sử dụng lại ít nhất 1 lớp
  * Đã tạo hoặc dùng ít nhất 1 bài tập
  * Đã ghi nhận kết quả / nhận xét

Flow D **không có điểm kết thúc cứng**; nó lặp lại tuần sau.

---

## 7. Chuỗi hành vi điển hình trong 1 tuần

### Step D1 – Truy cập danh sách lớp

**Hành động:**

* Giáo viên mở TeachFlow
* Chọn 1 lớp đang dạy

**Đặc điểm UX:**

* Không cần dashboard tổng hợp
* Không hiển thị số liệu phân tích

---

### Step D2 – Nhận diện “ngữ cảnh dạy hiện tại”

**Hành động:**

* Giáo viên nhìn thấy:

  * Các bài tập đã từng dùng cho lớp
  * Ghi chú lớp (nếu có)

**Luật áp dụng:**

* Chỉ hiển thị dữ liệu đã nhập
* Không có “gợi ý tuần này nên dạy gì”

---

### Step D3 – Soạn hoặc chọn bài tiếp theo

**Hành động:**

* Giáo viên:

  * Tạo bài mới (Flow B), hoặc
  * Dùng lại bài đã tạo trước đó

**Luật áp dụng:**

* Không có gợi ý tự động
* Không có đề xuất lộ trình

---

### Step D4 – Gán bài & ghi nhận kết quả

**Hành động:**

* Thực hiện Flow C:

  * Gán bài
  * Ghi nhận kết quả
  * Ghi nhận nhận xét

---

### Step D5 – Kết thúc phiên làm việc

**Hành động:**

* Giáo viên rời hệ thống
* Không có:

  * Tổng kết tự động
  * Báo cáo tuần
  * Email nhắc việc

---

## 8. Dữ liệu được sử dụng trong Flow D

Flow D **chỉ sử dụng lại dữ liệu hiện có**:

* Class
* Exercise
* Assignment / Result
* Comment

Không tạo:

* Weekly summary
* History analysis
* Trend data

---

## 9. Vai trò của AI trong Flow D

👉 **AI KHÔNG THAM GIA TRỰC TIẾP**

AI:

* Không tổng hợp tuần
* Không nhắc việc
* Không đề xuất kế hoạch
* Không phân tích hành vi

AI **chỉ xuất hiện gián tiếp** nếu:

* Giáo viên chủ động dùng AI trong Flow B hoặc C

---

## 10. UI / UX Guardrails cho Flow D

UI **phải đảm bảo**:

* Giáo viên:

  * Luôn biết mình đang làm gì
  * Không bị “dẫn dắt” bởi hệ thống
* Không có:

  * “Tuần này bạn nên…”
  * “AI đề xuất…”

Flow D ưu tiên:

* Sự quen thuộc
* Sự lặp lại
* Ít ma sát

---

## 11. Tiêu chí PASS / FAIL cho Flow D

### PASS nếu:

* Giáo viên có thể dùng TeachFlow **mỗi tuần**
* Không cần học lại cách dùng
* Không bị AI làm phiền

### FAIL nếu:

* Phải thêm dashboard để “hiểu tình hình”
* Cần báo cáo để biết nên làm gì
* Có gợi ý tự động thay giáo viên

---

## 12. Mối liên hệ với các Flow khác

Flow D:

* **Bao trùm** Flow A – B – C
* Là thước đo **MVP viability**, không phải feature

---

## 13. Ghi chú PM (chốt chiến lược)

Flow D là nơi PM tự hỏi:

> “Nếu tôi là giáo viên,
> tôi có quay lại dùng cái này tuần sau không?”

Nếu câu trả lời là **Có** mà **không cần thêm tính năng mới**
→ Phase 1 **đã thành công**.

---

## 14. KẾT LUẬN – KHÓA PHASE 1

Tại thời điểm này, Phase 1 đã có:

* Flow A – Tạo không gian làm việc
* Flow B – Soạn bài có AI hỗ trợ (đúng vai trò)
* Flow C – Dùng bài & ghi nhận kết quả
* Flow D – Vòng lặp sử dụng hàng tuần

👉 **Đây là một Phase 1 hoàn chỉnh, không thừa, không thiếu.**

---

## BƯỚC TIẾP THEO (PM KHUYẾN NGHỊ CHỐT)

Bạn nên chọn **1 trong 2 hướng** (không làm song song):

### Hướng 1 – Khóa sản phẩm

* Chuyển A–B–C–D thành:

  * User Flow Diagram
  * UI-spec skeleton
  * API boundary