# Phân tích Integration: Adaptive Learning Engine & Practice Flow

**Project:** Tutor  
**Document type:** Technical Analysis & Discussion  
**Audience:** Developer / System Architect / Product  
**Status:** Draft  
**Version:** 2025-12-21  
**Author:** System Architect

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này phân tích 2 phần integration còn lại cho Question Management:
1. **Integration với Adaptive Learning Engine**
2. **Practice Flow Integration (transaction với Mastery update)**

Mục tiêu: Đánh giá tác động, lợi ích, rủi ro, và quyết định có nên triển khai ngay hay không.

---

## 2. PHẦN 1: INTEGRATION VỚI ADAPTIVE LEARNING ENGINE

### 2.1. Tình trạng hiện tại

**Đã có:**
- ✅ `QuestionGenerationService` - Service sinh Questions từ Exercises
- ✅ `LearningQuestionController` - Internal API endpoint `/api/v1/internal/learning/generate-questions`
- ✅ Question entity với đầy đủ fields cần thiết
- ✅ Workflow: Exercise → Question → Practice (về mặt database)

**Chưa có:**
- ❌ Adaptive Learning Engine chưa gọi endpoint này
- ❌ Logic chọn Exercises phù hợp với mastery level
- ❌ Logic assign Questions cho học sinh trong learning session
- ❌ Response trả về questionIds để client submit

### 2.2. Nếu CHƯA làm ngay

**Tác động:**
- ✅ **Không ảnh hưởng**: Question Management vẫn hoạt động độc lập
- ✅ **Backend sẵn sàng**: API endpoint đã có, chỉ cần Adaptive Learning Engine gọi
- ⚠️ **Workflow chưa hoàn chỉnh**: Questions được sinh nhưng chưa được sử dụng trong learning flow
- ⚠️ **Data chưa được tận dụng**: Questions có thể được tạo thủ công nhưng chưa tự động

**Lợi ích của việc chờ:**
- Có thời gian test Question Management độc lập
- Adaptive Learning Engine có thể được refactor/hoàn thiện trước
- Tránh thay đổi nhiều components cùng lúc

**Rủi ro:**
- Questions có thể được tạo nhưng không được sử dụng → data không có giá trị
- Phải maintain 2 flows: manual question creation và adaptive learning (nếu không integrate)

### 2.3. Nếu LÀM NGAY

**Cần làm:**
1. Tìm và cập nhật Adaptive Learning Engine code
2. Thay thế logic query Exercises trực tiếp → gọi `POST /api/v1/internal/learning/generate-questions`
3. Update response để trả về questionIds
4. Update client (Student App) để submit với questionId

**Lợi ích:**
- ✅ **Workflow hoàn chỉnh**: Exercise → Question → Practice (tự động)
- ✅ **Data consistency**: Tất cả Practices đều có question_id
- ✅ **Analytics tốt hơn**: Có thể track Questions performance
- ✅ **Tận dụng ngay**: Questions được sinh và sử dụng ngay

**Rủi ro:**
- ⚠️ **Phụ thuộc Adaptive Learning Engine**: Cần hiểu rõ logic hiện tại
- ⚠️ **Breaking changes**: Có thể ảnh hưởng đến Student App nếu API response thay đổi
- ⚠️ **Testing phức tạp**: Cần test toàn bộ learning flow

**Cần thảo luận:**
1. **Adaptive Learning Engine hiện tại ở đâu?**
   - ⚠️ **CHƯA TÌM THẤY**: Adaptive Learning Engine code chưa được implement trong codebase
   - Logic được mô tả trong `adaptive_learning_logic_phase_1.md`
   - Có thể là:
     - Service riêng (chưa tạo)
     - Logic trong Core Service (chưa implement)
     - External service (cần integration)
   - **Cần xác nhận**: Adaptive Learning Engine đã được implement chưa?

2. **Logic chọn Exercises hiện tại như thế nào?**
   - Dựa trên mastery level?
   - Dựa trên difficulty?
   - Có filter theo skill prerequisites không?

3. **Student App hiện tại submit Practice như thế nào?**
   - API endpoint nào?
   - Request format?
   - Có thể update để nhận questionId không?

4. **Timeline và priority:**
   - Adaptive Learning Engine có đang được refactor không?
   - Có deadline nào không?
   - Priority so với các features khác?

---

## 3. PHẦN 2: PRACTICE FLOW INTEGRATION (TRANSACTION VỚI MASTERY UPDATE)

### 3.1. Tình trạng hiện tại

**Đã có:**
- ✅ `QuestionService.submitQuestionAnswer()` - Submit Question và tạo Practice với question_id
- ✅ `PracticeService.submitPractice()` - Submit Practice với questionId (optional)
- ✅ Practice entity có question_id field (nullable)
- ✅ Question status được update: ASSIGNED → COMPLETED

**Chưa có:**
- ❌ Transaction bao gồm Mastery update
- ❌ Logic update Skill Mastery dựa trên Question result
- ❌ Validation: Question submit → Practice → Mastery update (atomic)

### 3.2. Nếu CHƯA làm ngay

**Tác động:**
- ✅ **Không ảnh hưởng**: Question submit và Practice creation vẫn hoạt động
- ⚠️ **Workflow chưa hoàn chỉnh**: Mastery update phải được gọi riêng
- ⚠️ **Data inconsistency risk**: Nếu Question submit thành công nhưng Mastery update fail
- ⚠️ **Manual steps**: Phải gọi 2 APIs riêng biệt

**Lợi ích của việc chờ:**
- Có thời gian test Question → Practice flow độc lập
- Mastery update logic có thể được refactor/hoàn thiện trước
- Tránh transaction phức tạp ngay từ đầu

**Rủi ro:**
- Data inconsistency: Question completed nhưng Mastery chưa update
- Performance: 2 API calls thay vì 1 transaction
- User experience: Client phải handle 2 steps

### 3.3. Nếu LÀM NGAY

**Cần làm:**
1. Tìm Mastery update service/logic hiện tại
2. Tích hợp vào `QuestionService.submitQuestionAnswer()` với `@Transactional`
3. Update `PracticeService.submitPractice()` để cũng update Mastery nếu có questionId
4. Handle rollback nếu Mastery update fail

**Lợi ích:**
- ✅ **Atomic transaction**: Question submit → Practice → Mastery update (all or nothing)
- ✅ **Data consistency**: Đảm bảo data luôn đồng bộ
- ✅ **Performance tốt hơn**: 1 transaction thay vì nhiều API calls
- ✅ **User experience tốt hơn**: Client chỉ cần 1 API call

**Rủi ro:**
- ⚠️ **Transaction phức tạp**: Nếu Mastery update logic phức tạp, có thể ảnh hưởng performance
- ⚠️ **Rollback handling**: Cần đảm bảo rollback đúng cách
- ⚠️ **Testing phức tạp**: Cần test transaction scenarios

**Cần thảo luận:**
1. **Mastery update logic hiện tại ở đâu?**
   - ⚠️ **CHƯA TÌM THẤY**: Mastery update service chưa được implement trong codebase
   - Logic được mô tả trong `adaptive_learning_logic_phase_1.md`: Đúng +5~+8, Sai -5~-10 (tuỳ độ khó)
   - Cần implement Mastery service trước khi integrate
   - Có thể cần tạo Mastery entity/table để lưu mastery của học sinh theo skill

2. **Transaction scope:**
   - Có cần include các operations khác không? (notifications, analytics, etc.)
   - Timeout settings?
   - Isolation level?

3. **Error handling:**
   - Nếu Mastery update fail, có rollback Question status không?
   - Có retry logic không?
   - Error messages cho user?

4. **Performance:**
   - Mastery update có nặng không?
   - Có cache không?
   - Có thể async không?

---

## 4. KHUYẾN NGHỊ

### 4.1. Integration với Adaptive Learning Engine

**Khuyến nghị: LÀM SAU (Phase 2)**

**Lý do:**
1. **Question Management đã hoàn chỉnh**: Có thể test và sử dụng độc lập
2. **Cần hiểu rõ Adaptive Learning Engine**: Tránh breaking changes
3. **Phụ thuộc nhiều components**: Student App, Adaptive Learning Engine, Core Service
4. **Có thể làm incremental**: Bắt đầu với manual question creation, sau đó integrate

**Khi nào làm:**
- Khi Adaptive Learning Engine đã stable
- Khi có đủ thời gian để test toàn bộ flow
- Khi Student App sẵn sàng update

### 4.2. Practice Flow Integration (Mastery Update)

**Khuyến nghị: LÀM SAU (Phase 2) - CẦN IMPLEMENT MASTERY SERVICE TRƯỚC**

**Lý do:**
1. ⚠️ **Mastery service chưa tồn tại**: Cần implement Mastery entity/service trước
2. **Scope lớn hơn dự kiến**: Cần tạo Mastery table, entity, service
3. **Phụ thuộc database design**: Cần quyết định cách lưu mastery (table riêng hay trong StudentProfile)
4. **Có thể làm sau**: Question → Practice flow đã hoạt động, Mastery có thể update riêng

**Cách làm (khi đã có Mastery service):**
1. Tạo MasteryService với method `updateMastery(studentId, skillId, isCorrect, difficultyLevel)`
2. Wrap trong transaction với Question submit
3. Add error handling và logging
4. Test với các scenarios

**Cần làm trước:**
1. Thiết kế Mastery table/entity
2. Implement MasteryService với logic: Đúng +5~+8, Sai -5~-10
3. Test Mastery update độc lập
4. Sau đó mới integrate vào Question submit transaction

---

## 5. QUYẾT ĐỊNH CẦN THẢO LUẬN

### 5.1. Adaptive Learning Engine Integration

**Câu hỏi:**
1. Adaptive Learning Engine code ở đâu? (file path, service name)
2. Logic chọn Exercises hiện tại như thế nào?
3. Student App submit Practice như thế nào? (API endpoint, request format)
4. Timeline và priority?

**Quyết định:**
- [ ] Làm ngay (cần thông tin từ team)
- [ ] Làm sau Phase 2 (khuyến nghị)
- [ ] Cần thảo luận thêm

### 5.2. Practice Flow Integration (Mastery Update)

**Câu hỏi:**
1. Mastery update service ở đâu? (file path, service name)
2. Logic update như thế nào? (formula, validation)
3. Có cần include operations khác không?
4. Error handling strategy?

**Quyết định:**
- [ ] Làm ngay (cần implement Mastery service trước)
- [x] Làm sau Phase 2 (khuyến nghị - Mastery service chưa tồn tại)
- [ ] Cần thảo luận thêm

---

## 6. NEXT STEPS

### Nếu quyết định LÀM NGAY:

**Adaptive Learning Engine:**
1. Tìm và review Adaptive Learning Engine code
2. Update để gọi Question generation endpoint
3. Update response format
4. Update Student App
5. Test end-to-end

**Mastery Update:**
1. Tìm Mastery update service
2. Integrate vào Question submit transaction
3. Add error handling
4. Test transaction scenarios

### Nếu quyết định LÀM SAU:

**Adaptive Learning Engine:**
- Document integration points
- Prepare API contracts
- Wait for Adaptive Learning Engine to be stable

**Mastery Update:**
- Document current flow
- Prepare transaction design
- Wait for Mastery service to be ready

---

## 7. TÀI LIỆU LIÊN QUAN

- [Question Management](./question_management_phase_1-2025-12-21-16-45.md)
- [Adaptive Learning Logic](../education_logic/adaptive_learning_logic_phase_1-2025-12-15-02-30.md)
- [API Specification](./api_specification_phase_1-2025-12-15-03-30.md)

---

## 8. LỊCH SỬ THAY ĐỔI

- 2025-12-21: Tạo mới tài liệu phân tích integration

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)

