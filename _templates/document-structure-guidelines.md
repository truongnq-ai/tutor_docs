# HƯỚNG DẪN CẤU TRÚC VÀ QUẢN LÝ TÀI LIỆU

Tài liệu này mô tả các quy tắc và best practices cho việc tổ chức, cấu trúc và chia nhỏ tài liệu trong dự án Tutor.

## 1. NGUYÊN TẮC CHUNG

### 1.1. Quy tắc chia file

- **Nếu là một logic lớn**: Tạo folder riêng và chia thành nhiều file nhỏ
- **Nếu một file > 1000 dòng**: Bắt buộc phải chia nhỏ
- **Mục tiêu**: Mỗi file không quá 1000 dòng, lý tưởng < 500 dòng
- **Nội dung**: Mỗi file nên tập trung vào một chủ đề cụ thể, dễ đọc và dễ cập nhật

### 1.2. Cấu trúc folder

```
<main-folder>/
├── README.md                    # Overview file (bắt buộc)
├── <topic-1>/
│   ├── README.md               # Overview cho topic này
│   ├── <sub-topic-1>.md
│   ├── <sub-topic-2>.md
│   └── ...
├── <topic-2>/
│   ├── README.md
│   └── ...
└── <standalone-file>.md         # File độc lập nếu không cần folder
```

## 2. QUY TẮC CHIA NHỎ FILE

### 2.1. Khi nào cần chia file?

- File hiện tại > 1000 dòng
- File chứa nhiều chủ đề khác nhau (mỗi chủ đề nên là một file riêng)
- File quá dài gây khó khăn trong việc đọc và cập nhật
- Logic phức tạp cần tách thành các phần riêng biệt

### 2.2. Cách chia file

#### Theo chủ đề (Topic-based)
```
user-stories/
├── README.md
├── student/
│   ├── README.md
│   ├── onboarding.md
│   ├── learning-path.md
│   └── ...
└── parent/
    ├── README.md
    ├── authentication.md
    └── ...
```

#### Theo workflow (Workflow-based)
```
exercise-management/
├── README.md
├── manual-form.md
├── csv-import.md
├── image-upload.md
└── ...
```

#### Theo technical layer (Layer-based)
```
coding-standards/
├── README.md
├── code-structure.md
├── api-client.md
├── database-schema.md
└── ...
```

### 2.3. Quy tắc đặt tên file

- **Sử dụng kebab-case**: `user-stories.md`, `api-specifications.md`
- **Tên file mô tả rõ nội dung**: Tránh tên chung chung như `document.md`
- **Không dùng timestamp trong tên file**: Tránh `user-stories-2025-12-21.md`
- **File overview luôn là `README.md`**: Không dùng `overview.md` hay `index.md`

## 3. README.md OVERVIEW FILE

### 3.1. Mục đích

Mỗi folder phải có `README.md` để:
- Giới thiệu tổng quan về nội dung trong folder
- Cung cấp navigation links đến các file con
- Giải thích cấu trúc và cách sử dụng

### 3.2. Cấu trúc README.md

```markdown
# <Tên Folder>

Tài liệu này mô tả [mục đích của folder này].

## Tổng quan

[Mô tả ngắn gọn về nội dung]

## Cấu trúc tài liệu

### <Nhóm 1>
- [File 1](file-1.md) - Mô tả ngắn
- [File 2](file-2.md) - Mô tả ngắn

### <Nhóm 2>
- [File 3](file-3.md) - Mô tả ngắn

## Tài liệu liên quan

- [Link đến tài liệu khác](../other-folder/README.md)

[← Quay lại Overview](../README.md)
```

## 4. NAVIGATION VÀ LINKS

### 4.1. Quy tắc links

- **Mỗi file phải có link quay lại**: `[← Quay lại Overview](README.md)`
- **Links trong README.md**: Liên kết đến tất cả file con
- **Cross-references**: Liên kết giữa các file liên quan
- **Relative paths**: Luôn dùng relative paths, không dùng absolute paths

### 4.2. Format links

```markdown
# Tiêu đề

[← Quay lại Overview](README.md)

## Nội dung

Xem thêm: [File liên quan](related-file.md)

[← Quay lại Overview](README.md)
```

## 5. CHUẨN HÓA NỘI DUNG

### 5.1. Format nhất quán

- **Header structure**: Sử dụng cấu trúc header nhất quán (H1 cho title, H2 cho sections chính)
- **Code blocks**: Sử dụng syntax highlighting phù hợp
- **Tables**: Format table nhất quán
- **Lists**: Sử dụng checklist `- [ ]` cho tasks, `- ` cho items thông thường

### 5.2. Metadata

Mỗi file nên có metadata ở đầu (tùy chọn, không bắt buộc cho file nhỏ):

```markdown
# <Tên File>

**Project:** Tutor  
**Document type:** <Type>  
**Audience:** <Audience>  
**Status:** Draft | Review | Approved  
**Version:** <YYYY-MM-DD-HH-mm>  
**Author:** <Author>

[← Quay lại Overview](README.md)
```

## 6. QUY TRÌNH TỔ CHỨC LẠI TÀI LIỆU

### 6.1. Bước 1: Phân tích

- Đọc và hiểu cấu trúc nội dung hiện tại
- Xác định các chủ đề/logic lớn cần tách
- Xác định điểm chia hợp lý

### 6.2. Bước 2: Tạo cấu trúc folder

- Tạo folder mới theo logic đã xác định
- Tạo `README.md` overview cho mỗi folder

### 6.3. Bước 3: Chia file

- Chia file lớn thành các file nhỏ theo chủ đề
- Đảm bảo mỗi file < 1000 dòng
- Giữ nguyên nội dung, chỉ tổ chức lại

### 6.4. Bước 4: Tạo overview files

- Tạo `README.md` cho mỗi folder với links đến file con
- Cập nhật `README.md` ở level cao hơn

### 6.5. Bước 5: Cập nhật cross-references

- Cập nhật tất cả links trong các file
- Cập nhật links trong `README.md` chính
- Kiểm tra tất cả links hoạt động

### 6.6. Bước 6: Backup files cũ

- Di chuyển file cũ vào `_archive/old-versions/`
- Giữ lại để tham khảo

### 6.7. Bước 7: Verify

- Kiểm tra tất cả file < 1000 dòng
- Kiểm tra tất cả links hoạt động
- Kiểm tra không có lỗi lint

## 7. VÍ DỤ THỰC TẾ

### 7.1. Coding Standards

**Trước:**
```
coding-standards/
├── java-standards.md (1068 dòng)
├── python-standards.md (776 dòng)
├── nextjs-standards.md (1047 dòng)
└── flutter-standards.md (828 dòng)
```

**Sau:**
```
coding-standards/
├── README.md
├── java/
│   ├── README.md
│   ├── code-structure.md (62 dòng)
│   ├── api-design.md (151 dòng)
│   ├── exception-handling.md (69 dòng)
│   └── ...
├── python/
│   ├── README.md
│   └── ...
└── ...
```

### 7.2. User Stories

**Trước:**
```
user-stories.md (329 dòng)
```

**Sau:**
```
user-stories/
├── README.md
├── student/
│   ├── README.md
│   ├── onboarding.md (16 dòng)
│   ├── learning-path.md (17 dòng)
│   └── ...
├── parent/
│   ├── README.md
│   └── ...
└── admin/
    ├── README.md
    └── ...
```

## 8. BEST PRACTICES

### 8.1. Tổ chức

- ✅ Mỗi file tập trung vào một chủ đề cụ thể
- ✅ Folder structure phản ánh logic nghiệp vụ
- ✅ README.md ở mọi level để dễ navigate
- ✅ Links rõ ràng giữa các file liên quan

### 8.2. Nội dung

- ✅ Nội dung ngắn gọn, dễ hiểu
- ✅ Format nhất quán trong toàn bộ tài liệu
- ✅ Code examples rõ ràng với syntax highlighting
- ✅ Tables và lists được format đúng

### 8.3. Maintenance

- ✅ Backup files cũ vào archive
- ✅ Cập nhật cross-references khi thay đổi
- ✅ Verify structure định kỳ
- ✅ Giữ file < 1000 dòng

## 9. TÀI LIỆU LIÊN QUAN

- [Document Template](./DOCUMENT_TEMPLATE.md)
- [PRD Template](./prd_template.md)
- [Q&A Guidelines](./qna_guidelines.md)

---

**Lưu ý**: Tài liệu này được cập nhật dựa trên thực tế tổ chức lại tài liệu trong dự án Tutor. Có thể bổ sung thêm quy tắc khi phát sinh nhu cầu.

