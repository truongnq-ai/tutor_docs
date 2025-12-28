# Database Schema
← Quay lại: [README.md](../README.md)

## Exercise Draft Table

Lưu trữ draft exercises từ các nguồn khác nhau (image, manual, AI).

```sql
CREATE TABLE exercise_draft (
  id UUID PRIMARY KEY,
  source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('manual', 'image', 'docx', 'csv', 'json', 'ai')),
  source_data JSON,
  exercise_data JSON NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review')),
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);
```

## Exercise Draft Batch Table

Lưu trữ batch imports (DOCX, CSV, JSON).

```sql
CREATE TABLE exercise_draft_batch (
  id UUID PRIMARY KEY,
  source_type VARCHAR(50) NOT NULL CHECK (source_type IN ('docx', 'csv', 'json')),
  source_file_id VARCHAR(255),
  source_file_name VARCHAR(255),
  total_exercises INT NOT NULL,
  valid_exercises INT DEFAULT 0,
  invalid_exercises INT DEFAULT 0,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);
```

## Exercise Draft Batch Item Table

Lưu trữ từng exercise trong batch.

```sql
CREATE TABLE exercise_draft_batch_item (
  id UUID PRIMARY KEY,
  batch_id UUID NOT NULL,
  exercise_index INT NOT NULL,
  exercise_data JSON NOT NULL,
  validation_errors JSON,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'valid', 'invalid')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_draft_batch FOREIGN KEY (batch_id) 
    REFERENCES exercise_draft_batch(id) ON DELETE CASCADE
);
```

## Scheduled Cleanup

Tự động xóa draft sau khi hết hạn (7 ngày):

```sql
DELETE FROM exercise_draft 
WHERE expires_at IS NOT NULL 
  AND expires_at < CURRENT_TIMESTAMP;
```

← Quay lại: [README.md](../README.md)

