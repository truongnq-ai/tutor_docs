# Kiểm tra chất lượng code & làm sạch
[← Quay lại Overview](overview.md)

## Mục đích

Đảm bảo code không có lỗi compilation, warning, và loại bỏ các import không sử dụng để duy trì chất lượng code và dễ bảo trì.

## Quy trình thực hiện

### Bước 1: Kiểm tra lỗi compilation và Java

- Chạy compiler/linter để phát hiện:
  - Lỗi syntax Java
  - Lỗi compilation (compile errors)
  - Warning từ Java compiler
  - Warning từ IDE (IntelliJ IDEA/VS Code)
- Công cụ kiểm tra:
  - IDE linter (IntelliJ IDEA inspections, VS Code Java extension)
  - `mvn compile` hoặc `mvn clean compile`
  - `mvn checkstyle:check` (nếu có cấu hình checkstyle)
- **Yêu cầu**: Không có lỗi (errors) trước khi tiếp tục.

### Bước 2: Sửa lỗi và warning

- **Ưu tiên sửa**:
  1. Lỗi syntax
  2. Lỗi compilation
  3. Warning nghiêm trọng (unused variables, unreachable code)
  4. Warning khác (deprecated methods, unchecked warnings)
- **Các lỗi thường gặp**:
  - `cannot find symbol`: Import thiếu hoặc class không tồn tại
  - `incompatible types`: Type không khớp
  - `unreachable statement`: Code không bao giờ được thực thi
  - `variable might not have been initialized`: Biến chưa được khởi tạo
  - `method does not override`: Annotation `@Override` sai
- **Nguyên tắc sửa**:
  - Sửa đúng nguyên nhân, không chỉ che lỗi
  - Giữ type safety của Java
  - Tuân thủ coding standards của dự án

### Bước 3: Kiểm tra và xóa unused imports

- **Kiểm tra**:
  - Import không được sử dụng trong file
  - Import chỉ xuất hiện trong khai báo nhưng không được dùng
  - Import static không được sử dụng
- **Cách xác định**:
  - Dùng IDE (IntelliJ IDEA tự động gạch xám unused imports)
  - Tìm kiếm tên class/package trong file
  - Kiểm tra các method và field
- **Xóa**:
  - Xóa import statement không sử dụng
  - Xóa import static không dùng
  - Xóa wildcard import (`import java.util.*;`) nếu không cần
- **Lưu ý**:
  - Không xóa import dùng trong annotation (`@Entity`, `@Service`, `@RestController`, ...)
  - Không xóa import dùng trong type annotation
  - Không xóa import dùng trong generic type (`List<String>`, `Map<String, Object>`)

### Bước 4: Kiểm tra unused code

- **Kiểm tra**:
  - Unused fields/private methods
  - Unused variables trong method
  - Dead code (code không bao giờ được gọi)
- **Xử lý**:
  - Xóa code không sử dụng (nếu chắc chắn)
  - Comment code nếu có thể cần sau này (và thêm TODO)
  - Refactor nếu code bị duplicate

### Bước 5: Xác minh lại

- Sau khi sửa:
  1. Chạy lại `mvn compile`
  2. Đảm bảo không còn lỗi/warning
  3. Đảm bảo không còn unused imports
  4. Kiểm tra code vẫn hoạt động đúng (nếu có thể test nhanh)

## Thứ tự ưu tiên

```
1. Lỗi Syntax (Errors)
   ↓
2. Lỗi Compilation (Compile Errors)
   ↓
3. Warning nghiêm trọng (Critical Warnings)
   ↓
4. Warning khác (Warnings)
   ↓
5. Xóa Unused Imports
   ↓
6. Xóa Unused Code
   ↓
7. Xác minh lại (Verification)
```

## Checklist sau khi chỉnh sửa file

- [ ] Không có lỗi syntax
- [ ] Không có lỗi compilation
- [ ] Không có warning nghiêm trọng
- [ ] Đã xóa tất cả unused imports
- [ ] Đã xóa unused code (nếu có)
- [ ] Code vẫn hoạt động đúng (nếu có thể test)
- [ ] File đã được format đúng chuẩn

## Ví dụ minh họa

### Trước khi sửa:

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Map;  // Unused import
import java.util.HashMap;  // Unused import
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;  // Unused import

@Service
public class StudentService {
    private Map<String, Object> cache; // Warning: unused field
    
    public List<Student> getList() {
        List<Student> students = new ArrayList<>();
        // ... logic
        return students;
    }
    
    // Warning: unused method
    private void unusedMethod() {
        // ...
    }
}
```

### Sau khi sửa:

```java
import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    public List<Student> getList() {
        List<Student> students = new ArrayList<>();
        // ... logic
        return students;
    }
}
```

## Công cụ hỗ trợ

- **IDE**: IntelliJ IDEA inspections, VS Code Java extension
- **Build tools**: `mvn compile`, `mvn clean compile`
- **Linter**: Checkstyle (nếu có cấu hình), SpotBugs
- **Auto-fix**: IntelliJ IDEA có thể tự xóa unused imports (Ctrl+Alt+O / Cmd+Option+O)

## Lưu ý quan trọng

1. **Không bỏ qua warning**: Một số warning có thể dẫn đến lỗi runtime hoặc memory leak
2. **Không xóa import vội**: Kiểm tra kỹ trước khi xóa, đặc biệt với annotation
3. **Test sau khi sửa**: Đảm bảo chức năng vẫn hoạt động
4. **Commit riêng**: Tách commit sửa lỗi và commit xóa unused imports để dễ review
5. **Lombok**: Nếu dùng Lombok, đảm bảo annotation processor được enable

[↑ Quay lại Overview](overview.md)
