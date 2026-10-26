import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import AboutDisclaimer from './components/AboutDisclaimer';
import Footer from './components/Footer';

export default function App() {
  const handleFocusAnalyzer = () => {
    const input = document.getElementById('url-input');
    if (input) {
      input.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onAnalyzeClick={handleFocusAnalyzer} />
      <main className="flex-grow">
        <Hero onGetStarted={handleFocusAnalyzer} />
        <Analyzer />
        <HowItWorks />
        <Features />
        <AboutDisclaimer />
      </main>
      <Footer />
    </div>
  );
}
