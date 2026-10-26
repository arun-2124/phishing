import React from 'react';
import { Mic, ArrowDown, Code2, CheckCircle2, Terminal } from 'lucide-react';

export default function Section3_WhyPython() {
  const scrollToNext = () => {
    const el = document.getElementById('sec-how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const codeSnippet = `# Standard Library URL Decomposition in Python
from urllib.parse import urlsplit
import ipaddress

raw_url = "https://login.example.com/account/verify?token=123"

# 1. Parse URL safely without external network calls
split = urlsplit(raw_url)

scheme   = split.scheme    # 'https'
netloc   = split.netloc    # 'login.example.com'
hostname = split.hostname  # 'login.example.com'
path     = split.path      # '/account/verify'
query    = split.query     # 'token=123'
port     = split.port      # None (defaults to 443 for HTTPS)

# 2. Check if hostname is an IPv4 or IPv6 literal
try:
    ip_obj = ipaddress.ip_address(hostname)
    is_ip = True  # High-risk indicator
except ValueError:
    is_ip = False # Standard domain name`;

  return (
    <section id="sec-why-python" className="py-20 border-b border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide Counter / Section Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-xs text-indigo-300">
            <span className="font-mono font-bold text-indigo-400">Section 03</span>
            <span className="text-slate-600">/</span>
            <span className="uppercase tracking-wider font-semibold">Technical Rationale</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Slide 3 of 6 • College Presentation
          </span>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Python?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Leveraging Python's native standard library for robust, standard-compliant URL inspection.
          </p>
        </div>

        {/* Presentation Speech Card - Verbatim */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0a1020] border border-indigo-500/30 p-6 sm:p-8 shadow-xl mb-10">
          <div className="flex items-center space-x-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
            <Mic className="w-4 h-4 text-indigo-400" />
            <span>Speaker Notes & Presentation Speech</span>
          </div>

          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-xl font-semibold text-white">
              "I chose Python because it provides simple tools for analysing URLs.
            </p>

            <p>
              One important library is <strong className="text-cyan-300 font-mono text-base">urllib.parse</strong>. It allows us to split a URL into different components, such as its scheme, hostname, path and query parameters.
            </p>

            <p className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-indigo-400 text-slate-200 font-medium">
              Python helps us examine each component separately instead of treating the entire URL as one string."
            </p>
          </div>
        </div>

        {/* Python Implementation Code Block */}
        <div className="rounded-2xl bg-[#070d19] border border-slate-800 shadow-2xl overflow-hidden mb-10">
          <div className="px-5 py-3 bg-[#0a1222] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">backend/detector.py snippet</span>
            </div>
            <span className="text-xs font-mono text-cyan-400">Python 3.14 Standard Library</span>
          </div>

          <div className="p-5 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#060a14]">
            <pre className="text-slate-200">
              <code>{codeSnippet}</code>
            </pre>
          </div>

          {/* Component Breakdown Table */}
          <div className="px-5 py-4 bg-[#0a1222]/80 border-t border-slate-800 text-xs">
            <div className="font-semibold text-slate-300 mb-2 uppercase tracking-wider text-[11px]">
              Why Component Separation Matters in Phishing Detection:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-400">
              <div>
                <strong className="text-cyan-300 font-mono">split.scheme:</strong> Ensures transport is encrypted (HTTPS) and catches non-web vectors (e.g. data:, javascript:).
              </div>
              <div>
                <strong className="text-blue-300 font-mono">split.hostname:</strong> Isolates the true server target, preventing attackers from disguising domains in the path or query.
              </div>
              <div>
                <strong className="text-amber-300 font-mono">split.query:</strong> Unpacks parameters to detect open redirects and credential harvesting tokens safely.
              </div>
            </div>
          </div>
        </div>

        {/* Next Section Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/40 text-indigo-300 font-medium text-xs sm:text-sm hover:border-indigo-400 transition-all cursor-pointer shadow-lg shadow-indigo-950/50 group"
          >
            <span>Next: How Does Our Detector Work?</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
