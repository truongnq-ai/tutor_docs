# Chapter Progression – Luật hệ thống

**Dự án:** Gia sư Toán AI  
**Phụ thuộc:**
- Student Lifecycle – System Law
- Trial Policy – System Law  
**Trạng thái:** Frozen – System Law  
**Mục đích:** Định nghĩa tiến độ học tập theo Chapter

---

## PHẦN 1 – VAI TRÒ CỦA CHAPTER

### 1.1. Chapter là đơn vị tiến độ học tập (unlock, học, hoàn thành)

Chapter là đơn vị cơ bản và duy nhất để đo lường và quản lý tiến độ học tập của học sinh. Mọi logic liên quan đến việc mở khóa (unlock), học tập (learning), và hoàn thành (completion) đều được quy chiếu về Chapter. Chapter không chỉ là một tập hợp nội dung học tập mà còn là đơn vị quản lý tiến độ.

### 1.2. Chapter không chỉ là tập nội dung

Chapter không chỉ đơn thuần là một tập hợp nội dung học tập (skill, practice, question). Chapter còn có các thuộc tính và trạng thái riêng để quản lý tiến độ học tập. Mỗi Chapter có trạng thái progression riêng, có điều kiện unlock riêng, và có logic hoàn thành riêng.

### 1.3. Mọi logic "học đến đâu" đều quy chiếu về Chapter

Mọi logic xác định học sinh "học đến đâu" trong chương trình đều phải quy chiếu về Chapter. Hệ thống không được sử dụng các đơn vị khác (như skill, practice, hoặc câu hỏi) để xác định tiến độ tổng thể. Chapter là nguồn sự thật duy nhất để xác định vị trí học tập của học sinh trong chương trình.

---

## PHẦN 2 – ĐIỀU KIỆN ÁP DỤNG

### 2.1. Chapter Progression CHỈ áp dụng khi student.lifecycle_state = LICENSE_ACTIVE

Chapter Progression chỉ có hiệu lực và được áp dụng khi Student đang ở trạng thái lifecycle `LICENSE_ACTIVE`. Đây là điều kiện bắt buộc và duy nhất để Chapter Progression hoạt động. Khi Student không ở trạng thái `LICENSE_ACTIVE`, toàn bộ logic Chapter Progression bị đóng băng.

### 2.2. Khi không ở LICENSE_ACTIVE, progression bị đóng băng

Khi Student không ở trạng thái `LICENSE_ACTIVE` (ví dụ: `TRIAL_ACTIVE`, `TRIAL_EXPIRED`, `LINKED_NO_LICENSE`, `LICENSE_EXPIRED`, `SUSPENDED`), Chapter Progression bị đóng băng hoàn toàn. Điều này có nghĩa:

- Trạng thái Chapter không được thay đổi
- Chapter không được unlock
- Chapter không được đánh dấu hoàn thành
- Mastery không được sử dụng để đánh giá hoàn thành Chapter
- Không có chuyển trạng thái Chapter nào được phép

### 2.3. Trial chapter KHÔNG dùng logic này

Chapter trial (Chapter được sử dụng trong trial) không sử dụng logic Chapter Progression. Chapter trial hoạt động theo quy định của Trial Policy, không có trạng thái progression, không có logic unlock, và không có logic hoàn thành. Khi học sinh mua License và chuyển sang `LICENSE_ACTIVE`, Chapter trial phải được học lại từ đầu theo logic Chapter Progression.

---

## PHẦN 3 – TRẠNG THÁI CHAPTER

Hệ thống chỉ sử dụng các trạng thái Chapter sau đây. Không được thêm, bớt, hoặc đổi tên các trạng thái này.

### 3.1. LOCKED

**Ý nghĩa nghiệp vụ:**  
Chapter chưa được mở khóa (unlock). Học sinh không thể truy cập nội dung của Chapter, không thể xem skill, không thể tạo practice, và không thể thực hiện bất kỳ hoạt động học tập nào trong Chapter này.

**Điều kiện:**  
Chapter ở trạng thái LOCKED khi:
- Chapter chưa bao giờ được unlock
- Hoặc Chapter trước đó (Chapter N-1) chưa được hoàn thành (COMPLETED)

### 3.2. UNLOCKED

**Ý nghĩa nghiệp vụ:**  
Chapter đã được mở khóa nhưng học sinh chưa bắt đầu học. Học sinh có thể xem nội dung Chapter, xem danh sách skill, nhưng chưa thể tạo practice. Chapter ở trạng thái sẵn sàng để học sinh bắt đầu học.

**Điều kiện:**  
Chapter ở trạng thái UNLOCKED khi:
- Chapter trước đó (Chapter N-1) đã được hoàn thành (COMPLETED)
- Và học sinh chưa bắt đầu học Chapter này (chưa chuyển sang IN_PROGRESS)

### 3.3. IN_PROGRESS

**Ý nghĩa nghiệp vụ:**  
Học sinh đang học Chapter này. Học sinh có thể tạo practice, làm câu hỏi, cập nhật mastery, và thực hiện mọi hoạt động học tập trong Chapter. Đây là trạng thái duy nhất cho phép học sinh tiến bộ trong Chapter.

**Điều kiện:**  
Chapter ở trạng thái IN_PROGRESS khi:
- Học sinh đã bắt đầu học Chapter (đã tạo practice đầu tiên hoặc đã chọn Chapter để học)
- Và Chapter chưa được hoàn thành (chưa đạt điều kiện COMPLETED)

### 3.4. COMPLETED

**Ý nghĩa nghiệp vụ:**  
Chapter đã được hoàn thành. Học sinh đã đạt được tất cả điều kiện để hoàn thành Chapter. Học sinh có thể xem lại nội dung và lịch sử học tập của Chapter, nhưng không thể tạo practice mới hoặc cập nhật mastery trong Chapter này.

**Điều kiện:**  
Chapter ở trạng thái COMPLETED khi:
- 100% skill bắt buộc trong Chapter đạt mastery ≥ threshold
- Student đang ở trạng thái `LICENSE_ACTIVE`
- Student không bị SUSPENDED

### 3.5. Mỗi Chapter chỉ có 1 trạng thái tại một thời điểm

Mỗi Chapter tại bất kỳ thời điểm nào chỉ có thể ở một và chỉ một trạng thái. Không có trường hợp Chapter đồng thời ở nhiều trạng thái hoặc không có trạng thái. Trạng thái Chapter phải được lưu trữ rõ ràng và không được suy luận từ các dữ liệu khác.

### 3.6. Không có trạng thái ngầm

Mọi trạng thái Chapter đều phải được định nghĩa rõ ràng và lưu trữ trong hệ thống. Không có trạng thái ngầm định, trạng thái mặc định, hoặc trạng thái được suy luận từ các dữ liệu khác. Hệ thống phải kiểm tra trạng thái Chapter trực tiếp từ trường lưu trữ trạng thái, không được suy luận từ mastery, practice, hoặc bất kỳ dữ liệu nào khác.

---

## PHẦN 4 – QUY TẮC CHUYỂN TRẠNG THÁI CHAPTER

### 4.1. Các chuyển trạng thái hợp lệ

Hệ thống chỉ cho phép các chuyển trạng thái sau đây:

#### 4.1.1. LOCKED → UNLOCKED

**Điều kiện:**  
- Chapter trước đó (Chapter N-1) đã được hoàn thành (COMPLETED)
- Student đang ở trạng thái `LICENSE_ACTIVE`
- Student không bị SUSPENDED

**Cơ chế:**  
Chuyển trạng thái này xảy ra tự động khi điều kiện được thỏa mãn. Không cần hành động thủ công từ học sinh.

#### 4.1.2. UNLOCKED → IN_PROGRESS

**Điều kiện:**  
- Chapter đang ở trạng thái UNLOCKED
- Học sinh bắt đầu học Chapter (tạo practice đầu tiên hoặc chọn Chapter để học)
- Student đang ở trạng thái `LICENSE_ACTIVE`
- Student không bị SUSPENDED

**Cơ chế:**  
Chuyển trạng thái này xảy ra khi học sinh thực hiện hành động bắt đầu học Chapter. Chapter chỉ được chuyển sang trạng thái IN_PROGRESS khi practice đầu tiên được tạo thành công. Việc chọn Chapter để học trên UI, nếu không tạo practice, KHÔNG được phép làm thay đổi trạng thái Chapter.

#### 4.1.3. IN_PROGRESS → COMPLETED

**Điều kiện:**  
- Chapter đang ở trạng thái IN_PROGRESS
- 100% skill bắt buộc trong Chapter đạt mastery ≥ threshold
- Student đang ở trạng thái `LICENSE_ACTIVE`
- Student không bị SUSPENDED

**Cơ chế:**  
Chuyển trạng thái này xảy ra tự động khi điều kiện được thỏa mãn sau khi practice được submit và mastery được cập nhật.

### 4.2. Các chuyển trạng thái KHÔNG HỢP LỆ

Các chuyển trạng thái sau đây là **KHÔNG HỢP LỆ** và không được phép:

- `COMPLETED` → `IN_PROGRESS` (không được quay lại học Chapter đã hoàn thành)
- `COMPLETED` → `UNLOCKED` (không được reset Chapter đã hoàn thành)
- `COMPLETED` → `LOCKED` (không được khóa lại Chapter đã hoàn thành)
- `IN_PROGRESS` → `UNLOCKED` (không được quay lại trạng thái unlock khi đang học)
- `IN_PROGRESS` → `LOCKED` (không được khóa Chapter đang học)
- `UNLOCKED` → `LOCKED` (không được khóa lại Chapter đã unlock)
- Bất kỳ chuyển trạng thái nào không được liệt kê trong phần 4.1

### 4.3. Chuyển trạng thái là one-way

Các chuyển trạng thái Chapter là one-way (một chiều). Một khi Chapter đã chuyển sang trạng thái mới, Chapter không thể quay lại trạng thái cũ, trừ các trường hợp đặc biệt được định nghĩa trong phần Edge Cases (ví dụ: khi License hết hạn).

---

## PHẦN 5 – ACTIVE CHAPTER RULES

### 5.1. Tại một thời điểm, Student chỉ có 1 Chapter IN_PROGRESS

Tại bất kỳ thời điểm nào, Student chỉ được phép có một và chỉ một Chapter ở trạng thái `IN_PROGRESS`. Đây là quy tắc nghiêm ngặt để đảm bảo học sinh tập trung vào một Chapter tại một thời điểm.

### 5.2. Chỉ Chapter IN_PROGRESS mới được tạo practice

Chỉ Chapter đang ở trạng thái `IN_PROGRESS` mới được phép tạo practice mới. Hệ thống phải từ chối mọi yêu cầu tạo practice cho Chapter không ở trạng thái `IN_PROGRESS`.

### 5.3. Không tạo practice cho Chapter LOCKED hoặc COMPLETED

Hệ thống không được phép tạo practice cho:
- Chapter ở trạng thái `LOCKED`: Chapter chưa được mở khóa
- Chapter ở trạng thái `COMPLETED`: Chapter đã hoàn thành

Hệ thống phải kiểm tra trạng thái Chapter trước khi cho phép tạo practice. Nếu Chapter không ở trạng thái `IN_PROGRESS`, hệ thống phải từ chối yêu cầu tạo practice.

### 5.4. Chapter UNLOCKED có thể chuyển sang IN_PROGRESS khi bắt đầu học

Chapter ở trạng thái `UNLOCKED` có thể chuyển sang `IN_PROGRESS` khi học sinh bắt đầu học Chapter (tạo practice đầu tiên). Khi học sinh tạo practice đầu tiên trong Chapter `UNLOCKED`, Chapter tự động chuyển sang `IN_PROGRESS`. Chapter chỉ được chuyển sang trạng thái IN_PROGRESS khi practice đầu tiên được tạo thành công. Việc chọn Chapter để học trên UI, nếu không tạo practice, KHÔNG được phép làm thay đổi trạng thái Chapter.

---

## PHẦN 6 – SKILL & MASTERY TRONG CHAPTER

### 6.1. Skill bắt buộc vs Skill bổ trợ

Trong mỗi Chapter, skill được phân loại thành hai loại:

#### 6.1.1. Skill bắt buộc (Required Skills)

Skill bắt buộc là các skill mà học sinh phải đạt được mastery threshold để hoàn thành Chapter. Skill bắt buộc là điều kiện cần và đủ để Chapter được coi là hoàn thành. Mỗi Chapter có một danh sách skill bắt buộc được định nghĩa cố định.

#### 6.1.2. Skill bổ trợ (Optional Skills)

Skill bổ trợ là các skill không bắt buộc để hoàn thành Chapter. Học sinh có thể học skill bổ trợ để nâng cao kiến thức, nhưng mastery của skill bổ trợ không được tính vào điều kiện hoàn thành Chapter.

### 6.2. Chỉ Skill bắt buộc dùng để xét hoàn thành Chapter

Chỉ skill bắt buộc được sử dụng để đánh giá việc hoàn thành Chapter. Skill bổ trợ không được tính vào điều kiện hoàn thành Chapter, dù học sinh có đạt được mastery cao đến đâu trong skill bổ trợ.

### 6.3. Mastery threshold áp dụng cho Skill bắt buộc

Để một skill bắt buộc được coi là "đạt được", học sinh phải đạt mastery level ≥ threshold. Threshold này được áp dụng cho tất cả skill bắt buộc trong Chapter.

**Ví dụ minh họa:**  
Nếu mastery threshold là 80%, thì:
- Skill bắt buộc có mastery ≥ 80% được coi là "đạt được"
- Skill bắt buộc có mastery < 80% chưa được coi là "đạt được"

### 6.4. 100% skill bắt buộc phải đạt threshold

Để Chapter được coi là hoàn thành (COMPLETED), 100% skill bắt buộc trong Chapter phải đạt mastery ≥ threshold. Không có ngoại lệ. Nếu chỉ một skill bắt buộc chưa đạt threshold, Chapter không thể được đánh dấu là COMPLETED.

---

## PHẦN 7 – LOGIC HOÀN THÀNH CHAPTER

### 7.1. Điều kiện hoàn thành Chapter

Chapter được coi là COMPLETED khi đồng thời thỏa mãn tất cả các điều kiện sau:

1. **100% skill bắt buộc đạt mastery ≥ threshold:** Tất cả skill bắt buộc trong Chapter phải có mastery level ≥ threshold được định nghĩa.

2. **Student đang LICENSE_ACTIVE:** Student phải đang ở trạng thái lifecycle `LICENSE_ACTIVE`. Nếu Student không ở `LICENSE_ACTIVE`, Chapter không thể được đánh dấu là COMPLETED, dù tất cả skill bắt buộc đã đạt threshold.

3. **Không bị SUSPENDED:** Student không được ở trạng thái `SUSPENDED`. Nếu Student bị SUSPENDED, Chapter không thể được đánh dấu là COMPLETED.

### 7.2. Completion là one-way

Một khi Chapter đã được đánh dấu là COMPLETED, Chapter không thể quay lại trạng thái `IN_PROGRESS` hoặc bất kỳ trạng thái nào khác. Completion là one-way (một chiều) và không thể đảo ngược, trừ các trường hợp đặc biệt được định nghĩa trong phần Edge Cases.

### 7.3. Không reset mastery

Khi Chapter được đánh dấu là COMPLETED, mastery của các skill trong Chapter không được reset. Mastery được giữ nguyên ở mức đã đạt được. Hệ thống không được phép thay đổi, reset, hoặc làm giảm mastery khi Chapter được hoàn thành.

### 7.4. Không hoàn thành dựa trên thời gian

Chapter không thể được hoàn thành dựa trên thời gian. Việc hoàn thành Chapter chỉ phụ thuộc vào mastery của skill bắt buộc, không phụ thuộc vào:
- Thời gian học Chapter
- Số lượng practice đã làm
- Số lượng câu hỏi đã trả lời
- Bất kỳ yếu tố thời gian nào khác

### 7.5. Đánh giá hoàn thành sau mỗi practice

Hệ thống phải đánh giá lại điều kiện hoàn thành Chapter sau mỗi lần practice được submit và mastery được cập nhật. Nếu sau khi cập nhật mastery, tất cả điều kiện hoàn thành được thỏa mãn, Chapter tự động chuyển sang trạng thái COMPLETED.

---

## PHẦN 8 – UNLOCK CHAPTER TIẾP THEO

### 8.1. Chapter N+1 được UNLOCKED khi Chapter N COMPLETED

Chapter tiếp theo (Chapter N+1) được tự động unlock (chuyển sang trạng thái UNLOCKED) khi Chapter hiện tại (Chapter N) được đánh dấu là COMPLETED. Đây là quy tắc nghiêm ngặt và tự động.

### 8.2. Unlock là hệ quả logic, không phải hành động thủ công

Việc unlock Chapter tiếp theo là hệ quả logic tự động, không phải hành động thủ công từ học sinh hoặc phụ huynh. Khi Chapter N được đánh dấu là COMPLETED, hệ thống tự động unlock Chapter N+1 ngay lập tức, không cần bất kỳ hành động nào từ người dùng.

### 8.3. Trial data KHÔNG được dùng để unlock

Dữ liệu từ trial (trial data) không được sử dụng để unlock Chapter. Điều này có nghĩa:
- Mastery đạt được trong trial không được tính vào điều kiện unlock Chapter
- Practice đã làm trong trial không được tính vào điều kiện unlock Chapter
- Tiến độ trong trial không được sử dụng để unlock Chapter tiếp theo

Khi học sinh mua License và chuyển sang `LICENSE_ACTIVE`, học sinh phải bắt đầu lại từ Chapter đầu tiên và unlock Chapter theo logic Chapter Progression, không được sử dụng dữ liệu từ trial.

### 8.4. Unlock chỉ xảy ra khi LICENSE_ACTIVE

Chapter chỉ được unlock khi Student đang ở trạng thái `LICENSE_ACTIVE`. Nếu Student không ở `LICENSE_ACTIVE`, dù Chapter trước đó đã COMPLETED, Chapter tiếp theo không được unlock cho đến khi Student chuyển sang `LICENSE_ACTIVE`.

---

## PHẦN 9 – PRACTICE → PROGRESSION FLOW

### 9.1. Flow chuẩn

Flow chuẩn của Chapter Progression được mô tả như sau:

1. **Start Practice:** Học sinh bắt đầu một practice trong Chapter đang ở trạng thái `IN_PROGRESS`.

2. **Answer Questions:** Học sinh trả lời các câu hỏi trong practice.

3. **Submit Practice:** Học sinh submit practice và kết quả được ghi nhận.

4. **Update Skill Mastery:** Hệ thống cập nhật mastery level của các skill liên quan dựa trên kết quả practice.

5. **Re-evaluate Chapter Completion:** Hệ thống đánh giá lại điều kiện hoàn thành Chapter. Nếu tất cả điều kiện được thỏa mãn, Chapter chuyển sang trạng thái COMPLETED và Chapter tiếp theo được unlock.

### 9.2. Practice là trigger duy nhất cập nhật progression

Practice là trigger (kích hoạt) duy nhất để cập nhật Chapter Progression. Chỉ khi practice được submit và mastery được cập nhật, hệ thống mới đánh giá lại trạng thái Chapter và thực hiện các chuyển trạng thái nếu cần. Không có cơ chế nào khác (như thời gian, số lượng câu hỏi, hoặc hành động thủ công) có thể cập nhật Chapter Progression.

### 9.3. Không cập nhật progression ngoài practice flow

Hệ thống không được phép cập nhật Chapter Progression ngoài practice flow. Điều này có nghĩa:
- Không cập nhật progression dựa trên thời gian
- Không cập nhật progression dựa trên số lượng câu hỏi đã làm
- Quản trị viên không được phép cập nhật hoặc thay đổi Chapter Progression. Mọi hành động quản trị (nếu có) chỉ được phép ở chế độ read-only và không làm thay đổi trạng thái Chapter, mastery, hoặc progression.
- Không cập nhật progression dựa trên bất kỳ yếu tố nào khác ngoài practice submission

---

## PHẦN 10 – CHAPTER & LIFECYCLE EDGE CASES

### 10.1. License hết hạn giữa Chapter

Khi License hết hạn trong lúc học sinh đang học Chapter (Chapter đang ở trạng thái `IN_PROGRESS`):

- Chapter vẫn giữ nguyên trạng thái `IN_PROGRESS` (không bị reset về UNLOCKED hoặc LOCKED)
- Học sinh không thể tạo practice mới (vì không còn ở `LICENSE_ACTIVE`)
- Học sinh không thể cập nhật mastery
- Chapter không thể được đánh dấu là COMPLETED (vì không ở `LICENSE_ACTIVE`)
- Khi License được gia hạn và Student quay lại `LICENSE_ACTIVE`, học sinh có thể tiếp tục học Chapter từ trạng thái `IN_PROGRESS` hiện tại

### 10.2. Suspend trong Chapter và unsuspend sau đó

Khi học sinh bị suspend trong lúc đang học Chapter (Chapter đang ở trạng thái `IN_PROGRESS`):

- Chapter vẫn giữ nguyên trạng thái `IN_PROGRESS` (không bị reset)
- Học sinh không thể tạo practice mới (vì bị SUSPENDED)
- Học sinh không thể cập nhật mastery
- Chapter không thể được đánh dấu là COMPLETED (vì bị SUSPENDED)
- Khi unsuspend, nếu Student quay lại `LICENSE_ACTIVE`, học sinh có thể tiếp tục học Chapter từ trạng thái `IN_PROGRESS` hiện tại
- Khi unsuspend, nếu License đã hết hạn trong thời gian suspend, Student quay về `LICENSE_EXPIRED` và không thể tiếp tục học

### 10.3. Chapter COMPLETED nhưng chưa unlock được tiếp do lifecycle

Khi Chapter đã được đánh dấu là COMPLETED nhưng Student không ở trạng thái `LICENSE_ACTIVE` (ví dụ: License hết hạn, bị suspend):

- Chapter vẫn giữ nguyên trạng thái COMPLETED (không bị reset)
- Chapter tiếp theo không được unlock (vì không ở `LICENSE_ACTIVE`)
- Khi Student quay lại `LICENSE_ACTIVE`, Chapter tiếp theo tự động được unlock ngay lập tức (vì Chapter trước đó đã COMPLETED)

### 10.4. Chapter IN_PROGRESS khi chuyển từ trial sang license

Khi học sinh mua License từ trial và chuyển sang `LICENSE_ACTIVE`:

- Chapter trial không có trạng thái progression (theo Trial Policy)
- Học sinh phải bắt đầu lại từ Chapter đầu tiên với trạng thái progression mới
- Chapter đầu tiên được đặt ở trạng thái UNLOCKED (hoặc IN_PROGRESS nếu học sinh bắt đầu học ngay)
- Dữ liệu trial không được sử dụng để xác định trạng thái Chapter

---

## PHẦN 11 – REVIEW & READ-ONLY

### 11.1. Student được review Chapter COMPLETED

Học sinh được phép review (xem lại) Chapter đã hoàn thành (COMPLETED). Khi review, học sinh có thể:
- Xem lại nội dung Chapter
- Xem lại danh sách skill và mastery đã đạt được
- Xem lại lịch sử practice đã làm
- Xem lại kết quả câu hỏi đã trả lời

### 11.2. Không được tạo practice mới khi review

Khi học sinh review Chapter COMPLETED, học sinh không được phép tạo practice mới trong Chapter đó. Hệ thống phải từ chối mọi yêu cầu tạo practice cho Chapter đã COMPLETED. Khi review Chapter COMPLETED, học sinh không được phép tạo bất kỳ loại practice nào, bao gồm cả practice mô phỏng, practice không tính điểm, hoặc practice chỉ để xem câu hỏi.

### 11.3. Không cập nhật mastery khi review

Khi học sinh review Chapter COMPLETED, mastery của các skill trong Chapter không được cập nhật. Mastery được giữ nguyên ở mức đã đạt được khi Chapter được hoàn thành. Hệ thống không được phép thay đổi mastery khi học sinh review Chapter.

### 11.4. Review là read-only operation

Review Chapter COMPLETED là một read-only operation (thao tác chỉ đọc). Học sinh chỉ có thể xem dữ liệu, không thể thay đổi bất kỳ dữ liệu nào trong Chapter đã hoàn thành.

---

## PHẦN 12 – CHECKLIST ÉP CODE

Các hành vi sau đây được coi là **VI PHẠM** nếu code thực hiện chúng. Code phải được sửa lại để tuân theo Chapter Progression.

### 12.1. Vi phạm về Trạng thái Chapter

- ❌ **VI PHẠM:** Nhiều Chapter đồng thời ở trạng thái IN_PROGRESS (cho phép học sinh có nhiều hơn 1 Chapter đang học)
- ❌ **VI PHẠM:** Chapter có trạng thái ngầm định (suy luận trạng thái từ dữ liệu khác thay vì đọc trực tiếp)
- ❌ **VI PHẠM:** Chapter COMPLETED quay lại IN_PROGRESS (cho phép reset Chapter đã hoàn thành)
- ❌ **VI PHẠM:** Chapter COMPLETED quay lại UNLOCKED hoặc LOCKED (cho phép reset Chapter đã hoàn thành)

### 12.2. Vi phạm về Điều kiện Áp dụng

- ❌ **VI PHẠM:** Chapter Progression hoạt động khi không ở LICENSE_ACTIVE (cho phép progression khi Student không ở `LICENSE_ACTIVE`)
- ❌ **VI PHẠM:** Trial chapter sử dụng logic Chapter Progression (áp dụng progression cho Chapter trial)
- ❌ **VI PHẠM:** Progression không bị đóng băng khi không ở LICENSE_ACTIVE (cho phép thay đổi trạng thái Chapter khi không ở `LICENSE_ACTIVE`)

### 12.3. Vi phạm về Practice & Progression

- ❌ **VI PHẠM:** Tạo practice cho Chapter không ở IN_PROGRESS (cho phép tạo practice cho Chapter LOCKED, UNLOCKED, hoặc COMPLETED)
- ❌ **VI PHẠM:** Cập nhật progression ngoài practice flow (cập nhật trạng thái Chapter dựa trên thời gian, số lượng câu hỏi, hoặc yếu tố khác)
- ❌ **VI PHẠM:** Progression không được đánh giá lại sau mỗi practice (không kiểm tra điều kiện hoàn thành sau khi submit practice)

### 12.4. Vi phạm về Hoàn thành Chapter

- ❌ **VI PHẠM:** Hoàn thành Chapter dựa trên thời gian (đánh dấu Chapter COMPLETED dựa trên thời gian học)
- ❌ **VI PHẠM:** Hoàn thành Chapter khi không ở LICENSE_ACTIVE (đánh dấu Chapter COMPLETED khi Student không ở `LICENSE_ACTIVE`)
- ❌ **VI PHẠM:** Hoàn thành Chapter khi bị SUSPENDED (đánh dấu Chapter COMPLETED khi Student bị SUSPENDED)
- ❌ **VI PHẠM:** Hoàn thành Chapter khi chưa đạt 100% skill bắt buộc (đánh dấu Chapter COMPLETED khi còn skill bắt buộc chưa đạt threshold)
- ❌ **VI PHẠM:** Reset mastery khi Chapter COMPLETED (thay đổi hoặc reset mastery khi Chapter được hoàn thành)

### 12.5. Vi phạm về Unlock Chapter

- ❌ **VI PHẠM:** Unlock Chapter không dựa trên completion (unlock Chapter tiếp theo khi Chapter trước chưa COMPLETED)
- ❌ **VI PHẠM:** Unlock Chapter thủ công (cho phép học sinh hoặc phụ huynh unlock Chapter thủ công)
- ❌ **VI PHẠM:** Sử dụng trial data để unlock Chapter (sử dụng mastery hoặc tiến độ từ trial để unlock Chapter)
- ❌ **VI PHẠM:** Unlock Chapter khi không ở LICENSE_ACTIVE (unlock Chapter khi Student không ở `LICENSE_ACTIVE`)

### 12.6. Vi phạm về Skill & Mastery

- ❌ **VI PHẠM:** Sử dụng skill bổ trợ để đánh giá hoàn thành Chapter (tính skill bổ trợ vào điều kiện hoàn thành)
- ❌ **VI PHẠM:** Hoàn thành Chapter khi skill bắt buộc chưa đạt threshold (đánh dấu Chapter COMPLETED khi còn skill bắt buộc có mastery < threshold)

### 12.7. Vi phạm về Review

- ❌ **VI PHẠM:** Tạo practice mới khi review Chapter COMPLETED (cho phép tạo practice trong Chapter đã hoàn thành)
- ❌ **VI PHẠM:** Cập nhật mastery khi review Chapter COMPLETED (thay đổi mastery khi học sinh review Chapter)

---

## PHẦN 13 – TUYÊN BỐ CUỐI

**Tài liệu này là LUẬT HỆ THỐNG.**

Mọi code, API hoặc chức năng liên quan đến Chapter Progression phải tuân theo tài liệu này. Không được sửa tài liệu để hợp thức hoá code.

Tài liệu này là nguồn sự thật duy nhất (Source of Truth) cho Chapter Progression trong hệ thống Gia sư Toán AI. Mọi quyết định về thiết kế, triển khai, và kiểm thử liên quan đến Chapter Progression phải dựa trên tài liệu này.

Tài liệu này phụ thuộc trực tiếp vào Student Lifecycle – System Law và Trial Policy – System Law. Mọi quy định trong Chapter Progression phải tuân thủ và không được mâu thuẫn với Student Lifecycle và Trial Policy.

---

**Phiên bản tài liệu:** 1.0  
**Ngày tạo:** 2025-01-27  
**Trạng thái:** Frozen – System Law

