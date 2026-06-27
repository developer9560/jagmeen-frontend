import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Jagmeen Fashion - Faridabad Address, Phone & Email',
  description:
    'Contact Jagmeen Fashion in Faridabad, Haryana. Call +91 8809578544, email jagmeensupportteam@gmail.com, or follow @jagmeenfashion on Instagram.',
  keywords: [
    'Jagmeen Fashion contact',
    'Jagmeen Fashion Faridabad address',
    'Jagmeen Fashion phone number',
    'Jagmeen Fashion Instagram',
    'garment manufacturer Faridabad contact',
  ],
  alternates: { canonical: 'https://jagmeenfashion.com/contact' },
  openGraph: {
    title: 'Contact Jagmeen Fashion',
    description:
      'Reach Jagmeen Fashion at Khedi Road, Sector-87, Faridabad, Haryana 121002.',
    url: 'https://jagmeenfashion.com/contact',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
