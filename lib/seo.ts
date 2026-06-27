import type { Metadata } from 'next';

export const SITE_URL = 'https://jagmeenfashion.com';
export const SITE_NAME = 'Jagmeen Fashion';
export const SUPPORT_PHONE = '+91 8809578544';
export const SUPPORT_EMAIL = 'jagmeensupportteam@gmail.com';
export const BUSINESS_ADDRESS = 'Khedi Road, Sector-87, Faridabad, Haryana 121002';

export type LandingPageSlug =
  | 'women'
  | 'men'
  | 'kids'
  | 'western-wear'
  | 'indo-western-wear'
  | 't-shirts'
  | 'shirts'
  | 'kurtas'
  | 'garment-manufacturer-faridabad'
  | 'western-wear-manufacturer-india'
  | 'bulk-clothing-manufacturer';

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface LandingPageSeo {
  slug: LandingPageSlug;
  title: string;
  metaTitle: string;
  description: string;
  h1: string;
  intro: string[];
  keywords: string[];
  faqs: SeoFaq[];
  relatedLinks: Array<{ label: string; href: string }>;
}

export const landingPages: Record<LandingPageSlug, LandingPageSeo> = {
  women: {
    slug: 'women',
    title: "Women's Clothing Online India",
    metaTitle: "Women's Clothing Online India - Jagmeen Fashion",
    description:
      "Shop women's clothing online at Jagmeen Fashion. Explore Western and Indo-Western styles, everyday outfits, festive wear and quality apparel delivered across India.",
    h1: "Women's Clothing Online India",
    intro: [
      "Jagmeen Fashion brings together women's clothing designed for everyday comfort, smart styling and occasion-ready dressing. The collection focuses on Western and Indo-Western pieces that can move from casual plans to festive moments with ease.",
      "From tops and dresses to kurtas and coordinated looks, every page is built to help shoppers compare styles, prices, sizes and product details clearly. Add your researched keywords for women's categories inside this page's keywords array in frontend/lib/seo.ts.",
    ],
    keywords: ['jagmeen','jagmeen fashion','women clothing online india', 'buy women clothes india', 'women western wear india'],
    faqs: [
      { question: 'Do you deliver women clothing across India?', answer: 'Yes, Jagmeen Fashion supports delivery across India for eligible orders.' },
      { question: 'What styles are available for women?', answer: 'The range can include Western, Indo-Western, casual and festive styles depending on current stock.' },
      { question: 'Can I find product details before ordering?', answer: 'Yes, each product page includes price, images, availability and detailed product information when available.' },
    ],
    relatedLinks: [
      { label: 'Kurtas', href: '/kurtas' },
      { label: 'Western Wear', href: '/western-wear' },
      { label: 'All Products', href: '/products' },
    ],
  },
  men: {
    slug: 'men',
    title: "Men's Clothing Online India",
    metaTitle: "Men's Clothing Online India - Shirts, T-Shirts & More",
    description:
      "Shop men's clothing online at Jagmeen Fashion. Explore shirts, t-shirts, smart casual wear and quality everyday fashion with delivery across India.",
    h1: "Men's Clothing Online India",
    intro: [
      "Jagmeen Fashion helps men shop practical, polished clothing for daily wear, casual outings and smart occasions. The focus is on clear product information, fair pricing and simple online ordering.",
      "Use this landing page for your final men's fashion keyword set after research. Keep the primary keyword in the title, H1, intro and internal links, but avoid stuffing repeated terms unnaturally.",
    ],
    keywords: ['men clothing online india', 'buy men clothes india', 'men fashion india'],
    faqs: [
      { question: 'Can I buy men shirts and t-shirts online?', answer: 'Yes, men shirts, t-shirts and other styles can be listed here depending on active inventory.' },
      { question: 'Is Cash on Delivery available?', answer: 'Cash on Delivery is available for eligible orders and serviceable pin codes.' },
      { question: 'How do I check size and product details?', answer: 'Open the product page to review images, product details, price, stock and available information.' },
    ],
    relatedLinks: [
      { label: 'T-Shirts', href: '/t-shirts' },
      { label: 'Shirts', href: '/shirts' },
      { label: 'All Products', href: '/products' },
    ],
  },
  kids: {
    slug: 'kids',
    title: "Kids' Clothing Online India",
    metaTitle: "Kids' Clothing Online India - Jagmeen Fashion",
    description:
      "Shop kids' clothing online at Jagmeen Fashion. Explore comfortable styles for children with quality fabrics and delivery across India.",
    h1: "Kids' Clothing Online India",
    intro: [
      "Jagmeen Fashion can showcase kids' clothing for everyday comfort, family functions and seasonal needs. This page gives search engines a dedicated destination for child-focused fashion searches.",
      "When your kids inventory grows, add subcategory links for boys, girls, age groups and festive collections so Google can understand the page hierarchy better.",
    ],
    keywords: ['kids clothing online india', 'buy kids clothes india', 'children fashion india'],
    faqs: [
      { question: 'Do you sell kids clothing online?', answer: 'Yes, kids clothing can be listed on Jagmeen Fashion as active inventory is added.' },
      { question: 'Can I order kids clothes across India?', answer: 'Delivery is supported across India for eligible products and pin codes.' },
      { question: 'Where should I add kids keywords?', answer: 'Update the kids keywords array in frontend/lib/seo.ts after keyword research.' },
    ],
    relatedLinks: [
      { label: 'All Products', href: '/products' },
      { label: 'Contact', href: '/contact' },
      { label: 'About', href: '/about' },
    ],
  },
  'western-wear': {
    slug: 'western-wear',
    title: 'Western Wear Online India',
    metaTitle: 'Western Wear Online India - Jagmeen Fashion',
    description:
      'Explore Western wear online at Jagmeen Fashion. Shop modern tops, shirts, dresses and everyday apparel with quality manufacturing and delivery across India.',
    h1: 'Western Wear Online India',
    intro: [
      'Western wear is one of the core style directions for Jagmeen Fashion. This page should target shoppers looking for modern silhouettes, versatile outfits and easy-to-style apparel.',
      'For stronger SEO, connect this page to real product categories such as tops, shirts, dresses and t-shirts as soon as those categories exist in the backend.',
    ],
    keywords: ['western wear online india', 'buy western wear india', 'western clothing india'],
    faqs: [
      { question: 'What is Western wear?', answer: 'Western wear includes modern styles such as tops, shirts, dresses, trousers, t-shirts and casual outfits.' },
      { question: 'Does Jagmeen Fashion manufacture Western wear?', answer: 'Yes, Jagmeen Fashion is focused on Western and Indo-Western apparel manufacturing and retail.' },
      { question: 'Can brands contact Jagmeen Fashion for Western wear manufacturing?', answer: 'Yes, businesses can use the contact page for partnership and wholesale enquiries.' },
    ],
    relatedLinks: [
      { label: 'T-Shirts', href: '/t-shirts' },
      { label: 'Shirts', href: '/shirts' },
      { label: 'Manufacturer Page', href: '/western-wear-manufacturer-india' },
    ],
  },
  'indo-western-wear': {
    slug: 'indo-western-wear',
    title: 'Indo-Western Wear Online India',
    metaTitle: 'Indo-Western Wear Online India - Jagmeen Fashion',
    description:
      'Shop Indo-Western wear online at Jagmeen Fashion. Discover apparel that blends Indian styling with modern silhouettes for everyday and occasion dressing.',
    h1: 'Indo-Western Wear Online India',
    intro: [
      'Indo-Western fashion combines Indian styling cues with modern cuts, making it useful for festive, casual and semi-formal occasions. Jagmeen Fashion uses this page to give that collection its own SEO destination.',
      'As products grow, add internal links to kurtas, co-ord sets, tunics, dresses and festive edits for stronger topical authority.',
    ],
    keywords: ['indo western wear online india', 'buy indo western clothes', 'indo western fashion india'],
    faqs: [
      { question: 'What is Indo-Western wear?', answer: 'It is clothing that blends Indian-inspired styling with modern Western silhouettes.' },
      { question: 'Is Indo-Western wear suitable for daily use?', answer: 'Many Indo-Western pieces are easy to wear for daily use, office looks and casual occasions.' },
      { question: 'Where can I add researched keywords?', answer: 'Edit this page entry in frontend/lib/seo.ts and update the keywords array.' },
    ],
    relatedLinks: [
      { label: 'Kurtas', href: '/kurtas' },
      { label: 'Women', href: '/women' },
      { label: 'All Products', href: '/products' },
    ],
  },
  't-shirts': {
    slug: 't-shirts',
    title: 'T-Shirts Online India',
    metaTitle: 'T-Shirts Online India - Buy Casual T-Shirts',
    description:
      'Shop t-shirts online at Jagmeen Fashion. Explore casual t-shirts, polo styles and comfortable everyday fashion with delivery across India.',
    h1: 'T-Shirts Online India',
    intro: [
      'T-shirts are high-intent ecommerce pages because shoppers often search by fabric, fit, collar, color and occasion. This page gives Jagmeen Fashion a focused destination for t-shirt searches.',
      'Add subcategory and filter landing pages later for polo t-shirts, oversized t-shirts, round neck t-shirts and printed t-shirts when those products exist.',
    ],
    keywords: ['t shirts online india', 'buy t shirts india', 'men polo t shirt online'],
    faqs: [
      { question: 'Can I buy t-shirts from Jagmeen Fashion?', answer: 'Yes, active t-shirt products can be found through this page and product listings.' },
      { question: 'What t-shirt details should be shown?', answer: 'Every product should include fabric, fit, size, price, stock and clear images where possible.' },
      { question: 'Do t-shirts support COD?', answer: 'COD may be available for eligible orders and pin codes.' },
    ],
    relatedLinks: [
      { label: 'Men', href: '/men' },
      { label: 'Western Wear', href: '/western-wear' },
      { label: 'All Products', href: '/products' },
    ],
  },
  shirts: {
    slug: 'shirts',
    title: 'Shirts Online India',
    metaTitle: 'Shirts Online India - Buy Men & Casual Shirts',
    description:
      'Shop shirts online at Jagmeen Fashion. Explore casual, smart and everyday shirt styles with quality product details and delivery across India.',
    h1: 'Shirts Online India',
    intro: [
      'A dedicated shirts landing page helps Google separate shirt intent from broad fashion searches. Use this page for casual shirts, formal shirts and smart everyday styles as inventory grows.',
      'Keep internal links from product pages, category pages and homepage sections pointing here when shirt-related products are available.',
    ],
    keywords: ['shirts online india', 'buy shirts india', 'men shirts online'],
    faqs: [
      { question: 'Do you sell shirts online?', answer: 'Yes, shirt products can be listed here as active inventory is added.' },
      { question: 'What information helps shirt SEO?', answer: 'Fabric, fit, sleeve, collar, occasion, color and size information all help customers and search engines.' },
      { question: 'Can I contact for shirt manufacturing?', answer: 'Yes, use the contact page for bulk or manufacturing enquiries.' },
    ],
    relatedLinks: [
      { label: 'Men', href: '/men' },
      { label: 'Western Wear', href: '/western-wear' },
      { label: 'Bulk Clothing Manufacturer', href: '/bulk-clothing-manufacturer' },
    ],
  },
  kurtas: {
    slug: 'kurtas',
    title: 'Kurtas Online India',
    metaTitle: 'Kurtas Online India - Buy Kurtas at Jagmeen Fashion',
    description:
      'Shop kurtas online at Jagmeen Fashion. Explore Indo-Western and ethnic-inspired styles with quality apparel and delivery across India.',
    h1: 'Kurtas Online India',
    intro: [
      'Kurtas are a strong Indian fashion search category. This landing page should connect product listings, Indo-Western content and customer questions into one focused SEO destination.',
      'When product data supports it, create more specific pages for cotton kurtas, festive kurtas, office kurtas and short kurtas.',
    ],
    keywords: ['kurtas online india', 'buy kurta online india', 'women kurtas india'],
    faqs: [
      { question: 'Can I buy kurtas online from Jagmeen Fashion?', answer: 'Yes, active kurta products can be listed here when available in the catalog.' },
      { question: 'Are kurtas part of Indo-Western wear?', answer: 'Some kurta styles are ethnic, while others can be styled as Indo-Western outfits.' },
      { question: 'What details should a kurta product include?', answer: 'Fabric, length, fit, sleeve, occasion, wash care, price and stock details are useful for SEO and shoppers.' },
    ],
    relatedLinks: [
      { label: 'Women', href: '/women' },
      { label: 'Indo-Western Wear', href: '/indo-western-wear' },
      { label: 'All Products', href: '/products' },
    ],
  },
  'garment-manufacturer-faridabad': {
    slug: 'garment-manufacturer-faridabad',
    title: 'Garment Manufacturer in Faridabad',
    metaTitle: 'Garment Manufacturer in Faridabad - Jagmeen Fashion',
    description:
      'Jagmeen Fashion is a garment manufacturer in Faridabad, Haryana, producing Western and Indo-Western apparel for brands, retailers and wholesale buyers.',
    h1: 'Garment Manufacturer in Faridabad',
    intro: [
      'Jagmeen Fashion is located in Faridabad, Haryana, and works on quality garment manufacturing for fashion businesses. This page is built for local and B2B search intent, not just retail shoppers.',
      'Use this page to explain manufacturing capabilities, product categories, quality expectations, contact process and service areas. Add case studies, factory photos and certifications when available.',
    ],
    keywords: ['garment manufacturer Faridabad', 'clothing manufacturer Haryana', 'apparel manufacturer Faridabad'],
    faqs: [
      { question: 'Where is Jagmeen Fashion located?', answer: 'Jagmeen Fashion is located at Khedi Road, Sector-87, Faridabad, Haryana 121002.' },
      { question: 'Do you work with retailers and brands?', answer: 'Yes, Jagmeen Fashion can support brands, retailers, wholesalers and fashion businesses.' },
      { question: 'How can I contact for manufacturing enquiries?', answer: `Call ${SUPPORT_PHONE} or email ${SUPPORT_EMAIL} for business enquiries.` },
    ],
    relatedLinks: [
      { label: 'Western Wear Manufacturer', href: '/western-wear-manufacturer-india' },
      { label: 'Bulk Clothing Manufacturer', href: '/bulk-clothing-manufacturer' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  'western-wear-manufacturer-india': {
    slug: 'western-wear-manufacturer-india',
    title: 'Western Wear Manufacturer India',
    metaTitle: 'Western Wear Manufacturer India - Jagmeen Fashion',
    description:
      'Jagmeen Fashion manufactures Western wear in India for brands, retailers and wholesale buyers with a focus on quality, consistency and timely delivery.',
    h1: 'Western Wear Manufacturer India',
    intro: [
      'For B2B searchers, this page explains Jagmeen Fashion as a Western wear manufacturing partner in India. It should be connected from About, Contact and product category pages.',
      'Add real manufacturing photos, MOQ details, product capabilities, fabric options and production timelines as your business information becomes final.',
    ],
    keywords: ['western wear manufacturer India', 'western clothing manufacturer India', 'apparel manufacturer India'],
    faqs: [
      { question: 'Does Jagmeen Fashion manufacture Western wear?', answer: 'Yes, Jagmeen Fashion focuses on Western and Indo-Western apparel manufacturing.' },
      { question: 'Can wholesale buyers contact Jagmeen Fashion?', answer: 'Yes, wholesale and business enquiries can be sent through the contact page.' },
      { question: 'What products can be manufactured?', answer: 'Western wear categories may include tops, shirts, t-shirts, dresses and related apparel depending on the requirement.' },
    ],
    relatedLinks: [
      { label: 'Garment Manufacturer Faridabad', href: '/garment-manufacturer-faridabad' },
      { label: 'Western Wear', href: '/western-wear' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  'bulk-clothing-manufacturer': {
    slug: 'bulk-clothing-manufacturer',
    title: 'Bulk Clothing Manufacturer India',
    metaTitle: 'Bulk Clothing Manufacturer India - Jagmeen Fashion',
    description:
      'Contact Jagmeen Fashion for bulk clothing manufacturing in India. We support Western and Indo-Western apparel requirements for fashion businesses.',
    h1: 'Bulk Clothing Manufacturer India',
    intro: [
      'This page targets buyers who are not looking for one product, but a manufacturing partner. Explain your bulk order process, quality checks, timelines and communication workflow here.',
      'For stronger conversion and SEO, add minimum order quantity, product categories, fabric options, sample process and original factory images once available.',
    ],
    keywords: ['bulk clothing manufacturer India', 'wholesale garment manufacturer', 'bulk apparel manufacturing India'],
    faqs: [
      { question: 'Does Jagmeen Fashion accept bulk clothing enquiries?', answer: 'Yes, businesses can contact Jagmeen Fashion for bulk and wholesale manufacturing enquiries.' },
      { question: 'Where is the manufacturing business located?', answer: 'Jagmeen Fashion is based in Faridabad, Haryana.' },
      { question: 'How do I start a bulk order discussion?', answer: `Call ${SUPPORT_PHONE}, email ${SUPPORT_EMAIL}, or send a message from the contact page.` },
    ],
    relatedLinks: [
      { label: 'Contact', href: '/contact' },
      { label: 'Garment Manufacturer Faridabad', href: '/garment-manufacturer-faridabad' },
      { label: 'Western Wear Manufacturer', href: '/western-wear-manufacturer-india' },
    ],
  },
};

export function getLandingPage(slug: string) {
  return landingPages[slug as LandingPageSlug] || null;
}

export function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function truncateText(text: string, maxLength = 155) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

export function buildPageMetadata(page: LandingPageSeo): Metadata {
  return {
    title: page.metaTitle,
    description: truncateText(page.description),
    keywords: page.keywords,
    alternates: { canonical: `${SITE_URL}/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: truncateText(page.description),
      url: `${SITE_URL}/${page.slug}`,
      type: 'website',
      siteName: SITE_NAME,
      images: [{ url: '/jagmeen_logo.png', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: truncateText(page.description),
      images: ['/jagmeen_logo.png'],
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFaqJsonLd(faqs: SeoFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
