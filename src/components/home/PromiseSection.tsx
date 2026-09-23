'use client';

import React from 'react';
import Image from 'next/image';
import { Hexagon, Award, Box, Headphones, ShieldCheck, Truck } from 'lucide-react';

export function PromiseSection() {
  const pillars = [
    {
      title: 'HANDCRAFTED IN FRANCE',
      desc: '37 Artisanal Steps',
      icon: Hexagon,
    },
    {
      title: 'LIMITED PRODUCTION',
      desc: 'Rare Allocations',
      icon: Award,
    },
    {
      title: 'COLLECTOR CASE',
      desc: 'Signature Packaging',
      icon: Box,
    },
    {
      title: 'PRIVATE CLIENT SUPPORT',
      desc: 'VIP Wine Concierge',
      icon: Headphones,
    },
    {
      title: 'SECURE ALLOCATION',
      desc: 'Direct Provenance',
      icon: ShieldCheck,
    },
    {
      title: 'COLD-CHAIN MANILA',
      desc: 'Temperature Controlled',
      icon: Truck,
    },
  ];

  return (
    <section className="relative min-h-0 w-full flex items-center overflow-hidden bg-[#000000] border-b border-white/10">
      
      {/* Background Image: Full-Width Woven Carbon Fiber Texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/carbon/our-promise-carbon-weave.png"
          alt="Our Promise - Carbon Fiber Weave"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Darkening gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/60 z-10" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Content Grid: Full Width with Refined Side Padding */}
      <div className="relative z-20 w-full max-w-[1760px] mx-auto px-4 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#c9a24b] font-medium">
              OUR PROMISE
            </p>

            <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-[0.14em] uppercase font-light leading-[1.1]">
              EVERY BOTTLE.<br />
              EVERY DETAIL.<br />
              EVERY TIME.
            </h2>

            <p className="text-xs sm:text-sm text-[#ece9e2]/80 max-w-md font-light leading-relaxed tracking-wide pt-2">
              From the vine to the carbon, nothing is left to chance. Only to passion.
            </p>
          </div>

          {/* Right Column: 6 Circular Luxury Badges (2 rows of 3, matching screenshot 5) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 text-center">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center space-y-3 group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#c9a24b]/60 flex items-center justify-center text-[#c9a24b] bg-black/40 backdrop-blur-sm group-hover:border-[#c9a24b] group-hover:shadow-[0_0_20px_rgba(201,162,75,0.35)] transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.25]" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-serif text-[11px] sm:text-xs tracking-[0.18em] uppercase text-white font-medium">
                      {item.title}
                    </div>
                    <div className="text-[10px] tracking-wider text-[#a8a49b] uppercase font-light">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
