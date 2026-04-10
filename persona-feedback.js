(() => {
  const THEME_KEY = "reference-hub-theme";
  const THEMES = ["light", "dark", "nord", "dracula", "solarized-dark", "solarized-light", "high-contrast"];

  const scoreMeta = [
    {
      key: "discoverability",
      label: "탐색 이해도",
      hint: "첫 화면만 보고도 무엇을 할 수 있는지 빠르게 이해하는 정도",
      accent: "#66d7ff",
    },
    {
      key: "speed",
      label: "탐색 속도",
      hint: "스타일을 찾고 외부 검색으로 넘어가기까지의 체감 속도",
      accent: "#8cffb8",
    },
    {
      key: "confidence",
      label: "결정 확신",
      hint: "찾아낸 레퍼런스가 충분히 믿을 만하다고 느끼는 정도",
      accent: "#ffd36e",
    },
    {
      key: "depth",
      label: "레퍼런스 깊이",
      hint: "카테고리 폭, 연결감, 다음 탐색 거리까지 만족시키는 정도",
      accent: "#ff9f7f",
    },
    {
      key: "reuse",
      label: "재사용성",
      hint: "다음 작업이나 팀 공유까지 이어서 다시 쓰고 싶은 정도",
      accent: "#c292ff",
    },
  ];

  const journeyMeta = [
    { key: "explore", label: "탐색 시작" },
    { key: "narrow", label: "후보 좁히기" },
    { key: "inspect", label: "상세 확인" },
    { key: "expand", label: "외부 확장" },
    { key: "reuse", label: "재사용" },
  ];

  const positiveThemeMeta = {
    speed: {
      label: "찾고 나가는 속도가 빠름",
      copy: "디렉토리 탐색 후 외부 검색으로 이어지는 흐름이 대체로 짧고 직관적이라는 반응.",
    },
    "cross-reference": {
      label: "여러 레퍼런스 축을 한 제품에서 오갈 수 있음",
      copy: "디자인, 사진, 포즈, 팔레트가 따로 놀지 않고 연결된다는 점이 장점으로 작동.",
    },
    "external-search": {
      label: "외부 검색 확장성이 분명함",
      copy: "카드 클릭 후 Pinterest, Google 이미지 등으로 확장하는 행동이 자연스럽다는 평가.",
    },
    breadth: {
      label: "디렉토리 폭이 넓어 킥오프용으로 좋음",
      copy: "초기 아이디에이션, 무드보드, 회의 준비 단계에서 폭넓은 탐색 허브로 작동.",
    },
    "tag-clarity": {
      label: "태그와 명칭이 회의 언어를 만들어 줌",
      copy: "스타일 이름이 애매한 감각을 언어로 바꾸는 출발점이 된다는 피드백.",
    },
    "resource-links": {
      label: "전문 레퍼런스 링크 모음이 유용함",
      copy: "Posemaniacs, Unsplash 같은 직접 링크가 반복 검색을 줄인다는 반응.",
    },
    "prompt-reuse": {
      label: "프롬프트 재사용 흐름이 빠름",
      copy: "AI 생성 작업으로 넘어갈 때 카드 기반 프롬프트가 전환 비용을 줄여 줌.",
    },
    "team-alignment": {
      label: "팀의 기준점을 맞추는 데 유리함",
      copy: "기획, 디자인, 브랜딩 담당자 간 공통 레퍼런스 언어를 빠르게 형성해 줌.",
    },
    "learning-structure": {
      label: "스타일 사전처럼 학습에 도움 됨",
      copy: "입문자에게는 가나다/영문 정렬과 디렉토리 구조 자체가 학습 장치처럼 보임.",
    },
    "search-link": {
      label: "한글 검색 출발점이 부담이 적음",
      copy: "내부 검색에서 감을 잡고 바로 외부 확장으로 넘어가니 진입 장벽이 낮다는 반응.",
    },
  };

  const negativeThemeMeta = {
    onboarding: {
      label: "처음 방문한 사용자를 위한 가이드 부족",
      copy: "내부 필터와 외부 검색의 두 흐름이 왜 나뉘는지 첫 진입에서 더 설명이 필요함.",
      bucket: "quick",
      roadmap: "첫 방문 30초 투어와 단계별 안내문을 추가해 흐름 차이를 시각적으로 분리합니다.",
    },
    "curation-visibility": {
      label: "저장/덱 같은 큐레이션 기능 노출이 약함",
      copy: "좋아 보이는 카드를 어떻게 모으는지 경로를 나중에 발견했다는 반응이 반복됨.",
      bucket: "quick",
      roadmap: "카드 전면과 상세 뷰에 저장 진입점을 동시에 배치해 발견률을 높입니다.",
    },
    compare: {
      label: "후보 비교와 설득 장치가 약함",
      copy: "마음에 든 후보를 나란히 놓고 차이를 설명하는 흐름이 아직 분명하지 않음.",
      bucket: "next",
      roadmap: "2~4개 카드 비교 모드와 유사 스타일 차이 설명 블록을 설계합니다.",
    },
    "taxonomy-depth": {
      label: "장면/감정/구도 기준의 필터 깊이가 부족함",
      copy: "일러스트와 스토리텔링 작업자는 더 촘촘한 태그 체계를 원함.",
      bucket: "next",
      roadmap: "포즈, 감정, 카메라 앵글을 교차 탐색하는 세부 태그 체계를 확장합니다.",
    },
    combination: {
      label: "조합형 추천이 부족함",
      copy: "포즈+라이팅, 팔레트+디자인처럼 조합을 자동으로 이어주는 흐름이 더 필요함.",
      bucket: "next",
      roadmap: "디렉토리 간 연관 추천을 묶음 단위로 제안하는 조합 추천 UI를 실험합니다.",
    },
    "preset-visibility": {
      label: "프롬프트 프리셋 노출이 맥락별로 더 선명해야 함",
      copy: "AI 사용자는 좋은 기능을 확인한 뒤에도 어디에 적용되는지 한 번 더 확인하고 싶어 함.",
      bucket: "quick",
      roadmap: "프리셋이 적용되는 지점과 결과 예시를 카드 근처에 함께 보여줍니다.",
    },
    collaboration: {
      label: "팀 공유와 메모 맥락이 부족함",
      copy: "왜 이 카드를 골랐는지 누적하고 전달하는 구조가 약해서 팀 툴로는 한 단계 부족함.",
      bucket: "next",
      roadmap: "공유 가능한 보드 링크, 카드 메모, 프로젝트 태그를 포함한 협업 모드를 검토합니다.",
    },
    terminology: {
      label: "전문 용어 설명과 예시가 더 필요함",
      copy: "입문자와 비전문가가 스타일 이름을 이해하는 데 한 번 더 번역이 필요함.",
      bucket: "quick",
      roadmap: "한 줄 설명, 유사 스타일, 예시 이미지를 곁들인 설명 레이어를 추가합니다.",
    },
  };

  const roadmapQuestionPool = [
    "첫 방문 사용자는 내부 필터와 외부 검색 중 어느 흐름에서 먼저 멈추는가?",
    "상세 카드에서 저장, 프롬프트 복사, 외부 검색 중 실제 사용률이 가장 높은 액션은 무엇인가?",
    "입문자와 숙련자는 어떤 디렉토리 조합에서 가장 큰 가치 차이를 느끼는가?",
  ];

  const segments = [
    { key: "all", label: "전체" },
    { key: "design", label: "디자이너" },
    { key: "brand", label: "브랜딩" },
    { key: "illustration", label: "일러스트" },
    { key: "ai", label: "AI 작업" },
    { key: "strategy", label: "전략/팀" },
    { key: "beginner", label: "입문자" },
  ];

  const personas = [
    {
      id: "jiwoo",
      segment: "design",
      accent: "#66d7ff",
      initial: "JW",
      name: "김지우",
      role: "프로덕트 UI 디자이너 · 27세",
      context: "핀테크 랜딩 페이지와 대시보드 무드보드를 빠르게 수집해야 하는 상황",
      frequency: "주 4회",
      focus: ["디자인", "팔레트", "사진"],
      goal: "스타일 후보를 압축하고 바로 Pinterest/Behance로 확장 검색해 시안 감을 잡는 것",
      quote:
        "스타일 이름을 찾고 바로 바깥 검색으로 넘어가는 속도는 정말 빠르다. 다만 마음에 드는 카드들을 프로젝트별로 비교하는 흐름은 더 전면에 보였으면 한다.",
      highlights: [
        "디렉토리 전환이 빨라 여러 탭을 덜 열게 된다.",
        "팔레트와 UI 스타일을 연속해서 보는 흐름이 자연스럽다.",
        "외부 검색 확장 행동이 직관적이라 레퍼런스 조사 속도가 붙는다.",
      ],
      frictions: [
        "덱이나 바인더 같은 보관 기능을 상세 진입 전에는 발견하기 어려웠다.",
        "후보 3~4개를 한 화면에서 비교하는 장치가 아직 약하다.",
      ],
      asks: ["프로젝트별 보드 바로 담기", "비교 모드", "최근 본 카드"],
      scores: { discoverability: 84, speed: 94, confidence: 79, depth: 76, reuse: 71 },
      journey: { explore: 5, narrow: 5, inspect: 4, expand: 5, reuse: 3 },
      positiveThemes: ["speed", "cross-reference", "external-search"],
      negativeThemes: ["curation-visibility", "compare"],
    },
    {
      id: "minseo",
      segment: "brand",
      accent: "#ff9f7f",
      initial: "MS",
      name: "박민서",
      role: "브랜드 디자이너 · 32세",
      context: "캠페인 키비주얼과 브랜드 보드 초안을 짧은 시간 안에 잡아야 하는 프리랜서",
      frequency: "주 3회",
      focus: ["디자인", "아티스트", "팔레트"],
      goal: "분위기 키워드를 언어로 정리하고 클라이언트 설득용 무드보드를 빠르게 만드는 것",
      quote:
        "무드보드 초안 잡을 때는 좋다. 다만 스타일 이름이 익숙하지 않은 클라이언트 기준 설명이 조금만 더 있으면 설득이 쉬워질 것 같다.",
      highlights: [
        "스타일 명칭과 태그가 아이디어 회의의 출발점이 된다.",
        "브랜드 보드용 외부 검색으로 바로 넘어가기 좋다.",
        "아티스트와 디자인 레퍼런스를 오가는 폭이 넓다.",
      ],
      frictions: [
        "클라이언트와 초보 협업자에게 보여줄 때 용어 설명이 더 필요하다.",
        "유사 스타일 간 차이를 빠르게 설득하는 장치가 약하다.",
      ],
      asks: ["스타일별 한 줄 설명", "유사 스타일 추천", "프레젠테이션용 공유 링크"],
      scores: { discoverability: 77, speed: 86, confidence: 73, depth: 82, reuse: 69 },
      journey: { explore: 4, narrow: 4, inspect: 4, expand: 5, reuse: 3 },
      positiveThemes: ["breadth", "external-search", "tag-clarity"],
      negativeThemes: ["onboarding", "compare"],
    },
    {
      id: "seojun",
      segment: "illustration",
      accent: "#8cffb8",
      initial: "SJ",
      name: "이서준",
      role: "웹툰 작가 · 24세",
      context: "액션 장면의 포즈, 감정, 라이팅을 빠르게 잡아야 하는 콘티 작업자",
      frequency: "거의 매일",
      focus: ["캐릭터", "포즈", "사진"],
      goal: "캐릭터 스타일과 포즈, 조명을 함께 참고해 장면 몰입감을 높이는 것",
      quote:
        "캐릭터, 포즈, 라이팅을 오가며 찾는 흐름은 좋다. 액션 장면용으로는 구도나 감정 태그가 조금 더 촘촘하면 더 자주 쓸 것 같다.",
      highlights: [
        "캐릭터와 포즈 디렉토리를 빠르게 넘나드는 흐름이 자연스럽다.",
        "포즈 전문 링크 모음이 반복 검색 시간을 줄여 준다.",
        "사진/라이팅과 연결해 씬 무드를 잡기 좋다.",
      ],
      frictions: [
        "감정, 카메라 구도 같은 서사형 필터가 부족하다.",
        "포즈와 라이팅을 함께 좁히는 조합 탐색이 더 필요하다.",
      ],
      asks: ["감정 태그", "카메라 앵글 필터", "포즈+라이팅 추천 묶음"],
      scores: { discoverability: 75, speed: 82, confidence: 76, depth: 71, reuse: 66 },
      journey: { explore: 4, narrow: 4, inspect: 4, expand: 4, reuse: 3 },
      positiveThemes: ["cross-reference", "resource-links", "speed"],
      negativeThemes: ["taxonomy-depth", "combination"],
    },
    {
      id: "harin",
      segment: "ai",
      accent: "#c292ff",
      initial: "HR",
      name: "윤하린",
      role: "AI 이미지 메이커 · 29세",
      context: "비주얼 언어를 정리하고 생성 프롬프트까지 이어서 바로 실험해야 하는 작업자",
      frequency: "주 5회",
      focus: ["디자인", "사진", "팔레트", "아티스트"],
      goal: "레퍼런스 탐색에서 프롬프트 작성, 생성 실험까지의 전환 비용을 줄이는 것",
      quote:
        "카드 기반으로 시각 언어를 빠르게 정리하고 프롬프트까지 복사하는 흐름이 좋다. 다만 템플릿 프롬프트가 상황별로 더 많이 보였으면 바로 생산에 쓸 수 있다.",
      highlights: [
        "프롬프트 복사와 검색 확장이 연결되어 있어 생산 흐름이 짧다.",
        "짧은 키워드 조합으로 레퍼런스를 빠르게 정리할 수 있다.",
        "스타일 조사에서 생성 단계로 넘어가기 편하다.",
      ],
      frictions: [
        "프롬프트 프리셋이 어디에 적용되는지 처음엔 한 번 더 확인하게 된다.",
        "초보 생성자에게 안전한 조합 가이드가 더 있었으면 좋겠다.",
      ],
      asks: ["작업 목적별 프롬프트 템플릿", "예시 결과물", "프롬프트 강도 조절 가이드"],
      scores: { discoverability: 81, speed: 91, confidence: 84, depth: 79, reuse: 83 },
      journey: { explore: 4, narrow: 4, inspect: 4, expand: 5, reuse: 5 },
      positiveThemes: ["prompt-reuse", "external-search", "speed"],
      negativeThemes: ["preset-visibility", "onboarding"],
    },
    {
      id: "yujin",
      segment: "strategy",
      accent: "#ffd36e",
      initial: "YJ",
      name: "최유진",
      role: "크리에이티브 디렉터 · 35세",
      context: "팀 킥오프 미팅 전에 레퍼런스를 넓게 훑고 방향을 맞춰야 하는 리드",
      frequency: "주 2회",
      focus: ["디자인", "아티스트", "사진", "팔레트"],
      goal: "여러 분야의 레퍼런스를 빠르게 훑고 팀이 같은 언어로 이야기하게 만드는 것",
      quote:
        "참고 레퍼런스를 넓게 훑기엔 좋다. 그런데 팀 공유를 생각하면 왜 이 카드를 골랐는지 메모와 컬렉션 맥락이 같이 묶이면 훨씬 강해질 것 같다.",
      highlights: [
        "디렉토리 폭이 넓어 킥오프 회의 준비 속도가 빨라진다.",
        "작가, 사진, 디자인 레퍼런스를 한 제품 안에서 이어볼 수 있다.",
        "팀의 공통 언어를 맞추는 출발점으로 좋다.",
      ],
      frictions: [
        "팀 메모와 공유 맥락이 아직 약하다.",
        "선정 이유를 누적하는 구조가 약해서 큐레이션 보드로는 한 단계 부족하다.",
      ],
      asks: ["공유 가능한 보드 링크", "메모 필드", "프로젝트 태그"],
      scores: { discoverability: 74, speed: 80, confidence: 74, depth: 87, reuse: 68 },
      journey: { explore: 4, narrow: 4, inspect: 5, expand: 4, reuse: 3 },
      positiveThemes: ["breadth", "cross-reference", "team-alignment"],
      negativeThemes: ["collaboration", "curation-visibility"],
    },
    {
      id: "doyun",
      segment: "beginner",
      accent: "#5de2c5",
      initial: "DY",
      name: "한도윤",
      role: "디자인 전공 학생 · 20세",
      context: "스타일 이름을 익히고 어떤 키워드로 더 찾아가야 할지 배우는 초반 단계",
      frequency: "주 2회",
      focus: ["디자인", "팔레트", "포즈"],
      goal: "레퍼런스 사전처럼 탐색하며 스타일 감각과 검색 언어를 익히는 것",
      quote:
        "스타일 사전을 보는 느낌이라 재미있다. 그런데 처음 들어왔을 때 어디서 시작해야 할지 한 번만 더 안내해주면 훨씬 덜 헤맬 것 같다.",
      highlights: [
        "가나다/영문 정렬이 학습 흐름에 도움이 된다.",
        "카드 제목과 외부 검색 연결이 즉시 보여 부담이 적다.",
        "한글 기반 탐색으로도 방향을 잡을 수 있다.",
      ],
      frictions: [
        "내부 필터와 외부 검색 단계가 처음엔 헷갈린다.",
        "낯선 용어의 예시 이미지 설명이 더 있으면 좋겠다.",
      ],
      asks: ["첫 방문 투어", "스타일 입문 추천 세트", "용어 번역/예시"],
      scores: { discoverability: 68, speed: 74, confidence: 63, depth: 68, reuse: 58 },
      journey: { explore: 3, narrow: 3, inspect: 3, expand: 4, reuse: 2 },
      positiveThemes: ["learning-structure", "search-link", "speed"],
      negativeThemes: ["onboarding", "terminology"],
    },
  ];

  const dom = {
    themeSelect: document.getElementById("themeSelect"),
    heroMetrics: document.getElementById("heroMetrics"),
    segmentFilters: document.getElementById("segmentFilters"),
    personaCards: document.getElementById("personaCards"),
    personaSpotlight: document.getElementById("personaSpotlight"),
    scoreBars: document.getElementById("scoreBars"),
    positiveSignals: document.getElementById("positiveSignals"),
    negativeSignals: document.getElementById("negativeSignals"),
    journeyMatrix: document.getElementById("journeyMatrix"),
    roadmapColumns: document.getElementById("roadmapColumns"),
  };

  const state = {
    segment: "all",
    activePersonaId: personas[0]?.id || "",
  };

  function mean(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function personaAverage(persona) {
    return mean(Object.values(persona.scores));
  }

  function visiblePersonas() {
    return state.segment === "all" ? personas : personas.filter((persona) => persona.segment === state.segment);
  }

  function activePersona() {
    const visible = visiblePersonas();
    const found = visible.find((persona) => persona.id === state.activePersonaId);
    return found || visible[0] || personas[0];
  }

  function strongMetricFor(personaList) {
    const averages = scoreMeta.map((item) => ({
      ...item,
      average: mean(personaList.map((persona) => persona.scores[item.key])),
    }));
    return averages.sort((a, b) => b.average - a.average)[0] || scoreMeta[0];
  }

  function aggregateThemeCounts(personaList, themeKey) {
    const counts = new Map();
    personaList.forEach((persona) => {
      (persona[themeKey] || []).forEach((key) => {
        counts.set(key, (counts.get(key) || 0) + 1);
      });
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }

  function topNegativeTheme(personaList) {
    const [top] = aggregateThemeCounts(personaList, "negativeThemes");
    if (!top) return null;
    const [key, count] = top;
    return { key, count, meta: negativeThemeMeta[key] };
  }

  function cohortLabel() {
    return segments.find((item) => item.key === state.segment)?.label || "전체";
  }

  function segmentLabel(key) {
    return segments.find((item) => item.key === key)?.label || key;
  }

  function formatScore(value) {
    return Math.round(value);
  }

  function formatFit(value) {
    return `${value.toFixed(1)} / 100`;
  }

  function applyTheme(nextTheme) {
    const theme = THEMES.includes(nextTheme) ? nextTheme : "dark";
    document.body.dataset.theme = theme;
    if (dom.themeSelect) dom.themeSelect.value = theme;
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    applyTheme(savedTheme || "dark");
    if (dom.themeSelect) {
      dom.themeSelect.addEventListener("change", (event) => {
        applyTheme(event.target.value);
      });
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function renderHeroMetrics(personaList) {
    const fitAverage = mean(personaList.map(personaAverage));
    const topMetric = strongMetricFor(personaList);
    const topFriction = topNegativeTheme(personaList);
    const reuseAverage = mean(personaList.map((persona) => persona.scores.reuse));

    const metrics = [
      {
        label: "검토한 페르소나",
        value: `${personaList.length}명`,
        copy: `${cohortLabel()} 기준으로 사용 맥락을 압축해서 보여줍니다.`,
        accent: "#66d7ff",
      },
      {
        label: "평균 제품 적합도",
        value: formatFit(fitAverage),
        copy: "현재 기능만으로도 레퍼런스 탐색 허브 역할은 충분히 설득력 있다는 가설.",
        accent: "#8cffb8",
      },
      {
        label: "가장 강한 경험",
        value: topMetric ? topMetric.label : "-",
        copy: topMetric ? `${formatScore(topMetric.average)}점으로 가장 높은 항목입니다.` : "데이터가 없습니다.",
        accent: topMetric?.accent || "#ffd36e",
      },
      {
        label: "재방문 가능성",
        value: `${formatScore(reuseAverage)}점`,
        copy: topFriction
          ? `${topFriction.meta.label}이 반복되어 저장과 공유가 재사용성의 관건으로 보입니다.`
          : "반복 마찰이 아직 집계되지 않았습니다.",
        accent: "#c292ff",
      },
    ];

    dom.heroMetrics.innerHTML = metrics
      .map(
        (metric) => `
          <article class="metric-card" style="--metric-accent: ${metric.accent};">
            <div class="metric-label">${escapeHtml(metric.label)}</div>
            <div class="metric-value">${escapeHtml(metric.value)}</div>
            <div class="metric-copy">${escapeHtml(metric.copy)}</div>
          </article>
        `
      )
      .join("");
  }

  function renderFilters() {
    dom.segmentFilters.innerHTML = segments
      .map(
        (segment) => `
          <button
            type="button"
            class="segment-chip${segment.key === state.segment ? " is-active" : ""}"
            data-segment="${segment.key}"
          >
            ${escapeHtml(segment.label)}
          </button>
        `
      )
      .join("");

    dom.segmentFilters.querySelectorAll("[data-segment]").forEach((button) => {
      button.addEventListener("click", () => {
        state.segment = button.dataset.segment || "all";
        const firstVisible = visiblePersonas()[0];
        if (!visiblePersonas().some((persona) => persona.id === state.activePersonaId) && firstVisible) {
          state.activePersonaId = firstVisible.id;
        }
        render();
      });
    });
  }

  function renderPersonaCards(personaList) {
    dom.personaCards.innerHTML = personaList
      .map((persona) => {
        const fit = personaAverage(persona);
        return `
          <button
            type="button"
            class="persona-card${persona.id === state.activePersonaId ? " is-active" : ""}"
            data-persona-id="${persona.id}"
            style="--persona-accent: ${persona.accent};"
          >
            <div class="persona-top">
              <div>
                <h3 class="persona-name">${escapeHtml(persona.name)}</h3>
                <div class="persona-role">${escapeHtml(persona.role)}</div>
              </div>
              <div class="persona-initial" aria-hidden="true">${escapeHtml(persona.initial)}</div>
            </div>
            <div class="persona-meta-row">
              ${persona.focus.map((item) => `<span class="mini-tag">${escapeHtml(item)}</span>`).join("")}
            </div>
            <div class="persona-foot">
              <div>
                <div class="persona-score">${formatScore(fit)}</div>
                <div class="persona-score-label">평균 적합도</div>
              </div>
              <div class="mini-tags">
                <span class="mini-tag">${escapeHtml(persona.frequency)}</span>
                <span class="mini-tag">${escapeHtml(segmentLabel(persona.segment))}</span>
              </div>
            </div>
          </button>
        `;
      })
      .join("");

    dom.personaCards.querySelectorAll("[data-persona-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activePersonaId = button.dataset.personaId || state.activePersonaId;
        render();
      });
    });
  }

  function renderSpotlight(persona) {
    if (!persona) {
      dom.personaSpotlight.innerHTML = "";
      return;
    }

    const fit = personaAverage(persona);

    dom.personaSpotlight.style.setProperty("--spotlight-accent", persona.accent);
    dom.personaSpotlight.innerHTML = `
      <div class="spotlight-top">
        <div>
          <p class="section-kicker">active persona</p>
          <h2 class="spotlight-title">${escapeHtml(persona.name)}</h2>
          <div class="spotlight-subtitle">${escapeHtml(persona.role)}</div>
        </div>
        <div class="spotlight-initial" aria-hidden="true" style="--persona-accent: ${persona.accent};">${escapeHtml(persona.initial)}</div>
      </div>

      <p class="spotlight-copy">
        ${escapeHtml(persona.context)}
      </p>

      <div class="spotlight-tags">
        ${persona.focus.map((item) => `<span class="mini-tag">${escapeHtml(item)}</span>`).join("")}
        <span class="mini-tag">사용 빈도 ${escapeHtml(persona.frequency)}</span>
      </div>

      <div class="spotlight-quote">"${escapeHtml(persona.quote)}"</div>

      <div class="spotlight-grid">
        <article class="spotlight-stat">
          <div class="spotlight-stat-label">평균 적합도</div>
          <div class="spotlight-stat-value">${formatScore(fit)}</div>
        </article>
        <article class="spotlight-stat">
          <div class="spotlight-stat-label">핵심 목표</div>
          <div class="spotlight-copy" style="margin-top: 8px;">${escapeHtml(persona.goal)}</div>
        </article>
      </div>

      <div class="spotlight-column-wrap">
        <article class="spotlight-column">
          <div class="spotlight-column-title">좋았던 점</div>
          <ul class="spotlight-list">
            ${persona.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="spotlight-column">
          <div class="spotlight-column-title">막힌 지점</div>
          <ul class="spotlight-list">
            ${persona.frictions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="spotlight-column">
          <div class="spotlight-column-title">원하는 다음 기능</div>
          <ul class="spotlight-list">
            ${persona.asks.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
      </div>
    `;
  }

  function renderScoreBars(personaList) {
    dom.scoreBars.innerHTML = scoreMeta
      .map((item) => {
        const average = mean(personaList.map((persona) => persona.scores[item.key]));
        return `
          <article class="score-row">
            <div class="score-row-top">
              <div class="score-row-name">${escapeHtml(item.label)}</div>
              <div class="score-row-value">${formatScore(average)}</div>
            </div>
            <div class="score-track" style="--fill: ${clamp(average, 0, 100)}%; --track-accent: ${item.accent};"></div>
            <div class="score-hint">${escapeHtml(item.hint)}</div>
          </article>
        `;
      })
      .join("");
  }

  function renderSignals(personaList) {
    const positive = aggregateThemeCounts(personaList, "positiveThemes").slice(0, 5);
    const negative = aggregateThemeCounts(personaList, "negativeThemes").slice(0, 5);

    dom.positiveSignals.innerHTML = positive
      .map(([key, count]) => {
        const meta = positiveThemeMeta[key];
        const fill = (count / Math.max(personaList.length, 1)) * 100;
        return `
          <article class="signal-item">
            <div class="signal-item-top">
              <div class="signal-label">${escapeHtml(meta?.label || key)}</div>
              <div class="signal-count">${count}</div>
            </div>
            <div class="signal-track" style="--fill: ${fill}%; --track-accent: #8cffb8;"></div>
            <div class="signal-copy">${escapeHtml(meta?.copy || "")}</div>
          </article>
        `;
      })
      .join("");

    dom.negativeSignals.innerHTML = negative
      .map(([key, count]) => {
        const meta = negativeThemeMeta[key];
        const fill = (count / Math.max(personaList.length, 1)) * 100;
        return `
          <article class="signal-item">
            <div class="signal-item-top">
              <div class="signal-label">${escapeHtml(meta?.label || key)}</div>
              <div class="signal-count">${count}</div>
            </div>
            <div class="signal-track" style="--fill: ${fill}%; --track-accent: #ff9f7f;"></div>
            <div class="signal-copy">${escapeHtml(meta?.copy || "")}</div>
          </article>
        `;
      })
      .join("");
  }

  function journeyTone(value) {
    if (value >= 5) return "매우 좋음";
    if (value >= 4) return "좋음";
    if (value >= 3) return "보통";
    return "낮음";
  }

  function cellAccent(value, personaAccent) {
    const strength = 8 + value * 12;
    return `color-mix(in srgb, ${personaAccent} ${strength}%, transparent)`;
  }

  function renderJourney(personaList) {
    const head = `
      <div class="journey-head">
        <div class="journey-col">Persona</div>
        ${journeyMeta.map((item) => `<div class="journey-col">${escapeHtml(item.label)}</div>`).join("")}
      </div>
    `;

    const rows = personaList
      .map(
        (persona) => `
          <div class="journey-row">
            <div class="journey-name">
              <strong>${escapeHtml(persona.name)}</strong>
              <span>${escapeHtml(persona.role)}</span>
            </div>
            ${journeyMeta
              .map((item) => {
                const value = persona.journey[item.key];
                return `
                  <div
                    class="journey-cell"
                    data-label="${escapeHtml(item.label)}"
                    style="--cell-accent: ${cellAccent(value, persona.accent)};"
                  >
                    <div class="journey-score-wrap">
                      <div class="journey-score">${escapeHtml(String(value))}</div>
                      <div class="journey-tone">${escapeHtml(journeyTone(value))}</div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        `
      )
      .join("");

    dom.journeyMatrix.innerHTML = head + rows;
  }

  function renderRoadmap(personaList) {
    const topPains = aggregateThemeCounts(personaList, "negativeThemes");
    const quick = [];
    const next = [];

    topPains.forEach(([key]) => {
      const meta = negativeThemeMeta[key];
      if (!meta) return;
      const target = meta.bucket === "quick" ? quick : next;
      if (target.length < 3) {
        target.push(meta.roadmap);
      }
    });

    while (quick.length < 3) {
      quick.push("카드와 상세 패널의 핵심 액션 우선순위를 재정렬해 초반 학습 비용을 줄입니다.");
    }

    while (next.length < 3) {
      next.push("실제 사용 로그를 바탕으로 고빈도 조합 시나리오를 묶어서 추천하는 흐름을 검토합니다.");
    }

    const columns = [
      {
        title: "Quick Wins",
        copy: "바로 반영하면 첫 인상과 발견률을 끌어올릴 수 있는 항목",
        items: quick.slice(0, 3),
      },
      {
        title: "Next Bets",
        copy: "제품 가치를 한 단계 키우는 중기 투자 후보",
        items: next.slice(0, 3),
      },
      {
        title: "Research Questions",
        copy: "실제 인터뷰나 사용성 테스트에서 검증해야 할 질문",
        items: roadmapQuestionPool,
      },
    ];

    dom.roadmapColumns.innerHTML = columns
      .map(
        (column) => `
          <article class="roadmap-card">
            <div class="roadmap-title">${escapeHtml(column.title)}</div>
            <div class="roadmap-copy">${escapeHtml(column.copy)}</div>
            <ul class="roadmap-list">
              ${column.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>
        `
      )
      .join("");
  }

  function render() {
    const visible = visiblePersonas();
    const active = activePersona();
    renderHeroMetrics(visible);
    renderFilters();
    renderPersonaCards(visible);
    renderSpotlight(active);
    renderScoreBars(visible);
    renderSignals(visible);
    renderJourney(visible);
    renderRoadmap(visible);
  }

  initTheme();
  render();
})();
