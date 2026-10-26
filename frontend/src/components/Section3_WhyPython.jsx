import React from 'react';
import { ArrowDown, Code2, Terminal, Cpu, FileCode2, Check } from 'lucide-react';

export default function Section3_WhyPython() {
  const scrollToNext = () => {
    const el = document.getElementById('sec-how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const codeSnippet = `# Standard Library URL Introspection in Python
from urllib.parse import urlsplit
import ipaddress

target = "https://login.example.com/account/verify?token=123"

# 1. Deterministic RFC-3986 component separation
split = urlsplit(target)

scheme   = split.scheme    # 'https'
netloc   = split.netloc    # 'login.example.com'
hostname = split.hostname  # 'login.example.com'
path     = split.path      # '/account/verify'
query    = split.query     # 'token=123'
port     = split.port      # None (defaults to 443 for HTTPS)

# 2. Air-gapped IP address evaluation
try:
    ip_obj = ipaddress.ip_address(hostname)
    is_ip = True  # Red Flag: Raw IP host evades domain reputation
except ValueError:
    is_ip = False # Standard domain label`;

  return (
    <section id="sec-why-python" className="py-28 px-4 sm:px-8 bg-[#08080d] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs text-white/50 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="text-[#3b82f6]">03</span>
            <span>// TECHNICAL TOOLING</span>
          </div>
          <span className="text-white/30">STANDARD LIBRARY INTROSPECTION</span>
        </div>

        {/* Monumental Section Title */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
            Why <span className="text-[#3b82f6] font-serif italic tracking-normal">Python?</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl font-light">
            Why the standard library’s <code className="text-[#ccff00] font-mono">urllib.parse</code> and <code className="text-[#ccff00] font-mono">ipaddress</code> modules provide the ideal sandbox for structural security analysis.
          </p>
        </div>

        {/* Presentation Speech Text Panel (Editorial format, no speaker notes label) */}
        <div className="rounded-3xl bg-[#0f0f18] border border-white/15 p-8 sm:p-14 mb-16 shadow-2xl">
          <div className="max-w-4xl space-y-6 text-white text-lg sm:text-2xl leading-relaxed font-light">
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              I chose Python because it provides simple tools for analysing URLs.
            </p>

            <p className="text-white/80">
              One important library is <strong className="text-[#3b82f6] font-mono font-bold">urllib.parse</strong>. It allows us to split a URL into different components, such as its scheme, hostname, path and query parameters.
            </p>

            <div className="p-6 rounded-2xl bg-black/80 border-l-4 border-[#3b82f6] text-white text-xl italic font-serif leading-relaxed">
              "Python helps us examine each component separately instead of treating the entire URL as one string."
            </div>
          </div>
        </div>

        {/* Technical Editorial Code Canvas */}
        <div className="rounded-3xl bg-[#050508] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden mb-14">
          {/* Window Chrome with Monospaced Stamped Meta */}
          <div className="px-6 py-4 bg-[#0d0d14] border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-[0_0_10px_#3b82f6]" />
              <span className="text-white font-bold">backend/detector.py</span>
            </div>
            <div className="flex items-center space-x-4 text-white/50 text-[11px]">
              <span>MODULE: URLLIB.PARSE</span>
              <span className="text-[#ccff00]">ZERO NETWORK LATENCY</span>
            </div>
          </div>

          {/* Syntax Highlighted Code Box */}
          <div className="p-6 sm:p-10 font-mono text-xs sm:text-sm text-white/90 leading-relaxed overflow-x-auto bg-[#030306]">
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>

          {/* Component Annotation Grid */}
          <div className="px-6 sm:px-10 py-8 bg-[#090910] border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <div className="text-[#06b6d4] font-bold uppercase mb-1">01. SCHEME SEGREGATION</div>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Verifies encryption mode and blocks hostile protocol injection (e.g. data:, javascript:, file:).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <div className="text-[#ccff00] font-bold uppercase mb-1">02. HOSTNAME PURIFICATION</div>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Isolates destination host to prevent attackers from masking fraudulent domains in parameters or paths.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <div className="text-[#ff2a5f] font-bold uppercase mb-1">03. IP DETECTION</div>
              <p className="text-white/60 leading-relaxed font-sans text-xs">
                Differentiates raw IPv4/IPv6 literals from genuine domain names to flag reputation evasion.
              </p>
            </div>
          </div>
        </div>

        {/* Transition to Next Stage */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-sm">
          <button
            onClick={scrollToNext}
            className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-white hover:bg-[#3b82f6] hover:text-white text-black font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Next: How Our Detector Works</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <span className="text-xs text-white/40 font-mono hidden sm:inline">STAGE 03 / 06</span>
        </div>
      </div>
    </section>
  );
}
