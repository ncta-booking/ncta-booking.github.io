**![alt text](image.png)**# LED2TOY — project rules

Single-page React 19 + TypeScript + Vite + Tailwind v4 marketing site (led2toy.com).

## Responsive / mobile (must-follow)

The site is viewed heavily on phones and tablets. **Never introduce horizontal
overflow.** After any layout change, verify there is no horizontal scrollbar in
portrait at iPhone (~375–430px) and iPad (~768–834px) widths.

- Any element/section that holds **absolutely-positioned decorations** (neon
  glows, blurred orbs, light streaks — often with negative offsets like
  `-left-32`, `-right-32`, `w-96`, `blur-[140px]`) **must also carry
  `overflow-hidden`** so the decoration is clipped and cannot widen the page.
- Keep the global overflow guard in `src/index.css`
  (`html, body { overflow-x: clip }` + `body { width:100%; max-width:100% }`).
  Do not delete it without an equivalent replacement.
- Prefer `overflow-x: clip` over `overflow-x: hidden` on `html`/`body` (clip does
  not create a scroll container).
- Avoid `w-screen` / `100vw` (they include the scrollbar width and overflow on
  desktop); use `w-full` / `max-w-full`.
- **Horizontal swipe strips** (`overflow-x-auto`): never combine with
  `justify-center` — when the content overflows, centering pushes the first
  item off the left edge and it becomes unreachable by scrolling. Use
  `justify-start` (add `lg:justify-center` to center only once it fits), give
  items `shrink-0`, add horizontal padding, and hide the bar with
  `.scrollbar-none` (defined in `index.css`). Optionally `snap-x` + `snap-start`.
- Build mobile-first: default classes target phones, add `sm:`/`md:`/`lg:` for
  larger screens.

## Performance (landing page / Lighthouse)

- Canvas `requestAnimationFrame` loops must NOT run unconditionally: throttle
  (~30fps for ambient FX), skip drawing when `document.hidden`, pause when the
  canvas is off-screen (IntersectionObserver), and bail entirely on
  `prefers-reduced-motion`. See `FlowCanvas.tsx` / `InteractiveVisualizer.tsx`.
- Below-the-fold / interaction-only components are `React.lazy` + `Suspense`
  (e.g. `InteractiveVisualizer`, `LightboxModal` in `App.tsx`). Give lazy
  sections a sized placeholder (keep the `id` anchor) to avoid layout shift.
- Images: `loading="lazy"` + `decoding="async"` on all non-LCP images; keep the
  aspect-ratio wrappers so there is no CLS. `preconnect` to external image/font
  hosts in `index.html`; load Google Fonts non-render-blocking (`media=print`
  swap trick + `<noscript>` fallback).

## Internationalization

- Bilingual **Vietnamese (default) + English** via a lightweight custom i18n
  context: `src/i18n/{config,translations,LanguageContext}.tsx`.
- UI strings live in `src/i18n/translations.ts` (`en` is typed `typeof vi`, so
  both languages must share the exact same keys).
- Content data (props, shows, services…) is localized in `src/data/mockData.ts`
  as `{ vi, en, zh? }` leaves, exposed via `get*(lang)` getters. Components read
  data through those getters, not static imports.
- **Chinese (中文)** is a planned addition (shown as "Soon" in the switcher). To
  ship it: add `'zh'` to `Lang` in `config.ts`, set `enabled: true`, add a `zh`
  branch in `translations.ts`, and fill `zh` on each leaf in `mockData.ts`.

## Verify

- Type-check: `npm run lint` (runs `tsc --noEmit`).
- Build: `npm run build`. Dev: `npm run dev` (port 3000).
