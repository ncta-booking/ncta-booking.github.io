import React, { useState, useEffect, Suspense, lazy } from 'react';
import { FlowCanvas } from './components/FlowCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FloatingActions } from './components/FloatingActions';
import { LEDProp, PerformanceItem, ServiceItem } from './types';
import { useI18n } from './i18n/LanguageContext';

// ---------------------------------------------------------------------------
// Section code-splitting — "load tới đâu, render tới đó".
// Everything below the first screen ships as its own chunk so the main bundle
// only carries Navbar + Hero + i18n. SEO is NOT sacrificed: the static
// prerender awaits preloadAppSections() (entry-server.tsx), so the shipped
// HTML still contains every section in full. During hydration React preserves
// that server HTML inside each <Suspense> boundary and hydrates it lazily as
// each chunk arrives — nothing flashes or disappears.
// ---------------------------------------------------------------------------
type SectionModule<P> = { default: React.ComponentType<P> };
const sectionPreloads: Array<() => Promise<void>> = [];

/**
 * Like React.lazy, but registers a preloader the server render awaits. Once
 * preloaded (server / prerender only) the component renders synchronously, so
 * renderToString emits real content instead of Suspense fallbacks.
 */
function lazySection<P extends object>(
  load: () => Promise<SectionModule<P>>,
): React.ComponentType<P> {
  let Preloaded: React.ComponentType<P> | null = null;
  const Lazy = lazy(load);
  sectionPreloads.push(() =>
    load().then((m) => {
      Preloaded = m.default;
    }),
  );
  const Section: React.FC<P> = (props) => {
    if (Preloaded) {
      const C = Preloaded;
      return <C {...props} />;
    }
    return <Lazy {...props} />;
  };
  return Section;
}

/** Awaited by scripts/prerender.mjs (via entry-server) before renderToString. */
export function preloadAppSections(): Promise<unknown> {
  return Promise.all(sectionPreloads.map((p) => p()));
}

const PartnerLogos = lazySection(() => import('./components/PartnerLogos').then((m) => ({ default: m.PartnerLogos })));
const AboutSection = lazySection(() => import('./components/AboutSection').then((m) => ({ default: m.AboutSection })));
const PerformancePortfolio = lazySection(() => import('./components/PerformancePortfolio').then((m) => ({ default: m.PerformancePortfolio })));
const GearShowcase = lazySection(() => import('./components/GearShowcase').then((m) => ({ default: m.GearShowcase })));
const StatsSection = lazySection(() => import('./components/StatsSection').then((m) => ({ default: m.StatsSection })));
const ServicesSection = lazySection(() => import('./components/ServicesSection').then((m) => ({ default: m.ServicesSection })));
const FaqSection = lazySection(() => import('./components/FaqSection').then((m) => ({ default: m.FaqSection })));
const TestimonialsSection = lazySection(() => import('./components/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection })));
const ContactSection = lazySection(() => import('./components/ContactSection').then((m) => ({ default: m.ContactSection })));
const Footer = lazySection(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

// Interaction-only chunk — only loads when a lightbox is opened.
const LightboxModal = lazy(() =>
  import('./components/LightboxModal').then((m) => ({ default: m.LightboxModal })),
);

/**
 * Sized Suspense fallback that keeps the section's anchor id, so in-page links
 * and layout stay stable. Only ever visible when there is NO prerendered HTML
 * (e.g. `npm run dev`) — production hydration keeps the server markup instead.
 */
const SectionShell: React.FC<{ id?: string; minH?: string }> = ({ id, minH = 'min-h-[60vh]' }) => (
  <section id={id} className={minH} aria-hidden="true" />
);

export default function App() {
  const { t } = useI18n();
  const [selectedPerformance, setSelectedPerformance] = useState<PerformanceItem | null>(null);
  const [selectedProp, setSelectedProp] = useState<LEDProp | null>(null);
  const [inquireService, setInquireService] = useState<string>('');
  const [inquireProp, setInquireProp] = useState<string>('');

  // Lift the boot splash the moment React has hydrated (this effect runs after
  // the first commit = the page is now interactive). Desktop keeps the splash
  // until here; mobile dismisses earlier on DOM-parsed (see index.html).
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
        <Suspense fallback={<SectionShell minH="min-h-[200px]" />}>
          <PartnerLogos />
        </Suspense>

        {/* 3. About & Philosophy Section */}
        <Suspense fallback={<SectionShell id="about" />}>
          <AboutSection onOpenBooking={handleOpenBooking} />
        </Suspense>

        {/* 4. Performances & Portfolio Section */}
        <Suspense fallback={<SectionShell id="performances" />}>
          <PerformancePortfolio onSelectPerformance={(perf) => setSelectedPerformance(perf)} />
        </Suspense>

        {/* 5. Gear & Prop Showcase (Inspired by lighttoys.cz) */}
        <Suspense fallback={<SectionShell id="gear" />}>
          <GearShowcase
            onSelectProp={(prop) => setSelectedProp(prop)}
            onInquireProp={handleInquireProp}
          />
        </Suspense>

        {/* 6. Achievements / Stats band (#stats) */}
        <Suspense fallback={<SectionShell id="stats" minH="min-h-[300px]" />}>
          <StatsSection />
        </Suspense>

        {/* 7. Services Section */}
        <Suspense fallback={<SectionShell id="services" />}>
          <ServicesSection onSelectService={handleSelectService} />
        </Suspense>

        {/* 7b. FAQ (crawlable, JS-free) for rich results & keyword coverage */}
        <Suspense fallback={<SectionShell id="faq" />}>
          <FaqSection />
        </Suspense>

        {/* 8. Testimonials Section */}
        <Suspense fallback={<SectionShell id="testimonials" />}>
          <TestimonialsSection />
        </Suspense>

        {/* 9. Contact & Booking Section */}
        <Suspense fallback={<SectionShell id="contact" />}>
          <ContactSection
            initialService={inquireService}
            initialProp={inquireProp}
          />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Floating helpers: back-to-top (left) + contact FAB (right) */}
      <FloatingActions />

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
