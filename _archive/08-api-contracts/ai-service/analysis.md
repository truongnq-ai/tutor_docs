# AI ANALYSIS API CONTRACT

← Quay lại: [README.md](../../README.md)

## Tổng quan

Tài liệu này mô tả API contract cho AI Service - analysis API (error analysis, solution explanation).

## POST /internal/ai/analyze-error

### Mô tả
AI Service phân tích lỗi sai của học sinh và đưa ra giải thích.

### Request

**Headers:**
```
Content-Type: application/json
X-API-Key: {api_key}
```

**Body:**
```json
{
  "problem_text": "Tính: 1/2 + 1/4",
  "student_answer": "2/6",
  "correct_answer": "3/4",
  "skill_id": "01234567-89ab-cdef-0123-456789abcdef",
  "skill_name": "Cộng trừ phân số cùng mẫu"
}
```

### Response

**Status: 200 OK**

```json
{
  "errorCode": "0000",
  "errorDetail": "Analysis completed successfully",
  "data": {
    "error_type": "Conceptual error",
    "explanation": "Bạn đã cộng tử và mẫu số, nhưng quy tắc đúng là quy đồng mẫu số trước, sau đó cộng tử số.",
    "step_by_step": [
      {
        "step": 1,
        "description": "Quy đồng mẫu số",
        "calculation": "1/2 = 2/4"
      },
      {
        "step": 2,
        "description": "Cộng tử số",
        "calculation": "2/4 + 1/4 = 3/4"
      }
    ],
    "common_mistakes": [
      {
        "mistake": "Cộng tử và mẫu",
        "explanation": "Sai: 1/2 + 1/4 = 2/6"
      }
    ],
    "tips": [
      "Luôn quy đồng mẫu số trước khi cộng",
      "Cộng tử số, giữ nguyên mẫu số"
    ]
  }
}
```

## POST /internal/ai/explain-solution

### Mô tả
AI Service giải thích lời giải từng bước cho một bài toán.

### Request

**Headers:**
```
Content-Type: application/json
X-API-Key: {api_key}
```

**Body:**
```json
{
  "problem_text": "Tính: 1/2 + 1/4",
  "skill_id": "01234567-89ab-cdef-0123-456789abcdef",
  "skill_name": "Cộng trừ phân số cùng mẫu"
}
```

### Response

**Status: 200 OK**

```json
{
  "errorCode": "0000",
  "errorDetail": "Solution explanation generated successfully",
  "data": {
    "solution_steps": [
      {
        "step": 1,
        "description": "Quy đồng mẫu số",
        "calculation": "1/2 = 2/4"
      },
      {
        "step": 2,
        "description": "Cộng tử số",
        "calculation": "2/4 + 1/4 = 3/4"
      }
    ],
    "final_answer": "3/4",
    "explanation": "Để cộng hai phân số, ta cần quy đồng mẫu số trước..."
  }
}
```

## Tài liệu liên quan

- [AI Integration](../../09-coding-standards/ai-service/ai-integration.md)
- [Prompt Structure](../../09-coding-standards/ai-service/prompt-structure.md)

---

← Quay lại: [README.md](../../README.md)

