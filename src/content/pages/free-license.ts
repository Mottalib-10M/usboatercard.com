import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const req = h.where((s) => s.required === true);
  const free = req.filter((s) => s.boatus?.status === 'approved');
  const freeZero = free.filter((s) => s.card.stateFee === 0);
  const freeFee = free.filter((s) => (s.card.stateFee ?? 0) > 0);
  const notFree = req.filter((s) => s.boatus?.status === 'not-approved');
  const na = req.filter((s) => s.boatus?.status === 'not-available');
  const enroll = free.filter((s) => s.boatus?.payment?.kind === 'enrollment');
  const buy = free.filter((s) => s.boatus?.payment?.kind === 'card-required');
  const opt = free.filter((s) => s.boatus?.payment?.kind === 'optional-card');
  return { req, free, freeZero, freeFee, notFree, na, enroll, buy, opt };
};

export default definePage({
  id: 'free-license',
  group: 'course',
  order: 11,
  tool: { kind: 'mini:free', props: { state: 'GA' } },
  mini: { kind: 'mini:cost', props: { state: 'MI', price: 40 } },
  related: ['safety-course', 'how-much', 'online', 'test', 'state-ga'],
  sources: ['boatus', 'boatusAbout'],
  en: {
    slug: 'free-boating-license',
    nav: 'Free boating course',
    card: 'Where the free online course is approved for the state card, and what the state still charges.',
    title: 'Free Boating License: Where the Free Course Counts (2026)',
    description: 'Free boating license: the states where the free online course is accepted for the card, the state fee that may still apply and the cheapest legal total.',
    h1: 'Free boating license: where the free course counts',
    intro: 'A free online course is approved for the card in most states that require one. Pick your state: approved or not, and what remains to pay.',
    resume: (h) => {
      const { req, free, freeFee, notFree, na, enroll, buy } = F(h);
      return `The BoatUS Foundation, which describes itself as a 501(c)(3) nonprofit, gives an online boating safety course it marks "Free*" and has it approved state by state. Of the ${req.length} verified states that require boater education, the course is approved in ${free.length}. In ${freeFee.length} of those the state still charges its own fee for the card, so "free" means a free course plus that fee; the tool shows it. On its own state pages the Foundation also states a payment in some states: collected at enrollment in ${h.list(h.names(enroll))}, and a state card to buy after the course in ${h.list(h.names(buy))}. In ${notFree.length} states the free course is not approved for the state card${notFree.length ? `: ${h.list(h.names(notFree).slice(0, 6))}${notFree.length > 6 ? ' and others' : ''}` : ''}; there you take a course the state approves, sometimes free when the state or a volunteer group gives it in a classroom, often paid online. ${na.length ? `In ${h.list(h.names(na))} the free course is not available at all, because the state credential works differently.` : ''} Paid online courses are not a better legal option where the free one is approved: the card is the same. This page reads the Foundation's own state list and links each state's free course page.`;
    },
    faqs: (h) => {
      const { notFree } = F(h);
      return [
        { q: 'Is the free boating course really free, or is there a fee at the end?', a: `The Foundation marks the course "Free*", and its state pages say what the asterisk covers: in ${h.list(h.names(F(h).enroll))} it collects a payment at enrollment, which it forwards to the state, and in ${h.list(h.names(F(h).buy))} the permanent card must be bought after the course. Elsewhere, some states charge their own fee for the card. The table on this page shows the state fee and the payment the Foundation states, so you know the full cost before you start.` },
        { q: 'Why do paid courses exist if a free one is approved?', a: 'Paid providers offer other formats, extra states, or the course in states where the free one is not approved. Where the free course is approved, the card you receive is the same as with a paid course. The choice is yours; the law asks only for an approved course and, in some states, the state fee.' },
        { q: 'What can I do in a state that does not approve the free course?', a: `In ${notFree.length ? h.list(h.names(notFree).slice(0, 4)) : 'those states'}, look at the state agency page linked from the state's line: agencies often list their own classroom courses, some at no cost, given by the state, the Coast Guard Auxiliary or the Power Squadrons. An online course approved by that state is the other route.` },
      ];
    },
    body: (h) => {
      const { req, free, notFree } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); const p = x.pay; return [h.sl(s.code), x.freeOk ? h.ext(x.freeUrl, x.freeL) : x.freeL, x.feeL, x.freeOk && p ? h.ext(p.url, `${h.m(p.amount)} (${p.kind === 'enrollment' ? 'at enrollment' : p.kind === 'card-required' ? 'card to buy' : 'optional card'})`) : '–', x.cardL]; });
      return `
<h2>State by state</h2>
<p>"Free course" links to the Foundation's page for the state when it is approved. "State fee" is what the state itself charges for the credential, read on its official page. "BoatUS payment" is what the Foundation's state page says is collected at enrollment, must be bought, or is optional; the amount can differ from the state fee read on the state's page.</p>
${h.table(['State', 'Free course', 'State fee', 'BoatUS payment', 'Credential'], rows, `The ${req.length} verified states with a requirement. Approval status read on the BoatUS Foundation state list on ${h.date(h.TODAY)}; payments read on its state pages on ${h.date(h.payRead)}.`, ['l', 'l', 'r', 'r', 'l'])}
<h2>What "approved" means</h2>
<p>A course is approved when the state's boating agency accepts it for its card, which usually requires the course to meet the national standard and to include the state's own law. Approval is decided by each state, so the same free course can count in ${h.sl('GA')} and not in ${notFree[0] ? h.sl(notFree[0].code) : 'another state'}. The Foundation keeps the list current; when a state changes its position, the list changes and so does this page at its next update.</p>
<h2>Cost with a paid course</h2>
<p>If your state does not approve the free course, or you prefer another format, enter the price of the course you found: the mini-tool adds the state fee and compares with the free route.</p>
<!--tool:mini:cost|{"state":"NH","price":40}-->
<h2>Free does not mean temporary</h2>
<p>The card earned through a free approved course is the same lifetime credential as any other in states where the card does not expire. It is not a "temporary" or "rental" certificate, which several states sell at rental counters for short stays. If you will boat more than once, the full free course is the better deal in the ${free.length} states that approve it.</p>
<h2>Before you start</h2>
<p>Check first whether you need the card at all: if you were born before your state's cut-off date, or your motor is below its power threshold, no course is required. The ${h.a('home', 'check on the home page')} answers in a few seconds. Then use the ${h.a('test', 'practice test')} to prepare the course exam.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-gratis',
    nav: 'Curso náutico gratis',
    card: 'Dónde se aprueba el curso gratuito en línea para la tarjeta del estado y qué cobra todavía el estado.',
    title: 'Licencia de navegación gratis: dónde cuenta el curso',
    description: 'Licencia de navegación gratis: los estados donde el curso gratuito en línea vale para la tarjeta, la tarifa estatal que puede quedar y el total más barato.',
    h1: 'Licencia de navegación gratis: dónde cuenta el curso gratuito',
    intro: 'En la mayoría de los estados que exigen tarjeta hay un curso en línea gratuito aprobado. Elija su estado: aprobado o no, y lo que queda por pagar.',
    resume: (h) => {
      const { req, free, freeFee, notFree, na, enroll, buy } = F(h);
      return `La BoatUS Foundation, que se presenta como organización sin fines de lucro 501(c)(3), ofrece un curso de seguridad náutica en línea que marca «Free*» y lo hace aprobar estado por estado. De los ${req.length} estados verificados que exigen educación náutica, el curso está aprobado en ${free.length}. En ${freeFee.length} de ellos el estado cobra igualmente su propia tarifa por la tarjeta, así que «gratis» significa curso gratis más esa tarifa; la herramienta la muestra. En sus propias páginas de estado, la fundación indica además un pago en algunos estados: se cobra al inscribirse en ${h.list(h.names(enroll))}, y hay que comprar la tarjeta del estado después del curso en ${h.list(h.names(buy))}. En ${notFree.length} estados el curso gratuito no está aprobado para la tarjeta estatal${notFree.length ? `: ${h.list(h.names(notFree).slice(0, 6))}${notFree.length > 6 ? ' y otros' : ''}` : ''}; allí hay que tomar un curso que apruebe el estado, a veces gratis cuando lo da el estado o un grupo voluntario en un aula, a menudo de pago en línea. ${na.length ? `En ${h.list(h.names(na))} el curso gratuito no está disponible en absoluto, porque el documento estatal funciona de otra manera.` : ''} Donde el curso gratis está aprobado, un curso de pago no es una opción legal mejor: la tarjeta es la misma. Esta página lee la lista de estados de la propia fundación y enlaza la página del curso de cada estado.`;
    },
    faqs: (h) => {
      const { notFree } = F(h);
      return [
        { q: '¿El curso náutico gratis es realmente gratis o hay que pagar al final?', a: `La fundación marca el curso «Free*», y sus páginas de estado dicen lo que cubre el asterisco: en ${h.list(h.names(F(h).enroll))} cobra un pago al inscribirse, que reenvía al estado, y en ${h.list(h.names(F(h).buy))} hay que comprar la tarjeta permanente después del curso. En otros estados, algunos cobran su propia tarifa por la tarjeta. La tabla de esta página muestra la tarifa del estado y el pago que indica la fundación, para que conozca el costo total antes de empezar.` },
        { q: '¿Por qué existen cursos de pago si hay uno gratuito aprobado?', a: 'Los proveedores de pago ofrecen otros formatos, otros estados o el curso donde el gratuito no está aprobado. Donde el curso gratis está aprobado, la tarjeta que recibe es la misma que con un curso de pago. La elección es suya; la ley solo pide un curso aprobado y, en algunos estados, la tarifa del estado.' },
        { q: '¿Qué hago en un estado que no aprueba el curso gratuito?', a: `En ${notFree.length ? h.list(h.names(notFree).slice(0, 4)) : 'esos estados'}, mire la página de la agencia estatal enlazada desde la línea del estado: las agencias suelen publicar sus propios cursos presenciales, algunos sin costo, dados por el estado, la Guardia Costera Auxiliar o los Power Squadrons. Un curso en línea aprobado por ese estado es la otra vía.` },
      ];
    },
    body: (h) => {
      const { req, free, notFree } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); const p = x.pay; return [h.sl(s.code), x.freeOk ? h.ext(x.freeUrl, x.freeL) : x.freeL, x.feeL, x.freeOk && p ? h.ext(p.url, `${h.m(p.amount)} (${p.kind === 'enrollment' ? 'al inscribirse' : p.kind === 'card-required' ? 'tarjeta que comprar' : 'tarjeta opcional'})`) : '–', x.cardL]; });
      return `
<h2>Estado por estado</h2>
<p>«Curso gratis» enlaza a la página de la fundación para el estado cuando está aprobado. «Tarifa del estado» es lo que cobra el propio estado por el documento, leído en su página oficial. «Pago BoatUS» es lo que la página de la fundación para el estado dice que se cobra al inscribirse, hay que comprar o es opcional; el importe puede diferir de la tarifa leída en la página del estado.</p>
${h.table(['Estado', 'Curso gratis', 'Tarifa del estado', 'Pago BoatUS', 'Documento'], rows, `Los ${req.length} estados verificados con requisito. Aprobación leída en la lista de estados de la BoatUS Foundation el ${h.date(h.TODAY)}; pagos leídos en sus páginas de estado el ${h.date(h.payRead)}.`, ['l', 'l', 'r', 'r', 'l'])}
<h2>Qué significa «aprobado»</h2>
<p>Un curso está aprobado cuando la agencia náutica del estado lo acepta para su tarjeta, lo que suele exigir que cumpla el estándar nacional e incluya la ley propia del estado. La aprobación la decide cada estado, así que el mismo curso gratis puede contar en ${h.sl('GA')} y no en ${notFree[0] ? h.sl(notFree[0].code) : 'otro estado'}. La fundación mantiene la lista al día; cuando un estado cambia de posición, cambia la lista y esta página en su siguiente actualización.</p>
<h2>Costo con un curso de pago</h2>
<p>Si su estado no aprueba el curso gratuito, o prefiere otro formato, escriba el precio del curso que encontró: la miniherramienta suma la tarifa del estado y lo compara con la vía gratuita.</p>
<!--tool:mini:cost|{"state":"NH","price":40}-->
<h2>Gratis no significa temporal</h2>
<p>La tarjeta obtenida con un curso gratuito aprobado es el mismo documento de por vida que cualquier otra en los estados donde la tarjeta no caduca. No es un certificado «temporal» o «de alquiler», como los que varios estados venden en los mostradores de alquiler para estancias cortas. Si va a navegar más de una vez, el curso gratuito completo es la mejor opción en los ${free.length} estados que lo aprueban.</p>
<h2>Antes de empezar</h2>
<p>Compruebe primero si necesita la tarjeta: si nació antes de la fecha de corte de su estado, o su motor está por debajo del umbral de potencia, no se exige ningún curso. La ${h.a('home', 'comprobación de la página de inicio')} responde en unos segundos. Luego use el ${h.a('test', 'examen de práctica')} para preparar el examen del curso.</p>`;
    },
  },
});
