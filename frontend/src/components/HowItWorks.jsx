import React from 'react';
import { FormInput, Split, Cpu, Award, LayoutDashboard, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Input URL',
      subtitle: 'Target Entry',
      description: 'The user enters a raw web address into the inspection console without sending any web traffic.',
      icon: <FormInput className="w-5 h-5 text-cyan-400" />,
      detail: 'Validates scheme (http/https), trims whitespace, verifies standard character bounds.',
    },
    {
      step: '02',
      title: 'Parse URL',
      subtitle: 'urllib.parse.urlsplit',
      description: 'RFC-compliant decomposition divides the target into scheme, netloc, hostname, path, and query strings.',
      icon: <Split className="w-5 h-5 text-blue-400" />,
      detail: 'Separates authority credentials from host and isolates parameters safely.',
    },
    {
      step: '03',
      title: 'Extract Features',
      subtitle: 'Syntactic Profiling',
      description: 'Extracts critical structural parameters: length, IP literals, subdomain depth, and port anomalies.',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      detail: 'Uses Python ipaddress module to distinguish IPv4/IPv6 from true DNS names.',
    },
    {
      step: '04',
      title: 'Apply Rules',
      subtitle: 'Weighted Scoring',
      description: 'Over 13 weighted heuristic rules evaluate risk contributions for each suspicious characteristic.',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      detail: 'Caps points between 0-100 and prevents duplicate penalty stacking.',
    },
    {
      step: '05',
      title: 'Display Results',
      subtitle: 'Transparent Verdict',
      description: 'Outputs a clear estimated risk tier (LOW, MEDIUM, HIGH) with full plain-English explanations.',
      icon: <LayoutDashboard className="w-5 h-5 text-emerald-400" />,
      detail: 'Provides actionable safety recommendations and complete feature transparency.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 relative border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-[11px] font-mono uppercase text-cyan-300 font-semibold mb-3">
            <span>Execution Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            From raw input string to explainable cybersecurity risk assessment in under 5 milliseconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-cyan-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                    {item.icon}
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
