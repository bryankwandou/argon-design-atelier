import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export function AtelierHero() {
  const { t } = useAtelier();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight * 0.95);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight * 0.95;
    };
    window.addEventListener('resize', handleResize);

    // Subtle floating nodes
    const nodeCount = 38;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 3;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial subtle glow around mouse
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 380);
      gradient.addColorStop(0, 'rgba(0, 242, 254, 0.06)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Connect near nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        // Draw node
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-5 pt-28 pb-16 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Interactive Spatial Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Pre-title Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-surface/80 px-3.5 py-1.5 backdrop-blur-md">
          <span className="size-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-fg-muted">
            {t.hero.badge}
          </span>
        </div>

        {/* Editorial Headline */}
        <h1 className="mt-8 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-[-0.03em] text-fg font-normal">
          {t.hero.headlinePrefix}{' '}
          <span className="italic text-accent underline decoration-accent/30 decoration-wavy decoration-1 underline-offset-8">
            {t.hero.headlineHighlight}
          </span>
        </h1>

        {/* High-density Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg font-sans text-fg-muted leading-relaxed">
          {t.hero.subheadline}
        </p>

        {/* Dual CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollTo('partnership')}
            className="inline-flex items-center gap-2 rounded-full bg-fg px-7 py-3.5 font-sans text-xs sm:text-sm font-semibold text-bg shadow-xl hover:brightness-110 active:scale-95 transition-all"
          >
            <span>{t.hero.ctaPrimary}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo('modules')}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-surface/60 px-7 py-3.5 font-sans text-xs sm:text-sm font-semibold text-fg backdrop-blur-md hover:border-accent hover:text-accent active:scale-95 transition-all"
          >
            <span>{t.hero.ctaSecondary}</span>
          </button>
        </div>

        {/* Live Stat Badges Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-line pt-8">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-line bg-bg-elevated/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-accent">
              <Activity className="size-4" aria-hidden="true" />
              <span className="font-mono text-base font-bold">120 FPS</span>
            </div>
            <span className="mt-1 font-sans text-[11px] text-fg-muted">{t.hero.statFps}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-line bg-bg-elevated/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-wire-green">
              <ShieldCheck className="size-4" aria-hidden="true" />
              <span className="font-mono text-base font-bold">Zero-Trust</span>
            </div>
            <span className="mt-1 font-sans text-[11px] text-fg-muted">{t.hero.statSecurity}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-line bg-bg-elevated/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-wire-amber">
              <Cpu className="size-4" aria-hidden="true" />
              <span className="font-mono text-base font-bold">10 Agents</span>
            </div>
            <span className="mt-1 font-sans text-[11px] text-fg-muted">{t.hero.statAgents}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-line bg-bg-elevated/40 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-wire-purple">
              <Sparkles className="size-4" aria-hidden="true" />
              <span className="font-mono text-base font-bold">WCAG AA</span>
            </div>
            <span className="mt-1 font-sans text-[11px] text-fg-muted">{t.hero.statWcag}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
