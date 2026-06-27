'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown, ArrowRight } from 'lucide-react';
import { MEGA_MENU_NAV } from '@/lib/constants';
import { categoryApi, type CategoryNode } from '@/lib/api';
import type { MegaMenuNavItem } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import logo from '@/public/jagmeen_logo.png';
import Image from 'next/image';
import SearchBox from '../ui/SearchBox';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);
  const [expandedMobileNav, setExpandedMobileNav] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredFloatingCategory, setHoveredFloatingCategory] = useState<string | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { cartSummary } = useCart();
  const { wishlistSummary } = useWishlist();
  const [megaMenuNav, setMegaMenuNav] = useState<MegaMenuNavItem[]>(MEGA_MENU_NAV);

 

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await categoryApi.getTree();
        if (res.data) {
          const navItems: MegaMenuNavItem[] = res.data.map((cat: CategoryNode) => ({
            label: cat.name,
            href: `/category/${cat.slug}`,
            featured: {
              title: 'New Arrivals',
              subtitle: `Explore ${cat.name}`,
              href: `/category/${cat.slug}`,
              accent: 'Shop Now',
            },
            columns: (cat.children || []).map(child => ({
              title: child.name,
              links: (child.children || []).length > 0 
                ? child.children.map(sub => ({ label: sub.name, href: `/category/${sub.slug}` }))
                : [{ label: `All ${child.name}`, href: `/category/${child.slug}` }]
            }))
          }));
          setMegaMenuNav(navItems);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const openMenu = useCallback(() => {
    // Navigation menu handling moved to floating button
  }, []);

  const scheduleCloseMenu = useCallback(() => {
    // No longer needed
  }, []);

  const closeMenu = useCallback(() => {
    // Navigation menu handling moved to floating button
  }, []);

  const toggleMobileNav = (label: string) => {
    setExpandedMobileNav((prev) => (prev === label ? null : label));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`transition-all duration-300 relative ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-100'
            : 'bg-white border-b border-transparent'
        }`}
      >
        <div
          className={`w-full mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'py-2' : 'py-2 lg:py-2'
          }`}
        >
          {/* Left Section: Mobile menu + Logo */}
          <div className="flex items-center gap-3 lg:gap-5 flex-shrink-0">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-primary p-1 -ml-1"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2" onClick={closeMenu}>
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <Image src={logo} alt="Jagmeen Fashion Logo" width={40} height={40} style={{ width: 'auto', height: 'auto' }} />
              </div>
              <h1 className="font-heading italic text-lg sm:text-xl lg:text-2xl font-bold text-primary tracking-wide leading-none whitespace-nowrap">
                Jagmeen Fashion
              </h1>
            </Link>
          </div>

          {/* Center: Search bar removed and moved to right section */}

          {/* Right Section: Icons */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 text-primary flex-shrink-0">
            {/* Desktop SearchBox */}
            <div className="hidden md:block w-[260px]">
              {/* @ts-ignore */}
              <SearchBox />
            </div>

            {/* Mobile search toggle */}
            <button
              aria-label="Search"
              className="md:hidden hover:text-gold transition-colors p-1"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search size={20} />
            </button>

            <Link href="/wishlist" aria-label="Wishlist" className="hover:text-gold transition-colors hidden sm:block relative p-1">
              <Heart size={20} />
              {wishlistSummary && wishlistSummary.total_items > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {wishlistSummary.total_items}
                </span>
              )}
            </Link>

            <Link href="/cart" aria-label="Cart" className="hover:text-gold transition-colors relative p-1">
              <ShoppingBag size={20} />
              {cartSummary && cartSummary.total_items > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {cartSummary.total_items}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="relative" ref={userMenuRef}>
              {isLoading ? (
                <button
                  disabled
                  className="hover:text-gold transition-colors flex items-center gap-0.5 p-1 opacity-50"
                  aria-label="Account menu"
                >
                  <User size={20} />
                </button>
              ) : isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="hover:text-gold transition-colors flex items-center gap-0.5 p-1"
                    aria-label="Account menu"
                  >
                    <User size={20} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-gray-100 shadow-xl py-2 z-[70] animate-fade-in-down">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-primary truncate">{user?.name}</p>
                        <p className="text-xs text-muted truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/account/profile"
                        className="block px-4 py-2.5 text-sm text-charcoal hover:bg-cream hover:text-primary transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/account/addresses"
                        className="block px-4 py-2.5 text-sm text-charcoal hover:bg-cream hover:text-primary transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Addresses
                      </Link>
                      <button
                        onClick={() => { setIsUserMenuOpen(false); logout(); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-red-50 hover:text-red-600 transition-colors border-t border-gray-100 mt-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login" className="hover:text-gold transition-colors p-1" aria-label="Sign in">
                  <User size={20} />
                </Link>
              )}
            </div>

            
          </div>
        </div>

        {/* Mobile search bar — slides down */}
        <div className={`md:hidden transition-all duration-300 ease-out border-t border-gray-50 ${isMobileSearchOpen ? 'max-h-[600px] opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden border-t-0'}`}>
          <div className="px-4 py-3 relative z-50">
            {/* @ts-ignore */}
            <SearchBox />
          </div>
        </div>

        {/* Desktop mega menu panels - REMOVED */}
      </nav>

      {/* Floating Menu Button - Below Header */}
      <div className="relative hidden md:block h-0 flex justify-start pointer-events-none z-50 ml-4">
        {/* <button
          onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
          className="relative -top-6 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white pointer-events-auto hover:scale-110"
          aria-label="Navigation menu"
        >
          <Menu size={24} className={`transition-transform duration-300 ${isFloatingMenuOpen ? 'rotate-90' : ''}`} />
        </button> */}
        <button
          onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
          className="relative -top-6 w-14 h-14 rounded-full bg-gradient-to-br shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white pointer-events-auto hover:scale-110"
          aria-label="Navigation menu"
        >
          <Menu size={24} color="black" className={`transition-transform duration-300 ${isFloatingMenuOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Floating Menu - Main Categories with Hover Submenu */}
      {isFloatingMenuOpen && (
        <div className="fixed top-20 left-4 z-40 flex items-start gap-0.3 animate-fade-in-down">
          {/* Main Categories List */}
          <div className="bg-white border border-gray-100 rounded-lg shadow-2xl w-[200px] max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="p-0">
              {megaMenuNav.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-gray-50 last:border-b-0 relative group"
                  onMouseEnter={() => setHoveredFloatingCategory(item.label)}
                  onMouseLeave={() => setHoveredFloatingCategory(null)}
                >
                  {/* Main Category Item */}
                  <button
                    onClick={() => {
                      window.location.href = item.href;
                      setIsFloatingMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-end px-4 py-3 text-sm tracking-wider uppercase font-medium text-primary hover:bg-cream hover:text-gold transition-all duration-200"
                  >
                    <span className="flex-1">{item.label}</span>
                    <span className={`text-xs transition-transform duration-200 ${hoveredFloatingCategory === item.label ? 'opacity-100 translate-x-1' : 'opacity-40'}`}>
                      →
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategories Mega Menu - Shows on Hover */}
          {hoveredFloatingCategory && (
            <div
              className="bg-white border border-gray-100 rounded-lg shadow-2xl w-80 max-h-[calc(100vh-120px)] overflow-y-auto animate-fade-in-down"
              onMouseEnter={() => setHoveredFloatingCategory(hoveredFloatingCategory)}
              onMouseLeave={() => setHoveredFloatingCategory(null)}
            >
              {megaMenuNav.find((item) => item.label === hoveredFloatingCategory) && (
                <div className="p-5 space-y-5">
                  {/* Subcategory Sections */}
                  {megaMenuNav.find((item) => item.label === hoveredFloatingCategory)?.columns.map(
                    (column) => (
                      <div key={column.title}>
                        <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold mb-3 px-2">
                          {column.title}
                        </p>
                        <ul className="space-y-2">
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="block px-3 py-2 text-sm text-charcoal hover:text-primary hover:bg-cream/50 rounded transition-all duration-150"
                                onClick={() => {
                                  setIsFloatingMenuOpen(false);
                                  setHoveredFloatingCategory(null);
                                }}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Overlay for floating menu */}
      {isFloatingMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsFloatingMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 w-[88%] max-w-sm h-full bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
            <h2 className="font-heading italic text-2xl font-bold text-primary tracking-wide">
              Jagmeen Fashion
            </h2>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
              <X size={22} className="text-primary" />
            </button>
          </div>


          {/* Scrollable nav */}
          <div className="flex-1 overflow-y-auto py-2">
            {megaMenuNav.map((item) => {
              const isExpanded = expandedMobileNav === item.label;
              return (
                <div key={item.label} className="border-b border-gray-50">
                  <button
                    onClick={() => toggleMobileNav(item.label)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm tracking-widest uppercase font-medium text-primary">
                      {item.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-muted transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-4 space-y-5 bg-cream/30">
                      {item.columns.map((column) => (
                        <div key={column.title}>
                          <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold mb-2">
                            {column.title}
                          </p>
                          <ul className="space-y-2.5 pl-1">
                            {column.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="text-sm text-charcoal hover:text-primary transition-colors"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <Link
                        href={item.featured.href}
                        className="flex items-center justify-between p-4 bg-primary text-white group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div>
                          <p className="text-[10px] tracking-widest uppercase text-gold mb-1">
                            {item.featured.subtitle}
                          </p>
                          <p className="font-heading italic text-lg">{item.featured.title}</p>
                        </div>
                        <ArrowRight size={16} className="text-gold group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href={item.href}
                        className="block text-xs tracking-widest uppercase font-medium text-primary hover:text-gold transition-colors pt-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Shop All {item.label} →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drawer footer — account */}
          <div className="border-t border-gray-100 p-5 flex-shrink-0 bg-white space-y-3">
            {isAuthenticated ? (
              <>
                <p className="text-xs text-muted uppercase tracking-wider">Signed in as {user?.name}</p>
                <div className="flex gap-4">
                  <Link
                    href="/account/profile"
                    className="text-sm tracking-wider uppercase font-medium text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="text-sm tracking-wider uppercase font-medium text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Addresses
                  </Link>
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                    className="text-sm tracking-wider uppercase font-medium text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="flex-1 text-center py-3 border border-primary text-primary text-xs tracking-widest uppercase font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 text-center py-3 bg-primary text-white text-xs tracking-widest uppercase font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
