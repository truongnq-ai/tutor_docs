# Exercise Generation Prompt Templates

Thư mục này chứa các prompt template chính thức cho chức năng tạo bài tập Toán tự động bằng AI.

## Cấu trúc

- `exercise_generation_prompt_grade_6.md` - Prompt template cho lớp 6
- `exercise_generation_prompt_grade_7.md` - Prompt template cho lớp 7
- `README.md` - File này

## Thông tin

**Ngày tạo:** 2025-01-22  
**Version:** 2  
**Thay đổi:** Bổ sung quy tắc định dạng LaTeX formatting để cải thiện hiển thị công thức toán

## Format JSON Output

Hệ thống sử dụng **camelCase** cho các key trong JSON output:
- `problemText` (không phải `problem_text`)
- `problemLatex` (không phải `problem_latex`)
- `solutionSteps` (không phải `solution_steps`)
- `finalAnswer` (không phải `final_answer`)
- `commonMistakes` (không phải `common_mistakes`)
- `learningObjective` (không phải `learning_objective`)
- `difficultyLevel` (không phải `difficulty_level`)
- `timeEstimateSec` (không phải `time_estimate_sec`)

**Lưu ý:** Python service hỗ trợ cả hai format (camelCase và snake_case) để tương thích ngược, nhưng format chính thức trong prompt template là camelCase.

## Quy tắc LaTeX

1. **Delimiters:** Chỉ dùng `$...$` cho inline math
2. **problemLatex:** Không có delimiters `$...$`
3. **Escape:** Mỗi `\` phải thành `\\` trong JSON string
4. **Hệ thống:** Sử dụng KaTeX để render LaTeX

Xem thêm chi tiết trong file `tutor_docs/04-for-developers/coding-standards/python/latex-formatting.md`

## Cách sử dụng

1. Copy nội dung System Prompt và User Prompt Template từ file markdown
2. Cập nhật vào database qua admin dashboard: `http://localhost:3000/content/prompt-templates`
3. Hoặc cập nhật trực tiếp trong database table `prompt_template`

## Lịch sử thay đổi

### Version 2 (2025-01-22)
- ✅ Bổ sung quy tắc định dạng LaTeX formatting
- ✅ Thêm ví dụ cụ thể về cách sử dụng LaTeX
- ✅ Làm rõ format key (camelCase)

### Version 1
- Prompt template ban đầu với yêu cầu variation

