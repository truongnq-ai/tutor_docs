# FLYWAY MIGRATION NOTES

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả các lưu ý quan trọng khi deploy database migrations đã có data, đặc biệt là migration liên quan đến Chapter entity.

## Migration Chapter Entity (V30)

### Vấn đề
- Database đã có data trong bảng `skill` với cột `chapter` (text)
- Cần tạo bảng `chapter` mới và migrate data
- Cần thêm `chapter_id` FK vào `skill` và `exercise`

### Giải pháp

**Step 1: Tạo bảng Chapter**
- Tạo bảng `chapter` mới
- Extract chapters từ existing skill data
- Hoặc tạo default chapters nếu không có data

**Step 2: Migrate Data**
- Extract `chapter` text từ `skill` table
- Tạo Chapter records
- Map `skill.chapter` → `chapter.id`

**Step 3: Add FK**
- Add `chapter_id` column (nullable initially)
- Update `chapter_id` từ mapping
- Set NOT NULL constraint
- Drop old `chapter` text column

### Backward Compatibility
- `chapter_id` được set nullable trong migration đầu tiên
- Cho phép data cũ không có chapter vẫn hoạt động
- Sau đó update và set NOT NULL

## Nullable chapterId Strategy

### Tại sao nullable?
- Data cũ có thể không có chapter
- Migration cần thời gian để update
- Tránh break existing functionality

### Xử lý data cũ
```sql
-- Step 1: Add nullable column
ALTER TABLE skill ADD COLUMN chapter_id UUID;

-- Step 2: Update from existing data
UPDATE skill s
SET chapter_id = (
    SELECT id FROM chapter c 
    WHERE c.grade = s.grade 
    AND c.name = s.chapter
)
WHERE s.chapter IS NOT NULL;

-- Step 3: Set NOT NULL (after all data migrated)
ALTER TABLE skill ALTER COLUMN chapter_id SET NOT NULL;
```

## Migration Best Practices

### 1. Test với Production-like Data
- Test migration với data tương tự production
- Đảm bảo không mất data
- Đảm bảo performance acceptable

### 2. Rollback Plan
- Có plan rollback nếu migration fail
- Backup data trước khi migrate
- Test rollback procedure

### 3. Zero Downtime
- Migration nên được thiết kế để zero downtime
- Sử dụng nullable columns initially
- Update data gradually

### 4. Data Validation
- Validate data sau migration
- Check foreign key constraints
- Verify data integrity

## Common Issues

### Issue 1: Duplicate Chapter Names
- Có thể có duplicate chapter names trong data cũ
- Solution: Use `(grade, name)` unique constraint
- Handle duplicates during migration

### Issue 2: Missing Chapter Data
- Một số skills có thể không có chapter
- Solution: Create default chapters
- Or set chapter_id to NULL (if allowed)

### Issue 3: Performance
- Migration có thể chậm với large dataset
- Solution: Use batch updates
- Add indexes before migration

## Tài liệu liên quan

- [Chapter Migration](../10-release-and-migration/chapter-migration.md)
- [Backward Compatibility](../10-release-and-migration/backward-compatibility.md)
- [Database Schema](./database-schema.md)

---

← Quay lại: [README.md](../README.md)

