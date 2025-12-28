# AI Exercise Generation - Implementation Documentation

## Tổng quan

Tính năng AI Exercise Generation cho phép admin tự động tạo bài tập Toán cho học sinh lớp 6-7 sử dụng các LLM providers (Gemini, HuggingFace, OpenAI) với fallback mechanism.

## Kiến trúc

### Flow Diagram

```
Admin Dashboard → Core Service → AI Service → Multi-Provider Service → LLM Provider
                                                      ↓
                                              (Fallback: Gemini → HuggingFace → OpenAI)
                                                      ↓
                                              Exercise Generation Service
                                                      ↓
                                              LaTeX Validation & Conversion
                                                      ↓
                                              Redis Cache
                                                      ↓
                                              Core Service (Save as PENDING)
                                                      ↓
                                              Admin Review & Approve
```

### Components

#### 1. Core Service Layer

**Database Schema:**
- `skill` table: Thêm field `description` (TEXT) để cung cấp context cho AI
- `prompt_template` table: Quản lý prompt templates cho exercise generation
  - `id` (UUID)
  - `name` (VARCHAR, unique)
  - `version` (INT)
  - `system_prompt` (TEXT)
  - `user_prompt_template` (TEXT)
  - `output_format_schema` (JSONB)
  - `is_active` (BOOLEAN)

**Entities:**
- `PromptTemplate`: Entity cho prompt templates
- `Skill`: Updated với field `description`

**Services:**
- `PromptTemplateService`: CRUD operations cho prompt templates
- `ExerciseGenerationService`: Orchestrates AI exercise generation
  - Fetches skill metadata
  - Loads prompt template
  - Calls AI Service
  - Validates and saves exercises as PENDING

**Client:**
- `AIServiceClient`: HTTP client với WebClient, timeout, retry, error handling

**Controller:**
- `PromptTemplateController`: REST API cho prompt template management
- `ExerciseController`: Endpoint `POST /api/v1/admin/exercises/generate`

#### 2. AI Service Layer

**Providers:**
- `GeminiProvider`: Google Gemini API integration
- `HuggingFaceProvider`: HuggingFace Inference API integration
- `OpenAIProvider`: OpenAI API integration (enhanced with `generate_exercises`)

**Multi-Provider Service:**
- `MultiProviderService`: Sequential fallback (Gemini → HuggingFace → OpenAI)
- Circuit breaker pattern
- Exponential backoff retry (max 3 retries)
- Health tracking per provider

**Exercise Generation Service:**
- `ExerciseGenerationService`: Core logic for exercise generation
  - Builds prompts from templates
  - Calls multi-provider service
  - Parses LLM response
  - Validates exercise data
  - Processes LaTeX

**LaTeX Utilities:**
- `latex_validator.py`: Validates LaTeX syntax
- `latex_converter.py`: Converts text to LaTeX using SymPy

**Caching:**
- Redis cache for:
  - Generated exercises (TTL: 7 days)
  - Prompt templates (TTL: 24 hours)
  - Skill metadata (TTL: 24 hours)

**API Endpoint:**
- `POST /internal/ai/generate-exercises`: Internal endpoint for Core Service

#### 3. Admin Dashboard Layer

**Prompt Template Management:**
- `PromptTemplateList`: List view với filters
- `PromptTemplateCreateModal`: Create new templates
- `PromptTemplateEditModal`: Edit existing templates
- `PromptTemplateDetailModal`: View template details

**Exercise Generation UI:**
- (Phase 4 - Pending) ExerciseGenerateModal
- (Phase 4 - Pending) ExercisePreviewModal
- (Phase 4 - Pending) Enhanced ExerciseDetailView

## Workflow

### 1. Prompt Template Management

1. Admin tạo/chỉnh sửa prompt template qua UI
2. Template được lưu vào database với version control
3. Template có thể activate/deactivate
4. AI Service fetch template từ Core Service API (có cache)

### 2. Exercise Generation

1. Admin chọn skill, grade, difficulty, count
2. Core Service:
   - Validate skill exists
   - Fetch skill metadata (có cache)
   - Load prompt template (có cache)
   - Build user prompt với placeholders
3. AI Service:
   - Check cache cho generated exercises
   - Nếu không có cache, gọi MultiProviderService
   - MultiProviderService thử từng provider theo thứ tự:
     - Gemini (primary)
     - HuggingFace (fallback)
     - OpenAI (fallback)
   - Parse JSON response từ LLM
   - Validate và process exercises:
     - Validate LaTeX (nếu có)
     - Convert text to LaTeX nếu cần
     - Calculate confidence scores
   - Cache kết quả
4. Core Service:
   - Convert AI response to Exercise entities
   - Save với status PENDING
   - Return list of exercises
5. Admin review và approve/reject exercises

### 3. LaTeX Processing

1. AI generate `problemLatex` (có thể null)
2. Validate LaTeX syntax
3. Nếu invalid hoặc missing:
   - Thử convert từ `problemText` bằng SymPy
   - Nếu vẫn không được, mark as MISSING
4. Set `latexStatus`: VALID, CONVERTED, hoặc MISSING

## Configuration

### Environment Variables

**AI Service:**
```bash
GEMINI_API_KEY=your_gemini_key
HUGGINGFACE_API_KEY=your_huggingface_key
OPENAI_API_KEY=your_openai_key
AI_PROVIDER_FALLBACK_ORDER=gemini,huggingface,openai
AI_PROVIDER_TIMEOUT_SEC=30
AI_PROVIDER_MAX_RETRIES=3
```

**Core Service:**
```yaml
ai-service:
  url: http://localhost:6890
  api-key: internal-api-key-12345
  timeout:
    connect: 3000
    read: 30000
```

## Error Handling

### Error Codes

- `4001`: AI Service unavailable (timeout, connection error)
- `4002`: Invalid request to AI Service
- `5001`: Internal server error
- `3005`: Skill not found
- `3015`: Prompt template not found

### Retry Logic

- Max 3 retries với exponential backoff
- Chỉ retry cho transient errors (5xx, timeout)
- Không retry cho permanent errors (4xx, invalid API key)

### Circuit Breaker

- Open circuit sau 5 consecutive failures
- Close circuit sau 60 seconds
- Skip providers với circuit open

## Caching Strategy

### Cache Keys

- Generated exercises: `generated_exercises:{hash}` (TTL: 7 days)
- Prompt templates: `prompt_template:{name}` (TTL: 24 hours)
- Skill metadata: `skill_metadata:{skill_id}` (TTL: 24 hours)

### Cache Invalidation

- Manual: Admin có thể update prompt template → cache tự động invalidate sau TTL
- Automatic: TTL-based expiration

## Quality Assurance

### Confidence Scoring

Confidence score được tính dựa trên:
- Problem text quality (30%)
- Solution steps quality (40%)
- LaTeX validity (20%)
- Additional fields (10%)

### Validation Rules

1. `problemText` bắt buộc
2. `solutionSteps` phải có ít nhất 2 bước
3. LaTeX được validate và convert nếu cần
4. Difficulty level: 1-5 hoặc AI suggest

## Limitations & Future Improvements

### Current Limitations

1. Phase 4 UI components chưa được implement (pending)
2. Batch generation UI chưa có progress tracking
3. Prompt template versioning chưa có UI
4. A/B testing cho prompts chưa có

### Future Improvements

1. Implement Phase 4 UI components
2. Add prompt template versioning UI
3. Add A/B testing capability
4. Add exercise quality metrics dashboard
5. Add provider performance analytics
6. Add manual LaTeX editor for corrections

## Testing

### Unit Tests (Recommended)

- PromptTemplateService tests
- ExerciseGenerationService tests (AI Service)
- MultiProviderService tests
- LaTeX validator/converter tests

### Integration Tests (Recommended)

- End-to-end: Admin → Core → AI → LLM Provider
- Fallback logic testing
- Cache hit/miss scenarios
- Error handling scenarios

### Manual Testing Checklist

- [ ] Generate 1 exercise → Verify PENDING status
- [ ] Generate 10 exercises → Verify all saved
- [ ] Test fallback (disable Gemini → should use HuggingFace)
- [ ] Test LaTeX validation (valid/invalid/missing)
- [ ] Test cache (generate same skill+difficulty twice → second should be faster)
- [ ] Test prompt template management (create, edit, activate, deactivate)

## API Reference

### Core Service APIs

**POST /api/v1/admin/exercises/generate**
```json
{
  "skillId": "uuid",
  "grade": 6,
  "difficultyLevel": 3,
  "count": 10,
  "promptTemplateId": "uuid (optional)"
}
```

**Response:**
```json
{
  "errorCode": "0000",
  "errorDetail": "Sinh bài tập thành công",
  "data": {
    "content": [...],
    "totalElements": 10,
    "totalPages": 1
  }
}
```

### AI Service APIs

**POST /internal/ai/generate-exercises**
```json
{
  "skill_id": "uuid",
  "grade": 6,
  "difficulty_level": 3,
  "count": 10,
  "prompt_template_id": "uuid (optional)"
}
```

**Response:**
```json
{
  "exercises": [...],
  "provider_used": "gemini",
  "confidence": 0.85,
  "total_generated": 10,
  "total_valid": 10
}
```

## Dependencies

### Python (AI Service)
- `huggingface-hub` - HuggingFace API client
- `google-generativeai` - Gemini API client
- `sympy` - LaTeX conversion
- `redis` - Caching

### Java (Core Service)
- Spring WebFlux (WebClient)
- Spring Data JPA
- Flyway (migrations)

### TypeScript (Admin Dashboard)
- React Query (data fetching)
- React Hook Form (forms)

---

**Last Updated:** 2025-01-20  
**Version:** 1.0.0

