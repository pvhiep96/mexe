# Frontend API Setup Guide

## Cấu hình môi trường

Để frontend có thể gọi API từ backend Rails, bạn cần tạo file `.env.local` trong thư mục `mexe` với nội dung:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Development settings
NODE_ENV=development
```

## Các components đã được cập nhật

### 1. NewProducts.tsx
- ✅ Sử dụng `useNewProducts()` hook để lấy dữ liệu từ API
- ✅ Hiển thị loading state khi đang tải
- ✅ Hiển thị error state khi có lỗi
- ✅ Fallback data khi API chưa sẵn sàng
- ✅ Giữ nguyên giao diện hiện tại

### 2. Brands.tsx
- ✅ Sử dụng `useBrands()` hook để lấy dữ liệu từ API
- ✅ Hiển thị loading state khi đang tải
- ✅ Hiển thị error state khi có lỗi
- ✅ Fallback data khi API chưa sẵn sàng
- ✅ Giữ nguyên giao diện hiện tại

### 3. NewsList.tsx
- ✅ Sử dụng `useNews()` hook để lấy dữ liệu từ API
- ✅ Hiển thị loading state khi đang tải
- ✅ Hiển thị error state khi có lỗi
- ✅ Fallback data khi API chưa sẵn sàng
- ✅ Giữ nguyên giao diện hiện tại

## Các services và hooks đã tạo

### 1. API Service (`src/services/api.ts`)
- Định nghĩa tất cả các API endpoints
- Xử lý request/response format chuẩn
- TypeScript interfaces cho tất cả data types

### 2. Custom Hooks (`src/hooks/useApi.ts`)
- `useHomeData()` - Lấy dữ liệu trang chủ
- `useProducts()` - Lấy danh sách sản phẩm
- `useNewProducts()` - Lấy sản phẩm mới
- `useFeaturedProducts()` - Lấy sản phẩm nổi bật
- `useHotProducts()` - Lấy sản phẩm hot
- `useCategories()` - Lấy danh mục
- `useBrands()` - Lấy thương hiệu
- `useNews()` - Lấy tin tức
- `useSearch()` - Tìm kiếm

### 3. Loading Component (`src/components/Loading.tsx`)
- Component loading spinner chuẩn
- Hỗ trợ nhiều kích thước
- Có thể hiển thị text tùy chỉnh

## Cách hoạt động

1. **Khi component mount**: Hook sẽ gọi API để lấy dữ liệu
2. **Loading state**: Hiển thị spinner loading
3. **Success state**: Hiển thị dữ liệu từ API
4. **Error state**: Hiển thị lỗi và fallback data
5. **Fallback data**: Sử dụng dữ liệu mẫu khi API chưa sẵn sàng

## Lợi ích

✅ **Giữ nguyên giao diện**: Không thay đổi UI/UX hiện tại  
✅ **Dữ liệu động**: Lấy dữ liệu thực từ backend  
✅ **Graceful degradation**: Fallback data khi API lỗi  
✅ **Type safety**: TypeScript interfaces đầy đủ  
✅ **Loading states**: UX tốt hơn với loading indicators  
✅ **Error handling**: Xử lý lỗi một cách thân thiện  

## Để test

1. **Khởi động backend Rails**:
   ```bash
   cd mexe-be
   docker-compose up --build
   ```

2. **Khởi động frontend**:
   ```bash
   cd mexe
   npm run dev
   ```

3. **Kiểm tra API endpoints**:
   - http://localhost:3000/api/v1/home
   - http://localhost:3000/api/v1/products
   - http://localhost:3000/api/v1/news
   - http://localhost:3000/api/v1/brands

4. **Kiểm tra frontend**: Các components sẽ tự động lấy dữ liệu từ API

## Troubleshooting

### API không hoạt động
- Kiểm tra backend Rails có chạy không
- Kiểm tra CORS configuration
- Kiểm tra API endpoints có đúng không

### Frontend không hiển thị dữ liệu
- Kiểm tra console errors
- Kiểm tra network requests
- Kiểm tra API response format

### Loading không dừng
- Kiểm tra API response
- Kiểm tra error handling
- Kiểm tra loading state logic
