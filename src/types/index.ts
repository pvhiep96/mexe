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
  product_sku?: string;
  quantity: number;
  price: number; // alias of unit_price (includes variant price if applicable)
  unit_price?: number;
  total: number; // alias of total_price
  total_price?: number;
  variant_info?: {
    variant_id: number;
    variant_name: string;
    variant_value: string;
    variant_sku?: string;
    price_adjustment: number;
    final_price: number;
  };
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

// Vietnamese Administrative Units Types
export interface AdministrativeRegion {
  id: number;
  name: string;
  name_en: string;
  code_name: string;
  code_name_en: string;
}

export interface AdministrativeUnit {
  id: number;
  full_name: string;
  full_name_en: string;
  short_name: string;
  short_name_en: string;
  code_name: string;
  code_name_en: string;
}

export interface Province {
  code: string;
  name: string;
  'name-en': string;
  'full-name': string;
  'full-name-en': string;
  'code-name': string;
  administrative_unit_id?: number;
  administrative_unit_name?: string;
  display_name?: string;
  // New fields from serializer
  type?: string;
  'type-en'?: string;
  'is-municipality'?: boolean;
  'wards-count'?: number;
  // For backward compatibility
  name_en?: string;
  full_name?: string;
  full_name_en?: string;
  code_name?: string;
  type_en?: string;
  is_municipality?: boolean;
  wards_count?: number;
}

export interface Ward {
  code: string;
  name: string;
  name_en: string;
  full_name: string;
  full_name_en: string;
  code_name: string;
  province_code: string;
  administrative_unit_id: number;
  administrative_unit_name?: string;
  province_name?: string;
  display_name?: string;
}

export interface AddressSearchResult {
  provinces: Array<{
    type: 'province';
    code: string;
    name: string;
    full_name: string;
  }>;
  wards: Array<{
    type: 'ward';
    code: string;
    name: string;
    full_name: string;
    province_name: string;
  }>;
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
