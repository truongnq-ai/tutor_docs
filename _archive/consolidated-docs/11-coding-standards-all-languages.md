
================================================================================
# File: 04-for-developers/coding-standards/java/README.md
================================================================================

# Tổng quan quy tắc chung - Java/Spring Boot

Tài liệu này thống kê ngắn gọn các quy tắc bắt buộc cho backend Java/Spring Boot của hệ thống Tutor. Chi tiết từng mảng nằm trong các file chuyên đề được liên kết bên dưới.

## Nguyên tắc cốt lõi

- Tuân thủ coding convention chuẩn của Java (Oracle), SQL, Spring Boot và các hướng dẫn style đã công bố.
- Dùng format `ResponseObject` hiện tại làm chuẩn chung cho mọi dịch vụ; mọi API trả `ResponseObject` với `errorCode`/`errorDetail`/`data` kết hợp với HTTP status codes chuẩn.
- API dùng phương thức RESTful (GET/POST/PUT/DELETE) phù hợp với từng action; URL chuẩn hóa dạng `/api/v1/<resource>` (ví dụ: `/api/v1/students`, `/api/v1/exercises/{id}`).
- Cấu trúc package thống nhất: `com.tutor.core.controller` (API), `com.tutor.core.service`/`com.tutor.core.service.impl`, `com.tutor.core.repository`, `com.tutor.core.entity`, `com.tutor.core.dto.request`/`com.tutor.core.dto.response`, `com.tutor.core.enums`, `com.tutor.core.exception`, `com.tutor.core.util`, `com.tutor.core.common`.
- Đặt tên DB theo snake_case; cột dùng tiền tố kiểu dữ liệu (`n_` số, `s_` chuỗi, `d_` ngày giờ) và @Column comment rõ nghĩa.
- Logging dùng Log4j2 theo appender name; log lỗi tại controller/service, không log tràn stack trace nhiều lần.
- Swagger phải có `description` + `@ApiResponse` với errorCode examples và thêm `request/response example`.
- HTTP client cho AI Service có guideline về timeout, retry, circuit breaker, và quy tắc errorCode mapping.

## Response Format

### ResponseObject Structure

Tất cả API trả về `ResponseObject<T>` với cấu trúc:

```java
// Success Response
ResponseObject<T> {
    errorCode: "0000",        // Optional - mã thành công
    errorDetail: "Operation successful",  // Optional - mô tả thành công
    data: T                   // Dữ liệu trả về
}
// HTTP 200

// Error Response
ResponseObject<?> {
    errorCode: "0001",        // Bắt buộc - mã lỗi từ "0001" đến "9999"
    errorDetail: "Mô tả mã lỗi",  // Bắt buộc - mô tả chính xác mã lỗi
    data: T/null              // Optional - có thể null hoặc chứa thông tin bổ sung
}
// HTTP 401/400/403/404/500
```

### Error Code Convention

- **"0000"**: Thành công (optional trong success response)
- **"0001" - "0999"**: Lỗi nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lỗi xác thực và phân quyền (Authentication & Authorization)
- **"2000" - "2999"**: Lỗi validation (Validation errors)
- **"3000" - "3999"**: Lỗi tài nguyên (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lỗi tích hợp dịch vụ (Service integration errors)
- **"5000" - "5999"**: Lỗi hệ thống (System errors)
- **"6000" - "9999"**: Reserved cho tương lai

### HTTP Status Codes

- HTTP 200: Success (errorCode "0000" hoặc không có)
- HTTP 400: Bad Request (errorCode 2xxx - validation errors)
- HTTP 401: Unauthorized (errorCode 1xxx - authentication errors)
- HTTP 403: Forbidden (errorCode 1xxx - authorization errors)
- HTTP 404: Not Found (errorCode 3xxx - resource not found)
- HTTP 500: Internal Server Error (errorCode 5xxx - system errors)

## Mục chi tiết

- [`code-structure.md`](code-structure.md) - Cấu trúc code & đặt tên
- [`api-design.md`](api-design.md) - API design & Swagger
- [`exception-handling.md`](exception-handling.md) - Exception handling patterns
- [`persistence.md`](persistence.md) - Persistence (DB, Entity, Repository) - **Lưu ý**: Quy tắc TEXT vs VARCHAR cho searchable columns
- [`service-integration.md`](service-integration.md) - Tích hợp dịch vụ, HTTP Client, Cache/Redis
- [`code-quality.md`](code-quality.md) - Kiểm tra chất lượng code & làm sạch

## Phạm vi áp dụng

- Áp dụng cho module Java/Spring Boot: `tutor-core-service`
- Package base: `com.tutor.core.*`

## Không nằm trong phạm vi

- Quy tắc front-end (Next.js, Flutter có tài liệu riêng).
- Quy tắc hạ tầng CI/CD (chỉ đề cập timeout/retry ở mức service).



================================================================================
# End of: 04-for-developers/coding-standards/java/README.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/java/code-structure.md
================================================================================

# Cấu trúc code & đặt tên
[← Quay lại Overview](README.md)

## Package & layer

- `com.tutor.core.controller`: API đầu vào, nhận DTO request, trả `ResponseObject<T>`.
- `com.tutor.core.service`: khai báo interface nghiệp vụ; `com.tutor.core.service.impl`: hiện thực.
- `com.tutor.core.repository`: extends `JpaRepository<Entity, UUID>`, query động qua @Query JPQL, không logic nghiệp vụ.
- `com.tutor.core.entity`: entity kế thừa `BaseEntity` (id, createdAt/updatedAt, createdBy/updatedBy).
- `com.tutor.core.dto.request`/`com.tutor.core.dto.response`: DTO rõ nghĩa theo nghiệp vụ.
- `com.tutor.core.enums`: enumerations (ResponseStatus, UserType, AccountStatus, etc.).
- `com.tutor.core.exception`: custom exceptions, `CustomExceptionHandler` quy chuẩn lỗi nghiệp vụ.
- `com.tutor.core.util`: hàm tiện ích (Json, Date, String, Excel...).
- `com.tutor.core.common`: common classes (`ResponseObject`, `BaseEntity`, etc.).
- `com.tutor.core.config`: configuration classes (SecurityConfig, DatabaseConfig, etc.).

## Đặt tên class/file

- Tên class phản ánh vai trò: `*Controller`, `*Service`/`*ServiceImpl`, `*Repository`, `*Request`, `*Response`, `*Entity`, `*Config`.
- Không đặt tên viết tắt khó hiểu; ưu tiên tên nghiệp vụ rõ ràng.
- Enum: PascalCase, giá trị UPPER_SNAKE_CASE.
- File: một public class per file, tên file trùng với tên class.

## Nguyên tắc chung khi viết code

- Không hardcode string/number lặp lại; đưa vào `Constant` hoặc config.
- Validate đầu vào ở đầu service bằng `@Valid` annotation; ném custom exception với errorCode tương ứng.
- Dùng Lombok để giảm boilerplate (@Getter/@Setter/@NoArgsConstructor/@AllArgsConstructor/@Builder khi phù hợp).
- Sử dụng `@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")` cho DTO/Entity cần format thời gian.
- Không truy cập trực tiếp repository trong controller; mọi logic qua service.
- Sử dụng UUID cho primary key thay vì Long.

## Logging

- Dùng Log4j2, logger tạo với `@Slf4j` annotation (Lombok).
- Log error ở controller/service khi catch Exception; tránh log lặp stack trace nhiều tầng.
- Không log dữ liệu nhạy cảm (password, token), chỉ log mã giao dịch, username, requestId nếu có.

## Response & Exception

- Tất cả API trả `ResponseEntity<ResponseObject<T>>`; `ResponseObject` chứa `errorCode`/`errorDetail`/`data`.
- Custom exception mang theo errorCode; `CustomExceptionHandler` bắt và map thẳng ra ResponseObject với HTTP status tương ứng.
- Kết hợp HTTP status codes chuẩn (200/400/401/403/404/500) với errorCode trong ResponseObject.

## Swagger/OpenAPI

- Mỗi API có `@Operation(description)` + `@ApiResponse` khai báo errorCode theo enum và HTTP status.
- Bổ sung `request/response example` minh họa payload (dùng `@ExampleObject` hoặc mô tả trong description).
- Document errorCode trong `@ApiResponse` với examples.

## Tên API & HTTP method

- Dùng RESTful methods: GET (truy vấn), POST (tạo mới), PUT (cập nhật), DELETE (xóa).
- URL chuẩn: `/api/v1/<resource>`; tránh dấu "/" thừa, không lẫn lộn snake/kebab.
- Resource là danh từ số nhiều hoặc cụm danh từ rõ nghĩa: `/api/v1/students`, `/api/v1/exercises`, `/api/v1/parent-accounts`.

## Ví dụ thêm mới một Exercise (backend)

- **Entity**: tạo `com.tutor.core.entity.Exercise` kế thừa `BaseEntity`, đặt cột snake_case với prefix `n_/s_/d_`, thêm comment trong @Column.
- **Repository**: `ExerciseRepository extends JpaRepository<Exercise, UUID>`; thêm method `findBySkillId`, `existsByProblemText`, và @Query `findByFilters(...)` cho filter động.
- **Service**: interface `ExerciseService` + `ExerciseServiceImpl`; validate đầu vào bằng `@Valid`, ném custom exception với errorCode từ enum.
  - Hàm gợi ý: `create(ExerciseRequest)`, `update(UUID, ExerciseRequest)`, `getById(UUID)`, `getList(ExerciseSearchRequest)`, `delete(UUID)`.
- **Controller**: `ExerciseController` (@RestController, @RequestMapping("/api/v1/exercises")) với các endpoint:
  - `POST /api/v1/exercises` - Tạo mới
  - `GET /api/v1/exercises/{id}` - Chi tiết
  - `PUT /api/v1/exercises/{id}` - Cập nhật
  - `DELETE /api/v1/exercises/{id}` - Xóa
  - `GET /api/v1/exercises` - Danh sách (với filters)
  - Trả `ResponseEntity<ResponseObject<T>>`; catch custom exception -> map sang ResponseObject với errorCode và HTTP status tương ứng.
- **DTO Request/Response**: `ExerciseRequest` và `ExerciseResponse` (hoặc dùng entity kèm `PageResponse` khi phân trang).
- **Swagger**: @Operation + @ApiResponse theo errorCode enum; thêm example JSON cho request/response để minh họa payload.
- **Logging**: log lỗi tại controller/service với @Slf4j; không log dữ liệu nhạy cảm.

## Tài liệu liên quan

- [API design & Swagger](api-design.md)
- [Exception Handling](exception-handling.md)
- [Persistence (DB, Entity, Repository)](persistence.md)
- [Tích hợp dịch vụ, HTTP Client, Cache/Redis](service-integration.md)

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/java/code-structure.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/java/code-quality.md
================================================================================

# Kiểm tra chất lượng code & làm sạch
[← Quay lại Overview](README.md)

## Mục đích

Đảm bảo code không có lỗi compilation, warning, và loại bỏ các import không sử dụng để duy trì chất lượng code và dễ bảo trì.

## Quy trình thực hiện

### Bước 1: Kiểm tra lỗi compilation và Java

- Chạy compiler/linter để phát hiện:
  - Lỗi syntax Java
  - Lỗi compilation (compile errors)
  - Warning từ Java compiler
  - Warning từ IDE (IntelliJ IDEA/VS Code)
- Công cụ kiểm tra:
  - IDE linter (IntelliJ IDEA inspections, VS Code Java extension)
  - `mvn compile` hoặc `mvn clean compile`
  - `mvn checkstyle:check` (nếu có cấu hình checkstyle)
- **Yêu cầu**: Không có lỗi (errors) trước khi tiếp tục.

### Bước 2: Sửa lỗi và warning

- **Ưu tiên sửa**:
  1. Lỗi syntax
  2. Lỗi compilation
  3. Warning nghiêm trọng (unused variables, unreachable code)
  4. Warning khác (deprecated methods, unchecked warnings)
- **Các lỗi thường gặp**:
  - `cannot find symbol`: Import thiếu hoặc class không tồn tại
  - `incompatible types`: Type không khớp
  - `unreachable statement`: Code không bao giờ được thực thi
  - `variable might not have been initialized`: Biến chưa được khởi tạo
  - `method does not override`: Annotation `@Override` sai
- **Nguyên tắc sửa**:
  - Sửa đúng nguyên nhân, không chỉ che lỗi
  - Giữ type safety của Java
  - Tuân thủ coding standards của dự án

### Bước 3: Kiểm tra và xóa unused imports

- **Kiểm tra**:
  - Import không được sử dụng trong file
  - Import chỉ xuất hiện trong khai báo nhưng không được dùng
  - Import static không được sử dụng
- **Cách xác định**:
  - Dùng IDE (IntelliJ IDEA tự động gạch xám unused imports)
  - Tìm kiếm tên class/package trong file
  - Kiểm tra các method và field
- **Xóa**:
  - Xóa import statement không sử dụng
  - Xóa import static không dùng
  - Xóa wildcard import (`import java.util.*;`) nếu không cần
- **Lưu ý**:
  - Không xóa import dùng trong annotation (`@Entity`, `@Service`, `@RestController`, ...)
  - Không xóa import dùng trong type annotation
  - Không xóa import dùng trong generic type (`List<String>`, `Map<String, Object>`)

### Bước 4: Kiểm tra unused code

- **Kiểm tra**:
  - Unused fields/private methods
  - Unused variables trong method
  - Dead code (code không bao giờ được gọi)
- **Xử lý**:
  - Xóa code không sử dụng (nếu chắc chắn)
  - Comment code nếu có thể cần sau này (và thêm TODO)
  - Refactor nếu code bị duplicate

### Bước 5: Xác minh lại

- Sau khi sửa:
  1. Chạy lại `mvn compile`
  2. Đảm bảo không còn lỗi/warning
  3. Đảm bảo không còn unused imports
  4. Kiểm tra code vẫn hoạt động đúng (nếu có thể test nhanh)

## Thứ tự ưu tiên

```
1. Lỗi Syntax (Errors)
   ↓
2. Lỗi Compilation (Compile Errors)
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
- [ ] Không có lỗi compilation
- [ ] Không có warning nghiêm trọng
- [ ] Đã xóa tất cả unused imports
- [ ] Đã xóa unused code (nếu có)
- [ ] Code vẫn hoạt động đúng (nếu có thể test)
- [ ] File đã được format đúng chuẩn

## Ví dụ minh họa

### Trước khi sửa:

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Map;  // Unused import
import java.util.HashMap;  // Unused import
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;  // Unused import

@Service
public class StudentService {
    private Map<String, Object> cache; // Warning: unused field
    
    public List<Student> getList() {
        List<Student> students = new ArrayList<>();
        // ... logic
        return students;
    }
    
    // Warning: unused method
    private void unusedMethod() {
        // ...
    }
}
```

### Sau khi sửa:

```java
import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    public List<Student> getList() {
        List<Student> students = new ArrayList<>();
        // ... logic
        return students;
    }
}
```

## Công cụ hỗ trợ

- **IDE**: IntelliJ IDEA inspections, VS Code Java extension
- **Build tools**: `mvn compile`, `mvn clean compile`
- **Linter**: Checkstyle (nếu có cấu hình), SpotBugs
- **Auto-fix**: IntelliJ IDEA có thể tự xóa unused imports (Ctrl+Alt+O / Cmd+Option+O)

## Lưu ý quan trọng

1. **Không bỏ qua warning**: Một số warning có thể dẫn đến lỗi runtime hoặc memory leak
2. **Không xóa import vội**: Kiểm tra kỹ trước khi xóa, đặc biệt với annotation
3. **Test sau khi sửa**: Đảm bảo chức năng vẫn hoạt động
4. **Commit riêng**: Tách commit sửa lỗi và commit xóa unused imports để dễ review
5. **Lombok**: Nếu dùng Lombok, đảm bảo annotation processor được enable

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/java/code-quality.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/java/api-design.md
================================================================================

# API design & Swagger
[← Quay lại Overview](README.md)

## HTTP & URL

- HTTP method: dùng RESTful methods phù hợp với từng action
  - GET: Truy vấn đơn giản (list, detail)
  - POST: Tạo mới, actions phức tạp
  - PUT: Cập nhật toàn bộ
  - PATCH: Cập nhật một phần (nếu cần)
  - DELETE: Xóa
- URL chuẩn: `/api/v1/<resource>`  
  Ví dụ: `/api/v1/students`, `/api/v1/exercises/{id}`, `/api/v1/parent-accounts/{id}/students`
- Tránh query string cho filter phức tạp; dùng body DTO cho POST requests hoặc query parameters cho GET requests.

## Request/Response chuẩn

- Body request: DTO trong package `com.tutor.core.dto.request`; dùng `@Valid` + annotation validation khi áp dụng.
- Response: `ResponseEntity<ResponseObject<T>>` với `errorCode`/`errorDetail`/`data`; mã lỗi lấy từ errorCode convention (0000-9999).
- Kết hợp HTTP status codes chuẩn với errorCode trong ResponseObject.
- Luồng lỗi: ném custom exception trong service; `CustomExceptionHandler` catch và map sang `ResponseObject` với errorCode và HTTP status tương ứng.

## ResponseObject Format

### Success Response

```java
ResponseObject<T> {
    errorCode: "0000",        // Optional - mã thành công
    errorDetail: "Operation successful",  // Optional - mô tả thành công
    data: T                   // Dữ liệu trả về
}
// HTTP 200
```

### Error Response

```java
ResponseObject<?> {
    errorCode: "0001",        // Bắt buộc - mã lỗi từ "0001" đến "9999"
    errorDetail: "Mô tả mã lỗi",  // Bắt buộc - mô tả chính xác mã lỗi
    data: T/null              // Optional - có thể null hoặc chứa thông tin bổ sung
}
// HTTP 401/400/403/404/500
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
| "1001" | "Invalid username or password" | 401 | Authentication failed |
| "1002" | "Token expired" | 401 | JWT token expired |
| "1003" | "Insufficient permissions" | 403 | Authorization failed |
| "2001" | "Invalid request parameters" | 400 | Validation failed |
| "2002" | "Missing required field: {field}" | 400 | Required field missing |
| "3001" | "Resource not found: {resource}" | 404 | Resource not found |
| "3002" | "Resource already exists" | 409 | Conflict |
| "4001" | "AI Service unavailable" | 503 | External service error |
| "5001" | "Internal server error" | 500 | System error |

## Swagger/OpenAPI

- Bắt buộc có `@Operation(description)` mô tả ngắn gọn nghiệp vụ.
- `@ApiResponse` liệt kê errorCode chính theo error code convention.
- Thêm `request/response example` (dùng `@ExampleObject` trong @RequestBody/@ApiResponse content).
- Giữ tên field trong example khớp DTO thực tế.
- Document errorCode trong `@ApiResponse` với examples.

### Ví dụ Swagger (GET, response với errorCode)

```java
@Operation(description = "Lấy thông tin học sinh theo ID")
@ApiResponses({
    @ApiResponse(
        responseCode = "200", 
        description = "Thành công",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(
                value = "{\n" +
                        "  \"errorCode\": \"0000\",\n" +
                        "  \"errorDetail\": \"Operation successful\",\n" +
                        "  \"data\": {\n" +
                        "    \"id\": \"uuid\",\n" +
                        "    \"username\": \"student123\",\n" +
                        "    \"grade\": 6\n" +
                        "  }\n" +
                        "}"
            ))
    ),
    @ApiResponse(
        responseCode = "404", 
        description = "Không tìm thấy học sinh",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(
                value = "{\n" +
                        "  \"errorCode\": \"3001\",\n" +
                        "  \"errorDetail\": \"Student not found\",\n" +
                        "  \"data\": null\n" +
                        "}"
            ))
    )
})
@GetMapping("/api/v1/students/{id}")
public ResponseEntity<ResponseObject<StudentResponse>> getStudent(@PathVariable UUID id) {
    // Implementation
}
```

### Ví dụ Swagger (POST, request/response với errorCode)

```java
@Operation(description = "Tạo mới bài tập")
@ApiResponses({
    @ApiResponse(
        responseCode = "201", 
        description = "Tạo thành công",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(
                value = "{\n" +
                        "  \"errorCode\": \"0000\",\n" +
                        "  \"errorDetail\": \"Exercise created successfully\",\n" +
                        "  \"data\": {\n" +
                        "    \"id\": \"uuid\",\n" +
                        "    \"problemText\": \"Tính: 2/3 + 1/4\"\n" +
                        "  }\n" +
                        "}"
            ))
    ),
    @ApiResponse(
        responseCode = "400", 
        description = "Validation error",
        content = @Content(mediaType = "application/json",
            examples = @ExampleObject(
                value = "{\n" +
                        "  \"errorCode\": \"2001\",\n" +
                        "  \"errorDetail\": \"Invalid request parameters\",\n" +
                        "  \"data\": null\n" +
                        "}"
            ))
    )
})
@PostMapping("/api/v1/exercises")
public ResponseEntity<ResponseObject<ExerciseResponse>> createExercise(
    @Valid @RequestBody ExerciseRequest request) {
    // Implementation
}
```

## Versioning & header

- Version trong URL: `/api/v1/...` (sẽ thêm v2, v3 khi cần).
- Các header đặc thù (token, trace id) cần được mô tả trong tài liệu chi tiết của service.
- Authorization header: `Authorization: Bearer <accessToken>`

## Quy tắc đặt resource name

- Resource là danh từ số nhiều: `students`, `exercises`, `parent-accounts`
- Nested resources: `/api/v1/parent-accounts/{parentId}/students`
- Tránh động từ trong URL; dùng HTTP method để thể hiện action.

Xem thêm: [Exception Handling](exception-handling.md)

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/java/api-design.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/java/exception-handling.md
================================================================================

# Exception Handling
[← Quay lại Overview](README.md)

## Custom Exception với ErrorCode

```java
public class StudentNotFoundException extends RuntimeException {
    private final String errorCode = "3001";
    private final String errorDetail = "Student not found";
    
    public StudentNotFoundException(UUID studentId) {
        super(String.format("Student with id %s not found", studentId));
    }
    
    public String getErrorCode() {
        return errorCode;
    }
    
    public String getErrorDetail() {
        return errorDetail;
    }
}
```

## Exception Handler

```java
@ExceptionHandler(value = StudentNotFoundException.class)
public ResponseEntity<ResponseObject<?>> handleStudentNotFoundException(StudentNotFoundException e) {
    ResponseObject<?> response = new ResponseObject<>(
        e.getErrorCode(),
        e.getErrorDetail(),
        null
    );
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
}
```

## CustomExceptionHandler Pattern

Tạo một `CustomExceptionHandler` tập trung để xử lý tất cả custom exceptions:

```java
@RestControllerAdvice
public class CustomExceptionHandler {
    
    @ExceptionHandler(value = StudentNotFoundException.class)
    public ResponseEntity<ResponseObject<?>> handleStudentNotFoundException(StudentNotFoundException e) {
        ResponseObject<?> response = new ResponseObject<>(
            e.getErrorCode(),
            e.getErrorDetail(),
            null
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    
    @ExceptionHandler(value = ValidationException.class)
    public ResponseEntity<ResponseObject<?>> handleValidationException(ValidationException e) {
        ResponseObject<?> response = new ResponseObject<>(
            e.getErrorCode(),
            e.getErrorDetail(),
            null
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    // Thêm các exception handlers khác...
}
```

## Mapping ErrorCode sang HTTP Status

- ErrorCode `1xxx` → HTTP 401/403 (Unauthorized/Forbidden)
- ErrorCode `2xxx` → HTTP 400 (Bad Request)
- ErrorCode `3xxx` → HTTP 404/409 (Not Found/Conflict)
- ErrorCode `4xxx` → HTTP 503 (Service Unavailable)
- ErrorCode `5xxx` → HTTP 500 (Internal Server Error)

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/java/exception-handling.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/java/persistence.md
================================================================================

# Persistence (DB, Entity, Repository)
[← Quay lại Overview](README.md)

## Quy tắc DB schema

- Tên bảng/column dùng `snake_case`.
- Thêm comment cho cột qua `@Column(columnDefinition = " ... COMMENT '...'" )` hoặc comment trong SQL migration để mô tả ý nghĩa.
- Khóa chính dùng UUID (`java.util.UUID`) thay vì auto-increment.
- Sử dụng `@GeneratedValue(strategy = GenerationType.UUID)` cho primary key.

### Quy tắc kiểu dữ liệu cho String columns

**QUAN TRỌNG**: Đối với các cột string được sử dụng trong queries có hàm `LOWER()`, `UPPER()`, `LIKE`, hoặc các string functions khác, **bắt buộc** sử dụng `TEXT` thay vì `VARCHAR` hoặc `CHARACTER VARYING`.

**Lý do**: 
- PostgreSQL có thể gặp lỗi `function lower(bytea) does not exist` nếu cột được lưu dưới dạng `bytea` hoặc có vấn đề type casting
- `TEXT` type đảm bảo type consistency và tương thích tốt với các string functions
- JPA/Hibernate map `String` type sang `TEXT` một cách an toàn

**Quy tắc áp dụng**:
- ✓ **Dùng TEXT**: Các cột string được dùng trong `@Query` với `LIKE`, pattern matching
- ✓ **Có thể dùng VARCHAR**: Các cột string chỉ dùng cho exact match, không dùng string functions
- ✓ **Luôn dùng TEXT**: Các cột string có thể cần search/filter trong tương lai
- ✓ **Match Entity với Database**: Đảm bảo `columnDefinition = "TEXT"` trong Entity match với type trong database schema

**Ví dụ**:

```java
// ✓ ĐÚNG: Dùng TEXT cho cột dùng trong LIKE query
@Column(name = "username", nullable = false, unique = true, columnDefinition = "TEXT")
private String username;

@Column(name = "email", unique = true, columnDefinition = "TEXT")
private String email;

// ✗ SAI: Dùng VARCHAR cho cột dùng trong LIKE query
@Column(name = "username", nullable = false, unique = true, length = 255)
private String username;  // Có thể gây lỗi "function lower(bytea) does not exist"

// ✓ ĐÚNG: Dùng VARCHAR cho cột không dùng string functions
@Column(name = "status", length = 20)
private String status;  // OK vì chỉ dùng exact match
```

### String Normalization Standards

**QUAN TRỌNG**: Các trường string đặc thù cần được normalize (lowercase/uppercase) để đảm bảo consistency và tránh lỗi khi query.

**Quy tắc normalization**:
- **Username**: Luôn lowercase, trim
- **Email**: Luôn lowercase, trim
- **Phone**: Luôn uppercase, trim
- **Name**: Trim only, giữ nguyên case

**Implementation**:
- **Entity Level**: Sử dụng `@PrePersist` và `@PreUpdate` trong Entity cho automatic normalization khi save/update
- **Service Level**: Sử dụng `StringCommon` utility class cho search queries và authentication queries (normalize input trước khi query)

**Ví dụ Entity Normalization**:

```java
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    
    @Column(name = "username", nullable = false, unique = true, columnDefinition = "TEXT")
    private String username;
    
    @Column(name = "email", unique = true, columnDefinition = "TEXT")
    private String email;
    
    @Column(name = "phone_number", length = 20, unique = true)
    private String phoneNumber;
    
    @PrePersist
    @PreUpdate
    protected void normalizeFields() {
        if (this.getId() == null) {
            super.onCreate();
        }
        
        // Username: lowercase
        if (this.username != null) {
            this.username = this.username.trim().toLowerCase();
        }
        
        // Email: lowercase
        if (this.email != null && !this.email.isEmpty()) {
            this.email = this.email.trim().toLowerCase();
        }
        
        // Phone: uppercase
        if (this.phoneNumber != null && !this.phoneNumber.isEmpty()) {
            this.phoneNumber = this.phoneNumber.trim().toUpperCase();
        }
        
        // Name: trim only (giữ nguyên case)
        if (this.name != null) {
            this.name = this.name.trim();
        }
    }
}
```

**Ví dụ Service Level Normalization**:

```java
// Normalize input cho authentication queries
String normalizedUsername = StringCommon.normalizeUsername(username);
Optional<User> user = userRepository.findByUsername(normalizedUsername);
```

### Query Parameter Processing Standards

**QUAN TRỌNG**: Xử lý wildcards và case normalization ở Service Layer, không ở Repository.

**Quy tắc**:
- **Wildcards**: Xử lý ở Service Layer, không ở Repository
- **Case normalization**: Normalize ở Service Layer trước khi query
- **Pattern**: Sử dụng `StringCommon.addLikeRightAndLeft()` và `StringCommon.trimAndLowercase()`
- **Repository**: Nhận parameters đã được normalize và format sẵn (có wildcards `%`)
- **JPQL Query**: Đơn giản, không dùng `LOWER()/UPPER()` trong query, chỉ dùng `LIKE` với parameter đã normalize

**Ví dụ**:

```java
// ✓ ĐÚNG: Service xử lý wildcards và normalization
String searchText = null;
if (!StringCommon.isNullOrBlank(request.searchText())) {
    String normalized = StringCommon.trimAndLowercase(request.searchText());
    searchText = StringCommon.addLikeRightAndLeft(normalized);
}
Page<User> users = userRepository.searchStudents(userType, status, searchText, pageable);

// Repository query đơn giản
@Query("SELECT u FROM User u WHERE u.username LIKE :searchText")

// ✗ SAI: Repository xử lý wildcards hoặc dùng LOWER()
@Query("SELECT u FROM User u WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :search, '%'))")
```

## Entity

- Kế thừa `BaseEntity` để có sẵn `id` (UUID), `createdAt/updatedAt`, `createdBy/updatedBy`, `@PrePersist/@PreUpdate`.
- `@JsonFormat` pattern lấy từ constant hoặc format chuẩn khi expose ra JSON.
- Tránh logic nghiệp vụ trong entity; chỉ mapping và helper đơn giản (copyFrom, toDTO).
- Sử dụng `@Entity`, `@Table(name = "table_name")` với tên bảng snake_case.

### Ví dụ Entity

```java
@Entity
@Table(name = "students")
public class Student extends BaseEntity {
    
    @Column(name = "username", nullable = false, unique = true, 
            columnDefinition = "TEXT COMMENT 'Username của học sinh'")
    private String username;
    
    @Column(name = "grade", nullable = false,
            columnDefinition = "INT COMMENT 'Lớp học (6 hoặc 7)'")
    private Integer grade;
    
    @Column(name = "date_of_birth",
            columnDefinition = "DATE COMMENT 'Ngày sinh'")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    
    // Getters, setters, constructors
}
```

## Repository

- Mở rộng `JpaRepository<Entity, UUID>` (UUID thay vì Long).
- Query động: dùng @Query JPQL, ưu tiên tham số @Param và kiểm soát null (như `AND(:field IS NULL OR ...)`).
- Không chứa logic nghiệp vụ; chỉ truy xuất dữ liệu.
- Đặt tên method rõ ý: `findBy...`, `existsBy...`, `findFirstBy...`, `getList` cho truy vấn động.

### Ví dụ Repository

```java
@Repository
public interface StudentRepository extends JpaRepository<Student, UUID> {
    
    Optional<Student> findByUsername(String username);
    
    boolean existsByUsername(String username);
    
    @Query("SELECT s FROM Student s WHERE " +
           "(:grade IS NULL OR s.grade = :grade) AND " +
           "(:status IS NULL OR s.status = :status)")
    List<Student> findByFilters(@Param("grade") Integer grade, 
                                @Param("status") AccountStatus status);
    
    @Query("SELECT s FROM Student s WHERE s.createdAt >= :fromDate")
    List<Student> findByCreatedAfter(@Param("fromDate") LocalDateTime fromDate);
}
```

### Repository Query Best Practices

#### Ưu tiên JPQL thay vì Native SQL
- ✓ **Dùng JPQL**: Type-safe, dễ maintain, tận dụng JPA features
- ✗ **Tránh Native SQL**: Chỉ dùng khi thực sự cần thiết (complex aggregations, database-specific functions)

#### Xử lý LIKE queries với wildcards
- ✓ **Xử lý wildcards ở Service Layer**: Repository chỉ nhận parameter đã được format sẵn
- ✗ **Không dùng CONCAT trong Repository**: Tránh phức tạp hóa query, khó maintain

**Ví dụ**:

```java
// ✓ ĐÚNG: Repository đơn giản
@Query("SELECT s FROM Skill s WHERE " +
       "(:grade IS NULL OR s.grade = :grade) AND " +
       "(:chapter IS NULL OR s.chapter LIKE :chapter) " +
       "ORDER BY s.createdAt DESC")
Page<Skill> searchSkills(
        @Param("grade") Integer grade,
        @Param("chapter") String chapter,  // Đã có % wildcards từ service
        Pageable pageable
);

// ✓ ĐÚNG: Service xử lý wildcards
@Override
public Page<SkillListResponse> listSkills(SkillSearchRequest searchRequest) {
    Pageable pageable = PageRequest.of(
            searchRequest.page() != null ? searchRequest.page() : 0,
            searchRequest.pageSize() != null ? searchRequest.pageSize() : 20
    );

    // Process chapter parameter for LIKE query - add % wildcards in service layer
    String chapterParam = null;
    if (searchRequest.chapter() != null && !searchRequest.chapter().trim().isEmpty()) {
        chapterParam = "%" + searchRequest.chapter().trim() + "%";
    }

    Page<Skill> skills = skillRepository.searchSkills(
            searchRequest.grade(),
            chapterParam,  // Đã xử lý wildcards
            pageable
    );

    return skills.map(this::toSkillListResponse);
}
```

## Naming & migration

- Với bảng mới: sử dụng `snake_case` cho tên cột, không cần prefix.
- Script migration cần tuân thủ comment, kiểu dữ liệu phù hợp; index đặt tên `idx_<table>_<columns>`.
- Sử dụng Flyway migrations với naming convention: `V{version}__{description}.sql`
- Migration files trong `src/main/resources/db/migration/`

### Ví dụ Migration

```sql
-- V1__Create_students_table.sql
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE COMMENT 'Username của học sinh',
    grade INT NOT NULL COMMENT 'Lớp học (6 hoặc 7)',
    date_of_birth DATE COMMENT 'Ngày sinh',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_students_username ON students(username);
CREATE INDEX idx_students_grade ON students(grade);
```

## Pagination & sort

- Dùng `Pageable` và `Page<T>` từ Spring Data cho phân trang.
- Dùng DTO `PageRequest`/`SortRequest` (nếu có) cho phần phân trang/sort; mặc định giá trị trong constant.
- Trả về `PageResponse<T>` hoặc `ResponseObject<PageResponse<T>>` cho paginated results.

### Ví dụ Pagination

```java
@GetMapping("/api/v1/students")
public ResponseEntity<ResponseObject<PageResponse<StudentResponse>>> getStudents(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(required = false) Integer grade) {
    
    Pageable pageable = PageRequest.of(page, size);
    Page<Student> students = studentRepository.findByGrade(grade, pageable);
    
    PageResponse<StudentResponse> pageResponse = PageResponse.from(students, 
        students.map(this::toResponse));
    
    return ResponseEntity.ok(new ResponseObject<>(
        "0000",
        "Operation successful",
        pageResponse
    ));
}
```

## BaseEntity Pattern

Tất cả entities kế thừa `BaseEntity`:

```java
@MappedSuperclass
public abstract class BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "created_by")
    private String createdBy;
    
    @Column(name = "updated_by")
    private String updatedBy;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters, setters
}
```

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/java/persistence.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/java/service-integration.md
================================================================================

# Tích hợp dịch vụ, HTTP Client, Cache/Redis
[← Quay lại Overview](README.md)

## Service-to-Service Communication

### Nguyên tắc

- **Internal APIs**: Tất cả giao tiếp giữa các microservices (Core ↔ AI Service) phải sử dụng **Internal API endpoints** với **API Key authentication**.
- **Không dùng Admin APIs**: Không được gọi trực tiếp các admin endpoints (`/api/v1/admin/**`) từ service khác vì chúng yêu cầu JWT token với role ADMIN.
- **API Key Authentication**: Sử dụng header `X-API-Key` với giá trị từ config `ai-service.api-key` (Core → AI) hoặc `core-service.api-key` (AI → Core).

### Internal API Endpoints

Internal endpoints được định nghĩa trong package `com.tutor.core.controller.internal` với pattern:
- Base path: `/api/v1/internal/{resource}`
- Authentication: API Key (X-API-Key header)
- Security: Role `INTERNAL_SERVICE` (được set bởi `ApiKeyAuthenticationFilter`)

#### Ví dụ Internal Controllers

```java
@RestController
@RequestMapping("/api/v1/internal/skills")
@PreAuthorize("hasRole('INTERNAL_SERVICE')")
public class InternalSkillController {
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<SkillResponse>> getSkillById(@PathVariable UUID id) {
        // Implementation
    }
}
```

#### Security Configuration

Internal endpoints được bảo vệ bởi `ApiKeyAuthenticationFilter` và SecurityFilterChain với `@Order(0)`:

```java
@Bean
@Order(0)  // Highest priority
public SecurityFilterChain internalServiceFilterChain(HttpSecurity http) {
    http
        .securityMatcher("/api/v1/internal/**")
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/v1/internal/**").hasRole("INTERNAL_SERVICE")
        )
        .addFilterBefore(apiKeyAuthenticationFilter, BearerTokenAuthenticationFilter.class);
    return http.build();
}
```

### AI Service → Core Service

Khi AI Service cần gọi Core Service:

1. **Sử dụng Internal Endpoints**: Chỉ gọi `/api/v1/internal/**` endpoints
2. **API Key Header**: Gửi `X-API-Key` header với giá trị từ `settings.core_service_api_key`
3. **Không dùng JWT**: Không cần và không được dùng JWT token

#### Ví dụ Python (AI Service)

```python
async def _fetch_skill_metadata(self, skill_id: str) -> dict[str, Any]:
    """Fetch skill metadata from Core Service using internal API."""
    url = f"{self.core_service_url}/api/v1/internal/skills/{skill_id}"
    
    headers = {
        "X-API-Key": self.core_service_api_key,  # API key, NOT JWT token
        "Content-Type": "application/json",
    }
    
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, headers=headers)
        response.raise_for_status()
        # Process response
```

### Core Service → AI Service

Khi Core Service gọi AI Service:

1. **Sử dụng Internal Endpoints**: Gọi `/internal/ai/**` endpoints
2. **API Key Header**: Gửi `X-API-Key` header với giá trị từ `ai-service.api-key`
3. **WebClient Configuration**: Sử dụng `WebClient` được cấu hình trong `WebClientConfig`

#### Ví dụ Java (Core Service)

```java
@Service
public class AIServiceClient {
    
    private final WebClient aiServiceWebClient;
    
    @Value("${ai-service.api-key}")
    private String aiServiceApiKey;
    
    public GenerateExercisesResponse generateExercises(GenerateExercisesRequest request) {
        return aiServiceWebClient.post()
            .uri("/internal/ai/generate-exercises")
            .header("X-API-Key", aiServiceApiKey)  // API key, NOT JWT token
            .bodyValue(request)
            .retrieve()
            .bodyToMono(GenerateExercisesResponse.class)
            .block();
    }
}
```

### Available Internal Endpoints

#### Skills
- `GET /api/v1/internal/skills/{id}` - Get skill by ID

#### Prompt Templates
- `GET /api/v1/internal/prompt-templates/active` - Get all active templates
- `GET /api/v1/internal/prompt-templates/by-name/{name}` - Get template by name
- `GET /api/v1/internal/prompt-templates/{id}` - Get template by ID

### Best Practices

1. **Luôn dùng Internal Endpoints**: Khi cần data từ service khác, tạo internal endpoint thay vì expose admin endpoint
2. **API Key Security**: 
   - API key phải được lưu trong config file (không hardcode)
   - Sử dụng environment variables cho production
   - Rotate API keys định kỳ
3. **Error Handling**: 
   - Parse error response body để có error message chi tiết
   - Map HTTP status codes sang error codes nội bộ
   - Log đầy đủ context (request_id, endpoint, status_code)
4. **Logging**: 
   - Log request/response ở mức INFO cho internal calls
   - Không log API key trong logs
   - Include request_id trong mọi log

## HTTP Client cho AI Service

- Sử dụng Spring WebFlux `WebClient` cho HTTP client tới AI Service.
- Mỗi service integration một `*Client` class trong package `com.tutor.core.client` hoặc `com.tutor.core.service.impl`.
- Sử dụng tên service trong config properties để đồng bộ config.
- Timeout: cấu hình connect/read timeout rõ ràng (ví dụ 3s connect, 30s read) trong cấu hình WebClient.
- Retry: bật retry có giới hạn (ví dụ tối đa 3 lần, backoff tăng dần) cho các call idempotent; tắt retry với các call tạo giao dịch không idempotent.
- Circuit breaker: bật bảo vệ (Resilience4j nếu sẵn) cho các call ra ngoài; fallback trả `ResponseObject` với errorCode `4001` (Service integration error) hoặc `5001` (System error).
- Log request/response ở mức DEBUG khi cần debug; tránh log body nhạy cảm.

### Ví dụ WebClient Configuration

```java
@Configuration
public class WebClientConfig {
    
    @Bean
    public WebClient aiServiceWebClient(
        @Value("${ai-service.url}") String aiServiceUrl,
        @Value("${ai-service.timeout.connect:3000}") int connectTimeout,
        @Value("${ai-service.timeout.read:30000}") int readTimeout) {
        
        return WebClient.builder()
            .baseUrl(aiServiceUrl)
            .defaultHeader("Content-Type", "application/json")
            .clientConnector(new ReactorClientHttpConnector(
                HttpClient.create()
                    .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectTimeout)
                    .responseTimeout(Duration.ofMillis(readTimeout))
            ))
            .build();
    }
}
```

### Ví dụ AI Service Client

```java
@Service
@Slf4j
public class AIServiceClient {
    
    private final WebClient webClient;
    private final RetryTemplate retryTemplate;
    
    public AIServiceClient(WebClient aiServiceWebClient, RetryTemplate retryTemplate) {
        this.webClient = aiServiceWebClient;
        this.retryTemplate = retryTemplate;
    }
    
    public SolveResponse solveMathProblem(String problemText, int grade) {
        try {
            return retryTemplate.execute(context -> {
                SolveRequest request = new SolveRequest(problemText, grade);
                
                return webClient.post()
                    .uri("/internal/ai/solve")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(SolveResponse.class)
                    .block();
            });
        } catch (WebClientResponseException e) {
            log.error("AI Service error: {}", e.getMessage());
            throw new AIServiceException("4001", "AI Service unavailable", e);
        } catch (Exception e) {
            log.error("Unexpected error calling AI Service", e);
            throw new AIServiceException("5001", "Internal server error", e);
        }
    }
}
```

## Error Handling & ErrorCode Mapping

- Bắt buộc handle timeout, bắt lỗi và map sang custom exception với errorCode chuẩn (ví dụ `4001` cho service unavailable, `5001` cho system error).
- Không nuốt lỗi; log ở mức ERROR với @Slf4j.
- Map HTTP status từ external service sang errorCode nội bộ:
  - 503/504 → `4001` (Service unavailable)
  - 500 → `5001` (System error)
  - 400 → `4002` (Invalid request to external service)
  - Timeout → `4001` (Service timeout)

### Ví dụ Error Mapping

```java
@ExceptionHandler(value = AIServiceException.class)
public ResponseEntity<ResponseObject<?>> handleAIServiceException(AIServiceException e) {
    ResponseObject<?> response = new ResponseObject<>(
        e.getErrorCode(),
        e.getErrorDetail(),
        null
    );
    
    HttpStatus httpStatus = mapErrorCodeToHttpStatus(e.getErrorCode());
    return ResponseEntity.status(httpStatus).body(response);
}

private HttpStatus mapErrorCodeToHttpStatus(String errorCode) {
    if (errorCode.startsWith("4")) {
        return HttpStatus.SERVICE_UNAVAILABLE; // 503
    } else if (errorCode.startsWith("5")) {
        return HttpStatus.INTERNAL_SERVER_ERROR; // 500
    }
    return HttpStatus.BAD_REQUEST; // 400
}
```

## Redis/Cache (Nếu sử dụng)

- Cấu hình RedisTemplate riêng cho từng model (User/Token/Otp/Student) như trong `RedisConfig`.
- Key naming gợi ý:  
  - `user:{username}`  
  - `student:{studentId}`  
  - `token:{username}`  
  - `otp:{phone}:{type}`  
- TTL: OTP theo constant (ví dụ 5 phút); token/student tùy thuộc yêu cầu business, cần set rõ trong config.
- Khi ghi DB thành công, đồng bộ cache (save vào Redis); khi update/delete, xóa hoặc cập nhật cache tương ứng.

### Ví dụ Redis Cache

```java
@Service
public class StudentCacheService {
    
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String CACHE_PREFIX = "student:";
    private static final Duration TTL = Duration.ofHours(1);
    
    public void cacheStudent(UUID studentId, Student student) {
        String key = CACHE_PREFIX + studentId;
        redisTemplate.opsForValue().set(key, student, TTL);
    }
    
    public Optional<Student> getCachedStudent(UUID studentId) {
        String key = CACHE_PREFIX + studentId;
        Student student = (Student) redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(student);
    }
    
    public void evictStudent(UUID studentId) {
        String key = CACHE_PREFIX + studentId;
        redisTemplate.delete(key);
    }
}
```

## Retry & Circuit Breaker

### Retry Configuration

```java
@Configuration
public class RetryConfig {
    
    @Bean
    public RetryTemplate retryTemplate() {
        RetryTemplate retryTemplate = new RetryTemplate();
        
        FixedBackOffPolicy backOffPolicy = new FixedBackOffPolicy();
        backOffPolicy.setBackOffPeriod(1000); // 1 second
        
        SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy();
        retryPolicy.setMaxAttempts(3);
        
        retryTemplate.setBackOffPolicy(backOffPolicy);
        retryTemplate.setRetryPolicy(retryPolicy);
        
        return retryTemplate;
    }
}
```

### Circuit Breaker (Resilience4j)

```java
@Service
public class AIServiceClient {
    
    private final CircuitBreaker circuitBreaker;
    
    @Autowired
    public AIServiceClient(CircuitBreakerRegistry circuitBreakerRegistry) {
        this.circuitBreaker = circuitBreakerRegistry.circuitBreaker("aiService");
    }
    
    public SolveResponse solveMathProblem(String problemText, int grade) {
        return circuitBreaker.executeSupplier(() -> {
            // Call AI Service
            return webClient.post()
                .uri("/internal/ai/solve")
                .bodyValue(new SolveRequest(problemText, grade))
                .retrieve()
                .bodyToMono(SolveResponse.class)
                .block();
        });
    }
}
```

## MessageSource & i18n

- Dùng `MessageSource` (ReloadableResourceBundleMessageSource) khi cần message đa ngôn ngữ; base file trong `application.properties` hoặc bundle riêng.
- ErrorDetail có thể lấy từ MessageSource dựa trên errorCode.

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/java/service-integration.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/python/README.md
================================================================================

# Tổng quan quy tắc chung - Python/FastAPI

Tài liệu này thống kê ngắn gọn các quy tắc bắt buộc cho backend Python/FastAPI của hệ thống Tutor. Chi tiết từng mảng nằm trong các file chuyên đề được liên kết bên dưới.

## Nguyên tắc cốt lõi

- Tuân thủ coding convention chuẩn của Python (PEP 8), FastAPI best practices, và các hướng dẫn style đã công bố.
- Dùng format response với `errorCode`/`errorDetail`/`data` kết hợp với HTTP status codes chuẩn cho tất cả API endpoints.
- API dùng phương thức RESTful (GET/POST/PUT/DELETE) phù hợp với từng action; URL chuẩn hóa dạng `/internal/ai/<resource>` (ví dụ: `/internal/ai/ocr`, `/internal/ai/solve`).
- Cấu trúc package theo Clean Architecture: `src/domain`, `src/application`, `src/infrastructure`, `src/presentation`, `src/core`, `src/common`.
- Đặt tên theo PEP 8: `snake_case` cho files/functions/variables, `PascalCase` cho classes, `UPPER_SNAKE_CASE` cho constants.
- Logging dùng Python logging module; log lỗi tại route/service, không log tràn stack trace nhiều lần.
- OpenAPI/Swagger phải có `description` + `response_model` với errorCode examples và thêm `request/response example`.
- HTTP client cho external services có guideline về timeout, retry, circuit breaker, và quy tắc errorCode mapping.

## Response Format

### Response Structure

Tất cả API trả về response với cấu trúc:

```python
# Success Response
{
    "errorCode": "0000",        # Optional - mã thành công
    "errorDetail": "Operation successful",  # Optional - mô tả thành công
    "data": {...}               # Dữ liệu trả về
}
# HTTP 200

# Error Response
{
    "errorCode": "0001",        # Bắt buộc - mã lỗi từ "0001" đến "9999"
    "errorDetail": "Mô tả mã lỗi",  # Bắt buộc - mô tả chính xác mã lỗi
    "data": null                # Optional - có thể null hoặc chứa thông tin bổ sung
}
# HTTP 401/400/403/404/500
```

### Error Code Convention

- **"0000"**: Thành công (optional trong success response)
- **"0001" - "0999"**: Lỗi nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lỗi xác thực và phân quyền (Authentication & Authorization)
- **"2000" - "2999"**: Lỗi validation (Validation errors)
- **"3000" - "3999"**: Lỗi tài nguyên (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lỗi tích hợp dịch vụ (Service integration errors)
- **"5000" - "5999"**: Lỗi hệ thống (System errors)
- **"6000" - "9999"**: Reserved cho tương lai

### HTTP Status Codes

- HTTP 200: Success (errorCode "0000" hoặc không có)
- HTTP 400: Bad Request (errorCode 2xxx - validation errors)
- HTTP 401: Unauthorized (errorCode 1xxx - authentication errors)
- HTTP 403: Forbidden (errorCode 1xxx - authorization errors)
- HTTP 404: Not Found (errorCode 3xxx - resource not found)
- HTTP 500: Internal Server Error (errorCode 5xxx - system errors)

## Mục chi tiết

- [`code-structure.md`](code-structure.md) - Cấu trúc code & đặt tên
- [`api-design.md`](api-design.md) - API design & FastAPI
- [`clean-architecture.md`](clean-architecture.md) - Clean Architecture patterns
- [`code-quality.md`](code-quality.md) - Kiểm tra chất lượng code & làm sạch
- [`latex-formatting.md`](latex-formatting.md) - Quy tắc định dạng LaTeX cho bài tập Toán

## Phạm vi áp dụng

- Áp dụng cho module Python/FastAPI: `tutor-ai-service`
- Package base: `src.*` (theo Clean Architecture)

## Không nằm trong phạm vi

- Quy tắc front-end (Next.js, Flutter có tài liệu riêng).
- Quy tắc hạ tầng CI/CD (chỉ đề cập timeout/retry ở mức service).



================================================================================
# End of: 04-for-developers/coding-standards/python/README.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/python/code-structure.md
================================================================================

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



================================================================================
# End of: 04-for-developers/coding-standards/python/code-structure.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/python/code-quality.md
================================================================================

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



================================================================================
# End of: 04-for-developers/coding-standards/python/code-quality.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/python/clean-architecture.md
================================================================================

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



================================================================================
# End of: 04-for-developers/coding-standards/python/clean-architecture.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/python/api-design.md
================================================================================

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



================================================================================
# End of: 04-for-developers/coding-standards/python/api-design.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/python/latex-formatting.md
================================================================================

# Quy tắc định dạng LaTeX cho bài tập Toán
[← Quay lại Overview](README.md)

## Mục đích

Tài liệu này mô tả chi tiết quy tắc định dạng LaTeX để AI có thể tạo ra các công thức toán học đúng chuẩn, hiển thị chính xác trong hệ thống Tutor. Hệ thống sử dụng KaTeX để render LaTeX.

## 1. DELIMITERS (Dấu phân cách)

**QUAN TRỌNG:** Hệ thống sử dụng KaTeX và chỉ hỗ trợ delimiter `$...$` cho inline math.

- ✅ **ĐÚNG:** `$\\frac{5}{6}$` hoặc `$x + 2 = 5$`
- ❌ **SAI:** `\\(\\frac{5}{6}\\)` hoặc `$$\\frac{5}{6}$$` hoặc `\[\\frac{5}{6}\]`

### Quy tắc sử dụng delimiters

- **Trong `problemText`**: Dùng `$...$` để bao quanh công thức toán
- **Trong `solutionSteps[].content`**: Dùng `$...$` để bao quanh công thức toán
- **Trong `problemLatex`**: Chỉ lưu công thức thuần, KHÔNG có delimiters `$...$`
- **Trong `finalAnswer`**: Dùng `$...$` nếu có công thức

## 2. CÁC LỆNH LaTeX PHỔ BIẾN

### Phân số (Fractions)

- `\\frac{a}{b}` → phân số a/b
- Ví dụ: `\\frac{5}{6}`, `\\frac{12}{18}`, `\\frac{x+1}{x-2}`

### Phép toán cơ bản

- `+` → dấu cộng (không cần escape)
- `-` → dấu trừ (không cần escape)
- `\\times` → dấu nhân (×)
- `\\div` → dấu chia (÷)
- `\\cdot` → dấu chấm nhân (·)
- `=` → dấu bằng (không cần escape)
- `\\neq` → dấu khác (≠)
- `\\leq` → nhỏ hơn hoặc bằng (≤)
- `\\geq` → lớn hơn hoặc bằng (≥)
- `<` → nhỏ hơn (không cần escape)
- `>` → lớn hơn (không cần escape)

### Căn bậc (Square roots)

- `\\sqrt{x}` → căn bậc hai của x
- `\\sqrt[n]{x}` → căn bậc n của x
- Ví dụ: `\\sqrt{16}`, `\\sqrt[3]{27}`

### Số mũ và chỉ số

- `x^{2}` → x mũ 2
- `x_{1}` → x chỉ số 1
- `x^{n+1}` → x mũ (n+1)
- Ví dụ: `2^{3}`, `a_{i}`, `(x+1)^{2}`

### Ký hiệu toán học

- `\\pi` → π
- `\\alpha`, `\\beta`, `\\gamma` → α, β, γ
- `\\theta` → θ
- `\\infty` → ∞
- `\\pm` → ±
- `\\approx` → ≈

### Khoảng trắng

- `\\,` → khoảng trắng nhỏ
- `\\;` → khoảng trắng trung bình
- `\\quad` → khoảng trắng lớn
- `\\qquad` → khoảng trắng rất lớn

### Dấu ngoặc

- `\\left( ... \\right)` → ngoặc tự động điều chỉnh kích thước
- `\\left[ ... \\right]` → ngoặc vuông tự động
- `\\left\\{ ... \\right\\}` → ngoặc nhọn tự động
- Ví dụ: `\\left(\\frac{a}{b}\\right)`, `\\left[x+1\\right]`

## 3. VÍ DỤ CỤ THỂ

### Ví dụ 1: Phân số trong problemText

```json
{
  "problemText": "So sánh hai phân số sau và điền dấu thích hợp (>, < hoặc =) vào ô trống: $\\frac{5}{6} \\; ? \\; \\frac{4}{9}$.",
  "problemLatex": "\\frac{5}{6} \\; ? \\; \\frac{4}{9}"
}
```

### Ví dụ 2: Phương trình trong solutionSteps

```json
{
  "content": "Ta có mẫu số chung của 6 và 9 là 18. Khi đó: $\\frac{5}{6} = \\frac{15}{18}$ và $\\frac{4}{9} = \\frac{8}{18}$."
}
```

### Ví dụ 3: So sánh số

```json
{
  "content": "So sánh $15$ và $8$, ta có $15 > 8$."
}
```

### Ví dụ 4: Căn bậc hai

```json
{
  "problemText": "Tính giá trị của $\\sqrt{16} + \\sqrt{9}$.",
  "problemLatex": "\\sqrt{16} + \\sqrt{9}"
}
```

### Ví dụ 5: Số mũ

```json
{
  "problemText": "Tính giá trị của $2^{3} \\times 3^{2}$.",
  "problemLatex": "2^{3} \\times 3^{2}"
}
```

## 4. LƯU Ý QUAN TRỌNG

### Escape trong JSON

Trong JSON string, mỗi dấu `\` phải được escape thành `\\`:
- LaTeX: `\frac{5}{6}`
- Trong JSON: `"\\frac{5}{6}"`

### Escape trong prompt template

Trong SQL prompt template, cần escape thêm:
- LaTeX: `\frac{5}{6}`
- Trong SQL string: `\\frac{5}{6}` (hoặc `\\frac{{5}}{{6}}` nếu dùng trong f-string)

### Không dùng ký hiệu không chuẩn

- ❌ `\\square` → không phải lệnh LaTeX chuẩn
- ✅ Dùng `?` hoặc `\\text{?}` thay thế

### Kết hợp text và math

- ✅ `"Tính $x$ biết $x + 2 = 5$"`
- ✅ `"Phân số $\\frac{5}{6}$ lớn hơn $\\frac{4}{9}$"`

### Nếu không có công thức

- Để `problemLatex` là `null` hoặc không có field này
- Không cần thêm `$...$` trong `problemText` nếu không có công thức

## 5. KIỂM TRA LaTeX

Trước khi output JSON, đảm bảo:

- ✅ Tất cả công thức trong `problemText` và `solutionSteps[].content` được bao bởi `$...$`
- ✅ `problemLatex` chỉ chứa công thức thuần, không có `$...$`
- ✅ Tất cả dấu `\` đã được escape thành `\\` trong JSON string
- ✅ Không dùng các delimiter khác như `\\(`, `$$`, `\[`
- ✅ Các lệnh LaTeX là hợp lệ và được KaTeX hỗ trợ

## 6. DANH SÁCH LỆNH KaTeX ĐƯỢC HỖ TRỢ

KaTeX hỗ trợ hầu hết lệnh LaTeX cơ bản. Xem thêm tại: https://katex.org/docs/supported.html

### Các lệnh thường dùng cho Toán lớp 6-7

- **Phân số**: `\\frac`, `\\dfrac`, `\\tfrac`
- **Phép toán**: `\\times`, `\\div`, `\\cdot`, `\\pm`
- **So sánh**: `\\leq`, `\\geq`, `\\neq`, `\\approx`
- **Căn**: `\\sqrt`, `\\sqrt[n]{x}`
- **Số mũ/chỉ số**: `^{}`, `_{}`
- **Ngoặc**: `\\left(`, `\\right)`, `\\left[`, `\\right]`, `\\left\\{`, `\\right\\}`
- **Ký hiệu**: `\\pi`, `\\alpha`, `\\beta`, `\\theta`, `\\infty`

## 7. PROMPT TEMPLATE CHO AI

Khi tạo prompt cho AI generate bài tập, cần bao gồm phần hướng dẫn LaTeX này:

```
## QUY TẮC ĐỊNH DẠNG LaTeX CHO BÀI TẬP TOÁN

1. Sử dụng delimiter $...$ cho tất cả công thức toán trong problemText và solutionSteps[].content
2. Trong problemLatex, chỉ lưu công thức thuần, không có $...$
3. Escape tất cả dấu \ thành \\ trong JSON string
4. Không dùng \\(, $$, hoặc \[ làm delimiter
5. Sử dụng các lệnh LaTeX chuẩn được KaTeX hỗ trợ
6. Nếu không có công thức, để problemLatex là null
```

## Checklist khi tạo bài tập với LaTeX

- [ ] Tất cả công thức trong `problemText` được bao bởi `$...$`
- [ ] Tất cả công thức trong `solutionSteps[].content` được bao bởi `$...$`
- [ ] `problemLatex` chỉ chứa công thức thuần, không có `$...$`
- [ ] Tất cả dấu `\` đã được escape thành `\\` trong JSON
- [ ] Không dùng delimiter `\\(`, `$$`, `\[`
- [ ] Các lệnh LaTeX hợp lệ và được KaTeX hỗ trợ
- [ ] Nếu không có công thức, `problemLatex` là `null`

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/python/latex-formatting.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/nextjs/README.md
================================================================================

# Tổng quan quy tắc chung - Next.js/TypeScript

Tài liệu này thống kê ngắn gọn các quy tắc bắt buộc cho frontend Next.js/TypeScript của hệ thống Tutor (Admin Dashboard và Parent Dashboard). Chi tiết từng mảng nằm trong các file chuyên đề được liên kết bên dưới.

## Nguyên tắc cốt lõi

- Next.js 14+ với TypeScript strict mode; ESLint `next/core-web-vitals`.
- API bắt buộc dùng HTTP client (fetch/axios) và dùng RESTful methods (GET/POST/PUT/DELETE) phù hợp với từng action.
- Token lấy từ cookie hoặc localStorage, header `Authorization: Bearer <token>`; response dùng `errorCode/errorDetail/data` thống nhất với backend.
- Format code tuân thủ ESLint hiện hành; khuyến nghị áp dụng format/quote style đồng nhất (single quote, trailing comma chuẩn JS/TS).
- CSS/SCSS: tránh lồng sâu, ưu tiên tái dùng class/biến sẵn có; không mô tả BEM bắt buộc.
- Service layer chỉ trả ResponseObject, kiểm tra HTTP status và errorCode; Component layer xử lý ResponseObject với errorCode/errorDetail.

## Response Format

### ResponseObject Structure

Tất cả API trả về `ResponseObject<T>` với cấu trúc:

```typescript
// Success Response
ResponseObject<T> {
    errorCode: "0000",        // Optional - mã thành công
    errorDetail: "Operation successful",  // Optional - mô tả thành công
    data: T                   // Dữ liệu trả về
}
// HTTP 200

// Error Response
ResponseObject<?> {
    errorCode: "0001",        // Bắt buộc - mã lỗi từ "0001" đến "9999"
    errorDetail: "Mô tả mã lỗi",  // Bắt buộc - mô tả chính xác mã lỗi
    data: T | null            // Optional - có thể null hoặc chứa thông tin bổ sung
}
// HTTP 401/400/403/404/500
```

### Error Code Convention

- **"0000"**: Thành công (optional trong success response)
- **"0001" - "0999"**: Lỗi nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lỗi xác thực và phân quyền (Authentication & Authorization)
- **"2000" - "2999"**: Lỗi validation (Validation errors)
- **"3000" - "3999"**: Lỗi tài nguyên (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lỗi tích hợp dịch vụ (Service integration errors)
- **"5000" - "5999"**: Lỗi hệ thống (System errors)
- **"6000" - "9999"**: Reserved cho tương lai

### HTTP Status Codes

- HTTP 200: Success (errorCode "0000" hoặc không có)
- HTTP 400: Bad Request (errorCode 2xxx - validation errors)
- HTTP 401: Unauthorized (errorCode 1xxx - authentication errors)
- HTTP 403: Forbidden (errorCode 1xxx - authorization errors)
- HTTP 404: Not Found (errorCode 3xxx - resource not found)
- HTTP 500: Internal Server Error (errorCode 5xxx - system errors)

## Mục chi tiết

- [`code-structure.md`](code-structure.md) - Cấu trúc code & đặt tên
- [`api-client.md`](api-client.md) - Gọi API với HTTP client
- [`state-utilities.md`](state-utilities.md) - State, utilities, form
- [`style-format-lint.md`](style-format-lint.md) - Style, format & lint
- [`ui-components.md`](ui-components.md) - UI Components Conventions (ActionsDropdown, Button Loading State)
- [`code-quality.md`](code-quality.md) - Kiểm tra chất lượng code & làm sạch
- [`security-auth.md`](security-auth.md) - Auth & bảo mật

## Phạm vi áp dụng

- Toàn bộ frontend Next.js: `tutor-admin-dashboard` và `tutor-parent-dashboard`
- Các route/component/service trong `src/`.

## Ngoài phạm vi

- Quy tắc backend (Java, Python có tài liệu riêng).
- Quy tắc mobile app (Flutter có tài liệu riêng).



================================================================================
# End of: 04-for-developers/coding-standards/nextjs/README.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/nextjs/code-structure.md
================================================================================

# Cấu trúc code & đặt tên
[← Quay lại Overview](README.md)

## Thư mục/layer (dạng cây)

- `src/`
  - `app/` (Next.js App Router, pages/routes)
    - `<route>/page.tsx` (route chính)
    - `layout.tsx` (layout gốc)
  - `components/` (UI theo domain: dashboard, auth, common, ...)
  - `lib/` (Utilities & services)
    - `api/` (API client, endpoints, service functions)
    - `hooks/` (Custom React hooks)
    - `utils/` (Helper functions)
  - `types/` (TypeScript types/interfaces)
  - `contexts/` (React context, nếu có)
  - `styles/` (Global styles, SCSS/CSS)

## Đặt tên

- Component: PascalCase, file `.tsx`; hook `useX`, context `XContext`.
- Service: `*.service.ts`, class PascalCase hoặc function, export instance `xxxService` hoặc named export.
- Type/DTO: PascalCase, đặt trong `src/types`.
- Util: `*.util.ts`/`*.util.tsx`.
- Route: thư mục kebab-case trong `app/`, file `page.tsx`.

## Module mới (mẫu)

- Thêm route tại `src/app/<feature>/page.tsx` (render component chính).
- Tạo component chính + component chi tiết nếu cần (trong `src/components/<feature>/`).
- Tạo service `<feature>.service.ts` gọi API qua HTTP client với RESTful methods.
- Tạo type/DTO trong `src/types/<feature>.ts` (request/response).
- Wire vào layout nếu cần (nav/menu).

## Ví dụ chi tiết khi thêm màn hình mới (ví dụ: "quản lý học sinh")

- Route: tạo `src/app/students/page.tsx` để render trang danh sách/shell.
- Component:
  - `src/components/students/StudentList.tsx` (danh sách, gọi service GET /api/v1/students).
  - `src/components/students/StudentDetail.tsx` (form thêm/sửa/chi tiết).
- Service:
  - `src/lib/api/student.service.ts` dùng HTTP client với methods GET/POST/PUT/DELETE cho `/api/v1/students`.
- Types/DTO:
  - `src/types/student.ts` khai báo `Student`, `StudentSearch`, `StudentRequest`, `PageResponse<Student>`.
- Constants (nếu cần):
  - Bổ sung API endpoints tại `lib/api/endpoints.ts`.
- Layout/nav:
  - Cập nhật menu/links (header/footer/nav) để trỏ tới route mới (nếu cần hiển thị trong UI).
- Styles:
  - Thêm SCSS cục bộ nếu cần (ưu tiên tái dùng class có sẵn); import vào component hoặc page.

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/nextjs/code-structure.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/nextjs/code-quality.md
================================================================================

# Kiểm tra chất lượng code & làm sạch
[← Quay lại Overview](README.md)

## Mục đích

Đảm bảo code không có lỗi syntax, warning, và loại bỏ các import không sử dụng để duy trì chất lượng code và dễ bảo trì.

## Quy trình thực hiện

### Bước 1: Kiểm tra lỗi syntax và TypeScript

- Chạy linter/compiler để phát hiện:
  - Lỗi syntax
  - Lỗi TypeScript (TS errors)
  - Warning từ TypeScript compiler
  - Warning từ ESLint
- Công cụ kiểm tra:
  - IDE linter (TypeScript Language Service trong VS Code)
  - `npm run build` hoặc `next build`
  - `npm run lint` (ESLint)
  - `tsc --noEmit` (nếu có)
- **Yêu cầu**: Không có lỗi (errors) trước khi tiếp tục.

### Bước 2: Sửa lỗi và warning

- **Ưu tiên sửa**:
  1. Lỗi syntax
  2. Lỗi TypeScript (TS errors)
  3. Warning nghiêm trọng từ ESLint
  4. Warning khác
- **Các lỗi thường gặp**:
  - `TS2554`: Sai số lượng tham số (Expected N arguments, but got M)
  - `TS2339`: Property không tồn tại trên type
  - `TS2729`: Property được sử dụng trước khi khởi tạo
  - `TS2322`: Type không khớp (Type X is not assignable to type Y)
  - `TS2532`: Object có thể là `undefined`
  - `react-hooks/exhaustive-deps`: Missing dependencies in useEffect/useMemo
- **Nguyên tắc sửa**:
  - Sửa đúng nguyên nhân, không chỉ che lỗi
  - Giữ type safety của TypeScript
  - Tuân thủ React hooks rules
  - Tuân thủ coding standards của dự án

### Bước 3: Kiểm tra và xóa unused imports

- **Kiểm tra**:
  - Import không được sử dụng trong file
  - Import chỉ xuất hiện trong khai báo nhưng không được dùng
  - Import React hooks không được sử dụng
- **Cách xác định**:
  - Dùng IDE (gạch xám/gợi ý)
  - Tìm kiếm tên import trong file
  - Kiểm tra các hooks và components
- **Xóa**:
  - Xóa import statement không sử dụng
  - Xóa import trong destructuring nếu không dùng
  - Xóa unused React hooks imports
- **Lưu ý**:
  - Không xóa import dùng trong JSX (React components)
  - Không xóa import dùng trong type annotation
  - Không xóa import dùng trong Next.js metadata/API routes

### Bước 4: Kiểm tra unused code

- **Kiểm tra**:
  - Unused variables/constants
  - Unused functions/components
  - Dead code (code không bao giờ được gọi)
- **Xử lý**:
  - Xóa code không sử dụng (nếu chắc chắn)
  - Comment code nếu có thể cần sau này (và thêm TODO)

### Bước 5: Xác minh lại

- Sau khi sửa:
  1. Chạy lại `npm run lint`
  2. Chạy lại `npm run build` (nếu có)
  3. Đảm bảo không còn lỗi/warning
  4. Đảm bảo không còn unused imports
  5. Kiểm tra code vẫn hoạt động đúng (nếu có thể test nhanh)

## Thứ tự ưu tiên

```
1. Lỗi Syntax (Errors)
   ↓
2. Lỗi TypeScript (TS Errors)
   ↓
3. Warning nghiêm trọng từ ESLint (Critical Warnings)
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
- [ ] Không có lỗi TypeScript (TS errors)
- [ ] Không có warning nghiêm trọng từ ESLint
- [ ] Đã xóa tất cả unused imports
- [ ] Đã xóa unused code (nếu có)
- [ ] Code vẫn hoạt động đúng (nếu có thể test)
- [ ] File đã được format đúng chuẩn

## Ví dụ minh họa

### Trước khi sửa:

```typescript
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Unused import

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const router = useRouter(); // Warning: unused variable
  
  useEffect(() => {
    // fetch students
  }, []); // Warning: missing dependencies
  
  const unusedFunction = () => {
    // ...
  };
  
  return <div>Student List</div>;
}
```

### Sau khi sửa:

```typescript
import { useState, useEffect } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    // fetch students
    // ... logic
  }, []);
  
  return <div>Student List</div>;
}
```

## Công cụ hỗ trợ

- **IDE**: TypeScript Language Service, ESLint extension
- **Build tools**: `npm run build`, `next build`
- **Linter**: ESLint với Next.js rules (`next/core-web-vitals`)
- **Auto-fix**: IDE có thể tự xóa một số unused imports, ESLint `--fix`

## Lưu ý quan trọng

1. **Không bỏ qua warning**: Một số warning có thể dẫn đến lỗi runtime hoặc performance issues
2. **Không xóa import vội**: Kiểm tra kỹ trước khi xóa, đặc biệt với React hooks
3. **React hooks rules**: Tuân thủ rules của hooks (không gọi trong conditions, đúng dependencies)
4. **Test sau khi sửa**: Đảm bảo chức năng vẫn hoạt động
5. **Commit riêng**: Tách commit sửa lỗi và commit xóa unused imports để dễ review
6. **Next.js specific**: Một số import có thể được dùng trong metadata hoặc API routes

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/nextjs/code-quality.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/nextjs/api-client.md
================================================================================

# Gọi API & HTTP Client (RESTful)
[← Quay lại Overview](README.md)

## Chuẩn chung

- Dùng HTTP client (fetch hoặc axios) làm client; khuyến nghị dùng axios cho dễ quản lý interceptors.
- Tất cả API dùng phương thức RESTful (GET/POST/PUT/DELETE), path chuẩn `/api/v1/<resource>`.
- Base URL: `NEXT_PUBLIC_API_URL` trong `.env.local` hoặc config.
- Header: `Content-Type: application/json; charset=utf-8`, `Authorization: Bearer <token>` lấy từ cookie hoặc localStorage.
- Response chuẩn: `errorCode/errorDetail/data` (theo backend).

## Pattern Service Layer

**Service chỉ gọi API và trả về ResponseObject, kiểm tra HTTP status và errorCode, KHÔNG throw Error cho business errors.**

```typescript
// ✓ ĐÚNG: Service trả về ResponseObject, kiểm tra HTTP status
async getList(param: Partial<StudentSearch>): Promise<ResponseObject<Student[]>> {
  const response = await apiClient.get<ResponseObject<Student[]>>(
    '/api/v1/students',
    { params: param }
  );
  
  // Kiểm tra HTTP status
  if (response.status === 200 && response.data.errorCode === '0000') {
    return response.data;
  }
  
  // Trả về error response
  return {
    errorCode: response.data.errorCode || '5001',
    errorDetail: response.data.errorDetail || 'Unknown error',
    data: null
  };
}

// ✗ SAI: Service throw Error
async getList(param: Partial<StudentSearch>): Promise<Student[]> {
  const response = await apiClient.get<ResponseObject<Student[]>>(...);
  if (response.data.errorCode !== '0000') {
    throw new Error(response.data.errorDetail);
  }
  return response.data.data || [];
}
```

## Pattern Component Layer

**Component tự kiểm tra errorCode và xử lý:**
- Nếu `errorCode === "0000"` → xử lý `data`, có thể hiển thị success message
- Nếu không `"0000"` → hiển thị `errorDetail` từ backend
- Nếu có lỗi mạng/exception → catch block hiển thị 'Hệ thống không có phản hồi.'

```typescript
// Component xử lý errorCode
try {
  const response = await studentService.getList(searchParams);
  
  if (response.errorCode === '0000') {
    // Xử lý response.data
    const students = response.data || [];
    setStudents(students);
    toast.success('Lấy danh sách học sinh thành công!');
  } else {
    // Hiển thị errorDetail từ backend
    toast.error(response.errorDetail || 'Có lỗi xảy ra. Vui lòng thử lại.');
  }
} catch (error: any) {
  // Lỗi mạng/exception
  console.error('Error fetching students:', error);
  toast.error('Hệ thống không có phản hồi.');
}
```

## Error Code Constants

Tạo file `src/lib/constants/error-codes.ts` để quản lý error codes:

```typescript
export const ERROR_CODES = {
  SUCCESS: '0000',
  // Business errors
  BUSINESS_ERROR: '0001',
  // Authentication & Authorization
  UNAUTHORIZED: '1001',
  TOKEN_EXPIRED: '1002',
  FORBIDDEN: '1003',
  // Validation
  VALIDATION_ERROR: '2001',
  MISSING_FIELD: '2002',
  // Resource errors
  NOT_FOUND: '3001',
  CONFLICT: '3002',
  // Service integration
  SERVICE_UNAVAILABLE: '4001',
  // System errors
  INTERNAL_ERROR: '5001',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
```

## HTTP Client Setup

### Axios Client với Interceptors

```typescript
// src/lib/api/client.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/lib/utils/auth';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add access token
apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: Handle 401 → refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Try refresh token
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh_token`,
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );
          // Update tokens
          setTokens(data.data.accessToken, data.data.refreshToken);
          // Retry original request
          if (error.config) {
            error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
            return apiClient.request(error.config);
          }
        } catch (refreshError) {
          // Refresh failed → logout
          clearTokens();
          window.location.href = '/signin';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

## Xử lý lỗi & toast

- **Service**: Gọi API, trả về `Promise<ResponseObject<T>>`, kiểm tra HTTP status và errorCode.
- **Component**: Tự kiểm tra `errorCode`, xử lý `data` và hiển thị toast tương ứng.
- Dùng `react-hot-toast` hoặc tương tự tại component để hiển thị thông báo.
- Không log dữ liệu nhạy cảm; `console.error` chỉ phục vụ debug.

## Quy ước path

- Giữ đúng chuẩn backend: `/api/v1/<resource>` và dùng RESTful methods.
- Ví dụ:
  - `GET /api/v1/students` - Danh sách học sinh
  - `GET /api/v1/students/{id}` - Chi tiết học sinh
  - `POST /api/v1/students` - Tạo mới học sinh
  - `PUT /api/v1/students/{id}` - Cập nhật học sinh
  - `DELETE /api/v1/students/{id}` - Xóa học sinh

## Error Handling Helper

Tạo helper function để xử lý error codes:

```typescript
// src/lib/utils/error-handler.ts
import { ERROR_CODES } from '@/lib/constants/error-codes';
import { ResponseObject } from '@/types/api';

export function handleApiError(response: ResponseObject<any>): string {
  const { errorCode, errorDetail } = response;
  
  switch (errorCode) {
    case ERROR_CODES.UNAUTHORIZED:
      return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
    case ERROR_CODES.FORBIDDEN:
      return 'Bạn không có quyền thực hiện thao tác này.';
    case ERROR_CODES.NOT_FOUND:
      return 'Không tìm thấy dữ liệu.';
    case ERROR_CODES.VALIDATION_ERROR:
      return errorDetail || 'Dữ liệu không hợp lệ.';
    default:
      return errorDetail || 'Có lỗi xảy ra. Vui lòng thử lại.';
  }
}
```

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/nextjs/api-client.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/nextjs/security-auth.md
================================================================================

# Bảo mật & Auth
[← Quay lại Overview](README.md)

## Token & storage

- Token lưu tại localStorage hoặc sessionStorage (khuyến nghị sessionStorage cho accessToken).
- `apiClient` tự gắn Bearer token nếu token tồn tại.
- Refresh token: lưu tại localStorage hoặc httpOnly cookie (nếu backend hỗ trợ).

### Token Storage Pattern

```typescript
// src/lib/utils/auth.ts
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
```

## Redirect & middleware

- Middleware hiện chỉ pass-through; auth/redirect xử lý client-side (layout/component).
- Khi thiếu token hoặc `errorCode` không thành công (401/403), component quyết định toast + điều hướng login.
- Protected routes: sử dụng middleware hoặc component-level check.

### Protected Route Pattern

```typescript
// src/app/dashboard/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

## Quy tắc

- Không log token/nhạy cảm.
- Dùng HTTPS trên môi trường triển khai.
- `clearTokens` để sign-out an toàn.
- Xử lý token refresh tự động trong API client interceptor.

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/nextjs/security-auth.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/nextjs/state-utilities.md
================================================================================

# State, utilities & form
[← Quay lại Overview](README.md)

## State/Context

- Sử dụng React hooks/state nội bộ hoặc Context (vd. `AuthContext`, `ThemeContext`) khi cần chia sẻ dữ liệu.
- Khi dùng effect async, cleanup subscription/timeouts; tránh memory leak.
- Sử dụng `useState`, `useEffect`, `useCallback`, `useMemo` hợp lý để tối ưu performance.

### Ví dụ Context

```typescript
// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAccessToken, setTokens, clearTokens } from '@/lib/utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    setTokens(accessToken, refreshToken);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearTokens();
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

## Form & validation

- Có thể dùng React Hook Form + Zod (khuyến nghị) hoặc form controlled thuần React.
- Hiển thị lỗi từ `errorDetail` khi call API; toast tại UI layer.
- Validation ở client-side với Zod schema, sau đó gửi lên server.

### Ví dụ Form với React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const studentSchema = z.object({
  username: z.string().min(3).max(50),
  grade: z.number().min(6).max(7),
});

type StudentFormData = z.infer<typeof studentSchema>;

export function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      const response = await studentService.create(data);
      if (response.errorCode === '0000') {
        toast.success('Tạo học sinh thành công!');
      } else {
        toast.error(response.errorDetail);
      }
    } catch (error) {
      toast.error('Hệ thống không có phản hồi.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Utilities

- Cookie: `cookie.util.ts` (get/set/remove, clearAuthCookies).
- Date/number/image utils: dùng sẵn trong `src/lib/utils/`.
- Toast: `toast.util.tsx` (react-hot-toast, có hàm warning).
- API helpers: chỉ dùng HTTP client cho call backend.

### Ví dụ Utility Functions

```typescript
// src/lib/utils/auth.ts
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
```

## Custom Hooks

Tạo custom hooks để tái sử dụng logic:

```typescript
// src/lib/hooks/useStudents.ts
import { useState, useEffect } from 'react';
import { studentService } from '@/lib/api/student.service';
import { Student } from '@/types/student';

export function useStudents(searchParams?: StudentSearch) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await studentService.getList(searchParams);
        if (response.errorCode === '0000') {
          setStudents(response.data || []);
        } else {
          setError(response.errorDetail);
        }
      } catch (err) {
        setError('Hệ thống không có phản hồi.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [searchParams]);

  return { students, loading, error };
}
```

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/nextjs/state-utilities.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/nextjs/style-format-lint.md
================================================================================

# Style, format & lint
[← Quay lại Overview](README.md)

## Lint

- ESLint `next/core-web-vitals`; TypeScript strict mode.
- Khuyến nghị giữ warning sạch trước khi commit.

## Format & quote

- Tuân thủ style JS/TS hiện hành: ưu tiên single quote, trailing comma chuẩn JS/TS, indent consistent (2 spaces).
- Có thể dùng Prettier nội bộ, miễn không xung đột quy tắc ESLint (giữ core-web-vitals).

### Prettier Configuration (Recommended)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## CSS/SCSS

- Ưu tiên tái dùng class/biến có sẵn (Tailwind CSS classes, SCSS variables), tránh lồng selector sâu, hạn chế thêm CSS thừa.
- Không yêu cầu BEM bắt buộc; tránh override mạnh vào vendor trừ khi cần.
- Sử dụng Tailwind CSS utility classes khi có thể.

### Tailwind CSS Usage

```tsx
// ✓ Good: Sử dụng Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800">Students</h2>
</div>

// ✗ Avoid: Inline styles hoặc custom CSS không cần thiết
<div style={{ display: 'flex', padding: '16px' }}>
  <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Students</h2>
</div>
```

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/nextjs/style-format-lint.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/nextjs/ui-components.md
================================================================================

# UI Components Conventions
[← Quay lại Overview](README.md)

## Actions Column & ActionsDropdown

### Tổng quan

Tất cả các màn hình có cột **Actions** (Thao tác) phải sử dụng component `ActionsDropdown` để hiển thị các hành động dưới dạng dropdown menu. Component này đảm bảo tính nhất quán về UI/UX và styling across toàn bộ ứng dụng.

### Component Location

- **Path**: `src/components/common/ActionsDropdown.tsx`
- **Type Definition**: `src/types/common.ts` - Interface `ActionItem`

### Cấu trúc ActionItem

```typescript
interface ActionItem {
  id: string;                    // Unique identifier cho action
  label: string;                 // Text hiển thị cho action
  type: 'success' | 'warning' | 'danger' | 'info';  // Loại action (quyết định màu sắc)
  icon?: ReactNode;              // Icon tùy chọn (optional)
  onClick: () => void;           // Callback khi click vào action
  disabled?: boolean;             // Trạng thái disabled (optional)
}
```

### Action Types & Màu sắc

Mỗi action type có màu sắc riêng để người dùng dễ nhận biết:

- **`success`**: Màu xanh lá (green) - Dùng cho các hành động tích cực như "Kích hoạt", "Xác nhận"
- **`warning`**: Màu vàng (yellow) - Dùng cho các hành động cảnh báo như "Tạm dừng", "Ngừng hoạt động"
- **`danger`**: Màu đỏ (red) - Dùng cho các hành động nguy hiểm như "Xóa", "Vô hiệu hóa"
- **`info`**: Màu xanh dương (blue) - Dùng cho các hành động thông tin như "Xem chi tiết", "Xem thêm"

### Animation & Styling

- **Animated Color Bar**: Mỗi action item có một dải màu ở phía dưới (height: 0.5, `h-0.5`)
- **Hover Animation**: Khi hover vào action item, dải màu sẽ chuyển động từ trái sang phải (từ `w-0` sang `w-full`)
- **Animation Duration**: 500ms (`duration-500`) với easing `ease-in-out`
- **Color Bar Position**: `absolute bottom-0 left-0`

### Cách sử dụng

#### 1. Import Component

```tsx
import ActionsDropdown from '@/components/common/ActionsDropdown';
import { ActionItem } from '@/types/common';
```

#### 2. Định nghĩa Actions

```tsx
const getActions = (item: YourItemType): ActionItem[] => {
  const actions: ActionItem[] = [
    {
      id: 'view',
      label: 'Xem chi tiết',
      type: 'info',
      icon: <EyeIcon />,
      onClick: () => handleViewDetail(item),
    },
    {
      id: 'edit',
      label: 'Chỉnh sửa',
      type: 'warning',
      icon: <EditIcon />,
      onClick: () => handleEdit(item),
      disabled: !canEdit, // Optional: disable nếu không có quyền
    },
    {
      id: 'delete',
      label: 'Xóa',
      type: 'danger',
      icon: <TrashIcon />,
      onClick: () => handleDelete(item),
    },
  ];

  // Có thể thêm logic điều kiện
  if (item.status === 'ACTIVE') {
    actions.push({
      id: 'deactivate',
      label: 'Ngừng hoạt động',
      type: 'warning',
      onClick: () => handleDeactivate(item),
    });
  }

  return actions;
};
```

#### 3. Sử dụng trong Table

```tsx
<TableCell className="px-4 py-3 text-start">
  <ActionsDropdown actions={getActions(item)} />
</TableCell>
```

### Best Practices

1. **Consistent Action Types**: Luôn sử dụng đúng action type phù hợp với hành động
2. **Icon Usage**: Nên sử dụng icon cho mỗi action để tăng tính trực quan
3. **Disabled State**: Sử dụng `disabled` prop khi action không thể thực hiện
4. **Conditional Actions**: Thêm/xóa actions dựa trên trạng thái hoặc quyền của item
5. **Error Handling**: Đảm bảo `onClick` handler có error handling phù hợp
6. **Accessibility**: Component đã được thiết kế với accessibility in mind

### Dark Mode Support

Component tự động hỗ trợ dark mode thông qua Tailwind CSS dark mode classes. Không cần thêm styling riêng.

---

## Button Loading State

### Tổng quan

Tất cả các button có hành động async (gọi API, xử lý dữ liệu) **bắt buộc** phải có loading state với các quy định sau để đảm bảo tính nhất quán về UI/UX và trải nghiệm người dùng.

### Quy định bắt buộc

#### 1. Disabled State
- Button **phải** bị disable khi đang trong trạng thái loading
- Sử dụng `disabled={loading}` prop
- Thêm class `disabled:opacity-50 disabled:cursor-not-allowed` để hiển thị trạng thái disabled rõ ràng

#### 2. Loading Spinner Icon
- **Bắt buộc** hiển thị loading spinner icon (vòng tròn xoay) phía trước text khi loading
- Spinner phải có animation xoay tròn liên tục
- Sử dụng SVG với class `animate-spin` của Tailwind CSS
- Kích thước: `h-4 w-4` (16x16px) hoặc tương đương
- Màu sắc: phù hợp với màu text của button (thường là `text-white` cho button primary)

#### 3. Text Animation
- Text phải thay đổi từ text ban đầu sang format: `"Đang [action] ..."`
- Dấu chấm (`.`) phải có animation thay đổi: `.` → `..` → `...` → `.` (lặp lại)
- Interval: Sử dụng constant `BUTTON_LOADING_CONFIG.DOTS_ANIMATION_INTERVAL` từ `@/lib/config/ui.config` (mặc định: 500ms)
- Animation phải mượt và rõ ràng
- **Bắt buộc**: Không được hardcode interval, phải sử dụng constant để dễ điều chỉnh

#### 4. Layout & Spacing
- Button phải sử dụng `flex items-center gap-2` để căn chỉnh icon và text
- Icon và text phải được căn giữa theo chiều dọc

### Ví dụ Text Mapping

| Text ban đầu | Text khi loading |
|--------------|------------------|
| "Tạo bài tập" | "Đang tạo..." |
| "Lưu" | "Đang lưu..." |
| "Xóa" | "Đang xóa..." |
| "Cập nhật" | "Đang cập nhật..." |
| "Gửi" | "Đang gửi..." |
| "Tải lên" | "Đang tải lên..." |
| "Xác nhận" | "Đang xác nhận..." |

### Configuration

Tất cả các cấu hình liên quan đến button loading state được tập trung trong file `src/lib/config/ui.config.ts` để dễ dàng điều chỉnh:

```typescript
export const BUTTON_LOADING_CONFIG = {
  /**
   * Interval (in milliseconds) for loading dots animation
   * Controls how fast the dots change: . → .. → ... → .
   * Default: 500ms
   */
  DOTS_ANIMATION_INTERVAL: 500,
} as const;
```

**Lưu ý**: 
- Để thay đổi tốc độ animation, chỉ cần sửa giá trị `DOTS_ANIMATION_INTERVAL` trong file config
- Tất cả button trong project sẽ tự động sử dụng giá trị mới
- Không được hardcode interval trong code, phải sử dụng constant

### Implementation Pattern

#### 1. Import Configuration

```tsx
import { BUTTON_LOADING_CONFIG } from '@/lib/config/ui.config';
```

#### 2. State Management

```tsx
const [loading, setLoading] = useState(false);
const [loadingDots, setLoadingDots] = useState('.');

// Animation for loading dots
useEffect(() => {
  if (loading) {
    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev === '.') return '..';
        if (prev === '..') return '...';
        return '.';
      });
    }, BUTTON_LOADING_CONFIG.DOTS_ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  } else {
    setLoadingDots('.');
  }
}, [loading]);
```

#### 3. Loading Spinner Component

```tsx
{loading && (
  <svg
    className="animate-spin h-4 w-4 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)}
```

#### 4. Button Implementation

```tsx
<button
  type="submit"
  disabled={loading}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
>
  {loading && (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )}
  {loading ? `Đang tạo${loadingDots}` : 'Tạo bài tập'}
</button>
```

### Complete Example

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { BUTTON_LOADING_CONFIG } from '@/lib/config/ui.config';

export default function ExampleForm() {
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('.');

  // Animation for loading dots
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === '.') return '..';
          if (prev === '..') return '...';
          return '.';
        });
      }, BUTTON_LOADING_CONFIG.DOTS_ANIMATION_INTERVAL);

      return () => clearInterval(interval);
    } else {
      setLoadingDots('.');
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call or async operation
      await someAsyncOperation();
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {loading ? `Đang lưu${loadingDots}` : 'Lưu'}
      </button>
    </form>
  );
}
```

### Best Practices

1. **Consistent Loading Text**: Luôn sử dụng format `"Đang [action]..."` cho tất cả button
2. **Animation Timing**: Giữ interval 500ms để animation mượt mà và không quá nhanh
3. **Spinner Size**: Sử dụng kích thước phù hợp với button (thường là `h-4 w-4` cho button nhỏ, `h-5 w-5` cho button lớn)
4. **Color Consistency**: Spinner color phải phù hợp với text color của button
5. **Cleanup**: Luôn cleanup interval trong useEffect để tránh memory leak
6. **Reset State**: Reset `loadingDots` về `'.'` khi loading kết thúc
7. **Accessibility**: Button disabled state đã được xử lý tự động bởi browser, đảm bảo screen reader có thể đọc được trạng thái

### Dark Mode Support

Loading spinner và button tự động hỗ trợ dark mode thông qua Tailwind CSS dark mode classes. Không cần thêm styling riêng.

### Checklist khi implement

- [ ] Button có `disabled={loading}` prop
- [ ] Button có class `disabled:opacity-50 disabled:cursor-not-allowed`
- [ ] Button có class `flex items-center gap-2`
- [ ] Loading spinner icon được hiển thị khi `loading === true`
- [ ] Spinner có class `animate-spin`
- [ ] Text thay đổi từ text ban đầu sang `"Đang [action]..."`
- [ ] Dấu chấm có animation: `.` → `..` → `...` → `.`
- [ ] Interval được cleanup trong useEffect
- [ ] `loadingDots` được reset về `'.'` khi loading kết thúc

---

## Clickable ID Column

### Tổng quan

Tất cả các màn hình danh sách có cột **ID** phải cho phép click vào giá trị ID để điều hướng đến trang chi tiết tương ứng. ID sẽ được hiển thị theo format `...xxx` trong đó `xxx` là 3 ký tự cuối cùng của UUID để tiết kiệm không gian và tăng tính nhất quán.

### Format hiển thị cột ID

**Quy định bắt buộc**: Tất cả các cột ID trong bảng danh sách phải hiển thị theo format `...xxx` trong đó `xxx` là 3 ký tự cuối cùng của UUID.

#### Quy tắc format

- **Format**: `...xxx` (3 ký tự cuối của UUID)
- **Ví dụ**: 
  - `019b452c-e31e-75b3-b7d9-02cd5b31459d` → `...59d`
  - `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → `...890`
  - `123` → `123` (nếu ID có ≤ 3 ký tự, hiển thị nguyên ID)
- **Utility Function**: `formatIdShort()` trong `src/lib/utils/formatters.ts`
- **Bắt buộc**: Không được hardcode format, phải sử dụng `formatIdShort()` function

#### Lý do sử dụng format này

1. **Tiết kiệm không gian**: UUID thường rất dài (36 ký tự), format ngắn gọn giúp bảng gọn hơn
2. **Dễ nhận biết**: 3 ký tự cuối đủ để phân biệt các item trong cùng một view
3. **Nhất quán**: Tất cả các màn hình danh sách sử dụng cùng một format
4. **Clickable**: Vẫn có thể click để xem chi tiết đầy đủ

### Utility Function

```typescript
/**
 * Format ID to show only last 3 characters with ellipsis prefix
 * Example: "019b452c-e31e-75b3-b7d9-02cd5b31459d" -> "...59d"
 */
export function formatIdShort(id: string | null | undefined): string {
  if (!id) {
    return '';
  }
  if (id.length <= 3) {
    return id;
  }
  return '...' + id.slice(-3);
}
```

### Styling Pattern

Tất cả các ID cell phải có các classes sau:

- `cursor-pointer` - Hiển thị pointer cursor khi hover
- `hover:text-blue-600 dark:hover:text-blue-400` - Hover effect với màu xanh
- `font-mono` - Font monospace để dễ đọc ID

### Cách sử dụng

#### 1. Import Utility Function

```tsx
import { formatIdShort } from '@/lib/utils/formatters';
import { useRouter } from 'next/navigation';
```

#### 2. Implementation cho Navigation (Exercises, Questions)

```tsx
const router = useRouter();

<TableCell 
  className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-white/90 font-mono cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
  onClick={() => router.push(`/content/exercises/${exercise.id}`)}
>
  {formatIdShort(exercise.id)}
</TableCell>
```

#### 3. Implementation với Event Bubbling (khi row có onClick)

```tsx
<TableRow
  onClick={() => router.push(`/content/questions/${question.id}`)}
>
  <TableCell 
    className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-white/90 font-mono cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
    onClick={(e) => {
      e.stopPropagation(); // Ngăn event bubbling nếu row có onClick
      router.push(`/content/questions/${question.id}`);
    }}
  >
    {formatIdShort(question.id)}
  </TableCell>
</TableRow>
```

#### 4. Implementation cho Modal (Prompt Templates)

```tsx
<TableCell 
  className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-white/90 font-mono cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
  onClick={() => onViewDetail?.(template)}
>
  {formatIdShort(template.id)}
</TableCell>
```

### Best Practices

1. **Consistent Format**: Luôn sử dụng `formatIdShort()` để format ID, không hardcode format
2. **Click Handler**: ID cell phải có `onClick` handler để điều hướng hoặc mở modal
3. **Event Bubbling**: Sử dụng `e.stopPropagation()` khi row có onClick riêng
4. **Styling**: Áp dụng đúng các classes theo pattern đã định nghĩa
5. **Accessibility**: Đảm bảo ID cell có thể được focus và activate bằng keyboard

### Dark Mode Support

ID cell tự động hỗ trợ dark mode thông qua Tailwind CSS dark mode classes (`dark:hover:text-blue-400`, `dark:text-white/90`).

### Checklist khi implement

- [ ] Import `formatIdShort` từ `@/lib/utils/formatters`
- [ ] ID cell có class `cursor-pointer`
- [ ] ID cell có class `hover:text-blue-600 dark:hover:text-blue-400`
- [ ] ID cell có class `font-mono`
- [ ] Sử dụng `formatIdShort(id)` để hiển thị ID
- [ ] ID cell có `onClick` handler để điều hướng hoặc mở modal
- [ ] Nếu row có onClick, sử dụng `e.stopPropagation()` trong ID cell onClick
- [ ] Test navigation/modal hoạt động đúng khi click vào ID

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/nextjs/ui-components.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/README.md
================================================================================

# Tổng quan quy tắc chung - Flutter/Dart

Tài liệu này thống kê ngắn gọn các quy tắc bắt buộc cho mobile app Flutter/Dart của hệ thống Tutor. Chi tiết từng mảng nằm trong các file chuyên đề được liên kết bên dưới.

## Nguyên tắc cốt lõi

- Flutter 3.16+ với Dart 3.2+; tuân thủ Effective Dart guidelines.
- API bắt buộc dùng HTTP client (Dio/Retrofit) và dùng RESTful methods (GET/POST/PUT/DELETE) phù hợp với từng action.
- Token lấy từ SharedPreferences hoặc secure storage, header `Authorization: Bearer <token>`; response dùng `errorCode/errorDetail/data` thống nhất với backend.
- Format code tuân thủ Dart formatter; khuyến nghị sử dụng `dart format` trước khi commit.
- State management dùng Riverpod; tạo providers cho dependency injection và state management.
- Service layer chỉ trả ResponseObject, kiểm tra HTTP status và errorCode; UI layer xử lý ResponseObject với errorCode/errorDetail.

## Response Format

### ResponseObject Structure

Tất cả API trả về `ResponseObject<T>` với cấu trúc:

```dart
// Success Response
ResponseObject<T> {
    errorCode: "0000",        // Optional - mã thành công
    errorDetail: "Operation successful",  // Optional - mô tả thành công
    data: T                   // Dữ liệu trả về
}
// HTTP 200

// Error Response
ResponseObject<?> {
    errorCode: "0001",        // Bắt buộc - mã lỗi từ "0001" đến "9999"
    errorDetail: "Mô tả mã lỗi",  // Bắt buộc - mô tả chính xác mã lỗi
    data: T?                  // Optional - có thể null hoặc chứa thông tin bổ sung
}
// HTTP 401/400/403/404/500
```

### Error Code Convention

- **"0000"**: Thành công (optional trong success response)
- **"0001" - "0999"**: Lỗi nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lỗi xác thực và phân quyền (Authentication & Authorization)
- **"2000" - "2999"**: Lỗi validation (Validation errors)
- **"3000" - "3999"**: Lỗi tài nguyên (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lỗi tích hợp dịch vụ (Service integration errors)
- **"5000" - "5999"**: Lỗi hệ thống (System errors)
- **"6000" - "9999"**: Reserved cho tương lai

### HTTP Status Codes

- HTTP 200: Success (errorCode "0000" hoặc không có)
- HTTP 400: Bad Request (errorCode 2xxx - validation errors)
- HTTP 401: Unauthorized (errorCode 1xxx - authentication errors)
- HTTP 403: Forbidden (errorCode 1xxx - authorization errors)
- HTTP 404: Not Found (errorCode 3xxx - resource not found)
- HTTP 500: Internal Server Error (errorCode 5xxx - system errors)

## Mục chi tiết

- [`code-structure.md`](code-structure.md) - Cấu trúc code & đặt tên
- [`api-client.md`](api-client.md) - Gọi API với HTTP client
- [`state-management.md`](state-management.md) - State management với Riverpod
- [`ui-design-standards/`](ui-design-standards/README.md) - UI Design Standards & Widget Implementation
- [`code-quality.md`](code-quality.md) - Kiểm tra chất lượng code & làm sạch
- [`i18n-standards.md`](i18n-standards.md) - Tiêu chuẩn đa ngôn ngữ (i18n)

## Phạm vi áp dụng

- Toàn bộ mobile app Flutter: `tutor-student-app`
- Các file trong `lib/src/`.

## Ngoài phạm vi

- Quy tắc backend (Java, Python có tài liệu riêng).
- Quy tắc web frontend (Next.js có tài liệu riêng).



================================================================================
# End of: 04-for-developers/coding-standards/flutter/README.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/code-structure.md
================================================================================

# Cấu trúc code & đặt tên
[← Quay lại Overview](README.md)

## Package & layer (Clean Architecture)

- `lib/src/core/`: Core functionality và utilities
  - `base/`: Base classes và interfaces
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

## Đặt tên class/file

- Files: `snake_case.dart` (ví dụ: `student_service.dart`, `student_list_screen.dart`).
- Classes: `PascalCase` (ví dụ: `StudentService`, `StudentListScreen`).
- Functions: `camelCase` (ví dụ: `getStudentList`, `solveMathProblem`).
- Variables: `camelCase` (ví dụ: `studentId`, `isLoading`).
- Constants: `lowerCamelCase` (ví dụ: `apiBaseUrl`) hoặc `UPPER_SNAKE_CASE` cho global constants.
- Không đặt tên viết tắt khó hiểu; ưu tiên tên nghiệp vụ rõ ràng.

## Nguyên tắc chung khi viết code

- Không hardcode string/number lặp lại; đưa vào constants hoặc config.
- **Không hardcode text UI**: Tất cả text hiển thị trên giao diện phải sử dụng i18n keys. Xem chi tiết tại [`i18n-standards.md`](i18n-standards.md).
- Validate đầu vào bằng validators; ném custom exception với errorCode tương ứng.
- Sử dụng Riverpod cho dependency injection và state management.
- Sử dụng Retrofit + Dio cho API calls.
- Không truy cập trực tiếp data layer trong presentation layer; mọi logic qua domain layer (use cases).

## Logging

- Dùng logger package, logger tạo với `Logger()`.
- Log error ở service/screen khi catch Exception; tránh log lặp stack trace nhiều tầng.
- Không log dữ liệu nhạy cảm (password, token), chỉ log request ID, errorCode nếu có.

## Response & Exception

- Tất cả API trả `ResponseObject<T>` với `errorCode`/`errorDetail`/`data`; sử dụng HTTP status codes tương ứng.
- Custom exception mang theo errorCode; error handler map sang user-friendly message.
- Kết hợp HTTP status codes chuẩn (200/400/401/403/404/500) với errorCode trong ResponseObject.

## Navigation

- Sử dụng go_router cho navigation.
- Route paths: kebab-case (ví dụ: `/student-list`, `/tutor-solve`).
- Route names: constants trong `lib/src/presentation/core/router/routes.dart`.

## Ví dụ thêm mới một feature (ví dụ: "Practice Session")

- **Entity**: tạo `lib/src/domain/entities/practice_session.dart`.
- **Repository Interface**: `lib/src/domain/repositories/practice_repository.dart`.
- **Use Case**: `lib/src/domain/use_cases/get_practice_session.dart`.
- **Data Model**: `lib/src/data/models/practice_session_model.dart`.
- **Repository Implementation**: `lib/src/data/repositories/practice_repository_impl.dart`.
- **Service**: `lib/src/data/services/practice_service.dart` (Retrofit interface).
- **Screen**: `lib/src/presentation/features/practice/practice_screen.dart`.
- **Widgets**: `lib/src/presentation/features/practice/widgets/` (nếu cần).

## Tài liệu liên quan

- [API consumption patterns](api-client.md)
- [State management với Riverpod](state-management.md)
- [UI Design Standards](ui-design-standards/README.md)
- [Kiểm tra chất lượng code](code-quality.md)
- [Tiêu chuẩn đa ngôn ngữ (i18n)](i18n-standards.md)

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/code-structure.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/code-quality.md
================================================================================

# Kiểm tra chất lượng code & làm sạch
[← Quay lại Overview](README.md)

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
- [ ] **Không có hardcode text UI** - Tất cả text phải dùng i18n keys (xem [`i18n-standards.md`](i18n-standards.md))
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

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/code-quality.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/api-client.md
================================================================================

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



================================================================================
# End of: 04-for-developers/coding-standards/flutter/api-client.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/state-management.md
================================================================================

# State management với Riverpod
[← Quay lại Overview](README.md)

## Riverpod Patterns

- Sử dụng Riverpod cho dependency injection và state management.
- Tạo providers cho services, repositories, và state.
- Sử dụng code generation với `riverpod_generator` khi có thể.

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

Sử dụng StateNotifier cho complex state management:

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

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/state-management.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/i18n-standards.md
================================================================================

# Tiêu chuẩn Đa ngôn ngữ (i18n) - Flutter Student App

Tài liệu này mô tả các quy tắc và tiêu chuẩn cho việc triển khai đa ngôn ngữ trong Flutter Student App.

## 1. Phạm vi áp dụng đa ngôn ngữ (Scope)

Áp dụng bắt buộc cho toàn bộ nội dung có thể "fix cứng" trên giao diện, bao gồm:

- **Label, button, title, subtitle** - Tất cả nhãn, nút bấm, tiêu đề
- **Placeholder, hint, helper text** - Văn bản gợi ý trong form
- **Message hệ thống** - Success, error, warning, empty state messages
- **Dialog, modal, bottom sheet** - Tất cả nội dung trong popup
- **Tooltip, onboarding text** - Văn bản hướng dẫn
- **Text trong tab bar, menu, item list** - Navigation và menu items

**Không hardcode bất kỳ text nào trực tiếp trong UI code** (kể cả text ngắn như "OK", "Huỷ").

## 2. Ngôn ngữ được hỗ trợ (Language Policy)

Chỉ hỗ trợ 2 ngôn ngữ:

- **vi** – Tiếng Việt (mặc định)
- **en** – English

Không chuẩn bị sẵn cấu trúc cho ngôn ngữ thứ 3 (để tránh over-engineering).

Tất cả logic i18n phải giả định hệ thống chỉ có 2 locale này.

## 3. Nguyên tắc thiết kế key ngôn ngữ (Translation Keys)

### 3.1. Sử dụng semantic keys

Sử dụng key dạng semantic (theo ý nghĩa), **KHÔNG** dùng key theo nội dung hiển thị.

**Tốt:**
```json
"auth_login_button": "Đăng nhập"
"auth_forgot_password_link": "Quên mật khẩu?"
```

**Tránh:**
```json
"button_login_now": "Đăng nhập"
"link_forgot": "Quên mật khẩu?"
```

### 3.2. Quy ước phân cấp key

Key phải được tổ chức theo domain/chức năng, sử dụng dấu gạch dưới (`_`) để phân cấp:

**Lưu ý quan trọng:** Flutter gen-l10n không hỗ trợ dấu chấm (`.`) trong ARB keys. Phải sử dụng underscore (`_`) để Flutter có thể generate getter methods hợp lệ.

**Cấu trúc:**
```
<domain>_<feature>_<element>
```

**Ví dụ:**
- `auth_login_title` - Tiêu đề màn hình đăng nhập (conceptually: `auth.login.title`)
- `auth_login_phone_placeholder` - Placeholder cho trường số điện thoại
- `auth_forgot_password_button` - Nút trong màn hình quên mật khẩu
- `validation_email_invalid` - Thông báo lỗi email không hợp lệ
- `error_network_timeout` - Thông báo lỗi timeout
- `common_button_ok` - Nút OK dùng chung
- `common_button_cancel` - Nút Huỷ dùng chung

### 3.3. Các domain chính

- **`auth.*`** - Authentication (login, signup, forgot password, OAuth)
- **`validation.*`** - Validation messages
- **`common.*`** - Common UI elements (buttons, labels, actions)
- **`error.*`** - Error messages
- **`navigation.*`** - Navigation labels (home, profile)
- **`onboarding.*`** - Onboarding screens
- **`practice.*`** - Practice/learning screens
- **`language.*`** - Language switcher

### 3.4. Tính ổn định của key

Key phải ổn định lâu dài, cho phép thay đổi text mà không đổi key.

**Ví dụ:**
```json
"auth_login_button": "Đăng nhập"
```

Có thể thay đổi text thành "Đăng nhập ngay" mà không cần đổi key.

## 4. Tổ chức file ngôn ngữ

### 4.1. Cấu trúc file

Mỗi ngôn ngữ có 1 file ARB riêng:

- `intl_vi.arb` - Tiếng Việt
- `intl_en.arb` - English

**Location:** `lib/src/core/localization/`

### 4.2. Yêu cầu đồng bộ

Cấu trúc file giữa các ngôn ngữ phải giống nhau 100% (same keys).

**Không cho phép:**
- Thiếu key ở 1 ngôn ngữ
- Key dư chỉ tồn tại ở 1 file

### 4.3. Placeholder cho dynamic content

Sử dụng placeholder cho nội dung động:

```json
"practice_question_counter": "Câu {current}/{total}",
"@practice_question_counter": {
    "description": "Question counter with current and total",
    "placeholders": {
        "current": {
            "type": "int",
            "example": "1"
        },
        "total": {
            "type": "int",
            "example": "10"
        }
    }
}
```

**Sử dụng trong code:**
```dart
Text(context.locale.practice_question_counter(1, 10))
```

**Lưu ý:** Flutter gen-l10n giữ nguyên underscore format trong getter names, không convert sang camelCase.

## 5. Quy tắc fallback & an toàn hiển thị

### 5.1. Ngôn ngữ mặc định

Ngôn ngữ mặc định: **Tiếng Việt (vi)**

### 5.2. Fallback logic

Nếu:
- Không tìm thấy key ở **en** → fallback sang **vi**
- Không tìm thấy key ở cả hai → hiển thị key + log lỗi

### 5.3. An toàn hiển thị

Tuyệt đối không để UI hiển thị text rỗng. Luôn có fallback value.

## 6. Quy tắc coding & review

### 6.1. UI layer chỉ được gọi key

UI layer chỉ được gọi key, không được xử lý text.

**Tốt:**
```dart
Text(context.locale.auth_login_button)
```

**Tránh:**
```dart
Text("Đăng nhập")  // Hardcode
```

**Lưu ý:** Flutter gen-l10n giữ nguyên underscore format trong getter names (ví dụ: `auth_login_button` thay vì `authLoginButton`).

### 6.2. Không concat string

Không concat string để tạo câu hoàn chỉnh trong code.

**Tránh:**
```dart
Text("Bạn đã làm đúng " + count + " bài")
```

**Chuẩn:**
```json
"practice_result_correct_count": "Bạn đã làm đúng {count} bài"
```

```dart
Text(context.locale.practice_result_correct_count(count))
```

### 6.3. Code review checklist

Bắt buộc check i18n trong:

- **Code review** - Reviewer phải kiểm tra không có hardcode text
- **PR checklist** - Thêm mục "Đã kiểm tra i18n"

### 6.4. PR thêm màn hình mới

PR thêm màn hình mới:

- Phải kèm update `intl_vi.arb` và `intl_en.arb`
- Tất cả text trong màn hình phải dùng i18n keys

## 7. Quy tắc viết nội dung (Content Guideline)

### 7.1. Tiếng Việt

- Ngắn gọn, rõ ràng, phù hợp học sinh cấp 2
- Tránh từ chuyên môn nặng nề nếu không cần thiết
- Sử dụng ngôn ngữ thân thiện, dễ hiểu

**Ví dụ:**
- ✅ "Đăng nhập" (thay vì "Xác thực người dùng")
- ✅ "Bắt đầu học" (thay vì "Khởi tạo phiên học tập")

### 7.2. Tiếng Anh

- Dùng English đơn giản, trung tính
- Không dùng slang, không dùng idiom
- Phù hợp với học sinh cấp 2

**Ví dụ:**
- ✅ "Sign in" (thay vì "Log in" - có thể gây nhầm lẫn)
- ✅ "Start learning" (thay vì "Commence your learning journey")

### 7.3. Dịch không word-by-word

Hai ngôn ngữ không bắt buộc dịch word-by-word, chỉ cần đúng ý nghĩa.

**Ví dụ:**
- Vi: "Bạn chưa có bài luyện tập nào"
- En: "No practice sessions yet" (không cần dịch word-by-word)

## 8. Dữ liệu động & backend

### 8.1. Text từ backend

Text sinh từ backend:

- Phải trả về code / enum, không trả về text fix cứng
- Mapping text hiển thị thực hiện ở frontend

**Ví dụ:**

Backend trả về:
```json
{
  "status": "weak",
  "level": 3
}
```

Frontend mapping:
```dart
String getSkillStatusText(String status) {
  return switch (status) {
    'weak' => context.locale.skillStatusWeak,
    'medium' => context.locale.skillStatusMedium,
    'strong' => context.locale.skillStatusStrong,
    _ => status,
  };
}
```

### 8.2. Không cho phép backend trả về text

Không cho phép backend trả về:

- Thông báo lỗi bằng tiếng Việt/Anh trực tiếp
- Text UI fix cứng

**Exception duy nhất:**

Nội dung học (bài toán, lời giải) – được coi là content, không phải UI text.

## 9. Lựa chọn ngôn ngữ & lưu trạng thái

### 9.1. Xác định ngôn ngữ

Ngôn ngữ được xác định theo thứ tự:

1. Người dùng chọn thủ công (nếu có)
2. Ngôn ngữ hệ điều hành
3. Fallback về **vi**

### 9.2. Lưu trạng thái

Lưu lựa chọn ngôn ngữ:

- **Local storage / secure storage**
- Key: `language` (value: `vi` hoặc `en`)

### 9.3. Không tự động thay đổi

Không thay đổi ngôn ngữ tự động trong quá trình sử dụng.

## 10. Mục tiêu của tiêu chuẩn này

### 10.1. Đảm bảo

- ✅ UI nhất quán
- ✅ Dễ mở rộng nội dung
- ✅ Dễ làm việc với giáo viên / PM / dev
- ✅ Dễ bảo trì và cập nhật

### 10.2. Tránh

- ❌ Hardcode tràn lan
- ❌ Dịch thiếu, dịch lệch
- ❌ Chi phí sửa UI cao về sau
- ❌ Inconsistency giữa các màn hình

## 11. Ví dụ thực tế

### 11.1. Tạo key mới

**Bước 1:** Thêm vào `intl_vi.arb`:
```json
"practice_question_title": "Câu hỏi",
"practice_question_counter": "Câu {current}/{total}",
"@practice_question_counter": {
    "description": "Question counter",
    "placeholders": {
        "current": {"type": "int", "example": "1"},
        "total": {"type": "int", "example": "10"}
    }
}
```

**Bước 2:** Thêm vào `intl_en.arb`:
```json
"practice_question_title": "Question",
"practice_question_counter": "Question {current}/{total}",
"@practice_question_counter": {
    "description": "Question counter",
    "placeholders": {
        "current": {"type": "int", "example": "1"},
        "total": {"type": "int", "example": "10"}
    }
}
```

**Bước 3:** Chạy code generation:
```bash
flutter gen-l10n
```

**Bước 4:** Sử dụng trong code:
```dart
Text(context.locale.practice_question_title)
Text(context.locale.practice_question_counter(1, 10))
```

**Lưu ý:** Flutter gen-l10n giữ nguyên underscore format trong getter names. Key `practice_question_counter` sẽ tạo getter `practice_question_counter`, không phải `practiceQuestionCounter`.

### 11.2. Refactor hardcode text

**Trước:**
```dart
Text('Câu ${questionNumber}/${totalQuestions}')
```

**Sau:**
```dart
Text(context.locale.practice_question_counter(questionNumber, totalQuestions))
```

## 12. Checklist cho Developer

Khi thêm màn hình/feature mới:

- [ ] Tất cả text đã được chuyển thành i18n keys
- [ ] Đã thêm keys vào cả `intl_vi.arb` và `intl_en.arb`
- [ ] Keys sử dụng semantic naming (domain_feature_element với underscore)
- [ ] Đã chạy `flutter gen-l10n` sau khi thêm keys
- [ ] Đã test với cả 2 ngôn ngữ (vi và en)
- [ ] Không có hardcode text trong code
- [ ] Dynamic content sử dụng placeholder trong i18n

## 13. Tài liệu tham khảo

- [Flutter Internationalization](https://docs.flutter.dev/development/accessibility-and-localization/internationalization)
- [ARB Format Specification](https://github.com/google/app-resource-bundle)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/i18n-standards.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/ui-design-standards/README.md
================================================================================

# UI Design Standards - Flutter Student App

Tài liệu này mô tả các tiêu chuẩn thiết kế UI/UX dành cho Student App, được xây dựng dựa trên nhu cầu thực tế của học sinh lớp 6/7, phụ huynh, và best practices cho edtech.

## Tổng quan

Tài liệu này bao gồm:
- **Design Principles**: Nguyên tắc thiết kế tập trung vào học sinh lớp 6/7
- **Color & Typography**: Bảng màu và hệ thống typography chuẩn
- **Components**: Tiêu chuẩn cho các component UI (buttons, cards, inputs)
- **Interaction Patterns**: Patterns cho feedback, loading, error states
- **Navigation & Flow**: Quy tắc về flow và navigation
- **Accessibility**: Tiêu chuẩn về accessibility
- **Widget Implementation**: Technical patterns cho implementation (code structure, naming, organization)

## Cấu trúc tài liệu

### Design Standards
- [Design Principles](design-principles.md) - Nguyên tắc thiết kế cho học sinh lớp 6/7
- [Color & Typography](color-typography.md) - Bảng màu và typography system
- [Components](components.md) - Tiêu chuẩn component UI
- [Interaction Patterns](interaction-patterns.md) - Patterns cho feedback, loading, error states
- [Navigation & Flow](navigation-flow.md) - Flow patterns và navigation standards
- [Accessibility](accessibility.md) - Tiêu chuẩn accessibility

### Technical Implementation
- [Widget Implementation](widget-implementation.md) - Technical patterns cho code structure, naming, organization

## Mối quan hệ với tài liệu khác

- **Design Standards** (các file trên): Tập trung vào **WHAT** - tiêu chuẩn thiết kế, UX patterns
- **Widget Implementation**: Tập trung vào **HOW** - cách implement trong code

Cả hai phần bổ sung cho nhau:
- Designers/UX team tham khảo Design Standards để thiết kế
- Developers tham khảo Widget Implementation để code

## Tài liệu liên quan

- [Code Structure](../code-structure.md) - Cấu trúc code & đặt tên
- [State Management](../state-management.md) - State management với Riverpod
- [API Client](../api-client.md) - Gọi API với HTTP client
- [Code Quality](../code-quality.md) - Kiểm tra chất lượng code

[← Quay lại Overview](../README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/ui-design-standards/README.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/ui-design-standards/design-principles.md
================================================================================

# Design Principles
[← Quay lại Overview](README.md)

Tài liệu này mô tả các nguyên tắc thiết kế UI/UX dành cho Student App, được xây dựng dựa trên nhu cầu thực tế của học sinh lớp 6/7 và best practices cho edtech.

## Nguyên tắc cốt lõi

### 1. UX dễ dùng cho học sinh lớp 6/7

**Trọng tâm**: Khó khăn thực tế, UX dễ dùng, hướng dẫn rõ ràng, thời lượng ngắn

#### Touch Targets
- **Tối thiểu 44x44px** cho mọi interactive element
- Spacing rộng rãi giữa các button (tối thiểu 8px)
- Tránh đặt các button quan trọng quá gần nhau

#### Visual Clarity
- Font size tối thiểu **14px** cho body text
- Contrast ratio tối thiểu **4.5:1** cho text
- Sử dụng icons rõ ràng, dễ hiểu
- Tránh clutter - mỗi màn hình tập trung vào một task chính

#### Guidance & Onboarding
- Hướng dẫn rõ ràng cho mọi action quan trọng
- Tooltips và helper text khi cần
- Onboarding flow ngắn gọn (< 2 phút)
- Progressive disclosure - chỉ hiển thị thông tin cần thiết

### 2. Thời lượng ngắn, tập trung

**Trọng tâm**: Học sinh lớp 6/7 có thời gian chú ý ngắn

#### Chunking Content
- Chia nhỏ nội dung học thành các phần ngắn (5-10 phút)
- Progress indicators rõ ràng (ví dụ: "Câu 2/10")
- Time estimates cho mỗi activity
- Break options sau mỗi session

#### Immediate Feedback
- Feedback ngay lập tức cho mọi action
- Không để học sinh chờ đợi không rõ lý do
- Loading states với progress indicators
- Success/error messages rõ ràng

### 3. Flow ngắn, thông điệp rõ

**Trọng tâm**: Flow ngắn, thông điệp rõ, giảm ma sát (UX designer edtech perspective)

#### Minimize Steps
- Giảm số bước để hoàn thành task
- Auto-save khi có thể
- Smart defaults - pre-fill thông tin khi có thể
- Skip options cho các bước không bắt buộc

#### Clear Messaging
- Microcopy đơn giản, không dùng jargon
- Thông điệp tích cực, khuyến khích
- Error messages dễ hiểu, có hướng dẫn sửa lỗi
- CTAs rõ ràng (ví dụ: "Bắt đầu học" thay vì "Submit")

#### Reduce Friction
- Giảm form fields tối đa
- Validation real-time, không đợi submit
- Remember user preferences
- Quick actions cho các task thường dùng

### 4. Minh bạch tiến độ (cho Phụ huynh)

**Trọng tâm**: Minh bạch tiến độ, điểm yếu, báo cáo dễ hiểu, nhắc học hiệu quả

#### Progress Transparency
- Progress bars và mastery levels rõ ràng
- Visual charts đơn giản, dễ hiểu
- Color coding nhất quán (xanh = tốt, đỏ = cần cải thiện)
- Plain language - không dùng thuật ngữ kỹ thuật

#### Weak Points Visibility
- Highlight rõ các điểm yếu
- Gợi ý bài tập bổ trợ cụ thể
- Lộ trình cải thiện rõ ràng

#### Effective Reminders
- Notifications thân thiện, không spam
- Reminders có context (ví dụ: "Bạn đã bỏ lỡ 2 ngày, hãy quay lại!")
- Streak tracking để tạo động lực

## Áp dụng trong thực tế

### Ví dụ: Practice Session Flow

**❌ Không tốt:**
- Nhiều bước: Chọn môn → Chọn chủ đề → Chọn độ khó → Chọn số câu → Xác nhận → Bắt đầu
- Không có progress indicator
- Error message: "Validation failed"

**✅ Tốt:**
- Flow ngắn: Chọn môn → Bắt đầu (auto-select defaults)
- Progress indicator: "Câu 1/10" luôn hiển thị
- Error message: "Vui lòng chọn ít nhất 1 câu hỏi"

### Ví dụ: Learning Card

**❌ Không tốt:**
- Text nhỏ (12px)
- Nhiều thông tin trên một card
- Button nhỏ (32x32px)

**✅ Tốt:**
- Text đủ lớn (16px body, 20px heading)
- Một thông điệp chính mỗi card
- Button lớn (44x44px minimum)

## Checklist khi thiết kế

- [ ] Touch targets ≥ 44x44px
- [ ] Font size ≥ 14px cho body text
- [ ] Contrast ratio ≥ 4.5:1
- [ ] Progress indicators rõ ràng
- [ ] Error messages dễ hiểu, có hướng dẫn
- [ ] Flow ngắn, giảm số bước
- [ ] Microcopy đơn giản, không jargon
- [ ] Feedback ngay lập tức cho mọi action
- [ ] Onboarding < 2 phút

## Tài liệu liên quan

- [Color & Typography](color-typography.md) - Bảng màu và typography system
- [Components](components.md) - Tiêu chuẩn component UI
- [Interaction Patterns](interaction-patterns.md) - Feedback, loading, error states
- [Navigation & Flow](navigation-flow.md) - Flow patterns và navigation

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/ui-design-standards/design-principles.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md
================================================================================

# Color & Typography
[← Quay lại Overview](README.md)

Tài liệu này mô tả bảng màu và hệ thống typography chuẩn cho Student App.

## Color Palette

### Primary Colors

| Color | Hex | Usage | Contrast Ratio |
|-------|-----|-------|----------------|
| Primary | `#4CAF50` | Main actions, success states, positive feedback | 4.5:1+ |
| Secondary | `#2196F3` | Information, links, secondary actions | 4.5:1+ |
| Accent | `#FF9800` | Warnings, highlights, important notices | 4.5:1+ |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#4CAF50` | Correct answers, completed tasks |
| Error | `#F44336` | Wrong answers, errors, destructive actions |
| Warning | `#FF9800` | Warnings, attention needed |
| Info | `#2196F3` | Information, tips |

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#F5F5F5` | Screen background |
| Surface | `#FFFFFF` | Card, container background |
| Text Primary | `#212121` | Main text, headings |
| Text Secondary | `#757575` | Secondary text, captions |
| Border | `#E0E0E0` | Borders, dividers |
| Disabled | `#BDBDBD` | Disabled states |

### Color Usage Guidelines

#### Primary Color (#4CAF50 - Green)
- **Khi dùng**: Main CTA buttons, success states, progress indicators, completed tasks
- **Không dùng**: Error states, destructive actions
- **Lý do**: Màu xanh lá tạo cảm giác tích cực, phù hợp với learning context

#### Secondary Color (#2196F3 - Blue)
- **Khi dùng**: Links, information icons, secondary buttons, navigation
- **Không dùng**: Error states, warnings
- **Lý do**: Màu xanh dương tạo cảm giác tin cậy, thông tin

#### Accent Color (#FF9800 - Orange)
- **Khi dùng**: Warnings, highlights, streaks, achievements
- **Không dùng**: Primary actions, error states
- **Lý do**: Màu cam nổi bật, thu hút sự chú ý nhưng không quá nghiêm trọng

### Contrast Requirements

- **Text trên background**: Tối thiểu 4.5:1 (WCAG AA)
- **Large text (≥18px)**: Tối thiểu 3:1 (WCAG AA)
- **Interactive elements**: Tối thiểu 3:1 với background
- **Icons**: Tối thiểu 3:1 với background

## Typography

### Font Family

- **Primary**: System default (San Francisco trên iOS, Roboto trên Android)
- **Fallback**: Sans-serif
- **Không dùng**: Decorative fonts, serif fonts (khó đọc trên mobile)

### Type Scale

| Style | Size | Weight | Usage | Line Height |
|-------|------|--------|-------|-------------|
| Heading 1 | 24px | Bold (700) | Main page titles | 32px |
| Heading 2 | 20px | Semi-bold (600) | Section titles | 28px |
| Heading 3 | 18px | Semi-bold (600) | Subsection titles | 24px |
| Body Large | 16px | Regular (400) | Body text, paragraphs | 24px |
| Body | 16px | Regular (400) | Default text | 24px |
| Body Small | 14px | Regular (400) | Secondary text, captions | 20px |
| Caption | 12px | Regular (400) | Labels, metadata | 16px |

### Typography Usage

#### Heading 1 (24px Bold)
- **Khi dùng**: Main page titles, onboarding screens
- **Ví dụ**: "Chào mừng bạn đến với Tutor", "Hôm nay học gì?"
- **Không dùng**: Body text, long paragraphs

#### Heading 2 (20px Semi-bold)
- **Khi dùng**: Section titles, card titles
- **Ví dụ**: "Bài tập hôm nay", "Tiến độ học tập"
- **Không dùng**: Body text

#### Heading 3 (18px Semi-bold)
- **Khi dùng**: Subsection titles, list item titles
- **Ví dụ**: "Câu hỏi 1", "Kỹ năng: Phân số"
- **Không dùng**: Body text

#### Body (16px Regular)
- **Khi dùng**: Default text, paragraphs, descriptions
- **Ví dụ**: "Hãy chọn đáp án đúng", "Bạn đã hoàn thành 5/10 câu"
- **Minimum**: Không dùng nhỏ hơn 14px cho body text

#### Body Small (14px Regular)
- **Khi dùng**: Secondary text, helper text, metadata
- **Ví dụ**: "Cập nhật 2 giờ trước", "Gợi ý: Hãy đọc kỹ đề bài"
- **Minimum**: Không dùng nhỏ hơn 12px

#### Caption (12px Regular)
- **Khi dùng**: Labels, timestamps, metadata
- **Ví dụ**: "Đã lưu", "10:30 AM"
- **Minimum**: Không dùng nhỏ hơn 12px

### Text Styles trong Flutter

```dart
// lib/src/presentation/core/theme/app_theme.dart
TextTheme(
  headlineLarge: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    height: 1.33, // 32px / 24px
    color: Colors.grey[900], // #212121
  ),
  headlineMedium: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.4, // 28px / 20px
    color: Colors.grey[900],
  ),
  headlineSmall: TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.33, // 24px / 18px
    color: Colors.grey[900],
  ),
  bodyLarge: TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    height: 1.5, // 24px / 16px
    color: Colors.grey[900],
  ),
  bodyMedium: TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    height: 1.5,
    color: Colors.grey[900],
  ),
  bodySmall: TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    height: 1.43, // 20px / 14px
    color: Colors.grey[600], // #757575
  ),
  labelSmall: TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    height: 1.33, // 16px / 12px
    color: Colors.grey[600],
  ),
)
```

## Spacing Scale

| Size | Value | Usage |
|------|-------|-------|
| XS | 4px | Tight spacing, icon padding |
| S | 8px | Default spacing, button padding |
| M | 16px | Section spacing, card padding |
| L | 24px | Large spacing, screen margins |
| XL | 32px | Extra large spacing, section gaps |
| XXL | 48px | Screen-level spacing |

## Best Practices

### Do's
- ✅ Sử dụng Primary color cho main CTAs
- ✅ Đảm bảo contrast ratio ≥ 4.5:1 cho text
- ✅ Font size tối thiểu 14px cho body text
- ✅ Sử dụng type scale nhất quán
- ✅ Spacing rộng rãi giữa các elements

### Don'ts
- ❌ Không dùng màu đỏ cho primary actions
- ❌ Không dùng font size < 12px
- ❌ Không dùng text màu xám nhạt trên background trắng (contrast thấp)
- ❌ Không mix nhiều font families
- ❌ Không dùng decorative fonts

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Components](components.md) - Tiêu chuẩn component UI
- [Widget Implementation](widget-implementation.md) - Theme implementation trong code

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/ui-design-standards/components.md
================================================================================

# Components
[← Quay lại Overview](README.md)

Tài liệu này mô tả tiêu chuẩn cho các component UI trong Student App.

## Buttons

### Primary Button

**Khi dùng**: Main actions, CTAs quan trọng (ví dụ: "Bắt đầu học", "Nộp bài")

**Specs**:
- Background: Primary color (#4CAF50)
- Text: White, 16px, Bold
- Height: Tối thiểu 44px
- Padding: 16px horizontal, 12px vertical
- Border radius: 8px
- Shadow: Nhẹ (elevation 2)
- Touch target: ≥ 44x44px

**States**:
- Default: Primary color background
- Pressed: Darker shade (80% opacity)
- Disabled: Grey (#BDBDBD), không clickable
- Loading: Show spinner, disable interaction

**Ví dụ Flutter**:
```dart
ElevatedButton(
  onPressed: onPressed,
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.green, // #4CAF50
    foregroundColor: Colors.white,
    minimumSize: Size(double.infinity, 44),
    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    elevation: 2,
  ),
  child: Text(
    'Bắt đầu học',
    style: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.bold,
    ),
  ),
)
```

### Secondary Button

**Khi dùng**: Secondary actions, cancel, skip

**Specs**:
- Background: Transparent hoặc white
- Border: 1px solid Primary color (#4CAF50)
- Text: Primary color, 16px, Semi-bold
- Height: Tối thiểu 44px
- Padding: 16px horizontal, 12px vertical
- Border radius: 8px
- No shadow

**Ví dụ Flutter**:
```dart
OutlinedButton(
  onPressed: onPressed,
  style: OutlinedButton.styleFrom(
    foregroundColor: Colors.green, // #4CAF50
    minimumSize: Size(double.infinity, 44),
    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    side: BorderSide(color: Colors.green, width: 1),
  ),
  child: Text(
    'Bỏ qua',
    style: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w600,
    ),
  ),
)
```

### Text Button

**Khi dùng**: Tertiary actions, links, "Xem thêm"

**Specs**:
- Background: Transparent
- Text: Primary color hoặc Secondary color, 16px, Regular
- Height: Tối thiểu 44px
- Padding: 8px horizontal, 8px vertical
- No border, no shadow

### Icon Button

**Khi dùng**: Actions trong AppBar, quick actions

**Specs**:
- Size: 44x44px (minimum)
- Icon size: 24px
- Background: Transparent hoặc subtle grey
- Border radius: 8px (nếu có background)

## Cards

### Learning Card

**Khi dùng**: Hiển thị bài học, chủ đề học tập

**Structure**:
- Icon/Image (left hoặc top)
- Title (Heading 2 - 20px)
- Description (Body - 16px, optional)
- Progress bar (optional)
- Action button (optional)

**Specs**:
- Background: White (#FFFFFF)
- Padding: 16px
- Border radius: 12px
- Shadow: Nhẹ (elevation 1)
- Spacing: 12px giữa các elements

**Ví dụ Flutter**:
```dart
Card(
  elevation: 1,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(Icons.book, size: 24),
            SizedBox(width: 12),
            Expanded(
              child: Text(
                'Phân số',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ),
          ],
        ),
        SizedBox(height: 8),
        Text(
          'Học cách cộng, trừ, nhân, chia phân số',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        SizedBox(height: 12),
        LinearProgressIndicator(value: 0.6),
      ],
    ),
  ),
)
```

### Skill Card

**Khi dùng**: Hiển thị kỹ năng, mastery level

**Structure**:
- Skill name (Heading 3 - 18px)
- Mastery level (Circular progress hoặc percentage)
- Status badge (optional)

**Specs**:
- Background: White với subtle border
- Padding: 16px
- Border radius: 8px
- Visual hierarchy rõ ràng

### Practice Card

**Khi dùng**: Hiển thị câu hỏi practice

**Structure**:
- Question number (Caption - 12px)
- Question text (Body - 16px)
- Options (Radio buttons hoặc checkboxes)
- Timer (optional)

**Specs**:
- Background: White
- Padding: 20px
- Border radius: 12px
- Spacing: 16px giữa question và options

## Input Fields

### Text Input

**Khi dùng**: Form inputs, search

**Specs**:
- Height: 48px (minimum)
- Padding: 12px horizontal, 14px vertical
- Border: 1px solid #E0E0E0
- Border radius: 8px
- Font size: 16px
- Label: 14px, above input
- Helper text: 12px, below input

**States**:
- Default: Grey border
- Focused: Primary color border, 2px
- Error: Red border (#F44336), error message below
- Disabled: Grey background, grey text

**Ví dụ Flutter**:
```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Tên học sinh',
    helperText: 'Nhập tên để cá nhân hóa trải nghiệm',
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 14),
  ),
  style: TextStyle(fontSize: 16),
)
```

### Number Input

**Khi dùng**: Nhập số (tuổi, điểm)

**Specs**: Tương tự Text Input, keyboard type: number

### Image Upload

**Khi dùng**: Upload ảnh bài tập

**Specs**:
- Preview area: 200x200px (minimum)
- Border: 2px dashed #E0E0E0
- Border radius: 8px
- Delete button: Icon button, top-right corner

## Progress Indicators

### Linear Progress Bar

**Khi dùng**: Progress trong session, completion percentage

**Specs**:
- Height: 4px hoặc 8px
- Background: #E0E0E0
- Progress: Primary color (#4CAF50)
- Border radius: 4px
- Show percentage (optional): 14px text, right-aligned

**Ví dụ Flutter**:
```dart
Column(
  children: [
    LinearProgressIndicator(
      value: 0.6,
      backgroundColor: Colors.grey[300],
      valueColor: AlwaysStoppedAnimation<Color>(Colors.green),
      minHeight: 8,
    ),
    SizedBox(height: 4),
    Text(
      '60% hoàn thành',
      style: Theme.of(context).textTheme.bodySmall,
      textAlign: TextAlign.right,
    ),
  ],
)
```

### Circular Progress

**Khi dùng**: Mastery level, skill progress

**Specs**:
- Size: 80px (default), có thể scale
- Stroke width: 8px
- Background: #E0E0E0
- Progress: Primary color (#4CAF50)
- Center text: Percentage, 16px Bold

### Streak Badge

**Khi dùng**: Hiển thị số ngày liên tiếp học

**Specs**:
- Background: Accent color (#FF9800)
- Text: White, 14px Bold
- Padding: 8px horizontal, 4px vertical
- Border radius: 12px
- Icon: Fire icon (optional)

## Best Practices

### Do's
- ✅ Buttons tối thiểu 44x44px
- ✅ Cards có shadow nhẹ để tạo depth
- ✅ Input fields có label và helper text rõ ràng
- ✅ Progress indicators luôn hiển thị khi có async operation
- ✅ Consistent spacing (8px, 16px, 24px)

### Don'ts
- ❌ Buttons quá nhỏ (< 44px)
- ❌ Cards quá nhiều thông tin
- ❌ Input fields không có validation feedback
- ❌ Progress indicators không rõ ràng
- ❌ Inconsistent spacing

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Color & Typography](color-typography.md) - Bảng màu và typography
- [Interaction Patterns](interaction-patterns.md) - Feedback, loading, error states
- [Widget Implementation](widget-implementation.md) - Implementation trong code

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/ui-design-standards/components.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md
================================================================================

# Navigation & Flow
[← Quay lại Overview](README.md)

Tài liệu này mô tả các quy tắc về flow patterns, navigation, và microcopy trong Student App.

## Flow Patterns

### Minimize Steps

**Nguyên tắc**: Giảm số bước để hoàn thành task

#### Onboarding Flow
- **Mục tiêu**: < 2 phút để hoàn thành
- **Số bước**: Tối đa 3-4 bước
- **Skip option**: Cho phép skip các bước không bắt buộc
- **Progress indicator**: Hiển thị rõ (ví dụ: "Bước 2/4")

**Ví dụ tốt**:
1. Welcome screen → Chọn lớp → Bắt đầu
2. (Optional) Nhập tên → Bắt đầu

**Ví dụ không tốt**:
1. Welcome → Chọn lớp → Nhập tên → Nhập email → Xác nhận email → Chọn môn học → Chọn chủ đề → Bắt đầu

#### Practice Flow
- **Mục tiêu**: Từ dashboard đến câu hỏi đầu tiên trong < 3 taps
- **Flow**: Dashboard → Chọn bài tập → Câu hỏi đầu tiên
- **Auto-start**: Tự động bắt đầu timer khi vào câu hỏi

#### Submission Flow
- **Mục tiêu**: Submit trong 1 tap sau khi hoàn thành
- **Auto-save**: Tự động lưu progress, không cần "Lưu" button
- **Review step**: Optional, có thể skip

### Smart Defaults

**Nguyên tắc**: Pre-fill thông tin khi có thể

- **Grade selection**: Remember last selection
- **Difficulty**: Default to "Trung bình"
- **Number of questions**: Default to 10
- **Time limit**: Default to "Không giới hạn"

### Progressive Disclosure

**Nguyên tắc**: Chỉ hiển thị thông tin cần thiết, ẩn details trong expandable sections

- **Main screen**: Chỉ hiển thị thông tin quan trọng
- **Details**: Ẩn trong "Xem thêm" hoặc expandable card
- **Advanced options**: Ẩn trong settings, không hiển thị trên main flow

## Navigation Patterns

### Bottom Navigation

**Khi dùng**: Main navigation giữa các sections chính (Dashboard, Practice, Progress, Profile)

**Specs**:
- 4-5 items maximum
- Icons + labels
- Active state rõ ràng (color change)
- Badge cho notifications (optional)

**Sections**:
1. **Dashboard** (Home icon) - Màn hình chính
2. **Practice** (Book icon) - Bài tập
3. **Progress** (Chart icon) - Tiến độ
4. **Profile** (User icon) - Hồ sơ

### AppBar Navigation

**Khi dùng**: Navigation trong feature, back button, actions

**Specs**:
- Back button: Luôn hiển thị khi có thể back
- Title: Rõ ràng, mô tả màn hình hiện tại
- Actions: Tối đa 2-3 actions (ví dụ: Search, Settings)

### Drawer Navigation

**Khi dùng**: Secondary navigation, settings, help

**Specs**:
- Trigger: Hamburger icon trong AppBar
- Items: Settings, Help, About, Logout
- Không dùng cho main navigation

### Deep Linking

**Khi dùng**: Direct navigation đến specific content

**Examples**:
- `/practice/question/123` - Direct đến câu hỏi cụ thể
- `/progress/skill/fractions` - Direct đến skill progress
- `/tutor/solve` - Direct đến tutor mode

## Microcopy Guidelines

### Tone of Voice

**Nguyên tắc**: Thân thiện, khuyến khích, dễ hiểu

- **Formal → Friendly**: "Vui lòng nhập" → "Hãy nhập"
- **Technical → Simple**: "Validation failed" → "Vui lòng kiểm tra lại"
- **Negative → Positive**: "Bạn đã sai" → "Hãy thử lại nhé!"

### Button Labels

**Nguyên tắc**: Action-oriented, rõ ràng

**Good**:
- "Bắt đầu học"
- "Nộp bài"
- "Xem kết quả"
- "Thử lại"

**Bad**:
- "Submit"
- "OK"
- "Click here"
- "Continue"

### Error Messages

**Nguyên tắc**: Dễ hiểu, có hướng dẫn sửa lỗi

**Good**:
- "Vui lòng nhập tên học sinh" (thay vì "Name is required")
- "Không thể kết nối. Vui lòng kiểm tra internet và thử lại." (thay vì "Network error")
- "Mật khẩu phải có ít nhất 8 ký tự" (thay vì "Password validation failed")

**Bad**:
- "Error 500"
- "Validation failed"
- "Invalid input"

### Success Messages

**Nguyên tắc**: Tích cực, khuyến khích

**Good**:
- "Đã lưu tiến độ!"
- "Làm tốt lắm! Bạn đã hoàn thành 5/10 câu."
- "Chúc mừng! Bạn đã đạt streak 7 ngày!"

**Bad**:
- "Success"
- "Saved"
- "OK"

### Empty States

**Nguyên tắc**: Hướng dẫn action tiếp theo

**Good**:
- "Chưa có bài tập nào. Hãy bắt đầu học để xem bài tập ở đây."
- "Không tìm thấy kết quả. Thử tìm kiếm với từ khóa khác."

**Bad**:
- "No data"
- "Empty"
- "No results found"

## Flow Examples

### Onboarding Flow

```
1. Welcome Screen
   - Title: "Chào mừng đến với Tutor!"
   - Description: "Học Toán dễ dàng, hiệu quả"
   - CTA: "Bắt đầu"

2. Select Grade
   - Title: "Bạn đang học lớp mấy?"
   - Options: Lớp 6, Lớp 7
   - CTA: "Tiếp tục"
   - Skip: "Bỏ qua"

3. (Optional) Enter Name
   - Title: "Tên của bạn là gì?"
   - Input: Text field
   - CTA: "Hoàn thành"
   - Skip: "Bỏ qua"

4. Dashboard
   - Welcome message với tên (nếu có)
   - Today's learning plan
```

### Practice Flow

```
1. Dashboard
   - Tap "Bài tập hôm nay"

2. Practice List
   - List of available practices
   - Tap practice card

3. Practice Session
   - Question 1/10
   - Answer options
   - Submit button

4. Result
   - Score
   - Review answers (optional)
   - Back to dashboard
```

### Tutor Mode Flow

```
1. Dashboard
   - Tap "Giải bài tập"

2. Camera Capture
   - Instructions: "Chụp ảnh bài tập của bạn"
   - Camera button
   - Preview & retake

3. Processing
   - Loading: "Đang phân tích bài tập..."
   - Progress indicator

4. Solution
   - Step-by-step solution
   - Explanation
   - Practice similar problems (optional)
```

## Navigation Best Practices

### Do's
- ✅ Back button luôn hoạt động, trừ khi là entry point
- ✅ Title rõ ràng, mô tả màn hình hiện tại
- ✅ Bottom navigation cho main sections
- ✅ Deep linking cho direct navigation
- ✅ Breadcrumbs cho nested flows (optional)

### Don'ts
- ❌ Navigation quá sâu (> 4 levels)
- ❌ Back button không hoạt động
- ❌ Title không rõ ràng hoặc quá dài
- ❌ Quá nhiều navigation options trên một màn hình
- ❌ Deep links không hoạt động

## Microcopy Checklist

- [ ] Button labels action-oriented, rõ ràng
- [ ] Error messages dễ hiểu, có hướng dẫn
- [ ] Success messages tích cực, khuyến khích
- [ ] Empty states có CTA rõ ràng
- [ ] Tone of voice thân thiện, không formal
- [ ] Không dùng technical jargon
- [ ] Không dùng tiếng Anh khi có thể dùng tiếng Việt

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Components](components.md) - Tiêu chuẩn component UI
- [Interaction Patterns](interaction-patterns.md) - Feedback, loading, error states

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md
================================================================================

# Interaction Patterns
[← Quay lại Overview](README.md)

Tài liệu này mô tả các patterns cho feedback, loading states, error handling, và empty states trong Student App.

## Feedback Patterns

### Immediate Visual Feedback

**Nguyên tắc**: Mọi interaction phải có feedback ngay lập tức

#### Button Press
- **Visual**: Button scale down (0.95) hoặc darker shade
- **Duration**: 100-200ms
- **Haptic**: Light haptic feedback (optional)

#### Card Tap
- **Visual**: Slight elevation change hoặc ripple effect
- **Duration**: 200ms
- **Haptic**: Light haptic feedback

#### Swipe Actions
- **Visual**: Follow finger movement, snap back nếu không đủ distance
- **Duration**: 300ms animation
- **Haptic**: Medium haptic khi complete

### Success Feedback

**Khi dùng**: Khi action thành công (submit answer, save progress)

**Patterns**:
- **Toast message**: Hiển thị 2-3 giây, tự động dismiss
- **Checkmark animation**: Icon checkmark với animation
- **Color change**: Background chuyển sang green nhẹ
- **Haptic**: Success haptic (double tap)

**Ví dụ Flutter**:
```dart
// Toast message
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Đã lưu tiến độ!'),
    duration: Duration(seconds: 2),
    backgroundColor: Colors.green,
    behavior: SnackBarBehavior.floating,
  ),
);
```

### Error Feedback

**Khi dùng**: Khi có lỗi (validation, network error)

**Patterns**:
- **Error message**: Hiển thị rõ ràng, dễ hiểu
- **Visual indicator**: Red border, error icon
- **Action**: Có button "Thử lại" nếu có thể
- **Haptic**: Error haptic (vibration)

**Ví dụ Flutter**:
```dart
// Error widget
Column(
  children: [
    Icon(Icons.error_outline, color: Colors.red, size: 48),
    SizedBox(height: 16),
    Text(
      'Không thể kết nối',
      style: Theme.of(context).textTheme.headlineSmall,
    ),
    SizedBox(height: 8),
    Text(
      'Vui lòng kiểm tra kết nối internet và thử lại',
      style: Theme.of(context).textTheme.bodyMedium,
      textAlign: TextAlign.center,
    ),
    SizedBox(height: 24),
    ElevatedButton(
      onPressed: onRetry,
      child: Text('Thử lại'),
    ),
  ],
)
```

## Loading States

### Skeleton Screens

**Khi dùng**: Khi load data lần đầu (danh sách bài học, profile)

**Patterns**:
- Hiển thị skeleton với shape tương tự content
- Shimmer effect (optional)
- Không hiển thị empty state khi đang loading

**Ví dụ Flutter**:
```dart
// Skeleton card
Container(
  height: 120,
  decoration: BoxDecoration(
    color: Colors.grey[200],
    borderRadius: BorderRadius.circular(12),
  ),
  child: Shimmer.fromColors(
    baseColor: Colors.grey[300]!,
    highlightColor: Colors.grey[100]!,
    child: Container(),
  ),
)
```

### Progress Indicators

**Khi dùng**: Khi có async operation (submit answer, upload image)

**Patterns**:
- **Linear progress**: Cho operations có duration rõ ràng
- **Circular progress**: Cho operations không rõ duration
- **Percentage**: Hiển thị % nếu có thể (ví dụ: upload 60%)

**Ví dụ Flutter**:
```dart
// Loading overlay
Stack(
  children: [
    content,
    if (isLoading)
      Container(
        color: Colors.black54,
        child: Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
          ),
        ),
      ),
  ],
)
```

### Optimistic Updates

**Khi dùng**: Khi có thể (ví dụ: like, bookmark)

**Patterns**:
- Update UI ngay lập tức
- Rollback nếu API call fail
- Show loading indicator nhỏ (không block UI)

## Error Handling UI

### Network Errors

**Khi dùng**: Không có internet, timeout

**Pattern**:
- Error message: "Không thể kết nối. Vui lòng kiểm tra internet."
- Action: "Thử lại" button
- Retry logic: Tự động retry sau 3 giây (optional)

### Validation Errors

**Khi dùng**: Form validation, input errors

**Pattern**:
- Inline error message ngay dưới field
- Red border trên input field
- Error icon (optional)
- Clear error khi user sửa

**Ví dụ Flutter**:
```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Email',
    errorText: errorMessage,
    errorBorder: OutlineInputBorder(
      borderSide: BorderSide(color: Colors.red, width: 2),
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
    ),
  ),
)
```

### Business Logic Errors

**Khi dùng**: Lỗi từ backend (errorCode từ API)

**Pattern**:
- Map errorCode sang user-friendly message
- Hiển thị trong SnackBar hoặc Dialog
- Có action nếu cần (ví dụ: "Đăng nhập lại")

**Ví dụ**:
```dart
// Error handler
void handleError(ResponseObject response) {
  String message;
  switch (response.errorCode) {
    case '1001':
      message = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      break;
    case '2001':
      message = 'Vui lòng nhập đầy đủ thông tin.';
      break;
    default:
      message = response.errorDetail ?? 'Đã có lỗi xảy ra.';
  }
  
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text(message)),
  );
}
```

## Empty States

### No Content

**Khi dùng**: Danh sách rỗng (chưa có bài tập, chưa có tiến độ)

**Pattern**:
- Illustration hoặc icon lớn (48-64px)
- Title: "Chưa có bài tập nào"
- Description: "Hãy bắt đầu học để xem bài tập ở đây"
- CTA: "Bắt đầu học" button

**Ví dụ Flutter**:
```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Icon(Icons.assignment_outlined, size: 64, color: Colors.grey),
    SizedBox(height: 16),
    Text(
      'Chưa có bài tập nào',
      style: Theme.of(context).textTheme.headlineSmall,
    ),
    SizedBox(height: 8),
    Text(
      'Hãy bắt đầu học để xem bài tập ở đây',
      style: Theme.of(context).textTheme.bodyMedium,
      textAlign: TextAlign.center,
    ),
    SizedBox(height: 24),
    ElevatedButton(
      onPressed: onStartLearning,
      child: Text('Bắt đầu học'),
    ),
  ],
)
```

### No Results

**Khi dùng**: Search không có kết quả

**Pattern**:
- Icon: Search icon
- Title: "Không tìm thấy kết quả"
- Description: "Thử tìm kiếm với từ khóa khác"
- Action: Clear search button

### Error State

**Khi dùng**: Load data fail

**Pattern**:
- Icon: Error icon
- Title: "Không thể tải dữ liệu"
- Description: Error message cụ thể
- Action: "Thử lại" button

## Animation Guidelines

### Duration

- **Quick feedback**: 100-200ms (button press, hover)
- **Standard transitions**: 200-300ms (page transitions, card animations)
- **Complex animations**: 300-500ms (modal, drawer)

### Easing

- **Standard**: `Curves.easeInOut`
- **Enter**: `Curves.easeOut`
- **Exit**: `Curves.easeIn`
- **Bounce**: `Curves.elasticOut` (sparingly)

### Performance

- Sử dụng `AnimatedContainer`, `AnimatedOpacity` cho simple animations
- Sử dụng `AnimationController` cho complex animations
- Tránh rebuild không cần thiết trong animations

## Best Practices

### Do's
- ✅ Feedback ngay lập tức cho mọi interaction
- ✅ Loading states rõ ràng, không để user chờ đợi không rõ lý do
- ✅ Error messages dễ hiểu, có hướng dẫn sửa lỗi
- ✅ Empty states có CTA rõ ràng
- ✅ Animations mượt mà, không quá nhanh hoặc quá chậm

### Don'ts
- ❌ Không có feedback khi user tương tác
- ❌ Loading states quá lâu không có progress indicator
- ❌ Error messages technical, khó hiểu
- ❌ Empty states chỉ hiển thị "Không có dữ liệu"
- ❌ Animations quá phức tạp, ảnh hưởng performance

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Components](components.md) - Tiêu chuẩn component UI
- [Navigation & Flow](navigation-flow.md) - Flow patterns

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/ui-design-standards/widget-implementation.md
================================================================================

# Widget Implementation
[← Quay lại Overview](README.md)

Tài liệu này mô tả các technical patterns cho implementation: code structure, naming conventions, và organization cho widgets trong Student App.

## Widget Organization

### Folder Structure

Tách widgets thành các file riêng trong `widgets/` folder của mỗi feature:

```
lib/src/presentation/
├── core/
│   └── widgets/          # Reusable widgets
│       ├── loading_widget.dart
│       ├── error_widget.dart
│       └── empty_state_widget.dart
└── features/
    ├── practice/
    │   └── widgets/      # Feature-specific widgets
    │       ├── question_card.dart
    │       └── answer_option.dart
    └── progress/
        └── widgets/
            ├── progress_card.dart
            └── skill_badge.dart
```

### Reusable vs Feature-Specific

**Reusable widgets** (`lib/src/presentation/core/widgets/`):
- LoadingWidget
- ErrorWidget
- EmptyStateWidget
- PrimaryButton
- SecondaryButton

**Feature-specific widgets** (`lib/src/presentation/features/<feature>/widgets/`):
- PracticeQuestionWidget
- ProgressCardWidget
- SkillBadgeWidget

## Naming Conventions

### Widget Files

- **Format**: `snake_case.dart`
- **Examples**:
  - `student_card.dart`
  - `practice_question_widget.dart`
  - `loading_widget.dart`

### Widget Classes

- **Format**: `PascalCase`
- **Stateless widgets**: `*Widget` suffix (ví dụ: `StudentCardWidget`)
- **Stateful widgets**: `*Screen` hoặc `*Page` suffix (ví dụ: `StudentListScreen`)

**Examples**:
```dart
// Stateless widget
class StudentCardWidget extends StatelessWidget { ... }

// Stateful widget (screen)
class PracticeScreen extends StatefulWidget { ... }

// Stateful widget (page)
class ProgressPage extends StatefulWidget { ... }
```

### Widget Parameters

- **Format**: `camelCase`
- **Required parameters**: Không có default value
- **Optional parameters**: Có default value hoặc nullable

**Examples**:
```dart
class StudentCardWidget extends StatelessWidget {
  final String studentName;        // Required
  final int? grade;                // Optional (nullable)
  final VoidCallback? onTap;       // Optional callback
  final bool showProgress = false;  // Optional with default

  const StudentCardWidget({
    required this.studentName,
    this.grade,
    this.onTap,
    this.showProgress = false,
  });
}
```

## Reusable Components

Tạo reusable widgets cho các UI patterns thường dùng:

### Loading Widget

```dart
// lib/src/presentation/core/widgets/loading_widget.dart
class LoadingWidget extends StatelessWidget {
  final String? message;

  const LoadingWidget({this.message});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircularProgressIndicator(),
          if (message != null) ...[
            const SizedBox(height: 16),
            Text(
              message!,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ],
      ),
    );
  }
}
```

### Error Widget

```dart
// lib/src/presentation/core/widgets/error_widget.dart
class ErrorWidget extends StatelessWidget {
  final String message;
  final VoidCallback? onRetry;

  const ErrorWidget({
    required this.message,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.error_outline,
              size: 48,
              color: Theme.of(context).colorScheme.error,
            ),
            const SizedBox(height: 16),
            Text(
              message,
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            if (onRetry != null) ...[
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: onRetry,
                child: const Text('Thử lại'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
```

### Empty State Widget

```dart
// lib/src/presentation/core/widgets/empty_state_widget.dart
class EmptyStateWidget extends StatelessWidget {
  final String title;
  final String? description;
  final String? actionLabel;
  final VoidCallback? onAction;

  const EmptyStateWidget({
    required this.title,
    this.description,
    this.actionLabel,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.inbox_outlined,
              size: 64,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              title,
              style: Theme.of(context).textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            if (description != null) ...[
              const SizedBox(height: 8),
              Text(
                description!,
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
            ],
            if (onAction != null && actionLabel != null) ...[
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: onAction,
                child: Text(actionLabel!),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
```

## Theme Management

### Theme Definition

Sử dụng `ThemeData` trong MaterialApp và định nghĩa theme trong `lib/src/presentation/core/theme/app_theme.dart`:

```dart
// lib/src/presentation/core/theme/app_theme.dart
import 'package:flutter/material.dart';

class AppTheme {
  // Color palette
  static const Color primaryColor = Color(0xFF4CAF50);      // Green
  static const Color secondaryColor = Color(0xFF2196F3);     // Blue
  static const Color accentColor = Color(0xFFFF9800);        // Orange
  static const Color errorColor = Color(0xFFF44336);        // Red
  static const Color backgroundColor = Color(0xFFF5F5F5);    // Light grey
  static const Color surfaceColor = Color(0xFFFFFFFF);       // White
  static const Color textPrimary = Color(0xFF212121);       // Dark grey
  static const Color textSecondary = Color(0xFF757575);     // Medium grey

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.light(
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: accentColor,
        error: errorColor,
        background: backgroundColor,
        surface: surfaceColor,
      ),
      textTheme: TextTheme(
        headlineLarge: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          height: 1.33,
          color: textPrimary,
        ),
        headlineMedium: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          height: 1.4,
          color: textPrimary,
        ),
        headlineSmall: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          height: 1.33,
          color: textPrimary,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          height: 1.5,
          color: textPrimary,
        ),
        bodyMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          height: 1.5,
          color: textPrimary,
        ),
        bodySmall: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.normal,
          height: 1.43,
          color: textSecondary,
        ),
        labelSmall: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.normal,
          height: 1.33,
          color: textSecondary,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 44),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          elevation: 2,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primaryColor,
          minimumSize: const Size(double.infinity, 44),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          side: BorderSide(color: primaryColor, width: 1),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
      ),
    );
  }

  static ThemeData get darkTheme {
    // Dark theme implementation (nếu cần)
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.dark(
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: accentColor,
        error: errorColor,
      ),
      // ... dark theme colors
    );
  }
}
```

### Using Theme

Sử dụng theme colors và text styles từ theme:

```dart
// ✅ Good: Sử dụng theme
Container(
  color: Theme.of(context).colorScheme.primary,
  child: Text(
    'Hello',
    style: Theme.of(context).textTheme.headlineMedium,
  ),
)

// ❌ Bad: Hardcode colors
Container(
  color: Colors.green,
  child: Text(
    'Hello',
    style: TextStyle(fontSize: 20),
  ),
)
```

## Layout Patterns

### Scaffold Structure

Sử dụng `Scaffold` cho màn hình chính:

```dart
Scaffold(
  appBar: AppBar(
    title: Text('Tiêu đề'),
    actions: [
      IconButton(
        icon: Icon(Icons.search),
        onPressed: () {},
      ),
    ],
  ),
  body: SafeArea(
    child: Padding(
      padding: const EdgeInsets.all(16.0),
      child: content,
    ),
  ),
  bottomNavigationBar: BottomNavigationBar(
    items: [...],
  ),
)
```

### SafeArea

Sử dụng `SafeArea` để tránh notch/status bar overlap:

```dart
SafeArea(
  child: Column(
    children: [
      // Content
    ],
  ),
)
```

### Layout Widgets

Sử dụng `Padding`, `Container`, `Column`, `Row` cho layout:

```dart
Container(
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(vertical: 8),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(
        color: Colors.black.withOpacity(0.1),
        blurRadius: 4,
        offset: Offset(0, 2),
      ),
    ],
  ),
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text('Title'),
      SizedBox(height: 8),
      Text('Description'),
    ],
  ),
)
```

## Responsive Design

### MediaQuery

Sử dụng `MediaQuery` để lấy screen size:

```dart
final screenWidth = MediaQuery.of(context).size.width;
final screenHeight = MediaQuery.of(context).size.height;
final isTablet = screenWidth > 600;
```

### LayoutBuilder

Sử dụng `LayoutBuilder` cho responsive layouts:

```dart
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      // Tablet layout
      return Row(
        children: [leftPanel, rightPanel],
      );
    } else {
      // Mobile layout
      return Column(
        children: [topPanel, bottomPanel],
      );
    }
  },
)
```

### Breakpoints

Tạo breakpoints constants cho tablet/desktop (nếu cần):

```dart
// lib/src/presentation/core/constants/breakpoints.dart
class Breakpoints {
  static const double mobile = 600;
  static const double tablet = 900;
  static const double desktop = 1200;
}

// Usage
final isTablet = MediaQuery.of(context).size.width >= Breakpoints.tablet;
```

## Best Practices

### Do's
- ✅ Tách widgets thành các file riêng
- ✅ Sử dụng naming conventions nhất quán
- ✅ Sử dụng theme colors và text styles
- ✅ Tạo reusable widgets cho patterns thường dùng
- ✅ Sử dụng SafeArea để tránh notch overlap
- ✅ Support responsive design với LayoutBuilder

### Don'ts
- ❌ Hardcode colors và font sizes
- ❌ Tạo widgets quá lớn (> 200 lines)
- ❌ Mix reusable và feature-specific widgets trong cùng folder
- ❌ Không sử dụng SafeArea
- ❌ Không support responsive design

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Color & Typography](color-typography.md) - Bảng màu và typography
- [Components](components.md) - Tiêu chuẩn component UI
- [Code Structure](../code-structure.md) - Cấu trúc code & đặt tên

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/ui-design-standards/widget-implementation.md
================================================================================

================================================================================
# File: 04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md
================================================================================

# Accessibility
[← Quay lại Overview](README.md)

Tài liệu này mô tả các tiêu chuẩn accessibility cho Student App, đảm bảo app có thể sử dụng được bởi mọi người dùng.

## Touch Targets

### Minimum Size

- **Interactive elements**: Tối thiểu **44x44px**
- **Spacing**: Tối thiểu **8px** giữa các touch targets
- **Buttons**: Tối thiểu **44px height**, có thể wider

### Examples

**Good**:
```dart
ElevatedButton(
  style: ElevatedButton.styleFrom(
    minimumSize: Size(88, 44), // Width: 88px, Height: 44px
    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
  ),
  child: Text('Button'),
)
```

**Bad**:
```dart
IconButton(
  icon: Icon(Icons.menu),
  iconSize: 24, // Touch target < 44px
)
```

## Screen Reader Support

### Semantic Labels

**Nguyên tắc**: Mọi interactive element phải có semantic label

#### Buttons
```dart
ElevatedButton(
  onPressed: onPressed,
  child: Row(
    children: [
      Icon(Icons.save),
      Text('Lưu'),
    ],
  ),
  // Flutter tự động tạo semantic label từ child
)

// Hoặc explicit label
Semantics(
  label: 'Lưu tiến độ học tập',
  child: IconButton(
    icon: Icon(Icons.save),
    onPressed: onPressed,
  ),
)
```

#### Images
```dart
Image.asset(
  'assets/learning_illustration.png',
  semanticLabel: 'Học sinh đang học Toán trên máy tính bảng',
)
```

#### Form Fields
```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Tên học sinh',
    hintText: 'Nhập tên của bạn',
  ),
  // Flutter tự động tạo semantic label từ labelText
)
```

### ARIA Attributes

Flutter tự động tạo ARIA attributes từ semantic labels, nhưng có thể customize:

```dart
Semantics(
  label: 'Câu hỏi 1',
  hint: 'Chọn một đáp án',
  value: 'Chưa chọn',
  child: RadioListTile(
    title: Text('Đáp án A'),
    value: 'A',
    groupValue: selectedValue,
    onChanged: onChanged,
  ),
)
```

## Keyboard Navigation

### Focus States

**Nguyên tắc**: Focus states phải rõ ràng, visible

#### Focus Indicator
```dart
Focus(
  child: ElevatedButton(
    style: ElevatedButton.styleFrom(
      // Flutter tự động thêm focus indicator
    ),
    onPressed: onPressed,
    child: Text('Button'),
  ),
)
```

#### Custom Focus Style
```dart
Focus(
  child: Container(
    decoration: BoxDecoration(
      border: Border.all(
        color: isFocused ? Colors.blue : Colors.transparent,
        width: 2,
      ),
    ),
    child: child,
  ),
)
```

### Tab Order

**Nguyên tắc**: Tab order phải logical, theo flow của màn hình

- Từ trên xuống dưới
- Từ trái sang phải
- Skip decorative elements (images, icons không interactive)

## Visual Accessibility

### Contrast Ratios

**Requirements**:
- **Normal text**: Tối thiểu **4.5:1** (WCAG AA)
- **Large text (≥18px)**: Tối thiểu **3:1** (WCAG AA)
- **Interactive elements**: Tối thiểu **3:1** với background

#### Checking Contrast

**Good**:
- Black text (#212121) trên white background (#FFFFFF) = 16.6:1 ✅
- Primary color (#4CAF50) trên white = 3.2:1 ✅ (cho large text)

**Bad**:
- Grey text (#BDBDBD) trên white = 2.1:1 ❌
- Light blue (#90CAF9) trên white = 1.8:1 ❌

### Font Scaling

**Nguyên tắc**: Support system font scaling

```dart
Text(
  'Hello',
  style: TextStyle(
    fontSize: 16,
    // Flutter tự động scale theo system settings
  ),
)

// Hoặc explicit scaling
Text(
  'Hello',
  style: TextStyle(
    fontSize: 16 * MediaQuery.of(context).textScaleFactor,
  ),
)
```

### High Contrast Mode

**Nguyên tắc**: Support system high contrast mode

```dart
// Flutter tự động adapt colors trong high contrast mode
// Đảm bảo sử dụng theme colors, không hardcode colors

Theme.of(context).colorScheme.primary // Adapts to high contrast
```

## Color Blindness Support

### Don't Rely on Color Alone

**Nguyên tắc**: Không chỉ dùng màu để truyền đạt thông tin

**Bad**:
- Chỉ dùng màu đỏ/xanh để phân biệt đúng/sai
- Chỉ dùng màu để hiển thị status

**Good**:
- Kết hợp màu với icon (✓ cho đúng, ✗ cho sai)
- Kết hợp màu với text ("Đúng", "Sai")
- Kết hợp màu với pattern (nếu có)

### Color Combinations

**Avoid**:
- Red + Green (khó phân biệt cho color blind)
- Blue + Purple (khó phân biệt)

**Good**:
- Green + Red + Icon
- Blue + Orange (better contrast)

## Motion & Animation

### Reduced Motion

**Nguyên tắc**: Respect system reduced motion preference

```dart
// Check reduced motion
bool isReducedMotion = MediaQuery.of(context).disableAnimations;

if (isReducedMotion) {
  // Use simple transitions, no complex animations
  return child;
} else {
  // Use normal animations
  return AnimatedContainer(...);
}
```

### Animation Duration

- **Standard**: 200-300ms
- **Reduced motion**: 0ms hoặc instant
- Tránh animations quá nhanh (< 100ms) hoặc quá chậm (> 500ms)

## Testing Accessibility

### Manual Testing

1. **Screen Reader**: Test với TalkBack (Android) hoặc VoiceOver (iOS)
2. **Keyboard Navigation**: Test với keyboard (nếu có)
3. **Font Scaling**: Test với system font scale lớn (200%)
4. **High Contrast**: Test với high contrast mode
5. **Color Blindness**: Test với color blindness simulators

### Automated Testing

```dart
// Flutter accessibility testing
testWidgets('Button has semantic label', (WidgetTester tester) async {
  await tester.pumpWidget(
    ElevatedButton(
      onPressed: () {},
      child: Text('Save'),
    ),
  );

  final semantics = tester.getSemantics(find.text('Save'));
  expect(semantics.label, 'Save');
});
```

## Accessibility Checklist

### Touch Targets
- [ ] Tất cả interactive elements ≥ 44x44px
- [ ] Spacing ≥ 8px giữa touch targets

### Screen Reader
- [ ] Mọi button có semantic label
- [ ] Mọi image có alt text
- [ ] Form fields có labels
- [ ] Test với TalkBack/VoiceOver

### Visual
- [ ] Contrast ratio ≥ 4.5:1 cho text
- [ ] Support font scaling
- [ ] Support high contrast mode
- [ ] Không chỉ dùng màu để truyền đạt thông tin

### Keyboard Navigation
- [ ] Focus states rõ ràng
- [ ] Tab order logical
- [ ] Tất cả interactive elements có thể access bằng keyboard

### Motion
- [ ] Respect reduced motion preference
- [ ] Animations không quá nhanh hoặc quá chậm

## Best Practices

### Do's
- ✅ Sử dụng semantic labels cho mọi interactive element
- ✅ Đảm bảo contrast ratio đủ cao
- ✅ Support font scaling
- ✅ Test với screen readers
- ✅ Không chỉ dùng màu để truyền đạt thông tin

### Don'ts
- ❌ Touch targets < 44x44px
- ❌ Text contrast thấp
- ❌ Hardcode font sizes (không support scaling)
- ❌ Chỉ dùng màu để phân biệt states
- ❌ Animations quá phức tạp, không respect reduced motion

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Color & Typography](color-typography.md) - Bảng màu và typography
- [Components](components.md) - Tiêu chuẩn component UI

[← Quay lại Overview](README.md)



================================================================================
# End of: 04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md
================================================================================

================================================================================
# File: 04-for-developers/testing/testing-strategy.md
================================================================================

# TESTING STRATEGY – PHASE 1 (MVP)

**Project:** Tutor  
**Document type:** Technical Design  
**Audience:** Developer / QA  
**Status:** Draft  
**Version:** 2025-12-15-03-45  
**Author:** Product Consultant (ChatGPT)


---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả **chiến lược testing** cho Tutor – Phase 1, bao gồm:
- Unit testing approach
- Integration testing
- API testing
- AI Service testing strategy
- Test data management
- Coverage requirements
- Testing tools

Tài liệu này đảm bảo chất lượng code và giảm thiểu bugs trước khi release.

---


## 2. TESTING PYRAMID

```
        /\
       /  \  E2E Tests (10%)
      /____\
     /      \  Integration Tests (30%)
    /________\
   /          \  Unit Tests (60%)
  /____________\
```

**Phase 1 Focus:**
- Unit Tests: 60%
- Integration Tests: 30%
- E2E Tests: 10%

---


## 3. UNIT TESTING

### 3.1. Backend – Core Service (Java Spring Boot)

**Framework:** JUnit 5 + Mockito

**Coverage Target:** ≥ 80%

**Test Areas:**
- Service layer logic
- Business rules (adaptive learning, mastery calculation)
- Utility functions
- Data transformations

**Example:**
```java
@ExtendWith(MockitoExtension.class)
class AdaptiveLearningServiceTest {
    
    @Mock
    private SkillRepository skillRepository;
    
    @Mock
    private MasteryRepository masteryRepository;
    
    @InjectMocks
    private AdaptiveLearningService adaptiveLearningService;
    
    @Test
    void testSelectTargetSkill_ReturnsWeakestSkill() {
        // Given
        Student student = createStudent();
        Skill weakSkill = createSkill("6.3.9", 45);
        
        when(masteryRepository.findByStudentId(student.getId()))
            .thenReturn(createMasteries(weakSkill));
        
        // When
        Skill target = adaptiveLearningService.selectTargetSkill(student);
        
        // Then
        assertEquals("6.3.9", target.getId());
    }
}
```

**Best Practices:**
- Test một behavior tại một thời điểm
- Use descriptive test names
- Arrange-Act-Assert pattern
- Mock external dependencies

---

### 3.2. Backend – AI Service (Python)

**Framework:** pytest

**Coverage Target:** ≥ 70%

**Test Areas:**
- Math solver logic
- OCR preprocessing
- Prompt generation
- Response parsing

**Example:**
```python
import pytest
from unittest.mock import Mock, patch
from ai_service.solver import MathSolver

class TestMathSolver:
    
    @pytest.fixture
    def solver(self):
        return MathSolver()
    
    def test_solve_fraction_addition(self, solver):
        # Given
        problem = "Tính: 2/3 + 1/4"
        grade = 6
        
        # When
        result = solver.solve(problem, grade)
        
        # Then
        assert result.final_answer == "11/12"
        assert len(result.steps) > 0
    
    @patch('ai_service.solver.OpenAIClient')
    def test_solve_with_mock_ai(self, mock_ai):
        # Test với mocked AI response
        pass
```

---

### 3.3. Frontend – Student App (Flutter)

**Framework:** Flutter Test

**Coverage Target:** ≥ 60%

**Test Areas:**
- Widget tests
- Business logic (view models)
- State management
- API client mocks

**Example:**
```dart
void main() {
  group('OnboardingViewModel', () {
    test('should create trial profile when grade selected', () async {
      // Given
      final viewModel = OnboardingViewModel();
      final mockApi = MockStudentApi();
      
      // When
      await viewModel.selectGrade(6);
      
      // Then
      expect(viewModel.grade, 6);
      verify(mockApi.createTrial(grade: 6)).called(1);
    });
  });
}
```

---

### 3.4. Frontend – Parent Dashboard (Next.js)

**Framework:** Jest + React Testing Library

**Coverage Target:** ≥ 60%

**Test Areas:**
- Component rendering
- User interactions
- API hooks
- Form validation

**Example:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should submit login form with valid credentials', async () => {
    // Given
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    // When
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'parent@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    // Then
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'parent@example.com',
        password: 'password123'
      });
    });
  });
});
```

---

## 4. INTEGRATION TESTING

### 4.1. API Integration Tests

**Framework:** 
- Java: Spring Boot Test + TestContainers
- Python: pytest + httpx

**Test Areas:**
- End-to-end API flows
- Database interactions
- External service calls (AI Service)

**Example (Java):**
```java
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class StudentApiIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15");
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void testCreateTrialProfile_ReturnsSuccess() throws Exception {
        // Given
        CreateTrialRequest request = new CreateTrialRequest(6, "device-id");
        
        // When & Then
        mockMvc.perform(post("/api/student/trial/start")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.grade").value(6));
    }
}
```

---

### 4.2. Database Integration Tests

**Test Areas:**
- Repository layer
- Migration scripts
- Data integrity
- Transaction handling

**Example:**
```java
@DataJpaTest
class PracticeRepositoryTest {
    
    @Autowired
    private PracticeRepository practiceRepository;
    
    @Test
    void testFindByStudentId_ReturnsPractices() {
        // Given
        Student student = createStudent();
        Practice practice = createPractice(student);
        practiceRepository.save(practice);
        
        // When
        List<Practice> practices = practiceRepository.findByStudentId(student.getId());
        
        // Then
        assertThat(practices).hasSize(1);
        assertThat(practices.get(0).getStudentId()).isEqualTo(student.getId());
    }
}
```

---

### 4.3. Service Integration Tests

**Test Areas:**
- Core Service ↔ AI Service communication
- Error handling
- Timeout handling
- Retry logic

**Example:**
```java
@SpringBootTest
class AIServiceIntegrationTest {
    
    @MockBean
    private AIServiceClient aiServiceClient;
    
    @Autowired
    private TutorService tutorService;
    
    @Test
    void testSolveMathProblem_CallsAIService() {
        // Given
        SolveRequest request = new SolveRequest("2/3 + 1/4", 6);
        when(aiServiceClient.solve(any())).thenReturn(createSolution());
        
        // When
        Solution solution = tutorService.solve(request);
        
        // Then
        verify(aiServiceClient).solve(any());
        assertThat(solution.getFinalAnswer()).isNotNull();
    }
}
```

---

## 5. API TESTING

### 5.1. Postman Collection

Tạo Postman collection cho tất cả APIs:
- Environment variables (dev, staging, prod)
- Pre-request scripts (auth tokens)
- Test assertions
- Data-driven tests

**Structure:**
```
Tutor API Collection
├── Authentication
│   ├── Register Parent (with phone + OTP)
│   ├── Login Parent (phone + password)
│   ├── OAuth Login (Google/Apple)
│   ├── Update Phone Number
│   └── Verify Phone OTP
├── Linking (Student App)
│   ├── Request OTP (phone-based)
│   ├── Verify OTP
│   └── Confirm Link Token (parent-first)
├── Student APIs
│   ├── Trial
│   ├── Tutor Mode
│   └── Practice
└── Parent APIs
    ├── Student Management
    └── Reporting
```

---

### 5.2. Contract Testing

**Tool:** Pact (nếu cần)

**Purpose:** Đảm bảo contract giữa Core Service và AI Service không bị break.

---

## 6. AI SERVICE TESTING STRATEGY

### 6.1. Unit Tests

- Test prompt generation
- Test response parsing
- Test error handling

### 6.2. Integration Tests với Mock AI

- Mock OpenAI API responses
- Test với sample problems
- Validate solution format

### 6.3. Manual Testing

- Test với real math problems
- Validate solution accuracy
- Check Vietnamese language output

**Test Cases:**
```python
test_cases = [
    {
        "problem": "Tính: 2/3 + 1/4",
        "expected_answer": "11/12",
        "grade": 6
    },
    {
        "problem": "Rút gọn phân số: 12/18",
        "expected_answer": "2/3",
        "grade": 6
    }
]
```

---

## 7. TEST DATA MANAGEMENT

### 7.1. Test Fixtures

**Java:**
```java
public class TestFixtures {
    public static Student createStudent() {
        return Student.builder()
            .id(UUID.randomUUID())
            .grade(6)
            .status(StudentStatus.LINKED)
            .build();
    }
}
```

**Python:**
```python
@pytest.fixture
def sample_student():
    return {
        "id": "test-student-id",
        "grade": 6,
        "status": "linked"
    }
```

### 7.2. Test Database

- Use TestContainers cho integration tests
- Separate test database
- Cleanup sau mỗi test

### 7.3. Mock Data

- Use factories (Java: Builder pattern, Python: Faker)
- Consistent test data
- Realistic scenarios

---

## 8. COVERAGE REQUIREMENTS

### 8.1. Minimum Coverage

| Layer | Coverage Target |
|-------|----------------|
| Service Layer | ≥ 80% |
| Repository Layer | ≥ 70% |
| Controller Layer | ≥ 60% |
| Utility Functions | ≥ 90% |
| AI Service Core Logic | ≥ 70% |
| Frontend Business Logic | ≥ 60% |

### 8.2. Coverage Tools

- **Java:** JaCoCo
- **Python:** Coverage.py
- **TypeScript/JavaScript:** Istanbul/nyc
- **Flutter:** Flutter Test Coverage

---

## 9. TESTING TOOLS

### 9.1. Backend

| Tool | Purpose |
|------|---------|
| JUnit 5 | Unit testing (Java) |
| Mockito | Mocking (Java) |
| TestContainers | Integration testing |
| pytest | Unit testing (Python) |
| httpx | HTTP testing (Python) |

### 9.2. Frontend

| Tool | Purpose |
|------|---------|
| Flutter Test | Unit/Widget testing |
| Jest | Unit testing (Next.js) |
| React Testing Library | Component testing |
| Playwright | E2E testing (optional) |

### 9.3. API Testing

| Tool | Purpose |
|------|---------|
| Postman | Manual API testing |
| REST Assured | API testing (Java) |
| pytest-httpx | API testing (Python) |

---

## 10. TESTING WORKFLOW

### 10.1. Pre-commit

```bash
# Run unit tests
mvn test
pytest tests/unit
flutter test

# Check coverage
mvn jacoco:check
```

### 10.2. CI/CD Pipeline

```yaml
# .github/workflows/test.yml
- name: Run Unit Tests
  run: mvn test
  
- name: Run Integration Tests
  run: mvn verify
  
- name: Check Coverage
  run: mvn jacoco:check
```

### 10.3. Before Release

- Run full test suite
- Manual testing checklist
- Performance testing
- Security testing

---

## 10. TEST CASES - OTP & OAuth FLOWS

### 10.1. OTP Flow Test Cases

#### POST /api/link/request-otp (Student App)

**Test Cases:**
1. **Happy Path:**
   - Request OTP với phone hợp lệ, trialId hợp lệ, recaptchaToken hợp lệ
   - Expected: 200 OK, OTP sent message
   - Verify: OTP session created in database

2. **Invalid Phone Format:**
   - Request với phone không hợp lệ (ví dụ: "123")
   - Expected: 400 VALIDATION_ERROR

3. **Rate Limiting:**
   - Gửi OTP lần 1, 2, 3 → Success
   - Gửi OTP lần 4 → Expected: 429 RATE_LIMIT_EXCEEDED
   - Verify: Rate limit reset sau 24h

4. **reCaptcha Failed:**
   - Request với recaptchaToken không hợp lệ
   - Expected: 400 RECAPTCHA_FAILED

5. **Invalid Trial ID:**
   - Request với trialId không tồn tại
   - Expected: 404 TRIAL_NOT_FOUND

6. **Parent Exists vs Not Exists:**
   - Test với phone đã có parent_account → Verify parent_id được lưu
   - Test với phone chưa có parent_account → Verify parent_id = null

#### POST /api/link/verify-otp (Student App)

**Test Cases:**
1. **Happy Path - Parent Exists:**
   - Verify OTP với phone, otp đúng, trialId hợp lệ
   - Parent account đã tồn tại
   - Expected: 200 OK, studentId, parentId, loginCredentials, dashboardUrl
   - Verify: StudentTrialProfile → StudentProfile conversion
   - Verify: Learning data merged

2. **Happy Path - Parent Not Exists:**
   - Verify OTP với phone chưa có parent_account
   - Expected: 200 OK, parent_account created (status: pending_activation, phone_verified: true)
   - Verify: StudentProfile created
   - Verify: Activation SMS sent

3. **Invalid OTP:**
   - Verify với OTP sai
   - Expected: 400 OTP_INVALID

4. **Expired OTP:**
   - Verify với OTP đã hết hạn (> 5 phút)
   - Expected: 400 OTP_EXPIRED

5. **OTP Already Used:**
   - Verify OTP lần 1 → Success
   - Verify OTP lần 2 với cùng OTP → Expected: 400 OTP_INVALID

6. **Phone Mismatch:**
   - Request OTP với phone A
   - Verify OTP với phone B → Expected: 400 OTP_INVALID

### 10.2. OAuth Login Flow Test Cases

#### POST /api/parent/oauth/login

**Test Cases:**
1. **Happy Path - New Account:**
   - Login với Google/Apple token hợp lệ
   - Account chưa tồn tại
   - Expected: 200 OK, parentId, requiresPhoneVerification: true
   - Verify: parent_account created (oauth_provider, oauth_id, email, name, phone_verified: false)

2. **Happy Path - Existing Account (Phone Verified):**
   - Login với OAuth token
   - Account đã tồn tại, phone_verified = true
   - Expected: 200 OK, JWT token, requiresPhoneVerification: false
   - Verify: Redirect to dashboard

3. **Existing Account (Phone Not Verified):**
   - Login với OAuth token
   - Account đã tồn tại, phone_verified = false
   - Expected: 200 OK, requiresPhoneVerification: true
   - Verify: Redirect to phone update screen

4. **Invalid OAuth Token:**
   - Login với token không hợp lệ
   - Expected: 401 UNAUTHORIZED

5. **Invalid Provider:**
   - Login với provider = "facebook" (không hỗ trợ)
   - Expected: 400 VALIDATION_ERROR

#### POST /api/parent/phone/update

**Test Cases:**
1. **Happy Path:**
   - Update phone với phone hợp lệ (sau OAuth login)
   - Expected: 200 OK, OTP sent message
   - Verify: OTP session created

2. **Invalid Phone Format:**
   - Update với phone không hợp lệ
   - Expected: 400 VALIDATION_ERROR

3. **Phone Already Used:**
   - Update với phone đã được sử dụng bởi account khác
   - Expected: 409 CONFLICT

4. **Rate Limiting:**
   - Update phone 3 lần → Success
   - Update phone lần 4 → Expected: 429 RATE_LIMIT_EXCEEDED

#### POST /api/parent/phone/verify-otp

**Test Cases:**
1. **Happy Path:**
   - Verify OTP với phone, otp đúng
   - Expected: 200 OK, phoneVerified: true
   - Verify: parent_account.phone_number updated
   - Verify: parent_account.phone_verified = true
   - Verify: Redirect to dashboard

2. **Invalid OTP:**
   - Verify với OTP sai
   - Expected: 400 OTP_INVALID

3. **Expired OTP:**
   - Verify với OTP đã hết hạn
   - Expected: 400 OTP_EXPIRED

### 10.3. Parent Registration with Phone Test Cases

#### POST /api/parent/register

**Test Cases:**
1. **Happy Path:**
   - Register với name, phone, password hợp lệ, email optional
   - Expected: 201 Created, requiresOtpVerification: true
   - Verify: parent_account created (status: pending_verification)
   - Next step: Call /api/parent/phone/verify-otp

2. **Missing Required Fields:**
   - Register thiếu name → Expected: 400 VALIDATION_ERROR
   - Register thiếu phone → Expected: 400 VALIDATION_ERROR
   - Register thiếu password → Expected: 400 VALIDATION_ERROR

3. **Phone Already Exists:**
   - Register với phone đã tồn tại
   - Expected: 409 CONFLICT

4. **Weak Password:**
   - Register với password < 8 characters
   - Expected: 400 VALIDATION_ERROR

5. **Invalid Phone Format:**
   - Register với phone không hợp lệ
   - Expected: 400 VALIDATION_ERROR

### 10.4. Rate Limiting Test Cases

**Test Scenarios:**
1. **OTP Request Rate Limit:**
   - Setup: Redis/cache với key `otp_limit:{phone}:{date}`
   - Test: Gửi OTP 3 lần → Success
   - Test: Gửi OTP lần 4 → 429 RATE_LIMIT_EXCEEDED
   - Test: Reset sau 24h → Có thể gửi lại

2. **Rate Limit per Phone Number:**
   - Test: Phone A gửi 3 lần → Success
   - Test: Phone B gửi 3 lần → Success (không ảnh hưởng)
   - Test: Phone A gửi lần 4 → 429 RATE_LIMIT_EXCEEDED

### 10.5. reCaptcha Test Cases

**Test Scenarios:**
1. **Valid reCaptcha:**
   - Request OTP với recaptchaToken hợp lệ
   - Expected: Success

2. **Invalid reCaptcha:**
   - Request OTP với recaptchaToken không hợp lệ
   - Expected: 400 RECAPTCHA_FAILED

3. **Missing reCaptcha:**
   - Request OTP không có recaptchaToken
   - Expected: 400 VALIDATION_ERROR

4. **reCaptcha Expired:**
   - Request OTP với recaptchaToken đã hết hạn
   - Expected: 400 RECAPTCHA_FAILED

### 10.6. Phone Verification Test Cases

**Test Scenarios:**
1. **Dashboard Access Control:**
   - Login OAuth với phone_verified = false
   - Try access dashboard → Expected: 403 FORBIDDEN, redirect to phone update

2. **Phone Verification Required:**
   - OAuth login → phone_verified = false
   - Update phone → Verify OTP → phone_verified = true
   - Access dashboard → Expected: Success

3. **Auto Account Creation:**
   - Student links với phone chưa có parent_account
   - Verify OTP → Expected: parent_account created (status: pending_activation)
   - Verify: SMS activation link sent

---

## 11. TESTING CHECKLIST

### 11.1. Unit Tests

- [ ] All service methods tested
- [ ] Edge cases covered
- [ ] Error handling tested
- [ ] Coverage ≥ target

### 11.2. Integration Tests

- [ ] API endpoints tested
- [ ] Database operations tested
- [ ] External service calls tested
- [ ] Error scenarios covered
- [ ] OTP flow tested (request, verify, rate limiting)
- [ ] OAuth login flow tested (Google, Apple)
- [ ] Phone verification flow tested
- [ ] reCaptcha integration tested
- [ ] Auto account creation tested

### 11.3. Manual Testing

- [ ] User flows tested
- [ ] UI/UX verified
- [ ] Cross-browser testing (web)
- [ ] Mobile device testing

---

## 12. PERFORMANCE TESTING

### 12.1. Load Testing

**Tool:** JMeter hoặc k6

**Scenarios:**
- 100 concurrent users
- API response time < 2s
- Database query performance

### 12.2. Stress Testing

- Test system limits
- Identify bottlenecks
- Memory leaks detection

---

## 13. SECURITY TESTING

### 13.1. Areas to Test

- Authentication/Authorization
- SQL Injection
- XSS (Cross-site scripting)
- CSRF protection
- Input validation
- OTP security (expiry, single-use, rate limiting)
- OAuth token validation
- Phone number validation and sanitization
- reCaptcha bypass attempts

### 13.2. Tools

- OWASP ZAP
- SonarQube
- Dependency scanning

---

## 14. TÀI LIỆU LIÊN QUAN

- [API Specification](./api_specification_phase_1-2025-12-15-03-30.md)
- [Development Setup Guide](./development_setup_phase_1-2025-12-15-03-00.md)

---

## 15. GHI CHÚ / TODO

- [ ] Setup CI/CD pipeline với automated tests
- [ ] Create test data seeding scripts
- [ ] Document test environment setup
- [ ] Add performance benchmarks

---

## 16. LỊCH SỬ THAY ĐỔI

- 2025-12-15-03-45: Tạo mới Testing Strategy
- 2025-12-15-XX-XX: Thêm test cases cho OTP flow, OAuth login flow, rate limiting, reCaptcha, phone verification, và auto account creation



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)

================================================================================
# End of: 04-for-developers/testing/testing-strategy.md
================================================================================
