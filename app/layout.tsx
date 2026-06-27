import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://jagmeenfashion.com'),
  title: {
    default: 'Jagmeen Fashion — Women & Men Clothing Online India',
    template: '%s | Jagmeen Fashion',
  },
  description: 'Shop latest fashion for women, men & kids at Jagmeen Fashion. Best price kurtas, dresses, jeans, tops & more. Free delivery across India.',
  keywords: [
    'jagmeen ,Jagmeen Fashion', 'online clothing store India',
    'women fashion online', 'men fashion India',
    'buy kurta online', 'affordable fashion India'
  ],
  openGraph: {
    type: 'website',
    siteName: 'Jagmeen Fashion',
    url: 'https://jagmeenfashion.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: { google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE' },
};


// export const metadata: Metadata = {
//   title: "Jagmeen Fashion — Luxury Fashion & Designer Clothing",
//   description:
//     "Discover curated collections of designer clothing, accessories, and luxury fashion at Jagmeen Fashion. Free shipping on orders over $150.",
//   keywords: [
//     "luxury fashion",
//     "designer clothing",
//     "women's fashion",
//     "men's fashion",
//     "accessories",
//     "Jagmeen Fashion",
//   ],
//   openGraph: {
//     title: "Jagmeen Fashion — Luxury Fashion & Designer Clothing",
//     description:
//       "Discover curated collections of designer clothing, accessories, and luxury fashion.",
//     type: "website",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ClothingStore",
            "name": "Jagmeen Fashion",
            "url": "https://jagmeenfashion.com",
            "logo": "https://jagmeenfashion.com/logo.png",
            "image": "https://jagmeenfashion.com/store-image.jpg",
            "description": "Online clothing store for women, men & kids in India.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "YOUR FULL STREET ADDRESS",
              "addressLocality": "YOUR CITY",
              "addressRegion": "YOUR STATE",
              "postalCode": "YOUR PINCODE",
              "addressCountry": "IN"
            },
            "telephone": "+91-XXXXXXXXXX",
            "email": "contact@jagmeenfashion.com",
            "sameAs": [
              "https://www.instagram.com/jagmeenfashion",
              "https://www.facebook.com/jagmeenfashion"
            ],
            "openingHours": "Mo-Su 09:00-21:00",
            "priceRange": "₹₹",
            "servesCuisine": null
          })}}
        />
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <Toaster 
                position="top-right" 
                toastOptions={{
                  duration: 4000,
                  style: {
                    borderRadius: '0',
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
