import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'FL';
const F = (h: Helpers) => ({ s: h.S(C), ga: h.S('GA'), al: h.S('AL') });

export default definePage({
  id: 'state-fl',
  group: 'states',
  order: 101,
  state: C,
  tool: { kind: 'check' },
  mini: { kind: 'mini:quick' },
  related: ['home', 'free-license', 'test', 'state-ga', 'boater-card', 'pwc'],
  sources: ['boatus', 'cfr175', 'cfr173'],
  en: {
    slug: 'florida-boating-license',
    nav: 'Florida',
    card: 'Born in 1988 or later and 10 hp or more: the FWC card, a free accepted course and a 90-day option for visitors.',
    title: 'Florida Boating License 2026: Who Needs the FWC Card',
    description: 'Florida boating license rules: born on or after Jan. 1, 1988 and 10 hp or more means the FWC card. Check your case, see the free course and the 90-day option.',
    h1: 'Florida boating license: who needs the FWC card',
    intro: 'Florida does not issue a boating license as such: it asks younger operators for a Boating Safety Education ID Card. Enter your birth date and boat to see if it applies to you.',
    resume: (h) => {
      const { s } = F(h);
      return `In Florida, anyone born on or after ${s.cutoffL ?? h.nc} must complete an approved boating safety course and carry the ${s.cardL}, issued by the Florida Fish and Wildlife Conservation Commission (FWC), to operate a motorboat of ${s.hpL ?? h.nc}. Operators born before that date need no card at all, whatever boat they run, and a motor below 10 horsepower is outside the rule. The card is valid ${s.validL} and is not a license you renew. The free online course of the BoatUS Foundation is ${s.freeL} for Florida, so the course can cost nothing; FWC lists free and paid options and course providers set their own prices. Several exemptions apply: a person on board who is 18 or older, holds the card or is exempt, and is responsible for the boat covers an operator without one; a visitor can use proof of a NASBLA-approved course from another state with a photo ID; and a course certificate with a photo ID is accepted for 90 days while the card is on its way. For a short stay, an FWC-authorized vendor can give a temporary certificate exam valid 90 days in Florida only. The check above applies the rule to your date of birth and boat.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'I was born in 1987. Do I need a Florida boating card?', a: `No. The Florida requirement covers people born on or after ${s.cutoffL ?? h.nc}, so someone born in 1987 or earlier may operate a motorboat of 10 hp or more without the card. Anyone may still take the course by choice. An adult of 18 or more who is exempt in this way can also be the responsible person on board who lets a younger operator without the card run the boat.` },
        { q: 'How long does the Florida card take to arrive, and can I boat meanwhile?', a: 'After an approved course, the completion certificate together with a photo ID is accepted for 90 days, which covers the time the FWC takes to issue the plastic card. Keep both on board. Once the card comes, it is valid for life and the certificate is no longer needed.' },
        { q: 'Can a tourist rent a boat in Florida without a course?', a: 'A visitor born on or after January 1, 1988 needs either proof of a NASBLA-approved course from home with a photo ID, or a Florida temporary certificate. The temporary certificate comes from an exam given by FWC-authorized vendors, is valid 90 days and works only in Florida; it cannot later be exchanged for the lifetime card.' },
        { q: 'Does the Florida rule apply to a jet ski?', a: `Yes, when the engine is 10 hp or more, which is the case of every personal watercraft on sale. The same card and the same birth-date cut-off apply. Florida also has age rules specific to personal watercraft operators and renters; they are set by state statute and the FWC, so check the agency page linked below before a rental.` },
      ];
    },
    body: (h) => {
      const { s, ga, al } = F(h);
      return `
<h2>The Florida rule in three conditions</h2>
<p>All three must be true for the card to be required: you were born on or after ${s.cutoffL ?? h.nc}; you are the one operating; the boat has a motor of ${s.hpL ?? h.nc}. A canoe, a kayak, a sailboat without motor or a jon boat with a small outboard below that power is outside the rule. The operator is the person in control of the boat, so a passenger never needs the card. The quick check below answers from a year of birth; when your birthday falls in 1988, use the full check above with the exact date.</p>
<!--tool:mini:quick|{"state":"FL","year":1990,"hp":115}-->
<h2>Getting the card: course, then FWC</h2>
<p>The route has two steps. First, an approved course: classroom, online or the FWC's own options, all NASBLA-approved and covering the federal Navigation Rules, equipment and Florida law. The BoatUS Foundation course is ${s.freeL} in Florida (${h.ext(s.freeUrl, 'its Florida page')}), which makes the cheapest route free. Second, the ${s.cardL}: the FWC issues it once the course is reported, and it keeps its value for life. Approved course providers set their own prices; the FWC page linked below lists them.</p>
<h2>Florida beside its neighbors</h2>
${h.table(['', 'Florida', 'Georgia', 'Alabama'], [
  ['Who needs it', s.whoL, ga.whoL, al.whoL],
  ['Power', s.hpL ?? h.nc, ga.hpL ?? h.nc, al.hpL ?? (al.required ? 'any motor' : '–')],
  ['Credential', s.cardL, ga.cardL, al.cardL],
  ['State fee', s.feeL, ga.feeL, al.feeL],
  ['Free BoatUS course', s.freeL, ga.freeL, al.freeL],
], 'Florida compared with the two states that share its northern border, from the official pages read.', ['l', 'l', 'l', 'l'])}
<p>The contrast with ${h.sl('AL')} matters for anyone boating on both sides of the line: Alabama requires a vessel license for nearly every operator of a motorized vessel, a credential tied to the driver license, while Florida only asks younger operators for a lifetime course card. ${h.sl('GA')} uses its own cut-off date.</p>
<h2>Visitors, rentals and the 90-day options</h2>
<p>Florida accepts a course from another state when it is NASBLA-approved: carry the card and a photo ID. A visitor without any course, born on or after the cut-off, has one more option: the temporary certificate exam given by FWC-authorized vendors, often at rental counters. It is valid 90 days and only in Florida, and it cannot be turned into the lifetime card later. Someone planning to boat in Florida every winter saves time by taking a full course once.</p>
<h2>What else is checked on the water</h2>
<p>An officer who stops a boat in Florida also looks at the federal equipment rules: one approved wearable life jacket per person, a throwable device on boats 16 feet and longer, visual distress signals on coastal waters, and the registration number on both sides of the bow, as set by ${h.src('cfr175', '33 CFR part 175')} and ${h.src('cfr173', '33 CFR part 173')}. The ${h.a('test', 'practice test')} covers them. Rules on this page were read on ${h.os(C, 'the FWC pages')} on ${s.checkedL}; this site is not affiliated with the FWC.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-florida',
    nav: 'Florida',
    card: 'Nacidos desde 1988 y 10 hp o más: la tarjeta de la FWC, un curso gratis aceptado y una opción de 90 días.',
    title: 'Licencia de navegación en Florida 2026: la tarjeta FWC',
    description: 'Licencia de navegación en Florida: nacidos desde el 1 de enero de 1988 con 10 hp o más necesitan la tarjeta FWC. Vea su caso, el curso gratis y los 90 días.',
    h1: 'Licencia de navegación en Florida: quién necesita la tarjeta de la FWC',
    intro: 'Florida no expide una licencia de navegación propiamente dicha: pide a los operadores más jóvenes una tarjeta de educación en seguridad náutica. Indique su fecha de nacimiento y su embarcación.',
    resume: (h) => {
      const { s } = F(h);
      return `En Florida, quien nació a partir del ${s.cutoffL ?? h.nc} debe aprobar un curso de seguridad náutica y llevar la ${s.cardL}, emitida por la Comisión de Conservación de Pesca y Vida Silvestre de Florida (FWC), para manejar una lancha de ${s.hpL ?? h.nc}. Quien nació antes de esa fecha no necesita ninguna tarjeta, sea cual sea la embarcación, y un motor de menos de 10 caballos queda fuera de la regla. La tarjeta vale ${s.validL} y no es una licencia que se renueva. El curso gratuito en línea de la BoatUS Foundation está ${s.freeL === 'aceptado' ? 'aceptado' : s.freeL} en Florida, así que el curso puede no costar nada; la FWC enumera opciones gratuitas y de pago, y cada proveedor fija su precio. Hay varias exenciones: una persona a bordo de 18 años o más, con la tarjeta o exenta, que se hace responsable de la embarcación cubre a un operador sin ella; un visitante puede usar la prueba de un curso aprobado por NASBLA en otro estado con una identificación con foto; y el certificado del curso con una identificación con foto vale 90 días mientras llega la tarjeta. Para una estancia corta, un proveedor autorizado por la FWC puede tomar un examen de certificado temporal válido 90 días, solo en Florida. La comprobación de arriba aplica la regla a su fecha de nacimiento y su embarcación.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Nací en 1987. ¿Necesito la tarjeta náutica de Florida?', a: `No. El requisito de Florida cubre a quienes nacieron a partir del ${s.cutoffL ?? h.nc}, así que quien nació en 1987 o antes puede manejar una lancha de 10 hp o más sin la tarjeta. Cualquiera puede tomar el curso por gusto. Un adulto de 18 años o más exento de esta forma también puede ser la persona responsable a bordo que permite manejar a un operador más joven sin tarjeta.` },
        { q: '¿Cuánto tarda en llegar la tarjeta de Florida y puedo navegar mientras tanto?', a: 'Después de un curso aprobado, el certificado de finalización junto con una identificación con foto se acepta durante 90 días, el tiempo que la FWC tarda en emitir la tarjeta de plástico. Lleve los dos a bordo. Cuando llega la tarjeta, vale de por vida y el certificado ya no hace falta.' },
        { q: '¿Puede un turista alquilar una lancha en Florida sin curso?', a: 'Un visitante nacido a partir del 1 de enero de 1988 necesita la prueba de un curso aprobado por NASBLA en su estado con una identificación con foto, o un certificado temporal de Florida. Ese certificado sale de un examen que hacen los proveedores autorizados por la FWC, vale 90 días y solo en Florida; no se puede canjear después por la tarjeta de por vida.' },
        { q: '¿La regla de Florida se aplica a una moto acuática?', a: 'Sí, cuando el motor tiene 10 hp o más, como todas las motos acuáticas que se venden. Se aplican la misma tarjeta y la misma fecha de corte. Florida tiene además reglas de edad propias para quienes manejan o alquilan motos acuáticas; las fijan la ley estatal y la FWC, así que consulte la página de la agencia enlazada abajo antes de alquilar.' },
      ];
    },
    body: (h) => {
      const { s, ga, al } = F(h);
      return `
<h2>La regla de Florida en tres condiciones</h2>
<p>Las tres deben cumplirse para que se exija la tarjeta: usted nació a partir del ${s.cutoffL ?? h.nc}; usted es quien maneja; la embarcación tiene un motor de ${s.hpL ?? h.nc}. Una canoa, un kayak, un velero sin motor o un bote con un fueraborda pequeño por debajo de esa potencia quedan fuera. El operador es quien controla la embarcación, así que un pasajero nunca necesita la tarjeta. La comprobación rápida de abajo responde a partir del año de nacimiento; si cumple años en 1988, use la comprobación completa de arriba con la fecha exacta.</p>
<!--tool:mini:quick|{"state":"FL","year":1990,"hp":115}-->
<h2>Cómo obtener la tarjeta: curso y luego FWC</h2>
<p>El camino tiene dos pasos. Primero, un curso aprobado: presencial, en línea o las opciones de la propia FWC, todos aprobados por NASBLA y con las Reglas de Navegación federales, el equipo y la ley de Florida. El curso de la BoatUS Foundation está ${s.freeL} en Florida (${h.ext(s.freeUrl, 'su página de Florida')}), lo que hace gratuita la vía más barata. Segundo, la ${s.cardL}: la FWC la emite cuando se informa el curso, y vale para toda la vida. Los proveedores aprobados fijan sus propios precios; la página de la FWC enlazada abajo los enumera.</p>
<h2>Florida frente a sus vecinos</h2>
${h.table(['', 'Florida', 'Georgia', 'Alabama'], [
  ['Quién la necesita', s.whoL, ga.whoL, al.whoL],
  ['Potencia', s.hpL ?? h.nc, ga.hpL ?? h.nc, al.hpL ?? (al.required ? 'todo motor' : '–')],
  ['Documento', s.cardL, ga.cardL, al.cardL],
  ['Tarifa del estado', s.feeL, ga.feeL, al.feeL],
  ['Curso gratis BoatUS', s.freeL, ga.freeL, al.freeL],
], 'Florida frente a los dos estados de su frontera norte, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l'])}
<p>La diferencia con ${h.sl('AL')} importa a quien navega a ambos lados de la frontera: Alabama exige una licencia de embarcación a casi todo operador de una embarcación con motor, un documento ligado a la licencia de conducir, mientras que Florida solo pide a los operadores más jóvenes una tarjeta de curso de por vida. ${h.sl('GA')} usa su propia fecha de corte.</p>
<h2>Visitantes, alquileres y las opciones de 90 días</h2>
<p>Florida acepta el curso de otro estado si está aprobado por NASBLA: lleve la tarjeta y una identificación con foto. Un visitante sin curso, nacido a partir de la fecha de corte, tiene otra opción: el examen de certificado temporal de los proveedores autorizados por la FWC, a menudo en los mostradores de alquiler. Vale 90 días y solo en Florida, y no se convierte después en la tarjeta de por vida. Quien piensa navegar en Florida cada invierno gana tiempo con un curso completo una sola vez.</p>
<h2>Lo que también se revisa en el agua</h2>
<p>Un agente que detiene una embarcación en Florida también comprueba las reglas federales de equipo: un chaleco salvavidas ponible aprobado por persona, un dispositivo arrojadizo en embarcaciones de 16 pies o más, señales visuales de socorro en aguas costeras y el número de registro a ambos lados de la proa, según el ${h.src('cfr175', '33 CFR parte 175')} y el ${h.src('cfr173', '33 CFR parte 173')}. El ${h.a('test', 'examen de práctica')} los repasa. Las reglas de esta página se leyeron en ${h.os(C, 'las páginas de la FWC')} el ${s.checkedL}; este sitio no está afiliado a la FWC.</p>`;
    },
  },
});
