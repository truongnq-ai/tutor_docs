# Skill Graph – Toán Lớp 6 & 7
Version: 1.0  
Scope: MVP – StudyMate Tutor AI  
Audience: Product, Engineering, Education Team  

---


## 1. Mục đích tài liệu

Tài liệu này định nghĩa **Skill Graph môn Toán cho học sinh lớp 6–7**, được sử dụng làm nền tảng cho:

- Cá nhân hoá lộ trình học
- Adaptive Learning Algorithm
- Phát hiện lỗ hổng kiến thức
- Báo cáo tiến độ học tập cho phụ huynh

Mỗi skill được thiết kế ở mức **atomic (nhỏ nhất có thể đo được)** và có quan hệ phụ thuộc rõ ràng.

---


## 2. Nguyên tắc thiết kế Skill Graph

- Skill phải **đo được bằng bài tập**
- Skill có thể **đạt mastery 0–100**
- Skill có thể có **prerequisite**
- Không cho phép học skill mới nếu prerequisite chưa đạt ngưỡng

---


## 3. Cấu trúc dữ liệu Skill (Logical Model)

```json
Skill {
  skill_id: string,
  grade: number,
  chapter: string,
  skill_name: string,
  prerequisites: [skill_id],
  mastery_level: number (0–100)
}
```

---


## 4. DANH SÁCH SKILLS – TOÁN LỚP 6

### 4.1. Chương: Số tự nhiên

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 6.1.1 | Đọc và viết số tự nhiên | - |
| 6.1.2 | So sánh số tự nhiên | 6.1.1 |
| 6.1.3 | Cộng trừ số tự nhiên | 6.1.1 |
| 6.1.4 | Nhân chia số tự nhiên | 6.1.3 |
| 6.1.5 | Tính chất giao hoán, kết hợp | 6.1.3, 6.1.4 |
| 6.1.6 | Thứ tự thực hiện phép tính | 6.1.3, 6.1.4 |
| 6.1.7 | Lũy thừa với số mũ tự nhiên | 6.1.4 |
| 6.1.8 | Tính giá trị biểu thức có lũy thừa | 6.1.6, 6.1.7 |

### 4.2. Chương: Số nguyên

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 6.2.1 | Nhận biết số nguyên | 6.1.1 |
| 6.2.2 | So sánh số nguyên | 6.2.1 |
| 6.2.3 | Cộng trừ số nguyên | 6.2.1 |
| 6.2.4 | Nhân chia số nguyên | 6.2.3 |
| 6.2.5 | Tính giá trị biểu thức số nguyên | 6.2.3, 6.2.4 |

### 4.3. Chương: Phân số

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 6.3.1 | Nhận biết phân số | 6.1.4 |
| 6.3.2 | So sánh phân số cùng mẫu | 6.3.1 |
| 6.3.3 | So sánh phân số khác mẫu | 6.3.1 |
| 6.3.4 | Quy đồng mẫu số | 6.3.1 |
| 6.3.5 | Cộng trừ phân số cùng mẫu | 6.3.1 |
| 6.3.6 | Cộng trừ phân số khác mẫu | 6.3.4, 6.3.5 |
| 6.3.7 | Nhân phân số | 6.3.1 |
| 6.3.8 | Chia phân số | 6.3.7 |
| 6.3.9 | Rút gọn phân số | 6.1.4, 6.3.1 |
| 6.3.10 | Hỗn số | 6.3.1 |

### 4.4. Chương: Số thập phân

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 6.4.1 | Đọc và viết số thập phân | 6.1.1 |
| 6.4.2 | So sánh số thập phân | 6.4.1 |
| 6.4.3 | Cộng trừ số thập phân | 6.4.1 |
| 6.4.4 | Nhân số thập phân | 6.4.1 |
| 6.4.5 | Chia số thập phân | 6.4.1, 6.4.4 |
| 6.4.6 | Chuyển đổi phân số và số thập phân | 6.3.1, 6.4.1 |

### 4.5. Chương: Tỉ số và tỉ số phần trăm

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 6.5.1 | Nhận biết tỉ số | 6.3.1 |
| 6.5.2 | Tỉ số phần trăm | 6.5.1 |
| 6.5.3 | Tính tỉ số phần trăm của một số | 6.5.2 |
| 6.5.4 | Tìm một số khi biết tỉ số phần trăm | 6.5.3 |

### 4.6. Chương: Hình học cơ bản

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 6.6.1 | Điểm, đường thẳng, đoạn thẳng | - |
| 6.6.2 | Góc và số đo góc | 6.6.1 |
| 6.6.3 | Tam giác | 6.6.1, 6.6.2 |
| 6.6.4 | Tính chu vi tam giác | 6.6.3 |
| 6.6.5 | Tính diện tích tam giác | 6.6.3 |
| 6.6.6 | Hình chữ nhật | 6.6.1, 6.6.2 |
| 6.6.7 | Tính chu vi và diện tích hình chữ nhật | 6.6.6 |
| 6.6.8 | Hình vuông | 6.6.6 |
| 6.6.9 | Tính chu vi và diện tích hình vuông | 6.6.8 |

---

## 5. DANH SÁCH SKILLS – TOÁN LỚP 7

### 5.1. Chương: Số hữu tỉ

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 7.1.1 | Nhận biết số hữu tỉ | 6.3.1 |
| 7.1.2 | So sánh số hữu tỉ | 7.1.1 |
| 7.1.3 | Cộng trừ số hữu tỉ | 7.1.1 |
| 7.1.4 | Nhân chia số hữu tỉ | 7.1.3 |
| 7.1.5 | Lũy thừa số hữu tỉ | 7.1.4, 6.1.7 |
| 7.1.6 | Tính giá trị biểu thức số hữu tỉ | 7.1.3, 7.1.4 |

### 5.2. Chương: Số thực

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 7.2.1 | Nhận biết số thực | 7.1.1, 6.4.1 |
| 7.2.2 | Căn bậc hai | 7.2.1 |
| 7.2.3 | Tính căn bậc hai | 7.2.2 |
| 7.2.4 | So sánh số thực | 7.2.1 |

### 5.3. Chương: Đại lượng tỉ lệ

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 7.3.1 | Đại lượng tỉ lệ thuận | 6.5.1 |
| 7.3.2 | Giải bài toán tỉ lệ thuận | 7.3.1 |
| 7.3.3 | Đại lượng tỉ lệ nghịch | 6.5.1 |
| 7.3.4 | Giải bài toán tỉ lệ nghịch | 7.3.3 |

### 5.4. Chương: Biểu thức đại số

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 7.4.1 | Nhận biết biểu thức đại số | 7.1.1 |
| 7.4.2 | Giá trị của biểu thức đại số | 7.4.1 |
| 7.4.3 | Đơn thức | 7.4.1 |
| 7.4.4 | Đơn thức đồng dạng | 7.4.3 |
| 7.4.5 | Cộng trừ đơn thức đồng dạng | 7.4.4 |
| 7.4.6 | Đa thức | 7.4.3 |
| 7.4.7 | Cộng trừ đa thức | 7.4.6 |
| 7.4.8 | Nhân đơn thức với đa thức | 7.4.3, 7.4.6 |
| 7.4.9 | Nhân đa thức với đa thức | 7.4.8 |

### 5.5. Chương: Hình học

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 7.5.1 | Hai góc đối đỉnh | 6.6.2 |
| 7.5.2 | Hai đường thẳng vuông góc | 7.5.1 |
| 7.5.3 | Đường trung trực | 7.5.2 |
| 7.5.4 | Hai đường thẳng song song | 7.5.1 |
| 7.5.5 | Tiên đề Euclid | 7.5.4 |
| 7.5.6 | Tính chất hai đường thẳng song song | 7.5.4 |
| 7.5.7 | Tam giác cân | 6.6.3 |
| 7.5.8 | Tam giác đều | 7.5.7 |
| 7.5.9 | Định lý Pythagore | 6.6.3 |
| 7.5.10 | Tính diện tích tam giác vuông | 7.5.9 |

### 5.6. Chương: Thống kê

| Skill ID | Skill Name | Prerequisites |
|----------|------------|---------------|
| 7.6.1 | Thu thập và biểu diễn dữ liệu | - |
| 7.6.2 | Tính số trung bình cộng | 6.1.3, 6.1.4 |
| 7.6.3 | Tìm mốt của dấu hiệu | 7.6.1 |
| 7.6.4 | Vẽ biểu đồ | 7.6.1 |

---

## 6. DỮ LIỆU SEED CHO DATABASE (JSON)

```json
[
  {
    "id": "6.1.1",
    "grade": 6,
    "chapter": "Số tự nhiên",
    "name": "Đọc và viết số tự nhiên",
    "prerequisite_ids": []
  },
  {
    "id": "6.1.2",
    "grade": 6,
    "chapter": "Số tự nhiên",
    "name": "So sánh số tự nhiên",
    "prerequisite_ids": ["6.1.1"]
  },
  {
    "id": "6.3.1",
    "grade": 6,
    "chapter": "Phân số",
    "name": "Nhận biết phân số",
    "prerequisite_ids": ["6.1.4"]
  },
  {
    "id": "6.3.9",
    "grade": 6,
    "chapter": "Phân số",
    "name": "Rút gọn phân số",
    "prerequisite_ids": ["6.1.4", "6.3.1"]
  },
  {
    "id": "7.1.1",
    "grade": 7,
    "chapter": "Số hữu tỉ",
    "name": "Nhận biết số hữu tỉ",
    "prerequisite_ids": ["6.3.1"]
  },
  {
    "id": "7.4.1",
    "grade": 7,
    "chapter": "Biểu thức đại số",
    "name": "Nhận biết biểu thức đại số",
    "prerequisite_ids": ["7.1.1"]
  }
]
```

**Lưu ý:** Đây chỉ là ví dụ. Cần tạo đầy đủ JSON cho tất cả skills trong danh sách trên.

---

## 7. QUAN HỆ PREREQUISITE (VISUAL)

```
Lớp 6:
6.1.1 → 6.1.2 → 6.1.3 → 6.1.4 → 6.1.5 → 6.1.6
                    ↓
                  6.1.7 → 6.1.8

6.1.4 → 6.3.1 → 6.3.2 → 6.3.5 → 6.3.6
        ↓
      6.3.4 → 6.3.3
        ↓
      6.3.9

Lớp 7:
6.3.1 → 7.1.1 → 7.1.2 → 7.1.3 → 7.1.4 → 7.1.5 → 7.1.6
        ↓
      7.4.1 → 7.4.2 → 7.4.3 → 7.4.4 → 7.4.5
                    ↓
                  7.4.6 → 7.4.7 → 7.4.8 → 7.4.9
```

---

## 8. GHI CHÚ QUAN TRỌNG

1. **Skill ID format:** `{grade}.{chapter}.{skill_number}`
2. **Prerequisites:** Danh sách skill_id phải đạt mastery ≥ 70 mới được học skill mới
3. **Cross-grade dependencies:** Skills lớp 7 có thể phụ thuộc skills lớp 6
4. **Atomic skills:** Mỗi skill phải có thể đo được bằng bài tập cụ thể
5. **Total skills:** Khoảng 60-80 skills cho cả lớp 6 và 7 (MVP)

---

## 9. TÀI LIỆU LIÊN QUAN

- [Adaptive Learning Logic](../education_logic/adaptive_learning_logic_phase_1-2025-12-15-02-30.md)
- [Database ERD & DDL](../../database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md)
- [Adaptive Learning Engine](../adaptive/adaptive-learning-engine_phase_1-2025-12-15-02-30.md)

---

## 10. LỊCH SỬ THAY ĐỔI

- 2025-12-15-02-30: Tạo mới Skill Graph structure
- 2025-12-15-XX-XX: Bổ sung đầy đủ danh sách skills lớp 6-7



---

---

- ← Quay lại: [Tài liệu tổng quan](../../README.md)