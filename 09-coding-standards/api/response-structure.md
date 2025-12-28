# RESPONSE STRUCTURE - API

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả unified response structure cho tất cả APIs.

## ResponseObject Structure

### Success Response
```json
{
  "errorCode": "0000",
  "errorDetail": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "errorCode": "0001",
  "errorDetail": "Error description",
  "data": null
}
```

## Error Code Convention

### Ranges
- **"0000"**: Success (optional in success response)
- **"0001" - "0999"**: Business errors
- **"1000" - "1999"**: Authentication & Authorization
- **"2000" - "2999"**: Validation errors
- **"3000" - "3999"**: Resource errors (not found, conflict)
- **"4000" - "4999"**: Service integration errors
- **"5000" - "5999"**: System errors
- **"6000" - "9999"**: Reserved

### HTTP Status Mapping
- **200**: Success (errorCode "0000" or absent)
- **400**: Bad Request (errorCode 2xxx)
- **401**: Unauthorized (errorCode 1xxx)
- **403**: Forbidden (errorCode 1xxx)
- **404**: Not Found (errorCode 3xxx)
- **409**: Conflict (errorCode 3xxx)
- **500**: Internal Server Error (errorCode 5xxx)
- **503**: Service Unavailable (errorCode 4xxx)

## Examples

### Success Response
```json
{
  "errorCode": "0000",
  "errorDetail": "Student retrieved successfully",
  "data": {
    "id": "01234567-89ab-cdef-0123-456789abcdef",
    "name": "Nguyễn Văn A",
    "grade": 6
  }
}
```

### Error Response
```json
{
  "errorCode": "3001",
  "errorDetail": "Student not found",
  "data": null
}
```

## Implementation

### Java (Spring Boot)
```java
@GetMapping("/students/{id}")
public ResponseEntity<ResponseObject<StudentResponse>> getStudent(@PathVariable UUID id) {
    StudentResponse student = studentService.getStudent(id);
    ResponseObject<StudentResponse> response = new ResponseObject<>(
        "0000",
        "Student retrieved successfully",
        student
    );
    return ResponseEntity.ok(response);
}
```

### Python (FastAPI)
```python
@router.get("/students/{student_id}")
async def get_student(student_id: UUID) -> ResponseObject[StudentResponse]:
    student = await student_service.get_student(student_id)
    return ResponseObject(
        error_code="0000",
        error_detail="Student retrieved successfully",
        data=student
    )
```

## Tài liệu liên quan

- [REST Conventions](./rest-conventions.md)
- [Error Handling](../backend/error-handling.md)

---

← Quay lại: [README.md](../README.md)

