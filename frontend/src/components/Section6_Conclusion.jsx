import React from 'react';
import { AlertTriangle, ArrowUp, Sparkles, Terminal, CornerUpLeft } from 'lucide-react';

export default function Section6_Conclusion() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="sec-conclusion" className="py-28 px-4 sm:px-8 bg-[#08080c] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs text-white/50 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="text-[#ccff00]">06</span>
            <span>// EPILOGUE & SUMMARY</span>
          </div>
          <span className="text-white/30">DISCLOSURE & CLOSING</span>
        </div>

        {/* Monumental Section Title */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
            Limitations & <br />
            <span className="text-[#ccff00] font-serif italic tracking-normal">Conclusion</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl font-light">
            Reflecting on rule-based heuristics, systemic boundaries, and the educational foundation of cybersecurity.
          </p>
        </div>

        {/* Presentation Speech Text Panel (Editorial format, no speaker notes label) */}
        <div className="rounded-3xl bg-[#0f0f18] border border-white/15 p-8 sm:p-14 mb-16 shadow-2xl">
          <div className="max-w-4xl space-y-6 text-white text-lg sm:text-2xl leading-relaxed font-light">
            <div className="p-6 sm:p-8 rounded-2xl bg-black/80 border-l-4 border-amber-400 text-white text-xl sm:text-2xl italic font-serif leading-relaxed">
              "Also, this is a rule-based system, so it can produce false positives and miss sophisticated phishing links. A real security solution would need additional checks."
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              To conclude, phishing URL analysis is a simple but useful way to introduce cybersecurity using Python.
            </p>

            <p className="text-white/80">
              Through this project, we learn URL parsing, feature extraction, conditional statements and rule-based risk scoring.
            </p>

            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#ccff00] uppercase tracking-tight pt-4 leading-tight">
              Most importantly, we learn that cybersecurity is not only about detecting threats but also about understanding the warning signs behind them.
            </p>

            <p className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter pt-4">
              Thank you!
            </p>
          </div>
        </div>

        {/* Technical Limitations Matrix */}
        <div className="rounded-3xl bg-[#06060a] border border-white/15 p-6 sm:p-12 mb-20 shadow-2xl">
          <div className="flex items-start space-x-4 mb-8 pb-4 border-b border-white/10">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500 text-amber-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-mono font-black text-white uppercase tracking-tight">
                Architectural Limitations & Threat Realities
              </h3>
              <p className="text-xs font-mono text-white/50 mt-1 uppercase">
                CRITICAL CONSIDERATIONS FOR PEER REVIEW & Q&A
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-white/80 font-light">
            <div className="p-6 rounded-2xl bg-[#0d0d14] border border-white/10">
              <span className="font-mono text-[#ccff00] text-xs font-bold uppercase block mb-2">
                01. ZERO DOM / CONTENT INSPECTION
              </span>
              <p className="leading-relaxed">
                The engine never connects to or executes remote HTML, CSS, JavaScript, or credential submission forms. This guarantees air-gapped safety on any workstation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d0d14] border border-white/10">
              <span className="font-mono text-[#06b6d4] text-xs font-bold uppercase block mb-2">
                02. NO EXTERNAL REPUTATION QUERIES
              </span>
              <p className="leading-relaxed">
                Does not poll commercial threat APIs (Google Safe Browsing, VirusTotal) or query domain WHOIS registration age. Analysis evaluates local URL syntax exclusively.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d0d14] border border-white/10">
              <span className="font-mono text-[#ff2a5f] text-xs font-bold uppercase block mb-2">
                03. SOPHISTICATED EVASION GAP
              </span>
              <p className="leading-relaxed">
                Attackers who host phishing payloads on compromised high-reputation domains or legitimate cloud containers (e.g. Firebase, AWS) can evade purely syntactic rule sets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d0d14] border border-white/10">
              <span className="font-mono text-[#a855f7] text-xs font-bold uppercase block mb-2">
                04. ILLUSTRATIVE HEURISTIC WEIGHTS
              </span>
              <p className="leading-relaxed">
                The 0-100 score is a deterministic educational index representing syntactic deviation, not an empirically calibrated statistical probability of attack certainty.
              </p>
            </div>
          </div>
        </div>

        {/* Striking Kinetic Monumental "THANK YOU" Art Piece (Fiddle Digital inspired) */}
        <div className="rounded-3xl bg-black border-2 border-white/20 p-8 sm:p-20 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2563eb]/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6">
            [ PRESENTATION // CONCLUSION ]
          </div>

          <h3 className="text-6xl sm:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter mb-6 select-none hover:text-[#ccff00] transition-colors duration-300">
            THANK YOU
          </h3>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/70 font-light leading-relaxed mb-10">
            PhishGuard — URL Intelligence Lab demonstrates that transparent, explainable Python code can illuminate the hidden mechanics of deception.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase">
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 px-8 py-4 rounded-full bg-white hover:bg-[#ccff00] text-black font-black tracking-wider transition-all shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>RETURN TO TITLE</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
