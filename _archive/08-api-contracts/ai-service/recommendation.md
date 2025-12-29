# AI RECOMMENDATION API CONTRACT

← Quay lại: [README.md](../../README.md)

## Tổng quan

Tài liệu này mô tả API contract cho AI Service - recommendation API (learning plan recommendation).

## POST /internal/ai/recommend

### Mô tả
AI Service nhận student state và trả về recommendation (chapter + skills).

### Request

**Headers:**
```
Content-Type: application/json
X-API-Key: {api_key}
```

**Body:**
```json
{
  "student_id": "01234567-89ab-cdef-0123-456789abcdef",
  "skill_mastery": {
    "skill_id_1": 65,
    "skill_id_2": 80,
    "skill_id_3": 45
  },
  "recent_accuracy": 0.75,
  "avg_time_per_question": 45,
  "streak_correct": 3,
  "streak_wrong": 0,
  "last_practice_at": {
    "skill_id_1": "2025-01-01T10:00:00Z"
  }
}
```

### Response

**Status: 200 OK**

```json
{
  "errorCode": "0000",
  "errorDetail": "Recommendation generated successfully",
  "data": {
    "target_chapter_id": "01234567-89ab-cdef-0123-456789abcdef",
    "recommended_skills": [
      {
        "skill_id": "01234567-89ab-cdef-0123-456789abcdef",
        "skill_code": "6.3.1",
        "skill_name": "Cộng trừ phân số cùng mẫu",
        "priority": 1
      }
    ],
    "difficulty_level": 2,
    "activity_type": "practice",
    "recommendation_reason": "Bạn có nhiều Skills yếu trong Chapter này"
  }
}
```

### Error Responses

**Status: 400 Bad Request**
```json
{
  "errorCode": "2001",
  "errorDetail": "Invalid student state",
  "data": null
}
```

**Status: 503 Service Unavailable**
```json
{
  "errorCode": "4002",
  "errorDetail": "AI Service unavailable",
  "data": null
}
```

## Tài liệu liên quan

- [Learning Plan Domain Model](../../02-domain-model/learning-plan.md)
- [Learning Plan Rules](../../03-product-rules/learning-plan-rules.md)
- [AI Integration](../../09-coding-standards/ai-service/ai-integration.md)

---

← Quay lại: [README.md](../../README.md)

