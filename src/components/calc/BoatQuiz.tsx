/**
 * Boating practice test. First render = the build's seeded test for the page's state and type
 * (RECETTE §17.5); a new draw only happens after a click. Scored against an 80 % practice target,
 * said as such: the pass mark of each state's course exam is set by the course, not by us.
 * Nothing leaves the browser.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { buildTest, passMark, score, testLength, type Lang, type TestType } from '../../lib/engine/quiz';
import { STATES, stateByCode, stateName } from '../../lib/engine/states';
import { pct } from '../../lib/format-l';
import { readParams, str, updateURL } from '../../lib/url-state';

const T = {
  en: {
    state: 'Your state', type: 'Test', types: { full: 'Full test (federal rules + your state)', rules: 'Navigation rules, lights and buoys', equipment: 'Equipment, law and safety' },
    q: (i: number, n: number) => `Question ${i} of ${n}`, next: 'Next question', finish: 'See my result', again: 'New test, new questions', review: 'Review my mistakes',
    right: 'Correct.', wrong: 'Not quite.', answer: 'Right answer:', score: 'Your score', of: 'correct out of', answered: 'answered',
    pass: (need: number, n: number, p: string) => `Practice target: ${need} of ${n} (${p})`,
    canMiss: (k: number) => (k === 0 ? 'No more mistakes allowed' : `You can still miss ${k}`),
    status: { start: 'Pick an answer to start', 'on-track': 'On track', 'at-risk': 'One more mistake drops you below the target', pass: 'Target reached', fail: 'Below the practice target' },
    note: 'Practice questions written by us from the federal Navigation Rules, 33 CFR and each state\'s verified rules. Not an official course exam.', length: 'Questions',
    full: (n: number) => `Real length (${n})`, quick: 'Quick 20', mistakes: 'Questions you missed', none: 'No mistakes: well done.',
  },
  es: {
    state: 'Su estado', type: 'Examen', types: { full: 'Examen completo (reglas federales + su estado)', rules: 'Reglas de navegación, luces y boyas', equipment: 'Equipo, ley y seguridad' },
    q: (i: number, n: number) => `Pregunta ${i} de ${n}`, next: 'Siguiente pregunta', finish: 'Ver mi resultado', again: 'Nuevo examen, otras preguntas', review: 'Repasar mis errores',
    right: 'Correcto.', wrong: 'No exactamente.', answer: 'Respuesta correcta:', score: 'Su puntuación', of: 'correctas de', answered: 'contestadas',
    pass: (need: number, n: number, p: string) => `Meta de práctica: ${need} de ${n} (${p})`,
    canMiss: (k: number) => (k === 0 ? 'Ya no puede fallar ninguna' : `Todavía puede fallar ${k}`),
    status: { start: 'Elija una respuesta para empezar', 'on-track': 'Va por buen camino', 'at-risk': 'Un error más y queda por debajo de la meta', pass: 'Meta alcanzada', fail: 'Por debajo de la meta de práctica' },
    note: 'Preguntas de práctica escritas por nosotros a partir de las Reglas de Navegación federales, el 33 CFR y las reglas verificadas de cada estado. No es un examen oficial de curso.', length: 'Preguntas',
    full: (n: number) => `Duración real (${n})`, quick: 'Rápido de 20', mistakes: 'Preguntas que falló', none: 'Sin errores: muy bien.',
  },
} as const;

interface Props { lang?: Lang; state?: string; type?: TestType; idPrefix?: string; statePages?: Record<string, string> }

export default function BoatQuiz({ lang = 'en', state = 'FL', type = 'full', idPrefix = 'q', statePages = {} }: Props) {
  const L = T[lang];
  const [code, setCode] = useState(state);
  const [kind, setKind] = useState<TestType>(type);
  const [quick, setQuick] = useState(false);
  const [seed, setSeed] = useState(`${state}-${type}`);
  const st = stateByCode(code);
  const full = testLength(kind, st);
  const n = quick ? Math.min(20, full) : full;
  const test = useMemo(() => buildTest(kind, code, lang, seed, n), [kind, code, lang, seed, n]);
  const [answers, setAnswers] = useState<Array<number | null>>(() => test.map(() => null));
  const [cur, setCur] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const pm = passMark(test.length);
  const sc = score(answers, test, pm.need);
  const done = sc.answered === test.length;

  useEffect(() => { // shared link: apply state and type after the first render
    const u = readParams(window.location.search);
    const c = str(u, 'state', state), k = str(u, 'test', type) as TestType;
    if (STATES.some((s) => s.code === c) && c !== state) setCode(c);
    if (['full', 'rules', 'equipment'].includes(k) && k !== type) setKind(k);
  }, []);
  useEffect(() => { setAnswers(test.map(() => null)); setCur(0); setShowReview(false); }, [test]);
  useEffect(() => { updateURL({ state: code === state ? undefined : code, test: kind === type ? undefined : kind }); }, [code, kind]);

  const q = test[cur];
  const a = answers[cur];
  const choose = (i: number) => { if (a !== null && a !== undefined) return; setAnswers((o) => o.map((x, j) => (j === cur ? i : x))); };
  const newTest = () => setSeed(`${code}-${kind}-${Math.random().toString(36).slice(2, 8)}`);
  const share = sc.answered ? sc.right / sc.answered : 0;
  const stName = stateName(st, lang);
  const statusColor = sc.status === 'pass' || sc.status === 'on-track' ? 'text-green-800' : sc.status === 'start' ? 'text-navy-600' : 'text-red-700';

  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-3 sm:grid-cols-2">
          <SelectField id={`${idPrefix}-state`} label={L.state} value={code} onChange={(v) => setCode(v)} options={STATES.map((s) => ({ value: s.code, label: stateName(s, lang) }))} />
          <SelectField id={`${idPrefix}-type`} label={L.type} value={kind} onChange={(v) => setKind(v as TestType)} options={(['full', 'rules', 'equipment'] as TestType[]).map((k) => ({ value: k, label: L.types[k] }))} />
        </div>
        <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-navy-600">
            <span>{L.q(cur + 1, test.length)}</span>
            {full > 20 && (
              <span className="inline-grid grid-flow-col auto-cols-fr overflow-hidden rounded-lg border border-navy-300 text-xs">
                <button type="button" aria-pressed={!quick} onClick={() => setQuick(false)} className={`h-full px-2.5 py-1.5 ${!quick ? 'bg-accent-700 text-white' : 'bg-white text-navy-700'}`}>{L.full(full)}</button>
                <button type="button" aria-pressed={quick} onClick={() => setQuick(true)} className={`h-full px-2.5 py-1.5 ${quick ? 'bg-accent-700 text-white' : 'bg-white text-navy-700'}`}>{L.quick}</button>
              </span>
            )}
          </div>
          {q && (
            <fieldset className="mt-3">
              <legend className="text-lg font-semibold leading-snug text-navy-900">{q.q}</legend>
              <div className="mt-4 grid gap-2">
                {q.options.map((o, i) => {
                  const picked = a === i, isRight = i === q.correct, shown = a !== null && a !== undefined;
                  const cls = !shown ? 'border-navy-300 bg-white hover:border-accent-500 hover:bg-accent-50' : isRight ? 'border-green-700 bg-green-50 text-green-900' : picked ? 'border-red-700 bg-red-50 text-red-900' : 'border-navy-200 bg-white text-navy-500';
                  return <button key={i} type="button" onClick={() => choose(i)} aria-pressed={picked} className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-base ${cls}`}>{o}</button>;
                })}
              </div>
              {a !== null && a !== undefined && (
                <div className="mt-4 border-l-4 border-accent-700 bg-accent-50 px-4 py-3 text-sm text-navy-800" aria-live="polite">
                  <p><strong>{a === q.correct ? L.right : L.wrong}</strong>{a !== q.correct && <> {L.answer} {q.options[q.correct]}.</>} {q.x}</p>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                {a !== null && a !== undefined && cur < test.length - 1 && <button type="button" onClick={() => setCur(cur + 1)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.next}</button>}
                {done && <button type="button" onClick={() => setShowReview(true)} className="h-12 rounded-lg bg-accent-700 px-5 font-semibold text-white hover:bg-accent-800">{L.review}</button>}
                <button type="button" onClick={newTest} className="h-12 rounded-lg border border-navy-300 px-5 font-medium text-navy-800 hover:bg-navy-50">{L.again}</button>
              </div>
            </fieldset>
          )}
        </div>
        {showReview && (
          <div className="rounded-xl border border-navy-200 bg-white p-4 text-sm">
            <p className="font-semibold text-navy-900">{L.mistakes}</p>
            {test.filter((t, i) => answers[i] !== t.correct).length === 0 ? <p className="mt-2 text-navy-700">{L.none}</p> : (
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-navy-800">{test.map((t, i) => (answers[i] !== t.correct ? <li key={t.id}><span className="font-medium">{t.q}</span> {L.answer} {t.options[t.correct]}.</li> : null))}</ol>
            )}
          </div>
        )}
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-600">{L.score} · {stName}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{sc.right}<span className="text-xl font-semibold text-navy-600"> / {sc.answered}</span></p>
        <p className="text-sm text-navy-700">{sc.right} {L.of} {sc.answered} {L.answered}{sc.answered ? ` · ${pct(share, lang)}` : ''}</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded bg-navy-200" aria-hidden="true"><div className="h-2 bg-accent-700" style={{ width: `${(sc.answered / test.length) * 100}%` }} /></div>
        <p className={`mt-3 text-base font-semibold ${statusColor}`}>{L.status[sc.status]}</p>
        <table className="mt-2 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 text-navy-700">{L.pass(pm.need, test.length, pct(pm.pct, lang))}</td></tr>
          <tr><td className="py-1.5 text-navy-700">{L.canMiss(sc.canMiss)}</td></tr>
        </tbody></table>
        {statePages[code] && <a href={statePages[code]} className="mt-3 inline-block text-sm font-medium text-accent-700 underline">{stName} →</a>}
        <p className="mt-3 text-xs text-navy-600">{L.note}</p>
      </div>
    </div>
  );
}
