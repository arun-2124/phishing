import React from 'react';
import {
  ShieldCheck,
  Search,
  ArrowDown,
  Sparkles,
  Lock,
  Globe,
  ExternalLink,
  Cpu,
  Layers
} from 'lucide-react';

export default function Section1_Introduction() {
  const scrollToNext = () => {
    const el = document.getElementById('sec-what-is-analysis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAnalyzer = () => {
    const el = document.getElementById('sec-live-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sec-intro" className="relative pt-8 pb-20 overflow-hidden">
      {/* 3D Atmospheric Lighting & Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-violet-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-60 -left-20 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-80 -right-20 w-80 h-80 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Hero Heading Block */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)] mb-6 animate-pulse-glow">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Cybersecurity Heuristic Framework
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Python Standard Library</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Phishing URL Analysis{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(6,182,212,0.3)]">
              Using Python
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Understand suspicious URLs. Discover the signals. Make informed decisions.
          </p>
        </div>

        {/* 3D Visual Art Centerpiece: Abstract 3D URL Ribbon & Floating Security Universe */}
        <div className="relative mb-14 perspective-1000 max-w-4xl mx-auto">
          {/* Main 3D Card Stage */}
          <div className="relative rounded-3xl glass-panel-3d p-6 sm:p-10 border border-slate-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Background 3D Grid & Ambient Beams */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />

            {/* 3D Composition Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left Column: 3D Animated Illustration */}
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative py-4">
                {/* 3D Curved Ribbon */}
                <div className="w-full max-w-sm rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-600/30 to-violet-600/30 p-[1.5px] shadow-[0_15px_35px_rgba(6,182,212,0.3)] animate-ribbon">
                  <div className="rounded-2xl bg-[#091122]/95 backdrop-blur-xl p-4 border border-cyan-400/30">
                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1.5">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-300">Target URL Ribbon</span>
                    </div>
                    <div className="font-mono text-sm sm:text-base font-bold text-white break-all bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800">
                      https://<span className="text-cyan-400">secure</span>.<span className="text-rose-400 font-extrabold underline decoration-rose-500">verify-bank</span>.com/<span className="text-amber-400">login</span>
                    </div>
                  </div>
                </div>

                {/* Floating 3D Elements Cluster */}
                <div className="relative w-full h-32 mt-4">
                  {/* Floating 3D Magnifying Glass Pill */}
                  <div className="absolute top-1 left-4 rounded-xl glass-panel px-3 py-2 border border-cyan-400/40 shadow-lg shadow-cyan-950/80 flex items-center space-x-2 animate-float-slow">
                    <Search className="w-4 h-4 text-cyan-300" />
                    <span className="text-xs font-mono text-slate-200 font-bold">Lexical Scanner</span>
                  </div>

                  {/* Floating 3D Shield Badge */}
                  <div className="absolute top-0 right-4 rounded-xl glass-panel px-3 py-2 border border-violet-500/40 shadow-lg shadow-violet-950/80 flex items-center space-x-2 animate-float-reverse">
                    <ShieldCheck className="w-4 h-4 text-violet-300" />
                    <span className="text-xs font-mono text-slate-200 font-bold">13+ Heuristics</span>
                  </div>

                  {/* Floating 3D Micro-Data Pill */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full glass-panel px-4 py-1.5 border border-emerald-500/40 shadow-md flex items-center space-x-2 animate-float-slow">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold">Zero Remote Requests (Safe)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Features Trio */}
              <div className="w-full md:w-1/2 space-y-3">
                <div className="p-3.5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all hover:translate-x-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Python urllib.parse</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Deconstructs protocol, authority, paths, and query variables safely.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl glass-panel border border-slate-800 hover:border-violet-500/40 transition-all hover:translate-x-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-violet-950/80 border border-violet-800 text-violet-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">IP & Subdomain Heuristics</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Detects raw IPv4/IPv6 literals and brand impersonation in subdomains.</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl glass-panel border border-slate-800 hover:border-blue-500/40 transition-all hover:translate-x-1">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-800 text-blue-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Explainable Risk Scoring</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Every point contribution is backed by a plain-English security rationale.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Presentation Content Panel (Seamlessly integrated presentation speech without any speaker labels) */}
        <div className="rounded-3xl glass-panel border border-cyan-500/30 p-8 sm:p-12 shadow-2xl relative mb-12">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-200 text-lg sm:text-xl leading-relaxed font-normal">
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good morning everyone!
            </p>

            <p className="text-cyan-200 font-medium">
              Today, I'm going to talk about <strong className="text-white underline decoration-cyan-400 decoration-2 underline-offset-4">Phishing URL Analysis Using Python</strong>.
            </p>

            <div className="p-6 rounded-2xl bg-[#070e1e]/90 border border-cyan-500/20 text-slate-100 font-light text-base sm:text-lg italic leading-relaxed my-4 shadow-inner">
              "Let me start with a simple question. Have you ever received a link claiming that your bank account needs verification, or that you've won a prize? Have you ever wondered whether that link is genuine or a scam?"
            </div>

            <p>
              These are common techniques used in phishing attacks. Attackers create misleading links to trick people into visiting fake websites and revealing sensitive information, such as passwords and banking details.
            </p>

            <p className="text-white font-semibold text-xl pt-2">
              So, how can we identify suspicious URLs before trusting them? That's what my topic is about.
            </p>
          </div>
        </div>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(6,182,212,0.4)] hover:shadow-[0_10px_40px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Explore the Analysis</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={scrollToAnalyzer}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl glass-panel hover:bg-white/10 border border-slate-700 text-slate-200 font-semibold text-sm sm:text-base transition-all hover:scale-105 cursor-pointer"
          >
            <span>Jump Directly to Live Demo</span>
            <ExternalLink className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
