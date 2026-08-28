import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Zap } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'performances', 'gear', 'stats', 'services', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: t('nav.home'), id: 'hero' },
    { href: '#about', label: t('nav.about'), id: 'about' },
    { href: '#performances', label: t('nav.performances'), id: 'performances' },
    { href: '#gear', label: t('nav.gear'), id: 'gear' },
    { href: '#stats', label: t('nav.stats'), id: 'stats' },
    { href: '#services', label: t('nav.services'), id: 'services' },
    { href: '#testimonials', label: t('nav.testimonials'), id: 'testimonials' },
    { href: '#contact', label: t('nav.contact'), id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Soft neon hairline in place of a hard full-width border — fades to
          transparent at both edges so it reads as a subtle accent, not a solid
          white bar flashing in/out on scroll. Remove this <div> for zero line. */}
      {isScrolled && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        {/* Left: Brand Logo */}
        <div className="flex-1 flex justify-start min-w-0">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] p-[1.5px] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(240,10,192,0.6)]">
              <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00e5ff] group-hover:text-[#f00ac0] transition-colors" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ff88] rounded-full animate-ping opacity-75" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00ff88] rounded-full" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 group-hover:glow-text-cyan transition-all">
                  N<span className="text-[#00e5ff]">C</span><span className="text-[#f00ac0]">TA</span>
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-slate-400 font-mono -mt-1 group-hover:text-[#00e5ff] transition-colors">
                ncta.vn
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#12121c]/80 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full transition-all duration-300 flex items-center gap-1 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#f00ac0]/30 to-[#8b2fe8]/40 border border-[#f00ac0]/50 shadow-[0_0_15px_rgba(240,10,192,0.3)]'
                    : 'text-slate-300 border border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: language switcher (all sizes) + mobile hamburger */}
        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
          <LanguageSwitcher />

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2.5 rounded-xl bg-[#151520] border border-purple-500/20 text-slate-200 hover:text-white hover:border-[#f00ac0]/50 transition-all focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#f00ac0]" /> : <Menu className="w-6 h-6 text-[#00e5ff]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0c0c14]/95 border-b border-purple-500/30 backdrop-blur-2xl px-6 py-6 shadow-2xl transition-all animate-fadeIn"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#f00ac0]/20 to-[#8b2fe8]/30 text-white border border-[#f00ac0]/40'
                      : 'text-slate-300 border border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                    {link.label}
                  </span>
                </a>
              );
            })}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(240,10,192,0.4)]"
              >
                <Sparkles className="w-4 h-4" />
                {t('nav.bookingCtaMobile')}
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2 font-mono">
                <span>Zalo: 0906 790 700</span>
                <span>•</span>
                <span>ncta.vn</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
