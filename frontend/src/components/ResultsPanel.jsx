import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  Server,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
  Copy,
  Check,
  Sliders,
  Scale,
  Zap,
  Terminal
} from 'lucide-react';

export default function ResultsPanel({ result, onReset }) {
  const [copied, setCopied] = useState(false);
  const [showPassed, setShowPassed] = useState(false);

  if (!result) return null;

  const {
    url,
    risk_score,
    risk_level,
    score_label = 'Estimated URL Risk',
    triggered_rules = [],
    passed_rules = [],
    features = {},
    components = {},
    recommendation,
    disclaimer,
  } = result;

  // Experimental chromatic tiers
  const tierConfig = {
    'HIGH RISK': {
      border: 'border-[#ff2a5f]',
      textAccent: 'text-[#ff2a5f]',
      badgeBg: 'bg-[#ff2a5f] text-black font-black',
      glow: 'shadow-[0_0_40px_rgba(255,42,95,0.3)]',
      icon: <ShieldAlert className="w-8 h-8 text-[#ff2a5f]" />,
      tag: 'CRITICAL STRUCTURAL RED FLAGS DETECTED',
    },
    'MEDIUM RISK': {
      border: 'border-amber-400',
      textAccent: 'text-amber-400',
      badgeBg: 'bg-amber-400 text-black font-black',
      glow: 'shadow-[0_0_40px_rgba(251,191,36,0.25)]',
      icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
      tag: 'MODERATE SYNTACTIC ANOMALIES DETECTED',
    },
    'LOW RISK': {
      border: 'border-[#ccff00]',
      textAccent: 'text-[#ccff00]',
      badgeBg: 'bg-[#ccff00] text-black font-black',
      glow: 'shadow-[0_0_40px_rgba(204,255,0,0.25)]',
      icon: <ShieldCheck className="w-8 h-8 text-[#ccff00]" />,
      tag: 'LOW STRUCTURAL RISK (NOT GUARANTEED SAFE)',
    },
  }[risk_level] || {
    border: 'border-white/20',
    textAccent: 'text-white',
    badgeBg: 'bg-white text-black font-black',
    glow: '',
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    tag: 'ANALYSIS COMPLETE',
  };

  const handleCopySummary = () => {
    const text = `PhishGuard Analysis Summary
Target URL: ${url}
Estimated Risk Score: ${risk_score}/100 (${risk_level})
Triggered Rules: ${triggered_rules.length}
${triggered_rules.map((r) => `- [${r.name}] (+${r.weight} pts): ${r.explanation}`).join('\n')}
Analyst Recommendation: ${recommendation}
Disclaimer: ${disclaimer}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`rounded-3xl border-2 ${tierConfig.border} ${tierConfig.glow} bg-[#06060a] p-6 sm:p-10 shadow-2xl transition-all duration-500`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div className="flex items-start sm:items-center space-x-4">
          <div className="p-3 rounded-2xl bg-black border border-white/10 shrink-0">
            {tierConfig.icon}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2 font-mono text-xs">
              <span className={`px-3 py-1 rounded-full uppercase tracking-wider ${tierConfig.badgeBg}`}>
                {risk_level}
              </span>
              <span className="text-white/50 tracking-wide uppercase">
                {tierConfig.tag}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-mono font-black text-white break-all">
              {url}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handleCopySummary}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#ccff00]" />
                <span className="text-[#ccff00] font-bold">COPIED SUMMARY</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-white/50" />
                <span>COPY SUMMARY</span>
              </>
            )}
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              ANALYSE ANOTHER
            </button>
          )}
        </div>
      </div>

      <div className="py-8 space-y-10">
        {/* Score & Gauge Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Monumental Numeric Score */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-baseline justify-between font-mono">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 font-bold block">
                  {score_label}
                </span>
                <span className="text-[11px] text-white/30">
                  DETERMINISTIC 0–100 HEURISTIC COMPUTATION (NOT PROBABILITY)
                </span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className={`text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter ${tierConfig.textAccent}`}>
                  {risk_score}
                </span>
                <span className="text-xl text-white/30 font-bold font-mono">/100</span>
              </div>
            </div>

            {/* Kinetic Bar Gauge */}
            <div className="h-4 w-full bg-black rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${Math.max(5, risk_score)}%`,
                  backgroundColor:
                    risk_level === 'HIGH RISK'
                      ? '#ff2a5f'
                      : risk_level === 'MEDIUM RISK'
                      ? '#f59e0b'
                      : '#ccff00',
                }}
              />
            </div>

            <div className="flex justify-between font-mono text-[11px] text-white/40 pt-1">
              <span className="text-[#ccff00]">00 – 29: LOW RISK</span>
              <span className="text-amber-400">30 – 64: MEDIUM RISK</span>
              <span className="text-[#ff2a5f]">65 – 100: HIGH RISK</span>
            </div>
          </div>

          {/* Quick Metrics Stamped Grid */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0c0c14] border border-white/10 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-white/40">TRIGGERED WARNINGS:</span>
              <span className="font-bold text-white text-sm">{triggered_rules.length}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-white/40">PASSED PARAMETERS:</span>
              <span className="font-bold text-[#ccff00] text-sm">{passed_rules.length}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-white/40">TRANSPORT PROTOCOL:</span>
              <span className={`font-bold ${features.uses_https ? 'text-white' : 'text-amber-400'}`}>
                {features.uses_https ? 'HTTPS (ENCRYPTED)' : 'HTTP (PLAINTEXT)'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40">HOST CLASSIFICATION:</span>
              <span className="font-bold text-white">
                {features.is_ip_address ? `IPv${features.ip_version} LITERAL` : 'DOMAIN NAME'}
              </span>
            </div>
          </div>
        </div>

        {/* Actionable Security Guidance Box */}
        <div className="p-6 rounded-2xl bg-[#0e0e18] border border-white/15 flex items-start space-x-4">
          <div className="p-2 rounded-xl bg-black border border-white/10 shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-[#ccff00]" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#ccff00] font-black uppercase tracking-wider block mb-1">
              ANALYST RECOMMENDATION & BEHAVIORAL PROTOCOL
            </span>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              {recommendation}
            </p>
          </div>
        </div>

        {/* Triggered Structural Warnings */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 font-mono text-xs uppercase tracking-wider text-white/50">
            <span>TRIGGERED WARNING ANOMALIES ({triggered_rules.length})</span>
            {triggered_rules.length === 0 && (
              <span className="text-[#ccff00]">ZERO STRUCTURAL PENALTIES TRIGGERED</span>
            )}
          </div>

          {triggered_rules.length > 0 ? (
            <div className="space-y-3">
              {triggered_rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#090910] border border-white/10 hover:border-white/30 transition-all font-mono"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-white text-sm">{rule.name}</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[10px]">
                        {rule.severity}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="text-[#ff2a5f] font-black">+{rule.weight} PTS</span>
                      <span className="text-white/40">{rule.category}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {rule.explanation}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10 text-white/70 font-sans text-sm flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Clean Structural Syntax:</strong>
                <p className="mt-1 leading-relaxed text-xs sm:text-sm">
                  This address did not trigger our rule penalties. However, remember that zero triggered rules does NOT guarantee that the website is safe. Phishers frequently host attacks on newly registered domains or legitimate cloud infrastructure with clean syntax.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Expandable Passed Checks Drawer */}
        {passed_rules.length > 0 && (
          <div className="pt-2 font-mono">
            <button
              type="button"
              onClick={() => setShowPassed(!showPassed)}
              className="flex items-center space-x-2 text-xs text-white/50 hover:text-[#ccff00] transition-colors cursor-pointer uppercase tracking-wider"
            >
              <span>{showPassed ? '[-]' : '[+]'} VIEW AUDITED PARAMETERS THAT PASSED ({passed_rules.length})</span>
              {showPassed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPassed && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {passed_rules.map((rule, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/50 border border-white/10">
                    <div className="flex items-center space-x-2 text-[#ccff00] font-bold mb-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{rule.name}</span>
                    </div>
                    <p className="text-white/60 font-sans text-xs leading-relaxed">{rule.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RFC 3986 Parsed URL Components */}
        <div>
          <div className="mb-4 pb-2 border-b border-white/10 font-mono text-xs uppercase tracking-wider text-white/50">
            PARSED RFC 3986 ARCHITECTURE (URLLIB.PARSE.URLSPLIT)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono">
            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <span className="text-[10px] text-white/40 uppercase block mb-1">SCHEME</span>
              <span className="text-sm font-bold text-[#06b6d4] truncate block">
                {components.scheme || 'none'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 col-span-2">
              <span className="text-[10px] text-white/40 uppercase block mb-1">HOSTNAME</span>
              <span className="text-sm font-bold text-white truncate block">
                {components.hostname || 'none'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <span className="text-[10px] text-white/40 uppercase block mb-1">PORT</span>
              <span className="text-sm font-bold text-white truncate block">
                {components.port || 'default'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <span className="text-[10px] text-white/40 uppercase block mb-1">TOTAL LENGTH</span>
              <span className="text-sm font-bold text-white truncate block">
                {features.total_length} chars
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <span className="text-[10px] text-white/40 uppercase block mb-1">SUBDOMAINS</span>
              <span className="text-sm font-bold text-white truncate block">
                {features.subdomain_count} count
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 col-span-2 sm:col-span-3">
              <span className="text-[10px] text-white/40 uppercase block mb-1">PATH</span>
              <span className="text-xs font-bold text-white/80 truncate block">
                {components.path || '/'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 col-span-2 sm:col-span-3">
              <span className="text-[10px] text-white/40 uppercase block mb-1">QUERY STRING</span>
              <span className="text-xs font-bold text-white/80 truncate block">
                {components.query ? `?${components.query}` : '(none)'}
              </span>
            </div>
          </div>
        </div>

        {/* Air-Gapped Safe Boundaries Footer */}
        <div className="p-6 rounded-2xl bg-black border border-white/10 text-xs font-mono text-white/50 space-y-2">
          <div className="flex items-center space-x-2 text-[#ccff00] font-bold uppercase">
            <Scale className="w-4 h-4" />
            <span>OPERATIONAL BOUNDARIES & HEURISTIC LIMITATIONS</span>
          </div>
          <p className="font-sans leading-relaxed text-white/70">
            • <strong>HTTPS does not guarantee safety:</strong> Modern phishers deploy free SSL certificates. <br />
            • <strong>Keywords alone do not prove malice:</strong> Legitimate web apps routinely use /login and /account routes. <br />
            • <strong>Air-gapped guarantee:</strong> This server never downloads HTML, runs scripts, or establishes connections with remote hosts.
          </p>
        </div>
      </div>
    </div>
  );
}
