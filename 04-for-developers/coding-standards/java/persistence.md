# Persistence (DB, Entity, Repository)
[← Quay lại Overview](README.md)

## Quy tắc DB schema

- Tên bảng/column dùng `snake_case`.
- Thêm comment cho cột qua `@Column(columnDefinition = " ... COMMENT '...'" )` hoặc comment trong SQL migration để mô tả ý nghĩa.
- Khóa chính dùng UUID (`java.util.UUID`) thay vì auto-increment.
- Sử dụng `@GeneratedValue(strategy = GenerationType.UUID)` cho primary key.

### Quy tắc kiểu dữ liệu cho String columns

**QUAN TRỌNG**: Đối với các cột string được sử dụng trong queries có hàm `LOWER()`, `UPPER()`, `LIKE`, hoặc các string functions khác, **bắt buộc** sử dụng `TEXT` thay vì `VARCHAR` hoặc `CHARACTER VARYING`.

**Lý do**: 
- PostgreSQL có thể gặp lỗi `function lower(bytea) does not exist` nếu cột được lưu dưới dạng `bytea` hoặc có vấn đề type casting
- `TEXT` type đảm bảo type consistency và tương thích tốt với các string functions
- JPA/Hibernate map `String` type sang `TEXT` một cách an toàn

**Quy tắc áp dụng**:
- ✓ **Dùng TEXT**: Các cột string được dùng trong `@Query` với `LIKE`, pattern matching
- ✓ **Có thể dùng VARCHAR**: Các cột string chỉ dùng cho exact match, không dùng string functions
- ✓ **Luôn dùng TEXT**: Các cột string có thể cần search/filter trong tương lai
- ✓ **Match Entity với Database**: Đảm bảo `columnDefinition = "TEXT"` trong Entity match với type trong database schema

**Ví dụ**:

```java
// ✓ ĐÚNG: Dùng TEXT cho cột dùng trong LIKE query
@Column(name = "username", nullable = false, unique = true, columnDefinition = "TEXT")
private String username;

@Column(name = "email", unique = true, columnDefinition = "TEXT")
private String email;

// ✗ SAI: Dùng VARCHAR cho cột dùng trong LIKE query
@Column(name = "username", nullable = false, unique = true, length = 255)
private String username;  // Có thể gây lỗi "function lower(bytea) does not exist"

// ✓ ĐÚNG: Dùng VARCHAR cho cột không dùng string functions
@Column(name = "status", length = 20)
private String status;  // OK vì chỉ dùng exact match
```

### String Normalization Standards

**QUAN TRỌNG**: Các trường string đặc thù cần được normalize (lowercase/uppercase) để đảm bảo consistency và tránh lỗi khi query.

**Quy tắc normalization**:
- **Username**: Luôn lowercase, trim
- **Email**: Luôn lowercase, trim
- **Phone**: Luôn uppercase, trim
- **Name**: Trim only, giữ nguyên case

**Implementation**:
- **Entity Level**: Sử dụng `@PrePersist` và `@PreUpdate` trong Entity cho automatic normalization khi save/update
- **Service Level**: Sử dụng `StringCommon` utility class cho search queries và authentication queries (normalize input trước khi query)

**Ví dụ Entity Normalization**:

```java
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    
    @Column(name = "username", nullable = false, unique = true, columnDefinition = "TEXT")
    private String username;
    
    @Column(name = "email", unique = true, columnDefinition = "TEXT")
    private String email;
    
    @Column(name = "phone_number", length = 20, unique = true)
    private String phoneNumber;
    
    @PrePersist
    @PreUpdate
    protected void normalizeFields() {
        if (this.getId() == null) {
            super.onCreate();
        }
        
        // Username: lowercase
        if (this.username != null) {
            this.username = this.username.trim().toLowerCase();
        }
        
        // Email: lowercase
        if (this.email != null && !this.email.isEmpty()) {
            this.email = this.email.trim().toLowerCase();
        }
        
        // Phone: uppercase
        if (this.phoneNumber != null && !this.phoneNumber.isEmpty()) {
            this.phoneNumber = this.phoneNumber.trim().toUpperCase();
        }
        
        // Name: trim only (giữ nguyên case)
        if (this.name != null) {
            this.name = this.name.trim();
        }
    }
}
```

**Ví dụ Service Level Normalization**:

```java
// Normalize input cho authentication queries
String normalizedUsername = StringCommon.normalizeUsername(username);
Optional<User> user = userRepository.findByUsername(normalizedUsername);
```

### Query Parameter Processing Standards

**QUAN TRỌNG**: Xử lý wildcards và case normalization ở Service Layer, không ở Repository.

**Quy tắc**:
- **Wildcards**: Xử lý ở Service Layer, không ở Repository
- **Case normalization**: Normalize ở Service Layer trước khi query
- **Pattern**: Sử dụng `StringCommon.addLikeRightAndLeft()` và `StringCommon.trimAndLowercase()`
- **Repository**: Nhận parameters đã được normalize và format sẵn (có wildcards `%`)
- **JPQL Query**: Đơn giản, không dùng `LOWER()/UPPER()` trong query, chỉ dùng `LIKE` với parameter đã normalize

**Ví dụ**:

```java
// ✓ ĐÚNG: Service xử lý wildcards và normalization
String searchText = null;
if (!StringCommon.isNullOrBlank(request.searchText())) {
    String normalized = StringCommon.trimAndLowercase(request.searchText());
    searchText = StringCommon.addLikeRightAndLeft(normalized);
}
Page<User> users = userRepository.searchStudents(userType, status, searchText, pageable);

// Repository query đơn giản
@Query("SELECT u FROM User u WHERE u.username LIKE :searchText")

// ✗ SAI: Repository xử lý wildcards hoặc dùng LOWER()
@Query("SELECT u FROM User u WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :search, '%'))")
```

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
            columnDefinition = "TEXT COMMENT 'Username của học sinh'")
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

### Repository Query Best Practices

#### Ưu tiên JPQL thay vì Native SQL
- ✓ **Dùng JPQL**: Type-safe, dễ maintain, tận dụng JPA features
- ✗ **Tránh Native SQL**: Chỉ dùng khi thực sự cần thiết (complex aggregations, database-specific functions)

#### Xử lý LIKE queries với wildcards
- ✓ **Xử lý wildcards ở Service Layer**: Repository chỉ nhận parameter đã được format sẵn
- ✗ **Không dùng CONCAT trong Repository**: Tránh phức tạp hóa query, khó maintain

**Ví dụ**:

```java
// ✓ ĐÚNG: Repository đơn giản
@Query("SELECT s FROM Skill s WHERE " +
       "(:grade IS NULL OR s.grade = :grade) AND " +
       "(:chapter IS NULL OR s.chapter LIKE :chapter) " +
       "ORDER BY s.createdAt DESC")
Page<Skill> searchSkills(
        @Param("grade") Integer grade,
        @Param("chapter") String chapter,  // Đã có % wildcards từ service
        Pageable pageable
);

// ✓ ĐÚNG: Service xử lý wildcards
@Override
public Page<SkillListResponse> listSkills(SkillSearchRequest searchRequest) {
    Pageable pageable = PageRequest.of(
            searchRequest.page() != null ? searchRequest.page() : 0,
            searchRequest.pageSize() != null ? searchRequest.pageSize() : 20
    );

    // Process chapter parameter for LIKE query - add % wildcards in service layer
    String chapterParam = null;
    if (searchRequest.chapter() != null && !searchRequest.chapter().trim().isEmpty()) {
        chapterParam = "%" + searchRequest.chapter().trim() + "%";
    }

    Page<Skill> skills = skillRepository.searchSkills(
            searchRequest.grade(),
            chapterParam,  // Đã xử lý wildcards
            pageable
    );

    return skills.map(this::toSkillListResponse);
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
    username TEXT NOT NULL UNIQUE COMMENT 'Username của học sinh',
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

[← Quay lại Overview](README.md)

