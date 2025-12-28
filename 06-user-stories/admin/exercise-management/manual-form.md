# Manual Form Input
← Quay lại: [README.md](../README.md)

## Mô tả

Nhập bài tập thủ công qua form trong Admin Dashboard. Phù hợp cho việc nhập từng bài, có thời gian chỉnh sửa kỹ lưỡng.

## Workflow

```
Admin mở form tạo bài tập mới
→ Điền thông tin bài tập:
  - Chọn Grade (6 hoặc 7)
  - Chọn Chapter (từ danh sách Chapter của Grade)
  - Chọn Skill (từ danh sách Skill trong Chapter đã chọn)
  - Problem Text (Tiptap editor)
  - Problem LaTeX (KaTeX editor)
  - Solution Steps
  - Common Mistakes
  - Hints, Metadata
→ Validate form data (đảm bảo Skill thuộc Chapter đã chọn)
→ Save as Draft / Submit for Review
```

**Lưu ý**: 
- Chapter và Skill là entities riêng. Form chọn Chapter trước, sau đó hiển thị danh sách Skill trong Chapter đó.
- Exercise sẽ được gắn với Skill (skill_id, bắt buộc) và Chapter (chapter_id, lấy từ Skill).

## API Endpoint

**POST /api/admin/exercises**

**Request:**
```json
{
  "skillId": "uuid",  // Bắt buộc: Skill được chọn từ Chapter
  "chapterId": "uuid", // Tự động lấy từ Skill, hoặc có thể validate
  "grade": 6,  // Tự động lấy từ Chapter hoặc Skill
  "problemType": "rút_gọn_phân_số",
  "problemText": "Rút gọn phân số: 12/18",
  "problemLatex": "\\frac{12}{18}",
  "difficultyLevel": 1,
  "solutionSteps": [...],
  "status": "draft"
}
```

**Lưu ý**: 
- `skillId` là bắt buộc
- `chapterId` được lấy từ Skill (skill.chapter_id) và lưu vào Exercise để dễ query
- `grade` được lấy từ Chapter hoặc Skill

## Độ phức tạp

⭐ Low - Đơn giản, không cần xử lý file

← Quay lại: [README.md](../README.md)

