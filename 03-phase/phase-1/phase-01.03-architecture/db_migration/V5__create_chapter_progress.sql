CREATE TABLE chapter_progress (
    id              UUID PRIMARY KEY,
    student_id      UUID NOT NULL,
    chapter_id      UUID NOT NULL,
    chapter_state   VARCHAR(20) NOT NULL,
    created_at      TIMESTAMP NOT NULL,
    updated_at      TIMESTAMP NOT NULL,
    CONSTRAINT fk_progress_student
        FOREIGN KEY (student_id) REFERENCES users(id),
    CONSTRAINT fk_progress_chapter
        FOREIGN KEY (chapter_id) REFERENCES chapter(id),
    CONSTRAINT uq_student_chapter
        UNIQUE (student_id, chapter_id),
    CONSTRAINT chk_chapter_state
        CHECK (chapter_state IN ('LOCKED', 'IN_PROGRESS', 'COMPLETED'))
);

-- Enforce invariant: only one IN_PROGRESS chapter per student
CREATE UNIQUE INDEX uq_student_in_progress
    ON chapter_progress (student_id)
    WHERE chapter_state = 'IN_PROGRESS';
