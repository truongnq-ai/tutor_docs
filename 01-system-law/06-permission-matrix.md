# Permission Matrix – Luật hệ thống (API-level Guard)

**Project:** Tutor  
**Document type:** System Law  
**Audience:** Developer | Product | Tech  
**Status:** Frozen – System Law  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này định nghĩa ma trận quyền API-level (Permission Matrix) trong hệ thống Tutor, map Lifecycle × Chapter State × Action → Quyền API. Đây là luật hệ thống nghiêm ngặt, bất biến, và là nguồn sự thật duy nhất (Source of Truth) cho logic quyền API.

---

## PHẦN 1 – THỨ TỰ KIỂM TRA (INVARIANT)

### 1.1. Mọi API học tập PHẢI kiểm tra theo thứ tự

Mọi API liên quan đến học tập phải kiểm tra quyền theo thứ tự sau đây, không được đảo ngược hoặc bỏ qua bước nào:

1. **Student.lifecycle_state:** Kiểm tra trạng thái lifecycle của Student. Nếu Student ở trạng thái `SUSPENDED`, từ chối ngay lập tức và không kiểm tra các bước tiếp theo.

2. **Trial Policy (nếu TRIAL_ACTIVE):** Nếu Student ở trạng thái `TRIAL_ACTIVE`, kiểm tra các giới hạn của Trial Policy (số Chapter, số skill, số practice, số câu hỏi).

3. **Chapter state:** Kiểm tra trạng thái Chapter liên quan đến action. Xác định Chapter có ở trạng thái phù hợp để thực hiện action hay không.

4. **Action group:** Kiểm tra action cụ thể có được phép trong điều kiện hiện tại (lifecycle + chapter state) hay không.

### 1.2. Fail ở bước nào → DENY ngay

Nếu kiểm tra fail ở bất kỳ bước nào, API phải từ chối (DENY) ngay lập tức và không tiếp tục kiểm tra các bước sau. Không có ngoại lệ, không có bypass, và không có fallback.

---

## PHẦN 2 – ACTION GROUPS

Hệ thống định nghĩa các action groups sau đây để phân loại quyền API:

### 2.1. VIEW_CONTENT

Action xem nội dung học tập (không bao gồm đáp án hoặc lời giải chi tiết):
- Xem danh sách Chapter
- Xem danh sách skill
- Xem nội dung câu hỏi (chưa làm)
- Xem lịch sử practice
- Xem tiến độ học tập

### 2.2. START_PRACTICE

Action bắt đầu một practice mới:
- Tạo practice mới
- Khởi tạo session practice
- Load câu hỏi cho practice

### 2.3. SUBMIT_PRACTICE

Action submit practice và ghi nhận kết quả:
- Submit kết quả practice
- Ghi nhận câu trả lời
- Trigger cập nhật mastery

### 2.4. GENERATE_QUESTION

Action sinh câu hỏi mới:
- Sinh câu hỏi từ AI service
- Load câu hỏi từ database
- Tạo câu hỏi động

### 2.5. UPDATE_MASTERY (internal only)

Action cập nhật mastery level (chỉ dành cho internal service):
- Cập nhật mastery sau khi submit practice
- Tính toán mastery mới
- Lưu trữ mastery

**Lưu ý:** Action này không được expose ra API công khai, chỉ được sử dụng bởi internal service.

### 2.6. PROGRESSION_ACTION (internal only)

Action thay đổi trạng thái Chapter Progression (chỉ dành cho internal service):
- Chuyển Chapter sang IN_PROGRESS
- Đánh dấu Chapter COMPLETED
- Unlock Chapter tiếp theo

**Lưu ý:** Action này không được expose ra API công khai, chỉ được sử dụng bởi internal service.

### 2.7. REVIEW_ONLY

Action xem lại nội dung đã học (read-only):
- Xem lại practice đã làm
- Xem lại câu hỏi đã trả lời
- Xem đáp án cuối (không bao gồm lời giải chi tiết)
- Xem mastery đã đạt được

---

## PHẦN 3 – PERMISSION THEO LIFECYCLE

Bảng sau đây mô tả quyền thực hiện các action groups theo từng trạng thái lifecycle:

| Trạng thái Lifecycle | VIEW_CONTENT | START_PRACTICE | SUBMIT_PRACTICE | GENERATE_QUESTION | REVIEW_ONLY |
|---------------------|--------------|----------------|-----------------|-------------------|-------------|
| **TRIAL_ACTIVE** | ✅ ALLOW | ⚠️ ALLOW (Trial Policy) | ⚠️ ALLOW (Trial Policy) | ⚠️ ALLOW (Trial Policy) | ✅ ALLOW |
| **TRIAL_EXPIRED** | ✅ ALLOW | ❌ DENY | ❌ DENY | ❌ DENY | ✅ ALLOW |
| **LINKED_NO_LICENSE** | ✅ ALLOW | ❌ DENY | ❌ DENY | ❌ DENY | ✅ ALLOW |
| **LICENSE_ACTIVE** | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW |
| **LICENSE_EXPIRED** | ✅ ALLOW | ❌ DENY | ❌ DENY | ❌ DENY | ✅ ALLOW |
| **SUSPENDED** | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY |

### 3.1. Giải thích ký hiệu

- ✅ **ALLOW:** Action được phép thực hiện
- ⚠️ **ALLOW (Trial Policy):** Action được phép nhưng phải tuân theo giới hạn của Trial Policy
- ❌ **DENY:** Action bị từ chối hoàn toàn

### 3.2. SUSPENDED chặn toàn bộ

Khi Student ở trạng thái `SUSPENDED`, tất cả action đều bị từ chối, không có ngoại lệ. Việc kiểm tra `SUSPENDED` phải được thực hiện ở bước đầu tiên trong thứ tự kiểm tra.

---

## PHẦN 4 – PERMISSION THEO CHAPTER STATE (khi LICENSE_ACTIVE)

Bảng sau đây mô tả quyền thực hiện các action groups theo từng trạng thái Chapter, áp dụng khi Student ở trạng thái `LICENSE_ACTIVE`:

| Trạng thái Chapter | VIEW_CONTENT | START_PRACTICE | SUBMIT_PRACTICE | GENERATE_QUESTION | REVIEW_ONLY |
|-------------------|--------------|----------------|-----------------|-------------------|-------------|
| **LOCKED** | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY | ❌ DENY |
| **UNLOCKED** | ✅ ALLOW | ⚠️ ALLOW (start → IN_PROGRESS) | ❌ DENY | ❌ DENY | ❌ DENY |
| **IN_PROGRESS** | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW | ✅ ALLOW |
| **COMPLETED** | ✅ ALLOW | ❌ DENY | ❌ DENY | ❌ DENY | ✅ ALLOW |

### 4.1. Giải thích ký hiệu

- ✅ **ALLOW:** Action được phép thực hiện
- ⚠️ **ALLOW (start → IN_PROGRESS):** Action được phép nhưng sẽ trigger chuyển Chapter từ UNLOCKED sang IN_PROGRESS
- ❌ **DENY:** Action bị từ chối hoàn toàn

### 4.2. LOCKED chặn toàn bộ

Khi Chapter ở trạng thái `LOCKED`, tất cả action đều bị từ chối, kể cả VIEW_CONTENT. Học sinh không thể truy cập bất kỳ nội dung nào của Chapter LOCKED.

---

## PHẦN 5 – KẾT HỢP LIFECYCLE × CHAPTER (RULE CỤ THỂ)

### 5.1. START_PRACTICE

START_PRACTICE chỉ được phép khi đồng thời thỏa mãn:
- Student.lifecycle_state = `LICENSE_ACTIVE` hoặc `TRIAL_ACTIVE`
- Chapter state = `IN_PROGRESS` hoặc `UNLOCKED` (nếu UNLOCKED, sẽ chuyển sang IN_PROGRESS)
- Nếu `TRIAL_ACTIVE`, phải tuân theo giới hạn Trial Policy (số practice, số câu hỏi)

### 5.2. SUBMIT_PRACTICE

SUBMIT_PRACTICE chỉ được phép khi đồng thời thỏa mãn:
- Student.lifecycle_state = `LICENSE_ACTIVE` hoặc `TRIAL_ACTIVE`
- Chapter state = `IN_PROGRESS`
- Practice đã được tạo hợp lệ và đang trong session
- Nếu `TRIAL_ACTIVE`, phải tuân theo giới hạn Trial Policy

### 5.3. GENERATE_QUESTION

GENERATE_QUESTION chỉ được phép khi đồng thời thỏa mãn:
- Student.lifecycle_state = `LICENSE_ACTIVE` hoặc `TRIAL_ACTIVE`
- Chapter state = `IN_PROGRESS`
- online = true (không được generate question khi offline)
- Nếu `TRIAL_ACTIVE`, phải tuân theo giới hạn Trial Policy (số câu hỏi)

### 5.4. REVIEW_ONLY

REVIEW_ONLY chỉ được phép khi đồng thời thỏa mãn:
- Chapter state = `COMPLETED`
- Student.lifecycle_state ≠ `SUSPENDED`
- Chỉ được xem đáp án cuối (final answer), KHÔNG được xem lời giải chi tiết (detailed solution)
- Không được tạo practice mới, không được cập nhật mastery

### 5.5. VIEW_CONTENT

VIEW_CONTENT chỉ được phép khi đồng thời thỏa mãn:
- Student.lifecycle_state ≠ `SUSPENDED`
- Chapter state ≠ `LOCKED`
- KHÔNG bao gồm đáp án hoặc lời giải chi tiết

---

## PHẦN 6 – TRIAL-SPECIFIC GUARDS

### 6.1. Áp dụng Trial Policy

Khi Student ở trạng thái `TRIAL_ACTIVE`, các action START_PRACTICE, SUBMIT_PRACTICE, và GENERATE_QUESTION phải tuân theo các giới hạn sau của Trial Policy:

- **1 Chapter:** Chỉ được truy cập 1 Chapter trial duy nhất
- **≤30% skill:** Chỉ được truy cập tối đa 30% skill trong Chapter trial
- **≤10 practice:** Chỉ được thực hiện tối đa 10 practice cho toàn bộ trial
- **≤50 câu hỏi:** Chỉ được sinh tối đa 50 câu hỏi cho toàn bộ trial

### 6.2. ❌ Không generate question offline

Khi Student ở trạng thái `TRIAL_ACTIVE`, hệ thống không được phép generate question khi offline. GENERATE_QUESTION chỉ được phép khi online = true.

### 6.3. ❌ Không bypass giới hạn bằng cache

Hệ thống không được phép bypass các giới hạn của Trial Policy bằng cách:
- Sử dụng cache để tạo practice vượt quá giới hạn
- Sử dụng cache để sinh câu hỏi vượt quá giới hạn
- Lưu trữ practice/câu hỏi offline để bypass giới hạn online

---

## PHẦN 7 – AI SERVICE & PERMISSION

### 7.1. AI không có quyền UPDATE_MASTERY

AI service không được phép thực hiện action UPDATE_MASTERY. AI service chỉ được phép:
- GENERATE_QUESTION (khi có quyền theo Permission Matrix)
- Cung cấp nội dung câu hỏi
- Xử lý câu trả lời để tính điểm

### 7.2. AI không có quyền PROGRESSION_ACTION

AI service không được phép thực hiện action PROGRESSION_ACTION. AI service không được:
- Chuyển Chapter sang IN_PROGRESS
- Đánh dấu Chapter COMPLETED
- Unlock Chapter tiếp theo

### 7.3. AI chỉ generate khi Permission Matrix ALLOW

AI service chỉ được phép generate question khi Permission Matrix cho phép action GENERATE_QUESTION. AI service phải kiểm tra quyền trước khi generate, không được bypass guard.

### 7.4. AI không bypass guard

AI service không được phép bypass bất kỳ guard nào trong Permission Matrix. AI service phải tuân theo đầy đủ thứ tự kiểm tra và các quy tắc quyền như các service khác.

---

## PHẦN 8 – INVARIANTS ÉP CODE

Các invariant sau đây phải được tuân thủ nghiêm ngặt bởi mọi code trong hệ thống:

### 8.1. Không API học tập nào bỏ qua lifecycle check

Mọi API liên quan đến học tập phải kiểm tra Student.lifecycle_state ở bước đầu tiên. Không có API nào được phép bỏ qua lifecycle check, kể cả internal API.

### 8.2. Không update mastery ngoài SUBMIT_PRACTICE hợp lệ

Mastery chỉ được cập nhật khi:
- SUBMIT_PRACTICE được thực hiện hợp lệ
- Thỏa mãn đầy đủ điều kiện tại Mục 5.2
- Được trigger bởi internal service UPDATE_MASTERY

Không có cơ chế nào khác được phép cập nhật mastery.

### 8.3. Không REVIEW ghi dữ liệu

Khi thực hiện REVIEW_ONLY, hệ thống không được phép ghi (write) bất kỳ dữ liệu nào. REVIEW_ONLY là read-only operation hoàn toàn.

### 8.4. Không START_PRACTICE ngoài IN_PROGRESS

START_PRACTICE chỉ được phép khi Chapter ở trạng thái `IN_PROGRESS` hoặc `UNLOCKED` (sẽ chuyển sang IN_PROGRESS). Không được phép START_PRACTICE khi Chapter ở trạng thái LOCKED hoặc COMPLETED.

### 8.5. Không AI tự unlock Chapter

AI service không được phép tự động unlock Chapter hoặc thực hiện bất kỳ PROGRESSION_ACTION nào. Chỉ internal service mới được phép thực hiện PROGRESSION_ACTION, và chỉ khi thỏa mãn đầy đủ điều kiện của Chapter Progression.

---

## PHẦN 9 – CHECKLIST AUDIT LỆCH CODE

Các hành vi sau đây được coi là **VI PHẠM** nếu code thực hiện chúng. Code phải được sửa lại để tuân theo Permission Matrix.

### 9.1. Vi phạm về Lifecycle Check

- ❌ **VI PHẠM:** START_PRACTICE khi LICENSE_EXPIRED (cho phép bắt đầu practice khi License đã hết hạn)
- ❌ **VI PHẠM:** SUBMIT_PRACTICE khi SUSPENDED (cho phép submit practice khi Student bị suspend)
- ❌ **VI PHẠM:** GENERATE_QUESTION khi TRIAL_EXPIRED (cho phép sinh câu hỏi khi trial đã hết hạn)
- ❌ **VI PHẠM:** Bỏ qua lifecycle check (không kiểm tra lifecycle state trước khi thực hiện action)

### 9.2. Vi phạm về Chapter State

- ❌ **VI PHẠM:** START_PRACTICE khi Chapter LOCKED (cho phép bắt đầu practice khi Chapter chưa unlock)
- ❌ **VI PHẠM:** SUBMIT_PRACTICE khi Chapter COMPLETED (cho phép submit practice khi Chapter đã hoàn thành)
- ❌ **VI PHẠM:** VIEW_CONTENT khi Chapter LOCKED (cho phép xem nội dung khi Chapter chưa unlock)

### 9.3. Vi phạm về Trial Policy

- ❌ **VI PHẠM:** GENERATE_QUESTION offline trong trial (cho phép sinh câu hỏi offline khi đang trial)
- ❌ **VI PHẠM:** Bypass giới hạn trial bằng cache (sử dụng cache để vượt quá giới hạn trial)
- ❌ **VI PHẠM:** Vượt quá 10 practice trong trial (cho phép thực hiện hơn 10 practice)
- ❌ **VI PHẠM:** Vượt quá 50 câu hỏi trong trial (cho phép sinh hơn 50 câu hỏi)

### 9.4. Vi phạm về Review

- ❌ **VI PHẠM:** VIEW trả lời giải chi tiết (cho phép xem lời giải chi tiết khi review)
- ❌ **VI PHẠM:** Tạo practice khi review (cho phép tạo practice mới khi review Chapter COMPLETED)
- ❌ **VI PHẠM:** Cập nhật mastery khi review (cho phép cập nhật mastery khi review)

### 9.5. Vi phạm về AI Service

- ❌ **VI PHẠM:** AI service update mastery (cho phép AI service cập nhật mastery)
- ❌ **VI PHẠM:** AI service unlock Chapter (cho phép AI service unlock Chapter)
- ❌ **VI PHẠM:** AI bypass guard (cho phép AI service bỏ qua kiểm tra quyền)

### 9.6. Vi phạm về Internal Actions

- ❌ **VI PHẠM:** Expose UPDATE_MASTERY ra API công khai (cho phép client gọi trực tiếp UPDATE_MASTERY)
- ❌ **VI PHẠM:** Expose PROGRESSION_ACTION ra API công khai (cho phép client gọi trực tiếp PROGRESSION_ACTION)

---

## PHẦN 10 – TUYÊN BỐ CUỐI

**Tài liệu này là LUẬT HỆ THỐNG.**

Mọi code, API hoặc chức năng liên quan đến quyền học tập phải tuân theo tài liệu này. Không được sửa tài liệu để hợp thức hoá code.

Tài liệu này là nguồn sự thật duy nhất (Source of Truth) cho API-level Guard trong hệ thống Gia sư Toán AI. Mọi quyết định về thiết kế, triển khai, và kiểm thử liên quan đến quyền API phải dựa trên tài liệu này.

Tài liệu này phụ thuộc trực tiếp vào Student Lifecycle – System Law, Trial Policy – System Law, Chapter Progression – System Law, Skill & Mastery Rules – System Law, và License Rules – System Law. Mọi quy định trong Permission Matrix phải tuân thủ và không được mâu thuẫn với các System Law phụ thuộc.

---

---

## 6. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Student Lifecycle](01-student-lifecycle.md)
  - [Trial Policy](02-trial-policy.md)
  - [Chapter Progression](03-chapter-progression.md)
  - [License Rules](04-license-rules.md)
  - [Skill & Mastery Rules](05-skill-mastery-rules.md)
  - [AI Scoring & Practice Generation Contract](07-ai-scoring-practice-generation-contract.md)

---

[← Quay lại Overview](README.md)

