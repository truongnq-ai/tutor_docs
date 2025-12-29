# LEARNING PLAN - DOMAIN MODEL

← Quay lại: [README.md](../README.md)

## Tổng quan

Learning Plan là lộ trình học tập hằng ngày - hệ thống đề xuất Chapter và Skills cần học. Learning Plan được generate bởi AI Service dựa trên mastery, recent accuracy, và prerequisite skills.

## Cấu trúc (Structure)

### RecommendedChapter
Chapter được đề xuất cho học sinh tập trung trong ngày.

**Thuộc tính:**
- **chapterId** (UUID): ID của Chapter được đề xuất
- **chapterName** (String): Tên Chapter
- **chapterCode** (String): Mã Chapter (format: "6.3")
- **difficultyLevel** (Integer): Độ khó (1-5)
- **activityType** (String): Loại hoạt động (review, practice, mini_test)
- **recommendationReason** (String): Lý do đề xuất
- **skills** (List<RecommendedSkill>): Danh sách Skills cần luyện tập trong Chapter

### RecommendedSkill
Skill cụ thể cần luyện tập trong Chapter.

**Thuộc tính:**
- **skillId** (UUID): ID của Skill
- **skillCode** (String): Mã Skill (format: "6.1.1")
- **skillName** (String): Tên Skill
- **prerequisiteSkills** (List<String>): Danh sách mã prerequisite skills

### ProgressSummary
Tóm tắt tiến độ tổng thể của học sinh.

**Thuộc tính:**
- **totalSkills** (Integer): Tổng số Skills
- **masteredSkills** (Integer): Số Skills đã thành thạo (mastery ≥ 90)
- **needsPracticeSkills** (Integer): Số Skills cần luyện tập (mastery < 70)
- **weakSkills** (Integer): Số Skills yếu (mastery < 40)
- **overallMastery** (Double): Mastery trung bình (0-100)

## Logic Recommendation

### AI Service chọn Chapter như thế nào?

**1. Phân tích Skill Mastery**
- Tính mastery trung bình cho mỗi Chapter
- Xác định Chapter có nhiều Skills yếu nhất

**2. Kiểm tra Prerequisite**
- Đảm bảo prerequisite skills đã đạt (mastery ≥ 70)
- Nếu chưa đạt, quay về luyện prerequisite

**3. Scoring Logic**
- Score mỗi Chapter dựa trên:
  - Mastery trung bình
  - Số Skills yếu
  - Thời gian học gần đây
  - Tần suất sai

**4. Chọn Chapter tốt nhất**
- Chọn Chapter có score cao nhất
- Đảm bảo phù hợp với năng lực học sinh

Xem chi tiết: [Learning Plan Rules](../03-product-rules/learning-plan-rules.md)

## Activity Types

### review
- Ôn tập lại Skills đã học
- Điều kiện: Mastery < 85 và không luyện tập trong 7 ngày

### practice
- Luyện tập Skills mới hoặc Skills yếu
- Điều kiện: Mastery < 70

### mini_test
- Làm Mini Test để kiểm tra kiến thức
- Điều kiện: Đã hoàn thành ≥10 practice trong Chapter

## Recommendation Reason

### Các lý do đề xuất phổ biến
- "Bạn có nhiều Skills yếu trong Chapter này"
- "Đã đến lúc ôn tập lại kiến thức"
- "Bạn đã sẵn sàng học Chapter tiếp theo"
- "Cần củng cố kiến thức nền tảng"

## Business Rules

### 1. One Chapter per Day
- Mỗi ngày chỉ recommend một Chapter
- Học sinh tập trung vào một Chapter để tránh học lan man

### 2. Skills Selection
- Chọn 3-5 Skills trong Chapter cần luyện tập
- Ưu tiên Skills yếu nhất (mastery thấp nhất)

### 3. Prerequisite Check
- Không recommend Skill nếu prerequisite chưa đạt (mastery < 70)
- Tự động quay về luyện prerequisite nếu cần

### 4. Practice Count
- Tổng số bài practice: 5-10 bài
- Thời lượng học gợi ý: 15-30 phút

## API Response Example

```json
{
  "recommendedChapter": {
    "chapterId": "01234567-89ab-cdef-0123-456789abcdef",
    "chapterName": "Phân số",
    "chapterCode": "6.3",
    "difficultyLevel": 2,
    "activityType": "practice",
    "recommendationReason": "Bạn có nhiều Skills yếu trong Chapter này",
    "skills": [
      {
        "skillId": "01234567-89ab-cdef-0123-456789abcdef",
        "skillCode": "6.3.1",
        "skillName": "Cộng trừ phân số cùng mẫu",
        "prerequisiteSkills": []
      },
      {
        "skillId": "01234567-89ab-cdef-0123-456789abcdef",
        "skillCode": "6.3.2",
        "skillName": "Nhân chia phân số",
        "prerequisiteSkills": ["6.3.1"]
      }
    ]
  },
  "progressSummary": {
    "totalSkills": 50,
    "masteredSkills": 15,
    "needsPracticeSkills": 20,
    "weakSkills": 10,
    "overallMastery": 65.5
  }
}
```

## Tài liệu liên quan

- [Chapter](./chapter.md)
- [Skill](./skill.md)
- [Learning Plan Rules](../03-product-rules/learning-plan-rules.md)
- [API Contracts - Learning Plan](../08-api-contracts/core-service/learning-plan.md)

---

← Quay lại: [README.md](../README.md)

