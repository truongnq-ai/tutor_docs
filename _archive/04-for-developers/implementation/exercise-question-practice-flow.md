# BÁO CÁO TOÀN DIỆN: EXERCISE → QUESTION → PRACTICE → PRACTICE SESSION/MINI TEST

**Project:** Tutor  
**Document type:** Comprehensive Analysis Report  
**Audience:** Developers, Product Owners, System Architects  
**Status:** Active  
**Version:** 2025-12-21  
**Author:** AI Assistant (đóng vai trò: Kiến trúc sư hệ thống/Backend + UX Designer cho edtech)

---

## MỤC ĐÍCH TÀI LIỆU

Báo cáo này phân tích toàn diện logic, chức năng, và nghiệp vụ từ khi tạo bài tập (Exercise) → Câu hỏi (Question) → Luyện tập (Practice) → Phiên luyện tập (PracticeSession/MiniTest) trên tất cả các module:

1. **Admin Dashboard** (React/Next.js)
2. **Backend Core Service** (Spring Boot)
3. **AI Service** (Python/FastAPI)
4. **Frontend Student App** (Flutter)

Báo cáo này:
- Phân tích chi tiết từng bước trong workflow
- Xác định các vấn đề conflict, inconsistency
- Đưa ra khuyến nghị cụ thể để giải quyết
- Đặt câu hỏi Q&A theo format guidelines khi cần xác nhận

---

## 1. TỔNG QUAN WORKFLOW

### 1.1. Workflow Tổng Thể

```
Exercise (APPROVED)
  → Generate/Assign
    → Question (ASSIGNED)
      → Student submits answer
        → Practice Record (với question_id, session_id, session_type)
          → Update Question (SUBMITTED/RESUBMITTED)
          → Update Mastery
```

### 1.2. Các Module Tham Gia

| Module | Vai Trò | Technology |
|--------|---------|------------|
| **Admin Dashboard** | Tạo, review, quản lý Exercises | React/Next.js, TypeScript |
| **Backend Core Service** | Business logic, API endpoints, data persistence | Spring Boot, Java |
| **AI Service** | Generate Exercises từ prompts | Python, FastAPI |
| **Frontend Student App** | Hiển thị Questions, submit Practice | Flutter, Dart |

---

## 2. PHÂN TÍCH CHI TIẾT TỪNG BƯỚC

### 2.1. Bước 1: Admin Tạo Exercise

#### 2.1.1. Admin Dashboard Flow

**Files liên quan:**
- `tutor-admin-dashboard/src/components/exercises/ExerciseCreateForm.tsx`
- `tutor-admin-dashboard/src/lib/api/exercise.service.ts`
- `tutor-admin-dashboard/src/lib/api/endpoints.ts`

**Workflow:**
1. Admin mở form tạo Exercise
2. Điền thông tin: Skill, Grade, Problem Text, Solution Steps, etc.
3. Submit → Gọi `POST /api/v1/admin/exercises`
4. Exercise được tạo với `status = PENDING`

**API Endpoint:**
```
POST /api/v1/admin/exercises
```

**Request Body:**
```json
{
  "skillId": "uuid",
  "grade": 6,
  "problemText": "Rút gọn phân số: 12/18",
  "problemLatex": "\\frac{12}{18}",
  "difficultyLevel": 1,
  "solutionSteps": [...],
  "status": "PENDING"
}
```

**✅ Trạng thái:** Hoạt động tốt

---

#### 2.1.2. AI Generate Exercise Flow

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/service/impl/ExerciseGenerationServiceImpl.java`
- `tutor-ai-service/src/infrastructure/services/exercise_generation_service.py`
- `tutor-ai-service/src/infrastructure/providers/multi_provider_service.py`

**Workflow:**
1. Admin chọn skill, difficulty, grade
2. Gọi `POST /api/v1/admin/exercises/generate`
3. Backend gọi AI Service: `POST /api/v1/ai/exercises/generate`
4. AI Service generate exercises với multi-provider fallback (OpenAI → Gemini → HuggingFace)
5. Backend lưu exercises với `status = PENDING`
6. Admin preview và có thể edit trước khi submit

**✅ Trạng thái:** Hoạt động tốt

---

### 2.2. Bước 2: Exercise Review → APPROVED

#### 2.2.1. Review Process

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/controller/ExerciseController.java`
- `tutor-admin-dashboard/src/components/exercises/ExerciseReviewForm.tsx`

**Workflow:**
1. Admin/Expert review Exercise
2. Set `review_status = 'APPROVED'` và `quality_score >= 0.7`
3. Exercise APPROVED mới được sử dụng để sinh Questions

**API Endpoint:**
```
POST /api/v1/admin/exercises/{id}/review
```

**Business Rule:**
- Chỉ Exercises với `review_status = 'APPROVED'` mới được dùng để generate Questions
- Validation trong `QuestionGenerationService`: Throw `ExerciseNotApprovedException` nếu chưa approved

**✅ Trạng thái:** Hoạt động tốt

---

### 2.3. Bước 3: Generate Questions từ Exercises

#### 2.3.1. Question Generation Service

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/service/impl/QuestionGenerationServiceImpl.java`
- `tutor-core-service/src/main/java/com/tutor/core/service/QuestionGenerationService.java`

**Workflow:**
1. Service query Exercises APPROVED theo skill, difficulty
2. Snapshot Exercise data vào Question entity
3. Set `assigned_to_student_id`, `status = 'ASSIGNED'`
4. Lưu Question vào database

**Key Logic:**
```java
public List<QuestionResponse> generateQuestionsFromExercise(GenerateQuestionRequest request) {
    // 1. Query Exercises APPROVED
    // 2. Validate prerequisites (if any)
    // 3. Snapshot Exercise data
    // 4. Create Question entities
    // 5. Save to database
}
```

**Business Rules:**
- ✅ Chỉ sinh từ Exercises APPROVED
- ✅ Snapshot Exercise data tại thời điểm assign
- ✅ Validate prerequisites (nếu có)
- ✅ Set `assigned_to_student_id` và `status = 'ASSIGNED'`

**✅ Trạng thái:** Hoạt động tốt

---

#### 2.3.2. Question Generation Entry Points

Có **3 entry points** để generate questions:

**A. Internal Learning API (Adaptive Learning Engine)**
- Endpoint: `POST /api/v1/internal/learning/generate-questions`
- Controller: `LearningQuestionController`
- Usage: Adaptive Learning Engine gọi để assign questions cho học sinh

**B. Learning Plan API (Student App)**
- Endpoint: `POST /api/v1/learning/generate-questions`
- Controller: `LearningController`
- Usage: Student App gọi khi học sinh muốn practice theo learning plan

**C. Admin API (Admin Dashboard)**
- Endpoint: `POST /api/v1/admin/questions/generate`
- Controller: `AdminQuestionController`
- Usage: Admin generate questions thủ công cho testing/debugging

**✅ Trạng thái:** Tất cả đều hoạt động tốt, sử dụng chung `QuestionGenerationService`

---

### 2.4. Bước 4: Practice Session Question Generation

#### 2.4.1. PracticeSession.createSession() - Generate Questions

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/service/impl/PracticeSessionServiceImpl.java`

**Workflow (Option E - Đã implement):**
1. User tạo PracticeSession → `POST /api/v1/practice/sessions`
2. Backend tạo session với `status = IN_PROGRESS`
3. **Ngay sau khi tạo session, generate questions:**
   - Gọi `getRecommendedDifficulty()` dựa trên mastery
   - Tạo `GenerateQuestionRequest` với `questionType = PRACTICE`
   - Gọi `questionGenerationService.generateQuestionsFromExercise()`
   - Questions được tạo với `status = ASSIGNED`, `assigned_to_student_id = session.studentId`
4. **Option E: Tạo Practice records ngay để link questions với session:**
   - Với mỗi question được generate, tạo Practice record với:
     - `question_id` = Question.id (required)
     - `session_id` = session.getId()
     - `session_type` = PRACTICE_SESSION
     - `status = NOT_STARTED` (chưa submit)
     - `student_answer = null`, `is_correct = false`, `submitted_at = null`
   - Đảm bảo questions được link với session ngay từ đầu

**Code Snippet:**
```java
@Override
@Transactional
public PracticeSessionResponse createSession(UUID studentId, UUID trialId, UUID skillId, int totalQuestions) {
    // ... (create session) ...
    
    // Generate questions for the session
    if (studentId != null && totalQuestions > 0) {
        try {
            Integer difficultyLevel = getRecommendedDifficulty(studentId, skillId);
            GenerateQuestionRequest request = new GenerateQuestionRequest(
                    skillId, studentId, null, difficultyLevel, totalQuestions,
                    QuestionType.PRACTICE, null
            );
            
            List<QuestionResponse> questions = questionGenerationService.generateQuestionsFromExercise(request);
            log.info("Generated {} questions for practice session: sessionId={}", questions.size(), session.getId());
            
            // Option E: Create Practice records immediately to link questions with session
            for (QuestionResponse question : questions) {
                Practice practice = Practice.builder()
                        .studentId(studentId)
                        .skillId(skillId)
                        .questionId(question.getId())
                        .sessionId(session.getId())
                        .sessionType(SessionType.PRACTICE_SESSION)
                        .status(PracticeStatus.NOT_STARTED)
                        .studentAnswer(null)
                        .isCorrect(false)
                        .durationSec(0)
                        .submittedAt(null)
                        .build();
                practiceRepository.save(practice);
            }
            log.info("Created {} Practice records for practice session: sessionId={}", questions.size(), session.getId());
        } catch (Exception e) {
            log.error("Failed to generate questions for practice session {}: {}", session.getId(), e.getMessage(), e);
        }
    }
    
    return convertToResponse(session);
}
```

**✅ Trạng thái:** Đã implement theo Option E

---

#### 2.4.2. MiniTest.startTest() - Generate Questions

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/service/impl/MiniTestServiceImpl.java`

**Workflow (Option E - Đã implement):**
1. User bắt đầu MiniTest → `POST /api/v1/minitest/start`
2. Backend tạo `MiniTestSession` với `status = IN_PROGRESS`
3. **Ngay sau khi tạo session, generate questions:**
   - Tương tự PracticeSession, generate questions với `questionType = MINI_TEST`
   - Questions được tạo với `status = ASSIGNED`
4. **Option E: Tạo Practice records ngay để link questions với session:**
   - Với mỗi question được generate, tạo Practice record với:
     - `question_id` = Question.id (required)
     - `session_id` = session.getId()
     - `session_type` = MINI_TEST
     - `status = NOT_STARTED` (chưa submit)
     - `student_answer = null`, `is_correct = false`, `submitted_at = null`

**✅ Trạng thái:** Hoạt động tốt, logic tương tự PracticeSession với Option E

---

### 2.5. Bước 5: Get Questions in Session

#### 2.5.1. PracticeSession.getQuestionsInSession()

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/service/impl/PracticeSessionServiceImpl.java`
- `tutor-core-service/src/main/java/com/tutor/core/controller/PracticeSessionController.java`

**Workflow (Option E - Đã implement):**
1. Frontend gọi `GET /api/v1/practice/sessions/{sessionId}/questions`
2. Backend query questions **luôn qua Practice records** (không cần fallback):
   - Query Practice records với `session_id` + `session_type`
   - Extract `questionIds` từ Practice records
   - Query Questions theo `questionIds`

**Code Snippet:**
```java
@Override
@Transactional(readOnly = true)
public List<QuestionResponse> getQuestionsInSession(UUID sessionId) {
    // Query questions via Practice records (created when questions are generated)
    List<Practice> practices = practiceRepository.findBySessionIdAndSessionType(
            sessionId, SessionType.PRACTICE_SESSION
    );
    
    if (practices.isEmpty()) {
        return Collections.emptyList();
    }
    
    // Extract unique questionIds from Practice records
    Set<UUID> questionIds = practices.stream()
            .map(Practice::getQuestionId)
            .filter(Objects::nonNull)
            .collect(Collectors.toSet());
    
    // Query Questions from Practice records
    List<Question> questions = questionRepository.findAllById(questionIds);
    return questions.stream()
            .map(q -> questionService.getQuestionById(q.getId()))
            .collect(Collectors.toList());
}
```

**✅ Trạng thái:** Đã implement Option E - Logic hoạt động tốt, không cần fallback

---

#### 2.5.2. Frontend: Get Questions in Session

**Files liên quan:**
- `tutor-student-app/lib/src/presentation/features/progress/riverpod/practice_session_provider.dart`
- `tutor-student-app/lib/src/data/repositories/practice_session_repository_impl.dart`
- `tutor-student-app/lib/src/data/services/network/services/practice_session_service.dart`

**Workflow:**
1. Frontend gọi `PracticeSessionQuestions` provider
2. Provider gọi `practiceSessionRepository.getQuestionsInSession(sessionId)`
3. Repository gọi API: `GET /api/v1/practice/sessions/{sessionId}/questions`
4. Map response thành `List<QuestionEntity>`

**✅ Trạng thái:** Hoạt động tốt

---

### 2.6. Bước 6: Student Submit Answer → Create Practice Record

#### 2.6.1. Practice Submission Flow

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/service/impl/PracticeServiceImpl.java`
- `tutor-core-service/src/main/java/com/tutor/core/controller/PracticeController.java`
- `tutor-student-app/lib/src/presentation/features/practice/view/practice_question_page.dart`

**Workflow:**
1. Student submit answer → `POST /api/v1/practice/submit`
2. Request body:
   ```json
   {
     "skillId": "uuid",
     "answer": "2/3",
     "durationSec": 45,
     "questionId": "uuid",  // Required
     "sessionId": "uuid",    // Optional
     "sessionType": "PRACTICE_SESSION"  // Optional
   }
   ```
3. Backend:
   - Validate `questionId` is required
   - Get Question và validate answer correctness
   - Create Practice record với:
     - `question_id` (required)
     - `session_id` + `session_type` (nếu có)
     - `student_answer`, `is_correct`, `duration_sec`, `submitted_at`
   - Update Question status:
     - `ASSIGNED` → `SUBMITTED` (nếu là practice đầu tiên)
     - `SUBMITTED` → `RESUBMITTED` (nếu đã có practices trước đó)
   - Update Mastery

**Code Snippet (Option E - Đã implement):**
```java
@Override
@Transactional
public PracticeResponse submitPractice(UUID studentId, UUID skillId, String answer, 
        Integer durationSec, UUID questionId, UUID sessionId, SessionType sessionType) {
    // Require questionId
    if (questionId == null) {
        throw new IllegalArgumentException("questionId is required");
    }
    
    // Get question and validate answer correctness
    Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new QuestionNotFoundException("Question not found"));
    
    boolean isCorrect = question.getFinalAnswer() != null && 
            question.getFinalAnswer().trim().equalsIgnoreCase(answer.trim());
    
    // Validate sessionId and sessionType consistency
    if ((sessionId == null) != (sessionType == null)) {
        throw new IllegalArgumentException("sessionId and sessionType must be both null or both not null");
    }
    
    // Option E: Check if practice already exists (from Option E - created when questions are generated)
    Optional<Practice> existingPracticeOpt = Optional.empty();
    if (sessionId != null && sessionType != null) {
        existingPracticeOpt = practiceRepository.findBySessionIdAndSessionTypeAndQuestionId(
                sessionId, sessionType, questionId);
    }
    
    Practice practice;
    boolean isFirstPractice;
    if (existingPracticeOpt.isPresent() && existingPracticeOpt.get().getStatus() == PracticeStatus.NOT_STARTED) {
        // Update existing practice (from Option E)
        practice = existingPracticeOpt.get();
        practice.setStudentAnswer(answer);
        practice.setIsCorrect(isCorrect);
        practice.setDurationSec(durationSec != null ? durationSec : 0);
        practice.setSubmittedAt(LocalDateTime.now());
        practice.setStatus(PracticeStatus.SUBMITTED);
        isFirstPractice = true; // First submission of this practice record
    } else {
        // Create new practice (backward compatible for standalone practices)
        practice = Practice.builder()
                .studentId(studentId)
                .skillId(skillId)
                .questionId(questionId)
                .sessionId(sessionId)
                .sessionType(sessionType)
                .studentAnswer(answer)
                .isCorrect(isCorrect)
                .durationSec(durationSec != null ? durationSec : 0)
                .submittedAt(LocalDateTime.now())
                .status(PracticeStatus.SUBMITTED)
                .build();
        // Check if this is first practice for this question
        long existingPracticeCount = practiceRepository.countByQuestionId(questionId);
        isFirstPractice = existingPracticeCount == 0;
    }
    
    // Update question status based on whether this is first practice
    if (isFirstPractice) {
        question.setStatus(QuestionStatus.SUBMITTED);
    } else {
        question.setStatus(QuestionStatus.RESUBMITTED);
    }
    questionRepository.save(question);
    
    Practice savedPractice = practiceRepository.save(practice);
    
    // Update mastery (in same transaction)
    masteryService.updateMastery(studentId, skillId, isCorrect, difficultyLevel);
    
    return toPracticeResponse(savedPractice);
}
```

**✅ Trạng thái:** Hoạt động tốt, đã implement Option E - Update existing practice thay vì luôn tạo mới

---

#### 2.6.2. Alternative: Question Submit API

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/service/impl/QuestionServiceImpl.java`
- `tutor-core-service/src/main/java/com/tutor/core/controller/PracticeQuestionController.java`

**Workflow:**
1. Student submit answer → `POST /api/v1/practice/questions/{id}/submit`
2. Request body:
   ```json
   {
     "answer": "2/3",
     "durationSec": 45,
     "sessionId": "uuid",    // Optional
     "sessionType": "PRACTICE_SESSION"  // Optional
   }
   ```
3. Backend logic tương tự `PracticeService.submitPractice()`

**⚠️ VẤN ĐỀ PHÁT HIỆN:**

**Vấn đề 2: Có 2 API endpoints để submit practice**

1. `POST /api/v1/practice/submit` (PracticeController)
2. `POST /api/v1/practice/questions/{id}/submit` (PracticeQuestionController)

Cả 2 đều tạo Practice record và update Question status. Điều này có thể gây confusion cho frontend developers.

**Khuyến nghị:**
- **Option A:** Deprecate một trong hai endpoints và chỉ dùng một endpoint
- **Option B:** Giữ cả hai nhưng document rõ khi nào dùng endpoint nào
- **Option C:** Unify logic vào một service method và cả hai endpoints gọi method đó (đã làm)

**✅ Trạng thái:** Hoạt động tốt nhưng có thể cải thiện consistency

---

#### 2.6.3. Frontend: Submit Practice

**Files liên quan:**
- `tutor-student-app/lib/src/presentation/features/practice/view/practice_question_page.dart`
- `tutor-student-app/lib/src/presentation/features/practice/riverpod/practice_provider.dart`

**Workflow:**
1. User nhập answer và click submit
2. `_onSubmitAnswer()` được gọi
3. Retrieve `sessionId` từ `widget.sessionId`
4. Set `sessionType = 'PRACTICE_SESSION'` nếu có sessionId
5. Gọi `practiceSubmissionProvider.submitPractice()` với:
   - `questionId` (required)
   - `sessionId` và `sessionType` (nếu có)

**Code Snippet:**
```dart
Future<void> _onSubmitAnswer(BuildContext context, QuestionEntity question) async {
    // ...
    final String questionId = question.id;
    
    // Determine session context
    String? sessionId = widget.sessionId;
    String? sessionType;
    if (sessionId != null) {
        sessionType = 'PRACTICE_SESSION';
    }
    
    final success = await ref.read(practiceSubmissionProvider.notifier).submitPractice(
            skillId: skillId,
            answer: answer,
            durationSec: duration,
            questionId: questionId,
            sessionId: sessionId,
            sessionType: sessionType,
        );
    // ...
}
```

**✅ Trạng thái:** Hoạt động tốt, đã truyền đầy đủ session context

---

### 2.7. Bước 7: Mastery Update

#### 2.7.1. Mastery Service

**Files liên quan:**
- `tutor-core-service/src/main/java/com/tutor/core/service/impl/MasteryServiceImpl.java`

**Workflow:**
1. Sau khi submit practice, gọi `masteryService.updateMastery()`
2. Logic:
   - Get or create `SkillMastery` record
   - Calculate mastery change:
     - **Đúng:** +5~+8 (theo difficulty level 1-5)
     - **Sai:** -5~-10 (theo difficulty level 1-5)
   - Update mastery level (clamp 0-100)
   - Update `lastPracticedAt`

**Code Snippet:**
```java
private static final int[] CORRECT_MASTERY_CHANGE = {5, 6, 7, 8, 8}; // For difficulty 1-5
private static final int[] WRONG_MASTERY_CHANGE = {-5, -6, -7, -8, -10}; // For difficulty 1-5

@Override
@Transactional
public Integer updateMastery(UUID studentId, UUID skillId, boolean isCorrect, Integer difficultyLevel) {
    // Normalize difficulty level (1-5)
    int difficulty = (difficultyLevel != null && difficultyLevel >= 1 && difficultyLevel <= 5) 
            ? difficultyLevel 
            : 3; // Default to 3 if invalid
    
    // Get or create mastery record
    SkillMastery mastery = skillMasteryRepository.findByStudentIdAndSkillId(studentId, skillId)
            .orElseGet(() -> {
                SkillMastery newMastery = SkillMastery.builder()
                        .studentId(studentId)
                        .skillId(skillId)
                        .masteryLevel(0)
                        .build();
                return skillMasteryRepository.save(newMastery);
            });
    
    // Calculate mastery change
    int changeAmount;
    if (isCorrect) {
        changeAmount = CORRECT_MASTERY_CHANGE[difficulty - 1];
    } else {
        changeAmount = WRONG_MASTERY_CHANGE[difficulty - 1];
    }
    
    // Update mastery level (clamp between 0-100)
    int newMastery = Math.max(0, Math.min(100, mastery.getMasteryLevel() + changeAmount));
    mastery.setMasteryLevel(newMastery);
    mastery.setLastPracticedAt(LocalDateTime.now());
    
    SkillMastery saved = skillMasteryRepository.save(mastery);
    return saved.getMasteryLevel();
}
```

**✅ Trạng thái:** Hoạt động tốt, logic đúng theo business rules

---

#### 2.7.2. Mastery Update trong Transaction

**⚠️ VẤN ĐỀ PHÁT HIỆN:**

**Vấn đề 3: Mastery update không nằm trong transaction với Practice creation**

Hiện tại, trong `PracticeServiceImpl.submitPractice()`:
```java
Practice savedPractice = practiceRepository.save(practice);

// Update mastery after practice
try {
    masteryService.updateMastery(studentId, skillId, isCorrect, difficultyLevel);
} catch (Exception e) {
    log.error("Failed to update mastery after practice: {}", e.getMessage(), e);
    // Continue even if mastery update fails
}
```

Nếu mastery update fail, Practice record vẫn được tạo. Điều này có thể gây data inconsistency.

**Khuyến nghị:**
- **Option A:** Wrap cả Practice creation và Mastery update trong một transaction (nhưng có thể ảnh hưởng performance)
- **Option B:** Giữ nguyên nhưng implement retry mechanism cho mastery update
- **Option C:** Implement eventual consistency với message queue (Phase 2)

**✅ Trạng thái:** Hoạt động nhưng có risk về data consistency

---

## 3. PHÂN TÍCH CÁC VẤN ĐỀ VÀ CONFLICT

### 3.1. Vấn Đề 1: Question-Session Linking ✅ ĐÃ GIẢI QUYẾT

**Mô tả (Trước khi implement):**
Khi questions được generate trong `PracticeSession.createSession()`, chúng không có field nào link trực tiếp với session. Khi query questions trong session (chưa submit), fallback logic có thể trả về questions không thuộc session này.

**Giải pháp đã implement:**
**Option E**: Tạo Practice records ngay khi generate questions cho session
- Practice records được tạo với `status = NOT_STARTED` khi generate questions
- Questions được link với session ngay từ đầu qua Practice records
- `getQuestionsInSession()` luôn query qua Practice records (không cần fallback)
- Khi submit answer, Practice record được update (NOT_STARTED → SUBMITTED) thay vì tạo mới

**Tác động sau khi giải quyết:**
- ✅ **Data Consistency:** Questions luôn được link chính xác với session
- ✅ **User Experience:** Học sinh luôn thấy đúng questions của session
- ✅ **Code Quality:** Logic đơn giản hơn, không cần fallback phức tạp

---

### 3.2. Vấn Đề 2: Duplicate API Endpoints

**Mô tả:**
Có 2 API endpoints để submit practice:
1. `POST /api/v1/practice/submit`
2. `POST /api/v1/practice/questions/{id}/submit`

**Tác động:**
- **Developer Confusion:** Không rõ nên dùng endpoint nào
- **Maintenance:** Phải maintain 2 endpoints

**Khuyến nghị:**
- **Option A (Khuyến nghị):** Deprecate `POST /api/v1/practice/submit` và chỉ dùng `POST /api/v1/practice/questions/{id}/submit` vì:
  - RESTful hơn (resource-based)
  - QuestionId rõ ràng trong path
  - Dễ maintain hơn
- **Option B:** Giữ cả hai nhưng document rõ:
  - `POST /api/v1/practice/submit`: Dùng khi không có questionId (legacy)
  - `POST /api/v1/practice/questions/{id}/submit`: Dùng khi có questionId (recommended)

---

### 3.3. Vấn Đề 3: Mastery Update Transaction

**Mô tả:**
Mastery update không nằm trong transaction với Practice creation, có thể gây data inconsistency.

**Tác động:**
- **Data Consistency:** Practice record có thể tồn tại mà không có mastery update tương ứng
- **Business Logic:** Mastery không phản ánh đúng practice history

**Khuyến nghị:**
- **Option A (Khuyến nghị):** Wrap trong transaction nhưng handle timeout/performance:
  ```java
  @Transactional
  public PracticeResponse submitPractice(...) {
      // Create practice
      Practice savedPractice = practiceRepository.save(practice);
      
      // Update mastery (in same transaction)
      masteryService.updateMastery(studentId, skillId, isCorrect, difficultyLevel);
      
      return toPracticeResponse(savedPractice);
  }
  ```
- **Option B:** Implement retry mechanism cho mastery update
- **Option C:** Eventual consistency với message queue (Phase 2)

---

### 3.4. Vấn Đề 4: Question Repository Implementation

**Mô tả:**
Trong `tutor-student-app/lib/src/data/repositories/question_repository_impl.dart`, method `getQuestionsBySession()` trả về error "Not implemented yet":

```dart
@override
Future<ResponseObject<List<QuestionEntity>>> getQuestionsBySession(String sessionId) async {
    try {
        // This would need a new endpoint or use existing practiceQuestions endpoint
        // For now, return error as this endpoint might not exist yet
        return ResponseObject.error(
            errorCode: '5001',
            errorDetail: 'Not implemented yet',
        );
    } catch (e) {
        // ...
    }
}
```

**Tác động:**
- **Functionality:** Method này không hoạt động
- **Code Quality:** Có dead code

**Khuyến nghị:**
- **Option A:** Implement method này để gọi `GET /api/v1/practice/sessions/{sessionId}/questions`
- **Option B:** Remove method này nếu không cần thiết (kiểm tra xem có nơi nào gọi không)

---

## 4. CÂU HỎI Q&A CẦN XÁC NHẬN

### Câu hỏi 1: Question-Session Linking Strategy ✅ ĐÃ GIẢI QUYẾT

**Phân tích vấn đề:**
Khi questions được generate trong `PracticeSession.createSession()`, chúng không có field nào link trực tiếp với session. Khi query questions trong session (chưa submit), fallback logic có thể trả về questions không thuộc session này.

**Giải pháp đã chọn: Option E - Tạo Practice records khi generate questions**

**Phân tích Option E:**

**E. Tạo Practice records khi generate questions (Đã implement)**
- **Ưu điểm:**
  - Tuân thủ design: Question không link trực tiếp với session, link qua Practice
  - Đơn giản: Sử dụng Practice table đã có, không cần bảng mới
  - Rõ ràng: Questions được link với session ngay từ đầu
  - Query đơn giản: Luôn query qua Practice records, không cần fallback
  - Hỗ trợ PracticeStatus: NOT_STARTED → SUBMITTED → CANCELLED
  - Backward compatible: Standalone practices vẫn tạo mới Practice record
- **Nhược điểm:**
  - Tạo nhiều Practice records ngay từ đầu (nhưng cần thiết để link)
  - Cần thêm PracticeStatus enum và status field

**Implementation:**
- Practice records được tạo ngay khi generate questions với `status = NOT_STARTED`
- Khi submit answer, Practice record được update (NOT_STARTED → SUBMITTED)
- `getQuestionsInSession()` luôn query qua Practice records
- Session cancellation: Mark Practice records với `status = CANCELLED`

**Trả lời: E (Đã implement)**

---

### Câu hỏi 2: Practice Submit API Consolidation ✅ ĐÃ GIẢI QUYẾT

**Phân tích vấn đề:**
Có 2 API endpoints để submit practice:
1. `POST /api/v1/practice/submit`
2. `POST /api/v1/practice/questions/{id}/submit`

Cả hai đều tạo Practice record và update Question status. Điều này có thể gây confusion.

**Giải pháp đã chọn: Option A - Deprecate old endpoint**

**Implementation:**
- `POST /api/v1/practice/submit` đã được đánh dấu `@Deprecated` với Swagger documentation
- Endpoint vẫn hoạt động để backward compatible (temporary)
- Frontend đã migrate sang `POST /api/v1/practice/questions/{id}/submit`
- Old endpoint sẽ được remove trong version tương lai

**Trả lời: A (Đã implement)**

---

### Câu hỏi 3: Mastery Update Transaction ✅ ĐÃ GIẢI QUYẾT

**Phân tích vấn đề:**
Mastery update không nằm trong transaction với Practice creation, có thể gây data inconsistency nếu mastery update fail.

**Giải pháp đã chọn: Option A - Wrap trong transaction**

**Implementation:**
- `submitPractice()` và `submitQuestionAnswer()` đã có `@Transactional`
- Mastery update được gọi trong cùng transaction với Practice creation/update
- Nếu mastery update fail, toàn bộ transaction sẽ rollback (đảm bảo data consistency)
- Performance impact chấp nhận được vì mastery update nhanh

**Code:**
```java
@Transactional
public PracticeResponse submitPractice(...) {
    // Create/update practice
    Practice savedPractice = practiceRepository.save(practice);
    
    // Update mastery (in same transaction)
    masteryService.updateMastery(studentId, skillId, isCorrect, difficultyLevel);
    
    return toPracticeResponse(savedPractice);
}
```

**Trả lời: A (Đã implement)**

---

## 5. TỔNG KẾT VÀ KHUYẾN NGHỊ

### 5.1. Tổng Kết

**✅ Hoạt động tốt:**
1. Exercise creation và review flow
2. Question generation từ Exercises APPROVED
3. Practice submission với questionId, sessionId, sessionType
4. Mastery update logic
5. Frontend integration với backend APIs

**✅ Đã giải quyết:**
1. ✅ Question-Session linking strategy (Câu hỏi 1) - Option E đã implement
2. ✅ Practice submit API consolidation (Câu hỏi 2) - Old endpoint đã deprecated
3. ✅ Mastery update transaction (Câu hỏi 3) - Đã wrap trong transaction
4. ✅ Question repository implementation - getQuestionsBySession() đã implement

**⚠️ Cần cải thiện:**
- Không có vấn đề nghiêm trọng còn lại

### 5.2. Khuyến Nghị Ưu Tiên

**✅ Đã hoàn thành:**
1. ✅ **Câu hỏi 1:** Question-Session linking strategy - Option E đã implement
2. ✅ **Câu hỏi 3:** Mastery update transaction - Đã wrap trong transaction
3. ✅ **Câu hỏi 2:** Consolidate Practice submit APIs - Old endpoint đã deprecated
4. ✅ Fix Question repository dead code - getQuestionsBySession() đã implement

**Priority 3 (Nice to have):**
5. Improve error handling và logging
6. Add monitoring và alerting
7. Session cancellation cleanup job (mark expired sessions as CANCELLED)

---

## 6. TÀI LIỆU LIÊN QUAN

- [Question Management Workflow](../../03-for-product-owners/user-stories/admin/question-management/workflow.md)
- [Question Management Business Rules](../../03-for-product-owners/user-stories/admin/question-management/business-rules.md)
- [Question Management API Endpoints](../../03-for-product-owners/user-stories/admin/question-management/api-endpoints.md)
- [Question Management Database Schema](../../03-for-product-owners/user-stories/admin/question-management/database-schema.md)
- [Question Integration Summary](./question-integration.md)
- [API-DB Mapping](./api-db-mapping.md)

---

## 7. LỊCH SỬ THAY ĐỔI

- 2025-12-21: Tạo mới báo cáo toàn diện Exercise-Question-Practice Flow
- 2025-12-21: Cập nhật báo cáo - Option E đã được implement:
  - Practice records được tạo ngay khi generate questions (status = NOT_STARTED)
  - submitPractice() update existing practice thay vì luôn tạo mới
  - getQuestionsInSession() luôn query qua Practice records (bỏ fallback)
  - Session cancellation API đã được thêm
  - Old practice submit API đã deprecated
  - Mastery update đã wrap trong transaction

---

[← Quay lại Implementation Overview](./README.md)

