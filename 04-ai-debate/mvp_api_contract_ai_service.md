# API CONTRACT – AI SERVICE (MVP)

## Sản phẩm: AI Debate (“AI cãi nhau”)

---

## 1. Mục tiêu của ai-service trong MVP

`ai-service` trong MVP **không chứa business logic**.

Vai trò duy nhất:

* Đóng vai trò **AI Gateway / Adapter**
* Nhận prompt **thuần text** từ Frontend
* Gọi tới 1 AI provider (OpenAI, Claude, Gemini, …)
* Trả về response **thuần text + metadata kỹ thuật**

`ai-service` **không chịu trách nhiệm** cho:

* Luật tranh luận
* UX state
* Round logic
* Orchestration
* Prompt design

Toàn bộ “trí tuệ sản phẩm” nằm ở **Frontend**.

---

## 2. Nguyên tắc thiết kế API (MVP)

1. **Single endpoint**
2. **Stateless**
3. **Text-in / Text-out**
4. **Frontend kiểm soát 100% prompt**
5. **Backend không chỉnh sửa prompt**
6. **Observability nhẹ, không xâm lấn logic**

---

## 3. Authentication & Security (MVP)

### 3.1. API Key nội bộ

* Dùng API key tĩnh cho MVP
* Không user-based auth

**Header bắt buộc**

```
X-API-Key: internal-api-key-12345
```

---

### 3.2. Validation

* Thiếu hoặc sai API key → `401 Unauthorized`
* Không kiểm tra nội dung prompt (MVP phase)

---

## 4. Endpoint Definition

### 4.1. Invoke AI Completion

**Endpoint**

```
POST /v1/ai/complete
```

Đây là endpoint duy nhất trong MVP.

---

## 5. Request Schema

### 5.1. Request Body (JSON)

```
{
  model: string
  prompt: string
  temperature?: number
  max_tokens?: number
}
```

---

### 5.2. Field Description

* `model` (required)
  Tên model logic (ví dụ: gpt-4.1, claude-3, gemini-pro)

* `prompt` (required)
  Prompt đã được Frontend ghép hoàn chỉnh
  Backend **không chỉnh sửa**

* `temperature` (optional)
  Default = 0.7

* `max_tokens` (optional)
  Default = 500

---

## 6. Response Schema

### 6.1. Success Response (200)

```
{
  text: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  provider: string
}
```

---

### 6.2. Ý nghĩa các field

* `text`
  Nội dung AI trả về (thuần text, không markdown đặc biệt)

* `usage`
  Metadata token usage
  **Không bắt buộc**, nhưng rất quan trọng cho MVP instrumentation

* `provider`
  AI provider thực tế đã được gọi

---

## 7. Error Responses

### 7.1. 400 – Bad Request

```
{
  error: "INVALID_REQUEST"
  message: "Missing prompt or model"
}
```

---

### 7.2. 401 – Unauthorized

```
{
  error: "UNAUTHORIZED"
  message: "Invalid API key"
}
```

---

### 7.3. 500 – AI Provider Error

```
{
  error: "AI_PROVIDER_ERROR"
  message: "Upstream AI service failed"
}
```

---

## 8. Retry & Timeout (Backend-level, kỹ thuật)

Backend config đề xuất:

```
timeout-ms: 30000
retry-attempts: 3
```

Retry **chỉ áp dụng** cho:

* Network error
* Timeout

Không retry nếu:

* Prompt invalid
* API key sai

Retry hoàn toàn **trong suốt với Frontend**.

---

## 9. MVP Instrumentation (Non-functional, OPTIONAL nhưng RẤT NÊN CÓ)

### 9.1. Mục tiêu của Instrumentation

Instrumentation trong MVP nhằm:

* Hiểu user **dùng sản phẩm như thế nào**
* Điều chỉnh:

  * Số round mặc định
  * Prompt length
  * Temperature
* Không phục vụ billing
* Không phục vụ analytics phức tạp

---

### 9.2. Những dữ liệu NÊN ghi nhận (FE-driven)

Frontend là nơi **biết ngữ cảnh**, nên FE chịu trách nhiệm log:

* Topic (raw text hoặc hash)
* Số round thực tế đã diễn ra
* Session bị Stop hay kết thúc đủ round
* User có Summarize hay không
* Thời điểm Stop (round mấy)

Backend **không cần hiểu**, chỉ cần nhận request.

---

### 9.3. Cách sử dụng `usage` từ API response

Frontend **nên**:

* Ghi nhận:

  * `prompt_tokens`
  * `completion_tokens`
  * `total_tokens`
* Map token usage với:

  * AI A / AI B / Summarizer
  * Round tương ứng

Mục đích:

* Phát hiện prompt nào quá dài
* Điều chỉnh prompt template
* Điều chỉnh temperature theo vai trò AI

---

### 9.4. Những gì KHÔNG làm trong MVP

* Không cần dashboard realtime
* Không cần phân tích user-level
* Không cần lưu full conversation cho analytics
* Không cần tracking chi tiết theo provider

Chỉ cần **log có chủ đích**, đủ để PM / dev nhìn ra xu hướng.

---

## 10. Trách nhiệm rõ ràng FE vs BE (Nhắc lại)

### Frontend chịu trách nhiệm

* Gắn metadata ngữ cảnh (round, role, action)
* Log hành vi user (Stop, Summarize, Vote)
* Phân tích replay value

---

### Backend chịu trách nhiệm

* Trả về `usage` nếu provider hỗ trợ
* Ghi log kỹ thuật (error, timeout)
* Không suy luận hành vi user

---

## 11. Explicit Non-Goals (MVP)

* Streaming
* Conversation memory
* Tool calling
* Function calling
* Rate limiting phức tạp
* User analytics sâu

---

## 12. Kết luận (PM xác nhận)

Sau khi bổ sung MVP Instrumentation:

* API Contract vẫn:

  * Gọn
  * Dễ implement
* Nhưng sản phẩm:

  * Có dữ liệu để cải thiện
  * Không “mù” sau demo
* Đúng tinh thần:

  > **Build nhanh – Quan sát đủ – Điều chỉnh sớm**