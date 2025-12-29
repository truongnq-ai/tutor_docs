CREATE TABLE exercise (
    id              UUID PRIMARY KEY,
    chapter_id      UUID NOT NULL,
    skill_id        UUID NOT NULL,
    content_text    TEXT NOT NULL,
    content_latex   TEXT,
    difficulty      INT NOT NULL,
    created_by      VARCHAR(20) NOT NULL,
    status          VARCHAR(20) NOT NULL,
    created_at      TIMESTAMP NOT NULL,
    updated_at      TIMESTAMP NOT NULL,
    CONSTRAINT fk_exercise_chapter
        FOREIGN KEY (chapter_id) REFERENCES chapter(id),
    CONSTRAINT fk_exercise_skill
        FOREIGN KEY (skill_id) REFERENCES skill(id),
    CONSTRAINT chk_exercise_created_by
        CHECK (created_by IN ('ADMIN', 'AI', 'TEACHER')),
    CONSTRAINT chk_exercise_status
        CHECK (status IN ('DRAFT', 'REVIEWED', 'APPROVED'))
);

CREATE TABLE exercise_solution (
    id              UUID PRIMARY KEY,
    exercise_id     UUID NOT NULL,
    solution_steps  TEXT,
    final_answer    TEXT,
    explanation     TEXT,
    created_by      VARCHAR(20) NOT NULL,
    created_at      TIMESTAMP NOT NULL,
    CONSTRAINT fk_solution_exercise
        FOREIGN KEY (exercise_id) REFERENCES exercise(id)
);

CREATE TABLE exercise_tag (
    id          UUID PRIMARY KEY,
    exercise_id UUID NOT NULL,
    tag_name    VARCHAR(100) NOT NULL,
    tag_type    VARCHAR(50),
    created_at  TIMESTAMP NOT NULL,
    CONSTRAINT fk_tag_exercise
        FOREIGN KEY (exercise_id) REFERENCES exercise(id)
);

CREATE TABLE exercise_review_log (
    id          UUID PRIMARY KEY,
    exercise_id UUID NOT NULL,
    reviewer_id UUID NOT NULL,
    action      VARCHAR(20) NOT NULL,
    comment     TEXT,
    created_at  TIMESTAMP NOT NULL,
    CONSTRAINT fk_review_exercise
        FOREIGN KEY (exercise_id) REFERENCES exercise(id),
    CONSTRAINT fk_review_reviewer
        FOREIGN KEY (reviewer_id) REFERENCES users(id),
    CONSTRAINT chk_review_action
        CHECK (action IN ('SUBMITTED', 'APPROVED', 'REJECTED', 'UPDATED'))
);
