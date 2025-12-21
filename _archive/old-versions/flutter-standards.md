# Gá»i API & HTTP Client (RESTful)
[← Quay lại Overview](overview.md)

## Chuẩn chung

- Dùng Dio hoặc Retrofit làm HTTP client; khuyến nghị Retrofit cho type-safe API calls.
- Tất cả API dùng phương thức RESTful (GET/POST/PUT/DELETE), path chuẩn `/api/v1/<resource>`.
- Base URL: từ environment config hoặc constants.
- Header: `Content-Type: application/json`, `Authorization: Bearer <token>` lấy từ secure storage.
- Response chuẩn: `errorCode/errorDetail/data` (theo backend).

## Pattern Service Layer

**Service chỉ gá»i API và  trả vá» ResponseObject, kiểm tra HTTP status và  errorCode.**

```dart
// ✓ ÄÃšNG: Service trả vá» ResponseObject
Future<ResponseObject<List<Student>>> getStudentList({
  StudentSearch? search,
}) async {
  try {
    final response = await apiClient.getStudentList(search);
    
    // Kiá»ƒm tra HTTP status và  errorCode
    if (response.statusCode == 200 && 
        response.data?.errorCode == '0000') {
      return response.data!;
    }
    
    // Tráº£ vá» error response
    return ResponseObject(
      errorCode: response.data?.errorCode ?? '5001',
      errorDetail: response.data?.errorDetail ?? 'Unknown error',
      data: null,
    );
  } catch (e) {
    return ResponseObject(
      errorCode: '5001',
      errorDetail: 'Network error',
      data: null,
    );
  }
}

// ✗Œ SAI: Service throw Exception
Future<List<Student>> getStudentList() async {
  final response = await apiClient.getStudentList();
  if (response.data?.errorCode != '0000') {
    throw Exception(response.data?.errorDetail);
  }
  return response.data!.data ?? [];
}
```

## Pattern UI Layer

**UI layer (Screen/Widget) tự kiểm tra errorCode và  xử lý:**
- Nếu `errorCode == "0000"` ←’ xử lý `data`, có thể hiển thị success message
- Nếu khÃ´ng `"0000"` ←’ hiển thị `errorDetail` từ backend
- Nếu có lỗi máº¡ng/exception ←’ catch block hiển thị 'Há»‡ thá»‘ng khÃ´ng có pháº£n há»“i.'

```dart
// Screen xử lý errorCode
Future<void> loadStudents() async {
  setState(() => isLoading = true);
  
  try {
    final response = await studentService.getStudentList();
    
    if (response.errorCode == '0000') {
      // Xá»­ lÃ½ response.data
      setState(() {
        students = response.data ?? [];
        isLoading = false;
      });
      // CÃ³ thể hiển thị success message
    } else {
      // Hiá»ƒn thá»‹ errorDetail từ backend
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(response.errorDetail)),
      );
      setState(() => isLoading = false);
    }
  } catch (e) {
    // Lá»—i máº¡ng/exception
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Há»‡ thá»‘ng khÃ´ng có pháº£n há»“i.')),
    );
    setState(() => isLoading = false);
  }
}
```

## Error Code Constants

Táº¡o file `lib/src/core/constants/error_codes.dart` để quản lý error codes:

```dart
class ErrorCodes {
  static const String success = '0000';
  // Business errors
  static const String businessError = '0001';
  // Authentication & Authorization
  static const String unauthorized = '1001';
  static const String tokenExpired = '1002';
  static const String forbidden = '1003';
  // Validation
  static const String validationError = '2001';
  static const String missingField = '2002';
  // Resource errors
  static const String notFound = '3001';
  static const String conflict = '3002';
  // Service integration
  static const String serviceUnavailable = '4001';
  // System errors
  static const String internalError = '5001';
}
```

## HTTP Client Setup

### Dio Client với Interceptors

```dart
// lib/src/data/services/api_client.dart
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiClient {
  late final Dio _dio;
  
  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: Env.apiBaseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
      },
    ));
    
    // Request interceptor: Add access token
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final accessToken = prefs.getString('accessToken');
        if (accessToken != null) {
          options.headers['Authorization'] = 'Bearer $accessToken';
        }
        return handler.next(options);
      },
      onError: (error, handler) async {
        // Handle 401 ←’ refresh token
        if (error.response?.statusCode == 401) {
          final refreshed = await _refreshToken();
          if (refreshed) {
            // Retry original request
            return handler.resolve(await _dio.fetch(error.requestOptions));
          }
        }
        return handler.next(error);
      },
    ));
  }
  
  Future<bool> _refreshToken() async {
    // Implementation
    return false;
  }
  
  Dio get dio => _dio;
}
```

### Retrofit API Interface

```dart
// lib/src/data/services/student_service.dart
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'student_service.g.dart';

@RestApi()
abstract class StudentService {
  factory StudentService(Dio dio, {String baseUrl}) = _StudentService;
  
  @GET('/api/v1/students')
  Future<ResponseObject<List<Student>>> getStudentList(
    @Query('grade') int? grade,
    @Query('page') int? page,
    @Query('size') int? size,
  );
  
  @GET('/api/v1/students/{id}')
  Future<ResponseObject<Student>> getStudent(@Path('id') String id);
  
  @POST('/api/v1/students')
  Future<ResponseObject<Student>> createStudent(@Body() StudentRequest request);
  
  @PUT('/api/v1/students/{id}')
  Future<ResponseObject<Student>> updateStudent(
    @Path('id') String id,
    @Body() StudentRequest request,
  );
  
  @DELETE('/api/v1/students/{id}')
  Future<ResponseObject<void>> deleteStudent(@Path('id') String id);
}
```

## Error Handling Helper

Táº¡o helper function để xử lý error codes:

```dart
// lib/src/core/utils/error_handler.dart
import '../constants/error_codes.dart';

String getErrorMessage(String errorCode, String errorDetail) {
  switch (errorCode) {
    case ErrorCodes.unauthorized:
      return 'PhiÃªn Ä‘Äƒng nháº­p Ä‘Ã£ háº¿t háº¡n. Vui lÃ²ng Ä‘Äƒng nháº­p lại.';
    case ErrorCodes.forbidden:
      return 'Báº¡n khÃ´ng có quyá»n thá»±c hiá»‡n thao tÃ¡c nÃ y.';
    case ErrorCodes.notFound:
      return 'KhÃ´ng tÃ¬m tháº¥y dá»¯ liá»‡u.';
    case ErrorCodes.validationError:
      return errorDetail.isNotEmpty ? errorDetail : 'Dá»¯ liá»‡u khÃ´ng há»£p lá»‡.';
    default:
      return errorDetail.isNotEmpty ? errorDetail : 'CÃ³ lỗi xáº£y ra. Vui lÃ²ng thá»­ lại.';
  }
}
```

## Quy Æ°á»›c path

- Giá»¯ Ä‘Ãºng chuẩn backend: `/api/v1/<resource>` và  dùng RESTful methods.
- VÃ­ dá»¥:
  - `GET /api/v1/students` - Danh sÃ¡ch há»c sinh
  - `GET /api/v1/students/{id}` - Chi tiáº¿t há»c sinh
  - `POST /api/v1/students` - Táº¡o má»›i há»c sinh
  - `PUT /api/v1/students/{id}` - Cáº­p nháº­t há»c sinh
  - `DELETE /api/v1/students/{id}` - XÃ³a há»c sinh

[←‘ Quay lại Overview](overview.md)

# Kiá»ƒm tra cháº¥t lÆ°á»£ng code & lÃ m sáº¡ch
[← Quay lại Overview](overview.md)

## Má»¥c Ä‘Ã­ch

Äáº£m báº£o code khÃ´ng có lỗi syntax, warning, và  loáº¡i bá» cÃ¡c import khÃ´ng sử dụng để duy trÃ¬ cháº¥t lÆ°á»£ng code và  dễ báº£o trÃ¬.

## Quy trÃ¬nh thá»±c hiá»‡n

### BÆ°á»›c 1: Kiá»ƒm tra lỗi syntax và  Dart

- Cháº¡y analyzer/linter để phÃ¡t hiá»‡n:
  - Lá»—i syntax Dart
  - Lá»—i analysis (analysis errors)
  - Warning từ Dart analyzer
  - Warning từ IDE (VS Code, Android Studio)
- CÃ´ng cá»¥ kiểm tra:
  - IDE linter (Dart analyzer trong VS Code, Android Studio)
  - `flutter analyze`
  - `dart analyze`
- **YÃªu cáº§u**: KhÃ´ng có lỗi (errors) trÆ°á»›c khi tiáº¿p tá»¥c.

### BÆ°á»›c 2: Sá»­a lỗi và  warning

- **Æ¯u tiÃªn sá»­a**:
  1. Lá»—i syntax
  2. Lá»—i analysis
  3. Warning nghiÃªm trá»ng (unused variables, unreachable code)
  4. Warning khÃ¡c (deprecated methods, unused imports)
- **CÃ¡c lỗi thÆ°á»ng gáº·p**:
  - `Undefined name`: TÃªn khÃ´ng Ä‘Æ°á»£c định nghĩa
  - `The argument type X can't be assigned to the parameter type Y`: Type khÃ´ng khớp
  - `The method X isn't defined for the type Y`: Method khÃ´ng tồn tại
  - `Unused import`: Import khÃ´ng sử dụng
  - `Missing required parameter`: Thiáº¿u tham sá»‘ báº¯t buá»™c
- **NguyÃªn táº¯c sá»­a**:
  - Sá»­a Ä‘Ãºng nguyÃªn nhÃ¢n, khÃ´ng chỉ che lỗi
  - Giá»¯ type safety của Dart
  - TuÃ¢n thá»§ coding standards của dá»± Ã¡n

### BÆ°á»›c 3: Kiá»ƒm tra và  xÃ³a unused imports

- **Kiá»ƒm tra**:
  - Import khÃ´ng Ä‘Æ°á»£c sử dụng trong file
  - Import chỉ xuáº¥t hiá»‡n trong khai bÃ¡o nhÆ°ng khÃ´ng Ä‘Æ°á»£c dùng
- **CÃ¡ch xÃ¡c Ä‘á»‹nh**:
  - Dùng IDE (gáº¡ch xÃ¡m/gá»£i Ã½)
  - Cháº¡y `flutter analyze` hoặc `dart analyze`
  - TÃ¬m kiáº¿m tÃªn import trong file
- **XÃ³a**:
  - XÃ³a import statement khÃ´ng sử dụng
  - XÃ³a unused `import` hoặc `export`
- **LÆ°u Ã½**:
  - KhÃ´ng xÃ³a import dùng trong type annotation
  - KhÃ´ng xÃ³a import dùng trong generics
  - KhÃ´ng xÃ³a import dùng trong annotations

### BÆ°á»›c 4: Kiá»ƒm tra unused code

- **Kiá»ƒm tra**:
  - Unused variables/constants
  - Unused functions/classes
  - Dead code (code khÃ´ng bao giá» Ä‘Æ°á»£c gá»i)
- **Xá»­ lÃ½**:
  - XÃ³a code khÃ´ng sử dụng (náº¿u cháº¯c cháº¯n)
  - Comment code náº¿u có thể cần sau nÃ y (và  thÃªm TODO)
  - Refactor náº¿u code bá»‹ duplicate

### BÆ°á»›c 5: XÃ¡c minh lại

- Sau khi sá»­a:
  1. Cháº¡y lại `flutter analyze`
  2. Äáº£m báº£o khÃ´ng cÃ²n lỗi/warning
  3. Äáº£m báº£o khÃ´ng cÃ²n unused imports
  4. Kiá»ƒm tra code váº«n hoáº¡t Ä‘á»™ng Ä‘Ãºng (náº¿u có thể test nhanh)

## Thá»© tự Æ°u tiÃªn

```
1. Lá»—i Syntax (Errors)
   ←“
2. Lá»—i Analysis (Analysis Errors)
   ←“
3. Warning nghiÃªm trá»ng (Critical Warnings)
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

- [ ] KhÃ´ng có lỗi syntax
- [ ] KhÃ´ng có lỗi analysis
- [ ] KhÃ´ng có warning nghiÃªm trá»ng
- [ ] ÄÃ£ xÃ³a táº¥t cáº£ unused imports
- [ ] ÄÃ£ xÃ³a unused code (náº¿u có)
- [ ] Code váº«n hoáº¡t Ä‘á»™ng Ä‘Ãºng (náº¿u có thể test)
- [ ] File Ä‘Ã£ Ä‘Æ°á»£c format Ä‘Ãºng chuẩn (`dart format`)

## VÃ­ dá»¥ minh há»a

### TrÆ°á»›c khi sá»­a:

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

### Sau khi sá»­a:

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

## CÃ´ng cá»¥ há»— trá»£

- **IDE**: Dart analyzer trong VS Code, Android Studio
- **Build tools**: `flutter analyze`, `dart analyze`
- **Formatter**: `dart format lib/`
- **Auto-fix**: IDE có thể tự xÃ³a má»™t sá»‘ unused imports, `dart fix --apply`

## LÆ°u Ã½ quan trá»ng

1. **KhÃ´ng bá» qua warning**: Má»™t sá»‘ warning có thể dáº«n Ä‘áº¿n lỗi runtime
2. **KhÃ´ng xÃ³a import vá»™i**: Kiá»ƒm tra ká»¹ trÆ°á»›c khi xÃ³a, Ä‘áº·c biá»‡t với type annotations
3. **Code generation**: Äáº£m báº£o cháº¡y `dart run build_runner build` sau khi thay Ä‘á»•i code generation annotations
4. **Test sau khi sá»­a**: Äáº£m báº£o chá»©c nÄƒng váº«n hoáº¡t Ä‘á»™ng
5. **Commit riÃªng**: TÃ¡ch commit sá»­a lỗi và  commit xÃ³a unused imports để dễ review

[←‘ Quay lại Overview](overview.md)

# Cáº¥u trÃºc code & đặt tÃªn
[← Quay lại Overview](overview.md)

## Package & layer (Clean Architecture)

- `lib/src/core/`: Core functionality và  utilities
  - `base/`: Base classes và  interfaces
  - `di/`: Dependency injection setup (Riverpod)
  - `extensions/`: Extension methods
  - `logger/`: Logging configuration
  - `config/`: Environment config
- `lib/src/domain/`: Business logic layer
  - `entities/`: Business entities
  - `repositories/`: Repository interfaces
  - `use_cases/`: Business use cases
- `lib/src/data/`: Data layer
  - `models/`: Data models (DTOs)
  - `repositories/`: Repository implementations
  - `services/`: API services (Retrofit/Dio)
- `lib/src/presentation/`: UI layer
  - `core/`: Core UI components
    - `router/`: Navigation (go_router)
    - `theme/`: Theming
    - `widgets/`: Reusable widgets
  - `features/`: Feature-specific UI
    - `onboarding/`: Onboarding flow
    - `tutor/`: Tutor mode (solve problems)
    - `practice/`: Practice sessions
    - `progress/`: Progress tracking

## Äáº·t tÃªn class/file

- Files: `snake_case.dart` (và­ dá»¥: `student_service.dart`, `student_list_screen.dart`).
- Classes: `PascalCase` (và­ dá»¥: `StudentService`, `StudentListScreen`).
- Functions: `camelCase` (và­ dá»¥: `getStudentList`, `solveMathProblem`).
- Variables: `camelCase` (và­ dá»¥: `studentId`, `isLoading`).
- Constants: `lowerCamelCase` (và­ dá»¥: `apiBaseUrl`) hoặc `UPPER_SNAKE_CASE` cho global constants.
- KhÃ´ng đặt tÃªn viáº¿t táº¯t khÃ³ hiá»ƒu; Æ°u tiÃªn tÃªn nghiệp vụ rÃµ rÃ ng.

## NguyÃªn táº¯c chung khi viáº¿t code

- KhÃ´ng hardcode string/number láº·p lại; Ä‘Æ°a và o constants hoặc config.
- Validate Ä‘áº§u và o báº±ng validators; nÃ©m custom exception với errorCode tÆ°Æ¡ng á»©ng.
- Sá»­ dá»¥ng Riverpod cho dependency injection và  state management.
- Sá»­ dá»¥ng Retrofit + Dio cho API calls.
- KhÃ´ng truy cáº­p trá»±c tiáº¿p data layer trong presentation layer; má»i logic qua domain layer (use cases).

## Logging

- Dùng logger package, logger tạo với `Logger()`.
- Log error á»Ÿ service/screen khi catch Exception; trÃ¡nh log láº·p stack trace nhiá»u táº§ng.
- KhÃ´ng log dá»¯ liá»‡u nháº¡y cáº£m (password, token), chỉ log request ID, errorCode náº¿u có.

## Response & Exception

- Tất cả API trả `ResponseObject<T>` với `errorCode`/`errorDetail`/`data`; sử dụng HTTP status codes tÆ°Æ¡ng á»©ng.
- Custom exception mang theo errorCode; error handler map sang user-friendly message.
- Káº¿t há»£p HTTP status codes chuẩn (200/400/401/403/404/500) với errorCode trong ResponseObject.

## Navigation

- Sá»­ dá»¥ng go_router cho navigation.
- Route paths: kebab-case (và­ dá»¥: `/student-list`, `/tutor-solve`).
- Route names: constants trong `lib/src/presentation/core/router/routes.dart`.

## VÃ­ dá»¥ thÃªm má»›i má»™t feature (và­ dá»¥: "Practice Session")

- **Entity**: tạo `lib/src/domain/entities/practice_session.dart`.
- **Repository Interface**: `lib/src/domain/repositories/practice_repository.dart`.
- **Use Case**: `lib/src/domain/use_cases/get_practice_session.dart`.
- **Data Model**: `lib/src/data/models/practice_session_model.dart`.
- **Repository Implementation**: `lib/src/data/repositories/practice_repository_impl.dart`.
- **Service**: `lib/src/data/services/practice_service.dart` (Retrofit interface).
- **Screen**: `lib/src/presentation/features/practice/practice_screen.dart`.
- **Widgets**: `lib/src/presentation/features/practice/widgets/` (náº¿u cần).

## TÃ i liá»‡u liÃªn quan

- [API consumption patterns](api-consumption.md)
- [State management với Riverpod](state-management.md)
- [UI & Widgets patterns](ui-widgets.md)
- [Kiá»ƒm tra cháº¥t lÆ°á»£ng code](code-quality.md)

[←‘ Quay lại Overview](overview.md)

# Tá»•ng quan quy táº¯c chung - Flutter/Dart

TÃ i liá»‡u nÃ y thá»‘ng kÃª ngáº¯n gá»n cÃ¡c quy táº¯c báº¯t buá»™c cho mobile app Flutter/Dart của há»‡ thá»‘ng Tutor. Chi tiáº¿t từng máº£ng náº±m trong cÃ¡c file chuyÃªn Ä‘á» Ä‘Æ°á»£c liÃªn káº¿t bÃªn dÆ°á»›i.

## NguyÃªn táº¯c cá»‘t lÃµi

- Flutter 3.16+ với Dart 3.2+; tuÃ¢n thá»§ Effective Dart guidelines.
- API báº¯t buá»™c dùng HTTP client (Dio/Retrofit) và  dùng RESTful methods (GET/POST/PUT/DELETE) phÃ¹ há»£p với từng action.
- Token lấy từ SharedPreferences hoặc secure storage, header `Authorization: Bearer <token>`; response dùng `errorCode/errorDetail/data` thá»‘ng nháº¥t với backend.
- Format code tuÃ¢n thá»§ Dart formatter; khuyến nghị sử dụng `dart format` trÆ°á»›c khi commit.
- State management dùng Riverpod; tạo providers cho dependency injection và  state management.
- Service layer chỉ trả ResponseObject, kiểm tra HTTP status và  errorCode; UI layer xử lý ResponseObject với errorCode/errorDetail.

## Response Format

### ResponseObject Structure

Tất cả API trả vá» `ResponseObject<T>` với cấu trúc:

```dart
// Success Response
ResponseObject<T> {
    errorCode: "0000",        // Optional - mã thÃ nh cÃ´ng
    errorDetail: "Operation successful",  // Optional - mÃ´ táº£ thÃ nh cÃ´ng
    data: T                   // Dá»¯ liá»‡u trả vá»
}
// HTTP 200

// Error Response
ResponseObject<?> {
    errorCode: "0001",        // Báº¯t buá»™c - mã lỗi từ "0001" Ä‘áº¿n "9999"
    errorDetail: "MÃ´ táº£ mã lỗi",  // Báº¯t buá»™c - mÃ´ táº£ chÃ­nh xÃ¡c mã lỗi
    data: T?                  // Optional - có thể null hoặc chá»©a thÃ´ng tin bá»• sung
}
// HTTP 401/400/403/404/500
```

### Error Code Convention

- **"0000"**: ThÃ nh cÃ´ng (optional trong success response)
- **"0001" - "0999"**: Lá»—i nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lá»—i xÃ¡c thá»±c và  phÃ¢n quyá»n (Authentication & Authorization)
- **"2000" - "2999"**: Lá»—i validation (Validation errors)
- **"3000" - "3999"**: Lá»—i tÃ i nguyÃªn (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lá»—i tÃ­ch há»£p dá»‹ch vá»¥ (Service integration errors)
- **"5000" - "5999"**: Lá»—i há»‡ thá»‘ng (System errors)
- **"6000" - "9999"**: Reserved cho tÆ°Æ¡ng lai

### HTTP Status Codes

- HTTP 200: Success (errorCode "0000" hoặc khÃ´ng có)
- HTTP 400: Bad Request (errorCode 2xxx - validation errors)
- HTTP 401: Unauthorized (errorCode 1xxx - authentication errors)
- HTTP 403: Forbidden (errorCode 1xxx - authorization errors)
- HTTP 404: Not Found (errorCode 3xxx - resource not found)
- HTTP 500: Internal Server Error (errorCode 5xxx - system errors)

## Má»¥c chi tiáº¿t

- [`code-structure.md` - Cáº¥u trÃºc code & đặt tÃªn](code-structure.md)
- [`api-consumption.md` - Gá»i API với HTTP client](api-consumption.md)
- [`state-management.md` - State management với Riverpod](state-management.md)
- [`ui-widgets.md` - UI & Widgets patterns](ui-widgets.md)
- [`code-quality.md` - Kiá»ƒm tra cháº¥t lÆ°á»£ng code & lÃ m sáº¡ch](code-quality.md)

## Pháº¡m vi Ã¡p dá»¥ng

- ToÃ n bá»™ mobile app Flutter: `tutor-student-app`
- CÃ¡c file trong `lib/src/`.

## NgoÃ i pháº¡m vi

- Quy táº¯c backend (Java, Python có tÃ i liá»‡u riÃªng).
- Quy táº¯c web frontend (Next.js có tÃ i liá»‡u riÃªng).

# State management với Riverpod
[← Quay lại Overview](overview.md)

## Riverpod Patterns

- Sá»­ dá»¥ng Riverpod cho dependency injection và  state management.
- Táº¡o providers cho services, repositories, và  state.
- Sá»­ dá»¥ng code generation với `riverpod_generator` khi có thể.

## Provider Types

### Service Providers

```dart
// lib/src/core/di/service_providers.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../data/services/student_service.dart';
import '../../data/services/api_client.dart';

part 'service_providers.g.dart';

@riverpod
ApiClient apiClient(ApiClientRef ref) {
  return ApiClient();
}

@riverpod
StudentService studentService(StudentServiceRef ref) {
  return StudentService(ref.watch(apiClientProvider).dio);
}
```

### State Providers

```dart
// lib/src/presentation/features/students/providers/student_providers.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../../domain/entities/student.dart';
import '../../../../data/services/student_service.dart';

part 'student_providers.g.dart';

@riverpod
Future<List<Student>> studentList(StudentListRef ref) async {
  final service = ref.watch(studentServiceProvider);
  final response = await service.getStudentList();
  
  if (response.errorCode == '0000') {
    return response.data ?? [];
  } else {
    throw Exception(response.errorDetail);
  }
}
```

### Async Providers

```dart
@riverpod
Future<Student?> studentDetail(StudentDetailRef ref, String studentId) async {
  final service = ref.watch(studentServiceProvider);
  final response = await service.getStudent(studentId);
  
  if (response.errorCode == '0000') {
    return response.data;
  } else {
    throw Exception(response.errorDetail);
  }
}
```

## Using Providers in UI

```dart
// lib/src/presentation/features/students/screens/student_list_screen.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/student_providers.dart';

class StudentListScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final studentListAsync = ref.watch(studentListProvider);
    
    return studentListAsync.when(
      data: (students) => ListView.builder(
        itemCount: students.length,
        itemBuilder: (context, index) => StudentCard(students[index]),
      ),
      loading: () => const CircularProgressIndicator(),
      error: (error, stack) => ErrorWidget(error),
    );
  }
}
```

## State Notifiers

Sá»­ dá»¥ng StateNotifier cho complex state management:

```dart
// lib/src/presentation/features/practice/providers/practice_notifier.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'practice_notifier.g.dart';

class PracticeState {
  final List<Question> questions;
  final int currentIndex;
  final bool isLoading;
  
  PracticeState({
    this.questions = const [],
    this.currentIndex = 0,
    this.isLoading = false,
  });
  
  PracticeState copyWith({
    List<Question>? questions,
    int? currentIndex,
    bool? isLoading,
  }) {
    return PracticeState(
      questions: questions ?? this.questions,
      currentIndex: currentIndex ?? this.currentIndex,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

@riverpod
class PracticeNotifier extends _$PracticeNotifier {
  @override
  PracticeState build() => PracticeState();
  
  Future<void> loadPractice() async {
    state = state.copyWith(isLoading: true);
    // Load practice logic
    state = state.copyWith(isLoading: false);
  }
}
```

[←‘ Quay lại Overview](overview.md)

# UI & Widgets patterns
[← Quay lại Overview](overview.md)

## Widget Organization

- TÃ¡ch widgets thÃ nh cÃ¡c file riÃªng trong `widgets/` folder của má»—i feature.
- Reusable widgets đặt trong `lib/src/presentation/core/widgets/`.
- Feature-specific widgets đặt trong `lib/src/presentation/features/<feature>/widgets/`.

## Naming Conventions

- Widget files: `snake_case.dart` (và­ dá»¥: `student_card.dart`, `practice_question_widget.dart`).
- Widget classes: `PascalCase` (và­ dá»¥: `StudentCard`, `PracticeQuestionWidget`).
- Stateless widgets: `*Widget` suffix (và­ dá»¥: `StudentCardWidget`).
- Stateful widgets: `*Screen` hoặc `*Page` suffix (và­ dá»¥: `StudentListScreen`).

## Reusable Components

Táº¡o reusable widgets cho cÃ¡c UI patterns thÆ°á»ng dùng:

```dart
// lib/src/presentation/core/widgets/loading_widget.dart
class LoadingWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
}

// lib/src/presentation/core/widgets/error_widget.dart
class ErrorWidget extends StatelessWidget {
  final String message;
  final VoidCallback? onRetry;
  
  const ErrorWidget(this.message, {this.onRetry});
  
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(message),
          if (onRetry != null)
            ElevatedButton(
              onPressed: onRetry,
              child: Text('Thá»­ lại'),
            ),
        ],
      ),
    );
  }
}
```

## Theme Management

- Sá»­ dá»¥ng `ThemeData` trong MaterialApp.
- Äá»‹nh nghÄ©a theme trong `lib/src/presentation/core/theme/app_theme.dart`.
- Sá»­ dá»¥ng theme colors, text styles từ theme.

### VÃ­ dá»¥ Theme

```dart
// lib/src/presentation/core/theme/app_theme.dart
import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      primaryColor: Colors.blue,
      colorScheme: ColorScheme.light(
        primary: Colors.blue,
        secondary: Colors.orange,
      ),
      textTheme: TextTheme(
        headlineLarge: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        bodyLarge: TextStyle(fontSize: 16),
      ),
    );
  }
  
  static ThemeData get darkTheme {
    return ThemeData(
      primaryColor: Colors.blue,
      colorScheme: ColorScheme.dark(
        primary: Colors.blue,
        secondary: Colors.orange,
      ),
      // Dark theme colors
    );
  }
}
```

## Layout Patterns

- Sá»­ dá»¥ng `Scaffold` cho mÃ n hÃ¬nh chÃ­nh.
- Sá»­ dá»¥ng `AppBar` với title và  actions.
- Sá»­ dá»¥ng `SafeArea` để trÃ¡nh notch/status bar overlap.
- Sá»­ dá»¥ng `Padding`, `Container`, `Column`, `Row` cho layout.

## Responsive Design

- Sá»­ dá»¥ng `MediaQuery` để lấy screen size.
- Sá»­ dá»¥ng `LayoutBuilder` cho responsive layouts.
- Táº¡o breakpoints constants cho tablet/desktop (náº¿u cần).

[←‘ Quay lại Overview](overview.md)


