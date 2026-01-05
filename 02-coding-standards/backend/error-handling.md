# Exception Handling
← Quay lại: [README.md](../README.md)

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

## CommonException

`CommonException` là exception chung cho business logic errors, tương tự pattern estore nhưng tương thích với ErrorCode enum của tutor-core-service.

### Khi nào sử dụng CommonException

- **Business logic errors**: Khi có lỗi nghiệp vụ không cần exception class riêng
- **Data not found**: Khi không tìm thấy dữ liệu (thay vì tạo exception riêng cho mỗi entity)
- **General validation**: Khi validation logic phức tạp không thể dùng Bean Validation

### Khi nào sử dụng Custom Exception

- **Specific entity errors**: Khi cần exception riêng cho một entity cụ thể (e.g., `UserNotFoundException`, `ExerciseNotFoundException`)
- **Domain-specific errors**: Khi lỗi có ý nghĩa nghiệp vụ đặc biệt cần xử lý riêng

### Ví dụ sử dụng CommonException

```java
// Trong service
public PageResponse<UserResponse> getPage(PageRequest pageRequest) {
    Page<User> userPage = userRepository.findAll(pageable);
    
    if (userPage.isEmpty()) {
        throw new CommonException(
            ErrorCode.RESOURCE_NOT_FOUND,
            "Không tìm thấy dữ liệu cần tra cứu"
        );
    }
    
    // ...
}
```

### CommonException được xử lý bởi CustomExceptionHandler

```java
@ExceptionHandler(value = CommonException.class)
public ResponseEntity<ResponseObject<?>> handleCommonException(CommonException e) {
    ResponseObject<?> response = new ResponseObject<>(
        e.getErrorCodeString(),
        e.getErrorDetail(),
        null
    );
    return ResponseEntity.status(HttpStatus.OK).body(response);
}
```

## Mapping ErrorCode sang HTTP Status

- ErrorCode `1xxx` → HTTP 401/403 (Unauthorized/Forbidden)
- ErrorCode `2xxx` → HTTP 400 (Bad Request)
- ErrorCode `3xxx` → HTTP 404/409 (Not Found/Conflict)
- ErrorCode `4xxx` → HTTP 503 (Service Unavailable)
- ErrorCode `5xxx` → HTTP 500 (Internal Server Error)

← Quay lại: [README.md](../README.md)

