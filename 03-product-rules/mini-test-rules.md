# MINI TEST RULES - PRODUCT RULES

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả các quy tắc nghiệp vụ cho Mini Test - bài kiểm tra nhỏ theo Chapter.

Xem thêm: [Mini Test Domain Model](../02-domain-model/mini-test.md)

## Chọn Skills

### Scope: Theo Chapter
- Mini Test được tổ chức theo Chapter (không theo Skill)
- Câu hỏi được chọn từ các Skills trong Chapter
- Phân bổ:
  - **60-70%**: Skills chính trong Chapter
  - **30-40%**: Prerequisite skills (nếu có)

### Logic chọn Skills
```pseudo
function selectSkillsForMiniTest(chapter):
    skills_in_chapter = getSkillsByChapter(chapter)
    prerequisite_skills = getPrerequisiteSkills(skills_in_chapter)
    
    main_skills_count = total_questions * 0.65  // 65%
    prerequisite_count = total_questions * 0.35  // 35%
    
    selected_skills = []
    selected_skills += selectRandomSkills(skills_in_chapter, main_skills_count)
    selected_skills += selectRandomSkills(prerequisite_skills, prerequisite_count)
    
    return selected_skills
```

## Số câu hỏi

### Mặc định: 6 câu
- Mini Test mặc định có 6 câu hỏi
- Có thể config ở Chapter level: `chapter.mini_test_total_questions`
- Range: 5-7 câu

### Override per Chapter
- Chapter khó có thể có 7 câu
- Chapter dễ có thể có 5 câu
- Config: `chapter.mini_test_total_questions`

## Unlock Condition

### Điều kiện mở khóa
- Hoàn thành ≥10 bài practice trong Chapter (mặc định)
- Practice count được đếm từ tất cả Skills trong Chapter
- Config: `chapter.mini_test_required_practice_count`

### Logic kiểm tra
```pseudo
function canUnlockMiniTest(student, chapter):
    practice_count = COUNT(
        practice 
        WHERE practice.student_id = student.id
        AND practice.skill_id IN (
            SELECT id FROM skill WHERE chapter_id = chapter.id
        )
        AND practice.status = 'SUBMITTED'
    )
    
    required_count = chapter.mini_test_required_practice_count ?? 10
    
    return practice_count >= required_count
```

## Scoring

### Tính điểm
- Điểm = (số câu đúng / tổng số câu) * 100
- Ví dụ: 5/6 câu đúng = 83.33%

### Passing Threshold
- Điểm đạt: ≥70% (mặc định)
- Có thể config ở Chapter level: `chapter.mini_test_passing_score`
- Nếu điểm <70%: Đề xuất luyện tập lại

## Ảnh hưởng đến Mastery

### Nếu điểm ≥70% (PASS)
- Tăng mastery cho các Skills làm đúng
- Công thức: `mastery += 5-10` (tùy số câu đúng)
- Cho phép chuyển Chapter tiếp theo

### Nếu điểm <70% (FAIL)
- Giảm mastery cho các Skills làm sai
- Công thức: `mastery -= 5-10` (tùy số câu sai)
- Đề xuất luyện tập lại Skills yếu

Xem chi tiết: [Mastery Calculation](./mastery-calculation.md)

## Time Limit

### Mặc định: 10 phút (600 giây)
- Mini Test mặc định có thời gian 10 phút
- Có thể config ở Chapter level: `chapter.mini_test_time_limit_sec`

### Override per Chapter
- Chapter khó có thể có 15 phút
- Chapter dễ có thể có 5 phút
- Config: `chapter.mini_test_time_limit_sec`

## Phân tích kết quả

### Theo Skill
- Kết quả được phân tích chi tiết theo Skill
- Hiển thị:
  - Skills làm đúng
  - Skills làm sai
  - Số câu đúng/sai cho mỗi Skill

### Ví dụ
```
Mini Test - Phân số
├── Cộng trừ phân số cùng mẫu: 2/2 đúng ✅
├── Nhân chia phân số: 1/2 đúng ⚠️
└── Rút gọn phân số: 0/2 đúng ❌
```

## Business Rules

### 1. One Mini Test per Chapter
- Mỗi học sinh chỉ có thể làm một Mini Test cho mỗi Chapter
- Có thể làm lại nếu điểm <70%

### 2. Unlock Condition
- Phải hoàn thành đủ số practice trong Chapter
- Practice count được đếm từ tất cả Skills trong Chapter

### 3. Question Count Range
- Số câu hỏi: 5-7 (mặc định 6)
- Có thể config ở Chapter level

### 4. Time Limit
- Thời gian làm bài: 5-15 phút (mặc định 10 phút)
- Có thể config ở Chapter level

### 5. Passing Score
- Điểm đạt: 70% (mặc định)
- Có thể config ở Chapter level

## Tài liệu liên quan

- [Mini Test Domain Model](../02-domain-model/mini-test.md)
- [Chapter Domain Model](../02-domain-model/chapter.md)
- [Mastery Calculation](./mastery-calculation.md)
- [Database Schema](../07-architecture-and-data/database-schema.md)

---

← Quay lại: [README.md](../README.md)

