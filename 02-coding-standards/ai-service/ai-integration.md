# AI INTEGRATION - CODING STANDARDS

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả coding standards cho AI integration - Core ↔ AI contract, retry, timeout.

## Core ↔ AI Contract

### Request Format
```json
{
  "skill_id": "uuid",
  "skill_name": "string",
  "difficulty_level": 1-5,
  "count": 5
}
```

### Response Format
```json
{
  "errorCode": "0000",
  "errorDetail": "Success",
  "data": {
    "questions": [...]
  }
}
```

### Error Codes
- `4000-4999`: AI Service errors
- `4001`: AI Service timeout
- `4002`: AI Service unavailable
- `4003`: Invalid AI response

## Retry Strategy

### Exponential Backoff
```python
import asyncio
from typing import Callable, Any

async def retry_with_backoff(
    func: Callable,
    max_retries: int = 3,
    initial_delay: float = 1.0,
    backoff_factor: float = 2.0
) -> Any:
    delay = initial_delay
    for attempt in range(max_retries):
        try:
            return await func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            await asyncio.sleep(delay)
            delay *= backoff_factor
```

### Retry Conditions
- Network errors: Retry
- Timeout errors: Retry
- 5xx errors: Retry
- 4xx errors: Don't retry (client error)

## Timeout Configuration

### Default Timeouts
- **Short operations**: 5 seconds (OCR, simple queries)
- **Medium operations**: 15 seconds (exercise generation)
- **Long operations**: 30 seconds (complex analysis)

### Implementation
```python
import httpx

async def call_ai_service(url: str, data: dict, timeout: float = 15.0):
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(url, json=data)
        return response.json()
```

## Circuit Breaker

### Pattern
```python
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, timeout: float = 60.0):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED
    
    async def call(self, func):
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise CircuitBreakerOpenError()
        
        try:
            result = await func()
            if self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.CLOSED
                self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()
            if self.failure_count >= self.failure_threshold:
                self.state = CircuitState.OPEN
            raise
```

## Error Handling

### AI Service Errors
```python
class AIServiceError(Exception):
    def __init__(self, error_code: str, error_detail: str):
        self.error_code = error_code
        self.error_detail = error_detail
        super().__init__(f"{error_code}: {error_detail}")

# Usage
try:
    result = await call_ai_service(...)
except AIServiceError as e:
    if e.error_code == "4001":
        # Timeout - retry
        result = await retry_with_backoff(...)
    elif e.error_code == "4002":
        # Unavailable - use fallback
        result = get_fallback_response()
```

## Tài liệu liên quan

- [Python Standards](./python.md)
- [Prompt Structure](./prompt-structure.md)
- [API Contracts - AI Service](../../08-api-contracts/ai-service/)

---

← Quay lại: [README.md](../README.md)

