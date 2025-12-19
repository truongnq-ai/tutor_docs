# UI & Widgets patterns
[← Quay lại Overview](overview.md)

## Widget Organization

- Tách widgets thành các file riêng trong `widgets/` folder của mỗi feature.
- Reusable widgets đặt trong `lib/src/presentation/core/widgets/`.
- Feature-specific widgets đặt trong `lib/src/presentation/features/<feature>/widgets/`.

## Naming Conventions

- Widget files: `snake_case.dart` (ví dụ: `student_card.dart`, `practice_question_widget.dart`).
- Widget classes: `PascalCase` (ví dụ: `StudentCard`, `PracticeQuestionWidget`).
- Stateless widgets: `*Widget` suffix (ví dụ: `StudentCardWidget`).
- Stateful widgets: `*Screen` hoặc `*Page` suffix (ví dụ: `StudentListScreen`).

## Reusable Components

Tạo reusable widgets cho các UI patterns thường dùng:

```dart
// lib/src/presentation/core/widgets/loading_widget.dart
class LoadingWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
}

// lib/src/presentation/core/widgets/error_widget.dart
class ErrorWidget extends StatelessWidget {
  final String message;
  final VoidCallback? onRetry;
  
  const ErrorWidget(this.message, {this.onRetry});
  
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(message),
          if (onRetry != null)
            ElevatedButton(
              onPressed: onRetry,
              child: Text('Thử lại'),
            ),
        ],
      ),
    );
  }
}
```

## Theme Management

- Sử dụng `ThemeData` trong MaterialApp.
- Định nghĩa theme trong `lib/src/presentation/core/theme/app_theme.dart`.
- Sử dụng theme colors, text styles từ theme.

### Ví dụ Theme

```dart
// lib/src/presentation/core/theme/app_theme.dart
import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      primaryColor: Colors.blue,
      colorScheme: ColorScheme.light(
        primary: Colors.blue,
        secondary: Colors.orange,
      ),
      textTheme: TextTheme(
        headlineLarge: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        bodyLarge: TextStyle(fontSize: 16),
      ),
    );
  }
  
  static ThemeData get darkTheme {
    return ThemeData(
      primaryColor: Colors.blue,
      colorScheme: ColorScheme.dark(
        primary: Colors.blue,
        secondary: Colors.orange,
      ),
      // Dark theme colors
    );
  }
}
```

## Layout Patterns

- Sử dụng `Scaffold` cho màn hình chính.
- Sử dụng `AppBar` với title và actions.
- Sử dụng `SafeArea` để tránh notch/status bar overlap.
- Sử dụng `Padding`, `Container`, `Column`, `Row` cho layout.

## Responsive Design

- Sử dụng `MediaQuery` để lấy screen size.
- Sử dụng `LayoutBuilder` cho responsive layouts.
- Tạo breakpoints constants cho tablet/desktop (nếu cần).

[↑ Quay lại Overview](overview.md)
