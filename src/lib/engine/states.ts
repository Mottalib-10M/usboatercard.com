/**
 * The state dataset: one record per state and DC, built by `scripts/update-data.mjs` from the
 * records of `data/raw/states/*.json` (each figure with its official URL and the sentence it was
 * read in) and the BoatUS Foundation course-status list. Spanish versions of our own notes live
 * in `data/raw/es-notes.json`. A null value means "not confirmed on an official page": the site
 * then says so, it never guesses.
 */
import DATA from '../../data/states.json';
import ES from '../../../data/raw/es-notes.json';
import type { StateRec as EngineRec } from './boater';

export interface Source { url: string; publisher: string; quote: string; supports: string[] }
export interface StateRec extends EngineRec {
  rule: EngineRec['rule'] & { hpNote: string | null; phaseIn: string | null };
  minAge: { motorboat: number | null; pwc: number | null; note: string | null };
  exemptions: string[];
  nonResident: string | null; rental: string | null; pwcExtra: string | null; penalty: string | null; statute: string | null;
  sources: Source[];
  note?: string;
}
type EsNotes = Record<string, Partial<{ nameEs: string; feeNote: string; minAgeNote: string; exemptions: string[]; nonResident: string; rental: string; pwcExtra: string; penalty: string; hpNote: string; phaseIn: string }>>;
const ESN = ES as unknown as EsNotes;

export const STATES: StateRec[] = (DATA as unknown as { states: StateRec[] }).states.slice().sort((a, b) => a.name.localeCompare(b.name));
export const BUILT: string = (DATA as { built: string }).built;
const BY = new Map(STATES.map((s) => [s.code, s]));
export function stateByCode(code: string): StateRec {
  const s = BY.get(code);
  if (!s) throw new Error(`Unknown state ${code}`);
  return s;
}
export const stateIndex = (code: string) => STATES.findIndex((s) => s.code === code);
export const stateName = (s: StateRec, lang: 'en' | 'es') => (lang === 'es' ? s.es : s.name);
/** A record is verified when its core rule (who needs the card) was confirmed on an official page. */
export const verified = (s: StateRec) => s.required !== null && s.required !== undefined && (s.required === false || s.rule.kind !== null);
export const VERIFIED = STATES.filter(verified);
export const UNVERIFIED = STATES.filter((s) => !verified(s));
export const freeCourse = (s: StateRec) => s.boatus?.status ?? null;

/** Our own notes in the page language (English records, Spanish overlay). */
export function note(s: StateRec, k: 'feeNote' | 'minAgeNote' | 'nonResident' | 'rental' | 'pwcExtra' | 'penalty' | 'hpNote' | 'phaseIn', lang: 'en' | 'es'): string | null {
  const en = k === 'feeNote' ? s.card.feeNote : k === 'minAgeNote' ? s.minAge.note : k === 'hpNote' ? s.rule.hpNote : k === 'phaseIn' ? s.rule.phaseIn : (s as any)[k];
  if (!en) return null;
  if (lang === 'en') return en;
  return (ESN[s.code]?.[k] as string | undefined) ?? null;
}
export const exemptions = (s: StateRec, lang: 'en' | 'es'): string[] => (lang === 'en' ? s.exemptions : ESN[s.code]?.exemptions ?? []);
export const cardName = (s: StateRec, lang: 'en' | 'es') => (lang === 'es' ? ESN[s.code]?.nameEs ?? s.card.nameEn : s.card.nameEn);
export const ruleText = (s: StateRec, lang: 'en' | 'es') => (lang === 'es' ? s.rule.textEs : s.rule.textEn);

/** Slug of a state for URLs in each language. */
export const slugOf = (s: StateRec) => s.name.toLowerCase().replace(/[^a-z]+/g, '-');

/** Number of figures stored and confirmed (for the method page). */
const FIELDS = (s: StateRec) => [s.rule.kind, s.rule.bornOnOrAfter ?? (s.rule.phases ? 'p' : null), s.rule.hpMin, s.minAge.motorboat, s.minAge.pwc, s.card.stateFee, s.card.validity, s.card.onlineAllowed, s.card.inPersonExamRequired, s.boatus?.status ?? null];
export const META = {
  states: STATES.length,
  verified: VERIFIED.length,
  fields: STATES.length * 10,
  confirmed: STATES.reduce((n, s) => n + FIELDS(s).filter((x) => x !== null && x !== undefined).length, 0),
  sources: STATES.reduce((n, s) => n + s.sources.length, 0),
  built: BUILT,
};
