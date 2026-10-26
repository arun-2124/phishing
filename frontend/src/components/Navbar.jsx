import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Activity, Terminal } from 'lucide-react';

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
    <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 pb-2 pointer-events-none">
      <div className="max-w-6xl mx-auto">
        <nav className="pointer-events-auto rounded-2xl glass-panel border border-slate-700/60 bg-[#070d1e]/85 backdrop-blur-xl px-4 sm:px-6 py-2.5 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            {/* Logo & 3D Brand Emblem */}
            <div
              className="flex items-center space-x-3 cursor-pointer group select-none"
              onClick={() => scrollToSection('sec-intro')}
            >
              <div className="relative p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/30 to-violet-600/20 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.35)] group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300">
                <ShieldCheck className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm pointer-events-none" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent">
                    PhishGuard
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm">
                    3D Core
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-none hidden sm:block">
                  Phishing URL Analysis Using Python
                </p>
              </div>
            </div>

            {/* Presentation Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-300">
              <button
                onClick={() => scrollToSection('sec-intro')}
                className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                1. Intro
              </button>
              <button
                onClick={() => scrollToSection('sec-what-is-analysis')}
                className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                2. URL Analysis
              </button>
              <button
                onClick={() => scrollToSection('sec-why-python')}
                className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                3. Why Python?
              </button>
              <button
                onClick={() => scrollToSection('sec-how-it-works')}
                className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                4. How It Works
              </button>
              <button
                onClick={() => scrollToSection('sec-live-demo')}
                className="px-3 py-1.5 rounded-lg text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/50 transition-all cursor-pointer font-bold"
              >
                5. Live Demo
              </button>
              <button
                onClick={() => scrollToSection('sec-conclusion')}
                className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                6. Conclusion
              </button>
            </div>

            {/* Right Status & Direct Action */}
            <div className="flex items-center space-x-3">
              {/* API Status Badge */}
              <div
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${
                  apiOnline === true
                    ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : apiOnline === false
                    ? 'bg-rose-950/50 text-rose-300 border-rose-700/60'
                    : 'bg-slate-900/60 text-slate-400 border-slate-700'
                }`}
                title="Python Flask API status"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    apiOnline === true
                      ? 'bg-emerald-400 animate-pulse'
                      : apiOnline === false
                      ? 'bg-rose-500'
                      : 'bg-slate-500'
                  }`}
                />
                <span className="hidden sm:inline">
                  {apiOnline === true ? 'Python API Active' : apiOnline === false ? 'API Offline' : 'Connecting...'}
                </span>
                <span className="sm:hidden">{apiOnline === true ? 'API Active' : 'Offline'}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (onAnalyzeClick) onAnalyzeClick();
                  scrollToSection('sec-live-demo');
                }}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(6,182,212,0.35)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Live Analyzer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
