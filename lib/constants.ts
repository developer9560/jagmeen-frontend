import type { MegaMenuNavItem } from '@/types';

// Main navigation with mega menu subcategories
export const MEGA_MENU_NAV: MegaMenuNavItem[] = [
  {
    label: 'Women',
    href: '/women',
    featured: {
      title: 'New Arrivals',
      subtitle: 'Spring / Summer 2025',
      href: '/women/new-arrivals',
      accent: 'Shop the Collection',
    },
    columns: [
      {
        title: 'Clothing',
        links: [
          { label: 'Dresses', href: '/women/dresses' },
          { label: 'Tops & Blouses', href: '/women/tops' },
          { label: 'Skirts', href: '/women/skirts' },
          { label: 'Trousers & Pants', href: '/women/pants' },
          { label: 'Ethnic Wear', href: '/women/ethnic' },
          { label: 'Co-ord Sets', href: '/women/co-ords' },
        ],
      },
      {
        title: 'Occasion',
        links: [
          { label: 'Casual Wear', href: '/women/casual' },
          { label: 'Office Wear', href: '/women/office' },
          { label: 'Party Wear', href: '/women/party' },
          { label: 'Wedding Collection', href: '/women/wedding' },
          { label: 'Festive Edit', href: '/women/festive' },
        ],
      },
      {
        title: 'Accessories',
        links: [
          { label: 'Handbags', href: '/women/bags' },
          { label: 'Jewelry', href: '/women/jewelry' },
          { label: 'Footwear', href: '/women/footwear' },
          { label: 'Scarves & Stoles', href: '/women/scarves' },
          { label: 'Sunglasses', href: '/women/sunglasses' },
        ],
      },
    ],
  },
  {
    label: 'Men',
    href: '/men',
    featured: {
      title: 'Premium Edit',
      subtitle: 'Tailored for the Modern Man',
      href: '/men/premium',
      accent: 'Explore Now',
    },
    columns: [
      {
        title: 'Clothing',
        links: [
          { label: 'Shirts', href: '/men/shirts' },
          { label: 'T-Shirts & Polos', href: '/men/t-shirts' },
          { label: 'Trousers', href: '/men/trousers' },
          { label: 'Jeans', href: '/men/jeans' },
          { label: 'Blazers & Suits', href: '/men/blazers' },
          { label: 'Ethnic Wear', href: '/men/ethnic' },
        ],
      },
      {
        title: 'Shop By',
        links: [
          { label: 'Casual', href: '/men/casual' },
          { label: 'Formal', href: '/men/formal' },
          { label: 'Sportswear', href: '/men/sportswear' },
          { label: 'Winter Wear', href: '/men/winter' },
          { label: 'New Arrivals', href: '/men/new-arrivals' },
        ],
      },
      {
        title: 'Accessories',
        links: [
          { label: 'Watches', href: '/men/watches' },
          { label: 'Belts', href: '/men/belts' },
          { label: 'Footwear', href: '/men/footwear' },
          { label: 'Wallets', href: '/men/wallets' },
          { label: 'Sunglasses', href: '/men/sunglasses' },
        ],
      },
    ],
  },
  {
    label: 'Kids',
    href: '/kids',
    featured: {
      title: 'Little Luxe',
      subtitle: 'Styles for Every Adventure',
      href: '/kids/new-arrivals',
      accent: 'View Collection',
    },
    columns: [
      {
        title: 'Girls',
        links: [
          { label: 'Dresses', href: '/kids/girls/dresses' },
          { label: 'Tops', href: '/kids/girls/tops' },
          { label: 'Skirts', href: '/kids/girls/skirts' },
          { label: 'Ethnic Wear', href: '/kids/girls/ethnic' },
          { label: 'Footwear', href: '/kids/girls/footwear' },
        ],
      },
      {
        title: 'Boys',
        links: [
          { label: 'Shirts', href: '/kids/boys/shirts' },
          { label: 'T-Shirts', href: '/kids/boys/t-shirts' },
          { label: 'Shorts & Pants', href: '/kids/boys/pants' },
          { label: 'Ethnic Wear', href: '/kids/boys/ethnic' },
          { label: 'Footwear', href: '/kids/boys/footwear' },
        ],
      },
      {
        title: 'Shop By Age',
        links: [
          { label: '0–2 Years', href: '/kids/0-2' },
          { label: '3–5 Years', href: '/kids/3-5' },
          { label: '6–8 Years', href: '/kids/6-8' },
          { label: '9–12 Years', href: '/kids/9-12' },
          { label: 'Sale', href: '/kids/sale' },
        ],
      },
    ],
  },
  
];

// Categories for the category strip
export const CATEGORIES = [
  { name: 'Dresses', icon: '👗', href: '/category/dresses'},
  { name: 'Tops', icon: '👚', href: '/category/tops' },
  { name: 'Pants', icon: '👖', href: '/category/pants' },
  { name: 'Shoes', icon: '👠', href: '/category/shoes' },
  { name: 'Bags', icon: '👜', href: '/category/bags' },
  { name: 'Jewelry', icon: '💎', href: '/category/jewelry' },
  { name: 'Watches', icon: '⌚', href: '/category/watches' },
  { name: 'Sunglasses', icon: '🕶️', href: '/category/sunglasses' },
];

// Trending products
export const TRENDING_PRODUCTS = [
  {
    id: 1,
    name: 'Silk Midi Dress',
    price: 189.00,
    originalPrice: 249.00,
    image: '/products/product-1.jpg',
    colors: ['#0a0a0a', '#c9a84c', '#e8c5c5', '#f5f0e8'],
    badge: 'Sale',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Cashmere Blend Coat',
    price: 345.00,
    originalPrice: null,
    image: '/products/product-2.jpg',
    colors: ['#0a0a0a', '#4a4a4a', '#f5f0e8'],
    badge: null,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Pleated Maxi Skirt',
    price: 129.00,
    originalPrice: 169.00,
    image: '/products/product-3.jpg',
    colors: ['#c9a84c', '#e8c5c5', '#0a0a0a'],
    badge: 'Sale',
    rating: 4.6,
    reviews: 67,
  },
  {
    id: 4,
    name: 'Structured Blazer',
    price: 275.00,
    originalPrice: null,
    image: '/products/product-4.jpg',
    colors: ['#0a0a0a', '#f5f0e8'],
    badge: 'New',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 5,
    name: 'Leather Crossbody Bag',
    price: 195.00,
    originalPrice: 250.00,
    image: '/products/product-5.jpg',
    colors: ['#0a0a0a', '#c9a84c', '#8b4513'],
    badge: 'Sale',
    rating: 4.5,
    reviews: 203,
  },
  {
    id: 6,
    name: 'Satin Wrap Blouse',
    price: 115.00,
    originalPrice: null,
    image: '/products/product-6.jpg',
    colors: ['#f5f0e8', '#e8c5c5', '#0a0a0a'],
    badge: null,
    rating: 4.4,
    reviews: 91,
  },
  {
    id: 7,
    name: 'High-Waist Trousers',
    price: 155.00,
    originalPrice: null,
    image: '/products/product-7.jpg',
    colors: ['#0a0a0a', '#4a4a4a', '#f5f0e8'],
    badge: 'Trending',
    rating: 4.8,
    reviews: 178,
  },
  {
    id: 8,
    name: 'Pearl Drop Earrings',
    price: 85.00,
    originalPrice: 110.00,
    image: '/products/product-8.jpg',
    colors: ['#c9a84c', '#f5f0e8'],
    badge: 'Sale',
    rating: 4.9,
    reviews: 312,
  },
];

// New Arrivals
export const NEW_ARRIVALS = [
  {
    id: 9,
    name: 'Velvet Evening Gown',
    price: 425.00,
    originalPrice: null,
    image: '/products/product-9.jpg',
    colors: ['#0a0a0a', '#800020'],
    badge: 'New',
    rating: 5.0,
    reviews: 28,
  },
  {
    id: 10,
    name: 'Tweed Mini Skirt',
    price: 145.00,
    originalPrice: null,
    image: '/products/product-10.jpg',
    colors: ['#f5f0e8', '#c9a84c'],
    badge: 'New',
    rating: 4.7,
    reviews: 45,
  },
  {
    id: 11,
    name: 'Merino Wool Sweater',
    price: 198.00,
    originalPrice: null,
    image: '/products/product-11.jpg',
    colors: ['#e8c5c5', '#f5f0e8', '#0a0a0a'],
    badge: 'New',
    rating: 4.6,
    reviews: 62,
  },
  {
    id: 12,
    name: 'Ankle Strap Heels',
    price: 225.00,
    originalPrice: null,
    image: '/products/product-12.jpg',
    colors: ['#0a0a0a', '#c9a84c'],
    badge: 'New',
    rating: 4.8,
    reviews: 37,
  },
];

// Category offer cards
export const CATEGORY_OFFERS = [
  {
    title: 'Summer Dresses',
    subtitle: 'Up to 40% off',
    description: 'Light fabrics, bold prints',
    image: '/categories/cat-1.jpg',
    href: '/category/summer-dresses',
  },
  {
    title: 'Office Elegance',
    subtitle: 'New Collection',
    description: 'Tailored for success',
    image: '/categories/cat-2.jpg',
    href: '/category/office',
  },
  {
    title: 'Evening Wear',
    subtitle: 'Starting ₹2,999',
    description: 'Shine after dark',
    image: '/categories/cat-3.jpg',
    href: '/category/evening',
  },
];

// Brand logos
export const BRANDS = [
  { name: 'Gucci', logo: 'GUCCI' },
  { name: 'Prada', logo: 'PRADA' },
  { name: 'Versace', logo: 'VERSACE' },
  { name: 'Dior', logo: 'DIOR' },
  { name: 'Chanel', logo: 'CHANEL' },
  { name: 'Burberry', logo: 'BURBERRY' },
];

// Footer links
export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    // { label: 'Western Wear', href: '/western-wear' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    // { label: 'Careers', href: '/careers' },
    // { label: 'Press', href: '/press' },
    // { label: 'Blog', href: '/blog' },
  ],
  help: [
    // { label: 'T-Shirts', href: '/t-shirts' },
    // { label: 'Shirts', href: '/shirts' },
    // { label: 'Kurtas', href: '/kurtas' },
    // { label: 'Garment Manufacturer Faridabad', href: '/garment-manufacturer-faridabad' },
    // { label: 'Bulk Clothing Manufacturer', href: '/bulk-clothing-manufacturer' },
    // { label: 'Customer Service', href: '/support' },
    // { label: 'Shipping & Returns', href: '/shipping' },
    // { label: 'Size Guide', href: '/size-guide' },
    // { label: 'FAQs', href: '/faqs' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    // { label: 'Cookie Policy', href: '/cookies' },
  ],
};

// Social links
export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/jagmeenfashion' },
  { name: 'X', href: 'https://x.com/jagmeenfashion' },
  { name: 'Facebook', href: 'https://www.facebook.com/jagmeenfashion' },
];
