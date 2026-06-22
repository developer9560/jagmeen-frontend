import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Bell, UserCheck, Trash2, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Jagmeen Fashion',
  description:
    'Understand how Jagmeen Fashion collects, uses, and protects your personal information. Your privacy is our priority.',
};

const LAST_UPDATED = 'June 23, 2026';

const SECTIONS = [
  {
    id: 'information-we-collect',
    icon: Eye,
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Information You Provide',
        text: 'When you create an account, place an order, or contact us, we collect personal details such as your name, email address, phone number, shipping address, and payment information. We only collect what is necessary to serve you.',
      },
      {
        subtitle: 'Information Collected Automatically',
        text: 'When you visit our website, we automatically collect certain information about your device, including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This helps us understand how you use our platform and improve your experience.',
      },
      {
        subtitle: 'Cookies & Tracking',
        text: 'We use cookies and similar tracking technologies to remember your preferences, keep items in your cart, and personalise your browsing experience. You can control cookie settings through your browser preferences at any time.',
      },
    ],
  },
  {
    id: 'how-we-use-information',
    icon: UserCheck,
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: 'Order Fulfilment',
        text: 'We use your personal information to process and deliver your orders, send order confirmations and shipping notifications, and handle returns or exchanges.',
      },
      {
        subtitle: 'Communication',
        text: 'We may send you transactional emails such as order updates, receipts, and shipping confirmations. With your consent, we may also send marketing communications about new arrivals, exclusive offers, and promotions. You can unsubscribe at any time.',
      },
      {
        subtitle: 'Service Improvement',
        text: 'We analyse usage data to understand our customers better, improve our website, fix bugs, and develop new features. This data is used in aggregate and anonymised where possible.',
      },
      {
        subtitle: 'Security & Fraud Prevention',
        text: 'We use your information to verify your identity, protect against fraudulent transactions, and keep our platform secure for all users.',
      },
    ],
  },
  {
    id: 'sharing-information',
    icon: Shield,
    title: 'Sharing Your Information',
    content: [
      {
        subtitle: 'We Never Sell Your Data',
        text: 'Jagmeen Fashion does not sell, rent, or trade your personal information to third parties for their marketing purposes under any circumstances.',
      },
      {
        subtitle: 'Trusted Service Partners',
        text: 'We share your data only with trusted partners who help us operate our business — such as payment processors (Razorpay, UPI gateways), logistics providers, and cloud hosting services. All partners are contractually bound to handle your data securely and only for the purpose we specify.',
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, court order, or government regulation, or when necessary to protect the rights, property, or safety of Jagmeen Fashion, our customers, or the public.',
      },
    ],
  },
  {
    id: 'data-security',
    icon: Lock,
    title: 'Data Security',
    content: [
      {
        subtitle: 'How We Protect You',
        text: 'We implement industry-standard security measures including SSL/TLS encryption for all data in transit, secure servers, regular security audits, and access controls to protect your personal information from unauthorised access, alteration, disclosure, or destruction.',
      },
      {
        subtitle: 'Payment Security',
        text: 'We do not store full credit or debit card numbers on our servers. All payment transactions are processed through PCI-DSS compliant payment gateways. Your financial information is encrypted and never stored on our systems.',
      },
      {
        subtitle: 'Data Breach Response',
        text: 'In the unlikely event of a data breach, we will notify affected users within 72 hours of discovering the breach and take immediate steps to contain the situation and minimise harm.',
      },
    ],
  },
  {
    id: 'your-rights',
    icon: Bell,
    title: 'Your Rights',
    content: [
      {
        subtitle: 'Access & Portability',
        text: 'You have the right to request a copy of the personal data we hold about you at any time. We will provide it in a structured, commonly used, machine-readable format.',
      },
      {
        subtitle: 'Correction',
        text: 'If any information we hold about you is inaccurate or incomplete, you have the right to request that we correct or update it. You can update most information directly from your account settings.',
      },
      {
        subtitle: 'Deletion',
        text: 'You have the right to request deletion of your personal data. We will honour such requests subject to our legal obligations. Note that some information may be retained for legal, financial, or security reasons.',
      },
      {
        subtitle: 'Marketing Opt-Out',
        text: 'You can unsubscribe from marketing emails at any time by clicking the "Unsubscribe" link in any email we send, or by emailing us at privacy@jagmeenfashion.com.',
      },
    ],
  },
  {
    id: 'data-retention',
    icon: Trash2,
    title: 'Data Retention',
    content: [
      {
        subtitle: 'How Long We Keep Your Data',
        text: 'We retain your account information for as long as your account is active or as needed to provide services. Order records are retained for 7 years to comply with tax and accounting regulations. After your account is deleted, we anonymise or delete your personal data within 30 days.',
      },
    ],
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact & Grievances',
    content: [
      {
        subtitle: 'Privacy Questions',
        text: 'If you have questions, concerns, or complaints about this Privacy Policy or our data practices, please contact our Privacy Officer at privacy@jagmeenfashion.com. We will respond within 3 business days.',
      },
      {
        subtitle: 'Grievance Officer',
        text: 'In accordance with the Information Technology Act, 2000, and the rules made thereunder, our Grievance Officer is available at: grievance@jagmeenfashion.com. Any grievance should be submitted with your name, contact details, and a description of the concern.',
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 mb-6">
              <Shield size={14} className="text-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-widest">Legal</span>
            </div>
            <h1 className="font-heading italic text-5xl md:text-7xl text-white leading-tight mb-6">
              Privacy<br />Policy
            </h1>
            <p className="text-white/50 text-sm">
              Last updated: <span className="text-white/80 font-medium">{LAST_UPDATED}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* ─── Sticky Table of Contents ───────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Contents</p>
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-charcoal/60 hover:text-primary py-1.5 border-l-2 border-transparent hover:border-gold pl-3 transition-all"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </aside>

          {/* ─── Main Content ────────────────────────────────────────────── */}
          <article className="lg:col-span-3 space-y-16">
            {/* Intro */}
            <div className="bg-cream border border-gold/20 p-8">
              <p className="text-charcoal/70 leading-relaxed">
                At <strong className="text-primary">Jagmeen Fashion</strong>, your privacy is not just a policy — it is a promise.
                This Privacy Policy explains how we collect, use, share, and protect the personal information
                you provide when you shop with us, visit our website, or interact with us in any way.
                Please read it carefully. By using our services, you agree to the terms described below.
              </p>
            </div>

            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-20">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 flex-shrink-0 bg-primary flex items-center justify-center">
                    <section.icon size={18} className="text-gold" />
                  </div>
                  <h2 className="font-heading italic text-2xl md:text-3xl text-primary">{section.title}</h2>
                </div>

                {/* Subsections */}
                <div className="space-y-8">
                  {section.content.map((item) => (
                    <div key={item.subtitle}>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-charcoal/65 leading-relaxed text-[15px]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Footer Note */}
            <div className="bg-primary p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-white font-medium mb-1">Questions about your privacy?</p>
                <p className="text-white/50 text-sm">We are always happy to help. Reach out to our team.</p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-gold text-primary px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Contact Us <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
