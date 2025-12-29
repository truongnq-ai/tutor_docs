# User Flow: Parent – View Progress Flow

**Project:** Tutor  
**Document type:** User Flow  
**Audience:** Developer | Product | Tech  
**Status:** ACTIVE  
**Version:** 1.0  
**Author:** Human

[← Quay lại Overview](../README.md)

---

## 1. THÔNG TIN CƠ BẢN

- **Phase:** Phase 1
- **Actor:** Parent
- **Purpose:** Parent xem tiến độ học tập của con ở chế độ read-only

---

## 2. PRECONDITIONS (ĐIỀU KIỆN TRƯỚC)

- Parent đã đăng nhập hợp lệ
- Parent có role = PARENT
- Parent có ParentProfile tồn tại
- Parent đã được liên kết hợp lệ với Student (parent-child relation)
- Student tồn tại hợp lệ
- Student có ChapterProgress dữ liệu
- Không tồn tại trial, license, payment, device restriction

---

## 3. TRIGGER (HÀNH ĐỘNG KÍCH HOẠT)

- Parent chọn một Student (con của mình)
- Parent yêu cầu xem tiến độ học tập (view progress)

---

## 4. STEP-BY-STEP FLOW

### Step 1

Parent gửi request "view student progress" đến backend.

### Step 2

Controller (ChapterProgressController hoặc ProgressReadController):

- Xác thực JWT
- Xác định actor là PARENT
- Chuyển request vào service read-only

### Step 3

Service thực hiện guard:

- RoleGuard: chỉ PARENT
- ParentStudentGuard: parent chỉ được xem Student của mình

Nếu guard FAIL → reject, flow kết thúc.

### Step 4

Service truy vấn dữ liệu read-only:

- Danh sách Chapter được gán cho Student
- ChapterProgress tương ứng:
  - LOCKED
  - IN_PROGRESS
  - COMPLETED

### Step 5

Service tổng hợp dữ liệu hiển thị:

- Chapter hiện tại đang học (nếu có)
- Chapter đã hoàn thành
- KHÔNG suy luận thêm tiến độ

### Step 6

Controller trả response cho Parent:

- Dữ liệu tiến độ ở dạng read-only

---

## 5. DOMAIN OWNERSHIP & AUTHORITY

- Parent KHÔNG sở hữu domain
- Parent KHÔNG có authority thay đổi bất kỳ state nào
- Mọi dữ liệu parent thấy đều là snapshot read-only

---

## 6. EVENTS

- Không emit domain event
- Không trigger domain logic

---

## 7. FORBIDDEN PATHS (ĐƯỜNG CẤM)

Flow này TUYỆT ĐỐI KHÔNG cho phép:

- Parent chỉnh sửa chapter_state
- Parent trigger Practice
- Parent unlock Chapter
- Parent thay đổi lifecycle
- Parent xem Student không phải con của mình

---

## 8. POSTCONDITIONS (TRẠNG THÁI SAU)

- Không có domain state nào thay đổi
- Hệ thống giữ nguyên trạng thái

**Parent View Progress Flow là READ-ONLY tuyệt đối.**

- Parent chỉ được truy vấn dữ liệu
- Không được gọi domain logic mutate
- Không được sử dụng ChapterProgressDomainLogic
- Không được gọi bất kỳ method nào làm thay đổi state
- Dữ liệu Parent nhìn thấy là snapshot trạng thái hiện tại, không kích hoạt domain event và không có side-effect.

---

## 9. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Backend Skeleton](../../phase-01.03-architecture/phase-1-backend-skeleton.md)
  - [Domain Model](../../phase-01.03-architecture/phase-1-domain-model.md)

---

[← Quay lại Overview](../README.md)

