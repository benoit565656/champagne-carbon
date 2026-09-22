'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { handleAddToCart } from '@/lib/cart';
import { ShoppingBag, ArrowUpRight, ExternalLink, ShieldCheck, Sparkles, Info } from 'lucide-react';
import { PresentationExplainerModal } from '@/components/common/PresentationExplainerModal';
import { PRESENTATION_DETAILS } from '@/data/presentations';

export default function CollectionPage() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'cuvee' | 'bugatti' | 'limited'>('all');
  const [presentationFilter, setPresentationFilter] = useState<'all' | 'handcrafted-carbon' | 'carbon-sleeve-luminous'>('all');
  const [selectedFormats, setSelectedFormats] = useState<Record<string, number>>({});
  const [explainerOpen, setExplainerOpen] = useState(false);
  const [explainerType, setExplainerType] = useState<'handcrafted-carbon' | 'carbon-sleeve-luminous'>('handcrafted-carbon');

  const filteredProducts = PRODUCTS.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) {
      if (categoryFilter === 'cuvee' && p.category === 'limited') return true;
      return false;
    }
    if (presentationFilter !== 'all') {
      const hasPres = p.variants.some(v => v.presentationType === presentationFilter);
      if (!hasPres) return false;
    }
    return true;
  });

  const handleFormatChange = (productId: string, variantIndex: number) => {
    setSelectedFormats(prev => ({ ...prev, [productId]: variantIndex }));
  };

  const openExplainer = (type: 'handcrafted-carbon' | 'carbon-sleeve-luminous') => {
    setExplainerType(type);
    setExplainerOpen(true);
  };

  return (
    <div className="bg-[#050505] text-[#ece9e2] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
            OFFICIAL ALLOCATION &bull; CURATED BY MANILA WINE
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-[0.22em] uppercase font-light">
            THE COLLECTION
          </h1>
          <p className="text-xs text-[#a8a49b] font-light leading-relaxed max-w-xl mx-auto">
            Explore Champagne Carbon’s 6 prestigious cuvées across 11 official Philippine SKUs—including genuine 37-stage handcrafted carbon fiber bottles and illuminated luminous sleeve party editions.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 pt-4 text-xs font-mono tracking-wider uppercase">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-full border transition-all ${
                categoryFilter === 'all'
                  ? 'bg-[#c9a24b] text-black border-[#c9a24b] font-semibold'
                  : 'bg-[#0a0a0a] text-[#a8a49b] border-white/10 hover:text-white'
              }`}
            >
              All Champagnes (6)
            </button>
            <button
              onClick={() => setCategoryFilter('cuvee')}
              className={`px-4 py-2 rounded-full border transition-all ${
                categoryFilter === 'cuvee'
                  ? 'bg-[#c9a24b] text-black border-[#c9a24b] font-semibold'
                  : 'bg-[#0a0a0a] text-[#a8a49b] border-white/10 hover:text-white'
              }`}
            >
              Signature &amp; Gold Cuvées (3)
            </button>
            <button
              onClick={() => setCategoryFilter('bugatti')}
              className={`px-4 py-2 rounded-full border transition-all ${
                categoryFilter === 'bugatti'
                  ? 'bg-[#c9a24b] text-black border-[#c9a24b] font-semibold'
                  : 'bg-[#0a0a0a] text-[#a8a49b] border-white/10 hover:text-white'
              }`}
            >
              Bugatti Editions (3)
            </button>
          </div>

          {/* Secondary Filter: Presentation Type */}
          <div className="flex justify-center items-center gap-3 pt-2 text-[11px] font-mono tracking-wider">
            <span className="text-[#7a7770]">Presentation:</span>
            <button
              onClick={() => setPresentationFilter('all')}
              className={`hover:underline ${presentationFilter === 'all' ? 'text-[#c9a24b] font-semibold' : 'text-[#a8a49b]'}`}
            >
              All
            </button>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={() => setPresentationFilter('handcrafted-carbon')}
              className={`hover:underline ${presentationFilter === 'handcrafted-carbon' ? 'text-[#c9a24b] font-semibold' : 'text-[#a8a49b]'}`}
            >
              Handcrafted Carbon Fibre
            </button>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={() => setPresentationFilter('carbon-sleeve-luminous')}
              className={`hover:underline ${presentationFilter === 'carbon-sleeve-luminous' ? 'text-[#c9a24b] font-semibold' : 'text-[#a8a49b]'}`}
            >
              Luminous Sleeve
            </button>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => {
            const currentVariantIndex = selectedFormats[product.id] || 0;
            const currentVariant = product.variants[currentVariantIndex] || product.variants[0];
            const isHandcrafted = currentVariant.presentationType === 'handcrafted-carbon';

            return (
              <div key={product.id} className="carbon-prod-card group flex flex-col justify-between">
                
                {/* Classification & Vintage Top Row */}
                <div className="p-4 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase font-medium border-b border-white/5">
                  <span className="text-[#c9a24b]">
                    {product.category === 'bugatti' ? 'BUGATTI EDITION' : product.specifications.classification}
                  </span>
                  <span className="text-white/40">
                    {product.vintage}
                  </span>
                </div>

                {/* Bottle Image */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative w-full h-[420px] flex items-end justify-center p-6 overflow-hidden"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>

                {/* Details */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-serif text-xl tracking-[0.16em] text-white uppercase font-light group-hover:text-[#c9a24b] transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-[#a8a49b] tracking-wider uppercase mt-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Presentation Badge */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openExplainer(currentVariant.presentationType)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border transition-colors ${
                        isHandcrafted
                          ? 'bg-[#c9a24b]/10 text-[#c9a24b] border-[#c9a24b]/40 hover:bg-[#c9a24b]/20'
                          : 'bg-amber-950/40 text-amber-300 border-amber-700/50 hover:bg-amber-900/40'
                      }`}
                    >
                      {isHandcrafted ? <ShieldCheck className="w-3 h-3 text-[#c9a24b]" /> : <Sparkles className="w-3 h-3 text-amber-300" />}
                      <span>{PRESENTATION_DETAILS[currentVariant.presentationType].shortBadge}</span>
                      <Info className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                    </button>

                    <div className="ml-auto flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${currentVariant.stock <= 2 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                      <span className="text-[10px] text-[#a8a49b] font-mono">
                        {currentVariant.stock === 1 ? '1 in PH' : `${currentVariant.stock} in stock`}
                      </span>
                    </div>
                  </div>

                  {/* Format Switcher */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-[9px] uppercase tracking-wider text-[#7a7770] font-mono">
                      <span>Presentation:</span>
                      <span className="text-white">{currentVariant.format}</span>
                    </div>

                    <div className={`grid gap-1.5 ${product.variants.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      {product.variants.map((v, idx) => (
                        <button
                          key={v.sku}
                          onClick={() => handleFormatChange(product.id, idx)}
                          className={`h-8 px-1 flex flex-col items-center justify-center text-[9px] font-mono tracking-wider uppercase transition-all border ${
                            currentVariantIndex === idx
                              ? 'border-[#c9a24b] bg-[#c9a24b]/15 text-white font-semibold'
                              : 'border-white/15 bg-[#0a0a0a] text-[#a8a49b] hover:border-white/40 hover:text-white'
                          }`}
                        >
                          <span>{v.volume}</span>
                          <span className="text-[8px] opacity-70">
                            {v.presentationType === 'handcrafted-carbon' ? 'Craft' : 'Sleeve'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-mono text-[#7a7770]">
                        SKU: {currentVariant.sku}
                      </span>
                      <span className="font-serif text-2xl text-white font-normal">
                        ₱{currentVariant.pricePhp.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleAddToCart({ product, variant: currentVariant, quantity: 1 })}
                        className="w-full py-3 bg-[#c9a24b] hover:bg-[#e5c378] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>ADD TO CART</span>
                      </button>

                      <a
                        href={currentVariant.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[10px] font-mono tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1.5 border border-white/10"
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
    </div>
  );
}
