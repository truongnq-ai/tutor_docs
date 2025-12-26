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
  - Splash Screen, Welcome, Trial Start, Auth Entry, Set Username/Password, Manual Signup/Login
  - Select Grade, Select Learning Goal, Trial Status, Trial Expiry/Paywall, OTP Verification, Linking Success
- ✅ **Learning Flow**: Implemented learning flow screens (7/7 screens)
  - Today's Learning Plan (Home/Dashboard), Practice Question, Practice Result
  - Practice Session Complete, Skill Selection, Practice History, Session Resume
- ✅ **Tutor Mode**: Implemented tutor mode screens (7/7 screens)
  - Tutor Mode Entry, Camera Capture, Text Input, OCR Confirmation
  - Solution Step-by-Step (with animations), Solution Complete, Recent Problems List (with skeleton loading)
- ✅ **Progress & Mini Test**: Implemented progress tracking and mini test screens (6/6 screens)
  - Progress Dashboard, Skill Detail, Recommendations
  - Mini Test Start, Mini Test Question, Mini Test Result
- ✅ **Profile & Settings**: Implemented profile management screens (5/5 screens)
  - Profile Overview, Edit Profile, Settings, Change Password, About/Help

### Pending Tasks 📋

- [ ] **Environment Configuration**: Add environment configuration

---

## 4. NEXT STEPS PRIORITY

1. **Medium**: Environment Configuration - Add environment configuration
2. **Low**: Testing and bug fixes
3. **Low**: Performance optimization

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
- Week 8-9: Learning Flow implementation (7 screens)
  - Today's Learning Plan, Practice Question/Result, Session Complete
  - Skill Selection, Practice History, Session Resume
- Week 9-10: Tutor Mode implementation (7 screens) ✅
  - Tutor Mode Entry, Camera Capture, Text Input, OCR Confirmation
  - Solution Step-by-Step (with animations), Solution Complete, Recent Problems List (with skeleton loading)
- Week 10-11: Progress & Mini Test implementation (6 screens) ✅
  - Progress Dashboard, Skill Detail, Recommendations
  - Mini Test Start, Mini Test Question, Mini Test Result

### Completed ✅

- Week 11-12: Profile & Settings implementation (5 screens) ✅
  - Profile Overview, Edit Profile, Settings, Change Password, About/Help

### Planned 📋

- Week 12+: Environment Configuration, Testing, Performance Optimization

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

### Learning Flow (7/7 screens) ✅

- ✅ Today's Learning Plan (Home/Dashboard)
- ✅ Practice Question
- ✅ Practice Result
- ✅ Practice Session Complete
- ✅ Skill Selection
- ✅ Practice History
- ✅ Session Resume

### Tutor Mode (7/7 screens) ✅ - **COMPLETED**

- ✅ Tutor Mode Entry
- ✅ Camera Capture
- ✅ Text Input
- ✅ OCR Confirmation
- ✅ Solution Step-by-Step (with animations)
- ✅ Solution Complete
- ✅ Recent Problems List (with skeleton loading)

### Progress & Mini Test (6/6 screens) ✅ - **COMPLETED**

- ✅ Progress Dashboard
- ✅ Skill Detail
- ✅ Recommendations
- ✅ Mini Test Start
- ✅ Mini Test Question
- ✅ Mini Test Result

### Profile & Settings (5/5 screens) ✅ - **COMPLETED**

- ✅ Profile Overview
- ✅ Edit Profile
- ✅ Settings
- ✅ Change Password
- ✅ About/Help

**Total**: 38/38 screens completed (100%)

---

## 8. TÀI LIỆU LIÊN QUAN

- [Roadmap Overview](overview.md) - Tiến độ tổng thể
- [Student App README](../../../../tutor-student-app/README.md) - Tài liệu module
- [System Architecture](../architecture/system-architecture.md) - Kiến trúc hệ thống
- [API Specification](../architecture/api-specification.md) - API endpoints
- [Screen Design Prompts](../../../_archive/design-prompts/figma-prompts/student_app/screens_overview.md) - Screen design references

---

**Last Updated**: 2025-12-21 (Updated: Profile & Settings completed - all 5 screens including Profile Overview, Edit Profile, Settings, Change Password, and About/Help. All 38 screens of Student App are now complete!)

[← Quay lại Roadmap](README.md)

