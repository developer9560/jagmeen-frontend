import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Jagmeen Fashion — Address, Phone, Instagram',
  description: 'Get in touch with Jagmeen Fashion. Visit our store or shop online at jagmeenfashion.com. Follow us on Instagram @jagmeenfashion.',
  alternates: { canonical: 'https://jagmeenfashion.com/contact' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
