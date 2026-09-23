
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cuveeInterest: 'Any / General Allocation',
    formatInterest: 'Bottle 75 cl',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-carbon-950 text-silver py-8 sm:py-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="text-[11px] uppercase tracking-ultra text-gold font-semibold block mb-2">
            MANILA WINE PRIVATE CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white tracking-widest uppercase font-light">
            Private Allocation Inquiry
          </h1>
          <p className="text-silver-muted text-xs sm:text-sm mt-3 leading-relaxed font-light">
            For private allocations, rare vintage cellar queries, and corporate gifting. Your inquiry is handled directly by our Manila Wine prestige beverage directors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Contact Details (5 Cols) */}
          <div className="md:col-span-5 bg-carbon-900/60 border border-carbon-border rounded-lg p-6 sm:p-8 space-y-6">
            <div className="relative w-36 h-10 mb-4">
              <Image
                src="/brand/logo.webp"
                alt="Manila Wine"
                fill
                className="object-contain"
              />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-silver-muted uppercase tracking-wider block mb-1 font-medium">Direct Telephone &amp; Viber:</span>
                <a href="tel:+639178600808" className="text-white hover:text-gold font-medium text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>+63917 860 0808</span>
                </a>
              </div>

              <div>
                <span className="text-silver-muted uppercase tracking-wider block mb-1 font-medium">Prestige Email:</span>
                <a href="mailto:contact@manila-wine.com" className="text-white hover:text-gold font-medium text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>contact@manila-wine.com</span>
                </a>
              </div>

              <div>
                <span className="text-silver-muted uppercase tracking-wider block mb-1 font-medium">Headquarters &amp; Cellars:</span>
                <div className="text-white flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>Metro Manila, Philippines</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-carbon-border/50 text-[11px] text-silver-muted leading-relaxed">
              <div className="flex items-center gap-2 text-gold font-semibold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Direct Provenance</span>
              </div>
              All Champagne Carbon bottles are imported directly from Champillon under climate-monitored conditions.
            </div>
          </div>

          {/* Inquiry Form (7 Cols) */}
          <div className="md:col-span-7 bg-carbon-900 border border-carbon-border rounded-lg p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
                <h3 className="font-serif text-2xl text-white">Inquiry Received</h3>
                <p className="text-xs text-silver leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. A Manila Wine private client director will contact you directly within 24 hours regarding your allocation request.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs uppercase tracking-luxury text-gold underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-silver-muted uppercase tracking-wider mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-silver-muted uppercase tracking-wider mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                      placeholder="e.g. name@domain.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-silver-muted uppercase tracking-wider mb-1">Contact Phone / Viber *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                      placeholder="+63 9XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-silver-muted uppercase tracking-wider mb-1">Cuvée Preference</label>
                    <select
                      value={formData.cuveeInterest}
                      onChange={e => setFormData({ ...formData, cuveeInterest: e.target.value })}
                      className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                    >
                      <option value="Any / General Allocation">Any / General Allocation</option>
                      <option value="Carbon Bolide Vintage 2017">Carbon Bolide Vintage 2017</option>
                      <option value="Carbon ƎB.02 Chiron 300+ Vintage 2006">Carbon ƎB.02 Chiron 300+ Vintage 2006</option>
                      <option value="Carbon ƎB.01 Bugatti Vintage 2002">Carbon ƎB.01 Bugatti Vintage 2002</option>
                      <option value="Carbon Blanc de Noirs Vintage 2009">Carbon Blanc de Noirs Vintage 2009</option>
                      <option value="Carbon Rosé">Carbon Rosé</option>
                      <option value="Carbon Blanc de Blancs Grand Cru 2019">Carbon Blanc de Blancs Grand Cru 2019</option>
                      <option value="Carbon Brut">Carbon Brut</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-silver-muted uppercase tracking-wider mb-1">Bottle Format</label>
                  <select
                    value={formData.formatInterest}
                    onChange={e => setFormData({ ...formData, formatInterest: e.target.value })}
                    className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                  >
                    <option value="Bottle 75 cl">Bottle 75 cl</option>
                    <option value="Magnum 1.5 L">Magnum 1.5 L</option>
                    <option value="Jeroboam 3 L">Jeroboam 3 L</option>
                    <option value="Multiple / Collector Set">Multiple / Collector Set</option>
                  </select>
                </div>

                <div>
                  <label className="block text-silver-muted uppercase tracking-wider mb-1">Message or Specific Request</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                    placeholder="Provide any delivery timing, special event date, or custom requests..."
                  ></textarea>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/50 border border-red-800/60 rounded text-red-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gold hover:bg-gold-light text-carbon-950 font-bold uppercase tracking-luxury rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-carbon-950 border-t-transparent rounded-full animate-spin" />
                      <span>TRANSMITTING ALLOCATION REQUEST...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT ALLOCATION REQUEST</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
