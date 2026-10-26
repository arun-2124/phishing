import React, { useState } from 'react';
import {
  Mic,
  ArrowDown,
  Search,
  RotateCcw,
  Sparkles,
  AlertCircle,
  EyeOff,
  ClipboardPaste,
  Terminal,
  ShieldCheck
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
        message: 'Please paste or type any HTTP or HTTPS URL into the box above.',
        suggestion: "Ensure the URL starts with 'https://' or 'http://' (e.g. https://github.com or https://example.com).",
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
      // Clipboard access might be blocked by browser permissions
    }
  };

  const handleReset = () => {
    setUrlInput('');
    setError(null);
    setResult(null);
  };

  return (
    <section id="sec-live-demo" className="py-20 border-b border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slide Counter / Section Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-xs text-cyan-300">
            <span className="font-mono font-bold text-cyan-400">Section 05</span>
            <span className="text-slate-600">/</span>
            <span className="uppercase tracking-wider font-semibold">Live Demonstration</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Slide 5 of 6 • College Presentation
          </span>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Analyse a URL
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Live interactive inspection console accepting arbitrary user-supplied web addresses.
          </p>
        </div>

        {/* Presentation Speech Card - Verbatim as requested */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0f172a] to-[#0a1020] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl mb-10">
          <div className="flex items-center space-x-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Speaker Notes & Presentation Speech</span>
          </div>

          <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-xl font-semibold text-white">
              "Now, let's look at how the program works.
            </p>

            <p>
              We can enter any properly formatted HTTP or HTTPS URL. The program parses the address, checks its features and displays the result.
            </p>

            <p>
              We can then inspect the triggered indicators to understand why certain characteristics contribute to the risk score.
            </p>

            <p className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-cyan-400 text-slate-200 font-medium">
              Notice that the program doesn't need to visit the website. It analyses the URL string itself, which makes our demonstration safer."
            </p>
          </div>
        </div>

        {/* Live URL Input Console Card */}
        <div className="rounded-2xl bg-[#0b1325] border border-slate-800 shadow-2xl overflow-hidden mb-8 transition-all">
          {/* Console Header Bar */}
          <div className="px-6 py-4 bg-[#080e1b] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                Interactive URL Analyzer Console
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
              <EyeOff className="w-3.5 h-3.5 text-cyan-400" />
              <span>Air-Gapped: 0 Network Requests to Target</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Input Form */}
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="url-live-input"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300"
                  >
                    Enter or Paste Any HTTP / HTTPS Web Address:
                  </label>
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 font-mono transition-colors cursor-pointer"
                  >
                    <ClipboardPaste className="w-3.5 h-3.5" />
                    <span>Paste from Clipboard</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      id="url-live-input"
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Paste any URL here (e.g. https://github.com/torvalds/linux or http://192.0.2.1/login)..."
                      disabled={loading}
                      className="w-full pl-11 pr-16 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all disabled:opacity-50"
                    />
                    {urlInput && (
                      <button
                        type="button"
                        onClick={() => setUrlInput('')}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-950 hover:shadow-cyan-500/25 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
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
                        className="p-3.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-750 rounded-xl transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Informative helper note */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Accepts any domain, path, query strings, custom ports, or raw IP literals.
                </span>
                <span className="font-mono text-cyan-400/90 hidden sm:inline">
                  Repeated analyses supported without page reload
                </span>
              </div>
            </form>

            {/* Validation / Connection Error Alert */}
            {error && (
              <div className="mt-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-200 flex items-start space-x-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-bold text-rose-300">{error.title}</h4>
                  <p className="text-rose-200 mt-0.5 leading-relaxed">{error.message}</p>
                  {error.suggestion && (
                    <p className="text-xs text-rose-400 font-mono mt-1.5">
                      Guidance: {error.suggestion}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Analysis Results Presentation Panel */}
        {result && (
          <div className="mb-10 transition-all">
            <ResultsPanel result={result} onReset={handleReset} />
          </div>
        )}

        {/* Next Section Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={scrollToNext}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-medium text-xs sm:text-sm hover:border-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-950/50 group"
          >
            <span>Next: Limitations and Conclusion</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
