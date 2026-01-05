# UI-SPEC SKELETON – TEACHFLOW

## Phase 1 (Flow A–B–C–D)

## 0. Mục đích của UI-Spec Skeleton

UI-Spec Skeleton **không phải thiết kế UI chi tiết**.

Tài liệu này tồn tại để:

* Ánh xạ **User Flow → UI Screen**
* Khóa:

  * Màn hình nào được phép tồn tại
  * Màn hình nào **không được phép xuất hiện**
* Là chuẩn gốc để:

  * Designer vẽ UI
  * Dev implement frontend
  * Review PR UI / UX

UI-Spec Skeleton **không quyết định**:

* Layout
* Màu sắc
* Component cụ thể

---

## 1. Nguyên tắc toàn cục cho UI Phase 1 (NON-NEGOTIABLE)

Áp dụng cho **mọi màn hình**:

### 1.1 Người dùng & quyền hạn

* User duy nhất: **Giáo viên**
* Không tồn tại UI cho:

  * Học sinh
  * Phụ huynh
  * Admin nghiệp vụ

### 1.2 AI trong UI

* AI **không bao giờ** là actor chính
* Mọi AI output:

  * Luôn hiển thị là **“Gợi ý / Bản nháp”**
  * Luôn editable
* Không có:

  * Auto-apply
  * Auto-save
  * Auto-approve

### 1.3 Không có UI phân tích

* Không biểu đồ
* Không thống kê
* Không insight
* Không “tổng kết”

---

## 2. Sơ đồ điều hướng UI tổng thể (Navigation Map)

```
Login
  ↓
Class List
  ├─ Create Class (Flow A)
  ├─ Class Detail
  │    ├─ Student List
  │    ├─ Exercise Usage (Flow C)
  │    └─ Class Notes
  ↓
Exercise List
  ├─ Create Exercise (Flow B)
  └─ Exercise Detail / Edit
```

👉 **Không tồn tại menu nào ngoài sơ đồ này trong Phase 1**.

---

## 3. UI cho Flow A – Class Setup

### 3.1 Class List Screen

**Mục đích:** Entry point làm việc

**Hiển thị:**

* Danh sách lớp của giáo viên
* Tên lớp
* Môn học

**Hành động cho phép:**

* Tạo lớp mới
* Truy cập chi tiết lớp

**Không hiển thị:**

* Số học sinh “đánh giá”
* Trạng thái học tập
* Phân tích lớp

---

### 3.2 Create / Edit Class Screen

**Flow liên quan:** Flow A

**Field bắt buộc:**

* Tên lớp
* Môn học (select – read only list)

**Field tùy chọn:**

* Mô tả lớp
* Ghi chú lớp

**Hành động:**

* Lưu lớp

**Cấm:**

* AI gợi ý
* Template lớp
* Import danh sách

---

### 3.3 Student List (Inside Class)

**Mục đích:** Quản lý học sinh tối thiểu

**Hiển thị:**

* Danh sách học sinh (tên)

**Hành động:**

* Thêm / sửa / xóa học sinh

**Không hiển thị:**

* Điểm số
* Nhận xét
* Phân loại

---

## 4. UI cho Flow B – Exercise Creation

### 4.1 Exercise List Screen

**Mục đích:** Quản lý bài tập cá nhân

**Hiển thị:**

* Danh sách bài tập của giáo viên
* Trạng thái: `DRAFT` / `APPROVED`

**Hành động:**

* Tạo bài tập
* Mở chi tiết bài tập

**Không hiển thị:**

* Usage count
* Quality score
* Bài của người khác

---

### 4.2 Create Exercise – Method Selection

**Flow liên quan:** Flow B

**Cho phép chọn:**

* Tạo thủ công
* Tạo với AI hỗ trợ

**Luật UI:**

* Hai nhánh **phải dẫn về cùng màn hình chỉnh sửa**
* Không có nhánh “AI tạo nhanh – dùng luôn”

---

### 4.3 Exercise Editor Screen

**Mục đích:** Trung tâm của Flow B

**Khu vực chính:**

* Nội dung bài tập (editor)

**Metadata panel:**

* Môn học (read only)
* Topic (read only)
* Độ khó (optional)
* Loại bài (optional)

**AI panel (nếu dùng):**

* Nút “Gợi ý nội dung”
* Output hiển thị là **Draft**

**Hành động:**

* Lưu `DRAFT`
* APPROVE

**Cấm:**

* Auto-approve
* AI tự điền metadata

---

## 5. UI cho Flow C – Exercise Usage

### 5.1 Assign ExerciseSet Screen

**Flow liên quan:** Flow C

**Hiển thị:**

* Chọn lớp
* Chọn bài tập (`APPROVED` only)

**Hành động:**

* Gán bài

**Cấm:**

* Gán bài `DRAFT`
* Gán hàng loạt không kiểm soát

---

### 5.2 Result & Comment Entry Screen

**Mục đích:** Ghi nhận kết quả

**Cho từng học sinh:**

* Input:

  * Điểm *hoặc*
  * Đạt / Không đạt
* Nhận xét (text)

**AI hỗ trợ (tùy chọn):**

* Nút “Gợi ý nhận xét”
* Output luôn editable

**Hành động:**

* Lưu kết quả

**Không có:**

* Tổng hợp
* Nhận xét chung
* So sánh học sinh

---

## 6. UI cho Flow D – Weekly Teacher Loop

### 6.1 Bản chất UI Flow D

* **Không có màn hình riêng**
* Flow D là **cách giáo viên dùng lại**:

  * Class List
  * Exercise List
  * Usage Screen

**UI không được có:**

* “Tuần này bạn nên…”
* “AI đề xuất kế hoạch”

---

## 7. Những màn hình BỊ CẤM trong Phase 1

UI-Spec Skeleton **cấm tuyệt đối** các màn hình sau:

* Dashboard tổng hợp
* Progress / Report
* Student profile
* Parent view
* Marketplace
* Exercise library công khai

Nếu xuất hiện trong design → **FAIL Phase 1**.

---

## 8. Mapping: UI ↔ User Flow (Lock-in Table)

| User Flow | UI Screen chính                    |
| --------- | ---------------------------------- |
| Flow A    | Class List / Class Detail          |
| Flow B    | Exercise List / Exercise Editor    |
| Flow C    | Assign ExerciseSet / Result Entry  |
| Flow D    | Không có screen riêng              |

👉 **UI chỉ được phép tồn tại nếu map được vào bảng này.**

---

## 9. Ghi chú khóa UI (PM Lock)

UI Phase 1 **ưu tiên**:

* Ít màn hình
* Ít “thông minh”
* Ít AI

> Nếu UI cần “giải thích nhiều” để dùng
> → UI đang vượt Phase 1.

---

### ✅ CHỐT UI-SPEC SKELETON

* UI chỉ là **vỏ hiển thị cho Flow**
* Flow sai → UI sai
* UI không được dẫn dắt hành vi ngoài Flow

---

Dưới đây là **UI-SPEC SKELETON – FLOW A (CLASS SETUP)** được viết ở **mức chi tiết tối đa cho Phase 1**, với mục tiêu:

* Dev **code được ngay** mà không cần “đoán”
* Designer **không thể vẽ dư**
* Reviewer **có checklist rõ ràng để bắt lỗi vượt scope**
* UI **không có chỗ cho AI / analytics / LMS creep**

Tài liệu này **chỉ bao phủ Flow A** và **cố tình verbose**.

---

# UI-SPEC SKELETON

## Flow A – Class Setup (Thiết lập lớp)

**Repo path (theo yêu cầu trước của bạn):**

---

## 0. Phạm vi & nguyên tắc áp dụng

### 0.1 Flow áp dụng

* Áp dụng **duy nhất** cho:

  * Flow A – Class Setup Flow

### 0.2 Luật áp dụng (NON-NEGOTIABLE)

* System Law
* Scope Phase 1
* Phase 1 Law

Nếu một UI element:

* Tạo authority cho AI
* Gợi ý / phân tích lớp
* Dẫn sang Flow B / C tự động

→ **UI đó không hợp lệ**

---

## 1. Danh sách màn hình Flow A (Screen Inventory)

Flow A **chỉ được phép có đúng 3 nhóm màn hình**:

1. **Class List Screen**
2. **Create / Edit Class Screen**
3. **Class Detail Screen**

   * Student List (inline)
   * Class Notes (inline)

❌ Không được tách thêm screen khác
❌ Không có wizard nhiều bước
❌ Không có onboarding riêng cho Flow A

---

## 2. Class List Screen

### 2.1 Mục đích màn hình

* Là **entry point làm việc chính** của giáo viên
* Cho phép:

  * Nhìn thấy các lớp mình đang quản lý
  * Bắt đầu Flow A (tạo lớp mới)
  * Truy cập Class Detail

---

### 2.2 Dữ liệu hiển thị (READ-ONLY)

Mỗi class item **chỉ được hiển thị**:

| Trường       | Bắt buộc | Ghi chú       |
| ------------ | -------- | ------------- |
| Tên lớp      | ✅        | Text          |
| Môn học      | ✅        | Label         |
| Ghi chú ngắn | ❌        | Tối đa 1 dòng |

❌ Không hiển thị:

* Số học sinh dạng “đánh giá”
* Trạng thái học tập
* Ngày học gần nhất
* Biểu tượng phân tích

---

### 2.3 Hành động cho phép

| Hành động       | Điều kiện            |
| --------------- | -------------------- |
| Tạo lớp mới     | Luôn cho phép        |
| Mở chi tiết lớp | Khi click class item |

❌ Không có:

* Bulk action
* Sort theo kết quả
* Filter theo trạng thái

---

### 2.4 Empty State

**Điều kiện:** Giáo viên chưa có lớp nào

**UI bắt buộc có:**

* Thông điệp trung lập:

  > “Bạn chưa có lớp nào. Tạo lớp đầu tiên để bắt đầu.”

**Chỉ có 1 CTA:**

* “Tạo lớp”

❌ Không có:

* Gợi ý phương pháp dạy
* Gợi ý môn học
* AI onboarding

---

## 3. Create / Edit Class Screen

> Create và Edit **dùng chung 1 screen**, khác nhau ở dữ liệu khởi tạo.

---

### 3.1 Mục đích màn hình

* Tạo mới hoặc chỉnh sửa **thông tin lớp**
* Không liên quan:

  * Bài tập
  * Học tập
  * AI

---

### 3.2 Field Specification

#### 3.2.1 Tên lớp (REQUIRED)

| Thuộc tính | Quy định       |
| ---------- | -------------- |
| Type       | Text input     |
| Required   | ✅              |
| Min length | 1              |
| Max length | 100            |
| Validation | Không cho rỗng |

❌ Không auto-generate
❌ Không gợi ý tên lớp

---

#### 3.2.2 Môn học (REQUIRED)

| Thuộc tính | Quy định  |
| ---------- | --------- |
| Type       | Select    |
| Source     | Seed data |
| Editable   | ❌         |
| Required   | ✅         |

**UI bắt buộc:**

* Hiển thị danh sách môn có sẵn
* Không có nút “Thêm môn”

❌ Không cho nhập text
❌ Không cho AI gợi ý môn

---

#### 3.2.3 Mô tả lớp (OPTIONAL)

| Thuộc tính | Quy định |
| ---------- | -------- |
| Type       | Textarea |
| Max length | 500      |
| Required   | ❌        |

**Mục đích:**

* Mô tả ngắn cho giáo viên tự nhớ

❌ Không phân tích text
❌ Không AI tóm tắt

---

#### 3.2.4 Ghi chú lớp (OPTIONAL)

| Thuộc tính | Quy định         |
| ---------- | ---------------- |
| Type       | Textarea         |
| Max length | Không hard limit |
| Required   | ❌                |

**Mục đích:**

* Lưu ý cá nhân
* Nhắc việc cho giáo viên

❌ Không AI
❌ Không keyword highlight

---

### 3.3 Action Buttons

| Button | Điều kiện       |
| ------ | --------------- |
| Lưu    | Khi form hợp lệ |
| Hủy    | Luôn có         |

❌ Không có:

* Lưu & tạo bài
* Lưu & gợi ý bước tiếp theo

---

## 4. Class Detail Screen

### 4.1 Mục đích màn hình

* Là **trung tâm làm việc của 1 lớp**
* Cho phép:

  * Quản lý học sinh
  * Xem / sửa ghi chú lớp

---

### 4.2 Thông tin lớp (Header)

**Hiển thị:**

* Tên lớp
* Môn học
* Mô tả (nếu có)

**Hành động:**

* Chỉnh sửa lớp

❌ Không hiển thị:

* Trạng thái học tập
* Tổng quan kết quả

---

## 5. Student List (Inline trong Class Detail)

### 5.1 Dữ liệu hiển thị

Mỗi học sinh **chỉ được có**:

| Trường          | Ghi chú  |
| --------------- | -------- |
| Tên / biệt danh | Text     |
| Ghi chú ngắn    | Optional |

❌ Không hiển thị:

* Điểm
* Nhận xét
* Phân loại

---

### 5.2 Hành động cho phép

| Hành động     | Ghi chú    |
| ------------- | ---------- |
| Thêm học sinh | Manual     |
| Sửa tên       | Inline     |
| Xóa học sinh  | Có confirm |

---

### 5.3 Add Student Interaction

**Form tối thiểu:**

* Tên học sinh (required)
* Ghi chú (optional)

❌ Không import
❌ Không tạo account
❌ Không mời login

---

## 6. Class Notes (Inline)

### 6.1 Mục đích

* Ghi chú nội bộ cho giáo viên

### 6.2 UI yêu cầu

* Textarea đơn giản
* Lưu thủ công

❌ Không AI
❌ Không phân tích
❌ Không tự gợi ý

---

## 7. Navigation Rules (Flow A Lock)

Flow A **chỉ cho phép điều hướng**:

* Class List → Create Class
* Class List → Class Detail
* Class Detail → Edit Class

❌ CẤM:

* Class Detail → Exercise Creation (shortcut)
* Auto-redirect sang Flow B

---

## 8. Error & Validation Handling

### 8.1 Validation lỗi

* Hiển thị lỗi **inline**
* Ngôn từ trung lập
* Không hướng dẫn sư phạm

### 8.2 Error system

* Chỉ thông báo lỗi kỹ thuật
* Không retry AI
* Không fallback logic

---

## 9. Những UI BỊ CẤM TUYỆT ĐỐI trong Flow A

* Dashboard lớp
* Progress bar
* Nhận xét tổng hợp
* AI phân tích lớp
* Gợi ý bài học

Nếu xuất hiện → **FAIL PHASE 1**

---

## 10. Checklist Review UI Flow A (Dùng khi review PR)

* [ ] Không AI xuất hiện
* [ ] Không analytics
* [ ] Không shortcut sang Flow B/C
* [ ] Không dữ liệu vượt student minimal
* [ ] Không UI “thông minh”

---

### ✅ CHỐT FLOW A UI-SPEC

Flow A UI tồn tại để:

* **Tạo cấu trúc**
* **Không tạo insight**
* **Không tạo quyết định**
* **Không tạo cảm giác hệ thống “biết nhiều hơn giáo viên”**

---

Dưới đây là **UI-SPEC SKELETON – FLOW B (EXERCISE CREATION)** ở **mức chi tiết tối đa**, viết để:

* Frontend dev **implement không cần đoán**
* Designer **không thể “vẽ dư”**
* Reviewer **bắt được mọi dấu hiệu AI / LMS creep**
* Khóa chặt: **AI chỉ là trợ lý soạn thảo, không có authority**

Tài liệu này **chỉ bao phủ Flow B** và **tuân thủ tuyệt đối System Law / Scope Phase 1 / Phase 1 Law**.

---

# UI-SPEC SKELETON

## Flow B – Exercise Creation (Soạn bài tập + AI hỗ trợ)

---

## 0. Phạm vi & nguyên tắc nền tảng

### 0.1 Flow áp dụng

* Áp dụng **duy nhất** cho:

  * Flow B – Exercise Creation Flow

### 0.2 Luật bất biến (NON-NEGOTIABLE)

* User duy nhất: **Giáo viên**
* Exercise state **chỉ có**:

  * `DRAFT`
  * `APPROVED`
* AI:

  * Không auto-save
  * Không auto-approve
  * Không auto-apply
* Không có:

  * Public / share
  * Review bởi người khác
  * Library dùng chung

Nếu UI element vi phạm → **FAIL PHASE 1**.

---

## 1. Danh sách màn hình Flow B (Screen Inventory)

Flow B **chỉ được phép có 4 nhóm màn hình**:

1. **Exercise List Screen**
2. **Create Exercise – Method Selection**
3. **Exercise Editor Screen** (trung tâm Flow B)
4. **Approve Confirmation (Inline / Modal)**

❌ Không wizard nhiều bước
❌ Không màn hình “AI generate only”
❌ Không preview học sinh

---

## 2. Exercise List Screen

### 2.1 Mục đích

* Quản lý **toàn bộ bài tập cá nhân** của giáo viên
* Entry chính cho Flow B

---

### 2.2 Dữ liệu hiển thị (READ-ONLY)

Mỗi exercise item **chỉ được hiển thị**:

| Trường                             | Bắt buộc | Ghi chú              |
| ---------------------------------- | -------- | -------------------- |
| Tiêu đề ngắn / trích đoạn nội dung | ✅        | 1–2 dòng             |
| Môn học                            | ✅        | Label                |
| Topic                              | ✅        | Label                |
| Trạng thái                         | ✅        | `DRAFT` / `APPROVED` |

❌ Không hiển thị:

* Số lần dùng
* Điểm chất lượng
* Đánh giá
* Người khác sử dụng

---

### 2.3 Hành động cho phép

| Hành động               | Điều kiện                    |
| ----------------------- | ---------------------------- |
| Tạo bài tập             | Luôn cho phép                |
| Mở chi tiết / chỉnh sửa | Khi click item               |
| APPROVE                 | Chỉ khi trạng thái = `DRAFT` |

❌ Không bulk action
❌ Không filter theo kết quả

---

### 2.4 Empty State

**Điều kiện:** Chưa có bài tập

**Thông điệp trung lập:**

> “Bạn chưa có bài tập nào.”

**CTA duy nhất:**

* “Tạo bài tập”

❌ Không AI gợi ý chủ đề
❌ Không template sư phạm

---

## 3. Create Exercise – Method Selection

### 3.1 Mục đích

* Cho giáo viên **chọn cách khởi tạo**
* Không tạo dữ liệu cuối

---

### 3.2 Option hiển thị

| Option            | Mô tả                   |
| ----------------- | ----------------------- |
| Tạo thủ công      | Nhập nội dung trực tiếp |
| Tạo với AI hỗ trợ | AI sinh **bản nháp**    |

**Luật UI:**

* Hai option **bắt buộc dẫn về cùng Exercise Editor Screen**
* Không có option “AI tạo nhanh”

---

## 4. Exercise Editor Screen (CORE SCREEN)

> Đây là **màn hình quan trọng nhất của Phase 1**.

---

### 4.1 Bố cục logic (không phải layout)

Exercise Editor **phải tách rõ 3 vùng**:

1. **Content Editor**
2. **Metadata Panel**
3. **AI Assistance Panel (optional)**

Ba vùng **không được trộn vai trò**.

---

## 5. Content Editor

### 5.1 Mục đích

* Soạn **nội dung bài tập cuối cùng**
* Giáo viên chịu trách nhiệm 100%

---

### 5.2 Quy định

| Thuộc tính | Quy định             |
| ---------- | -------------------- |
| Type       | Rich text / Markdown |
| Required   | ✅                    |
| Editable   | Luôn editable        |
| Versioning | Không hiển thị       |

❌ Không lock nội dung AI
❌ Không đánh dấu “final by AI”

---

## 6. Metadata Panel (Teacher-controlled)

### 6.1 Field bắt buộc

#### 6.1.1 Môn học

* Type: Select
* Source: Seed data
* Read-only list
* Required

#### 6.1.2 Topic

* Type: Select
* Source: Read-only taxonomy
* **Bắt buộc chọn đúng 1 topic**

❌ Không cho AI chọn
❌ Không cho multi-topic

---

### 6.2 Field tùy chọn

| Field    | Ghi chú                      |
| -------- | ---------------------------- |
| Độ khó   | Metadata, không suy diễn     |
| Loại bài | Practice / Quiz (label only) |

❌ Không auto-fill
❌ Không AI suggest rồi auto-apply

---

## 7. AI Assistance Panel (OPTIONAL)

### 7.1 Điều kiện hiển thị

* Chỉ xuất hiện nếu giáo viên chọn “Tạo với AI” **hoặc**
* Giáo viên chủ động bấm “Gợi ý nội dung”

---

### 7.2 Input cho AI (BẮT BUỘC TƯỜNG MINH)

* Môn học (đã chọn)
* Topic (đã chọn)
* Yêu cầu nội dung (text)

❌ Không cho AI “tự hiểu”
❌ Không prompt mở rộng

---

### 7.3 Output AI

**Cách hiển thị:**

* Rõ nhãn: **“Gợi ý (AI)”**
* Không chèn thẳng vào content editor
* Giáo viên **copy / chỉnh / xóa**

**Luật cứng:**

* AI output:

  * Không auto-save
  * Không auto-apply
  * Không auto-approve

---

## 8. Action Buttons (Exercise Editor)

| Button             | Điều kiện                      |
| ------------------ | ------------------------------ |
| Lưu nháp (`DRAFT`) | Khi nội dung hợp lệ            |
| APPROVE            | Khi nội dung + metadata hợp lệ |
| Hủy                | Luôn có                        |

❌ Không có:

* “Dùng ngay”
* “Gán cho lớp”
* “AI hoàn thiện”

---

## 9. APPROVE Confirmation

### 9.1 Hình thức

* Inline confirm hoặc modal đơn giản

### 9.2 Nội dung bắt buộc

> “Bài tập sau khi APPROVE có thể dùng cho lớp của bạn.
> Bạn chịu trách nhiệm nội dung bài tập này.”

### 9.3 Hành động

* Xác nhận APPROVE
* Hủy

❌ Không nói “chuẩn sư phạm”
❌ Không nhắc AI

---

## 10. Navigation Rules (Flow B Lock)

Flow B **chỉ cho phép điều hướng**:

* Exercise List → Editor
* Editor → List
* Editor (`APPROVED`) → quay lại List

❌ CẤM:

* Editor → Assign ExerciseSet (Flow C shortcut)
* Auto-redirect sau APPROVE

---

## 11. Error & Validation Handling

### 11.1 Validation

* Inline
* Trung lập
* Không giải thích sư phạm

### 11.2 Error system

* Không retry AI tự động
* Không fallback logic

---

## 12. Những UI BỊ CẤM TUYỆT ĐỐI trong Flow B

* Exercise preview cho học sinh
* Quality score
* Suggested difficulty (AI)
* Template chuẩn hệ thống
* Chia sẻ / copy bài

---

## 13. Checklist Review UI Flow B (PR Review)

* [ ] Không AI authority
* [ ] Không auto-apply
* [ ] Không shortcut sang Flow C
* [ ] Metadata do giáo viên chọn
* [ ] AI output luôn là draft

---

### ✅ CHỐT FLOW B UI-SPEC

Flow B UI tồn tại để:

* **Giảm thời gian gõ**
* **Không giảm trách nhiệm**
* **AI đứng sau, giáo viên đứng trước**

---
Dưới đây là **UI-SPEC SKELETON – FLOW C (EXERCISE USAGE)** ở **mức chi tiết tối đa**, viết để:

* Frontend dev **implement chính xác từng màn hình**
* Designer **không thể “vẽ thêm insight / LMS”**
* Reviewer **bắt được mọi dấu hiệu analytics, auto, AI vượt quyền**
* Khóa chặt nguyên tắc: **ghi nhận – không phân tích – giáo viên quyết định**

Tài liệu này **chỉ bao phủ Flow C** và **cố tình phòng thủ cao nhất** trong Phase 1.

---

# UI-SPEC SKELETON

## Flow C – Exercise Usage

### *(Assign ExerciseSet – Ghi nhận kết quả – Nhận xét thủ công / AI gợi ý)*

---

## 0. PHẠM VI & LUẬT ÁP DỤNG

### 0.1 Flow áp dụng

* Áp dụng **duy nhất** cho:

  * **Flow C – Exercise Usage Flow**

### 0.2 Luật bất biến (NON-NEGOTIABLE)

* User duy nhất: **Giáo viên**
* Chỉ sử dụng:

  * Class từ Flow A
  * ExerciseSet do giáo viên sở hữu (hoặc đã copy)
* AI:

  * Chỉ gợi ý câu chữ
  * Không đánh giá
  * Không auto-save
  * Không auto-apply
* **KHÔNG CÓ**:

  * Chấm bài tự động
  * Phân tích kết quả
  * Tổng hợp / dashboard
  * Rule hệ thống theo intent (TEST / PRACTICE / …)

👉 UI element nào vi phạm
→ **FAIL PHASE 1**

---

## 1. DANH SÁCH MÀN HÌNH FLOW C (SCREEN INVENTORY)

Flow C **chỉ được phép có đúng 3 màn hình**:

1. **Assign ExerciseSet Screen**
2. **Result Entry Screen** *(core screen)*
3. **Confirm Save (Inline / Modal)**

❌ Không dashboard
❌ Không summary screen
❌ Không “báo cáo đề”

---

## 2. ASSIGN EXERCISESET SCREEN

### 2.1 Mục đích

* Tạo **ngữ cảnh giao đề**
* Kết nối:

  * Class
  * ExerciseSet

---

### 2.2 Dữ liệu hiển thị

#### 2.2.1 Chọn lớp

| Thuộc tính | Quy định            |
| ---------- | ------------------- |
| Type       | Select              |
| Source     | Class của giáo viên |
| Required   | ✅                   |

❌ Không hiển thị:

* Thống kê lớp
* Số học sinh dạng đánh giá

---

#### 2.2.2 Chọn ExerciseSet

| Thuộc tính | Quy định                  |
| ---------- | ------------------------- |
| Type       | Select                    |
| Source     | ExerciseSet của giáo viên |
| Required   | ✅                         |

**Mỗi ExerciseSet item hiển thị:**

* Title
* Intent (label mô tả, không màu cảnh báo)
* Số lượng Exercise

❌ Không hiển thị:

* Rule kiểm tra
* Giới hạn làm bài
* Trạng thái “thi / không thi”

---

### 2.3 Preview ExerciseSet (READ-ONLY)

Sau khi chọn ExerciseSet, UI **được phép hiển thị**:

* Title
* Description (nếu có)
* Danh sách Exercise bên trong (read-only)

❌ Không preview cho học sinh
❌ Không hiển thị đáp án
❌ Không hiển thị độ khó tổng

---

### 2.4 Hành động cho phép

| Hành động           | Điều kiện                       |
| ------------------- | ------------------------------- |
| Gán đề / Gán bộ bài | Khi đã chọn Class + ExerciseSet |
| Hủy                 | Luôn có                         |

❌ Không auto-assign
❌ Không assign hàng loạt

---

## 3. RESULT ENTRY SCREEN (CORE SCREEN)

> Đây là **màn hình nhạy cảm nhất của Phase 1**.

---

### 3.1 Mục đích

* Ghi nhận **kết quả thực tế**
* Ghi nhận **nhận xét cá nhân**
* Không diễn giải dữ liệu

---

### 3.2 Header thông tin (READ-ONLY)

Hiển thị:

* Tên lớp
* Title ExerciseSet
* Intent (label mô tả)
* Danh sách Exercise (tên rút gọn)

❌ Không hiển thị:

* Nhận xét tổng
* Thống kê
* “Mức độ hoàn thành”

---

## 4. STUDENT RESULT LIST

### 4.1 Cấu trúc hiển thị

Mỗi học sinh là **1 block độc lập**, gồm:

* Tên học sinh
* Danh sách Exercise trong ExerciseSet

  * Mỗi Exercise = 1 dòng kết quả
* Nhận xét (text)
* AI gợi ý (button)

---

### 4.2 Input kết quả (Per Exercise)

Với **mỗi Exercise** trong ExerciseSet:

**Option A – Điểm số**

* Type: Number
* Giá trị: do giáo viên quyết định

**Option B – Đạt / Không đạt**

* Type: Toggle / Select

❌ Không có:

* Trung bình
* Tổng điểm đề
* Chuẩn đánh giá hệ thống

---

## 5. COMMENT INPUT (NHẬN XÉT)

### 5.1 Nhận xét thủ công

| Thuộc tính | Quy định |
| ---------- | -------- |
| Type       | Textarea |
| Required   | ❌        |
| Editable   | Luôn     |

Nhận xét có thể hiểu là:

* Nhận xét chung cho ExerciseSet
* Hoặc nhận xét tổng hợp từ nhiều bài

❌ Không template sẵn
❌ Không auto-fill

---

### 5.2 AI GỢI Ý NHẬN XÉT (OPTIONAL)

#### Điều kiện hiển thị

* Giáo viên **chủ động bấm** “Gợi ý nhận xét”

#### Input cho AI (BẮT BUỘC TƯỜNG MINH)

* Nội dung Exercise
* Kết quả đã nhập
* Yêu cầu cụ thể của giáo viên

❌ Không suy luận trình độ
❌ Không prompt tổng hợp lớp

#### Output AI

* Nhãn rõ: **“Gợi ý (AI)”**
* Không chèn trực tiếp vào textarea

Giáo viên có thể:

* Copy
* Chỉnh sửa
* Bỏ qua

**Luật cứng:**

* Không auto-apply
* Không auto-save
* Không áp dụng cho nhiều học sinh

---

## 6. ACTION BUTTONS (RESULT ENTRY)

| Button | Điều kiện       |
| ------ | --------------- |
| Lưu    | Khi có thay đổi |
| Hủy    | Quay lại        |

❌ Không có:

* “Lưu & tổng kết”
* “Khóa đề”
* “AI hoàn thiện”

---

## 7. CONFIRM SAVE (INLINE / MODAL)

### 7.1 Nội dung bắt buộc

> “Kết quả và nhận xét sẽ được lưu cho đề này và lớp này.
> Hệ thống không tự phân tích hay tổng hợp dữ liệu.”

### 7.2 Hành động

* Xác nhận lưu
* Hủy

---

## 8. NAVIGATION RULES (FLOW C LOCK)

Flow C **chỉ cho phép điều hướng**:

* Assign ExerciseSet → Result Entry
* Result Entry → Quay lại Class Detail

❌ CẤM:

* Result Entry → Dashboard
* Result Entry → Flow B
* Auto-redirect sau lưu

---

## 9. NHỮNG UI BỊ CẤM TUYỆT ĐỐI TRONG FLOW C

* Dashboard kết quả
* Progress bar
* Nhận xét tổng hợp tự động
* Rule “đề thi”
* AI đánh giá học sinh

Xuất hiện → **FAIL PHASE 1**

---

## 10. CHECKLIST REVIEW UI FLOW C (PR REVIEW)

* [ ] Assignment gắn ExerciseSet
* [ ] Không enforce intent
* [ ] Không analytics
* [ ] AI chỉ gợi ý chữ
* [ ] Giáo viên bấm lưu cuối

---

### ✅ CHỐT UI-SPEC FLOW C (FINAL)

Flow C UI tồn tại để:

* **Giao đề / bộ bài**
* **Ghi nhận sự kiện dạy học**
* **Không diễn giải dữ liệu**
* **Giáo viên quyết định – AI đứng sau**

---

Dưới đây là **API Boundary Definition – Tổng thể (Phase 1)**, viết để **khóa tuyệt đối backend scope**, ngăn:

* Dev “tiện tay” mở thêm API
* UI gọi endpoint ngoài flow
* AI service vượt vai trò hỗ trợ

Tài liệu này **không mô tả impl**, **không mô tả schema chi tiết**, **không bàn performance**.
Nó chỉ trả lời **3 câu hỏi PM cốt lõi**:

> 1. API nào **được phép tồn tại**
> 2. API đó **phục vụ Flow nào**
> 3. API đó **không được làm gì**

---

# API BOUNDARY DEFINITION – TEACHFLOW

## Phase 1 (Flow A–B–C–D)

---

## 0. Mục đích của tài liệu này

API Boundary tồn tại để:

* Là **hàng rào cuối cùng** bảo vệ Phase 1
* Là tiêu chuẩn:

  * Review thiết kế backend
  * Review PR API
  * Review integration frontend ↔ backend
* Ngăn tuyệt đối:

  * Automation ngầm
  * Authority cho AI
  * LMS / Analytics creep

**Nguyên tắc PM tối thượng:**

> Nếu một API **không map được vào Flow A–B–C–D**
> → API đó **không được phép tồn tại trong Phase 1**

---

## 1. Nguyên tắc toàn cục cho mọi API Phase 1 (NON-NEGOTIABLE)

Áp dụng cho **toàn bộ API** dưới đây.

### 1.1 Actor & quyền hạn

* Actor duy nhất: **Teacher**
* Mọi API đều:

  * Gắn với `teacher_id`
  * Không có cross-teacher access

---

### 1.2 Trạng thái & kiểm soát

* Không có:

  * Auto-approve
  * Auto-assign
  * Background trigger
* Mọi hành động “có ý nghĩa”:

  * Phải do **frontend call trực tiếp**
  * Phải do **teacher thao tác**

---

### 1.3 AI Boundary (rất quan trọng)

* AI service:

  * **Không ghi DB**
  * **Không gọi API nghiệp vụ**
* AI output:

  * Chỉ trả về text draft
  * Không có side effect

---

## 2. API Boundary theo từng Flow

---

## 2.1 Flow A – Class Setup API Boundary

### 2.1.1 Class APIs

**Được phép tồn tại:**

| API                    | Mục đích      | Ghi chú                  |
| ---------------------- | ------------- | ------------------------ |
| `POST /classes`        | Tạo lớp       | Manual only              |
| `GET /classes`         | Danh sách lớp | Chỉ lớp của teacher      |
| `GET /classes/{id}`    | Chi tiết lớp  | Ownership check          |
| `PUT /classes/{id}`    | Sửa lớp       | Không tạo logic mới      |
| `DELETE /classes/{id}` | Xóa lớp       | Không cascade logic phức |

**CẤM tuyệt đối:**

* `POST /classes/auto`
* `POST /classes/template`
* `POST /classes/with-exercise`

---

### 2.1.2 Student APIs (Minimal)

**Được phép tồn tại:**

| API                           | Mục đích       |
| ----------------------------- | -------------- |
| `POST /classes/{id}/students` | Thêm học sinh  |
| `PUT /students/{id}`          | Sửa tên / note |
| `DELETE /students/{id}`       | Xóa học sinh   |

**CẤM:**

* Student account API
* Import API
* Bulk analytics API

---

## 2.2 Flow B – Exercise Creation API Boundary

### 2.2.1 Exercise CRUD APIs

**Được phép tồn tại:**

| API                            | Mục đích             |
| ------------------------------ | -------------------- |
| `POST /exercises`              | Tạo bài (DRAFT)      |
| `GET /exercises`               | List bài của teacher |
| `GET /exercises/{id}`          | Chi tiết bài         |
| `PUT /exercises/{id}`          | Cập nhật nội dung    |
| `POST /exercises/{id}/approve` | APPROVE bài          |

**Luật cứng:**

* `POST /exercises` **luôn tạo DRAFT**
* `approve`:

  * Không async
  * Không auto-trigger

**CẤM:**

* `POST /exercises/publish`
* `POST /exercises/share`
* `POST /exercises/clone`

---

### 2.2.2 Metadata APIs (Read-only)

**Được phép:**

| API             | Ghi chú            |
| --------------- | ------------------ |
| `GET /subjects` | Seed data          |
| `GET /topics`   | Read-only taxonomy |

**CẤM:**

* `POST /topics`
* `PUT /topics`
* Dynamic taxonomy API

---

### 2.2.3 AI Support API (Draft-only)

**Được phép tồn tại:**

| API                       | Mục đích           |
| ------------------------- | ------------------ |
| `POST /ai/exercise-draft` | Sinh nội dung nháp |

**Luật AI API:**

* Input phải tường minh
* Output:

  * Text only
  * Không status
  * Không metadata
* Không ghi DB

**CẤM:**

* AI approve API
* AI auto-save API

---

## 2.3 Flow C – Exercise Usage API Boundary

### 2.3.1 Assignment APIs

**Được phép tồn tại:**

| API                     | Mục đích        |
| ----------------------- | --------------- |
| `POST /assignments`     | Gán bài cho lớp |
| `GET /assignments/{id}` | Xem assignment  |

**Luật cứng:**

* Chỉ nhận `exercise_id` = `APPROVED`
* Không bulk assign

---

### 2.3.2 Result & Comment APIs

**Được phép tồn tại:**

| API                  | Mục đích     |
| -------------------- | ------------ |
| `POST /results`      | Lưu kết quả  |
| `PUT /results/{id}`  | Sửa kết quả  |
| `POST /comments`     | Lưu nhận xét |
| `PUT /comments/{id}` | Sửa nhận xét |

**Luật cứng:**

* Result:

  * Không aggregate
  * Không compute
* Comment:

  * Manual only

---

### 2.3.3 AI Comment Suggestion API

**Được phép:**

| API                      | Mục đích       |
| ------------------------ | -------------- |
| `POST /ai/comment-draft` | Gợi ý nhận xét |

**Luật AI API:**

* Output = text draft
* Không auto-apply
* Không multi-student

---

## 2.4 Flow D – Weekly Teacher Loop

### ❗ KHÔNG CÓ API RIÊNG

Flow D:

* Không tạo API mới
* Không có:

  * `/weekly-summary`
  * `/teacher-dashboard`
  * `/insights`

Flow D **chỉ reuse API của A–B–C**.

---

## 3. API BỊ CẤM TUYỆT ĐỐI (Global Blacklist)

Bất kỳ API nào thuộc nhóm sau **không được tồn tại**:

* Analytics / Report API
* Progress / Mastery API
* Recommendation API
* Notification / Email API
* Parent / Student Portal API

---

## 4. Mapping tổng thể: API ↔ Flow

| Flow   | API nhóm                                                     |
| ------ | ------------------------------------------------------------ |
| Flow A | `/classes`, `/students`                                      |
| Flow B | `/exercises`, `/subjects`, `/topics`, `/ai/exercise-draft`   |
| Flow C | `/assignments`, `/results`, `/comments`, `/ai/comment-draft` |
| Flow D | ❌ (reuse only)                                               |

---

## 5. Checklist Review API (Dùng khi review PR)

* [ ] API map được vào Flow A–B–C
* [ ] Không tạo API cho Flow D
* [ ] Không có AI side effect
* [ ] Không có bulk / auto logic
* [ ] Không có analytics / summary

Nếu **FAIL ≥ 1** → **PR không được merge**.

---

## 6. KẾT LUẬN CHỐT PHASE 1 (PM FINAL LOCK)

Tại thời điểm này, Phase 1 đã được **khóa hoàn toàn** ở 3 tầng:

1. **User Flow** (A–B–C–D)
2. **UI-Spec Skeleton** (A–B–C)
3. **API Boundary** (A–B–C, D = reuse)

👉 **Không còn chỗ để product trượt scope nếu team tuân thủ đúng tài liệu này.**

---
