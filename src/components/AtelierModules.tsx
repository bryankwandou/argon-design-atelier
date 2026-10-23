import React, { useState } from 'react';
import { Layers, ShieldCheck, Zap, Network, CheckCircle2 } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

type ModuleKey = 'SPATIAL' | 'TOKENS' | 'KINETIC' | 'DAG';

export function AtelierModules() {
  const { t, locale } = useAtelier();
  const [activeModule, setActiveModule] = useState<ModuleKey>('SPATIAL');

  // Interactive micro-states for each module tab
  const [kineticCounter, setKineticCounter] = useState(42);
  const [tokenColorSample, setTokenColorSample] = useState<'CYAN' | 'EMERALD' | 'AMBER'>('CYAN');
  const [dagStep, setDagStep] = useState(3);

  return (
    <section id="modules" className="scroll-mt-24 bg-bg px-5 py-24 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent font-bold">
            {t.modules.tag}
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-5xl md:text-6xl text-fg font-normal leading-tight">
            {t.modules.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base font-sans text-fg-muted leading-relaxed">
            {t.modules.description}
          </p>
        </div>

        {/* 4 Pillars Navigation Bar */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-2 border-b border-line pb-4">
          <button
            type="button"
            onClick={() => setActiveModule('SPATIAL')}
            className={`flex items-center gap-2 rounded-xl p-3 text-left transition-all ${
              activeModule === 'SPATIAL'
                ? 'bg-bg-elevated border border-accent text-fg shadow-lg'
                : 'border border-transparent text-fg-muted hover:text-fg hover:bg-bg-surface/50'
            }`}
          >
            <Layers className="size-4 text-accent shrink-0" aria-hidden="true" />
            <div>
              <span className="block font-mono text-[10px] uppercase text-fg-faint">01 // VISUAL</span>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-tight">
                {t.modules.tabSpatial}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('TOKENS')}
            className={`flex items-center gap-2 rounded-xl p-3 text-left transition-all ${
              activeModule === 'TOKENS'
                ? 'bg-bg-elevated border border-wire-green text-fg shadow-lg'
                : 'border border-transparent text-fg-muted hover:text-fg hover:bg-bg-surface/50'
            }`}
          >
            <ShieldCheck className="size-4 text-wire-green shrink-0" aria-hidden="true" />
            <div>
              <span className="block font-mono text-[10px] uppercase text-fg-faint">02 // DESIGN SYSTEM</span>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-tight">
                {t.modules.tabTokens}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('KINETIC')}
            className={`flex items-center gap-2 rounded-xl p-3 text-left transition-all ${
              activeModule === 'KINETIC'
                ? 'bg-bg-elevated border border-wire-amber text-fg shadow-lg'
                : 'border border-transparent text-fg-muted hover:text-fg hover:bg-bg-surface/50'
            }`}
          >
            <Zap className="size-4 text-wire-amber shrink-0" aria-hidden="true" />
            <div>
              <span className="block font-mono text-[10px] uppercase text-fg-faint">03 // MOTION</span>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-tight">
                {t.modules.tabKinetic}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('DAG')}
            className={`flex items-center gap-2 rounded-xl p-3 text-left transition-all ${
              activeModule === 'DAG'
                ? 'bg-bg-elevated border border-wire-purple text-fg shadow-lg'
                : 'border border-transparent text-fg-muted hover:text-fg hover:bg-bg-surface/50'
            }`}
          >
            <Network className="size-4 text-wire-purple shrink-0" aria-hidden="true" />
            <div>
              <span className="block font-mono text-[10px] uppercase text-fg-faint">04 // ORCHESTRATION</span>
              <span className="font-sans text-xs sm:text-sm font-bold tracking-tight">
                {t.modules.tabDag}
              </span>
            </div>
          </button>
        </div>

        {/* Dynamic Display Panel for Active Module */}
        <div className="mt-8 rounded-2xl border border-line-strong bg-bg-elevated p-6 md:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Spec Matrix & Descriptions */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-[11px] font-bold text-accent uppercase tracking-widest">
                  {activeModule} ARCHITECTURAL SPECIFICATION
                </span>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl text-fg font-normal">
                  {activeModule === 'SPATIAL' && (locale === 'id' ? 'Denah Isometrik 2.5D Real-Time' : 'Real-Time 2.5D Isometric Floor')}
                  {activeModule === 'TOKENS' && (locale === 'id' ? 'Sistem Token Desain Zero-Trust' : 'Zero-Trust Design Token System')}
                  {activeModule === 'KINETIC' && (locale === 'id' ? 'Mikro-Interaksi Kinetik 120fps' : '120fps Kinetic Micro-Interactions')}
                  {activeModule === 'DAG' && (locale === 'id' ? 'Orkestrasi Alur Multi-Agen (OpenAI Dots)' : 'Multi-Agent DAG Flow Orchestration')}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {activeModule === 'SPATIAL' &&
                    (locale === 'id'
                      ? 'Rendering kanvas HTML5 isometrik dengan algoritma pathfinding otonom untuk 10 spesialis lantai, balon ucapan dinamis, dan interpolasi gerak sub-piksel.'
                      : 'HTML5 isometric canvas renderer with autonomous wayfinding for 10 floor specialists, dynamic reactive speech bubbles, and sub-pixel motion interpolation.')}
                  {activeModule === 'TOKENS' &&
                    (locale === 'id'
                      ? 'Arsitektur variabel CSS terpusat dengan paritas dark/light mode 100%, rasio kontras WCAG AA, dan eliminasi total kode warna hex sembarang di luar file token.'
                      : 'Centralized CSS variable architecture with 100% dark/light parity, WCAG AA contrast ratio compliance, and complete elimination of arbitrary hex codes.')}
                  {activeModule === 'KINETIC' &&
                    (locale === 'id'
                      ? 'Kurva transisi berbasis fisika pegas (spring dynamics) yang menghasilkan respon visual < 100ms tanpa memicu reflow layout pada peramban web modern.'
                      : 'Spring-physics animation curves engineered for sub-100ms visual responsiveness without triggering costly DOM layout reflows.')}
                  {activeModule === 'DAG' &&
                    (locale === 'id'
                      ? 'Dekomposisi tugas paralel berbasis Directed Acyclic Graph dengan pemungutan suara audit Dewan Grok (Konsensus 99.3%) dan rilis artefak instan.'
                      : 'Parallel Directed Acyclic Graph task decomposition coupled with Grok Council cross-critique voting (99.3% consensus) and append-only release logs.')}
                </p>
              </div>

              {/* Technical Spec Matrix */}
              <div className="grid grid-cols-2 gap-3 border-t border-line pt-4 font-mono text-xs">
                <div className="rounded-lg border border-line bg-bg-surface/50 p-2.5">
                  <span className="block text-[10px] text-fg-faint uppercase tracking-wider">{t.modules.latency}</span>
                  <span className="mt-0.5 font-bold text-wire-green">
                    {activeModule === 'SPATIAL' ? '0.8 ms / frame' : activeModule === 'TOKENS' ? '0.0 ms (Native CSS)' : activeModule === 'KINETIC' ? '1.2 ms (Spring)' : '310 ms (Orchestration)'}
                  </span>
                </div>
                <div className="rounded-lg border border-line bg-bg-surface/50 p-2.5">
                  <span className="block text-[10px] text-fg-faint uppercase tracking-wider">{t.modules.memory}</span>
                  <span className="mt-0.5 font-bold text-fg">
                    {activeModule === 'SPATIAL' ? '14.8 MB VRAM' : activeModule === 'TOKENS' ? '2.1 KB Gzipped' : activeModule === 'KINETIC' ? '4.4 MB Heap' : '18.2 MB Sandbox'}
                  </span>
                </div>
                <div className="rounded-lg border border-line bg-bg-surface/50 p-2.5">
                  <span className="block text-[10px] text-fg-faint uppercase tracking-wider">{t.modules.standard}</span>
                  <span className="mt-0.5 font-bold text-fg">WCAG 2.1 AA</span>
                </div>
                <div className="rounded-lg border border-line bg-bg-surface/50 p-2.5">
                  <span className="block text-[10px] text-fg-faint uppercase tracking-wider">{t.modules.status}</span>
                  <span className="mt-0.5 inline-flex items-center gap-1 font-bold text-accent">
                    <CheckCircle2 className="size-3" />
                    <span>PRODUCTION READY</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Visual Demo Panel */}
            <div className="lg:col-span-7 rounded-xl border border-line bg-bg p-5 min-h-[320px] flex flex-col justify-center">
              {activeModule === 'SPATIAL' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-xs">
                    <span className="text-accent font-bold">2.5D ISOMETRIC OFFICE FLOOR VIEWPORT</span>
                    <span className="text-wire-green">10 AGENTS STATIONED</span>
                  </div>
                  {/* Mock Isometric Visual Representation */}
                  <div className="relative h-56 rounded-lg bg-[#0a0d14] border border-line overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 p-4 text-center">
                      <div className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 font-mono text-xs text-accent">
                        [ORCH-01] Director Desk (Zone: Exec)
                      </div>
                      <div className="rounded-lg border border-wire-green/40 bg-wire-green/10 px-3 py-2 font-mono text-xs text-wire-green">
                        [ARCH-02] Staff Architect (Zone: Bullpen)
                      </div>
                      <div className="rounded-lg border border-wire-amber/40 bg-wire-amber/10 px-3 py-2 font-mono text-xs text-wire-amber">
                        [SEC-05] Zero-Trust CSO (Zone: Security)
                      </div>
                      <div className="rounded-lg border border-wire-purple/40 bg-wire-purple/10 px-3 py-2 font-mono text-xs text-wire-purple">
                        [QA-08] Red-Team QA (Zone: Conference)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeModule === 'TOKENS' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-xs">
                    <span className="text-wire-green font-bold">ACTIVE DESIGN TOKEN ATELIER</span>
                    <span className="text-fg-muted">ZERO HEX HARDCODE</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setTokenColorSample('CYAN')}
                      className={`p-3 rounded-lg border text-left font-mono text-xs transition-all ${
                        tokenColorSample === 'CYAN' ? 'border-accent bg-accent/15 text-accent' : 'border-line text-fg-muted'
                      }`}
                    >
                      <span className="block font-bold">--color-accent</span>
                      <span className="text-[10px]">#00f2fe (Electric Cyan)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTokenColorSample('EMERALD')}
                      className={`p-3 rounded-lg border text-left font-mono text-xs transition-all ${
                        tokenColorSample === 'EMERALD' ? 'border-wire-green bg-wire-green/15 text-wire-green' : 'border-line text-fg-muted'
                      }`}
                    >
                      <span className="block font-bold">--color-wire-green</span>
                      <span className="text-[10px]">#10b981 (Emerald Pass)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTokenColorSample('AMBER')}
                      className={`p-3 rounded-lg border text-left font-mono text-xs transition-all ${
                        tokenColorSample === 'AMBER' ? 'border-wire-amber bg-wire-amber/15 text-wire-amber' : 'border-line text-fg-muted'
                      }`}
                    >
                      <span className="block font-bold">--color-wire-amber</span>
                      <span className="text-[10px]">#f59e0b (Amber Gate)</span>
                    </button>
                  </div>
                  <div className="rounded-lg border border-line bg-bg-surface p-4 font-mono text-xs text-fg leading-relaxed">
                    <code>
                      :root &#123; --color-bg: #09090b; --color-fg: #f4f4f7; --color-accent: {tokenColorSample === 'CYAN' ? '#00f2fe' : tokenColorSample === 'EMERALD' ? '#10b981' : '#f59e0b'}; &#125;
                    </code>
                  </div>
                </div>
              )}

              {activeModule === 'KINETIC' && (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-xs">
                    <span className="text-wire-amber font-bold">SPRING MOTION INTERACTION TESTER</span>
                    <span className="text-wire-green">120 FPS NATIVE</span>
                  </div>
                  <div className="p-8 rounded-lg bg-bg-surface border border-line flex flex-col items-center justify-center">
                    <span className="font-display text-5xl font-bold tabular-nums text-wire-amber">
                      {kineticCounter}
                    </span>
                    <p className="mt-2 font-mono text-xs text-fg-muted">Live State Reactive Dispatch</p>
                    <button
                      type="button"
                      onClick={() => setKineticCounter((c) => c + 1)}
                      className="mt-4 rounded-full bg-wire-amber px-6 py-2.5 font-sans text-xs font-bold text-black shadow-lg hover:brightness-110 active:scale-90 transition-all duration-150"
                    >
                      Trigger Spring Pulse (+1)
                    </button>
                  </div>
                </div>
              )}

              {activeModule === 'DAG' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-2 font-mono text-xs">
                    <span className="text-wire-purple font-bold">OPENAI DOTS DAG WIRE SCHEDULER</span>
                    <span className="text-accent font-bold">99.3% CONSENSUS</span>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between rounded border border-line bg-bg-surface p-2.5">
                      <span className="text-accent">AG-201 // Architecture Contract</span>
                      <span className="text-wire-green">VERIFIED (100%)</span>
                    </div>
                    <div className="flex items-center justify-between rounded border border-line bg-bg-surface p-2.5">
                      <span className="text-wire-cyan">AG-202 // Sandbox Implementation</span>
                      <span className="text-wire-green">VERIFIED (100%)</span>
                    </div>
                    <div className="flex items-center justify-between rounded border border-line bg-bg-surface p-2.5">
                      <span className="text-wire-purple">AG-203 // Zero-Trust Security Gate</span>
                      <span className="text-wire-green">AUDIT PASS (99.7%)</span>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setDagStep((s) => (s >= 3 ? 1 : s + 1))}
                      className="rounded border border-line px-3 py-1 font-mono text-xs text-fg hover:border-accent"
                    >
                      Cycle DAG Step (Step {dagStep}/3)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
