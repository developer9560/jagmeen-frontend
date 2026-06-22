export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  colors: string[];
  badge: string | null;
  rating: number;
  reviews: number;
}

export interface NavLink {
  label: string;
  href: string;
  megaMenu?: boolean;
  highlight?: boolean;
}

export interface MegaMenuLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

export interface MegaMenuFeatured {
  title: string;
  subtitle: string;
  href: string;
  accent?: string;
}

export interface MegaMenuNavItem {
  label: string;
  href: string;
  columns: MegaMenuColumn[];
  featured: MegaMenuFeatured;
}

export interface Category {
  name: string;
  icon: string;
  href: string;
}

export interface CategoryOffer {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
}
