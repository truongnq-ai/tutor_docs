# Database Schema
[← Quay lại Overview](README.md)

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
  session_id UUID,
  
  -- Student response (sau khi làm bài)
  student_answer TEXT,
  is_correct BOOLEAN,
  time_taken_sec INT,
  submitted_at TIMESTAMP,
  
  -- Metadata
  question_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'ASSIGNED',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_question_exercise FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE RESTRICT,
  CONSTRAINT fk_question_skill FOREIGN KEY (skill_id) REFERENCES skill(id) ON DELETE RESTRICT,
  CONSTRAINT fk_question_student FOREIGN KEY (assigned_to_student_id) REFERENCES student_profile(id) ON DELETE SET NULL
);
```

## Practice Table Update

Thêm `question_id` vào practice table:

```sql
ALTER TABLE practice 
ADD COLUMN question_id UUID,
ADD CONSTRAINT fk_practice_question 
  FOREIGN KEY (question_id) REFERENCES question(id) 
  ON DELETE SET NULL;

CREATE INDEX idx_practice_question_id ON practice(question_id);
```

[← Quay lại Overview](README.md)

