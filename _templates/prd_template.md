# PRODUCT REQUIREMENT DOCUMENT (PRD)

**Project:** Tutor  
**Product:** <Tutor Students App | Tutor Parents Dashboard | Tutor Admin>  
**PRD Scope:** <MVP | Phase 2 | Phase 3>  

---

## METADATA

- **Document type:** PRD
- **Audience:** Developer / Product / Tech
- **Status:** Draft | Review | Approved
- **Version:** YYYY-MM-DD-HH-mm
- **Author:** <Your name / ChatGPT>
- **Last updated:** YYYY-MM-DD

---

## 1. TỔNG QUAN

### 1.1. Mục tiêu sản phẩm
(Mô tả ngắn gọn: sản phẩm này nhằm giải quyết vấn đề gì, cho ai)

---

### 1.2. Định vị sản phẩm
(Sản phẩm này KHÔNG phải là gì, và KHÁC gì so với các giải pháp khác)

---

### 1.3. Đối tượng sử dụng
| Persona | Độ tuổi | Vai trò |
|------|--------|--------|
| Học sinh | | |
| Phụ huynh | | |
| (Khác nếu có) | | |

---

## 2. PHẠM VI (SCOPE)

### 2.1. Trong phạm vi (IN SCOPE)
- …

### 2.2. Ngoài phạm vi (OUT OF SCOPE)
- …

📌 Mục tiêu: kiểm soát phạm vi, tránh scope creep

---

## 3. GIẢ ĐỊNH & RÀNG BUỘC

### 3.1. Giả định
- Người dùng có smartphone
- Phụ huynh truy cập web

### 3.2. Ràng buộc
- Không live class
- Không video dài
- Ưu tiên mobile-first

---

## 4. USER FLOW TỔNG QUAN
(Mô tả luồng chính, có thể bằng text hoặc link sang file khác)

- Onboarding → Học → Luyện → Kiểm tra → Báo cáo

📎 Tham chiếu:
- [User Flow chi tiết](./<file>.md)

---

## 5. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

### 5.1. Nhóm chức năng: <Tên module>

#### 5.1.1. Mô tả
(Mô tả ngắn gọn module)

#### 5.1.2. User stories
- As a <user>, I want <action> so that <benefit>

#### 5.1.3. Acceptance criteria
- [ ] Điều kiện 1
- [ ] Điều kiện 2

---

*(Lặp lại 5.x cho các module khác)*

---

## 6. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL)

### 6.1. Hiệu năng
- Thời gian phản hồi < X giây

### 6.2. Độ chính xác
- AI trả lời đúng ≥ X%

### 6.3. Bảo mật & quyền riêng tư
- Phân quyền rõ ràng
- Không lộ dữ liệu học sinh

---

## 7. DỮ LIỆU & LOGIC NGHIỆP VỤ

### 7.1. Đối tượng dữ liệu chính
| Entity | Mô tả |
|------|------|
| Student | |
| Skill | |
| Practice | |

---

### 7.2. Logic nghiệp vụ quan trọng
- Adaptive learning
- Skill mastery
- Mini test logic

📎 Tham chiếu:
- [Adaptive Learning Logic](./<file>.md)

---

## 8. METRICS & KPI

### 8.1. Sản phẩm
- Activation rate
- Retention D7 / D30

### 8.2. Giáo dục
- Mastery improvement
- Weak-skill reduction

---

## 9. RỦI RO & PHƯƠNG ÁN GIẢM THIỂU

| Rủi ro | Ảnh hưởng | Giải pháp |
|------|----------|---------|
| AI sai | Cao | Rule-based + review |
| Học sinh lạm dụng | Trung bình | Chia nhỏ lời giải |

---

## 10. PHỤ THUỘC & LIÊN KẾT

- ← Quay lại: [Tài liệu tổng quan](../README.md)
- → Liên quan:
  - [User Stories](../user_stories/<file>.md)
  - [Education Logic](../education_logic/<file>.md)

---

## 11. GHI CHÚ / TODO
- [ ] Cần xác nhận phạm vi
- [ ] Cần review với dev
