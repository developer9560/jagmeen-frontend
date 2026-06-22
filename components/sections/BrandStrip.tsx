import { BRANDS } from '@/lib/constants';

export default function BrandStrip() {
  return (
    <section className="py-12 border-y border-gray-100 bg-cream/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted mb-8">
          Featured Partners
        </p>
        
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center flex-wrap gap-8">
          {BRANDS.map((brand, index) => (
            <div 
              key={index}
              className="text-2xl lg:text-3xl font-heading font-bold text-gray-400 hover:text-primary transition-colors cursor-pointer"
              style={{ letterSpacing: '0.2em' }}
            >
              {brand.logo}
            </div>
          ))}
        </div>

        {/* Mobile View (Marquee) */}
        <div className="md:hidden flex overflow-hidden relative w-full">
          <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
            {/* Double the list for seamless looping */}
            {[...BRANDS, ...BRANDS].map((brand, index) => (
              <div 
                key={index}
                className="text-xl font-heading font-bold text-gray-400"
                style={{ letterSpacing: '0.2em' }}
              >
                {brand.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
