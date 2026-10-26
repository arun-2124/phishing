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
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Section4_HowItWorks() {
  const [activeStep, setActiveStep] = useState(3);

  const scrollToNext = () => {
    const el = document.getElementById('sec-live-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      num: '1',
      title: 'URL Input',
      summary: 'Arbitrary HTTP/HTTPS string entry',
      description: 'The user enters any web address into the inspection console. The system trims whitespace, enforces max character limits, and verifies scheme formatting without making any external calls.',
      icon: <FormInput className="w-5 h-5 text-cyan-400" />,
      tag: 'Step 1: Input Validation',
    },
    {
      num: '2',
      title: 'URL Parsing',
      summary: 'Deconstruct with urllib.parse.urlsplit',
      description: 'Splits the URL into canonical RFC 3986 components: scheme, netloc, hostname, port, path, and query strings. Separates authority credentials from host and isolates parameters safely.',
      icon: <Split className="w-5 h-5 text-blue-400" />,
      tag: 'Step 2: Component Separation',
    },
    {
      num: '3',
      title: 'Feature Extraction',
      summary: 'Syntactic & architectural profiling',
      description: 'Extracts critical structural parameters: length, raw IP literals (via Python ipaddress), subdomain depth, userinfo disguise presence, non-standard ports, and percent-encoding counts.',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      tag: 'Step 3: Signal Profiling',
    },
    {
      num: '4',
      title: 'Rule-Based Scoring',
      summary: 'Weighted, transparent heuristic evaluation',
      description: 'Evaluates matching rules. High-impact structural red flags (such as raw IP hosts) carry heavier weight (+40 pts) than weak keyword indicators. The score is capped between 0 and 100.',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      tag: 'Step 4: Heuristic Calculation',
    },
    {
      num: '5',
      title: 'Explainable Results',
      summary: 'Risk tier, reasons & safety guidance',
      description: 'Outputs a clear estimated risk tier (LOW, MEDIUM, HIGH) with full plain-English explanations. Displays which indicators were triggered and verifies which security checks passed.',
      icon: <LayoutDashboard className="w-5 h-5 text-emerald-400" />,
      tag: 'Step 5: Output & Explanation',
    },
  ];

  const ruleExamples = [
    { name: 'Raw IP Hostname', weight: '+40 pts', severity: 'High', reason: 'Direct IP usage evades domain-level reputation and takedown systems.' },
    { name: 'Userinfo Disguise (@)', weight: '+35 pts', severity: 'High', reason: 'Embeds recognizable brand before @ to trick users on the destination host.' },
    { name: 'Brand Mimicry', weight: '+30 pts', severity: 'High', reason: 'Targets brand names in subdomains of a different apex domain.' },
    { name: 'Unencrypted HTTP', weight: '+15 pts', severity: 'Medium', reason: 'Plaintext transport lacks encryption for authentication credentials.' },
    { name: 'Excessive Subdomains', weight: '+15 pts', severity: 'Medium', reason: 'Deep nesting (4+ labels) conceals the true root domain.' },
    { name: 'Non-Standard Port', weight: '+15 pts', severity: 'Medium', reason: 'Custom ports (e.g. 8080) frequently host ad-hoc or evasive rigs.' },
  ];

  return (
    <section id="sec-how-it-works" className="py-20 border-b border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-amber-500/30 text-xs text-amber-300 mb-4">
            <span className="font-mono font-bold text-amber-400">04</span>
            <span className="text-slate-600">•</span>
            <span className="uppercase tracking-wider font-semibold">Heuristic Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Does Our Detector Work?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            A transparent 5-step pipeline that maps URL characteristics to weighted risk points.
          </p>
        </div>

        {/* Editorial Presentation Content Panel (No Speaker Notes label!) */}
        <div className="rounded-3xl glass-panel border border-amber-500/30 p-8 sm:p-12 shadow-2xl mb-12">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-200 text-lg sm:text-xl leading-relaxed">
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
              Our project follows three main steps.
            </p>

            <p>
              First, we take a URL as input.
            </p>

            <p>
              Second, we extract useful features, such as the URL's length, whether its hostname is an IP address, whether it contains suspicious subdomains, and whether it uses unusual patterns.
            </p>

            <p>
              Third, we apply a set of predefined rules.
            </p>

            <p>
              Each rule contributes to a risk score. For example, a URL containing a raw IP address might receive additional points. A URL with several suspicious characteristics may receive a higher score.
            </p>

            <p>
              Finally, the program displays the risk level along with the specific indicators that triggered the warnings.
            </p>

            <div className="p-6 rounded-2xl bg-[#14101e]/90 border border-amber-500/30 text-amber-100 font-medium text-base sm:text-lg leading-relaxed shadow-inner">
              "This makes our system easier to understand because it explains why a URL received its score."
            </div>
          </div>
        </div>

        {/* 3D Interactive 5-Step Pipeline */}
        <div className="rounded-3xl glass-panel-3d border border-slate-700/80 p-6 sm:p-10 shadow-2xl mb-12">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                Interactive 5-Step Pipeline
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click any step to reveal its execution details
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {steps.map((st, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  activeStep === idx
                    ? 'bg-gradient-to-b from-[#0f1d3a] to-[#081226] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-105'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-500">0{st.num}</span>
                  <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800">{st.icon}</div>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">{st.title}</div>
              </button>
            ))}
          </div>

          {/* Active Step Dimensional Card */}
          <div className="p-6 rounded-2xl glass-panel border border-cyan-500/40 shadow-xl">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300 mb-2">
              <span>{steps[activeStep].tag}</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              {steps[activeStep].title} — <span className="text-slate-300 font-normal">{steps[activeStep].summary}</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {steps[activeStep].description}
            </p>
          </div>
        </div>

        {/* 3D Scoring Rules Weight Matrix */}
        <div className="rounded-3xl glass-panel border border-slate-800 p-6 sm:p-10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">
                Transparent Rule Weights & Contribution Logic
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Actual heuristic weights implemented in backend/detector.py
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-cyan-300 border border-slate-700">
              Max Score: 100 Points
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ruleExamples.map((r, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#060a16]/90 border border-slate-800/90 hover:border-slate-700 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-bold text-white">{r.name}</span>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800">
                    {r.weight}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{r.reason}</p>
              </div>
            ))}
          </div>

          {/* Threshold Tier Spectrum */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-emerald-400 font-semibold">🟢 0 – 29: LOW RISK (Standard Patterns)</span>
            <span className="text-amber-400 font-semibold">🟡 30 – 64: MEDIUM RISK (Moderate Anomalies)</span>
            <span className="text-rose-400 font-semibold">🔴 65 – 100: HIGH RISK (Critical Red Flags)</span>
          </div>
        </div>

        {/* Next Section Transition Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Proceed to Live Demonstration</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
