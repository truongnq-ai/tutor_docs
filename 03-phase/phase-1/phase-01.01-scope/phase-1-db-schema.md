DB SCHEMA – PHASE 1
Project: Gia sư Toán AI
Applies to: Phase 1 – Core Personal Learning System
Status: DESIGN ONLY – IMPLEMENT AFTER APPROVAL
Purpose: Define minimal database schema aligned with Phase 1 backend skeleton

==================================================
1. DESIGN RULES
==================================================

- Schema này CHỈ phục vụ Phase 1
- Kế thừa từ codebase hiện tại, loại bỏ phần không cần
- Không có field cho Trial / License / OAuth
- Giữ lại field có thể dùng cho tương lai (không quá dư thừa)
- Không có soft delete

==================================================
2. USER
==================================================

TABLE: users

- id (UUID, PK)
- username (VARCHAR(255), UNIQUE, NOT NULL)
- password_hash (TEXT, NOT NULL)
- email (VARCHAR(255), UNIQUE, NULL)  // Optional, chủ yếu cho ADMIN
- phone_number (VARCHAR(20), UNIQUE, NULL)  // Optional, chủ yếu cho PARENT
- user_type (VARCHAR(20), NOT NULL)  // ADMIN | PARENT | STUDENT
- status (VARCHAR(20), NOT NULL, DEFAULT 'ACTIVE')  // ACTIVE | INACTIVE | LOCKED
- name (VARCHAR(255), NULL)  // Display name
- last_login_at (TIMESTAMP, NULL)  // Track last login
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- CHECK (user_type IN ('ADMIN', 'PARENT', 'STUDENT'))
- CHECK (status IN ('ACTIVE', 'INACTIVE', 'LOCKED'))
- CHECK (password_hash IS NOT NULL)  // Phase 1 chỉ dùng password, không OAuth
- CHECK (
  (user_type = 'ADMIN' AND username IS NOT NULL AND email IS NOT NULL) OR
  (user_type = 'PARENT' AND username IS NOT NULL) OR
  (user_type = 'STUDENT' AND username IS NOT NULL)
)

Indexes:
- idx_users_username ON users(username)
- idx_users_email ON users(email) WHERE email IS NOT NULL
- idx_users_phone_number ON users(phone_number) WHERE phone_number IS NOT NULL
- idx_users_user_type ON users(user_type)
- idx_users_status ON users(status)

Notes:
- Super admin đầu tiên: seed data
- Admin khác: tạo bởi admin trên web
- Parent/Student: tạo bởi admin trên web
- Username: alphanumeric, case-insensitive, unique
- Password: BCrypt hash
- Không OAuth (loại bỏ oauth_provider, oauth_id)
- Không phone_verified, email_verified (không cần cho Phase 1)

==================================================
3. PARENT_ACCOUNT (Profile Table)
==================================================

TABLE: parent_account

- id (UUID, PK)
- user_id (UUID, UNIQUE, NOT NULL, FK -> users.id)
- name (VARCHAR(255), NOT NULL)
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- UNIQUE (user_id)
- user_id MUST reference user_type = 'PARENT'

Indexes:
- idx_parent_account_user_id ON parent_account(user_id)

Notes:
- One-to-one với users
- Loại bỏ phone_verified (không cần cho Phase 1)

==================================================
4. ADMIN_PROFILE (Profile Table)
==================================================

TABLE: admin_profile

- id (UUID, PK)
- user_id (UUID, UNIQUE, NOT NULL, FK -> users.id)
- name (VARCHAR(255), NOT NULL)
- department (VARCHAR(100), NULL)  // Optional
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- UNIQUE (user_id)
- user_id MUST reference user_type = 'ADMIN'

Indexes:
- idx_admin_profile_user_id ON admin_profile(user_id)

==================================================
5. STUDENT_PROFILE (Profile Table)
==================================================

TABLE: student_profile

- id (UUID, PK)
- user_id (UUID, UNIQUE, NOT NULL, FK -> users.id)
- parent_id (UUID, NOT NULL, FK -> parent_account.id)
- grade (INT, NOT NULL)  // 6 or 7
- status (VARCHAR(20), NOT NULL, DEFAULT 'PENDING')  // PENDING | LINKED
- avatar_url (VARCHAR(500), NULL)  // Optional
- learning_goals (JSON, NULL)  // Optional, có thể dùng cho tương lai
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- CHECK (grade IN (6, 7))
- CHECK (status IN ('PENDING', 'LINKED'))
- UNIQUE (user_id)
- user_id MUST reference user_type = 'STUDENT'

Indexes:
- idx_student_profile_user_id ON student_profile(user_id)
- idx_student_profile_parent_id ON student_profile(parent_id)
- idx_student_profile_grade ON student_profile(grade)
- idx_student_profile_status ON student_profile(status)

Notes:
- Phase 1: user_id luôn NOT NULL (không có trial)
- Parent-Student relationship: qua parent_id

==================================================
6. CHAPTER
==================================================

TABLE: chapter

- id (UUID, PK)
- grade (INT, NOT NULL)  // 6 or 7
- code (TEXT, UNIQUE, NOT NULL)  // Format: "6.3", unique toàn hệ thống
- name (TEXT, NOT NULL)  // "Phân số", có thể trùng giữa các grade
- description (TEXT, NULL)  // Optional
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- CHECK (grade IN (6, 7))
- UNIQUE (grade, name)  // Unique per grade

Indexes:
- idx_chapter_grade ON chapter(grade)
- idx_chapter_code ON chapter(code)
- idx_chapter_grade_name ON chapter(grade, name)

Notes:
- Kế thừa từ codebase hiện tại
- Loại bỏ mini_test config fields (không cần cho Phase 1)

==================================================
7. CHAPTER_ASSIGNMENT
==================================================

TABLE: chapter_assignments

- id (UUID, PK)
- chapter_id (UUID, NOT NULL, FK -> chapter.id)
- student_id (UUID, NOT NULL, FK -> student_profile.id)
- assigned_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- UNIQUE (chapter_id, student_id)
- student_id MUST reference student_profile (không phải users)

Indexes:
- idx_chapter_assignments_chapter_id ON chapter_assignments(chapter_id)
- idx_chapter_assignments_student_id ON chapter_assignments(student_id)
- idx_chapter_assignments_student_chapter ON chapter_assignments(student_id, chapter_id)

Notes:
- Mới thêm cho Phase 1
- Admin/Parent gán chapter cho student

==================================================
8. SKILL
==================================================

TABLE: skill

- id (UUID, PK)
- code (VARCHAR(50), UNIQUE, NOT NULL)  // Format: 6.1.1, 7.2.3
- grade (INT, NOT NULL)  // 6 or 7
- chapter_id (UUID, NOT NULL, FK -> chapter.id)
- name (VARCHAR(255), NOT NULL)
- description (TEXT, NULL)  // Optional, cho AI context
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- CHECK (grade IN (6, 7))

Indexes:
- idx_skill_code ON skill(code)
- idx_skill_grade ON skill(grade)
- idx_skill_chapter_id ON skill(chapter_id)

Notes:
- Kế thừa từ codebase hiện tại
- Loại bỏ prerequisite_ids (JSON) - sẽ tách bảng riêng

==================================================
9. SKILL_PREREQUISITE (Tách bảng riêng)
==================================================

TABLE: skill_prerequisites

- id (UUID, PK)
- skill_id (UUID, NOT NULL, FK -> skills.id)
- prerequisite_skill_id (UUID, NOT NULL, FK -> skills.id)
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- skill_id != prerequisite_skill_id
- UNIQUE (skill_id, prerequisite_skill_id)
- CHECK (skill_id != prerequisite_skill_id)  // Prevent self-reference

Indexes:
- idx_skill_prerequisites_skill_id ON skill_prerequisites(skill_id)
- idx_skill_prerequisites_prerequisite_id ON skill_prerequisites(prerequisite_skill_id)
- idx_skill_prerequisites_both ON skill_prerequisites(skill_id, prerequisite_skill_id)

Notes:
- Tách từ JSON prerequisite_ids sang bảng riêng
- Dễ query và maintain hơn
- Hỗ trợ nhiều prerequisite cho 1 skill

==================================================
10. SKILL_COMPLETION (Boolean, thay skill_mastery)
==================================================

TABLE: skill_completions

- id (UUID, PK)
- skill_id (UUID, NOT NULL, FK -> skills.id)
- student_id (UUID, NOT NULL, FK -> student_profile.id)
- completed (BOOLEAN, NOT NULL, DEFAULT false)
- completed_at (TIMESTAMP, NULL)  // NULL nếu chưa completed
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- UNIQUE (skill_id, student_id)
- completed_at IS NOT NULL WHEN completed = true

Indexes:
- idx_skill_completions_skill_id ON skill_completions(skill_id)
- idx_skill_completions_student_id ON skill_completions(student_id)
- idx_skill_completions_completed ON skill_completions(completed)
- idx_skill_completions_student_skill ON skill_completions(student_id, skill_id)

Notes:
- Thay thế skill_mastery (loại bỏ mastery_level 0-100)
- Phase 1 chỉ cần boolean completion
- Loại bỏ trial_id (không có trial trong Phase 1)

==================================================
11. EXERCISE (Template)
==================================================

TABLE: exercise

- id (UUID, PK)
- skill_id (UUID, NOT NULL, FK -> skills.id)
- grade (INT, NOT NULL)  // 6 or 7
- chapter_id (UUID, NOT NULL, FK -> chapter.id)
- problem_text (TEXT, NOT NULL)
- problem_latex (TEXT, NULL)
- problem_image_url (TEXT, NULL)
- solution_steps (JSONB, NOT NULL)  // Array of SolutionStep
- final_answer (TEXT, NULL)
- difficulty_level (INT, NULL)  // 1-5, optional
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- CHECK (grade IN (6, 7))
- CHECK (difficulty_level IS NULL OR difficulty_level BETWEEN 1 AND 5)

Indexes:
- idx_exercise_skill_id ON exercise(skill_id)
- idx_exercise_chapter_id ON exercise(chapter_id)
- idx_exercise_grade ON exercise(grade)

Notes:
- Giữ lại core fields cần thiết
- Loại bỏ: review_status, quality_score, usage_count, bloom_taxonomy_level, etc. (không cần cho Phase 1)
- Giữ lại: problem_text, solution_steps, final_answer (cần cho practice)

==================================================
12. QUESTION (Instance của Exercise)
==================================================

TABLE: question

- id (UUID, PK)
- exercise_id (UUID, NOT NULL, FK -> exercise.id)
- skill_id (UUID, NOT NULL, FK -> skills.id)
- assigned_to_student_id (UUID, NULL, FK -> student_profile.id)
- assigned_at (TIMESTAMP, NULL)
- problem_text (TEXT, NOT NULL)  // Snapshot từ exercise
- problem_latex (TEXT, NULL)
- problem_image_url (TEXT, NULL)
- solution_steps (JSONB, NOT NULL)  // Snapshot từ exercise
- final_answer (TEXT, NULL)
- difficulty_level (INT, NULL)
- status (VARCHAR(50), NOT NULL, DEFAULT 'ASSIGNED')  // ASSIGNED | SUBMITTED | SKIPPED
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- CHECK (status IN ('ASSIGNED', 'SUBMITTED', 'SKIPPED'))
- CHECK (difficulty_level IS NULL OR difficulty_level BETWEEN 1 AND 5)

Indexes:
- idx_question_exercise_id ON question(exercise_id)
- idx_question_skill_id ON question(skill_id)
- idx_question_student_id ON question(assigned_to_student_id) WHERE assigned_to_student_id IS NOT NULL
- idx_question_status ON question(status)

Notes:
- Kế thừa từ codebase hiện tại
- Loại bỏ: question_type, customized_data, common_mistakes, hints (không cần cho Phase 1)
- Giữ lại: core fields để track question assignment

==================================================
13. PRACTICE (Response data)
==================================================

TABLE: practice

- id (UUID, PK)
- student_id (UUID, NOT NULL, FK -> student_profile.id)
- skill_id (UUID, NOT NULL, FK -> skills.id)
- question_id (UUID, NOT NULL, FK -> question.id)
- student_answer (TEXT, NULL)
- is_correct (BOOLEAN, NOT NULL)
- duration_sec (INT, NULL)
- submitted_at (TIMESTAMP, NULL)
- status (VARCHAR(20), NOT NULL, DEFAULT 'NOT_STARTED')  // NOT_STARTED | IN_PROGRESS | SUBMITTED
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)

Constraints:
- CHECK (status IN ('NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED'))

Indexes:
- idx_practice_student_id ON practice(student_id)
- idx_practice_skill_id ON practice(skill_id)
- idx_practice_question_id ON practice(question_id)
- idx_practice_submitted_at ON practice(submitted_at) WHERE submitted_at IS NOT NULL

Notes:
- Giữ lại core fields để track practice
- Loại bỏ: trial_id, session_id, session_type (không cần cho Phase 1)

==================================================
14. REFRESH_TOKEN (Authentication)
==================================================

TABLE: refresh_token

- id (UUID, PK)
- user_id (UUID, NOT NULL, FK -> users.id)
- token_hash (VARCHAR(255), UNIQUE, NOT NULL)  // Hashed refresh token
- expires_at (TIMESTAMP, NOT NULL)
- revoked_at (TIMESTAMP, NULL)  // NULL nếu chưa revoke
- created_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP)
- last_used_at (TIMESTAMP, NULL)

Constraints:
- expires_at > created_at

Indexes:
- idx_refresh_token_user_id ON refresh_token(user_id)
- idx_refresh_token_token_hash ON refresh_token(token_hash)
- idx_refresh_token_expires_at ON refresh_token(expires_at)
- idx_refresh_token_user_active ON refresh_token(user_id, revoked_at) WHERE revoked_at IS NULL

Notes:
- Kế thừa từ codebase hiện tại
- Hỗ trợ multi-device authentication

==================================================
15. EXPLICITLY FORBIDDEN TABLES & FIELDS
==================================================

The following MUST NOT exist in Phase 1:

Tables:
- student_trial_profile
- trial_device
- licence_info
- license_device
- device
- otp_session
- link_token
- skill_mastery (thay bằng skill_completions)
- practice_session (không cần cho Phase 1)
- mini_test_session
- mini_test_result
- solve_history
- progress_summary (không cần cho Phase 1)

Fields:
- users.oauth_provider
- users.oauth_id
- users.phone_verified
- users.email_verified
- practice.trial_id
- practice.session_id
- practice.session_type
- skill.prerequisite_ids (JSON) - thay bằng bảng skill_prerequisites

Nếu xuất hiện → VI PHẠM PHASE 1

==================================================
16. MAPPING RULE TO BACKEND
==================================================

- Mỗi TABLE ↔ 1 Entity Java
- Không entity "aggregate" mơ hồ
- FK phải được enforce ở DB + Guard ở backend
- Không logic business nằm trong DB

==================================================
END OF DB SCHEMA – PHASE 1
==================================================
