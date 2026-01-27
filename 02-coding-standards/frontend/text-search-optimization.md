# TỐI ƯU HÓA TÌM KIẾM VĂN BẢN (TEXT SEARCH OPTIMIZATION)

**Project:** Tutor  
**Document type:** Coding Standard | Frontend Guideline  
**Audience:** Developer | Tech  
**Status:** Approved  
**Version:** 2026-01-27-21-15  
**Author:** Antigravity

[← Quay lại Overview](README.md)

---

## 1. MỤC ĐÍCH TÀI LIỆU

Tài liệu này quy định tiêu chuẩn kỹ thuật cho hành vi **Text Search Realtime** trên toàn bộ hệ thống Tutor. Mục tiêu nhằm đảm bảo tính đồng nhất về trải nghiệm người dùng (UX), tối ưu hóa hiệu năng hệ thống và tránh các lỗi logic phổ biến trong xử lý bất đồng bộ.

---

## 2. PHẠM VI

### 2.1. Trong phạm vi

- Áp dụng cho **tất cả các màn hình có ô tìm kiếm dạng text input** thực hiện gọi API tới backend.
- Các module: `tutor-admin-dashboard`, `tutor-teacher`.
- Ví dụ: Tìm kiếm Topic, User, Course, Lesson, Bài tập...

### 2.2. Ngoài phạm vi

- Local search (tìm kiếm phía frontend trên tập dữ liệu nhỏ đã được load sẵn).
- Select dropdown có tính năng filter nhưng đã preload toàn bộ data.

---

## 3. ĐỊNH NGHĨA / THUẬT NGỮ

| Thuật ngữ          | Giải thích                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Debounce**       | Kỹ thuật trì hoãn việc thực thi hàm (gọi API) cho đến khi người dùng ngừng thao tác trong một khoảng thời gian nhất định.     |
| **Race Condition** | Tình trạng khi nhiều request không đồng bộ trả về kết quả sai thứ tự thời gian gửi, dẫn đến dữ liệu hiển thị không chính xác. |
| **Abort Request**  | Cơ chế huỷ bỏ các request HTTP đang chờ xử lý (pending) khi có một request mới được gửi đi.                                   |

---

## 4. NỘI DUNG CHÍNH

### 4.1. Nguyên tắc kích hoạt Search (Global Rules)

#### Điều kiện về độ dài

- **Chỉ thực hiện search khi độ dài keyword ≥ 3 ký tự**.
- Keyword phải được `trim()` trước khi kiểm tra độ dài.
- Nếu `keyword.length < 3`: Không gọi API, xóa kết quả hiện tại và chuyển về trạng thái danh sách mặc định/trống.

#### Cơ chế Debounce

- Áp dụng thời gian chờ: **500ms**.
- Chỉ gửi request khi người dùng ngừng gõ sau đúng 500ms.

#### Kiểm tra sự thay đổi

- Không gọi API nếu keyword hiện tại giống hệt keyword của lần search thành công gần nhất.

---

### 4.2. Quản lý trạng thái UI & UX

Hệ thống cần quản lý rõ các trạng thái sau để phản hồi người dùng:

| State         | Mô tả                                                 |
| ------------- | ----------------------------------------------------- |
| **idle**      | Trạng thái ban đầu hoặc khi keyword < 3 ký tự.        |
| **typing**    | Người dùng đang nhập liệu (trong thời gian debounce). |
| **searching** | Đã hết thời gian debounce, đang chờ kết quả từ API.   |
| **success**   | Đã nhận được dữ liệu thành công.                      |
| **empty**     | API trả về danh sách rỗng.                            |
| **error**     | Gặp lỗi khi gọi API.                                  |

**Khuyến nghị về UX:** Hiển thị helper text hoặc placeholder: _"Nhập tối thiểu 3 ký tự để tìm kiếm"_ để người dùng hiểu luồng hoạt động.

---

### 4.3. Xử lý Race Condition (BẮT BUỘC)

Để tránh dữ liệu cũ ghi đè lên dữ liệu mới khi mạng không ổn định:

- Khi một request search mới được kích hoạt, phải **huỷ bỏ (abort)** request search cũ đang ở trạng thái pending.
- Chỉ cho phép kết quả của **request cuối cùng** được cập nhật lên giao diện người dùng.

---

### 4.4. Xử lý cho Filter Phức tạp (Special Case - Button Search)

Đối với các màn hình có hệ thống filter phức tạp (ví dụ: Quản lý bài tập với nhiều dropdown, nhiều input đồng thời):

- **Hành vi**: KHÔNG gọi API realtime khi thay đổi input/select.
- **Kích hoạt**: Chỉ gọi API khi người dùng click vào button **"Tìm kiếm"**.
- **Lý do**: Tránh việc call backend quá nhiều lần khi người dùng đang trong quá trình thiết lập bộ lọc đa điều kiện, gây trải nghiệm "giật" lag hoặc kết quả trả về không đúng ý đồ bộ lọc tổng thể.
- **Phạm vi áp dụng cụ thể**:
  - Quản lý bài tập trên Admin Dashboard.
  - Quản lý bài tập trên Teacher Module.

---

### 4.5. Quy trình xử lý (Pseudo Flow)

#### Với Filter Đơn giản (Default)

```text
User input (Ngõ vào)
  ↓
Trim() keyword
  ↓
Nếu keyword.length < 3 ?
  Yes: Clear result & Dừng
  No: Tiếp tục
  ↓
Chờ Debounce 500ms
  ↓
Huỷ (Abort) request cũ đang chờ (nếu có)
  ↓
Thực hiện Call Search API
```

#### Với Filter Phức tạp (Button Search)

```text
User thay đổi input/select
  ↓
Hệ thống chỉ update local state (UI)
  ↓
User click button "Tìm kiếm"
  ↓
Huỷ (Abort) request cũ đang chờ (nếu có)
  ↓
Thực hiện Call Search API với toàn bộ bộ lọc hiện tại
```

---

## 5. QUYẾT ĐỊNH THIẾT KẾ / GIẢ ĐỊNH

- **Tham số 3 ký tự**: Đây là ngưỡng tối ưu để lọc bớt các kết quả quá nhiễu trên tập dữ liệu lớn.
- **Tham số 500ms**: Cung cấp sự cân bằng giữa cảm giác "realtime" và việc tiết kiệm tài nguyên server.

---

## 6. PHỤ THUỘC / LIÊN KẾT

- → Tài liệu liên quan:
  - [Frontend Coding Standards](../../README.md)
  - [Page Metadata Standard](./page-metadata.md)

---

## 7. GHI CHÚ / TODO

- [x] Áp dụng chuẩn này cho module Subjects và Topics.
- [ ] Rà soát lại tất cả các module Search khác trong Admin Dashboard.
- [ ] Cập nhật thư viện dùng chung cho cơ chế Debounce + AbortController để dễ tái sử dụng.

---

[← Quay lại Overview](README.md)
