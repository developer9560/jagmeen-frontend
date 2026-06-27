import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const siteUrl = "https://jagmeenfashion.com";
const siteName = "Jagmeen Fashion";
const supportEmail = "jagmeensupportteam@gmail.com";
const supportPhone = "+91-8809578544";

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

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/jagmeen_logo.png`,
  image: `${siteUrl}/jagmeen_logo.png`,
  description:
    "Jagmeen Fashion is a Faridabad-based garment manufacturer and online clothing store for Western and Indo-Western apparel in India.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Khedi Road, Sector-87",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    postalCode: "121002",
    addressCountry: "IN",
  },
  telephone: supportPhone,
  email: supportEmail,
  sameAs: [
    "https://www.instagram.com/jagmeenfashion",
    "https://www.facebook.com/jagmeenfashion",
    "https://x.com/jagmeenfashion",
  ],
  openingHours: "Mo-Sa 09:30-18:00",
  priceRange: "INR",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/jagmeen_logo.png`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: supportPhone,
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  ],
  sameAs: [
    "https://www.instagram.com/jagmeenfashion",
    "https://www.facebook.com/jagmeenfashion",
    "https://x.com/jagmeenfashion",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jagmeen Fashion - Women & Men Clothing Online India",
    template: "%s | Jagmeen Fashion",
  },
  description:
    "Shop Western and Indo-Western clothing for women and men at Jagmeen Fashion. Quality garments, fair prices, and delivery across India.",
  keywords: [
    "Jagmeen Fashion",
    "online clothing store India",
    "Western wear India",
    "Indo-Western clothing",
    "women fashion online",
    "men fashion India",
    "garment manufacturer Faridabad",
    "affordable fashion India",
  ],
  openGraph: {
    type: "website",
    siteName,
    title: "Jagmeen Fashion - Clothing Online India",
    description:
      "Discover quality Western and Indo-Western fashion from Jagmeen Fashion, based in Faridabad, Haryana.",
    url: siteUrl,
    images: [{ url: "/jagmeen_logo.png", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jagmeen Fashion - Clothing Online India",
    description: "Shop quality Western and Indo-Western clothing online at Jagmeen Fashion.",
    images: ["/jagmeen_logo.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
                    borderRadius: "0",
                    background: "#333",
                    color: "#fff",
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
