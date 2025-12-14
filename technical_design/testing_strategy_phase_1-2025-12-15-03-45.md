# TESTING STRATEGY – PHASE 1 (MVP)

**Project:** Tutor  
**Document type:** Technical Design  
**Audience:** Developer / QA  
**Status:** Draft  
**Version:** 2025-12-15-03-45  
**Author:** Product Consultant (ChatGPT)


---



- ← Quay lại: [Tài liệu tổng quan](../README.md)
## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này mô tả **chiến lược testing** cho Tutor – Phase 1, bao gồm:
- Unit testing approach
- Integration testing
- API testing
- AI Service testing strategy
- Test data management
- Coverage requirements
- Testing tools

Tài liệu này đảm bảo chất lượng code và giảm thiểu bugs trước khi release.

---


## 2. TESTING PYRAMID

```
        /\
       /  \  E2E Tests (10%)
      /____\
     /      \  Integration Tests (30%)
    /________\
   /          \  Unit Tests (60%)
  /____________\
```

**Phase 1 Focus:**
- Unit Tests: 60%
- Integration Tests: 30%
- E2E Tests: 10%

---


## 3. UNIT TESTING

### 3.1. Backend – Core Service (Java Spring Boot)

**Framework:** JUnit 5 + Mockito

**Coverage Target:** ≥ 80%

**Test Areas:**
- Service layer logic
- Business rules (adaptive learning, mastery calculation)
- Utility functions
- Data transformations

**Example:**
```java
@ExtendWith(MockitoExtension.class)
class AdaptiveLearningServiceTest {
    
    @Mock
    private SkillRepository skillRepository;
    
    @Mock
    private MasteryRepository masteryRepository;
    
    @InjectMocks
    private AdaptiveLearningService adaptiveLearningService;
    
    @Test
    void testSelectTargetSkill_ReturnsWeakestSkill() {
        // Given
        Student student = createStudent();
        Skill weakSkill = createSkill("6.3.9", 45);
        
        when(masteryRepository.findByStudentId(student.getId()))
            .thenReturn(createMasteries(weakSkill));
        
        // When
        Skill target = adaptiveLearningService.selectTargetSkill(student);
        
        // Then
        assertEquals("6.3.9", target.getId());
    }
}
```

**Best Practices:**
- Test một behavior tại một thời điểm
- Use descriptive test names
- Arrange-Act-Assert pattern
- Mock external dependencies

---

### 3.2. Backend – AI Service (Python)

**Framework:** pytest

**Coverage Target:** ≥ 70%

**Test Areas:**
- Math solver logic
- OCR preprocessing
- Prompt generation
- Response parsing

**Example:**
```python
import pytest
from unittest.mock import Mock, patch
from ai_service.solver import MathSolver

class TestMathSolver:
    
    @pytest.fixture
    def solver(self):
        return MathSolver()
    
    def test_solve_fraction_addition(self, solver):
        # Given
        problem = "Tính: 2/3 + 1/4"
        grade = 6
        
        # When
        result = solver.solve(problem, grade)
        
        # Then
        assert result.final_answer == "11/12"
        assert len(result.steps) > 0
    
    @patch('ai_service.solver.OpenAIClient')
    def test_solve_with_mock_ai(self, mock_ai):
        # Test với mocked AI response
        pass
```

---

### 3.3. Frontend – Student App (Flutter)

**Framework:** Flutter Test

**Coverage Target:** ≥ 60%

**Test Areas:**
- Widget tests
- Business logic (view models)
- State management
- API client mocks

**Example:**
```dart
void main() {
  group('OnboardingViewModel', () {
    test('should create trial profile when grade selected', () async {
      // Given
      final viewModel = OnboardingViewModel();
      final mockApi = MockStudentApi();
      
      // When
      await viewModel.selectGrade(6);
      
      // Then
      expect(viewModel.grade, 6);
      verify(mockApi.createTrial(grade: 6)).called(1);
    });
  });
}
```

---

### 3.4. Frontend – Parent Dashboard (Next.js)

**Framework:** Jest + React Testing Library

**Coverage Target:** ≥ 60%

**Test Areas:**
- Component rendering
- User interactions
- API hooks
- Form validation

**Example:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should submit login form with valid credentials', async () => {
    // Given
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    // When
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'parent@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    // Then
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'parent@example.com',
        password: 'password123'
      });
    });
  });
});
```

---

## 4. INTEGRATION TESTING

### 4.1. API Integration Tests

**Framework:** 
- Java: Spring Boot Test + TestContainers
- Python: pytest + httpx

**Test Areas:**
- End-to-end API flows
- Database interactions
- External service calls (AI Service)

**Example (Java):**
```java
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class StudentApiIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15");
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void testCreateTrialProfile_ReturnsSuccess() throws Exception {
        // Given
        CreateTrialRequest request = new CreateTrialRequest(6, "device-id");
        
        // When & Then
        mockMvc.perform(post("/api/student/trial/start")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.grade").value(6));
    }
}
```

---

### 4.2. Database Integration Tests

**Test Areas:**
- Repository layer
- Migration scripts
- Data integrity
- Transaction handling

**Example:**
```java
@DataJpaTest
class PracticeRepositoryTest {
    
    @Autowired
    private PracticeRepository practiceRepository;
    
    @Test
    void testFindByStudentId_ReturnsPractices() {
        // Given
        Student student = createStudent();
        Practice practice = createPractice(student);
        practiceRepository.save(practice);
        
        // When
        List<Practice> practices = practiceRepository.findByStudentId(student.getId());
        
        // Then
        assertThat(practices).hasSize(1);
        assertThat(practices.get(0).getStudentId()).isEqualTo(student.getId());
    }
}
```

---

### 4.3. Service Integration Tests

**Test Areas:**
- Core Service ↔ AI Service communication
- Error handling
- Timeout handling
- Retry logic

**Example:**
```java
@SpringBootTest
class AIServiceIntegrationTest {
    
    @MockBean
    private AIServiceClient aiServiceClient;
    
    @Autowired
    private TutorService tutorService;
    
    @Test
    void testSolveMathProblem_CallsAIService() {
        // Given
        SolveRequest request = new SolveRequest("2/3 + 1/4", 6);
        when(aiServiceClient.solve(any())).thenReturn(createSolution());
        
        // When
        Solution solution = tutorService.solve(request);
        
        // Then
        verify(aiServiceClient).solve(any());
        assertThat(solution.getFinalAnswer()).isNotNull();
    }
}
```

---

## 5. API TESTING

### 5.1. Postman Collection

Tạo Postman collection cho tất cả APIs:
- Environment variables (dev, staging, prod)
- Pre-request scripts (auth tokens)
- Test assertions
- Data-driven tests

**Structure:**
```
Tutor API Collection
├── Authentication
│   ├── Register Parent
│   └── Login Parent
├── Student APIs
│   ├── Trial
│   ├── Tutor Mode
│   └── Practice
└── Parent APIs
    ├── Student Management
    └── Reporting
```

---

### 5.2. Contract Testing

**Tool:** Pact (nếu cần)

**Purpose:** Đảm bảo contract giữa Core Service và AI Service không bị break.

---

## 6. AI SERVICE TESTING STRATEGY

### 6.1. Unit Tests

- Test prompt generation
- Test response parsing
- Test error handling

### 6.2. Integration Tests với Mock AI

- Mock OpenAI API responses
- Test với sample problems
- Validate solution format

### 6.3. Manual Testing

- Test với real math problems
- Validate solution accuracy
- Check Vietnamese language output

**Test Cases:**
```python
test_cases = [
    {
        "problem": "Tính: 2/3 + 1/4",
        "expected_answer": "11/12",
        "grade": 6
    },
    {
        "problem": "Rút gọn phân số: 12/18",
        "expected_answer": "2/3",
        "grade": 6
    }
]
```

---

## 7. TEST DATA MANAGEMENT

### 7.1. Test Fixtures

**Java:**
```java
public class TestFixtures {
    public static Student createStudent() {
        return Student.builder()
            .id(UUID.randomUUID())
            .grade(6)
            .status(StudentStatus.LINKED)
            .build();
    }
}
```

**Python:**
```python
@pytest.fixture
def sample_student():
    return {
        "id": "test-student-id",
        "grade": 6,
        "status": "linked"
    }
```

### 7.2. Test Database

- Use TestContainers cho integration tests
- Separate test database
- Cleanup sau mỗi test

### 7.3. Mock Data

- Use factories (Java: Builder pattern, Python: Faker)
- Consistent test data
- Realistic scenarios

---

## 8. COVERAGE REQUIREMENTS

### 8.1. Minimum Coverage

| Layer | Coverage Target |
|-------|----------------|
| Service Layer | ≥ 80% |
| Repository Layer | ≥ 70% |
| Controller Layer | ≥ 60% |
| Utility Functions | ≥ 90% |
| AI Service Core Logic | ≥ 70% |
| Frontend Business Logic | ≥ 60% |

### 8.2. Coverage Tools

- **Java:** JaCoCo
- **Python:** Coverage.py
- **TypeScript/JavaScript:** Istanbul/nyc
- **Flutter:** Flutter Test Coverage

---

## 9. TESTING TOOLS

### 9.1. Backend

| Tool | Purpose |
|------|---------|
| JUnit 5 | Unit testing (Java) |
| Mockito | Mocking (Java) |
| TestContainers | Integration testing |
| pytest | Unit testing (Python) |
| httpx | HTTP testing (Python) |

### 9.2. Frontend

| Tool | Purpose |
|------|---------|
| Flutter Test | Unit/Widget testing |
| Jest | Unit testing (Next.js) |
| React Testing Library | Component testing |
| Playwright | E2E testing (optional) |

### 9.3. API Testing

| Tool | Purpose |
|------|---------|
| Postman | Manual API testing |
| REST Assured | API testing (Java) |
| pytest-httpx | API testing (Python) |

---

## 10. TESTING WORKFLOW

### 10.1. Pre-commit

```bash
# Run unit tests
mvn test
pytest tests/unit
flutter test

# Check coverage
mvn jacoco:check
```

### 10.2. CI/CD Pipeline

```yaml
# .github/workflows/test.yml
- name: Run Unit Tests
  run: mvn test
  
- name: Run Integration Tests
  run: mvn verify
  
- name: Check Coverage
  run: mvn jacoco:check
```

### 10.3. Before Release

- Run full test suite
- Manual testing checklist
- Performance testing
- Security testing

---

## 11. TESTING CHECKLIST

### 11.1. Unit Tests

- [ ] All service methods tested
- [ ] Edge cases covered
- [ ] Error handling tested
- [ ] Coverage ≥ target

### 11.2. Integration Tests

- [ ] API endpoints tested
- [ ] Database operations tested
- [ ] External service calls tested
- [ ] Error scenarios covered

### 11.3. Manual Testing

- [ ] User flows tested
- [ ] UI/UX verified
- [ ] Cross-browser testing (web)
- [ ] Mobile device testing

---

## 12. PERFORMANCE TESTING

### 12.1. Load Testing

**Tool:** JMeter hoặc k6

**Scenarios:**
- 100 concurrent users
- API response time < 2s
- Database query performance

### 12.2. Stress Testing

- Test system limits
- Identify bottlenecks
- Memory leaks detection

---

## 13. SECURITY TESTING

### 13.1. Areas to Test

- Authentication/Authorization
- SQL Injection
- XSS (Cross-site scripting)
- CSRF protection
- Input validation

### 13.2. Tools

- OWASP ZAP
- SonarQube
- Dependency scanning

---

## 14. TÀI LIỆU LIÊN QUAN

- [API Specification](./api_specification_phase_1-2025-12-15-03-30.md)
- [Development Setup Guide](./development_setup_phase_1-2025-12-15-03-00.md)

---

## 15. GHI CHÚ / TODO

- [ ] Setup CI/CD pipeline với automated tests
- [ ] Create test data seeding scripts
- [ ] Document test environment setup
- [ ] Add performance benchmarks

---

## 16. LỊCH SỬ THAY ĐỔI

- 2025-12-15-03-45: Tạo mới Testing Strategy



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)