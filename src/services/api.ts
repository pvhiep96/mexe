// API service for communicating with Rails backend
import { API_CONFIG, API_ENDPOINTS } from '@/config/api';

// Types
export interface HomeData {
  banners: Banner[];
  featured_products: Product[];
  new_products: Product[];
  hot_products: Product[];
  new_brands: Brand[];
  categories: Category[];
}

export interface Product {
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

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
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

export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  order: number;
  is_active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationMeta;
  filters: {
    categories: Category[];
    brands: Brand[];
    price_range: {
      min: number;
      max: number;
    };
  };
}

export interface NewsResponse {
  articles: Article[];
  pagination: PaginationMeta;
  categories: string[];
  featured_articles: Article[];
}

export interface SearchResponse {
  products: Product[];
  articles: Article[];
  total_results: number;
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Home page data
  async getHomeData(): Promise<HomeData> {
    return this.request<HomeData>(API_ENDPOINTS.HOME);
  }

  // Products
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    category_id?: number;
    brand_id?: number;
    min_price?: number;
    max_price?: number;
    is_new?: boolean;
    is_hot?: boolean;
    is_featured?: boolean;
    search?: string;
    sort?: string;
  }): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.category_id) searchParams.append('category_id', params.category_id.toString());
    if (params?.brand_id) searchParams.append('brand_id', params.brand_id.toString());
    if (params?.min_price) searchParams.append('min_price', params.min_price.toString());
    if (params?.max_price) searchParams.append('max_price', params.max_price.toString());
    if (params?.is_new) searchParams.append('is_new', 'true');
    if (params?.is_hot) searchParams.append('is_hot', 'true');
    if (params?.is_featured) searchParams.append('is_featured', 'true');
    if (params?.search) searchParams.append('search', params.search);
    if (params?.sort) searchParams.append('sort', params.sort);

    const queryString = searchParams.toString();
    const endpoint = `${API_ENDPOINTS.PRODUCTS}${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ProductsResponse>(endpoint);
  }

  async getProduct(slug: string): Promise<Product> {
    return this.request<Product>(API_ENDPOINTS.PRODUCT(slug));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.request<Product[]>(API_ENDPOINTS.FEATURED_PRODUCTS);
  }

  async getNewProducts(): Promise<Product[]> {
    return this.request<Product[]>(API_ENDPOINTS.NEW_PRODUCTS);
  }

  async getHotProducts(): Promise<Product[]> {
    return this.request<Product[]>(API_ENDPOINTS.HOT_PRODUCTS);
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>(API_ENDPOINTS.CATEGORIES);
  }

  // Brands
  async getBrands(): Promise<Brand[]> {
    return this.request<Brand[]>(API_ENDPOINTS.BRANDS);
  }

  // News
  async getNews(params?: {
    page?: number;
    per_page?: number;
    category?: string;
    search?: string;
    sort?: string;
  }): Promise<NewsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.sort) searchParams.append('sort', params.sort);

    const queryString = searchParams.toString();
    const endpoint = `${API_ENDPOINTS.NEWS}${queryString ? `?${queryString}` : ''}`;
    
    return this.request<NewsResponse>(endpoint);
  }

  async getArticle(slug: string): Promise<Article> {
    return this.request<Article>(API_ENDPOINTS.ARTICLE(slug));
  }

  // Search
  async search(query: string): Promise<SearchResponse> {
    return this.request<SearchResponse>(`${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`);
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_CONFIG.BASE_URL);
