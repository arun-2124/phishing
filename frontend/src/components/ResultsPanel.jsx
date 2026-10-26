import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  Server,
  Globe,
  Sliders,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
  Copy,
  Check,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function ResultsPanel({ result, onReset }) {
  const [copied, setCopied] = useState(false);
  const [showPassed, setShowPassed] = useState(false);

  if (!result) return null;

  const {
    url,
    risk_score,
    risk_level,
    score_label,
    triggered_rules = [],
    passed_rules = [],
    features = {},
    components = {},
    recommendation,
    disclaimer,
  } = result;

  const isHigh = risk_level === 'HIGH RISK';
  const isMedium = risk_level === 'MEDIUM RISK';
  const isLow = risk_level === 'LOW RISK';

  // Styling maps
  const tierConfig = {
    'HIGH RISK': {
      border: 'border-rose-500/60',
      bgGlow: 'bg-rose-950/20 shadow-[0_0_35px_-5px_rgba(244,63,94,0.2)]',
      badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-700/80',
      barColor: 'from-amber-500 via-rose-500 to-red-600',
      textAccent: 'text-rose-400',
      icon: <ShieldAlert className="w-8 h-8 text-rose-400" />,
      tag: 'Critical Indicators Detected',
    },
    'MEDIUM RISK': {
      border: 'border-amber-500/60',
      bgGlow: 'bg-amber-950/20 shadow-[0_0_35px_-5px_rgba(245,158,11,0.2)]',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-700/80',
      barColor: 'from-yellow-400 via-amber-500 to-orange-500',
      textAccent: 'text-amber-400',
      icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
      tag: 'Moderate Anomalies Detected',
    },
    'LOW RISK': {
      border: 'border-emerald-500/60',
      bgGlow: 'bg-emerald-950/20 shadow-[0_0_35px_-5px_rgba(16,185,129,0.2)]',
      badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80',
      barColor: 'from-teal-400 via-emerald-500 to-green-500',
      textAccent: 'text-emerald-400',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      tag: 'Standard URL Characteristics',
    },
  }[risk_level] || {
    border: 'border-slate-700',
    bgGlow: 'bg-slate-900',
    badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
    barColor: 'from-blue-500 to-cyan-500',
    textAccent: 'text-cyan-400',
    icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
    tag: 'Analysis Complete',
  };

  const handleCopySummary = () => {
    const text = `PhishGuard Analysis Summary
Target URL: ${url}
Estimated Risk Score: ${risk_score}/100 (${risk_level})
Triggered Rules: ${triggered_rules.length}
${triggered_rules.map((r) => `- [${r.name}] (+${r.weight} pts): ${r.explanation}`).join('\n')}
Recommendation: ${recommendation}
Disclaimer: ${disclaimer}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`rounded-2xl border ${tierConfig.border} ${tierConfig.bgGlow} bg-[#0b1324] overflow-hidden transition-all duration-300`}
    >
      {/* Top Banner Header */}
      <div className="px-6 py-5 bg-[#090f1d] border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            {tierConfig.icon}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${tierConfig.badgeBg}`}
              >
                {risk_level}
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {tierConfig.tag}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1 break-all font-mono">
              {url}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleCopySummary}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-750 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Copy plain-text summary"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-750 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Analyze Another
            </button>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Score & Gauge Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Numeric Score & Bar */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {score_label}
                </span>
                <p className="text-xs text-slate-400">
                  Transparent 0-100 rule calculation (Not a probability)
                </p>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className={`text-4xl sm:text-5xl font-black ${tierConfig.textAccent}`}>
                  {risk_score}
                </span>
                <span className="text-lg text-slate-500 font-bold">/100</span>
              </div>
            </div>

            {/* Gauge Progress Bar */}
            <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${tierConfig.barColor} transition-all duration-700 ease-out`}
                style={{ width: `${Math.max(5, risk_score)}%` }}
              />
            </div>

            {/* Threshold scale labels */}
            <div className="flex justify-between text-[11px] font-mono text-slate-400 px-0.5">
              <span className="text-emerald-400">0 - 29: Low Risk</span>
              <span className="text-amber-400">30 - 64: Medium Risk</span>
              <span className="text-rose-400">65 - 100: High Risk</span>
            </div>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="md:col-span-4 bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Triggered Rules:
              </span>
              <span className="font-bold text-white">{triggered_rules.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Passed Checks:
              </span>
              <span className="font-bold text-emerald-400">{passed_rules.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                {features.uses_https ? (
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                )}
                Transport:
              </span>
              <span
                className={`font-mono font-semibold ${
                  features.uses_https ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {features.uses_https ? 'HTTPS (Encrypted)' : 'HTTP (Plaintext)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-blue-400" />
                Host Type:
              </span>
              <span className="font-mono text-white">
                {features.is_ip_address ? `IPv${features.ip_version} Literal` : 'Domain Name'}
              </span>
            </div>
          </div>
        </div>

        {/* Actionable Recommendation Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-3.5">
          <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 shrink-0 mt-0.5">
            <Info className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Analyst Recommendation
            </h4>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">{recommendation}</p>
          </div>
        </div>

        {/* Triggered Rules Breakdown */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span>Triggered Risk Indicators</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {triggered_rules.length}
              </span>
            </h4>
            {triggered_rules.length === 0 && (
              <span className="text-xs text-emerald-400 font-medium">
                No high-risk structural anomalies detected
              </span>
            )}
          </div>

          {triggered_rules.length > 0 ? (
            <div className="space-y-2.5">
              {triggered_rules.map((rule, idx) => {
                const sevBadge = {
                  high: 'bg-rose-950 text-rose-300 border-rose-800',
                  medium: 'bg-amber-950 text-amber-300 border-amber-800',
                  low: 'bg-blue-950 text-blue-300 border-blue-800',
                }[rule.severity] || 'bg-slate-800 text-slate-300 border-slate-700';

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{rule.name}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-semibold border ${sevBadge}`}
                        >
                          {rule.severity} severity
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-400 font-mono">
                          +{rule.weight} pts
                        </span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {rule.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {rule.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-sm flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Clean structure: URL passed all tested phishing heuristic rules without triggering risk penalties.
              </span>
            </div>
          )}
        </div>

        {/* Expandable Passed Checks Section */}
        {passed_rules.length > 0 && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowPassed(!showPassed)}
              className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <span>{showPassed ? 'Hide' : 'View'} Checked Parameters That Passed ({passed_rules.length})</span>
              {showPassed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showPassed && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {passed_rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 flex items-start space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-300">{rule.name}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{rule.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Parsed URL Components (urllib.parse breakdown) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Parsed URL Architecture (urllib.parse.urlsplit)</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Scheme</span>
              <span className="text-xs font-mono font-bold text-cyan-300 truncate block mt-0.5">
                {components.scheme || 'none'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 col-span-2">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Hostname</span>
              <span className="text-xs font-mono font-bold text-white truncate block mt-0.5">
                {components.hostname || 'none'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Port</span>
              <span className="text-xs font-mono font-bold text-slate-300 truncate block mt-0.5">
                {components.port || 'default'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Length</span>
              <span className="text-xs font-mono font-bold text-slate-300 truncate block mt-0.5">
                {features.total_length} chars
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Subdomains</span>
              <span className="text-xs font-mono font-bold text-slate-300 truncate block mt-0.5">
                {features.subdomain_count} count
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Path</span>
              <span className="text-xs font-mono text-slate-300 truncate block mt-0.5">
                {components.path || '/'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Query String</span>
              <span className="text-xs font-mono text-slate-300 truncate block mt-0.5">
                {components.query ? `?${components.query}` : '(none)'}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start space-x-2">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-400">Important Disclaimer:</strong> {disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
