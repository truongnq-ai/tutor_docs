# Mô hình tài khoản tổng thể (Phase 1)
[← Quay lại Overview](README.md)

## Tài khoản chính

```
ParentAccount
└── StudentProfile
```

- **ParentAccount** là tài khoản gốc.
- Mỗi ParentAccount gắn với **1 StudentProfile** trong Phase 1.

## Hồ sơ học sinh dùng thử (Trial)

**StudentTrialProfile**
- `anonymous_id`
- `device_id`
- `trial_started_at`

**Lưu ý:**
- StudentTrialProfile chỉ tồn tại trong thời gian dùng thử
- Sẽ bị xoá hoặc chuyển đổi khi liên kết phụ huynh
- Dữ liệu học tập trong thời gian dùng thử được giữ lại khi liên kết

[← Quay lại Overview](README.md)

