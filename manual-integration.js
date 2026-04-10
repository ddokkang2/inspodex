(function initManualIntegrationLab() {
  const APP_STORAGE_PREFIXES = ['reference-hub-'];
  const SESSION_KEY = 'inspodex-manual-qa-v1';
  const STATUS_META = {
    untested: { label: '미실행', className: 'neutral' },
    pass: { label: 'Pass', className: 'pass' },
    fail: { label: 'Fail', className: 'fail' },
    blocked: { label: 'Blocked', className: 'blocked' }
  };

  const scenarios = [
    {
      id: 'design-discovery',
      title: 'Design Discovery Sprint',
      roleLabel: '브랜드 디자이너',
      toneLabel: 'Design',
      accent: '#ff8b5e',
      accent2: '#ffd166',
      launch: './index.html?dir=design',
      persona: {
        name: '민서',
        goal: '캠페인 무드 방향을 빠르게 좁히고 Pinterest 검색으로 바로 넘겨야 한다.',
        why: '검색, 카드 선택, 상세 패널, 외부 검색까지 하나의 흐름으로 이어져야 실제 리서치 속도가 유지된다.'
      },
      coverage: ['디자인 디렉토리', '스타일 검색', '상세 패널', '외부 검색'],
      steps: [
        {
          id: 'launch',
          title: '클린 디자인 세션 열기',
          action: '상단의 "이 시나리오 준비" 버튼을 눌러 앱 상태를 초기화하고 디자인 디렉토리로 다시 연다.',
          expected: [
            '디렉토리 타이틀이 Design 계열로 보인다.',
            '스타일 카드가 비어 있지 않다.',
            '외부 검색 사이트 바에 Pinterest, Google Images, Behance, Dribbble, Awwwards 계열이 노출된다.'
          ],
          hints: [
            '이 단계는 시나리오별 시작 상태를 고정하는 프리플라이트다.',
            '이전 테스트의 localStorage가 남아 있으면 결과가 흔들릴 수 있다.'
          ]
        },
        {
          id: 'search',
          title: '스타일 검색과 결과 동기화 확인',
          action: '스타일 검색창에 "Bauhaus"를 입력하고 결과 그리드가 좁혀지는지 확인한다.',
          expected: [
            '결과 수 텍스트가 즉시 갱신된다.',
            'Bauhaus 카드가 보이거나 검색 결과 상단에 남는다.',
            '빈 결과 상태가 아닌 경우 필터 상태가 현재 검색과 일치한다.'
          ],
          hints: [
            '검색 반응이 늦거나 결과 수가 갱신되지 않으면 렌더 동기화 문제로 본다.'
          ]
        },
        {
          id: 'detail',
          title: '카드 선택 후 상세 영역 연결',
          action: 'Bauhaus 카드를 클릭해 수동 검색 영역 또는 상세 패널의 검색어/프롬프트가 채워지는지 확인한다.',
          expected: [
            '선택된 스타일 라벨이 현재 카드 정보로 바뀐다.',
            '빠른 검색어 또는 정밀 검색어가 비어 있지 않다.',
            '복사 혹은 열기 액션 버튼이 함께 보인다.'
          ],
          hints: [
            '상세 패널이 열리되 내용이 비면 카드와 디테일 바인딩 문제다.'
          ]
        },
        {
          id: 'handoff',
          title: 'Pinterest 검색으로 핸드오프',
          action: '검색 사이트를 Pinterest로 맞춘 뒤 검색 버튼 또는 상세 패널의 열기 버튼을 눌러 외부 검색을 실행한다.',
          expected: [
            '새 탭 또는 팝업으로 Pinterest 검색이 열린다.',
            '검색 URL 또는 페이지 쿼리에 Bauhaus 관련 토큰이 포함된다.',
            '원래 앱 탭은 현재 상태를 유지한다.'
          ],
          hints: [
            '팝업 차단이 켜져 있으면 Blocked로 처리하고 메모를 남긴다.'
          ]
        }
      ]
    },
    {
      id: 'character-workflow',
      title: 'Character Concept Workflow',
      roleLabel: '컨셉 아티스트',
      toneLabel: 'Character',
      accent: '#8ad1ff',
      accent2: '#8affc1',
      launch: './index.html?dir=character',
      persona: {
        name: '준호',
        goal: '캐릭터 스타일을 빠르게 좁히고 프롬프트 또는 레퍼런스 검색어를 복사해 작업 툴로 가져간다.',
        why: '캐릭터 디렉토리는 검색, 추천 링크, 프롬프트 복사가 동시에 맞물려야 실제 컨셉 탐색 속도가 나온다.'
      },
      coverage: ['캐릭터 디렉토리', '추천 링크', '프롬프트/검색어 복사', 'ArtStation 검색'],
      steps: [
        {
          id: 'launch',
          title: '캐릭터 전용 세션 준비',
          action: '"이 시나리오 준비"를 눌러 캐릭터 디렉토리로 열고, 캐릭터 추천 사이트 영역이 보이는지 확인한다.',
          expected: [
            '디렉토리 버튼 또는 타이틀이 캐릭터 상태를 반영한다.',
            'DeviantArt, Sketchfab, ArtStation 추천 링크가 보인다.',
            '캐릭터 전용 탐색 흐름이 기본값으로 준비된다.'
          ],
          hints: [
            '디렉토리 전환 후 이전 모드의 quick filter가 남아 있으면 reset 누락일 수 있다.'
          ]
        },
        {
          id: 'search',
          title: 'Pixel 캐릭터 검색',
          action: '스타일 검색창에 "Pixel Art Character"를 입력해 캐릭터 카드가 좁혀지는지 본다.',
          expected: [
            '검색 결과가 Pixel 계열 카드 중심으로 필터링된다.',
            '검색 입력과 결과 수가 동기화된다.',
            '카드 그리드가 즉시 다시 렌더링된다.'
          ],
          hints: [
            '검색어는 reference-data.js에 실제로 존재하는 카드명을 사용한다.'
          ]
        },
        {
          id: 'detail-copy',
          title: '상세 패널과 복사 액션 확인',
          action: 'Pixel Art Character 카드를 클릭한 뒤 검색어 복사 또는 생성 프롬프트 복사 버튼을 눌러본다.',
          expected: [
            '현재 카드 정보가 상세 패널에 반영된다.',
            '복사 버튼 클릭 시 토스트 메시지가 보인다.',
            '클립보드 권한이 허용된 환경이라면 실제 텍스트가 복사된다.'
          ],
          hints: [
            '클립보드 권한이 막히면 Blocked로 기록하고 브라우저 정책을 메모한다.'
          ]
        },
        {
          id: 'search-handoff',
          title: 'ArtStation 검색 연결',
          action: '외부 검색 사이트를 ArtStation으로 바꾸고 검색 버튼을 눌러 캐릭터 검색이 넘어가는지 확인한다.',
          expected: [
            'ArtStation 검색으로 새 탭이 열린다.',
            '검색어에 캐릭터 관련 토큰이 유지된다.',
            '검색 사이트 전환 후에도 현재 선택 카드 정보가 유지된다.'
          ],
          hints: [
            '검색어가 비어 있으면 카드 선택과 manual search 동기화부터 다시 본다.'
          ]
        }
      ]
    },
    {
      id: 'palette-check',
      title: 'Palette Conversion Check',
      roleLabel: '브랜드 컬러 디자이너',
      toneLabel: 'Palette',
      accent: '#ffb703',
      accent2: '#ffd6a5',
      launch: './index.html?dir=palette',
      persona: {
        name: '소라',
        goal: '무드에 맞는 팔레트를 찾고 HEX 또는 검색 결과를 바로 다른 도구로 넘긴다.',
        why: '팔레트 모드는 추천 링크, 검색 프리셋, 복사 액션이 함께 동작해야 실무 전환성이 높다.'
      },
      coverage: ['팔레트 디렉토리', '팔레트 검색', 'HEX 복사', 'Coolors 검색'],
      steps: [
        {
          id: 'launch',
          title: '팔레트 전용 세션 준비',
          action: '시나리오 준비 후 팔레트 디렉토리와 컬러 추천 링크 영역이 노출되는지 확인한다.',
          expected: [
            'Coolors, Adobe Color, Color Hunt 계열 추천 링크가 보인다.',
            '팔레트 카테고리용 quick filter 또는 jump 영역이 나타난다.',
            '외부 검색 사이트에 Coolors, Adobe Color가 포함된다.'
          ],
          hints: [
            '팔레트 모드는 일반 스타일 모드와 다른 외부 사이트 구성이 핵심이다.'
          ]
        },
        {
          id: 'search',
          title: 'Luxury Black Gold 팔레트 찾기',
          action: '스타일 검색창에 "Luxury Black Gold"를 입력한다.',
          expected: [
            '해당 팔레트 카드가 결과에 남는다.',
            '검색어 반영 후 결과 수가 즉시 갱신된다.',
            '팔레트 카드가 로드된 상태로 유지된다.'
          ],
          hints: [
            '검색 결과가 0이면 오타 또는 팔레트 데이터 로드 문제를 의심한다.'
          ]
        },
        {
          id: 'copy',
          title: 'HEX 또는 팔레트 복사 확인',
          action: 'Luxury Black Gold 카드를 클릭한 뒤 HEX 팔레트 복사 또는 관련 복사 버튼을 눌러 토스트를 확인한다.',
          expected: [
            '팔레트 선택 상태가 상세 영역에 반영된다.',
            '복사 액션 실행 시 사용자 피드백이 뜬다.',
            '복사된 값은 HEX 묶음 또는 팔레트 관련 문자열이어야 한다.'
          ],
          hints: [
            '복사 버튼 위치가 카드/상세 패널 중 어디든 상관없다. 핵심은 팔레트 데이터가 복사 가능한 형태로 노출되는지다.'
          ]
        },
        {
          id: 'coolors',
          title: 'Coolors 검색 연결',
          action: '검색 사이트를 Coolors로 바꾸고 검색 버튼을 눌러 외부 도구로 넘어간다.',
          expected: [
            'Coolors 탭이 열린다.',
            '검색 쿼리에는 팔레트 또는 HEX 관련 토큰이 포함된다.',
            '원래 앱의 현재 디렉토리와 선택 상태는 유지된다.'
          ],
          hints: [
            '외부 검색이 바로 안 보이면 팝업 차단 여부를 먼저 확인한다.'
          ]
        }
      ]
    },
    {
      id: 'pose-sprint',
      title: 'Pose Reference Sprint',
      roleLabel: '스토리보드 아티스트',
      toneLabel: 'Pose',
      accent: '#9b87f5',
      accent2: '#ffa8e2',
      launch: './index.html?dir=pose',
      persona: {
        name: '태오',
        goal: '지금 필요한 포즈를 고르고 QuickPoses나 Line of Action으로 곧바로 넘긴다.',
        why: '포즈 모드는 quick filter, pose-specific query, 추천 링크가 함께 이어져야 레퍼런스 탐색 시간이 줄어든다.'
      },
      coverage: ['포즈 디렉토리', 'pose query', '추천 링크', 'QuickPoses'],
      steps: [
        {
          id: 'launch',
          title: '포즈 전용 세션 준비',
          action: '시나리오 준비 후 포즈 디렉토리에서 포즈 전용 추천 링크가 보이는지 확인한다.',
          expected: [
            'Posemaniacs, QuickPoses, Croquis Cafe 계열 링크가 보인다.',
            '포즈 타입 quick filter 또는 jump row가 나타난다.',
            '외부 검색 사이트에 QuickPoses 또는 Line of Action이 포함된다.'
          ],
          hints: [
            '포즈 모드는 일반 디자인 사이트 대신 드로잉 레퍼런스 사이트가 나와야 정상이다.'
          ]
        },
        {
          id: 'search',
          title: 'Standing 포즈 검색',
          action: '검색창에 "Standing"을 입력해 standing 계열 포즈만 남는지 본다.',
          expected: [
            'Standing 관련 포즈 카드가 결과에 남는다.',
            '검색 후 결과 수가 줄어든다.',
            '검색/필터 상태가 현재 포즈 범위와 일치한다.'
          ],
          hints: [
            'standing-3-4 같은 데이터가 실제 생성 데이터에 포함되어 있다.'
          ]
        },
        {
          id: 'detail',
          title: 'Standing · Three-quarter 검색어 확인',
          action: 'Standing · Three-quarter 카드 또는 standing-3-4 카드에 해당하는 항목을 눌러 검색어를 확인한다.',
          expected: [
            '상세 검색어에 standing, three quarter view, pose reference 계열 토큰이 포함된다.',
            '카드 선택 후 수동 검색 영역이 자동으로 갱신된다.',
            '복사 또는 열기 액션이 동작 가능한 상태가 된다.'
          ],
          hints: [
            '표기법은 한글/영문이 섞일 수 있지만 쿼리 의미는 pose reference로 유지되어야 한다.'
          ]
        },
        {
          id: 'handoff',
          title: 'QuickPoses 또는 Line of Action 핸드오프',
          action: '외부 검색 사이트를 QuickPoses 또는 Line of Action으로 맞추고 검색을 실행한다.',
          expected: [
            '선택한 포즈 사이트로 새 탭이 열린다.',
            '검색어가 포즈 레퍼런스 목적에 맞게 전달된다.',
            '현재 앱의 포즈 선택 상태는 유지된다.'
          ],
          hints: [
            '외부 사이트에 따라 URL 구조는 달라도 괜찮다. 핵심은 포즈 검색 흐름이 이어지는지다.'
          ]
        }
      ]
    },
    {
      id: 'artist-persistence',
      title: 'Artist Persistence Pass',
      roleLabel: '아트 디렉터',
      toneLabel: 'Artist',
      accent: '#58d39b',
      accent2: '#b7ffce',
      launch: './index.html?dir=artist',
      persona: {
        name: '예린',
        goal: '선호 테마와 검색 사이트를 유지한 채 작가 레퍼런스를 반복 탐색한다.',
        why: '실사용자는 앱을 여러 번 새로고침하거나 다시 방문하기 때문에 localStorage 기반 상태 복원이 깨지면 작업 흐름이 끊긴다.'
      },
      coverage: ['작가 디렉토리', '테마 저장', '사이트 저장', '새로고침 복원'],
      steps: [
        {
          id: 'launch',
          title: '작가 디렉토리 진입 확인',
          action: '시나리오 준비 후 작가 디렉토리로 열리고 Wikipedia, Letterboxd, WikiArt 계열 추천 링크가 보이는지 확인한다.',
          expected: [
            '작가 모드 추천 링크가 노출된다.',
            '디렉토리 타이틀 또는 토글이 artist 상태를 반영한다.',
            '외부 검색 사이트는 Pinterest, Google Images, Behance, ArtStation 중심으로 구성된다.'
          ],
          hints: [
            '작가 모드의 추천 링크는 다른 모드와 다르다.'
          ]
        },
        {
          id: 'search',
          title: 'Wes Anderson 탐색',
          action: '스타일 검색창에 "Wes Anderson"을 입력하고 해당 카드를 클릭한다.',
          expected: [
            'Wes Anderson 카드가 결과에 남는다.',
            '상세 패널 또는 선택 상태가 Wes Anderson 기준으로 바뀐다.',
            '검색어/프롬프트가 작가 스타일 분석 맥락으로 채워진다.'
          ],
          hints: [
            '작가 데이터는 reference-data.js의 artistGroups에 실제 존재한다.'
          ]
        },
        {
          id: 'preferences',
          title: '테마와 검색 사이트 변경',
          action: '테마를 Solarized Light로 바꾸고 외부 검색 사이트를 Behance로 전환한다.',
          expected: [
            '테마가 즉시 반영된다.',
            '검색 사이트 전환 후 현재 선택 카드 정보는 유지된다.',
            'localStorage 저장 대상 상태가 갱신된다.'
          ],
          hints: [
            '현재 테마명이 정확히 Solarized Light가 아니어도 밝은 Solarized 계열 옵션이면 된다.'
          ]
        },
        {
          id: 'refresh',
          title: '새로고침 후 상태 복원',
          action: '우측 상단의 "앱 새로고침" 버튼으로 iframe을 다시 로드하고 artist 디렉토리, 테마, 사이트 설정이 유지되는지 확인한다.',
          expected: [
            'artist 디렉토리가 그대로 유지된다.',
            '방금 바꾼 테마가 그대로 남아 있다.',
            '검색 사이트가 Behance 상태로 복원된다.'
          ],
          hints: [
            '이 단계는 localStorage 회귀를 잡기 위한 통합 시나리오다.'
          ]
        }
      ]
    }
  ];

  const dom = {
    overallOrb: document.getElementById('overallOrb'),
    overallPercent: document.getElementById('overallPercent'),
    prepareScenarioBtn: document.getElementById('prepareScenarioBtn'),
    copyReportBtn: document.getElementById('copyReportBtn'),
    scenarioIndexText: document.getElementById('scenarioIndexText'),
    scenarioStatusText: document.getElementById('scenarioStatusText'),
    stepIndexText: document.getElementById('stepIndexText'),
    stepStatusText: document.getElementById('stepStatusText'),
    coverageText: document.getElementById('coverageText'),
    scenarioTitle: document.getElementById('scenarioTitle'),
    stepTitle: document.getElementById('stepTitle'),
    scenarioRail: document.getElementById('scenarioRail'),
    stepRail: document.getElementById('stepRail'),
    personaRole: document.getElementById('personaRole'),
    scenarioTone: document.getElementById('scenarioTone'),
    personaName: document.getElementById('personaName'),
    personaGoal: document.getElementById('personaGoal'),
    personaWhy: document.getElementById('personaWhy'),
    coverageTags: document.getElementById('coverageTags'),
    stepHeading: document.getElementById('stepHeading'),
    currentStepBadge: document.getElementById('currentStepBadge'),
    stepAction: document.getElementById('stepAction'),
    stepExpected: document.getElementById('stepExpected'),
    stepHintsBlock: document.getElementById('stepHintsBlock'),
    stepHints: document.getElementById('stepHints'),
    stepNote: document.getElementById('stepNote'),
    prevStepBtn: document.getElementById('prevStepBtn'),
    nextStepBtn: document.getElementById('nextStepBtn'),
    passCount: document.getElementById('passCount'),
    failCount: document.getElementById('failCount'),
    blockedCount: document.getElementById('blockedCount'),
    scenarioProgressText: document.getElementById('scenarioProgressText'),
    overallProgressText: document.getElementById('overallProgressText'),
    targetUrlText: document.getElementById('targetUrlText'),
    restartScenarioBtn: document.getElementById('restartScenarioBtn'),
    resetProgressBtn: document.getElementById('resetProgressBtn'),
    reloadAppBtn: document.getElementById('reloadAppBtn'),
    resetAppBtn: document.getElementById('resetAppBtn'),
    openAppBtn: document.getElementById('openAppBtn'),
    targetFrame: document.getElementById('targetFrame'),
    toast: document.getElementById('toast'),
    statusButtons: Array.from(document.querySelectorAll('[data-status]'))
  };

  let toastTimer = null;
  let state = loadState();

  function loadState() {
    const fallback = { scenarioIndex: 0, stepIndex: 0, results: {}, notes: {} };

    try {
      const parsed = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object') return fallback;
      return {
        scenarioIndex: Number.isInteger(parsed.scenarioIndex) ? parsed.scenarioIndex : 0,
        stepIndex: Number.isInteger(parsed.stepIndex) ? parsed.stepIndex : 0,
        results: parsed.results && typeof parsed.results === 'object' ? parsed.results : {},
        notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {}
      };
    } catch {
      return fallback;
    }
  }

  function saveState() {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  }

  function getScenario(index = state.scenarioIndex) {
    return scenarios[Math.max(0, Math.min(index, scenarios.length - 1))];
  }

  function getStep(scenarioIndex = state.scenarioIndex, stepIndex = state.stepIndex) {
    const scenario = getScenario(scenarioIndex);
    return scenario.steps[Math.max(0, Math.min(stepIndex, scenario.steps.length - 1))];
  }

  function stepKey(scenarioId, stepId) {
    return `${scenarioId}:${stepId}`;
  }

  function statusForStep(scenarioId, stepId) {
    return state.results[stepKey(scenarioId, stepId)] || 'untested';
  }

  function counts() {
    let pass = 0;
    let fail = 0;
    let blocked = 0;
    let completed = 0;
    const total = scenarios.reduce((sum, scenario) => sum + scenario.steps.length, 0);

    scenarios.forEach((scenario) => {
      scenario.steps.forEach((step) => {
        const status = statusForStep(scenario.id, step.id);
        if (status === 'pass') pass += 1;
        if (status === 'fail') fail += 1;
        if (status === 'blocked') blocked += 1;
        if (status !== 'untested') completed += 1;
      });
    });

    return { pass, fail, blocked, completed, total };
  }

  function scenarioCounts(index = state.scenarioIndex) {
    const scenario = getScenario(index);
    let completed = 0;
    let pass = 0;
    let fail = 0;
    let blocked = 0;

    scenario.steps.forEach((step) => {
      const status = statusForStep(scenario.id, step.id);
      if (status !== 'untested') completed += 1;
      if (status === 'pass') pass += 1;
      if (status === 'fail') fail += 1;
      if (status === 'blocked') blocked += 1;
    });

    return { completed, pass, fail, blocked, total: scenario.steps.length };
  }

  function hexToRgba(hex, alpha) {
    const raw = String(hex || '').replace('#', '');
    const normalized = raw.length === 3 ? raw.split('').map((ch) => ch + ch).join('') : raw;
    const number = Number.parseInt(normalized, 16);
    const r = (number >> 16) & 255;
    const g = (number >> 8) & 255;
    const b = number & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toast.classList.remove('is-visible');
    }, 2200);
  }

  function scenarioStatusLabel(index = state.scenarioIndex) {
    const result = scenarioCounts(index);
    if (result.completed === 0) return '진행 전';
    if (result.completed < result.total) return `${result.completed} / ${result.total} 진행`;
    if (result.fail > 0) return '완료됨 · Fail 포함';
    if (result.blocked > 0) return '완료됨 · Blocked 포함';
    return '완료됨 · Pass';
  }

  function setThemeAccent(scenario) {
    document.documentElement.style.setProperty('--accent', scenario.accent);
    document.documentElement.style.setProperty('--accent-2', scenario.accent2);
    document.documentElement.style.setProperty('--accent-soft', hexToRgba(scenario.accent, 0.18));
  }

  function isLastUnit() {
    return state.scenarioIndex === scenarios.length - 1
      && state.stepIndex === getScenario().steps.length - 1;
  }

  function renderRails() {
    const currentScenario = getScenario();
    const currentStep = getStep();

    dom.scenarioRail.innerHTML = '';
    scenarios.forEach((scenario, index) => {
      const result = scenarioCounts(index);
      const dot = document.createElement('div');
      dot.className = 'rail-dot';
      dot.textContent = String(index + 1).padStart(2, '0');
      dot.title = `${scenario.title} · ${scenarioStatusLabel(index)}`;

      if (index === state.scenarioIndex) dot.classList.add('is-current');
      if (result.completed === result.total && result.fail === 0 && result.blocked === 0) dot.classList.add('is-done');
      if (result.fail > 0) dot.classList.add('is-fail');
      else if (result.blocked > 0) dot.classList.add('is-blocked');

      dom.scenarioRail.appendChild(dot);
    });

    dom.stepRail.innerHTML = '';
    currentScenario.steps.forEach((step, index) => {
      const status = statusForStep(currentScenario.id, step.id);
      const dot = document.createElement('div');
      dot.className = 'rail-dot';
      dot.textContent = String(index + 1);
      dot.title = `${step.title} · ${STATUS_META[status].label}`;

      if (index === state.stepIndex) dot.classList.add('is-current');
      if (status === 'pass') dot.classList.add('is-done');
      if (status === 'fail') dot.classList.add('is-fail');
      if (status === 'blocked') dot.classList.add('is-blocked');

      dom.stepRail.appendChild(dot);
    });

    dom.scenarioTitle.textContent = currentScenario.title;
    dom.stepTitle.textContent = currentStep.title;
  }

  function render() {
    const scenario = getScenario();
    const step = getStep();
    const scenarioResult = scenarioCounts();
    const totalResult = counts();
    const currentStatus = statusForStep(scenario.id, step.id);
    const completionPercent = Math.round((totalResult.completed / Math.max(1, totalResult.total)) * 100);

    setThemeAccent(scenario);
    dom.overallOrb.style.setProperty('--progress', String(completionPercent));
    dom.overallPercent.textContent = `${completionPercent}%`;

    dom.scenarioIndexText.textContent = `${state.scenarioIndex + 1} / ${scenarios.length}`;
    dom.scenarioStatusText.textContent = scenarioStatusLabel();
    dom.stepIndexText.textContent = `${state.stepIndex + 1} / ${scenario.steps.length}`;
    dom.stepStatusText.textContent = STATUS_META[currentStatus].label;
    dom.coverageText.textContent = scenario.coverage.join(', ');

    dom.personaRole.textContent = scenario.roleLabel;
    dom.scenarioTone.textContent = scenario.toneLabel;
    dom.personaName.textContent = scenario.persona.name;
    dom.personaGoal.textContent = scenario.persona.goal;
    dom.personaWhy.textContent = scenario.persona.why;

    dom.coverageTags.innerHTML = '';
    scenario.coverage.forEach((item) => {
      const tag = document.createElement('span');
      tag.className = 'coverage-tag';
      tag.textContent = item;
      dom.coverageTags.appendChild(tag);
    });

    dom.stepHeading.textContent = step.title;
    dom.currentStepBadge.textContent = `Step ${state.stepIndex + 1}`;
    dom.stepAction.textContent = step.action;

    dom.stepExpected.innerHTML = '';
    step.expected.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      dom.stepExpected.appendChild(li);
    });

    dom.stepHints.innerHTML = '';
    const hints = Array.isArray(step.hints) ? step.hints.filter(Boolean) : [];
    dom.stepHintsBlock.hidden = hints.length === 0;
    hints.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      dom.stepHints.appendChild(li);
    });

    dom.stepNote.value = state.notes[stepKey(scenario.id, step.id)] || '';

    dom.statusButtons.forEach((button) => {
      const isActive = button.dataset.status === currentStatus;
      button.classList.toggle('is-active', isActive);
    });

    dom.passCount.textContent = `Pass ${totalResult.pass}`;
    dom.failCount.textContent = `Fail ${totalResult.fail}`;
    dom.blockedCount.textContent = `Blocked ${totalResult.blocked}`;
    dom.scenarioProgressText.textContent = `${scenarioResult.completed} / ${scenarioResult.total} 완료`;
    dom.overallProgressText.textContent = `${totalResult.completed} / ${totalResult.total} 단계 완료`;
    dom.targetUrlText.textContent = scenario.launch;

    dom.prevStepBtn.disabled = state.scenarioIndex === 0 && state.stepIndex === 0;
    dom.nextStepBtn.textContent = isLastUnit() ? '완료 상태 확인' : '다음 단계';

    renderRails();
  }

  function moveStep(delta) {
    let scenarioIndex = state.scenarioIndex;
    let stepIndex = state.stepIndex + delta;

    while (stepIndex < 0 && scenarioIndex > 0) {
      scenarioIndex -= 1;
      stepIndex += getScenario(scenarioIndex).steps.length;
    }

    while (stepIndex >= getScenario(scenarioIndex).steps.length && scenarioIndex < scenarios.length - 1) {
      stepIndex -= getScenario(scenarioIndex).steps.length;
      scenarioIndex += 1;
    }

    if (stepIndex < 0) {
      scenarioIndex = 0;
      stepIndex = 0;
    }

    if (scenarioIndex === scenarios.length - 1 && stepIndex >= getScenario(scenarioIndex).steps.length) {
      stepIndex = getScenario(scenarioIndex).steps.length - 1;
    }

    state.scenarioIndex = scenarioIndex;
    state.stepIndex = stepIndex;
    saveState();
    render();
  }

  function markStatus(status) {
    const scenario = getScenario();
    const step = getStep();
    state.results[stepKey(scenario.id, step.id)] = status;
    saveState();
    render();

    if (status === 'pass' && !isLastUnit()) {
      moveStep(1);
    }

    if (status === 'pass' && isLastUnit()) {
      showToast('모든 단계를 완료했습니다. 리포트를 복사해 공유하세요.');
    }
  }

  function clearAppStorage() {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key) keys.push(key);
    }

    keys
      .filter((key) => APP_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix)))
      .forEach((key) => window.localStorage.removeItem(key));

    showToast('Inspodex 앱 상태를 초기화했습니다.');
  }

  function loadScenarioIntoFrame({ resetState = false, bump = true } = {}) {
    if (resetState) clearAppStorage();
    const scenario = getScenario();
    const url = new URL(scenario.launch, window.location.href);
    if (bump) url.searchParams.set('qa_ts', String(Date.now()));
    dom.targetFrame.src = url.toString();
    dom.targetUrlText.textContent = scenario.launch;
  }

  function reloadFrame() {
    try {
      dom.targetFrame.contentWindow.location.reload();
    } catch {
      loadScenarioIntoFrame({ resetState: false, bump: true });
    }
  }

  function resetScenarioProgress() {
    const scenario = getScenario();
    scenario.steps.forEach((step) => {
      delete state.results[stepKey(scenario.id, step.id)];
      delete state.notes[stepKey(scenario.id, step.id)];
    });
    state.stepIndex = 0;
    saveState();
    render();
    showToast('현재 시나리오 진행도를 초기화했습니다.');
  }

  function resetAllProgress() {
    state = { scenarioIndex: 0, stepIndex: 0, results: {}, notes: {} };
    saveState();
    render();
    showToast('전체 QA 진행도를 초기화했습니다.');
  }

  function buildReport() {
    const reportLines = [];
    const totalResult = counts();
    const now = new Date().toLocaleString('ko-KR', { hour12: false });

    reportLines.push('# Inspodex Manual Integration Report');
    reportLines.push(`Generated: ${now}`);
    reportLines.push(`Progress: ${totalResult.completed}/${totalResult.total}`);
    reportLines.push(`Pass: ${totalResult.pass}`);
    reportLines.push(`Fail: ${totalResult.fail}`);
    reportLines.push(`Blocked: ${totalResult.blocked}`);
    reportLines.push('');

    scenarios.forEach((scenario, scenarioIndex) => {
      reportLines.push(`## ${String(scenarioIndex + 1).padStart(2, '0')}. ${scenario.title}`);
      scenario.steps.forEach((step, stepIndex) => {
        const key = stepKey(scenario.id, step.id);
        const status = statusForStep(scenario.id, step.id);
        const note = String(state.notes[key] || '').trim();
        reportLines.push(`- [${STATUS_META[status].label}] ${String(stepIndex + 1).padStart(2, '0')}. ${step.title}`);
        if (note) reportLines.push(`  note: ${note}`);
      });
      reportLines.push('');
    });

    return reportLines.join('\n').trim();
  }

  async function copyReport() {
    const text = buildReport();
    try {
      await navigator.clipboard.writeText(text);
      showToast('리포트를 클립보드에 복사했습니다.');
    } catch {
      showToast('리포트 복사에 실패했습니다. 브라우저 권한을 확인하세요.');
    }
  }

  function openCurrentScenarioInNewTab() {
    const url = new URL(getScenario().launch, window.location.href);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  }

  function bindEvents() {
    dom.prepareScenarioBtn.addEventListener('click', () => loadScenarioIntoFrame({ resetState: true, bump: true }));
    dom.copyReportBtn.addEventListener('click', copyReport);
    dom.prevStepBtn.addEventListener('click', () => moveStep(-1));
    dom.nextStepBtn.addEventListener('click', () => {
      if (!isLastUnit()) moveStep(1);
      else showToast('마지막 단계입니다. 리포트를 복사해 공유하세요.');
    });
    dom.reloadAppBtn.addEventListener('click', reloadFrame);
    dom.resetAppBtn.addEventListener('click', () => {
      clearAppStorage();
      loadScenarioIntoFrame({ resetState: false, bump: true });
    });
    dom.openAppBtn.addEventListener('click', openCurrentScenarioInNewTab);
    dom.restartScenarioBtn.addEventListener('click', resetScenarioProgress);
    dom.resetProgressBtn.addEventListener('click', resetAllProgress);

    dom.statusButtons.forEach((button) => {
      button.addEventListener('click', () => markStatus(button.dataset.status));
    });

    dom.stepNote.addEventListener('input', (event) => {
      const scenario = getScenario();
      const step = getStep();
      state.notes[stepKey(scenario.id, step.id)] = event.target.value;
      saveState();
    });
  }

  bindEvents();
  render();
  loadScenarioIntoFrame({ resetState: false, bump: false });
}());
