import Link from 'next/link';

export default function SaleBanner() {
  return (
    <section className="relative bg-primary overflow-hidden w-full py-20 md:py-32 flex items-center justify-center border-y-4 border-gold/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 gold-shimmer opacity-20"></div>
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <p className="text-gold tracking-[0.4em] uppercase text-xs md:text-sm font-bold mb-6 animate-fade-in-down">
          Limited Time Offer
        </p>
        
        <h2 className="font-heading italic text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-none animate-fade-in-up delay-100">
          The Grand Summer Sale
        </h2>
        
        <div className="flex items-center gap-4 mb-8 animate-fade-in-up delay-200">
          <div className="h-[1px] w-12 bg-gold/50"></div>
          <p className="font-body text-xl md:text-2xl text-white/80">
            Up to <span className="text-gold font-bold">70% Off</span> on Selected Styles
          </p>
          <div className="h-[1px] w-12 bg-gold/50"></div>
        </div>
        
        <Link 
          href="/sale" 
          className="bg-gold text-primary font-bold uppercase tracking-widest text-sm px-10 py-4 hover:bg-white hover:scale-105 transition-all duration-300 animate-fade-in-up delay-300"
        >
          Shop the Sale
        </Link>
      </div>
    </section>
  );
}
