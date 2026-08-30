// Static pre-render step: loads the app through Vite's SSR pipeline and
// injects the fully-rendered markup into the built HTML. This gives search
// engines and social crawlers complete, JS-free HTML — the biggest technical
// SEO win for a React SPA.
//
// Two outputs:
//   dist/index.html            — the landing page
//   dist/show/<id>/index.html  — one standalone article per show, each with its
//                                own <title>, meta description, canonical, OG
//                                tags and Article/BreadcrumbList JSON-LD.
// dist/sitemap.xml is regenerated at the end so every show URL is listed.
import { createServer } from 'vite';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const outDir = resolve(root, 'dist');
const SITE = 'https://ncta.vn';

const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  // middlewareMode + no file-watcher so the dev server doesn't keep the Node
  // process alive after we're done (otherwise `npm run build` hangs forever).
  server: { middlewareMode: true, watch: null, hmr: false },
});

/**
 * Dev-mode SSR (this uses Vite's dev server) makes React emit
 * <template data-msg="..." data-stck="..."></template> error annotations for
 * Suspense/lazy boundaries (e.g. the lazy LightboxModal). Their stack leaks the
 * absolute build path into the shipped HTML — strip them so production HTML is
 * clean. These templates are dev-only and not needed for hydration.
 */
const stripDevTemplates = (html) =>
  html.replace(/<template\b[^>]*\bdata-(?:stck|msg)\b[^>]*><\/template>/gi, '');

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Trim a lead paragraph down to a sensible meta-description length. */
const clamp = (text, max = 160) =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/[\s,;:.—-]+$/, '')}…`;

let exitCode = 0;
try {
  const { render, renderShow, listShowPages } = await vite.ssrLoadModule('/src/entry-server.tsx');

  // ---------------------------------------------------------------------
  // 1. Landing page
  // ---------------------------------------------------------------------
  // render() is async: it preloads the lazy section chunks first so the HTML
  // contains every section in full (no Suspense fallbacks).
  const appHtml = stripDevTemplates(await render());
  const indexFile = resolve(outDir, 'index.html');
  const indexTemplate = readFileSync(indexFile, 'utf-8');
  writeFileSync(
    indexFile,
    indexTemplate.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
  );
  console.log('[prerender] Static HTML injected into dist/index.html');

  // ---------------------------------------------------------------------
  // 2. One standalone page per show
  // ---------------------------------------------------------------------
  const showTemplateFile = resolve(outDir, 'show.html');
  const showTemplate = readFileSync(showTemplateFile, 'utf-8');
  const shows = listShowPages();
  const generated = [];

  for (const { id } of shows) {
    const data = renderShow(id);
    if (!data) {
      console.warn(`[prerender] skipped ${id} — no matching show data`);
      continue;
    }

    const url = `${SITE}/show/${id}/`;
    const pageTitle = `${data.title} | NCTA`;
    const description = clamp(data.description);
    const head = buildShowHead({ ...data, url, pageTitle, description });

    const html = showTemplate
      .replace('<!--SHOW_HEAD-->', head)
      .replace('<div id="root"></div>', `<div id="root">${stripDevTemplates(data.html)}</div>`);

    const dir = resolve(outDir, 'show', id);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, 'index.html'), html);
    generated.push({ id, publishedAt: data.publishedAt });
  }

  // The bare template must not ship — it has no content and would be indexed
  // as a thin duplicate.
  rmSync(showTemplateFile, { force: true });
  console.log(`[prerender] Generated ${generated.length} show page(s) under dist/show/`);

  // ---------------------------------------------------------------------
  // 3. Sitemap (home + every generated show page)
  // ---------------------------------------------------------------------
  writeSitemap(generated);
  console.log('[prerender] dist/sitemap.xml regenerated');
} catch (err) {
  console.error('[prerender] failed:', err);
  exitCode = 1;
} finally {
  await vite.close();
}

/** Per-show <head>: title, description, canonical, hreflang, OG/Twitter, JSON-LD. */
function buildShowHead({ id, title, subtitle, description, image, date, location, publishedAt, url, pageTitle }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    alternativeHeadline: subtitle,
    description,
    image: [image],
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: 'vi',
    author: { '@type': 'Organization', name: 'NCTA', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'NCTA',
      url: SITE,
      logo: { '@type': 'ImageObject', url: `${SITE}/og-image.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    about: { '@type': 'Event', name: title, startDate: publishedAt, location },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'NCTA', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Trình diễn', item: `${SITE}/#performances` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };

  return `<title>${escapeAttr(pageTitle)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#0a0a0f" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="apple-touch-icon" href="/og-image.svg" />
    <link rel="alternate" hreflang="vi" href="${url}" />
    <link rel="alternate" hreflang="en" href="${url}?lang=en" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="NCTA" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:image" content="${escapeAttr(image)}" />
    <meta property="og:image:alt" content="${escapeAttr(title)}" />
    <meta property="article:published_time" content="${publishedAt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${escapeAttr(image)}" />
    <meta name="ncta:show-id" content="${escapeAttr(id)}" />
    <meta name="ncta:show-date" content="${escapeAttr(date)}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="alternate icon" href="/favicon.svg" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>`;
}

/**
 * Rebuild dist/sitemap.xml from the generated pages. public/sitemap.xml stays
 * the hand-maintained source for the home entry; this step appends the show
 * URLs so a new article never needs a manual sitemap edit.
 */
function writeSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const entry = (loc, lastmod, priority, changefreq) =>
    `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="vi" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${loc}${loc.includes('?') ? '&' : '?'}lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

  const urls = [
    entry(`${SITE}/`, today, '1.0', 'weekly'),
    ...pages.map((p) => entry(`${SITE}/show/${p.id}/`, p.publishedAt, '0.8', 'monthly')),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  writeFileSync(resolve(outDir, 'sitemap.xml'), xml);
}

// Vite/esbuild can leave open handles that stop Node from exiting on its own —
// force a clean exit so the build command finishes.
process.exit(exitCode);
