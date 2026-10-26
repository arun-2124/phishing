import React, { useState } from 'react';
import { ArrowDown, Compass, Globe, Lock, FileCode, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

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
      accent: 'border-cyan-400 text-cyan-300 shadow-cyan-950/80',
      glow: 'from-cyan-500/20 to-transparent',
      tag: 'Transport Security',
      role: 'Establishes the communication protocol (HTTP vs HTTPS).',
      phishRisk: 'Phishers may use unencrypted HTTP for cheap disposable traps. However, modern attackers also obtain free SSL certificates to show the lock icon—proving encryption, but NOT identity!',
    },
    {
      id: 'hostname',
      name: 'Hostname / Domain / IP',
      example: 'secure.login.example.com',
      accent: 'border-blue-400 text-blue-300 shadow-blue-950/80',
      glow: 'from-blue-500/20 to-transparent',
      tag: 'Authority Destination',
      role: 'Determines the destination server receiving all user traffic and credentials.',
      phishRisk: 'The prime deception vector: Attackers disguise hostnames using raw IP addresses (e.g. 192.0.2.10), deep nested subdomains (e.g. paypal.com.evil.com), typosquatting, or hyphenated brand mimicry.',
    },
    {
      id: 'path',
      name: 'Path',
      example: '/account/verify',
      accent: 'border-amber-400 text-amber-300 shadow-amber-950/80',
      glow: 'from-amber-500/20 to-transparent',
      tag: 'Resource Endpoint',
      role: 'Identifies the specific route, script, or page resource on the host machine.',
      phishRisk: 'Phishing URLs frequently copy legitimate paths like /login, /verification, /billing to visually reassure users who glance at the link.',
    },
    {
      id: 'query',
      name: 'Query Parameters',
      example: '?token=xyz&redirect=https://...',
      accent: 'border-emerald-400 text-emerald-300 shadow-emerald-950/80',
      glow: 'from-emerald-500/20 to-transparent',
      tag: 'State & Payload Data',
      role: 'Transmits key-value pairs following the "?" separator to backend handlers.',
      phishRisk: 'Attackers pass encoded victim identifiers, malicious redirect destinations (Open Redirect attacks), or obfuscated tracking tokens.',
    },
  ];

  const selectedPart = anatomyParts.find((p) => p.id === activeComponent) || anatomyParts[1];

  return (
    <section id="sec-what-is-analysis" className="py-20 border-b border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-blue-500/30 text-xs text-blue-300 mb-4">
            <span className="font-mono font-bold text-blue-400">02</span>
            <span className="text-slate-600">•</span>
            <span className="uppercase tracking-wider font-semibold">Core Concept</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            What is Phishing URL Analysis?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Examining the anatomical layers of web addresses to detect manipulative patterns.
          </p>
        </div>

        {/* Editorial Presentation Content Panel (No Speaker Notes label!) */}
        <div className="rounded-3xl glass-panel border border-blue-500/30 p-8 sm:p-12 shadow-2xl mb-12">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-200 text-lg sm:text-xl leading-relaxed">
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
              Phishing URL analysis is the process of examining a web address to identify characteristics that may indicate a phishing attempt.
            </p>

            <p>
              A suspicious URL might contain an unfamiliar domain, an IP address instead of a domain name, an unusually long address, or misleading subdomains.
            </p>

            <div className="p-6 rounded-2xl bg-[#091122]/90 border border-blue-500/30 text-blue-100 font-medium text-base sm:text-lg leading-relaxed shadow-inner">
              "However, a suspicious-looking URL is not automatically malicious. We use these indicators to estimate risk, not to make a guaranteed decision."
            </div>
          </div>
        </div>

        {/* 3D Layered Interactive URL Anatomy Component */}
        <div className="rounded-3xl glass-panel-3d border border-slate-700/80 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                3D Interactive URL Anatomy Decomposition
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click any colored segment to inspect its security relevance
            </span>
          </div>

          {/* 3D Elevated Ribbon Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#030712] border border-slate-800/90 shadow-2xl mb-8 overflow-x-auto">
            <div className="text-[11px] font-mono text-slate-500 mb-2 uppercase tracking-wider">
              Anatomy Target:
            </div>
            <div className="flex items-center font-mono text-sm sm:text-lg whitespace-nowrap gap-1">
              <button
                type="button"
                onClick={() => setActiveComponent('scheme')}
                className={`px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeComponent === 'scheme'
                    ? 'bg-cyan-500/30 text-cyan-300 ring-2 ring-cyan-400 font-bold scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'text-cyan-400 hover:bg-slate-900'
                }`}
              >
                https://
              </button>
              <button
                type="button"
                onClick={() => setActiveComponent('hostname')}
                className={`px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeComponent === 'hostname'
                    ? 'bg-blue-500/30 text-blue-300 ring-2 ring-blue-400 font-bold scale-105 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'text-blue-400 hover:bg-slate-900'
                }`}
              >
                secure.login.example.com
              </button>
              <button
                type="button"
                onClick={() => setActiveComponent('path')}
                className={`px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeComponent === 'path'
                    ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-400 font-bold scale-105 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'text-amber-400 hover:bg-slate-900'
                }`}
              >
                /account/verify
              </button>
              <button
                type="button"
                onClick={() => setActiveComponent('query')}
                className={`px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                  activeComponent === 'query'
                    ? 'bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-400 font-bold scale-105 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'text-emerald-400 hover:bg-slate-900'
                }`}
              >
                ?token=xyz&redirect=https://...
              </button>
            </div>
          </div>

          {/* 3D Depth Card for Selected Component */}
          <div className="relative rounded-2xl glass-panel p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden transition-all duration-500">
            <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${selectedPart.glow}`} />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-lg sm:text-xl font-bold text-white">{selectedPart.name}</span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-semibold">
                  {selectedPart.example}
                </span>
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800">
                {selectedPart.tag}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Standard Web Protocol Role:
                </span>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {selectedPart.role}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#050a16] border border-cyan-500/30 shadow-inner">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  How Phishers Exploit This Layer:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPart.phishRisk}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Section Transition Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-blue-500/40 text-blue-300 font-semibold text-sm hover:border-blue-300 transition-all cursor-pointer shadow-lg shadow-blue-950/60 group hover:scale-105"
          >
            <span>Next: Why Python?</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
