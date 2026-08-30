export type PropCategory = 'all' | 'poi' | 'staff' | 'hoop' | 'fan' | 'club';

export interface LEDProp {
  id: string;
  name: string;
  vietnameseName: string;
  category: 'poi' | 'staff' | 'hoop' | 'fan' | 'club';
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  badge?: string;
  specs: {
    ledCount: string;
    batteryLife: string;
    resolution?: string;
    controlSystem: string;
    weight: string;
    durability: string;
  };
  features: string[];
  idealFor: string;
}

export type PerformanceCategory = 'all' | 'festival' | 'corporate' | 'stage' | 'visual_art';

export interface PerformanceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'festival' | 'corporate' | 'stage' | 'visual_art';
  date: string;
  location: string;
  image: string;
  videoUrl?: string;
  description: string;
  propsUsed: string[];
  duration: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  accentColor: string;
  ctaText: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  organization: string;
  avatar: string;
  content: string;
  rating: number;
  event: string;
  accentGlow: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface PartnerItem {
  name: string;
  category: string;
  logoText: string;
  accent: string;
  /** Path under /logos — placeholder vector wordmark, swap for the real brand file. */
  logoSrc: string;
}

// ---------------------------------------------------------------------------
// Long-form show articles — the standalone pages built at /show/<id>/.
// See src/data/showArticles.ts for the content and scripts/prerender.mjs for
// the static HTML generation.
// ---------------------------------------------------------------------------

export interface ArticleSection {
  heading: string;
  body: string[];
}

export interface ArticleGalleryImage {
  src: string;
  caption: string;
}

export interface ArticleFact {
  label: string;
  value: string;
}

export interface ArticleCredit {
  role: string;
  name: string;
}

export interface ShowArticle {
  /** Same id as the matching PerformanceItem — also the URL slug. */
  id: string;
  /** ISO date, used for <lastmod> in the sitemap and Article JSON-LD. */
  publishedAt: string;
  readMinutes: number;
  /** Opening summary paragraph, shown under the title and used as meta description. */
  lead: string;
  /** YouTube video id. Leave empty and the video block is not rendered. */
  youtubeId?: string;
  sections: ArticleSection[];
  gallery: ArticleGalleryImage[];
  facts: ArticleFact[];
  credits: ArticleCredit[];
  quote?: { text: string; author: string };
}
