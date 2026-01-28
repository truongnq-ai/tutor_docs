# REST CONVENTIONS - API

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả REST conventions cho API - URL, method, versioning.

## URL Structure

### Format
- Base: `/api/v{version}/{resource}`
- Examples: `/api/v1/students`, `/api/v1/chapters/{id}`

### Resources
- **Plural nouns**: `students`, `chapters`, `skills`
- **Nested resources**: `/api/v1/chapters/{chapterId}/skills`
- **Actions**: `/api/v1/learning/plan` (not `/api/v1/learning/get-plan`)

## HTTP Methods

### GET
- **Read operations**: Get resource(s)
- **Idempotent**: Safe to call multiple times
- **Examples**: 
  - `GET /api/v1/students` - List students
  - `GET /api/v1/students/{id}` - Get student

### POST
- **Create operations**: Create new resource
- **Actions**: Perform actions
- **Examples**:
  - `POST /api/v1/students` - Create student
  - `POST /api/v1/mini-test/start` - Start mini test

### PUT
- **Update operations**: Full update
- **Idempotent**: Safe to call multiple times
- **Examples**:
  - `PUT /api/v1/students/{id}` - Update student

### DELETE
- **Delete operations**: Delete resource
- **Idempotent**: Safe to call multiple times
- **Examples**:
  - `DELETE /api/v1/students/{id}` - Delete student

## Versioning

### URL Versioning
- Format: `/api/v1/`, `/api/v2/`
- Default: `v1`
- Breaking changes: New version

### Version Strategy
- **v1**: Current stable version
- **v2**: Next version (when breaking changes)
- **Deprecation**: Announce deprecation 3 months before removal

## Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `size`: Page size (default: 20, max: 100)
- Example: `GET /api/v1/students?page=1&size=20`

### Filtering
- `grade`: Filter by grade
- `status`: Filter by status
- Example: `GET /api/v1/students?grade=6&status=active`

### Sorting
- `sort`: Sort field
- `order`: `asc` or `desc`
- Example: `GET /api/v1/students?sort=createdAt&order=desc`

## Path Parameters

### Format
- `{resourceId}`: UUID format
- Example: `/api/v1/students/{studentId}`

### Validation
- Validate UUID format
- Return 400 if invalid

## Tài liệu liên quan

- [Response Structure](./response-structure.md)
- [API Contracts](../../08-api-contracts/)

---

← Quay lại: [README.md](../README.md)

