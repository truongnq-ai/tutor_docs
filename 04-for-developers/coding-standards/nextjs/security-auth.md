# Bảo mật & Auth
[← Quay lại Overview](README.md)

## Token & storage

- Token lưu tại localStorage hoặc sessionStorage (khuyến nghị sessionStorage cho accessToken).
- `apiClient` tự gắn Bearer token nếu token tồn tại.
- Refresh token: lưu tại localStorage hoặc httpOnly cookie (nếu backend hỗ trợ).

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

- Middleware hiện chỉ pass-through; auth/redirect xử lý client-side (layout/component).
- Khi thiếu token hoặc `errorCode` không thành công (401/403), component quyết định toast + điều hướng login.
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

## Quy tắc

- Không log token/nhạy cảm.
- Dùng HTTPS trên môi trường triển khai.
- `clearTokens` để sign-out an toàn.
- Xử lý token refresh tự động trong API client interceptor.

[← Quay lại Overview](README.md)

