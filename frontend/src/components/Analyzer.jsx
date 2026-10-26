import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, AlertCircle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import ResultsPanel from './ResultsPanel';

export default function Analyzer() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [samples, setSamples] = useState([]);

  // Load demonstration samples from backend
  useEffect(() => {
    fetch('/api/samples')
      .then((res) => res.json())
      .then((data) => {
        if (data.samples) {
          setSamples(data.samples);
        }
      })
      .catch(() => {
        // Fallback default samples if API is offline
        setSamples([
          {
            id: 'legit',
            title: 'Standard Reference URL',
            url: 'https://example.com/',
            badge: 'Clean Reference',
            description: 'Standard HTTPS domain with clean hierarchy.',
          },
          {
            id: 'ip_host',
            title: 'Raw IP Address Hostname',
            url: 'http://192.0.2.10/login?verify=1',
            badge: 'Structural Red Flag',
            description: 'Uses reserved IPv4 address over unencrypted HTTP.',
          },
          {
            id: 'subdomain_kw',
            title: 'Subdomain & Keyword Nuance',
            url: 'https://login.example.com/account/verify',
            badge: 'Keyword Context',
            description: 'Standard corporate login subdomain.',
          },
          {
            id: 'spoofed_brand',
            title: 'Compound Deceptive URL',
            url: 'https://paypal.com:account@update-billing-support.tk/login',
            badge: 'High Risk Spoof',
            description: 'Brand mimicry, userinfo disguise (@), abusive TLD.',
          },
          {
            id: 'malformed',
            title: 'Unsupported Protocol',
            url: 'ftp://files.example.com/archive.zip',
            badge: 'Validation Test',
            description: 'Non-HTTP protocol testing error rejection.',
          },
        ]);
      });
  }, []);

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setError({
        title: 'Input Required',
        message: 'Please enter a URL to analyze (e.g., https://example.com).',
        suggestion: 'Make sure to include http:// or https://',
      });
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
          title: data.error || 'Analysis Error',
          message: data.message || 'The server rejected this input.',
          suggestion: data.suggestion || 'Please provide a valid HTTP/HTTPS URL.',
        });
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (err) {
      setError({
        title: 'Connection Error',
        message: 'Could not connect to the Python Flask backend on port 5000.',
        suggestion: 'Ensure the backend server is running (`python backend/app.py`).',
      });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (sampleUrl) => {
    setUrlInput(sampleUrl);
    setError(null);
    // Smoothly initiate analysis after setting sample
    setTimeout(() => {
      analyzeSpecificUrl(sampleUrl);
    }, 50);
  };

  const analyzeSpecificUrl = async (targetUrl) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError({
          title: data.error || 'Analysis Error',
          message: data.message || 'Input validation failed.',
          suggestion: data.suggestion,
        });
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (err) {
      setError({
        title: 'Connection Error',
        message: 'Could not reach backend API.',
        suggestion: 'Ensure Flask server is running on port 5000.',
      });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrlInput('');
    setError(null);
    setResult(null);
  };

  return (
    <section id="analyzer" className="py-12 relative scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Container */}
        <div className="rounded-2xl bg-[#0d1527] border border-slate-800 shadow-2xl overflow-hidden transition-all">
          {/* Card Header Bar */}
          <div className="px-6 py-4 bg-[#0a101f] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
              <h2 className="text-base font-semibold text-white tracking-wide">
                URL Risk Inspection Console
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                POST /api/analyze
              </span>
              <span>•</span>
              <span className="text-cyan-400 font-mono">urllib.parse local engine</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Input Form */}
            <form onSubmit={handleAnalyze} className="mb-6">
              <label
                htmlFor="url-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"
              >
                Target Web Address (URL)
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    id="url-input"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter URL to inspect (e.g. https://example.com/login?verify=1)..."
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all disabled:opacity-50"
                  />
                  {urlInput && (
                    <button
                      type="button"
                      onClick={() => setUrlInput('')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-cyan-950 hover:shadow-cyan-500/20 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Analyze URL</span>
                      </>
                    )}
                  </button>

                  {(urlInput || result || error) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      title="Reset input and results"
                      className="p-3.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Error Message Box */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-200 flex items-start space-x-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold text-rose-300">{error.title}</h4>
                  <p className="text-rose-200 mt-0.5">{error.message}</p>
                  {error.suggestion && (
                    <p className="text-xs text-rose-400/90 mt-1 font-mono">
                      Tip: {error.suggestion}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Demonstration Samples */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Demonstration Samples (Click to analyze):
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Non-live test patterns
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {samples.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSampleClick(sample.url)}
                    className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                        {sample.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-800 text-slate-400 border border-slate-700">
                        {sample.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono truncate mb-1 text-cyan-200/80">
                      {sample.url}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{sample.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Presentation Panel */}
        {result && (
          <div className="mt-8 transition-all">
            <ResultsPanel result={result} onReset={handleReset} />
          </div>
        )}
      </div>
    </section>
  );
}
