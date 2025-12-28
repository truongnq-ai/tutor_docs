# Clean Architecture patterns
[← Quay lại Overview](README.md)

## Nguyên tắc Clean Architecture

1. **Separation of Concerns**: Ứng dụng được chia thành các layers riêng biệt, mỗi layer có trách nhiệm cụ thể.
2. **Dependency Rule**: Dependencies point inwards. Inner layers không biết về outer layers.
3. **Abstraction**: Sử dụng interfaces và abstract classes để định nghĩa boundaries giữa các layers.
4. **Testability**: Kiến trúc tạo điều kiện dễ dàng test business logic độc lập với external concerns.
5. **Stateless Design**: Service là stateless và có thể scale ngang.

## Layers

### 1. Domain Layer (`src/domain/`)

**Responsibility**: Chứa business entities và value objects, không phụ thuộc vào framework.

**Key Components:**
- `entities/`: Core business entities (MathProblem, Solution, SkillRecommendation)
- Không có dependencies ra ngoài
- Pure Python classes, không có framework-specific code

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

**Responsibility**: Chứa use cases và service interfaces.

**Key Components:**
- `interfaces/`: Abstractions cho services (IOCRService, IMathSolverService, etc.)
- `use_cases/`: Use case implementations (nếu có)

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

**Responsibility**: Chứa implementations của interfaces và external service integrations.

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

**Responsibility**: Xử lý HTTP requests và responses.

**Key Components:**
- `api/routes/`: FastAPI route handlers cho mỗi endpoint
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
Presentation → Application → Domain ← Infrastructure
```

- Presentation layer depends on Application layer (interfaces)
- Application layer depends on Domain layer
- Infrastructure layer depends on Application layer (implements interfaces) and Domain layer
- Domain layer has no dependencies

## Dependency Injection

- Sử dụng FastAPI's `Depends()` cho dependency injection.
- Tạo factory functions để provide service instances.

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

- Mỗi service interface chỉ định nghĩa methods cần thiết cho một responsibility.
- Không tạo "god interface" với quá nhiều methods.

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

- **Unit Tests**: Test domain entities và business logic độc lập.
- **Integration Tests**: Test service implementations với mocks.
- **E2E Tests**: Test API endpoints với test database/services.

**Example Unit Test:**

```python
# tests/unit/test_math_problem.py
def test_math_problem_creation():
    problem = MathProblem(
        problem_text="Tính: 2/3 + 1/4",
        grade=6
    )
    assert problem.grade == 6
    assert problem.problem_text == "Tính: 2/3 + 1/4"
```

[← Quay lại Overview](README.md)

