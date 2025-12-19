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

- [`code-structure.md` - Cấu trúc code & đặt tên](code-structure.md)
- [`api-design.md` - API design & Swagger](api-design.md)
- [`persistence.md` - Persistence (DB, Entity, Repository)](persistence.md)
- [`service-integration.md` - Tích hợp dịch vụ, HTTP Client, Cache/Redis](service-integration.md)
- [`code-quality.md` - Kiểm tra chất lượng code & làm sạch](code-quality.md)

## Phạm vi áp dụng

- Áp dụng cho module Java/Spring Boot: `tutor-core-service`
- Package base: `com.tutor.core.*`

## Không nằm trong phạm vi

- Quy tắc front-end (Next.js, Flutter có tài liệu riêng).
- Quy tắc hạ tầng CI/CD (chỉ đề cập timeout/retry ở mức service).
