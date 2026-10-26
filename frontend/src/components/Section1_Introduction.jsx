import React from 'react';
import { ShieldAlert, ArrowDown, Mic, AlertCircle, Lock, Sparkles } from 'lucide-react';

export default function Section1_Introduction() {
  const scrollToNext = () => {
    const el = document.getElementById('sec-what-is-analysis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sec-intro" className="relative pt-12 pb-20 border-b border-slate-800/80 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Slide Counter / Section Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs text-cyan-300 shadow-sm shadow-cyan-950">
            <span className="font-mono font-bold text-cyan-400">Section 01</span>
            <span className="text-slate-600">/</span>
            <span className="uppercase tracking-wider font-semibold">Introduction</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Slide 1 of 6 • College Presentation
          </span>
        </div>

        {/* Main Title Heading */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
            Phishing URL Analysis{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Using Python
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 font-medium">
            Rule-Based Structural Heuristics & Explainable Cybersecurity Analysis
          </p>
        </div>

        {/* Presentation Speech Card - Verbatim as requested */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0a1020] border border-cyan-500/30 p-6 sm:p-9 shadow-2xl relative mb-10">
          <div className="flex items-center space-x-2 mb-4 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Speaker Notes & Presentation Speech</span>
          </div>

          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-xl sm:text-2xl font-semibold text-white">
              "Good morning everyone!
            </p>

            <p>
              Today, I'm going to talk about <strong className="text-cyan-300">Phishing URL Analysis Using Python</strong>.
            </p>

            <p className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-cyan-400 text-slate-200 italic my-2">
              Let me start with a simple question. Have you ever received a link claiming that your bank account needs verification, or that you've won a prize? Have you ever wondered whether that link is genuine or a scam?
            </p>

            <p>
              These are common techniques used in phishing attacks. Attackers create misleading links to trick people into visiting fake websites and revealing sensitive information, such as passwords and banking details.
            </p>

            <p className="text-cyan-200 font-medium pt-1">
              So, how can we identify suspicious URLs before trusting them? That's what my topic is about."
            </p>
          </div>
        </div>

        {/* Contextual Teaser Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">The Threat</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Deceptive links impersonate trusted banks, social networks, and email providers.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">The Goal</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Identify syntactic and structural anomalies before the user clicks or submits credentials.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-800 text-blue-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">The Approach</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                100% offline rule-based heuristics using Python's standard library modules.
              </p>
            </div>
          </div>
        </div>

        {/* Next Section Slide Transition Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-medium text-xs sm:text-sm hover:border-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-950/50 group"
          >
            <span>Next: What is Phishing URL Analysis?</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
