# API Endpoints
← Quay lại: [README.md](../README.md)

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
POST   /api/v1/practice/questions/{id}/submit  - Submit practice answer (recommended, questionId in path)
POST   /api/v1/practice/submit                - Submit practice (DEPRECATED - use questions/{id}/submit instead)
POST   /api/v1/learning/generate-questions     - Generate questions from learning plan
```

## Practice Session API

```
POST   /api/v1/practice/sessions               - Create practice session (generates questions and Practice records)
GET    /api/v1/practice/sessions/{sessionId}   - Get practice session (session details)
GET    /api/v1/practice/session-info/{sessionId} - Get session information (progress, mastery, timestamps)
GET    /api/v1/practice/sessions/{sessionId}/questions - Get questions in session (via Practice records)
PUT    /api/v1/practice/sessions/{sessionId}/pause    - Pause session
PUT    /api/v1/practice/sessions/{sessionId}/resume  - Resume session
PUT    /api/v1/practice/sessions/{sessionId}/complete - Complete session
DELETE /api/v1/practice/sessions/{sessionId}  - Cancel session (marks Practice records as CANCELLED)
GET    /api/v1/practice/sessions/resumable    - Get resumable sessions
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

← Quay lại: [README.md](../README.md)

