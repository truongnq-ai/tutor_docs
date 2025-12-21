# API Endpoints
[← Quay lại Overview](README.md)

## Admin APIs

```
GET    /api/admin/questions                    - List Questions (filter, search, pagination)
GET    /api/admin/questions/:id                - Get Question detail (kèm Practices)
GET    /api/admin/exercises/:id/questions      - Get Questions generated from Exercise
GET    /api/admin/skills/:id/questions         - Get Questions by Skill
GET    /api/admin/questions/:id/practices       - Get Practices của Question
```

## Student/Practice APIs

```
GET    /api/practice/questions                 - Get assigned Questions for practice
GET    /api/practice/questions/:id             - Get Question detail (student view)
POST   /api/practice/questions/:id/submit      - Submit answer (tạo Practice với question_id)
```

## Internal APIs

```
POST   /api/internal/learning/generate-questions - Generate Questions from Exercises (cho Adaptive Learning Engine)
```

## Practice API Update

```
POST   /api/practice/submit                    - Submit practice (cập nhật: nhận questionId optional)
```

## Error Codes

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `QUESTION_NOT_FOUND` | 404 | Question không tồn tại |
| `QUESTION_NOT_ASSIGNED` | 400 | Question chưa được assign |
| `QUESTION_ALREADY_COMPLETED` | 400 | Question đã được submit |
| `QUESTION_STUDENT_MISMATCH` | 403 | Question không thuộc về student này |
| `EXERCISE_NOT_APPROVED` | 400 | Exercise chưa được approve, không thể sinh Questions |
| `PREREQUISITE_NOT_MET` | 403 | Prerequisite skills chưa đạt mastery threshold |

[← Quay lại Overview](README.md)

