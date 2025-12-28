# Mô hình tài khoản tổng thể (Phase 1)
[← Quay lại Overview](README.md)

## Tài khoản chính

```
ParentAccount
└── StudentProfile
```

- **ParentAccount** là tài khoản gốc.
- Mỗi ParentAccount gắn với **1 StudentProfile** trong Phase 1.
- StudentProfile có thể được tạo độc lập (student-first flow) và sau đó liên kết với ParentAccount.

## Trạng thái tài khoản

**StudentProfile**
- Có thể hoạt động độc lập (chưa liên kết với phụ huynh)
- Khi liên kết với ParentAccount, phụ huynh có thể theo dõi tiến độ học tập

**ParentAccount**
- Status: `pending_activation`, `inactive`, `active`
- Khi `active`: Có thể đăng nhập dashboard và xem tiến độ học sinh

[← Quay lại Overview](README.md)

