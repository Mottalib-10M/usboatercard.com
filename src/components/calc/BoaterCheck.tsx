/**
 * "Do I need a boater card?" (main tool): state + date of birth + boat + engine power + day of the
 * outing → yes / no / not confirmed, with the reason, the minimum age to operate alone, the card,
 * the state fee and the cheapest legal route. First render = build defaults (__BUILD_DAY__);
 * today's date and a shared link are applied after mount (RECETTE §17.5). Nothing leaves the browser.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { STATES, stateByCode, stateName, cardName, ruleText, freeCourse, verified, archivedDates } from '../../lib/engine/states';
import { needsCard, totalCost, freeRoutePayment, type Vessel } from '../../lib/engine/boater';
import { dateL, money } from '../../lib/format-l';
import { readParams, str, num, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
const T = {
  en: {
    state: 'State where you will boat', dob: 'Date of birth', vessel: 'Boat', hp: 'Engine power', len: 'Sailboat length', day: 'Day of the outing',
    vessels: { motorboat: 'Motorboat', pwc: 'Personal watercraft (jet ski)', sail: 'Sailboat, no motor' } as Record<Vessel, string>,
    yes: 'Yes, you need the card', no: 'No card needed', unknown: 'Not confirmed', unverified: 'State not verified yet',
    why: {
      'no-state-requirement': 'This state has no general boater education requirement.',
      'not-yet-in-force': 'The requirement is not in force yet on that day.',
      'vessel-below-threshold': 'This boat is below the size or power the rule covers.',
      'born-before-cutoff': 'You were born before the cut-off date.',
      'born-on-or-after-cutoff': 'You were born on or after the cut-off date.',
      'older-than-age-band': 'The rule only covers younger operators.',
      'younger-than-age-band': 'Below the age covered, the state sets its own limits.',
      'driver-license-satisfies': 'A valid driver license satisfies the rule here.',
      'vessel-rule-not-published': 'The state page does not say whether this type of boat is covered.',
      'all-operators': 'The rule covers every operator of this boat.',
      'state-not-verified': 'We have not yet confirmed this state on an official page. Check the agency.',
    } as Record<string, string>,
    age: 'Your age that day', alone: 'Minimum age to operate alone', tooYoung: 'below the minimum age to operate alone', card: 'Credential', fee: 'State fee', free: 'Free BoatUS course', cost: 'Cheapest legal route',
    ok: 'accepted', notOk: 'not accepted', na: 'not available', nc: 'not confirmed', none: 'none published', yrs: 'yrs', checked: 'Read on', src: 'Official page',
    freeRoute: (f: string) => `free course + ${f} state fee`, paid: 'course price set by each approved provider',
  },
  es: {
    state: 'Estado donde navegará', dob: 'Fecha de nacimiento', vessel: 'Embarcación', hp: 'Potencia del motor', len: 'Eslora del velero', day: 'Día de la salida',
    vessels: { motorboat: 'Lancha de motor', pwc: 'Moto acuática (jet ski)', sail: 'Velero sin motor' } as Record<Vessel, string>,
    yes: 'Sí, necesita la tarjeta', no: 'No necesita tarjeta', unknown: 'No confirmado', unverified: 'Estado aún no verificado',
    why: {
      'no-state-requirement': 'Este estado no tiene un requisito general de educación náutica.',
      'not-yet-in-force': 'El requisito aún no está en vigor ese día.',
      'vessel-below-threshold': 'Esta embarcación está por debajo del tamaño o la potencia que cubre la regla.',
      'born-before-cutoff': 'Usted nació antes de la fecha de corte.',
      'born-on-or-after-cutoff': 'Usted nació en la fecha de corte o después.',
      'older-than-age-band': 'La regla solo cubre a operadores más jóvenes.',
      'younger-than-age-band': 'Por debajo de la edad cubierta, el estado fija sus propios límites.',
      'driver-license-satisfies': 'Aquí una licencia de conducir válida cumple la regla.',
      'vessel-rule-not-published': 'La página del estado no dice si este tipo de embarcación está cubierto.',
      'all-operators': 'La regla cubre a todo operador de esta embarcación.',
      'state-not-verified': 'Aún no hemos confirmado este estado en una página oficial. Consulte la agencia.',
    } as Record<string, string>,
    age: 'Su edad ese día', alone: 'Edad mínima para manejar sin compañía', tooYoung: 'por debajo de la edad mínima para manejar solo', card: 'Documento', fee: 'Tarifa del estado', free: 'Curso gratuito BoatUS', cost: 'Opción legal más barata',
    ok: 'aceptado', notOk: 'no aceptado', na: 'no disponible', nc: 'no confirmado', none: 'no publicada', yrs: 'años', checked: 'Leído el', src: 'Página oficial',
    freeRoute: (f: string) => `curso gratis + ${f} del estado`, paid: 'precio del curso fijado por cada proveedor aprobado',
  },
} as const;

interface Props { lang?: 'en' | 'es'; state?: string; idPrefix?: string; vessel?: Vessel }
const defaultDob = (day: string) => `${Number(day.slice(0, 4)) - 30}-06-15`;
const ISO = /^\d{4}-\d{2}-\d{2}$/;

export default function BoaterCheck({ lang = 'en', state = 'FL', idPrefix = 'c', vessel: v0 = 'motorboat' }: Props) {
  const L = T[lang];
  const [code, setCode] = useState(state);
  const [dob, setDob] = useState(defaultDob(__BUILD_DAY__));
  const [day, setDay] = useState(__BUILD_DAY__);
  const [vessel, setVessel] = useState<Vessel>(v0);
  const [hp, setHp] = useState(v0 === 'pwc' ? 130 : 90);
  const [len, setLen] = useState(16);
  useEffect(() => {
    const u = readParams(window.location.search);
    const t = new Date().toISOString().slice(0, 10);
    const c = str(u, 'state', state); if (STATES.some((s) => s.code === c)) setCode(c);
    const b = str(u, 'dob', ''); if (ISO.test(b)) setDob(b);
    const d = str(u, 'day', ''); setDay(ISO.test(d) ? d : t);
    const ve = str(u, 'boat', v0) as Vessel; if (['motorboat', 'pwc', 'sail'].includes(ve)) setVessel(ve);
    const h = num(u, 'hp', NaN); if (Number.isFinite(h)) setHp(h);
  }, []);
  useEffect(() => { updateURL({ state: code, dob, day, boat: vessel, hp: vessel === 'sail' ? undefined : hp }); }, [code, dob, day, vessel, hp]);
  const st = stateByCode(code);
  const ok = ISO.test(dob) && ISO.test(day) && dob <= day;
  const ans = useMemo(() => (ok ? needsCard(st, { birthDate: dob, onDate: day, vessel, hp: vessel === 'sail' ? 0 : hp, lengthFt: len }) : null), [st, dob, day, vessel, hp, len, ok]);
  const cost = totalCost(st, 0);
  const fc = freeCourse(st);
  const ver = verified(st);
  const head = !ans ? '–' : !ver ? L.unverified : ans.need === 'yes' ? L.yes : ans.need === 'no' ? L.no : L.unknown;
  const color = !ans || !ver || ans.need === 'unknown' ? 'text-amber-800' : ans.need === 'yes' ? 'text-accent-800' : 'text-green-800';
  const inputCls = 'h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const sName = stateName(st, lang);
  const feeL = st.card.stateFee == null ? L.none : st.card.stateFee === 0 ? money(0, lang) : money(st.card.stateFee, lang);
  const mp = freeRoutePayment(st);
  const arch = archivedDates(st);
  const route = mp != null ? (lang === 'es' ? `pago que indica BoatUS (${st.boatus?.payment?.kind === 'enrollment' ? 'al inscribirse' : 'tarjeta del estado'})` : `payment stated by BoatUS (${st.boatus?.payment?.kind === 'enrollment' ? 'at enrollment' : 'state card'})`) : fc === 'approved' && st.card.stateFee != null ? L.freeRoute(money(st.card.stateFee, lang)) : fc === 'approved' ? (lang === 'es' ? 'curso gratis' : 'free course') : L.paid;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <form className="grid content-start gap-x-4 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-state`} label={L.state} value={code} onChange={setCode} options={STATES.map((s) => ({ value: s.code, label: stateName(s, lang) }))} />
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${idPrefix}-dob`} className="mb-1 block text-sm font-medium text-navy-700">{L.dob}</label>
          <input id={`${idPrefix}-dob`} type="date" value={dob} max={day} onChange={(e) => setDob(e.target.value)} className={inputCls} />
          <span />
        </div>
        <SelectField id={`${idPrefix}-boat`} label={L.vessel} value={vessel} onChange={(x) => setVessel(x as Vessel)} options={(['motorboat', 'pwc', 'sail'] as Vessel[]).map((k) => ({ value: k, label: L.vessels[k] }))} />
        {vessel === 'sail'
          ? <NumberField id={`${idPrefix}-len`} label={L.len} value={len} onChange={setLen} unit="ft" max={200} />
          : <NumberField id={`${idPrefix}-hp`} label={L.hp} value={hp} onChange={setHp} unit="hp" max={2000} />}
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${idPrefix}-day`} className="mb-1 block text-sm font-medium text-navy-700">{L.day}</label>
          <input id={`${idPrefix}-day`} type="date" value={day} onChange={(e) => setDay(e.target.value)} className={inputCls} />
          <span />
        </div>
      </form>
      <div data-resultat aria-live="polite" className="rounded-xl border border-accent-200 bg-accent-50/60 p-4">
        <p className="text-sm font-medium text-navy-600">{sName} · {L.vessels[vessel]}</p>
        <p className={`mt-1 text-3xl font-bold ${color}`}>{head}</p>
        {ans && <p className="mt-1 text-sm text-navy-800">{ans.reasons.map((r) => L.why[r] ?? r).join(' ')}</p>}
        {ans && ans.tooYoungAlone && <p className="mt-2 text-sm font-medium text-amber-800" role="status">{ans.age} {L.yrs}: {L.tooYoung} ({ans.minAgeAlone}).</p>}
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.age}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{ans ? `${ans.age} ${L.yrs}` : '–'}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.alone}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{ans?.minAgeAlone != null ? `${ans.minAgeAlone} ${L.yrs}` : L.nc}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.card}</td><td className="py-1.5 text-right text-navy-900">{cardName(st, lang) ?? L.nc}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.fee}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{feeL}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.free}</td><td className="py-1.5 text-right text-navy-900">{fc === 'approved' ? L.ok : fc === 'not-approved' ? L.notOk : fc === 'not-available' ? L.na : L.nc}</td></tr>
          <tr><td className="py-1.5 pr-2 text-navy-700">{L.cost}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{cost.total != null && fc === 'approved' ? <>{money(cost.total, lang)}<span className="block text-xs text-navy-600">{route}</span></>
            // Frais de l'État non publiés mais cours gratuit accepté : on le dit, au lieu d'un « – » (Floride, 2026-10-24).
            : fc === 'approved' ? <>{lang === 'es' ? 'Curso gratis' : 'Free course'}<span className="block text-xs text-navy-600">{lang === 'es' ? 'tasa estatal no publicada' : 'state fee not published'}</span></>
            : <>–<span className="block text-xs text-navy-600">{route}</span></>}</td></tr>
        </tbody></table>
        {ver && ruleText(st, lang) && <p className="mt-3 text-xs text-navy-700">{ruleText(st, lang)}</p>}
        <p className="mt-2 text-xs text-navy-600">{L.src}: <a href={st.agencyUrl} target="_blank" rel="nofollow noopener noreferrer" className="underline">{st.agency}</a> · {arch.length ? (lang === 'es' ? `Copia archivada (web.archive.org) del ${arch.map((d) => dateL(d, lang)).join(', ')}` : `Archived copy (web.archive.org) of ${arch.map((d) => dateL(d, lang)).join(', ')}`) : `${L.checked} ${dateL(st.checked, lang)}`}</p>
      </div>
    </div>
  );
}
