import type { LEDProp, PerformanceItem, ServiceItem, TestimonialItem, StatItem, PartnerItem } from '../types';
import type { Lang } from '../i18n/config';

// ---------------------------------------------------------------------------
// Localized content layer.
//
// Text that differs per language is stored as a leaf `{ vi, en, zh? }`, while
// language-neutral fields (ids, images, colors, numbers) stay as-is. The
// exported `get*()` functions flatten the raw data into the plain interfaces
// (`LEDProp`, `PerformanceItem`…) for the requested language, so components
// keep reading `prop.description` etc. without any type changes.
//
// To add Chinese later: fill the optional `zh` field on each leaf and widen
// `Lang` in `i18n/config.ts`. `pick()` already falls back to Vietnamese.
// ---------------------------------------------------------------------------

type L = { vi: string; en: string; zh?: string };
type LArr = { vi: string[]; en: string[]; zh?: string[] };

const pick = (l: L, lang: Lang): string => l[lang] ?? l.vi;
const pickArr = (l: LArr, lang: Lang): string[] => l[lang] ?? l.vi;

// ------------------------------- STATS -------------------------------------

interface RawStat {
  id: string;
  label: L;
  value: number;
  suffix: string;
  description: L;
}

const RAW_STATS: RawStat[] = [
  {
    id: 'exp',
    label: { vi: 'Năm Kinh Nghiệm', en: 'Years of Experience' },
    value: 8,
    suffix: '+',
    description: {
      vi: 'Chinh phục nghệ thuật ánh sáng & biểu diễn sân khấu',
      en: 'Mastering light art & stage performance',
    },
  },
  {
    id: 'events',
    label: { vi: 'Show & Festival', en: 'Shows & Festivals' },
    value: 350,
    suffix: '+',
    description: {
      vi: 'Đêm diễn bùng nổ khắp cả nước & quốc tế',
      en: 'Explosive nights across the country & abroad',
    },
  },
  {
    id: 'props',
    label: { vi: 'Đạo Cụ Chế Tác', en: 'Props Crafted' },
    value: 120,
    suffix: '+',
    description: {
      vi: 'Phiên bản LED Poi, Staff & Pixel Prop cao cấp',
      en: 'Premium LED Poi, Staff & Pixel Prop builds',
    },
  },
  {
    id: 'clients',
    label: { vi: 'Khách Hàng Hài Lòng', en: 'Happy Clients' },
    value: 99,
    suffix: '%',
    description: {
      vi: 'Cam kết chất lượng hiệu ứng thị giác đỉnh cao',
      en: 'Committed to top-tier visual quality',
    },
  },
];

export function getStats(lang: Lang): StatItem[] {
  return RAW_STATS.map((s) => ({
    id: s.id,
    label: pick(s.label, lang),
    value: s.value,
    suffix: s.suffix,
    description: pick(s.description, lang),
  }));
}

// ------------------------------- PROPS -------------------------------------

interface RawProp {
  id: string;
  name: string;
  vietnameseName: L;
  category: LEDProp['category'];
  tagline: L;
  description: L;
  image: string;
  accentColor: string;
  badge?: L;
  specs: {
    ledCount: L;
    batteryLife: L;
    resolution?: L;
    controlSystem: L;
    weight: L;
    durability: L;
  };
  features: LArr;
  idealFor: L;
}

const RAW_PROPS: RawProp[] = [
  {
    id: 'visual-pixel-poi-hd',
    name: 'Visual Pixel Poi HD-160',
    vietnameseName: { vi: 'LED Poi Hiển Thị Hình Ảnh HD', en: 'HD Image-Display LED Poi' },
    category: 'poi',
    tagline: {
      vi: 'Vẽ logo & hình ảnh động trực tiếp trong không gian xoay',
      en: 'Draw logos & animated images live in the spin space',
    },
    description: {
      vi: 'Dòng Visual Poi công nghệ tiên tiến nhất của LED2TOY với 160 điểm LED RGB siêu sáng mỗi bên. Hỗ trợ hiển thị logo doanh nghiệp, đồ họa 3D, chân dung và hiệu ứng âm nhạc đồng bộ micro-second.',
      en: "LED2TOY's most advanced Visual Poi line with 160 ultra-bright RGB LED points per side. Displays corporate logos, 3D graphics, portraits and micro-second music-synced effects.",
    },
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#f00ac0',
    badge: { vi: 'Best Seller', en: 'Best Seller' },
    specs: {
      ledCount: { vi: '320 Ultra-Bright HD LEDs (160/cây)', en: '320 Ultra-Bright HD LEDs (160/side)' },
      batteryLife: {
        vi: '3.5 - 6 giờ liên tục (Pin Li-ion có thể thay nhanh)',
        en: '3.5 - 6 hrs continuous (fast-swap Li-ion battery)',
      },
      resolution: { vi: '160 pixels / 240 FPS rendering', en: '160 pixels / 240 FPS rendering' },
      controlSystem: { vi: 'App Bluetooth + Wireless RF Sync + DMX 512', en: 'App Bluetooth + Wireless RF Sync + DMX 512' },
      weight: { vi: '185g / cây (Cân bằng trọng tâm hoàn hảo)', en: '185g / side (perfectly balanced center of gravity)' },
      durability: { vi: 'Vỏ Polycarbonate chịu va đập cấp quân sự', en: 'Military-grade impact-resistant polycarbonate shell' },
    },
    features: {
      vi: [
        'Tải hình ảnh / logo doanh nghiệp qua phần mềm chuyên dụng',
        'Đồng bộ nhạc theo timeline chính xác từng mili-giây',
        'Hơn 200+ hiệu ứng cài sẵn với chế độ đổi màu tự động',
        'Chống nước chuẩn IP65, an toàn biểu diễn ngoài trời mưa nhẹ',
      ],
      en: [
        'Upload images / corporate logos via dedicated software',
        'Sync to music on a millisecond-precise timeline',
        '200+ preset effects with an auto color-shifting mode',
        'IP65 water resistance, safe for light-rain outdoor shows',
      ],
    },
    idealFor: {
      vi: 'Biểu diễn sự kiện ra mắt thương hiệu, EDM Festival, countdown, show quảng bá doanh nghiệp.',
      en: 'Brand-launch events, EDM festivals, countdowns and corporate promo shows.',
    },
  },
  {
    id: 'smart-dragon-staff-pro',
    name: 'Smart Pixel Dragon Staff 2.0',
    vietnameseName: { vi: 'Gậy Rồng LED Pixel Thông Minh', en: 'Smart Pixel LED Dragon Staff' },
    category: 'staff',
    tagline: {
      vi: 'Dòng chảy ánh sáng ma thuật với 10 nhánh LED đa chiều',
      en: 'A magical light flow with 10 multi-directional LED spokes',
    },
    description: {
      vi: 'Dragon Staff được cân chỉnh trọng lượng chính xác đến từng gram cho kỹ thuật roll và contact flow mượt mà. 10 nan hoa LED đầu gậy tạo nên các vòng xoáy ánh sáng thôi miên người xem.',
      en: 'This Dragon Staff is balanced to the gram for smooth rolls and contact flow. Ten LED spokes at each end weave hypnotic vortexes of light.',
    },
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#00e5ff',
    badge: { vi: 'Độc Quyền', en: 'Exclusive' },
    specs: {
      ledCount: { vi: '240 Smart LEDs Full Spectrum', en: '240 Smart LEDs Full Spectrum' },
      batteryLife: { vi: '4 - 7 giờ hoạt động', en: '4 - 7 hrs runtime' },
      resolution: { vi: 'Hiệu ứng Dynamic Flow Trails', en: 'Dynamic Flow Trails effects' },
      controlSystem: {
        vi: 'Nút bấm thông minh + Cảm biến con quay gia tốc (Gyro)',
        en: 'Smart button + gyro/accelerometer sensor',
      },
      weight: { vi: '980g (Trục Carbon siêu nhẹ)', en: '980g (ultra-light carbon shaft)' },
      durability: { vi: 'Khớp nối hợp kim nhôm hàng không 7075', en: '7075 aerospace aluminium-alloy joints' },
    },
    features: {
      vi: [
        'Trục carbon phủ silicone grip cao cấp chống trơn trượt',
        'Đầu gai LED tháo lắp linh hoạt chỉ trong 30 giây',
        'Cảm biến xoay tự động đổi tốc độ dải sáng theo nhịp múa',
        'Chế độ tiết kiệm pin thông minh khi không chuyển động',
      ],
      en: [
        'Carbon shaft with a premium anti-slip silicone grip',
        'LED spoke heads detach and reattach in just 30 seconds',
        'A rotation sensor auto-adjusts light speed to your movement',
        'A smart battery-saving mode when idle',
      ],
    },
    idealFor: {
      vi: 'Nghệ sĩ flow-art chuyên nghiệp, biểu diễn sân khấu lớn, nghệ thuật đường phố cao cấp.',
      en: 'Professional flow-art artists, big-stage shows and premium street art.',
    },
  },
  {
    id: 'cyber-smart-hoop',
    name: 'HyperLoop Smart LED Hoop',
    vietnameseName: { vi: 'Vòng LED Thông Minh Cảm Biến Chuyển Động', en: 'Motion-Sensing Smart LED Hoop' },
    category: 'hoop',
    tagline: {
      vi: 'Vòng tròn ánh sáng huyền ảo uốn lượn theo cơ thể',
      en: 'A mystical ring of light that flows around the body',
    },
    description: {
      vi: 'Vòng múa LED siêu nhẹ với độ uốn dẻo tuyệt hảo. Tích hợp dải LED full-color mật độ cao không điểm đen, tạo ảo ảnh quang học các vòng sáng lơ lửng không trung.',
      en: 'An ultra-light dance hoop with superb flex. Its high-density full-color LED strip has no dark spots, creating the optical illusion of light rings floating in mid-air.',
    },
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#8b2fe8',
    specs: {
      ledCount: { vi: '180 Micro LEDs Seamless', en: '180 Micro LEDs Seamless' },
      batteryLife: { vi: '3 - 5 giờ', en: '3 - 5 hrs' },
      controlSystem: { vi: 'Remote điều khiển từ xa + 50 Pattern Loops', en: 'Wireless remote + 50 pattern loops' },
      weight: { vi: '320g (Ống Polypro 19mm)', en: '320g (19mm Polypro tubing)' },
      durability: { vi: 'Chịu lực uốn cong 180 độ không gãy', en: 'Bends 180° without breaking' },
    },
    features: {
      vi: [
        'Gấp gọn thành 1/4 kích thước để dễ dàng mang theo du lịch/lưu diễn',
        'Cổng sạc Type-C tiện lợi với đèn báo dung lượng',
        'Cân đối trọng lực tuyệt đối cho kỹ thuật hooping đa điểm',
        'Chế độ strobe ánh sáng trắng & dải cực quang neon',
      ],
      en: [
        'Folds to a quarter of its size for easy travel & touring',
        'Convenient Type-C charging with a battery indicator',
        'Perfectly balanced for multi-point hooping techniques',
        'A white strobe mode & neon aurora palettes',
      ],
    },
    idealFor: {
      vi: 'Vũ công ánh sáng, nghệ sĩ xiếc đương đại, sân khấu lễ hội âm nhạc.',
      en: 'Light dancers, contemporary circus artists and music-festival stages.',
    },
  },
  {
    id: 'cyber-silk-fans',
    name: 'CyberSilk LED Folding Fans',
    vietnameseName: { vi: 'Quạt LED Biểu Diễn Đôi Lụa Ánh Sáng', en: 'Paired Silk-Light LED Performance Fans' },
    category: 'fan',
    tagline: {
      vi: 'Đôi cánh ánh sáng mềm mại nhưng sắc sảo',
      en: 'A pair of light wings — soft yet sharp',
    },
    description: {
      vi: 'Cặp quạt LED mô phỏng nan quạt truyền thống kết hợp công nghệ sợi quang học và dải LED ma trận. Mang lại vẻ đẹp vừa ma mị cổ điển vừa mang hơi thở tương lai Cyberpunk.',
      en: 'A pair of LED fans that echo traditional ribs, combining fiber-optics with a matrix LED strip — beauty that is both classically haunting and Cyberpunk-futuristic.',
    },
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#ff8a00',
    badge: { vi: 'Mới Ra Mắt', en: 'New' },
    specs: {
      ledCount: { vi: '192 LEDs (96 LEDs/quạt)', en: '192 LEDs (96 LEDs/fan)' },
      batteryLife: { vi: '4 giờ liên tục', en: '4 hrs continuous' },
      controlSystem: { vi: 'Đồng bộ không dây 2 tay đồng thời', en: 'Wireless sync across both hands at once' },
      weight: { vi: '240g/chiếc', en: '240g each' },
      durability: { vi: 'Khung thép lò xo carbon bọc đệm êm ái', en: 'Carbon spring-steel frame with soft padding' },
    },
    features: {
      vi: [
        'Tay cầm công thái học tối ưu cho các bài múa nhanh',
        'Chuyển đổi 32 màu sắc rực rỡ chỉ bằng một nút bấm ngón cái',
        'Dải lụa phản quang phát sáng cực đại dưới đèn UV/Blacklight',
        'Khả năng xòe đóng êm ái mượt mà',
      ],
      en: [
        'An ergonomic grip optimized for fast routines',
        'Switch 32 vivid colors with a single thumb button',
        'Reflective silk glows brightest under UV / blacklight',
        'A smooth, silky open-and-close action',
      ],
    },
    idealFor: {
      vi: 'Múa đương đại, biểu diễn tiệc gala dinner, show dạ tiệc âm nhạc.',
      en: 'Contemporary dance, gala-dinner performances and evening music galas.',
    },
  },
  {
    id: 'neon-juggling-clubs',
    name: 'AeroGlow LED Juggling Clubs',
    vietnameseName: { vi: 'Gậy Tung Hứng LED Đổi Màu Tương Tác', en: 'Interactive Color-Changing LED Juggling Clubs' },
    category: 'club',
    tagline: {
      vi: 'Tung hứng ánh sáng với cảm biến va chạm thời gian thực',
      en: 'Juggle light with real-time impact sensing',
    },
    description: {
      vi: 'Bộ 3 gậy tung hứng LED đẳng cấp biểu diễn xiếc quốc tế. Thân gậy phủ lớp khuếch tán ánh sáng đồng nhất, chống sốc tuyệt đối khi rơi từ độ cao lớn.',
      en: 'A set of three international-grade LED juggling clubs. An even light-diffusing body and full shock resistance handle high drops with ease.',
    },
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#00ff88',
    specs: {
      ledCount: { vi: '72 High-Lumen RGB LEDs/gậy', en: '72 High-Lumen RGB LEDs/club' },
      batteryLife: { vi: '5 giờ', en: '5 hrs' },
      controlSystem: {
        vi: 'Cảm biến ném bắt (Tự đổi màu khi bay trên không)',
        en: 'Throw-catch sensor (auto color-change in mid-air)',
      },
      weight: { vi: '215g/gậy (Chuẩn thi đấu quốc tế)', en: '215g/club (international competition standard)' },
      durability: { vi: 'Chống sốc cao su mềm cao cấp EVA', en: 'Premium soft EVA-rubber shock protection' },
    },
    features: {
      vi: [
        'Phát hiện vòng quay trên không và đổi màu sắc tương ứng',
        'Cân đối khí động học hoàn hảo cho cú ném cao và xoay đôi',
        'Bộ sạc đôi 3 trong 1 nhanh chóng qua cổng USB',
        'Chống va đập sàn bê tông và sân khấu gỗ',
      ],
      en: [
        'Detects mid-air spins and changes color accordingly',
        'Perfect aerodynamic balance for high throws and double spins',
        'A fast 3-in-1 dual charger via USB',
        'Withstands impacts on concrete floors and wooden stages',
      ],
    },
    idealFor: {
      vi: 'Nghệ sĩ xiếc tung hứng, biểu diễn tương tác khách mời, show tạp kỹ ban đêm.',
      en: 'Juggling circus artists, interactive guest performances and late-night variety shows.',
    },
  },
  {
    id: 'contact-staff-meteor',
    name: 'Vortex Pixel Contact Staff',
    vietnameseName: { vi: 'Trượng LED Contact Staff Chuyên Nghiệp', en: 'Professional LED Contact Staff' },
    category: 'staff',
    tagline: {
      vi: 'Dòng năng lượng xoay quanh cơ thể không rời',
      en: 'A stream of energy that circles the body without pause',
    },
    description: {
      vi: 'Cây trượng ánh sáng chuyên dụng cho kỹ thuật Contact Staff (lăn gậy trên vai, cổ, lưng). Độ dài chuẩn 150cm với dải sáng phủ kín hai đầu gậy.',
      en: 'A light staff built for contact-staff technique (rolling across the shoulders, neck and back). A standard 150cm length with light strips covering both ends.',
    },
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000&auto=format&fit=crop',
    accentColor: '#f00ac0',
    specs: {
      ledCount: { vi: '160 Programmable LEDs', en: '160 Programmable LEDs' },
      batteryLife: { vi: '4 - 6 giờ', en: '4 - 6 hrs' },
      controlSystem: { vi: 'Micro-controller đồng bộ nhịp điệu', en: 'Rhythm-synced microcontroller' },
      weight: { vi: '720g', en: '720g' },
      durability: { vi: 'Thân hợp kim vũ trụ T6 siêu bền', en: 'Ultra-durable T6 aerospace-alloy body' },
    },
    features: {
      vi: [
        'Điểm cân bằng chính giữa đánh dấu phản quang',
        'Bọc silicone trong suốt chống xước toàn thân',
        'Hiệu ứng trail light dài 3 mét trong ống kính máy ảnh',
        'Hỗ trợ chế độ nhấp nháy theo âm lượng nhạc phòng thu',
      ],
      en: [
        'A reflective-marked center balance point',
        'A full-body clear silicone anti-scratch wrap',
        'A 3-meter trail-light effect on camera',
        'Supports flashing synced to studio-music volume',
      ],
    },
    idealFor: {
      vi: 'Biểu diễn solo nghệ thuật, quay MV ca nhạc, festival ngoài trời.',
      en: 'Solo art performances, music-video shoots and outdoor festivals.',
    },
  },
];

export function getProps(lang: Lang): LEDProp[] {
  return RAW_PROPS.map((p) => ({
    id: p.id,
    name: p.name,
    vietnameseName: pick(p.vietnameseName, lang),
    category: p.category,
    tagline: pick(p.tagline, lang),
    description: pick(p.description, lang),
    image: p.image,
    accentColor: p.accentColor,
    badge: p.badge ? pick(p.badge, lang) : undefined,
    specs: {
      ledCount: pick(p.specs.ledCount, lang),
      batteryLife: pick(p.specs.batteryLife, lang),
      resolution: p.specs.resolution ? pick(p.specs.resolution, lang) : undefined,
      controlSystem: pick(p.specs.controlSystem, lang),
      weight: pick(p.specs.weight, lang),
      durability: pick(p.specs.durability, lang),
    },
    features: pickArr(p.features, lang),
    idealFor: pick(p.idealFor, lang),
  }));
}

// --------------------------- PERFORMANCES ----------------------------------

interface RawPerformance {
  id: string;
  title: L;
  subtitle: L;
  category: PerformanceItem['category'];
  date: L;
  location: L;
  image: string;
  videoUrl?: string;
  description: L;
  propsUsed: string[];
  duration: L;
  highlights: LArr;
}

const RAW_PERFORMANCES: RawPerformance[] = [
  {
    id: 'epizode-rave-2025',
    title: { vi: 'Epizode Festival Sunset to Midnight', en: 'Epizode Festival Sunset to Midnight' },
    subtitle: {
      vi: 'Đêm diễn bãi biển Phú Quốc cùng Visual Poi & Dragon Staff',
      en: 'A Phu Quoc beach night with Visual Poi & Dragon Staff',
    },
    category: 'festival',
    date: { vi: 'Tháng 12, 2025', en: 'December 2025' },
    location: { vi: 'Sunset Sanato, Phú Quốc', en: 'Sunset Sanato, Phu Quoc' },
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    description: {
      vi: 'Màn trình diễn ánh sáng mở màn sân khấu chính của đại nhạc hội Epizode. Sử dụng công nghệ Visual Poi HD hiển thị biểu tượng festival kết hợp hiệu ứng âm thanh trance bùng nổ trước hơn 5.000 khán giả quốc tế.',
      en: 'The opening light act on the Epizode main stage. Visual Poi HD displayed the festival emblem alongside explosive trance visuals before 5,000+ international guests.',
    },
    propsUsed: ['Visual Pixel Poi HD-160', 'Smart Dragon Staff 2.0'],
    duration: { vi: '15 phút solo + 10 phút tương tác DJ', en: '15-min solo + 10-min DJ interaction' },
    highlights: {
      vi: ['Vẽ logo festival trên không', 'Hiệu ứng ánh sáng đổi màu theo drop bass', 'Hơn 50.000 lượt xem video recap'],
      en: ['Drew the festival logo in mid-air', 'Colors shifting to every bass drop', '50,000+ views on the recap video'],
    },
  },
  {
    id: 'vinfast-luxury-gala',
    title: { vi: 'Gala Dạ Tiệc Ra Mắt VinFast Tương Lai', en: 'VinFast Future Launch Gala Night' },
    subtitle: {
      vi: 'Ánh sáng công nghệ cao kết hợp múa đương đại',
      en: 'High-tech light meets contemporary dance',
    },
    category: 'corporate',
    date: { vi: 'Tháng 10, 2025', en: 'October 2025' },
    location: { vi: 'Trung tâm Hội nghị Quốc gia, Hà Nội', en: 'National Convention Center, Hanoi' },
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
    description: {
      vi: 'Biểu diễn tôn vinh công nghệ xe điện với đạo cụ LED lập trình hiển thị các từ khóa chiến lược của thương hiệu và thông điệp Green Future.',
      en: "A performance honoring EV technology, with programmed LED props displaying the brand's strategic keywords and its Green Future message.",
    },
    propsUsed: ['Visual Pixel Poi HD-160', 'CyberSilk LED Fans'],
    duration: { vi: '8 phút mở màn sân khấu', en: '8-min stage opener' },
    highlights: {
      vi: ['Hiển thị logo sắc nét từng chi tiết', 'Đồng bộ DMX cùng hệ thống đèn sân khấu', 'Khách VIP đứng dậy vỗ tay tán thưởng'],
      en: ['Razor-sharp logo display', 'DMX-synced with the stage lighting rig', 'VIP guests rose to a standing ovation'],
    },
  },
  {
    id: 'countdown-saigon-lights',
    title: { vi: 'Đêm Hội Countdown Sài Gòn Rực Rỡ', en: 'Dazzling Saigon Countdown Night' },
    subtitle: {
      vi: 'Khoảnh khắc chào đón năm mới trên phố đi bộ Nguyễn Huệ',
      en: 'Welcoming the New Year on Nguyen Hue walking street',
    },
    category: 'stage',
    date: { vi: 'Tháng 01, 2026', en: 'January 2026' },
    location: { vi: 'Phố đi bộ Nguyễn Huệ, TP. Hồ Chí Minh', en: 'Nguyen Hue Walking Street, Ho Chi Minh City' },
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    description: {
      vi: 'Phần diễn chính kết hợp xiếc tung hứng LED tốc độ cao và Dragon Staff trong khoảnh khắc đếm ngược 60 giây cuối cùng.',
      en: 'The headline act combined high-speed LED juggling and Dragon Staff through the final 60-second countdown.',
    },
    propsUsed: ['AeroGlow LED Juggling Clubs', 'Smart Pixel Dragon Staff 2.0'],
    duration: { vi: '12 phút', en: '12 min' },
    highlights: {
      vi: ['Truyền hình trực tiếp trên sóng quốc gia', 'Khói màu và tia laser hòa quyện cùng LED', 'Không khí cuồng nhiệt đỉnh cao'],
      en: ['Broadcast live on national television', 'Colored smoke and lasers blended with LED', 'A peak of ecstatic energy'],
    },
  },
  {
    id: 'light-painting-mv-art',
    title: { vi: 'Dự Án Nghệ Thuật Thị Giác "Cyber Odyssey"', en: 'Visual Art Project "Cyber Odyssey"' },
    subtitle: {
      vi: 'Nhiếp ảnh Light Painting & Video Nghệ thuật',
      en: 'Light-painting photography & art video',
    },
    category: 'visual_art',
    date: { vi: 'Tháng 11, 2025', en: 'November 2025' },
    location: { vi: 'Studio Không Gian Tối Sài Gòn', en: 'Dark-Space Studio, Saigon' },
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    description: {
      vi: 'Bộ ảnh phơi sáng dài (Long Exposure Light Painting) và video ngắn 4K khám phá các hình khối học fractal được vẽ bằng vệt sáng LED di động.',
      en: 'A long-exposure light-painting series and 4K short film exploring fractal geometry drawn with moving LED trails.',
    },
    propsUsed: ['HyperLoop LED Hoop', 'Vortex Pixel Contact Staff'],
    duration: { vi: 'Dự án triển lãm số', en: 'Digital exhibition project' },
    highlights: {
      vi: ['Tạo hơn 40 bức ảnh phơi sáng độc bản', 'Được đăng trên tạp chí nghệ thuật thị giác', 'Cảm hứng tạo hình không giới hạn'],
      en: ['Created 40+ one-of-a-kind long-exposure shots', 'Featured in a visual-arts magazine', 'Boundless creative inspiration'],
    },
  },
  {
    id: 'ravolution-stage-storm',
    title: { vi: 'Ravolution Music Festival Arena', en: 'Ravolution Music Festival Arena' },
    subtitle: {
      vi: 'Bão ánh sáng cùng dàn DJ Top 100 Thế Giới',
      en: 'A storm of light alongside Top 100 world DJs',
    },
    category: 'festival',
    date: { vi: 'Tháng 09, 2025', en: 'September 2025' },
    location: { vi: 'SECC, Quận 7, TP. Hồ Chí Minh', en: 'SECC, District 7, Ho Chi Minh City' },
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop',
    description: {
      vi: 'Biểu diễn giữa đám đông rave với trang phục LED phản quang và visual poi đồng bộ nhịp nhạc EDM sôi động.',
      en: 'Performed inside the rave crowd in a reflective LED costume, with visual poi synced to pulsing EDM.',
    },
    propsUsed: ['Visual Pixel Poi HD-160', 'CyberSilk LED Fans'],
    duration: { vi: '20 phút set diễn liên tục', en: '20-min continuous set' },
    highlights: {
      vi: ['Tương tác cự ly gần cùng khán giả', 'Hiệu ứng ánh sáng 360 độ ngập tràn', 'Đạo cụ siêu sáng nổi bật cả khán phòng'],
      en: ['Up-close interaction with the crowd', 'Immersive 360° light effects', 'Ultra-bright props that lit up the whole arena'],
    },
  },
  {
    id: 'luxury-wedding-magic-night',
    title: { vi: 'Tiệc Cưới Hoàng Gia "Khu Vườn Ánh Sao"', en: 'Royal Wedding "Garden of Starlight"' },
    subtitle: {
      vi: 'Màn múa đôi lãng mạn cùng dải lụa LED mềm mại',
      en: 'A romantic duet with soft LED silk ribbons',
    },
    category: 'corporate',
    date: { vi: 'Tháng 02, 2026', en: 'February 2026' },
    location: { vi: 'InterContinental Danang Sun Peninsula', en: 'InterContinental Danang Sun Peninsula' },
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000&auto=format&fit=crop',
    description: {
      vi: 'Màn biểu diễn nhẹ nhàng, thơ mộng mang phong cách tiên cảnh với quạt LED phát sáng màu vàng ấm và trắng kim cương.',
      en: 'A gentle, dreamlike fairy-tale performance with LED fans glowing warm gold and diamond white.',
    },
    propsUsed: ['CyberSilk LED Fans', 'HyperLoop Smart LED Hoop'],
    duration: { vi: '10 phút lãng mạn', en: '10 romantic minutes' },
    highlights: {
      vi: ['Âm nhạc giao hưởng êm dịu hòa quyện ánh sáng', 'Không gian tiệc cưới lung linh như cổ tích'],
      en: ['Soft symphonic music woven with light', 'A wedding space shimmering like a fairy tale'],
    },
  },
];

export function getPerformances(lang: Lang): PerformanceItem[] {
  return RAW_PERFORMANCES.map((p) => ({
    id: p.id,
    title: pick(p.title, lang),
    subtitle: pick(p.subtitle, lang),
    category: p.category,
    date: pick(p.date, lang),
    location: pick(p.location, lang),
    image: p.image,
    videoUrl: p.videoUrl,
    description: pick(p.description, lang),
    propsUsed: p.propsUsed,
    duration: pick(p.duration, lang),
    highlights: pickArr(p.highlights, lang),
  }));
}

// ------------------------------ SERVICES -----------------------------------

interface RawService {
  id: string;
  iconName: string;
  title: L;
  tagline: L;
  description: L;
  features: LArr;
  accentColor: string;
  ctaText: L;
}

const RAW_SERVICES: RawService[] = [
  {
    id: 'service-performance',
    iconName: 'Sparkles',
    title: { vi: 'Biểu Diễn Sự Kiện & Festival', en: 'Event & Festival Performances' },
    tagline: {
      vi: 'Điểm nhấn bùng nổ thị giác cho đêm hội của bạn',
      en: 'An explosive visual highlight for your night',
    },
    description: {
      vi: 'Cung cấp tiết mục biểu diễn ánh sáng nghệ thuật đỉnh cao cho Countdown, EDM Festival, Gala Dinner, Lễ ra mắt sản phẩm và Tiệc cưới cao cấp. Tiết mục được biên đạo riêng khớp với thông điệp và âm nhạc của khách hàng.',
      en: 'Top-tier artistic light acts for countdowns, EDM festivals, gala dinners, product launches and luxury weddings. Each act is choreographed to your message and music.',
    },
    features: {
      vi: [
        'Hiển thị logo / thông điệp nhãn hàng trên không gian',
        'Trang phục biểu diễn LED phát sáng đồng bộ',
        'Đội ngũ biểu diễn Solo hoặc Nhóm (2 - 8 nghệ sĩ)',
        'Hỗ trợ khảo sát sân khấu và lập trình kịch bản DMX',
      ],
      en: [
        'Display brand logos / messages in mid-air',
        'Synced glowing LED performance costumes',
        'Solo or group performers (2 - 8 artists)',
        'Stage surveys and DMX script programming',
      ],
    },
    accentColor: '#f00ac0',
    ctaText: { vi: 'Đặt Lịch Trình Diễn', en: 'Book a Show' },
  },
  {
    id: 'service-custom-props',
    iconName: 'Wrench',
    title: { vi: 'Thiết Kế & Chế Tác Đạo Cụ Custom', en: 'Custom Prop Design & Fabrication' },
    tagline: {
      vi: 'Hiện thực hóa mọi ý tưởng đạo cụ ánh sáng độc bản',
      en: 'Bringing every unique light-prop idea to life',
    },
    description: {
      vi: 'Nhận thiết kế, gia công và lập trình đạo cụ LED theo yêu cầu riêng của nghệ sĩ, đoàn xiếc và các công ty sản xuất sự kiện. Từ Pixel Poi, Dragon Staff đến trang phục LED thông minh.',
      en: 'We design, build and program bespoke LED props for artists, circus troupes and event-production companies — from Pixel Poi and Dragon Staff to smart LED costumes.',
    },
    features: {
      vi: [
        'Lựa chọn độ phân giải LED và kích thước theo thông số',
        'Vật liệu sợi carbon, nhôm vũ trụ, Polycarbonate siêu bền',
        'Phần mềm nạp hiệu ứng dễ dùng kèm hướng dẫn chi tiết',
        'Bảo hành chính hãng 12 tháng, hỗ trợ kỹ thuật trọn đời',
      ],
      en: [
        'Choose LED resolution and size to spec',
        'Carbon fiber, aerospace aluminium and ultra-durable polycarbonate',
        'Easy effect-loading software with detailed guides',
        'A 12-month official warranty and lifetime tech support',
      ],
    },
    accentColor: '#00e5ff',
    ctaText: { vi: 'Tư Vấn Chế Tác', en: 'Discuss a Build' },
  },
  {
    id: 'service-rental',
    iconName: 'PackageCheck',
    title: { vi: 'Cho Thuê Đạo Cụ & Thiết Bị LED', en: 'LED Prop & Equipment Rental' },
    tagline: {
      vi: 'Giải pháp tối ưu cho quay MV, chụp ảnh và show ngắn ngày',
      en: 'The ideal fit for MV shoots, photography and short shows',
    },
    description: {
      vi: 'Cung cấp dịch vụ cho thuê trọn gói các dòng đạo cụ LED cao cấp đã nạp sẵn hiệu ứng, đầy đủ phụ kiện sạc, pin dự phòng và kỹ thuật viên hỗ trợ vận hành tại phim trường.',
      en: 'Full-package rental of premium LED props preloaded with effects, complete with chargers, spare batteries and an on-set technician.',
    },
    features: {
      vi: [
        'Đạo cụ luôn trong tình trạng mới 99%, pin dung lượng chuẩn',
        'Có sẵn thư viện 200+ hiệu ứng ánh sáng chuyên nghiệp',
        'Hỗ trợ nạp logo/hình ảnh theo kịch bản trước ngày thuê',
        'Thủ tục nhanh gọn, giá ưu đãi cho dự án nghệ thuật',
      ],
      en: [
        'Props kept 99% like-new, batteries at full capacity',
        'A library of 200+ professional light effects',
        'Logo/image loading per script before pickup',
        'Quick paperwork and special rates for art projects',
      ],
    },
    accentColor: '#8b2fe8',
    ctaText: { vi: 'Xem Báo Giá Thuê', en: 'See Rental Pricing' },
  },
  {
    id: 'service-workshop',
    iconName: 'GraduationCap',
    title: { vi: 'Workshop & Đào Tạo Flow-Arts', en: 'Flow-Arts Workshops & Training' },
    tagline: {
      vi: 'Lan tỏa đam mê bộ môn nghệ thuật dòng chảy ánh sáng',
      en: 'Spreading a passion for the art of flowing light',
    },
    description: {
      vi: 'Các khóa học từ cơ bản đến nâng cao dành cho người mới bắt đầu và nghệ sĩ muốn nâng cấp kỹ năng: Poi Spinning, Dragon Staff, Contact Staff, LED Hoop và kỹ năng biểu diễn sân khấu.',
      en: 'Beginner-to-advanced courses for newcomers and artists leveling up: poi spinning, Dragon Staff, contact staff, LED hoop and stage-performance skills.',
    },
    features: {
      vi: [
        'Giáo trình bài bản từ cơ bản kiểm soát cơ thể đến combo nâng cao',
        'Cung cấp đạo cụ tập luyện an toàn trong suốt khóa học',
        'Hướng dẫn kỹ thuật quay phim, chụp ảnh phơi sáng',
        'Cộng đồng flow-art giao lưu hàng tuần tại TP.HCM & Hà Nội',
      ],
      en: [
        'A structured curriculum from body control to advanced combos',
        'Safe practice props provided throughout the course',
        'Guidance on filming and long-exposure photography',
        'A weekly flow-art community meetup in HCMC & Hanoi',
      ],
    },
    accentColor: '#ff8a00',
    ctaText: { vi: 'Đăng Ký Khóa Học', en: 'Enroll Now' },
  },
];

export function getServices(lang: Lang): ServiceItem[] {
  return RAW_SERVICES.map((s) => ({
    id: s.id,
    iconName: s.iconName,
    title: pick(s.title, lang),
    tagline: pick(s.tagline, lang),
    description: pick(s.description, lang),
    features: pickArr(s.features, lang),
    accentColor: s.accentColor,
    ctaText: pick(s.ctaText, lang),
  }));
}

// ---------------------------- TESTIMONIALS ---------------------------------

interface RawTestimonial {
  id: string;
  clientName: string;
  clientRole: L;
  organization: string;
  avatar: string;
  content: L;
  rating: number;
  event: L;
  accentGlow: string;
}

const RAW_TESTIMONIALS: RawTestimonial[] = [
  {
    id: 'test-1',
    clientName: 'Alex Nguyễn',
    clientRole: { vi: 'Event Director', en: 'Event Director' },
    organization: 'Apex Media & Entertainment',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    content: {
      vi: 'Màn xuất hiện của LED2TOY tại đêm Gala VinFast thực sự khiến cả khán phòng vỡ òa. Khi logo thương hiệu hiện lên sắc nét giữa các vòng xoay Poi tốc độ cao, toàn bộ ban lãnh đạo đều đứng dậy vỗ tay!',
      en: "LED2TOY's appearance at the VinFast gala brought the whole room to its feet. When the brand logo appeared crisp amid high-speed Poi spins, the entire leadership team stood and applauded!",
    },
    rating: 5,
    event: { vi: 'VinFast Corporate Gala', en: 'VinFast Corporate Gala' },
    accentGlow: '#f00ac0',
  },
  {
    id: 'test-2',
    clientName: 'Trần Minh Hoàng',
    clientRole: { vi: 'Trưởng Ban Tổ Chức', en: 'Head of Organizing' },
    organization: 'Ravolution EDM Festival',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    content: {
      vi: 'Đạo cụ LED của LED2TOY rất sáng và bền. Dù biểu diễn cuồng nhiệt trên sân khấu lớn với độ ẩm cao, thiết bị vẫn hoạt động hoàn hảo suốt 4 tiếng. Đây là đối tác biểu diễn ánh sáng số 1 mà chúng tôi luôn tin tưởng.',
      en: "LED2TOY's props are bright and tough. Even through an intense set on a big, humid stage, the gear ran flawlessly for 4 hours. They are the No.1 light-performance partner we always trust.",
    },
    rating: 5,
    event: { vi: 'Ravolution Arena', en: 'Ravolution Arena' },
    accentGlow: '#00e5ff',
  },
  {
    id: 'test-3',
    clientName: 'Hoàng Yến Chi',
    clientRole: { vi: 'Nghệ Sĩ Flow Art Solo', en: 'Solo Flow Art Artist' },
    organization: 'Hà Nội Flow Community',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    content: {
      vi: 'Mình đặt cây Dragon Staff Pixel 2.0 từ LED2TOY, độ cân bằng tốt hơn nhiều so với các dòng nhập khẩu từ châu Âu mà giá thành lại hợp lý. Cảm giác roll gậy cực kỳ đầm tay, hiệu ứng led thôi miên luôn!',
      en: 'I ordered the Dragon Staff Pixel 2.0 from LED2TOY — far better balanced than European imports and at a reasonable price. Rolling it feels incredibly solid, and the LED effects are hypnotic!',
    },
    rating: 5,
    event: { vi: 'Khách Hàng Đạo Cụ Custom', en: 'Custom Prop Client' },
    accentGlow: '#ff8a00',
  },
  {
    id: 'test-4',
    clientName: 'Quốc Bảo',
    clientRole: { vi: 'Creative Director', en: 'Creative Director' },
    organization: 'Sun World Entertainment',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    content: {
      vi: 'Phong cách làm việc cực kỳ chuyên nghiệp và đúng giờ. LED2TOY luôn mang đến những ý tưởng thị giác mới lạ giúp các show đêm của Sun World luôn giữ được sức hút đặc biệt với du khách.',
      en: "An extremely professional and punctual working style. LED2TOY always brings fresh visual ideas that keep Sun World's night shows uniquely captivating for visitors.",
    },
    rating: 5,
    event: { vi: 'Sun World Night Parade', en: 'Sun World Night Parade' },
    accentGlow: '#8b2fe8',
  },
];

export function getTestimonials(lang: Lang): TestimonialItem[] {
  return RAW_TESTIMONIALS.map((t) => ({
    id: t.id,
    clientName: t.clientName,
    clientRole: pick(t.clientRole, lang),
    organization: t.organization,
    avatar: t.avatar,
    content: pick(t.content, lang),
    rating: t.rating,
    event: pick(t.event, lang),
    accentGlow: t.accentGlow,
  }));
}

// ------------------------------ PARTNERS -----------------------------------

interface RawPartner {
  name: string;
  category: L;
  logoText: string;
  accent: string;
}

const RAW_PARTNERS: RawPartner[] = [
  { name: 'SUN GROUP', category: { vi: 'Giải Trí & Du Lịch', en: 'Entertainment & Tourism' }, logoText: 'SUN WORLD', accent: '#ff8a00' },
  { name: 'RAVOLUTION', category: { vi: 'EDM Festival', en: 'EDM Festival' }, logoText: 'RAVOLUTION', accent: '#00e5ff' },
  { name: 'EPIZODE', category: { vi: 'Beach Festival', en: 'Beach Festival' }, logoText: 'EPIZODE FEST', accent: '#f00ac0' },
  { name: 'HEINEKEN', category: { vi: 'Countdown Show', en: 'Countdown Show' }, logoText: 'HEINEKEN LIVE', accent: '#00ff88' },
  { name: 'VINFAST', category: { vi: 'Launch Event', en: 'Launch Event' }, logoText: 'VINFAST', accent: '#00e5ff' },
  { name: 'TIGER CRYSTAL', category: { vi: 'Rave Stage', en: 'Rave Stage' }, logoText: 'TIGER CRYSTAL', accent: '#00e5ff' },
  { name: 'YAMAHA MOTOR', category: { vi: 'Motor Show', en: 'Motor Show' }, logoText: 'YAMAHA EXPO', accent: '#f00ac0' },
  { name: 'SAIGON FLOW', category: { vi: 'Arts Fest', en: 'Arts Fest' }, logoText: 'VN FLOW ARTS', accent: '#8b2fe8' },
];

export function getPartners(lang: Lang): PartnerItem[] {
  return RAW_PARTNERS.map((p) => ({
    name: p.name,
    category: pick(p.category, lang),
    logoText: p.logoText,
    accent: p.accent,
  }));
}

// ---------------------------- SIMULATOR ------------------------------------

export interface SimulatorMode {
  id: string;
  name: string;
  colors: string[];
  trailLength: number;
  speed: number;
  description: string;
}

interface RawSimulatorMode {
  id: string;
  name: string;
  colors: string[];
  trailLength: number;
  speed: number;
  description: L;
}

const RAW_SIMULATOR_MODES: RawSimulatorMode[] = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon Vortex',
    colors: ['#f00ac0', '#00e5ff', '#8b2fe8'],
    trailLength: 28,
    speed: 1.2,
    description: {
      vi: 'Sự pha trộn sắc màu tương lai của Cyberpunk giữa hồng magenta và xanh cyan phát sáng rực rỡ.',
      en: 'A futuristic Cyberpunk blend of glowing magenta and cyan.',
    },
  },
  {
    id: 'fire-dragon',
    name: 'Fire Phoenix Flame',
    colors: ['#ff8a00', '#ff2a00', '#ffe600'],
    trailLength: 35,
    speed: 1.5,
    description: {
      vi: 'Mô phỏng ngọn lửa ma thuật bập bùng với đuôi tàn lửa vàng cam chuyển động dồn dập.',
      en: 'A flickering magical flame with a rushing amber-gold ember tail.',
    },
  },
  {
    id: 'aurora-borealis',
    name: 'Galactic Aurora',
    colors: ['#00ff88', '#00e5ff', '#8b2fe8', '#f00ac0'],
    trailLength: 40,
    speed: 0.9,
    description: {
      vi: 'Dải lụa cực quang phương Bắc huyền ảo mềm mại đan xen trong bóng đêm.',
      en: 'Soft, mystical northern-aurora ribbons weaving through the dark.',
    },
  },
  {
    id: 'hyper-strobe',
    name: 'Hyperdrive Strobe',
    colors: ['#ffffff', '#00e5ff', '#f00ac0'],
    trailLength: 15,
    speed: 2.2,
    description: {
      vi: 'Hiệu ứng nhấp nháy tần số cao dành cho những đoạn cao trào EDM bùng nổ.',
      en: 'High-frequency strobing for explosive EDM peaks.',
    },
  },
  {
    id: 'rainbow-flow',
    name: 'Full Spectrum Rainbow',
    colors: ['#ff0055', '#ff9900', '#ffee00', '#00ff66', '#00ccff', '#9900ff'],
    trailLength: 32,
    speed: 1.3,
    description: {
      vi: '7 sắc cầu vồng mượt mà quét qua không gian 360 độ hoàn mỹ.',
      en: 'Seven rainbow hues sweeping smoothly through a perfect 360°.',
    },
  },
];

export function getSimulatorModes(lang: Lang): SimulatorMode[] {
  return RAW_SIMULATOR_MODES.map((m) => ({
    id: m.id,
    name: m.name,
    colors: m.colors,
    trailLength: m.trailLength,
    speed: m.speed,
    description: pick(m.description, lang),
  }));
}
