# DESIGN STANDARDS TEMPLATE - STUDENT APP

**Project:** Tutor  
**Document type:** Design Standards Quick Reference  
**Platform:** Mobile App (Flutter)  
**Version:** 2025-12-21

- ← Quay lại: [Figma Prompt Library](../README.md)

---

## Mục đích

Template này cung cấp checklist và quick reference cho các tiêu chuẩn thiết kế chung, được reference trong tất cả các prompt files để tránh lặp lại và đảm bảo tính nhất quán.

**Lưu ý:** Xem các file chi tiết trong `../../04-for-developers/coding-standards/flutter/ui-design-standards/` để biết thêm thông tin đầy đủ.

---

## QUICK REFERENCE FOR FIGMA AI

**Cách sử dụng:** Copy section này vào đầu mỗi Figma AI prompt khi gen screen.

### Colors
- **Primary:** `#4CAF50` (Green - Main actions, success states)
- **Secondary:** `#2196F3` (Blue - Information, links)
- **Accent:** `#FF9800` (Orange - Warnings, highlights, streaks)
- **Error:** `#F44336` (Red - Errors, destructive actions)
- **Success:** `#4CAF50` (Green - Success states)
- **Background:** `#F5F5F5` (Light Gray - Screen background)
- **Surface:** `#FFFFFF` (White - Card, container background)
- **Text Primary:** `#212121` (Dark Gray - Main text, headings)
- **Text Secondary:** `#757575` (Medium Gray - Secondary text, captions)
- **Border:** `#E0E0E0` (Light Gray - Borders, dividers)
- **Disabled:** `#BDBDBD` (Gray - Disabled states)

### Typography Scale
- **Heading 1:** 24px, Bold (700), Line-height 32px (Main page titles)
- **Heading 2:** 20px, Semi-bold (600), Line-height 28px (Section titles)
- **Heading 3:** 18px, Semi-bold (600), Line-height 24px (Subsection titles)
- **Body:** 16px, Regular (400), Line-height 24px (Default text, paragraphs)
- **Body Small:** 14px, Regular (400), Line-height 20px (Secondary text, captions)
- **Caption:** 12px, Regular (400), Line-height 16px (Labels, metadata)

**Lưu ý:** 
- Font size tối thiểu **14px** cho body text
- Font size tối thiểu **12px** cho caption
- Sử dụng system default fonts (San Francisco trên iOS, Roboto trên Android)

### Spacing Scale
- **XS:** 4px (Tight spacing, icon padding)
- **S:** 8px (Default spacing, button padding)
- **M:** 16px (Section spacing, card padding)
- **L:** 24px (Large spacing, screen margins)
- **XL:** 32px (Extra large spacing, section gaps)
- **XXL:** 48px (Screen-level spacing)

### Touch Targets
- **Minimum size:** 44x44px
- **Button height:** ≥ 44px
- **Spacing between targets:** ≥ 8px

### Component Specs
- **Primary Button:** Height ≥ 44px, Padding 16px H/12px V, Border-radius 8px, Shadow elevation 2
- **Secondary Button:** Height ≥ 44px, Padding 16px H/12px V, Border-radius 8px, No shadow
- **Text Input:** Height 48px, Padding 12px H/14px V, Border-radius 8px, Border 1px #E0E0E0
- **Card:** Padding 16px, Border-radius 12px, Shadow elevation 1

### Animation Guidelines
- **Quick feedback:** 100-200ms (button press, hover)
- **Standard transitions:** 200-300ms (page transitions, card animations)
- **Complex animations:** 300-500ms (modal, drawer)
- **Easing:** easeOut (enter), easeIn (exit), easeInOut (standard)

### Accessibility
- **Contrast ratio:** ≥ 4.5:1 cho normal text, ≥ 3:1 cho large text (≥18px)
- **Touch targets:** ≥ 44x44px
- **Focus states:** Rõ ràng, visible
- **Screen reader:** Semantic labels cho tất cả interactive elements

---

## 1. ACCESSIBILITY CHECKLIST

### Touch Targets
- [ ] Tất cả interactive elements ≥ **44x44px**
- [ ] Spacing ≥ **8px** giữa các touch targets
- [ ] Buttons có minimum height **44px**

### Screen Reader
- [ ] Mọi button có semantic label (từ text hoặc explicit Semantics widget)
- [ ] Mọi image có alt text (semanticLabel)
- [ ] Form fields có labels (labelText trong InputDecoration)
- [ ] Test với TalkBack (Android) / VoiceOver (iOS)

### Visual Accessibility
- [ ] Contrast ratio ≥ **4.5:1** cho normal text
- [ ] Contrast ratio ≥ **3:1** cho large text (≥18px)
- [ ] Support font scaling (không hardcode font sizes)
- [ ] Support high contrast mode (sử dụng theme colors)
- [ ] Không chỉ dùng màu để truyền đạt thông tin (kết hợp với icon/text)

### Keyboard Navigation
- [ ] Focus states rõ ràng, visible
- [ ] Tab order logical (từ trên xuống, trái sang phải)
- [ ] Tất cả interactive elements có thể access bằng keyboard

### Motion
- [ ] Respect reduced motion preference (check `MediaQuery.disableAnimations`)
- [ ] Animation duration: 200-300ms (standard), 0ms (reduced motion)

**Chi tiết:** [Accessibility Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md)

---

## 2. COLOR & TYPOGRAPHY QUICK REFERENCE

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#4CAF50` | Main actions, success states, positive feedback |
| Secondary | `#2196F3` | Information, links, secondary actions |
| Accent | `#FF9800` | Warnings, highlights, streaks, achievements |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#4CAF50` | Correct answers, completed tasks |
| Error | `#F44336` | Wrong answers, errors, destructive actions |
| Warning | `#FF9800` | Warnings, attention needed |
| Info | `#2196F3` | Information, tips |

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#F5F5F5` | Screen background |
| Surface | `#FFFFFF` | Card, container background |
| Text Primary | `#212121` | Main text, headings |
| Text Secondary | `#757575` | Secondary text, captions |
| Border | `#E0E0E0` | Borders, dividers |
| Disabled | `#BDBDBD` | Disabled states |

### Typography Scale

| Style | Size | Weight | Usage | Line Height |
|-------|------|--------|-------|-------------|
| Heading 1 | 24px | Bold (700) | Main page titles | 32px |
| Heading 2 | 20px | Semi-bold (600) | Section titles | 28px |
| Heading 3 | 18px | Semi-bold (600) | Subsection titles | 24px |
| Body | 16px | Regular (400) | Default text, paragraphs | 24px |
| Body Small | 14px | Regular (400) | Secondary text, captions | 20px |
| Caption | 12px | Regular (400) | Labels, metadata | 16px |

**Lưu ý:** 
- Font size tối thiểu **14px** cho body text
- Font size tối thiểu **12px** cho caption
- Sử dụng system default fonts (San Francisco trên iOS, Roboto trên Android)

**Chi tiết:** [Color & Typography Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md)

---

## 3. INTERACTION PATTERNS REFERENCE

### Button States

| State | Visual | Duration |
|-------|-------|----------|
| Default | Primary color background (#4CAF50) | - |
| Pressed | Scale down (0.95) hoặc darker shade (80% opacity) | 100-200ms |
| Disabled | Grey (#BDBDBD), không clickable | - |
| Loading | Show spinner, disable interaction | - |

### Feedback Patterns

| Type | Color | Pattern |
|------|-------|---------|
| Success | Green (#4CAF50) | Toast message (2-3s), checkmark animation, haptic feedback |
| Error | Red (#F44336) | Error message, red border, error icon, "Thử lại" button |
| Loading | - | Circular progress (không rõ duration) hoặc Linear progress (có duration) |

### Animation Guidelines

- **Quick feedback**: 100-200ms (button press, hover)
- **Standard transitions**: 200-300ms (page transitions, card animations)
- **Complex animations**: 300-500ms (modal, drawer)
- **Easing**: `Curves.easeInOut` (standard), `Curves.easeOut` (enter), `Curves.easeIn` (exit)

**Chi tiết:** [Interaction Patterns](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md)

---

## 4. COMPONENT SPECS QUICK REFERENCE

### Buttons

| Type | Height | Padding | Border Radius | Shadow |
|------|--------|---------|---------------|--------|
| Primary | ≥ 44px | 16px H, 12px V | 8px | Elevation 2 |
| Secondary | ≥ 44px | 16px H, 12px V | 8px | No shadow |
| Text | ≥ 44px | 8px H, 8px V | - | No shadow |
| Icon | 44x44px | - | 8px (nếu có background) | - |

### Cards

| Type | Padding | Border Radius | Shadow |
|------|---------|---------------|--------|
| Learning Card | 16px | 12px | Elevation 1 |
| Skill Card | 16px | 8px | - |
| Practice Card | 20px | 12px | - |

### Input Fields

| Type | Height | Padding | Border Radius | Border |
|------|--------|---------|---------------|--------|
| Text Input | 48px | 12px H, 14px V | 8px | 1px #E0E0E0 |
| Number Input | 48px | 12px H, 14px V | 8px | 1px #E0E0E0 |

**States:**
- Default: Grey border (#E0E0E0)
- Focused: Primary color border (#4CAF50), 2px
- Error: Red border (#F44336), error message below
- Disabled: Grey background (#F5F5F5), grey text

### Progress Indicators

| Type | Size/Height | Stroke/Width | Color |
|------|-------------|--------------|-------|
| Linear | 4px hoặc 8px | - | #4CAF50 |
| Circular | 80px (default) | 8px | #4CAF50 |

**Chi tiết:** [Components Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/components.md)

---

## 5. NAVIGATION PATTERNS

### Bottom Navigation
- **Items**: 4-5 items maximum
- **Format**: Icons + labels
- **Active state**: Color change (primary color)
- **Sections**: Home, Practice, Tutor, Progress, Profile

### AppBar Navigation
- **Back button**: Luôn hiển thị khi có thể back
- **Title**: Rõ ràng, mô tả màn hình hiện tại
- **Actions**: Tối đa 2-3 actions (ví dụ: Search, Settings)

### Deep Linking
- **Format**: `/feature/screen/id`
- **Examples**: 
  - `/practice/question/123`
  - `/progress/skill/fractions`
  - `/tutor/solve`

**Chi tiết:** [Navigation & Flow Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md)

---

## 6. SPACING SCALE

| Size | Value | Usage |
|------|-------|-------|
| XS | 4px | Tight spacing, icon padding |
| S | 8px | Default spacing, button padding |
| M | 16px | Section spacing, card padding |
| L | 24px | Large spacing, screen margins |
| XL | 32px | Extra large spacing, section gaps |
| XXL | 48px | Screen-level spacing |

---

## 7. MICROCOPY GUIDELINES

### Tone of Voice
- **Thân thiện, khuyến khích, dễ hiểu**
- Formal → Friendly: "Vui lòng nhập" → "Hãy nhập"
- Technical → Simple: "Validation failed" → "Vui lòng kiểm tra lại"
- Negative → Positive: "Bạn đã sai" → "Hãy thử lại nhé!"

### Button Labels
- **Action-oriented, rõ ràng**
- Good: "Bắt đầu học", "Nộp bài", "Xem kết quả", "Thử lại"
- Bad: "Submit", "OK", "Click here", "Continue"

### Error Messages
- **Dễ hiểu, có hướng dẫn sửa lỗi**
- Good: "Vui lòng nhập tên học sinh", "Không thể kết nối. Vui lòng kiểm tra internet và thử lại."
- Bad: "Error 500", "Validation failed", "Invalid input"

### Success Messages
- **Tích cực, khuyến khích**
- Good: "Đã lưu tiến độ!", "Làm tốt lắm! Bạn đã hoàn thành 5/10 câu."
- Bad: "Success", "Saved", "OK"

**Chi tiết:** [Navigation & Flow Standards](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md) (phần Microcopy Guidelines)

---

## 8. CODE GENERATION STANDARDS

### Framework & Architecture
- **Target Framework:** Flutter 3.16+ / Dart 3.2+
- **State Management:** Riverpod 2.5.1
- **Navigation:** go_router 17.0.1
- **Architecture Pattern:** Clean Architecture
- **File Structure:** `lib/src/presentation/features/{feature_name}/view/{screen_name}_page.dart`

### Widget Types
- **StatelessWidget:** Cho screens không cần state management
- **ConsumerWidget:** Cho screens cần đọc Riverpod providers (không modify state)
- **ConsumerStatefulWidget:** Cho screens cần modify state hoặc lifecycle methods (initState, dispose)

### Code Style
- **Colors:** `Color(0xFF4CAF50)` format, không dùng hex string
- **Spacing:** `SizedBox(height: 24)` hoặc `Padding(padding: EdgeInsets.all(16))`
- **Typography:** `TextStyle(fontSize: 24, fontWeight: FontWeight.bold)`
- **Theme:** Sử dụng `context.color`, `context.textStyle`, `context.spacing` từ theme extensions
- **Assets:** `assets/images/...` hoặc `assets/icons/...` (không hardcode paths)
- **Imports:** Sử dụng relative imports cho internal files, absolute imports cho packages

### Animation
- **Controller:** `AnimationController` với `SingleTickerProviderStateMixin`
- **Duration:** 200-400ms cho standard animations, 0ms nếu reduced motion
- **Curves:** `Curves.easeOut` cho most animations, `Curves.easeInOut` cho standard
- **Dispose:** Luôn dispose `AnimationController` trong `dispose()` method
- **Example:**
  ```dart
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );
    _controller.forward();
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  ```

### Navigation
- **Router:** go_router với `context.go()` hoặc `context.push()`
- **Routes:** Sử dụng `Routes` constants từ `routes.dart`
- **Deep Links:** Hỗ trợ deep linking nếu được chỉ định trong prompt
- **Example:**
  ```dart
  context.go(Routes.welcome);
  context.push(Routes.onboarding);
  ```

### Error Handling
- **Network Timeout:** Tất cả network calls phải có timeout (default: 10 giây)
- **Error Messages:** User-friendly, không technical jargon
- **Retry:** Cung cấp retry mechanism cho critical operations
- **Offline:** Graceful degradation khi không có network
- **Try-Catch:** Proper error handling với try-catch blocks
- **Example:**
  ```dart
  try {
    await someNetworkCall();
  } catch (e) {
    // Show user-friendly error message
    showErrorSnackBar('Không thể kết nối. Vui lòng thử lại.');
  }
  ```

### Accessibility
- **Semantics:** Sử dụng `Semantics` widget cho screen readers
- **Labels:** Tất cả interactive elements phải có semantic labels
- **Focus:** Proper focus management cho keyboard navigation
- **Contrast:** Đảm bảo contrast ratio ≥ 4.5:1
- **Example:**
  ```dart
  Semantics(
    label: 'Tutor logo',
    child: Image.asset('assets/images/logo.png'),
  )
  ```

### Performance
- **Dispose:** Proper dispose() cho controllers, timers, streams
- **Memory:** Tránh memory leaks, sử dụng `const` constructors khi có thể
- **Rebuild:** Minimize rebuilds, sử dụng `ConsumerWidget.select()` khi có thể
- **Example:**
  ```dart
  // Good: const constructor
  const Text('Hello');
  
  // Good: select specific provider
  final value = ref.watch(someProvider.select((v) => v.specificField));
  ```

---

## 9. ERROR HANDLING STANDARDS

### Network Error Handling
- **Timeout:** Tất cả network calls phải có timeout (default: 10 giây)
- **Retry Logic:** Cung cấp retry mechanism cho critical operations (max 3 lần)
- **Offline Detection:** Kiểm tra network connectivity trước khi thực hiện network calls
- **Fallback:** Graceful degradation khi không có network (ví dụ: hiển thị cached data)

### Error Message Guidelines
- **User-Friendly:** Không dùng technical jargon
- **Actionable:** Cung cấp hướng dẫn sửa lỗi hoặc action để thử lại
- **Positive Tone:** Tránh negative language, dùng positive/encouraging tone
- **Examples:**
  - ✅ Good: "Không thể kết nối. Vui lòng kiểm tra internet và thử lại."
  - ❌ Bad: "NetworkError: Connection timeout"

### Error States UI
- **Visual Feedback:** Red border (#F44336) cho input errors, error icon
- **Error Message Position:** Hiển thị error message dưới input field hoặc trong alert dialog
- **Retry Button:** Cung cấp nút "Thử lại" cho network errors
- **Loading State:** Hiển thị loading indicator khi đang retry

### Timeout Handling
- **Splash Screen:** Nếu network error, vẫn chuyển sang màn hình tiếp theo sau timeout (3 giây)
- **API Calls:** Hiển thị timeout error sau 10 giây, cung cấp retry option
- **Image Loading:** Hiển thị placeholder hoặc error icon nếu image load timeout

### Error Logging
- **Development:** Log full error details trong development mode
- **Production:** Log error type và context (không log sensitive data)
- **User Feedback:** Chỉ hiển thị user-friendly message, không hiển thị technical error details

---

## Tài liệu liên quan

- [Design Principles](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/design-principles.md) - Nguyên tắc thiết kế
- [Color & Typography](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/color-typography.md) - Bảng màu và typography chi tiết
- [Components](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/components.md) - Tiêu chuẩn component UI chi tiết
- [Interaction Patterns](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/interaction-patterns.md) - Feedback, loading, error states chi tiết
- [Navigation & Flow](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/navigation-flow.md) - Flow patterns và navigation chi tiết
- [Accessibility](../../../../04-for-developers/coding-standards/flutter/ui-design-standards/accessibility.md) - Tiêu chuẩn accessibility chi tiết

---

**Last Updated:** 2025-12-21 (Added CODE GENERATION STANDARDS and ERROR HANDLING STANDARDS)

- ← Quay lại: [Figma Prompt Library](../README.md)

