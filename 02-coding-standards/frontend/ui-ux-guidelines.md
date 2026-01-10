# UI/UX GUIDELINES - FRONTEND

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả UI/UX guidelines cho frontend Phase 1 - tập trung vào teacher workflow, AI assistance patterns, và UI component standards.

## Teacher-Focused UI Guidelines

Tài liệu này mô tả các nguyên tắc UI/UX cốt lõi cho hệ thống giáo dục phục vụ giáo viên trong Phase 1. Tất cả guidelines dưới đây đều giả định **người dùng là giáo viên** và **không có học sinh/phụ huynh login**.

### Nguyên tắc cơ bản

#### 1. User Context (Teacher Only)

**Quy tắc bắt buộc:**
- Mọi UI component, page, và flow đều giả định user là **giáo viên**
- Không có role switching, role selection, hoặc multi-user context
- Không có UI cho học sinh hoặc phụ huynh

**Implementation Pattern:**
```typescript
// ✅ ĐÚNG: Không có role selection
// Mọi page đều giả định user là teacher
export default function ClassListPage() {
  // Không cần check role
  // Không cần hiển thị "Switch to student view"
  return <ClassListContent />;
}

// ❌ SAI: Có role selection
export default function DashboardPage() {
  const [role, setRole] = useState<'teacher' | 'student' | 'parent'>('teacher');
  // Phase 1 không có role switching
}
```

**UI Text Pattern:**
```typescript
// ✅ ĐÚNG: Text giả định teacher context
<h1>Danh sách lớp của bạn</h1>
<p>Chọn lớp để xem chi tiết</p>

// ❌ SAI: Text generic hoặc multi-user
<h1>Danh sách lớp</h1>
<p>Chọn vai trò: Giáo viên / Học sinh / Phụ huynh</p>
```

#### 2. Ownership & Privacy Patterns

**Quy tắc bắt buộc:**
- Mọi dữ liệu hiển thị phải thuộc `teacher_id` của giáo viên hiện tại
- Không hiển thị dữ liệu của giáo viên khác
- Không có concept "public" hoặc "shared" trong Phase 1

**Data Filtering Pattern:**
```typescript
// ✅ ĐÚNG: Luôn filter theo teacher_id
async function getClasses(teacherId: string) {
  return await db.classes.findMany({
    where: { teacher_id: teacherId },
  });
}

// ✅ ĐÚNG: Component nhận teacherId từ context
export default function ExerciseList() {
  const { teacherId } = useAuth(); // Giả định có auth context
  const { data: exercises } = useQuery({
    queryKey: ['exercises', teacherId],
    queryFn: () => getExercises(teacherId),
  });
  
  return (
    <div>
      {exercises?.map(exercise => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}

// ❌ SAI: Không filter theo teacher
async function getAllClasses() {
  return await db.classes.findMany(); // Lấy tất cả classes
}
```

**Visual Ownership Indicators:**
```typescript
// ✅ ĐÚNG: Không cần hiển thị ownership vì mọi thứ đều của teacher
// Không cần badge "My Class", "My Exercise" vì mặc định đã là của teacher

// ❌ SAI: Hiển thị ownership indicators không cần thiết
<ClassCard>
  <Badge>Lớp của tôi</Badge> {/* Không cần vì mọi lớp đều của teacher */}
</ClassCard>
```

#### 3. Status Display Patterns

**Exercise Status (DRAFT vs APPROVED):**

Trong Phase 1, Exercise chỉ có 2 trạng thái:
- `DRAFT`: Bài đang soạn, chưa được dùng
- `APPROVED`: Giáo viên đã duyệt, có thể dùng cho lớp

**Visual Pattern:**
```typescript
// ✅ ĐÚNG: Status badge rõ ràng
interface ExerciseStatusBadgeProps {
  status: 'DRAFT' | 'APPROVED';
}

function ExerciseStatusBadge({ status }: ExerciseStatusBadgeProps) {
  if (status === 'DRAFT') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        Nháp
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
      Đã duyệt
    </span>
  );
}

// ✅ ĐÚNG: Disable action khi status = DRAFT
function AssignExerciseButton({ exercise }: { exercise: Exercise }) {
  const isDisabled = exercise.status === 'DRAFT';
  
  return (
    <button
      disabled={isDisabled}
      className={cn(
        "px-4 py-2 rounded-lg",
        isDisabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      )}
      title={isDisabled ? "Vui lòng duyệt bài tập trước khi gán cho lớp" : "Gán bài tập cho lớp"}
    >
      Gán cho lớp
    </button>
  );
}

// ❌ SAI: Cho phép gán DRAFT exercise
<button onClick={() => assignExercise(exercise)}>
  Gán cho lớp {/* Không check status */}
</button>
```

**Status trong List View:**
```typescript
// ✅ ĐÚNG: Hiển thị status trong exercise list
function ExerciseListItem({ exercise }: { exercise: Exercise }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <h3 className="font-semibold">{exercise.title || exercise.content.substring(0, 50)}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {exercise.subject.name} • {exercise.topic.name}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ExerciseStatusBadge status={exercise.status} />
        <button onClick={() => router.push(`/exercises/${exercise.id}`)}>
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
```

#### 4. No Analytics / Progress Tracking

**Quy tắc bắt buộc:**
- Không hiển thị progress bars, charts, graphs, hoặc statistics
- Không có dashboard tổng hợp
- Không có "insights" hoặc "recommendations" tự động

**Forbidden Patterns:**
```typescript
// ❌ SAI: Progress tracking
<div className="progress-bar">
  <div style={{ width: '60%' }}>60% hoàn thành</div>
</div>

// ❌ SAI: Statistics
<div className="stats">
  <div>Tổng số bài: 25</div>
  <div>Đã gán: 18</div>
  <div>Tỷ lệ: 72%</div>
</div>

// ❌ SAI: Charts
<LineChart data={progressData} />

// ❌ SAI: Insights
<div className="insight-card">
  <p>Tuần này bạn nên gán thêm 3 bài tập</p>
</div>
```

**Allowed Patterns:**
```typescript
// ✅ ĐÚNG: Simple counts (không phải analytics)
<div className="text-sm text-gray-600">
  {classes.length} lớp • {exercises.length} bài tập
</div>

// ✅ ĐÚNG: Read-only information
<div>
  <p>Tên lớp: {class.name}</p>
  <p>Môn học: {class.subject.name}</p>
  <p>Số học sinh: {class.students.length}</p>
</div>
```

### Examples: Teacher Context trong UI

#### Class List Screen

```typescript
// ✅ ĐÚNG: Class list cho teacher
export default function ClassListPage() {
  const { teacherId } = useAuth();
  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes', teacherId],
    queryFn: () => getClasses(teacherId),
  });

  if (isLoading) return <LoadingState />;
  if (!classes || classes.length === 0) {
    return (
      <EmptyState
        title="Bạn chưa có lớp nào"
        message="Tạo lớp đầu tiên để bắt đầu."
        action={{
          label: 'Tạo lớp',
          onClick: () => router.push('/classes/create'),
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Danh sách lớp của bạn</h1>
        <button
          onClick={() => router.push('/classes/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tạo lớp mới
        </button>
      </div>
      
      <div className="grid gap-4">
        {classes.map((classItem) => (
          <ClassCard key={classItem.id} classItem={classItem} />
        ))}
      </div>
    </div>
  );
}

// ❌ SAI: Multi-user context
export default function ClassListPage() {
  const [viewMode, setViewMode] = useState<'teacher' | 'student'>('teacher');
  // Phase 1 không có view mode switching
}
```

## AI Role & Presentation Guidelines

Tài liệu này mô tả cách hiển thị và tương tác với AI trong Phase 1. **AI chỉ là trợ lý, không có authority**, và mọi output của AI đều phải được giáo viên xem xét và chỉnh sửa trước khi sử dụng.

### Nguyên tắc cơ bản

#### 1. AI Output Labeling (Bắt buộc)

**Quy tắc:**
- Mọi AI output phải có label rõ ràng: **"Gợi ý (AI)"** hoặc **"Bản nháp (AI)"**
- Visual distinction: màu sắc, border, icon khác biệt với nội dung thủ công
- Không được ẩn nguồn gốc AI

**Visual Pattern:**
```typescript
// ✅ ĐÚNG: AI output có label và visual distinction
function AIOutputPanel({ content }: { content: string }) {
  return (
    <div className="border-2 border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <SparklesIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
          Gợi ý (AI)
        </span>
      </div>
      <div className="prose dark:prose-invert">
        {content}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => copyToEditor(content)}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sử dụng gợi ý
        </button>
        <button
          onClick={() => dismissAI()}
          className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
}

// ❌ SAI: AI output không có label
<div className="p-4">
  {aiContent} {/* Không rõ đây là AI output */}
</div>

// ❌ SAI: AI output tự động chèn vào editor
<Editor value={aiContent} /> {/* Không cho phép */}
```

**Label Text Patterns:**
```typescript
// ✅ ĐÚNG: Label rõ ràng
"Gợi ý (AI)"
"Bản nháp (AI)"
"Nhận xét gợi ý (AI)"

// ❌ SAI: Label mơ hồ hoặc tạo authority
"AI đã tạo"
"AI hoàn thiện"
"AI quyết định"
"Nội dung AI"
```

#### 2. AI Interaction Patterns

**Quy tắc:**
- AI chỉ xuất hiện khi giáo viên **chủ động yêu cầu**
- Không có auto-trigger, auto-suggest, hoặc background AI
- AI output luôn editable và không tự động lưu

**Button Pattern:**
```typescript
// ✅ ĐÚNG: AI button rõ ràng, chủ động
function ExerciseEditor() {
  const [aiSuggestion, setAISuggestion] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleRequestAI = async () => {
    setIsLoadingAI(true);
    try {
      const suggestion = await requestAIDraft({
        subject: selectedSubject,
        topic: selectedTopic,
        requirement: userRequirement,
      });
      setAISuggestion(suggestion);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Content Editor */}
      <div>
        <label>Nội dung bài tập</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[200px] p-3 border rounded-lg"
        />
      </div>

      {/* AI Assistance Panel - chỉ hiện khi có suggestion */}
      {aiSuggestion && (
        <AIOutputPanel
          content={aiSuggestion}
          onUse={() => {
            setContent(aiSuggestion);
            setAISuggestion(null);
          }}
          onDismiss={() => setAISuggestion(null)}
        />
      )}

      {/* AI Request Button */}
      <button
        onClick={handleRequestAI}
        disabled={isLoadingAI || !selectedSubject || !selectedTopic}
        className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
      >
        {isLoadingAI ? (
          <>
            <Spinner className="h-4 w-4" />
            <span>Đang tạo gợi ý...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="h-4 w-4" />
            <span>Gợi ý nội dung</span>
          </>
        )}
      </button>
    </div>
  );
}

// ❌ SAI: AI tự động trigger
useEffect(() => {
  // Không được tự động gọi AI
  if (content.length > 10) {
    requestAI(); // ❌ Cấm
  }
}, [content]);

// ❌ SAI: AI auto-save
const handleAISuggestion = async () => {
  const suggestion = await requestAI();
  await saveExercise(suggestion); // ❌ Không được auto-save
};
```

**AI Input Requirements:**
```typescript
// ✅ ĐÚNG: AI input phải tường minh
interface AIDraftRequest {
  subjectId: string;      // Bắt buộc: giáo viên đã chọn
  topicId: string;        // Bắt buộc: giáo viên đã chọn
  requirement: string;     // Bắt buộc: yêu cầu cụ thể từ giáo viên
}

async function requestExerciseDraft(request: AIDraftRequest) {
  // AI chỉ dựa vào input tường minh
  return await aiService.generateExerciseDraft({
    subject: request.subjectId,
    topic: request.topicId,
    requirement: request.requirement,
  });
}

// ❌ SAI: AI tự suy luận
async function requestExerciseDraft() {
  // ❌ Không được tự chọn subject/topic
  // ❌ Không được suy luận từ context khác
  return await aiService.generateExerciseDraft({
    // Thiếu input tường minh
  });
}
```

#### 3. AI Draft Display Pattern

**Quy tắc:**
- AI output phải tách biệt khỏi content editor
- Giáo viên có thể copy, chỉnh sửa, hoặc bỏ qua
- Không tự động chèn vào editor

**Implementation:**
```typescript
// ✅ ĐÚNG: AI draft tách biệt
function ExerciseEditorWithAI() {
  const [content, setContent] = useState('');
  const [aiDraft, setAIDraft] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Content Editor - giáo viên nhập */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Nội dung bài tập
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[300px] p-4 border rounded-lg"
          placeholder="Nhập nội dung bài tập hoặc sử dụng gợi ý AI bên dưới"
        />
      </div>

      {/* AI Draft Panel - tách biệt */}
      {aiDraft && (
        <div className="border-2 border-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800 dark:text-blue-300">
                Gợi ý (AI)
              </span>
            </div>
            <button
              onClick={() => setAIDraft(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="prose dark:prose-invert mb-4">
            {aiDraft}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setContent(aiDraft);
                setAIDraft(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sử dụng gợi ý
            </button>
            <button
              onClick={() => setAIDraft(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Bỏ qua
            </button>
          </div>
        </div>
      )}

      {/* AI Request Button */}
      <button
        onClick={handleRequestAI}
        className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
      >
        <SparklesIcon className="h-4 w-4" />
        <span>Gợi ý nội dung</span>
      </button>
    </div>
  );
}

// ❌ SAI: AI output tự động chèn
function ExerciseEditor() {
  const [content, setContent] = useState('');
  
  useEffect(() => {
    if (aiDraft) {
      setContent(aiDraft); // ❌ Không được auto-insert
    }
  }, [aiDraft]);
}
```

#### 4. AI Button Patterns

**Text Patterns:**
```typescript
// ✅ ĐÚNG: Button text rõ ràng về vai trò AI
"Gợi ý nội dung"
"Gợi ý nhận xét"
"Tạo bản nháp"

// ❌ SAI: Button text tạo authority
"AI tạo bài"
"AI hoàn thiện"
"AI quyết định"
"Tự động tạo"
```

**Icon Patterns:**
```typescript
// ✅ ĐÚNG: Icon assistant/sparkle
<SparklesIcon className="h-4 w-4" />
<LightBulbIcon className="h-4 w-4" />

// ❌ SAI: Icon robot/auto
<RobotIcon className="h-4 w-4" />
<AutoIcon className="h-4 w-4" />
```

**Button States:**
```typescript
// ✅ ĐÚNG: Button states rõ ràng
function AIButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      onClick={handleRequestAI}
      disabled={isLoading || !canRequestAI}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg",
        "bg-purple-100 text-purple-700 hover:bg-purple-200",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    >
      {isLoading ? (
        <>
          <Spinner className="h-4 w-4" />
          <span>Đang tạo gợi ý...</span>
        </>
      ) : (
        <>
          <SparklesIcon className="h-4 w-4" />
          <span>Gợi ý nội dung</span>
        </>
      )}
    </button>
  );
}
```

### Examples: AI Integration trong UI

#### Exercise Creation với AI

```typescript
// ✅ ĐÚNG: Exercise editor với AI assistance
export default function ExerciseEditorPage() {
  const [content, setContent] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [aiDraft, setAIDraft] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleRequestAI = async () => {
    if (!subjectId || !topicId) {
      alert('Vui lòng chọn môn học và topic trước');
      return;
    }

    setIsLoadingAI(true);
    try {
      const draft = await requestExerciseDraft({
        subjectId,
        topicId,
        requirement: '', // Có thể thêm textarea cho requirement
      });
      setAIDraft(draft);
    } catch (error) {
      showError('Không thể tạo gợi ý. Vui lòng thử lại.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metadata - giáo viên chọn */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Môn học *</label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Chọn môn học</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Topic *</label>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="w-full p-2 border rounded-lg"
            disabled={!subjectId}
          >
            <option value="">Chọn topic</option>
            {topics.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <label>Nội dung bài tập *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[300px] p-4 border rounded-lg"
          required
        />
      </div>

      {/* AI Draft Panel - chỉ hiện khi có */}
      {aiDraft && (
        <AIOutputPanel
          content={aiDraft}
          onUse={() => {
            setContent(aiDraft);
            setAIDraft(null);
          }}
          onDismiss={() => setAIDraft(null)}
        />
      )}

      {/* AI Request Button */}
      <div className="flex justify-end">
        <button
          onClick={handleRequestAI}
          disabled={isLoadingAI || !subjectId || !topicId}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50"
        >
          {isLoadingAI ? (
            <>
              <Spinner className="h-4 w-4" />
              <span>Đang tạo gợi ý...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="h-4 w-4" />
              <span>Gợi ý nội dung</span>
            </>
          )}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button onClick={() => router.back()}>Hủy</button>
        <button
          onClick={handleSaveDraft}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Lưu nháp
        </button>
        <button
          onClick={handleApprove}
          disabled={!content || !subjectId || !topicId}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Duyệt bài
        </button>
      </div>
    </div>
  );
}
```

## Exercise & ExerciseSet Display Guidelines

Tài liệu này mô tả cách hiển thị Exercise và ExerciseSet trong Phase 1. Exercise là đơn vị bài tập nhỏ nhất, ExerciseSet là tập hợp các Exercise được gán cho lớp.

### Nguyên tắc cơ bản

#### 1. Exercise List Display

**Dữ liệu hiển thị (READ-ONLY):**

Mỗi exercise item trong list **chỉ được hiển thị**:

| Trường | Bắt buộc | Format | Ghi chú |
|--------|----------|--------|---------|
| Title/Preview | ✅ | Text (1-2 dòng) | Trích đoạn nội dung hoặc title |
| Môn học | ✅ | Label/Badge | Từ seed data |
| Topic | ✅ | Label/Badge | Từ read-only taxonomy |
| Status | ✅ | Badge | `DRAFT` / `APPROVED` |

**Không hiển thị:**
- ❌ Usage count (số lần dùng)
- ❌ Quality score
- ❌ Rating/Review
- ❌ Bài của giáo viên khác
- ❌ Created date (trừ khi cần thiết cho UX)

**Implementation Pattern:**
```typescript
// ✅ ĐÚNG: Exercise list item
interface ExerciseListItemProps {
  exercise: Exercise;
}

function ExerciseListItem({ exercise }: ExerciseListItemProps) {
  const preview = exercise.content.length > 100
    ? exercise.content.substring(0, 100) + '...'
    : exercise.content;

  return (
    <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <ExerciseStatusBadge status={exercise.status} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {exercise.subject.name}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            •
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {exercise.topic.name}
          </span>
        </div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
          {preview}
        </h3>
      </div>
      <div className="ml-4 flex items-center gap-2">
        <button
          onClick={() => router.push(`/exercises/${exercise.id}`)}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}

// ❌ SAI: Hiển thị usage count
<div>
  <span>Đã dùng: {exercise.usageCount} lần</span> {/* ❌ Không có trong Phase 1 */}
</div>
```

**Filter Patterns:**
```typescript
// ✅ ĐÚNG: Filter theo Phase 1 scope
function ExerciseListFilters() {
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [topicFilter, setTopicFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DRAFT' | 'APPROVED'>('ALL');

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={subjectFilter}
        onChange={(e) => setSubjectFilter(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="">Tất cả môn học</option>
        {subjects.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as any)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="ALL">Tất cả trạng thái</option>
        <option value="DRAFT">Nháp</option>
        <option value="APPROVED">Đã duyệt</option>
      </select>
    </div>
  );
}

// ❌ SAI: Filter không phù hợp Phase 1
<select>
  <option>Được dùng nhiều nhất</option> {/* ❌ Không có usage tracking */}
  <option>Chất lượng cao</option> {/* ❌ Không có quality score */}
</select>
```

#### 2. ExerciseSet Display

**Dữ liệu hiển thị:**

Mỗi ExerciseSet item **chỉ được hiển thị**:

| Trường | Format | Ghi chú |
|--------|--------|---------|
| Title | Text | Tên đề/bộ bài |
| Intent | Label | `PRACTICE` / `REVIEW` / `SURVEY` / `TEST` (chỉ mô tả) |
| Số lượng Exercise | Number | Số bài trong set |
| Description | Text (optional) | Mô tả ngắn |

**Intent Display Pattern:**
```typescript
// ✅ ĐÚNG: Intent chỉ là label mô tả
function ExerciseSetIntentBadge({ intent }: { intent: ExerciseSetIntent }) {
  const labels = {
    PRACTICE: 'Luyện tập',
    REVIEW: 'Ôn tập',
    SURVEY: 'Khảo sát',
    TEST: 'Kiểm tra',
  };

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
      {labels[intent]}
    </span>
  );
}

// ❌ SAI: Intent enforce logic
function ExerciseSetCard({ exerciseSet }: { exerciseSet: ExerciseSet }) {
  if (exerciseSet.intent === 'TEST') {
    // ❌ Không được enforce rule kiểm tra
    return <div>Đề thi - Không được xem kết quả</div>;
  }
}
```

**ExerciseSet List Item:**
```typescript
// ✅ ĐÚNG: ExerciseSet list item
function ExerciseSetListItem({ exerciseSet }: { exerciseSet: ExerciseSet }) {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {exerciseSet.title}
        </h3>
        <ExerciseSetIntentBadge intent={exerciseSet.intent} />
      </div>
      
      {exerciseSet.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {exerciseSet.description}
        </p>
      )}
      
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>{exerciseSet.exercises.length} bài tập</span>
      </div>
    </div>
  );
}

// ❌ SAI: Hiển thị rule hoặc constraint
<div>
  <span>Giới hạn: 1 lần làm</span> {/* ❌ Intent không enforce rule */}
  <span>Thời gian: 60 phút</span> {/* ❌ Không có trong Phase 1 */}
</div>
```

#### 3. ExerciseSet Preview (Khi chọn để gán)

**Khi giáo viên chọn ExerciseSet để gán cho lớp:**

```typescript
// ✅ ĐÚNG: Preview ExerciseSet trước khi gán
function ExerciseSetPreview({ exerciseSet }: { exerciseSet: ExerciseSet }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">{exerciseSet.title}</h3>
        {exerciseSet.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {exerciseSet.description}
          </p>
        )}
        <div className="mt-2">
          <ExerciseSetIntentBadge intent={exerciseSet.intent} />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Danh sách bài tập ({exerciseSet.exercises.length})</h4>
        <div className="space-y-2">
          {exerciseSet.exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium text-gray-500">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {exercise.content.substring(0, 100)}
                    {exercise.content.length > 100 && '...'}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>{exercise.subject.name}</span>
                    <span>•</span>
                    <span>{exercise.topic.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ❌ SAI: Preview cho học sinh
<div>
  <p>Thời gian làm bài: 60 phút</p> {/* ❌ Không có trong Phase 1 */}
  <p>Điểm tối đa: 10</p> {/* ❌ Không có scoring system */}
</div>
```

## Result & Comment Entry Guidelines

Tài liệu này mô tả cách ghi nhận kết quả và nhận xét trong Phase 1. Đây là flow **chạm trực tiếp đến học sinh** (dù học sinh không login), nên cần tuân thủ nghiêm ngặt Phase 1 Law.

### Nguyên tắc cơ bản

#### 1. Result Entry Patterns

**Cấu trúc dữ liệu:**
- Result gắn với: `assignment_id`, `student_id`, `exercise_id`
- Mỗi học sinh có kết quả cho từng exercise trong ExerciseSet
- Không có aggregation hoặc calculation tự động

**Input Pattern:**
```typescript
// ✅ ĐÚNG: Result entry per student, per exercise
interface ResultEntryProps {
  assignment: Assignment;
  student: Student;
  exercises: Exercise[];
}

function ResultEntryForm({ assignment, student, exercises }: ResultEntryProps) {
  const [results, setResults] = useState<Record<string, ResultValue>>({});

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{student.name}</h3>
      
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bài {exercises.indexOf(exercise) + 1}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {exercise.content.substring(0, 80)}...
              </p>
            </div>
            
            {/* Result Input - Điểm số HOẶC Đạt/Không đạt */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`result-type-${exercise.id}`}
                  value="score"
                  checked={results[exercise.id]?.type === 'score'}
                  onChange={() => {
                    setResults(prev => ({
                      ...prev,
                      [exercise.id]: { type: 'score', value: '' },
                    }));
                  }}
                />
                <span className="text-sm">Điểm số</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`result-type-${exercise.id}`}
                  value="pass_fail"
                  checked={results[exercise.id]?.type === 'pass_fail'}
                  onChange={() => {
                    setResults(prev => ({
                      ...prev,
                      [exercise.id]: { type: 'pass_fail', value: null },
                    }));
                  }}
                />
                <span className="text-sm">Đạt / Không đạt</span>
              </label>
            </div>

            {/* Input field dựa trên type */}
            {results[exercise.id]?.type === 'score' && (
              <input
                type="number"
                value={results[exercise.id]?.value || ''}
                onChange={(e) => {
                  setResults(prev => ({
                    ...prev,
                    [exercise.id]: {
                      type: 'score',
                      value: e.target.value,
                    },
                  }));
                }}
                className="mt-2 w-24 px-2 py-1 border rounded"
                placeholder="Điểm"
              />
            )}

            {results[exercise.id]?.type === 'pass_fail' && (
              <select
                value={results[exercise.id]?.value || ''}
                onChange={(e) => {
                  setResults(prev => ({
                    ...prev,
                    [exercise.id]: {
                      type: 'pass_fail',
                      value: e.target.value,
                    },
                  }));
                }}
                className="mt-2 px-2 py-1 border rounded"
              >
                <option value="">Chọn</option>
                <option value="pass">Đạt</option>
                <option value="fail">Không đạt</option>
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ❌ SAI: Auto-calculation
<div>
  <p>Tổng điểm: {calculateTotal(results)}</p> {/* ❌ Không được tính tổng */}
  <p>Trung bình: {calculateAverage(results)}</p> {/* ❌ Không được tính trung bình */}
</div>
```

**Forbidden Patterns:**
```typescript
// ❌ SAI: Aggregation
const totalScore = results.reduce((sum, r) => sum + r.value, 0);

// ❌ SAI: Comparison
const classAverage = calculateClassAverage(results);
const studentRank = getStudentRank(studentId, results);

// ❌ SAI: Auto-grading
if (score >= 8) {
  return 'Giỏi'; // ❌ Không được phân loại
}
```

#### 2. Comment Entry Patterns

**Nhận xét thủ công:**
```typescript
// ✅ ĐÚNG: Comment entry tự do
function CommentInput({ assignmentId, studentId, exerciseId }: CommentInputProps) {
  const [comment, setComment] = useState('');
  const [aiSuggestion, setAISuggestion] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        Nhận xét {exerciseId ? `(cho bài ${exerciseId})` : '(cho toàn bộ đề)'}
      </label>
      
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full min-h-[100px] p-3 border rounded-lg"
        placeholder="Nhập nhận xét cho học sinh..."
      />

      {/* AI Suggestion - optional */}
      {aiSuggestion && (
        <AICommentSuggestion
          suggestion={aiSuggestion}
          onUse={() => {
            setComment(aiSuggestion);
            setAISuggestion(null);
          }}
          onDismiss={() => setAISuggestion(null)}
        />
      )}

      <button
        onClick={handleRequestAISuggestion}
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
      >
        <SparklesIcon className="h-4 w-4" />
        <span>Gợi ý nhận xét</span>
      </button>
    </div>
  );
}

// ❌ SAI: Template hoặc auto-fill
<textarea
  value={getTemplateComment(result)} // ❌ Không có template
  placeholder={getAutoSuggestion(result)} // ❌ Không auto-fill
/>
```

**AI Comment Suggestion:**
```typescript
// ✅ ĐÚNG: AI comment suggestion pattern
function AICommentSuggestion({
  suggestion,
  onUse,
  onDismiss,
}: {
  suggestion: string;
  onUse: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="border-2 border-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <SparklesIcon className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
          Gợi ý nhận xét (AI)
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
        {suggestion}
      </p>
      <div className="flex gap-2">
        <button
          onClick={onUse}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Sử dụng gợi ý
        </button>
        <button
          onClick={onDismiss}
          className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
}

// ❌ SAI: AI auto-apply
useEffect(() => {
  if (aiSuggestion) {
    setComment(aiSuggestion); // ❌ Không được auto-apply
  }
}, [aiSuggestion]);
```

#### 3. Result Entry Screen Layout

**Cấu trúc màn hình:**
```typescript
// ✅ ĐÚNG: Result entry screen layout
export default function ResultEntryScreen({ assignmentId }: { assignmentId: string }) {
  const { data: assignment } = useQuery(['assignment', assignmentId], () =>
    getAssignment(assignmentId)
  );
  const { data: students } = useQuery(['class-students', assignment.class_id], () =>
    getClassStudents(assignment.class_id)
  );
  const { data: exercises } = useQuery(['exercise-set', assignment.exercise_set_id], () =>
    getExerciseSetExercises(assignment.exercise_set_id)
  );

  return (
    <div className="space-y-6">
      {/* Header - Read-only info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Ghi nhận kết quả</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>Lớp: {assignment.class.name}</p>
          <p>Đề bài: {assignment.exercise_set.title}</p>
          <p>
            <ExerciseSetIntentBadge intent={assignment.exercise_set.intent} />
          </p>
        </div>
      </div>

      {/* Per-student result entry */}
      <div className="space-y-6">
        {students?.map((student) => (
          <StudentResultEntry
            key={student.id}
            student={student}
            exercises={exercises || []}
            assignmentId={assignmentId}
          />
        ))}
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveResults}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Lưu kết quả
        </button>
      </div>
    </div>
  );
}

function StudentResultEntry({
  student,
  exercises,
  assignmentId,
}: {
  student: Student;
  exercises: Exercise[];
  assignmentId: string;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {student.name}
      </h3>

      {/* Results table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Bài</th>
              <th className="text-left p-2">Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={exercise.id} className="border-b">
                <td className="p-2">
                  <div>
                    <p className="font-medium">Bài {index + 1}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.content.substring(0, 60)}...
                    </p>
                  </div>
                </td>
                <td className="p-2">
                  <ResultInput
                    assignmentId={assignmentId}
                    studentId={student.id}
                    exerciseId={exercise.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comment section */}
      <div>
        <CommentInput
          assignmentId={assignmentId}
          studentId={student.id}
        />
      </div>
    </div>
  );
}

// ❌ SAI: Tổng hợp hoặc so sánh
<div>
  <h3>Tổng kết lớp</h3>
  <p>Trung bình: {classAverage}</p> {/* ❌ Không được tổng hợp */}
  <p>Học sinh giỏi nhất: {topStudent}</p> {/* ❌ Không được so sánh */}
</div>
```

#### 4. Comment Display Patterns

**Khi hiển thị comments đã lưu:**

```typescript
// ✅ ĐÚNG: Comment display (read-only khi đã lưu)
function CommentDisplay({ comment }: { comment: Comment }) {
  if (!comment) {
    return (
      <div className="text-sm text-gray-500 italic">
        Chưa có nhận xét
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nhận xét
          </span>
          {comment.isAIGenerated && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <SparklesIcon className="h-3 w-3 mr-1" />
              Gợi ý (AI)
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500">
          {formatDate(comment.createdAt)}
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {comment.content}
      </p>
    </div>
  );
}

// ✅ ĐÚNG: Comment display trong Result Entry (có thể edit)
function StudentResultEntryWithComment({
  student,
  exercises,
  assignmentId,
  existingComment,
}: {
  student: Student;
  exercises: Exercise[];
  assignmentId: string;
  existingComment?: Comment;
}) {
  const [isEditingComment, setIsEditingComment] = useState(!existingComment);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{student.name}</h3>

      {/* Results table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Bài</th>
              <th className="text-left p-2">Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={exercise.id} className="border-b">
                <td className="p-2">
                  <div>
                    <p className="font-medium">Bài {index + 1}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exercise.content.substring(0, 60)}...
                    </p>
                  </div>
                </td>
                <td className="p-2">
                  <ResultInput
                    assignmentId={assignmentId}
                    studentId={student.id}
                    exerciseId={exercise.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comment section */}
      <div>
        {isEditingComment ? (
          <CommentInput
            assignmentId={assignmentId}
            studentId={student.id}
            initialValue={existingComment?.content}
            onSave={() => setIsEditingComment(false)}
            onCancel={() => setIsEditingComment(false)}
          />
        ) : (
          <div>
            {existingComment ? (
              <div className="space-y-2">
                <CommentDisplay comment={existingComment} />
                <button
                  onClick={() => setIsEditingComment(true)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Chỉnh sửa nhận xét
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-2">Chưa có nhận xét</p>
                <button
                  onClick={() => setIsEditingComment(true)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Thêm nhận xét
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ❌ SAI: Comment display với analytics
<div>
  <p>Nhận xét trung bình: 50 từ</p> {/* ❌ Không có analytics */}
  <p>Nhận xét dài nhất: 200 từ</p> {/* ❌ Không có analytics */}
</div>
```

**Lưu ý:**
- Comments đã lưu hiển thị read-only với option edit
- Nếu comment được tạo từ AI suggestion → hiển thị badge "Gợi ý (AI)"
- Không có analytics về comments (độ dài, số lượng, etc.)

## Form & Validation Patterns

Tài liệu này mô tả patterns cho forms trong Phase 1, bao gồm validation, error handling, và user feedback.

### Nguyên tắc cơ bản

#### 1. Class Creation Form

**Fields:**
- **Tên lớp** (required): Text input, min 1 char, max 100 chars
- **Môn học** (required): Select từ seed data (read-only)
- **Mô tả lớp** (optional): Textarea, max 500 chars
- **Ghi chú lớp** (optional): Textarea, không giới hạn

**Implementation:**
```typescript
// ✅ ĐÚNG: Class creation form
interface ClassFormData {
  name: string;
  subjectId: string;
  description?: string;
  note?: string;
}

function ClassCreateForm() {
  const [formData, setFormData] = useState<ClassFormData>({
    name: '',
    subjectId: '',
    description: '',
    note: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ClassFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên lớp không được để trống';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Tên lớp không được vượt quá 100 ký tự';
    }

    if (!formData.subjectId) {
      newErrors.subjectId = 'Vui lòng chọn môn học';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Mô tả không được vượt quá 500 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createClass(formData);
      router.push('/classes');
    } catch (error) {
      showError('Không thể tạo lớp. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tên lớp */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tên lớp <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={cn(
            "w-full px-3 py-2 border rounded-lg",
            errors.name ? "border-red-500" : "border-gray-300"
          )}
          placeholder="Ví dụ: Lớp 6A, Toán nâng cao..."
          maxLength={100}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Môn học */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Môn học <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.subjectId}
          onChange={(e) => setFormData(prev => ({ ...prev, subjectId: e.target.value }))}
          className={cn(
            "w-full px-3 py-2 border rounded-lg",
            errors.subjectId ? "border-red-500" : "border-gray-300"
          )}
        >
          <option value="">Chọn môn học</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {errors.subjectId && (
          <p className="mt-1 text-sm text-red-600">{errors.subjectId}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Môn học được định nghĩa sẵn bởi hệ thống
        </p>
      </div>

      {/* Mô tả lớp */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Mô tả lớp
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className={cn(
            "w-full px-3 py-2 border rounded-lg",
            errors.description ? "border-red-500" : "border-gray-300"
          )}
          placeholder="Mô tả ngắn về lớp học..."
          rows={3}
          maxLength={500}
        />
        <div className="mt-1 flex justify-between">
          {errors.description ? (
            <p className="text-sm text-red-600">{errors.description}</p>
          ) : (
            <span></span>
          )}
          <p className="text-xs text-gray-500">
            {formData.description.length}/500
          </p>
        </div>
      </div>

      {/* Ghi chú lớp */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Ghi chú lớp
        </label>
        <textarea
          value={formData.note}
          onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Ghi chú cá nhân cho giáo viên..."
          rows={4}
        />
        <p className="mt-1 text-xs text-gray-500">
          Ghi chú chỉ hiển thị cho bạn, dùng để lưu ý cá nhân
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Đang tạo...' : 'Tạo lớp'}
        </button>
      </div>
    </form>
  );
}

// ❌ SAI: AI gợi ý hoặc template
<div>
  <button onClick={requestAIClassName}>AI gợi ý tên lớp</button> {/* ❌ Không có trong Phase 1 */}
  <select>
    <option>Template lớp mẫu</option> {/* ❌ Không có template */}
  </select>
</div>
```

#### 2. Exercise Creation Form

**Fields:**
- **Nội dung** (required): Rich text / Markdown editor
- **Môn học** (required): Select từ seed data (read-only)
- **Topic** (required): Select từ read-only taxonomy (1 topic chính)
- **Độ khó** (optional): Select hoặc input (metadata only)
- **Loại bài** (optional): Select `PRACTICE` / `QUIZ` (metadata only)

**Implementation:**
```typescript
// ✅ ĐÚNG: Exercise creation form
function ExerciseCreateForm() {
  const [content, setContent] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [type, setType] = useState<'PRACTICE' | 'QUIZ' | ''>('');

  const { data: subjects } = useQuery(['subjects'], getSubjects);
  const { data: topics } = useQuery(['topics', subjectId], () =>
    getTopicsBySubject(subjectId),
    { enabled: !!subjectId }
  );

  const validate = (): boolean => {
    if (!content.trim()) {
      showError('Nội dung bài tập không được để trống');
      return false;
    }
    if (!subjectId) {
      showError('Vui lòng chọn môn học');
      return false;
    }
    if (!topicId) {
      showError('Vui lòng chọn topic');
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validate()) return;

    await createExercise({
      content,
      subjectId,
      topicId,
      difficulty: difficulty || undefined,
      type: type || undefined,
      status: 'DRAFT',
    });
  };

  const handleApprove = async () => {
    if (!validate()) return;

    if (!confirm('Bạn có chắc chắn muốn duyệt bài tập này? Bài tập sau khi duyệt có thể dùng cho lớp của bạn.')) {
      return;
    }

    await createExercise({
      content,
      subjectId,
      topicId,
      difficulty: difficulty || undefined,
      type: type || undefined,
      status: 'APPROVED',
    });
  };

  return (
    <form className="space-y-6">
      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Nội dung bài tập <span className="text-red-500">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[300px] p-4 border rounded-lg"
          placeholder="Nhập nội dung bài tập..."
          required
        />
      </div>

      {/* Metadata Panel */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Môn học <span className="text-red-500">*</span>
          </label>
          <select
            value={subjectId}
            onChange={(e) => {
              setSubjectId(e.target.value);
              setTopicId(''); // Reset topic khi đổi môn
            }}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Chọn môn học</option>
            {subjects?.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Topic <span className="text-red-500">*</span>
          </label>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            disabled={!subjectId}
            required
          >
            <option value="">Chọn topic</option>
            {topics?.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          {!subjectId && (
            <p className="mt-1 text-xs text-gray-500">
              Vui lòng chọn môn học trước
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Độ khó
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Chọn độ khó</option>
            <option value="EASY">Dễ</option>
            <option value="MEDIUM">Trung bình</option>
            <option value="HARD">Khó</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Chỉ là metadata, không ảnh hưởng đến logic hệ thống
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Loại bài
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Chọn loại bài</option>
            <option value="PRACTICE">Luyện tập</option>
            <option value="QUIZ">Kiểm tra</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Chỉ là metadata, không ảnh hưởng đến logic hệ thống
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-lg"
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={handleSaveDraft}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Lưu nháp
        </button>
        <button
          type="button"
          onClick={handleApprove}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Duyệt bài
        </button>
      </div>
    </form>
  );
}

// ❌ SAI: AI tự chọn metadata
useEffect(() => {
  if (content) {
    // ❌ Không được AI tự chọn topic/độ khó
    const suggestedTopic = await aiSuggestTopic(content);
    setTopicId(suggestedTopic);
  }
}, [content]);
```

#### 3. Student Management Form

**Fields:**
- **Tên học sinh** (required): Text input, min 1 char
- **Ghi chú** (optional): Textarea

**Implementation:**
```typescript
// ✅ ĐÚNG: Student creation form (minimal)
function StudentCreateForm({ classId }: { classId: string }) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      showError('Tên học sinh không được để trống');
      return;
    }

    await createStudent({
      classId,
      name: name.trim(),
      note: note.trim() || undefined,
    });
    
    // Close modal hoặc reset form
    setName('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Tên học sinh <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Nhập tên hoặc biệt danh"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Ghi chú
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ghi chú về học sinh (tùy chọn)..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-lg"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Thêm học sinh
        </button>
      </div>
    </form>
  );
}

// ❌ SAI: Thêm fields không cần thiết
<form>
  <input name="email" /> {/* ❌ Không có email */}
  <input name="phone" /> {/* ❌ Không có phone */}
  <input name="grade" /> {/* ❌ Không có grade */}
  <button>Tạo tài khoản</button> {/* ❌ Không có account creation */}
</form>
```

#### 4. Validation Messages Pattern

**Quy tắc:**
- Messages trung lập, kỹ thuật
- Không có "gợi ý sư phạm" hoặc "nên làm thế này"
- Error messages rõ ràng, actionable

**Pattern:**
```typescript
// ✅ ĐÚNG: Validation messages trung lập
const validationMessages = {
  name_required: 'Tên lớp không được để trống',
  name_too_long: 'Tên lớp không được vượt quá 100 ký tự',
  subject_required: 'Vui lòng chọn môn học',
  content_required: 'Nội dung bài tập không được để trống',
};

// ❌ SAI: Validation messages có gợi ý sư phạm
const validationMessages = {
  name_required: 'Bạn nên đặt tên lớp dễ nhớ, ví dụ: "Lớp 6A Toán"', // ❌ Có gợi ý
  content_required: 'Nội dung bài tập nên có ít nhất 3 câu hỏi', // ❌ Có gợi ý
};
```

#### 4. ExerciseSet Creation & Editing Form

**Fields:**
- **Tiêu đề** (required): Text input, min 1 char, max 200 chars
- **Mô tả** (optional): Textarea, max 1000 chars
- **Mục đích** (optional): Select `PRACTICE` / `REVIEW` / `SURVEY` / `TEST` (chỉ metadata)
- **Ghi chú cho giáo viên** (optional): Textarea, không giới hạn
- **Danh sách bài tập** (required): Multi-select từ APPROVED exercises

**Implementation:**
```typescript
// ✅ ĐÚNG: ExerciseSet creation form
interface ExerciseSetFormData {
  title: string;
  description?: string;
  intent?: 'PRACTICE' | 'REVIEW' | 'SURVEY' | 'TEST';
  noteForTeacher?: string;
  exerciseIds: string[];
}

function ExerciseSetCreateForm() {
  const { teacherId } = useAuth();
  const [formData, setFormData] = useState<ExerciseSetFormData>({
    title: '',
    description: '',
    intent: undefined,
    noteForTeacher: '',
    exerciseIds: [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ExerciseSetFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chỉ lấy APPROVED exercises
  const { data: exercises } = useQuery({
    queryKey: ['exercises', teacherId, 'APPROVED'],
    queryFn: () => getExercises(teacherId, { status: 'APPROVED' }),
  });

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Tiêu đề không được vượt quá 200 ký tự';
    }

    if (formData.exerciseIds.length === 0) {
      newErrors.exerciseIds = 'Vui lòng chọn ít nhất một bài tập';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Mô tả không được vượt quá 1000 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createExerciseSet(formData);
      router.push('/exercise-sets');
    } catch (error) {
      showError('Không thể tạo đề bài. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tiêu đề */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tiêu đề <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className={cn(
            "w-full px-3 py-2 border rounded-lg",
            errors.title ? "border-red-500" : "border-gray-300"
          )}
          placeholder="Ví dụ: Đề ôn tập chương Phân số"
          maxLength={200}
          required
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Mô tả */}
      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className={cn(
            "w-full px-3 py-2 border rounded-lg",
            errors.description ? "border-red-500" : "border-gray-300"
          )}
          placeholder="Mô tả ngắn về đề bài..."
          rows={3}
          maxLength={1000}
        />
        <div className="mt-1 flex justify-between">
          {errors.description ? (
            <p className="text-sm text-red-600">{errors.description}</p>
          ) : (
            <span></span>
          )}
          <p className="text-xs text-gray-500">
            {formData.description.length}/1000
          </p>
        </div>
      </div>

      {/* Mục đích (optional metadata) */}
      <div>
        <label className="block text-sm font-medium mb-1">Mục đích</label>
        <select
          value={formData.intent || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, intent: e.target.value as any || undefined }))}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="">Chọn mục đích (tùy chọn)</option>
          <option value="PRACTICE">Luyện tập</option>
          <option value="REVIEW">Ôn tập</option>
          <option value="SURVEY">Khảo sát</option>
          <option value="TEST">Kiểm tra</option>
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Chỉ là metadata mô tả, không ảnh hưởng đến logic hệ thống
        </p>
      </div>

      {/* Ghi chú cho giáo viên */}
      <div>
        <label className="block text-sm font-medium mb-1">Ghi chú cho giáo viên</label>
        <textarea
          value={formData.noteForTeacher}
          onChange={(e) => setFormData(prev => ({ ...prev, noteForTeacher: e.target.value }))}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ghi chú cá nhân cho giáo viên..."
          rows={4}
        />
        <p className="mt-1 text-xs text-gray-500">
          Ghi chú chỉ hiển thị cho bạn, dùng để lưu ý cá nhân
        </p>
      </div>

      {/* Chọn bài tập - Phải dùng Page Component (phức tạp) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Danh sách bài tập <span className="text-red-500">*</span>
        </label>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          {formData.exerciseIds.length === 0 ? (
            <p className="text-sm text-gray-500 mb-2">Chưa chọn bài tập nào</p>
          ) : (
            <div className="space-y-2 mb-2">
              {formData.exerciseIds.map(id => {
                const exercise = exercises?.find(e => e.id === id);
                return exercise ? (
                  <div key={id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-sm">{exercise.content.substring(0, 60)}...</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        exerciseIds: prev.exerciseIds.filter(eid => eid !== id),
                      }))}
                      className="text-red-600 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
          <button
            type="button"
            onClick={() => router.push(`/exercise-sets/create/select-exercises?from=create&selected=${formData.exerciseIds.join(',')}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {formData.exerciseIds.length === 0 ? 'Chọn bài tập' : 'Chỉnh sửa danh sách'}
          </button>
        </div>
        {errors.exerciseIds && (
          <p className="mt-1 text-sm text-red-600">{errors.exerciseIds}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Chỉ có thể chọn bài tập đã duyệt (APPROVED)
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-lg"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Đang tạo...' : 'Tạo đề bài'}
        </button>
      </div>
    </form>
  );
}

// ❌ SAI: AI gợi ý hoặc template
<div>
  <button onClick={requestAIExerciseSet}>AI tạo đề bài mẫu</button> {/* ❌ Không có */}
  <select>
    <option>Template đề bài mẫu</option> {/* ❌ Không có template */}
  </select>
</div>
```

**Lưu ý:**
- Chọn bài tập phải dùng **Page Component** (không phải Modal) vì cần filter, search, pagination
- Chỉ hiển thị APPROVED exercises
- Intent chỉ là metadata, không enforce logic

#### 5. Assignment Creation Form (Flow C - Gán ExerciseSet cho Class)

**Fields:**
- **Lớp học** (required): Select từ danh sách lớp của giáo viên
- **Đề bài** (required): Select từ danh sách ExerciseSet của giáo viên

**Implementation:**
```typescript
// ✅ ĐÚNG: Assignment creation form (Flow C)
function AssignExerciseSetForm({ classId: string | null }) {
  const { teacherId } = useAuth();
  const [selectedClassId, setSelectedClassId] = useState<string>(classId || '');
  const [selectedExerciseSetId, setSelectedExerciseSetId] = useState<string>('');
  const [errors, setErrors] = useState<{ classId?: string; exerciseSetId?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: classes } = useQuery({
    queryKey: ['classes', teacherId],
    queryFn: () => getClasses(teacherId),
  });

  const { data: exerciseSets } = useQuery({
    queryKey: ['exercise-sets', teacherId],
    queryFn: () => getExerciseSets(teacherId),
  });

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!selectedClassId) {
      newErrors.classId = 'Vui lòng chọn lớp';
    }

    if (!selectedExerciseSetId) {
      newErrors.exerciseSetId = 'Vui lòng chọn đề bài';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createAssignment({
        classId: selectedClassId,
        exerciseSetId: selectedExerciseSetId,
      });
      router.push(`/classes/${selectedClassId}`);
    } catch (error) {
      showError('Không thể gán đề bài. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Chọn lớp */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Lớp học <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className={cn(
            "w-full px-3 py-2 border rounded-lg",
            errors.classId ? "border-red-500" : "border-gray-300"
          )}
          required
        >
          <option value="">Chọn lớp</option>
          {classes?.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.subject.name})
            </option>
          ))}
        </select>
        {errors.classId && (
          <p className="mt-1 text-sm text-red-600">{errors.classId}</p>
        )}
      </div>

      {/* Chọn đề bài */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Đề bài <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedExerciseSetId}
          onChange={(e) => setSelectedExerciseSetId(e.target.value)}
          className={cn(
            "w-full px-3 py-2 border rounded-lg",
            errors.exerciseSetId ? "border-red-500" : "border-gray-300"
          )}
          required
        >
          <option value="">Chọn đề bài</option>
          {exerciseSets?.map(es => (
            <option key={es.id} value={es.id}>
              {es.title} ({es.exercises.length} bài tập)
            </option>
          ))}
        </select>
        {errors.exerciseSetId && (
          <p className="mt-1 text-sm text-red-600">{errors.exerciseSetId}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Chỉ hiển thị đề bài của bạn
        </p>
      </div>

      {/* Preview ExerciseSet (optional, nhưng nên có) */}
      {selectedExerciseSetId && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
          <ExerciseSetPreview
            exerciseSet={exerciseSets?.find(es => es.id === selectedExerciseSetId)}
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-lg"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Đang gán...' : 'Gán đề bài'}
        </button>
      </div>
    </form>
  );
}

// ❌ SAI: Gán DRAFT exercises hoặc bulk assign không kiểm soát
<button onClick={() => assignToAllClasses(exerciseSetId)}>
  Gán cho tất cả lớp {/* ❌ Không có bulk assign */}
</button>
```

**Lưu ý:**
- Form này có thể dùng Modal nếu đơn giản (2 selects)
- Nếu cần preview chi tiết ExerciseSet → nên dùng Page Component
- Không có bulk assign hoặc auto-assign

## Navigation & Flow Patterns

Tài liệu này mô tả cấu trúc navigation và flow patterns trong Phase 1. Navigation phải tuân thủ nghiêm ngặt dependencies giữa các flows.

### Nguyên tắc cơ bản

#### 1. Navigation Structure (Phase 1)

**Cấu trúc navigation duy nhất:**

```
Login
  ↓
Class List (Entry point)
  ├─ Create Class (Flow A)
  ├─ Class Detail
  │    ├─ Student List
  │    ├─ Exercise Usage (Flow C)
  │    └─ Class Notes
  ↓
Exercise List
  ├─ Create Exercise (Flow B)
  │    ├─ Method Selection (Manual / AI)
  │    └─ Exercise Editor
  └─ Exercise Detail / Edit
```

**Implementation:**
```typescript
// ✅ ĐÚNG: Navigation structure
// app/layout.tsx hoặc navigation component
export default function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6">
          <Link href="/classes" className="px-3 py-2 hover:bg-gray-100 rounded">
            Lớp học
          </Link>
          <Link href="/exercises" className="px-3 py-2 hover:bg-gray-100 rounded">
            Bài tập
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ❌ SAI: Navigation có items không phù hợp Phase 1
<nav>
  <Link href="/dashboard">Dashboard</Link> {/* ❌ Không có dashboard */}
  <Link href="/reports">Báo cáo</Link> {/* ❌ Không có reports */}
  <Link href="/students">Học sinh</Link> {/* ❌ Students không có route riêng */}
</nav>
```

#### 2. Flow Dependencies

**Quy tắc:**
- Flow B (Exercise Creation) yêu cầu có Class (Flow A)
- Flow C (Exercise Usage) yêu cầu có Exercise APPROVED (Flow B)
- Không có shortcut bỏ qua dependencies

**Dependency Checks:**
```typescript
// ✅ ĐÚNG: Check dependency trước khi vào flow
export default function ExerciseCreatePage() {
  const { data: classes } = useQuery(['classes'], getClasses);

  // Check dependency: Phải có ít nhất 1 class
  if (!classes || classes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium mb-2">
          Bạn chưa có lớp nào
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Vui lòng tạo lớp trước khi soạn bài tập
        </p>
        <Link
          href="/classes/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tạo lớp ngay
        </Link>
      </div>
    );
  }

  return <ExerciseCreateContent />;
}

// ✅ ĐÚNG: Check exercise status trước khi gán
export default function AssignExerciseSetPage() {
  const { data: exercises } = useQuery(['exercises'], getExercises);
  
  // Chỉ hiển thị APPROVED exercises
  const approvedExercises = exercises?.filter(e => e.status === 'APPROVED') || [];

  if (approvedExercises.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-medium mb-2">
          Bạn chưa có bài tập nào đã duyệt
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Vui lòng duyệt bài tập trước khi gán cho lớp
        </p>
        <Link
          href="/exercises"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Xem danh sách bài tập
        </Link>
      </div>
    );
  }

  return <AssignExerciseSetContent exercises={approvedExercises} />;
}

// ❌ SAI: Không check dependency
export default function ExerciseCreatePage() {
  // ❌ Không check xem có class chưa
  return <ExerciseCreateContent />;
}
```

#### 3. Forbidden Navigation Patterns

**Cấm tuyệt đối:**
```typescript
// ❌ SAI: Shortcut bỏ qua flow
// Class Detail → Exercise Creation (không qua Exercise List)
<button onClick={() => router.push('/exercises/create')}>
  Tạo bài tập ngay {/* ❌ Không có shortcut */}
</button>

// ❌ SAI: Auto-redirect sau actions
const handleApprove = async () => {
  await approveExercise(exerciseId);
  router.push(`/exercises/${exerciseId}/assign`); // ❌ Không auto-redirect
};

// ❌ SAI: Navigation đến pages không tồn tại
<Link href="/dashboard">Dashboard</Link> {/* ❌ Không có dashboard */}
<Link href="/analytics">Phân tích</Link> {/* ❌ Không có analytics */}
<Link href="/students">Học sinh</Link> {/* ❌ Students không có route riêng */}
```

**Allowed Navigation:**
```typescript
// ✅ ĐÚNG: Navigation hợp lệ
// Class List → Class Detail
<Link href={`/classes/${classId}`}>Xem chi tiết</Link>

// Class Detail → Student List (inline, không cần route riêng)
<div>
  <h2>Danh sách học sinh</h2>
  <StudentList classId={classId} />
</div>

// Exercise List → Exercise Detail
<Link href={`/exercises/${exerciseId}`}>Xem chi tiết</Link>

// Exercise Detail → Edit (same route, edit mode)
<button onClick={() => setEditMode(true)}>Chỉnh sửa</button>

// Class Detail → Assign ExerciseSet (Flow C)
<Link href={`/classes/${classId}/assign-exercise-set`}>
  Gán bài tập
</Link>
```

## Search & Filter Patterns

Tài liệu này mô tả patterns cho search và filter trong Phase 1. Search/filter phải tuân thủ Phase 1 scope và không được có analytics hoặc insights.

### Nguyên tắc cơ bản

#### 1. Filter Scope (Phase 1)

**Allowed Filters:**
- Subject (môn học) - từ seed data
- Topic - từ read-only taxonomy
- Status (DRAFT/APPROVED) - cho Exercise
- Intent (PRACTICE/REVIEW/SURVEY/TEST) - cho ExerciseSet (chỉ metadata)

**Forbidden Filters:**
- ❌ Usage count / Popularity
- ❌ Quality score / Rating
- ❌ Created date range (trừ khi cần thiết cho UX)
- ❌ Analytics-based filters

**Implementation Pattern:**
```typescript
// ✅ ĐÚNG: Exercise List filters (Phase 1 scope)
function ExerciseListFilters() {
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [topicFilter, setTopicFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DRAFT' | 'APPROVED'>('ALL');

  const { data: subjects } = useQuery(['subjects'], getSubjects);
  const { data: topics } = useQuery(['topics', subjectFilter], () =>
    getTopicsBySubject(subjectFilter),
    { enabled: !!subjectFilter }
  );

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={subjectFilter}
        onChange={(e) => {
          setSubjectFilter(e.target.value);
          setTopicFilter(''); // Reset topic khi đổi môn
        }}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="">Tất cả môn học</option>
        {subjects?.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      
      <select
        value={topicFilter}
        onChange={(e) => setTopicFilter(e.target.value)}
        className="px-3 py-2 border rounded-lg"
        disabled={!subjectFilter}
      >
        <option value="">Tất cả topic</option>
        {topics?.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as any)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="ALL">Tất cả trạng thái</option>
        <option value="DRAFT">Nháp</option>
        <option value="APPROVED">Đã duyệt</option>
      </select>
    </div>
  );
}

// ❌ SAI: Filter không phù hợp Phase 1
<select>
  <option>Được dùng nhiều nhất</option> {/* ❌ Không có usage tracking */}
  <option>Chất lượng cao</option> {/* ❌ Không có quality score */}
  <option>Được đánh giá tốt</option> {/* ❌ Không có rating */}
</select>
```

#### 2. Search Patterns

**Search Scope:**
- Text search trong content/title (Exercise, ExerciseSet)
- Text search trong name (Class, Student)
- Không có semantic search hoặc AI-powered search

**Implementation Pattern:**
```typescript
// ✅ ĐÚNG: Simple text search với debounce
function ExerciseListSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: exercises } = useQuery({
    queryKey: ['exercises', teacherId, debouncedQuery],
    queryFn: () => getExercises(teacherId, { search: debouncedQuery }),
  });

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Tìm kiếm bài tập..."
        className="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  );
}

// ❌ SAI: AI-powered search
<input
  placeholder="AI tìm kiếm thông minh..." {/* ❌ Không có AI search */}
/>
```

#### 3. Combined Search & Filter

**Pattern:**
```typescript
// ✅ ĐÚNG: Combined search + filter
function ExerciseListWithSearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DRAFT' | 'APPROVED'>('ALL');

  const { data: exercises, isLoading } = useQuery({
    queryKey: ['exercises', teacherId, searchQuery, subjectFilter, statusFilter],
    queryFn: () => getExercises(teacherId, {
      search: searchQuery,
      subjectId: subjectFilter || undefined,
      status: statusFilter === 'ALL' ? undefined : statusFilter,
    }),
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Tìm kiếm bài tập..."
        className="w-full px-4 py-2 border rounded-lg"
      />

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Tất cả môn học</option>
          {subjects?.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="DRAFT">Nháp</option>
          <option value="APPROVED">Đã duyệt</option>
        </select>
      </div>

      {/* Results */}
      {isLoading ? (
        <LoadingState />
      ) : exercises?.length === 0 ? (
        <EmptyState
          title="Không tìm thấy bài tập nào"
          message="Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc"
        />
      ) : (
        <ExerciseList exercises={exercises} />
      )}
    </div>
  );
}
```

## Pagination Patterns

Tài liệu này mô tả patterns cho pagination trong Phase 1. Pagination phải đơn giản, không có analytics hoặc insights.

### Nguyên tắc cơ bản

#### 1. Simple Pagination

**Pattern:**
- Page-based pagination (1, 2, 3, ...)
- Items per page: 10-20 items (tùy context)
- Không có "infinite scroll" hoặc "load more" (trừ khi cần thiết cho UX)

**Implementation Pattern:**
```typescript
// ✅ ĐÚNG: Simple pagination
function ExerciseListWithPagination() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const { data: exercises, isLoading } = useQuery({
    queryKey: ['exercises', teacherId, page],
    queryFn: () => getExercises(teacherId, {
      page,
      limit: itemsPerPage,
    }),
  });

  const totalPages = Math.ceil((exercises?.total || 0) / itemsPerPage);

  return (
    <div className="space-y-4">
      {/* List */}
      <ExerciseList exercises={exercises?.items || []} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "px-3 py-1 border rounded",
                  p === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}

// ❌ SAI: Analytics-based pagination
<div>
  <p>Trang phổ biến nhất: Trang 3</p> {/* ❌ Không có analytics */}
</div>
```

#### 2. Pagination với Search/Filter

**Pattern:**
```typescript
// ✅ ĐÚNG: Pagination với search/filter (reset page khi filter thay đổi)
function ExerciseListWithSearchFilterPagination() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');

  // Reset page khi filter thay đổi
  useEffect(() => {
    setPage(1);
  }, [searchQuery, subjectFilter]);

  const { data: exercises } = useQuery({
    queryKey: ['exercises', teacherId, page, searchQuery, subjectFilter],
    queryFn: () => getExercises(teacherId, {
      page,
      limit: 20,
      search: searchQuery,
      subjectId: subjectFilter || undefined,
    }),
  });

  const totalPages = Math.ceil((exercises?.total || 0) / 20);

  return (
    <div className="space-y-4">
      {/* Search & Filter */}
      <div className="flex gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">Tất cả môn học</option>
          {subjects?.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* List */}
      <ExerciseList exercises={exercises?.items || []} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
```

## UI Component States

Tài liệu này mô tả các reusable components và patterns cho UI states (loading, error, empty) trong frontend Next.js/React.

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

**Examples với Phase 1 context**:
```typescript
// ✅ ĐÚNG: Exercise List loading
export default function ExerciseListPage() {
  const { teacherId } = useAuth();
  const { data: exercises, isLoading } = useQuery({
    queryKey: ['exercises', teacherId],
    queryFn: () => getExercises(teacherId),
  });

  if (isLoading) {
    return <LoadingState message="Đang tải danh sách bài tập..." fullHeight />;
  }

  return <ExerciseListContent exercises={exercises} />;
}

// ✅ ĐÚNG: Class Detail loading
export default function ClassDetailPage({ classId }: { classId: string }) {
  const { data: classData, isLoading } = useQuery({
    queryKey: ['class', classId],
    queryFn: () => getClass(classId),
  });

  if (isLoading) {
    return <LoadingState message="Đang tải thông tin lớp..." fullHeight />;
  }

  return <ClassDetailContent classData={classData} />;
}

// ✅ ĐÚNG: Result Entry loading
export default function ResultEntryPage({ assignmentId }: { assignmentId: string }) {
  const { data: assignment, isLoading } = useQuery({
    queryKey: ['assignment', assignmentId],
    queryFn: () => getAssignment(assignmentId),
  });

  if (isLoading) {
    return <LoadingState message="Đang tải thông tin gán bài..." fullHeight />;
  }

  return <ResultEntryContent assignment={assignment} />;
}
```

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

**Examples với Phase 1 context**:
```typescript
// ✅ ĐÚNG: Exercise List error với retry
export default function ExerciseListPage() {
  const { teacherId } = useAuth();
  const { data: exercises, error, isLoading, refetch } = useQuery({
    queryKey: ['exercises', teacherId],
    queryFn: () => getExercises(teacherId),
  });

  if (isLoading) return <LoadingState />;
  
  if (error) {
    return (
      <ErrorState
        title="Không thể tải danh sách bài tập"
        message={error.message || 'Đã xảy ra lỗi khi tải danh sách bài tập'}
        action={{
          label: 'Thử lại',
          onClick: () => refetch(),
        }}
        fullHeight
      />
    );
  }

  return <ExerciseListContent exercises={exercises} />;
}

// ✅ ĐÚNG: Class Detail error
export default function ClassDetailPage({ classId }: { classId: string }) {
  const { data: classData, error, isLoading } = useQuery({
    queryKey: ['class', classId],
    queryFn: () => getClass(classId),
  });

  if (isLoading) return <LoadingState />;
  
  if (error) {
    return (
      <ErrorState
        title="Không thể tải thông tin lớp"
        message={error.message || 'Lớp học không tồn tại hoặc bạn không có quyền truy cập'}
        action={{
          label: 'Quay lại',
          onClick: () => router.push('/classes'),
        }}
        fullHeight
      />
    );
  }

  return <ClassDetailContent classData={classData} />;
}

// ✅ ĐÚNG: Warning khi ExerciseSet chưa có exercises
export default function ExerciseSetDetailPage({ exerciseSetId }: { exerciseSetId: string }) {
  const { data: exerciseSet, error, isLoading } = useQuery({
    queryKey: ['exercise-set', exerciseSetId],
    queryFn: () => getExerciseSet(exerciseSetId),
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  if (exerciseSet.exercises.length === 0) {
    return (
      <ErrorState
        message="Đề bài này chưa có bài tập nào. Vui lòng thêm bài tập trước khi gán cho lớp."
        variant="warning"
        action={{
          label: 'Thêm bài tập',
          onClick: () => router.push(`/exercise-sets/${exerciseSetId}/edit`),
        }}
      />
    );
  }

  return <ExerciseSetDetailContent exerciseSet={exerciseSet} />;
}
```

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

**Examples với Phase 1 context** (xem chi tiết ở phần "Empty States cho Teacher Context" phía trên):
- Class List empty: Với action "Tạo lớp"
- Exercise List empty: Với action "Tạo bài tập"
- Student List empty (trong Class Detail): Với action "Thêm học sinh"
- ExerciseSet List empty: Với action "Tạo đề bài"
- Assignment List empty: Với action "Gán bài tập"
- Result Entry empty: Không có action (chỉ thông báo)

#### Empty States cho Teacher Context (Phase 1)

Trong Phase 1, empty states phải phù hợp với teacher workflow và không có AI gợi ý tự động.

**1. Class List Empty State:**

```typescript
// ✅ ĐÚNG: Class list empty state cho teacher
{classes.length === 0 && (
  <EmptyState
    title="Bạn chưa có lớp nào"
    message="Tạo lớp đầu tiên để bắt đầu quản lý học sinh và gán bài tập."
    action={{
      label: 'Tạo lớp',
      onClick: () => router.push('/classes/create'),
    }}
  />
)}

// ❌ SAI: Có AI gợi ý hoặc template
<EmptyState
  title="Bạn chưa có lớp nào"
  message="AI có thể giúp bạn tạo lớp mẫu" {/* ❌ Không có AI */}
  action={{
    label: 'AI tạo lớp mẫu', {/* ❌ Không có template */}
    onClick: () => requestAIClass(),
  }}
/>
```

**2. Exercise List Empty State:**

```typescript
// ✅ ĐÚNG: Exercise list empty state
{exercises.length === 0 && (
  <EmptyState
    title="Bạn chưa có bài tập nào"
    message="Tạo bài tập mới để sử dụng cho lớp của bạn."
    action={{
      label: 'Tạo bài tập',
      onClick: () => router.push('/exercises/create'),
    }}
  />
)}

// ❌ SAI: Có AI gợi ý chủ đề
<EmptyState
  title="Bạn chưa có bài tập nào"
  message="AI có thể gợi ý chủ đề phù hợp" {/* ❌ Không có AI gợi ý tự động */}
  action={{
    label: 'Xem gợi ý AI', {/* ❌ Không có */}
    onClick: () => showAISuggestions(),
  }}
/>
```

**3. Student List Empty State (trong Class Detail):**

```typescript
// ✅ ĐÚNG: Student list empty state
{students.length === 0 && (
  <EmptyState
    title="Lớp chưa có học sinh nào"
    message="Thêm học sinh vào lớp để bắt đầu gán bài tập và ghi nhận kết quả."
    action={{
      label: 'Thêm học sinh',
      onClick: () => setShowAddStudentModal(true),
    }}
  />
)}

// ❌ SAI: Có import hoặc bulk add
<EmptyState
  title="Lớp chưa có học sinh nào"
  message="Bạn có thể import danh sách từ file Excel" {/* ❌ Không có import */}
  action={{
    label: 'Import từ Excel', {/* ❌ Không có */}
    onClick: () => importStudents(),
  }}
/>
```

**4. ExerciseSet List Empty State (khi chọn để gán):**

```typescript
// ✅ ĐÚNG: ExerciseSet list empty khi chọn để gán
{exerciseSets.length === 0 && (
  <EmptyState
    title="Bạn chưa có đề bài nào"
    message="Tạo đề bài (ExerciseSet) mới để gán cho lớp."
    action={{
      label: 'Tạo đề bài',
      onClick: () => router.push('/exercise-sets/create'),
    }}
  />
)}

// ❌ SAI: Hiển thị exercises thay vì exerciseSets
<EmptyState
  title="Bạn chưa có bài tập nào"
  message="Tạo bài tập để gán trực tiếp" {/* ❌ Exercise không được gán trực tiếp */}
/>
```

**5. Assignment List Empty State (trong Class Detail):**

```typescript
// ✅ ĐÚNG: Assignment list empty state
{assignments.length === 0 && (
  <EmptyState
    title="Lớp chưa được gán bài tập nào"
    message="Gán đề bài (ExerciseSet) cho lớp để bắt đầu ghi nhận kết quả."
    action={{
      label: 'Gán bài tập',
      onClick: () => router.push(`/classes/${classId}/assign-exercise-set`),
    }}
  />
)}

// ❌ SAI: Có gợi ý tự động
<EmptyState
  title="Lớp chưa được gán bài tập nào"
  message="AI đề xuất gán bài tập 'Phân số - Luyện tập'" {/* ❌ Không có AI đề xuất */}
/>
```

**6. Result Entry Empty State (khi chưa ghi nhận kết quả):**

```typescript
// ✅ ĐÚNG: Result entry empty (không có action)
<div className="text-center py-8">
  <p className="text-gray-600 dark:text-gray-400">
    Chưa ghi nhận kết quả. Vui lòng nhập kết quả cho từng học sinh.
  </p>
</div>

// ❌ SAI: Có auto-fill hoặc template
<EmptyState
  title="Chưa ghi nhận kết quả"
  message="AI có thể tự động điền điểm dựa trên đáp án" {/* ❌ Không có auto-grading */}
  action={{
    label: 'AI tự động chấm', {/* ❌ Không có */}
    onClick: () => autoGrade(),
  }}
/>
```

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

## Modal vs Page Component

Tài liệu này mô tả khi nào nên sử dụng Modal và khi nào nên sử dụng Page Component trong Next.js/React frontend.

### Nguyên tắc cơ bản

**Modal** phù hợp cho:
- **Xác nhận nhanh**: Confirm/Cancel actions (ví dụ: "Xóa đề bài?")
- **Chỉnh sửa nhỏ**: Form đơn giản với ít fields (ví dụ: "Thêm học sinh")
- **Thông báo**: Hiển thị thông tin ngắn gọn
- **Không cần so sánh nhiều nội dung**: User không cần xem nhiều items cùng lúc

**Page Component** phù hợp cho:
- **Task screen phức tạp**: Filter + List + Pagination + Selection
- **Nhiều thành phần**: Danh sách 10-20+ items, mỗi item có nhiều thông tin
- **Cần so sánh**: User cần nhìn, so sánh, kiểm soát quyết định
- **Quyết định quan trọng**: Ảnh hưởng trực tiếp đến dữ liệu (ví dụ: Assignment, Result)
- **Cần context đầy đủ**: User cần thấy toàn bộ viewport để đưa ra quyết định

### Tiêu chí đánh giá

Khi quyết định Modal hay Page, đánh giá theo các tiêu chí sau:

#### 1. Độ phức tạp của nội dung

**Modal nên dùng khi:**
- Form đơn giản: 1-3 input fields
- Danh sách ngắn: < 5 items
- Không có filter hoặc pagination
- Không cần preview nhiều thông tin

**Page nên dùng khi:**
- Form phức tạp: > 5 input fields hoặc nhiều sections
- Danh sách dài: > 10 items
- Có filter, search, pagination
- Có preview section với nhiều thông tin

#### 2. Yêu cầu so sánh và kiểm soát

**Modal nên dùng khi:**
- User không cần so sánh nhiều items
- Quyết định đơn giản, rõ ràng
- Không cần context đầy đủ

**Page nên dùng khi:**
- User cần so sánh nhiều items (ví dụ: chọn bài tập, chọn lớp)
- Quyết định quan trọng, cần kiểm soát kỹ
- Cần context đầy đủ để đưa ra quyết định đúng

#### 3. Tác động đến nghiệp vụ

**Modal nên dùng khi:**
- Thao tác phụ, không ảnh hưởng lớn
- Có thể undo dễ dàng
- Không ảnh hưởng đến dữ liệu quan trọng

**Page nên dùng khi:**
- Thao tác có trọng lượng nghiệp vụ cao
- Ảnh hưởng trực tiếp đến Assignment, Result, Comment
- Khó undo hoặc ảnh hưởng lớn đến workflow

### Ví dụ cụ thể

#### ✅ ĐÚNG: Sử dụng Modal

**Confirm Delete Modal:**
```typescript
// ✅ ĐÚNG: Modal cho confirm action
<ConfirmModal
  isOpen={deleteModal.isOpen}
  onClose={() => setDeleteModal({ isOpen: false })}
  onConfirm={handleDelete}
  variant="danger"
  title="Xác nhận xóa"
  message="Bạn có chắc chắn muốn xóa đề bài này?"
/>
```

**Simple Form Modal (Phase 1 Examples):**
```typescript
// ✅ ĐÚNG: Modal cho thêm học sinh (Phase 1 - minimal fields)
<Modal isOpen={isOpen} onClose={onClose}>
  <form onSubmit={handleSubmit}>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Tên học sinh <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          placeholder="Nhập tên hoặc biệt danh"
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ghi chú</label>
        <textarea
          name="note"
          placeholder="Ghi chú về học sinh (tùy chọn)..."
          rows={3}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose}>Hủy</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Thêm học sinh
        </button>
      </div>
    </div>
  </form>
</Modal>

// ✅ ĐÚNG: Modal cho xác nhận xóa ExerciseSet
<ConfirmModal
  isOpen={deleteModal.isOpen}
  onClose={() => setDeleteModal({ isOpen: false })}
  onConfirm={handleDeleteExerciseSet}
  variant="danger"
  title="Xác nhận xóa đề bài"
  message="Bạn có chắc chắn muốn xóa đề bài này? Hành động này không thể hoàn tác."
/>

// ✅ ĐÚNG: Modal cho edit Class name/description (simple)
<Modal isOpen={isOpen} onClose={onClose}>
  <form onSubmit={handleSubmit}>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Tên lớp</label>
        <input
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mô tả lớp</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose}>Hủy</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Lưu thay đổi
        </button>
      </div>
    </div>
  </form>
</Modal>
```

#### ✅ ĐÚNG: Sử dụng Page Component

**Complex Selection Page (Phase 1 Examples):**
```typescript
// ✅ ĐÚNG: Page cho chọn Exercise cho ExerciseSet (Phase 1)
// Route: /exercise-sets/[id]/edit/exercises
export default function SelectExercisesPage({ params }: { params: { id: string } }) {
  return <SelectExercisesContent exerciseSetId={params.id} />;
}

// SelectExercisesContent.tsx
export default function SelectExercisesContent({ exerciseSetId }: { exerciseSetId: string }) {
  const { teacherId } = useAuth();
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [topicFilter, setTopicFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'APPROVED'>('APPROVED'); // Chỉ hiển thị APPROVED

  const { data: exercises } = useQuery({
    queryKey: ['exercises', teacherId, subjectFilter, topicFilter, statusFilter],
    queryFn: () => getExercises(teacherId, { subjectId: subjectFilter, topicId: topicFilter, status: statusFilter }),
  });

  // Filter: Subject + Topic
  // List: "Đã chọn" + "Chưa chọn" với pagination
  // Selection: Multi-select exercises (chỉ APPROVED)
  // Behavior: Save ngay khi confirm
  return (
    <div className="space-y-6">
      {/* Filter section */}
      <div className="flex gap-4">
        <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="">Tất cả môn học</option>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} disabled={!subjectFilter}>
          <option value="">Tất cả topic</option>
          {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {/* Selected exercises list */}
      <div>
        <h3 className="font-semibold mb-2">Đã chọn ({selectedExerciseIds.length})</h3>
        <div className="space-y-2">
          {selectedExercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} onRemove={() => removeExercise(ex.id)} />
          ))}
        </div>
      </div>

      {/* Available exercises list với pagination */}
      <div>
        <h3 className="font-semibold mb-2">Bài tập có sẵn</h3>
        <ExerciseList
          exercises={exercises}
          selectedIds={selectedExerciseIds}
          onToggleSelect={(id) => toggleExercise(id)}
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <button onClick={() => router.back()}>Hủy</button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
```

**Result Entry Page (Phase 1 - Quan trọng, phải dùng Page):**
```typescript
// ✅ ĐÚNG: Page cho ghi nhận kết quả (Phase 1 - Flow D)
// Route: /assignments/[id]/results
export default function ResultEntryPage({ params }: { params: { id: string } }) {
  return <ResultEntryContent assignmentId={params.id} />;
}

// ResultEntryContent.tsx
export default function ResultEntryContent({ assignmentId }: { assignmentId: string }) {
  const { data: assignment } = useQuery(['assignment', assignmentId], () => getAssignment(assignmentId));
  const { data: students } = useQuery(['class-students', assignment?.class_id], () =>
    getClassStudents(assignment.class_id),
    { enabled: !!assignment }
  );
  const { data: exercises } = useQuery(['exercise-set', assignment?.exercise_set_id], () =>
    getExerciseSetExercises(assignment.exercise_set_id),
    { enabled: !!assignment }
  );

  // Page phức tạp: Per-student, per-exercise result entry
  // Cần context đầy đủ: Xem toàn bộ học sinh và bài tập
  // Quyết định quan trọng: Ảnh hưởng trực tiếp đến Result
  return (
    <div className="space-y-6">
      {/* Header - Read-only info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Ghi nhận kết quả</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>Lớp: {assignment?.class.name}</p>
          <p>Đề bài: {assignment?.exercise_set.title}</p>
        </div>
      </div>

      {/* Per-student result entry */}
      <div className="space-y-6">
        {students?.map((student) => (
          <StudentResultEntry
            key={student.id}
            student={student}
            exercises={exercises || []}
            assignmentId={assignmentId}
          />
        ))}
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button onClick={handleSaveResults} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          Lưu kết quả
        </button>
      </div>
    </div>
  );
}
```

#### ❌ SAI: Dùng Modal cho task phức tạp

```typescript
// ❌ SAI: Modal cho task phức tạp
<Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl">
  <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
    {/* Filter section */}
    {/* Long list with pagination */}
    {/* Nested scroll - UX anti-pattern */}
    {/* Trên mobile: nội dung bị co hẹp */}
  </div>
</Modal>
```

**Vấn đề:**
- Nested scroll (scroll trong scroll)
- Trên mobile: nội dung bị co hẹp, khó sử dụng
- User không thấy đầy đủ context
- Áp lực không gian, dễ chọn sai

### Pattern: Chuyển Modal → Page Component

Khi cần chuyển modal phức tạp sang page component:

#### 1. Tạo Page Structure

**Server Component (page.tsx):**
```typescript
// app/(admin)/exercise-sets/[id]/assign-to-classes/page.tsx
import { Metadata } from 'next';
import AssignToClassesContent from './AssignToClassesContent';

export const metadata: Metadata = {
  title: 'Gán đề bài vào lớp | Tutor Teacher Dashboard',
  description: 'Gán đề bài vào nhiều lớp học',
};

export default function AssignToClassesPage() {
  return <AssignToClassesContent />;
}
```

**Client Component (Content.tsx):**
```typescript
// AssignToClassesContent.tsx
'use client';

import { useParams } from 'next/navigation';
import { useReturnUrl } from '@/hooks/useReturnUrl';

export default function AssignToClassesContent() {
  const params = useParams();
  const exerciseSetId = params.id as string;
  const { goBack } = useReturnUrl(`/exercise-sets/${exerciseSetId}`);

  // Extract logic từ modal
  // Bỏ Modal wrapper
  // Thay onClose() bằng goBack()
  // Thay onSuccess() bằng navigation sau khi save

  return (
    <div className="space-y-6">
      {/* Page content */}
    </div>
  );
}
```

#### 2. Update Parent Component

**Thay modal bằng navigation:**
```typescript
// BEFORE: Mở modal
const [isModalOpen, setIsModalOpen] = useState(false);
<button onClick={() => setIsModalOpen(true)}>Gán vào lớp</button>
<AssignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

// AFTER: Navigate to page
import { useRouter } from 'next/navigation';

const router = useRouter();
<button
  onClick={() => {
    const currentPath = window.location.pathname + window.location.search;
    router.push(`/exercise-sets/${exerciseSetId}/assign-to-classes?from=${encodeURIComponent(currentPath)}`);
  }}
>
  Gán vào lớp
</button>
```

#### 3. Navigation Pattern

**Sử dụng `useReturnUrl` hook:**
```typescript
import { useReturnUrl } from '@/hooks/useReturnUrl';

export default function MyPageContent() {
  const { goBack } = useReturnUrl('/default-route');

  const handleSave = async () => {
    // Save logic
    await saveData();
    // Navigate back after success
    goBack();
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <div>
      {/* Content */}
      <button onClick={handleCancel}>Quay lại</button>
      <button onClick={handleSave}>Lưu</button>
    </div>
  );
}
```

**`useReturnUrl` hook:**
- Hỗ trợ query parameter `from` để quay lại trang trước
- Fallback về browser history nếu không có `from`
- Fallback về default URL nếu không có history

### Best Practices

#### 1. Route Naming

**Pattern:**
- Resource-specific: `/exercise-sets/[id]/assign-to-classes`
- Context-specific: `/classes/[id]/assign-exercise-set`
- Generic: `/assignments/create?classId=xxx` (ít dùng)

**Ví dụ:**
```typescript
// ✅ ĐÚNG: Resource-specific, rõ ràng
/exercise-sets/[id]/assign-to-classes
/classes/[id]/assign-exercise-set
/exercise-sets/[id]/edit/exercises

// ❌ SAI: Generic, không rõ context
/assignments/create?exerciseSetId=xxx&classIds=xxx
```

#### 2. Metadata

**Tất cả pages phải có metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Tên trang | Tutor Teacher Dashboard',
  description: 'Mô tả trang',
};
```

**Xem thêm:** [Page Metadata](./page-metadata.md)

#### 3. Behavior sau khi Save

**Pattern: Save ngay khi confirm (tương tự "Chọn bài tập"):**
```typescript
const handleSave = async () => {
  try {
    setIsSaving(true);
    await saveData();
    showSuccess('Lưu thành công');
    // Navigate back immediately
    goBack();
  } catch (error) {
    showError('Lưu thất bại');
  } finally {
    setIsSaving(false);
  }
};
```

**Không nên:**
- Ở lại page và hiển thị success message (trừ khi cần thiết)
- Yêu cầu user click "Đóng" sau khi save

#### 4. State Management

**Giữ nguyên logic từ modal:**
- Không thay đổi logic, nghiệp vụ, chức năng
- Chỉ thay đổi UI structure (Modal → Page)
- Giữ nguyên API calls và data flow

### Checklist

Khi quyết định Modal hay Page:

- [ ] Đánh giá độ phức tạp: Form đơn giản hay phức tạp?
- [ ] Đánh giá số lượng items: < 5 items hay > 10 items?
- [ ] Đánh giá yêu cầu so sánh: User có cần so sánh nhiều items không?
- [ ] Đánh giá tác động nghiệp vụ: Thao tác phụ hay quyết định quan trọng?
- [ ] Nếu chuyển Modal → Page: Đã tạo page structure với metadata?
- [ ] Nếu chuyển Modal → Page: Đã update parent component để navigate?
- [ ] Nếu chuyển Modal → Page: Đã sử dụng `useReturnUrl` cho navigation?
- [ ] Nếu chuyển Modal → Page: Đã giữ nguyên logic và nghiệp vụ?

### Anti-patterns

#### ❌ Nested Scroll

```typescript
// ❌ SAI: Scroll trong scroll
<Modal>
  <div className="max-h-[90vh] overflow-y-auto">
    <div className="space-y-4">
      {/* Long list */}
    </div>
  </div>
</Modal>
```

**Vấn đề:**
- User scroll trong modal, nhưng page cũng có thể scroll
- Trên mobile: rất khó sử dụng
- Mất context của page bên dưới

**Giải pháp:** Chuyển sang Page Component

#### ❌ Modal quá lớn

```typescript
// ❌ SAI: Modal với max-w-6xl và nhiều nội dung
<Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl">
  {/* Filter + List + Pagination + Preview */}
</Modal>
```

**Vấn đề:**
- Trên laptop nhỏ: modal chiếm hết màn hình
- Trên mobile: nội dung bị co hẹp
- Không phù hợp với bản chất của modal

**Giải pháp:** Chuyển sang Page Component

## Container Boxes Guidelines

Tài liệu này mô tả nguyên tắc sử dụng container boxes trong Next.js/React frontend để tránh over-containerization và cải thiện UI density trên mobile/tablet.

### Nguyên tắc cơ bản

**Tránh over-containerization:**
- **Không bọc container box dư thừa**: Nếu parent đã có spacing, không cần container box riêng
- **Giữ section headers**: Sử dụng section headers với spacing thay vì container boxes
- **Sử dụng spacing classes**: Dùng `space-y-*` classes thay vì container boxes riêng

**Container box chỉ cần thiết khi:**
- **Cần visual separation**: Khi section cần tách biệt rõ ràng với background khác
- **Cần border/shadow riêng**: Khi section cần border hoặc shadow riêng
- **Item-level container**: Container cho từng item trong list (ví dụ: exercise item, student card)

### Vấn đề của Over-containerization

#### 1. Giảm không gian hiển thị

**Ví dụ với nested containers:**
```
Page (padding: 16px)
 └── Container box (padding: 24px, border)
      └── Section container (padding: 12px, border)
           └── Item container (padding: 12px, border)
                └── Content
```

**Trên mobile (375px):**
- Page padding: 16px × 2 = 32px
- Container box padding: 24px × 2 = 48px
- Section container padding: 12px × 2 = 24px
- Item container padding: 12px × 2 = 24px
- **Tổng padding: 128px**
- **Nội dung thực tế: ~247px (66% viewport)**

**Sau khi bỏ container boxes dư thừa:**
- Page padding: 32px
- Item container padding: 24px (cần thiết)
- **Tổng padding: 56px**
- **Nội dung thực tế: ~319px (85% viewport)**
- **Cải thiện: +19% không gian**

#### 2. Visual Clutter

**Vấn đề:**
- Nhiều border và shadow lặp lại
- Padding lặp lại không cần thiết
- Khó phân biệt đâu là nội dung chính

**Giải pháp:**
- Bỏ container boxes dư thừa
- Giữ section headers với spacing
- Sử dụng divider lines hoặc background khác nhau để phân vùng

#### 3. Nested Scroll

**Vấn đề:**
- Container box với `max-h-* overflow-y-auto` trong page scrollable
- User scroll trong container, nhưng page cũng scroll
- Trên mobile: rất khó sử dụng

**Giải pháp:**
- Bỏ container box với scroll
- Sử dụng page scroll tự nhiên

### Pattern: Bỏ Container Boxes Dư Thừa

#### ✅ ĐÚNG: Không có container box dư thừa

```typescript
// ✅ ĐÚNG: ExerciseSet Detail Page (Phase 1) - Không có container box dư thừa
export default function ExerciseSetDetailContent({ exerciseSet }: { exerciseSet: ExerciseSet }) {
  return (
    <div className="space-y-6">
      {/* Section 1 - KHÔNG có container box */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Thông tin đề bài
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tiêu đề</p>
            <p className="font-medium">{exerciseSet.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mục đích</p>
            <ExerciseSetIntentBadge intent={exerciseSet.intent} />
          </div>
        </div>
      </div>

      {/* Section 2 - KHÔNG có container box */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Danh sách bài tập ({exerciseSet.exercises.length})
        </h2>
        <div className="space-y-4">
          {/* Items - chỉ item-level có container box */}
          {exerciseSet.exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-gray-500">{index + 1}.</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {exercise.content.substring(0, 100)}...
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>{exercise.subject.name}</span>
                    <span>•</span>
                    <span>{exercise.topic.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

#### ❌ SAI: Container boxes dư thừa

```typescript
// ❌ SAI: ExerciseSet Detail Page (Phase 1) - Nhiều container boxes lồng nhau
export default function ExerciseSetDetailContent({ exerciseSet }: { exerciseSet: ExerciseSet }) {
  return (
    <div className="space-y-6">
      {/* Container box dư thừa cho section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Thông tin đề bài</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tiêu đề</p>
            <p className="font-medium">{exerciseSet.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mục đích</p>
            <ExerciseSetIntentBadge intent={exerciseSet.intent} />
          </div>
        </div>
      </div>

      {/* Container box dư thừa cho section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Danh sách bài tập</h2>
        <div className="space-y-4">
          {/* Items cũng có container box */}
          {exerciseSet.exercises.map((exercise, index) => (
            <div className="border rounded-lg p-4">
              {/* Item content */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Vấn đề:**
- 2 container boxes lớn không cần thiết
- Padding lặp lại: container có `p-6`, items có `p-4`
- Trên mobile: nội dung bị co hẹp

### Ví dụ cụ thể

#### ✅ ĐÚNG: ResultEntryScreen

```typescript
// ✅ ĐÚNG: Không có container box cho Assignment Info Section
<div className="space-y-6">
  {/* Assignment Info - KHÔNG có container box */}
  <div>
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Thông tin đề bài
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {/* Read-only info */}
    </div>
  </div>

  {/* Students Results List */}
  <div className="space-y-4">
    {students.map((student) => (
      <StudentResultRow student={student} />
    ))}
  </div>
</div>
```

#### ✅ ĐÚNG: StudentResultRow

```typescript
// ✅ ĐÚNG: Không có container box cho student card
export default function StudentResultRow({ student, exercises, results }) {
  return (
    <div>
      {/* Section header */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {student.name}
      </h3>

      {/* Results Table */}
      <div className="mb-4">
        <table>{/* Table content */}</table>
      </div>

      {/* Comment Section */}
      <div>
        <CommentInputWithAI />
      </div>
    </div>
  );
}
```

**Lý do:**
- Parent (`ResultEntryScreen`) đã có `space-y-4` cho list
- Không cần container box riêng cho mỗi student
- Section header đủ để phân biệt

#### ✅ ĐÚNG: ExerciseSetDetailView

```typescript
// ✅ ĐÚNG: Không có container boxes lớn, chỉ item-level containers
<div className="space-y-6">
  {/* Basic Info - KHÔNG có container box */}
  <div>
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Thông tin đề bài
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {/* Info fields */}
    </div>
  </div>

  {/* Exercises List - KHÔNG có container box */}
  <div>
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Danh sách bài tập ({exercises.length})
    </h2>
    <div className="space-y-4">
      {/* Item-level container - CẦN THIẾT */}
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          {/* Exercise content */}
        </div>
      ))}
    </div>
  </div>
</div>
```

**Lý do:**
- Parent context đã có spacing
- Section headers đủ để phân biệt
- Item-level containers cần thiết để tách biệt từng exercise

#### ❌ SAI: Container boxes dư thừa

```typescript
// ❌ SAI: Container boxes dư thừa
<div className="space-y-6">
  {/* Container box dư thừa */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <h2>Thông tin đề bài</h2>
    <div className="grid grid-cols-2 gap-4">
      {/* Content */}
    </div>
  </div>

  {/* Container box dư thừa */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <h2>Danh sách bài tập</h2>
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div className="border rounded-lg p-4">
          {/* Exercise content */}
        </div>
      ))}
    </div>
  </div>
</div>
```

**Vấn đề:**
- 2 container boxes lớn không cần thiết
- Padding `p-6` tốn không gian
- Trên mobile: nội dung bị co hẹp

### Khi nào cần Container Box

#### ✅ CẦN: Item-level containers

```typescript
// ✅ ĐÚNG: Container box cho từng item trong list
<div className="space-y-4">
  {items.map((item) => (
    <div
      key={item.id}
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
    >
      {/* Item content - cần container để tách biệt */}
    </div>
  ))}
</div>
```

**Lý do:**
- Cần tách biệt từng item trong list
- Cần border và padding riêng cho mỗi item
- Visual separation giữa các items

#### ✅ CẦN: Form containers (trong một số trường hợp)

```typescript
// ✅ ĐÚNG: Container box cho form khi cần visual separation
<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
  <h2 className="text-xl font-bold mb-4">Tạo mới</h2>
  <form className="space-y-4">
    {/* Form fields */}
  </form>
</div>
```

**Lưu ý:**
- Chỉ dùng khi form cần tách biệt rõ ràng với context xung quanh
- Nếu form nằm trong page đã có spacing, không cần container box

#### ❌ KHÔNG CẦN: Section containers trong page

```typescript
// ❌ SAI: Container box cho section trong page
<div className="space-y-6">
  <div className="bg-white p-6 rounded-lg shadow">
    <h2>Section 1</h2>
    {/* Read-only content */}
  </div>
</div>
```

**Lý do:**
- Page đã có spacing (`space-y-6`)
- Section header đủ để phân biệt
- Container box chỉ thêm padding dư thừa

### Pattern: Refactor Container Boxes

#### Before: Có container boxes dư thừa

```typescript
// BEFORE: Container boxes dư thừa
<div className="space-y-6">
  {/* Container box dư thừa */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Thông tin đề bài</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label>Tiêu đề</label>
        <p>{exerciseSet.title}</p>
      </div>
      {/* More fields */}
    </div>
  </div>

  {/* Container box dư thừa */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Danh sách bài tập</h2>
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div className="border rounded-lg p-4">
          {/* Exercise content */}
        </div>
      ))}
    </div>
  </div>
</div>
```

#### After: Bỏ container boxes dư thừa

```typescript
// AFTER: Bỏ container boxes dư thừa
<div className="space-y-6">
  {/* Section 1 - KHÔNG có container box */}
  <div>
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Thông tin đề bài
    </h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tiêu đề
        </label>
        <p className="text-gray-900 dark:text-white">{exerciseSet.title}</p>
      </div>
      {/* More fields */}
    </div>
  </div>

  {/* Section 2 - KHÔNG có container box */}
  <div>
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Danh sách bài tập ({exercises.length})
    </h2>
    <div className="space-y-4">
      {/* Item-level container - CẦN THIẾT */}
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          {/* Exercise content */}
        </div>
      ))}
    </div>
  </div>
</div>
```

**Cải thiện:**
- Bỏ 2 container boxes lớn (`bg-white p-6 rounded-lg shadow`)
- Giữ section headers với spacing
- Giữ item-level containers (cần thiết)
- Tăng không gian hiển thị trên mobile/tablet

### Best Practices

#### 1. Sử dụng Spacing Classes

**Thay vì container boxes, sử dụng spacing:**
```typescript
// ✅ ĐÚNG: Sử dụng space-y-* classes
<div className="space-y-6">
  <div>
    <h2>Section 1</h2>
    {/* Content */}
  </div>
  <div>
    <h2>Section 2</h2>
    {/* Content */}
  </div>
</div>

// ❌ SAI: Container boxes cho spacing
<div className="space-y-6">
  <div className="bg-white p-6 rounded-lg shadow">
    <h2>Section 1</h2>
    {/* Content */}
  </div>
  <div className="bg-white p-6 rounded-lg shadow">
    <h2>Section 2</h2>
    {/* Content */}
  </div>
</div>
```

#### 2. Section Headers

**Sử dụng section headers với spacing:**
```typescript
// ✅ ĐÚNG: Section header với spacing
<div>
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
    Section Title
  </h2>
  {/* Content */}
</div>

// ❌ SAI: Container box chỉ để có header
<div className="bg-white p-6 rounded-lg shadow">
  <h2>Section Title</h2>
  {/* Content */}
</div>
```

#### 3. Visual Separation

**Sử dụng divider lines hoặc background khác nhau:**
```typescript
// ✅ ĐÚNG: Divider line để phân vùng
<div className="space-y-6">
  <div>
    <h2>Section 1</h2>
    {/* Content */}
  </div>
  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
    <h2>Section 2</h2>
    {/* Content */}
  </div>
</div>

// ❌ SAI: Container box chỉ để phân vùng
<div className="space-y-6">
  <div className="bg-white p-6 rounded-lg shadow">
    <h2>Section 1</h2>
    {/* Content */}
  </div>
</div>
```

#### 4. Mobile-First Approach

**Ưu tiên không gian hiển thị trên mobile:**
```typescript
// ✅ ĐÚNG: Tối ưu cho mobile
<div className="space-y-6">
  {/* Sections không có container boxes dư thừa */}
  {/* Nội dung chiếm ~85% viewport trên mobile */}
</div>

// ❌ SAI: Nhiều container boxes
<div className="space-y-6">
  <div className="bg-white p-6 rounded-lg shadow">
    {/* Nội dung chỉ chiếm ~66% viewport trên mobile */}
  </div>
</div>
```

### Checklist

Khi refactor container boxes:

- [ ] Đã đánh giá: Container box có cần thiết không?
- [ ] Đã bỏ container boxes dư thừa cho sections
- [ ] Đã giữ section headers với spacing hợp lý
- [ ] Đã giữ item-level containers (nếu cần thiết)
- [ ] Đã sử dụng `space-y-*` classes thay vì container boxes
- [ ] Đã kiểm tra trên mobile: Nội dung có bị co hẹp không?
- [ ] Đã kiểm tra: Có nested scroll không?
- [ ] Đã kiểm tra: Visual separation có đủ rõ không?

### Anti-patterns

#### ❌ Over-containerization

```typescript
// ❌ SAI: Nhiều container boxes lồng nhau
<Page>
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="border rounded-lg p-4">
      <div className="bg-gray-50 p-3 rounded">
        {/* Content - chỉ còn 60% viewport */}
      </div>
    </div>
  </div>
</Page>
```

**Vấn đề:**
- 3 lớp container boxes
- Padding lặp lại nhiều lần
- Nội dung bị co hẹp nghiêm trọng

#### ❌ Container Box cho Read-only Sections

```typescript
// ❌ SAI: Container box cho read-only section
<div className="bg-white p-6 rounded-lg shadow">
  <h2>Thông tin đề bài</h2>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label>Tiêu đề</label>
      <p>{title}</p> {/* Read-only */}
    </div>
  </div>
</div>
```

**Vấn đề:**
- Read-only content không cần container box
- Section header đủ để phân biệt
- Container box chỉ thêm padding dư thừa

**Giải pháp:**
```typescript
// ✅ ĐÚNG: Không có container box
<div>
  <h2 className="text-lg font-semibold mb-4">Thông tin đề bài</h2>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label>Tiêu đề</label>
      <p>{title}</p>
    </div>
  </div>
</div>
```

## Forbidden UI Patterns (Anti-patterns)

Tài liệu này liệt kê các UI patterns **BỊ CẤM TUYỆT ĐỐI** trong Phase 1. Nếu xuất hiện trong code hoặc design → **FAIL Phase 1** và phải refactor ngay.

### 1. Analytics & Dashboard Patterns (CẤM)

**Cấm tuyệt đối các patterns sau:**

#### ❌ Progress Tracking UI

```typescript
// ❌ SAI: Progress bars, completion tracking
<div className="progress-bar">
  <div style={{ width: '60%' }}>60% hoàn thành</div>
</div>

<div className="completion-status">
  <span>Đã hoàn thành 3/5 bài tập</span>
</div>

// ❌ SAI: Progress visualization cho học sinh
<StudentProgressCard>
  <ProgressBar value={75} />
  <p>Tiến độ: 75%</p>
</StudentProgressCard>
```

**Lý do cấm:**
- Phase 1 Law 6.2: "Không đánh giá năng lực", "Không tồn tại theo dõi tiến bộ dài hạn"
- Vi phạm System Law về không suy diễn năng lực học sinh

#### ❌ Charts & Graphs

```typescript
// ❌ SAI: Charts, graphs, visualizations
<LineChart data={progressData} />
<BarChart data={scoreDistribution} />
<PieChart data={topicMastery} />

<div className="statistics">
  <div>Trung bình lớp: 7.5</div>
  <div>Điểm cao nhất: 10</div>
  <div>Điểm thấp nhất: 5</div>
</div>
```

**Lý do cấm:**
- Phase 1 không có analytics
- Vi phạm Phase 1 Law về không phân tích, không tổng hợp

#### ❌ Dashboard Tổng Hợp

```typescript
// ❌ SAI: Dashboard với insights
<Dashboard>
  <SummaryCard title="Tuần này">
    <p>Đã gán 5 bài tập</p>
    <p>Đã chấm 3 bài</p>
  </SummaryCard>
  <InsightCard>
    <p>AI đề xuất: Nên gán thêm bài tập về "Phân số"</p>
  </InsightCard>
</Dashboard>
```

**Lý do cấm:**
- Phase 1 không có dashboard
- UI-Spec Skeleton cấm dashboard tổng hợp

#### ❌ Statistics & Summaries

```typescript
// ❌ SAI: Statistics display
<div className="stats-grid">
  <StatCard label="Tổng bài tập" value={25} />
  <StatCard label="Đã gán" value={18} />
  <StatCard label="Tỷ lệ" value="72%" />
</div>

<div className="summary">
  <p>Lớp này có 15 học sinh, trung bình điểm: 7.8</p>
</div>
```

**Lý do cấm:**
- Phase 1 không có aggregation hoặc calculation
- Result chỉ có giá trị trong ngữ cảnh Assignment cụ thể

### 2. Automation Patterns (CẤM)

**Cấm tuyệt đối các patterns sau:**

#### ❌ Auto-approve / Auto-assign / Auto-save

```typescript
// ❌ SAI: Auto-approve
useEffect(() => {
  if (exercise.content.length > 100) {
    approveExercise(exercise.id); // ❌ Không được auto-approve
  }
}, [exercise.content]);

// ❌ SAI: Auto-assign
const handleCreateExercise = async () => {
  const exercise = await createExercise(data);
  await assignToAllClasses(exercise.id); // ❌ Không được auto-assign
};

// ❌ SAI: Auto-save AI output
const handleAISuggestion = async () => {
  const suggestion = await requestAI();
  await saveExercise(suggestion); // ❌ Không được auto-save
};
```

**Lý do cấm:**
- Phase 1 Law: "Giáo viên luôn là người bấm nút cuối"
- System Law: "Human-in-the-loop" bắt buộc

#### ❌ Background Jobs / Scheduled Tasks

```typescript
// ❌ SAI: Background AI jobs
useEffect(() => {
  const interval = setInterval(() => {
    checkAndGenerateSuggestions(); // ❌ Không có background AI
  }, 60000);
  return () => clearInterval(interval);
}, []);

// ❌ SAI: Scheduled tasks
scheduleTask('daily', () => {
  generateWeeklyReport(); // ❌ Không có scheduled reports
});
```

**Lý do cấm:**
- Phase 1 không có automation ngầm
- Mọi AI chỉ xuất hiện khi giáo viên chủ động yêu cầu

#### ❌ Auto-redirect sau Actions

```typescript
// ❌ SAI: Auto-redirect
const handleApprove = async () => {
  await approveExercise(exerciseId);
  router.push(`/exercises/${exerciseId}/assign`); // ❌ Không auto-redirect
};

const handleSaveResult = async () => {
  await saveResult(result);
  router.push('/dashboard'); // ❌ Không có dashboard
};
```

**Lý do cấm:**
- Giáo viên phải chủ động quyết định bước tiếp theo
- Không được "dẫn dắt" hành vi

### 3. AI Authority Patterns (CẤM)

**Cấm tuyệt đối các patterns sau:**

#### ❌ AI Decision-making UI

```typescript
// ❌ SAI: AI quyết định
<div className="ai-decision">
  <p>AI đã quyết định: Bài tập này phù hợp với lớp 6A</p>
  <button onClick={applyAIDecision}>Áp dụng quyết định</button>
</div>

// ❌ SAI: AI đánh giá
<div className="ai-assessment">
  <p>AI đánh giá: Học sinh này cần cải thiện phần "Phân số"</p>
</div>

// ❌ SAI: AI authority text
<p>AI đã hoàn thiện bài tập</p>
<button>Dùng bài AI đã tạo</button>
```

**Lý do cấm:**
- System Law: "AI không có authority"
- Phase 1 Law: "AI chỉ là trợ lý, không phải giáo viên"

#### ❌ AI Output không Editable

```typescript
// ❌ SAI: AI output locked
<div className="ai-content locked">
  {aiContent}
  <p className="text-xs text-gray-500">Nội dung AI - Không thể chỉnh sửa</p>
</div>

// ❌ SAI: AI auto-apply
useEffect(() => {
  if (aiSuggestion) {
    setContent(aiSuggestion); // ❌ Không được auto-apply
    setLocked(true); // ❌ Không được lock
  }
}, [aiSuggestion]);
```

**Lý do cấm:**
- Phase 1 Law: "AI output luôn editable"
- Giáo viên chịu trách nhiệm 100% nội dung

#### ❌ AI Multi-apply Patterns

```typescript
// ❌ SAI: Apply AI cho nhiều items
<button onClick={() => applyAISuggestionToAll()}>
  Áp dụng gợi ý AI cho tất cả học sinh
</button>

// ❌ SAI: AI batch operations
const handleAIBatchComment = async () => {
  const suggestions = await requestAICommentsForAll(students);
  await saveAllComments(suggestions); // ❌ Không được batch apply
};
```

**Lý do cấm:**
- Mỗi học sinh cần được giáo viên xem xét riêng
- Không được "hàng loạt" mà không kiểm soát

### 4. Student/Parent Portal Patterns (CẤM)

**Cấm tuyệt đối các patterns sau:**

#### ❌ Student Login / Portal

```typescript
// ❌ SAI: Student login
<LoginForm>
  <select>
    <option>Giáo viên</option>
    <option>Học sinh</option> {/* ❌ Không có student login */}
  </select>
</LoginForm>

// ❌ SAI: Student dashboard
<StudentDashboard>
  <MyAssignments />
  <MyProgress />
</StudentDashboard>
```

**Lý do cấm:**
- Scope Phase 1: "Không phục vụ trực tiếp học sinh"
- Phase 1 chỉ có teacher user

#### ❌ Parent Portal / Reporting

```typescript
// ❌ SAI: Parent view
<ParentDashboard>
  <ChildProgress />
  <WeeklyReport />
</ParentDashboard>

// ❌ SAI: Parent notifications
<button onClick={() => sendReportToParent()}>
  Gửi báo cáo cho phụ huynh
</button>
```

**Lý do cấm:**
- Scope Phase 1: "Không phục vụ trực tiếp phụ huynh"
- Phase 1 không có giao tiếp ngoài hệ thống

### 5. Comparison & Ranking Patterns (CẤM)

**Cấm tuyệt đối các patterns sau:**

#### ❌ Student Comparison

```typescript
// ❌ SAI: So sánh học sinh
<div className="student-comparison">
  <table>
    <thead>
      <tr>
        <th>Học sinh</th>
        <th>Điểm trung bình</th>
        <th>Xếp hạng</th>
      </tr>
    </thead>
    <tbody>
      {students.map((s, index) => (
        <tr>
          <td>{s.name}</td>
          <td>{calculateAverage(s.results)}</td>
          <td>{index + 1}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

**Lý do cấm:**
- Phase 1 Law 6.2: "Không so sánh học sinh"
- System Law: "Không phân loại / xếp hạng học sinh"

#### ❌ Ranking / Leaderboard

```typescript
// ❌ SAI: Ranking display
<div className="leaderboard">
  <h3>Bảng xếp hạng lớp</h3>
  {rankedStudents.map((student, index) => (
    <div>
      <span>{index + 1}. {student.name}</span>
      <span>{student.totalScore}</span>
    </div>
  ))}
</div>
```

**Lý do cấm:**
- Phase 1 Law: "Không xếp hạng học sinh"
- Vi phạm System Law về không phân loại học sinh

### 6. Learning Path / Recommendation Patterns (CẤM)

**Cấm tuyệt đối các patterns sau:**

#### ❌ AI Learning Path Suggestions

```typescript
// ❌ SAI: AI đề xuất lộ trình
<div className="ai-recommendations">
  <h3>AI đề xuất lộ trình học</h3>
  <p>Tuần này bạn nên dạy: "Phân số - Phép nhân"</p>
  <button onClick={applyAIPlan}>Áp dụng kế hoạch AI</button>
</div>
```

**Lý do cấm:**
- Phase 1 Law 3.2: "AI không được suy diễn"
- Phase 1 không có learning path hoặc recommendations

#### ❌ Auto-suggest Next Steps

```typescript
// ❌ SAI: Auto-suggest next steps
useEffect(() => {
  if (exerciseApproved) {
    showSuggestion('Bạn có muốn gán bài tập này cho lớp không?'); // ❌ Không auto-suggest
  }
}, [exerciseApproved]);
```

**Lý do cấm:**
- Giáo viên quyết định bước tiếp theo
- Không được "dẫn dắt" hành vi

### 7. Template & Import Patterns (CẤM)

**Cấm tuyệt đối các patterns sau:**

#### ❌ Class Templates

```typescript
// ❌ SAI: Class templates
<button onClick={() => createFromTemplate('class-6a-template')}>
  Tạo lớp từ template
</button>

// ❌ SAI: Exercise templates
<select>
  <option>Template bài tập mẫu</option>
</select>
```

**Lý do cấm:**
- Phase 1 không có template system
- Mọi thứ giáo viên tạo từ đầu

#### ❌ Import / Bulk Operations

```typescript
// ❌ SAI: Import students
<button onClick={() => importStudentsFromExcel()}>
  Import học sinh từ Excel
</button>

// ❌ SAI: Bulk assign
<button onClick={() => assignToAllClasses(exerciseId)}>
  Gán cho tất cả lớp
</button>
```

**Lý do cấm:**
- Phase 1 không có import functionality
- Phase 1 không có bulk operations không kiểm soát

### 8. Public / Sharing Patterns (CẤM)

**Cấm tuyệt đối các patterns sau:**

#### ❌ Public Library / Sharing

```typescript
// ❌ SAI: Public exercise library
<ExerciseLibrary>
  <Filter>
    <option>Bài tập công khai</option>
  </Filter>
  {publicExercises.map(ex => <ExerciseCard exercise={ex} />)}
</ExerciseLibrary>

// ❌ SAI: Share functionality
<button onClick={() => shareExercise(exerciseId)}>
  Chia sẻ bài tập
</button>
```

**Lý do cấm:**
- Scope Phase 1: "Không có public library"
- Phase 1 Law: "Mọi bài tập đều PRIVATE"

### Checklist: Forbidden Patterns Review

Khi review PR hoặc design, kiểm tra:

- [ ] Không có progress bars, charts, graphs
- [ ] Không có dashboard tổng hợp
- [ ] Không có statistics, summaries, insights
- [ ] Không có auto-approve, auto-assign, auto-save
- [ ] Không có background jobs, scheduled tasks
- [ ] Không có AI decision-making UI
- [ ] Không có AI output không editable
- [ ] Không có student/parent portal
- [ ] Không có comparison, ranking, leaderboard
- [ ] Không có learning path suggestions
- [ ] Không có templates, import, bulk operations
- [ ] Không có public library, sharing

Nếu **FAIL ≥ 1** → **PR không được merge**, phải refactor ngay.

## Best Practices

1. **User-friendly language**: Dùng ngôn ngữ tự nhiên, không dùng technical terms
2. **Teacher-focused UI**: Mọi UI giả định user là giáo viên, không có role switching
3. **AI transparency**: Mọi AI output phải có label rõ ràng và luôn editable
4. **Manual control**: Giáo viên luôn là người bấm nút cuối, không có auto-actions
5. **No analytics**: Không hiển thị progress tracking, charts, statistics, hoặc insights
6. **Ownership clarity**: Mọi dữ liệu hiển thị đều thuộc giáo viên hiện tại
7. **Status visibility**: Exercise status (DRAFT/APPROVED) phải rõ ràng và enforce đúng logic
8. **Flow dependencies**: Tuân thủ dependencies giữa flows (A → B → C)
9. **No container overuse**: Tránh over-containerization, chỉ dùng container box khi cần visual separation
10. **Proper state components**: Luôn dùng reusable components cho loading/error/empty states
11. **Modal vs Page decision**: Đánh giá đúng độ phức tạp để chọn Modal hay Page Component

## Phase 1 Compliance Checklist

Checklist này dùng để review code và đảm bảo tuân thủ Phase 1 Law, Scope, và UI/UX Guidelines. **Nếu FAIL ≥ 1 item → PR không được merge**, phải refactor ngay.

### 1. User Context & Ownership

- [ ] **User là giáo viên**: Không có role selection, role switching, hoặc multi-user context
- [ ] **Data filtering**: Mọi query đều filter theo `teacher_id` của giáo viên hiện tại
- [ ] **Ownership**: Không hiển thị dữ liệu của giáo viên khác
- [ ] **No public/shared**: Không có concept "public" hoặc "shared" trong Phase 1
- [ ] **UI text**: Text giả định teacher context ("Lớp của bạn", không phải "Lớp học")

### 2. AI Integration

- [ ] **AI labeling**: Mọi AI output có label rõ ràng "Gợi ý (AI)" hoặc "Bản nháp (AI)"
- [ ] **AI editable**: AI output luôn editable, không được lock hoặc auto-apply
- [ ] **AI trigger**: AI chỉ xuất hiện khi giáo viên chủ động yêu cầu (button click)
- [ ] **No auto-AI**: Không có auto-trigger, auto-suggest, hoặc background AI
- [ ] **AI input**: AI input phải tường minh (subject, topic, requirement từ giáo viên)
- [ ] **No AI authority**: Không có text "AI đã quyết định", "AI hoàn thiện", "AI quyết định"

### 3. Exercise & ExerciseSet

- [ ] **Status display**: Exercise status (DRAFT/APPROVED) hiển thị rõ ràng với badge
- [ ] **Status enforcement**: DRAFT exercises không được gán cho lớp (disable button)
- [ ] **ExerciseSet intent**: Intent chỉ là label mô tả, không enforce logic
- [ ] **No usage tracking**: Không hiển thị "Đã dùng X lần", "Usage count"
- [ ] **ExerciseSet preview**: Preview đầy đủ exercises trước khi gán

### 4. Result & Comment Entry

- [ ] **Per-student, per-exercise**: Result entry theo từng học sinh, từng bài tập
- [ ] **No aggregation**: Không tính tổng điểm, trung bình, hoặc so sánh học sinh
- [ ] **No ranking**: Không có xếp hạng, leaderboard, hoặc comparison
- [ ] **Comment manual**: Comment entry tự do, không có template hoặc auto-fill
- [ ] **AI comment optional**: AI comment suggestion chỉ là gợi ý, không auto-apply

### 5. Forms & Validation

- [ ] **Class form**: Chỉ có name, subject, description, note (minimal)
- [ ] **Student form**: Chỉ có name, note (minimal, không có email, phone, grade)
- [ ] **Exercise form**: Có content, subject, topic (required), difficulty, type (optional)
- [ ] **Validation messages**: Messages trung lập, kỹ thuật, không có gợi ý sư phạm
- [ ] **No templates**: Không có template system hoặc import functionality

### 6. Navigation & Flow

- [ ] **Flow dependencies**: Check dependency trước khi vào flow (Class → Exercise → Assignment)
- [ ] **No shortcuts**: Không có shortcut bỏ qua dependencies
- [ ] **No auto-redirect**: Không auto-redirect sau actions, giáo viên quyết định bước tiếp theo
- [ ] **Navigation structure**: Chỉ có routes phù hợp Phase 1 (không có dashboard, analytics, reports)

### 7. UI States

- [ ] **Reusable components**: Sử dụng `LoadingState`, `ErrorState`, `EmptyState` components
- [ ] **No custom states**: Không tự tạo loading/error/empty states
- [ ] **Empty state actions**: Empty states có action buttons khi có thể tạo data
- [ ] **Error retry**: Error states có retry action khi phù hợp
- [ ] **Button loading**: Button loading sử dụng dots animation pattern

### 8. Modal vs Page

- [ ] **Modal cho simple**: Form đơn giản (1-3 fields) dùng Modal
- [ ] **Page cho complex**: Form phức tạp (>5 fields), list dài (>10 items) dùng Page
- [ ] **Page cho important**: Result entry, Assignment phải dùng Page (quyết định quan trọng)
- [ ] **No nested scroll**: Không có scroll trong scroll (Modal với max-h-* overflow-y-auto)

### 9. Container Boxes

- [ ] **No over-containerization**: Không bọc container box dư thừa
- [ ] **Section headers**: Sử dụng section headers với spacing thay vì container boxes
- [ ] **Item-level only**: Chỉ item-level có container box (exercise item, student card)
- [ ] **No nested containers**: Không có nhiều container boxes lồng nhau

### 10. Forbidden Patterns (CẤM TUYỆT ĐỐI)

- [ ] **No analytics**: Không có progress bars, charts, graphs, statistics, insights
- [ ] **No dashboard**: Không có dashboard tổng hợp
- [ ] **No automation**: Không có auto-approve, auto-assign, auto-save, background jobs
- [ ] **No student/parent portal**: Không có student login, parent portal, hoặc reporting
- [ ] **No comparison**: Không có comparison, ranking, leaderboard giữa học sinh
- [ ] **No learning path**: Không có AI learning path suggestions hoặc auto-recommendations
- [ ] **No templates**: Không có template system, import, hoặc bulk operations không kiểm soát
- [ ] **No public library**: Không có public library, sharing, hoặc shared content

### 11. Code Examples & Patterns

- [ ] **Phase 1 context**: Examples sử dụng Phase 1 entities (Exercise, ExerciseSet, Class, Student, Assignment)
- [ ] **Teacher context**: Examples giả định user là giáo viên
- [ ] **No generic examples**: Không có examples generic không phù hợp Phase 1

### Review Process

**Khi review PR:**

1. **Checklist review**: Chạy checklist này cho mọi file UI/UX được thay đổi
2. **Forbidden patterns**: Đặc biệt chú ý phần "Forbidden Patterns" - nếu vi phạm → **FAIL ngay**
3. **Phase 1 Law compliance**: Cross-check với [Phase 1 Scope & Law](../../../03-phase/phase-1/phase-1-scope-law-rule-set.md)
4. **UI Spec compliance**: Cross-check với [Phase 1 UI Spec](../../../03-phase/phase-1/phase-1-ui-spec-skeleton.md)

**Nếu FAIL:**
- Comment cụ thể item nào FAIL
- Yêu cầu refactor theo guidelines
- Không merge cho đến khi PASS tất cả items

**Nếu PASS:**
- Approve PR
- Ghi nhận compliance trong PR comment

## Tài liệu liên quan

- [State Management](./state-management.md) - State management patterns
- [Phase 1 Scope & Law](../../../03-phase/phase-1/phase-1-scope-law-rule-set.md) - Phase 1 scope và luật áp dụng
- [Phase 1 UI Spec](../../../03-phase/phase-1/phase-1-ui-spec-skeleton.md) - UI specification cho Phase 1

---

← Quay lại: [README.md](../README.md)
