'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#040404] border-t border-white/10 text-[#a8a49b] text-xs pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-12 lg:px-20 space-y-10 sm:space-y-16">
        
        {/* Truthful Manila Wine Philippine Premiere Showcase */}
        <div className="bg-[#0a0a0c] border border-white/10 rounded p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#c9a24b] text-xs tracking-[0.25em] uppercase font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>PHILIPPINE PREMIERE &bull; DIRECT ALLOCATION</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
              Champagne Carbon &times; Manila Wine
            </h3>
            <p className="text-xs text-[#a8a49b] max-w-2xl leading-relaxed font-light">
              Manila Wine is the first in the Philippines to bring and offer genuine Champagne Carbon bottles to local collectors and connoisseurs. Handled with unbroken cold-chain temperature control and delivered directly to your cellar in Manila.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end flex-shrink-0 space-y-2">
            <div className="relative w-48 h-14">
              <Image
                src="/brand/logo.webp"
                alt="Manila Wine"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a24b] font-medium">
              FIRST ALLOCATION PHILIPPINES
            </span>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Official Wordmark */}
          <div className="space-y-4">
            <div className="relative w-44 h-12">
              <Image
                src="/images/carbon/logo-carbon-transparent.png"
                alt="CHAMPAGNE CARBON"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs leading-relaxed font-light text-[#a8a49b]">
              &ldquo;Best Champagne for un-conventional lifestyle.&rdquo; Aerospace carbon-fiber coating protecting 5th-generation Grand Cru cuvées.
            </p>
            <div className="text-[11px] font-mono tracking-widest text-[#c9a24b]">
              #LifeIsAllCARBONBased
            </div>
          </div>

          {/* Col 2: The Cuvées */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-[0.25em] text-white font-semibold">THE CUVÉES</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/products/carbon-brut" className="hover:text-[#c9a24b] transition-colors">Carbon Brut Icon</Link></li>
              <li><Link href="/products/carbon-rose" className="hover:text-[#c9a24b] transition-colors">Carbon Rosé Haute Couture</Link></li>
              <li><Link href="/products/blanc-de-noirs-vintage-2009" className="hover:text-[#c9a24b] transition-colors">Blanc de Noirs Vintage 2009</Link></li>
              <li><Link href="/products/blanc-de-blancs-grand-cru-2019" className="hover:text-[#c9a24b] transition-colors">Blanc de Blancs Grand Cru 2019</Link></li>
              <li><Link href="/bugatti" className="hover:text-[#c9a24b] transition-colors">Bugatti Editions (&Eacute;B.01, Chiron, Bolide)</Link></li>
            </ul>
          </div>

          {/* Col 3: Craftsmanship (Properly Targeted Anchors) */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-[0.25em] text-white font-semibold">CRAFTSMANSHIP</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/how-to-enjoy" className="hover:text-[#c9a24b] transition-colors text-white font-medium">How to Enjoy (The Ritual)</Link></li>
              <li><Link href="/story#37-steps" className="hover:text-[#c9a24b] transition-colors">The 37 Artisanal Steps</Link></li>
              <li><Link href="/story#cellars" className="hover:text-[#c9a24b] transition-colors">Champillon Oak Barrels</Link></li>
              <li><Link href="/story#f1" className="hover:text-[#c9a24b] transition-colors">Formula 1 Podium Legacy</Link></li>
              <li><Link href="/story#monte-carlo" className="hover:text-[#c9a24b] transition-colors">Prince Albert II Monte-Carlo</Link></li>
            </ul>
          </div>

          {/* Col 4: Manila Wine Concierge */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-[0.25em] text-white font-semibold">VIP CONCIERGE</h4>
            <div className="space-y-2.5 text-xs">
              <a href="tel:+639178600808" className="flex items-center gap-2 hover:text-[#c9a24b] transition-colors text-white">
                <Phone className="w-3.5 h-3.5 text-[#c9a24b]" />
                <span>+63917 860 0808</span>
              </a>
              <a href="mailto:contact@manila-wine.com" className="flex items-center gap-2 hover:text-[#c9a24b] transition-colors text-white">
                <Mail className="w-3.5 h-3.5 text-[#c9a24b]" />
                <span>contact@manila-wine.com</span>
              </a>
              <div className="flex items-center gap-2 text-[#a8a49b] pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#c9a24b]" />
                <span>Metro Manila, Philippines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#7a7770]">
          <div>
            &copy; {new Date().getFullYear()} Champagne Carbon &bull; Curated and offered in the Philippines by <a href="https://manila-wine.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#c9a24b] underline">Manila-Wine.com</a>.
          </div>
          <div className="flex items-center gap-4 text-white/50">
            <span>Drink Responsibly. For adults 18 years and older only.</span>
            <span>&bull;</span>
            <Link href="/admin" className="text-white/20 hover:text-white/60 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
