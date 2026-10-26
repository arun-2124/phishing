import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

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
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#080d1a]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative p-2 rounded-xl bg-gradient-to-tr from-cyan-600/30 to-blue-600/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:border-cyan-400 transition-colors">
              <ShieldAlert className="w-6 h-6 text-cyan-400 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  PhishGuard
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                  Python v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">URL Phishing Analysis</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('analyzer')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Analyzer
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              About & Disclaimer
            </button>
          </div>

          {/* Right Action & API Status */}
          <div className="flex items-center space-x-3">
            {/* Backend status pill */}
            <div
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${
                apiOnline === true
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50'
                  : apiOnline === false
                  ? 'bg-rose-950/60 text-rose-400 border-rose-800/50'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800'
              }`}
              title="Flask backend connection status"
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
              <span>{apiOnline === true ? 'Python API Online' : apiOnline === false ? 'API Offline' : 'Connecting...'}</span>
            </div>

            <button
              onClick={() => {
                if (onAnalyzeClick) onAnalyzeClick();
                scrollToSection('analyzer');
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-cyan-900/40 hover:shadow-cyan-500/30 transition-all cursor-pointer"
            >
              <span>Analyze URL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
