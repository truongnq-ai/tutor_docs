# PRODUCT RULES

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này chứa các quy tắc nghiệp vụ rõ ràng - không nằm rải rác trong code.

**👉 Giúp tránh "logic nằm trong code mà không ai biết"**

## Cấu trúc

### Mini Test Rules
- Chọn skills, số câu, unlock condition
- Scoring, passing threshold
- [Mini Test Rules](./mini-test-rules.md)

### Learning Plan Rules
- AI chọn chapter như thế nào
- Scoring logic, recommendation reason
- [Learning Plan Rules](./learning-plan-rules.md)

### Chapter Progress Rules
- new / in_progress / mastered states
- Transition conditions
- [Chapter Progress Rules](./chapter-progress-rules.md)

### Mastery Calculation
- Công thức tính mastery
- Practice impact, mini test impact
- [Mastery Calculation](./mastery-calculation.md)

## Mapping với Domain Model

Tất cả rules phải map về [Domain Model](../02-domain-model/):
- Mini Test Rules → [Mini Test Domain Model](../02-domain-model/mini-test.md)
- Learning Plan Rules → [Learning Plan Domain Model](../02-domain-model/learning-plan.md)
- Chapter Progress Rules → [Chapter Domain Model](../02-domain-model/chapter.md)
- Mastery Calculation → [Skill Domain Model](../02-domain-model/skill.md)

## Tài liệu liên quan

- [Domain Model](../02-domain-model/) - Entities và relationships
- [API Contracts](../08-api-contracts/) - API implementation

---

← Quay lại: [README.md](../README.md)

