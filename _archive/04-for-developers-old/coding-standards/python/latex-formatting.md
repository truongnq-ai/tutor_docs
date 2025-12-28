# Quy tắc định dạng LaTeX cho bài tập Toán
[← Quay lại Overview](README.md)

## Mục đích

Tài liệu này mô tả chi tiết quy tắc định dạng LaTeX để AI có thể tạo ra các công thức toán học đúng chuẩn, hiển thị chính xác trong hệ thống Tutor. Hệ thống sử dụng KaTeX để render LaTeX.

## 1. DELIMITERS (Dấu phân cách)

**QUAN TRỌNG:** Hệ thống sử dụng KaTeX và chỉ hỗ trợ delimiter `$...$` cho inline math.

- ✅ **ĐÚNG:** `$\\frac{5}{6}$` hoặc `$x + 2 = 5$`
- ❌ **SAI:** `\\(\\frac{5}{6}\\)` hoặc `$$\\frac{5}{6}$$` hoặc `\[\\frac{5}{6}\]`

### Quy tắc sử dụng delimiters

- **Trong `problemText`**: Dùng `$...$` để bao quanh công thức toán
- **Trong `solutionSteps[].content`**: Dùng `$...$` để bao quanh công thức toán
- **Trong `problemLatex`**: Chỉ lưu công thức thuần, KHÔNG có delimiters `$...$`
- **Trong `finalAnswer`**: Dùng `$...$` nếu có công thức

## 2. CÁC LỆNH LaTeX PHỔ BIẾN

### Phân số (Fractions)

- `\\frac{a}{b}` → phân số a/b
- Ví dụ: `\\frac{5}{6}`, `\\frac{12}{18}`, `\\frac{x+1}{x-2}`

### Phép toán cơ bản

- `+` → dấu cộng (không cần escape)
- `-` → dấu trừ (không cần escape)
- `\\times` → dấu nhân (×)
- `\\div` → dấu chia (÷)
- `\\cdot` → dấu chấm nhân (·)
- `=` → dấu bằng (không cần escape)
- `\\neq` → dấu khác (≠)
- `\\leq` → nhỏ hơn hoặc bằng (≤)
- `\\geq` → lớn hơn hoặc bằng (≥)
- `<` → nhỏ hơn (không cần escape)
- `>` → lớn hơn (không cần escape)

### Căn bậc (Square roots)

- `\\sqrt{x}` → căn bậc hai của x
- `\\sqrt[n]{x}` → căn bậc n của x
- Ví dụ: `\\sqrt{16}`, `\\sqrt[3]{27}`

### Số mũ và chỉ số

- `x^{2}` → x mũ 2
- `x_{1}` → x chỉ số 1
- `x^{n+1}` → x mũ (n+1)
- Ví dụ: `2^{3}`, `a_{i}`, `(x+1)^{2}`

### Ký hiệu toán học

- `\\pi` → π
- `\\alpha`, `\\beta`, `\\gamma` → α, β, γ
- `\\theta` → θ
- `\\infty` → ∞
- `\\pm` → ±
- `\\approx` → ≈

### Khoảng trắng

- `\\,` → khoảng trắng nhỏ
- `\\;` → khoảng trắng trung bình
- `\\quad` → khoảng trắng lớn
- `\\qquad` → khoảng trắng rất lớn

### Dấu ngoặc

- `\\left( ... \\right)` → ngoặc tự động điều chỉnh kích thước
- `\\left[ ... \\right]` → ngoặc vuông tự động
- `\\left\\{ ... \\right\\}` → ngoặc nhọn tự động
- Ví dụ: `\\left(\\frac{a}{b}\\right)`, `\\left[x+1\\right]`

## 3. VÍ DỤ CỤ THỂ

### Ví dụ 1: Phân số trong problemText

```json
{
  "problemText": "So sánh hai phân số sau và điền dấu thích hợp (>, < hoặc =) vào ô trống: $\\frac{5}{6} \\; ? \\; \\frac{4}{9}$.",
  "problemLatex": "\\frac{5}{6} \\; ? \\; \\frac{4}{9}"
}
```

### Ví dụ 2: Phương trình trong solutionSteps

```json
{
  "content": "Ta có mẫu số chung của 6 và 9 là 18. Khi đó: $\\frac{5}{6} = \\frac{15}{18}$ và $\\frac{4}{9} = \\frac{8}{18}$."
}
```

### Ví dụ 3: So sánh số

```json
{
  "content": "So sánh $15$ và $8$, ta có $15 > 8$."
}
```

### Ví dụ 4: Căn bậc hai

```json
{
  "problemText": "Tính giá trị của $\\sqrt{16} + \\sqrt{9}$.",
  "problemLatex": "\\sqrt{16} + \\sqrt{9}"
}
```

### Ví dụ 5: Số mũ

```json
{
  "problemText": "Tính giá trị của $2^{3} \\times 3^{2}$.",
  "problemLatex": "2^{3} \\times 3^{2}"
}
```

## 4. LƯU Ý QUAN TRỌNG

### Escape trong JSON

Trong JSON string, mỗi dấu `\` phải được escape thành `\\`:
- LaTeX: `\frac{5}{6}`
- Trong JSON: `"\\frac{5}{6}"`

### Escape trong prompt template

Trong SQL prompt template, cần escape thêm:
- LaTeX: `\frac{5}{6}`
- Trong SQL string: `\\frac{5}{6}` (hoặc `\\frac{{5}}{{6}}` nếu dùng trong f-string)

### Không dùng ký hiệu không chuẩn

- ❌ `\\square` → không phải lệnh LaTeX chuẩn
- ✅ Dùng `?` hoặc `\\text{?}` thay thế

### Kết hợp text và math

- ✅ `"Tính $x$ biết $x + 2 = 5$"`
- ✅ `"Phân số $\\frac{5}{6}$ lớn hơn $\\frac{4}{9}$"`

### Nếu không có công thức

- Để `problemLatex` là `null` hoặc không có field này
- Không cần thêm `$...$` trong `problemText` nếu không có công thức

## 5. KIỂM TRA LaTeX

Trước khi output JSON, đảm bảo:

- ✅ Tất cả công thức trong `problemText` và `solutionSteps[].content` được bao bởi `$...$`
- ✅ `problemLatex` chỉ chứa công thức thuần, không có `$...$`
- ✅ Tất cả dấu `\` đã được escape thành `\\` trong JSON string
- ✅ Không dùng các delimiter khác như `\\(`, `$$`, `\[`
- ✅ Các lệnh LaTeX là hợp lệ và được KaTeX hỗ trợ

## 6. DANH SÁCH LỆNH KaTeX ĐƯỢC HỖ TRỢ

KaTeX hỗ trợ hầu hết lệnh LaTeX cơ bản. Xem thêm tại: https://katex.org/docs/supported.html

### Các lệnh thường dùng cho Toán lớp 6-7

- **Phân số**: `\\frac`, `\\dfrac`, `\\tfrac`
- **Phép toán**: `\\times`, `\\div`, `\\cdot`, `\\pm`
- **So sánh**: `\\leq`, `\\geq`, `\\neq`, `\\approx`
- **Căn**: `\\sqrt`, `\\sqrt[n]{x}`
- **Số mũ/chỉ số**: `^{}`, `_{}`
- **Ngoặc**: `\\left(`, `\\right)`, `\\left[`, `\\right]`, `\\left\\{`, `\\right\\}`
- **Ký hiệu**: `\\pi`, `\\alpha`, `\\beta`, `\\theta`, `\\infty`

## 7. PROMPT TEMPLATE CHO AI

Khi tạo prompt cho AI generate bài tập, cần bao gồm phần hướng dẫn LaTeX này:

```
## QUY TẮC ĐỊNH DẠNG LaTeX CHO BÀI TẬP TOÁN

1. Sử dụng delimiter $...$ cho tất cả công thức toán trong problemText và solutionSteps[].content
2. Trong problemLatex, chỉ lưu công thức thuần, không có $...$
3. Escape tất cả dấu \ thành \\ trong JSON string
4. Không dùng \\(, $$, hoặc \[ làm delimiter
5. Sử dụng các lệnh LaTeX chuẩn được KaTeX hỗ trợ
6. Nếu không có công thức, để problemLatex là null
```

## Checklist khi tạo bài tập với LaTeX

- [ ] Tất cả công thức trong `problemText` được bao bởi `$...$`
- [ ] Tất cả công thức trong `solutionSteps[].content` được bao bởi `$...$`
- [ ] `problemLatex` chỉ chứa công thức thuần, không có `$...$`
- [ ] Tất cả dấu `\` đã được escape thành `\\` trong JSON
- [ ] Không dùng delimiter `\\(`, `$$`, `\[`
- [ ] Các lệnh LaTeX hợp lệ và được KaTeX hỗ trợ
- [ ] Nếu không có công thức, `problemLatex` là `null`

[← Quay lại Overview](README.md)

