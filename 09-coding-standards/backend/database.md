# DATABASE - CODING STANDARDS

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả coding standards cho database - naming, foreign keys, indexes, nullable strategy.

## Naming Conventions

### Tables
- Dùng `snake_case`
- Số ít: `user`, `skill`, `chapter`
- Ví dụ: `student_profile`, `mini_test_result`

### Columns
- Dùng `snake_case`
- Foreign keys: `{table}_id` (ví dụ: `chapter_id`, `skill_id`)
- Timestamps: `created_at`, `updated_at`

### Indexes
- Format: `idx_{table}_{column}`
- Ví dụ: `idx_skill_chapter_id`, `idx_practice_student_id`

## Foreign Keys

### Naming
- Column: `{referenced_table}_id`
- Constraint: `fk_{table}_{referenced_table}`
- Ví dụ: `fk_skill_chapter`, `fk_practice_skill`

### Constraints
- `ON DELETE RESTRICT`: Cho data consistency (default)
- `ON DELETE CASCADE`: Cho dependent data (ví dụ: practice khi xóa student)
- `ON DELETE SET NULL`: Cho optional relationships

### Examples
```sql
-- Skill → Chapter (required)
CONSTRAINT fk_skill_chapter 
FOREIGN KEY (chapter_id) REFERENCES chapter(id)
ON DELETE RESTRICT;

-- Practice → Student (cascade)
CONSTRAINT fk_practice_student
FOREIGN KEY (student_id) REFERENCES student_profile(id)
ON DELETE CASCADE;
```

## Indexes

### Primary Keys
- UUID v7 (generated at application layer)
- Index tự động tạo

### Foreign Keys
- Index trên tất cả foreign keys
- Format: `idx_{table}_{fk_column}`

### Query Optimization
- Index trên columns thường dùng trong WHERE
- Index trên columns thường dùng trong ORDER BY
- Composite indexes cho queries phức tạp

### Examples
```sql
-- Foreign key index
CREATE INDEX idx_skill_chapter_id ON skill(chapter_id);

-- Query optimization
CREATE INDEX idx_practice_student_skill ON practice(student_id, skill_id);
CREATE INDEX idx_practice_submitted_at ON practice(submitted_at) WHERE submitted_at IS NOT NULL;
```

## Nullable Strategy

### Required Fields
- Primary keys: NOT NULL
- Foreign keys: NOT NULL (nếu relationship required)
- Business-critical fields: NOT NULL

### Optional Fields
- Description, notes: NULL allowed
- Optional relationships: NULL allowed
- Timestamps: NULL allowed (nếu có thể chưa set)

### Migration Strategy
- Thêm column mới: NULLABLE initially
- Update data gradually
- Set NOT NULL sau khi data đã migrate

### Examples
```sql
-- Required
chapter_id UUID NOT NULL

-- Optional
description TEXT NULL

-- Migration
ALTER TABLE skill ADD COLUMN chapter_id UUID NULL;
-- Update data...
ALTER TABLE skill ALTER COLUMN chapter_id SET NOT NULL;
```

## Data Types

### UUID
- Primary keys: UUID v7
- Foreign keys: UUID
- Generated at application layer

### TEXT vs VARCHAR
- **TEXT**: Cho columns dùng trong LIKE, LOWER(), UPPER()
- **VARCHAR**: Cho columns chỉ exact match
- **Rule**: Nếu có thể cần search → dùng TEXT

### JSON/JSONB
- JSONB cho structured data (faster queries)
- JSON cho simple data
- Examples: `solution_steps`, `prerequisite_ids`, `details`

## Tài liệu liên quan

- [Database Schema](../../07-architecture-and-data/database-schema.md)
- [Flyway Migration Notes](../../07-architecture-and-data/flyway-migration-notes.md)

---

← Quay lại: [README.md](../README.md)

