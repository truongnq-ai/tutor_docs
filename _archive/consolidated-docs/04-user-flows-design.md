
================================================================================
# File: 03-for-product-owners/user-flows/README.md
================================================================================

# USER ONBOARDING FLOWS

Tài liệu này mô tả các luồng onboarding người dùng trong Phase 1 (MVP), tập trung vào:
- Hành vi tiếp cận ứng dụng của học sinh và phụ huynh
- Cách tạo và liên kết tài khoản học sinh – phụ huynh
- Các quyết định thiết kế ảnh hưởng đến UX, backend và dữ liệu

## Mục đích

Tài liệu này được sử dụng làm cơ sở cho:
- Thiết kế UI/UX onboarding
- Thiết kế API (authentication, account linking)
- Thiết kế database liên quan đến user

## Cấu trúc tài liệu

### Nguyên tắc thiết kế
- [Nguyên tắc thiết kế onboarding](design-principles.md)

### Mô hình tài khoản
- [Mô hình tài khoản tổng thể](account-model.md)

### Luồng onboarding
- [Luồng học sinh tiếp cận trước (Student-first)](student-first-flow.md)
- [Luồng phụ huynh tiếp cận trước (Parent-first)](parent-first-flow.md)
- [Luồng liên kết tài khoản](linking-flow.md)
- [Luồng OAuth login với cập nhật số điện thoại](oauth-flow.md)

### Trạng thái người dùng
- [Trạng thái người dùng (Phase 1)](user-statuses.md)

### Quyết định thiết kế
- [Các quyết định thiết kế quan trọng](design-decisions.md)

## Tài liệu liên quan

- [User Stories](../user-stories/README.md)
- [PRD MVP](../prd/prd_mvp_phase_1-2025-12-14-22-15.md)

## Lịch sử thay đổi

- 2025-12-14-23-40: Tạo mới tài liệu
- 2025-12-15-XX-XX: Cập nhật linking flow từ email sang số điện thoại + OTP, thêm OAuth login flow với phone verification, xác nhận linking 1 chiều

---

← Quay lại: [Tài liệu tổng quan](../../README.md)



================================================================================
# End of: 03-for-product-owners/user-flows/README.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-flows/account-model.md
================================================================================

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



================================================================================
# End of: 03-for-product-owners/user-flows/account-model.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-flows/design-principles.md
================================================================================

# Nguyên tắc thiết kế onboarding
[← Quay lại Overview](README.md)

## Nguyên tắc

1. **Học sinh có thể sử dụng ứng dụng trước mà không cần đăng ký phụ huynh ngay.**
   - Học sinh có thể bắt đầu học ngay với StudentTrialProfile
   - Không bắt buộc phải có tài khoản phụ huynh ngay từ đầu

2. **Phụ huynh là chủ tài khoản cuối cùng và có toàn quyền giám sát.**
   - ParentAccount là tài khoản gốc
   - Phụ huynh có quyền xem và quản lý dữ liệu học tập của con

3. **Không tồn tại lâu dài hồ sơ học sinh không liên kết phụ huynh.**
   - StudentTrialProfile chỉ tồn tại trong thời gian dùng thử
   - Phải liên kết với phụ huynh để tiếp tục sử dụng

4. **Quy trình onboarding phải ngắn gọn, ít bước, phù hợp hành vi tự nhiên.**
   - Tối thiểu hóa số bước đăng ký
   - UX đơn giản, dễ hiểu

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-flows/design-principles.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-flows/design-decisions.md
================================================================================

# Các quyết định thiết kế quan trọng
[← Quay lại Overview](README.md)

## Quyết định thiết kế

1. **Không cho phép học sinh tạo tài khoản vĩnh viễn độc lập.**
   - Học sinh phải liên kết với phụ huynh để tiếp tục sử dụng

2. **Không bắt buộc phụ huynh đăng ký ngay khi học sinh bắt đầu dùng app.**
   - Học sinh có thể dùng thử trước
   - Phụ huynh đăng ký sau khi học sinh gặp paywall

3. **Luôn hỗ trợ khả năng chuyển đổi từ trial sang tài khoản chính thức.**
   - Dữ liệu học tập trong thời gian dùng thử được giữ lại
   - StudentTrialProfile được chuyển thành StudentProfile

4. **Số điện thoại là username cho đăng nhập phụ huynh.**
   - Đơn giản hóa quy trình đăng nhập
   - Dễ nhớ cho người dùng

5. **Liên kết 1 chiều: Chỉ học sinh có thể liên kết đến phụ huynh bằng số điện thoại (Phase 1).**
   - Phụ huynh không có chức năng tìm kiếm học sinh
   - Đảm bảo quyền riêng tư

6. **OAuth bắt buộc phone verification: Phụ huynh đăng nhập OAuth phải cập nhật và verify số điện thoại trước khi vào dashboard.**
   - Đảm bảo học sinh có thể liên kết bằng số điện thoại
   - Bảo mật tài khoản

7. **Email optional: Email không bắt buộc trong đăng ký.**
   - Giảm rào cản đăng ký
   - Số điện thoại là thông tin chính

8. **Chuẩn bị Phase 2: Học sinh có credential riêng (username/password, đặt ngay sau OAuth), hỗ trợ đăng nhập trên thiết bị chia sẻ; Phase 1 vẫn 1:1 nhưng kiến trúc login đã sẵn cho 1:N.**
   - Kiến trúc sẵn sàng cho mở rộng
   - Mỗi học sinh có credential riêng

9. **Validation backend 1:1: Trong Phase 1, backend cần chặn tạo >1 StudentProfile cho mỗi phụ huynh dù DB cho phép 1:N, tránh sai logic cho đến khi Phase 2 sẵn sàng.**
   - Đảm bảo logic Phase 1 đúng
   - Tránh lỗi khi chuyển sang Phase 2

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-flows/design-decisions.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-flows/oauth-flow.md
================================================================================

# Luồng OAuth login với cập nhật số điện thoại
[← Quay lại Overview](README.md)

## Bối cảnh

- Phụ huynh đăng nhập bằng Google hoặc Apple
- Hệ thống cần số điện thoại đã verified để học sinh có thể liên kết

## Luồng chi tiết

```
Phụ huynh click "Đăng nhập bằng Google/Apple"
→ OAuth authentication
→ Hệ thống kiểm tra tài khoản (theo oauth_id)
→ Nếu chưa có → Tạo ParentAccount (oauth_provider, oauth_id, email, name, phone_verified: false)
→ Nếu đã có → Lấy ParentAccount
→ Kiểm tra phone_verified
```

### Nếu phone_verified = false:
```
→ Redirect đến màn hình "Cập nhật số điện thoại"
→ Nhập số điện thoại
→ Gửi OTP
→ Nhập OTP
→ Xác thực OTP
→ Cập nhật phone_number và phone_verified = true
→ Redirect đến dashboard
```

### Nếu phone_verified = true:
```
→ Redirect đến dashboard bình thường
```

## Lưu ý

- **Bắt buộc**: Phụ huynh phải có số điện thoại đã verified mới được vào dashboard
- **Lý do**: Để học sinh có thể liên kết bằng số điện thoại
- **Không cho vào dashboard**: Nếu phone_verified = false, không cho truy cập dashboard

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-flows/oauth-flow.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-flows/linking-flow.md
================================================================================

# Luồng liên kết tài khoản
[← Quay lại Overview](README.md)

## Luồng liên kết bằng số điện thoại (Student-first)

### Bước 1: Học sinh nhập số điện thoại
- Học sinh nhập số điện thoại phụ huynh
- Hệ thống validate format số điện thoại
- Kiểm tra rate limit (tối đa 3 lần/ngày)
- Verify reCaptcha

### Bước 2: Gửi OTP
- Hệ thống kiểm tra phụ huynh đã có tài khoản chưa (theo phone_number)
- Gửi OTP qua Firebase Auth → SMS
- Lưu OTP session vào database (expires 5 phút)

### Bước 3: Xác thực OTP
- Học sinh nhập OTP (hỏi phụ huynh lấy OTP)
- Hệ thống verify OTP với Firebase
- Nếu đúng:
  - Nếu phụ huynh đã có tài khoản: Liên kết StudentTrialProfile → StudentProfile
  - Nếu phụ huynh chưa có: Tạo ParentAccount (status: pending_activation, phone_verified: true) → Tạo StudentProfile → Liên kết
  - Merge dữ liệu học tập từ trial
  - Gửi SMS kích hoạt dashboard (nếu tài khoản mới)
  - Hiển thị thông tin đăng nhập cho phụ huynh

### Bước 4: Kích hoạt dashboard (nếu tài khoản mới)
- Phụ huynh nhận SMS với link kích hoạt
- Click link → Đặt mật khẩu → Status = 'active'
- Có thể đăng nhập dashboard

## Luồng liên kết bằng Link Token (Parent-first)

**Điều kiện liên kết hợp lệ:**
- LinkToken tồn tại và hợp lệ
- Chưa hết hạn
- Chưa được sử dụng trước đó

**Sau khi liên kết thành công:**
- StudentTrialProfile được chuyển thành StudentProfile
- Dữ liệu học tập trong thời gian dùng thử được giữ lại
- Học sinh được cấp quyền sử dụng đầy đủ

## Quy tắc liên kết (Phase 1)

- **Liên kết 1 chiều**: Chỉ học sinh có thể liên kết đến phụ huynh bằng số điện thoại
- **Phụ huynh không thể tìm học sinh**: Phụ huynh không có chức năng tìm kiếm học sinh trong Phase 1
- **Parent-first flow**: Vẫn giữ nguyên flow dùng Link Token (không thay đổi)

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-flows/linking-flow.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-flows/parent-first-flow.md
================================================================================

# Luồng phụ huynh tiếp cận trước (Parent-first)
[← Quay lại Overview](README.md)

## Bối cảnh

- Phụ huynh thấy quảng cáo hoặc tìm kiếm thông tin trên web.
- Phụ huynh truy cập web dashboard của Tutor.

## Luồng chi tiết

```
Phụ huynh truy cập website
→ Xem giới thiệu sản phẩm
→ Đăng ký ParentAccount (Tên, Số điện thoại, Password, Email optional)
→ Xác thực số điện thoại bằng OTP
→ Tạo StudentProfile
→ Nhận mã liên kết hoặc QR
→ Gửi mã cho học sinh
→ Học sinh nhập mã trong ứng dụng
```

## Lưu ý

- Số điện thoại là username cho đăng nhập
- Email là optional (không bắt buộc)
- Bắt buộc xác thực số điện thoại bằng OTP trong quá trình đăng ký

## Trạng thái StudentProfile

| Trạng thái | Mô tả |
|-----------|------|
| Pending | Hồ sơ đã tạo nhưng chưa liên kết thiết bị |
| Linked | Hồ sơ đã liên kết thành công với ứng dụng |

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-flows/parent-first-flow.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-flows/student-first-flow.md
================================================================================

# Luồng học sinh tiếp cận trước (Student-first)
[← Quay lại Overview](README.md)

## Bối cảnh

- Học sinh thấy quảng cáo hoặc được giới thiệu từ bạn bè.
- Học sinh tải ứng dụng trên thiết bị cá nhân.

## Luồng chi tiết

```
Mở ứng dụng lần đầu
→ Màn hình giới thiệu
→ Chọn "Dùng thử ngay" (hoặc Login/Signup bằng Google/Apple/Manual)
→ Tạo StudentTrialProfile
→ Chọn lớp (6 hoặc 7)
→ Bắt đầu học với quyền hạn giới hạn
→ Gặp paywall
→ Yêu cầu liên kết phụ huynh
```

## Quyền hạn của StudentTrialProfile

### Được phép:
- Giải bài Toán với số lượng giới hạn
- Học theo lộ trình trong 1–2 ngày
- Luyện tập các bài cơ bản

### Không được phép:
- Xem báo cáo học tập dài hạn
- Lưu tiến độ học vĩnh viễn
- Sử dụng ứng dụng không giới hạn

## Paywall và yêu cầu liên kết phụ huynh

Paywall được hiển thị khi:
- Hết số lượt sử dụng miễn phí
- Hoặc hết thời gian dùng thử

Thông điệp hiển thị yêu cầu học sinh nhờ phụ huynh xác nhận tài khoản.

## Cách liên kết phụ huynh

Học sinh có thể:
- Nhập số điện thoại phụ huynh
- Gửi OTP xác thực
- Nhập OTP để liên kết

**Luồng chi tiết:**
1. Học sinh nhập số điện thoại phụ huynh
2. Hệ thống kiểm tra phụ huynh đã có tài khoản chưa
3. Gửi OTP qua SMS (qua Firebase Auth)
4. Học sinh nhập OTP (hỏi phụ huynh lấy OTP)
5. Xác thực OTP thành công
6. Nếu phụ huynh chưa có tài khoản → Tự động tạo tài khoản
7. Liên kết StudentTrialProfile → StudentProfile
8. Hiển thị thông tin đăng nhập (username: số điện thoại, password: số điện thoại) và link dashboard

**Lưu ý:**
- Rate limiting: Tối đa 3 lần gửi OTP/ngày/số điện thoại
- reCaptcha bắt buộc khi gửi OTP
- OTP có thời hạn 5 phút

## Đăng nhập / Đăng ký học sinh (Phase 1) – chuẩn bị cho Phase 2

### Phương thức:
- Google OAuth
- Apple OAuth
- Manual: Họ và tên / username / password

### Quy tắc:
- Sau khi login/signup bằng Google/Apple: **bắt buộc đặt username/password ngay** (username dùng để đăng nhập thủ công; mật khẩu để hỗ trợ đăng nhập trên thiết bị khác/đa hồ sơ ở Phase 2).
- Quy tắc username (manual): chuỗi chữ + số (alphanumeric), không phân biệt hoa/thường.
- Phase 1 giữ 1:1 (mỗi phụ huynh một học sinh), nhưng cần chuẩn bị cho Phase 2 (1:N) bằng việc đảm bảo mỗi học sinh có credential riêng (username/password) để đăng nhập đúng hồ sơ trên thiết bị chia sẻ.
- Cho phép đa thiết bị cho học sinh (hạn chế thiết bị sẽ xem xét sau Phase 3).

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-flows/student-first-flow.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-flows/user-statuses.md
================================================================================

# Trạng thái người dùng (Phase 1)
[← Quay lại Overview](README.md)

## Học sinh

| Trạng thái | Mô tả |
|-----------|------|
| Trial | Đang sử dụng ở chế độ dùng thử |
| Linked | Đã liên kết với phụ huynh |

## Phụ huynh

| Trạng thái | Mô tả |
|-----------|------|
| pending_activation | Tài khoản được tạo tự động (từ học sinh), chưa kích hoạt dashboard |
| inactive | Đã tạo tài khoản nhưng chưa liên kết học sinh |
| active | Có học sinh đã liên kết và đã kích hoạt dashboard |

## Trạng thái số điện thoại

| Trạng thái | Mô tả |
|-----------|------|
| phone_verified = false | Số điện thoại chưa được xác thực (sau OAuth) |
| phone_verified = true | Số điện thoại đã được xác thực bằng OTP |

[← Quay lại Overview](README.md)



================================================================================
# End of: 03-for-product-owners/user-flows/user-statuses.md
================================================================================
