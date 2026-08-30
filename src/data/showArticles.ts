import type { Lang } from '../i18n/config';
import type { ShowArticle } from '../types';
import { SHOW_ARTICLE_IDS } from './showArticleIds';

// ---------------------------------------------------------------------------
// Long-form content for the standalone show pages (/show/<id>/).
//
// Keyed by the PerformanceItem id, so a card in PerformancePortfolio and its
// article always stay in sync. Same localized-leaf convention as mockData.ts:
// `{ vi, en, zh? }`, resolved through pick()/pickArr() by getShowArticle().
//
// This is placeholder editorial copy expanded from the existing show data —
// swap the paragraphs, gallery images and `youtubeId` for the real material as
// it becomes available. The page layout does not need to change.
// ---------------------------------------------------------------------------

type L = { vi: string; en: string; zh?: string };
type LArr = { vi: string[]; en: string[]; zh?: string[] };

const pick = (l: L, lang: Lang): string => l[lang] ?? l.vi;
const pickArr = (l: LArr, lang: Lang): string[] => l[lang] ?? l.vi;

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1000&auto=format&fit=crop`;

interface RawShowArticle {
  id: string;
  publishedAt: string;
  readMinutes: number;
  lead: L;
  /** YouTube video id — leave undefined until the real recap video exists. */
  youtubeId?: string;
  sections: { heading: L; body: LArr }[];
  gallery: { src: string; caption: L }[];
  facts: { label: L; value: L }[];
  credits: { role: L; name: string }[];
  quote?: { text: L; author: L };
}

const RAW_SHOW_ARTICLES: RawShowArticle[] = [
  // -------------------------------------------------------------------------
  {
    id: 'epizode-rave-2025',
    publishedAt: '2025-12-28',
    readMinutes: 6,
    lead: {
      vi: 'Đêm mở màn sân khấu chính Epizode tại Phú Quốc là một trong những set diễn khó nhất NCTA từng thực hiện: gió biển mạnh, sân khấu cát, và hơn 5.000 khán giả quốc tế đứng sát mép sàn diễn. Đây là toàn bộ câu chuyện phía sau 25 phút ánh sáng đó.',
      en: 'Opening the Epizode main stage in Phu Quoc was one of the hardest sets NCTA has ever performed: hard sea wind, a sand stage, and 5,000+ international guests pressed against the edge of the floor. Here is the full story behind those 25 minutes of light.',
    },
    sections: [
      {
        heading: { vi: 'Bối cảnh: một sân khấu bên bờ biển', en: 'The brief: a stage on the shoreline' },
        body: {
          vi: [
            'Epizode là festival điện tử kéo dài nhiều ngày trên đảo Phú Quốc, nổi tiếng với các sân khấu dựng thẳng trên bãi cát và kết thúc khi mặt trời mọc. Ban tổ chức muốn một tiết mục mở màn không dùng pháo hoa — thứ gì đó "mềm hơn, nhưng vẫn phải nhìn thấy từ cuối bãi".',
            'NCTA đề xuất một set Visual Poi HD kết hợp Dragon Staff, với toàn bộ hiệu ứng được lập trình sẵn theo bản nhạc mở màn của DJ. Ý tưởng cốt lõi: dùng chính chuyển động của nghệ sĩ để "vẽ" logo festival lên không trung, thay vì chiếu nó lên màn LED.',
          ],
          en: [
            'Epizode is a multi-day electronic festival on Phu Quoc island, known for stages built straight onto the sand and sets that end at sunrise. The organisers wanted an opening act without pyrotechnics — something "softer, but still visible from the back of the beach".',
            'NCTA proposed a Visual Poi HD set combined with Dragon Staff, every effect pre-programmed against the DJ’s opening track. The core idea: use the performer’s own movement to draw the festival logo in mid-air, rather than projecting it onto an LED wall.',
          ],
        },
      },
      {
        heading: { vi: 'Chuẩn bị: lập trình và tập chạy', en: 'Preparation: programming and run-throughs' },
        body: {
          vi: [
            'Toàn bộ hình ảnh hiển thị trên Visual Poi được dựng ở dạng chuỗi frame 160 pixel, sau đó nạp vào bộ nhớ của đạo cụ. Mỗi frame chỉ tồn tại vài mili-giây, nên tốc độ quay tay của nghệ sĩ phải khớp gần như tuyệt đối với tốc độ phát frame — sai một nhịp là hình bị kéo méo.',
            'Nhóm dành hai tuần tập chạy trong studio tối, quay lại bằng máy phơi sáng dài để kiểm tra hình có "đọc" được không. Riêng phần logo festival phải chỉnh lại 11 lần mới đạt độ sắc nét mong muốn.',
            'Ba ngày trước show, cả ê-kíp ra đảo để thử nghiệm trong điều kiện thật. Gió biển làm quỹ đạo poi lệch đáng kể so với trong nhà — đây là lý do bản dựng cuối cùng giảm bớt các hình phức tạp và tăng số hiệu ứng chuyển màu.',
          ],
          en: [
            'Every image shown on the Visual Poi was authored as a 160-pixel frame sequence and loaded into the props’ onboard memory. Each frame lives for only a few milliseconds, so the performer’s spin rate has to match the playback rate almost exactly — a beat off and the image smears.',
            'The team spent two weeks rehearsing in a blacked-out studio, filming with long exposures to check whether each image actually "read". The festival logo alone was re-cut eleven times before it was sharp enough.',
            'Three days before the show the crew flew out to test in real conditions. Sea wind bent the poi orbits noticeably compared to indoors — which is why the final build dropped some of the complex figures and leaned harder on colour transitions.',
          ],
        },
      },
      {
        heading: { vi: 'Đêm diễn', en: 'Show night' },
        body: {
          vi: [
            'Set diễn bắt đầu lúc 22:40, ngay sau khi hệ thống đèn sân khấu chính tắt hoàn toàn trong 5 giây — một khoảng tối có chủ đích để mắt khán giả kịp thích nghi trước khi đạo cụ LED sáng lên.',
            '15 phút đầu là phần solo Visual Poi, chuyển dần từ các hoạ tiết hình học sang biểu tượng festival. 10 phút sau là phần tương tác với DJ: mỗi cú drop bass kích hoạt một bảng màu khác, được điều khiển thủ công bằng remote từ bàn kỹ thuật.',
            'Video recap do ban tổ chức đăng tải đạt hơn 50.000 lượt xem trong tuần đầu tiên, và là clip có tương tác cao nhất trong toàn bộ chiến dịch truyền thông của mùa festival năm đó.',
          ],
          en: [
            'The set started at 22:40, right after the main stage lighting rig cut to black for five seconds — a deliberate gap so the audience’s eyes could adapt before the LED props came up.',
            'The first 15 minutes were the Visual Poi solo, moving from geometric patterns into the festival iconography. The following 10 minutes were the DJ interaction: each bass drop triggered a different palette, cued by hand from the tech desk.',
            'The organiser’s recap video passed 50,000 views in its first week and became the highest-engagement clip of that season’s entire campaign.',
          ],
        },
      },
    ],
    gallery: [
      { src: img('1514525253161-7a46d19cd819'), caption: { vi: 'Sân khấu chính Epizode nhìn từ khu vực khán giả', en: 'The Epizode main stage seen from the crowd' } },
      { src: img('1508700115892-45ecd05ae2ad'), caption: { vi: 'Visual Poi HD trong phần solo mở màn', en: 'Visual Poi HD during the opening solo' } },
      { src: img('1500648767791-00dcc994a43e'), caption: { vi: 'Hiệu ứng chuyển màu theo nhịp bass', en: 'Colour transitions cued to the bass' } },
      { src: img('1509198397868-475647b2a1e5'), caption: { vi: 'Khán giả quốc tế trong 10 phút tương tác cùng DJ', en: 'International guests during the 10-minute DJ interaction' } },
    ],
    facts: [
      { label: { vi: 'Quy mô khán giả', en: 'Audience size' }, value: { vi: 'Hơn 5.000 người', en: '5,000+ people' } },
      { label: { vi: 'Thời lượng', en: 'Run time' }, value: { vi: '25 phút (15 solo + 10 tương tác)', en: '25 min (15 solo + 10 interactive)' } },
      { label: { vi: 'Thời gian chuẩn bị', en: 'Preparation' }, value: { vi: '2 tuần tập + 3 ngày dựng tại chỗ', en: '2 weeks rehearsal + 3 days on site' } },
      { label: { vi: 'Điều kiện', en: 'Conditions' }, value: { vi: 'Ngoài trời, sân khấu cát, gió biển', en: 'Outdoor, sand stage, sea wind' } },
    ],
    credits: [
      { role: { vi: 'Biểu diễn & lập trình đạo cụ', en: 'Performance & prop programming' }, name: 'NCTA' },
      { role: { vi: 'Đơn vị tổ chức', en: 'Event organiser' }, name: 'Epizode Festival' },
      { role: { vi: 'Địa điểm', en: 'Venue' }, name: 'Sunset Sanato, Phú Quốc' },
    ],
    quote: {
      text: {
        vi: 'Điều khó nhất không phải là quay nhanh, mà là quay đều. Gió biển khiến mỗi vòng poi lệch đi một chút, và khán giả sẽ thấy ngay nếu hình bị méo.',
        en: 'The hard part is not spinning fast, it is spinning evenly. Sea wind shifts every orbit slightly, and the audience sees it immediately if the image smears.',
      },
      author: { vi: 'NCTA', en: 'NCTA' },
    },
  },

  // -------------------------------------------------------------------------
  {
    id: 'vinfast-luxury-gala',
    publishedAt: '2025-10-22',
    readMinutes: 5,
    lead: {
      vi: 'Một gala ra mắt sản phẩm không giống một festival: mọi hiệu ứng đều phải phục vụ thông điệp thương hiệu, và không được phép sai một giây nào vì toàn bộ chương trình chạy theo timecode. Đây là cách NCTA dựng 8 phút mở màn cho đêm gala VinFast tại Hà Nội.',
      en: 'A product launch gala is nothing like a festival: every effect has to serve the brand message, and nothing may drift by even a second because the whole show runs on timecode. Here is how NCTA built the 8-minute opener for VinFast’s gala night in Hanoi.',
    },
    sections: [
      {
        heading: { vi: 'Yêu cầu từ thương hiệu', en: 'What the brand asked for' },
        body: {
          vi: [
            'Đề bài ban đầu rất cụ thể: tiết mục mở màn phải hiển thị được ba từ khoá chiến lược của thương hiệu và cụm thông điệp "Green Future", bằng ánh sáng, trong không gian hội trường có trần thấp và hệ thống đèn sân khấu đã kín lịch.',
            'Điều đó loại bỏ phương án dùng đạo cụ có quỹ đạo lớn. Nhóm chọn Visual Pixel Poi HD-160 kết hợp CyberSilk LED Fans — quạt LED cho diện tích hiển thị rộng mà không cần nhiều không gian phía trên đầu.',
          ],
          en: [
            'The brief was specific: the opening act had to spell out three of the brand’s strategic keywords plus the "Green Future" message, in light, inside a low-ceilinged hall whose lighting rig was already fully booked.',
            'That ruled out props with wide orbits. The team went with Visual Pixel Poi HD-160 plus CyberSilk LED Fans — the fans give a large display surface without demanding much headroom.',
          ],
        },
      },
      {
        heading: { vi: 'Đồng bộ DMX với hệ thống sân khấu', en: 'DMX-syncing with the house rig' },
        body: {
          vi: [
            'Khác với show ngoài trời, đạo cụ ở đây không hoạt động độc lập mà được đồng bộ với bàn điều khiển ánh sáng của sân khấu qua DMX. Khi đèn sân khấu chuyển sang tông xanh lá cho phần "Green Future", đạo cụ LED đổi màu cùng lúc, trong cùng một khung hình.',
            'Việc này đòi hỏi hai buổi kỹ thuật riêng với đội ánh sáng của địa điểm để căn timecode. Sai lệch chấp nhận được là dưới 100 mili-giây — trên mức đó, khán giả ngồi hàng ghế đầu sẽ nhận ra hai hệ thống không cùng nhịp.',
          ],
          en: [
            'Unlike an outdoor show, the props here did not run standalone — they were slaved to the venue lighting desk over DMX. When the house rig turned green for the "Green Future" beat, the LED props changed colour in the same frame.',
            'That took two dedicated tech sessions with the venue’s lighting crew to lock the timecode. Acceptable drift was under 100 milliseconds; beyond that, front-row guests notice the two systems are not in step.',
          ],
        },
      },
      {
        heading: { vi: 'Kết quả', en: 'Outcome' },
        body: {
          vi: [
            'Tiết mục chạy đúng 8 phút, khớp timecode ở cả hai buổi tổng duyệt và đêm diễn chính. Phần hiển thị logo thương hiệu đạt độ sắc nét đủ để đội truyền thông cắt trực tiếp làm ảnh tư liệu mà không cần xử lý hậu kỳ.',
            'Sau đêm gala, phần dựng này được dùng lại (với bảng màu điều chỉnh) cho hai sự kiện nội bộ khác của cùng thương hiệu.',
          ],
          en: [
            'The act ran to exactly 8 minutes and held timecode through both rehearsals and the live night. The brand-logo passage was sharp enough that the comms team cut stills straight from the footage with no retouching.',
            'After the gala the same build was reused, with an adjusted palette, for two further internal events for the same brand.',
          ],
        },
      },
    ],
    gallery: [
      { src: img('1492684223066-81342ee5ff30'), caption: { vi: 'Không gian hội trường trước giờ mở màn', en: 'The hall before doors' } },
      { src: img('1517841905240-472988babdf9'), caption: { vi: 'Chạy kỹ thuật đồng bộ DMX', en: 'DMX sync tech run' } },
      { src: img('1507003211169-0a1dd7228f2d'), caption: { vi: 'Quạt LED trong phần hiển thị thông điệp', en: 'LED fans during the message sequence' } },
      { src: img('1534528741775-53994a69daeb'), caption: { vi: 'Khách mời VIP tại khu vực sân khấu chính', en: 'VIP guests at the main stage' } },
    ],
    facts: [
      { label: { vi: 'Loại sự kiện', en: 'Event type' }, value: { vi: 'Gala ra mắt sản phẩm', en: 'Product launch gala' } },
      { label: { vi: 'Thời lượng', en: 'Run time' }, value: { vi: '8 phút mở màn', en: '8-minute opener' } },
      { label: { vi: 'Đồng bộ', en: 'Sync' }, value: { vi: 'DMX theo timecode sân khấu', en: 'DMX, locked to house timecode' } },
      { label: { vi: 'Sai lệch cho phép', en: 'Drift tolerance' }, value: { vi: 'Dưới 100 mili-giây', en: 'Under 100 ms' } },
    ],
    credits: [
      { role: { vi: 'Biểu diễn & lập trình đạo cụ', en: 'Performance & prop programming' }, name: 'NCTA' },
      { role: { vi: 'Thương hiệu', en: 'Brand' }, name: 'VinFast' },
      { role: { vi: 'Địa điểm', en: 'Venue' }, name: 'Trung tâm Hội nghị Quốc gia, Hà Nội' },
    ],
    quote: {
      text: {
        vi: 'Ở sự kiện thương hiệu, đẹp thôi chưa đủ. Nếu ba từ khoá không hiện ra rõ ràng thì tiết mục đã thất bại, dù nó lung linh đến đâu.',
        en: 'At a brand event, beautiful is not enough. If the three keywords do not read clearly, the act has failed — however pretty it looked.',
      },
      author: { vi: 'NCTA', en: 'NCTA' },
    },
  },

  // -------------------------------------------------------------------------
  {
    id: 'countdown-saigon-lights',
    publishedAt: '2026-01-05',
    readMinutes: 5,
    lead: {
      vi: '60 giây cuối cùng của năm, trên phố đi bộ Nguyễn Huệ, phát sóng trực tiếp trên truyền hình quốc gia. Không có cơ hội diễn lại. Đây là ghi chép về màn tung hứng LED tốc độ cao mà NCTA thực hiện trong khoảnh khắc đếm ngược.',
      en: 'The last 60 seconds of the year, on Nguyen Hue walking street, live on national television. No second take. These are the notes from the high-speed LED juggling act NCTA performed through the countdown.',
    },
    sections: [
      {
        heading: { vi: 'Diễn trực tiếp trên sóng truyền hình', en: 'Performing live on air' },
        body: {
          vi: [
            'Khác biệt lớn nhất của một show countdown truyền hình là ống kính. Máy quay đặt cố định ở ba vị trí, và đạo diễn hình cắt cảnh theo kịch bản đã duyệt — nghĩa là nghệ sĩ phải đứng đúng điểm, đúng hướng, đúng giây.',
            'Đội NCTA nhận bản kịch bản hình 10 ngày trước, đánh dấu từng mốc cắt cảnh, rồi dựng lại phần diễn quanh các mốc đó thay vì ngược lại. Ba lần chạy thử tại chỗ được thực hiện vào rạng sáng, khi phố đi bộ vắng người.',
          ],
          en: [
            'The biggest difference with a televised countdown is the camera. Three fixed positions, and the vision director cuts to an approved script — meaning the performer must be on the right mark, facing the right way, on the right second.',
            'NCTA received the camera script ten days out, marked every cut point, then built the act around those marks rather than the other way round. Three on-site run-throughs happened at dawn, when the street was empty.',
          ],
        },
      },
      {
        heading: { vi: 'Tung hứng LED ở tốc độ cao', en: 'LED juggling at speed' },
        body: {
          vi: [
            'Phần chính sử dụng AeroGlow LED Juggling Clubs — cây tung hứng có LED chạy dọc thân, đủ sáng để máy quay bắt được vệt sáng mà không cần tăng ISO. Ở tốc độ tung nhanh, mỗi cây tạo ra một vệt cong liên tục trên khung hình.',
            'Phần kết chuyển sang Dragon Staff, đồng bộ với khói màu và tia laser của sân khấu chính trong đúng 15 giây trước giao thừa. Đây là đoạn duy nhất trong toàn bộ chương trình mà ba hệ thống hiệu ứng chạy cùng lúc.',
          ],
          en: [
            'The core section used AeroGlow LED Juggling Clubs — clubs with LEDs running the length of the body, bright enough for the broadcast cameras to catch the trails without pushing ISO. At speed, each club draws one continuous curve across the frame.',
            'The finale switched to Dragon Staff, synced with the main stage’s coloured smoke and lasers for exactly the 15 seconds before midnight. It is the only passage in the whole show where all three effect systems ran together.',
          ],
        },
      },
      {
        heading: { vi: 'Rủi ro và phương án dự phòng', en: 'Risk and fallbacks' },
        body: {
          vi: [
            'Với một buổi diễn không thể quay lại, mọi đạo cụ đều có bản dự phòng đã sạc đầy, đặt ngay cánh gà, và một bộ điều khiển thứ hai chờ sẵn. Pin của toàn bộ đạo cụ được thay mới trước giờ diễn 40 phút.',
            'Kịch bản cũng có một phương án rút gọn 8 phút, dùng nếu phần trước đó của chương trình chạy quá giờ. Đêm đó không cần đến nó.',
          ],
          en: [
            'For a show with no second take, every prop had a fully-charged backup waiting in the wings plus a spare controller. All prop batteries were swapped 40 minutes before the call.',
            'The script also carried a cut-down 8-minute version in case the preceding segment overran. It was not needed that night.',
          ],
        },
      },
    ],
    gallery: [
      { src: img('1508700115892-45ecd05ae2ad'), caption: { vi: 'Phố đi bộ Nguyễn Huệ trước giờ đếm ngược', en: 'Nguyen Hue walking street before the countdown' } },
      { src: img('1500648767791-00dcc994a43e'), caption: { vi: 'Tung hứng LED tốc độ cao trên sân khấu chính', en: 'High-speed LED juggling on the main stage' } },
      { src: img('1516450360452-9312f5e86fc7'), caption: { vi: 'Vệt sáng bắt được qua ống kính phơi sáng dài', en: 'Light trails captured on a long exposure' } },
      { src: img('1509198397868-475647b2a1e5'), caption: { vi: 'Khoảnh khắc giao thừa cùng khói màu và laser', en: 'Midnight, with coloured smoke and lasers' } },
    ],
    facts: [
      { label: { vi: 'Loại sự kiện', en: 'Event type' }, value: { vi: 'Countdown ngoài trời, phát sóng trực tiếp', en: 'Outdoor countdown, live broadcast' } },
      { label: { vi: 'Thời lượng', en: 'Run time' }, value: { vi: '12 phút', en: '12 min' } },
      { label: { vi: 'Chạy thử', en: 'Rehearsals' }, value: { vi: '3 lần tại chỗ, vào rạng sáng', en: '3 on-site, at dawn' } },
      { label: { vi: 'Dự phòng', en: 'Backup' }, value: { vi: 'Đạo cụ + điều khiển dự phòng tại cánh gà', en: 'Spare props and controller in the wings' } },
    ],
    credits: [
      { role: { vi: 'Biểu diễn', en: 'Performance' }, name: 'NCTA' },
      { role: { vi: 'Địa điểm', en: 'Venue' }, name: 'Phố đi bộ Nguyễn Huệ, TP.HCM' },
      { role: { vi: 'Phát sóng', en: 'Broadcast' }, name: 'Truyền hình trực tiếp' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    id: 'light-painting-mv-art',
    publishedAt: '2025-11-18',
    readMinutes: 7,
    lead: {
      vi: '"Cyber Odyssey" không phải một buổi diễn — không có khán giả trong phòng. Đó là một dự án nhiếp ảnh phơi sáng dài, nơi mỗi bức ảnh là kết quả của một lần chuyển động duy nhất kéo dài 20 đến 90 giây trong bóng tối hoàn toàn.',
      en: '"Cyber Odyssey" was not a show — there was no audience in the room. It is a long-exposure photography project where every frame is the result of a single 20-to-90-second movement performed in total darkness.',
    },
    sections: [
      {
        heading: { vi: 'Light painting hoạt động thế nào', en: 'How light painting works' },
        body: {
          vi: [
            'Máy ảnh mở màn trập trong nhiều chục giây. Trong khoảng thời gian đó, phòng phải tối tuyệt đối; nguồn sáng duy nhất là đạo cụ LED di chuyển. Cảm biến ghi lại đường đi của ánh sáng thành một vệt liền, còn người cầm đạo cụ thì gần như vô hình vì không đủ sáng để lộ ra.',
            'Điều này đảo ngược mọi thói quen biểu diễn. Không có nhịp nhạc, không có khán giả phản hồi — chỉ có một quỹ đạo phải đi đúng ngay lần đầu, vì một bước lệch là hỏng cả khung hình và phải chụp lại từ đầu.',
          ],
          en: [
            'The camera holds its shutter open for tens of seconds. During that window the room must be absolutely dark; the only light source is the moving LED prop. The sensor records the light’s path as one continuous trail, while the person holding the prop stays effectively invisible — never lit enough to register.',
            'This inverts every performing habit. No musical pulse, no audience feedback — just one path that has to be walked correctly first time, because a single misstep ruins the frame and the shot starts over.',
          ],
        },
      },
      {
        heading: { vi: 'Hình học fractal bằng vòng và staff', en: 'Fractal geometry with hoop and staff' },
        body: {
          vi: [
            'Bộ ảnh khai thác các hình khối lặp lại: một mô-típ nhỏ được xoay và nhân bản quanh một trục, tạo cảm giác chiều sâu vô hạn. HyperLoop LED Hoop dựng phần khung tròn lớn; Vortex Pixel Contact Staff vẽ các lớp chi tiết bên trong.',
            'Mỗi bức ảnh cần trung bình từ 6 đến 15 lần chụp lại. Với những hình phức tạp nhất, con số này lên tới hơn 30. Tổng cộng, dự án cho ra hơn 40 bức ảnh độc bản — mỗi bức là một chuyển động không thể lặp lại chính xác lần thứ hai.',
          ],
          en: [
            'The series works with repeating structure: a small motif rotated and duplicated around an axis until it reads as infinite depth. The HyperLoop LED Hoop lays down the large circular frame; the Vortex Pixel Contact Staff draws the detail layers inside it.',
            'Each finished image took between 6 and 15 attempts on average. For the most complex figures that climbed past 30. In total the project produced 40+ unique frames — each one a movement that cannot be repeated exactly a second time.',
          ],
        },
      },
      {
        heading: { vi: 'Từ ảnh tĩnh sang video 4K', en: 'From stills to 4K video' },
        body: {
          vi: [
            'Phần video ngắn 4K được dựng từ chính các lần chụp: mỗi khung hình phơi sáng trở thành một frame trong chuỗi stop-motion, tạo ra chuyển động giật nhẹ rất đặc trưng, khác hẳn video quay thông thường.',
            'Bộ ảnh sau đó được một tạp chí nghệ thuật thị giác đăng tải. Với NCTA, đây là dự án cho thấy đạo cụ LED không chỉ phục vụ sân khấu — chúng còn là công cụ tạo hình độc lập.',
          ],
          en: [
            'The 4K short was assembled from the shoot itself: each exposure became one frame in a stop-motion sequence, producing the slightly stuttering motion that distinguishes it from ordinary video.',
            'The series was later picked up by a visual-arts magazine. For NCTA it is the project that showed LED props are not only stage equipment — they are an image-making medium in their own right.',
          ],
        },
      },
    ],
    gallery: [
      { src: img('1516450360452-9312f5e86fc7'), caption: { vi: 'Một khung phơi sáng 60 giây trong studio tối', en: 'A 60-second exposure in the blacked-out studio' } },
      { src: img('1517841905240-472988babdf9'), caption: { vi: 'Lớp chi tiết vẽ bằng Contact Staff', en: 'Detail layers drawn with the contact staff' } },
      { src: img('1507003211169-0a1dd7228f2d'), caption: { vi: 'Cấu trúc lặp tạo cảm giác chiều sâu', en: 'Repeating structure creating depth' } },
      { src: img('1534528741775-53994a69daeb'), caption: { vi: 'Hậu trường: setup máy ảnh và chân máy', en: 'Behind the scenes: camera and tripod setup' } },
    ],
    facts: [
      { label: { vi: 'Loại dự án', en: 'Project type' }, value: { vi: 'Nhiếp ảnh phơi sáng dài + video 4K', en: 'Long-exposure photography + 4K video' } },
      { label: { vi: 'Thời gian phơi sáng', en: 'Exposure time' }, value: { vi: '20 – 90 giây mỗi khung', en: '20 – 90 seconds per frame' } },
      { label: { vi: 'Số ảnh hoàn thiện', en: 'Finished frames' }, value: { vi: 'Hơn 40 bức độc bản', en: '40+ unique images' } },
      { label: { vi: 'Số lần chụp lại', en: 'Retakes' }, value: { vi: 'Trung bình 6 – 15 lần mỗi ảnh', en: '6 – 15 per image on average' } },
    ],
    credits: [
      { role: { vi: 'Ý tưởng & trình diễn', en: 'Concept & performance' }, name: 'NCTA' },
      { role: { vi: 'Địa điểm', en: 'Location' }, name: 'Studio Không Gian Tối, Sài Gòn' },
    ],
    quote: {
      text: {
        vi: 'Trong bóng tối tuyệt đối, bạn không nhìn thấy chính mình. Chỉ còn trí nhớ cơ thể và niềm tin rằng đường đi trong đầu mình là đúng.',
        en: 'In total darkness you cannot see yourself. All that is left is muscle memory and trusting that the path in your head is the right one.',
      },
      author: { vi: 'NCTA', en: 'NCTA' },
    },
  },

  // -------------------------------------------------------------------------
  {
    id: 'ravolution-stage-storm',
    publishedAt: '2025-09-30',
    readMinutes: 5,
    lead: {
      vi: 'Tại Ravolution, NCTA không diễn trên sân khấu mà diễn giữa đám đông. 20 phút liên tục, trong khoảng cách chưa tới một mét với khán giả — một định dạng đặt ra những yêu cầu an toàn và kỹ thuật hoàn toàn khác.',
      en: 'At Ravolution, NCTA did not perform on the stage — the set happened inside the crowd. Twenty continuous minutes, less than a metre from the audience. That format brings an entirely different set of safety and technical demands.',
    },
    sections: [
      {
        heading: { vi: 'Diễn trong đám đông', en: 'Performing inside the crowd' },
        body: {
          vi: [
            'Định dạng "roaming" đặt nghệ sĩ ngay trong khu vực khán giả thay vì trên sân khấu. Ưu điểm là sự gần gũi: khán giả nhìn thấy từng chi tiết của đạo cụ, cảm nhận được luồng gió khi quạt LED xoay. Nhược điểm là không gian.',
            'Toàn bộ phần dựng phải giới hạn trong một vòng tròn đường kính khoảng ba mét, với đội an ninh giữ vành đai. Các động tác có quỹ đạo dài — vốn là điểm mạnh của poi — được thay bằng những chuyển động gọn, xoay quanh trục cơ thể.',
          ],
          en: [
            'The roaming format puts the performer in the audience area instead of on stage. The upside is proximity: people see every detail of the props and feel the air move when the LED fans spin. The downside is space.',
            'The whole build had to fit inside a circle roughly three metres across, with the security team holding the perimeter. Long-orbit moves — normally poi’s strength — were replaced by compact figures rotating close to the body.',
          ],
        },
      },
      {
        heading: { vi: 'Đủ sáng cho cả khán phòng', en: 'Bright enough for the whole arena' },
        body: {
          vi: [
            'SECC là không gian trong nhà rất lớn, với hệ thống đèn sân khấu công suất cao và màn LED khổng lồ. Đạo cụ phải cạnh tranh trực tiếp với chúng về độ sáng, nếu không sẽ biến mất hoàn toàn trên khung hình.',
            'Visual Pixel Poi HD-160 được đẩy lên mức sáng tối đa cho suốt set diễn, kèm trang phục LED phản quang giúp nghệ sĩ vẫn nhận diện được khi đạo cụ tắt giữa các đoạn chuyển. Ở cấu hình này, thời lượng pin giảm đáng kể — đó là lý do set được giới hạn ở 20 phút.',
          ],
          en: [
            'SECC is a very large indoor space with a high-output lighting rig and huge LED walls. The props compete directly with those for brightness, or they simply vanish on camera.',
            'The Visual Pixel Poi HD-160 ran at maximum output for the whole set, paired with a reflective LED costume so the performer stayed readable while the props were dark between passages. At that setting battery life drops sharply — which is why the set was capped at 20 minutes.',
          ],
        },
      },
      {
        heading: { vi: 'An toàn ở cự ly gần', en: 'Safety at close range' },
        body: {
          vi: [
            'Diễn giữa đám đông rave nghĩa là khán giả có thể di chuyển bất ngờ. Nhóm quy ước ba tín hiệu tay với đội an ninh để dừng phần diễn ngay lập tức nếu vành đai bị phá vỡ, và toàn bộ đạo cụ dùng dây đeo cổ tay khoá kép.',
            'Đây là quy trình tiêu chuẩn NCTA áp dụng cho mọi show cự ly gần, và trong đêm đó không có sự cố nào xảy ra.',
          ],
          en: [
            'Performing in a rave crowd means people move unpredictably. The team agreed three hand signals with security to stop the act instantly if the perimeter broke, and every prop used double-locked wrist leashes.',
            'This is standard procedure for any close-range NCTA show, and nothing went wrong on the night.',
          ],
        },
      },
    ],
    gallery: [
      { src: img('1509198397868-475647b2a1e5'), caption: { vi: 'Set diễn giữa khu vực khán giả', en: 'The set, inside the audience area' } },
      { src: img('1514525253161-7a46d19cd819'), caption: { vi: 'Quạt LED ở khoảng cách gần', en: 'LED fans at close range' } },
      { src: img('1508700115892-45ecd05ae2ad'), caption: { vi: 'Hiệu ứng ánh sáng 360 độ trong khán phòng', en: 'Immersive 360° light inside the arena' } },
      { src: img('1500648767791-00dcc994a43e'), caption: { vi: 'Trang phục LED phản quang giữa các đoạn chuyển', en: 'The reflective LED costume between passages' } },
    ],
    facts: [
      { label: { vi: 'Định dạng', en: 'Format' }, value: { vi: 'Roaming — diễn trong đám đông', en: 'Roaming — inside the crowd' } },
      { label: { vi: 'Thời lượng', en: 'Run time' }, value: { vi: '20 phút liên tục', en: '20 continuous minutes' } },
      { label: { vi: 'Không gian diễn', en: 'Performance area' }, value: { vi: 'Vòng tròn đường kính ~3 mét', en: 'A circle roughly 3 m across' } },
      { label: { vi: 'An toàn', en: 'Safety' }, value: { vi: 'Dây đeo khoá kép + 3 tín hiệu dừng', en: 'Double-locked leashes + 3 stop signals' } },
    ],
    credits: [
      { role: { vi: 'Biểu diễn', en: 'Performance' }, name: 'NCTA' },
      { role: { vi: 'Sự kiện', en: 'Event' }, name: 'Ravolution Music Festival' },
      { role: { vi: 'Địa điểm', en: 'Venue' }, name: 'SECC, Quận 7, TP.HCM' },
    ],
  },

  // -------------------------------------------------------------------------
  {
    id: 'luxury-wedding-magic-night',
    publishedAt: '2026-02-20',
    readMinutes: 4,
    lead: {
      vi: 'Tiệc cưới là định dạng đòi hỏi sự tiết chế nhiều nhất. Không có drop bass, không có hiệu ứng gây choáng — chỉ có 10 phút ánh sáng phải hoà vào một không gian vốn đã đẹp sẵn, mà không lấn át nó.',
      en: 'A wedding is the format that demands the most restraint. No bass drops, no overwhelming effects — just ten minutes of light that has to sit inside an already beautiful space without taking it over.',
    },
    sections: [
      {
        heading: { vi: 'Tiết chế thay vì phô diễn', en: 'Restraint over spectacle' },
        body: {
          vi: [
            'Bảng màu là quyết định quan trọng nhất. Thay vì dải màu bão hoà thường dùng ở festival, phần dựng này giới hạn trong hai tông: vàng ấm và trắng kim cương — cùng hệ màu với đèn trang trí và hoa của tiệc cưới.',
            'Cường độ sáng cũng được hạ xuống khoảng 40% so với cấu hình sân khấu. Ở mức này, đạo cụ trông giống ánh nến chuyển động hơn là thiết bị điện tử, và không làm chói mắt khách ngồi bàn gần sàn diễn.',
          ],
          en: [
            'The palette was the most important decision. Instead of the saturated range used at festivals, this build stayed within two tones: warm gold and diamond white — the same family as the venue’s decorative lighting and florals.',
            'Output was also dropped to around 40% of the stage configuration. At that level the props read more like moving candlelight than electronics, and never dazzle guests seated close to the floor.',
          ],
        },
      },
      {
        heading: { vi: 'Múa đôi với quạt LED và vòng', en: 'A duet with LED fans and hoop' },
        body: {
          vi: [
            'Phần diễn được dựng như một màn múa đôi: CyberSilk LED Fans tạo những dải sáng mềm trải rộng, còn HyperLoop LED Hoop giữ vai trò điểm nhấn tròn, chậm rãi, ở trung tâm.',
            'Nhạc nền là bản giao hưởng do gia đình lựa chọn, nên toàn bộ nhịp chuyển động được dựng lại theo bản phối cụ thể đó thay vì dùng bản dựng sẵn — mất thêm khoảng một tuần chuẩn bị, nhưng đây là chi tiết khách hàng nhắc đến nhiều nhất sau sự kiện.',
          ],
          en: [
            'The act was built as a duet: CyberSilk LED Fans laying down soft, wide ribbons of light, with the HyperLoop LED Hoop as the slow circular anchor at the centre.',
            'The soundtrack was a symphonic piece chosen by the family, so the whole movement was re-timed to that specific arrangement rather than reusing a stock build — about a week of extra preparation, and the detail the clients mentioned most afterwards.',
          ],
        },
      },
      {
        heading: { vi: 'Điều kiện ngoài trời ven biển', en: 'Coastal outdoor conditions' },
        body: {
          vi: [
            'Địa điểm nằm sát biển, nên độ ẩm và gió là hai yếu tố phải tính đến. Đạo cụ được kiểm tra chống ẩm trước giờ diễn, và phần dựng có sẵn phương án thay thế cho các động tác dễ bị gió ảnh hưởng nhất.',
            'Buổi diễn bắt đầu sau hoàng hôn khoảng 40 phút — thời điểm trời đủ tối để ánh sáng nổi lên, nhưng vẫn còn chút màu ở đường chân trời làm nền.',
          ],
          en: [
            'The venue sits right on the coast, so humidity and wind both had to be accounted for. Props were moisture-checked before the call, and the build carried substitutions for the moves most exposed to wind.',
            'The act started about 40 minutes after sunset — dark enough for the light to lift off the background, with just enough colour still on the horizon to frame it.',
          ],
        },
      },
    ],
    gallery: [
      { src: img('1517457373958-b7bdd4587205'), caption: { vi: 'Không gian tiệc cưới ven biển sau hoàng hôn', en: 'The coastal wedding setting after sunset' } },
      { src: img('1507003211169-0a1dd7228f2d'), caption: { vi: 'Quạt LED trong tông vàng ấm', en: 'LED fans in the warm gold palette' } },
      { src: img('1517841905240-472988babdf9'), caption: { vi: 'Vòng LED làm điểm nhấn trung tâm', en: 'The LED hoop as the centre anchor' } },
      { src: img('1534528741775-53994a69daeb'), caption: { vi: 'Khách mời theo dõi màn múa đôi', en: 'Guests watching the duet' } },
    ],
    facts: [
      { label: { vi: 'Loại sự kiện', en: 'Event type' }, value: { vi: 'Tiệc cưới cao cấp ngoài trời', en: 'Luxury outdoor wedding' } },
      { label: { vi: 'Thời lượng', en: 'Run time' }, value: { vi: '10 phút', en: '10 min' } },
      { label: { vi: 'Bảng màu', en: 'Palette' }, value: { vi: 'Vàng ấm & trắng kim cương', en: 'Warm gold & diamond white' } },
      { label: { vi: 'Cường độ sáng', en: 'Output level' }, value: { vi: '~40% so với cấu hình sân khấu', en: '~40% of the stage configuration' } },
    ],
    credits: [
      { role: { vi: 'Biểu diễn', en: 'Performance' }, name: 'NCTA' },
      { role: { vi: 'Địa điểm', en: 'Venue' }, name: 'InterContinental Danang Sun Peninsula' },
    ],
    quote: {
      text: {
        vi: 'Ở tiệc cưới, thành công là khi không ai nhớ đến thiết bị. Họ chỉ nhớ rằng khoảnh khắc đó đẹp.',
        en: 'At a wedding, success is when nobody remembers the equipment. They only remember that the moment was beautiful.',
      },
      author: { vi: 'NCTA', en: 'NCTA' },
    },
  },
];

// The landing page reads the slug list from the tiny showArticleIds module so
// it never downloads this file's body copy. That means two lists — guard the
// drift here, where adding an article is the natural place to notice.
if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
  const declared = new Set(SHOW_ARTICLE_IDS);
  const missing = RAW_SHOW_ARTICLES.filter((a) => !declared.has(a.id)).map((a) => a.id);
  const extra = SHOW_ARTICLE_IDS.filter((id) => !RAW_SHOW_ARTICLES.some((a) => a.id === id));
  if (missing.length || extra.length) {
    console.error(
      '[showArticles] showArticleIds.ts is out of sync —',
      missing.length ? `missing: ${missing.join(', ')}` : '',
      extra.length ? `unknown: ${extra.join(', ')}` : '',
    );
  }
}

/** Publish dates keyed by id — used for <lastmod> in sitemap.xml. */
export const SHOW_ARTICLE_DATES: Record<string, string> = Object.fromEntries(
  RAW_SHOW_ARTICLES.map((a) => [a.id, a.publishedAt]),
);

export function getShowArticle(id: string, lang: Lang): ShowArticle | null {
  const raw = RAW_SHOW_ARTICLES.find((a) => a.id === id);
  if (!raw) return null;
  return {
    id: raw.id,
    publishedAt: raw.publishedAt,
    readMinutes: raw.readMinutes,
    lead: pick(raw.lead, lang),
    youtubeId: raw.youtubeId,
    sections: raw.sections.map((s) => ({
      heading: pick(s.heading, lang),
      body: pickArr(s.body, lang),
    })),
    gallery: raw.gallery.map((g) => ({ src: g.src, caption: pick(g.caption, lang) })),
    facts: raw.facts.map((f) => ({ label: pick(f.label, lang), value: pick(f.value, lang) })),
    credits: raw.credits.map((c) => ({ role: pick(c.role, lang), name: c.name })),
    quote: raw.quote
      ? { text: pick(raw.quote.text, lang), author: pick(raw.quote.author, lang) }
      : undefined,
  };
}
