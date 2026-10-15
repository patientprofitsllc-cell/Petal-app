// Makes App Store screenshots from the REAL app (the bundled dist/ build).
//   npm run screenshots            (builds the bundle first, then runs this)
// Output: store/screenshots/<width>x<height>/NN-name.png
//
// Every file is an RGB PNG with no transparency, at the exact size Apple lists.
// Uses the Chrome or Edge already installed on this computer (no download).
// Set CHROME_PATH to use a different browser.
//
// Demo data: the app has no accounts and collects nothing, so the only "sample
// data" is the saved state below (2 finished lessons, 2 bookmarks). Nothing here
// is private, and no screenshot shows a password or a claim the app does not make.
//
// Honest limit: these come from a desktop browser, not a real iPhone, so there
// is no status bar or notch in the picture.
import { existsSync, mkdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const root = process.cwd();
const dist = join(root, 'dist');
const outRoot = join(root, 'store', 'screenshots');

// Apple's accepted sizes. css = points, scale = pixels per point.
const SIZES = [
  { px: [1206, 2622], css: [402, 874], scale: 3, slot: 'iPhone 6.3" (medium, required)' },
  { px: [1179, 2556], css: [393, 852], scale: 3, slot: 'iPhone 6.3" (medium, alternative)' },
  { px: [1320, 2868], css: [440, 956], scale: 3, slot: 'iPhone 6.9" (large)' },
  { px: [1290, 2796], css: [430, 932], scale: 3, slot: 'iPhone 6.9" (large, alternative)' },
  { px: [2064, 2752], css: [1032, 1376], scale: 2, slot: 'iPad 13" (required)' },
  { px: [2048, 2732], css: [1024, 1366], scale: 2, slot: 'iPad 13" / 12.9" (alternative)' },
];

const DEMO_STATE = {
  petal_completed: ['first', 'pad'],
  petal_saved: ['pad', 'tampon'],
};

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);
  const found = candidates.find(p => existsSync(p));
  if (!found) {
    console.error('No Chrome or Edge found. Set CHROME_PATH to its full path.');
    process.exit(1);
  }
  return found;
}

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/ not found. Run: npm run bundle:ios');
  process.exit(1);
}

// Tiny static server for dist/.
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = normalize(join(dist, p));
  if (!file.startsWith(dist) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch({ executablePath: findBrowser(), headless: true });
rmSync(outRoot, { recursive: true, force: true });

const facts = {};
const problems = [];

for (const size of SIZES) {
  const [w, h] = size.px;
  const context = await browser.newContext({
    viewport: { width: size.css[0], height: size.css[1] },
    deviceScaleFactor: size.scale,
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  });
  await context.addInitScript(state => {
    for (const [k, v] of Object.entries(state)) localStorage.setItem(k, JSON.stringify(v));
  }, DEMO_STATE);
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: '*,*:before,*:after{animation:none!important;transition:none!important}',
  });

  const nav = label =>
    page
      .locator('.bottom-nav button:visible, .desktop-sidebar nav button:visible')
      .filter({ hasText: label })
      .first();

  const dir = join(outRoot, `${w}x${h}`);
  mkdirSync(dir, { recursive: true });
  let n = 0;
  const shot = async name => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    const raw = await page.screenshot({ type: 'png' });
    const out = await sharp(raw)
      .flatten({ background: '#fffdf9' })
      .removeAlpha()
      .png()
      .toBuffer();
    const meta = await sharp(out).metadata();
    if (meta.width !== w || meta.height !== h || meta.hasAlpha || meta.channels !== 3) {
      problems.push(
        `${w}x${h}/${name}: got ${meta.width}x${meta.height}, channels=${meta.channels}, alpha=${meta.hasAlpha}`
      );
    }
    n += 1;
    await sharp(out).toFile(join(dir, `${String(n).padStart(2, '0')}-${name}.png`));
  };

  // 1. Home (25% progress from the demo state)
  await shot('home');

  // 2. Lessons list
  await nav('Lessons').click();
  await page.waitForSelector('.lesson-grid.full');
  if (size === SIZES[0]) {
    facts.lessons = await page.locator('.lesson-grid.full .lesson-card').count();
    facts.lessonCountLine = (await page.locator('.lesson-result').innerText()).replace(/\s+/g, ' ');
  }
  await shot('lessons');

  // 3. A lesson step
  await page.locator('.lesson-card', { hasText: 'My first period' }).locator('.inline-go').click();
  await page.waitForSelector('.step-main');
  await page.getByRole('button', { name: /Got it, next step/ }).click();
  await shot('lesson-step');

  // 4. Product guide with a choice made
  await nav('Products').click();
  await page.waitForSelector('.quiz-card');
  await page.locator('.quiz-options button', { hasText: 'School & everyday' }).click();
  if (size === SIZES[0]) {
    facts.products = await page.locator('.products-grid .product-card').count();
    facts.quizOptions = await page.locator('.quiz-options button').count();
  }
  await shot('products');

  // 5. Care checklist with a few items ticked
  await nav('My care').click();
  await page.waitForSelector('.check-items');
  const items = page.locator('.check-item');
  if (size === SIZES[0]) {
    facts.checklistItems = await items.count();
    facts.faqs = await page.locator('.faq-item').count();
  }
  for (const i of [0, 1, 2]) await items.nth(i).click();
  await shot('care');

  // 6. Privacy and sources
  await page
    .locator('.desktop-sidebar .sidebar-bottom:visible, .footer button:visible')
    .first()
    .click();
  await page.waitForSelector('.privacy-card');
  await shot('privacy');

  await context.close();
}

await browser.close();
server.close();

console.log('Counts in the running app (use these in the listing text):');
console.log(JSON.stringify(facts, null, 2));
if (problems.length) {
  console.error('\nSCREENSHOT PROBLEMS:\n - ' + problems.join('\n - '));
  process.exit(1);
}
console.log(`\nOK: ${SIZES.length} sizes x 6 screens, RGB PNG, no transparency.`);
for (const s of SIZES) console.log(`  ${s.px[0]}x${s.px[1]}  ${s.slot}`);
console.log(`\nFolder: ${outRoot}`);
