# PROMPT STRUCTURE - AI SERVICE

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả coding standards cho prompt structure - prompt versioning, safety.

## Prompt Versioning

### Format
- Version trong prompt: `v1`, `v2`, `v3`
- Document changes: Ghi rõ thay đổi giữa các version
- Backward compatibility: Support old versions nếu cần

### Example
```python
PROMPT_V1 = """
You are a math tutor...
"""

PROMPT_V2 = """
You are a math tutor...
[Updated: Added step-by-step explanation requirement]
"""
```

## Prompt Safety

### Input Validation
- Validate input trước khi gửi đến LLM
- Sanitize user input
- Check length limits

### Output Validation
- Validate LLM response
- Check format compliance
- Handle malformed responses

### Error Handling
- Graceful degradation
- Fallback responses
- Error logging

## Prompt Structure

### Template
```python
PROMPT_TEMPLATE = """
Role: {role}
Task: {task}
Context: {context}
Constraints: {constraints}
Output Format: {format}
"""
```

### Components
- **Role**: Vai trò của AI
- **Task**: Nhiệm vụ cụ thể
- **Context**: Context cần thiết
- **Constraints**: Ràng buộc
- **Output Format**: Format mong muốn

## Examples

### Exercise Generation
```python
EXERCISE_GENERATION_PROMPT = """
You are a math tutor for grade {grade} students.
Generate a math exercise for skill: {skill_name}.

Skill description: {skill_description}
Difficulty level: {difficulty}

Output format:
{
  "problem_text": "...",
  "solution_steps": [...],
  "final_answer": "..."
}
"""
```

### Solution Explanation
```python
SOLUTION_EXPLANATION_PROMPT = """
You are a math tutor.
Explain the solution step by step for this problem:

Problem: {problem_text}
Student answer: {student_answer}
Correct answer: {correct_answer}

Provide:
1. Step-by-step explanation
2. Common mistakes to avoid
3. Tips for similar problems
"""
```

## Tài liệu liên quan

- [Python Standards](./python.md)
- [AI Integration](./ai-integration.md)

---

← Quay lại: [README.md](../README.md)

