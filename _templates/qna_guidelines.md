# HƯỚNG DẪN HỎI – ĐÁP (Q&A)

Tài liệu này mô tả cách đặt câu hỏi và cách trả lời nhanh bằng mã lựa chọn (A/B/C…) để tăng hiệu quả trao đổi và ra quyết định trong dự án Tutor.

> **Lưu ý**: Để sử dụng các vai trò tham chiếu khi cần câu trả lời từ góc nhìn chuyên môn cụ thể, xem tài liệu [role_presets.md](./role_presets.md).

---

## 1. Tổng quan về phương pháp Q&A

### Mục đích

Phương pháp Q&A với mã lựa chọn (A/B/C…) được thiết kế để:
- **Tăng tốc độ ra quyết định**: Người dùng chỉ cần chọn một trong các lựa chọn đã được phân tích sẵn
- **Đảm bảo tính toàn diện**: AI sẽ phân tích đầy đủ các phương án trước khi đưa ra khuyến nghị
- **Giảm ambiguity**: Câu trả lời rõ ràng, có cấu trúc, dễ so sánh
- **Hỗ trợ quyết định có căn cứ**: Mỗi lựa chọn được phân tích ưu nhược điểm chi tiết

### Khi nào sử dụng

- Khi cần **quyết định nhanh** giữa các phương án cụ thể
- Khi có **nhiều lựa chọn** và cần so sánh khách quan
- Khi cần **xác nhận** một hướng đi đã được đề xuất
- Khi muốn **tránh discussion dài dòng** và đi thẳng vào quyết định

---

## 2. Quy trình đặt câu hỏi Q&A

### Bước 1: Phân tích vấn đề

**Mục tiêu**: Hiểu rõ vấn đề cần quyết định, bối cảnh, và các yếu tố ảnh hưởng.

**Nội dung phân tích:**
- **Bối cảnh dự án**: Vấn đề này nằm trong phase nào, liên quan đến tính năng gì
- **Ràng buộc hiện tại**: Technical constraints, resource constraints, timeline, budget
- **Mục tiêu cần đạt**: Kết quả mong muốn, success criteria
- **Stakeholders liên quan**: Ai sẽ bị ảnh hưởng, ai cần tham gia quyết định
- **Rủi ro tiềm ẩn**: Những điều có thể xảy ra nếu quyết định sai

**Ví dụ:**
> "Vấn đề: Cần chọn kiến trúc triển khai cho production. Bối cảnh: Dự án đang ở phase 1, team nhỏ (2-3 dev), budget hạn chế, cần deploy nhanh. Mục tiêu: Hệ thống ổn định, dễ maintain, có thể scale sau này. Rủi ro: Nếu chọn phức tạp quá sẽ tốn thời gian setup, nếu đơn giản quá sẽ khó scale."

### Bước 2: Phân tích từng lựa chọn

**Mục tiêu**: Đánh giá chi tiết từng phương án (A/B/C…) với các tiêu chí quan trọng.

**Tiêu chí phân tích cho mỗi lựa chọn:**

1. **Ưu điểm (Pros)**
   - Lợi ích cụ thể, giá trị mang lại
   - Phù hợp với mục tiêu nào
   - Giải quyết được vấn đề gì

2. **Nhược điểm (Cons)**
   - Hạn chế, rủi ro
   - Chi phí (thời gian, tiền bạc, complexity)
   - Trade-offs cần chấp nhận

3. **Độ phù hợp với bối cảnh**
   - Phù hợp với constraints hiện tại không
   - Phù hợp với timeline không
   - Phù hợp với team size và skill level không

4. **Tác động dài hạn**
   - Ảnh hưởng đến các phase sau
   - Khả năng mở rộng, maintainability
   - Technical debt tiềm ẩn

**Format trình bày:**
```
A: [Tên lựa chọn]
   - Ưu điểm: [liệt kê]
   - Nhược điểm: [liệt kê]
   - Phù hợp với: [bối cảnh nào]
   - Tác động dài hạn: [mô tả]

B: [Tên lựa chọn]
   - Ưu điểm: [liệt kê]
   - Nhược điểm: [liệt kê]
   - Phù hợp với: [bối cảnh nào]
   - Tác động dài hạn: [mô tả]
```

### Bước 3: So sánh và tóm tắt

**Mục tiêu**: Tạo bảng so sánh trực quan và tóm tắt điểm khác biệt chính.

**Nội dung:**
- **Bảng so sánh**: Liệt kê các tiêu chí quan trọng và đánh giá từng lựa chọn
- **Điểm khác biệt chính**: Những điểm quan trọng nhất để phân biệt các lựa chọn
- **Kịch bản phù hợp**: Mỗi lựa chọn phù hợp nhất với tình huống nào

**Ví dụ bảng so sánh:**
| Tiêu chí | A: K8s/Ingress | B: Docker Compose + Nginx |
|----------|----------------|---------------------------|
| Độ phức tạp setup | Cao | Thấp |
| Thời gian triển khai | 2-3 tuần | 2-3 ngày |
| Chi phí vận hành | Cao (cần K8s cluster) | Thấp (VM thông thường) |
| Khả năng scale | Rất tốt | Tốt (cần manual) |
| Phù hợp team nhỏ | Không | Có |

### Bước 4: Đưa ra khuyến nghị

**Mục tiêu**: Đề xuất lựa chọn tốt nhất dựa trên phân tích, kèm lập luận rõ ràng.

**Cấu trúc khuyến nghị:**

1. **Khuyến nghị cụ thể**
   - Chọn phương án nào (A/B/C…)
   - Mức độ chắc chắn (ví dụ: "Khuyến nghị mạnh mẽ", "Khuyến nghị có điều kiện")

2. **Lập luận giải thích** (bắt buộc nếu không ở mode Plan)
   - **Lý do chính**: Tại sao chọn phương án này
   - **Phân tích ưu tiên**: Tiêu chí nào quan trọng nhất trong bối cảnh này
   - **Phân tích rủi ro**: Rủi ro của phương án được chọn vs các phương án khác
   - **Tác động**: Ảnh hưởng đến timeline, resource, chất lượng sản phẩm
   - **Điều kiện áp dụng**: Khi nào nên chọn phương án này, khi nào nên xem xét lại

3. **Kế hoạch thực hiện** (tùy chọn)
   - Các bước triển khai
   - Điểm cần lưu ý khi thực hiện
   - Cách giảm thiểu rủi ro

**Lưu ý về mode:**

- **Mode Plan**: Chỉ cần đưa ra khuyến nghị ngắn gọn, không cần giải thích chi tiết
- **Mode Agent/Ask**: **Bắt buộc** phải có lập luận giải thích đầy đủ, phân tích sâu về:
  - Tại sao phương án này tốt hơn
  - Trade-offs đã cân nhắc
  - Rủi ro và cách mitigate
  - Tác động đến các thành phần khác của hệ thống

**Ví dụ khuyến nghị (Mode Agent/Ask):**
```
Khuyến nghị: B (Docker Compose + Nginx)

Lập luận:
- Với team nhỏ (2-3 dev) và budget hạn chế, phương án B phù hợp hơn vì:
  + Setup nhanh (2-3 ngày vs 2-3 tuần), giúp release sớm
  + Chi phí thấp, không cần K8s cluster
  + Đủ tốt cho phase 1 với số lượng người dùng dự kiến
- Rủi ro của B (khó scale) có thể mitigate bằng cách:
  + Thiết kế architecture để dễ migrate sang K8s sau
  + Sử dụng load balancer và database scaling strategies
- Khi nào nên xem xét lại: Khi số lượng người dùng tăng >10x hoặc cần multi-region
```

---

## 3. Yêu cầu cho câu trả lời Q&A

### Yêu cầu bắt buộc

1. **So sánh ưu nhược điểm đầy đủ**
   - Mỗi lựa chọn phải có cả ưu điểm và nhược điểm
   - Không được bỏ qua nhược điểm của phương án được khuyến nghị
   - Phải công bằng, không thiên vị

2. **Phân tích dựa trên bối cảnh cụ thể**
   - Không đưa ra đánh giá chung chung
   - Phải xem xét constraints, timeline, resources thực tế
   - Phải phù hợp với phase và mục tiêu hiện tại của dự án

3. **Khuyến nghị rõ ràng**
   - Phải chọn một phương án cụ thể (hoặc kết hợp nếu hợp lý)
   - Không được đưa ra câu trả lời mơ hồ kiểu "tùy tình huống" mà không có hướng dẫn cụ thể

4. **Lập luận logic** (nếu không ở mode Plan)
   - Giải thích tại sao, không chỉ nói cái gì
   - Phân tích trade-offs một cách minh bạch
   - Thừa nhận những điểm yếu của phương án được chọn

### Yêu cầu tùy chọn (khuyến khích)

- **Đưa ra phương án kết hợp**: Nếu có thể kết hợp các phương án, đề xuất cách làm
- **Đề xuất điều kiện thay đổi**: Khi nào nên xem xét lại quyết định
- **Kế hoạch migration**: Nếu chọn phương án tạm thời, đề xuất cách chuyển sang phương án dài hạn

---

## 4. Ví dụ minh họa

### Ví dụ 1: Kiến trúc triển khai

**Câu hỏi:**
> Chọn kiến trúc triển khai cho production. Team: 2-3 dev, budget hạn chế, cần deploy nhanh cho phase 1.

**Phân tích:**

**A: K8s/Ingress**
- Ưu điểm:
  - Auto-scaling, high availability
  - Service discovery, load balancing tự động
  - Phù hợp cho long-term, dễ scale
- Nhược điểm:
  - Setup phức tạp, cần expertise về K8s
  - Chi phí cao (cần managed K8s hoặc self-hosted)
  - Thời gian setup: 2-3 tuần
  - Overkill cho phase 1 với số lượng người dùng nhỏ
- Phù hợp với: Team lớn, có DevOps, budget tốt, cần scale nhanh
- Tác động dài hạn: Tốt, nhưng có thể không cần thiết ngay

**B: 1-2 VM + Docker Compose + Nginx reverse proxy**
- Ưu điểm:
  - Setup đơn giản, nhanh (2-3 ngày)
  - Chi phí thấp (chỉ cần VM)
  - Dễ hiểu, dễ maintain cho team nhỏ
  - Đủ tốt cho phase 1
- Nhược điểm:
  - Scale manual, không tự động
  - Single point of failure nếu chỉ 1 VM
  - Cần tự quản lý backup, monitoring
- Phù hợp với: Team nhỏ, budget hạn chế, cần deploy nhanh
- Tác động dài hạn: Có thể cần migrate sang K8s sau, nhưng architecture có thể thiết kế để dễ migrate

**So sánh:**
| Tiêu chí | A | B |
|----------|---|---|
| Thời gian setup | 2-3 tuần | 2-3 ngày |
| Chi phí | Cao | Thấp |
| Phù hợp team nhỏ | Không | Có |
| Khả năng scale | Rất tốt | Tốt (manual) |

**Khuyến nghị: B**

**Lập luận:**
- Với team 2-3 dev và budget hạn chế, B phù hợp hơn vì setup nhanh, chi phí thấp
- Đủ tốt cho phase 1, có thể migrate sang K8s khi cần
- Rủi ro có thể mitigate bằng cách: dùng 2 VM (HA), thiết kế architecture để dễ migrate

**Trả lời: B**

---

### Ví dụ 2: Phase đưa tính năng multi-student

**Câu hỏi:**
> Nên đưa tính năng multi-student vào Phase 2 hay Phase 3? Phase 2 focus vào core features, Phase 3 focus vào advanced features.

**Phân tích:**

**A: Phase 2**
- Ưu điểm:
  - Sớm đáp ứng nhu cầu phụ huynh có nhiều con
  - Tăng giá trị sản phẩm sớm, competitive advantage
  - Có thể test với real users sớm
- Nhược điểm:
  - Tăng complexity của Phase 2, có thể delay các core features
  - Cần thiết kế database và architecture từ đầu để support
  - Rủi ro: Nếu core features chưa ổn, multi-student sẽ không có giá trị
- Phù hợp với: Nếu multi-student là core requirement, không phải nice-to-have
- Tác động: Tăng scope Phase 2, có thể ảnh hưởng timeline

**B: Phase 3**
- Ưu điểm:
  - Focus Phase 2 vào core features, đảm bảo chất lượng
  - Multi-student là enhancement, không ảnh hưởng core value
  - Có thể học từ feedback Phase 2 để thiết kế multi-student tốt hơn
- Nhược điểm:
  - Phụ huynh có nhiều con phải đợi lâu hơn
  - Có thể mất competitive advantage nếu đối thủ có sớm
- Phù hợp với: Nếu multi-student là enhancement, core features quan trọng hơn
- Tác động: Timeline hợp lý hơn, nhưng có thể mất một số users

**So sánh:**
| Tiêu chí | A: Phase 2 | B: Phase 3 |
|----------|-----------|-----------|
| Thời gian có tính năng | Sớm | Muộn hơn |
| Impact lên Phase 2 | Tăng scope | Không |
| Chất lượng core features | Có thể bị ảnh hưởng | Đảm bảo tốt hơn |
| Competitive advantage | Có | Có thể mất |

**Khuyến nghị: B (Phase 3)**

**Lập luận:**
- Multi-student là enhancement, không phải core requirement
- Quan trọng hơn là đảm bảo core features (single student) hoạt động tốt trước
- Có thể thiết kế architecture từ đầu để dễ thêm multi-student sau, nhưng implement vào Phase 3
- Rủi ro của A (delay core features) lớn hơn lợi ích (có sớm multi-student)

**Trả lời: B**

---

## 5. Best practices

### Khi đặt câu hỏi

1. **Cung cấp đủ context**
   - Bối cảnh dự án, phase hiện tại
   - Constraints (time, budget, team size)
   - Mục tiêu cần đạt

2. **Giới hạn số lựa chọn**
   - Tốt nhất: 2-3 lựa chọn
   - Tối đa: 4-5 lựa chọn (nếu nhiều hơn, nên nhóm lại)

3. **Làm rõ tiêu chí đánh giá**
   - Nếu có tiêu chí ưu tiên, nên nêu rõ
   - Ví dụ: "Ưu tiên tốc độ triển khai hơn là scalability"

4. **Một câu hỏi một chủ đề**
   - Tránh hỏi nhiều vấn đề trong một câu hỏi
   - Nếu có nhiều vấn đề, tách thành nhiều câu hỏi riêng

### Khi nhận câu trả lời

1. **Đọc kỹ phân tích**
   - Không chỉ xem khuyến nghị, mà đọc cả lập luận
   - Kiểm tra xem AI có hiểu đúng bối cảnh không

2. **Xác nhận lại nếu cần**
   - Nếu có thông tin bổ sung, cung cấp và yêu cầu phân tích lại
   - Nếu không đồng ý với khuyến nghị, hỏi rõ lý do

3. **Lưu lại quyết định**
   - Ghi lại lựa chọn và lý do để tham khảo sau
   - Đánh dấu các điều kiện cần xem xét lại

---

## 6. Ghi chú

- Tài liệu này dùng làm template và guideline cho việc đặt câu hỏi Q&A
- Có thể kết hợp với [role_presets.md](./role_presets.md) để có câu trả lời từ góc nhìn chuyên môn cụ thể
- Format có thể linh hoạt điều chỉnh tùy theo tình huống, nhưng nên giữ các nguyên tắc cơ bản

