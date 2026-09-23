'use client';

import React from 'react';

export function ManilaWineExclusivity() {
  return (
    <section className="w-full bg-[#000000] py-10 sm:py-20 lg:py-28 border-t border-white/5">
      <div className="w-full max-w-5xl mx-auto px-4 text-center space-y-4 sm:space-y-5">
        <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-[#c9a24b] font-medium">
          THE HOUSE
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 font-serif text-base sm:text-2xl lg:text-3xl text-white tracking-[0.16em] sm:tracking-[0.22em] uppercase font-light">
          <span>CHAMPILLON</span>
          <span className="text-[#c9a24b] text-base">&middot;</span>
          <span>PREMIER CRU</span>
          <span className="text-[#c9a24b] text-base">&middot;</span>
          <span>FIVE GENERATIONS</span>
        </div>

        <p className="text-xs sm:text-sm text-[#a8a49b] tracking-wider font-light max-w-xl mx-auto pt-2">
          Handcrafted in Champagne since 1920. First brought and offered in the Philippines by Manila Wine.
        </p>
      </div>
    </section>
  );
}
