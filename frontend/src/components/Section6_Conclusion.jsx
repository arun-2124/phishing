import React from 'react';
import { AlertTriangle, ShieldCheck, ArrowUp, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Section6_Conclusion() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="sec-conclusion" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-emerald-500/30 text-xs text-emerald-300 mb-4">
            <span className="font-mono font-bold text-emerald-400">06</span>
            <span className="text-slate-600">•</span>
            <span className="uppercase tracking-wider font-semibold">Summary & Closing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Limitations and Conclusion
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Synthesizing educational takeaways, structural limitations, and cybersecurity mindset.
          </p>
        </div>

        {/* Editorial Presentation Content Panel (No Speaker Notes label!) */}
        <div className="rounded-3xl glass-panel border border-emerald-500/30 p-8 sm:p-12 shadow-2xl mb-12">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-200 text-lg sm:text-xl leading-relaxed">
            <div className="p-6 rounded-2xl bg-[#091524]/90 border border-emerald-500/30 text-emerald-100 font-medium text-base sm:text-lg leading-relaxed shadow-inner">
              "Also, this is a rule-based system, so it can produce false positives and miss sophisticated phishing links. A real security solution would need additional checks."
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
              To conclude, phishing URL analysis is a simple but useful way to introduce cybersecurity using Python.
            </p>

            <p>
              Through this project, we learn URL parsing, feature extraction, conditional statements and rule-based risk scoring.
            </p>

            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight pt-2">
              Most importantly, we learn that cybersecurity is not only about detecting threats but also about understanding the warning signs behind them.
            </p>

            <p className="text-3xl sm:text-4xl font-black text-white pt-2">
              Thank you!
            </p>
          </div>
        </div>

        {/* 3D Limitations Matrix */}
        <div className="rounded-3xl glass-panel-3d border border-slate-700/80 p-8 sm:p-12 shadow-2xl mb-12">
          <div className="flex items-start space-x-3.5 mb-6 pb-4 border-b border-slate-800">
            <div className="p-2.5 rounded-2xl bg-amber-950/80 border border-amber-800 text-amber-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-300 uppercase font-mono tracking-wider">
                System Boundaries & Real-World Considerations
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Critical nuances to address during question-and-answer discussions:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-[#060b18] border border-slate-800">
              <strong className="text-white block mb-1 text-sm font-bold">1. Does Not Inspect Website Content:</strong>
              The system analyzes the URL string in isolation and never executes or renders target HTML, DOM trees, forms, or JavaScript payloads to preserve safety.
            </div>

            <div className="p-4 rounded-2xl bg-[#060b18] border border-slate-800">
              <strong className="text-white block mb-1 text-sm font-bold">2. Does Not Check Domain Reputation:</strong>
              No external queries (Google Safe Browsing, VirusTotal, WHOIS age) are made; the analysis is strictly local syntax evaluation.
            </div>

            <div className="p-4 rounded-2xl bg-[#060b18] border border-slate-800">
              <strong className="text-white block mb-1 text-sm font-bold">3. Does Not Guarantee Phishing Detection:</strong>
              Attackers using legitimate cloud hosts (e.g. Firebase, AWS S3) or compromised reputable domains can bypass static rule thresholds.
            </div>

            <div className="p-4 rounded-2xl bg-[#060b18] border border-slate-800">
              <strong className="text-white block mb-1 text-sm font-bold">4. Illustrative Scoring Rules:</strong>
              The 0-100 score is a deterministic, explainable heuristic index, not an empirically calibrated statistical probability of maliciousness.
            </div>
          </div>
        </div>

        {/* 3D Visual "Thank You" Presentation Closing Stage */}
        <div className="rounded-3xl glass-panel-3d border border-cyan-500/40 p-10 sm:p-16 text-center shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="inline-flex p-4 rounded-3xl bg-cyan-950/80 border border-cyan-700 text-cyan-300 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-float-slow">
            <GraduationCap className="w-10 h-10" />
          </div>

          <h3 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight">
            Thank You!
          </h3>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-light">
            PhishGuard demonstrates that transparent, explainable Python code can illuminate the deceptive mechanics of cyber threats.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-7 py-3.5 rounded-2xl glass-panel hover:bg-white/10 border border-slate-700 text-slate-200 text-sm font-bold transition-all hover:scale-105 cursor-pointer shadow-lg group"
            >
              <span>Return to Title Slide</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
