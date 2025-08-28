// API service for communicating with Rails backend
import { API_CONFIG, API_ENDPOINTS } from '@/config/api';
import type { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  UpdateProfileRequest, 
  ChangePasswordRequest,
  Order,
  WishlistItem,
  UserAddress,
  ApiError 
} from '@/types';

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

// Token management utilities
class TokenManager {
  private static readonly TOKEN_KEY = 'authToken';
  private static readonly BACKUP_TOKEN_KEY = 'authToken_backup';
  private static readonly LAST_VALID_KEY = 'lastValidToken';
  
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Try main token first
    let token = localStorage.getItem(this.TOKEN_KEY);
    
    // If main token is missing, try backup
    if (!token) {
      token = localStorage.getItem(this.BACKUP_TOKEN_KEY);
      if (token) {
        this.setToken(token); // Restore to main location
      }
    }
    
    return token;
  }
  
  static setToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    // Store in main location
    localStorage.setItem(this.TOKEN_KEY, token);
    
    // Create backup
    localStorage.setItem(this.BACKUP_TOKEN_KEY, token);
    
    // Store timestamp of last valid token
    localStorage.setItem(this.LAST_VALID_KEY, Date.now().toString());
  }
  
  static removeToken(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.BACKUP_TOKEN_KEY);
    localStorage.removeItem(this.LAST_VALID_KEY);
  }
  
  static getLastValidTokenTime(): number {
    if (typeof window === 'undefined') return 0;
    const timestamp = localStorage.getItem(this.LAST_VALID_KEY);
    return timestamp ? parseInt(timestamp) : 0;
  }
  
  static isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Check JWT format
      const parts = token.split('.');
      if (parts.length !== 3) {
        this.removeToken();
        return false;
      }
      
      // Check expiration with 5 minute buffer
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const bufferTime = 5 * 60; // 5 minutes buffer
      
      if (!payload.exp) {
        this.removeToken();
        return false;
      }
      
      if (payload.exp <= (currentTime + bufferTime)) {
        this.removeToken();
        return false;
      }
      
      return true;
    } catch (error) {
      this.removeToken();
      return false;
    }
  }
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = TokenManager.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json();
      
      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          TokenManager.removeToken();
        }
        
        throw {
          status: response.status,
          success: false,
          message: data.message || 'An error occurred',
          errors: data.errors || ['An error occurred']
        };
      }

      return data;
    } catch (error: any) {
      // Network or parsing errors
      if (!error.status) {
        throw {
          status: 0,
          success: false,
          message: 'Lỗi kết nối. Vui lòng kiểm tra internet và thử lại.',
          errors: ['Network error']
        };
      }
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

  // Authentication
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token on successful login
    if (response.success && response.token) {
      TokenManager.setToken(response.token);
    }
    
    return response;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token on successful registration
    if (response.success && response.token) {
      TokenManager.setToken(response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.request(API_ENDPOINTS.AUTH.LOGOUT || '/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Ignore logout errors
    } finally {
      TokenManager.removeToken();
    }
  }

  async getProfile(): Promise<{ success: boolean; user: User }> {
    return this.request<{ success: boolean; user: User }>(API_ENDPOINTS.AUTH.PROFILE);
  }

  async updateProfile(userData: UpdateProfileRequest): Promise<{ success: boolean; user: User; message: string }> {
    return this.request<{ success: boolean; user: User; message: string }>(API_ENDPOINTS.AUTH.UPDATE_PROFILE, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(passwordData: ChangePasswordRequest): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // User Data
  async getUserOrders(): Promise<Order[]> {
    return this.request<Order[]>(API_ENDPOINTS.USER.ORDERS);
  }

  async getUserWishlist(): Promise<WishlistItem[]> {
    return this.request<WishlistItem[]>(API_ENDPOINTS.USER.FAVORITES);
  }

  async getUserAddresses(): Promise<UserAddress[]> {
    return this.request<UserAddress[]>(API_ENDPOINTS.USER.ADDRESSES);
  }

  // Token management
  isAuthenticated(): boolean {
    return TokenManager.isTokenValid();
  }

  getToken(): string | null {
    return TokenManager.getToken();
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_CONFIG.BASE_URL);