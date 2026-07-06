'use client';

import React from 'react';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';

export default function FloatingWhatsApp() {
  const phone = '918809578544';
  const text = encodeURIComponent('Hi Jagmeen Fashion 👋');
  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-[9999] right-4 bottom-4 md:right-6 md:bottom-6 bg-[#25D366] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
    >
      <SiWhatsapp color="#ffffff" size={22} title="WhatsApp" />
    </a>
  );
}
