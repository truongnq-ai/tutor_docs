# TUTOR – PROJECT DOCUMENTATION

## PROJECT OVERVIEW

**Gia sư Toán AI** là hệ thống trợ giảng toán cho học sinh từ lớp 6–7, sử dụng LLM để:

- **Cung cấp bài tập** cá nhân hoá theo năng lực học sinh
- **Giải thích bước–bước** các bài toán theo chuẩn chương trình Việt Nam
- **Theo dõi tiến độ** học tập và báo cáo minh bạch cho phụ huynh

### Mục tiêu MVP Giai đoạn 1

- **Nền tảng web/mobile**: Student App (Flutter) + Parent Dashboard (Next.js)
- **Adaptive Learning Engine**: Hệ thống học tập thích ứng dựa trên skill graph và mastery tracking
- **Tính năng hỗ trợ phụ huynh**: Dashboard báo cáo, theo dõi điểm yếu, báo cáo tuần

### Định vị sản phẩm

Sản phẩm **KHÔNG phải**:
- App giải bài đơn thuần (Photomath-style)
- App học video
- Nền tảng lớp học online

Sản phẩm **LÀ**:
- Gia sư Toán 1–1 dựa trên AI + logic giáo dục
- Hệ thống học tập có kiểm soát và báo cáo cho phụ huynh

---

## LEARNING OBJECTIVES & KPIs

### Mục tiêu học tập

- Học sinh học đúng trọng tâm, lấp lỗ hổng kiến thức
- Phụ huynh theo dõi được việc học và kết quả học tập một cách minh bạch
- Tạo nền tảng dữ liệu để mở rộng sang giáo viên/gia sư ở các giai đoạn sau

### Chỉ số thành công (KPIs)

#### Sản phẩm
- **Activation rate** (giải ≥1 bài): ≥ 60%
- **Retention D7**: ≥ 30%
- **Thời gian học/ngày**: ≥ 10 phút

#### Giáo dục
- **Mastery trung bình tăng** sau 7 ngày: +15–25 điểm
- **Giảm số skill yếu** sau 1 tháng

#### Hiệu năng
- Thời gian trả lời AI: < 5 giây
- Load dashboard: < 2 giây

#### Độ chính xác
- Bài Toán đúng ≥ 95% (chương trình phổ thông)

---

## DOCUMENTATION STRUCTURE

### 2.1. Product & PRD
Tài liệu định nghĩa sản phẩm, phạm vi, và yêu cầu chức năng.

- [PRD MVP – Giai đoạn 1](./prd/prd_mvp_phase_1-2025-12-14-22-15.md)  
  *Product Requirement Document cho MVP Phase 1, bao gồm scope, user stories, KPIs*

### 2.2. User Stories
Mô tả chi tiết các user stories cho từng persona.

- [User Stories – Học sinh](./user_stories/student_user_stories_phase_1-2025-12-14-22-45.md)  
  *14 user stories cho học sinh: onboarding, tutor mode, practice, mini test*
- [User Stories – Phụ huynh](./user_stories/parent_user_stories_phase_1-2025-12-14-23-05.md)  
  *10 user stories cho phụ huynh: dashboard, báo cáo, theo dõi tiến độ*

### 2.3. User Flows
Luồng người dùng chi tiết cho các kịch bản chính.

- [User Onboarding Flow](./user_flows/user_onboarding_flow_phase_1-2025-12-14-23-40.md)  
  *Luồng onboarding học sinh và phụ huynh, trial mode, linking flow*

### 2.4. Education Logic
Logic giáo dục và adaptive learning engine.

- [Skill Graph Toán 6–7](./learning/skill_graph/skill-graph-math-grade-6-7_phase_1-2025-12-15-02-30.md)  
  *Định nghĩa skill graph với 60–80 skills cho lớp 6–7, prerequisite relationships*
- [Adaptive Learning Logic](./education_logic/adaptive_learning_logic_phase_1-2025-12-15-02-30.md)  
  *Logic học tập thích ứng: mastery tracking, difficulty adjustment, skill selection*
- [Adaptive Learning Engine](./learning/adaptive/adaptive-learning-engine_phase_1-2025-12-15-02-30.md)  
  *Engine chi tiết: input/output model, algorithms, decision flows*

### 2.5. Technical Design
Tài liệu kỹ thuật cho development và deployment.

- [System Architecture](./technical_design/system_architecture_phase_1-2025-12-15-00-21.md)  
  *Kiến trúc hệ thống: microservices, frontend/backend, infrastructure*
- [API & Database Mapping](./technical_design/api_db_mapping_phase_1-2025-12-15-00-20.md)  
  *Mapping giữa API endpoints và database entities*
- [API Specification](./technical_design/api_specification_phase_1-2025-12-15-03-30.md)  
  *Chi tiết API: request/response schemas, error codes, examples*
- [Development Setup Guide](./technical_design/development_setup_phase_1-2025-12-15-03-00.md)  
  *Hướng dẫn setup môi trường phát triển: tech stack, Docker, IDE*
- [Testing Strategy](./technical_design/testing_strategy_phase_1-2025-12-15-03-45.md)  
  *Chiến lược testing: unit, integration, API testing*
- [Environment Configuration](./technical_design/environment_config_phase_1-2025-12-15-04-00.md)  
  *Cấu hình environment variables cho dev/staging/prod*
- [Deployment Guide](./technical_design/deployment_guide_phase_1-2025-12-15-04-15.md)  
  *Hướng dẫn deployment: Docker, CI/CD, monitoring*
- [Project Structure](./technical_design/project_structure_phase_1-2025-12-15-04-30.md)  
  *Cấu trúc project: monorepo, naming conventions, module organization*

### 2.6. Database Design
Thiết kế database và migration strategy.

- [Database ERD & DDL](./database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md)  
  *Entity Relationship Diagram và Data Definition Language*
- [Migration & Seeding Guide](./database_design/migration_seeding_guide_phase_1-2025-12-15-03-15.md)  
  *Hướng dẫn migration và seed data cho skills*

### 2.7. Sequence Diagrams
Sequence diagrams cho các luồng API chính.

- [API Sequence Diagrams](./sequence_diagrams/api_sequence_diagrams_phase_1-2025-12-15-01-35.md)  
  *Sequence diagrams: solve bài, onboarding, linking flow*

### 2.8. AI & Prompts
Tài liệu về AI prompts và templates.

- [Math Tutor AI Prompts](./ai/prompts/math-tutor-prompts_phase_1-2025-12-15-02-30.md)  
  *Prompt templates cho math solver, hint generator, skill diagnosis*

---

## HOW TO USE THIS DOCUMENTATION

### For Developers

**Roadmap đọc tài liệu:**

1. **Bắt đầu với:**
   - [Development Setup Guide](./technical_design/development_setup_phase_1-2025-12-15-03-00.md) - Setup môi trường
   - [Project Structure](./technical_design/project_structure_phase_1-2025-12-15-04-30.md) - Hiểu cấu trúc codebase

2. **Hiểu nghiệp vụ:**
   - [PRD MVP](./prd/prd_mvp_phase_1-2025-12-14-22-15.md) - Tổng quan sản phẩm
   - [User Stories](./user_stories/student_user_stories_phase_1-2025-12-14-22-45.md) - Yêu cầu chi tiết

3. **Thiết kế kỹ thuật:**
   - [System Architecture](./technical_design/system_architecture_phase_1-2025-12-15-00-21.md) - Kiến trúc tổng thể
   - [API Specification](./technical_design/api_specification_phase_1-2025-12-15-03-30.md) - API endpoints
   - [Database ERD & DDL](./database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md) - Database schema

4. **Implementation:**
   - [API & Database Mapping](./technical_design/api_db_mapping_phase_1-2025-12-15-00-20.md) - Mapping logic
   - [Sequence Diagrams](./sequence_diagrams/api_sequence_diagrams_phase_1-2025-12-15-01-35.md) - API flows
   - [Environment Configuration](./technical_design/environment_config_phase_1-2025-12-15-04-00.md) - Config setup

5. **Testing & Deployment:**
   - [Testing Strategy](./technical_design/testing_strategy_phase_1-2025-12-15-03-45.md) - Testing approach
   - [Deployment Guide](./technical_design/deployment_guide_phase_1-2025-12-15-04-15.md) - Deploy steps

**Tài liệu tham khảo:**
- [Adaptive Learning Logic](./education_logic/adaptive_learning_logic_phase_1-2025-12-15-02-30.md) - Logic nghiệp vụ
- [Skill Graph](./learning/skill_graph/skill-graph-math-grade-6-7_phase_1-2025-12-15-02-30.md) - Skills data

---

### For Product Owners / Managers

**Roadmap đọc tài liệu:**

1. **Tổng quan dự án:**
   - [PRD MVP](./prd/prd_mvp_phase_1-2025-12-14-22-15.md) - Phạm vi, KPIs, roadmap
   - Project Overview (phần trên) - Mục tiêu và định vị

2. **User perspective:**
   - [User Stories – Học sinh](./user_stories/student_user_stories_phase_1-2025-12-14-22-45.md)
   - [User Stories – Phụ huynh](./user_stories/parent_user_stories_phase_1-2025-12-14-23-05.md)
   - [User Onboarding Flow](./user_flows/user_onboarding_flow_phase_1-2025-12-14-23-40.md)

3. **Education logic:**
   - [Adaptive Learning Logic](./education_logic/adaptive_learning_logic_phase_1-2025-12-15-02-30.md) - Cách hệ thống học tập hoạt động
   - [Skill Graph](./learning/skill_graph/skill-graph-math-grade-6-7_phase_1-2025-12-15-02-30.md) - Cấu trúc kiến thức

4. **Technical overview (high-level):**
   - [System Architecture](./technical_design/system_architecture_phase_1-2025-12-15-00-21.md) - Hiểu components chính

**Tài liệu tham khảo:**
- [API Specification](./technical_design/api_specification_phase_1-2025-12-15-03-30.md) - API overview (nếu cần)

---

### For UX/UI Designers

**Roadmap đọc tài liệu:**

1. **User context:**
   - [User Stories – Học sinh](./user_stories/student_user_stories_phase_1-2025-12-14-22-45.md) - User needs
   - [User Stories – Phụ huynh](./user_stories/parent_user_stories_phase_1-2025-12-14-23-05.md) - Parent needs
   - [User Onboarding Flow](./user_flows/user_onboarding_flow_phase_1-2025-12-14-23-40.md) - User journeys

2. **Product context:**
   - [PRD MVP](./prd/prd_mvp_phase_1-2025-12-14-22-15.md) - Phạm vi và định vị sản phẩm

3. **Technical constraints:**
   - [System Architecture](./technical_design/system_architecture_phase_1-2025-12-15-00-21.md) - Frontend/backend structure
   - [API Specification](./technical_design/api_specification_phase_1-2025-12-15-03-30.md) - API capabilities

**Tài liệu tham khảo:**
- [Project Structure](./technical_design/project_structure_phase_1-2025-12-15-04-30.md) - Frontend structure

---

### For QA/Testers

**Roadmap đọc tài liệu:**

1. **Test planning:**
   - [Testing Strategy](./technical_design/testing_strategy_phase_1-2025-12-15-03-45.md) - Testing approach
   - [User Stories](./user_stories/student_user_stories_phase_1-2025-12-14-22-45.md) - Acceptance criteria

2. **API testing:**
   - [API Specification](./technical_design/api_specification_phase_1-2025-12-15-03-30.md) - Request/response formats
   - [Sequence Diagrams](./sequence_diagrams/api_sequence_diagrams_phase_1-2025-12-15-01-35.md) - API flows

3. **Test data:**
   - [Database ERD & DDL](./database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md) - Data model
   - [Migration & Seeding Guide](./database_design/migration_seeding_guide_phase_1-2025-12-15-03-15.md) - Seed data

**Tài liệu tham khảo:**
- [Development Setup Guide](./technical_design/development_setup_phase_1-2025-12-15-03-00.md) - Test environment

---

### For DevOps

**Roadmap đọc tài liệu:**

1. **Infrastructure:**
   - [System Architecture](./technical_design/system_architecture_phase_1-2025-12-15-00-21.md) - Infrastructure overview
   - [Deployment Guide](./technical_design/deployment_guide_phase_1-2025-12-15-04-15.md) - Deployment procedures

2. **Configuration:**
   - [Environment Configuration](./technical_design/environment_config_phase_1-2025-12-15-04-00.md) - Environment variables
   - [Development Setup Guide](./technical_design/development_setup_phase_1-2025-12-15-03-00.md) - Docker setup

3. **Database:**
   - [Database ERD & DDL](./database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md) - Schema
   - [Migration & Seeding Guide](./database_design/migration_seeding_guide_phase_1-2025-12-15-03-15.md) - Migration strategy

**Tài liệu tham khảo:**
- [Project Structure](./technical_design/project_structure_phase_1-2025-12-15-04-30.md) - Repository structure

---

### For Education Experts

**Roadmap đọc tài liệu:**

1. **Education logic:**
   - [Adaptive Learning Logic](./education_logic/adaptive_learning_logic_phase_1-2025-12-15-02-30.md) - Logic học tập
   - [Adaptive Learning Engine](./learning/adaptive/adaptive-learning-engine_phase_1-2025-12-15-02-30.md) - Engine chi tiết

2. **Skill structure:**
   - [Skill Graph Toán 6–7](./learning/skill_graph/skill-graph-math-grade-6-7_phase_1-2025-12-15-02-30.md) - Skills và prerequisites

3. **Product context:**
   - [PRD MVP](./prd/prd_mvp_phase_1-2025-12-14-22-15.md) - Mục tiêu giáo dục

**Tài liệu tham khảo:**
- [User Stories](./user_stories/student_user_stories_phase_1-2025-12-14-22-45.md) - User needs từ góc nhìn giáo dục

---

## QUICK LINKS

### Tài liệu quan trọng nhất

- 📋 [PRD MVP](./prd/prd_mvp_phase_1-2025-12-14-22-15.md) - Bắt đầu từ đây
- 🏗️ [System Architecture](./technical_design/system_architecture_phase_1-2025-12-15-00-21.md) - Kiến trúc hệ thống
- 🔌 [API Specification](./technical_design/api_specification_phase_1-2025-12-15-03-30.md) - API reference
- 🛠️ [Development Setup](./technical_design/development_setup_phase_1-2025-12-15-03-00.md) - Setup môi trường
- 📊 [Database ERD & DDL](./database_design/database_erd_ddl_phase_1-2025-12-15-02-05.md) - Database schema

### Tài liệu theo chủ đề

**Onboarding & User Management:**
- [User Onboarding Flow](./user_flows/user_onboarding_flow_phase_1-2025-12-14-23-40.md)
- [User Stories](./user_stories/student_user_stories_phase_1-2025-12-14-22-45.md)

**Education & Learning:**
- [Adaptive Learning Logic](./education_logic/adaptive_learning_logic_phase_1-2025-12-15-02-30.md)
- [Skill Graph](./learning/skill_graph/skill-graph-math-grade-6-7_phase_1-2025-12-15-02-30.md)

**Development:**
- [Project Structure](./technical_design/project_structure_phase_1-2025-12-15-04-30.md)
- [Testing Strategy](./technical_design/testing_strategy_phase_1-2025-12-15-03-45.md)

**Deployment:**
- [Deployment Guide](./technical_design/deployment_guide_phase_1-2025-12-15-04-15.md)
- [Environment Configuration](./technical_design/environment_config_phase_1-2025-12-15-04-00.md)

---

## DOCUMENT VERSIONING

Tất cả tài liệu sử dụng **versioning theo ISO datetime format**: `YYYY-MM-DD-HH-mm`

**Ví dụ:** `prd_mvp_phase_1-2025-12-14-22-15.md`

**Quy tắc:**
- Version = timestamp khi tạo/sửa đổi tài liệu
- Format: `{document_name}_phase_{phase_number}-{YYYY-MM-DD-HH-mm}.md`
- Không sửa file cũ, chỉ tạo file mới khi có thay đổi lớn
- File cũ được giữ lại để tham khảo lịch sử

**Lợi ích:**
- Dễ theo dõi lịch sử thay đổi
- Tránh conflict khi nhiều người làm việc
- Có thể so sánh các version

---

## QUY ƯỚC

- Tất cả file dùng Markdown
- Version theo ISO datetime (xem phần Document Versioning)
- Không sửa file cũ, chỉ tạo file mới
- Tất cả tài liệu có link quay về README.md ở đầu và cuối file

---

## LIÊN HỆ

- Product owner: …
