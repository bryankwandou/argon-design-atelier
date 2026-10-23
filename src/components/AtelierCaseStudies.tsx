import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Cloud, Database, Bot, X } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export function AtelierCaseStudies() {
  const { t } = useAtelier();
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const cases = [
    {
      id: 1,
      title: t.showcase.case1Title,
      category: t.showcase.case1Category,
      desc: t.showcase.case1Desc,
      icon: ShieldCheck,
      color: 'text-wire-green',
      borderColor: 'border-wire-green/30',
      badge: 'FINTECH BANK-GRADE',
      metrics: ['120ms Signature Attestation', '0.00% Zero-Trust Leak', 'Role-Based Enclaves'],
      techStack: ['TypeScript', 'WebCrypto API', 'Tailwind Tokens', 'Rust WASM'],
    },
    {
      id: 2,
      title: t.showcase.case2Title,
      category: t.showcase.case2Category,
      desc: t.showcase.case2Desc,
      icon: Cloud,
      color: 'text-accent',
      borderColor: 'border-accent/30',
      badge: 'CLOUD NATIVE RUNTIME',
      metrics: ['4 Multi-Region Clusters', '120 FPS Topology Canvas', 'Sub-millisecond Latency'],
      techStack: ['WebGL / Canvas 2D', 'SSE Stream', 'Vite', 'React 19'],
    },
    {
      id: 3,
      title: t.showcase.case3Title,
      category: t.showcase.case3Category,
      desc: t.showcase.case3Desc,
      icon: Database,
      color: 'text-wire-amber',
      borderColor: 'border-wire-amber/30',
      badge: 'HIGH-VELOCITY PIPELINE',
      metrics: ['1.2M Events / Sec', 'Zero DOM Layout Reflow', 'Auto-Partition Sharding'],
      techStack: ['EventStream V2', 'Virtual DOM Bypass', 'IndexedDB Cache'],
    },
    {
      id: 4,
      title: t.showcase.case4Title,
      category: t.showcase.case4Category,
      desc: t.showcase.case4Desc,
      icon: Bot,
      color: 'text-wire-purple',
      borderColor: 'border-wire-purple/30',
      badge: 'AI MULTI-AGENT CORE',
      metrics: ['10 Floor Specialists', '99.3% Grok Council Consensus', 'Instant Sandbox Tape'],
      techStack: ['OpenAI Dots DAG', 'Gemini 4 Argon', 'HTML5 Isometric Canvas'],
    },
  ];

  return (
    <section id="showcase" className="scroll-mt-24 bg-bg px-5 py-24 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent font-bold">
            {t.showcase.tag}
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-5xl text-fg font-normal leading-tight">
            {t.showcase.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base font-sans text-fg-muted leading-relaxed">
            {t.showcase.description}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl border ${item.borderColor} bg-bg-elevated p-8 transition-all duration-300 hover:border-fg/40 hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-fg-faint">
                    {item.badge}
                  </span>
                  <div className={`p-2 rounded-xl bg-bg-surface ${item.color}`}>
                    <Icon className="size-5" />
                  </div>
                </div>

                <span className="mt-4 block font-mono text-xs font-semibold text-fg-muted">
                  {item.category}
                </span>

                <h3 className="mt-2 font-serif text-2xl md:text-3xl font-normal text-fg group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm font-sans text-fg-muted leading-relaxed">
                  {item.desc}
                </p>

                {/* Metrics Pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.metrics.map((m, idx) => (
                    <span
                      key={idx}
                      className="rounded-md border border-line bg-bg-surface px-2.5 py-1 font-mono text-[11px] text-fg/80"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Inspect Button */}
                <div className="mt-8 border-t border-line pt-4 flex justify-between items-center">
                  <span className="font-mono text-[11px] text-fg-faint">
                    Case Record #{String(item.id).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCase(item.id)}
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-fg hover:text-accent transition-colors"
                  >
                    <span>{t.showcase.viewDetails}</span>
                    <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal Inspection */}
      {selectedCase !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl border border-line-strong bg-bg-elevated p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              className="absolute right-5 top-5 rounded-full border border-line p-1.5 text-fg-muted hover:text-fg"
            >
              <X className="size-4" />
            </button>

            {(() => {
              const c = cases.find((x) => x.id === selectedCase);
              if (!c) return null;
              return (
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                    {c.badge} // SPECIFICATION
                  </span>
                  <h3 className="mt-2 font-serif text-3xl font-normal text-fg">{c.title}</h3>
                  <p className="mt-3 text-sm text-fg-muted leading-relaxed">{c.desc}</p>

                  <div className="mt-6 space-y-3 font-mono text-xs">
                    <span className="block text-fg-faint uppercase tracking-wider">
                      Verified Architectural Metrics:
                    </span>
                    <div className="space-y-1.5">
                      {c.metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-fg">
                          <span className="size-1.5 rounded-full bg-accent" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-line pt-4">
                    <span className="block font-mono text-xs text-fg-faint uppercase tracking-wider mb-2">
                      Core Technology Stack:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {c.techStack.map((tech, i) => (
                        <span key={i} className="rounded bg-accent/15 px-2.5 py-1 font-mono text-xs text-accent">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
