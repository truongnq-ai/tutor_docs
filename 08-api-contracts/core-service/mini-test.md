# MINI TEST API CONTRACT

← Quay lại: [README.md](../../README.md)

## Tổng quan

Tài liệu này mô tả API contract cho Mini Test.

## GET /api/v1/mini-test/unlock-status

### Mô tả
Kiểm tra unlock status của Mini Test cho một Chapter.

### Request

**Headers:**
```
Authorization: Bearer {access_token}
```

**Query Parameters:**
- `chapterId` (UUID, required): ID của Chapter

### Response

**Status: 200 OK**

```json
{
  "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
  "unlocked": true,
  "practiceCount": 12,
  "requiredPracticeCount": 10,
  "miniTestCompleted": false
}
```

## POST /api/v1/mini-test/start

### Mô tả
Bắt đầu Mini Test cho một Chapter.

### Request

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body:**
```json
{
  "chapterId": "01234567-89ab-cdef-0123-456789abcdef"
}
```

### Response

**Status: 200 OK**

```json
{
  "miniTestId": "01234567-89ab-cdef-0123-456789abcdef",
  "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
  "totalQuestions": 6,
  "timeLimitSec": 600,
  "questions": [
    {
      "id": "01234567-89ab-cdef-0123-456789abcdef",
      "problemText": "Tính: 1/2 + 1/4",
      "problemLatex": "$\\frac{1}{2} + \\frac{1}{4}$",
      "skillId": "01234567-89ab-cdef-0123-456789abcdef"
    }
  ]
}
```

## POST /api/v1/mini-test/submit

### Mô tả
Nộp bài Mini Test.

### Request

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body:**
```json
{
  "miniTestId": "01234567-89ab-cdef-0123-456789abcdef",
  "answers": [
    {
      "questionId": "01234567-89ab-cdef-0123-456789abcdef",
      "answer": "3/4"
    }
  ]
}
```

### Response

**Status: 200 OK**

```json
{
  "miniTestId": "01234567-89ab-cdef-0123-456789abcdef",
  "score": 83,
  "passed": true,
  "details": {
    "skills": [
      {
        "skillId": "01234567-89ab-cdef-0123-456789abcdef",
        "skillName": "Cộng trừ phân số cùng mẫu",
        "correctCount": 2,
        "totalCount": 2
      }
    ],
    "totalCorrect": 5,
    "totalQuestions": 6
  }
}
```

## Tài liệu liên quan

- [Mini Test Domain Model](../../02-domain-model/mini-test.md)
- [Mini Test Rules](../../03-product-rules/mini-test-rules.md)

---

← Quay lại: [README.md](../../README.md)

