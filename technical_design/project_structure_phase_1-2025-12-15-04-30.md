# PROJECT STRUCTURE – PHASE 1 (MVP)

**Project:** Tutor  
**Document type:** Technical Design  
**Audience:** Developer  
**Status:** Draft  
**Version:** 2025-12-15-04-30  
**Author:** Product Consultant (ChatGPT)


---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả **cấu trúc project** cho Tutor – Phase 1, bao gồm:
- Repository structure (monorepo vs multi-repo)
- Frontend project structure
- Backend project structure (Core Service, AI Service)
- Naming conventions
- Module organization

Tài liệu này giúp developer mới hiểu codebase và maintain consistency.

---


## 2. REPOSITORY STRATEGY

### 2.1. Monorepo (Recommended cho MVP)

**Structure:**
```
tutor/
├── core-service/          # Java Spring Boot
├── ai-service/            # Python FastAPI
├── student-app/           # Flutter
├── parent-dashboard/      # Next.js
├── tutor_docs/            # Documentation
├── docker-compose.yml     # Local development
└── README.md
```

**Advantages:**
- Easy code sharing
- Single CI/CD pipeline
- Consistent versioning
- Simplified dependency management

---


## 3. CORE SERVICE STRUCTURE (JAVA SPRING BOOT)

### 3.1. Directory Structure

```
core-service/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── tutor/
│   │   │           ├── TutorApplication.java
│   │   │           ├── config/              # Configuration classes
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   ├── DatabaseConfig.java
│   │   │           │   └── WebConfig.java
│   │   │           ├── controller/         # REST controllers
│   │   │           │   ├── StudentController.java
│   │   │           │   ├── ParentController.java
│   │   │           │   ├── TutorController.java
│   │   │           │   └── ReportController.java
│   │   │           ├── service/             # Business logic
│   │   │           │   ├── StudentService.java
│   │   │           │   ├── AdaptiveLearningService.java
│   │   │           │   ├── MasteryService.java
│   │   │           │   └── ReportService.java
│   │   │           ├── repository/          # Data access
│   │   │           │   ├── StudentRepository.java
│   │   │           │   ├── SkillRepository.java
│   │   │           │   ├── PracticeRepository.java
│   │   │           │   └── MasteryRepository.java
│   │   │           ├── model/               # Entity classes
│   │   │           │   ├── Student.java
│   │   │           │   ├── Skill.java
│   │   │           │   ├── Practice.java
│   │   │           │   └── Mastery.java
│   │   │           ├── dto/                 # Data Transfer Objects
│   │   │           │   ├── StudentDTO.java
│   │   │           │   └── PracticeDTO.java
│   │   │           ├── exception/           # Exception handlers
│   │   │           │   ├── GlobalExceptionHandler.java
│   │   │           │   └── CustomException.java
│   │   │           └── util/                # Utilities
│   │   │               └── JwtUtil.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       └── db/
│   │           └── migration/                # Flyway migrations
│   │               ├── V1__Initial_schema.sql
│   │               └── R__Seed_skills.sql
│   └── test/
│       └── java/
│           └── com/
│               └── tutor/
│                   ├── controller/
│                   ├── service/
│                   └── repository/
├── pom.xml
├── Dockerfile
└── README.md
```

### 3.2. Package Naming Convention

- Base package: `com.tutor`
- Controllers: `com.tutor.controller`
- Services: `com.tutor.service`
- Repositories: `com.tutor.repository`
- Models: `com.tutor.model`
- DTOs: `com.tutor.dto`

---

## 4. AI SERVICE STRUCTURE (PYTHON FASTAPI)

### 4.1. Directory Structure

```
ai-service/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app
│   ├── config.py               # Configuration
│   ├── models/                 # Data models
│   │   ├── __init__.py
│   │   ├── request.py
│   │   └── response.py
│   ├── services/               # Business logic
│   │   ├── __init__.py
│   │   ├── math_solver.py
│   │   ├── ocr_service.py
│   │   └── prompt_generator.py
│   ├── api/                    # API routes
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── dependencies.py
│   └── utils/                  # Utilities
│       ├── __init__.py
│       └── validators.py
├── tests/
│   ├── __init__.py
│   ├── test_math_solver.py
│   └── test_api.py
├── pyproject.toml
├── poetry.lock
├── Dockerfile
├── .env.example
└── README.md
```

### 4.2. Module Organization

- **app/main.py:** FastAPI application entry point
- **app/config.py:** Environment configuration
- **app/services/:** Core business logic
- **app/api/:** API endpoints
- **app/models/:** Pydantic models

---

## 5. STUDENT APP STRUCTURE (FLUTTER)

### 5.1. Directory Structure

```
student-app/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── config/
│   │   ├── env.dart
│   │   └── theme.dart
│   ├── models/                 # Data models
│   │   ├── student.dart
│   │   ├── skill.dart
│   │   └── practice.dart
│   ├── services/              # API clients
│   │   ├── api_client.dart
│   │   ├── student_service.dart
│   │   └── tutor_service.dart
│   ├── screens/                # UI screens
│   │   ├── onboarding/
│   │   │   ├── grade_selection.dart
│   │   │   └── goal_selection.dart
│   │   ├── tutor/
│   │   │   ├── solve_screen.dart
│   │   │   └── solution_screen.dart
│   │   ├── practice/
│   │   │   └── practice_screen.dart
│   │   └── progress/
│   │       └── progress_screen.dart
│   ├── widgets/                # Reusable widgets
│   │   ├── skill_card.dart
│   │   └── practice_question.dart
│   ├── view_models/            # State management
│   │   ├── onboarding_viewmodel.dart
│   │   └── practice_viewmodel.dart
│   └── utils/                  # Utilities
│       ├── validators.dart
│       └── constants.dart
├── test/
│   ├── view_models/
│   └── widgets/
├── pubspec.yaml
├── analysis_options.yaml
└── README.md
```

### 5.2. Naming Convention

- **Files:** `snake_case.dart`
- **Classes:** `PascalCase`
- **Variables:** `camelCase`
- **Constants:** `UPPER_SNAKE_CASE`

---

## 6. PARENT DASHBOARD STRUCTURE (NEXT.JS)

### 6.1. Directory Structure

```
parent-dashboard/
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── api/                # API routes (if needed)
│   ├── components/             # React components
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── dashboard/
│   │   │   ├── SummaryCard.tsx
│   │   │   └── ProgressChart.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   ├── lib/                    # Utilities & config
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── endpoints.ts
│   │   ├── hooks/              # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useReport.ts
│   │   └── utils/
│   │       └── formatters.ts
│   ├── types/                  # TypeScript types
│   │   ├── student.ts
│   │   └── report.ts
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/
│   └── favicon.ico
├── tests/
│   ├── components/
│   └── utils/
├── next.config.js
├── tsconfig.json
├── package.json
├── .env.example
└── README.md
```

### 6.2. Naming Convention

- **Files:** `PascalCase.tsx` (components), `camelCase.ts` (utilities)
- **Components:** `PascalCase`
- **Hooks:** `useCamelCase`
- **Types/Interfaces:** `PascalCase`

---

## 7. SHARED RESOURCES

### 7.1. Documentation

```
tutor_docs/
├── prd/
├── user_stories/
├── user_flows/
├── education_logic/
├── technical_design/
├── database_design/
├── sequence_diagrams/
├── ai/
└── learning/
```

### 7.2. Docker Configuration

```
tutor/
├── docker-compose.yml          # Local development
├── docker-compose.prod.yml     # Production
└── nginx/
    └── nginx.conf
```

---

## 8. NAMING CONVENTIONS

### 8.1. Java (Core Service)

- **Classes:** `PascalCase` (e.g., `StudentService`)
- **Methods:** `camelCase` (e.g., `getStudentById`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`)
- **Packages:** `lowercase` (e.g., `com.tutor.service`)

### 8.2. Python (AI Service)

- **Modules:** `snake_case` (e.g., `math_solver.py`)
- **Classes:** `PascalCase` (e.g., `MathSolver`)
- **Functions:** `snake_case` (e.g., `solve_problem`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_TOKENS`)

### 8.3. TypeScript/JavaScript (Parent Dashboard)

- **Files:** `PascalCase.tsx` (components), `camelCase.ts` (utilities)
- **Components:** `PascalCase` (e.g., `SummaryCard`)
- **Functions:** `camelCase` (e.g., `formatDate`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)

### 8.4. Dart (Student App)

- **Files:** `snake_case.dart`
- **Classes:** `PascalCase` (e.g., `StudentService`)
- **Variables:** `camelCase` (e.g., `studentId`)
- **Constants:** `lowerCamelCase` (e.g., `apiBaseUrl`)

---

## 9. MODULE ORGANIZATION PRINCIPLES

### 9.1. Separation of Concerns

- **Controllers:** Handle HTTP requests/responses
- **Services:** Business logic
- **Repositories:** Data access
- **Models:** Data structures

### 9.2. Dependency Direction

```
Controller → Service → Repository → Database
```

### 9.3. Shared Code

- Common utilities in `util/` or `utils/`
- Shared types/interfaces in `types/` or `model/`
- Constants in `constants/` or config files

---

## 10. FILE ORGANIZATION RULES

### 10.1. One Class Per File

- Java: One public class per file
- Python: One class per file (recommended)
- TypeScript: One component per file
- Dart: One class per file

### 10.2. File Size

- Maximum: ~300-400 lines
- If larger, consider splitting into smaller modules

### 10.3. Import Organization

**Java:**
```java
// Standard library
import java.util.List;

// Third-party
import org.springframework.stereotype.Service;

// Application
import com.tutor.model.Student;
```

**Python:**
```python
# Standard library
import os
from typing import List

# Third-party
from fastapi import APIRouter

# Application
from app.models import Student
```

---

## 11. GIT STRUCTURE

### 11.1. Branching

```
main (production)
  └── develop (integration)
      ├── feature/feature-name
      ├── bugfix/bug-name
      └── hotfix/hotfix-name
```

### 11.2. Commit Messages

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 12. TÀI LIỆU LIÊN QUAN

- [Development Setup Guide](./development_setup_phase_1-2025-12-15-03-00.md)
- [System Architecture](./system_architecture_phase_1-2025-12-15-00-21.md)

---

## 13. GHI CHÚ / TODO

- [ ] Create project templates/skeletons
- [ ] Document code review guidelines
- [ ] Add linting/formatting configuration
- [ ] Create onboarding checklist for new developers

---

## 14. LỊCH SỬ THAY ĐỔI

- 2025-12-15-04-30: Tạo mới Project Structure



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)