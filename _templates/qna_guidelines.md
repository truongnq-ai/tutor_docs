# HƯỚNG DẪN HỎI – ĐÁP (Q&A) VÀ ĐẶT VAI TRÒ THAM CHIẾU

Tài liệu này mô tả:
- Cách đặt câu hỏi và cách trả lời nhanh bằng mã lựa chọn (A/B/C…)
- Danh sách vai trò/tham chiếu thường dùng để định hướng câu trả lời đúng bối cảnh dự án Tutor

## 1. Quy ước hỏi – đáp nhanh
- Khi cần xác nhận, đưa sẵn lựa chọn và yêu cầu trả lời theo định dạng: `Trả lời: A` (hoặc B/C/…).
- Ví dụ:
  - Kiến trúc triển khai:  
    - A: K8s/Ingress  
    - B: 1–2 VM + Docker Compose + Nginx reverse proxy  
    Trả lời: A/B
  - Phase đưa tính năng multi-student:  
    - A: Phase 2  
    - B: Phase 3  
    Trả lời: A/B

## 2. Vai trò/Ngữ cảnh tham chiếu (prompt presets)
Sử dụng khi yêu cầu trả lời dưới góc nhìn cụ thể, tránh viết lại nhiều lần:

1) Quản trị dự án (PM) 15+ năm trong giáo dục / AI tutoring
   - Trọng tâm: lộ trình, ưu tiên, rủi ro, go-to-market, release kế thừa.

2) Giáo viên Toán cấp 2 (lớp 6–7) 15+ năm
   - Trọng tâm: chuẩn kiến thức, lộ trình học, sai lầm thường gặp, cách giảng dễ hiểu.

3) Gia sư Toán 8+ năm
   - Trọng tâm: cá nhân hoá, bài tập bổ trợ, động lực học, chữa lỗi, nhắc lại nền tảng.

4) Học sinh lớp 6/7 cần bổ sung kiến thức
   - Trọng tâm: khó khăn thực tế, UX dễ dùng, hướng dẫn rõ ràng, thời lượng ngắn.

5) Phụ huynh lớp 6/7 đang lo lắng điểm Toán
   - Trọng tâm: minh bạch tiến độ, điểm yếu, báo cáo dễ hiểu, nhắc học hiệu quả.

6) Kiến trúc sư hệ thống/Backend
   - Trọng tâm: độ tin cậy, bảo mật, scaling, đơn giản triển khai (Compose/VM hoặc K8s), quan sát/monitoring.

7) UX designer cho edtech
   - Trọng tâm: flow ngắn, thông điệp rõ, giảm ma sát, hỗ trợ thử nghiệm A/B sau này.

## 3. Cách sử dụng
- Khi cần câu trả lời theo vai trò, thêm yêu cầu: “Hãy đóng vai trò [vai trò] và trả lời…”
- Khi cần xác nhận nhanh, dùng format lựa chọn sẵn và yêu cầu “Trả lời: A/B/C…”
- Giữ câu hỏi ngắn gọn, một chủ đề mỗi lượt trao đổi.

## 4. Ghi chú
- Tài liệu này dùng làm template; có thể bổ sung vai trò mới nếu phát sinh nhu cầu.

