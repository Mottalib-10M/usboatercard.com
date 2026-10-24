import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'CA';
const F = (h: Helpers) => ({ s: h.S(C), or: h.S('OR'), nv: h.S('NV'), az: h.S('AZ') });

export default definePage({
  id: 'state-ca',
  group: 'states',
  order: 103,
  state: C,
  tool: { kind: 'check' },
  mini: { kind: 'mini:cardfee' },
  related: ['home', 'boater-card', 'how-much', 'free-license', 'age', 'test'],
  sources: ['boatus', 'cfr175', 'cfr173'],
  en: {
    slug: 'california-boater-card',
    nav: 'California',
    card: 'Every age since 2025: the $10 lifetime card for any motorized boat, with exemptions for renters and short visits.',
    title: 'California Boater Card 2026: All Ages, $10 for Life',
    description: 'California Boater Card in 2026: every operator of a motorized boat needs it, at any age. See the $10 lifetime fee, the exemptions and the free course option.',
    h1: 'California Boater Card: required at every age since 2025',
    intro: 'The phase-in by age is over: since January 1, 2025 the card covers every operator of a motorized boat. Enter your details to see whether an exemption applies to you.',
    resume: (h) => {
      const { s } = F(h);
      return `Since January 1, 2025, every person who operates a motorized recreational boat in California, whatever their age, must carry the ${s.cardL}, issued by the Division of Boating and Waterways of California State Parks. The requirement was phased in by age from 2018 to 2024, which is why older guides still mention age limits; they no longer apply. The card costs ${s.feeL} and is valid ${s.validL}; a lost card is replaced for ${s.replL}. You get it after passing an approved boating safety course, and the free online course of the BoatUS Foundation is ${s.freeL} for California. Exemptions remain: operating a rental boat, operating under the direct supervision of an adult of 18 or more who holds a card, a visitor from another state boating fewer than 60 days who meets the home-state rule (90 days for a foreign visitor), and holders of a commercial fishing license or a Coast Guard marine operator license. A separate age rule applies: under 16, nobody may run a motor of more than 15 hp alone. Operating without the card is an infraction with fines that rise with each offense.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'I am 65. Do I really need a California Boater Card?', a: `Yes, since January 1, 2025. The last step of the phase-in removed the age limit, so a 65-year-old operating a motorized boat needs the card like everyone else, unless an exemption applies, such as renting the boat or boating under the direct supervision of an adult card holder. The card costs ${s.feeL} once and lasts for life.` },
        { q: 'Does a kayak with a trolling motor need the card in California?', a: 'The card covers motorized recreational vessels, and an electric trolling motor makes a kayak motorized. Paddled kayaks, canoes and sailboats without a motor are outside the rule. When in doubt for a specific craft, the Division of Boating and Waterways page linked below gives the official wording.' },
        { q: 'What is the fine for boating without the card in California?', a: 'Operating without a required card is an infraction. The state page gives a fine of up to $100 for a first offense, up to $250 for a second and up to $500 for a third or later offense. An officer may also ask the operator to complete a course.' },
        { q: 'My card from another state: is it valid in California?', a: 'A visitor from another state who boats in California for fewer than 60 days and meets the home state rule is exempt, and the limit is 90 days for a foreign visitor. Someone who moves to California or stays longer needs the California card, obtained after an approved course.' },
      ];
    },
    body: (h) => {
      const { s, or, nv, az } = F(h);
      return `
<h2>From a phase-in to everyone</h2>
<p>The California rule started on January 1, 2018 for operators aged 20 or younger, and the age limit rose each year: 25, 35, 40, 45, 50, then 60 in 2024. Since January 1, 2025 there is no age limit. The full check above still accepts a past outing date, which shows how the rule applied on that day, for example after a citation.</p>
<h2>The card, its fee and its life</h2>
<p>The ${s.cardL} costs ${s.feeL}, is valid ${s.validL}, and a replacement costs ${s.replL}. The fee goes to the state; the course is separate. The BoatUS Foundation course is ${s.freeL} in California (${h.ext(s.freeUrl, 'its California page')}), so the cheapest legal total is the card fee alone. The mini-tool shows the fee and the replacement price in any state.</p>
<!--tool:mini:cardfee|{"state":"CA"}-->
<h2>Who is exempt</h2>
<ul>${s.ex.map((x: string) => `<li>${x}</li>`).join('')}</ul>
<p>Being exempt from the card does not lower the age rule: under 16, operating a motor of more than 15 hp is not allowed, except sailboats up to 30 feet, and ages 12 to 15 may do it with an adult of 18 or more on board.</p>
<h2>California beside its neighbors</h2>
${h.table(['', 'California', 'Oregon', 'Nevada', 'Arizona'], [
  ['Who needs it', s.whoL, or.whoL, nv.whoL, az.whoL],
  ['State fee', s.feeL, or.feeL, nv.feeL, az.feeL],
  ['Free BoatUS course', s.freeL, or.freeL, nv.freeL, az.freeL],
], 'California and the states on its borders, from the official pages read.', ['l', 'l', 'l', 'l', 'l'])}
<p>Lake Tahoe and the Colorado River are shared with ${h.sl('NV')} and ${h.sl('AZ')}. Each state applies its own rule on its side of the line, so a Californian boating on Lake Havasu follows Arizona law there, and a visitor from Arizona on the California side uses the visitor exemption.</p>
<h2>On the water</h2>
<p>An officer can also check the boat: registration numbers on both sides of the bow under ${h.src('cfr173', '33 CFR part 173')}, a wearable life jacket for each person and the other equipment of ${h.src('cfr175', '33 CFR part 175')}. The ${h.a('test', 'practice test')} covers the rules on the exam. Facts on this page were read on ${h.os(C, 'the Division of Boating and Waterways pages')} on ${s.checkedL}; this site is not affiliated with the state.</p>`;
    },
  },
  es: {
    slug: 'california-boater-card',
    nav: 'California',
    card: 'Todas las edades desde 2025: la tarjeta de por vida de 10 dólares para cualquier embarcación con motor.',
    title: 'California Boater Card 2026: toda edad, 10 $ de por vida',
    description: 'California Boater Card en 2026: todo operador de una embarcación con motor la necesita, a cualquier edad. Vea la tarifa de 10 dólares, exenciones y el curso.',
    h1: 'California Boater Card: obligatoria a toda edad desde 2025',
    intro: 'La introducción por edades terminó: desde el 1 de enero de 2025 la tarjeta cubre a todo operador de una embarcación con motor. Indique sus datos para ver si le corresponde una exención.',
    resume: (h) => {
      const { s } = F(h);
      return `Desde el 1 de enero de 2025, toda persona que maneje una embarcación recreativa con motor en California, sea cual sea su edad, debe llevar la ${s.cardL}, emitida por la División de Navegación y Vías Acuáticas de California State Parks. El requisito se introdujo por edades de 2018 a 2024, por eso guías antiguas aún mencionan límites de edad que ya no se aplican. La tarjeta cuesta ${s.feeL} y vale ${s.validL}; un duplicado cuesta ${s.replL}. Se obtiene tras aprobar un curso de seguridad náutica aprobado, y el curso gratuito en línea de la BoatUS Foundation está ${s.freeL} en California. Quedan exenciones: manejar una embarcación alquilada, manejar bajo la supervisión directa de un adulto de 18 años o más con tarjeta, un visitante de otro estado que navega menos de 60 días y cumple la regla de su estado (90 días para un visitante extranjero), y los titulares de una licencia de pesca comercial o de una licencia de operador marítimo de la Guardia Costera. Hay además una regla de edad: antes de los 16 años nadie puede manejar solo un motor de más de 15 hp. Navegar sin la tarjeta es una infracción con multas que suben a cada reincidencia.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Tengo 65 años. ¿De verdad necesito la California Boater Card?', a: `Sí, desde el 1 de enero de 2025. La última etapa quitó el límite de edad, así que una persona de 65 años que maneja una embarcación con motor necesita la tarjeta como todos, salvo exención, como alquilar la embarcación o navegar bajo la supervisión directa de un adulto con tarjeta. Cuesta ${s.feeL} una vez y vale de por vida.` },
        { q: '¿Un kayak con motor eléctrico necesita la tarjeta en California?', a: 'La tarjeta cubre las embarcaciones recreativas con motor, y un motor eléctrico de pesca convierte al kayak en embarcación con motor. Los kayaks a remo, las canoas y los veleros sin motor quedan fuera. Ante la duda sobre una embarcación concreta, la página de la División enlazada abajo da la redacción oficial.' },
        { q: '¿Cuál es la multa por navegar sin la tarjeta en California?', a: 'Manejar sin la tarjeta exigida es una infracción. La página del estado indica una multa de hasta 100 dólares la primera vez, hasta 250 la segunda y hasta 500 a partir de la tercera. El agente también puede pedir al operador que haga un curso.' },
        { q: 'Mi tarjeta de otro estado: ¿vale en California?', a: 'Un visitante de otro estado que navega en California menos de 60 días y cumple la regla de su estado está exento, y el límite es de 90 días para un visitante extranjero. Quien se muda a California o se queda más tiempo necesita la tarjeta de California, tras un curso aprobado.' },
      ];
    },
    body: (h) => {
      const { s, or, nv, az } = F(h);
      return `
<h2>De una introducción por edades a todo el mundo</h2>
<p>La regla de California empezó el 1 de enero de 2018 para los operadores de 20 años o menos, y el límite subió cada año: 25, 35, 40, 45, 50 y luego 60 en 2024. Desde el 1 de enero de 2025 no hay límite de edad. La comprobación completa de arriba acepta una fecha de salida pasada, lo que muestra cómo se aplicaba la regla ese día, por ejemplo tras una multa.</p>
<h2>La tarjeta, su tarifa y su duración</h2>
<p>La ${s.cardL} cuesta ${s.feeL}, vale ${s.validL}, y un duplicado cuesta ${s.replL}. La tarifa va al estado; el curso es aparte. El curso de la BoatUS Foundation está ${s.freeL} en California (${h.ext(s.freeUrl, 'su página de California')}), así que el total legal más barato es solo la tarifa de la tarjeta. La miniherramienta muestra la tarifa y el precio del duplicado en cualquier estado.</p>
<!--tool:mini:cardfee|{"state":"CA"}-->
<h2>Quién está exento</h2>
<ul>${s.ex.map((x: string) => `<li>${x}</li>`).join('')}</ul>
<p>Estar exento de la tarjeta no rebaja la regla de edad: antes de los 16 años no se permite manejar un motor de más de 15 hp, salvo los veleros de hasta 30 pies, y de 12 a 15 años se puede con un adulto de 18 años o más a bordo.</p>
<h2>California frente a sus vecinos</h2>
${h.table(['', 'California', 'Oregón', 'Nevada', 'Arizona'], [
  ['Quién la necesita', s.whoL, or.whoL, nv.whoL, az.whoL],
  ['Tarifa del estado', s.feeL, or.feeL, nv.feeL, az.feeL],
  ['Curso gratis BoatUS', s.freeL, or.freeL, nv.freeL, az.freeL],
], 'California y los estados de su frontera, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l', 'l'])}
<p>El lago Tahoe y el río Colorado se comparten con ${h.sl('NV')} y ${h.sl('AZ')}. Cada estado aplica su propia regla de su lado de la línea, así que un californiano que navega en el lago Havasu sigue allí la ley de Arizona, y un visitante de Arizona del lado de California usa la exención de visitante.</p>
<h2>En el agua</h2>
<p>Un agente también puede revisar la embarcación: los números de registro a ambos lados de la proa según el ${h.src('cfr173', '33 CFR parte 173')}, un chaleco salvavidas ponible por persona y el resto del equipo del ${h.src('cfr175', '33 CFR parte 175')}. El ${h.a('test', 'examen de práctica')} repasa las reglas del examen. Los datos de esta página se leyeron en ${h.os(C, 'las páginas de la División de Navegación')} el ${s.checkedL}; este sitio no está afiliado al estado.</p>`;
    },
  },
});
