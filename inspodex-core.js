(function initInspodexCore(root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }

  root.InspodexCore = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function makeInspodexCore() {
  function tokenize(value) {
    return String(value || '').trim().split(/\s+/).filter(Boolean);
  }

  function joinTokens(tokens) {
    const out = [];
    const seen = new Set();
    const values = Array.isArray(tokens) ? tokens : [tokens];

    for (const token of values.flatMap(tokenize)) {
      const key = token.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(token);
    }

    return out.join(' ').trim();
  }

  function uniqueText(list) {
    const out = [];
    const seen = new Set();

    for (const item of list || []) {
      const value = String(item || '').trim();
      if (!value) continue;
      const key = value.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(value);
    }

    return out;
  }

  function prettifyToken(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';

    const spaced = raw.replace(/-/g, ' ');
    return spaced
      .replace(/\b[a-z]/g, (ch) => ch.toUpperCase())
      .replace(/\bUi\b/g, 'UI')
      .replace(/\bUx\b/g, 'UX')
      .replace(/\b3d\b/gi, '3D')
      .replace(/\b2d\b/gi, '2D')
      .replace(/\bY2k\b/g, 'Y2K')
      .replace(/\bSaas\b/g, 'SaaS')
      .replace(/\bRpg\b/g, 'RPG');
  }

  function escapeRegExp(value) {
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function hexToRgb(hex) {
    const normalized = String(hex || '').trim().replace('#', '');
    if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;

    const number = parseInt(normalized, 16);
    return {
      r: (number >> 16) & 255,
      g: (number >> 8) & 255,
      b: number & 255
    };
  }

  function relativeLuminance(rgb) {
    const srgb = [rgb.r, rgb.g, rgb.b].map((value) => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });

    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  function normalizePaletteColors(colors) {
    const unique = [];

    (colors || []).forEach((color) => {
      const value = String(color || '').trim().toUpperCase();
      if (!value) return;
      if (!unique.includes(value)) unique.push(value);
    });

    const scored = unique.map((hex) => {
      const rgb = hexToRgb(hex);
      const luminance = rgb ? relativeLuminance(rgb) : -1;
      return { hex, luminance };
    });

    scored.sort((left, right) => right.luminance - left.luminance);
    return scored.map((entry) => entry.hex);
  }

  function sanitizeSearchBase(value) {
    return String(value || '')
      .replace(/[\u3131-\u318E\uAC00-\uD7A3]+/g, ' ')
      .replace(/[“”‘’]/g, ' ')
      .replace(/[쨌/]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function sanitizeSearchQueryBase(value) {
    return String(value || '')
      .replace(/[\u3131-\u318E\uAC00-\uD7A3]/g, ' ')
      .replace(/[\/|]+/g, ' ')
      .replace(/[^\w\s#&()+.,'-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function styleTypeKey(style) {
    return String(style && style.type || '').trim();
  }

  function buildStyleQuery(style, { mode = 'all' } = {}) {
    const effectiveMode = mode === 'all' ? styleTypeKey(style) : String(mode || '').trim();

    if (effectiveMode === 'pose') {
      const englishName = sanitizeSearchQueryBase(style && style.en || '');
      const poseType = String(style && (style.poseType || style.id) || '').trim().split('-')[0] || '';
      const id = String(style && style.id || '').trim();
      const variantRaw = poseType && id.startsWith(`${poseType}-`) ? id.slice(poseType.length + 1) : '';
      const variant = variantRaw
        .replace(/-/g, ' ')
        .replace(/^3 4$/, 'three quarter view')
        .trim();

      return joinTokens([englishName, poseType, variant, 'pose reference']);
    }

    const raw = sanitizeSearchQueryBase(style && style.q || '');
    if (raw) return raw;

    if (effectiveMode === 'character') {
      const englishName = sanitizeSearchQueryBase(style && style.en || '');
      return joinTokens([englishName, 'character design']);
    }

    const normalizedEnglishName = sanitizeSearchQueryBase(style && style.en || '');
    if (normalizedEnglishName) return normalizedEnglishName;

    return sanitizeSearchQueryBase(String(style && style.id || '').replace(/-/g, ' '));
  }

  function searchPhrase(value) {
    return String(value || '')
      .replace(/[^\w\s#-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function referenceFocusTerms(style, limit) {
    return uniqueText([
      ...((style && style.characteristics) || []),
      ...((style && style.tags) || []).map(prettifyToken),
      ...((style && style.searchTokens) || []).map(prettifyToken)
    ])
      .map(searchPhrase)
      .filter(Boolean)
      .filter((value) => value.length >= 3)
      .slice(0, limit == null ? 3 : limit);
  }

  function quickSearchTail(mode) {
    if (mode === 'artist') return 'style reference';
    if (mode === 'character') return 'character design reference';
    if (mode === 'photo') return 'photo reference';
    if (mode === 'palette') return 'color palette reference';
    if (mode === 'pose') return 'pose reference';
    return 'design reference';
  }

  function preciseSearchTail(mode) {
    if (mode === 'artist') return 'visual language composition lighting palette reference';
    if (mode === 'character') return 'character design model sheet rendering style reference';
    if (mode === 'photo') return 'photography lighting composition color grade reference';
    if (mode === 'palette') return 'color palette swatches hex codes moodboard';
    if (mode === 'pose') return 'full body pose anatomy silhouette reference';
    return 'layout typography color composition reference';
  }

  return Object.freeze({
    tokenize,
    joinTokens,
    uniqueText,
    prettifyToken,
    escapeRegExp,
    hexToRgb,
    relativeLuminance,
    normalizePaletteColors,
    sanitizeSearchBase,
    sanitizeSearchQueryBase,
    styleTypeKey,
    buildStyleQuery,
    searchPhrase,
    referenceFocusTerms,
    quickSearchTail,
    preciseSearchTail
  });
}));
