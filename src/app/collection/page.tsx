
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { handleAddToCart } from '@/lib/cart';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function CollectionPage() {
  const [filter, setFilter] = useState<'all' | 'cuvee' | 'bugatti'>('all');
  const [selectedFormats, setSelectedFormats] = useState<Record<string, number>>({});

  const filteredProducts = PRODUCTS.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const handleFormatChange = (productId: string, variantIndex: number) => {
    setSelectedFormats(prev => ({ ...prev, [productId]: variantIndex }));
  };

  const getFormatTag = (formatName: string) => {
    if (formatName.includes('75')) return '75 CL';
    if (formatName.includes('1.5')) return '1.5 L';
    if (formatName.includes('3')) return '3.0 L';
    return formatName;
  };

  return (
    <div className="bg-[#050505] text-[#ece9e2] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header matching Champagne Carbon collection */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a24b] font-medium mb-2">
            PRESTIGE ALLOCATION &bull; CURATED BY MANILA WINE
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-[0.22em] uppercase font-light">
            THE COLLECTION
          </h1>
          <p className="text-xs text-[#a8a49b] mt-4 font-light leading-relaxed">
            Every cuvée is sheltered inside an authentic handcrafted carbon-fiber container. Handcrafted in Champillon, France — distributed in Manila by Manila Wine.
          </p>

          {/* Minimalist Filter Bar */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all ${
                filter === 'all'
                  ? 'border-b-2 border-[#c9a24b] text-white font-medium'
                  : 'text-[#7a7770] hover:text-white'
              }`}
            >
              ALL CUVÉES ({PRODUCTS.length})
            </button>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={() => setFilter('cuvee')}
              className={`px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all ${
                filter === 'cuvee'
                  ? 'border-b-2 border-[#c9a24b] text-white font-medium'
                  : 'text-[#7a7770] hover:text-white'
              }`}
            >
              SIGNATURE CUVÉES ({PRODUCTS.filter(p => p.category === 'cuvee').length})
            </button>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={() => setFilter('bugatti')}
              className={`px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all ${
                filter === 'bugatti'
                  ? 'border-b-2 border-[#c9a24b] text-white font-medium'
                  : 'text-[#7a7770] hover:text-white'
              }`}
            >
              BUGATTI EDITIONS ({PRODUCTS.filter(p => p.category === 'bugatti').length})
            </button>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => {
            const currentVariantIndex = selectedFormats[product.id] || 0;
            const currentVariant = product.variants[currentVariantIndex];

            return (
              <div key={product.id} className="carbon-prod-card group">
                
                {/* Classification */}
                <div className="p-4 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase font-medium">
                  <span className="text-[#c9a24b]">
                    {product.category === 'bugatti' ? 'BUGATTI EDITION' : product.specifications.classification}
                  </span>
                  <span className="text-white/40">
                    {product.vintage !== 'NV' ? `VINTAGE ${product.vintage}` : 'NV'}
                  </span>
                </div>

                {/* Bottle image */}
                <Link href={`/products/${product.slug}`} className="carbon-prod-card__image-wrap">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="text-center">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="carbon-prod-card__title group-hover:text-[#c9a24b] transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="carbon-prod-card__vintage">
                      {product.subtitle}
                    </div>
                  </div>

                  {/* Format Selector: Unbreakable clean tags */}
                  <div className="pt-2 space-y-1.5">
                    <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.16em] text-[#a8a49b] font-mono">
                      <span>FORMAT:</span>
                      <span className="text-[#c9a24b] font-medium">{currentVariant.format}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {product.variants.map((v, idx) => {
                        const tag = getFormatTag(v.format);
                        const isActive = currentVariantIndex === idx;
                        return (
                          <button
                            key={v.format}
                            onClick={() => handleFormatChange(product.id, idx)}
                            className={`h-9 px-1 flex items-center justify-center text-[10px] font-mono tracking-wider uppercase transition-all whitespace-nowrap border ${
                              isActive
                                ? 'border-[#c9a24b] bg-[#c9a24b]/10 text-white font-semibold shadow-[0_0_10px_rgba(201,162,75,0.25)]'
                                : 'border-white/20 bg-[#080808] text-[#a8a49b] hover:border-white/50 hover:text-white'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] uppercase tracking-wider text-[#a8a49b]">
                        Allocation
                      </span>
                      <span className="font-serif text-xl text-white font-normal">
                        {currentVariant.pricePhp ? `₱${currentVariant.pricePhp.toLocaleString()}` : 'Inquire'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart({ product, variant: currentVariant, quantity: 1 })}
                      className="carbon-add-to-cart-btn text-xs py-3.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO CART</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
