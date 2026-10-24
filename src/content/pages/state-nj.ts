import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'NJ';
const F = (h: Helpers) => ({ s: h.S(C), ny: h.S('NY'), pa: h.S('PA'), de: h.S('DE') });

export default definePage({
  id: 'state-nj',
  group: 'states',
  order: 108,
  state: C,
  tool: { kind: 'check' },
  mini: { kind: 'mini:online' },
  related: ['home', 'online', 'safety-course', 'state-ny', 'pwc', 'test'],
  sources: ['boatus', 'cfr175'],
  en: {
    slug: 'new-jersey-boating-license',
    nav: 'New Jersey',
    card: 'Every power boat and PWC operator: a certificate with an in-person proctored exam, and an MVC license on non-tidal lakes.',
    title: 'New Jersey Boating License 2026: Proctored Exam Required',
    description: 'New Jersey boating license rules: every power boat or PWC operator needs a certificate with an in-person exam, plus an MVC boat license on non-tidal lakes.',
    h1: 'New Jersey boating license: certificate, proctored exam and MVC license',
    intro: 'New Jersey is one of the strictest states: the certificate covers every age, the exam is taken in person, and non-tidal lakes need a second license. Check your case below.',
    resume: (h) => {
      const { s } = F(h);
      return `In New Jersey, everyone who operates a power vessel or a personal watercraft needs the ${s.cardL}, whatever their age; electric motors count as power. The course can be followed online, but the State Police Marine Services Bureau requires an in-person, proctored exam after the internet portion, so a fully online route does not exist here. On non-tidal waters, such as inland lakes and rivers without tide, a second credential is also needed: a boat license from the Motor Vehicle Commission (MVC), issued from age 16 for an $18 fee, with parental consent under 17. Ages limit what young people may operate: from 13 to 15, a certificate holder may run only a boat with an electric motor or a boat of 12 feet or more with less than 10 hp, and nobody under 16 may operate a PWC, visitors included. Visitors can use a home-state certificate, a Coast Guard captain's license or proof of a NASBLA-approved course for up to 90 days; after that, and for new residents, a New Jersey certificate is required. Replacements are requested from the Marine Services Bureau by email or mail. The free BoatUS Foundation course is ${s.freeL} for New Jersey.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Why can I not get the New Jersey certificate fully online?', a: 'Because the State Police require an in-person, proctored exam after the internet portion of an approved course. You can study online, but the final test is taken at a set location under supervision. Find an exam location on the State Police page before planning a trip.' },
        { q: 'Do I need the MVC boat license on the Jersey Shore?', a: 'Not on tidal waters such as the ocean, bays and tidal rivers: there the safety certificate is enough. The MVC boat license is added on non-tidal waters, such as inland lakes, for power boats and PWC. It requires age 16 and an $18 fee, and parental consent under 17.' },
        { q: 'Can my 14-year-old drive a boat in New Jersey?', a: `With a certificate, a 14-year-old may operate only a boat powered solely by an electric motor or a boat of 12 feet or more with less than 10 hp. A PWC is not allowed before ${s.pwcAgeL}. Larger power boats wait until 16, the age at which the certificate covers them.` },
      ];
    },
    body: (h) => {
      const { s, ny, pa, de } = F(h);
      return `
<h2>Two credentials, depending on the water</h2>
${h.table(['Water', 'Safety certificate', 'MVC boat license'], [
  ['Tidal (ocean, bays, tidal rivers)', 'Required for power boats and PWC', 'Not required'],
  ['Non-tidal (inland lakes and rivers)', 'Required for power boats and PWC', 'Required, from 16, $18'],
], 'From the State Police and MVC pages read, in our words.', ['l', 'l', 'l'])}
<p>The safety certificate is about the operator's education. The MVC license is an extra credential for inland waters. Neither replaces the registration of the boat.</p>
<h2>The course and the proctored exam</h2>
<p>Approved courses can be taken in a classroom or online, but every route ends with an in-person exam under supervision. The mini-tool shows where a state lets you finish fully online.</p>
<!--tool:mini:online|{"state":"NJ"}-->
<p>The BoatUS Foundation course is ${s.freeL} for New Jersey (${h.ext(s.freeUrl, 'its New Jersey page')}). The pages read do not give a state certificate fee, shown as ${s.feeL}.</p>
<h2>Young operators</h2>
<ul>
<li><strong>13 to 15, with a certificate:</strong> only a boat powered solely by an electric motor, or a boat 12 feet or longer with less than 10 hp.</li>
<li><strong>Under 16:</strong> no PWC operation, visitors included.</li>
<li><strong>16 and over:</strong> power boats and PWC with the certificate, plus the MVC license on non-tidal waters.</li>
</ul>
<h2>New Jersey beside its neighbors</h2>
${h.table(['', 'New Jersey', 'New York', 'Pennsylvania', 'Delaware'], [
  ['Who needs it', s.whoL, ny.whoL, pa.whoL, de.whoL],
  ['Exam supervised', s.proctorL, ny.proctorL, pa.proctorL, de.proctorL],
  ['Free BoatUS course', s.freeL, ny.freeL, pa.freeL, de.freeL],
], 'New Jersey and its neighbors, from the official pages read.', ['l', 'l', 'l', 'l', 'l'])}
<p>The Hudson and New York Harbor are shared with ${h.sl('NY')}, the Delaware River and Bay with ${h.sl('PA')} and ${h.sl('DE')}. A New Jersey certificate comes from a NASBLA-approved course, which those states generally accept from visitors.</p>
<h2>On the water</h2>
<p>Federal equipment rules of ${h.src('cfr175', '33 CFR part 175')} apply along the coast and inland: wearable life jackets, throwable device, extinguishers and visual distress signals on coastal waters. The ${h.a('test', 'practice test')} covers them. Facts on this page were read on ${h.os(C, 'the New Jersey State Police pages')} on ${s.checkedL}; this site is not affiliated with the state.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-nueva-jersey',
    nav: 'Nueva Jersey',
    card: 'Todo operador de lancha y moto acuática: certificado con examen presencial supervisado, y licencia MVC en lagos sin marea.',
    title: 'Licencia de navegación en Nueva Jersey: examen presencial',
    description: 'Licencia de navegación en Nueva Jersey: todo operador de lancha o moto acuática necesita un certificado con examen presencial, y la licencia MVC sin marea.',
    h1: 'Licencia de navegación en Nueva Jersey: certificado, examen y licencia MVC',
    intro: 'Nueva Jersey es de los estados más estrictos: el certificado cubre todas las edades, el examen es presencial y las aguas sin marea piden una segunda licencia. Compruebe su caso abajo.',
    resume: (h) => {
      const { s } = F(h);
      return `En Nueva Jersey, toda persona que maneje una embarcación a motor o una moto acuática necesita el ${s.cardL}, sea cual sea su edad; los motores eléctricos cuentan como motor. El curso puede seguirse en línea, pero la Oficina de Servicios Marinos de la Policía Estatal exige un examen presencial supervisado tras la parte por internet, así que aquí no existe una vía totalmente en línea. En aguas sin marea, como lagos y ríos interiores, hace falta además una licencia de bote de la Comisión de Vehículos Motorizados (MVC), que se expide desde los 16 años por 18 dólares, con permiso de los padres antes de los 17. La edad limita lo que pueden manejar los jóvenes: de 13 a 15 años, con certificado, solo una embarcación con motor eléctrico o una de 12 pies o más con menos de 10 hp, y nadie menor de 16 puede manejar una moto acuática, visitantes incluidos. Los visitantes pueden usar el certificado de su estado, una licencia de capitán de la Guardia Costera o la prueba de un curso aprobado por NASBLA hasta 90 días; después, y para los nuevos residentes, se exige el certificado de Nueva Jersey. Los duplicados se piden a la Oficina de Servicios Marinos por correo electrónico o postal. El curso gratis de la BoatUS Foundation está ${s.freeL} para Nueva Jersey.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Por qué no puedo obtener el certificado de Nueva Jersey todo en línea?', a: 'Porque la Policía Estatal exige un examen presencial supervisado tras la parte por internet de un curso aprobado. Puede estudiar en línea, pero la prueba final se hace en un lugar fijo y con supervisión. Busque un lugar de examen en la página de la Policía Estatal antes de planear un viaje.' },
        { q: '¿Necesito la licencia de la MVC en la costa de Jersey?', a: 'No en aguas con marea como el océano, las bahías y los ríos con marea: allí basta el certificado de seguridad. La licencia de bote de la MVC se añade en aguas sin marea, como los lagos interiores, para lanchas y motos acuáticas. Exige 16 años y 18 dólares, y permiso de los padres antes de los 17.' },
        { q: '¿Puede mi hijo de 14 años manejar una lancha en Nueva Jersey?', a: `Con certificado, un joven de 14 años solo puede manejar una embarcación movida solo por motor eléctrico o una de 12 pies o más con menos de 10 hp. Una moto acuática no se permite antes de los ${s.pwcAgeL}. Las lanchas más grandes esperan a los 16, la edad en que el certificado las cubre.` },
      ];
    },
    body: (h) => {
      const { s, ny, pa, de } = F(h);
      return `
<h2>Dos documentos, según el agua</h2>
${h.table(['Agua', 'Certificado de seguridad', 'Licencia de bote MVC'], [
  ['Con marea (océano, bahías, ríos con marea)', 'Exigido para lanchas y motos acuáticas', 'No exigida'],
  ['Sin marea (lagos y ríos interiores)', 'Exigido para lanchas y motos acuáticas', 'Exigida, desde 16 años, 18 $'],
], 'Según las páginas de la Policía Estatal y de la MVC consultadas, con nuestras palabras.', ['l', 'l', 'l'])}
<p>El certificado de seguridad se refiere a la formación del operador. La licencia de la MVC es un documento más para las aguas interiores. Ninguno sustituye al registro de la embarcación.</p>
<h2>El curso y el examen supervisado</h2>
<p>Los cursos aprobados pueden hacerse en aula o en línea, pero todas las vías terminan con un examen presencial supervisado. La miniherramienta muestra dónde un estado deja terminar todo en línea.</p>
<!--tool:mini:online|{"state":"NJ"}-->
<p>El curso de la BoatUS Foundation está ${s.freeL} para Nueva Jersey (${h.ext(s.freeUrl, 'su página de Nueva Jersey')}). Las páginas consultadas no dan una tarifa estatal por el certificado, mostrada como ${s.feeL}.</p>
<h2>Operadores jóvenes</h2>
<ul>
<li><strong>13 a 15 años, con certificado:</strong> solo una embarcación movida solo por motor eléctrico, o una de 12 pies o más con menos de 10 hp.</li>
<li><strong>Menos de 16:</strong> ninguna moto acuática, visitantes incluidos.</li>
<li><strong>16 o más:</strong> lanchas y motos acuáticas con el certificado, más la licencia de la MVC en aguas sin marea.</li>
</ul>
<h2>Nueva Jersey frente a sus vecinos</h2>
${h.table(['', 'Nueva Jersey', 'Nueva York', 'Pensilvania', 'Delaware'], [
  ['Quién la necesita', s.whoL, ny.whoL, pa.whoL, de.whoL],
  ['Examen supervisado', s.proctorL, ny.proctorL, pa.proctorL, de.proctorL],
  ['Curso gratis BoatUS', s.freeL, ny.freeL, pa.freeL, de.freeL],
], 'Nueva Jersey y sus vecinos, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l', 'l'])}
<p>El Hudson y el puerto de Nueva York se comparten con ${h.sl('NY')}, y el río y la bahía de Delaware con ${h.sl('PA')} y ${h.sl('DE')}. Un certificado de Nueva Jersey sale de un curso aprobado por NASBLA, que esos estados suelen aceptar de los visitantes.</p>
<h2>En el agua</h2>
<p>Las reglas federales de equipo del ${h.src('cfr175', '33 CFR parte 175')} se aplican en la costa y en el interior: chalecos ponibles, dispositivo arrojadizo, extintores y señales visuales de socorro en aguas costeras. El ${h.a('test', 'examen de práctica')} los repasa. Los datos de esta página se leyeron en ${h.os(C, 'las páginas de la Policía Estatal de Nueva Jersey')} el ${s.checkedL}; este sitio no está afiliado al estado.</p>`;
    },
  },
});
