import React from 'react';
import Navbar from './components/Navbar';
import Section1_Introduction from './components/Section1_Introduction';
import Section2_WhatIsAnalysis from './components/Section2_WhatIsAnalysis';
import Section3_WhyPython from './components/Section3_WhyPython';
import Section4_HowItWorks from './components/Section4_HowItWorks';
import Analyzer from './components/Analyzer';
import Section6_Conclusion from './components/Section6_Conclusion';
import Footer from './components/Footer';

export default function App() {
  const handleFocusAnalyzer = () => {
    const input = document.getElementById('url-live-input');
    if (input) {
      input.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white flex flex-col font-sans selection:bg-[#ccff00] selection:text-black">
      <Navbar onAnalyzeClick={handleFocusAnalyzer} />
      <main className="flex-grow">
        <Section1_Introduction />
        <Section2_WhatIsAnalysis />
        <Section3_WhyPython />
        <Section4_HowItWorks />
        <Analyzer />
        <Section6_Conclusion />
      </main>
      <Footer />
    </div>
  );
}
