# FIGMA PROTOTYPE PROMPTS – TUTOR PROJECT

**Project:** Tutor  
**Document type:** Design Prompt Library  
**Audience:** UI/UX Designer, Figma AI  
**Status:** Draft  
**Version:** 2025-12-15-10-18  
**Author:** Education Design Expert

---

## 1. MỤC ĐÍCH TÀI LIỆU

Thư mục này chứa các prompt chuẩn để tạo prototype tĩnh trên Figma cho:
- **Student App** (Mobile - Flutter)
- **Parent Dashboard** (Web - Next.js)

Các prompt được thiết kế để:
- Đảm bảo tính nhất quán trong thiết kế
- Tuân thủ best practices cho ứng dụng giáo dục
- Phù hợp với đối tượng người dùng (học sinh 11-13 tuổi, phụ huynh 35-50 tuổi)

---

## 2. CẤU TRÚC THƯ MỤC

### 2.1. Student App Prompts
- `design_standards_template.md` - **Template chung** cho design standards (accessibility checklist, color/typography quick reference, interaction patterns, component specs, navigation patterns) - **Reference trong tất cả prompts**
- `onboarding_prompts_phase_1-2025-12-15-10-18.md` - Màn hình onboarding, splash, chọn lớp, mục tiêu học tập, auth (Google/Apple/Manual) - **14 màn hình**
- `learning_flow_prompts_phase_1-2025-12-15-10-18.md` - Lộ trình học hằng ngày, luyện tập - **7 màn hình**
- `tutor_mode_prompts_phase_1-2025-12-15-10-18.md` - Giải bài Toán, xem lời giải từng bước - **7 màn hình**
- `progress_prompts_phase_1-2025-12-15-10-18.md` - Theo dõi tiến độ, mastery, mini test - **6 màn hình**
- `profile_prompts_phase_1-2025-12-15-10-18.md` - Hồ sơ, cài đặt, đổi mật khẩu, giới thiệu - **5 màn hình**
- `screens_overview.md` - Tổng quan tất cả màn hình cần thiết kế - **39 màn hình tổng cộng**

### 2.2. Parent Dashboard Prompts
- `authentication_prompts_phase_1-2025-12-15-10-18.md` - Đăng ký, đăng nhập phụ huynh
- `dashboard_prompts_phase_1-2025-12-15-10-18.md` - Dashboard tổng quan, điểm yếu, tiến bộ
- `reporting_prompts_phase_1-2025-12-15-10-18.md` - Báo cáo tuần/tháng, gợi ý cải thiện

---

## 3. CÁCH SỬ DỤNG

1. **Đọc Design Standards Template trước:**
   - Xem file `student_app/design_standards_template.md` để hiểu các tiêu chuẩn thiết kế chung
   - Template này chứa accessibility checklist, color/typography quick reference, interaction patterns, component specs, và navigation patterns
   - Tất cả prompt files đều reference template này để tránh lặp lại

2. **Chọn prompt phù hợp:**
   - Mỗi prompt file có section "DESIGN STANDARDS REFERENCE" ở đầu, link đến template và các tài liệu chi tiết
   - Chọn prompt file theo màn hình cần thiết kế (onboarding, learning flow, tutor mode, progress, profile)

3. **Sử dụng prompt:**
   - Mỗi SCREEN prompt có đầy đủ sections: [CONTEXT], [SCREEN PURPOSE], [DESIGN REQUIREMENTS], [VISUAL GUIDELINES], [SPECIFICATIONS], [CONTENT EXAMPLES], [ACCESSIBILITY], [STATES], [NAVIGATION]
   - Copy prompt vào Figma AI (Figma có hỗ trợ AI generation)
   - Reference template khi cần tra cứu nhanh về design standards

4. **Điều chỉnh và review:**
   - Điều chỉnh prompt nếu cần theo context cụ thể
   - Đảm bảo tuân thủ design standards trong template
   - Review và iterate thiết kế

---

## 4. NGUYÊN TẮC THIẾT KẾ

### 4.1. Student App (Mobile)
- **Màu sắc:** Tươi sáng, thân thiện, không quá chói
- **Typography:** Font lớn, dễ đọc (tối thiểu 14px cho body text)
- **Iconography:** Rõ ràng, đơn giản, phù hợp lứa tuổi
- **Spacing:** Rộng rãi, không chật chội
- **Interaction:** Feedback rõ ràng, animation nhẹ nhàng

### 4.2. Parent Dashboard (Web)
- **Màu sắc:** Chuyên nghiệp, tin cậy
- **Typography:** Dễ đọc, hierarchy rõ ràng
- **Data Visualization:** Biểu đồ đơn giản, dễ hiểu
- **Layout:** Responsive, tối ưu cho desktop và tablet
- **Language:** Ngôn ngữ đơn giản, không thuật ngữ kỹ thuật

---

## 5. TÀI LIỆU THAM KHẢO

### 5.1. Design Standards (Chi tiết)
- [Design Principles](../../04-for-developers/coding-standards/flutter/ui-design-standards/design-principles.md)
- [Color & Typography](../../04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md)
- [Components](../../04-for-developers/coding-standards/flutter/ui-design-standards/components.md)
- [Interaction Patterns](../../04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md)
- [Navigation & Flow](../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md)
- [Accessibility](../../04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md)

### 5.2. Business Requirements
- [User Stories - Student](../../user_stories/student_user_stories_phase_1-2025-12-14-22-45.md)
- [User Stories - Parent](../../user_stories/parent_user_stories_phase_1-2025-12-14-23-05.md)
- [User Onboarding Flow](../../user_flows/user_onboarding_flow_phase_1-2025-12-14-23-40.md)
- [PRD MVP](../../prd/prd_mvp_phase_1-2025-12-14-22-15.md)

---

## 6. LỊCH SỬ THAY ĐỔI

- 2025-12-15-10-18: Tạo mới thư mục và prompt library
- 2025-12-21: Cập nhật - Thêm Splash screen vào onboarding, tạo profile_prompts với 5 màn hình, tạo screens_overview
- 2025-12-21: Cập nhật lớn - Tạo `design_standards_template.md` và cập nhật tất cả prompt files:
  - Thêm section "DESIGN STANDARDS REFERENCE" vào tất cả prompt files
  - Bổ sung [ACCESSIBILITY], [STATES], [NAVIGATION] sections cho tất cả screens
  - Đảm bảo tính nhất quán và đầy đủ thông tin cho designer

