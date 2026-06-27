'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
 MessageSquare,
} from 'lucide-react';

const FacebookIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'jagmeensupportteam@gmail.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:jagmeensupportteam@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 8809578544',
    sub: 'Mon – Sat, 9:30 AM – 6 PM IST',
    href: 'tel:+918809578544',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Khedi Road , Sector-87',
    sub: 'Faridabad Haryana – 121002, India',
    href: 'https://maps.app.goo.gl/hEGnGJAE4NSW3x6CA?g_st=aw',
  },
  // {
  //   icon: Clock,
  //   label: 'Business Hours',
  //   value: 'Mon – Sat: 10 AM – 7 PM',
  //   sub: 'Sunday: Closed',
  //   href: null,
  // },
];

const FAQ_ITEMS = [
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 3–7 business days. Express delivery (2-3 days) is available in select cities at checkout.',
  },
  {
    q: 'Can I return or exchange a product?',
    a: 'Yes! We offer hassle-free exchange within 7 days of delivery for eligible items. Visit your Orders page to initiate a exchange, But not Return.',
  },
  {
    q: 'Are your products authentic?',
    a: 'Absolutely. Every product on Jagmeen Fashion is sourced directly from verified manufacturers and artisans. We do not stock replicas.',
  },
  {
    q: 'Do you offer COD (Cash on Delivery)?',
    a: 'Yes, COD is available for orders below ₹5,000 in most pin codes across India.',
  },
];

const SUBJECTS = [
  'Order Issue',
  'Return / Exchange',
  'Product Inquiry',
  'Payment Problem',
  'Account Help',
  'Partnership / Wholesale',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.3dreamprint.cloud/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong. Please try again.');
      }
      
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full border border-gray-200 bg-white px-4 py-3 text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors';

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 40px), repeating-linear-gradient(90deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 40px)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 mb-6">
              <MessageSquare size={14} className="text-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-widest">Get in Touch</span>
            </div>
            <h1 className="font-heading italic text-5xl md:text-7xl text-white leading-tight mb-6">
              We'd Love to<br />
              <span className="text-gold">Hear from You</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              Whether you have a question about an order, need styling advice, or just want to say hello — our team is here for you.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Contact Cards ────────────────────────────────────────────────── */}
      <section className="bg-cream border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200">
            {CONTACT_CARDS.map((card, i) => (
              <div
                key={card.label}
                className={`p-8 ${i < CONTACT_CARDS.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-gray-200' : ''} group`}
              >
                <div className="w-10 h-10 bg-primary flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300">
                  <card.icon size={18} className="text-gold group-hover:text-primary transition-colors duration-300" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-2">{card.label}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:text-gold transition-colors block mb-1 text-sm"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="font-medium text-primary block mb-1 text-sm">{card.value}</p>
                )}
                <p className="text-xs text-muted">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Form + Sidebar ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* ── Contact Form ── */}
          <div className="lg:col-span-3">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Send a Message</p>
            <h2 className="font-heading italic text-4xl text-primary mb-8">
              How Can We Help?
            </h2>

            {submitted ? (
              /* ── Success state ── */
              <div className="border border-gold/30 bg-cream p-10 text-center animate-fade-in">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-gold" />
                </div>
                <h3 className="font-heading italic text-3xl text-primary mb-3">
                  Message Received!
                </h3>
                <p className="text-charcoal/60 mb-6">
                  Thank you, <strong className="text-primary">{form.name}</strong>! We've received your message and will get back
                  to you at <strong className="text-primary">{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="text-sm uppercase tracking-widest font-bold text-gold hover:text-primary transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-charcoal mb-2">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-charcoal mb-2">
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-charcoal mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-charcoal mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`${inputCls} text-${form.subject ? 'charcoal' : 'gray-400'}`}
                    >
                      <option value="" disabled>Select a subject</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-charcoal mb-2">
                    Your Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    required
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-2 space-y-10">
            {/* FAQ Accordion */}
            <div>
              <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Quick Answers</p>
              <h2 className="font-heading italic text-3xl text-primary mb-6">Common Questions</h2>
              <div className="divide-y divide-gray-100 border border-gray-100">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-cream transition-colors"
                    >
                      <span className="text-sm font-medium text-primary">{item.q}</span>
                      <span className={`text-gold flex-shrink-0 text-xl font-light leading-none transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 animate-fade-in">
                        <p className="text-sm text-charcoal/60 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-cream border border-gold/20 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Follow Us</p>
              <h3 className="font-heading italic text-2xl text-primary mb-5">Stay Connected</h3>
              <p className="text-sm text-charcoal/60 mb-6">
                Join our community for style inspiration, exclusive drops, and behind-the-scenes content.
              </p>
              <div className="flex gap-3">
                {[
                  // { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
                  { label: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center gap-2 px-4 py-3 bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-gold transition-colors"
                  >
                    <s.icon size={14} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918809578544"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-gray-200 p-6 hover:border-gold hover:bg-cream transition-all group"
            >
              <div className="w-12 h-12 bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.849L.072 23.999l6.357-1.437A11.936 11.936 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.001-1.371l-.36-.213-3.721.84.878-3.608-.234-.37A9.79 9.79 0 012.182 12C2.182 6.573 6.573 2.182 12 2.182S21.818 6.573 21.818 12 17.427 21.818 12 21.818z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium text-primary text-sm group-hover:text-gold transition-colors">Chat on WhatsApp</p>
                <p className="text-xs text-muted mt-0.5">Fastest response — usually within minutes</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Map Section ──────────────────────────────────────────────────── */}
      
    </main>
  );
}
