'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="relative z-10 text-center px-16">
          <Link href="/" className="inline-block mb-12">
            <h1 className="font-heading italic text-5xl font-bold text-white tracking-wide">
              Jagmeen Fashion
            </h1>
          </Link>
          <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-6">
            Luxury Redefined
          </p>
          <p className="font-heading italic text-3xl text-white/80 leading-relaxed">
            Where elegance meets everyday style
          </p>
          <div className="mt-16 w-48 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-rose/10 rounded-full blur-3xl" />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col bg-cream">
        <div className="lg:hidden p-6 border-b border-gray-200/60 bg-white">
          <Link href="/">
            <h1 className="font-heading italic text-3xl font-bold text-primary tracking-wide text-center">
              Jagmeen Fashion
            </h1>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12 md:px-12">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="mb-10">
              <h2 className="font-heading italic text-4xl text-primary mb-3">{title}</h2>
              <p className="text-charcoal/60 text-sm">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
