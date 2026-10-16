'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function CoffretSection() {
  return (
    <section className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[620px] w-full flex flex-col justify-between overflow-hidden bg-[#000000] border-b border-white/10">
      
      {/* Background Image: Formula 1 Podium & Ducati Motorsport Heritage */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/carbon/motorsport-podium-f1-ducati.jpg"
          alt="Formula 1 and Ducati Motorsport Podium Heritage Champagne Carbon"
          fill
          className="object-cover object-center scale-105 transition-transform duration-1000"
          priority
          sizes="100vw"
        />
        {/* Cinematic dark gradients top and bottom */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Center Container matching Header */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between flex-grow py-8 sm:py-12 lg:py-14">
        {/* Top Center Title */}
        <div className="text-center px-4">
          <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#c9a24b] font-medium mb-2 sm:mb-3">
            FORMULA 1® PODIUM HERITAGE &bull; DUCATI CORSE PARTNERSHIP
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white tracking-[0.2em] sm:tracking-[0.24em] uppercase font-light">
            THE CHAMPIONS&apos; RITUAL
          </h2>
          <div className="w-12 sm:w-16 h-[1px] bg-[#c9a24b]/60 mx-auto mt-2 sm:mt-4" />
        </div>

        {/* Bottom Floating Info & CTA */}
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 space-y-3 sm:space-y-4 pt-12 sm:pt-20">
          <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#c9a24b] font-medium">
            PURE MOTORSPORT DNA
          </p>
          <p className="text-xs sm:text-sm text-[#ece9e2]/90 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Born on the world&apos;s most coveted podiums. Champagne Carbon made motorsport history as the Official Champagne of Formula 1®, sprayed by racing legends from Monaco to Silverstone. Encased in genuine aerospace carbon-fiber weave inspired by Grand Prix single-seaters and Ducati Corse superbikes, Carbon embodies the ultimate fusion of precision engineering and victory.
          </p>
          <div className="pt-2">
            <Link
              href="/collection"
              className="inline-block border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black transition-all duration-300 px-8 py-3.5 sm:py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_25px_rgba(201,162,75,0.4)]"
            >
              EXPLORE THE CUVÉES
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
