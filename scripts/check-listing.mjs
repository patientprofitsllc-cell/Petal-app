// Checks store/APP_STORE_LISTING.md against Apple's limits and your rules.
//   npm run check:listing
// Exits with an error if anything is wrong.
import { readFileSync } from 'node:fs';

const md = readFileSync('store/APP_STORE_LISTING.md', 'utf8');
const f = {};
for (const m of md.matchAll(/^###\s+(.+?)\s*\n+```[^\n]*\n([\s\S]*?)\n```/gm)) {
  f[m[1].trim()] = m[2];
}

const problems = [];
const need = ['Name', 'Subtitle', 'Keywords', 'Promotional text', 'Description', 'Review notes'];
for (const k of need) if (!f[k]) problems.push(`Missing section: ${k}`);

const LIMITS = {
  Name: 30,
  Subtitle: 30,
  Keywords: 100,
  'Promotional text': 170,
  Description: 4000,
  'Review notes': 4000,
  "What's New (version 1.0)": 4000,
  'ES Name': 30,
  'ES Keywords': 100,
  'ES Description': 4000,
};
for (const [k, max] of Object.entries(LIMITS)) {
  if (f[k] !== undefined && [...f[k]].length > max) {
    problems.push(`${k} is ${[...f[k]].length} characters (limit ${max})`);
  }
}

// Your rules
if (md.includes('—')) problems.push('Em dash found. Customer-facing copy must not use em dashes.');
for (const k of ['Keywords', 'ES Keywords']) {
  if (f[k] && /,\s|\s,/.test(f[k])) problems.push(`${k}: no spaces around commas`);
}

const words = text =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
const stem = w => w.replace(/s$/, '');

// A word may appear only once across name, subtitle and keywords (per language set).
function noRepeats(label, parts) {
  const seen = new Map();
  for (const [field, text] of parts) {
    if (!text) continue;
    const sep = field.endsWith('Keywords') ? /,/ : /[^\p{L}\p{N}]+/u;
    for (const w of text.toLowerCase().split(sep).map(s => s.trim()).filter(Boolean)) {
      if (['for', 'de', 'y', 'la', 'el'].includes(w)) continue; // tiny joining words
      const key = stem(w);
      if (seen.has(key)) problems.push(`${label}: "${w}" in ${field} repeats "${seen.get(key)}"`);
      else seen.set(key, `${w}`);
    }
  }
}
noRepeats('English set', [['Name', f.Name], ['Subtitle', f.Subtitle], ['Keywords', f.Keywords]]);
noRepeats('Spanish set', [['ES Name', f['ES Name']], ['ES Keywords', f['ES Keywords']]]);

const kw = (f.Keywords || '').split(',').map(s => s.trim());
for (const w of kw) {
  if (/s$/.test(w) && !/ss$/.test(w))
    problems.push(`Keyword "${w}" looks plural. Use singular words.`);
}

const CATEGORY = ['health', 'fitness', 'education', 'wellness', 'medical'];
for (const w of [...words(f.Name || ''), ...words(f.Subtitle || ''), ...kw]) {
  if (CATEGORY.includes(w)) problems.push(`"${w}" is a category word. Leave it out of name, subtitle and keywords.`);
}
const COMPETITORS = ['flo', 'clue', 'natural cycles', 'stardust', 'glow', 'ovia', 'maya', 'always', 'tampax', 'kotex', 'thinx', 'knix', 'diva', 'cora', 'lunette', 'period tracker', 'apple'];
const searchable = [f.Name, f.Subtitle, f.Keywords, f['ES Keywords']].join(' ').toLowerCase();
for (const c of COMPETITORS) {
  if (new RegExp(`(^|[^\\p{L}])${c}([^\\p{L}]|$)`, 'u').test(searchable))
    problems.push(`Competitor or brand name "${c}" in name, subtitle or keywords.`);
}

// No guarantees or forbidden claims in any customer-facing text (whole words)
const copy = [f.Name, f.Subtitle, f['Promotional text'], f.Description, f['ES Description']].join('\n').toLowerCase();
for (const bad of ['guarantee', 'guaranteed', 'cure', 'contraception', 'contraceptive', 'pregnancy', 'fertile', 'fertility', 'ovulation', 'clinically proven', 'doctor approved', 'accurate'])
  if (new RegExp(`(^|[^\\p{L}])${bad}([^\\p{L}]|$)`, 'u').test(copy)) problems.push(`Risky claim word in copy: "${bad}"`);

if (problems.length) {
  console.error('LISTING PROBLEMS:\n - ' + problems.join('\n - '));
  process.exit(1);
}
console.log('Listing OK.');
for (const [k, v] of Object.entries(f)) {
  if (LIMITS[k]) console.log(`  ${k.padEnd(26)} ${String([...v].length).padStart(4)} / ${LIMITS[k]}`);
}
