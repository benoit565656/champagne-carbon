'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ExternalLink, Phone } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      
      {/* Top Banner: Truthful Philippine Premiere */}
      <div className="bg-[#0a0a0c] border-b border-white/10 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a24b] animate-pulse"></span>
            <span className="font-serif tracking-[0.22em] uppercase text-[#c9a24b] text-[10px] sm:text-[11px] font-medium">
              FIRST TO BRING &amp; OFFER CHAMPAGNE CARBON IN THE PHILIPPINES &bull; MANILA WINE ALLOCATION
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-[#a8a49b]">
            <a href="tel:+639178600808" className="hover:text-[#c9a24b] transition-colors flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#c9a24b]" />
              <span className="tracking-wider">VIP CONCIERGE: +63917 860 0808</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href="https://manila-wine.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 text-[#ece9e2] tracking-wider hidden sm:flex"
            >
              <span>MANILA-WINE.COM</span>
              <ExternalLink className="w-3 h-3 text-[#c9a24b]" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Split Navigation matching champagnecarbon.com */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Left Navigation: HOME, COLLECTION, STORY */}
          <nav className="hidden lg:flex items-center space-x-10 flex-1">
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

          {/* Centered Brand Marks: MANILA WINE FIRST & TALLER, THEN CHAMPAGNE CARBON */}
          <div className="flex-shrink-0 flex items-center justify-center gap-5 sm:gap-7 px-4">
            
            {/* 1. Manila Wine Logo (First & Bigger in height) */}
            <a
              href="https://manila-wine.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-44 sm:w-56 h-12 sm:h-16 hover:opacity-90 transition-opacity"
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
            <div className="h-10 w-[1px] bg-white/25 hidden sm:block"></div>

            {/* 2. Official Champagne Carbon Logo */}
            <Link href="/" className="relative block w-28 sm:w-36 h-8 sm:h-10 hover:opacity-90 transition-opacity">
              <Image
                src="/images/carbon/logo-carbon-transparent.png"
                alt="CHAMPAGNE CARBON"
                fill
                className="object-contain"
                priority
              />
            </Link>

          </div>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center justify-end space-x-10 flex-1">
            <Link href="/bugatti" className="carbon-nav-link text-xs tracking-[0.22em] hover:text-[#c9a24b] transition-colors">
              BUGATTI
            </Link>
            <Link href="/contact" className="carbon-nav-link text-xs tracking-[0.22em] hover:text-[#c9a24b] transition-colors">
              CONCIERGE
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#c9a24b]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#c9a24b]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080808] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-4 font-serif text-sm tracking-[0.2em] uppercase">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1 border-b border-white/5">
              HOME
            </Link>
            <Link href="/collection" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1 border-b border-white/5">
              COLLECTION
            </Link>
            <Link href="/story" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#c9a24b] py-1 border-b border-white/5">
              STORY
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
  );
}
