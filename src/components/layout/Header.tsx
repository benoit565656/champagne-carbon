'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ExternalLink, Phone } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner: Truthful Philippine Premiere (Regular flow, scrolls away naturally) */}
      <div className="w-full bg-[#0a0a0c] border-b border-white/10 py-1.5 sm:py-2 px-3 sm:px-4 text-xs overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a24b] animate-pulse flex-shrink-0"></span>
            <span className="font-serif tracking-[0.12em] sm:tracking-[0.22em] uppercase text-[#c9a24b] text-[9px] sm:text-[11px] font-medium leading-tight">
              FIRST TO BRING &amp; OFFER CHAMPAGNE CARBON IN THE PHILIPPINES &bull; MANILA WINE ALLOCATION
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-[#a8a49b]">
            <a href="tel:+639178600808" className="hover:text-[#c9a24b] transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <Phone className="w-3 h-3 text-[#c9a24b]" />
              <span className="tracking-wider">VIP CONCIERGE: +63917 860 0808</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href="https://manila-wine.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 text-[#ece9e2] tracking-wider hidden sm:flex whitespace-nowrap"
            >
              <span>MANILA-WINE.COM</span>
              <ExternalLink className="w-3 h-3 text-[#c9a24b]" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Split Navigation: STICKY TOP-0 (Pins directly to top upon scroll) */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/98 shadow-[0_4px_25px_rgba(0,0,0,0.85)] border-b border-white/20 backdrop-blur-md'
            : 'bg-[#050505]/90 border-b border-white/10 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            
            {/* Left Navigation: HOME, COLLECTION, STORY */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 flex-1">
              <Link href="/" className="carbon-nav-link text-xs tracking-[0.22em] hover:text-[#c9a24b] transition-colors">
                HOME
              </Link>
              <Link href="/collection" className="carbon-nav-link text-xs tracking-[0.22em] hover:text-[#c9a24b] transition-colors">
                COLLECTION
              </Link>
              <Link href="/story" className="carbon-nav-link text-xs tracking-[0.22em] hover:text-[#c9a24b] transition-colors">
                STORY
              </Link>
            </nav>

            {/* Centered Brand Marks: Responsive for Mobile Viewport with both logos guaranteed visible */}
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0">
              {/* 1. Manila Wine Logo */}
              <a
                href="https://manila-wine.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-28 sm:w-44 lg:w-56 h-8 sm:h-12 lg:h-14 hover:opacity-90 transition-opacity flex-shrink-0"
                title="Manila Wine - Official Store"
              >
                <Image
                  src="/brand/logo.webp"
                  alt="Manila Wine"
                  fill
                  className="object-contain"
                  priority
                />
              </a>

              {/* Subtle Divider */}
              <div className="h-5 sm:h-8 w-[1px] bg-white/25 flex-shrink-0"></div>

              {/* 2. Official Champagne Carbon Logo (Guaranteed width: 96px on mobile, 128px on tablet, 144px on desktop) */}
              <Link
                href="/"
                className="relative block w-24 sm:w-32 lg:w-36 h-7 sm:h-9 lg:h-10 hover:opacity-90 transition-opacity flex-shrink-0"
                title="Champagne Carbon"
              >
                <Image
                  src="/images/carbon/logo-carbon-transparent.png"
                  alt="CHAMPAGNE CARBON"
                  fill
                  sizes="(max-width: 640px) 96px, 144px"
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="hidden lg:flex items-center justify-end space-x-6 xl:space-x-8 flex-1">
              <Link href="/how-to-enjoy" className="carbon-nav-link text-xs tracking-[0.22em] hover:text-[#c9a24b] transition-colors whitespace-nowrap">
                HOW TO ENJOY
              </Link>
              <Link href="/bugatti" className="carbon-nav-link text-xs tracking-[0.22em] hover:text-[#c9a24b] transition-colors">
                BUGATTI
              </Link>
              <Link href="/contact" className="carbon-nav-link text-xs tracking-[0.22em] hover:text-[#c9a24b] transition-colors">
                CONCIERGE
              </Link>
            </div>

            {/* Mobile hamburger (Always fits comfortably inside viewport) */}
            <div className="lg:hidden flex items-center flex-shrink-0 pl-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-white hover:text-[#c9a24b] focus:outline-none"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#c9a24b]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#080808]/98 backdrop-blur-xl border-b border-white/10 px-6 py-5 space-y-3">
            <nav className="flex flex-col space-y-3 font-serif text-sm tracking-[0.2em] uppercase">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1 border-b border-white/5">
                HOME
              </Link>
              <Link href="/collection" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1 border-b border-white/5">
                COLLECTION
              </Link>
              <Link href="/story" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1 border-b border-white/5">
                STORY
              </Link>
              <Link href="/how-to-enjoy" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1 border-b border-white/5">
                HOW TO ENJOY
              </Link>
              <Link href="/bugatti" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1 border-b border-white/5">
                BUGATTI
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1">
                CONCIERGE
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
