# API SEQUENCE DIAGRAMS – PHASE 1 (MVP)

Project: Tutor  
Document type: API Sequence Diagram  
Audience: Backend / Frontend / Product  
Status: Draft  
Version: 2025-12-15-01-35  
Author: Product Consultant (ChatGPT)

---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả các **API sequence diagrams quan trọng nhất trong Phase 1 (MVP)**, bao gồm:
- Luồng giải bài Toán (Solve bài)
- Luồng onboarding học sinh (Trial)
- Luồng liên kết học sinh – phụ huynh (Linking)

Mục tiêu:
- Làm rõ thứ tự gọi API
- Xác định rõ trách nhiệm từng service
- Hỗ trợ dev triển khai backend & frontend chính xác

---


## 2. SEQUENCE DIAGRAM – SOLVE BÀI TOÁN (TUTOR MODE)

```mermaid
sequenceDiagram
    autonumber

    participant S as Student App (Flutter)
    participant C as Core Service (Spring Boot)
    participant A as AI Service (Python)
    participant D as Database
    participant O as Object Storage

    S->>C: POST /api/tutor/solve/image
    C->>O: Upload math image
    O-->>C: Image URL

    C->>A: Solve math problem (image URL)
    A->>A: OCR + Math Solver + Hint Generator
    A-->>C: Step-by-step solution

    C->>D: Save solve history
    C-->>S: Return solution (step by step)
```

## 3. SEQUENCE DIAGRAM – ONBOARDING HỌC SINH (TRIAL MODE)

```mermaid
sequenceDiagram
    autonumber

    participant S as Student App (Flutter)
    participant C as Core Service (Spring Boot)
    participant D as Database

    S->>C: POST /api/student/trial/start
    C->>D: Create StudentTrialProfile
    D-->>C: Trial profile created
    C-->>S: Trial session info

    S->>C: GET /api/learning/today
    C->>D: Fetch trial learning data
    C-->>S: Daily learning plan
```

## 4. SEQUENCE DIAGRAM – PHỤ HUYNH TẠO HỌC SINH (PARENT-FIRST)

```mermaid
sequenceDiagram
    autonumber

    participant P as Parent Web (Next.js)
    participant C as Core Service (Spring Boot)
    participant D as Database

    P->>C: POST /api/parent/register
    C->>D: Create ParentAccount
    C-->>P: Parent registered

    P->>C: POST /api/parent/student/create
    C->>D: Create StudentProfile (Pending)
    C-->>P: Student profile created

```

## 5. SEQUENCE DIAGRAM – LIÊN KẾT HỌC SINH & PHỤ HUYNH (PHONE-BASED OTP)

```mermaid
sequenceDiagram
    autonumber

    participant S as Student App (Flutter)
    participant C as Core Service (Spring Boot)
    participant F as Firebase Auth
    participant D as Database
    participant SMS as SMS Service

    S->>C: POST /api/link/request-otp<br/>{phone, trialId, recaptcha}
    C->>C: Validate phone format<br/>Check rate limit (3/day)
    C->>C: Verify reCaptcha
    C->>D: Check parent_account<br/>by phone_number
    alt Parent exists
        C->>D: Get parent_id
    else Parent not exists
        C->>D: parent_id = null
    end
    C->>F: Request OTP via Firebase
    F->>SMS: Send OTP SMS
    SMS-->>F: SMS sent
    F-->>C: OTP sent confirmation
    C->>D: Store OTP session<br/>{phone, trialId, parentId, expires}
    C-->>S: OTP sent successfully

    S->>C: POST /api/link/verify-otp<br/>{phone, otp, trialId}
    C->>D: Verify OTP session
    C->>F: Verify OTP with Firebase
    F-->>C: OTP valid
    alt Parent exists
        C->>D: Get/Create student_profile
        C->>D: Convert trial to student
    else Parent not exists
        C->>D: Create parent_account<br/>{phone, status: pending_activation, phone_verified: true}
        C->>D: Create student_profile
        C->>D: Convert trial to student
        C->>SMS: Send activation SMS<br/>with dashboard link
    end
    C->>D: Merge learning data
    C-->>S: Success + login credentials<br/>{username: phone, password: phone, dashboardUrl}
```

## 5a. SEQUENCE DIAGRAM – LIÊN KẾT BẰNG LINK TOKEN (PARENT-FIRST)

```mermaid
sequenceDiagram
    autonumber

    participant S as Student App (Flutter)
    participant P as Parent Web
    participant C as Core Service (Spring Boot)
    participant D as Database

    P->>C: POST /api/parent/student/create
    C->>D: Create StudentProfile (Pending)
    C->>D: Generate LinkToken
    C-->>P: LinkToken / QR code

    S->>C: POST /api/link/confirm<br/>{linkToken}
    C->>D: Validate LinkToken
    C->>D: Convert Trial -> StudentProfile
    C->>D: Merge learning data
    C-->>S: Linking success<br/>Full access activated
```

## 5b. SEQUENCE DIAGRAM – OAuth LOGIN VỚI PHONE VERIFICATION

```mermaid
sequenceDiagram
    autonumber

    participant P as Parent Web
    participant O as OAuth Provider<br/>(Google/Apple)
    participant C as Core Service (Spring Boot)
    participant F as Firebase Auth
    participant D as Database
    participant SMS as SMS Service

    P->>O: Login with Google/Apple
    O-->>P: OAuth token
    P->>C: POST /api/parent/oauth/login<br/>{provider, token}
    C->>O: Verify OAuth token
    O-->>C: User info (email, name)
    C->>D: Check parent_account<br/>by oauth_id
    alt Account exists
        C->>D: Get parent_account
    else Account not exists
        C->>D: Create parent_account<br/>{oauth_id, email, name, phone_verified: false}
    end
    C->>D: Check phone_verified
    alt phone_verified = false
        C-->>P: Redirect to phone update screen
        P->>C: POST /api/parent/phone/update<br/>{phone}
        C->>F: Request OTP via Firebase
        F->>SMS: Send OTP SMS
        SMS-->>F: SMS sent
        F-->>C: OTP sent
        C->>D: Store OTP session
        C-->>P: OTP sent
        P->>C: POST /api/parent/phone/verify-otp<br/>{phone, otp}
        C->>F: Verify OTP
        F-->>C: OTP valid
        C->>D: Update parent_account<br/>{phone_number, phone_verified: true}
        C-->>P: Phone verified, redirect to dashboard
    else phone_verified = true
        C-->>P: Redirect to dashboard
    end
```

## 6. GHI CHÚ QUAN TRỌNG
- Frontend không gọi trực tiếp AI Service

- Mọi logic xác thực nằm tại Core Service

- AI Service chỉ xử lý nghiệp vụ AI, không lưu trạng thái người dùng

- Database là source of truth cho account & progress

- **Firebase Auth** được sử dụng để gửi và verify OTP qua SMS

- **Rate limiting**: Tối đa 3 lần gửi OTP/ngày/số điện thoại

- **reCaptcha** bắt buộc khi gửi OTP từ student app

- **Liên kết 1 chiều**: Chỉ học sinh có thể liên kết đến phụ huynh bằng số điện thoại (Phase 1)

## 7. TÀI LIỆU LIÊN QUAN

- ../system_architecture/system_architecture_phase1.md

- ../technical_design/api_db_mapping_phase1-2025-12-15-00-20.md

- ../user_flows/user_onboarding_flow_phase1-2025-12-14-23-40.md

---

## 8. LỊCH SỬ THAY ĐỔI

- 2025-12-15-01-35: Tạo mới API Sequence Diagrams
- 2025-12-15-XX-XX: Cập nhật linking flow với OTP, thêm OAuth login flow với phone verification

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)