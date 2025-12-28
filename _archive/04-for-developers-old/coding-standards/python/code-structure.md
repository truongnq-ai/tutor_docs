# Cấu trúc code & đặt tên
[← Quay lại Overview](README.md)

## Package & layer (Clean Architecture)

- `src/domain/entities`: Domain entities và value objects, không phụ thuộc vào framework.
- `src/application/interfaces`: Service interfaces (abstract classes) định nghĩa contracts.
- `src/application/use_cases`: Use cases cho business logic (nếu có).
- `src/infrastructure/services`: Service implementations (OCR, MathSolver, HintGenerator, AdaptiveLearning).
- `src/infrastructure/providers`: AI provider implementations (OpenAI, Gemini, Grok, Local AI).
- `src/infrastructure/cache`: Redis cache implementation.
- `src/presentation/api/routes`: FastAPI route handlers cho mỗi endpoint.
- `src/presentation/api/schemas`: Pydantic schemas cho request/response validation.
- `src/presentation/api/middleware`: Error handling middleware.
- `src/presentation/main.py`: FastAPI app entry point.
- `src/core`: Core utilities (config, exceptions, logging).
- `src/common`: Shared utilities.

## Đặt tên class/file

- Tên class phản ánh vai trò: `*Service`, `*Provider`, `*Repository`, `*Request`, `*Response`, `*Entity`.
- Files: `snake_case.py` (ví dụ: `ocr_service.py`, `math_solver_service.py`).
- Classes: `PascalCase` (ví dụ: `OCRService`, `MathSolverService`).
- Functions: `snake_case` (ví dụ: `solve_problem`, `extract_text`).
- Constants: `UPPER_SNAKE_CASE` (ví dụ: `MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEOUT`).
- Không đặt tên viết tắt khó hiểu; ưu tiên tên nghiệp vụ rõ ràng.

## Nguyên tắc chung khi viết code

- Không hardcode string/number lặp lại; đưa vào constants hoặc config.
- Validate đầu vào bằng Pydantic schemas; ném custom exception với errorCode tương ứng.
- Sử dụng type hints cho tất cả functions và methods.
- Sử dụng dataclasses hoặc Pydantic models cho data structures.
- Không truy cập trực tiếp infrastructure trong domain layer; mọi logic qua application layer.

## Logging

- Dùng Python logging module, logger tạo với `logging.getLogger(__name__)`.
- Log error ở route/service khi catch Exception; tránh log lặp stack trace nhiều tầng.
- Không log dữ liệu nhạy cảm (API keys, tokens), chỉ log request ID, errorCode nếu có.

## Response & Exception

- Tất cả API trả response dict với `errorCode`/`errorDetail`/`data`; sử dụng `JSONResponse` với HTTP status tương ứng.
- Custom exception mang theo errorCode; middleware bắt và map thẳng ra response với HTTP status tương ứng.
- Kết hợp HTTP status codes chuẩn (200/400/401/403/404/500) với errorCode trong response.

## OpenAPI/Swagger

- Mỗi API có `summary` và `description` trong route decorator.
- Sử dụng `response_model` với Pydantic schemas.
- Bổ sung `examples` trong Pydantic schemas để minh họa request/response.
- Document errorCode trong response models.

## Tên API & HTTP method

- Dùng RESTful methods: GET (truy vấn), POST (tạo mới/xử lý), PUT (cập nhật), DELETE (xóa).
- URL chuẩn: `/internal/ai/<resource>`; tránh dấu "/" thừa.
- Resource là danh từ rõ nghĩa: `/internal/ai/ocr`, `/internal/ai/solve`, `/internal/ai/hint`, `/internal/ai/recommend`.

## Ví dụ thêm mới một OCR endpoint

- **Schema**: tạo `src/presentation/api/schemas/ocr.py` với `OCRRequest` và `OCRResponse` (Pydantic models).
- **Service Interface**: `src/application/interfaces/ocr_service.py` định nghĩa `IOCRService` (abstract class).
- **Service Implementation**: `src/infrastructure/services/ocr_service.py` implement `IOCRService`.
- **Route**: `src/presentation/api/routes/ocr.py` với endpoint `POST /internal/ai/ocr`.
- **Error Handling**: Middleware trong `src/presentation/api/middleware/error_handler.py` xử lý exceptions và map sang response với errorCode.
- **OpenAPI**: Sử dụng `@router.post` với `summary`, `description`, `response_model`, và `examples`.

## Tài liệu liên quan

- [API design & FastAPI](api-design.md)
- [Clean Architecture patterns](clean-architecture.md)
- [Kiểm tra chất lượng code](code-quality.md)

[← Quay lại Overview](README.md)

