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

- **Student App:** JWT token trong header `Authorization: Bearer <token>`
- **Parent Dashboard:** JWT token trong header `Authorization: Bearer <token>`
- **Trial User:** Anonymous token hoặc device ID

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

---

## 5. STUDENT APP APIs

### 5.1. Onboarding & Trial

#### POST /api/student/trial/start

Tạo trial profile cho học sinh mới.

**Request:**
```json
{
  "grade": 6,
  "deviceId": "device-uuid-here",
  "anonymousId": "anonymous-id-here"
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
X-Anonymous-Id: anonymous-id
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

#### POST /api/practice/submit

Nộp kết quả bài luyện tập.

**Request:**
```json
{
  "questionId": "uuid",
  "answer": "A",
  "durationSec": 45,
  "skillId": "6.3.9"
}
```

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
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "expiresIn": 3600,
    "parent": {
      "id": "uuid",
      "name": "Nguyễn Văn A",
      "email": "user@gmail.com",
      "phoneVerified": true
    },
    "requiresPhoneVerification": false
  }
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

## 8. RATE LIMITING

### 8.1. Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/tutor/solve/*` | 20 requests | 1 hour |
| `/api/practice/submit` | 100 requests | 1 hour |
| `/api/parent/login` | 5 requests | 15 minutes |
| `/api/parent/register` | 3 requests | 1 hour |

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



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)