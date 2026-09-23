'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { handleAddToCart } from '@/lib/cart';
import { ShoppingBag, Info, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { PresentationExplainerModal } from '@/components/common/PresentationExplainerModal';
import { PRESENTATION_DETAILS } from '@/data/presentations';

export function CuveeShowcase() {
  const [selectedFormats, setSelectedFormats] = useState<Record<string, number>>({});
  const [explainerOpen, setExplainerOpen] = useState(false);
  const [explainerType, setExplainerType] = useState<'handcrafted-carbon' | 'carbon-sleeve-luminous'>('handcrafted-carbon');

  const handleFormatChange = (productId: string, variantIndex: number) => {
    setSelectedFormats(prev => ({ ...prev, [productId]: variantIndex }));
  };

  // 3 Collection Cuvées (Carbon Brut, Carbon Rosé, Carbon Gold Vintage 2015)
  const orderedIds = [
    'carbon-brut',
    'carbon-rose',
    'carbon-gold-vintage-2015'
  ];

  const coreCuvees = orderedIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  const openExplainer = (type: 'handcrafted-carbon' | 'carbon-sleeve-luminous') => {
    setExplainerType(type);
    setExplainerOpen(true);
  };

  return (
    <section className="w-full bg-[#000000] py-10 sm:py-20 lg:py-32 border-b border-white/5 relative">
      <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-8 lg:px-12">
        
        {/* Section Heading matching Champagne Carbon style */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 lg:mb-24 space-y-3 sm:space-y-4">
          <p className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#c9a24b] font-medium">
            PHILIPPINE OFFICIAL ALLOCATION
          </p>
          <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-white tracking-[0.2em] sm:tracking-[0.24em] uppercase font-light">
            THE COLLECTION
          </h2>
          <div className="w-12 sm:w-16 h-[1px] bg-[#c9a24b]/60 mx-auto mt-3 sm:mt-4" />
          <p className="text-xs sm:text-sm text-[#a8a49b] font-light tracking-wider max-w-xl mx-auto pt-1 sm:pt-2">
            Signature Grand Cru cuvées available in genuine 37-stage handcrafted carbon fibre and party-illuminated luminous sleeve editions.
          </p>
        </div>

        {/* 3 Majestic Columns on Pure Black */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 lg:gap-14 max-w-6xl mx-auto">
          {coreCuvees.map((product) => {
            const currentVariantIndex = selectedFormats[product.id] || 0;
            const currentVariant = product.variants[currentVariantIndex] || product.variants[0];
            const isHandcrafted = currentVariant.presentationType === 'handcrafted-carbon';

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between items-center text-center transition-transform duration-500 hover:-translate-y-1 bg-[#050505] p-4 sm:p-6 rounded-xl border border-white/5 hover:border-[#c9a24b]/30"
              >
                {/* Bottle Presentation with Ambient Glow & Floor Reflection */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative w-full h-[340px] sm:h-[440px] lg:h-[480px] flex items-end justify-center mb-4 sm:mb-6 overflow-hidden"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </Link>

                {/* Bottle Details & Typography */}
                <div className="w-full space-y-4 flex flex-col justify-between flex-grow">
                  <div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-serif text-lg sm:text-xl tracking-[0.2em] text-[#c9a24b] uppercase font-light hover:text-white transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="text-[11px] tracking-[0.16em] text-[#a8a49b] uppercase font-light mt-1">
                      {product.subtitle}
                    </div>
                  </div>

                  {/* Presentation Type Badge with Info Modal Trigger */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => openExplainer(currentVariant.presentationType)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-colors border ${
                        isHandcrafted
                          ? 'bg-[#c9a24b]/10 text-[#c9a24b] border-[#c9a24b]/40 hover:bg-[#c9a24b]/20'
                          : 'bg-amber-950/40 text-amber-300 border-amber-700/40 hover:bg-amber-900/40'
                      }`}
                      title="Click to learn about this presentation"
                    >
                      {isHandcrafted ? (
                        <ShieldCheck className="w-3 h-3 text-[#c9a24b]" />
                      ) : (
                        <Sparkles className="w-3 h-3 text-amber-300" />
                      )}
                      <span>{PRESENTATION_DETAILS[currentVariant.presentationType].shortBadge}</span>
                      <Info className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                    </button>
                  </div>

                  {/* Format Selector */}
                  <div className="pt-2 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#a8a49b] font-mono">
                      <span>Presentation:</span>
                      <span className="text-white font-medium">{currentVariant.format}</span>
                    </div>

                    <div className={`grid gap-1.5 ${
                      product.variants.length === 3
                        ? 'grid-cols-3'
                        : product.variants.length === 2
                        ? 'grid-cols-2'
                        : 'grid-cols-1'
                    }`}>
                      {product.variants.map((v, idx) => {
                        const isActive = currentVariantIndex === idx;
                        return (
                          <button
                            key={v.sku}
                            onClick={() => handleFormatChange(product.id, idx)}
                            className={`h-10 px-1.5 flex flex-col items-center justify-center text-[9px] font-mono tracking-wider uppercase transition-all rounded border ${
                              isActive
                                ? 'border-[#c9a24b] bg-[#c9a24b]/15 text-white font-semibold shadow-[0_0_10px_rgba(201,162,75,0.25)]'
                                : 'border-white/15 bg-[#0a0a0a] text-[#a8a49b] hover:border-white/40 hover:text-white'
                            }`}
                          >
                            <span className="font-semibold text-[10px]">{v.volume}</span>
                            <span className="text-[8px] opacity-90">
                              {v.presentationType === 'handcrafted-carbon' ? 'Craft' : '✨ Luminous'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing & Stock Status */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-[#7a7770] block">
                          SKU: {currentVariant.sku}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${currentVariant.stock <= 2 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                          <span className="text-[10px] text-[#a8a49b] font-light">
                            {currentVariant.stock === 1
                              ? 'Only 1 bottle left in PH'
                              : `${currentVariant.stock} bottles available`}
                          </span>
                        </div>
                      </div>

                      <span className="font-serif text-xl sm:text-2xl text-white font-normal">
                        ₱{currentVariant.pricePhp.toLocaleString()}
                      </span>
                    </div>

                    {/* Dual Action Buttons: Add to Cart + Manila Wine Product Page */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart({ product, variant: currentVariant, quantity: 1 })}
                        className="w-full py-3.5 bg-[#c9a24b] hover:bg-[#e5c378] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded transition-all duration-300 shadow-[0_0_15px_rgba(201,162,75,0.25)] hover:shadow-[0_0_25px_rgba(201,162,75,0.45)] flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>ADD TO CART</span>
                      </button>

                      <a
                        href={currentVariant.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[10px] font-mono tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 border border-white/10"
                      >
                        <span>View on Manila-Wine.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Explainer Modal */}
      <PresentationExplainerModal
        isOpen={explainerOpen}
        onClose={() => setExplainerOpen(false)}
        activeType={explainerType}
      />
    </section>
  );
}
