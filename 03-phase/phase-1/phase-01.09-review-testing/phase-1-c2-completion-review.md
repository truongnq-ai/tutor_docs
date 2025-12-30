# Phase 1 – C2 Completion Review Report

**Project:** Tutor  
**Document type:** Architecture Review  
**Audience:** Senior System Architect | Backend Reviewer | Technical PM  
**Status:** REVIEW COMPLETED  
**Version:** 1.0  
**Review Date:** 2024  
**Reviewer:** Senior System Architect / Backend Reviewer

[← Quay lại Overview](../../README.md)

---

## I. TÓM TẮT TỔNG QUAN

### Kết quả: **PASS WITH NOTES**

**Đánh giá tổng thể:**
- Code đã tuân thủ phần lớn System Law và Phase 1 constraints
- Kiến trúc domain rõ ràng, phân tách trách nhiệm hợp lý
- Có một số vấn đề cần xử lý trước khi freeze C2

**Điều kiện freeze C2:**
- ✅ **CÓ THỂ FREEZE** sau khi xử lý các vấn đề được liệt kê dưới đây
- ⚠️ **KHÔNG THỂ SANG D1/D2/D3** cho đến khi các vấn đề nghiêm trọng được giải quyết

---

## II. DANH SÁCH VẤN ĐỀ PHÁT HIỆN

### 1. ❌ VI PHẠM PHASE 1 SCOPE – Trial Config trong application.yml

**Mô tả:**
File `tutor-core-service/src/main/resources/application.yml` chứa config cho trial:
```yaml
trial:
  duration:
    days: 7
  licence:
    max:
      devices: 3
```

**Phân tích:**
- **Sai so với tài liệu:** `phase-1-law-constraints.md` Section 2.1 quy định TUYỆT ĐỐI KHÔNG có trial state, trial config, trial counter
- **Rủi ro:** 
  - Dev có thể vô tình sử dụng config này
  - Code review sau này có thể hiểu nhầm Phase 1 có trial
  - Vi phạm nguyên tắc "Phase 1 không chuẩn bị Phase 2"

**Khuyến nghị:**
- **XÓA NGAY** toàn bộ section `trial:` trong `application.yml` và `application-dev.yml`, `application-production.yml`
- Không được để lại comment "for future use"
- Nếu config này là của Cloudinary (dựa trên tên biến `CLOUDINARY_RETENTION_TUTOR_MODE_TRIAL`), cần đổi tên hoặc tách riêng

**Mức độ:** 🔴 **CRITICAL** – Phải sửa trước khi freeze

---

### 2. ⚠️ RACE CONDITION TIỀM ẨN – Completion Rule Check

**Mô tả:**
Trong `PracticeServiceImpl.submitPractice()` (line 176-182):
```java
long submittedPracticeCount = practiceRepository.countByChapterProgressId(chapterProgress.getId());
if (submittedPracticeCount == 1) {
    chapterProgressService.markCompleted(studentId, chapterProgress.getChapterId());
}
```

**Phân tích:**
- **Vấn đề:** Nếu 2 practice được submit đồng thời cho cùng 1 chapter, cả 2 có thể thấy `count == 1` và cả 2 đều gọi `markCompleted()`
- **Rủi ro:**
  - Multiple completion calls (mặc dù có FSM guard ở `ChapterProgress.complete()`)
  - Log confusion
  - Potential transaction rollback nếu có conflict

**Khuyến nghị:**
- **Option 1 (Recommended):** Sử dụng database-level constraint hoặc unique index để đảm bảo chỉ 1 chapter IN_PROGRESS per student, và dùng `SELECT FOR UPDATE` khi check completion
- **Option 2:** Check completion rule TRƯỚC khi save practice (check count of existing submitted practices), nhưng cần cẩn thận với transaction boundary
- **Option 3:** Dùng optimistic locking hoặc database trigger để đảm bảo atomicity

**Mức độ:** 🟡 **MEDIUM** – Nên sửa nhưng không block freeze nếu có FSM guard đủ mạnh

---

### 3. ⚠️ AI RETRY LOGIC – Có thể ảnh hưởng Business Correctness

**Mô tả:**
Trong `AIServiceClientImpl.scorePractice()` (line 49-56):
```java
.retryWhen(Retry.fixedDelay(aiServiceProperties.getRetryAttempts(), Duration.ofSeconds(1))
    .filter(throwable -> {
        if (throwable instanceof WebClientResponseException e) {
            return e.getStatusCode().is5xxServerError();
        }
        return throwable instanceof java.util.concurrent.TimeoutException;
    }))
```

**Phân tích:**
- **Vấn đề:** Retry logic chỉ filter 5xx và timeout, nhưng không có giới hạn tổng thời gian
- **Rủi ro:**
  - Nếu AI service chậm, có thể block practice submission quá lâu
  - Student experience bị ảnh hưởng
  - Không tuân thủ "AI failure không được block learning runtime" (theo roadmap C2)

**Khuyến nghị:**
- **Thêm timeout tổng thể** cho toàn bộ retry operation (ví dụ: max 3 seconds total)
- **Giảm số lần retry** xuống 1-2 lần thay vì dùng `aiServiceProperties.getRetryAttempts()` (có thể là 3+)
- **Đảm bảo fallback** luôn được trigger nếu AI timeout/quá thời gian

**Mức độ:** 🟡 **MEDIUM** – Nên sửa để đảm bảo user experience

---

### 4. ✅ COMPLETION RULE – Logic đúng nhưng cần clarify

**Mô tả:**
Completion rule được implement đúng theo Phase 1: "first practice hợp lệ → COMPLETED"

**Phân tích:**
- ✅ Logic đúng: Check count sau khi save practice
- ✅ Gọi đúng service: `chapterProgressService.markCompleted()` (C1 domain logic)
- ✅ Có comment rõ ràng về completion rule Phase 1

**Khuyến nghị:**
- **Không cần sửa**, nhưng nên thêm comment rõ hơn về việc "hợp lệ" nghĩa là gì (có phải chỉ cần submitted, hay cần isCorrect = true?)
- Theo roadmap: "Practice đầu tiên hợp lệ" → nên clarify: chỉ cần submitted, hay cần correct?

**Mức độ:** 🟢 **INFO** – Chỉ cần clarify, không cần sửa code

---

### 5. ✅ DOMAIN OWNERSHIP – Phân tách đúng

**Phân tích:**
- ✅ `ChapterProgress` là Aggregate Root, có FSM guard rõ ràng
- ✅ `PracticeService` không trực tiếp update `chapter_state`, mà gọi `ChapterProgressService`
- ✅ `SkillMasteryService` chỉ update reference data, không dùng cho decision
- ✅ AI Service chỉ scoring, không quyết định progression

**Khuyến nghị:**
- **Không cần sửa** – Domain ownership được tuân thủ tốt

**Mức độ:** 🟢 **PASS**

---

### 6. ✅ PRACTICE LOGIC – Invariant rõ ràng

**Phân tích:**
- ✅ `Practice.submit()` có guard chống submit multiple lần (`if (this.submittedAt != null)`)
- ✅ Exercise snapshot được tạo đúng nghĩa (JSONB snapshot của exercise tại thời điểm tạo practice)
- ✅ Practice luôn gắn với `chapter_progress_id`, không thể orphan

**Khuyến nghị:**
- **Không cần sửa**

**Mức độ:** 🟢 **PASS**

---

### 7. ✅ SKILL MASTERY – Đúng Phase 1 Scope

**Phân tích:**
- ✅ Mastery chỉ là reference data (có comment rõ ràng trong code)
- ✅ Update rule đúng Phase 1: +5-8 nếu correct, -5-10 nếu incorrect
- ✅ Không dùng mastery cho completion decision
- ✅ Không có mastery threshold logic

**Khuyến nghị:**
- **Không cần sửa**

**Mức độ:** 🟢 **PASS**

---

### 8. ✅ AI INTEGRATION – Boundary rõ ràng

**Phân tích:**
- ✅ AI Service chỉ trả về `isCorrect`, không trả về mastery percentage, unlock suggestion, completion suggestion
- ✅ Core Service có fallback logic khi AI fail
- ✅ AI không có authority để update state
- ✅ Input contract đúng: chỉ có exercise snapshot, answer, skillId, grade (không có mastery bucket, permission snapshot)

**Khuyến nghị:**
- **Không cần sửa**

**Mức độ:** 🟢 **PASS**

---

### 9. ✅ DATABASE & TRANSACTION – Boundary rõ

**Phân tích:**
- ✅ `@Transactional` được dùng đúng chỗ
- ✅ Transaction boundary rõ: `submitPractice()` là 1 transaction
- ✅ Có unique constraint cho `(student_id, chapter_id)` trong `chapter_progress`
- ⚠️ Chưa có DB-level constraint để enforce "chỉ 1 IN_PROGRESS per student" (hiện chỉ enforce ở code)

**Khuyến nghị:**
- **Nên thêm** partial unique index hoặc check constraint ở DB level để enforce "chỉ 1 IN_PROGRESS per student"
- Nhưng không block freeze nếu code-level guard đủ mạnh

**Mức độ:** 🟡 **LOW** – Nice to have, không block

---

### 10. ✅ CODING & READABILITY – Code rõ ràng

**Phân tích:**
- ✅ Code có comment đầy đủ
- ✅ Method names rõ ràng
- ✅ Logic không ẩn trong if statement
- ✅ Exception handling rõ ràng

**Khuyến nghị:**
- **Không cần sửa**

**Mức độ:** 🟢 **PASS**

---

## III. CÁC ĐIỂM CẦN CHỐT VỚI USER

### Câu hỏi 1: Completion Rule "Practice hợp lệ"

**Câu hỏi:**
Theo roadmap C2, completion rule là "Practice đầu tiên hợp lệ". Code hiện tại check `submittedPracticeCount == 1` (chỉ cần submitted, không cần correct).

**Các phương án:**
1. **Giữ nguyên:** Chỉ cần practice được submit (dù đúng hay sai) → chapter COMPLETED
2. **Yêu cầu correct:** Chỉ khi practice đầu tiên có `isCorrect = true` → chapter COMPLETED
3. **Yêu cầu ít nhất 1 correct:** Có thể submit nhiều practice, nhưng cần ít nhất 1 practice correct → chapter COMPLETED

**Khuyến nghị:**
- **Phương án 1** (giữ nguyên) phù hợp với Phase 1 scope tối giản
- Nếu muốn đổi, cần update roadmap và System Law

---

### Câu hỏi 2: Race Condition ở Completion Check

**Câu hỏi:**
Có cần fix race condition ở completion check ngay bây giờ không?

**Các phương án:**
1. **Fix ngay:** Thêm `SELECT FOR UPDATE` hoặc database constraint
2. **Fix sau:** Giữ nguyên, dựa vào FSM guard (đã đủ mạnh để prevent duplicate completion)

**Khuyến nghị:**
- **Phương án 2** (fix sau) nếu FSM guard đủ mạnh
- Nhưng nên fix trong Phase 1 nếu có thời gian

---

## IV. KẾT LUẬN CUỐI

### Có thể freeze C2 không?

**✅ CÓ THỂ FREEZE** sau khi:
1. **XÓA trial config** trong `application.yml` (CRITICAL)
2. **Clarify completion rule** với user (nếu cần)
3. **Optional:** Fix race condition và AI retry timeout (không block)

### Có thể sang D1/D2/D3 không?

**⚠️ CHƯA THỂ SANG** cho đến khi:
- Trial config được xóa hoàn toàn
- User confirm completion rule logic

### Tổng kết

**Điểm mạnh:**
- Domain ownership rõ ràng
- AI boundary được tuân thủ tốt
- Code readable và maintainable
- FSM guard mạnh

**Điểm cần cải thiện:**
- Xóa trial config (CRITICAL)
- Xử lý race condition (OPTIONAL)
- Tối ưu AI retry timeout (OPTIONAL)

**Đánh giá cuối:**
Code đã sẵn sàng cho freeze C2 sau khi xử lý vấn đề trial config. Các vấn đề còn lại là nice-to-have, không block việc chuyển sang frontend development.

---

## V. CHECKLIST TRƯỚC KHI FREEZE

- [ ] **XÓA** trial config trong `application.yml`, `application-dev.yml`, `application-production.yml`
- [ ] **VERIFY** không còn reference đến trial/license trong code (trừ comment về dormant laws)
- [ ] **CLARIFY** completion rule với user (nếu cần)
- [ ] **OPTIONAL:** Fix race condition ở completion check
- [ ] **OPTIONAL:** Tối ưu AI retry timeout
- [ ] **DOCUMENT** quyết định về completion rule trong code comment

---

## VI. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [System Law](../../../01-system-law/README.md)
  - [Phase 1 Active Laws](../phase-01.02-system-law/phase-1-active-laws.md)
  - [Phase 1 Law Constraints](../phase-01.02-system-law/phase-1-law-constraints.md)
  - [Phase 1 Implementation Roadmap](../phase-01.06-implementation-roadmap/phase-1-implementation-roadmap.txt)
  - [AI Scoring Contract](../../../01-system-law/07-ai-scoring-practice-generation-contract.md)

---

[← Quay lại Overview](../../README.md)

