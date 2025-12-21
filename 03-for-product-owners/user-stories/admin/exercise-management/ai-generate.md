# AI Generate
[← Quay lại Overview](README.md)

## Mô tả

Tạo bài tập tự động từ AI dựa trên skill, difficulty và grade. Phù hợp cho việc tạo bài tập mới nhanh chóng.

## Workflow

```
Input: skillId, difficulty, grade
→ Call AI Service: Generate Exercise
  - Lấy seed data từ database
  - Generate bài tập mới
→ Preview generated exercise
  - Problem text
  - Solution steps
  - Confidence score
→ Edit nếu cần → Submit for Review
```

## API Endpoint

**POST /api/admin/exercises/generate**

**Request:**
```json
{
  "skillId": "uuid",
  "grade": 6,
  "difficultyLevel": 2,
  "count": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "exercises": [
      {
        "problemText": "Rút gọn phân số: 24/36",
        "problemLatex": "\\frac{24}{36}",
        "solutionSteps": [...],
        "confidence": 0.92,
        "draftExerciseId": "uuid"
      }
    ]
  }
}
```

## Độ phức tạp

⭐⭐⭐ High - Cần tích hợp với AI Service

[← Quay lại Overview](README.md)

