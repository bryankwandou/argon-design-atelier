import React, { useState } from 'react';
import { AtelierProvider } from './context/AtelierContext';
import { AtelierLoader } from './components/AtelierLoader';
import { CustomCursor } from './components/CustomCursor';
import { AtelierNavbar } from './components/AtelierNavbar';
import { AtelierHero } from './components/AtelierHero';
import { AtelierModules } from './components/AtelierModules';
import { AtelierLabSimulator } from './components/AtelierLabSimulator';
import { AtelierCaseStudies } from './components/AtelierCaseStudies';
import { AtelierManifest } from './components/AtelierManifest';
import { AtelierPartnershipForm } from './components/AtelierPartnershipForm';
import { AtelierFooter } from './components/AtelierFooter';

function AtelierContent() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <div className="relative min-h-screen bg-bg text-fg selection:bg-accent/30 selection:text-accent font-sans">
      {/* Film Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Trailing Custom Cursor */}
      <CustomCursor />

      {/* Smooth 00-100 Loader */}
      <AtelierLoader onComplete={() => setLoaderComplete(true)} />

      {/* Fixed Glass Pill Navbar */}
      <AtelierNavbar />

      {/* Main Landing Page Content */}
      <main className={`transition-opacity duration-700 ${loaderComplete ? 'opacity-100' : 'opacity-0'}`}>
        <AtelierHero />
        <AtelierModules />
        <AtelierLabSimulator />
        <AtelierCaseStudies />
        <AtelierManifest />
        <AtelierPartnershipForm />
      </main>

      {/* Minimal Luxury Footer */}
      <AtelierFooter />
    </div>
  );
}

export function App() {
  return (
    <AtelierProvider>
      <AtelierContent />
    </AtelierProvider>
  );
}

export default App;
