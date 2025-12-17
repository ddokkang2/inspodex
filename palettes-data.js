(() => {
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function hslToRgb(h, s, l) {
    const hh = ((h % 360) + 360) % 360;
    const ss = clamp(s, 0, 100) / 100;
    const ll = clamp(l, 0, 100) / 100;
    const c = (1 - Math.abs(2 * ll - 1)) * ss;
    const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
    const m = ll - c / 2;
    let r = 0, g = 0, b = 0;
    if (hh < 60) [r, g, b] = [c, x, 0];
    else if (hh < 120) [r, g, b] = [x, c, 0];
    else if (hh < 180) [r, g, b] = [0, c, x];
    else if (hh < 240) [r, g, b] = [0, x, c];
    else if (hh < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }
  function toHex(n) { return clamp(n, 0, 255).toString(16).padStart(2, '0'); }
  function hslToHex(h, s, l) {
    const [r, g, b] = hslToRgb(h, s, l);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }
  function hash(str) {
    let h = 2166136261;
    const s = String(str || '');
    for (let i = 0; i < s.length; i += 1) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function slug(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .trim();
  }
  function queryFor(parts) {
    return String(parts || '')
      .replace(/[·/]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const THEME_PRESETS = {
    pastel: { hues: [10, 40, 120, 210, 280], s: 55, ls: [94, 88, 84, 90, 96] },
    neon: { hues: [190, 270, 330, 55, 0], s: 92, ls: [18, 58, 58, 55, 48] },
    muted: { hues: [210, 220, 30, 140, 0], s: 22, ls: [18, 34, 72, 78, 92] },
    earth: { hues: [22, 34, 44, 95, 0], s: 42, ls: [18, 34, 56, 70, 92] },
    ocean: { hues: [205, 190, 165, 210, 0], s: 58, ls: [16, 36, 52, 86, 96] },
    forest: { hues: [140, 120, 95, 70, 0], s: 62, ls: [14, 26, 44, 62, 96] },
    sunset: { hues: [260, 330, 25, 38, 52], s: 78, ls: [18, 55, 55, 74, 90] },
    mono: { hues: [220, 220, 220, 220, 220], s: 10, ls: [8, 16, 32, 78, 96] },
    vivid: { hues: [210, 130, 40, 330, 0], s: 88, ls: [18, 52, 55, 55, 92] }
  };

  function makeThemeColors(themeKey, seedStr) {
    const preset = THEME_PRESETS[themeKey] || THEME_PRESETS.muted;
    const h = hash(seedStr);
    const shift = ((h % 21) - 10) * 3; // -30..+30
    return preset.hues.map((hh, idx) => hslToHex(hh + shift, preset.s, preset.ls[idx]));
  }

  const CATEGORIES = [
    { key: 'film', label: 'Film & TV', ko: '영화/시네마', ref: 'cinematic color palette film still', sw: 'swatches hex codes' },
    { key: 'era', label: 'Decade / Era', ko: '연도/시대', ref: 'retro vintage color palette', sw: 'swatches hex codes' },
    { key: 'mood', label: 'Mood / Emotion', ko: '무드/감정', ref: 'mood color palette aesthetic', sw: 'swatches hex codes' },
    { key: 'brand', label: 'Brand Archetype', ko: '브랜드 성격', ref: 'brand identity color palette', sw: 'swatches hex codes' },
    { key: 'material', label: 'Material / Texture', ko: '재질/소재', ref: 'material texture color palette', sw: 'swatches hex codes' },
    { key: 'lighting', label: 'Lighting / Photo', ko: '라이팅/촬영', ref: 'photography lighting color palette', sw: 'swatches hex codes' },
    { key: 'season', label: 'Season / Weather', ko: '계절/날씨', ref: 'seasonal color palette', sw: 'swatches hex codes' },
    { key: 'place', label: 'Culture / Place', ko: '도시/문화', ref: 'city culture color palette', sw: 'swatches hex codes' },
    { key: 'use', label: 'Use Case', ko: '용도', ref: 'ui brand poster color palette', sw: 'swatches hex codes' },
    { key: 'theory', label: 'Color Theory', ko: '조합 규칙', ref: 'color scheme palette', sw: 'swatches hex codes' }
  ];

  const ITEMS = {
    film: [
      ['Matrix Green', '매트릭스 그린', 'neon', ['cinematic', 'green', 'noir']],
      ['Gotham Noir', '고담 느와르', 'mono', ['cinematic', 'dark', 'contrast']],
      ['Wes Anderson Pastel', '웨스 앤더슨 파스텔', 'pastel', ['pastel', 'warm', 'editorial']],
      ['Blade Runner Neon', '블레이드러너 네온', 'neon', ['neon', 'night', 'cyber']],
      ['Ghibli Nature', '지브리 네이처', 'forest', ['nature', 'soft', 'warm']],
      ['Grand Budapest Pink', '그랜드 부다페스트 핑크', 'pastel', ['pink', 'retro', 'soft']],
      ['Dune Desert', '듄 데저트', 'earth', ['desert', 'warm', 'cinematic']],
      ['Mad Max Rust', '매드맥스 러스트', 'earth', ['rust', 'dust', 'bold']],
      ['Harry Potter Moody', '해리포터 무디', 'muted', ['moody', 'dark', 'mystic']],
      ['La La Land Pop', '라라랜드 팝', 'vivid', ['vivid', 'warm', 'pop']],
      ['Parasite Contrast', '기생충 콘트라스트', 'muted', ['contrast', 'modern', 'cinematic']],
      ['Spirited Away Mist', '센과 치히로 미스트', 'ocean', ['mist', 'soft', 'dreamy']],
      ['Drive Neon Pink', '드라이브 네온 핑크', 'neon', ['neon', 'pink', 'night']],
      ['Joker Acid', '조커 애시드', 'vivid', ['acid', 'green', 'purple']],
      ['Interstellar Cold', '인터스텔라 콜드', 'ocean', ['cold', 'space', 'clean']],
      ['Moonlight Blue', '문라이트 블루', 'ocean', ['blue', 'night', 'moody']],
      ['Amélie Warm Green', '아멜리에 웜 그린', 'forest', ['warm', 'green', 'whimsical']],
      ['Oppenheimer Analog', '오펜하이머 아날로그', 'muted', ['analog', 'vintage', 'film']],
      ['Barbie Pink Pop', '바비 핑크 팝', 'vivid', ['pink', 'pop', 'bright']],
      ['Black Swan Mono', '블랙스완 모노', 'mono', ['mono', 'dramatic', 'high-contrast']]
    ],
    era: [
      ['1920s Art Deco', '1920s 아르데코', 'muted', ['art-deco', 'luxury', 'gold']],
      ['1930s Hollywood', '1930s 할리우드', 'muted', ['classic', 'warm', 'film']],
      ['1940s Wartime', '1940s 워타임', 'muted', ['vintage', 'muted', 'utilitarian']],
      ['1950s Mid-century', '1950s 미드센추리', 'sunset', ['midcentury', 'warm', 'retro']],
      ['1960s Pop Art', '1960s 팝아트', 'vivid', ['pop', 'primary', 'bold']],
      ['1960s Mod', '1960s 모드', 'vivid', ['mod', 'contrast', 'graphic']],
      ['1970s Earthy', '1970s 어시', 'earth', ['earthy', 'warm', 'vintage']],
      ['1970s Disco', '1970s 디스코', 'sunset', ['disco', 'glow', 'warm']],
      ['1980s Neon', '1980s 네온', 'neon', ['neon', '80s', 'night']],
      ['1980s Memphis', '1980s 멤피스', 'vivid', ['memphis', 'playful', 'bold']],
      ['1990s Primary', '1990s 프라이머리', 'vivid', ['90s', 'primary', 'clean']],
      ['1990s Grunge', '1990s 그런지', 'muted', ['grunge', 'muted', 'texture']],
      ['2000s Y2K', '2000s Y2K', 'neon', ['y2k', 'chrome', 'glossy']],
      ['2000s Web 2.0', '2000s 웹2.0', 'ocean', ['web', 'clean', 'blue']],
      ['2010s Flat UI', '2010s 플랫 UI', 'ocean', ['flat', 'ui', 'clean']],
      ['2010s Minimal', '2010s 미니멀', 'mono', ['minimal', 'neutral', 'clean']],
      ['2020s Soft UI', '2020s 소프트 UI', 'muted', ['soft', 'ui', 'modern']],
      ['2020s Dark Mode', '2020s 다크모드', 'mono', ['dark', 'ui', 'contrast']],
      ['Retro-future', '레트로퓨처', 'neon', ['retro', 'future', 'cyber']],
      ['Timeless Neutral', '타임리스 뉴트럴', 'muted', ['neutral', 'calm', 'timeless']]
    ],
    mood: [
      ['Luxury Black Gold', '럭셔리 블랙골드', 'mono', ['luxury', 'gold', 'premium']],
      ['Dreamy Lavender', '드리미 라벤더', 'pastel', ['dreamy', 'lavender', 'soft']],
      ['Nature Calm', '네이처 캄', 'forest', ['nature', 'calm', 'organic']],
      ['Floral Soft', '플로랄 소프트', 'pastel', ['floral', 'soft', 'romantic']],
      ['Holiday Cozy', '홀리데이 코지', 'sunset', ['holiday', 'cozy', 'warm']],
      ['Energetic Sporty', '에너제틱 스포티', 'vivid', ['energetic', 'sport', 'bold']],
      ['Cute Candy', '큐트 캔디', 'pastel', ['cute', 'candy', 'light']],
      ['Minimal Clean', '미니멀 클린', 'mono', ['minimal', 'clean', 'neutral']],
      ['Dark Moody', '다크 무디', 'muted', ['dark', 'moody', 'cinematic']],
      ['Fresh Aqua', '프레시 아쿠아', 'ocean', ['fresh', 'aqua', 'clean']],
      ['Romantic Rose', '로맨틱 로즈', 'pastel', ['romantic', 'rose', 'soft']],
      ['Futuristic', '퓨처리스틱', 'neon', ['futuristic', 'neon', 'cyber']],
      ['Cozy Coffee', '코지 커피', 'earth', ['coffee', 'cozy', 'warm']],
      ['Elegant Navy', '엘레강트 네이비', 'ocean', ['elegant', 'navy', 'classic']],
      ['Playful Primary', '플레이풀 프라이머리', 'vivid', ['playful', 'primary', 'bright']],
      ['Serious Corporate', '코퍼레이트', 'muted', ['corporate', 'blue', 'neutral']],
      ['Organic Earth', '오가닉 어스', 'earth', ['earthy', 'organic', 'natural']],
      ['Icy Minimal', '아이스 미니멀', 'ocean', ['icy', 'minimal', 'cool']],
      ['Sweet Dessert', '스위트 디저트', 'pastel', ['sweet', 'soft', 'cute']],
      ['Bold Contrast', '볼드 콘트라스트', 'vivid', ['bold', 'contrast', 'graphic']]
    ],
    brand: [
      ['Tech SaaS', '테크 SaaS', 'ocean', ['tech', 'saas', 'clean']],
      ['Fintech Trust', '핀테크 트러스트', 'ocean', ['fintech', 'trust', 'blue']],
      ['Luxury Fashion', '럭셔리 패션', 'mono', ['luxury', 'fashion', 'neutral']],
      ['Beauty Cosmetic', '뷰티 코스메틱', 'pastel', ['beauty', 'soft', 'pink']],
      ['Wellness', '웰니스', 'forest', ['wellness', 'sage', 'calm']],
      ['Outdoor', '아웃도어', 'earth', ['outdoor', 'earthy', 'natural']],
      ['Kids Brand', '키즈 브랜드', 'vivid', ['kids', 'playful', 'bright']],
      ['Food Brand', '푸드 브랜드', 'sunset', ['food', 'warm', 'appetite']],
      ['Coffee Brand', '커피 브랜드', 'earth', ['coffee', 'brown', 'cozy']],
      ['Sports Brand', '스포츠 브랜드', 'vivid', ['sport', 'energetic', 'bold']],
      ['Music Festival', '뮤직 페스티벌', 'neon', ['festival', 'neon', 'night']],
      ['Premium Hotel', '프리미엄 호텔', 'mono', ['hotel', 'premium', 'classic']],
      ['Education', '교육', 'ocean', ['education', 'friendly', 'clean']],
      ['Healthcare', '헬스케어', 'ocean', ['healthcare', 'clean', 'teal']],
      ['NGO / Social', 'NGO / 소셜', 'muted', ['ngo', 'trust', 'neutral']],
      ['Eco Brand', '에코 브랜드', 'forest', ['eco', 'green', 'earthy']],
      ['Gaming', '게이밍', 'neon', ['gaming', 'neon', 'dark']],
      ['Editorial Media', '에디토리얼 미디어', 'mono', ['editorial', 'mono', 'accent']],
      ['Creative Studio', '크리에이티브 스튜디오', 'vivid', ['creative', 'bold', 'colorful']],
      ['Minimal Boutique', '미니멀 부티크', 'muted', ['boutique', 'minimal', 'neutral']]
    ],
    material: [
      ['Chrome', '크롬', 'neon', ['chrome', 'metal', 'cool']],
      ['Gold Foil', '골드 포일', 'sunset', ['gold', 'luxury', 'warm']],
      ['Silver Steel', '실버 스틸', 'mono', ['silver', 'steel', 'cool']],
      ['Glass', '글라스', 'ocean', ['glass', 'clean', 'cool']],
      ['Neon Glow', '네온 글로우', 'neon', ['glow', 'neon', 'night']],
      ['Paper Cream', '페이퍼 크림', 'muted', ['paper', 'cream', 'ink']],
      ['Ink Wash', '잉크 워시', 'mono', ['ink', 'wash', 'mono']],
      ['Clay Pastel', '클레이 파스텔', 'pastel', ['clay', 'soft', 'pastel']],
      ['Plastic Pop', '플라스틱 팝', 'vivid', ['plastic', 'pop', 'bright']],
      ['Rubber Matte', '러버 매트', 'muted', ['matte', 'dark', 'industrial']],
      ['Concrete', '콘크리트', 'mono', ['concrete', 'gray', 'brutal']],
      ['Marble', '마블', 'muted', ['marble', 'white', 'luxury']],
      ['Wood Warm', '우드 웜', 'earth', ['wood', 'warm', 'natural']],
      ['Leather', '레더', 'earth', ['leather', 'brown', 'premium']],
      ['Denim', '데님', 'ocean', ['denim', 'blue', 'casual']],
      ['Velvet', '벨벳', 'sunset', ['velvet', 'burgundy', 'rich']],
      ['Holographic', '홀로그래픽', 'neon', ['holo', 'iridescent', 'future']],
      ['Glitter', '글리터', 'vivid', ['glitter', 'sparkle', 'fun']],
      ['Pastel Grain', '파스텔 그레인', 'pastel', ['grain', 'soft', 'texture']],
      ['Film Grain', '필름 그레인', 'muted', ['film', 'grain', 'cinematic']]
    ],
    lighting: [
      ['Golden Hour', '골든 아워', 'sunset', ['golden-hour', 'warm', 'glow']],
      ['Blue Hour', '블루 아워', 'ocean', ['blue-hour', 'cool', 'calm']],
      ['Overcast Soft', '오버캐스트 소프트', 'muted', ['overcast', 'soft', 'neutral']],
      ['Low-key', '로우키', 'mono', ['low-key', 'dark', 'contrast']],
      ['High-key', '하이키', 'pastel', ['high-key', 'light', 'clean']],
      ['Tungsten', '텅스텐', 'sunset', ['tungsten', 'warm', 'indoor']],
      ['Daylight Clean', '데이라이트', 'ocean', ['daylight', 'clean', 'fresh']],
      ['Neon Street', '네온 스트리트', 'neon', ['neon', 'street', 'night']],
      ['Rim Light', '림 라이트', 'ocean', ['rim-light', 'cinematic', 'contrast']],
      ['Rembrandt', '렘브란트', 'earth', ['rembrandt', 'warm', 'shadow']],
      ['Split Light', '스플릿 라이트', 'mono', ['split', 'dramatic', 'dark']],
      ['Backlit Haze', '백라이트 헤이즈', 'ocean', ['backlit', 'haze', 'soft']],
      ['Hard Sun', '하드 선', 'vivid', ['hard-light', 'contrast', 'bright']],
      ['Softbox Studio', '소프트박스', 'muted', ['studio', 'product', 'clean']],
      ['Candlelight', '캔들라이트', 'earth', ['candle', 'warm', 'moody']],
      ['Fluorescent', '형광등', 'muted', ['fluorescent', 'green', 'tint']],
      ['Fog / Mist', '포그/미스트', 'muted', ['fog', 'mist', 'muted']],
      ['Snow Bright', '스노우 브라이트', 'ocean', ['snow', 'bright', 'cool']],
      ['Desert Noon', '데저트 눈', 'earth', ['desert', 'noon', 'warm']],
      ['Underwater', '언더워터', 'ocean', ['underwater', 'teal', 'blue']]
    ],
    season: [
      ['Spring Pastel', '봄 파스텔', 'pastel', ['spring', 'pastel', 'light']],
      ['Spring Floral', '봄 플로랄', 'pastel', ['spring', 'floral', 'soft']],
      ['Summer Beach', '여름 비치', 'ocean', ['summer', 'beach', 'fresh']],
      ['Summer Tropical', '여름 트로피컬', 'vivid', ['tropical', 'summer', 'bright']],
      ['Summer Citrus', '여름 시트러스', 'vivid', ['citrus', 'vivid', 'energetic']],
      ['Autumn Rust', '가을 러스트', 'earth', ['autumn', 'rust', 'earthy']],
      ['Autumn Harvest', '가을 하비스트', 'sunset', ['harvest', 'warm', 'cozy']],
      ['Autumn Forest', '가을 포레스트', 'forest', ['autumn', 'forest', 'green']],
      ['Winter Ice', '겨울 아이스', 'ocean', ['winter', 'ice', 'cool']],
      ['Winter Cozy', '겨울 코지', 'earth', ['winter', 'cozy', 'warm']],
      ['Rainy Day', '레인 데이', 'muted', ['rainy', 'bluegray', 'muted']],
      ['Stormy', '스톰', 'mono', ['storm', 'dark', 'gray']],
      ['Foggy Morning', '포기 모닝', 'muted', ['fog', 'morning', 'soft']],
      ['Sunny Picnic', '써니 피크닉', 'sunset', ['sunny', 'cheerful', 'warm']],
      ['Night Sky', '나이트 스카이', 'mono', ['night', 'navy', 'dark']],
      ['Cherry Blossom', '벚꽃', 'pastel', ['cherry', 'pink', 'spring']],
      ['Halloween', '할로윈', 'sunset', ['halloween', 'orange', 'black']],
      ['Christmas', '크리스마스', 'forest', ['christmas', 'red', 'green']],
      ['Valentine', '발렌타인', 'pastel', ['valentine', 'pink', 'red']],
      ['Fireworks', '불꽃놀이', 'neon', ['fireworks', 'night', 'neon']]
    ],
    place: [
      ['Nordic', '노르딕', 'muted', ['nordic', 'cool', 'muted']],
      ['Mediterranean', '지중해', 'ocean', ['mediterranean', 'blue', 'terracotta']],
      ['Tokyo Night', '도쿄 나이트', 'neon', ['tokyo', 'neon', 'night']],
      ['Seoul Minimal', '서울 미니멀', 'mono', ['seoul', 'minimal', 'neutral']],
      ['Paris Chic', '파리 시크', 'muted', ['paris', 'chic', 'neutral']],
      ['New York Noir', '뉴욕 느와르', 'mono', ['newyork', 'noir', 'dark']],
      ['LA Sunset', 'LA 선셋', 'sunset', ['losangeles', 'sunset', 'warm']],
      ['London Fog', '런던 포그', 'muted', ['london', 'fog', 'gray']],
      ['Venice Pastel', '베니스 파스텔', 'pastel', ['venice', 'pastel', 'soft']],
      ['Santorini', '산토리니', 'ocean', ['santorini', 'blue', 'white']],
      ['Morocco Desert', '모로코 데저트', 'earth', ['morocco', 'desert', 'warm']],
      ['Spice Market', '스파이스 마켓', 'earth', ['spice', 'warm', 'rich']],
      ['Bali Tropical', '발리 트로피컬', 'vivid', ['bali', 'tropical', 'green']],
      ['Iceland Ice', '아이슬란드 아이스', 'ocean', ['iceland', 'ice', 'cool']],
      ['Alps Winter', '알프스 윈터', 'ocean', ['alps', 'winter', 'cool']],
      ['Kyoto Traditional', '교토 트래디셔널', 'muted', ['kyoto', 'traditional', 'muted']],
      ['Havana Retro', '하바나 레트로', 'sunset', ['havana', 'retro', 'warm']],
      ['Mumbai Festival', '뭄바이 페스티벌', 'vivid', ['festival', 'vivid', 'colorful']],
      ['Berlin Industrial', '베를린 인더스트리얼', 'mono', ['berlin', 'industrial', 'gray']],
      ['Shanghai Neon', '상하이 네온', 'neon', ['shanghai', 'neon', 'cyber']]
    ],
    use: [
      ['UI Light Theme', 'UI 라이트', 'muted', ['ui', 'light', 'system']],
      ['UI Dark Theme', 'UI 다크', 'mono', ['ui', 'dark', 'system']],
      ['Dashboard Data', '대시보드 데이터', 'ocean', ['dashboard', 'data', 'charts']],
      ['Accessibility', '접근성', 'ocean', ['accessibility', 'contrast', 'wcag']],
      ['Brand Identity', '브랜드 아이덴티티', 'muted', ['brand', 'identity', 'guidelines']],
      ['Logo Minimal', '로고 미니멀', 'mono', ['logo', 'minimal', 'neutral']],
      ['Packaging', '패키징', 'sunset', ['packaging', 'label', 'product']],
      ['Poster KV', '포스터 KV', 'vivid', ['poster', 'graphic', 'bold']],
      ['Social Templates', 'SNS 템플릿', 'vivid', ['social', 'template', 'bright']],
      ['Slides', '프레젠테이션', 'muted', ['slides', 'presentation', 'clean']],
      ['Editorial Layout', '에디토리얼', 'mono', ['editorial', 'layout', 'print']],
      ['E-commerce', '이커머스', 'ocean', ['ecommerce', 'ui', 'product']],
      ['Onboarding', '온보딩', 'pastel', ['onboarding', 'friendly', 'soft']],
      ['Game UI', '게임 UI', 'neon', ['game', 'ui', 'neon']],
      ['Illustration Set', '일러스트 세트', 'pastel', ['illustration', 'set', 'soft']],
      ['Character Design', '캐릭터 디자인', 'vivid', ['character', 'design', 'color']],
      ['Photo Grading', '컬러 그레이딩', 'muted', ['grading', 'film', 'cinematic']],
      ['Interior Moodboard', '인테리어 무드보드', 'earth', ['interior', 'materials', 'moodboard']],
      ['Event Branding', '이벤트 브랜딩', 'vivid', ['event', 'branding', 'bold']],
      ['Wedding', '웨딩', 'pastel', ['wedding', 'soft', 'elegant']]
    ],
    theory: [
      ['Monochrome', '모노', 'mono', ['monochrome', 'minimal', 'contrast']],
      ['Analogous Warm', '유사색(웜)', 'sunset', ['analogous', 'warm', 'harmony']],
      ['Analogous Cool', '유사색(쿨)', 'ocean', ['analogous', 'cool', 'harmony']],
      ['Complementary', '보색', 'vivid', ['complementary', 'contrast', 'bold']],
      ['Split Complementary', '분할보색', 'vivid', ['split', 'complementary', 'contrast']],
      ['Triadic', '삼색 조합', 'vivid', ['triadic', 'balanced', 'bold']],
      ['Tetradic', '사색 조합', 'vivid', ['tetradic', 'complex', 'rich']],
      ['Warm Neutral', '웜 뉴트럴', 'earth', ['neutral', 'warm', 'calm']],
      ['Cool Neutral', '쿨 뉴트럴', 'muted', ['neutral', 'cool', 'calm']],
      ['Pastel Set', '파스텔 세트', 'pastel', ['pastel', 'soft', 'light']],
      ['Muted Set', '뮤트 세트', 'muted', ['muted', 'modern', 'soft']],
      ['Vivid Set', '비비드 세트', 'vivid', ['vivid', 'bright', 'bold']],
      ['Neon Set', '네온 세트', 'neon', ['neon', 'glow', 'night']],
      ['Earthy Set', '어시 세트', 'earth', ['earthy', 'natural', 'warm']],
      ['High Contrast', '하이 콘트라스트', 'mono', ['contrast', 'high', 'readable']],
      ['Low Contrast', '로우 콘트라스트', 'muted', ['contrast', 'low', 'soft']],
      ['Gradient Ramp', '그라데이션 램프', 'sunset', ['gradient', 'ramp', 'smooth']],
      ['Duotone', '듀오톤', 'ocean', ['duotone', 'graphic', 'bold']],
      ['Accent + Neutral', '포인트+뉴트럴', 'muted', ['accent', 'neutral', 'ui']],
      ['Limited 3-color', '3색 제한', 'muted', ['limited', 'three', 'simple']]
    ]
  };

  const out = [];
  const used = new Set();

  CATEGORIES.forEach((cat) => {
    const list = ITEMS[cat.key] || [];
    list.forEach((row) => {
      const [en, ko, theme, tags] = row;
      const presetKey = slug(en);
      const id = `${cat.key}-${presetKey}`;
      if (used.has(id)) return;
      used.add(id);

      const colors = makeThemeColors(theme, id);
      const base = queryFor(`${en} ${cat.ref} ${cat.sw}`);
      const q = base;

      out.push({
        id,
        ko,
        en,
        colors,
        tags: Array.isArray(tags) ? tags.slice(0, 3) : [],
        q,
        paletteCategoryKey: cat.key,
        palettePresetKey: presetKey,
        palettePresetLabel: `${ko} (${en})`
      });
    });
  });

  // Ensure exactly 200 (10 categories * 20 presets)
  window.PALETTES_DATA = out;
})();

