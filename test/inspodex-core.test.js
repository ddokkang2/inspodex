const test = require('node:test');
const assert = require('node:assert/strict');

const core = require('../inspodex-core.js');

test('joinTokens deduplicates tokens case-insensitively', () => {
  assert.equal(
    core.joinTokens([' UI kit ', 'ui', 'design system', 'Design']),
    'UI kit design system'
  );
});

test('prettifyToken keeps known acronyms readable', () => {
  assert.equal(core.prettifyToken('ui'), 'UI');
  assert.equal(core.prettifyToken('saas'), 'SaaS');
  assert.equal(core.prettifyToken('3d-render'), '3D Render');
});

test('normalizePaletteColors uppercases, deduplicates, and sorts by luminance', () => {
  assert.deepEqual(
    core.normalizePaletteColors(['#000000', '#ffffff', '#7f7f7f', '#FFFFFF', 'bad']),
    ['#FFFFFF', '#7F7F7F', '#000000', 'BAD']
  );
});

test('sanitizeSearchBase removes Hangul and smart quotes', () => {
  assert.equal(
    core.sanitizeSearchBase('감성 “editorial” / poster'),
    'editorial poster'
  );
});

test('sanitizeSearchQueryBase keeps query-safe punctuation and strips unsupported text', () => {
  assert.equal(
    core.sanitizeSearchQueryBase('감성 portrait / lighting | test? #1'),
    'portrait lighting test #1'
  );
});

test('buildStyleQuery prefers explicit q when present', () => {
  assert.equal(
    core.buildStyleQuery({ q: '감성 editorial / poster' }, { mode: 'design' }),
    'editorial poster'
  );
});

test('buildStyleQuery falls back to character naming when q is missing', () => {
  assert.equal(
    core.buildStyleQuery({ en: 'Cyber Monk' }, { mode: 'character' }),
    'Cyber Monk character design'
  );
});

test('buildStyleQuery expands pose ids into searchable queries', () => {
  const query = core.buildStyleQuery(
    { id: 'standing-3-4', en: 'Standing · Three-quarter', poseType: 'standing' },
    { mode: 'pose' }
  );

  assert.match(query, /three quarter view pose reference$/i);
  assert.match(query, /\bstanding\b/i);
});

test('referenceFocusTerms merges characteristics, tags, and search tokens', () => {
  assert.deepEqual(
    core.referenceFocusTerms({
      characteristics: ['Soft lighting', 'soft lighting'],
      tags: ['ui', '3d-render'],
      searchTokens: ['rpg', 'ui']
    }),
    ['Soft lighting', '3D Render', 'RPG']
  );
});

test('search tails stay directory-specific', () => {
  assert.equal(core.quickSearchTail('palette'), 'color palette reference');
  assert.equal(
    core.preciseSearchTail('photo'),
    'photography lighting composition color grade reference'
  );
});
