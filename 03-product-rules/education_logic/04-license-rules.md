# License Rules – Luật hệ thống

**Dự án:** Gia sư Toán AI  
**Phụ thuộc:**
- Student Lifecycle – System Law
- Trial Policy – System Law
- Chapter Progression – System Law  
**Trạng thái:** Frozen – System Law  
**Mục đích:** Định nghĩa logic License và quyền học đầy đủ

---

## PHẦN 1 – VAI TRÒ CỦA LICENSE

### 1.1. License là điều kiện DUY NHẤT để học đầy đủ

License là điều kiện duy nhất và bắt buộc để học sinh có quyền học tập đầy đủ trong hệ thống. Không có License, học sinh không thể:
- Thực hiện Chapter Progression
- Unlock và học Chapter
- Cập nhật mastery để hoàn thành Chapter
- Truy cập đầy đủ nội dung học tập

### 1.2. License không phải Student, không phải device

License là một thực thể độc lập, tách biệt với Student và device. License:
- Không phải là Student (Student có thể được assign vào License)
- Không phải là device (device có thể được đăng ký vào License)
- Là một tài nguyên được quản lý bởi ParentAccount

### 1.3. Không có License thì không có Chapter Progression

Khi học sinh không có License đang hoạt động (License ACTIVE), Chapter Progression không thể hoạt động. Đây là quy tắc nghiêm ngặt: Chapter Progression chỉ áp dụng khi Student ở trạng thái `LICENSE_ACTIVE`, và Student chỉ có thể ở `LICENSE_ACTIVE` khi có License đang hoạt động.

---

## PHẦN 2 – LICENSE & STUDENT LIFECYCLE

### 2.1. License ACTIVE → Student = LICENSE_ACTIVE

Khi License ở trạng thái ACTIVE và Student được assign vào License, Student phải ở trạng thái lifecycle `LICENSE_ACTIVE`. Đây là mối quan hệ bắt buộc: License ACTIVE là điều kiện cần để Student có thể ở `LICENSE_ACTIVE`.

### 2.2. License EXPIRED hoặc CANCELLED → Student = LICENSE_EXPIRED

Khi License chuyển sang trạng thái EXPIRED hoặc CANCELLED, Student được assign vào License đó phải chuyển sang trạng thái lifecycle `LICENSE_EXPIRED`. Đây là quy tắc tự động: License không còn hiệu lực thì Student không thể tiếp tục học.

### 2.3. Lifecycle là Source of Truth

Trạng thái lifecycle của Student là nguồn sự thật duy nhất (Source of Truth) để xác định quyền học tập. Mọi logic kiểm tra quyền học tập phải dựa vào lifecycle state, không được suy luận từ trạng thái License.

### 2.4. Code KHÔNG được suy luận lifecycle từ license_id

Code trong hệ thống không được phép suy luận trạng thái lifecycle từ:
- Sự tồn tại của license_id
- Trạng thái của License (ACTIVE/EXPIRED/CANCELLED) được lưu trong bảng License
- Bất kỳ trường dữ liệu nào khác liên quan đến License

Thay vào đó, code phải đọc trực tiếp trạng thái lifecycle từ trường lifecycle state của Student.

### 2.5. Quan hệ hai chiều giữa License và Student Lifecycle

Tại mọi thời điểm, Student chỉ được ở trạng thái lifecycle `LICENSE_ACTIVE` khi và chỉ khi:
- Tồn tại một License ở trạng thái ACTIVE
- Student được assign hợp lệ vào License đó

Nếu một trong hai điều kiện trên không còn đúng, Student không được phép ở `LICENSE_ACTIVE` và phải chuyển sang `LICENSE_EXPIRED`.

---

## PHẦN 3 – TRẠNG THÁI LICENSE

Hệ thống chỉ sử dụng các trạng thái License sau đây. Không được thêm, bớt, hoặc đổi tên các trạng thái này.

### 3.1. ACTIVE

**Ý nghĩa nghiệp vụ:**  
License đang hoạt động và có hiệu lực. License ở trạng thái ACTIVE cho phép học sinh được assign vào License có quyền học tập đầy đủ.

**Điều kiện:**  
License ở trạng thái ACTIVE khi:
- Thanh toán đã thành công (payment_success)
- Thời gian hiện tại nằm trong khoảng [start_at, end_at]
- License chưa bị hủy (CANCELLED)

### 3.2. EXPIRED

**Ý nghĩa nghiệp vụ:**  
License đã hết hạn. License ở trạng thái EXPIRED không còn cho phép học sinh học tập mới, nhưng có thể được gia hạn (renewal) để quay lại ACTIVE.

**Điều kiện:**  
License ở trạng thái EXPIRED khi:
- Thời gian hiện tại đã vượt quá end_at
- License chưa bị hủy (CANCELLED)

### 3.3. CANCELLED

**Ý nghĩa nghiệp vụ:**  
License đã bị hủy bởi quản trị viên. License ở trạng thái CANCELLED không thể quay lại ACTIVE (trừ các quy tắc đặc biệt ngoài phạm vi tài liệu này).

**Điều kiện:**  
License ở trạng thái CANCELLED khi:
- Quản trị viên thực hiện hành động hủy License (admin_cancel)

### 3.4. KHÔNG có PAUSED

Hệ thống không hỗ trợ trạng thái PAUSED cho License. License không thể bị tạm dừng (pause), không thể đóng băng thời gian, và không thể tạm ngưng hiệu lực. License chỉ có thể ở một trong ba trạng thái: ACTIVE, EXPIRED, hoặc CANCELLED.

### 3.5. KHÔNG có trạng thái ngầm

Mọi trạng thái License đều phải được định nghĩa rõ ràng và lưu trữ trong hệ thống. Không có trạng thái ngầm định, trạng thái mặc định, hoặc trạng thái được suy luận từ các dữ liệu khác. Hệ thống phải kiểm tra trạng thái License trực tiếp từ trường lưu trữ trạng thái.

---

## PHẦN 4 – LICENSE FSM

License được quản lý như một Finite State Machine (FSM) nghiêm ngặt. Sơ đồ sau đây mô tả các chuyển trạng thái hợp lệ:

### 4.1. payment_success → ACTIVE

**Mô tả:**  
Khi thanh toán thành công (payment_success), License được tạo và đặt ở trạng thái ACTIVE.

**Điều kiện:**  
- Thanh toán đã được xác nhận thành công
- License được tạo với start_at và end_at hợp lệ

**Trạng thái trước → sau:**  
- `[*]` (không có trạng thái) → `ACTIVE`

### 4.2. end_at reached → EXPIRED

**Mô tả:**  
Khi thời gian hiện tại đạt đến end_at, License tự động chuyển sang trạng thái EXPIRED.

**Điều kiện:**  
- Thời gian hiện tại >= end_at
- License đang ở trạng thái ACTIVE

**Trạng thái trước → sau:**  
- `ACTIVE` → `EXPIRED`

### 4.3. admin_cancel → CANCELLED

**Mô tả:**  
Khi quản trị viên thực hiện hành động hủy License (admin_cancel), License chuyển sang trạng thái CANCELLED.

**Điều kiện:**  
- Quản trị viên có quyền hủy License
- License đang ở trạng thái ACTIVE hoặc EXPIRED

**Trạng thái trước → sau:**  
- `ACTIVE` → `CANCELLED`
- `EXPIRED` → `CANCELLED`

### 4.4. renewal_success (từ EXPIRED) → ACTIVE

**Mô tả:**  
Khi License đang ở trạng thái EXPIRED và thanh toán gia hạn thành công (renewal_success), License chuyển sang trạng thái ACTIVE.

**Điều kiện:**  
- License đang ở trạng thái EXPIRED
- Thanh toán gia hạn đã được xác nhận thành công
- end_at được cập nhật với thời gian mới

**Trạng thái trước → sau:**  
- `EXPIRED` → `ACTIVE`

### 4.5. Renewal không reset dữ liệu học

Khi License được gia hạn (renewal), toàn bộ dữ liệu học tập của học sinh được giữ nguyên. Dữ liệu này bao gồm:
- Trạng thái Chapter (IN_PROGRESS, COMPLETED, v.v.)
- Mastery level của các skill
- Lịch sử practice
- Tiến độ học tập

Việc gia hạn License chỉ ảnh hưởng đến thời gian hiệu lực, không ảnh hưởng đến dữ liệu học tập.

### 4.6. CANCELLED không quay lại ACTIVE (trừ rule riêng ngoài scope)

Một khi License đã bị CANCELLED, License không thể quay lại trạng thái ACTIVE thông qua các cơ chế thông thường (renewal, payment). Đây là quy tắc nghiêm ngặt để đảm bảo tính toàn vẹn của hệ thống. Các trường hợp đặc biệt (ví dụ: quản trị viên khôi phục License đã hủy) nằm ngoài phạm vi tài liệu này.

---

## PHẦN 5 – THỜI GIAN LICENSE

### 5.1. start_at

`start_at` là thời điểm bắt đầu hiệu lực của License. License bắt đầu có hiệu lực từ thời điểm `start_at`. Trước thời điểm này, License chưa có hiệu lực, dù đã được tạo và thanh toán thành công.

### 5.2. end_at

`end_at` là thời điểm kết thúc hiệu lực của License. License hết hiệu lực tại thời điểm `end_at`. Sau thời điểm này, License tự động chuyển sang trạng thái EXPIRED.

### 5.3. Thời gian chạy liên tục

Thời gian hiệu lực của License chạy liên tục từ `start_at` đến `end_at`. Không có khoảng thời gian nào trong khoảng này mà License không có hiệu lực, trừ khi License bị CANCELLED.

### 5.4. KHÔNG pause

License không thể bị tạm dừng (pause). Một khi License đã bắt đầu (`start_at`), thời gian hiệu lực chạy liên tục cho đến `end_at`, không thể tạm dừng giữa chừng.

### 5.5. KHÔNG freeze time

License không thể đóng băng thời gian (freeze time). Thời gian hiệu lực của License không thể được dừng lại, không thể được kéo dài thêm do tạm dừng, và không thể được điều chỉnh ngoài việc gia hạn (renewal).

---

## PHẦN 6 – GIA HẠN LICENSE

### 6.1. Gia hạn sớm (License đang ACTIVE)

Khi License đang ở trạng thái ACTIVE và được gia hạn sớm (renewal trước khi hết hạn):

#### 6.1.1. new_end_at = old_end_at + duration

Thời gian kết thúc mới (`new_end_at`) được tính bằng cách cộng thêm thời gian gia hạn (`duration`) vào thời gian kết thúc cũ (`old_end_at`). Công thức: `new_end_at = old_end_at + duration`.

#### 6.1.2. Không reset Chapter, mastery, practice

Khi gia hạn sớm, toàn bộ dữ liệu học tập được giữ nguyên:
- Trạng thái Chapter không bị reset
- Mastery level của các skill không bị reset
- Lịch sử practice không bị reset
- Tiến độ học tập không bị reset

#### 6.1.3. Student giữ LICENSE_ACTIVE

Khi gia hạn sớm, Student vẫn giữ nguyên trạng thái lifecycle `LICENSE_ACTIVE`. Student không bị chuyển sang trạng thái khác và có thể tiếp tục học bình thường.

### 6.2. Gia hạn sau khi hết hạn

Khi License đã ở trạng thái EXPIRED và được gia hạn (renewal):

#### 6.2.1. License → ACTIVE

License chuyển từ trạng thái EXPIRED sang trạng thái ACTIVE. `start_at` được cập nhật thành thời điểm gia hạn, và `end_at` được cập nhật thành `start_at + duration`. Việc cập nhật `start_at` trong trường hợp này chỉ áp dụng cho chu kỳ hiệu lực mới của License hiện tại, không tạo License mới cho Student và không làm mất lịch sử các chu kỳ trước.

#### 6.2.2. Student → LICENSE_ACTIVE

Student được assign vào License chuyển từ trạng thái lifecycle `LICENSE_EXPIRED` sang `LICENSE_ACTIVE`. Đây là chuyển trạng thái tự động khi License được gia hạn.

#### 6.2.3. Tiếp tục Chapter đang học

Khi License được gia hạn sau khi hết hạn, học sinh có thể tiếp tục học Chapter đang ở trạng thái `IN_PROGRESS`. Chapter không bị reset, mastery không bị reset, và học sinh có thể tiếp tục từ vị trí đã dừng.

---

## PHẦN 7 – LICENSE SCOPE

### 7.1. License là SINGLE-GRADE

Mỗi License chỉ áp dụng cho một Grade (khối lớp) duy nhất. License không thể áp dụng cho nhiều Grade cùng lúc, không thể áp dụng cho toàn bộ chương trình, và không thể áp dụng cho Grade khác ngoài Grade được chỉ định.

### 7.2. Mỗi License chỉ áp dụng cho 1 Grade

Mỗi License được gắn với một Grade cụ thể. License chỉ cho phép học sinh học nội dung của Grade đó, không cho phép học nội dung của Grade khác.

### 7.3. Không cho học ngoài Grade

Học sinh được assign vào License chỉ được phép học nội dung của Grade được chỉ định trong License. Hệ thống phải từ chối mọi yêu cầu học nội dung của Grade khác, bất kể học sinh có đạt được điều kiện nào trong Grade đó.

---

## PHẦN 8 – LICENSE & STUDENT ASSIGNMENT

### 8.1. License thuộc ParentAccount

License được tạo và quản lý bởi ParentAccount. License thuộc về ParentAccount, không thuộc về Student. ParentAccount có thể có nhiều License (cho nhiều Grade khác nhau hoặc nhiều thời kỳ khác nhau).

### 8.2. Student phải được assign vào License

Để Student có thể sử dụng License, Student phải được assign (gán) vào License. Một Student có thể được assign vào một License, và một License có thể được assign cho nhiều Student (theo giới hạn max_students).

### 8.3. max_students theo gói

Mỗi License có giới hạn số lượng Student tối đa (`max_students`) được định nghĩa theo gói License. Giới hạn này quyết định số lượng Student tối đa có thể được assign vào License.

### 8.4. Không vượt giới hạn

Hệ thống không được phép assign Student vào License nếu số lượng Student đã được assign đã đạt đến `max_students`. Hệ thống phải từ chối mọi yêu cầu assign Student mới khi đã đạt giới hạn.

---

## PHẦN 9 – LICENSE & DEVICE RULES

### 9.1. Giới hạn thiết bị ở License level

Giới hạn số lượng thiết bị (device) được quản lý ở cấp độ License, không phải ở cấp độ Student. Mỗi License có giới hạn số lượng device tối đa (`max_devices`) được định nghĩa theo gói License.

### 9.2. max_devices theo gói

Mỗi License có giới hạn số lượng device tối đa (`max_devices`) được định nghĩa theo gói License. Giới hạn này quyết định số lượng device tối đa có thể được đăng ký vào License.

### 9.3. Không auto kick

Hệ thống không được phép tự động loại bỏ (auto kick) device khỏi License khi đã đạt giới hạn `max_devices`. Hệ thống phải từ chối yêu cầu đăng ký device mới, nhưng không được tự động loại bỏ device cũ.

### 9.4. Không silent replace

Hệ thống không được phép thay thế im lặng (silent replace) device cũ bằng device mới khi đã đạt giới hạn `max_devices`. Hệ thống phải từ chối yêu cầu đăng ký device mới và yêu cầu người dùng chủ động loại bỏ device cũ trước khi đăng ký device mới.

---

## PHẦN 10 – LICENSE & CHAPTER PROGRESSION

### 10.1. Chapter Progression chỉ chạy khi Student = LICENSE_ACTIVE

Chapter Progression chỉ có hiệu lực và hoạt động khi Student đang ở trạng thái lifecycle `LICENSE_ACTIVE`. Đây là điều kiện bắt buộc: không có `LICENSE_ACTIVE` thì không có Chapter Progression.

### 10.2. License hết hạn giữa Chapter

Khi License hết hạn trong lúc học sinh đang học Chapter (Chapter đang ở trạng thái `IN_PROGRESS`):

#### 10.2.1. Chapter giữ state

Chapter vẫn giữ nguyên trạng thái `IN_PROGRESS` (không bị reset về UNLOCKED hoặc LOCKED). Trạng thái Chapter không bị thay đổi khi License hết hạn.

#### 10.2.2. Không practice

Học sinh không thể tạo practice mới, không thể submit practice, và không thể cập nhật mastery. Hệ thống phải từ chối mọi yêu cầu thực hiện practice khi License đã hết hạn.

#### 10.2.3. Renewal tiếp tục Chapter

Khi License được gia hạn (renewal) và Student quay lại `LICENSE_ACTIVE`, học sinh có thể tiếp tục học Chapter từ trạng thái `IN_PROGRESS` hiện tại. Chapter không bị reset, mastery không bị reset, và học sinh có thể tiếp tục từ vị trí đã dừng.

---

## PHẦN 11 – LICENSE & SUSPEND / ADMIN

### 11.1. SUSPENDED override License

Trạng thái `SUSPENDED` có mức độ ưu tiên cao nhất và override (ghi đè) License. Khi Student bị SUSPENDED, dù License vẫn đang ACTIVE, Student vẫn không thể học tập. Việc kiểm tra quyền học tập phải ưu tiên kiểm tra `SUSPENDED` trước tiên.

### 11.2. Admin KHÔNG được bypass License

Quản trị viên không được phép bypass (bỏ qua) License để cho phép học sinh học tập. Mọi logic kiểm tra quyền học tập phải tuân theo License Rules, không có ngoại lệ cho quản trị viên.

### 11.3. Admin KHÔNG được unlock Chapter tay

Quản trị viên không được phép unlock Chapter thủ công (manual unlock) để bỏ qua logic Chapter Progression. Chapter chỉ được unlock theo quy định của Chapter Progression: Chapter N+1 được unlock khi Chapter N COMPLETED.

### 11.4. Admin KHÔNG được cho học ngoài scope

Quản trị viên không được phép cho phép học sinh học nội dung ngoài phạm vi (scope) của License. Học sinh chỉ được học nội dung của Grade được chỉ định trong License, không có ngoại lệ.

---

## PHẦN 12 – EDGE CASES

### 12.1. Gia hạn sớm khi gần hết hạn

Khi License được gia hạn sớm (renewal trước khi hết hạn) và thời gian còn lại rất ngắn:

- `new_end_at` được tính bằng `old_end_at + duration`, không phải `now + duration`
- License vẫn giữ nguyên trạng thái ACTIVE
- Student vẫn giữ nguyên trạng thái `LICENSE_ACTIVE`
- Toàn bộ dữ liệu học tập được giữ nguyên
- Học sinh có thể tiếp tục học bình thường

### 12.2. License CANCELLED

Khi License bị CANCELLED:

- License chuyển sang trạng thái CANCELLED
- Student được assign vào License chuyển sang trạng thái `LICENSE_EXPIRED`
- Học sinh không thể tiếp tục học tập
- Dữ liệu học tập được giữ nguyên (không bị xóa)
- License không thể quay lại ACTIVE thông qua renewal thông thường

### 12.3. Downgrade thu hẹp scope

Khi License được downgrade (hạ cấp) và thu hẹp scope:

- License mới được tạo với scope mới
- License cũ có thể bị CANCELLED hoặc EXPIRED
- Student được assign vào License mới
- Dữ liệu học tập được giữ nguyên nhưng chỉ có thể truy cập nội dung trong scope mới
- Học sinh chỉ có thể học nội dung trong scope mới của License

Ví dụ downgrade có thể bao gồm: giảm thời gian hiệu lực, giảm `max_students`, hoặc giảm `max_devices`. License vẫn giữ nguyên Grade đã được chỉ định và không chuyển sang Grade khác.

---

## PHẦN 13 – CHECKLIST ÉP CODE

Các hành vi sau đây được coi là **VI PHẠM** nếu code thực hiện chúng. Code phải được sửa lại để tuân theo License Rules.

### 13.1. Vi phạm về Trạng thái License

- ❌ **VI PHẠM:** License có trạng thái PAUSED (cho phép tạm dừng License)
- ❌ **VI PHẠM:** License có trạng thái ngầm định (suy luận trạng thái từ dữ liệu khác)
- ❌ **VI PHẠM:** License CANCELLED quay lại ACTIVE thông qua renewal thông thường (cho phép gia hạn License đã hủy)

### 13.2. Vi phạm về Thời gian License

- ❌ **VI PHẠM:** License được pause (tạm dừng thời gian hiệu lực)
- ❌ **VI PHẠM:** License được freeze time (đóng băng thời gian hiệu lực)
- ❌ **VI PHẠM:** Thời gian hiệu lực được điều chỉnh ngoài renewal (thay đổi start_at hoặc end_at ngoài việc gia hạn)

### 13.3. Vi phạm về Gia hạn License

- ❌ **VI PHẠM:** Reset Chapter, mastery, hoặc practice khi gia hạn (xóa hoặc reset dữ liệu học tập khi gia hạn)
- ❌ **VI PHẠM:** Reset Student lifecycle khi gia hạn sớm (chuyển Student sang trạng thái khác khi gia hạn sớm)
- ❌ **VI PHẠM:** new_end_at không được tính đúng (tính new_end_at = now + duration thay vì old_end_at + duration khi gia hạn sớm)

### 13.4. Vi phạm về License Scope

- ❌ **VI PHẠM:** License áp dụng cho nhiều Grade (cho phép học sinh học nhiều Grade với một License)
- ❌ **VI PHẠM:** Cho phép học ngoài Grade (cho phép học sinh học nội dung của Grade khác ngoài Grade được chỉ định)

### 13.5. Vi phạm về Student Assignment

- ❌ **VI PHẠM:** Assign Student vượt quá max_students (cho phép assign nhiều Student hơn giới hạn)
- ❌ **VI PHẠM:** Student không được assign vào License nhưng vẫn có quyền học (cho phép học sinh học mà không cần assign)

### 13.6. Vi phạm về Device Rules

- ❌ **VI PHẠM:** Auto kick device khi đạt max_devices (tự động loại bỏ device cũ khi đăng ký device mới)
- ❌ **VI PHẠM:** Silent replace device (thay thế im lặng device cũ bằng device mới)
- ❌ **VI PHẠM:** Đăng ký device vượt quá max_devices (cho phép đăng ký nhiều device hơn giới hạn)

### 13.7. Vi phạm về License & Lifecycle

- ❌ **VI PHẠM:** Suy luận lifecycle từ license_id (kiểm tra quyền học tập dựa trên license_id thay vì lifecycle state)
- ❌ **VI PHẠM:** Lifecycle không đồng bộ với License (Student ở LICENSE_ACTIVE khi License không ACTIVE, hoặc ngược lại)

### 13.8. Vi phạm về Admin & Bypass

- ❌ **VI PHẠM:** Admin bypass License (cho phép quản trị viên bỏ qua License để cho học sinh học)
- ❌ **VI PHẠM:** Admin unlock Chapter thủ công (cho phép quản trị viên unlock Chapter ngoài logic Chapter Progression)
- ❌ **VI PHẠM:** Admin cho học ngoài scope (cho phép quản trị viên cho học sinh học nội dung ngoài phạm vi License)

### 13.9. Invariant License – Student

- ❌ **VI PHẠM:** Student được phép học khi không tồn tại License ACTIVE hợp lệ
- ❌ **VI PHẠM:** Student ở `LICENSE_ACTIVE` nhưng không được assign vào License
- ❌ **VI PHẠM:** License ACTIVE nhưng Student không đồng bộ lifecycle tương ứng

---

## PHẦN 14 – TUYÊN BỐ CUỐI

**Tài liệu này là LUẬT HỆ THỐNG.**

Mọi code, API hoặc chức năng liên quan đến License phải tuân theo tài liệu này. Không được sửa tài liệu để hợp thức hoá code.

Tài liệu này là nguồn sự thật duy nhất (Source of Truth) cho License Rules trong hệ thống Gia sư Toán AI. Mọi quyết định về thiết kế, triển khai, và kiểm thử liên quan đến License phải dựa trên tài liệu này.

Tài liệu này phụ thuộc trực tiếp vào Student Lifecycle – System Law, Trial Policy – System Law, và Chapter Progression – System Law. Mọi quy định trong License Rules phải tuân thủ và không được mâu thuẫn với các System Law phụ thuộc.

---

**Phiên bản tài liệu:** 1.0  
**Ngày tạo:** 2025-01-27  
**Trạng thái:** Frozen – System Law

