# Widget Implementation
[← Quay lại Overview](README.md)

Tài liệu này mô tả các technical patterns cho implementation: code structure, naming conventions, và organization cho widgets trong Student App.

## Widget Organization

### Folder Structure

Tách widgets thành các file riêng trong `widgets/` folder của mỗi feature:

```
lib/src/presentation/
├── core/
│   └── widgets/          # Reusable widgets
│       ├── loading_widget.dart
│       ├── error_widget.dart
│       └── empty_state_widget.dart
└── features/
    ├── practice/
    │   └── widgets/      # Feature-specific widgets
    │       ├── question_card.dart
    │       └── answer_option.dart
    └── progress/
        └── widgets/
            ├── progress_card.dart
            └── skill_badge.dart
```

### Reusable vs Feature-Specific

**Reusable widgets** (`lib/src/presentation/core/widgets/`):
- LoadingWidget
- ErrorWidget
- EmptyStateWidget
- PrimaryButton
- SecondaryButton

**Feature-specific widgets** (`lib/src/presentation/features/<feature>/widgets/`):
- PracticeQuestionWidget
- ProgressCardWidget
- SkillBadgeWidget

## Naming Conventions

### Widget Files

- **Format**: `snake_case.dart`
- **Examples**:
  - `student_card.dart`
  - `practice_question_widget.dart`
  - `loading_widget.dart`

### Widget Classes

- **Format**: `PascalCase`
- **Stateless widgets**: `*Widget` suffix (ví dụ: `StudentCardWidget`)
- **Stateful widgets**: `*Screen` hoặc `*Page` suffix (ví dụ: `StudentListScreen`)

**Examples**:
```dart
// Stateless widget
class StudentCardWidget extends StatelessWidget { ... }

// Stateful widget (screen)
class PracticeScreen extends StatefulWidget { ... }

// Stateful widget (page)
class ProgressPage extends StatefulWidget { ... }
```

### Widget Parameters

- **Format**: `camelCase`
- **Required parameters**: Không có default value
- **Optional parameters**: Có default value hoặc nullable

**Examples**:
```dart
class StudentCardWidget extends StatelessWidget {
  final String studentName;        // Required
  final int? grade;                // Optional (nullable)
  final VoidCallback? onTap;       // Optional callback
  final bool showProgress = false;  // Optional with default

  const StudentCardWidget({
    required this.studentName,
    this.grade,
    this.onTap,
    this.showProgress = false,
  });
}
```

## Reusable Components

Tạo reusable widgets cho các UI patterns thường dùng:

### Loading Widget

```dart
// lib/src/presentation/core/widgets/loading_widget.dart
class LoadingWidget extends StatelessWidget {
  final String? message;

  const LoadingWidget({this.message});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircularProgressIndicator(),
          if (message != null) ...[
            const SizedBox(height: 16),
            Text(
              message!,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ],
      ),
    );
  }
}
```

### Error Widget

```dart
// lib/src/presentation/core/widgets/error_widget.dart
class ErrorWidget extends StatelessWidget {
  final String message;
  final VoidCallback? onRetry;

  const ErrorWidget({
    required this.message,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.error_outline,
              size: 48,
              color: Theme.of(context).colorScheme.error,
            ),
            const SizedBox(height: 16),
            Text(
              message,
              style: Theme.of(context).textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            if (onRetry != null) ...[
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: onRetry,
                child: const Text('Thử lại'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
```

### Empty State Widget

```dart
// lib/src/presentation/core/widgets/empty_state_widget.dart
class EmptyStateWidget extends StatelessWidget {
  final String title;
  final String? description;
  final String? actionLabel;
  final VoidCallback? onAction;

  const EmptyStateWidget({
    required this.title,
    this.description,
    this.actionLabel,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.inbox_outlined,
              size: 64,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              title,
              style: Theme.of(context).textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            if (description != null) ...[
              const SizedBox(height: 8),
              Text(
                description!,
                style: Theme.of(context).textTheme.bodyMedium,
                textAlign: TextAlign.center,
              ),
            ],
            if (onAction != null && actionLabel != null) ...[
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: onAction,
                child: Text(actionLabel!),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
```

## Theme Management

### Theme Definition

Sử dụng `ThemeData` trong MaterialApp và định nghĩa theme trong `lib/src/presentation/core/theme/app_theme.dart`:

```dart
// lib/src/presentation/core/theme/app_theme.dart
import 'package:flutter/material.dart';

class AppTheme {
  // Color palette
  static const Color primaryColor = Color(0xFF4CAF50);      // Green
  static const Color secondaryColor = Color(0xFF2196F3);     // Blue
  static const Color accentColor = Color(0xFFFF9800);        // Orange
  static const Color errorColor = Color(0xFFF44336);        // Red
  static const Color backgroundColor = Color(0xFFF5F5F5);    // Light grey
  static const Color surfaceColor = Color(0xFFFFFFFF);       // White
  static const Color textPrimary = Color(0xFF212121);       // Dark grey
  static const Color textSecondary = Color(0xFF757575);     // Medium grey

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.light(
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: accentColor,
        error: errorColor,
        background: backgroundColor,
        surface: surfaceColor,
      ),
      textTheme: TextTheme(
        headlineLarge: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          height: 1.33,
          color: textPrimary,
        ),
        headlineMedium: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          height: 1.4,
          color: textPrimary,
        ),
        headlineSmall: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          height: 1.33,
          color: textPrimary,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          height: 1.5,
          color: textPrimary,
        ),
        bodyMedium: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.normal,
          height: 1.5,
          color: textPrimary,
        ),
        bodySmall: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.normal,
          height: 1.43,
          color: textSecondary,
        ),
        labelSmall: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.normal,
          height: 1.33,
          color: textSecondary,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 44),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          elevation: 2,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primaryColor,
          minimumSize: const Size(double.infinity, 44),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          side: BorderSide(color: primaryColor, width: 1),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
      ),
    );
  }

  static ThemeData get darkTheme {
    // Dark theme implementation (nếu cần)
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.dark(
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: accentColor,
        error: errorColor,
      ),
      // ... dark theme colors
    );
  }
}
```

### Using Theme

Sử dụng theme colors và text styles từ theme:

```dart
// ✅ Good: Sử dụng theme
Container(
  color: Theme.of(context).colorScheme.primary,
  child: Text(
    'Hello',
    style: Theme.of(context).textTheme.headlineMedium,
  ),
)

// ❌ Bad: Hardcode colors
Container(
  color: Colors.green,
  child: Text(
    'Hello',
    style: TextStyle(fontSize: 20),
  ),
)
```

## Layout Patterns

### Scaffold Structure

Sử dụng `Scaffold` cho màn hình chính:

```dart
Scaffold(
  appBar: AppBar(
    title: Text('Tiêu đề'),
    actions: [
      IconButton(
        icon: Icon(Icons.search),
        onPressed: () {},
      ),
    ],
  ),
  body: SafeArea(
    child: Padding(
      padding: const EdgeInsets.all(16.0),
      child: content,
    ),
  ),
  bottomNavigationBar: BottomNavigationBar(
    items: [...],
  ),
)
```

### SafeArea

Sử dụng `SafeArea` để tránh notch/status bar overlap:

```dart
SafeArea(
  child: Column(
    children: [
      // Content
    ],
  ),
)
```

### Layout Widgets

Sử dụng `Padding`, `Container`, `Column`, `Row` cho layout:

```dart
Container(
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(vertical: 8),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(
        color: Colors.black.withOpacity(0.1),
        blurRadius: 4,
        offset: Offset(0, 2),
      ),
    ],
  ),
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text('Title'),
      SizedBox(height: 8),
      Text('Description'),
    ],
  ),
)
```

## Responsive Design

### MediaQuery

Sử dụng `MediaQuery` để lấy screen size:

```dart
final screenWidth = MediaQuery.of(context).size.width;
final screenHeight = MediaQuery.of(context).size.height;
final isTablet = screenWidth > 600;
```

### LayoutBuilder

Sử dụng `LayoutBuilder` cho responsive layouts:

```dart
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 600) {
      // Tablet layout
      return Row(
        children: [leftPanel, rightPanel],
      );
    } else {
      // Mobile layout
      return Column(
        children: [topPanel, bottomPanel],
      );
    }
  },
)
```

### Breakpoints

Tạo breakpoints constants cho tablet/desktop (nếu cần):

```dart
// lib/src/presentation/core/constants/breakpoints.dart
class Breakpoints {
  static const double mobile = 600;
  static const double tablet = 900;
  static const double desktop = 1200;
}

// Usage
final isTablet = MediaQuery.of(context).size.width >= Breakpoints.tablet;
```

## Best Practices

### Do's
- ✅ Tách widgets thành các file riêng
- ✅ Sử dụng naming conventions nhất quán
- ✅ Sử dụng theme colors và text styles
- ✅ Tạo reusable widgets cho patterns thường dùng
- ✅ Sử dụng SafeArea để tránh notch overlap
- ✅ Support responsive design với LayoutBuilder

### Don'ts
- ❌ Hardcode colors và font sizes
- ❌ Tạo widgets quá lớn (> 200 lines)
- ❌ Mix reusable và feature-specific widgets trong cùng folder
- ❌ Không sử dụng SafeArea
- ❌ Không support responsive design

## Tài liệu liên quan

- [Design Principles](design-principles.md) - Nguyên tắc thiết kế
- [Color & Typography](color-typography.md) - Bảng màu và typography
- [Components](components.md) - Tiêu chuẩn component UI
- [Code Structure](../code-structure.md) - Cấu trúc code & đặt tên

[← Quay lại Overview](README.md)

