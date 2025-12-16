/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'photo-thumbs');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fileExists(fp) {
  try {
    return fs.existsSync(fp) && fs.statSync(fp).size > 0;
  } catch {
    return false;
  }
}

async function fetchWithRetry(url, tries = 6) {
  let waitMs = 900;
  for (let attempt = 1; attempt <= tries; attempt += 1) {
    const res = await fetch(url, {
      headers: { 'user-agent': 'reference-hub/1.0 (local script)' }
    });
    if (res.ok) return res;
    if (res.status !== 429 && res.status !== 503) {
      throw new Error(`HTTP ${res.status} ${url}`);
    }
    if (attempt === tries) throw new Error(`HTTP ${res.status} ${url}`);

    const retryAfter = Number(res.headers.get('retry-after') || '');
    const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : waitMs;
    await sleep(delay);
    waitMs = Math.min(waitMs * 2, 10_000);
  }
  throw new Error(`HTTP error ${url}`);
}

async function fetchJson(url) {
  const res = await fetchWithRetry(url);
  return res.json();
}

async function download(url, dest) {
  const res = await fetchWithRetry(url);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

async function commonsImageFor(query, size = 900) {
  const q = encodeURIComponent(query);
  const apiUrl =
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*` +
    `&generator=search&gsrsearch=${q}&gsrlimit=1&gsrnamespace=6` +
    `&prop=imageinfo&iiprop=url&iiurlwidth=${size}`;
  const data = await fetchJson(apiUrl);
  const pages = data?.query?.pages || {};
  const first = Object.values(pages)[0];
  const ii = first?.imageinfo?.[0];
  const src = ii?.thumburl || ii?.url;
  if (!src) return null;
  if (!String(src).includes('/wikipedia/commons/')) return null;
  return { src, via: `commons:${first?.title || query}` };
}

async function findThumb(style) {
  const base = String(style.q || style.en || style.ko || style.id || '').trim();
  const candidates = [
    base,
    `${base} photography`,
    `${base} lighting`,
    `${base} portrait`,
    `${base} studio`
  ];

  for (const q of candidates) {
    try {
      const c = await commonsImageFor(q);
      if (c) return c;
    } catch {
      // ignore
    }
    await sleep(240);
  }
  return null;
}

function loadData() {
  global.window = global;
  require(path.join(ROOT, 'photo-data.js'));
  const styles = Array.isArray(global.PHOTO_STYLES_DATA) ? global.PHOTO_STYLES_DATA : [];
  return styles;
}

async function runOne(style) {
  const dest = path.join(OUT_DIR, `${style.id}.jpg`);
  const force = String(process.env.FORCE || '').trim() === '1';
  if (!force && fileExists(dest)) return { id: style.id, status: 'skip' };

  const found = await findThumb(style);
  if (!found) return { id: style.id, status: 'miss' };
  await download(found.src, dest);
  return { id: style.id, status: 'ok', via: found.via };
}

async function main() {
  ensureDir(OUT_DIR);
  const styles = loadData();
  if (!styles.length) {
    console.error('No PHOTO_STYLES_DATA found.');
    process.exit(1);
  }

  const concurrency = Number(process.env.CONCURRENCY || 1);
  let idx = 0;
  let ok = 0;
  let miss = 0;
  let skip = 0;
  const misses = [];

  async function worker() {
    while (idx < styles.length) {
      const i = idx;
      idx += 1;
      const s = styles[i];
      try {
        const r = await runOne(s);
        if (r.status === 'ok') ok += 1;
        else if (r.status === 'miss') { miss += 1; misses.push(s.id); console.log(`miss ${s.id}`); }
        else skip += 1;
        if ((ok + miss + skip) % 20 === 0) {
          console.log(`progress ${ok + miss + skip}/${styles.length} ok=${ok} miss=${miss} skip=${skip}`);
        }
      } catch (e) {
        miss += 1;
        misses.push(s.id);
        console.log(`miss ${s.id}: ${e?.message || e}`);
      }
      await sleep(320);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  console.log(`done total=${styles.length} ok=${ok} miss=${miss} skip=${skip}`);
  if (misses.length) {
    fs.writeFileSync(path.join(ROOT, 'tools', 'photo-thumb-misses.json'), JSON.stringify(misses, null, 2), 'utf8');
    console.log(`miss list written: tools/photo-thumb-misses.json`);
  }
  if (miss) process.exitCode = 2;
}

main();

