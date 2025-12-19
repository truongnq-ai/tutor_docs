# Gọi API & HTTP Client (RESTful)
[← Quay lại Overview](overview.md)

## Chuẩn chung

- Dùng HTTP client (fetch hoặc axios) làm client; khuyến nghị dùng axios cho dễ quản lý interceptors.
- Tất cả API dùng phương thức RESTful (GET/POST/PUT/DELETE), path chuẩn `/api/v1/<resource>`.
- Base URL: `NEXT_PUBLIC_API_URL` trong `.env.local` hoặc config.
- Header: `Content-Type: application/json; charset=utf-8`, `Authorization: Bearer <token>` lấy từ cookie hoặc localStorage.
- Response chuẩn: `errorCode/errorDetail/data` (theo backend).

## Pattern Service Layer

**Service chỉ gọi API và trả về ResponseObject, kiểm tra HTTP status và errorCode, KHÔNG throw Error cho business errors.**

```typescript
// ✅ ĐÚNG: Service trả về ResponseObject, kiểm tra HTTP status
async getList(param: Partial<StudentSearch>): Promise<ResponseObject<Student[]>> {
  const response = await apiClient.get<ResponseObject<Student[]>>(
    '/api/v1/students',
    { params: param }
  );
  
  // Kiểm tra HTTP status
  if (response.status === 200 && response.data.errorCode === '0000') {
    return response.data;
  }
  
  // Trả về error response
  return {
    errorCode: response.data.errorCode || '5001',
    errorDetail: response.data.errorDetail || 'Unknown error',
    data: null
  };
}

// ❌ SAI: Service throw Error
async getList(param: Partial<StudentSearch>): Promise<Student[]> {
  const response = await apiClient.get<ResponseObject<Student[]>>(...);
  if (response.data.errorCode !== '0000') {
    throw new Error(response.data.errorDetail);
  }
  return response.data.data || [];
}
```

## Pattern Component Layer

**Component tự kiểm tra errorCode và xử lý:**
- Nếu `errorCode === "0000"` → xử lý `data`, có thể hiển thị success message
- Nếu không `"0000"` → hiển thị `errorDetail` từ backend
- Nếu có lỗi mạng/exception → catch block hiển thị 'Hệ thống không có phản hồi.'

```typescript
// Component xử lý errorCode
try {
  const response = await studentService.getList(searchParams);
  
  if (response.errorCode === '0000') {
    // Xử lý response.data
    const students = response.data || [];
    setStudents(students);
    toast.success('Lấy danh sách học sinh thành công!');
  } else {
    // Hiển thị errorDetail từ backend
    toast.error(response.errorDetail || 'Có lỗi xảy ra. Vui lòng thử lại.');
  }
} catch (error: any) {
  // Lỗi mạng/exception
  console.error('Error fetching students:', error);
  toast.error('Hệ thống không có phản hồi.');
}
```

## Error Code Constants

Tạo file `src/lib/constants/error-codes.ts` để quản lý error codes:

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

// Response interceptor: Handle 401 → refresh token
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
          // Refresh failed → logout
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

## Xử lý lỗi & toast

- **Service**: Gọi API, trả về `Promise<ResponseObject<T>>`, kiểm tra HTTP status và errorCode.
- **Component**: Tự kiểm tra `errorCode`, xử lý `data` và hiển thị toast tương ứng.
- Dùng `react-hot-toast` hoặc tương tự tại component để hiển thị thông báo.
- Không log dữ liệu nhạy cảm; `console.error` chỉ phục vụ debug.

## Quy ước path

- Giữ đúng chuẩn backend: `/api/v1/<resource>` và dùng RESTful methods.
- Ví dụ:
  - `GET /api/v1/students` - Danh sách học sinh
  - `GET /api/v1/students/{id}` - Chi tiết học sinh
  - `POST /api/v1/students` - Tạo mới học sinh
  - `PUT /api/v1/students/{id}` - Cập nhật học sinh
  - `DELETE /api/v1/students/{id}` - Xóa học sinh

## Error Handling Helper

Tạo helper function để xử lý error codes:

```typescript
// src/lib/utils/error-handler.ts
import { ERROR_CODES } from '@/lib/constants/error-codes';
import { ResponseObject } from '@/types/api';

export function handleApiError(response: ResponseObject<any>): string {
  const { errorCode, errorDetail } = response;
  
  switch (errorCode) {
    case ERROR_CODES.UNAUTHORIZED:
      return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
    case ERROR_CODES.FORBIDDEN:
      return 'Bạn không có quyền thực hiện thao tác này.';
    case ERROR_CODES.NOT_FOUND:
      return 'Không tìm thấy dữ liệu.';
    case ERROR_CODES.VALIDATION_ERROR:
      return errorDetail || 'Dữ liệu không hợp lệ.';
    default:
      return errorDetail || 'Có lỗi xảy ra. Vui lòng thử lại.';
  }
}
```

[↑ Quay lại Overview](overview.md)
