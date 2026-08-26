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
}
