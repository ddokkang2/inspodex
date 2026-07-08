#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REFERENCES_PATH = path.join(ROOT, 'data', 'references.json');
const MANIFEST_PATH = path.join(ROOT, 'thumb-manifest.js');
const OUT_PATH = path.join(ROOT, 'data', 'thumb-prompts.json');
const TYPE_ORDER = ['pose', 'palette', 'artist', 'photo', 'design', 'character'];
const TYPE_DIR = {
  pose: 'pose-thumbs',
  palette: 'palette-thumbs',
  artist: 'artist-thumbs',
  photo: 'photo-thumbs',
  design: 'thumbs',
  character: 'char-thumbs'
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function loadManifest() {
  const code = fs.readFileSync(MANIFEST_PATH, 'utf8');
  const sandbox = { window: {}, globalThis: {} };
  sandbox.globalThis = sandbox.window;
  vm.runInNewContext(code, sandbox, { filename: 'thumb-manifest.js' });
  return sandbox.window.THUMB_MANIFEST || {};
}

function normalizeTitle(title, id) {
  if (typeof title === 'string') return title.trim() || id;
  if (title && typeof title === 'object') {
    return String(title.ko || title.en || title.title || id).trim() || id;
  }
  return id;
}

function promptFor(item) {
  const prompt = item?.actions?.promptTemplate || item?.promptTemplate || item?.overview || item?.summary || '';
  return String(prompt).trim();
}

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).size > 10 * 1024;
  } catch {
    return false;
  }
}

function sortItems(a, b) {
  const typeDiff = TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type);
  if (typeDiff !== 0) return typeDiff;
  return normalizeTitle(a.title, a.id).localeCompare(normalizeTitle(b.title, b.id), 'ko-KR');
}

function buildRecords() {
  const references = readJson(REFERENCES_PATH);
  const items = Array.isArray(references?.items) ? references.items : Array.isArray(references) ? references : [];
  const manifest = loadManifest();

  return items
    .filter((item) => item && item.id && item.type && TYPE_ORDER.includes(item.type))
    .sort(sortItems)
    .map((item) => {
      const ext = manifest?.[item.type]?.[item.id] || 'jpg';
      const file = path.posix.join('assets', TYPE_DIR[item.type], `${item.id}.${ext}`);
      const fullPath = path.join(ROOT, file);
      return {
        id: item.id,
        type: item.type,
        title: normalizeTitle(item.title, item.id),
        file,
        exists: fileExists(fullPath),
        prompt: promptFor(item)
      };
    });
}

function main() {
  const records = buildRecords();
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(records, null, 2)}\n`, 'utf8');

  const counts = records.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  console.log(`Wrote ${records.length} thumb prompts to ${path.relative(ROOT, OUT_PATH)}`);
  console.log(TYPE_ORDER.map((type) => `${type}:${counts[type] || 0}`).join(' '));
}

main();
