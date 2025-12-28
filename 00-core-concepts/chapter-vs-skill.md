# CHAPTER VS SKILL - PHÂN VAI RÕ RÀNG

← Quay lại: [README.md](../README.md)

## Tổng quan

Hệ thống Tutor sử dụng hai khái niệm cốt lõi để tổ chức nội dung học tập:
- **Chapter**: Trục sư phạm / UX
- **Skill**: Trục AI / luyện tập

Việc phân tách này đảm bảo hệ thống vừa thân thiện với người dùng (theo chương trình học), vừa chính xác trong việc đánh giá và điều chỉnh năng lực học sinh.

## Chapter - Trục Sư phạm / UX

### Định nghĩa
Chapter là đơn vị tổ chức nội dung học tập theo chương trình giáo dục. Ví dụ:
- "Phân số" (lớp 6)
- "Số nguyên" (lớp 7)
- "Biểu thức đại số" (lớp 7)

### Vai trò của Chapter

**1. Điều hướng học tập (Navigation)**
- Học sinh thấy danh sách các Chapter cần học
- Progress tracking theo Chapter (new → in_progress → mastered)
- Báo cáo tiến độ cho phụ huynh theo Chapter

**2. Phạm vi Mini Test**
- Mini Test được tổ chức theo Chapter
- Unlock condition: Hoàn thành ≥10 bài practice trong Chapter
- Kết quả Mini Test được hiển thị theo Chapter

**3. Báo cáo và Progress Tracking**
- Phụ huynh thấy con đang học Chapter nào
- Tiến độ hoàn thành Chapter (0%, 25%, 50%, 100%)
- Báo cáo tuần theo Chapter

### Đặc điểm
- **User-facing**: Hiển thị rõ ràng cho học sinh và phụ huynh
- **Curriculum-aligned**: Theo đúng chương trình giáo dục
- **High-level**: Tổ chức nội dung ở mức độ lớn

## Skill - Trục AI / Luyện tập

### Định nghĩa
Skill là đơn vị năng lực atomic - đơn vị nhỏ nhất để đánh giá và luyện tập. Ví dụ:
- "Cộng trừ phân số cùng mẫu"
- "Nhân chia phân số"
- "Rút gọn biểu thức đại số"

### Vai trò của Skill

**1. Practice (Luyện tập)**
- Mỗi bài practice gắn với một Skill cụ thể
- AI Service sinh bài tập theo Skill và độ khó
- Học sinh luyện tập từng Skill một

**2. Mastery Tracking**
- Mastery được tính theo Skill (0-100)
- Trạng thái Skill: Yếu (<40), Chưa vững (40-69), Đạt (70-89), Thành thạo (≥90)
- Cập nhật mastery sau mỗi lần practice

**3. Adaptive Learning Logic**
- AI chọn Skill cần luyện tập dựa trên mastery
- Kiểm tra prerequisite skills
- Điều chỉnh độ khó theo Skill

**4. Phân tích sai lầm**
- Phân tích kết quả Mini Test theo Skill
- Xác định Skill nào học sinh làm đúng/sai
- Đề xuất luyện tập lại Skill yếu

### Đặc điểm
- **AI-facing**: Dùng cho logic adaptive learning
- **Atomic**: Đơn vị nhỏ nhất, không thể chia nhỏ hơn
- **Technical**: Không hiển thị trực tiếp cho học sinh (trừ khi cần)

## Mối quan hệ Chapter - Skill

### Quan hệ 1:N
- Một Chapter chứa nhiều Skills
- Mỗi Skill thuộc về một Chapter duy nhất
- Skill có `chapter_id` để link với Chapter

### Ví dụ
```
Chapter: "Phân số" (lớp 6)
├── Skill: "So sánh phân số"
├── Skill: "Cộng trừ phân số cùng mẫu"
├── Skill: "Cộng trừ phân số khác mẫu"
├── Skill: "Nhân chia phân số"
└── Skill: "Rút gọn phân số"
```

## Mini Test - Kết hợp Chapter và Skill

### Scope: Theo Chapter
- Mini Test được tổ chức theo Chapter
- Unlock condition: Hoàn thành ≥10 bài practice trong Chapter
- Hiển thị cho học sinh: "Mini Test - Phân số"

### Phân tích: Theo Skill
- Kết quả Mini Test được phân tích chi tiết theo Skill
- Hiển thị: "Bạn làm đúng 3/5 câu về 'Cộng trừ phân số cùng mẫu'"
- Đề xuất: "Cần luyện tập thêm Skill 'Nhân chia phân số'"

### Cấu hình: Ở Chapter level
- Số câu hỏi: 5-7 câu (mặc định 6)
- Thời gian: 10 phút (mặc định)
- Điểm đạt: 70% (mặc định)
- Có thể override ở Chapter level

## Learning Plan - Kết hợp Chapter và Skill

### Recommend Chapter
- AI chọn Chapter cần tập trung
- Dựa trên: Progress, mastery trung bình, thời gian học gần đây

### Recommend Skills trong Chapter
- Sau khi chọn Chapter, AI chọn Skills cụ thể cần luyện tập
- Dựa trên: Mastery của từng Skill, prerequisite, tần suất sai

### Hiển thị cho học sinh
- **Chapter level**: "Hôm nay học Chapter 'Phân số'"
- **Skill level**: "Luyện tập: Cộng trừ phân số cùng mẫu, Nhân chia phân số"

## Tại sao tách Chapter và Skill?

### 1. Tách biệt UX và Logic
- **Chapter**: User-facing, dễ hiểu, theo chương trình
- **Skill**: Technical, chính xác, dùng cho AI

### 2. Linh hoạt trong tổ chức
- Có thể thay đổi cách hiển thị Chapter mà không ảnh hưởng Skill logic
- Có thể thêm/bớt Skill trong Chapter mà không ảnh hưởng UX

### 3. Chính xác trong đánh giá
- Mastery được tính theo Skill (atomic, chính xác)
- Progress được hiển thị theo Chapter (user-friendly)

### 4. Dễ maintain
- Logic AI chỉ cần quan tâm Skill
- UI chỉ cần quan tâm Chapter
- Mapping giữa Chapter và Skill rõ ràng

## Quy tắc sử dụng

### Khi nào dùng Chapter?
- Hiển thị cho học sinh/phụ huynh
- Báo cáo tiến độ
- Tổ chức Mini Test
- Navigation và lộ trình học

### Khi nào dùng Skill?
- Practice và luyện tập
- Tính toán mastery
- Adaptive learning logic
- Phân tích kết quả chi tiết

### Không nên
- ❌ Hiển thị Skill trực tiếp cho học sinh (trừ khi cần thiết)
- ❌ Tính mastery theo Chapter (quá lớn, không chính xác)
- ❌ Tổ chức practice theo Chapter (quá lớn, không tập trung)

---

← Quay lại: [README.md](../README.md)

