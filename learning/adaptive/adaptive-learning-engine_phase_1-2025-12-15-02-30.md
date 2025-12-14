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