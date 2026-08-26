import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../data/mockData';
import { useI18n } from '../i18n/LanguageContext';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, lang } = useI18n();
  const TESTIMONIALS_DATA = getTestimonials(lang);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const currentTestimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 bg-[#0d0d15] border-t border-white/5 overflow-hidden">
      {/* Background Neon Blurs */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#f00ac0]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#00e5ff]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-[#f00ac0] text-xs font-mono tracking-widest uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('testimonials.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            {t('testimonials.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#8b2fe8] to-[#f00ac0]">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonial Showcase Box */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-[#12121e] border border-purple-500/30 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            
            {/* Top Quote Icon & Rating */}
            <div className="flex items-center justify-between mb-8">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md"
                style={{
                  backgroundColor: `${currentTestimonial.accentGlow}20`,
                  borderColor: `${currentTestimonial.accentGlow}50`,
                  color: currentTestimonial.accentGlow
                }}
              >
                <Quote className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Testimonial Content Text */}
            <blockquote className="text-base sm:text-xl text-slate-100 font-light leading-relaxed mb-8 italic">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author Profile + Event Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.clientName}
                  loading="lazy"
                  decoding="async"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover border-2 shadow-md"
                  style={{ borderColor: currentTestimonial.accentGlow }}
                />
                <div>
                  <h4 className="text-base font-display font-bold text-white">
                    {currentTestimonial.clientName}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {currentTestimonial.clientRole} • <span className="text-slate-300">{currentTestimonial.organization}</span>
                  </p>
                </div>
              </div>

              <span
                className="inline-flex items-center self-start sm:self-center px-3.5 py-1 rounded-full text-xs font-mono font-medium border"
                style={{
                  backgroundColor: `${currentTestimonial.accentGlow}15`,
                  borderColor: `${currentTestimonial.accentGlow}40`,
                  color: currentTestimonial.accentGlow
                }}
              >
                {currentTestimonial.event}
              </span>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="absolute -bottom-5 right-8 flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-3 rounded-full bg-[#1c1c2e] hover:bg-[#282840] border border-white/15 text-white hover:text-[#00e5ff] transition-all shadow-xl hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-3 rounded-full bg-[#1c1c2e] hover:bg-[#282840] border border-white/15 text-white hover:text-[#00e5ff] transition-all shadow-xl hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* Carousel Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-[#f00ac0] to-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.6)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
