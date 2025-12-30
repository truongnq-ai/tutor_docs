Dưới đây là **toàn bộ tài liệu UI-Spec – Exercise Content Management (Phase 1)** được **viết lại hoàn chỉnh dưới dạng Markdown**, sẵn sàng để bạn **copy đưa thẳng vào repo tài liệu**.

---

## 📄 Thông tin tài liệu

**Tên file đề xuất**

```
admin-ui-spec-exercise-content-management.md
```

**Vị trí lưu trữ**

```
/tutor/tutor_docs/03-phase/phase-1/ui-specs/admin/
```

---

# UI-SPEC – EXERCISE CONTENT MANAGEMENT

## Admin Dashboard – Phase 1 (Content Approval Only)

---

## 1. Purpose & Scope

Tài liệu này định nghĩa **toàn bộ hành vi UI** liên quan đến **Exercise** trong **Admin Dashboard – Phase 1**.

### Mục tiêu

* Quản trị **nội dung bài tập (Exercise) như một content asset**
* Đảm bảo bài tập **đủ chuẩn nội dung** trước khi được sử dụng cho học sinh

### Ngoài phạm vi (Explicitly Excluded)

* Học sinh (Student)
* Practice / Attempt
* Kết quả học tập
* Mastery / Progress
* Runtime preview / test bài

> **Lưu ý cốt lõi:**
> UI trong tài liệu này chỉ phục vụ **Content Governance**,
> **KHÔNG** phục vụ **Learning Governance**.

---

## 2. Exercise – UI Mental Model

* Exercise là **tài sản nội dung**
* Không gắn với học sinh
* Không gắn với practice
* Không có ngữ cảnh học tập trong Admin UI

### Vòng đời nội dung (Content Lifecycle)

```text
DRAFT → APPROVED
```

UI **chỉ phản ánh trạng thái nội dung**, không phản ánh trạng thái học tập.

---

## 3. Exercise List Screen

### 3.1 Header & Primary Action

**Tiêu đề**

```text
Bài tập
```

**Primary Action (Dropdown Button)**

```text
[ Tạo bài tập ]
   ├─ Tạo thủ công
   ├─ Tạo với AI
   └─ Tạo từ JSON
```

* Đây là **content creation**
* Không phải giao bài
* Không phải test AI

---

### 3.2 Filters (Bộ lọc)

Các bộ lọc được phép:

* **Lớp** – metadata nội dung
* **Chương** – Chapter (select từ danh sách)
* **Kỹ năng** – taxonomy
* **Trạng thái** – `content_status`

❌ Không có text search
❌ Không có filter theo học sinh
❌ Không có filter theo kết quả học tập

---

### 3.3 Table Columns

Bảng danh sách Exercise hiển thị các cột sau:

| Cột               | Mô tả                    |
| ----------------- | ------------------------ |
| Lớp               | Metadata nội dung        |
| Chương            | Chapter                  |
| Kỹ năng           | Skill                    |
| Nội dung bài toán | Preview text (rút gọn)   |
| Độ khó            | Content-level difficulty |
| Ngày tạo          | Thời điểm tạo            |
| Trạng thái        | `Chờ duyệt` / `Đã duyệt`     |
| Thao tác          | Dropdown hành động       |

❌ Không hiển thị ID
❌ Không hiển thị điểm chất lượng
❌ Không hiển thị số lần sử dụng
Lưu ý: Backend xử lý:

Chờ duyệt → DRAFT + REVIEWED
Đã duyệt → APPROVED
---

### 3.4 Action Dropdown (per Exercise)

Các hành động trong dropdown **(tiếng Việt)**:

* **Chi tiết**
* **Chỉnh sửa** *(chỉ khi `Chờ duyệt`)*
* **Review**
* **Duyệt**

#### Quy tắc bắt buộc

* Không có:

  * Giao bài
  * Dùng cho học sinh
  * Test / Preview runtime
  * Xem kết quả học sinh

---

## 4. Create Exercise Flows

### 4.1 Tạo thủ công

* Admin nhập nội dung bài tập bằng form
* Metadata: lớp, chương, kỹ năng, độ khó
* Kết quả:

```text
content_status = DRAFT
```

---

### 4.2 Tạo với AI

* Admin chọn:

  * Chapter
  * Skill
  * Difficulty
* AI sinh nội dung bài tập
* UI hiển thị nhãn:

```text
“Tạo bởi AI – cần duyệt”
```

* Kết quả:

```text
content_status = DRAFT
```

❌ Không auto-approve
❌ Không auto-publish

---

### 4.3 Tạo từ JSON

* Upload file JSON

* Validate:

  * schema
  * LaTeX

* Nếu hợp lệ → lưu Exercise

* Kết quả:

```text
content_status = DRAFT
```

---

## 5. Edit Exercise

### Điều kiện

* Chỉ cho phép khi:

```text
content_status = DRAFT
```

### Cho phép chỉnh sửa

* Nội dung bài toán
* Lời giải
* Metadata (lớp, chương, kỹ năng, độ khó)

❌ Không có hành vi runtime
❌ Không có ngữ cảnh học sinh

---

## 6. Review & Approve

### 6.1 Review (Content Review)

**Mục đích**

* Kiểm tra **chất lượng nội dung bài tập**

**Hiển thị**

* Nội dung bài toán (read-only)
* Lời giải
* Metadata

**Không hiển thị**

* Học sinh
* Practice
* Kết quả học tập

**Hành động**

* Duyệt
* Quay lại chỉnh sửa

---

### 6.2 Duyệt (Approve)

* Khi admin chọn **Duyệt**:

```text
content_status → APPROVED
```

* Sau khi duyệt:

  * Exercise trở thành **read-only**
  * Không cho phép chỉnh sửa

---

## 7. Global UI Constraints (Bắt buộc)

Trong toàn bộ Exercise UI:

* ❌ Không hiển thị học sinh
* ❌ Không hiển thị kết quả học tập
* ❌ Không hiển thị số lần làm bài
* ❌ Không có CTA runtime
* ❌ Không có analytics học tập

UI **chỉ phản ánh Content State**, không phản ánh Learning State.

---

## 8. Final Statement (Anti-Confusion)

> **Exercise UI trong Phase 1 chỉ trả lời:**
>
> *“Bài tập này đã đủ chuẩn nội dung chưa?”*
>
> **KHÔNG BAO GIỜ trả lời:**
> *“Học sinh học bài này như thế nào?”*

---

## 9. Usage Note for Developers & Cursor

* Mọi implementation UI liên quan đến Exercise **PHẢI tuân theo tài liệu này**
* Nếu xuất hiện ý tưởng:

  > “Cho admin test nhanh với học sinh / runtime cho tiện…”

→ **DỪNG LẠI**
→ Đó là **Phase 2+**, không thuộc Phase 1.

---

### ✅ KẾT LUẬN

* Tài liệu này là **nguồn chuẩn duy nhất** cho Exercise UI trong Phase 1
* Được dùng để:

  * viết prompt cho Cursor
  * review code
  * đào tạo dev mới
* Đảm bảo **frontend không thể vượt Phase 1 một cách vô tình**


