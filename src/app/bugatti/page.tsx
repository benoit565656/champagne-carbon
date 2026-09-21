
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBugattiProducts } from '@/data/products';
import { ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';

export default function BugattiPage() {
  const bugattiProducts = getBugattiProducts();

  return (
    <div className="bg-carbon-950 text-silver py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Bugatti Hero Header */}
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-[11px] uppercase tracking-ultra text-gold font-semibold block mb-2">
            OFFICIAL PARTNERSHIP SINCE 2018
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-widest uppercase font-light">
            Carbon &times; Bugatti
          </h1>
          <p className="text-silver-muted text-xs sm:text-sm mt-4 leading-relaxed font-light">
            In 2018, the French hypercar manufacturer's 110th anniversary year kick-started an exclusive partnership. For this historic milestone, Champagne CARBON specially designed cuvées echoing the aerodynamic purity, speed records, and luxury finishes of Bugatti's masterpieces.
          </p>
        </div>

        {/* Bugatti Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bugattiProducts.map((product) => (
            <div
              key={product.id}
              className="bg-carbon-900/60 border border-carbon-border hover:border-gold/50 rounded-lg p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-luxury text-gold font-semibold px-2 py-0.5 rounded border border-gold/30 bg-gold/5">
                    BUGATTI EDITION
                  </span>
                  <span className="text-[11px] font-mono text-silver-muted">
                    VINTAGE {product.vintage}
                  </span>
                </div>

                <Link href={`/products/${product.slug}`} className="block relative h-72 w-full my-4 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                  />
                </Link>

                <div className="text-center mt-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-serif text-2xl text-white tracking-wider group-hover:text-gold transition-colors font-normal">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-silver-muted mt-2 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-carbon-border/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-silver-muted block">
                    Starting From
                  </span>
                  <span className="text-lg font-serif text-white font-medium">
                    ₱{product.variants[0]?.pricePhp?.toLocaleString()}
                  </span>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="py-2 px-4 bg-gold hover:bg-gold-light text-carbon-950 font-bold text-xs uppercase tracking-luxury rounded transition-colors flex items-center gap-1"
                >
                  <span>VIEW EDITION</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Bespoke Creation: La Bouteille Noire Spotlight from PDF */}
        <div className="bg-carbon-900 border border-gold/30 rounded-xl p-8 sm:p-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] uppercase tracking-ultra text-gold font-semibold block">
              ONE-OFF BESPOKE PROJECT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wider font-light">
              "La Bouteille Noire" &amp; Bouteille Sur Mesure
            </h2>
            <p className="text-xs sm:text-sm text-silver leading-relaxed font-light">
              To celebrate the early years of partnership with Bugatti, CARBON created "La Bouteille Noire" — a monumental 15-liter black carbon bottle inspired by "La Voiture Noire". Presented in an automated luxury case representing Bugatti's hypercar, it houses a rare Vintage 2000 from the cellar's œnotheque.
            </p>
            <p className="text-xs text-silver-muted leading-relaxed font-light">
              Through Manila Wine Private Client Services, bespoke collector formats and private allocations can be commissioned directly from Champillon.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-gold hover:text-gold-light font-semibold underline"
              >
                Inquire with Manila Wine VIP Concierge &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
