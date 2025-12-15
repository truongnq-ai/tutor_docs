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
│   ├── Register Parent (with phone + OTP)
│   ├── Login Parent (phone + password)
│   ├── OAuth Login (Google/Apple)
│   ├── Update Phone Number
│   └── Verify Phone OTP
├── Linking (Student App)
│   ├── Request OTP (phone-based)
│   ├── Verify OTP
│   └── Confirm Link Token (parent-first)
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

## 10. TEST CASES - OTP & OAuth FLOWS

### 10.1. OTP Flow Test Cases

#### POST /api/link/request-otp (Student App)

**Test Cases:**
1. **Happy Path:**
   - Request OTP với phone hợp lệ, trialId hợp lệ, recaptchaToken hợp lệ
   - Expected: 200 OK, OTP sent message
   - Verify: OTP session created in database

2. **Invalid Phone Format:**
   - Request với phone không hợp lệ (ví dụ: "123")
   - Expected: 400 VALIDATION_ERROR

3. **Rate Limiting:**
   - Gửi OTP lần 1, 2, 3 → Success
   - Gửi OTP lần 4 → Expected: 429 RATE_LIMIT_EXCEEDED
   - Verify: Rate limit reset sau 24h

4. **reCaptcha Failed:**
   - Request với recaptchaToken không hợp lệ
   - Expected: 400 RECAPTCHA_FAILED

5. **Invalid Trial ID:**
   - Request với trialId không tồn tại
   - Expected: 404 TRIAL_NOT_FOUND

6. **Parent Exists vs Not Exists:**
   - Test với phone đã có parent_account → Verify parent_id được lưu
   - Test với phone chưa có parent_account → Verify parent_id = null

#### POST /api/link/verify-otp (Student App)

**Test Cases:**
1. **Happy Path - Parent Exists:**
   - Verify OTP với phone, otp đúng, trialId hợp lệ
   - Parent account đã tồn tại
   - Expected: 200 OK, studentId, parentId, loginCredentials, dashboardUrl
   - Verify: StudentTrialProfile → StudentProfile conversion
   - Verify: Learning data merged

2. **Happy Path - Parent Not Exists:**
   - Verify OTP với phone chưa có parent_account
   - Expected: 200 OK, parent_account created (status: pending_activation, phone_verified: true)
   - Verify: StudentProfile created
   - Verify: Activation SMS sent

3. **Invalid OTP:**
   - Verify với OTP sai
   - Expected: 400 OTP_INVALID

4. **Expired OTP:**
   - Verify với OTP đã hết hạn (> 5 phút)
   - Expected: 400 OTP_EXPIRED

5. **OTP Already Used:**
   - Verify OTP lần 1 → Success
   - Verify OTP lần 2 với cùng OTP → Expected: 400 OTP_INVALID

6. **Phone Mismatch:**
   - Request OTP với phone A
   - Verify OTP với phone B → Expected: 400 OTP_INVALID

### 10.2. OAuth Login Flow Test Cases

#### POST /api/parent/oauth/login

**Test Cases:**
1. **Happy Path - New Account:**
   - Login với Google/Apple token hợp lệ
   - Account chưa tồn tại
   - Expected: 200 OK, parentId, requiresPhoneVerification: true
   - Verify: parent_account created (oauth_provider, oauth_id, email, name, phone_verified: false)

2. **Happy Path - Existing Account (Phone Verified):**
   - Login với OAuth token
   - Account đã tồn tại, phone_verified = true
   - Expected: 200 OK, JWT token, requiresPhoneVerification: false
   - Verify: Redirect to dashboard

3. **Existing Account (Phone Not Verified):**
   - Login với OAuth token
   - Account đã tồn tại, phone_verified = false
   - Expected: 200 OK, requiresPhoneVerification: true
   - Verify: Redirect to phone update screen

4. **Invalid OAuth Token:**
   - Login với token không hợp lệ
   - Expected: 401 UNAUTHORIZED

5. **Invalid Provider:**
   - Login với provider = "facebook" (không hỗ trợ)
   - Expected: 400 VALIDATION_ERROR

#### POST /api/parent/phone/update

**Test Cases:**
1. **Happy Path:**
   - Update phone với phone hợp lệ (sau OAuth login)
   - Expected: 200 OK, OTP sent message
   - Verify: OTP session created

2. **Invalid Phone Format:**
   - Update với phone không hợp lệ
   - Expected: 400 VALIDATION_ERROR

3. **Phone Already Used:**
   - Update với phone đã được sử dụng bởi account khác
   - Expected: 409 CONFLICT

4. **Rate Limiting:**
   - Update phone 3 lần → Success
   - Update phone lần 4 → Expected: 429 RATE_LIMIT_EXCEEDED

#### POST /api/parent/phone/verify-otp

**Test Cases:**
1. **Happy Path:**
   - Verify OTP với phone, otp đúng
   - Expected: 200 OK, phoneVerified: true
   - Verify: parent_account.phone_number updated
   - Verify: parent_account.phone_verified = true
   - Verify: Redirect to dashboard

2. **Invalid OTP:**
   - Verify với OTP sai
   - Expected: 400 OTP_INVALID

3. **Expired OTP:**
   - Verify với OTP đã hết hạn
   - Expected: 400 OTP_EXPIRED

### 10.3. Parent Registration with Phone Test Cases

#### POST /api/parent/register

**Test Cases:**
1. **Happy Path:**
   - Register với name, phone, password hợp lệ, email optional
   - Expected: 201 Created, requiresOtpVerification: true
   - Verify: parent_account created (status: pending_verification)
   - Next step: Call /api/parent/phone/verify-otp

2. **Missing Required Fields:**
   - Register thiếu name → Expected: 400 VALIDATION_ERROR
   - Register thiếu phone → Expected: 400 VALIDATION_ERROR
   - Register thiếu password → Expected: 400 VALIDATION_ERROR

3. **Phone Already Exists:**
   - Register với phone đã tồn tại
   - Expected: 409 CONFLICT

4. **Weak Password:**
   - Register với password < 8 characters
   - Expected: 400 VALIDATION_ERROR

5. **Invalid Phone Format:**
   - Register với phone không hợp lệ
   - Expected: 400 VALIDATION_ERROR

### 10.4. Rate Limiting Test Cases

**Test Scenarios:**
1. **OTP Request Rate Limit:**
   - Setup: Redis/cache với key `otp_limit:{phone}:{date}`
   - Test: Gửi OTP 3 lần → Success
   - Test: Gửi OTP lần 4 → 429 RATE_LIMIT_EXCEEDED
   - Test: Reset sau 24h → Có thể gửi lại

2. **Rate Limit per Phone Number:**
   - Test: Phone A gửi 3 lần → Success
   - Test: Phone B gửi 3 lần → Success (không ảnh hưởng)
   - Test: Phone A gửi lần 4 → 429 RATE_LIMIT_EXCEEDED

### 10.5. reCaptcha Test Cases

**Test Scenarios:**
1. **Valid reCaptcha:**
   - Request OTP với recaptchaToken hợp lệ
   - Expected: Success

2. **Invalid reCaptcha:**
   - Request OTP với recaptchaToken không hợp lệ
   - Expected: 400 RECAPTCHA_FAILED

3. **Missing reCaptcha:**
   - Request OTP không có recaptchaToken
   - Expected: 400 VALIDATION_ERROR

4. **reCaptcha Expired:**
   - Request OTP với recaptchaToken đã hết hạn
   - Expected: 400 RECAPTCHA_FAILED

### 10.6. Phone Verification Test Cases

**Test Scenarios:**
1. **Dashboard Access Control:**
   - Login OAuth với phone_verified = false
   - Try access dashboard → Expected: 403 FORBIDDEN, redirect to phone update

2. **Phone Verification Required:**
   - OAuth login → phone_verified = false
   - Update phone → Verify OTP → phone_verified = true
   - Access dashboard → Expected: Success

3. **Auto Account Creation:**
   - Student links với phone chưa có parent_account
   - Verify OTP → Expected: parent_account created (status: pending_activation)
   - Verify: SMS activation link sent

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
- [ ] OTP flow tested (request, verify, rate limiting)
- [ ] OAuth login flow tested (Google, Apple)
- [ ] Phone verification flow tested
- [ ] reCaptcha integration tested
- [ ] Auto account creation tested

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
- OTP security (expiry, single-use, rate limiting)
- OAuth token validation
- Phone number validation and sanitization
- reCaptcha bypass attempts

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
- 2025-12-15-XX-XX: Thêm test cases cho OTP flow, OAuth login flow, rate limiting, reCaptcha, phone verification, và auto account creation



---

---

- ← Quay lại: [Tài liệu tổng quan](../README.md)