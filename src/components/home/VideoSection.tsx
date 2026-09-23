'use client';

import React from 'react';

export function VideoSection() {
  return (
    <section className="relative min-h-[360px] sm:min-h-[500px] lg:min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] border-b border-white/10">
      
      {/* Background Video Element: Autoplay, Muted, Looping */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/carbon-craftsmanship-poster.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/carbon-craftsmanship.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Vignette Gradients for seamless integration */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-36 bg-gradient-to-b from-[#000000] to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-36 bg-gradient-to-t from-[#000000] to-transparent z-10" />
        <div className="absolute inset-0 bg-black/25 z-10" />
      </div>

      {/* Subtle Ambient Caption (Centered, Minimal, Luxury) */}
      <div className="relative z-20 text-center px-6 max-w-2xl space-y-4">
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#c9a24b] font-medium drop-shadow-md">
          MASTERPIECE IN MOTION
        </p>
        <h3 className="font-serif text-2xl sm:text-4xl text-white tracking-[0.2em] uppercase font-light drop-shadow-lg">
          AEROSPACE ARCHITECTURE &times; GRAND CRU
        </h3>
      </div>

    </section>
  );
}
