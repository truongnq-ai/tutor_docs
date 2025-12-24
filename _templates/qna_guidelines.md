# HƯỚNG DẪN HỎI – ĐÁP (Q&A) VÀ ĐẶT VAI TRÒ THAM CHIẾU

Tài liệu này mô tả:
- Cách đặt câu hỏi và cách trả lời nhanh bằng mã lựa chọn (A/B/C…)
- Danh sách vai trò/tham chiếu thường dùng để định hướng câu trả lời đúng bối cảnh dự án Tutor

## 1. Quy ước hỏi – đáp nhanh
- Khi cần xác nhận, đưa sẵn lựa chọn và yêu cầu trả lời theo định dạng: `Trả lời: A` (hoặc B/C/…).

### Quy trình khi đặt câu hỏi:
1. **Phân tích vấn đề**: Phân tích vấn đề liên quan đến câu hỏi, bối cảnh và các yếu tố ảnh hưởng.
2. **Phân tích từng lựa chọn**: Phân tích chi tiết từng câu trả lời (A/B/C…) được đưa ra.
3. **Tóm tắt**: Tóm tắt nội dung vào câu hỏi để làm rõ vấn đề cần quyết định.
4. **Đưa ra khuyến nghị**: 
   - Đưa ra khuyến nghị cụ thể để dễ lựa chọn.
   - **Lưu ý về mode**: 
     - Nếu ở mode **Plan**: Chỉ cần đưa ra khuyến nghị.
     - Nếu ở mode **Agent/Ask** (không phải Plan): Khi đưa ra khuyến nghị, cần kèm theo **lập luận giải thích** rõ ràng vì sao đưa ra khuyến nghị đó (phân tích ưu tiên, rủi ro, tác động, v.v.).

### Yêu cầu cho các câu trả lời:
- Mỗi lựa chọn (A/B/C…) cần có phần **so sánh ưu nhược điểm** để hỗ trợ việc đánh giá và quyết định.

### Ví dụ:
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

