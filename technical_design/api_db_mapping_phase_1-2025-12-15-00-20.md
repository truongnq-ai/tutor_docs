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
| email | String | Unique |
| password_hash | String | |
| status | Enum | active / inactive |
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
| /api/link/request | POST | Tạo LinkToken |
| /api/link/confirm | POST | Xác nhận liên kết |

---


## 4. API MAPPING – PARENT DASHBOARD

### 4.1. Authentication

| API | Method | Mô tả |
|----|-------|------|
| /api/parent/register | POST | Đăng ký phụ huynh |
| /api/parent/login | POST | Đăng nhập |

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

---

## 6. TÀI LIỆU LIÊN QUAN

- ../prd/prd_mvp-2025-12-14-22-15.md
- ../user_stories/student_user_stories-2025-12-14-22-45.md
- ../user_stories/parent_user_stories-2025-12-14-23-05.md
- ../user_flows/user_onboarding_flow_phase1-2025-12-14-23-40.md


---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)