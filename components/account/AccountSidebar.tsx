'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, MapPin, LogOut, PackageCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ACCOUNT_LINKS = [
  { label: 'My Profile', href: '/account/profile', icon: User },
  { label: 'My Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'My Orders', href: '/account/orders', icon: PackageCheck },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white border border-gray-100 p-6 lg:sticky lg:top-28">
        <div className="mb-8 pb-6 border-b border-gray-100">
          <p className="text-xs tracking-widest uppercase text-gold font-bold mb-2">My Account</p>
          <h2 className="font-heading italic text-2xl text-primary">{user?.name}</h2>
          <p className="text-sm text-muted mt-1">{user?.email}</p>
        </div>

        <nav className="flex flex-col gap-1">
          {ACCOUNT_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm tracking-wider uppercase font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-charcoal hover:bg-cream hover:text-primary'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}

          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 text-sm tracking-wider uppercase font-medium text-charcoal hover:bg-red-50 hover:text-red-600 transition-colors mt-4 border-t border-gray-100 pt-6"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  );
}
