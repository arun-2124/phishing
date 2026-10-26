import React from 'react';
import { ArrowDown, Code2, Terminal, Cpu, CheckCircle2, Copy } from 'lucide-react';

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-indigo-500/30 text-xs text-indigo-300 mb-4">
            <span className="font-mono font-bold text-indigo-400">03</span>
            <span className="text-slate-600">•</span>
            <span className="uppercase tracking-wider font-semibold">Technical Foundation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Why Python?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Harnessing the power and clarity of Python's standard library for URL introspection.
          </p>
        </div>

        {/* Editorial Presentation Content Panel (No Speaker Notes label!) */}
        <div className="rounded-3xl glass-panel border border-indigo-500/30 p-8 sm:p-12 shadow-2xl mb-12">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-200 text-lg sm:text-xl leading-relaxed">
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
              I chose Python because it provides simple tools for analysing URLs.
            </p>

            <p>
              One important library is <strong className="text-cyan-300 font-mono font-bold">urllib.parse</strong>. It allows us to split a URL into different components, such as its scheme, hostname, path and query parameters.
            </p>

            <div className="p-6 rounded-2xl bg-[#091024]/90 border border-indigo-500/30 text-indigo-100 font-medium text-base sm:text-lg leading-relaxed shadow-inner">
              "Python helps us examine each component separately instead of treating the entire URL as one string."
            </div>
          </div>
        </div>

        {/* 3D Elevated Code Canvas */}
        <div className="perspective-1000 mb-12">
          <div className="rounded-3xl glass-panel-3d border border-slate-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Terminal Window Chrome */}
            <div className="px-6 py-4 bg-[#060b18] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80 shadow-sm shadow-rose-900" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 shadow-sm shadow-amber-900" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-sm shadow-emerald-900" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 ml-3">
                  backend/detector.py — Core Decomposition Logic
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>Python 3.14 Standard Library</span>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 sm:p-8 bg-[#040713] overflow-x-auto font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
              <pre className="text-slate-200">
                <code>{codeSnippet}</code>
              </pre>
            </div>

            {/* 3D Glass Footnotes */}
            <div className="px-6 py-5 bg-[#070d1e] border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-cyan-300 font-mono block mb-1">split.scheme:</strong>
                <span className="text-slate-400 leading-relaxed">
                  Checks transport encryption (HTTPS) and catches malicious non-HTTP vectors like javascript: or data:
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-blue-300 font-mono block mb-1">split.hostname:</strong>
                <span className="text-slate-400 leading-relaxed">
                  Isolates destination host to evaluate raw IP usage and prevent query string confusion.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-indigo-300 font-mono block mb-1">split.query:</strong>
                <span className="text-slate-400 leading-relaxed">
                  Unpacks parameters to uncover Open Redirect evasion and sensitive token harvesting.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Section Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-indigo-500/40 text-indigo-300 font-semibold text-sm hover:border-indigo-300 transition-all cursor-pointer shadow-lg shadow-indigo-950/60 group hover:scale-105"
          >
            <span>Next: How Does Our Detector Work?</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
