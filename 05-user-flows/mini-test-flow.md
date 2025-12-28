# MINI TEST FLOW

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả flow Mini Test hoàn chỉnh - từ unlock đến làm bài và xem kết quả.

## Flow chính

### 1. Unlock Mini Test

**Điều kiện:**
- Hoàn thành ≥10 bài practice trong Chapter
- Practice count được đếm từ tất cả Skills trong Chapter

**Bước:**
1. Học sinh hoàn thành đủ số practice
2. Hệ thống hiển thị: "Bạn đã sẵn sàng làm Mini Test!"
3. Nút "Làm Mini Test" xuất hiện

**Kết quả:**
- Mini Test được unlock
- Học sinh có thể làm test

### 2. Bắt đầu Mini Test

**Bước:**
1. Click "Làm Mini Test"
2. Hiển thị thông tin:
   - "Mini Test - Phân số"
   - "6 câu hỏi, 10 phút"
   - Hướng dẫn: "Làm hết các câu, không bỏ sót"
3. Click "Bắt đầu"

**Kết quả:**
- Mini Test bắt đầu
- Đồng hồ đếm ngược

### 3. Làm Mini Test

**Bước:**
1. Hiển thị câu hỏi từng câu một
2. Học sinh làm bài
3. Tiến độ: "Câu 3/6"
4. Thời gian: Đồng hồ đếm ngược

**Lưu ý:**
- Không thể xem lại câu đã làm
- Không thể bỏ sót câu nào
- Phải làm hết tất cả câu

**Kết quả:**
- Học sinh hoàn thành tất cả câu hỏi

### 4. Nộp bài

**Bước:**
1. Click "Nộp bài"
2. Xác nhận: "Bạn có chắc muốn nộp bài?"
3. Click "Xác nhận"
4. Chờ kết quả (loading)

**Kết quả:**
- Bài được nộp
- Hệ thống tính điểm

### 5. Xem kết quả

**Nếu đạt (≥70%):**
1. Hiển thị điểm: "Bạn đạt 83%"
2. Đánh giá: "Xuất sắc!"
3. Phân tích:
   - "Bạn đã làm tốt Chapter 'Phân số'"
   - "Bạn làm tốt phần 'Cộng trừ phân số'"
4. Thành tựu: "Chúc mừng! Bạn đã hoàn thành Chapter 'Phân số'"
5. Tiếp tục: "Bạn có thể học Chapter tiếp theo"

**Nếu chưa đạt (<70%):**
1. Hiển thị điểm: "Bạn đạt 50%"
2. Đánh giá: "Cần cải thiện"
3. Phân tích:
   - "Bạn đang yếu ở phần 'Nhân chia phân số'"
   - "Nên luyện tập thêm phần này"
4. Động viên: "Không sao, bạn có thể làm lại sau khi luyện tập thêm"
5. Gợi ý: "Nên luyện tập lại phần 'Nhân chia phân số'"

**Kết quả:**
- Học sinh biết kết quả
- Có hướng dẫn cải thiện (nếu cần)

### 6. Ảnh hưởng đến Mastery

**Nếu đạt:**
- Tăng mastery cho các Skills làm đúng
- Cho phép chuyển Chapter tiếp theo

**Nếu chưa đạt:**
- Giảm mastery cho các Skills làm sai
- Đề xuất luyện tập lại

## Flow phụ

### Làm lại Mini Test

**Điều kiện:**
- Sau khi luyện tập thêm 5-10 bài practice
- Mini Test được unlock lại

**Bước:**
1. Học sinh luyện tập thêm
2. Mini Test được unlock lại
3. Làm lại Mini Test
4. Xem kết quả mới

**Kết quả:**
- Có cơ hội chứng minh đã cải thiện
- Đạt điểm cao hơn (nếu đã cải thiện)

## Tài liệu liên quan

- [Mini Test Domain Model](../02-domain-model/mini-test.md)
- [Mini Test Rules](../03-product-rules/mini-test-rules.md)
- [Student Mini Test Experience](../04-user-experience/student/mini-test-experience.md)

---

← Quay lại: [README.md](../README.md)

