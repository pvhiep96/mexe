# API Integration Guide

## Tổng quan

Dự án đã được cập nhật để sử dụng dữ liệu động từ API thay vì dữ liệu tĩnh. Tất cả các trang chính (Home, Products, Product Detail, News, News Detail) đều đã được cập nhật để sử dụng API hooks.

## Cấu trúc file

### 1. API Configuration (`src/config/api.ts`)
- Chứa cấu hình API endpoints và base URL
- Sử dụng environment variable `NEXT_PUBLIC_API_URL`

### 2. API Service (`src/services/api.ts`)
- Chứa `ApiClient` class với tất cả các methods API
- Định nghĩa TypeScript interfaces cho tất cả data types
- Xử lý lỗi và response parsing

### 3. Custom Hooks (`src/hooks/useApi.ts`)
- `useHomeData()` - Lấy dữ liệu trang chủ
- `useProducts()` - Lấy danh sách sản phẩm
- `useProduct(slug)` - Lấy chi tiết sản phẩm
- `useNews()` - Lấy danh sách tin tức
- `useArticle(slug)` - Lấy chi tiết bài viết
- `useCategories()` - Lấy danh mục
- `useBrands()` - Lấy thương hiệu
- `useSearch(query)` - Tìm kiếm

## Cách sử dụng

### 1. Trong Components

```tsx
import { useHomeData } from '@/hooks/useApi';

export default function HomePage() {
  const { data: homeData, loading, error } = useHomeData();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <Banner banners={homeData?.banners} />
      <NewProducts products={homeData?.new_products} />
      <NewBrands brands={homeData?.new_brands} />
      <Brands brands={homeData?.brands} />
    </div>
  );
}
```

### 2. Với Search Parameters

```tsx
import { useProducts } from '@/hooks/useApi';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const category = searchParams.get('category');

  const { data: productsData, loading, error } = useProducts({
    page,
    per_page: 20,
    category_id: category ? parseInt(category) : undefined,
  });

  // ... rest of component
}
```

### 3. Với Dynamic Routes

```tsx
import { useProduct } from '@/hooks/useApi';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { data: product, loading, error } = useProduct(params.id);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* ... rest of product details */}
    </div>
  );
}
```

## Fallback Data

Tất cả các components đều có fallback data để đảm bảo UI hoạt động ngay cả khi API chưa sẵn sàng:

```tsx
// Sử dụng dữ liệu từ API hoặc fallback data
const products = apiProducts && apiProducts.length > 0 
  ? apiProducts 
  : fallbackProducts;
```

## Error Handling

Mỗi hook đều có error handling:

```tsx
const { data, loading, error } = useHomeData();

if (loading) return <Loading />;
if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
```

## Environment Variables

Tạo file `.env.local` trong thư mục gốc:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## API Endpoints

### Home
- `GET /home` - Dữ liệu trang chủ (banners, products, brands)

### Products
- `GET /products` - Danh sách sản phẩm với pagination và filters
- `GET /products/:slug` - Chi tiết sản phẩm
- `GET /products/featured` - Sản phẩm nổi bật
- `GET /products/new` - Sản phẩm mới
- `GET /products/hot` - Sản phẩm hot

### Categories
- `GET /categories` - Danh sách danh mục

### Brands
- `GET /brands` - Danh sách thương hiệu

### News
- `GET /news` - Danh sách tin tức với pagination
- `GET /news/:slug` - Chi tiết bài viết

### Search
- `GET /search?q=:query` - Tìm kiếm sản phẩm và tin tức

## Data Types

### Product
```typescript
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price?: number;
  images: string[];
  category_id: number;
  brand_id: number;
  is_featured: boolean;
  is_new: boolean;
  is_hot: boolean;
  stock_quantity: number;
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}
```

### Article
```typescript
interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}
```

### Banner
```typescript
interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  order: number;
  is_active: boolean;
}
```

## Troubleshooting

### 1. API không kết nối được
- Kiểm tra `NEXT_PUBLIC_API_URL` trong `.env.local`
- Đảm bảo Rails backend đang chạy
- Kiểm tra CORS configuration

### 2. Dữ liệu không hiển thị
- Kiểm tra console để xem lỗi API
- Đảm bảo API response khớp với TypeScript interfaces
- Kiểm tra network tab trong DevTools

### 3. TypeScript errors
- Kiểm tra interfaces trong `src/services/api.ts`
- Đảm bảo API response khớp với TypeScript types

## Testing

### 1. Test API endpoints
```bash
# Test home endpoint
curl http://localhost:3000/api/v1/home

# Test products endpoint
curl http://localhost:3000/api/v1/products

# Test news endpoint
curl http://localhost:3000/api/v1/news
```

### 2. Test fallback data
- Tắt Rails backend
- Refresh trang
- Kiểm tra xem fallback data có hiển thị không

## Performance

- Sử dụng `useMemo` và `useCallback` cho expensive operations
- Implement pagination cho danh sách dài
- Sử dụng `React.memo` cho components không cần re-render
- Implement caching cho API responses

## Security

- Không expose sensitive data trong client-side code
- Sử dụng HTTPS cho production
- Implement rate limiting trên backend
- Validate tất cả API inputs
