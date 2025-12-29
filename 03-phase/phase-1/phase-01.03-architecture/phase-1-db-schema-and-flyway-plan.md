# DB Schema and Flyway Plan – Phase 1 (Final)

**Project:** Tutor  
**Document type:** Architecture Design  
**Audience:** Developer | Tech  
**Status:** FINAL – FROZEN BEFORE CODING  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này là nguồn sự thật duy nhất cho database Phase 1.

**Mục tiêu:**

- Định nghĩa schema DB cho Phase 1
- Bảo vệ invariant cốt lõi của domain học tập
- Bảo toàn đầy đủ tài sản tri thức (content)
- Không vi phạm bất kỳ System Law nào

**Phase 1 DB:**

- KHÔNG Question
- KHÔNG Session / MiniTest
- KHÔNG Trial / License / Payment
- KHÔNG Device / Analytics
- KHÔNG Retry / Attempt phức tạp

---

## 2. PHÂN TÁCH DOMAIN TRONG DATABASE

Database Phase 1 gồm 3 nhóm rõ ràng:

1. **Auth & Identity** (xác thực, phiên làm việc)
2. **Content Domain** (tài sản tri thức, do admin/AI/giáo viên tạo)
3. **Learning Domain** (runtime học tập của Student)

Ba nhóm này:

- CÙNG NẰM TRONG core-service
- NHƯNG TUYỆT ĐỐI KHÔNG LẪN LOGIC

---

## 3. AUTH & IDENTITY TABLES

### 3.1. users

**Purpose:**

- Định danh người dùng
- Phân quyền cơ bản

**Columns:**

- id (UUID, PK)
- username (VARCHAR, UNIQUE, NOT NULL)
- password_hash (VARCHAR, NOT NULL)
- name (VARCHAR, NOT NULL)
- role (VARCHAR, NOT NULL)
  - Allowed values: ADMIN | PARENT | STUDENT
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)

**Constraints:**

- role CHECK IN ('ADMIN','PARENT','STUDENT')

**Notes:**

- users KHÔNG chứa state học tập

### 3.2. refresh_token

**Purpose:**

- Duy trì phiên đăng nhập
- Phục vụ auth, không ảnh hưởng domain học

**Columns:**

- id (UUID, PK)
- user_id (UUID, FK → users.id)
- token (VARCHAR, UNIQUE, NOT NULL)
- expires_at (TIMESTAMP, NOT NULL)
- revoked (BOOLEAN, NOT NULL DEFAULT FALSE)
- created_at (TIMESTAMP, NOT NULL)

**Notes:**

- revoke token KHÔNG được ảnh hưởng domain

---

## 4. CONTENT DOMAIN TABLES (ASSET TRI THỨC)

### 4.1. chapter

**Purpose:**

- Nội dung chương học

**Columns:**

- id (UUID, PK)
- code (VARCHAR, UNIQUE, NOT NULL)
- name (VARCHAR, NOT NULL)
- description (TEXT)
- grade (INT, NOT NULL)
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)

**Notes:**

- Chapter KHÔNG chứa tiến độ học

### 4.2. skill

**Purpose:**

- Phân loại kỹ năng

**Columns:**

- id (UUID, PK)
- code (VARCHAR, UNIQUE, NOT NULL)
- name (VARCHAR, NOT NULL)
- description (TEXT)
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)

### 4.3. exercise

**Purpose:**

- Đề bài toán (content gốc)

**Columns:**

- id (UUID, PK)
- chapter_id (UUID, FK → chapter.id)
- skill_id (UUID, FK → skill.id)
- content_text (TEXT, NOT NULL)
- content_latex (TEXT)
- difficulty (INT, NOT NULL)
- created_by (VARCHAR, NOT NULL)
  - Allowed values: ADMIN | AI | TEACHER
- status (VARCHAR, NOT NULL)
  - Allowed values: DRAFT | REVIEWED | APPROVED
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)

**Notes:**

- Exercise KHÔNG chứa lời giải
- Exercise KHÔNG gắn Student

### 4.4. exercise_solution

**Purpose:**

- Lời giải chuẩn cho Exercise

**Columns:**

- id (UUID, PK)
- exercise_id (UUID, FK → exercise.id)
- solution_steps (TEXT)
- final_answer (TEXT)
- explanation (TEXT)
- created_by (VARCHAR, NOT NULL)
- created_at (TIMESTAMP, NOT NULL)

**Notes:**

- Một Exercise có thể có nhiều Solution
- Solution là tài sản tri thức, KHÔNG phải runtime

### 4.5. exercise_tag

**Purpose:**

- Gắn nhãn phân loại cho Exercise

**Columns:**

- id (UUID, PK)
- exercise_id (UUID, FK → exercise.id)
- tag_name (VARCHAR, NOT NULL)
- tag_type (VARCHAR)
- created_at (TIMESTAMP, NOT NULL)

**Notes:**

- KHÔNG có bảng Tag master
- Tag chỉ tồn tại trong ngữ cảnh Exercise

### 4.6. exercise_review_log

**Purpose:**

- Audit & review content

**Columns:**

- id (UUID, PK)
- exercise_id (UUID, FK → exercise.id)
- reviewer_id (UUID, FK → users.id)
- action (VARCHAR, NOT NULL)
  - Allowed values: SUBMITTED | APPROVED | REJECTED | UPDATED
- comment (TEXT)
- created_at (TIMESTAMP, NOT NULL)

**Notes:**

- ReviewLog KHÔNG ảnh hưởng học sinh
- Không tham gia learning flow

---

## 5. LEARNING DOMAIN TABLES (PHASE 1)

### 5.1. student_profile

**Purpose:**

- Lưu lifecycle học tập

**Columns:**

- user_id (UUID, PK, FK → users.id)
- lifecycle_state (VARCHAR, NOT NULL)
  - Allowed values: ACTIVE | SUSPENDED | INACTIVE
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)

**Notes:**

- lifecycle_state là nguồn sự thật duy nhất cho quyền học

### 5.2. parent_student

**Purpose:**

- Quan hệ Parent – Student

**Columns:**

- parent_id (UUID, FK → users.id)
- student_id (UUID, FK → users.id)

**Primary Key:**

- (parent_id, student_id)

### 5.3. chapter_progress

**Purpose:**

- Aggregate Root tiến độ học tập

**Columns:**

- id (UUID, PK)
- student_id (UUID, FK → users.id)
- chapter_id (UUID, FK → chapter.id)
- chapter_state (VARCHAR, NOT NULL)
  - Allowed values: LOCKED | IN_PROGRESS | COMPLETED
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)

**Constraints:**

- UNIQUE(student_id, chapter_id)
- chapter_state CHECK IN ('LOCKED','IN_PROGRESS','COMPLETED')

**PARTIAL UNIQUE INDEX:**

```sql
UNIQUE(student_id)
WHERE chapter_state = 'IN_PROGRESS'
```

**Notes:**

- DB hỗ trợ invariant: 1 Chapter IN_PROGRESS / Student

### 5.4. practice

**Purpose:**

- Lưu hành vi làm bài của Student

**Columns:**

- id (UUID, PK)
- chapter_progress_id (UUID, FK → chapter_progress.id)
- exercise_snapshot (JSONB, NOT NULL)
- student_answer (TEXT)
- is_correct (BOOLEAN)
- submitted_at (TIMESTAMP)

**Notes:**

- Practice luôn thuộc ChapterProgress
- Practice trigger domain events, nhưng DB không encode logic

### 5.5. skill_mastery

**Purpose:**

- Persist SkillMastery Value Object

**Columns:**

- student_id (UUID, FK → users.id)
- skill_id (UUID, FK → skill.id)
- mastery_value (INT, NOT NULL)
- updated_at (TIMESTAMP, NOT NULL)

**Primary Key:**

- (student_id, skill_id)

**Constraints:**

- mastery_value BETWEEN 0 AND 100

**Notes:**

- SkillMastery KHÔNG unlock Chapter

---

## 6. NHỮNG ĐIỀU TUYỆT ĐỐI CẤM

- Question table
- Session / MiniTest
- skill_completion boolean
- progress table ngoài chapter_progress
- trigger / stored procedure
- trial / license / payment / device
- cascade delete chapter_progress

---

## 7. FLYWAY MIGRATION PLAN – PHASE 1

Migration phải chạy theo thứ tự:

1. **V1__create_users_and_refresh_token.sql**
   - users
   - refresh_token

2. **V2__create_student_profile_and_parent_relation.sql**
   - student_profile
   - parent_student

3. **V3__create_chapter_and_skill.sql**
   - chapter
   - skill

4. **V4__create_exercise_content.sql**
   - exercise
   - exercise_solution
   - exercise_tag
   - exercise_review_log

5. **V5__create_chapter_progress.sql**
   - chapter_progress
   - unique constraints
   - partial index

6. **V6__create_practice.sql**
   - practice

7. **V7__create_skill_mastery.sql**
   - skill_mastery

---

## 8. KẾT LUẬN CUỐI

Schema này:

- Giữ trọn tài sản tri thức
- Không phá Domain Model Phase 1
- Không mở scope ngầm
- Sẵn sàng cho Phase 2 mở rộng (Question, Session)

File này được coi là FINAL. Mọi thay đổi sau thời điểm này:

- BẮT BUỘC quay lại System Law hoặc Phase Scope.

---

## 9. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Backend Skeleton](phase-1-backend-skeleton.md)
  - [Domain Model](phase-1-domain-model.md)
  - [Java Package Mapping](phase-1-java-package-mapping.md)
  - [DB Migration Scripts](db_migration/)

---

[← Quay lại Overview](../../README.md)

