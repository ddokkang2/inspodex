#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROMPTS_PATH = path.join(ROOT, 'data', 'thumb-prompts.json');
const OUT_PATH = path.join(ROOT, 'thumb-manifest.js');
const TYPE_ORDER = ['pose', 'palette', 'artist', 'photo', 'design', 'character'];

function readPrompts() {
  const raw = fs.readFileSync(PROMPTS_PATH, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : Array.isArray(parsed?.items) ? parsed.items : [];
}

function extFromFile(filePath) {
  const ext = path.extname(String(filePath || '')).replace(/^\./, '').trim();
  return ext || 'jpg';
}

function buildManifest(records) {
  const manifest = {};
  for (const record of records) {
    if (!record || !record.id || !record.type) continue;
    manifest[record.type] ||= {};
    manifest[record.type][record.id] = extFromFile(record.file);
  }

  const ordered = {};
  for (const type of TYPE_ORDER) {
    if (!manifest[type]) continue;
    ordered[type] = Object.fromEntries(
      Object.entries(manifest[type]).sort(([a], [b]) => a.localeCompare(b, 'en'))
    );
  }

  for (const type of Object.keys(manifest).sort()) {
    if (ordered[type]) continue;
    ordered[type] = Object.fromEntries(
      Object.entries(manifest[type]).sort(([a], [b]) => a.localeCompare(b, 'en'))
    );
  }

  return ordered;
}

function main() {
  if (!fs.existsSync(PROMPTS_PATH)) {
    throw new Error('data/thumb-prompts.json not found. Run tools/build-thumb-prompts.mjs first.');
  }

  const prompts = readPrompts();
  const manifest = buildManifest(prompts);
  const output = `window.THUMB_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`;
  fs.writeFileSync(OUT_PATH, output, 'utf8');

  const count = Object.values(manifest).reduce((sum, group) => sum + Object.keys(group).length, 0);
  console.log(`Wrote ${count} thumbnail manifest entries to ${path.relative(ROOT, OUT_PATH)}`);
}

main();
