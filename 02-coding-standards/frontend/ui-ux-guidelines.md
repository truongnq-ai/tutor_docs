# UI/UX GUIDELINES - FRONTEND

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả UI/UX guidelines cho frontend - đặc biệt là quy tắc "Chapter show / Skill hide".

## Chapter Show / Skill Hide Rule

### Nguyên tắc
- **Chapter**: Hiển thị cho học sinh/phụ huynh
- **Skill**: KHÔNG hiển thị trực tiếp (trừ khi cần thiết)

### UI Layer
- **Navigation**: Hiển thị Chapters, không hiển thị Skills
- **Progress**: Hiển thị progress theo Chapter
- **Learning Plan**: Hiển thị "Hôm nay học Chapter 'Phân số'", không hiển thị "Skill 6.3.1"

### Exceptions
- **Admin Dashboard**: Có thể hiển thị Skills (technical context)
- **Debug Mode**: Có thể hiển thị Skills (development only)
- **Detailed Analysis**: Khi cần phân tích chi tiết (ví dụ: Mini Test results)

## Chapter Display

### Format
- **Name**: "Phân số", "Số nguyên"
- **Code**: Không hiển thị (chỉ dùng internal)
- **Progress**: "Đã hoàn thành 60%"

### Examples
```dart
// ✅ ĐÚNG: Hiển thị Chapter name
Text("Hôm nay học Chapter '${chapter.name}'")

// ❌ SAI: Hiển thị Chapter code
Text("Hôm nay học Chapter '${chapter.code}'")  // "6.3" - không user-friendly
```

## Skill Display (When Needed)

### Format
- **Name**: "Cộng trừ phân số cùng mẫu"
- **Code**: Không hiển thị
- **Context**: Chỉ hiển thị trong detailed analysis

### Examples
```dart
// ✅ ĐÚNG: Hiển thị Skill name trong context
Text("Bạn làm tốt phần '${skill.name}'")

// ❌ SAI: Hiển thị Skill code
Text("Bạn làm tốt Skill '${skill.code}'")  // "6.3.1" - không user-friendly
```

## Progress Visualization

### Chapter Progress
- **Visual**: Progress bar theo Chapter
- **Text**: "Đã hoàn thành 60% Chapter 'Phân số'"
- **Status**: "Chưa bắt đầu", "Đang học", "Đã hoàn thành"

### Skill Progress (Hidden)
- **Internal**: Tính toán từ Skills
- **Display**: Aggregate thành Chapter progress
- **Not shown**: Không hiển thị progress từng Skill

## Learning Plan Display

### Chapter Level
```dart
// ✅ ĐÚNG
Column(
  children: [
    Text("Hôm nay học Chapter '${plan.recommendedChapter.chapterName}'"),
    Text("Luyện tập: ${plan.recommendedChapter.skills.length} bài"),
  ],
)
```

### Skill Level (Optional Detail)
```dart
// ✅ ĐÚNG: Hiển thị Skills như detail, không phải main focus
ExpansionTile(
  title: Text("Chi tiết"),
  children: plan.recommendedChapter.skills.map((skill) => 
    Text(skill.skillName)
  ).toList(),
)
```

## Mini Test Display

### Chapter Scope
- **Title**: "Mini Test - Phân số"
- **Not**: "Mini Test - Skill 6.3.1"

### Skill Analysis (Results Only)
- **After test**: Hiển thị phân tích theo Skill
- **Format**: "Bạn làm tốt phần 'Cộng trừ phân số', cần cải thiện phần 'Nhân chia phân số'"
- **Not**: "Skill 6.3.1: 2/2 đúng"

## Parent Dashboard

### Chapter Only
- **Weaknesses**: "Con đang yếu ở Chapter 'Phân số'"
- **Not**: "Con đang yếu ở Skill 6.3.1"

### Recommendations
- **Language**: "Nên luyện tập thêm phần 'Phân số'"
- **Not**: "Nên luyện tập thêm Skill 6.3.1"

## Tài liệu liên quan

- [Chapter vs Skill](../../00-core-concepts/chapter-vs-skill.md)
- [Student Learning Experience](../../04-user-experience/student/learning-experience.md)
- [Parent Reporting Experience](../../04-user-experience/parent/reporting-experience.md)

---

← Quay lại: [README.md](../README.md)

