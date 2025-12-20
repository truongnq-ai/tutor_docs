# Persistence (DB, Entity, Repository)
[← Quay lại Overview](overview.md)

## Quy tắc DB schema

- Tên bảng/column dùng `snake_case`.
- Thêm comment cho cột qua `@Column(columnDefinition = " ... COMMENT '...'" )` hoặc comment trong SQL migration để mô tả ý nghĩa.
- Khóa chính dùng UUID (`java.util.UUID`) thay vì auto-increment.
- Sử dụng `@GeneratedValue(strategy = GenerationType.UUID)` cho primary key.

## Entity

- Kế thừa `BaseEntity` để có sẵn `id` (UUID), `createdAt/updatedAt`, `createdBy/updatedBy`, `@PrePersist/@PreUpdate`.
- `@JsonFormat` pattern lấy từ constant hoặc format chuẩn khi expose ra JSON.
- Tránh logic nghiệp vụ trong entity; chỉ mapping và helper đơn giản (copyFrom, toDTO).
- Sử dụng `@Entity`, `@Table(name = "table_name")` với tên bảng snake_case.

### Ví dụ Entity

```java
@Entity
@Table(name = "students")
public class Student extends BaseEntity {
    
    @Column(name = "username", nullable = false, unique = true, 
            columnDefinition = "VARCHAR(50) COMMENT 'Username của học sinh'")
    private String username;
    
    @Column(name = "grade", nullable = false,
            columnDefinition = "INT COMMENT 'Lớp học (6 hoặc 7)'")
    private Integer grade;
    
    @Column(name = "date_of_birth",
            columnDefinition = "DATE COMMENT 'Ngày sinh'")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    
    // Getters, setters, constructors
}
```

## Repository

- Mở rộng `JpaRepository<Entity, UUID>` (UUID thay vì Long).
- Query động: dùng @Query JPQL, ưu tiên tham số @Param và kiểm soát null (như `AND(:field IS NULL OR ...)`).
- Không chứa logic nghiệp vụ; chỉ truy xuất dữ liệu.
- Đặt tên method rõ ý: `findBy...`, `existsBy...`, `findFirstBy...`, `getList` cho truy vấn động.

### Ví dụ Repository

```java
@Repository
public interface StudentRepository extends JpaRepository<Student, UUID> {
    
    Optional<Student> findByUsername(String username);
    
    boolean existsByUsername(String username);
    
    @Query("SELECT s FROM Student s WHERE " +
           "(:grade IS NULL OR s.grade = :grade) AND " +
           "(:status IS NULL OR s.status = :status)")
    List<Student> findByFilters(@Param("grade") Integer grade, 
                                @Param("status") AccountStatus status);
    
    @Query("SELECT s FROM Student s WHERE s.createdAt >= :fromDate")
    List<Student> findByCreatedAfter(@Param("fromDate") LocalDateTime fromDate);
}
```

## Naming & migration

- Với bảng mới: sử dụng `snake_case` cho tên cột, không cần prefix.
- Script migration cần tuân thủ comment, kiểu dữ liệu phù hợp; index đặt tên `idx_<table>_<columns>`.
- Sử dụng Flyway migrations với naming convention: `V{version}__{description}.sql`
- Migration files trong `src/main/resources/db/migration/`

### Ví dụ Migration

```sql
-- V1__Create_students_table.sql
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE COMMENT 'Username của học sinh',
    grade INT NOT NULL COMMENT 'Lớp học (6 hoặc 7)',
    date_of_birth DATE COMMENT 'Ngày sinh',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_students_username ON students(username);
CREATE INDEX idx_students_grade ON students(grade);
```

## Pagination & sort

- Dùng `Pageable` và `Page<T>` từ Spring Data cho phân trang.
- Dùng DTO `PageRequest`/`SortRequest` (nếu có) cho phần phân trang/sort; mặc định giá trị trong constant.
- Trả về `PageResponse<T>` hoặc `ResponseObject<PageResponse<T>>` cho paginated results.

### Ví dụ Pagination

```java
@GetMapping("/api/v1/students")
public ResponseEntity<ResponseObject<PageResponse<StudentResponse>>> getStudents(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(required = false) Integer grade) {
    
    Pageable pageable = PageRequest.of(page, size);
    Page<Student> students = studentRepository.findByGrade(grade, pageable);
    
    PageResponse<StudentResponse> pageResponse = PageResponse.from(students, 
        students.map(this::toResponse));
    
    return ResponseEntity.ok(new ResponseObject<>(
        "0000",
        "Operation successful",
        pageResponse
    ));
}
```

## BaseEntity Pattern

Tất cả entities kế thừa `BaseEntity`:

```java
@MappedSuperclass
public abstract class BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "created_by")
    private String createdBy;
    
    @Column(name = "updated_by")
    private String updatedBy;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters, setters
}
```

[↑ Quay lại Overview](overview.md)
