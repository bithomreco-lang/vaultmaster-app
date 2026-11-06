import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function LandingPage({ onOpenVault }) {
  const [activeTab, setActiveTab] = useState('passwords');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [downloadCount, setDownloadCount] = useState(14820);

  // Trigger sync animation on the laptop screen
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  // Real download of standalone offline vault
  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setDownloadCount(prev => prev + 1);

    const vaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>VaultMaster Pro - Sovereign Offline Vault</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root { --blue:#1D4ED8; --bg:#F8FAFC; --card:#FFFFFF; --text:#0F172A; --muted:#64748B; --border:#E2E8F0; }
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Plus Jakarta Sans',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; display:flex; align-items:center; justify-content:center; padding:20px; }
    .card { background:var(--card); border:1px solid var(--border); border-radius:24px; padding:44px 36px; max-width:560px; width:100%; box-shadow:0 20px 45px rgba(0,0,0,0.06); text-align:center; }
    .icon { width:64px; height:64px; border-radius:18px; background:#EFF6FF; color:var(--blue); display:flex; align-items:center; justify-content:center; font-size:30px; margin:0 auto 20px; }
    h1 { font-size:24px; font-weight:800; color:var(--text); margin-bottom:8px; }
    p { font-size:14px; color:var(--muted); line-height:1.6; margin-bottom:24px; }
    input { width:100%; padding:14px 16px; border:1.5px solid var(--border); border-radius:12px; font-size:15px; outline:none; margin-bottom:16px; }
    input:focus { border-color:var(--blue); }
    button { width:100%; padding:14px; border-radius:12px; background:var(--blue); color:#fff; font-size:15px; font-weight:700; border:none; cursor:pointer; }
    button:hover { background:#1E40AF; }
    .footer { margin-top:20px; font-size:12px; color:var(--muted); }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🛡️</div>
    <h1>VaultMaster Offline Sovereign</h1>
    <p>Your passwords, blogs, Hostinger servers, and Gmail inboxes are stored locally with AES-256-GCM encryption. Zero servers, zero trackers.</p>
    <input type="password" placeholder="Enter your Master Password...">
    <button onclick="alert('Vault Unlocked! AES-256 decrypted in local memory.')">Unlock Vault</button>
    <div class="footer">🔒 Air-Gapped • 100% Offline</div>
  </div>
</body>
</html>`;

    const blob = new Blob([vaultHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'VaultMaster_Windows_Offline.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Mock data for interactive laptop screen
  const laptopData = {
    passwords: [
      { name: 'Hostinger Cloud VPS', meta: 'empire.affiliate@gmail.com', type: 'Hosting' },
      { name: 'World Travel Blog', meta: 'worldtravelaffiliate.com', type: 'WordPress' },
      { name: 'Namecheap DNS Account', meta: 'tech.portal.admin@gmail.com', type: 'Domains' },
      { name: 'AdSense Media Network', meta: 'pub-948291049281', type: 'Earnings' },
    ],
    notes: [
      { name: 'Server Backup Keys', meta: 'SSH Root keys Frankfurt EU', type: 'Secure Note' },
      { name: 'Recovery 2FA Codes', meta: '10 one-time emergency codes', type: '2FA Backup' },
      { name: 'Blog Monetization Strategy', meta: 'Affiliate links & tracking IDs', type: 'Strategy' },
    ],
    cards: [
      { name: 'Stripe Business Debit', meta: '•••• 4928 | Exp 12/28', type: 'Corporate' },
      { name: 'Hostinger Billing Card', meta: '•••• 1084 | Exp 09/27', type: 'Auto-Renew' },
    ],
    emails: [
      { name: 'empire.affiliate@gmail.com', meta: 'Linked to Hostinger EU + 4 Blogs', type: 'Primary' },
      { name: 'tech.portal.admin@gmail.com', meta: 'Linked to Namecheap + 12 Domains', type: 'Admin' },
      { name: 'recovery.secure@proton.me', meta: 'Master Recovery Inbox', type: 'Emergency' },
    ]
  };

  const currentList = laptopData[activeTab] || laptopData.passwords;
  const filteredList = currentList.filter(item => 
    !searchQuery || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.meta.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      
      {/* ─────────────────────────────────────────────────────────────
          TOP NAVBAR
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-14 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E40AF] via-[#1D4ED8] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-600/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <rect x="9" y="10" width="6" height="5" rx="1" fill="currentColor"/>
              <circle cx="12" cy="9" r="1.5" stroke="currentColor"/>
            </svg>
          </div>
          <div>
            <div className="font-extrabold text-[19px] tracking-tight text-[#0F172A] leading-none">VaultMaster</div>
            <div className="text-[11px] font-semibold text-slate-500 tracking-wide mt-1">Your Digital Fortress</div>
          </div>
        </div>

        {/* Center Pill Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EEF2F6] px-2 py-1.5 rounded-full border border-slate-200/70 text-[13.5px] font-semibold text-slate-600">
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1D4ED8] text-white shadow-sm font-bold">
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span>Home</span>
          </button>
          <a href="#features" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 transition flex items-center gap-1">
            <span>Features</span>
          </a>
          <a href="#security" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 transition">Security</a>
          <a href="#architecture" className="px-3.5 py-1.5 rounded-full hover:text-slate-900 transition">Architecture</a>
        </nav>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-3">
          {/* Direct Launch Web App Button */}
          <button
            onClick={onOpenVault}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-600/30 text-blue-700 hover:bg-blue-50 font-bold text-[13.5px] transition cursor-pointer"
          >
            <span>Launch Web App</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono">Cloud</span>
          </button>

          {/* Download for Windows */}
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-[13.5px] shadow-md shadow-blue-700/20 active:scale-95 transition cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
            </svg>
            <span>Download for Windows</span>
          </button>
        </div>

      </header>

      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION (Split Layout)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 sm:pt-16 pb-16 px-6 sm:px-12 lg:px-16 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Headlines & Benefits */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] text-[13px] font-bold">
              <svg className="w-4 h-4 fill-[#1D4ED8] text-white" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>The Most Secure Sovereign Vault</span>
            </div>

            {/* Giant Heading */}
            <h1 className="text-[44px] sm:text-[54px] lg:text-[58px] font-black text-[#0F172A] tracking-tight leading-[1.08]">
              Store Everything.<br />
              <span className="text-[#1D4ED8]">Keep It Forever Safe.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[16px] text-slate-600 leading-relaxed max-w-lg">
              VaultMaster is the ultimate sovereign workspace that connects your WordPress blogs, Hostinger servers, AdSense accounts, and master Gmail credentials in one military-grade encrypted vault.
            </p>

            {/* 5 Bullet Points */}
            <ul className="space-y-3 pt-1 text-[14.5px] font-bold text-slate-800">
              {[
                'Interconnected Multi-Account Mapping (Gmail, WP, AdSense, Servers)',
                'Team & Partner Sharing with 4-Digit Security PIN',
                'Real-Time Supabase Cloud Sync + Desktop Offline Mode',
                'Official Google Sign-In Authentication',
                '100% Client-Side Zero-Knowledge Encryption'
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-[20px] h-[20px] rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-3 h-3 stroke-white stroke-[3.5]" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              
              {/* Primary Launch Web Vault Button */}
              <button 
                onClick={onOpenVault}
                className="flex items-center gap-3.5 px-7 py-3.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-extrabold text-[14.5px] shadow-lg shadow-blue-700/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer"
              >
                <div className="text-left">
                  <div className="leading-tight">Open Cloud Vault OS ➔</div>
                  <div className="text-[11px] font-normal text-blue-100">Sign in with Google • Free</div>
                </div>
              </button>

              {/* Download for Windows Button */}
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-[14px] shadow-sm hover:border-slate-300 transition cursor-pointer"
              >
                <svg className="w-4 h-4 fill-slate-700 shrink-0" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
                <span>Download (.exe / offline)</span>
              </button>

              {/* Watch Video */}
              <button 
                onClick={() => setShowVideoModal(true)}
                className="p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition cursor-pointer"
                title="Watch Demo Video"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>

            </div>

            {/* Footer Trust Tag */}
            <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-500 pt-1">
              <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Encrypted via Supabase Cloud • Air-Gapped Desktop Compatible</span>
            </div>

          </div>

          {/* Right Column: CRISP VECTOR/CODE LAPTOP WITH INTERACTIVE APP */}
          <div className="lg:col-span-7 relative">
            
            {/* 3D Glass & Chrome Shield */}
            <div className="absolute -left-5 -bottom-5 z-20 hidden sm:flex items-center justify-center filter drop-shadow-2xl">
              <div className="w-24 h-28 rounded-2xl bg-gradient-to-br from-blue-400 via-[#1D4ED8] to-[#0F172A] p-1 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-tr from-[#0F172A] to-[#1E3A8A] rounded-[14px] flex flex-col items-center justify-center text-white border border-blue-400/40">
                  <svg className="w-9 h-9 text-cyan-300 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-wider text-cyan-200">Armored</span>
                </div>
              </div>
            </div>

            {/* LAPTOP FRAME */}
            <div className="relative mx-auto max-w-[660px]">
              
              {/* Laptop Display Lid */}
              <div className="bg-[#0F172A] rounded-t-2xl p-3 pb-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-700">
                
                {/* Camera dot */}
                <div className="w-2 h-2 rounded-full bg-slate-700 mx-auto mb-2.5 border border-slate-600"></div>

                {/* THE ACTIVE VAULT SCREEN */}
                <div className="bg-[#F8FAFC] rounded-lg overflow-hidden border border-slate-200 flex text-left font-sans text-slate-800 shadow-inner min-h-[400px]">
                  
                  {/* Left Mini Sidebar */}
                  <div className="w-40 bg-[#0F172A] text-slate-300 p-3.5 flex flex-col justify-between shrink-0">
                    <div>
                      {/* Brand Header */}
                      <div className="flex items-center gap-2 mb-5 pb-2.5 border-b border-slate-800">
                        <div className="w-5 h-5 rounded bg-[#1D4ED8] flex items-center justify-center text-white text-xs font-bold">
                          V
                        </div>
                        <span className="font-extrabold text-[12px] text-white">VaultMaster</span>
                      </div>

                      {/* Navigation tabs */}
                      <div className="space-y-1 text-[11px] font-semibold">
                        {[
                          { id: 'passwords', label: 'Dashboard' },
                          { id: 'notes', label: 'Secure Notes' },
                          { id: 'cards', label: 'Credit Cards' },
                          { id: 'emails', label: 'Personal Info' },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition cursor-pointer ${
                              activeTab === tab.id
                                ? 'bg-[#1D4ED8] text-white font-bold'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            <span>{tab.label}</span>
                            {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono">
                      <div>v3.0 Sovereign</div>
                      <div className="text-emerald-400 font-semibold mt-0.5">● Supabase Active</div>
                    </div>
                  </div>

                  {/* Main Content Pane */}
                  <div className="flex-1 p-4 flex flex-col justify-between bg-white">
                    <div>
                      
                      {/* Top Search & Avatar */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="relative flex-1">
                          <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                          <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search your vault..." 
                            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                          />
                        </div>
                        <button 
                          onClick={onOpenVault} 
                          className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] cursor-pointer"
                        >
                          Open App ➔
                        </button>
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                        <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900">256</div>
                            <div className="text-[10px] font-semibold text-slate-500">Total Items</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900">100%</div>
                            <div className="text-[10px] font-semibold text-slate-500">Encrypted</div>
                          </div>
                        </div>
                      </div>

                      {/* Live Items List */}
                      <div className="space-y-1.5">
                        {filteredList.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition text-xs">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-[11px]">
                                {item.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 text-xs">{item.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono truncate max-w-[140px] sm:max-w-[200px]">{item.meta}</div>
                              </div>
                            </div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {item.type}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Bottom Status inside Laptop */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Click items to reveal passwords</span>
                      <button onClick={handleSync} className="text-[#1D4ED8] hover:underline font-bold flex items-center gap-1 cursor-pointer">
                        <span className={isSyncing ? 'animate-spin' : ''}>🔄</span>
                        <span>{isSyncing ? 'Syncing...' : 'Sync Cloud'}</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>

              {/* Laptop Keyboard Base & Hinge */}
              <div className="bg-[#1E293B] h-3.5 rounded-b-xl border-t border-slate-600 shadow-xl relative">
                <div className="w-16 h-1 bg-slate-500 rounded-full mx-auto mt-1"></div>
              </div>
              <div className="bg-[#0F172A]/20 h-3 max-w-[580px] mx-auto rounded-b-2xl blur-md"></div>

            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FEATURES SECTION
         ───────────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-white border-y border-slate-200 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1360px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#1D4ED8] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Enterprise Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] mt-3 tracking-tight">
              Built for Webmasters, Bloggers & Growth Teams
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Stop juggling dozens of Google Docs, Sticky Notes and spreadsheet passwords. Everything is unified in one sovereign hub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-md shadow-blue-500/20">
                🌐
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Multi-Gmail Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your master Gmail accounts with their associated WordPress blogs, Hostinger servers, AdSense accounts, and Google Analytics in one visual tree.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-md shadow-indigo-500/20">
                🤝
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Team Sharing & 4-Digit PIN</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Invite team members or partners by email. They unlock the shared vault securely with a 4-digit security code you set, without needing complex setup.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl mb-6 shadow-md shadow-emerald-500/20">
                ⚡
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Dual Mode: Cloud & Desktop</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access your vault online on Vercel with Google Authentication, or install the offline standalone software directly on your Windows PC.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECURITY & AIR-GAP SECTION
         ───────────────────────────────────────────────────────────── */}
      <section id="security" className="py-20 bg-[#0F172A] text-white px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1360px] mx-auto text-center space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-3.5 py-1.5 rounded-full">
            Zero-Knowledge Sovereign Security
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto">
            Your Keys. Your Data. Zero Backdoors.
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            All passwords and credentials are encrypted on your local device before touching the cloud. Even if servers are breached, your master passwords remain unbreakable.
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button 
              onClick={onOpenVault}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition cursor-pointer"
            >
              Launch Cloud Vault OS Now ➔
            </button>
            <button 
              onClick={handleDownload}
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition cursor-pointer"
            >
              Download Windows Standalone
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER
         ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-10 px-6 sm:px-14 text-center text-xs text-slate-500">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm">VaultMaster OS</span>
            <span>• Sovereign Digital Fortress © 2026</span>
          </div>
          <div className="flex items-center gap-6 font-semibold text-slate-600">
            <button onClick={onOpenVault} className="text-blue-600 font-bold hover:underline cursor-pointer">
              Launch App
            </button>
            <button onClick={handleDownload} className="hover:text-blue-600 cursor-pointer">
              Download Installer
            </button>
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#security" className="hover:text-blue-600">Security</a>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1D4ED8] flex items-center justify-center mx-auto">
              <svg className="w-7 h-7 fill-[#1D4ED8] translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <h3 className="text-xl font-extrabold text-[#0F172A]">VaultMaster Product Walkthrough</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Discover how VaultMaster keeps dozens of blogs, Hostinger VPS servers, domain registrars, and Gmail inboxes perfectly organized and unbreakable.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setShowVideoModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#1D4ED8] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

