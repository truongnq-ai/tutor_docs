# State management với Riverpod
← Quay lại: [README.md](../README.md)

## Riverpod Patterns

- Sử dụng Riverpod cho dependency injection và state management.
- Tạo providers cho services, repositories, và state.
- Sử dụng code generation với `riverpod_generator` khi có thể.

## Provider Types

### Service Providers

```dart
// lib/src/core/di/service_providers.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../data/services/student_service.dart';
import '../../data/services/api_client.dart';

part 'service_providers.g.dart';

@riverpod
ApiClient apiClient(ApiClientRef ref) {
  return ApiClient();
}

@riverpod
StudentService studentService(StudentServiceRef ref) {
  return StudentService(ref.watch(apiClientProvider).dio);
}
```

### State Providers

```dart
// lib/src/presentation/features/students/providers/student_providers.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../../domain/entities/student.dart';
import '../../../../data/services/student_service.dart';

part 'student_providers.g.dart';

@riverpod
Future<List<Student>> studentList(StudentListRef ref) async {
  final service = ref.watch(studentServiceProvider);
  final response = await service.getStudentList();
  
  if (response.errorCode == '0000') {
    return response.data ?? [];
  } else {
    throw Exception(response.errorDetail);
  }
}
```

### Async Providers

```dart
@riverpod
Future<Student?> studentDetail(StudentDetailRef ref, String studentId) async {
  final service = ref.watch(studentServiceProvider);
  final response = await service.getStudent(studentId);
  
  if (response.errorCode == '0000') {
    return response.data;
  } else {
    throw Exception(response.errorDetail);
  }
}
```

## Using Providers in UI

```dart
// lib/src/presentation/features/students/screens/student_list_screen.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/student_providers.dart';

class StudentListScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final studentListAsync = ref.watch(studentListProvider);
    
    return studentListAsync.when(
      data: (students) => ListView.builder(
        itemCount: students.length,
        itemBuilder: (context, index) => StudentCard(students[index]),
      ),
      loading: () => const CircularProgressIndicator(),
      error: (error, stack) => ErrorWidget(error),
    );
  }
}
```

## State Notifiers

Sử dụng StateNotifier cho complex state management:

```dart
// lib/src/presentation/features/practice/providers/practice_notifier.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'practice_notifier.g.dart';

class PracticeState {
  final List<Question> questions;
  final int currentIndex;
  final bool isLoading;
  
  PracticeState({
    this.questions = const [],
    this.currentIndex = 0,
    this.isLoading = false,
  });
  
  PracticeState copyWith({
    List<Question>? questions,
    int? currentIndex,
    bool? isLoading,
  }) {
    return PracticeState(
      questions: questions ?? this.questions,
      currentIndex: currentIndex ?? this.currentIndex,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

@riverpod
class PracticeNotifier extends _$PracticeNotifier {
  @override
  PracticeState build() => PracticeState();
  
  Future<void> loadPractice() async {
    state = state.copyWith(isLoading: true);
    // Load practice logic
    state = state.copyWith(isLoading: false);
  }
}
```

← Quay lại: [README.md](../README.md)

