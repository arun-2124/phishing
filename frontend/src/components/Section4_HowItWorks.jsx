import React, { useState } from 'react';
import {
  Mic,
  ArrowDown,
  FormInput,
  Split,
  Cpu,
  Award,
  LayoutDashboard,
  ShieldAlert,
  Sliders,
  CheckCircle2
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
      summary: 'Accepts arbitrary HTTP/HTTPS URL strings',
      description: 'The user submits any web address to the analyzer. The system validates the scheme, trims whitespace, and ensures safe length bounds without making any network requests.',
      icon: <FormInput className="w-5 h-5 text-cyan-400" />,
      tag: 'Step 1: Input Validation',
    },
    {
      num: '2',
      title: 'URL Parsing',
      summary: 'Standard library urllib.parse.urlsplit',
      description: 'The URL string is split into RFC-compliant components: scheme, netloc, hostname, port, path, and query string. This isolates parameters from the true destination host.',
      icon: <Split className="w-5 h-5 text-blue-400" />,
      tag: 'Step 2: Component Separation',
    },
    {
      num: '3',
      title: 'Feature Extraction',
      summary: 'Structural, syntactic & protocol signals',
      description: 'Features extracted: total length, raw IP literal detection (via Python ipaddress), subdomain count, userinfo disguise presence, non-standard ports, and percent-encoding counts.',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      tag: 'Step 3: Signal Profiling',
    },
    {
      num: '4',
      title: 'Rule-Based Scoring',
      summary: 'Weighted, transparent heuristic evaluation',
      description: 'Predefined rules evaluate each extracted feature. Strong indicators (like IP hostnames) add large point penalties, while weak indicators (like path keywords) add small contributions. Scores are clamped between 0 and 100.',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      tag: 'Step 4: Heuristic Calculation',
    },
    {
      num: '5',
      title: 'Explainable Results',
      summary: 'Risk tier, reasons & safety guidance',
      description: 'The final score maps into LOW RISK (0-29), MEDIUM RISK (30-64), or HIGH RISK (65-100). Every triggered rule shows its plain-English explanation, and passed checks verify what was inspected.',
      icon: <LayoutDashboard className="w-5 h-5 text-emerald-400" />,
      tag: 'Step 5: Output & Explanation',
    },
  ];

  const ruleExamples = [
    { name: 'Raw IP Hostname', weight: '+40 pts', severity: 'High', reason: 'Attackers use raw IP addresses to bypass domain reputation services.' },
    { name: 'Userinfo Disguise (@)', weight: '+35 pts', severity: 'High', reason: 'Prefixes fake brand before @ to trick users on the destination host.' },
    { name: 'Brand Mimicry', weight: '+30 pts', severity: 'High', reason: 'Targets brand names in subdomains of a different apex domain.' },
    { name: 'Unencrypted HTTP', weight: '+15 pts', severity: 'Medium', reason: 'Plaintext transport lacks encryption for credentials.' },
    { name: 'Excessive Subdomains', weight: '+15 pts', severity: 'Medium', reason: 'Deep nesting (4+ labels) conceals the true root domain.' },
    { name: 'Non-Standard Port', weight: '+15 pts', severity: 'Medium', reason: 'Custom ports (e.g. 8080) frequently host ad-hoc or evasive rigs.' },
  ];

  return (
    <section id="sec-how-it-works" className="py-20 border-b border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide Counter / Section Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-xs text-amber-300">
            <span className="font-mono font-bold text-amber-400">Section 04</span>
            <span className="text-slate-600">/</span>
            <span className="uppercase tracking-wider font-semibold">Algorithm & Methodology</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Slide 4 of 6 • College Presentation
          </span>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Does Our Detector Work?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            A 5-step explainable pipeline that maps URL characteristics to weighted risk points.
          </p>
        </div>

        {/* Presentation Speech Card - Verbatim */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0a1020] border border-amber-500/30 p-6 sm:p-8 shadow-xl mb-10">
          <div className="flex items-center space-x-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
            <Mic className="w-4 h-4 text-amber-400" />
            <span>Speaker Notes & Presentation Speech</span>
          </div>

          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-xl font-semibold text-white">
              "Our project follows three main steps.
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

            <p className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-amber-400 text-slate-200 font-medium">
              This makes our system easier to understand because it explains why a URL received its score."
            </p>
          </div>
        </div>

        {/* Interactive 5-Step Pipeline Buttons */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Interactive 5-Step Analysis Pipeline</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
            {steps.map((st, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-slate-800/90 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-500">0{st.num}</span>
                  <div className="p-1 rounded bg-slate-950">{st.icon}</div>
                </div>
                <div className="text-xs font-bold text-white truncate">{st.title}</div>
              </button>
            ))}
          </div>

          {/* Active Step Detail Banner */}
          <div className="p-5 rounded-2xl bg-[#091122] border border-cyan-500/30">
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 mb-1">
              <span>{steps[activeStep].tag}</span>
            </div>
            <h4 className="text-base font-bold text-white mb-2">{steps[activeStep].title} — {steps[activeStep].summary}</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{steps[activeStep].description}</p>
          </div>
        </div>

        {/* Actual Scoring Weights Reference Table */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Transparent Rule Weights (Backend Implementation)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Max Score: 100 Points</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ruleExamples.map((r, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{r.name}</span>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {r.weight}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{r.reason}</p>
              </div>
            ))}
          </div>

          {/* Thresholds visual bar */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-emerald-400">🟢 0 - 29: LOW RISK (Standard Patterns)</span>
            <span className="text-amber-400">🟡 30 - 64: MEDIUM RISK (Moderate Anomalies)</span>
            <span className="text-rose-400">🔴 65 - 100: HIGH RISK (Critical Red Flags)</span>
          </div>
        </div>

        {/* Next Section Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/60 transition-all cursor-pointer group"
          >
            <span>Proceed to Live Demonstration</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
