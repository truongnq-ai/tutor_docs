# API & DATABASE MAPPING – PHASE 1 (MVP)

Project: Tutor  
Document type: Technical Design  
Audience: Backend / Fullstack Developer  
Status: Draft  
Version: 2025-12-15-00-20  
Author: Product Consultant (ChatGPT)

---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này ánh xạ (mapping) các tài liệu sau sang:
- API cần triển khai
- Database schema cần thiết cho Phase 1 (MVP)

Các tài liệu đầu vào:
- PRD MVP Phase 1
- Student User Stories Phase 1
- Parent User Stories Phase 1
- User Onboarding Flow Phase 1

Tài liệu này là cơ sở để:
- Thiết kế backend service
- Thiết kế database
- Triển khai API theo feature

---


## 2. ENTITY CỐT LÕI (DATABASE LEVEL)

### 2.1. ParentAccount
| Field | Type | Note |
|-----|------|------|
| id | UUID | Primary key |
| name | String | Bắt buộc |
| phone_number | String | Unique, là username |
| phone_verified | Boolean | Default false |
| email | String | Optional, unique nếu có |
| password_hash | String | Nullable nếu OAuth |
| oauth_provider | String | google/apple/null |
| oauth_id | String | Unique khi có oauth_provider |
| status | Enum | active / inactive / pending_activation |
| created_at | Timestamp | |

---

### 2.2. StudentProfile
| Field | Type | Note |
|-----|------|------|
| id | UUID | Primary key |
| parent_id | UUID | FK → ParentAccount |
| grade | Int | 6 hoặc 7 |
| status | Enum | pending / linked |
| created_at | Timestamp | |

---

### 2.3. StudentTrialProfile
| Field | Type | Note |
|-----|------|------|
| id | UUID | Primary key |
| anonymous_id | String | Device-based |
| device_id | String | |
| grade | Int | |
| trial_started_at | Timestamp | |
| expires_at | Timestamp | |

---

### 2.4. LinkToken
| Field | Type | Note |
|-----|------|------|
| id | UUID | Primary key |
| token | String | Unique |
| student_id | UUID | Nullable |
| trial_id | UUID | Nullable |
| expires_at | Timestamp | |
| used_at | Timestamp | Nullable |

---

### 2.5. Skill
| Field | Type | Note |
|-----|------|------|
| id | UUID | |
| grade | Int | |
| name | String | |
| prerequisite_ids | JSON | |

---

### 2.6. Practice
| Field | Type | Note |
|-----|------|------|
| id | UUID | |
| student_id | UUID | |
| skill_id | UUID | |
| is_correct | Boolean | |
| duration_sec | Int | |
| created_at | Timestamp | |

---

### 2.7. MiniTestResult
| Field | Type | Note |
|-----|------|------|
| id | UUID | |
| student_id | UUID | |
| score | Int | % |
| details | JSON | Skill-level |
| created_at | Timestamp | |

### 2.8. OtpSession
| Field | Type | Note |
|-----|------|------|
| id | UUID | Primary key |
| phone_number | String | |
| trial_id | UUID | Nullable, FK → StudentTrialProfile |
| parent_id | UUID | Nullable, FK → ParentAccount |
| otp_code | String | 6 digits |
| expires_at | Timestamp | |
| verified_at | Timestamp | Nullable |
| created_at | Timestamp | |

### 2.9. RefreshToken
| Field | Type | Note |
|-----|------|------|
| id | UUID | Primary key |
| user_id | UUID | FK → users |
| token_hash | String | SHA-256 hash của refresh token (UNIQUE) |
| expires_at | Timestamp | Hết hạn sau 30 ngày |
| revoked_at | Timestamp | Nullable, set khi revoke |
| created_at | Timestamp | |
| last_used_at | Timestamp | Nullable, track last usage |

**Lưu ý:**
- Hỗ trợ multi-device: Mỗi user có thể có nhiều refresh tokens
- Token được hash bằng SHA-256 trước khi lưu DB
- Refresh token rotation: Mỗi lần refresh tạo token mới, revoke token cũ

---


## 3. API MAPPING – STUDENT APP

### 3.1. Onboarding & Trial

| API | Method | Mô tả |
|----|-------|------|
| /api/student/trial/start | POST | Tạo StudentTrialProfile |
| /api/student/trial/status | GET | Kiểm tra trạng thái trial |

---

### 3.2. Tutor Mode (Giải bài)

| API | Method | Mô tả |
|----|-------|------|
| /api/tutor/solve/image | POST | Giải bài bằng ảnh |
| /api/tutor/solve/text | POST | Giải bài bằng text |

---

### 3.3. Learning & Practice

| API | Method | Mô tả |
|----|-------|------|
| /api/learning/today | GET | Lộ trình hôm nay |
| /api/practice/submit | POST | Nộp bài luyện |
| /api/practice/history | GET | Lịch sử luyện tập |

---

### 3.4. Mini Test

| API | Method | Mô tả |
|----|-------|------|
| /api/minitest/start | POST | Bắt đầu mini test |
| /api/minitest/submit | POST | Nộp mini test |

---

### 3.5. Linking Parent

| API | Method | Mô tả |
|----|-------|------|
| /api/link/request-otp | POST | Gửi OTP để liên kết bằng số điện thoại |
| /api/link/verify-otp | POST | Xác thực OTP và liên kết |
| /api/link/confirm | POST | Xác nhận liên kết bằng LinkToken (parent-first) |

---


## 4. API MAPPING – PARENT DASHBOARD

### 4.1. Authentication

| API | Method | Mô tả |
|----|-------|------|
| /api/parent/register | POST | Đăng ký phụ huynh (name, phone, password, email optional) |
| /api/parent/login | POST | Đăng nhập bằng số điện thoại + password |
| /api/parent/oauth/login | POST | Đăng nhập bằng Google/Apple |
| /api/parent/phone/update | POST | Cập nhật số điện thoại (sau OAuth) |
| /api/parent/phone/verify-otp | POST | Xác thực OTP cho số điện thoại |

### 4.1.1. Refresh Token & Logout

| API | Method | Mô tả |
|----|-------|------|
| /api/v1/auth/refresh_token | GET | Refresh access token bằng refresh token (rotation) |
| /api/v1/auth/logout | POST | Logout và revoke refresh token |

**Lưu ý:**
- Refresh token endpoints dùng chung cho tất cả user types (Parent, Student, Admin)
- Login response bao gồm cả `accessToken` và `refreshToken`
- Refresh token rotation: Mỗi lần refresh tạo token mới, revoke token cũ
- Hỗ trợ multi-device: Mỗi user có thể có nhiều refresh tokens

---

### 4.2. Student Management

| API | Method | Mô tả |
|----|-------|------|
| /api/parent/student/create | POST | Tạo StudentProfile |
| /api/parent/student/status | GET | Trạng thái liên kết |

---

### 4.3. Reporting

| API | Method | Mô tả |
|----|-------|------|
| /api/report/summary | GET | Tổng quan học tập |
| /api/report/weak-skills | GET | Skill yếu |
| /api/report/progress | GET | Tiến bộ theo thời gian |

---

## 5. QUYẾT ĐỊNH THIẾT KẾ QUAN TRỌNG

- Trial user và linked user dùng chung logic học tập
- Không duplicate dữ liệu khi chuyển trial → linked
- ParentAccount là root entity
- API phân quyền rõ student / parent
- **phone_number là username** cho đăng nhập phụ huynh
- **Liên kết 1 chiều**: Chỉ học sinh có thể liên kết đến phụ huynh bằng số điện thoại (Phase 1)
- **OAuth bắt buộc phone verification**: Phụ huynh đăng nhập OAuth phải verify số điện thoại trước khi vào dashboard
- **Refresh Token**: 
  - Access token hết hạn sau 6 giờ, refresh token hết hạn sau 30 ngày
  - Login response bao gồm cả `accessToken` và `refreshToken`
  - Refresh token rotation: Mỗi lần refresh tạo token mới, revoke token cũ
  - Hỗ trợ multi-device: Mỗi user có thể có nhiều refresh tokens cùng lúc

---

## 6. TÀI LIỆU LIÊN QUAN

- [PRD MVP](../prd/prd_mvp_phase_1-2025-12-14-22-15.md)
- [Student User Stories](../user_stories/student_user_stories_phase_1-2025-12-14-22-45.md)
- [Parent User Stories](../user_stories/parent_user_stories_phase_1-2025-12-14-23-05.md)
- [User Onboarding Flow](../user_flows/user_onboarding_flow_phase_1-2025-12-14-23-40.md)

---

## 7. LỊCH SỬ THAY ĐỔI

- 2025-12-15-00-20: Tạo mới API & Database Mapping
- 2025-12-15-XX-XX: Cập nhật ParentAccount với phone_number, phone_verified, oauth fields. Thêm OtpSession. Cập nhật linking APIs với OTP flow. Thêm OAuth login APIs.

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)