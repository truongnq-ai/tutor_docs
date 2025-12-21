# Gọi API & HTTP Client (RESTful)
[← Quay lại Overview](README.md)

## Chuẩn chung

- Dùng Dio hoặc Retrofit làm HTTP client; khuyến nghị Retrofit cho type-safe API calls.
- Tất cả API dùng phương thức RESTful (GET/POST/PUT/DELETE), path chuẩn `/api/v1/<resource>`.
- Base URL: từ environment config hoặc constants.
- Header: `Content-Type: application/json`, `Authorization: Bearer <token>` lấy từ secure storage.
- Response chuẩn: `errorCode/errorDetail/data` (theo backend).

## Pattern Service Layer

**Service chỉ gọi API và trả về ResponseObject, kiểm tra HTTP status và errorCode.**

```dart
// ✓ ĐÚNG: Service trả về ResponseObject
Future<ResponseObject<List<Student>>> getStudentList({
  StudentSearch? search,
}) async {
  try {
    final response = await apiClient.getStudentList(search);
    
    // Kiểm tra HTTP status và errorCode
    if (response.statusCode == 200 && 
        response.data?.errorCode == '0000') {
      return response.data!;
    }
    
    // Trả về error response
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

// ✗ SAI: Service throw Exception
Future<List<Student>> getStudentList() async {
  final response = await apiClient.getStudentList();
  if (response.data?.errorCode != '0000') {
    throw Exception(response.data?.errorDetail);
  }
  return response.data!.data ?? [];
}
```

## Pattern UI Layer

**UI layer (Screen/Widget) tự kiểm tra errorCode và xử lý:**
- Nếu `errorCode == "0000"` → xử lý `data`, có thể hiển thị success message
- Nếu không `"0000"` → hiển thị `errorDetail` từ backend
- Nếu có lỗi mạng/exception → catch block hiển thị 'Hệ thống không có phản hồi.'

```dart
// Screen xử lý errorCode
Future<void> loadStudents() async {
  setState(() => isLoading = true);
  
  try {
    final response = await studentService.getStudentList();
    
    if (response.errorCode == '0000') {
      // Xử lý response.data
      setState(() {
        students = response.data ?? [];
        isLoading = false;
      });
      // Có thể hiển thị success message
    } else {
      // Hiển thị errorDetail từ backend
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(response.errorDetail)),
      );
      setState(() => isLoading = false);
    }
  } catch (e) {
    // Lỗi mạng/exception
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Hệ thống không có phản hồi.')),
    );
    setState(() => isLoading = false);
  }
}
```

## Error Code Constants

Tạo file `lib/src/core/constants/error_codes.dart` để quản lý error codes:

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
        // Handle 401 → refresh token
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

Tạo helper function để xử lý error codes:

```dart
// lib/src/core/utils/error_handler.dart
import '../constants/error_codes.dart';

String getErrorMessage(String errorCode, String errorDetail) {
  switch (errorCode) {
    case ErrorCodes.unauthorized:
      return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
    case ErrorCodes.forbidden:
      return 'Bạn không có quyền thực hiện thao tác này.';
    case ErrorCodes.notFound:
      return 'Không tìm thấy dữ liệu.';
    case ErrorCodes.validationError:
      return errorDetail.isNotEmpty ? errorDetail : 'Dữ liệu không hợp lệ.';
    default:
      return errorDetail.isNotEmpty ? errorDetail : 'Có lỗi xảy ra. Vui lòng thử lại.';
  }
}
```

## Quy ước path

- Giữ đúng chuẩn backend: `/api/v1/<resource>` và dùng RESTful methods.
- Ví dụ:
  - `GET /api/v1/students` - Danh sách học sinh
  - `GET /api/v1/students/{id}` - Chi tiết học sinh
  - `POST /api/v1/students` - Tạo mới học sinh
  - `PUT /api/v1/students/{id}` - Cập nhật học sinh
  - `DELETE /api/v1/students/{id}` - Xóa học sinh

[← Quay lại Overview](README.md)

