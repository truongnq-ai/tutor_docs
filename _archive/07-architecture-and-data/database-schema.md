# DATABASE SCHEMA

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả database schema của hệ thống Tutor - ERD, DDL, và các quyết định thiết kế quan trọng.

---



← Quay lại: [README.md](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả:
- Database Entity Relationship Diagram (ERD) cho Phase 1
- DDL (SQL) để khởi tạo database

Phạm vi:
- Phục vụ MVP (Toán lớp 6–7)
- Hỗ trợ onboarding, học tập, linking phụ huynh – học sinh
- Chưa bao gồm billing, teacher, class (Phase 2+)

---

## 1.1. QUY ĐỊNH VỀ PRIMARY ID (UUID v7)

**TẤT CẢ PRIMARY ID PHẢI SỬ DỤNG UUID v7 (Time-ordered UUID)**

1. **UUID v7 được sinh ra ở tầng Application, KHÔNG phải Database hay Hibernate**
   - UUID v7 được generate bởi `UuidGenerator.generate()` trong Java code
   - BaseEntity sử dụng `@PrePersist` để tự động generate UUID v7 khi entity được persist lần đầu
   - Database schema KHÔNG có DEFAULT value cho UUID columns

2. **Lý do sử dụng UUID v7:**
   - Time-ordered: UUID v7 chứa timestamp, giúp sorting và indexing tốt hơn UUID v4
   - Distributed systems: Không cần database sequence, phù hợp với microservices
   - Security: Không expose sequential IDs, khó đoán được ID tiếp theo

3. **Implementation:**
   - Tất cả entities extend `BaseEntity` (có UUID v7 id)
   - Migration scripts KHÔNG có `DEFAULT uuid_generate_v4()` 
   - Seed data scripts sử dụng pre-generated UUID v7 (cho deterministic seeding)

4. **Lưu ý đặc biệt cho Skill entity:**
   - Skill có thêm field `code` (VARCHAR(50), UNIQUE) để lưu human-readable identifier (format: "6.1.1", "7.2.3")
   - `code` field dùng cho business logic và API responses, `id` (UUID v7) dùng cho primary key và foreign keys

---

---


## 2. DATABASE ERD (MERMAID)

```mermaid
erDiagram

  PARENT_ACCOUNT ||--o{ STUDENT_PROFILE : has
  PARENT_ACCOUNT ||--o{ LINK_TOKEN : generates

  STUDENT_PROFILE ||--o{ PRACTICE : performs
  STUDENT_PROFILE ||--o{ MINI_TEST_RESULT : takes
  STUDENT_PROFILE ||--o{ LINK_TOKEN : uses

  STUDENT_TRIAL_PROFILE ||--o{ PRACTICE : performs
  STUDENT_TRIAL_PROFILE ||--o{ LINK_TOKEN : converts_to

  SKILL ||--o{ PRACTICE : relates_to
  SKILL ||--o{ QUESTION : relates_to

  EXERCISE ||--o{ QUESTION : generates

  QUESTION ||--o{ PRACTICE : links_to

  STUDENT_PROFILE ||--o{ QUESTION : assigned_to

  PARENT_ACCOUNT ||--o{ OTP_SESSION : generates

  USERS ||--o{ REFRESH_TOKEN : has

  USERS {
    uuid id PK
    string username UK
    string password_hash
    string email UK
    string phone_number UK
    string user_type
    string status
    string oauth_provider
    string oauth_id
    boolean phone_verified
    boolean email_verified
    timestamp last_login_at
    timestamp created_at
  }

  REFRESH_TOKEN {
    uuid id PK
    uuid user_id FK
    string token_hash UK
    timestamp expires_at
    timestamp revoked_at
    timestamp created_at
    timestamp last_used_at
  }

  PARENT_ACCOUNT {
    uuid id PK
    string name
    string phone_number
    boolean phone_verified
    string email
    string password_hash
    string oauth_provider
    string oauth_id
    string status
    timestamp created_at
  }

  STUDENT_PROFILE {
    uuid id PK
    uuid parent_id FK
    int grade
    string status
    timestamp created_at
  }

  STUDENT_TRIAL_PROFILE {
    uuid id PK
    string anonymous_id
    string device_id
    int grade
    timestamp trial_started_at
    timestamp expires_at
  }

  LINK_TOKEN {
    uuid id PK
    string token
    uuid parent_id FK
    uuid student_id FK
    uuid trial_id FK
    timestamp expires_at
    timestamp used_at
  }

  SKILL {
    uuid id PK
    string code UK "Format: 6.1.1, 7.2.3"
    int grade
    string chapter
    string name
    json prerequisite_ids "Array of skill UUIDs"
  }

  OTP_SESSION {
    uuid id PK
    string phone_number
    uuid trial_id FK
    uuid parent_id FK
    string otp_code
    timestamp expires_at
    timestamp verified_at
    timestamp created_at
  }

  PRACTICE {
    uuid id PK
    uuid student_id
    uuid trial_id
    uuid skill_id FK
    uuid question_id FK "Required, links to Question (NOT NULL)"
    uuid session_id "Polymorphic relationship with sessions"
    string session_type "PRACTICE/PRACTICE_SESSION/MINI_TEST/etc."
    text student_answer "Response data (moved from Question)"
    boolean is_correct "Response data"
    int duration_sec "Response data"
    timestamp submitted_at "Response data (moved from Question)"
    timestamp created_at
  }

  EXERCISE {
    uuid id PK
    uuid skill_id FK
    int grade
    string problem_text
    jsonb solution_steps
    string review_status
    timestamp created_at
  }

  QUESTION {
    uuid id PK
    uuid exercise_id FK "References Exercise (template)"
    uuid skill_id FK
    uuid assigned_to_student_id FK
    text problem_text "Snapshot from Exercise"
    jsonb solution_steps "Snapshot from Exercise"
    string status "DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED"
    timestamp assigned_at
    timestamp created_at
    note "Response data (student_answer, is_correct, time_taken_sec, submitted_at) moved to Practice table"
    note "Session info (session_id) moved to Practice table (session_id + session_type)"
  }

  MINI_TEST_RESULT {
    uuid id PK
    uuid student_id FK
    int score
    json details
    timestamp created_at
  }
```

## 3. DDL – DATABASE SCHEMA (POSTGRESQL)3. DDL – DATABASE SCHEMA (POSTGRESQL)

### 3.1. parent_account
CREATE TABLE parent_account (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) UNIQUE,
  phone_verified BOOLEAN DEFAULT false,
  email VARCHAR(255) UNIQUE,
  password_hash TEXT,
  oauth_provider VARCHAR(20),
  oauth_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_auth_method CHECK (
    (password_hash IS NOT NULL) OR (oauth_provider IS NOT NULL)
  ),
  CONSTRAINT unique_oauth UNIQUE (oauth_provider, oauth_id) 
    WHERE oauth_provider IS NOT NULL
);

### 3.2. student_profile
CREATE TABLE student_profile (
  id UUID PRIMARY KEY,
  parent_id UUID NOT NULL,
  grade INT NOT NULL CHECK (grade IN (6, 7)),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_student_parent
    FOREIGN KEY (parent_id) REFERENCES parent_account(id)
);

### 3.3. student_trial_profile
CREATE TABLE student_trial_profile (
  id UUID PRIMARY KEY,
  anonymous_id VARCHAR(255) NOT NULL,
  device_id VARCHAR(255),
  grade INT NOT NULL CHECK (grade IN (6, 7)),
  trial_started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

### 3.4. link_token
CREATE TABLE link_token (
  id UUID PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  parent_id UUID,
  student_id UUID,
  trial_id UUID,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,

  CONSTRAINT fk_link_parent
    FOREIGN KEY (parent_id) REFERENCES parent_account(id),

  CONSTRAINT fk_link_student
    FOREIGN KEY (student_id) REFERENCES student_profile(id),

  CONSTRAINT fk_link_trial
    FOREIGN KEY (trial_id) REFERENCES student_trial_profile(id)
);

### 3.5. skill
CREATE TABLE skill (
  id UUID PRIMARY KEY,
  grade INT NOT NULL CHECK (grade IN (6, 7)),
  name VARCHAR(255) NOT NULL,
  prerequisite_ids JSON
);

### 3.6. practice
CREATE TABLE practice (
  id UUID PRIMARY KEY,
  student_id UUID,
  trial_id UUID,
  skill_id UUID NOT NULL,
  question_id UUID NOT NULL, -- Required, links to Question
  session_id UUID, -- Polymorphic relationship with sessions
  session_type VARCHAR(50), -- PRACTICE, PRACTICE_SESSION, MINI_TEST, etc.
  status VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED', -- NOT_STARTED, SUBMITTED, CANCELLED (Option E)
  student_answer TEXT, -- Response data (moved from Question)
  is_correct BOOLEAN NOT NULL,
  duration_sec INT,
  submitted_at TIMESTAMP, -- Response data (moved from Question)
  difficulty_level INT DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_practice_student
    FOREIGN KEY (student_id) REFERENCES student_profile(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_practice_trial
    FOREIGN KEY (trial_id) REFERENCES student_trial_profile(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_practice_skill
    FOREIGN KEY (skill_id) REFERENCES skill(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_practice_question
    FOREIGN KEY (question_id) REFERENCES question(id)
    ON DELETE RESTRICT, -- Changed from SET NULL to RESTRICT for data consistency

  CONSTRAINT check_practice_student_or_trial CHECK (
    (student_id IS NOT NULL AND trial_id IS NULL) OR
    (student_id IS NULL AND trial_id IS NOT NULL)
  ),
  
  CONSTRAINT check_practice_question_id CHECK (question_id IS NOT NULL),
  
  CONSTRAINT check_practice_session_type CHECK (
    session_type IN (
      'PRACTICE', 'PRACTICE_SESSION', 'MINI_TEST',
      'TEST_30MIN', 'TEST_45MIN', 'TEST_60MIN', 'TEST_90MIN', 'TEST_120MIN', 'TEST_180MIN',
      'MIDTERM_EXAM', 'FINAL_EXAM'
    )
  ),
  
  CONSTRAINT check_practice_session_consistency CHECK (
    (session_id IS NULL AND session_type IS NULL) OR
    (session_id IS NOT NULL AND session_type IS NOT NULL)
  ),
  
  CONSTRAINT check_practice_status CHECK (
    status IN ('NOT_STARTED', 'SUBMITTED', 'CANCELLED')
  )
);

CREATE INDEX idx_practice_student_id ON practice(student_id);
CREATE INDEX idx_practice_trial_id ON practice(trial_id);
CREATE INDEX idx_practice_skill_id ON practice(skill_id);
CREATE INDEX idx_practice_question_id ON practice(question_id);
CREATE INDEX idx_practice_session_id ON practice(session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_practice_session_type ON practice(session_type) WHERE session_type IS NOT NULL;
CREATE INDEX idx_practice_session_id_type ON practice(session_id, session_type) WHERE session_id IS NOT NULL AND session_type IS NOT NULL;
CREATE INDEX idx_practice_status ON practice(status);
CREATE INDEX idx_practice_session_status ON practice(session_id, session_type, status) WHERE session_id IS NOT NULL AND session_type IS NOT NULL;
CREATE INDEX idx_practice_created_at ON practice(created_at);
CREATE INDEX idx_practice_is_correct ON practice(is_correct);
CREATE INDEX idx_practice_submitted_at ON practice(submitted_at) WHERE submitted_at IS NOT NULL;

### 3.7. mini_test_result
CREATE TABLE mini_test_result (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL,
  score INT CHECK (score BETWEEN 0 AND 100),
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_test_student
    FOREIGN KEY (student_id) REFERENCES student_profile(id)
);

### 3.8. otp_session
CREATE TABLE otp_session (
  id UUID PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  trial_id UUID,
  parent_id UUID,
  otp_code VARCHAR(6),
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_otp_trial
    FOREIGN KEY (trial_id) REFERENCES student_trial_profile(id),

  CONSTRAINT fk_otp_parent
    FOREIGN KEY (parent_id) REFERENCES parent_account(id)
);

### 3.9. question
CREATE TABLE question (
  id UUID PRIMARY KEY, -- UUID v7 generated at Application layer
  exercise_id UUID NOT NULL, -- References exercise.id
  skill_id UUID NOT NULL, -- References skill.id
  assigned_to_student_id UUID, -- References student_profile.id (nullable for future use)
  
  -- Snapshot Exercise data tại thời điểm assign
  problem_text TEXT NOT NULL,
  problem_latex TEXT,
  problem_image_url TEXT,
  solution_steps JSONB NOT NULL,
  final_answer TEXT,
  common_mistakes JSONB,
  hints JSONB,
  difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 5),
  
  -- Customization (nếu có)
  customized_data JSONB, -- Lưu các thay đổi (số liệu mới, etc.)
  
  -- Assignment info
  assigned_at TIMESTAMP,
  
  -- Metadata
  question_type VARCHAR(50) CHECK (question_type IN ('PRACTICE', 'MINI_TEST', 'REVIEW')),
  status VARCHAR(50) DEFAULT 'ASSIGNED' CHECK (status IN ('DRAFT', 'ASSIGNED', 'SUBMITTED', 'RESUBMITTED', 'SKIPPED')),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_question_exercise 
    FOREIGN KEY (exercise_id) REFERENCES exercise(id)
    ON DELETE RESTRICT,
  
  CONSTRAINT fk_question_skill 
    FOREIGN KEY (skill_id) REFERENCES skill(id)
    ON DELETE RESTRICT,
  
  CONSTRAINT fk_question_student 
    FOREIGN KEY (assigned_to_student_id) REFERENCES student_profile(id)
    ON DELETE SET NULL
);

-- Note: Response data (student_answer, is_correct, time_taken_sec, submitted_at) 
--       đã được chuyển sang Practice table
-- Note: Session info (session_id) đã được chuyển sang Practice table (session_id + session_type)

CREATE INDEX idx_question_exercise_id ON question(exercise_id);
CREATE INDEX idx_question_skill_id ON question(skill_id);
CREATE INDEX idx_question_student_id ON question(assigned_to_student_id);
CREATE INDEX idx_question_status ON question(status);
CREATE INDEX idx_question_created_at ON question(created_at);

-- Note: Index idx_question_session_id đã được remove (Question không có session_id nữa)
--       Questions trong session được query qua Practice records (session_id + session_type)

### 3.10. refresh_token
CREATE TABLE refresh_token (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  token_hash VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP,

  CONSTRAINT fk_refresh_token_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_refresh_token_user_id ON refresh_token(user_id);
CREATE INDEX idx_refresh_token_token_hash ON refresh_token(token_hash);
CREATE INDEX idx_refresh_token_expires_at ON refresh_token(expires_at);
CREATE INDEX idx_refresh_token_revoked_at ON refresh_token(revoked_at);
CREATE INDEX idx_refresh_token_user_active ON refresh_token(user_id, revoked_at) WHERE revoked_at IS NULL;

## 4. QUYẾT ĐỊNH THIẾT KẾ QUAN TRỌNG

- Trial user và linked user dùng chung bảng practice

- Không duplicate dữ liệu khi chuyển trial → student

- ParentAccount là root entity

- **phone_number là username** cho đăng nhập (unique, có thể null nếu OAuth chưa verify)

- **phone_verified**: Bắt buộc true để truy cập dashboard (sau OAuth hoặc đăng ký)

- **OAuth**: Hỗ trợ Google và Apple, oauth_id unique theo provider

- **Email**: Optional, không bắt buộc

- **Password**: Có thể null nếu đăng nhập bằng OAuth (chưa set password)

- **Refresh Token**: 
  - Hỗ trợ multi-device: Mỗi user có thể có nhiều refresh tokens cùng lúc
  - Token được hash bằng SHA-256 trước khi lưu DB (token_hash)
  - Refresh token rotation: Mỗi lần refresh tạo token mới, revoke token cũ
  - Hết hạn sau 30 ngày, có thể revoke sớm khi logout
  - Scheduled task cleanup expired tokens hàng ngày

- JSON được dùng cho:

    - prerequisite_ids

    - mini test details

    - question solution_steps, common_mistakes, hints, customized_data

- **Question Management**:
  - Question table lưu snapshot Exercise data tại thời điểm assign
  - Question KHÔNG có response data (student_answer, is_correct, time_taken_sec, submitted_at) - đã chuyển sang Practice
  - Question KHÔNG có session_id - được quản lý qua Practice records (session_id + session_type)
  - Practice table có `question_id` (required, NOT NULL) để link với Question
  - Practice table có `session_id` + `session_type` để link với sessions (polymorphic relationship)
  - Practice table có `status` (NOT_STARTED, SUBMITTED, CANCELLED) - Option E implementation
  - Practice table lưu response data: student_answer, is_correct, duration_sec, submitted_at
  - **Option E**: Practice records được tạo ngay khi generate questions cho session (status = NOT_STARTED)
  - Khi submit answer, Practice record được update (NOT_STARTED → SUBMITTED) thay vì tạo mới
  - Foreign key `practice.question_id` → `question.id` với ON DELETE RESTRICT (data consistency)
  - Question status: ASSIGNED → SUBMITTED (first practice) → RESUBMITTED (re-attempt)
  - Một Question có thể có nhiều Practice records (re-attempt logic)

- DDL tối ưu cho Phase 1, dễ migrate Phase 2

## Tài liệu liên quan

- [System Architecture](./system-architecture.md)
- [Chapter-Skill ERD](./chapter-skill-erd.md)
- [Flyway Migration Notes](./flyway-migration-notes.md)
- [Chapter Domain Model](../02-domain-model/chapter.md)
- [Skill Domain Model](../02-domain-model/skill.md)

## 6. LỊCH SỬ THAY ĐỔI

- 2025-12-15-02-05: Tạo mới ERD & DDL cho Phase 1
- 2025-12-15-XX-XX: Cập nhật parent_account với phone_number, phone_verified, oauth fields, name. Thêm otp_session table
- 2025-12-21-16-45: Thêm Question table và cập nhật Practice table với question_id (nullable) để link với Question
- 2025-12-26: Refactor Question-Practice-Session model:
  - Question: Remove session_id, response data (student_answer, is_correct, time_taken_sec, submitted_at)
  - Question status: DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED (thay vì COMPLETED)
  - Practice: question_id required (NOT NULL), add session_id + session_type (polymorphic), add response data fields
- 2025-12-21: Option E Implementation - Practice Status:
  - Add `status` column to Practice table (NOT_STARTED, SUBMITTED, CANCELLED)
  - Practice records created immediately when generating questions for sessions (status = NOT_STARTED)
  - Practice records updated (NOT_STARTED → SUBMITTED) when submitting answers
  - Session cancellation marks Practice records as CANCELLED
  - Practice: Support 1:N relationship với Question (re-attempt logic)



---

---

← Quay lại: [README.md](../README.md)