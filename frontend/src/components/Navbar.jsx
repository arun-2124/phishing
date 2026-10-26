import React, { useState, useEffect } from 'react';
import { Terminal, ArrowUpRight, Shield, Zap } from 'lucide-react';

export default function Navbar({ onAnalyzeClick }) {
  const [apiOnline, setApiOnline] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'healthy') {
          setApiOnline(true);
        } else {
          setApiOnline(false);
        }
      })
      .catch(() => setApiOnline(false));
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand identity: PhishGuard — URL Intelligence Lab */}
        <div
          onClick={() => scrollToSection('sec-intro')}
          className="pointer-events-auto flex items-center space-x-3 cursor-pointer group bg-[#0d0d12]/90 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 hover:border-[#ccff00]/60 transition-all shadow-2xl"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse shadow-[0_0_10px_#ccff00]" />
          <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-wider">
            <span className="font-black text-white group-hover:text-[#ccff00] transition-colors">
              PhishGuard
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/60 hidden sm:inline">URL Intelligence Lab</span>
          </div>
        </div>

        {/* Narrative Chapters Navigation */}
        <div className="pointer-events-auto hidden md:flex items-center space-x-1 bg-[#0d0d12]/90 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-white/70">
          <button
            onClick={() => scrollToSection('sec-intro')}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            01 Intro
          </button>
          <button
            onClick={() => scrollToSection('sec-what-is-analysis')}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            02 Anatomy
          </button>
          <button
            onClick={() => scrollToSection('sec-why-python')}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            03 Python
          </button>
          <button
            onClick={() => scrollToSection('sec-how-it-works')}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            04 Pipeline
          </button>
          <button
            onClick={() => scrollToSection('sec-live-demo')}
            className="px-3 py-1 rounded-full text-[#ccff00] font-bold hover:bg-[#ccff00]/20 transition-all cursor-pointer"
          >
            05 Live Lab
          </button>
          <button
            onClick={() => scrollToSection('sec-conclusion')}
            className="px-3 py-1 rounded-full hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            06 Epilogue
          </button>
        </div>

        {/* Right Status & Launch Button */}
        <div className="pointer-events-auto flex items-center space-x-3">
          {/* Real-time Python Engine Status */}
          <div
            className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider border backdrop-blur-md ${
              apiOnline === true
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                : apiOnline === false
                ? 'bg-rose-950/40 text-rose-400 border-rose-800/60'
                : 'bg-white/5 text-white/40 border-white/10'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                apiOnline === true ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'
              }`}
            />
            <span>{apiOnline === true ? 'Engine: Ready' : 'Engine: Offline'}</span>
          </div>

          <button
            onClick={() => {
              if (onAnalyzeClick) onAnalyzeClick();
              scrollToSection('sec-live-demo');
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-black font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_rgba(204,255,0,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Analyse URL</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
}
