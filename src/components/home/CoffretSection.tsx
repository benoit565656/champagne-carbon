'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function CoffretSection() {
  return (
    <section className="relative min-h-[700px] lg:min-h-[85vh] w-full flex flex-col justify-between overflow-hidden bg-[#000000] border-b border-white/10">
      
      {/* Background Image: Full-Width Lacquered Casket on Black Marble */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/carbon/coffret-signature-full.png"
          alt="Signature Case Champagne Carbon"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Subtle dark vignette at top and bottom to seamlessly integrate */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
      </div>

      {/* Top Center Title */}
      <div className="relative z-20 w-full pt-20 sm:pt-28 text-center px-4">
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.24em] uppercase font-light">
          SIGNATURE CASE
        </h2>
        <div className="w-16 h-[1px] bg-[#c9a24b]/60 mx-auto mt-6" />
      </div>

      {/* Bottom Floating Info & CTA */}
      <div className="relative z-20 w-full max-w-4xl mx-auto pb-20 sm:pb-28 text-center px-6 space-y-6">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#c9a24b] font-medium">
          EXCEPTIONAL PRESENTATION
        </p>
        <p className="text-xs sm:text-sm text-[#ece9e2]/85 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
          Engineered to house the world&apos;s most exceptional champagnes. Each lacquer-finished presentation casket features pure carbon-fiber reinforcement, brass detailing, and bespoke velour cradling.
        </p>
        <div>
          <Link
            href="/collection"
            className="inline-block border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black transition-all duration-300 px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_25px_rgba(201,162,75,0.4)]"
          >
            DISCOVER THE COLLECTION
          </Link>
        </div>
      </div>

    </section>
  );
}
