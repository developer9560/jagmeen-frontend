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
  
  if (slug === 'women') {
    return {
      title: 'Women\'s Clothing Online India — Kurtas, Dresses, Tops',
      description: 'Shop women\'s kurtas, dresses, lehengas, tops & ethnic wear at Jagmeen Fashion. Best prices, latest trends. Order now & get free delivery in India.',
      alternates: { canonical: `https://jagmeenfashion.com/category/${slug}` },
    };
  }
  
  if (slug === 'men') {
    return {
      title: 'Men\'s Clothing Online India — Shirts, Kurtas, Jeans',
      description: 'Shop men\'s shirts, kurtas, jeans, trousers & more at Jagmeen Fashion. Trendy and affordable men\'s fashion. Fast delivery across India.',
      alternates: { canonical: `https://jagmeenfashion.com/category/${slug}` },
    };
  }

  // Fallback for other categories
  const formattedSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${formattedSlug} Clothing Online India | Jagmeen Fashion`,
    description: `Shop the latest ${formattedSlug} clothing online at Jagmeen Fashion. Get trendy fashion with free delivery across India.`,
    alternates: { canonical: `https://jagmeenfashion.com/category/${slug}` },
  };
}

export default async function CategoryLayout({ children }: Props) {
  return <>{children}</>;
}
