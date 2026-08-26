import React, { useState, useEffect, useRef } from 'react';
import { getSimulatorModes } from '../data/mockData';
import { useI18n } from '../i18n/LanguageContext';
import { Sparkles, Sliders, RefreshCw, Zap, Play, Pause, Download, Wand2 } from 'lucide-react';

export const InteractiveVisualizer: React.FC = () => {
  const { t, lang } = useI18n();
  const SIMULATOR_MODES = getSimulatorModes(lang);
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);
  const [propType, setPropType] = useState<'poi' | 'staff' | 'hoop' | 'fan'>('poi');
  const [speed, setSpeed] = useState(1.2);
  const [isPlaying, setIsPlaying] = useState(true);
  const [trailLength, setTrailLength] = useState(35);
  const [glowIntensity, setGlowIntensity] = useState(25);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  // Only animate while the canvas is on-screen (it sits well below the fold).
  const isVisibleRef = useRef(false);

  const currentMode = SIMULATOR_MODES[selectedModeIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };

    window.addEventListener('resize', handleResize);

    const trails: { x: number; y: number; color: string; size: number; alpha: number }[] = [];

    const render = () => {
      // Skip all drawing when scrolled out of view or the tab is hidden.
      if (!isVisibleRef.current || document.hidden) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      if (isPlaying) {
        angleRef.current += 0.035 * speed;
      }

      // Smooth trailing dark background fade
      ctx.fillStyle = 'rgba(10, 10, 15, 0.16)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const angle = angleRef.current;
      const colors = currentMode.colors;

      // Compute points based on prop geometry
      const newPoints: { x: number; y: number; color: string; size: number }[] = [];

      if (propType === 'poi') {
        // Double Poi spinning around center in 8-pattern / circle
        const radius1 = 110;
        const radius2 = 65;

        // Left Hand Poi
        const hand1X = centerX - 80 + Math.sin(angle * 0.7) * 20;
        const hand1Y = centerY + Math.cos(angle * 0.5) * 20;
        const poi1X = hand1X + Math.cos(angle * 2.2) * radius1;
        const poi1Y = hand1Y + Math.sin(angle * 2.2) * radius1;

        // Right Hand Poi
        const hand2X = centerX + 80 - Math.sin(angle * 0.7) * 20;
        const hand2Y = centerY - Math.cos(angle * 0.5) * 20;
        const poi2X = hand2X + Math.cos(-angle * 2.2) * radius1;
        const poi2Y = hand2Y + Math.sin(-angle * 2.2) * radius1;

        newPoints.push({ x: poi1X, y: poi1Y, color: colors[0], size: 5 });
        newPoints.push({ x: poi2X, y: poi2Y, color: colors[1 % colors.length], size: 5 });
        
        // Mid tail LED
        newPoints.push({
          x: hand1X + Math.cos(angle * 2.2) * radius2,
          y: hand1Y + Math.sin(angle * 2.2) * radius2,
          color: colors[2 % colors.length],
          size: 3
        });
        newPoints.push({
          x: hand2X + Math.cos(-angle * 2.2) * radius2,
          y: hand2Y + Math.sin(-angle * 2.2) * radius2,
          color: colors[2 % colors.length],
          size: 3
        });
      } else if (propType === 'staff') {
        // Dragon Staff (Center staff with 6 rotating spokes)
        const staffLength = 130;
        const headRadius = 45;

        for (let i = -1; i <= 1; i += 2) {
          const endX = centerX + Math.cos(angle) * (staffLength * i);
          const endY = centerY + Math.sin(angle) * (staffLength * i);

          newPoints.push({ x: endX, y: endY, color: colors[0], size: 4 });

          // Spokes on each end
          for (let s = 0; s < 4; s++) {
            const spokeAngle = angle * 3.5 + (s * Math.PI) / 2;
            const spokeX = endX + Math.cos(spokeAngle) * headRadius;
            const spokeY = endY + Math.sin(spokeAngle) * headRadius;
            newPoints.push({
              x: spokeX,
              y: spokeY,
              color: colors[(s + 1) % colors.length],
              size: 3.5
            });
          }
        }
      } else if (propType === 'hoop') {
        // Smart LED Hoop (Rotating ellipse with multiple glowing nodes)
        const hoopRadiusX = 120 + Math.sin(angle * 1.5) * 15;
        const hoopRadiusY = 90 + Math.cos(angle * 1.5) * 15;
        const nodeCount = 12;

        for (let n = 0; n < nodeCount; n++) {
          const nodeAngle = angle * 1.8 + (n * Math.PI * 2) / nodeCount;
          const nodeX = centerX + Math.cos(nodeAngle) * hoopRadiusX;
          const nodeY = centerY + Math.sin(nodeAngle) * hoopRadiusY;
          newPoints.push({
            x: nodeX,
            y: nodeY,
            color: colors[n % colors.length],
            size: 3.8
          });
        }
      } else if (propType === 'fan') {
        // Cyber Silk Fans (Graceful waving arches)
        const fanCount = 8;
        const fanSpread = Math.PI * 0.7;

        for (let side = -1; side <= 1; side += 2) {
          const baseHandX = centerX + side * 90;
          const baseHandY = centerY + 30;

          for (let f = 0; f < fanCount; f++) {
            const fanAngle =
              side * (Math.PI / 2) +
              Math.sin(angle * 2 + side) * 0.4 +
              ((f - fanCount / 2) / fanCount) * fanSpread;
            const rayLength = 90 + f * 5;
            const fanX = baseHandX + Math.cos(fanAngle) * rayLength;
            const fanY = baseHandY + Math.sin(fanAngle) * rayLength;

            newPoints.push({
              x: fanX,
              y: fanY,
              color: colors[f % colors.length],
              size: 3.5
            });
          }
        }
      }

      // Add points to trails
      newPoints.forEach((pt) => {
        trails.push({
          x: pt.x,
          y: pt.y,
          color: pt.color,
          size: pt.size,
          alpha: 1.0
        });
      });

      // Keep trail within limits
      const maxTrails = trailLength * (propType === 'staff' ? 12 : 8);
      if (trails.length > maxTrails) {
        trails.splice(0, trails.length - maxTrails);
      }

      // Draw trails
      for (let i = 0; i < trails.length; i++) {
        const tr = trails[i];
        tr.alpha *= 0.96;

        if (tr.alpha > 0.02) {
          ctx.beginPath();
          ctx.arc(tr.x, tr.y, tr.size * tr.alpha, 0, Math.PI * 2);
          ctx.fillStyle = tr.color;
          ctx.globalAlpha = tr.alpha;
          ctx.shadowBlur = glowIntensity;
          ctx.shadowColor = tr.color;
          ctx.fill();
        }
      }

      // Draw main focal points
      newPoints.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size + 1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.9;
        ctx.shadowBlur = glowIntensity * 1.5;
        ctx.shadowColor = pt.color;
        ctx.fill();
      });

      // Reset context state
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [selectedModeIndex, propType, speed, isPlaying, trailLength, glowIntensity]);

  // Track whether the canvas is on-screen so the render loop can idle when it isn't.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="simulator" className="relative py-24 bg-[#0d0d15] border-t border-white/5 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#f00ac0]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#00e5ff]/20 to-[#f00ac0]/20 border border-[#00e5ff]/40 text-[#00e5ff] text-xs font-mono tracking-widest uppercase mb-3">
            <Wand2 className="w-3.5 h-3.5" />
            <span>{t('visualizer.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            {t('visualizer.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#8b2fe8] to-[#f00ac0]">{t('visualizer.titleHighlight')}</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {t('visualizer.subtitle')}
          </p>
        </div>

        {/* Visualizer Interactive Stage Box */}
        <div className="rounded-3xl bg-[#12121e] border border-purple-500/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12">
          
          {/* Canvas Viewport */}
          <div className="lg:col-span-8 relative bg-[#09090e] flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-crosshair"
            />

            {/* Top Viewport Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                {propType.toUpperCase()} SIMULATOR
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-[11px] font-mono text-purple-200 backdrop-blur-md hidden sm:inline">
                {currentMode.name}
              </span>
            </div>

            {/* Viewport Play / Pause Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-xl bg-black/80 border border-white/15 text-white hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all backdrop-blur-md"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={() => {
                    angleRef.current = 0;
                  }}
                  className="p-2.5 rounded-xl bg-black/80 border border-white/15 text-slate-300 hover:text-white transition-all backdrop-blur-md"
                  title={t('visualizer.resetTitle')}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400 bg-black/70 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                <span>FPS: 60 | {t('visualizer.trailViewport')}: {trailLength}</span>
              </div>
            </div>
          </div>

          {/* Controls & Configuration Sidebar */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-[#151524] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* 1. Prop Selector */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>{t('visualizer.step1')}</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'poi', label: 'Visual Poi' },
                    { id: 'staff', label: 'Dragon Staff' },
                    { id: 'hoop', label: 'LED Hoop' },
                    { id: 'fan', label: 'Silk Fans' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPropType(item.id as any)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium font-mono transition-all text-center ${
                        propType === item.id
                          ? 'bg-gradient-to-r from-[#f00ac0] to-[#8b2fe8] text-white font-bold shadow-[0_0_15px_rgba(240,10,192,0.4)]'
                          : 'bg-[#1e1e30] text-slate-300 hover:bg-[#282840] border border-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Color Mode Selector */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#f00ac0]" />
                  <span>{t('visualizer.step2')}</span>
                </label>

                <div className="space-y-2">
                  {SIMULATOR_MODES.map((mode, idx) => {
                    const isSelected = selectedModeIndex === idx;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setSelectedModeIndex(idx)}
                        className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[#222238] border-[#00e5ff] text-white shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                            : 'bg-[#1a1a2b] border-white/5 text-slate-300 hover:bg-[#222238]'
                        }`}
                      >
                        <span className="font-semibold">{mode.name}</span>
                        <div className="flex items-center gap-1">
                          {mode.colors.map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: c, boxShadow: `0 0 6px ${c}` }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Speed & Glow Slider */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>{t('visualizer.speedLabel')}</span>
                    <span className="text-[#00e5ff] font-bold">{speed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full accent-[#00e5ff] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>{t('visualizer.trailLabel')}</span>
                    <span className="text-[#f00ac0] font-bold">{trailLength}</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="1"
                    value={trailLength}
                    onChange={(e) => setTrailLength(parseInt(e.target.value))}
                    className="w-full accent-[#f00ac0] cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Booking action with custom preset */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href="#contact"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] text-white font-display font-bold text-xs tracking-wider uppercase text-center block shadow-[0_0_20px_rgba(240,10,192,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all hover:scale-102"
              >
                {t('visualizer.bookBtn')}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
