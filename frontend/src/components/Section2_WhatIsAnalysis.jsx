import React, { useState } from 'react';
import { Mic, ArrowDown, HelpCircle, Layers, Globe, Server, Hash, Compass } from 'lucide-react';

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
      name: 'Scheme / Protocol',
      example: 'https://',
      color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40',
      tag: 'Protocol',
      role: 'Defines how data is transferred over the network (e.g., HTTP vs HTTPS).',
      phishRisk: 'Phishers sometimes use unencrypted HTTP for disposable traps, but modern phishers also use free HTTPS certificates. HTTPS encrypts transport, but does NOT prove identity!',
    },
    {
      id: 'hostname',
      name: 'Hostname / Domain / IP',
      example: 'secure.login.example.com',
      color: 'text-blue-400 border-blue-500/50 bg-blue-950/40',
      tag: 'Authority Host',
      role: 'Specifies the destination server receiving the web traffic.',
      phishRisk: 'The most critical field: Attackers spoof this with raw IP addresses (e.g., 192.0.2.10), deep subdomains (brand.fake.com), brand misspellings, or hyphenated prefixes.',
    },
    {
      id: 'path',
      name: 'Path',
      example: '/account/verify',
      color: 'text-amber-400 border-amber-500/50 bg-amber-950/40',
      tag: 'Resource Path',
      role: 'Points to the specific webpage, script, or resource on the host server.',
      phishRisk: 'Phishing URLs frequently use path terms like /login, /verification, /billing to mimic official portal routes and deceive users who inspect the link.',
    },
    {
      id: 'query',
      name: 'Query Parameters',
      example: '?token=xyz&redirect=https://...',
      color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40',
      tag: 'Query Strings',
      role: 'Passes key-value data to server scripts following the "?" delimiter.',
      phishRisk: 'Attackers often pass victim email addresses, encoded payloads, or nested redirect URLs to relay credentials through Open Redirect vulnerabilities.',
    },
  ];

  const selectedPart = anatomyParts.find((p) => p.id === activeComponent) || anatomyParts[1];

  return (
    <section id="sec-what-is-analysis" className="py-20 border-b border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide Counter / Section Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-blue-500/30 text-xs text-blue-300">
            <span className="font-mono font-bold text-blue-400">Section 02</span>
            <span className="text-slate-600">/</span>
            <span className="uppercase tracking-wider font-semibold">Concept Definition</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Slide 2 of 6 • College Presentation
          </span>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What is Phishing URL Analysis?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Understanding syntactic URL indicators and how attackers manipulate them.
          </p>
        </div>

        {/* Presentation Speech Card - Verbatim */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0a1020] border border-blue-500/30 p-6 sm:p-8 shadow-xl mb-10">
          <div className="flex items-center space-x-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            <Mic className="w-4 h-4 text-blue-400" />
            <span>Speaker Notes & Presentation Speech</span>
          </div>

          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              "Phishing URL analysis is the process of examining a web address to identify characteristics that may indicate a phishing attempt.
            </p>

            <p>
              A suspicious URL might contain an unfamiliar domain, an IP address instead of a domain name, an unusually long address, or misleading subdomains.
            </p>

            <p className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-blue-400 text-slate-200 font-medium">
              However, a suspicious-looking URL is not automatically malicious. We use these indicators to estimate risk, not to make a guaranteed decision."
            </p>
          </div>
        </div>

        {/* Interactive URL Anatomy Demonstration Illustration */}
        <div className="rounded-2xl bg-[#0b1222] border border-slate-800 p-6 sm:p-8 shadow-2xl mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Interactive URL Anatomy Illustration
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Click any section below to inspect its role
            </span>
          </div>

          {/* Combined Visual URL Ribbon */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 mb-6 overflow-x-auto">
            <div className="text-xs text-slate-500 font-mono mb-2">Example URL:</div>
            <div className="flex items-center font-mono text-sm sm:text-base whitespace-nowrap">
              <button
                onClick={() => setActiveComponent('scheme')}
                className={`px-2 py-1.5 rounded transition-all cursor-pointer ${
                  activeComponent === 'scheme'
                    ? 'bg-cyan-500/30 text-cyan-300 ring-2 ring-cyan-400 font-bold'
                    : 'text-cyan-400 hover:bg-slate-900'
                }`}
              >
                https://
              </button>
              <button
                onClick={() => setActiveComponent('hostname')}
                className={`px-2 py-1.5 rounded transition-all cursor-pointer ${
                  activeComponent === 'hostname'
                    ? 'bg-blue-500/30 text-blue-300 ring-2 ring-blue-400 font-bold'
                    : 'text-blue-400 hover:bg-slate-900'
                }`}
              >
                secure.login.example.com
              </button>
              <button
                onClick={() => setActiveComponent('path')}
                className={`px-2 py-1.5 rounded transition-all cursor-pointer ${
                  activeComponent === 'path'
                    ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-400 font-bold'
                    : 'text-amber-400 hover:bg-slate-900'
                }`}
              >
                /account/verify
              </button>
              <button
                onClick={() => setActiveComponent('query')}
                className={`px-2 py-1.5 rounded transition-all cursor-pointer ${
                  activeComponent === 'query'
                    ? 'bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-400 font-bold'
                    : 'text-emerald-400 hover:bg-slate-900'
                }`}
              >
                ?token=xyz&redirect=https://...
              </button>
            </div>
          </div>

          {/* Interactive Inspection Card for Selected Component */}
          <div className={`p-5 rounded-xl border ${selectedPart.color} transition-all`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-white">{selectedPart.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                  {selectedPart.example}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {selectedPart.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-3">
              <strong className="text-white">Standard Role:</strong> {selectedPart.role}
            </p>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
              <strong className="text-cyan-300">Phishing Heuristic Context:</strong> {selectedPart.phishRisk}
            </div>
          </div>
        </div>

        {/* Next Section Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-blue-500/40 text-blue-300 font-medium text-xs sm:text-sm hover:border-blue-400 transition-all cursor-pointer shadow-lg shadow-blue-950/50 group"
          >
            <span>Next: Why Python?</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
