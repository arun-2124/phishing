import React from 'react';
import {
  Code2,
  Server,
  Ruler,
  Layers,
  Gauge,
  HelpCircle,
  ShieldCheck,
  EyeOff,
  TerminalSquare
} from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      title: 'Python URL Parsing',
      description:
        'Uses standard library urllib.parse.urlsplit for robust, standard-compliant decomposition without external parser dependencies.',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      tag: 'urllib.parse',
    },
    {
      title: 'IP Address Detection',
      description:
        'Leverages Python ipaddress to reliably identify raw IPv4 and bracketed IPv6 literals used to evade domain-based reputation blocks.',
      icon: <Server className="w-5 h-5 text-blue-400" />,
      tag: 'ipaddress module',
    },
    {
      title: 'URL Length Analysis',
      description:
        'Detects unusually long URL strings and bloated path segments often used in credential harvesting to conceal the target apex domain.',
      icon: <Ruler className="w-5 h-5 text-indigo-400" />,
      tag: 'Length bounds',
    },
    {
      title: 'Subdomain & Hostname Checks',
      description:
        'Evaluates deep domain nesting, brand mimicry patterns in subdomains, and excessive hyphen concatenation designed to simulate trust.',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      tag: 'Hierarchy audit',
    },
    {
      title: 'Weighted Risk Scoring',
      description:
        'Calculates a balanced 0 to 100 risk score where strong structural anomalies carry more weight than simple path keywords.',
      icon: <Gauge className="w-5 h-5 text-amber-400" />,
      tag: '0 - 100 scale',
    },
    {
      title: 'Explainable Findings',
      description:
        'Every score point is accompanied by a plain-English explanation of why the detected pattern is flagged in cybersecurity practice.',
      icon: <HelpCircle className="w-5 h-5 text-emerald-400" />,
      tag: 'Transparency',
    },
    {
      title: 'Zero External Requests',
      description:
        'Analyzes URLs in complete network isolation. The server never connects, pings, crawls, or opens the submitted target address.',
      icon: <EyeOff className="w-5 h-5 text-rose-400" />,
      tag: 'Air-gapped safe',
    },
    {
      title: 'RFC-Safe Normalization',
      description:
        'Safely strips whitespace, handles case-insensitive hostnames, trailing FQDN dots, and rejects unsupported protocol schemes.',
      icon: <TerminalSquare className="w-5 h-5 text-teal-400" />,
      tag: 'Sanitization',
    },
  ];

  return (
    <section id="features" className="py-16 relative border-t border-slate-800/80 bg-[#070b16]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800 text-[11px] font-mono uppercase text-blue-300 font-semibold mb-3">
            <span>Detection Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Security Inspection Features
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            Engineered around Python standard library modules for verifiable, transparent URL heuristics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuresList.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
