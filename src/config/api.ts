// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  HOME: '/home',
  PRODUCTS: '/products',
  PRODUCT: (slug: string) => `/products/${slug}`,
  CATEGORIES: '/categories',
  BRANDS: '/brands',
  NEWS: '/news',
  ARTICLE: (slug: string) => `/news/${slug}`,
  SEARCH: '/search',
  FEATURED_PRODUCTS: '/products/featured',
  NEW_PRODUCTS: '/products/new',
  HOT_PRODUCTS: '/products/hot',
};
