'use client';

import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Smartphone, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Users, 
  DollarSign, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Flame,
  Send
} from 'lucide-react';
import vipData from '@/data/vip_prospects.json';

interface VipClient {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  tier: string;
  spend: number;
  orders: number;
  champagneSpend: number;
  champagneHistory: string;
  city: string;
  region: string;
}

export function VipOutreachTab() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'Tier 1' | 'Tier 2' | 'Tier 3'>('all');
  const [template, setTemplate] = useState<'prestige' | 'bugatti' | 'executive'>('prestige');
  const [page, setPage] = useState(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const pageSize = 20;

  const clients = vipData as VipClient[];

  // Metrics
  const tier1Count = useMemo(() => clients.filter(c => c.tier.includes('Tier 1')).length, [clients]);
  const tier2Count = useMemo(() => clients.filter(c => c.tier.includes('Tier 2')).length, [clients]);
  const tier3Count = useMemo(() => clients.filter(c => c.tier.includes('Tier 3')).length, [clients]);

  // Filtered List
  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const matchTier = tierFilter === 'all' || c.tier.includes(tierFilter);
      const q = search.toLowerCase().trim();
      const matchSearch = !q || 
        c.fullName.toLowerCase().includes(q) || 
        c.email.toLowerCase().includes(q) || 
        c.phone.includes(q) || 
        (c.city && c.city.toLowerCase().includes(q)) ||
        (c.champagneHistory && c.champagneHistory.toLowerCase().includes(q));
      return matchTier && matchSearch;
    });
  }, [clients, tierFilter, search]);

  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const paginatedClients = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, page, pageSize]);

  // Message Generator
  const generateMessage = (client: VipClient): string => {
    const firstName = client.firstName || client.fullName || 'Valued Client';
    const pastFav = client.champagneHistory ? client.champagneHistory.split(';')[0].trim() : 'Prestige Cuvées';

    if (template === 'bugatti') {
      return `Good day ${firstName},\n\nGreetings from Manila Wine Private Client Services.\n\nWe are honored to introduce an exclusive private allocation of Champagne Carbon × Bugatti in the Philippines — featuring the legendary EB.01 Vintage 2002 and EB.02 Chiron 300+ editions, encased in handcrafted aerospace carbon fiber.\n\nAs a valued collector with Manila Wine, you have priority allocation access:\nhttps://champagne-carbon.manila-wine.com/bugatti?ref=vip\n\nMay we prepare an allocation or coordinate private delivery for you?\n\nWarm regards,\nManila Wine Private Concierge\nVIP Direct: +63 917 860 0808`;
    }

    if (template === 'executive') {
      return `Good day ${firstName},\n\nGreetings from Manila Wine Private Client Services.\n\nWe are pleased to announce the official Philippine allocation of Champagne Carbon — the world's finest champagne encased in real handcrafted carbon-fiber bottles, as poured on global podiums.\n\nYou may view your private allocation and vintage tasting profiles here:\nhttps://champagne-carbon.manila-wine.com/collection?ref=vip\n\nOur sommelier team remains at your service should you wish to reserve bottles for your private cellar or upcoming celebration.\n\nWarm regards,\nManila Wine Private Concierge\nVIP Direct: +63 917 860 0808`;
    }

    // Default Prestige
    return `Good day ${firstName},\n\nGreetings from Manila Wine Private Client Services.\n\nHaving noted your appreciation for prestigious cuvées such as ${pastFav}, we would like to present an exclusive private allocation of Champagne Carbon in the Philippines.\n\nHandcrafted in Champillon through 37 artisanal stages and encased in genuine carbon fiber, each bottle represents the pinnacle of contemporary champagne excellence.\n\nExplore your private allocation here:\nhttps://champagne-carbon.manila-wine.com?ref=vip\n\nMay we reserve a bottle or tasting flight for you?\n\nWarm regards,\nManila Wine Private Concierge\nVIP Direct: +63 917 860 0808`;
  };

  const handleCopyMessage = (client: VipClient) => {
    const msg = generateMessage(client);
    navigator.clipboard.writeText(msg);
    setCopiedKey(client.email);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const cleanPhone = (phone: string) => {
    const digits = phone.replace(/[^\d]/g, '');
    return digits;
  };

  const formatPhp = (amt: number) => {
    return '₱' + (amt || 0).toLocaleString('en-US');
  };

  return (
    <div className="space-y-6">
      {/* Globe 5G SIM Concierge Setup Banner */}
      <div className="bg-gradient-to-r from-carbon-900 via-carbon-850 to-carbon-900 border border-gold/40 rounded-xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm tracking-wide">
                  Cellular Concierge Gateway Active (Globe 5G Dedicated Line)
                </span>
                <span className="bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono font-semibold">
                  +63 Local Ready
                </span>
              </div>
              <p className="text-xs text-silver-muted mt-0.5">
                Use 1-Click WhatsApp or Viber buttons below to initiate human-touch luxury invitations from your paired desktop app with zero telecom spam risk.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/carbon_email_campaign_list.csv"
              download="carbon_vip_email_list.csv"
              className="py-2 px-3.5 bg-carbon-800 hover:bg-carbon-700 text-silver hover:text-white rounded border border-carbon-border text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-gold" />
              <span>Export CSV</span>
            </a>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div 
          onClick={() => { setTierFilter('all'); setPage(1); }}
          className={`cursor-pointer bg-carbon-900 border rounded-xl p-4 transition-all ${
            tierFilter === 'all' ? 'border-gold ring-1 ring-gold/40' : 'border-carbon-border hover:border-carbon-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-wider text-silver-muted">Total VIP Prospects</p>
            <Users className="w-4 h-4 text-silver-muted" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-serif text-white">{clients.length}</span>
            <span className="text-xs text-silver-muted">Verified</span>
          </div>
          <p className="text-[10px] text-silver-dark mt-1">100% with phone and email</p>
        </div>

        <div 
          onClick={() => { setTierFilter('Tier 1'); setPage(1); }}
          className={`cursor-pointer bg-carbon-900 border rounded-xl p-4 transition-all ${
            tierFilter === 'Tier 1' ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-carbon-border hover:border-carbon-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-wider text-amber-300 font-medium">Tier 1: Prestige Connoisseurs</p>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-serif text-amber-300">{tier1Count}</span>
            <span className="text-xs text-amber-400/80">Dom Pérignon / Krug</span>
          </div>
          <p className="text-[10px] text-silver-dark mt-1">₱12k–₱40k bottle buyers</p>
        </div>

        <div 
          onClick={() => { setTierFilter('Tier 2'); setPage(1); }}
          className={`cursor-pointer bg-carbon-900 border rounded-xl p-4 transition-all ${
            tierFilter === 'Tier 2' ? 'border-emerald-400 ring-1 ring-emerald-400/40' : 'border-carbon-border hover:border-carbon-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-wider text-emerald-300 font-medium">Tier 2: High-Value Champagne</p>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-serif text-emerald-300">{tier2Count}</span>
            <span className="text-xs text-emerald-400/80">Moët / Veuve / Billecart</span>
          </div>
          <p className="text-[10px] text-silver-dark mt-1">Spent ₱15k+ on champagne</p>
        </div>

        <div 
          onClick={() => { setTierFilter('Tier 3'); setPage(1); }}
          className={`cursor-pointer bg-carbon-900 border rounded-xl p-4 transition-all ${
            tierFilter === 'Tier 3' ? 'border-blue-400 ring-1 ring-blue-400/40' : 'border-carbon-border hover:border-carbon-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-wider text-blue-300 font-medium">Tier 3: Luxury Collectors</p>
            <DollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-serif text-blue-300">{tier3Count}</span>
            <span className="text-xs text-blue-400/80">₱100k+ Lifetime</span>
          </div>
          <p className="text-[10px] text-silver-dark mt-1">Purchased ₱8k+ single bottles</p>
        </div>
      </div>

      {/* Control Bar: Template Selector & Search */}
      <div className="bg-carbon-900 border border-carbon-border rounded-xl p-4 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Template Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-wider text-silver-muted font-medium mr-1">
              Message Template:
            </span>
            <button
              onClick={() => setTemplate('prestige')}
              className={`py-1.5 px-3 rounded text-xs font-medium transition-colors ${
                template === 'prestige'
                  ? 'bg-gold text-carbon-950 font-semibold shadow'
                  : 'bg-carbon-800 text-silver hover:text-white border border-carbon-border'
              }`}
            >
              🍾 Prestige Connoisseur
            </button>
            <button
              onClick={() => setTemplate('bugatti')}
              className={`py-1.5 px-3 rounded text-xs font-medium transition-colors ${
                template === 'bugatti'
                  ? 'bg-gold text-carbon-950 font-semibold shadow'
                  : 'bg-carbon-800 text-silver hover:text-white border border-carbon-border'
              }`}
            >
              🏎️ Bugatti × Carbon Homage
            </button>
            <button
              onClick={() => setTemplate('executive')}
              className={`py-1.5 px-3 rounded text-xs font-medium transition-colors ${
                template === 'executive'
                  ? 'bg-gold text-carbon-950 font-semibold shadow'
                  : 'bg-carbon-800 text-silver hover:text-white border border-carbon-border'
              }`}
            >
              🎩 Executive Cellar Allocation
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-silver-muted" />
            <input
              type="text"
              placeholder="Search name, phone, city..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 bg-carbon-800 border border-carbon-border rounded-lg text-xs text-white placeholder-silver-dark focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* Prospects Table */}
      <div className="bg-carbon-900 border border-carbon-border rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-carbon-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium text-white tracking-wide">
              Qualified VIP Outreach Contacts
            </h2>
            <span className="text-xs text-silver-muted font-mono">
              ({filteredClients.length} matching)
            </span>
          </div>
          <div className="text-xs text-silver-muted font-mono">
            Page {page} of {totalPages}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-carbon-800/60 text-silver-muted text-[11px] uppercase tracking-wider border-b border-carbon-border">
                <th className="py-3 px-4">Client / Location</th>
                <th className="py-3 px-4">Direct Contact</th>
                <th className="py-3 px-4">VIP Tier</th>
                <th className="py-3 px-4">Spend &amp; Champagne History</th>
                <th className="py-3 px-4 text-right">Direct Outreach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-carbon-border/50 text-silver">
              {paginatedClients.map((client) => {
                const cleanNum = cleanPhone(client.phone);
                const isCopied = copiedKey === client.email;
                const messageText = generateMessage(client);
                const waLink = `https://wa.me/${cleanNum}?text=${encodeURIComponent(messageText)}`;
                const viberLink = `viber://chat?number=%2B${cleanNum}`;

                return (
                  <tr key={client.email} className="hover:bg-carbon-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white text-xs">{client.fullName}</div>
                      <div className="text-[11px] text-silver-muted">
                        {client.city ? `${client.city}` : 'Metro Manila'}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px]">
                      <div className="text-emerald-300 font-semibold">{client.phone}</div>
                      <div className="text-silver-muted text-[10px]">{client.email}</div>
                    </td>

                    <td className="py-3 px-4">
                      {client.tier.includes('Tier 1') ? (
                        <span className="inline-flex items-center gap-1 bg-amber-950/70 border border-amber-800/80 text-amber-300 text-[10px] px-2 py-0.5 rounded font-medium">
                          <Award className="w-3 h-3" />
                          <span>Tier 1 Prestige</span>
                        </span>
                      ) : client.tier.includes('Tier 2') ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-medium">
                          <Sparkles className="w-3 h-3" />
                          <span>Tier 2 High-Value</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-blue-950/70 border border-blue-800/80 text-blue-300 text-[10px] px-2 py-0.5 rounded font-medium">
                          <DollarSign className="w-3 h-3" />
                          <span>Tier 3 Collector</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{formatPhp(client.spend)}</span>
                        <span className="text-[10px] text-gold font-medium">
                          ({formatPhp(client.champagneSpend)} in Champagne)
                        </span>
                      </div>
                      <div className="text-[10px] text-silver-muted truncate max-w-xs" title={client.champagneHistory}>
                        {client.champagneHistory || 'Fine Wine & Champagne'}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* WhatsApp Direct */}
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-medium transition-colors flex items-center gap-1 shadow-sm"
                          title="Open WhatsApp with personalized invitation"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Viber Direct */}
                        <a
                          href={viberLink}
                          className="py-1.5 px-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded text-[11px] font-medium transition-colors flex items-center gap-1 shadow-sm"
                          title="Open Viber chat"
                        >
                          <span>🟣 Viber</span>
                        </a>

                        {/* Copy Message */}
                        <button
                          onClick={() => handleCopyMessage(client)}
                          className={`p-1.5 rounded border text-[11px] transition-colors ${
                            isCopied 
                              ? 'bg-emerald-950 border-emerald-700 text-emerald-300' 
                              : 'bg-carbon-800 border-carbon-border text-silver hover:text-white'
                          }`}
                          title="Copy personalized invitation text"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-carbon-border flex items-center justify-between">
          <p className="text-xs text-silver-muted font-mono">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredClients.length)} of {filteredClients.length} clients
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 bg-carbon-800 hover:bg-carbon-700 disabled:opacity-40 rounded border border-carbon-border text-silver hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-silver px-2">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 bg-carbon-800 hover:bg-carbon-700 disabled:opacity-40 rounded border border-carbon-border text-silver hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
