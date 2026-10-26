import React from 'react';
import { Mic, AlertTriangle, CheckCircle2, ShieldCheck, Heart, ArrowUp, GraduationCap } from 'lucide-react';

export default function Section6_Conclusion() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="sec-conclusion" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide Counter / Section Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300">
            <span className="font-mono font-bold text-emerald-400">Section 06</span>
            <span className="text-slate-600">/</span>
            <span className="uppercase tracking-wider font-semibold">Summary & Takeaways</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Slide 6 of 6 • College Presentation
          </span>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Limitations and Conclusion
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Reflecting on rule-based heuristics, security limitations, and educational value.
          </p>
        </div>

        {/* Presentation Speech Card - Verbatim */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0a1020] border border-emerald-500/30 p-6 sm:p-8 shadow-xl mb-10">
          <div className="flex items-center space-x-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            <Mic className="w-4 h-4 text-emerald-400" />
            <span>Speaker Notes & Presentation Speech</span>
          </div>

          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            <p className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-amber-400 text-slate-200 font-medium">
              "Also, this is a rule-based system, so it can produce false positives and miss sophisticated phishing links. A real security solution would need additional checks.
            </p>

            <p>
              To conclude, phishing URL analysis is a simple but useful way to introduce cybersecurity using Python.
            </p>

            <p>
              Through this project, we learn URL parsing, feature extraction, conditional statements and rule-based risk scoring.
            </p>

            <p className="text-xl sm:text-2xl font-bold text-cyan-300 pt-2">
              Most importantly, we learn that cybersecurity is not only about detecting threats but also about understanding the warning signs behind them.
            </p>

            <p className="text-2xl font-black text-white pt-2">
              Thank you!"
            </p>
          </div>
        </div>

        {/* Limitations Panel */}
        <div className="rounded-2xl bg-[#120f18] border border-amber-900/50 p-6 sm:p-8 shadow-xl mb-10">
          <div className="flex items-start space-x-3.5 mb-4">
            <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-300 uppercase font-mono tracking-wider">
                System Boundaries & Limitations
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Critical design considerations to discuss during Q&A:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <strong className="text-white block mb-1">1. Does Not Inspect Website Content:</strong>
              The application intentionally never visits or fetches remote HTML, DOM trees, forms, or JavaScript payloads to preserve safety.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <strong className="text-white block mb-1">2. Does Not Check Domain Reputation:</strong>
              No external API queries (Google Safe Browsing, VirusTotal, WHOIS age) are made; analysis is strictly offline syntax evaluation.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <strong className="text-white block mb-1">3. Does Not Guarantee Phishing Detection:</strong>
              Attackers using legitimate cloud hosts (e.g. Firebase, AWS S3) or compromised reputable domains can bypass static rule thresholds.
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <strong className="text-white block mb-1">4. Illustrative Scoring Rules:</strong>
              The 0-100 risk score is an explainable heuristic index, not an empirically calibrated Bayesian probability.
            </div>
          </div>
        </div>

        {/* Clean Presentation Closing Card */}
        <div className="rounded-2xl bg-gradient-to-tr from-[#09152b] via-[#0c1a35] to-[#0a1224] border border-cyan-500/40 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-800 text-cyan-400 mb-4 shadow-lg shadow-cyan-950">
            <GraduationCap className="w-8 h-8" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Thank You!
          </h3>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
            PhishGuard demonstrates that transparent, explainable Python code can illuminate the deceptive mechanics of cyber threats.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer group"
            >
              <span>Return to Title Slide</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
