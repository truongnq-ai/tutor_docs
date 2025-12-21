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

