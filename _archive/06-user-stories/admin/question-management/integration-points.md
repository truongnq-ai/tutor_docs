# Integration Points
← Quay lại: [README.md](../README.md)

## Integration với Exercise Management

- **Query Exercises**: Question generation service query Exercises APPROVED
- **Exercise Stats**: Exercise có thể query Questions đã được sinh từ nó
- **Exercise Detail Page**: Hiển thị "Generated Questions" tab

## Integration với Adaptive Learning Engine

- **Generate Questions**: Engine gọi `POST /api/internal/learning/generate-questions`
- **Input**: skillId, studentId, difficultyLevel, count
- **Output**: List of Questions (với questionIds)
- **Usage**: Engine assign Questions cho học sinh trong practice session

## Integration với Practice Flow

- **Practice Submit**: `POST /api/practice/submit` nhận `questionId` (required), `sessionId` + `sessionType` (optional)
- **Question Submit**: `POST /api/practice/questions/:id/submit` tạo Practice với question_id, sessionId, sessionType
- **Practice History**: Hiển thị Question info từ question_id
- **Session Info**: Query Questions trong session qua Practice records (session_id + session_type)

## Integration với Skill Management

- **Related Questions**: Skills page hiển thị Questions có skill_id = skill hiện tại
- **Filter**: Chỉ hiển thị Questions từ Exercises APPROVED
- **Statistics**: Practice count, success rate per Question

← Quay lại: [README.md](../README.md)

