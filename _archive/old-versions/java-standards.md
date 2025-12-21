# API design & Swagger
[← Quay lại Overview](overview.md)

## HTTP & URL

- HTTP method: dùng RESTful methods phù hợp với từng action
  - GET: Truy vấn đơn giản (list, detail)
  - POST: Tạo mới, actions phức tạp
  - PUT: Cập nhật toàn bộ
  - PATCH: Cập nhật một phần (nếu cần)
  - DELETE: Xóa
- URL chuẩn: `/api/v1/<resource>`  
  Ví dụ: `/api/v1/students`, `/api/v1/exercises/{id}`, `/api/v1/parent-accounts/{id}/students`
- Tránh query string cho filter phức tạp; dùng body DTO cho POST requests hoáº·c query parameters cho GET requests.

## Request/Response chuẩn

- Body request: DTO trong package `com.tutor.core.dto.request`; dùng `@Valid` + annotation validation khi áp dụng.
- Response: `ResponseEntity<ResponseObject<T>>` với `errorCode`/`errorDetail`/`data`; mã lỗi lấy từ errorCode convention (0000-9999).
- Káº¿t há»£p HTTP status codes chuẩn với errorCode trong ResponseObject.
- Luồng lỗi: ném custom exception trong service; `CustomExceptionHandler` catch và  map sang `ResponseObject` với errorCode và  HTTP status tương ứng.

## ResponseObject Format

### Success Response

```java
ResponseObject<T> {
    errorCode: "0000",        // Optional - mã thÃ nh cÃ´ng
    errorDetail: "Operation successful",  // Optional - mô tả thÃ nh cÃ´ng
    data: T                   // Dữ liệu trả về
}
// HTTP 200
```

### Error Response

```java
ResponseObject<?> {
    errorCode: "0001",        // Bắt buộc - mã lỗi từ "0001" Ä‘áº¿n "9999"
    errorDetail: "MÃ´ táº£ mã lỗi",  // Bắt buộc - mô tả chính xác mã lỗi
    data: T/null              // Optional - cÃ³ thá»ƒ null hoáº·c chá»©a thông tin bổ sung
}
// HTTP 401/400/403/404/500
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

- Bắt buộc cÃ³ `@Operation(description)` mô tả ngắn gọn nghiệp vụ.
- `@ApiResponse` liệt kê errorCode chính theo error code convention.
- Thêm `request/response example` (dùng `@ExampleObject` trong @RequestBody/@ApiResponse content).
- Giá»¯ tÃªn field trong example khớp DTO thực tế.
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
@Operation(description = "Tạo mới bÃ i táº­p")
@ApiResponses({
    @ApiResponse(
        responseCode = "201", 
        description = "Táº¡o thÃ nh cÃ´ng",
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

- Version trong URL: `/api/v1/...` (sẽ thÃªm v2, v3 khi cần).
- CÃ¡c header đặc thù (token, trace id) cần Ä‘Æ°á»£c mô tả trong tÃ i liá»‡u chi tiết của service.
- Authorization header: `Authorization: Bearer <accessToken>`

## Quy táº¯c đặt resource name

- Resource lÃ  danh từ số nhiều: `students`, `exercises`, `parent-accounts`
- Nested resources: `/api/v1/parent-accounts/{parentId}/students`
- Tránh động từ trong URL; dùng HTTP method để thể hiện action.

## Exception Handling

### Custom Exception với ErrorCode

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

### Exception Handler

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

[←‘ Quay lại Overview](overview.md)

# Kiá»ƒm tra cháº¥t lÆ°á»£ng code & lÃ m sáº¡ch
[← Quay lại Overview](overview.md)

## Mục đích

Äáº£m báº£o code khÃ´ng cÃ³ lỗi compilation, warning, và  loại bỏ cÃ¡c import khÃ´ng sử dụng để duy trì cháº¥t lÆ°á»£ng code và  dễ bảo trì.

## Quy trÃ¬nh thá»±c hiá»‡n

### Bước 1: Kiá»ƒm tra lỗi compilation và  Java

- Cháº¡y compiler/linter để phát hiện:
  - Lá»—i syntax Java
  - Lá»—i compilation (compile errors)
  - Warning từ Java compiler
  - Warning từ IDE (IntelliJ IDEA/VS Code)
- Công cụ kiểm tra:
  - IDE linter (IntelliJ IDEA inspections, VS Code Java extension)
  - `mvn compile` hoáº·c `mvn clean compile`
  - `mvn checkstyle:check` (nếu cÃ³ cáº¥u hÃ¬nh checkstyle)
- **Yêu cầu**: Không cÃ³ lỗi (errors) trÆ°á»›c khi tiáº¿p tá»¥c.

### Bước 2: Sá»­a lỗi và  warning

- **Ưu tiên sá»­a**:
  1. Lá»—i syntax
  2. Lá»—i compilation
  3. Warning nghiêm trọng (unused variables, unreachable code)
  4. Warning khÃ¡c (deprecated methods, unchecked warnings)
- **CÃ¡c lỗi thÆ°á»ng gặp**:
  - `cannot find symbol`: Import thiếu hoáº·c class khÃ´ng tồn tại
  - `incompatible types`: Type khÃ´ng khớp
  - `unreachable statement`: Code khÃ´ng bao giá» Ä‘Æ°á»£c thực thi
  - `variable might not have been initialized`: Biến chÆ°a Ä‘Æ°á»£c khá»Ÿi tạo
  - `method does not override`: Annotation `@Override` sai
- **NguyÃªn táº¯c sá»­a**:
  - Sá»­a Ä‘Ãºng nguyÃªn nhÃ¢n, khÃ´ng chá»‰ che lỗi
  - Giá»¯ type safety của Java
  - Tuân thủ coding standards của dá»± Ã¡n

### Bước 3: Kiá»ƒm tra và  xÃ³a unused imports

- **Kiá»ƒm tra**:
  - Import khÃ´ng Ä‘Æ°á»£c sử dụng trong file
  - Import chá»‰ xuất hiện trong khai báo nhÆ°ng khÃ´ng Ä‘Æ°á»£c dùng
  - Import static khÃ´ng Ä‘Æ°á»£c sử dụng
- **CÃ¡ch xÃ¡c Ä‘á»‹nh**:
  - Dùng IDE (IntelliJ IDEA tá»± động gáº¡ch xÃ¡m unused imports)
  - Tìm kiếm tÃªn class/package trong file
  - Kiá»ƒm tra cÃ¡c method và  field
- **Xóa**:
  - Xóa import statement khÃ´ng sử dụng
  - Xóa import static khÃ´ng dùng
  - Xóa wildcard import (`import java.util.*;`) nếu khÃ´ng cần
- **Lưu ý**:
  - Không xÃ³a import dùng trong annotation (`@Entity`, `@Service`, `@RestController`, ...)
  - Không xÃ³a import dùng trong type annotation
  - Không xÃ³a import dùng trong generic type (`List<String>`, `Map<String, Object>`)

### Bước 4: Kiá»ƒm tra unused code

- **Kiá»ƒm tra**:
  - Unused fields/private methods
  - Unused variables trong method
  - Dead code (code khÃ´ng bao giá» Ä‘Æ°á»£c gá»i)
- **Xá»­ lý**:
  - Xóa code khÃ´ng sử dụng (nếu cháº¯c cháº¯n)
  - Comment code nếu cÃ³ thá»ƒ cần sau nÃ y (và  thÃªm TODO)
  - Refactor nếu code bá»‹ duplicate

### Bước 5: Xác minh lại

- Sau khi sá»­a:
  1. Cháº¡y lại `mvn compile`
  2. Äáº£m báº£o khÃ´ng cÃ²n lỗi/warning
  3. Äáº£m báº£o khÃ´ng cÃ²n unused imports
  4. Kiá»ƒm tra code váº«n hoạt động Ä‘Ãºng (nếu cÃ³ thá»ƒ test nhanh)

## Thứ tự Æ°u tiÃªn

```
1. Lá»—i Syntax (Errors)
   ←“
2. Lá»—i Compilation (Compile Errors)
   ←“
3. Warning nghiêm trọng (Critical Warnings)
   ←“
4. Warning khÃ¡c (Warnings)
   ←“
5. Xóa Unused Imports
   ←“
6. Xóa Unused Code
   ←“
7. Xác minh lại (Verification)
```

## Checklist sau khi chỉnh sửa file

- [ ] Không cÃ³ lỗi syntax
- [ ] Không cÃ³ lỗi compilation
- [ ] Không cÃ³ warning nghiêm trọng
- [ ] ÄÃ£ xÃ³a táº¥t cáº£ unused imports
- [ ] ÄÃ£ xÃ³a unused code (nếu cÃ³)
- [ ] Code váº«n hoạt động Ä‘Ãºng (nếu cÃ³ thá»ƒ test)
- [ ] File Ä‘Ã£ Ä‘Æ°á»£c format Ä‘Ãºng chuẩn

## Ví dụ minh họa

### Trước khi sá»­a:

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

### Sau khi sá»­a:

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
- **Linter**: Checkstyle (nếu cÃ³ cáº¥u hÃ¬nh), SpotBugs
- **Auto-fix**: IntelliJ IDEA cÃ³ thá»ƒ tá»± xÃ³a unused imports (Ctrl+Alt+O / Cmd+Option+O)

## Lưu ý quan trá»ng

1. **Không bỏ qua warning**: Má»™t sá»‘ warning cÃ³ thá»ƒ dẫn đến lỗi runtime hoáº·c memory leak
2. **Không xÃ³a import vội**: Kiá»ƒm tra ká»¹ trÆ°á»›c khi xÃ³a, đặc biệt với annotation
3. **Test sau khi sá»­a**: Äáº£m báº£o chá»©c nÄƒng váº«n hoạt động
4. **Commit riÃªng**: TÃ¡ch commit sá»­a lỗi và  commit xÃ³a unused imports để dễ review
5. **Lombok**: Náº¿u dùng Lombok, đảm bảo annotation processor Ä‘Æ°á»£c enable

[←‘ Quay lại Overview](overview.md)

# Cáº¥u trÃºc code & đặt tÃªn
[← Quay lại Overview](overview.md)

## Package & layer

- `com.tutor.core.controller`: API Ä‘áº§u và o, nháº­n DTO request, tráº£ `ResponseObject<T>`.
- `com.tutor.core.service`: khai báo interface nghiệp vụ; `com.tutor.core.service.impl`: hiá»‡n thá»±c.
- `com.tutor.core.repository`: extends `JpaRepository<Entity, UUID>`, query động qua @Query JPQL, khÃ´ng logic nghiệp vụ.
- `com.tutor.core.entity`: entity káº¿ thá»«a `BaseEntity` (id, createdAt/updatedAt, createdBy/updatedBy).
- `com.tutor.core.dto.request`/`com.tutor.core.dto.response`: DTO rõ nghÄ©a theo nghiệp vụ.
- `com.tutor.core.enums`: enumerations (ResponseStatus, UserType, AccountStatus, etc.).
- `com.tutor.core.exception`: custom exceptions, `CustomExceptionHandler` quy chuẩn lỗi nghiệp vụ.
- `com.tutor.core.util`: hÃ m tiá»‡n Ã­ch (Json, Date, String, Excel...).
- `com.tutor.core.common`: common classes (`ResponseObject`, `BaseEntity`, etc.).
- `com.tutor.core.config`: configuration classes (SecurityConfig, DatabaseConfig, etc.).

## Äáº·t tÃªn class/file

- Tên class pháº£n Ã¡nh vai trÃ²: `*Controller`, `*Service`/`*ServiceImpl`, `*Repository`, `*Request`, `*Response`, `*Entity`, `*Config`.
- Không đặt tÃªn viáº¿t táº¯t khÃ³ hiá»ƒu; Æ°u tiÃªn tÃªn nghiệp vụ rõ rÃ ng.
- Enum: PascalCase, giÃ¡ trá»‹ UPPER_SNAKE_CASE.
- File: một public class per file, tÃªn file trÃ¹ng với tÃªn class.

## NguyÃªn táº¯c chung khi viáº¿t code

- Không hardcode string/number láº·p lại; Ä‘Æ°a và o `Constant` hoáº·c config.
- Validate Ä‘áº§u và o á»Ÿ Ä‘áº§u service báº±ng `@Valid` annotation; ném custom exception với errorCode tương ứng.
- Dùng Lombok để giáº£m boilerplate (@Getter/@Setter/@NoArgsConstructor/@AllArgsConstructor/@Builder khi phù hợp).
- Sá»­ dá»¥ng `@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")` cho DTO/Entity cần format thá»i gian.
- Không truy cáº­p trá»±c tiáº¿p repository trong controller; má»i logic qua service.
- Sá»­ dá»¥ng UUID cho primary key thay và¬ Long.

## Logging

- Dùng Log4j2, logger tạo với `@Slf4j` annotation (Lombok).
- Log error á»Ÿ controller/service khi catch Exception; trÃ¡nh log láº·p stack trace nhiá»u táº§ng.
- Không log dá»¯ liá»‡u nháº¡y cáº£m (password, token), chá»‰ log mã giao dá»‹ch, username, requestId nếu cÃ³.

## Response & Exception

- Táº¥t cáº£ API tráº£ `ResponseEntity<ResponseObject<T>>`; `ResponseObject` chá»©a `errorCode`/`errorDetail`/`data`.
- Custom exception mang theo errorCode; `CustomExceptionHandler` báº¯t và  map tháº³ng ra ResponseObject với HTTP status tương ứng.
- Káº¿t há»£p HTTP status codes chuẩn (200/400/401/403/404/500) với errorCode trong ResponseObject.

## Swagger/OpenAPI

- Má»—i API cÃ³ `@Operation(description)` + `@ApiResponse` khai báo errorCode theo enum và  HTTP status.
- Bá»• sung `request/response example` minh họa payload (dùng `@ExampleObject` hoáº·c mô tả trong description).
- Document errorCode trong `@ApiResponse` với examples.

## Tên API & HTTP method

- Dùng RESTful methods: GET (truy váº¥n), POST (tạo má»›i), PUT (cáº­p nháº­t), DELETE (xÃ³a).
- URL chuẩn: `/api/v1/<resource>`; trÃ¡nh dáº¥u "/" thá»«a, khÃ´ng láº«n lá»™n snake/kebab.
- Resource lÃ  danh từ số nhiều hoáº·c cá»¥m danh từ rõ nghÄ©a: `/api/v1/students`, `/api/v1/exercises`, `/api/v1/parent-accounts`.

## Ví dụ thÃªm má»›i một Exercise (backend)

- **Entity**: tạo `com.tutor.core.entity.Exercise` káº¿ thá»«a `BaseEntity`, đặt cột snake_case với prefix `n_/s_/d_`, thÃªm comment trong @Column.
- **Repository**: `ExerciseRepository extends JpaRepository<Exercise, UUID>`; thÃªm method `findBySkillId`, `existsByProblemText`, và  @Query `findByFilters(...)` cho filter động.
- **Service**: interface `ExerciseService` + `ExerciseServiceImpl`; validate Ä‘áº§u và o báº±ng `@Valid`, ném custom exception với errorCode từ enum.
  - HÃ m gá»£i ý: `create(ExerciseRequest)`, `update(UUID, ExerciseRequest)`, `getById(UUID)`, `getList(ExerciseSearchRequest)`, `delete(UUID)`.
- **Controller**: `ExerciseController` (@RestController, @RequestMapping("/api/v1/exercises")) với cÃ¡c endpoint:
  - `POST /api/v1/exercises` - Tạo mới
  - `GET /api/v1/exercises/{id}` - Chi tiáº¿t
  - `PUT /api/v1/exercises/{id}` - Cập nhật
  - `DELETE /api/v1/exercises/{id}` - Xóa
  - `GET /api/v1/exercises` - Danh sÃ¡ch (với filters)
  - Tráº£ `ResponseEntity<ResponseObject<T>>`; catch custom exception -> map sang ResponseObject với errorCode và  HTTP status tương ứng.
- **DTO Request/Response**: `ExerciseRequest` và  `ExerciseResponse` (hoáº·c dùng entity kÃ¨m `PageResponse` khi phÃ¢n trang).
- **Swagger**: @Operation + @ApiResponse theo errorCode enum; thÃªm example JSON cho request/response để minh họa payload.
- **Logging**: log lỗi táº¡i controller/service với @Slf4j; khÃ´ng log dá»¯ liá»‡u nháº¡y cáº£m.

## TÃ i liá»‡u liÃªn quan

- [API design & Swagger](api-design.md)
- [Persistence (DB, Entity, Repository)](persistence.md)
- [TÃ­ch há»£p dịch vụ, HTTP Client, Cache/Redis](service-integration.md)

[←‘ Quay lại Overview](overview.md)

# Tổng quan quy táº¯c chung - Java/Spring Boot

TÃ i liá»‡u nÃ y thống kê ngắn gọn cÃ¡c quy táº¯c bắt buộc cho backend Java/Spring Boot của hệ thống Tutor. Chi tiáº¿t từng máº£ng nằm trong cÃ¡c file chuyên đề Ä‘Æ°á»£c liên kết bÃªn dưới.

## NguyÃªn táº¯c cá»‘t lÃµi

- Tuân thủ coding convention chuẩn của Java (Oracle), SQL, Spring Boot và  cÃ¡c hÆ°á»›ng dáº«n style Ä‘Ã£ công bố.
- Dùng format `ResponseObject` hiá»‡n táº¡i lÃ m chuẩn chung cho má»i dịch vụ; má»i API tráº£ `ResponseObject` với `errorCode`/`errorDetail`/`data` káº¿t há»£p với HTTP status codes chuẩn.
- API dùng phÆ°Æ¡ng thá»©c RESTful (GET/POST/PUT/DELETE) phù hợp với từng action; URL chuẩn hóa dạng `/api/v1/<resource>` (và­ dá»¥: `/api/v1/students`, `/api/v1/exercises/{id}`).
- Cáº¥u trÃºc package thống nhất: `com.tutor.core.controller` (API), `com.tutor.core.service`/`com.tutor.core.service.impl`, `com.tutor.core.repository`, `com.tutor.core.entity`, `com.tutor.core.dto.request`/`com.tutor.core.dto.response`, `com.tutor.core.enums`, `com.tutor.core.exception`, `com.tutor.core.util`, `com.tutor.core.common`.
- Äáº·t tÃªn DB theo snake_case; cột dùng tiền tố kiểu dá»¯ liá»‡u (`n_` sá»‘, `s_` chuỗi, `d_` ngÃ y giá») và  @Column comment rõ nghÄ©a.
- Logging dùng Log4j2 theo appender name; log lỗi táº¡i controller/service, khÃ´ng log tràn stack trace nhiá»u láº§n.
- Swagger pháº£i cÃ³ `description` + `@ApiResponse` với errorCode examples và  thÃªm `request/response example`.
- HTTP client cho AI Service có guideline về timeout, retry, circuit breaker, và  quy táº¯c errorCode mapping.

## Response Format

### ResponseObject Structure

Tất cả API trả về `ResponseObject<T>` với cấu trúc:

```java
// Success Response
ResponseObject<T> {
    errorCode: "0000",        // Optional - mã thÃ nh cÃ´ng
    errorDetail: "Operation successful",  // Optional - mô tả thÃ nh cÃ´ng
    data: T                   // Dữ liệu trả về
}
// HTTP 200

// Error Response
ResponseObject<?> {
    errorCode: "0001",        // Bắt buộc - mã lỗi từ "0001" Ä‘áº¿n "9999"
    errorDetail: "MÃ´ táº£ mã lỗi",  // Bắt buộc - mô tả chính xác mã lỗi
    data: T/null              // Optional - cÃ³ thá»ƒ null hoáº·c chá»©a thông tin bổ sung
}
// HTTP 401/400/403/404/500
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

## Mục chi tiết

- [`code-structure.md` - Cáº¥u trÃºc code & đặt tÃªn](code-structure.md)
- [`api-design.md` - API design & Swagger](api-design.md)
- [`persistence.md` - Persistence (DB, Entity, Repository)](persistence.md) - **Lưu ý**: Quy táº¯c TEXT vs VARCHAR cho searchable columns
- [`service-integration.md` - TÃ­ch há»£p dịch vụ, HTTP Client, Cache/Redis](service-integration.md)
- [`code-quality.md` - Kiá»ƒm tra cháº¥t lÆ°á»£ng code & lÃ m sáº¡ch](code-quality.md)

## Pháº¡m vi áp dụng

- Ãp dá»¥ng cho module Java/Spring Boot: `tutor-core-service`
- Package base: `com.tutor.core.*`

## Không nằm trong pháº¡m vi

- Quy táº¯c front-end (Next.js, Flutter cÃ³ tÃ i liá»‡u riÃªng).
- Quy táº¯c háº¡ táº§ng CI/CD (chá»‰ Ä‘á» cáº­p timeout/retry á»Ÿ má»©c service).

# Persistence (DB, Entity, Repository)
[← Quay lại Overview](overview.md)

## Quy táº¯c DB schema

- Tên bảng/column dùng `snake_case`.
- Thêm comment cho cột qua `@Column(columnDefinition = " ... COMMENT '...'" )` hoáº·c comment trong SQL migration để mô tả ý nghĩa.
- Khóa chính dùng UUID (`java.util.UUID`) thay và¬ auto-increment.
- Sá»­ dá»¥ng `@GeneratedValue(strategy = GenerationType.UUID)` cho primary key.

### Quy táº¯c kiểu dá»¯ liá»‡u cho String columns

**QUAN TRỌNG**: Äá»‘i với cÃ¡c cột string Ä‘Æ°á»£c sử dụng trong queries cÃ³ hÃ m `LOWER()`, `UPPER()`, `LIKE`, hoáº·c cÃ¡c string functions khÃ¡c, **bắt buộc** sử dụng `TEXT` thay và¬ `VARCHAR` hoáº·c `CHARACTER VARYING`.

**Lý do**: 
- PostgreSQL cÃ³ thá»ƒ gặp lỗi `function lower(bytea) does not exist` nếu cột Ä‘Æ°á»£c lÆ°u dưới dạng `bytea` hoáº·c cÃ³ váº¥n Ä‘á» type casting
- `TEXT` type đảm bảo type consistency và  tÆ°Æ¡ng thÃ­ch tá»‘t với cÃ¡c string functions
- JPA/Hibernate map `String` type sang `TEXT` một cÃ¡ch an toàn

**Quy táº¯c áp dụng**:
- ✓ **Dùng TEXT**: CÃ¡c cột string Ä‘Æ°á»£c dùng trong `@Query` với `LOWER()`, `UPPER()`, `LIKE`, pattern matching
- ✓ **CÃ³ thá»ƒ dùng VARCHAR**: CÃ¡c cột string chá»‰ dùng cho exact match, khÃ´ng dùng string functions
- ✓ **LuÃ´n dùng TEXT**: CÃ¡c cột string cÃ³ thá»ƒ cần search/filter trong tương lai

**Ví dụ**:

```java
// ✓ ÄÃšNG: Dùng TEXT cho cột dùng trong LOWER() query
@Column(name = "username", nullable = false, unique = true, columnDefinition = "TEXT")
private String username;

@Column(name = "email", unique = true, columnDefinition = "TEXT")
private String email;

// ✗Œ SAI: Dùng VARCHAR cho cột dùng trong LOWER() query
@Column(name = "username", nullable = false, unique = true, length = 255)
private String username;  // CÃ³ thá»ƒ gÃ¢y lỗi "function lower(bytea) does not exist"

// ✓ ÄÃšNG: Dùng VARCHAR cho cột khÃ´ng dùng string functions
@Column(name = "status", length = 20)
private String status;  // OK và¬ chá»‰ dùng exact match
```

**Migration SQL**:

```sql
-- ✓ ÄÃšNG: Dùng TEXT cho searchable columns
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    phone_number VARCHAR(20),  -- OK và¬ khÃ´ng dùng trong LOWER()
    status VARCHAR(20) DEFAULT 'ACTIVE'  -- OK và¬ chá»‰ exact match
);

-- ✗Œ SAI: Dùng VARCHAR cho searchable columns
CREATE TABLE users (
    username VARCHAR(255) NOT NULL,  -- CÃ³ thá»ƒ gÃ¢y lỗi với LOWER()
    email VARCHAR(255)  -- CÃ³ thá»ƒ gÃ¢y lỗi với LOWER()
);
```

**Repository Query**:

```java
// Náº¿u query nÃ y sử dụng LOWER(), cột pháº£i lÃ  TEXT
@Query("SELECT u FROM User u WHERE " +
       "LOWER(u.username) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
       "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchText, '%'))")
Page<User> searchUsers(@Param("searchText") String searchText, Pageable pageable);
// ←’ username và  email PHáº¢I lÃ  TEXT trong database
```

## Entity

- Káº¿ thá»«a `BaseEntity` để cÃ³ sáºµn `id` (UUID), `createdAt/updatedAt`, `createdBy/updatedBy`, `@PrePersist/@PreUpdate`.
- `@JsonFormat` pattern lấy từ constant hoáº·c format chuẩn khi expose ra JSON.
- Tránh logic nghiệp vụ trong entity; chá»‰ mapping và  helper đơn giản (copyFrom, toDTO).
- Sá»­ dá»¥ng `@Entity`, `@Table(name = "table_name")` với tÃªn bảng snake_case.

### Ví dụ Entity

```java
@Entity
@Table(name = "students")
public class Student extends BaseEntity {
    
    @Column(name = "username", nullable = false, unique = true, 
            columnDefinition = "VARCHAR(50) COMMENT 'Username của học sinh'")
    private String username;
    
    @Column(name = "grade", nullable = false,
            columnDefinition = "INT COMMENT 'Lớp há»c (6 hoáº·c 7)'")
    private Integer grade;
    
    @Column(name = "date_of_birth",
            columnDefinition = "DATE COMMENT 'Ngày sinh'")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    
    // Getters, setters, constructors
}
```

## Repository

- Mở rộng `JpaRepository<Entity, UUID>` (UUID thay và¬ Long).
- Query động: dùng @Query JPQL, Æ°u tiÃªn tham sá»‘ @Param và  kiá»ƒm soát null (nhÆ° `AND(:field IS NULL OR ...)`).
- Không chá»©a logic nghiệp vụ; chá»‰ truy xuất dá»¯ liá»‡u.
- Äáº·t tÃªn method rõ ý: `findBy...`, `existsBy...`, `findFirstBy...`, `getList` cho truy váº¥n động.

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

#### Ưu tiên JPQL thay và¬ Native SQL
- ✓ **Dùng JPQL**: Type-safe, dễ maintain, tận dá»¥ng JPA features
- ✗Œ **Tránh Native SQL**: Chá»‰ dùng khi thá»±c sá»± cần thiáº¿t (complex aggregations, database-specific functions)

**Ví dụ**:
```java
// ✓ ÄÃšNG: Dùng JPQL
@Query("SELECT u FROM User u WHERE u.userType = :userType")
Page<User> findByUserType(@Param("userType") UserType userType, Pageable pageable);

// ✗Œ SAI: Dùng Native SQL khÃ´ng cần thiáº¿t
@Query(value = "SELECT * FROM users u WHERE u.user_type = CAST(:userType AS text)", 
       nativeQuery = true)
Page<User> findByUserType(@Param("userType") UserType userType, Pageable pageable);
```

#### Xá»­ lý LIKE queries với wildcards
- ✓ **Xá»­ lý wildcards á»Ÿ Service Layer**: Repository chá»‰ nháº­n parameter Ä‘Ã£ Ä‘Æ°á»£c format sáºµn
- ✗Œ **Không dùng CONCAT trong Repository**: Tránh phức tạp hóa query, khÃ³ maintain

**Lý do**:
- TÃ¡ch biệt concerns: Repository chá»‰ truy váº¥n, Service xử lý business logic
- Dễ test và maintain hơn
- Linh hoạt hơn khi cần thay đổi search pattern

**Ví dụ**:

```java
// ✓ ÄÃšNG: Repository đơn giản
@Query("SELECT s FROM Skill s WHERE " +
       "(:grade IS NULL OR s.grade = :grade) AND " +
       "(:chapter IS NULL OR s.chapter LIKE :chapter) " +
       "ORDER BY s.createdAt DESC")
Page<Skill> searchSkills(
        @Param("grade") Integer grade,
        @Param("chapter") String chapter,  // ÄÃ£ cÃ³ % wildcards từ service
        Pageable pageable
);

// ✓ ÄÃšNG: Service xử lý wildcards
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
            chapterParam,  // ÄÃ£ xử lý wildcards
            pageable
    );

    return skills.map(this::toSkillListResponse);
}

// ✗Œ SAI: Xá»­ lý wildcards trong Repository
@Query("SELECT s FROM Skill s WHERE " +
       "(:chapter IS NULL OR s.chapter LIKE CONCAT('%', :chapter, '%'))")
Page<Skill> searchSkills(@Param("chapter") String chapter, Pageable pageable);
```

#### Xá»­ lý Case-Insensitive Search
- Náº¿u cần case-insensitive search, xử lý á»Ÿ Service Layer báº±ng cÃ¡ch convert input sang lowercase/uppercase trÆ°á»›c khi truyá»n và o repository
- Repository query cÃ³ thá»ƒ dùng `LOWER()` hoáº·c `UPPER()` nhÆ°ng parameter Ä‘Ã£ Ä‘Æ°á»£c convert sáºµn

**Ví dụ**:
```java
// Service Layer
String searchTextParam = null;
if (searchRequest.searchText() != null && !searchRequest.searchText().trim().isEmpty()) {
    searchTextParam = "%" + searchRequest.searchText().trim().toLowerCase() + "%";
}

// Repository
@Query("SELECT e FROM Exercise e WHERE " +
       "(:searchText IS NULL OR LOWER(e.problemText) LIKE :searchText)")
Page<Exercise> searchExercises(@Param("searchText") String searchText, Pageable pageable);
```

## Naming & migration

- Vá»›i bảng má»›i: sử dụng `snake_case` cho tÃªn cột, khÃ´ng cần prefix.
- Script migration cần tuÃ¢n thá»§ comment, kiểu dá»¯ liá»‡u phù hợp; index đặt tÃªn `idx_<table>_<columns>`.
- Sá»­ dá»¥ng Flyway migrations với naming convention: `V{version}__{description}.sql`
- Migration files trong `src/main/resources/db/migration/`

### Ví dụ Migration

```sql
-- V1__Create_students_table.sql
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE COMMENT 'Username của học sinh',
    grade INT NOT NULL COMMENT 'Lớp há»c (6 hoáº·c 7)',
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

- Dùng `Pageable` và  `Page<T>` từ Spring Data cho phÃ¢n trang.
- Dùng DTO `PageRequest`/`SortRequest` (nếu cÃ³) cho phần phÃ¢n trang/sort; máº·c Ä‘á»‹nh giÃ¡ trá»‹ trong constant.
- Tráº£ vá» `PageResponse<T>` hoáº·c `ResponseObject<PageResponse<T>>` cho paginated results.

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

Táº¥t cáº£ entities káº¿ thá»«a `BaseEntity`:

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

[←‘ Quay lại Overview](overview.md)

# TÃ­ch há»£p dịch vụ, HTTP Client, Cache/Redis
[← Quay lại Overview](overview.md)

## HTTP Client cho AI Service

- Sá»­ dá»¥ng Spring WebFlux `WebClient` cho HTTP client tá»›i AI Service.
- Má»—i service integration một `*Client` class trong package `com.tutor.core.client` hoáº·c `com.tutor.core.service.impl`.
- Sá»­ dá»¥ng tÃªn service trong config properties để Ä‘á»“ng bá»™ config.
- Timeout: cáº¥u hÃ¬nh connect/read timeout rõ rÃ ng (và­ dá»¥ 3s connect, 30s read) trong cáº¥u hÃ¬nh WebClient.
- Retry: báº­t retry cÃ³ giá»›i háº¡n (và­ dá»¥ tá»‘i Ä‘a 3 láº§n, backoff tÄƒng dáº§n) cho cÃ¡c call idempotent; táº¯t retry với cÃ¡c call tạo giao dá»‹ch khÃ´ng idempotent.
- Circuit breaker: báº­t báº£o vá»‡ (Resilience4j nếu sáºµn) cho cÃ¡c call ra ngoÃ i; fallback tráº£ `ResponseObject` với errorCode `4001` (Service integration error) hoáº·c `5001` (System error).
- Log request/response á»Ÿ má»©c DEBUG khi cần debug; trÃ¡nh log body nháº¡y cáº£m.

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

- Bắt buộc handle timeout, báº¯t lỗi và  map sang custom exception với errorCode chuẩn (và­ dá»¥ `4001` cho service unavailable, `5001` cho system error).
- Không nuá»‘t lỗi; log á»Ÿ má»©c ERROR với @Slf4j.
- Map HTTP status từ external service sang errorCode ná»™i bá»™:
  - 503/504 ←’ `4001` (Service unavailable)
  - 500 ←’ `5001` (System error)
  - 400 ←’ `4002` (Invalid request to external service)
  - Timeout ←’ `4001` (Service timeout)

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

## Redis/Cache (Náº¿u sử dụng)

- Cáº¥u hÃ¬nh RedisTemplate riÃªng cho từng model (User/Token/Otp/Student) nhÆ° trong `RedisConfig`.
- Key naming gá»£i ý:  
  - `user:{username}`  
  - `student:{studentId}`  
  - `token:{username}`  
  - `otp:{phone}:{type}`  
- TTL: OTP theo constant (và­ dá»¥ 5 phÃºt); token/student tÃ¹y thuá»™c yÃªu cáº§u business, cần set rõ trong config.
- Khi ghi DB thÃ nh cÃ´ng, Ä‘á»“ng bá»™ cache (save và o Redis); khi update/delete, xÃ³a hoáº·c cáº­p nháº­t cache tương ứng.

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

- Dùng `MessageSource` (ReloadableResourceBundleMessageSource) khi cần message Ä‘a ngÃ´n ngá»¯; base file trong `application.properties` hoáº·c bundle riÃªng.
- ErrorDetail cÃ³ thá»ƒ lấy từ MessageSource dá»±a trÃªn errorCode.

[←‘ Quay lại Overview](overview.md)


