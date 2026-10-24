/**
 * Practice-test engine: the federal question bank (written by Radif Partners from the Navigation
 * Rules, 33 CFR and 46 CFR, all US public domain), questions generated from each state's verified
 * record, seeded shuffles (same order at build time and on the first render, RECETTE §17.5) and
 * scoring. No question comes from an official test bank, a course vendor or a book.
 */
import FED from '../../data/questions/bank-federal.json';
import P from '../../data/params-2026.json';
import { stateByCode, stateName, cardName, freeCourse, verified, type StateRec } from './states';
import { dateL, money } from '../format-l';

export type Lang = 'en' | 'es';
export interface Question {
  id: string; t: string; src: string;
  q: Record<Lang, string>; o: Record<Lang, string[]>; a: number; x: Record<Lang, string>;
}
export const BANK: Question[] = FED as Question[];
export const TOPICS = ['rules', 'sound', 'lights', 'aids', 'equipment', 'law', 'safety'] as const;
export const PRACTICE_TARGET: number = P.practiceTarget;

/** Deterministic PRNG (mulberry32) from a string seed. */
export function rng(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function shuffle<T>(arr: T[], seed: string): T[] {
  const r = rng(seed); const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}

const uniq4 = (right: string, wrong: string[]) => { const w = [...new Set(wrong.filter((x) => x !== right))].slice(0, 3); return w.length === 3 ? [right, ...w] : null; };
const bi = (en: string, es: string) => ({ en, es });

/** Questions generated from a state's confirmed record. A field that is not confirmed gives no question. */
export function stateQuestions(s: StateRec): Question[] {
  if (!verified(s)) return [];
  const out: Question[] = [];
  const n = { en: stateName(s, 'en'), es: stateName(s, 'es') };
  const push = (id: string, q: Record<Lang, string>, oen: string[] | null, oes: string[] | null, x: Record<Lang, string>) => {
    if (oen && oes) out.push({ id: `${s.code}-${id}`, t: 'state', src: 'state', q, o: { en: oen, es: oes }, a: 0, x });
  };
  const r = s.rule;
  // 1. Who needs the card.
  if (s.required === false) {
    push('req', bi(`Does ${n.en} require a boater education card for adult recreational operators?`, `¿Exige ${n.es} una tarjeta de educación náutica a los operadores adultos de recreo?`),
      uniq4('No, the state has no general education requirement', ['Yes, for every operator', 'Yes, for anyone born after 1980', 'Only for boats over 10 hp']),
      uniq4('No, el estado no tiene un requisito general de educación', ['Sí, para todo operador', 'Sí, para quien nació después de 1980', 'Solo para motores de más de 10 hp']),
      bi(`${n.en} has no general boater education requirement for adult recreational operators on the official pages we read. Age limits for young operators or PWC can still apply.`, `Según las páginas oficiales consultadas, ${n.es} no tiene un requisito general de educación náutica para operadores adultos. Pueden aplicarse límites de edad para jóvenes o motos acuáticas.`));
  } else if (r.kind === 'bornOnOrAfter' && r.bornOnOrAfter && !r.phases) {
    const d = r.bornOnOrAfter; const y = Number(d.slice(0, 4));
    const alt = [y - 10, y + 6, y - 22].map((yy) => `${yy}${d.slice(4)}`);
    push('cut', bi(`In ${n.en}, the boater education requirement applies to operators born on or after:`, `En ${n.es}, el requisito de educación náutica se aplica a quienes nacieron a partir del:`),
      uniq4(dateL(d, 'en'), alt.map((a) => dateL(a, 'en'))), uniq4(dateL(d, 'es'), alt.map((a) => dateL(a, 'es'))),
      bi(r.textEn ?? '', r.textEs ?? ''));
  } else if (r.kind === 'all') {
    push('all', bi(`Who needs boater education to operate a covered boat in ${n.en}?`, `¿Quién necesita educación náutica para manejar una embarcación sujeta a la regla en ${n.es}?`),
      uniq4('Every operator, whatever the birth date', ['Only operators under 18', 'Only operators born after 2000', 'Nobody, it is optional']),
      uniq4('Todo operador, sea cual sea su fecha de nacimiento', ['Solo los menores de 18', 'Solo quienes nacieron después de 2000', 'Nadie, es opcional']),
      bi(r.textEn ?? '', r.textEs ?? ''));
  }
  // 2. Horsepower threshold.
  if (s.required && r.hpMin != null && r.hpMin > 0) {
    const h = r.hpMin; const alts = [h === 10 ? 25 : 10, h === 50 ? 15 : 50, h === 6 ? 2 : 6, 100].filter((x) => x !== h);
    const lab = (x: number, l: Lang) => (r.hpInclusive ? (l === 'en' ? `${x} hp or more` : `${x} hp o más`) : (l === 'en' ? `More than ${x} hp` : `Más de ${x} hp`));
    push('hp', bi(`In ${n.en}, from what engine power does the education rule apply to motorboats?`, `En ${n.es}, ¿a partir de qué potencia de motor se aplica la regla de educación a las lanchas?`),
      uniq4(lab(h, 'en'), alts.map((x) => lab(x, 'en'))), uniq4(lab(h, 'es'), alts.map((x) => lab(x, 'es'))),
      bi(r.textEn ?? '', r.textEs ?? ''));
  }
  // 3. Minimum age to operate alone.
  const ma = s.minAge.motorboat ?? s.minAge.pwc;
  if (ma != null) {
    const which = s.minAge.motorboat != null ? bi('a motorboat', 'una lancha') : bi('a personal watercraft', 'una moto acuática');
    const alts = [ma - 2, ma + 2, ma + 4].filter((x) => x > 0 && x !== ma);
    push('age', bi(`What minimum age does ${n.en} set to operate ${which.en} alone?`, `¿Qué edad mínima fija ${n.es} para manejar ${which.es} sin compañía?`),
      uniq4(`${ma}`, alts.map(String).concat(['21'])), uniq4(`${ma}`, alts.map(String).concat(['21'])),
      bi(`${n.en} sets ${ma} as the youngest age to operate ${which.en} without an older person on board, under the conditions on its official page.`, `${n.es} fija los ${ma} años como edad mínima para manejar ${which.es} sin una persona mayor a bordo, en las condiciones de su página oficial.`));
  }
  // 4. Free course.
  const fc = freeCourse(s);
  if (fc && s.required) {
    const right = fc === 'approved' ? bi('Yes, it is approved for the state card', 'Sí, está aprobado para la tarjeta del estado') : bi('No, it is not accepted for the state card', 'No, no se acepta para la tarjeta del estado');
    const wrong = fc === 'approved' ? [bi('No, it is not accepted for the state card', 'No, no se acepta para la tarjeta del estado')] : [bi('Yes, it is approved for the state card', 'Sí, está aprobado para la tarjeta del estado')];
    const more = [bi('Only for people over 65', 'Solo para mayores de 65'), bi('Only for PWC operators', 'Solo para motos acuáticas')];
    push('free', bi(`Is the free online BoatUS Foundation course accepted for the ${n.en} requirement?`, `¿Se acepta el curso gratuito en línea de la BoatUS Foundation para el requisito de ${n.es}?`),
      uniq4(right.en, [...wrong, ...more].map((x) => x.en)), uniq4(right.es, [...wrong, ...more].map((x) => x.es)),
      bi(fc === 'approved' ? `The BoatUS Foundation lists its free course as approved in ${n.en}; the state may still charge its own card fee.` : `The BoatUS Foundation lists its free course as not valid for ${n.en}; use a course the state approves.`,
        fc === 'approved' ? `La BoatUS Foundation indica que su curso gratuito está aprobado en ${n.es}; el estado puede cobrar igualmente su tarifa de tarjeta.` : `La BoatUS Foundation indica que su curso gratuito no vale para ${n.es}; hay que tomar un curso aprobado por el estado.`));
  }
  // 5. State fee.
  if (s.required && s.card.stateFee != null && s.card.stateFee > 0) {
    const f = s.card.stateFee; const alts = [f + 20, f * 2 + 5, Math.max(1, Math.round(f / 2))].filter((x) => x !== f);
    push('fee', bi(`What does ${n.en} itself charge for its ${s.card.nameEn ?? 'boater card'}?`, `¿Cuánto cobra ${n.es} por su ${cardName(s, 'es') ?? 'tarjeta náutica'}?`),
      uniq4(money(f, 'en'), alts.map((x) => money(x, 'en'))), uniq4(money(f, 'es'), alts.map((x) => money(x, 'es'))),
      bi(`The state fee is ${money(f, 'en')}; the course itself may cost extra unless a free approved course exists.`, `La tarifa del estado es de ${money(f, 'es')}; el curso puede costar aparte salvo que exista uno gratuito aprobado.`));
  }
  return out;
}

/** A question ready to show: options in a seeded order, index of the right one. */
export interface Shown { id: string; t: string; q: string; options: string[]; correct: number; x: string; src: string }
export function present(q: Question, lang: Lang, seed: string): Shown {
  const order = shuffle([0, 1, 2, 3], `${seed}:${q.id}`);
  return { id: q.id, t: q.t, q: q.q[lang], options: order.map((i) => q.o[lang][i]), correct: order.indexOf(q.a), x: q.x[lang], src: q.src };
}

export type TestType = 'full' | 'rules' | 'equipment';
const TYPE_TOPICS: Record<TestType, string[] | null> = { full: null, rules: ['rules', 'sound', 'lights', 'aids'], equipment: ['equipment', 'law', 'safety'] };
export function pool(type: TestType, st: StateRec): Question[] {
  const t = TYPE_TOPICS[type];
  const fed = t ? BANK.filter((q) => t.includes(q.t)) : BANK;
  return type === 'full' ? [...fed, ...stateQuestions(st)] : fed;
}
export const testLength = (type: TestType, st: StateRec) => Math.min(20, pool(type, st).length);
export const passMark = (n: number) => ({ need: Math.ceil(n * PRACTICE_TARGET - 1e-9), pct: PRACTICE_TARGET });

export function buildTest(type: TestType, code: string, lang: Lang, seed: string, n?: number): Shown[] {
  const st = stateByCode(code);
  const p = pool(type, st);
  const len = Math.min(n ?? testLength(type, st), p.length);
  const own = shuffle(p.filter((q) => q.t === 'state'), `${seed}:own`);
  const rest = shuffle(p.filter((q) => q.t !== 'state'), `${seed}:rest`);
  const k = Math.min(own.length, Math.max(type === 'full' ? 2 : 0, Math.round(len / 5)));
  const picked = shuffle([...own.slice(0, k), ...rest.slice(0, len - k)], `${seed}:mix`);
  return picked.map((q) => present(q, lang, seed));
}

export type Status = 'start' | 'on-track' | 'at-risk' | 'pass' | 'fail';
export function score(answers: Array<number | null>, test: Shown[], need: number): { right: number; answered: number; canMiss: number; status: Status } {
  const answered = answers.filter((a) => a !== null && a !== undefined).length;
  const right = answers.reduce<number>((n, a, i) => n + (a !== null && a !== undefined && a === test[i]?.correct ? 1 : 0), 0);
  const wrong = answered - right;
  const canMiss = Math.max(0, test.length - need - wrong);
  const done = answered === test.length;
  let status: Status = 'start';
  if (done) status = right >= need ? 'pass' : 'fail';
  else if (answered) status = wrong > test.length - need ? 'fail' : canMiss === 0 ? 'at-risk' : 'on-track';
  return { right, answered, canMiss, status };
}
