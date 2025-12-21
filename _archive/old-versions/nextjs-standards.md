# Gá»i API & HTTP Client (RESTful)
[← Quay lại Overview](overview.md)

## Chuẩn chung

- Dùng HTTP client (fetch hoặc axios) làm client; khuyến nghị dùng axios cho dễ quản lý interceptors.
- Tất cả API dùng phương thức RESTful (GET/POST/PUT/DELETE), path chuẩn `/api/v1/<resource>`.
- Base URL: `NEXT_PUBLIC_API_URL` trong `.env.local` hoặc config.
- Header: `Content-Type: application/json; charset=utf-8`, `Authorization: Bearer <token>` lấy từ cookie hoặc localStorage.
- Response chuẩn: `errorCode/errorDetail/data` (theo backend).

## Pattern Service Layer

**Service chỉ gá»i API và  trả vá» ResponseObject, kiểm tra HTTP status và  errorCode, KHÔNG throw Error cho business errors.**

```typescript
// ✓ ÄÃšNG: Service trả vá» ResponseObject, kiểm tra HTTP status
async getList(param: Partial<StudentSearch>): Promise<ResponseObject<Student[]>> {
  const response = await apiClient.get<ResponseObject<Student[]>>(
    '/api/v1/students',
    { params: param }
  );
  
  // Kiá»ƒm tra HTTP status
  if (response.status === 200 && response.data.errorCode === '0000') {
    return response.data;
  }
  
  // Tráº£ vá» error response
  return {
    errorCode: response.data.errorCode || '5001',
    errorDetail: response.data.errorDetail || 'Unknown error',
    data: null
  };
}

// ✗Œ SAI: Service throw Error
async getList(param: Partial<StudentSearch>): Promise<Student[]> {
  const response = await apiClient.get<ResponseObject<Student[]>>(...);
  if (response.data.errorCode !== '0000') {
    throw new Error(response.data.errorDetail);
  }
  return response.data.data || [];
}
```

## Pattern Component Layer

**Component tự kiểm tra errorCode và  xử lý:**
- Nếu `errorCode === "0000"` ←’ xử lý `data`, có thể hiển thị success message
- Nếu khÃ´ng `"0000"` ←’ hiển thị `errorDetail` từ backend
- Nếu có lỗi máº¡ng/exception ←’ catch block hiển thị 'Há»‡ thá»‘ng khÃ´ng có pháº£n há»“i.'

```typescript
// Component xử lý errorCode
try {
  const response = await studentService.getList(searchParams);
  
  if (response.errorCode === '0000') {
    // Xá»­ lÃ½ response.data
    const students = response.data || [];
    setStudents(students);
    toast.success('Láº¥y danh sÃ¡ch há»c sinh thÃ nh cÃ´ng!');
  } else {
    // Hiá»ƒn thá»‹ errorDetail từ backend
    toast.error(response.errorDetail || 'CÃ³ lỗi xáº£y ra. Vui lÃ²ng thá»­ lại.');
  }
} catch (error: any) {
  // Lá»—i máº¡ng/exception
  console.error('Error fetching students:', error);
  toast.error('Há»‡ thá»‘ng khÃ´ng có pháº£n há»“i.');
}
```

## Error Code Constants

Táº¡o file `src/lib/constants/error-codes.ts` để quản lý error codes:

```typescript
export const ERROR_CODES = {
  SUCCESS: '0000',
  // Business errors
  BUSINESS_ERROR: '0001',
  // Authentication & Authorization
  UNAUTHORIZED: '1001',
  TOKEN_EXPIRED: '1002',
  FORBIDDEN: '1003',
  // Validation
  VALIDATION_ERROR: '2001',
  MISSING_FIELD: '2002',
  // Resource errors
  NOT_FOUND: '3001',
  CONFLICT: '3002',
  // Service integration
  SERVICE_UNAVAILABLE: '4001',
  // System errors
  INTERNAL_ERROR: '5001',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
```

## HTTP Client Setup

### Axios Client với Interceptors

```typescript
// src/lib/api/client.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/lib/utils/auth';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add access token
apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: Handle 401 ←’ refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Try refresh token
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh_token`,
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );
          // Update tokens
          setTokens(data.data.accessToken, data.data.refreshToken);
          // Retry original request
          if (error.config) {
            error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
            return apiClient.request(error.config);
          }
        } catch (refreshError) {
          // Refresh failed ←’ logout
          clearTokens();
          window.location.href = '/signin';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

## Xá»­ lÃ½ lỗi & toast

- **Service**: Gá»i API, trả vá» `Promise<ResponseObject<T>>`, kiểm tra HTTP status và  errorCode.
- **Component**: Tá»± kiểm tra `errorCode`, xử lý `data` và  hiển thị toast tÆ°Æ¡ng á»©ng.
- Dùng `react-hot-toast` hoặc tÆ°Æ¡ng tự táº¡i component để hiển thị thÃ´ng bÃ¡o.
- KhÃ´ng log dá»¯ liá»‡u nháº¡y cáº£m; `console.error` chỉ phá»¥c vá»¥ debug.

## Quy Æ°á»›c path

- Giá»¯ Ä‘Ãºng chuẩn backend: `/api/v1/<resource>` và  dùng RESTful methods.
- VÃ­ dá»¥:
  - `GET /api/v1/students` - Danh sÃ¡ch há»c sinh
  - `GET /api/v1/students/{id}` - Chi tiáº¿t há»c sinh
  - `POST /api/v1/students` - Táº¡o má»›i há»c sinh
  - `PUT /api/v1/students/{id}` - Cáº­p nháº­t há»c sinh
  - `DELETE /api/v1/students/{id}` - XÃ³a há»c sinh

## Error Handling Helper

Táº¡o helper function để xử lý error codes:

```typescript
// src/lib/utils/error-handler.ts
import { ERROR_CODES } from '@/lib/constants/error-codes';
import { ResponseObject } from '@/types/api';

export function handleApiError(response: ResponseObject<any>): string {
  const { errorCode, errorDetail } = response;
  
  switch (errorCode) {
    case ERROR_CODES.UNAUTHORIZED:
      return 'PhiÃªn Ä‘Äƒng nháº­p Ä‘Ã£ háº¿t háº¡n. Vui lÃ²ng Ä‘Äƒng nháº­p lại.';
    case ERROR_CODES.FORBIDDEN:
      return 'Báº¡n khÃ´ng có quyá»n thá»±c hiá»‡n thao tÃ¡c nÃ y.';
    case ERROR_CODES.NOT_FOUND:
      return 'KhÃ´ng tÃ¬m tháº¥y dá»¯ liá»‡u.';
    case ERROR_CODES.VALIDATION_ERROR:
      return errorDetail || 'Dá»¯ liá»‡u khÃ´ng há»£p lá»‡.';
    default:
      return errorDetail || 'CÃ³ lỗi xáº£y ra. Vui lÃ²ng thá»­ lại.';
  }
}
```

[←‘ Quay lại Overview](overview.md)

# Kiá»ƒm tra cháº¥t lÆ°á»£ng code & lÃ m sáº¡ch
[← Quay lại Overview](overview.md)

## Má»¥c Ä‘Ã­ch

Äáº£m báº£o code khÃ´ng có lỗi syntax, warning, và  loáº¡i bá» cÃ¡c import khÃ´ng sử dụng để duy trÃ¬ cháº¥t lÆ°á»£ng code và  dễ báº£o trÃ¬.

## Quy trÃ¬nh thá»±c hiá»‡n

### BÆ°á»›c 1: Kiá»ƒm tra lỗi syntax và  TypeScript

- Cháº¡y linter/compiler để phÃ¡t hiá»‡n:
  - Lá»—i syntax
  - Lá»—i TypeScript (TS errors)
  - Warning từ TypeScript compiler
  - Warning từ ESLint
- CÃ´ng cá»¥ kiểm tra:
  - IDE linter (TypeScript Language Service trong VS Code)
  - `npm run build` hoặc `next build`
  - `npm run lint` (ESLint)
  - `tsc --noEmit` (náº¿u có)
- **YÃªu cáº§u**: KhÃ´ng có lỗi (errors) trÆ°á»›c khi tiáº¿p tá»¥c.

### BÆ°á»›c 2: Sá»­a lỗi và  warning

- **Æ¯u tiÃªn sá»­a**:
  1. Lá»—i syntax
  2. Lá»—i TypeScript (TS errors)
  3. Warning nghiÃªm trá»ng từ ESLint
  4. Warning khÃ¡c
- **CÃ¡c lỗi thÆ°á»ng gáº·p**:
  - `TS2554`: Sai sá»‘ lÆ°á»£ng tham sá»‘ (Expected N arguments, but got M)
  - `TS2339`: Property khÃ´ng tồn tại trÃªn type
  - `TS2729`: Property Ä‘Æ°á»£c sử dụng trÆ°á»›c khi khá»Ÿi tạo
  - `TS2322`: Type khÃ´ng khớp (Type X is not assignable to type Y)
  - `TS2532`: Object có thể lÃ  `undefined`
  - `react-hooks/exhaustive-deps`: Missing dependencies in useEffect/useMemo
- **NguyÃªn táº¯c sá»­a**:
  - Sá»­a Ä‘Ãºng nguyÃªn nhÃ¢n, khÃ´ng chỉ che lỗi
  - Giá»¯ type safety của TypeScript
  - TuÃ¢n thá»§ React hooks rules
  - TuÃ¢n thá»§ coding standards của dá»± Ã¡n

### BÆ°á»›c 3: Kiá»ƒm tra và  xÃ³a unused imports

- **Kiá»ƒm tra**:
  - Import khÃ´ng Ä‘Æ°á»£c sử dụng trong file
  - Import chỉ xuáº¥t hiá»‡n trong khai bÃ¡o nhÆ°ng khÃ´ng Ä‘Æ°á»£c dùng
  - Import React hooks khÃ´ng Ä‘Æ°á»£c sử dụng
- **CÃ¡ch xÃ¡c Ä‘á»‹nh**:
  - Dùng IDE (gáº¡ch xÃ¡m/gá»£i Ã½)
  - TÃ¬m kiáº¿m tÃªn import trong file
  - Kiá»ƒm tra cÃ¡c hooks và  components
- **XÃ³a**:
  - XÃ³a import statement khÃ´ng sử dụng
  - XÃ³a import trong destructuring náº¿u khÃ´ng dùng
  - XÃ³a unused React hooks imports
- **LÆ°u Ã½**:
  - KhÃ´ng xÃ³a import dùng trong JSX (React components)
  - KhÃ´ng xÃ³a import dùng trong type annotation
  - KhÃ´ng xÃ³a import dùng trong Next.js metadata/API routes

### BÆ°á»›c 4: Kiá»ƒm tra unused code

- **Kiá»ƒm tra**:
  - Unused variables/constants
  - Unused functions/components
  - Dead code (code khÃ´ng bao giá» Ä‘Æ°á»£c gá»i)
- **Xá»­ lÃ½**:
  - XÃ³a code khÃ´ng sử dụng (náº¿u cháº¯c cháº¯n)
  - Comment code náº¿u có thể cần sau nÃ y (và  thÃªm TODO)

### BÆ°á»›c 5: XÃ¡c minh lại

- Sau khi sá»­a:
  1. Cháº¡y lại `npm run lint`
  2. Cháº¡y lại `npm run build` (náº¿u có)
  3. Äáº£m báº£o khÃ´ng cÃ²n lỗi/warning
  4. Äáº£m báº£o khÃ´ng cÃ²n unused imports
  5. Kiá»ƒm tra code váº«n hoáº¡t Ä‘á»™ng Ä‘Ãºng (náº¿u có thể test nhanh)

## Thá»© tự Æ°u tiÃªn

```
1. Lá»—i Syntax (Errors)
   ←“
2. Lá»—i TypeScript (TS Errors)
   ←“
3. Warning nghiÃªm trá»ng từ ESLint (Critical Warnings)
   ←“
4. Warning khÃ¡c (Warnings)
   ←“
5. XÃ³a Unused Imports
   ←“
6. XÃ³a Unused Code
   ←“
7. XÃ¡c minh lại (Verification)
```

## Checklist sau khi chỉnh sá»­a file

- [ ] KhÃ´ng có lỗi syntax
- [ ] KhÃ´ng có lỗi TypeScript (TS errors)
- [ ] KhÃ´ng có warning nghiÃªm trá»ng từ ESLint
- [ ] ÄÃ£ xÃ³a táº¥t cáº£ unused imports
- [ ] ÄÃ£ xÃ³a unused code (náº¿u có)
- [ ] Code váº«n hoáº¡t Ä‘á»™ng Ä‘Ãºng (náº¿u có thể test)
- [ ] File Ä‘Ã£ Ä‘Æ°á»£c format Ä‘Ãºng chuẩn

## VÃ­ dá»¥ minh há»a

### TrÆ°á»›c khi sá»­a:

```typescript
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Unused import

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const router = useRouter(); // Warning: unused variable
  
  useEffect(() => {
    // fetch students
  }, []); // Warning: missing dependencies
  
  const unusedFunction = () => {
    // ...
  };
  
  return <div>Student List</div>;
}
```

### Sau khi sá»­a:

```typescript
import { useState, useEffect } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    // fetch students
    // ... logic
  }, []);
  
  return <div>Student List</div>;
}
```

## CÃ´ng cá»¥ há»— trá»£

- **IDE**: TypeScript Language Service, ESLint extension
- **Build tools**: `npm run build`, `next build`
- **Linter**: ESLint với Next.js rules (`next/core-web-vitals`)
- **Auto-fix**: IDE có thể tự xÃ³a má»™t sá»‘ unused imports, ESLint `--fix`

## LÆ°u Ã½ quan trá»ng

1. **KhÃ´ng bá» qua warning**: Má»™t sá»‘ warning có thể dáº«n Ä‘áº¿n lỗi runtime hoặc performance issues
2. **KhÃ´ng xÃ³a import vá»™i**: Kiá»ƒm tra ká»¹ trÆ°á»›c khi xÃ³a, Ä‘áº·c biá»‡t với React hooks
3. **React hooks rules**: TuÃ¢n thá»§ rules của hooks (khÃ´ng gá»i trong conditions, Ä‘Ãºng dependencies)
4. **Test sau khi sá»­a**: Äáº£m báº£o chá»©c nÄƒng váº«n hoáº¡t Ä‘á»™ng
5. **Commit riÃªng**: TÃ¡ch commit sá»­a lỗi và  commit xÃ³a unused imports để dễ review
6. **Next.js specific**: Má»™t sá»‘ import có thể Ä‘Æ°á»£c dùng trong metadata hoặc API routes

[←‘ Quay lại Overview](overview.md)

# Cáº¥u trÃºc code & đặt tÃªn
[← Quay lại Overview](overview.md)

## ThÆ° má»¥c/layer (dáº¡ng cÃ¢y)

- `src/`
  - `app/` (Next.js App Router, pages/routes)
    - `<route>/page.tsx` (route chÃ­nh)
    - `layout.tsx` (layout gá»‘c)
  - `components/` (UI theo domain: dashboard, auth, common, ...)
  - `lib/` (Utilities & services)
    - `api/` (API client, endpoints, service functions)
    - `hooks/` (Custom React hooks)
    - `utils/` (Helper functions)
  - `types/` (TypeScript types/interfaces)
  - `contexts/` (React context, náº¿u có)
  - `styles/` (Global styles, SCSS/CSS)

## Äáº·t tÃªn

- Component: PascalCase, file `.tsx`; hook `useX`, context `XContext`.
- Service: `*.service.ts`, class PascalCase hoặc function, export instance `xxxService` hoặc named export.
- Type/DTO: PascalCase, đặt trong `src/types`.
- Util: `*.util.ts`/`*.util.tsx`.
- Route: thÆ° má»¥c kebab-case trong `app/`, file `page.tsx`.

## Module má»›i (máº«u)

- ThÃªm route táº¡i `src/app/<feature>/page.tsx` (render component chÃ­nh).
- Táº¡o component chÃ­nh + component chi tiáº¿t náº¿u cần (trong `src/components/<feature>/`).
- Táº¡o service `<feature>.service.ts` gá»i API qua HTTP client với RESTful methods.
- Táº¡o type/DTO trong `src/types/<feature>.ts` (request/response).
- Wire và o layout náº¿u cần (nav/menu).

## VÃ­ dá»¥ chi tiáº¿t khi thÃªm mÃ n hÃ¬nh má»›i (và­ dá»¥: "quản lý há»c sinh")

- Route: tạo `src/app/students/page.tsx` để render trang danh sÃ¡ch/shell.
- Component:
  - `src/components/students/StudentList.tsx` (danh sÃ¡ch, gá»i service GET /api/v1/students).
  - `src/components/students/StudentDetail.tsx` (form thÃªm/sá»­a/chi tiáº¿t).
- Service:
  - `src/lib/api/student.service.ts` dùng HTTP client với methods GET/POST/PUT/DELETE cho `/api/v1/students`.
- Types/DTO:
  - `src/types/student.ts` khai bÃ¡o `Student`, `StudentSearch`, `StudentRequest`, `PageResponse<Student>`.
- Constants (náº¿u cần):
  - Bá»• sung API endpoints táº¡i `lib/api/endpoints.ts`.
- Layout/nav:
  - Cáº­p nháº­t menu/links (header/footer/nav) để trá» tá»›i route má»›i (náº¿u cần hiển thị trong UI).
- Styles:
  - ThÃªm SCSS cá»¥c bá»™ náº¿u cần (Æ°u tiÃªn tÃ¡i dùng class có sáºµn); import và o component hoặc page.

[←‘ Quay lại Overview](overview.md)

# Tá»•ng quan quy táº¯c chung - Next.js/TypeScript

TÃ i liá»‡u nÃ y thá»‘ng kÃª ngáº¯n gá»n cÃ¡c quy táº¯c báº¯t buá»™c cho frontend Next.js/TypeScript của há»‡ thá»‘ng Tutor (Admin Dashboard và  Parent Dashboard). Chi tiáº¿t từng máº£ng náº±m trong cÃ¡c file chuyÃªn Ä‘á» Ä‘Æ°á»£c liÃªn káº¿t bÃªn dÆ°á»›i.

## NguyÃªn táº¯c cá»‘t lÃµi

- Next.js 14+ với TypeScript strict mode; ESLint `next/core-web-vitals`.
- API báº¯t buá»™c dùng HTTP client (fetch/axios) và  dùng RESTful methods (GET/POST/PUT/DELETE) phÃ¹ há»£p với từng action.
- Token lấy từ cookie hoặc localStorage, header `Authorization: Bearer <token>`; response dùng `errorCode/errorDetail/data` thá»‘ng nháº¥t với backend.
- Format code tuÃ¢n thá»§ ESLint hiá»‡n hÃ nh; khuyến nghị Ã¡p dá»¥ng format/quote style Ä‘á»“ng nháº¥t (single quote, trailing comma chuẩn JS/TS).
- CSS/SCSS: trÃ¡nh lá»“ng sÃ¢u, Æ°u tiÃªn tÃ¡i dùng class/biáº¿n sáºµn có; khÃ´ng mÃ´ táº£ BEM báº¯t buá»™c.
- Service layer chỉ trả ResponseObject, kiểm tra HTTP status và  errorCode; Component layer xử lý ResponseObject với errorCode/errorDetail.

## Response Format

### ResponseObject Structure

Tất cả API trả vá» `ResponseObject<T>` với cấu trúc:

```typescript
// Success Response
ResponseObject<T> {
    errorCode: "0000",        // Optional - mã thÃ nh cÃ´ng
    errorDetail: "Operation successful",  // Optional - mÃ´ táº£ thÃ nh cÃ´ng
    data: T                   // Dá»¯ liá»‡u trả vá»
}
// HTTP 200

// Error Response
ResponseObject<?> {
    errorCode: "0001",        // Báº¯t buá»™c - mã lỗi từ "0001" Ä‘áº¿n "9999"
    errorDetail: "MÃ´ táº£ mã lỗi",  // Báº¯t buá»™c - mÃ´ táº£ chÃ­nh xÃ¡c mã lỗi
    data: T | null            // Optional - có thể null hoặc chá»©a thÃ´ng tin bá»• sung
}
// HTTP 401/400/403/404/500
```

### Error Code Convention

- **"0000"**: ThÃ nh cÃ´ng (optional trong success response)
- **"0001" - "0999"**: Lá»—i nghiệp vụ (Business errors)
- **"1000" - "1999"**: Lá»—i xÃ¡c thá»±c và  phÃ¢n quyá»n (Authentication & Authorization)
- **"2000" - "2999"**: Lá»—i validation (Validation errors)
- **"3000" - "3999"**: Lá»—i tÃ i nguyÃªn (Resource errors - not found, conflict, etc.)
- **"4000" - "4999"**: Lá»—i tÃ­ch há»£p dá»‹ch vá»¥ (Service integration errors)
- **"5000" - "5999"**: Lá»—i há»‡ thá»‘ng (System errors)
- **"6000" - "9999"**: Reserved cho tÆ°Æ¡ng lai

### HTTP Status Codes

- HTTP 200: Success (errorCode "0000" hoặc khÃ´ng có)
- HTTP 400: Bad Request (errorCode 2xxx - validation errors)
- HTTP 401: Unauthorized (errorCode 1xxx - authentication errors)
- HTTP 403: Forbidden (errorCode 1xxx - authorization errors)
- HTTP 404: Not Found (errorCode 3xxx - resource not found)
- HTTP 500: Internal Server Error (errorCode 5xxx - system errors)

## Má»¥c chi tiáº¿t

- [`code-structure.md` - Cáº¥u trÃºc code & đặt tÃªn](code-structure.md)
- [`api-consumption.md` - Gá»i API với HTTP client](api-consumption.md)
- [`state-management.md` - State, utilities, form](state-management.md)
- [`style-format-lint.md` - Style, format & lint](style-format-lint.md)
- [`ui-components.md` - UI Components Conventions (ActionsDropdown)](ui-components.md)
- [`code-quality.md` - Kiá»ƒm tra cháº¥t lÆ°á»£ng code & lÃ m sáº¡ch](code-quality.md)
- [`security-auth.md` - Auth & báº£o máº­t](security-auth.md)

## Pháº¡m vi Ã¡p dá»¥ng

- ToÃ n bá»™ frontend Next.js: `tutor-admin-dashboard` và  `tutor-parent-dashboard`
- CÃ¡c route/component/service trong `src/`.

## NgoÃ i pháº¡m vi

- Quy táº¯c backend (Java, Python có tÃ i liá»‡u riÃªng).
- Quy táº¯c mobile app (Flutter có tÃ i liá»‡u riÃªng).

# Báº£o máº­t & Auth
[← Quay lại Overview](overview.md)

## Token & storage

- Token lÆ°u táº¡i localStorage hoặc sessionStorage (khuyến nghị sessionStorage cho accessToken).
- `apiClient` tự gáº¯n Bearer token náº¿u token tồn tại.
- Refresh token: lÆ°u táº¡i localStorage hoặc httpOnly cookie (náº¿u backend há»— trá»£).

### Token Storage Pattern

```typescript
// src/lib/utils/auth.ts
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('accessToken');
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
```

## Redirect & middleware

- Middleware hiá»‡n chỉ pass-through; auth/redirect xử lý client-side (layout/component).
- Khi thiáº¿u token hoặc `errorCode` khÃ´ng thÃ nh cÃ´ng (401/403), component quyáº¿t Ä‘á»‹nh toast + Ä‘iá»u hÆ°á»›ng login.
- Protected routes: sử dụng middleware hoặc component-level check.

### Protected Route Pattern

```typescript
// src/app/dashboard/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

## Quy táº¯c

- KhÃ´ng log token/nháº¡y cáº£m.
- Dùng HTTPS trÃªn mÃ´i trÆ°á»ng triá»ƒn khai.
- `clearTokens` để sign-out an toÃ n.
- Xá»­ lÃ½ token refresh tự Ä‘á»™ng trong API client interceptor.

[←‘ Quay lại Overview](overview.md)

# State, utilities & form
[← Quay lại Overview](overview.md)

## State/Context

- Sá»­ dá»¥ng React hooks/state ná»™i bá»™ hoặc Context (vd. `AuthContext`, `ThemeContext`) khi cần chia sáº» dá»¯ liá»‡u.
- Khi dùng effect async, cleanup subscription/timeouts; trÃ¡nh memory leak.
- Sá»­ dá»¥ng `useState`, `useEffect`, `useCallback`, `useMemo` há»£p lÃ½ để tá»‘i Æ°u performance.

### VÃ­ dá»¥ Context

```typescript
// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAccessToken, setTokens, clearTokens } from '@/lib/utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    setTokens(accessToken, refreshToken);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearTokens();
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

## Form & validation

- CÃ³ thể dùng React Hook Form + Zod (khuyến nghị) hoặc form controlled thuáº§n React.
- Hiá»ƒn thá»‹ lỗi từ `errorDetail` khi call API; toast táº¡i UI layer.
- Validation á»Ÿ client-side với Zod schema, sau Ä‘Ã³ gá»­i lÃªn server.

### VÃ­ dá»¥ Form với React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const studentSchema = z.object({
  username: z.string().min(3).max(50),
  grade: z.number().min(6).max(7),
});

type StudentFormData = z.infer<typeof studentSchema>;

export function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      const response = await studentService.create(data);
      if (response.errorCode === '0000') {
        toast.success('Táº¡o há»c sinh thÃ nh cÃ´ng!');
      } else {
        toast.error(response.errorDetail);
      }
    } catch (error) {
      toast.error('Há»‡ thá»‘ng khÃ´ng có pháº£n há»“i.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Utilities

- Cookie: `cookie.util.ts` (get/set/remove, clearAuthCookies).
- Date/number/image utils: dùng sáºµn trong `src/lib/utils/`.
- Toast: `toast.util.tsx` (react-hot-toast, có hÃ m warning).
- API helpers: chỉ dùng HTTP client cho call backend.

### VÃ­ dá»¥ Utility Functions

```typescript
// src/lib/utils/auth.ts
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
```

## Custom Hooks

Táº¡o custom hooks để tÃ¡i sử dụng logic:

```typescript
// src/lib/hooks/useStudents.ts
import { useState, useEffect } from 'react';
import { studentService } from '@/lib/api/student.service';
import { Student } from '@/types/student';

export function useStudents(searchParams?: StudentSearch) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await studentService.getList(searchParams);
        if (response.errorCode === '0000') {
          setStudents(response.data || []);
        } else {
          setError(response.errorDetail);
        }
      } catch (err) {
        setError('Há»‡ thá»‘ng khÃ´ng có pháº£n há»“i.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [searchParams]);

  return { students, loading, error };
}
```

[←‘ Quay lại Overview](overview.md)

# Style, format & lint
[← Quay lại Overview](overview.md)

## Lint

- ESLint `next/core-web-vitals`; TypeScript strict mode.
- Khuyáº¿n nghá»‹ giá»¯ warning sáº¡ch trÆ°á»›c khi commit.

## Format & quote

- TuÃ¢n thá»§ style JS/TS hiá»‡n hÃ nh: Æ°u tiÃªn single quote, trailing comma chuẩn JS/TS, indent consistent (2 spaces).
- CÃ³ thể dùng Prettier ná»™i bá»™, miá»…n khÃ´ng xung Ä‘á»™t quy táº¯c ESLint (giá»¯ core-web-vitals).

### Prettier Configuration (Recommended)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## CSS/SCSS

- Æ¯u tiÃªn tÃ¡i dùng class/biáº¿n có sáºµn (Tailwind CSS classes, SCSS variables), trÃ¡nh lá»“ng selector sÃ¢u, háº¡n cháº¿ thÃªm CSS thá»«a.
- KhÃ´ng yÃªu cáº§u BEM báº¯t buá»™c; trÃ¡nh override máº¡nh và o vendor trá»« khi cần.
- Sá»­ dá»¥ng Tailwind CSS utility classes khi có thể.

### Tailwind CSS Usage

```tsx
// ✓ Good: Sá»­ dá»¥ng Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800">Students</h2>
</div>

// ✗Œ Avoid: Inline styles hoặc custom CSS khÃ´ng cần thiáº¿t
<div style={{ display: 'flex', padding: '16px' }}>
  <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Students</h2>
</div>
```

[←‘ Quay lại Overview](overview.md)

# UI Components Conventions
[← Quay lại Overview](overview.md)

## Actions Column & ActionsDropdown

### Tá»•ng quan

Tất cả cÃ¡c mÃ n hÃ¬nh có cá»™t **Actions** (Thao tÃ¡c) pháº£i sử dụng component `ActionsDropdown` để hiển thị cÃ¡c hÃ nh Ä‘á»™ng dÆ°á»›i dáº¡ng dropdown menu. Component nÃ y đảm bảo tÃ­nh nháº¥t quÃ¡n vá» UI/UX và  styling across toÃ n bá»™ á»©ng dá»¥ng.

### Component Location

- **Path**: `src/components/common/ActionsDropdown.tsx`
- **Type Definition**: `src/types/common.ts` - Interface `ActionItem`

### Cáº¥u trÃºc ActionItem

```typescript
interface ActionItem {
  id: string;                    // Unique identifier cho action
  label: string;                 // Text hiển thị cho action
  type: 'success' | 'warning' | 'danger' | 'info';  // Loáº¡i action (quyáº¿t Ä‘á»‹nh mÃ u sáº¯c)
  icon?: ReactNode;              // Icon tÃ¹y chá»n (optional)
  onClick: () => void;           // Callback khi click và o action
  disabled?: boolean;             // Tráº¡ng thÃ¡i disabled (optional)
}
```

### Action Types & MÃ u sáº¯c

Má»—i action type có mÃ u sáº¯c riÃªng để ngÆ°á»i dùng dễ nháº­n biáº¿t:

- **`success`**: MÃ u xanh lÃ¡ (green) - Dùng cho cÃ¡c hÃ nh Ä‘á»™ng tÃ­ch cá»±c nhÆ° "KÃ­ch hoáº¡t", "XÃ¡c nháº­n"
- **`warning`**: MÃ u và ng (yellow) - Dùng cho cÃ¡c hÃ nh Ä‘á»™ng cáº£nh bÃ¡o nhÆ° "Táº¡m dá»«ng", "Ngá»«ng hoáº¡t Ä‘á»™ng"
- **`danger`**: MÃ u Ä‘á» (red) - Dùng cho cÃ¡c hÃ nh Ä‘á»™ng nguy hiá»ƒm nhÆ° "XÃ³a", "VÃ´ hiá»‡u hÃ³a"
- **`info`**: MÃ u xanh dÆ°Æ¡ng (blue) - Dùng cho cÃ¡c hÃ nh Ä‘á»™ng thÃ´ng tin nhÆ° "Xem chi tiáº¿t", "Xem thÃªm"

### Animation & Styling

- **Animated Color Bar**: Má»—i action item có má»™t dáº£i mÃ u á»Ÿ phÃ­a dÆ°á»›i (height: 0.5, `h-0.5`)
- **Hover Animation**: Khi hover và o action item, dáº£i mÃ u sáº½ chuyá»ƒn Ä‘á»™ng từ trÃ¡i sang pháº£i (từ `w-0` sang `w-full`)
- **Animation Duration**: 500ms (`duration-500`) với easing `ease-in-out`
- **Color Bar Position**: `absolute bottom-0 left-0`

### CÃ¡ch sử dụng

#### 1. Import Component

```tsx
import ActionsDropdown from '@/components/common/ActionsDropdown';
import { ActionItem } from '@/types/common';
```

#### 2. Äá»‹nh nghÄ©a Actions

```tsx
const getActions = (item: YourItemType): ActionItem[] => {
  const actions: ActionItem[] = [
    {
      id: 'view',
      label: 'Xem chi tiáº¿t',
      type: 'info',
      icon: <EyeIcon />,
      onClick: () => handleViewDetail(item),
    },
    {
      id: 'edit',
      label: 'Chá»‰nh sá»­a',
      type: 'warning',
      icon: <EditIcon />,
      onClick: () => handleEdit(item),
      disabled: !canEdit, // Optional: disable náº¿u khÃ´ng có quyá»n
    },
    {
      id: 'delete',
      label: 'XÃ³a',
      type: 'danger',
      icon: <TrashIcon />,
      onClick: () => handleDelete(item),
    },
  ];

  // CÃ³ thể thÃªm logic Ä‘iá»u kiá»‡n
  if (item.status === 'ACTIVE') {
    actions.push({
      id: 'deactivate',
      label: 'Ngá»«ng hoáº¡t Ä‘á»™ng',
      type: 'warning',
      onClick: () => handleDeactivate(item),
    });
  }

  return actions;
};
```

#### 3. Sá»­ dá»¥ng trong Table

```tsx
<TableCell className="px-4 py-3 text-start">
  <ActionsDropdown actions={getActions(item)} />
</TableCell>
```

#### 4. Custom Trigger Button (Optional)

Nếu muá»‘n custom trigger button:

```tsx
<ActionsDropdown
  actions={getActions(item)}
  trigger={
    <button className="custom-button">
      <MoreIcon />
    </button>
  }
/>
```

### VÃ­ dá»¥ thá»±c táº¿

#### Admin Management

```tsx
const getActions = (admin: Admin): ActionItem[] => {
  const actions: ActionItem[] = [
    {
      id: 'view',
      label: 'Xem chi tiáº¿t',
      type: 'info',
      icon: <EyeIcon />,
      onClick: () => onViewDetail?.(admin),
    },
  ];

  if (admin.status === 'ACTIVE') {
    actions.push({
      id: 'deactivate',
      label: 'VÃ´ hiá»‡u hÃ³a',
      type: 'danger',
      onClick: () => handleStatusChange(admin, 'INACTIVE'),
      disabled: updatingId === admin.id,
    });
  } else if (admin.status === 'INACTIVE') {
    actions.push({
      id: 'activate',
      label: 'KÃ­ch hoáº¡t',
      type: 'success',
      onClick: () => handleStatusChange(admin, 'ACTIVE'),
      disabled: updatingId === admin.id,
    });
  }

  return actions;
};
```

#### Skills Management

```tsx
const getActions = (skill: Skill): ActionItem[] => {
  return [
    {
      id: 'view',
      label: 'Xem chi tiáº¿t',
      type: 'info',
      icon: <EyeIcon />,
      onClick: () => handleViewDetail(skill),
    },
    {
      id: 'edit',
      label: 'Chá»‰nh sá»­a',
      type: 'warning',
      icon: <EditIcon />,
      onClick: () => handleEdit(skill),
      disabled: true, // Disabled trong Phase 1
    },
    {
      id: 'view-questions',
      label: 'Xem cÃ¢u há»i liÃªn quan',
      type: 'info',
      icon: <QuestionMarkCircleIcon />,
      onClick: () => handleViewRelatedQuestions(skill),
    },
  ];
};
```

### Best Practices

1. **Consistent Action Types**: LuÃ´n sử dụng Ä‘Ãºng action type phÃ¹ há»£p với hÃ nh Ä‘á»™ng:
   - `success` cho cÃ¡c hÃ nh Ä‘á»™ng tÃ­ch cá»±c
   - `danger` cho cÃ¡c hÃ nh Ä‘á»™ng xÃ³a/và´ hiá»‡u hÃ³a
   - `warning` cho cÃ¡c hÃ nh Ä‘á»™ng cáº£nh bÃ¡o
   - `info` cho cÃ¡c hÃ nh Ä‘á»™ng xem/thÃ´ng tin

2. **Icon Usage**: NÃªn sử dụng icon cho má»—i action để tÄƒng tÃ­nh trá»±c quan

3. **Disabled State**: Sá»­ dá»¥ng `disabled` prop khi action khÃ´ng thể thá»±c hiá»‡n (và­ dá»¥: Ä‘ang loading, khÃ´ng có quyá»n)

4. **Conditional Actions**: ThÃªm/xÃ³a actions dá»±a trÃªn tráº¡ng thÃ¡i hoặc quyá»n của item

5. **Error Handling**: Äáº£m báº£o `onClick` handler có error handling phÃ¹ há»£p

6. **Accessibility**: Component Ä‘Ã£ Ä‘Æ°á»£c thiáº¿t káº¿ với accessibility in mind (keyboard navigation, ARIA attributes)

### Dark Mode Support

Component tự Ä‘á»™ng há»— trá»£ dark mode thÃ´ng qua Tailwind CSS dark mode classes. KhÃ´ng cần thÃªm styling riÃªng.

### Testing

Khi test component ActionsDropdown:

1. Test dropdown má»Ÿ/Ä‘Ã³ng khi click và o trigger
2. Test animation của color bar khi hover
3. Test disabled state
4. Test click outside để Ä‘Ã³ng dropdown
5. Test keyboard navigation (náº¿u có)

[←‘ Quay lại Overview](overview.md)




