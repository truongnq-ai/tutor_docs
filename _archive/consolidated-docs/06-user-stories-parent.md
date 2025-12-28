
================================================================================
# File: 03-for-product-owners/user-stories/parent/README.md
================================================================================

# Parent User Stories

Tài liệu này mô tả tất cả user stories dành cho phụ huynh trong hệ thống Tutor Phase 1 (MVP).

## Tổng quan

Phụ huynh có **12 user stories** được chia thành các nhóm chức năng:

1. **Truy cập & Xác thực** (4 stories)
   - [Đăng nhập dashboard phụ huynh](authentication.md#pu-01-đăng-nhập-dashboard-phụ-huynh)
   - [Đăng ký tài khoản phụ huynh](authentication.md#pu-01a-đăng-ký-tài-khoản-phụ-huynh)
   - [Đăng nhập bằng Google/Apple](authentication.md#pu-11-đăng-nhập-bằng-googleapple)
   - [Cập nhật số điện thoại sau OAuth login](authentication.md#pu-12-cập-nhật-số-điện-thoại-sau-oauth-login)

2. **Tổng quan học tập** (2 stories)
   - [Xem tổng quan tình hình học tập](overview.md#pu-02-xem-tổng-quan-tình-hình-học-tập)
   - [Biết con có học thật hay không](overview.md#pu-03-biết-con-có-học-thật-hay-không)

3. **Đánh giá kết quả học tập** (2 stories)
   - [Xem tỉ lệ đúng/sai](assessment.md#pu-04-xem-tỉ-lệ-đúngsai)
   - [Xem tiến bộ theo thời gian](assessment.md#pu-05-xem-tiến-bộ-theo-thời-gian)

4. **Điểm yếu & Gợi ý cải thiện** (2 stories)
   - [Biết con đang yếu ở phần nào](weaknesses.md#pu-06-biết-con-đang-yếu-ở-phần-nào)
   - [Nhận gợi ý cải thiện](weaknesses.md#pu-07-nhận-gợi-ý-cải-thiện)

5. **Báo cáo định kỳ** (2 stories)
   - [Nhận báo cáo học tập hằng tuần](reporting.md#pu-08-nhận-báo-cáo-học-tập-hằng-tuần)
   - [Nội dung báo cáo dễ hiểu](reporting.md#pu-09-nội-dung-báo-cáo-dễ-hiểu)

6. **Quyền riêng tư & Bảo mật** (1 story)
   - [Chỉ xem được dữ liệu của con mình](privacy.md#pu-10-chỉ-xem-được-dữ-liệu-của-con-mình)

## Tài liệu chi tiết

- [Truy cập & Xác thực](authentication.md)
- [Tổng quan học tập](overview.md)
- [Đánh giá kết quả học tập](assessment.md)
- [Điểm yếu & Gợi ý cải thiện](weaknesses.md)
- [Báo cáo định kỳ](reporting.md)
- [Quyền riêng tư & Bảo mật](privacy.md)

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/parent/README.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/parent/overview.md
================================================================================

# Tổng quan học tập
[← Quay lại Overview](../README.md)

## PU-02: Xem tổng quan tình hình học tập

**User story**  
Là một phụ huynh, tôi muốn xem tổng quan việc học của con để biết con có học đều đặn hay không.

**Acceptance criteria**
- [ ] Hiển thị: Số ngày học trong tuần, Tổng thời gian học, Số bài đã làm
- [ ] Dữ liệu hiển thị theo tuần (mặc định)

## PU-03: Biết con có học thật hay không

**User story**  
Là một phụ huynh, tôi muốn biết con có thực sự học hay chỉ mở ứng dụng cho có.

**Acceptance criteria**
- [ ] Phân biệt rõ: Thời gian học thực tế, Số bài có tương tác (làm bài, trả lời)
- [ ] Không chỉ hiển thị "thời gian mở app"

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/parent/overview.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/parent/authentication.md
================================================================================

# Truy cập & Xác thực
[← Quay lại Overview](../README.md)

## PU-01: Đăng nhập dashboard phụ huynh

**User story**  
Là một phụ huynh, tôi muốn đăng nhập vào dashboard để xem tình hình học tập của con.

**Acceptance criteria**
- [ ] Đăng nhập bằng số điện thoại (username) + password
- [ ] Hoặc đăng nhập bằng Google/Apple (OAuth)
- [ ] Nếu đăng nhập OAuth và chưa có số điện thoại hoặc chưa verified → Bắt buộc cập nhật và verify số điện thoại

## PU-01a: Đăng ký tài khoản phụ huynh

**User story**  
Là một phụ huynh, tôi muốn đăng ký tài khoản để quản lý việc học của con.

**Acceptance criteria**
- [ ] Form đăng ký gồm: Tên, Số điện thoại (username), Password, Email (không bắt buộc)
- [ ] Bắt buộc xác thực số điện thoại bằng OTP trong quá trình đăng ký
- [ ] Sau khi verify OTP → Tài khoản được kích hoạt

## PU-11: Đăng nhập bằng Google/Apple

**User story**  
Là một phụ huynh, tôi muốn đăng nhập bằng tài khoản Google hoặc Apple để tiện lợi hơn.

**Acceptance criteria**
- [ ] Đăng nhập bằng Google hoặc Apple
- [ ] Nếu chưa có tài khoản → Tự động tạo tài khoản
- [ ] Sau khi đăng nhập OAuth: Nếu chưa có số điện thoại hoặc phone_verified = false → Bắt buộc cập nhật số điện thoại

## PU-12: Cập nhật số điện thoại sau OAuth login

**User story**  
Là một phụ huynh đã đăng nhập bằng OAuth, tôi muốn cập nhật số điện thoại để học sinh có thể liên kết với tôi.

**Acceptance criteria**
- [ ] Hiển thị màn hình "Cập nhật số điện thoại" sau OAuth login nếu phone_verified = false
- [ ] Nhập số điện thoại → Gửi OTP → Verify OTP
- [ ] Sau khi verify OTP → phone_verified = true → Redirect đến dashboard

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/parent/authentication.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/parent/assessment.md
================================================================================

# Đánh giá kết quả học tập
[← Quay lại Overview](../README.md)

## PU-04: Xem tỉ lệ đúng/sai

**User story**  
Là một phụ huynh, tôi muốn xem tỉ lệ làm bài đúng/sai để đánh giá mức độ hiểu bài của con.

**Acceptance criteria**
- [ ] Hiển thị tỉ lệ đúng/sai theo: Tuần, Tháng
- [ ] Không hiển thị chi tiết từng bài toán (tránh quá phức tạp)

## PU-05: Xem tiến bộ theo thời gian

**User story**  
Là một phụ huynh, tôi muốn biết con có tiến bộ hơn so với trước hay không.

**Acceptance criteria**
- [ ] So sánh: Tuần này vs tuần trước, Tháng này vs tháng trước
- [ ] Dùng biểu đồ đơn giản, dễ hiểu

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/parent/assessment.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/parent/reporting.md
================================================================================

# Báo cáo định kỳ
[← Quay lại Overview](../README.md)

## PU-08: Nhận báo cáo học tập hằng tuần

**User story**  
Là một phụ huynh, tôi muốn nhận báo cáo học tập hằng tuần để theo dõi sát sao việc học của con.

**Acceptance criteria**
- [ ] Gửi báo cáo qua: Email hoặc Zalo OA
- [ ] Nội dung báo cáo gồm: Thời gian học, Kết quả học tập, Điểm yếu chính

## PU-09: Nội dung báo cáo dễ hiểu

**User story**  
Là một phụ huynh, tôi muốn báo cáo được viết dễ hiểu để tôi không cần kiến thức Toán chuyên sâu.

**Acceptance criteria**
- [ ] Không dùng thuật ngữ kỹ thuật phức tạp
- [ ] Không hiển thị công thức Toán
- [ ] Dùng câu ngắn, rõ ý

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/parent/reporting.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/parent/weaknesses.md
================================================================================

# Điểm yếu & Gợi ý cải thiện
[← Quay lại Overview](../README.md)

## PU-06: Biết con đang yếu ở phần nào

**User story**  
Là một phụ huynh, tôi muốn biết con đang yếu ở những phần kiến thức nào.

**Acceptance criteria**
- [ ] Hiển thị danh sách các chương/dạng còn yếu
- [ ] Không dùng thuật ngữ Toán học quá chuyên sâu
- [ ] Sắp xếp theo mức độ yếu (ưu tiên cao → thấp)

## PU-07: Nhận gợi ý cải thiện

**User story**  
Là một phụ huynh, tôi muốn nhận được gợi ý để biết nên hỗ trợ con như thế nào.

**Acceptance criteria**
- [ ] Gợi ý bằng ngôn ngữ đời thường
- [ ] Ví dụ: "Con đang yếu phần phân số, nên luyện thêm mỗi ngày 15 phút"

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/parent/weaknesses.md
================================================================================

================================================================================
# File: 03-for-product-owners/user-stories/parent/privacy.md
================================================================================

# Quyền riêng tư & Bảo mật
[← Quay lại Overview](../README.md)

## PU-10: Chỉ xem được dữ liệu của con mình

**User story**  
Là một phụ huynh, tôi muốn chỉ xem được dữ liệu học tập của con mình để đảm bảo quyền riêng tư.

**Acceptance criteria**
- [ ] Mỗi tài khoản phụ huynh chỉ gắn với 1 học sinh (Phase 1)
- [ ] Không truy cập được dữ liệu học sinh khác
- [ ] Không chỉnh sửa dữ liệu học tập

[← Quay lại Overview](../README.md)



================================================================================
# End of: 03-for-product-owners/user-stories/parent/privacy.md
================================================================================
