BACKEND SKELETON – PHASE 1
Project: Gia sư Toán AI
Applies to: Phase 1 – Core Personal Learning System
Status: DESIGN ONLY – IMPLEMENT AFTER APPROVAL
Purpose: Define minimal backend structure for Phase 1

==================================================
1. REPOSITORY MAPPING
==================================================

Backend skeleton được triển khai trong 2 repositories:

1. tutor-core-service (Java Spring Boot)
   - Chứa TẤT CẢ business logic modules
   - Package: com.tutor.core.*
   - Technology: Java 17, Spring Boot 3.x, PostgreSQL

2. tutor-ai-service (Python FastAPI)
   - Chỉ chứa AI capabilities
   - Technology: Python 3.11+, FastAPI
   - Giao tiếp với Core Service qua HTTP (API key authentication)

Communication Pattern:
```
Frontend Apps
    ↓
tutor-core-service (API Gateway + Business Logic)
    ↓ HTTP (via AIServiceClient)
tutor-ai-service (AI capabilities only)
```

Lưu ý:
- AI module KHÔNG phải Java module trong core service
- Core Service sử dụng AIServiceClient (HTTP client) để gọi AI Service
- AI Service là stateless, không biết về business logic

==================================================
2. OVERALL BACKEND PRINCIPLES
==================================================

- Single core service (no microservice split)
- Monolithic but modular
- Clear package boundaries
- No abstraction for future phases

Backend chịu trách nhiệm 100% cho:
- Chapter assignment
- Skill prerequisite
- Permission enforcement
- AI scope validation

==================================================
3. PACKAGE STRUCTURE (TOP LEVEL)
==================================================

com.tutor.core (trong tutor-core-service)
├─ config
├─ common
├─ auth
├─ user
├─ admin
├─ chapter
├─ skill
├─ exercise
├─ question
├─ practice
├─ client (AIServiceClient - HTTP client to AI Service)
└─ bootstrap

Lưu ý:
- AI Service là service riêng (Python FastAPI), không nằm trong package này
- Core Service gọi AI Service qua AIServiceClient trong package client

==================================================
4. COMMON MODULE
==================================================

com.tutor.core.common
├─ exception
│  ├─ ForbiddenException
│  ├─ NotFoundException
│  └─ BadRequestException
│
├─ guard
│  ├─ RoleGuard (ADMIN, PARENT, STUDENT)
│  ├─ ChapterAssignmentGuard
│  ├─ SkillPrerequisiteGuard
│  └─ ParentStudentGuard (parent chỉ truy cập con của mình)
│
└─ model
   ├─ BaseEntity
   └─ Role (ADMIN, PARENT, STUDENT)

Không có:
- PermissionResolver
- PolicyEngine
- ContextAwareGuard
- TrialGuard
- LicenseGuard
- PermissionMatrixGuard

==================================================
5. AUTH MODULE
==================================================

com.tutor.core.auth
├─ AuthenticationService
├─ AuthenticationController
├─ JwtService
├─ RefreshTokenService
└─ CustomUserDetailsService

Responsibilities:
- Login (username, password) → JWT + refresh token
- Refresh token → new JWT
- Logout → revoke refresh token
- Load user details for authentication

Không có:
- OAuth (Google, Apple)
- OTP
- Password recovery
- Registration (users được tạo bởi admin)

==================================================
6. USER MODULE
==================================================

com.tutor.core.user
├─ UserEntity
├─ ParentAccountEntity
├─ AdminProfileEntity
├─ StudentProfileEntity
├─ UserRepository
├─ UserService
└─ UserController

Responsibilities:
- Load user by username
- Identify role (ADMIN, PARENT, STUDENT)
- Create user (admin only)
- Update user (admin only)
- Delete user (admin only)
- Get user profile

Không có:
- Registration
- OTP
- Password recovery
- OAuth

Notes:
- Super admin đầu tiên: seed data
- Admin khác: tạo bởi admin trên web
- Parent/Student: tạo bởi admin trên web
- Username/password authentication (không OAuth)

==================================================
7. ADMIN MODULE
==================================================

com.tutor.core.admin
├─ AdminService
└─ AdminController

Responsibilities:
- Create / update / delete user (parent, student, admin)
- Create / update / delete chapter
- Create / update / delete skill
- Assign chapter to student (bất kỳ student nào)
- View all progress / metrics
- Manage system content

Permissions:
- ADMIN role only
- Full access to all resources

==================================================
8. CHAPTER MODULE
==================================================

com.tutor.core.chapter
├─ ChapterEntity
├─ ChapterAssignmentEntity (mới)
├─ ChapterRepository
├─ ChapterAssignmentRepository
├─ ChapterService
└─ ChapterController

Responsibilities:
- Create / update / delete chapter (admin only)
- Assign chapter to student (admin/parent)
- Get assigned chapters (student)
- Validate chapter assignment before access

Notes:
- Phase 1 KHÔNG có Chapter Progression (LOCKED/UNLOCKED/IN_PROGRESS/COMPLETED)
- Chỉ có chapter assignment (gán chapter cho student)
- Student chỉ nhìn thấy chapter được gán

==================================================
9. SKILL MODULE
==================================================

com.tutor.core.skill
├─ SkillEntity
├─ SkillPrerequisiteEntity (tách từ JSON)
├─ SkillCompletionEntity (boolean, thay skill_mastery)
├─ SkillRepository
├─ SkillPrerequisiteRepository
├─ SkillCompletionRepository
├─ SkillService
└─ SkillController

Responsibilities:
- Create / update / delete skill (admin only)
- List skills per chapter
- Check prerequisite (guard)
- Mark skill completed (boolean)
- Get skill completion status

Không có:
- Mastery level (0-100)
- Adaptive difficulty
- Skill progression state

Notes:
- Prerequisite tách từ JSON sang bảng riêng
- Completion chỉ boolean (completed/not completed)
- Loại bỏ skill_mastery table

==================================================
10. EXERCISE MODULE
==================================================

com.tutor.core.exercise
├─ ExerciseEntity
├─ ExerciseRepository
├─ ExerciseService
└─ ExerciseController

Responsibilities:
- Create / update / delete exercise template (admin only)
- Get exercise by skill
- Exercise là template, không phải instance

Notes:
- Exercise là template cho practice
- Chứa: problem_text, solution_steps, final_answer, difficulty_level
- Loại bỏ: review_status, quality_score, usage_count, bloom_taxonomy_level

==================================================
11. QUESTION MODULE
==================================================

com.tutor.core.question
├─ QuestionEntity
├─ QuestionRepository
├─ QuestionService
└─ QuestionController

Responsibilities:
- Create question instance từ exercise
- Assign question to student
- Get question for practice
- Question là instance của exercise (snapshot)

Notes:
- Question là instance được assign cho student
- Snapshot exercise data (problem_text, solution_steps, final_answer)
- Status: ASSIGNED, SUBMITTED, SKIPPED

==================================================
12. PRACTICE MODULE
==================================================

com.tutor.core.practice
├─ PracticeEntity
├─ PracticeRepository
├─ PracticeService
└─ PracticeController

Responsibilities:
- Request practice for a skill → tạo question từ exercise
- Submit practice → lưu student_answer, is_correct
- View solution → xem solution_steps
- Validate chapter & skill assignment before practice

Không có:
- Practice session
- History tracking (chi tiết)
- Scoring engine
- Trial tracking

Notes:
- Practice lưu response data: student_answer, is_correct, duration_sec, submitted_at
- Loại bỏ: trial_id, session_id, session_type

==================================================
13. AI SERVICE INTEGRATION (tutor-ai-service)
==================================================

AI Service là service riêng (Python FastAPI), không phải Java module.

Core Service Integration:
├─ client/AIServiceClient (HTTP client)
├─ config/WebClientConfig (HTTP client configuration)
└─ config/properties/AiServiceProperties (AI service URL, API key)

AIServiceClient Responsibilities:
- Call AI Service: POST /internal/ai/generate-exercises
- Validate AI input (skill_id, difficulty)
- Handle AI Service errors
- Retry logic for 5xx errors

AI Service Responsibilities (Python FastAPI):
- Generate exercises from skill_id
- Return: problem_text, solution_steps, final_answer
- Stateless (không biết về user, chapter, permission)

AI Service KHÔNG biết về:
- Chapter assignment
- Permission
- Trial / License
- User context

AI Service CHỈ nhận:
- skill_id
- grade
- difficulty (optional)
- count (số lượng exercises)

==================================================
14. BOOTSTRAP MODULE
==================================================

com.tutor.core.bootstrap
├─ DataSeeder
└─ BootstrapConfig

Responsibilities:
- Seed super admin đầu tiên (username, password_hash)
- Seed chapters (optional)
- Seed skills (optional)

Không có:
- Dynamic config
- Runtime mutation
- Trial seeding
- License seeding

==================================================
15. EXPLICITLY FORBIDDEN COMPONENTS
==================================================

The following MUST NOT exist in Phase 1:

Services:
- TrialService
- LicenceService
- PaymentService
- DeviceService
- OtpService
- PracticeSessionService
- MiniTestService
- ProgressService
- RecommendationsService
- MasteryService (thay bằng SkillCompletionService)
- ParentLinkingService
- OnboardingService

Controllers:
- TrialController
- LicenceController
- PaymentController
- DeviceController
- PracticeSessionController
- MiniTestController
- ProgressController

Entities:
- StudentTrialProfile
- TrialDevice
- LicenceInfo
- LicenseDevice
- Device
- OtpSession
- LinkToken
- SkillMastery (thay bằng SkillCompletion)
- PracticeSession
- MiniTestSession
- MiniTestResult
- SolveHistory
- ProgressSummary

Guards:
- TrialGuard
- LicenseGuard
- PermissionMatrixGuard

If found → VIOLATION

==================================================
16. IMPLEMENTATION RULE
==================================================

- Implement module by module
- Finish guards before features
- Do not cross module boundaries casually
- When in doubt → read phase-1-coding-guards.md

Module Implementation Order (suggested):
1. Common (exception, guards, model)
2. Auth (authentication)
3. User (user management)
4. Admin (admin operations)
5. Chapter (chapter management + assignment)
6. Skill (skill management + prerequisite + completion)
7. Exercise (exercise templates)
8. Question (question instances)
9. Practice (practice responses)
10. AI Integration (AIServiceClient)

==================================================
END OF BACKEND SKELETON – PHASE 1
==================================================
