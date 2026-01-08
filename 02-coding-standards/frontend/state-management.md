# State Management - Next.js/React

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả patterns cho state management trong Next.js/React frontend của hệ thống Tutor. Dự án sử dụng kết hợp React Context API, TanStack Query (React Query), và custom hooks để quản lý state.

## Nguyên tắc

- **Separation of Concerns**: Tách biệt UI state, server state, và global state
- **Dependency Injection**: Sử dụng Context API cho dependency injection
- **Server State**: Sử dụng TanStack Query cho data fetching và caching
- **UI State**: Sử dụng React hooks (useState, useReducer) cho local state
- **Global State**: Sử dụng Context API cho theme, auth, sidebar state

## React Context API

### Context Providers

Sử dụng Context API cho global state và dependency injection:

```typescript
// src/context/ThemeContext.tsx
'use client';

import { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### Authentication Context

```typescript
// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login, logout as logoutService } from '@/lib/api/auth.service';
import { ResponseObject } from '@/types/common';
import { AuthenticationResponse } from '@/types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { sub?: string } | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ sub?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogin = useCallback(async (username: string, password: string) => {
    try {
      setLoading(true);
      const response: ResponseObject<AuthenticationResponse> = await login(username, password);
      
      if (response.errorCode === '0000') {
        setIsAuthenticated(true);
        router.push('/dashboard');
      } else {
        throw new Error(response.errorDetail || 'Login failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login: handleLogin, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## TanStack Query (React Query)

### Setup

```typescript
// src/components/providers/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

### Using Queries

```typescript
// src/lib/hooks/useExercises.ts
import { useQuery } from '@tanstack/react-query';
import { getExercises } from '@/lib/api/exercise.service';
import { PageRequest, PageResponse } from '@/types/common';
import { ExerciseListItem } from '@/types/exercise';

export function useExercises(pageRequest: PageRequest) {
  return useQuery({
    queryKey: ['exercises', pageRequest],
    queryFn: () => getExercises(pageRequest),
    select: (response) => response.data,
  });
}
```

## Custom Hooks

### Data Fetching Hooks

Tạo custom hooks cho data fetching với error handling:

```typescript
// src/lib/hooks/useExercises.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Exercise, ExerciseListItem, ExercisePageRequest } from '@/types/exercise';
import { PageResponse, PageRequest } from '@/types/common';
import { getExercises, getExerciseById } from '@/lib/api/exercise.service';

export function useExercises(pageRequest: PageRequest & { dataRequest?: ExercisePageRequest }) {
  const [data, setData] = useState<PageResponse<ExerciseListItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const memoizedPageRequest = useMemo(
    () => ({ ...pageRequest }),
    [
      pageRequest.page,
      pageRequest.pageSize,
      pageRequest.sort ? JSON.stringify(pageRequest.sort) : '',
      pageRequest.dataRequest ? JSON.stringify(pageRequest.dataRequest) : '{}',
    ]
  );

  const fetchExercises = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getExercises(memoizedPageRequest);
      if (response.data) {
        setData(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch exercises'));
    } finally {
      setLoading(false);
    }
  }, [memoizedPageRequest]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return {
    data,
    loading,
    error,
    refetch: fetchExercises,
  };
}

export function useExercise(id: string | null) {
  const [data, setData] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchExercise = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getExerciseById(id);
        if (response.data) {
          setData(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch exercise'));
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  return {
    data,
    loading,
    error,
  };
}
```

### Using Hooks in Components

```typescript
// src/app/(admin)/exercises/page.tsx
'use client';

import { useExercises } from '@/lib/hooks/useExercises';
import { useState } from 'react';
import LoadingState from '@/components/common/LoadingState';

export default function ExercisesPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  const { data, loading, error, refetch } = useExercises({
    page,
    pageSize,
    sort: [{ field: 'createdAt', direction: 'DESC' }],
  });

  if (loading) {
    return <LoadingState message="Đang tải danh sách bài tập..." />;
  }

  if (error) {
    return <div>Lỗi: {error.message}</div>;
  }

  return (
    <div>
      {/* Render exercises list */}
    </div>
  );
}
```

## State Management Patterns

### Local State (useState)

Sử dụng `useState` cho component-local state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<string | null>(null);
```

### Complex Local State (useReducer)

Sử dụng `useReducer` cho complex state logic:

```typescript
type State = {
  items: string[];
  selectedIndex: number | null;
  loading: boolean;
};

type Action =
  | { type: 'SET_ITEMS'; payload: string[] }
  | { type: 'SELECT_ITEM'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SELECT_ITEM':
      return { ...state, selectedIndex: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, {
  items: [],
  selectedIndex: null,
  loading: false,
});
```

### Memoization (useMemo, useCallback)

Sử dụng `useMemo` và `useCallback` để optimize performance:

```typescript
const filteredItems = useMemo(() => {
  return items.filter(item => item.name.includes(searchTerm));
}, [items, searchTerm]);

const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

## Best Practices

1. **Context API**: Chỉ dùng cho global state (theme, auth, sidebar)
2. **TanStack Query**: Dùng cho server state (data fetching, caching)
3. **Custom Hooks**: Tạo hooks để reuse logic giữa components
4. **Error Handling**: Luôn handle errors trong hooks và components
5. **Loading States**: Luôn hiển thị loading state khi fetch data
6. **Type Safety**: Sử dụng TypeScript types cho tất cả state

## Tài liệu liên quan

- [General Principles](../general-principles.md) - Nguyên tắc chung
- [UI/UX Guidelines](./ui-ux-guidelines.md) - UI/UX rules

---

← Quay lại: [README.md](../README.md)
