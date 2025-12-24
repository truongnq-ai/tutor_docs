# Tổng quan quy tắc chung - Python/FastAPI

Tài liệu này thống kê ngắn gọn các quy tắc bắt buộc cho backend Python/FastAPI của hệ thống Tutor. Chi tiết từng mảng nằm trong các file chuyên đề được liên kết bên dưới.

## Nguyên tắc cốt lõi

- Tuân thủ coding convention chuẩn của Python (PEP 8), FastAPI best practices, và các hướng dẫn style đã công bố.
- Dùng format response với `errorCode`/`errorDetail`/`data` kết hợp với HTTP status codes chuẩn cho tất cả API endpoints.
- API dùng phương thức RESTful (GET/POST/PUT/DELETE) phù hợp với từng action; URL chuẩn hóa dạng `/internal/ai/<resource>` (ví dụ: `/internal/ai/ocr`, `/internal/ai/solve`).
- Cấu trúc package theo Clean Architecture: `src/domain`, `src/application`, `src/infrastructure`, `src/presentation`, `src/core`, `src/common`.
- Đặt tên theo PEP 8: `snake_case` cho files/functions/variables, `PascalCase` cho classes, `UPPER_SNAKE_CASE` cho constants.
- Logging dùng Python logging module; log lỗi tại route/service, không log tràn stack trace nhiều lần.
- OpenAPI/Swagger phải có `description` + `response_model` với errorCode examples và thêm `request/response example`.
- HTTP client cho external services có guideline về timeout, retry, circuit breaker, và quy tắc errorCode mapping.

## Response Format

### Response Structure

Tất cả API trả về response với cấu trúc:

```python
# Success Response
{
    "errorCode": "0000",        # Optional - mã thành công
    "errorDetail": "Operation successful",  # Optional - mô tả thành công
    "data": {...}               # Dữ liệu trả về
}
# HTTP 200

# Error Response
{
    "errorCode": "0001",        # Bắt buộc - mã lỗi từ "0001" đến "9999"
    "errorDetail": "Mô tả mã lỗi",  # Bắt buộc - mô tả chính xác mã lỗi
    "data": null                # Optional - có thể null hoặc chứa thông tin bổ sung
}
# HTTP 401/400/403/404/500
```

### Error Code Convention

- **"0000"**: Thành công (optional trong success response)
- **"0001" - "0999"**: Lỗi nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lỗi xác thực và phân quyền (Authentication & Authorization)
- **"2000" - "2999"**: Lỗi validation (Validation errors)
- **"3000" - "3999"**: Lỗi tài nguyên (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lỗi tích hợp dịch vụ (Service integration errors)
- **"5000" - "5999"**: Lỗi hệ thống (System errors)
- **"6000" - "9999"**: Reserved cho tương lai

### HTTP Status Codes

- HTTP 200: Success (errorCode "0000" hoặc không có)
- HTTP 400: Bad Request (errorCode 2xxx - validation errors)
- HTTP 401: Unauthorized (errorCode 1xxx - authentication errors)
- HTTP 403: Forbidden (errorCode 1xxx - authorization errors)
- HTTP 404: Not Found (errorCode 3xxx - resource not found)
- HTTP 500: Internal Server Error (errorCode 5xxx - system errors)

## Mục chi tiết

- [`code-structure.md`](code-structure.md) - Cấu trúc code & đặt tên
- [`api-design.md`](api-design.md) - API design & FastAPI
- [`clean-architecture.md`](clean-architecture.md) - Clean Architecture patterns
- [`code-quality.md`](code-quality.md) - Kiểm tra chất lượng code & làm sạch
- [`latex-formatting.md`](latex-formatting.md) - Quy tắc định dạng LaTeX cho bài tập Toán

## Phạm vi áp dụng

- Áp dụng cho module Python/FastAPI: `tutor-ai-service`
- Package base: `src.*` (theo Clean Architecture)

## Không nằm trong phạm vi

- Quy tắc front-end (Next.js, Flutter có tài liệu riêng).
- Quy tắc hạ tầng CI/CD (chỉ đề cập timeout/retry ở mức service).

