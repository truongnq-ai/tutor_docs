# Kiểm tra chất lượng code & làm sạch
[← Quay lại Overview](overview.md)

## Mục đích

Đảm bảo code không có lỗi syntax, warning, và loại bỏ các import không sử dụng để duy trì chất lượng code và dễ bảo trì.

## Quy trình thực hiện

### Bước 1: Kiểm tra lỗi syntax và Dart

- Chạy analyzer/linter để phát hiện:
  - Lỗi syntax Dart
  - Lỗi analysis (analysis errors)
  - Warning từ Dart analyzer
  - Warning từ IDE (VS Code, Android Studio)
- Công cụ kiểm tra:
  - IDE linter (Dart analyzer trong VS Code, Android Studio)
  - `flutter analyze`
  - `dart analyze`
- **Yêu cầu**: Không có lỗi (errors) trước khi tiếp tục.

### Bước 2: Sửa lỗi và warning

- **Ưu tiên sửa**:
  1. Lỗi syntax
  2. Lỗi analysis
  3. Warning nghiêm trọng (unused variables, unreachable code)
  4. Warning khác (deprecated methods, unused imports)
- **Các lỗi thường gặp**:
  - `Undefined name`: Tên không được định nghĩa
  - `The argument type X can't be assigned to the parameter type Y`: Type không khớp
  - `The method X isn't defined for the type Y`: Method không tồn tại
  - `Unused import`: Import không sử dụng
  - `Missing required parameter`: Thiếu tham số bắt buộc
- **Nguyên tắc sửa**:
  - Sửa đúng nguyên nhân, không chỉ che lỗi
  - Giữ type safety của Dart
  - Tuân thủ coding standards của dự án

### Bước 3: Kiểm tra và xóa unused imports

- **Kiểm tra**:
  - Import không được sử dụng trong file
  - Import chỉ xuất hiện trong khai báo nhưng không được dùng
- **Cách xác định**:
  - Dùng IDE (gạch xám/gợi ý)
  - Chạy `flutter analyze` hoặc `dart analyze`
  - Tìm kiếm tên import trong file
- **Xóa**:
  - Xóa import statement không sử dụng
  - Xóa unused `import` hoặc `export`
- **Lưu ý**:
  - Không xóa import dùng trong type annotation
  - Không xóa import dùng trong generics
  - Không xóa import dùng trong annotations

### Bước 4: Kiểm tra unused code

- **Kiểm tra**:
  - Unused variables/constants
  - Unused functions/classes
  - Dead code (code không bao giờ được gọi)
- **Xử lý**:
  - Xóa code không sử dụng (nếu chắc chắn)
  - Comment code nếu có thể cần sau này (và thêm TODO)
  - Refactor nếu code bị duplicate

### Bước 5: Xác minh lại

- Sau khi sửa:
  1. Chạy lại `flutter analyze`
  2. Đảm bảo không còn lỗi/warning
  3. Đảm bảo không còn unused imports
  4. Kiểm tra code vẫn hoạt động đúng (nếu có thể test nhanh)

## Thứ tự ưu tiên

```
1. Lỗi Syntax (Errors)
   ↓
2. Lỗi Analysis (Analysis Errors)
   ↓
3. Warning nghiêm trọng (Critical Warnings)
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
- [ ] Không có lỗi analysis
- [ ] Không có warning nghiêm trọng
- [ ] Đã xóa tất cả unused imports
- [ ] Đã xóa unused code (nếu có)
- [ ] Code vẫn hoạt động đúng (nếu có thể test)
- [ ] File đã được format đúng chuẩn (`dart format`)

## Ví dụ minh họa

### Trước khi sửa:

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // Unused import
import 'package:riverpod/riverpod.dart';
import 'package:dio/dio.dart'; // Unused import

class StudentListScreen extends StatelessWidget {
  final String unusedVariable = 'test'; // Warning: unused variable
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text('Student List'),
    );
  }
  
  // Warning: unused method
  void unusedMethod() {
    // ...
  }
}
```

### Sau khi sửa:

```dart
import 'package:flutter/material.dart';
import 'package:riverpod/riverpod.dart';

class StudentListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text('Student List'),
    );
  }
}
```

## Công cụ hỗ trợ

- **IDE**: Dart analyzer trong VS Code, Android Studio
- **Build tools**: `flutter analyze`, `dart analyze`
- **Formatter**: `dart format lib/`
- **Auto-fix**: IDE có thể tự xóa một số unused imports, `dart fix --apply`

## Lưu ý quan trọng

1. **Không bỏ qua warning**: Một số warning có thể dẫn đến lỗi runtime
2. **Không xóa import vội**: Kiểm tra kỹ trước khi xóa, đặc biệt với type annotations
3. **Code generation**: Đảm bảo chạy `dart run build_runner build` sau khi thay đổi code generation annotations
4. **Test sau khi sửa**: Đảm bảo chức năng vẫn hoạt động
5. **Commit riêng**: Tách commit sửa lỗi và commit xóa unused imports để dễ review

[↑ Quay lại Overview](overview.md)
