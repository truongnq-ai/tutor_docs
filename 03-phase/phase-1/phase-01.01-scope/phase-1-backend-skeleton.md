BACKEND SKELETON – PHASE 1
Project: Gia sư Toán AI
Applies to: Phase 1 – Core Personal Learning System
Status: DESIGN ONLY – IMPLEMENT AFTER APPROVAL
Purpose: Define minimal backend structure for Phase 1

==================================================
1. OVERALL BACKEND PRINCIPLES
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
2. PACKAGE STRUCTURE (TOP LEVEL)
==================================================

com.tutor.core
├─ config
├─ common
├─ user
├─ chapter
├─ skill
├─ practice
├─ ai
└─ bootstrap

==================================================
3. COMMON MODULE
==================================================

com.tutor.core.common
├─ exception
│  ├─ ForbiddenException
│  ├─ NotFoundException
│  └─ BadRequestException
│
├─ guard
│  ├─ RoleGuard
│  ├─ ChapterAssignmentGuard
│  └─ SkillPrerequisiteGuard
│
└─ model
   ├─ BaseEntity
   └─ Role (PARENT, STUDENT)

Không có:
- PermissionResolver
- PolicyEngine
- ContextAwareGuard

==================================================
4. USER MODULE
==================================================

com.tutor.core.user
├─ UserEntity
├─ UserRepository
├─ UserService
└─ UserController

Responsibilities:
- Load user
- Identify role
- No registration
- No OTP
- No password recovery

==================================================
5. CHAPTER MODULE
==================================================

com.tutor.core.chapter
├─ ChapterEntity
├─ ChapterRepository
├─ ChapterAssignmentEntity
├─ ChapterService
└─ ChapterController

Responsibilities:
- Create / update chapter (PARENT only)
- Assign chapter to student
- Validate chapter ownership

==================================================
6. SKILL MODULE
==================================================

com.tutor.core.skill
├─ SkillEntity
├─ SkillPrerequisiteEntity
├─ SkillCompletionEntity
├─ SkillRepository
├─ SkillService
└─ SkillController

Responsibilities:
- List skills per chapter
- Check prerequisite
- Mark completion (boolean)

No:
- mastery level
- adaptive logic

==================================================
7. PRACTICE MODULE
==================================================

com.tutor.core.practice
├─ PracticeRequest
├─ PracticeResult
├─ PracticeService
└─ PracticeController

Responsibilities:
- Request practice for a skill
- Validate chapter & skill before practice
- Return exercises + solutions

No:
- history tracking
- scoring engine

==================================================
8. AI MODULE
==================================================

com.tutor.core.ai
├─ AiClient
├─ AiRequest
├─ AiResponse
└─ AiService

Responsibilities:
- Call AI with validated input
- No memory
- No cache beyond request
- No user context inference

AI input must include:
- skill_id
- difficulty (optional, fixed)

AI output:
- exercises
- explanations

==================================================
9. BOOTSTRAP MODULE
==================================================

com.tutor.core.bootstrap
├─ DataSeeder
└─ BootstrapConfig

Responsibilities:
- Seed users
- Seed chapters
- Seed skills

No:
- dynamic config
- runtime mutation

==================================================
10. EXPLICITLY FORBIDDEN COMPONENTS
==================================================

The following MUST NOT exist in Phase 1:

- TrialService
- LicenseService
- PermissionMatrix
- EntitlementResolver
- SubscriptionEntity
- DeviceEntity
- UsageTracking

If found → VIOLATION

==================================================
11. IMPLEMENTATION RULE
==================================================

- Implement module by module
- Finish guards before features
- Do not cross module boundaries casually
- When in doubt → read coding-guard-phase-1.txt

==================================================
END OF BACKEND SKELETON – PHASE 1
==================================================
