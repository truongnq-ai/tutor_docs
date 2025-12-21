# FIGMA PROTOTYPE IMPLEMENTATION CHECKLIST

**Project:** Tutor  
**Document type:** Implementation Checklist  
**Version:** 2025-12-15-10-18

- ← Quay lại: [Figma Prompt Library](./README.md)

---

## ✅ ĐÃ HOÀN THÀNH

### 📁 Cấu trúc thư mục
- [x] `prompt_figma/` - Thư mục chính
- [x] `student_app/` - Prompts cho mobile app
- [x] `parent_dashboard/` - Prompts cho web dashboard

### 📄 File tài liệu
- [x] `README.md` - Tổng quan và hướng dẫn sử dụng
- [x] `figma_prompt_standard_phase_1-2025-12-15-10-18.md` - Tiêu chuẩn prompt
- [x] `IMPLEMENTATION_CHECKLIST_phase_1-2025-12-15-10-18.md` - File này

### 📱 Student App Prompts
- [x] `onboarding_prompts_phase_1-2025-12-15-10-18.md` - 4 screens (Welcome, Select Grade, Select Goal, Paywall) + auth screens
- [x] `learning_flow_prompts_phase_1-2025-12-15-10-18.md` - 4 screens (Today's Plan, Practice Question, Result, Complete)
- [x] `tutor_mode_prompts_phase_1-2025-12-15-10-18.md` - 5 screens (Entry, Camera, Text Input, Solution, OCR)
- [x] `progress_prompts_phase_1-2025-12-15-10-18.md` - 5 screens (Dashboard, Skill Detail, Test Start, Test Question, Test Result)

**Tổng: 18 screens cho Student App**

### 💻 Parent Dashboard Prompts
- [x] `authentication_prompts_phase_1-2025-12-15-10-18.md` - 5 screens (Landing, Register, Login, Create Profile, Link Token)
- [x] `dashboard_prompts_phase_1-2025-12-15-10-18.md` - 5 screens (Overview, Activity Detail, Weak Skills, Progress, Skill Detail)
- [x] `reporting_prompts_phase_1-2025-12-15-10-18.md` - 4 screens (Weekly Report, Monthly Report, Recommendations, Email Preview)

**Tổng: 14 screens cho Parent Dashboard**

---

## 📋 TỔNG KẾT

### Tổng số screens: **32 screens**

### Student App: 18 screens
- Onboarding: 4 screens
- Learning Flow: 4 screens
- Tutor Mode: 5 screens
- Progress: 5 screens

### Parent Dashboard: 14 screens
- Authentication: 5 screens
- Dashboard: 5 screens
- Reporting: 4 screens

---

## 🚀 CÁCH SỬ DỤNG

### Bước 1: Đọc tài liệu chuẩn
1. Đọc `README.md` để hiểu tổng quan
2. Đọc `figma_prompt_standard.md` để hiểu cấu trúc prompt

### Bước 2: Chọn screen cần thiết kế
1. Mở file prompt tương ứng (ví dụ: `onboarding_prompts.md`)
2. Tìm screen cần thiết kế
3. Copy prompt vào Figma AI

### Bước 3: Tạo prototype trên Figma
1. Sử dụng Figma AI với prompt đã copy
2. Điều chỉnh nếu cần theo context cụ thể
3. Review và iterate

### Bước 4: Test với người dùng
1. Tạo prototype tĩnh (không cần interactive)
2. Test với 3-5 học sinh (cho app)
3. Test với 5-10 phụ huynh (cho dashboard)
4. Thu thập feedback và cập nhật

---

## 📝 LƯU Ý KHI THIẾT KẾ

### Student App (Mobile)
- ✅ Màu sắc tươi sáng, thân thiện
- ✅ Font lớn, dễ đọc (tối thiểu 14px)
- ✅ Spacing rộng rãi
- ✅ Touch targets ≥ 44x44px
- ✅ Feedback rõ ràng cho mọi interaction

### Parent Dashboard (Web)
- ✅ Ngôn ngữ đơn giản, không technical
- ✅ Charts đơn giản, dễ hiểu
- ✅ Responsive (Desktop + Tablet)
- ✅ Color coding consistent
- ✅ Data visualization clear

---

## 🎯 ƯU TIÊN THIẾT KẾ

### Phase 1: MVP Core Screens (Ưu tiên cao)
**Student App:**
1. Welcome / Introduction
2. Select Grade
3. Today's Learning Plan
4. Practice Question
5. Practice Result
6. Tutor Mode Entry
7. Camera Capture
8. Solution Step-by-Step

**Parent Dashboard:**
1. Landing Page
2. Register / Login
3. Dashboard Overview
4. Weak Skills
5. Weekly Report

### Phase 2: Secondary Screens (Ưu tiên trung bình)
- Các screens còn lại trong onboarding
- Progress tracking screens
- Detailed reports

---

## 📊 METRICS CẦN THEO DÕI KHI TEST

### Student App
- [ ] Thời gian hoàn thành onboarding (mục tiêu: < 2 phút)
- [ ] Tỉ lệ bỏ qua onboarding (mục tiêu: < 10%)
- [ ] Dễ dàng tìm được chức năng giải bài (mục tiêu: 100%)
- [ ] Hiểu được lời giải từng bước (mục tiêu: ≥ 80%)

### Parent Dashboard
- [ ] Thời gian hiểu được dashboard (mục tiêu: < 1 phút)
- [ ] Tỉ lệ phụ huynh hiểu được báo cáo (mục tiêu: ≥ 90%)
- [ ] Dễ dàng tìm được điểm yếu của con (mục tiêu: 100%)
- [ ] Mức độ hài lòng với gợi ý (mục tiêu: ≥ 70%)

---

## 🔄 ITERATION PLAN

1. **Week 1-2:** Tạo prototype cho Phase 1 screens
2. **Week 3:** Test với người dùng thật
3. **Week 4:** Cập nhật dựa trên feedback
4. **Week 5:** Tạo prototype cho Phase 2 screens
5. **Week 6:** Final review và handoff cho dev

---

## 📚 TÀI LIỆU THAM KHẢO

- [User Stories - Student](../../user_stories/student_user_stories_phase_1-2025-12-14-22-45.md)
- [User Stories - Parent](../../user_stories/parent_user_stories_phase_1-2025-12-14-23-05.md)
- [User Onboarding Flow](../../user_flows/user_onboarding_flow_phase_1-2025-12-14-23-40.md)
- [PRD MVP](../../prd/prd_mvp_phase_1-2025-12-14-22-15.md)

---

- ← Quay lại: [Figma Prompt Library](./README.md)
## ✅ NEXT STEPS

1. [ ] Review tất cả prompts với team
2. [ ] Bắt đầu tạo prototype trên Figma
3. [ ] Test với người dùng thật
4. [ ] Cập nhật prompts dựa trên feedback
5. [ ] Handoff cho development team

---

**Last Updated:** 2025-12-15-10-18

