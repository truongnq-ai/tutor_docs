# FLYWAY - CODING STANDARDS

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả coding standards cho Flyway migrations - migration rules, backward compatibility.

## Migration Naming

### Format
- `V{version}__{description}.sql`
- Version: Sequential number (V1, V2, V3...)
- Description: Snake_case, mô tả ngắn gọn

### Examples
```
V1__Initial_schema.sql
V30__Create_chapter_entity.sql
V31__Add_chapter_to_mini_test.sql
```

## Migration Rules

### 1. Idempotent Operations
- Migrations phải có thể chạy lại an toàn
- Dùng `IF NOT EXISTS`, `IF EXISTS` khi cần
- Check data trước khi migrate

### 2. Backward Compatibility
- Thêm column mới: NULLABLE initially
- Không drop columns ngay, deprecate trước
- Support old và new code cùng lúc

### 3. Data Migration
- Migrate data trong transaction
- Validate data sau migration
- Rollback plan nếu fail

### 4. Performance
- Batch updates cho large datasets
- Add indexes sau khi migrate data
- Test với production-like data

## Migration Structure

### Header
```sql
-- ============================================
-- [MIGRATION NAME]
-- Version: V{version}
-- Date: YYYY-MM-DD
-- Changes:
-- 1. [Change 1]
-- 2. [Change 2]
-- ============================================
```

### Steps
```sql
-- ============================================
-- STEP 1: [Step Name]
-- ============================================
-- SQL code

-- ============================================
-- STEP 2: [Step Name]
-- ============================================
-- SQL code
```

### Comments
```sql
-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE chapter IS 'Danh mục chương học';
COMMENT ON COLUMN chapter.code IS 'Mã chương unique';
```

## Backward Compatibility Patterns

### Pattern 1: Add Column (Nullable)
```sql
-- Step 1: Add nullable column
ALTER TABLE skill ADD COLUMN chapter_id UUID;

-- Step 2: Migrate data
UPDATE skill s
SET chapter_id = (SELECT id FROM chapter c WHERE c.name = s.chapter)
WHERE s.chapter IS NOT NULL;

-- Step 3: Add FK
ALTER TABLE skill 
ADD CONSTRAINT fk_skill_chapter 
FOREIGN KEY (chapter_id) REFERENCES chapter(id);

-- Step 4: Set NOT NULL (after all data migrated)
ALTER TABLE skill ALTER COLUMN chapter_id SET NOT NULL;
```

### Pattern 2: Rename Column
```sql
-- Step 1: Add new column
ALTER TABLE table_name ADD COLUMN new_column_name TYPE;

-- Step 2: Migrate data
UPDATE table_name SET new_column_name = old_column_name;

-- Step 3: Drop old column (in later migration)
-- ALTER TABLE table_name DROP COLUMN old_column_name;
```

### Pattern 3: Change Type
```sql
-- Step 1: Add new column with new type
ALTER TABLE table_name ADD COLUMN new_column NEW_TYPE;

-- Step 2: Migrate data
UPDATE table_name SET new_column = CAST(old_column AS NEW_TYPE);

-- Step 3: Drop old column (in later migration)
```

## Rollback Strategy

### Manual Rollback
- Document rollback steps
- Test rollback procedure
- Backup data trước khi migrate

### Automatic Rollback
- Flyway không tự động rollback
- Cần tạo migration mới để revert
- Version: V{version+1}__Revert_{description}.sql

## Best Practices

### 1. Test First
- Test với production-like data
- Test rollback procedure
- Validate data sau migration

### 2. Small Migrations
- Tách migrations lớn thành nhiều migrations nhỏ
- Mỗi migration làm một việc
- Dễ debug và rollback

### 3. Documentation
- Comment rõ ràng trong migration
- Document changes trong header
- Update migration notes

### 4. Validation
- Validate data sau migration
- Check constraints
- Verify indexes

## Tài liệu liên quan

- [Database Schema](../../07-architecture-and-data/database-schema.md)
- [Flyway Migration Notes](../../07-architecture-and-data/flyway-migration-notes.md)
- [Chapter Migration](../../10-release-and-migration/chapter-migration.md)

---

← Quay lại: [README.md](../README.md)

