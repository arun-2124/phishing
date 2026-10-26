import React, { useState } from 'react';
import { ArrowDown, CornerDownRight, Crosshair, Layers, Terminal, Sparkles } from 'lucide-react';

export default function Section2_WhatIsAnalysis() {
  const [activeComponent, setActiveComponent] = useState('hostname');

  const scrollToNext = () => {
    const el = document.getElementById('sec-why-python');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const anatomyParts = [
    {
      id: 'scheme',
      code: 'https://',
      name: '01 // PROTOCOL SCHEME',
      role: 'Defines transmission rules across the wire (HTTP vs HTTPS).',
      phishRisk: 'Phishers exploit user assumptions: Free SSL certificates give phishing pages the green padlock. HTTPS guarantees encryption in transit, but NEVER guarantees ethical legitimacy.',
      accent: '#06b6d4',
      badge: 'CIPHER LAYER',
    },
    {
      id: 'hostname',
      code: 'secure.login.bank-portal.com',
      name: '02 // HOSTNAME & AUTHORITY',
      role: 'Designates the physical or virtual destination server answering DNS.',
      phishRisk: 'The prime deception battlefield. Phishers use raw IPv4 literals (192.0.2.10), deep multi-level subdomains, typosquatting (arnazon.com), or deceptive hyphen chains (paypal-verification-update.com).',
      accent: '#ccff00',
      badge: 'DNS IDENTITY',
    },
    {
      id: 'path',
      code: '/account/verify',
      name: '03 // RESOURCE PATH',
      role: 'Locates the exact endpoint, script, or directory structure on the server.',
      phishRisk: 'Phishers emulate authentic brand directory layouts (/login, /recover-account, /2fa-auth) to instill false psychological confidence during a visual glance.',
      accent: '#ff2a5f',
      badge: 'URI ROUTE',
    },
    {
      id: 'query',
      code: '?session=xyz&redirect=https://...',
      name: '04 // QUERY PARAMETERS',
      role: 'Key-value state variables passed to server-side scripts via the "?" delimiter.',
      phishRisk: 'Used in Open Redirect exploits to route users away after harvesting, or to pass encoded victim email payloads to populate fake forms automatically.',
      accent: '#3b82f6',
      badge: 'VARIABLE PAYLOAD',
    },
  ];

  const selected = anatomyParts.find((p) => p.id === activeComponent) || anatomyParts[1];

  return (
    <section id="sec-what-is-analysis" className="py-28 px-4 sm:px-8 bg-[#0a0a0f] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs text-white/50 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="text-[#ccff00]">02</span>
            <span>// DEFINITION & ANATOMY</span>
          </div>
          <span className="text-white/30">DECONSTRUCTION STAGE</span>
        </div>

        {/* Monumental Section Title */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
            What is Phishing <br />
            <span className="text-[#ccff00] font-serif italic tracking-normal">URL Analysis?</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl font-light">
            Deconstructing the syntax of trust. How malicious actors manipulate standard RFC 3986 components.
          </p>
        </div>

        {/* Presentation Speech Text Panel (Editorial format, no speaker notes label) */}
        <div className="rounded-3xl bg-[#0f0f16] border border-white/15 p-8 sm:p-14 mb-16 shadow-2xl">
          <div className="max-w-4xl space-y-6 text-white text-lg sm:text-2xl leading-relaxed font-light">
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Phishing URL analysis is the process of examining a web address to identify characteristics that may indicate a phishing attempt.
            </p>

            <p className="text-white/80">
              A suspicious URL might contain an unfamiliar domain, an IP address instead of a domain name, an unusually long address, or misleading subdomains.
            </p>

            <div className="p-6 rounded-2xl bg-black/80 border-l-4 border-[#ccff00] text-white text-xl italic font-serif leading-relaxed">
              "However, a suspicious-looking URL is not automatically malicious. We use these indicators to estimate risk, not to make a guaranteed decision."
            </div>
          </div>
        </div>

        {/* Interactive URL Anatomy as Digital Art */}
        <div className="rounded-3xl bg-[#060609] border border-white/20 p-6 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.9)] mb-14 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-wider text-white/50">
            <div className="flex items-center space-x-2">
              <Crosshair className="w-4 h-4 text-[#ccff00]" />
              <span className="text-white font-bold">DIGITAL ARTWORK // EXPLODED SYNTAX</span>
            </div>
            <span className="text-[#ccff00]">SELECT AN ANATOMICAL LAYER</span>
          </div>

          {/* Sculpture-Like Kinetic URL Ribbon */}
          <div className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10 mb-8 overflow-x-auto shadow-inner">
            <div className="font-mono text-[10px] text-white/40 mb-3 uppercase tracking-widest">
              ACTIVE SPECIMEN:
            </div>
            <div className="flex items-center font-mono text-lg sm:text-2xl lg:text-3xl font-black whitespace-nowrap gap-2">
              {anatomyParts.map((part) => {
                const isSelected = activeComponent === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => setActiveComponent(part.id)}
                    style={{
                      borderColor: isSelected ? part.accent : 'transparent',
                      color: isSelected ? '#000000' : part.accent,
                      backgroundColor: isSelected ? part.accent : 'transparent',
                    }}
                    className={`px-3 py-2 rounded-xl transition-all duration-300 font-mono tracking-tight cursor-pointer ${
                      isSelected
                        ? 'scale-105 shadow-[0_0_25px_rgba(255,255,255,0.4)]'
                        : 'hover:bg-white/5 border border-dashed border-white/10'
                    }`}
                  >
                    {part.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Component Art Card */}
          <div
            className="p-8 sm:p-10 rounded-2xl bg-[#0e0e16] border transition-all duration-500 shadow-2xl relative"
            style={{ borderColor: selected.accent }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-sm sm:text-base font-black uppercase text-white">
                  {selected.name}
                </span>
                <span
                  style={{ color: selected.accent, borderColor: selected.accent }}
                  className="font-mono text-xs px-3 py-0.5 rounded-full border bg-black/60 uppercase font-bold"
                >
                  {selected.badge}
                </span>
              </div>
              <span className="font-mono text-xs text-white/40">
                LITERAL VALUE: <code className="text-white font-bold">{selected.code}</code>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-white/40 block">
                  RFC Standard Architectural Function:
                </span>
                <p className="text-base sm:text-lg font-light leading-relaxed text-white/90">
                  {selected.role}
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-xl bg-black/60 border border-white/10">
                <span
                  style={{ color: selected.accent }}
                  className="font-mono text-xs uppercase tracking-wider font-bold block"
                >
                  Phishing Attack Vector & Exploitation:
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  {selected.phishRisk}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transition to Next Stage */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-sm">
          <button
            onClick={scrollToNext}
            className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-white hover:bg-[#ccff00] text-black font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Next: Why Python?</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <span className="text-xs text-white/40 font-mono hidden sm:inline">STAGE 02 / 06</span>
        </div>
      </div>
    </section>
  );
}
