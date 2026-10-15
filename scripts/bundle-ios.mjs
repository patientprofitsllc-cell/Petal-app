// Builds the web app and prepares dist/ to be copied into the iPhone package.
//   npm run bundle:ios            (then: npx cap sync ios)
//
// What it does:
//   1. Runs the production build (vite build, base './' so paths are relative).
//   2. Rewrites any root-relative path in HTML and CSS to a relative one, and
//      removes web-only files (service worker, web manifest).
//   3. FAILS LOUDLY if anything would still need a website: a root-relative
//      path, a link to the hosting domain, or a request to Google Fonts.
//
// Limits (be honest): JavaScript is only scanned for known patterns, not
// rewritten. Links the user taps to ACOG, CDC and FDA are expected and listed.
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const skipBuild = process.argv.includes('--no-build');

if (!skipBuild) {
  const r = spawnSync(
    process.execPath,
    [join(root, 'node_modules', 'vite', 'bin', 'vite.js'), 'build'],
    { stdio: 'inherit' }
  );
  if (r.status !== 0) fail('vite build failed');
}

function fail(msg) {
  console.error('\n==================== BUNDLE FAILED ====================');
  console.error(msg);
  console.error('=======================================================\n');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

try {
  statSync(dist);
} catch {
  fail('dist/ not found. Run the build first.');
}

// Depth of a file below dist/, to turn "/x" into "./x" or "../x".
const prefixFor = file => {
  const depth = relative(dist, file).split(sep).length - 1;
  return depth === 0 ? './' : '../'.repeat(depth);
};

let rewrites = 0;
for (const file of walk(dist)) {
  if (!/\.(html|css)$/.test(file)) continue;
  let text = readFileSync(file, 'utf8');
  const before = text;
  const pre = prefixFor(file);
  text = text
    .replace(/((?:src|href)=["'])\/(?!\/)/g, `$1${pre}`)
    .replace(/(url\(\s*["']?)\/(?!\/)/g, `$1${pre}`);
  if (file.endsWith('index.html')) {
    // Web-only: the install manifest has no use inside the iPhone app.
    text = text.replace(/\s*<link rel="manifest"[^>]*>/g, '');
  }
  if (text !== before) {
    writeFileSync(file, text);
    rewrites++;
  }
}

// Web-only files that must not ship in the iPhone package.
for (const f of ['sw.js', 'manifest.webmanifest']) {
  rmSync(join(dist, f), { force: true });
}

// ---- Verification (the part that fails loudly) ----
const problems = [];
const externals = new Set();
for (const file of walk(dist)) {
  if (!/\.(html|css|js|json|webmanifest|svg)$/.test(file)) continue;
  const text = readFileSync(file, 'utf8');
  const rel = relative(dist, file);
  const checks = [
    [/(?:src|href)=["']\/(?!\/)/g, 'root-relative src/href'],
    [/url\(\s*["']?\/(?!\/)/g, 'root-relative url()'],
    [/["'`]\/(?:assets|icon\.svg|manifest\.webmanifest|sw\.js|privacy\.html)/g, 'root-relative asset path in JS'],
    [/fetch\(\s*["'`]\/(?!\/)/g, 'fetch() to a root-relative path'],
    [/appdeploy\.ai/g, 'link to the hosting domain'],
    [/fonts\.(?:googleapis|gstatic)\.com/g, 'Google Fonts request'],
  ];
  for (const [re, label] of checks) {
    const m = text.match(re);
    if (m) problems.push(`${rel}: ${label} (${m.length}x), e.g. ${m[0].slice(0, 60)}`);
  }
  for (const u of text.match(/https?:\/\/[^\s"'`)<>\\]+/g) ?? []) externals.add(u);
}

// Remote links that are fine because the user taps them on purpose.
const allowed = [
  /^https:\/\/www\.acog\.org\//,
  /^https:\/\/www\.cdc\.gov\//,
  /^https:\/\/www\.fda\.gov\//,
  /^https?:\/\/www\.w3\.org\//, // XML/SVG namespaces, not network requests
  /^https:\/\/react\.dev\//, // text inside React's error messages
  /^https:\/\/reactjs\.org\//,
  /^https:\/\/capacitorjs\.com\/$/, // only the MIT license comment in Capacitor's code
];
const unexpected = [...externals].filter(u => !allowed.some(re => re.test(u)));
for (const u of unexpected) problems.push(`unexpected remote address: ${u}`);

if (problems.length) {
  fail(
    'The app would still need a website or the network:\n - ' +
      problems.join('\n - ')
  );
}

console.log(
  `\nBundle OK. ${rewrites} file(s) rewritten, web-only files removed, ` +
    `no root-relative paths, no hosting-domain links, no Google Fonts.`
);
console.log('Remote links kept on purpose:');
for (const u of [...externals].filter(u => allowed.slice(0, 3).some(re => re.test(u)))) {
  console.log('  ' + u);
}
console.log('\nNext: npx cap sync ios');
