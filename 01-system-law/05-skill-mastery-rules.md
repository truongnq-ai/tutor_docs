# Skill & Mastery Rules – Luật hệ thống

**Project:** Tutor  
**Document type:** System Law  
**Audience:** Developer | Product | Tech  
**Status:** Frozen – System Law  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này định nghĩa Skill là gì, Mastery được tính – cập nhật – sử dụng như thế nào trong hệ thống Tutor. Đây là luật hệ thống nghiêm ngặt, bất biến, và là nguồn sự thật duy nhất (Source of Truth) cho logic Skill và Mastery.

---

## PHẦN 1 – VAI TRÒ CỦA SKILL

### 1.1. Skill là đơn vị năng lực, KHÔNG phải đơn vị tiến độ

Skill là đơn vị đo lường năng lực học tập của học sinh trong một lĩnh vực kiến thức cụ thể. Skill không phải là đơn vị tiến độ học tập. Skill không có trạng thái progression riêng, không có logic unlock riêng, và không được sử dụng để xác định vị trí học tập tổng thể của học sinh.

### 1.2. Chapter là đơn vị tiến độ duy nhất

Chapter là đơn vị tiến độ học tập duy nhất trong hệ thống. Mọi logic xác định học sinh "học đến đâu" đều phải quy chiếu về Chapter, không phải về Skill. Skill chỉ là thành phần bên trong Chapter, không phải đơn vị quản lý tiến độ.

### 1.3. Skill không có FSM riêng

Skill không có Finite State Machine (FSM) riêng. Skill không có trạng thái progression, không có logic chuyển trạng thái, và không có quy tắc unlock. Skill chỉ có thuộc tính tĩnh (skill_type, difficulty, is_trial_enabled) và giá trị mastery động.

---

## PHẦN 2 – PHÂN LOẠI SKILL

### 2.1. REQUIRED vs OPTIONAL

Trong mỗi Chapter, skill được phân loại thành hai loại:

#### 2.1.1. REQUIRED (Skill bắt buộc)

Skill REQUIRED là các skill mà học sinh phải đạt được mastery threshold để hoàn thành Chapter. Skill REQUIRED là điều kiện cần và đủ để Chapter được coi là hoàn thành. Mỗi Chapter có một danh sách skill REQUIRED được định nghĩa cố định.

#### 2.1.2. OPTIONAL (Skill bổ trợ)

Skill OPTIONAL là các skill không bắt buộc để hoàn thành Chapter. Học sinh có thể học skill OPTIONAL để nâng cao kiến thức, nhưng mastery của skill OPTIONAL không được tính vào điều kiện hoàn thành Chapter.

### 2.2. OPTIONAL không ảnh hưởng Chapter Progression

Skill OPTIONAL không ảnh hưởng đến Chapter Progression. Mastery của skill OPTIONAL không được sử dụng để:
- Đánh giá hoàn thành Chapter
- Unlock Chapter tiếp theo
- Quyết định quyền truy cập nội dung
- Bất kỳ mục đích nào liên quan đến progression

OPTIONAL mastery chỉ mang tính tham chiếu năng lực và KHÔNG BAO GIỜ được sử dụng làm điều kiện kích hoạt bất kỳ chuyển trạng thái nào trong Chapter Progression.

### 2.3. Thuộc tính tĩnh của Skill

Mỗi Skill có các thuộc tính tĩnh sau đây, được định nghĩa cố định và không thay đổi:

#### 2.3.1. skill_type

`skill_type` xác định loại skill (REQUIRED hoặc OPTIONAL). Thuộc tính này được định nghĩa khi tạo Skill và không thay đổi.

#### 2.3.2. difficulty

`difficulty` xác định độ khó của skill (ví dụ: dễ, trung bình, khó). Thuộc tính này được định nghĩa khi tạo Skill và không thay đổi.

#### 2.3.3. is_trial_enabled

`is_trial_enabled` xác định skill có được mở trong trial hay không. Thuộc tính này được định nghĩa khi tạo Skill và không thay đổi.

---

## PHẦN 3 – MASTERY: ĐỊNH NGHĨA & GIÁ TRỊ

### 3.1. Mastery là thước đo định lượng duy nhất của Skill

Mastery là thước đo định lượng duy nhất để đánh giá mức độ thành thạo của học sinh đối với một Skill. Mastery được biểu diễn bằng một số nguyên từ 0 đến 100, trong đó:
- 0: Học sinh chưa có năng lực trong skill này
- 100: Học sinh đã thành thạo hoàn toàn skill này

### 3.2. Range: 0 ≤ mastery ≤ 100

Mastery phải nằm trong khoảng từ 0 đến 100 (bao gồm cả hai giá trị). Đây là giới hạn nghiêm ngặt: mastery không được nhỏ hơn 0 và không được lớn hơn 100.

### 3.3. KHÔNG cho phép mastery > 100

Hệ thống không được phép tính toán, lưu trữ, hoặc hiển thị mastery lớn hơn 100. Nếu kết quả tính toán mastery vượt quá 100, hệ thống phải cắt bớt (clamp) về 100. Nếu kết quả tính toán mastery nhỏ hơn 0, hệ thống phải cắt bớt về 0.

### 3.4. KHÔNG có decay mastery theo thời gian

Mastery không bị giảm (decay) theo thời gian. Một khi học sinh đã đạt được một mức mastery, mastery đó được giữ nguyên cho đến khi được cập nhật bởi kết quả practice mới. Hệ thống không được phép tự động giảm mastery dựa trên:
- Thời gian không học
- Thời gian kể từ lần practice cuối
- Bất kỳ yếu tố thời gian nào khác

---

## PHẦN 4 – ĐIỀU KIỆN CẬP NHẬT MASTERY

### 4.1. Mastery CHỈ cập nhật khi đồng thời thỏa mãn tất cả điều kiện sau

Mastery chỉ được phép cập nhật khi đồng thời thỏa mãn tất cả các điều kiện sau:

1. **Practice được submit hợp lệ:** Practice phải được submit thành công và kết quả được ghi nhận hợp lệ.

2. **Chapter = IN_PROGRESS:** Chapter chứa skill phải đang ở trạng thái `IN_PROGRESS`. Mastery không được cập nhật khi Chapter ở trạng thái LOCKED, UNLOCKED, hoặc COMPLETED.

3. **Student.lifecycle_state = LICENSE_ACTIVE:** Student phải đang ở trạng thái lifecycle `LICENSE_ACTIVE`. Mastery không được cập nhật khi Student ở bất kỳ trạng thái lifecycle nào khác.

4. **Student không bị SUSPENDED:** Student không được ở trạng thái `SUSPENDED`. Nếu Student bị SUSPENDED, mastery không được cập nhật, dù các điều kiện khác có thỏa mãn.

### 4.2. Các trường hợp KHÔNG cập nhật mastery

Hệ thống không được phép cập nhật mastery trong các trường hợp sau:

- **Practice chưa được submit:** Khi học sinh đang làm practice nhưng chưa submit, mastery không được cập nhật.

- **Chapter không ở IN_PROGRESS:** Khi Chapter ở trạng thái LOCKED, UNLOCKED, hoặc COMPLETED, mastery không được cập nhật.

- **Student không ở LICENSE_ACTIVE:** Khi Student ở trạng thái TRIAL_ACTIVE, TRIAL_EXPIRED, LINKED_NO_LICENSE, LICENSE_EXPIRED, hoặc SUSPENDED, mastery không được cập nhật.

- **Student bị SUSPENDED:** Khi Student bị SUSPENDED, mastery không được cập nhật, bất kể các điều kiện khác.

- **Review Chapter COMPLETED:** Khi học sinh review Chapter đã COMPLETED, mastery không được cập nhật, dù có tạo practice mô phỏng hoặc practice không tính điểm.

- **Trial (ngoài phạm vi cập nhật thông thường):** Trong trial, mastery được tính và hiển thị nhưng bị chặn trần ở 40% và không được sử dụng cho progression. Việc cập nhật mastery trong trial tuân theo quy định riêng của Trial Policy.

### 4.3. Invariant về Practice & Mastery

Bất kể loại practice nào (practice chính thức, practice mô phỏng, practice không tính điểm, hoặc practice review), mastery CHỈ được phép cập nhật khi practice đó:
- Thuộc Chapter đang IN_PROGRESS
- Được submit hợp lệ
- Thỏa mãn đầy đủ các điều kiện tại Mục 4.1

Mọi practice không thỏa mãn các điều kiện trên tuyệt đối KHÔNG được phép tác động đến mastery.

---

## PHẦN 5 – LOGIC TÍNH MASTERY

### 5.1. Mastery là hàm của kết quả làm bài

Mastery được tính toán dựa trên kết quả làm bài của học sinh trong practice. Mastery là một hàm số của:
- Số câu hỏi đúng
- Số câu hỏi sai
- Độ khó của câu hỏi
- Các yếu tố khác liên quan đến kết quả làm bài

### 5.2. KHÔNG phụ thuộc thời gian

Mastery không phụ thuộc vào thời gian. Mastery không được tính dựa trên:
- Thời gian làm bài
- Thời gian trả lời từng câu hỏi
- Thời gian kể từ lần practice trước
- Bất kỳ yếu tố thời gian nào khác

### 5.3. Công thức chi tiết KHÔNG nằm trong tài liệu này

Công thức tính toán mastery chi tiết (algorithm, formula, hoặc logic cụ thể) không được định nghĩa trong tài liệu này. Tài liệu này chỉ quy định:
- Điều kiện cập nhật mastery
- Phạm vi giá trị mastery (0-100)
- Các quy tắc sử dụng mastery
- Các ràng buộc và giới hạn

Công thức tính toán mastery được định nghĩa trong tài liệu khác hoặc được triển khai trong code.

---

## PHẦN 6 – MASTERY & TRIAL

### 6.1. Mastery trial vẫn được tính và hiển thị

Trong trial, hệ thống vẫn tính toán và hiển thị mastery level của học sinh. Mastery được tính dựa trên kết quả của các practice và câu hỏi mà học sinh đã làm trong trial, theo cùng logic tính mastery như trong License, nhưng bị chặn trần theo quy định của Trial Policy.

### 6.2. Chặn trần mastery trial = 40%

Mastery level tối đa mà học sinh có thể đạt được trong trial là 40% cho mỗi skill. Ngay cả khi học sinh làm đúng tất cả các câu hỏi trong trial, mastery vẫn không được vượt quá 40%. Giới hạn này áp dụng cho tất cả các skill trong Chapter trial.

### 6.3. Mastery trial KHÔNG dùng cho unlock / completion

Mastery đạt được trong trial không được sử dụng để:
- **Unlock chapter:** Mastery trong trial không được tính vào điều kiện unlock chapter tiếp theo
- **Đánh giá hoàn thành chương:** Mastery trong trial không được sử dụng để đánh giá việc hoàn thành Chapter

Khi học sinh mua License và chuyển sang học với License, mastery trong trial vẫn được giữ lại nhưng không được sử dụng cho các mục đích unlock hoặc đánh giá hoàn thành.

---

## PHẦN 7 – MASTERY & CHAPTER PROGRESSION

### 7.1. Threshold chỉ áp dụng cho skill REQUIRED

Mastery threshold chỉ được áp dụng cho skill REQUIRED. Skill OPTIONAL không có threshold và không được sử dụng để đánh giá hoàn thành Chapter, dù học sinh có đạt được mastery cao đến đâu.

### 7.2. Chapter COMPLETED khi 100% skill REQUIRED đạt threshold

Chapter được coi là COMPLETED khi và chỉ khi:
- 100% skill REQUIRED trong Chapter đạt mastery ≥ threshold
- Student đang ở trạng thái `LICENSE_ACTIVE`
- Student không bị SUSPENDED

Không có ngoại lệ. Nếu chỉ một skill REQUIRED chưa đạt threshold, Chapter không thể được đánh dấu là COMPLETED.

**⚠️ PHASE 1 OVERRIDE (TẠM THỜI):**

Trong Phase 1, hệ thống sử dụng Completion Rule tạm thời, KHÔNG dựa trên mastery threshold. Phase 1 cho phép Chapter COMPLETED dựa trên practice hợp lệ được submit, không yêu cầu mastery threshold.

**Lưu ý quan trọng:**
- Completion trong Phase 1 KHÔNG được hiểu là completion học thuật đầy đủ theo System Law gốc
- Completion Phase 1 chỉ là đánh dấu tiến độ tối giản, không phản ánh mức độ thành thạo thực tế
- Khi Phase 2 triển khai, completion rule sẽ quay về System Law gốc (mastery threshold)
- System Law gốc (mastery threshold) vẫn là nguồn sự thật duy nhất cho completion học thuật đầy đủ

### 7.3. OPTIONAL mastery không được xét

Mastery của skill OPTIONAL không được xét trong việc đánh giá hoàn thành Chapter. Dù học sinh có đạt được mastery 100% trong tất cả skill OPTIONAL, nếu còn skill REQUIRED chưa đạt threshold, Chapter vẫn không được đánh dấu là COMPLETED.

### 7.4. Mastery KHÔNG là trigger trạng thái

Mastery, dù ở bất kỳ mức nào, KHÔNG BAO GIỜ được sử dụng để:
- Tự động chuyển trạng thái Chapter
- Tự động tạo Chapter IN_PROGRESS
- Tự động unlock Chapter

Mastery chỉ được dùng để ĐÁNH GIÁ điều kiện hoàn thành Chapter theo quy định đã nêu, không được dùng làm trigger cho bất kỳ FSM nào.

---

## PHẦN 8 – REVIEW & READ-ONLY

### 8.1. Chapter COMPLETED → mastery read-only

Khi Chapter đã được đánh dấu là COMPLETED, mastery của tất cả skill trong Chapter trở thành read-only (chỉ đọc). Mastery được giữ nguyên ở mức đã đạt được khi Chapter được hoàn thành và không thể được cập nhật.

### 8.2. Không tạo practice

Khi review Chapter COMPLETED, học sinh không được phép tạo practice mới trong Chapter đó. Hệ thống phải từ chối mọi yêu cầu tạo practice, bao gồm cả practice mô phỏng, practice không tính điểm, hoặc practice chỉ để xem câu hỏi.

### 8.3. Không cập nhật mastery

Khi review Chapter COMPLETED, mastery của các skill trong Chapter không được cập nhật. Hệ thống không được phép thay đổi mastery khi học sinh review Chapter, bất kể học sinh có thực hiện bất kỳ hành động nào.

---

## PHẦN 9 – EDGE CASES

### 9.1. License hết hạn giữa practice

Khi License hết hạn trong lúc học sinh đang làm practice:

- Practice đang làm dở phải được dừng lại ngay lập tức
- Mastery không được cập nhật dựa trên phần đã làm trong practice dở
- Dữ liệu đã làm trong practice dở được lưu lại nhưng không được tính vào mastery
- Khi License được gia hạn và Student quay lại `LICENSE_ACTIVE`, học sinh có thể tiếp tục học nhưng không thể tiếp tục practice đã bị gián đoạn

### 9.2. Suspend override mastery

Khi Student bị SUSPENDED trong lúc đang làm practice:

- Practice đang làm dở phải được dừng lại ngay lập tức
- Mastery không được cập nhật dựa trên phần đã làm trong practice dở
- Dữ liệu đã làm trong practice dở được lưu lại nhưng không được tính vào mastery
- Khi unsuspend, nếu Student quay lại `LICENSE_ACTIVE`, học sinh có thể tiếp tục học nhưng không thể tiếp tục practice đã bị gián đoạn

### 9.3. Mastery vượt quá 100% trong tính toán

Khi kết quả tính toán mastery vượt quá 100%:

- Hệ thống phải cắt bớt (clamp) mastery về 100%
- Hệ thống không được phép lưu trữ hoặc hiển thị mastery > 100%
- Hệ thống không được phép báo lỗi hoặc từ chối cập nhật, mà phải tự động điều chỉnh về 100%

### 9.4. Mastery âm trong tính toán

Khi kết quả tính toán mastery nhỏ hơn 0:

- Hệ thống phải cắt bớt (clamp) mastery về 0
- Hệ thống không được phép lưu trữ hoặc hiển thị mastery < 0
- Hệ thống không được phép báo lỗi hoặc từ chối cập nhật, mà phải tự động điều chỉnh về 0

---

## PHẦN 10 – CHECKLIST ÉP CODE

Các hành vi sau đây được coi là **VI PHẠM** nếu code thực hiện chúng. Code phải được sửa lại để tuân theo Skill & Mastery Rules.

### 10.1. Vi phạm về Điều kiện Cập nhật Mastery

- ❌ **VI PHẠM:** Update mastery khi không LICENSE_ACTIVE (cập nhật mastery khi Student không ở `LICENSE_ACTIVE`)
- ❌ **VI PHẠM:** Update mastery khi Chapter không IN_PROGRESS (cập nhật mastery khi Chapter ở trạng thái LOCKED, UNLOCKED, hoặc COMPLETED)
- ❌ **VI PHẠM:** Update mastery khi Student bị SUSPENDED (cập nhật mastery khi Student ở trạng thái `SUSPENDED`)
- ❌ **VI PHẠM:** Update mastery khi practice chưa được submit (cập nhật mastery trước khi practice được submit)
- ❌ **VI PHẠM:** Update mastery khi review Chapter COMPLETED (cập nhật mastery khi học sinh review Chapter đã hoàn thành)

### 10.2. Vi phạm về Phạm vi Giá trị Mastery

- ❌ **VI PHẠM:** Mastery > 100 (cho phép mastery vượt quá 100)
- ❌ **VI PHẠM:** Mastery < 0 (cho phép mastery nhỏ hơn 0)
- ❌ **VI PHẠM:** Không clamp mastery về 0-100 (không cắt bớt mastery khi vượt quá phạm vi)

### 10.3. Vi phạm về Decay Mastery

- ❌ **VI PHẠM:** Decay mastery theo thời gian (tự động giảm mastery dựa trên thời gian không học)
- ❌ **VI PHẠM:** Decay mastery theo thời gian kể từ practice cuối (tự động giảm mastery dựa trên thời gian kể từ lần practice cuối)

### 10.4. Vi phạm về Skill OPTIONAL

- ❌ **VI PHẠM:** Dùng OPTIONAL mastery để complete Chapter (sử dụng mastery của skill OPTIONAL để đánh giá hoàn thành Chapter)
- ❌ **VI PHẠM:** Tính OPTIONAL mastery vào threshold (tính mastery của skill OPTIONAL vào điều kiện đạt threshold)

### 10.5. Vi phạm về Mastery Trial

- ❌ **VI PHẠM:** Dùng mastery trial cho progression (sử dụng mastery đạt được trong trial để unlock chapter hoặc đánh giá hoàn thành)
- ❌ **VI PHẠM:** Mastery trial vượt quá 40% (cho phép mastery trong trial vượt quá 40%)

### 10.6. Vi phạm về Renewal & Reset

- ❌ **VI PHẠM:** Reset mastery khi renewal (reset hoặc xóa mastery khi License được gia hạn)
- ❌ **VI PHẠM:** Reset mastery khi chuyển từ trial sang license (reset mastery khi học sinh mua License từ trial)

### 10.7. Vi phạm về Review

- ❌ **VI PHẠM:** Update mastery khi review (cập nhật mastery khi học sinh review Chapter COMPLETED)
- ❌ **VI PHẠM:** Tạo practice khi review (cho phép tạo practice mới khi review Chapter COMPLETED)

### 10.8. Vi phạm về Skill & Progression

- ❌ **VI PHẠM:** Skill có FSM riêng (tạo trạng thái progression riêng cho Skill)
- ❌ **VI PHẠM:** Skill được dùng làm đơn vị tiến độ (sử dụng Skill để xác định vị trí học tập tổng thể)

---

## PHẦN 11 – TUYÊN BỐ CUỐI

**Tài liệu này là LUẬT HỆ THỐNG.**

Mọi code, API hoặc chức năng liên quan đến Skill và Mastery phải tuân theo tài liệu này. Không được sửa tài liệu để hợp thức hoá code.

Tài liệu này là nguồn sự thật duy nhất (Source of Truth) cho Skill & Mastery Rules trong hệ thống Gia sư Toán AI. Mọi quyết định về thiết kế, triển khai, và kiểm thử liên quan đến Skill và Mastery phải dựa trên tài liệu này.

Tài liệu này phụ thuộc trực tiếp vào Student Lifecycle – System Law, Trial Policy – System Law, Chapter Progression – System Law, và License Rules – System Law. Mọi quy định trong Skill & Mastery Rules phải tuân thủ và không được mâu thuẫn với các System Law phụ thuộc.

---

---

## 6. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Student Lifecycle](01-student-lifecycle.md)
  - [Trial Policy](02-trial-policy.md)
  - [Chapter Progression](03-chapter-progression.md)
  - [License Rules](04-license-rules.md)
  - [Permission Matrix](06-permission-matrix.md)

---

[← Quay lại Overview](README.md)

