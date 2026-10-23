import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A' ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'SELECT' ||
        target?.closest('button') ||
        target?.closest('a')
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth animation loop for lagging ring
    let animId: number;
    let currentX = -100;
    let currentY = -100;

    const loop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailerPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center sharp dot */}
      <div
        className="pointer-events-none fixed z-[90] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg mix-blend-difference transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHoveringInteractive ? 0 : 1})`,
        }}
      />
      {/* Lagging trailing ring */}
      <div
        className={`pointer-events-none fixed z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/70 mix-blend-difference transition-all duration-150 ease-out ${
          isHoveringInteractive
            ? 'size-12 bg-fg/15 border-fg'
            : 'size-8 border-fg/50'
        }`}
        style={{
          left: `${trailerPos.x}px`,
          top: `${trailerPos.y}px`,
        }}
      />
    </>
  );
}
