# CHAPTER MIGRATION

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả migration từ `skill.chapter` (text) sang `chapter` entity - xử lý data cũ và đảm bảo backward compatibility.

## Vấn đề

### Trước migration
- `skill` table có cột `chapter` (TEXT)
- `exercise` table có cột `chapter` (TEXT)
- Không có entity `chapter`
- Khó query và maintain

### Sau migration
- Tạo bảng `chapter` mới
- `skill.chapter_id` → `chapter.id` (FK)
- `exercise.chapter_id` → `chapter.id` (FK)
- Dễ query và maintain

## Migration Steps

### Step 1: Create Chapter Table
```sql
CREATE TABLE chapter (
  id UUID PRIMARY KEY,
  grade INT NOT NULL CHECK (grade IN (6, 7)),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chapter_grade ON chapter(grade);
CREATE INDEX idx_chapter_code ON chapter(code);
CREATE UNIQUE INDEX idx_chapter_grade_name ON chapter(grade, name);
```

### Step 2: Extract Chapters from Existing Data
```sql
WITH chapter_data AS (
  SELECT DISTINCT 
    grade,
    chapter AS name,
    ROW_NUMBER() OVER (PARTITION BY grade ORDER BY MIN(
      CAST(SPLIT_PART(code, '.', 2) AS INTEGER)
    )) AS chapter_order
  FROM skill
  WHERE chapter IS NOT NULL AND chapter != ''
  GROUP BY grade, chapter
),
chapter_with_codes AS (
  SELECT 
    grade,
    name,
    grade || '.' || chapter_order::TEXT AS code
  FROM chapter_data
)
INSERT INTO chapter (id, grade, code, name, description, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  grade,
  code,
  name,
  NULL,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM chapter_with_codes;
```

### Step 3: Add chapter_id to skill and exercise
```sql
-- Add nullable column first
ALTER TABLE skill ADD COLUMN chapter_id UUID;
ALTER TABLE exercise ADD COLUMN chapter_id UUID;

-- Update from existing data
UPDATE skill s
SET chapter_id = (
    SELECT id FROM chapter c 
    WHERE c.grade = s.grade 
    AND c.name = s.chapter
)
WHERE s.chapter IS NOT NULL;

UPDATE exercise e
SET chapter_id = (
    SELECT s.chapter_id FROM skill s WHERE s.id = e.skill_id
)
WHERE e.skill_id IS NOT NULL;

-- Add foreign key
ALTER TABLE skill 
ADD CONSTRAINT fk_skill_chapter 
FOREIGN KEY (chapter_id) REFERENCES chapter(id);

ALTER TABLE exercise 
ADD CONSTRAINT fk_exercise_chapter 
FOREIGN KEY (chapter_id) REFERENCES chapter(id);

-- Set NOT NULL (after all data migrated)
ALTER TABLE skill ALTER COLUMN chapter_id SET NOT NULL;
ALTER TABLE exercise ALTER COLUMN chapter_id SET NOT NULL;

-- Drop old column
ALTER TABLE skill DROP COLUMN chapter;
ALTER TABLE exercise DROP COLUMN chapter;
```

## Xử lý Data Cũ

### Nullable chapterId Strategy
- `chapter_id` được set nullable trong migration đầu tiên
- Cho phép data cũ không có chapter vẫn hoạt động
- Sau đó update và set NOT NULL

### Missing Chapter Data
- Nếu skill không có chapter, tạo default chapter
- Hoặc set chapter_id to NULL (nếu allowed)

### Duplicate Chapter Names
- Use `(grade, name)` unique constraint
- Handle duplicates during migration

## Backward Compatibility

### API Compatibility
- API vẫn hoạt động với data cũ
- Response vẫn trả về chapter name (từ chapter entity)

### Code Compatibility
- Code cũ vẫn hoạt động
- Gradually migrate to use chapter_id

## Tài liệu liên quan

- [Backward Compatibility](./backward-compatibility.md)
- [Flyway Migration Notes](../07-architecture-and-data/flyway-migration-notes.md)

---

← Quay lại: [README.md](../README.md)

