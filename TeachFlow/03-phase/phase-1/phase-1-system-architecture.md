Dưới đây là **SYSTEM ARCHITECTURE – PHASE 1 (THIN ARCHITECTURE)** cho dự án **TeachFlow**, được viết theo đúng tinh thần:

* **Phase-1-safe**
* **Không over-design**
* **Không “design cho Phase 3”**
* **Khóa quyền AI ở mức kiến trúc**

---

# SYSTEM ARCHITECTURE – PHASE 1

**TeachFlow (Thin Architecture)**

---

## I. MỤC ĐÍCH CỦA KIẾN TRÚC PHASE 1

Kiến trúc Phase 1 tồn tại để:

* Triển khai **đúng và đủ** Domain Model + API Boundary đã khóa
* **Ngăn AI vượt quyền bằng kiến trúc**, không chỉ bằng prompt
* Giữ hệ thống:

  * Dễ code
  * Dễ review
  * Dễ rollback

👉 Phase 1 **không phải** nơi để:

* Tối ưu hiệu năng
* Microservice hóa sớm
* Chuẩn bị scale lớn

---

## II. NGUYÊN TẮC KIẾN TRÚC BẤT BIẾN (PHASE 1)

1. **Teacher-controlled architecture**

   * Mọi hành động có ý nghĩa → Frontend trigger
2. **AI is a side-service**

   * Không nằm trên critical path
3. **No background intelligence**

   * Không cron AI
   * Không event-driven AI
4. **Single source of truth = Core Backend**

   * AI không ghi DB
   * AI không giữ state

---

## III. TỔNG QUAN KIẾN TRÚC (HIGH-LEVEL)

```
[ Web Frontend ]
        |
        v
[ Core Backend API ]
        |
        +-------------------+
        |                   |
        v                   v
[ Relational DB ]     [ AI Service ]
                         |
                         v
                     [ LLM Provider ]
```

**Luồng quyền lực:**

```
Teacher → UI → Core Backend → (optional) AI Service
```

👉 **Không tồn tại luồng:**
AI → Backend
AI → DB
AI → UI action

---

## IV. CÁC THÀNH PHẦN CHÍNH

---

### 1. Web Frontend (Teacher Web App)

**Vai trò:**

* Điểm duy nhất giáo viên tương tác
* Nơi thực thi **Human-in-the-Loop**

**Trách nhiệm:**

* Render UI theo UI-Spec Skeleton
* Gọi API tương ứng từng bước Flow A–B–C
* Hiển thị rõ:

  * Nội dung AI gợi ý
  * Nội dung do giáo viên nhập

**Frontend TUYỆT ĐỐI KHÔNG:**

* Tự gọi AI trực tiếp
* Tự lưu AI output
* Tự quyết định state chuyển đổi

👉 Frontend **không thông minh**, chỉ **tuân thủ flow**.

---

### 2. Core Backend (Monolithic – Phase 1)

**Vai trò:**

* Trung tâm nghiệp vụ duy nhất
* Chủ sở hữu toàn bộ dữ liệu

**Chịu trách nhiệm:**

* Authentication (teacher)
* Authorization (teacher-owned data)
* Business rules theo Phase 1 Law
* Persistence (DB)

**Core Backend BAO GỒM các module logic:**

#### 2.1. Class Module

* Class
* Student (minimal)

#### 2.2. Exercise Module

* Exercise draft
* Approve logic (teacher-only)

#### 2.3. Assignment Module

* Assign exercise
* Usage context

#### 2.4. Result & Comment Module

* Save result
* Save comment
* Không analytics

#### 2.5. AI Orchestration (VERY THIN)

* Nhận request từ FE
* Gọi AI Service
* Trả text về FE
* **Không lưu DB**

---

### 3. Relational Database (Single DB)

**Vai trò:**

* Lưu **data cuối đã được teacher xác nhận**

**Nguyên tắc:**

* Không lưu:

  * AI draft chưa confirm
  * AI suggestion chưa chỉnh sửa
* Không trigger logic ngầm

👉 DB là **passive storage**, không intelligence.

---

### 4. AI Service (Isolated, Stateless)

**Vai trò duy nhất:**
👉 **Sinh text theo yêu cầu cụ thể**

**AI Service ĐƯỢC PHÉP:**

* Generate exercise draft (Flow B)
* Suggest comment wording (Flow C)

**AI Service TUYỆT ĐỐI KHÔNG:**

* Ghi DB
* Giữ session state
* Quyết định logic
* Chain nhiều bước

**Đặc điểm kiến trúc:**

* Stateless
* Input rõ ràng
* Output text thuần

👉 AI Service **luôn ở thế bị động**.

---

## V. LUỒNG DỮ LIỆU THEO FLOW (RẤT QUAN TRỌNG)

---

### Flow A – Class Setup

```
Teacher
 → Frontend
   → Core Backend
     → DB
```

* Không AI
* Không side effect

---

### Flow B – Exercise Creation

**Tạo với AI:**

```
Teacher
 → Frontend
   → Core Backend
     → AI Service
       → LLM
     ← AI text
   ← Draft text
```

**Lưu bài:**

```
Teacher confirm
 → Frontend
   → Core Backend
     → DB
```

👉 AI **không bao giờ** chạm DB.

---

### Flow C – Exercise Usage

**Gợi ý nhận xét:**

```
Teacher request
 → Frontend
   → Core Backend
     → AI Service
     ← Suggested text
   ← Display
```

**Lưu kết quả / nhận xét:**

```
Teacher confirm
 → Frontend
   → Core Backend
     → DB
```

---

## VI. NHỮNG THỨ CỐ TÌNH KHÔNG CÓ TRONG KIẾN TRÚC PHASE 1

| Thành phần        | Lý do                    |
| ----------------- | ------------------------ |
| Message Queue     | Không async intelligence |
| Background Job AI | Vi phạm human-in-loop    |
| Event sourcing    | Overkill                 |
| Analytics Service | Ngoài scope              |
| Cache phức tạp    | Chưa cần                 |
| Microservices     | Phase 1 không scale      |

---

## VII. ĐIỂM KHÓA AI Ở MỨC KIẾN TRÚC

AI bị **chặn quyền** tại 4 lớp:

1. **Không có credential DB**
2. **Không có API ghi dữ liệu**
3. **Không có quyền gọi API nghiệp vụ**
4. **Không được trigger flow**

👉 Dù prompt sai, **kiến trúc vẫn giữ an toàn**.

---

## VIII. CHECKLIST REVIEW KIẾN TRÚC (PASS / FAIL)

Kiến trúc này:

* [x] Teacher là trung tâm quyết định
* [x] AI không nằm trên critical path
* [x] Không có automation ngầm
* [x] Không có analytics trá hình
* [x] Có thể code ngay không cần diễn giải thêm

👉 **PASS – Phase 1 Architecture Approved**

---

## IX. KẾT LUẬN CHỐT PHASE 1 ARCHITECTURE

* Đây là **kiến trúc mỏng nhất có thể** mà vẫn:

  * An toàn
  * Đúng luật
  * Dùng được thực tế
* Mọi mở rộng:

  * Chỉ được phép ở Phase 2+
  * Phải quay lại Law review

---
