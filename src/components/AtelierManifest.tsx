import React from 'react';
import { useAtelier } from '../context/AtelierContext';

export function AtelierManifest() {
  const { t } = useAtelier();

  return (
    <section id="manifest" className="scroll-mt-24 relative bg-bg-elevated px-5 py-28 md:px-12 lg:px-20 border-t border-line overflow-hidden">
      {/* Background radial accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent font-bold">
          {t.manifest.tag}
        </span>

        <blockquote className="mt-8 font-serif text-3xl sm:text-5xl md:text-6xl text-fg italic leading-[1.2] font-normal tracking-tight">
          &ldquo;{t.manifest.quote}&rdquo;
        </blockquote>

        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="h-px w-16 bg-accent mb-4" />
          <cite className="not-italic font-display text-sm font-bold uppercase tracking-[0.2em] text-fg">
            {t.manifest.author}
          </cite>
          <span className="mt-1 font-mono text-xs text-fg-muted">
            {t.manifest.role}
          </span>
        </div>
      </div>
    </section>
  );
}
