# GENERAL PRINCIPLES - CODING STANDARDS

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả các nguyên tắc chung cho coding standards trong dự án Tutor.

## Clean Code

### Đọc được
- Code phải dễ đọc, dễ hiểu
- Đặt tên có ý nghĩa, mô tả rõ chức năng
- Tránh magic numbers, dùng constants

### Đơn giản
- KISS (Keep It Simple, Stupid)
- Tránh over-engineering
- Ưu tiên giải pháp đơn giản, dễ maintain

### DRY (Don't Repeat Yourself)
- Tránh duplicate code
- Extract common logic thành functions/classes
- Reuse components khi có thể

## Separation of Concerns

### Layered Architecture
- **Presentation Layer**: UI, API endpoints
- **Application Layer**: Business logic, use cases
- **Domain Layer**: Entities, domain models
- **Infrastructure Layer**: Database, external services

### Single Responsibility
- Mỗi class/function chỉ làm một việc
- Tránh God classes
- Tách biệt concerns rõ ràng

## Backward Compatibility

### API Compatibility
- Không breaking changes trong API
- Version API khi cần thay đổi lớn
- Deprecate thay vì remove

### Database Compatibility
- Migration phải backward compatible
- Nullable columns khi thêm mới
- Không drop columns ngay, deprecate trước

### Code Compatibility
- Gradual migration
- Support old và new code cùng lúc
- Remove old code sau khi migration xong

## Chapter–Skill Boundaries

### Chapter: Trục Sư phạm / UX
- Hiển thị cho học sinh/phụ huynh
- Navigation và lộ trình
- Progress tracking
- Báo cáo

### Skill: Trục AI / Luyện tập
- Practice và luyện tập
- Mastery tracking
- Adaptive learning logic
- Phân tích chi tiết

### Quy tắc
- **UI Layer**: Chỉ hiển thị Chapter, không hiển thị Skill (trừ khi cần)
- **Business Logic**: Dùng Skill cho tính toán, Chapter cho hiển thị
- **API Response**: Có thể trả cả Chapter và Skill, nhưng UI chỉ hiển thị Chapter

## Error Handling

### Consistent Error Format
- Tất cả errors dùng `errorCode` + `errorDetail`
- Error codes theo convention (0001-9999)
- HTTP status codes phù hợp

### Error Propagation
- Log errors ở đúng layer
- Không log sensitive data
- Provide meaningful error messages

## Testing

### Unit Tests
- Test business logic
- Test edge cases
- High coverage cho critical paths

### Integration Tests
- Test API endpoints
- Test database operations
- Test service integrations

## Documentation

### Code Comments
- Comment cho complex logic
- JSDoc/JavaDoc cho public APIs
- README cho modules

### API Documentation
- Swagger/OpenAPI cho APIs
- Request/Response examples
- Error codes documentation

## Tài liệu liên quan

- [Coding Standards README](./README.md)
- [Chapter vs Skill](../00-core-concepts/chapter-vs-skill.md)

---

← Quay lại: [README.md](../README.md)

