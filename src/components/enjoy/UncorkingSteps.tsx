'use client';

import React from 'react';
import { Compass, Shield, RotateCw, VolumeX, Flag } from 'lucide-react';

export function UncorkingSteps() {
  const steps = [
    {
      num: '01',
      title: 'Anchor The Thumb',
      subtitle: 'Safety & Muselet Release',
      icon: Shield,
      desc: 'Peel the luxury black foil collar. Untwist the wire loop (6 half-turns) while maintaining continuous downward thumb pressure on the cork. Never take your thumb off the cork.',
    },
    {
      num: '02',
      title: 'The 45° Trajectory',
      subtitle: 'Surface Area Pressure Relief',
      icon: Compass,
      desc: 'Tilt the bottle at a steady 45-degree angle pointed safely away from guests. This angle maximizes wine surface area inside, reducing internal vertical gas propulsion.',
    },
    {
      num: '03',
      title: 'Turn The Base, Not The Cork',
      subtitle: 'Carbon Fiber Grip Advantage',
      icon: RotateCw,
      desc: 'Firmly grasp the cork and muselet in one hand. With the other hand, twist the base of the bottle slowly in one direction. The aerospace carbon texture provides extraordinary traction.',
    },
    {
      num: '04',
      title: '“Le Soupir de la Dame”',
      subtitle: 'The Reverent Whisper',
      icon: VolumeX,
      desc: 'As internal pressure (5–6 bars) pushes the cork up, resist gently until you hear a soft, sensual hiss—the “Lady’s Sigh”. A silent opening keeps 100% of the micro-beads dissolved in the wine.',
    },
  ];

  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-xl p-6 sm:p-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
          THE UNCORKING CEREMONY
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
          The Art of Opening Without Waste
        </h3>
        <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
          Inside each Champagne Carbon bottle sits between 5 to 6 atmospheres of pressure—equal to the tire pressure of a Formula 1 racing car. Opening is a choreographed ballet.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#050505] border border-white/10 hover:border-[#c9a24b]/40 rounded-lg p-6 space-y-4 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#c9a24b] font-bold border border-[#c9a24b]/30 bg-[#c9a24b]/10 px-2.5 py-0.5 rounded">
                    STEP {item.num}
                  </span>
                  <Icon className="w-5 h-5 text-[#7a7770] group-hover:text-[#c9a24b] transition-colors" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-base text-white font-medium group-hover:text-[#c9a24b] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#a8a49b]">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#a8a49b] font-light leading-relaxed pt-2 border-t border-white/5">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-[#7a7770]">
                <span>Stage {idx + 1} of 4</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Podium vs Cellar Distinction */}
      <div className="bg-[#0c0c0e] border border-white/10 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#c9a24b] text-xs font-mono uppercase tracking-widest font-semibold">
            <Flag className="w-4 h-4 text-[#c9a24b]" />
            <span>F1 PODIUM SPRAY VS. PRIVATE CELLAR TASTING</span>
          </div>
          <p className="text-xs text-[#a8a49b] font-light leading-relaxed max-w-2xl">
            When Champagne Carbon served as the official Champagne of Formula 1, race winners celebrated by shaking and spraying Jeroboams on the podium. But at your private table, shaking a Grand Cru vintage destroys years of cellar craftsmanship. Respect the wine: whisper, do not blast.
          </p>
        </div>
        <div className="flex-shrink-0 text-center px-4 py-2 border border-white/10 rounded bg-[#050505]">
          <span className="text-[10px] font-mono text-[#7a7770] uppercase block">Pressure Kept</span>
          <span className="text-lg font-serif font-bold text-[#c9a24b]">100%</span>
        </div>
      </div>

    </div>
  );
}
