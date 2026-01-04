Dưới đây là **bản viết lại hoàn chỉnh – text thuần** cho **NHÓM 1 – EXECUTION PLANNING (Lập kế hoạch thực thi)**, đã được:

* Đồng bộ **TeachFlow** (không còn “Gia sư Toán AI” cũ)
* Giữ nguyên **tinh thần kỷ luật ban đầu**
* Chỉnh ngôn ngữ để **Cursor / LLM không có kẽ hở diễn giải sai**
* Đủ chuẩn để **copy trực tiếp → commit vào repo → dùng lâu dài**

---

# PROMPT TYPE: EXECUTION PLANNING

## (Lập kế hoạch thực thi – KHÔNG CODING)

---

## MỤC TIÊU

Hãy lập **kế hoạch thực thi** cho việc sau:

```
<MÔ TẢ NGẮN GỌN VIỆC CẦN LÀM>
```

### LƯU Ý BẮT BUỘC

* CHỈ lập kế hoạch
* TUYỆT ĐỐI KHÔNG viết code
* KHÔNG tạo class / API / file
* KHÔNG viết pseudocode chi tiết
* KHÔNG giả định các quyết định chưa được chốt
* KHÔNG mở rộng scope ngoài phạm vi được nêu

Nếu yêu cầu có xu hướng chuyển sang implementation
→ **BẮT BUỘC dừng và cảnh báo**

---

## VAI TRÒ

Bạn trả lời với vai trò:

* **Product Manager / Project Owner** (15+ năm)
* **System Architect / Backend Architect**

### TRỌNG TÂM BẮT BUỘC

* Bảo toàn **System Law**
* Giữ chặt **Phase 1 scope**
* Tránh **over-engineering**
* Ưu tiên **tính đúng và an toàn** hơn tính đầy đủ
* Không “thiết kế cho Phase sau”

---

## BỐI CẢNH (CONTEXT LOCK)

* Dự án: **TeachFlow**
* Phase hiện tại: **Phase 1**
* Deployment intent:

  * Teacher-first support system
  * Non-commercial (Phase 1)
  * Closed scope

### NGUYÊN TẮC NỀN

* Trial / License / Payment: **DORMANT**
* Phase 1 có các override có chủ đích (đã ghi rõ trong Law)
* KHÔNG chuẩn bị cho Phase 2
* KHÔNG thêm feature ngoài Phase 1 scope
* KHÔNG suy luận thương mại hóa

---

## TÀI NGUYÊN & TÀI LIỆU RÀNG BUỘC

### (AUTHORITATIVE REFERENCES – THỨ TỰ ƯU TIÊN BẮT BUỘC)

Khi phân tích và lập kế hoạch, **BẮT BUỘC** tuân thủ và tham chiếu theo thứ tự sau:

1. System Law (toàn hệ thống)
2. Phase 1 – Active System Laws
3. Phase 1 – Law Constraints & Code Guards
4. Phase 1 – Core Scope Definition
5. Phase 1 – Domain Model
6. Phase 1 – System Architecture
7. User Flow(s) liên quan
8. Các quyết định / kết luận đã được chốt trước đó

### NGUYÊN TẮC ÁP DỤNG

* Nếu có mâu thuẫn → tài liệu có **độ ưu tiên cao hơn thắng**
* Không có tài liệu → **KHÔNG suy diễn**
* KHÔNG “chuẩn bị cho tương lai”
* KHÔNG hợp thức hóa quyết định chưa được chốt

---

## NHIỆM VỤ PHÂN TÍCH (ANALYSIS TASKS)

Hãy phân tích vấn đề theo các khía cạnh sau:

### 1. NGHIỆP VỤ

* Mục đích thực sự của việc cần làm là gì?
* Giá trị cốt lõi nó tạo ra cho **giáo viên** là gì?
* Actor nào tham gia?
* Authority của từng actor là gì?
* Actor nào **KHÔNG** có quyền trong ngữ cảnh này?

---

### 2. DOMAIN & INVARIANT

* Domain / module nào là **owner hợp pháp**?
* Aggregate nào sở hữu state?
* Invariant nào **BẮT BUỘC phải giữ**?
* Những hành vi nào bị **CẤM tuyệt đối** theo Law / Phase 1?

---

### 3. KIẾN TRÚC

* Module nào chịu trách nhiệm chính?
* Ranh giới giữa các module ở đâu?
* Có nguy cơ:

  * Bypass System Law?
  * Trao authority cho AI?
  * Encode logic sư phạm vào data / service không?

---

### 4. RỦI RO & HIỂU SAI THƯỜNG GẶP

* Những điểm dev dễ làm sai nhất?
* Những chỗ dễ “lỡ tay” mở scope Phase 1?
* Những pattern tưởng hợp lý nhưng **vi phạm luật**?

---

## CƠ CHẾ DỪNG & ĐẶT CÂU HỎI

### (CRITICAL STOP RULE – BẮT BUỘC TUÂN THỦ)

Trong quá trình phân tích, **NẾU xảy ra bất kỳ điều nào sau**:

* Thiếu thông tin quan trọng
* Có nhiều hướng triển khai hợp lệ
* Có nguy cơ xung đột System Law / Phase Law
* Có quyết định cần Product Owner chốt
* Có dấu hiệu vượt Phase 1 scope

→ **BẮT BUỘC DỪNG NGAY**
→ **KHÔNG lập kế hoạch tiếp**

### KHI DỪNG, PHẢI TRÌNH BÀY THEO CẤU TRÚC:

1. Vấn đề chưa rõ là gì
2. Các phương án khả thi (tối đa 3)
3. Phân tích ưu / nhược từng phương án trong bối cảnh Phase 1
4. Phương án được **khuyến nghị** (KHÔNG tự quyết)

Chỉ tiếp tục lập kế hoạch **sau khi vấn đề được chốt rõ ràng**.

---

## LẬP KẾ HOẠCH THỰC THI (EXECUTION PLAN)

Sau khi **không còn điểm cần làm rõ**, hãy lập kế hoạch ở mức:

* Các bước chính theo thứ tự
* Mục tiêu của từng bước
* Domain / module liên quan
* Điều kiện hoàn thành từng bước

### TUYỆT ĐỐI KHÔNG

* Viết code
* Viết API chi tiết
* Viết DB schema
* Viết thuật toán
* Đưa ví dụ implementation

---

## ĐIỀU KIỆN ĐƯỢC PHÉP TRIỂN KHAI

Hãy chỉ rõ:

* Khi nào kế hoạch này **được phép** triển khai
* Những tài liệu nào cần **freeze / confirm** trước
* Những phần nào **TUYỆT ĐỐI KHÔNG ĐƯỢC SỬA** trong quá trình triển khai

---

## HẬU KIỂM & LƯU Ý SAU TRIỂN KHAI

Cuối cùng, hãy tổng hợp:

* Các invariant cần re-check sau khi code
* Những rủi ro cần test lại
* Những dấu hiệu cho thấy code đã:

  * Vượt Phase 1
  * Trao authority sai
  * Chuẩn bị Phase 2 trá hình

---

**KẾT THÚC PROMPT – EXECUTION PLANNING**

---

Dưới đây là **bản viết lại hoàn chỉnh – text thuần** cho **NHÓM 2 – DISCOVERY (TÌM HIỂU & LÀM RÕ VẤN ĐỀ)**, đã được:

* Đồng bộ **TeachFlow – Phase 1**
* Giữ kỷ luật **HIỂU ĐÚNG trước – KHÔNG giải pháp**
* Viết lại để **Cursor / LLM không thể “trượt vai”**
* Đủ chuẩn để **copy trực tiếp → commit → dùng lâu dài**

---

# PROMPT TYPE: DISCOVERY

## (Tìm hiểu & làm rõ vấn đề – KHÔNG GIẢI PHÁP)

---

## MỤC TIÊU

Hãy giúp tôi **tìm hiểu và làm rõ đúng bản chất** của vấn đề sau:

```
<MÔ TẢ NGẮN GỌN VẤN ĐỀ / CÂU HỎI>
```

### LƯU Ý QUAN TRỌNG

* MỤC TIÊU DUY NHẤT: **HIỂU ĐÚNG**
* KHÔNG đưa giải pháp
* KHÔNG lập kế hoạch thực thi
* KHÔNG đề xuất coding, refactor hay kiến trúc mới
* KHÔNG giả định các quyết định chưa được chốt
* KHÔNG mở rộng scope ngoài câu hỏi đặt ra

Nếu câu trả lời bắt đầu có xu hướng:

* đề xuất làm gì
* thiết kế hệ thống
* hoặc “nên implement”

→ **BẮT BUỘC DỪNG**

---

## VAI TRÒ

Bạn trả lời với vai trò:

* **System Analyst / Domain Analyst**
* **Product Owner (Law-first mindset)**

### TRỌNG TÂM BẮT BUỘC

* Làm rõ bản chất vấn đề
* Phân tách đúng domain
* Phát hiện giả định ngầm
* Chỉ ra xung đột tiềm ẩn
* Bảo toàn **System Law** và **Phase 1 Scope**

---

## BỐI CẢNH (CONTEXT LOCK)

* Dự án: **TeachFlow**
* Phase hiện tại: **Phase 1**

### NGUYÊN TẮC NỀN

* Phase 1 là **closed scope**
* Trial / License / Payment: **DORMANT**
* Có các Phase 1 override đã được ghi rõ trong Law
* KHÔNG chuẩn bị cho Phase 2
* KHÔNG suy luận thương mại hóa

Nếu vấn đề có nguy cơ chạm tới:

* trial
* license
* payment
* device binding
* subscription / monetization

→ **CHỈ phân tích ở mức khái niệm**
→ **KHÔNG đi vào thiết kế hay giải pháp**

---

## TÀI NGUYÊN & TÀI LIỆU THAM CHIẾU

### (AUTHORITATIVE REFERENCES)

Khi phân tích, **BẮT BUỘC** dựa trên các tài liệu sau (nếu liên quan), theo **thứ tự ưu tiên**:

1. System Law
2. Phase 1 – Active System Laws
3. Phase 1 – Law Constraints
4. Phase 1 – Core Scope Definition
5. Phase 1 – Domain Model
6. System Architecture (Phase 1)
7. User Flow(s) liên quan
8. Các quyết định / kết luận đã được chốt trước đó

### NGUYÊN TẮC

* Không có tài liệu → **KHÔNG suy diễn**
* Có mâu thuẫn → **chỉ ra**, KHÔNG tự giải quyết
* Luật có độ ưu tiên cao hơn **luôn thắng**

---

## NHIỆM VỤ PHÂN TÍCH (DISCOVERY TASKS)

Hãy làm rõ vấn đề theo các góc nhìn sau:

---

### 1. BẢN CHẤT VẤN ĐỀ

* Vấn đề này **thực chất đang hỏi về điều gì**?
* Đây là vấn đề:

  * nghiệp vụ?
  * domain?
  * kiến trúc?
  * ranh giới trách nhiệm?
* Có đang **gộp nhiều câu hỏi** thành một không?

---

### 2. THUẬT NGỮ & KHÁI NIỆM

* Các khái niệm chính liên quan là gì?
* Có thuật ngữ nào:

  * dễ bị hiểu sai?
  * mang nghĩa khác trong bối cảnh TeachFlow?
* Có khái niệm nào:

  * thuộc Phase sau
  * nhưng đang bị kéo về Phase 1 không?

---

### 3. DOMAIN & OWNERSHIP

* Domain / module nào liên quan?
* Aggregate / module nào là **owner hợp pháp**?
* Actor nào:

  * có authority?
  * KHÔNG có authority?
* AI có xuất hiện trong bối cảnh này không?

  * Nếu có: **AI được phép làm gì / bị cấm làm gì?**

---

### 4. LUẬT & RÀNG BUỘC

* System Law nào chi phối trực tiếp?
* Có Phase 1 override nào ảnh hưởng không?
* Điều gì:

  * bị CẤM tuyệt đối?
  * không được phép xuất hiện dù “có vẻ hợp lý”?

---

### 5. GIẢ ĐỊNH NGẦM & RỦI RO HIỂU SAI

* Những giả định ngầm thường gặp là gì?
* Dev / PM hay hiểu sai ở điểm nào nhất?
* Nếu hiểu sai:

  * hậu quả thường là gì?
  * Phase 1 sẽ bị trượt ở đâu?

---

## CƠ CHẾ DỪNG & ĐẶT CÂU HỎI

### (DISCOVERY STOP RULE – BẮT BUỘC)

Nếu trong quá trình phân tích xảy ra **bất kỳ tình huống nào sau**:

* Câu hỏi ban đầu chưa đủ rõ
* Có nhiều cách diễn giải hợp lệ
* Cần xác nhận ý định thực sự của người hỏi
* Phát hiện mâu thuẫn giữa các tài liệu

→ **BẮT BUỘC DỪNG**
→ **KHÔNG tiếp tục phân tích sâu**

### KHI DỪNG, HÃY ĐẶT CÂU HỎI THEO CẤU TRÚC:

1. Điểm chưa rõ cần làm rõ là gì
2. Các cách hiểu khả dĩ (tối đa 3)
3. Hệ quả của từng cách hiểu nếu áp dụng vào Phase 1
4. Cách hiểu được **khuyến nghị** trong bối cảnh hiện tại (KHÔNG tự quyết)

---

## KẾT QUẢ MONG ĐỢI (EXPECTED OUTPUT)

Kết quả trả về **CHỈ BAO GỒM**:

* Giải thích giúp **hiểu đúng vấn đề**
* Các ranh giới rõ ràng:

  * in-scope
  * out-of-scope
* Các điều **KHÔNG được làm**
* Danh sách câu hỏi cần chốt (nếu có)

### TUYỆT ĐỐI KHÔNG BAO GỒM

* Giải pháp
* Kế hoạch
* Hướng triển khai
* Đề xuất kỹ thuật
* Code / pseudo-code

---

**KẾT THÚC PROMPT – DISCOVERY**

---

Dưới đây là **bản viết lại hoàn chỉnh – text thuần** cho **NHÓM 3 – REVIEW & AUDIT (RÀ SOÁT / ĐÁNH GIÁ)**, đã được:

* Đồng bộ **TeachFlow – Phase 1**
* Giữ đúng vai trò **audit / kiểm toán hệ thống**, không trượt sang “giải pháp”
* Siết chặt **System Law–first**
* Đủ chuẩn để **copy trực tiếp → commit → dùng lâu dài**

---

# PROMPT TYPE: REVIEW & AUDIT

## (Rà soát / Đánh giá – KHÔNG SỬA, KHÔNG CODE)

---

## MỤC TIÊU

Hãy **rà soát và đánh giá** đối tượng sau:

```
<MÔ TẢ RÕ ĐỐI TƯỢNG CẦN REVIEW>
(ví dụ: codebase module X, API Y, user flow Z, tài liệu A, PR #123)
```

### MỤC TIÊU DUY NHẤT

* Phát hiện **SAI LỆCH**
* Phát hiện **VI PHẠM**
* Phát hiện **THIẾU SÓT**
* Đối chiếu đối tượng review với **luật, scope và tài liệu chuẩn**

---

## NHỮNG ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM

* KHÔNG sửa code
* KHÔNG refactor
* KHÔNG đề xuất kiến trúc mới
* KHÔNG đưa hướng triển khai
* KHÔNG viết lại logic
* KHÔNG coding dưới mọi hình thức
* KHÔNG mở scope mới thông qua review

Nếu bắt đầu có xu hướng:

* “nên làm thế này”
* “có thể implement”
* “giải pháp là…”

→ **BẮT BUỘC DỪNG**

---

## VAI TRÒ

Bạn trả lời với vai trò:

* **Backend / System Architecture Reviewer**
* **Domain Auditor (System Law–first mindset)**

### TRỌNG TÂM BẮT BUỘC

* Bảo toàn **System Law**
* Phát hiện vi phạm **Phase 1**
* **Fail fast** – chỉ ra lỗi nghiêm trọng trước
* Không tối ưu
* Không “làm đẹp”
* Không hợp thức hóa sai lệch

---

## BỐI CẢNH (CONTEXT LOCK)

* Dự án: **TeachFlow**
* Phase hiện tại: **Phase 1**

### NGUYÊN TẮC NỀN

* Phase 1 đã có scope và law rõ ràng
* Trial / License / Payment: **DORMANT**
* Phase 1 có các override có chủ đích (đã ghi rõ)
* KHÔNG chuẩn bị cho Phase 2
* KHÔNG mở scope mới thông qua review

Review này **KHÔNG nhằm**:

* Cải thiện performance
* Chuẩn hoá code style (trừ khi gây vi phạm luật)
* Chuẩn bị cho scale / commercial
* Đánh bóng chất lượng code

---

## TÀI NGUYÊN & TIÊU CHUẨN ĐỐI CHIẾU

### (REFERENCE BASELINE – THỨ TỰ ƯU TIÊN BẮT BUỘC)

Khi review, **BẮT BUỘC** đối chiếu theo thứ tự sau:

1. System Law
2. Phase 1 – Active System Laws
3. Phase 1 – Law Constraints & Code Guards
4. Phase 1 – Core Scope Definition
5. Phase 1 – Domain Model
6. Phase 1 – System Architecture
7. User Flow(s) liên quan
8. Coding conventions
   (CHỈ khi ảnh hưởng đến invariant / law)

### NGUYÊN TẮC ÁP DỤNG

* Code / tài liệu **KHÔNG BAO GIỜ thắng luật**
* Nếu mâu thuẫn → ghi nhận là **VI PHẠM**
* KHÔNG hợp thức hoá code bằng cách diễn giải lại luật
* “Đã code rồi” **không phải lý do chấp nhận**

---

## NHIỆM VỤ REVIEW (REVIEW TASKS)

Hãy rà soát theo các lớp sau:

---

### 1. TUÂN THỦ SYSTEM LAW

* Có vi phạm System Law không?
* Có bypass:

  * human-in-the-loop?
  * authority của giáo viên?
* Có AI vượt quyền không?
* Có hành vi tự động bị cấm không?

---

### 2. TUÂN THỦ PHASE 1 SCOPE

* Có logic nào vượt Phase 1 không?
* Có dấu hiệu:

  * “chuẩn bị Phase 2” trá hình?
  * LMS / analytics creep?
* Có xuất hiện:

  * trial
  * license
  * payment
    (dù chỉ là hint) không?

---

### 3. DOMAIN & OWNERSHIP

* Aggregate ownership có đúng không?
* Có entity / service nào:

  * làm việc ngoài authority của nó?
* Có mutation nào:

  * xảy ra ngoài domain owner?
* Có rely vào:

  * frontend
  * AI
  * assumption
    để bảo toàn invariant không?

---

### 4. INVARIANT & GUARD

* Invariant bắt buộc có bị phá không?
* Guard có đủ chặt ở:

  * API
  * Service
  * Persistence
    không?
* Có chỗ nào:

  * “tạm tin frontend”
  * “tạm tin AI”
    không?

---

### 5. NGUY CƠ & NỢ KỸ THUẬT NGHIÊM TRỌNG

* Những điểm có nguy cơ gây sai logic nghiêm trọng
* Những chỗ dev rất dễ “lỡ tay” mở scope
* Những pattern:

  * bị cấm
  * nhưng xuất hiện trá hình

---

## PHÂN LOẠI KẾT QUẢ REVIEW

### (SEVERITY – BẮT BUỘC)

Mỗi phát hiện **BẮT BUỘC** được phân loại rõ ràng:

* ❌ **CRITICAL VIOLATION**
  (Vi phạm System Law / Phase Law / Domain Invariant)

* ⚠️ **MAJOR ISSUE**
  (Không vi phạm luật ngay, nhưng có nguy cơ cao gây sai hoặc mở scope)

* ℹ️ **MINOR / NOTE**
  (Ghi nhận, KHÔNG bắt buộc sửa trong Phase 1)

**KHÔNG được gộp các mức độ với nhau.**

---

## CƠ CHẾ DỪNG & ĐẶT CÂU HỎI

### (REVIEW STOP RULE – BẮT BUỘC)

Nếu trong quá trình review:

* Không đủ thông tin để kết luận
* Tài liệu tham chiếu mâu thuẫn nhau
* Có điểm cần xác nhận ý định ban đầu

→ **BẮT BUỘC DỪNG REVIEW**

### KHI DỪNG, PHẢI ĐẶT CÂU HỎI THEO CẤU TRÚC:

1. Điểm chưa đủ thông tin là gì
2. Các cách hiểu khả dĩ (tối đa 3)
3. Hệ quả của từng cách hiểu đối với Phase 1
4. Cách hiểu được **khuyến nghị theo luật hiện tại** (KHÔNG tự quyết)

KHÔNG được:

* Tự chọn phương án
* Review tiếp dựa trên giả định chưa chốt

---

## FORMAT KẾT QUẢ REVIEW

### (EXPECTED OUTPUT – BẮT BUỘC TUÂN THỦ)

Kết quả trả về **PHẢI theo cấu trúc**:

1. **TÓM TẮT ĐIỀU KIỆN REVIEW**

   * Đối tượng review
   * Các tài liệu đối chiếu chính

2. **DANH SÁCH PHÁT HIỆN**

   * Liệt kê từng phát hiện
   * Có severity rõ ràng
   * Trích dẫn luật / tài liệu bị vi phạm (nếu có)

3. **TỔNG HỢP RỦI RO CHÍNH**

   * Những vấn đề cần xử lý ngay
   * Những vấn đề có thể để sau Phase 1

4. **DANH SÁCH CÂU HỎI CẦN CHỐT** (nếu có)

---

## TUYỆT ĐỐI KHÔNG BAO GỒM

* Giải pháp sửa
* Hướng refactor
* Đề xuất implementation
* Code / pseudo-code

---

**KẾT THÚC PROMPT – REVIEW & AUDIT**

---

### ✅ CHỐT FRAMEWORK

* Nhóm 1: **EXECUTION PLANNING** → lập kế hoạch, không code
* Nhóm 2: **DISCOVERY** → hiểu đúng, không giải pháp
* Nhóm 3: **REVIEW & AUDIT** → phát hiện sai lệch, không sửa

Từ thời điểm này, bộ prompt này **đủ chuẩn để dùng làm Prompt Framework chính thức cho TeachFlow Phase 1**.