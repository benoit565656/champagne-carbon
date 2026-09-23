'use client';

import React from 'react';
import Image from 'next/image';

export function RecognitionStrip() {
  return (
    <section className="w-full bg-[#000000] py-8 sm:py-16 lg:py-24 border-b border-white/10">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10 lg:gap-8 items-center">
          
          {/* Left Summary Text */}
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
            <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c9a24b] font-medium">
              RECOGNIZED FOR EXCELLENCE
            </p>
            <ul className="space-y-2 text-[10px] sm:text-[11px] text-[#ece9e2]/80 tracking-wider uppercase font-light">
              <li>DOUBLE GOLD &mdash; GILBERT &amp; GAILLARD 2026</li>
              <li>OFFICIAL CHAMPAGNE FOR BUGATTI</li>
              <li>OFFICIAL PARTNER OF AUTOMOBILI LAMBORGHINI</li>
              <li>OFFICIAL CHAMPAGNE FOR ZEPHALTO</li>
            </ul>
          </div>

          {/* Emblem 1: Double Gold Medal */}
          <div className="flex items-center justify-center lg:border-l border-white/10 lg:pl-8 py-2 sm:py-4">
            <div className="relative w-28 h-24 sm:w-36 sm:h-36 hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/carbon/medal-double-gold.png"
                alt="Gilbert & Gaillard Double Gold Medal"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Emblem 2: Bugatti Partner (Significantly Enlarged) */}
          <div className="flex items-center justify-center lg:border-l border-white/10 lg:pl-8 py-2 sm:py-4">
            <div className="relative w-44 h-24 sm:w-60 sm:h-36 hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/carbon/partner-bugatti.png"
                alt="Champagne Carbon for Bugatti"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                priority
              />
            </div>
          </div>

          {/* Emblem 3: Lamborghini Partner (Significantly Enlarged) */}
          <div className="flex items-center justify-center lg:border-l border-white/10 lg:pl-8 py-4">
            <div className="relative w-36 h-32 sm:w-44 sm:h-36 hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/carbon/partner-lamborghini.png"
                alt="Champagne Carbon Official Partner Automobili Lamborghini"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                priority
              />
            </div>
          </div>

          {/* Emblem 4: Zephalto Partner (Significantly Enlarged) */}
          <div className="flex items-center justify-center lg:border-l border-white/10 lg:pl-8 py-4">
            <div className="relative w-52 h-32 sm:w-60 sm:h-36 hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/carbon/partner-zephalto.png"
                alt="Champagne Carbon for Zephalto"
                fill
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
