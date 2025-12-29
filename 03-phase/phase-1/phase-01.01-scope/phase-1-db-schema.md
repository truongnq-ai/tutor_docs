DB SCHEMA – PHASE 1
Project: Gia sư Toán AI
Applies to: Phase 1 – Core Personal Learning System
Status: DESIGN ONLY – IMPLEMENT AFTER APPROVAL
Purpose: Define minimal database schema aligned with Phase 1 backend skeleton

==================================================
1. DESIGN RULES
==================================================

- Schema này CHỈ phục vụ Phase 1
- Không có field cho Trial / License
- Không có nullable “cho tiện”
- Không có enum phức tạp
- Không có soft delete

==================================================
2. USER
==================================================

TABLE: users

- id (UUID, PK)
- role (VARCHAR, NOT NULL)   // PARENT | STUDENT
- name (VARCHAR, NOT NULL)
- created_at (TIMESTAMP, NOT NULL)

Notes:
- User được seed thủ công
- Không auth phức tạp
- Không trạng thái khác ACTIVE

==================================================
3. CHAPTER
==================================================

TABLE: chapters

- id (UUID, PK)
- title (VARCHAR, NOT NULL)
- description (TEXT, NULL)
- created_at (TIMESTAMP, NOT NULL)

==================================================
4. CHAPTER ASSIGNMENT
==================================================

TABLE: chapter_assignments

- id (UUID, PK)
- chapter_id (UUID, FK -> chapters.id, NOT NULL)
- student_id (UUID, FK -> users.id, NOT NULL)
- assigned_at (TIMESTAMP, NOT NULL)

Constraints:
- student_id MUST reference role = STUDENT
- UNIQUE (chapter_id, student_id)

==================================================
5. SKILL
==================================================

TABLE: skills

- id (UUID, PK)
- chapter_id (UUID, FK -> chapters.id, NOT NULL)
- title (VARCHAR, NOT NULL)
- created_at (TIMESTAMP, NOT NULL)

==================================================
6. SKILL PREREQUISITE
==================================================

TABLE: skill_prerequisites

- id (UUID, PK)
- skill_id (UUID, FK -> skills.id, NOT NULL)
- prerequisite_skill_id (UUID, FK -> skills.id, NOT NULL)

Constraints:
- skill_id != prerequisite_skill_id
- UNIQUE (skill_id, prerequisite_skill_id)

==================================================
7. SKILL COMPLETION
==================================================

TABLE: skill_completions

- id (UUID, PK)
- skill_id (UUID, FK -> skills.id, NOT NULL)
- student_id (UUID, FK -> users.id, NOT NULL)
- completed (BOOLEAN, NOT NULL)
- completed_at (TIMESTAMP, NULL)

Constraints:
- UNIQUE (skill_id, student_id)

Notes:
- Completion chỉ ở mức boolean
- Không mastery
- Không score

==================================================
8. PRACTICE (OPTIONAL – MINIMAL)
==================================================

TABLE: practices

- id (UUID, PK)
- skill_id (UUID, FK -> skills.id, NOT NULL)
- student_id (UUID, FK -> users.id, NOT NULL)
- created_at (TIMESTAMP, NOT NULL)

Notes:
- Chỉ để trace tối thiểu
- Không lưu bài làm
- Không analytics

==================================================
9. EXPLICITLY FORBIDDEN FIELDS & TABLES
==================================================

The following MUST NOT exist in Phase 1:

- trial_*
- license_*
- subscription_*
- payment_*
- entitlement_*
- device_*
- usage_*
- audit_log

Nếu xuất hiện → VI PHẠM PHASE 1

==================================================
10. MAPPING RULE TO BACKEND
==================================================

- Mỗi TABLE ↔ 1 Entity Java
- Không entity “aggregate” mơ hồ
- FK phải được enforce ở DB + Guard ở backend
- Không logic business nằm trong DB

==================================================
END OF DB SCHEMA – PHASE 1
==================================================
