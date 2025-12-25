# Student App Roadmap

**Project:** Tutor  
**Document type:** Implementation Roadmap - Module  
**Audience:** Developers  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** Development Team

[← Quay lại Roadmap](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này theo dõi tiến độ triển khai của Tutor Student App - Flutter mobile application cho học sinh.

---

## 2. CURRENT STATE

### Tech Stack

| Component | Version | Status |
|-----------|---------|--------|
| **Base** | flutter_template (momshaddinury) | ✅ |
| **Flutter** | 3.38.4+ | ✅ Meets requirement |
| **Dart** | 3.10.3+ | ✅ Meets requirement |
| **Riverpod** | 2.5.1 | ✅ State management |
| **go_router** | 17.0.1 | ✅ Navigation |
| **Retrofit** | 4.4.0 | ✅ API client |
| **Dio** | 5.8.0+1 | ✅ HTTP client |
| **SharedPreferences** | 2.3.1 | ✅ Local storage |
| **flutter_localizations** | Latest | ✅ Internationalization |
| **logger** | 2.4.0 | ✅ Logging |
| **Architecture** | Clean Architecture | ✅ |

### Missing Dependencies

Add to `pubspec.yaml`:

```yaml
dependencies:
  # Image/Camera
  image_picker: ^1.0.5
  camera: ^0.10.5+5
  
  # OAuth
  google_sign_in: ^6.2.1
  sign_in_with_apple: ^5.0.0
  
  # Image caching
  cached_network_image: ^3.3.0
```

---

## 3. IMPLEMENTATION STATUS

### Completed Features ✅

- ✅ **Foundation**: Base template setup complete
- ✅ **Tech Stack**: All core dependencies installed
- ✅ **Architecture**: Clean Architecture structure in place
- ✅ **Onboarding Flow**: Implemented onboarding screens (13/13 screens)

### Pending Tasks 📋

- [ ] **Missing Packages**: Add image_picker, camera, OAuth packages
- [ ] **API Client Setup**: Setup API client with Retrofit
- [ ] **Tutor Mode**: Implement tutor mode (camera/image picker)
- [ ] **Solution Display**: Implement solution display
- [ ] **Practice Sessions**: Implement practice sessions
- [ ] **Mini Tests**: Implement mini tests
- [ ] **Progress Tracking**: Implement progress tracking
- [ ] **Environment Configuration**: Add environment configuration

---

## 4. NEXT STEPS PRIORITY

1. **High**: Add missing packages (image_picker, camera, OAuth)
2. **High**: Setup API client
3. **Medium**: Implement Today's Learning Plan (Home/Dashboard)
4. **Medium**: Implement Practice Question and Result screens
5. **Medium**: Implement tutor mode
6. **Low**: Practice and progress tracking

---

## 5. DEPENDENCIES

### External Services

- **Core Service**: API backend for all operations
- **Firebase** (optional): For OAuth if needed

### Module Dependencies

- Student App depends on Core Service for all data and operations
- Student App is independent from other frontend modules

---

## 6. TIMELINE

### Completed ✅

- Week 1: Foundation setup, Tech stack installation
- Week 8: Onboarding flow implementation (13 screens)

### In Progress 🚧

- Week 8-10: Setup & Onboarding (partially complete)

### Planned 📋

- Week 8-9: Add missing packages, Setup API client, Implement Today's Learning Plan
- Week 9: Tutor Mode (camera integration, image picker, solution display)
- Week 10: Practice & Progress (practice sessions, mini tests, progress tracking)

---

## 7. SCREEN IMPLEMENTATION STATUS

### Onboarding & Authentication (13/13 screens) ✅

- ✅ Splash Screen
- ✅ Welcome/Introduction
- ✅ Trial Start
- ✅ Auth Entry
- ✅ Set Username/Password (after OAuth)
- ✅ Manual Signup
- ✅ Manual Login
- ✅ Select Grade
- ✅ Select Learning Goal
- ✅ Trial Status
- ✅ Trial Expiry/Paywall
- ✅ OTP Verification
- ✅ Linking Success

### Learning Flow (0/7 screens) 📋

- [ ] Today's Learning Plan (Home/Dashboard) - **NEXT: Priority High**
- [ ] Practice Question
- [ ] Practice Result
- [ ] Practice Session Complete
- [ ] Skill Selection
- [ ] Practice History
- [ ] Session Resume

### Tutor Mode (0/7 screens) 📋

- [ ] Tutor Mode Entry
- [ ] Camera Capture
- [ ] Text Input
- [ ] OCR Confirmation
- [ ] Solution Step-by-Step
- [ ] Solution Complete
- [ ] Recent Problems List

### Progress & Mini Test (0/6 screens) 📋

- [ ] Progress Dashboard
- [ ] Skill Detail
- [ ] Mini Test Start
- [ ] Mini Test Question
- [ ] Mini Test Result
- [ ] Recommendations

### Profile & Settings (0/5 screens) 📋

- [ ] Profile Overview
- [ ] Edit Profile
- [ ] Settings
- [ ] Change Password
- [ ] About/Help

**Total**: 13/39 screens completed (33%)

---

## 8. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Student App README](../../../../tutor-student-app/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints
- [Screen Design Prompts](../../../_archive/design-prompts/figma-prompts/student_app/screens_overview.md) - Screen design references

---

**Last Updated**: 2025-12-21

[← Quay lại Roadmap](README.md)

