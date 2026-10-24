import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Shared figures of the page, read from the state file (never typed in). */
const F = (h: Helpers) => {
  const req = h.where((s) => s.required === true);
  const none = h.where((s) => s.required === false);
  const cut = h.where((s) => s.required === true && !!h.S(s.code).cutoff);
  const everyone = h.where((s) => s.required === true && !h.S(s.code).cutoff && s.rule.kind !== 'ageBand' && s.rule.kind !== 'pwcOnly');
  const sorted = [...cut].sort((a, b) => (h.S(a.code).cutoff as string).localeCompare(h.S(b.code).cutoff as string));
  const oldest = sorted[0], newest = sorted[sorted.length - 1];
  const phase = h.where((s) => !!(s.rule.phases && s.rule.phases.some((p) => p.from > h.TODAY)));
  const life = h.where((s) => s.required === true && s.card.validity === 'lifetime');
  return { req, none, cut, everyone, oldest, newest, phase, life };
};
const row = (h: Helpers, code: string) => {
  const x = h.S(code);
  if (!x.verified) return [h.sl(code), h.es ? 'aún no verificado' : 'not verified yet', '–', '–', '–', '–'];
  return [h.sl(code), x.whoL, x.required ? (x.hpL ?? (h.es ? 'todo motor' : 'any motor')) : '–', x.minAge.motorboat ?? '–', x.minAge.pwc ?? '–', x.required ? x.cardL : '–'];
};

export default definePage({
  id: 'states',
  group: 'card',
  order: 1,
  tool: { kind: 'check' },
  mini: { kind: 'mini:compare' },
  related: ['home', 'need-license', 'age', 'free-license', 'state-fl', 'state-ca'],
  sources: ['boatus', 'cfr175'],
  en: {
    slug: 'boating-license-requirements-by-state',
    nav: 'Requirements in all 50 states',
    card: 'One table: who needs the card, the power threshold, the minimum ages and the credential in each state.',
    title: 'Boating License Requirements by State: All 50 and DC',
    description: 'Boating license requirements by state in one table: birth-date cut-off or all ages, horsepower, minimum age for boats and jet skis and the name of each card.',
    h1: 'Boating license requirements in every state',
    intro: 'The rule of each state and DC side by side, as it stands today, with the check above to apply it to your own birth date, boat and day on the water.',
    resume: (h) => {
      const { req, none, cut, everyone, oldest, newest, phase } = F(h);
      return `Boater education is required in ${req.length} of the ${h.counts.verified} jurisdictions we verified on an official page, and ${none.length} have no general requirement for adult recreational operators. The rules fall into two families. In ${cut.length} states the card is required only from people born on or after a cut-off date, which runs from ${oldest ? `${h.S(oldest.code).cutoffL} in ${h.sl(oldest.code)}` : h.nc} to ${newest ? `${h.S(newest.code).cutoffL} in ${h.sl(newest.code)}` : h.nc}; older operators may go out without it. In ${everyone.length} others every operator of a covered boat needs it, whatever the age. On top of that, most states only count motors above a set power, almost all include personal watercraft, and ${phase.length ? `${h.list(h.names(phase))} ${phase.length > 1 ? 'are' : 'is'} still widening the rule in stages` : 'several states have widened their rule in stages recently'}. ${h.counts.unverified ? `${h.counts.unverified} jurisdictions are not verified yet and are shown as such.` : ''} Each line of the table links to the state page when there is one, and the check gives the answer for a given birth date and day.`;
    },
    faqs: (h) => {
      const { none, life, req } = F(h);
      return [
        { q: 'Which states do not require boater education?', a: `${none.length ? `Among the states we verified, ${h.list(h.names(none))} ${none.length > 1 ? 'have' : 'has'} no general education requirement for adult recreational operators.` : 'Every state we verified has some requirement.'} Those states can still set minimum ages, rules for young personal watercraft riders or court-ordered courses after a violation, so check the line of the state in the table before going out.` },
        { q: 'Why does my state use a birth date rather than an age?', a: 'A birth-date cut-off lets a state require education from new generations of boaters without sending experienced operators back to class. It also means the group covered grows every year by itself. Some states have moved the date in steps, and a few have replaced it with a requirement for everyone.' },
        { q: 'Is the card valid for life?', a: `In ${life.length} of the ${req.length} states with a requirement, the official page we read says the credential does not expire. Where the page is silent, the table shows nothing rather than a guess. A lost card can usually be replaced through the agency or the course provider for a small fee.` },
      ];
    },
    body: (h) => {
      const rows = h.STATES.map((s) => row(h, s.code));
      const { req, cut } = F(h);
      const pwcCovered = h.where((s) => s.required === true && s.rule.pwc === true);
      return `
<h2>The rule in each state today</h2>
<p>The table reads the state file built from each agency page. "Who needs it" is the rule in force on ${h.date(h.TODAY)}; "Power" is the engine size from which the rule applies to motorboats; the two ages are the youngest a person may operate a motorboat or a personal watercraft without an older person aboard, when the state publishes one.</p>
${h.table(['State', 'Who needs it', 'Power', 'Motorboat alone', 'PWC alone', 'Credential'], rows, `Recreational boater education in the ${h.counts.states} jurisdictions. A dash: not applicable or not published on the official pages read.`, ['l', 'l', 'l', 'r', 'r', 'l'])}
<h2>How to read a cut-off date</h2>
<p>"Born on or after January 1, 1988" means a person whose birthday is that day or later needs the card; someone born on December 31, 1987 does not, whatever their experience. ${cut.length} states use such a date. When a state also sets a power threshold, both conditions apply together: a person born after the date who runs a 9.9 hp outboard in a state that counts only motors of 10 hp or more needs no card. Personal watercraft are covered in ${pwcCovered.length} of the ${req.length} states with a requirement, often with their own minimum age.</p>
<h2>Compare two states</h2>
<p>Useful before a trip or a move: the mini-tool puts two state rules side by side.</p>
<!--tool:mini:compare|{"state":"FL","b":"GA"}-->
<h2>What the table does not show</h2>
<p>Exemptions differ from state to state and do not fit in a column: an adult card holder on board, a rental with the livery's briefing, a Coast Guard captain's license, a visit with another state's card. Each state page lists those its agency publishes. The table also leaves out registration, titling and the equipment you must carry, which follow the federal rules in ${h.src('cfr175', '33 CFR part 175')} and the state's own additions.</p>`;
    },
  },
  es: {
    slug: 'requisitos-licencia-de-navegacion-por-estado',
    nav: 'Requisitos en los 50 estados',
    card: 'Una tabla: quién necesita la tarjeta, la potencia, las edades mínimas y el documento de cada estado.',
    title: 'Requisitos de licencia de navegación por estado y DC',
    description: 'Requisitos de licencia de navegación por estado: quién necesita la tarjeta en los 50 estados y DC, edad, potencia, tarifa y curso gratis, según cada agencia.',
    h1: 'Requisitos de licencia de navegación en cada estado',
    intro: 'La regla de cada estado y de DC lado a lado, tal como está hoy, con la comprobación de arriba para aplicarla a su fecha de nacimiento, su embarcación y su día en el agua.',
    resume: (h) => {
      const { req, none, cut, everyone, oldest, newest, phase } = F(h);
      return `La educación náutica es obligatoria en ${req.length} de las ${h.counts.verified} jurisdicciones que verificamos en una página oficial, y ${none.length} no tienen un requisito general para los operadores adultos de recreo. Las reglas se dividen en dos familias. En ${cut.length} estados la tarjeta solo se exige a quienes nacieron a partir de una fecha de corte, que va del ${oldest ? `${h.S(oldest.code).cutoffL} en ${h.sl(oldest.code)}` : h.nc} al ${newest ? `${h.S(newest.code).cutoffL} en ${h.sl(newest.code)}` : h.nc}; los operadores mayores pueden salir sin ella. En otros ${everyone.length}, todo operador de una embarcación cubierta la necesita, tenga la edad que tenga. Además, la mayoría de los estados solo cuentan los motores por encima de cierta potencia, casi todos incluyen las motos acuáticas y ${phase.length ? `${h.list(h.names(phase))} ${phase.length > 1 ? 'siguen ampliando' : 'sigue ampliando'} la regla por etapas` : 'varios estados han ampliado su regla por etapas'}. ${h.counts.unverified ? `${h.counts.unverified} jurisdicciones aún no están verificadas y se muestran así.` : ''} Cada línea de la tabla enlaza a la página del estado cuando existe, y la comprobación da la respuesta para una fecha de nacimiento y un día concretos.`;
    },
    faqs: (h) => {
      const { none, life, req } = F(h);
      return [
        { q: '¿Qué estados no exigen educación náutica?', a: `${none.length ? `Entre los estados verificados, ${h.list(h.names(none))} no ${none.length > 1 ? 'tienen' : 'tiene'} un requisito general de educación para operadores adultos de recreo.` : 'Todos los estados verificados tienen algún requisito.'} Esos estados pueden fijar igualmente edades mínimas, reglas para los jóvenes en motos acuáticas o cursos impuestos por un juez tras una infracción, así que revise la línea del estado antes de salir.` },
        { q: '¿Por qué mi estado usa una fecha de nacimiento y no una edad?', a: 'Una fecha de corte permite exigir la educación a las nuevas generaciones de navegantes sin mandar de vuelta a clase a los operadores con experiencia. Además, el grupo cubierto crece solo cada año. Algunos estados han movido la fecha por etapas, y otros la han sustituido por un requisito para todos.' },
        { q: '¿La tarjeta vale de por vida?', a: `En ${life.length} de los ${req.length} estados con requisito, la página oficial consultada dice que el documento no caduca. Donde la página no lo dice, la tabla no muestra nada en lugar de suponerlo. Una tarjeta perdida suele reponerse a través de la agencia o del proveedor del curso por una tarifa pequeña.` },
      ];
    },
    body: (h) => {
      const rows = h.STATES.map((s) => row(h, s.code));
      const { req, cut } = F(h);
      const pwcCovered = h.where((s) => s.required === true && s.rule.pwc === true);
      return `
<h2>La regla de cada estado hoy</h2>
<p>La tabla lee el archivo de estados construido a partir de la página de cada agencia. «Quién la necesita» es la regla en vigor el ${h.date(h.TODAY)}; «Potencia» es el tamaño de motor a partir del cual la regla se aplica a las lanchas; las dos edades son las mínimas para manejar una lancha o una moto acuática sin una persona mayor a bordo, cuando el estado las publica.</p>
${h.table(['Estado', 'Quién la necesita', 'Potencia', 'Lancha sola', 'Moto acuática sola', 'Documento'], rows, `Educación náutica de recreo en las ${h.counts.states} jurisdicciones. Un guion: no se aplica o no aparece en las páginas oficiales consultadas.`, ['l', 'l', 'l', 'r', 'r', 'l'])}
<h2>Cómo leer una fecha de corte</h2>
<p>«Nacido a partir del 1 de enero de 1988» significa que quien cumple años ese día o después necesita la tarjeta; quien nació el 31 de diciembre de 1987 no, tenga la experiencia que tenga. ${cut.length} estados usan una fecha así. Cuando el estado fija además un umbral de potencia, las dos condiciones van juntas: una persona nacida después de la fecha que maneja un fueraborda de 9,9 hp en un estado que solo cuenta los motores de 10 hp o más no necesita tarjeta. Las motos acuáticas están cubiertas en ${pwcCovered.length} de los ${req.length} estados con requisito, a menudo con su propia edad mínima.</p>
<h2>Comparar dos estados</h2>
<p>Útil antes de un viaje o una mudanza: la miniherramienta pone dos reglas estatales una al lado de la otra.</p>
<!--tool:mini:compare|{"state":"FL","b":"GA"}-->
<h2>Lo que la tabla no muestra</h2>
<p>Las exenciones cambian de un estado a otro y no caben en una columna: un adulto con tarjeta a bordo, un alquiler con la explicación del arrendador, una licencia de capitán de la Guardia Costera, una visita con la tarjeta de otro estado. Cada página de estado enumera las que publica su agencia. La tabla tampoco recoge el registro, el título de propiedad ni el equipo obligatorio, que siguen las reglas federales del ${h.src('cfr175', '33 CFR parte 175')} y los añadidos de cada estado.</p>`;
    },
  },
});
