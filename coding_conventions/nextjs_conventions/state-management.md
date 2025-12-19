# State, utilities & form
[← Quay lại Overview](overview.md)

## State/Context

- Sử dụng React hooks/state nội bộ hoặc Context (vd. `AuthContext`, `ThemeContext`) khi cần chia sẻ dữ liệu.
- Khi dùng effect async, cleanup subscription/timeouts; tránh memory leak.
- Sử dụng `useState`, `useEffect`, `useCallback`, `useMemo` hợp lý để tối ưu performance.

### Ví dụ Context

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

- Có thể dùng React Hook Form + Zod (khuyến nghị) hoặc form controlled thuần React.
- Hiển thị lỗi từ `errorDetail` khi call API; toast tại UI layer.
- Validation ở client-side với Zod schema, sau đó gửi lên server.

### Ví dụ Form với React Hook Form + Zod

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
        toast.success('Tạo học sinh thành công!');
      } else {
        toast.error(response.errorDetail);
      }
    } catch (error) {
      toast.error('Hệ thống không có phản hồi.');
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
- Date/number/image utils: dùng sẵn trong `src/lib/utils/`.
- Toast: `toast.util.tsx` (react-hot-toast, có hàm warning).
- API helpers: chỉ dùng HTTP client cho call backend.

### Ví dụ Utility Functions

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

Tạo custom hooks để tái sử dụng logic:

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
        setError('Hệ thống không có phản hồi.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [searchParams]);

  return { students, loading, error };
}
```

[↑ Quay lại Overview](overview.md)
