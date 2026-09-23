'use client';

import React from 'react';
import { Eye, Wind, Sparkles, Wine } from 'lucide-react';

export function SensoryRitual() {
  const acts = [
    {
      act: 'ACT I',
      french: 'La Robe',
      title: 'The Visual Analysis',
      icon: Eye,
      accent: '#c9a24b',
      points: [
        { label: 'Color Depth', text: 'Pale straw gold with emerald hints for Brut; delicate crystalline salmon with coppery reflections for Rosé.' },
        { label: 'The Bead (Le Train de Bulles)', text: 'Microscopic, persistent vertical chains rising in columns from the nucleation point at the glass bottom.' },
        { label: 'The Foam Collar (La Collerette)', text: 'A dense, silky ring of tiny bubbles adhering gracefully to the inner rim of the glass.' },
      ],
    },
    {
      act: 'ACT II',
      french: 'Le Nez',
      title: 'The Olfactory Exploration',
      icon: Wind,
      accent: '#e5c378',
      points: [
        { label: 'Premier Nez (Still)', text: 'Inhale gently without swirling. Detect crisp green apple, white peach, acacia flower, and wet limestone minerality.' },
        { label: 'Deuxième Nez (Aerated)', text: 'Gently tilt and roll the glass. The oxygenation awakens warm brioche, toasted hazelnuts, roasted almond, and oak-barrel spices.' },
        { label: 'Evolution', text: 'As the glass warms from 8°C to 11°C, candied Meyer lemon peel and honeycomb emerge.' },
      ],
    },
    {
      act: 'ACT III',
      french: 'En Bouche',
      title: 'The Palate Experience',
      icon: Sparkles,
      accent: '#f0d8a0',
      points: [
        { label: 'The Attack (L’Attaque)', text: 'Crisp, electric, and direct. Grand Cru acidity creates immediate freshness across the palate.' },
        { label: 'Texture & Mousse', text: 'The bubbles do not sting; they deliver a creamy, velvety tactile sensation akin to liquid cashmere.' },
        { label: 'The Caudalie (Finish)', text: 'Exceptional persistence lasting over 10–12 caudalies (seconds), ending with chalky saline minerality.' },
      ],
    },
  ];

  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-xl p-6 sm:p-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
          THE THREE SENSORY ACTS
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
          The Art of Tasting Grand Cru
        </h3>
        <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
          Drinking Champagne Carbon is a multi-sensory symphony. Take thirty conscious seconds before your first sip to absorb the visual beauty and aromatics.
        </p>
      </div>

      {/* The 2-Phase Pouring Ritual */}
      <div className="bg-[#050505] border border-white/10 rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-[#c9a24b] text-xs font-mono uppercase tracking-widest font-semibold">
          <Wine className="w-4 h-4 text-[#c9a24b]" />
          <span>THE TWO-PHASE SOMMELIER SERVICE (THE POUR)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 border-l-2 border-[#c9a24b]/60 pl-4">
            <span className="font-mono text-xs text-[#c9a24b] font-semibold">Phase 1: The Priming Cascade</span>
            <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
              Tilt the glass at a 45° angle. Slowly pour a single 1-inch stream directly down the side of the glass. Allow the natural foam collar to expand and settle for 5 to 10 seconds. This primes the glass wall and releases initial gas shock.
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-white/40 pl-4">
            <span className="font-mono text-xs text-white font-semibold">Phase 2: The Two-Thirds Fill</span>
            <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
              Straighten the glass and pour gently into the center until the liquid reaches <strong>two-thirds (60–65%)</strong> of the tulip glass bowl. Never fill to the top rim; headroom is mandatory to capture the aromatic bouquet.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Acts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {acts.map((act, idx) => {
          const Icon = act.icon;
          return (
            <div
              key={idx}
              className="bg-[#050505] border border-white/10 hover:border-[#c9a24b]/50 rounded-lg p-6 space-y-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-[#c9a24b] uppercase block">
                      {act.act}
                    </span>
                    <h4 className="font-serif text-xl text-white font-light mt-0.5">
                      {act.french}
                    </h4>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-[#0a0a0c] flex items-center justify-center text-[#c9a24b]">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                </div>

                <div className="text-xs uppercase tracking-wider text-[#a8a49b] font-mono">
                  {act.title}
                </div>

                <div className="space-y-4">
                  {act.points.map((pt, pIdx) => (
                    <div key={pIdx} className="space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-white font-medium">
                        &bull; {pt.label}
                      </div>
                      <p className="text-xs text-[#a8a49b] font-light leading-relaxed pl-3">
                        {pt.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-[#7a7770]">
                Sensory Dimension {idx + 1} of 3
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
