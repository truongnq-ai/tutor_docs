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

## 5. SEQUENCE DIAGRAM – LIÊN KẾT HỌC SINH & PHỤ HUYNH (LINKING FLOW)

```mermaid
sequenceDiagram
    autonumber

    participant S as Student App (Flutter)
    participant P as Parent Web
    participant C as Core Service (Spring Boot)
    participant D as Database

    S->>C: POST /api/link/request
    C->>D: Generate LinkToken
    C-->>S: LinkToken / QR code

    P->>C: POST /api/link/confirm
    C->>D: Validate LinkToken
    C->>D: Convert Trial -> StudentProfile
    C->>D: Merge learning data
    C-->>P: Linking success
    C-->>S: Full access activated


```

## 6. GHI CHÚ QUAN TRỌNG
- Frontend không gọi trực tiếp AI Service

- Mọi logic xác thực nằm tại Core Service

- AI Service chỉ xử lý nghiệp vụ AI, không lưu trạng thái người dùng

- Database là source of truth cho account & progress

## 7. TÀI LIỆU LIÊN QUAN

- ../system_architecture/system_architecture_phase1.md

- ../technical_design/api_db_mapping_phase1-2025-12-15-00-20.md

- ../user_flows/user_onboarding_flow_phase1-2025-12-14-23-40.md

---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)