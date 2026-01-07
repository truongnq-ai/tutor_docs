# UI/UX GUIDELINES - FRONTEND

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả UI/UX guidelines cho frontend - đặc biệt là quy tắc "Chapter show / Skill hide".

## Chapter Show / Skill Hide Rule

### Nguyên tắc
- **Chapter**: Hiển thị cho học sinh/phụ huynh
- **Skill**: KHÔNG hiển thị trực tiếp (trừ khi cần thiết)

### UI Layer
- **Navigation**: Hiển thị Chapters, không hiển thị Skills
- **Progress**: Hiển thị progress theo Chapter
- **Learning Plan**: Hiển thị "Hôm nay học Chapter 'Phân số'", không hiển thị "Skill 6.3.1"

### Exceptions
- **Admin Dashboard**: Có thể hiển thị Skills (technical context)
- **Debug Mode**: Có thể hiển thị Skills (development only)
- **Detailed Analysis**: Khi cần phân tích chi tiết (ví dụ: Mini Test results)

## Chapter Display

### Format
- **Name**: "Phân số", "Số nguyên"
- **Code**: Không hiển thị (chỉ dùng internal)
- **Progress**: "Đã hoàn thành 60%"

### Examples
```dart
// ✅ ĐÚNG: Hiển thị Chapter name
Text("Hôm nay học Chapter '${chapter.name}'")

// ❌ SAI: Hiển thị Chapter code
Text("Hôm nay học Chapter '${chapter.code}'")  // "6.3" - không user-friendly
```

## Skill Display (When Needed)

### Format
- **Name**: "Cộng trừ phân số cùng mẫu"
- **Code**: Không hiển thị
- **Context**: Chỉ hiển thị trong detailed analysis

### Examples
```dart
// ✅ ĐÚNG: Hiển thị Skill name trong context
Text("Bạn làm tốt phần '${skill.name}'")

// ❌ SAI: Hiển thị Skill code
Text("Bạn làm tốt Skill '${skill.code}'")  // "6.3.1" - không user-friendly
```

## Progress Visualization

### Chapter Progress
- **Visual**: Progress bar theo Chapter
- **Text**: "Đã hoàn thành 60% Chapter 'Phân số'"
- **Status**: "Chưa bắt đầu", "Đang học", "Đã hoàn thành"

### Skill Progress (Hidden)
- **Internal**: Tính toán từ Skills
- **Display**: Aggregate thành Chapter progress
- **Not shown**: Không hiển thị progress từng Skill

## Learning Plan Display

### Chapter Level
```dart
// ✅ ĐÚNG
Column(
  children: [
    Text("Hôm nay học Chapter '${plan.recommendedChapter.chapterName}'"),
    Text("Luyện tập: ${plan.recommendedChapter.skills.length} bài"),
  ],
)
```

### Skill Level (Optional Detail)
```dart
// ✅ ĐÚNG: Hiển thị Skills như detail, không phải main focus
ExpansionTile(
  title: Text("Chi tiết"),
  children: plan.recommendedChapter.skills.map((skill) => 
    Text(skill.skillName)
  ).toList(),
)
```

## Mini Test Display

### Chapter Scope
- **Title**: "Mini Test - Phân số"
- **Not**: "Mini Test - Skill 6.3.1"

### Skill Analysis (Results Only)
- **After test**: Hiển thị phân tích theo Skill
- **Format**: "Bạn làm tốt phần 'Cộng trừ phân số', cần cải thiện phần 'Nhân chia phân số'"
- **Not**: "Skill 6.3.1: 2/2 đúng"

## Parent Dashboard

### Chapter Only
- **Weaknesses**: "Con đang yếu ở Chapter 'Phân số'"
- **Not**: "Con đang yếu ở Skill 6.3.1"

### Recommendations
- **Language**: "Nên luyện tập thêm phần 'Phân số'"
- **Not**: "Nên luyện tập thêm Skill 6.3.1"

## UI Component States

Tài liệu này mô tả các reusable components và patterns cho UI states (loading, error, empty) trong frontend Next.js/React.

### Nguyên tắc

- **Consistency**: Tất cả loading/error/empty states phải sử dụng reusable components
- **User Experience**: Cung cấp feedback rõ ràng và actionable cho người dùng
- **Accessibility**: Hỗ trợ dark mode và screen readers
- **Maintainability**: Centralized components dễ maintain và update

### Loading States

#### Component: `LoadingState`

Component reusable để hiển thị loading state với spinner và optional message.

**Location**: `tutor-teacher/src/components/common/LoadingState.tsx`

**Props**:
- `message?: string` - Optional message hiển thị dưới spinner (default: "Đang tải...")
- `size?: 'sm' | 'md' | 'lg'` - Kích thước spinner (default: 'md')
- `fullHeight?: boolean` - Nếu true, container sẽ có min-height để center vertically (default: false)

**Usage Pattern**:

```typescript
// ✅ ĐÚNG: Sử dụng LoadingState component
import LoadingState from '@/components/common/LoadingState';

{loading && <LoadingState message="Đang tải danh sách..." />}

// ✅ ĐÚNG: Với fullHeight cho page-level loading
{loading && <LoadingState message="Đang tải thông tin..." fullHeight />}

// ✅ ĐÚNG: Với size nhỏ cho inline loading
{loading && <LoadingState message="Đang tải..." size="sm" />}

// ❌ SAI: Tự tạo loading state
{loading && (
  <div className="text-center py-8">
    <p className="text-gray-500">Đang tải...</p>
  </div>
)}
```

**When to Use**:
- Khi fetch data từ API
- Khi đang process async operation
- Khi component đang initialize

**Examples**:
- List components: `ExerciseList`, `ExerciseSetList`, `StudentList`
- Detail components: `ClassStudentsView`, `ExerciseReviewContent`
- Page-level loading: `ResultEntryContent`

### Error States

#### Component: `ErrorState`

Component reusable để hiển thị error state với message và optional action button.

**Location**: `tutor-teacher/src/components/common/ErrorState.tsx`

**Props**:
- `message: string` - **Required** - Error message hiển thị cho user
- `title?: string` - Optional title (hiển thị trên message)
- `action?: { label: string; onClick: () => void }` - Optional action button (ví dụ: "Thử lại")
- `variant?: 'error' | 'warning'` - Visual variant (default: 'error')
- `fullHeight?: boolean` - Nếu true, container sẽ có min-height để center vertically (default: false)

**Usage Pattern**:

```typescript
// ✅ ĐÚNG: Sử dụng ErrorState component
import ErrorState from '@/components/common/ErrorState';

{error && (
  <ErrorState
    message={error.message}
    action={{
      label: 'Thử lại',
      onClick: () => refetch(),
    }}
  />
)}

// ✅ ĐÚNG: Với title và fullHeight
{error && (
  <ErrorState
    title="Không thể tải dữ liệu"
    message={error.message}
    fullHeight
  />
)}

// ✅ ĐÚNG: Warning variant
{warning && (
  <ErrorState
    message="Dữ liệu có thể không đầy đủ"
    variant="warning"
  />
)}

// ❌ SAI: Tự tạo error state
{error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <p className="text-red-800">{error.message}</p>
  </div>
)}
```

**When to Use**:
- Khi API call fails
- Khi data không thể load
- Khi có validation errors từ server
- Khi có warning cần hiển thị

**Error Actions**:
- **"Thử lại"**: Khi có thể retry operation (ví dụ: refetch data)
- **"Quay lại"**: Khi cần navigate back
- **"Liên hệ hỗ trợ"**: Khi error nghiêm trọng

**Examples**:
- List components với retry: `ExerciseList`, `ExerciseSetList`
- Detail components: `ClassStudentsView`, `ExerciseReviewContent`

### Empty States

#### Component: `EmptyState`

Component reusable để hiển thị empty state khi không có data, với optional action button.

**Location**: `tutor-teacher/src/components/common/EmptyState.tsx`

**Props**:
- `title?: string` - Optional title (default: "Chưa có dữ liệu")
- `message?: string` - Optional message mô tả chi tiết
- `action?: { label: string; onClick: () => void }` - Optional action button (ví dụ: "Tạo mới")
- `icon?: ReactNode` - Optional custom icon

**Usage Pattern**:

```typescript
// ✅ ĐÚNG: Sử dụng EmptyState component
import EmptyState from '@/components/common/EmptyState';

{data.length === 0 && (
  <EmptyState
    title="Chưa có bài tập nào"
    message="Vui lòng tạo bài tập mới để bắt đầu."
    action={{
      label: 'Tạo bài tập với AI',
      onClick: () => router.push('/exercises/create-with-ai'),
    }}
  />
)}

// ✅ ĐÚNG: Empty state không có action
{students.length === 0 && (
  <EmptyState
    title="Lớp chưa có học sinh nào"
    message="Vui lòng thêm học sinh vào lớp."
  />
)}

// ✅ ĐÚNG: Với custom icon
{data.length === 0 && (
  <EmptyState
    title="Không có kết quả"
    icon={<SearchIcon className="h-12 w-12 text-gray-400" />}
  />
)}

// ❌ SAI: Tự tạo empty state
{data.length === 0 && (
  <div className="text-center py-8">
    <p className="text-gray-500">Không có dữ liệu</p>
  </div>
)}
```

**When to Use**:
- Khi list/table không có items
- Khi search không có kết quả
- Khi user chưa tạo data lần đầu

**Action Buttons**:
- **"Tạo mới"**: Khi có thể tạo item mới từ empty state
- **"Thêm vào"**: Khi có thể add items từ nơi khác
- **Không có action**: Khi empty state chỉ để thông báo

**Examples**:
- List empty: `ExerciseReviewContent` (với action "Tạo bài tập với AI")
- Detail empty: `ResultEntryScreen` (không có action)
- Table empty: `TopicTreeTable` (không có action)

### Button Loading States

#### Config: `BUTTON_LOADING_CONFIG`

Configuration cho button loading state với dots animation.

**Location**: `tutor-teacher/src/lib/config/ui.config.ts`

**Config**:
```typescript
export const BUTTON_LOADING_CONFIG = {
  DOTS_ANIMATION_INTERVAL: 1000, // milliseconds
} as const;
```

#### Pattern: Button với Loading Spinner và Dots Animation

Pattern chuẩn cho button khi đang process async operation.

**Usage Pattern**:

```typescript
// ✅ ĐÚNG: Button loading pattern
import { BUTTON_LOADING_CONFIG } from '@/lib/config/ui.config';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('.');

  // Animation for loading dots
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === '.') return '..';
          if (prev === '..') return '...';
          return '.';
        });
      }, BUTTON_LOADING_CONFIG.DOTS_ANIMATION_INTERVAL);

      return () => clearInterval(interval);
    } else {
      setLoadingDots('.');
    }
  }, [loading]);

  return (
    <button
      type="submit"
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {loading ? `Đang tạo${loadingDots}` : 'Tạo mới'}
    </button>
  );
}
```

**Key Points**:
1. **Spinner**: Hiển thị spinner icon khi `loading === true`
2. **Dots Animation**: Text thay đổi `.` → `..` → `...` → `.` với interval từ config
3. **Disabled State**: Button disabled khi loading
4. **Visual Feedback**: Text thay đổi từ action text (ví dụ: "Tạo mới") sang loading text (ví dụ: "Đang tạo...")

**When to Use**:
- Submit forms (create, update, delete)
- Async operations trong modal
- Actions cần user feedback rõ ràng

**Examples**:
- Modal forms: `ClassCreateModal`, `StudentCreateModal`, `SubjectCreateModal`
- Form submissions: `AssignExerciseSetModal`, `ResultEntryScreen`

### Best Practices

#### 1. Consistency

- **Luôn sử dụng reusable components**: Không tự tạo loading/error/empty states
- **Consistent messages**: Sử dụng messages rõ ràng, user-friendly
- **Consistent styling**: Tất cả states support dark mode

#### 2. User Experience

- **Loading states**: Hiển thị ngay khi bắt đầu async operation
- **Error states**: Cung cấp actionable error messages và retry options
- **Empty states**: Hướng dẫn user cách tạo data hoặc next steps

#### 3. Performance

- **Conditional rendering**: Chỉ render states khi cần thiết
- **Lazy loading**: Không pre-render states không cần thiết

#### 4. Accessibility

- **Screen readers**: States có proper ARIA labels
- **Keyboard navigation**: Action buttons có thể focus và activate bằng keyboard
- **Color contrast**: Đảm bảo contrast ratio đạt chuẩn

### Checklist

Khi implement loading/error/empty states:

- [ ] Sử dụng `LoadingState` component cho loading states
- [ ] Sử dụng `ErrorState` component cho error states
- [ ] Sử dụng `EmptyState` component cho empty states
- [ ] Button loading sử dụng `BUTTON_LOADING_CONFIG` và dots animation pattern
- [ ] Messages rõ ràng, user-friendly
- [ ] Support dark mode
- [ ] Error states có action buttons khi phù hợp
- [ ] Empty states có action buttons khi có thể tạo data
- [ ] Không tự tạo custom loading/error/empty states

## Tài liệu liên quan

- [Chapter vs Skill](../../00-core-concepts/chapter-vs-skill.md)
- [Student Learning Experience](../../04-user-experience/student/learning-experience.md)
- [Parent Reporting Experience](../../04-user-experience/parent/reporting-experience.md)
- [State Management](./state-management.md) - State management patterns

---

← Quay lại: [README.md](../README.md)

