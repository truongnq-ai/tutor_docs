# DOMAIN MODEL

← Quay lại: [README.md](../README.md)

## Tổng quan

Domain Model là trái tim của dự án Tutor - định nghĩa các entities cốt lõi và mối quan hệ giữa chúng.

**👉 Mọi logic nghiệp vụ PHẢI trace về đây**

## Core Entities

### Chapter
- **Trục sư phạm / UX**
- Tổ chức nội dung theo chương trình
- Dùng cho navigation, progress tracking, mini test scope
- [Chapter Domain Model](./chapter.md)

### Skill
- **Trục AI / luyện tập**
- Đơn vị năng lực atomic
- Dùng cho practice, mastery tracking, adaptive learning
- [Skill Domain Model](./skill.md)

### Exercise
- Bài tập template
- Được tạo bởi Admin hoặc AI Service
- Dùng để generate Questions
- [Exercise Domain Model](./exercise.md)

### Question
- Instance của Exercise
- Được assign cho học sinh
- Lưu snapshot của Exercise tại thời điểm assign
- [Question Domain Model](./question.md)

### Practice
- Record kết quả làm bài
- Lưu response data, session info
- Link với Question (1:N - re-attempt logic)
- [Practice Domain Model](./practice.md)

### Mini Test
- Bài kiểm tra nhỏ theo Chapter
- Scope: Chapter, Analysis: Skill
- [Mini Test Domain Model](./mini-test.md)

### Learning Plan
- Lộ trình học tập hằng ngày
- Recommend Chapter + Skills
- [Learning Plan Domain Model](./learning-plan.md)

## Relationships

```
Chapter (1) ──< (N) Skill
  │                │
  │                │
  └────────────────┘

Skill (1) ──< (N) Exercise
  │                │
  │                │
  └────────────────┘

Exercise (1) ──< (N) Question
  │                │
  │                │ (snapshot)
  └────────────────┘

Question (1) ──< (N) Practice
  │                │
  │                │ (re-attempt)
  └────────────────┘
```

## Mapping với Product Rules

- [Mini Test Rules](../03-product-rules/mini-test-rules.md) - Quy tắc mini test
- [Learning Plan Rules](../03-product-rules/learning-plan-rules.md) - Quy tắc learning plan
- [Chapter Progress Rules](../03-product-rules/chapter-progress-rules.md) - Quy tắc chapter progress
- [Mastery Calculation](../03-product-rules/mastery-calculation.md) - Công thức mastery

## Tài liệu liên quan

- [Core Concepts](../00-core-concepts/) - Glossary, Chapter vs Skill, Learning Philosophy
- [Database Schema](../07-architecture-and-data/database-schema.md) - Database implementation
- [Chapter-Skill ERD](../07-architecture-and-data/chapter-skill-erd.md) - ERD diagram

---

← Quay lại: [README.md](../README.md)

