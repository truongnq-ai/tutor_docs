# LEARNING PLAN API CONTRACT

← Quay lại: [README.md](../../README.md)

## Tổng quan

Tài liệu này mô tả API contract cho Learning Plan - lộ trình học tập hằng ngày.

## GET /api/v1/learning/plan

### Mô tả
Lấy learning plan hôm nay cho học sinh.

### Request

**Headers:**
```
Authorization: Bearer {access_token}
```

**Path Parameters:**
- Không có

**Query Parameters:**
- Không có

### Response

**Status: 200 OK**

```json
{
  "recommendedChapter": {
    "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
    "chapterName": "Phân số",
    "chapterCode": "6.3",
    "difficultyLevel": 2,
    "activityType": "practice",
    "recommendationReason": "Bạn có nhiều Skills yếu trong Chapter này",
    "skills": [
      {
        "skillId": "01234567-89ab-cdef-0123-456789abcdef",
        "skillCode": "6.3.1",
        "skillName": "Cộng trừ phân số cùng mẫu",
        "prerequisiteSkills": []
      },
      {
        "skillId": "01234567-89ab-cdef-0123-456789abcdef",
        "skillCode": "6.3.2",
        "skillName": "Nhân chia phân số",
        "prerequisiteSkills": ["6.3.1"]
      }
    ]
  },
  "progressSummary": {
    "totalSkills": 50,
    "masteredSkills": 15,
    "needsPracticeSkills": 20,
    "weakSkills": 10,
    "overallMastery": 65.5
  }
}
```

### Error Responses

**Status: 401 Unauthorized**
```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid or expired token"
}
```

**Status: 404 Not Found**
```json
{
  "error": "STUDENT_NOT_FOUND",
  "message": "Student not found"
}
```

## POST /api/v1/learning/generate-questions

### Mô tả
Generate questions từ learning plan recommendation.

### Request

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body:**
```json
{
  "skillId": "01234567-89ab-cdef-0123-456789abcdef",
  "difficultyLevel": 2,
  "count": 5
}
```

### Response

**Status: 200 OK**

```json
{
  "questions": [
    {
      "id": "01234567-89ab-cdef-0123-456789abcdef",
      "problemText": "Tính: 1/2 + 1/4",
      "problemLatex": "$\\frac{1}{2} + \\frac{1}{4}$",
      "difficultyLevel": 2,
      "skillId": "01234567-89ab-cdef-0123-456789abcdef",
      "skillName": "Cộng trừ phân số cùng mẫu"
    }
  ]
}
```

## Tài liệu liên quan

- [Learning Plan Domain Model](../../02-domain-model/learning-plan.md)
- [Learning Plan Rules](../../03-product-rules/learning-plan-rules.md)

---

← Quay lại: [README.md](../../README.md)

