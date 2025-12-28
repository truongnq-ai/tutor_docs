
================================================================================
# File: 04-for-developers/education-logic/adaptive-learning.md
================================================================================

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

- [Database ERD & DDL](../database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md)
- [API & Database Mapping](../technical_design/api_db_mapping_phase_1-2025-12-15-00-20.md)
- [Student User Stories](../user_stories/student_user_stories_phase_1-2025-12-14-22-45.md)

---

## 12. LỊCH SỬ THAY ĐỔI

- 2025-12-15-02-30: Tạo mới Adaptive Learning Logic – Phase 1


---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)

================================================================================
# End of: 04-for-developers/education-logic/adaptive-learning.md
================================================================================

================================================================================
# File: 04-for-developers/education-logic/adaptive-engine.md
================================================================================

# Adaptive Learning Engine – StudyMate Tutor AI

## 1. Mục đích tài liệu

Tài liệu này mô tả **logic học tập thích ứng (Adaptive Learning Engine)**
cho hệ thống **StudyMate Tutor AI – Gia sư Toán cá nhân hoá**.

Adaptive Learning Engine chịu trách nhiệm:
- Quyết định học sinh nên học skill nào
- Cá nhân hoá bài tập theo năng lực
- Phát hiện lỗ hổng kiến thức
- Điều phối luồng: Học → Luyện → Kiểm tra → Mở khoá

---


## 2. Phạm vi áp dụng

- Môn học: Toán
- Khối lớp: 6 – 7 (MVP)
- Áp dụng cho:
  - Lộ trình học hằng ngày
  - Luyện tập cá nhân hoá
  - Mini test
  - Báo cáo phụ huynh

---


## 3. Nguyên tắc cốt lõi

### 3.1. Không học nâng cao khi nền tảng yếu

- Học sinh **không được học skill mới**
nếu bất kỳ prerequisite nào có mastery < 70%.

---

### 3.2. Ưu tiên điểm yếu lớn nhất

- Mỗi phiên học chỉ tập trung 1–2 skill yếu nhất
- Tránh học lan man, dàn trải

---

### 3.3. Học phải có kiểm tra

Luồng bắt buộc: Học → Luyện tập → Mini Test → Mở khoá

---

### 3.4. Chống học vẹt

- Đúng nhiều → tăng độ khó
- Sai liên tiếp → giảm độ khó và quay lại nền tảng

---


## 4. Dữ liệu đầu vào (Input Model)

```json
StudentState {
  student_id: string,
  skill_mastery: {
    skill_id: mastery_level (0-100)
  },
  last_practice_at: {
    skill_id: timestamp
  },
  recent_accuracy: percentage,
  avg_time_per_question: seconds,
  streak_correct: number,
  streak_wrong: number
}
```

## 5. Dữ liệu đầu ra (Output)

Adaptive Learning Engine trả về:

- Skill mục tiêu cần học
- Loại hoạt động:
  - Ôn tập
  - Luyện tập
  - Mini test
- Độ khó bài tập
- Gợi ý học tập cho học sinh
- Nhận xét dữ liệu cho báo cáo phụ huynh

## 6. Luồng tổng thể (High-level Flow)

```text
START SESSION
│
├─► Check Review Need
│
├─► Select Target Skill
│
├─► Generate Learning Activity
│
├─► Evaluate Student Result
│
├─► Update Skill Mastery
│
├─► Decision:
│    ├─ Continue Practice
│    ├─ Trigger Mini Test
│    └─ Unlock New Skill
│
END SESSION
```

## 7. Logic chi tiết

### 7.1. Kiểm tra nhu cầu ôn tập (Spaced Repetition)

```pseudo
function needReview(skill_id, student):
    days_since_last = today - last_practice_at[skill_id]

    if days_since_last > 7 and mastery(skill_id) < 85:
        return true

    return false
```

#### Mục tiêu

- Giảm quên kiến thức
- Tăng retention dài hạn

### 7.2. Chọn skill mục tiêu

```pseudo
function selectTargetSkill(student):
    weak_skills = skills where mastery < 70

    if weak_skills not empty:
        return skill with lowest mastery

    next_skill = next skill in curriculum order

    if all prerequisites of next_skill >= 70:
        return next_skill

    return weakest prerequisite
```

### 7.3. Sinh hoạt động học tập

```pseudo
function generateActivity(skill, student):
    if streak_correct >= 5:
        difficulty += 1

    if streak_wrong >= 2:
        difficulty -= 1

    return practice_question(skill, difficulty)
```

### 7.4. Đánh giá kết quả & cập nhật mastery

```pseudo
function updateMastery(skill, result):
    if result.correct:
        mastery += 10 * decay_factor
    else:
        mastery -= 15

    mastery = clamp(0, 100)
```

#### Lưu ý

- Sai cùng dạng nhiều lần bị trừ mạnh hơn
- Đúng nhiều lần liên tiếp giảm dần điểm cộng

### 7.5. Điều kiện kích hoạt Mini Test

```pseudo
function shouldTriggerMiniTest(skill):
    return mastery(skill) >= 80 and practiced_questions >= threshold
```

### 7.6. Logic Mini Test

```pseudo
function miniTest(skill):
    questions = generate 5-7 questions
    include prerequisite skills
    time_limit = fixed

    score = evaluate()

    if score >= 80%:
        pass
    else:
        recommend review weakest skill
```

### 7.7. Điều kiện mở khoá skill mới

```pseudo
function canUnlockNextSkill(skill):
    return mastery(skill) >= 80 and mini_test_passed
```

## 8. Vai trò của AI trong Adaptive Engine

AI KHÔNG quyết định logic học, chỉ:

- Sinh bài tập theo skill & độ khó
- Giải thích lỗi sai
- Viết nhận xét học tập
- Gợi ý bài luyện tương tự

Logic điều phối vẫn là rule-based để:

- Tránh sai lệch
- Đảm bảo kiểm soát chất lượng giáo dục

## 9. Ví dụ luồng thực tế

#### Trường hợp

- Skill: 6.4.2 – Rút gọn phân số
- Mastery: 45%
- Prerequisite: 6.2.3 – Phân tích TSNT (60%)

#### Quyết định

- Không cho học rút gọn phân số
- Quay lại ôn 6.2.3
- Sau khi mastery ≥ 70% → quay lại skill chính

## 10. KPI gắn với Adaptive Learning

| Chỉ số | Mục tiêu |
|--------|----------|
| Hoàn thành session | ≥ 70% |
| Thời gian học/ngày | ≥ 12 phút |
| Retention D7 | ≥ 30% |
| Mastery tăng sau 7 ngày | +15–25 |

## 11. Rủi ro & biện pháp

| Rủi ro | Biện pháp |
|--------|-----------|
| Học sinh học vẹt | Mini test bắt buộc |
| Học sinh nản | Điều chỉnh độ khó |
| AI sinh bài lệch | Skill + rule kiểm soát |
| Học lan man | Chỉ cho học theo engine |

## 12. Trạng thái tài liệu

Tài liệu này là nguồn chuẩn (source of truth) cho:

- Learning Engine
- Adaptive Practice
- Skill Diagnosis
- Báo cáo phụ huynh


---

---

- ← Quay lại: [Tài liệu tổng quan](../../README.md)

================================================================================
# End of: 04-for-developers/education-logic/adaptive-engine.md
================================================================================

================================================================================
# File: 04-for-developers/education-logic/skill-graph.md
================================================================================

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

================================================================================
# End of: 04-for-developers/education-logic/skill-graph.md
================================================================================

================================================================================
# File: 04-for-developers/roadmap/overview.md
================================================================================

# Roadmap Overview

**Project:** Tutor  
**Document type:** Implementation Roadmap - System Overview  
**Audience:** Developers, Project Managers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này cung cấp cái nhìn tổng quan về tiến độ triển khai của toàn bộ hệ thống Tutor, bao gồm status của các modules, timeline, milestones, và dependencies.

---

## 2. MODULE STATUS SUMMARY

| Module | Foundation | Tech Stack | Missing Dependencies | Implementation Status |
|--------|-----------|------------|----------------------|----------------------|
| **tutor-admin-dashboard** | ✅ Complete | ✅ Meets requirements | Firebase Admin SDK, API Client | 🚧 40% |
| **tutor-parent-dashboard** | ✅ Complete | ✅ Meets requirements | Firebase, Phone Auth, OTP Service | 🚧 40% |
| **tutor-core-service** | ✅ Complete | ✅ Meets requirements | SMS Gateway, S3 Integration | 🚧 95% |
| **tutor-ai-service** | ✅ Complete | ✅ Meets requirements | None | ✅ 90% |
| **tutor-student-app** | ✅ Complete | ✅ Meets requirements | None | ✅ 100% |

**Legend:**
- ✅ Complete
- 🚧 In Progress
- 📋 Not Started

**Chi tiết từng module:**
- [Core Service](core-service.md)
- [AI Service](ai-service.md)
- [Admin Dashboard](admin-dashboard.md)
- [Parent Dashboard](parent-dashboard.md)
- [Student App](student-app.md)

---

## 3. IMPLEMENTATION ROADMAP

### Phase 1: Foundation Setup (Week 1-2)

#### Week 1: Infrastructure & Dependencies
- [ ] Setup PostgreSQL database
- [ ] Create Firebase project
- [ ] Configure environment variables for all modules
- [ ] Add missing dependencies to all modules
- [ ] Verify all modules can build/run

#### Week 2: Core Service Foundation
- [x] Add Firebase Admin SDK to Core Service ✅
- [x] Implement Firebase configuration ✅
- [x] Create OTP service structure ✅
- [ ] Setup SMS Gateway abstraction layer
- [x] Implement basic phone authentication ✅

### Phase 2: Authentication (Week 3-4)

#### Week 3: Core Service Authentication
- [x] Implement OTP generation and verification ✅
- [x] Implement phone/password authentication ✅
- [x] Implement OAuth token verification ✅
- [x] Add rate limiting for OTP ✅

#### Week 4: Frontend Authentication
- [ ] Customize Parent Dashboard authentication
- [ ] Add OAuth buttons and flow
- [ ] Customize OTP verification pages
- [ ] Setup API client in Parent Dashboard

### Phase 3: AI Service (Week 5-7) ✅ **COMPLETED**

#### Week 5: Upgrade & OCR ✅
- [x] Upgrade Python to 3.11+ ✅
- [x] Upgrade FastAPI to 0.104+ ✅
- [x] Add PaddleOCR ✅
- [x] Implement OCR service ✅

#### Week 6: Math Solver ✅
- [x] Add SymPy ✅
- [x] Implement math solver service ✅
- [x] Create step-by-step solution generator ✅

#### Week 7: Integration ✅
- [x] Integrate OCR + Math Solver ✅
- [x] Add hint generator (OpenAI) ✅
- [x] Add adaptive learning engine ✅
- [x] Add Redis caching ✅
- [x] Implement all API endpoints ✅
- [x] Setup dependency injection ✅
- [x] Add error handling middleware ✅
- [ ] Test end-to-end flow (pending)

### Phase 4: Student App (Week 8-10)

#### Week 8: Setup & Onboarding
- [ ] Add missing packages
- [ ] Setup API client
- [x] Implement onboarding flow ✅ (13 screens)

#### Week 8-9: Learning Flow ✅ **COMPLETED**
- [x] Implement Today's Learning Plan (Home/Dashboard) ✅
- [x] Implement Practice Question and Result screens ✅
- [x] Implement Practice Session Complete ✅
- [x] Implement Skill Selection, Practice History, Session Resume ✅

#### Week 9-10: Tutor Mode - ✅ **COMPLETED**
- [x] Add missing packages (image_picker, camera, OAuth) ✅
- [x] Setup API client with Retrofit ✅
- [x] Implement camera integration ✅
- [x] Implement image picker ✅
- [x] Implement OCR confirmation ✅
- [x] Implement solution step-by-step display ✅ (with animations)
- [x] Implement solution complete and recent problems ✅ (with skeleton loading)

#### Week 10-11: Progress & Mini Test ✅ **COMPLETED**
- [x] Implement progress dashboard ✅
- [x] Implement skill detail ✅
- [x] Implement mini test flow (start, question, result) ✅
- [x] Implement recommendations ✅

#### Week 11-12: Profile & Settings ✅ **COMPLETED**
- [x] Implement profile overview ✅
- [x] Implement edit profile ✅
- [x] Implement settings ✅
- [x] Implement change password ✅
- [x] Implement about/help ✅

### Phase 5: Parent Dashboard (Week 11-12)

#### Week 11: Dashboard & Reporting
- [ ] Build dashboard overview
- [ ] Build weekly/monthly reports
- [ ] Build weak skills page

#### Week 12: Polish & Testing
- [ ] Add landing page
- [ ] Testing and bug fixes
- [ ] Performance optimization

---

## 4. CROSS-MODULE DEPENDENCIES

### Infrastructure Services

All modules depend on:

1. **PostgreSQL Database**
   - Status: ✅ Docker setup available
   - Action: Start with `docker-compose up -d postgres`

2. **Firebase Authentication**
   - Status: 📋 Needs setup
   - Action: Create Firebase project and configure

3. **Object Storage (S3)**
   - Status: 📋 Needs setup
   - Action: Setup MinIO (dev) or AWS S3 (prod)

### Module Dependencies

- **Frontend modules** (Admin Dashboard, Parent Dashboard, Student App) → **Core Service**
- **Core Service** → **AI Service** (for OCR, solving, hints)
- **Core Service** → **Firebase** (for authentication)
- **All modules** → **PostgreSQL** (for data persistence)

---

## 5. ENVIRONMENT SETUP CHECKLIST

### Development Environment

- [ ] **PostgreSQL**: Running on localhost:5432
- [ ] **Core Service**: Running on localhost:8080
- [ ] **AI Service**: Running on localhost:8001
- [ ] **Parent Dashboard**: Running on localhost:3000
- [ ] **Admin Dashboard**: Running on localhost:3001 (optional)
- [ ] **Student App**: Running on emulator/device

### Environment Variables

Each module needs `.env` or `.env.local` file. See:
- [Environment Configuration Guide](../setup/environment-config.md)

### Firebase Setup

1. Create Firebase project
2. Enable Authentication:
   - Phone authentication
   - Google Sign-In
   - Apple Sign-In
3. Generate service account key
4. Add credentials to Core Service

---

## 6. DEPLOYMENT READINESS

### Current Status

| Component | Local Dev | Docker | Production | Status |
|-----------|----------|--------|------------|--------|
| Core Service | ✅ | ✅ | 📋 | Ready for Docker |
| AI Service | ✅ | ✅ | 📋 | Ready for Docker |
| Parent Dashboard | ✅ | 📋 | 📋 | Needs Dockerfile |
| Admin Dashboard | ✅ | 📋 | 📋 | Needs Dockerfile |
| Student App | ✅ | N/A | 📋 | Needs build config |

### Deployment Tasks

- [ ] Create Dockerfiles for all services
- [ ] Create docker-compose.yml for local development
- [ ] Create docker-compose.prod.yml for production
- [ ] Setup CI/CD pipeline
- [ ] Configure production environment variables
- [ ] Setup monitoring and logging
- [ ] Create deployment scripts

---

## 7. TESTING STRATEGY

### Unit Tests
- [ ] Core Service: Service layer tests
- [ ] AI Service: OCR and solver tests
- [ ] Student App: Widget and unit tests

### Integration Tests
- [ ] API endpoint tests
- [ ] Database integration tests
- [ ] Service-to-service communication tests

### End-to-End Tests
- [ ] Complete user flows
- [ ] Authentication flows
- [ ] Learning flow tests

---

## 8. KNOWN ISSUES & LIMITATIONS

### Current Limitations

1. **AI Service**: ✅ FastAPI and Python versions upgraded
2. **AI Service**: Unit and integration tests pending
3. **AI Service**: API key authentication for internal endpoints pending
4. **Core Service**: SMS Gateway abstraction layer not implemented (Firebase Auth REST API used directly)
5. **All Frontends**: API clients not configured
6. **Student App**: Camera/image picker not integrated

### Technical Debt

- [x] Upgrade AI Service dependencies ✅
- [x] Standardize error handling in AI Service ✅
- [ ] Add comprehensive logging (enhancements needed)
- [ ] Implement monitoring and alerting
- [ ] Add API rate limiting
- [x] Implement caching strategies (Redis) ✅
- [ ] Add unit and integration tests for AI Service

---

## 9. QUICK START COMMANDS

### Start All Services (Development)

```bash
# 1. Start database
docker-compose up -d postgres

# 2. Start Core Service
cd tutor-core-service
mvn spring-boot:run

# 3. Start AI Service (in another terminal)
cd tutor-ai-service
poetry install
poetry run uvicorn src.presentation.main:app --reload --port 8001

# 4. Start Parent Dashboard (in another terminal)
cd tutor-parent-dashboard
npm install
npm run dev

# 5. Start Student App (in another terminal)
cd tutor-student-app
flutter pub get
flutter run
```

---

## 10. NEXT IMMEDIATE ACTIONS

### Priority 1 (This Week)

1. **Setup Firebase Project** ✅
   - Create Firebase project
   - Enable authentication methods
   - Generate service account key
   - Add to Core Service

2. **Add Missing Dependencies**
   - Core Service: Firebase Admin SDK ✅ (Đã thêm)
   - AI Service: Upgrade FastAPI, add OCR/Math libraries ✅ (Đã hoàn thành)
   - Student App: Add image_picker, camera, OAuth packages

3. **Environment Configuration**
   - Create `.env` files for all modules
   - Configure API endpoints
   - Setup database connections

### Priority 2 (Next Week)

1. **Implement OTP Service** (Core Service) ✅ (Đã hoàn thành)
2. **Implement Phone Authentication** (Core Service) ✅ (Đã hoàn thành)
3. **Implement OAuth Providers** (Core Service) ✅ (Đã hoàn thành)
4. **Implement OCR Service** (AI Service) ✅ (Đã hoàn thành)
5. **Implement Math Solver Service** (AI Service) ✅ (Đã hoàn thành)
6. **Implement Hint Generator Service** (AI Service) ✅ (Đã hoàn thành)
7. **Implement Adaptive Learning Service** (AI Service) ✅ (Đã hoàn thành)
8. **Setup API Clients** (All frontends)

### Priority 3 (Following Weeks)

1. **Authentication Flows** (All modules)
2. **Business Logic Implementation**
3. **UI Implementation** (Frontends)

---

## 11. TÀI LIỆU LIÊN QUAN

- [Roadmap README](README.md) - Cấu trúc roadmap
- [Core Service Roadmap](core-service.md) - Chi tiết Core Service
- [AI Service Roadmap](ai-service.md) - Chi tiết AI Service
- [Admin Dashboard Roadmap](admin-dashboard.md) - Chi tiết Admin Dashboard
- [Parent Dashboard Roadmap](parent-dashboard.md) - Chi tiết Parent Dashboard
- [Student App Roadmap](student-app.md) - Chi tiết Student App
- [Development Setup](../setup/development-setup.md) - Hướng dẫn setup
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống

---

**Last Updated**: 2025-12-21 (Updated: Profile & Settings completed - all 5 screens implemented. Student App is now 100% complete with all 38 screens! Backend APIs for profile, settings, and password change are fully implemented)

[← Quay lại Roadmap](README.md)



================================================================================
# End of: 04-for-developers/roadmap/overview.md
================================================================================

================================================================================
# File: 04-for-developers/roadmap/README.md
================================================================================

# Roadmap

**Project:** Tutor  
**Document type:** Roadmap & Implementation Tracking  
**Audience:** Developers, Project Managers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Overview](../../README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này cung cấp cấu trúc và navigation cho roadmap triển khai của hệ thống Tutor. Roadmap được tổ chức theo module để dễ theo dõi tiến độ và cập nhật.

---

## 2. CẤU TRÚC ROADMAP

### 2.1. Tổng quan

- **[Overview](overview.md)** - Tiến độ tổng thể hệ thống, timeline, milestones, và cross-module dependencies

### 2.2. Roadmap theo Module

- **[Core Service](core-service.md)** - Java Spring Boot backend service
- **[AI Service](ai-service.md)** - Python FastAPI AI service
- **[Admin Dashboard](admin-dashboard.md)** - Next.js admin dashboard
- **[Parent Dashboard](parent-dashboard.md)** - Next.js parent dashboard
- **[Student App](student-app.md)** - Flutter mobile application

---

## 3. CÁCH SỬ DỤNG

### 3.1. Xem tiến độ tổng thể

Xem file [overview.md](overview.md) để có cái nhìn tổng quan về:
- Status của tất cả modules
- Timeline và milestones
- Cross-module dependencies
- Implementation roadmap theo phase

### 3.2. Xem tiến độ module cụ thể

Xem file roadmap tương ứng của module để biết:
- Current state và tech stack
- Completed và pending tasks
- Next steps priority
- Dependencies và blockers

### 3.3. Cập nhật roadmap

Khi hoàn thành task hoặc có thay đổi:
1. Cập nhật checklist trong file roadmap của module
2. Cập nhật status trong `overview.md` nếu cần
3. Cập nhật "Last Updated" date

---

## 4. QUY ƯỚC

### 4.1. Status Legend

- ✅ Complete - Đã hoàn thành
- 🚧 In Progress - Đang triển khai
- 📋 Not Started - Chưa bắt đầu

### 4.2. Priority Levels

- **High**: Ưu tiên cao, cần làm ngay
- **Medium**: Ưu tiên trung bình
- **Low**: Ưu tiên thấp, có thể làm sau

### 4.3. Format

- Tasks: Sử dụng checklist `- [ ]` hoặc `- [x]`
- Tables: Format markdown table
- Links: Relative paths

---

## 5. TÀI LIỆU LIÊN QUAN

- [Implementation Status (Archived)](../../_archive/old-versions/implementation-status-2025-12-21.md) - File roadmap cũ (đã archive)
- [Development Setup](../setup/development-setup.md) - Hướng dẫn setup môi trường
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [Project Roadmap](../../../03-for-product-owners/roadmap.md) - Product roadmap

---

[← Quay lại Overview](../../README.md)



================================================================================
# End of: 04-for-developers/roadmap/README.md
================================================================================

================================================================================
# File: 04-for-developers/roadmap/core-service.md
================================================================================

# Core Service Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor Core Service - Java Spring Boot backend service.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | spring-security-jwt template | ✅ |
| **Java** | 17 LTS | ✅ Meets requirement |
| **Spring Boot** | 3.5.8 | ✅ Upgraded from 3.2.5 |
| **Spring Security** | 6.5.4+ | ✅ Auto-managed by Spring Boot |
| **PostgreSQL** | 15+ | ✅ Supported (JDBC Driver: 42.7.8) |
| **JWT** | Configured | ✅ Ready (JJWT 0.12.3) |
| **Liquibase** | 4.31.0+ | ✅ Included (auto-managed) |
| **Swagger/OpenAPI** | 2.8.14 | ✅ Upgraded from 2.2.0 |
| **Firebase Admin SDK** | 9.7.0 | ✅ Upgraded from 9.2.0 |
| **Spring WebFlux** | Included | ✅ For AI Service HTTP client |
| **Cloudinary SDK** | 2.3.2 | ✅ For image storage |

### Missing Dependencies

Add to `pom.xml`:

```xml
<!-- AWS SDK for S3 (Object Storage) -->
<dependency>
    <groupId>software.amazon.awssdk</groupId>
    <artifactId>s3</artifactId>
    <version>2.20.0</version>
</dependency>
```

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Firebase Admin SDK**: Integrated and configured
- ✅ **OTP Service**: Fully implemented with Firebase
- ✅ **Phone-based Authentication**: Customized for phone/password login
- ✅ **OAuth Providers**: Google and Apple OAuth token verification implemented
- ✅ **Rate Limiting**: Implemented for OTP endpoints (3 requests/day per phone)
- ✅ **Refresh Token**: Rotation-based refresh token implementation
- ✅ **Image Upload**: Cloudinary integration for image storage
- ✅ **User Management**: Student, Parent, and Admin user management
- ✅ **AI Service Client**: HTTP client for AI Service communication (WebFlux)
- ✅ **Tutor Mode APIs**: Solve from image/text, Recent problems, Rate limiting
- ✅ **Database Migration**: V14 migration for solve_history schema fix
- ✅ **Mini Test APIs**: Complete mini test flow (start, submit answer, submit test, unlock check)
- ✅ **Progress APIs**: Progress dashboard, skill detail, recommendations
- ✅ **Learning Progress APIs**: Practice sessions, mastery tracking
- ✅ **Learning APIs**: Today's learning plan, weak skills
- ✅ **Practice APIs**: Submit practice, practice history, session management
- ✅ **Profile APIs**: Get/Update profile, Upload avatar
- ✅ **Settings APIs**: Get/Update settings (notifications, learning preferences)
- ✅ **Password Management**: Change password with security validation

### Pending Tasks 📋

- [ ] **SMS Gateway Abstraction**: Create abstraction layer (currently using Firebase directly)
- [ ] **Reporting APIs**: Learning summary, weak skills, progress reports (for parent dashboard)
- [ ] **Object Storage (S3) Integration**: For production image storage

---

## 4. NEXT STEPS PRIORITY

1. **High**: Reporting APIs - Learning summary, weak skills, progress reports (for parent dashboard)
2. **Medium**: SMS Gateway abstraction layer
3. **Low**: Object Storage (S3) integration

---

## 5. DEPENDENCIES

### External Services

- **PostgreSQL**: Database for data persistence
- **Firebase**: Authentication (OTP, OAuth verification)
- **AI Service**: For OCR, math solving, hints, recommendations
- **Object Storage (S3/Cloudinary)**: For image storage

### Module Dependencies

- Frontend modules (Admin Dashboard, Parent Dashboard, Student App) depend on Core Service
- Core Service depends on AI Service for AI capabilities

---

## 6. TIMELINE

### Completed ✅

- Week 2-3: Firebase Admin SDK integration, OTP service, Phone authentication
- Week 3-4: OAuth providers (Google/Apple), Rate limiting
- Week 9-10: AI Service client integration (WebFlux HTTP client)
- Week 9-10: Tutor Mode APIs (solve from image/text, recent problems, rate limiting)
- Week 9-10: Database migration V14 (solve_history schema fix)
- Week 10-11: Mini Test APIs (complete flow: start, submit answer, submit test, unlock check)
- Week 10-11: Progress APIs (dashboard, skill detail, recommendations)
- Week 10-11: Learning Progress APIs (practice sessions, mastery tracking)
- Week 10-11: Learning APIs (today's learning plan, weak skills)
- Week 10-11: Practice APIs (submit practice, practice history, session management)
- Week 11-12: Profile APIs (get/update profile, upload avatar)
- Week 11-12: Settings APIs (get/update settings)
- Week 11-12: Password Management (change password)

### In Progress 🚧

- Week 11-12: Reporting APIs (for parent dashboard)

### Planned 📋

- Week 11-12: Reporting APIs (learning summary, weak skills, progress reports)
- Future: SMS Gateway abstraction, S3 integration

---

## 7. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Core Service README](../../../../tutor-core-service/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints

---

**Last Updated**: 2025-12-21 (Updated: Profile APIs, Settings APIs, and Password Management completed - all backend APIs for student app profile management are ready. Core Service now supports all student app features)

[← Quay lại Roadmap](README.md)



================================================================================
# End of: 04-for-developers/roadmap/core-service.md
================================================================================

================================================================================
# File: 04-for-developers/roadmap/ai-service.md
================================================================================

# AI Service Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor AI Service - Python FastAPI service cho OCR, Math Solver, và Adaptive Learning.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | fastapi-microservice-template | ✅ |
| **Python** | 3.11+ | ✅ Upgraded |
| **FastAPI** | 0.104+ | ✅ Upgraded |
| **Pydantic** | 2.5.0+ | ✅ Upgraded |
| **Pydantic Settings** | 2.1.0+ | ✅ Included |
| **Uvicorn** | 0.24.0+ | ✅ Included |
| **PaddleOCR** | 2.7.0+ | ✅ Implemented |
| **SymPy** | 1.12.0+ | ✅ Implemented |
| **OpenAI SDK** | 1.3.0+ | ✅ Implemented |
| **Pillow** | 10.1.0+ | ✅ Implemented |
| **OpenCV** | 4.8.0+ | ✅ Implemented |
| **Redis** | 5.0.0+ | ✅ For caching |
| **SQLAlchemy** | 2.0.0+ | ✅ Included |
| **Alembic** | 1.12.0+ | ✅ Included |
| **httpx** | 0.25.0+ | ✅ For HTTP client |
| **Architecture** | Clean Architecture + DDD | ✅ |
| **Docker** | Configured | ✅ |
| **Testing** | pytest setup | ✅ |

### Role & API Endpoints

- **Vai trò**: OCR (nhận dạng đề Toán từ ảnh), Math Solver (giải bài từng bước), Hint Generator (gợi ý học tập), Adaptive Logic (đề xuất skill/độ khó)
- **API Endpoints** (Internal, chỉ Core Service gọi):
  - `POST /internal/ai/ocr` - OCR từ imageUrl
  - `POST /internal/ai/solve` - Giải bài Toán (text hoặc imageUrl)
  - `POST /internal/ai/hint` - Sinh gợi ý theo ngữ cảnh
  - `POST /internal/ai/recommend` - Đề xuất skill và độ khó
  - `POST /internal/ai/generate-exercises` - Tạo bài tập tự động
  - `POST /internal/ai/validate-latex` - Validate LaTeX formula
- **Performance Requirements**: OCR <3s, Solver <2s, Hint <5s, Overall <5s

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Python Upgrade**: Upgraded to 3.11+
- ✅ **FastAPI Upgrade**: Upgraded to 0.104+
- ✅ **PaddleOCR**: Added and implemented OCR service
- ✅ **SymPy**: Added and implemented math solver service
- ✅ **Step-by-Step Solution Generator**: Created solution generator
- ✅ **OCR + Math Solver Integration**: Integrated OCR and solver
- ✅ **Hint Generator**: Added hint generator using OpenAI
- ✅ **Adaptive Learning Engine**: Implemented adaptive learning recommendations
- ✅ **Redis Caching**: Added caching for OCR results
- ✅ **API Endpoints**: Implemented all core endpoints (`/internal/ai/ocr`, `/internal/ai/solve`, `/internal/ai/hint`, `/internal/ai/recommend`)
- ✅ **Exercise Generation**: Implemented exercise generation endpoints (`/internal/ai/generate-exercises`, `/internal/ai/validate-latex`)
- ✅ **Dependency Injection**: Setup dependency injection
- ✅ **Error Handling Middleware**: Added error handling middleware

### Pending Tasks 📋

- [ ] **End-to-End Testing**: Test complete flow from OCR to solution
- [ ] **Unit Tests**: Service layer tests for OCR and solver
- [ ] **Integration Tests**: API endpoint tests
- [ ] **API Key Authentication**: Add authentication for internal endpoints
- [ ] **Performance Optimization**: Optimize OCR and solver performance
- [ ] **Comprehensive Logging**: Enhance logging for debugging

---

## 4. NEXT STEPS PRIORITY

1. **High**: End-to-end testing - Test complete flow
2. **Medium**: Unit and integration tests - Service layer and API tests
3. **Medium**: API key authentication - Secure internal endpoints
4. **Low**: Performance optimization - Optimize OCR and solver
5. **Low**: Comprehensive logging - Enhance logging

---

## 5. DEPENDENCIES

### External Services

- **OpenAI API**: For hint generation
- **Redis**: For caching OCR results
- **PostgreSQL**: For data persistence (if needed)

### Module Dependencies

- Core Service depends on AI Service for AI capabilities
- AI Service is called by Core Service only (internal service)

---

## 6. TIMELINE

### Completed ✅

- Week 5: Upgrade Python/FastAPI, Add PaddleOCR, Implement OCR service
- Week 6: Add SymPy, Implement math solver, Create step-by-step solution generator
- Week 7: Integrate OCR + Math Solver, Add hint generator, Add adaptive learning engine, Add Redis caching, Implement all core API endpoints, Setup dependency injection, Add error handling middleware
- Week 8+: Exercise Generation endpoints (generate-exercises, validate-latex)

### Planned 📋

- Week 8-10: End-to-end testing, Unit and integration tests
- Future: API key authentication, Performance optimization

---

## 7. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [AI Service README](../../../../tutor-ai-service/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [Adaptive Learning](../education-logic/adaptive-learning.md) - Logic học tập thích ứng

---

**Last Updated**: 2025-12-21 (Updated: Exercise Generation endpoints added - generate-exercises and validate-latex endpoints are now available)

[← Quay lại Roadmap](README.md)



================================================================================
# End of: 04-for-developers/roadmap/ai-service.md
================================================================================

================================================================================
# File: 04-for-developers/roadmap/student-app.md
================================================================================

# Student App Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor Student App - Flutter mobile application cho học sinh.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | flutter_template (momshaddinury) | ✅ |
| **Flutter** | 3.38.4+ | ✅ Meets requirement |
| **Dart** | 3.10.3+ | ✅ Meets requirement |
| **Riverpod** | 2.5.1 | ✅ State management |
| **go_router** | 17.0.1 | ✅ Navigation |
| **Retrofit** | 4.4.0 | ✅ API client |
| **Dio** | 5.8.0+1 | ✅ HTTP client |
| **SharedPreferences** | 2.3.1 | ✅ Local storage |
| **flutter_localizations** | Latest | ✅ Internationalization |
| **logger** | 2.4.0 | ✅ Logging |
| **Architecture** | Clean Architecture | ✅ |

### Missing Dependencies

Add to `pubspec.yaml`:

```yaml
dependencies:
  # Image/Camera
  image_picker: ^1.0.5
  camera: ^0.10.5+5
  
  # OAuth
  google_sign_in: ^6.2.1
  sign_in_with_apple: ^5.0.0
  
  # Image caching
  cached_network_image: ^3.3.0
```

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Foundation**: Base template setup complete
- ✅ **Tech Stack**: All core dependencies installed
- ✅ **Architecture**: Clean Architecture structure in place
- ✅ **Onboarding Flow**: Implemented onboarding screens (13/13 screens)
  - Splash Screen, Welcome, Trial Start, Auth Entry, Set Username/Password, Manual Signup/Login
  - Select Grade, Select Learning Goal, Trial Status, Trial Expiry/Paywall, OTP Verification, Linking Success
- ✅ **Learning Flow**: Implemented learning flow screens (7/7 screens)
  - Today's Learning Plan (Home/Dashboard), Practice Question, Practice Result
  - Practice Session Complete, Skill Selection, Practice History, Session Resume
- ✅ **Tutor Mode**: Implemented tutor mode screens (7/7 screens)
  - Tutor Mode Entry, Camera Capture, Text Input, OCR Confirmation
  - Solution Step-by-Step (with animations), Solution Complete, Recent Problems List (with skeleton loading)
- ✅ **Progress & Mini Test**: Implemented progress tracking and mini test screens (6/6 screens)
  - Progress Dashboard, Skill Detail, Recommendations
  - Mini Test Start, Mini Test Question, Mini Test Result
- ✅ **Profile & Settings**: Implemented profile management screens (5/5 screens)
  - Profile Overview, Edit Profile, Settings, Change Password, About/Help

### Pending Tasks 📋

- [ ] **Environment Configuration**: Add environment configuration

---

## 4. NEXT STEPS PRIORITY

1. **Medium**: Environment Configuration - Add environment configuration
2. **Low**: Testing and bug fixes
3. **Low**: Performance optimization

---

## 5. DEPENDENCIES

### External Services

- **Core Service**: API backend for all operations
- **Firebase** (optional): For OAuth if needed

### Module Dependencies

- Student App depends on Core Service for all data and operations
- Student App is independent from other frontend modules

---

## 6. TIMELINE

### Completed ✅

- Week 1: Foundation setup, Tech stack installation
- Week 8: Onboarding flow implementation (13 screens)
- Week 8-9: Learning Flow implementation (7 screens)
  - Today's Learning Plan, Practice Question/Result, Session Complete
  - Skill Selection, Practice History, Session Resume
- Week 9-10: Tutor Mode implementation (7 screens) ✅
  - Tutor Mode Entry, Camera Capture, Text Input, OCR Confirmation
  - Solution Step-by-Step (with animations), Solution Complete, Recent Problems List (with skeleton loading)
- Week 10-11: Progress & Mini Test implementation (6 screens) ✅
  - Progress Dashboard, Skill Detail, Recommendations
  - Mini Test Start, Mini Test Question, Mini Test Result

### Completed ✅

- Week 11-12: Profile & Settings implementation (5 screens) ✅
  - Profile Overview, Edit Profile, Settings, Change Password, About/Help

### Planned 📋

- Week 12+: Environment Configuration, Testing, Performance Optimization

---

## 7. SCREEN IMPLEMENTATION STATUS

### Onboarding & Authentication (13/13 screens) ✅

- ✅ Splash Screen
- ✅ Welcome/Introduction
- ✅ Trial Start
- ✅ Auth Entry
- ✅ Set Username/Password (after OAuth)
- ✅ Manual Signup
- ✅ Manual Login
- ✅ Select Grade
- ✅ Select Learning Goal
- ✅ Trial Status
- ✅ Trial Expiry/Paywall
- ✅ OTP Verification
- ✅ Linking Success

### Learning Flow (7/7 screens) ✅

- ✅ Today's Learning Plan (Home/Dashboard)
- ✅ Practice Question
- ✅ Practice Result
- ✅ Practice Session Complete
- ✅ Skill Selection
- ✅ Practice History
- ✅ Session Resume

### Tutor Mode (7/7 screens) ✅ - **COMPLETED**

- ✅ Tutor Mode Entry
- ✅ Camera Capture
- ✅ Text Input
- ✅ OCR Confirmation
- ✅ Solution Step-by-Step (with animations)
- ✅ Solution Complete
- ✅ Recent Problems List (with skeleton loading)

### Progress & Mini Test (6/6 screens) ✅ - **COMPLETED**

- ✅ Progress Dashboard
- ✅ Skill Detail
- ✅ Recommendations
- ✅ Mini Test Start
- ✅ Mini Test Question
- ✅ Mini Test Result

### Profile & Settings (5/5 screens) ✅ - **COMPLETED**

- ✅ Profile Overview
- ✅ Edit Profile
- ✅ Settings
- ✅ Change Password
- ✅ About/Help

**Total**: 38/38 screens completed (100%)

---

## 8. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Student App README](../../../../tutor-student-app/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints
- [Screen Design Prompts](../../../_archive/design-prompts/figma-prompts/student_app/screens_overview.md) - Screen design references

---

**Last Updated**: 2025-12-21 (Updated: Profile & Settings completed - all 5 screens including Profile Overview, Edit Profile, Settings, Change Password, and About/Help. All 38 screens of Student App are now complete!)

[← Quay lại Roadmap](README.md)



================================================================================
# End of: 04-for-developers/roadmap/student-app.md
================================================================================

================================================================================
# File: 04-for-developers/roadmap/parent-dashboard.md
================================================================================

# Parent Dashboard Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor Parent Dashboard - Next.js web dashboard cho phụ huynh.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | TailAdmin Next.js template | ✅ |
| **Next.js** | 16.0.10 | ✅ Meets requirement |
| **React** | 19.2.0 | ✅ Latest |
| **TypeScript** | 5.9.3 | ✅ Meets requirement |
| **Tailwind CSS** | 4.1.17 | ✅ Latest |
| **Charts** | ApexCharts 4.7.0 | ✅ Meets requirement |
| **FullCalendar** | 6.1.19 | ✅ Calendar feature |
| **OTP Page** | Template available | ✅ |

### Missing Dependencies

```bash
# Firebase Admin SDK (for OAuth verification)
npm install firebase-admin

# Firebase Client SDK (for frontend OAuth)
npm install firebase

# API Client setup
# Needs configuration
```

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Foundation**: Base template setup complete
- ✅ **Tech Stack**: All required dependencies installed
- ✅ **OTP Page Template**: OTP verification page template available

### Pending Tasks 📋

- [ ] **Authentication Customization**: Customize login form for phone/password
- [ ] **OAuth Integration**: Add OAuth buttons (Google/Apple)
- [ ] **OAuth Flow**: Implement OAuth flow with phone verification
- [ ] **OTP Verification**: Customize OTP verification page
- [ ] **API Client Setup**: Setup API client for Core Service
- [ ] **Dashboard Overview**: Build dashboard overview page
- [ ] **Reporting Pages**: Build reporting pages (weekly/monthly)
- [ ] **Weak Skills Page**: Build weak skills page
- [ ] **Progress Tracking Page**: Build progress tracking page
- [ ] **Landing Page**: Create landing page

---

## 4. NEXT STEPS PRIORITY

1. **High**: Authentication customization (phone + OAuth)
2. **High**: API client setup
3. **Medium**: Dashboard and reporting pages
4. **Low**: Landing page

---

## 5. DEPENDENCIES

### External Services

- **Core Service**: API backend for all operations
- **Firebase**: For OAuth authentication

### Module Dependencies

- Parent Dashboard depends on Core Service for all data and operations
- Parent Dashboard is independent from other frontend modules

---

## 6. TIMELINE

### Completed ✅

- Week 1: Foundation setup, Tech stack installation

### Planned 📋

- Week 4: Authentication customization, OAuth integration
- Week 11-12: Dashboard overview, Reporting pages, Weak skills page, Progress tracking

---

## 7. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Parent Dashboard README](../../../../tutor-parent-dashboard/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints

---

**Last Updated**: 2025-12-21

[← Quay lại Roadmap](README.md)



================================================================================
# End of: 04-for-developers/roadmap/parent-dashboard.md
================================================================================

================================================================================
# File: 04-for-developers/roadmap/admin-dashboard.md
================================================================================

# Admin Dashboard Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor Admin Dashboard - Next.js web dashboard cho admin quản trị.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | TailAdmin Next.js template | ✅ |
| **Next.js** | 16.0.10 | ✅ Meets requirement |
| **React** | 19.2.0 | ✅ Latest |
| **TypeScript** | 5.9.3 | ✅ Meets requirement |
| **Tailwind CSS** | 4.1.17 | ✅ Latest |
| **Charts** | ApexCharts 4.7.0 | ✅ Meets requirement |

### Missing Dependencies

```bash
# Firebase Admin SDK (if needed for OAuth verification)
npm install firebase-admin

# API Client setup (axios or fetch wrapper)
# Already available in Next.js, needs configuration
```

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Foundation**: Base template setup complete
- ✅ **Tech Stack**: All required dependencies installed

### Pending Tasks 📋

- [ ] **API Client Setup**: Setup API client for Core Service
- [ ] **Authentication Customization**: Customize authentication for admin role
- [ ] **Content Management Features**: Implement content management features
- [ ] **System Monitoring Dashboard**: Build system monitoring dashboard
- [ ] **AI Quality Monitoring Views**: Add AI quality monitoring views

---

## 4. NEXT STEPS PRIORITY

1. **High**: API client setup and Core Service integration
2. **Medium**: Authentication customization
3. **Low**: Admin-specific features (content management, monitoring)

---

## 5. DEPENDENCIES

### External Services

- **Core Service**: API backend for all operations
- **Firebase** (optional): For OAuth verification if needed

### Module Dependencies

- Admin Dashboard depends on Core Service for all data and operations
- Admin Dashboard is independent from other frontend modules

---

## 6. TIMELINE

### Completed ✅

- Week 1: Foundation setup, Tech stack installation

### Planned 📋

- Week 11-12: API client setup, Authentication customization
- Future: Content management, System monitoring, AI quality monitoring

---

## 7. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Admin Dashboard README](../../../../tutor-admin-dashboard/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints

---

**Last Updated**: 2025-12-21

[← Quay lại Roadmap](README.md)



================================================================================
# End of: 04-for-developers/roadmap/admin-dashboard.md
================================================================================
