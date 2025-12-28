# Kiểm tra chất lượng code & làm sạch
[← Quay lại Overview](README.md)

## Mục đích

Đảm bảo code không có lỗi syntax, warning, và loại bỏ các import không sử dụng để duy trì chất lượng code và dễ bảo trì.

## Quy trình thực hiện

### Bước 1: Kiểm tra lỗi syntax và Python

- Chạy linter/type checker để phát hiện:
  - Lỗi syntax Python
  - Lỗi type checking (mypy)
  - Warning từ Python linter (ruff, flake8)
  - Warning từ IDE (PyCharm, VS Code)
- Công cụ kiểm tra:
  - IDE linter (PyCharm inspections, VS Code Python extension)
  - `python -m py_compile <file>` hoặc `python -m compileall`
  - `mypy src/` (type checking)
  - `ruff check src/` hoặc `flake8 src/`
- **Yêu cầu**: Không có lỗi (errors) trước khi tiếp tục.

### Bước 2: Sửa lỗi và warning

- **Ưu tiên sửa**:
  1. Lỗi syntax
  2. Lỗi type checking
  3. Warning nghiêm trọng từ linter (unused variables, undefined names)
  4. Warning khác (deprecated methods, type hints missing)
- **Các lỗi thường gặp**:
  - `NameError`: Tên không được định nghĩa
  - `TypeError`: Type không khớp
  - `AttributeError`: Attribute không tồn tại
  - `ImportError`: Import không tìm thấy
  - Missing type hints
- **Nguyên tắc sửa**:
  - Sửa đúng nguyên nhân, không chỉ che lỗi
  - Giữ type safety với type hints
  - Tuân thủ coding standards của dự án

### Bước 3: Kiểm tra và xóa unused imports

- **Kiểm tra**:
  - Import không được sử dụng trong file
  - Import chỉ xuất hiện trong khai báo nhưng không được dùng
  - Import từ `__future__` không cần thiết
- **Cách xác định**:
  - Dùng IDE (PyCharm tự động gạch xám unused imports)
  - Dùng `ruff check --select F401` để tìm unused imports
  - Tìm kiếm tên module/class trong file
- **Xóa**:
  - Xóa import statement không sử dụng
  - Xóa unused `from ... import ...`
  - Không xóa `__init__.py` imports nếu cần cho package structure
- **Lưu ý**:
  - Không xóa import dùng trong type hints (`from typing import ...`)
  - Không xóa import dùng trong annotations
  - Không xóa import dùng trong decorators

### Bước 4: Kiểm tra unused code

- **Kiểm tra**:
  - Unused functions/classes
  - Unused variables trong function
  - Dead code (code không bao giờ được gọi)
- **Xử lý**:
  - Xóa code không sử dụng (nếu chắc chắn)
  - Comment code nếu có thể cần sau này (và thêm TODO)
  - Refactor nếu code bị duplicate

### Bước 5: Xác minh lại

- Sau khi sửa:
  1. Chạy lại `ruff check src/` hoặc `flake8 src/`
  2. Chạy lại `mypy src/` (nếu có)
  3. Đảm bảo không còn lỗi/warning
  4. Đảm bảo không còn unused imports
  5. Kiểm tra code vẫn hoạt động đúng (nếu có thể test nhanh)

## Thứ tự ưu tiên

```
1. Lỗi Syntax (Errors)
   ↓
2. Lỗi Type Checking (Type Errors)
   ↓
3. Warning nghiêm trọng từ Linter (Critical Warnings)
   ↓
4. Warning khác (Warnings)
   ↓
5. Xóa Unused Imports
   ↓
6. Xóa Unused Code
   ↓
7. Xác minh lại (Verification)
```

## Checklist sau khi chỉnh sửa file

- [ ] Không có lỗi syntax
- [ ] Không có lỗi type checking (mypy)
- [ ] Không có warning nghiêm trọng từ linter
- [ ] Đã xóa tất cả unused imports
- [ ] Đã xóa unused code (nếu có)
- [ ] Code vẫn hoạt động đúng (nếu có thể test)
- [ ] File đã được format đúng chuẩn (black, isort)

## Ví dụ minh họa

### Trước khi sửa:

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

### Sau khi sửa:

```python
from typing import Optional
from fastapi import APIRouter, Depends
from src.application.interfaces.ocr_service import IOCRService

router = APIRouter()

async def ocr_endpoint(service: IOCRService = Depends(get_service)):
    result = await service.extract_text("url")
    return result
```

## Công cụ hỗ trợ

- **IDE**: PyCharm inspections, VS Code Python extension
- **Linters**: `ruff`, `flake8`, `pylint`
- **Type Checkers**: `mypy`
- **Formatters**: `black`, `isort`
- **Auto-fix**: `ruff check --fix`, IDE có thể tự xóa một số unused imports

## Lưu ý quan trọng

1. **Không bỏ qua warning**: Một số warning có thể dẫn đến lỗi runtime
2. **Không xóa import vội**: Kiểm tra kỹ trước khi xóa, đặc biệt với type hints
3. **Type hints**: Luôn sử dụng type hints cho functions và methods
4. **Test sau khi sửa**: Đảm bảo chức năng vẫn hoạt động
5. **Commit riêng**: Tách commit sửa lỗi và commit xóa unused imports để dễ review
6. **Async/await**: Đảm bảo async functions được gọi đúng cách

[← Quay lại Overview](README.md)

