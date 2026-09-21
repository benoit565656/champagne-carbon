'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { handleAddToCart } from '@/lib/cart';
import { ShoppingBag } from 'lucide-react';

export function BugattiSection() {
  const [selectedFormats, setSelectedFormats] = useState<Record<string, number>>({});

  const handleFormatChange = (productId: string, variantIndex: number) => {
    setSelectedFormats(prev => ({ ...prev, [productId]: variantIndex }));
  };

  // Exact order matching champagnecarbon.com screenshot:
  // 1. EB.01 Vintage 2002, 2. EB.02 Chiron 300+ 2006, 3. Bolide 2017
  const orderedIds = [
    'carbon-eb01-bugatti-vintage-2002',
    'carbon-eb02-chiron-300-vintage-2006',
    'carbon-bolide-vintage-2017'
  ];

  const bugattiProducts = orderedIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  const getFormatTag = (formatName: string) => {
    if (formatName.includes('75')) return '75 CL';
    if (formatName.includes('1.5')) return '1.5 L';
    if (formatName.includes('3')) return '3.0 L';
    return formatName;
  };

  return (
    <section className="w-full bg-[#000000] py-24 sm:py-36 border-b border-white/5">
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Heading matching Champagne Carbon screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.24em] uppercase font-light">
            EDITION BUGATTI
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a24b]/60 mx-auto mt-6" />
        </div>

        {/* 3 Majestic Columns on Pure Black (No card boxes, matching screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-10 lg:gap-16">
          {bugattiProducts.map((product) => {
            const currentVariantIndex = selectedFormats[product.id] || 0;
            const currentVariant = product.variants[currentVariantIndex];

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between items-center text-center transition-transform duration-500 hover:-translate-y-1"
              >
                {/* Large Bottle Presentation with Ambient Glow & Floor Reflection */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] flex items-end justify-center mb-6 overflow-hidden"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </Link>

                {/* Bottle Details & Typography */}
                <div className="w-full max-w-xs space-y-4 px-2 flex flex-col justify-between flex-grow">
                  <div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-serif text-sm sm:text-base tracking-[0.2em] text-[#c9a24b] uppercase font-light hover:text-white transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="text-[11px] tracking-[0.16em] text-[#a8a49b] uppercase font-light mt-1">
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

                  {/* Pricing & ADD TO CART (with Luxury Gold Hover State) */}
                  <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] uppercase tracking-wider text-[#a8a49b]">
                        Allocation
                      </span>
                      <span className="font-serif text-lg text-white font-normal">
                        {currentVariant.pricePhp ? `₱${currentVariant.pricePhp.toLocaleString()}` : 'Price on Request'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart({ product, variant: currentVariant, quantity: 1 })}
                      className="carbon-add-to-cart-btn text-xs py-3.5 font-semibold"
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
    </section>
  );
}
