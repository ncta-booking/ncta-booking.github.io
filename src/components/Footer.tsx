import React from 'react';
import { Zap, Heart, Sparkles, ArrowUp, Instagram, Youtube, Facebook, Video, Mail, Globe } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07070a] border-t border-purple-500/20 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Background Top Gradient Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#f00ac0] to-[#00e5ff]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] p-[1.5px] shadow-[0_0_15px_rgba(240,10,192,0.4)]">
                <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#00e5ff]" />
                </div>
              </div>
              <span className="font-display font-black text-2xl tracking-wider text-white">
                N<span className="text-[#00e5ff]">C</span><span className="text-[#f00ac0]">TA</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#00e5ff]">
              <Globe className="w-4 h-4" />
              <span>Official Domain: ncta.vn</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              {t('footer.exploreTitle')}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#hero" className="hover:text-[#00e5ff] transition-colors">
                  {t('footer.linkHome')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#00e5ff] transition-colors">
                  {t('footer.linkAbout')}
                </a>
              </li>
              <li>
                <a href="#performances" className="hover:text-[#00e5ff] transition-colors">
                  {t('footer.linkPortfolio')}
                </a>
              </li>
              <li>
                <a href="#gear" className="hover:text-[#00e5ff] transition-colors">
                  {t('footer.linkGear')}
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-[#00e5ff] transition-colors">
                  {t('nav.stats')}
                </a>
              </li>
            </ul>
          </div>

          {/* Services & Gear */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              {t('footer.gearServicesTitle')}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#gear" className="hover:text-[#f00ac0] transition-colors">
                  Visual Pixel Poi HD
                </a>
              </li>
              <li>
                <a href="#gear" className="hover:text-[#f00ac0] transition-colors">
                  Smart Dragon Staff
                </a>
              </li>
              <li>
                <a href="#gear" className="hover:text-[#f00ac0] transition-colors">
                  HyperLoop LED Hoop
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#f00ac0] transition-colors">
                  {t('footer.linkPerformEvent')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#f00ac0] transition-colors">
                  {t('footer.linkCustom')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              {t('footer.connectTitle')}
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Hotline: <span className="text-white font-mono font-semibold">0906 790 700</span>
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Email: <span className="text-[#00e5ff] font-mono">nctavn@gmail.com</span>
            </p>

            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, href: 'https://instagram.com', color: 'hover:text-[#f00ac0]' },
                { icon: Video, href: 'https://tiktok.com', color: 'hover:text-[#00e5ff]' },
                { icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-500' },
                { icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-400' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg bg-[#141420] border border-white/10 flex items-center justify-center text-slate-300 ${item.color} transition-all duration-300 hover:scale-110 hover:border-white/30`}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & GitHub Pages CNAME indicator */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>© {new Date().getFullYear()} NCTA (ncta.vn). {t('footer.rights')}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-purple-400 hidden sm:inline">{t('footer.studioTag')}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all text-xs font-mono"
            >
              <span>{t('footer.backToTop')}</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#00e5ff]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
