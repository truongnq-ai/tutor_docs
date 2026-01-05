Dưới đây là **Domain Model Phase 1 – Logical Model** cho dự án **TeachFlow**, được viết theo đúng vai trò **PM + Architect**, **khóa chặt Phase 1**, và **không trượt sang DB schema hay implementation**.

---

# DOMAIN MODEL – PHASE 1 (LOGICAL)

**TeachFlow**

---

## I. MỤC ĐÍCH CỦA TÀI LIỆU NÀY

Tài liệu này tồn tại để:

* Xác định **những entity TỐI THIỂU** được phép tồn tại trong Phase 1
* Khóa rõ:

  * Ownership (thuộc về ai)
  * Ngữ cảnh tồn tại (global hay theo lớp / bài)
* Ngăn:

  * Over-design
  * Thêm field “để sau dùng”
  * Encode logic sư phạm vào data model

👉 **Đây KHÔNG phải DB schema**
👉 Đây là **logical contract** cho backend, frontend và AI integration.

---

## II. NGUYÊN TẮC DOMAIN MODEL PHASE 1 (BẤT BIẾN)

Áp dụng nghiêm ngặt System Law & Phase 1 Law:

1. **Teacher là owner tuyệt đối**
2. Không tồn tại:

   * Student account
   * Parent account
   * Admin nghiệp vụ
3. Không có entity:

   * Progress
   * Analytics
   * Report
4. AI:

   * Không sở hữu entity
   * Không ghi dữ liệu cuối

---

## III. DANH SÁCH ENTITY PHASE 1 (LOGICAL)

### 1. Teacher (IMPLICIT ROOT)

**Vai trò:**

* Chủ sở hữu toàn bộ dữ liệu
* Không mở rộng domain trong Phase 1

**Lưu ý:**

* Teacher **không được model hóa sâu**
* Chỉ tồn tại dưới dạng `teacher_id` để gắn ownership

---

### 2. Class

**Mục đích tồn tại:**
👉 Tạo **không gian làm việc** cho giáo viên

**Logical Attributes:**

* `class_id`
* `teacher_id` (owner)
* `name`
* `subject_id`
* `description` (optional)
* `note` (optional)

**Đặc điểm quan trọng:**

* Class **không có trạng thái**
* Không có:

  * Tiến độ
  * Chất lượng
  * Hiệu quả lớp

**Quan hệ:**

* 1 Teacher → N Class
* 1 Class → N Student
* 1 Class → N Assignment (usage)

---

### 3. Student (MINIMAL, NO ACCOUNT)

**Mục đích tồn tại:**
👉 Là **đối tượng được dạy**, không phải user hệ thống

**Logical Attributes:**

* `student_id`
* `class_id`
* `name`
* `note` (optional)

**Cố tình KHÔNG có:**

* Login
* Profile năng lực
* Điểm trung bình
* Thông tin nhạy cảm

**Quan hệ:**

* Student **chỉ tồn tại trong Class**
* Không tồn tại Student “toàn hệ thống”

---

## **4. Exercise**

```markdown
### 4. Exercise

**Mục đích tồn tại:**
👉 Là **đơn vị bài tập nhỏ nhất**, dùng để **xây dựng đề / bộ bài**

**Logical Attributes:**

* `exercise_id`
* `teacher_id` (owner)
* `content`
* `subject_id`
* `topic_id`
* `difficulty` (optional, teacher-declared)
* `type` (optional, metadata)
* `status` (`DRAFT` | `APPROVED`)

**Đặc điểm quan trọng:**

* Exercise **không bao giờ được giao trực tiếp cho lớp**
* Exercise **không chạm tới học sinh**
* Exercise **chỉ được sử dụng thông qua ExerciseSet**

**Quan hệ:**

* 1 Teacher → N Exercise
* N Exercise → N ExerciseSet (thông qua quan hệ tập hợp)
```

---

## **5. ExerciseSet (Assignment Unit / “Đề bài”)**  ← **ENTITY MỚI**

```markdown
### 5. ExerciseSet (Exercise Collection / “Đề bài”)

**Mục đích tồn tại:**
👉 Đại diện cho **một đơn vị giao bài có ý nghĩa thực tế**
(ví dụ: đề ôn tập, đề luyện tập, đề kiểm tra, đề khảo sát…)

ExerciseSet **không phải** bài tập đơn lẻ,
mà là **tập hợp 1 hoặc nhiều Exercise** do giáo viên chủ động tạo.

**Logical Attributes:**

* `exercise_set_id`
* `teacher_id` (owner)
* `title`
* `description` (optional)
* `intent` (`PRACTICE` | `REVIEW` | `SURVEY` | `TEST`)
* `note_for_teacher` (optional)

**Nguyên tắc BẤT BIẾN:**

* `intent` **chỉ mang tính mô tả**
* `intent` **KHÔNG**:
  * Enforce logic hệ thống
  * Trigger rule
  * Thay đổi hành vi Assignment
* ExerciseSet **không có**:
  * Giới hạn số lần làm
  * Khóa xem kết quả
  * Chấm điểm tổng
  * Phân tích / đánh giá

**Quan hệ:**

* 1 Teacher → N ExerciseSet
* 1 ExerciseSet → 1..N Exercise
* 1 ExerciseSet → N Assignment
```

---

## **6. Assignment (ExerciseSet Usage Context)** ← **ĐƯỢC SỬA**

```markdown
### 6. Assignment (ExerciseSet Usage Context)

**Mục đích tồn tại:**
👉 Ghi nhận **việc giáo viên giao một ExerciseSet cho một Class**

Assignment đại diện cho:
> “Lần giao đề này cho lớp này”

**Logical Attributes:**

* `assignment_id`
* `class_id`
* `exercise_set_id`
* `assigned_at`

**Đặc điểm quan trọng:**

* Assignment **luôn gắn với ExerciseSet**
* Trường hợp “giao 1 bài”:
  * Vẫn tạo ExerciseSet chứa 1 Exercise
* Assignment **không chứa rule sư phạm**

**Quan hệ:**

* 1 Class → N Assignment
* 1 ExerciseSet → N Assignment
```

---

## **7. Result (Per-Student, Per-Exercise, Per-Assignment)** ← **DIỄN GIẢI RÕ HƠN**

```markdown
### 7. Result (Per-Student, Per-Exercise, Per-Assignment)

**Mục đích tồn tại:**
👉 Ghi nhận **kết quả làm bài của từng học sinh**
trong **một Assignment cụ thể**

**Logical Attributes:**

* `result_id`
* `assignment_id`
* `student_id`
* `exercise_id`
* `value` (score hoặc pass/fail)

**Nguyên tắc:**

* Result **không dùng để**:
  * Tính toán tổng
  * So sánh
  * Phân tích tiến bộ

**Quan hệ:**

* 1 Assignment → N Result
* 1 Student → N Result
* 1 Exercise → N Result (trong ngữ cảnh Assignment)
```

---

## **8. Comment (Teacher-controlled)** ← **CHỈ ĐỔI SỐ THỨ TỰ**

```markdown
### 8. Comment (Teacher-controlled)

**Mục đích tồn tại:**
👉 Lưu **nhận xét thủ công của giáo viên**
theo từng học sinh, trong từng Assignment

**Logical Attributes:**

* `comment_id`
* `assignment_id`
* `student_id`
* `exercise_id` (optional)
* `content`
* `source` (`MANUAL` | `AI_SUGGESTED_EDITED`)

**Nguyên tắc:**

* AI **không bao giờ** là owner
* Comment **luôn teacher-controlled**
```

---

## IV. CÁC ENTITY CỐ TÌNH KHÔNG TỒN TẠI (PHASE 1)

| Entity          | Lý do                  |
| --------------- | ---------------------- |
| Progress        | Vi phạm Phase 1 Law    |
| Report          | Dẫn tới analytics      |
| Summary         | Tạo authority hệ thống |
| Skill Profile   | Suy diễn năng lực      |
| Student History | Mở đường so sánh       |
| Public Library  | Ngoài scope            |

---

## V. TỔNG QUAN QUAN HỆ (TEXTUAL)

```
Teacher
 ├─ Class
 │   ├─ Student
 │   └─ Assignment
 │       ├─ Exercise
 │       └─ Result
 │           └─ Comment
```

👉 Không có quan hệ chéo
👉 Không có entity “global intelligence”

---

## VI. MAPPING DOMAIN ↔ API BOUNDARY

| API Group       | Domain chạm tới                |
| --------------- | ------------------------------ |
| Class APIs      | Class, Student                 |
| Exercise APIs   | Exercise                       |
| Assignment APIs | Assignment, ExerciseSet        |                     |
| Result APIs     | Result, Comment                |
| AI APIs         | Draft text ONLY (no ownership) |

---

## VII. CHECKLIST TỰ ĐỘNG REVIEW DOMAIN

Domain Model này:

* [x] Không trao authority cho AI
* [x] Không encode logic sư phạm
* [x] Không mở đường analytics
* [x] Không thêm entity “cho sau”
* [x] Map 1–1 với API Boundary

👉 **PASS – Phase 1 Safe**

---

## VIII. KẾT LUẬN (CHỐT DOMAIN PHASE 1)

* Domain Model Phase 1 **đã khóa**
* Có thể dùng làm:

  * Chuẩn thiết kế DB (bước sau)
  * Chuẩn review backend code
  * Chuẩn viết test & migration
* Không cần sửa trừ khi:

  * Thay đổi Law (không xảy ra)
  * Sang Phase 2

---

Dưới đây là **DB SCHEMA – PHASE 1 (FINAL)** cho **TeachFlow**, đã **chốt theo toàn bộ quyết định kiến trúc** vừa thống nhất (users/teachers tách bạch, topic read-only, không user management).

---

# DB SCHEMA – PHASE 1 (FINAL)

**TeachFlow**

> Nguyên tắc:
>
> * Đủ dùng cho Phase 1
> * Không field “để sau dùng”
> * Không analytics / lifecycle / automation
> * Tối thiểu constraint, rõ ownership

---

## 1. `users` (Authentication Identity)

```
users
- id (PK)
- username (UNIQUE, NOT NULL)
- password_hash (NOT NULL)
- name (NOT NULL)
- created_at
- updated_at
```

**Rule:**

* Chỉ dùng cho đăng nhập
* Không register / forgot password
* Admin reset thủ công (ngoài hệ thống)

---

## 2. `teachers` (Domain Role)

```
teachers
- id (PK)
- user_id (FK → users.id, UNIQUE, NOT NULL)
- created_at
- updated_at
```

**Rule:**

* 1 user ↔ 1 teacher
* Teacher là owner toàn bộ domain data

---

## 3. `subjects` (Seed Data – Read-only)

```
subjects
- id (PK)
- name (NOT NULL)
- order_index
```

**Rule:**

* Seed bằng migration
* Không CRUD cho teacher

---

## 4. `topics` (Taxonomy – Read-only)

```
topics
- id (PK)
- subject_id (FK → subjects.id, NOT NULL)
- parent_id (FK → topics.id, nullable)
- name (NOT NULL)
- description (nullable)
- level
- order_index
```

**Rule:**

* Seed data
* Read-only trong Phase 1
* Cho phép phân cấp nhiều cấp

---

## 5. `classes`

```
classes
- id (PK)
- teacher_id (FK → teachers.id, NOT NULL)
- name (NOT NULL)
- subject_id (FK → subjects.id, NOT NULL)
- description (nullable)
- note (nullable)
- created_at
- updated_at
```

**Rule:**

* 1 class ∈ 1 teacher
* Không status / analytics

---

## 6. `students` (Minimal)

```
students
- id (PK)
- class_id (FK → classes.id, NOT NULL)
- name (NOT NULL)
- note (nullable)
- created_at
- updated_at
```

**Rule:**

* Không login
* Không profile năng lực

---

## 7. `exercises`

```
exercises
- id (PK)
- teacher_id (FK → teachers.id, NOT NULL)
- content (TEXT, NOT NULL)
- subject_id (FK → subjects.id, NOT NULL)
- topic_id (FK → topics.id, NOT NULL)
- difficulty (nullable)
- type (nullable)
- status (ENUM: DRAFT, APPROVED, NOT NULL)
- created_at
- updated_at
```

**Rule:**

* APPROVED ≠ public
* Không usage_count / quality_score
* ⚠️ Lưu ý quan trọng
* Exercise không còn được gán trực tiếp cho class.
* Mọi usage bắt buộc đi qua ExerciseSet.

---

## 8. `exercise_sets` (**BẢNG MỚI – CORE UPDATE**)

```sql
exercise_sets
- id (PK)
- teacher_id (FK → teachers.id, NOT NULL)
- title (NOT NULL)
- description (nullable)
- intent (ENUM: PRACTICE, REVIEW, SURVEY, TEST, NOT NULL)
- note_for_teacher (nullable)
- created_at
- updated_at
```

### Rule (LOGICAL – không enforce bằng DB):

* `intent`:

  * Chỉ mang tính mô tả
  * Không tạo constraint
  * Không trigger hành vi hệ thống

---

## 9. `exercise_set_items` (JOIN TABLE – SET ↔ EXERCISE)

```sql
exercise_set_items
- id (PK)
- exercise_set_id (FK → exercise_sets.id, NOT NULL)
- exercise_id (FK → exercises.id, NOT NULL)
- order_index (nullable)
```

**Rule:**

* Không enforce thứ tự
* Không auto-sort
* Order (nếu có) hoàn toàn do giáo viên

---

## 10. `assignments` (**UPDATED – GẮN EXERCISESET**)

```sql
assignments
- id (PK)
- class_id (FK → classes.id, NOT NULL)
- exercise_set_id (FK → exercise_sets.id, NOT NULL)
- assigned_at
```

❌ **KHÔNG CÒN**:

* `exercise_id` trong assignments

---

## 11. `results` (UPDATED – RÕ NGỮ CẢNH)

```sql
results
- id (PK)
- assignment_id (FK → assignments.id, NOT NULL)
- student_id (FK → students.id, NOT NULL)
- exercise_id (FK → exercises.id, NOT NULL)
- value (TEXT or NUMBER, NOT NULL)
- created_at
- updated_at
```

**Rule:**

* Không aggregate
* Không compute
* Không so sánh

---

## 12. `comments` (UPDATED – TÙY CHỌN GẮN EXERCISE)

```sql
comments
- id (PK)
- assignment_id (FK → assignments.id, NOT NULL)
- student_id (FK → students.id, NOT NULL)
- exercise_id (FK → exercises.id, nullable)
- content (TEXT, NOT NULL)
- source (ENUM: MANUAL, AI_SUGGESTED_EDITED, NOT NULL)
- created_at
- updated_at
```

---

## 13. QUAN HỆ TỔNG QUAN (1 DÒNG – UPDATED)

```
User
 → Teacher
   → Class
     → Student
     → Assignment
       → ExerciseSet
         → Exercise
       → Result
       → Comment
```

---

## 13. TRẠNG THÁI TÀI LIỆU

* ✅ **FINAL – Phase 1 Locked**
* Dùng cho:

  * Migration
  * Backend implementation
  * Review PR
* Mọi thay đổi:
  → Chỉ khi sang Phase 2+

---

Dưới đây là **MIGRATION STRATEGY – PHASE 1** cho **TeachFlow**, tập trung **ngắn gọn – thực thi được ngay**, bao gồm **thứ tự migrate** và **seed data** cần thiết.

---

# MIGRATION STRATEGY – PHASE 1

**TeachFlow**

---

## I. MỤC TIÊU

* Đảm bảo DB Phase 1:

  * **Tạo đúng thứ tự**
  * **Seed đủ data để hệ thống chạy**
  * **Không phụ thuộc admin UI**
* Tránh:

  * Re-run seed gây lỗi
  * Seed “lẫn” business data

---

## II. NGUYÊN TẮC CHUNG

1. **Schema trước – Seed sau**
2. **Reference data seed một lần**
3. **Business data không seed**
4. **Migration idempotent**
5. **Không có data giả cho analytics**

---

## III. THỨ TỰ MIGRATE (BẮT BUỘC)

### STEP 0 – Extensions / Enum (nếu dùng)

* Enum:

  * `exercise_status` = (`DRAFT`, `APPROVED`)
  * `comment_source` = (`MANUAL`, `AI_SUGGESTED_EDITED`)

> Nếu DB không hỗ trợ ENUM → dùng CHECK constraint.

---

### STEP 1 – Authentication & Identity

```
1. users
2. teachers
```

**Lý do:**

* `teachers.user_id` phụ thuộc `users.id`
* Auth cần tồn tại trước domain data

---

### STEP 2 – Reference Data (Seed-only)

```
3. subjects
4. topics
```

**Lý do:**

* Read-only
* Được tham chiếu bởi classes & exercises

---

### STEP 3 – Core Domain Tables

```
5. classes
6. students
7. exercises
```

**Lý do:**

* Đây là dữ liệu do giáo viên tạo
* Phụ thuộc identity + reference data

---

### STEP 4 – Usage Context

```
8. assignments
9. results
10. comments
```

**Lý do:**

* Phụ thuộc class + exercise + student

---

## IV. SEED DATA STRATEGY

### 1. Seed `subjects` (BẮT BUỘC)

**Nguồn:**

* Danh sách môn học cố định

**Nguyên tắc:**

* Seed bằng migration
* `ON CONFLICT DO NOTHING`

**Ví dụ:**

```
subjects
- Toán
- Ngữ văn
- Tiếng Anh
- Vật lý
- Hóa học
```

---

### 2. Seed `topics` (BẮT BUỘC)

**Nguồn:**

* Taxonomy định nghĩa sẵn

**Nguyên tắc:**

* Seed theo **thứ tự cha → con**
* `parent_id` phải tồn tại trước
* Không cho phép chỉnh sửa sau seed

**Gợi ý kỹ thuật:**

* Seed nhiều file:

  * `topics_root.sql`
  * `topics_level_1.sql`
  * `topics_level_2.sql`

---

### 3. KHÔNG seed các bảng sau

❌ Không seed:

* users
* teachers
* classes
* students
* exercises
* assignments
* results
* comments

👉 Đây là **business data**, chỉ tạo qua hệ thống.

---

## V. ADMIN BOOTSTRAP (PHASE 1)

### Cách tạo user đầu tiên (ngoài migration)

* Thực hiện bằng:

  * Script CLI
  * Manual SQL (1 lần)

**Ví dụ logic:**

```
INSERT INTO users (username, password_hash, name)
VALUES ('teacher01', '<bcrypt-hash>', 'Nguyễn Văn A');

INSERT INTO teachers (user_id)
VALUES (<user_id_above>);
```

**Lưu ý:**

* Không hardcode password trong migration
* Không commit credential

---

## VI. ROLLBACK STRATEGY (ĐƠN GIẢN)

* Rollback **ngược thứ tự migrate**
* Không rollback seed reference data trong môi trường production

---

## VII. CHECKLIST TRƯỚC KHI CHẠY MIGRATION

* [ ] Enum / constraint đã tạo
* [ ] Reference data seed idempotent
* [ ] Không seed business data
* [ ] Không seed user credential
* [ ] Thứ tự migrate đúng phụ thuộc FK

👉 **PASS → Có thể triển khai Phase 1**

---

## VIII. TRẠNG THÁI TÀI LIỆU

* ✅ **FINAL – Phase 1 Locked**
* Dùng cho:

  * Dev backend
  * DevOps
  * Review PR migration

---