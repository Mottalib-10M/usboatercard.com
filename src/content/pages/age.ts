import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const v = h.where((s) => s.required != null);
  const withMotor = v.filter((s) => s.minAge.motorboat != null);
  const withPwc = v.filter((s) => s.minAge.pwc != null);
  const ages = withMotor.map((s) => s.minAge.motorboat as number);
  const pa = withPwc.map((s) => s.minAge.pwc as number);
  const lo = ages.length ? Math.min(...ages) : null, hi = ages.length ? Math.max(...ages) : null;
  const plo = pa.length ? Math.min(...pa) : null, phi = pa.length ? Math.max(...pa) : null;
  const band = v.filter((s) => s.rule.kind === 'ageBand');
  return { v, withMotor, withPwc, lo, hi, plo, phi, band };
};

export default definePage({
  id: 'age',
  group: 'card',
  order: 40,
  tool: { kind: 'mini:age', props: { state: 'MI', age: 14 } },
  mini: { kind: 'mini:quick', props: { state: 'GA', year: 2010 } },
  related: ['pwc', 'need-license', 'how-to-get', 'state-mi', 'state-ga'],
  sources: ['boatus', 'navrules'],
  en: {
    slug: 'boating-license-age',
    nav: 'Boating license age',
    card: 'The youngest age to drive a boat or a jet ski alone in each state, and what changes with a card or an adult on board.',
    title: 'Boating License Age: How Old to Drive a Boat Alone',
    description: 'Boating license age by state: the minimum age to drive a motorboat or a jet ski alone, what a card or an adult on board changes, and the rule by birth year.',
    h1: 'Boating license age: how old to drive a boat alone',
    intro: 'Two ages matter: the age at which a state lets a young person operate alone, and the birth year that makes the card mandatory. Pick a state and an age to see the first one.',
    resume: (h) => {
      const { v, withMotor, withPwc, lo, hi, plo, phi, band } = F(h);
      return `There is no single boating license age in the United States: each state sets its own. For a motorboat, ${withMotor.length} of the ${v.length} verified jurisdictions publish a minimum age to operate alone${lo != null ? `, from ${lo} to ${hi} years` : ''}, often with a card required below a higher age or a horsepower limit. For a personal watercraft (jet ski), ${withPwc.length} publish a minimum${plo != null ? `, from ${plo} to ${phi} years` : ''}, and the PWC age is often higher than the motorboat age. Below the minimum, most states still allow a young person to operate when a qualified adult is on board and within reach of the controls. A separate question is who needs the card: in most states it is everyone born on or after a cut-off date, so the rule follows the birth year, not the age today${band.length ? `, while ${h.list(h.names(band))} ${band.length > 1 ? 'tie' : 'ties'} the requirement to an age band` : ''}. Where a state's page gives no age, the tool says "not confirmed" instead of guessing. The tool answers for an age in a state; the second one tells whether a birth year needs the card.`;
    },
    faqs: (h) => {
      const { lo } = F(h);
      return [
        { q: 'Can a 12-year-old drive a boat?', a: `It depends on the state, the boat and who is on board. ${lo != null && lo <= 12 ? 'Some states let a 12-year-old with a card operate a small motorboat alone, ' : 'Some states allow it with a card on a small motor, '}others only with an adult on board. Most states do not allow a 12-year-old to drive a jet ski alone. Enter the age in the tool for your state.` },
        { q: 'Is there a maximum age to need a boating license?', a: 'No state sets an upper age for the card itself. What older boaters often benefit from is the birth-date cut-off: in states where the rule applies only to people born on or after a date, someone born before it needs no card at any age, though a course is still useful.' },
        { q: 'Does a teen with a card have the same rights as an adult?', a: 'Not always. Several states keep limits on young card holders, such as a minimum age for a jet ski, a horsepower cap or a daylight rule. The card lets them meet the education rule; the age rule still applies. The state page lists the limits the agency publishes.' },
      ];
    },
    body: (h) => {
      const { v } = F(h);
      const rows = v.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.motorAgeL, x.pwcAgeL, x.whoL]; });
      return `
<h2>Minimum ages in each state</h2>
${h.table(['State', 'Motorboat alone', 'Jet ski alone', 'Card required for'], rows, 'Verified jurisdictions. "Not confirmed": the agency pages read do not state that age.', ['l', 'r', 'r', 'l'])}
<h2>Two different rules</h2>
<p>The <strong>age rule</strong> says how old a person must be to operate without an adult, sometimes only with a card. The <strong>education rule</strong> says who must carry a card, and in most states it follows the date of birth. A 30-year-old can need a card while a 15-year-old with a card is allowed to operate alone: both rules apply at once. The second tool checks the education rule for a birth year.</p>
<!--tool:mini:quick|{"state":"MI","year":2008}-->
<h2>The adult on board</h2>
<p>Below the minimum age, states usually allow operation when an adult is on board, often 18 or older and sometimes required to hold a card themselves. The exact conditions, such as how close the adult must be to the controls, are in each state line of the ${h.a('states', 'state table')}. The federal ${h.src('navrules', 'Navigation Rules')} apply to every operator whatever the age.</p>
<h2>Jet skis are stricter</h2>
<p>Personal watercraft are fast and close to the water, and states often set a higher age for them than for a motorboat, along with daytime-only rules or a ban on towing for young operators. The ${h.a('pwc', 'PWC page')} gathers those rules.</p>
<h2>Getting a young boater ready</h2>
<p>Courses are open to children, and the free online course is approved in most states; see the ${h.a('free-license', 'free course page')}. The ${h.a('test', 'practice test')} is a good way to check what they have learned before the real exam.</p>`;
    },
  },
  es: {
    slug: 'edad-para-licencia-de-navegacion',
    nav: 'Edad para la licencia náutica',
    card: 'La edad mínima para manejar sola una lancha o una moto acuática en cada estado, y lo que cambia con tarjeta o con un adulto a bordo.',
    title: 'Edad para la licencia de navegación: manejar sola una lancha',
    description: 'Edad para la licencia de navegación: la edad mínima para manejar sola una lancha o moto acuática, qué cambia con tarjeta o un adulto y la regla por año.',
    h1: 'Edad para la licencia de navegación: manejar sola una lancha una lancha',
    intro: 'Cuentan dos edades: la edad a la que un estado deja manejar solo a un joven, y el año de nacimiento que hace obligatoria la tarjeta. Elija un estado y una edad para ver la primera.',
    resume: (h) => {
      const { v, withMotor, withPwc, lo, hi, plo, phi, band } = F(h);
      return `No hay una edad única para la licencia de navegación en Estados Unidos: cada estado fija la suya. Para una lancha de motor, ${withMotor.length} de las ${v.length} jurisdicciones verificadas publican una edad mínima para manejar sin compañía${lo != null ? `, de ${lo} a ${hi} años` : ''}, a menudo con tarjeta obligatoria por debajo de una edad mayor o de un límite de potencia. Para una moto acuática, ${withPwc.length} publican un mínimo${plo != null ? `, de ${plo} a ${phi} años` : ''}, y esa edad suele ser más alta que la de la lancha. Por debajo del mínimo, la mayoría de los estados permiten que un joven maneje si va a bordo un adulto calificado al alcance de los mandos. Otra cuestión es quién necesita la tarjeta: en la mayoría de los estados es toda persona nacida en o después de una fecha de corte, así que la regla sigue el año de nacimiento, no la edad actual${band.length ? `, mientras que ${h.list(h.names(band))} ${band.length > 1 ? 'ligan' : 'liga'} el requisito a una franja de edad` : ''}. Donde la página del estado no da edad, la herramienta dice «no confirmado» en lugar de suponerla. La herramienta responde para una edad en un estado; la segunda indica si un año de nacimiento necesita la tarjeta.`;
    },
    faqs: (h) => {
      const { lo } = F(h);
      return [
        { q: '¿Puede un niño de 12 años manejar una lancha?', a: `Depende del estado, de la embarcación y de quién vaya a bordo. ${lo != null && lo <= 12 ? 'Algunos estados dejan a un niño de 12 años con tarjeta manejar solo una lancha pequeña, ' : 'Algunos lo permiten con tarjeta y un motor pequeño, '}otros solo con un adulto a bordo. La mayoría no deja a un niño de 12 años manejar solo una moto acuática. Escriba la edad en la herramienta para su estado.` },
        { q: '¿Hay una edad máxima para necesitar la licencia de navegación?', a: 'Ningún estado fija una edad máxima para la tarjeta. Lo que suele favorecer a los mayores es la fecha de corte: donde la regla solo se aplica a quienes nacieron en o después de una fecha, quien nació antes no necesita tarjeta a ninguna edad, aunque un curso sigue siendo útil.' },
        { q: '¿Un joven con tarjeta tiene los mismos derechos que un adulto?', a: 'No siempre. Varios estados mantienen límites para los jóvenes con tarjeta, como una edad mínima para la moto acuática, un tope de potencia o una regla de solo de día. La tarjeta cumple el requisito de educación; la regla de edad sigue aplicándose. La página del estado enumera los límites que publica la agencia.' },
      ];
    },
    body: (h) => {
      const { v } = F(h);
      const rows = v.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.motorAgeL, x.pwcAgeL, x.whoL]; });
      return `
<h2>Edades mínimas en cada estado</h2>
${h.table(['Estado', 'Lancha sin compañía', 'Moto acuática sin compañía', 'Tarjeta exigida a'], rows, 'Jurisdicciones verificadas. «No confirmado»: las páginas de la agencia consultadas no indican esa edad.', ['l', 'r', 'r', 'l'])}
<h2>Dos reglas distintas</h2>
<p>La <strong>regla de edad</strong> dice qué edad hace falta para manejar sin un adulto, a veces solo con tarjeta. La <strong>regla de educación</strong> dice quién debe llevar tarjeta, y en la mayoría de los estados sigue la fecha de nacimiento. Una persona de 30 años puede necesitar tarjeta mientras un joven de 15 con tarjeta puede manejar solo: las dos reglas se aplican a la vez. La segunda herramienta comprueba la regla de educación para un año de nacimiento.</p>
<!--tool:mini:quick|{"state":"MI","year":2008}-->
<h2>El adulto a bordo</h2>
<p>Por debajo de la edad mínima, los estados suelen permitir manejar si hay un adulto a bordo, a menudo de 18 años o más y a veces con tarjeta propia. Las condiciones exactas, como lo cerca que debe estar el adulto de los mandos, figuran en la línea de cada estado de la ${h.a('states', 'tabla de estados')}. Las ${h.src('navrules', 'Reglas de Navegación')} federales se aplican a todo operador sea cual sea su edad.</p>
<h2>Las motos acuáticas son más estrictas</h2>
<p>Las motos acuáticas son rápidas y van a ras del agua, y los estados suelen fijarles una edad más alta que a una lancha, con reglas de solo de día o la prohibición de remolcar para los jóvenes. La ${h.a('pwc', 'página de la moto acuática')} reúne esas reglas.</p>
<h2>Preparar a un joven navegante</h2>
<p>Los cursos están abiertos a los niños, y el curso gratuito en línea está aprobado en la mayoría de los estados; vea la ${h.a('free-license', 'página del curso gratuito')}. El ${h.a('test', 'examen de práctica')} sirve para comprobar lo aprendido antes del examen real.</p>`;
    },
  },
});
