CREATE TABLE student_profile (
    user_id         UUID PRIMARY KEY,
    lifecycle_state VARCHAR(20) NOT NULL,
    created_at      TIMESTAMP NOT NULL,
    updated_at      TIMESTAMP NOT NULL,
    CONSTRAINT fk_student_profile_user
        FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT chk_student_lifecycle
        CHECK (lifecycle_state IN ('ACTIVE', 'SUSPENDED', 'INACTIVE'))
);

CREATE TABLE parent_student (
    parent_id   UUID NOT NULL,
    student_id  UUID NOT NULL,
    PRIMARY KEY (parent_id, student_id),
    CONSTRAINT fk_parent_student_parent
        FOREIGN KEY (parent_id) REFERENCES users(id),
    CONSTRAINT fk_parent_student_student
        FOREIGN KEY (student_id) REFERENCES users(id)
);
