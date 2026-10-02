// Functional smoke tests, not a native-speaker accuracy benchmark.
// PLAYWRIGHT_MODULE=/path/to/playwright/index.js node scripts/test-neural-browser.mjs
import fs from 'node:fs';
import assert from 'node:assert/strict';
const modulePath = process.env.PLAYWRIGHT_MODULE || '/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js';
const { default: playwright } = await import(modulePath);
const context = await playwright.chromium.launchPersistentContext('/tmp/koshur-neural-test-profile', {
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true,
  ignoreHTTPSErrors: true, args: ['--no-sandbox'],
  ...(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1,localhost' } } : {}),
});
const page = await context.newPage();
const errors = [], requests = [];
page.on('pageerror', e => errors.push(e.message));
page.on('request', request => requests.push({ url: request.url(), method: request.method() }));
await page.goto(process.env.TEST_ORIGIN || 'http://127.0.0.1:8006');
await page.waitForFunction(() => document.querySelector('#dictionary-status').textContent.includes('headwords'));
await page.locator('#search-input').fill('water');
await page.waitForTimeout(250);
assert.ok(await page.locator('.word-card').count() > 0);
await page.locator('#source-filter').selectOption('sourced');
assert.ok(await page.locator('.entry-source').count() > 0);
await page.locator('#search-input').fill('تۆت');
await page.waitForTimeout(250);
assert.ok(await page.locator('.word-forms').count() > 0);
await page.locator('[data-view="translator"]').click();
await page.locator('#sentence-input').fill('kashmiri in latin script');
await page.locator('#translate-sentence').click();
assert.match(await page.locator('#translation-note').textContent(), /Perso-Arabic/);
await page.evaluate(() => {
  window.testWorker = new Worker('/assets/translation-worker.mjs', { type: 'module' });
  window.translateTest = options => new Promise((resolve, reject) => {
    if (window.testDirection && window.testDirection !== options.direction) {
      testWorker.terminate(); window.testWorker = new Worker('/assets/translation-worker.mjs', { type: 'module' });
    }
    window.testDirection = options.direction;
    testWorker.onerror = error => reject(Error(error.message));
    testWorker.onmessage = ({ data }) => {
      if (data.type === 'result') resolve(data);
      if (data.type === 'error') reject(Error(data.message));
    };
    testWorker.postMessage({ type: 'translate', ...options });
  });
});
const cases = [
  { direction: 'ks-en', text: 'مےٚ پٔر اَکھ کِتاب', reference: 'I read a book' },
  { direction: 'ks-en', text: 'مےٚ پٔر اَکھ کِتاب', beams: 1, reference: 'I read a book' },
  { direction: 'ks-en', text: 'ناوٕ چھےٚ سَرَس پؠٹھ پَکان', reference: 'Boats travel on the lake' },
  { direction: 'en-ks', text: 'The weather is good today.' },
  { direction: 'en-ks', text: 'I am going to school.' },
  { direction: 'en-ks', text: 'I read a book.' },
  { direction: 'en-ks', text: 'I drink water. The weather is good today.' },
];
const report = [];
for (const sample of cases) {
  if (process.argv.includes('--large')) sample.size = 'large';
  const start = Date.now();
  const result = await page.evaluate(sample => window.translateTest(sample), sample);
  assert.ok(result.text.length > 0);
  if (sample.direction === 'en-ks') assert.match(result.text, /\p{Script=Arabic}/u);
  else assert.match(result.text, /[a-z]/i);
  if (sample.text.includes('water. The')) assert.equal(result.text.split('\n').length, 2);
  report.push({ ...sample, output: result.text, limited: result.limited, milliseconds: Date.now() - start });
  console.log(JSON.stringify(report.at(-1)));
}
await page.setViewportSize({ width: 390, height: 844 });
assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
assert.deepEqual(errors, []);
assert.equal(requests.some(r => r.method !== 'GET' && /^https?:/.test(r.url)), false, 'No sentence POSTs to external services');
console.log('Functional tests passed. Human translation accuracy is NOT established by these tests.');
fs.writeFileSync('/tmp/koshur-neural-smoke.json', JSON.stringify(report, null, 2));
await context.close();
