# API design & FastAPI
[← Quay lại Overview](overview.md)

## HTTP & URL

- HTTP method: dùng RESTful methods phù hợp với từng action
  - GET: Truy vấn đơn giản (health check, status)
  - POST: Xử lý (OCR, solve, hint, recommend)
- URL chuẩn: `/internal/ai/<resource>`  
  Ví dụ: `/internal/ai/ocr`, `/internal/ai/solve`, `/internal/ai/hint`, `/internal/ai/recommend`
- Tất cả endpoints là internal, chỉ Core Service có thể gọi.

## Request/Response chuẩn

- Body request: Pydantic schema trong `src/presentation/api/schemas/`; validation tự động bởi FastAPI.
- Response: JSON response với `errorCode`/`errorDetail`/`data`; mã lỗi lấy từ errorCode convention (0000-9999).
- Kết hợp HTTP status codes chuẩn với errorCode trong response.
- Luồng lỗi: ném custom exception trong service; middleware catch và map sang response với errorCode và HTTP status tương ứng.

## Response Format

### Success Response

```python
{
    "errorCode": "0000",        # Optional - mã thành công
    "errorDetail": "Operation successful",  # Optional - mô tả thành công
    "data": {...}               # Dữ liệu trả về
}
# HTTP 200
```

### Error Response

```python
{
    "errorCode": "0001",        # Bắt buộc - mã lỗi từ "0001" đến "9999"
    "errorDetail": "Mô tả mã lỗi",  # Bắt buộc - mô tả chính xác mã lỗi
    "data": null                # Optional - có thể null hoặc chứa thông tin bổ sung
}
# HTTP 401/400/403/404/500
```

## Error Code Convention

### Error Code Ranges

- **"0000"**: Thành công (optional trong success response)
- **"0001" - "0999"**: Lỗi nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lỗi xác thực và phân quyền (Authentication & Authorization)
- **"2000" - "2999"**: Lỗi validation (Validation errors)
- **"3000" - "3999"**: Lỗi tài nguyên (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lỗi tích hợp dịch vụ (Service integration errors)
- **"5000" - "5999"**: Lỗi hệ thống (System errors)
- **"6000" - "9999"**: Reserved cho tương lai

### Error Code Examples

| ErrorCode | ErrorDetail | HTTP Status | Khi nào sử dụng |
|-----------|-------------|-------------|-----------------|
| "0000" | "Operation successful" | 200 | Success response |
| "2001" | "Invalid request parameters" | 400 | Validation failed |
| "2002" | "Missing required field: image_url" | 400 | Required field missing |
| "4001" | "OCR service unavailable" | 503 | External service error |
| "4002" | "OpenAI API error" | 503 | AI provider error |
| "5001" | "Internal server error" | 500 | System error |

## Pydantic Schemas

### Request Schema với Validation

```python
from pydantic import BaseModel, Field, HttpUrl
from typing import Optional

class OCRRequest(BaseModel):
    image_url: HttpUrl = Field(..., description="URL của ảnh bài toán")
    
    class Config:
        json_schema_extra = {
            "example": {
                "image_url": "https://example.com/math-problem.jpg"
            }
        }
```

### Response Schema với ErrorCode

```python
from pydantic import BaseModel
from typing import Optional, Generic, TypeVar

T = TypeVar('T')

class APIResponse(BaseModel, Generic[T]):
    errorCode: str = Field(..., description="Mã lỗi (0000-9999)")
    errorDetail: str = Field(..., description="Mô tả mã lỗi")
    data: Optional[T] = Field(None, description="Dữ liệu trả về")
    
    class Config:
        json_schema_extra = {
            "example": {
                "errorCode": "0000",
                "errorDetail": "Operation successful",
                "data": {
                    "problem_text": "Tính: 2/3 + 1/4",
                    "confidence": 0.95
                }
            }
        }
```

## FastAPI Route Examples

### Success Response

```python
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from src.presentation.api.schemas.ocr import OCRRequest, OCRResponse

router = APIRouter(prefix="/internal/ai", tags=["OCR"])

@router.post(
    "/ocr",
    summary="Extract math problem from image",
    description="Nhận dạng và trích xuất bài toán từ ảnh",
    response_model=APIResponse[OCRResponse],
    status_code=status.HTTP_200_OK
)
async def ocr(request: OCRRequest):
    try:
        result = await ocr_service.extract_text(request.image_url)
        return APIResponse(
            errorCode="0000",
            errorDetail="OCR completed successfully",
            data=result
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "errorCode": "5001",
                "errorDetail": "Internal server error",
                "data": None
            }
        )
```

### Error Handling với Middleware

```python
from fastapi import Request, status
from fastapi.responses import JSONResponse
from src.core.exceptions import CustomException

@app.exception_handler(CustomException)
async def custom_exception_handler(request: Request, exc: CustomException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "errorCode": exc.error_code,
            "errorDetail": exc.error_detail,
            "data": exc.data
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "errorCode": "5001",
            "errorDetail": "Internal server error",
            "data": None
        }
    )
```

## Custom Exceptions

### Exception với ErrorCode

```python
from fastapi import status

class CustomException(Exception):
    def __init__(
        self,
        error_code: str,
        error_detail: str,
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        data: Optional[dict] = None
    ):
        self.error_code = error_code
        self.error_detail = error_detail
        self.status_code = status_code
        self.data = data
        super().__init__(self.error_detail)

class OCRServiceException(CustomException):
    def __init__(self, error_detail: str):
        super().__init__(
            error_code="4001",
            error_detail=error_detail,
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE
        )
```

## OpenAPI Documentation

- Sử dụng `summary` và `description` trong route decorator.
- Sử dụng `response_model` với Pydantic schemas.
- Bổ sung `examples` trong Pydantic schemas.
- Document errorCode trong response models với examples.

### Ví dụ OpenAPI

```python
@router.post(
    "/solve",
    summary="Solve math problem",
    description="Giải bài toán theo từng bước với giải thích",
    response_model=APIResponse[SolveResponse],
    responses={
        200: {
            "description": "Success",
            "content": {
                "application/json": {
                    "example": {
                        "errorCode": "0000",
                        "errorDetail": "Problem solved successfully",
                        "data": {
                            "solution": {
                                "steps": [...],
                                "final_answer": "11/12"
                            }
                        }
                    }
                }
            }
        },
        400: {
            "description": "Validation error",
            "content": {
                "application/json": {
                    "example": {
                        "errorCode": "2001",
                        "errorDetail": "Invalid request parameters",
                        "data": null
                    }
                }
            }
        }
    }
)
async def solve(request: SolveRequest):
    # Implementation
```

## Versioning & header

- Nếu cần version, chèn vào path sau `/internal/ai` (ví dụ `/internal/ai/v1/...`); giữ nguyên format resource.
- Các header đặc thù (API key, trace id) cần được mô tả trong tài liệu chi tiết của service.
- Internal API key: Sử dụng header `X-API-Key` cho authentication với Core Service.

[↑ Quay lại Overview](overview.md)
