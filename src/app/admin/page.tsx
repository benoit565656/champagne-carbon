
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
  Sliders
} from 'lucide-react';

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

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

  const handleParseEmails = async () => {
    if (!rawEmails.trim()) {
      setParsedEmails(null);
      return;
    }
    try {
      const res = await fetch('/api/admin/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'parse-emails', rawText: rawEmails }),
      });
      const data = await res.json();
      setParsedEmails(data);
    } catch (e) {
      console.error(e);
    }
  };

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
              Sign in to manage Brevo VIP email dispatches &amp; Champagne Carbon allocations.
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
              Brevo VIP Invitation Dispatcher
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchBrevoStatus(apiKeyOverride)}
              className="p-2.5 bg-carbon-800 hover:bg-carbon-700 text-silver hover:text-white rounded border border-carbon-border transition-colors"
              title="Refresh Brevo Status"
            >
              <RefreshCw className={`w-4 h-4 ${loadingStatus ? 'animate-spin text-gold' : ''}`} />
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
                      Configuration Needed
                    </span>
                  )}
                </div>
                <p className="text-xs text-silver-muted mt-0.5">
                  {brevoStatus?.connected
                    ? `Account: ${brevoStatus.accountEmail} &bull; Company: ${brevoStatus.companyName} &bull; Plan: ${brevoStatus.planType}`
                    : (brevoStatus?.error || 'No API key configured yet.')}
                </p>
              </div>
            </div>

            {/* Quick API Key Override */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Key className="w-3.5 h-3.5 text-carbon-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={apiKeyOverride}
                  onChange={e => setApiKeyOverride(e.target.value)}
                  placeholder={brevoConfig?.hasApiKey ? `Key set: ${brevoConfig.maskedKey}` : 'Paste Brevo xkeysib-...'}
                  className="w-full bg-carbon-950 border border-carbon-border rounded py-2 pl-9 pr-3 text-xs text-white focus:border-gold outline-none"
                />
              </div>
              <button
                onClick={() => fetchBrevoStatus(apiKeyOverride)}
                className="py-2 px-3 bg-carbon-800 hover:bg-gold hover:text-carbon-950 text-silver text-xs rounded font-medium transition-colors whitespace-nowrap"
              >
                Apply Key
              </button>
            </div>
          </div>
        </div>

        {/* Workspace: 2-Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Email Configuration & VIP Dispatch (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. Campaign Customizer */}
            <div className="bg-carbon-900 border border-carbon-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-carbon-border pb-3">
                <Sliders className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-lg text-white font-normal tracking-wide">
                  Campaign Content &amp; Copy
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-silver-muted uppercase tracking-wider mb-1">Email Subject Line</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-silver-muted uppercase tracking-wider mb-1">Main Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-silver-muted uppercase tracking-wider mb-1">Inbox Preview Snippet</label>
                  <textarea
                    rows={2}
                    value={previewText}
                    onChange={e => setPreviewText(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-silver-muted uppercase tracking-wider mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={e => setCtaText(e.target.value)}
                    className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Test Email Dispatcher */}
            <div className="bg-carbon-900 border border-carbon-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-carbon-border pb-3">
                <Send className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-lg text-white font-normal tracking-wide">
                  Send Instant Test Email
                </h3>
              </div>

              <form onSubmit={handleSendTest} className="space-y-3 text-xs">
                <div>
                  <label className="block text-silver-muted uppercase tracking-wider mb-1">
                    Your Test Email Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={testEmail}
                      onChange={e => setTestEmail(e.target.value)}
                      placeholder="e.g. ben@manila-wine.com"
                      className="flex-1 bg-carbon-950 border border-carbon-border rounded p-2.5 text-white focus:border-gold outline-none"
                    />
                    <button
                      type="submit"
                      disabled={sendingTest}
                      className="py-2.5 px-5 bg-gold hover:bg-gold-light text-carbon-950 font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      {sendingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Send Test'}
                    </button>
                  </div>
                </div>

                {testResult && (
                  <div className={`p-3 rounded text-xs flex items-center gap-2 ${
                    testResult.success ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-300' : 'bg-rose-950/60 border border-rose-700 text-rose-300'
                  }`}>
                    {testResult.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                    <span>{testResult.success ? `Test email delivered successfully! (ID: ${testResult.messageId})` : `Failed: ${testResult.error}`}</span>
                  </div>
                )}
              </form>
            </div>

            {/* 3. Bulk VIP Blast Dispatcher */}
            <div className="bg-carbon-900 border border-carbon-border rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-carbon-border pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold" />
                  <h3 className="font-serif text-lg text-white font-normal tracking-wide">
                    VIP Client Allocation Blast
                  </h3>
                </div>
                {parsedEmails && (
                  <span className="text-[11px] font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                    {parsedEmails.valid.length} Valid Recipients
                  </span>
                )}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-silver-muted uppercase tracking-wider mb-1">
                    Paste Selected Client Emails (Comma or Newline Separated)
                  </label>
                  <textarea
                    rows={4}
                    value={rawEmails}
                    onChange={e => setRawEmails(e.target.value)}
                    onBlur={handleParseEmails}
                    placeholder="vip1@domain.com, vip2@domain.com&#10;vip3@domain.com"
                    className="w-full bg-carbon-950 border border-carbon-border rounded p-2.5 text-white font-mono text-xs focus:border-gold outline-none"
                  ></textarea>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleParseEmails}
                    className="text-gold underline hover:text-gold-light text-xs"
                  >
                    Analyze &amp; Deduplicate Emails
                  </button>

                  {parsedEmails && parsedEmails.duplicatesCount > 0 && (
                    <span className="text-silver-muted text-[11px]">
                      ({parsedEmails.duplicatesCount} duplicate emails removed)
                    </span>
                  )}
                </div>

                {parsedEmails && parsedEmails.valid.length > 0 && (
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={sendingBlast}
                      onClick={handleLaunchBlast}
                      className="w-full py-4 bg-gradient-to-r from-manila-wine via-gold to-manila-wine hover:brightness-110 text-carbon-950 font-bold text-xs uppercase tracking-luxury rounded transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {sendingBlast ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span>
                        LAUNCH VIP CAMPAIGN BLAST ({parsedEmails.valid.length} RECIPIENTS)
                      </span>
                    </button>
                  </div>
                )}

                {blastResult && (
                  <div className={`p-4 rounded text-xs space-y-1 ${
                    blastResult.success ? 'bg-emerald-950/70 border border-emerald-700 text-emerald-200' : 'bg-rose-950/70 border border-rose-700 text-rose-200'
                  }`}>
                    <div className="font-semibold flex items-center gap-2">
                      {blastResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>Campaign Dispatch Completed</span>
                    </div>
                    <p>Successfully Sent: <strong>{blastResult.totalSent}</strong> &bull; Failed: <strong>{blastResult.totalFailed}</strong></p>
                    {blastResult.errors?.length > 0 && (
                      <div className="text-[11px] text-rose-300 pt-1">
                        Errors: {blastResult.errors.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Live Responsive Iframe Preview (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-carbon-900 border border-carbon-border rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-base text-white tracking-wide">Live Email Preview</h3>
              </div>
              <a
                href={iframePreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-silver hover:text-gold flex items-center gap-1"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-carbon-950 border border-carbon-border rounded-xl overflow-hidden shadow-2xl h-[780px]">
              <iframe
                src={iframePreviewUrl}
                className="w-full h-full border-0"
                title="Champagne Carbon VIP Email Preview"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
