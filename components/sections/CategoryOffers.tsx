import Link from 'next/link';
import { CATEGORY_OFFERS } from '@/lib/constants';

export default function CategoryOffers() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading italic text-4xl md:text-5xl text-primary mb-4">
            Curated Collections
          </h2>
          <div className="w-24 h-[2px] bg-gold mx-auto mb-6"></div>
          <p className="text-charcoal/70 max-w-2xl mx-auto text-lg">
            Explore our handpicked selections designed for every occasion, blending timeless elegance with contemporary trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CATEGORY_OFFERS.map((offer, index) => (
            <Link 
              key={index}
              href={offer.href}
              className="group relative h-[450px] rounded-2xl overflow-hidden flex flex-col justify-end p-8 transform transition-transform duration-500 hover:-translate-y-2"
            >
              {/* Abstract Background Gradient based on index */}
              <div className={`absolute inset-0 z-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110
                ${index === 0 ? 'from-primary via-charcoal to-primary' : 
                  index === 1 ? 'from-primary via-[#2a2a2a] to-primary' : 
                  'from-[#1a1a1a] via-primary to-charcoal'}`}
              >
                {/* Decorative abstract shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose/5 rounded-full blur-2xl"></div>
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>

              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 z-20 border-2 border-gold/0 rounded-2xl transition-colors duration-500 group-hover:border-gold/50 shadow-[inset_0_0_0_0_rgba(201,168,76,0)] group-hover:shadow-[inset_0_0_20px_0_rgba(201,168,76,0.2)]"></div>

              {/* Content */}
              <div className="relative z-30 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="text-gold uppercase tracking-widest text-xs font-bold mb-3">
                  {offer.subtitle}
                </p>
                <h3 className="font-heading italic text-3xl md:text-4xl text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-white/70 font-body mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {offer.description}
                </p>
                
                <div className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wider group-hover:text-gold transition-colors">
                  Explore Now
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
