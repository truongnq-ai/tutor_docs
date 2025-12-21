# Cấu trúc code & đặt tên
[← Quay lại Overview](README.md)

## Thư mục/layer (dạng cây)

- `src/`
  - `app/` (Next.js App Router, pages/routes)
    - `<route>/page.tsx` (route chính)
    - `layout.tsx` (layout gốc)
  - `components/` (UI theo domain: dashboard, auth, common, ...)
  - `lib/` (Utilities & services)
    - `api/` (API client, endpoints, service functions)
    - `hooks/` (Custom React hooks)
    - `utils/` (Helper functions)
  - `types/` (TypeScript types/interfaces)
  - `contexts/` (React context, nếu có)
  - `styles/` (Global styles, SCSS/CSS)

## Đặt tên

- Component: PascalCase, file `.tsx`; hook `useX`, context `XContext`.
- Service: `*.service.ts`, class PascalCase hoặc function, export instance `xxxService` hoặc named export.
- Type/DTO: PascalCase, đặt trong `src/types`.
- Util: `*.util.ts`/`*.util.tsx`.
- Route: thư mục kebab-case trong `app/`, file `page.tsx`.

## Module mới (mẫu)

- Thêm route tại `src/app/<feature>/page.tsx` (render component chính).
- Tạo component chính + component chi tiết nếu cần (trong `src/components/<feature>/`).
- Tạo service `<feature>.service.ts` gọi API qua HTTP client với RESTful methods.
- Tạo type/DTO trong `src/types/<feature>.ts` (request/response).
- Wire vào layout nếu cần (nav/menu).

## Ví dụ chi tiết khi thêm màn hình mới (ví dụ: "quản lý học sinh")

- Route: tạo `src/app/students/page.tsx` để render trang danh sách/shell.
- Component:
  - `src/components/students/StudentList.tsx` (danh sách, gọi service GET /api/v1/students).
  - `src/components/students/StudentDetail.tsx` (form thêm/sửa/chi tiết).
- Service:
  - `src/lib/api/student.service.ts` dùng HTTP client với methods GET/POST/PUT/DELETE cho `/api/v1/students`.
- Types/DTO:
  - `src/types/student.ts` khai báo `Student`, `StudentSearch`, `StudentRequest`, `PageResponse<Student>`.
- Constants (nếu cần):
  - Bổ sung API endpoints tại `lib/api/endpoints.ts`.
- Layout/nav:
  - Cập nhật menu/links (header/footer/nav) để trỏ tới route mới (nếu cần hiển thị trong UI).
- Styles:
  - Thêm SCSS cục bộ nếu cần (ưu tiên tái dùng class có sẵn); import vào component hoặc page.

[← Quay lại Overview](README.md)

