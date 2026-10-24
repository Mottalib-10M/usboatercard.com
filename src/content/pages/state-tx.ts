import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'TX';
const F = (h: Helpers) => ({ s: h.S(C), ok: h.S('OK'), la: h.S('LA'), nm: h.S('NM') });

export default definePage({
  id: 'state-tx',
  group: 'states',
  order: 102,
  state: C,
  tool: { kind: 'check' },
  mini: { kind: 'mini:age' },
  related: ['home', 'free-license', 'how-much', 'state-fl', 'pwc', 'test'],
  sources: ['boatus', 'cfr175'],
  en: {
    slug: 'texas-boating-license',
    nav: 'Texas',
    card: 'Born on or after Sept. 1, 1993: the TPWD certificate for a PWC, a motor over 15 hp or a sailboat over 14 ft.',
    title: 'Texas Boating License 2026: Who Needs the TPWD Course',
    description: 'Texas boating license rules: born on or after Sept. 1, 1993 with a PWC, a motor over 15 hp or a sail over 14 ft means the course. Check your case for free.',
    h1: 'Texas boating license: who needs the TPWD course',
    intro: 'Texas asks younger boaters for a Boater Education Certificate, not a license that expires. Enter your birth date and boat to see whether the rule covers you.',
    resume: (h) => {
      const { s } = F(h);
      return `In Texas, anyone born on or after ${s.cutoffL ?? h.nc} must complete a boater education course approved by the Texas Parks and Wildlife Department (TPWD) and carry the ${s.cardL} to operate a personal watercraft, a motorboat with ${s.hpL ?? h.nc} or a sailboat longer than 14 feet. Someone born before that date needs no certificate, and a boat with 15 hp or less, a canoe or a kayak is outside the rule. Operating alone starts at ${s.motorAgeL}: a younger child may run such a boat only with a legal operator aged 18 or older on board. The free online course of the BoatUS Foundation is ${s.freeL} in Texas, while TPWD says paid course fees start at $10 and depend on the provider and format. Texas accepts NASBLA-approved certificates from every state and territory, so a visitor with a course from home is covered. For a first trip without a course, a one-time 15-day deferral is sold wherever hunting and fishing licenses are sold. The check above applies the rule to your birth date and boat.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the Texas boater education deferral?', a: 'It is a one-time, 15-day permit to operate without the certificate, bought at any place that sells Texas hunting and fishing licenses. It is meant for someone who needs to boat before taking the course. It can be used only once in a lifetime, so taking the course remains the lasting answer.' },
        { q: 'Can my 12-year-old drive our boat on a Texas lake?', a: `Only with a legal operator aged 18 or older on board if the boat is a PWC, has more than 15 hp or is a sailboat over 14 feet. From ${s.motorAgeL}, a child who has passed the course may operate those boats alone. A smaller boat of 15 hp or less is not covered by the age rule on the TPWD page.` },
        { q: 'I was born in 1990. Does Texas require anything from me?', a: `No certificate. The requirement applies to people born on or after ${s.cutoffL ?? h.nc}, so someone born in 1990 may operate any recreational boat in Texas without one. The boat still needs its registration and the federal safety equipment on board.` },
      ];
    },
    body: (h) => {
      const { s, ok, la, nm } = F(h);
      return `
<h2>The Texas rule, boat by boat</h2>
<p>The certificate is required only for three kinds of boats, and only for people born on or after ${s.cutoffL ?? h.nc}:</p>
<ul>
<li><strong>A personal watercraft</strong>, whatever its power.</li>
<li><strong>A motorboat with ${s.hpL ?? h.nc}</strong>; 15 hp or less is outside the rule.</li>
<li><strong>A sailboat over 14 feet</strong>, even without an engine.</li>
</ul>
<p>The age rule follows the same three boats: alone from ${s.motorAgeL} with the course, otherwise with a legal operator of 18 or more on board. The mini-tool answers for any age in a state.</p>
<!--tool:mini:age|{"state":"TX","age":12}-->
<h2>The course and what it costs</h2>
<p>TPWD approves classroom, online and other formats. The BoatUS Foundation course is ${s.freeL} in Texas (${h.ext(s.freeUrl, 'its Texas page')}), so the cheapest route costs nothing for the course. Paid options start at $10 according to TPWD and vary by provider. TPWD does not publish a separate card fee on the pages read, so the tool shows the state fee as ${s.feeL}.</p>
<h2>Texas beside its neighbors</h2>
${h.table(['', 'Texas', 'Oklahoma', 'Louisiana', 'New Mexico'], [
  ['Who needs it', s.whoL, ok.whoL, la.whoL, nm.whoL],
  ['Alone, motorboat', s.motorAgeL, ok.motorAgeL, la.motorAgeL, nm.motorAgeL],
  ['Free BoatUS course', s.freeL, ok.freeL, la.freeL, nm.freeL],
  ['State fee', s.feeL, ok.feeL, la.feeL, nm.feeL],
], 'Texas and the states on its borders, from the official pages read.', ['l', 'l', 'l', 'l', 'l'])}
<p>Lakes on the Red River and the Sabine River are shared, so a boater from Texas often ends up under ${h.sl('OK')} or ${h.sl('LA')} rules. A Texas certificate from an approved course is normally accepted there too; the state pages give each agency's wording.</p>
<h2>Visitors and short trips</h2>
<p>Texas recognizes NASBLA-approved certificates from all 50 states and the US territories. A visitor without a course has the one-time 15-day deferral sold with hunting and fishing licenses. Rental rules are not described on the TPWD pages read, so ask the rental business how it checks the certificate.</p>
<h2>On the water</h2>
<p>Federal equipment rules apply on every Texas lake and on the Gulf: a wearable life jacket per person, a throwable device on boats of 16 feet and more, extinguishers where required, and visual distress signals on coastal waters, as set by ${h.src('cfr175', '33 CFR part 175')}. The ${h.a('test', 'practice test')} covers them. Rules on this page were read on ${h.os(C, 'the TPWD pages')} on ${s.checkedL}; this site is not affiliated with TPWD.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-texas',
    nav: 'Texas',
    card: 'Nacidos desde el 1 de septiembre de 1993: el certificado de TPWD para moto acuática, motor de más de 15 hp o velero de más de 14 pies.',
    title: 'Licencia de navegación en Texas 2026: el curso de TPWD',
    description: 'Licencia de navegación en Texas: nacidos desde el 1 de septiembre de 1993 con moto acuática, más de 15 hp o velero de 14 pies necesitan el curso. Vea su caso.',
    h1: 'Licencia de navegación en Texas: quién necesita el curso de TPWD',
    intro: 'Texas pide a los navegantes más jóvenes un certificado de educación náutica, no una licencia que caduca. Indique su fecha de nacimiento y su embarcación para ver si la regla le cubre.',
    resume: (h) => {
      const { s } = F(h);
      return `En Texas, quien nació a partir del ${s.cutoffL ?? h.nc} debe aprobar un curso de educación náutica aprobado por el Departamento de Parques y Vida Silvestre de Texas (TPWD) y llevar el ${s.cardL} para manejar una moto acuática, una lancha con motor de ${s.hpL ?? h.nc} o un velero de más de 14 pies. Quien nació antes de esa fecha no necesita certificado, y una embarcación de 15 hp o menos, una canoa o un kayak quedan fuera de la regla. Se puede manejar sin compañía desde los ${s.motorAgeL}: un niño más pequeño solo puede manejar esas embarcaciones con un operador legal de 18 años o más a bordo. El curso gratuito en línea de la BoatUS Foundation está ${s.freeL} en Texas, y TPWD indica que los cursos de pago empiezan en 10 dólares según el proveedor y el formato. Texas acepta los certificados aprobados por NASBLA de todos los estados y territorios, así que un visitante con un curso de su estado está cubierto. Para una primera salida sin curso, se vende un aplazamiento único de 15 días donde se venden licencias de caza y pesca. La comprobación de arriba aplica la regla a su fecha de nacimiento y su embarcación.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Qué es el aplazamiento de educación náutica de Texas?', a: 'Es un permiso único de 15 días para manejar sin el certificado, que se compra en cualquier lugar que venda licencias de caza y pesca de Texas. Sirve a quien necesita navegar antes de hacer el curso. Solo puede usarse una vez en la vida, así que el curso sigue siendo la solución duradera.' },
        { q: '¿Puede mi hijo de 12 años manejar nuestra lancha en un lago de Texas?', a: `Solo con un operador legal de 18 años o más a bordo si se trata de una moto acuática, de más de 15 hp o de un velero de más de 14 pies. Desde los ${s.motorAgeL}, un niño que aprobó el curso puede manejarlas solo. Una embarcación de 15 hp o menos no está cubierta por la regla de edad de la página de TPWD.` },
        { q: 'Nací en 1990. ¿Texas me exige algo?', a: `Ningún certificado. El requisito se aplica a quienes nacieron a partir del ${s.cutoffL ?? h.nc}, así que alguien nacido en 1990 puede manejar cualquier embarcación recreativa en Texas sin él. La embarcación sigue necesitando su registro y el equipo federal de seguridad a bordo.` },
      ];
    },
    body: (h) => {
      const { s, ok, la, nm } = F(h);
      return `
<h2>La regla de Texas, embarcación por embarcación</h2>
<p>El certificado solo se exige para tres tipos de embarcación, y solo a quienes nacieron a partir del ${s.cutoffL ?? h.nc}:</p>
<ul>
<li><strong>Una moto acuática</strong>, sea cual sea su potencia.</li>
<li><strong>Una lancha con motor de ${s.hpL ?? h.nc}</strong>; 15 hp o menos queda fuera.</li>
<li><strong>Un velero de más de 14 pies</strong>, aunque no tenga motor.</li>
</ul>
<p>La regla de edad sigue las mismas tres embarcaciones: sin compañía desde los ${s.motorAgeL} con el curso, y si no, con un operador legal de 18 años o más a bordo. La miniherramienta responde para cualquier edad en un estado.</p>
<!--tool:mini:age|{"state":"TX","age":12}-->
<h2>El curso y su costo</h2>
<p>TPWD aprueba cursos presenciales, en línea y otros formatos. El curso de la BoatUS Foundation está ${s.freeL} en Texas (${h.ext(s.freeUrl, 'su página de Texas')}), así que la vía más barata no cuesta nada en curso. Las opciones de pago empiezan en 10 dólares según TPWD y varían según el proveedor. TPWD no publica una tarifa aparte por la tarjeta en las páginas consultadas, así que la herramienta muestra la tarifa del estado como ${s.feeL}.</p>
<h2>Texas frente a sus vecinos</h2>
${h.table(['', 'Texas', 'Oklahoma', 'Luisiana', 'Nuevo México'], [
  ['Quién la necesita', s.whoL, ok.whoL, la.whoL, nm.whoL],
  ['Sin compañía, lancha', s.motorAgeL, ok.motorAgeL, la.motorAgeL, nm.motorAgeL],
  ['Curso gratis BoatUS', s.freeL, ok.freeL, la.freeL, nm.freeL],
  ['Tarifa del estado', s.feeL, ok.feeL, la.feeL, nm.feeL],
], 'Texas y los estados de su frontera, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l', 'l'])}
<p>Los lagos del río Rojo y del río Sabine son compartidos, así que un navegante de Texas acaba a menudo bajo las reglas de ${h.sl('OK')} o de ${h.sl('LA')}. Un certificado de Texas de un curso aprobado suele aceptarse también allí; las páginas de estado dan la redacción de cada agencia.</p>
<h2>Visitantes y salidas cortas</h2>
<p>Texas reconoce los certificados aprobados por NASBLA de los 50 estados y de los territorios de Estados Unidos. Un visitante sin curso dispone del aplazamiento único de 15 días que se vende con las licencias de caza y pesca. Las páginas de TPWD consultadas no describen reglas de alquiler, así que pregunte a la empresa cómo comprueba el certificado.</p>
<h2>En el agua</h2>
<p>Las reglas federales de equipo se aplican en todos los lagos de Texas y en el golfo: un chaleco salvavidas ponible por persona, un dispositivo arrojadizo en embarcaciones de 16 pies o más, extintores donde se exigen y señales visuales de socorro en aguas costeras, según el ${h.src('cfr175', '33 CFR parte 175')}. El ${h.a('test', 'examen de práctica')} los repasa. Las reglas de esta página se leyeron en ${h.os(C, 'las páginas de TPWD')} el ${s.checkedL}; este sitio no está afiliado a TPWD.</p>`;
    },
  },
});
