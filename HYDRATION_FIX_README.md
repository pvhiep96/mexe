# Sửa lỗi Hydration Failed trong Next.js

## 🚨 Vấn đề gặp phải

```
Hydration failed because the server rendered HTML didn't match the client. 
As a result this tree will be regenerated on the client. 
This can happen if a SSR-ed Client Component used:
```

## 🔍 Nguyên nhân

Lỗi hydration xảy ra khi có sự khác biệt giữa:

1. **Server-Side Rendering (SSR)**: HTML được render từ server
2. **Client-Side Hydration**: Component được render lại trên client

### Các nguyên nhân chính:

- **Authentication State**: `isAuthenticated` và `user` có thể khác nhau giữa server và client
- **Local Storage**: Server không có access vào `localStorage`, client có
- **Conditional Rendering**: Logic render khác nhau giữa server và client
- **Dynamic Content**: Content thay đổi sau khi component mount

## 🛠️ Giải pháp đã thực hiện

### 1. **Cải thiện AuthContext**

```typescript
// src/context/AuthContext.tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Thêm state này

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize authentication state on mount
  useEffect(() => {
    if (!isClient) return; // Chỉ chạy trên client side
    
    initializeAuth();
  }, [isClient]);

  // ... rest of the code
}
```

### 2. **Tạo ClientOnly Component**

```typescript
// src/components/ClientOnly.tsx
'use client';
import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

### 3. **Cải thiện AccountPage**

```typescript
// src/app/[locale]/account/page.tsx
export default function AccountPage() {
  const { user, isAuthenticated, login, register, logout, isLoading } = useAuth();

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Conditional Rendering với null check */}
      {isAuthenticated && user ? (
        <AuthenticatedView user={user} onLogout={handleLogout} />
      ) : (
        <UnauthenticatedView onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  );
}
```

## ✅ Các thay đổi chính

### **AuthContext.tsx**
- ✅ Thêm `isClient` state để track client-side hydration
- ✅ Chỉ initialize authentication sau khi client đã sẵn sàng
- ✅ Tránh gọi localStorage trên server

### **AccountPage.tsx**
- ✅ Thêm null check: `isAuthenticated && user`
- ✅ Loading state rõ ràng
- ✅ Conditional rendering an toàn

### **ClientOnly.tsx**
- ✅ Component wrapper để tránh hydration mismatch
- ✅ Fallback UI cho server-side rendering
- ✅ Chỉ render children sau khi client sẵn sàng

## 🚀 Cách sử dụng

### **1. Sử dụng ClientOnly cho dynamic content:**

```typescript
import ClientOnly from '@/components/ClientOnly';

<ClientOnly fallback={<LoadingSpinner />}>
  <DynamicComponent />
</ClientOnly>
```

### **2. Kiểm tra null trong conditional rendering:**

```typescript
// ✅ Đúng - kiểm tra cả state và data
{isAuthenticated && user ? (
  <AuthenticatedView user={user} />
) : (
  <UnauthenticatedView />
)}

// ❌ Sai - chỉ kiểm tra state
{isAuthenticated ? (
  <AuthenticatedView user={user} /> // user có thể null
) : (
  <UnauthenticatedView />
)}
```

### **3. Sử dụng loading state:**

```typescript
if (isLoading) {
  return <LoadingSpinner />;
}

// Chỉ render content sau khi loading hoàn tất
```

## 🔍 Debug Hydration Issues

### **1. Kiểm tra Console:**
- Xem có warning về hydration không
- Kiểm tra state values giữa server và client

### **2. Sử dụng React DevTools:**
- Kiểm tra component state
- So sánh props giữa server và client

### **3. Kiểm tra Network:**
- Xem API calls có timing issues không
- Kiểm tra authentication state

## 📝 Best Practices

### **✅ Nên làm:**
- Sử dụng `useEffect` để client-side logic
- Kiểm tra null trước khi render
- Sử dụng loading states
- Wrap dynamic content trong `ClientOnly`

### **❌ Không nên làm:**
- Truy cập `localStorage` trực tiếp trong render
- Conditional rendering phức tạp không có null check
- State updates trong render function
- Async operations trong render

## 🎯 Kết quả mong đợi

Sau khi áp dụng các fix:
- ✅ Không còn lỗi hydration
- ✅ Server và client render giống nhau
- ✅ Authentication state ổn định
- ✅ User experience mượt mà
- ✅ Không có warning trong console

## 🔧 Troubleshooting

Nếu vẫn có vấn đề:

1. **Kiểm tra console** để xem lỗi cụ thể
2. **Sử dụng React DevTools** để debug state
3. **Kiểm tra timing** của API calls
4. **Verify authentication flow** hoạt động đúng
5. **Test trên different browsers** để đảm bảo consistency
