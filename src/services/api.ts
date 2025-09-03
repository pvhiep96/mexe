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
  categories: CategoryWithSubcategories[];
  best_sellers: Product[];
  featured_products: Product[];
  new_brands: BrandWithProducts[];
  essential_accessories: Product[];
}

export interface CategoryWithSubcategories {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  subcategories: Category[];
}

export interface BrandWithProducts {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  founded_year?: number;
  field?: string;
  product_count: number;
  featured_products: Product[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  description?: string;
  short_description?: string;
  price: string;
  original_price?: string;
  discount_percent?: string;
  cost_price?: string;
  weight?: string;
  dimensions?: string;
  stock_quantity: number;
  min_stock_alert: number;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_hot: boolean;
  is_preorder: boolean;
  preorder_quantity?: number;
  preorder_end_date?: string;
  warranty_period?: number;
  meta_title?: string;
  meta_description?: string;
  view_count: number;
  brand?: Brand;
  category?: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: ProductSpecification[];
}

export interface ProductImage {
  id: number;
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: number;
  variant_name: string;
  variant_value: string;
  price_adjustment: string;
  stock_quantity: number;
  sku?: string;
}

export interface ProductSpecification {
  id: number;
  spec_name: string;
  spec_value: string;
  sort_order: number;
  unit?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: number;
  sort_order: number;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  founded_year?: number;
  field?: string;
  story?: string;
  website?: string;
  is_active?: boolean;
  sort_order?: number;
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
  private static retryCount: number = 0;

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
    
    // Reset retry count
    this.resetRetryCount();
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

  static incrementRetryCount(): number {
    this.retryCount++;
    return this.retryCount;
  }

  static resetRetryCount(): void {
    this.retryCount = 0;
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
      
      // Check expiration with 10 minute buffer (increased from 5)
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const bufferTime = 10 * 60; // 10 minutes buffer
      
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

  // New method to check if token is about to expire
  static isTokenExpiringSoon(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const warningTime = 60 * 60; // 1 hour warning
      
      if (!payload.exp) return false;
      
      return payload.exp <= (currentTime + warningTime);
    } catch (error) {
      return false;
    }
  }

  // New method to get token info for debugging
  static getTokenInfo(): any {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;
      
      return {
        userId: payload.user_id,
        email: payload.email,
        issuedAt: new Date(payload.iat * 1000),
        expiresAt: new Date(payload.exp * 1000),
        timeUntilExpiry,
        hoursUntilExpiry: (timeUntilExpiry / 3600).toFixed(2),
        isExpired: timeUntilExpiry <= 0,
        isExpiringSoon: timeUntilExpiry <= 3600, // 1 hour
        tokenLength: token.length
      };
    } catch (error) {
      console.error('Error parsing token info:', error);
      return null;
    }
  }

  // New method to attempt token recovery
  static attemptRecovery(): boolean {
    if (typeof window === 'undefined') return false;
    
    const backupToken = localStorage.getItem(this.BACKUP_TOKEN_KEY);
    if (backupToken) {
      try {
        // Validate backup token
        const parts = backupToken.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          const now = Math.floor(Date.now() / 1000);
          
          if (payload.exp > now) {
            // Backup token is valid, restore it
            localStorage.setItem(this.TOKEN_KEY, backupToken);
            console.log('✅ Token recovery successful');
            return true;
          } else {
            console.warn('⚠️ Backup token is expired, removing both tokens');
            this.removeToken();
          }
        }
      } catch (error) {
        console.error('❌ Error during token recovery:', error);
        // Remove corrupted tokens
        this.removeToken();
      }
    }
    
    return false;
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
        // Handle 401 errors more intelligently
        if (response.status === 401) {
          const isCoreAuthEndpoint = endpoint.includes('/auth/profile') || 
                                   endpoint.includes('/auth/login') || 
                                   endpoint.includes('/auth/register');
          
          const isUserEndpoint = endpoint.includes('/users/') || 
                                endpoint.includes('/orders') ||
                                endpoint.includes('/favorites') ||
                                endpoint.includes('/addresses');
          
          if (isCoreAuthEndpoint) {
            TokenManager.removeToken();
          } else if (isUserEndpoint) {
            // For user endpoints, don't remove token immediately
            // Let AuthContext handle the authentication failure
          } else {
            // For other endpoints, check if token is actually expired
            if (TokenManager.isTokenValid()) {
              // Token is valid, keep it
            } else {
              TokenManager.removeToken();
            }
          }
        }
        
        throw {
          status: response.status,
          success: false,
          message: data.message || 'An error occurred',
          errors: data.errors || ['An error occurred']
        };
              }

        // Reset retry count on successful request
        TokenManager.resetRetryCount();
        return data;
    } catch (error: any) {
              // Network or parsing errors
        if (!error.status) {
          // Increment retry count for network errors
          const retryCount = TokenManager.incrementRetryCount();
          const maxRetries = 3;
          
          if (retryCount <= maxRetries) {
            // Don't throw immediately, let the caller handle retry logic
          }
          
          throw {
            status: 0,
            success: false,
            message: 'Lỗi kết nối. Vui lòng kiểm tra internet và thử lại.',
            errors: ['Network error'],
            retryCount
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
    
    try {
      console.log('🛍️ Fetching products from:', endpoint);
      const response = await this.request<any>(endpoint);
      console.log('🛍️ Products API response:', response);
      
      // Handle new response format
      if (response.success && response.data) {
        return {
          products: response.data,
          pagination: {
            current_page: response.pagination?.current_page || 1,
            total_pages: response.pagination?.total_pages || 1,
            total_count: response.pagination?.total_count || response.data.length,
            per_page: response.pagination?.per_page || 20
          },
          filters: {
            categories: [],
            brands: [],
            price_range: { min: 0, max: 999999 }
          }
        };
      }
      
      // Fallback for old format
      return response as ProductsResponse;
    } catch (error) {
      console.error('🛍️ Products API error:', error);
      throw error;
    }
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
    console.log('🌐 API Client: Sending login request');
    const response = await this.request<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    console.log('🌐 API Client: Login response received:', response);
    
    // Store token on successful login
    if (response.success && response.token) {
      console.log('🔑 API Client: Storing token');
      TokenManager.setToken(response.token);
    } else {
      console.log('⚠️ API Client: No token or success=false in response');
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

  async addToWishlist(productId: number): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`${API_ENDPOINTS.USER.FAVORITES}`, {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    });
  }

  async removeFromWishlist(productId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`${API_ENDPOINTS.USER.FAVORITES}/${productId}`, {
      method: 'DELETE',
    });
  }

  // Token management
  isAuthenticated(): boolean {
    return TokenManager.isTokenValid();
  }

  getToken(): string | null {
    return TokenManager.getToken();
  }

  // Debug method to test authentication
  async debugAuth(): Promise<any> {
    try {
      return this.request<any>('/debug/auth_test');
    } catch (error) {
      console.error('Auth debug failed:', error);
      return { success: false, error };
    }
  }

  async debugProtectedCall(): Promise<any> {
    try {
      return this.request<any>('/debug/protected_test');
    } catch (error) {
      console.error('Protected debug failed:', error);
      return { success: false, error };
    }
  }

  async debugLoginFormat(): Promise<any> {
    try {
      return this.request<any>('/debug/test_login');
    } catch (error) {
      console.error('Login format debug failed:', error);
      return { success: false, error };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_CONFIG.BASE_URL);