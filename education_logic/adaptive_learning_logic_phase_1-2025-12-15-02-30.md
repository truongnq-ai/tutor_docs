# ADAPTIVE LEARNING LOGIC – PHASE 1 (MVP)

Project: Tutor  
Document type: Education Logic / Rule Engine  
Audience: Product / Backend / AI Service  
Status: Draft  
Version: 2025-12-15-02-30  
Author: Product Consultant (ChatGPT)

---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả **logic học tập thích ứng (Adaptive Learning Logic)** cho Tutor – Phase 1, dùng làm:
- Cơ sở triển khai backend rule engine
- Chuẩn hoá cách đánh giá năng lực học sinh
- Định hướng AI Service sinh bài, gợi ý và lộ trình học

Phạm vi:
- Môn Toán lớp 6–7
- Không bao gồm video, lớp live, mạng xã hội học tập

---


## 2. KHÁI NIỆM CỐT LÕI

### 2.1. Skill
- Skill là **đơn vị kiến thức nhỏ nhất**
- Ví dụ:
  - Phân số – so sánh phân số
  - Phân số – cộng trừ cùng mẫu
  - Biểu thức đại số – rút gọn

### 2.2. Skill Graph
- Các skill được tổ chức theo **đồ thị có hướng**
- Mỗi skill có thể có:
  - 0 hoặc nhiều prerequisite skill

### 2.3. Mastery
- Mastery là **mức độ thành thạo của học sinh với một skill**
- Giá trị: `0 – 100`
- Mastery được cập nhật liên tục sau mỗi lần luyện tập hoặc kiểm tra

---


## 3. TRẠNG THÁI SKILL THEO MASTERY

| Mastery | Trạng thái | Ý nghĩa |
|-------|-----------|--------|
| < 40 | Yếu | Chưa nắm được kiến thức |
| 40 – 69 | Chưa vững | Cần luyện tập thêm |
| 70 – 89 | Đạt | Đã nắm kiến thức |
| ≥ 90 | Thành thạo | Có thể nâng cao |

---


## 4. LOGIC CẬP NHẬT MASTERY

### 4.1. Sau mỗi bài luyện tập (Practice)

- Trả lời đúng:
  - `+5 ~ +8 mastery` (tuỳ độ khó)
- Trả lời sai:
  - `-5 ~ -10 mastery`
- Làm quá nhanh nhưng sai:
  - Phạt thêm mastery (đoán mò)

### 4.2. Giới hạn
- Mastery không vượt quá `100`
- Mastery không nhỏ hơn `0`

---

## 5. LOGIC ĐIỀU CHỈNH ĐỘ KHÓ (DIFFICULTY ADAPTATION)

### 5.1. Tăng độ khó
- Điều kiện:
  - Đúng ≥ 5 bài liên tiếp
  - Mastery ≥ 70
- Hành động:
  - Sinh bài cùng skill, độ khó cao hơn
  - Tăng mức biến đổi dữ liệu

### 5.2. Giảm độ khó
- Điều kiện:
  - Sai ≥ 2 bài liên tiếp
  - Mastery < 40
- Hành động:
  - Quay về dạng bài cơ bản
  - Gợi ý từng bước rõ ràng hơn

---

## 6. LOGIC PHÁT HIỆN LỖ HỔNG KIẾN THỨC

### 6.1. Phát hiện skill yếu
- Skill có mastery < 70
- Ưu tiên skill:
  - Có tần suất sai cao
  - Là prerequisite của nhiều skill khác

### 6.2. Truy ngược prerequisite
- Nếu học sinh sai liên tục ở skill A:
  - Kiểm tra mastery các prerequisite skill của A
  - Nếu prerequisite < 70 → quay về luyện prerequisite

---

## 7. LOGIC XÂY DỰNG LỘ TRÌNH HẰNG NGÀY

### 7.1. Nguyên tắc
- Không quá tải
- Không học lan man
- Ưu tiên lấp lỗ hổng

### 7.2. Thuật toán gợi ý (đơn giản – Phase 1)

1. Chọn 1 skill yếu nhất (mastery thấp nhất)
2. Kiểm tra prerequisite
3. Nếu prerequisite chưa đạt → luyện prerequisite
4. Sinh:
   - 5–10 bài luyện tập
   - 1 mini test nếu mastery cải thiện

---

## 8. LOGIC MINI TEST

### 8.1. Cấu trúc mini test
- 5–7 câu hỏi
- Bao gồm:
  - 60–70% skill chính
  - 30–40% prerequisite skill

### 8.2. Đánh giá kết quả
- Điểm < 70%:
  - Giảm mastery skill chính
  - Đề xuất luyện tập lại
- Điểm ≥ 70%:
  - Tăng mastery
  - Cho phép chuyển skill tiếp theo

---

## 9. VAI TRÒ AI SERVICE TRONG ADAPTIVE LEARNING

AI Service chịu trách nhiệm:
- Sinh bài tập theo skill & độ khó
- Sinh gợi ý từng bước (Hint Generator)
- Phân tích lỗi sai phổ biến

Core Service chịu trách nhiệm:
- Lưu mastery
- Áp dụng rule
- Quyết định lộ trình học

---

## 10. GIỚI HẠN PHASE 1

- Không dùng machine learning model phức tạp
- Không cá nhân hoá theo phong cách học
- Không dự đoán điểm thi

Logic hiện tại **rule-based**, đủ chính xác và dễ kiểm soát.

---

## 11. TÀI LIỆU LIÊN QUAN

- ../database_design/database_erd_ddl_phase1-2025-12-15-02-05.md
- ../technical_design/api_db_mapping_phase1-2025-12-15-00-20.md
- ../user_stories/student_user_stories-2025-12-14-22-45.md

---

## 12. LỊCH SỬ THAY ĐỔI

- 2025-12-15-02-30: Tạo mới Adaptive Learning Logic – Phase 1


---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)