import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const req = h.where((s) => s.required === true);
  const none = h.where((s) => s.required === false);
  const cut = req.filter((s) => !!h.S(s.code).cutoff);
  const hp = req.filter((s) => s.rule.hpMin != null && s.rule.hpMin > 0);
  const anyMotor = req.filter((s) => s.rule.hpMin == null || s.rule.hpMin === 0);
  const sail = req.filter((s) => s.rule.sailFtMin != null);
  return { req, none, cut, hp, anyMotor, sail };
};

export default definePage({
  id: 'need-license',
  group: 'card',
  order: 10,
  tool: { kind: 'mini:quick', props: { state: 'TX', year: 1995, hp: 115 } },
  mini: { kind: 'mini:compare', props: { state: 'NY', b: 'NJ' } },
  related: ['home', 'states', 'age', 'boater-card', 'state-tx'],
  sources: ['cfr175', 'navrules'],
  en: {
    slug: 'do-you-need-a-license-to-drive-a-boat',
    nav: 'Do you need a license to drive a boat?',
    card: 'The 30-second answer from your year of birth and engine power, and what still applies without a card.',
    title: 'Boat License: Do You Need One to Drive a Boat? Quick Check',
    description: 'Do you need a license to drive a boat? It depends on your state, birth date, boat and engine. Enter them for a yes or no, with the reason and official source.',
    h1: 'Do you need a license to drive a boat?',
    intro: 'Pick the state, your year of birth and the engine power. If your birthday falls in the year of the cut-off, the full check gives the answer for your exact date.',
    resume: (h) => {
      const { req, none, cut, hp, anyMotor } = F(h);
      return `For a recreational boat, the answer depends on your state, your age and the engine, not on the boat's size alone. No federal license exists for recreational operators; the Coast Guard credential is for people who carry paying passengers. Among the ${h.counts.verified} jurisdictions we verified, ${req.length} require a boater education card from at least some operators and ${none.length} have no general requirement. Where it is required, the card is usually needed by people born on or after a cut-off date (${cut.length} states) or by every operator of a covered boat; in ${hp.length} states only motors above a set power count, while ${anyMotor.length} apply the rule to any motorboat. Personal watercraft are covered almost everywhere. If you need no card, you still must follow the Navigation Rules, carry a life jacket for each person and register a motorboat. The quick tool answers from a year of birth and an engine power; the check on the home page uses your exact birth date and the day you go out.`;
    },
    faqs: (h) => {
      const { sail } = F(h);
      return [
        { q: 'Do I need a license to drive a pontoon boat?', a: 'A pontoon with an outboard is a motorboat for these rules, so the same card applies as for any motorboat in your state, from the same power threshold. Pontoons often carry large outboards, well above the thresholds states use. Check the answer with the engine rating written on the motor or the capacity plate.' },
        { q: 'Does a sailboat need a license?', a: `A sailboat with an engine running counts as a motorboat. Under sail alone, ${sail.length ? `${h.list(h.names(sail))} ${sail.length > 1 ? 'cover' : 'covers'} sailboats from a set length` : 'few states cover sailboats'}; most do not. The check on the home page handles sailboats with their length when you pick "Sailboat, no motor".` },
        { q: 'Can I drive a friend\'s boat without a card if they are on board?', a: 'In many states, yes, if the person on board is an adult who holds the card or is exempt, and takes responsibility for the boat. The age and conditions differ by state, so check the state page. This exemption does not change the minimum age to operate, which still applies.' },
        { q: 'What happens if I boat without a required card?', a: 'Officers can stop a boat to check equipment and documents, and operating without a required card is a violation with a fine set by the state. The amount and any other consequence are in the state statute, and the state page links the agency that enforces it.' },
      ];
    },
    body: (h) => {
      const { req, hp } = F(h);
      const thr = [...new Set(hp.map((s) => s.rule.hpMin as number))].sort((a, b) => a - b);
      return `
<h2>The three questions, in order</h2>
<ol>
<li><strong>Does your state require boater education at all?</strong> ${req.length} of the verified jurisdictions do; the ${h.a('states', 'table of every state')} gives the rule.</li>
<li><strong>Is your boat covered?</strong> Most rules cover motorboats above a set power and every personal watercraft. The thresholds in our data are ${thr.length ? h.list(thr.map((x) => `${x} hp`)) : h.nc}. Paddle craft are almost never covered.</li>
<li><strong>Are you in the group covered?</strong> Usually people born on or after a date, sometimes everyone, sometimes only young operators. Some states are still widening the group year by year.</li>
</ol>
<p>Only when all three answers are yes do you need the card. The comparison below shows how much two neighbors can differ.</p>
<!--tool:mini:compare|{"state":"NY","b":"NJ"}-->
<h2>Common exemptions</h2>
<p>States list exemptions in their statute, and they recur: an adult card holder on board and in charge; a rental from a livery that gives a safety briefing or a short exam; a valid Coast Guard captain's license; a visitor with a card from another state, sometimes only for a set period. They are not the same in every state, and some apply only to adults. Each state page lists those its agency publishes.</p>
<h2>What applies to everyone, card or not</h2>
<ul>
<li>The ${h.src('navrules', 'Navigation Rules')}: keep a lookout, keep a safe speed, give way as the rules say.</li>
<li>Equipment: one approved wearable life jacket for each person, plus a throwable on boats of 16 feet or more, under ${h.src('cfr175', '33 CFR part 175')}.</li>
<li>A child under 13 wears a life jacket while the boat is underway, under the federal rule, unless the state sets its own age.</li>
<li>Operating under the influence is illegal everywhere, and states set the limits and penalties.</li>
</ul>
<h2>If the answer is "depends on your birthday"</h2>
<p>When your year of birth is the year of your state's cut-off, the quick tool cannot decide. Enter your exact date in the ${h.a('home', 'full check')}, which also takes the day of your outing into account for states that change their rule on a set date.</p>`;
    },
  },
  es: {
    slug: 'necesita-licencia-para-manejar-un-barco',
    nav: '¿Hace falta licencia para manejar un barco?',
    card: 'La respuesta en 30 segundos con su año de nacimiento y la potencia del motor, y lo que se aplica sin tarjeta.',
    title: 'Licencia para manejar un barco: ¿la necesita? Compruébelo',
    description: '¿Necesita licencia para manejar un barco? Depende de su estado, fecha de nacimiento, embarcación y motor. Indíquelos para un sí o un no con la fuente oficial.',
    h1: '¿Necesita licencia para manejar un barco?',
    intro: 'Elija el estado, su año de nacimiento y la potencia del motor. Si cumple años en el mismo año de la fecha de corte, la comprobación completa da la respuesta con su fecha exacta.',
    resume: (h) => {
      const { req, none, cut, hp, anyMotor } = F(h);
      return `Para una embarcación de recreo, la respuesta depende de su estado, su edad y el motor, no solo del tamaño de la embarcación. No existe una licencia federal para los operadores de recreo; la credencial de la Guardia Costera es para quienes llevan pasajeros de pago. Entre las ${h.counts.verified} jurisdicciones verificadas, ${req.length} exigen una tarjeta de educación náutica al menos a parte de los operadores y ${none.length} no tienen un requisito general. Donde se exige, la tarjeta la necesitan en general quienes nacieron a partir de una fecha de corte (${cut.length} estados) o todo operador de una embarcación cubierta; en ${hp.length} estados solo cuentan los motores por encima de cierta potencia, mientras que ${anyMotor.length} aplican la regla a cualquier lancha. Las motos acuáticas están cubiertas casi en todas partes. Si no necesita tarjeta, igual debe seguir las Reglas de Navegación, llevar un chaleco por persona y registrar una lancha. La herramienta rápida responde con un año de nacimiento y una potencia; la comprobación de la página de inicio usa su fecha exacta y el día de su salida.`;
    },
    faqs: (h) => {
      const { sail } = F(h);
      return [
        { q: '¿Necesito licencia para manejar un pontón?', a: 'Un pontón con motor fueraborda es una lancha a efectos de estas reglas, así que se aplica la misma tarjeta que a cualquier lancha de su estado, desde el mismo umbral de potencia. Los pontones suelen llevar motores grandes, muy por encima de los umbrales estatales. Compruebe la respuesta con la potencia escrita en el motor o en la placa de capacidad.' },
        { q: '¿Un velero necesita licencia?', a: `Un velero con el motor en marcha cuenta como lancha. Solo a vela, ${sail.length ? `${h.list(h.names(sail))} ${sail.length > 1 ? 'cubren' : 'cubre'} los veleros a partir de una eslora` : 'pocos estados cubren los veleros'}; la mayoría no. La comprobación trata los veleros con su eslora si elige «Velero sin motor».` },
        { q: '¿Puedo manejar la lancha de un amigo sin tarjeta si él va a bordo?', a: 'En muchos estados sí, si la persona a bordo es un adulto con tarjeta o exento y se hace responsable de la embarcación. La edad y las condiciones cambian según el estado, así que revise la página del estado. Esta exención no cambia la edad mínima para manejar, que sigue aplicándose.' },
        { q: '¿Qué pasa si navego sin la tarjeta exigida?', a: 'Los agentes pueden detener una embarcación para revisar el equipo y los documentos, y manejar sin la tarjeta exigida es una infracción con una multa que fija el estado. El importe y cualquier otra consecuencia figuran en la ley del estado, y la página del estado enlaza la agencia que la aplica.' },
      ];
    },
    body: (h) => {
      const { req, hp } = F(h);
      const thr = [...new Set(hp.map((s) => s.rule.hpMin as number))].sort((a, b) => a - b);
      return `
<h2>Las tres preguntas, en orden</h2>
<ol>
<li><strong>¿Su estado exige educación náutica?</strong> ${req.length} de las jurisdicciones verificadas la exigen; la ${h.a('states', 'tabla de todos los estados')} da la regla.</li>
<li><strong>¿Su embarcación está cubierta?</strong> La mayoría de las reglas cubren las lanchas por encima de una potencia y todas las motos acuáticas. Los umbrales de nuestros datos son ${thr.length ? h.list(thr.map((x) => `${x} hp`)) : h.nc}. Las embarcaciones de remo casi nunca están cubiertas.</li>
<li><strong>¿Está usted en el grupo cubierto?</strong> En general, quienes nacieron a partir de una fecha, a veces todos, a veces solo los operadores jóvenes. Algunos estados siguen ampliando el grupo año tras año.</li>
</ol>
<p>Solo si las tres respuestas son sí necesita la tarjeta. La comparación de abajo muestra cuánto pueden diferir dos vecinos.</p>
<!--tool:mini:compare|{"state":"NY","b":"NJ"}-->
<h2>Exenciones frecuentes</h2>
<p>Los estados enumeran las exenciones en su ley, y se repiten: un adulto con tarjeta a bordo y al mando; un alquiler de un arrendador que da una explicación de seguridad o un examen corto; una licencia de capitán vigente de la Guardia Costera; un visitante con la tarjeta de otro estado, a veces solo por un tiempo. No son iguales en todos los estados, y algunas solo valen para adultos. Cada página de estado enumera las que publica su agencia.</p>
<h2>Lo que se aplica a todos, con o sin tarjeta</h2>
<ul>
<li>Las ${h.src('navrules', 'Reglas de Navegación')}: mantener la vigilancia, ir a velocidad segura, ceder el paso como dicen las reglas.</li>
<li>El equipo: un chaleco ponible aprobado por persona, más un arrojadizo en embarcaciones de 16 pies o más, según el ${h.src('cfr175', '33 CFR parte 175')}.</li>
<li>Un niño menor de 13 años lleva puesto el chaleco mientras la embarcación está en marcha, según la regla federal, salvo que el estado fije su propia edad.</li>
<li>Manejar bajo los efectos del alcohol es ilegal en todas partes, y los estados fijan los límites y las sanciones.</li>
</ul>
<h2>Si la respuesta es «depende de su cumpleaños»</h2>
<p>Cuando su año de nacimiento es el año de la fecha de corte de su estado, la herramienta rápida no puede decidir. Escriba su fecha exacta en la ${h.a('home', 'comprobación completa')}, que también tiene en cuenta el día de su salida en los estados que cambian su regla en una fecha fija.</p>`;
    },
  },
});
