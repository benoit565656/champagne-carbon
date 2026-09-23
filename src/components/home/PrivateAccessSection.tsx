'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function PrivateAccessSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Home Private Access Section' }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit email. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to join at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#000000] py-10 sm:py-16 lg:py-24 border-b border-white/10 text-center relative overflow-hidden">
      {/* Subtle luxury background carbon glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,75,0.04)_0,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6 relative z-10">
        <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-[#c9a24b] font-medium">
          MANILA WINE EXCLUSIVES
        </p>

        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-[0.2em] uppercase font-light">
          PRIVATE ACCESS
        </h2>

        <p className="text-xs sm:text-sm text-[#a8a49b] font-light tracking-wider leading-relaxed max-w-xl mx-auto">
          Champagne Carbon is only the beginning. Manila Wine is curating a rare portfolio of the world’s most exceptional, ultra-limited cuvées and collector editions—uniquely and exclusively carried in the Philippines by Manila Wine.
        </p>
        <p className="text-[11px] sm:text-xs text-[#7a7770] font-light tracking-wide italic">
          Subscribe to receive private allocations, priority notices, and privileged invitations before public release.
        </p>

        {submitted ? (
          <div className="pt-8 space-y-3">
            <div className="inline-flex items-center justify-center gap-2 text-[#c9a24b]">
              <CheckCircle2 className="w-5 h-5 text-[#c9a24b]" />
              <p className="text-xs sm:text-sm font-serif tracking-[0.2em] uppercase font-medium">
                Thank you. You are added to our private allocation list.
              </p>
            </div>
            <p className="text-[11px] text-[#a8a49b] font-light tracking-wider">
              You will be among the select few in the Philippines notified whenever Manila Wine secures future exceptional allocations.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmail('');
              }}
              className="text-[10px] text-[#c9a24b]/60 hover:text-[#c9a24b] uppercase tracking-widest pt-2 underline transition-colors"
            >
              Add another email
            </button>
          </div>
        ) : (
          <div className="pt-4 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={loading}
                className="w-full sm:flex-1 bg-transparent border-b border-white/30 px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c9a24b] transition-colors font-light tracking-wider disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black transition-all duration-300 px-8 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_20px_rgba(201,162,75,0.4)] whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>JOINING...</span>
                  </>
                ) : (
                  'SUBSCRIBE'
                )}
              </button>
            </form>

            {errorMsg && (
              <div className="pt-3 flex items-center justify-center gap-2 text-red-400 text-xs tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
