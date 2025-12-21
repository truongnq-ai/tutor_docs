# API design & FastAPI
[← Quay lại Overview](overview.md)

## HTTP & URL

- HTTP method: dùng RESTful methods phù hợp với từng action
  - GET: Truy vấn đơn giản (health check, status)
  - POST: Xá»­ lÃ½ (OCR, solve, hint, recommend)
- URL chuẩn: `/internal/ai/<resource>`  
  Ví dụ: `/internal/ai/ocr`, `/internal/ai/solve`, `/internal/ai/hint`, `/internal/ai/recommend`
- Tất cả endpoints lÃ  internal, chỉ Core Service cÃ³ thá»ƒ gá»i.

## Request/Response chuẩn

- Body request: Pydantic schema trong `src/presentation/api/schemas/`; validation tự động bởi FastAPI.
- Response: JSON response với `errorCode`/`errorDetail`/`data`; mã lỗi lấy từ errorCode convention (0000-9999).
- Kết hợp HTTP status codes chuẩn với errorCode trong response.
- Luồng lỗi: ném custom exception trong service; middleware catch và  map sang response với errorCode và  HTTP status tương ứng.

## Response Format

### Success Response

```python
{
    "errorCode": "0000",        # Optional - mã thÃ nh cÃ´ng
    "errorDetail": "Operation successful",  # Optional - mô tả thÃ nh cÃ´ng
    "data": {...}               # Dữ liệu tráº£ vá»
}
# HTTP 200
```

### Error Response

```python
{
    "errorCode": "0001",        # Bắt buộc - mã lỗi từ "0001" Ä‘áº¿n "9999"
    "errorDetail": "MÃ´ táº£ mã lỗi",  # Bắt buộc - mô tả chính xác mã lỗi
    "data": null                # Optional - cÃ³ thá»ƒ null hoáº·c chá»©a thÃ´ng tin bổ sung
}
# HTTP 401/400/403/404/500
```

## Error Code Convention

### Error Code Ranges

- **"0000"**: Thành công (optional trong success response)
- **"0001" - "0999"**: Lá»—i nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lá»—i xác thực và  phân quyền (Authentication & Authorization)
- **"2000" - "2999"**: Lá»—i validation (Validation errors)
- **"3000" - "3999"**: Lá»—i tÃ i nguyÃªn (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lá»—i tích hợp dịch vụ (Service integration errors)
- **"5000" - "5999"**: Lá»—i hệ thống (System errors)
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
    errorCode: str = Field(..., description="MÃ£ lỗi (0000-9999)")
    errorDetail: str = Field(..., description="MÃ´ táº£ mã lỗi")
    data: Optional[T] = Field(None, description="Dữ liệu tráº£ vá»")
    
    class Config:
        json_schema_extra = {
            "example": {
                "errorCode": "0000",
                "errorDetail": "Operation successful",
                "data": {
                    "problem_text": "TÃ­nh: 2/3 + 1/4",
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
    description="Nháº­n dáº¡ng và  trÃ­ch xuáº¥t bài toán từ ảnh",
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

- Sá»­ dá»¥ng `summary` và  `description` trong route decorator.
- Sá»­ dá»¥ng `response_model` với Pydantic schemas.
- Bá»• sung `examples` trong Pydantic schemas.
- Document errorCode trong response models với examples.

### Ví dụ OpenAPI

```python
@router.post(
    "/solve",
    summary="Solve math problem",
    description="Giáº£i bài toán theo từng bÆ°á»›c với giáº£i thÃ­ch",
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

- Náº¿u cần version, chÃ¨n và o path sau `/internal/ai` (và­ dá»¥ `/internal/ai/v1/...`); giá»¯ nguyÃªn format resource.
- CÃ¡c header Ä‘áº·c thÃ¹ (API key, trace id) cần Ä‘Æ°á»£c mô tả trong tÃ i liá»‡u chi tiáº¿t của service.
- Internal API key: Sá»­ dá»¥ng header `X-API-Key` cho authentication với Core Service.

[←‘ Quay lại Overview](overview.md)

# Clean Architecture patterns
[← Quay lại Overview](overview.md)

## NguyÃªn táº¯c Clean Architecture

1. **Separation of Concerns**: á»¨ng dá»¥ng Ä‘Æ°á»£c chia thÃ nh cÃ¡c layers riÃªng biá»‡t, má»—i layer cÃ³ trÃ¡ch nhiá»‡m cá»¥ thá»ƒ.
2. **Dependency Rule**: Dependencies point inwards. Inner layers khÃ´ng biáº¿t vá» outer layers.
3. **Abstraction**: Sá»­ dá»¥ng interfaces và  abstract classes để định nghĩa boundaries giá»¯a cÃ¡c layers.
4. **Testability**: Kiáº¿n trÃºc tạo Ä‘iá»u kiá»‡n dá»… dÃ ng test business logic Ä‘á»™c láº­p với external concerns.
5. **Stateless Design**: Service lÃ  stateless và  cÃ³ thá»ƒ scale ngang.

## Layers

### 1. Domain Layer (`src/domain/`)

**Responsibility**: Chá»©a business entities và  value objects, khÃ´ng phá»¥ thuá»™c và o framework.

**Key Components:**
- `entities/`: Core business entities (MathProblem, Solution, SkillRecommendation)
- KhÃ´ng cÃ³ dependencies ra ngoÃ i
- Pure Python classes, khÃ´ng cÃ³ framework-specific code

**Example:**

```python
# src/domain/entities/math_problem.py
from dataclasses import dataclass
from typing import List

@dataclass
class MathProblem:
    problem_text: str
    grade: int
    image_url: Optional[str] = None
    latex: Optional[str] = None
    confidence: float = 0.0
```

### 2. Application Layer (`src/application/`)

**Responsibility**: Chá»©a use cases và  service interfaces.

**Key Components:**
- `interfaces/`: Abstractions cho services (IOCRService, IMathSolverService, etc.)
- `use_cases/`: Use case implementations (náº¿u cÃ³)

**Example:**

```python
# src/application/interfaces/ocr_service.py
from abc import ABC, abstractmethod
from src.domain.entities.math_problem import MathProblem

class IOCRService(ABC):
    @abstractmethod
    async def extract_text(self, image_url: str) -> MathProblem:
        """Extract math problem from image URL"""
        pass
```

### 3. Infrastructure Layer (`src/infrastructure/`)

**Responsibility**: Chá»©a implementations của interfaces và  external service integrations.

**Key Components:**
- `services/`: Service implementations (PaddleOCR, SymPy solver, OpenAI client, AdaptiveEngine)
- `providers/`: AI provider implementations (OpenAI, Gemini, Grok, Local AI)
- `cache/`: Redis cache implementation

**Example:**

```python
# src/infrastructure/services/ocr_service.py
from src.application.interfaces.ocr_service import IOCRService
from src.domain.entities.math_problem import MathProblem
from paddleocr import PaddleOCR

class OCRService(IOCRService):
    def __init__(self):
        self.ocr = PaddleOCR(use_angle_cls=True, lang='vi')
    
    async def extract_text(self, image_url: str) -> MathProblem:
        # Implementation using PaddleOCR
        result = self.ocr.ocr(image_url)
        # Process result and return MathProblem
        return MathProblem(...)
```

### 4. Presentation Layer (`src/presentation/`)

**Responsibility**: Xá»­ lÃ½ HTTP requests và  responses.

**Key Components:**
- `api/routes/`: FastAPI route handlers cho má»—i endpoint
- `api/schemas/`: Pydantic schemas cho request/response validation
- `api/middleware/`: Error handling middleware
- `main.py`: FastAPI app entry point

**Example:**

```python
# src/presentation/api/routes/ocr.py
from fastapi import APIRouter, Depends
from src.presentation.api.schemas.ocr import OCRRequest, OCRResponse
from src.application.interfaces.ocr_service import IOCRService

router = APIRouter(prefix="/internal/ai", tags=["OCR"])

@router.post("/ocr")
async def ocr(
    request: OCRRequest,
    ocr_service: IOCRService = Depends(get_ocr_service)
):
    result = await ocr_service.extract_text(request.image_url)
    return OCRResponse.from_domain(result)
```

## Dependency Flow

```
Presentation ←’ Application ←’ Domain ← Infrastructure
```

- Presentation layer depends on Application layer (interfaces)
- Application layer depends on Domain layer
- Infrastructure layer depends on Application layer (implements interfaces) and Domain layer
- Domain layer has no dependencies

## Dependency Injection

- Sá»­ dá»¥ng FastAPI's `Depends()` cho dependency injection.
- Táº¡o factory functions để provide service instances.

**Example:**

```python
# src/presentation/api/dependencies.py
from functools import lru_cache
from src.application.interfaces.ocr_service import IOCRService
from src.infrastructure.services.ocr_service import OCRService

@lru_cache()
def get_ocr_service() -> IOCRService:
    return OCRService()
```

## Interface Segregation

- Má»—i service interface chỉ định nghĩa methods cần thiáº¿t cho má»™t responsibility.
- KhÃ´ng tạo "god interface" với quÃ¡ nhiá»u methods.

**Example:**

```python
# Good: Focused interface
class IOCRService(ABC):
    @abstractmethod
    async def extract_text(self, image_url: str) -> MathProblem:
        pass

# Bad: Too many responsibilities
class IMathService(ABC):
    @abstractmethod
    async def ocr(self, ...): pass
    
    @abstractmethod
    async def solve(self, ...): pass
    
    @abstractmethod
    async def hint(self, ...): pass
```

## Testing Strategy

- **Unit Tests**: Test domain entities và  business logic Ä‘á»™c láº­p.
- **Integration Tests**: Test service implementations với mocks.
- **E2E Tests**: Test API endpoints với test database/services.

**Example Unit Test:**

```python
# tests/unit/test_math_problem.py
def test_math_problem_creation():
    problem = MathProblem(
        problem_text="TÃ­nh: 2/3 + 1/4",
        grade=6
    )
    assert problem.grade == 6
    assert problem.problem_text == "TÃ­nh: 2/3 + 1/4"
```

[←‘ Quay lại Overview](overview.md)

# Kiá»ƒm tra cháº¥t lÆ°á»£ng code & lÃ m sáº¡ch
[← Quay lại Overview](overview.md)

## Má»¥c Ä‘Ã­ch

Äáº£m báº£o code khÃ´ng cÃ³ lỗi syntax, warning, và  loáº¡i bá» cÃ¡c import khÃ´ng sử dụng để duy trÃ¬ cháº¥t lÆ°á»£ng code và  dá»… báº£o trÃ¬.

## Quy trÃ¬nh thá»±c hiá»‡n

### BÆ°á»›c 1: Kiá»ƒm tra lỗi syntax và  Python

- Cháº¡y linter/type checker để phÃ¡t hiá»‡n:
  - Lá»—i syntax Python
  - Lá»—i type checking (mypy)
  - Warning từ Python linter (ruff, flake8)
  - Warning từ IDE (PyCharm, VS Code)
- CÃ´ng cá»¥ kiểm tra:
  - IDE linter (PyCharm inspections, VS Code Python extension)
  - `python -m py_compile <file>` hoáº·c `python -m compileall`
  - `mypy src/` (type checking)
  - `ruff check src/` hoáº·c `flake8 src/`
- **YÃªu cáº§u**: KhÃ´ng cÃ³ lỗi (errors) trÆ°á»›c khi tiáº¿p tá»¥c.

### BÆ°á»›c 2: Sá»­a lỗi và  warning

- **Æ¯u tiÃªn sá»­a**:
  1. Lá»—i syntax
  2. Lá»—i type checking
  3. Warning nghiÃªm trá»ng từ linter (unused variables, undefined names)
  4. Warning khÃ¡c (deprecated methods, type hints missing)
- **CÃ¡c lỗi thÆ°á»ng gáº·p**:
  - `NameError`: TÃªn khÃ´ng Ä‘Æ°á»£c định nghĩa
  - `TypeError`: Type khÃ´ng khớp
  - `AttributeError`: Attribute khÃ´ng tồn tại
  - `ImportError`: Import khÃ´ng tÃ¬m tháº¥y
  - Missing type hints
- **NguyÃªn táº¯c sá»­a**:
  - Sá»­a Ä‘Ãºng nguyÃªn nhÃ¢n, khÃ´ng chỉ che lỗi
  - Giá»¯ type safety với type hints
  - TuÃ¢n thá»§ coding standards của dá»± Ã¡n

### BÆ°á»›c 3: Kiá»ƒm tra và  xÃ³a unused imports

- **Kiá»ƒm tra**:
  - Import khÃ´ng Ä‘Æ°á»£c sử dụng trong file
  - Import chỉ xuáº¥t hiá»‡n trong khai bÃ¡o nhÆ°ng khÃ´ng Ä‘Æ°á»£c dùng
  - Import từ `__future__` khÃ´ng cần thiáº¿t
- **CÃ¡ch xÃ¡c Ä‘á»‹nh**:
  - Dùng IDE (PyCharm tự động gáº¡ch xÃ¡m unused imports)
  - Dùng `ruff check --select F401` để tÃ¬m unused imports
  - TÃ¬m kiáº¿m tÃªn module/class trong file
- **XÃ³a**:
  - XÃ³a import statement khÃ´ng sử dụng
  - XÃ³a unused `from ... import ...`
  - KhÃ´ng xÃ³a `__init__.py` imports náº¿u cần cho package structure
- **LÆ°u Ã½**:
  - KhÃ´ng xÃ³a import dùng trong type hints (`from typing import ...`)
  - KhÃ´ng xÃ³a import dùng trong annotations
  - KhÃ´ng xÃ³a import dùng trong decorators

### BÆ°á»›c 4: Kiá»ƒm tra unused code

- **Kiá»ƒm tra**:
  - Unused functions/classes
  - Unused variables trong function
  - Dead code (code khÃ´ng bao giá» Ä‘Æ°á»£c gá»i)
- **Xá»­ lÃ½**:
  - XÃ³a code khÃ´ng sử dụng (náº¿u cháº¯c cháº¯n)
  - Comment code náº¿u cÃ³ thá»ƒ cần sau nÃ y (và  thÃªm TODO)
  - Refactor náº¿u code bá»‹ duplicate

### BÆ°á»›c 5: XÃ¡c minh lại

- Sau khi sá»­a:
  1. Cháº¡y lại `ruff check src/` hoáº·c `flake8 src/`
  2. Cháº¡y lại `mypy src/` (náº¿u cÃ³)
  3. Äáº£m báº£o khÃ´ng cÃ²n lỗi/warning
  4. Äáº£m báº£o khÃ´ng cÃ²n unused imports
  5. Kiá»ƒm tra code váº«n hoáº¡t Ä‘á»™ng Ä‘Ãºng (náº¿u cÃ³ thá»ƒ test nhanh)

## Thá»© tá»± Æ°u tiÃªn

```
1. Lá»—i Syntax (Errors)
   ←“
2. Lá»—i Type Checking (Type Errors)
   ←“
3. Warning nghiÃªm trá»ng từ Linter (Critical Warnings)
   ←“
4. Warning khÃ¡c (Warnings)
   ←“
5. XÃ³a Unused Imports
   ←“
6. XÃ³a Unused Code
   ←“
7. XÃ¡c minh lại (Verification)
```

## Checklist sau khi chỉnh sá»­a file

- [ ] KhÃ´ng cÃ³ lỗi syntax
- [ ] KhÃ´ng cÃ³ lỗi type checking (mypy)
- [ ] KhÃ´ng cÃ³ warning nghiÃªm trá»ng từ linter
- [ ] ÄÃ£ xÃ³a táº¥t cáº£ unused imports
- [ ] ÄÃ£ xÃ³a unused code (náº¿u cÃ³)
- [ ] Code váº«n hoáº¡t Ä‘á»™ng Ä‘Ãºng (náº¿u cÃ³ thá»ƒ test)
- [ ] File Ä‘Ã£ Ä‘Æ°á»£c format Ä‘Ãºng chuẩn (black, isort)

## Ví dụ minh há»a

### TrÆ°á»›c khi sá»­a:

```python
import os  # Unused import
import sys  # Unused import
from typing import List, Dict, Optional
from fastapi import APIRouter, Depends
from src.application.interfaces.ocr_service import IOCRService

router = APIRouter()

def unused_function():  # Warning: unused function
    pass

async def ocr_endpoint(service: IOCRService = Depends(get_service)):
    result = await service.extract_text("url")
    return result
```

### Sau khi sá»­a:

```python
from typing import Optional
from fastapi import APIRouter, Depends
from src.application.interfaces.ocr_service import IOCRService

router = APIRouter()

async def ocr_endpoint(service: IOCRService = Depends(get_service)):
    result = await service.extract_text("url")
    return result
```

## CÃ´ng cá»¥ há»— trá»£

- **IDE**: PyCharm inspections, VS Code Python extension
- **Linters**: `ruff`, `flake8`, `pylint`
- **Type Checkers**: `mypy`
- **Formatters**: `black`, `isort`
- **Auto-fix**: `ruff check --fix`, IDE cÃ³ thá»ƒ tá»± xÃ³a má»™t sá»‘ unused imports

## LÆ°u Ã½ quan trá»ng

1. **KhÃ´ng bá» qua warning**: Má»™t sá»‘ warning cÃ³ thá»ƒ dáº«n Ä‘áº¿n lỗi runtime
2. **KhÃ´ng xÃ³a import vá»™i**: Kiá»ƒm tra ká»¹ trÆ°á»›c khi xÃ³a, Ä‘áº·c biá»‡t với type hints
3. **Type hints**: LuÃ´n sử dụng type hints cho functions và  methods
4. **Test sau khi sá»­a**: Äáº£m báº£o chá»©c nÄƒng váº«n hoáº¡t Ä‘á»™ng
5. **Commit riÃªng**: TÃ¡ch commit sá»­a lỗi và  commit xÃ³a unused imports để dá»… review
6. **Async/await**: Äáº£m báº£o async functions Ä‘Æ°á»£c gá»i Ä‘Ãºng cÃ¡ch

[←‘ Quay lại Overview](overview.md)

# Cáº¥u trÃºc code & đặt tÃªn
[← Quay lại Overview](overview.md)

## Package & layer (Clean Architecture)

- `src/domain/entities`: Domain entities và  value objects, khÃ´ng phá»¥ thuá»™c và o framework.
- `src/application/interfaces`: Service interfaces (abstract classes) định nghĩa contracts.
- `src/application/use_cases`: Use cases cho business logic (náº¿u cÃ³).
- `src/infrastructure/services`: Service implementations (OCR, MathSolver, HintGenerator, AdaptiveLearning).
- `src/infrastructure/providers`: AI provider implementations (OpenAI, Gemini, Grok, Local AI).
- `src/infrastructure/cache`: Redis cache implementation.
- `src/presentation/api/routes`: FastAPI route handlers cho má»—i endpoint.
- `src/presentation/api/schemas`: Pydantic schemas cho request/response validation.
- `src/presentation/api/middleware`: Error handling middleware.
- `src/presentation/main.py`: FastAPI app entry point.
- `src/core`: Core utilities (config, exceptions, logging).
- `src/common`: Shared utilities.

## Äáº·t tÃªn class/file

- TÃªn class pháº£n Ã¡nh vai trÃ²: `*Service`, `*Provider`, `*Repository`, `*Request`, `*Response`, `*Entity`.
- Files: `snake_case.py` (và­ dá»¥: `ocr_service.py`, `math_solver_service.py`).
- Classes: `PascalCase` (và­ dá»¥: `OCRService`, `MathSolverService`).
- Functions: `snake_case` (và­ dá»¥: `solve_problem`, `extract_text`).
- Constants: `UPPER_SNAKE_CASE` (và­ dá»¥: `MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEOUT`).
- KhÃ´ng đặt tÃªn viáº¿t táº¯t khÃ³ hiá»ƒu; Æ°u tiÃªn tÃªn nghiệp vụ rÃµ rÃ ng.

## NguyÃªn táº¯c chung khi viáº¿t code

- KhÃ´ng hardcode string/number láº·p lại; Ä‘Æ°a và o constants hoáº·c config.
- Validate Ä‘áº§u và o báº±ng Pydantic schemas; ném custom exception với errorCode tương ứng.
- Sá»­ dá»¥ng type hints cho táº¥t cáº£ functions và  methods.
- Sá»­ dá»¥ng dataclasses hoáº·c Pydantic models cho data structures.
- KhÃ´ng truy cáº­p trá»±c tiáº¿p infrastructure trong domain layer; má»i logic qua application layer.

## Logging

- Dùng Python logging module, logger tạo với `logging.getLogger(__name__)`.
- Log error á»Ÿ route/service khi catch Exception; trÃ¡nh log láº·p stack trace nhiá»u táº§ng.
- KhÃ´ng log dá»¯ liá»‡u nháº¡y cáº£m (API keys, tokens), chỉ log request ID, errorCode náº¿u cÃ³.

## Response & Exception

- Tất cả API tráº£ response dict với `errorCode`/`errorDetail`/`data`; sử dụng `JSONResponse` với HTTP status tương ứng.
- Custom exception mang theo errorCode; middleware báº¯t và  map tháº³ng ra response với HTTP status tương ứng.
- Kết hợp HTTP status codes chuẩn (200/400/401/403/404/500) với errorCode trong response.

## OpenAPI/Swagger

- Má»—i API cÃ³ `summary` và  `description` trong route decorator.
- Sá»­ dá»¥ng `response_model` với Pydantic schemas.
- Bá»• sung `examples` trong Pydantic schemas để minh há»a request/response.
- Document errorCode trong response models.

## TÃªn API & HTTP method

- Dùng RESTful methods: GET (truy váº¥n), POST (tạo má»›i/xử lý), PUT (cáº­p nháº­t), DELETE (xÃ³a).
- URL chuẩn: `/internal/ai/<resource>`; trÃ¡nh dáº¥u "/" thá»«a.
- Resource lÃ  danh từ rÃµ nghÄ©a: `/internal/ai/ocr`, `/internal/ai/solve`, `/internal/ai/hint`, `/internal/ai/recommend`.

## Ví dụ thÃªm má»›i má»™t OCR endpoint

- **Schema**: tạo `src/presentation/api/schemas/ocr.py` với `OCRRequest` và  `OCRResponse` (Pydantic models).
- **Service Interface**: `src/application/interfaces/ocr_service.py` định nghĩa `IOCRService` (abstract class).
- **Service Implementation**: `src/infrastructure/services/ocr_service.py` implement `IOCRService`.
- **Route**: `src/presentation/api/routes/ocr.py` với endpoint `POST /internal/ai/ocr`.
- **Error Handling**: Middleware trong `src/presentation/api/middleware/error_handler.py` xử lý exceptions và  map sang response với errorCode.
- **OpenAPI**: Sá»­ dá»¥ng `@router.post` với `summary`, `description`, `response_model`, và  `examples`.

## TÃ i liá»‡u liÃªn quan

- [API design & FastAPI](api-design.md)
- [Clean Architecture patterns](clean-architecture.md)
- [Kiá»ƒm tra cháº¥t lÆ°á»£ng code](code-quality.md)

[←‘ Quay lại Overview](overview.md)

# Tá»•ng quan quy táº¯c chung - Python/FastAPI

TÃ i liá»‡u nÃ y thá»‘ng kÃª ngáº¯n gá»n cÃ¡c quy táº¯c báº¯t buá»™c cho backend Python/FastAPI của hệ thống Tutor. Chi tiáº¿t từng máº£ng náº±m trong cÃ¡c file chuyÃªn Ä‘á» Ä‘Æ°á»£c liÃªn káº¿t bÃªn dÆ°á»›i.

## NguyÃªn táº¯c cá»‘t lÃµi

- TuÃ¢n thá»§ coding convention chuẩn của Python (PEP 8), FastAPI best practices, và  cÃ¡c hÆ°á»›ng dáº«n style Ä‘Ã£ cÃ´ng bá»‘.
- Dùng format response với `errorCode`/`errorDetail`/`data` káº¿t há»£p với HTTP status codes chuẩn cho táº¥t cáº£ API endpoints.
- API dùng phÆ°Æ¡ng thá»©c RESTful (GET/POST/PUT/DELETE) phù hợp với từng action; URL chuẩn hÃ³a dáº¡ng `/internal/ai/<resource>` (và­ dá»¥: `/internal/ai/ocr`, `/internal/ai/solve`).
- Cáº¥u trÃºc package theo Clean Architecture: `src/domain`, `src/application`, `src/infrastructure`, `src/presentation`, `src/core`, `src/common`.
- Äáº·t tÃªn theo PEP 8: `snake_case` cho files/functions/variables, `PascalCase` cho classes, `UPPER_SNAKE_CASE` cho constants.
- Logging dùng Python logging module; log lỗi táº¡i route/service, khÃ´ng log trÃ n stack trace nhiá»u láº§n.
- OpenAPI/Swagger pháº£i cÃ³ `description` + `response_model` với errorCode examples và  thÃªm `request/response example`.
- HTTP client cho external services cÃ³ guideline vá» timeout, retry, circuit breaker, và  quy táº¯c errorCode mapping.

## Response Format

### Response Structure

Tất cả API tráº£ vá» response với cấu trúc:

```python
# Success Response
{
    "errorCode": "0000",        # Optional - mã thÃ nh cÃ´ng
    "errorDetail": "Operation successful",  # Optional - mô tả thÃ nh cÃ´ng
    "data": {...}               # Dữ liệu tráº£ vá»
}
# HTTP 200

# Error Response
{
    "errorCode": "0001",        # Bắt buộc - mã lỗi từ "0001" Ä‘áº¿n "9999"
    "errorDetail": "MÃ´ táº£ mã lỗi",  # Bắt buộc - mô tả chính xác mã lỗi
    "data": null                # Optional - cÃ³ thá»ƒ null hoáº·c chá»©a thÃ´ng tin bổ sung
}
# HTTP 401/400/403/404/500
```

### Error Code Convention

- **"0000"**: Thành công (optional trong success response)
- **"0001" - "0999"**: Lá»—i nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lá»—i xác thực và  phân quyền (Authentication & Authorization)
- **"2000" - "2999"**: Lá»—i validation (Validation errors)
- **"3000" - "3999"**: Lá»—i tÃ i nguyÃªn (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lá»—i tích hợp dịch vụ (Service integration errors)
- **"5000" - "5999"**: Lá»—i hệ thống (System errors)
- **"6000" - "9999"**: Reserved cho tương lai

### HTTP Status Codes

- HTTP 200: Success (errorCode "0000" hoáº·c khÃ´ng cÃ³)
- HTTP 400: Bad Request (errorCode 2xxx - validation errors)
- HTTP 401: Unauthorized (errorCode 1xxx - authentication errors)
- HTTP 403: Forbidden (errorCode 1xxx - authorization errors)
- HTTP 404: Not Found (errorCode 3xxx - resource not found)
- HTTP 500: Internal Server Error (errorCode 5xxx - system errors)

## Má»¥c chi tiáº¿t

- [`code-structure.md` - Cáº¥u trÃºc code & đặt tÃªn](code-structure.md)
- [`api-design.md` - API design & FastAPI](api-design.md)
- [`clean-architecture.md` - Clean Architecture patterns](clean-architecture.md)
- [`code-quality.md` - Kiá»ƒm tra cháº¥t lÆ°á»£ng code & lÃ m sáº¡ch](code-quality.md)

## Pháº¡m vi Ã¡p dá»¥ng

- Ãp dá»¥ng cho module Python/FastAPI: `tutor-ai-service`
- Package base: `src.*` (theo Clean Architecture)

## KhÃ´ng náº±m trong pháº¡m vi

- Quy táº¯c front-end (Next.js, Flutter cÃ³ tÃ i liá»‡u riÃªng).
- Quy táº¯c háº¡ táº§ng CI/CD (chỉ Ä‘á» cáº­p timeout/retry á»Ÿ má»©c service).

