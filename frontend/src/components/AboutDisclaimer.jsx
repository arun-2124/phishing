import React from 'react';
import { AlertTriangle, BookOpen, ShieldAlert, CheckCircle, Scale, FileCode2 } from 'lucide-react';

export default function AboutDisclaimer() {
  return (
    <section id="about" className="py-16 relative border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono uppercase text-slate-300 font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic & Technical Context</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About & Security Disclaimer
          </h2>
          <p className="text-slate-400 mt-3 text-base">
            PhishGuard is an educational, rule-based cybersecurity demonstration tool built with Python and React.
          </p>
        </div>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* About Box */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2.5 text-cyan-400 mb-1">
              <FileCode2 className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Project Purpose</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This application was developed to demonstrate how lexical and structural properties of Uniform Resource Locators (URLs) can be parsed, extracted, and evaluated using native Python modules (<code className="text-cyan-300 font-mono text-xs">urllib.parse</code> and <code className="text-cyan-300 font-mono text-xs">ipaddress</code>).
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Rather than treating security as an opaque black box, every score contribution is tied to documented heuristics that illustrate real-world social engineering and URL spoofing tactics.
            </p>
          </div>

          {/* Model Boundaries */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2.5 text-amber-400 mb-1">
              <Scale className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Scoring Methodology</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The risk rating is calculated using bounded heuristic weights capped at 100 points. The output is an <strong className="text-white">Estimated URL Risk</strong> index, not an empirically calibrated statistical probability of maliciousness.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Heavy structural indicators (such as raw IP hostnames or credential spoofing via userinfo) contribute significantly more risk points than generic keywords like "login" or "account".
            </p>
          </div>
        </div>

        {/* Prominent Disclaimer Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#120f18] border border-amber-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

          <div className="flex items-start space-x-4">
            <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800/80 shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-bold text-amber-300 tracking-wide uppercase font-mono">
                Mandatory Operational Limitations & Disclaimers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 pt-1">
                <div className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Low score is not proof of safety:</strong> Newly registered domains with clean syntax can still host active phishing scams.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">High score is not proof of malice:</strong> Legitimate developmental or internal networks may trigger warnings (false positives).
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">Sophisticated evasion:</strong> Attackers using compromised legitimate domains or cloud subdomains may evade simple rule heuristics.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>
                    <strong className="text-white">No reputation or content inspection:</strong> This tool evaluates URL syntax only. It does not query commercial threat feeds or crawl website HTML.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
