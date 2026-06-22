export interface ProductCardData {
  id: number;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  primary_image: string | null;
  is_featured: boolean;
  is_best_seller: boolean;
  stock_quantity: number;
  summary: string;
}

export interface PaginationMeta {
  page: number;
  size: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface FeaturedProductsData {
  data: ProductCardData[];
  pagination: PaginationMeta;
}

export interface CategoryMeta {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryProductsData {
  category: CategoryMeta;
  data: ProductCardData[];
  pagination: PaginationMeta;
}

export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductDetailData {
  id: number;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  summary: string | null;
  product_details: Record<string, any> | string | null;
  keywords?: string[];
  is_featured: boolean;
  stock_quantity: number;
  view_count: number;
  sale: number;
  images: ProductImage[];
  category_id: number;
  created_at: string;
  updated_at: string;
}
