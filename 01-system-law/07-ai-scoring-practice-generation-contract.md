# AI Scoring & Practice Generation Contract – Luật hệ thống

**Project:** Tutor  
**Document type:** System Law  
**Audience:** Developer | Product | Tech  
**Status:** Frozen – System Law  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này định nghĩa contract giữa AI Service và System Core về scoring và practice generation trong hệ thống Tutor. Đây là luật hệ thống nghiêm ngặt, bất biến, và là nguồn sự thật duy nhất (Source of Truth) cho contract AI Service.

---

## PHẦN 1 – VAI TRÒ CỦA AI

### 1.1. AI là gì trong hệ thống

AI (Artificial Intelligence Service) là một service hỗ trợ trong hệ thống, có nhiệm vụ:
- Sinh câu hỏi (generate questions) dựa trên context học tập
- Chấm điểm câu trả lời (scoring answers) dựa trên đáp án và logic chấm điểm
- Cung cấp nội dung câu hỏi và đáp án

AI là service hỗ trợ, không phải service quyết định nghiệp vụ.

### 1.2. AI KHÔNG phải là luật

AI không phải là nguồn sự thật (Source of Truth) cho bất kỳ quy tắc nghiệp vụ nào. AI không được định nghĩa, thay đổi, hoặc bỏ qua bất kỳ System Law nào. AI chỉ thực hiện các nhiệm vụ được giao phó theo contract đã định nghĩa.

### 1.3. AI KHÔNG quyết định quyền, progression, unlock, completion

AI không được phép quyết định:
- Quyền học tập của Student (quyền được quyết định bởi Student Lifecycle và Permission Matrix)
- Trạng thái Chapter Progression (progression được quyết định bởi Chapter Progression System Law)
- Unlock Chapter (unlock được quyết định bởi Chapter Progression System Law)
- Completion Chapter (completion được quyết định bởi Chapter Progression System Law)

---

## PHẦN 2 – RANH GIỚI TRÁCH NHIỆM (AI vs SYSTEM)

### 2.1. Những việc AI ĐƯỢC PHÉP làm

AI được phép thực hiện các nhiệm vụ sau:

- **Generate questions:** Sinh câu hỏi dựa trên context học tập được cung cấp bởi System Core
- **Score answers:** Chấm điểm câu trả lời dựa trên đáp án và logic chấm điểm được định nghĩa
- **Provide content:** Cung cấp nội dung câu hỏi, đáp án, và các thông tin liên quan đến câu hỏi

### 2.2. Những việc AI TUYỆT ĐỐI KHÔNG ĐƯỢC làm

AI tuyệt đối không được phép:

- **Update mastery:** Cập nhật mastery level của Student (chỉ System Core được phép)
- **Change progression:** Thay đổi trạng thái Chapter Progression (chỉ System Core được phép)
- **Unlock chapter:** Unlock Chapter hoặc đề xuất unlock Chapter (chỉ System Core được phép)
- **Complete chapter:** Đánh dấu Chapter COMPLETED hoặc đề xuất completion (chỉ System Core được phép)
- **Bypass permission:** Bỏ qua kiểm tra quyền hoặc Permission Matrix (chỉ System Core được phép)
- **Override System Law:** Bỏ qua, thay đổi, hoặc vi phạm bất kỳ System Law nào

### 2.3. Nguyên tắc "System luôn override AI"

System Core luôn có quyền override (ghi đè) mọi quyết định hoặc output của AI. Điều này có nghĩa:

- Nếu AI trả về output vi phạm System Law, System Core phải từ chối và không sử dụng output đó
- Nếu AI đề xuất action vi phạm Permission Matrix, System Core phải từ chối và không thực hiện action đó
- Nếu AI cung cấp thông tin không phù hợp với context, System Core phải điều chỉnh hoặc từ chối

System Core là nguồn sự thật duy nhất, AI chỉ là service hỗ trợ.

---

## PHẦN 3 – INPUT CONTRACT (SYSTEM → AI)

### 3.1. Context học tập tối thiểu AI được nhận

Khi System Core gọi AI để generate questions hoặc score answers, System Core PHẢI cung cấp context học tập tối thiểu sau:

- **Student ID:** Định danh Student (chỉ để tracking, không để quyết định quyền)
- **Chapter ID:** Định danh Chapter đang học
- **Skill IDs:** Danh sách skill liên quan đến practice
- **Mastery bucket:** Mastery level ở dạng bucket (LOW / MEDIUM / HIGH), không phải giá trị chính xác
- **Practice type:** Loại practice (ví dụ: adaptive, review, test)
- **Question count:** Số lượng câu hỏi cần generate
- **Difficulty range:** Phạm vi độ khó câu hỏi (nếu có)

### 3.2. Mastery chỉ ở dạng BUCKET

AI chỉ được nhận mastery ở dạng bucket (LOW / MEDIUM / HIGH), không được nhận giá trị mastery chính xác (0-100). Điều này đảm bảo:

- AI không thể suy luận chính xác mastery để quyết định progression
- AI không thể đề xuất unlock hoặc completion dựa trên mastery chính xác
- AI chỉ có đủ thông tin để generate questions phù hợp với mức độ năng lực

### 3.3. Permission snapshot chỉ read-only

Khi System Core cung cấp permission snapshot cho AI, snapshot này chỉ mang tính read-only (chỉ đọc). AI không được phép:

- Thay đổi permission snapshot
- Bỏ qua permission snapshot
- Sử dụng permission snapshot để quyết định quyền (quyền được quyết định bởi System Core)

Permission snapshot chỉ để AI biết context hiện tại, không phải để AI quyết định.

### 3.4. AI KHÔNG được suy luận thêm ngoài input

AI chỉ được sử dụng thông tin được cung cấp trong input contract. AI không được phép:

- Suy luận thêm thông tin không có trong input
- Truy vấn database để lấy thêm thông tin
- Gọi API khác để lấy thêm thông tin
- Sử dụng thông tin từ cache hoặc session để quyết định

AI chỉ làm việc với input được cung cấp, không tự thu thập thêm dữ liệu.

---

## PHẦN 4 – OUTPUT CONTRACT (AI → SYSTEM)

### 4.1. Cấu trúc output khi generate practice

Khi AI generate practice, output PHẢI có cấu trúc sau:

- **Questions:** Danh sách câu hỏi, mỗi câu hỏi bao gồm:
  - Question ID (tạm thời, System Core sẽ assign ID chính thức)
  - Question content (nội dung câu hỏi)
  - Question type (loại câu hỏi)
  - Difficulty (độ khó)
  - Correct answer (đáp án đúng)
  - Options (nếu là câu hỏi trắc nghiệm)
- **Metadata:** Thông tin metadata về practice:
  - Estimated duration (ước tính thời gian)
  - Skill mapping (mapping câu hỏi với skill)

### 4.2. Cấu trúc output khi scoring

Khi AI score answers, output PHẢI có cấu trúc sau:

- **Score per question:** Điểm số cho từng câu hỏi (đúng/sai hoặc điểm số)
- **Total score:** Tổng điểm của practice
- **Answer feedback:** Phản hồi cho từng câu trả lời (nếu có)
- **Skill performance:** Hiệu suất theo từng skill (chỉ để System Core tính mastery)

### 4.3. Danh sách các dữ liệu AI KHÔNG BAO GIỜ được trả về

AI không được phép trả về các dữ liệu sau trong output:

- **Mastery percentage:** Giá trị mastery chính xác (0-100)
- **Unlock suggestion:** Đề xuất unlock Chapter
- **Completion suggestion:** Đề xuất đánh dấu Chapter COMPLETED
- **Progression state change:** Đề xuất thay đổi trạng thái Chapter Progression
- **Permission override:** Đề xuất bỏ qua Permission Matrix
- **System Law violation:** Bất kỳ đề xuất nào vi phạm System Law

Nếu AI trả về các dữ liệu này, System Core PHẢI từ chối và không sử dụng output đó.

---

## PHẦN 5 – CACHE RULES

### 5.1. Cache chỉ là tối ưu kỹ thuật

Cache là cơ chế tối ưu kỹ thuật để giảm thời gian phản hồi và tải hệ thống. Cache không tạo quyền, không thay đổi logic nghiệp vụ, và không bỏ qua System Law.

### 5.2. Cache không tạo quyền

Cache không được sử dụng để tạo quyền học tập. Việc có cache không có nghĩa là Student có quyền thực hiện action. Quyền học tập được quyết định duy nhất bởi Student Lifecycle và Permission Matrix, không phải bởi cache.

### 5.3. Mỗi lần dùng cache phải qua Permission Matrix & lifecycle check

Mỗi lần System Core sử dụng cache để phục vụ request, System Core PHẢI kiểm tra:

- **Student.lifecycle_state:** Kiểm tra trạng thái lifecycle hiện tại (không được dùng cache để bỏ qua lifecycle check)
- **Permission Matrix:** Kiểm tra quyền theo Permission Matrix (không được dùng cache để bỏ qua permission check)
- **Trial Policy (nếu TRIAL_ACTIVE):** Kiểm tra giới hạn Trial Policy (không được dùng cache để bypass giới hạn)

Cache chỉ được sử dụng sau khi đã kiểm tra đầy đủ quyền, không được dùng để bỏ qua kiểm tra.

---

## PHẦN 6 – TRIAL BOUNDARY

### 6.1. AI không được vượt Trial Policy

Khi Student ở trạng thái `TRIAL_ACTIVE`, AI PHẢI tuân theo các giới hạn của Trial Policy:

- **1 Chapter:** AI chỉ được generate questions cho Chapter trial duy nhất
- **≤30% skill:** AI chỉ được generate questions cho skill trong phạm vi 30% được mở
- **≤10 practice:** AI không được generate questions nếu đã đạt giới hạn 10 practice
- **≤50 câu hỏi:** AI không được generate questions nếu đã đạt giới hạn 50 câu hỏi

AI không được phép vượt quá các giới hạn này, dù System Core có gọi AI với context nào.

### 6.2. AI không được đề xuất vượt scope

AI không được phép đề xuất:
- Generate questions cho Chapter ngoài Chapter trial
- Generate questions cho skill ngoài phạm vi 30% được mở
- Generate questions vượt quá giới hạn practice hoặc câu hỏi

Nếu AI đề xuất vượt scope, System Core PHẢI từ chối và không thực hiện.

### 6.3. AI không được "gợi ý lách luật"

AI không được phép gợi ý hoặc đề xuất các cách lách luật (bypass rules), ví dụ:
- Gợi ý cách bypass Trial Policy
- Gợi ý cách unlock Chapter ngoài logic Chapter Progression
- Gợi ý cách cập nhật mastery ngoài quy trình hợp lệ

Nếu AI gợi ý lách luật, System Core PHẢI từ chối và không thực hiện.

### 6.4. Offline / online đều bị ràng buộc như nhau

Khi Student ở trạng thái `TRIAL_ACTIVE`, AI PHẢI tuân theo Trial Policy dù Student đang online hay offline. AI không được phép:

- Generate questions offline khi Trial Policy yêu cầu online
- Bypass giới hạn trial bằng cách sử dụng cache offline
- Tạo practice offline để vượt quá giới hạn trial

Offline và online đều phải tuân theo cùng một bộ quy tắc Trial Policy.

---

## PHẦN 7 – PRACTICE FLOW CHUẨN

### 7.1. Mô tả rõ từng bước từ System → AI → Student → System

Flow chuẩn của practice được mô tả như sau:

1. **System Core kiểm tra quyền:** System Core kiểm tra Student.lifecycle_state, Permission Matrix, và Trial Policy (nếu cần).

2. **System Core gọi AI:** Nếu có quyền, System Core gọi AI với input contract đầy đủ.

3. **AI generate questions:** AI sinh câu hỏi dựa trên input contract và trả về output theo output contract.

4. **System Core validate output:** System Core kiểm tra output của AI có vi phạm System Law hay không. Nếu vi phạm, System Core từ chối và không sử dụng.

5. **System Core tạo practice:** System Core tạo practice với câu hỏi từ AI và lưu vào database.

6. **Student làm practice:** Student trả lời câu hỏi trong practice.

7. **System Core gọi AI scoring:** System Core gọi AI để chấm điểm câu trả lời.

8. **AI score answers:** AI chấm điểm và trả về kết quả theo output contract.

9. **System Core validate score:** System Core kiểm tra kết quả chấm điểm có hợp lệ hay không.

10. **System Core submit practice:** System Core submit practice và trigger cập nhật mastery (không có AI tham gia).

11. **System Core update mastery:** System Core cập nhật mastery dựa trên kết quả practice (không có AI tham gia).

12. **System Core đánh giá progression:** System Core đánh giá Chapter Progression và thực hiện chuyển trạng thái nếu cần (không có AI tham gia).

### 7.2. Chỉ rõ AI KHÔNG tham gia bước update mastery / progression

AI không tham gia vào các bước sau:

- **Update mastery:** System Core tự tính toán và cập nhật mastery, không gọi AI
- **Đánh giá progression:** System Core tự đánh giá Chapter Progression, không gọi AI
- **Chuyển trạng thái Chapter:** System Core tự chuyển trạng thái Chapter, không gọi AI
- **Unlock Chapter:** System Core tự unlock Chapter, không gọi AI

AI chỉ tham gia vào generate questions và score answers, không tham gia vào bất kỳ logic nghiệp vụ nào khác.

---

## PHẦN 8 – CHECKLIST ÉP CODE

Các hành vi sau đây được coi là **VI PHẠM** nếu code hoặc AI thực hiện chúng. Code và AI phải được sửa lại để tuân theo contract này.

### 8.1. Vi phạm về Vai trò AI

- ❌ **VI PHẠM:** AI quyết định quyền học tập (AI tự quyết định Student có quyền học hay không)
- ❌ **VI PHẠM:** AI quyết định progression (AI tự quyết định Chapter Progression)
- ❌ **VI PHẠM:** AI unlock Chapter (AI tự unlock Chapter hoặc đề xuất unlock)
- ❌ **VI PHẠM:** AI complete Chapter (AI tự đánh dấu Chapter COMPLETED hoặc đề xuất completion)

### 8.2. Vi phạm về Input Contract

- ❌ **VI PHẠM:** AI nhận mastery chính xác (AI nhận giá trị mastery 0-100 thay vì bucket)
- ❌ **VI PHẠM:** AI suy luận thêm ngoài input (AI tự truy vấn database hoặc gọi API khác)
- ❌ **VI PHẠM:** AI sử dụng permission snapshot để quyết định quyền (AI tự quyết định quyền dựa trên permission snapshot)

### 8.3. Vi phạm về Output Contract

- ❌ **VI PHẠM:** AI trả về mastery percentage (AI trả về giá trị mastery chính xác trong output)
- ❌ **VI PHẠM:** AI trả về unlock suggestion (AI đề xuất unlock Chapter trong output)
- ❌ **VI PHẠM:** AI trả về completion suggestion (AI đề xuất đánh dấu Chapter COMPLETED trong output)
- ❌ **VI PHẠM:** AI trả về progression state change (AI đề xuất thay đổi trạng thái Chapter trong output)

### 8.4. Vi phạm về Cache Rules

- ❌ **VI PHẠM:** Cache tạo quyền (sử dụng cache để tạo quyền học tập)
- ❌ **VI PHẠM:** Bỏ qua Permission Matrix khi dùng cache (không kiểm tra quyền khi sử dụng cache)
- ❌ **VI PHẠM:** Bỏ qua lifecycle check khi dùng cache (không kiểm tra lifecycle state khi sử dụng cache)

### 8.5. Vi phạm về Trial Boundary

- ❌ **VI PHẠM:** AI vượt Trial Policy (AI generate questions vượt quá giới hạn trial)
- ❌ **VI PHẠM:** AI đề xuất vượt scope (AI đề xuất generate questions cho Chapter hoặc skill ngoài phạm vi trial)
- ❌ **VI PHẠM:** AI gợi ý lách luật (AI gợi ý cách bypass Trial Policy hoặc System Law)
- ❌ **VI PHẠM:** AI generate offline trong trial (AI generate questions offline khi Trial Policy yêu cầu online)

### 8.6. Vi phạm về Practice Flow

- ❌ **VI PHẠM:** AI update mastery (AI tự cập nhật mastery hoặc gọi API update mastery)
- ❌ **VI PHẠM:** AI đánh giá progression (AI tự đánh giá Chapter Progression)
- ❌ **VI PHẠM:** AI chuyển trạng thái Chapter (AI tự chuyển trạng thái Chapter hoặc đề xuất chuyển trạng thái)
- ❌ **VI PHẠM:** System Core không validate output AI (System Core sử dụng output AI mà không kiểm tra vi phạm System Law)

---

## PHẦN 9 – TUYÊN BỐ CUỐI

**Tài liệu này là LUẬT HỆ THỐNG.**

Mọi code, API, hoặc AI service liên quan đến scoring và practice generation phải tuân theo tài liệu này. Không được sửa tài liệu để hợp thức hoá code hoặc AI.

Tài liệu này là nguồn sự thật duy nhất (Source of Truth) cho contract giữa AI Service và System Core trong hệ thống Gia sư Toán AI. Mọi quyết định về thiết kế, triển khai, và kiểm thử liên quan đến AI scoring và practice generation phải dựa trên tài liệu này.

Tài liệu này phụ thuộc trực tiếp vào Student Lifecycle – System Law, Trial Policy – System Law, Chapter Progression – System Law, License Rules – System Law, Skill & Mastery Rules – System Law, và Permission Matrix – System Law. Mọi quy định trong contract này phải tuân thủ và không được mâu thuẫn với các System Law phụ thuộc.

**AI luôn bị ràng buộc bởi Luật hệ thống.** AI không có quyền bỏ qua, thay đổi, hoặc vi phạm bất kỳ System Law nào. System Core là nguồn sự thật duy nhất, AI chỉ là service hỗ trợ.

---

---

## PHẦN 10 – PHASE 1 USAGE SUBSET

### 10.1. Phase 1 chỉ dùng subset cực nhỏ

**⚠️ QUAN TRỌNG:**

Tài liệu này mô tả AI Contract đầy đủ cho toàn hệ thống, nhưng Phase 1 chỉ sử dụng subset cực nhỏ.

**Phase 1 AI Usage:**

- **Generate questions:** Sinh câu hỏi dựa trên chapter_id và skill_id
- **Explain solutions:** Giải thích bài tập
- **KHÔNG dùng:**
  - Mastery bucket (LOW / MEDIUM / HIGH) - Phase 1 không có mastery decision
  - Cache rules phức tạp - Phase 1 AI stateless
  - Trial boundary - Phase 1 không có trial
  - Permission snapshot - Phase 1 permission hard-coded

**Phase 1 AI = Generate bài + Giải thích, không hơn.**

### 10.2. Phase 1 KHÔNG dùng các phần sau

**Các phần của AI Contract KHÔNG áp dụng trong Phase 1:**

- **PHẦN 3.2 – Mastery bucket:** Phase 1 không truyền mastery bucket cho AI
- **PHẦN 5 – Cache Rules:** Phase 1 AI stateless, không cache
- **PHẦN 6 – Trial Boundary:** Phase 1 không có trial
- **PHẦN 3.3 – Permission snapshot:** Phase 1 permission hard-coded

**Lưu ý:**
- System Law gốc (AI Contract đầy đủ) vẫn là nguồn sự thật cho Phase 2
- Phase 1 chỉ implement subset cực nhỏ
- Không được hiểu nhầm Phase 1 là "chuẩn bị sẵn" các phần không dùng

### 10.3. Phase 1 AI Input Contract (Simplified)

**Phase 1 AI chỉ nhận:**

- Student ID (chỉ để tracking)
- Chapter ID
- Skill IDs
- Question count
- Difficulty range (nếu có)

**Phase 1 AI KHÔNG nhận:**

- Mastery bucket
- Permission snapshot
- Trial context
- Cache hints

### 10.4. Phase 1 AI Output Contract (Simplified)

**Phase 1 AI chỉ trả về:**

- Questions (nội dung câu hỏi, đáp án, options)
- Solution explanation (khi giải thích bài)

**Phase 1 AI KHÔNG trả về:**

- Mastery percentage
- Unlock suggestion
- Completion suggestion
- Progression state change
- Permission override

---

## 11. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Student Lifecycle](01-student-lifecycle.md)
  - [Trial Policy](02-trial-policy.md)
  - [Chapter Progression](03-chapter-progression.md)
  - [License Rules](04-license-rules.md)
  - [Skill & Mastery Rules](05-skill-mastery-rules.md)
  - [Permission Matrix](06-permission-matrix.md)

---

[← Quay lại Overview](README.md)

