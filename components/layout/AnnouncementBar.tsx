'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-white text-xs tracking-[0.2em] uppercase py-2.5 px-4 relative overflow-hidden transition-all duration-500 ease-in-out font-body">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <p className="text-center">
          Free Shipping on orders over $150 &nbsp;|&nbsp; Use code{' '}
          <span className="text-gold font-semibold">LUXE20</span> for 20% off
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
          aria-label="Close announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
