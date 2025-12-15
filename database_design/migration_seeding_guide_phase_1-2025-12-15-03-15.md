# DATABASE MIGRATION & SEEDING GUIDE – PHASE 1 (MVP)

**Project:** Tutor  
**Document type:** Database Design  
**Audience:** Backend Developer / DevOps  
**Status:** Draft  
**Version:** 2025-12-15-03-15  
**Author:** Product Consultant (ChatGPT)


---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này hướng dẫn **migration và seeding database** cho dự án Tutor – Phase 1, bao gồm:
- Migration strategy (Flyway/Liquibase)
- Initial schema migration
- Seed data cho Skills, Admin accounts, Test data
- Rollback procedures

Tài liệu này đảm bảo database được setup đúng từ đầu và có thể reproduce được.

---


## 2. MIGRATION STRATEGY

### 2.1. Tool Selection

**Flyway** (Recommended cho Spring Boot)
- Tích hợp tốt với Spring Boot
- Version control cho migrations
- SQL-based migrations
- Hỗ trợ rollback (với Flyway Teams)

**Alternative: Liquibase**
- XML/YAML-based migrations
- Hỗ trợ rollback tốt hơn
- Phức tạp hơn cho MVP

### 2.2. Migration Naming Convention

```
V{version}__{description}.sql

Examples:
V1__Initial_schema.sql
V2__Add_skill_mastery_table.sql
V3__Add_indexes.sql
```

### 2.3. Migration Structure

```
src/main/resources/db/migration/
├── V1__Initial_schema.sql
├── V2__Add_skill_mastery.sql
├── V3__Add_indexes.sql
└── R__Seed_skills.sql (Repeatable migration)
```

---


## 3. INITIAL SCHEMA MIGRATION

### 3.1. Migration File: V1__Initial_schema.sql

```sql
-- ============================================
-- Initial Schema for Tutor MVP Phase 1
-- Version: 1.0
-- Date: 2025-12-15
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PARENT_ACCOUNT
-- ============================================
CREATE TABLE parent_account (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) UNIQUE,
  phone_verified BOOLEAN DEFAULT false,
  email VARCHAR(255) UNIQUE,
  password_hash TEXT,
  oauth_provider VARCHAR(20),
  oauth_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending_activation')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_auth_method CHECK (
    (password_hash IS NOT NULL) OR (oauth_provider IS NOT NULL)
  ),
  CONSTRAINT unique_oauth UNIQUE (oauth_provider, oauth_id) 
    WHERE oauth_provider IS NOT NULL
);

CREATE INDEX idx_parent_account_phone ON parent_account(phone_number);
CREATE INDEX idx_parent_account_phone_verified ON parent_account(phone_verified);
CREATE INDEX idx_parent_account_email ON parent_account(email);
CREATE INDEX idx_parent_account_status ON parent_account(status);
CREATE INDEX idx_parent_account_oauth ON parent_account(oauth_provider, oauth_id) WHERE oauth_provider IS NOT NULL;

-- ============================================
-- STUDENT_PROFILE
-- ============================================
CREATE TABLE student_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL,
  grade INT NOT NULL CHECK (grade IN (6, 7)),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'linked')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_student_parent
    FOREIGN KEY (parent_id) REFERENCES parent_account(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_student_profile_parent_id ON student_profile(parent_id);
CREATE INDEX idx_student_profile_grade ON student_profile(grade);
CREATE INDEX idx_student_profile_status ON student_profile(status);

-- ============================================
-- STUDENT_TRIAL_PROFILE
-- ============================================
CREATE TABLE student_trial_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  anonymous_id VARCHAR(255) NOT NULL,
  device_id VARCHAR(255),
  grade INT NOT NULL CHECK (grade IN (6, 7)),
  trial_started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_trial_anonymous_id ON student_trial_profile(anonymous_id);
CREATE INDEX idx_trial_device_id ON student_trial_profile(device_id);
CREATE INDEX idx_trial_expires_at ON student_trial_profile(expires_at);

-- ============================================
-- LINK_TOKEN
-- ============================================
CREATE TABLE link_token (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token VARCHAR(255) UNIQUE NOT NULL,
  parent_id UUID,
  student_id UUID,
  trial_id UUID,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_link_parent
    FOREIGN KEY (parent_id) REFERENCES parent_account(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_link_student
    FOREIGN KEY (student_id) REFERENCES student_profile(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_link_trial
    FOREIGN KEY (trial_id) REFERENCES student_trial_profile(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_link_token_token ON link_token(token);
CREATE INDEX idx_link_token_expires_at ON link_token(expires_at);
CREATE INDEX idx_link_token_used_at ON link_token(used_at);

-- ============================================
-- SKILL
-- ============================================
CREATE TABLE skill (
  id VARCHAR(50) PRIMARY KEY, -- Format: 6.1.1, 7.2.3
  grade INT NOT NULL CHECK (grade IN (6, 7)),
  chapter VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  prerequisite_ids JSON, -- Array of skill IDs
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_skill_grade ON skill(grade);
CREATE INDEX idx_skill_chapter ON skill(chapter);

-- ============================================
-- SKILL_MASTERY
-- ============================================
CREATE TABLE skill_mastery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  trial_id UUID,
  skill_id VARCHAR(50) NOT NULL,
  mastery_level INT DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 100),
  last_practiced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_mastery_student
    FOREIGN KEY (student_id) REFERENCES student_profile(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_mastery_trial
    FOREIGN KEY (trial_id) REFERENCES student_trial_profile(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_mastery_skill
    FOREIGN KEY (skill_id) REFERENCES skill(id)
    ON DELETE CASCADE,
  
  -- Ensure one mastery record per student/skill combination
  CONSTRAINT unique_student_skill UNIQUE (student_id, skill_id),
  CONSTRAINT unique_trial_skill UNIQUE (trial_id, skill_id),
  CONSTRAINT check_student_or_trial CHECK (
    (student_id IS NOT NULL AND trial_id IS NULL) OR
    (student_id IS NULL AND trial_id IS NOT NULL)
  )
);

CREATE INDEX idx_mastery_student_id ON skill_mastery(student_id);
CREATE INDEX idx_mastery_trial_id ON skill_mastery(trial_id);
CREATE INDEX idx_mastery_skill_id ON skill_mastery(skill_id);
CREATE INDEX idx_mastery_level ON skill_mastery(mastery_level);

-- ============================================
-- PRACTICE
-- ============================================
CREATE TABLE practice (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  trial_id UUID,
  skill_id VARCHAR(50) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  duration_sec INT,
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
  
  CONSTRAINT check_practice_student_or_trial CHECK (
    (student_id IS NOT NULL AND trial_id IS NULL) OR
    (student_id IS NULL AND trial_id IS NOT NULL)
  )
);

CREATE INDEX idx_practice_student_id ON practice(student_id);
CREATE INDEX idx_practice_trial_id ON practice(trial_id);
CREATE INDEX idx_practice_skill_id ON practice(skill_id);
CREATE INDEX idx_practice_created_at ON practice(created_at);
CREATE INDEX idx_practice_is_correct ON practice(is_correct);

-- ============================================
-- MINI_TEST_RESULT
-- ============================================
CREATE TABLE mini_test_result (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL,
  skill_id VARCHAR(50) NOT NULL,
  score INT CHECK (score BETWEEN 0 AND 100),
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  details JSON, -- Skill-level breakdown
  time_taken_sec INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_test_student
    FOREIGN KEY (student_id) REFERENCES student_profile(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_test_skill
    FOREIGN KEY (skill_id) REFERENCES skill(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_test_student_id ON mini_test_result(student_id);
CREATE INDEX idx_test_skill_id ON mini_test_result(skill_id);
CREATE INDEX idx_test_created_at ON mini_test_result(created_at);

-- ============================================
-- SOLVE_HISTORY (Tutor Mode)
-- ============================================
CREATE TABLE solve_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  trial_id UUID,
  problem_text TEXT,
  problem_image_url TEXT,
  solution_steps JSON, -- Step-by-step solution
  skill_ids JSON, -- Related skills
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_solve_student
    FOREIGN KEY (student_id) REFERENCES student_profile(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_solve_trial
    FOREIGN KEY (trial_id) REFERENCES student_trial_profile(id)
    ON DELETE CASCADE,
  
  CONSTRAINT check_solve_student_or_trial CHECK (
    (student_id IS NOT NULL AND trial_id IS NULL) OR
    (student_id IS NULL AND trial_id IS NOT NULL)
  )
);

CREATE INDEX idx_solve_student_id ON solve_history(student_id);
CREATE INDEX idx_solve_trial_id ON solve_history(trial_id);
CREATE INDEX idx_solve_created_at ON solve_history(created_at);

-- ============================================
-- OTP_SESSION
-- ============================================
CREATE TABLE otp_session (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number VARCHAR(20) NOT NULL,
  trial_id UUID,
  parent_id UUID,
  otp_code VARCHAR(6),
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_otp_trial
    FOREIGN KEY (trial_id) REFERENCES student_trial_profile(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_otp_parent
    FOREIGN KEY (parent_id) REFERENCES parent_account(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_otp_session_phone ON otp_session(phone_number);
CREATE INDEX idx_otp_session_expires_at ON otp_session(expires_at);
CREATE INDEX idx_otp_session_trial_id ON otp_session(trial_id);
CREATE INDEX idx_otp_session_parent_id ON otp_session(parent_id);
```

---

## 4. SEED DATA – SKILLS

### 4.1. Repeatable Migration: R__Seed_skills.sql

```sql
-- ============================================
-- Seed Skills for Grade 6 & 7
-- Repeatable migration - runs every time if checksum changes
-- ============================================

-- Grade 6 Skills

-- Chương: Số tự nhiên
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('6.1.1', 6, 'Số tự nhiên', 'Đọc và viết số tự nhiên', '[]'::json),
('6.1.2', 6, 'Số tự nhiên', 'So sánh số tự nhiên', '["6.1.1"]'::json),
('6.1.3', 6, 'Số tự nhiên', 'Cộng trừ số tự nhiên', '["6.1.1"]'::json),
('6.1.4', 6, 'Số tự nhiên', 'Nhân chia số tự nhiên', '["6.1.3"]'::json),
('6.1.5', 6, 'Số tự nhiên', 'Tính chất giao hoán, kết hợp', '["6.1.3", "6.1.4"]'::json),
('6.1.6', 6, 'Số tự nhiên', 'Thứ tự thực hiện phép tính', '["6.1.3", "6.1.4"]'::json),
('6.1.7', 6, 'Số tự nhiên', 'Lũy thừa với số mũ tự nhiên', '["6.1.4"]'::json),
('6.1.8', 6, 'Số tự nhiên', 'Tính giá trị biểu thức có lũy thừa', '["6.1.6", "6.1.7"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Số nguyên
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('6.2.1', 6, 'Số nguyên', 'Nhận biết số nguyên', '["6.1.1"]'::json),
('6.2.2', 6, 'Số nguyên', 'So sánh số nguyên', '["6.2.1"]'::json),
('6.2.3', 6, 'Số nguyên', 'Cộng trừ số nguyên', '["6.2.1"]'::json),
('6.2.4', 6, 'Số nguyên', 'Nhân chia số nguyên', '["6.2.3"]'::json),
('6.2.5', 6, 'Số nguyên', 'Tính giá trị biểu thức số nguyên', '["6.2.3", "6.2.4"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Phân số
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('6.3.1', 6, 'Phân số', 'Nhận biết phân số', '["6.1.4"]'::json),
('6.3.2', 6, 'Phân số', 'So sánh phân số cùng mẫu', '["6.3.1"]'::json),
('6.3.3', 6, 'Phân số', 'So sánh phân số khác mẫu', '["6.3.1"]'::json),
('6.3.4', 6, 'Phân số', 'Quy đồng mẫu số', '["6.3.1"]'::json),
('6.3.5', 6, 'Phân số', 'Cộng trừ phân số cùng mẫu', '["6.3.1"]'::json),
('6.3.6', 6, 'Phân số', 'Cộng trừ phân số khác mẫu', '["6.3.4", "6.3.5"]'::json),
('6.3.7', 6, 'Phân số', 'Nhân phân số', '["6.3.1"]'::json),
('6.3.8', 6, 'Phân số', 'Chia phân số', '["6.3.7"]'::json),
('6.3.9', 6, 'Phân số', 'Rút gọn phân số', '["6.1.4", "6.3.1"]'::json),
('6.3.10', 6, 'Phân số', 'Hỗn số', '["6.3.1"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Số thập phân
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('6.4.1', 6, 'Số thập phân', 'Đọc và viết số thập phân', '["6.1.1"]'::json),
('6.4.2', 6, 'Số thập phân', 'So sánh số thập phân', '["6.4.1"]'::json),
('6.4.3', 6, 'Số thập phân', 'Cộng trừ số thập phân', '["6.4.1"]'::json),
('6.4.4', 6, 'Số thập phân', 'Nhân số thập phân', '["6.4.1"]'::json),
('6.4.5', 6, 'Số thập phân', 'Chia số thập phân', '["6.4.1", "6.4.4"]'::json),
('6.4.6', 6, 'Số thập phân', 'Chuyển đổi phân số và số thập phân', '["6.3.1", "6.4.1"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Tỉ số và tỉ số phần trăm
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('6.5.1', 6, 'Tỉ số và tỉ số phần trăm', 'Nhận biết tỉ số', '["6.3.1"]'::json),
('6.5.2', 6, 'Tỉ số và tỉ số phần trăm', 'Tỉ số phần trăm', '["6.5.1"]'::json),
('6.5.3', 6, 'Tỉ số và tỉ số phần trăm', 'Tính tỉ số phần trăm của một số', '["6.5.2"]'::json),
('6.5.4', 6, 'Tỉ số và tỉ số phần trăm', 'Tìm một số khi biết tỉ số phần trăm', '["6.5.3"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Hình học cơ bản
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('6.6.1', 6, 'Hình học cơ bản', 'Điểm, đường thẳng, đoạn thẳng', '[]'::json),
('6.6.2', 6, 'Hình học cơ bản', 'Góc và số đo góc', '["6.6.1"]'::json),
('6.6.3', 6, 'Hình học cơ bản', 'Tam giác', '["6.6.1", "6.6.2"]'::json),
('6.6.4', 6, 'Hình học cơ bản', 'Tính chu vi tam giác', '["6.6.3"]'::json),
('6.6.5', 6, 'Hình học cơ bản', 'Tính diện tích tam giác', '["6.6.3"]'::json),
('6.6.6', 6, 'Hình học cơ bản', 'Hình chữ nhật', '["6.6.1", "6.6.2"]'::json),
('6.6.7', 6, 'Hình học cơ bản', 'Tính chu vi và diện tích hình chữ nhật', '["6.6.6"]'::json),
('6.6.8', 6, 'Hình học cơ bản', 'Hình vuông', '["6.6.6"]'::json),
('6.6.9', 6, 'Hình học cơ bản', 'Tính chu vi và diện tích hình vuông', '["6.6.8"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Grade 7 Skills

-- Chương: Số hữu tỉ
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('7.1.1', 7, 'Số hữu tỉ', 'Nhận biết số hữu tỉ', '["6.3.1"]'::json),
('7.1.2', 7, 'Số hữu tỉ', 'So sánh số hữu tỉ', '["7.1.1"]'::json),
('7.1.3', 7, 'Số hữu tỉ', 'Cộng trừ số hữu tỉ', '["7.1.1"]'::json),
('7.1.4', 7, 'Số hữu tỉ', 'Nhân chia số hữu tỉ', '["7.1.3"]'::json),
('7.1.5', 7, 'Số hữu tỉ', 'Lũy thừa số hữu tỉ', '["7.1.4", "6.1.7"]'::json),
('7.1.6', 7, 'Số hữu tỉ', 'Tính giá trị biểu thức số hữu tỉ', '["7.1.3", "7.1.4"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Số thực
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('7.2.1', 7, 'Số thực', 'Nhận biết số thực', '["7.1.1", "6.4.1"]'::json),
('7.2.2', 7, 'Số thực', 'Căn bậc hai', '["7.2.1"]'::json),
('7.2.3', 7, 'Số thực', 'Tính căn bậc hai', '["7.2.2"]'::json),
('7.2.4', 7, 'Số thực', 'So sánh số thực', '["7.2.1"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Đại lượng tỉ lệ
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('7.3.1', 7, 'Đại lượng tỉ lệ', 'Đại lượng tỉ lệ thuận', '["6.5.1"]'::json),
('7.3.2', 7, 'Đại lượng tỉ lệ', 'Giải bài toán tỉ lệ thuận', '["7.3.1"]'::json),
('7.3.3', 7, 'Đại lượng tỉ lệ', 'Đại lượng tỉ lệ nghịch', '["6.5.1"]'::json),
('7.3.4', 7, 'Đại lượng tỉ lệ', 'Giải bài toán tỉ lệ nghịch', '["7.3.3"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Biểu thức đại số
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('7.4.1', 7, 'Biểu thức đại số', 'Nhận biết biểu thức đại số', '["7.1.1"]'::json),
('7.4.2', 7, 'Biểu thức đại số', 'Giá trị của biểu thức đại số', '["7.4.1"]'::json),
('7.4.3', 7, 'Biểu thức đại số', 'Đơn thức', '["7.4.1"]'::json),
('7.4.4', 7, 'Biểu thức đại số', 'Đơn thức đồng dạng', '["7.4.3"]'::json),
('7.4.5', 7, 'Biểu thức đại số', 'Cộng trừ đơn thức đồng dạng', '["7.4.4"]'::json),
('7.4.6', 7, 'Biểu thức đại số', 'Đa thức', '["7.4.3"]'::json),
('7.4.7', 7, 'Biểu thức đại số', 'Cộng trừ đa thức', '["7.4.6"]'::json),
('7.4.8', 7, 'Biểu thức đại số', 'Nhân đơn thức với đa thức', '["7.4.3", "7.4.6"]'::json),
('7.4.9', 7, 'Biểu thức đại số', 'Nhân đa thức với đa thức', '["7.4.8"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Hình học
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('7.5.1', 7, 'Hình học', 'Hai góc đối đỉnh', '["6.6.2"]'::json),
('7.5.2', 7, 'Hình học', 'Hai đường thẳng vuông góc', '["7.5.1"]'::json),
('7.5.3', 7, 'Hình học', 'Đường trung trực', '["7.5.2"]'::json),
('7.5.4', 7, 'Hình học', 'Hai đường thẳng song song', '["7.5.1"]'::json),
('7.5.5', 7, 'Hình học', 'Tiên đề Euclid', '["7.5.4"]'::json),
('7.5.6', 7, 'Hình học', 'Tính chất hai đường thẳng song song', '["7.5.4"]'::json),
('7.5.7', 7, 'Hình học', 'Tam giác cân', '["6.6.3"]'::json),
('7.5.8', 7, 'Hình học', 'Tam giác đều', '["7.5.7"]'::json),
('7.5.9', 7, 'Hình học', 'Định lý Pythagore', '["6.6.3"]'::json),
('7.5.10', 7, 'Hình học', 'Tính diện tích tam giác vuông', '["7.5.9"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;

-- Chương: Thống kê
INSERT INTO skill (id, grade, chapter, name, prerequisite_ids) VALUES
('7.6.1', 7, 'Thống kê', 'Thu thập và biểu diễn dữ liệu', '[]'::json),
('7.6.2', 7, 'Thống kê', 'Tính số trung bình cộng', '["6.1.3", "6.1.4"]'::json),
('7.6.3', 7, 'Thống kê', 'Tìm mốt của dấu hiệu', '["7.6.1"]'::json),
('7.6.4', 7, 'Thống kê', 'Vẽ biểu đồ', '["7.6.1"]'::json)
ON CONFLICT (id) DO UPDATE SET
  grade = EXCLUDED.grade,
  chapter = EXCLUDED.chapter,
  name = EXCLUDED.name,
  prerequisite_ids = EXCLUDED.prerequisite_ids,
  updated_at = CURRENT_TIMESTAMP;
```

---

## 5. SEED DATA – TEST DATA (OPTIONAL)

### 5.1. Test Admin Account

```sql
-- V2__Seed_test_data.sql (Optional - chỉ dùng cho development)

-- Test Parent Account
INSERT INTO parent_account (id, name, phone_number, phone_verified, email, password_hash, status) VALUES
('00000000-0000-0000-0000-000000000001', 'Test Parent', '0912345678', true, 'test@parent.com', '$2a$10$...', 'active')
ON CONFLICT (id) DO NOTHING;

-- Test Student Profile
INSERT INTO student_profile (id, parent_id, grade, status) VALUES
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 6, 'linked')
ON CONFLICT (id) DO NOTHING;
```

---

## 6. FLYWAY CONFIGURATION

### 6.1. Spring Boot Application Properties

```properties
# application.properties hoặc application.yml

# Flyway Configuration
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
spring.flyway.validate-on-migrate=true
spring.flyway.clean-disabled=true

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/tutor_db
spring.datasource.username=tutor
spring.datasource.password=tutor123
spring.datasource.driver-class-name=org.postgresql.Driver
```

### 6.2. Maven Dependency

```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
    <version>10.0.0</version>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-database-postgresql</artifactId>
    <version>10.0.0</version>
</dependency>
```

---

## 7. MIGRATION COMMANDS

### 7.1. Run Migrations

```bash
# Automatic (Spring Boot sẽ chạy khi start)
mvn spring-boot:run

# Manual với Flyway CLI
flyway migrate

# Check migration status
flyway info

# Validate migrations
flyway validate
```

### 7.2. Create New Migration

```bash
# Tạo file migration mới
touch src/main/resources/db/migration/V3__Add_new_feature.sql
```

---

## 8. ROLLBACK PROCEDURES

### 8.1. Flyway Rollback (Community Edition)

Flyway Community Edition **không hỗ trợ rollback tự động**. Cần tạo migration mới để revert:

```sql
-- V4__Revert_V3_changes.sql
-- Manually revert changes from V3
```

### 8.2. Manual Rollback

```sql
-- 1. Backup database
pg_dump tutor_db > backup_$(date +%Y%m%d).sql

-- 2. Manually revert changes
-- 3. Update Flyway schema history table if needed
```

### 8.3. Database Restore

```bash
# Restore from backup
psql tutor_db < backup_20251215.sql
```

---

## 9. VERIFICATION

### 9.1. Check Migrations Applied

```sql
SELECT * FROM flyway_schema_history ORDER BY installed_rank;
```

### 9.2. Verify Skills Seeded

```sql
SELECT COUNT(*) FROM skill;
-- Should return ~60-80 skills

SELECT grade, COUNT(*) FROM skill GROUP BY grade;
-- Should show skills for grade 6 and 7
```

### 9.3. Verify Prerequisites

```sql
-- Check skills with prerequisites
SELECT id, name, prerequisite_ids 
FROM skill 
WHERE prerequisite_ids != '[]'::json;
```

---

## 10. TÀI LIỆU LIÊN QUAN

- [Database ERD & DDL](./database_erd_ddl_phase_1-2025-12-15-02-05.md)
- [Skill Graph](../../learning/skill_graph/skill-graph-math-grade-6-7_phase_1-2025-12-15-02-30.md)
- [Development Setup Guide](../technical_design/development_setup_phase_1-2025-12-15-03-00.md)

---

## 11. GHI CHÚ / TODO

- [ ] Tạo script seed data từ JSON file
- [ ] Add data validation scripts
- [ ] Document backup/restore procedures
- [ ] Add migration testing procedures

---

## 12. LỊCH SỬ THAY ĐỔI

- 2025-12-15-03-15: Tạo mới Database Migration & Seeding Guide
- 2025-12-15-XX-XX: Cập nhật parent_account với phone_number (username), phone_verified, oauth fields, name. Email optional. Thêm otp_session table



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)