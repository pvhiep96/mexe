import { useState, useCallback, useEffect } from 'react';
import { apiClient, type HomeData, type Product, type Category, type Brand, type Article } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

interface UseApiOptions {
  retryCount?: number;
  retryDelay?: number;
  onError?: (error: any) => void;
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { user, isAuthenticated } = useAuth();
  
  const {
    retryCount = 3,
    retryDelay = 1000,
    onError
  } = options;

  const execute = useCallback(async (
    apiCall: () => Promise<T>,
    retryAttempt = 0
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err: any) {
      console.error('API call failed:', err);
      
      // Handle retry logic for network errors
      if (err.status === 0 && retryAttempt < retryCount) {
        console.log(`🔄 Retrying API call (attempt ${retryAttempt + 1}/${retryCount})...`);
        
        // Exponential backoff
        const delay = retryDelay * Math.pow(2, retryAttempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return execute(apiCall, retryAttempt + 1);
      }
      
      setError(err);
      if (onError) {
        onError(err);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [retryCount, retryDelay, onError]);

  // Auto-refresh data when user authentication state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      // User is authenticated, we can make authenticated API calls
      console.log('✅ User authenticated, API calls enabled');
    } else {
      // User is not authenticated, clear sensitive data
      console.log('🔒 User not authenticated, clearing sensitive data');
      setData(null);
    }
  }, [isAuthenticated, user]);

  return {
    data,
    loading,
    error,
    execute,
    isAuthenticated,
    user
  };
}

// Specialized hooks for common API operations
export function useAuthenticatedApi<T = any>(options: UseApiOptions = {}) {
  const api = useApi<T>(options);
  const { isAuthenticated } = useAuth();
  
  const execute = useCallback(async (
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    if (!isAuthenticated) {
      const error = { message: 'Bạn cần đăng nhập để thực hiện thao tác này' };
      api.setError?.(error);
      if (options.onError) {
        options.onError(error);
      }
      return null;
    }
    
    return api.execute(apiCall);
  }, [isAuthenticated, api, options]);

  return {
    ...api,
    execute
  };
}

// Custom hook for home data
export function useHomeData() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const homeData = await apiClient.getHomeData();
        setData(homeData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch home data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Custom hook for single product
export function useProduct(slug: string) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const product = await apiClient.getProduct(slug);
        setData(product);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading, error };
}

// Custom hook for products
export function useProducts(params?: {
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
}) {
  const [data, setData] = useState<{
    products: Product[];
    pagination: any;
    filters: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsData = await apiClient.getProducts(params);
        setData(productsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}

// Custom hook for featured products
export function useFeaturedProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await apiClient.getFeaturedProducts();
        setData(products);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Custom hook for new products
export function useNewProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await apiClient.getNewProducts();
        setData(products);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch new products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Custom hook for hot products
export function useHotProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await apiClient.getHotProducts();
        setData(products);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch hot products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Custom hook for categories
export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categories = await apiClient.getCategories();
        setData(categories);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Custom hook for brands
export function useBrands() {
  const [data, setData] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const brands = await apiClient.getBrands();
        setData(brands);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch brands');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

// Custom hook for news
export function useNews(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  sort?: string;
}) {
  const [data, setData] = useState<{
    articles: Article[];
    pagination: any;
    categories: any[];
    featured_articles: Article[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newsData = await apiClient.getNews(params);
        setData(newsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}

// Custom hook for single article
export function useArticle(slug: string) {
  const [data, setData] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const article = await apiClient.getArticle(slug);
        setData(article);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading, error };
}

// Custom hook for search
export function useSearch(query: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      const searchResults = await apiClient.search(query);
      setData(searchResults);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      search();
    }
  }, [query]);

  return { data, loading, error, search };
}
