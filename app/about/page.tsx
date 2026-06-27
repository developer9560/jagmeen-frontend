import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Heart, Globe, Award, Users, Leaf, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Jagmeen Fashion',
  description:
    'Learn about Jagmeen Fashion — our story, mission, values, and commitment to bringing you the finest curated fashion from India and beyond.',
};

const VALUES = [
  {
    icon: Heart,
    title: 'Passion for Craft',
    desc: 'Every piece in our collection is handpicked and sustainable fashion with a deep love for craftsmanship, texture, and detail that elevates everyday dressing.',
  },
  // {
  //   icon: Leaf,
  //   title: 'Conscious Fashion',
  //   desc: 'We are committed to responsible sourcing and partnering with artisans who share our belief in fair wages and sustainable practices.',
  // },
  {
    icon: Users,
    title: 'Community First',
    desc: 'Jagmeen Fashion was built around community — celebrating the diversity of style across every city, culture, and occasion.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    desc: 'From fabric to finish, we set exacting standards so that every order you receive feels like an investment, not just a purchase.',
  },
  // {
  //   icon: Globe,
  //   title: 'Rooted in India',
  //   desc: 'Deeply proud of Indian textile heritage — we champion weavers, dyers, and artisan clusters from across the subcontinent.',
  // },
  {
    icon: Sparkles,
    title: 'Curated Beauty',
    desc: "Our buyers travel, research, and obsess over trends so your feed — and wardrobe — only ever reflects what's truly beautiful.",
  },
];

const MILESTONES = [
  { year: '2019', label: 'Founded', desc: 'Jagmeen Fashion launched as a passion project from a small studio in Delhi.' },
  { year: '2020', label: 'First 1,000 Orders', desc: 'Within our first year, 1,000 customers trusted us with their style.' },
  { year: '2022', label: 'National Reach', desc: 'Expanded delivery to all 28 states and 8 union territories across India.' },
  { year: '2024', label: '50,000+ Customers', desc: 'Our community of fashion lovers continues to grow every single day.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-primary overflow-hidden">
  {/* Decorative gold orbs */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

  <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-28 md:py-40">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* Left Column */}
      <div>
        <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-6 animate-fade-in">
          Our Story
        </p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 animate-fade-in-up">
          Dressed in<br />
          <span className="text-gold text-5xl lg:text-8xl py-0">Purpose</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed animate-fade-in-up delay-200">
          Jagmeen Fashion was established from a simple belief — that great style should be accessible,
          intentional, and deeply personal. We curate fashion that tells your story.
        </p>
      </div>

      {/* Right Column */}
      <div className=" p-8  backdrop-blur-sm animate-fade-in-up delay-300">
        <p className="text-white/75 text-base md:text-lg leading-relaxed mb-5">
          Jagmeen Fashion is a garment manufacturing company located in Faridabad, Haryana, dedicated to
          producing premium-quality Western and Indo-Western apparel for brands, retailers, wholesalers,
          and fashion businesses.
        </p>
        <p className="text-white/75 text-base md:text-lg leading-relaxed mb-5">
          Our focus is on quality, consistency, timely delivery, and customer satisfaction. With a
          commitment to excellence, we work closely with our clients to transform design concepts into
          market-ready garments that reflect current fashion trends and consumer demands.
        </p>
        <p className="text-white/75 text-base md:text-lg leading-relaxed">
          Whether serving domestic markets or supporting international business opportunities, Jagmeen
          Fashion strives to be a trusted manufacturing partner for growing fashion brands.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* ─── Story Section ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">Who We Are</p>
            <h2 className="font-heading italic text-4xl md:text-5xl text-primary leading-tight mb-8">
              More Than a Fashion Store
            </h2>
            <div className="space-y-5 text-charcoal/70 leading-relaxed">
              <p>
                Jagmeen Fashion began in 2024 in a manufacturing unit in Faridabad Haryana, where our founder
                Jagmeen — a textile enthusiast and lifelong admirer of Sustainable Fashion — started curating
                clothing that blended tradition with modern sensibility.
              </p>
              <p>
                What started as a personal project quickly found an audience of peoples who were tired
                of fast fashion and craved pieces with soul. Today, we are proud to serve customers
                across every corner of India, offering a carefully edited wardrobe for every mood,
                season, and occasion.
              </p>
              <p>
                We believe fashion is not just what you wear — it is how you feel, what you value,
                and the story you choose to tell. That is why every collection we build begins with
                a question: <em className="text-primary font-medium">Does this make someone feel extraordinary?</em>
              </p>
            </div>
          </div>

          {/* Decorative quote block */}
          <div className="relative">
            <div className="bg-cream border border-gold/20 p-5 md:p-7">
              {/* <span className="font-heading italic text-7xl text-gold/30 leading-none block -mt-4 mb-2">"</span> */}
              <blockquote className="font-heading italic text-xl md:text-2xl text-primary  leading-relaxed mb-4">
                " Fashion is the armour to survive the reality of everyday life. "
              </blockquote>
              {/* <cite className="text-xs uppercase tracking-widest text-muted font-bold not-italic">
                — Bill Cunningham
              </cite> */}
            </div>
            {/* Gold accent line */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10" />
          </div>
        </div>
      </section>

      {/* ─── Values Grid ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">What We Stand For</p>
            <h2 className="font-heading italic text-4xl md:text-5xl text-primary">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={`bg-white border border-gray-100 p-8 hover:border-gold/40 hover:shadow-lg transition-all duration-300 group animate-fade-in-up delay-${(i + 1) * 100}`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-primary group-hover:bg-gold transition-colors duration-300 mb-6">
                  <v.icon size={22} className="text-gold group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="font-heading italic text-xl text-primary mb-3">{v.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-primary py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">Join Us</p>
          <h2 className="font-heading italic text-4xl md:text-6xl text-white mb-6">
            Start Your Style Journey
          </h2>
          <p className="text-white/50 mb-10 text-lg">
            Explore our latest collections and discover fashion that truly speaks to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gold text-primary px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
