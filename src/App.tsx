import React, { useState, useEffect, Suspense, lazy } from 'react';
import { FlowCanvas } from './components/FlowCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PerformancePortfolio } from './components/PerformancePortfolio';
import { GearShowcase } from './components/GearShowcase';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { PartnerLogos } from './components/PartnerLogos';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LEDProp, PerformanceItem, ServiceItem } from './types';
import { useI18n } from './i18n/LanguageContext';

// Below-the-fold / interaction-only chunks — split out to shrink the initial JS.
const LightboxModal = lazy(() =>
  import('./components/LightboxModal').then((m) => ({ default: m.LightboxModal })),
);

export default function App() {
  const { t } = useI18n();
  const [selectedPerformance, setSelectedPerformance] = useState<PerformanceItem | null>(null);
  const [selectedProp, setSelectedProp] = useState<LEDProp | null>(null);
  const [inquireService, setInquireService] = useState<string>('');
  const [inquireProp, setInquireProp] = useState<string>('');

  // Lift the boot splash the moment React has hydrated (this effect runs after
  // the first commit = the page is now interactive). Keeping the splash up until
  // here hides the brief main-thread block hydration causes on iOS Safari.
  useEffect(() => {
    (window as unknown as { __nctaDismissBoot?: () => void }).__nctaDismissBoot?.();
  }, []);

  const handleOpenBooking = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreGear = () => {
    const el = document.getElementById('gear');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirePerformance = (title: string) => {
    setInquireService(`${t('contact.inquireScript')} ${title}`);
    handleOpenBooking();
  };

  const handleInquireProp = (prop: LEDProp) => {
    setSelectedProp(null);
    setInquireProp(prop.name);
    handleOpenBooking();
  };

  const handleSelectService = (service: ServiceItem) => {
    setInquireService(service.title);
    handleOpenBooking();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 relative selection:bg-[#f00ac0] selection:text-white">
      {/* Background Interactive Flow Canvas */}
      <FlowCanvas />

      {/* Sticky Navigation Bar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Single-Page Content */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} onExploreGear={handleExploreGear} />

        {/* 2. Partner & Festival Ticker */}
        <PartnerLogos />

        {/* 3. About & Philosophy Section */}
        <AboutSection onOpenBooking={handleOpenBooking} />

        {/* 4. Performances & Portfolio Section */}
        <PerformancePortfolio onSelectPerformance={(perf) => setSelectedPerformance(perf)} />

        {/* 5. Gear & Prop Showcase (Inspired by lighttoys.cz) */}
        <GearShowcase
          onSelectProp={(prop) => setSelectedProp(prop)}
          onInquireProp={handleInquireProp}
        />

        {/* 6. Achievements / Stats band (#stats) */}
        <StatsSection />

        {/* 7. Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 7b. FAQ (crawlable, JS-free) for rich results & keyword coverage */}
        <FaqSection />

        {/* 8. Testimonials Section */}
        <TestimonialsSection />

        {/* 9. Contact & Booking Section */}
        <ContactSection
          initialService={inquireService}
          initialProp={inquireProp}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Popup for Performances & Props Details (lazy — only loads on open) */}
      <Suspense fallback={null}>
        <LightboxModal
          performance={selectedPerformance}
          prop={selectedProp}
          onClose={() => {
            setSelectedPerformance(null);
            setSelectedProp(null);
          }}
          onInquire={(title) => {
            setInquireService(`${t('contact.inquireInterested')} ${title}`);
            handleOpenBooking();
          }}
        />
      </Suspense>
    </div>
  );
}
