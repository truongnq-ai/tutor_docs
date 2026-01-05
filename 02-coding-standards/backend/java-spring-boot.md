# JAVA SPRING BOOT - CODING STANDARDS

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này thống kê ngắn gọn các quy tắc bắt buộc cho backend Java/Spring Boot của hệ thống Tutor. Chi tiết từng mảng nằm trong các file chuyên đề được liên kết bên dưới.

## Nguyên tắc cốt lõi

- Tuân thủ coding convention chuẩn của Java (Oracle), SQL, Spring Boot và các hướng dẫn style đã công bố.
- Dùng format `ResponseObject` hiện tại làm chuẩn chung cho mọi dịch vụ; mọi API trả `ResponseObject` với `errorCode`/`errorDetail`/`data` kết hợp với HTTP status codes chuẩn.
- API dùng phương thức RESTful (GET/POST/PUT/DELETE) phù hợp với từng action; URL chuẩn hóa dạng `/api/v1/<resource>` (ví dụ: `/api/v1/students`, `/api/v1/exercises/{id}`).
- Cấu trúc package thống nhất theo feature-based organization (xem chi tiết ở phần Package Structure bên dưới).
- Đặt tên DB theo snake_case.
- Logging dùng Log4j2 theo appender name; log lỗi tại controller/service, không log tràn stack trace nhiều lần.
- Swagger phải có `description` + `@ApiResponse` với errorCode examples và thêm `request/response example`.
- HTTP client cho AI Service có guideline về timeout, retry, circuit breaker, và quy tắc errorCode mapping.

## Package Structure

Cấu trúc package được tổ chức theo **feature-based architecture**, nhóm các class liên quan theo domain/feature thay vì theo layer. Điều này giúp code dễ maintain, dễ mở rộng và tuân thủ nguyên tắc cohesion cao.

### Nguyên tắc tổ chức

1. **Feature-based grouping**: Các class trong cùng một feature (auth, user, content, teaching, reference) được nhóm lại với nhau trong cùng một sub-package.
2. **Consistent structure**: Tất cả các layer (entity, repository, service, controller, exception, dto) đều tuân theo cùng một cấu trúc feature-based.
3. **Common/shared classes**: Các class dùng chung (như `BaseEntity`, `CustomExceptionHandler`, `PageResponse`) được đặt trong package `common`.

### Cấu trúc chi tiết

#### Entity Layer (`com.tutor.core.entity`)

```
entity/
  BaseEntity.java                    (root - MappedSuperclass)
  auth/
    User.java
    RefreshToken.java
  teaching/
    Teacher.java
    Class.java
    Student.java
    Assignment.java
    Result.java
    Comment.java
  content/
    Exercise.java
  reference/
    Subject.java
    Topic.java
```

#### Repository Layer (`com.tutor.core.repository`)

```
repository/
  auth/
    UserRepository.java
    RefreshTokenRepository.java
  teaching/
    TeacherRepository.java
    ClassRepository.java
    StudentRepository.java
    AssignmentRepository.java
    ResultRepository.java
    CommentRepository.java
  content/
    ExerciseRepository.java
  reference/
    SubjectRepository.java
    TopicRepository.java
```

#### Service Layer (`com.tutor.core.service`)

```
service/
  auth/
    AuthenticationService.java
    AuthenticationServiceImpl.java
    JwtService.java
    JwtServiceImpl.java
    RefreshTokenService.java
    RefreshTokenServiceImpl.java
  user/
    UserService.java
    UserServiceImpl.java
    AdminUserService.java
    AdminUserServiceImpl.java
  content/
    ExerciseService.java
    ExerciseServiceImpl.java
  teaching/
    (future services)
  ingestion/
    (giữ nguyên cấu trúc hiện tại)
```

**Lưu ý**: Interface và Implementation được đặt trong cùng một package, không tách riêng `impl/` sub-package.

#### Exception Layer (`com.tutor.core.exception`)

```
exception/
  common/
    CustomExceptionHandler.java
    CommonException.java
  auth/
    InvalidCredentialsException.java
    RefreshTokenExpiredException.java
    RefreshTokenInvalidException.java
  user/
    UserNotFoundException.java
    UsernameAlreadyExistsException.java
    InvalidRoleException.java
  content/
    ExerciseNotFoundException.java
    CannotDeleteExerciseException.java
    InvalidExerciseDifficultyException.java
  ai/
    AIServiceException.java
  ingestion/
    IngestionException.java
    JsonValidationException.java
    LatexValidationException.java
    PromptTemplateNotFoundException.java
```

#### Controller Layer (`com.tutor.core.controller`)

```
controller/
  auth/
    AuthenticationController.java
  user/
    UserController.java
    AdminController.java
  content/
    ExerciseController.java
  teaching/
    (future controllers)
```

#### DTO Layer (`com.tutor.core.dto`)

```
dto/
  request/
    auth/
      LoginRequest.java
    user/
      CreateUserRequest.java
      UpdateUserRequest.java
      UserPageRequest.java
    content/
      CreateExerciseRequest.java
      UpdateExerciseRequest.java
      AIGenerateExerciseRequest.java
      CheckJsonRequest.java
      CheckLaTeXRequest.java
      FixJsonRequest.java
      FixLaTeXRequest.java
      GeneratePromptRequest.java
      ImportExerciseRequest.java
      ValidateJsonRequest.java
    common/
      PageRequest.java
      SortRequest.java
  response/
    auth/
      AuthenticationResponse.java
      RefreshTokenResponse.java
    user/
      UserResponse.java
      CreateUserResponse.java
      UserInfo.java
      ResetPasswordResponse.java
    content/
      ExerciseResponse.java
      CheckJsonResponse.java
      CheckLaTeXResponse.java
      FixJsonResponse.java
      FixLaTeXResponse.java
      GeneratePromptResponse.java
      ValidateJsonResponse.java
      JsonValidationResult.java
      LatexValidationResult.java
      ValidationError.java
      FixApplied.java
    common/
      PageResponse.java
```

### Quy tắc khi thêm feature mới

Khi thêm một feature mới vào hệ thống:

1. **Tạo sub-package mới** trong tất cả các layer (entity, repository, service, controller, exception, dto) với tên feature.
2. **Đặt các class liên quan** vào đúng sub-package theo feature.
3. **Tuân thủ naming convention**: Tên class phải rõ ràng, không cần prefix feature name (ví dụ: `UserService` thay vì `AuthUserService`).
4. **Common classes**: Nếu class được dùng chung bởi nhiều feature, đặt trong package `common`:
   - `dto/request/common/`: PageRequest, SortRequest
   - `dto/response/common/`: PageResponse
   - `exception/common/`: CommonException, CustomExceptionHandler
   - `util/`: PageCommon và các utility classes khác

### Lợi ích

- **High cohesion**: Các class liên quan được nhóm lại với nhau, dễ tìm và maintain.
- **Low coupling**: Rõ ràng về dependencies giữa các feature.
- **Scalability**: Dễ dàng thêm feature mới mà không ảnh hưởng đến các feature khác.
- **Team collaboration**: Nhiều developer có thể làm việc trên các feature khác nhau mà không conflict.

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

## API getPage Pattern

### Tổng quan

Tất cả các API phân trang (pagination) sử dụng pattern `getPage` với POST method và `PageRequest` trong request body. Pattern này cho phép:
- Gửi filter data phức tạp trong `dataRequest` (Object)
- Hỗ trợ sorting động với nhiều fields
- Không bị giới hạn độ dài URL như query parameters

### Cấu trúc PageRequest

```java
public class PageRequest {
    private int page;              // 0-based (tương thích với Spring Data)
    private int pageSize;          // Số phần tử mỗi trang
    private List<SortRequest> sort; // Danh sách sort criteria
    private Object dataRequest;     // Filter data (sẽ convert sang DTO cụ thể trong service)
}
```

### Cấu trúc SortRequest

```java
public class SortRequest {
    private String key;    // Tên property để sort (e.g., "name", "createdAt")
    private String value;  // Direction: "ascend" hoặc "descend"
}
```

### Cấu trúc PageResponse

```java
public record PageResponse<T>(
    List<T> content,        // Danh sách items trong trang hiện tại
    long totalElements,     // Tổng số phần tử
    int totalPages,         // Tổng số trang
    int page,              // Số trang hiện tại (0-based)
    int pageSize           // Số phần tử mỗi trang
) {
    // Factory method từ Spring Data Page
    public static <T> PageResponse<T> from(Page<T> page) { ... }
}
```

### Ví dụ Controller

```java
@PostMapping("/users/getPage/")
public ResponseEntity<ResponseObject<PageResponse<UserResponse>>> getPage(
        @RequestBody PageRequest pageRequest) {
    PageResponse<UserResponse> response = userService.getPage(pageRequest);
    return ResponseEntity.ok()
            .body(ResponseObject.success("Lấy danh sách thành công", response));
}
```

### Ví dụ Service

```java
@Override
public PageResponse<UserResponse> getPage(PageRequest pageRequest) {
    // Extract filter từ dataRequest
    UserPageRequest filterRequest = (new ObjectMapper()).convertValue(
            pageRequest.getDataRequest(),
            UserPageRequest.class
    );
    
    // Convert PageRequest → Pageable
    Pageable pageable = PageCommon.toPageable(pageRequest);
    
    // Query với filters
    Page<User> userPage = userRepository.findWithFilters(
            filterRequest.role(),
            filterRequest.username(),
            pageable
    );
    
    // Map to DTO
    List<UserResponse> content = userPage.getContent().stream()
            .map(this::mapToUserResponse)
            .collect(Collectors.toList());
    
    // Convert to PageResponse
    return new PageResponse<>(
            content,
            userPage.getTotalElements(),
            userPage.getTotalPages(),
            userPage.getNumber(),
            userPage.getSize()
    );
}
```

### Quy tắc

1. **Endpoint naming**: Sử dụng `/getPage/` hoặc `/getPage` (có hoặc không có trailing slash)
2. **HTTP Method**: Luôn dùng POST (không dùng GET)
3. **Page numbering**: Sử dụng 0-based để tương thích với Spring Data và frontend hiện tại
4. **Field naming**: Sử dụng `content` (không phải `data`) để nhất quán với Spring Data
5. **Filter DTO**: Tạo DTO riêng cho filter (e.g., `UserPageRequest`, `ExercisePageRequest`) và đặt trong `dataRequest`

### Utility Classes

- `PageCommon.toPageable(PageRequest)`: Convert PageRequest → Spring Pageable
- `PageCommon.toPageResponse(Page)`: Convert Spring Page → PageResponse (throw CommonException nếu empty)
- `PageResponse.from(Page)`: Factory method để tạo PageResponse từ Spring Page

## Controller Pattern

### Nguyên tắc cốt lõi

Controllers chỉ đóng vai trò là **vỏ bọc (wrapper)** cho service layer. Tất cả logic nghiệp vụ phải nằm trong service layer.

### Quy tắc

1. **Không có logic nghiệp vụ**: Controllers chỉ gọi service methods, không xử lý business logic
2. **Không có validation logic**: Validation được xử lý bởi:
   - Bean Validation (`@Valid`, `@NotNull`, etc.) cho request DTOs
   - Service layer cho business rules
3. **Exception handling**: Tất cả exceptions được xử lý bởi `@RestControllerAdvice` (CustomExceptionHandler)
   - Controllers không cần try-catch
   - Service layer throw exceptions, CustomExceptionHandler sẽ xử lý
4. **Logging**: 
   - Logging chính ở service layer (business logic)
   - Controller chỉ log nếu cần context cụ thể (e.g., request ID, user info)

### Ví dụ Controller (Đúng)

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    
    @PostMapping("/getPage/")
    public ResponseEntity<ResponseObject<PageResponse<UserResponse>>> getPage(
            @RequestBody PageRequest pageRequest) {
        // ✅ Chỉ gọi service, không có logic
        PageResponse<UserResponse> response = userService.getPage(pageRequest);
        return ResponseEntity.ok()
                .body(ResponseObject.success("Lấy danh sách thành công", response));
    }
}
```

### Ví dụ Controller (Sai)

```java
@PostMapping("/getPage/")
public ResponseEntity<ResponseObject<PageResponse<UserResponse>>> getPage(
        @RequestBody PageRequest pageRequest) {
    try {
        // ❌ Logic nghiệp vụ trong controller
        if (pageRequest.getPage() < 0) {
            pageRequest.setPage(0);
        }
        
        // ❌ Validation logic trong controller
        if (pageRequest.getPageSize() > 100) {
            throw new IllegalArgumentException("Page size too large");
        }
        
        PageResponse<UserResponse> response = userService.getPage(pageRequest);
        return ResponseEntity.ok().body(ResponseObject.success("Success", response));
    } catch (Exception e) {
        // ❌ Try-catch trong controller (nên để CustomExceptionHandler xử lý)
        return ResponseEntity.badRequest()
                .body(ResponseObject.error("ERROR", e.getMessage()));
    }
}
```

### Di chuyển logic vào Service

Nếu controller có logic nhỏ (e.g., extract token from header), di chuyển vào service:

```java
// ❌ Trước (logic trong controller)
private String extractTokenFromHeader(String header) {
    return header.substring(7);
}

// ✅ Sau (logic trong service)
public interface AuthenticationService {
    String extractTokenFromHeader(String authorizationHeader);
}
```

## Tài liệu liên quan

- [Database](./database.md) - Database naming, FK, indexes
- [Flyway](./flyway.md) - Migration rules
- [Error Handling](./error-handling.md) - Exception handling patterns
- [General Principles](../general-principles.md) - Nguyên tắc chung

## Phạm vi áp dụng

- Áp dụng cho module Java/Spring Boot: `tutor-core-service`
- Package base: `com.tutor.core.*`

---

← Quay lại: [README.md](../README.md)
