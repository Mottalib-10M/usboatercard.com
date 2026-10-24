import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const v = h.where((s) => s.required != null);
  const covers = v.filter((s) => s.rule.pwc === true);
  const pwcOnly = v.filter((s) => s.rule.kind === 'pwcOnly');
  const extra = v.filter((s) => h.S(s.code).n('pwcExtra'));
  const pa = v.filter((s) => s.minAge.pwc != null).map((s) => s.minAge.pwc as number);
  const sixteen = v.filter((s) => s.minAge.pwc === 16);
  return { v, covers, pwcOnly, extra, plo: pa.length ? Math.min(...pa) : null, phi: pa.length ? Math.max(...pa) : null, sixteen };
};

export default definePage({
  id: 'pwc',
  group: 'card',
  order: 45,
  tool: { kind: 'mini:pwc', props: { state: 'FL', age: 15 } },
  mini: { kind: 'mini:age', props: { state: 'CA', age: 15 } },
  related: ['age', 'need-license', 'free-license', 'state-fl', 'state-ca'],
  sources: ['boatus', 'navrules', 'cfr175'],
  en: {
    slug: 'pwc-license',
    nav: 'Jet ski (PWC) license',
    card: 'Who needs a card to drive a jet ski, the minimum age in each state and what rental counters ask.',
    title: 'PWC License: Jet Ski Card and Minimum Age by State',
    description: 'PWC license by state: whether a boater card is needed to drive a jet ski, the minimum age to ride alone, extra rules for young riders and rental options.',
    h1: 'PWC license: card and minimum age for a jet ski',
    intro: 'A jet ski is a motorboat in the eyes of the law, so the boater card usually covers it. The minimum age is often higher. Pick a state and an age.',
    resume: (h) => {
      const { v, covers, pwcOnly, plo, phi, sixteen } = F(h);
      return `There is no separate "jet ski license" in most states: a personal watercraft (PWC) is a vessel, and the boater education card that applies to motorboats applies to it too. Among the ${v.length} verified jurisdictions, the education rule covers PWC operators in ${covers.length}${pwcOnly.length ? `, and in ${h.list(h.names(pwcOnly))} it applies only to PWC` : ''}. What changes is the age: states that publish a PWC minimum set it from ${plo ?? '–'} to ${phi ?? '–'} years, with ${sixteen.length} at 16, and it is often higher than the age for a motorboat. Many states add rules for jet skis that do not apply to other boats, such as riding only between sunrise and sunset, a lanyard attached to the engine cut-off switch, and a life jacket on every rider, which is a federal requirement for the boat's equipment under 33 CFR part 175 and a state rule for wearing it. Rental counters may sell a temporary certificate or exempt a renter after a briefing, depending on the state. The tool answers for an age in a state; the second one compares the PWC age with the motorboat age.`;
    },
    faqs: () => [
      { q: 'Do I need a license to rent a jet ski?', a: 'Usually the same card as for a boat, unless the state offers a rental exemption or a temporary certificate at the counter. Some states exempt renters who receive a safety briefing from the rental business. The renter must still meet the minimum PWC age. The state page gives the rental rule when the agency publishes one.' },
      { q: 'Can two people ride a jet ski if only one has a card?', a: 'Yes in general: the card rule concerns the person at the controls. Every passenger needs a life jacket and the PWC must be rated for that number of people. If the passenger takes the controls, that person must meet the card and age rules.' },
      { q: 'Is a jet ski card from one state valid in another?', a: 'States generally accept a card from a NASBLA-approved course issued by another state, often for visitors only. The age rule of the state where you ride still applies, so a 14-year-old card holder can be too young in another state.' },
    ],
    body: (h) => {
      const { v } = F(h);
      const rows = v.map((s) => { const x = h.S(s.code); return [h.sl(s.code), s.rule.pwc === true ? 'yes' : s.rule.pwc === false ? 'no' : h.nc, x.pwcAgeL, x.motorAgeL]; });
      return `
<h2>Jet ski rules in each state</h2>
${h.table(['State', 'Card rule covers PWC', 'PWC alone from', 'Motorboat alone from'], rows, 'Verified jurisdictions. "Not confirmed": the agency pages read do not state it.', ['l', 'r', 'r', 'r'])}
<h2>Why the age is higher</h2>
<p>A PWC accelerates fast, steers with thrust only and leaves the rider without a hull around them. States reflect this with a higher minimum age, and sometimes with a ban on young riders after dark or towing a skier. The mini-tool compares the two ages in a state.</p>
<!--tool:mini:age|{"state":"TX","age":13}-->
<h2>Equipment and safe riding</h2>
<ul>
<li><strong>Life jackets.</strong> Each person needs a wearable life jacket of the right size under ${h.src('cfr175', '33 CFR part 175')}; states that regulate PWC usually require them to be worn.</li>
<li><strong>Engine cut-off lanyard.</strong> Attach it to the rider so the engine stops after a fall; many states require it on PWC.</li>
<li><strong>No steering without throttle.</strong> A jet drive needs thrust to turn. Releasing the throttle to avoid a collision can leave you going straight.</li>
<li><strong>Same rules of the road.</strong> The ${h.src('navrules', 'Navigation Rules')} apply: keep a lookout, a safe speed and give way as required.</li>
</ul>
<h2>Getting the card for a PWC</h2>
<p>The same approved course leads to the card for both boats and jet skis, and the free online course is approved in most states (${h.a('free-license', 'free course page')}). For ages and supervision rules on other boats, see the ${h.a('age', 'age page')}.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-moto-acuatica',
    nav: 'Licencia de moto acuática',
    card: 'Quién necesita tarjeta para manejar una moto acuática, la edad mínima en cada estado y lo que piden en el alquiler.',
    title: 'Licencia de moto acuática: tarjeta y edad mínima por estado',
    description: 'Licencia de moto acuática por estado: si hace falta la tarjeta náutica, la edad mínima para ir solo, las reglas para jóvenes y lo que se acepta al alquilar.',
    h1: 'Licencia de moto acuática: tarjeta y edad mínima por estado',
    intro: 'Para la ley, una moto acuática es una embarcación de motor, así que la tarjeta náutica suele cubrirla. La edad mínima suele ser más alta. Elija un estado y una edad.',
    resume: (h) => {
      const { v, covers, pwcOnly, plo, phi, sixteen } = F(h);
      return `En la mayoría de los estados no existe una «licencia de moto acuática» aparte: una moto acuática (PWC) es una embarcación, y la tarjeta de educación náutica que se aplica a las lanchas también se le aplica. Entre las ${v.length} jurisdicciones verificadas, la regla de educación cubre a quienes manejan motos acuáticas en ${covers.length}${pwcOnly.length ? `, y en ${h.list(h.names(pwcOnly))} solo se aplica a ellas` : ''}. Lo que cambia es la edad: los estados que publican un mínimo para la moto acuática lo fijan entre ${plo ?? '–'} y ${phi ?? '–'} años, ${sixteen.length} en 16, y suele ser más alto que para una lancha. Muchos estados añaden reglas propias de la moto acuática, como circular solo entre la salida y la puesta del sol, un cordón unido al corte de motor y un chaleco para cada ocupante, que es una exigencia federal de equipo según el 33 CFR parte 175 y una regla estatal para llevarlo puesto. En el alquiler pueden vender un certificado temporal o eximir al cliente tras una explicación, según el estado. La herramienta responde para una edad en un estado; la segunda compara la edad de la moto acuática con la de la lancha.`;
    },
    faqs: () => [
      { q: '¿Necesito licencia para alquilar una moto acuática?', a: 'Normalmente la misma tarjeta que para una lancha, salvo que el estado ofrezca una exención de alquiler o un certificado temporal en el mostrador. Algunos estados eximen a quien recibe una explicación de seguridad de la empresa. El cliente debe cumplir igual la edad mínima. La página del estado da la regla de alquiler cuando la agencia la publica.' },
      { q: '¿Pueden ir dos personas si solo una tiene tarjeta?', a: 'En general sí: la regla de la tarjeta se refiere a quien lleva los mandos. Cada pasajero necesita un chaleco y la moto debe estar homologada para ese número de personas. Si el pasajero toma los mandos, debe cumplir las reglas de tarjeta y de edad.' },
      { q: '¿La tarjeta de un estado vale en otro?', a: 'Los estados aceptan en general la tarjeta de un curso aprobado por NASBLA emitida por otro estado, a menudo solo para visitantes. La regla de edad del estado donde navega sigue aplicándose, así que un joven de 14 años con tarjeta puede ser demasiado joven en otro estado.' },
    ],
    body: (h) => {
      const { v } = F(h);
      const rows = v.map((s) => { const x = h.S(s.code); return [h.sl(s.code), s.rule.pwc === true ? 'sí' : s.rule.pwc === false ? 'no' : h.nc, x.pwcAgeL, x.motorAgeL]; });
      return `
<h2>Reglas de la moto acuática en cada estado</h2>
${h.table(['Estado', 'La tarjeta cubre la moto acuática', 'Moto acuática sola desde', 'Lancha sola desde'], rows, 'Jurisdicciones verificadas. «No confirmado»: las páginas de la agencia consultadas no lo indican.', ['l', 'r', 'r', 'r'])}
<h2>Por qué la edad es más alta</h2>
<p>Una moto acuática acelera rápido, gira solo con el empuje y deja al piloto sin casco alrededor. Los estados lo reflejan con una edad mínima más alta y a veces con la prohibición de que los jóvenes circulen de noche o remolquen a un esquiador. La miniherramienta compara las dos edades en un estado.</p>
<!--tool:mini:age|{"state":"TX","age":13}-->
<h2>Equipo y manejo seguro</h2>
<ul>
<li><strong>Chalecos.</strong> Cada persona necesita un chaleco salvavidas de su talla según el ${h.src('cfr175', '33 CFR parte 175')}; los estados que regulan las motos acuáticas suelen exigir llevarlo puesto.</li>
<li><strong>Cordón de corte del motor.</strong> Átelo al piloto para que el motor se pare tras una caída; muchos estados lo exigen.</li>
<li><strong>Sin acelerador no se gira.</strong> Un propulsor a chorro necesita empuje para girar. Soltar el acelerador para evitar un choque puede dejarle yendo recto.</li>
<li><strong>Las mismas reglas de navegación.</strong> Se aplican las ${h.src('navrules', 'Reglas de Navegación')}: vigilancia, velocidad segura y ceder el paso cuando toca.</li>
</ul>
<h2>Obtener la tarjeta para la moto acuática</h2>
<p>El mismo curso aprobado da la tarjeta para lanchas y motos acuáticas, y el curso gratuito en línea está aprobado en la mayoría de los estados (${h.a('free-license', 'página del curso gratuito')}). Para la edad y la supervisión en otras embarcaciones, vea la ${h.a('age', 'página de la edad')}.</p>`;
    },
  },
});
