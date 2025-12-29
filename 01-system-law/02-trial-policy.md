# Trial Policy – Luật hệ thống

**Dự án:** Gia sư Toán AI  
**Phụ thuộc:** Student Lifecycle – System Law  
**Trạng thái:** Frozen – System Law  
**Mục đích:** Định nghĩa phạm vi, giới hạn và hành vi của trial

---

## PHẦN 1 – VAI TRÒ CỦA TRIAL

### 1.1. Trial là công cụ trải nghiệm, KHÔNG phải giai đoạn học đầy đủ

Trial được thiết kế để cho phép học sinh trải nghiệm hệ thống và nội dung học tập, không phải để hoàn thành chương trình học. Trial cung cấp một phần nhỏ của nội dung để học sinh có thể đánh giá chất lượng và phù hợp của hệ thống trước khi quyết định mua License.

### 1.2. Trial không nhằm hoàn thành chương trình

Trial không được thiết kế để học sinh có thể hoàn thành bất kỳ chương trình học nào. Phạm vi và giới hạn của trial được định nghĩa rõ ràng để đảm bảo học sinh chỉ có thể trải nghiệm một phần nhỏ của nội dung, không đủ để hoàn thành chương trình.

### 1.3. Trial không thay thế license

Trial là một công cụ marketing và trải nghiệm, không phải là giải pháp học tập đầy đủ. Trial không thể thay thế License về mặt chức năng, phạm vi nội dung, hoặc quyền truy cập. Học sinh muốn học đầy đủ phải mua License.

### 1.4. Trial chỉ có hiệu lực khi lifecycle = TRIAL_ACTIVE

Trial chỉ có hiệu lực và cho phép học sinh thực hiện các hoạt động học tập khi Student đang ở trạng thái lifecycle `TRIAL_ACTIVE`. Khi Student chuyển sang bất kỳ trạng thái lifecycle nào khác, trial chấm dứt hoàn toàn và không còn hiệu lực.

---

## PHẦN 2 – QUAN HỆ GIỮA TRIAL & STUDENT LIFECYCLE

### 2.1. Trial chỉ tồn tại trong TRIAL_ACTIVE

Trial chỉ tồn tại và có hiệu lực khi Student đang ở trạng thái lifecycle `TRIAL_ACTIVE`. Đây là điều kiện bắt buộc và duy nhất để trial có hiệu lực.

### 2.2. Khi lifecycle chuyển sang trạng thái khác, trial chấm dứt hoàn toàn

Khi Student chuyển từ trạng thái `TRIAL_ACTIVE` sang bất kỳ trạng thái lifecycle nào khác (thông qua các event được định nghĩa trong Student Lifecycle), trial chấm dứt hoàn toàn. Trial không còn hiệu lực và không thể được sử dụng để thực hiện các hoạt động học tập mới.

Các trường hợp trial chấm dứt:
- `TRIAL_ACTIVE` → `TRIAL_EXPIRED`: Trial hết hạn thời gian
- `TRIAL_ACTIVE` → `LINKED_NO_LICENSE`: Phụ huynh liên kết Student
- `TRIAL_ACTIVE` → `SUSPENDED`: Quản trị viên suspend Student

### 2.3. Không có khái niệm resume, extend hay restart trial

Hệ thống không hỗ trợ các khái niệm sau:
- **Resume trial:** Không có cơ chế tiếp tục trial sau khi đã chấm dứt
- **Extend trial:** Không có cơ chế gia hạn thời gian trial
- **Restart trial:** Không có cơ chế khởi động lại trial

Một khi trial đã chấm dứt (Student rời khỏi `TRIAL_ACTIVE`), trial không thể được khôi phục, gia hạn, hoặc khởi động lại. Đây là quy tắc nghiêm ngặt để đảm bảo tính toàn vẹn của hệ thống trial.

### 2.4. Bảng mapping: Lifecycle State → Trial có hiệu lực

Bảng sau đây mô tả mối quan hệ giữa trạng thái lifecycle và hiệu lực của trial:

| Trạng thái Lifecycle | Trial có hiệu lực | Ghi chú |
|---------------------|------------------|---------|
| **TRIAL_ACTIVE** | ✅ Có | Trial đang hoạt động và có đầy đủ hiệu lực |
| **TRIAL_EXPIRED** | ❌ Không | Trial đã hết hạn, không còn hiệu lực |
| **LINKED_NO_LICENSE** | ❌ Không | Trial đã chấm dứt khi phụ huynh liên kết |
| **LICENSE_ACTIVE** | ❌ Không | Trial không có hiệu lực khi có License |
| **LICENSE_EXPIRED** | ❌ Không | Trial không có hiệu lực khi License hết hạn |
| **SUSPENDED** | ❌ Không | Trial không có hiệu lực khi Student bị suspend |

---

## PHẦN 3 – PHẠM VI HỌC TẬP CỦA TRIAL (LEARNING SCOPE)

### 3.1. Chapter trial

#### 3.1.1. Mỗi Grade chỉ có 1 Chapter trial duy nhất

Mỗi Grade (khối lớp) chỉ có một Chapter duy nhất được chỉ định làm Chapter trial. Học sinh trong trial chỉ được truy cập Chapter trial này, không được truy cập bất kỳ Chapter nào khác trong cùng Grade hoặc Grade khác.

#### 3.1.2. Chapter trial được định danh cố định

Chapter trial được định danh cố định trong hệ thống. Việc xác định Chapter nào là Chapter trial không phụ thuộc vào lựa chọn của học sinh, không phụ thuộc vào tiến độ học tập, và không thay đổi theo thời gian. Chapter trial là một thuộc tính cố định của Grade.

#### 3.1.3. Không cho phép trial nhiều chapter

Học sinh trong trial chỉ được truy cập một Chapter duy nhất (Chapter trial của Grade). Hệ thống không cho phép học sinh trial nhiều Chapter, không cho phép chuyển đổi Chapter trial, và không cho phép mở khóa Chapter khác trong trial.

### 3.2. Skill trong Chapter

#### 3.2.1. Trial chỉ mở tối đa 30% số skill trong chapter

Trong Chapter trial, hệ thống chỉ mở tối đa 30% tổng số skill có trong Chapter. Phần trăm này được tính toán dựa trên tổng số skill trong Chapter và được làm tròn xuống nếu kết quả không phải số nguyên.

Ví dụ: Nếu Chapter có 10 skill, trial chỉ mở tối đa 3 skill (30% của 10 = 3). Nếu Chapter có 7 skill, trial chỉ mở tối đa 2 skill (30% của 7 = 2.1, làm tròn xuống = 2).

#### 3.2.2. Ưu tiên skill nền tảng, dễ → trung bình

Các skill được mở trong trial phải tuân theo thứ tự ưu tiên sau:
1. **Skill nền tảng:** Các skill cơ bản, nền tảng của Chapter được ưu tiên cao nhất
2. **Skill dễ:** Các skill có độ khó thấp được ưu tiên tiếp theo
3. **Skill trung bình:** Các skill có độ khó trung bình được ưu tiên cuối cùng trong phạm vi 30%

Hệ thống không được mở skill khó, skill nâng cao, hoặc skill đặc biệt trong trial.

#### 3.2.3. Không mở skill tổng hợp hoặc skill kết thúc chapter

Hệ thống không được mở các loại skill sau trong trial:
- **Skill tổng hợp:** Các skill yêu cầu kiến thức từ nhiều skill khác
- **Skill kết thúc chapter:** Các skill đánh dấu sự hoàn thành của Chapter

Các skill này chỉ được mở khi học sinh có License đang hoạt động.

---

## PHẦN 4 – GIỚI HẠN PRACTICE & QUESTION

### 4.1. Tối đa 2 practice / skill

Trong mỗi skill được mở trong trial, học sinh chỉ được thực hiện tối đa 2 practice. Sau khi đã hoàn thành 2 practice trong một skill, học sinh không được phép bắt đầu practice thứ 3 trong skill đó, ngay cả khi chưa đạt được mastery mong muốn.

### 4.2. Tối đa 10 practice cho toàn bộ trial

Tổng số practice mà học sinh có thể thực hiện trong toàn bộ trial là tối đa 10 practice. Giới hạn này áp dụng cho tất cả các skill trong Chapter trial. Khi học sinh đã thực hiện đủ 10 practice, học sinh không được phép bắt đầu practice mới, bất kể số lượng practice đã thực hiện trong từng skill cụ thể.

### 4.3. Tối đa 50 câu hỏi cho toàn bộ trial

Tổng số câu hỏi mà học sinh có thể làm trong toàn bộ trial là tối đa 50 câu hỏi. Giới hạn này bao gồm tất cả các câu hỏi từ tất cả các practice trong trial. Khi học sinh đã làm đủ 50 câu hỏi, hệ thống không được phép sinh câu hỏi mới, ngay cả khi học sinh chưa đạt được giới hạn practice.

### 4.4. Không cho phép retry practice vượt giới hạn

Học sinh không được phép retry (làm lại) practice nếu việc retry sẽ làm vượt quá các giới hạn sau:
- Vượt quá 2 practice / skill
- Vượt quá 10 practice cho toàn bộ trial
- Vượt quá 50 câu hỏi cho toàn bộ trial

Hệ thống phải kiểm tra các giới hạn này trước khi cho phép học sinh retry practice. Nếu retry sẽ vượt quá bất kỳ giới hạn nào, hệ thống phải từ chối yêu cầu retry.

---

## PHẦN 5 – MASTERY TRONG TRIAL

### 5.1. Mastery được tính và hiển thị

Hệ thống vẫn tính toán và hiển thị mastery level của học sinh trong trial. Mastery được tính dựa trên kết quả của các practice và câu hỏi mà học sinh đã làm trong trial, theo cùng logic tính mastery như trong License, nhưng bị chặn trần theo quy định của Trial Policy.

### 5.2. Mastery chỉ mang tính tham chiếu

Mastery trong trial chỉ mang tính tham chiếu và thông tin. Mastery trong trial không được sử dụng để:
- Quyết định quyền truy cập nội dung
- Unlock skill hoặc chapter
- Đánh giá hoàn thành chương trình
- Bất kỳ mục đích nghiệp vụ nào khác ngoài việc hiển thị thông tin

### 5.3. Mastery tối đa trong trial là 40%

Mastery level tối đa mà học sinh có thể đạt được trong trial là 40% cho mỗi skill. Ngay cả khi học sinh làm đúng tất cả các câu hỏi trong trial, mastery vẫn không được vượt quá 40%. Giới hạn này áp dụng cho tất cả các skill trong Chapter trial.

### 5.4. Mastery trong trial KHÔNG dùng để unlock chapter

Mastery đạt được trong trial không được sử dụng để:
- **Unlock chapter:** Mastery trong trial không được tính vào điều kiện unlock chapter tiếp theo
- **Đánh giá hoàn thành chương:** Mastery trong trial không được sử dụng để đánh giá việc hoàn thành Chapter

Khi học sinh mua License và chuyển sang học với License, mastery trong trial vẫn được giữ lại nhưng không được sử dụng cho các mục đích unlock hoặc đánh giá hoàn thành.

---

## PHẦN 6 – THỜI GIAN TRIAL

### 6.1. Thời gian trial: 7 ngày

Thời gian trial là 7 ngày (168 giờ) kể từ thời điểm trial bắt đầu. Đây là thời gian cố định và không thay đổi.

### 6.2. trial_start_at: thời điểm tạo Student

Thời điểm bắt đầu trial (`trial_start_at`) được xác định là thời điểm Student được tạo ra trong hệ thống. Khi event `TRIAL_STARTED` được kích hoạt và Student được đặt vào trạng thái `TRIAL_ACTIVE`, thời điểm đó được ghi nhận là `trial_start_at`.

### 6.3. trial_end_at: trial_start_at + 7 ngày

Thời điểm kết thúc trial (`trial_end_at`) được tính bằng cách cộng 7 ngày vào `trial_start_at`. Công thức: `trial_end_at = trial_start_at + 7 ngày`.

### 6.4. Không reset trial

Hệ thống không hỗ trợ reset trial. Một khi trial đã bắt đầu, thời gian trial không thể được reset về 0, không thể được khởi động lại từ đầu, và không thể được thay đổi `trial_start_at` hoặc `trial_end_at`.

### 6.5. Không gia hạn trial

Hệ thống không hỗ trợ gia hạn trial. Thời gian trial không thể được kéo dài thêm, không thể được cộng thêm ngày, và không thể được thay đổi `trial_end_at` để kéo dài thời gian trial.

### 6.6. Parent link KHÔNG ảnh hưởng thời gian trial

Việc phụ huynh liên kết Student (event `PARENT_LINKED`) không ảnh hưởng đến thời gian trial. Khi phụ huynh liên kết Student trong thời gian trial:
- `trial_start_at` không thay đổi
- `trial_end_at` không thay đổi
- Thời gian trial còn lại không thay đổi

Tuy nhiên, khi event `PARENT_LINKED` được kích hoạt, Student sẽ chuyển sang trạng thái `LINKED_NO_LICENSE` và trial chấm dứt hoàn toàn (theo quy định của Student Lifecycle), dù thời gian trial về mặt kỹ thuật có thể chưa hết.

---

## PHẦN 7 – KHI TRIAL HẾT HẠN

### 7.1. Hard stop khi trial hết hạn

Khi trial hết hạn (thời gian đạt đến `trial_end_at` hoặc Student chuyển sang trạng thái lifecycle khác), hệ thống thực hiện hard stop (dừng cứng) đối với các hoạt động học tập. Hard stop có nghĩa là không có ngoại lệ, không có grace period, và không có cơ chế tiếp tục.

### 7.2. Không được bắt đầu practice mới

Khi trial hết hạn, học sinh không được phép bắt đầu practice mới. Hệ thống phải từ chối mọi yêu cầu bắt đầu practice mới, bất kể học sinh đã sử dụng bao nhiêu practice trong trial.

### 7.3. Không được sinh câu hỏi

Khi trial hết hạn, hệ thống không được phép sinh câu hỏi mới cho học sinh. Mọi yêu cầu sinh câu hỏi phải bị từ chối.

### 7.4. Không được cập nhật mastery

Khi trial hết hạn, hệ thống không được phép cập nhật mastery level của học sinh dựa trên các hoạt động mới. Mastery chỉ được giữ nguyên ở mức đã đạt được trước khi trial hết hạn.

### 7.5. Chỉ được xem lịch sử và tiến độ (read-only)

Khi trial hết hạn, học sinh chỉ được phép xem (read-only) các thông tin sau:
- Lịch sử practice đã làm trong trial
- Kết quả câu hỏi đã làm trong trial
- Mastery level đã đạt được trong trial
- Tiến độ học tập trong trial

Học sinh không được phép thực hiện bất kỳ hành động nào thay đổi dữ liệu (write operation).

### 7.6. Không có grace period

Hệ thống không cung cấp grace period (thời gian gia hạn) sau khi trial hết hạn. Khi trial hết hạn, mọi quyền học tập mới bị chấm dứt ngay lập tức, không có thời gian chờ đợi hoặc cảnh báo trước. UI, client hoặc bất kỳ thành phần frontend nào KHÔNG được tự ý cho phép học sinh tiếp tục học hoặc thực hiện hành động học tập sau khi trial đã hết hạn.

---

## PHẦN 8 – TRIAL & PURCHASE

### 8.1. Dữ liệu trial được giữ lại

Khi học sinh mua License từ trial (chuyển từ `TRIAL_ACTIVE` hoặc `TRIAL_EXPIRED` sang `LICENSE_ACTIVE`), toàn bộ dữ liệu học tập trong trial được giữ lại. Dữ liệu này bao gồm:
- Lịch sử practice đã làm trong trial
- Kết quả câu hỏi đã làm trong trial
- Mastery level đã đạt được trong trial
- Tiến độ học tập trong trial

### 8.2. Practice trial không được tiếp tục

Các practice đã bắt đầu trong trial nhưng chưa hoàn thành không được phép tiếp tục khi học sinh có License. Khi học sinh mua License, các practice trial đang làm dở được coi như đã kết thúc và không thể tiếp tục.

### 8.3. Chapter trial phải học lại từ đầu

Khi học sinh mua License, Chapter trial phải được học lại từ đầu theo logic của License. Điều này có nghĩa:
- Học sinh không được tiếp tục từ vị trí đã dừng trong trial
- Học sinh phải bắt đầu lại Chapter từ đầu với đầy đủ quyền truy cập
- Mastery trong trial không được sử dụng để skip phần đã học

### 8.4. Unlock chapter theo logic license

Khi học sinh có License, việc unlock chapter được thực hiện theo logic của License, không phụ thuộc vào trial. Học sinh phải đáp ứng các điều kiện unlock chapter theo quy định của License, không được sử dụng tiến độ hoặc mastery từ trial để unlock chapter.

---

## PHẦN 9 – TRIAL & PARENT LINK

### 9.1. Parent link không kéo dài trial

Việc phụ huynh liên kết Student (event `PARENT_LINKED`) không kéo dài thời gian trial. Khi phụ huynh liên kết Student trong thời gian trial, thời gian trial không được cộng thêm, không được reset, và không được thay đổi `trial_end_at`.

### 9.2. Parent link không mở thêm nội dung trial

Việc phụ huynh liên kết Student không mở thêm nội dung trial. Các giới hạn của trial vẫn được áp dụng:
- Vẫn chỉ có 1 Chapter trial
- Vẫn chỉ mở tối đa 30% skill trong Chapter
- Vẫn chỉ có tối đa 2 practice / skill
- Vẫn chỉ có tối đa 10 practice cho toàn bộ trial
- Vẫn chỉ có tối đa 50 câu hỏi cho toàn bộ trial

### 9.3. Parent chỉ có quyền xem dữ liệu trial

Khi phụ huynh liên kết Student trong thời gian trial, phụ huynh chỉ có quyền xem (read-only) dữ liệu trial của học sinh. Phụ huynh không có quyền:
- Thay đổi giới hạn trial
- Kéo dài thời gian trial
- Mở thêm nội dung trial
- Thực hiện bất kỳ hành động nào ảnh hưởng đến trial

Tuy nhiên, khi event `PARENT_LINKED` được kích hoạt, Student sẽ chuyển sang trạng thái `LINKED_NO_LICENSE` và trial chấm dứt hoàn toàn (theo quy định của Student Lifecycle).

---

## PHẦN 10 – TRIAL & ANTI-ABUSE

### 10.1. Trial gắn với thiết bị (device_id)

Trial được gắn với thiết bị (device_id) của học sinh. Mỗi thiết bị có một device_id duy nhất được xác định bởi hệ thống. Trial được liên kết với device_id này để ngăn chặn việc lạm dụng trial.

### 10.2. 1 thiết bị chỉ được trial 1 lần

Mỗi thiết bị (device_id) chỉ được phép trial một lần duy nhất trong toàn bộ thời gian tồn tại của hệ thống. Một khi thiết bị đã sử dụng trial (dù trial đã hết hạn hay đã chấm dứt), thiết bị đó không được phép trial lại.

### 10.3. Reinstall app không reset trial

Việc gỡ cài đặt và cài đặt lại ứng dụng (reinstall app) không reset trial. Hệ thống phải nhận diện được device_id và xác định rằng thiết bị này đã từng trial, do đó không cho phép trial lại.

### 10.4. Tạo nhiều student hoặc parent không reset trial

Việc tạo nhiều Student hoặc nhiều ParentAccount trên cùng một thiết bị không reset trial. Hệ thống phải kiểm tra device_id để xác định thiết bị đã từng trial, và từ chối trial cho bất kỳ Student nào được tạo trên thiết bị đó, bất kể Student đó là Student mới hay được liên kết với ParentAccount mới.

---

## PHẦN 11 – EDGE CASES

### 11.1. Trial + offline usage

Khi học sinh sử dụng trial trong chế độ offline (không có kết nối internet):

- Hệ thống có thể cho phép học sinh tiếp tục làm practice đã tải xuống trước đó
- Các practice đã tải xuống trước đó vẫn phải được tính vào toàn bộ các giới hạn của trial (số practice và số câu hỏi), giống như khi học sinh sử dụng trial ở chế độ online.
- Hệ thống không được phép sinh câu hỏi mới nếu không có kết nối internet
- Khi kết nối lại internet, hệ thống phải đồng bộ dữ liệu và kiểm tra lại thời gian trial
- Nếu trial đã hết hạn trong thời gian offline, khi kết nối lại, hệ thống phải chấm dứt trial ngay lập tức

### 11.2. Trial hết hạn khi đang làm practice

Khi trial hết hạn trong lúc học sinh đang làm practice:

- Practice đang làm dở phải được dừng lại ngay lập tức
- Học sinh không được phép hoàn thành practice đang làm
- Dữ liệu đã làm trong practice dở được lưu lại nhưng không được tính vào mastery
- Hệ thống phải thông báo rõ ràng rằng trial đã hết hạn và practice đã bị dừng

### 11.3. Suspend trong trial và unsuspend sau đó

Khi học sinh bị suspend trong thời gian trial (chuyển từ `TRIAL_ACTIVE` sang `SUSPENDED`):

- Trial vẫn tiếp tục đếm thời gian trong thời gian suspend
- Khi unsuspend, nếu trial vẫn còn thời gian (chưa đến `trial_end_at`), học sinh quay lại `TRIAL_ACTIVE` và có thể tiếp tục sử dụng thời gian trial còn lại
- Khi unsuspend, nếu trial đã hết hạn trong thời gian suspend, học sinh quay về `TRIAL_EXPIRED` và không thể tiếp tục trial
- Hệ thống phải kiểm tra `trial_end_at` tại thời điểm unsuspend để xác định trạng thái phù hợp

---

## PHẦN 12 – CHECKLIST ÉP CODE

Các hành vi sau đây được coi là **VI PHẠM** nếu code thực hiện chúng. Code phải được sửa lại để tuân theo Trial Policy.

### 12.1. Vi phạm về Chapter trial

- ❌ **VI PHẠM:** Trial mở nhiều Chapter (cho phép học sinh truy cập nhiều hơn 1 Chapter trong trial)
- ❌ **VI PHẠM:** Trial unlock Chapter tiếp theo (cho phép học sinh unlock Chapter khác trong trial)
- ❌ **VI PHẠM:** Trial cho phép chuyển đổi Chapter trial (cho phép học sinh chọn Chapter trial khác)
- ❌ **VI PHẠM:** Trial mở Chapter từ Grade khác (cho phép học sinh truy cập Chapter của Grade khác)

### 12.2. Vi phạm về Skill trong Chapter

- ❌ **VI PHẠM:** Trial mở quá 30% skill trong Chapter (cho phép học sinh truy cập nhiều hơn 30% skill)
- ❌ **VI PHẠM:** Trial mở skill tổng hợp (cho phép học sinh truy cập skill yêu cầu kiến thức từ nhiều skill khác)
- ❌ **VI PHẠM:** Trial mở skill kết thúc chapter (cho phép học sinh truy cập skill đánh dấu hoàn thành Chapter)
- ❌ **VI PHẠM:** Trial mở skill khó hoặc skill nâng cao (không tuân theo thứ tự ưu tiên: nền tảng → dễ → trung bình)

### 12.3. Vi phạm về Practice & Question

- ❌ **VI PHẠM:** Trial cho phép hơn 2 practice / skill (cho phép học sinh làm hơn 2 practice trong một skill)
- ❌ **VI PHẠM:** Trial cho phép hơn 10 practice cho toàn bộ trial (cho phép học sinh làm hơn 10 practice tổng cộng)
- ❌ **VI PHẠM:** Trial cho phép hơn 50 câu hỏi cho toàn bộ trial (sinh hơn 50 câu hỏi tổng cộng)
- ❌ **VI PHẠM:** Trial cho phép retry practice vượt giới hạn (cho phép học sinh retry practice khi đã đạt giới hạn)

### 12.4. Vi phạm về Mastery

- ❌ **VI PHẠM:** Trial cho phép mastery vượt quá 40% (tính toán hoặc hiển thị mastery trên 40% cho skill trong trial)
- ❌ **VI PHẠM:** Trial sử dụng mastery để unlock chapter (sử dụng mastery trong trial để unlock Chapter tiếp theo)
- ❌ **VI PHẠM:** Trial sử dụng mastery để đánh giá hoàn thành chương (sử dụng mastery trong trial để đánh giá hoàn thành Chapter)

### 12.5. Vi phạm về Thời gian Trial

- ❌ **VI PHẠM:** Trial được reset (reset `trial_start_at` hoặc `trial_end_at` sau khi trial đã bắt đầu)
- ❌ **VI PHẠM:** Trial được gia hạn (thay đổi `trial_end_at` để kéo dài thời gian trial)
- ❌ **VI PHẠM:** Trial được restart (khởi động lại trial sau khi đã chấm dứt)

### 12.6. Vi phạm về Trial & Lifecycle

- ❌ **VI PHẠM:** Trial có hiệu lực khi lifecycle không phải TRIAL_ACTIVE (cho phép học sinh sử dụng trial khi không ở `TRIAL_ACTIVE`)
- ❌ **VI PHẠM:** Trial được resume sau khi chấm dứt (cho phép học sinh tiếp tục trial sau khi đã rời `TRIAL_ACTIVE`)
- ❌ **VI PHẠM:** Trial được extend sau khi chấm dứt (gia hạn trial sau khi đã rời `TRIAL_ACTIVE`)

### 12.7. Vi phạm về Anti-Abuse

- ❌ **VI PHẠM:** 1 thiết bị được trial nhiều lần (cho phép thiết bị đã trial được trial lại)
- ❌ **VI PHẠM:** Reinstall app reset trial (cho phép trial lại sau khi reinstall app)
- ❌ **VI PHẠM:** Tạo Student mới reset trial (cho phép trial lại khi tạo Student mới trên cùng thiết bị)

### 12.8. Vi phạm về Grace Period

- ❌ **VI PHẠM:** Trial có grace period (cho phép học sinh tiếp tục sử dụng trial sau khi hết hạn trong một khoảng thời gian)

---

## PHẦN 13 – TUYÊN BỐ CUỐI

**Tài liệu này là LUẬT HỆ THỐNG.**

Mọi code, API hoặc chức năng liên quan đến trial phải tuân theo tài liệu này. Không được sửa tài liệu để hợp thức hoá code.

Tài liệu này là nguồn sự thật duy nhất (Source of Truth) cho Trial Policy trong hệ thống Gia sư Toán AI. Mọi quyết định về thiết kế, triển khai, và kiểm thử liên quan đến trial phải dựa trên tài liệu này.

Tài liệu này phụ thuộc trực tiếp vào Student Lifecycle – System Law. Mọi quy định trong Trial Policy phải tuân thủ và không được mâu thuẫn với Student Lifecycle.

---

**Phiên bản tài liệu:** 1.0  
**Ngày tạo:** 2025-01-27  
**Trạng thái:** Frozen – System Law

