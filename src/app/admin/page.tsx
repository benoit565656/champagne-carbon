'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Mail, 
  Users, 
  Lock, 
  LogOut, 
  Key, 
  ExternalLink,
  ShieldCheck,
  Eye,
  Sliders,
  Download,
  Copy,
  Trash2,
  Search,
  Check
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  source: string;
  created_at: string;
  synced_to_brevo?: boolean;
  notes?: string;
}

export default function AdminPage() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'subscribers' | 'dispatcher'>('subscribers');

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Brevo state
  const [brevoStatus, setBrevoStatus] = useState<any>(null);
  const [brevoConfig, setBrevoConfig] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [apiKeyOverride, setApiKeyOverride] = useState('');

  // Email template options
  const [subject, setSubject] = useState('Private Selection: You have been hand-picked for an exclusive allocation of Champagne Carbon');
  const [headline, setHeadline] = useState('Private Allocation Proposal');
  const [previewText, setPreviewText] = useState('Manila Wine presents the official arrival of Champagne Carbon in Manila — handcrafted aerospace carbon-fiber cuvées and Bugatti editions.');
  const [ctaText, setCtaText] = useState('EXPLORE YOUR PRIVATE ALLOCATION');

  // Test send state
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  // Bulk blast state
  const [rawEmails, setRawEmails] = useState('');
  const [parsedEmails, setParsedEmails] = useState<{ valid: string[]; invalid: string[]; duplicatesCount: number } | null>(null);
  const [sendingBlast, setSendingBlast] = useState(false);
  const [blastResult, setBlastResult] = useState<any>(null);

  // Check auth on mount
  useEffect(() => {
    fetchBrevoStatus();
    fetchSubscribers();
  }, []);

  const fetchBrevoStatus = async (overrideKey?: string) => {
    setLoadingStatus(true);
    try {
      const url = `/api/admin/brevo${overrideKey ? `?apiKey=${encodeURIComponent(overrideKey)}` : ''}`;
      const res = await fetch(url);
      if (res.status === 403 || res.status === 401) {
        setIsAuthenticated(false);
        setCheckingAuth(false);
        setLoadingStatus(false);
        return;
      }
      const data = await res.json();
      setIsAuthenticated(true);
      setBrevoStatus(data.status);
      setBrevoConfig(data.config);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStatus(false);
      setCheckingAuth(false);
    }
  };

  const fetchSubscribers = async () => {
    setLoadingSubscribers(true);
    try {
      const res = await fetch('/api/admin/subscribers');
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (e) {
      console.error('Error fetching subscribers:', e);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Authentication failed');
        setLoginLoading(false);
        return;
      }
      setIsAuthenticated(true);
      fetchBrevoStatus();
      fetchSubscribers();
    } catch (err: any) {
      setLoginError(err.message || 'Error logging in');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleDeleteSubscriber = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/subscribers?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSubscribers(prev => prev.filter(s => s.id !== id));
        setDeleteConfirmId(null);
      }
    } catch (e) {
      console.error('Error deleting subscriber:', e);
    }
  };

  const handleCopyAllEmails = () => {
    const list = filteredSubscribers.map(s => s.email).join(', ');
    navigator.clipboard.writeText(list);
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2500);
  };

  const handleLoadIntoBlast = () => {
    const emailsList = subscribers.map(s => s.email).join('\n');
    setRawEmails(emailsList);
    setActiveTab('dispatcher');
    // Trigger parsing after tab switch
    setTimeout(() => {
      handleParseEmailsWithText(emailsList);
    }, 100);
  };

  const handleParseEmailsWithText = async (textToParse: string) => {
    if (!textToParse.trim()) {
      setParsedEmails(null);
      return;
    }
    try {
      const res = await fetch('/api/admin/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'parse-emails', rawText: textToParse }),
      });
      const data = await res.json();
      setParsedEmails(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleParseEmails = () => handleParseEmailsWithText(rawEmails);

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;
    setSendingTest(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/admin/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send-test',
          recipientEmail: testEmail,
          subject,
          headline,
          previewText,
          ctaText,
          apiKey: apiKeyOverride || undefined,
        }),
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ success: false, error: err.message });
    } finally {
      setSendingTest(false);
    }
  };

  const handleLaunchBlast = async () => {
    if (!parsedEmails || parsedEmails.valid.length === 0) return;
    if (!confirm(`Are you sure you want to dispatch this exclusive invitation to ${parsedEmails.valid.length} selected VIP recipients via Brevo?`)) {
      return;
    }

    setSendingBlast(true);
    setBlastResult(null);

    try {
      const res = await fetch('/api/admin/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'launch-blast',
          emails: parsedEmails.valid,
          templateOptions: { subject, headline, previewText, ctaText },
          apiKey: apiKeyOverride || undefined,
        }),
      });
      const data = await res.json();
      setBlastResult(data);
    } catch (err: any) {
      setBlastResult({ success: false, errors: [err.message] });
    } finally {
      setSendingBlast(false);
    }
  };

  const iframePreviewUrl = `/api/admin/brevo?format=html&subject=${encodeURIComponent(subject)}&headline=${encodeURIComponent(headline)}&previewText=${encodeURIComponent(previewText)}&ctaText=${encodeURIComponent(ctaText)}${apiKeyOverride ? `&apiKey=${encodeURIComponent(apiKeyOverride)}` : ''}`;

  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
    (s.source && s.source.toLowerCase().includes(subscriberSearch.toLowerCase()))
  );

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-carbon-950 flex items-center justify-center text-silver">
        <RefreshCw className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  // 1. Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-carbon-950 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-carbon-900 border border-carbon-border rounded-xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto text-gold">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl text-white tracking-widest uppercase">Admin Portal</h1>
            <p className="text-xs text-silver-muted">
              Sign in to manage Private Access subscribers &amp; Brevo VIP allocations.
            </p>
          </div>

          {loginError && (
            <div className="bg-rose-950/50 border border-rose-800/80 rounded p-3 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-silver-muted uppercase tracking-wider mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-carbon-950 border border-carbon-border rounded p-3 text-white focus:border-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-silver-muted uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-carbon-950 border border-carbon-border rounded p-3 text-white focus:border-gold outline-none"
                placeholder="••••••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-gold hover:bg-gold-light text-carbon-950 font-bold text-xs uppercase tracking-luxury rounded transition-all flex items-center justify-center gap-2"
            >
              {loginLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'SIGN IN TO ADMIN'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-carbon-950 text-silver py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-carbon-900 border border-carbon-border p-6 rounded-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-ultra text-gold font-semibold">MANILA WINE</span>
              <span className="text-carbon-600">&bull;</span>
              <span className="text-[10px] uppercase tracking-wider text-silver-muted">CHAMPAGNE CARBON PORTAL</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white tracking-widest font-normal">
              Private Allocations &amp; VIP Administration
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchBrevoStatus(apiKeyOverride);
                fetchSubscribers();
              }}
              className="p-2.5 bg-carbon-800 hover:bg-carbon-700 text-silver hover:text-white rounded border border-carbon-border transition-colors"
              title="Refresh All Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingStatus || loadingSubscribers ? 'animate-spin text-gold' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="py-2.5 px-4 bg-carbon-800 hover:bg-carbon-700 text-silver hover:text-rose-400 rounded border border-carbon-border text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-carbon-border gap-4">
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === 'subscribers'
                ? 'border-gold text-gold'
                : 'border-transparent text-silver-muted hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Private Access Subscribers</span>
            <span className="bg-carbon-800 border border-carbon-border text-gold px-2 py-0.5 rounded-full text-[10px]">
              {subscribers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dispatcher')}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === 'dispatcher'
                ? 'border-gold text-gold'
                : 'border-transparent text-silver-muted hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Brevo VIP Dispatcher</span>
            {brevoStatus?.connected && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>
        </div>

        {/* TAB 1: SUBSCRIBERS MANAGEMENT */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-carbon-900 border border-carbon-border rounded-xl p-5">
                <p className="text-[11px] uppercase tracking-wider text-silver-muted">Total Subscribers</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-serif text-white">{subscribers.length}</span>
                  <span className="text-xs text-gold">VIP Leads</span>
                </div>
                <p className="text-[11px] text-silver-dark mt-2">Collected from the Private Access section</p>
              </div>

              <div className="bg-carbon-900 border border-carbon-border rounded-xl p-5">
                <p className="text-[11px] uppercase tracking-wider text-silver-muted">Brevo Contacts Synced</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-serif text-emerald-400">
                    {subscribers.filter(s => s.synced_to_brevo).length}
                  </span>
                  <span className="text-xs text-silver-muted">/ {subscribers.length}</span>
                </div>
                <p className="text-[11px] text-silver-dark mt-2">Added to Manila Wine contact lists</p>
              </div>

              <div className="bg-carbon-900 border border-carbon-border rounded-xl p-5">
                <p className="text-[11px] uppercase tracking-wider text-silver-muted">Latest Acquisition</p>
                <div className="mt-2">
                  <span className="text-sm font-serif text-white">
                    {subscribers.length > 0 
                      ? new Date(subscribers[0].created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          timeZone: 'Asia/Manila'
                        })
                      : 'None yet'}
                  </span>
                </div>
                <p className="text-[11px] text-silver-dark mt-2">Philippines Time (Asia/Manila)</p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="bg-carbon-900 border border-carbon-border rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-silver-muted absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by email or source..."
                  value={subscriberSearch}
                  onChange={e => setSubscriberSearch(e.target.value)}
                  className="w-full bg-carbon-950 border border-carbon-border rounded pl-9 pr-3 py-2 text-xs text-white placeholder-silver-muted focus:border-gold outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={handleCopyAllEmails}
                  disabled={subscribers.length === 0}
                  className="px-3.5 py-2 bg-carbon-800 hover:bg-carbon-700 text-silver hover:text-white rounded border border-carbon-border text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  {copiedEmails ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmails ? 'Copied to Clipboard!' : 'Copy Emails'}</span>
                </button>

                <a
                  href="/api/admin/subscribers?format=csv"
                  download
                  className="px-3.5 py-2 bg-carbon-800 hover:bg-carbon-700 text-silver hover:text-white rounded border border-carbon-border text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </a>

                <button
                  onClick={handleLoadIntoBlast}
                  disabled={subscribers.length === 0}
                  className="px-4 py-2 bg-gold hover:bg-gold-light text-carbon-950 font-semibold rounded text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Load into Email Blast</span>
                </button>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-carbon-900 border border-carbon-border rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-carbon-950/80 border-b border-carbon-border text-silver-muted uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Date Subscribed (Manila Time)</th>
                      <th className="py-3 px-4">Brevo Sync</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-carbon-border">
                    {loadingSubscribers ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-silver-muted">
                          <RefreshCw className="w-6 h-6 animate-spin text-gold mx-auto mb-2" />
                          <span>Loading subscriber records...</span>
                        </td>
                      </tr>
                    ) : filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-silver-muted space-y-2">
                          <Users className="w-8 h-8 text-silver-dark mx-auto" />
                          <p className="text-sm font-medium text-white">No subscribers found</p>
                          <p className="text-xs text-silver-muted max-w-sm mx-auto">
                            {subscriberSearch
                              ? `No email matched "${subscriberSearch}".`
                              : 'Subscribers who enter their email in the Private Access section will appear here automatically.'}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((sub, idx) => {
                        let manilaFormatted = sub.created_at;
                        try {
                          manilaFormatted = new Date(sub.created_at).toLocaleString('en-US', {
                            timeZone: 'Asia/Manila',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          });
                        } catch {}

                        return (
                          <tr key={sub.id} className="hover:bg-carbon-850/50 transition-colors">
                            <td className="py-3 px-4 text-silver-dark font-mono text-[11px]">{idx + 1}</td>
                            <td className="py-3 px-4 font-mono text-white text-xs font-medium">
                              {sub.email}
                            </td>
                            <td className="py-3 px-4 text-silver-muted">
                              <span className="bg-carbon-800 border border-carbon-border px-2 py-0.5 rounded text-[10px]">
                                {sub.source || 'Private Access'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-silver-muted text-[11px]">
                              {manilaFormatted}
                            </td>
                            <td className="py-3 px-4">
                              {sub.synced_to_brevo ? (
                                <span className="inline-flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-[10px] px-2 py-0.5 rounded">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>Synced</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-carbon-800 border border-carbon-border text-silver-muted text-[10px] px-2 py-0.5 rounded">
                                  <span>Stored</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              {deleteConfirmId === sub.id ? (
                                <div className="inline-flex items-center gap-2">
                                  <span className="text-[10px] text-rose-400">Confirm?</span>
                                  <button
                                    onClick={() => handleDeleteSubscriber(sub.id)}
                                    className="px-2 py-0.5 bg-rose-900 hover:bg-rose-800 text-white rounded text-[10px]"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="px-2 py-0.5 bg-carbon-800 text-silver rounded text-[10px]"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(sub.id)}
                                  className="text-silver-dark hover:text-rose-400 transition-colors p-1"
                                  title="Delete subscriber"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BREVO VIP DISPATCHER */}
        {activeTab === 'dispatcher' && (
          <div className="space-y-8">
            {/* Brevo Connection Status Banner */}
            <div className="bg-carbon-900/60 border border-carbon-border rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    brevoStatus?.connected ? 'bg-emerald-950 border border-emerald-500 text-emerald-400' : 'bg-amber-950 border border-amber-500 text-amber-400'
                  }`}>
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white text-base font-medium">Brevo (Sendinblue) Connection</h3>
                      {brevoStatus?.connected ? (
                        <span className="bg-emerald-900/60 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-700 font-medium uppercase">
                          Connected
                        </span>
                      ) : (
                        <span className="bg-amber-900/60 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-700 font-medium uppercase">
                          Action Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-silver-muted mt-1">
                      {brevoStatus?.connected
                        ? `Account: ${brevoStatus.companyName || brevoStatus.accountEmail} • Plan: ${brevoStatus.planType || 'Active'} • Credits: ${brevoStatus.credits ?? 'Unlimited'}`
                        : brevoStatus?.error || 'Checking Brevo API connection credentials...'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-silver-muted">
                    Sender: <strong className="text-white">{brevoConfig?.senderName} &lt;{brevoConfig?.senderEmail}&gt;</strong>
                  </span>
                </div>
              </div>

              {/* IP Whitelist Warning Helper */}
              {brevoStatus?.isIpRestricted && (
                <div className="mt-4 p-4 bg-amber-950/40 border border-amber-600/60 rounded-lg text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Brevo API Key IP Whitelist Restriction Detected</span>
                  </div>
                  <p className="text-silver">
                    Your Brevo API Key is restricted to specific IP addresses. To dispatch invitations from this server, add current IP{' '}
                    <code className="bg-carbon-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">{brevoStatus.clientIp || 'Server IP'}</code>{' '}
                    to your Brevo API key whitelist, or disable IP restriction on that key.
                  </p>
                  <a
                    href="https://app.brevo.com/settings/keys/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gold hover:underline font-medium"
                  >
                    <span>Open Brevo API Key Settings</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Two Column Layout: Designer / Dispatcher + Live Luxury Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form & Dispatch Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. Email Copy Customizer */}
                <div className="bg-carbon-900 border border-carbon-border rounded-xl p-6 space-y-5">
                  <div className="flex items-center gap-2 border-b border-carbon-border pb-3">
                    <Sliders className="w-4 h-4 text-gold" />
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                      1. Invitation Template Customization
                    </h2>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-silver-muted uppercase tracking-wider mb-1 font-medium">
                        Email Subject Line
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="w-full bg-carbon-950 border border-carbon-border rounded p-3 text-white focus:border-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-silver-muted uppercase tracking-wider mb-1 font-medium">
                        Header Headline
                      </label>
                      <input
                        type="text"
                        value={headline}
                        onChange={e => setHeadline(e.target.value)}
                        className="w-full bg-carbon-950 border border-carbon-border rounded p-3 text-white focus:border-gold outline-none font-serif text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-silver-muted uppercase tracking-wider mb-1 font-medium">
                        Preview / Editorial Body Copy
                      </label>
                      <textarea
                        rows={3}
                        value={previewText}
                        onChange={e => setPreviewText(e.target.value)}
                        className="w-full bg-carbon-950 border border-carbon-border rounded p-3 text-white focus:border-gold outline-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-silver-muted uppercase tracking-wider mb-1 font-medium">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={ctaText}
                        onChange={e => setCtaText(e.target.value)}
                        className="w-full bg-carbon-950 border border-carbon-border rounded p-3 text-white focus:border-gold outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Single VIP Test Send */}
                <div className="bg-carbon-900 border border-carbon-border rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-carbon-border pb-3">
                    <Send className="w-4 h-4 text-gold" />
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                      2. Send Single VIP Test Email
                    </h2>
                  </div>

                  <form onSubmit={handleSendTest} className="space-y-3">
                    <div className="flex gap-3">
                      <input
                        type="email"
                        required
                        placeholder="vip-collector@domain.com"
                        value={testEmail}
                        onChange={e => setTestEmail(e.target.value)}
                        className="flex-1 bg-carbon-950 border border-carbon-border rounded p-3 text-xs text-white focus:border-gold outline-none"
                      />
                      <button
                        type="submit"
                        disabled={sendingTest || !testEmail}
                        className="px-5 py-3 bg-carbon-800 hover:bg-carbon-700 text-white font-bold text-xs uppercase tracking-wider rounded border border-carbon-border transition-all flex items-center gap-2 disabled:opacity-40"
                      >
                        {sendingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-gold" /> : <Send className="w-3.5 h-3.5" />}
                        <span>Send Test</span>
                      </button>
                    </div>

                    {testResult && (
                      <div className={`p-3 rounded border text-xs flex items-center gap-2 ${
                        testResult.success
                          ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-800 text-rose-300'
                      }`}>
                        {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        <span>
                          {testResult.success
                            ? `Test invitation successfully delivered to ${testEmail} (Brevo MessageId: ${testResult.messageId || 'OK'})`
                            : `Error: ${testResult.error || 'Failed to deliver'}`}
                        </span>
                      </div>
                    )}
                  </form>
                </div>

                {/* 3. Bulk VIP Invitation Blast */}
                <div className="bg-carbon-900 border border-carbon-border rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-carbon-border pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold" />
                      <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        3. Bulk VIP Campaign Dispatcher
                      </h2>
                    </div>
                    {subscribers.length > 0 && (
                      <button
                        onClick={handleLoadIntoBlast}
                        className="text-[10px] text-gold hover:underline uppercase tracking-wider flex items-center gap-1"
                      >
                        <Users className="w-3 h-3" />
                        <span>Load All {subscribers.length} Subscribers</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-silver-muted">
                      Paste multiple collector emails below (separated by commas, semicolons, tabs, or newlines). Duplicate emails and invalid formats will be cleaned automatically.
                    </p>

                    <textarea
                      rows={5}
                      placeholder="client1@manila-wine.com&#10;collector2@domain.com, vip3@somewhere.ph"
                      value={rawEmails}
                      onChange={e => {
                        setRawEmails(e.target.value);
                        setParsedEmails(null);
                      }}
                      className="w-full bg-carbon-950 border border-carbon-border rounded p-3 text-xs text-white focus:border-gold outline-none font-mono"
                    />

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleParseEmails}
                        className="px-4 py-2 bg-carbon-800 hover:bg-carbon-700 text-silver hover:text-white rounded border border-carbon-border text-xs uppercase tracking-wider transition-colors"
                      >
                        Clean &amp; Validate List
                      </button>

                      {parsedEmails && (
                        <div className="text-xs text-silver-muted flex items-center gap-3">
                          <span className="text-emerald-400 font-semibold">{parsedEmails.valid.length} Valid</span>
                          {parsedEmails.duplicatesCount > 0 && (
                            <span className="text-amber-400">{parsedEmails.duplicatesCount} Duplicates Removed</span>
                          )}
                          {parsedEmails.invalid.length > 0 && (
                            <span className="text-rose-400">{parsedEmails.invalid.length} Invalid</span>
                          )}
                        </div>
                      )}
                    </div>

                    {parsedEmails && parsedEmails.valid.length > 0 && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleLaunchBlast}
                          disabled={sendingBlast}
                          className="w-full py-4 bg-gold hover:bg-gold-light text-carbon-950 font-bold text-xs uppercase tracking-luxury rounded transition-all shadow-lg hover:shadow-[0_0_25px_rgba(201,162,75,0.4)] flex items-center justify-center gap-2"
                        >
                          {sendingBlast ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>DISPATCHING VIA BREVO API ({parsedEmails.valid.length} RECIPIENTS)...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>DISPATCH OFFICIAL VIP PROPOSAL ({parsedEmails.valid.length} RECIPIENTS)</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {blastResult && (
                      <div className={`p-4 rounded border text-xs space-y-1 ${
                        blastResult.success
                          ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-800 text-rose-300'
                      }`}>
                        <div className="font-semibold flex items-center gap-1.5">
                          {blastResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                          <span>
                            Blast Completed: {blastResult.totalSent || 0} successfully delivered, {blastResult.totalFailed || 0} failed.
                          </span>
                        </div>
                        {blastResult.errors && blastResult.errors.length > 0 && (
                          <ul className="list-disc list-inside text-rose-300 text-[11px] pt-1">
                            {blastResult.errors.map((err: string, i: number) => (
                              <li key={i}>{err}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Luxury Email Preview (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-carbon-900 border border-carbon-border rounded-xl p-4 sticky top-6">
                  <div className="flex items-center justify-between border-b border-carbon-border pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gold" />
                      <span className="text-white text-xs font-semibold uppercase tracking-wider">
                        Live Responsive Email Preview
                      </span>
                    </div>
                    <a
                      href={iframePreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-gold hover:underline flex items-center gap-1"
                    >
                      <span>Open Fullscreen</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="w-full bg-[#000000] rounded-lg overflow-hidden border border-carbon-border shadow-2xl h-[700px]">
                    <iframe
                      src={iframePreviewUrl}
                      className="w-full h-full border-0"
                      title="Brevo VIP Email Preview"
                    />
                  </div>
                  <p className="text-[10px] text-silver-dark text-center mt-2">
                    Rendered with Manila Wine &amp; Champagne Carbon high-fidelity responsive HTML email template.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
