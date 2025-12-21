# Mối quan hệ giữa các Entities
[← Quay lại Overview](README.md)

## ERD Relationships

```
Exercise (1) ──< (N) Question
  │                │
  │                │ (snapshot data)
  │                │
  └────────────────┘

Skill (1) ──< (N) Question
  │                │
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
| Exercise → Question | One-to-Many | 1:N | `question.exercise_id` | Một Exercise có thể sinh nhiều Questions |
| Skill → Question | One-to-Many | 1:N | `question.skill_id` | Một Skill có nhiều Questions |
| Question → Practice | One-to-Many | 1:N | `practice.question_id` | Một Question có thể có nhiều Practices (retry logic - Phase 2) |
| Student → Question | One-to-Many | 1:N | `question.assigned_to_student_id` | Một học sinh có nhiều Questions |

[← Quay lại Overview](README.md)

