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

- [`code-structure.md` - Cấu trúc code & đặt tên](code-structure.md)
- [`api-consumption.md` - Gọi API với HTTP client](api-consumption.md)
- [`state-management.md` - State management với Riverpod](state-management.md)
- [`ui-widgets.md` - UI & Widgets patterns](ui-widgets.md)
- [`code-quality.md` - Kiểm tra chất lượng code & làm sạch](code-quality.md)

## Phạm vi áp dụng

- Toàn bộ mobile app Flutter: `tutor-student-app`
- Các file trong `lib/src/`.

## Ngoài phạm vi

- Quy tắc backend (Java, Python có tài liệu riêng).
- Quy tắc web frontend (Next.js có tài liệu riêng).
