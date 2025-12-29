# BACKWARD COMPATIBILITY

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả backward compatibility strategy - xử lý data cũ không có chapter và đảm bảo hệ thống vẫn hoạt động.

## Nullable chapterId

### Tại sao nullable?
- Data cũ có thể không có chapter
- Migration cần thời gian để update
- Tránh break existing functionality

### Strategy
1. Add `chapter_id` column as nullable
2. Update data gradually
3. Set NOT NULL after all data migrated

## Xử lý Data Cũ

### Case 1: Skill không có chapter
```sql
-- Option 1: Create default chapter
INSERT INTO chapter (id, grade, code, name)
VALUES (gen_random_uuid(), 6, '6.0', 'Chương mặc định');

UPDATE skill 
SET chapter_id = (SELECT id FROM chapter WHERE code = '6.0')
WHERE chapter_id IS NULL AND grade = 6;

-- Option 2: Set to NULL (if allowed)
-- Keep chapter_id as nullable
```

### Case 2: Exercise không có chapter
```sql
-- Get chapter_id from skill
UPDATE exercise e
SET chapter_id = (
    SELECT s.chapter_id FROM skill s WHERE s.id = e.skill_id
)
WHERE e.chapter_id IS NULL;
```

## API Compatibility

### Response Format
- API vẫn trả về chapter name (từ chapter entity)
- Không thay đổi response format
- Client code không cần update

### Query Compatibility
- Old queries vẫn hoạt động
- Gradually migrate to use chapter_id

## Code Compatibility

### Gradual Migration
- Code cũ vẫn hoạt động với nullable chapter_id
- Gradually update code to use chapter_id
- Remove old chapter text column after migration

## Tài liệu liên quan

- [Chapter Migration](./chapter-migration.md)
- [Flyway Migration Notes](../07-architecture-and-data/flyway-migration-notes.md)

---

← Quay lại: [README.md](../README.md)

