'use client';

import React from 'react';
import { Thermometer, Snowflake, AlertOctagon, Droplets, Clock } from 'lucide-react';

export function TemperatureGauge() {
  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-xl p-6 sm:p-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
          THERMAL MASTERY
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
          The Precision Temperature Spectrum
        </h3>
        <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
          Too cold (&lt;6°C) paralyzes the taste buds and mutes the oak-aged complexity. Too warm (&gt;14°C) causes uncontrolled foam and heavy alcohol perception.
        </p>
      </div>

      {/* Visual Temperature Scale */}
      <div className="bg-[#050505] border border-white/10 rounded-lg p-6 sm:p-8 space-y-6">
        
        {/* Scale Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-mono text-[#a8a49b]">
            <span>4°C &bull; Too Frigid</span>
            <span className="text-[#c9a24b]">8°C – 10°C &bull; Brut & Rosé</span>
            <span className="text-amber-300">10°C – 12°C &bull; Vintage Prestige</span>
            <span>16°C &bull; Too Warm</span>
          </div>

          <div className="relative h-6 w-full rounded-full bg-gradient-to-r from-cyan-950 via-sky-900 to-amber-950/60 p-0.5 border border-white/15 overflow-hidden">
            {/* 8°C - 10°C highlighted segment */}
            <div className="absolute left-[33%] w-[25%] h-full bg-[#c9a24b]/40 border-x-2 border-[#c9a24b] flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold tracking-wider text-white uppercase hidden sm:inline">
                Brut / Rosé
              </span>
            </div>
            {/* 10°C - 12°C highlighted segment */}
            <div className="absolute left-[58%] w-[22%] h-full bg-amber-500/30 border-r-2 border-amber-400 flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold tracking-wider text-amber-200 uppercase hidden sm:inline">
                Vintage Prestige
              </span>
            </div>
          </div>
        </div>

        {/* 2 Target Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Card 1: Brut & Rosé */}
          <div className="bg-[#0a0a0d] border border-[#c9a24b]/40 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c9a24b] font-semibold">
                NON-VINTAGE ICONS
              </span>
              <span className="font-mono text-xs text-white font-bold bg-[#c9a24b]/20 px-2 py-0.5 rounded border border-[#c9a24b]/40">
                8°C &ndash; 10°C (46°F &ndash; 50°F)
              </span>
            </div>
            <h4 className="font-serif text-lg text-white font-light">Carbon Brut & Carbon Rosé</h4>
            <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
              At 8°C–10°C, the razor-sharp freshness of Chardonnay and the red berry radiance of Pinot Noir shine with maximum effervescent vitality. The bead is fine, energetic, and palate-cleansing.
            </p>
          </div>

          {/* Card 2: Vintage Prestige */}
          <div className="bg-[#0a0a0d] border border-amber-500/40 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                VINTAGE ALLOCATIONS
              </span>
              <span className="font-mono text-xs text-white font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                10°C &ndash; 12°C (50°F &ndash; 54°F)
              </span>
            </div>
            <h4 className="font-serif text-lg text-white font-light">Bugatti &Eacute;B.01, EB.02, 2015 Gold, 2009 BdN</h4>
            <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
              Mature Grand Cru vintage cuvées need slightly elevated warmth. 10°C–12°C releases the profound tertiary notes of toasted brioche, candied citrus peel, white truffle, and Champillon oak barrel maturation.
            </p>
          </div>

        </div>

      </div>

      {/* The Manila Tropical Chilling Protocol & Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* The 50/50 Ice Bucket Method */}
        <div className="bg-[#050505] border border-white/10 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3 text-[#c9a24b]">
            <Droplets className="w-5 h-5 flex-shrink-0" />
            <h4 className="font-serif text-base uppercase tracking-wider text-white">The Sommelier 50/50 Ice Bucket</h4>
          </div>
          <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
            In Metro Manila’s ambient 28°C–32°C climate, ice alone creates air pockets with poor thermal conductivity. The proven sommelier technique:
          </p>
          <ul className="space-y-2 text-xs text-[#ece9e2]/80 font-light">
            <li className="flex items-start gap-2">
              <span className="text-[#c9a24b] font-mono font-bold">&bull;</span>
              <span>Fill wine cooler with <strong className="text-white font-medium">50% fresh ice cubes</strong> and <strong className="text-white font-medium">50% cold water</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a24b] font-mono font-bold">&bull;</span>
              <span>Submerge bottle up to its shoulder for precisely <strong className="text-white font-medium">20 to 25 minutes</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c9a24b] font-mono font-bold">&bull;</span>
              <span>Keep a crisp linen cloth (*liteau*) nearby to dry the carbon fiber bottle before serving.</span>
            </li>
          </ul>
        </div>

        {/* The Freezer Hazard */}
        <div className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3 text-rose-400">
            <AlertOctagon className="w-5 h-5 flex-shrink-0" />
            <h4 className="font-serif text-base uppercase tracking-wider text-white">The Domestic Freezer Warning</h4>
          </div>
          <p className="text-xs text-rose-200/80 font-light leading-relaxed">
            Never place Champagne Carbon inside a household freezer:
          </p>
          <ul className="space-y-2 text-xs text-[#ece9e2]/70 font-light">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-mono font-bold">&times;</span>
              <span><strong>Thermal Shock</strong> freezes the delicate neck first, breaking the dissolved $CO_2$ equilibrium and flattening the bubbles.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-mono font-bold">&times;</span>
              <span>Extreme cold contraction risks warping the natural cork elasticity and creates pressure anomalies beneath the carbon fiber armor.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-mono font-bold">&times;</span>
              <span>If time is urgent, 15 minutes in a 50/50 ice water bath chills 4&times; faster than dry air in a freezer.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
