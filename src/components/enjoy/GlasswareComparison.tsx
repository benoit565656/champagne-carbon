'use client';

import React from 'react';
import { XCircle, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

export function GlasswareComparison() {
  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-xl p-6 sm:p-10">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
          THE VESSEL ARCHITECTURE
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
          Why The Glass Dictates The Taste
        </h3>
        <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
          Champagne Carbon is not an ordinary sparkler; it is 5th-generation Grand Cru aged in oak barrels. Serving it in the wrong glassware suffocates up to 70% of its complex bouquet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* 1. The Coupe (1920s) */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400/80 bg-rose-950/40 px-2.5 py-1 rounded border border-rose-900/50 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>NOT RECOMMENDED</span>
              </span>
              <span className="text-[10px] font-mono text-[#7a7770]">1920s Gatsby Era</span>
            </div>

            {/* Custom SVG Illustration of Coupe */}
            <div className="h-40 w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 100 120" className="h-full w-auto stroke-[#7a7770] fill-none stroke-[1.5]">
                {/* Wide shallow bowl */}
                <path d="M 15 35 Q 50 65 85 35 Z" className="fill-rose-500/5 stroke-rose-400/60" />
                {/* Liquid line */}
                <path d="M 22 42 Q 50 60 78 42" strokeDasharray="2 2" className="stroke-rose-400/40" />
                {/* Stem */}
                <line x1="50" y1="65" x2="50" y2="105" />
                {/* Base */}
                <path d="M 30 105 Q 50 102 70 105" />
                {/* Escaping bubbles arrow */}
                <path d="M 30 30 Q 30 15 25 10" className="stroke-rose-400/40 stroke-dasharray-[2,2]" />
                <path d="M 50 30 Q 50 15 50 8" className="stroke-rose-400/40 stroke-dasharray-[2,2]" />
                <path d="M 70 30 Q 70 15 75 10" className="stroke-rose-400/40 stroke-dasharray-[2,2]" />
              </svg>
            </div>

            <div className="space-y-1 text-center">
              <h4 className="font-serif text-base text-white tracking-wider uppercase font-normal">The Flat Coupe</h4>
              <p className="text-[11px] text-rose-300/80 font-mono tracking-wide">Rapid Dissipation</p>
            </div>

            <p className="text-xs text-[#a8a49b] font-light leading-relaxed pt-2 border-t border-white/5">
              The broad surface area causes $CO_2$ effervescence to evaporate in minutes. Aromas scatter sideways into the room before ever reaching your nose.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 text-[10px] text-[#7a7770] font-mono">
            Aroma Retention: <span className="text-rose-400">15%</span> &bull; Bubble Lifespan: <span className="text-rose-400">Short</span>
          </div>
        </div>

        {/* 2. The Flute (1980s) */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-900/50 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>CASUAL ONLY</span>
              </span>
              <span className="text-[10px] font-mono text-[#7a7770]">Party Standard</span>
            </div>

            {/* Custom SVG Illustration of Flute */}
            <div className="h-40 w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 100 120" className="h-full w-auto stroke-[#a8a49b] fill-none stroke-[1.5]">
                {/* Narrow straight bowl */}
                <path d="M 38 15 L 38 65 Q 50 82 50 82 Q 50 82 62 65 L 62 15 Z" className="fill-amber-500/5 stroke-amber-400/60" />
                {/* Liquid line */}
                <line x1="38" y1="35" x2="62" y2="35" strokeDasharray="2 2" className="stroke-amber-400/40" />
                {/* Rising bubble column */}
                <line x1="50" y1="75" x2="50" y2="35" strokeDasharray="3 3" className="stroke-amber-400/80" />
                {/* Stem */}
                <line x1="50" y1="82" x2="50" y2="108" />
                {/* Base */}
                <path d="M 35 108 Q 50 105 65 108" />
              </svg>
            </div>

            <div className="space-y-1 text-center">
              <h4 className="font-serif text-base text-white tracking-wider uppercase font-normal">The Narrow Flute</h4>
              <p className="text-[11px] text-amber-300/80 font-mono tracking-wide">Trapped Aromatics</p>
            </div>

            <p className="text-xs text-[#a8a49b] font-light leading-relaxed pt-2 border-t border-white/5">
              Displays a beautiful, hypnotic vertical bubble train, but the narrow aperture traps the gas and suffocates the complex barrel-aged pastry and stone-fruit notes.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 text-[10px] text-[#7a7770] font-mono">
            Aroma Retention: <span className="text-amber-400">45%</span> &bull; Bubble Visual: <span className="text-amber-400">High</span>
          </div>
        </div>

        {/* 3. The Sommelier Tulip / Universal (Grand Cru Benchmark) */}
        <div className="bg-[#0c0c0e] border-2 border-[#c9a24b]/70 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden group shadow-[0_0_30px_rgba(201,162,75,0.12)]">
          <div className="absolute top-0 right-0 bg-[#c9a24b] text-black text-[9px] font-mono font-bold tracking-widest px-3 py-1 rounded-bl uppercase">
            SOMMELIER CHOICE
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a24b] bg-[#c9a24b]/10 px-2.5 py-1 rounded border border-[#c9a24b]/40 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RECOMMENDED</span>
              </span>
              <span className="text-[10px] font-mono text-[#c9a24b]">Riedel / Zalto Style</span>
            </div>

            {/* Custom SVG Illustration of Tulip */}
            <div className="h-40 w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 100 120" className="h-full w-auto stroke-[#c9a24b] fill-none stroke-[1.6]">
                {/* Tulip shaped curved bowl: wide belly, tapered narrow rim */}
                <path d="M 36 20 Q 24 45 32 65 Q 42 80 50 82 Q 58 80 68 65 Q 76 45 64 20 Z" className="fill-[#c9a24b]/10 stroke-[#c9a24b]" />
                {/* Fill level at widest belly point */}
                <path d="M 28 50 Q 50 58 72 50" strokeDasharray="2 2" className="stroke-[#c9a24b]/80" />
                {/* Concentrated bouquet arrows pointing to rim */}
                <path d="M 40 40 Q 45 28 47 15" className="stroke-[#c9a24b]/60 stroke-dasharray-[2,2]" />
                <path d="M 60 40 Q 55 28 53 15" className="stroke-[#c9a24b]/60 stroke-dasharray-[2,2]" />
                {/* Stem */}
                <line x1="50" y1="82" x2="50" y2="108" />
                {/* Base */}
                <path d="M 33 108 Q 50 105 67 108" />
              </svg>
            </div>

            <div className="space-y-1 text-center">
              <h4 className="font-serif text-base text-white tracking-wider uppercase font-semibold flex items-center justify-center gap-1.5">
                <span>The Wide Tulip</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c9a24b]" />
              </h4>
              <p className="text-[11px] text-[#c9a24b] font-mono tracking-wide">Aromatic Chamber</p>
            </div>

            <p className="text-xs text-[#ece9e2] font-light leading-relaxed pt-2 border-t border-[#c9a24b]/20">
              The curved belly allows the wine to breathe and aerate when poured to the widest point. The gently tapered rim concentrates the delicate floral, brioche, and oak aromatics straight to your palate.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#c9a24b]/20 text-[10px] text-[#c9a24b] font-mono">
            Aroma Retention: <span className="font-bold text-white">95%</span> &bull; Aeration: <span className="font-bold text-white">Optimal</span>
          </div>
        </div>

      </div>
    </div>
  );
}
