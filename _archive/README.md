# ARCHIVE - DEPRECATED DOCUMENTS

← Quay lại: [README.md](../README.md)

## ⚠️ DEPRECATED

Tất cả tài liệu trong thư mục này đã được deprecated và thay thế bằng cấu trúc mới.

## Cấu trúc mới

Tài liệu đã được tái cấu trúc theo domain/lifecycle/decision logic:

- **00-core-concepts/**: Thuật ngữ và khái niệm cốt lõi
- **02-domain-model/**: Domain model (Chapter, Skill, Exercise, Practice, Mini Test, Learning Plan)
- **03-product-rules/**: Quy tắc nghiệp vụ
- **04-user-experience/**: Trải nghiệm người dùng
- **05-user-flows/**: Luồng người dùng
- **06-user-stories/**: User stories (chuẩn hoá)
- **07-architecture-and-data/**: Kiến trúc và dữ liệu
- **08-api-contracts/**: API contracts
- **09-coding-standards/**: Coding standards
- **10-release-and-migration/**: Release và migration

## Mapping từ cấu trúc cũ

### 02-for-end-users/
→ **04-user-experience/** (student/, parent/)

### 03-for-product-owners/
- user-stories/ → **06-user-stories/**
- user-flows/ → **05-user-flows/**
- product-overview.md → **01-getting-started/product-overview.md**
- kpis-metrics.md → **01-getting-started/kpis-metrics.md**
- roadmap.md → **01-getting-started/roadmap.md**

### 04-for-developers/
- architecture/ → **07-architecture-and-data/**
- coding-standards/ → **09-coding-standards/** (đã di chuyển vào 04-for-developers-old/)
- education-logic/ → **03-product-rules/** (extracted rules, đã di chuyển vào 04-for-developers-old/)
- setup/development-setup.md → **01-getting-started/development-setup.md**

### 05-for-devops/
- deployment.md → **07-architecture-and-data/deployment.md**
- infrastructure.md, monitoring.md → Giữ trong _archive (có thể cập nhật sau)

### 06-reference/
- api-reference.md → **08-api-contracts/**
- database-schema.md → **07-architecture-and-data/database-schema.md**
- ai-prompts.md → **09-coding-standards/ai-service/prompts.md**

## Lý do deprecated

- Cấu trúc cũ theo vai trò (for-end-users, for-product-owners, for-developers)
- Cấu trúc mới theo domain/lifecycle/decision logic
- Tách rõ concept-rule-flow-implementation
- Chapter làm trục sư phạm, Skill làm trục AI

## Tài liệu thay thế

Xem [README.md](../README.md) để biết cấu trúc mới và tài liệu thay thế.

---

← Quay lại: [README.md](../README.md)

