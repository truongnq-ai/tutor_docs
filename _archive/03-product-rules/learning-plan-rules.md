# LEARNING PLAN RULES - PRODUCT RULES

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả các quy tắc nghiệp vụ cho Learning Plan - lộ trình học tập hằng ngày được đề xuất bởi AI Service.

Xem thêm: [Learning Plan Domain Model](../02-domain-model/learning-plan.md)

## AI chọn Chapter như thế nào?

### Input: Student State
```json
{
  "student_id": "uuid",
  "skill_mastery": {
    "skill_id": mastery_level (0-100)
  },
  "last_practice_at": {
    "skill_id": "timestamp"
  },
  "recent_accuracy": 0.75,
  "avg_time_per_question": 45,
  "streak_correct": 3,
  "streak_wrong": 0
}
```

### Process: Scoring Logic

**1. Group Skills by Chapter**
```pseudo
chapters_with_skills = groupByChapter(skill_mastery)
```

**2. Score Each Chapter**
```pseudo
function scoreChapter(chapter, skills_data, student_state):
    // Tính mastery trung bình
    avg_mastery = average(skills_data.mastery)
    
    // Đếm số Skills yếu
    weak_skills_count = count(skills_data.mastery < 70)
    
    // Tính thời gian học gần đây
    days_since_last = daysSinceLastPractice(chapter)
    
    // Tính tần suất sai
    error_rate = calculateErrorRate(chapter)
    
    // Scoring formula
    score = (
        (100 - avg_mastery) * 0.4 +  // Ưu tiên Chapter có mastery thấp
        weak_skills_count * 10 * 0.3 +  // Ưu tiên Chapter có nhiều Skills yếu
        (1 / (days_since_last + 1)) * 20 * 0.2 +  // Ưu tiên Chapter học gần đây
        error_rate * 0.1  // Ưu tiên Chapter có tần suất sai cao
    )
    
    return score
```

**3. Select Best Chapter**
```pseudo
best_chapter = chapter with highest score
```

### Output: Recommended Chapter
- Chapter có score cao nhất
- Đảm bảo phù hợp với năng lực học sinh

## Scoring Logic Chi tiết

### 1. Mastery-based Scoring (40%)
- Ưu tiên Chapter có mastery trung bình thấp
- Formula: `(100 - avg_mastery) * 0.4`
- Ví dụ: avg_mastery = 50 → score = 20

### 2. Weak Skills Count (30%)
- Ưu tiên Chapter có nhiều Skills yếu
- Formula: `weak_skills_count * 10 * 0.3`
- Ví dụ: 5 weak skills → score = 15

### 3. Recency (20%)
- Ưu tiên Chapter học gần đây
- Formula: `(1 / (days_since_last + 1)) * 20 * 0.2`
- Ví dụ: học hôm qua → score = 3.33

### 4. Error Rate (10%)
- Ưu tiên Chapter có tần suất sai cao
- Formula: `error_rate * 0.1`
- Ví dụ: error_rate = 0.3 → score = 0.03

## Recommendation Reason

### Các lý do đề xuất

**1. "Bạn có nhiều Skills yếu trong Chapter này"**
- Điều kiện: weak_skills_count >= 3
- Priority: High

**2. "Đã đến lúc ôn tập lại kiến thức"**
- Điều kiện: days_since_last > 7 và mastery < 85
- Priority: Medium

**3. "Bạn đã sẵn sàng học Chapter tiếp theo"**
- Điều kiện: avg_mastery >= 80 và all prerequisites >= 70
- Priority: High

**4. "Cần củng cố kiến thức nền tảng"**
- Điều kiện: error_rate > 0.4
- Priority: High

## Activity Type Selection

### review
- **Điều kiện**: 
  - Mastery < 85
  - days_since_last > 7
- **Ý nghĩa**: Ôn tập lại Skills đã học

### practice
- **Điều kiện**: 
  - Mastery < 70
  - Hoặc có Skills yếu trong Chapter
- **Ý nghĩa**: Luyện tập Skills mới hoặc Skills yếu

### mini_test
- **Điều kiện**: 
  - Đã hoàn thành ≥10 practice trong Chapter
  - Mastery >= 70
- **Ý nghĩa**: Làm Mini Test để kiểm tra kiến thức

## Skills Selection trong Chapter

### Chọn Skills cần luyện tập
```pseudo
function selectSkillsForLearningPlan(chapter, student_state):
    skills_in_chapter = getSkillsByChapter(chapter)
    
    // Ưu tiên Skills yếu nhất
    weak_skills = filter(skills_in_chapter, mastery < 70)
    weak_skills = sortByMastery(weak_skills, ascending)
    
    // Kiểm tra prerequisite
    selected_skills = []
    for skill in weak_skills:
        if allPrerequisitesMet(skill, student_state):
            selected_skills.append(skill)
        else:
            // Quay về luyện prerequisite
            selected_skills.append(getWeakestPrerequisite(skill))
    
    // Giới hạn số lượng
    return selected_skills[:5]  // Tối đa 5 Skills
```

### Prerequisite Check
- Không recommend Skill nếu prerequisite chưa đạt (mastery < 70)
- Tự động quay về luyện prerequisite nếu cần

## Practice Count & Duration

### Tổng số bài practice: 5-10 bài
- Mỗi Skill: 1-2 bài practice
- Tổng: 5-10 bài cho toàn bộ Learning Plan

### Thời lượng học gợi ý: 15-30 phút
- Mỗi bài practice: 2-3 phút
- Tổng: 15-30 phút cho toàn bộ Learning Plan

## Business Rules

### 1. One Chapter per Day
- Mỗi ngày chỉ recommend một Chapter
- Học sinh tập trung vào một Chapter để tránh học lan man

### 2. Prerequisite Check
- Không recommend Skill nếu prerequisite chưa đạt (mastery < 70)
- Tự động quay về luyện prerequisite nếu cần

### 3. Skills Selection
- Chọn 3-5 Skills trong Chapter cần luyện tập
- Ưu tiên Skills yếu nhất (mastery thấp nhất)

### 4. Practice Count
- Tổng số bài practice: 5-10 bài
- Thời lượng học gợi ý: 15-30 phút

## Tài liệu liên quan

- [Learning Plan Domain Model](../02-domain-model/learning-plan.md)
- [Chapter Domain Model](../02-domain-model/chapter.md)
- [Skill Domain Model](../02-domain-model/skill.md)
- [Adaptive Learning Engine](../_archive/04-for-developers-old/education-logic/adaptive-engine.md) (deprecated - rules đã được extract vào đây)

---

← Quay lại: [README.md](../README.md)

