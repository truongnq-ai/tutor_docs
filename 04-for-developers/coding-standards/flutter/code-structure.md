# Cấu trúc code & đặt tên
[← Quay lại Overview](README.md)

## Package & layer (Clean Architecture)

- `lib/src/core/`: Core functionality và utilities
  - `base/`: Base classes và interfaces
  - `di/`: Dependency injection setup (Riverpod)
  - `extensions/`: Extension methods
  - `logger/`: Logging configuration
  - `config/`: Environment config
- `lib/src/domain/`: Business logic layer
  - `entities/`: Business entities
  - `repositories/`: Repository interfaces
  - `use_cases/`: Business use cases
- `lib/src/data/`: Data layer
  - `models/`: Data models (DTOs)
  - `repositories/`: Repository implementations
  - `services/`: API services (Retrofit/Dio)
- `lib/src/presentation/`: UI layer
  - `core/`: Core UI components
    - `router/`: Navigation (go_router)
    - `theme/`: Theming
    - `widgets/`: Reusable widgets
  - `features/`: Feature-specific UI
    - `onboarding/`: Onboarding flow
    - `tutor/`: Tutor mode (solve problems)
    - `practice/`: Practice sessions
    - `progress/`: Progress tracking

## Đặt tên class/file

- Files: `snake_case.dart` (ví dụ: `student_service.dart`, `student_list_screen.dart`).
- Classes: `PascalCase` (ví dụ: `StudentService`, `StudentListScreen`).
- Functions: `camelCase` (ví dụ: `getStudentList`, `solveMathProblem`).
- Variables: `camelCase` (ví dụ: `studentId`, `isLoading`).
- Constants: `lowerCamelCase` (ví dụ: `apiBaseUrl`) hoặc `UPPER_SNAKE_CASE` cho global constants.
- Không đặt tên viết tắt khó hiểu; ưu tiên tên nghiệp vụ rõ ràng.

## Nguyên tắc chung khi viết code

- Không hardcode string/number lặp lại; đưa vào constants hoặc config.
- Validate đầu vào bằng validators; ném custom exception với errorCode tương ứng.
- Sử dụng Riverpod cho dependency injection và state management.
- Sử dụng Retrofit + Dio cho API calls.
- Không truy cập trực tiếp data layer trong presentation layer; mọi logic qua domain layer (use cases).

## Logging

- Dùng logger package, logger tạo với `Logger()`.
- Log error ở service/screen khi catch Exception; tránh log lặp stack trace nhiều tầng.
- Không log dữ liệu nhạy cảm (password, token), chỉ log request ID, errorCode nếu có.

## Response & Exception

- Tất cả API trả `ResponseObject<T>` với `errorCode`/`errorDetail`/`data`; sử dụng HTTP status codes tương ứng.
- Custom exception mang theo errorCode; error handler map sang user-friendly message.
- Kết hợp HTTP status codes chuẩn (200/400/401/403/404/500) với errorCode trong ResponseObject.

## Navigation

- Sử dụng go_router cho navigation.
- Route paths: kebab-case (ví dụ: `/student-list`, `/tutor-solve`).
- Route names: constants trong `lib/src/presentation/core/router/routes.dart`.

## Ví dụ thêm mới một feature (ví dụ: "Practice Session")

- **Entity**: tạo `lib/src/domain/entities/practice_session.dart`.
- **Repository Interface**: `lib/src/domain/repositories/practice_repository.dart`.
- **Use Case**: `lib/src/domain/use_cases/get_practice_session.dart`.
- **Data Model**: `lib/src/data/models/practice_session_model.dart`.
- **Repository Implementation**: `lib/src/data/repositories/practice_repository_impl.dart`.
- **Service**: `lib/src/data/services/practice_service.dart` (Retrofit interface).
- **Screen**: `lib/src/presentation/features/practice/practice_screen.dart`.
- **Widgets**: `lib/src/presentation/features/practice/widgets/` (nếu cần).

## Tài liệu liên quan

- [API consumption patterns](api-client.md)
- [State management với Riverpod](state-management.md)
- [UI & Widgets patterns](ui-widgets.md)
- [Kiểm tra chất lượng code](code-quality.md)

[← Quay lại Overview](README.md)

