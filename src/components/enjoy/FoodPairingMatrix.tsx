'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Utensils, Sparkles, ExternalLink } from 'lucide-react';
import { getProductBySlug } from '@/data/products';

export function FoodPairingMatrix() {
  const pairings = [
    {
      cuvee: 'Carbon Brut Icon',
      slug: 'carbon-brut',
      image: '/images/bottles/carbon-brut-1.png',
      tag: 'Grand Cru Chardonnay & Pinot Noir',
      price: '₱23,500',
      profile: 'Chalky minerality, green apple, white floral, delicate brioche.',
      pairingsGlobal: ['Beluga or Oscietra Caviar on warm blinis', 'Fine de Claire N°2 Oysters with lemon & mignonette', 'Wild Brittany Turbot in champagne beurre blanc'],
      pairingsLocal: ['Crisp Roast Lechon Belly with liver reduction', 'Butter-Poached Palawan Tiger Prawns with garlic', 'Grilled Chilean Sea Bass with kalamansi emulsion'],
    },
    {
      cuvee: 'Carbon Rosé Haute Couture',
      slug: 'carbon-rose',
      image: '/images/bottles/carbon-rose-1.png',
      tag: 'Pinot Noir Dominant with Grand Cru Red Wine',
      price: '₱26,250',
      profile: 'Wild strawberry, redcurrant, blood orange, subtle pink peppercorn.',
      pairingsGlobal: ['Jamón Ibérico de Bellota 100% Pata Negra', 'Pan-Seared Duck Breast with Bing cherry jus', 'Grilled Blue Lobster with coral butter'],
      pairingsLocal: ['Charcoal-Grilled Wagyu Ribeye Inasal', 'Yellowfin Tuna Sashimi with pickled singkamas', 'Bespoke Dark Chocolate & Benguet Strawberry Tart'],
    },
    {
      cuvee: 'Bugatti Edition & Vintage Allocations',
      slug: 'bugatti-eb-01-vintage-2002',
      image: '/images/bottles/eb-01-bugatti-vintage-2002-1.png',
      tag: 'Vintage 2002 & 2015 Prestige Reserve',
      price: '₱28,750',
      profile: 'Roasted hazelnut, dried apricot, white truffle, honeyed brioche, chalk finish.',
      pairingsGlobal: ['A5 Miyazaki Wagyu with morel mushroom sauce', 'Autumn Black Truffle Risotto with aged parmesan', '36-Month Aged French Comté & Mimolette'],
      pairingsLocal: ['Roasted Bone Marrow with royal caviar crown', 'Slow-Braised Kurobuta Pork with truffle adobo jus', 'Aged artisanal Davao goat cheese with raw honey'],
    },
  ];

  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-xl p-6 sm:p-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
          GASTRONOMIC SYNERGY
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-widest uppercase font-light">
          Bespoke Culinary Pairings
        </h3>
        <p className="text-xs text-[#a8a49b] font-light leading-relaxed">
          Because Champagne Carbon is fermented in traditional oak barrels, its vinous complexity pairs effortlessly with both classical European haute cuisine and elevated Philippine gastronomy.
        </p>
      </div>

      {/* 3 Pairing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {pairings.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#050505] border border-white/10 hover:border-[#c9a24b]/40 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 group"
          >
            <div className="space-y-6">
              
              {/* Bottle Thumbnail & Title */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="relative w-16 h-24 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src={item.image}
                    alt={item.cuvee}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#c9a24b] uppercase block">
                    {item.tag}
                  </span>
                  <h4 className="font-serif text-lg text-white font-medium mt-0.5">
                    {item.cuvee}
                  </h4>
                  <span className="font-mono text-xs text-white/80">From {item.price}</span>
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7a7770]">Aromatic Profile</span>
                <p className="text-xs text-[#ece9e2]/80 font-light italic">
                  &ldquo;{item.profile}&rdquo;
                </p>
              </div>

              {/* Classical Pairings */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#c9a24b]">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Classical European Haute Cuisine</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#a8a49b] font-light">
                  {item.pairingsGlobal.map((dish, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-[#c9a24b] text-[10px] font-mono">&bull;</span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Philippine Gastronomy */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#e5c378]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Philippine Gourmet Synergy</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#a8a49b] font-light">
                  {item.pairingsLocal.map((dish, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-[#e5c378] text-[10px] font-mono">&bull;</span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Link to Product */}
            <div className="pt-6 mt-6 border-t border-white/5">
              <Link
                href={`/products/${item.slug}`}
                className="w-full py-2.5 bg-white/5 hover:bg-[#c9a24b] text-white hover:text-black transition-colors rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10 hover:border-[#c9a24b]"
              >
                <span>View Allocation Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
