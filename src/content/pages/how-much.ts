import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const req = h.where((s) => s.required === true);
  const withFee = req.filter((s) => s.card.stateFee != null);
  const zero = withFee.filter((s) => s.card.stateFee === 0);
  const paid = withFee.filter((s) => (s.card.stateFee as number) > 0).sort((a, b) => (b.card.stateFee as number) - (a.card.stateFee as number));
  const freeAndZero = req.filter((s) => s.boatus?.status === 'approved' && s.card.stateFee === 0);
  const repl = req.filter((s) => s.card.replacementFee != null);
  return { req, withFee, zero, paid, freeAndZero, repl };
};

export default definePage({
  id: 'how-much',
  group: 'card',
  order: 30,
  tool: { kind: 'mini:cost', props: { state: 'CT', price: 40 } },
  mini: { kind: 'mini:cardfee', props: { state: 'AL' } },
  related: ['free-license', 'boater-card', 'how-to-get', 'state-ny', 'state-ca'],
  sources: ['boatus', 'cfr173', 'cfr175'],
  en: {
    slug: 'how-much-is-a-boating-license',
    nav: 'How much is a boating license?',
    card: 'Course price plus the state fee: the cheapest legal total in each state, and what a replacement costs.',
    title: 'Boating License Cost: Course Price + State Fee, by State',
    description: 'How much is a boating license in your state: the state card fee, whether a free approved course exists, the cheapest legal total and the replacement price.',
    h1: 'How much is a boating license?',
    intro: 'Two costs add up: the course, free or paid, and the fee your state charges for the card. Pick your state and enter the course price you found to see the total.',
    resume: (h) => {
      const { req, withFee, zero, paid, freeAndZero } = F(h);
      const top = paid[0];
      return `A boating license costs the price of an approved course plus whatever the state charges for the card, and in many states that total can be zero. The course part is free where the state approves the free online course of the BoatUS Foundation; elsewhere it is the price set by an approved provider or a classroom course, sometimes free when the state or a volunteer group runs it. The state part varies: among the ${withFee.length} verified states whose official page states a card fee, ${zero.length} charge nothing and ${paid.length} charge a fee${top ? `, the highest being ${h.m(top.card.stateFee as number)} in ${h.sl(top.code)}` : ''}. ${freeAndZero.length} states combine a free approved course with no state fee, so the card costs nothing at all. For the ${req.length - withFee.length} remaining states with a requirement, the agency page does not state a fee, and the tool says so rather than guess. A replacement for a lost card has its own small fee where published. The tool adds the course price you enter to your state's fee and shows the free route beside it.`;
    },
    faqs: (h) => {
      const { paid, repl } = F(h);
      return [
        { q: 'Why does the same course cost different amounts?', a: 'Providers set their own prices for online and classroom courses, and the state does not control them. The state only charges its own fee for the card. Where a free course is approved, any price above zero for the course is a choice. Compare the total on this page before you pay.' },
        { q: 'Do I pay the state fee every year?', a: `In states where the card is valid for life, the state fee is paid once. ${paid.length ? `${h.S(paid[0].code).nameL} is an example of a state with a fee; its line in the table gives the validity.` : ''} Where the credential is tied to a driver license, it follows that license's renewal. Registration of the boat is a separate yearly cost not covered here.` },
        { q: 'How much does a replacement card cost?', a: `It depends on the state and sometimes on who issued the card. Among the verified states, ${repl.length} publish a replacement fee on the official page, shown in the mini-tool. Elsewhere, the agency or the course provider that reported your result handles replacements, and its price is set there.` },
      ];
    },
    body: (h) => {
      const { req } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.feeL, x.freeL, x.freeOk && x.card.stateFee != null ? h.m(x.card.stateFee) : '–', x.replL]; });
      return `
<h2>The cost in each state</h2>
<p>"Cheapest total" is the free approved course plus the state fee, when both are known. A dash means the free course is not approved or the state does not publish its fee.</p>
${h.table(['State', 'State fee', 'Free course', 'Cheapest total', 'Replacement'], rows, 'Verified states with an education requirement, from the official pages read.', ['l', 'r', 'r', 'r', 'r'])}
<h2>The state fee, up close</h2>
<p>What the state charges, and for what, differs: some charge for issuing the card after the course, some charge at the course, and some issue the card free. The mini-tool shows the fee, the replacement price and how long the card lasts in a state.</p>
<!--tool:mini:cardfee|{"state":"NY"}-->
<h2>Costs that are not the license</h2>
<ul>
<li><strong>Boat registration.</strong> Every motorboat must be numbered by its state, with a yearly or multi-year fee; the number goes on both sides of the bow under ${h.src('cfr173', '33 CFR part 173')}.</li>
<li><strong>Required equipment.</strong> Life jackets for each person, a throwable device from 16 feet, distress signals on coastal waters and extinguishers where required, under ${h.src('cfr175', '33 CFR part 175')}.</li>
<li><strong>Temporary or rental certificates.</strong> Several states sell a short-term certificate to visitors at rental counters; it is not the lifetime card.</li>
</ul>
<h2>Pay only if you need it</h2>
<p>Before any cost, check that the law applies to you: in most states, people born before a cut-off date or running a small motor need no card at all. The ${h.a('home', 'check')} answers that first.</p>`;
    },
  },
  es: {
    slug: 'cuanto-cuesta-licencia-de-navegacion',
    nav: '¿Cuánto cuesta la licencia náutica?',
    card: 'Precio del curso más la tarifa del estado: el total legal más barato de cada estado y lo que cuesta un duplicado.',
    title: 'Licencia de navegación: cuánto cuesta en cada estado (2026)',
    description: 'Cuánto cuesta la licencia de navegación en su estado: la tarifa estatal, si hay un curso gratis aprobado, el total legal más barato y el precio de un duplicado.',
    h1: '¿Cuánto cuesta la licencia de navegación?',
    intro: 'Se suman dos costos: el curso, gratis o de pago, y la tarifa que cobra su estado por la tarjeta. Elija su estado y escriba el precio del curso que encontró para ver el total.',
    resume: (h) => {
      const { req, withFee, zero, paid, freeAndZero } = F(h);
      const top = paid[0];
      return `Una licencia de navegación cuesta el precio de un curso aprobado más lo que el estado cobre por la tarjeta, y en muchos estados ese total puede ser cero. La parte del curso es gratis donde el estado aprueba el curso en línea gratuito de la BoatUS Foundation; en los demás es el precio que fija un proveedor aprobado o un curso presencial, a veces gratis cuando lo organiza el estado o un grupo voluntario. La parte del estado varía: entre los ${withFee.length} estados verificados cuya página oficial indica una tarifa, ${zero.length} no cobran nada y ${paid.length} cobran una tarifa${top ? `, la más alta de ${h.m(top.card.stateFee as number)} en ${h.sl(top.code)}` : ''}. ${freeAndZero.length} estados combinan un curso gratis aprobado sin tarifa estatal, así que la tarjeta no cuesta nada. En los otros ${req.length - withFee.length} estados con requisito, la página de la agencia no indica tarifa, y la herramienta lo dice en lugar de suponerla. Un duplicado por pérdida tiene su propia tarifa pequeña donde se publica. La herramienta suma el precio del curso que usted escribe a la tarifa de su estado y muestra al lado la vía gratuita.`;
    },
    faqs: (h) => {
      const { paid, repl } = F(h);
      return [
        { q: '¿Por qué el mismo curso cuesta distinto?', a: 'Los proveedores fijan sus propios precios para los cursos en línea y presenciales, y el estado no los controla. El estado solo cobra su tarifa por la tarjeta. Donde hay un curso gratis aprobado, pagar más de cero por el curso es una elección. Compare el total en esta página antes de pagar.' },
        { q: '¿Pago la tarifa del estado cada año?', a: `En los estados donde la tarjeta vale de por vida, la tarifa se paga una vez. ${paid.length ? `${h.S(paid[0].code).nameL} es un ejemplo de estado con tarifa; su línea de la tabla da la validez.` : ''} Donde el documento va ligado a la licencia de conducir, sigue la renovación de esa licencia. El registro de la embarcación es un costo anual aparte que no se trata aquí.` },
        { q: '¿Cuánto cuesta un duplicado de la tarjeta?', a: `Depende del estado y a veces de quién emitió la tarjeta. Entre los estados verificados, ${repl.length} publican una tarifa de duplicado en la página oficial, que muestra la miniherramienta. En los demás, la agencia o el proveedor del curso que informó su resultado gestiona los duplicados y fija su precio.` },
      ];
    },
    body: (h) => {
      const { req } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.feeL, x.freeL, x.freeOk && x.card.stateFee != null ? h.m(x.card.stateFee) : '–', x.replL]; });
      return `
<h2>El costo en cada estado</h2>
<p>«Total más barato» es el curso gratis aprobado más la tarifa del estado, cuando se conocen los dos. Un guion significa que el curso gratis no está aprobado o que el estado no publica su tarifa.</p>
${h.table(['Estado', 'Tarifa del estado', 'Curso gratis', 'Total más barato', 'Duplicado'], rows, 'Estados verificados con requisito de educación, según las páginas oficiales consultadas.', ['l', 'r', 'r', 'r', 'r'])}
<h2>La tarifa del estado, de cerca</h2>
<p>Lo que cobra el estado, y por qué, cambia: algunos cobran por emitir la tarjeta tras el curso, otros en el curso, y otros la emiten gratis. La miniherramienta muestra la tarifa, el precio del duplicado y cuánto dura la tarjeta en un estado.</p>
<!--tool:mini:cardfee|{"state":"NY"}-->
<h2>Costos que no son la licencia</h2>
<ul>
<li><strong>Registro de la embarcación.</strong> Toda lancha debe estar numerada por su estado, con una tarifa anual o plurianual; el número va a ambos lados de la proa según el ${h.src('cfr173', '33 CFR parte 173')}.</li>
<li><strong>Equipo obligatorio.</strong> Chalecos para cada persona, un dispositivo arrojadizo desde 16 pies, señales de socorro en aguas costeras y extintores donde se exigen, según el ${h.src('cfr175', '33 CFR parte 175')}.</li>
<li><strong>Certificados temporales o de alquiler.</strong> Varios estados venden a los visitantes un certificado de corta duración en los mostradores de alquiler; no es la tarjeta de por vida.</li>
</ul>
<h2>Pague solo si la necesita</h2>
<p>Antes de cualquier gasto, compruebe que la ley se le aplica: en la mayoría de los estados, quienes nacieron antes de una fecha de corte o manejan un motor pequeño no necesitan tarjeta. La ${h.a('home', 'comprobación')} responde eso primero.</p>`;
    },
  },
});
