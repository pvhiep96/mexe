export type Locale = 'en' | 'es';

// User Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  user: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  };
}

export interface UpdateProfileRequest {
  user: {
    name: string;
    phone?: string;
    date_of_birth?: string;
    address?: string;
  };
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

// Order Types
export interface Order {
  id: string;
  status: string;
  total_amount: number;
  items: OrderItem[];
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  total: number;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  added_at: string;
}

// Address Types
export interface UserAddress {
  id: string;
  name: string;
  phone: string;
  address_line: string;
  city: string;
  district: string;
  ward: string;
  postal_code: string;
  is_default: boolean;
}

// API Response Types
export interface ApiError {
  errors: string[];
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  errors?: string[];
}
