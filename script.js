(() => {
  let STYLES = [];

  const KEY_FIGURES = {
    renaissance: ['Leonardo da Vinci', 'Michelangelo', 'Raphael'],
    baroque: ['Gian Lorenzo Bernini', 'Caravaggio'],
    rococo: ['François Boucher', 'Jean-Honoré Fragonard'],
    'arts-and-crafts': ['William Morris'],
    'art-nouveau': ['Alphonse Mucha', 'Hector Guimard'],
    'art-deco': ['A. M. Cassandre', 'Tamara de Lempicka'],
    constructivism: ['El Lissitzky', 'Alexander Rodchenko'],
    bauhaus: ['Walter Gropius', 'Herbert Bayer', 'Paul Klee', 'Wassily Kandinsky'],
    'de-stijl': ['Piet Mondrian', 'Theo van Doesburg'],
    dada: ['Hannah Höch', 'Tristan Tzara'],
    surrealism: ['Salvador Dalí', 'René Magritte'],
    'pop-art': ['Andy Warhol', 'Roy Lichtenstein'],
    psychedelic: ['Wes Wilson'],
    swiss: ['Josef Müller-Brockmann', 'Armin Hofmann', 'Max Bill'],
    grunge: ['David Carson'],
    memphis: ['Ettore Sottsass'],
    'international-typographic-style': ['Emil Ruder', 'Josef Müller-Brockmann', 'Armin Hofmann'],
    'mid-century-modern': ['Charles and Ray Eames', 'Saul Bass', 'Paul Rand'],
    'new-bauhaus': ['László Moholy-Nagy', 'György Kepes', 'Nathan Lerner'],
    'dopamine-decor': ['India Mahdavi', 'Kelly Wearstler', 'Jonathan Adler'],
    'kinetic-typography': ['Kyle Cooper', 'Pablo Ferro', 'Saul Bass'],
    'variable-font-typography': ['Erik van Blokland', 'Just van Rossum', 'John Hudson'],
    origami: ['Akira Yoshizawa'],
    ukiyoe: ['Hokusai', 'Hiroshige', 'Utamaro'],
    'sumi-e': ['Sesshū Tōyō', 'Hasegawa Tōhaku'],
    'mughal-miniature': ['Basawan', 'Bichitr', 'Ustad Mansur'],
    'persian-illumination': ['Kamal ud-Din Behzad', 'Reza Abbasi', 'Sultan Muhammad'],
    'gothic-illumination': ['Limbourg brothers', 'Jean Fouquet'],
    'streamline-moderne': ['Raymond Loewy', 'Norman Bel Geddes'],
    googie: ['John Lautner', 'Wayne McAllister'],
    'space-age': ['Eero Saarinen', 'Verner Panton', 'Pierre Paulin'],
    'psychedelic-poster': ['Wes Wilson', 'Victor Moscoso', 'Stanley Mouse'],
    'skate-graphics': ['Jim Phillips', 'Ed Templeton', 'Mark Gonzales'],
    'streetwear-graphics': ['Virgil Abloh', 'Nigo', 'Hiroshi Fujiwara'],
    'design-tokens': ['Brad Frost', 'Nathan Curtis', 'Jina Anne'],
    'accessible-design': ['Kat Holmes', 'Sara Soueidan', 'Steve Krug'],
    'inclusive-design': ['Kat Holmes', 'Microsoft Inclusive Design']
  };

  const FIGURE_LINKS = {
    'Leonardo da Vinci': 'https://en.wikipedia.org/wiki/Leonardo_da_Vinci',
    Michelangelo: 'https://en.wikipedia.org/wiki/Michelangelo',
    Raphael: 'https://en.wikipedia.org/wiki/Raphael',
    'Gian Lorenzo Bernini': 'https://en.wikipedia.org/wiki/Gian_Lorenzo_Bernini',
    Caravaggio: 'https://en.wikipedia.org/wiki/Caravaggio',
    'William Morris': 'https://en.wikipedia.org/wiki/William_Morris',
    'Alphonse Mucha': 'https://en.wikipedia.org/wiki/Alphonse_Mucha',
    'Hector Guimard': 'https://en.wikipedia.org/wiki/Hector_Guimard',
    'Walter Gropius': 'https://en.wikipedia.org/wiki/Walter_Gropius',
    'Herbert Bayer': 'https://en.wikipedia.org/wiki/Herbert_Bayer',
    'Wassily Kandinsky': 'https://en.wikipedia.org/wiki/Wassily_Kandinsky',
    'Piet Mondrian': 'https://en.wikipedia.org/wiki/Piet_Mondrian',
    'Theo van Doesburg': 'https://en.wikipedia.org/wiki/Theo_van_Doesburg',
    'El Lissitzky': 'https://en.wikipedia.org/wiki/El_Lissitzky',
    'Alexander Rodchenko': 'https://en.wikipedia.org/wiki/Alexander_Rodchenko',
    'Andy Warhol': 'https://en.wikipedia.org/wiki/Andy_Warhol',
    'Roy Lichtenstein': 'https://en.wikipedia.org/wiki/Roy_Lichtenstein',
    'David Carson': 'https://en.wikipedia.org/wiki/David_Carson_(graphic_designer)',
    'Ettore Sottsass': 'https://en.wikipedia.org/wiki/Ettore_Sottsass',
    'Josef Muller-Brockmann': 'https://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann',
    'Armin Hofmann': 'https://en.wikipedia.org/wiki/Armin_Hofmann',
    'Max Bill': 'https://en.wikipedia.org/wiki/Max_Bill'
  };

  function figureUrl(name) {
    return FIGURE_LINKS[name] || `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(name)}`;
  }

  const NOTE_OVERRIDES = {
    memphis: '80s 멤피스 그룹의 패턴/컬러/기하학을 차용한 유쾌한 스타일.',
    swiss: '그리드·정렬·정보 계층 중심의 타이포그래피 스타일.',
    bauhaus: '기하학·원색·단순한 형태로 강한 조형감을 만드는 모더니즘 계열.',
    'art-nouveau': '유기적 곡선·식물 모티프·장식 타이포 중심.',
    'art-deco': '대칭·기하학·럭셔리한 소재감/패턴 중심.'
  };

  const QUERY_OVERRIDES = {
    memphis: 'memphis group design pattern',
    swiss: 'swiss grid typography poster',
    bauhaus: 'bauhaus design poster geometric',
    'art-nouveau': 'art nouveau poster typography',
    'art-deco': 'art deco graphic design poster',
    y2k: 'y2k design chrome glossy',
    cyberpunk: 'cyberpunk ui hud',
    vaporwave: 'vaporwave design neon',
    brutalism: 'brutalist web design typography'
  };

  const dom = {
    grid: document.getElementById('styleGrid'),
    search: document.getElementById('styleSearch'),
    clearSearch: document.getElementById('clearSearch'),
    sortKo: document.getElementById('sortKo'),
    sortEn: document.getElementById('sortEn'),
    count: document.getElementById('resultCount'),
    activeTag: document.getElementById('activeTag'),
    activeChips: document.getElementById('activeChips'),
    poseTypeJump: document.getElementById('poseTypeJump'),
    poseVariantJump: document.getElementById('poseVariantJump'),
    paletteCategoryJump: document.getElementById('paletteCategoryJump'),
    palettePresetJump: document.getElementById('palettePresetJump'),
    enJump: document.getElementById('enJump'),
    themeSelect: document.getElementById('themeSelect'),
    dirDesign: document.getElementById('dirDesign'),
    dirCharacter: document.getElementById('dirCharacter'),
    dirPhoto: document.getElementById('dirPhoto'),
    dirPalette: document.getElementById('dirPalette'),
    dirPose: document.getElementById('dirPose'),
    directoryTitle: document.getElementById('directoryTitle'),
    directorySubtitle: document.getElementById('directorySubtitle'),
    siteSwitchbar: document.getElementById('siteSwitchbar'),
    poseLinks: document.getElementById('poseLinks'),
    paletteLinks: document.getElementById('paletteLinks'),
    characterLinks: document.getElementById('characterLinks'),
    manualSearch: document.getElementById('manualSearch'),
    manualSearchBtn: document.getElementById('manualSearchBtn'),
    manualHint: document.getElementById('manualHint'),
    manualSelected: document.getElementById('manualSelected'),
    random200Btn: document.getElementById('random200Btn'),
    randomClearBtn: document.getElementById('randomClearBtn'),
    intentChips: document.getElementById('intentChips'),
    intentResetBtn: document.getElementById('intentResetBtn'),
    promptPresetBlock: document.getElementById('promptPresetBlock'),
    promptPresetChips: document.getElementById('promptPresetChips'),
    toast: document.getElementById('toast'),
    popup: document.getElementById('popup'),
    popupTitle: document.getElementById('popupTitle'),
    popupDesc: document.getElementById('popupDesc'),
    popupClose: document.getElementById('popupClose')
  };

  const controlsPanel = document.querySelector('.panel.controls');
  const panelHandle = document.getElementById('panelHandle');
  let panelPinned = false;
  let siteTouched = false;

  function setManualHint(message, { tone = 'info' } = {}) {
    if (!dom.manualHint) return;
    dom.manualHint.textContent = String(message || '');
    dom.manualHint.dataset.tone = tone;
  }

  function refreshManualHint() {
    const hasCard = Boolean(selectedStyleId && selectedCardQuery);
    const hasText = Boolean(String(dom.manualSearch?.value || '').trim());
    if (hasCard || hasText) {
      setManualHint('카드 클릭 → 자동 입력 · 직접 수정 가능', { tone: 'info' });
      if (dom.manualSearchBtn) dom.manualSearchBtn.disabled = false;
      return;
    }
    setManualHint('카드를 꼭 클릭하거나, 키워드를 직접 입력한 뒤 검색하세요.', { tone: 'warn' });
    if (dom.manualSearchBtn) dom.manualSearchBtn.disabled = true;
  }

  function clearGuideFocus() {
    document.querySelectorAll('.guide-focus').forEach((el) => el.classList.remove('guide-focus'));
  }

  function setGuideStep(step) {
    const s = Number(step) || 1;
    const flow = document.getElementById('flowSteps');
    if (flow) {
      flow.querySelectorAll('.flow-step[data-step]').forEach((el) => {
        el.classList.toggle('active', Number(el.dataset.step) === s);
      });
    }
    clearGuideFocus();
    const focus = (sel) => {
      const el = document.querySelector(sel);
      if (el) el.classList.add('guide-focus');
    };
    if (s === 1) focus('[data-guide="site"]');
    if (s === 2) {
      focus('[data-guide="input"]');
      focus('#styleGrid');
    }
    if (s === 3) {
      focus('[data-guide="go"]');
      if (!selectedIntentKey) focus('[data-guide="expand"]');
    }
  }

  function updateGuideStep() {
    const hasText = Boolean(String(dom.manualSearch?.value || '').trim());
    if (hasText) return setGuideStep(3);
    if (!siteTouched) return setGuideStep(1);
    return setGuideStep(2);
  }

  function clearStyleGuideSoft() {
    document.querySelectorAll('.guide-soft').forEach((el) => el.classList.remove('guide-soft'));
  }

  function setStyleGuideStep(step) {
    const s = Number(step) || 1;
    const flow = document.getElementById('styleFlowSteps');
    if (flow) {
      flow.querySelectorAll('.flow-step[data-step]').forEach((el) => {
        el.classList.toggle('active', Number(el.dataset.step) === s);
      });
    }
    clearStyleGuideSoft();
    const focusAll = (sel) => {
      document.querySelectorAll(sel).forEach((el) => el.classList.add('guide-soft'));
    };
    if (s === 1) focusAll('[data-style-guide="dir"]');
    if (s === 2) focusAll('[data-style-guide="filter"]');
    if (s === 3) focusAll('#styleGrid');
  }

  function updateStyleGuideStep() {
    const hasQuery = Boolean(String(query || '').trim());
    const shuffled = Boolean(shuffleState && shuffleState.directory === directoryMode);
    const hasFilters = (directoryMode === 'pose')
      ? Boolean(hasQuery || activeTag || activePoseType || activePoseVariant || shuffled)
      : (directoryMode === 'palette')
        ? Boolean(hasQuery || activeTag || activePaletteCategory || activePalettePreset || shuffled)
        : Boolean(hasQuery || activeTag || activeEnInitial || activeDigitInitial || shuffled);

    if (selectedStyleId) return setStyleGuideStep(3);
    if (hasFilters) return setStyleGuideStep(2);
    return setStyleGuideStep(1);
  }

  function setPanelOpen(open, { pin = false } = {}) {
    const next = Boolean(open);
    if (!next) panelPinned = false;
    if (pin) panelPinned = true;
    document.body.classList.toggle('panel-open', next);
    if (panelHandle) {
      panelHandle.setAttribute('aria-expanded', next ? 'true' : 'false');
      panelHandle.setAttribute('aria-label', next ? '검색 패널 닫기' : '검색 패널 열기');
      panelHandle.textContent = next ? '검색 패널 닫기' : '검색 패널';
    }
  }

  function openPanel({ pin = false } = {}) {
    setPanelOpen(true, { pin });
  }

  function closePanel() {
    setPanelOpen(false);
  }

  let sortMode = 'ko';
  let query = '';
  let activeTag = '';
  let activeEnInitial = '';
  let activeDigitInitial = '';
  let activePoseType = '';
  let activePoseVariant = '';
  let activePaletteCategory = '';
  let activePalettePreset = '';
  let directoryMode = 'design';
  let activeSiteKey = 'pinterest';
  let selectedStyleId = '';
  let shuffleState = null; // { directory: string, order: string[] }
  let selectedIntentKey = '';
  let selectedCardQuery = '';
  const POSEMANIACS_URL = 'https://www.posemaniacs.com/ko/poses';

  const THEME_KEY = 'reference-hub-theme';
  const DIRECTORY_KEY = 'reference-hub-directory';
  const SITE_KEY = 'reference-hub-site';
  const MANUAL_Q_KEY_PREFIX = 'reference-hub-manualq:';
  const MANUAL_BASE_Q_KEY_PREFIX = 'reference-hub-manualbaseq:';
  const SHUFFLE_KEY = 'reference-hub-shuffle';
  const INTENT_KEY_PREFIX = 'reference-hub-intent:';
  const PROMPT_PRESET_KEY_PREFIX = 'reference-hub-promptpreset:';

  const THEMES = [
    'light',
    'dark',
    'nord',
    'dracula',
    'solarized-dark',
    'solarized-light',
    'high-contrast'
  ];
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && THEMES.includes(saved)) return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  function applyTheme(next) {
    const theme = (next && THEMES.includes(next)) ? next : 'dark';
    document.body.dataset.theme = theme;
    if (dom.themeSelect) dom.themeSelect.value = theme;
    localStorage.setItem(THEME_KEY, theme);
  }

  function getPreferredDirectory() {
    try {
      const sp = new URLSearchParams(window.location.search || '');
      const q = (sp.get('dir') || sp.get('directory') || '').toLowerCase();
      if (q === 'character' || q === 'char') return 'character';
      if (q === 'photo' || q === 'photography' || q === 'lighting') return 'photo';
      if (q === 'palette' || q === 'palettes' || q === 'color') return 'palette';
      if (q === 'pose' || q === 'poses' || q === 'motion') return 'pose';
      if (q === 'design') return 'design';
    } catch { /* ignore */ }
    const saved = localStorage.getItem(DIRECTORY_KEY);
    if (saved === 'character' || saved === 'photo' || saved === 'palette' || saved === 'pose') return saved;
    return 'design';
  }

  const SITES = {
    pinterest: { label: 'Pinterest', url: (q) => `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(q)}` },
    googleImages: { label: 'Google 이미지', url: (q) => `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(q)}` },
    google: { label: 'Google', url: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}` },
    behance: { label: 'Behance', url: (q) => `https://www.behance.net/search/projects?search=${encodeURIComponent(q)}` },
    artstation: { label: 'ArtStation', url: (q) => `https://www.artstation.com/search?sort_by=relevance&query=${encodeURIComponent(q)}` },
    dribbble: { label: 'Dribbble', url: (q) => `https://dribbble.com/search/${encodeURIComponent(q)}` },
    awwwards: { label: 'Awwwards', url: (q) => `https://www.awwwards.com/websites/?text=${encodeURIComponent(q)}` },
    youtube: { label: 'YouTube', url: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` },
    coolors: { label: 'Coolors', url: (q) => `https://coolors.co/search?q=${encodeURIComponent(q)}` },
    adobeColor: { label: 'Adobe Color', url: (q) => `https://color.adobe.com/search?q=${encodeURIComponent(q)}` },
    sketchfab: { label: 'Sketchfab', url: (q) => `https://sketchfab.com/search?type=models&q=${encodeURIComponent(q)}` },
    lineOfAction: { label: 'Line of Action', url: (q) => q ? `https://line-of-action.com/?q=${encodeURIComponent(q)}` : 'https://line-of-action.com/' },
    quickPoses: { label: 'QuickPoses', url: (q) => q ? `https://quickposes.com/en?q=${encodeURIComponent(q)}` : 'https://quickposes.com/' }
  };

  function tokenize(v) {
    return String(v || '').trim().split(/\s+/).filter(Boolean);
  }
  function joinTokens(tokens) {
    const out = [];
    const seen = new Set();
    for (const t of tokens.flatMap(tokenize)) {
      const k = t.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(t);
    }
    return out.join(' ').trim();
  }

  function siteBoostTokens(siteKey) {
    const mode = directoryMode;
    if (siteKey === 'pinterest') {
      if (mode === 'design') return 'inspo moodboard';
      if (mode === 'character') return 'reference inspo';
      if (mode === 'photo') return 'photography';
      if (mode === 'palette') return 'palette';
      if (mode === 'pose') return 'reference';
    }
    if (siteKey === 'behance') return mode === 'design' ? 'case study project' : '';
    if (siteKey === 'artstation') return (mode === 'character' || mode === 'pose') ? 'concept turnaround sheet' : '';
    if (siteKey === 'dribbble') return mode === 'design' ? 'shot' : '';
    if (siteKey === 'youtube') return mode === 'photo' ? 'lighting setup diagram behind the scenes' : (mode === 'pose' ? 'tutorial reference' : '');
    if (siteKey === 'coolors' || siteKey === 'adobeColor') return mode === 'palette' ? 'hex' : '';
    if (siteKey === 'sketchfab') return (mode === 'character') ? '3d model' : '';
    return '';
  }

  function sitesForDirectory(mode) {
    if (mode === 'palette') return ['pinterest', 'googleImages'];
    if (mode === 'photo') return ['pinterest', 'googleImages'];
    if (mode === 'character') return ['pinterest', 'googleImages', 'behance', 'dribbble'];
    if (mode === 'pose') return ['pinterest', 'googleImages'];
    return ['pinterest', 'googleImages', 'behance', 'dribbble'];
  }

  function manualStorageKey() {
    return `${MANUAL_Q_KEY_PREFIX}${directoryMode}`;
  }
  function manualBaseStorageKey() {
    return `${MANUAL_BASE_Q_KEY_PREFIX}${directoryMode}`;
  }
  function loadManualQuery() {
    try {
      return String(localStorage.getItem(manualStorageKey()) || '');
    } catch {
      return '';
    }
  }
  function saveManualQuery(value) {
    try {
      localStorage.setItem(manualStorageKey(), String(value ?? ''));
    } catch { /* ignore */ }
  }
  function loadManualBaseQuery() {
    try {
      return String(localStorage.getItem(manualBaseStorageKey()) || '');
    } catch {
      return '';
    }
  }
  function saveManualBaseQuery(value) {
    try {
      localStorage.setItem(manualBaseStorageKey(), String(value ?? ''));
    } catch { /* ignore */ }
  }

  function intentStorageKey() {
    return `${INTENT_KEY_PREFIX}${directoryMode}`;
  }
  function loadIntentKey() {
    try {
      return String(localStorage.getItem(intentStorageKey()) || '').trim();
    } catch {
      return '';
    }
  }
  function saveIntentKey(value) {
    try {
      localStorage.setItem(intentStorageKey(), String(value ?? ''));
    } catch { /* ignore */ }
  }

  function promptPresetStorageKey() {
    return `${PROMPT_PRESET_KEY_PREFIX}${directoryMode}`;
  }
  function loadPromptPresetKey() {
    try {
      return String(localStorage.getItem(promptPresetStorageKey()) || '').trim();
    } catch {
      return '';
    }
  }
  function savePromptPresetKey(value) {
    try {
      localStorage.setItem(promptPresetStorageKey(), String(value ?? ''));
    } catch { /* ignore */ }
  }

  function promptPresetsForDirectory(mode) {
    if (mode === 'palette') {
      return [
        { key: 'ui', label: 'UI Theme', token: 'Design a modern app UI theme preview: color swatches, buttons, inputs, cards, and a small dashboard screen.' },
        { key: 'brand', label: 'Brand', token: 'Create a brand identity moodboard: logo space, typography samples, packaging mock layout, and color swatches.' },
        { key: 'poster', label: 'Poster', token: 'Create a bold graphic poster composition with strong color blocking and typographic hierarchy.' },
        { key: 'interior', label: 'Interior', token: 'Create an interior design moodboard: materials, textures, lighting, and color swatches.' },
        { key: 'cinematic', label: 'Cinematic', token: 'Create a cinematic still color grade reference with film-like lighting and atmosphere.' },
        { key: 'product', label: 'Product', token: 'Create a product photography scene with clean studio lighting and a cohesive background.' },
        { key: 'editorial', label: 'Editorial', token: 'Create an editorial magazine spread layout with photography area and color accents.' },
        { key: 'illustration', label: 'Illustration', token: 'Create a character-friendly illustration key art with clear shapes and readable contrast.' },
        { key: 'packaging', label: 'Packaging', token: 'Create a packaging design board: labels, boxes, stickers, and color swatches.' },
        { key: 'web', label: 'Landing', token: 'Create a landing page hero section concept with UI components and a clear CTA.' },
        { key: 'gradient', label: 'Gradient', token: 'Create smooth gradient studies and color ramps with abstract shapes.' },
        { key: 'swatch', label: 'Swatches', token: 'Create a clean color swatch sheet with hex labels and simple layout.' }
      ];
    }
    return [];
  }

  function intentsForDirectory(mode) {
    if (mode === 'design') {
      return [
        { key: 'ui', label: 'UI/대시보드', token: 'ui dashboard design' },
        { key: 'designsystem', label: '디자인 시스템', token: 'design system component library' },
        { key: 'landing', label: '랜딩/마케팅', token: 'landing page marketing website' },
        { key: 'ecommerce', label: '이커머스', token: 'ecommerce ui checkout product page' },
        { key: 'branding', label: '브랜딩', token: 'brand identity logo system guidelines' },
        { key: 'poster', label: '포스터/그래픽', token: 'poster graphic design typography layout' }
      ];
    }
    if (mode === 'character') {
      return [
        { key: 'chardesign', label: '캐릭터 디자인', token: 'character design illustration' },
        { key: 'sheet', label: '시트/턴어라운드', token: 'turnaround model sheet character sheet' },
        { key: 'expression', label: '표정/포즈 시트', token: 'expression sheet pose sheet' },
        { key: 'mascot', label: '마스코트/브랜드 캐릭터', token: 'mascot character design brand character' },
        { key: 'creature', label: '크리처/몬스터', token: 'creature design concept art' },
        { key: 'anime', label: '애니/만화', token: 'anime style character' }
      ];
    }
    if (mode === 'photo') {
      return [
        { key: 'portrait', label: '인물', token: 'portrait lighting setup' },
        { key: 'product', label: '제품', token: 'product photography lighting setup' },
        { key: 'food', label: '푸드', token: 'food photography lighting' },
        { key: 'interior', label: '공간/인테리어', token: 'interior photography lighting' },
        { key: 'cinematic', label: '시네마틱', token: 'cinematic lighting color grade' },
        { key: 'diagram', label: '라이팅 다이어그램', token: 'lighting diagram setup behind the scenes' }
      ];
    }
    if (mode === 'palette') {
      return [
        { key: 'branding', label: '브랜드 팔레트', token: 'brand identity color palette' },
        { key: 'ui', label: 'UI 팔레트', token: 'ui color palette system' },
        { key: 'swatches', label: '스와치/HEX', token: 'swatches hex codes' },
        { key: 'accessible', label: '접근성/대비', token: 'accessible color palette contrast' },
        { key: 'cinematic', label: '시네마틱', token: 'cinematic color palette film still' },
        { key: 'interior', label: '인테리어', token: 'interior color palette materials' },
        { key: 'pastel', label: '파스텔', token: 'pastel color palette' },
        { key: 'muted', label: '뮤트', token: 'muted color palette' },
        { key: 'mono', label: '모노/단색', token: 'monochrome color palette' }
      ];
    }
    if (mode === 'pose') {
      return [
        { key: 'gesture', label: '제스처 드로잉', token: 'gesture drawing reference' },
        { key: 'action', label: '액션', token: 'action pose reference' },
        { key: 'combat', label: '전투/무술', token: 'combat pose reference martial arts' },
        { key: 'dance', label: '댄스/퍼포먼스', token: 'dance pose reference movement' },
        { key: 'hands', label: '손/팔', token: 'hand pose reference' },
        { key: 'foreshort', label: '원근/단축', token: 'foreshortening pose reference' }
      ];
    }
    return [];
  }

  function intentToken() {
    const intents = intentsForDirectory(directoryMode);
    const found = intents.find((x) => x.key === selectedIntentKey);
    return found ? found.token : '';
  }

  function escapeRegExp(s) {
    return String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function stripIntentTokens(input, mode = directoryMode) {
    let out = String(input || '');
    const intents = intentsForDirectory(mode);
    intents.forEach((it) => {
      const token = String(it.token || '').trim();
      if (!token) return;
      const escaped = escapeRegExp(token).replace(/\\ /g, '\\s+');
      const re = new RegExp(`(^|\\s)${escaped}(?=\\s|$)`, 'ig');
      out = out.replace(re, ' ');
    });
    return out.replace(/\s+/g, ' ').trim();
  }

  function renderPromptPresetChips() {
    if (!dom.promptPresetBlock || !dom.promptPresetChips) return;
    const presets = promptPresetsForDirectory(directoryMode);
    const visible = directoryMode === 'palette' && presets.length > 0;
    dom.promptPresetBlock.hidden = !visible;
    if (!visible) {
      dom.promptPresetChips.innerHTML = '';
      return;
    }

    const selected = loadPromptPresetKey();
    dom.promptPresetChips.innerHTML = '';

    presets.forEach((p) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip ${selected === p.key ? 'active' : ''}`.trim();
      b.textContent = p.label;
      b.addEventListener('click', () => {
        const next = (loadPromptPresetKey() === p.key) ? '' : p.key;
        savePromptPresetKey(next);
        renderPromptPresetChips();
      });
      dom.promptPresetChips.appendChild(b);
    });
  }

  function getManualBaseFromUI() {
    const fromStore = loadManualBaseQuery();
    if (fromStore) return fromStore;
    const raw = String(dom.manualSearch?.value || '').trim();
    return stripIntentTokens(raw);
  }

  function renderIntentChips() {
    if (!dom.intentChips) return;
    dom.intentChips.innerHTML = '';
    const intents = intentsForDirectory(directoryMode);
    intents.forEach((i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip ${selectedIntentKey === i.key ? 'active' : ''}`.trim();
      b.textContent = i.label;
      b.title = selectedStyleId ? '' : '카드를 선택하면 더 정확해져요 (또는 검색창에 직접 입력 후 사용)';
      b.addEventListener('click', () => {
        selectedIntentKey = (selectedIntentKey === i.key) ? '' : i.key;
        saveIntentKey(selectedIntentKey);
        const base = selectedCardQuery || getManualBaseFromUI();
        if (!base) {
          selectedIntentKey = '';
          saveIntentKey('');
          refreshManualHint();
          return;
        }
        saveManualBaseQuery(base);
        const next = selectedIntentKey ? joinTokens([base, intentToken()]) : base;
        if (dom.manualSearch) {
          dom.manualSearch.value = next;
          dom.manualSearch.dispatchEvent(new Event('input', { bubbles: true }));
          try { dom.manualSearch.focus({ preventScroll: true }); } catch { /* ignore */ }
        }
        saveManualQuery(next);
        refreshManualHint();
        renderIntentChips();
      });
      dom.intentChips.appendChild(b);
    });
  }

  function effectiveSiteQuery(q, siteKey) {
    return joinTokens([q, siteBoostTokens(siteKey)]);
  }
  function updateManualPlaceholder() {
    if (!dom.manualSearch) return;
    dom.manualSearch.placeholder =
      directoryMode === 'character' ? '예: chibi, cel shading, pixel art, turnaround' :
      directoryMode === 'photo' ? '예: rembrandt lighting, low key, golden hour, film' :
      directoryMode === 'palette' ? '예: pastel palette, muted, nord, monochrome' :
      directoryMode === 'pose' ? '예: running, jump, gesture, dynamic, foreshortening' :
      '예: brutalism ui dashboard, swiss typography, y2k chrome';
  }
  function openManualSearch(siteKey = activeSiteKey) {
    const uiKey = document.querySelector('.site-switch.active')?.dataset?.siteKey;
    const inferred = (typeof uiKey === 'string' && SITES[uiKey]) ? uiKey : null;
    const key = inferred || ((typeof siteKey === 'string' && SITES[siteKey]) ? siteKey : activeSiteKey);
    let q = String(dom.manualSearch?.value || '').trim();
    if (!q && selectedCardQuery) {
      q = selectedCardQuery;
      if (dom.manualSearch) dom.manualSearch.value = q;
      saveManualQuery(q);
    }
    if (!q) {
      refreshManualHint();
      return;
    }

    const href = (SITES[key] || SITES.pinterest).url(effectiveSiteQuery(q, key));
    window.open(href, '_blank', 'noopener,noreferrer');
  }
  function updateSelectedLabel(style) {
    if (!dom.manualSelected) return;
    if (!style) {
      dom.manualSelected.textContent = '';
      return;
    }
    const tags = (style.tags || []).slice(0, 3).map((t) => `#${t}`).join(' ');
    dom.manualSelected.textContent = `선택: ${style.ko} (${style.en}) ${tags ? `— ${tags}` : ''}`.trim();
  }

  function updateSelectedLabelSafe(style) {
    if (!dom.manualSelected) return;
    if (!style) {
      dom.manualSelected.textContent = '';
      return;
    }
    const tags = (style.tags || []).slice(0, 3).map((t) => `#${t}`).join(' ');
    dom.manualSelected.textContent = `선택: ${style.ko} (${style.en})${tags ? ` — ${tags}` : ''}`;
  }

  function styleQuery(style) {
    const raw = String(style?.q || '').trim();
    if (raw) return raw;
    if (directoryMode === 'pose') {
      const poseType = String(style?.poseType || '').trim() || String(style?.id || '').trim().split('-')[0] || '';
      const id = String(style?.id || '').trim();
      const variantRaw = (poseType && id.startsWith(`${poseType}-`)) ? id.slice(poseType.length + 1) : '';
      const variant = variantRaw
        .replace(/-/g, ' ')
        .replace(/^3 4$/, 'three quarter view')
        .trim();
      return joinTokens([poseType, variant, 'pose reference']);
    }
    const en = String(style?.en || '').trim();
    if (en) return en.replace(/[·/]/g, ' ').replace(/\s+/g, ' ').trim();
    const ko = String(style?.ko || '').trim();
    if (ko) return ko.replace(/[·/]/g, ' ').replace(/\s+/g, ' ').trim();
    return String(style?.id || '').trim();
  }

  function selectStyle(style) {
    if (!style) return;
    selectedStyleId = style.id;

    if (dom.grid) {
      dom.grid.querySelectorAll('.style-card.selected').forEach((el) => el.classList.remove('selected'));
      const next = dom.grid.querySelector(`.style-card[data-id="${CSS.escape(style.id)}"]`);
      if (next) next.classList.add('selected');
    }

    selectedCardQuery = styleQuery(style);
    saveManualBaseQuery(selectedCardQuery);
    const q = selectedIntentKey ? joinTokens([selectedCardQuery, intentToken()]) : selectedCardQuery;
    if (dom.manualSearch) dom.manualSearch.value = q;
    saveManualQuery(q);
    updateSelectedLabelSafe(style);
    refreshManualHint();
    updateGuideStep();
    updateStyleGuideStep();

    openPanel({ pin: true });
  }

  function getPreferredSite() {
    const saved = localStorage.getItem(SITE_KEY);
    return saved && SITES[saved] ? saved : 'pinterest';
  }

  function applySite(next) {
    activeSiteKey = SITES[next] ? next : activeSiteKey;
    localStorage.setItem(SITE_KEY, activeSiteKey);
    if (dom.directorySubtitle) dom.directorySubtitle.textContent =
      '스타일을 고르고(필터), 선택한 키워드로 외부 사이트에서 바로 확장 검색하세요.';

    if (dom.search) dom.search.placeholder =
      directoryMode === 'character' ? '예: 치비, 셀셰이딩, 픽셀아트, 잉크, 만화' :
      directoryMode === 'photo' ? '예: rembrandt, low key, golden hour, bokeh, film' :
      directoryMode === 'palette' ? '예: pastel, neon, muted, nord, monochrome' :
      directoryMode === 'pose' ? '예: running, jump, gesture, dynamic, foreshortening' :
      '예: 미니멀, brutal, 스위스, y2k';

    renderSiteSwitches();
    updateGuideStep();
  }

  function renderSiteSwitches() {
    if (!dom.siteSwitchbar) return;
    const keys = sitesForDirectory(directoryMode);
    if (!keys.includes(activeSiteKey)) activeSiteKey = keys[0] || 'pinterest';
    dom.siteSwitchbar.innerHTML = '';
    keys.forEach((k) => {
      const meta = SITES[k];
      if (!meta) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `site-switch ${k === activeSiteKey ? 'active' : ''}`.trim();
      b.textContent = meta.label;
      b.dataset.siteKey = k;
      b.addEventListener('click', () => {
        siteTouched = true;
        applySite(k);
      });
      dom.siteSwitchbar.appendChild(b);
    });
    if (dom.poseLinks) dom.poseLinks.hidden = directoryMode !== 'pose';
    if (dom.paletteLinks) dom.paletteLinks.hidden = directoryMode !== 'palette';
    if (dom.characterLinks) dom.characterLinks.hidden = directoryMode !== 'character';
    updateGuideStep();
  }
  function applyDirectory(next) {
    directoryMode = (next === 'character' || next === 'photo' || next === 'palette' || next === 'pose') ? next : 'design';
    localStorage.setItem(DIRECTORY_KEY, directoryMode);
    siteTouched = false;

    if (directoryMode === 'pose') {
      activeEnInitial = '';
      activeDigitInitial = '';
      activePaletteCategory = '';
      activePalettePreset = '';
    } else {
      activePoseType = '';
      activePoseVariant = '';
      if (dom.poseTypeJump) {
        dom.poseTypeJump.hidden = true;
        dom.poseTypeJump.innerHTML = '';
      }
      if (dom.poseVariantJump) {
        dom.poseVariantJump.hidden = true;
        dom.poseVariantJump.innerHTML = '';
      }
    }

    if (directoryMode === 'palette') {
      // palette: no A-Z/숫자 점프, category/preset 탐색
      activeEnInitial = '';
      activeDigitInitial = '';
      activePaletteCategory = '';
      activePalettePreset = '';
    } else {
      activePaletteCategory = '';
      activePalettePreset = '';
      if (dom.paletteCategoryJump) {
        dom.paletteCategoryJump.hidden = true;
        dom.paletteCategoryJump.innerHTML = '';
      }
      if (dom.palettePresetJump) {
        dom.palettePresetJump.hidden = true;
        dom.palettePresetJump.innerHTML = '';
      }
    }

    if (dom.dirDesign) dom.dirDesign.classList.toggle('active', directoryMode === 'design');
    if (dom.dirCharacter) dom.dirCharacter.classList.toggle('active', directoryMode === 'character');
    if (dom.dirPhoto) dom.dirPhoto.classList.toggle('active', directoryMode === 'photo');
    if (dom.dirPalette) dom.dirPalette.classList.toggle('active', directoryMode === 'palette');
    if (dom.dirPose) dom.dirPose.classList.toggle('active', directoryMode === 'pose');

    if (dom.directoryTitle) dom.directoryTitle.textContent =
      directoryMode === 'character' ? 'Character Style Directory' :
      directoryMode === 'photo' ? 'Photo Style & Lighting Directory' :
      directoryMode === 'palette' ? 'Color Palette Directory' :
      directoryMode === 'pose' ? 'Pose & Motion Directory' :
      'Design Style Directory';

    if (dom.directorySubtitle) dom.directorySubtitle.textContent =
      '스타일을 고르고(필터), 선택한 키워드로 외부 사이트에서 바로 확장 검색하세요.';

    if (dom.search) dom.search.placeholder =
      directoryMode === 'character' ? '예: 치비, 셀셰이딩, 픽셀아트, 잉크, 만화' :
      directoryMode === 'photo' ? '예: rembrandt, low key, golden hour, bokeh, film' :
      directoryMode === 'palette' ? '예: pastel, neon, muted, nord, monochrome' :
      directoryMode === 'pose' ? '예: running, sitting, sword, jump, gesture' :
      '예: 미니멀, brutal, 스위스, y2k';

    renderSiteSwitches();
    selectedCardQuery = '';
    selectedStyleId = '';
    updateSelectedLabelSafe(null);
    clearShuffle({ persist: true });
    selectedIntentKey = loadIntentKey();
    renderIntentChips();
    renderPromptPresetChips();

    if (dom.manualSearch) {
      dom.manualSearch.value = '';
      saveManualQuery('');
      saveManualBaseQuery('');
    }
    refreshManualHint();
    updateGuideStep();
    updateStyleGuideStep();
  }

  function thumbsBase() {
    if (directoryMode === 'character') return 'assets/char-thumbs';
    if (directoryMode === 'photo') return 'assets/photo-thumbs';
    if (directoryMode === 'palette') return 'assets/palette-thumbs';
    if (directoryMode === 'pose') return 'assets/pose-thumbs';
    return 'assets/thumbs';
  }
  function thumbPaths(id) {
    const base = thumbsBase();
    return {
      jpg: `${base}/${id}.jpg`,
      png: `${base}/${id}.png`,
      svg: `${base}/${id}.svg`
    };
  }
  function hashToHue(str) {
    let h = 0;
    const s = String(str || '');
    for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h % 360;
  }
  function escXml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
  function characterThumbSvg(style) {
    const hue = hashToHue(style.id);
    const hue2 = (hue + 42) % 360;
    const bg1 = `hsl(${hue} 75% 52%)`;
    const bg2 = `hsl(${hue2} 78% 46%)`;
    const ring = `hsl(${(hue + 180) % 360} 92% 72% / 0.55)`;
    const label = escXml((style.ko || style.en || style.id).toString().slice(0, 28));
    const sub = escXml((style.en || '').toString().slice(0, 32));
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <radialGradient id="r" cx="30%" cy="20%" r="75%">
      <stop offset="0" stop-color="rgba(255,255,255,0.35)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="rgba(0,0,0,0.35)"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="600" height="900" fill="url(#g)"/>
  <rect x="0" y="0" width="600" height="900" fill="url(#r)"/>
  <g filter="url(#s)">
    <circle cx="300" cy="310" r="150" fill="rgba(255,255,255,0.16)" stroke="${ring}" stroke-width="10"/>
    <path d="M205,565 C215,455 385,455 395,565 C405,675 195,675 205,565 Z"
      fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.25)" stroke-width="6" />
    <circle cx="250" cy="300" r="16" fill="rgba(0,0,0,0.26)"/>
    <circle cx="350" cy="300" r="16" fill="rgba(0,0,0,0.26)"/>
    <path d="M275,350 Q300,370 325,350" fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="10" stroke-linecap="round"/>
  </g>
  <g>
    <rect x="36" y="640" width="528" height="208" rx="22" fill="rgba(0,0,0,0.40)" stroke="rgba(255,255,255,0.18)"/>
    <text x="60" y="695" fill="#fff" font-size="34" font-weight="800" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${label}</text>
    <text x="60" y="735" fill="rgba(255,255,255,0.86)" font-size="22" font-weight="600" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${sub}</text>
    <text x="60" y="815" fill="rgba(255,255,255,0.70)" font-size="18" font-weight="500" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${escXml(style.id)}</text>
  </g>
</svg>`;
  }
  function characterThumbDataUri(style) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(characterThumbSvg(style))}`;
  }
  function paletteThumbSvg(style) {
    const colors = Array.isArray(style.colors) ? style.colors.filter(Boolean) : [];
    const safe = colors.length ? colors.slice(0, 8) : ['#111827', '#374151', '#6B7280', '#D1D5DB'];
    const label = escXml((style.ko || style.en || style.id).toString().slice(0, 28));
    const sub = escXml((style.en || '').toString().slice(0, 32));
    const slots = safe.length;
    const w = 600;
    const h = 900;
    const bandH = Math.round(h * 0.62);
    const sw = Math.ceil(w / slots);
    let rects = '';
    for (let i = 0; i < slots; i += 1) {
      rects += `<rect x="${i * sw}" y="0" width="${sw}" height="${bandH}" fill="${escXml(safe[i])}"/>`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${rects}
  <rect x="0" y="${bandH}" width="${w}" height="${h - bandH}" fill="rgba(0,0,0,0.46)"/>
  <text x="36" y="${bandH + 74}" fill="#fff" font-size="34" font-weight="800" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${label}</text>
  <text x="36" y="${bandH + 114}" fill="rgba(255,255,255,0.86)" font-size="22" font-weight="600" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${sub}</text>
  <g transform="translate(36, ${bandH + 148})">
    ${safe.slice(0, 6).map((c, i) => `<rect x="${i * 92}" y="0" width="78" height="52" rx="12" fill="${escXml(c)}" stroke="rgba(255,255,255,0.22)"/>`).join('')}
    ${safe.slice(0, 6).map((c, i) => `<text x="${i * 92 + 39}" y="86" text-anchor="middle" fill="rgba(255,255,255,0.78)" font-size="14" font-weight="600" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">${escXml(String(c).toUpperCase())}</text>`).join('')}
  </g>
</svg>`;
  }
  function paletteThumbDataUri(style) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(paletteThumbSvg(style))}`;
  }

  function poseThumbSvg(style) {
    const type = String(style.poseType || style.id || '').toLowerCase();
    const hue = hashToHue(type);
    const bg1 = `hsl(${hue} 72% 52%)`;
    const bg2 = `hsl(${(hue + 34) % 360} 72% 44%)`;
    const label = escXml((style.ko || style.en || style.id).toString().slice(0, 26));
    const sub = escXml((style.en || '').toString().slice(0, 34));

    const stick = (() => {
      if (type.includes('running')) return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L280 420 L210 500 M280 420 L350 455 L410 505 M280 360 L210 380 M290 350 L360 320';
      if (type.includes('jump')) return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L300 430 M300 360 L230 410 M300 360 L370 395 M300 430 L245 520 M300 430 L370 500';
      if (type.includes('sitting')) return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L300 400 L235 420 M300 400 L350 420 L390 465 M235 420 L230 500 M350 420 L330 500';
      if (type.includes('crouch')) return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L290 380 L245 450 M290 380 L350 420 L410 465 M245 450 L260 520 M350 420 L330 500';
      if (type.includes('kneel')) return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L300 400 L260 455 M300 360 L230 395 M300 360 L360 395 M260 455 L280 520 M300 400 L360 455 L410 505';
      if (type.includes('lying')) return 'M220 360 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M255 400 L360 430 L460 445 M300 420 L265 470 M330 430 L290 500 M410 440 L380 510';
      if (type.includes('dance')) return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L300 430 M300 350 L230 320 M300 350 L370 315 M300 430 L250 520 M300 430 L380 480';
      if (type.includes('fight') || type.includes('punch') || type.includes('kick')) return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L290 430 M300 350 L220 350 M300 350 L360 320 M290 430 L245 520 M290 410 L390 430';
      if (type.includes('aim')) return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L300 430 M300 350 L220 370 M300 350 L390 350 M300 430 L265 520 M300 430 L350 520';
      return 'M300 260 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0 M300 310 L300 430 M300 350 L230 365 M300 350 L370 365 M300 430 L260 520 M300 430 L340 520';
    })();

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <radialGradient id="r" cx="30%" cy="20%" r="80%">
      <stop offset="0" stop-color="rgba(255,255,255,0.35)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="600" height="900" fill="url(#g)"/>
  <rect x="0" y="0" width="600" height="900" fill="url(#r)"/>
  <g fill="none" stroke="rgba(0,0,0,0.40)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
    <path d="${stick}"/>
  </g>
  <rect x="0" y="600" width="600" height="300" fill="rgba(0,0,0,0.46)"/>
  <text x="36" y="676" fill="#fff" font-size="32" font-weight="800" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${label}</text>
  <text x="36" y="718" fill="rgba(255,255,255,0.86)" font-size="20" font-weight="600" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${sub}</text>
</svg>`;
  }
  function poseThumbDataUri(style) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(poseThumbSvg(style))}`;
  }
  function applyThumb(imgEl, style) {
    const p = thumbPaths(style.id);
    const charFallback = characterThumbDataUri(style);
    const paletteFallback = paletteThumbDataUri(style);
    const poseFallback = poseThumbDataUri(style);
    const order = directoryMode === 'character'
      ? [p.jpg, p.png, p.svg, charFallback]
      : directoryMode === 'palette'
        ? [paletteFallback]
        : directoryMode === 'pose'
          ? [poseFallback]
      : [p.jpg, p.png, p.svg];
    let idx = 0;
    imgEl.onerror = () => {
      idx += 1;
      if (idx >= order.length) {
        imgEl.onerror = null;
        return;
      }
      imgEl.src = order[idx];
    };
    imgEl.src = order[0];
  }

  function activeSearchUrl(style) {
    const site = SITES[activeSiteKey] || SITES.pinterest;
    return site.url(effectiveSiteQuery(String(style?.q || ''), activeSiteKey));
  }

  async function writeClipboard(text) {
    try {
      await navigator.clipboard.writeText(String(text ?? ''));
      return true;
    } catch {
      window.prompt('복사해서 사용하세요:', String(text ?? ''));
      return false;
    }
  }

  let toastTimer = 0;
  function showToast(message) {
    if (!dom.toast) return;
    if (toastTimer) window.clearTimeout(toastTimer);
    dom.toast.textContent = String(message || '');
    dom.toast.classList.add('show');
    toastTimer = window.setTimeout(() => {
      dom.toast.classList.remove('show');
    }, 2000);
  }

  function showPopup({ title = '복사 완료', desc = '' } = {}) {
    if (!dom.popup) return;
    if (dom.popupTitle) dom.popupTitle.textContent = String(title || '');
    if (dom.popupDesc) dom.popupDesc.textContent = String(desc || '');
    dom.popup.hidden = false;
    try { dom.popupClose?.focus({ preventScroll: true }); } catch { /* ignore */ }
  }

  function closePopup() {
    if (!dom.popup) return;
    dom.popup.hidden = true;
  }

  function sampleImagePrompt(style) {
    const en = String(style?.en || '').trim();
    const id = String(style?.id || '').trim();
    const ascii = (s) => String(s || '')
      .replace(/[^\x20-\x7E]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const title = ascii(en || id).replace(/[·/]/g, ' ').replace(/\s+/g, ' ').trim();
    const tags = (style?.tags || [])
      .slice(0, 3)
      .map((t) => ascii(t))
      .filter(Boolean)
      .filter((t) => /^[a-z0-9][a-z0-9 -]*$/i.test(t));
    const tagPhrase = tags.length ? tags.join(', ') : '';
    const withTags = tagPhrase ? ` with ${tagPhrase}` : '';

    const preset = (() => {
      const key = String(style?.id || '').trim().toLowerCase();
      if (directoryMode === 'design' && (key === 'ukiyoe' || key === 'ukiyo-e')) {
        return `Modern ukiyo-e inspired woodblock print illustration. Bold ink outlines, flat layered colors, subtle paper texture, traditional Japanese pattern motifs, decorative clouds, strong silhouette, dynamic composition, unmistakably ukiyo-e line rhythm.`;
      }
      return '';
    })();

    const basePrompt = (() => {
      if (directoryMode === 'design') {
        return preset || `Signature abstract graphic design key visual in the ${title} aesthetic${withTags}. Iconic shapes, pattern language, and material mood that instantly reads as ${title}.`;
      }
      if (directoryMode === 'character') {
        return `Signature character illustration in the ${title} style${withTags}. Distinct silhouette, clear linework, confident shading, and a color treatment that feels unmistakably ${title}.`;
      }
      if (directoryMode === 'photo') {
        return `Signature photograph capturing the ${title} look${withTags}. Lighting direction, shadow character, lens feel, and color grading that clearly communicates ${title}.`;
      }
      if (directoryMode === 'palette') {
        const hex = (Array.isArray(style?.colors) ? style.colors : [])
          .map((c) => ascii(String(c || '').toUpperCase()))
          .filter(Boolean)
          .slice(0, 5)
          .join(' ');
        const hexLine = hex ? ` Use these exact colors: ${hex}.` : '';
        const cat = paletteCategoryKey(style);
        const catContext = (() => {
          if (cat === 'film') return 'Cinematic lighting, subtle film-like color grading, and a clear moodboard presentation.';
          if (cat === 'era') return 'Era-accurate styling, graphic motifs, and a palette that feels true to the time period.';
          if (cat === 'mood') return 'Strong emotional mood, readable contrast, and a cohesive visual identity.';
          if (cat === 'brand') return 'Brand identity board style with clear primary/secondary/accent roles and consistent tone.';
          if (cat === 'material') return 'Material-forward look with texture cues, finish highlights, and believable surface colors.';
          if (cat === 'lighting') return 'Photography-inspired light/shadow behavior and a believable color cast.';
          if (cat === 'season') return 'Seasonal atmosphere, natural color cues, and a cohesive palette story.';
          if (cat === 'place') return 'Place-inspired moodboard with cultural color cues and environmental context.';
          if (cat === 'use') return 'Practical design use: accessible contrast, UI/print readiness, and clear accent usage.';
          if (cat === 'theory') return 'Color harmony focus with clean relationships and easy-to-read swatches.';
          return '';
        })();
        const catLine = catContext ? ` ${catContext}` : '';
        const presetKey = loadPromptPresetKey();
        const presetMeta = promptPresetsForDirectory('palette').find((p) => p.key === presetKey);
        const presetLine = presetMeta?.token ? ` ${presetMeta.token}` : '';
        return `Signature image showcasing the ${title} color palette${withTags}.${hexLine}${catLine}${presetLine}`.trim();
      }
      if (directoryMode === 'pose') {
        return `Signature pose reference image of ${title}${withTags}. Clear silhouette, strong line of action, balanced weight, and an instantly readable gesture.`;
      }
      return `Signature image that represents ${title}${withTags}.`;
    })();

    return basePrompt;
  }

  function mdLink(label, href) {
    if (!href) return label;
    return `[${label}](${href})`;
  }

  function buildChecklist(style) {
    const tags = (style.tags || []).slice(0, 3);
    const chars = (style.characteristics || []).slice(0, 6);

    const base = [];
    if (directoryMode === 'photo') {
      base.push('빛의 방향(키/필/림) 확인');
      base.push('그림자 성격(하드/소프트) 결정');
      base.push('배경/분리(백라이트/림) 점검');
      base.push('노출/화이트밸런스 기준 잡기');
      base.push('그레이딩 키워드 2개 정하기');
    } else if (directoryMode === 'pose') {
      base.push('실루엣이 읽히는지 확인');
      base.push('무게중심/지면 접지 체크');
      base.push('라인 오브 액션(동세) 잡기');
      base.push('원근 과장(foreshortening) 여부 결정');
      base.push('소품/손 포즈 충돌 체크');
    } else if (directoryMode === 'palette') {
      base.push('주색/보조색/강조색 역할 분리');
      base.push('명도 대비(텍스트 가독성) 확인');
      base.push('채도 균형(포인트 색 1~2개)');
      base.push('배경/서피스 단계(2~3단) 설계');
    } else if (directoryMode === 'character') {
      base.push('실루엣(고유 형태) 먼저 확보');
      base.push('형태 언어(둥글/각/삼각) 통일');
      base.push('렌더 방식(셀/소프트/리얼) 고정');
      base.push('소품/의상 키워드 2개 추가');
      base.push('턴어라운드/표정 시트 필요 여부');
    } else {
      base.push('용도(랜딩/대시보드/포스터) 먼저 고정');
      base.push('정보 계층(타이포/그리드) 설계');
      base.push('색/텍스처/모션 중 1개를 주연으로');
      base.push('컴포넌트 상태(hover/active/empty) 점검');
      base.push('검색어에서 노이즈 제거(-template 등)');
    }

    const extra = (chars.length ? chars : tags).slice(0, 3).map((t) => `키워드: ${t}`);
    return [...base, ...extra].slice(0, 8);
  }

  function buildNotionMarkdown(style) {
    const title = `${style.ko} (${style.en})`;
    const tags = (style.tags || []).slice(0, 3).map((t) => `#${t}`).join(' ');
    const checklist = buildChecklist(style);

    const sites = sitesForDirectory(directoryMode);
    const links = sites
      .map((k) => {
        const meta = SITES[k];
        if (!meta) return null;
        const href = meta.url(effectiveSiteQuery(String(style?.q || ''), k));
        return `- ${mdLink(meta.label, href)}`;
      })
      .filter(Boolean)
      .join('\n');

    const palette = Array.isArray(style.colors) ? style.colors.slice(0, 8) : [];
    const paletteLine = palette.length ? `\n\n## Colors\n${palette.map((c) => `\`${String(c).toUpperCase()}\``).join(' ')}` : '';

    return [
      `# ${title}`,
      tags ? `\n${tags}` : '',
      `\n\n## Overview\n${style.overview || ''}`,
      `\n\n## Checklist\n${checklist.map((x) => `- ${x}`).join('\n')}`,
      `\n\n## Search Query\n\`${effectiveSiteQuery(String(style?.q || ''), activeSiteKey)}\``,
      `\n\n## Links\n${links}`,
      paletteLine
    ].join('');
  }

  function buildSummaryText(style) {
    const title = `${style.ko} (${style.en})`;
    const tags = (style.tags || []).slice(0, 3).map((t) => `#${t}`).join(' ');
    const checklist = buildChecklist(style);
    return [
      title,
      tags ? `\n${tags}` : '',
      `\n\n${style.overview || ''}`,
      `\n\n체크리스트:\n${checklist.map((x) => `- ${x}`).join('\n')}`,
      `\n\n검색어: ${effectiveSiteQuery(String(style?.q || ''), activeSiteKey)}`
    ].join('');
  }
  function normalize(v) {
    return String(v || '').trim().toLowerCase();
  }
  function uniq(list) {
    const out = [];
    const seen = new Set();
    for (const item of list || []) {
      const v = String(item || '').trim();
      if (!v) continue;
      const key = v.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(key);
    }
    return out;
  }
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }
  function fontSizeFor(text, maxPx, minPx, softLimit) {
    const len = String(text || '').trim().length;
    if (!len) return maxPx;
    const ratio = len <= softLimit ? 1 : softLimit / len;
    return clamp(Math.round(maxPx * ratio), minPx, maxPx);
  }
  function sortKoFn(a, b) {
    return (a.ko || '').localeCompare(b.ko || '', 'ko');
  }
  function sortEnFn(a, b) {
    return (a.en || '').localeCompare(b.en || '', 'en');
  }
  function deriveTags(style) {
    const rawText = `${style.en} ${style.ko} ${style.id}`.toLowerCase();
    const tokens = rawText
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean);
    const stop = new Set(['design','style','web','ui','ux','layout']);
    const out = [];
    for (const token of tokens) {
      if (token.length < 3) continue;
      if (stop.has(token)) continue;
      if (out.includes(token)) continue;
      out.push(token);
      if (out.length >= 3) break;
    }
    if (out.length < 3) {
      const fallback = ['grid', 'color', 'type', 'texture', 'motion'];
      for (const f of fallback) {
        if (!out.includes(f)) out.push(f);
        if (out.length >= 3) break;
      }
    }
    return out.slice(0, 3);
  }

  function buildOverview(style) {
    const titleKo = String(style.ko || '').trim();
    const titleEn = String(style.en || '').trim();
    const tags = (style.tags || []).slice(0, 3);
    const topChars = (style.characteristics || []).slice(0, 4);
    const name = titleEn && titleKo ? `${titleEn}(${titleKo})` : (titleKo || titleEn || String(style.id || ''));
    const points = (topChars.length ? topChars : tags).slice(0, 3);

    if (directoryMode === 'pose') {
      return [
        `${name}는 1인 포즈/행동/동작 레퍼런스를 빠르게 찾기 위한 카드입니다.`,
        `실루엣이 읽히는지 → 무게중심/접지 → 라인 오브 액션 순으로 체크하세요.`,
        `동작이 밋밋하면 angle·dynamic·foreshortening 같은 수식어를 추가해보세요.`,
        `핵심 포인트: ${points.join(' · ')}.`
      ].join('\n');
    }

    if (directoryMode === 'palette') {
      const sample = Array.isArray(style.colors) ? style.colors.slice(0, 5).map((c) => String(c).toUpperCase()).join(' ') : '';
      return [
        `${name}는 컬러 팔레트 레퍼런스를 빠르게 찾기 위한 카드입니다.`,
        `주색/보조색/강조색 역할을 분리하고, 텍스트 대비(가독성)를 먼저 확인하세요.`,
        `UI면 ‘ui palette / tokens’, 브랜드면 ‘brand palette / color system’이 유리합니다.`,
        sample ? `샘플: ${sample}` : `핵심 포인트: ${points.join(' · ')}.`
      ].join('\n');
    }

    if (directoryMode === 'photo') {
      return [
        `${name}는 사진/라이팅 톤 레퍼런스를 빠르게 찾기 위한 카드입니다.`,
        `키라이트 방향(키/필/림)과 그림자 성격(하드/소프트)을 먼저 고정하세요.`,
        `무드를 올리려면 ‘cinematic / color grading / film’ 같은 토큰을 함께 검색하세요.`,
        `핵심 포인트: ${points.join(' · ')}.`
      ].join('\n');
    }

    if (directoryMode === 'character') {
      return [
        `${name}는 캐릭터 스타일/표현 방식을 빠르게 찾기 위한 카드입니다.`,
        `형태 언어(둥글/각/삼각)와 렌더 방식(셀/소프트/리얼)을 먼저 고정하세요.`,
        `설정이 필요하면 ‘turnaround / expression sheet’ 같은 키워드를 추가해보세요.`,
        `핵심 포인트: ${points.join(' · ')}.`
      ].join('\n');
    }

    return [
      `${name}는 시각 스타일 레퍼런스를 빠르게 찾기 위한 카드입니다.`,
      `정보 계층(타이포/그리드)과 톤(색/질감/모션) 중 무엇이 주연인지부터 정하세요.`,
      `목적에 맞게 ‘ui / brand identity / poster’ 같은 수식어를 붙이면 품질이 올라갑니다.`,
      `핵심 포인트: ${points.join(' · ')}.`
    ].join('\n');
  }

  function classifyEra(style) {
    const id = style.id;
    const map = new Map([
      ['renaissance', 'Pre-1900'],
      ['baroque', 'Pre-1900'],
      ['rococo', 'Pre-1900'],
      ['neoclassicism', 'Pre-1900'],
      ['romanticism', 'Pre-1900'],
      ['arts-and-crafts', 'Pre-1900'],
      ['impressionism', 'Pre-1900'],
      ['art-nouveau', '1900–1949'],
      ['art-deco', '1900–1949'],
      ['constructivism', '1900–1949'],
      ['bauhaus', '1900–1949'],
      ['de-stijl', '1900–1949'],
      ['futurism', '1900–1949'],
      ['dada', '1900–1949'],
      ['surrealism', '1900–1949'],
      ['modernism', '1900–1949'],
      ['expressionism', '1900–1949'],
      ['cubism', '1900–1949'],
      ['suprematism', '1900–1949'],
      ['pop-art', '1950–1979'],
      ['psychedelic', '1950–1979'],
      ['op-art', '1950–1979'],
      ['mid-century', '1950–1979'],
      ['retro-70s', '1950–1979'],
      ['new-wave', '1980–1999'],
      ['grunge', '1980–1999'],
      ['punk', '1980–1999'],
      ['zine', '1980–1999'],
      ['retro-80s', '1980–1999'],
      ['retro-90s', '1980–1999'],
      ['web-1-0', '1980–1999'],
      ['web-2-0', '2000–2009'],
      ['skeuo-2000s', '2000–2009'],
      ['y2k', '2000–2009'],
      ['glassmorphism', '2020–Now'],
      ['neumorphism', '2020–Now'],
      ['bento-ui', '2020–Now']
    ]);
    if (map.has(id)) return map.get(id);
    if (id.startsWith('retro-')) return '1980–1999';
    if (id.includes('2000') || id.includes('y2k') || id.includes('web-2')) return '2000–2009';
    if (id.includes('neo') || id.includes('glass') || id.includes('bento')) return '2020–Now';
    return 'Timeless';
  }

  function classifyRegions(style) {
    const id = style.id;
    if (['swiss', 'bauhaus', 'de-stijl', 'constructivism', 'art-deco', 'art-nouveau', 'renaissance', 'baroque', 'rococo', 'neoclassicism', 'romanticism', 'memphis'].includes(id)) {
      return ['Europe'];
    }
    if (['japanese-minimal', 'wabi-sabi', 'kawaii'].includes(id)) return ['East Asia'];
    if (['corporate-memphis'].includes(id)) return ['North America'];
    return ['Global'];
  }

  function buildQuery(style) {
    if (QUERY_OVERRIDES[style.id]) return QUERY_OVERRIDES[style.id];
    if (directoryMode === 'character') return `${style.en} character illustration style`;
    if (directoryMode === 'photo') return `${style.en} photography lighting style`;
    if (directoryMode === 'palette') return `${style.en} color palette`;
    if (directoryMode === 'pose') return `${style.en} pose reference`;
    return `${style.en} design style`;
  }

  function enrichStyle(s) {
    const tags = uniq([...(Array.isArray(s.tags) ? s.tags : []), ...deriveTags(s)]).slice(0, 3);
    const overviewCandidate = String(s.overview || NOTE_OVERRIDES[s.id] || s.note || '').trim();
    const overview = (overviewCandidate && overviewCandidate.split('\n').filter(Boolean).length >= 3)
      ? overviewCandidate
      : buildOverview({ ...s, tags, characteristics: s.characteristics || tags.slice(0, 3).map((t) => t.replace(/-/g, ' ')) });
    const figures = s.figures || KEY_FIGURES[s.id] || [];
    const characteristics = s.characteristics || tags.slice(0, 3).map((t) => t.replace(/-/g, ' '));
    const q = s.q || buildQuery(s);
    return { ...s, tags, overview, figures, characteristics, q, poseType: s.poseType };
  }

  function loadStyles() {
    const raw =
      directoryMode === 'character' ? (Array.isArray(window.CHAR_STYLES_DATA) ? window.CHAR_STYLES_DATA : []) :
      directoryMode === 'photo' ? (Array.isArray(window.PHOTO_STYLES_DATA) ? window.PHOTO_STYLES_DATA : []) :
      directoryMode === 'palette' ? (Array.isArray(window.PALETTES_DATA) ? window.PALETTES_DATA : []) :
      directoryMode === 'pose' ? (Array.isArray(window.POSES_DATA) ? window.POSES_DATA : []) :
      (Array.isArray(window.STYLES_DATA) ? window.STYLES_DATA : []);
    STYLES = raw.map(enrichStyle);
    return STYLES;
  }

  function relatedStylesFor(styleId, limit = 12) {
    const base = STYLES.find((s) => s.id === styleId);
    if (!base) return [];
    const baseTags = new Set(base.tags || []);
    const scored = STYLES.filter((s) => s.id !== styleId).map((s) => {
      let inter = 0;
      for (const t of s.tags || []) if (baseTags.has(t)) inter += 1;
      const union = new Set([...(s.tags || []), ...(base.tags || [])]).size || 1;
      return { s, score: inter / union };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.filter((x) => x.score > 0).slice(0, limit).map((x) => x.s);
  }

  function matchesScope(style, q) {
    if (!q) return true;
    const nq = normalize(q);
    const hayAll = [
      style.ko,
      style.en,
      style.overview,
      style.id,
      style.q,
      ...(style.tags || []),
      ...(style.figures || []),
      ...(style.characteristics || [])
    ].map(normalize).join(' ');
    return hayAll.includes(nq);
  }

  function matchesInitials(style) {
    if (directoryMode === 'pose') return true;
    if (activeDigitInitial) {
      const firstKo = String(style.ko || '').trim().slice(0, 1);
      const firstEn = String(style.en || '').trim().slice(0, 1);
      const firstId = String(style.id || '').trim().slice(0, 1);
      if (firstKo !== activeDigitInitial && firstEn !== activeDigitInitial && firstId !== activeDigitInitial) return false;
    }
    if (activeEnInitial) {
      const first = String(style.en || '').trim().slice(0, 1).toUpperCase();
      if (first !== activeEnInitial) return false;
    }
    return true;
  }

  function poseVariantKey(style) {
    const id = String(style?.id || '').trim();
    if (!id) return '';
    const idx = id.indexOf('-');
    if (idx === -1) return '';
    return id.slice(idx + 1);
  }

  const POSE_TYPE_LABELS = {
    standing: { ko: '서있기', en: 'Standing' },
    walking: { ko: '걷기', en: 'Walking' },
    running: { ko: '달리기', en: 'Running' },
    jumping: { ko: '점프', en: 'Jumping' },
    sitting: { ko: '앉기', en: 'Sitting' },
    crouching: { ko: '웅크리기', en: 'Crouching' },
    kneeling: { ko: '무릎꿇기', en: 'Kneeling' },
    lying: { ko: '눕기', en: 'Lying' },
    climbing: { ko: '오르기', en: 'Climbing' },
    dancing: { ko: '춤', en: 'Dancing' },
    fighting: { ko: '격투', en: 'Fighting' },
    kicking: { ko: '발차기', en: 'Kicking' },
    punching: { ko: '주먹질', en: 'Punching' },
    aiming: { ko: '조준', en: 'Aiming' },
    holding: { ko: '잡기', en: 'Holding' },
    carrying: { ko: '들기', en: 'Carrying' },
    throwing: { ko: '던지기', en: 'Throwing' },
    landing: { ko: '착지', en: 'Landing' },
    stretching: { ko: '스트레칭', en: 'Stretching' },
    gesture: { ko: '제스처', en: 'Gesture' },
    turning: { ko: '돌아보기', en: 'Turning' },
    reaching: { ko: '뻗기', en: 'Reaching' },
    pushing: { ko: '밀기', en: 'Pushing' },
    pulling: { ko: '당기기', en: 'Pulling' },
    pointing: { ko: '가리키기', en: 'Pointing' },
    falling: { ko: '넘어짐', en: 'Falling' }
  };

  const POSE_VARIANT_LABELS = {
    front: { ko: '정면', en: 'Front' },
    side: { ko: '측면', en: 'Side' },
    back: { ko: '후면', en: 'Back' },
    '3-4': { ko: '3/4', en: 'Three-quarter' },
    dynamic: { ko: '역동', en: 'Dynamic' },
    silhouette: { ko: '실루엣', en: 'Silhouette' },
    foreshortening: { ko: '원근 과장', en: 'Foreshortening' },
    'low-angle': { ko: '로우 앵글', en: 'Low Angle' },
    'high-angle': { ko: '하이 앵글', en: 'High Angle' },
    'key-pose': { ko: '키 포즈', en: 'Key Pose' }
  };

  function poseTypeLabel(k) {
    const meta = POSE_TYPE_LABELS[String(k || '')];
    if (meta) return `${meta.ko} (${meta.en})`;
    const s = String(k || '').replace(/-/g, ' ');
    return s ? `${s.slice(0, 1).toUpperCase()}${s.slice(1)}` : '';
  }

  function poseVariantLabel(k) {
    const meta = POSE_VARIANT_LABELS[String(k || '')];
    if (meta) return `${meta.ko} (${meta.en})`;
    const s = String(k || '').replace(/-/g, ' ');
    return s ? `${s.slice(0, 1).toUpperCase()}${s.slice(1)}` : '';
  }

  function matchesPoseQuickFilters(style) {
    if (directoryMode !== 'pose') return true;
    if (activePoseType && String(style.poseType || '').trim() !== activePoseType) return false;
    if (activePoseVariant && poseVariantKey(style) !== activePoseVariant) return false;
    return true;
  }

  const PALETTE_CATEGORY_ORDER = [
    { key: 'film', label: '영화/시네마 (Film)' },
    { key: 'era', label: '연도/시대 (Era)' },
    { key: 'mood', label: '무드/감정 (Mood)' },
    { key: 'brand', label: '브랜드 성격 (Brand)' },
    { key: 'material', label: '재질/소재 (Material)' },
    { key: 'lighting', label: '라이팅/촬영 (Lighting)' },
    { key: 'season', label: '계절/날씨 (Season)' },
    { key: 'place', label: '도시/문화 (Place)' },
    { key: 'use', label: '용도 (Use Case)' },
    { key: 'theory', label: '조합 규칙 (Color Theory)' }
  ];
  const PALETTE_CATEGORY_LABEL = new Map(PALETTE_CATEGORY_ORDER.map((x) => [x.key, x.label]));

  function paletteCategoryKey(style) {
    return String(style?.paletteCategoryKey || '').trim();
  }
  function palettePresetKey(style) {
    return String(style?.palettePresetKey || '').trim();
  }
  function paletteCategoryLabel(key) {
    const k = String(key || '').trim();
    return PALETTE_CATEGORY_LABEL.get(k) || k || '기타';
  }
  function palettePresetLabel(style) {
    const label = String(style?.palettePresetLabel || '').trim();
    const key = palettePresetKey(style);
    return label || key || '기타';
  }

  function matchesPaletteQuickFilters(style) {
    if (directoryMode !== 'palette') return true;
    const cat = paletteCategoryKey(style);
    const pre = palettePresetKey(style);
    if (activePaletteCategory && cat !== activePaletteCategory) return false;
    if (activePalettePreset && pre !== activePalettePreset) return false;
    return true;
  }

  function matchesTag(style) {
    if (!activeTag) return true;
    return (style.tags || []).includes(activeTag);
  }

  function sortItems(items) {
    return [...items].sort((a, b) => {
      if (activeTag) {
        const at = (a.tags || []).includes(activeTag) ? 1 : 0;
        const bt = (b.tags || []).includes(activeTag) ? 1 : 0;
        if (at !== bt) return bt - at;
      }
      return (sortMode === 'ko' ? sortKoFn(a, b) : sortEnFn(a, b));
    });
  }

  function buildJumpBars() {
    if (directoryMode === 'pose') {
      if (dom.enJump) dom.enJump.hidden = true;
      if (dom.enJump) dom.enJump.innerHTML = '';
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = false;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = false;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
      if (dom.poseTypeJump) dom.poseTypeJump.innerHTML = '';
      if (dom.poseVariantJump) dom.poseVariantJump.innerHTML = '';

      const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
      const total = base.length;

      const withinVariant = (s) => !activePoseVariant || poseVariantKey(s) === activePoseVariant;
      const withinType = (s) => !activePoseType || String(s.poseType || '').trim() === activePoseType;

      const typeCounts = new Map();
      const variantCounts = new Map();
      base.filter(withinVariant).forEach((s) => {
        const t = String(s.poseType || '').trim();
        if (!t) return;
        typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
      });
      base.filter(withinType).forEach((s) => {
        const v = poseVariantKey(s);
        if (!v) return;
        variantCounts.set(v, (variantCounts.get(v) || 0) + 1);
      });

      const preferredTypeOrder = [
        'standing', 'walking', 'running', 'jumping', 'sitting', 'crouching', 'kneeling', 'lying',
        'climbing', 'dancing', 'fighting', 'kicking', 'punching', 'aiming', 'holding', 'carrying',
        'throwing', 'landing', 'stretching', 'gesture',
        'turning', 'reaching', 'pushing', 'pulling', 'pointing', 'falling'
      ];
      const restTypes = [...typeCounts.keys()].filter((k) => !preferredTypeOrder.includes(k)).sort();
      const typeOrder = [...preferredTypeOrder, ...restTypes];

      const variantOrder = ['front', 'side', 'back', '3-4', 'dynamic', 'silhouette', 'foreshortening', 'low-angle', 'high-angle', 'key-pose'];

      const mk = (rowEl, labelText, count, isActive, onClick) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `jump ${isActive ? 'active' : ''}`.trim();
        const label = document.createElement('span');
        label.className = 'jump-label';
        label.textContent = labelText;
        const badge = document.createElement('span');
        badge.className = 'jump-count';
        badge.textContent = String(count);
        b.appendChild(label);
        b.appendChild(badge);
        if (count === 0) b.disabled = true;
        b.addEventListener('click', onClick);
        rowEl.appendChild(b);
      };

      if (dom.poseTypeJump) {
        mk(dom.poseTypeJump, '전체 (All)', total, !activePoseType && !activePoseVariant, () => {
          activePoseType = '';
          activePoseVariant = '';
          buildJumpBars();
          render();
        });
        typeOrder.forEach((k) => {
          const c = typeCounts.get(k) || 0;
          mk(dom.poseTypeJump, poseTypeLabel(k), c, activePoseType === k, () => {
            activePoseType = (activePoseType === k) ? '' : k;
            buildJumpBars();
            render();
          });
        });
      }

      if (dom.poseVariantJump) {
        mk(dom.poseVariantJump, '전체 (All)', total, !activePoseVariant, () => {
          activePoseVariant = '';
          buildJumpBars();
          render();
        });
        variantOrder.forEach((k) => {
          const c = variantCounts.get(k) || 0;
          mk(dom.poseVariantJump, poseVariantLabel(k), c, activePoseVariant === k, () => {
            activePoseVariant = (activePoseVariant === k) ? '' : k;
            buildJumpBars();
            render();
          });
        });
      }
      return;
    }

    if (directoryMode === 'palette') {
      if (dom.enJump) dom.enJump.hidden = true;
      if (dom.enJump) dom.enJump.innerHTML = '';
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = false;
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = false;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.innerHTML = '';
      if (dom.palettePresetJump) dom.palettePresetJump.innerHTML = '';

      const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
      const total = base.length;

      const catCounts = new Map();
      const presetCounts = new Map();
      const presetLabels = new Map(); // presetKey -> label

      base.forEach((s) => {
        const cat = paletteCategoryKey(s);
        if (cat) catCounts.set(cat, (catCounts.get(cat) || 0) + 1);
      });

      const presetBase = activePaletteCategory
        ? base.filter((s) => paletteCategoryKey(s) === activePaletteCategory)
        : base;
      presetBase.forEach((s) => {
        const pre = palettePresetKey(s);
        if (!pre) return;
        presetCounts.set(pre, (presetCounts.get(pre) || 0) + 1);
        if (!presetLabels.has(pre)) presetLabels.set(pre, palettePresetLabel(s));
      });

      const mk = (rowEl, labelText, count, isActive, onClick) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `jump ${isActive ? 'active' : ''}`.trim();
        const label = document.createElement('span');
        label.className = 'jump-label';
        label.textContent = labelText;
        const badge = document.createElement('span');
        badge.className = 'jump-count';
        badge.textContent = String(count);
        b.appendChild(label);
        b.appendChild(badge);
        if (count === 0) b.disabled = true;
        b.addEventListener('click', onClick);
        rowEl.appendChild(b);
      };

      if (dom.paletteCategoryJump) {
        mk(dom.paletteCategoryJump, '전체 (All)', total, !activePaletteCategory && !activePalettePreset, () => {
          activePaletteCategory = '';
          activePalettePreset = '';
          buildJumpBars();
          render();
        });
        PALETTE_CATEGORY_ORDER.forEach((meta) => {
          const c = catCounts.get(meta.key) || 0;
          mk(dom.paletteCategoryJump, meta.label, c, activePaletteCategory === meta.key, () => {
            activePaletteCategory = (activePaletteCategory === meta.key) ? '' : meta.key;
            activePalettePreset = '';
            buildJumpBars();
            render();
          });
        });
      }

      if (dom.palettePresetJump) {
        mk(dom.palettePresetJump, '전체 (All)', activePaletteCategory ? (catCounts.get(activePaletteCategory) || 0) : total, !activePalettePreset, () => {
          activePalettePreset = '';
          buildJumpBars();
          render();
        });
        [...presetCounts.keys()].sort().forEach((k) => {
          const c = presetCounts.get(k) || 0;
          const label = presetLabels.get(k) || k;
          mk(dom.palettePresetJump, label, c, activePalettePreset === k, () => {
            activePalettePreset = (activePalettePreset === k) ? '' : k;
            buildJumpBars();
            render();
          });
        });
      }
      return;
    }

    if (dom.enJump) dom.enJump.hidden = false;
    if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
    if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
    if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
    if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;

    const letters = ['All', ...'0123456789'.split(''), ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
    dom.enJump.innerHTML = '';

    const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
    const total = base.length;
    const digitCounts = new Map();
    const letterCounts = new Map();
    base.forEach((s) => {
      const firstKo = String(s.ko || '').trim().slice(0, 1);
      const firstEn = String(s.en || '').trim().slice(0, 1);
      const firstId = String(s.id || '').trim().slice(0, 1);
      const digitKeys = new Set();
      if (firstKo >= '0' && firstKo <= '9') digitKeys.add(firstKo);
      if (firstEn >= '0' && firstEn <= '9') digitKeys.add(firstEn);
      if (firstId >= '0' && firstId <= '9') digitKeys.add(firstId);
      digitKeys.forEach((d) => digitCounts.set(d, (digitCounts.get(d) || 0) + 1));

      const enInitial = String(firstEn || '').toUpperCase();
      if (enInitial >= 'A' && enInitial <= 'Z') letterCounts.set(enInitial, (letterCounts.get(enInitial) || 0) + 1);
    });

    letters.forEach((ch) => {
      const b = document.createElement('button');
      b.type = 'button';
      const isDigit = ch >= '0' && ch <= '9';
      const isActive = (ch === 'All' && !activeEnInitial && !activeDigitInitial) ||
        (isDigit && activeDigitInitial === ch) ||
        (!isDigit && ch !== 'All' && activeEnInitial === ch);
      b.className = `jump ${isActive ? 'active' : ''}`.trim();
      const count = ch === 'All' ? total : (isDigit ? (digitCounts.get(ch) || 0) : (letterCounts.get(ch) || 0));
      const label = document.createElement('span');
      label.className = 'jump-label';
      label.textContent = ch;
      const badge = document.createElement('span');
      badge.className = 'jump-count';
      badge.textContent = String(count);
      b.appendChild(label);
      b.appendChild(badge);
      if (ch !== 'All' && count === 0) b.disabled = true;
      b.setAttribute('aria-label', `${ch} (${count})`);
      b.addEventListener('click', () => {
        if (ch === 'All') {
          activeEnInitial = '';
          activeDigitInitial = '';
        } else if (isDigit) {
          activeDigitInitial = ch;
          activeEnInitial = '';
        } else {
          activeDigitInitial = '';
          activeEnInitial = ch;
        }
        buildJumpBars();
        render();
      });
      dom.enJump.appendChild(b);
    });
  }

  function clearAllFilters() {
    query = '';
    activeTag = '';
    activeEnInitial = '';
    activeDigitInitial = '';
    activePoseType = '';
    activePoseVariant = '';
    activePaletteCategory = '';
    activePalettePreset = '';
    clearShuffle({ persist: true });
    if (dom.search) dom.search.value = '';
    buildJumpBars();
    render();
  }

  function resetFiltersNoRender() {
    query = '';
    activeTag = '';
    if (dom.search) dom.search.value = '';
  }

  function resetFiltersNoRenderKeepInitials() {
    const keepEn = activeEnInitial;
    const keepDigit = activeDigitInitial;
    resetFiltersNoRender();
    activeEnInitial = keepEn;
    activeDigitInitial = keepDigit;
  }

  function loadShuffleState() {
    try {
      const raw = localStorage.getItem(SHUFFLE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.directory !== 'string' || !Array.isArray(parsed.order)) return null;
      return { directory: parsed.directory, order: parsed.order.map(String).filter(Boolean) };
    } catch {
      return null;
    }
  }

  function saveShuffleState() {
    try {
      if (!shuffleState) {
        localStorage.removeItem(SHUFFLE_KEY);
        return;
      }
      localStorage.setItem(SHUFFLE_KEY, JSON.stringify(shuffleState));
    } catch {
      /* ignore */
    }
  }

  function updateShuffleButtons() {
    if (dom.randomClearBtn) dom.randomClearBtn.hidden = !shuffleState;
    if (dom.random200Btn) dom.random200Btn.textContent = shuffleState ? '카드 다시 섞기' : '카드섞기';
  }

  function clearShuffle({ persist = true } = {}) {
    if (!shuffleState) {
      updateShuffleButtons();
      return;
    }
    shuffleState = null;
    if (persist) saveShuffleState();
    updateShuffleButtons();
  }

  function shuffledIds(ids) {
    const out = [...ids];
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function makeShuffle() {
    if (!STYLES.length) loadStyles();
    const ids = STYLES.map((s) => s && s.id).filter(Boolean);
    shuffleState = { directory: directoryMode, order: shuffledIds(ids) };
    saveShuffleState();
    updateShuffleButtons();
    render();
    try { dom.grid?.scrollIntoView({ block: 'start' }); } catch { /* ignore */ }
  }

  function renderActiveChips() {
    if (!dom.activeChips) return;
    dom.activeChips.innerHTML = '';

    const add = (label, onClick, cls = '') => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `active-chip ${cls}`.trim();
      b.textContent = label;
      b.addEventListener('click', onClick);
      dom.activeChips.appendChild(b);
    };

    if (query) add(`검색: ${query}`, () => { query = ''; dom.search.value = ''; render(); });
    if (directoryMode === 'pose') {
      if (activePoseType) add(`동작: ${poseTypeLabel(activePoseType)}`, () => { activePoseType = ''; buildJumpBars(); render(); });
      if (activePoseVariant) add(`각도: ${poseVariantLabel(activePoseVariant)}`, () => { activePoseVariant = ''; buildJumpBars(); render(); });
    } else if (directoryMode === 'palette') {
      if (activePaletteCategory) add(`분류: ${paletteCategoryLabel(activePaletteCategory)}`, () => { activePaletteCategory = ''; activePalettePreset = ''; buildJumpBars(); render(); });
      if (activePalettePreset) {
        const example = STYLES.find((s) =>
          palettePresetKey(s) === activePalettePreset &&
          (!activePaletteCategory || paletteCategoryKey(s) === activePaletteCategory)
        );
        const label = example ? palettePresetLabel(example) : activePalettePreset;
        add(`세부: ${label}`, () => { activePalettePreset = ''; buildJumpBars(); render(); });
      }
    } else {
      if (activeDigitInitial) add(`숫자: ${activeDigitInitial}`, () => { activeDigitInitial = ''; buildJumpBars(); render(); });
      if (activeEnInitial) add(`A-Z: ${activeEnInitial}`, () => { activeEnInitial = ''; buildJumpBars(); render(); });
    }
    if (activeTag) add(`#${activeTag}`, () => { activeTag = ''; render(); });
    if (shuffleState && shuffleState.directory === directoryMode) add('카드섞기', () => { clearShuffle({ persist: true }); render(); });

    const hasAny = (directoryMode === 'pose')
      ? Boolean(query || activeTag || activePoseType || activePoseVariant)
      : (directoryMode === 'palette')
        ? Boolean(query || activeTag || activePaletteCategory || activePalettePreset)
      : Boolean(query || activeTag || activeEnInitial || activeDigitInitial);
    if (hasAny) add('모두 초기화', clearAllFilters, 'danger');
  }

  function render() {
    buildJumpBars();
    if (!STYLES.length) {
      loadStyles();
    }
    if (!STYLES.length) {
      dom.count.textContent = '데이터가 없습니다. `styles-data.js`가 로드되지 않았을 수 있어요.';
      dom.activeTag.textContent = '';
      dom.grid.innerHTML = '<div class="empty-state">`styles-data.js` 로드 실패 또는 데이터 0개입니다. 브라우저 콘솔(F12)에서 네트워크/에러를 확인해주세요.</div>';
      updateStyleGuideStep();
      return;
    }
    let items = STYLES
      .filter((s) => matchesScope(s, query))
      .filter(matchesInitials)
      .filter(matchesPoseQuickFilters)
      .filter(matchesPaletteQuickFilters)
      .filter(matchesTag);
    if (shuffleState && shuffleState.directory === directoryMode && Array.isArray(shuffleState.order) && shuffleState.order.length) {
      const rank = new Map(shuffleState.order.map((id, idx) => [id, idx]));
      items.sort((a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9));
    } else {
      items = sortItems(items);
    }
    dom.count.textContent = `결과: ${items.length}개${shuffleState && shuffleState.directory === directoryMode ? ' · 카드섞기' : ''}`;
    dom.activeTag.textContent = activeTag ? `태그: ${activeTag}` : '';
    renderActiveChips();
    dom.grid.innerHTML = '';

    if (!items.length) {
      const wrapper = document.createElement('div');
      wrapper.className = 'empty-state';
      wrapper.textContent = '조건에 맞는 스타일이 없습니다. 필터를 초기화하거나 검색어를 바꿔보세요.';

      const reset = document.createElement('button');
      reset.type = 'button';
      reset.className = 'pill';
      reset.style.marginTop = '10px';
      reset.textContent = '모두 초기화';
      reset.addEventListener('click', clearAllFilters);

      wrapper.appendChild(document.createElement('br'));
      wrapper.appendChild(reset);
      dom.grid.appendChild(wrapper);
      updateStyleGuideStep();
      return;
    }

    items.forEach((style) => {
      const card = document.createElement('div');
      card.className = `style-card ${selectedStyleId === style.id ? 'selected' : ''}`.trim();
      card.dataset.id = style.id;
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
      card.title = `${style.ko} / ${style.en}`;
      card.addEventListener('click', () => selectStyle(style));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectStyle(style);
        }
      });

      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = `${style.ko} 썸네일`;
      applyThumb(img, style);

      const overlay = document.createElement('div');
      overlay.className = 'style-overlay';

      const top = document.createElement('div');
      top.className = 'style-top';

      const title = document.createElement('div');
      title.className = 'style-title';
      title.textContent = style.ko;
      title.style.fontSize = `${fontSizeFor(style.ko, 18, 13, 10)}px`;

      const subtitle = document.createElement('div');
      subtitle.className = 'style-subtitle';
      subtitle.textContent = `${style.en}`;
      subtitle.style.fontSize = `${fontSizeFor(style.en, 14, 11, 18)}px`;

      top.appendChild(title);
      top.appendChild(subtitle);

      const copyPrompt = document.createElement('button');
      copyPrompt.type = 'button';
      copyPrompt.className = 'prompt-copy-icon';
      copyPrompt.setAttribute('aria-label', '샘플 이미지 프롬프트 복사');
      copyPrompt.title = '샘플 이미지 프롬프트 복사';
      copyPrompt.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M8 7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="2"/>
  <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
</svg>`;
      copyPrompt.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const prompt = sampleImagePrompt(style);
        const ok = await writeClipboard(prompt);
        if (ok) {
          showPopup({
            title: '복사 완료!',
            desc: '이미지 생성툴에 붙여넣기 → 생성'
          });
        }
      });

      const tags = document.createElement('div');
      tags.className = 'style-tags';
      (style.tags || []).slice(0, 3).forEach((t) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `tag ${activeTag === t ? 'active' : ''}`.trim();
        b.textContent = `#${t}`;
        b.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          activeTag = activeTag === t ? '' : t;
          render();
        });
        tags.appendChild(b);
      });

      overlay.appendChild(copyPrompt);
      overlay.appendChild(top);
      overlay.appendChild(tags);

      card.appendChild(img);
      card.appendChild(overlay);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });

      dom.grid.appendChild(card);
    });

    updateStyleGuideStep();
  }

  function init() {
    try {
      applyTheme(getPreferredTheme());
      applyDirectory(getPreferredDirectory());
      applySite(getPreferredSite());
      loadStyles();
      buildJumpBars();
      shuffleState = loadShuffleState();
      if (shuffleState && shuffleState.directory !== directoryMode) shuffleState = null;
      updateShuffleButtons();
      renderPromptPresetChips();
      render();
    } catch (err) {
      console.error(err);
      if (dom.count) dom.count.textContent = '스크립트 오류로 카드 렌더링에 실패했습니다.';
      if (dom.grid) dom.grid.innerHTML = '<div class="empty-state">`script.js` 실행 중 오류가 발생했습니다. 브라우저 콘솔(F12) 에러 로그를 확인해주세요.</div>';
      return;
    }

    dom.search.addEventListener('input', (e) => {
      query = e.target.value;
      render();
    });
    if (dom.clearSearch) {
      dom.clearSearch.addEventListener('click', () => {
        query = '';
        dom.search.value = '';
        render();
        dom.search.focus();
      });
    }

    if (dom.manualSearch) {
      dom.manualSearch.value = '';
      saveManualQuery('');
      saveManualBaseQuery('');
      dom.manualSearch.addEventListener('input', () => {
        const raw = String(dom.manualSearch.value || '');
        saveManualQuery(raw);
        saveManualBaseQuery(stripIntentTokens(raw));
        refreshManualHint();
        updateGuideStep();
      });
      dom.manualSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          openManualSearch();
        }
      });
    }
    if (dom.manualSearchBtn) dom.manualSearchBtn.addEventListener('click', () => openManualSearch());
    updateGuideStep();
    updateStyleGuideStep();
    if (dom.intentResetBtn) {
      dom.intentResetBtn.addEventListener('click', () => {
        selectedIntentKey = '';
        saveIntentKey('');
        const base = selectedCardQuery || getManualBaseFromUI();
        saveManualBaseQuery(base);
        const next = base;
        if (dom.manualSearch) {
          dom.manualSearch.value = next;
          dom.manualSearch.dispatchEvent(new Event('input', { bubbles: true }));
        }
        saveManualQuery(next);
        refreshManualHint();
        renderIntentChips();
        updateGuideStep();
      });
    }

    if (dom.random200Btn) dom.random200Btn.addEventListener('click', () => makeShuffle());
    if (dom.randomClearBtn) dom.randomClearBtn.addEventListener('click', () => {
      clearShuffle({ persist: true });
      render();
    });

    if (dom.popupClose) dom.popupClose.addEventListener('click', closePopup);
    if (dom.popup) {
      dom.popup.addEventListener('click', (e) => {
        const t = e.target;
        if (t && t.dataset && t.dataset.popupClose === 'true') closePopup();
      });
    }

    let panelCloseTimer = 0;
    const scheduleClose = () => {
      if (panelCloseTimer) clearTimeout(panelCloseTimer);
      panelCloseTimer = setTimeout(() => {
        if (panelPinned) return;
        const active = document.activeElement;
        const focusedInside = Boolean(controlsPanel && active && controlsPanel.contains(active));
        if (focusedInside) return;
        closePanel();
      }, 220);
    };
    const openPanelHover = () => {
      if (panelCloseTimer) clearTimeout(panelCloseTimer);
      openPanel({ pin: false });
    };
    const togglePanel = () => {
      const next = !document.body.classList.contains('panel-open');
      if (!next) closePanel();
      else openPanel({ pin: true });
    };

    if (panelHandle) {
      panelHandle.addEventListener('click', togglePanel);
      panelHandle.addEventListener('pointerenter', openPanelHover);
      panelHandle.addEventListener('pointerleave', scheduleClose);
    }
    if (controlsPanel) {
      controlsPanel.addEventListener('pointerenter', openPanelHover);
      controlsPanel.addEventListener('pointerleave', scheduleClose);
      controlsPanel.addEventListener('focusin', openPanelHover);
      controlsPanel.addEventListener('focusout', scheduleClose);
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('panel-open')) {
        closePanel();
      }
      if (e.key === 'Escape' && dom.popup && !dom.popup.hidden) {
        closePopup();
      }
    });
    const hideOnScroll = () => {
      if (!document.body.classList.contains('panel-open')) return;
      closePanel();
    };
    window.addEventListener('scroll', hideOnScroll, { passive: true });
    window.addEventListener('wheel', hideOnScroll, { passive: true });
    window.addEventListener('touchmove', hideOnScroll, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) closePanel();
    });
    closePanel();

    dom.sortKo.addEventListener('click', () => {
      sortMode = 'ko';
      dom.sortKo.classList.add('active');
      dom.sortEn.classList.remove('active');
      render();
    });
    dom.sortEn.addEventListener('click', () => {
      sortMode = 'en';
      dom.sortEn.classList.add('active');
      dom.sortKo.classList.remove('active');
      render();
    });

    if (dom.themeSelect) {
      dom.themeSelect.value = document.body.dataset.theme || 'dark';
      dom.themeSelect.addEventListener('change', (e) => {
        applyTheme(String(e.target.value || '').trim());
      });
    }
    if (dom.dirDesign) dom.dirDesign.addEventListener('click', () => {
      if (directoryMode === 'design') return;
      applyDirectory('design');
      resetFiltersNoRenderKeepInitials();
      loadStyles();
      buildJumpBars();
      render();
    });
    if (dom.dirCharacter) dom.dirCharacter.addEventListener('click', () => {
      if (directoryMode === 'character') return;
      applyDirectory('character');
      resetFiltersNoRenderKeepInitials();
      loadStyles();
      buildJumpBars();
      render();
    });
    if (dom.dirPhoto) dom.dirPhoto.addEventListener('click', () => {
      if (directoryMode === 'photo') return;
      applyDirectory('photo');
      resetFiltersNoRenderKeepInitials();
      loadStyles();
      buildJumpBars();
      render();
    });
    if (dom.dirPalette) dom.dirPalette.addEventListener('click', () => {
      if (directoryMode === 'palette') return;
      applyDirectory('palette');
      resetFiltersNoRenderKeepInitials();
      loadStyles();
      buildJumpBars();
      render();
    });
    if (dom.dirPose) dom.dirPose.addEventListener('click', () => {
      if (directoryMode === 'pose') return;
      applyDirectory('pose');
      resetFiltersNoRenderKeepInitials();
      loadStyles();
      buildJumpBars();
      render();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (query) {
          query = '';
          dom.search.value = '';
          render();
          return;
        }
      }
      if (e.key === '/') {
        if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
        e.preventDefault();
        dom.search.focus();
        return;
      }
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const key = String(e.key || '');

      if (directoryMode === 'pose') return;

      if (key.length === 1 && key >= '0' && key <= '9') {
        activeEnInitial = '';
        activeDigitInitial = key;
        buildJumpBars();
        render();
        return;
      }

      const upper = key.toUpperCase();
      if (upper.length === 1 && upper >= 'A' && upper <= 'Z') {
        activeDigitInitial = '';
        activeEnInitial = upper;
        buildJumpBars();
        render();
        return;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
