# Phase 1 – Law Constraints & Code Guards

**Project:** Tutor  
**Document type:** Phase Definition  
**Audience:** Backend / AI / Architecture Reviewer  
**Status:** ENFORCED  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

File này là **bộ rào chắn pháp lý & kỹ thuật cuối cùng** cho Phase 1.

**Mục tiêu:**
- Ép code **không được vượt luật**
- Ép kiến trúc **không được vượt scope**
- Ngăn mọi hành vi "chuẩn bị sẵn cho tương lai"

👉 Nếu có mâu thuẫn giữa:
- Code
- Kiến trúc
- Convenience của dev

→ **FILE NÀY THẮNG**

---

## 2. FORBIDDEN BY SYSTEM LAW (ABSOLUTE PROHIBITION)

### 2.1. ❌ Trial (NOT EXISTING IN PHASE 1)

TUYỆT ĐỐI KHÔNG:
- Trial state
- Trial start / end time
- Trial counter / quota
- Trial edge case
- Trial analytics
- Trial anti-abuse
- Trial-specific UI logic

Không được:
- Check trial
- Infer trial
- Mock trial
- Comment "future trial"

### 2.2. ❌ License (NOT EXISTING IN PHASE 1)

TUYỆT ĐỐI KHÔNG:
- License entity
- License FSM
- License state (active / expired / cancelled)
- Payment hook
- Renewal / expiration logic
- Device binding theo license

Không được:
- Check license
- Infer license
- Chuẩn bị bảng license trong DB

### 2.3. ❌ Permission Matrix / Commercial Permission

TUYỆT ĐỐI KHÔNG:
- Dynamic permission
- Permission matrix
- Role-based phức tạp
- Infer quyền từ DB
- Permission config theo gói

---

## 3. FORBIDDEN BY ARCHITECTURE (ANTI-PATTERNS)

### 3.1. ❌ Chuẩn bị cho tương lai (STRICTLY FORBIDDEN)

Không được tồn tại trong code:
- Flag `enable_trial`
- Flag `enable_license`
- Config `future_*`
- Comment "for phase 2"
- TODO "activate later"

👉 Phase 1 **KHÔNG chuẩn bị Phase 2**

### 3.2. ❌ Over-engineering

Không được:
- Generic engine
- Policy engine
- Rule engine
- FSM engine dùng chung
- Abstraction "cho đẹp"

Code Phase 1:
> **Ưu tiên đọc được – rõ ràng – trực tiếp**

---

## 4. MANDATORY DOMAIN INVARIANTS (MUST HOLD)

Code Phase 1 **BẮT BUỘC đảm bảo** các bất biến sau:

### 4.1. Lifecycle is the Source of Truth

- Quyền học **CHỈ** dựa trên lifecycle
- Không suy luận quyền từ dữ liệu khác
- Không bypass lifecycle check

### 4.2. Chapter is the Only Progress Unit

- Chapter là **đơn vị tiến độ duy nhất**
- Skill **KHÔNG** được dùng làm tiến độ
- Không có trạng thái Chapter ngầm

### 4.3. One Active Chapter Rule

- Tại một thời điểm:
  - Chỉ **1 Chapter IN_PROGRESS**
- Vi phạm → code sai

### 4.4. Practice is the Only Trigger

- Progression chỉ thay đổi qua practice flow
- Không update state bằng:
  - thời gian
  - số câu hỏi
  - hành động tay

### 4.5. AI Has NO Business Authority

- AI không:
  - update mastery
  - đổi state
  - unlock chapter
  - complete chapter
- System Core **luôn override AI**

---

## 5. CODING GUARDS (MUST IMPLEMENT)

### 5.1. Guard at API Boundary

Mọi API liên quan đến học tập **PHẢI**:
- Check lifecycle
- Check chapter state
- Check forbidden conditions

Không được:
- Rely vào frontend
- Rely vào AI response

### 5.2. Guard at Service Layer

Service:
- Không nhận input "bẩn"
- Không suy luận state
- Không tự sửa state

### 5.3. Guard at Persistence Layer

DB:
- Không schema cho trial / license
- Không FK "để sau"
- Không cột `future_*`

---

## 6. EXPLICITLY FORBIDDEN CODING PATTERNS

Code Phase 1 **KHÔNG ĐƯỢC CÓ**:

- `if (futureFeatureEnabled)`
- `// will be used later`
- `TODO: phase 2`
- `@Experimental`
- `@Beta`
- Feature toggle cho luật

---

## 7. REVIEW CHECKLIST (FAIL FAST)

Khi review code, chỉ cần hỏi:

- Có trial không? → ❌ FAIL
- Có license không? → ❌ FAIL
- Có chuẩn bị schema cho phase sau không? → ❌ FAIL
- Có suy luận quyền ngoài lifecycle không? → ❌ FAIL
- Có logic ngoài Phase 1 scope không? → ❌ FAIL

---

## 8. FINAL AUTHORITY RULE

Nếu:
- Code cần "phá" constraint
- Kiến trúc thấy "bị gò bó"
- Dev thấy "khó chịu"

→ **DỪNG NGAY**

BẮT BUỘC:
1. Quay lại Phase 0
2. Cập nhật scope
3. Update System Law snapshot
4. Sau đó mới được code tiếp

---

## 9. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [System Law](../../../01-system-law/README.md)
  - [Active Laws](active-laws.md)
  - [Dormant Laws](dormant-laws.md)

---

[← Quay lại Overview](README.md)

