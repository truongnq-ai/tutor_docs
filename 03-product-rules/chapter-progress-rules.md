# CHAPTER PROGRESS RULES - PRODUCT RULES

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả các quy tắc nghiệp vụ cho Chapter Progress - trạng thái và tiến độ của Chapter.

Xem thêm: [Chapter Domain Model](../02-domain-model/chapter.md)

## Trạng thái (States)

### 1. NEW

**Điều kiện:**
- Chưa có practice nào trong Chapter
- `practice_count = 0`

**Ý nghĩa:**
- Chapter chưa được bắt đầu
- Học sinh chưa học Chapter này

**Hiển thị:**
- "Chưa bắt đầu"
- Progress: 0%

**Transition:**
- NEW → IN_PROGRESS: Khi có ít nhất 1 practice trong Chapter

### 2. IN_PROGRESS

**Điều kiện:**
- Đã có ít nhất 1 practice trong Chapter
- `practice_count > 0`
- Completion percentage < 100%

**Ý nghĩa:**
- Đang học Chapter này
- Chưa hoàn thành tất cả Skills

**Hiển thị:**
- "Đang học"
- Progress: completion_percentage%

**Transition:**
- IN_PROGRESS → MASTERED: Khi completion_percentage = 100% và đã hoàn thành Mini Test (nếu có)

### 3. MASTERED

**Điều kiện:**
- Completion percentage = 100%
  - Tất cả Skills trong Chapter có mastery ≥ 70
- Đã hoàn thành Mini Test (nếu có)
  - Mini Test score ≥ 70%

**Ý nghĩa:**
- Đã thành thạo Chapter này
- Có thể chuyển sang Chapter tiếp theo

**Hiển thị:**
- "Đã hoàn thành"
- Progress: 100%

**Transition:**
- MASTERED → không thể quay lại (immutable)

## Completion Percentage

### Công thức
```
completion_percentage = (mastered_skills / total_skills) * 100
```

**Trong đó:**
- `mastered_skills`: Số Skills có mastery ≥ 70
- `total_skills`: Tổng số Skills trong Chapter

### Ví dụ
```
Chapter: "Phân số" (6 skills)
├── Skill 1: mastery = 85 ✅ (mastered)
├── Skill 2: mastery = 75 ✅ (mastered)
├── Skill 3: mastery = 65 ❌ (not mastered)
├── Skill 4: mastery = 90 ✅ (mastered)
├── Skill 5: mastery = 55 ❌ (not mastered)
└── Skill 6: mastery = 80 ✅ (mastered)

mastered_skills = 4
total_skills = 6
completion_percentage = (4 / 6) * 100 = 66.67%
```

## Average Mastery

### Công thức
```
average_mastery = sum(skill_mastery) / total_skills
```

**Trong đó:**
- `skill_mastery`: Mastery của từng Skill trong Chapter
- `total_skills`: Tổng số Skills trong Chapter

### Ví dụ
```
Chapter: "Phân số" (6 skills)
├── Skill 1: mastery = 85
├── Skill 2: mastery = 75
├── Skill 3: mastery = 65
├── Skill 4: mastery = 90
├── Skill 5: mastery = 55
└── Skill 6: mastery = 80

average_mastery = (85 + 75 + 65 + 90 + 55 + 80) / 6 = 75
```

## Practice Count

### Đếm Practice trong Chapter
```pseudo
practice_count = COUNT(
    practice 
    WHERE practice.student_id = student_id
    AND practice.skill_id IN (
        SELECT id FROM skill WHERE chapter_id = chapter_id
    )
    AND practice.status = 'SUBMITTED'
)
```

**Lưu ý:**
- Chỉ đếm practice với status = SUBMITTED
- Practice với status = CANCELLED không được đếm
- Practice count dùng để kiểm tra unlock condition cho Mini Test

## Transition Conditions

### NEW → IN_PROGRESS
**Điều kiện:**
- Có ít nhất 1 practice trong Chapter
- `practice_count > 0`

**Trigger:**
- Khi học sinh submit practice đầu tiên trong Chapter

### IN_PROGRESS → MASTERED
**Điều kiện:**
- Completion percentage = 100%
  - Tất cả Skills có mastery ≥ 70
- Đã hoàn thành Mini Test (nếu có)
  - Mini Test score ≥ 70%

**Trigger:**
- Khi completion_percentage đạt 100% và đã hoàn thành Mini Test

### MASTERED → (immutable)
- Trạng thái MASTERED không thể quay lại
- Chapter đã mastered sẽ luôn ở trạng thái MASTERED

## Business Rules

### 1. Progress Calculation
- Progress được tính từ Skills trong Chapter
- Không có progress riêng cho Chapter (chỉ là aggregate)

### 2. Mastery Threshold
- Skill được coi là "mastered" nếu mastery ≥ 70
- Threshold này cố định, không thể config

### 3. Mini Test Requirement
- Chapter có thể được coi là MASTERED mà không cần Mini Test
- Nhưng nếu có Mini Test, phải đạt ≥70% để được coi là MASTERED

### 4. Practice Count
- Practice count được đếm từ tất cả Skills trong Chapter
- Chỉ đếm practice với status = SUBMITTED

## API Response Example

```json
{
  "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
  "chapterName": "Phân số",
  "chapterCode": "6.3",
  "status": "IN_PROGRESS",
  "completionPercentage": 66.67,
  "averageMastery": 75.0,
  "totalSkills": 6,
  "masteredSkills": 4,
  "practiceCount": 15,
  "miniTestCompleted": false
}
```

## Tài liệu liên quan

- [Chapter Domain Model](../02-domain-model/chapter.md)
- [Skill Domain Model](../02-domain-model/skill.md)
- [Mastery Calculation](./mastery-calculation.md)
- [Mini Test Rules](./mini-test-rules.md)

---

← Quay lại: [README.md](../README.md)

