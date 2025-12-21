# USER STORIES

Tài liệu này tổng hợp tất cả user stories cho hệ thống Tutor Phase 1 (MVP).

## Mục đích

Tài liệu này mô tả toàn bộ user stories dành cho:
- **Học sinh**: 14 user stories
- **Phụ huynh**: 12 user stories
- **Admin**: Exercise và Question management workflows

Làm cơ sở cho:
- Thiết kế UI/UX
- Chia task cho đội phát triển
- Viết test case và acceptance test

---

## 1. STUDENT USER STORIES

### 1.1. Onboarding & Thiết lập ban đầu

#### US-01: Chọn lớp học
**User story**  
Là một học sinh, tôi muốn chọn lớp học của mình để ứng dụng dạy đúng chương trình Toán mà tôi đang học.

**Acceptance criteria**
- [ ] Cho phép chọn lớp 6 hoặc lớp 7
- [ ] Lưu thông tin lớp vào hồ sơ học sinh
- [ ] Không cho phép tự ý đổi lớp sau khi đã thiết lập (chỉ admin can thiệp)

#### US-02: Chọn mục tiêu học tập
**User story**  
Là một học sinh, tôi muốn chọn mục tiêu học tập để ứng dụng xây dựng lộ trình học phù hợp cho tôi mỗi ngày.

**Acceptance criteria**
- [ ] Các mục tiêu bao gồm: Học theo chương, Củng cố kiến thức còn yếu, Ôn tập cho bài kiểm tra
- [ ] Mục tiêu học tập ảnh hưởng trực tiếp đến lộ trình học hằng ngày

### 1.2. Lộ trình học hằng ngày

#### US-03: Xem gợi ý học tập trong ngày
**User story**  
Là một học sinh, tôi muốn biết hôm nay mình nên học những nội dung gì để không học lan man, mất định hướng.

**Acceptance criteria**
- [ ] Hiển thị 1–2 skill trọng tâm trong ngày
- [ ] Tổng số bài luyện tập: 5–10 bài
- [ ] Thời lượng học gợi ý: 15–30 phút

#### US-04: Theo dõi việc hoàn thành lộ trình ngày
**User story**  
Là một học sinh, tôi muốn biết mình đã hoàn thành bao nhiêu phần trong lộ trình học hôm nay.

**Acceptance criteria**
- [ ] Đánh dấu các bài đã hoàn thành
- [ ] Hiển thị phần trăm tiến độ trong ngày
- [ ] Cho phép tạm dừng và tiếp tục học sau

### 1.3. Giải bài Toán (Tutor Mode)

#### US-05: Giải bài Toán bằng hình ảnh
**User story**  
Là một học sinh, tôi muốn chụp ảnh đề Toán để được hướng dẫn cách giải chi tiết.

**Acceptance criteria**
- [ ] Cho phép chụp ảnh hoặc chọn ảnh từ thư viện
- [ ] Sử dụng OCR để nhận dạng đề bài
- [ ] Nếu OCR không chắc chắn, yêu cầu học sinh xác nhận lại đề bài

#### US-06: Giải bài Toán bằng văn bản
**User story**  
Là một học sinh, tôi muốn nhập đề Toán bằng văn bản để giải những bài đơn giản.

**Acceptance criteria**
- [ ] Hỗ trợ nhập các ký hiệu Toán học cơ bản
- [ ] Kiểm tra và xác thực nội dung trước khi gửi xử lý

#### US-07: Xem lời giải theo từng bước
**User story**  
Là một học sinh, tôi muốn xem lời giải từng bước một để hiểu cách làm bài, thay vì chỉ chép đáp án.

**Acceptance criteria**
- [ ] Chỉ hiển thị một bước giải tại một thời điểm
- [ ] Có nút "Xem bước tiếp theo"
- [ ] Mỗi bước có giải thích ngắn gọn, dễ hiểu

#### US-08: Nhận cảnh báo lỗi sai thường gặp
**User story**  
Là một học sinh, tôi muốn biết những lỗi sai thường gặp để tránh lặp lại trong các bài sau.

**Acceptance criteria**
- [ ] Hiển thị mục "Lưu ý" trong lời giải
- [ ] Gắn lỗi sai với skill tương ứng

### 1.4. Luyện tập cá nhân hoá

#### US-09: Luyện tập tập trung vào skill yếu
**User story**  
Là một học sinh, tôi muốn được luyện tập nhiều hơn vào những skill mà tôi đang yếu.

**Acceptance criteria**
- [ ] Xác định skill yếu dựa trên mastery (< 70)
- [ ] Sinh bài tập cùng dạng với skill yếu
- [ ] Thay đổi dữ liệu bài toán, không lặp lại đề cũ

#### US-10: Điều chỉnh độ khó bài tập
**User story**  
Là một học sinh, tôi muốn độ khó bài tập được điều chỉnh phù hợp với khả năng của mình.

**Acceptance criteria**
- [ ] Làm đúng ≥ 5 bài liên tiếp → tăng độ khó
- [ ] Làm sai ≥ 2 bài liên tiếp → giảm độ khó

### 1.5. Mini Test

#### US-11: Làm mini test kiểm tra kiến thức
**User story**  
Là một học sinh, tôi muốn làm mini test để kiểm tra xem mình đã thực sự hiểu bài hay chưa.

**Acceptance criteria**
- [ ] Mini test gồm 5–7 câu hỏi
- [ ] Trộn skill chính và skill prerequisite
- [ ] Có giới hạn thời gian làm bài

#### US-12: Xem kết quả mini test
**User story**  
Là một học sinh, tôi muốn xem kết quả mini test để biết mình đang mạnh hay yếu ở phần nào.

**Acceptance criteria**
- [ ] Hiển thị điểm số theo %
- [ ] Chỉ rõ các skill làm sai
- [ ] Đề xuất nội dung luyện tập tiếp theo

### 1.6. Theo dõi tiến độ cá nhân

#### US-13: Xem tiến độ học tập cá nhân
**User story**  
Là một học sinh, tôi muốn xem tiến độ học tập của mình để có thêm động lực học.

**Acceptance criteria**
- [ ] Hiển thị số ngày học liên tiếp
- [ ] Hiển thị tổng số bài đã làm
- [ ] Hiển thị mastery theo từng skill

#### US-14: Nhận gợi ý cải thiện học tập
**User story**  
Là một học sinh, tôi muốn nhận được các gợi ý học tập phù hợp để cải thiện điểm yếu của mình.

**Acceptance criteria**
- [ ] Gợi ý dựa trên dữ liệu học tập thực tế
- [ ] Ngôn ngữ gợi ý đơn giản, dễ hiểu

### 1.7. Liên kết phụ huynh

#### US-15: Liên kết phụ huynh bằng số điện thoại
**User story**  
Là một học sinh, tôi muốn liên kết tài khoản với phụ huynh bằng số điện thoại để tiếp tục sử dụng ứng dụng sau khi hết lượt dùng thử.

**Acceptance criteria**
- [ ] Nhập số điện thoại phụ huynh
- [ ] Gửi OTP qua SMS (qua Firebase Auth)
- [ ] Rate limiting: Tối đa 3 lần gửi OTP/ngày/số điện thoại
- [ ] OTP có thời hạn 5 phút
- [ ] Nếu phụ huynh chưa có tài khoản → Tự động tạo tài khoản
- [ ] Dữ liệu học tập trong thời gian dùng thử được giữ lại

---

## 2. PARENT USER STORIES

### 2.1. Truy cập & Xác thực

#### PU-01: Đăng nhập dashboard phụ huynh
**User story**  
Là một phụ huynh, tôi muốn đăng nhập vào dashboard để xem tình hình học tập của con.

**Acceptance criteria**
- [ ] Đăng nhập bằng số điện thoại (username) + password
- [ ] Hoặc đăng nhập bằng Google/Apple (OAuth)
- [ ] Nếu đăng nhập OAuth và chưa có số điện thoại hoặc chưa verified → Bắt buộc cập nhật và verify số điện thoại

#### PU-01a: Đăng ký tài khoản phụ huynh
**User story**  
Là một phụ huynh, tôi muốn đăng ký tài khoản để quản lý việc học của con.

**Acceptance criteria**
- [ ] Form đăng ký gồm: Tên, Số điện thoại (username), Password, Email (không bắt buộc)
- [ ] Bắt buộc xác thực số điện thoại bằng OTP trong quá trình đăng ký
- [ ] Sau khi verify OTP → Tài khoản được kích hoạt

### 2.2. Tổng quan học tập

#### PU-02: Xem tổng quan tình hình học tập
**User story**  
Là một phụ huynh, tôi muốn xem tổng quan việc học của con để biết con có học đều đặn hay không.

**Acceptance criteria**
- [ ] Hiển thị: Số ngày học trong tuần, Tổng thời gian học, Số bài đã làm
- [ ] Dữ liệu hiển thị theo tuần (mặc định)

#### PU-03: Biết con có học thật hay không
**User story**  
Là một phụ huynh, tôi muốn biết con có thực sự học hay chỉ mở ứng dụng cho có.

**Acceptance criteria**
- [ ] Phân biệt rõ: Thời gian học thực tế, Số bài có tương tác (làm bài, trả lời)
- [ ] Không chỉ hiển thị "thời gian mở app"

### 2.3. Đánh giá kết quả học tập

#### PU-04: Xem tỉ lệ đúng/sai
**User story**  
Là một phụ huynh, tôi muốn xem tỉ lệ làm bài đúng/sai để đánh giá mức độ hiểu bài của con.

**Acceptance criteria**
- [ ] Hiển thị tỉ lệ đúng/sai theo: Tuần, Tháng
- [ ] Không hiển thị chi tiết từng bài toán (tránh quá phức tạp)

#### PU-05: Xem tiến bộ theo thời gian
**User story**  
Là một phụ huynh, tôi muốn biết con có tiến bộ hơn so với trước hay không.

**Acceptance criteria**
- [ ] So sánh: Tuần này vs tuần trước, Tháng này vs tháng trước
- [ ] Dùng biểu đồ đơn giản, dễ hiểu

### 2.4. Điểm yếu & Gợi ý cải thiện

#### PU-06: Biết con đang yếu ở phần nào
**User story**  
Là một phụ huynh, tôi muốn biết con đang yếu ở những phần kiến thức nào.

**Acceptance criteria**
- [ ] Hiển thị danh sách các chương/dạng còn yếu
- [ ] Không dùng thuật ngữ Toán học quá chuyên sâu
- [ ] Sắp xếp theo mức độ yếu (ưu tiên cao → thấp)

#### PU-07: Nhận gợi ý cải thiện
**User story**  
Là một phụ huynh, tôi muốn nhận được gợi ý để biết nên hỗ trợ con như thế nào.

**Acceptance criteria**
- [ ] Gợi ý bằng ngôn ngữ đời thường
- [ ] Ví dụ: "Con đang yếu phần phân số, nên luyện thêm mỗi ngày 15 phút"

### 2.5. Báo cáo định kỳ

#### PU-08: Nhận báo cáo học tập hằng tuần
**User story**  
Là một phụ huynh, tôi muốn nhận báo cáo học tập hằng tuần để theo dõi sát sao việc học của con.

**Acceptance criteria**
- [ ] Gửi báo cáo qua: Email hoặc Zalo OA
- [ ] Nội dung báo cáo gồm: Thời gian học, Kết quả học tập, Điểm yếu chính

#### PU-09: Nội dung báo cáo dễ hiểu
**User story**  
Là một phụ huynh, tôi muốn báo cáo được viết dễ hiểu để tôi không cần kiến thức Toán chuyên sâu.

**Acceptance criteria**
- [ ] Không dùng thuật ngữ kỹ thuật phức tạp
- [ ] Không hiển thị công thức Toán
- [ ] Dùng câu ngắn, rõ ý

### 2.6. Quyền riêng tư & Bảo mật

#### PU-10: Chỉ xem được dữ liệu của con mình
**User story**  
Là một phụ huynh, tôi muốn chỉ xem được dữ liệu học tập của con mình để đảm bảo quyền riêng tư.

**Acceptance criteria**
- [ ] Mỗi tài khoản phụ huynh chỉ gắn với 1 học sinh (Phase 1)
- [ ] Không truy cập được dữ liệu học sinh khác
- [ ] Không chỉnh sửa dữ liệu học tập

#### PU-11: Đăng nhập bằng Google/Apple
**User story**  
Là một phụ huynh, tôi muốn đăng nhập bằng tài khoản Google hoặc Apple để tiện lợi hơn.

**Acceptance criteria**
- [ ] Đăng nhập bằng Google hoặc Apple
- [ ] Nếu chưa có tài khoản → Tự động tạo tài khoản
- [ ] Sau khi đăng nhập OAuth: Nếu chưa có số điện thoại hoặc phone_verified = false → Bắt buộc cập nhật số điện thoại

#### PU-12: Cập nhật số điện thoại sau OAuth login
**User story**  
Là một phụ huynh đã đăng nhập bằng OAuth, tôi muốn cập nhật số điện thoại để học sinh có thể liên kết với tôi.

**Acceptance criteria**
- [ ] Hiển thị màn hình "Cập nhật số điện thoại" sau OAuth login nếu phone_verified = false
- [ ] Nhập số điện thoại → Gửi OTP → Verify OTP
- [ ] Sau khi verify OTP → phone_verified = true → Redirect đến dashboard

---

## 3. ADMIN USER STORIES

### 3.1. Exercise Management

Xem chi tiết: [Exercise Input Workflows](../_archive/old-versions/exercise-input-workflows.md)

### 3.2. Question Management

Xem chi tiết: [Question Management](../_archive/old-versions/question-management.md)

---

## 4. QUY TẮC ƯU TIÊN

### Must-have (Phase 1)
- Tất cả Student User Stories (US-01 → US-15)
- Tất cả Parent User Stories (PU-01 → PU-12)

### Nice-to-have (Có thể lùi Phase 2)
- US-13, US-14 (Theo dõi tiến độ cá nhân - có thể đơn giản hóa)

---

## 5. PHỤ THUỘC & LIÊN KẾT

- [Product Overview](./product-overview.md)
- [User Flows](./user-flows.md)
- [KPIs & Metrics](./kpis-metrics.md)

---

← Quay lại: [README.md](../README.md)

