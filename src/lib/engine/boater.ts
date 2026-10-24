/**
 * Boater education engine: "do I need a boater card in this state, on this date, for this boat?",
 * the minimum age to operate alone, and the total cost (course + state fee).
 * Pure TypeScript, no I/O. Every number comes from data/states.json (verified official sources);
 * a field left null there means "not confirmed" and the engine answers "unknown", never a guess.
 */

export type Vessel = 'motorboat' | 'pwc' | 'sail';
export type Lang = 'en' | 'es';

export interface Phase { from: string; bornAfter?: string; ageMax?: number | null; ageMin?: number | null; kind?: Rule['kind'] }
export interface Rule {
  kind: 'bornOnOrAfter' | 'all' | 'ageBand' | 'pwcOnly' | 'none' | 'mixed' | null;
  bornOnOrAfter: string | null;
  ageMax: number | null;
  ageMin: number | null;
  hpMin: number | null;
  hpInclusive?: boolean;
  pwc: boolean | null;
  sailFtMin: number | null;
  phases?: Phase[] | null;
  /** Separate PWC cut-off (MI: born after 1978; PA, RI: every PWC operator = 1800-01-01). */
  pwcBornOnOrAfter?: string | null;
  altDriverLicense?: boolean;
  textEn: string | null;
  textEs: string | null;
}
export interface StateRec {
  code: string; name: string; es: string; agency: string; agencyUrl: string;
  required: boolean | null;
  rule: Rule;
  minAge: { motorboat: number | null; pwc: number | null; note: string | null };
  card: { nameEn: string | null; stateFee: number | null; feeNote: string | null; replacementFee: number | null; validity: string | null; inPersonExamRequired: boolean | null; onlineAllowed: boolean | null };
  boatus?: { status: 'approved' | 'not-approved' | 'not-available'; url: string } | null;
  checked: string;
  uncertain: string[];
}

export interface Situation {
  birthDate: string;      // YYYY-MM-DD
  onDate: string;         // date of the outing, YYYY-MM-DD
  vessel: Vessel;
  hp: number;             // engine power; 0 for a sailboat without motor
  lengthFt?: number;      // sailboats
  hasDriverLicense?: boolean;
}

export type Need = 'yes' | 'no' | 'unknown';
export interface Answer {
  need: Need;
  /** Why, as stable codes the page turns into sentences. */
  reasons: string[];
  age: number;
  /** Minimum age to operate this vessel alone, when the state publishes one. */
  minAgeAlone: number | null;
  tooYoungAlone: boolean | null;
}

/** Whole years between two ISO dates (birthday counted on the day itself; Feb 29 -> Mar 1 in common years). */
export function ageOn(birth: string, on: string): number {
  const [by, bm, bd] = birth.split('-').map(Number);
  const [y, m, d] = on.split('-').map(Number);
  if (![by, bm, bd, y, m, d].every(Number.isFinite)) throw new Error('bad date');
  let a = y - by;
  if (m < bm || (m === bm && d < bd)) a -= 1;
  return a;
}

const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/** The rule as it stands on a given date (phase-in schedules such as Minnesota 2025-2028). */
export interface RuleNow { bornOnOrAfter: string | null; ageMax: number | null; ageMin: number | null; kind: Rule['kind']; inForce: boolean }
export function ruleOn(r: Rule, onDate: string): RuleNow {
  if (!r.phases || !r.phases.length) return { bornOnOrAfter: r.bornOnOrAfter, ageMax: r.ageMax, ageMin: r.ageMin, kind: r.kind, inForce: true };
  const active = r.phases.filter((p) => cmp(p.from, onDate) <= 0).pop();
  // A rule that already applies today (e.g. Utah PWC 12-17) stays in force before a later phase starts.
  if (!active) return r.kind === 'pwcOnly' || r.kind === 'ageBand' ? { bornOnOrAfter: r.bornOnOrAfter, ageMax: r.ageMax, ageMin: r.ageMin, kind: r.kind, inForce: true } : { bornOnOrAfter: null, ageMax: null, ageMin: null, kind: r.kind, inForce: false };
  const bornOnOrAfter = active.bornAfter ? nextDay(active.bornAfter) : null;
  return {
    bornOnOrAfter,
    ageMax: active.ageMax === undefined ? r.ageMax : active.ageMax,
    ageMin: active.ageMin === undefined ? r.ageMin : active.ageMin,
    kind: active.kind ?? r.kind,
    inForce: true,
  };
}
export function nextDay(iso: string): string {
  const t = new Date(iso + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + 1);
  return t.toISOString().slice(0, 10);
}

function vesselCovered(r: Rule, kind: Rule['kind'], s: Situation): Need {
  if (s.vessel === 'pwc') return r.pwc === false ? 'no' : r.pwc === true || kind === 'all' ? 'yes' : 'unknown';
  if (kind === 'pwcOnly') return 'no';
  if (s.vessel === 'sail' && s.hp <= 0) {
    if (r.sailFtMin == null) return 'unknown';
    return (s.lengthFt ?? 0) >= r.sailFtMin ? 'yes' : 'no';
  }
  if (r.hpMin == null) return 'yes';
  return (r.hpInclusive ? s.hp >= r.hpMin : s.hp > r.hpMin) ? 'yes' : 'no';
}

export function needsCard(st: StateRec, s: Situation): Answer {
  const age = ageOn(s.birthDate, s.onDate);
  const r = st.rule;
  const minAgeAlone = s.vessel === 'pwc' ? (st.minAge.pwc ?? null) : (st.minAge.motorboat ?? null);
  const base = { age, minAgeAlone, tooYoungAlone: minAgeAlone == null ? null : age < minAgeAlone };
  if (st.required == null || (st.required && r.kind == null)) return { ...base, need: 'unknown', reasons: ['state-not-verified'] };
  if (!st.required || r.kind === 'none') return { ...base, need: 'no', reasons: ['no-state-requirement'] };

  const now = ruleOn(r, s.onDate);
  if (!now.inForce) return { ...base, need: 'no', reasons: ['not-yet-in-force'] };

  if (now.kind === 'none') return { ...base, need: 'no', reasons: ['no-state-requirement'] };
  const cov = vesselCovered(r, now.kind, s);
  if (cov === 'no') return { ...base, need: 'no', reasons: ['vessel-below-threshold'] };

  const reasons: string[] = [];
  const cutoff = s.vessel === 'pwc' && r.pwcBornOnOrAfter ? r.pwcBornOnOrAfter : now.bornOnOrAfter;
  if (cutoff && cutoff > '1801-01-01') {
    if (cmp(s.birthDate, cutoff) < 0) return { ...base, need: 'no', reasons: ['born-before-cutoff'] };
    reasons.push('born-on-or-after-cutoff');
  }
  if (now.ageMax != null && age > now.ageMax) return { ...base, need: 'no', reasons: ['older-than-age-band'] };
  if (now.ageMin != null && age < now.ageMin) return { ...base, need: 'no', reasons: ['younger-than-age-band'] };
  if (r.altDriverLicense && s.hasDriverLicense) return { ...base, need: 'no', reasons: ['driver-license-satisfies'] };
  if (cov === 'unknown') return { ...base, need: 'unknown', reasons: [...reasons, 'vessel-rule-not-published'] };
  return { ...base, need: 'yes', reasons: reasons.length ? reasons : ['all-operators'] };
}

export interface Cost {
  course: number;          // what the chosen course costs
  stateFee: number | null; // null = the state does not publish one
  total: number | null;    // null when the state fee is unknown
  freeCourseAccepted: boolean | null;
}
/** Cheapest legal route: the free BoatUS Foundation course where the state accepts it, else the price the user enters. */
export function totalCost(st: StateRec, paidCoursePrice: number): Cost {
  const free = st.boatus ? st.boatus.status === 'approved' : null;
  const course = free ? 0 : Math.max(0, Number.isFinite(paidCoursePrice) ? paidCoursePrice : 0);
  const stateFee = st.card.stateFee;
  return { course, stateFee, total: stateFee == null ? null : course + stateFee, freeCourseAccepted: free };
}

/** Practice test scoring: pass mark as a share (e.g. 0.8). */
export function score(answers: number[], correct: number[], passMark = 0.8): { right: number; total: number; pct: number; pass: boolean } {
  const total = correct.length;
  const right = correct.reduce((n, c, i) => n + (answers[i] === c ? 1 : 0), 0);
  const pct = total ? right / total : 0;
  return { right, total, pct, pass: total > 0 && pct + 1e-9 >= passMark };
}
