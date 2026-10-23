import React, { useEffect, useRef, useState } from 'react';
import { Sliders, RotateCcw, Activity } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export function AtelierLabSimulator() {
  const { t } = useAtelier();

  // Interactive controls
  const [targetFps, setTargetFps] = useState<number>(120);
  const [nodeCount, setNodeCount] = useState<number>(45);
  const [paletteTheme, setPaletteTheme] = useState<'OBSIDIAN' | 'SLATE' | 'TITANIUM' | 'ALABASTER'>('OBSIDIAN');
  const [actualFps, setActualFps] = useState<number>(120);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Palette color definitions
  const themeColors = {
    OBSIDIAN: { node: '#00f2fe', line: 'rgba(0, 242, 254, 0.25)', bg: '#080a0f' },
    SLATE: { node: '#38bdf8', line: 'rgba(56, 189, 248, 0.25)', bg: '#0f172a' },
    TITANIUM: { node: '#f59e0b', line: 'rgba(245, 158, 11, 0.25)', bg: '#171410' },
    ALABASTER: { node: '#10b981', line: 'rgba(16, 185, 129, 0.25)', bg: '#061a14' },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 720);
    const height = (canvas.height = 360);

    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2.5 + 1.5,
      });
    }

    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const loop = (now: number) => {
      // Throttle if targetFps is below 120
      const elapsed = now - lastTime;
      const minInterval = 1000 / targetFps;

      if (elapsed >= minInterval) {
        lastTime = now - (elapsed % minInterval);
        frameCount++;

        if (now - fpsTimer >= 500) {
          setActualFps(Math.round((frameCount * 1000) / (now - fpsTimer)));
          frameCount = 0;
          fpsTimer = now;
        }

        const colors = themeColors[paletteTheme];
        ctx.fillStyle = colors.bg;
        ctx.fillRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          a.x += a.vx;
          a.y += a.vy;

          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;

          ctx.fillStyle = colors.node;
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 110) {
              ctx.strokeStyle = colors.line;
              ctx.lineWidth = 1 - dist / 110;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [targetFps, nodeCount, paletteTheme]);

  const handleReset = () => {
    setTargetFps(120);
    setNodeCount(45);
    setPaletteTheme('OBSIDIAN');
  };

  return (
    <section id="simulator" className="scroll-mt-24 bg-bg-surface/30 px-5 py-24 md:px-12 lg:px-20 border-t border-line">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent font-bold">
              {t.simulator.tag}
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl text-fg font-normal leading-tight">
              {t.simulator.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base font-sans text-fg-muted leading-relaxed">
              {t.simulator.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 self-start md:self-auto rounded-full border border-line bg-bg px-4 py-2 font-mono text-xs text-fg hover:border-accent transition-colors"
          >
            <RotateCcw className="size-3 text-accent" />
            <span>{t.simulator.reset}</span>
          </button>
        </div>

        {/* Simulator Grid: Controls Left, Live Canvas Right */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-5 rounded-2xl border border-line-strong bg-bg-elevated p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <Sliders className="size-4 text-accent" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-fg">
                Runtime Control Matrix
              </span>
            </div>

            {/* Target FPS Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-fg-muted">{t.simulator.controlFps}</span>
                <span className="font-bold text-accent">{targetFps} FPS</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="30"
                value={targetFps}
                onChange={(e) => setTargetFps(Number(e.target.value))}
                className="mt-2 w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-fg-faint mt-1">
                <span>30 FPS</span>
                <span>60 FPS</span>
                <span>120 FPS</span>
              </div>
            </div>

            {/* Node Density Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-fg-muted">{t.simulator.controlDensity}</span>
                <span className="font-bold text-wire-green">{nodeCount} Nodes</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                step="5"
                value={nodeCount}
                onChange={(e) => setNodeCount(Number(e.target.value))}
                className="mt-2 w-full accent-wire-green cursor-pointer"
              />
            </div>

            {/* Architectural Theme Selector */}
            <div>
              <span className="block font-mono text-xs text-fg-muted mb-2">
                {t.simulator.controlTheme}
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setPaletteTheme('OBSIDIAN')}
                  className={`rounded-lg p-2.5 text-left border transition-all ${
                    paletteTheme === 'OBSIDIAN'
                      ? 'border-accent bg-accent/15 text-accent font-bold'
                      : 'border-line text-fg-muted hover:text-fg'
                  }`}
                >
                  {t.simulator.themeObsidian}
                </button>
                <button
                  type="button"
                  onClick={() => setPaletteTheme('SLATE')}
                  className={`rounded-lg p-2.5 text-left border transition-all ${
                    paletteTheme === 'SLATE'
                      ? 'border-[#38bdf8] bg-[#38bdf8]/15 text-[#38bdf8] font-bold'
                      : 'border-line text-fg-muted hover:text-fg'
                  }`}
                >
                  {t.simulator.themeSlate}
                </button>
                <button
                  type="button"
                  onClick={() => setPaletteTheme('TITANIUM')}
                  className={`rounded-lg p-2.5 text-left border transition-all ${
                    paletteTheme === 'TITANIUM'
                      ? 'border-wire-amber bg-wire-amber/15 text-wire-amber font-bold'
                      : 'border-line text-fg-muted hover:text-fg'
                  }`}
                >
                  {t.simulator.themeTitanium}
                </button>
                <button
                  type="button"
                  onClick={() => setPaletteTheme('ALABASTER')}
                  className={`rounded-lg p-2.5 text-left border transition-all ${
                    paletteTheme === 'ALABASTER'
                      ? 'border-wire-green bg-wire-green/15 text-wire-green font-bold'
                      : 'border-line text-fg-muted hover:text-fg'
                  }`}
                >
                  {t.simulator.themeAlabaster}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Live Canvas Column */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between font-mono text-xs text-fg-muted mb-2 px-1">
              <span className="flex items-center gap-1.5">
                <Activity className="size-3.5 text-accent" />
                <span>Live WebGL / Canvas Viewport</span>
              </span>
              <span className="font-bold text-wire-green">
                Output: {actualFps} FPS Real-Time
              </span>
            </div>
            <div className="w-full rounded-2xl border border-line-strong bg-black p-2 shadow-2xl overflow-hidden">
              <canvas
                ref={canvasRef}
                width={720}
                height={360}
                className="w-full h-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
