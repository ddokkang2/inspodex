import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

global.window = global;
require(path.join(__dirname, '..', 'styles-data.js'));

const styles = Array.isArray(global.STYLES_DATA) ? global.STYLES_DATA : [];
const outDir = path.join(__dirname, '..', 'assets', 'thumbs');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'reference-hub/1.0 (thumb fetcher)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json();
}

async function getWikipediaThumbUrl(title) {
  const base = 'https://en.wikipedia.org/w/api.php';
  const q = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    prop: 'pageimages',
    piprop: 'thumbnail',
    pithumbsize: '900',
    titles: title
  });
  const data = await fetchJson(`${base}?${q.toString()}`);
  const pages = data?.query?.pages || {};
  const first = Object.values(pages)[0];
  return first?.thumbnail?.source || '';
}

async function opensearchTitle(query) {
  const base = 'https://en.wikipedia.org/w/api.php';
  const q = new URLSearchParams({
    action: 'opensearch',
    format: 'json',
    origin: '*',
    limit: '1',
    search: query
  });
  const data = await fetchJson(`${base}?${q.toString()}`);
  const hit = Array.isArray(data) ? data[1]?.[0] : '';
  return hit || '';
}

async function getCommonsThumbUrl(query) {
  const base = 'https://commons.wikimedia.org/w/api.php';
  const q = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrsearch: query,
    gsrnamespace: '6',
    gsrlimit: '1',
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: '900'
  });
  const data = await fetchJson(`${base}?${q.toString()}`);
  const pages = data?.query?.pages || {};
  const first = Object.values(pages)[0];
  const info = first?.imageinfo?.[0];
  return info?.thumburl || info?.url || '';
}

async function download(url, destBase) {
  const res = await fetch(url, { headers: { 'user-agent': 'reference-hub/1.0 (thumb fetcher)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  const extFromCt = ct.includes('png') ? '.png' : ct.includes('jpeg') || ct.includes('jpg') ? '.jpg' : '';
  const extFromUrl = url.toLowerCase().includes('.png') ? '.png' : url.toLowerCase().includes('.jpg') || url.toLowerCase().includes('.jpeg') ? '.jpg' : '';
  const ext = extFromCt || extFromUrl || '.jpg';
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = `${destBase}${ext}`;
  fs.writeFileSync(dest, buf);
  return path.basename(dest);
}

async function main() {
  const missing = styles.filter((s) => {
    const jpg = path.join(outDir, `${s.id}.jpg`);
    const png = path.join(outDir, `${s.id}.png`);
    return !fs.existsSync(jpg) && !fs.existsSync(png);
  });

  let ok = 0;
  let fail = 0;

  for (const s of missing) {
    const query = String(s.en || s.id || '').trim();
    if (!query) continue;
    try {
      let url = await getWikipediaThumbUrl(query);
      if (!url) {
        const title = await opensearchTitle(query);
        if (title) url = await getWikipediaThumbUrl(title);
      }
      if (!url) {
        url = await getCommonsThumbUrl(query);
      }
      if (!url) throw new Error('no thumbnail found');
      await download(url, path.join(outDir, s.id));
      ok += 1;
    } catch {
      fail += 1;
    }
    await sleep(250);
  }

  console.log(`done: downloaded=${ok}, failed=${fail}, totalMissing=${missing.length}`);
}

await main();
