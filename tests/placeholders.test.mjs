import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  findPlaceholderPages,
  placeholdersEnabled,
} from '../scripts/security-headers-integration.mjs';

const pages = [
  { filename: 'index.html', html: '<div class="content-slot" data-placeholder><span>Customer metric</span></div>' },
  { filename: 'about/index.html', html: '<p>Approved copy only.</p>' },
  { filename: 'resources/example/index.html', html: '<article data-placeholder="draft">Draft</article>' },
];

test('production builds reject pages that contain content placeholders', () => {
  assert.deepEqual(findPlaceholderPages(pages, false), ['index.html', 'resources/example/index.html']);
});

test('staging builds that opt in may contain content placeholders', () => {
  assert.deepEqual(findPlaceholderPages(pages, true), []);
});

test('text that merely mentions placeholders is not flagged', () => {
  const prose = [{ filename: 'docs/index.html', html: '<p>Use data-placeholders in copy.</p><input placeholder="Email">' }];
  assert.deepEqual(findPlaceholderPages(prose, false), []);
});

test('placeholder mode reads the process environment before .env files', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'aetas-placeholders-'));
  const original = process.env.PUBLIC_SHOW_PLACEHOLDERS;
  t.after(async () => {
    if (original === undefined) delete process.env.PUBLIC_SHOW_PLACEHOLDERS;
    else process.env.PUBLIC_SHOW_PLACEHOLDERS = original;
    await rm(root, { recursive: true, force: true });
  });

  delete process.env.PUBLIC_SHOW_PLACEHOLDERS;
  assert.equal(placeholdersEnabled('production', root), false);

  await writeFile(path.join(root, '.env'), 'PUBLIC_SHOW_PLACEHOLDERS=true\n');
  assert.equal(placeholdersEnabled('production', root), true);

  await writeFile(path.join(root, '.env.production'), 'PUBLIC_SHOW_PLACEHOLDERS=false\n');
  assert.equal(placeholdersEnabled('production', root), false);

  process.env.PUBLIC_SHOW_PLACEHOLDERS = 'true';
  assert.equal(placeholdersEnabled('production', root), true);
});
