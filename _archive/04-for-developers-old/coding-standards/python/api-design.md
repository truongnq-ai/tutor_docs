# API design & FastAPI
[← Quay lại Overview](README.md)

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

## Service-to-Service Communication (AI Service → Core Service)

### Nguyên tắc

- **Chỉ dùng Internal Endpoints**: Khi AI Service cần gọi Core Service, **bắt buộc** sử dụng Internal API endpoints (`/api/v1/internal/**`) với API Key authentication.
- **Không dùng Admin Endpoints**: **Tuyệt đối không** gọi trực tiếp admin endpoints (`/api/v1/admin/**`) vì chúng yêu cầu JWT token với role ADMIN.
- **API Key Authentication**: Sử dụng header `X-API-Key` với giá trị từ `settings.core_service_api_key`.

### Internal Endpoints Available

#### Skills
- `GET /api/v1/internal/skills/{id}` - Get skill metadata by ID

#### Prompt Templates
- `GET /api/v1/internal/prompt-templates/active` - Get all active prompt templates
- `GET /api/v1/internal/prompt-templates/by-name/{name}` - Get prompt template by name
- `GET /api/v1/internal/prompt-templates/{id}` - Get prompt template by ID

### Ví dụ Implementation

```python
import httpx
from src.core.config import settings
from src.core.exceptions import ExternalServiceException

class ExerciseGenerationService:
    def __init__(self):
        self.core_service_url = settings.core_service_url
        self.core_service_api_key = settings.core_service_api_key
    
    async def _fetch_skill_metadata(self, skill_id: str) -> dict[str, Any]:
        """Fetch skill metadata from Core Service using internal API."""
        url = f"{self.core_service_url}/api/v1/internal/skills/{skill_id}"
        
        headers = {
            "X-API-Key": self.core_service_api_key,  # API key, NOT JWT token
            "Content-Type": "application/json",
        }
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                response = await client.get(url, headers=headers)
                response.raise_for_status()
                
                data = response.json()
                if data.get("errorCode") != "0000":
                    raise ExternalServiceException(
                        f"Failed to fetch skill: {data.get('errorDetail', 'Unknown error')}"
                    )
                
                skill = data.get("data", {})
                return {
                    "id": skill.get("id"),
                    "name": skill.get("name"),
                    "code": skill.get("code"),
                    "chapter": skill.get("chapter"),
                    "description": skill.get("description", ""),
                    "prerequisite_ids": skill.get("prerequisiteIds", []),
                }
            except httpx.HTTPStatusError as e:
                if e.response.status_code == 401:
                    raise ExternalServiceException(
                        "Unauthorized: Invalid API key for Core Service"
                    )
                elif e.response.status_code == 404:
                    raise ExternalServiceException(f"Skill not found: {skill_id}")
                else:
                    raise ExternalServiceException(
                        f"Core Service error: {e.response.status_code}"
                    )
            except httpx.TimeoutException:
                raise ExternalServiceException("Core Service timeout")
            except Exception as e:
                raise ExternalServiceException(f"Failed to fetch skill: {str(e)}")
    
    async def _load_prompt_template(self, template_name: str) -> dict[str, Any]:
        """Load prompt template from Core Service using internal API."""
        headers = {
            "X-API-Key": self.core_service_api_key,
            "Content-Type": "application/json",
        }
        
        async with httpx.AsyncClient(timeout=10.0) as client:
            # Try to get template by name first (most efficient)
            try:
                url = f"{self.core_service_url}/api/v1/internal/prompt-templates/by-name/{template_name}"
                response = await client.get(url, headers=headers)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("errorCode") == "0000":
                        template = data.get("data", {})
                        return {
                            "id": template.get("id"),
                            "name": template.get("name"),
                            "system_prompt": template.get("systemPrompt"),
                            "user_prompt_template": template.get("userPromptTemplate"),
                            "output_format_schema": template.get("outputFormatSchema"),
                        }
            except Exception as e:
                logger.warning(f"Failed to get template by name {template_name}: {str(e)}")
            
            # Fallback: Get all active templates
            try:
                url = f"{self.core_service_url}/api/v1/internal/prompt-templates/active"
                response = await client.get(url, headers=headers)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("errorCode") == "0000":
                        templates = data.get("data", [])
                        for template in templates:
                            if template.get("name") == template_name:
                                return {
                                    "id": template.get("id"),
                                    "name": template.get("name"),
                                    "system_prompt": template.get("systemPrompt"),
                                    "user_prompt_template": template.get("userPromptTemplate"),
                                    "output_format_schema": template.get("outputFormatSchema"),
                                }
            except Exception as e:
                logger.warning(f"Failed to get active templates: {str(e)}")
            
            # Final fallback to default template
            logger.warning(f"Failed to load template {template_name}, using defaults")
            return self._get_default_template()
```

### Best Practices

1. **Luôn dùng Internal Endpoints**: 
   - ✅ `GET /api/v1/internal/skills/{id}`
   - ❌ `GET /api/v1/admin/skills/{id}` (sẽ bị 401 Unauthorized)

2. **API Key Header**:
   - ✅ `X-API-Key: {core_service_api_key}`
   - ❌ `Authorization: Bearer {token}` (không cần JWT cho internal calls)

3. **Error Handling**:
   - Parse response body để lấy error message chi tiết
   - Map HTTP status codes sang custom exceptions
   - Log đầy đủ context (request_id, endpoint, status_code)

4. **Timeout & Retry**:
   - Set timeout rõ ràng (ví dụ 10s cho internal calls)
   - Implement retry logic cho transient errors (5xx, timeout)
   - Không retry cho 4xx errors (client errors)

5. **Logging**:
   - Log request/response ở mức INFO cho internal calls
   - **Không log API key** trong logs
   - Include request_id trong mọi log message

### Configuration

API key được cấu hình trong `src/core/config.py`:

```python
# Development
DEV_CORE_SERVICE_URL = "http://localhost:6889"
DEV_CORE_SERVICE_API_KEY = "internal-api-key-12345"

# Production
PROD_CORE_SERVICE_URL = "http://localhost:6889"
PROD_CORE_SERVICE_API_KEY = "internal-api-key-12345"  # Should use env var
```

**Lưu ý**: Trong production, API key nên được lưu trong environment variables, không hardcode trong config file.

[← Quay lại Overview](README.md)

