'use client';

import React from 'react';
import { X, Sparkles, Shield, Zap } from 'lucide-react';
import { PRESENTATION_DETAILS } from '@/data/presentations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeType?: 'handcrafted-carbon' | 'carbon-sleeve-luminous';
}

export function PresentationExplainerModal({ isOpen, onClose, activeType }: Props) {
  if (!isOpen) return null;

  const handcrafted = PRESENTATION_DETAILS['handcrafted-carbon'];
  const sleeve = PRESENTATION_DETAILS['carbon-sleeve-luminous'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#c9a24b]/40 rounded-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(201,162,75,0.15)] text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium font-serif">
            MANILA WINE ALLOCATION GUIDE
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-[0.15em] uppercase font-light">
            Bottle Presentations Explained
          </h3>
        </div>

        {/* Three Presentation Explanations */}
        <div className="space-y-3.5 pt-1">
          {/* 1. Handcrafted Carbon Fibre */}
          <div className={`p-4 sm:p-5 rounded-lg border transition-all ${
            activeType === 'handcrafted-carbon' || !activeType
              ? 'bg-[#121214] border-[#c9a24b] shadow-[0_0_20px_rgba(201,162,75,0.15)]'
              : 'bg-[#0d0d0f] border-white/10 opacity-70'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <Shield className="w-4 h-4 text-[#c9a24b]" />
              <h4 className="font-serif text-sm sm:text-base text-white tracking-wider font-semibold uppercase">
                1. Handcrafted Carbon Fibre Bottle (Craft)
              </h4>
              <span className="ml-auto text-[9px] font-mono uppercase bg-[#c9a24b]/15 text-[#c9a24b] px-2 py-0.5 rounded border border-[#c9a24b]/40">
                Collector Tier
              </span>
            </div>
            <p className="text-xs text-[#d1ceca] font-light leading-relaxed">
              The bottle is individually coated with genuine carbon fibre composite through 37 meticulous artisanal stages in Champillon. An ultra-luxury, feather-light, high-strength work of art designed for prestige cellars, automotive connoisseurs, and executive gifting.
            </p>
          </div>

          {/* 2. Carbon-Look Sleeve */}
          <div className="p-4 sm:p-5 rounded-lg border bg-[#0d0d0f] border-white/10">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center text-[9px] text-white">✓</div>
              <h4 className="font-serif text-sm sm:text-base text-white tracking-wider font-semibold uppercase">
                2. Carbon-Look Sleeve Bottle
              </h4>
              <span className="ml-auto text-[9px] font-mono uppercase bg-white/10 text-[#a8a49b] px-2 py-0.5 rounded border border-white/20">
                Accessible Tier
              </span>
            </div>
            <p className="text-xs text-[#d1ceca] font-light leading-relaxed">
              The bottle is dressed in a high-precision graphic sleeve recreating Champagne Carbon’s signature carbon-fibre weave texture over premium Champagne glass, offering the iconic racing aesthetic at a more accessible price point.
            </p>
          </div>

          {/* 3. The Luminous Edition */}
          <div className={`p-4 sm:p-5 rounded-lg border transition-all ${
            activeType === 'carbon-sleeve-luminous'
              ? 'bg-[#121214] border-[#c9a24b] shadow-[0_0_20px_rgba(201,162,75,0.15)]'
              : 'bg-[#0d0d0f] border-amber-700/40'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h4 className="font-serif text-sm sm:text-base text-white tracking-wider font-semibold uppercase">
                3. The Luminous Edition (Party &amp; Nightlife)
              </h4>
              <span className="ml-auto text-[9px] font-mono uppercase bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded border border-amber-700/50">
                ✨ Touch Activated
              </span>
            </div>
            <p className="text-xs text-[#d1ceca] font-light leading-relaxed mb-2.5">
              Built upon the carbon-look sleeve, this special edition incorporates an integrated battery and LED lighting system. Simply touch or press the activation point on the base to illuminate the bottle with a glowing champagne aura for VIP nightlife and celebrations.
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#e5c378] font-light">
              <Zap className="w-3.5 h-3.5 text-[#c9a24b] flex-shrink-0" />
              <span>
                <strong>Manila Wine Inventory Note:</strong> 100% of the sleeve bottles in our Philippine stock are the top-tier <strong>Luminous Edition</strong> with active illumination.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#c9a24b] hover:bg-[#e5c378] text-black font-semibold text-xs uppercase tracking-wider rounded transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
