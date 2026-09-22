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
  ExternalLink,
  Sparkles,
  Info,
  Shield,
  Zap
} from 'lucide-react';
import { PRESENTATION_DETAILS } from '@/data/presentations';
import { PresentationExplainerModal } from '@/components/common/PresentationExplainerModal';

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
  const [explainerOpen, setExplainerOpen] = useState(false);

  // Accordion state
  const [openSection, setOpenSection] = useState<'desc' | 'tasting' | 'specs' | 'pairings' | null>('desc');

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isHandcrafted = currentVariant.presentationType === 'handcrafted-carbon';
  const presInfo = PRESENTATION_DETAILS[currentVariant.presentationType];

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
          
          {/* Thumbnails strip */}
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
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-[#c9a24b] font-medium">
                CHAMPAGNE CARBON
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#a8a49b]">
                {product.vintage}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-[0.16em] uppercase font-light leading-tight">
              {product.title}
            </h1>
            <p className="text-xs text-[#a8a49b] mt-2 font-light leading-relaxed">
              {product.overview}
            </p>
          </div>

          {/* Presentation Highlight Badge with Modal Trigger */}
          <div className="flex items-center gap-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase ${
              isHandcrafted
                ? 'bg-[#c9a24b]/10 text-[#c9a24b] border-[#c9a24b]/40'
                : 'bg-amber-950/40 text-amber-300 border-amber-700/50'
            }`}>
              {isHandcrafted ? (
                <ShieldCheck className="w-3.5 h-3.5 text-[#c9a24b]" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span>{presInfo.badge}</span>
            </div>

            <button
              onClick={() => setExplainerOpen(true)}
              className="text-[11px] text-[#c9a24b]/80 hover:text-[#c9a24b] underline flex items-center gap-1 transition-colors"
            >
              <span>Learn about presentations</span>
              <Info className="w-3 h-3" />
            </button>
          </div>

          {/* Price & Stock */}
          <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
            <div>
              <div className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-wide">
                ₱{currentVariant.pricePhp.toLocaleString()}
              </div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-[#7a7770] mt-0.5">
                VAT INCLUDED &bull; DIRECT ALLOCATION MANILA WINE
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-[#a8a49b] block">
                SKU: {currentVariant.sku}
              </span>
              <div className="inline-flex items-center gap-1.5 mt-1">
                <span className={`w-2 h-2 rounded-full ${currentVariant.stock <= 2 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                <span className="text-xs font-medium text-white">
                  {currentVariant.stock === 1
                    ? 'Only 1 bottle in PH'
                    : `${currentVariant.stock} bottles in stock`}
                </span>
              </div>
            </div>
          </div>

          {/* Format / Presentation Selector */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs uppercase tracking-[0.18em] text-[#ece9e2] font-medium">
              <span>Select Presentation / Format:</span>
              <span className="text-[#c9a24b] text-[11px] font-mono">{currentVariant.format}</span>
            </div>

            <div className={`grid gap-2 ${product.variants.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {product.variants.map((v, idx) => (
                <button
                  key={v.sku}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`carbon-format-btn p-3 flex flex-col items-center justify-center text-center ${selectedVariantIndex === idx ? 'active' : ''}`}
                >
                  <span className="block font-medium text-xs text-white">{v.format}</span>
                  <span className="text-[10px] text-[#c9a24b] font-mono mt-0.5">₱{v.pricePhp.toLocaleString()}</span>
                  <span className="text-[9px] text-[#7a7770] font-mono mt-0.5">
                    {v.presentationType === 'handcrafted-carbon' ? 'Craft' : 'Luminous'} &bull; {v.stock} left
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Presentation Description Box */}
          <div className="p-4 bg-[#0d0d0f] border border-white/10 rounded-lg text-xs space-y-2">
            <div className="flex items-center gap-2 text-white font-medium">
              {isHandcrafted ? (
                <Shield className="w-3.5 h-3.5 text-[#c9a24b]" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span className="font-serif tracking-wider uppercase">{presInfo.name}</span>
            </div>
            <p className="text-[#a8a49b] font-light leading-relaxed">
              {presInfo.description}
            </p>
            {presInfo.luminousFeature && (
              <div className="pt-2 border-t border-white/5 flex items-start gap-1.5 text-[#e5c378]">
                <Zap className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#c9a24b]" />
                <span className="text-[11px] leading-relaxed">
                  <strong>Integrated Illumination:</strong> {presInfo.luminousFeature}
                </span>
              </div>
            )}
          </div>

          {/* Quantity + ADD TO CART Buttons */}
          <div className="pt-2 space-y-3">
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
                  onClick={() => setQuantity(Math.min(currentVariant.stock, quantity + 1))}
                  className="px-3.5 h-full text-[#a8a49b] hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart({ product, variant: currentVariant, quantity })}
                className="carbon-add-to-cart-btn flex-1 h-14"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span>ADD TO CART &bull; ₱{(currentVariant.pricePhp * quantity).toLocaleString()}</span>
              </button>
            </div>

            {/* View on Manila-Wine.com Direct Link */}
            <a
              href={currentVariant.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-mono tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-2 border border-white/10"
            >
              <span>View Product on Manila-Wine.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <p className="text-[10px] text-[#7a7770] tracking-wider text-center">
              Direct Philippine allocation fulfilled and delivered exclusively by Manila Wine.
            </p>
          </div>

          {/* Perks list */}
          <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-[#a8a49b]">
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#c9a24b] flex-shrink-0" />
              <span className="tracking-wide">COMPLIMENTARY WHITE-GLOVE DELIVERY IN METRO MANILA</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-[#c9a24b] flex-shrink-0" />
              <span className="tracking-wide">AUTHENTIC DIRECT CELLAR PROVENANCE &bull; MANILA WINE</span>
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="w-4 h-4 text-[#c9a24b] flex-shrink-0" />
              <span className="tracking-wide">VIP SOMMELIER &amp; CONCIERGE (+63917 860 0808)</span>
            </div>
          </div>

          {/* Accordion Drawers */}
          <div className="pt-6 border-t border-white/10 space-y-1">
            
            {/* 1. Description & Craftsmanship */}
            <div className="carbon-accordion-item">
              <button
                onClick={() => setOpenSection(openSection === 'desc' ? null : 'desc')}
                className="carbon-accordion-trigger"
              >
                <span>AEROSPACE CARBON FIBER &amp; CRAFTSMANSHIP</span>
                {openSection === 'desc' ? <ChevronUp className="w-4 h-4 text-[#c9a24b]" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openSection === 'desc' && (
                <div className="pt-3 pb-1 text-xs text-[#a8a49b] font-light leading-relaxed space-y-2">
                  <p>
                    {product.specifications.cellarMasterNote}
                  </p>
                  <p>
                    {presInfo.description}
                  </p>
                </div>
              )}
            </div>

            {/* 2. Tasting Notes */}
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

            {/* 3. Specifications */}
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

            {/* 4. Gastronomy & Pairings */}
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

          </div>

        </div>

      </div>

      {/* Explainer Modal */}
      <PresentationExplainerModal
        isOpen={explainerOpen}
        onClose={() => setExplainerOpen(false)}
        activeType={currentVariant.presentationType}
      />
    </div>
  );
}
