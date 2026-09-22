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

        {/* Two Presentation Cards */}
        <div className="space-y-4 pt-2">
          {/* 1. Handcrafted Carbon Fibre */}
          <div className={`p-5 rounded-lg border transition-all ${
            activeType === 'handcrafted-carbon' || !activeType
              ? 'bg-[#121214] border-[#c9a24b] shadow-[0_0_20px_rgba(201,162,75,0.15)]'
              : 'bg-[#0d0d0f] border-white/10 opacity-70'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#c9a24b]" />
              <h4 className="font-serif text-base text-white tracking-wider font-semibold uppercase">
                {handcrafted.name}
              </h4>
              <span className="ml-auto text-[9px] font-mono uppercase bg-[#c9a24b]/15 text-[#c9a24b] px-2 py-0.5 rounded border border-[#c9a24b]/40">
                Collector Tier
              </span>
            </div>
            <p className="text-xs text-[#d1ceca] font-light leading-relaxed">
              {handcrafted.description}
            </p>
          </div>

          {/* 2. Carbon-Look Sleeve & Luminous */}
          <div className={`p-5 rounded-lg border transition-all ${
            activeType === 'carbon-sleeve-luminous'
              ? 'bg-[#121214] border-[#c9a24b] shadow-[0_0_20px_rgba(201,162,75,0.15)]'
              : 'bg-[#0d0d0f] border-white/10'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#e5c378]" />
              <h4 className="font-serif text-base text-white tracking-wider font-semibold uppercase">
                {sleeve.name}
              </h4>
              <span className="ml-auto text-[9px] font-mono uppercase bg-amber-950/60 text-amber-300 px-2 py-0.5 rounded border border-amber-700/50">
                Celebration Tier
              </span>
            </div>
            <p className="text-xs text-[#d1ceca] font-light leading-relaxed mb-3">
              {sleeve.description}
            </p>

            {/* Luminous illumination note */}
            <div className="pt-3 border-t border-white/10 flex items-start gap-2 text-xs text-[#e5c378] font-light">
              <Zap className="w-4 h-4 text-[#c9a24b] flex-shrink-0 mt-0.5" />
              <span>
                <strong className="font-medium text-white">Touch-Activated Illumination:</strong>{' '}
                {sleeve.luminousFeature}
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
