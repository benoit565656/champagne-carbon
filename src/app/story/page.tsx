import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layers, Clock, Trophy, Crown, ArrowRight } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="bg-[#050505] text-[#ece9e2] py-8 sm:py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20 lg:space-y-28">
        
        {/* Story Hero */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c9a24b] font-semibold block mb-3">
            HERITAGE &bull; CRAFTSMANSHIP &bull; INNOVATION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-[0.16em] uppercase font-light">
            The Carbon Story
          </h1>
          <p className="text-[#a8a49b] text-xs sm:text-sm mt-4 leading-relaxed font-light">
            CARBON is the combination of traditional Grand Cru champagne and futuristic bottle design. A multi-sensory experience achieved through the fusion of a sophisticated elixir and a pure-lined aerospace container.
          </p>
        </div>

        {/* Section 1: Striving for Excellence & 37 Steps (Properly Positioned Anchor) */}
        <div id="37-steps" className="scroll-mt-36 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#c9a24b] text-xs uppercase tracking-widest font-semibold">
              <Layers className="w-4 h-4" />
              <span>Aerospace Architecture</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider font-light">
              Striving for Excellence: The 37 Steps
            </h2>
            <p className="text-xs sm:text-sm text-[#ece9e2]/80 leading-relaxed font-light">
              The wonderful CARBON Champagne cuvées are contained in a handcrafted bottle. A carbon-fiber coating, requiring <strong className="text-white font-medium">37 complex artisanal steps</strong>, is meticulously applied to each bottle and finished by hand.
            </p>
            <p className="text-xs sm:text-sm text-[#ece9e2]/80 leading-relaxed font-light">
              Beyond its striking sculptural appearance, this unique aerospace composite application completely protects the wine from all ultraviolet light and preserves its exquisite taste over prolonged cellar aging.
            </p>
          </div>
          <div className="relative h-80 sm:h-96 w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#080808] flex items-center justify-center">
            <Image
              src="/images/bottles/blanc-de-noirs-vintage-2009-1.png"
              alt="Carbon Fiber Craftsmanship"
              fill
              className="object-contain p-6"
            />
          </div>
        </div>

        {/* Section 2: Backstage of Carbon - Oak Barrels (Properly Positioned Anchor) */}
        <div id="cellars" className="scroll-mt-36 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative h-80 sm:h-96 w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#080808] flex items-center justify-center">
            <Image
              src="/images/bottles/carbon-brut-1.png"
              alt="Oak Barrel Cellar"
              fill
              className="object-contain p-6"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-4">
            <div className="flex items-center gap-2 text-[#c9a24b] text-xs uppercase tracking-widest font-semibold">
              <Clock className="w-4 h-4" />
              <span>Champillon Cellars</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider font-light">
              Backstage of Carbon: Traditional Oak Barrels
            </h2>
            <p className="text-xs sm:text-sm text-[#ece9e2]/80 leading-relaxed font-light">
              For CARBON, the final product is achieved by the best process. We are not looking for volume, but quality and quintessence in our champagnes.
            </p>
            <p className="text-xs sm:text-sm text-[#ece9e2]/80 leading-relaxed font-light">
              We use traditional oak barrels. They have to be turned, cleaned, and gently refilled every day to balance evaporation &mdash; a task performed by a single master cellarman, who looks after each barrel individually at the CARBON Champagne House.
            </p>
            <p className="text-xs text-[#a8a49b] leading-relaxed font-light">
              After months in oak, the wine is transferred to bottles where it will age for at least 5 to 20 years in deep chalk cellars before release.
            </p>
          </div>
        </div>

        {/* Section 3: The Formula 1 Adventure (Properly Positioned Anchor) */}
        <div id="f1" className="scroll-mt-36 bg-[#0a0a0c] border border-white/10 rounded-xl p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2 text-[#c9a24b] text-xs uppercase tracking-widest font-semibold">
            <Trophy className="w-4 h-4" />
            <span>Official Formula 1 Partner (2017 &ndash; 2019)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider font-light">
            The F1 Adventure: Standing on Global Podiums
          </h2>
          <p className="text-xs sm:text-sm text-[#ece9e2]/80 leading-relaxed font-light max-w-3xl">
            From 2017 to 2019, CARBON was the official champagne of Formula 1. It was on the world&apos;s most famous podiums that the international public discovered this new showcase of champagne for the very first time.
          </p>
          <p className="text-xs sm:text-sm text-[#ece9e2]/80 leading-relaxed font-light max-w-3xl">
            Carbon fiber naturally connects the Champagne house with the premier class of motorsport, of which racing cars are composed. Today, this high-performance racing pedigree lives on through exclusive allocations in Manila.
          </p>
        </div>

        {/* Section 4: Monte-Carlo Royal Cuvée (Properly Positioned Anchor) */}
        <div id="monte-carlo" className="scroll-mt-36 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#c9a24b] text-xs uppercase tracking-widest font-semibold">
              <Crown className="w-4 h-4" />
              <span>A Taste of Principality</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider font-light">
              Official Champagne of Monte-Carlo
            </h2>
            <p className="text-xs sm:text-sm text-[#ece9e2]/80 leading-relaxed font-light">
              H.S.H. Prince Albert II and Alexandre Mea inaugurated the launch of Champagne CARBON Cuvée Royale Monte-Carlo. CARBON became an officially licensed champagne of the &ldquo;Monte-Carlo&rdquo; brand after being selected by a panel of the Principality&apos;s best sommeliers during blind tastings.
            </p>
          </div>
          <div className="relative h-80 sm:h-96 w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#080808] flex items-center justify-center">
            <Image
              src="/images/bottles/carbon-rose-1.png"
              alt="Monte Carlo Royal Cuvée"
              fill
              className="object-contain p-6"
            />
          </div>
        </div>

        {/* Call to action to collection */}
        <div className="text-center pt-8">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black font-semibold text-xs tracking-[0.25em] uppercase transition-all shadow-lg hover:shadow-[0_0_25px_rgba(201,162,75,0.4)]"
          >
            <span>DISCOVER THE FULL COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
