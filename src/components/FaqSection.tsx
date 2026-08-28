import { useI18n } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

// FAQ rendered with native <details>/<summary> so the content is fully present
// in the static HTML (no JS required) — ideal for SEO and accessibility.
// The FAQPage JSON-LD is generated from the same source as the visible text,
// so Google can surface rich-result accordions in search.
export function FaqSection() {
  const { lang } = useI18n();
  const faq = translations[lang].faq;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-10 text-center sm:mb-14">
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#00e5ff]">
          {faq.badge}
        </span>
        <h2 className="mt-5 text-3xl font-display font-black tracking-tight text-white sm:text-5xl">
          <span className="text-white/40">{faq.titlePrefix} </span>
          <span className="bg-gradient-to-r from-[#f00ac0] via-[#8b2fe8] to-[#00e5ff] bg-clip-text text-transparent">
            {faq.titleHighlight}
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">{faq.subtitle}</p>
      </div>

      <div className="space-y-3.5">
        {faq.items.map((item, i) => (
          <details
            key={i}
            className="faq-item group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/20 open:border-[#00e5ff]/40 open:bg-white/[0.05] open:shadow-[0_0_35px_rgba(0,229,255,0.09)]"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3.5 p-5 text-left sm:gap-4 sm:p-6">
              <span className="shrink-0 font-mono text-xs font-bold tabular-nums text-[#00e5ff]/60 transition-colors group-open:text-[#f00ac0] sm:text-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-base font-semibold text-white/90 transition-colors group-hover:text-white group-open:text-white sm:text-lg">
                {item.q}
              </span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-lg leading-none text-[#00e5ff] transition-all duration-300 group-hover:border-[#00e5ff]/50 group-open:rotate-45 group-open:border-[#f00ac0]/60 group-open:bg-[#f00ac0]/10 group-open:text-[#f00ac0] group-open:shadow-[0_0_12px_rgba(240,10,192,0.35)]">
                +
              </span>
            </summary>
            <div className="faq-answer px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="border-t border-white/10 pt-4 sm:ml-[2.4rem]">
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{item.a}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
