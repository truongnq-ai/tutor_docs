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

