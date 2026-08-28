import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext';
import './index.css';

// hydrateRoot lets the statically pre-rendered HTML (see scripts/prerender.mjs)
// attach without a visible re-render — best for both SEO and Core Web Vitals.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
