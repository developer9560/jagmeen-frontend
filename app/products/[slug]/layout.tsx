import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.3dreamprint.cloud'}/api/products/get/${slug}`, { next: { revalidate: 3600 } });
    const productData = await res.json();
    
    if (productData?.data) {
      const product = productData.data;
      const primaryImage = product.images?.find((img: any) => img.is_primary)?.image_url || product.images?.[0]?.image_url || '';
      
      return {
        title: `${product.name} — Buy Online at Best Price | Jagmeen Fashion`,
        description: `Buy ${product.name} online at Jagmeen Fashion. Price: ₹${product.price}. ${product.summary ? product.summary.slice(0, 100) : ''} Free delivery in India.`,
        alternates: { canonical: `https://jagmeenfashion.com/products/${slug}` },
        openGraph: {
          images: primaryImage ? [{ url: primaryImage, width: 800, height: 800 }] : [],
        },
      };
    }
  } catch (error) {
    console.error("Error fetching product for metadata:", error);
  }

  return {
    title: 'Product | Jagmeen Fashion',
  };
}

export default async function ProductLayout({ children, params }: Props) {
  const { slug } = await params;
  let jsonLd = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.3dreamprint.cloud/'}/api/products/get/${slug}`, { next: { revalidate: 3600 } });
    const productData = await res.json();
    
    if (productData?.data) {
      const product = productData.data;
      const primaryImage = product.images?.find((img: any) => img.is_primary)?.image_url || product.images?.[0]?.image_url || '';
      
      jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": primaryImage ? [primaryImage] : [],
        "description": product.summary || product.name,
        "brand": {
          "@type": "Brand",
          "name": "Jagmeen Fashion"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://jagmeenfashion.com/products/${slug}`,
          "priceCurrency": "INR",
          "price": product.price,
          "availability": product.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      };
    }
  } catch (error) {}

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
