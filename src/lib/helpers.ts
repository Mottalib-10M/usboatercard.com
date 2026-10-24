/** Writing helpers handed to every page: links, state figures read from the data, tables, sources. */
import { route, hasRoute, ROUTES, type Locale } from '../i18n/routes';
import { STATES, VERIFIED, UNVERIFIED, stateByCode, stateName, cardName, ruleText, freeCourse, verified, note, exemptions, META, archivedDates, type StateRec } from './engine/states';
import { ruleOn, freeRoutePayment } from './engine/boater';
import { whoShort } from './mini-specs';
import { BANK, stateQuestions } from './engine/quiz';
import { formatNumberL, money, pct, dateL } from './format-l';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = [], lang: Locale = 'en') {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c, lang)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
declare const __BUILD_DAY__: string;
const TODAY = typeof __BUILD_DAY__ === 'string' ? __BUILD_DAY__ : '2026-10-24';

export function helpers(lang: Locale, strict = false) {
  const es = lang === 'es';
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !process.env.PAGES_DRAFT) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const statePage = (code: string) => `state-${code.toLowerCase()}`;
  /** Link to a state's own page in this language when it exists, else its name. */
  const sl = (code: string, text?: string) => { const s = stateByCode(code); const n = text ?? stateName(s, lang); return hasRoute(statePage(code), lang) ? a(statePage(code), n) : n; };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  /** Link to the official page of a state (its agency page, or the source that supports a field). */
  const os = (code: string, text: string, field?: string) => { const s = stateByCode(code); const u = (field && s.sources.find((x) => x.supports.includes(field))?.url) || s.agencyUrl; return ext(u, text); };
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const m = (n: number) => money(n, lang);
  const num = (n: number, d = 0) => formatNumberL(n, lang, d);
  const pc = (x: number, d = 0) => pct(x, lang, d);
  const nc = es ? 'no confirmado' : 'not confirmed';
  const yrs = es ? 'años' : 'years';
  const list = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${es ? 'y' : 'and'} ${xs[xs.length - 1]}`);
  /** One sentence on what BoatUS says must or may be paid on its free route, with a link to its state page. */
  const payL = (s: StateRec): string => {
    const p = s.boatus?.status === 'approved' ? s.boatus.payment : null;
    if (!p) return '';
    const lk = (t: string) => ext(p.url, t);
    const amt = money(p.amount, lang);
    if (p.kind === 'enrollment') return es ? `La BoatUS Foundation indica que cobra ${amt} al inscribirse en este estado (${lk('su página')}), así que la vía «gratis» cuesta ${amt}.` : `The BoatUS Foundation states that it collects ${amt} at enrollment in this state (${lk('its page')}), so the "free" route costs ${amt}.`;
    if (p.kind === 'card-required') return es ? `La BoatUS Foundation indica que después del curso hay que comprar la tarjeta permanente por ${amt} (${lk('su página')}).` : `The BoatUS Foundation states that the permanent card must then be bought for ${amt} (${lk('its page')}).`;
    return es ? `La BoatUS Foundation ofrece además una tarjeta de plástico opcional por ${amt} (${lk('su página')}); no es obligatoria.` : `The BoatUS Foundation also sells an optional plastic card for ${amt} (${lk('its page')}); it is not required.`;
  };
  /** "read on the official pages on <date>" or, for a state read on archived copies, "read on archived copies (web.archive.org) dated …". */
  const readOnL = (s: StateRec): string => {
    const ad = archivedDates(s);
    const live = s.sources.some((x) => !x.archived);
    if (!ad.length) return es ? `leída en las páginas oficiales el ${dateL(s.checked, lang)}` : `read on the official pages on ${dateL(s.checked, lang)}`;
    const ds = list(ad.map((d) => dateL(d, lang)));
    return es
      ? `leída en copias archivadas (web.archive.org) de las páginas oficiales, fechadas ${ds}${live ? `, y en las páginas oficiales en vivo el ${dateL(s.checked, lang)}` : ''}, porque el sitio oficial rechaza la lectura automática`
      : `read on archived copies (web.archive.org) of the official pages dated ${ds}${live ? `, and on the live official pages on ${dateL(s.checked, lang)}` : ''}, because the official site refuses automated reading`;
  };
  const S = (code: string) => {
    const s = stateByCode(code);
    const r = ruleOn(s.rule, TODAY);
    const fc = freeCourse(s);
    const validity = !s.card.validity ? nc : s.card.validity === 'lifetime' ? (es ? 'de por vida' : 'for life') : s.card.validity.replace(/years?/, es ? 'años' : 'years');
    return {
      ...s, s, verified: verified(s), nameL: stateName(s, lang), cardL: cardName(s, lang) ?? nc, ruleL: ruleText(s, lang) ?? '', whoL: whoShort(s, lang),
      cutoff: r.bornOnOrAfter && r.bornOnOrAfter > '1801-01-01' ? r.bornOnOrAfter : null,
      cutoffL: r.bornOnOrAfter && r.bornOnOrAfter > '1801-01-01' ? dateL(r.bornOnOrAfter, lang) : null,
      hpL: s.rule.hpMin == null ? null : (note(s, 'hpNote', lang) ?? `${s.rule.hpMin} hp`),
      feeL: s.card.stateFee == null ? nc : money(s.card.stateFee, lang), replL: s.card.replacementFee == null ? nc : money(s.card.replacementFee, lang), validL: validity,
      free: fc, freeOk: fc === 'approved', freeL: fc === 'approved' ? (es ? 'aceptado' : 'accepted') : fc === 'not-approved' ? (es ? 'no aceptado' : 'not accepted') : fc === 'not-available' ? (es ? 'no disponible' : 'not available') : nc,
      freeUrl: s.boatus?.url ?? P.sources.boatus.url,
      /** Payment the BoatUS Foundation states on its own page for this state (fee at enrollment, card to buy, optional card). */
      pay: s.boatus?.payment ?? null,
      payL: payL(s),
      /** Cheapest legal total by the free course: the payment BoatUS says is mandatory, else the state fee. */
      cheapest: fc !== 'approved' ? null : (freeRoutePayment(s) ?? s.card.stateFee ?? null),
      /** Mandatory payment on the free route (null when BoatUS states none). */
      mustPay: freeRoutePayment(s),
      archived: archivedDates(s),
      readOnL: readOnL(s),
      motorAgeL: s.minAge.motorboat == null ? nc : `${s.minAge.motorboat} ${yrs}`, pwcAgeL: s.minAge.pwc == null ? nc : `${s.minAge.pwc} ${yrs}`,
      onlineL: s.card.onlineAllowed == null ? nc : s.card.onlineAllowed ? (es ? 'sí' : 'yes') : 'no',
      proctorL: s.card.inPersonExamRequired == null ? nc : s.card.inPersonExamRequired ? (es ? 'sí' : 'yes') : 'no',
      n: (k: Parameters<typeof note>[1]) => note(s, k, lang) ?? '',
      ex: exemptions(s, lang),
      stateQ: stateQuestions(s).length,
      checkedL: dateL(s.checked, lang),
    };
  };
  return {
    lang, es, a, sl, ext, os, src, m, num, pc, nc, yrs, list, S, STATES, VERIFIED, UNVERIFIED, META,
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al, lang),
    date: (iso: string) => dateL(iso, lang), stateName: (s: StateRec) => stateName(s, lang),
    counts: { questions: BANK.length, states: STATES.length, verified: VERIFIED.length, unverified: UNVERIFIED.length, archived: STATES.filter((s) => archivedDates(s).length > 0).length, stateQ: STATES.reduce((n, s) => n + stateQuestions(s).length, 0) },
    /** Ranking helper: states sorted by a numeric field (nulls dropped). */
    rank: (f: (s: StateRec) => number | null, dir: 1 | -1 = 1) => STATES.filter((s) => f(s) != null).sort((x, y) => dir * ((f(x) as number) - (f(y) as number))),
    /** States matching a predicate (verified records only). */
    where: (f: (s: StateRec) => boolean) => VERIFIED.filter(f),
    names: (xs: StateRec[]) => xs.map((s) => stateName(s, lang)),
    /** "49 states and DC" / "50 states": exact wording of a count of jurisdictions. */
    juris: (xs: StateRec[]) => { const dc = xs.some((s) => s.code === 'DC'); const n = xs.length - (dc ? 1 : 0); return es ? `${n} ${n === 1 ? 'estado' : 'estados'}${dc ? ' y DC' : ''}` : `${n} ${n === 1 ? 'state' : 'states'}${dc ? ' and DC' : ''}`; },
    /** Names of the states read on archived copies, with the copy dates. */
    archivedList: () => STATES.filter((s) => archivedDates(s).length > 0).map((s) => `${stateName(s, lang)} (${list(archivedDates(s).map((d) => dateL(d, lang)))})`),
    /** Day the BoatUS state pages were read for payments. */
    payRead: STATES.map((s) => s.boatus?.paymentRead).find((d): d is string => !!d) ?? TODAY,
    P, TODAY,
  };
}
export type Helpers = ReturnType<typeof helpers>;
