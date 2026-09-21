'use client';

import React, { useState } from 'react';

export function PrivateAccessSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-[#000000] py-24 sm:py-32 border-b border-white/10 text-center">
      <div className="w-full max-w-2xl mx-auto px-6 space-y-6">
        <p className="font-serif text-[11px] uppercase tracking-[0.4em] text-[#c9a24b] font-medium">
          KEEP ME UPDATED
        </p>

        <h2 className="font-serif text-3xl sm:text-5xl text-white tracking-[0.2em] uppercase font-light">
          PRIVATE ACCESS
        </h2>

        <p className="text-xs sm:text-sm text-[#a8a49b] font-light tracking-wider leading-relaxed">
          Receive allocation releases, collector editions and private invitations.
        </p>

        {submitted ? (
          <div className="pt-6">
            <p className="text-sm text-[#c9a24b] font-serif tracking-widest uppercase">
              Thank you. You have been added to our private allocation list.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="w-full sm:flex-1 bg-transparent border-b border-white/30 px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c9a24b] transition-colors font-light tracking-wider"
            />
            <button
              type="submit"
              className="w-full sm:w-auto border border-[#c9a24b] text-[#c9a24b] hover:bg-[#c9a24b] hover:text-black transition-all duration-300 px-8 py-3 text-xs tracking-[0.25em] uppercase font-semibold hover:shadow-[0_0_20px_rgba(201,162,75,0.4)] whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
