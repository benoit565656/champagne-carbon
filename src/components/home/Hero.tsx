'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative w-full bg-[#050505]">
      {/* Main Hero Slide */}
      <section className="relative w-full overflow-hidden">
        
        {/* Constrained Container matching Header (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[75vh] sm:min-h-[80vh] flex flex-col justify-between py-6 sm:py-8 lg:py-10">
          
          {/* Background Artwork: Anchored inside max-w-7xl frame on desktop */}
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 lg:w-1/2 pointer-events-none z-0">
            <Image
              src="/images/carbon/hero-halo-full.png"
              alt="Champagne Carbon Sealed in Carbon Fiber"
              fill
              className="object-contain object-right"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Subtle mobile overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent sm:hidden z-10" />
          </div>

          {/* Left Hero Content: Inside the max-w-7xl boundary */}
          <div className="relative z-10 max-w-xl lg:max-w-2xl space-y-3 sm:space-y-4 pt-2 sm:pt-4">
            <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c9a24b] font-medium">
              WHERE PERFORMANCE MEETS CHAMPAGNE.
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.14em] uppercase font-light leading-[1.1] sm:leading-[1.08]">
              THE WORLD&apos;S FIRST<br />
              CHAMPAGNE<br />
              SEALED IN CARBON FIBER
            </h1>

            <p className="text-xs sm:text-sm text-[#ece9e2]/80 max-w-lg font-light leading-relaxed tracking-wide pt-1">
              Born from a passion for perfection, engineered to protect what nature and time create. Handcrafted in Champillon, France &mdash; first brought to the Philippines by Manila Wine.
            </p>

            <div className="pt-2 sm:pt-3">
              <Link
                href="/collection"
                className="inline-block border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black transition-all duration-300 px-6 sm:px-8 py-3 sm:py-3.5 text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_25px_rgba(201,162,75,0.4)]"
              >
                DISCOVER THE COLLECTION
              </Link>
            </div>
          </div>

          {/* Stacked Partner Badges Strip: Inside max-w-7xl boundary */}
          <div className="relative z-10 pt-6 sm:pt-8 space-y-2 sm:space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className="font-serif uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white font-medium">BUGATTI</span>
              <span className="text-white/30">&bull;</span>
              <span className="uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#c9a24b]">OFFICIAL CHAMPAGNE</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className="font-serif uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white font-medium">LAMBORGHINI</span>
              <span className="text-white/30">&bull;</span>
              <span className="uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#c9a24b]">OFFICIAL PARTNER</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className="font-serif uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white font-medium">DOUBLE GOLD</span>
              <span className="text-white/30">&bull;</span>
              <span className="uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#c9a24b]">GILBERT &amp; GAILLARD 2026</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <span className="font-serif uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white font-medium">FORMULA 1</span>
              <span className="text-white/30">&bull;</span>
              <span className="uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#c9a24b]">OFFICIAL CHAMPAGNE 2017&ndash;2020</span>
            </div>
          </div>

        </div>

      </section>

      {/* 3-Pillar Protection Strip (Matching max-w-7xl) */}
      <section className="relative z-20 w-full border-t border-b border-white/10 bg-[#050505] py-5 sm:py-7 lg:py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 text-center">
          
          <div className="space-y-2 px-4">
            <h3 className="font-serif text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c9a24b] font-medium">
              STABLE TEMPERATURE
            </h3>
            <p className="text-xs sm:text-sm text-[#ece9e2]/75 font-light leading-relaxed max-w-sm mx-auto">
              Protects the wine from temperature variations.
            </p>
          </div>

          <div className="space-y-2 px-4 md:border-l md:border-r border-white/10">
            <h3 className="font-serif text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c9a24b] font-medium">
              LIGHT PROTECTION
            </h3>
            <p className="text-xs sm:text-sm text-[#ece9e2]/75 font-light leading-relaxed max-w-sm mx-auto">
              Blocks UV rays and preserves aromas and colour.
            </p>
          </div>

          <div className="space-y-2 px-4">
            <h3 className="font-serif text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c9a24b] font-medium">
              EXCLUSIVE PACKAGING
            </h3>
            <p className="text-xs sm:text-sm text-[#ece9e2]/75 font-light leading-relaxed max-w-sm mx-auto">
              A unique design, made to be unforgettable.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
