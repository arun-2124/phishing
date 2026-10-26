import React, { useState } from 'react';
import {
  ArrowDown,
  FormInput,
  Split,
  Cpu,
  Award,
  LayoutDashboard,
  Layers,
  Sliders,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function Section4_HowItWorks() {
  const [activeStage, setActiveStage] = useState(3);

  const scrollToNext = () => {
    const el = document.getElementById('sec-live-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stages = [
    {
      num: '01',
      title: 'URL INPUT',
      metric: 'String Entry',
      desc: 'Takes any arbitrary HTTP/HTTPS URL string. Validates schemes, strips whitespace, and enforces 4,096 character safety ceilings without making external network connections.',
    },
    {
      num: '02',
      title: 'URL PARSING',
      metric: 'urllib.parse.urlsplit',
      desc: 'Deconstructs the target into RFC 3986 components: scheme, netloc, hostname, port, path, and query strings. Disentangles embedded credentials and parameters from true destination servers.',
    },
    {
      num: '03',
      title: 'FEATURE EXTRACTION',
      metric: 'Syntactic Profiling',
      desc: 'Extracts 15+ architectural features: total string length, raw IPv4/IPv6 detection (via Python ipaddress), subdomain depth counts, userinfo disguise presence, and custom port mappings.',
    },
    {
      num: '04',
      title: 'RULE-BASED SCORING',
      metric: 'Weighted Math',
      desc: 'Applies predefined deterministic heuristics. Severe structural anomalies like raw IP hosts (+40) receive high point weights; weak indicators like path keywords receive minor weights. Clamped between 0 and 100.',
    },
    {
      num: '05',
      title: 'EXPLAINABLE RESULTS',
      metric: 'Full Transparency',
      desc: 'Maps the score into LOW RISK (0-29), MEDIUM RISK (30-64), or HIGH RISK (65-100). Explains the exact cybersecurity rationale for every triggered penalty and reveals all passed checks.',
    },
  ];

  const actualRules = [
    { name: 'Raw IP Hostname', weight: '+40 PTS', level: 'HIGH SEVERITY', reason: 'Direct IP bypasses domain-level reputation feeds and rapid DNS takedowns.' },
    { name: 'Userinfo Disguise (@)', weight: '+35 PTS', level: 'HIGH SEVERITY', reason: 'Prefixes recognized brand before @ to deceive victims on the true destination host.' },
    { name: 'Brand Mimicry', weight: '+30 PTS', level: 'HIGH SEVERITY', reason: 'Places target brand names in subdomains of a third-party apex domain.' },
    { name: 'Unencrypted HTTP', weight: '+15 PTS', level: 'MEDIUM SEVERITY', reason: 'Lacks cryptographic transit security for authentication credentials.' },
    { name: 'Deep Subdomain Hierarchy', weight: '+15 PTS', level: 'MEDIUM SEVERITY', reason: 'Excessive labels (4+) intentionally push the true root domain off-screen.' },
    { name: 'Non-Standard Web Port', weight: '+15 PTS', level: 'MEDIUM SEVERITY', reason: 'Custom ports (e.g. 8080, 8443) frequently host ad-hoc or evasive phishing rigs.' },
  ];

  return (
    <section id="sec-how-it-works" className="py-28 px-4 sm:px-8 bg-[#0a0a10] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs text-white/50 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="text-[#a855f7]">04</span>
            <span>// DETECTION PIPELINE</span>
          </div>
          <span className="text-white/30">DETERMINISTIC HEURISTICS</span>
        </div>

        {/* Monumental Section Title */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
            How Our <br />
            <span className="text-[#a855f7] font-serif italic tracking-normal">Detector Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl font-light">
            A deterministic 5-stage pipeline transforming raw URL syntax into explainable risk indicators.
          </p>
        </div>

        {/* Presentation Speech Text Panel (Editorial format, no speaker notes label) */}
        <div className="rounded-3xl bg-[#120f1c] border border-white/15 p-8 sm:p-14 mb-16 shadow-2xl">
          <div className="max-w-4xl space-y-6 text-white text-lg sm:text-2xl leading-relaxed font-light">
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Our project follows three main steps.
            </p>

            <p className="text-white/80">
              First, we take a URL as input.
            </p>

            <p className="text-white/80">
              Second, we extract useful features, such as the URL's length, whether its hostname is an IP address, whether it contains suspicious subdomains, and whether it uses unusual patterns.
            </p>

            <p className="text-white/80">
              Third, we apply a set of predefined rules.
            </p>

            <p className="text-white/80">
              Each rule contributes to a risk score. For example, a URL containing a raw IP address might receive additional points. A URL with several suspicious characteristics may receive a higher score.
            </p>

            <p className="text-white/80">
              Finally, the program displays the risk level along with the specific indicators that triggered the warnings.
            </p>

            <div className="p-6 rounded-2xl bg-black/80 border-l-4 border-[#a855f7] text-white text-xl italic font-serif leading-relaxed">
              "This makes our system easier to understand because it explains why a URL received its score."
            </div>
          </div>
        </div>

        {/* Dimensional Pipeline Data-Flow */}
        <div className="rounded-3xl bg-[#06060b] border border-white/20 p-6 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.9)] mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-wider text-white/50">
            <span className="text-[#a855f7] font-bold">5-STAGE DATA-FLOW VISUALIZATION</span>
            <span>CLICK TO INSPECT TRANSFORMATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
            {stages.map((st, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 font-mono cursor-pointer ${
                  activeStage === idx
                    ? 'bg-[#a855f7] text-black border-[#a855f7] shadow-[0_0_25px_rgba(168,85,247,0.5)] scale-105'
                    : 'bg-[#0f0f18] text-white border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs opacity-60">
                  <span>{st.num}</span>
                  <span>STAGE</span>
                </div>
                <div className="font-black text-sm uppercase leading-tight mb-1">{st.title}</div>
                <div className="text-[10px] opacity-75 truncate">{st.metric}</div>
              </button>
            ))}
          </div>

          {/* Active Stage Detail Panel */}
          <div className="p-8 rounded-2xl bg-[#0e0e18] border border-[#a855f7]/40 shadow-2xl">
            <div className="font-mono text-xs text-[#a855f7] font-bold uppercase tracking-widest mb-2">
              ACTIVE STAGE // {stages[activeStage].num}: {stages[activeStage].title}
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white uppercase mb-3">
              {stages[activeStage].metric}
            </h4>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light">
              {stages[activeStage].desc}
            </p>
          </div>
        </div>

        {/* Real Backend Scoring Rules Matrix */}
        <div className="rounded-3xl bg-[#0e0e16] border border-white/15 p-6 sm:p-12 mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Authentic Rule Weights
              </h3>
              <p className="text-xs font-mono text-white/50 mt-1">
                EXACT VALUES FROM BACKEND/DETECTOR.PY (MAX: 100 POINTS)
              </p>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded bg-[#a855f7]/20 border border-[#a855f7] text-[#a855f7] font-bold">
              HEURISTIC MATRIX
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {actualRules.map((rule, i) => (
              <div key={i} className="p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-[#a855f7] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white uppercase">{rule.name}</span>
                  <span className="text-[#a855f7] font-black">{rule.weight}</span>
                </div>
                <div className="text-[10px] text-white/40 uppercase mb-2">{rule.level}</div>
                <p className="text-white/70 font-sans text-xs leading-relaxed">{rule.reason}</p>
              </div>
            ))}
          </div>

          {/* Risk Classification Spectrum */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-[#ccff00]">● 00 - 29: LOW RISK (NORMAL SYNTAX)</span>
            <span className="text-amber-400">● 30 - 64: MEDIUM RISK (STRUCTURAL ANOMALIES)</span>
            <span className="text-[#ff2a5f]">● 65 - 100: HIGH RISK (CRITICAL RED FLAGS)</span>
          </div>
        </div>

        {/* Transition to Next Stage */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-sm">
          <button
            onClick={scrollToNext}
            className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-[#ccff00] hover:bg-white text-black font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Proceed to Live Analysis</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <span className="text-xs text-white/40 font-mono hidden sm:inline">STAGE 04 / 06</span>
        </div>
      </div>
    </section>
  );
}
