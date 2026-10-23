import React from 'react';
import { useAtelier } from '../context/AtelierContext';

export function AtelierFooter() {
  const { t } = useAtelier();

  return (
    <footer className="border-t border-line bg-bg px-5 py-12 md:px-12 lg:px-20 text-fg">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 32 32" className="size-7 text-accent" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.14" />
            <circle cx="16" cy="16" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="16" cy="16" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="16" cy="16" r="1.4" fill="currentColor" />
          </svg>
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-[0.24em] text-fg block">
              Antigravity Argon Atelier
            </span>
            <span className="font-mono text-[10px] text-fg-faint block">
              {t.footer.tagline}
            </span>
          </div>
        </div>

        {/* System Uptime Badge */}
        <div className="flex items-center gap-2 rounded-full border border-line bg-bg-elevated px-3 py-1 font-mono text-[11px] text-fg-muted">
          <span className="size-2 rounded-full bg-wire-green animate-pulse" />
          <span>{t.footer.uptime}</span>
        </div>

        {/* Copyright */}
        <div className="font-mono text-[11px] text-fg-faint text-right">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
