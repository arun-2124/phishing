import React, { useState } from 'react';
import { ArrowDown, CornerDownRight, ShieldAlert, Sparkles, Terminal, Activity, Eye } from 'lucide-react';

export default function Section1_Introduction() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const scrollToNext = () => {
    const el = document.getElementById('sec-what-is-analysis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="sec-intro"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-32 pb-24 px-4 sm:px-8 bg-[#08080c] bg-noise overflow-hidden border-b border-white/10 flex flex-col justify-between"
    >
      {/* Background Chromatic Flares (Fiddle style) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#2563eb]/20 via-[#ccff00]/10 to-[#ff2a5f]/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ccff00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Lab Header Meta Stamp */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10 font-mono text-xs text-white/50 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="text-[#ccff00] font-bold">●</span>
            <span className="text-white font-bold">PhishGuard — URL Intelligence Lab</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>RFC 3986 SPECIFICATION</span>
            <span className="hidden sm:inline">ZERO-DAY SYNTACTIC HEURISTICS</span>
            <span className="text-[#ccff00]">EXP. 2026 // v2.0</span>
          </div>
        </div>

        {/* Hero Title Section with Massive Expressive Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-8">
            <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-[#ccff00] font-mono text-xs uppercase tracking-widest mb-6">
              [ RESEARCH DISCLOSURE // 01 ]
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8 select-none">
              Phishing is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f4f4f0] to-white/40">
                hiding in
              </span>{' '}
              <br />
              <span className="text-[#ccff00] italic font-serif tracking-normal">
                plain sight.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white/70 max-w-2xl leading-relaxed tracking-tight">
              Every URL tells a story. Learn to read the signals.
            </p>
          </div>

          {/* Interactive 3D Abstract URL Kinetic Sculpture */}
          <div className="lg:col-span-4 flex justify-center perspective-sculpture">
            <div
              className="relative w-72 h-72 sm:w-88 sm:h-88 preserve-3d transition-transform duration-300 ease-out"
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
              }}
            >
              {/* Outer Orbiting 3D Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ccff00]/40 animate-spin-sculpture pointer-events-none" />

              {/* Inner Reverse Ring */}
              <div
                className="absolute inset-6 rounded-full border border-white/20 animate-spin-sculpture pointer-events-none"
                style={{ animationDirection: 'reverse', animationDuration: '15s' }}
              />

              {/* Central Core Card */}
              <div className="absolute inset-12 rounded-3xl bg-[#0f0f15]/90 border border-white/20 backdrop-blur-xl p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
                  <span>URL_DECOMPOSER</span>
                  <span className="text-[#ccff00]">urllib.parse</span>
                </div>

                <div className="font-mono text-sm sm:text-base font-black text-white break-all leading-tight">
                  <span className="text-[#06b6d4]">https</span>://<br />
                  <span className="text-[#ff2a5f] bg-[#ff2a5f]/10 px-1 rounded">192.0.2.10</span>:<br />
                  <span className="text-[#ccff00]">8080</span>/<br />
                  <span className="text-white/60">login?v=1</span>
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-white/50 pt-2 border-t border-white/10">
                  <span className="text-[#ff2a5f] font-bold">STRUCTURAL ANOMALY</span>
                  <span className="text-[#ccff00]">SCORE: 80</span>
                </div>
              </div>

              {/* Floating Orbiting Data Chips */}
              <div className="absolute -top-3 -right-3 rounded-full bg-[#ccff00] text-black font-mono font-black text-[10px] px-3 py-1 uppercase shadow-[0_0_15px_#ccff00] animate-float-rune">
                IPv4 LITERAL
              </div>

              <div
                className="absolute -bottom-4 -left-2 rounded-full bg-[#ff2a5f] text-white font-mono font-bold text-[10px] px-3 py-1 uppercase shadow-[0_0_15px_#ff2a5f] animate-float-rune"
                style={{ animationDelay: '2s' }}
              >
                UNENCRYPTED
              </div>

              <div
                className="absolute top-1/2 -left-8 rounded-full bg-white/10 border border-white/30 text-white font-mono text-[9px] px-2.5 py-1 backdrop-blur-md animate-float-rune"
                style={{ animationDelay: '4s' }}
              >
                AIR-GAPPED
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Presentation Text (Naturally integrated editorial speech without any speaker labels!) */}
        <div className="rounded-3xl bg-[#0c0c12] border border-white/15 p-8 sm:p-14 mb-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ccff00]/10 to-transparent pointer-events-none rounded-full blur-3xl" />

          <div className="max-w-4xl space-y-6 text-white text-lg sm:text-2xl leading-relaxed font-light">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Good morning everyone!
            </p>

            <p className="text-white font-normal">
              Today, I'm going to talk about{' '}
              <strong className="text-[#ccff00] font-black underline decoration-2 underline-offset-8">
                Phishing URL Analysis Using Python
              </strong>
              .
            </p>

            <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/10 text-white/90 text-xl sm:text-2xl italic font-serif leading-relaxed">
              "Let me start with a simple question. Have you ever received a link claiming that your bank account needs verification, or that you've won a prize? Have you ever wondered whether that link is genuine or a scam?"
            </div>

            <p className="text-white/80">
              These are common techniques used in phishing attacks. Attackers create misleading links to trick people into visiting fake websites and revealing sensitive information, such as passwords and banking details.
            </p>

            <p className="text-white font-semibold text-xl sm:text-2xl pt-2">
              So, how can we identify suspicious URLs before trusting them? That's what my topic is about.
            </p>
          </div>
        </div>

        {/* "Explore the experiment" Primary Interaction */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10 font-mono text-sm">
          <button
            onClick={scrollToNext}
            className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-[#ccff00] hover:bg-white text-black font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(204,255,0,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore the experiment</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="flex items-center space-x-6 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-[#ccff00]" />
              SCROLL FOR SYSTEMATIC DECONSTRUCTION
            </span>
            <span>STAGE 01 / 06</span>
          </div>
        </div>
      </div>
    </section>
  );
}
