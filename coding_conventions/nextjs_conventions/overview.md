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

- [`code-structure.md` - Cấu trúc code & đặt tên](code-structure.md)
- [`api-consumption.md` - Gọi API với HTTP client](api-consumption.md)
- [`state-management.md` - State, utilities, form](state-management.md)
- [`style-format-lint.md` - Style, format & lint](style-format-lint.md)
- [`ui-components.md` - UI Components Conventions (ActionsDropdown)](ui-components.md)
- [`code-quality.md` - Kiểm tra chất lượng code & làm sạch](code-quality.md)
- [`security-auth.md` - Auth & bảo mật](security-auth.md)

## Phạm vi áp dụng

- Toàn bộ frontend Next.js: `tutor-admin-dashboard` và `tutor-parent-dashboard`
- Các route/component/service trong `src/`.

## Ngoài phạm vi

- Quy tắc backend (Java, Python có tài liệu riêng).
- Quy tắc mobile app (Flutter có tài liệu riêng).
