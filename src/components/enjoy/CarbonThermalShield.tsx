'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Sun, ThermometerSnowflake, Sparkles } from 'lucide-react';

export function CarbonThermalShield() {
  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-xl p-6 sm:p-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
          AEROSPACE ARCHITECTURE
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
          The Carbon Armor Advantage
        </h3>
        <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
          The handcrafted carbon fiber wrapping is not decorative packaging—it is an active aerospace thermal and optical shield engineered to protect Grand Cru champagne in extreme climates.
        </p>
      </div>

      {/* Grid: 3 Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Advantage 1: Thermal Insulation */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-6 space-y-4 group hover:border-[#c9a24b]/40 transition-all">
          <div className="w-10 h-10 rounded-full bg-[#c9a24b]/10 border border-[#c9a24b]/30 flex items-center justify-center text-[#c9a24b]">
            <ThermometerSnowflake className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-base text-white tracking-wide uppercase font-medium">
              Thermal Insulation in Manila
            </h4>
            <span className="text-[10px] font-mono text-[#c9a24b] uppercase block">Low Thermal Conductivity</span>
          </div>
          <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
            Bare glass is a rapid thermal conductor; in Metro Manila’s ambient 30°C heat, an ordinary bottle warms by 4°C in just 15 minutes. Carbon fiber’s woven molecular structure acts as a natural insulator, keeping cellar chill stabilized nearly twice as long at your table.
          </p>
        </div>

        {/* Advantage 2: 100% Lightstrike Protection */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-6 space-y-4 group hover:border-[#c9a24b]/40 transition-all">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sun className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-base text-white tracking-wide uppercase font-medium">
              Zero &ldquo;Go&ucirc;t de Lumi&egrave;re&rdquo;
            </h4>
            <span className="text-[10px] font-mono text-amber-300 uppercase block">100% UV &amp; Blue Light Barrier</span>
          </div>
          <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
            Lightstrike (*go&ucirc;t de lumi&egrave;re*) occurs when ultraviolet or fluorescent light reacts with riboflavin, destroying delicate champagne aromatics within 60 minutes. The carbon fiber armor provides 100% total opacity—zero light ever penetrates.
          </p>
        </div>

        {/* Advantage 3: Vibration Dampening */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-6 space-y-4 group hover:border-[#c9a24b]/40 transition-all">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-base text-white tracking-wide uppercase font-medium">
              Shock &amp; Vibration Dampening
            </h4>
            <span className="text-[10px] font-mono text-emerald-300 uppercase block">Aerospace Structural Integrity</span>
          </div>
          <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
            Crafted across 37 artisanal stages, the high-modulus carbon fiber weave absorbs micro-vibrations during air transport and transit, ensuring the wine arrives in your glass in the same pristine state as Alexandre Mea’s personal cellars in Champillon.
          </p>
        </div>

      </div>

      {/* Visual Quote / Proof */}
      <div className="bg-[#0a0a0c] border border-white/10 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
          <Image
            src="/images/bottles/carbon-brut-1.png"
            alt="Champagne Carbon Armor"
            fill
            className="object-contain"
          />
        </div>
        <div className="space-y-2">
          <p className="font-serif text-sm sm:text-base text-white tracking-wide font-light italic">
            &ldquo;We did not wrap our bottles in carbon fiber to make them look striking. We engineered carbon fiber because it is the supreme material on Earth to protect Grand Cru wine from temperature, UV light, and time.&rdquo;
          </p>
          <span className="text-[11px] font-mono text-[#c9a24b] uppercase tracking-wider block">
            &mdash; Alexandre Mea, 5th-Generation Vigneron &amp; Founder
          </span>
        </div>
      </div>

    </div>
  );
}
