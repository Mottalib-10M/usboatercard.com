import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'OH';
const F = (h: Helpers) => ({ s: h.S(C), mi: h.S('MI'), pa: h.S('PA'), ky: h.S('KY'), wv: h.S('WV') });

export default definePage({
  id: 'state-oh',
  group: 'states',
  order: 106,
  state: C,
  tool: { kind: 'check' },
  mini: { kind: 'mini:free' },
  related: ['home', 'how-to-get', 'state-mi', 'free-license', 'pwc', 'test'],
  sources: ['boatus', 'cfr175'],
  en: {
    slug: 'ohio-boating-license',
    nav: 'Ohio',
    card: 'Born in 1982 or later and over 10 hp: an approved course or the free ODNR proficiency exam.',
    title: 'Ohio Boating License 2026: Course or Free ODNR Exam',
    description: 'Ohio boating license rules: born on or after Jan. 1, 1982 and over 10 hp means a course or the free state exam. Check your case, PWC ages and rental test.',
    h1: 'Ohio boating license: an approved course or the free state exam',
    intro: 'Ohio offers two ways to meet the rule: an approved course, or a proficiency exam at an ODNR office that costs nothing. Enter your birth date and boat to see if you need either.',
    resume: (h) => {
      const { s } = F(h);
      return `In Ohio, anyone born on or after ${s.cutoffL ?? h.nc} must have passed either an approved boating course or a state proficiency exam to operate a boat powered by ${s.hpL ?? h.nc}, personal watercraft included. People born earlier, and boats of 10 hp or less, are outside the rule. Ohio is unusual in two ways. First, the proficiency exam taken at an Ohio Department of Natural Resources (ODNR) watercraft office is free, so the education rule can be met without paying for any course; the free BoatUS Foundation course is also ${s.freeL} in Ohio. Second, an operator stopped without proof has 72 hours to produce the certificate. Ages matter too: a child of 12 or more with a certificate may run a boat over 10 hp alone; on a PWC, nobody under 12, ages 12 to 15 only with an adult of 18 or more on board, and alone from ${s.pwcAgeL} with a certificate. Ohio accepts NASBLA-approved certificates from any other state or territory. A renter without a certificate can pass a short exam given by the rental business, valid only for that rental. Operating without the required education is a misdemeanor with a fine of up to $250.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'What is the Ohio proficiency exam?', a: 'It is a test offered by ODNR that lets you meet the boater education rule without taking a full course. There is no fee for it. You pass it at an ODNR watercraft office, and passing gives you the same result as the course for the education requirement. Reviewing the course topics first, for example with the practice test on this site, is a good way to prepare.' },
        { q: 'Can I rent a boat in Ohio without a certificate?', a: 'Yes, if you sign that you hold one or pass the short exam given by the rental business with a score of 90 percent or more. That exam counts only for the period of the rental agreement. It applies to renters born on or after January 1, 1982 of boats over 10 hp.' },
        { q: 'My 13-year-old has a certificate. Can they ride a jet ski alone in Ohio?', a: `Not yet. In Ohio, ages 12 to 15 may operate a PWC only with an adult of 18 or more on board, who must also be certified if born in 1982 or later. Riding alone starts at ${s.pwcAgeL} with a certificate. A 13-year-old certificate holder may however operate other powerboats over 10 hp alone.` },
      ];
    },
    body: (h) => {
      const { s, mi, pa, ky, wv } = F(h);
      return `
<h2>Who the Ohio rule covers</h2>
<p>Two conditions: born on or after ${s.cutoffL ?? h.nc}, and operating a boat powered by ${s.hpL ?? h.nc}. A person born in 1981 can run any boat without the certificate; a person born in 1990 can run a 9.9 hp fishing boat without it. Holders of a valid Coast Guard merchant mariner credential with a master or operator endorsement are exempt and carry it on board.</p>
<h2>Three ways to meet it</h2>
<ul>
<li><strong>The free ODNR proficiency exam</strong>, taken at a watercraft office.</li>
<li><strong>A free online course</strong>: the BoatUS Foundation course is ${s.freeL} in Ohio (${h.ext(s.freeUrl, 'its Ohio page')}).</li>
<li><strong>A paid online or classroom course</strong> from an approved provider; a temporary or permanent certificate can be printed as soon as an online course is completed.</li>
</ul>
<p>The mini-tool shows the cheapest legal route in a state.</p>
<!--tool:mini:free|{"state":"OH"}-->
<h2>Children and PWC</h2>
<p>Boats over 10 hp: under 12 only with an adult of 18 or more on board, both certified if born in 1982 or later; alone from 12 with a certificate. Personal watercraft: never under 12, not even with a certificate; 12 to 15 with an adult on board; alone from ${s.pwcAgeL}.</p>
<h2>Ohio beside its neighbors</h2>
${h.table(['', 'Ohio', 'Michigan', 'Pennsylvania', 'Kentucky', 'West Virginia'], [
  ['Who needs it', s.whoL, mi.whoL, pa.whoL, ky.whoL, wv.whoL],
  ['Free BoatUS course', s.freeL, mi.freeL, pa.freeL, ky.freeL, wv.freeL],
  ['State fee', s.feeL, mi.feeL, pa.feeL, ky.feeL, wv.feeL],
], 'Ohio and the states on its borders, from the official pages read.', ['l', 'l', 'l', 'l', 'l', 'l'])}
<p>The Ohio River is shared with ${h.sl('KY')} and ${h.sl('WV')}, and Lake Erie with ${h.sl('MI')} and ${h.sl('PA')}. Kentucky applies its rule to young operators only, so the answer can change in the middle of the river.</p>
<h2>Fines and proof</h2>
<p>Operating without the required education is a fourth-degree misdemeanor: up to $250, 30 days in jail, or both, and up to $500 and 60 days when linked to a collision, injury or damage. A boater stopped without proof can still produce the certificate within 72 hours. Federal equipment rules of ${h.src('cfr175', '33 CFR part 175')} apply as everywhere, including distress signals on Lake Erie. Facts on this page were read on ${h.os(C, 'the ODNR pages')} on ${s.checkedL}; this site is not affiliated with ODNR.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-ohio',
    nav: 'Ohio',
    card: 'Nacidos desde 1982 y más de 10 hp: un curso aprobado o el examen de competencia gratis del ODNR.',
    title: 'Licencia de navegación en Ohio 2026: curso o examen gratis',
    description: 'Licencia de navegación en Ohio: nacidos desde el 1 de enero de 1982 con más de 10 hp necesitan un curso o el examen gratis del estado. Vea su caso y edades.',
    h1: 'Licencia de navegación en Ohio: un curso o el examen gratis del estado',
    intro: 'Ohio ofrece dos formas de cumplir la regla: un curso aprobado o un examen de competencia en una oficina del ODNR que no cuesta nada. Indique su fecha de nacimiento y su embarcación.',
    resume: (h) => {
      const { s } = F(h);
      return `En Ohio, quien nació a partir del ${s.cutoffL ?? h.nc} debe haber aprobado un curso náutico aprobado o un examen de competencia del estado para manejar una embarcación con ${s.hpL ?? h.nc}, motos acuáticas incluidas. Quienes nacieron antes, y las embarcaciones de 10 hp o menos, quedan fuera. Ohio se distingue en dos puntos. Primero, el examen de competencia en una oficina de embarcaciones del Departamento de Recursos Naturales de Ohio (ODNR) es gratis, así que la regla puede cumplirse sin pagar ningún curso; el curso gratuito de la BoatUS Foundation también está ${s.freeL} en Ohio. Segundo, un operador detenido sin prueba tiene 72 horas para presentar el certificado. La edad también cuenta: un niño de 12 años o más con certificado puede manejar solo una embarcación de más de 10 hp; en moto acuática, nadie menor de 12, de 12 a 15 solo con un adulto de 18 años o más a bordo, y sin compañía desde los ${s.pwcAgeL} con certificado. Ohio acepta los certificados aprobados por NASBLA de cualquier otro estado o territorio. Quien alquila sin certificado puede aprobar un examen corto de la empresa de alquiler, válido solo para ese alquiler. Manejar sin la educación exigida es un delito menor con multa de hasta 250 dólares.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Qué es el examen de competencia de Ohio?', a: 'Es una prueba del ODNR que permite cumplir la regla de educación náutica sin hacer un curso completo. No tiene costo. Se hace en una oficina de embarcaciones del ODNR, y aprobarla da el mismo resultado que el curso para el requisito. Repasar antes los temas del curso, por ejemplo con el examen de práctica de este sitio, es una buena forma de prepararse.' },
        { q: '¿Puedo alquilar una lancha en Ohio sin certificado?', a: 'Sí, si firma que tiene uno o aprueba el examen corto de la empresa de alquiler con un 90 por ciento o más. Ese examen solo vale durante el contrato de alquiler. Se aplica a quienes nacieron a partir del 1 de enero de 1982 y alquilan embarcaciones de más de 10 hp.' },
        { q: 'Mi hijo de 13 años tiene certificado. ¿Puede ir solo en moto acuática en Ohio?', a: `Todavía no. En Ohio, de 12 a 15 años solo se puede manejar una moto acuática con un adulto de 18 años o más a bordo, que también debe tener certificado si nació en 1982 o después. Ir solo empieza a los ${s.pwcAgeL} con certificado. Un joven de 13 con certificado sí puede manejar solo otras lanchas de más de 10 hp.` },
      ];
    },
    body: (h) => {
      const { s, mi, pa, ky, wv } = F(h);
      return `
<h2>A quién cubre la regla de Ohio</h2>
<p>Dos condiciones: haber nacido a partir del ${s.cutoffL ?? h.nc} y manejar una embarcación con ${s.hpL ?? h.nc}. Alguien nacido en 1981 puede manejar cualquier embarcación sin certificado; alguien nacido en 1990 puede manejar un bote de pesca de 9,9 hp sin él. Los titulares de una credencial de marino mercante de la Guardia Costera con mención de capitán u operador están exentos y la llevan a bordo.</p>
<h2>Tres formas de cumplirla</h2>
<ul>
<li><strong>El examen de competencia gratis del ODNR</strong>, en una oficina de embarcaciones.</li>
<li><strong>Un curso gratis en línea</strong>: el curso de la BoatUS Foundation está ${s.freeL} en Ohio (${h.ext(s.freeUrl, 'su página de Ohio')}).</li>
<li><strong>Un curso de pago en línea o presencial</strong> de un proveedor aprobado; al terminar un curso en línea se puede imprimir al momento un certificado temporal o permanente.</li>
</ul>
<p>La miniherramienta muestra la vía legal más barata en un estado.</p>
<!--tool:mini:free|{"state":"OH"}-->
<h2>Niños y motos acuáticas</h2>
<p>Embarcaciones de más de 10 hp: menores de 12 solo con un adulto de 18 años o más a bordo, ambos con certificado si nacieron en 1982 o después; sin compañía desde los 12 con certificado. Motos acuáticas: nunca antes de los 12, ni con certificado; de 12 a 15 con un adulto a bordo; solos desde los ${s.pwcAgeL}.</p>
<h2>Ohio frente a sus vecinos</h2>
${h.table(['', 'Ohio', 'Míchigan', 'Pensilvania', 'Kentucky', 'Virginia Occidental'], [
  ['Quién la necesita', s.whoL, mi.whoL, pa.whoL, ky.whoL, wv.whoL],
  ['Curso gratis BoatUS', s.freeL, mi.freeL, pa.freeL, ky.freeL, wv.freeL],
  ['Tarifa del estado', s.feeL, mi.feeL, pa.feeL, ky.feeL, wv.feeL],
], 'Ohio y los estados de su frontera, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l', 'l', 'l'])}
<p>El río Ohio se comparte con ${h.sl('KY')} y ${h.sl('WV')}, y el lago Erie con ${h.sl('MI')} y ${h.sl('PA')}. Kentucky solo aplica su regla a los operadores jóvenes, así que la respuesta puede cambiar en medio del río.</p>
<h2>Multas y prueba</h2>
<p>Manejar sin la educación exigida es un delito menor de cuarto grado: hasta 250 dólares, 30 días de cárcel o ambos, y hasta 500 dólares y 60 días si hay choque, lesiones o daños. Un navegante detenido sin prueba puede presentar el certificado en 72 horas. Las reglas federales de equipo del ${h.src('cfr175', '33 CFR parte 175')} se aplican como en todas partes, incluidas las señales de socorro en el lago Erie. Los datos de esta página se leyeron en ${h.os(C, 'las páginas del ODNR')} el ${s.checkedL}; este sitio no está afiliado al ODNR.</p>`;
    },
  },
});
