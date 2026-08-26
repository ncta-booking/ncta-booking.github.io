import React, { useEffect } from 'react';
import { LEDProp, PerformanceItem } from '../types';
import { useI18n } from '../i18n/LanguageContext';
import { X, Sparkles, Cpu, Battery, Radio, Shield, MapPin, Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

interface LightboxModalProps {
  performance: PerformanceItem | null;
  prop: LEDProp | null;
  onClose: () => void;
  onInquire: (title: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  performance,
  prop,
  onClose,
  onInquire,
}) => {
  const { t } = useI18n();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!performance && !prop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#12121e] border border-purple-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 text-slate-100 p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PERFORMANCE MODAL CONTENT */}
        {performance && (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <img
                src={performance.image}
                alt={performance.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-white border border-white/15 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00e5ff]" />
                  {performance.location}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f00ac0]/80 backdrop-blur-md text-xs font-mono text-white font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {performance.duration}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{performance.date}</span>
                <span>•</span>
                <span className="uppercase text-[#00e5ff]">{performance.category}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                {performance.title}
              </h3>
              <p className="text-sm font-medium text-[#f00ac0] mt-1 mb-4">
                {performance.subtitle}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {performance.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                {t('lightbox.highlightsTitle')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {performance.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Props Used */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                {t('lightbox.propsUsedTitle')}
              </span>
              <div className="flex flex-wrap gap-2">
                {performance.propsUsed.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#19192b] border border-purple-500/30 text-xs font-mono text-[#00e5ff]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300"
              >
                {t('lightbox.close')}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onInquire(performance.title);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] text-white text-xs font-bold font-display uppercase tracking-wider shadow-[0_0_15px_rgba(240,10,192,0.4)]"
              >
                {t('lightbox.bookShow')}
              </button>
            </div>
          </div>
        )}

        {/* PROP DETAILS MODAL CONTENT */}
        {prop && (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <img
                src={prop.image}
                alt={prop.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase text-white shadow-md"
                  style={{ backgroundColor: prop.accentColor }}
                >
                  {prop.category.toUpperCase()}
                </span>
                {prop.badge && (
                  <span className="px-2.5 py-1 rounded-full bg-[#00ff88] text-black text-xs font-mono font-bold uppercase shadow-sm">
                    {prop.badge}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                {prop.name}
              </h3>
              <p className="text-sm font-mono text-[#00e5ff] mt-0.5 mb-2">
                {prop.vietnameseName}
              </p>
              <p className="text-xs text-purple-300 font-medium italic mb-3">
                "{prop.tagline}"
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {prop.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#00e5ff]" />
                <span>{t('lightbox.specsTitle')}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                  <strong className="text-white">LEDs:</strong> {prop.specs.ledCount}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
                  <strong className="text-white">{t('lightbox.specBattery')}</strong> {prop.specs.batteryLife}
                </div>
                {prop.specs.resolution && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-[#f00ac0]" />
                    <strong className="text-white">{t('lightbox.specResolution')}</strong> {prop.specs.resolution}
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#ff8a00]" />
                  <strong className="text-white">{t('lightbox.specControl')}</strong> {prop.specs.controlSystem}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <strong className="text-white">{t('lightbox.specWeight')}</strong> {prop.specs.weight}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <strong className="text-white">{t('lightbox.specDurability')}</strong> {prop.specs.durability}
                </div>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                {t('lightbox.featuresTitle')}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {prop.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal for */}
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-slate-300">
              <span className="font-semibold text-purple-200 font-mono">{t('lightbox.idealFor')} </span>
              {prop.idealFor}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300"
              >
                {t('lightbox.close')}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onInquire(prop.name);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] text-white text-xs font-bold font-display uppercase tracking-wider shadow-[0_0_20px_rgba(240,10,192,0.4)] flex items-center gap-2"
              >
                <span>{t('lightbox.inquire')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
