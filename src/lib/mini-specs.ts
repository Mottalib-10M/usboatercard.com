/**
 * Mini-tools of the guides (RECETTE §9.3): one subject = one calculation, always read from the
 * state dataset through the engine, never a second formula. Both languages here.
 */
import type { MiniSpec } from './mini-types';
import { STATES, stateName, cardName, freeCourse, verified, note } from './engine/states';
import { needsCard, ruleOn, freeRoutePayment } from './engine/boater';
import { money, dateL } from './format-l';

type L = 'en' | 'es';
const opts = (lang: L) => STATES.map((s, i) => ({ value: String(i), label: stateName(s, lang) }));
const at = (v: Record<string, number>, k = 'state') => STATES[Math.max(0, Math.min(STATES.length - 1, Math.round(v[k] ?? 0)))];
export const stateIdx = (code: string) => Math.max(0, STATES.findIndex((s) => s.code === code));
const DEF = stateIdx('FL');
declare const __BUILD_DAY__: string;
const TODAY = typeof __BUILD_DAY__ === 'string' ? __BUILD_DAY__ : '2026-10-24';
const W = (lang: L) => (lang === 'es'
  ? { nc: 'no confirmado', state: 'Estado', yes: 'Sí', no: 'No', unv: 'Estado aún no verificado', yrs: 'años', none: 'no publicada', free: 'Curso gratuito BoatUS', ok: 'aceptado', notOk: 'no aceptado', na: 'no disponible' }
  : { nc: 'not confirmed', state: 'State', yes: 'Yes', no: 'No', unv: 'State not verified yet', yrs: 'yrs', none: 'none published', free: 'Free BoatUS course', ok: 'accepted', notOk: 'not accepted', na: 'not available' });
const fcL = (s: (typeof STATES)[number], lang: L) => { const w = W(lang), f = freeCourse(s); return f === 'approved' ? w.ok : f === 'not-approved' ? w.notOk : f === 'not-available' ? w.na : w.nc; };
const yn = (b: boolean | null | undefined, lang: L) => (b == null ? W(lang).nc : b ? W(lang).yes : W(lang).no);
const fee = (x: number | null, lang: L) => (x == null ? W(lang).none : money(x, lang));
const validity = (s: (typeof STATES)[number], lang: L) => { const v = s.card.validity; if (!v) return W(lang).nc; if (v === 'lifetime') return lang === 'es' ? 'de por vida' : 'lifetime'; const m = v.match(/^(\d+)\s*years?$/); return m ? (lang === 'es' ? `${m[1]} años` : `${m[1]} years`) : v; };
/** Who the rule covers, in a few words. */
export function whoShort(s: (typeof STATES)[number], lang: L, on = TODAY): string {
  const w = W(lang);
  if (!verified(s)) return w.unv;
  if (!s.required || s.rule.kind === 'none') return lang === 'es' ? 'Sin requisito general' : 'No general requirement';
  const r = ruleOn(s.rule, on);
  if (!r.inForce) return lang === 'es' ? 'Aún no en vigor' : 'Not in force yet';
  if (r.bornOnOrAfter && r.bornOnOrAfter > '1801-01-01') return lang === 'es' ? `Nacidos desde el ${dateL(r.bornOnOrAfter, 'es')}` : `Born on or after ${dateL(r.bornOnOrAfter, 'en')}`;
  if (r.ageMax != null) return lang === 'es' ? `Hasta ${r.ageMax} años` : `Up to age ${r.ageMax}`;
  if (s.rule.kind === 'pwcOnly') return lang === 'es' ? 'Solo motos acuáticas' : 'PWC operators only';
  if (s.rule.kind === 'ageBand') return lang === 'es' ? 'Según la edad' : 'By age band';
  return lang === 'es' ? 'Todos los operadores' : 'All operators';
}

const SPECS: Record<string, (lang: L) => MiniSpec> = {
  /** Quick yes/no from a year of birth and an engine power. */
  quick: (lang) => ({
    title: lang === 'es' ? '¿Necesito tarjeta? Respuesta rápida' : 'Do I need a card? Quick answer', cta: lang === 'es' ? 'Comprobar con mi fecha exacta' : 'Check with my exact date', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }, { id: 'year', label: lang === 'es' ? 'Año de nacimiento' : 'Year of birth', def: 1995, max: 2026 }, { id: 'hp', label: lang === 'es' ? 'Potencia del motor' : 'Engine power', def: 90, unit: 'hp', max: 2000 }],
    run: (v) => {
      const s = at(v), w = W(lang), y = Math.round(v.year ?? 1995), hp = v.hp ?? 90;
      const sit = (b: string) => needsCard(s, { birthDate: b, onDate: TODAY, vessel: 'motorboat', hp });
      const a = sit(`${y}-01-01`), b = sit(`${y}-12-31`);
      const head = !verified(s) ? w.unv : a.need === b.need ? (a.need === 'yes' ? (lang === 'es' ? 'Sí, la necesita' : 'Yes, you need it') : a.need === 'no' ? (lang === 'es' ? 'No la necesita' : 'No card needed') : w.nc) : (lang === 'es' ? 'Depende de su cumpleaños' : 'Depends on your birthday');
      return {
        head: [`${stateName(s, lang)} · ${lang === 'es' ? 'lancha de motor' : 'motorboat'}`, head],
        rows: [[lang === 'es' ? 'Quién debe tenerla hoy' : 'Who needs it today', whoShort(s, lang)], [lang === 'es' ? 'Umbral de potencia' : 'Power threshold', s.rule.hpMin != null ? (note(s, 'hpNote', lang) ?? `${s.rule.hpMin} hp`) : (s.required ? (lang === 'es' ? 'cualquier motor' : 'any motor') : '–')], [w.free, fcL(s, lang)]],
      };
    },
  }),
  /** Name of the credential, issuer, validity. */
  credential: (lang) => ({
    title: lang === 'es' ? '¿Cómo se llama el documento en su estado?' : 'What is the credential called in your state?', cta: lang === 'es' ? 'Ver si lo necesita' : 'See if you need it', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      return {
        head: [lang === 'es' ? `Documento de ${stateName(s, lang)}` : `${stateName(s, lang)} credential`, cardName(s, lang) ?? w.nc],
        rows: [[lang === 'es' ? 'Emitido por' : 'Issued by', s.agency], [lang === 'es' ? 'Validez' : 'Valid for', validity(s, lang)], [lang === 'es' ? 'Obligatorio para' : 'Required for', whoShort(s, lang)]],
      };
    },
  }),
  /** State card fee, replacement, validity. */
  cardfee: (lang) => ({
    title: lang === 'es' ? 'Lo que cobra el estado por la tarjeta' : 'What the state charges for the card', cta: lang === 'es' ? 'Calcular el costo total' : 'Work out the total cost', ctaPage: 'how-much',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      return {
        head: [lang === 'es' ? `Tarifa del estado, ${stateName(s, lang)}` : `State fee, ${stateName(s, lang)}`, fee(s.card.stateFee, lang)],
        rows: [[lang === 'es' ? 'Duplicado' : 'Replacement', fee(s.card.replacementFee, lang)], [lang === 'es' ? 'Validez' : 'Valid for', validity(s, lang)], [w.free, fcL(s, lang)]],
        note: note(s, 'feeNote', lang) ?? undefined,
      };
    },
  }),
  /** Online course, proctored exam. */
  online: (lang) => ({
    title: lang === 'es' ? '¿Puedo hacerlo todo en línea?' : 'Can I do it all online?', cta: lang === 'es' ? 'Ver si necesito la tarjeta' : 'See if I need the card', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang);
      const all = s.card.onlineAllowed === true && s.card.inPersonExamRequired === false ? w.yes : s.card.onlineAllowed === false || s.card.inPersonExamRequired === true ? w.no : w.nc;
      return {
        head: [lang === 'es' ? `En línea de principio a fin, ${stateName(s, lang)}` : `Online from start to finish, ${stateName(s, lang)}`, all],
        rows: [[lang === 'es' ? 'Curso en línea aceptado' : 'Online course accepted', yn(s.card.onlineAllowed, lang)], [lang === 'es' ? 'Examen presencial o supervisado' : 'In-person or proctored exam', yn(s.card.inPersonExamRequired, lang)], [w.free, fcL(s, lang)]],
      };
    },
  }),
  /** Free course and cheapest legal total. */
  free: (lang) => ({
    title: lang === 'es' ? 'La opción gratuita en su estado' : 'The free route in your state', cta: lang === 'es' ? 'Ver si necesito la tarjeta' : 'See if I need the card', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }],
    run: (v) => {
      const s = at(v), w = W(lang), f = freeCourse(s);
      const mp = freeRoutePayment(s);
      const tot = f === 'approved' ? (mp != null ? `${money(mp, lang)} (${lang === 'es' ? 'según BoatUS' : 'as stated by BoatUS'})` : s.card.stateFee != null ? money(s.card.stateFee, lang) : (lang === 'es' ? 'curso gratis; tarifa no publicada' : 'free course; fee not published')) : (lang === 'es' ? 'curso de pago aprobado por el estado' : 'paid state-approved course');
      return {
        head: [lang === 'es' ? `Costo legal más bajo, ${stateName(s, lang)}` : `Cheapest legal cost, ${stateName(s, lang)}`, tot],
        rows: [[w.free, fcL(s, lang)], [lang === 'es' ? 'Tarifa del estado' : 'State fee', fee(s.card.stateFee, lang)], [lang === 'es' ? 'Obligatorio para' : 'Required for', whoShort(s, lang)]],
      };
    },
  }),
  /** Age: allowed alone? */
  age: (lang) => ({
    title: lang === 'es' ? '¿Puede manejar solo a esta edad?' : 'Can you operate alone at this age?', cta: lang === 'es' ? 'Comprobar con la fecha de nacimiento' : 'Check with a date of birth', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }, { id: 'age', label: lang === 'es' ? 'Edad' : 'Age', def: 14, unit: W(lang).yrs, max: 99 }],
    run: (v) => {
      const s = at(v), w = W(lang), a = Math.floor(v.age ?? 14);
      const ok = (m: number | null) => (m == null ? w.nc : a >= m ? w.yes : w.no);
      return {
        head: [lang === 'es' ? `Lancha de motor sin compañía, ${stateName(s, lang)}` : `Motorboat alone, ${stateName(s, lang)}`, ok(s.minAge.motorboat)],
        rows: [[lang === 'es' ? 'Edad mínima, lancha' : 'Minimum age, motorboat', s.minAge.motorboat != null ? `${s.minAge.motorboat} ${w.yrs}` : w.nc], [lang === 'es' ? 'Moto acuática sin compañía' : 'PWC alone', ok(s.minAge.pwc)], [lang === 'es' ? 'Edad mínima, moto acuática' : 'Minimum age, PWC', s.minAge.pwc != null ? `${s.minAge.pwc} ${w.yrs}` : w.nc]],
        note: note(s, 'minAgeNote', lang) ?? undefined,
      };
    },
  }),
  /** PWC rules. */
  pwc: (lang) => ({
    title: lang === 'es' ? 'Moto acuática: edad y tarjeta' : 'Jet ski: age and card', cta: lang === 'es' ? 'Comprobar mi caso' : 'Check my case', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }, { id: 'age', label: lang === 'es' ? 'Edad' : 'Age', def: 16, unit: W(lang).yrs, max: 99 }],
    run: (v) => {
      const s = at(v), w = W(lang), a = Math.floor(v.age ?? 16);
      const pm = s.minAge.pwc;
      return {
        head: [lang === 'es' ? `Manejar sola una moto acuática a los ${a}, ${stateName(s, lang)}` : `Operate a PWC alone at ${a}, ${stateName(s, lang)}`, pm == null ? w.nc : a >= pm ? w.yes : w.no],
        rows: [[lang === 'es' ? 'Edad mínima' : 'Minimum age', pm != null ? `${pm} ${w.yrs}` : w.nc], [lang === 'es' ? 'La regla de la tarjeta cubre motos acuáticas' : 'Card rule covers PWC', yn(s.rule.pwc, lang)], [lang === 'es' ? 'Obligatorio para' : 'Required for', whoShort(s, lang)]],
        note: note(s, 'pwcExtra', lang) ?? undefined,
      };
    },
  }),
  /** Total cost with a paid course price. */
  cost: (lang) => ({
    title: lang === 'es' ? 'Costo total: curso + tarifa del estado' : 'Total cost: course + state fee', cta: lang === 'es' ? 'Ver si necesito la tarjeta' : 'See if I need the card', ctaPage: 'home',
    inputs: [{ id: 'state', label: W(lang).state, def: DEF, options: opts(lang) }, { id: 'price', label: lang === 'es' ? 'Precio del curso de pago elegido' : 'Price of a paid course you found', def: 40, unit: '$', max: 1000 }],
    run: (v) => {
      const s = at(v), w = W(lang), f = freeCourse(s), p = Math.max(0, v.price ?? 0), sf = s.card.stateFee, mp = freeRoutePayment(s);
      return {
        head: [lang === 'es' ? `Lo mínimo legal, ${stateName(s, lang)}` : `Legal minimum, ${stateName(s, lang)}`, f === 'approved' ? (mp != null ? `${money(mp, lang)} (${lang === 'es' ? 'según BoatUS' : 'as stated by BoatUS'})` : sf != null ? money(sf, lang) : (lang === 'es' ? 'curso gratis' : 'free course')) : sf != null ? money(p + sf, lang) : money(p, lang)],
        rows: [[lang === 'es' ? 'Con el curso de pago' : 'With the paid course', sf != null ? money(p + sf, lang) : `${money(p, lang)} + ${w.nc}`], [lang === 'es' ? 'Tarifa del estado' : 'State fee', fee(sf, lang)], [w.free, fcL(s, lang)]],
        note: f === 'approved' ? (lang === 'es' ? 'Aquí se acepta un curso gratuito: pagar un curso es una elección, no una obligación.' : 'A free course is accepted here: paying for a course is a choice, not a requirement.') : undefined,
      };
    },
  }),
  /** Compare two states. */
  compare: (lang) => ({
    title: lang === 'es' ? 'Comparar dos estados' : 'Compare two states', cta: lang === 'es' ? 'Ver todos los estados' : 'See every state', ctaPage: 'states',
    inputs: [{ id: 'state', label: lang === 'es' ? 'Estado A' : 'State A', def: DEF, options: opts(lang) }, { id: 'b', label: lang === 'es' ? 'Estado B' : 'State B', def: stateIdx('GA'), options: opts(lang) }],
    run: (v) => {
      const a = at(v), b = at(v, 'b');
      return {
        head: [`${stateName(a, lang)} / ${stateName(b, lang)}`, `${whoShort(a, lang)} / ${whoShort(b, lang)}`],
        rows: [[lang === 'es' ? 'Tarifa del estado' : 'State fee', `${fee(a.card.stateFee, lang)} / ${fee(b.card.stateFee, lang)}`], [lang === 'es' ? 'Edad mínima, lancha' : 'Minimum age, motorboat', `${a.minAge.motorboat ?? '–'} / ${b.minAge.motorboat ?? '–'}`], [W(lang).free, `${fcL(a, lang)} / ${fcL(b, lang)}`]],
      };
    },
  }),
};
export function getSpec(kind: string, lang: L): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini spec ${kind}`);
  return f(lang);
}
export const SPEC_KINDS = Object.keys(SPECS);
