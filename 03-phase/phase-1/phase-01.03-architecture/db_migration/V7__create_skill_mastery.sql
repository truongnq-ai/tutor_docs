CREATE TABLE skill_mastery (
    student_id      UUID NOT NULL,
    skill_id        UUID NOT NULL,
    mastery_value   INT NOT NULL,
    updated_at      TIMESTAMP NOT NULL,
    PRIMARY KEY (student_id, skill_id),
    CONSTRAINT fk_mastery_student
        FOREIGN KEY (student_id) REFERENCES users(id),
    CONSTRAINT fk_mastery_skill
        FOREIGN KEY (skill_id) REFERENCES skill(id),
    CONSTRAINT chk_mastery_value
        CHECK (mastery_value BETWEEN 0 AND 100)
);
