import { DefaultApi, Configuration } from '../../api';

// API Configuration
export const API_CONFIG = {
  // BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://47.129.168.239/api/v1',
  BASE_URL:
    process.env.NEXT_PUBLIC_API_URL || 'http://47.129.168.239:81/api/v1',
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
  SEARCH: '/search/products',
  FEATURED_PRODUCTS: '/products/featured',
  NEW_PRODUCTS: '/products/new',
  HOT_PRODUCTS: '/products/hot',
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/update_profile',
    CHANGE_PASSWORD: '/auth/change_password',
  },
  // User endpoints
  USER: {
    ORDERS: '/users/orders',
    FAVORITES: '/users/favorites',
    ADDRESSES: '/users/addresses',
  },
  // Contact endpoints
  CONTACT: '/contacts',
  // Address endpoints
  ADDRESSES: {
    PROVINCES: '/addresses/provinces',
    WARDS: '/addresses/wards',
    ADMINISTRATIVE_UNITS: '/addresses/administrative_units',
    SEARCH: '/addresses/search',
  },
};

const configuration = new Configuration({
  basePath: process.env.API_URL || 'http://localhost:3005/api/v1',
});

export const api = new DefaultApi(configuration);
