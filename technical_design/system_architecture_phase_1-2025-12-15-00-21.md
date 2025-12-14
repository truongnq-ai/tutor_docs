# SYSTEM ARCHITECTURE – PHASE 1 (MVP)

Project: Tutor  
Document type: System Architecture  
Audience: Product / Backend / Frontend / DevOps  
Status: Draft  
Version: 2025-12-15-01-05  
Author: Product Consultant (ChatGPT)

---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả **kiến trúc hệ thống tổng thể (Infra + AI)** cho Tutor – Phase 1 (MVP), bao gồm:
- Kiến trúc frontend, backend (microservices)
- Cách các service giao tiếp với nhau
- Vai trò của AI service trong hệ thống
- Nền tảng hạ tầng (infrastructure) đề xuất cho MVP

Tài liệu này là cơ sở cho:
- Thiết kế chi tiết backend
- Setup repository & DevOps
- Onboard developer mới

---


## 2. NGUYÊN TẮC KIẾN TRÚC (ARCHITECTURE PRINCIPLES)

1. **Business logic ổn định, AI linh hoạt**
   - Core nghiệp vụ tách biệt khỏi AI
2. **Microservices ở mức vừa đủ**
   - Không over-engineering cho MVP
3. **Dễ mở rộng sang Phase 2–3**
   - Thêm giáo viên, lớp học, notification mà không phá hệ thống cũ
4. **Tech stack theo năng lực đội ngũ**
   - Ưu tiên công nghệ đã làm chủ

---


## 3. TỔNG QUAN KIẾN TRÚC HỆ THỐNG

### 3.1. Sơ đồ tổng thể (High-level)

```
+--------------------------------------------------+
| FRONTEND |
| |
| +--------------------+ |
| | Flutter App | (Student) |
| +--------------------+ |
| | REST API |
| +--------------------+ |
| | Next.js Web | (Parent) |
| +--------------------+ |
| | REST API |
| +--------------------+ |
| | Next.js Web | (Admin) |
| +--------------------+ |
+-------------------------+------------------------+
|
v
+--------------------------------------------------+
| BACKEND (MICROSERVICES) |
| |
| +------------------------------------------+ |
| | Core Service (Java Spring Boot) | |
| |------------------------------------------| |
| | - Auth & Account | |
| | - Student / Parent | |
| | - Learning Progress | |
| | - Reporting | |
| +------------------------------------------+ |
| | Internal REST API |
| v |
| +------------------------------------------+ |
| | AI Service (Python) | |
| |------------------------------------------| |
| | - OCR | |
| | - Math Solver | |
| | - Hint Generator | |
| | - Adaptive Logic | |
| +------------------------------------------+ |
| |
| (Notification Service – Phase 2) |
+--------------------------------------------------+

```


### KIẾN TRÚC TỔNG THỂ (OVERVIEW)

#### Frontend
- **Flutter App (Student)**
  - Onboarding học sinh
  - Giải bài Toán
  - Luyện tập, mini test
  - Theo dõi tiến độ cá nhân

- **Next.js Web (Parent)**
  - Đăng ký / đăng nhập phụ huynh
  - Theo dõi kết quả học tập
  - Xem báo cáo, điểm yếu

- **Next.js Web (Admin)**
  - Quản lý hệ thống
  - Giám sát chất lượng AI
  - Quản lý nội dung & dữ liệu

---

#### Backend (Microservices)

- **Core Service (Java Spring Boot)**
  - Auth & Account
  - Student / Parent management
  - Learning Progress
  - Reporting

- **AI Service (Python)**
  - OCR
  - Math Solver
  - Hint Generator
  - Adaptive Logic

- **Notification Service (Optional – Phase 2)**
  - Email
  - Zalo OA

---


## 4. FRONTEND ARCHITECTURE

### 4.1. Flutter App (Student)

**Vai trò**
- Onboarding học sinh
- Giải bài Toán (Tutor mode)
- Luyện tập, mini test
- Hiển thị tiến độ cá nhân

**Đặc điểm kỹ thuật**
- 1 codebase cho Android / iOS
- Giao tiếp backend qua REST API
- Upload ảnh (camera / gallery)
- Không xử lý AI trực tiếp trên client

---

### 4.2. Web Dashboard – Next.js (Parent)

**Vai trò**
- Phụ huynh đăng ký / đăng nhập
- Xem báo cáo học tập
- Theo dõi tiến bộ và điểm yếu

**Đặc điểm kỹ thuật**
- Next.js (SSR + CSR)
- Authentication bằng JWT / session
- Tối ưu SEO cho landing page (giai đoạn sau)

---

### 4.3. Web Dashboard – Next.js (Admin)

**Vai trò**
- Quản lý nội dung
- Giám sát chất lượng AI
- Theo dõi hệ thống và người dùng

**Lý do dùng chung Next.js**
- Đồng bộ tech stack
- Tái sử dụng component
- Giảm chi phí maintain

---

## 5. BACKEND ARCHITECTURE

### 5.1. Core Service – Java Spring Boot

**Vai trò**
Core Service là **trung tâm nghiệp vụ** của toàn hệ thống.

**Chức năng chính**
- Auth & Account
- Quản lý học sinh / phụ huynh
- Theo dõi tiến độ học tập
- Tổng hợp báo cáo

**Đặc điểm**
- Stateless REST API
- Validation, business rules đặt tại đây
- Không chứa logic AI phức tạp

---

### 5.2. AI Service – Python

**Vai trò**
Cung cấp toàn bộ năng lực AI cho hệ thống Tutor.

**Chức năng**
- OCR (nhận dạng đề Toán từ ảnh)
- Math Solver (giải bài Toán theo từng bước)
- Hint Generator (gợi ý từng bước)
- Adaptive Logic (xác định skill yếu, độ khó)

**Đặc điểm**
- Chạy độc lập với Core Service
- Nhận request từ Core Service
- Có thể thay đổi model / prompt mà không ảnh hưởng frontend

---

### 5.3. Notification Service (Phase 2)

**Ghi chú**
- Không triển khai trong Phase 1
- Được thiết kế sẵn để mở rộng

**Chức năng tương lai**
- Gửi email báo cáo
- Tích hợp Zalo OA
- Nhắc nhở học tập

---

## 6. GIAO TIẾP GIỮA CÁC SERVICE

### 6.1. Frontend → Backend
- REST API
- JSON
- Authentication bằng token

### 6.2. Core Service → AI Service
- REST API nội bộ
- Không public ra Internet
- Có timeout & fallback logic

---

## 7. INFRASTRUCTURE (PHASE 1)

### 7.1. Tổng quan hạ tầng


```

┌─────────────┐
│ Internet │
└──────┬──────┘
▼
┌─────────────┐
│ Load │
│ Balancer │
└──────┬──────┘
▼
┌──────────────────────────────┐
│ Docker Environment │
│ │
│ - Core Service (Spring Boot) │
│ - AI Service (Python) │
│ - Web (Next.js) │
└──────────────┬───────────────┘
▼
┌──────────────────────────────┐
│ PostgreSQL Database │
└──────────────────────────────┘

┌──────────────────────────────┐
│ Object Storage (S3 compatible)│
│ - Ảnh bài Toán │
└──────────────────────────────┘

```
---

### 7.2. Công nghệ hạ tầng đề xuất

- Docker (containerization)
- PostgreSQL (main database)
- S3-compatible storage (ảnh, file)
- 1 VPC / 1 environment cho MVP

---

## 8. KHẢ NĂNG MỞ RỘNG (PHASE 2 – PHASE 3)

- Tách database khi traffic lớn
- Thêm Redis cache cho reporting
- Thêm message queue (Kafka/RabbitMQ) cho notification
- Thêm Teacher Service mà không ảnh hưởng Core Service

---

## 9. QUYẾT ĐỊNH KIẾN TRÚC QUAN TRỌNG

- Java Spring Boot là core backend
- Python chỉ dùng cho AI service
- Frontend không gọi AI trực tiếp
- Microservices vừa đủ, không over-engineering

---

## 10. TÀI LIỆU LIÊN QUAN

- ../prd/prd_mvp-2025-12-14-22-15.md
- ../user_stories/student_user_stories-2025-12-14-22-45.md
- ../user_stories/parent_user_stories-2025-12-14-23-05.md
- ../user_flows/user_onboarding_flow_phase1-2025-12-14-23-40.md
- ../technical_design/api_db_mapping_phase1-2025-12-15-00-20.md

---

## 11. LỊCH SỬ THAY ĐỔI

- 2025-12-15-01-05: Tạo mới tài liệu


---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)