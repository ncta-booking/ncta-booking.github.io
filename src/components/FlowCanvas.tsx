import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

interface TrailPoint {
  x: number;
  y: number;
  color: string;
  alpha: number;
  size: number;
}

export const FlowCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Users who prefer reduced motion get the static gradient background only.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Skip the ambient background animation entirely on phones/tablets (coarse
    // pointer). It was the main source of jank/lag on mobile and adds little on
    // a small screen. The <canvas> stays mounted (transparent) so hydration is
    // untouched — we simply never start the render loop or attach listeners.
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#f00ac0', '#8b2fe8', '#00e5ff', '#ff8a00', '#00ff88'];
    const particles: Particle[] = [];
    const trailPoints: TrailPoint[] = [];

    // Initialize floating ambient particles (kept modest for main-thread cost)
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
        decay: Math.random() * 0.003 + 0.001
      });
    }

    // Interactive mouse trail — auto-orbits while idle.
    let mouseX = width / 2;
    let mouseY = height / 3;
    let autoAngle = 0;
    let userInteracted = false;

    const handlePointerMove = (e: MouseEvent) => {
      userInteracted = true;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      trailPoints.push({
        x: mouseX,
        y: mouseY,
        color: randomColor,
        alpha: 0.8,
        size: Math.random() * 4 + 2
      });

      if (trailPoints.length > 50) {
        trailPoints.shift();
      }
    };

    // passive: never blocks the main thread / scrolling.
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Every content section paints an opaque background over this fixed canvas,
    // so it's only actually visible on the first screen (the hero). Pause the
    // loop once the hero scrolls out of view to stop burning CPU while reading.
    let onScreen = true;
    let io: IntersectionObserver | null = null;
    const hero = document.getElementById('hero');
    if (hero && typeof IntersectionObserver === 'function') {
      io = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      io.observe(hero);
    }

    // Cap to ~30fps and pause when the tab is hidden or the hero is off-screen.
    const FRAME_MS = 1000 / 30;
    let lastDraw = 0;

    const render = (now = 0) => {
      animationFrameId = requestAnimationFrame(render);
      if (document.hidden || !onScreen || now - lastDraw < FRAME_MS) return;
      lastDraw = now;

      // Create a smooth trailing dark fade
      ctx.fillStyle = 'rgba(10, 10, 15, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Auto-orbiting flow light when user is idle
      if (!userInteracted) {
        autoAngle += 0.02;
        const centerX = width / 2;
        const centerY = Math.min(height * 0.45, 450);
        const radiusX = Math.min(width * 0.35, 300);
        const radiusY = Math.min(height * 0.2, 160);

        const orb1X = centerX + Math.cos(autoAngle) * radiusX;
        const orb1Y = centerY + Math.sin(autoAngle * 2) * radiusY;

        const orb2X = centerX + Math.cos(autoAngle + Math.PI) * radiusX;
        const orb2Y = centerY + Math.sin((autoAngle + Math.PI) * 2) * radiusY;

        trailPoints.push({
          x: orb1X,
          y: orb1Y,
          color: colors[Math.floor(Math.abs(Math.sin(autoAngle)) * colors.length) % colors.length],
          alpha: 0.7,
          size: 3.5
        });

        trailPoints.push({
          x: orb2X,
          y: orb2Y,
          color: colors[Math.floor(Math.abs(Math.cos(autoAngle)) * colors.length) % colors.length],
          alpha: 0.7,
          size: 3.5
        });

        if (trailPoints.length > 60) {
          trailPoints.splice(0, 2);
        }
      }

      ctx.shadowBlur = 12;

      // Draw ambient floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      // Draw interactive flow trail
      if (trailPoints.length > 1) {
        for (let i = 0; i < trailPoints.length; i++) {
          const pt = trailPoints[i];
          pt.alpha *= 0.94; // fade out gradually

          if (pt.alpha > 0.05) {
            ctx.shadowBlur = 18;
            ctx.shadowColor = pt.color;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size * (pt.alpha * 1.5), 0, Math.PI * 2);
            ctx.fillStyle = pt.color;
            ctx.globalAlpha = pt.alpha;
            ctx.fill();

            // Connect lines between close points for ribbon flow effect
            if (i > 0) {
              const prevPt = trailPoints[i - 1];
              const dist = Math.hypot(pt.x - prevPt.x, pt.y - prevPt.y);
              if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(prevPt.x, prevPt.y);
                ctx.lineTo(pt.x, pt.y);
                ctx.strokeStyle = pt.color;
                ctx.lineWidth = pt.size * pt.alpha;
                ctx.globalAlpha = pt.alpha * 0.6;
                ctx.shadowColor = pt.color;
                ctx.stroke();
              }
            }
          }
        }
      }

      // Reset global alpha & shadows
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      if (io) io.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="flow-canvas"
      className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000"
    />
  );
};
