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
  function uniqLower(list) {
    const out = [];
    const seen = new Set();
    for (const x of list || []) {
      const v = String(x || '').trim().toLowerCase();
      if (!v || seen.has(v)) continue;
      seen.add(v);
      out.push(v);
    }
    return out;
  }

  const base = [
    { id: 'monochrome-ink', ko: '모노크롬 잉크', en: 'Monochrome Ink', colors: ['#0B0F14', '#111827', '#374151', '#E5E7EB', '#F9FAFB'], tags: ['monochrome', 'minimal', 'ink', 'editorial', 'contrast'] },
    { id: 'pastel-cream', ko: '파스텔 크림', en: 'Pastel Cream', colors: ['#FFF7ED', '#FFE4E6', '#E0F2FE', '#ECFDF5', '#EDE9FE'], tags: ['pastel', 'soft', 'airy', 'cute', 'light'] },
    { id: 'neon-night', ko: '네온 나이트', en: 'Neon Night', colors: ['#0B1020', '#22D3EE', '#A78BFA', '#F472B6', '#FDE047'], tags: ['neon', 'night', 'cyber', 'vivid', 'glow'] },
    { id: 'earthy-warm', ko: '어시 워ーム', en: 'Earthy Warm', colors: ['#3B2F2F', '#7C4A1E', '#C07F2B', '#E6D5B8', '#A7B89A'], tags: ['earthy', 'warm', 'natural', 'rustic', 'calm'] },
    { id: 'ocean-cool', ko: '오션 쿨', en: 'Ocean Cool', colors: ['#071A2A', '#0E7490', '#22C55E', '#A7F3D0', '#E0F2FE'], tags: ['cool', 'ocean', 'fresh', 'clean', 'calm'] },
    { id: 'sunset-glow', ko: '선셋 글로우', en: 'Sunset Glow', colors: ['#1F1147', '#FF5C7A', '#FF9F1C', '#FFD6A5', '#FDE68A'], tags: ['sunset', 'warm', 'gradient', 'energetic', 'glow'] },
    { id: 'forest-moss', ko: '포레스트 모스', en: 'Forest Moss', colors: ['#0B2E1A', '#14532D', '#22C55E', '#A3E635', '#F7FEE7'], tags: ['green', 'forest', 'nature', 'fresh', 'organic'] },
    { id: 'lavender-mist', ko: '라벤더 미스트', en: 'Lavender Mist', colors: ['#0F172A', '#A78BFA', '#C4B5FD', '#F5D0FE', '#F1F5F9'], tags: ['lavender', 'dreamy', 'soft', 'calm', 'pastel'] },
    { id: 'nord-like', ko: '노드 감성', en: 'Nord-like', colors: ['#2E3440', '#3B4252', '#81A1C1', '#88C0D0', '#ECEFF4'], tags: ['nord', 'cool', 'muted', 'dev', 'clean'] },
    { id: 'solarized-like', ko: '솔라라이즈드 감성', en: 'Solarized-like', colors: ['#002B36', '#268BD2', '#2AA198', '#B58900', '#FDF6E3'], tags: ['solarized', 'classic', 'code', 'muted', 'balanced'] },
    { id: 'mint-strawberry', ko: '민트&딸기', en: 'Mint & Strawberry', colors: ['#0F172A', '#34D399', '#F472B6', '#FDE68A', '#F1F5F9'], tags: ['cute', 'fresh', 'pop', 'pastel', 'fun'] },
    { id: 'coffee-cream', ko: '커피&크림', en: 'Coffee & Cream', colors: ['#2B1D0E', '#6B4423', '#CBAF85', '#F5EEE6', '#E6D5B8'], tags: ['warm', 'coffee', 'neutral', 'cozy', 'classic'] },
    { id: 'charcoal-gold', ko: '차콜&골드', en: 'Charcoal & Gold', colors: ['#0B0F14', '#111827', '#B45309', '#F59E0B', '#F9FAFB'], tags: ['luxury', 'contrast', 'dark', 'gold', 'premium'] },
    { id: 'sage-stone', ko: '세이지&스톤', en: 'Sage & Stone', colors: ['#0F172A', '#64748B', '#94A3B8', '#A7F3D0', '#ECFDF5'], tags: ['calm', 'neutral', 'sage', 'minimal', 'soft'] },
    { id: 'berry-night', ko: '베리 나이트', en: 'Berry Night', colors: ['#09090B', '#4C1D95', '#DB2777', '#F472B6', '#FAE8FF'], tags: ['night', 'berry', 'bold', 'glow', 'contrast'] },
    { id: 'desert-sand', ko: '데저트 샌드', en: 'Desert Sand', colors: ['#3F2D1C', '#9A6B3A', '#E3C29B', '#F8EDE3', '#C7D2A4'], tags: ['desert', 'earthy', 'warm', 'natural', 'soft'] },
    { id: 'ice-blue', ko: '아이스 블루', en: 'Ice Blue', colors: ['#0B1020', '#1D4ED8', '#60A5FA', '#BAE6FD', '#F0F9FF'], tags: ['cool', 'ice', 'clean', 'tech', 'fresh'] },
    { id: 'retro-70s', ko: '레트로 70s', en: 'Retro 70s', colors: ['#2F2A1E', '#A16207', '#D97706', '#FDE68A', '#84CC16'], tags: ['retro', 'warm', 'vintage', 'earthy', 'playful'] },
    { id: 'retro-80s', ko: '레트로 80s', en: 'Retro 80s', colors: ['#0B1020', '#22D3EE', '#A78BFA', '#FB7185', '#FDE047'], tags: ['retro', 'neon', '80s', 'vapor', 'bold'] },
    { id: 'retro-90s', ko: '레트로 90s', en: 'Retro 90s', colors: ['#111827', '#22C55E', '#F97316', '#FDE047', '#F9FAFB'], tags: ['90s', 'pop', 'bright', 'playful', 'bold'] }
  ];

  const themes = [
    { key: 'pastel', ko: '파스텔', en: 'Pastel', tags: ['pastel', 'soft', 'airy', 'light', 'cute'], hues: [10, 40, 120, 210, 280], s: 55, ls: [94, 88, 84, 90, 96] },
    { key: 'neon', ko: '네온', en: 'Neon', tags: ['neon', 'vivid', 'glow', 'night', 'cyber'], hues: [190, 270, 330, 55, 0], s: 92, ls: [18, 58, 58, 55, 48] },
    { key: 'muted', ko: '뮤트', en: 'Muted', tags: ['muted', 'calm', 'neutral', 'soft', 'modern'], hues: [210, 220, 30, 140, 0], s: 22, ls: [18, 34, 72, 78, 92] },
    { key: 'earth', ko: '어스', en: 'Earth', tags: ['earthy', 'warm', 'natural', 'rustic', 'organic'], hues: [22, 34, 44, 95, 0], s: 42, ls: [18, 34, 56, 70, 92] },
    { key: 'ocean', ko: '오션', en: 'Ocean', tags: ['cool', 'ocean', 'fresh', 'clean', 'calm'], hues: [205, 190, 165, 210, 0], s: 58, ls: [16, 36, 52, 86, 96] },
    { key: 'forest', ko: '포레스트', en: 'Forest', tags: ['green', 'forest', 'nature', 'fresh', 'organic'], hues: [140, 120, 95, 70, 0], s: 62, ls: [14, 26, 44, 62, 96] },
    { key: 'sunset', ko: '선셋', en: 'Sunset', tags: ['sunset', 'warm', 'gradient', 'glow', 'energetic'], hues: [260, 330, 25, 38, 52], s: 78, ls: [18, 55, 55, 74, 90] },
    { key: 'mono', ko: '모노', en: 'Mono', tags: ['monochrome', 'minimal', 'editorial', 'contrast', 'clean'], hues: [220, 220, 220, 220, 220], s: 10, ls: [8, 16, 32, 78, 96] }
  ];

  const nouns = [
    { ko: '스카이', en: 'Sky' },
    { ko: '크림', en: 'Cream' },
    { ko: '미스트', en: 'Mist' },
    { ko: '스톤', en: 'Stone' },
    { ko: '모스', en: 'Moss' },
    { ko: '라군', en: 'Lagoon' },
    { ko: '샌드', en: 'Sand' },
    { ko: '베리', en: 'Berry' },
    { ko: '오로라', en: 'Aurora' },
    { ko: '코튼', en: 'Cotton' }
  ];

  const out = [...base];
  const used = new Set(out.map((p) => p.id));
  let totalTarget = 200;

  for (const n of nouns) {
    for (let variant = 1; variant <= 5; variant += 1) {
      for (const t of themes) {
        if (out.length >= totalTarget) break;
        const id = `${t.key}-${n.en.toLowerCase()}-${variant}`;
        if (used.has(id)) continue;

        const hueShift = (variant - 3) * 8;
        const colors = t.hues.map((h, i) => hslToHex(h + hueShift, t.s, t.ls[i]));
        const ko = `${t.ko} ${n.ko} ${variant}`;
        const en = `${t.en} ${n.en} ${variant}`;
        const tags = uniqLower([...t.tags, n.en.toLowerCase()]);

        out.push({ id, ko, en, colors, tags });
        used.add(id);
      }
    }
  }

  window.PALETTES_DATA = out;
})();
