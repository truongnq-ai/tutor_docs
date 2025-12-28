# Tích hợp dịch vụ, HTTP Client, Cache/Redis
[← Quay lại Overview](README.md)

## Service-to-Service Communication

### Nguyên tắc

- **Internal APIs**: Tất cả giao tiếp giữa các microservices (Core ↔ AI Service) phải sử dụng **Internal API endpoints** với **API Key authentication**.
- **Không dùng Admin APIs**: Không được gọi trực tiếp các admin endpoints (`/api/v1/admin/**`) từ service khác vì chúng yêu cầu JWT token với role ADMIN.
- **API Key Authentication**: Sử dụng header `X-API-Key` với giá trị từ config `ai-service.api-key` (Core → AI) hoặc `core-service.api-key` (AI → Core).

### Internal API Endpoints

Internal endpoints được định nghĩa trong package `com.tutor.core.controller.internal` với pattern:
- Base path: `/api/v1/internal/{resource}`
- Authentication: API Key (X-API-Key header)
- Security: Role `INTERNAL_SERVICE` (được set bởi `ApiKeyAuthenticationFilter`)

#### Ví dụ Internal Controllers

```java
@RestController
@RequestMapping("/api/v1/internal/skills")
@PreAuthorize("hasRole('INTERNAL_SERVICE')")
public class InternalSkillController {
    
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<SkillResponse>> getSkillById(@PathVariable UUID id) {
        // Implementation
    }
}
```

#### Security Configuration

Internal endpoints được bảo vệ bởi `ApiKeyAuthenticationFilter` và SecurityFilterChain với `@Order(0)`:

```java
@Bean
@Order(0)  // Highest priority
public SecurityFilterChain internalServiceFilterChain(HttpSecurity http) {
    http
        .securityMatcher("/api/v1/internal/**")
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/v1/internal/**").hasRole("INTERNAL_SERVICE")
        )
        .addFilterBefore(apiKeyAuthenticationFilter, BearerTokenAuthenticationFilter.class);
    return http.build();
}
```

### AI Service → Core Service

Khi AI Service cần gọi Core Service:

1. **Sử dụng Internal Endpoints**: Chỉ gọi `/api/v1/internal/**` endpoints
2. **API Key Header**: Gửi `X-API-Key` header với giá trị từ `settings.core_service_api_key`
3. **Không dùng JWT**: Không cần và không được dùng JWT token

#### Ví dụ Python (AI Service)

```python
async def _fetch_skill_metadata(self, skill_id: str) -> dict[str, Any]:
    """Fetch skill metadata from Core Service using internal API."""
    url = f"{self.core_service_url}/api/v1/internal/skills/{skill_id}"
    
    headers = {
        "X-API-Key": self.core_service_api_key,  # API key, NOT JWT token
        "Content-Type": "application/json",
    }
    
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, headers=headers)
        response.raise_for_status()
        # Process response
```

### Core Service → AI Service

Khi Core Service gọi AI Service:

1. **Sử dụng Internal Endpoints**: Gọi `/internal/ai/**` endpoints
2. **API Key Header**: Gửi `X-API-Key` header với giá trị từ `ai-service.api-key`
3. **WebClient Configuration**: Sử dụng `WebClient` được cấu hình trong `WebClientConfig`

#### Ví dụ Java (Core Service)

```java
@Service
public class AIServiceClient {
    
    private final WebClient aiServiceWebClient;
    
    @Value("${ai-service.api-key}")
    private String aiServiceApiKey;
    
    public GenerateExercisesResponse generateExercises(GenerateExercisesRequest request) {
        return aiServiceWebClient.post()
            .uri("/internal/ai/generate-exercises")
            .header("X-API-Key", aiServiceApiKey)  // API key, NOT JWT token
            .bodyValue(request)
            .retrieve()
            .bodyToMono(GenerateExercisesResponse.class)
            .block();
    }
}
```

### Available Internal Endpoints

#### Skills
- `GET /api/v1/internal/skills/{id}` - Get skill by ID

#### Prompt Templates
- `GET /api/v1/internal/prompt-templates/active` - Get all active templates
- `GET /api/v1/internal/prompt-templates/by-name/{name}` - Get template by name
- `GET /api/v1/internal/prompt-templates/{id}` - Get template by ID

### Best Practices

1. **Luôn dùng Internal Endpoints**: Khi cần data từ service khác, tạo internal endpoint thay vì expose admin endpoint
2. **API Key Security**: 
   - API key phải được lưu trong config file (không hardcode)
   - Sử dụng environment variables cho production
   - Rotate API keys định kỳ
3. **Error Handling**: 
   - Parse error response body để có error message chi tiết
   - Map HTTP status codes sang error codes nội bộ
   - Log đầy đủ context (request_id, endpoint, status_code)
4. **Logging**: 
   - Log request/response ở mức INFO cho internal calls
   - Không log API key trong logs
   - Include request_id trong mọi log

## HTTP Client cho AI Service

- Sử dụng Spring WebFlux `WebClient` cho HTTP client tới AI Service.
- Mỗi service integration một `*Client` class trong package `com.tutor.core.client` hoặc `com.tutor.core.service.impl`.
- Sử dụng tên service trong config properties để đồng bộ config.
- Timeout: cấu hình connect/read timeout rõ ràng (ví dụ 3s connect, 30s read) trong cấu hình WebClient.
- Retry: bật retry có giới hạn (ví dụ tối đa 3 lần, backoff tăng dần) cho các call idempotent; tắt retry với các call tạo giao dịch không idempotent.
- Circuit breaker: bật bảo vệ (Resilience4j nếu sẵn) cho các call ra ngoài; fallback trả `ResponseObject` với errorCode `4001` (Service integration error) hoặc `5001` (System error).
- Log request/response ở mức DEBUG khi cần debug; tránh log body nhạy cảm.

### Ví dụ WebClient Configuration

```java
@Configuration
public class WebClientConfig {
    
    @Bean
    public WebClient aiServiceWebClient(
        @Value("${ai-service.url}") String aiServiceUrl,
        @Value("${ai-service.timeout.connect:3000}") int connectTimeout,
        @Value("${ai-service.timeout.read:30000}") int readTimeout) {
        
        return WebClient.builder()
            .baseUrl(aiServiceUrl)
            .defaultHeader("Content-Type", "application/json")
            .clientConnector(new ReactorClientHttpConnector(
                HttpClient.create()
                    .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectTimeout)
                    .responseTimeout(Duration.ofMillis(readTimeout))
            ))
            .build();
    }
}
```

### Ví dụ AI Service Client

```java
@Service
@Slf4j
public class AIServiceClient {
    
    private final WebClient webClient;
    private final RetryTemplate retryTemplate;
    
    public AIServiceClient(WebClient aiServiceWebClient, RetryTemplate retryTemplate) {
        this.webClient = aiServiceWebClient;
        this.retryTemplate = retryTemplate;
    }
    
    public SolveResponse solveMathProblem(String problemText, int grade) {
        try {
            return retryTemplate.execute(context -> {
                SolveRequest request = new SolveRequest(problemText, grade);
                
                return webClient.post()
                    .uri("/internal/ai/solve")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(SolveResponse.class)
                    .block();
            });
        } catch (WebClientResponseException e) {
            log.error("AI Service error: {}", e.getMessage());
            throw new AIServiceException("4001", "AI Service unavailable", e);
        } catch (Exception e) {
            log.error("Unexpected error calling AI Service", e);
            throw new AIServiceException("5001", "Internal server error", e);
        }
    }
}
```

## Error Handling & ErrorCode Mapping

- Bắt buộc handle timeout, bắt lỗi và map sang custom exception với errorCode chuẩn (ví dụ `4001` cho service unavailable, `5001` cho system error).
- Không nuốt lỗi; log ở mức ERROR với @Slf4j.
- Map HTTP status từ external service sang errorCode nội bộ:
  - 503/504 → `4001` (Service unavailable)
  - 500 → `5001` (System error)
  - 400 → `4002` (Invalid request to external service)
  - Timeout → `4001` (Service timeout)

### Ví dụ Error Mapping

```java
@ExceptionHandler(value = AIServiceException.class)
public ResponseEntity<ResponseObject<?>> handleAIServiceException(AIServiceException e) {
    ResponseObject<?> response = new ResponseObject<>(
        e.getErrorCode(),
        e.getErrorDetail(),
        null
    );
    
    HttpStatus httpStatus = mapErrorCodeToHttpStatus(e.getErrorCode());
    return ResponseEntity.status(httpStatus).body(response);
}

private HttpStatus mapErrorCodeToHttpStatus(String errorCode) {
    if (errorCode.startsWith("4")) {
        return HttpStatus.SERVICE_UNAVAILABLE; // 503
    } else if (errorCode.startsWith("5")) {
        return HttpStatus.INTERNAL_SERVER_ERROR; // 500
    }
    return HttpStatus.BAD_REQUEST; // 400
}
```

## Redis/Cache (Nếu sử dụng)

- Cấu hình RedisTemplate riêng cho từng model (User/Token/Otp/Student) như trong `RedisConfig`.
- Key naming gợi ý:  
  - `user:{username}`  
  - `student:{studentId}`  
  - `token:{username}`  
  - `otp:{phone}:{type}`  
- TTL: OTP theo constant (ví dụ 5 phút); token/student tùy thuộc yêu cầu business, cần set rõ trong config.
- Khi ghi DB thành công, đồng bộ cache (save vào Redis); khi update/delete, xóa hoặc cập nhật cache tương ứng.

### Ví dụ Redis Cache

```java
@Service
public class StudentCacheService {
    
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String CACHE_PREFIX = "student:";
    private static final Duration TTL = Duration.ofHours(1);
    
    public void cacheStudent(UUID studentId, Student student) {
        String key = CACHE_PREFIX + studentId;
        redisTemplate.opsForValue().set(key, student, TTL);
    }
    
    public Optional<Student> getCachedStudent(UUID studentId) {
        String key = CACHE_PREFIX + studentId;
        Student student = (Student) redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(student);
    }
    
    public void evictStudent(UUID studentId) {
        String key = CACHE_PREFIX + studentId;
        redisTemplate.delete(key);
    }
}
```

## Retry & Circuit Breaker

### Retry Configuration

```java
@Configuration
public class RetryConfig {
    
    @Bean
    public RetryTemplate retryTemplate() {
        RetryTemplate retryTemplate = new RetryTemplate();
        
        FixedBackOffPolicy backOffPolicy = new FixedBackOffPolicy();
        backOffPolicy.setBackOffPeriod(1000); // 1 second
        
        SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy();
        retryPolicy.setMaxAttempts(3);
        
        retryTemplate.setBackOffPolicy(backOffPolicy);
        retryTemplate.setRetryPolicy(retryPolicy);
        
        return retryTemplate;
    }
}
```

### Circuit Breaker (Resilience4j)

```java
@Service
public class AIServiceClient {
    
    private final CircuitBreaker circuitBreaker;
    
    @Autowired
    public AIServiceClient(CircuitBreakerRegistry circuitBreakerRegistry) {
        this.circuitBreaker = circuitBreakerRegistry.circuitBreaker("aiService");
    }
    
    public SolveResponse solveMathProblem(String problemText, int grade) {
        return circuitBreaker.executeSupplier(() -> {
            // Call AI Service
            return webClient.post()
                .uri("/internal/ai/solve")
                .bodyValue(new SolveRequest(problemText, grade))
                .retrieve()
                .bodyToMono(SolveResponse.class)
                .block();
        });
    }
}
```

## MessageSource & i18n

- Dùng `MessageSource` (ReloadableResourceBundleMessageSource) khi cần message đa ngôn ngữ; base file trong `application.properties` hoặc bundle riêng.
- ErrorDetail có thể lấy từ MessageSource dựa trên errorCode.

[← Quay lại Overview](README.md)

