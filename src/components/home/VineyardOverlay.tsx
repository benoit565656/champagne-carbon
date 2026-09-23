'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function VineyardOverlay() {
  return (
    <section className="relative min-h-[460px] sm:min-h-[600px] lg:min-h-[85vh] w-full flex items-center overflow-hidden border-t border-b border-white/10 bg-[#050505]">
      {/* Background Image: Full-Width Cinematic Champagne Vineyards & Church */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/carbon/vineyard-cinematic.png"
          alt="Nature creates. Time perfects. Carbon protects."
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Soft gradient on left for high readability while preserving panoramic scenery */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Content Container: Full Width with Refined Side Padding */}
      <div className="relative z-20 w-full px-4 sm:px-12 lg:px-20 py-12 sm:py-24 lg:py-32">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl text-white tracking-[0.14em] uppercase font-light leading-[1.1]">
            NATURE CREATES.<br />
            TIME PERFECTS.<br />
            <span className="text-[#c9a24b]">CARBON</span><br />
            <span className="text-[#c9a24b]">PROTECTS.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#ece9e2]/85 max-w-lg font-light leading-relaxed tracking-wide pt-2">
            The vineyard reveals the wine. Time shapes its character. Carbon protects its journey until the moment you taste it.
          </p>

          <div className="pt-4">
            <Link
              href="/story"
              className="inline-block border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black transition-all duration-300 px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_25px_rgba(201,162,75,0.4)]"
            >
              OUR STORY
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
