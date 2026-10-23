import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, ArrowRight, Menu, X } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export function AtelierNavbar() {
  const { t, locale, setLocale, theme, toggleTheme } = useAtelier();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300 ${
          scrolled
            ? 'border-line-strong bg-bg/75 backdrop-blur-lg shadow-xl shadow-black/20'
            : 'border-line bg-bg/40 backdrop-blur-md'
        }`}
      >
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 rounded-full py-1 pl-2 pr-3 text-fg transition-opacity hover:opacity-85"
        >
          <svg viewBox="0 0 32 32" className="size-7 text-accent" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.14" />
            <circle cx="16" cy="16" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="16" cy="16" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="16" cy="16" r="1.4" fill="currentColor" />
          </svg>
          <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-fg">
            Argon Atelier
          </span>
        </button>

        {/* Center Desktop Links */}
        <ul className="hidden md:flex items-center gap-1 font-sans text-xs font-medium text-fg-muted">
          <li>
            <button
              type="button"
              onClick={() => scrollToSection('modules')}
              className="rounded-full px-3 py-1.5 transition-colors hover:text-fg hover:bg-fg/5"
            >
              {t.nav.modules}
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToSection('simulator')}
              className="rounded-full px-3 py-1.5 transition-colors hover:text-fg hover:bg-fg/5"
            >
              {t.nav.simulator}
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToSection('showcase')}
              className="rounded-full px-3 py-1.5 transition-colors hover:text-fg hover:bg-fg/5"
            >
              {t.nav.showcase}
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToSection('manifest')}
              className="rounded-full px-3 py-1.5 transition-colors hover:text-fg hover:bg-fg/5"
            >
              {t.nav.manifest}
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToSection('partnership')}
              className="rounded-full px-3 py-1.5 transition-colors hover:text-fg hover:bg-fg/5"
            >
              {t.nav.contact}
            </button>
          </li>
        </ul>

        {/* Right Actions: Locale Toggle, Theme Toggle & CTA */}
        <div className="flex items-center gap-1.5">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLocale(locale === 'id' ? 'en' : 'id')}
            className="flex items-center gap-1 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] font-semibold text-fg-muted hover:text-fg hover:border-line-strong transition-colors"
            title="Ganti Bahasa / Switch Language"
          >
            <Globe className="size-3 text-accent" aria-hidden="true" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-line p-1.5 text-fg-muted hover:text-fg hover:border-line-strong transition-colors"
            title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
          >
            {theme === 'dark' ? (
              <Sun className="size-3.5 text-wire-amber" aria-hidden="true" />
            ) : (
              <Moon className="size-3.5 text-accent" aria-hidden="true" />
            )}
          </button>

          {/* CTA Button */}
          <button
            type="button"
            onClick={() => scrollToSection('partnership')}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-1.5 font-sans text-xs font-semibold text-bg shadow-sm hover:brightness-110 active:scale-95 transition-all"
          >
            <span>{t.nav.cta}</span>
            <ArrowRight className="size-3" aria-hidden="true" />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden rounded-full border border-line p-1.5 text-fg-muted hover:text-fg"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 z-50 rounded-2xl border border-line-strong bg-bg-elevated/95 p-6 backdrop-blur-xl shadow-2xl md:hidden">
          <ul className="space-y-4 font-sans text-sm font-semibold text-fg">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('modules')}
                className="block w-full text-left py-1 text-fg-muted hover:text-fg"
              >
                {t.nav.modules}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('simulator')}
                className="block w-full text-left py-1 text-fg-muted hover:text-fg"
              >
                {t.nav.simulator}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('showcase')}
                className="block w-full text-left py-1 text-fg-muted hover:text-fg"
              >
                {t.nav.showcase}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('manifest')}
                className="block w-full text-left py-1 text-fg-muted hover:text-fg"
              >
                {t.nav.manifest}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('partnership')}
                className="block w-full text-left py-1 text-fg-muted hover:text-fg"
              >
                {t.nav.contact}
              </button>
            </li>
          </ul>
          <div className="mt-6 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => scrollToSection('partnership')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 font-sans text-xs font-bold text-bg shadow-md"
            >
              <span>{t.nav.cta}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
