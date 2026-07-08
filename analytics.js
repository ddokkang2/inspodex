(function initInspodexMetrics(root) {
  const STORE_KEY = 'inspodex-metrics-v1';
  const VISITS_KEY = 'inspodex-metrics-visits-v1';
  const MAX_EVENTS = 800;

  function readJson(key, fallback) {
    try {
      const raw = root.localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      root.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — metrics stay best-effort */
    }
  }

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function recordVisitDay() {
    const days = readJson(VISITS_KEY, []);
    const today = todayKey();
    if (!days.includes(today)) {
      days.push(today);
      writeJson(VISITS_KEY, days.slice(-120));
    }
    return days;
  }

  function track(event, props = {}) {
    if (!event) return;
    const events = readJson(STORE_KEY, []);
    events.push({ t: Date.now(), e: String(event), p: props || {} });
    writeJson(STORE_KEY, events.slice(-MAX_EVENTS));
    try {
      if (root.INSPODEX_METRICS_ENDPOINT && root.navigator?.sendBeacon) {
        root.navigator.sendBeacon(
          root.INSPODEX_METRICS_ENDPOINT,
          JSON.stringify({ e: String(event), p: props || {}, t: Date.now() })
        );
      }
    } catch { /* beacon is optional */ }
  }

  function summary() {
    const events = readJson(STORE_KEY, []);
    const byEvent = {};
    events.forEach((item) => { byEvent[item.e] = (byEvent[item.e] || 0) + 1; });
    const days = readJson(VISITS_KEY, []);
    const now = Date.now();
    const last7 = days.filter((day) => now - new Date(`${day}T00:00:00`).getTime() <= 7 * 864e5);
    return {
      totalEvents: events.length,
      byEvent,
      visitDays: days.length,
      visitDaysLast7: last7.length,
      firstEventAt: events[0]?.t || null,
      lastEventAt: events[events.length - 1]?.t || null,
      // 보고서 0단계 핵심 지표
      boardsCreated: byEvent.board_create || 0,
      cardsSaved: byEvent.board_save || 0,
      exportPacks: byEvent.export_pack || 0,
      externalSearches: byEvent.external_search || 0
    };
  }

  function exportJson() {
    const payload = {
      exportedAt: new Date().toISOString(),
      summary: summary(),
      events: readJson(STORE_KEY, []),
      visitDays: readJson(VISITS_KEY, [])
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = root.document.createElement('a');
    a.href = url;
    a.download = `inspodex-metrics-${todayKey()}.json`;
    root.document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function reset() {
    try {
      root.localStorage.removeItem(STORE_KEY);
      root.localStorage.removeItem(VISITS_KEY);
    } catch { /* ignore */ }
  }

  function feedback() {
    const text = root.prompt('Inspodex에 전하고 싶은 피드백을 적어주세요.\n(로컬 지표와 함께 메일 초안이 열립니다)');
    if (!text || !text.trim()) return;
    track('feedback', { text: text.trim().slice(0, 500) });
    const s = summary();
    const body = encodeURIComponent(
      `${text.trim()}\n\n---\n사용 요약(자동): 방문일수 ${s.visitDays}, 보드 ${s.boardsCreated}, 저장 ${s.cardsSaved}, Export ${s.exportPacks}, 외부검색 ${s.externalSearches}`
    );
    root.location.href = `mailto:ddokkang@gmail.com?subject=${encodeURIComponent('[Inspodex] 사용자 피드백')}&body=${body}`;
  }

  function bind() {
    const link = root.document.getElementById('feedbackLink');
    if (link) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        feedback();
      });
    }
  }

  recordVisitDay();
  if (root.document) {
    if (root.document.readyState === 'loading') {
      root.document.addEventListener('DOMContentLoaded', bind);
    } else {
      bind();
    }
  }

  root.InspodexMetrics = { track, summary, exportJson, reset, feedback };
}(typeof window !== 'undefined' ? window : globalThis));
