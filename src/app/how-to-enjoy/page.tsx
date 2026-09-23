import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { GlasswareComparison } from '@/components/enjoy/GlasswareComparison';
import { TemperatureGauge } from '@/components/enjoy/TemperatureGauge';
import { UncorkingSteps } from '@/components/enjoy/UncorkingSteps';
import { SensoryRitual } from '@/components/enjoy/SensoryRitual';
import { CarbonThermalShield } from '@/components/enjoy/CarbonThermalShield';
import { FoodPairingMatrix } from '@/components/enjoy/FoodPairingMatrix';
import { ShieldCheck, ArrowRight, Sparkles, Compass, Wine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Enjoy • The Art of Grand Cru Tasting & Service',
  description:
    'The sommelier guide to serving, chilling, and tasting Champagne Carbon in the Philippines. Learn the ideal temperature, glassware architecture, uncorking technique, and gastronomic pairings.',
  openGraph: {
    title: 'How to Enjoy Champagne Carbon • The Grand Cru Ritual',
    description:
      'The definitive guide to serving, chilling, and tasting Champagne Carbon in Manila. Uncorking ceremony, glassware, and fine dining pairings.',
    url: 'https://champagne-carbon.manila-wine.com/how-to-enjoy',
  },
};

export default function HowToEnjoyPage() {
  return (
    <div className="bg-[#050505] text-[#ece9e2] py-8 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-4 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c9a24b]/40 bg-[#c9a24b]/10 text-[#c9a24b] text-[10px] font-mono tracking-widest uppercase">
            <Sparkles className="w-3 h-3" />
            <span>THE SOMMELIER SERVICE PROTOCOL</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white tracking-[0.16em] uppercase font-light leading-tight">
            How To Enjoy
          </h1>

          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
            The Carbon Ritual &bull; The Art of Grand Cru Service
          </p>

          <p className="text-xs sm:text-sm text-[#a8a49b] max-w-2xl mx-auto font-light leading-relaxed pt-2">
            Beyond the sculptural aerospace carbon fiber armor lies an authentic 5th-generation Grand Cru champagne aged for up to a decade in oak barrels in Champillon, France. Here is how discerning connoisseurs honor every drop in the Philippines.
          </p>
        </div>

        {/* Chapter 1: Temperature & Tropical Chilling */}
        <section id="temperature" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="font-mono text-sm text-[#c9a24b] font-bold">01</span>
            <h2 className="font-serif text-xl sm:text-2xl text-white tracking-widest uppercase font-light">
              The Chilling Protocol &amp; Temperature Precision
            </h2>
          </div>
          <TemperatureGauge />
        </section>

        {/* Chapter 2: The Glassware Architecture */}
        <section id="glassware" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="font-mono text-sm text-[#c9a24b] font-bold">02</span>
            <h2 className="font-serif text-xl sm:text-2xl text-white tracking-widest uppercase font-light">
              The Glassware Architecture
            </h2>
          </div>
          <GlasswareComparison />
        </section>

        {/* Chapter 3: The Uncorking Ceremony */}
        <section id="uncorking" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="font-mono text-sm text-[#c9a24b] font-bold">03</span>
            <h2 className="font-serif text-xl sm:text-2xl text-white tracking-widest uppercase font-light">
              The Uncorking Ceremony &bull; Le Soupir de la Dame
            </h2>
          </div>
          <UncorkingSteps />
        </section>

        {/* Chapter 4: The 3 Sensory Acts & The Pour */}
        <section id="sensory" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="font-mono text-sm text-[#c9a24b] font-bold">04</span>
            <h2 className="font-serif text-xl sm:text-2xl text-white tracking-widest uppercase font-light">
              The Three Sensory Acts &amp; The Two-Phase Pour
            </h2>
          </div>
          <SensoryRitual />
        </section>

        {/* Chapter 5: The Carbon Shield Advantage in the Tropics */}
        <section id="carbon-shield" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="font-mono text-sm text-[#c9a24b] font-bold">05</span>
            <h2 className="font-serif text-xl sm:text-2xl text-white tracking-widest uppercase font-light">
              The Aerospace Carbon Armor Advantage
            </h2>
          </div>
          <CarbonThermalShield />
        </section>

        {/* Chapter 6: Gastronomic Pairings */}
        <section id="pairings" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="font-mono text-sm text-[#c9a24b] font-bold">06</span>
            <h2 className="font-serif text-xl sm:text-2xl text-white tracking-widest uppercase font-light">
              Gastronomic Food Pairings &amp; Local Synergy
            </h2>
          </div>
          <FoodPairingMatrix />
        </section>

        {/* Chapter 7: Manila Cellaring & Storage Advisory */}
        <section className="bg-[#08080a] border border-white/10 rounded-xl p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
              PRESERVATION PROTOCOL
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
              Cellaring in the Philippine Climate
            </h3>
            <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
              Manila Wine provides unbroken cold-chain transport from France directly to your cellar. To preserve your collection in Metro Manila, observe three non-negotiable rules:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#050505] border border-white/10 rounded-lg p-6 space-y-3">
              <span className="font-mono text-xs text-[#c9a24b] font-bold">RULE 1</span>
              <h4 className="font-serif text-base text-white">Constant 10°C &ndash; 12°C</h4>
              <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
                Metro Manila experiences rapid heat spikes. Never store fine champagne in an unconditioned pantry or wine rack. Maintain an inverter-controlled wine cabinet set to 11°C.
              </p>
            </div>

            <div className="bg-[#050505] border border-white/10 rounded-lg p-6 space-y-3">
              <span className="font-mono text-xs text-[#c9a24b] font-bold">RULE 2</span>
              <h4 className="font-serif text-base text-white">Horizontal Posture</h4>
              <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
                Lay bottles flat so the champagne remains in constant contact with the natural cork stopper, preventing the cork from drying, shrinking, or oxidizing the vintage.
              </p>
            </div>

            <div className="bg-[#050505] border border-white/10 rounded-lg p-6 space-y-3">
              <span className="font-mono text-xs text-[#c9a24b] font-bold">RULE 3</span>
              <h4 className="font-serif text-base text-white">Vibration-Free Darkness</h4>
              <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
                While the carbon fiber armor provides 100% UV protection, prolonged mechanical vibrations (such as standard kitchen refrigerators) agitate delicate sediments and alter bottle chemistry.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Bar */}
        <div className="bg-[#0a0a0c] border border-[#c9a24b]/40 rounded-xl p-8 sm:p-12 text-center space-y-6 shadow-[0_0_40px_rgba(201,162,75,0.1)]">
          <div className="inline-flex items-center gap-2 text-[#c9a24b] text-xs font-mono tracking-widest uppercase font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>READY TO TASTE THE WORLD’S FIRST CARBON FIBER CHAMPAGNE?</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl text-white tracking-widest uppercase font-light">
            Experience The Masterpiece
          </h3>

          <p className="text-xs sm:text-sm text-[#a8a49b] max-w-xl mx-auto font-light leading-relaxed">
            All 6 cuvées and 11 official Philippine SKUs are in stock, cold-chain conditioned, and ready for express delivery in Metro Manila.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/collection"
              className="w-full sm:w-auto px-8 py-4 bg-[#c9a24b] hover:bg-[#e5c378] text-black font-semibold text-xs tracking-[0.25em] uppercase rounded transition-all shadow-lg hover:shadow-[0_0_25px_rgba(201,162,75,0.4)]"
            >
              Explore The Collection
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium text-xs tracking-[0.25em] uppercase rounded border border-white/20 hover:border-white transition-all flex items-center justify-center gap-2"
            >
              <span>VIP Concierge Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
