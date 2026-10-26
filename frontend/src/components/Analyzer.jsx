import React, { useState } from 'react';
import {
  ArrowDown,
  Search,
  RotateCcw,
  Sparkles,
  AlertCircle,
  EyeOff,
  ClipboardPaste,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import ResultsPanel from './ResultsPanel';

export default function Analyzer() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const scrollToNext = () => {
    const el = document.getElementById('sec-conclusion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    const trimmed = urlInput.trim();

    if (!trimmed) {
      setError({
        title: 'URL Input Required',
        message: 'Please paste or type any HTTP or HTTPS URL into the input field above.',
        suggestion: "Ensure the URL starts with 'https://' or 'http://' (e.g. https://github.com/torvalds/linux).",
      });
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError({
          title: data.error || 'Validation Notice',
          message: data.message || 'The server rejected this input.',
          suggestion: data.suggestion || "Please ensure the address is formatted as a valid HTTP or HTTPS URL.",
        });
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (err) {
      setError({
        title: 'Backend Connection Error',
        message: 'Could not connect to the Python Flask backend service.',
        suggestion: 'Verify that the backend is running (`python backend/app.py`).',
      });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrlInput(text.trim());
      }
    } catch (e) {
      // Clipboard access blocked by user browser permissions
    }
  };

  const handleReset = () => {
    setUrlInput('');
    setError(null);
    setResult(null);
  };

  return (
    <section id="sec-live-demo" className="py-20 border-b border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/40 text-xs text-cyan-300 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <span className="font-mono font-bold text-cyan-400">05</span>
            <span className="text-slate-600">•</span>
            <span className="uppercase tracking-wider font-semibold">Live Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let's Analyse a URL
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3">
            Real-time interactive inspection console powered by the Python Flask heuristic engine.
          </p>
        </div>

        {/* Editorial Presentation Content Panel (No Speaker Notes label!) */}
        <div className="rounded-3xl glass-panel border border-cyan-500/30 p-8 sm:p-12 shadow-2xl mb-12">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-200 text-lg sm:text-xl leading-relaxed">
            <p className="text-xl sm:text-2xl font-semibold text-white leading-snug">
              Now, let's look at how the program works.
            </p>

            <p>
              We can enter any properly formatted HTTP or HTTPS URL. The program parses the address, checks its features and displays the result.
            </p>

            <p>
              We can then inspect the triggered indicators to understand why certain characteristics contribute to the risk score.
            </p>

            <div className="p-6 rounded-2xl bg-[#061122]/90 border border-cyan-500/30 text-cyan-100 font-medium text-base sm:text-lg leading-relaxed shadow-inner">
              "Notice that the program doesn't need to visit the website. It analyses the URL string itself, which makes our demonstration safer."
            </div>
          </div>
        </div>

        {/* 3D Floating Interactive Inspection Console */}
        <div className="perspective-1000 mb-12">
          <div className="rounded-3xl glass-panel-3d border border-slate-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Console Header Bar */}
            <div className="px-6 py-4 bg-[#050b18] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                  Universal URL Inspection Console
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                <EyeOff className="w-4 h-4 text-cyan-400" />
                <span>100% Offline String Analysis</span>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              {/* Form Input */}
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label
                      htmlFor="url-live-input"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-300"
                    >
                      Paste Any Target Web Address (HTTP or HTTPS):
                    </label>
                    <button
                      type="button"
                      onClick={handlePasteClipboard}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1.5 font-mono transition-colors cursor-pointer"
                    >
                      <ClipboardPaste className="w-3.5 h-3.5" />
                      <span>Paste from Clipboard</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                        <Search className="w-5 h-5 text-cyan-400" />
                      </div>
                      <input
                        id="url-live-input"
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="Paste or type any URL (e.g. https://github.com/torvalds/linux or http://192.0.2.1/login)..."
                        disabled={loading}
                        className="w-full pl-12 pr-16 py-4 bg-[#040713] border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all shadow-inner disabled:opacity-50"
                      />
                      {urlInput && (
                        <button
                          type="button"
                          onClick={() => setUrlInput('')}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-white cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-[0_6px_25px_rgba(6,182,212,0.4)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Analysing...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Analyse URL</span>
                          </>
                        )}
                      </button>

                      {(urlInput || result || error) && (
                        <button
                          type="button"
                          onClick={handleReset}
                          title="Reset input and clear results"
                          className="p-4 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-750 rounded-2xl transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Accepts arbitrary domains, subdomains, query strings, custom ports, or raw IPs.
                  </span>
                  <span className="font-mono text-cyan-400 hidden sm:inline">
                    Repeated analyses supported without page reload
                  </span>
                </div>
              </form>

              {/* Error Notice */}
              {error && (
                <div className="mt-6 p-5 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-200 flex items-start space-x-3.5 shadow-xl">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <h4 className="font-bold text-rose-300">{error.title}</h4>
                    <p className="text-rose-200 mt-1 leading-relaxed">{error.message}</p>
                    {error.suggestion && (
                      <p className="text-xs text-rose-400 font-mono mt-2">
                        Guidance: {error.suggestion}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Analysis Results Display */}
        {result && (
          <div className="mb-12 transition-all">
            <ResultsPanel result={result} onReset={handleReset} />
          </div>
        )}

        {/* Next Section Transition Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-semibold text-sm hover:border-cyan-300 transition-all cursor-pointer shadow-lg shadow-cyan-950/60 group hover:scale-105"
          >
            <span>Next: Limitations and Conclusion</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
