# Database Schema
← Quay lại: [README.md](../README.md)

## Question Table

```sql
CREATE TABLE question (
  id UUID PRIMARY KEY,
  
  -- Liên kết với Exercise (template)
  exercise_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  
  -- Snapshot Exercise data tại thời điểm assign
  problem_text TEXT NOT NULL,
  problem_latex TEXT,
  problem_image_url TEXT,
  solution_steps JSONB NOT NULL,
  final_answer TEXT,
  common_mistakes JSONB,
  hints JSONB,
  difficulty_level INT,
  
  -- Customization (nếu có)
  customized_data JSONB,
  
  -- Assignment info
  assigned_to_student_id UUID,
  assigned_at TIMESTAMP,
  
  -- Metadata
  question_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'ASSIGNED', -- DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED
  
  -- Note: Student response data (student_answer, is_correct, time_taken_sec, submitted_at) 
  --       đã được chuyển sang Practice table
  -- Note: session_id đã được chuyển sang Practice table (session_id + session_type)
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_question_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE RESTRICT,
  CONSTRAINT fk_question_skill FOREIGN KEY (skill_id) REFERENCES skill(id) ON DELETE RESTRICT,
  CONSTRAINT fk_question_student FOREIGN KEY (assigned_to_student_id) REFERENCES student_profile(id) ON DELETE SET NULL
);
```

## Practice Table Update

Practice table đã được refactor để lưu student response và session info:

```sql
-- question_id: Bắt buộc (non-nullable)
ALTER TABLE practice 
ALTER COLUMN question_id SET NOT NULL;

-- session_id + session_type: Polymorphic relationship với các session types
-- session_id UUID
-- session_type VARCHAR(50) -- PRACTICE, PRACTICE_SESSION, MINI_TEST, etc.

-- Practice Status (Option E Implementation)
-- status VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED'
-- Values: NOT_STARTED, SUBMITTED, CANCELLED
ALTER TABLE practice 
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'NOT_STARTED';

-- Update existing records: Set status = 'SUBMITTED' where submitted_at IS NOT NULL
UPDATE practice 
SET status = 'SUBMITTED' 
WHERE submitted_at IS NOT NULL;

-- Student response data (đã chuyển từ Question table)
-- student_answer TEXT
-- is_correct BOOLEAN
-- duration_sec INT
-- submitted_at TIMESTAMP

-- Constraints
ALTER TABLE practice
ADD CONSTRAINT check_practice_question_id CHECK (question_id IS NOT NULL);

ALTER TABLE practice
ADD CONSTRAINT check_practice_session_type 
CHECK (session_type IN (
  'PRACTICE', 'PRACTICE_SESSION', 'MINI_TEST',
  'TEST_30MIN', 'TEST_45MIN', 'TEST_60MIN', 'TEST_90MIN', 'TEST_120MIN', 'TEST_180MIN',
  'MIDTERM_EXAM', 'FINAL_EXAM'
));

ALTER TABLE practice
ADD CONSTRAINT check_practice_status 
CHECK (status IN ('NOT_STARTED', 'SUBMITTED', 'CANCELLED'));

-- Indexes
CREATE INDEX idx_practice_question_id ON practice(question_id);
CREATE INDEX idx_practice_session_id_type ON practice(session_id, session_type);
CREATE INDEX idx_practice_status ON practice(status);
CREATE INDEX idx_practice_session_status ON practice(session_id, session_type, status);
```

← Quay lại: [README.md](../README.md)

