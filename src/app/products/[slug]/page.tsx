
'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, getProductBySlug } from '@/data/products';
import { handleAddToCart } from '@/lib/cart';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  ChevronDown, 
  ChevronUp,
  Plus, 
  Minus,
  ExternalLink
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Accordion state
  const [openSection, setOpenSection] = useState<'desc' | 'tasting' | 'specs' | 'pairings' | null>('tasting');

  const currentVariant = product.variants[selectedVariantIndex];

  return (
    <div className="bg-[#050505] text-[#ece9e2] min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-4 text-[11px] uppercase tracking-[0.2em] text-[#7a7770]">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="mx-2 text-white/20">/</span>
        <Link href="/collection" className="hover:text-white transition-colors">Collections</Link>
        <span className="mx-2 text-white/20">/</span>
        <span className="text-[#ece9e2] font-medium">{product.title}</span>
      </div>

      <div className="carbon-pdp-container">
        
        {/* Left Column: Vertical Thumbnails + Main Bottle Image */}
        <div className="carbon-pdp-gallery">
          
          {/* Thumbnails strip (vertical on desktop) */}
          <div className="carbon-pdp-thumbnails">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`carbon-pdp-thumb ${selectedImageIndex === idx ? 'active' : ''}`}
              >
                <Image
                  src={img}
                  alt={`${product.title} view ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>

          {/* Main Bottle View */}
          <div className="carbon-pdp-main-image">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              fill
              className="object-contain p-8 drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
              priority
            />
          </div>

        </div>

        {/* Right Column: Exact Replica of Champagne Carbon PDP Product Form */}
        <div className="space-y-6 pt-2">
          
          <div>
            <p className="font-serif text-[11px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium mb-1">
              CHAMPAGNE CARBON
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-[0.16em] uppercase font-light leading-tight">
              {product.title}
            </h1>
            <p className="text-xs text-[#a8a49b] mt-2 font-light leading-relaxed">
              {product.overview.slice(0, 140)}...
            </p>
          </div>

          {/* Price & VAT */}
          <div className="pt-2">
            <div className="font-serif text-2xl sm:text-3xl text-white font-light tracking-wide">
              {currentVariant.pricePhp ? `₱${currentVariant.pricePhp.toLocaleString()}` : 'Price on Request'}
            </div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-[#7a7770] mt-0.5">
              VAT INCLUDED &bull; DIRECT ALLOCATION MANILA WINE
            </div>
          </div>

          {/* Format Selector: Boxed buttons with gold outline on active */}
          <div className="space-y-2 pt-2">
            <label className="text-xs uppercase tracking-[0.18em] text-[#ece9e2] font-medium block">
              Format:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {product.variants.map((v, idx) => (
                <button
                  key={v.format}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`carbon-format-btn ${selectedVariantIndex === idx ? 'active' : ''}`}
                >
                  <span className="block">{v.format}</span>
                  <span className="text-[9px] text-[#7a7770] font-mono block mt-0.5">{v.sku}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + ADD TO CART (Exact off-white solid button) */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Box */}
              <div className="flex items-center border border-white/20 bg-[#080808] h-14">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 h-full text-[#a8a49b] hover:text-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono text-sm text-white font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 h-full text-[#a8a49b] hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Exact Champagne Carbon Off-White Button */}
              <button
                onClick={() => handleAddToCart({ product, variant: currentVariant, quantity })}
                className="carbon-add-to-cart-btn flex-1 h-14"
              >
                <span>ADD TO CART</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 text-black" />
              </button>
            </div>

            <p className="text-[10px] text-[#7a7770] tracking-wider text-center">
              Opens Manila-Wine.com in a new tab to add SKU <strong className="text-white">{currentVariant.sku}</strong> directly to cart.
            </p>
          </div>

          {/* Perks list from Carbon PDP */}
          <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-[#a8a49b]">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#c9a24b] flex-shrink-0" />
              <span className="tracking-wide">COMPLIMENTARY DELIVERY IN METRO MANILA</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#c9a24b] flex-shrink-0" />
              <span className="tracking-wide">AUTHENTIC DIRECT CELLAR PROVENANCE &bull; MANILA WINE</span>
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="w-4 h-4 text-[#c9a24b] flex-shrink-0" />
              <span className="tracking-wide">PRIVATE CLIENT CONCIERGE SUPPORT (+63917 860 0808)</span>
            </div>
          </div>

          {/* Accordion Drawers */}
          <div className="pt-6 border-t border-white/10 space-y-1">
            
            {/* 1. Tasting Notes */}
            <div className="carbon-accordion-item">
              <button
                onClick={() => setOpenSection(openSection === 'tasting' ? null : 'tasting')}
                className="carbon-accordion-trigger"
              >
                <span>TASTING NOTES</span>
                {openSection === 'tasting' ? <ChevronUp className="w-4 h-4 text-[#c9a24b]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSection === 'tasting' && (
                <div className="pt-3 pb-1 text-xs text-[#a8a49b] space-y-2 font-light leading-relaxed">
                  <p><strong className="text-white font-normal uppercase tracking-wider">The Eye:</strong> {product.tastingNotes.eye}</p>
                  <p><strong className="text-white font-normal uppercase tracking-wider">The Nose:</strong> {product.tastingNotes.nose}</p>
                  <p><strong className="text-white font-normal uppercase tracking-wider">The Palate:</strong> {product.tastingNotes.palate}</p>
                  {product.tastingNotes.scoreAwards && (
                    <p className="text-[#c9a24b] pt-1 font-medium"><strong className="uppercase tracking-wider">Critical Accolades:</strong> {product.tastingNotes.scoreAwards}</p>
                  )}
                </div>
              )}
            </div>

            {/* 2. Specifications */}
            <div className="carbon-accordion-item">
              <button
                onClick={() => setOpenSection(openSection === 'specs' ? null : 'specs')}
                className="carbon-accordion-trigger"
              >
                <span>SPECIFICATIONS &amp; TERROIR</span>
                {openSection === 'specs' ? <ChevronUp className="w-4 h-4 text-[#c9a24b]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSection === 'specs' && (
                <div className="pt-3 pb-1 text-xs text-[#a8a49b] space-y-1.5 font-light leading-relaxed">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Vintage:</span>
                    <span className="text-white">{product.specifications.vintage}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Grape Varieties:</span>
                    <span className="text-white">{product.specifications.grapeVarieties}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Classification:</span>
                    <span className="text-white">{product.specifications.classification}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Aging:</span>
                    <span className="text-white">{product.specifications.aging}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Dosage:</span>
                    <span className="text-white">{product.specifications.dosage}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Alcohol:</span>
                    <span className="text-white">{product.specifications.alcohol}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Gastronomy & Food Pairings */}
            <div className="carbon-accordion-item">
              <button
                onClick={() => setOpenSection(openSection === 'pairings' ? null : 'pairings')}
                className="carbon-accordion-trigger"
              >
                <span>GASTRONOMY &amp; PAIRINGS</span>
                {openSection === 'pairings' ? <ChevronUp className="w-4 h-4 text-[#c9a24b]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSection === 'pairings' && (
                <div className="pt-3 pb-1 text-xs text-[#a8a49b] font-light leading-relaxed">
                  <p>{product.tastingNotes.pairings}</p>
                </div>
              )}
            </div>

            {/* 4. The 37 Steps Armor */}
            <div className="carbon-accordion-item">
              <button
                onClick={() => setOpenSection(openSection === 'desc' ? null : 'desc')}
                className="carbon-accordion-trigger"
              >
                <span>AEROSPACE CARBON FIBER</span>
                {openSection === 'desc' ? <ChevronUp className="w-4 h-4 text-[#c9a24b]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSection === 'desc' && (
                <div className="pt-3 pb-1 text-xs text-[#a8a49b] font-light leading-relaxed space-y-2">
                  <p>
                    {product.specifications.cellarMasterNote}
                  </p>
                  <p>
                    A real carbon-fiber cloth, requiring 37 complex steps, is applied to the bottle. This unique application completely blocks UV light and protects the champagne's taste over decades.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
