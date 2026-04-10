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

  const DIRECTORY_META = {
    all: { label: '통합', short: 'All' },
    design: { label: '디자인', short: 'Design' },
    character: { label: '캐릭터', short: 'Character' },
    photo: { label: '사진/라이팅', short: 'Photo' },
    artist: { label: '작가', short: 'Artist' },
    palette: { label: '컬러 팔레트', short: 'Palette' },
    pose: { label: '포즈/동작', short: 'Pose' }
  };
  const DIRECTORY_MODES = Object.keys(DIRECTORY_META);
  const DATA_DIRECTORY_MODES = DIRECTORY_MODES.filter((mode) => mode !== 'all');
  const core = globalThis.InspodexCore;

  if (!core) {
    throw new Error('InspodexCore failed to load.');
  }

  const dom = {
    grid: document.getElementById('styleGrid'),
    loadMore: document.getElementById('loadMore'),
    gridCount: document.getElementById('gridCount'),
    filterApplied: document.getElementById('filterApplied'),
    gridChipsHost: document.getElementById('gridChipsHost'),
    gridTools: document.getElementById('gridTools'),
    gridStatus: document.getElementById('gridStatus'),
    search: document.getElementById('styleSearch'),
    clearSearch: document.getElementById('clearSearch'),
    jumpResetBtn: document.getElementById('jumpResetBtn'),
    jumpExpandBtn: document.getElementById('jumpExpandBtn'),
    sortKo: document.getElementById('sortKo'),
    sortEn: document.getElementById('sortEn'),
    count: document.getElementById('resultCount'),
    activeTag: document.getElementById('activeTag'),
    activeChips: document.getElementById('activeChips'),
    poseTypeJump: document.getElementById('poseTypeJump'),
    poseVariantJump: document.getElementById('poseVariantJump'),
    paletteCategoryJump: document.getElementById('paletteCategoryJump'),
    palettePresetJump: document.getElementById('palettePresetJump'),
    characterFacetJump: document.getElementById('characterFacetJump'),
    unifiedTypeJump: document.getElementById('unifiedTypeJump'),
    unifiedMoodJump: document.getElementById('unifiedMoodJump'),
    unifiedUseJump: document.getElementById('unifiedUseJump'),
    unifiedEraJump: document.getElementById('unifiedEraJump'),
    enJump: document.getElementById('enJump'),
    themeSelect: document.getElementById('themeSelect'),
    dirAll: document.getElementById('dirAll'),
    dirDesign: document.getElementById('dirDesign'),
    dirCharacter: document.getElementById('dirCharacter'),
    dirPhoto: document.getElementById('dirPhoto'),
    dirArtist: document.getElementById('dirArtist'),
    dirPalette: document.getElementById('dirPalette'),
    dirPose: document.getElementById('dirPose'),
    directoryTitle: document.getElementById('directoryTitle'),
    directorySubtitle: document.getElementById('directorySubtitle'),
    siteSwitchbar: document.getElementById('siteSwitchbar'),
    advancedSearchToggle: document.getElementById('advancedSearchToggle'),
    advancedSearchBody: document.getElementById('advancedSearchBody'),
    poseLinks: document.getElementById('poseLinks'),
    paletteLinks: document.getElementById('paletteLinks'),
    photoLinks: document.getElementById('photoLinks'),
    characterLinks: document.getElementById('characterLinks'),
    artistLinks: document.getElementById('artistLinks'),
    manualSearch: document.getElementById('manualSearch'),
    manualSearchBtn: document.getElementById('manualSearchBtn'),
    manualHint: document.getElementById('manualHint'),
    manualSelected: document.getElementById('manualSelected'),
    random200Btn: document.getElementById('random200Btn'),
    randomClearBtn: document.getElementById('randomClearBtn'),
    intentChips: document.getElementById('intentChips'),
    intentTokenPreview: document.getElementById('intentTokenPreview'),
    intentResetBtn: document.getElementById('intentResetBtn'),
    promptPresetBlock: document.getElementById('promptPresetBlock'),
    promptPresetChips: document.getElementById('promptPresetChips'),
    promptPresetPreview: document.getElementById('promptPresetPreview'),
    toast: document.getElementById('toast'),
    popup: document.getElementById('popup'),
    popupTitle: document.getElementById('popupTitle'),
    popupDesc: document.getElementById('popupDesc'),
    popupClose: document.getElementById('popupClose'),
    detailPanel: document.getElementById('detailPanel'),
    detailClose: document.getElementById('detailClose'),
    detailThumb: document.getElementById('detailThumb'),
    detailType: document.getElementById('detailType'),
    detailTitle: document.getElementById('detailTitle'),
    detailSubtitle: document.getElementById('detailSubtitle'),
    detailSummary: document.getElementById('detailSummary'),
    detailSignals: document.getElementById('detailSignals'),
    detailUseCases: document.getElementById('detailUseCases'),
    detailKeywords: document.getElementById('detailKeywords'),
    detailFacts: document.getElementById('detailFacts'),
    detailTags: document.getElementById('detailTags'),
    detailPaletteBlock: document.getElementById('detailPaletteBlock'),
    detailPalette: document.getElementById('detailPalette'),
    detailFiguresBlock: document.getElementById('detailFiguresBlock'),
    detailFigures: document.getElementById('detailFigures'),
    detailQueryLabel: document.getElementById('detailQueryLabel'),
    detailQueryText: document.getElementById('detailQueryText'),
    detailQueryCopy: document.getElementById('detailQueryCopy'),
    detailPromptText: document.getElementById('detailPromptText'),
    detailPromptCopy: document.getElementById('detailPromptCopy'),
    detailActions: document.getElementById('detailActions'),
    detailSameTypeBlock: document.getElementById('detailSameTypeBlock'),
    detailSameType: document.getElementById('detailSameType'),
    detailCrossTypeBlock: document.getElementById('detailCrossTypeBlock'),
    detailCrossType: document.getElementById('detailCrossType')
  };

  const controlsPanel = document.querySelector('.panel.controls');
  const panelHandle = document.getElementById('panelHandle');
  let panelPinned = true;
  let siteTouched = false;
  let jumpbarExpanded = false;
  let advancedSearchOpen = false;
  let detailQuerySeedMode = 'quick';
  let detailExpansionKey = '';
  let detailSearchDraft = '';
  let activeBindMenuStyleId = '';
  let detailSearchStyleId = '';
  let detailSiteKey = '';

  function activeFacetKeyForMode(mode = directoryMode) {
    if (mode === 'character') return activeCharacterFacet;
    if (mode === 'design') return activeDesignFacet;
    if (mode === 'photo') return activePhotoFacet;
    if (mode === 'artist') return activeArtistFacet;
    return '';
  }

  function hasSingleFacetFilter(mode = directoryMode) {
    return Boolean(activeFacetKeyForMode(mode));
  }

  function enhanceSidebarUi() {
    const jumpActions = dom.jumpResetBtn?.parentElement;
    if (jumpActions && !dom.jumpExpandBtn) {
      const button = document.createElement('button');
      button.id = 'jumpExpandBtn';
      button.type = 'button';
      button.className = 'pill subtle-toggle jump-expand';
      button.hidden = true;
      button.textContent = '필터 더보기';
      jumpActions.insertBefore(button, dom.jumpResetBtn);
      dom.jumpExpandBtn = button;
    }

    const externalSection = dom.siteSwitchbar?.closest('.search-block');
    const head = externalSection?.querySelector('.search-block-head');
    if (head && !dom.advancedSearchToggle) {
      const button = document.createElement('button');
      button.id = 'advancedSearchToggle';
      button.type = 'button';
      button.className = 'pill subtle-toggle';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', 'advancedSearchBody');
      button.textContent = '고급 검색 열기';
      head.appendChild(button);
      dom.advancedSearchToggle = button;
    }

    if (externalSection && head && !dom.advancedSearchBody) {
      const body = document.createElement('div');
      body.id = 'advancedSearchBody';
      body.className = 'advanced-search-body';
      body.hidden = true;
      let node = head.nextSibling;
      while (node) {
        const next = node.nextSibling;
        body.appendChild(node);
        node = next;
      }
      externalSection.appendChild(body);
      dom.advancedSearchBody = body;
    }

    const siteHost = document.getElementById('siteSwitchbar');
    if (siteHost && siteHost.tagName !== 'SELECT') {
      const wrap = document.createElement('label');
      wrap.className = 'site-select-wrap';
      wrap.dataset.guide = 'site';

      const label = document.createElement('span');
      label.className = 'site-select-label';
      label.textContent = '검색 사이트';

      const select = document.createElement('select');
      select.id = 'siteSwitchbar';
      select.className = 'site-select';
      select.setAttribute('aria-label', 'Search sites');

      wrap.appendChild(label);
      wrap.appendChild(select);
      siteHost.replaceWith(wrap);
      dom.siteSwitchbar = select;
    }

    if (dom.sortKo) dom.sortKo.textContent = '추천순';
    if (dom.sortEn) dom.sortEn.textContent = 'A-Z';
    if (externalSection) externalSection.hidden = true;
  }

  enhanceSidebarUi();

  function createHelpIcon(text) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'help-icon';
    button.textContent = '?';
    button.dataset.tooltip = String(text || '').trim();
    button.setAttribute('aria-label', String(text || '').trim() || '도움말');
    return button;
  }

  function appendHelpIcon(host, text) {
    if (!host || host.querySelector('.help-icon')) return;
    const icon = createHelpIcon(text);
    host.appendChild(icon);
  }

  function createHelpIcon(text) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'help-icon';
    button.textContent = '?';
    button.dataset.tooltip = String(text || '').trim();
    button.setAttribute('aria-label', String(text || '').trim() || '\uC124\uBA85 \uBCF4\uAE30');
    return button;
  }

  function installGlobalHelpHints() {
    const blockTitles = Array.from(document.querySelectorAll('.panel.controls .search-block-title'));
    if (blockTitles[0]) appendHelpIcon(blockTitles[0], '디렉터리를 고르고 필터를 좁히면 현재 카테고리 안에서 원하는 카드만 빠르게 찾을 수 있어요.');
    if (blockTitles[1]) appendHelpIcon(blockTitles[1], '카드를 고른 뒤에는 카드 뒷면에서 사이트를 바꾸고 검색어를 확장하거나 직접 수정할 수 있어요.');
    if (dom.directoryTitle) appendHelpIcon(dom.directoryTitle, '현재 보고 있는 디렉터리예요. 카드 번호, 태그, 검색어, 프롬프트를 묶어서 탐색할 수 있어요.');
  }

  installGlobalHelpHints();

  function repairGlobalHelpHints() {
    [
      ['.panel.controls .search-block-title', 0, '\uB514\uB809\uD130\uB9AC\uB97C \uACE0\uB974\uACE0 \uD544\uD130\uB97C \uC801\uC6A9\uD558\uBA74 \uD604\uC7AC \uCE74\uD14C\uACE0\uB9AC \uC548\uC5D0\uC11C \uCE74\uB4DC\uB97C \uBE60\uB974\uAC8C \uCC3E\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.'],
      ['.panel.controls .search-block-title', 1, '\uCE74\uB4DC\uB97C \uC120\uD0DD\uD55C \uB4A4 \uCE74\uB4DC \uB4B7\uBA74\uC5D0\uC11C \uC9C0\uC6D0 \uC0AC\uC774\uD2B8, \uD655\uC7A5 \uD0A4\uC6CC\uB4DC, \uAC80\uC0C9\uC5B4\uB97C \uC870\uD569\uD574 \uB808\uD37C\uB7F0\uC2A4\uB97C \uCC3E\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.'],
      ['#directoryTitle', 0, '\uCE74\uB4DC \uBC88\uD638, \uD0DC\uADF8, \uAC80\uC0C9\uC5B4, \uD504\uB86C\uD504\uD2B8\uB97C \uD568\uAED8 \uBCF4\uBA74 \uC2A4\uD0C0\uC77C \uCC38\uACE0\uC640 \uC2DC\uC548 \uC2E4\uD5D8\uC744 \uD55C \uBC88\uC5D0 \uC9C4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.']
    ].forEach(([selector, index, text]) => {
      const nodes = Array.from(document.querySelectorAll(selector));
      const host = nodes[index];
      const icon = host?.querySelector?.('.help-icon');
      if (!icon) return;
      icon.dataset.tooltip = text;
      icon.setAttribute('aria-label', text);
    });
  }

  repairGlobalHelpHints();

  function installHelpInteractions() {
    if (document.body.dataset.helpHintsBound) return;
    document.body.dataset.helpHintsBound = 'true';

    document.addEventListener('click', (event) => {
      const icon = event.target instanceof Element ? event.target.closest('.help-icon') : null;
      document.querySelectorAll('.help-icon.is-open').forEach((node) => {
        if (node !== icon) node.classList.remove('is-open');
      });
      if (!icon) return;
      event.preventDefault();
      event.stopPropagation();
      icon.classList.toggle('is-open');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.help-icon.is-open').forEach((node) => node.classList.remove('is-open'));
    });
  }

  installHelpInteractions();

  function enhanceDetailWorkbench() {
    const section = dom.detailActions?.closest('.detail-section');
    if (!section) return;
    section.innerHTML = `
      <div class="detail-section-title">Search & Create</div>
      <div class="detail-stack-section">
        <div class="detail-subsection-title">검색 전략</div>
        <div class="detail-action-fields">
          <article class="detail-copy-card">
            <div class="detail-copy-head">
              <div id="detailQuickQueryLabel" class="detail-copy-title">빠른 검색어</div>
              <div class="detail-copy-inline">
                <button id="detailQuickQueryOpen" type="button" class="detail-copy-btn">열기</button>
                <button id="detailQuickQueryCopy" type="button" class="detail-copy-btn">복사</button>
              </div>
            </div>
            <div id="detailQuickQueryText" class="detail-copy-text" aria-label="Broad search query"></div>
          </article>
          <article class="detail-copy-card">
            <div class="detail-copy-head">
              <div id="detailPreciseQueryLabel" class="detail-copy-title">정밀 검색어</div>
              <div class="detail-copy-inline">
                <button id="detailPreciseQueryOpen" type="button" class="detail-copy-btn">열기</button>
                <button id="detailPreciseQueryCopy" type="button" class="detail-copy-btn">복사</button>
              </div>
            </div>
            <div id="detailPreciseQueryText" class="detail-copy-text" aria-label="Precise search query"></div>
          </article>
        </div>
        <article class="detail-copy-card detail-search-workbench">
          <div class="detail-copy-head">
            <div class="detail-copy-title">상세 검색 도구</div>
            <button id="detailSearchReset" type="button" class="detail-copy-btn">정밀 기준으로 초기화</button>
          </div>
          <div id="detailIntentChips" class="chip-row" role="group" aria-label="Search expansion chips"></div>
          <div id="detailIntentPreview" class="chip-preview" hidden></div>
          <div class="detail-search-toolbar">
            <label class="detail-field">
              <span class="detail-field-label">검색 사이트</span>
              <select id="detailSiteSelect" class="site-select" aria-label="Detail search site"></select>
            </label>
            <div class="detail-inline-actions">
              <button id="detailUseQuickQuery" type="button" class="detail-copy-btn">빠른 검색어 불러오기</button>
              <button id="detailUsePreciseQuery" type="button" class="detail-copy-btn">정밀 검색어 불러오기</button>
            </div>
          </div>
          <label class="detail-field">
            <span class="detail-field-label">검색어 직접 수정</span>
            <div class="manual-search-row detail-search-row">
              <input id="detailSearchInput" class="manual-search-input" autocomplete="off" />
              <button id="detailSearchBtn" type="button" class="manual-search-btn">검색</button>
            </div>
          </label>
        </article>
      </div>
      <div class="detail-stack-section">
        <div class="detail-subsection-title">생성 실험</div>
        <div class="detail-prompt-grid">
          <article class="detail-copy-card">
            <div class="detail-copy-head">
              <div class="detail-copy-title">생성 프롬프트</div>
              <button id="detailGeneratePromptCopy" type="button" class="detail-copy-btn">복사</button>
            </div>
            <div id="detailGeneratePromptText" class="detail-copy-text detail-copy-text-prompt" aria-label="Generate prompt"></div>
          </article>
          <article class="detail-copy-card">
            <div class="detail-copy-head">
              <div class="detail-copy-title">변환 프롬프트</div>
              <button id="detailTransformPromptCopy" type="button" class="detail-copy-btn">복사</button>
            </div>
            <div id="detailTransformPromptText" class="detail-copy-text detail-copy-text-prompt" aria-label="Transform prompt"></div>
          </article>
          <article class="detail-copy-card">
            <div class="detail-copy-head">
              <div class="detail-copy-title">확장 프롬프트</div>
              <button id="detailExpandPromptCopy" type="button" class="detail-copy-btn">복사</button>
            </div>
            <div id="detailExpandPromptText" class="detail-copy-text detail-copy-text-prompt" aria-label="Expansion prompt"></div>
          </article>
        </div>
      </div>
      <div class="detail-stack-section">
        <div class="detail-subsection-title">작업 액션</div>
        <div id="detailActions" class="detail-actions" aria-label="Detail actions"></div>
      </div>
    `;

    dom.detailQuickQueryLabel = document.getElementById('detailQuickQueryLabel');
    dom.detailQuickQueryText = document.getElementById('detailQuickQueryText');
    dom.detailQuickQueryCopy = document.getElementById('detailQuickQueryCopy');
    dom.detailQuickQueryOpen = document.getElementById('detailQuickQueryOpen');
    dom.detailPreciseQueryLabel = document.getElementById('detailPreciseQueryLabel');
    dom.detailPreciseQueryText = document.getElementById('detailPreciseQueryText');
    dom.detailPreciseQueryCopy = document.getElementById('detailPreciseQueryCopy');
    dom.detailPreciseQueryOpen = document.getElementById('detailPreciseQueryOpen');
    dom.detailIntentChips = document.getElementById('detailIntentChips');
    dom.detailIntentPreview = document.getElementById('detailIntentPreview');
    dom.detailSiteSelect = document.getElementById('detailSiteSelect');
    dom.detailSearchInput = document.getElementById('detailSearchInput');
    dom.detailSearchBtn = document.getElementById('detailSearchBtn');
    dom.detailSearchReset = document.getElementById('detailSearchReset');
    dom.detailUseQuickQuery = document.getElementById('detailUseQuickQuery');
    dom.detailUsePreciseQuery = document.getElementById('detailUsePreciseQuery');
    dom.detailGeneratePromptText = document.getElementById('detailGeneratePromptText');
    dom.detailGeneratePromptCopy = document.getElementById('detailGeneratePromptCopy');
    dom.detailTransformPromptText = document.getElementById('detailTransformPromptText');
    dom.detailTransformPromptCopy = document.getElementById('detailTransformPromptCopy');
    dom.detailExpandPromptText = document.getElementById('detailExpandPromptText');
    dom.detailExpandPromptCopy = document.getElementById('detailExpandPromptCopy');
    dom.detailActions = document.getElementById('detailActions');
  }

  enhanceDetailWorkbench();

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
        const n = Number(el.dataset.step);
        el.classList.toggle('active', n === s);
        el.classList.toggle('done', n < s);
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
        const n = Number(el.dataset.step);
        el.classList.toggle('active', n === s);
        el.classList.toggle('done', n < s);
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
    const shuffled = Boolean(shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature());
    const hasFilters = (directoryMode === 'all')
      ? Boolean(hasQuery || activeTag || activeUnifiedType || activeUnifiedMood || activeUnifiedUse || activeUnifiedEra || shuffled)
      : (directoryMode === 'pose')
      ? Boolean(hasQuery || activeTag || activePoseType || shuffled)
      : (directoryMode === 'palette')
        ? Boolean(hasQuery || activeTag || activePaletteCategory || shuffled)
        : (directoryMode === 'character' || directoryMode === 'design' || directoryMode === 'photo' || directoryMode === 'artist')
          ? Boolean(hasQuery || activeTag || hasSingleFacetFilter() || shuffled)
        : Boolean(hasQuery || activeTag || activeEnInitial || activeDigitInitial || shuffled);

    if (selectedStyleId) return setStyleGuideStep(3);
    if (hasFilters) return setStyleGuideStep(2);
    return setStyleGuideStep(1);
  }

  function setPanelOpen(open, { pin = false } = {}) {
    const next = Boolean(open);
    panelPinned = true;
    document.body.classList.add('panel-open');
    if (panelHandle) {
      panelHandle.setAttribute('aria-expanded', next ? 'true' : 'false');
      panelHandle.setAttribute('aria-label', next ? '검색 패널 닫기' : '검색 패널 열기');
      panelHandle.textContent = next ? '검색 패널 닫기' : '검색 패널 열기';
    }
  }

  function openPanel({ pin = false } = {}) {
    setPanelOpen(true, { pin });
  }

  function closePanel() {
    setPanelOpen(true, { pin: true });
  }

  function setAdvancedSearchOpen(open) {
    advancedSearchOpen = Boolean(open);
    if (dom.advancedSearchBody) dom.advancedSearchBody.hidden = !advancedSearchOpen;
    if (dom.advancedSearchToggle) {
      dom.advancedSearchToggle.setAttribute('aria-expanded', advancedSearchOpen ? 'true' : 'false');
      dom.advancedSearchToggle.textContent = advancedSearchOpen ? '고급 검색 닫기' : '고급 검색 열기';
    }
  }

  function jumpRows() {
    return [
      dom.unifiedTypeJump,
      dom.unifiedMoodJump,
      dom.unifiedUseJump,
      dom.unifiedEraJump,
      dom.poseTypeJump,
      dom.poseVariantJump,
      dom.paletteCategoryJump,
      dom.palettePresetJump,
      dom.characterFacetJump
    ].filter(Boolean);
  }

  function syncJumpbarVisibility() {
    const rows = jumpRows();
    rows.forEach((row) => row.classList.remove('jump-hidden', 'jump-collapsed'));
    if (!dom.jumpExpandBtn) return;

    const visibleRows = rows.filter((row) => !row.hidden && row.childElementCount > 0);
    const first = visibleRows[0] || null;
    const firstTall = Boolean(first && first.scrollHeight > 42);
    const needsCollapse = visibleRows.length > 1 || firstTall;

    if (!needsCollapse) {
      jumpbarExpanded = false;
      dom.jumpExpandBtn.hidden = true;
      dom.jumpExpandBtn.textContent = '필터 더보기';
      return;
    }

    dom.jumpExpandBtn.hidden = false;
    dom.jumpExpandBtn.textContent = jumpbarExpanded ? '필터 접기' : '필터 더보기';
    if (jumpbarExpanded) return;

    visibleRows.forEach((row, index) => {
      if (index === 0) row.classList.add('jump-collapsed');
      else row.classList.add('jump-hidden');
    });
  }

  let sortMode = 'recommended';
  let query = '';
  let activeTag = '';
  let activeEnInitial = '';
  let activeDigitInitial = '';
  let activePoseType = '';
  let activePoseVariant = '';
  let activePaletteCategory = '';
  let activePalettePreset = '';
  let activeCharacterFacet = '';
  let activeDesignFacet = '';
  let activePhotoFacet = '';
  let activeArtistFacet = '';
  let activeUnifiedType = '';
  let activeUnifiedMood = '';
  let activeUnifiedUse = '';
  let activeUnifiedEra = '';
  let palettePresetExpanded = false;
  let directoryMode = 'design';
  let activeSiteKey = 'pinterest';
  let selectedStyleId = '';
  let detailStyleId = '';
  let shuffleState = null; // { directory: string, order: string[] }
  let selectedIntentKey = '';
  let selectedCardQuery = '';
  let allReferencesCache = null;
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
      if (q === 'all' || q === 'unified' || q === 'database') return 'all';
      if (q === 'artist' || q === 'artists' || q === 'author' || q === 'creator') return 'artist';
      if (q === 'character' || q === 'char') return 'character';
      if (q === 'photo' || q === 'photography' || q === 'lighting') return 'photo';
      if (q === 'palette' || q === 'palettes' || q === 'color') return 'palette';
      if (q === 'pose' || q === 'poses' || q === 'motion') return 'pose';
      if (q === 'design') return 'design';
    } catch { /* ignore */ }
    const saved = localStorage.getItem(DIRECTORY_KEY);
    if (saved === 'all' || saved === 'artist' || saved === 'character' || saved === 'photo' || saved === 'palette' || saved === 'pose') return saved;
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
    return core.tokenize(v);
  }
  function joinTokens(tokens) {
    return core.joinTokens(tokens);
  }

  function uniqueText(list) {
    return core.uniqueText(list);
  }

  function prettifyToken(value) {
    return core.prettifyToken(value);
  }

  function directoryLabel(mode) {
    return DIRECTORY_META[String(mode || '').trim()]?.label || '레퍼런스';
  }

  function directoryShortLabel(mode) {
    return DIRECTORY_META[String(mode || '').trim()]?.short || 'Reference';
  }

  function directorySeriesCode(mode) {
    const codeMap = {
      design: 'DS',
      character: 'CH',
      photo: 'PH',
      artist: 'AR',
      palette: 'PL',
      pose: 'PS'
    };
    return codeMap[String(mode || '').trim()] || 'RF';
  }

  function directorySeriesLabel(mode) {
    const short = directoryShortLabel(mode);
    if (short === 'All') return 'Reference Series';
    return `${short} Series`;
  }

  function cardNumberFor(mode, seriesIndex = 0) {
    const index = Math.max(0, Number(seriesIndex) || 0);
    return `${directorySeriesCode(mode)}-${String(index + 1).padStart(3, '0')}`;
  }

  function rarityForIndex(seriesIndex = 0, total = 0) {
    const count = Math.max(1, Number(total) || 0);
    const index = Math.max(0, Number(seriesIndex) || 0);
    const iconicCutoff = Math.max(6, Math.min(18, Math.ceil(count * 0.08)));
    const signatureCutoff = Math.max(
      iconicCutoff + Math.max(10, Math.ceil(count * 0.18)),
      Math.min(64, Math.ceil(count * 0.32))
    );
    if (index < iconicCutoff) return 'Iconic';
    if (index < signatureCutoff) return 'Signature';
    return 'Core';
  }

  function directorySubtitleText(mode = directoryMode) {
    if (mode === 'all') return '전체 레퍼런스를 한 번에 검색하고, 타입/무드/용도/시대 facet으로 좁혀보세요.';
    if (mode === 'artist') return '영화, 사진, 일러스트, 애니메이션, 회화 작가의 시각 언어를 이름 기준으로 찾고 확장 검색하세요.';
    if (mode === 'photo') return '사진 장르와 라이팅 레퍼런스를 고르고, 선택한 키워드로 외부 사이트에서 바로 확장 검색하세요.';
    if (mode === 'palette') return '팔레트를 고르고, 색 조합과 활용 예시를 외부 사이트에서 바로 확장 검색하세요.';
    if (mode === 'pose') return '동작과 각도 레퍼런스를 고르고, 선택한 키워드로 외부 사이트에서 바로 확장 검색하세요.';
    if (mode === 'character') return '캐릭터 스타일을 고르고, 표현 방식과 시각 언어를 외부 사이트에서 바로 확장 검색하세요.';
    return '스타일을 고르고(필터), 선택한 키워드로 외부 사이트에서 바로 확장 검색하세요.';
  }

  function sourceDataForDirectory(mode) {
    if (mode === 'all') return [];
    if (mode === 'artist') return Array.isArray(window.ARTIST_STYLES_DATA) ? window.ARTIST_STYLES_DATA : [];
    if (mode === 'character') return Array.isArray(window.CHAR_STYLES_DATA) ? window.CHAR_STYLES_DATA : [];
    if (mode === 'photo') return Array.isArray(window.PHOTO_STYLES_DATA) ? window.PHOTO_STYLES_DATA : [];
    if (mode === 'palette') return Array.isArray(window.PALETTES_DATA) ? window.PALETTES_DATA : [];
    if (mode === 'pose') return Array.isArray(window.POSES_DATA) ? window.POSES_DATA : [];
    return Array.isArray(window.STYLES_DATA) ? window.STYLES_DATA : [];
  }

  function styleTypeKey(style) {
    return String(style?.type || '').trim() || 'design';
  }

  function styleTypeLabel(style) {
    return directoryLabel(styleTypeKey(style));
  }

  function unifiedFacetValue(style, facet) {
    if (facet === 'type') return styleTypeKey(style);
    if (facet === 'mood') return String((style?.moods || [])[0] || '').trim();
    if (facet === 'use') return String((style?.useCases || [])[0] || '').trim();
    if (facet === 'era') return String((style?.eras || [])[0] || '').trim();
    return '';
  }

  function unifiedFacetLabel(facet, value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (facet === 'type') return directoryLabel(raw);
    return raw;
  }

  function siteBoostTokens(siteKey) {
    const mode = directoryMode;
    if (siteKey === 'pinterest') {
      if (mode === 'all') return 'reference inspo moodboard';
      if (mode === 'artist') return 'artist style reference';
      if (mode === 'design') return 'inspo moodboard';
      if (mode === 'character') return 'reference inspo';
      if (mode === 'photo') return 'photography';
      if (mode === 'palette') return 'palette';
      if (mode === 'pose') return 'reference';
    }
    if (siteKey === 'behance') return (mode === 'design' || mode === 'artist') ? 'case study project' : '';
    if (siteKey === 'artstation') return (mode === 'character' || mode === 'pose' || mode === 'artist') ? 'concept art style' : '';
    if (siteKey === 'dribbble') return mode === 'design' ? 'shot' : '';
    if (siteKey === 'youtube') return mode === 'photo' ? 'lighting setup diagram behind the scenes' : (mode === 'pose' ? 'tutorial reference' : (mode === 'artist' ? 'style analysis interview' : ''));
    if (siteKey === 'coolors' || siteKey === 'adobeColor') return mode === 'palette' ? 'hex' : '';
    if (siteKey === 'sketchfab') return (mode === 'character') ? '3d model' : '';
    return '';
  }

  function sitesForDirectory(mode) {
    if (mode === 'all') return ['pinterest', 'googleImages', 'behance', 'artstation', 'dribbble', 'awwwards'];
    if (mode === 'artist') return ['pinterest', 'googleImages', 'behance', 'artstation'];
    if (mode === 'palette') return ['pinterest', 'googleImages', 'coolors', 'adobeColor'];
    if (mode === 'photo') return ['pinterest', 'googleImages', 'behance'];
    if (mode === 'character') return ['pinterest', 'googleImages', 'artstation', 'behance', 'sketchfab'];
    if (mode === 'pose') return ['pinterest', 'googleImages', 'lineOfAction', 'quickPoses', 'artstation'];
    return ['pinterest', 'googleImages', 'behance', 'dribbble', 'awwwards'];
  }

  function recommendedReferenceLinksForMode(mode) {
    if (mode === 'design') {
      return [
        { label: 'Mobbin', href: 'https://mobbin.com/' },
        { label: 'Siteinspire', href: 'https://www.siteinspire.com/' },
        { label: 'Land-book', href: 'https://land-book.com/' },
        { label: 'Godly', href: 'https://godly.website/' },
        { label: 'Httpster', href: 'https://httpster.net/' }
      ];
    }
    if (mode === 'photo') {
      return [
        { label: 'Unsplash', href: 'https://unsplash.com/' },
        { label: 'Pexels', href: 'https://www.pexels.com/' },
        { label: 'Flickr Search', href: 'https://www.flickr.com/search/' },
        { label: 'FilmGrab', href: 'https://film-grab.com/' },
        { label: 'ShotDeck', href: 'https://shotdeck.com/' }
      ];
    }
    if (mode === 'palette') {
      return [
        { label: 'Coolors', href: 'https://coolors.co/' },
        { label: 'Adobe Color', href: 'https://color.adobe.com/' },
        { label: 'Color Hunt', href: 'https://colorhunt.co/' },
        { label: 'Happy Hues', href: 'https://www.happyhues.co/' },
        { label: 'UI Gradients', href: 'https://uigradients.com/' },
        { label: 'Paletton', href: 'https://paletton.com/' }
      ];
    }
    if (mode === 'character') {
      return [
        { label: 'DeviantArt', href: 'https://www.deviantart.com/' },
        { label: 'Sketchfab', href: 'https://sketchfab.com/' },
        { label: 'ArtStation', href: 'https://www.artstation.com/' }
      ];
    }
    if (mode === 'artist') {
      return [
        { label: 'Wikipedia', href: 'https://www.wikipedia.org/' },
        { label: 'Letterboxd', href: 'https://letterboxd.com/' },
        { label: 'Magnum Photos', href: 'https://www.magnumphotos.com/' },
        { label: 'WikiArt', href: 'https://www.wikiart.org/' },
        { label: 'IMDb', href: 'https://www.imdb.com/' }
      ];
    }
    if (mode === 'pose') {
      return [
        { label: 'Posemaniacs', href: 'https://www.posemaniacs.com/ko/poses' },
        { label: 'JustSketchMe', href: 'https://justsketch.me/' },
        { label: 'PoseMy.Art', href: 'https://posemy.art/' },
        { label: 'Magic Poser', href: 'https://magicposer.com/' },
        { label: 'AdorkaStock', href: 'https://www.adorkastock.com/' },
        { label: 'Croquis Cafe', href: 'https://croquiscafe.com/' }
      ];
    }
    return [
      { label: 'Mobbin', href: 'https://mobbin.com/' },
      { label: 'ShotDeck', href: 'https://shotdeck.com/' },
      { label: 'Coolors', href: 'https://coolors.co/' },
      { label: 'Wikipedia', href: 'https://www.wikipedia.org/' }
    ];
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

  function detailExpansionOptionsForMode(mode) {
    if (mode === 'artist') {
      return [
        { key: 'frames', label: '시그니처 장면', token: 'signature frames stills composition' },
        { key: 'analysis', label: '스타일 분석', token: 'visual language composition lighting analysis' },
        { key: 'brush', label: '질감/리듬', token: 'brushwork line rhythm texture' },
        { key: 'process', label: '인터뷰/메이킹', token: 'interview making of process' },
        { key: 'influence', label: '영향 레퍼런스', token: 'influence map references moodboard' },
        { key: 'medium-shift', label: '다른 매체', token: 'style translated into poster illustration ui' }
      ];
    }
    if (mode === 'design') {
      return [
        { key: 'layout', label: '레이아웃 시스템', token: 'grid layout typography system' },
        { key: 'hero', label: '히어로 화면', token: 'hero section key visual layout' },
        { key: 'case-study', label: '케이스 스터디', token: 'case study process mockup' },
        { key: 'brand', label: '브랜드 적용', token: 'brand identity application mockup' },
        { key: 'mobile', label: '모바일 패턴', token: 'mobile ui flow components' },
        { key: 'editorial', label: '포스터/에디토리얼', token: 'editorial poster spread typography' }
      ];
    }
    if (mode === 'character') {
      return [
        { key: 'sheet', label: '시트/턴어라운드', token: 'model sheet turnaround expression lineup' },
        { key: 'render', label: '렌더링 방식', token: 'rendering style material shading close-up' },
        { key: 'silhouette', label: '실루엣', token: 'silhouette shape language readability' },
        { key: 'costume', label: '의상/소품', token: 'costume variant accessory design' },
        { key: 'world', label: '역할/세계관', token: 'worldbuilding faction role archetype' },
        { key: 'key-art', label: '키아트 포즈', token: 'key art pose action expression' }
      ];
    }
    if (mode === 'photo') {
      return [
        { key: 'diagram', label: '라이팅 세팅', token: 'lighting setup diagram behind the scenes' },
        { key: 'lens', label: '렌즈/구도', token: 'lens framing composition camera angle' },
        { key: 'editorial', label: '에디토리얼', token: 'editorial portrait styling direction' },
        { key: 'grade', label: '그레이딩', token: 'color grade film emulation reference' },
        { key: 'set', label: '세트/배경', token: 'production design prop background' },
        { key: 'contact', label: '셀렉 시트', token: 'contact sheet selects reference' }
      ];
    }
    if (mode === 'palette') {
      return [
        { key: 'swatches', label: 'HEX/스와치', token: 'hex swatches color chips' },
        { key: 'ui-system', label: 'UI 시스템', token: 'ui color system accessibility' },
        { key: 'brand-board', label: '브랜드 보드', token: 'brand identity color system' },
        { key: 'product-scene', label: '제품 장면', token: 'product scene material palette' },
        { key: 'film-still', label: '필름 스틸', token: 'film still color grade palette' },
        { key: 'interior', label: '인테리어', token: 'interior materials palette' }
      ];
    }
    if (mode === 'pose') {
      return [
        { key: 'gesture', label: '제스처', token: 'gesture line of action anatomy' },
        { key: 'foreshort', label: '원근/단축', token: 'foreshortening camera angle anatomy' },
        { key: 'silhouette', label: '실루엣', token: 'clean silhouette readability' },
        { key: 'sequence', label: '동작 시퀀스', token: 'key pose sequence movement' },
        { key: 'hands', label: '손/제스처', token: 'hand gesture reference' },
        { key: 'combat', label: '액션/전투', token: 'combat action stance balance' }
      ];
    }
    return [
      { key: 'moodboard', label: '무드보드', token: 'reference moodboard collection' },
      { key: 'system', label: '시스템 관점', token: 'visual system style guide' },
      { key: 'material', label: '재질/표현', token: 'material lighting texture study' }
    ];
  }

  function detailExpansionOptionsForMode(mode) {
    if (mode === 'artist') {
      return [
        { key: 'frames', label: '\uC2DC\uADF8\uB2C8\uCC98 \uC7A5\uBA74', token: 'signature frames stills composition' },
        { key: 'analysis', label: '\uC2A4\uD0C0\uC77C \uBD84\uC11D', token: 'visual language composition lighting analysis' },
        { key: 'brush', label: '\uC9C8\uAC10/\uB9AC\uB4EC', token: 'brushwork line rhythm texture' },
        { key: 'process', label: '\uC778\uD130\uBDF0/\uBA54\uC774\uD0B9', token: 'interview making of process' },
        { key: 'influence', label: '\uC601\uD5A5 \uB808\uD37C\uB7F0\uC2A4', token: 'influence map references moodboard' },
        { key: 'medium-shift', label: '\uB2E4\uB978 \uB9E4\uCCB4', token: 'style translated into poster illustration ui' }
      ];
    }
    if (mode === 'design') {
      return [
        { key: 'layout', label: '\uB808\uC774\uC544\uC6C3 \uC2DC\uC2A4\uD15C', token: 'grid layout typography system' },
        { key: 'hero', label: '\uD788\uC5B4\uB85C \uD654\uBA74', token: 'hero section key visual layout' },
        { key: 'case-study', label: '\uCF00\uC774\uC2A4 \uC2A4\uD130\uB514', token: 'case study process mockup' },
        { key: 'brand', label: '\uBE0C\uB79C\uB4DC \uC801\uC6A9', token: 'brand identity application mockup' },
        { key: 'mobile', label: '\uBAA8\uBC14\uC77C \uD328\uD134', token: 'mobile ui flow components' },
        { key: 'editorial', label: '\uC5D0\uB514\uD1A0\uB9AC\uC5BC', token: 'editorial poster spread typography' }
      ];
    }
    if (mode === 'character') {
      return [
        { key: 'sheet', label: '\uC2DC\uD2B8/\uD134\uC5B4\uB77C\uC6B4\uB4DC', token: 'model sheet turnaround expression lineup' },
        { key: 'render', label: '\uB80C\uB354 \uBC29\uC2DD', token: 'rendering style material shading close-up' },
        { key: 'silhouette', label: '\uC2E4\uB8E8\uC5E3', token: 'silhouette shape language readability' },
        { key: 'costume', label: '\uC758\uC0C1/\uC18C\uD488', token: 'costume variant accessory design' },
        { key: 'world', label: '\uC5ED\uD560/\uC138\uACC4\uAD00', token: 'worldbuilding faction role archetype' },
        { key: 'key-art', label: '\uD0A4\uC544\uD2B8 \uD3EC\uC988', token: 'key art pose action expression' }
      ];
    }
    if (mode === 'photo') {
      return [
        { key: 'diagram', label: '\uB77C\uC774\uD305 \uC138\uD305', token: 'lighting setup diagram behind the scenes' },
        { key: 'lens', label: '\uB80C\uC988/\uAD6C\uB3C4', token: 'lens framing composition camera angle' },
        { key: 'editorial', label: '\uC5D0\uB514\uD1A0\uB9AC\uC5BC', token: 'editorial portrait styling direction' },
        { key: 'grade', label: '\uADF8\uB808\uC774\uB529', token: 'color grade film emulation reference' },
        { key: 'set', label: '\uC138\uD2B8/\uBC30\uACBD', token: 'production design prop background' },
        { key: 'contact', label: '\uCEE8\uD0DD\uD2B8 \uC2DC\uD2B8', token: 'contact sheet selects reference' }
      ];
    }
    if (mode === 'palette') {
      return [
        { key: 'swatches', label: 'HEX/\uCE69', token: 'hex swatches color chips' },
        { key: 'ui-system', label: 'UI \uC2DC\uC2A4\uD15C', token: 'ui color system accessibility' },
        { key: 'brand-board', label: '\uBE0C\uB79C\uB4DC \uBCF4\uB4DC', token: 'brand identity color system' },
        { key: 'product-scene', label: '\uC81C\uD488 \uC7A5\uBA74', token: 'product scene material palette' },
        { key: 'film-still', label: '\uD544\uB984 \uC2A4\uD2F8', token: 'film still color grade palette' },
        { key: 'interior', label: '\uC778\uD14C\uB9AC\uC5B4', token: 'interior materials palette' }
      ];
    }
    if (mode === 'pose') {
      return [
        { key: 'gesture', label: '\uC81C\uC2A4\uCC98', token: 'gesture line of action anatomy' },
        { key: 'foreshort', label: '\uC575\uAE00/\uC6D0\uADFC', token: 'foreshortening camera angle anatomy' },
        { key: 'silhouette', label: '\uC2E4\uB8E8\uC5E3', token: 'clean silhouette readability' },
        { key: 'sequence', label: '\uB3D9\uC791 \uC2DC\uD000\uC2A4', token: 'key pose sequence movement' },
        { key: 'hands', label: '\uC190 \uC81C\uC2A4\uCC98', token: 'hand gesture reference' },
        { key: 'combat', label: '\uC561\uC158/\uC804\uD22C', token: 'combat action stance balance' }
      ];
    }
    return [
      { key: 'moodboard', label: '\uBB34\uB4DC\uBCF4\uB4DC', token: 'reference moodboard collection' },
      { key: 'system', label: '\uC2DC\uC2A4\uD15C \uAD00\uC810', token: 'visual system style guide' },
      { key: 'material', label: '\uC18C\uC7AC/\uD45C\uD604', token: 'material lighting texture study' }
    ];
  }

  function intentsForDirectory(mode) {
    if (mode === 'all') {
      return [
        { key: 'moodboard', label: '무드보드', token: 'reference moodboard collection' },
        { key: 'system', label: '시스템', token: 'reference system style guide' },
        { key: 'explore', label: '탐색 확장', token: 'inspiration reference archive' }
      ];
    }
    if (mode === 'artist') {
      return [
        { key: 'frames', label: '대표 장면', token: 'signature frames stills' },
        { key: 'breakdown', label: '스타일 분석', token: 'visual style breakdown analysis' },
        { key: 'moodboard', label: '무드보드', token: 'art direction moodboard' },
        { key: 'interview', label: '인터뷰/메이킹', token: 'interview making of process' }
      ];
    }
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
    return core.escapeRegExp(s);
  }

  function hexToRgb(hex) {
    return core.hexToRgb(hex);
  }
  function relativeLuminance({ r, g, b }) {
    return core.relativeLuminance({ r, g, b });
  }
  function normalizePaletteColors(colors) {
    return core.normalizePaletteColors(colors);
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
      if (dom.promptPresetPreview) dom.promptPresetPreview.hidden = true;
      return;
    }

    const selected = loadPromptPresetKey();
    dom.promptPresetChips.setAttribute('role', 'radiogroup');
    dom.promptPresetChips.setAttribute('aria-label', 'Prompt presets');
    dom.promptPresetChips.innerHTML = '';

    presets.forEach((p) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip ${selected === p.key ? 'active' : ''}`.trim();
      b.textContent = p.label;
      updateAriaRadio(b, selected === p.key);
      b.addEventListener('click', () => {
        const next = (loadPromptPresetKey() === p.key) ? '' : p.key;
        savePromptPresetKey(next);
        renderPromptPresetChips();
      });
      dom.promptPresetChips.appendChild(b);
    });

    if (dom.promptPresetPreview) {
      const meta = presets.find((p) => p.key === selected);
      const token = String(meta?.token || '').trim();
      dom.promptPresetPreview.hidden = !token;
      if (token) dom.promptPresetPreview.textContent = `프리셋이 추가하는 내용: ${token}`;
    }
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
    dom.intentChips.setAttribute('role', 'radiogroup');
    dom.intentChips.setAttribute('aria-label', 'Search extension');
    const intents = intentsForDirectory(directoryMode);
    intents.forEach((i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip ${selectedIntentKey === i.key ? 'active' : ''}`.trim();
      b.textContent = i.label;
      updateAriaRadio(b, selectedIntentKey === i.key);
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

    if (dom.intentTokenPreview) {
      const token = selectedIntentKey ? String(intentToken() || '').trim() : '';
      dom.intentTokenPreview.hidden = !token;
      if (token) dom.intentTokenPreview.textContent = `추가되는 검색어: ${token}`;
    }
  }

  function effectiveSiteQuery(q, siteKey) {
    return joinTokens([q, siteBoostTokens(siteKey)]);
  }
  function updateManualPlaceholder() {
    if (!dom.manualSearch) return;
    dom.manualSearch.placeholder =
      directoryMode === 'all' ? '예: cinematic neon character, editorial photo, muted ui palette, running pose' :
      directoryMode === 'artist' ? '예: Wong Kar-wai, Saul Leiter, Moebius, Miyazaki' :
      directoryMode === 'character' ? '예: 치비(chibi), 셀셰이딩(cel shading), 픽셀(pixel art), 턴어라운드(turnaround)' :
      directoryMode === 'photo' ? '예: rembrandt lighting, low key, golden hour, film' :
      directoryMode === 'palette' ? '예: pastel palette, muted, nord, monochrome' :
      directoryMode === 'pose' ? '예: running, jump, gesture, dynamic, foreshortening' :
      '예: brutalism ui dashboard, swiss typography, y2k chrome';
  }
  function openManualSearch(siteKey = activeSiteKey) {
    const uiKey = dom.siteSwitchbar?.tagName === 'SELECT'
      ? dom.siteSwitchbar.value
      : document.querySelector('.site-switch.active')?.dataset?.siteKey;
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

  function sanitizeSearchBase(value) {
    return core.sanitizeSearchBase(value);
  }

  function sanitizeSearchQueryBase(value) {
    return core.sanitizeSearchQueryBase(value);
  }

  function styleQuery(style) {
    return core.buildStyleQuery(style, { mode: directoryMode });
  }

  function referenceMode(style) {
    if (style?.type) return String(style.type || '').trim() || directoryMode;
    return directoryMode === 'all' ? styleTypeKey(style) : directoryMode;
  }

  function searchPhrase(value) {
    return core.searchPhrase(value);
  }

  function referenceFocusTerms(style, limit = 3) {
    return core.referenceFocusTerms(style, limit);
  }

  function quickSearchTail(mode) {
    return core.quickSearchTail(mode);
  }

  function preciseSearchTail(mode) {
    return core.preciseSearchTail(mode);
  }

  function quickSearchQuery(style, siteKey = activeSiteKey) {
    const mode = referenceMode(style);
    return joinTokens([
      styleQuery(style),
      quickSearchTail(mode),
      siteBoostTokensForMode(siteKey, mode)
    ]);
  }

  function preciseSearchQuery(style, siteKey = activeSiteKey) {
    const mode = referenceMode(style);
    return joinTokens([
      styleQuery(style),
      referenceFocusTerms(style, 3).join(' '),
      preciseSearchTail(mode),
      siteBoostTokensForMode(siteKey, mode)
    ]);
  }

  function detailSearchQuery(style, seedMode = 'precise', siteKey = activeSiteKey, expansionKey = '') {
    const mode = referenceMode(style);
    const expansion = detailExpansionOptionsForMode(mode).find((item) => item.key === expansionKey)?.token || '';
    const base = seedMode === 'quick' ? quickSearchQuery(style, siteKey) : preciseSearchQuery(style, siteKey);
    return joinTokens([base, expansion]);
  }

  function selectStyle(style, { openInspector = true } = {}) {
    if (!style) return;
    selectedStyleId = style.id;

    if (dom.grid) {
      dom.grid.querySelectorAll('.style-card.selected').forEach((el) => {
        el.classList.remove('selected');
        try { el.setAttribute('aria-pressed', 'false'); } catch { /* ignore */ }
      });
      const next = dom.grid.querySelector(`.style-card[data-id="${CSS.escape(style.id)}"]`);
      if (next) {
        next.classList.add('selected');
        try { next.setAttribute('aria-pressed', 'true'); } catch { /* ignore */ }
      }
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
    if (openInspector) openDetail(style);
    else bringExternalSearchIntoView({ focus: true });
  }

  function renderGridTools() {
    if (!dom.gridTools) return;
    dom.gridTools.innerHTML = '';

    const mk = (label, onClick, title = '') => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pill';
      b.textContent = label;
      if (title) b.title = title;
      b.addEventListener('click', onClick);
      dom.gridTools.appendChild(b);
    };

    if (directoryMode === 'pose') {
      if (shuffleState && shuffleState.directory === directoryMode) {
        mk('섞기 해제', () => { clearShuffle({ persist: true }); render(); }, '카드 순서를 원래 정렬로 되돌립니다.');
        mk('다시 섞기', () => makeShuffle(), '카드 순서를 다시 무작위로 섞습니다.');
      } else {
        mk('카드섞기', () => makeShuffle(), '포즈 카드를 무작위로 섞습니다.');
      }
      return;
    }

    // 다른 디렉토리는 조용히 숨김(필요하면 여기서 확장)
  }

  function renderGridTools(items = currentItems) {
    if (!dom.gridTools) return;
    dom.gridTools.innerHTML = '';
    dom.gridTools.classList.add('floating-shuffle-tools');

    const visibleItems = Array.isArray(items) ? items : [];
    const isShuffled = Boolean(
      shuffleState &&
      shuffleState.directory === directoryMode &&
      shuffleState.context === shuffleContextSignature()
    );
    const canShuffle = visibleItems.length > 1;

    const mkIcon = (label, icon, onClick, { disabled = false, active = false, title = '' } = {}) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `grid-tool-icon ${active ? 'active' : ''}`.trim();
      button.innerHTML = icon;
      button.setAttribute('aria-label', label);
      button.dataset.tooltip = title || label;
      button.disabled = disabled;
      button.addEventListener('click', onClick);
      dom.gridTools.appendChild(button);
    };

    mkIcon(
      '카드 섞기',
      `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/><circle cx="9" cy="15" r="1.5"/><circle cx="15" cy="15" r="1.5"/></svg>`,
      () => makeShuffle(visibleItems),
      {
        disabled: !canShuffle,
        active: isShuffled,
        title: isShuffled ? '현재 열려 있는 카드 목록을 다시 섞습니다.' : '현재 열려 있는 카드 목록만 무작위로 섞습니다.'
      }
    );

    mkIcon(
      '섞기 해제',
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>`,
      () => {
        clearShuffle({ persist: true });
        render();
      },
      {
        disabled: !isShuffled,
        title: '원래 정렬로 되돌립니다.'
      }
    );
  }

  function updateGridStatusLine() {
    if (!dom.gridStatus) return;
    if (directoryMode === 'all') {
      const parts = ['통합 검색'];
      if (activeUnifiedType) parts.push(`타입: ${directoryLabel(activeUnifiedType)}`);
      if (activeUnifiedMood) parts.push(`무드: ${activeUnifiedMood}`);
      if (activeUnifiedUse) parts.push(`용도: ${activeUnifiedUse}`);
      if (activeUnifiedEra) parts.push(`시대: ${activeUnifiedEra}`);
      dom.gridStatus.textContent = parts.join(' · ');
      return;
    }
    if (directoryMode !== 'pose') {
      dom.gridStatus.textContent = '';
      return;
    }
    const parts = [];
    parts.push('필터 구조: 동작 → 각도');
    if (activePoseType) parts.push(`동작: ${poseTypeLabel(activePoseType)}`);
    if (activePoseVariant) parts.push(`각도: ${poseVariantLabel(activePoseVariant)}`);
    dom.gridStatus.textContent = parts.join(' · ');
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

    if (dom.directorySubtitle) dom.directorySubtitle.textContent = directorySubtitleText(directoryMode);
    applyStyleSearchPlaceholder();
    updateManualPlaceholder();

    renderSiteSwitches();
    if (detailIsOpen()) {
      const style = currentSelectedStyle();
      if (style) openDetail(style);
    }
    updateGuideStep();
  }

  function renderSiteSwitches() {
    if (!dom.siteSwitchbar) return;
    const keys = sitesForDirectory(directoryMode);
    if (!keys.includes(activeSiteKey)) activeSiteKey = keys[0] || 'pinterest';
    if (dom.siteSwitchbar.tagName === 'SELECT') {
      dom.siteSwitchbar.innerHTML = '';
      keys.forEach((k) => {
        const meta = SITES[k];
        if (!meta) return;
        const option = document.createElement('option');
        option.value = k;
        option.textContent = meta.label;
        dom.siteSwitchbar.appendChild(option);
      });
      dom.siteSwitchbar.value = activeSiteKey;
    } else {
      dom.siteSwitchbar.setAttribute('role', 'radiogroup');
      dom.siteSwitchbar.setAttribute('aria-label', 'External search sites');
      dom.siteSwitchbar.innerHTML = '';
      keys.forEach((k) => {
        const meta = SITES[k];
        if (!meta) return;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `site-switch ${k === activeSiteKey ? 'active' : ''}`.trim();
        b.textContent = meta.label;
        b.dataset.siteKey = k;
        updateAriaRadio(b, k === activeSiteKey);
        b.addEventListener('click', () => {
          siteTouched = true;
          applySite(k);
        });
        dom.siteSwitchbar.appendChild(b);
      });
    }
    if (dom.poseLinks) dom.poseLinks.hidden = directoryMode !== 'pose';
    if (dom.paletteLinks) dom.paletteLinks.hidden = directoryMode !== 'palette';
    if (dom.photoLinks) dom.photoLinks.hidden = directoryMode !== 'photo';
    if (dom.characterLinks) dom.characterLinks.hidden = directoryMode !== 'character';
    if (dom.artistLinks) dom.artistLinks.hidden = directoryMode !== 'artist';
    updateGuideStep();
  }
  function applyDirectory(next) {
    directoryMode = (next === 'all' || next === 'artist' || next === 'character' || next === 'photo' || next === 'palette' || next === 'pose') ? next : 'design';
    localStorage.setItem(DIRECTORY_KEY, directoryMode);
    siteTouched = false;
    closeDetail();
    activeUnifiedType = '';
    activeUnifiedMood = '';
    activeUnifiedUse = '';
    activeUnifiedEra = '';

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

    if (directoryMode === 'photo') {
      activeEnInitial = '';
      activeDigitInitial = '';
    }

    if (directoryMode === 'all') {
      activeEnInitial = '';
      activeDigitInitial = '';
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

    if (directoryMode !== 'character') activeCharacterFacet = '';
    if (directoryMode !== 'design') activeDesignFacet = '';
    if (directoryMode !== 'photo') activePhotoFacet = '';
    if (directoryMode !== 'artist') activeArtistFacet = '';
    if (directoryMode !== 'character' && directoryMode !== 'design' && directoryMode !== 'photo' && directoryMode !== 'artist') {
      if (dom.characterFacetJump) {
        dom.characterFacetJump.hidden = true;
        dom.characterFacetJump.innerHTML = '';
      }
    }

    if (directoryMode !== 'all') {
      if (dom.unifiedTypeJump) {
        dom.unifiedTypeJump.hidden = true;
        dom.unifiedTypeJump.innerHTML = '';
      }
      if (dom.unifiedMoodJump) {
        dom.unifiedMoodJump.hidden = true;
        dom.unifiedMoodJump.innerHTML = '';
      }
      if (dom.unifiedUseJump) {
        dom.unifiedUseJump.hidden = true;
        dom.unifiedUseJump.innerHTML = '';
      }
      if (dom.unifiedEraJump) {
        dom.unifiedEraJump.hidden = true;
        dom.unifiedEraJump.innerHTML = '';
      }
    }

    if (dom.dirAll) dom.dirAll.classList.toggle('active', directoryMode === 'all');
    if (dom.dirDesign) dom.dirDesign.classList.toggle('active', directoryMode === 'design');
    if (dom.dirCharacter) dom.dirCharacter.classList.toggle('active', directoryMode === 'character');
    if (dom.dirPhoto) dom.dirPhoto.classList.toggle('active', directoryMode === 'photo');
    if (dom.dirArtist) dom.dirArtist.classList.toggle('active', directoryMode === 'artist');
    if (dom.dirPalette) dom.dirPalette.classList.toggle('active', directoryMode === 'palette');
    if (dom.dirPose) dom.dirPose.classList.toggle('active', directoryMode === 'pose');
    updateAriaRadio(dom.dirAll, directoryMode === 'all');
    updateAriaRadio(dom.dirDesign, directoryMode === 'design');
    updateAriaRadio(dom.dirCharacter, directoryMode === 'character');
    updateAriaRadio(dom.dirPhoto, directoryMode === 'photo');
    updateAriaRadio(dom.dirArtist, directoryMode === 'artist');
    updateAriaRadio(dom.dirPalette, directoryMode === 'palette');
    updateAriaRadio(dom.dirPose, directoryMode === 'pose');

    if (dom.directoryTitle) dom.directoryTitle.textContent =
      directoryMode === 'all' ? 'Inspodex Reference Database' :
      directoryMode === 'artist' ? 'Artist Style Directory' :
      directoryMode === 'character' ? 'Character Style Directory' :
      directoryMode === 'photo' ? 'Photo Style & Lighting Directory' :
      directoryMode === 'palette' ? 'Color Palette Directory' :
      directoryMode === 'pose' ? 'Pose & Motion Directory' :
      'Design Style Directory';

    if (dom.directorySubtitle) dom.directorySubtitle.textContent =
      directoryMode === 'all'
        ? '전체 레퍼런스를 한 번에 검색하고, 타입·무드·용도·시대 facet으로 좁혀보세요.'
        : directoryMode === 'artist'
          ? '영화·사진·일러스트·회화 작가의 시각 언어를 이름 기준으로 찾고 확장 검색하세요.'
        : '스타일을 고르고(필터), 선택한 키워드로 외부 사이트에서 바로 확장 검색하세요.';

    if (dom.directorySubtitle) dom.directorySubtitle.textContent = directorySubtitleText(directoryMode);
    applyStyleSearchPlaceholder();

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

  function thumbsBase(mode = directoryMode) {
    if (mode === 'artist') return 'assets/artist-thumbs';
    if (mode === 'character') return 'assets/char-thumbs';
    if (mode === 'photo') return 'assets/photo-thumbs';
    if (mode === 'palette') return 'assets/palette-thumbs';
    if (mode === 'pose') return 'assets/pose-thumbs';
    return 'assets/thumbs';
  }
  function thumbPaths(id, mode = directoryMode) {
    const base = thumbsBase(mode);
    return {
      jpg: `${base}/${id}.jpg`,
      png: `${base}/${id}.png`,
      svg: `${base}/${id}.svg`
    };
  }
  function thumbManifestMode(mode = directoryMode) {
    if (mode === 'character') return 'character';
    if (mode === 'photo') return 'photo';
    if (mode === 'design') return 'design';
    return '';
  }
  function thumbSourceCandidates(id, mode = directoryMode) {
    const p = thumbPaths(id, mode);
    const manifestLoaded = typeof window !== 'undefined' && window.THUMB_MANIFEST && typeof window.THUMB_MANIFEST === 'object';
    if (!manifestLoaded) return [p.jpg, p.png, p.svg];
    const manifestMode = thumbManifestMode(mode);
    if (!manifestMode) return [];
    const ext = window.THUMB_MANIFEST?.[manifestMode]?.[id];
    return ext ? [`${thumbsBase(mode)}/${id}.${ext}`] : [];
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
    const tags = new Set((style.tags || []).map((t) => String(t || '').toLowerCase()));
    const variant = (() => {
      if (tags.has('pixel') || tags.has('pixel-art')) return 'pixel';
      if (tags.has('3d')) return '3d';
      if (tags.has('manga') || tags.has('ink-line')) return 'ink';
      if (tags.has('chibi')) return 'chibi';
      return ['toon', 'shape', 'dot', 'stripe'][hashToHue(style.id) % 4];
    })();

    const pattern = (() => {
      if (variant === 'pixel') {
        return `<g opacity="0.18">
  ${Array.from({ length: 10 }).map((_, y) =>
    Array.from({ length: 7 }).map((__, x) =>
      `<rect x="${70 + x * 70}" y="${80 + y * 40}" width="26" height="26" fill="rgba(0,0,0,0.45)"/>`
    ).join('')
  ).join('')}
</g>`;
      }
      if (variant === 'stripe') {
        return `<g opacity="0.20" fill="rgba(0,0,0,0.35)">
  ${Array.from({ length: 14 }).map((_, i) =>
    `<rect x="${-120 + i * 70}" y="-60" width="26" height="980" transform="rotate(18 300 450)"/>`
  ).join('')}
</g>`;
      }
      if (variant === 'dot') {
        return `<g opacity="0.18" fill="rgba(255,255,255,0.55)">
  ${Array.from({ length: 40 }).map((_, i) => {
    const x = 40 + ((i * 83) % 520);
    const y = 60 + ((i * 131) % 520);
    const r = 5 + ((i * 7) % 10);
    return `<circle cx="${x}" cy="${y}" r="${r}"/>`;
  }).join('')}
</g>`;
      }
      return '';
    })();

    const heroArt = (() => {
      if (variant === 'pixel') {
        return `<g filter="url(#s)">
  <rect x="176" y="186" width="248" height="248" rx="28" fill="rgba(255,255,255,0.14)" stroke="${ring}" stroke-width="10"/>
  <g opacity="0.92" fill="rgba(0,0,0,0.28)">
    <rect x="250" y="268" width="24" height="24"/><rect x="326" y="268" width="24" height="24"/>
    <rect x="274" y="316" width="52" height="20"/>
  </g>
  <g opacity="0.22" fill="rgba(0,0,0,0.35)">
    ${Array.from({ length: 9 }).map((_, i) => `<rect x="${200 + i * 22}" y="470" width="10" height="120" rx="5"/>`).join('')}
  </g>
</g>`;
      }
      if (variant === '3d') {
        return `<g filter="url(#s)">
  <circle cx="300" cy="300" r="138" fill="rgba(255,255,255,0.14)" stroke="${ring}" stroke-width="10"/>
  <ellipse cx="300" cy="330" rx="128" ry="92" fill="rgba(0,0,0,0.14)"/>
  <path d="M205 520 C220 450 380 450 395 520 C410 605 190 605 205 520 Z" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.22)" stroke-width="6"/>
  <circle cx="260" cy="292" r="14" fill="rgba(0,0,0,0.22)"/>
  <circle cx="340" cy="292" r="14" fill="rgba(0,0,0,0.22)"/>
  <path d="M275 342 Q300 362 325 342" fill="none" stroke="rgba(0,0,0,0.24)" stroke-width="10" stroke-linecap="round"/>
</g>`;
      }
      if (variant === 'ink') {
        return `<g filter="url(#s)">
  <path d="M160 300 C210 180 390 180 440 300 C470 374 428 436 364 460 C320 476 280 476 236 460 C172 436 130 374 160 300 Z"
    fill="rgba(255,255,255,0.12)" stroke="${ring}" stroke-width="10"/>
  <path d="M190 325 C240 300 270 300 300 320 C330 340 360 340 410 320"
    fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="16" stroke-linecap="round"/>
  <path d="M220 515 C250 470 350 470 380 515" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="18" stroke-linecap="round"/>
</g>`;
      }
      if (variant === 'chibi') {
        return `<g filter="url(#s)">
  <ellipse cx="300" cy="290" rx="160" ry="140" fill="rgba(255,255,255,0.14)" stroke="${ring}" stroke-width="10"/>
  <rect x="250" y="440" width="100" height="140" rx="50" fill="rgba(0,0,0,0.16)" stroke="rgba(255,255,255,0.20)" stroke-width="6"/>
  <circle cx="245" cy="290" r="16" fill="rgba(0,0,0,0.24)"/>
  <circle cx="355" cy="290" r="16" fill="rgba(0,0,0,0.24)"/>
  <path d="M275 342 Q300 365 325 342" fill="none" stroke="rgba(0,0,0,0.24)" stroke-width="10" stroke-linecap="round"/>
</g>`;
      }
      // generic
      return `<g filter="url(#s)">
  <circle cx="300" cy="310" r="150" fill="rgba(255,255,255,0.16)" stroke="${ring}" stroke-width="10"/>
  <path d="M205,565 C215,455 385,455 395,565 C405,675 195,675 205,565 Z"
    fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.25)" stroke-width="6" />
  <circle cx="250" cy="300" r="16" fill="rgba(0,0,0,0.26)"/>
  <circle cx="350" cy="300" r="16" fill="rgba(0,0,0,0.26)"/>
  <path d="M275,350 Q300,370 325,350" fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="10" stroke-linecap="round"/>
</g>`;
    })();
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
  ${pattern}
  ${heroArt}
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

  function designThumbSvg(style) {
    const key = String(style?.id || style?.en || style?.ko || '').toLowerCase();
    const hue = hashToHue(key);
    const bg1 = `hsl(${hue} 68% 46%)`;
    const bg2 = `hsl(${(hue + 26) % 360} 70% 40%)`;
    const bg3 = `hsl(${(hue + 180) % 360} 62% 44%)`;
    const label = escXml((style.ko || style.en || style.id).toString().slice(0, 26));
    const sub = escXml((style.en || '').toString().slice(0, 30));
    const tags = (Array.isArray(style.tags) ? style.tags : [])
      .slice(0, 3)
      .map((t) => escXml(String(t || '').slice(0, 14)))
      .filter(Boolean)
      .join(' · ');

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="0.55" stop-color="${bg2}"/>
      <stop offset="1" stop-color="${bg3}"/>
    </linearGradient>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="rgba(0,0,0,0.35)"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="600" height="900" fill="url(#g)"/>
  <g opacity="0.22">
    <circle cx="110" cy="160" r="120" fill="rgba(255,255,255,0.55)"/>
    <circle cx="520" cy="220" r="160" fill="rgba(0,0,0,0.28)"/>
    <rect x="70" y="560" width="460" height="110" rx="26" fill="rgba(255,255,255,0.22)"/>
  </g>
  <rect x="0" y="560" width="600" height="340" fill="rgba(0,0,0,0.55)"/>
  <g filter="url(#s)">
    <text x="52" y="636" fill="#fff" font-size="42" font-weight="900" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${label}</text>
    <text x="52" y="682" fill="rgba(255,255,255,0.86)" font-size="22" font-weight="700" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${sub}</text>
    <text x="52" y="730" fill="rgba(255,255,255,0.74)" font-size="18" font-weight="600" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${tags}</text>
  </g>
</svg>`;
  }
  function designThumbDataUri(style) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(designThumbSvg(style))}`;
  }

  function artistThumbSvg(style) {
    const key = String(style?.id || style?.en || '').toLowerCase();
    const hue = hashToHue(`artist:${key}`);
    const bg1 = `hsl(${hue} 56% 34%)`;
    const bg2 = `hsl(${(hue + 24) % 360} 62% 18%)`;
    const accent = `hsl(${(hue + 180) % 360} 80% 70%)`;
    const label = escXml((style.ko || style.en || style.id).toString().slice(0, 24));
    const sub = escXml((style.en || '').toString().slice(0, 30));
    const medium = escXml((Array.isArray(style.media) ? style.media.slice(0, 2).join(' / ') : '').slice(0, 28));
    const mood = escXml((Array.isArray(style.moods) ? style.moods.slice(0, 2).join(' / ') : '').slice(0, 28));
    const initials = escXml(
      String(style.en || style.ko || style.id || '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0] || '')
        .join('')
        .toUpperCase()
    );

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="rgba(0,0,0,0.45)"/>
    </filter>
  </defs>
  <rect x="0" y="0" width="600" height="900" fill="url(#g)"/>
  <circle cx="470" cy="150" r="128" fill="rgba(255,255,255,0.08)"/>
  <circle cx="160" cy="300" r="180" fill="rgba(255,255,255,0.06)"/>
  <g filter="url(#s)">
    <circle cx="300" cy="294" r="132" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="10"/>
    <text x="300" y="330" text-anchor="middle" fill="#fff" font-size="112" font-weight="900" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif">${initials}</text>
  </g>
  <rect x="40" y="610" width="520" height="226" rx="24" fill="rgba(0,0,0,0.48)" stroke="rgba(255,255,255,0.14)"/>
  <text x="68" y="680" fill="#fff" font-size="38" font-weight="900" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${label}</text>
  <text x="68" y="722" fill="rgba(255,255,255,0.86)" font-size="22" font-weight="700" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">${sub}</text>
  <text x="68" y="776" fill="rgba(255,255,255,0.78)" font-size="18" font-weight="600" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif">${medium}</text>
  <text x="68" y="810" fill="rgba(255,255,255,0.64)" font-size="16" font-weight="600" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif">${mood}</text>
</svg>`;
  }

  function artistThumbDataUri(style) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(artistThumbSvg(style))}`;
  }

  function applyThumb(imgEl, style) {
    const mode = directoryMode === 'all' ? styleTypeKey(style) : directoryMode;
    const sources = thumbSourceCandidates(style.id, mode);
    const artistFallback = artistThumbDataUri(style);
    const charFallback = characterThumbDataUri(style);
    const paletteFallback = paletteThumbDataUri(style);
    const poseFallback = poseThumbDataUri(style);
    const designFallback = designThumbDataUri(style);
    const order = mode === 'artist'
      ? [...sources, artistFallback]
      : mode === 'character'
      ? [...sources, charFallback]
      : mode === 'palette'
        ? [paletteFallback]
        : mode === 'pose'
          ? [poseFallback]
          : [...sources, designFallback];
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
    const baseQuery = styleQuery(style);
    return site.url(effectiveSiteQuery(String(baseQuery || ''), activeSiteKey));
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

  function flashUiAck(node, duration = 520) {
    if (!(node instanceof Element)) return;
    if (node.__ackTimer) window.clearTimeout(node.__ackTimer);
    node.classList.add('is-ack');
    node.__ackTimer = window.setTimeout(() => {
      node.classList.remove('is-ack');
      node.__ackTimer = 0;
    }, duration);
  }

  function showPopup({ title = '복사 완료', desc = '' } = {}) {
    if (!dom.popup) return;
    if (dom.popupTitle) dom.popupTitle.textContent = String(title || '');
    if (dom.popupDesc) dom.popupDesc.textContent = String(desc || '');
    dom.popup.hidden = false;
    try { dom.popupClose?.focus({ preventScroll: true }); } catch { /* ignore */ }
  }

  function previewText(text, max = 90) {
    const s = String(text || '').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    if (s.length <= max) return s;
    return `${s.slice(0, Math.max(20, max)).trim()}…`;
  }

  const BATCH_SIZE = 40;
  let renderSig = '';
  let renderedCount = 0;
  let currentItems = [];
  let ioMore = null;

  function filterSignature() {
    const base = [
      directoryMode,
      sortMode,
      query,
      activeTag,
      activeEnInitial,
      activeDigitInitial,
      activePoseType,
      activePoseVariant,
      activePaletteCategory,
      activeCharacterFacet,
      activeDesignFacet,
      activePhotoFacet,
      activeArtistFacet,
      activeUnifiedType,
      activeUnifiedMood,
      activeUnifiedUse,
      activeUnifiedEra,
      shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature()
        ? (shuffleState.revision || 'shuffled')
        : ''
    ];
    return base.map((x) => String(x || '')).join('|');
  }

  function shuffleContextSignature() {
    const base = [
      directoryMode,
      query,
      activeTag,
      activeEnInitial,
      activeDigitInitial,
      activePoseType,
      activePoseVariant,
      activePaletteCategory,
      activeCharacterFacet,
      activeDesignFacet,
      activePhotoFacet,
      activeArtistFacet,
      activeUnifiedType,
      activeUnifiedMood,
      activeUnifiedUse,
      activeUnifiedEra
    ];
    return base.map((x) => String(x || '')).join('|');
  }

  function updateAriaRadio(el, isChecked) {
    if (!el) return;
    el.setAttribute('role', 'radio');
    el.setAttribute('aria-checked', isChecked ? 'true' : 'false');
  }

  function applyStyleSearchPlaceholder() {
    if (!dom.search) return;
    const hint = '(/로 포커스 · Esc 지우기)';
    const base =
      directoryMode === 'all' ? '예: cinematic neon, kawaii mascot, brutalist dashboard, autumn palette, running pose' :
      directoryMode === 'artist' ? '예: wes anderson, wong kar-wai, saul leiter, moebius' :
      directoryMode === 'character' ? '예: 치비, 셀셰이딩, 픽셀아트, 잉크, 만화' :
      directoryMode === 'photo' ? '예: rembrandt, low key, golden hour, bokeh, film' :
      directoryMode === 'palette' ? '예: matrix, luxe, triadic, 1980s, neon' :
      directoryMode === 'pose' ? '예: running, jump, gesture, dynamic, foreshortening' :
      '예: 미니멀, brutal, 스위스, y2k';
    dom.search.placeholder = `${base} ${hint}`;
  }

  function closePopup() {
    if (!dom.popup) return;
    dom.popup.hidden = true;
  }

  function isInViewport(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    return r.bottom >= 0 && r.right >= 0 && r.top <= vh && r.left <= vw;
  }

  function bringExternalSearchIntoView({ focus = true } = {}) {
    setAdvancedSearchOpen(true);
    const target = dom.manualSearch || dom.manualSearchBtn;
    if (!target) return;
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 720px)').matches;
    if (isMobile || !isInViewport(target)) {
      try { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch { /* ignore */ }
    }
    if (focus && dom.manualSearch) {
      try { dom.manualSearch.focus({ preventScroll: true }); } catch { /* ignore */ }
    }
  }

  let lastGridCountText = '';
  function updateGridMeta({ visible = 0, total = 0, filtered = false, shown = null } = {}) {
    const showPart = (typeof shown === 'number' && shown > 0 && shown < visible) ? ` · 표시 ${shown}/${visible}` : '';
    const text = filtered
      ? `결과: ${visible}개${showPart} / 전체 ${total}개`
      : `전체: ${total}개${showPart}`;

    if (dom.gridCount) {
      dom.gridCount.textContent = text;
      if (text !== lastGridCountText) {
        dom.gridCount.classList.remove('bump');
        void dom.gridCount.offsetWidth; // restart animation
        dom.gridCount.classList.add('bump');
        window.setTimeout(() => dom.gridCount?.classList.remove('bump'), 300);
        lastGridCountText = text;
      }
    }
    if (dom.count) dom.count.textContent = text;
    if (dom.filterApplied) dom.filterApplied.hidden = !filtered;
  }

  function hasJumpFilter() {
    if (directoryMode === 'all') return Boolean(activeUnifiedType || activeUnifiedMood || activeUnifiedUse || activeUnifiedEra);
    if (directoryMode === 'pose') return Boolean(activePoseType);
    if (directoryMode === 'palette') return Boolean(activePaletteCategory);
    if (directoryMode === 'character' || directoryMode === 'design' || directoryMode === 'photo' || directoryMode === 'artist') return hasSingleFacetFilter();
    return false;
  }

  function updateJumpReset() {
    if (!dom.jumpResetBtn) return;
    dom.jumpResetBtn.hidden = !hasJumpFilter();
  }

  function clearJumpFilter() {
    if (directoryMode === 'all') {
      activeUnifiedType = '';
      activeUnifiedMood = '';
      activeUnifiedUse = '';
      activeUnifiedEra = '';
    } else if (directoryMode === 'pose') {
      activePoseType = '';
      activePoseVariant = '';
    } else if (directoryMode === 'palette') {
      activePaletteCategory = '';
      activePalettePreset = '';
    } else if (directoryMode === 'character') {
      activeCharacterFacet = '';
    } else if (directoryMode === 'design') {
      activeDesignFacet = '';
    } else if (directoryMode === 'photo') {
      activePhotoFacet = '';
    } else if (directoryMode === 'artist') {
      activeArtistFacet = '';
    }
    buildJumpBars();
    render();
  }

  function ensureLoadMoreObserver() {
    if (!dom.loadMore) return;
    if (ioMore) return;
    if (!('IntersectionObserver' in window)) return;
    ioMore = new IntersectionObserver((entries) => {
      const hit = entries.some((e) => e.isIntersecting);
      if (!hit) return;
      appendNextBatch();
    }, { root: null, rootMargin: '480px 0px', threshold: 0 });
    ioMore.observe(dom.loadMore);
  }

  function syncLoadMore() {
    if (!dom.loadMore) return;
    const total = currentItems.length;
    const shown = renderedCount;
    const hasMore = shown < total;
    dom.loadMore.hidden = !hasMore;
    if (hasMore) {
      dom.loadMore.textContent = `스크롤하면 더 불러와요… (${shown}/${total})`;
    }
  }

  function appendNextBatch() {
    if (!dom.grid) return;
    if (!Array.isArray(currentItems) || currentItems.length === 0) {
      syncLoadMore();
      return;
    }
    if (renderedCount >= currentItems.length) {
      syncLoadMore();
      return;
    }
    const start = renderedCount;
    const end = Math.min(currentItems.length, start + BATCH_SIZE);
    const frag = document.createDocumentFragment();
    for (let i = start; i < end; i += 1) {
      try {
        frag.appendChild(createStyleCard(currentItems[i]));
      } catch (err) {
        console.error('createStyleCard failed', currentItems[i]?.id, err);
        const card = document.createElement('article');
        card.className = 'style-card';
        card.dataset.id = String(currentItems[i]?.id || '');
        card.style.display = 'flex';
        card.style.alignItems = 'flex-end';
        card.style.padding = '14px';
        card.style.background = 'linear-gradient(180deg, rgba(30,34,48,0.95), rgba(12,12,12,0.98))';

        const meta = document.createElement('div');
        meta.style.display = 'flex';
        meta.style.flexDirection = 'column';
        meta.style.gap = '6px';
        meta.style.width = '100%';

        const no = document.createElement('div');
        no.textContent = String(currentItems[i]?.cardNo || currentItems[i]?.id || 'REF');
        no.style.fontSize = '11px';
        no.style.fontWeight = '800';
        no.style.letterSpacing = '0.08em';
        no.style.textTransform = 'uppercase';
        no.style.color = 'rgba(255,255,255,0.72)';
        meta.appendChild(no);

        const title = document.createElement('div');
        title.textContent = String(currentItems[i]?.ko || currentItems[i]?.en || currentItems[i]?.id || 'Reference');
        title.style.fontSize = '20px';
        title.style.fontWeight = '800';
        title.style.lineHeight = '1.1';
        title.style.color = '#fff';
        meta.appendChild(title);

        const sub = document.createElement('div');
        sub.textContent = String(currentItems[i]?.seriesLabel || directoryShortLabel(currentItems[i]?.type || directoryMode));
        sub.style.fontSize = '12px';
        sub.style.color = 'rgba(255,255,255,0.76)';
        meta.appendChild(sub);

        card.appendChild(meta);
        card.addEventListener('click', () => selectStyle(currentItems[i]));
        frag.appendChild(card);
      }
    }
    dom.grid.appendChild(frag);
    renderedCount = end;
    syncLoadMore();
  }

  function resetBatch(items) {
    currentItems = Array.isArray(items) ? items : [];
    renderedCount = 0;
    if (dom.grid) dom.grid.innerHTML = '';
    ensureLoadMoreObserver();
    appendNextBatch();
    if (dom.grid && currentItems.length && dom.grid.childElementCount === 0) {
      const frag = document.createDocumentFragment();
      currentItems.slice(0, Math.min(BATCH_SIZE, currentItems.length)).forEach((item) => {
        const card = document.createElement('article');
        card.className = 'style-card';
        card.dataset.id = String(item?.id || '');
        card.style.display = 'flex';
        card.style.alignItems = 'flex-end';
        card.style.padding = '14px';
        card.style.background = 'linear-gradient(180deg, rgba(30,34,48,0.95), rgba(12,12,12,0.98))';
        const meta = document.createElement('div');
        meta.style.display = 'flex';
        meta.style.flexDirection = 'column';
        meta.style.gap = '6px';
        meta.innerHTML = `
          <div style="font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.72);">${String(item?.cardNo || item?.id || 'REF')}</div>
          <div style="font-size:20px;font-weight:800;line-height:1.1;color:#fff;">${String(item?.ko || item?.en || item?.id || 'Reference')}</div>
          <div style="font-size:12px;color:rgba(255,255,255,.76);">${String(item?.seriesLabel || directoryShortLabel(item?.type || directoryMode))}</div>
        `;
        card.appendChild(meta);
        card.addEventListener('click', () => selectStyle(item));
        frag.appendChild(card);
      });
      dom.grid.appendChild(frag);
      renderedCount = Math.min(BATCH_SIZE, currentItems.length);
      syncLoadMore();
      console.error('resetBatch recovery mode: grid was empty after appendNextBatch');
    }
  }

  function createStyleCard(style) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `style-card ${selectedStyleId === style.id ? 'selected' : ''}`.trim();
    card.dataset.id = style.id;
    card.setAttribute('aria-pressed', selectedStyleId === style.id ? 'true' : 'false');
    const tagText = (style.tags || []).slice(0, 3).map((t) => `#${t}`).join(', ');
    const ariaTags = tagText ? ` 태그: ${tagText}.` : '';
    card.setAttribute('aria-label', `${style.ko} (${style.en}).${ariaTags} 클릭하면 외부 검색 키워드가 적용됩니다.`);
    card.title = `${style.ko} / ${style.en}`;
    card.addEventListener('click', () => selectStyle(style));

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = `${style.ko} 썸네일`;
    applyThumb(img, style);

    const overlay = document.createElement('div');
    overlay.className = 'style-overlay';

    const top = document.createElement('div');
    top.className = 'style-top';

    if (directoryMode === 'all') {
      const typeBadge = document.createElement('div');
      typeBadge.className = 'style-type-badge';
      typeBadge.textContent = styleTypeLabel(style);
      top.appendChild(typeBadge);
    }

    const primaryLabel = String(style.ko || style.en || style.id || '');
    const secondaryLabel = String(style.en || '').trim() && String(style.en || '').trim() !== primaryLabel.trim()
      ? String(style.en || '').trim()
      : '';

    const title = document.createElement('div');
    title.className = 'style-title';
    title.textContent = primaryLabel;
    title.style.fontSize = `${fontSizeFor(primaryLabel, 18, 13, 10)}px`;

    const subtitle = document.createElement('div');
    subtitle.className = 'style-subtitle';
    subtitle.textContent = secondaryLabel;
    subtitle.style.fontSize = `${fontSizeFor(secondaryLabel || primaryLabel, 14, 11, 18)}px`;
    subtitle.hidden = !secondaryLabel;

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
        const isPalette = directoryMode === 'palette' && Array.isArray(style.colors) && style.colors.length >= 5;
        const lines = [
          '이미지 생성툴에 붙여넣기 → 생성',
          `미리보기: ${previewText(prompt, 110)}`,
          isPalette ? '(HEX 5개 포함)' : ''
        ].filter(Boolean);
        showPopup({
          title: '복사 완료!',
          desc: lines.join('\n')
        });
      }
    });

    const tags = document.createElement('div');
    tags.className = 'style-tags';
    (style.tags || []).slice(0, 3).forEach((t) => {
      const b = document.createElement('button');
      b.type = 'button';
      const isOn = activeTag === t;
      b.className = `tag ${isOn ? 'active' : ''}`.trim();
      b.textContent = `#${t}`;
      b.setAttribute('aria-pressed', isOn ? 'true' : 'false');
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

    if (directoryMode === 'palette') {
      const colors = Array.isArray(style.colors) ? style.colors.slice(0, 5) : [];
      if (colors.length) {
        const hexRow = document.createElement('div');
        hexRow.className = 'palette-hex';
        colors.forEach((hex) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'hex-chip';
          const value = String(hex || '').toUpperCase().trim();
          b.textContent = value;
          b.title = '클릭하여 복사';
          b.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const ok = await writeClipboard(value);
            if (ok) showToast(`HEX 복사됨: ${value}`);
          });
          hexRow.appendChild(b);
        });
        overlay.appendChild(hexRow);
      }
    }

    card.appendChild(img);
    card.appendChild(overlay);

    return card;
  }

  function siteBoostTokensForMode(siteKey, mode) {
    if (siteKey === 'pinterest') {
      if (mode === 'artist') return 'artist style reference';
      if (mode === 'design') return 'inspo moodboard';
      if (mode === 'character') return 'reference inspo';
      if (mode === 'photo') return 'photography';
      if (mode === 'palette') return 'palette';
      if (mode === 'pose') return 'reference';
      return 'reference inspo moodboard';
    }
    if (siteKey === 'behance') return (mode === 'design' || mode === 'artist') ? 'case study project' : '';
    if (siteKey === 'artstation') return (mode === 'character' || mode === 'pose' || mode === 'artist') ? 'concept art style' : '';
    if (siteKey === 'dribbble') return mode === 'design' ? 'shot' : '';
    if (siteKey === 'youtube') return mode === 'photo' ? 'lighting setup diagram behind the scenes' : (mode === 'pose' ? 'tutorial reference' : (mode === 'artist' ? 'style analysis interview' : ''));
    if (siteKey === 'coolors' || siteKey === 'adobeColor') return mode === 'palette' ? 'hex' : '';
    if (siteKey === 'sketchfab') return mode === 'character' ? '3d model' : '';
    return '';
  }

  function effectiveStyleQuery(style, siteKey = activeSiteKey) {
    return preciseSearchQuery(style, siteKey);
  }

  function activeSearchUrl(style) {
    const site = SITES[activeSiteKey] || SITES.pinterest;
    return site.url(effectiveStyleQuery(style, activeSiteKey));
  }

  function pinterestQuickUrl(style) {
    return SITES.pinterest.url(quickSearchQuery(style, 'pinterest'));
  }

  function googleImagesQuickUrl(style) {
    return SITES.googleImages.url(quickSearchQuery(style, 'googleImages'));
  }

  function createStyleCard(style) {
    const card = document.createElement('article');
    card.className = `style-card ${selectedStyleId === style.id ? 'selected' : ''}`.trim();
    card.dataset.id = style.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', selectedStyleId === style.id ? 'true' : 'false');
    const tagText = (style.tags || []).slice(0, 3).map((t) => `#${t}`).join(', ');
    const ariaTags = tagText ? ` 태그: ${tagText}.` : '';
    card.setAttribute('aria-label', `${style.ko} (${style.en}).${ariaTags}`);
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
    img.decoding = 'async';
    img.alt = `${style.ko} thumbnail`;
    applyThumb(img, style);

    const overlay = document.createElement('div');
    overlay.className = 'style-overlay';

    const body = document.createElement('div');
    body.className = 'style-overlay-body';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'style-title-wrap';

    const primaryLabel = String(style.ko || style.en || style.id || '');
    const secondaryLabel = String(style.en || '').trim() && String(style.en || '').trim() !== primaryLabel.trim()
      ? String(style.en || '').trim()
      : '';

    const title = document.createElement('div');
    title.className = 'style-title';
    title.textContent = primaryLabel;
    title.style.fontSize = `${fontSizeFor(primaryLabel, 18, 13, 10)}px`;
    titleWrap.appendChild(title);

    const hoverMeta = document.createElement('div');
    hoverMeta.className = 'style-hover-meta';

    if (directoryMode === 'all') {
      const typeBadge = document.createElement('div');
      typeBadge.className = 'style-type-badge';
      typeBadge.textContent = styleTypeLabel(style);
      hoverMeta.appendChild(typeBadge);
    }

    if (secondaryLabel) {
      const subtitle = document.createElement('div');
      subtitle.className = 'style-subtitle';
      subtitle.textContent = secondaryLabel;
      subtitle.style.fontSize = `${fontSizeFor(secondaryLabel || primaryLabel, 14, 11, 18)}px`;
      hoverMeta.appendChild(subtitle);
    }

    const tags = document.createElement('div');
    tags.className = 'style-tags';
    (style.tags || []).slice(0, 3).forEach((t) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `style-tag ${activeTag === t ? 'active' : ''}`.trim();
      chip.textContent = `#${t}`;
      chip.setAttribute('aria-pressed', activeTag === t ? 'true' : 'false');
      chip.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
      });
      chip.setAttribute('aria-label', `${t} 태그로 정렬`);
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nextTag = activeTag === t ? '' : t;
        activeTag = nextTag;
        render();
        showToast(nextTag ? `#${t} 태그 기준으로 정렬했습니다.` : '태그 정렬을 해제했습니다.');
      });
      tags.appendChild(chip);
    });
    if (tags.childElementCount) hoverMeta.appendChild(tags);

    const actionGroup = document.createElement('div');
    actionGroup.className = 'style-hover-action-group';

    const actionLabel = document.createElement('div');
    actionLabel.className = 'style-hover-group-label';
    actionLabel.textContent = 'search';
    actionGroup.appendChild(actionLabel);

    const actions = document.createElement('div');
    actions.className = 'style-hover-actions';

    const openPinterest = document.createElement('button');
    openPinterest.type = 'button';
    openPinterest.className = 'style-hover-action';
    openPinterest.textContent = 'Pinterest';
    openPinterest.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
    });
    openPinterest.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(pinterestQuickUrl(style), '_blank', 'noopener,noreferrer');
    });
    actions.appendChild(openPinterest);

    const openGoogleImages = document.createElement('button');
    openGoogleImages.type = 'button';
    openGoogleImages.className = 'style-hover-action';
    openGoogleImages.textContent = 'Google';
    openGoogleImages.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
    });
    openGoogleImages.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(googleImagesQuickUrl(style), '_blank', 'noopener,noreferrer');
    });
    actions.appendChild(openGoogleImages);

    actionGroup.appendChild(actions);
    hoverMeta.appendChild(actionGroup);
    body.appendChild(titleWrap);
    body.appendChild(hoverMeta);
    overlay.appendChild(body);

    card.appendChild(img);
    card.appendChild(overlay);

    return card;
  }

  function sampleImagePrompt(style) {
    const mode = directoryMode === 'all' ? styleTypeKey(style) : directoryMode;
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

    function designTraitPhrases() {
      const rawTags = (style?.tags || []).slice(0, 5).map((t) => ascii(t).toLowerCase()).filter(Boolean);
      const tagSet = new Set(rawTags);
      const out = [];
      const push = (s) => { if (s && !out.includes(s)) out.push(s); };

      if (tagSet.has('grid') || tagSet.has('swiss') || tagSet.has('typography')) push('strict grid alignment, clear margins, typographic hierarchy');
      if (tagSet.has('minimal') || tagSet.has('minimalism')) push('clean negative space, restrained layout, sharp information hierarchy');
      if (tagSet.has('brutal') || tagSet.has('brutalism')) push('raw brutal layout, oversized type, high contrast, intentionally rough UI');
      if (tagSet.has('neon') || tagSet.has('glow')) push('neon glow accents, luminous highlights, saturated contrast');
      if (tagSet.has('retro') || tagSet.has('vintage')) push('retro print vibe, halftone texture, aged paper feel');
      if (tagSet.has('y2k') || tagSet.has('chrome')) push('chrome glossy materials, inflated shapes, futuristic UI highlights');
      if (tagSet.has('grain') || tagSet.has('noise') || tagSet.has('texture')) push('subtle grain texture, film-like noise, tactile surfaces');
      if (tagSet.has('glass') || tagSet.has('glassmorphism')) push('translucent glass panels, soft blur layers, specular highlights');
      if (tagSet.has('neumorphism') || tagSet.has('neumorphic')) push('soft extruded surfaces, inner shadows, pill controls');
      if (tagSet.has('color') || tagSet.has('gradient') || tagSet.has('mesh')) push('bold color system, smooth gradients, cohesive palette');
      if (tagSet.has('ornate') || tagSet.has('gothic')) push('ornate details, decorative motifs, dramatic contrast');
      if (tagSet.has('geometric')) push('geometric shapes, crisp edges, strong visual rhythm');
      if (tagSet.has('illustration')) push('illustration-forward composition, clear linework, graphic shapes');

      return out.slice(0, 3).join('. ');
    }

    const preset = (() => {
      const key = String(style?.id || '').trim().toLowerCase();
      if (mode === 'design' && (key === 'ukiyoe' || key === 'ukiyo-e')) {
        return `Modern ukiyo-e inspired woodblock print illustration. Bold ink outlines, flat layered colors, subtle paper texture, traditional Japanese pattern motifs, decorative clouds, strong silhouette, dynamic composition, unmistakably ukiyo-e line rhythm.`;
      }
      return '';
    })();

    const basePrompt = (() => {
      if (mode === 'design') {
        const traits = designTraitPhrases();
        const traitLine = traits ? ` ${traits}.` : '';
        return preset || `Signature graphic design key visual in the ${title} style${withTags}.${traitLine} Clean typography, crisp edges, and an instantly recognizable ${title} vibe.`;
      }
      if (mode === 'artist') {
        const traits = (style?.characteristics || []).slice(0, 3).map((x) => ascii(x)).filter(Boolean).join(', ');
        const media = (style?.media || []).slice(0, 2).map((x) => ascii(x)).filter(Boolean).join(', ');
        const traitLine = traits ? ` Signature traits: ${traits}.` : '';
        const mediaLine = media ? ` Focus on ${media}.` : '';
        return `Reference board inspired by ${title}${withTags}.${mediaLine}${traitLine} Avoid direct copying; study composition, color, lighting, and rhythm that define ${title}.`.trim();
      }
      if (mode === 'character') {
        const t = new Set((style?.tags || []).map((x) => String(x || '').toLowerCase()));
        const isPixel = t.has('pixel') || t.has('pixel-art');
        const is3d = t.has('3d');
        const isChibi = t.has('chibi');
        const isReal = t.has('realistic');
        const isToon = t.has('toon') || t.has('cel-shading');
        const isInk = t.has('manga') || t.has('ink-line');
        const isTurnaround = t.has('turnaround');

        const core = (() => {
          if (isPixel) return 'Pixel sprite readability, limited palette, crisp silhouette, clean outline.';
          if (is3d && isReal) return 'Realistic anatomy, physically plausible shading, studio lighting, clean materials.';
          if (is3d) return '3D stylized character, clean materials, readable silhouette, soft studio lighting.';
          if (isChibi) return 'Chibi proportions (big head, small body), cute facial features, simple shapes.';
          if (isInk) return 'Ink lineart, confident strokes, high readability, poster-friendly contrast.';
          if (isToon) return 'Cel shading, bold shapes, clean linework, graphic color blocks.';
          if (isReal) return 'Natural proportions, believable lighting, subtle texture, grounded character design.';
          return 'Distinct silhouette, clear proportions, readable face, consistent rendering style.';
        })();

        const sheet = isTurnaround ? ' Turnaround-friendly: front/side/back views.' : '';
        return `Signature character reference image in the ${title} style. ${core}${sheet}`;
      }
      if (mode === 'photo') {
        const idRaw = String(style?.id || '').toLowerCase();
        const t = new Set((style?.tags || []).map((x) => String(x || '').toLowerCase()));
        const isPortrait = /portrait|beauty|headshot/.test(idRaw) || t.has('portrait');
        const isProduct = /product|still-life|stilllife/.test(idRaw) || t.has('product');
        const isFood = /food/.test(idRaw) || t.has('food');
        const isInterior = /interior|room|space|architecture/.test(idRaw) || t.has('interior');
        const subject = isPortrait ? 'portrait subject' : isProduct ? 'product on a tabletop' : isFood ? 'food plate' : isInterior ? 'interior space' : 'subject';

        const camera = (() => {
          if (isPortrait) return '85mm lens, three-quarter view, eye-level';
          if (isProduct) return '50mm lens, clean angle, controlled perspective';
          if (isFood) return '50mm lens, top-down or 45-degree angle, shallow depth of field';
          if (isInterior) return '24mm lens, straight verticals, wide composition';
          return 'natural perspective, clear framing';
        })();

        const lighting = (() => {
          if (idRaw.includes('rembrandt')) return 'Rembrandt lighting, defined shadow triangle, soft key';
          if (idRaw.includes('split')) return 'Split lighting, dramatic contrast, hard shadow edge';
          if (idRaw.includes('loop')) return 'Loop lighting, gentle nose shadow, flattering contrast';
          if (idRaw.includes('butterfly')) return 'Butterfly lighting, centered key, clean cheek shadows';
          if (idRaw.includes('clamshell')) return 'Clamshell lighting, soft top key + fill, beauty look';
          if (idRaw.includes('rim') || idRaw.includes('backlit')) return 'Rim/back light, strong separation, controlled flare';
          if (idRaw.includes('high-key')) return 'High-key lighting, low contrast, clean bright background';
          if (idRaw.includes('low-key') || idRaw.includes('noir') || idRaw.includes('chiaroscuro')) return 'Low-key lighting, deep shadows, high contrast';
          if (idRaw.includes('golden-hour')) return 'Golden hour sunlight, warm bounce, soft long shadows';
          if (idRaw.includes('blue-hour')) return 'Blue hour ambience, cool fill, balanced highlights';
          if (idRaw.includes('neon')) return 'Neon practical lights, colored rim, night mood';
          if (idRaw.includes('cinematic')) return 'Cinematic key light, motivated sources, atmospheric depth';
          return 'clear key/fill separation, readable shadows';
        })();

        const colorTone = (() => {
          if (idRaw.includes('noir') || idRaw.includes('chiaroscuro')) return 'monochrome or desaturated grade';
          if (idRaw.includes('film')) return 'film-like grain and subtle halation';
          if (idRaw.includes('neon')) return 'vibrant colored highlights with controlled blacks';
          if (idRaw.includes('golden-hour')) return 'warm grade with soft roll-off';
          if (idRaw.includes('blue-hour')) return 'cool grade with gentle contrast';
          return 'balanced color grade';
        })();

        return `Signature photograph reference for ${title}. ${subject} in a realistic scene, ${camera}. ${lighting}. ${colorTone}.`;
      }
      if (mode === 'palette') {
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
        const lead = (() => {
          if (cat === 'film') return `Cinematic color grade palette for ${title}.`;
          if (cat === 'era') return `Era-inspired color palette for ${title}.`;
          if (cat === 'mood') return `Mood-driven palette expressing ${title}.`;
          if (cat === 'brand') return `Brand color system inspired by ${title}.`;
          if (cat === 'material') return `Material-inspired palette for ${title}.`;
          if (cat === 'lighting') return `Lighting-inspired palette for ${title}.`;
          if (cat === 'season') return `Seasonal palette for ${title}.`;
          if (cat === 'place') return `Place-inspired palette for ${title}.`;
          if (cat === 'use') return `Practical UI-ready palette for ${title}.`;
          if (cat === 'theory') return `Color harmony study palette for ${title}.`;
          return `Color palette for ${title}.`;
        })();
        const tagsHint = withTags ? ` Keywords: ${tagPhrase}.` : '';
        return `${lead}${tagsHint}${hexLine}${catLine}${presetLine}`.trim();
      }
      if (mode === 'pose') {
        const type = String(style?.poseType || style?.id || '').toLowerCase();
        const variant = poseVariantKey(style);
        const typeHint = (() => {
          if (type.includes('walking')) return 'weight shift, heel-to-toe step, natural arm swing';
          if (type.includes('running')) return 'forward lean, long stride, dynamic arm drive';
          if (type.includes('jump')) return 'airborne moment, strong arc, stretched limbs';
          if (type.includes('sitting')) return 'grounded hips, relaxed spine, clear leg placement';
          if (type.includes('crouch')) return 'compressed posture, low center of gravity, tension in legs';
          if (type.includes('kneel')) return 'one knee grounded, stable balance, readable torso angle';
          if (type.includes('lying')) return 'clear torso twist, readable limb overlap, comfortable weight';
          if (type.includes('climb')) return 'reaching grip, pulled body weight, engaged shoulders';
          if (type.includes('dance')) return 'flowing rhythm, expressive arms, dynamic line of action';
          if (type.includes('fight') || type.includes('punch') || type.includes('kick')) return 'impact-ready stance, guarded torso, explosive limb action';
          if (type.includes('aim')) return 'focused aiming line, stable stance, clear arm extension';
          if (type.includes('hold') || type.includes('carry')) return 'supported weight, believable grip, balanced stance';
          if (type.includes('throw')) return 'wind-up to release, torso twist, follow-through';
          if (type.includes('stretch')) return 'extended limbs, clean silhouette, controlled tension';
          if (type.includes('gesture')) return 'expressive hands, readable body language, clear intent';
          if (type.includes('turn')) return 'head/shoulder turn, weight shift, readable twist';
          if (type.includes('reach')) return 'extended arm line, body lean, stable base';
          if (type.includes('push') || type.includes('pull')) return 'opposing forces, planted feet, engaged core';
          if (type.includes('point')) return 'clear pointing line, supportive posture, readable direction';
          if (type.includes('fall')) return 'loss of balance, dynamic tilt, believable collapse';
          return 'readable body mechanics, clear pose intent';
        })();

        const viewHint = (() => {
          if (variant === 'front') return 'front view, symmetrical reference cues';
          if (variant === 'side') return 'side view, clear spine curve and leg angles';
          if (variant === 'back') return 'back view, shoulder/hip rotation visible';
          if (variant === '3-4') return 'three-quarter view, depth in shoulders and pelvis';
          if (variant === 'dynamic') return 'dynamic camera, strong action line';
          if (variant === 'silhouette') return 'clean silhouette readability';
          if (variant === 'foreshortening') return 'strong foreshortening, bold perspective overlap';
          if (variant === 'low-angle') return 'low angle camera, heroic proportions';
          if (variant === 'high-angle') return 'high angle camera, compressed depth';
          if (variant === 'key-pose') return 'iconic key pose, clear staging';
          return 'neutral camera, clear anatomy landmarks';
        })();

        return `Pose reference image for ${title}. Single figure full body, ${viewHint}. ${typeHint}.`;
      }
      return `Signature image that represents ${title}${withTags}.`;
    })();

    return basePrompt;
  }

  const legacySampleImagePrompt = sampleImagePrompt;

  function promptContextLine(style) {
    const mode = referenceMode(style);
    const keywords = referenceFocusTerms(style, 3).join(', ');
    const mood = uniqueText(style?.moods || []).slice(0, 2).join(', ');
    const useCase = uniqueText(style?.useCases || []).slice(0, 2).join(', ');
    const keywordLine = keywords ? ` Key traits: ${keywords}.` : '';
    const moodLine = mood ? ` Mood: ${mood}.` : '';
    const useLine = useCase ? ` Use case: ${useCase}.` : '';
    if (mode === 'palette') {
      const hex = (Array.isArray(style?.colors) ? style.colors : []).slice(0, 5).join(' ');
      return `${keywordLine}${moodLine}${useLine}${hex ? ` Use these exact colors: ${hex}.` : ''}`.trim();
    }
    return `${keywordLine}${moodLine}${useLine}`.trim();
  }

  function buildPromptBundle(style) {
    const mode = referenceMode(style);
    const title = searchPhrase(style?.en || style?.id || style?.ko || 'reference');
    const base = legacySampleImagePrompt(style);
    const context = promptContextLine(style);
    const useTarget = uniqueText(style?.useCases || [])[0] || (mode === 'design' ? 'campaign key visual' : mode === 'character' ? 'character sheet' : mode === 'photo' ? 'editorial photo concept' : mode === 'palette' ? 'moodboard board' : mode === 'pose' ? 'key pose scene' : 'reference board');

    const transformTail = (() => {
      if (mode === 'design') return 'Preserve the original composition and content hierarchy while redesigning the visual language.';
      if (mode === 'character') return 'Preserve identity, silhouette, and facial readability while changing rendering and costume language.';
      if (mode === 'photo') return 'Preserve framing, subject position, and realism while changing lighting, grading, and atmosphere.';
      if (mode === 'palette') return 'Preserve composition and materials, but recolor the whole image using only the target palette.';
      if (mode === 'pose') return 'Preserve anatomy, balance, and camera angle while refining pose clarity and staging.';
      return 'Preserve the main subject and composition while reinterpreting the visual language.';
    })();

    const expandTail = (() => {
      if (mode === 'design') return `Expand this style into a ${useTarget} with fresh messaging, stronger hierarchy, and one unexpected visual twist.`;
      if (mode === 'character') return `Expand this style into a ${useTarget} with new costume, role, and expression variations.`;
      if (mode === 'photo') return `Expand this direction into a ${useTarget} with a clearer shot concept, prop logic, and lighting story.`;
      if (mode === 'palette') return `Expand this palette into a ${useTarget} showing primary, secondary, accent, and background usage.`;
      if (mode === 'pose') return `Expand this pose into a ${useTarget} with clearer intent, stronger line of action, and story context.`;
      return `Expand this direction into a ${useTarget} with a new scenario, stronger storytelling, and clearer focal hierarchy.`;
    })();

    return {
      generate: base,
      transform: `Use the attached image as the source for a ${title} reinterpretation. ${transformTail} ${context}`.trim(),
      expand: `Create an original concept inspired by ${title}. ${expandTail} ${context}`.trim()
    };
  }

  function sampleImagePrompt(style) {
    return buildPromptBundle(style).generate;
  }

  function buildPromptBundle(style) {
    const mode = referenceMode(style);
    const title = searchPhrase(style?.en || style?.id || style?.ko || 'reference');
    const context = promptContextLine(style);
    const useTarget = uniqueText(style?.useCases || [])[0] || (mode === 'design' ? 'campaign key visual' : mode === 'character' ? 'character sheet' : mode === 'photo' ? 'editorial photo concept' : mode === 'palette' ? 'moodboard board' : mode === 'pose' ? 'key pose scene' : 'reference board');

    const generate = (() => {
      if (mode === 'design') return `Create a polished visual design reference for ${title}. Build a clear hierarchy, a strong type system, a deliberate spacing rhythm, and one dominant graphic gesture. ${context}`.trim();
      if (mode === 'artist') return `Create an original image that captures the visual language associated with ${title}. Focus on composition rhythm, palette, medium texture, and recurring motifs without directly copying a specific work. ${context}`.trim();
      if (mode === 'character') return `Create a character style reference for ${title}. Show a readable silhouette, clear costume logic, strong material separation, and a finished rendering approach. ${context}`.trim();
      if (mode === 'photo') return `Create a photographic reference for ${title}. Show a believable subject, intentional framing, clear lighting direction, and a controlled color grade. ${context}`.trim();
      if (mode === 'palette') return `Create a palette-driven moodboard for ${title}. Show primary, secondary, accent, and background color usage with clean swatches and a coherent visual mood. ${context}`.trim();
      if (mode === 'pose') return `Create a single-figure pose reference for ${title}. Keep the full body readable, the line of action strong, and the silhouette clear from first glance. ${context}`.trim();
      return `${legacySampleImagePrompt(style)} ${context}`.trim();
    })();

    const transformTail = (() => {
      if (mode === 'design') return 'Preserve the original composition and content hierarchy while redesigning the visual language.';
      if (mode === 'character') return 'Preserve identity, silhouette, and facial readability while changing rendering and costume language.';
      if (mode === 'photo') return 'Preserve framing, subject position, and realism while changing lighting, grading, and atmosphere.';
      if (mode === 'palette') return 'Preserve composition and materials, but recolor the whole image using only the target palette.';
      if (mode === 'pose') return 'Preserve anatomy, balance, and camera angle while refining pose clarity and staging.';
      return 'Preserve the main subject and composition while reinterpreting the visual language.';
    })();

    const expandTail = (() => {
      if (mode === 'design') return `Expand this style into a ${useTarget} with fresh messaging, stronger hierarchy, and one unexpected visual twist.`;
      if (mode === 'character') return `Expand this style into a ${useTarget} with new costume, role, and expression variations.`;
      if (mode === 'photo') return `Expand this direction into a ${useTarget} with a clearer shot concept, prop logic, and lighting story.`;
      if (mode === 'palette') return `Expand this palette into a ${useTarget} showing primary, secondary, accent, and background usage.`;
      if (mode === 'pose') return `Expand this pose into a ${useTarget} with clearer intent, stronger line of action, and story context.`;
      return `Expand this direction into a ${useTarget} with a new scenario, stronger storytelling, and clearer focal hierarchy.`;
    })();

    return {
      generate,
      transform: `Use the attached image as the source for a ${title} reinterpretation. ${transformTail} ${context}`.trim(),
      expand: `Create an original concept inspired by ${title}. ${expandTail} ${context}`.trim()
    };
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
  function recommendedSortScore(style) {
    const q = normalize(query);
    if (!q) return 0;
    const names = [style.ko, style.en, style.id].map(normalize).filter(Boolean);
    if (names.some((value) => value === q)) return 160;
    if (names.some((value) => value.startsWith(q))) return 120;
    if (names.some((value) => value.includes(q))) return 80;

    let score = 0;
    const tags = (style.tags || []).map(normalize);
    const searchTokens = (style.searchTokens || []).map(normalize);
    const characteristics = (style.characteristics || []).map(normalize);
    const moods = (style.moods || []).map(normalize);
    const useCases = (style.useCases || []).map(normalize);
    const haystacks = [tags, searchTokens, characteristics, moods, useCases];

    haystacks.forEach((list, index) => {
      const weight = index === 0 ? 36 : index === 1 ? 28 : 16;
      list.forEach((value) => {
        if (!value) return;
        if (value === q) score += weight;
        else if (value.startsWith(q)) score += Math.max(10, weight - 8);
        else if (value.includes(q)) score += Math.max(6, weight - 12);
      });
    });
    return score;
  }
  function deriveTags(style, mode = directoryMode) {
    if (mode === 'character') return deriveCharacterTags(style);
    if (mode === 'palette') return derivePaletteTags(style);
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

  function deriveCharacterTags(style) {
    const raw = `${style.id || ''} ${style.en || ''} ${style.ko || ''}`.toLowerCase();
    const has = (re) => re.test(raw);

    const medium = (() => {
      if (has(/\b(8bit|16bit|pixel|sprite|voxel)\b/)) return 'pixel';
      if (has(/\b(3d|cgi|render|pbr|realistic|realism|lowpoly|low-poly|clay|toon)\b/)) return '3d';
      return '2d';
    })();

    const styleTag = (() => {
      if (has(/\b(chibi)\b/) || has(/치비/)) return 'chibi';
      if (has(/\b(anime)\b/) || has(/애니/)) return 'anime';
      if (has(/\b(manga|manhwa)\b/) || has(/만화/)) return 'manga';
      if (has(/\b(pixel)\b/) || has(/\b(8bit|16bit)\b/)) return 'pixel-art';
      if (has(/\b(lowpoly|low-poly)\b/)) return 'lowpoly';
      if (has(/\b(realistic|realism)\b/)) return 'realistic';
      if (has(/\b(toon|cartoon)\b/) || has(/카툰/)) return 'toon';
      if (has(/\b(cel)\b/) || has(/셀/)) return 'cel-shading';
      if (has(/\b(lineart|ink)\b/) || has(/잉크/)) return 'ink-line';
      if (has(/\b(watercolor)\b/) || has(/수채/)) return 'watercolor';
      if (has(/\b(vector)\b/)) return 'vector';
      if (has(/\b(stylized)\b/) || has(/스타일/)) return 'stylized';
      return medium === '3d' ? 'stylized' : 'illustration';
    })();

    const useTag = (() => {
      if (has(/\b(turnaround|sheet)\b/) || has(/시트|턴어라운드/)) return 'turnaround';
      if (has(/\b(mascot)\b/) || has(/마스코트/)) return 'mascot';
      if (has(/\b(game)\b/) || has(/게임/)) return 'game';
      if (has(/\b(concept)\b/)) return 'concept';
      return 'character';
    })();

    const out = [medium, styleTag, useTag].filter(Boolean);
    const uniqOut = [];
    out.forEach((t) => { if (!uniqOut.includes(t)) uniqOut.push(t); });
    return uniqOut.slice(0, 3);
  }

  function derivePaletteTags(style) {
    const raw = `${style.id || ''} ${style.en || ''} ${style.ko || ''}`.toLowerCase();
    const has = (re) => re.test(raw);
    const cat = paletteCategoryKey(style);

    const tone = (() => {
      if (has(/\b(monochrome|mono)\b/) || has(/모노|단색/)) return 'monochrome';
      if (has(/\b(pastel)\b/) || has(/파스텔/)) return 'pastel';
      if (has(/\b(muted)\b/) || has(/뮤트|저채도/)) return 'muted';
      if (has(/\b(neon)\b/) || has(/네온/)) return 'neon';
      if (has(/\b(vivid)\b/) || has(/비비드/)) return 'vivid';
      if (has(/\b(earth|earthy)\b/) || has(/어스|내추럴/)) return 'earthy';
      if (has(/\b(warm)\b/) || has(/웜/)) return 'warm';
      if (has(/\b(cool)\b/) || has(/쿨/)) return 'cool';
      if (has(/\b(dark)\b/) || has(/다크/)) return 'dark';
      return (cat === 'film') ? 'cinematic' : (cat === 'use' ? 'ui' : 'balanced');
    })();

    const use = (() => {
      if (cat === 'brand') return 'brand';
      if (cat === 'use') return 'ui';
      if (cat === 'film') return 'cinematic';
      if (cat === 'lighting') return 'photo';
      if (cat === 'material') return 'material';
      if (cat === 'place') return 'place';
      if (cat === 'season') return 'seasonal';
      if (cat === 'theory') return 'harmony';
      if (cat === 'era') return 'era';
      if (cat === 'mood') return 'mood';
      return 'palette';
    })();

    const theme = (() => {
      if (has(/\b(kids|kid)\b/) || has(/키즈/)) return 'kids';
      if (has(/\b(lux|luxe|luxury)\b/) || has(/럭셔리/)) return 'luxe';
      if (has(/\b(eco|nature|organic)\b/) || has(/에코|네이처/)) return 'eco';
      if (has(/\b(cyber|cyberpunk)\b/) || has(/사이버/)) return 'cyberpunk';
      if (has(/\b(wes)\b/) || has(/웨스/)) return 'whimsical';
      if (has(/\b(matrix)\b/) || has(/매트릭/)) return 'matrix';
      if (has(/\b(blade)\b/) || has(/블레이드/)) return 'neo-noir';
      if (has(/\b(holiday|christmas)\b/) || has(/홀리데이/)) return 'holiday';
      return (cat === 'mood') ? 'atmosphere' : 'concept';
    })();

    const out = [tone, use, theme].filter(Boolean);
    const uniqOut = [];
    out.forEach((t) => { if (!uniqOut.includes(t)) uniqOut.push(t); });
    return uniqOut.slice(0, 3);
  }

  function inferAliases(style, mode = directoryMode) {
    if (Array.isArray(style.aliases) && style.aliases.length) {
      return uniqueText([
        ...style.aliases,
        style.ko,
        style.en,
        style.id,
        style.palettePresetLabel
      ]).slice(0, 8);
    }
    const aliases = [
      style.ko,
      style.en,
      style.id,
      style.palettePresetLabel
    ];
    if (mode === 'pose') {
      aliases.push(String(style.poseType || '').replace(/-/g, ' '));
      aliases.push(poseVariantLabel(poseVariantKey(style)));
    }
    return uniqueText(aliases).slice(0, 6);
  }

  function inferSearchTokens(style, mode = directoryMode) {
    const provided = Array.isArray(style.searchTokens) ? style.searchTokens : [];
    const raw = [
      ...provided,
      style.ko,
      style.en,
      style.id,
      style.q,
      ...(Array.isArray(style.tags) ? style.tags : []),
      ...(Array.isArray(style.characteristics) ? style.characteristics : [])
    ];
    if (mode === 'palette') raw.push(style.palettePresetLabel, paletteCategoryLabel(paletteCategoryKey(style)));
    if (mode === 'pose') raw.push(style.poseType, poseVariantKey(style));
    return uniqueText(raw.flatMap(tokenize).map((token) => prettifyToken(token))).slice(0, 10);
  }

  function inferMedia(style, mode = directoryMode) {
    if (Array.isArray(style.media) && style.media.length) return uniqueText(style.media).slice(0, 3);
    if (mode === 'pose') return ['Pose Reference', 'Figure Drawing'];
    if (mode === 'palette') return ['Color System', 'Palette'];
    if (mode === 'photo') {
      const raw = `${style.id || ''} ${style.en || ''}`.toLowerCase();
      if (/\b(portra|cinestill|kodachrome|provia|film)\b/.test(raw)) return ['Photography', 'Film Look'];
      if (/\b(portrait|lighting|studio)\b/.test(raw)) return ['Photography', 'Lighting'];
      return ['Photography'];
    }
    if (mode === 'character') {
      const tags = new Set((style.tags || []).map((t) => String(t || '').toLowerCase()));
      if (tags.has('3d')) return ['Character Design', '3D'];
      if (tags.has('pixel') || tags.has('pixel-art')) return ['Character Design', 'Pixel Art'];
      if (tags.has('vector')) return ['Character Design', 'Vector'];
      return ['Character Design', 'Illustration'];
    }
    const raw = `${style.id || ''} ${style.en || ''}`.toLowerCase();
    if (/\b(ui|dashboard|saas|ecommerce|app)\b/.test(raw)) return ['UI Design', 'Digital Product'];
    if (/\b(poster|editorial|magazine|typography)\b/.test(raw)) return ['Graphic Design', 'Editorial'];
    return ['Design Reference'];
  }

  function inferUseCases(style, mode = directoryMode) {
    if (Array.isArray(style.useCases) && style.useCases.length) return uniqueText(style.useCases).slice(0, 3);
    if (mode === 'pose') return ['Figure Study', 'Gesture Practice', 'Blocking'];
    if (mode === 'palette') {
      return uniqueText([
        paletteCategoryLabel(paletteCategoryKey(style)),
        'Color Direction',
        'Moodboard'
      ]).slice(0, 3);
    }
    if (mode === 'photo') return ['Lighting Study', 'Shot Planning', 'Mood Reference'];
    if (mode === 'character') {
      const raw = `${style.id || ''} ${style.en || ''}`.toLowerCase();
      const out = ['Character Design'];
      if (/\b(game|rpg|mascot)\b/.test(raw)) out.push('Game / Mascot');
      if (/\b(anime|manga|manhwa|webtoon)\b/.test(raw)) out.push('Illustration');
      out.push('Style Exploration');
      return uniqueText(out).slice(0, 3);
    }
    const raw = `${style.id || ''} ${style.en || ''}`.toLowerCase();
    const out = [];
    if (/\b(ui|dashboard|saas|app|ecommerce)\b/.test(raw)) out.push('Product UI');
    if (/\b(poster|editorial|magazine|zine)\b/.test(raw)) out.push('Editorial / Poster');
    if (/\b(brand|identity|token|system)\b/.test(raw)) out.push('Brand System');
    out.push('Visual Direction');
    return uniqueText(out).slice(0, 3);
  }

  function inferMoods(style, mode = directoryMode) {
    if (Array.isArray(style.moods) && style.moods.length) return uniqueText(style.moods).slice(0, 3);
    const raw = `${style.id || ''} ${style.en || ''} ${style.ko || ''} ${(style.tags || []).join(' ')}`.toLowerCase();
    const out = [];
    const push = (label, re) => { if (re.test(raw)) out.push(label); };
    push('Minimal', /\b(minimal|mono|swiss|clean)\b/);
    push('Bold', /\b(brutal|bold|maximal|acid|contrast)\b/);
    push('Playful', /\b(kawaii|cute|memphis|playful|pop)\b/);
    push('Retro', /\b(retro|vintage|y2k|80s|90s|mid-century)\b/);
    push('Cinematic', /\b(cinematic|film|noir|moody|dramatic)\b/);
    push('Soft', /\b(soft|pastel|gentle|dreamy)\b/);
    push('Neon', /\b(neon|cyber|glow|vaporwave)\b/);
    push('Organic', /\b(earth|forest|nature|organic|wabi)\b/);
    push('Energetic', /\b(dynamic|sport|action|vivid)\b/);
    if (!out.length) out.push(mode === 'pose' ? 'Study' : 'Reference');
    return uniqueText(out).slice(0, 3);
  }

  function buildSourceLinks(figures) {
    return (Array.isArray(figures) ? figures : [])
      .map((name) => String(name || '').trim())
      .filter(Boolean)
      .map((name) => ({ label: name, url: figureUrl(name) }));
  }

  function buildOverview(style, mode = directoryMode) {
    const titleKo = String(style.ko || '').trim();
    const titleEn = String(style.en || '').trim();
    const tags = (style.tags || []).slice(0, 3);
    const topChars = (style.characteristics || []).slice(0, 4);
    const name = titleEn && titleKo ? `${titleEn}(${titleKo})` : (titleKo || titleEn || String(style.id || ''));
    const points = (topChars.length ? topChars : tags).slice(0, 3);

    if (mode === 'pose') {
      return [
        `${name}는 1인 포즈/행동/동작 레퍼런스를 빠르게 찾기 위한 카드입니다.`,
        `실루엣이 읽히는지 → 무게중심/접지 → 라인 오브 액션 순으로 체크하세요.`,
        `동작이 밋밋하면 angle·dynamic·foreshortening 같은 수식어를 추가해보세요.`,
        `핵심 포인트: ${points.join(' · ')}.`
      ].join('\n');
    }

    if (mode === 'palette') {
      const sample = Array.isArray(style.colors) ? style.colors.slice(0, 5).map((c) => String(c).toUpperCase()).join(' ') : '';
      return [
        `${name}는 컬러 팔레트 레퍼런스를 빠르게 찾기 위한 카드입니다.`,
        `주색/보조색/강조색 역할을 분리하고, 텍스트 대비(가독성)를 먼저 확인하세요.`,
        `UI면 ‘ui palette / tokens’, 브랜드면 ‘brand palette / color system’이 유리합니다.`,
        sample ? `샘플: ${sample}` : `핵심 포인트: ${points.join(' · ')}.`
      ].join('\n');
    }

    if (mode === 'photo') {
      return [
        `${name}는 사진/라이팅 톤 레퍼런스를 빠르게 찾기 위한 카드입니다.`,
        `키라이트 방향(키/필/림)과 그림자 성격(하드/소프트)을 먼저 고정하세요.`,
        `무드를 올리려면 ‘cinematic / color grading / film’ 같은 토큰을 함께 검색하세요.`,
        `핵심 포인트: ${points.join(' · ')}.`
      ].join('\n');
    }

    if (mode === 'character') {
      return [
        `${name}는 캐릭터 스타일/표현 방식을 빠르게 찾기 위한 카드입니다.`,
        `형태 언어(둥글/각/삼각)와 렌더 방식(셀/소프트/리얼)을 먼저 고정하세요.`,
        `설정이 필요하면 ‘turnaround / expression sheet’ 같은 키워드를 추가해보세요.`,
        `핵심 포인트: ${points.join(' · ')}.`
      ].join('\n');
    }

    if (mode === 'artist') {
      return [
        `${name}는 작가의 시각 언어를 빠르게 찾기 위한 카드입니다.`,
        `대표 매체와 반복되는 연출(색, 구도, 질감, 리듬)을 먼저 고정하세요.`,
        `검색할 때는 ‘frames / stills / illustration / photography / painting’ 같은 매체 키워드를 함께 붙이세요.`,
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

  function classifyEra(style, mode = directoryMode) {
    if (Array.isArray(style.eras) && style.eras.length) return uniqueText(style.eras)[0] || 'Timeless';
    if (mode === 'palette' && paletteCategoryKey(style) === 'era') return 'Era-based';
    if (mode === 'photo') {
      const raw = `${style.id || ''} ${style.en || ''}`.toLowerCase();
      if (/\b(portra|cinestill|kodachrome|provia|film)\b/.test(raw)) return 'Analog / Film';
      return 'Contemporary';
    }
    if (mode === 'character') {
      const raw = `${style.id || ''} ${style.en || ''}`.toLowerCase();
      if (/\b(retro|victorian|medieval|ukiyoe|baroque|rococo|renaissance)\b/.test(raw)) return 'Historical / Retro';
      return 'Contemporary';
    }
    if (mode === 'pose') return 'Timeless';
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

  function classifyRegions(style, mode = directoryMode) {
    if (Array.isArray(style.regions) && style.regions.length) return uniqueText(style.regions).slice(0, 3);
    if (mode === 'palette') {
      if (paletteCategoryKey(style) === 'place') return ['Place-based'];
      return ['Global'];
    }
    if (mode === 'photo' || mode === 'pose') return ['Global'];
    if (mode === 'character') {
      const raw = `${style.id || ''} ${style.en || ''}`.toLowerCase();
      if (/\b(anime|manga|manhwa|ukiyoe|samurai|harajuku)\b/.test(raw)) return ['East Asia'];
      if (/\b(comic|noir|superhero)\b/.test(raw)) return ['North America'];
      if (/\b(victorian|medieval|baroque|rococo)\b/.test(raw)) return ['Europe'];
      return ['Global'];
    }
    const id = style.id;
    if (['swiss', 'bauhaus', 'de-stijl', 'constructivism', 'art-deco', 'art-nouveau', 'renaissance', 'baroque', 'rococo', 'neoclassicism', 'romanticism', 'memphis'].includes(id)) {
      return ['Europe'];
    }
    if (['japanese-minimal', 'wabi-sabi', 'kawaii'].includes(id)) return ['East Asia'];
    if (['corporate-memphis'].includes(id)) return ['North America'];
    return ['Global'];
  }

  function buildQuery(style, mode = directoryMode) {
    if (QUERY_OVERRIDES[style.id]) return QUERY_OVERRIDES[style.id];
    if (mode === 'artist') return `${style.en} visual style reference`;
    if (mode === 'character') return `${style.en} character illustration style`;
    if (mode === 'photo') return `${style.en} photography lighting style`;
    if (mode === 'palette') return `${style.en} color palette`;
    if (mode === 'pose') return `${style.en} pose reference`;
    return `${style.en} design style`;
  }

  function enrichStyle(s, mode = directoryMode, curatedRank = 0) {
    const tags = uniq([...(Array.isArray(s.tags) ? s.tags : []), ...deriveTags(s, mode)]).slice(0, 3);
    const overviewCandidate = String(s.overview || NOTE_OVERRIDES[s.id] || s.note || '').trim();
    const overview = (overviewCandidate && overviewCandidate.split('\n').filter(Boolean).length >= 3)
      ? overviewCandidate
      : buildOverview({ ...s, tags, characteristics: s.characteristics || tags.slice(0, 3).map((t) => t.replace(/-/g, ' ')) }, mode);
    const figures = s.figures || KEY_FIGURES[s.id] || [];
    const characteristics = s.characteristics || tags.slice(0, 3).map((t) => t.replace(/-/g, ' '));
    const q = s.q || buildQuery(s, mode);
    const colors = (mode === 'palette' && Array.isArray(s.colors))
      ? normalizePaletteColors(s.colors)
      : s.colors;
    const eras = Array.isArray(s.eras) && s.eras.length
      ? uniqueText(s.eras).slice(0, 2)
      : uniqueText([classifyEra(s, mode)]).slice(0, 2);
    const regions = Array.isArray(s.regions) && s.regions.length
      ? uniqueText(s.regions).slice(0, 3)
      : uniqueText(classifyRegions(s, mode)).slice(0, 3);
    const aliases = inferAliases(s, mode);
    const searchTokens = inferSearchTokens({ ...s, tags, characteristics, q }, mode);
    const moods = inferMoods({ ...s, tags }, mode);
    const useCases = inferUseCases({ ...s, tags }, mode);
    const media = inferMedia({ ...s, tags }, mode);
    const sourceLinks = buildSourceLinks(figures);
    return {
      ...s,
      type: mode,
      curatedRank,
      tags,
      overview,
      figures,
      characteristics,
      q,
      poseType: s.poseType,
      colors,
      aliases,
      searchTokens,
      moods,
      useCases,
      eras,
      regions,
      media,
      sourceLinks
    };
  }

  function loadStyles() {
    if (directoryMode === 'all') {
      STYLES = [...allReferences()];
      return STYLES;
    }
    const raw = sourceDataForDirectory(directoryMode);
    STYLES = raw.map((item, index) => enrichStyle(item, directoryMode, index));
    return STYLES;
  }

  function relatedStylesFor(styleId, limit = 12) {
    const base = STYLES.find((s) => s.id === styleId);
    if (!base) return [];
    const baseTags = new Set(base.tags || []);
    const scored = STYLES
      .filter((s) => s.id !== styleId)
      .filter((s) => !base.type || s.type === base.type)
      .map((s) => {
      let inter = 0;
      for (const t of s.tags || []) if (baseTags.has(t)) inter += 1;
      const union = new Set([...(s.tags || []), ...(base.tags || [])]).size || 1;
      return { s, score: inter / union };
      });
    scored.sort((a, b) => b.score - a.score);
    return scored.filter((x) => x.score > 0).slice(0, limit).map((x) => x.s);
  }

  function allReferences() {
    if (allReferencesCache) return allReferencesCache;
    const out = [];
    let curatedRank = 0;
    DATA_DIRECTORY_MODES.forEach((mode) => {
      sourceDataForDirectory(mode).forEach((item) => {
        out.push(enrichStyle(item, mode, curatedRank));
        curatedRank += 1;
      });
    });
    allReferencesCache = out;
    return out;
  }

  function currentSelectedStyle() {
    return STYLES.find((style) => style.id === selectedStyleId) || null;
  }

  function detailIsOpen() {
    return Boolean(dom.detailPanel && !dom.detailPanel.hidden);
  }

  function closeDetail() {
    if (!dom.detailPanel) return;
    dom.detailPanel.hidden = true;
    document.body.classList.remove('detail-open');
    detailStyleId = '';
  }

  function buildDetailFacts(style) {
    const facts = [
      ['Type', directoryLabel(style.type)],
      ['Media', uniqueText(style.media).slice(0, 2).join(' / ')],
      ['Use', uniqueText(style.useCases).slice(0, 2).join(' / ')],
      ['Mood', uniqueText(style.moods).slice(0, 2).join(' / ')],
      ['Era', uniqueText(style.eras).slice(0, 1).join(' / ')],
      ['Region', uniqueText(style.regions).slice(0, 2).join(' / ')]
    ];
    if (style.type === 'palette' && Array.isArray(style.colors) && style.colors.length) {
      facts.push(['Colors', `${style.colors.length} swatches`]);
    }
    if (style.type === 'pose') {
      facts.push(['Angle', poseVariantLabel(poseVariantKey(style))]);
    }
    return facts.filter(([, value]) => String(value || '').trim());
  }

  function detailSignalItems(style) {
    if (style.type === 'pose') {
      return uniqueText([
        poseVariantLabel(poseVariantKey(style)),
        prettifyToken(style.poseType || 'pose'),
        'Line of action'
      ]).slice(0, 3);
    }
    if (style.type === 'palette' && Array.isArray(style.colors) && style.colors.length) {
      return uniqueText([
        `${style.colors.length} color swatches`,
        ...(style.characteristics || []),
        ...(style.tags || []).map(prettifyToken)
      ]).slice(0, 3);
    }
    return uniqueText([
      ...(style.characteristics || []),
      ...(style.tags || []).map(prettifyToken)
    ]).slice(0, 3);
  }

  function detailUseCaseItems(style) {
    const provided = uniqueText(style.useCases || []).slice(0, 3);
    if (provided.length) return provided;
    if (style.type === 'design') return ['Visual Direction', 'Layout Review', 'System Reference'];
    if (style.type === 'character') return ['Style Exploration', 'Character Sheet', 'Key Art'];
    if (style.type === 'photo') return ['Lighting Study', 'Shot Planning', 'Mood Reference'];
    if (style.type === 'artist') return ['Style Study', 'Mood Reference', 'Art Direction'];
    if (style.type === 'palette') return ['Color Direction', 'Moodboard', 'Contrast Review'];
    if (style.type === 'pose') return ['Figure Study', 'Gesture Practice', 'Blocking'];
    return ['Reference'];
  }

  function detailKeywordItems(style) {
    const out = uniqueText([
      ...(style.searchTokens || []).map(prettifyToken),
      ...(style.characteristics || []),
      ...(style.tags || []).map(prettifyToken)
    ]).slice(0, 6);
    return out.length ? out : [directoryShortLabel(style.type)];
  }

  function buildDetailDefinition(style) {
    const focus = detailSignalItems(style);
    const focusText = focus.length ? focus.join(', ') : directoryShortLabel(style.type);
    if (style.type === 'artist') {
      const media = uniqueText(style.media || [])[0] || 'Visual';
      return `${focusText}가 반복적으로 드러나는 ${media} 기반 작가 레퍼런스.`;
    }
    if (style.type === 'character') {
      return `${focusText}가 두드러지는 캐릭터 스타일 레퍼런스.`;
    }
    if (style.type === 'photo') {
      return `${focusText}를 기준으로 참고하기 좋은 포토그래피 레퍼런스.`;
    }
    if (style.type === 'palette') {
      return `${focusText} 중심으로 컬러 방향을 잡을 때 참고하기 좋은 팔레트 레퍼런스.`;
    }
    if (style.type === 'pose') {
      return `${poseVariantLabel(poseVariantKey(style))} 각도의 ${prettifyToken(style.poseType || 'pose')} 포즈 레퍼런스.`;
    }
    return `${focusText} 중심의 디자인 레퍼런스.`;
  }

  const DESCRIPTION_TERM_MAP = Object.freeze({
    all: '통합',
    design: '디자인',
    character: '캐릭터',
    photo: '사진',
    palette: '컬러 팔레트',
    pose: '포즈',
    artist: '작가',
    graphic: '그래픽',
    layout: '레이아웃',
    typography: '타이포그래피',
    ornamental: '장식',
    historical: '역사성',
    poster: '포스터',
    print: '인쇄',
    texture: '질감',
    editorial: '에디토리얼',
    experimental: '실험적',
    postmodern: '포스트모던',
    retro: '레트로',
    digital: '디지털',
    trend: '트렌드',
    ui: 'UI',
    interface: '인터페이스',
    product: '제품',
    dashboard: '대시보드',
    mobile: '모바일',
    app: '앱',
    web: '웹',
    marketing: '마케팅',
    commerce: '커머스',
    branding: '브랜딩',
    identity: '아이덴티티',
    system: '시스템',
    packaging: '패키징',
    brand: '브랜드',
    publication: '출판',
    information: '정보',
    diagram: '다이어그램',
    motion: '모션',
    title: '타이틀',
    broadcast: '브로드캐스트',
    campaign: '캠페인',
    illustration: '일러스트',
    color: '컬러',
    minimal: '미니멀',
    spatial: '공간감',
    enterprise: '엔터프라이즈',
    storytelling: '스토리텔링',
    interactive: '인터랙티브',
    future: '미래지향',
    game: '게임',
    '2d': '2D',
    anime: '애니',
    toon: '툰',
    manga: '만화',
    comic: '코믹',
    kawaii: '카와이',
    cartoon: '카툰',
    'ink-line': '잉크 라인',
    realistic: '리얼리스틱',
    '3d': '3D',
    stylized: '스타일라이즈드',
    pixel: '픽셀',
    'pixel-art': '픽셀 아트',
    concept: '컨셉',
    creature: '크리처',
    monster: '몬스터',
    mecha: '메카',
    fantasy: '판타지',
    'sci-fi': 'SF',
    sheet: '시트',
    portrait: '인물',
    lighting: '라이팅',
    dramatic: '드라마틱',
    natural: '자연광',
    street: '스트리트',
    documentary: '다큐멘터리',
    fashion: '패션',
    'still-life': '정물',
    food: '푸드',
    beverage: '음료',
    architecture: '건축',
    interior: '인테리어',
    landscape: '풍경',
    nature: '자연',
    action: '액션',
    sports: '스포츠',
    macro: '매크로',
    detail: '디테일',
    film: '필름',
    grade: '컬러 그레이딩',
    'black-white': '흑백',
    process: '프로세스',
    composition: '구도',
    framing: '프레이밍',
    lens: '렌즈',
    depth: '심도',
    night: '야간',
    urban: '도시',
    event: '이벤트',
    wedding: '웨딩',
    travel: '여행',
    culture: '문화',
    cinema: '영화',
    frames: '프레임',
    production: '프로덕션',
    auteur: '작가주의',
    author: '작가성',
    stills: '스틸',
    genre: '장르',
    photography: '포토그래피',
    'fine-art': '파인아트',
    staged: '연출형',
    animation: '애니메이션',
    background: '배경미술',
    painting: '회화',
    master: '거장',
    modern: '근현대',
    global: '글로벌',
    'cross-media': '크로스미디어',
    childrens: '아동서',
    'visual direction': '시각 방향 설정',
    'layout review': '레이아웃 검토',
    'system reference': '시스템 레퍼런스',
    'style exploration': '스타일 탐색',
    'character sheet': '캐릭터 시트 제작',
    'key art': '키아트 구상',
    'lighting study': '라이팅 스터디',
    'shot planning': '샷 플래닝',
    'mood reference': '무드 레퍼런스',
    'style study': '스타일 스터디',
    'art direction': '아트 디렉션',
    'color direction': '컬러 방향 설정',
    moodboard: '무드보드',
    'contrast review': '대비 검토',
    'figure study': '인체 스터디',
    'gesture practice': '제스처 연습',
    blocking: '블로킹 구상',
    contemporary: '동시대',
    'pre-1900': '1900년 이전',
    europe: '유럽',
    'east asia': '동아시아',
    'north america': '북미',
    cinematic: '영화적인',
    controlled: '절제된',
    emotional: '감정적인',
    meditative: '사색적인',
    intense: '강렬한',
    curated: '정제된',
    bold: '대담한',
    humanist: '휴머니스트적인',
    observational: '관찰적인',
    conceptual: '개념적인',
    atmospheric: '분위기 있는',
    vivid: '선명한',
    expressive: '표현적인',
    imaginative: '상상력 있는',
    wonder: '경이로운',
    decorative: '장식적인',
    epic: '서사적인',
    designed: '설계된',
    warm: '따뜻한',
    storybook: '동화적인',
    classical: '고전적인',
    luminous: '빛감 있는',
    painterly: '회화적인',
    memorable: '기억에 남는',
    intentional: '의도적인',
    distinctive: '개성적인',
    'line of action': '라인 오브 액션'
  });

  const DESCRIPTION_PHRASE_MAP = Object.freeze({
    'Structured composition': '구조적인 구성',
    'Typographic hierarchy': '타이포그래피 위계',
    'Intentional spacing': '의도적인 여백',
    'Decorative detail': '장식적인 디테일',
    'Period-driven mood': '시대감 있는 무드',
    'Strong visual identity': '강한 시각 정체성',
    'Printed texture': '인쇄 질감',
    'Analog imperfection': '아날로그 특유의 불완전성',
    'Material richness': '풍부한 재료감',
    'Unexpected hierarchy': '예상 밖의 위계',
    'Expressive composition': '표현적인 구성',
    'Intentional disruption': '의도적인 파격',
    'Era-coded styling': '시대성이 드러나는 스타일링',
    'Nostalgic surface treatment': '향수를 자극하는 표면 처리',
    'Bold digital personality': '대담한 디지털 개성',
    'Clear interface language': '명확한 인터페이스 언어',
    'Systemized components': '체계화된 컴포넌트',
    'Readable interaction states': '읽기 쉬운 인터랙션 상태',
    'Task-oriented layout': '과업 중심 레이아웃',
    'Clear information density': '명확한 정보 밀도',
    'Component consistency': '컴포넌트의 일관성',
    'Mobile-first layout': '모바일 우선 레이아웃',
    'Touch-friendly interface': '터치 친화 인터페이스',
    'Compact hierarchy': '압축된 위계',
    'Clear narrative flow': '명확한 서사 흐름',
    'Conversion-aware layout': '전환을 고려한 레이아웃',
    'Brand-forward presentation': '브랜드 중심의 표현',
    'Consistent brand voice': '일관된 브랜드 톤',
    'Recognizable visual cues': '인지 가능한 시각 단서',
    'Scalable system thinking': '확장 가능한 시스템 사고',
    'Readable silhouette': '읽기 쉬운 실루엣',
    'Expressive face design': '표정이 살아 있는 얼굴 설계',
    'Appealing stylization': '매력적인 스타일라이징',
    'Painterly modeling': '회화적인 명암 처리',
    'Believable form': '설득력 있는 형태',
    'Subject-first framing': '피사체 중심 프레이밍',
    'Intentional light quality': '의도된 빛의 질감',
    'Mood-aware exposure': '무드를 고려한 노출',
    'Light ratio control': '광량 비율 제어',
    'Face-shaping direction': '얼굴을 살리는 조명 방향',
    'Ambient-driven mood': '주변광 중심 무드',
    'Time-sensitive color': '시간대에 민감한 색감',
    'Observed authenticity': '관찰에서 오는 진정성',
    'Moment-driven framing': '순간 중심 프레이밍',
    'Pose-driven styling': '포즈 중심의 스타일링',
    'Object-centered lighting': '대상 중심 조명',
    'Material clarity': '명확한 재질감',
    'Spatial clarity': '공간의 명료함',
    'Scale awareness': '스케일 감각',
    'Timing precision': '정확한 타이밍',
    'Motion readability': '읽기 쉬운 움직임',
    'Color signature': '색의 시그니처',
    'Authorial framing': '작가성이 느껴지는 프레이밍',
    'Memorable mood control': '기억에 남는 무드 제어',
    'Distinct visual identity': '뚜렷한 시각 정체성',
    'Place-aware portraiture': '장소성이 살아 있는 인물 표현',
    'Human presence': '인간 존재감',
    'Fieldwork atmosphere': '현장감 있는 분위기',
    'Distinct drawing language': '뚜렷한 드로잉 언어',
    'Recognizable storytelling rhythm': '인지 가능한 서사 리듬',
    'Worldbuilding clarity': '명확한 세계관 구축',
    'Narrative warmth': '서사가 느껴지는 온기',
    'Canonical composition': '정석적인 구성',
    'Strong draftsmanship': '탄탄한 드로잉 실력',
    'Systemic thinking': '체계적인 사고',
    'Iconic graphic voice': '상징적인 그래픽 목소리',
    'Strong stylistic authorship': '강한 스타일 작가성',
    'Wide visual influence': '넓은 시각적 영향력'
  });

  function normalizeDescriptionKey(value) {
    return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function translateDescriptionTerm(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const swatchMatch = raw.match(/^(\d+)\s+color swatches$/i);
    if (swatchMatch) return `${swatchMatch[1]}색 스와치`;
    if (DESCRIPTION_PHRASE_MAP[raw]) return DESCRIPTION_PHRASE_MAP[raw];
    const normalized = normalizeDescriptionKey(raw);
    if (DESCRIPTION_TERM_MAP[normalized]) return DESCRIPTION_TERM_MAP[normalized];
    const hyphenKey = normalized.replace(/-/g, ' ');
    if (DESCRIPTION_TERM_MAP[hyphenKey]) return DESCRIPTION_TERM_MAP[hyphenKey];
    const tokens = raw
      .replace(/\//g, ' ')
      .split(/[\s-]+/)
      .map((token) => {
        const key = normalizeDescriptionKey(token);
        return DESCRIPTION_TERM_MAP[key] || prettifyToken(token);
      })
      .filter(Boolean);
    return tokens.length ? tokens.join(' ') : raw;
  }

  function translateDescriptionList(values, limit = 2) {
    return uniqueText((values || []).map(translateDescriptionTerm)).filter(Boolean).slice(0, limit);
  }

  function descriptionName(style) {
    const names = cardDisplayNames(style);
    return names.korean || names.english || String(style.id || '').trim();
  }

  function descriptionFocus(style, limit = 2) {
    if (style.type === 'artist') {
      return uniqueText([
        ...translateDescriptionList(style.characteristics || [], limit),
        ...translateDescriptionList(style.moods || [], limit),
        ...translateDescriptionList(style.tags || [], limit)
      ]).slice(0, limit);
    }
    if (style.type === 'palette') {
      return uniqueText([
        ...translateDescriptionList(style.moods || [], limit),
        ...translateDescriptionList(style.tags || [], limit),
        ...translateDescriptionList(style.characteristics || [], limit)
      ]).slice(0, limit);
    }
    if (style.type === 'pose') {
      return uniqueText([
        translateDescriptionTerm(poseVariantLabel(poseVariantKey(style))),
        translateDescriptionTerm(prettifyToken(style.poseType || 'pose')),
        ...translateDescriptionList(style.tags || [], 1)
      ]).filter(Boolean).slice(0, limit);
    }
    return uniqueText([
      ...translateDescriptionList(style.characteristics || [], limit),
      ...translateDescriptionList(style.tags || [], limit)
    ]).slice(0, limit);
  }

  function descriptionUseCases(style, limit = 2) {
    return translateDescriptionList(style.useCases || detailUseCaseItems(style), limit);
  }

  function descriptionSearchHint(style, mode = directoryMode) {
    if (mode === 'artist') return 'frames, stills, illustration, photography, painting 같은 매체 키워드를 함께 붙여보세요.';
    if (mode === 'character') return 'turnaround, expression sheet, key art, model sheet 같은 키워드를 추가하면 더 잘 좁혀집니다.';
    if (mode === 'photo') return 'lighting setup, editorial, portrait, color grade, film look 같은 키워드가 잘 맞습니다.';
    if (mode === 'palette') return 'color palette, swatch, hex, brand palette, moodboard 같은 키워드를 함께 써보세요.';
    if (mode === 'pose') return 'pose reference, gesture, silhouette, foreshortening, low angle 같은 키워드를 조합해 보세요.';
    return 'poster, branding, layout, UI, case study 같은 키워드를 함께 붙이면 검색 정밀도가 올라갑니다.';
  }

  function buildOverview(style, mode = directoryMode) {
    const summary = buildDetailDefinition(style);
    const focus = descriptionFocus(style, 3).join(' · ');
    const uses = descriptionUseCases(style, 3).join(' · ');
    const lines = [summary];
    if (focus) lines.push(`핵심 포인트: ${focus}.`);
    if (uses) lines.push(`활용 장면: ${uses}.`);
    lines.push(`검색 힌트: ${descriptionSearchHint(style, mode)}`);
    return lines.join('\n');
  }

  function buildDetailDefinition(style) {
    const name = descriptionName(style);
    const focusText = descriptionFocus(style, 2).join(' · ');
    const useText = descriptionUseCases(style, 2).join(' · ');
    const moodText = translateDescriptionList(style.moods || [], 2).join(' · ');
    const mediaText = translateDescriptionList(style.media || [], 2).join(' · ');
    const regionText = translateDescriptionList(style.regions || [], 2).join(' · ');
    const eraText = translateDescriptionList(style.eras || [], 1).join(' · ');

    if (style.type === 'artist') {
      const contextText = [regionText, eraText].filter(Boolean).join(' · ');
      return `${name} 카드는 ${mediaText || '시각 매체'} 기반의 작가 레퍼런스입니다. ${contextText ? `${contextText} 맥락에서 ` : ''}${focusText ? `${focusText} 같은 특징이 두드러지며, ` : ''}${useText || '스타일 스터디 · 무드 레퍼런스'}에 활용하기 좋습니다.`;
    }
    if (style.type === 'character') {
      return `${name} 카드는 ${focusText || '실루엣과 스타일링'} 감각을 중심으로 보는 캐릭터 레퍼런스입니다. 실루엣, 비율, 표정과 렌더 방향을 구체화하거나 ${useText || '스타일 탐색 · 캐릭터 시트 제작'} 단계에서 참고하기 좋습니다.`;
    }
    if (style.type === 'photo') {
      return `${name} 카드는 ${focusText || '조명과 분위기'} 감각이 살아 있는 사진·라이팅 레퍼런스입니다. ${moodText || useText || '무드 레퍼런스'}를 찾고 조명 방향, 노출, 색감을 맞출 때 참고하기 좋습니다.`;
    }
    if (style.type === 'palette') {
      const swatchCount = Array.isArray(style.colors) && style.colors.length ? `${style.colors.length}개의 색 조합` : '색 조합';
      return `${name} 카드는 ${moodText || focusText || '무드 중심'} 방향의 컬러 팔레트 레퍼런스입니다. ${swatchCount}을 바탕으로 대비, 온도감, 포인트 컬러 배치를 정리할 때 유용합니다.`;
    }
    if (style.type === 'pose') {
      return `${name} 카드는 ${focusText || '동작 중심'} 포즈 레퍼런스입니다. 무게중심, 라인 오브 액션, 실루엣 흐름을 점검하거나 ${useText || '인체 스터디 · 블로킹 구상'}에 활용하기 좋습니다.`;
    }
    return `${name} 카드는 ${focusText || '시각 언어'}를 중심으로 보는 디자인 레퍼런스입니다. ${useText || '시각 방향 설정 · 레이아웃 검토'} 단계에서 레이아웃, 타이포그래피, 브랜드 톤을 정리할 때 참고하기 좋습니다.`;
  }

  function scoreReferenceRelation(base, candidate) {
    const baseTags = new Set((base.tags || []).map(normalize));
    const baseTokens = new Set([
      ...(base.tags || []),
      ...(base.moods || []),
      ...(base.useCases || []),
      ...(base.media || []),
      ...(base.searchTokens || []).slice(0, 8)
    ].map(normalize));
    let score = 0;
    for (const token of [
      ...(candidate.tags || []),
      ...(candidate.moods || []),
      ...(candidate.useCases || []),
      ...(candidate.media || []),
      ...((candidate.searchTokens || []).slice(0, 8))
    ].map(normalize)) {
      if (!token) continue;
      if (baseTags.has(token)) score += 3;
      else if (baseTokens.has(token)) score += 1;
    }
    if ((base.eras || [])[0] && (candidate.eras || [])[0] && normalize(base.eras[0]) === normalize(candidate.eras[0])) score += 1;
    return score;
  }

  function crossRelatedReferences(style, limitPerType = 2) {
    const groups = new Map();
    allReferences()
      .filter((candidate) => candidate.id !== style.id && candidate.type !== style.type)
      .forEach((candidate) => {
        const score = scoreReferenceRelation(style, candidate);
        if (score <= 0) return;
        const list = groups.get(candidate.type) || [];
        list.push({ candidate, score });
        groups.set(candidate.type, list);
      });
    return DATA_DIRECTORY_MODES
      .filter((mode) => mode !== style.type)
      .map((mode) => {
        const items = (groups.get(mode) || [])
          .sort((a, b) => b.score - a.score)
          .slice(0, limitPerType)
          .map((entry) => entry.candidate);
        return { type: mode, items };
      })
      .filter((group) => group.items.length > 0);
  }

  function renderDetailChipRow(host, chips, { palette = false } = {}) {
    if (!host) return;
    host.innerHTML = '';
    chips.forEach((chip) => {
      const span = document.createElement('span');
      span.className = `detail-chip${palette ? ' palette-swatch' : ''}`;
      if (typeof chip === 'string') {
        span.textContent = chip;
      } else {
        const strong = document.createElement('strong');
        strong.textContent = chip.label;
        const value = document.createElement('span');
        value.textContent = chip.value;
        span.appendChild(strong);
        span.appendChild(value);
      }
      host.appendChild(span);
    });
  }

  function renderDetailLinks(host, links) {
    if (!host) return;
    host.innerHTML = '';
    links.forEach((link) => {
      const a = document.createElement('a');
      a.className = 'detail-link';
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noreferrer';
      a.textContent = link.label;
      host.appendChild(a);
    });
  }

  function renderDetailList(host, items) {
    if (!host) return;
    host.innerHTML = '';
    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'detail-note-item';
      row.textContent = item;
      host.appendChild(row);
    });
  }

  function renderDetailTokens(host, items) {
    if (!host) return;
    host.innerHTML = '';
    items.forEach((item) => {
      const chip = document.createElement('span');
      chip.className = 'detail-token';
      chip.textContent = item;
      host.appendChild(chip);
    });
  }

  function bindDetailCopyAction(button, value, toastMessage) {
    if (!button) return;
    const text = String(value || '').trim();
    button.disabled = !text;
    button.onclick = async () => {
      if (!text) return;
      if (await writeClipboard(text)) showToast(toastMessage);
    };
  }

  function openReference(style) {
    if (!style) return;
    if (style.type && directoryMode !== 'all' && style.type !== directoryMode) {
      applyDirectory(style.type);
      query = '';
      activeTag = '';
      activeEnInitial = '';
      activeDigitInitial = '';
      activePoseType = '';
      activePoseVariant = '';
      activePaletteCategory = '';
      activePalettePreset = '';
      activeCharacterFacet = '';
      if (dom.search) dom.search.value = '';
      loadStyles();
      buildJumpBars();
      render();
    }
    const next = STYLES.find((item) => item.id === style.id) || style;
    selectStyle(next, { openInspector: true });
  }

  function renderRelatedButtons(host, items) {
    if (!host) return;
    host.innerHTML = '';
    items.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'detail-related';
      button.innerHTML = `<span>${item.ko}</span><small>${item.en}</small>`;
      button.addEventListener('click', () => openReference(item));
      host.appendChild(button);
    });
  }

  function renderCrossRelated(host, groups) {
    if (!host) return;
    host.innerHTML = '';
    groups.forEach((group) => {
      const wrap = document.createElement('div');
      wrap.className = 'detail-related-group';
      const title = document.createElement('div');
      title.className = 'detail-related-group-title';
      title.textContent = directoryLabel(group.type);
      const row = document.createElement('div');
      row.className = 'detail-related-list';
      group.items.forEach((item) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'detail-related';
        button.innerHTML = `<span>${item.ko}</span><small>${item.en}</small>`;
        button.addEventListener('click', () => openReference(item));
        row.appendChild(button);
      });
      wrap.appendChild(title);
      wrap.appendChild(row);
      host.appendChild(wrap);
    });
  }

  function openQueryOnSite(queryText, siteKey = activeSiteKey) {
    const q = String(queryText || '').trim();
    if (!q) return;
    const site = SITES[siteKey] || SITES.pinterest;
    window.open(site.url(q), '_blank', 'noopener,noreferrer');
  }

  function renderDetailSearchWorkbench(style) {
    const mode = referenceMode(style);
    const siteKeys = sitesForDirectory(mode);
    if (!siteKeys.includes(activeSiteKey)) activeSiteKey = siteKeys[0] || 'pinterest';

    const styleChanged = detailSearchStyleId !== style.id;
    if (styleChanged) {
      detailSearchStyleId = style.id;
      detailQuerySeedMode = 'quick';
      detailExpansionKey = '';
      detailSearchDraft = '';
    }

    const quickQuery = quickSearchQuery(style, activeSiteKey);
    const preciseQuery = preciseSearchQuery(style, activeSiteKey);
    const seededQuery = detailSearchQuery(style, detailQuerySeedMode, activeSiteKey, detailExpansionKey);
    if (!detailSearchDraft) detailSearchDraft = seededQuery;

    if (dom.detailQuickQueryLabel) dom.detailQuickQueryLabel.textContent = `빠른 검색어 · ${SITES[activeSiteKey]?.label || 'Search'}`;
    if (dom.detailPreciseQueryLabel) dom.detailPreciseQueryLabel.textContent = `정밀 검색어 · ${SITES[activeSiteKey]?.label || 'Search'}`;
    if (dom.detailQuickQueryText) dom.detailQuickQueryText.textContent = quickQuery || '-';
    if (dom.detailPreciseQueryText) dom.detailPreciseQueryText.textContent = preciseQuery || '-';
    bindDetailCopyAction(dom.detailQuickQueryCopy, quickQuery, '빠른 검색어를 복사했습니다.');
    bindDetailCopyAction(dom.detailPreciseQueryCopy, preciseQuery, '정밀 검색어를 복사했습니다.');
    if (dom.detailQuickQueryOpen) dom.detailQuickQueryOpen.onclick = () => openQueryOnSite(quickQuery, activeSiteKey);
    if (dom.detailPreciseQueryOpen) dom.detailPreciseQueryOpen.onclick = () => openQueryOnSite(preciseQuery, activeSiteKey);

    if (dom.detailSiteSelect) {
      dom.detailSiteSelect.innerHTML = '';
      siteKeys.forEach((key) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = SITES[key]?.label || key;
        dom.detailSiteSelect.appendChild(option);
      });
      dom.detailSiteSelect.value = activeSiteKey;
      dom.detailSiteSelect.onchange = () => {
        siteTouched = true;
        applySite(dom.detailSiteSelect.value);
      };
    }

    if (dom.detailIntentChips) {
      dom.detailIntentChips.innerHTML = '';
      detailExpansionOptionsForMode(mode).forEach((item) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `chip ${detailExpansionKey === item.key ? 'active' : ''}`.trim();
        button.textContent = item.label;
        updateAriaRadio(button, detailExpansionKey === item.key);
        button.addEventListener('click', () => {
          detailExpansionKey = detailExpansionKey === item.key ? '' : item.key;
          detailSearchDraft = detailSearchQuery(style, detailQuerySeedMode, activeSiteKey, detailExpansionKey);
          renderDetailSearchWorkbench(style);
        });
        dom.detailIntentChips.appendChild(button);
      });
    }

    if (dom.detailIntentPreview) {
      const token = detailExpansionOptionsForMode(mode).find((item) => item.key === detailExpansionKey)?.token || '';
      dom.detailIntentPreview.hidden = !token;
      if (token) dom.detailIntentPreview.textContent = `추가되는 확장 키워드: ${token}`;
    }

    if (dom.detailSearchInput) {
      dom.detailSearchInput.value = detailSearchDraft;
      dom.detailSearchInput.oninput = () => {
        detailSearchDraft = String(dom.detailSearchInput.value || '');
      };
      dom.detailSearchInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          openQueryOnSite(dom.detailSearchInput.value, activeSiteKey);
        }
      };
    }
    if (dom.detailSearchBtn) dom.detailSearchBtn.onclick = () => openQueryOnSite(dom.detailSearchInput?.value, activeSiteKey);
    if (dom.detailUseQuickQuery) dom.detailUseQuickQuery.onclick = () => {
      detailQuerySeedMode = 'quick';
      detailSearchDraft = detailSearchQuery(style, detailQuerySeedMode, activeSiteKey, detailExpansionKey);
      renderDetailSearchWorkbench(style);
    };
    if (dom.detailUsePreciseQuery) dom.detailUsePreciseQuery.onclick = () => {
      detailQuerySeedMode = 'quick';
      detailSearchDraft = detailSearchQuery(style, detailQuerySeedMode, activeSiteKey, detailExpansionKey);
      renderDetailSearchWorkbench(style);
    };
    if (dom.detailSearchReset) dom.detailSearchReset.onclick = () => {
      detailQuerySeedMode = 'quick';
      detailExpansionKey = '';
      detailSearchDraft = detailSearchQuery(style, 'quick', activeSiteKey, '');
      renderDetailSearchWorkbench(style);
    };
  }

  function renderDetailActions(style) {
    if (!dom.detailActions) return;
    dom.detailActions.innerHTML = '';
    const actions = [
      {
        label: `${SITES[activeSiteKey]?.label || 'Pinterest'}에서 열기`,
        className: 'detail-action primary',
        onClick: () => window.open(activeSearchUrl(style), '_blank', 'noopener,noreferrer')
      },
      {
        label: '검색어 복사',
        className: 'detail-action',
        onClick: async () => {
          if (await writeClipboard(effectiveSiteQuery(String(style?.q || ''), activeSiteKey))) showToast('검색어를 복사했습니다.');
        }
      },
      {
        label: '프롬프트 복사',
        className: 'detail-action',
        onClick: async () => {
          if (await writeClipboard(sampleImagePrompt(style))) showToast('샘플 프롬프트를 복사했습니다.');
        }
      }
    ];
    if (style.type === 'palette' && Array.isArray(style.colors) && style.colors.length) {
      actions.push({
        label: '팔레트 복사',
        className: 'detail-action',
        onClick: async () => {
          if (await writeClipboard(style.colors.slice(0, 8).join(' '))) showToast('팔레트를 복사했습니다.');
        }
      });
    }
    actions.forEach((action) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = action.className;
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      dom.detailActions.appendChild(button);
    });
  }

  function openDetail(style) {
    if (!style || !dom.detailPanel) return;
    detailStyleId = style.id;

    if (dom.detailType) dom.detailType.textContent = `${directoryShortLabel(style.type)} Reference`;
    if (dom.detailTitle) dom.detailTitle.textContent = style.ko || style.en || style.id;
    if (dom.detailSubtitle) {
      const aliasText = uniqueText([style.en, style.id]).join(' · ');
      dom.detailSubtitle.textContent = aliasText;
    }
    if (dom.detailSummary) dom.detailSummary.textContent = style.overview || '';
    if (dom.detailThumb) {
      dom.detailThumb.alt = `${style.ko} (${style.en})`;
      applyThumb(dom.detailThumb, style);
    }

    renderDetailChipRow(dom.detailFacts, buildDetailFacts(style).map(([label, value]) => ({ label, value })));
    renderDetailChipRow(dom.detailTags, uniqueText((style.tags || []).map((tag) => `#${tag}`)));

    const paletteColors = Array.isArray(style.colors) ? style.colors.slice(0, 8) : [];
    if (dom.detailPaletteBlock) dom.detailPaletteBlock.hidden = paletteColors.length === 0;
    renderDetailChipRow(dom.detailPalette, paletteColors, { palette: true });

    const links = Array.isArray(style.sourceLinks) ? style.sourceLinks : [];
    if (dom.detailFiguresBlock) dom.detailFiguresBlock.hidden = links.length === 0;
    renderDetailLinks(dom.detailFigures, links);

    renderDetailActions(style);

    if (dom.detailSameTypeBlock) dom.detailSameTypeBlock.hidden = true;
    if (dom.detailSameType) dom.detailSameType.innerHTML = '';

    if (dom.detailCrossTypeBlock) dom.detailCrossTypeBlock.hidden = true;
    if (dom.detailCrossType) dom.detailCrossType.innerHTML = '';

    dom.detailPanel.hidden = false;
    document.body.classList.add('detail-open');
  }

  const BINDER_KEY = 'reference-hub-binder-v1';
  let binderPanelOpen = false;
  let binderState = null;
  let binderRenderRevision = 0;
  const CUSTOM_COVER_DB = 'inspodex-custom-covers';
  const CUSTOM_COVER_STORE = 'covers';
  let customCoverCache = {};
  let customCoverHydratePromise = null;
  let activeBinderFilterType = '';
  let activeBinderFilterId = '';
  let binderCompareDeckId = '';

  function referenceKey(styleOrType, maybeId = '') {
    if (typeof styleOrType === 'string') {
      return `${String(styleOrType || '').trim()}:${String(maybeId || '').trim()}`;
    }
    const style = styleOrType || {};
    return `${styleTypeKey(style)}:${String(style.id || '').trim()}`;
  }

  function createDeckId() {
    return `deck-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function normalizeDeck(deck, index = 0) {
    const name = String(deck?.name || '').trim() || (index === 0 ? '내 보드' : `보드 ${index + 1}`);
    const cardIds = uniq((Array.isArray(deck?.cardIds) ? deck.cardIds : []).map((id) => String(id || '').trim()).filter(Boolean));
    return {
      id: String(deck?.id || createDeckId()),
      name,
      cardIds,
      coverCardId: String(deck?.coverCardId || cardIds[0] || '').trim(),
      createdAt: Number(deck?.createdAt) || Date.now(),
      updatedAt: Number(deck?.updatedAt) || Date.now()
    };
  }

  function normalizeBinderState(raw) {
    const decks = (Array.isArray(raw?.decks) ? raw.decks : []).map((deck, index) => normalizeDeck(deck, index));
    const safeDecks = decks.length ? decks : [normalizeDeck({ name: '내 보드' }, 0)];
    const selectedDeckId = safeDecks.some((deck) => deck.id === raw?.selectedDeckId)
      ? String(raw.selectedDeckId)
      : safeDecks[0].id;
    const currentFilter = raw?.currentFilter && typeof raw.currentFilter === 'object'
      ? {
          type: String(raw.currentFilter.type || '').trim(),
          id: String(raw.currentFilter.id || '').trim()
        }
      : { type: '', id: '' };
    return {
      favorites: uniq((Array.isArray(raw?.favorites) ? raw.favorites : []).map((id) => String(id || '').trim()).filter(Boolean)),
      decks: safeDecks,
      selectedDeckId,
      backgrounds: raw?.backgrounds && typeof raw.backgrounds === 'object' ? { ...raw.backgrounds } : {},
      currentFilter
    };
  }

  function loadBinderState() {
    try {
      const raw = localStorage.getItem(BINDER_KEY);
      if (!raw) return normalizeBinderState(null);
      return normalizeBinderState(JSON.parse(raw));
    } catch {
      return normalizeBinderState(null);
    }
  }

  function supportsCustomCoverDb() {
    return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
  }

  function openCustomCoverDb() {
    if (!supportsCustomCoverDb()) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(CUSTOM_COVER_DB, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(CUSTOM_COVER_STORE)) {
          db.createObjectStore(CUSTOM_COVER_STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('IndexedDB open failed'));
    });
  }

  function readAllCustomCovers(db) {
    if (!db) return Promise.resolve({});
    return new Promise((resolve, reject) => {
      const tx = db.transaction(CUSTOM_COVER_STORE, 'readonly');
      const store = tx.objectStore(CUSTOM_COVER_STORE);
      const out = {};
      const request = store.openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          resolve(out);
          return;
        }
        out[String(cursor.key || '')] = String(cursor.value || '');
        cursor.continue();
      };
      request.onerror = () => reject(request.error || new Error('IndexedDB read failed'));
    });
  }

  function writeCustomCoverRecord(key, value) {
    return openCustomCoverDb().then((db) => {
      if (!db) return false;
      return new Promise((resolve, reject) => {
        const tx = db.transaction(CUSTOM_COVER_STORE, 'readwrite');
        tx.objectStore(CUSTOM_COVER_STORE).put(String(value || ''), String(key || ''));
        tx.oncomplete = () => {
          db.close();
          resolve(true);
        };
        tx.onerror = () => {
          db.close();
          reject(tx.error || new Error('IndexedDB write failed'));
        };
      });
    });
  }

  function deleteCustomCoverRecord(key) {
    return openCustomCoverDb().then((db) => {
      if (!db) return false;
      return new Promise((resolve, reject) => {
        const tx = db.transaction(CUSTOM_COVER_STORE, 'readwrite');
        tx.objectStore(CUSTOM_COVER_STORE).delete(String(key || ''));
        tx.oncomplete = () => {
          db.close();
          resolve(true);
        };
        tx.onerror = () => {
          db.close();
          reject(tx.error || new Error('IndexedDB delete failed'));
        };
      });
    });
  }

  function hydrateCustomCoverCache() {
    if (customCoverHydratePromise) return customCoverHydratePromise;
    customCoverHydratePromise = (async () => {
      try {
        const db = await openCustomCoverDb();
        const stored = await readAllCustomCovers(db);
        if (db) db.close();
        customCoverCache = stored;
      } catch (err) {
        console.error(err);
        customCoverCache = {};
      }

      const legacy = binderState?.backgrounds && typeof binderState.backgrounds === 'object'
        ? { ...binderState.backgrounds }
        : {};
      const legacyKeys = Object.keys(legacy).filter(Boolean);
      if (legacyKeys.length) {
        for (const key of legacyKeys) {
          if (customCoverCache[key]) continue;
          try {
            await writeCustomCoverRecord(key, legacy[key]);
            customCoverCache[key] = String(legacy[key] || '');
          } catch (err) {
            console.error(err);
          }
        }
        binderState.backgrounds = {};
        saveBinderState({ silent: true });
      }

      render();
      return customCoverCache;
    })();
    return customCoverHydratePromise;
  }

  binderState = loadBinderState();
  activeBinderFilterType = '';
  activeBinderFilterId = '';

  function syncBinderFilterState() {
    binderState.currentFilter = activeBinderFilterType
      ? { type: activeBinderFilterType, id: activeBinderFilterId }
      : { type: '', id: '' };
  }

  function saveBinderState({ silent = false } = {}) {
    try {
      syncBinderFilterState();
      localStorage.setItem(BINDER_KEY, JSON.stringify(binderState));
      binderRenderRevision += 1;
      syncBinderHeroButton();
      renderBinderPanel();
      return true;
    } catch (err) {
      console.error(err);
      if (!silent) showToast('보드 저장에 실패했습니다.');
      return false;
    }
  }

  function resetBinderState() {
    if (!window.confirm('\uBC14\uC778\uB354 \uB370\uC774\uD130\uB97C \uCD08\uAE30\uD654\uD560\uAE4C\uC694? \uC990\uACA8\uCC3E\uAE30, \uB371, \uC120\uD0DD \uB371, \uD544\uD130\uB9CC \uCD08\uAE30\uD654\uB418\uACE0 \uCEE4\uC2A4\uD140 \uCEE4\uBC84\uB294 \uC720\uC9C0\uB429\uB2C8\uB2E4.')) return;
    const preservedBackgrounds = binderState?.backgrounds && typeof binderState.backgrounds === 'object'
      ? { ...binderState.backgrounds }
      : {};
    binderState = normalizeBinderState({ backgrounds: preservedBackgrounds });
    activeBinderFilterType = '';
    activeBinderFilterId = '';
    saveBinderState({ silent: true });
    render();
    showToast('\uBC14\uC778\uB354 \uCD08\uAE30\uD654\uAC00 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uCEE4\uC2A4\uD140 \uCEE4\uBC84\uB294 \uC720\uC9C0\uB410\uC2B5\uB2C8\uB2E4.');
  }

  function selectedDeck() {
    const deck = (binderState?.decks || []).find((item) => item.id === binderState.selectedDeckId);
    return deck || (binderState?.decks || [])[0] || null;
  }

  function setSelectedDeck(deckId) {
    if (!(binderState?.decks || []).some((deck) => deck.id === deckId)) return;
    binderState.selectedDeckId = deckId;
    saveBinderState({ silent: true });
  }

  function binderDeckLabel(deckId) {
    return (binderState?.decks || []).find((deck) => deck.id === deckId)?.name || '보드';
  }

  function isFavoriteStyle(style) {
    return (binderState?.favorites || []).includes(referenceKey(style));
  }

  function deckContainsStyle(deckId, style) {
    const deck = (binderState?.decks || []).find((item) => item.id === deckId);
    if (!deck) return false;
    return (deck.cardIds || []).includes(referenceKey(style));
  }

  function createDeck(name, seedStyle = null) {
    const deck = normalizeDeck({
      id: createDeckId(),
      name: String(name || '').trim() || `보드 ${(binderState?.decks || []).length + 1}`,
      cardIds: seedStyle ? [referenceKey(seedStyle)] : [],
      coverCardId: seedStyle ? referenceKey(seedStyle) : ''
    }, (binderState?.decks || []).length);
    binderState.decks.push(deck);
    binderState.selectedDeckId = deck.id;
    saveBinderState();
    return deck;
  }

  function renameDeck(deckId) {
    const deck = (binderState?.decks || []).find((item) => item.id === deckId);
    if (!deck) return;
    const next = window.prompt('보드 이름', deck.name);
    if (!next) return;
    deck.name = String(next).trim() || deck.name;
    deck.updatedAt = Date.now();
    saveBinderState();
  }

  function deleteDeck(deckId) {
    if ((binderState?.decks || []).length <= 1) {
      showToast('보드는 최소 1개 이상 필요합니다.');
      return;
    }
    const deck = (binderState?.decks || []).find((item) => item.id === deckId);
    if (!deck) return;
    if (!window.confirm(`"${deck.name}" 보드를 삭제할까요?`)) return;
    binderState.decks = binderState.decks.filter((item) => item.id !== deckId);
    if (binderState.selectedDeckId === deckId) {
      binderState.selectedDeckId = binderState.decks[0]?.id || '';
    }
    if (activeBinderFilterType === 'deck' && activeBinderFilterId === deckId) {
      activeBinderFilterType = '';
      activeBinderFilterId = '';
    }
    saveBinderState();
    render();
  }

  function toggleFavoriteStyle(style) {
    const key = referenceKey(style);
    const list = binderState.favorites || [];
    const exists = list.includes(key);
    binderState.favorites = exists ? list.filter((id) => id !== key) : [...list, key];
    saveBinderState();
    return !exists;
  }

  function toggleDeckMembership(style, deckId = selectedDeck()?.id) {
    const deck = (binderState?.decks || []).find((item) => item.id === deckId);
    if (!deck) return false;
    const key = referenceKey(style);
    const exists = (deck.cardIds || []).includes(key);
    deck.cardIds = exists ? deck.cardIds.filter((id) => id !== key) : uniq([...(deck.cardIds || []), key]);
    deck.coverCardId = deck.cardIds[0] || '';
    deck.updatedAt = Date.now();
    binderState.selectedDeckId = deck.id;
    saveBinderState();
    return !exists;
  }

  function customBackgroundFor(style) {
    const key = referenceKey(style);
    return String(customCoverCache[key] || binderState?.backgrounds?.[key] || '').trim();
  }

  async function removeCustomBackground(style) {
    const key = referenceKey(style);
    delete customCoverCache[key];
    if (!binderState?.backgrounds) binderState.backgrounds = {};
    delete binderState.backgrounds[key];
    try {
      await deleteCustomCoverRecord(key);
    } catch (err) {
      console.error(err);
    }
    saveBinderState({ silent: true });
  }

  function fileToCardBackground(file, { maxW = 900, maxH = 1350 } = {}) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Failed to decode image'));
        img.onload = () => {
          const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
          const width = Math.max(1, Math.round(img.width * ratio));
          const height = Math.max(1, Math.round(img.height * ratio));
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas unavailable'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.86));
        };
        img.src = String(reader.result || '');
      };
      reader.readAsDataURL(file);
    });
  }

  async function setCustomBackgroundFromFile(style, file) {
    const dataUrl = await fileToCardBackground(file);
    const key = referenceKey(style);
    customCoverCache[key] = dataUrl;
    if (!binderState?.backgrounds) binderState.backgrounds = {};
    delete binderState.backgrounds[key];
    try {
      const stored = await writeCustomCoverRecord(key, dataUrl);
      if (!stored) {
        binderState.backgrounds[key] = dataUrl;
      }
    } catch (err) {
      console.error(err);
      binderState.backgrounds[key] = dataUrl;
    }
    if (!saveBinderState({ silent: true })) throw new Error('Failed to save binder state');
  }

  function setBinderPanelOpen(next) {
    binderPanelOpen = Boolean(next);
    if (dom.binderPanel) dom.binderPanel.hidden = !binderPanelOpen;
    document.body.classList.toggle('binder-open', binderPanelOpen);
  }

  function syncBinderHeroButton() {
    if (!dom.binderToggle) return;
    const deckCount = (binderState?.decks || []).length;
    const savedCount = new Set([
      ...(binderState?.favorites || []),
      ...((binderState?.decks || []).flatMap((deck) => deck.cardIds || []))
    ]).size;
    dom.binderToggle.textContent = '프로젝트 보드';
    dom.binderToggle.title = `보드 ${deckCount}개 · 저장 ${savedCount}개`;
    dom.binderToggle.dataset.count = String(savedCount);
  }

  function applyBinderFilter(type = '', id = '') {
    activeBinderFilterType = String(type || '').trim();
    activeBinderFilterId = String(id || '').trim();
    if (activeBinderFilterType === 'deck' && activeBinderFilterId) {
      setSelectedDeck(activeBinderFilterId);
    }
    clearShuffle({ persist: true });
    saveBinderState({ silent: true });
    render();
  }

  function enhanceBinderUi() {
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions && !document.getElementById('binderToggle')) {
      const toggle = document.createElement('button');
      toggle.id = 'binderToggle';
      toggle.type = 'button';
      toggle.className = 'pill binder-toggle';
      toggle.addEventListener('click', () => setBinderPanelOpen(true));
      heroActions.insertBefore(toggle, heroActions.firstChild);
    }

    if (!document.getElementById('binderPanel')) {
      const panel = document.createElement('div');
      panel.id = 'binderPanel';
      panel.className = 'binder-panel';
      panel.hidden = true;
      panel.innerHTML = `
        <div class="binder-panel-backdrop" data-binder-close="true"></div>
        <aside class="binder-panel-dialog" role="dialog" aria-modal="true" aria-labelledby="binderPanelTitle">
          <div class="binder-panel-head">
            <div>
              <div class="binder-panel-eyebrow">project boards</div>
              <h2 id="binderPanelTitle" class="binder-panel-title">프로젝트 보드</h2>
            </div>
            <div class="binder-panel-head-actions">
              <button id="binderResetBtn" type="button" class="pill danger">전체 초기화</button>
              <button id="binderCreateDeckBtn" type="button" class="pill">새 보드</button>
              <button id="binderCloseBtn" type="button" class="pill">닫기</button>
            </div>
          </div>
          <div id="binderSummary" class="binder-panel-summary"></div>
          <div id="binderWorkspace" class="binder-workspace"></div>
          <div id="binderCollections" class="binder-collections"></div>
        </aside>
      `;
      document.body.appendChild(panel);
    }

    dom.binderToggle = document.getElementById('binderToggle');
    dom.binderPanel = document.getElementById('binderPanel');
    dom.binderSummary = document.getElementById('binderSummary');
    dom.binderWorkspace = document.getElementById('binderWorkspace');
    dom.binderCollections = document.getElementById('binderCollections');
    dom.binderCloseBtn = document.getElementById('binderCloseBtn');
    dom.binderCreateDeckBtn = document.getElementById('binderCreateDeckBtn');
    dom.binderResetBtn = document.getElementById('binderResetBtn');
    appendHelpIcon(document.getElementById('binderPanelTitle'), '즐겨찾기, 보드, 커스텀 커버를 모아두는 개인 작업 공간입니다. 프로젝트별로 카드 조합을 저장해둘 수 있어요.');

    if (dom.binderPanel && !dom.binderPanel.dataset.bound) {
      dom.binderPanel.dataset.bound = 'true';
      dom.binderPanel.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.matches('[data-binder-close="true"]')) setBinderPanelOpen(false);
      });
    }
    if (dom.binderCloseBtn && !dom.binderCloseBtn.dataset.bound) {
      dom.binderCloseBtn.dataset.bound = 'true';
      dom.binderCloseBtn.addEventListener('click', () => setBinderPanelOpen(false));
    }
    if (dom.binderCreateDeckBtn && !dom.binderCreateDeckBtn.dataset.bound) {
      dom.binderCreateDeckBtn.dataset.bound = 'true';
      dom.binderCreateDeckBtn.addEventListener('click', () => {
        const name = window.prompt('새 보드 이름', `보드 ${(binderState?.decks || []).length + 1}`);
        if (!name) return;
        const deck = createDeck(name);
        applyBinderFilter('deck', deck.id);
        setBinderPanelOpen(true);
      });
    }
    if (dom.binderResetBtn && !dom.binderResetBtn.dataset.bound) {
      dom.binderResetBtn.dataset.bound = 'true';
      dom.binderResetBtn.addEventListener('click', resetBinderState);
    }
    if (!document.body.dataset.binderEscBound) {
      document.body.dataset.binderEscBound = 'true';
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && binderPanelOpen) {
          setBinderPanelOpen(false);
        }
      });
    }
    document.querySelectorAll('[data-open-binder="true"]').forEach((button) => {
      if (!(button instanceof HTMLElement) || button.dataset.boundBinderOpen === 'true') return;
      button.dataset.boundBinderOpen = 'true';
      button.addEventListener('click', () => {
        renderBinderPanel();
        setBinderPanelOpen(true);
      });
    });
    syncBinderHeroButton();
    renderBinderPanel();
  }

  function deckStyles(deck) {
    if (!deck) return [];
    const referenceMap = new Map(allReferences().map((style) => [referenceKey(style), style]));
    return (Array.isArray(deck.cardIds) ? deck.cardIds : [])
      .map((cardId) => referenceMap.get(String(cardId || '').trim()))
      .filter(Boolean);
  }

  function binderStyleLabel(style) {
    const primary = String(style?.ko || style?.en || style?.id || '').trim();
    const secondary = String(style?.en || '').trim();
    if (secondary && secondary.toLowerCase() !== primary.toLowerCase()) return `${primary} · ${secondary}`;
    return primary || 'Untitled';
  }

  function binderPreviewText(value, max = 180) {
    const clean = String(value || '').replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    if (clean.length <= max) return clean;
    return `${clean.slice(0, max - 1).trim()}…`;
  }

  function binderDateLabel(value) {
    const time = Number(value) || 0;
    if (!time) return '';
    try {
      return new Intl.DateTimeFormat('ko-KR', { month: 'numeric', day: 'numeric' }).format(new Date(time));
    } catch {
      return '';
    }
  }

  function deckExportBundle(deck) {
    const styles = deckStyles(deck);
    const typeLabels = uniqueText(styles.map((style) => directoryLabel(styleTypeKey(style)))).slice(0, 4);
    const typePromptTerms = uniqueText(styles.map((style) => directoryShortLabel(styleTypeKey(style)).toLowerCase())).slice(0, 4);
    const focusTerms = uniqueText(styles.flatMap((style) => [
      ...referenceFocusTerms(style, 3),
      ...(Array.isArray(style.tags) ? style.tags : []),
      ...(Array.isArray(style.characteristics) ? style.characteristics : []),
      ...(Array.isArray(style.moods) ? style.moods : []),
      ...(Array.isArray(style.useCases) ? style.useCases : [])
    ])).slice(0, 8);
    const titles = uniqueText(styles.map((style) => String(style?.en || style?.ko || style?.id || '').trim())).slice(0, 5);
    const cardLabels = styles.slice(0, 5).map((style) => binderStyleLabel(style));
    if (styles.length > 5) cardLabels.push(`외 ${styles.length - 5}개`);

    const boardSearch = joinTokens([
      ...titles.slice(0, 2),
      ...focusTerms.slice(0, 6)
    ]);
    const boardPrompt = [
      `Create a cohesive visual direction board for ${deck?.name || 'this project'}.`,
      titles.length ? `Blend cues from ${titles.slice(0, 3).join(', ')}.` : '',
      typePromptTerms.length ? `Keep the result useful across ${typePromptTerms.join(', ')} references.` : '',
      focusTerms.length ? `Focus on ${focusTerms.slice(0, 6).join(', ')}.` : ''
    ].filter(Boolean).join(' ');

    const summary = [
      `# ${deck?.name || '프로젝트 보드'}`,
      `카드 수: ${styles.length}`,
      typeLabels.length ? `타입: ${typeLabels.join(', ')}` : '타입: 아직 저장된 카드가 없습니다.',
      focusTerms.length ? `핵심 키워드: ${focusTerms.slice(0, 6).join(', ')}` : '핵심 키워드: 카드가 쌓이면 자동으로 정리됩니다.',
      cardLabels.length ? `대표 레퍼런스: ${cardLabels.join(' / ')}` : '대표 레퍼런스: 아직 없음',
      boardSearch ? `추천 믹스 검색어: ${boardSearch}` : '',
      boardPrompt ? `추천 믹스 프롬프트: ${boardPrompt}` : ''
    ].filter(Boolean).join('\n');

    const searchPack = [
      `# ${deck?.name || '프로젝트 보드'} Search Pack`,
      `Site: ${(SITES[activeSiteKey] || SITES.pinterest).label}`,
      boardSearch ? `Board mix: ${boardSearch}` : '',
      ...styles.slice(0, 6).flatMap((style, index) => {
        const quick = quickSearchQuery(style, activeSiteKey);
        const precise = preciseSearchQuery(style, activeSiteKey);
        return [
          '',
          `[${index + 1}] ${binderStyleLabel(style)}`,
          `quick: ${quick}`,
          `precise: ${precise}`
        ];
      })
    ].filter(Boolean).join('\n');

    const promptPack = [
      `# ${deck?.name || '프로젝트 보드'} Prompt Pack`,
      boardPrompt ? `Board prompt: ${boardPrompt}` : '',
      ...styles.slice(0, 4).flatMap((style, index) => {
        const prompts = buildPromptBundle(style);
        return [
          '',
          `[${index + 1}] ${binderStyleLabel(style)}`,
          `generate: ${prompts.generate}`,
          `transform: ${prompts.transform}`,
          `expand: ${prompts.expand}`
        ];
      })
    ].filter(Boolean).join('\n');

    return {
      styles,
      typeLabels,
      focusTerms,
      boardSearch,
      boardPrompt,
      summary,
      searchPack,
      promptPack,
      summaryPreview: binderPreviewText(summary, 220),
      searchPreview: binderPreviewText([
        boardSearch ? `Board mix: ${boardSearch}` : '',
        ...styles.slice(0, 2).map((style) => `${binderStyleLabel(style)} / ${quickSearchQuery(style, activeSiteKey)}`)
      ].filter(Boolean).join(' '), 220),
      promptPreview: binderPreviewText([
        boardPrompt,
        ...styles.slice(0, 1).map((style) => buildPromptBundle(style).generate)
      ].filter(Boolean).join(' '), 220)
    };
  }

  function resolveBinderCompareDeck(primaryDeck) {
    const candidates = (binderState?.decks || []).filter((deck) => deck.id !== primaryDeck?.id);
    if (!candidates.length) {
      binderCompareDeckId = '';
      return null;
    }
    const matched = candidates.find((deck) => deck.id === binderCompareDeckId);
    if (matched) return matched;
    binderCompareDeckId = candidates[0].id;
    return candidates[0];
  }

  function binderUniqueTerms(source = [], target = [], limit = 4) {
    const targetSet = new Set((target || []).map((value) => String(value || '').trim().toLowerCase()).filter(Boolean));
    return (source || []).filter((value) => {
      const key = String(value || '').trim().toLowerCase();
      return key && !targetSet.has(key);
    }).slice(0, limit);
  }

  function deckComparisonBundle(primaryDeck, compareDeck) {
    if (!primaryDeck || !compareDeck) return null;

    const primary = deckExportBundle(primaryDeck);
    const compare = deckExportBundle(compareDeck);
    const primaryKeySet = new Set(primary.styles.map((style) => referenceKey(style)));
    const compareKeySet = new Set(compare.styles.map((style) => referenceKey(style)));

    const overlapStyles = primary.styles.filter((style) => compareKeySet.has(referenceKey(style)));
    const primaryOnlyStyles = primary.styles.filter((style) => !compareKeySet.has(referenceKey(style)));
    const compareOnlyStyles = compare.styles.filter((style) => !primaryKeySet.has(referenceKey(style)));
    const sharedFocus = primary.focusTerms.filter((term) => {
      const key = String(term || '').trim().toLowerCase();
      return key && compare.focusTerms.some((item) => String(item || '').trim().toLowerCase() === key);
    }).slice(0, 4);
    const primaryOnlyFocus = binderUniqueTerms(primary.focusTerms, compare.focusTerms, 4);
    const compareOnlyFocus = binderUniqueTerms(compare.focusTerms, primary.focusTerms, 4);
    const sharedLabels = overlapStyles.slice(0, 3).map((style) => binderStyleLabel(style));
    if (overlapStyles.length > 3) sharedLabels.push(`외 ${overlapStyles.length - 3}개`);

    const recommendation = (() => {
      if (!overlapStyles.length) return '두 보드가 거의 겹치지 않아 A/B 방향 테스트나 고객 취향 분기용으로 좋습니다.';
      if (!primaryOnlyStyles.length || !compareOnlyStyles.length) return '두 보드가 매우 가까워서 하나의 방향으로 합치거나 카드만 정리해도 충분합니다.';
      return '겹치는 기반 위에 차별 포인트가 분명해 버전 분화와 프레젠테이션 비교에 적합합니다.';
    })();

    const memo = [
      `# ${primaryDeck.name} vs ${compareDeck.name}`,
      `공통 카드: ${overlapStyles.length}`,
      `${primaryDeck.name}만: ${primaryOnlyStyles.length}`,
      `${compareDeck.name}만: ${compareOnlyStyles.length}`,
      sharedLabels.length ? `겹치는 레퍼런스: ${sharedLabels.join(', ')}` : '겹치는 레퍼런스: 없음',
      sharedFocus.length ? `공통 키워드: ${sharedFocus.join(', ')}` : '공통 키워드: 거의 없음',
      primaryOnlyFocus.length ? `${primaryDeck.name} 고유 키워드: ${primaryOnlyFocus.join(', ')}` : `${primaryDeck.name} 고유 키워드: 없음`,
      compareOnlyFocus.length ? `${compareDeck.name} 고유 키워드: ${compareOnlyFocus.join(', ')}` : `${compareDeck.name} 고유 키워드: 없음`,
      `추천: ${recommendation}`
    ].join('\n');

    return {
      primary,
      compare,
      overlapStyles,
      primaryOnlyStyles,
      compareOnlyStyles,
      sharedFocus,
      primaryOnlyFocus,
      compareOnlyFocus,
      recommendation,
      memo,
      memoPreview: binderPreviewText(memo, 220)
    };
  }

  function renderBinderWorkspace() {
    if (!dom.binderWorkspace) return;
    dom.binderWorkspace.innerHTML = '';

    const deck = selectedDeck();
    if (!deck) {
      dom.binderWorkspace.innerHTML = `
        <article class="binder-empty-state">
          <div class="binder-workspace-kicker">workspace</div>
          <strong>활성 보드를 찾지 못했습니다.</strong>
        </article>
      `;
      return;
    }

    const bundle = deckExportBundle(deck);
    const updatedLabel = binderDateLabel(deck.updatedAt);
    const activeSiteLabel = (SITES[activeSiteKey] || SITES.pinterest).label;

    const workspaceCard = document.createElement('article');
    workspaceCard.className = 'binder-workspace-card';

    const head = document.createElement('div');
    head.className = 'binder-workspace-head';

    const headCopy = document.createElement('div');
    headCopy.className = 'binder-workspace-copy';
    const kicker = document.createElement('div');
    kicker.className = 'binder-workspace-kicker';
    kicker.textContent = 'active board';
    headCopy.appendChild(kicker);

    const title = document.createElement('h3');
    title.className = 'binder-workspace-title';
    title.textContent = deck.name;
    headCopy.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'binder-workspace-meta';
    meta.textContent = `${bundle.styles.length}개 카드${updatedLabel ? ` · 최근 수정 ${updatedLabel}` : ''}`;
    headCopy.appendChild(meta);
    head.appendChild(headCopy);

    const actions = document.createElement('div');
    actions.className = 'binder-workspace-actions';

    const createAction = (label, handler, { accent = false, disabled = false } = {}) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `binder-action-btn ${accent ? 'accent' : ''}`.trim();
      button.textContent = label;
      button.disabled = disabled;
      button.addEventListener('click', handler);
      return button;
    };

    actions.appendChild(createAction('그리드에서 보기', () => {
      applyBinderFilter('deck', deck.id);
      setBinderPanelOpen(false);
    }, { accent: true, disabled: bundle.styles.length === 0 }));

    actions.appendChild(createAction('보드 요약 복사', async () => {
      await writeClipboard(bundle.summary);
      showToast('보드 요약을 복사했습니다.');
    }, { disabled: bundle.styles.length === 0 }));

    actions.appendChild(createAction(`검색팩 복사 · ${activeSiteLabel}`, async () => {
      await writeClipboard(bundle.searchPack);
      showToast('검색팩을 복사했습니다.');
    }, { disabled: bundle.styles.length === 0 }));

    actions.appendChild(createAction('프롬프트팩 복사', async () => {
      await writeClipboard(bundle.promptPack);
      showToast('프롬프트팩을 복사했습니다.');
    }, { disabled: bundle.styles.length === 0 }));

    head.appendChild(actions);
    workspaceCard.appendChild(head);

    const chips = document.createElement('div');
    chips.className = 'binder-workspace-chips';
    const chipValues = [
      ...bundle.typeLabels.slice(0, 4),
      ...bundle.focusTerms.slice(0, Math.max(0, 8 - bundle.typeLabels.length))
    ];
    if (chipValues.length) {
      chipValues.forEach((label) => {
        const chip = document.createElement('span');
        chip.className = 'binder-workspace-chip';
        chip.textContent = label;
        chips.appendChild(chip);
      });
    } else {
      const chip = document.createElement('span');
      chip.className = 'binder-workspace-chip empty';
      chip.textContent = '카드를 저장하면 방향성이 자동으로 정리됩니다';
      chips.appendChild(chip);
    }
    workspaceCard.appendChild(chips);

    const previewSection = document.createElement('div');
    previewSection.className = 'binder-workspace-block';
    previewSection.innerHTML = '<div class="binder-section-label">저장된 카드 프리뷰</div>';

    if (bundle.styles.length) {
      const previewGrid = document.createElement('div');
      previewGrid.className = 'binder-preview-grid';

      bundle.styles.slice(0, 4).forEach((style) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'binder-preview-card';
        button.addEventListener('click', () => {
          applyBinderFilter('deck', deck.id);
          setBinderPanelOpen(false);
          selectStyle(style);
        });

        const img = document.createElement('img');
        img.className = 'binder-preview-thumb';
        img.alt = binderStyleLabel(style);
        applyThumb(img, style);
        button.appendChild(img);

        const meta = document.createElement('div');
        meta.className = 'binder-preview-meta';

        const label = document.createElement('div');
        label.className = 'binder-preview-label';
        label.textContent = binderStyleLabel(style);
        meta.appendChild(label);

        const type = document.createElement('div');
        type.className = 'binder-preview-type';
        type.textContent = directoryLabel(styleTypeKey(style));
        meta.appendChild(type);

        button.appendChild(meta);
        previewGrid.appendChild(button);
      });

      previewSection.appendChild(previewGrid);
    } else {
      const empty = document.createElement('div');
      empty.className = 'binder-empty-state compact';
      empty.innerHTML = '<strong>보드가 아직 비어 있습니다.</strong><span>카드를 저장하면 요약, 검색팩, 프롬프트팩이 바로 생성됩니다.</span>';
      previewSection.appendChild(empty);
    }

    workspaceCard.appendChild(previewSection);
    dom.binderWorkspace.appendChild(workspaceCard);

    const exportGrid = document.createElement('div');
    exportGrid.className = 'binder-export-grid';

    [
      {
        title: '보드 요약',
        preview: bundle.summaryPreview,
        text: bundle.summary,
        toast: '보드 요약을 복사했습니다.'
      },
      {
        title: `검색팩 · ${activeSiteLabel}`,
        preview: bundle.searchPreview,
        text: bundle.searchPack,
        toast: '검색팩을 복사했습니다.'
      },
      {
        title: '프롬프트팩',
        preview: bundle.promptPreview,
        text: bundle.promptPack,
        toast: '프롬프트팩을 복사했습니다.'
      }
    ].forEach((item) => {
      const card = document.createElement('article');
      card.className = 'binder-export-card';

      const cardHead = document.createElement('div');
      cardHead.className = 'binder-export-head';

      const title = document.createElement('h4');
      title.className = 'binder-export-title';
      title.textContent = item.title;
      cardHead.appendChild(title);

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'binder-export-copy';
      copyBtn.textContent = '복사';
      copyBtn.disabled = bundle.styles.length === 0;
      copyBtn.addEventListener('click', async () => {
        await writeClipboard(item.text);
        showToast(item.toast);
      });
      cardHead.appendChild(copyBtn);

      const preview = document.createElement('p');
      preview.className = 'binder-export-preview';
      preview.textContent = item.preview || '카드를 저장하면 이 영역에 자동으로 제안 내용이 생성됩니다.';

      card.appendChild(cardHead);
      card.appendChild(preview);
      exportGrid.appendChild(card);
    });

    dom.binderWorkspace.appendChild(exportGrid);

    const compareCard = document.createElement('article');
    compareCard.className = 'binder-export-card binder-compare-card';

    const compareDeck = resolveBinderCompareDeck(deck);
    if (!compareDeck) {
      compareCard.innerHTML = `
        <div class="binder-export-head">
          <h4 class="binder-export-title">보드 비교</h4>
        </div>
        <div class="binder-empty-state compact">
          <strong>비교할 보드가 아직 없습니다.</strong>
          <span>보드를 하나 더 만들면 방향 A/B를 나란히 보고 비교 메모까지 바로 복사할 수 있습니다.</span>
        </div>
      `;
      dom.binderWorkspace.appendChild(compareCard);
      return;
    }

    const comparison = deckComparisonBundle(deck, compareDeck);
    if (!comparison) {
      dom.binderWorkspace.appendChild(compareCard);
      return;
    }

    const compareHead = document.createElement('div');
    compareHead.className = 'binder-export-head';

    const compareTitleWrap = document.createElement('div');
    compareTitleWrap.className = 'binder-compare-title-wrap';

    const compareTitle = document.createElement('h4');
    compareTitle.className = 'binder-export-title';
    compareTitle.textContent = '보드 비교';
    compareTitleWrap.appendChild(compareTitle);

    const compareMeta = document.createElement('p');
    compareMeta.className = 'binder-compare-meta';
    compareMeta.textContent = `${deck.name} vs ${compareDeck.name}`;
    compareTitleWrap.appendChild(compareMeta);
    compareHead.appendChild(compareTitleWrap);

    const copyCompareBtn = document.createElement('button');
    copyCompareBtn.type = 'button';
    copyCompareBtn.className = 'binder-export-copy';
    copyCompareBtn.textContent = '비교 메모 복사';
    copyCompareBtn.addEventListener('click', async () => {
      await writeClipboard(comparison.memo);
      showToast('비교 메모를 복사했습니다.');
    });
    compareHead.appendChild(copyCompareBtn);
    compareCard.appendChild(compareHead);

    const compareField = document.createElement('label');
    compareField.className = 'binder-compare-field';
    compareField.innerHTML = '<span class="binder-section-label">비교 대상</span>';

    const compareSelect = document.createElement('select');
    compareSelect.className = 'site-select binder-compare-select';
    (binderState?.decks || []).filter((item) => item.id !== deck.id).forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = `${item.name} (${(item.cardIds || []).length})`;
      if (item.id === compareDeck.id) option.selected = true;
      compareSelect.appendChild(option);
    });
    compareSelect.addEventListener('change', () => {
      binderCompareDeckId = compareSelect.value;
      renderBinderPanel();
    });
    compareField.appendChild(compareSelect);
    compareCard.appendChild(compareField);

    const compareStats = document.createElement('div');
    compareStats.className = 'binder-compare-stats';
    [
      ['공통 카드', comparison.overlapStyles.length],
      [`${deck.name}만`, comparison.primaryOnlyStyles.length],
      [`${compareDeck.name}만`, comparison.compareOnlyStyles.length]
    ].forEach(([label, value]) => {
      const stat = document.createElement('article');
      stat.className = 'binder-compare-stat';
      const statValue = document.createElement('div');
      statValue.className = 'binder-stat-value';
      statValue.textContent = String(value);
      stat.appendChild(statValue);

      const statLabel = document.createElement('div');
      statLabel.className = 'binder-stat-label';
      statLabel.textContent = label;
      stat.appendChild(statLabel);
      compareStats.appendChild(stat);
    });
    compareCard.appendChild(compareStats);

    const compareNote = document.createElement('p');
    compareNote.className = 'binder-compare-note';
    compareNote.textContent = comparison.memoPreview;
    compareCard.appendChild(compareNote);

    const comparePanels = document.createElement('div');
    comparePanels.className = 'binder-compare-panels';

    [
      {
        title: deck.name,
        meta: `${comparison.primary.styles.length}개 카드`,
        chips: comparison.primaryOnlyFocus.length ? comparison.primaryOnlyFocus : comparison.primary.typeLabels
      },
      {
        title: compareDeck.name,
        meta: `${comparison.compare.styles.length}개 카드`,
        chips: comparison.compareOnlyFocus.length ? comparison.compareOnlyFocus : comparison.compare.typeLabels
      }
    ].forEach((panel) => {
      const article = document.createElement('article');
      article.className = 'binder-compare-panel';

      const title = document.createElement('h5');
      title.className = 'binder-compare-panel-title';
      title.textContent = panel.title;
      article.appendChild(title);

      const meta = document.createElement('p');
      meta.className = 'binder-compare-panel-meta';
      meta.textContent = panel.meta;
      article.appendChild(meta);

      const chips = document.createElement('div');
      chips.className = 'binder-workspace-chips';
      (panel.chips.length ? panel.chips : ['고유 포인트 없음']).forEach((chipLabel) => {
        const chip = document.createElement('span');
        chip.className = `binder-workspace-chip ${panel.chips.length ? '' : 'empty'}`.trim();
        chip.textContent = chipLabel;
        chips.appendChild(chip);
      });
      article.appendChild(chips);
      comparePanels.appendChild(article);
    });

    compareCard.appendChild(comparePanels);

    if (comparison.sharedFocus.length) {
      const sharedBlock = document.createElement('div');
      sharedBlock.className = 'binder-workspace-block';

      const sharedLabel = document.createElement('div');
      sharedLabel.className = 'binder-section-label';
      sharedLabel.textContent = '공통 시그널';
      sharedBlock.appendChild(sharedLabel);

      const sharedChips = document.createElement('div');
      sharedChips.className = 'binder-workspace-chips';
      comparison.sharedFocus.forEach((label) => {
        const chip = document.createElement('span');
        chip.className = 'binder-workspace-chip';
        chip.textContent = label;
        sharedChips.appendChild(chip);
      });
      sharedBlock.appendChild(sharedChips);
      compareCard.appendChild(sharedBlock);
    }

    dom.binderWorkspace.appendChild(compareCard);
  }

  function renderBinderPanel() {
    if (!dom.binderCollections || !dom.binderSummary || !dom.binderWorkspace) return;

    const favorites = binderState?.favorites || [];
    const decks = binderState?.decks || [];

    dom.binderSummary.innerHTML = `
      <article class="binder-stat-card">
        <div class="binder-stat-value">${favorites.length}</div>
        <div class="binder-stat-label">즐겨찾기</div>
      </article>
      <article class="binder-stat-card">
        <div class="binder-stat-value">${decks.length}</div>
        <div class="binder-stat-label">보드</div>
      </article>
      <article class="binder-stat-card">
        <div class="binder-stat-value">${Object.keys(binderState?.backgrounds || {}).length}</div>
        <div class="binder-stat-label">커스텀 커버</div>
      </article>
    `;

    renderBinderWorkspace();
    dom.binderCollections.innerHTML = '';

    const createCollectionButton = (label, count, isActive, onClick) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `binder-collection-button ${isActive ? 'active' : ''}`.trim();
      button.innerHTML = `<span>${label}</span><span class="binder-count">${count}</span>`;
      button.addEventListener('click', onClick);
      return button;
    };

    dom.binderCollections.appendChild(
      createCollectionButton('전체 카드', allReferences().length, !activeBinderFilterType, () => {
        applyBinderFilter('', '');
      })
    );
    dom.binderCollections.appendChild(
      createCollectionButton('즐겨찾기', favorites.length, activeBinderFilterType === 'favorites', () => {
        applyBinderFilter('favorites', 'favorites');
      })
    );

    decks.forEach((deck) => {
      const row = document.createElement('div');
      row.className = 'binder-deck-row';

      const main = createCollectionButton(deck.name, (deck.cardIds || []).length, activeBinderFilterType === 'deck' && activeBinderFilterId === deck.id, () => {
        binderState.selectedDeckId = deck.id;
        applyBinderFilter('deck', deck.id);
      });
      main.classList.add('binder-deck-main');

      const tools = document.createElement('div');
      tools.className = 'binder-deck-tools';

      const selectBtn = document.createElement('button');
      selectBtn.type = 'button';
      selectBtn.className = `binder-mini-btn ${binderState.selectedDeckId === deck.id ? 'active' : ''}`.trim();
      selectBtn.textContent = '활성';
      selectBtn.title = '현재 작업 보드로 사용';
      selectBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        setSelectedDeck(deck.id);
        renderBinderPanel();
        if (detailStyleId) {
          const style = allReferences().find((item) => item.id === detailStyleId);
          if (style) renderDetailBinderSection(style);
        }
      });
      tools.appendChild(selectBtn);

      const renameBtn = document.createElement('button');
      renameBtn.type = 'button';
      renameBtn.className = 'binder-mini-btn';
      renameBtn.textContent = '이름 변경';
      renameBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        renameDeck(deck.id);
      });
      tools.appendChild(renameBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'binder-mini-btn danger';
      deleteBtn.textContent = '삭제';
      deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteDeck(deck.id);
      });
      tools.appendChild(deleteBtn);

      row.appendChild(main);
      row.appendChild(tools);
      dom.binderCollections.appendChild(row);
    });
  }

  function enhanceDetailBinderSection() {
    const anchor = dom.detailActions?.closest('.detail-section');
    if (!anchor || document.getElementById('detailBinderSection')) return;
    const section = document.createElement('section');
    section.id = 'detailBinderSection';
    section.className = 'detail-section detail-binder-section';
    section.innerHTML = `
      <div class="detail-section-title">프로젝트 보드</div>
      <div class="detail-binder-grid">
        <div class="detail-binder-row">
          <button id="detailFavoriteToggle" type="button" class="detail-copy-btn">즐겨찾기</button>
          <button id="detailOpenBinder" type="button" class="detail-copy-btn">보드 열기</button>
        </div>
        <label class="detail-field">
          <span class="detail-field-label">현재 작업 보드</span>
          <select id="detailDeckSelect" class="site-select" aria-label="현재 작업 보드"></select>
        </label>
        <div class="detail-binder-row">
          <button id="detailDeckToggle" type="button" class="detail-copy-btn">보드에 저장</button>
          <button id="detailDeckCreate" type="button" class="detail-copy-btn">새 보드</button>
          <button id="detailDeckView" type="button" class="detail-copy-btn">현재 보드 보기</button>
        </div>
        <div class="detail-binder-row">
          <input id="detailBgInput" type="file" accept="image/*" hidden />
          <button id="detailBgUpload" type="button" class="detail-copy-btn">커버 업로드</button>
          <button id="detailBgReset" type="button" class="detail-copy-btn">커버 초기화</button>
        </div>
        <div id="detailBinderStatus" class="detail-binder-status"></div>
      </div>
    `;
    anchor.after(section);

    dom.detailFavoriteToggle = document.getElementById('detailFavoriteToggle');
    dom.detailOpenBinder = document.getElementById('detailOpenBinder');
    dom.detailDeckSelect = document.getElementById('detailDeckSelect');
    dom.detailDeckToggle = document.getElementById('detailDeckToggle');
    dom.detailDeckCreate = document.getElementById('detailDeckCreate');
    dom.detailDeckView = document.getElementById('detailDeckView');
    dom.detailBgInput = document.getElementById('detailBgInput');
    dom.detailBgUpload = document.getElementById('detailBgUpload');
    dom.detailBgReset = document.getElementById('detailBgReset');
    dom.detailBinderStatus = document.getElementById('detailBinderStatus');
  }

  function renderDetailBinderSection(style) {
    if (!style || !dom.detailDeckSelect) return;
    const currentDeck = selectedDeck();
    const isFavorite = isFavoriteStyle(style);
    const isInDeck = currentDeck ? deckContainsStyle(currentDeck.id, style) : false;
    const hasCustomCover = Boolean(customBackgroundFor(style));

    if (dom.detailFavoriteToggle) {
      dom.detailFavoriteToggle.textContent = isFavorite ? '즐겨찾기됨' : '즐겨찾기';
      dom.detailFavoriteToggle.classList.toggle('active', isFavorite);
      dom.detailFavoriteToggle.onclick = () => {
        const next = toggleFavoriteStyle(style);
        render();
        openDetail(style);
        showToast(next ? '즐겨찾기에 추가했습니다.' : '즐겨찾기에서 제거했습니다.');
      };
    }

    if (dom.detailOpenBinder) {
      dom.detailOpenBinder.onclick = () => {
        renderBinderPanel();
        setBinderPanelOpen(true);
      };
    }

    if (dom.detailDeckSelect) {
      dom.detailDeckSelect.innerHTML = '';
      (binderState?.decks || []).forEach((deck) => {
        const option = document.createElement('option');
        option.value = deck.id;
        option.textContent = `${deck.name} (${(deck.cardIds || []).length})`;
        dom.detailDeckSelect.appendChild(option);
      });
      if (currentDeck) dom.detailDeckSelect.value = currentDeck.id;
      dom.detailDeckSelect.onchange = () => {
        setSelectedDeck(dom.detailDeckSelect.value);
        renderDetailBinderSection(style);
        renderBinderPanel();
      };
    }

    if (dom.detailDeckToggle) {
      dom.detailDeckToggle.textContent = isInDeck ? '보드에서 제거' : '보드에 저장';
      dom.detailDeckToggle.classList.toggle('active', isInDeck);
      dom.detailDeckToggle.onclick = () => {
        const targetDeck = selectedDeck();
        if (!targetDeck) return;
        const added = toggleDeckMembership(style, targetDeck.id);
        render();
        openDetail(style);
        showToast(added ? `${targetDeck.name}에 저장했습니다.` : `${targetDeck.name}에서 제거했습니다.`);
      };
    }

    if (dom.detailDeckCreate) {
      dom.detailDeckCreate.onclick = () => {
        const name = window.prompt('새 보드 이름', `보드 ${(binderState?.decks || []).length + 1}`);
        if (!name) return;
        const deck = createDeck(name, style);
        render();
        openDetail(style);
        showToast(`${deck.name}를 만들었습니다.`);
      };
    }

    if (dom.detailDeckView) {
      dom.detailDeckView.disabled = !currentDeck;
      dom.detailDeckView.onclick = () => {
        if (!currentDeck) return;
        applyBinderFilter('deck', currentDeck.id);
        setBinderPanelOpen(false);
      };
    }

    if (dom.detailBgUpload && dom.detailBgInput) {
      dom.detailBgUpload.onclick = () => {
        dom.detailBgInput.value = '';
        dom.detailBgInput.click();
      };
      dom.detailBgInput.onchange = async () => {
        const file = dom.detailBgInput.files && dom.detailBgInput.files[0];
        if (!file) return;
        try {
          await setCustomBackgroundFromFile(style, file);
          render();
          openDetail(style);
          showToast('커스텀 커버를 업데이트했습니다.');
        } catch (err) {
          console.error(err);
          showToast('커스텀 커버를 설정하지 못했습니다.');
        }
      };
    }

    if (dom.detailBgReset) {
      dom.detailBgReset.disabled = !hasCustomCover;
      dom.detailBgReset.onclick = async () => {
        await removeCustomBackground(style);
        render();
        openDetail(style);
        showToast('커스텀 커버를 제거했습니다.');
      };
    }

    if (dom.detailBinderStatus) {
      const bits = [];
      bits.push(currentDeck ? `현재 보드: ${currentDeck.name}` : '현재 보드: 없음');
      bits.push(hasCustomCover ? '커스텀 커버 사용 중' : '기본 썸네일 사용 중');
      if (activeBinderFilterType === 'favorites') bits.push('즐겨찾기 보는 중');
      if (activeBinderFilterType === 'deck' && activeBinderFilterId) bits.push(`${binderDeckLabel(activeBinderFilterId)} 보는 중`);
      dom.detailBinderStatus.textContent = bits.join(' · ');
    }
  }

  function matchesBinderScope(style) {
    if (!activeBinderFilterType) return true;
    if (activeBinderFilterType === 'favorites') {
      return (binderState?.favorites || []).includes(referenceKey(style));
    }
    if (activeBinderFilterType === 'deck') {
      const deck = (binderState?.decks || []).find((item) => item.id === activeBinderFilterId);
      return Boolean(deck && (deck.cardIds || []).includes(referenceKey(style)));
    }
    return true;
  }

  function renderBinderActiveChip() {
    if (!dom.activeChips || !activeBinderFilterType) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pill';
    const label = activeBinderFilterType === 'favorites'
      ? '보드: 즐겨찾기'
      : `보드: ${binderDeckLabel(activeBinderFilterId)}`;
    button.textContent = label;
    button.addEventListener('click', () => {
      applyBinderFilter('', '');
    });
    dom.activeChips.appendChild(button);
  }

  function applyThumb(imgEl, style) {
    const mode = directoryMode === 'all' ? styleTypeKey(style) : directoryMode;
    const sources = thumbSourceCandidates(style.id, mode);
    const artistFallback = artistThumbDataUri(style);
    const charFallback = characterThumbDataUri(style);
    const paletteFallback = paletteThumbDataUri(style);
    const poseFallback = poseThumbDataUri(style);
    const designFallback = designThumbDataUri(style);
    const custom = customBackgroundFor(style);
    const order = mode === 'artist'
      ? [custom, ...sources, artistFallback]
      : mode === 'character'
      ? [custom, ...sources, charFallback]
      : mode === 'palette'
        ? [custom, ...sources, paletteFallback]
        : mode === 'pose'
          ? [custom, ...sources, poseFallback]
          : [custom, ...sources, designFallback];
    const safeOrder = order.filter(Boolean);
    let idx = 0;
    imgEl.onerror = () => {
      idx += 1;
      if (idx >= safeOrder.length) {
        imgEl.onerror = null;
        return;
      }
      imgEl.src = safeOrder[idx];
    };
    imgEl.src = safeOrder[0];
  }

  function filterSignature() {
    const base = [
      directoryMode,
      sortMode,
      query,
      activeTag,
      activeEnInitial,
      activeDigitInitial,
      activePoseType,
      activePoseVariant,
      activePaletteCategory,
      activeCharacterFacet,
      activeDesignFacet,
      activePhotoFacet,
      activeArtistFacet,
      activeUnifiedType,
      activeUnifiedMood,
      activeUnifiedUse,
      activeUnifiedEra,
      activeBinderFilterType,
      activeBinderFilterId,
      selectedStyleId,
      detailStyleId,
      detailSearchStyleId,
      detailSiteKey,
      detailQuerySeedMode,
      detailExpansionKey,
      detailSearchDraft,
      activeBindMenuStyleId,
      binderRenderRevision,
      shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature()
        ? (shuffleState.revision || 'shuffled')
        : ''
    ];
    return base.map((x) => String(x || '')).join('|');
  }

  function shuffleContextSignature() {
    const base = [
      directoryMode,
      query,
      activeTag,
      activeEnInitial,
      activeDigitInitial,
      activePoseType,
      activePoseVariant,
      activePaletteCategory,
      activeCharacterFacet,
      activeDesignFacet,
      activePhotoFacet,
      activeArtistFacet,
      activeUnifiedType,
      activeUnifiedMood,
      activeUnifiedUse,
      activeUnifiedEra,
      activeBinderFilterType,
      activeBinderFilterId
    ];
    return base.map((x) => String(x || '')).join('|');
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
    activeCharacterFacet = '';
    activeDesignFacet = '';
    activePhotoFacet = '';
    activeArtistFacet = '';
    activeUnifiedType = '';
    activeUnifiedMood = '';
    activeUnifiedUse = '';
    activeUnifiedEra = '';
    activeBinderFilterType = '';
    activeBinderFilterId = '';
    clearShuffle({ persist: true });
    saveBinderState({ silent: true });
    if (dom.search) dom.search.value = '';
    buildJumpBars();
    updateJumpReset();
    render();
  }

  function render() {
    buildJumpBars();
    updateJumpReset();
    if (!STYLES.length) {
      loadStyles();
    }
    if (!STYLES.length) {
      dom.count.textContent = '?곗씠?곌? ?놁뒿?덈떎. `reference-data.js`, `palettes-data.js`, `poses-data.js` 濡쒕뱶瑜??뺤씤?섏꽭??';
      dom.activeTag.textContent = '';
      dom.grid.innerHTML = '<div class="empty-state">`reference-data.js`, `palettes-data.js`, `poses-data.js` 濡쒕뱶 ?ㅽ뙣 ?먮뒗 ?곗씠??0媛쒖엯?덈떎. 釉뚮씪?곗? 肄섏넄(F12)?먯꽌 ?ㅽ듃?뚰겕/?먮윭瑜??뺤씤?댁＜?몄슂.</div>';
      updateStyleGuideStep();
      currentItems = [];
      renderedCount = 0;
      syncLoadMore();
      updateGridMeta({ visible: 0, total: 0, filtered: false, shown: 0 });
      renderBinderPanel();
      syncBinderHeroButton();
      return;
    }
    let items = STYLES
      .filter((s) => matchesScope(s, query))
      .filter(matchesInitials)
      .filter(matchesPoseQuickFilters)
      .filter(matchesCharacterQuickFilters)
      .filter(matchesDesignQuickFilters)
      .filter(matchesPhotoQuickFilters)
      .filter(matchesArtistQuickFilters)
      .filter(matchesPaletteQuickFilters)
      .filter(matchesUnifiedFacets)
      .filter(matchesTag)
      .filter(matchesBinderScope);
    if (shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature() && Array.isArray(shuffleState.order) && shuffleState.order.length) {
      const rank = new Map(shuffleState.order.map((id, idx) => [id, idx]));
      items.sort((a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9));
    } else {
      items = sortItems(items);
    }
    const shuffled = Boolean(shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature());
    const hasAny = (directoryMode === 'all')
      ? Boolean(query || activeTag || activeUnifiedType || activeUnifiedMood || activeUnifiedUse || activeUnifiedEra || activeBinderFilterType || shuffled)
      : (directoryMode === 'pose')
      ? Boolean(query || activeTag || activePoseType || activePoseVariant || activeBinderFilterType || shuffled)
      : (directoryMode === 'palette')
        ? Boolean(query || activeTag || activePaletteCategory || activeBinderFilterType || shuffled)
        : (directoryMode === 'design')
          ? Boolean(query || activeTag || activeDesignFacet || activeBinderFilterType || shuffled)
        : (directoryMode === 'photo')
          ? Boolean(query || activeTag || activePhotoFacet || activeBinderFilterType || shuffled)
        : (directoryMode === 'artist')
          ? Boolean(query || activeTag || activeArtistFacet || activeBinderFilterType || shuffled)
          : Boolean(query || activeTag || activeEnInitial || activeDigitInitial || (directoryMode === 'character' && activeCharacterFacet) || activeBinderFilterType || shuffled);
    dom.activeTag.textContent = activeTag ? `?쒓렇: ${activeTag}` : '';
    renderActiveChips();
    renderBinderActiveChip();
    renderGridTools(items);
    updateGridStatusLine();
    renderBinderPanel();
    syncBinderHeroButton();

    if (!items.length && activeBinderFilterType) {
      activeBinderFilterType = '';
      activeBinderFilterId = '';
      saveBinderState({ silent: true });
      render();
      return;
    }

    if (!items.length) {
      dom.grid.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'empty-state';
      wrapper.textContent = 'No cards match the current filters.';

      const reset = document.createElement('button');
      reset.type = 'button';
      reset.className = 'pill';
      reset.style.marginTop = '10px';
      reset.textContent = 'Clear all';
      reset.addEventListener('click', clearAllFilters);

      wrapper.appendChild(document.createElement('br'));
      wrapper.appendChild(reset);
      dom.grid.appendChild(wrapper);

      currentItems = [];
      renderedCount = 0;
      syncLoadMore();
      updateStyleGuideStep();
      updateGridMeta({ visible: 0, total: STYLES.length, filtered: hasAny, shown: 0 });
      return;
    }

    const sig = filterSignature();
    const sigChanged = sig !== renderSig;
    renderSig = sig;

    if (sigChanged) {
      resetBatch(items);
    } else {
      currentItems = items;
      syncLoadMore();
    }
    updateGridMeta({ visible: items.length, total: STYLES.length, filtered: hasAny, shown: Math.min(renderedCount, items.length) });

    updateStyleGuideStep();
  }

  enhanceBinderUi();
  enhanceDetailBinderSection();

  function renderDetailActions(style) {
    if (!dom.detailActions) return;
    dom.detailActions.innerHTML = '';
    const actions = [{
      label: `${SITES[activeSiteKey]?.label || 'Pinterest'}에서 열기`,
      className: 'detail-action primary',
      onClick: () => window.open(activeSearchUrl(style), '_blank', 'noopener,noreferrer')
    }];
    if (style.type === 'palette' && Array.isArray(style.colors) && style.colors.length) {
      actions.push({
        label: '팔레트 복사',
        className: 'detail-action',
        onClick: async () => {
          if (await writeClipboard(style.colors.slice(0, 8).join(' '))) showToast('팔레트를 복사했습니다.');
        }
      });
    }
    actions.forEach((action) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = action.className;
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      dom.detailActions.appendChild(button);
    });
  }

  function openDetail(style) {
    if (!style || !dom.detailPanel) return;
    detailStyleId = style.id;

    const title = style.ko || style.en || style.id;
    const subtitle = uniqueText([style.en, style.id])
      .filter((value) => normalize(value) !== normalize(title))
      .join(' · ');
    const summary = buildDetailDefinition(style);
    const queryText = effectiveStyleQuery(style, activeSiteKey);
    const promptText = sampleImagePrompt(style);

    if (dom.detailType) dom.detailType.textContent = `${directoryShortLabel(style.type)} Reference`;
    if (dom.detailTitle) dom.detailTitle.textContent = title;
    if (dom.detailSubtitle) {
      dom.detailSubtitle.textContent = subtitle;
      dom.detailSubtitle.hidden = !subtitle;
    }
    if (dom.detailSummary) dom.detailSummary.textContent = summary;
    if (dom.detailThumb) {
      dom.detailThumb.alt = `${style.ko || style.en || style.id}`;
      applyThumb(dom.detailThumb, style);
    }

    renderDetailChipRow(dom.detailFacts, buildDetailFacts(style).map(([label, value]) => ({ label, value })));
    renderDetailList(dom.detailSignals, detailSignalItems(style));
    renderDetailList(dom.detailUseCases, detailUseCaseItems(style));
    renderDetailTokens(dom.detailKeywords, detailKeywordItems(style));
    renderDetailChipRow(dom.detailTags, uniqueText((style.tags || []).map((tag) => `#${tag}`)));

    const paletteColors = Array.isArray(style.colors) ? style.colors.slice(0, 8) : [];
    if (dom.detailPaletteBlock) dom.detailPaletteBlock.hidden = paletteColors.length === 0;
    renderDetailChipRow(dom.detailPalette, paletteColors, { palette: true });

    const links = Array.isArray(style.sourceLinks) ? style.sourceLinks : [];
    if (dom.detailFiguresBlock) dom.detailFiguresBlock.hidden = links.length === 0;
    renderDetailLinks(dom.detailFigures, links);

    if (dom.detailQueryLabel) dom.detailQueryLabel.textContent = `검색어 · ${SITES[activeSiteKey]?.label || 'Search'}`;
    if (dom.detailQueryText) dom.detailQueryText.textContent = queryText || '-';
    if (dom.detailPromptText) dom.detailPromptText.textContent = promptText || '-';
    bindDetailCopyAction(dom.detailQueryCopy, queryText, '검색어를 복사했습니다.');
    bindDetailCopyAction(dom.detailPromptCopy, promptText, '프롬프트를 복사했습니다.');
    renderDetailActions(style);

    if (dom.detailSameTypeBlock) dom.detailSameTypeBlock.hidden = true;
    if (dom.detailSameType) dom.detailSameType.innerHTML = '';

    if (dom.detailCrossTypeBlock) dom.detailCrossTypeBlock.hidden = true;
    if (dom.detailCrossType) dom.detailCrossType.innerHTML = '';

    dom.detailPanel.hidden = false;
    document.body.classList.add('detail-open');
  }

  function renderDetailActions(style) {
    if (!dom.detailActions) return;
    dom.detailActions.innerHTML = '';
    const actions = [{
      label: '현재 검색어로 열기',
      className: 'detail-action primary',
      onClick: () => openQueryOnSite(String(dom.detailSearchInput?.value || '').trim() || preciseSearchQuery(style, activeSiteKey), activeSiteKey)
    }];
    if (activeSiteKey !== 'pinterest') {
      actions.push({
        label: 'Pinterest 빠른 검색',
        className: 'detail-action',
        onClick: () => openQueryOnSite(quickSearchQuery(style, 'pinterest'), 'pinterest')
      });
    }
    if (style.type === 'palette' && Array.isArray(style.colors) && style.colors.length) {
      actions.push({
        label: 'HEX 팔레트 복사',
        className: 'detail-action',
        onClick: async () => {
          if (await writeClipboard(style.colors.slice(0, 8).join(' '))) showToast('HEX 팔레트를 복사했습니다.');
        }
      });
    }
    actions.forEach((action) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = action.className;
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      dom.detailActions.appendChild(button);
    });
  }

  function openDetail(style) {
    if (!style || !dom.detailPanel) return;
    detailStyleId = style.id;

    const title = style.ko || style.en || style.id;
    const subtitle = uniqueText([style.en, style.id])
      .filter((value) => normalize(value) !== normalize(title))
      .join(' · ');
    const summary = buildDetailDefinition(style);
    const promptBundle = buildPromptBundle(style);

    if (dom.detailType) dom.detailType.textContent = `${directoryShortLabel(style.type)} Reference`;
    if (dom.detailTitle) dom.detailTitle.textContent = title;
    if (dom.detailSubtitle) {
      dom.detailSubtitle.textContent = subtitle;
      dom.detailSubtitle.hidden = !subtitle;
    }
    if (dom.detailSummary) dom.detailSummary.textContent = summary;
    if (dom.detailThumb) {
      dom.detailThumb.alt = `${style.ko || style.en || style.id}`;
      applyThumb(dom.detailThumb, style);
    }

    renderDetailChipRow(dom.detailFacts, buildDetailFacts(style).map(([label, value]) => ({ label, value })));
    renderDetailList(dom.detailSignals, detailSignalItems(style));
    renderDetailList(dom.detailUseCases, detailUseCaseItems(style));
    renderDetailTokens(dom.detailKeywords, detailKeywordItems(style));
    renderDetailChipRow(dom.detailTags, uniqueText((style.tags || []).map((tag) => `#${tag}`)));

    const paletteColors = Array.isArray(style.colors) ? style.colors.slice(0, 8) : [];
    if (dom.detailPaletteBlock) dom.detailPaletteBlock.hidden = paletteColors.length === 0;
    renderDetailChipRow(dom.detailPalette, paletteColors, { palette: true });

    const links = Array.isArray(style.sourceLinks) ? style.sourceLinks : [];
    if (dom.detailFiguresBlock) dom.detailFiguresBlock.hidden = links.length === 0;
    renderDetailLinks(dom.detailFigures, links);

    renderDetailSearchWorkbench(style);
    renderDetailBinderSection(style);

    if (dom.detailGeneratePromptText) dom.detailGeneratePromptText.textContent = promptBundle.generate || '-';
    if (dom.detailTransformPromptText) dom.detailTransformPromptText.textContent = promptBundle.transform || '-';
    if (dom.detailExpandPromptText) dom.detailExpandPromptText.textContent = promptBundle.expand || '-';
    bindDetailCopyAction(dom.detailGeneratePromptCopy, promptBundle.generate, '생성 프롬프트를 복사했습니다.');
    bindDetailCopyAction(dom.detailTransformPromptCopy, promptBundle.transform, '변환 프롬프트를 복사했습니다.');
    bindDetailCopyAction(dom.detailExpandPromptCopy, promptBundle.expand, '확장 프롬프트를 복사했습니다.');
    renderDetailActions(style);

    if (dom.detailSameTypeBlock) dom.detailSameTypeBlock.hidden = true;
    if (dom.detailSameType) dom.detailSameType.innerHTML = '';

    if (dom.detailCrossTypeBlock) dom.detailCrossTypeBlock.hidden = true;
    if (dom.detailCrossType) dom.detailCrossType.innerHTML = '';

    dom.detailPanel.hidden = false;
    document.body.classList.add('detail-open');
  }

  function matchesScope(style, q) {
    if (!q) return true;
    const nq = normalize(q);
    const hayAll = [
      directoryLabel(style.type),
      style.ko,
      style.en,
      style.overview,
      style.id,
      style.q,
      ...(style.aliases || []),
      ...(style.searchTokens || []),
      ...(style.moods || []),
      ...(style.useCases || []),
      ...(style.eras || []),
      ...(style.regions || []),
      ...(style.media || []),
      ...(style.tags || []),
      ...(style.figures || []),
      ...(style.characteristics || [])
    ].map(normalize).join(' ');
    return hayAll.includes(nq);
  }

  function matchesInitials(style) {
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
    const poseTypeLabels = {
      standing: { ko: '서기', en: 'Standing' },
      sitting: { ko: '앉기', en: 'Sitting' },
      running: { ko: '달리기', en: 'Running' },
      jumping: { ko: '점프', en: 'Jumping' },
      action: { ko: '액션', en: 'Action' },
      fighting: { ko: '격투', en: 'Fighting' },
      dancing: { ko: '댄스', en: 'Dancing' },
      fashion: { ko: '패션', en: 'Fashion' },
      romance: { ko: '로맨스', en: 'Romance' },
      daily: { ko: '일상', en: 'Daily' },
      profile: { ko: '프로필', en: 'Profile' },
      duo: { ko: '2인', en: 'Duo' },
      group: { ko: '그룹', en: 'Group' }
    };
    const meta = poseTypeLabels[String(k || '')];
    if (meta) return `${meta.ko} (${meta.en})`;
    const s = String(k || '').replace(/-/g, ' ');
    return s ? `${s.slice(0, 1).toUpperCase()}${s.slice(1)}` : '';
  }

  function poseVariantLabel(k) {
    const poseVariantLabels = {
      front: { ko: '정면', en: 'Front' },
      back: { ko: '후면', en: 'Back' },
      side: { ko: '측면', en: 'Side' },
      seated: { ko: '착석', en: 'Seated' },
      crouch: { ko: '웅크림', en: 'Crouch' },
      dynamic: { ko: '역동', en: 'Dynamic' },
      relaxed: { ko: '편안함', en: 'Relaxed' },
      silhouette: { ko: '실루엣', en: 'Silhouette' },
      foreshortening: { ko: '원근 과장', en: 'Foreshortening' },
      'low-angle': { ko: '로우 앵글', en: 'Low Angle' },
      'high-angle': { ko: '하이 앵글', en: 'High Angle' },
      'key-pose': { ko: '키 포즈', en: 'Key Pose' }
    };
    const meta = poseVariantLabels[String(k || '')];
    if (meta) return `${meta.ko} (${meta.en})`;
    const s = String(k || '').replace(/-/g, ' ');
    return s ? `${s.slice(0, 1).toUpperCase()}${s.slice(1)}` : '';
  }

  function matchesPoseQuickFilters(style) {
    if (directoryMode !== 'pose') return true;
    if (activePoseType && String(style.poseType || '').trim() !== activePoseType) return false;
    return true;
  }

  function matchesCharacterQuickFilters(style) {
    if (directoryMode !== 'character') return true;
    if (!activeCharacterFacet) return true;
    const tags = new Set((style.tags || []).map((t) => String(t || '').toLowerCase()));
    const facet = String(activeCharacterFacet || '').toLowerCase();
    if (facet === '2d') return tags.has('2d');
    if (facet === '3d') return tags.has('3d');
    if (facet === 'pixel') return tags.has('pixel') || tags.has('pixel-art');
    if (facet === 'realistic') return tags.has('realistic') || normalize(style.en).includes('realistic');
    if (facet === 'toon') return tags.has('toon') || tags.has('cel-shading');
    return true;
  }

  function styleTagSet(style) {
    return new Set((style?.tags || []).map((tag) => String(tag || '').toLowerCase()));
  }

  function styleMediaSet(style) {
    return new Set((style?.media || []).map((value) => String(value || '').toLowerCase()));
  }

  function matchesAnyTag(style, tags) {
    const tagSet = styleTagSet(style);
    return tags.some((tag) => tagSet.has(String(tag).toLowerCase()));
  }

  const DESIGN_FACETS = [
    { key: 'graphic', label: 'Graphic', match: (style) => matchesAnyTag(style, ['graphic', 'poster', 'typography', 'print', 'experimental', 'ornamental']) },
    { key: 'ui', label: 'UI', match: (style) => matchesAnyTag(style, ['ui', 'interface', 'mobile', 'dashboard', 'web', 'product', 'game']) },
    { key: 'branding', label: 'Branding', match: (style) => matchesAnyTag(style, ['branding', 'identity', 'brand', 'packaging']) },
    { key: 'editorial', label: 'Editorial', match: (style) => matchesAnyTag(style, ['editorial', 'publication', 'layout']) },
    { key: 'system', label: 'System', match: (style) => matchesAnyTag(style, ['information', 'system', 'diagram', 'enterprise']) },
    { key: 'motion', label: 'Motion', match: (style) => matchesAnyTag(style, ['motion', 'title', 'broadcast']) }
  ];

  const PHOTO_FACETS = [
    { key: 'portrait', label: 'Portrait', match: (style) => matchesAnyTag(style, ['portrait', 'studio', 'beauty']) },
    { key: 'lighting', label: 'Lighting', match: (style) => matchesAnyTag(style, ['lighting', 'dramatic', 'natural', 'time']) },
    { key: 'documentary', label: 'Documentary', match: (style) => matchesAnyTag(style, ['street', 'documentary', 'travel']) },
    { key: 'fashion', label: 'Fashion', match: (style) => matchesAnyTag(style, ['fashion', 'editorial']) },
    { key: 'product', label: 'Product', match: (style) => matchesAnyTag(style, ['product', 'still-life', 'food', 'beverage', 'macro']) },
    { key: 'place', label: 'Place', match: (style) => matchesAnyTag(style, ['architecture', 'interior', 'landscape', 'nature']) },
    { key: 'action', label: 'Action', match: (style) => matchesAnyTag(style, ['action', 'sports']) },
    { key: 'process', label: 'Process', match: (style) => matchesAnyTag(style, ['film', 'grade', 'experimental', 'composition', 'framing']) }
  ];

  const ARTIST_FACETS = [
    { key: 'cinema', label: 'Cinema', match: (style) => matchesAnyTag(style, ['cinema', 'frames', 'production', 'auteur', 'author', 'stills', 'genre']) || styleMediaSet(style).has('cinema') },
    { key: 'photography', label: 'Photography', match: (style) => matchesAnyTag(style, ['photography', 'street', 'documentary', 'fashion', 'portrait']) || styleMediaSet(style).has('photography') },
    { key: 'illustration', label: 'Illustration', match: (style) => matchesAnyTag(style, ['illustration', 'animation', 'manga', 'comics', 'linework', 'concept', 'childrens']) || ['illustration', 'animation', 'comics', 'concept art'].some((value) => styleMediaSet(style).has(value)) },
    { key: 'painting', label: 'Painting', match: (style) => matchesAnyTag(style, ['painting', 'master', 'historical', 'modern']) || styleMediaSet(style).has('painting') },
    { key: 'design', label: 'Design', match: (style) => matchesAnyTag(style, ['design', 'graphic', 'identity', 'typography']) || styleMediaSet(style).has('design') }
  ];

  function matchesFacet(style, defs, activeKey) {
    if (!activeKey) return true;
    const meta = defs.find((item) => item.key === activeKey);
    return meta ? meta.match(style) : true;
  }

  function facetItems(base, defs) {
    return [
      { key: '', label: '전체 (All)', count: base.length },
      ...defs.map((meta) => ({
        key: meta.key,
        label: meta.label,
        count: base.filter((style) => meta.match(style)).length
      }))
    ];
  }

  function renderFacetJumpRow(rowEl, items, activeKey, onToggle, ariaLabel) {
    if (!rowEl) return;
    rowEl.setAttribute('role', 'radiogroup');
    rowEl.setAttribute('aria-label', ariaLabel);
    rowEl.innerHTML = '';
    items.forEach((item) => {
      const isActive = activeKey === item.key;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `jump ${isActive ? 'active' : ''}`.trim();
      updateAriaRadio(b, isActive);
      const label = document.createElement('span');
      label.className = 'jump-label';
      label.textContent = item.label;
      const badge = document.createElement('span');
      badge.className = 'jump-count';
      badge.textContent = String(item.count);
      b.appendChild(label);
      b.appendChild(badge);
      if (item.key && item.count === 0) b.disabled = true;
      b.setAttribute('aria-label', `${item.label} (${item.count})`);
      b.addEventListener('click', () => onToggle(item.key));
      rowEl.appendChild(b);
    });
  }

  function facetLabelForMode(mode, key) {
    const defs = mode === 'design'
      ? DESIGN_FACETS
      : mode === 'photo'
        ? PHOTO_FACETS
        : mode === 'artist'
          ? ARTIST_FACETS
          : [];
    return defs.find((item) => item.key === key)?.label || key;
  }

  function matchesDesignQuickFilters(style) {
    if (directoryMode !== 'design') return true;
    return matchesFacet(style, DESIGN_FACETS, activeDesignFacet);
  }

  function matchesPhotoQuickFilters(style) {
    if (directoryMode !== 'photo') return true;
    return matchesFacet(style, PHOTO_FACETS, activePhotoFacet);
  }

  function matchesArtistQuickFilters(style) {
    if (directoryMode !== 'artist') return true;
    return matchesFacet(style, ARTIST_FACETS, activeArtistFacet);
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
    const fallbackLabels = {
      film: '영화/시네마 (Film)',
      era: '연도/시대 (Era)',
      mood: '무드/감정 (Mood)',
      brand: '브랜드 성격 (Brand)',
      material: '재질/소재 (Material)',
      lighting: '라이팅/촬영 (Lighting)',
      season: '계절/날씨 (Season)',
      place: '도시/문화 (Place)',
      use: '용도 (Use Case)',
      theory: '조합 규칙 (Color Theory)'
    };
    return fallbackLabels[k] || k || '기타';
  }
  function palettePresetLabel(style) {
    const label = String(style?.palettePresetLabel || '').trim();
    const key = palettePresetKey(style);
    return label || key || '기타';
  }

  function matchesPaletteQuickFilters(style) {
    if (directoryMode !== 'palette') return true;
    const cat = paletteCategoryKey(style);
    if (activePaletteCategory && cat !== activePaletteCategory) return false;
    return true;
  }

  function matchesUnifiedFacets(style) {
    if (directoryMode !== 'all') return true;
    if (activeUnifiedType && styleTypeKey(style) !== activeUnifiedType) return false;
    if (activeUnifiedMood && unifiedFacetValue(style, 'mood') !== activeUnifiedMood) return false;
    if (activeUnifiedUse && unifiedFacetValue(style, 'use') !== activeUnifiedUse) return false;
    if (activeUnifiedEra && unifiedFacetValue(style, 'era') !== activeUnifiedEra) return false;
    return true;
  }

  function matchesTag(style) {
    return true;
  }

  function sortItems(items) {
    return [...items].sort((a, b) => {
      if (activeTag) {
        const at = (a.tags || []).includes(activeTag) ? 1 : 0;
        const bt = (b.tags || []).includes(activeTag) ? 1 : 0;
        if (at !== bt) return bt - at;
      }
      if (sortMode === 'recommended') {
        const diff = recommendedSortScore(b) - recommendedSortScore(a);
        if (diff !== 0) return diff;
        return (a.curatedRank ?? 0) - (b.curatedRank ?? 0);
      }
      return sortEnFn(a, b);
    });
  }

  function buildJumpBars() {
    if (directoryMode === 'all') {
      if (dom.enJump) {
        dom.enJump.hidden = true;
        dom.enJump.innerHTML = '';
      }
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
      if (dom.characterFacetJump) dom.characterFacetJump.hidden = true;
      if (dom.unifiedTypeJump) { dom.unifiedTypeJump.hidden = false; dom.unifiedTypeJump.innerHTML = ''; }
      if (dom.unifiedMoodJump) { dom.unifiedMoodJump.hidden = false; dom.unifiedMoodJump.innerHTML = ''; }
      if (dom.unifiedUseJump) { dom.unifiedUseJump.hidden = false; dom.unifiedUseJump.innerHTML = ''; }
      if (dom.unifiedEraJump) { dom.unifiedEraJump.hidden = false; dom.unifiedEraJump.innerHTML = ''; }

      const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);

      const withinExcept = (style, facet) => {
        if (facet !== 'type' && activeUnifiedType && styleTypeKey(style) !== activeUnifiedType) return false;
        if (facet !== 'mood' && activeUnifiedMood && unifiedFacetValue(style, 'mood') !== activeUnifiedMood) return false;
        if (facet !== 'use' && activeUnifiedUse && unifiedFacetValue(style, 'use') !== activeUnifiedUse) return false;
        if (facet !== 'era' && activeUnifiedEra && unifiedFacetValue(style, 'era') !== activeUnifiedEra) return false;
        return true;
      };

      const countFacet = (facet) => {
        const counts = new Map();
        base.filter((style) => withinExcept(style, facet)).forEach((style) => {
          const value = unifiedFacetValue(style, facet);
          if (!value) return;
          counts.set(value, (counts.get(value) || 0) + 1);
        });
        return counts;
      };

      const facetTotal = (facet) => base.filter((style) => withinExcept(style, facet)).length;
      const pickFacetKeys = (counts, activeValue, limit) => {
        const ranked = [...counts.keys()].sort((a, b) => (counts.get(b) || 0) - (counts.get(a) || 0));
        if (!activeValue) return ranked.slice(0, limit);
        if (!counts.has(activeValue)) return ranked.slice(0, limit);
        const top = ranked.slice(0, limit);
        if (top.includes(activeValue)) return top;
        return [...top.slice(0, Math.max(0, limit - 1)), activeValue];
      };

      const typeCounts = countFacet('type');
      const moodCounts = countFacet('mood');
      const useCounts = countFacet('use');
      const eraCounts = countFacet('era');

      const typeTotal = facetTotal('type');
      const moodTotal = facetTotal('mood');
      const useTotal = facetTotal('use');
      const eraTotal = facetTotal('era');

      const moodKeys = pickFacetKeys(moodCounts, activeUnifiedMood, 8);
      const useKeys = pickFacetKeys(useCounts, activeUnifiedUse, 8);
      const eraKeys = pickFacetKeys(eraCounts, activeUnifiedEra, 6);

      const mk = (rowEl, labelText, count, isActive, onClick) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `jump ${isActive ? 'active' : ''}`.trim();
        updateAriaRadio(b, isActive);
        const label = document.createElement('span');
        label.className = 'jump-label';
        label.textContent = labelText;
        const badge = document.createElement('span');
        badge.className = 'jump-count';
        badge.textContent = String(count);
        b.appendChild(label);
        b.appendChild(badge);
        if (count === 0) b.disabled = true;
        b.setAttribute('aria-label', `${labelText} (${count})`);
        b.addEventListener('click', onClick);
        rowEl.appendChild(b);
      };

      if (dom.unifiedTypeJump) {
        dom.unifiedTypeJump.setAttribute('role', 'radiogroup');
        dom.unifiedTypeJump.setAttribute('aria-label', 'Integrated type filters');
        mk(dom.unifiedTypeJump, '타입: 전체', typeTotal, !activeUnifiedType, () => {
          activeUnifiedType = '';
          buildJumpBars();
          render();
        });
        DATA_DIRECTORY_MODES.forEach((mode) => {
          const count = typeCounts.get(mode) || 0;
          mk(dom.unifiedTypeJump, directoryLabel(mode), count, activeUnifiedType === mode, () => {
            activeUnifiedType = activeUnifiedType === mode ? '' : mode;
            buildJumpBars();
            render();
          });
        });
      }

      if (dom.unifiedMoodJump) {
        dom.unifiedMoodJump.setAttribute('role', 'radiogroup');
        dom.unifiedMoodJump.setAttribute('aria-label', 'Integrated mood filters');
        mk(dom.unifiedMoodJump, '무드: 전체', moodTotal, !activeUnifiedMood, () => {
          activeUnifiedMood = '';
          buildJumpBars();
          render();
        });
        moodKeys.forEach((key) => {
          const count = moodCounts.get(key) || 0;
          mk(dom.unifiedMoodJump, key, count, activeUnifiedMood === key, () => {
            activeUnifiedMood = activeUnifiedMood === key ? '' : key;
            buildJumpBars();
            render();
          });
        });
      }

      if (dom.unifiedUseJump) {
        dom.unifiedUseJump.setAttribute('role', 'radiogroup');
        dom.unifiedUseJump.setAttribute('aria-label', 'Integrated use filters');
        mk(dom.unifiedUseJump, '용도: 전체', useTotal, !activeUnifiedUse, () => {
          activeUnifiedUse = '';
          buildJumpBars();
          render();
        });
        useKeys.forEach((key) => {
          const count = useCounts.get(key) || 0;
          mk(dom.unifiedUseJump, key, count, activeUnifiedUse === key, () => {
            activeUnifiedUse = activeUnifiedUse === key ? '' : key;
            buildJumpBars();
            render();
          });
        });
      }

      if (dom.unifiedEraJump) {
        dom.unifiedEraJump.setAttribute('role', 'radiogroup');
        dom.unifiedEraJump.setAttribute('aria-label', 'Integrated era filters');
        mk(dom.unifiedEraJump, '시대: 전체', eraTotal, !activeUnifiedEra, () => {
          activeUnifiedEra = '';
          buildJumpBars();
          render();
        });
        eraKeys.forEach((key) => {
          const count = eraCounts.get(key) || 0;
          mk(dom.unifiedEraJump, key, count, activeUnifiedEra === key, () => {
            activeUnifiedEra = activeUnifiedEra === key ? '' : key;
            buildJumpBars();
            render();
          });
        });
      }
      updateJumpReset();
      syncJumpbarVisibility();
      return;
    }

    if (directoryMode === 'pose') {
      {
        activePoseVariant = '';
        if (dom.enJump) {
          dom.enJump.hidden = true;
          dom.enJump.innerHTML = '';
        }
        if (dom.poseTypeJump) {
          dom.poseTypeJump.hidden = false;
          dom.poseTypeJump.innerHTML = '';
        }
        if (dom.poseVariantJump) {
          dom.poseVariantJump.hidden = true;
          dom.poseVariantJump.innerHTML = '';
        }
        if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
        if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
        if (dom.characterFacetJump) dom.characterFacetJump.hidden = true;

        const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
        const total = base.length;
        const typeCounts = new Map();
        base.forEach((s) => {
          const type = String(s.poseType || '').trim();
          if (!type) return;
          typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
        });

        const preferredTypeOrder = [
          'standing', 'walking', 'running', 'jumping', 'sitting', 'crouching', 'kneeling', 'lying',
          'climbing', 'dancing', 'fighting', 'kicking', 'punching', 'aiming', 'holding', 'carrying',
          'throwing', 'landing', 'stretching', 'gesture',
          'turning', 'reaching', 'pushing', 'pulling', 'pointing', 'falling'
        ];
        const restTypes = [...typeCounts.keys()].filter((key) => !preferredTypeOrder.includes(key)).sort();
        const typeOrder = [...preferredTypeOrder, ...restTypes];

        const mk = (rowEl, labelText, count, isActive, onClick) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = `jump ${isActive ? 'active' : ''}`.trim();
          updateAriaRadio(b, isActive);
          const label = document.createElement('span');
          label.className = 'jump-label';
          label.textContent = labelText;
          const badge = document.createElement('span');
          badge.className = 'jump-count';
          badge.textContent = String(count);
          b.appendChild(label);
          b.appendChild(badge);
          if (count === 0) b.disabled = true;
          b.setAttribute('aria-label', `${labelText} (${count})`);
          b.addEventListener('click', onClick);
          rowEl.appendChild(b);
        };

        if (dom.poseTypeJump) {
          dom.poseTypeJump.setAttribute('role', 'radiogroup');
          dom.poseTypeJump.setAttribute('aria-label', 'Pose type');
          mk(dom.poseTypeJump, '전체 (All)', total, !activePoseType, () => {
            activePoseType = '';
            buildJumpBars();
            render();
          });
          typeOrder.forEach((key) => {
            const count = typeCounts.get(key) || 0;
            mk(dom.poseTypeJump, poseTypeLabel(key), count, activePoseType === key, () => {
              activePoseType = activePoseType === key ? '' : key;
              buildJumpBars();
              render();
            });
          });
        }

        updateJumpReset();
        syncJumpbarVisibility();
        return;
      }
      if (dom.enJump) dom.enJump.hidden = true;
      if (dom.enJump) dom.enJump.innerHTML = '';
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = false;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = false;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
      if (dom.characterFacetJump) dom.characterFacetJump.hidden = true;
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
        updateAriaRadio(b, isActive);
        const label = document.createElement('span');
        label.className = 'jump-label';
        label.textContent = labelText;
        const badge = document.createElement('span');
        badge.className = 'jump-count';
        badge.textContent = String(count);
        b.appendChild(label);
        b.appendChild(badge);
        if (count === 0) b.disabled = true;
        b.setAttribute('aria-label', `${labelText} (${count})`);
        b.addEventListener('click', onClick);
        rowEl.appendChild(b);
      };

      if (dom.poseTypeJump) {
        dom.poseTypeJump.setAttribute('role', 'radiogroup');
        dom.poseTypeJump.setAttribute('aria-label', 'Pose type');
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
        dom.poseVariantJump.setAttribute('role', 'radiogroup');
        dom.poseVariantJump.setAttribute('aria-label', 'Pose variant');
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
      updateJumpReset();
      syncJumpbarVisibility();
      return;
    }

    if (directoryMode === 'palette') {
      if (dom.enJump) dom.enJump.hidden = true;
      if (dom.enJump) dom.enJump.innerHTML = '';
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = false;
      activePalettePreset = '';
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
      if (dom.characterFacetJump) dom.characterFacetJump.hidden = true;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.innerHTML = '';
      if (dom.palettePresetJump) dom.palettePresetJump.innerHTML = '';
      palettePresetExpanded = false;

      const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
      const total = base.length;

      const catCounts = new Map();

      base.forEach((s) => {
        const cat = paletteCategoryKey(s);
        if (cat) catCounts.set(cat, (catCounts.get(cat) || 0) + 1);
      });

      const mk = (rowEl, labelText, count, isActive, onClick) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = `jump ${isActive ? 'active' : ''}`.trim();
        updateAriaRadio(b, isActive);
        const label = document.createElement('span');
        label.className = 'jump-label';
        label.textContent = labelText;
        const badge = document.createElement('span');
        badge.className = 'jump-count';
        badge.textContent = String(count);
        b.appendChild(label);
        b.appendChild(badge);
        if (count === 0) b.disabled = true;
        b.setAttribute('aria-label', `${labelText} (${count})`);
        b.addEventListener('click', onClick);
        rowEl.appendChild(b);
      };

      if (dom.paletteCategoryJump) {
        dom.paletteCategoryJump.setAttribute('role', 'radiogroup');
        dom.paletteCategoryJump.setAttribute('aria-label', 'Palette categories');
        mk(dom.paletteCategoryJump, '전체 (All)', total, !activePaletteCategory, () => {
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

      if (false && dom.palettePresetJump) {
        dom.palettePresetJump.setAttribute('role', 'radiogroup');
        dom.palettePresetJump.setAttribute('aria-label', 'Palette presets');
        mk(dom.palettePresetJump, '전체 (All)', activePaletteCategory ? (catCounts.get(activePaletteCategory) || 0) : total, !activePalettePreset, () => {
          activePalettePreset = '';
          buildJumpBars();
          render();
        });
        const keysSorted = [...presetCounts.keys()].sort();
        const limit = 10;
        const showAll = palettePresetExpanded || keysSorted.length <= limit;
        const visibleKeys = showAll ? keysSorted : keysSorted.slice(0, limit);
        if (!showAll && activePalettePreset && !visibleKeys.includes(activePalettePreset) && keysSorted.includes(activePalettePreset)) {
          visibleKeys.push(activePalettePreset);
        }
        visibleKeys.forEach((k) => {
          const c = presetCounts.get(k) || 0;
          const label = presetLabels.get(k) || k;
          mk(dom.palettePresetJump, label, c, activePalettePreset === k, () => {
            activePalettePreset = (activePalettePreset === k) ? '' : k;
            buildJumpBars();
            render();
          });
        });
        if (keysSorted.length > limit) {
          const more = document.createElement('button');
          more.type = 'button';
          more.className = 'jump more';
          more.textContent = palettePresetExpanded ? '접기' : '더보기';
          more.addEventListener('click', () => {
            palettePresetExpanded = !palettePresetExpanded;
            buildJumpBars();
          });
          dom.palettePresetJump.appendChild(more);
        }
      }
      updateJumpReset();
      syncJumpbarVisibility();
      return;
    }

    if (directoryMode === 'design') {
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
      if (dom.characterFacetJump) dom.characterFacetJump.hidden = false;
      if (dom.characterFacetJump) dom.characterFacetJump.innerHTML = '';
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
      if (dom.enJump) {
        dom.enJump.hidden = true;
        dom.enJump.innerHTML = '';
      }

      const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
      const items = facetItems(base, DESIGN_FACETS);

      renderFacetJumpRow(dom.characterFacetJump, items, activeDesignFacet, (key) => {
        activeDesignFacet = activeDesignFacet === key ? '' : key;
        buildJumpBars();
        render();
      }, 'Design quick filters');
      updateJumpReset();
      syncJumpbarVisibility();
      return;
    }

    if (directoryMode === 'photo') {
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
      if (dom.characterFacetJump) dom.characterFacetJump.hidden = false;
      if (dom.characterFacetJump) dom.characterFacetJump.innerHTML = '';
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
      if (dom.enJump) {
        dom.enJump.hidden = true;
        dom.enJump.innerHTML = '';
      }

      const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
      const items = facetItems(base, PHOTO_FACETS);

      renderFacetJumpRow(dom.characterFacetJump, items, activePhotoFacet, (key) => {
        activePhotoFacet = activePhotoFacet === key ? '' : key;
        buildJumpBars();
        render();
      }, 'Photo quick filters');
      updateJumpReset();
      syncJumpbarVisibility();
      return;
    }

    if (directoryMode === 'artist') {
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
      if (dom.characterFacetJump) dom.characterFacetJump.hidden = false;
      if (dom.characterFacetJump) dom.characterFacetJump.innerHTML = '';
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
      if (dom.enJump) {
        dom.enJump.hidden = true;
        dom.enJump.innerHTML = '';
      }

      const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
      const items = facetItems(base, ARTIST_FACETS);

      renderFacetJumpRow(dom.characterFacetJump, items, activeArtistFacet, (key) => {
        activeArtistFacet = activeArtistFacet === key ? '' : key;
        buildJumpBars();
        render();
      }, 'Artist quick filters');
      updateJumpReset();
      syncJumpbarVisibility();
      return;
    }

    if (directoryMode === 'character') {
      if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
      if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
      if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
      if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
      if (dom.enJump) {
        dom.enJump.hidden = true;
        dom.enJump.innerHTML = '';
      }
      if (dom.characterFacetJump) dom.characterFacetJump.hidden = false;
      if (dom.characterFacetJump) dom.characterFacetJump.innerHTML = '';

      const base = STYLES.filter((s) => matchesScope(s, query)).filter(matchesTag);
      const total = base.length;
      const counts = new Map();
      base.forEach((s) => {
        const tags = new Set((s.tags || []).map((t) => String(t || '').toLowerCase()));
        const medium = tags.has('pixel') || tags.has('pixel-art') ? 'pixel' : tags.has('3d') ? '3d' : '2d';
        counts.set(medium, (counts.get(medium) || 0) + 1);
        if (tags.has('realistic')) counts.set('realistic', (counts.get('realistic') || 0) + 1);
        if (tags.has('toon') || tags.has('cel-shading')) counts.set('toon', (counts.get('toon') || 0) + 1);
      });

      const items = [
        { key: '', label: '전체 (All)', count: total },
        { key: '2d', label: '2D', count: counts.get('2d') || 0 },
        { key: '3d', label: '3D', count: counts.get('3d') || 0 },
        { key: 'pixel', label: 'Pixel', count: counts.get('pixel') || 0 },
        { key: 'realistic', label: 'Realistic', count: counts.get('realistic') || 0 },
        { key: 'toon', label: 'Toon', count: counts.get('toon') || 0 }
      ];

      if (dom.characterFacetJump) {
        dom.characterFacetJump.setAttribute('role', 'radiogroup');
        dom.characterFacetJump.setAttribute('aria-label', 'Character quick filters');
        items.forEach((m) => {
          const isActive = activeCharacterFacet === m.key;
          const b = document.createElement('button');
          b.type = 'button';
          b.className = `jump ${isActive ? 'active' : ''}`.trim();
          updateAriaRadio(b, isActive);
          const label = document.createElement('span');
          label.className = 'jump-label';
          label.textContent = m.label;
          const badge = document.createElement('span');
          badge.className = 'jump-count';
          badge.textContent = String(m.count);
          b.appendChild(label);
          b.appendChild(badge);
          if (m.key && m.count === 0) b.disabled = true;
          b.setAttribute('aria-label', `${m.label} (${m.count})`);
          b.addEventListener('click', () => {
            activeCharacterFacet = (activeCharacterFacet === m.key) ? '' : m.key;
            buildJumpBars();
            render();
          });
          dom.characterFacetJump.appendChild(b);
        });
      }
      updateJumpReset();
      syncJumpbarVisibility();
      return;
    } else {
      if (dom.characterFacetJump) dom.characterFacetJump.hidden = true;
      if (dom.characterFacetJump) dom.characterFacetJump.innerHTML = '';
    }

    if (dom.enJump) {
      dom.enJump.hidden = true;
      dom.enJump.innerHTML = '';
    }
    if (dom.poseTypeJump) dom.poseTypeJump.hidden = true;
    if (dom.poseVariantJump) dom.poseVariantJump.hidden = true;
    if (dom.paletteCategoryJump) dom.paletteCategoryJump.hidden = true;
    if (dom.palettePresetJump) dom.palettePresetJump.hidden = true;
    updateJumpReset();
    syncJumpbarVisibility();
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
    activeCharacterFacet = '';
    activeDesignFacet = '';
    activePhotoFacet = '';
    activeArtistFacet = '';
    activeUnifiedType = '';
    activeUnifiedMood = '';
    activeUnifiedUse = '';
    activeUnifiedEra = '';
    clearShuffle({ persist: true });
    if (dom.search) dom.search.value = '';
    buildJumpBars();
    updateJumpReset();
    render();
  }

  function resetFiltersNoRender() {
    query = '';
    activeTag = '';
    activeCharacterFacet = '';
    activeDesignFacet = '';
    activePhotoFacet = '';
    activeArtistFacet = '';
    activeUnifiedType = '';
    activeUnifiedMood = '';
    activeUnifiedUse = '';
    activeUnifiedEra = '';
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

  function updateShuffleButtons() {
    if (dom.random200Btn?.parentElement) dom.random200Btn.parentElement.hidden = true;
    if (dom.gridTools) renderGridTools(currentItems);
  }

  function makeShuffle(items = currentItems) {
    if (!STYLES.length) loadStyles();
    const ids = (Array.isArray(items) ? items : []).map((style) => style && style.id).filter(Boolean);
    if (ids.length < 2) {
      showToast('섞을 카드가 2장 이상일 때 사용할 수 있습니다.');
      return;
    }
    shuffleState = {
      directory: directoryMode,
      context: shuffleContextSignature(),
      order: shuffledIds(ids),
      revision: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    };
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
    if (directoryMode === 'all') {
      if (activeUnifiedType) add(`타입: ${directoryLabel(activeUnifiedType)}`, () => { activeUnifiedType = ''; buildJumpBars(); render(); });
      if (activeUnifiedMood) add(`무드: ${activeUnifiedMood}`, () => { activeUnifiedMood = ''; buildJumpBars(); render(); });
      if (activeUnifiedUse) add(`용도: ${activeUnifiedUse}`, () => { activeUnifiedUse = ''; buildJumpBars(); render(); });
      if (activeUnifiedEra) add(`시대: ${activeUnifiedEra}`, () => { activeUnifiedEra = ''; buildJumpBars(); render(); });
    } else if (directoryMode === 'pose') {
      if (activePoseType) add(`동작: ${poseTypeLabel(activePoseType)}`, () => { activePoseType = ''; buildJumpBars(); render(); });
      if (activePoseVariant) add(`각도: ${poseVariantLabel(activePoseVariant)}`, () => { activePoseVariant = ''; buildJumpBars(); render(); });
    } else if (directoryMode === 'palette') {
      if (activePaletteCategory) add(`분류: ${paletteCategoryLabel(activePaletteCategory)}`, () => { activePaletteCategory = ''; activePalettePreset = ''; buildJumpBars(); render(); });
      if (false && activePalettePreset) {
        const example = STYLES.find((s) =>
          palettePresetKey(s) === activePalettePreset &&
          (!activePaletteCategory || paletteCategoryKey(s) === activePaletteCategory)
        );
        const label = example ? palettePresetLabel(example) : activePalettePreset;
        add(`세부: ${label}`, () => { activePalettePreset = ''; buildJumpBars(); render(); });
      }
    } else if (directoryMode === 'character') {
      if (activeCharacterFacet) {
        const map = { '2d': '2D', '3d': '3D', pixel: 'Pixel', realistic: 'Realistic', toon: 'Toon' };
        const label = map[String(activeCharacterFacet).toLowerCase()] || activeCharacterFacet;
        add(`필터: ${label}`, () => { activeCharacterFacet = ''; buildJumpBars(); render(); });
      }
    } else if (directoryMode === 'design') {
      if (activeDesignFacet) add(`분류: ${facetLabelForMode('design', activeDesignFacet)}`, () => { activeDesignFacet = ''; buildJumpBars(); render(); });
    } else if (directoryMode === 'photo') {
      if (activePhotoFacet) add(`분류: ${facetLabelForMode('photo', activePhotoFacet)}`, () => { activePhotoFacet = ''; buildJumpBars(); render(); });
    } else if (directoryMode === 'artist') {
      if (activeArtistFacet) add(`분류: ${facetLabelForMode('artist', activeArtistFacet)}`, () => { activeArtistFacet = ''; buildJumpBars(); render(); });
    } else if (directoryMode === 'character') {
      if (activeDigitInitial) add(`숫자: ${activeDigitInitial}`, () => { activeDigitInitial = ''; buildJumpBars(); render(); });
      if (activeEnInitial) add(`A-Z: ${activeEnInitial}`, () => { activeEnInitial = ''; buildJumpBars(); render(); });
    } else {
      if (activeDigitInitial) add(`숫자: ${activeDigitInitial}`, () => { activeDigitInitial = ''; buildJumpBars(); render(); });
      if (activeEnInitial) add(`A-Z: ${activeEnInitial}`, () => { activeEnInitial = ''; buildJumpBars(); render(); });
    }
    if (activeTag) add(`#${activeTag}`, () => { activeTag = ''; render(); });

    const hasAny = (directoryMode === 'all')
      ? Boolean(query || activeTag || activeUnifiedType || activeUnifiedMood || activeUnifiedUse || activeUnifiedEra)
      : (directoryMode === 'pose')
      ? Boolean(query || activeTag || activePoseType || activePoseVariant)
      : (directoryMode === 'palette')
        ? Boolean(query || activeTag || activePaletteCategory)
      : (directoryMode === 'design')
        ? Boolean(query || activeTag || activeDesignFacet)
      : (directoryMode === 'photo')
        ? Boolean(query || activeTag || activePhotoFacet)
      : (directoryMode === 'artist')
        ? Boolean(query || activeTag || activeArtistFacet)
      : (directoryMode === 'character')
        ? Boolean(query || activeTag || activeEnInitial || activeDigitInitial || activeCharacterFacet)
        : Boolean(query || activeTag || activeEnInitial || activeDigitInitial);
    if (hasAny) add('모두 초기화', clearAllFilters, 'danger');
  }

  function render() {
    buildJumpBars();
    updateJumpReset();
    if (!STYLES.length) {
      loadStyles();
    }
    if (!STYLES.length) {
      dom.count.textContent = '데이터가 없습니다. `reference-data.js`, `palettes-data.js`, `poses-data.js` 로드를 확인하세요.';
      dom.activeTag.textContent = '';
      dom.grid.innerHTML = '<div class="empty-state">`reference-data.js`, `palettes-data.js`, `poses-data.js` 로드 실패 또는 데이터 0개입니다. 브라우저 콘솔(F12)에서 네트워크/에러를 확인해주세요.</div>';
      updateStyleGuideStep();
      currentItems = [];
      renderedCount = 0;
      syncLoadMore();
      updateGridMeta({ visible: 0, total: 0, filtered: false, shown: 0 });
      return;
    }
    let items = STYLES
      .filter((s) => matchesScope(s, query))
      .filter(matchesInitials)
      .filter(matchesPoseQuickFilters)
      .filter(matchesCharacterQuickFilters)
      .filter(matchesDesignQuickFilters)
      .filter(matchesPhotoQuickFilters)
      .filter(matchesArtistQuickFilters)
      .filter(matchesPaletteQuickFilters)
      .filter(matchesUnifiedFacets)
      .filter(matchesTag);
    if (shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature() && Array.isArray(shuffleState.order) && shuffleState.order.length) {
      const rank = new Map(shuffleState.order.map((id, idx) => [id, idx]));
      items.sort((a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9));
    } else {
      items = sortItems(items);
    }
    const shuffled = Boolean(shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature());
    const hasAny = (directoryMode === 'all')
      ? Boolean(query || activeTag || activeUnifiedType || activeUnifiedMood || activeUnifiedUse || activeUnifiedEra || shuffled)
      : (directoryMode === 'pose')
      ? Boolean(query || activeTag || activePoseType || activePoseVariant || shuffled)
      : (directoryMode === 'palette')
        ? Boolean(query || activeTag || activePaletteCategory || shuffled)
        : (directoryMode === 'design')
          ? Boolean(query || activeTag || activeDesignFacet || shuffled)
        : (directoryMode === 'photo')
          ? Boolean(query || activeTag || activePhotoFacet || shuffled)
        : (directoryMode === 'artist')
          ? Boolean(query || activeTag || activeArtistFacet || shuffled)
        : Boolean(query || activeTag || activeEnInitial || activeDigitInitial || (directoryMode === 'character' && activeCharacterFacet) || shuffled);
    dom.activeTag.textContent = activeTag ? `태그: ${activeTag}` : '';
    renderActiveChips();
    renderGridTools(items);
    updateGridStatusLine();

    if (!items.length) {
      dom.grid.innerHTML = '';
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

      currentItems = [];
      renderedCount = 0;
      syncLoadMore();
      updateStyleGuideStep();
      updateGridMeta({ visible: 0, total: STYLES.length, filtered: hasAny, shown: 0 });
      return;
    }

    const sig = filterSignature();
    const sigChanged = sig !== renderSig;
    renderSig = sig;

    if (sigChanged) {
      resetBatch(items);
    } else {
      currentItems = items;
      syncLoadMore();
    }
    updateGridMeta({ visible: items.length, total: STYLES.length, filtered: hasAny, shown: Math.min(renderedCount, items.length) });

    updateStyleGuideStep();
  }

  function enrichStyle(s, mode = directoryMode, curatedRank = 0, seriesIndex = 0, seriesTotal = 0) {
    const tags = uniq([...(Array.isArray(s.tags) ? s.tags : []), ...deriveTags(s, mode)]).slice(0, 3);
    const overviewCandidate = String(s.overview || NOTE_OVERRIDES[s.id] || s.note || '').trim();
    const overview = (overviewCandidate && overviewCandidate.split('\n').filter(Boolean).length >= 3)
      ? overviewCandidate
      : buildOverview({ ...s, tags, characteristics: s.characteristics || tags.slice(0, 3).map((t) => t.replace(/-/g, ' ')) }, mode);
    const figures = s.figures || KEY_FIGURES[s.id] || [];
    const characteristics = s.characteristics || tags.slice(0, 3).map((t) => t.replace(/-/g, ' '));
    const q = s.q || buildQuery(s, mode);
    const colors = (mode === 'palette' && Array.isArray(s.colors))
      ? normalizePaletteColors(s.colors)
      : s.colors;
    const eras = Array.isArray(s.eras) && s.eras.length
      ? uniqueText(s.eras).slice(0, 2)
      : uniqueText([classifyEra(s, mode)]).slice(0, 2);
    const regions = Array.isArray(s.regions) && s.regions.length
      ? uniqueText(s.regions).slice(0, 3)
      : uniqueText(classifyRegions(s, mode)).slice(0, 3);
    const aliases = inferAliases(s, mode);
    const searchTokens = inferSearchTokens({ ...s, tags, characteristics, q }, mode);
    const moods = inferMoods({ ...s, tags }, mode);
    const useCases = inferUseCases({ ...s, tags }, mode);
    const media = inferMedia({ ...s, tags }, mode);
    const sourceLinks = buildSourceLinks(figures);
    const seriesCode = directorySeriesCode(mode);
    const seriesLabel = directorySeriesLabel(mode);
    const cardNo = cardNumberFor(mode, seriesIndex);
    const rarity = rarityForIndex(seriesIndex, seriesTotal);
    return {
      ...s,
      type: mode,
      curatedRank,
      seriesIndex,
      seriesCode,
      seriesLabel,
      cardNo,
      rarity,
      tags,
      overview,
      figures,
      characteristics,
      q,
      poseType: s.poseType,
      colors,
      aliases,
      searchTokens,
      moods,
      useCases,
      eras,
      regions,
      media,
      sourceLinks
    };
  }

  function loadStyles() {
    if (directoryMode === 'all') {
      STYLES = [...allReferences()];
      return STYLES;
    }
    const raw = sourceDataForDirectory(directoryMode);
    STYLES = raw.map((item, index) => enrichStyle(item, directoryMode, index, index, raw.length));
    return STYLES;
  }

  function allReferences() {
    if (allReferencesCache) return allReferencesCache;
    const out = [];
    let curatedRank = 0;
    DATA_DIRECTORY_MODES.forEach((mode) => {
      const raw = sourceDataForDirectory(mode);
      raw.forEach((item, index) => {
        out.push(enrichStyle(item, mode, curatedRank, index, raw.length));
        curatedRank += 1;
      });
    });
    allReferencesCache = out;
    return out;
  }

  function buildDetailFacts(style) {
    const facts = [
      ['Card', style.cardNo],
      ['Series', style.seriesLabel],
      ['Tier', style.rarity],
      ['Type', directoryLabel(style.type)],
      ['Media', uniqueText(style.media).slice(0, 2).join(' / ')],
      ['Use', uniqueText(style.useCases).slice(0, 2).join(' / ')],
      ['Mood', uniqueText(style.moods).slice(0, 2).join(' / ')],
      ['Era', uniqueText(style.eras).slice(0, 1).join(' / ')],
      ['Region', uniqueText(style.regions).slice(0, 2).join(' / ')]
    ];
    if (style.type === 'palette' && Array.isArray(style.colors) && style.colors.length) {
      facts.push(['Colors', `${style.colors.length} swatches`]);
    }
    if (style.type === 'pose') {
      facts.push(['Angle', poseVariantLabel(poseVariantKey(style))]);
    }
    return facts.filter(([, value]) => String(value || '').trim());
  }

  function createStyleCard(style) {
    const card = document.createElement('article');
    const primaryLabel = String(style.ko || style.en || style.id || '');
    const secondaryLabel = String(style.en || '').trim() && String(style.en || '').trim() !== primaryLabel.trim()
      ? String(style.en || '').trim()
      : '';
    const tagText = (style.tags || []).slice(0, 3).map((t) => `#${t}`).join(', ');
    const ariaTags = tagText ? ` tags: ${tagText}.` : '';

    card.className = `style-card ${selectedStyleId === style.id ? 'selected' : ''}`.trim();
    card.dataset.id = style.id;
    card.dataset.rarity = String(style.rarity || 'core').toLowerCase();
    card.dataset.series = String(style.seriesCode || '');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', selectedStyleId === style.id ? 'true' : 'false');
    card.setAttribute('aria-label', `${style.cardNo || ''} ${primaryLabel}.${ariaTags}`.trim());
    card.title = [style.cardNo, primaryLabel, style.seriesLabel].filter(Boolean).join(' · ');
    card.addEventListener('click', () => selectStyle(style));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectStyle(style);
      }
    });

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = `${primaryLabel} thumbnail`;
    applyThumb(img, style);

    const overlay = document.createElement('div');
    overlay.className = 'style-overlay';

    const head = document.createElement('div');
    head.className = 'style-card-head';

    const number = document.createElement('div');
    number.className = 'style-card-no';
    number.textContent = style.cardNo || cardNumberFor(style.type, style.seriesIndex);
    head.appendChild(number);

    const headMeta = document.createElement('div');
    headMeta.className = 'style-card-head-meta';

    const typePill = document.createElement('div');
    typePill.className = 'style-card-pill';
    typePill.textContent = directoryShortLabel(style.type);
    headMeta.appendChild(typePill);

    const rarityPill = document.createElement('div');
    rarityPill.className = `style-card-pill style-card-pill-rarity ${String(style.rarity || 'core').toLowerCase()}`.trim();
    rarityPill.textContent = style.rarity || 'Core';
    headMeta.appendChild(rarityPill);

    head.appendChild(headMeta);
    overlay.appendChild(head);

    const body = document.createElement('div');
    body.className = 'style-overlay-body';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'style-title-wrap';

    if (secondaryLabel) {
      const subtitle = document.createElement('div');
      subtitle.className = 'style-subtitle';
      subtitle.textContent = secondaryLabel;
      subtitle.style.fontSize = `${fontSizeFor(secondaryLabel || primaryLabel, 14, 11, 18)}px`;
      titleWrap.appendChild(subtitle);
    }

    const title = document.createElement('div');
    title.className = 'style-title';
    title.textContent = primaryLabel;
    title.style.fontSize = `${fontSizeFor(primaryLabel, 18, 13, 10)}px`;
    titleWrap.appendChild(title);

    const frontMeta = document.createElement('div');
    frontMeta.className = 'style-card-front-meta';

    const series = document.createElement('div');
    series.className = 'style-card-series';
    series.textContent = style.seriesLabel || directorySeriesLabel(style.type);
    frontMeta.appendChild(series);

    const tier = document.createElement('div');
    tier.className = 'style-card-tier';
    tier.textContent = style.rarity || 'Core';
    frontMeta.appendChild(tier);

    titleWrap.appendChild(frontMeta);

    const hoverMeta = document.createElement('div');
    hoverMeta.className = 'style-hover-meta';

    if (directoryMode === 'all') {
      const typeBadge = document.createElement('div');
      typeBadge.className = 'style-type-badge';
      typeBadge.textContent = styleTypeLabel(style);
      hoverMeta.appendChild(typeBadge);
    }

    const tags = document.createElement('div');
    tags.className = 'style-tags';
    (style.tags || []).slice(0, 3).forEach((t) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `style-tag ${activeTag === t ? 'active' : ''}`.trim();
      chip.textContent = `#${t}`;
      chip.setAttribute('aria-pressed', activeTag === t ? 'true' : 'false');
      chip.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
      });
      chip.setAttribute('aria-label', `${t} tag sort`);
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const nextTag = activeTag === t ? '' : t;
        activeTag = nextTag;
        render();
        showToast(nextTag ? `#${t} tag sort applied.` : 'Tag sort cleared.');
      });
      tags.appendChild(chip);
    });
    if (tags.childElementCount) hoverMeta.appendChild(tags);

    const actionGroup = document.createElement('div');
    actionGroup.className = 'style-hover-action-group';

    const actionLabel = document.createElement('div');
    actionLabel.className = 'style-hover-group-label';
    actionLabel.textContent = 'search';
    actionGroup.appendChild(actionLabel);

    const actions = document.createElement('div');
    actions.className = 'style-hover-actions';

    const openPinterest = document.createElement('button');
    openPinterest.type = 'button';
    openPinterest.className = 'style-hover-action';
    openPinterest.textContent = 'Pinterest';
    openPinterest.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
    });
    openPinterest.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(pinterestQuickUrl(style), '_blank', 'noopener,noreferrer');
    });
    actions.appendChild(openPinterest);

    const openGoogleImages = document.createElement('button');
    openGoogleImages.type = 'button';
    openGoogleImages.className = 'style-hover-action';
    openGoogleImages.textContent = 'Google';
    openGoogleImages.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
    });
    openGoogleImages.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(googleImagesQuickUrl(style), '_blank', 'noopener,noreferrer');
    });
    actions.appendChild(openGoogleImages);

    actionGroup.appendChild(actions);
    hoverMeta.appendChild(actionGroup);

    body.appendChild(titleWrap);
    body.appendChild(hoverMeta);
    overlay.appendChild(body);

    card.appendChild(img);
    card.appendChild(overlay);

    return card;
  }

  function openDetail(style) {
    if (!style || !dom.detailPanel) return;
    detailStyleId = style.id;

    const title = style.ko || style.en || style.id;
    const subtitle = uniqueText([style.cardNo, style.rarity, style.en, style.id])
      .filter((value) => normalize(value) !== normalize(title))
      .join(' · ');
    const summary = buildDetailDefinition(style);
    const promptBundle = buildPromptBundle(style);

    if (dom.detailType) dom.detailType.textContent = style.seriesLabel || `${directoryShortLabel(style.type)} Series`;
    if (dom.detailTitle) dom.detailTitle.textContent = title;
    if (dom.detailSubtitle) {
      dom.detailSubtitle.textContent = subtitle;
      dom.detailSubtitle.hidden = !subtitle;
    }
    if (dom.detailSummary) dom.detailSummary.textContent = summary;
    if (dom.detailThumb) {
      dom.detailThumb.alt = `${style.cardNo || ''} ${style.ko || style.en || style.id}`.trim();
      applyThumb(dom.detailThumb, style);
    }

    renderDetailChipRow(dom.detailFacts, buildDetailFacts(style).map(([label, value]) => ({ label, value })));
    renderDetailList(dom.detailSignals, detailSignalItems(style));
    renderDetailList(dom.detailUseCases, detailUseCaseItems(style));
    renderDetailTokens(dom.detailKeywords, detailKeywordItems(style));
    renderDetailChipRow(dom.detailTags, uniqueText((style.tags || []).map((tag) => `#${tag}`)));

    const paletteColors = Array.isArray(style.colors) ? style.colors.slice(0, 8) : [];
    if (dom.detailPaletteBlock) dom.detailPaletteBlock.hidden = paletteColors.length === 0;
    renderDetailChipRow(dom.detailPalette, paletteColors, { palette: true });

    const links = Array.isArray(style.sourceLinks) ? style.sourceLinks : [];
    if (dom.detailFiguresBlock) dom.detailFiguresBlock.hidden = links.length === 0;
    renderDetailLinks(dom.detailFigures, links);

    renderDetailSearchWorkbench(style);

    if (dom.detailGeneratePromptText) dom.detailGeneratePromptText.textContent = promptBundle.generate || '-';
    if (dom.detailTransformPromptText) dom.detailTransformPromptText.textContent = promptBundle.transform || '-';
    if (dom.detailExpandPromptText) dom.detailExpandPromptText.textContent = promptBundle.expand || '-';
    bindDetailCopyAction(dom.detailGeneratePromptCopy, promptBundle.generate, '?앹꽦 ?꾨＼?꾪듃瑜?蹂듭궗?덉뒿?덈떎.');
    bindDetailCopyAction(dom.detailTransformPromptCopy, promptBundle.transform, '蹂???꾨＼?꾪듃瑜?蹂듭궗?덉뒿?덈떎.');
    bindDetailCopyAction(dom.detailExpandPromptCopy, promptBundle.expand, '?뺤옣 ?꾨＼?꾪듃瑜?蹂듭궗?덉뒿?덈떎.');
    renderDetailActions(style);

    if (dom.detailSameTypeBlock) dom.detailSameTypeBlock.hidden = true;
    if (dom.detailSameType) dom.detailSameType.innerHTML = '';

    if (dom.detailCrossTypeBlock) dom.detailCrossTypeBlock.hidden = true;
    if (dom.detailCrossType) dom.detailCrossType.innerHTML = '';

    dom.detailPanel.hidden = false;
    document.body.classList.add('detail-open');
  }

  function init() {
    try {
      applyTheme(getPreferredTheme());
      applyDirectory(getPreferredDirectory());
      applySite(getPreferredSite());
      setAdvancedSearchOpen(false);
      updateAriaRadio(dom.sortKo, sortMode === 'recommended');
      updateAriaRadio(dom.sortEn, sortMode === 'en');
      loadStyles();
      buildJumpBars();
      shuffleState = loadShuffleState();
      if (shuffleState && shuffleState.directory !== directoryMode) shuffleState = null;
      updateShuffleButtons();
      renderPromptPresetChips();
      if (dom.gridChipsHost && dom.activeChips && dom.activeChips.parentElement !== dom.gridChipsHost) {
        dom.gridChipsHost.appendChild(dom.activeChips);
      }
      render();
      hydrateCustomCoverCache();
    } catch (err) {
      console.error(err);
      if (dom.count) dom.count.textContent = '스크립트 오류로 카드 렌더링에 실패했습니다.';
      if (dom.grid) dom.grid.innerHTML = '<div class="empty-state">`script.js` 실행 중 오류가 발생했습니다. 브라우저 콘솔(F12) 에러 로그를 확인해주세요.</div>';
      return;
    }

    const updateClearSearch = () => {
      if (!dom.clearSearch) return;
      const has = Boolean(String(dom.search?.value || '').trim());
      dom.clearSearch.hidden = !has;
    };
    updateClearSearch();

    dom.search.addEventListener('input', (e) => {
      query = e.target.value;
      updateClearSearch();
      render();
    });
    if (dom.clearSearch) {
      dom.clearSearch.addEventListener('click', () => {
        query = '';
        dom.search.value = '';
        updateClearSearch();
        render();
        dom.search.focus();
      });
    }
    if (dom.jumpResetBtn) {
      dom.jumpResetBtn.addEventListener('click', () => clearJumpFilter());
    }
    if (dom.jumpExpandBtn) {
      dom.jumpExpandBtn.addEventListener('click', () => {
        jumpbarExpanded = !jumpbarExpanded;
        syncJumpbarVisibility();
      });
    }
    if (dom.advancedSearchToggle) {
      dom.advancedSearchToggle.addEventListener('click', () => {
        setAdvancedSearchOpen(!advancedSearchOpen);
      });
    }
    if (dom.siteSwitchbar?.tagName === 'SELECT') {
      dom.siteSwitchbar.addEventListener('change', () => {
        siteTouched = true;
        applySite(dom.siteSwitchbar.value);
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
    if (dom.detailClose) dom.detailClose.addEventListener('click', closeDetail);
    if (dom.detailPanel) {
      dom.detailPanel.addEventListener('click', (e) => {
        const t = e.target;
        if (t && t.dataset && t.dataset.detailClose === 'true') closeDetail();
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
      if (e.key === 'Escape' && detailIsOpen()) {
        closeDetail();
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
    window.addEventListener('resize', () => syncJumpbarVisibility(), { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) closePanel();
    });
    openPanel({ pin: true });

    dom.sortKo.addEventListener('click', () => {
      sortMode = 'recommended';
      dom.sortKo.classList.add('active');
      dom.sortEn.classList.remove('active');
      updateAriaRadio(dom.sortKo, true);
      updateAriaRadio(dom.sortEn, false);
      render();
    });
    dom.sortEn.addEventListener('click', () => {
      sortMode = 'en';
      dom.sortEn.classList.add('active');
      dom.sortKo.classList.remove('active');
      updateAriaRadio(dom.sortEn, true);
      updateAriaRadio(dom.sortKo, false);
      render();
    });

    if (dom.themeSelect) {
      dom.themeSelect.value = document.body.dataset.theme || 'dark';
      dom.themeSelect.addEventListener('change', (e) => {
        applyTheme(String(e.target.value || '').trim());
      });
    }
    if (dom.dirAll) dom.dirAll.addEventListener('click', () => {
      if (directoryMode === 'all') return;
      applyDirectory('all');
      resetFiltersNoRenderKeepInitials();
      loadStyles();
      buildJumpBars();
      render();
    });
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
    if (dom.dirArtist) dom.dirArtist.addEventListener('click', () => {
      if (directoryMode === 'artist') return;
      applyDirectory('artist');
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
    activeCharacterFacet = '';
    activeDesignFacet = '';
    activePhotoFacet = '';
    activeArtistFacet = '';
    activeUnifiedType = '';
    activeUnifiedMood = '';
    activeUnifiedUse = '';
    activeUnifiedEra = '';
    activeBinderFilterType = '';
    activeBinderFilterId = '';
    clearShuffle({ persist: true });
    saveBinderState({ silent: true });
    if (dom.search) dom.search.value = '';
    buildJumpBars();
    updateJumpReset();
    render();
  }

  function render() {
    buildJumpBars();
    updateJumpReset();
    if (!STYLES.length) {
      loadStyles();
    }
    if (!STYLES.length) {
      dom.count.textContent = '?곗씠?곌? ?놁뒿?덈떎. `reference-data.js`, `palettes-data.js`, `poses-data.js` 濡쒕뱶瑜??뺤씤?섏꽭??';
      dom.activeTag.textContent = '';
      dom.grid.innerHTML = '<div class="empty-state">`reference-data.js`, `palettes-data.js`, `poses-data.js` 濡쒕뱶 ?ㅽ뙣 ?먮뒗 ?곗씠??0媛쒖엯?덈떎. 釉뚮씪?곗? 肄섏넄(F12)?먯꽌 ?ㅽ듃?뚰겕/?먮윭瑜??뺤씤?댁＜?몄슂.</div>';
      updateStyleGuideStep();
      currentItems = [];
      renderedCount = 0;
      syncLoadMore();
      updateGridMeta({ visible: 0, total: 0, filtered: false, shown: 0 });
      renderBinderPanel();
      syncBinderHeroButton();
      return;
    }

    let items = STYLES
      .filter((s) => matchesScope(s, query))
      .filter(matchesInitials)
      .filter(matchesPoseQuickFilters)
      .filter(matchesCharacterQuickFilters)
      .filter(matchesDesignQuickFilters)
      .filter(matchesPhotoQuickFilters)
      .filter(matchesArtistQuickFilters)
      .filter(matchesPaletteQuickFilters)
      .filter(matchesUnifiedFacets)
      .filter(matchesTag)
      .filter(matchesBinderScope);

    if (shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature() && Array.isArray(shuffleState.order) && shuffleState.order.length) {
      const rank = new Map(shuffleState.order.map((id, idx) => [id, idx]));
      items.sort((a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9));
    } else {
      items = sortItems(items);
    }

    if (selectedStyleId && !items.some((style) => style.id === selectedStyleId)) {
      selectedStyleId = '';
      detailStyleId = '';
    }

    const shuffled = Boolean(shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature());
    const hasAny = (directoryMode === 'all')
      ? Boolean(query || activeTag || activeUnifiedType || activeUnifiedMood || activeUnifiedUse || activeUnifiedEra || activeBinderFilterType || shuffled)
      : (directoryMode === 'pose')
      ? Boolean(query || activeTag || activePoseType || activePoseVariant || activeBinderFilterType || shuffled)
      : (directoryMode === 'palette')
        ? Boolean(query || activeTag || activePaletteCategory || activeBinderFilterType || shuffled)
        : (directoryMode === 'design')
          ? Boolean(query || activeTag || activeDesignFacet || activeBinderFilterType || shuffled)
          : (directoryMode === 'photo')
            ? Boolean(query || activeTag || activePhotoFacet || activeBinderFilterType || shuffled)
            : (directoryMode === 'artist')
              ? Boolean(query || activeTag || activeArtistFacet || activeBinderFilterType || shuffled)
              : Boolean(query || activeTag || activeEnInitial || activeDigitInitial || (directoryMode === 'character' && activeCharacterFacet) || activeBinderFilterType || shuffled);
    dom.activeTag.textContent = activeTag ? `?쒓렇: ${activeTag}` : '';
    renderActiveChips();
    renderBinderActiveChip();
    renderGridTools(items);
    updateGridStatusLine();
    renderBinderPanel();
    syncBinderHeroButton();

    if (!items.length && activeBinderFilterType) {
      activeBinderFilterType = '';
      activeBinderFilterId = '';
      saveBinderState({ silent: true });
      render();
      return;
    }

    if (!items.length) {
      dom.grid.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'empty-state';
      wrapper.textContent = 'No cards match the current filters.';

      const reset = document.createElement('button');
      reset.type = 'button';
      reset.className = 'pill';
      reset.style.marginTop = '10px';
      reset.textContent = 'Clear all';
      reset.addEventListener('click', clearAllFilters);

      wrapper.appendChild(document.createElement('br'));
      wrapper.appendChild(reset);
      dom.grid.appendChild(wrapper);

      currentItems = [];
      renderedCount = 0;
      syncLoadMore();
      updateStyleGuideStep();
      updateGridMeta({ visible: 0, total: STYLES.length, filtered: hasAny, shown: 0 });
      return;
    }

    const sig = filterSignature();
    const sigChanged = sig !== renderSig;
    renderSig = sig;

    if (sigChanged) {
      resetBatch(items);
    } else {
      currentItems = items;
      syncLoadMore();
    }
    updateGridMeta({ visible: items.length, total: STYLES.length, filtered: hasAny, shown: Math.min(renderedCount, items.length) });
    updateStyleGuideStep();
  }

  function openDetail(style) {
    if (!style || !dom.detailPanel) return;
    detailStyleId = style.id;

    const title = style.ko || style.en || style.id;
    const subtitle = uniqueText([style.cardNo, style.rarity, style.en, style.id])
      .filter((value) => normalize(value) !== normalize(title))
      .join(' · ');
    const summary = buildDetailDefinition(style);
    const promptBundle = buildPromptBundle(style);

    if (dom.detailType) dom.detailType.textContent = style.seriesLabel || `${directoryShortLabel(style.type)} Series`;
    if (dom.detailTitle) dom.detailTitle.textContent = title;
    if (dom.detailSubtitle) {
      dom.detailSubtitle.textContent = subtitle;
      dom.detailSubtitle.hidden = !subtitle;
    }
    if (dom.detailSummary) dom.detailSummary.textContent = summary;
    if (dom.detailThumb) {
      dom.detailThumb.alt = `${style.cardNo || ''} ${style.ko || style.en || style.id}`.trim();
      applyThumb(dom.detailThumb, style);
    }

    renderDetailChipRow(dom.detailFacts, buildDetailFacts(style).map(([label, value]) => ({ label, value })));
    renderDetailList(dom.detailSignals, detailSignalItems(style));
    renderDetailList(dom.detailUseCases, detailUseCaseItems(style));
    renderDetailTokens(dom.detailKeywords, detailKeywordItems(style));
    renderDetailChipRow(dom.detailTags, uniqueText((style.tags || []).map((tag) => `#${tag}`)));

    const paletteColors = Array.isArray(style.colors) ? style.colors.slice(0, 8) : [];
    if (dom.detailPaletteBlock) dom.detailPaletteBlock.hidden = paletteColors.length === 0;
    renderDetailChipRow(dom.detailPalette, paletteColors, { palette: true });

    const links = Array.isArray(style.sourceLinks) ? style.sourceLinks : [];
    if (dom.detailFiguresBlock) dom.detailFiguresBlock.hidden = links.length === 0;
    renderDetailLinks(dom.detailFigures, links);

    renderDetailSearchWorkbench(style);
    renderDetailBinderSection(style);

    if (dom.detailGeneratePromptText) dom.detailGeneratePromptText.textContent = promptBundle.generate || '-';
    if (dom.detailTransformPromptText) dom.detailTransformPromptText.textContent = promptBundle.transform || '-';
    if (dom.detailExpandPromptText) dom.detailExpandPromptText.textContent = promptBundle.expand || '-';
    bindDetailCopyAction(dom.detailGeneratePromptCopy, promptBundle.generate, 'Generate prompt copied.');
    bindDetailCopyAction(dom.detailTransformPromptCopy, promptBundle.transform, 'Transform prompt copied.');
    bindDetailCopyAction(dom.detailExpandPromptCopy, promptBundle.expand, 'Expand prompt copied.');
    renderDetailActions(style);

    if (dom.detailSameTypeBlock) dom.detailSameTypeBlock.hidden = true;
    if (dom.detailSameType) dom.detailSameType.innerHTML = '';
    if (dom.detailCrossTypeBlock) dom.detailCrossTypeBlock.hidden = true;
    if (dom.detailCrossType) dom.detailCrossType.innerHTML = '';

    dom.detailPanel.hidden = false;
    document.body.classList.add('detail-open');
  }

  function render() {
    buildJumpBars();
    updateJumpReset();
    if (!STYLES.length) {
      loadStyles();
    }

    const safeUi = (label, fn) => {
      try {
        fn();
      } catch (err) {
        console.error(`render ui failed: ${label}`, err);
      }
    };

    if (!STYLES.length) {
      if (dom.count) dom.count.textContent = 'No data loaded.';
      if (dom.activeTag) dom.activeTag.textContent = '';
      if (dom.grid) dom.grid.innerHTML = '<div class="empty-state">No data loaded.</div>';
      currentItems = [];
      renderedCount = 0;
      syncLoadMore();
      updateGridMeta({ visible: 0, total: 0, filtered: false, shown: 0 });
      safeUi('renderBinderPanel', () => renderBinderPanel());
      safeUi('syncBinderHeroButton', () => syncBinderHeroButton());
      return;
    }

    let items = STYLES
      .filter((s) => matchesScope(s, query))
      .filter(matchesInitials)
      .filter(matchesPoseQuickFilters)
      .filter(matchesCharacterQuickFilters)
      .filter(matchesDesignQuickFilters)
      .filter(matchesPhotoQuickFilters)
      .filter(matchesArtistQuickFilters)
      .filter(matchesPaletteQuickFilters)
      .filter(matchesUnifiedFacets)
      .filter(matchesTag)
      .filter(matchesBinderScope);

    if (shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature() && Array.isArray(shuffleState.order) && shuffleState.order.length) {
      const rank = new Map(shuffleState.order.map((id, idx) => [id, idx]));
      items.sort((a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9));
    } else {
      items = sortItems(items);
    }

    const shuffled = Boolean(shuffleState && shuffleState.directory === directoryMode && shuffleState.context === shuffleContextSignature());
    const hasAny = (directoryMode === 'all')
      ? Boolean(query || activeTag || activeUnifiedType || activeUnifiedMood || activeUnifiedUse || activeUnifiedEra || activeBinderFilterType || shuffled)
      : (directoryMode === 'pose')
        ? Boolean(query || activeTag || activePoseType || activePoseVariant || activeBinderFilterType || shuffled)
        : (directoryMode === 'palette')
          ? Boolean(query || activeTag || activePaletteCategory || activeBinderFilterType || shuffled)
          : (directoryMode === 'design')
            ? Boolean(query || activeTag || activeDesignFacet || activeBinderFilterType || shuffled)
            : (directoryMode === 'photo')
              ? Boolean(query || activeTag || activePhotoFacet || activeBinderFilterType || shuffled)
              : (directoryMode === 'artist')
                ? Boolean(query || activeTag || activeArtistFacet || activeBinderFilterType || shuffled)
                : Boolean(query || activeTag || activeEnInitial || activeDigitInitial || (directoryMode === 'character' && activeCharacterFacet) || activeBinderFilterType || shuffled);

    if (!items.length && activeBinderFilterType) {
      activeBinderFilterType = '';
      activeBinderFilterId = '';
      saveBinderState({ silent: true });
      render();
      return;
    }

    if (!items.length) {
      if (dom.grid) {
        dom.grid.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'empty-state';
        wrapper.textContent = 'No cards match the current filters.';
        const reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'pill';
        reset.style.marginTop = '10px';
        reset.textContent = 'Clear all';
        reset.addEventListener('click', clearAllFilters);
        wrapper.appendChild(document.createElement('br'));
        wrapper.appendChild(reset);
        dom.grid.appendChild(wrapper);
      }
      currentItems = [];
      renderedCount = 0;
      syncLoadMore();
      updateGridMeta({ visible: 0, total: STYLES.length, filtered: hasAny, shown: 0 });
    } else {
      const sig = filterSignature();
      const sigChanged = sig !== renderSig;
      renderSig = sig;
      if (sigChanged) {
        try {
          resetBatch(items);
        } catch (err) {
          console.error('resetBatch failed', err);
          currentItems = items;
          renderedCount = 0;
          if (dom.grid) dom.grid.innerHTML = '';
          const frag = document.createDocumentFragment();
          items.slice(0, Math.min(BATCH_SIZE, items.length)).forEach((item) => {
            const card = document.createElement('article');
            card.className = 'style-card';
            card.dataset.id = String(item?.id || '');
            card.style.display = 'flex';
            card.style.alignItems = 'flex-end';
            card.style.padding = '14px';
            card.style.background = 'linear-gradient(180deg, rgba(30,34,48,0.95), rgba(12,12,12,0.98))';
            const meta = document.createElement('div');
            meta.style.display = 'flex';
            meta.style.flexDirection = 'column';
            meta.style.gap = '6px';
            meta.innerHTML = `
              <div style="font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.72);">${String(item?.cardNo || item?.id || 'REF')}</div>
              <div style="font-size:20px;font-weight:800;line-height:1.1;color:#fff;">${String(item?.ko || item?.en || item?.id || 'Reference')}</div>
              <div style="font-size:12px;color:rgba(255,255,255,.76);">${String(item?.seriesLabel || directoryShortLabel(item?.type || directoryMode))}</div>
            `;
            card.appendChild(meta);
            card.addEventListener('click', () => selectStyle(item));
            frag.appendChild(card);
          });
          if (dom.grid) dom.grid.appendChild(frag);
          renderedCount = Math.min(BATCH_SIZE, items.length);
          syncLoadMore();
        }
      } else {
        currentItems = items;
        syncLoadMore();
      }
      updateGridMeta({ visible: items.length, total: STYLES.length, filtered: hasAny, shown: Math.min(renderedCount, items.length) });
    }

    updateStyleGuideStep();
    if (dom.activeTag) dom.activeTag.textContent = activeTag ? `Tag: ${activeTag}` : '';
    safeUi('renderActiveChips', () => renderActiveChips());
    safeUi('renderBinderActiveChip', () => renderBinderActiveChip());
    safeUi('renderGridTools', () => renderGridTools(items));
    safeUi('updateGridStatusLine', () => updateGridStatusLine());
    safeUi('renderBinderPanel', () => renderBinderPanel());
    safeUi('syncBinderHeroButton', () => syncBinderHeroButton());
  }

  function cardThemeForStyle(style) {
    const themes = {
      design: {
        base: '#1d7b75',
        deep: '#0f2238',
        accent: '#73ead9',
        line: 'rgba(115, 234, 217, 0.34)'
      },
      character: {
        base: '#a54d7f',
        deep: '#2d1431',
        accent: '#ff9ec1',
        line: 'rgba(255, 158, 193, 0.34)'
      },
      photo: {
        base: '#4f73a8',
        deep: '#16253d',
        accent: '#9dcbff',
        line: 'rgba(157, 203, 255, 0.34)'
      },
      artist: {
        base: '#a8673d',
        deep: '#2f1b12',
        accent: '#ffc58f',
        line: 'rgba(255, 197, 143, 0.34)'
      },
      palette: {
        base: '#6d8d37',
        deep: '#172511',
        accent: '#c8ec86',
        line: 'rgba(200, 236, 134, 0.34)'
      },
      pose: {
        base: '#6d63c7',
        deep: '#17153a',
        accent: '#c4bbff',
        line: 'rgba(196, 187, 255, 0.34)'
      }
    };
    return themes[styleTypeKey(style)] || themes.design;
  }

  function cardBindingState(style) {
    const decks = (binderState?.decks || []).filter((deck) => (deck.cardIds || []).includes(referenceKey(style)));
    const currentDeck = selectedDeck();
    const inCurrentDeck = Boolean(currentDeck && decks.some((deck) => deck.id === currentDeck.id));
    return {
      decks,
      currentDeck,
      any: decks.length > 0,
      inCurrentDeck,
      buttonLabel: inCurrentDeck ? '저장됨' : decks.length ? '저장됨' : '보드 저장',
      statusText: inCurrentDeck
        ? `${currentDeck.name}에 저장됨`
        : decks.length
          ? `${decks.length}개 보드에 저장됨`
          : `${(currentDeck && currentDeck.name) || '내 보드'}에 저장 준비됨`
    };
  }

  function cardDisplayNames(style) {
    const english = String(style.en || style.id || '').trim() || String(style.ko || '').trim();
    const koreanRaw = String(style.ko || '').trim();
    const korean = koreanRaw && normalize(koreanRaw) !== normalize(english) ? koreanRaw : '';
    return { english, korean };
  }

  function prepareCardWorkbenchState(style) {
    const mode = referenceMode(style);
    const siteKeys = sitesForDirectory(mode);
    const activeWorkbenchStyleId = selectedStyleId || detailStyleId || detailSearchStyleId || '';
    const isActiveStyle = activeWorkbenchStyleId === style.id;
    let siteKey = siteKeys[0] || 'pinterest';
    let expansionKey = '';
    let draft = '';

    if (isActiveStyle) {
      const styleChanged = detailSearchStyleId !== style.id;
      if (styleChanged) {
        detailSearchStyleId = style.id;
        detailSiteKey = siteKeys[0] || 'pinterest';
        detailQuerySeedMode = 'quick';
        detailExpansionKey = '';
        detailSearchDraft = '';
      }

      if (!siteKeys.includes(detailSiteKey)) detailSiteKey = siteKeys[0] || 'pinterest';
      siteKey = detailSiteKey || siteKeys[0] || 'pinterest';
      expansionKey = detailExpansionKey;

      const seededQuery = detailSearchQuery(style, 'quick', siteKey, expansionKey);
      if (!detailSearchDraft) detailSearchDraft = seededQuery;
      draft = detailSearchDraft;
    } else {
      siteKey = siteKeys[0] || 'pinterest';
      draft = detailSearchQuery(style, 'quick', siteKey, '');
    }

    return {
      mode,
      siteKeys,
      siteKey,
      quickQuery: quickSearchQuery(style, siteKey),
      preciseQuery: preciseSearchQuery(style, siteKey),
      draft,
      expansionToken: detailExpansionOptionsForMode(mode).find((item) => item.key === expansionKey)?.token || ''
    };
  }

  function cardSurfaceBackground(style, theme) {
    const custom = customBackgroundFor(style);
    if (custom) {
      return `linear-gradient(180deg, rgba(6, 9, 16, 0.16), rgba(6, 9, 16, 0.36) 52%, rgba(6, 9, 16, 0.78) 100%), url("${custom}") center/cover no-repeat`;
    }
    return [
      'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.18), transparent 20%)',
      'radial-gradient(circle at 82% 24%, rgba(255,255,255,0.10), transparent 18%)',
      `linear-gradient(155deg, ${theme.base}, ${theme.deep})`
    ].join(', ');
  }

  function detailIsOpen() {
    return Boolean(dom.detailPanel && !dom.detailPanel.hidden && selectedStyleId);
  }

  function closeDetail() {
    selectedStyleId = '';
    detailStyleId = '';
    activeBindMenuStyleId = '';
    detailSearchStyleId = '';
    detailSiteKey = '';
    detailQuerySeedMode = 'quick';
    detailExpansionKey = '';
    detailSearchDraft = '';
    if (dom.detailPanel) dom.detailPanel.hidden = true;
    document.body.classList.remove('detail-open');
    if (!dom.grid) return;
    dom.grid.querySelectorAll('.style-card.selected').forEach((card) => {
      card.classList.remove('selected');
      card.setAttribute('aria-pressed', 'false');
    });
  }

  function openDetail(style) {
    if (!style || !dom.grid) return;
    selectedStyleId = style.id;
    detailStyleId = style.id;
    activeBindMenuStyleId = '';
    const siteKeys = sitesForDirectory(referenceMode(style));
    if (detailSearchStyleId !== style.id) {
      detailSearchStyleId = style.id;
      detailSiteKey = siteKeys[0] || 'pinterest';
      detailQuerySeedMode = 'quick';
      detailExpansionKey = '';
      detailSearchDraft = '';
    } else if (!siteKeys.includes(detailSiteKey)) {
      detailSiteKey = siteKeys[0] || 'pinterest';
    }
    if (dom.detailPanel) dom.detailPanel.hidden = false;
    document.body.classList.add('detail-open');
    dom.grid.querySelectorAll('.style-card.selected').forEach((card) => {
      if (card.dataset.id !== style.id) {
        card.classList.remove('selected');
        card.setAttribute('aria-pressed', 'false');
      }
    });
    const next = dom.grid.querySelector(`.style-card[data-id="${CSS.escape(style.id)}"]`);
    if (!next) return;
    next.classList.add('selected');
    next.setAttribute('aria-pressed', 'true');
  }

  function selectStyle(style, { openInspector = true } = {}) {
    if (!style) return;
    selectedStyleId = style.id;

    if (dom.grid) {
      dom.grid.querySelectorAll('.style-card.selected').forEach((el) => {
        el.classList.remove('selected');
        try { el.setAttribute('aria-pressed', 'false'); } catch { /* ignore */ }
      });
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

    if (openInspector) openDetail(style);
  }

  function createStyleCard(style) {
    const theme = cardThemeForStyle(style);
    const binding = cardBindingState(style);
    const names = cardDisplayNames(style);
    const summary = buildDetailDefinition(style) || style.overview || '';
    const quickQuery = quickSearchQuery(style, 'pinterest');
    const promptBundle = buildPromptBundle(style);
    const customCover = customBackgroundFor(style);
    const workbench = prepareCardWorkbenchState(style);

    const stopBubble = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const toggleBound = (event) => {
      if (event) stopBubble(event);
      const deck = selectedDeck();
      if (!deck) return;
      const added = toggleDeckMembership(style, deck.id);
      selectedStyleId = style.id;
      render();
      showToast(added ? `${deck.name}에 저장했습니다.` : `${deck.name}에서 제거했습니다.`);
    };

    const card = document.createElement('article');
    card.className = `style-card ${selectedStyleId === style.id ? 'selected' : ''}`.trim();
    card.dataset.id = style.id;
    card.dataset.type = styleTypeKey(style);
    card.dataset.bound = binding.any ? 'true' : 'false';
    card.dataset.cover = customCover ? 'custom' : 'color';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', selectedStyleId === style.id ? 'true' : 'false');
    card.setAttribute('aria-label', `${style.cardNo || ''} ${names.english}. ${binding.statusText}`.trim());
    card.style.setProperty('--card-accent', theme.accent);
    card.style.setProperty('--card-line', theme.line);

    const shell = document.createElement('div');
    shell.className = 'style-card-shell';

    const front = document.createElement('div');
    front.className = 'style-card-face style-card-front';

    const surface = document.createElement('div');
    surface.className = 'style-card-surface';
    surface.style.background = cardSurfaceBackground(style, theme);
    front.appendChild(surface);

    const frontShade = document.createElement('div');
    frontShade.className = 'style-card-front-shade';
    front.appendChild(frontShade);

    const frontTop = document.createElement('div');
    frontTop.className = 'style-card-front-top';

    const number = document.createElement('div');
    number.className = 'style-card-chip style-card-no';
    number.textContent = style.cardNo || cardNumberFor(style.type, style.seriesIndex);
    frontTop.appendChild(number);

    const directory = document.createElement('div');
    directory.className = 'style-card-chip style-card-dir';
    directory.textContent = `${directoryShortLabel(style.type)}`;
    frontTop.appendChild(directory);
    front.appendChild(frontTop);

    const hover = document.createElement('div');
    hover.className = 'style-card-hover';

    const hoverLabel = document.createElement('div');
    hoverLabel.className = 'style-card-hover-label';
    hoverLabel.textContent = '빠른 검색';
    hover.appendChild(hoverLabel);

    const hoverActions = document.createElement('div');
    hoverActions.className = 'style-hover-actions';

    const pinButton = document.createElement('button');
    pinButton.type = 'button';
    pinButton.className = 'style-hover-action';
    pinButton.textContent = 'Pinterest';
    pinButton.title = 'Open quick search on Pinterest';
    pinButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    pinButton.addEventListener('click', (event) => {
      stopBubble(event);
      window.open(pinterestQuickUrl(style), '_blank', 'noopener,noreferrer');
    });
    hoverActions.appendChild(pinButton);

    const googleButton = document.createElement('button');
    googleButton.type = 'button';
    googleButton.className = 'style-hover-action';
    googleButton.textContent = 'Google';
    googleButton.title = 'Open quick search on Google Images';
    googleButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    googleButton.addEventListener('click', (event) => {
      stopBubble(event);
      window.open(googleImagesQuickUrl(style), '_blank', 'noopener,noreferrer');
    });
    hoverActions.appendChild(googleButton);
    hover.appendChild(hoverActions);

    const tagLabel = document.createElement('div');
    tagLabel.className = 'style-card-hover-label style-card-hover-label-tags';
    tagLabel.textContent = '태그';
    hover.appendChild(tagLabel);

    const tags = document.createElement('div');
    tags.className = 'style-tags';
    (style.tags || []).slice(0, 3).forEach((tag) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `style-tag ${activeTag === tag ? 'active' : ''}`.trim();
      chip.textContent = `#${tag}`;
      chip.setAttribute('aria-pressed', activeTag === tag ? 'true' : 'false');
      chip.setAttribute('aria-label', `${tag} tag sort`);
      chip.addEventListener('pointerdown', (event) => event.stopPropagation());
      chip.addEventListener('click', (event) => {
        stopBubble(event);
        const nextTag = activeTag === tag ? '' : tag;
        activeTag = nextTag;
        render();
        showToast(nextTag ? `#${tag} tag sort applied.` : 'Tag sort cleared.');
      });
      tags.appendChild(chip);
    });
    hover.appendChild(tags);
    front.appendChild(hover);

    const footer = document.createElement('div');
    footer.className = 'style-card-front-bottom';

    const nameStack = document.createElement('div');
    nameStack.className = 'style-card-name-stack';

    const english = document.createElement('div');
    english.className = 'style-card-name-en';
    english.textContent = names.english;
    english.style.fontSize = `${fontSizeFor(names.english, 14, 10, 18)}px`;
    english.title = names.english;
    nameStack.appendChild(english);

    const korean = document.createElement('div');
    korean.className = `style-card-name-ko ${names.korean ? '' : 'is-placeholder'}`.trim();
    korean.textContent = names.korean || ' ';
    korean.title = names.korean || '';
    nameStack.appendChild(korean);

    footer.appendChild(nameStack);

    const bindButton = document.createElement('button');
    bindButton.type = 'button';
    bindButton.className = `style-bind-btn ${binding.inCurrentDeck ? 'active' : binding.any ? 'saved' : ''}`.trim();
    bindButton.textContent = binding.buttonLabel;
    bindButton.title = binding.statusText;
    bindButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    bindButton.addEventListener('click', toggleBound);
    footer.appendChild(bindButton);
    front.appendChild(footer);

    const back = document.createElement('div');
    back.className = 'style-card-face style-card-back';

    const backHead = document.createElement('div');
    backHead.className = 'style-card-back-head';

    const backMeta = document.createElement('div');
    backMeta.className = 'style-card-back-meta';

    const backNo = document.createElement('div');
    backNo.className = 'style-card-back-no';
    backNo.textContent = style.cardNo || cardNumberFor(style.type, style.seriesIndex);
    backMeta.appendChild(backNo);

    const backDir = document.createElement('div');
    backDir.className = 'style-card-back-dir';
    backDir.textContent = `${directoryLabel(style.type)} 디렉터리`;
    backMeta.appendChild(backDir);
    backDir.textContent = `${directoryLabel(style.type)} \uB514\uB809\uD130\uB9AC`;
    backHead.appendChild(backMeta);

    const backHeadActions = document.createElement('div');
    backHeadActions.className = 'style-card-head-actions';

    const headBindButton = document.createElement('button');
    headBindButton.type = 'button';
    headBindButton.className = `style-card-mini-btn style-card-mini-btn-accent ${binding.inCurrentDeck ? 'active' : ''}`.trim();
    headBindButton.textContent = binding.inCurrentDeck ? '저장됨' : '보드';
    headBindButton.title = binding.inCurrentDeck
      ? `${selectedDeck()?.name || '내 보드'}에 저장되어 있습니다.`
      : `현재 보드: ${(selectedDeck()?.name || '내 보드')}`;
    headBindButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    headBindButton.addEventListener('click', (event) => {
      stopBubble(event);
      activeBindMenuStyleId = activeBindMenuStyleId === style.id ? '' : style.id;
      selectedStyleId = style.id;
      render();
    });
    backHeadActions.appendChild(headBindButton);

    if (activeBindMenuStyleId === style.id) {
      const bindMenu = document.createElement('div');
      bindMenu.className = 'style-card-bind-menu';

      const bindMenuLabel = document.createElement('div');
      bindMenuLabel.className = 'style-card-query-label style-card-query-label-field';
      bindMenuLabel.textContent = '저장할 보드';
      bindMenu.appendChild(bindMenuLabel);

      const bindMenuStatus = document.createElement('div');
      bindMenuStatus.className = 'style-card-workbench-preview';
      bindMenuStatus.textContent = `현재 선택 · ${selectedDeck()?.name || '내 보드'}`;
      bindMenu.appendChild(bindMenuStatus);

      const bindMenuGuide = document.createElement('div');
      bindMenuGuide.className = 'style-card-workbench-preview';
      bindMenuGuide.textContent = '저장할 보드를 고른 뒤 저장 버튼을 누르세요.';
      bindMenu.appendChild(bindMenuGuide);

      const headDeckSelect = document.createElement('select');
      headDeckSelect.className = 'style-card-deck-select';
      (binderState?.decks || []).forEach((deck) => {
        const option = document.createElement('option');
        option.value = deck.id;
        option.textContent = `${deck.name} (${(deck.cardIds || []).length})`;
        headDeckSelect.appendChild(option);
      });
      if (selectedDeck()) headDeckSelect.value = selectedDeck().id;
      headDeckSelect.addEventListener('pointerdown', (event) => event.stopPropagation());
      headDeckSelect.addEventListener('change', (event) => {
        event.stopPropagation();
        setSelectedDeck(headDeckSelect.value);
        activeBindMenuStyleId = style.id;
        selectedStyleId = style.id;
        render();
      });
      bindMenu.appendChild(headDeckSelect);

      const bindMenuActions = document.createElement('div');
      bindMenuActions.className = 'style-card-back-actions';

      const saveBindButton = document.createElement('button');
      saveBindButton.type = 'button';
      saveBindButton.className = 'style-card-mini-btn style-card-mini-btn-accent';
      saveBindButton.textContent = binding.inCurrentDeck ? '선택 보드에서 제거' : '선택 보드에 저장';
      saveBindButton.addEventListener('pointerdown', (event) => event.stopPropagation());
      saveBindButton.addEventListener('click', (event) => {
        stopBubble(event);
        const deck = selectedDeck();
        if (!deck) return;
        const added = toggleDeckMembership(style, deck.id);
        activeBindMenuStyleId = '';
        selectedStyleId = style.id;
        render();
        flashUiAck(headBindButton);
        showToast(added ? `${deck.name}\uC5D0 \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4.` : `${deck.name}\uC5D0\uC11C \uC81C\uAC70\uD588\uC2B5\uB2C8\uB2E4.`);
      });
      bindMenuActions.appendChild(saveBindButton);

      const newDeckInHeadButton = document.createElement('button');
      newDeckInHeadButton.type = 'button';
      newDeckInHeadButton.className = 'style-card-mini-btn';
      newDeckInHeadButton.textContent = '\uC0C8 \uB371 \uB9CC\uB4E4\uAE30';
      newDeckInHeadButton.addEventListener('pointerdown', (event) => event.stopPropagation());
      newDeckInHeadButton.addEventListener('click', (event) => {
        stopBubble(event);
        const name = window.prompt('새 보드 이름', `보드 ${(binderState?.decks || []).length + 1}`);
        if (!name) return;
        createDeck(name, style);
        activeBindMenuStyleId = '';
        selectedStyleId = style.id;
        render();
      });
      bindMenuActions.appendChild(newDeckInHeadButton);
      bindMenu.appendChild(bindMenuActions);
      backHeadActions.appendChild(bindMenu);
    }
    backHead.appendChild(backHeadActions);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'style-card-back-close';
    closeButton.textContent = '닫기';
    closeButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    closeButton.addEventListener('click', (event) => {
      stopBubble(event);
      closeDetail();
    });
    closeButton.hidden = true;
    backHead.appendChild(closeButton);
    back.appendChild(backHead);

    const backBody = document.createElement('div');
    backBody.className = 'style-card-back-body';

    const backHero = document.createElement('div');
    backHero.className = 'style-card-back-hero';

    const backThumb = document.createElement('img');
    backThumb.className = 'style-card-back-thumb';
    backThumb.alt = `${names.english} thumbnail`;
    backThumb.loading = 'lazy';
    backThumb.decoding = 'async';
    if (customCover) {
      backThumb.src = customCover;
    } else {
      applyThumb(backThumb, style);
    }
    backHero.appendChild(backThumb);
    backBody.appendChild(backHero);

    const titleBlock = document.createElement('div');
    titleBlock.className = 'style-card-back-title';

    const backEnglish = document.createElement('div');
    backEnglish.className = 'style-card-back-en';
    backEnglish.textContent = names.english;
    titleBlock.appendChild(backEnglish);

    if (names.korean) {
      const backKorean = document.createElement('div');
      backKorean.className = 'style-card-back-ko';
      backKorean.textContent = names.korean;
      titleBlock.appendChild(backKorean);
    }

    const summaryText = document.createElement('p');
    summaryText.className = 'style-card-back-summary';
    summaryText.textContent = summary;
    titleBlock.appendChild(summaryText);
    backBody.appendChild(titleBlock);

    const bindingStatus = document.createElement('div');
    bindingStatus.className = 'style-card-back-status';
    const boundNames = binding.decks.map((deck) => deck.name).slice(0, 3).join(' / ');
    const bindingBits = [
      binding.inCurrentDeck ? '현재 보드에 저장됨' : binding.any ? '다른 보드에 저장됨' : '아직 저장되지 않음',
      binding.currentDeck ? `현재 보드: ${binding.currentDeck.name}` : '현재 보드: 없음',
      customCover ? '커스텀 커버 사용 중' : '카테고리 컬러 커버'
    ];
    bindingStatus.textContent = bindingBits.join(' · ');
    if (boundNames && !binding.inCurrentDeck) bindingStatus.title = boundNames;
    bindingStatus.hidden = true;
    backBody.appendChild(bindingStatus);

    const queryGrid = document.createElement('div');
    queryGrid.className = 'style-card-query-grid';

    const makeQueryCard = (label, value, openSiteKey, seedMode = 'precise', helpText = '') => {
      const box = document.createElement('article');
      box.className = 'style-card-query-card';

      const head = document.createElement('div');
      head.className = 'style-card-query-head';

      const title = document.createElement('div');
      title.className = 'style-card-query-label';
      title.textContent = label;
      if (helpText) title.appendChild(createHelpIcon(helpText));
      head.appendChild(title);

      const tools = document.createElement('div');
      tools.className = 'style-card-query-tools';

      const useButton = document.createElement('button');
      useButton.type = 'button';
      useButton.className = 'style-card-mini-btn';
      useButton.textContent = '불러오기';
      useButton.addEventListener('pointerdown', (event) => event.stopPropagation());
      useButton.addEventListener('click', (event) => {
        stopBubble(event);
        detailQuerySeedMode = seedMode;
        detailQuerySeedMode = 'quick';
        detailSearchDraft = detailSearchQuery(style, 'quick', activeSiteKey, detailExpansionKey);
        selectedStyleId = style.id;
        render();
      });
      tools.appendChild(useButton);

      const openButton = document.createElement('button');
      openButton.type = 'button';
      openButton.className = 'style-card-mini-btn';
      openButton.textContent = '열기';
      openButton.addEventListener('pointerdown', (event) => event.stopPropagation());
      openButton.addEventListener('click', (event) => {
        stopBubble(event);
        openQueryOnSite(value, openSiteKey);
      });
      tools.appendChild(openButton);

      const copyButton = document.createElement('button');
      copyButton.type = 'button';
      copyButton.className = 'style-card-mini-btn';
      copyButton.textContent = '복사';
      copyButton.addEventListener('pointerdown', (event) => event.stopPropagation());
      copyButton.addEventListener('click', async (event) => {
        stopBubble(event);
        if (await writeClipboard(value)) showToast(`${label}를 복사했습니다.`);
      });
      tools.appendChild(copyButton);

      head.appendChild(tools);
      box.appendChild(head);

      const body = document.createElement('pre');
      body.className = 'style-card-code-block';
      body.textContent = value;
      box.appendChild(body);
      return box;
    };

    queryGrid.appendChild(makeQueryCard('빠른 검색어', workbench.quickQuery, 'pinterest', 'quick', '넓게 탐색할 때 쓰는 검색어예요. 첫 번째 탐색에서 쓰기 좋습니다.'));
    queryGrid.appendChild(makeQueryCard('정밀 검색어', workbench.preciseQuery, activeSiteKey || 'google', 'precise', '핵심 특징이 더 많이 붙은 검색어예요. 방향이 정해졌을 때 더 잘 맞습니다.'));
    queryGrid.hidden = true;
    backBody.appendChild(queryGrid);

    const workbenchBox = document.createElement('article');
    workbenchBox.className = 'style-card-query-card style-card-workbench';

    const workbenchHead = document.createElement('div');
    workbenchHead.className = 'style-card-query-head';

    const workbenchTitle = document.createElement('div');
    workbenchTitle.className = 'style-card-query-label';
    workbenchTitle.textContent = '\uAC80\uC0C9 \uC791\uC5C5';
    workbenchTitle.textContent = '상세 검색';
    workbenchTitle.appendChild(createHelpIcon('검색 사이트를 바꾸고, 확장 키워드를 붙이고, 검색어를 직접 수정해서 더 깊게 탐색하는 작업 영역입니다.'));
    workbenchHead.appendChild(workbenchTitle);
    workbenchTitle.replaceChildren(
      document.createTextNode('\uAC80\uC0C9 \uC791\uC5C5'),
      createHelpIcon('\uC9C0\uC6D0 \uC0AC\uC774\uD2B8\uB97C \uACE0\uB974\uACE0 \uD655\uC7A5 \uD0A4\uC6CC\uB4DC\uB97C \uBD99\uC778 \uB4A4 \uCD5C\uC885 \uAC80\uC0C9\uC5B4\uB97C \uB2E4\uB4EC\uC5B4 \uBC14\uB85C \uC5F4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.')
    );

    const resetSearchButton = document.createElement('button');
    resetSearchButton.type = 'button';
    resetSearchButton.className = 'style-card-mini-btn';
    resetSearchButton.textContent = '초기화';
    resetSearchButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    resetSearchButton.addEventListener('click', (event) => {
      stopBubble(event);
      detailQuerySeedMode = 'precise';
      detailExpansionKey = '';
      detailSearchDraft = detailSearchQuery(style, 'precise', activeSiteKey, '');
      selectedStyleId = style.id;
      render();
    });
    workbenchHead.appendChild(resetSearchButton);
    resetSearchButton.textContent = '\uCD08\uAE30\uD654';
    const resetSearchReplacement = resetSearchButton.cloneNode(true);
    resetSearchReplacement.addEventListener('pointerdown', (event) => event.stopPropagation());
    resetSearchReplacement.addEventListener('click', (event) => {
      stopBubble(event);
      detailQuerySeedMode = 'quick';
      detailExpansionKey = '';
      detailSiteKey = workbench.siteKeys[0] || 'pinterest';
      detailSearchDraft = detailSearchQuery(style, 'quick', detailSiteKey, '');
      selectedStyleId = style.id;
      render();
    });
    resetSearchButton.replaceWith(resetSearchReplacement);
    workbenchBox.appendChild(workbenchHead);

    const workbenchToolbar = document.createElement('div');
    workbenchToolbar.className = 'style-card-workbench-toolbar';

    const siteField = document.createElement('label');
    siteField.className = 'style-card-workbench-field';
    const siteLabels = workbench.siteKeys.map((key) => SITES[key]?.label || key);

    const siteLabel = document.createElement('span');
    siteLabel.className = 'style-card-query-label style-card-query-label-field';
    siteLabel.textContent = '검색 사이트';
    siteLabel.appendChild(createHelpIcon('디렉터리마다 잘 맞는 사이트가 달라서, 카드 유형에 맞는 사이트만 골라서 보여줍니다.'));
    siteField.appendChild(siteLabel);

    const siteSelect = document.createElement('select');
    siteSelect.className = 'style-card-deck-select style-card-site-select';
    workbench.siteKeys.forEach((key) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = SITES[key]?.label || key;
      siteSelect.appendChild(option);
    });
    siteSelect.value = activeSiteKey;
    siteSelect.title = siteLabels.join(', ');
    siteSelect.addEventListener('pointerdown', (event) => event.stopPropagation());
    siteSelect.addEventListener('click', (event) => event.stopPropagation());
    siteSelect.addEventListener('change', (event) => {
      event.stopPropagation();
      siteTouched = true;
      activeSiteKey = siteSelect.value;
      detailSearchDraft = detailSearchQuery(style, detailQuerySeedMode, activeSiteKey, detailExpansionKey);
      selectedStyleId = style.id;
      render();
    });
    siteField.appendChild(siteSelect);

    const siteSummary = document.createElement('div');
    siteSummary.className = 'style-card-workbench-preview style-card-site-preview';
    siteSummary.textContent = `\uC9C0\uC6D0 \uC0AC\uC774\uD2B8 ${siteLabels.length}\uAC1C · ${siteLabels.join(' · ')}`;
    siteField.appendChild(siteSummary);

    workbenchToolbar.appendChild(siteField);
    siteField.hidden = true;

    const seedActions = document.createElement('div');
    seedActions.className = 'style-card-back-actions';

    const quickSeedButton = document.createElement('button');
    quickSeedButton.type = 'button';
    quickSeedButton.className = `style-card-mini-btn ${detailQuerySeedMode === 'quick' ? 'active' : ''}`.trim();
    quickSeedButton.textContent = '빠른 기준';
    quickSeedButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    quickSeedButton.addEventListener('click', (event) => {
      stopBubble(event);
      detailQuerySeedMode = 'quick';
      detailSearchDraft = detailSearchQuery(style, 'quick', activeSiteKey, detailExpansionKey);
      selectedStyleId = style.id;
      render();
    });
    seedActions.appendChild(quickSeedButton);

    const preciseSeedButton = document.createElement('button');
    preciseSeedButton.type = 'button';
    preciseSeedButton.className = `style-card-mini-btn ${detailQuerySeedMode === 'precise' ? 'active' : ''}`.trim();
    preciseSeedButton.textContent = '정밀 기준';
    preciseSeedButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    preciseSeedButton.addEventListener('click', (event) => {
      stopBubble(event);
      detailQuerySeedMode = 'precise';
      detailSearchDraft = detailSearchQuery(style, 'precise', activeSiteKey, detailExpansionKey);
      selectedStyleId = style.id;
      render();
    });
    seedActions.appendChild(preciseSeedButton);

    workbenchToolbar.appendChild(seedActions);
    workbenchToolbar.hidden = true;
    workbenchBox.appendChild(workbenchToolbar);

    const siteGuide = document.createElement('div');
    siteGuide.className = 'style-card-site-groups';

    const supportGroup = document.createElement('div');
    supportGroup.className = 'style-card-site-group';

    const supportLabel = document.createElement('div');
    supportLabel.className = 'style-card-query-label style-card-query-label-field';
    supportLabel.textContent = '\uC9C0\uC6D0 \uAC80\uC0C9 \uC0AC\uC774\uD2B8';
    supportGroup.appendChild(supportLabel);
    supportLabel.appendChild(createHelpIcon('\uAE30\uBCF8\uC740 Pinterest\uC640 Google \uC774\uBBF8\uC9C0\uB97C \uD3EC\uD568\uD558\uACE0, \uB514\uB809\uD130\uB9AC\uB9C8\uB2E4 \uCD94\uAC00 \uC0AC\uC774\uD2B8\uAC00 \uD568\uAED8 \uC9C0\uC6D0\uB429\uB2C8\uB2E4.'));

    const supportPreview = document.createElement('div');
    supportPreview.className = 'style-card-workbench-preview style-card-site-preview';
    supportPreview.textContent = `${workbench.siteKeys.length}\uAC1C \uC0AC\uC774\uD2B8 \uC911 \uC120\uD0DD · ${SITES[workbench.siteKey]?.label || 'Pinterest'}`;
    supportGroup.appendChild(supportPreview);
    supportPreview.textContent = `${workbench.siteKeys.length}\uAC1C \uC9C0\uC6D0 \uC0AC\uC774\uD2B8 \u00B7 \uD604\uC7AC ${SITES[workbench.siteKey]?.label || 'Pinterest'}`;

    const supportRow = document.createElement('div');
    supportRow.className = 'style-card-site-shortcuts';
    workbench.siteKeys.forEach((key) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `style-tag style-card-site-chip ${workbench.siteKey === key ? 'active' : ''}`.trim();
      button.textContent = SITES[key]?.label || key;
      button.addEventListener('pointerdown', (event) => event.stopPropagation());
      button.addEventListener('click', (event) => {
        stopBubble(event);
        siteTouched = true;
        detailSiteKey = key;
        detailQuerySeedMode = 'quick';
        detailSearchDraft = detailSearchQuery(style, 'quick', detailSiteKey, detailExpansionKey);
        selectedStyleId = style.id;
        render();
      });
      supportRow.appendChild(button);
    });
    supportGroup.appendChild(supportRow);
    siteGuide.appendChild(supportGroup);

    const recommendedLinks = recommendedReferenceLinksForMode(workbench.mode);
    if (recommendedLinks.length) {
      const recommendGroup = document.createElement('div');
      recommendGroup.className = 'style-card-site-group';

      const recommendLabel = document.createElement('div');
      recommendLabel.className = 'style-card-query-label style-card-query-label-field';
      recommendLabel.textContent = '\uCD94\uCC9C \uCC38\uACE0 \uC0AC\uC774\uD2B8';
      recommendGroup.appendChild(recommendLabel);

      const recommendRow = document.createElement('div');
      recommendRow.className = 'style-card-site-shortcuts';
      recommendedLinks.forEach((item) => {
        const link = document.createElement('button');
        link.type = 'button';
        link.className = 'style-tag style-card-site-chip';
        link.textContent = item.label;
        link.addEventListener('pointerdown', (event) => event.stopPropagation());
        link.addEventListener('click', (event) => {
          stopBubble(event);
          window.open(item.href, '_blank', 'noopener,noreferrer');
        });
        recommendRow.appendChild(link);
      });
      recommendGroup.appendChild(recommendRow);
      siteGuide.appendChild(recommendGroup);
    }

    workbenchBox.appendChild(siteGuide);
    if (siteGuide.children[1]) siteGuide.children[1].hidden = true;

    const siteShortcutWrap = document.createElement('div');
    siteShortcutWrap.className = 'style-card-workbench-sites';

    const siteShortcutLabel = document.createElement('div');
    siteShortcutLabel.className = 'style-card-query-label style-card-query-label-field';
    siteShortcutLabel.textContent = '지원 사이트';
    siteShortcutLabel.appendChild(createHelpIcon('현재 카드의 상세 검색어를 여러 사이트에서 바로 열 수 있어요.'));
    siteShortcutWrap.appendChild(siteShortcutLabel);

    const siteShortcutRow = document.createElement('div');
    siteShortcutRow.className = 'style-card-site-shortcuts';
    workbench.siteKeys.forEach((key) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `style-tag style-card-site-chip ${activeSiteKey === key ? 'active' : ''}`.trim();
      button.textContent = SITES[key]?.label || key;
      button.addEventListener('pointerdown', (event) => event.stopPropagation());
      button.addEventListener('click', (event) => {
        stopBubble(event);
        openQueryOnSite(detailSearchDraft || workbench.draft || workbench.preciseQuery, key);
      });
      siteShortcutRow.appendChild(button);
    });
    siteShortcutWrap.appendChild(siteShortcutRow);
    workbenchBox.appendChild(siteShortcutWrap);
    siteShortcutWrap.hidden = true;

    const expansionLabel = document.createElement('div');
    expansionLabel.className = 'style-card-query-label style-card-query-label-field';
    expansionLabel.textContent = '확장 키워드';
    expansionLabel.appendChild(createHelpIcon('탐색 관점을 바꿔주는 키워드입니다. 한 번에 하나씩 붙여서 결과 차이를 보는 방식이 가장 좋습니다.'));
    workbenchBox.appendChild(expansionLabel);
    expansionLabel.replaceChildren(
      document.createTextNode('\uD655\uC7A5 \uD0A4\uC6CC\uB4DC'),
      createHelpIcon('\uAE30\uBCF8 \uAC80\uC0C9\uC5B4\uC5D0 \uAD00\uC810\uC744 \uD558\uB098 \uB354 \uBD99\uC5EC \uACB0\uACFC \uBC94\uC704\uB97C \uC870\uC808\uD558\uB294 \uC6A9\uB3C4\uC785\uB2C8\uB2E4.')
    );

    const expansionWrap = document.createElement('div');
    expansionWrap.className = 'style-card-workbench-expansions';
    detailExpansionOptionsForMode(workbench.mode).forEach((item) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `style-tag style-card-expansion-chip ${detailExpansionKey === item.key ? 'active' : ''}`.trim();
      chip.textContent = item.label;
      chip.addEventListener('pointerdown', (event) => event.stopPropagation());
      chip.addEventListener('click', (event) => {
        stopBubble(event);
        detailExpansionKey = detailExpansionKey === item.key ? '' : item.key;
        detailQuerySeedMode = 'quick';
        detailSearchDraft = detailSearchQuery(style, 'quick', detailSiteKey || workbench.siteKey, detailExpansionKey);
        selectedStyleId = style.id;
        render();
      });
      expansionWrap.appendChild(chip);
    });
    workbenchBox.appendChild(expansionWrap);

    if (workbench.expansionToken) {
      const expansionPreview = document.createElement('div');
      expansionPreview.className = 'style-card-workbench-preview';
      expansionPreview.textContent = `추가되는 확장 키워드: ${workbench.expansionToken}`;
      workbenchBox.appendChild(expansionPreview);
      expansionPreview.textContent = `\uC120\uD0DD\uB41C \uD655\uC7A5 \uD0A4\uC6CC\uB4DC \u00B7 ${workbench.expansionToken}`;
    }

    const searchField = document.createElement('label');
    searchField.className = 'style-card-workbench-field';

    const searchLabel = document.createElement('span');
    searchLabel.className = 'style-card-query-label style-card-query-label-field';
    searchLabel.textContent = '수정 가능한 검색어';
    searchLabel.appendChild(createHelpIcon('기본 검색어를 출발점으로 삼고, 피사체나 무드, 매체를 직접 더 붙여서 수정할 수 있어요.'));
    searchField.appendChild(searchLabel);
    searchLabel.replaceChildren(
      document.createTextNode('\uC218\uC815 \uAC00\uB2A5\uD55C \uAC80\uC0C9\uC5B4'),
      createHelpIcon('\uBE60\uB978 \uAC80\uC0C9\uC5B4\uB97C \uAE30\uBCF8\uC73C\uB85C \uC0AC\uC6A9\uD558\uACE0, \uD655\uC7A5 \uD0A4\uC6CC\uB4DC\uB098 \uBB34\uB4DC \uD45C\uD604\uC744 \uB35C\uC774\uAC70\uB098 \uC9C1\uC811 \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.')
    );

    const searchInput = document.createElement('textarea');
    searchInput.className = 'style-card-search-input style-card-code-editor';
    searchInput.value = workbench.draft;
    searchInput.autocomplete = 'off';
    searchInput.rows = 4;
    searchInput.addEventListener('pointerdown', (event) => event.stopPropagation());
    searchInput.addEventListener('click', (event) => event.stopPropagation());
    searchInput.addEventListener('input', (event) => {
      event.stopPropagation();
      detailSearchDraft = String(searchInput.value || '');
    });
    searchInput.addEventListener('keydown', (event) => {
      event.stopPropagation();
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        openQueryOnSite(searchInput.value, detailSiteKey || workbench.siteKey);
      }
    });
    searchField.appendChild(searchInput);

    const searchRow = document.createElement('div');
    searchRow.className = 'style-card-search-row';

    const searchOpenButton = document.createElement('button');
    searchOpenButton.type = 'button';
    searchOpenButton.className = 'style-card-mini-btn style-card-mini-btn-accent';
    searchOpenButton.textContent = '검색';
    searchOpenButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    searchOpenButton.addEventListener('click', (event) => {
      stopBubble(event);
      openQueryOnSite(searchInput.value, detailSiteKey || workbench.siteKey);
    });
    searchRow.appendChild(searchOpenButton);
    searchOpenButton.textContent = '\uAC80\uC0C9';

    const searchCopyButton = document.createElement('button');
    searchCopyButton.type = 'button';
    searchCopyButton.className = 'style-card-mini-btn';
    searchCopyButton.textContent = '복사';
    searchCopyButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    searchCopyButton.addEventListener('click', async (event) => {
      stopBubble(event);
      if (await writeClipboard(searchInput.value)) showToast('상세 검색어를 복사했습니다.');
    });
    searchRow.appendChild(searchCopyButton);
    const searchCopyReplacement = searchCopyButton.cloneNode(true);
    searchCopyReplacement.textContent = '\uBCF5\uC0AC';
    searchCopyReplacement.addEventListener('pointerdown', (event) => event.stopPropagation());
    searchCopyReplacement.addEventListener('click', async (event) => {
      stopBubble(event);
      if (await writeClipboard(searchInput.value)) {
        flashUiAck(searchCopyReplacement);
        showToast('\uAC80\uC0C9\uC5B4\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4.');
      }
    });
    searchCopyButton.replaceWith(searchCopyReplacement);

    searchField.appendChild(searchRow);
    workbenchBox.appendChild(searchField);

    if (recommendedLinks.length) {
      const recommendGroup = document.createElement('div');
      recommendGroup.className = 'style-card-site-group';

      const recommendLabel = document.createElement('div');
      recommendLabel.className = 'style-card-query-label style-card-query-label-field';
      recommendLabel.textContent = '\uCD94\uCC9C \uCC38\uACE0 \uC0AC\uC774\uD2B8';
      recommendGroup.appendChild(recommendLabel);
      recommendLabel.appendChild(createHelpIcon('\uAC80\uC0C9 \uC2E4\uD589\uC6A9\uC740 \uC544\uB2C8\uACE0, \uCC38\uACE0 \uD3ED\uC744 \uB113\uD788\uAE30 \uC704\uD55C \uC678\uBD80 \uB9C1\uD06C\uC785\uB2C8\uB2E4.'));

      const recommendRow = document.createElement('div');
      recommendRow.className = 'style-card-site-shortcuts';
      recommendedLinks.forEach((item) => {
        const link = document.createElement('button');
        link.type = 'button';
        link.className = 'style-tag style-card-site-chip';
        link.textContent = item.label;
        link.addEventListener('pointerdown', (event) => event.stopPropagation());
        link.addEventListener('click', (event) => {
          stopBubble(event);
          window.open(item.href, '_blank', 'noopener,noreferrer');
        });
        recommendRow.appendChild(link);
      });
      recommendGroup.appendChild(recommendRow);
      workbenchBox.appendChild(recommendGroup);
    }
    backBody.appendChild(workbenchBox);

    const promptBox = document.createElement('article');
    promptBox.className = 'style-card-query-card style-card-prompt-box';

    const promptHead = document.createElement('div');
    promptHead.className = 'style-card-query-head';

    const promptTitle = document.createElement('div');
    promptTitle.className = 'style-card-query-label';
    promptTitle.textContent = '프롬프트 팩';
    promptTitle.appendChild(createHelpIcon('생성, 변환, 확장 목적에 맞게 나뉜 프롬프트입니다. 그대로 복사한 뒤 필요한 키워드를 조금씩 더해보세요.'));
    promptHead.appendChild(promptTitle);
    promptTitle.replaceChildren(
      document.createTextNode('\uD504\uB86C\uD504\uD2B8 \uD329'),
      createHelpIcon('\uC0D8\uD50C \uC774\uBBF8\uC9C0 \uC0DD\uC131\uC6A9\uACFC \uC774\uBBF8\uC9C0 \uBCC0\uD658\uC6A9 \uD504\uB86C\uD504\uD2B8\uB97C \uAC01\uAC01 \uBCF5\uC0AC\uD574 \uC2E4\uD5D8\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.')
    );
    promptBox.appendChild(promptHead);

    const promptList = document.createElement('div');
    promptList.className = 'style-card-prompt-list';
    [
      ['생성 프롬프트', promptBundle.generate],
      ['변환 프롬프트', promptBundle.transform],
      ['확장 프롬프트', promptBundle.expand]
    ].forEach(([label, text]) => {
      const row = document.createElement('article');
      row.className = 'style-card-prompt-row';

      const meta = document.createElement('div');
      meta.className = 'style-card-prompt-meta';

      const rowLabel = document.createElement('div');
      rowLabel.className = 'style-card-prompt-label';
      rowLabel.textContent = label;
      meta.appendChild(rowLabel);
      row.appendChild(meta);

      const rowButton = document.createElement('button');
      rowButton.type = 'button';
      rowButton.className = 'style-card-mini-btn';
      rowButton.textContent = '복사';
      rowButton.addEventListener('pointerdown', (event) => event.stopPropagation());
      rowButton.addEventListener('click', async (event) => {
        stopBubble(event);
        if (await writeClipboard(text)) showToast(`${label}를 복사했습니다.`);
      });
      row.appendChild(rowButton);

      const rowBody = document.createElement('pre');
      rowBody.className = 'style-card-code-block style-card-prompt-code';
      rowBody.textContent = text || '-';
      row.appendChild(rowBody);
      promptList.appendChild(row);
    });
    if (promptList.children[2]) promptList.children[2].remove();
    if (promptList.children[0]) {
      const label = promptList.children[0].querySelector('.style-card-prompt-label');
      if (label) label.textContent = '\uC0D8\uD50C \uC774\uBBF8\uC9C0 \uC0DD\uC131 \uD504\uB86C\uD504\uD2B8';
    }
    if (promptList.children[1]) {
      const label = promptList.children[1].querySelector('.style-card-prompt-label');
      if (label) label.textContent = '\uC774\uBBF8\uC9C0 \uBCC0\uD658 \uD504\uB86C\uD504\uD2B8 (Nano Banana)';
    }
    Array.from(promptList.querySelectorAll('.style-card-prompt-row')).forEach((row) => {
      const label = row.querySelector('.style-card-prompt-label')?.textContent || '\uD504\uB86C\uD504\uD2B8';
      const text = row.querySelector('.style-card-prompt-code')?.textContent || '';
      const oldButton = row.querySelector('.style-card-mini-btn');
      if (!oldButton) return;
      const newButton = oldButton.cloneNode(true);
      newButton.textContent = '\uBCF5\uC0AC';
      newButton.addEventListener('pointerdown', (event) => event.stopPropagation());
      newButton.addEventListener('click', async (event) => {
        stopBubble(event);
        if (await writeClipboard(text)) {
          flashUiAck(newButton);
          showToast(`${label}\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4.`);
        }
      });
      oldButton.replaceWith(newButton);
    });
    promptBox.appendChild(promptList);
    backBody.appendChild(promptBox);

    const binderBox = document.createElement('article');
    binderBox.className = 'style-card-query-card';

    const binderHead = document.createElement('div');
    binderHead.className = 'style-card-query-head';

    const binderTitle = document.createElement('div');
    binderTitle.className = 'style-card-query-label';
    binderTitle.textContent = '바인딩 테스트';
    binderTitle.appendChild(createHelpIcon('현재 카드를 어떤 덱에 넣을지 시험해보는 영역입니다. 커버 업로드도 여기서 할 수 있어요.'));
    binderTitle.textContent = '\uCEE4\uBC84 \uAD00\uB9AC';
    binderHead.appendChild(binderTitle);
    binderTitle.replaceChildren(
      document.createTextNode('\uCEE4\uBC84 \uAD00\uB9AC'),
      createHelpIcon('\uCE74\uB4DC \uC804\uBA74 \uC774\uBBF8\uC9C0\uB97C \uC218\uB3D9\uC73C\uB85C \uC5C5\uB85C\uB4DC\uD558\uAC70\uB098 \uAE30\uBCF8 \uCE74\uD14C\uACE0\uB9AC \uCEE4\uBC84\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.')
    );
    binderBox.appendChild(binderHead);

    const deckSelect = document.createElement('select');
    deckSelect.className = 'style-card-deck-select';
    (binderState?.decks || []).forEach((deck) => {
      const option = document.createElement('option');
      option.value = deck.id;
      option.textContent = `${deck.name} (${(deck.cardIds || []).length})`;
      deckSelect.appendChild(option);
    });
    if (binding.currentDeck) deckSelect.value = binding.currentDeck.id;
    deckSelect.addEventListener('pointerdown', (event) => event.stopPropagation());
    deckSelect.addEventListener('click', (event) => event.stopPropagation());
    deckSelect.addEventListener('change', (event) => {
      event.stopPropagation();
      setSelectedDeck(deckSelect.value);
      selectedStyleId = style.id;
      render();
    });
    deckSelect.hidden = true;
    binderBox.appendChild(deckSelect);

    const binderActions = document.createElement('div');
    binderActions.className = 'style-card-back-actions';

    const backBindButton = document.createElement('button');
    backBindButton.type = 'button';
    backBindButton.className = `style-card-mini-btn style-card-mini-btn-accent ${binding.inCurrentDeck ? 'active' : ''}`.trim();
    backBindButton.textContent = binding.inCurrentDeck ? '해제' : '저장';
    backBindButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    backBindButton.addEventListener('click', toggleBound);
    backBindButton.hidden = true;
    binderActions.appendChild(backBindButton);

    const newDeckButton = document.createElement('button');
    newDeckButton.type = 'button';
    newDeckButton.className = 'style-card-mini-btn';
    newDeckButton.textContent = '새 보드';
    newDeckButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    newDeckButton.addEventListener('click', (event) => {
      stopBubble(event);
      const name = window.prompt('새 보드 이름', `보드 ${(binderState?.decks || []).length + 1}`);
      if (!name) return;
      createDeck(name, style);
      selectedStyleId = style.id;
      render();
      showToast('새 보드를 만들었습니다.');
    });
    newDeckButton.hidden = true;
    binderActions.appendChild(newDeckButton);

    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.accept = 'image/*';
    uploadInput.className = 'style-card-upload-input';
    uploadInput.addEventListener('click', (event) => event.stopPropagation());
    uploadInput.addEventListener('change', async (event) => {
      event.stopPropagation();
      const file = uploadInput.files && uploadInput.files[0];
      if (!file) return;
      try {
        await setCustomBackgroundFromFile(style, file);
        selectedStyleId = style.id;
        render();
        showToast('커스텀 커버를 적용했습니다.');
      } catch (err) {
        console.error(err);
        showToast('커스텀 커버 적용에 실패했습니다.');
      }
    });

    const uploadButton = document.createElement('button');
    uploadButton.type = 'button';
    uploadButton.className = 'style-card-mini-btn';
    uploadButton.textContent = '커버 업로드';
    uploadButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    uploadButton.addEventListener('click', (event) => {
      stopBubble(event);
      uploadInput.value = '';
      uploadInput.click();
    });
    binderActions.appendChild(uploadButton);
    uploadButton.textContent = '\uCEE4\uBC84 \uC5C5\uB85C\uB4DC';
    const uploadButtonReplacement = uploadButton.cloneNode(true);
    uploadButtonReplacement.addEventListener('pointerdown', (event) => event.stopPropagation());
    uploadButtonReplacement.addEventListener('click', (event) => {
      stopBubble(event);
      uploadInput.value = '';
      uploadInput.click();
    });
    uploadButton.replaceWith(uploadButtonReplacement);
    binderActions.appendChild(uploadInput);
    const uploadInputReplacement = uploadInput.cloneNode(true);
    uploadInputReplacement.addEventListener('click', (event) => event.stopPropagation());
    uploadInputReplacement.addEventListener('change', async (event) => {
      event.stopPropagation();
      const file = uploadInputReplacement.files && uploadInputReplacement.files[0];
      if (!file) return;
      try {
        await setCustomBackgroundFromFile(style, file);
        selectedStyleId = style.id;
        render();
        showToast('\uCEE4\uC2A4\uD140 \uCEE4\uBC84\uB97C \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.');
      } catch (err) {
        console.error(err);
        showToast('\uCEE4\uC2A4\uD140 \uCEE4\uBC84 \uC801\uC6A9\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.');
      }
    });
    uploadInput.replaceWith(uploadInputReplacement);
    const uploadButtonFinal = uploadButtonReplacement.cloneNode(true);
    uploadButtonFinal.textContent = '\uCEE4\uBC84 \uC5C5\uB85C\uB4DC';
    uploadButtonFinal.addEventListener('pointerdown', (event) => event.stopPropagation());
    uploadButtonFinal.addEventListener('click', (event) => {
      stopBubble(event);
      uploadInputReplacement.value = '';
      uploadInputReplacement.click();
    });
    uploadButtonReplacement.replaceWith(uploadButtonFinal);

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'style-card-mini-btn';
    resetButton.textContent = '커버 초기화';
    resetButton.disabled = !customCover;
    resetButton.addEventListener('pointerdown', (event) => event.stopPropagation());
    resetButton.addEventListener('click', async (event) => {
      stopBubble(event);
      await removeCustomBackground(style);
      selectedStyleId = style.id;
      render();
      showToast('커스텀 커버를 제거했습니다.');
    });
    binderActions.appendChild(resetButton);
    resetButton.textContent = '\uCEE4\uBC84 \uCD08\uAE30\uD654';
    const resetButtonReplacement = resetButton.cloneNode(true);
    resetButtonReplacement.disabled = !customCover;
    resetButtonReplacement.addEventListener('pointerdown', (event) => event.stopPropagation());
    resetButtonReplacement.addEventListener('click', async (event) => {
      stopBubble(event);
      await removeCustomBackground(style);
      selectedStyleId = style.id;
      render();
      showToast('\uCEE4\uC2A4\uD140 \uCEE4\uBC84\uB97C \uC81C\uAC70\uD588\uC2B5\uB2C8\uB2E4.');
    });
    resetButton.replaceWith(resetButtonReplacement);
    binderBox.appendChild(binderActions);
    backBody.appendChild(binderBox);

    back.appendChild(backBody);

    shell.appendChild(front);
    shell.appendChild(back);
    card.appendChild(shell);

    const toggleCard = () => {
      if (selectedStyleId === style.id) closeDetail();
      else selectStyle(style);
    };

    front.addEventListener('click', (event) => {
      if (event.target.closest('button, select, input, label')) return;
      event.stopPropagation();
      toggleCard();
    });
    card.addEventListener('click', (event) => {
      if (event.target !== card) return;
      if (event.target.closest('button, select, input, label')) return;
      toggleCard();
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard();
      }
    });

    return card;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
