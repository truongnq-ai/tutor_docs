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

