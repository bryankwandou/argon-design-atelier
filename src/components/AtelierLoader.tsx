import React, { useEffect, useState } from 'react';
import { useAtelier } from '../context/AtelierContext';

export function AtelierLoader({ onComplete }: { onComplete: () => void }) {
  const { t } = useAtelier();
  const [percent, setPercent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400; // 1.4s smooth loader

    const updateLoader = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // easeOutCubic curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(eased * 100);
      setPercent(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateLoader);
      } else {
        setTimeout(() => {
          setDismissed(true);
          onComplete();
        }, 220);
      }
    };

    const animId = requestAnimationFrame(updateLoader);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-6 py-8 text-fg transition-opacity duration-700 md:px-14 md:py-12 ${
        percent === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Brand Tag */}
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 32 32" className="size-8 text-accent" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.14" />
          <circle cx="16" cy="16" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="16" cy="16" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="1.4" fill="currentColor" />
        </svg>
        <span className="font-display text-sm font-bold uppercase tracking-[0.24em] text-fg">
          {t.loader.title}
        </span>
      </div>

      {/* Middle Text & Counter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
            {t.loader.subtitle}
          </span>
          <h2 className="mt-2 font-serif text-3xl md:text-5xl lg:text-6xl text-fg italic font-normal">
            Precision in every frame.
          </h2>
        </div>

        <div className="font-display text-6xl md:text-8xl lg:text-9xl font-semibold tabular-nums tracking-tighter text-fg">
          {String(percent).padStart(2, '0')}
        </div>
      </div>

      {/* Bottom Progress Line */}
      <div className="relative w-full h-[1px] bg-line overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 bg-accent transition-all duration-75 ease-out shadow-[0_0_12px_var(--color-accent)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
