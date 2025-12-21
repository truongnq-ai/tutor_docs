# Manual Form Input
[← Quay lại Overview](README.md)

## Mô tả

Nhập bài tập thủ công qua form trong Admin Dashboard. Phù hợp cho việc nhập từng bài, có thời gian chỉnh sửa kỹ lưỡng.

## Workflow

```
Admin mở form tạo bài tập mới
→ Điền thông tin bài tập:
  - Skill, Grade, Chapter
  - Problem Text (Tiptap editor)
  - Problem LaTeX (KaTeX editor)
  - Solution Steps
  - Common Mistakes
  - Hints, Metadata
→ Validate form data
→ Save as Draft / Submit for Review
```

## API Endpoint

**POST /api/admin/exercises**

**Request:**
```json
{
  "skillId": "uuid",
  "grade": 6,
  "chapter": "Phân số",
  "problemType": "rút_gọn_phân_số",
  "problemText": "Rút gọn phân số: 12/18",
  "problemLatex": "\\frac{12}{18}",
  "difficultyLevel": 1,
  "solutionSteps": [...],
  "status": "draft"
}
```

## Độ phức tạp

⭐ Low - Đơn giản, không cần xử lý file

[← Quay lại Overview](README.md)

