import React, { useState } from 'react';
import {
  ArrowDown,
  Search,
  RotateCcw,
  Sparkles,
  AlertCircle,
  EyeOff,
  ClipboardPaste,
  ShieldAlert,
  ArrowRight,
  Terminal,
  Zap
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
        title: 'URL INPUT REQUIRED',
        message: 'Please paste or type any HTTP or HTTPS URL string into the experimental console.',
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
          title: data.error || 'PARSER REJECTION',
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
        title: 'ENGINE DISCONNECTED',
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
      // Clipboard blocked by user browser
    }
  };

  const handleReset = () => {
    setUrlInput('');
    setError(null);
    setResult(null);
  };

  return (
    <section id="sec-live-demo" className="py-28 px-4 sm:px-8 bg-[#08080c] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 font-mono text-xs text-white/50 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="text-[#ccff00]">05</span>
            <span>// LIVE URL ANALYSIS</span>
          </div>
          <span className="text-white/30">INTERACTIVE INSPECTION CONSOLE</span>
        </div>

        {/* Monumental Section Title */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
            Let's Analyse <br />
            <span className="text-[#ccff00] font-serif italic tracking-normal">a URL</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl font-light">
            Live interactive laboratory terminal communicating with the Python heuristic engine.
          </p>
        </div>

        {/* Presentation Speech Text Panel (Editorial format, no speaker notes label) */}
        <div className="rounded-3xl bg-[#0e0e16] border border-white/15 p-8 sm:p-14 mb-16 shadow-2xl">
          <div className="max-w-4xl space-y-6 text-white text-lg sm:text-2xl leading-relaxed font-light">
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Now, let's look at how the program works.
            </p>

            <p className="text-white/80">
              We can enter any properly formatted HTTP or HTTPS URL. The program parses the address, checks its features and displays the result.
            </p>

            <p className="text-white/80">
              We can then inspect the triggered indicators to understand why certain characteristics contribute to the risk score.
            </p>

            <div className="p-6 rounded-2xl bg-black/80 border-l-4 border-[#ccff00] text-white text-xl italic font-serif leading-relaxed">
              "Notice that the program doesn't need to visit the website. It analyses the URL string itself, which makes our demonstration safer."
            </div>
          </div>
        </div>

        {/* Experimental Terminal Console */}
        <div className="rounded-3xl bg-[#050508] border border-white/20 p-6 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.9)] mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 font-mono text-xs uppercase tracking-wider text-white/50">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-white font-bold">TERMINAL // UNIVERSAL URL PARSER</span>
            </div>
            <div className="flex items-center space-x-2 text-[#ccff00]">
              <EyeOff className="w-3.5 h-3.5" />
              <span>AIR-GAPPED SYNTACTIC EVALUATION</span>
            </div>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3 font-mono text-xs uppercase text-white/60">
                <span>Enter or Paste Target Web Address:</span>
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  className="text-[#ccff00] hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>Paste from Clipboard</span>
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    id="url-live-input"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://... or http://..."
                    disabled={loading}
                    className="w-full px-6 py-5 bg-[#0b0b12] border-2 border-white/15 rounded-2xl text-white placeholder-white/20 font-mono text-base sm:text-lg focus:outline-none focus:border-[#ccff00] transition-all shadow-inner disabled:opacity-50"
                  />
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => setUrlInput('')}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center font-mono text-xs text-white/40 hover:text-white cursor-pointer"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 lg:flex-initial flex items-center justify-center space-x-3 px-10 py-5 rounded-2xl bg-[#ccff00] hover:bg-white text-black font-black font-mono text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>PARSING...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>ANALYSE URL</span>
                      </>
                    )}
                  </button>

                  {(urlInput || result || error) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      title="Reset input and clear results"
                      className="p-5 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-white/40 pt-1">
              <span>Accepts arbitrary domains, paths, query variables, ports, or raw IPs.</span>
              <span className="text-[#ccff00]">Repeated analyses supported without page reload</span>
            </div>
          </form>

          {/* Validation Notice Error */}
          {error && (
            <div className="mt-8 p-6 rounded-2xl bg-[#1c0d12] border-2 border-[#ff2a5f] text-white flex items-start space-x-4 shadow-2xl">
              <AlertCircle className="w-6 h-6 text-[#ff2a5f] shrink-0 mt-0.5" />
              <div className="font-mono text-xs sm:text-sm">
                <div className="font-black text-[#ff2a5f] tracking-wider mb-1">{error.title}</div>
                <div className="text-white/90 leading-relaxed font-sans">{error.message}</div>
                {error.suggestion && (
                  <div className="text-white/50 font-mono mt-2 pt-2 border-t border-white/10">
                    TIP: {error.suggestion}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Analysis Results Display */}
        {result && (
          <div className="mb-14 transition-all">
            <ResultsPanel result={result} onReset={handleReset} />
          </div>
        )}

        {/* Transition to Next Stage */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-sm">
          <button
            onClick={scrollToNext}
            className="group flex items-center space-x-3 px-8 py-4 rounded-full bg-white hover:bg-[#ccff00] text-black font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Next: Limitations and Conclusion</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <span className="text-xs text-white/40 font-mono hidden sm:inline">STAGE 05 / 06</span>
        </div>
      </div>
    </section>
  );
}
