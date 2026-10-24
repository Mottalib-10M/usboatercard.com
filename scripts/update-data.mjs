#!/usr/bin/env node
/**
 * update-data.mjs — rebuilds src/data/states.json from the verified per-state records (data/raw/states/*.json)
 * and from the BoatUS Foundation course-status page, then re-reads every official source page and
 * reports any quote that is no longer found (the rule may have changed: a human re-checks it).
 *
 * Usage: node scripts/update-data.mjs            (rebuild + drift check)
 *        node scripts/update-data.mjs --offline  (rebuild only)
 * No scraping of any competitor; only official agency/legislature pages and the BoatUS status list.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, 'data', 'raw', 'states');
const OUT = path.join(ROOT, 'src', 'data', 'states.json');
const OFFLINE = process.argv.includes('--offline');
const UA = 'Mozilla/5.0 (compatible; data-check; +https://example.invalid)';
const BOATUS = 'https://boatus.org/free-courses/free-boating-safety-course/';

const NAMES = { 'Washington D.C.': 'DC' };
const USPS = { Alabama:'AL',Alaska:'AK',Arizona:'AZ',Arkansas:'AR',California:'CA',Colorado:'CO',Connecticut:'CT',Delaware:'DE',Florida:'FL',Georgia:'GA',Hawaii:'HI',Idaho:'ID',Illinois:'IL',Indiana:'IN',Iowa:'IA',Kansas:'KS',Kentucky:'KY',Louisiana:'LA',Maine:'ME',Maryland:'MD',Massachusetts:'MA',Michigan:'MI',Minnesota:'MN',Mississippi:'MS',Missouri:'MO',Montana:'MT',Nebraska:'NE',Nevada:'NV','New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND',Ohio:'OH',Oklahoma:'OK',Oregon:'OR',Pennsylvania:'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD',Tennessee:'TN',Texas:'TX',Utah:'UT',Vermont:'VT',Virginia:'VA',Washington:'WA','West Virginia':'WV',Wisconsin:'WI',Wyoming:'WY', ...NAMES };

async function get(url) {
  const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html,application/pdf' }, redirect: 'follow' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
}
/** Letters and digits only: robust to tags, line breaks, entities, curly quotes and zero-width characters. */
const norm = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').toLowerCase().replace(/[^a-z0-9]+/g, '');

/** BoatUS free course status per state: approved | not-approved | not-available. */
export function parseBoatUS(html) {
  const out = {};
  const re = /<a href="(https:\/\/boatus\.org\/free-courses\/free-boating-safety-course\/[^"]+)">\s*<span class="course-status-icon status-([a-z-]+)">[\s\S]*?<\/span>\s*([^<]+?)\s*<\/a>/g;
  for (let m; (m = re.exec(html)); ) { const code = USPS[m[3].trim()]; if (code) out[code] = { status: m[2], url: m[1] }; }
  return out;
}

async function main() {
  const files = fs.readdirSync(RAW).filter((f) => f.endsWith('.json')).sort();
  const states = files.map((f) => JSON.parse(fs.readFileSync(path.join(RAW, f), 'utf8')));
  let boatus = {};
  const cache = path.join(ROOT, 'data', 'raw', 'boatus-status.json');
  if (!OFFLINE) {
    try { boatus = parseBoatUS(await get(BOATUS)); fs.writeFileSync(cache, JSON.stringify({ read: new Date().toISOString().slice(0, 10), url: BOATUS, states: boatus }, null, 1)); }
    catch (e) { console.warn('BoatUS page unreadable:', e.message); }
  }
  if (!Object.keys(boatus).length && fs.existsSync(cache)) boatus = JSON.parse(fs.readFileSync(cache, 'utf8')).states;
  if (Object.keys(boatus).length && Object.keys(boatus).length !== 51) throw new Error(`BoatUS list has ${Object.keys(boatus).length} entries, expected 51`);

  const drift = [];
  if (!OFFLINE) {
    const pages = new Map();
    for (const s of states) for (const src of s.sources) {
      if (src.url.includes('web.archive.org')) continue; // archived copy: re-check by hand
      if (/\.pdf(\?|$)/i.test(src.url)) { if (!pages.has(src.url)) { pages.set(src.url, null); drift.push(`${s.code} PDF source, re-check by hand: ${src.url}`); } continue; }
      if (!pages.has(src.url)) { try { const t = await get(src.url); if (t.startsWith('%PDF')) { pages.set(src.url, null); drift.push(`${s.code} PDF source, re-check by hand: ${src.url}`); } else pages.set(src.url, norm(t)); } catch (e) { pages.set(src.url, null); drift.push(`${s.code} unreachable ${src.url} (${e.message})`); } }
      const page = pages.get(src.url);
      const probe = norm(src.quote.split(/\.\.\.|\[/)[0]).slice(0, 60);
      if (page && !page.includes(probe)) drift.push(`${s.code} quote not found: "${probe}" @ ${src.url}`);
    }
  }
  const data = states.map((s) => ({ ...s, boatus: boatus[s.code] ?? null }));
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ built: new Date().toISOString().slice(0, 10), count: data.length, states: data }, null, 1));
  console.log(`states.json: ${data.length} jurisdictions, BoatUS status for ${Object.keys(boatus).length}`);
  if (drift.length) { console.log(`\n${drift.length} source(s) to re-check by hand:`); drift.forEach((d) => console.log(' - ' + d)); process.exitCode = 2; }
}
if (import.meta.url === `file://${process.argv[1]}`) main();
