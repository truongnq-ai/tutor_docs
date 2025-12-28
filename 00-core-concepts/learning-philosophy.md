# LEARNING PHILOSOPHY - VÌ SAO CHỌN CHAPTER LÀM TRỤC HỌC TẬP

← Quay lại: [README.md](../README.md)

## Tổng quan

Hệ thống Tutor chọn **Chapter** làm trục học tập chính (pedagogical axis) thay vì Skill, dựa trên các nguyên tắc giáo dục và trải nghiệm người dùng.

## Nguyên tắc cốt lõi

### 1. Alignment với Chương trình Giáo dục

**Vấn đề với Skill-centric:**
- Học sinh không biết mình đang học phần nào của chương trình
- Phụ huynh khó hiểu con đang học gì
- Không phù hợp với cách giáo viên dạy và cách học sinh học

**Giải pháp với Chapter:**
- Chapter được tổ chức theo đúng chương trình giáo dục
- Học sinh thấy rõ: "Tôi đang học Phân số"
- Phụ huynh hiểu: "Con đang học Phân số, đã hoàn thành 60%"

### 2. User Experience (UX) Tốt hơn

**Skill-centric gây confusion:**
- Quá nhiều Skills (50-100 skills) → học sinh bối rối
- Không có context về phần học lớn hơn
- Khó theo dõi tiến độ tổng thể

**Chapter-centric rõ ràng:**
- Số lượng Chapter hợp lý (10-15 chapters) → dễ quản lý
- Có context: "Tôi đang học Phân số, trong đó có 5 skills"
- Tiến độ rõ ràng: "Đã hoàn thành 3/10 chapters"

### 3. Progress Tracking Có Ý nghĩa

**Với Skill:**
- Progress: "Đã hoàn thành 15/50 skills" → không có ý nghĩa giáo dục
- Khó hiểu: "Skill 6.3.2" là gì?

**Với Chapter:**
- Progress: "Đã hoàn thành 3/10 chapters" → có ý nghĩa rõ ràng
- Dễ hiểu: "Phân số" là một phần của chương trình

### 4. Báo cáo cho Phụ huynh

**Skill-centric:**
- Báo cáo: "Con đã học 15 skills, mastery trung bình 75%"
- Phụ huynh không hiểu: "15 skills là gì? Con học phần nào?"

**Chapter-centric:**
- Báo cáo: "Con đã hoàn thành 3 chapters: Số tự nhiên, Phân số, Số nguyên"
- Phụ huynh hiểu ngay: "Con đang học đúng chương trình"

### 5. Mini Test Có Ý nghĩa

**Với Skill:**
- Mini Test theo Skill → quá nhỏ, không đánh giá được toàn diện
- Khó hiểu: "Mini Test Skill 6.3.2" là gì?

**Với Chapter:**
- Mini Test theo Chapter → đánh giá toàn diện kiến thức trong Chapter
- Dễ hiểu: "Mini Test - Phân số" → kiểm tra toàn bộ kiến thức về phân số

## Kiến trúc Hybrid: Chapter + Skill

### Chapter làm trục UX
- Hiển thị cho học sinh/phụ huynh
- Navigation và lộ trình
- Progress tracking
- Báo cáo

### Skill làm trục AI
- Practice và luyện tập
- Mastery tracking
- Adaptive learning logic
- Phân tích chi tiết

### Kết hợp
- Learning Plan: Recommend Chapter, nhưng luyện tập theo Skill
- Mini Test: Scope Chapter, nhưng phân tích theo Skill
- Progress: Hiển thị Chapter, nhưng tính toán từ Skill

## So sánh với các hệ thống khác

### Skill-centric (Khan Academy style)
- ✅ Chính xác trong đánh giá
- ❌ Khó hiểu cho người dùng
- ❌ Không phù hợp với chương trình giáo dục Việt Nam

### Chapter-centric (Tutor approach)
- ✅ Dễ hiểu, phù hợp với chương trình
- ✅ UX tốt hơn
- ✅ Báo cáo có ý nghĩa
- ✅ Vẫn chính xác (nhờ Skill làm trục AI)

## Kết luận

Việc chọn Chapter làm trục học tập không phải là trade-off, mà là cách tiếp cận hybrid:
- **Chapter**: Trục sư phạm / UX - thân thiện với người dùng
- **Skill**: Trục AI / luyện tập - chính xác trong đánh giá

Cách tiếp cận này đảm bảo hệ thống vừa thân thiện với người dùng, vừa chính xác trong việc đánh giá và điều chỉnh năng lực học sinh.

---

← Quay lại: [README.md](../README.md)

