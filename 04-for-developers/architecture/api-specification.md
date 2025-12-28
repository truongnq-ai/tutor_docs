# API SPECIFICATION – PHASE 1 (MVP)

**Project:** Tutor  
**Document type:** Technical Design  
**Audience:** Backend / Frontend Developer  
**Status:** Draft  
**Version:** 2025-12-15-03-30  
**Author:** Product Consultant (ChatGPT)


---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả **chi tiết API specification** cho Tutor – Phase 1, bao gồm:
- Request/Response schemas cho từng endpoint
- Error codes và error messages
- Authentication/Authorization flow
- Rate limiting
- API versioning strategy
- Example requests/responses

Tài liệu này là cơ sở để:
- Implement backend APIs
- Implement frontend API clients
- Write integration tests
- Generate API documentation (Swagger/OpenAPI)

---


## 2. API OVERVIEW

### 2.1. Base URL

```
Development: http://localhost:8080/api
Production: https://api.tutor.app/api
```

### 2.2. API Versioning

- Version trong URL: `/api/v1/...`
- Hoặc trong header: `API-Version: 1.0`
- **Phase 1:** Sử dụng `/api/...` (không versioning, sẽ thêm ở Phase 2)

### 2.3. Content Type

- Request: `application/json`
- Response: `application/json`
- File upload: `multipart/form-data`

### 2.4. Authentication

- **Student App:** JWT access token trong header `Authorization: Bearer <accessToken>`
- **Parent Dashboard:** JWT access token trong header `Authorization: Bearer <accessToken>`
- **Refresh Token:** Dùng để refresh access token khi hết hạn (30 ngày)
- **Trial User:** Anonymous token hoặc device ID

**Token Types:**
- **Access Token:** JWT token, hết hạn sau 6 giờ, dùng để authenticate các API requests
- **Refresh Token:** JWT token, hết hạn sau 30 ngày, dùng để lấy access token mới

**Refresh Token Flow:**
1. User login → Nhận `accessToken` và `refreshToken`
2. Khi `accessToken` hết hạn (401) → Gọi `/api/v1/auth/refresh_token` với `refreshToken`
3. Nhận `accessToken` và `refreshToken` mới (refresh token rotation)
4. Tiếp tục sử dụng `accessToken` mới

---


## 3. COMMON RESPONSE FORMATS

### 3.1. Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### 3.2. Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  }
}
```

### 3.3. Pagination Response

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## 4. ERROR CODES

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | External service unavailable |
| `TRIAL_EXPIRED` | 403 | Trial period expired |
| `SKILL_NOT_UNLOCKED` | 403 | Skill prerequisite not met |
| `OTP_INVALID` | 400 | OTP code không đúng |
| `OTP_EXPIRED` | 400 | OTP đã hết hạn |
| `PHONE_NOT_VERIFIED` | 403 | Số điện thoại chưa được xác thực |
| `RECAPTCHA_FAILED` | 400 | reCaptcha verification thất bại |
| `QUESTION_NOT_FOUND` | 404 | Question không tồn tại |
| `QUESTION_NOT_ASSIGNED` | 400 | Question chưa được assign |
| `QUESTION_ALREADY_COMPLETED` | 400 | Question đã được submit |
| `QUESTION_STUDENT_MISMATCH` | 403 | Question không thuộc về student này |
| `EXERCISE_NOT_APPROVED` | 400 | Exercise chưa được approve, không thể sinh Questions |
| `PREREQUISITE_NOT_MET` | 403 | Prerequisite skills chưa đạt mastery threshold |

---

## 5. STUDENT APP APIs

### 5.0. Authentication (Student) – Phase 1 (chuẩn bị cho 1:N ở Phase 2)

#### POST /api/student/oauth/login
- Login bằng Google hoặc Apple.
- Sau OAuth thành công, bắt buộc đặt username/password (alphanumeric, case-insensitive) nếu chưa có.

**Request:**
```json
{
  "provider": "google",        // "google" | "apple"
  "token": "oauth-id-token"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "requiresSetCredential": true,
    "message": "Set username/password to finish signup"
  }
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: OAuth token không hợp lệ
- `400 VALIDATION_ERROR`: Provider không hợp lệ

#### POST /api/student/set-credential
- Dùng sau khi OAuth login nếu student chưa có username/password.
- Username rule: alphanumeric (a-zA-Z0-9), không phân biệt hoa/thường, unique.

**Request:**
```json
{
  "username": "student123",
  "password": "StrongPass123",
  "confirmPassword": "StrongPass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "username": "student123"
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: Sai định dạng username (không phải alphanumeric) hoặc password yếu/không khớp
- `409 CONFLICT`: Username đã tồn tại

#### POST /api/student/register (Manual)
- Manual signup cho học sinh (Phase 1 vẫn 1:1; chuẩn bị cho 1:N Phase 2).

**Request:**
```json
{
  "name": "Nguyen Van B",
  "username": "student123",   // alphanumeric
  "password": "StrongPass123",
  "confirmPassword": "StrongPass123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "username": "student123"
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: Username không hợp lệ (chỉ alphanumeric) hoặc password yếu/không khớp
- `409 CONFLICT`: Username đã tồn tại

#### POST /api/student/login (Manual)
- Login bằng username/password (hỗ trợ multi-device; hạn chế thiết bị sẽ xem xét sau Phase 3).

**Request:**
```json
{
  "username": "student123",
  "password": "StrongPass123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "jwt-access-token-here",
  "refreshToken": "jwt-refresh-token-here",
  "tokenType": "bearer",
  "expiresIn": 21600,
  "refreshTokenExpiresIn": 2592000
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: Username hoặc password sai
- `403 FORBIDDEN`: Tài khoản bị khoá

---

### 5.1. Onboarding & Trial

#### POST /api/student/trial/start

Tạo trial profile cho học sinh mới.

**Request:**
```json
{
  "grade": 6,
  "deviceId": "device-uuid-here"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "trialId": "uuid",
    "grade": 6,
    "expiresAt": "2025-12-17T00:00:00Z",
    "trialStartedAt": "2025-12-15T00:00:00Z"
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: Grade không hợp lệ (chỉ 6 hoặc 7)
- `409 CONFLICT`: Trial đã tồn tại cho device này

---

#### GET /api/student/trial/status

Kiểm tra trạng thái trial.

**Headers:**
```
X-Device-Id: device-uuid
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "trialId": "uuid",
    "grade": 6,
    "status": "active",
    "expiresAt": "2025-12-17T00:00:00Z",
    "daysRemaining": 2
  }
}
```

**Error Responses:**
- `404 NOT_FOUND`: Trial không tồn tại
- `403 TRIAL_EXPIRED`: Trial đã hết hạn

---

### 5.2. Tutor Mode (Giải bài)

#### POST /api/tutor/solve/image

Giải bài Toán bằng hình ảnh.

**Request (multipart/form-data):**
```
image: <file>
grade: 6
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "solveId": "uuid",
    "problemText": "Đề bài đã nhận dạng...",
    "solution": {
      "steps": [
        {
          "stepNumber": 1,
          "description": "Phân tích đề bài",
          "content": "...",
          "hint": "Lưu ý: ..."
        },
        {
          "stepNumber": 2,
          "description": "Bước giải",
          "content": "...",
          "hint": null
        }
      ],
      "finalAnswer": "...",
      "commonMistakes": ["Lỗi thường gặp 1", "Lỗi thường gặp 2"]
    },
    "relatedSkills": ["6.3.1", "6.3.9"]
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: File không hợp lệ
- `503 SERVICE_UNAVAILABLE`: AI Service không available
- `500 INTERNAL_ERROR`: OCR hoặc giải bài thất bại

---

#### POST /api/tutor/solve/text

Giải bài Toán bằng văn bản.

**Request:**
```json
{
  "problemText": "Tính: 2/3 + 1/4",
  "grade": 6
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "solveId": "uuid",
    "solution": {
      "steps": [ ... ],
      "finalAnswer": "11/12",
      "commonMistakes": [ ... ]
    },
    "relatedSkills": ["6.3.5", "6.3.6"]
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: Problem text rỗng hoặc không hợp lệ
- `503 SERVICE_UNAVAILABLE`: AI Service không available

---

### 5.3. Learning & Practice

#### GET /api/learning/today

Lấy lộ trình học hôm nay.

**Headers:**
```
Authorization: Bearer <token>
hoặc
X-Device-Id: device-uuid (cho trial)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "date": "2025-12-15",
    "targetSkills": [
      {
        "skillId": "6.3.9",
        "skillName": "Rút gọn phân số",
        "mastery": 45,
        "priority": "high"
      }
    ],
    "practicePlan": {
      "totalQuestions": 8,
      "estimatedTime": 20,
      "questions": [
        {
          "questionId": "uuid",
          "skillId": "6.3.9",
          "difficulty": 2,
          "question": "...",
          "options": ["A", "B", "C", "D"]
        }
      ]
    }
  }
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: Chưa đăng nhập hoặc trial expired
- `404 NOT_FOUND`: Không tìm thấy lộ trình

---

#### POST /api/v1/practice/submit (DEPRECATED)

**⚠️ DEPRECATED**: Endpoint này đã được deprecated. Sử dụng `POST /api/v1/practice/questions/{id}/submit` thay thế.

Nộp kết quả bài luyện tập.

**Request:**
```json
{
  "questionId": "uuid",  // Required - link Practice với Question
  "answer": "A",
  "durationSec": 45,
  "skillId": "6.3.9",
  "sessionId": "uuid",  // Optional - link với session (PRACTICE_SESSION, MINI_TEST, etc.)
  "sessionType": "PRACTICE_SESSION"  // Optional - PRACTICE, PRACTICE_SESSION, MINI_TEST, etc.
}
```

**Lưu ý**: 
- `questionId` là required (non-nullable) để đảm bảo data consistency
- Practice sẽ được link với Question qua `practice.question_id`
- Practice sẽ được link với Session qua `practice.session_id` + `practice.session_type` (polymorphic relationship)
- Response data (student_answer, is_correct, duration_sec, submitted_at) được lưu trong Practice table
- Question status sẽ được update: ASSIGNED → SUBMITTED (first practice) hoặc SUBMITTED → RESUBMITTED (re-attempt)
- **Option E**: Nếu Practice record đã tồn tại với `status = NOT_STARTED` (từ session generation), sẽ update thay vì tạo mới

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "practiceId": "uuid",
    "isCorrect": true,
    "correctAnswer": "A",
    "explanation": "Giải thích...",
    "masteryUpdate": {
      "skillId": "6.3.9",
      "oldMastery": 45,
      "newMastery": 52,
      "change": 7
    },
    "nextDifficulty": 2
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: QuestionId không hợp lệ
- `404 NOT_FOUND`: Question không tồn tại
- `403 SKILL_NOT_UNLOCKED`: Skill chưa được unlock

---

#### GET /api/practice/history

Lấy lịch sử luyện tập.

**Query Parameters:**
- `page`: 1 (default)
- `pageSize`: 20 (default)
- `skillId`: (optional) Filter by skill
- `fromDate`: (optional) ISO date
- `toDate`: (optional) ISO date

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "practiceId": "uuid",
      "skillId": "6.3.9",
      "skillName": "Rút gọn phân số",
      "isCorrect": true,
      "durationSec": 45,
      "createdAt": "2025-12-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

---

### 5.4. Mini Test

#### POST /api/minitest/start

Bắt đầu mini test.

**Request:**
```json
{
  "skillId": "6.3.9"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "testId": "uuid",
    "skillId": "6.3.9",
    "skillName": "Rút gọn phân số",
    "totalQuestions": 6,
    "timeLimitSec": 600,
    "questions": [
      {
        "questionId": "uuid",
        "questionNumber": 1,
        "question": "...",
        "options": ["A", "B", "C", "D"]
      }
    ],
    "startedAt": "2025-12-15T10:00:00Z"
  }
}
```

**Error Responses:**
- `403 SKILL_NOT_UNLOCKED`: Skill chưa đạt mastery threshold
- `404 NOT_FOUND`: Skill không tồn tại

---

#### POST /api/minitest/submit

Nộp kết quả mini test.

**Request:**
```json
{
  "testId": "uuid",
  "answers": [
    {
      "questionId": "uuid",
      "answer": "A"
    }
  ],
  "timeTakenSec": 450
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "testId": "uuid",
    "score": 83,
    "totalQuestions": 6,
    "correctAnswers": 5,
    "details": {
      "6.3.9": {
        "correct": 4,
        "total": 5
      },
      "6.3.1": {
        "correct": 1,
        "total": 1
      }
    },
    "masteryUpdate": {
      "skillId": "6.3.9",
      "oldMastery": 70,
      "newMastery": 85,
      "change": 15
    },
    "recommendations": [
      {
        "skillId": "6.3.10",
        "skillName": "Hỗn số",
        "reason": "Đã đạt mastery cho rút gọn phân số"
      }
    ]
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: TestId không hợp lệ hoặc đã submit
- `404 NOT_FOUND`: Test không tồn tại

---

### 5.5. Linking Parent (Phone-based OTP)

#### POST /api/link/request-otp

Gửi OTP để liên kết với phụ huynh bằng số điện thoại.

**Request:**
```json
{
  "phone": "0912345678",
  "trialId": "uuid",
  "recaptchaToken": "recaptcha-token-here"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP đã được gửi đến số điện thoại của bạn"
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: Số điện thoại không hợp lệ
- `429 RATE_LIMIT_EXCEEDED`: Đã vượt quá 3 lần gửi OTP/ngày cho số điện thoại này
- `400 RECAPTCHA_FAILED`: reCaptcha verification thất bại
- `500 INTERNAL_ERROR`: Lỗi khi gửi OTP

---

#### POST /api/link/verify-otp

Xác thực OTP và liên kết với phụ huynh.

**Request:**
```json
{
  "phone": "0912345678",
  "otp": "123456",
  "trialId": "uuid"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "parentId": "uuid",
    "linkedAt": "2025-12-15T10:00:00Z",
    "loginCredentials": {
      "username": "0912345678",
      "password": "0912345678",
      "note": "Mật khẩu tạm thời, vui lòng đổi sau khi đăng nhập"
    },
    "dashboardUrl": "https://dashboard.tutor.app/activate?token=..."
  }
}
```

**Error Responses:**
- `400 OTP_INVALID`: OTP không đúng
- `400 OTP_EXPIRED`: OTP đã hết hạn (5 phút)
- `404 TRIAL_NOT_FOUND`: Trial ID không tồn tại
- `500 INTERNAL_ERROR`: Lỗi khi xác thực OTP

---

#### POST /api/link/confirm (Parent-first flow - giữ nguyên)

Xác nhận liên kết với phụ huynh bằng link token (cho parent-first flow).

**Request:**
```json
{
  "linkToken": "abc123xyz"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "parentId": "uuid",
    "linkedAt": "2025-12-15T10:00:00Z"
  }
}
```

**Error Responses:**
- `404 NOT_FOUND`: Link token không tồn tại
- `400 VALIDATION_ERROR`: Link token đã hết hạn hoặc đã sử dụng

---

## 6. PARENT DASHBOARD APIs

### 6.1. Authentication

#### POST /api/parent/register

Đăng ký tài khoản phụ huynh.

**Request:**
```json
{
  "name": "Nguyễn Văn A",
  "phone": "0912345678",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "email": "parent@example.com"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "parentId": "uuid",
    "name": "Nguyễn Văn A",
    "phone": "0912345678",
    "phoneVerified": false,
    "email": "parent@example.com",
    "status": "pending_verification",
    "requiresOtpVerification": true
  }
}
```

**Lưu ý:** Sau khi đăng ký, phụ huynh cần verify OTP. Gọi `/api/parent/phone/verify-otp` để hoàn tất đăng ký.

**Error Responses:**
- `400 VALIDATION_ERROR`: Số điện thoại không hợp lệ, password yếu, hoặc tên rỗng
- `409 CONFLICT`: Số điện thoại đã tồn tại

---

#### POST /api/parent/login

Đăng nhập phụ huynh.

**Request:**
```json
{
  "phone": "0912345678",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "expiresIn": 3600,
    "parent": {
      "id": "uuid",
      "name": "Nguyễn Văn A",
      "phone": "0912345678",
      "phoneVerified": true
    }
  }
}
```

**Response (200 OK):**
```json
{
  "accessToken": "jwt-access-token-here",
  "refreshToken": "jwt-refresh-token-here",
  "tokenType": "bearer",
  "expiresIn": 21600,
  "refreshTokenExpiresIn": 2592000
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: Số điện thoại hoặc password sai
- `403 FORBIDDEN`: Tài khoản bị inactive
- `403 PHONE_NOT_VERIFIED`: Số điện thoại chưa được xác thực (yêu cầu verify OTP)

---

#### POST /api/parent/oauth/login

Đăng nhập bằng Google hoặc Apple.

**Request:**
```json
{
  "provider": "google",
  "token": "oauth-id-token-here"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "jwt-access-token-here",
  "refreshToken": "jwt-refresh-token-here",
  "tokenType": "bearer",
  "expiresIn": 21600,
  "refreshTokenExpiresIn": 2592000
}
```

**Response (200 OK - Cần verify phone):**
```json
{
  "success": true,
  "data": {
    "parentId": "uuid",
    "name": "Nguyễn Văn A",
    "email": "user@gmail.com",
    "phoneVerified": false,
    "requiresPhoneVerification": true,
    "message": "Vui lòng cập nhật và xác thực số điện thoại"
  }
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: OAuth token không hợp lệ
- `400 VALIDATION_ERROR`: Provider không hợp lệ (chỉ hỗ trợ "google" hoặc "apple")

---

#### POST /api/parent/phone/update

Cập nhật số điện thoại (sau OAuth login hoặc khi cần thay đổi).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "phone": "0912345678"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP đã được gửi đến số điện thoại của bạn"
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: Số điện thoại không hợp lệ
- `409 CONFLICT`: Số điện thoại đã được sử dụng bởi tài khoản khác
- `429 RATE_LIMIT_EXCEEDED`: Đã vượt quá 3 lần gửi OTP/ngày

---

#### POST /api/parent/phone/verify-otp

Xác thực OTP cho số điện thoại.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "phone": "0912345678",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "phoneVerified": true,
    "message": "Số điện thoại đã được xác thực thành công"
  }
}
```

**Error Responses:**
- `400 OTP_INVALID`: OTP không đúng
- `400 OTP_EXPIRED`: OTP đã hết hạn (5 phút)
- `400 VALIDATION_ERROR`: Số điện thoại không khớp với OTP session

---

### 6.2. Student Management

#### POST /api/parent/student/create

Tạo student profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "grade": 6
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "grade": 6,
    "status": "pending",
    "linkToken": "abc123xyz",
    "qrCodeUrl": "https://..."
  }
}
```

---

#### GET /api/parent/student/status

Kiểm tra trạng thái liên kết học sinh.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "studentId": "uuid",
    "grade": 6,
    "status": "linked",
    "linkedAt": "2025-12-15T10:00:00Z"
  }
}
```

---

### 6.3. Reporting

#### GET /api/report/summary

Tổng quan học tập.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `period`: `week` | `month` (default: `week`)
- `fromDate`: (optional) ISO date
- `toDate`: (optional) ISO date

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": "week",
    "fromDate": "2025-12-08",
    "toDate": "2025-12-15",
    "summary": {
      "studyDays": 5,
      "totalStudyTimeMin": 120,
      "totalQuestions": 45,
      "correctAnswers": 32,
      "accuracy": 71.1
    },
    "dailyBreakdown": [
      {
        "date": "2025-12-15",
        "studyTimeMin": 25,
        "questions": 10,
        "accuracy": 80
      }
    ]
  }
}
```

---

#### GET /api/report/weak-skills

Danh sách skills yếu.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "weakSkills": [
      {
        "skillId": "6.3.9",
        "skillName": "Rút gọn phân số",
        "mastery": 45,
        "status": "weak",
        "recommendation": "Nên luyện tập thêm mỗi ngày 15 phút"
      }
    ],
    "totalWeakSkills": 3
  }
}
```

---

#### GET /api/report/progress

Tiến bộ theo thời gian.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `period`: `week` | `month` (default: `month`)
- `skillId`: (optional) Filter by skill

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "progress": [
      {
        "date": "2025-12-01",
        "averageMastery": 55
      },
      {
        "date": "2025-12-08",
        "averageMastery": 62
      },
      {
        "date": "2025-12-15",
        "averageMastery": 68
      }
    ],
    "improvement": {
      "startMastery": 55,
      "currentMastery": 68,
      "change": 13
    }
  }
}
```

---

## 6.4. Refresh Token & Logout

### 6.4.1. Refresh Token

#### GET /api/v1/auth/refresh_token

Refresh access token bằng refresh token. Hỗ trợ refresh token rotation - mỗi lần refresh sẽ tạo refresh token mới và revoke token cũ.

**Headers:**
```
Authorization: Bearer <refreshToken>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-access-token",
    "refreshToken": "new-jwt-refresh-token",
    "tokenType": "bearer",
    "expiresIn": 21600,
    "refreshTokenExpiresIn": 2592000
  }
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: Refresh token không hợp lệ, đã hết hạn, hoặc đã bị revoke
- `400 VALIDATION_ERROR`: Authorization header không đúng format

**Lưu ý:**
- Refresh token cũ sẽ bị revoke sau khi refresh thành công (rotation)
- Client phải lưu refresh token mới và sử dụng nó cho lần refresh tiếp theo
- Hỗ trợ multi-device: Mỗi device có thể có refresh token riêng

---

### 6.4.2. Logout

#### POST /api/v1/auth/logout

Đăng xuất và revoke refresh token hiện tại.

**Headers:**
```
Authorization: Bearer <refreshToken>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: Refresh token không hợp lệ
- `400 VALIDATION_ERROR`: Authorization header không đúng format

**Lưu ý:**
- Refresh token sẽ bị revoke sau khi logout
- Client nên xóa cả access token và refresh token khỏi storage
- Logout chỉ revoke refresh token được gửi trong request, không revoke tất cả tokens của user

---

## 7. INTERNAL APIs (Core Service ↔ AI Service)

### 7.1. POST /internal/ai/solve

Core Service gọi AI Service để giải bài.

**Request:**
```json
{
  "problemText": "Tính: 2/3 + 1/4",
  "grade": 6,
  "imageUrl": "https://..." // optional
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "solution": {
      "steps": [ ... ],
      "finalAnswer": "...",
      "commonMistakes": [ ... ]
    },
    "relatedSkills": ["6.3.5", "6.3.6"],
    "confidence": 0.95
  }
}
```

---

## 7. ADMIN DASHBOARD APIs

### 7.1. Question Management

#### GET /api/admin/questions

Danh sách Questions với filter, search, pagination.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: 0 (default)
- `pageSize`: 20 (default)
- `skillId`: (optional) Filter by skill
- `exerciseId`: (optional) Filter by exercise
- `studentId`: (optional) Filter by student
- `status`: (optional) Filter by status (DRAFT, ASSIGNED, SUBMITTED, RESUBMITTED, SKIPPED)
- `questionType`: (optional) Filter by type (PRACTICE, MINI_TEST, REVIEW)
- `fromDate`: (optional) ISO date
- `toDate`: (optional) ISO date
- `searchText`: (optional) Search in problem_text

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "exerciseId": "uuid",
      "exerciseName": "Rút gọn phân số: 12/18",
      "skillId": "uuid",
      "skillCode": "6.3.9",
      "skillName": "Rút gọn phân số",
      "assignedToStudentId": "uuid",
      "problemText": "Rút gọn phân số: 12/18",
      "status": "SUBMITTED",
      "questionType": "PRACTICE",
      "practiceCount": 1,
      "latestPractice": {
        "id": "uuid",
        "isCorrect": true,
        "durationSec": 45,
        "submittedAt": "2025-12-21T10:00:45Z"
      },
      "assignedAt": "2025-12-21T10:00:00Z",
      "createdAt": "2025-12-21T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 0,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: Chưa đăng nhập
- `403 FORBIDDEN`: Không có quyền admin

---

#### GET /api/admin/questions/:id

Chi tiết Question kèm Practices liên quan.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "exerciseId": "uuid",
    "exercise": {
      "id": "uuid",
      "problemText": "Rút gọn phân số: 12/18",
      "reviewStatus": "APPROVED"
    },
    "skillId": "uuid",
    "skill": {
      "id": "uuid",
      "code": "6.3.9",
      "name": "Rút gọn phân số"
    },
    "assignedToStudentId": "uuid",
    "student": {
      "id": "uuid",
      "grade": 6
    },
    "problemText": "Rút gọn phân số: 12/18",
    "problemLatex": "\\frac{12}{18}",
    "problemImageUrl": "https://...",
    "solutionSteps": [
      {
        "stepNumber": 1,
        "description": "Tìm ƯCLN",
        "content": "ƯCLN(12, 18) = 6",
        "explanation": "..."
      }
    ],
    "finalAnswer": "2/3",
    "commonMistakes": [...],
    "hints": [...],
    "customizedData": null,
    "difficultyLevel": 1,
    "questionType": "PRACTICE",
    "status": "SUBMITTED",
    "assignedAt": "2025-12-21T10:00:00Z",
    "practices": [
      {
        "id": "uuid",
        "studentAnswer": "2/3",
        "isCorrect": true,
        "durationSec": 45,
        "submittedAt": "2025-12-21T10:00:45Z",
        "sessionId": "uuid",
        "sessionType": "PRACTICE_SESSION",
        "createdAt": "2025-12-21T10:00:45Z"
      }
    ],
    "practiceCount": 1,
    "latestPractice": {
      "id": "uuid",
      "studentAnswer": "2/3",
      "isCorrect": true,
      "durationSec": 45,
      "submittedAt": "2025-12-21T10:00:45Z"
    },
    "createdAt": "2025-12-21T10:00:00Z"
  }
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: Chưa đăng nhập
- `403 FORBIDDEN`: Không có quyền admin
- `404 NOT_FOUND`: Question không tồn tại

---

#### GET /api/admin/exercises/:id/questions

Lấy Questions đã được sinh từ Exercise.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: 0 (default)
- `pageSize`: 20 (default)
- `status`: (optional) Filter by status

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "exerciseId": "uuid",
    "exerciseName": "Rút gọn phân số: 12/18",
    "totalQuestions": 25,
    "questions": [
      {
        "id": "uuid",
        "assignedToStudentId": "uuid",
        "status": "SUBMITTED",
        "practiceCount": 1,
        "assignedAt": "2025-12-21T10:00:00Z"
      }
    ],
    "statistics": {
      "totalGenerated": 25,
      "submitted": 20,
      "assigned": 3,
      "skipped": 2,
      "avgSuccessRate": 85.5,
      "avgTimeSec": 42
    },
    "pagination": {
      "page": 0,
      "pageSize": 20,
      "total": 25,
      "totalPages": 2
    }
  }
}
```

---

#### GET /api/admin/skills/:id/questions

Lấy Questions theo Skill (tích hợp với Skills page).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page`: 0 (default)
- `pageSize": 20 (default)
- `difficultyLevel`: (optional) Filter by difficulty (1-5)
- `status`: (optional) Filter by status
- `onlyApprovedExercises`: true (default) - Chỉ Questions từ Exercises APPROVED

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "skillId": "uuid",
    "skillCode": "6.3.9",
    "skillName": "Rút gọn phân số",
    "totalQuestions": 150,
    "questions": [
      {
        "id": "uuid",
        "exerciseId": "uuid",
        "problemText": "Rút gọn phân số: 12/18",
        "difficultyLevel": 1,
        "status": "COMPLETED",
        "practiceCount": 1,
        "createdAt": "2025-12-21T10:00:00Z"
      }
    ],
    "statistics": {
      "byDifficulty": {
        "1": 50,
        "2": 40,
        "3": 35,
        "4": 20,
        "5": 5
      },
      "totalPractices": 1200
    },
    "pagination": {
      "page": 0,
      "pageSize": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

#### GET /api/admin/questions/:id/practices

Lấy Practices của Question.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "questionId": "uuid",
    "practices": [
      {
        "id": "uuid",
        "studentId": "uuid",
        "isCorrect": true,
        "durationSec": 45,
        "difficultyLevel": 1,
        "createdAt": "2025-12-21T10:00:45Z"
      }
    ],
    "total": 1
  }
}
```

---

### 7.2. Practice Question APIs (Student App)

#### GET /api/practice/questions

Lấy Questions đã được assign cho học sinh.

**Headers:**
```
Authorization: Bearer <token>
hoặc
X-Device-Id: device-uuid (cho trial)
```

**Query Parameters:**
- `status`: (optional) ASSIGNED, COMPLETED, SKIPPED
- `skillId`: (optional) Filter by skill
- `limit`: (optional) Số lượng Questions (default: 10)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "uuid",
        "exerciseId": "uuid",
        "skillId": "uuid",
        "skillName": "Rút gọn phân số",
        "problemText": "Rút gọn phân số: 12/18",
        "problemLatex": "\\frac{12}{18}",
        "problemImageUrl": "https://...",
        "difficultyLevel": 1,
        "questionType": "PRACTICE",
        "status": "ASSIGNED",
        "assignedAt": "2025-12-21T10:00:00Z",
        "timeEstimateSec": 120
      }
    ],
    "total": 8
  }
}
```

---

#### GET /api/practice/questions/:id

Chi tiết Question (student view).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "problemText": "Rút gọn phân số: 12/18",
    "problemLatex": "\\frac{12}{18}",
    "problemImageUrl": "https://...",
    "difficultyLevel": 1,
    "questionType": "PRACTICE",
    "status": "ASSIGNED",
    "hints": [
      "Hãy tìm số lớn nhất mà cả tử và mẫu đều chia hết"
    ],
    "timeEstimateSec": 120,
    "assignedAt": "2025-12-21T10:00:00Z"
  }
}
```

**Error Responses:**
- `401 UNAUTHORIZED`: Chưa đăng nhập
- `403 FORBIDDEN`: Question không thuộc về student này
- `404 NOT_FOUND`: Question không tồn tại

---

#### POST /api/v1/practice/questions/{id}/submit (RECOMMENDED)

Submit answer cho Question (tạo hoặc update Practice với question_id).

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `id`: Question ID (UUID)

**Request Body:**
```json
{
  "answer": "2/3",
  "durationSec": 45,
  "sessionId": "uuid",  // Optional - link với session
  "sessionType": "PRACTICE_SESSION"  // Optional - PRACTICE, PRACTICE_SESSION, MINI_TEST, etc.
}
```

**Lưu ý (Option E Implementation):**
- Nếu Practice record đã tồn tại với `status = NOT_STARTED` (từ session generation), sẽ **update** thay vì tạo mới
- Practice record được update: `status = NOT_STARTED → SUBMITTED`, `student_answer`, `is_correct`, `submitted_at`
- Nếu không có Practice record (standalone practice), sẽ **tạo mới** với `status = SUBMITTED`
- Question status sẽ được update: ASSIGNED → SUBMITTED (first practice) hoặc SUBMITTED → RESUBMITTED (re-attempt)
- Mastery update được thực hiện trong cùng transaction với Practice update/create

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "questionId": "uuid",
    "practiceId": "uuid",
    "isCorrect": true,
    "correctAnswer": "2/3",
    "explanation": "Giải thích...",
    "questionStatus": "SUBMITTED",
    "masteryUpdate": {
      "skillId": "uuid",
      "oldMastery": 45,
      "newMastery": 52,
      "change": 7
    },
    "nextDifficulty": 2
  }
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: Answer không hợp lệ
- `403 FORBIDDEN`: Question không thuộc về student này
- `404 NOT_FOUND`: Question không tồn tại
- `400 QUESTION_NOT_ASSIGNED`: Question chưa được assign (status != ASSIGNED)
- `400 QUESTION_ALREADY_COMPLETED`: Deprecated - Question có thể được re-attempt (status sẽ là RESUBMITTED)

---

### 7.3. Learning APIs

#### POST /api/v1/learning/generate-questions

Generate Questions từ Exercises (cho Adaptive Learning Engine và Student App).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "recommendedSkillId": "uuid",
  "difficultyLevel": 2,
  "count": 5
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "exerciseId": "uuid",
      "skillId": "uuid",
      "problemText": "Rút gọn phân số: 12/18",
      "problemLatex": "\\frac{12}{18}",
      "difficultyLevel": 2,
      "questionType": "PRACTICE",
      "status": "ASSIGNED",
      "assignedAt": "2025-12-21T10:00:00Z"
    }
  ],
  "message": "Questions generated successfully"
}
```

**Error Responses:**
- `400 VALIDATION_ERROR`: recommendedSkillId, difficultyLevel, count không hợp lệ
- `404 NOT_FOUND`: Skill không tồn tại
- `400 EXERCISE_NOT_APPROVED`: Không có Exercises APPROVED cho skill này
- `403 PREREQUISITE_NOT_MET`: Prerequisite skills chưa đạt mastery threshold

**Lưu ý:**
- Endpoint này được gọi bởi Student App sau khi nhận learning plan
- Questions được tạo với `status = ASSIGNED`, `assignedToStudentId = currentUserId`
- Questions KHÔNG có `sessionId` (link với session qua Practice records khi submit)

---

## 8. RATE LIMITING

### 8.1. Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/tutor/solve/*` | 20 requests | 1 hour |
| `/api/practice/submit` | 100 requests | 1 hour |
| `/api/practice/questions/:id/submit` | 100 requests | 1 hour |
| `/api/parent/login` | 5 requests | 15 minutes |
| `/api/parent/register` | 3 requests | 1 hour |
| `/api/internal/learning/generate-questions` | 50 requests | 1 hour |

### 8.2. Rate Limit Headers

```
X-RateLimit-Limit: 20
X-RateLimit-Remaining: 15
X-RateLimit-Reset: 1639500000
```

---

## 9. TÀI LIỆU LIÊN QUAN

- [API & Database Mapping](./api_db_mapping_phase_1-2025-12-15-00-20.md)
- [System Architecture](./system_architecture_phase_1-2025-12-15-00-21.md)
- [Sequence Diagrams](../sequence_diagrams/api_sequence_diagrams_phase_1-2025-12-15-01-35.md)

---

## 10. GHI CHÚ / TODO

- [ ] Generate OpenAPI/Swagger specification
- [ ] Add API versioning strategy
- [ ] Document webhook endpoints (nếu có)
- [ ] Add request/response examples cho tất cả endpoints

---

## 11. LỊCH SỬ THAY ĐỔI

- 2025-12-15-03-30: Tạo mới API Specification
- 2025-12-15: Thêm refresh token endpoints và cập nhật authentication flow
- 2025-12-21-16-45: Thêm Question Management APIs (admin, student, internal), cập nhật practice/submit để hỗ trợ questionId
- 2025-12-26: Refactor Question-Practice-Session model:
  - POST /api/practice/submit: questionId required, add sessionId + sessionType
  - POST /api/practice/questions/:id/submit: add sessionId + sessionType
- 2025-12-21: Option E Implementation - Practice Status & Session Linking:
  - POST /api/v1/practice/submit: DEPRECATED (use POST /api/v1/practice/questions/{id}/submit)
  - POST /api/v1/practice/questions/{id}/submit: Update existing Practice records (NOT_STARTED → SUBMITTED) instead of always creating new
  - Practice records created immediately when generating questions for sessions (status = NOT_STARTED)
  - PUT /api/v1/practice/sessions/{sessionId}/cancel: Cancel session and mark Practice records as CANCELLED
  - GET /api/v1/practice/sessions/{sessionId}/questions: Always query via Practice records (no fallback)
  - POST /api/v1/learning/generate-questions: new endpoint (replaces /api/internal/learning/generate-questions)
  - Question response: remove response data fields, add latestPractice + practiceCount
  - Question status: SUBMITTED, RESUBMITTED (replaces COMPLETED)



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)