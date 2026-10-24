import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'NY';
const F = (h: Helpers) => ({ s: h.S(C), nj: h.S('NJ'), pa: h.S('PA'), vt: h.S('VT'), ct: h.S('CT') });

export default definePage({
  id: 'state-ny',
  group: 'states',
  order: 104,
  state: C,
  tool: { kind: 'check' },
  mini: { kind: 'mini:compare' },
  related: ['home', 'online', 'boater-card', 'state-nj', 'pwc', 'test'],
  sources: ['boatus', 'cfr175'],
  en: {
    slug: 'new-york-boating-license',
    nav: 'New York',
    card: 'All motorboat and PWC operators since 2025 under Brianna\'s Law, with a livery exemption for adult renters.',
    title: 'New York Boating License 2026: Brianna\'s Law for All Ages',
    description: 'New York boating license rules: since 2025 every operator of a motorized boat or PWC needs a safety certificate. See the rental exemption, PWC age and fees.',
    h1: 'New York boating license: a certificate for every operator',
    intro: 'Brianna\'s Law finished its phase-in in 2025: the age of the operator no longer matters. Enter your details to see whether you need the certificate and how to get it.',
    resume: (h) => {
      const { s } = F(h);
      return `Since 2025, every person who operates a motorized boat in New York, personal watercraft included, needs a boating safety certificate, whatever their age. The rule comes from Brianna's Law, which was phased in by year of birth before covering everyone; New York State Parks runs the boating education program. The credential is the ${s.cardL}, valid ${s.validL}; a lost one is replaced online for ${s.replL}. Approved courses can be taken in a classroom or entirely online, with exams to pass along the way, and online providers include the permanent certificate in their price while a temporary certificate covers the first 90 days. The free online course of the BoatUS Foundation is ${s.freeL} in New York. Three exemptions stand out: non-motorized boats such as kayaks and canoes; adults of 18 or more who rent a motorboat or PWC from a livery after a safety briefing by its staff; and holders of a Coast Guard license, who carry a copy. Out-of-state certificates count only when issued by the boater's current state of residence. PWC operators must be at least ${s.pwcAgeL} old.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'I moved to New York with a certificate from Florida. Is it valid?', a: 'Not once you live in New York. A certificate from another state is recognized in New York only when it was issued by your current state of residence, so a new resident needs a course approved in New York. A visitor who still lives in Florida can use the Florida card.' },
        { q: 'Can my teenager rent a jet ski at a New York livery?', a: `Only with a safety certificate. The livery exemption with a briefing by the staff is for adults of 18 or more; people under 18 can rent only if they hold a certificate, and a PWC operator must be at least ${s.pwcAgeL} old. Bring the certificate and an ID to the rental desk.` },
        { q: 'Does New York charge a fee for the boating certificate?', a: `The pages read give no separate state fee. Online providers include the permanent certificate in their course price, and classroom students aged 18 or more order their certificate online. A replacement costs ${s.replL}. The free BoatUS course is ${s.freeL} in New York.` },
      ];
    },
    body: (h) => {
      const { s, nj, pa, vt, ct } = F(h);
      return `
<h2>What Brianna's Law changed</h2>
<p>New York used to require boating education only from young operators. Brianna's Law extended it in steps by year of birth until it covered every operator of a motorized boat in 2025. A person who boated for decades without a course now needs one before taking the helm of a motorboat or a PWC. The full check above shows the rule on any date, including the steps of the phase-in.</p>
<h2>Getting the certificate</h2>
<p>Classroom courses are given by State Parks and volunteer organizations; approved online courses are completed remotely with exams to advance. The BoatUS Foundation course is ${s.freeL} in New York (${h.ext(s.freeUrl, 'its New York page')}). After an online course, a temporary certificate is valid 90 days until the permanent one arrives, and a digital copy on a phone is accepted as proof, but only in New York State.</p>
<h2>The rental exemption</h2>
<p>An adult of 18 or more can rent and operate a motorboat or a PWC from a livery without a certificate, after the safety briefing given by the livery staff. A person under 18 can rent only with a certificate. This is narrower than in some states: it covers renting from a livery, not borrowing a friend's boat.</p>
<h2>New York beside its neighbors</h2>
${h.table(['', 'New York', 'New Jersey', 'Pennsylvania', 'Vermont', 'Connecticut'], [
  ['Who needs it', s.whoL, nj.whoL, pa.whoL, vt.whoL, ct.whoL],
  ['Exam supervised', s.proctorL, nj.proctorL, pa.proctorL, vt.proctorL, ct.proctorL],
  ['Free BoatUS course', s.freeL, nj.freeL, pa.freeL, vt.freeL, ct.freeL],
], 'New York and four neighboring states, from the official pages read.', ['l', 'l', 'l', 'l', 'l', 'l'])}
<p>The Hudson, Lake Champlain and Long Island Sound are shared waters. ${h.sl('NJ')} requires a proctored exam and ${h.sl('CT')} has its own certificate, so a boater crossing lines should check both states. The mini-tool compares any two states.</p>
<!--tool:mini:compare|{"state":"NY","b":"NJ"}-->
<h2>On the water</h2>
<p>The certificate sits beside the federal equipment rules of ${h.src('cfr175', '33 CFR part 175')}: a wearable life jacket per person, throwable device, fire extinguishers and distress signals as required. The state adds its own navigation rules, listed on the State Parks pages. Facts on this page were read on ${h.os(C, 'the New York State Parks pages')} on ${s.checkedL}; this site is not affiliated with the state.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-nueva-york',
    nav: 'Nueva York',
    card: 'Todos los operadores de lancha y moto acuática desde 2025 por la ley de Brianna, con exención de alquiler para adultos.',
    title: 'Licencia de navegación en Nueva York 2026: ley de Brianna',
    description: 'Licencia de navegación en Nueva York: desde 2025 todo operador de lancha o moto acuática necesita el certificado. Vea el alquiler, la edad y el duplicado.',
    h1: 'Licencia de navegación en Nueva York: un certificado para todos',
    intro: 'La ley de Brianna terminó su introducción en 2025: la edad del operador ya no cuenta. Indique sus datos para ver si necesita el certificado y cómo obtenerlo.',
    resume: (h) => {
      const { s } = F(h);
      return `Desde 2025, toda persona que maneje una embarcación con motor en Nueva York, motos acuáticas incluidas, necesita un certificado de seguridad náutica, sea cual sea su edad. La regla viene de la ley de Brianna, que se introdujo por año de nacimiento antes de cubrir a todos; los Parques del Estado de Nueva York llevan el programa de educación náutica. El documento es el ${s.cardL}, que vale ${s.validL}; uno perdido se repone en línea por ${s.replL}. Los cursos aprobados pueden hacerse en aula o totalmente en línea, con exámenes para avanzar, y los proveedores en línea incluyen el certificado permanente en su precio, mientras un certificado temporal cubre los primeros 90 días. El curso gratuito en línea de la BoatUS Foundation está ${s.freeL} en Nueva York. Destacan tres exenciones: las embarcaciones sin motor como kayaks y canoas; los adultos de 18 años o más que alquilan una lancha o moto acuática en una empresa de alquiler tras una explicación de seguridad de su personal; y los titulares de una licencia de la Guardia Costera, que llevan una copia. Los certificados de otro estado solo cuentan si los emitió el estado de residencia actual. Para manejar una moto acuática hay que tener al menos ${s.pwcAgeL}.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Me mudé a Nueva York con un certificado de Florida. ¿Vale?', a: 'No una vez que vive en Nueva York. Un certificado de otro estado solo se reconoce en Nueva York si lo emitió su estado de residencia actual, así que un nuevo residente necesita un curso aprobado en Nueva York. Un visitante que sigue viviendo en Florida puede usar la tarjeta de Florida.' },
        { q: '¿Puede mi hijo adolescente alquilar una moto acuática en Nueva York?', a: `Solo con un certificado de seguridad. La exención de alquiler con explicación del personal es para adultos de 18 años o más; los menores de 18 solo pueden alquilar si tienen certificado, y quien maneja una moto acuática debe tener al menos ${s.pwcAgeL}. Lleve el certificado y una identificación al mostrador.` },
        { q: '¿Nueva York cobra una tarifa por el certificado náutico?', a: `Las páginas consultadas no indican una tarifa estatal aparte. Los proveedores en línea incluyen el certificado permanente en el precio del curso, y los alumnos de aula de 18 años o más piden su certificado en línea. Un duplicado cuesta ${s.replL}. El curso gratis de BoatUS está ${s.freeL} en Nueva York.` },
      ];
    },
    body: (h) => {
      const { s, nj, pa, vt, ct } = F(h);
      return `
<h2>Lo que cambió la ley de Brianna</h2>
<p>Nueva York solo exigía antes la educación náutica a los operadores jóvenes. La ley de Brianna la amplió por etapas según el año de nacimiento hasta cubrir a todo operador de una embarcación con motor en 2025. Una persona que navegó décadas sin curso necesita ahora uno antes de tomar el timón de una lancha o una moto acuática. La comprobación completa de arriba muestra la regla en cualquier fecha, incluidas las etapas.</p>
<h2>Cómo obtener el certificado</h2>
<p>Los cursos presenciales los dan los Parques del Estado y organizaciones voluntarias; los cursos en línea aprobados se hacen a distancia con exámenes para avanzar. El curso de la BoatUS Foundation está ${s.freeL} en Nueva York (${h.ext(s.freeUrl, 'su página de Nueva York')}). Tras un curso en línea, un certificado temporal vale 90 días hasta que llega el permanente, y una copia digital en el teléfono se acepta como prueba, pero solo en el estado de Nueva York.</p>
<h2>La exención de alquiler</h2>
<p>Un adulto de 18 años o más puede alquilar y manejar una lancha o una moto acuática de una empresa de alquiler sin certificado, tras la explicación de seguridad de su personal. Un menor de 18 solo puede alquilar con certificado. Es más estrecha que en otros estados: cubre el alquiler a una empresa, no el préstamo de la embarcación de un amigo.</p>
<h2>Nueva York frente a sus vecinos</h2>
${h.table(['', 'Nueva York', 'Nueva Jersey', 'Pensilvania', 'Vermont', 'Connecticut'], [
  ['Quién la necesita', s.whoL, nj.whoL, pa.whoL, vt.whoL, ct.whoL],
  ['Examen supervisado', s.proctorL, nj.proctorL, pa.proctorL, vt.proctorL, ct.proctorL],
  ['Curso gratis BoatUS', s.freeL, nj.freeL, pa.freeL, vt.freeL, ct.freeL],
], 'Nueva York y cuatro estados vecinos, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l', 'l', 'l'])}
<p>El Hudson, el lago Champlain y el estrecho de Long Island son aguas compartidas. ${h.sl('NJ')} exige un examen supervisado y ${h.sl('CT')} tiene su propio certificado, así que quien cruza de un estado a otro debe revisar los dos. La miniherramienta compara dos estados cualesquiera.</p>
<!--tool:mini:compare|{"state":"NY","b":"NJ"}-->
<h2>En el agua</h2>
<p>El certificado se suma a las reglas federales de equipo del ${h.src('cfr175', '33 CFR parte 175')}: un chaleco salvavidas ponible por persona, dispositivo arrojadizo, extintores y señales de socorro según corresponda. El estado añade sus propias reglas de navegación, publicadas en las páginas de los Parques del Estado. Los datos de esta página se leyeron en ${h.os(C, 'las páginas de los Parques del Estado de Nueva York')} el ${s.checkedL}; este sitio no está afiliado al estado.</p>`;
    },
  },
});
