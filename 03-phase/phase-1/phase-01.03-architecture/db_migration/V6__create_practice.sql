CREATE TABLE practice (
    id                  UUID PRIMARY KEY,
    chapter_progress_id UUID NOT NULL,
    exercise_snapshot   JSONB NOT NULL,
    student_answer      TEXT,
    is_correct          BOOLEAN,
    submitted_at        TIMESTAMP,
    CONSTRAINT fk_practice_progress
        FOREIGN KEY (chapter_progress_id) REFERENCES chapter_progress(id)
);
