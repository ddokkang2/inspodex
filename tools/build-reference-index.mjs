#!/usr/bin/env node
/**
 * tools/build-reference-index.mjs
 *
 * 빌드 타임 데이터 파이프라인 (RENEWAL_DIRECTION 6장 / 분석 보고서 1단계).
 *
 * script.js의 런타임 enrichStyle() 휴리스틱을 Node에서 1회 실행해 결과를 정적
 * 데이터로 "굽는다". 산출물:
 *
 *   - data/references.json      : 공통 ReferenceItem 스키마의 전체 카탈로그
 *                                 (사람이 검수/수정하는 원본. promptTemplate 포함)
 *   - data/references-index.js  : 런타임 오버레이 (window.REFERENCE_INDEX)
 *                                 script.js가 로드 시 런타임 추론 대신 사용
 *
 * 사용: npm run bake  (또는 node tools/build-reference-index.mjs)
 *
 * 원리: 데이터 파일과 script.js를 vm 샌드박스(브라우저 스텁)에서 로드한 뒤,
 * script.js가 노출하는 __INSPODEX_BAKE__ 훅으로 단일 소스 오브 트루스인
 * enrichStyle을 그대로 재사용한다. (중복 구현 없음)
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'data');

// ---------------------------------------------------------------------------
// 1. 브라우저 스텁 샌드박스
// ---------------------------------------------------------------------------

function makeStubElement() {
  const el = {
    style: {},
    dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    children: [],
    setAttribute() {},
    getAttribute: () => null,
    removeAttribute() {},
    appendChild(child) { return child; },
    prepend() {},
    append() {},
    remove() {},
    addEventListener() {},
    removeEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    closest: () => null,
    focus() {},
    click() {},
    insertBefore(child) { return child; },
    contains: () => false,
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 0, height: 0 })
  };
  Object.defineProperty(el, 'innerHTML', { get: () => '', set() {}, configurable: true });
  Object.defineProperty(el, 'textContent', { get: () => '', set() {}, configurable: true });
  return el;
}

function makeSandbox() {
  const storage = new Map();
  const localStorage = {
    getItem: (k) => (storage.has(k) ? storage.get(k) : null),
    setItem: (k, v) => storage.set(k, String(v)),
    removeItem: (k) => storage.delete(k),
    clear: () => storage.clear()
  };
  const documentStub = {
    readyState: 'loading',
    body: makeStubElement(),
    documentElement: makeStubElement(),
    head: makeStubElement(),
    addEventListener() {},
    removeEventListener() {},
    createElement: () => makeStubElement(),
    createElementNS: () => makeStubElement(),
    createTextNode: () => ({}),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => []
  };
  const sandbox = {
    console,
    setTimeout, clearTimeout, setInterval, clearInterval,
    URL, URLSearchParams, TextEncoder, TextDecoder,
    Date, Math, JSON, Intl,
    localStorage,
    sessionStorage: localStorage,
    document: documentStub,
    navigator: { userAgent: 'inspodex-bake', language: 'ko-KR', clipboard: {} },
    location: { href: 'https://inspodex.vercel.app/app.html', search: '', hash: '', pathname: '/app.html' },
    history: { replaceState() {}, pushState() {} },
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }),
    requestAnimationFrame: (fn) => setTimeout(fn, 0),
    cancelAnimationFrame: clearTimeout,
    IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
    ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
    MutationObserver: class { observe() {} disconnect() {} },
    CSS: { escape: (v) => String(v).replace(/[^a-zA-Z0-9_-]/g, (ch) => `\\${ch}`) },
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
    scrollTo() {},
    open() {},
    alert() {}, confirm: () => false, prompt: () => null,
    addEventListener() {}, removeEventListener() {},
    innerWidth: 1440, innerHeight: 900,
    devicePixelRatio: 1
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  return vm.createContext(sandbox);
}

function loadScript(context, relPath) {
  const file = path.join(ROOT, relPath);
  const code = fs.readFileSync(file, 'utf8');
  vm.runInContext(code, context, { filename: relPath });
}

// ---------------------------------------------------------------------------
// 2. 관련 항목(relatedIds) 계산 — 동일 타입 + 교차 타입
// ---------------------------------------------------------------------------

function tokenSet(item) {
  return new Set(
    [
      ...(item.tags || []),
      ...(item.moods || []),
      ...(item.useCases || []),
      ...(item.searchTokens || [])
    ].map((v) => String(v).toLowerCase().trim()).filter(Boolean)
  );
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const v of a) if (b.has(v)) inter += 1;
  return inter / (a.size + b.size - inter);
}

function computeRelated(all) {
  const sets = new Map(all.map((item) => [item.id, tokenSet(item)]));
  return (base, { sameLimit = 6, crossPerType = 2 } = {}) => {
    const baseSet = sets.get(base.id);
    const same = [];
    const crossByType = new Map();
    for (const candidate of all) {
      if (candidate.id === base.id) continue;
      const score = jaccard(baseSet, sets.get(candidate.id));
      if (score <= 0) continue;
      if (candidate.type === base.type) {
        same.push({ id: candidate.id, score });
      } else {
        const list = crossByType.get(candidate.type) || [];
        list.push({ id: candidate.id, score });
        crossByType.set(candidate.type, list);
      }
    }
    same.sort((a, b) => b.score - a.score);
    const related = same.slice(0, sameLimit).map((entry) => entry.id);
    for (const list of crossByType.values()) {
      list.sort((a, b) => b.score - a.score);
      list.slice(0, crossPerType).forEach((entry) => related.push(entry.id));
    }
    return related;
  };
}

// ---------------------------------------------------------------------------
// 3. 실행
// ---------------------------------------------------------------------------

const context = makeSandbox();

[
  'reference-ko-map.js',
  'reference-data.js',
  'palettes-data.js',
  'poses-data.js',
  'thumb-manifest.js',
  'inspodex-core.js',
  'script.js'
].forEach((file) => loadScript(context, file));

const bake = vm.runInContext('window.__INSPODEX_BAKE__', context);
if (!bake || typeof bake.enrichStyle !== 'function') {
  console.error('script.js가 __INSPODEX_BAKE__ 훅을 노출하지 않습니다. script.js 하단의 훅 정의를 확인하세요.');
  process.exit(1);
}

const modes = bake.DATA_DIRECTORY_MODES;
const enriched = [];
for (const mode of modes) {
  const raw = bake.sourceDataForDirectory(mode) || [];
  raw.forEach((item, index) => {
    try {
      enriched.push(bake.enrichStyle(item, mode, index));
    } catch (error) {
      console.warn(`[skip] ${mode}/${item?.id || index}: ${error.message}`);
    }
  });
}

const relatedFor = computeRelated(enriched);

const references = enriched.map((item) => {
  let promptTemplate = '';
  try {
    promptTemplate = bake.buildPromptBundle(item)?.generate || '';
  } catch { /* prompt derivation is best-effort */ }
  return {
    id: item.id,
    type: item.type,
    title: { ko: item.ko || item.en || item.id, en: item.en || item.ko || item.id },
    aliases: item.aliases || [],
    summary: String(item.overview || '').split('\n').filter(Boolean)[0] || '',
    overview: item.overview || '',
    tags: item.tags || [],
    characteristics: item.characteristics || [],
    searchTokens: item.searchTokens || [],
    moods: item.moods || [],
    useCases: item.useCases || [],
    eras: item.eras || [],
    regions: item.regions || [],
    media: item.media || [],
    figures: item.figures || [],
    sourceLinks: item.sourceLinks || [],
    colors: Array.isArray(item.colors) ? item.colors : undefined,
    poseType: item.poseType || undefined,
    relatedIds: relatedFor(item),
    actions: {
      searchQuery: item.q || '',
      promptTemplate
    }
  };
});

fs.mkdirSync(OUT_DIR, { recursive: true });

fs.writeFileSync(
  path.join(OUT_DIR, 'references.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), count: references.length, items: references }, null, 2)
);

// 런타임 오버레이: script.js의 enrichStyle이 런타임 추론 대신 사용하는 필드만 담는다.
const overlay = {};
for (const ref of references) {
  overlay[ref.id] = {
    aliases: ref.aliases,
    searchTokens: ref.searchTokens,
    moods: ref.moods,
    useCases: ref.useCases,
    eras: ref.eras,
    regions: ref.regions,
    media: ref.media,
    overview: ref.overview,
    relatedIds: ref.relatedIds,
    promptTemplate: ref.actions.promptTemplate
  };
}

fs.writeFileSync(
  path.join(OUT_DIR, 'references-index.js'),
  `// 자동 생성 파일 — 직접 수정하지 말고 data/references.json을 수정한 뒤 npm run bake 실행\n`
  + `window.REFERENCE_INDEX = ${JSON.stringify(overlay)};\n`
);

const byType = {};
references.forEach((ref) => { byType[ref.type] = (byType[ref.type] || 0) + 1; });
console.log(`baked ${references.length} references → data/references.json, data/references-index.js`);
console.log(Object.entries(byType).map(([type, count]) => `${type}: ${count}`).join(', '));
