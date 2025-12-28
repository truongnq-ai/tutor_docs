# MASTERY CALCULATION - PRODUCT RULES

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả công thức tính Mastery - mức độ thành thạo của học sinh với một Skill.

Xem thêm: [Skill Domain Model](../02-domain-model/skill.md)

## Định nghĩa

Mastery là mức độ thành thạo của học sinh với một skill, giá trị từ 0-100.

### Trạng thái theo Mastery

| Mastery | Trạng thái | Ý nghĩa |
|---------|-----------|---------|
| < 40 | Yếu | Chưa nắm được kiến thức |
| 40-69 | Chưa vững | Cần luyện tập thêm |
| 70-89 | Đạt | Đã nắm kiến thức |
| ≥ 90 | Thành thạo | Có thể nâng cao |

## Cập nhật Mastery sau Practice

### Trả lời đúng
**Công thức:**
```
mastery += (5 ~ 8) * difficulty_factor
```

**Trong đó:**
- Base increment: 5-8 điểm (random hoặc dựa trên độ khó)
- `difficulty_factor`: 
  - Difficulty 1: 1.0x
  - Difficulty 2: 1.2x
  - Difficulty 3: 1.5x
  - Difficulty 4: 1.8x
  - Difficulty 5: 2.0x

**Ví dụ:**
- Practice đúng, difficulty 2: `mastery += 6 * 1.2 = 7.2`
- Practice đúng, difficulty 5: `mastery += 8 * 2.0 = 16`

### Trả lời sai
**Công thức:**
```
mastery -= (5 ~ 10) * error_penalty
```

**Trong đó:**
- Base decrement: 5-10 điểm (random hoặc dựa trên độ khó)
- `error_penalty`:
  - Làm quá nhanh nhưng sai (đoán mò): 1.5x
  - Làm sai bình thường: 1.0x

**Ví dụ:**
- Practice sai bình thường: `mastery -= 7`
- Practice sai (đoán mò): `mastery -= 10 * 1.5 = 15`

### Làm quá nhanh nhưng sai (Đoán mò)
**Điều kiện:**
- `duration_sec < threshold` (ví dụ: < 10 giây)
- `is_correct = false`

**Penalty:**
- Phạt thêm mastery: `error_penalty = 1.5x`
- Ví dụ: `mastery -= 10 * 1.5 = 15`

## Cập nhật Mastery sau Mini Test

### Nếu điểm ≥70% (PASS)
**Công thức:**
```
for each skill in mini_test:
    if skill.correct_count > 0:
        mastery += (5 ~ 10) * (correct_count / total_count)
```

**Ví dụ:**
- Mini Test: 6 câu, làm đúng 5 câu
- Skill A: 2/2 đúng → `mastery += 8 * (2/2) = 8`
- Skill B: 3/4 đúng → `mastery += 6 * (3/4) = 4.5`

### Nếu điểm <70% (FAIL)
**Công thức:**
```
for each skill in mini_test:
    if skill.correct_count < skill.total_count:
        mastery -= (5 ~ 10) * (wrong_count / total_count)
```

**Ví dụ:**
- Mini Test: 6 câu, làm đúng 3 câu
- Skill A: 1/2 đúng → `mastery -= 7 * (1/2) = 3.5`
- Skill B: 0/4 đúng → `mastery -= 10 * (4/4) = 10`

## Giới hạn (Bounds)

### Mastery không vượt quá 100
```pseudo
if mastery > 100:
    mastery = 100
```

### Mastery không nhỏ hơn 0
```pseudo
if mastery < 0:
    mastery = 0
```

## Decay Factor (Tùy chọn)

### Giảm dần điểm cộng khi đúng nhiều lần liên tiếp
**Công thức:**
```
decay_factor = 1.0 - (streak_correct * 0.1)
if decay_factor < 0.5:
    decay_factor = 0.5  // Minimum 0.5x

mastery += base_increment * decay_factor
```

**Ví dụ:**
- Streak 1: `decay_factor = 0.9` → `mastery += 6 * 0.9 = 5.4`
- Streak 5: `decay_factor = 0.5` → `mastery += 6 * 0.5 = 3.0`

## Sai cùng dạng nhiều lần

### Phạt mạnh hơn nếu sai cùng dạng nhiều lần
**Công thức:**
```
if consecutive_wrong_count >= 3:
    error_penalty = 1.5x
else if consecutive_wrong_count >= 2:
    error_penalty = 1.2x
else:
    error_penalty = 1.0x

mastery -= base_decrement * error_penalty
```

**Ví dụ:**
- Sai lần 1: `mastery -= 7 * 1.0 = 7`
- Sai lần 2: `mastery -= 7 * 1.2 = 8.4`
- Sai lần 3+: `mastery -= 7 * 1.5 = 10.5`

## Ví dụ Tính toán

### Scenario 1: Học sinh mới
```
Initial: mastery = 0

Practice 1: Đúng, difficulty 1
→ mastery = 0 + 5 = 5

Practice 2: Đúng, difficulty 1
→ mastery = 5 + 6 = 11

Practice 3: Sai, difficulty 1
→ mastery = 11 - 7 = 4

Practice 4: Đúng, difficulty 2
→ mastery = 4 + (6 * 1.2) = 11.2

Final: mastery = 11
```

### Scenario 2: Học sinh đã có nền tảng
```
Initial: mastery = 50

Practice 1: Đúng, difficulty 3
→ mastery = 50 + (7 * 1.5) = 60.5

Practice 2: Đúng, difficulty 3
→ mastery = 60.5 + (8 * 1.5) = 72.5

Practice 3: Đúng, difficulty 4
→ mastery = 72.5 + (8 * 1.8) = 86.9

Final: mastery = 87
```

### Scenario 3: Mini Test
```
Initial: mastery = 65

Mini Test: 6 câu, làm đúng 5 câu (83%)
→ PASS (≥70%)

Skill A: 2/2 đúng
→ mastery += 8 * (2/2) = 8

Skill B: 3/4 đúng
→ mastery += 6 * (3/4) = 4.5

Final: mastery = 65 + 8 + 4.5 = 77.5 ≈ 78
```

## Business Rules

### 1. Bounds
- Mastery không thể < 0 hoặc > 100
- Clamp về 0 hoặc 100 nếu vượt quá

### 2. Update Frequency
- Mastery được cập nhật sau mỗi Practice với status = SUBMITTED
- Mastery được cập nhật sau mỗi Mini Test

### 3. Practice Status
- Chỉ Practice với status = SUBMITTED mới tính vào mastery
- Practice với status = CANCELLED không tính vào mastery

### 4. Difficulty Factor
- Practice với difficulty cao hơn có impact lớn hơn
- Đảm bảo học sinh được thử thách phù hợp

## Tài liệu liên quan

- [Skill Domain Model](../02-domain-model/skill.md)
- [Practice Domain Model](../02-domain-model/practice.md)
- [Mini Test Rules](./mini-test-rules.md)
- [Adaptive Learning Logic](../_archive/04-for-developers-old/education-logic/adaptive-learning.md) (deprecated - rules đã được extract vào đây)

---

← Quay lại: [README.md](../README.md)

