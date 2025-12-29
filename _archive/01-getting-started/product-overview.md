# PRODUCT OVERVIEW

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả tổng quan về sản phẩm Tutor - mục tiêu, định vị, phạm vi và roadmap.

## Mục tiêu sản phẩm

Xây dựng một ứng dụng **gia sư Toán cá nhân hoá** cho học sinh THCS (lớp 6–7), giúp:
- Học sinh học đúng trọng tâm, lấp lỗ hổng kiến thức
- Phụ huynh theo dõi được **việc học và kết quả học tập một cách minh bạch**
- Tạo nền tảng dữ liệu để mở rộng sang giáo viên/gia sư ở các giai đoạn sau

## Định vị sản phẩm

Sản phẩm **KHÔNG phải**:
- App giải bài đơn thuần (Photomath-style)
- App học video
- Nền tảng lớp học online

Sản phẩm **LÀ**:
- Gia sư Toán 1–1 dựa trên AI + logic giáo dục
- Hệ thống học tập có kiểm soát và báo cáo cho phụ huynh

## Đối tượng sử dụng

| Persona | Độ tuổi | Vai trò |
|------|--------|--------|
| Học sinh | 11–13 | Người học |
| Phụ huynh | 35–50 | Người giám sát & trả tiền |

## Phạm vi (Scope)

### Trong phạm vi (IN SCOPE)

**Môn học**
- Toán lớp 6
- Toán lớp 7

**Chức năng chính**
- Giải bài Toán bằng ảnh và text
- Học theo lộ trình hằng ngày
- Luyện tập cá nhân hoá theo skill
- Mini test theo dạng bài
- Dashboard báo cáo cho phụ huynh (web)
- Học sinh đăng nhập/đăng ký: Google, Apple, Manual

### Ngoài phạm vi (OUT OF SCOPE)

- Video bài giảng dài
- Lớp học live
- Mạng xã hội học tập
- Chat giữa học sinh
- App mobile cho phụ huynh
- Giáo viên/gia sư tạo lớp

📌 Mục tiêu: đảm bảo MVP gọn, nhanh, kiểm soát được chất lượng.

## Roadmap

Xem chi tiết: [Product Roadmap](./roadmap.md)

## Giả định & Ràng buộc

### Giả định
- Học sinh sử dụng smartphone (Android/iOS)
- Phụ huynh truy cập dashboard bằng web
- Người dùng có kết nối Internet ổn định

### Ràng buộc
- Mobile-first cho học sinh
- Không phụ thuộc vào video
- Logic học tập **rule-based**, AI chỉ hỗ trợ sinh nội dung

## User Flow Tổng quan

**Học sinh**
```
Onboarding → Lộ trình hôm nay → Giải bài / Luyện tập → Mini test → Cập nhật mastery
```

**Phụ huynh**
```
Đăng nhập web → Xem tổng quan học tập → Xem điểm yếu → Nhận báo cáo tuần
```

## Yêu cầu chức năng chính

### Module: Onboarding & Thiết lập ban đầu
- Chọn lớp: 6 hoặc 7
- Chọn mục tiêu học tập
- Lưu thông tin vào hồ sơ học sinh

### Module: Giải bài Toán (Tutor Mode)
- Upload ảnh hoặc nhập text
- Nhận lời giải theo từng bước
- Có phần "lưu ý lỗi sai thường gặp"
- Không hiển thị toàn bộ lời giải cùng lúc

### Module: Lộ trình học hằng ngày
- Gợi ý 1–2 skill trọng tâm
- 5–10 bài luyện tập/ngày
- Thời lượng đề xuất: 15–30 phút

### Module: Luyện tập cá nhân hoá
- Sinh bài theo skill
- Tăng độ khó khi làm đúng liên tiếp
- Giảm độ khó khi sai nhiều
- Ghi nhận đúng/sai và thời gian làm bài

### Module: Mini Test
- 5–7 câu hỏi
- Trộn skill chính + prerequisite
- Có giới hạn thời gian
- Chấm điểm tự động

### Module: Dashboard Phụ huynh (Web)
- Thời gian học theo ngày/tuần
- Số bài đã làm
- Tỉ lệ đúng/sai
- Nhận xét tự động bằng ngôn ngữ đơn giản

## Yêu cầu phi chức năng

### Hiệu năng
- Thời gian trả lời AI: < 5 giây
- Load dashboard: < 2 giây

### Độ chính xác
- Bài Toán đúng ≥ 95% (chương trình phổ thông)
- Nếu không chắc chắn → cảnh báo học sinh

### Bảo mật & quyền riêng tư
- Mỗi phụ huynh chỉ xem dữ liệu con mình
- Không public dữ liệu học sinh
- Tuân thủ nguyên tắc privacy-by-design

## Dữ liệu & Logic nghiệp vụ

### Đối tượng dữ liệu chính

| Entity | Mô tả |
|------|------|
| Student | Hồ sơ học sinh |
| Chapter | Chương học (trục sư phạm) |
| Skill | Kỹ năng Toán nhỏ nhất (trục AI) |
| Practice | Lượt luyện tập |
| Mini Test | Kết quả mini test |

### Logic nghiệp vụ quan trọng
- Skill mastery (0–100)
- Prerequisite checking
- Adaptive learning (rule-based)

## Metrics & KPI

Xem chi tiết: [KPIs & Metrics](./kpis-metrics.md)

## Rủi ro & Phương án giảm thiểu

| Rủi ro | Ảnh hưởng | Giải pháp |
|------|----------|---------|
| AI giải sai | Cao | Rule-based + admin review |
| Học sinh copy | Trung bình | Chia nhỏ lời giải |
| Phụ huynh khó hiểu | Trung bình | Ngôn ngữ báo cáo đơn giản |

## Tài liệu liên quan

- [Core Concepts](../00-core-concepts/glossary.md) - Thuật ngữ
- [Domain Model](../02-domain-model/) - Entities và relationships
- [Product Rules](../03-product-rules/) - Quy tắc nghiệp vụ
- [User Stories](../06-user-stories/) - User stories chi tiết
- [User Flows](../05-user-flows/) - Luồng người dùng

---

← Quay lại: [README.md](../README.md)

