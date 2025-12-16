/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function hashToHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}

function svgThumb({ id, ko, en }) {
  const hue = hashToHue(id);
  const hue2 = (hue + 42) % 360;
  const bg1 = `hsl(${hue} 75% 52%)`;
  const bg2 = `hsl(${hue2} 78% 46%)`;
  const ring = `hsl(${(hue + 180) % 360} 92% 72% / 0.55)`;
  const label = (ko || en || id).toString().slice(0, 28);
  const sub = (en || '').toString().slice(0, 32);

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
    <text x="60" y="695" fill="#fff" font-size="34" font-weight="800" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">
      ${escapeXml(label)}
    </text>
    <text x="60" y="735" fill="rgba(255,255,255,0.86)" font-size="22" font-weight="600" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">
      ${escapeXml(sub)}
    </text>
    <text x="60" y="815" fill="rgba(255,255,255,0.70)" font-size="18" font-weight="500" font-family="Noto Sans KR, system-ui, -apple-system, sans-serif">
      ${escapeXml(id)}
    </text>
  </g>
</svg>`;
}

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function loadCharactersData() {
  const root = path.join(__dirname, '..');
  global.window = global;
  // eslint-disable-next-line import/no-dynamic-require, global-require
  require(path.join(root, 'characters-data.js'));
  const styles = Array.isArray(global.CHAR_STYLES_DATA) ? global.CHAR_STYLES_DATA : [];
  return styles;
}

function main() {
  const root = path.join(__dirname, '..');
  const outDir = path.join(root, 'assets', 'char-thumbs');
  ensureDir(outDir);

  const styles = loadCharactersData();
  if (!styles.length) {
    console.error('No CHAR_STYLES_DATA found.');
    process.exit(1);
  }

  let wrote = 0;
  for (const s of styles) {
    const fp = path.join(outDir, `${s.id}.svg`);
    fs.writeFileSync(fp, svgThumb(s), 'utf8');
    wrote += 1;
  }

  console.log(`Generated ${wrote} SVG thumbnails in ${outDir}`);
}

main();
