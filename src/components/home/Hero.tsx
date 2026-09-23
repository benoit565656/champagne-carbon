'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative w-full bg-[#050505]">
      {/* Main Full-Height Hero Slide (Screenshot 1) */}
      <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden">
        
        {/* Background Artwork: Authentic High-Res Carbon Luminous Halo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 h-full">
            <Image
              src="/images/carbon/hero-halo-full.png"
              alt="Champagne Carbon Sealed in Carbon Fiber"
              fill
              className="object-cover lg:object-contain object-right"
              priority
              sizes="100vw"
            />
          </div>
          {/* Subtle bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
        </div>

        {/* Content Container: Full Width with Refined Side Padding */}
        <div className="relative z-20 w-full px-4 sm:px-12 lg:px-20 pt-10 sm:pt-24 lg:pt-36 pb-8 sm:pb-16 flex-grow flex flex-col justify-between">
          
          {/* Top/Middle Left Copy */}
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <p className="font-serif text-[11px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c9a24b] font-medium">
              WHERE PERFORMANCE MEETS CHAMPAGNE.
            </p>

            <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl text-white tracking-[0.14em] uppercase font-light leading-[1.1] sm:leading-[1.08]">
              THE WORLD&apos;S FIRST<br />
              CHAMPAGNE<br />
              SEALED IN CARBON FIBER
            </h1>

            <p className="text-xs sm:text-sm text-[#ece9e2]/80 max-w-lg font-light leading-relaxed tracking-wide pt-1 sm:pt-2">
              Born from a passion for perfection, engineered to protect what nature and time create. Handcrafted in Champillon, France &mdash; first brought to the Philippines by Manila Wine.
            </p>

            <div className="pt-2 sm:pt-4">
              <Link
                href="/collection"
                className="inline-block border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black transition-all duration-300 px-6 sm:px-8 py-3.5 sm:py-4 text-xs tracking-[0.22em] sm:tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_25px_rgba(201,162,75,0.4)]"
              >
                DISCOVER THE COLLECTION
              </Link>
            </div>
          </div>

          {/* Stacked Partner Badges Strip on Lower Left */}
          <div className="pt-8 sm:pt-20 space-y-2 sm:space-y-3">
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

      {/* 3-Pillar Protection Strip (Matching Screenshot 2) */}
      <section className="relative z-20 w-full border-t border-b border-white/10 bg-[#050505] py-8 sm:py-16 lg:py-20 px-4 sm:px-12 lg:px-20">
        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12 text-center">
          
          <div className="space-y-3 px-4">
            <h3 className="font-serif text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c9a24b] font-medium">
              STABLE TEMPERATURE
            </h3>
            <p className="text-xs sm:text-sm text-[#ece9e2]/75 font-light leading-relaxed max-w-sm mx-auto">
              Protects the wine from temperature variations.
            </p>
          </div>

          <div className="space-y-3 px-4 md:border-l md:border-r border-white/10">
            <h3 className="font-serif text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c9a24b] font-medium">
              LIGHT PROTECTION
            </h3>
            <p className="text-xs sm:text-sm text-[#ece9e2]/75 font-light leading-relaxed max-w-sm mx-auto">
              Blocks UV rays and preserves aromas and colour.
            </p>
          </div>

          <div className="space-y-3 px-4">
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
