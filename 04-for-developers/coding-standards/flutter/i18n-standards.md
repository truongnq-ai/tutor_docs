# Tiêu chuẩn Đa ngôn ngữ (i18n) - Flutter Student App

Tài liệu này mô tả các quy tắc và tiêu chuẩn cho việc triển khai đa ngôn ngữ trong Flutter Student App.

## 1. Phạm vi áp dụng đa ngôn ngữ (Scope)

Áp dụng bắt buộc cho toàn bộ nội dung có thể "fix cứng" trên giao diện, bao gồm:

- **Label, button, title, subtitle** - Tất cả nhãn, nút bấm, tiêu đề
- **Placeholder, hint, helper text** - Văn bản gợi ý trong form
- **Message hệ thống** - Success, error, warning, empty state messages
- **Dialog, modal, bottom sheet** - Tất cả nội dung trong popup
- **Tooltip, onboarding text** - Văn bản hướng dẫn
- **Text trong tab bar, menu, item list** - Navigation và menu items

**Không hardcode bất kỳ text nào trực tiếp trong UI code** (kể cả text ngắn như "OK", "Huỷ").

## 2. Ngôn ngữ được hỗ trợ (Language Policy)

Chỉ hỗ trợ 2 ngôn ngữ:

- **vi** – Tiếng Việt (mặc định)
- **en** – English

Không chuẩn bị sẵn cấu trúc cho ngôn ngữ thứ 3 (để tránh over-engineering).

Tất cả logic i18n phải giả định hệ thống chỉ có 2 locale này.

## 3. Nguyên tắc thiết kế key ngôn ngữ (Translation Keys)

### 3.1. Sử dụng semantic keys

Sử dụng key dạng semantic (theo ý nghĩa), **KHÔNG** dùng key theo nội dung hiển thị.

**Tốt:**
```json
"auth.login.button": "Đăng nhập"
"auth.forgot_password.link": "Quên mật khẩu?"
```

**Tránh:**
```json
"button.login_now": "Đăng nhập"
"link.forgot": "Quên mật khẩu?"
```

### 3.2. Quy ước phân cấp key

Key phải được tổ chức theo domain/chức năng, sử dụng dấu chấm (`.`) để phân cấp:

**Cấu trúc:**
```
<domain>.<feature>.<element>
```

**Ví dụ:**
- `auth.login.title` - Tiêu đề màn hình đăng nhập
- `auth.login.phone_placeholder` - Placeholder cho trường số điện thoại
- `auth.forgot_password.button` - Nút trong màn hình quên mật khẩu
- `validation.email.invalid` - Thông báo lỗi email không hợp lệ
- `error.network.timeout` - Thông báo lỗi timeout
- `common.button.ok` - Nút OK dùng chung
- `common.button.cancel` - Nút Huỷ dùng chung

### 3.3. Các domain chính

- **`auth.*`** - Authentication (login, signup, forgot password, OAuth)
- **`validation.*`** - Validation messages
- **`common.*`** - Common UI elements (buttons, labels, actions)
- **`error.*`** - Error messages
- **`navigation.*`** - Navigation labels (home, profile)
- **`onboarding.*`** - Onboarding screens
- **`practice.*`** - Practice/learning screens
- **`language.*`** - Language switcher

### 3.4. Tính ổn định của key

Key phải ổn định lâu dài, cho phép thay đổi text mà không đổi key.

**Ví dụ:**
```json
"auth.login.button": "Đăng nhập"
```

Có thể thay đổi text thành "Đăng nhập ngay" mà không cần đổi key.

## 4. Tổ chức file ngôn ngữ

### 4.1. Cấu trúc file

Mỗi ngôn ngữ có 1 file ARB riêng:

- `intl_vi.arb` - Tiếng Việt
- `intl_en.arb` - English

**Location:** `lib/src/core/localization/`

### 4.2. Yêu cầu đồng bộ

Cấu trúc file giữa các ngôn ngữ phải giống nhau 100% (same keys).

**Không cho phép:**
- Thiếu key ở 1 ngôn ngữ
- Key dư chỉ tồn tại ở 1 file

### 4.3. Placeholder cho dynamic content

Sử dụng placeholder cho nội dung động:

```json
"practice.question.counter": "Câu {current}/{total}",
"@practice.question.counter": {
    "description": "Question counter with current and total",
    "placeholders": {
        "current": {
            "type": "int",
            "example": "1"
        },
        "total": {
            "type": "int",
            "example": "10"
        }
    }
}
```

**Sử dụng trong code:**
```dart
Text(context.locale.practiceQuestionCounter(1, 10))
```

## 5. Quy tắc fallback & an toàn hiển thị

### 5.1. Ngôn ngữ mặc định

Ngôn ngữ mặc định: **Tiếng Việt (vi)**

### 5.2. Fallback logic

Nếu:
- Không tìm thấy key ở **en** → fallback sang **vi**
- Không tìm thấy key ở cả hai → hiển thị key + log lỗi

### 5.3. An toàn hiển thị

Tuyệt đối không để UI hiển thị text rỗng. Luôn có fallback value.

## 6. Quy tắc coding & review

### 6.1. UI layer chỉ được gọi key

UI layer chỉ được gọi key, không được xử lý text.

**Tốt:**
```dart
Text(context.locale.authLoginButton)
```

**Tránh:**
```dart
Text("Đăng nhập")  // Hardcode
```

### 6.2. Không concat string

Không concat string để tạo câu hoàn chỉnh trong code.

**Tránh:**
```dart
Text("Bạn đã làm đúng " + count + " bài")
```

**Chuẩn:**
```json
"practice.result.correct_count": "Bạn đã làm đúng {count} bài"
```

```dart
Text(context.locale.practiceResultCorrectCount(count))
```

### 6.3. Code review checklist

Bắt buộc check i18n trong:

- **Code review** - Reviewer phải kiểm tra không có hardcode text
- **PR checklist** - Thêm mục "Đã kiểm tra i18n"

### 6.4. PR thêm màn hình mới

PR thêm màn hình mới:

- Phải kèm update `intl_vi.arb` và `intl_en.arb`
- Tất cả text trong màn hình phải dùng i18n keys

## 7. Quy tắc viết nội dung (Content Guideline)

### 7.1. Tiếng Việt

- Ngắn gọn, rõ ràng, phù hợp học sinh cấp 2
- Tránh từ chuyên môn nặng nề nếu không cần thiết
- Sử dụng ngôn ngữ thân thiện, dễ hiểu

**Ví dụ:**
- ✅ "Đăng nhập" (thay vì "Xác thực người dùng")
- ✅ "Bắt đầu học" (thay vì "Khởi tạo phiên học tập")

### 7.2. Tiếng Anh

- Dùng English đơn giản, trung tính
- Không dùng slang, không dùng idiom
- Phù hợp với học sinh cấp 2

**Ví dụ:**
- ✅ "Sign in" (thay vì "Log in" - có thể gây nhầm lẫn)
- ✅ "Start learning" (thay vì "Commence your learning journey")

### 7.3. Dịch không word-by-word

Hai ngôn ngữ không bắt buộc dịch word-by-word, chỉ cần đúng ý nghĩa.

**Ví dụ:**
- Vi: "Bạn chưa có bài luyện tập nào"
- En: "No practice sessions yet" (không cần dịch word-by-word)

## 8. Dữ liệu động & backend

### 8.1. Text từ backend

Text sinh từ backend:

- Phải trả về code / enum, không trả về text fix cứng
- Mapping text hiển thị thực hiện ở frontend

**Ví dụ:**

Backend trả về:
```json
{
  "status": "weak",
  "level": 3
}
```

Frontend mapping:
```dart
String getSkillStatusText(String status) {
  return switch (status) {
    'weak' => context.locale.skillStatusWeak,
    'medium' => context.locale.skillStatusMedium,
    'strong' => context.locale.skillStatusStrong,
    _ => status,
  };
}
```

### 8.2. Không cho phép backend trả về text

Không cho phép backend trả về:

- Thông báo lỗi bằng tiếng Việt/Anh trực tiếp
- Text UI fix cứng

**Exception duy nhất:**

Nội dung học (bài toán, lời giải) – được coi là content, không phải UI text.

## 9. Lựa chọn ngôn ngữ & lưu trạng thái

### 9.1. Xác định ngôn ngữ

Ngôn ngữ được xác định theo thứ tự:

1. Người dùng chọn thủ công (nếu có)
2. Ngôn ngữ hệ điều hành
3. Fallback về **vi**

### 9.2. Lưu trạng thái

Lưu lựa chọn ngôn ngữ:

- **Local storage / secure storage**
- Key: `language` (value: `vi` hoặc `en`)

### 9.3. Không tự động thay đổi

Không thay đổi ngôn ngữ tự động trong quá trình sử dụng.

## 10. Mục tiêu của tiêu chuẩn này

### 10.1. Đảm bảo

- ✅ UI nhất quán
- ✅ Dễ mở rộng nội dung
- ✅ Dễ làm việc với giáo viên / PM / dev
- ✅ Dễ bảo trì và cập nhật

### 10.2. Tránh

- ❌ Hardcode tràn lan
- ❌ Dịch thiếu, dịch lệch
- ❌ Chi phí sửa UI cao về sau
- ❌ Inconsistency giữa các màn hình

## 11. Ví dụ thực tế

### 11.1. Tạo key mới

**Bước 1:** Thêm vào `intl_vi.arb`:
```json
"practice.question.title": "Câu hỏi",
"practice.question.counter": "Câu {current}/{total}",
"@practice.question.counter": {
    "description": "Question counter",
    "placeholders": {
        "current": {"type": "int", "example": "1"},
        "total": {"type": "int", "example": "10"}
    }
}
```

**Bước 2:** Thêm vào `intl_en.arb`:
```json
"practice.question.title": "Question",
"practice.question.counter": "Question {current}/{total}",
"@practice.question.counter": {
    "description": "Question counter",
    "placeholders": {
        "current": {"type": "int", "example": "1"},
        "total": {"type": "int", "example": "10"}
    }
}
```

**Bước 3:** Chạy code generation:
```bash
flutter gen-l10n
```

**Bước 4:** Sử dụng trong code:
```dart
Text(context.locale.practiceQuestionTitle)
Text(context.locale.practiceQuestionCounter(1, 10))
```

### 11.2. Refactor hardcode text

**Trước:**
```dart
Text('Câu ${questionNumber}/${totalQuestions}')
```

**Sau:**
```dart
Text(context.locale.practiceQuestionCounter(questionNumber, totalQuestions))
```

## 12. Checklist cho Developer

Khi thêm màn hình/feature mới:

- [ ] Tất cả text đã được chuyển thành i18n keys
- [ ] Đã thêm keys vào cả `intl_vi.arb` và `intl_en.arb`
- [ ] Keys sử dụng semantic naming (domain.feature.element)
- [ ] Đã chạy `flutter gen-l10n` sau khi thêm keys
- [ ] Đã test với cả 2 ngôn ngữ (vi và en)
- [ ] Không có hardcode text trong code
- [ ] Dynamic content sử dụng placeholder trong i18n

## 13. Tài liệu tham khảo

- [Flutter Internationalization](https://docs.flutter.dev/development/accessibility-and-localization/internationalization)
- [ARB Format Specification](https://github.com/google/app-resource-bundle)

