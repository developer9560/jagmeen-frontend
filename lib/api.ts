import type {
  ApiResponse,
  LoginResponse,
  LoginPayload,
  SignupPayload,
  User,
  ProfileUpdatePayload,
  Address,
  AddressCreatePayload,
  AddressUpdatePayload,
} from '@/types/auth';
import type { FeaturedProductsData, ProductDetailData, CategoryProductsData, ProductCardData } from '@/types/product';

export interface CategoryNode {
  id: number;
  name: string;
  slug: string;
  level: number;
  image_url: string | null;
  priority: number;
  parent_id: number | null;
  is_active: boolean;
  children: CategoryNode[];
}

// Define basic response types for cart and wishlist locally if not in types/product
export interface CartSummary {
  id: number;
  total_items: number;
  total_price: number;
  updated_at: string;
}

export interface CartItemDetail {
  id: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  product_image: string | null;
  quantity: number;
  price_at_add: number;
  mrp: number;
  stock_quantity: number;
  item_total: number;
  created_at: string;
}

export interface CartData {
  id: number;
  user_id: number;
  status: string;
  total_items: number;
  total_price: number;
  items: CartItemDetail[];
  created_at: string;
  updated_at: string;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  cart_item_id?: number;
  cart_summary?: CartSummary;
  product_name?: string;
}

export interface CartCheckoutResponse {
  success: boolean;
  message: string;
  can_checkout: boolean;
  issues?: string[];
  cart_summary?: CartSummary;
}

export interface WishlistSummary {
  id: number;
  total_items: number;
  updated_at: string;
}

export interface WishlistItemDetail {
  id: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  product_image: string | null;
  price: number;
  mrp: number;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
}

export interface WishlistData {
  id: number;
  user_id: number;
  total_items: number;
  items: WishlistItemDetail[];
  created_at: string;
  updated_at: string;
}

export interface ToggleWishlistResponse {
  success: boolean;
  message: string;
  is_wishlisted: boolean;
  wishlist_item_id?: number;
  wishlist_summary?: WishlistSummary;
  product_name?: string;
}

export type BannerType = 'HOME' | 'TRENDING' | 'FEATURED' | 'BESTSELLER';

export interface Banner {
  id: number;
  title: string;
  image_url: string;
  category_slug: string | null;
  product_slug: string | null;
  is_active: boolean;
  is_for_desktop: boolean | null;
  is_for_mobile: boolean | null;
  banner_type: BannerType;
}

export interface BannerListData {
  banners: Banner[];
  total: number;
}

export type PaymentMode = 'COD' | 'ONLINE';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface PlaceOrderPayload {
  address_id: number;
  payment_mode: PaymentMode;
  customer_note?: string;
}

export interface OrderItem {
  id: number;
  product_id: number | null;
  product_name: string;
  product_slug: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  mrp: number;
  item_total: number;
  created_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  address_id: number | null;
  status: OrderStatus;
  payment_mode: PaymentMode;
  payment_status: PaymentStatus;
  subtotal: number;
  shipping_amount: number;
  total_amount: number;
  total_items: number;
  shipping_contact_number: string;
  shipping_address_line1: string;
  shipping_address_line2: string | null;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  customer_note: string | null;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderListData {
  orders: Order[];
  total: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.jagmeenfashion.com';

class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.detail || data.message || 'Something went wrong', data.status_code || response.status);
  }

  // Some endpoints return 200 OK but with success: false
  if (data.success === false) {
    throw new ApiError(data.message || 'Something went wrong', data.status_code || response.status);
  }

  return data as T;
}

export const authApi = {
  signup: (payload: SignupPayload) =>
    request<ApiResponse<User>>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload: LoginPayload) =>
    request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  logout: (token: string) =>
    request<ApiResponse>('/api/auth/logout', { method: 'PATCH' }, token),

  forgotPassword: (email: string) =>
    request<ApiResponse>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  verifyOtp: (email: string, otp_code: string) =>
    request<ApiResponse>('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp_code }),
    }),

  resetPassword: (email: string, otp_code: string, new_password: string) =>
    request<ApiResponse>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp_code, new_password }),
    }),
};

export const userApi = {
  getMe: (token: string) =>
    request<ApiResponse<User>>('/api/users/users/me', { method: 'GET' }, token),

  updateProfile: (token: string, payload: ProfileUpdatePayload) =>
    request<ApiResponse<User>>(
      '/api/users/users/update-profile',
      { method: 'PUT', body: JSON.stringify(payload) },
      token
    ),
};

export const addressApi = {
  getMyAddresses: (token: string) =>
    request<ApiResponse<Address[]>>('/api/addresses/addresses/me', { method: 'GET' }, token),

  addAddress: (token: string, payload: AddressCreatePayload) =>
    request<ApiResponse<Address>>(
      '/api/addresses/addresses/add',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    ),

  updateAddress: (token: string, addressId: number, payload: AddressUpdatePayload) =>
    request<ApiResponse<Address>>(
      `/api/addresses/addresses/update/${addressId}`,
      { method: 'PUT', body: JSON.stringify(payload) },
      token
    ),
};

export const productApi = {
  getFeatured: (page = 1, size = 8) =>
    request<ApiResponse<FeaturedProductsData>>(
      `/api/products/featured?page=${page}&size=${size}`,
      { method: 'GET' }
    ),
    
  getBestSellers: (page = 1, size = 8) =>
    request<ApiResponse<FeaturedProductsData>>(
      `/api/products/best-sellers?page=${page}&size=${size}`,
      { method: 'GET' }
    ),

  getProducts: (
    page: number = 1,
    size: number = 20,
    min_price?: number,
    max_price?: number,
    sort_by?: 'latest' | 'price_asc' | 'price_desc' | 'discount' | 'featured'
  ) => {
    const params = new URLSearchParams({ page: String(page), size: String(size) });
    // The backend /getall currently might not support min/max price natively without updates, 
    // but we pass them just in case they are added, and definitely pass sort_by.
    if (min_price !== undefined) params.set('min_price', String(min_price));
    if (max_price !== undefined) params.set('max_price', String(max_price));
    if (sort_by && sort_by !== 'discount') params.set('sort_by', sort_by);
    return request<ApiResponse<FeaturedProductsData>>(`/api/products/getall?${params.toString()}`, { method: 'GET' });
  },

  getProductBySlug: (slug: string) =>
    request<ApiResponse<ProductDetailData>>(`/api/products/get/${slug}`, { method: 'GET' }),

  getProductsByCategorySlug: (
    slug: string,
    page: number = 1,
    size: number = 20,
    min_price?: number,
    max_price?: number,
    sort_by?: 'latest' | 'price_asc' | 'price_desc' | 'discount'
  ) => {
    const params = new URLSearchParams({ page: String(page), size: String(size) });
    if (min_price !== undefined) params.set('min_price', String(min_price));
    if (max_price !== undefined) params.set('max_price', String(max_price));
    if (sort_by) params.set('sort_by', sort_by);
    return request<ApiResponse<CategoryProductsData>>(`/api/products/category/slug/${slug}?${params.toString()}`, { method: 'GET' });
  },

  trackProductView: (productId: number) =>
    request<ApiResponse>(`/api/products/${productId}/view`, { method: 'PATCH' }),

  getSimilarProducts: (slug: string, limit = 8) =>
    request<ApiResponse<ProductCardData[]>>(
      `/api/products/${slug}/similar?limit=${limit}`,
      { method: 'GET' }
    ),
};

export const cartApi = {
  getCart: (token: string) =>
    request<CartData>('/api/cart', { method: 'GET' }, token),
  
  getSummary: (token: string) =>
    request<CartSummary>('/api/cart/summary', { method: 'GET' }, token),

  addToCart: (token: string, productId: number, quantity: number = 1) =>
    request<AddToCartResponse>(
      '/api/cart/add',
      { method: 'POST', body: JSON.stringify({ product_id: productId, quantity }) },
      token
    ),

  updateItem: (token: string, itemId: number, quantity: number) =>
    request<CartData>(
      `/api/cart/items/${itemId}`,
      { method: 'PUT', body: JSON.stringify({ quantity }) },
      token
    ),

  removeItem: (token: string, itemId: number) =>
    request<ApiResponse>(`/api/cart/items/${itemId}`, { method: 'DELETE' }, token),

  clearCart: (token: string) =>
    request<ApiResponse>('/api/cart', { method: 'DELETE' }, token),

  validateCheckout: (token: string) =>
    request<CartCheckoutResponse>('/api/cart/checkout-validation', { method: 'POST' }, token),
};

export const wishlistApi = {
  getWishlist: (token: string) =>
    request<WishlistData>('/api/wishlist', { method: 'GET' }, token),

  getSummary: (token: string) =>
    request<WishlistSummary>('/api/wishlist/summary', { method: 'GET' }, token),

  toggleItem: (token: string, productId: number) =>
    request<ToggleWishlistResponse>(
      '/api/wishlist/toggle',
      { method: 'POST', body: JSON.stringify({ product_id: productId }) },
      token
    ),
};

export const categoryApi = {
  getTree: () =>
    request<ApiResponse<CategoryNode[]>>('/api/categories/tree', { method: 'GET' }),
};

export const bannerApi = {
  getAll: () =>
    request<ApiResponse<BannerListData>>('/api/banners', { method: 'GET' }),

  getDesktop: () =>
    request<ApiResponse<BannerListData>>('/api/banners/desktop', { method: 'GET' }),

  getMobile: () =>
    request<ApiResponse<BannerListData>>('/api/banners/mobile', { method: 'GET' }),

  getByType: (type: BannerType) =>
    request<ApiResponse<BannerListData>>(`/api/banners/type/${type}`, { method: 'GET' }),
};

export const orderApi = {
  placeOrder: (token: string, payload: PlaceOrderPayload) =>
    request<ApiResponse<Order>>(
      '/api/orders',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    ),

  getMyOrders: (token: string) =>
    request<ApiResponse<OrderListData>>('/api/orders/me', { method: 'GET' }, token),

  getOrder: (token: string, orderId: number) =>
    request<ApiResponse<Order>>(`/api/orders/${orderId}`, { method: 'GET' }, token),

  cancelOrder: (token: string, orderId: number) =>
    request<ApiResponse<Order>>(`/api/orders/${orderId}/cancel`, { method: 'PATCH' }, token),
};

export { ApiError };
