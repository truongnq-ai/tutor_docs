# KPIs & METRICS

Tài liệu này mô tả các chỉ số thành công (KPIs) và metrics để đánh giá hiệu quả của hệ thống Tutor.

## Sản phẩm (Product KPIs)

### Activation Rate
- **Mục tiêu**: ≥ 60%
- **Định nghĩa**: Tỷ lệ người dùng giải ≥ 1 bài sau khi đăng ký
- **Công thức**: (Số người dùng giải ≥ 1 bài / Tổng số người đăng ký) × 100%

### Retention D7
- **Mục tiêu**: ≥ 30%
- **Định nghĩa**: Tỷ lệ người dùng quay lại sau 7 ngày
- **Công thức**: (Số người dùng active ngày 7 / Số người dùng đăng ký) × 100%

### Thời gian học/ngày
- **Mục tiêu**: ≥ 10 phút
- **Định nghĩa**: Thời gian học trung bình mỗi ngày của người dùng active
- **Công thức**: Tổng thời gian học / Số ngày active

## Giáo dục (Education KPIs)

### Mastery trung bình tăng
- **Mục tiêu**: +15–25 điểm sau 7 ngày
- **Định nghĩa**: Mức tăng trung bình của mastery score sau 7 ngày học
- **Công thức**: Mastery trung bình (ngày 7) - Mastery trung bình (ngày 0)

### Giảm số skill yếu
- **Mục tiêu**: Giảm số skill yếu sau 1 tháng
- **Định nghĩa**: Số lượng skill có mastery < 70 giảm đi sau 1 tháng học
- **Công thức**: Số skill yếu (tháng 0) - Số skill yếu (tháng 1)

## Hiệu năng (Performance Metrics)

### Thời gian trả lời AI
- **Mục tiêu**: < 5 giây
- **Định nghĩa**: Thời gian từ khi gửi request đến khi nhận response từ AI Service
- **Bao gồm**: OCR + Math Solver + Hint Generation

### Load dashboard
- **Mục tiêu**: < 2 giây
- **Định nghĩa**: Thời gian load trang dashboard từ khi click đến khi hiển thị đầy đủ

## Độ chính xác (Accuracy Metrics)

### Bài Toán đúng
- **Mục tiêu**: ≥ 95% (chương trình phổ thông)
- **Định nghĩa**: Tỷ lệ bài toán được giải đúng theo chuẩn chương trình
- **Công thức**: (Số bài đúng / Tổng số bài) × 100%

## Theo dõi và Báo cáo

### Tần suất đo lường
- **Hàng ngày**: Activation rate, Thời gian học/ngày
- **Hàng tuần**: Retention D7, Mastery tăng
- **Hàng tháng**: Giảm skill yếu, Tổng hợp tất cả metrics

### Dashboard Monitoring
- Tất cả metrics được hiển thị trên Admin Dashboard
- Cảnh báo khi metrics dưới ngưỡng mục tiêu

---

← Quay lại: [README.md](../README.md)

