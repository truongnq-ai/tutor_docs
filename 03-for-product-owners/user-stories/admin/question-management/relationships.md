# Mối quan hệ giữa các Entities
[← Quay lại Overview](README.md)

## ERD Relationships

```
Chapter (1) ──< (N) Skill
  │                │
  │                │
  └────────────────┘

Exercise (1) ──< (N) Question
  │                │
  │                │ (snapshot data)
  │                │
  └────────────────┘

Skill (1) ──< (N) Exercise
  │                │
  │                │ (skill_id, bắt buộc)
  │                │
  └────────────────┘

Skill (1) ──< (N) Question
  │                │
  │                │ (skill_id, bắt buộc)
  │                │
  └────────────────┘

Question (1) ──< (N) Practice
  │                │
  │                │ (via question_id)
  │                │
  └────────────────┘
```

## Quan hệ chi tiết

| Relationship | Type | Cardinality | Foreign Key | Notes |
|-------------|------|------------|-------------|-------|
| Chapter → Skill | One-to-Many | 1:N | `skill.chapter_id` | Một Chapter chứa nhiều Skills |
| Skill → Exercise | One-to-Many | 1:N | `exercise.skill_id` | Một Skill có nhiều Exercises (skill_id bắt buộc) |
| Skill → Question | One-to-Many | 1:N | `question.skill_id` | Một Skill có nhiều Questions (skill_id bắt buộc) |
| Exercise → Question | One-to-Many | 1:N | `question.exercise_id` | Một Exercise có thể sinh nhiều Questions |
| Question → Practice | One-to-Many | 1:N | `practice.question_id` | Một Question có thể có nhiều Practices (re-attempt logic) |
| Student → Question | One-to-Many | 1:N | `question.assigned_to_student_id` | Một học sinh có nhiều Questions |
| Practice → Session | Many-to-One (Polymorphic) | N:1 | `practice.session_id` + `practice.session_type` | Practice link với session qua session_id + session_type (PRACTICE_SESSION, MINI_TEST, etc.) |

**Lưu ý về Chapter**:
- Exercise và Question có `chapter_id` (lấy từ Skill để dễ query và filter)
- Chapter là first-class entity, dùng cho navigation, reporting, và Mini Test scope

[← Quay lại Overview](README.md)

