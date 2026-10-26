import React from 'react';
import { ShieldCheck, EyeOff, Cpu, Terminal, ArrowDown } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  const scrollToAnalyzer = () => {
    const el = document.getElementById('analyzer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/5 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Badges */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 mb-6 shadow-sm shadow-cyan-950">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-semibold tracking-wide uppercase text-[11px]">Rule-Based Analysis</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Cybersecurity Detection Suite</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Detect Suspicious URLs{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            Before You Trust Them.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed font-normal">
          Analyze URL patterns with a transparent Python-powered phishing risk detector.
          Identify deceptive structural signals, obfuscated IPs, and spoofed authorities instantly.
        </p>

        {/* Safety Note banner */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 mb-10 shadow-inner">
          <EyeOff className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-cyan-300">Safety Guarantee:</strong> Analyzes URL structure only. Does not visit, ping, or crawl the target website.
          </span>
        </div>

        {/* Quick highlight cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left mb-8">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Engine</span>
            </div>
            <p className="text-sm font-bold text-white">Python urllib.parse</p>
            <p className="text-[11px] text-slate-400 mt-0.5">RFC-compliant URL parsing</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-blue-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rules</span>
            </div>
            <p className="text-sm font-bold text-white">13+ Heuristic Checks</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Weighted structural logic</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-emerald-400 mb-1">
              <EyeOff className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Privacy</span>
            </div>
            <p className="text-sm font-bold text-white">Zero External Calls</p>
            <p className="text-[11px] text-slate-400 mt-0.5">100% offline analysis</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center space-x-2 text-purple-400 mb-1">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Scoring</span>
            </div>
            <p className="text-sm font-bold text-white">0-100 Risk Scale</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Explainable findings</p>
          </div>
        </div>

        {/* Scroll CTA indicator */}
        <div className="flex justify-center pt-2">
          <button
            onClick={scrollToAnalyzer}
            className="flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group"
          >
            <span>Scroll to Analyzer</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
