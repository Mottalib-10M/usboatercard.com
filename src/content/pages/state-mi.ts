import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'MI';
const F = (h: Helpers) => ({ s: h.S(C), oh: h.S('OH'), wi: h.S('WI'), ind: h.S('IN') });

export default definePage({
  id: 'state-mi',
  group: 'states',
  order: 105,
  state: C,
  tool: { kind: 'check' },
  mini: { kind: 'mini:pwc' },
  related: ['home', 'age', 'pwc', 'state-oh', 'free-license', 'test'],
  sources: ['boatus', 'cfr175'],
  en: {
    slug: 'michigan-boating-license',
    nav: 'Michigan',
    card: 'Born on or after July 1, 1996 for a motor over 6 hp, and born after 1978 for a jet ski: two cut-offs and strict youth limits.',
    title: 'Michigan Boating License 2026: Two Cut-Offs, Youth Limits',
    description: 'Michigan boating license rules: born on or after July 1, 1996 for over 6 hp, after 1978 for a PWC. Check your case and see the horsepower limits for children.',
    h1: 'Michigan boating license: two cut-off dates and youth limits',
    intro: 'Michigan has one date for motorboats and an older one for personal watercraft, plus horsepower limits for children. Enter a birth date and boat to see what applies.',
    resume: (h) => {
      const { s } = F(h);
      return `Michigan's Department of Natural Resources (DNR) requires a boating safety certificate, also called a boater education card, from anyone born on or after ${s.cutoffL ?? h.nc} who operates a motorboat with a motor of more than 6 hp. For a personal watercraft the cut-off is older: everyone born after December 31, 1978 needs the certificate, so a jet ski rider in their forties may need it while the same person can drive a motorboat without one. Boats of 6 hp or less are outside the rule. The youth limits are among the strictest: a child under 12 may run up to 6 hp freely, over 6 and up to 35 hp only with a certificate and a supervisor aged 16 or more on board, and never more than 35 hp. On a PWC, nobody under 14 may operate; ages 14 and 15 need the certificate and a parent, guardian or designated adult of 21 or more on board or on a PWC within 100 feet; from 16, a certificate holder may ride alone. Approved courses may be taken online at your own pace, and the free BoatUS Foundation course is ${s.freeL} in Michigan, which means an approved paid or classroom course is needed.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'I was born in 1985. Can I ride a jet ski in Michigan without a certificate?', a: 'No. For a personal watercraft the Michigan rule covers everyone born after December 31, 1978, so someone born in 1985 needs the boating safety certificate. The same person can drive a motorboat without one, because the motorboat cut-off is July 1, 1996.' },
        { q: 'How much horsepower can a 10-year-old run in Michigan?', a: 'Up to 6 hp without conditions. From more than 6 hp up to 35 hp, only with a boating safety certificate and someone at least 16 years old directly supervising on board. More than 35 hp is not allowed under any circumstances for a child under 12.' },
        { q: 'Is the free online course accepted in Michigan?', a: `The BoatUS Foundation free course is ${s.freeL} in Michigan according to its own state list. Michigan approves other online and classroom courses, which the DNR lists on its boating safety page, with their format and provider. Compare that list before paying for a course.` },
      ];
    },
    body: (h) => {
      const { s, oh, wi, ind } = F(h);
      return `
<h2>Two cut-offs, one certificate</h2>
<ul>
<li><strong>Motorboat over 6 hp:</strong> born on or after ${s.cutoffL ?? h.nc}.</li>
<li><strong>Personal watercraft:</strong> born after December 31, 1978.</li>
</ul>
<p>The same certificate covers both. Because the check reads the type of boat, enter "PWC" to see the older cut-off apply. The mini-tool answers for a jet ski rider of a given age.</p>
<!--tool:mini:pwc|{"state":"MI","age":15}-->
<h2>Children and horsepower</h2>
${h.table(['Age', 'Motorboat', 'Personal watercraft'], [
  ['Under 12', 'Up to 6 hp freely; over 6 to 35 hp with a certificate and a supervisor 16+ on board; never over 35 hp', 'Not allowed'],
  ['12 to 13', 'Over 6 hp with a certificate', 'Not allowed'],
  ['14 to 15', 'Over 6 hp with a certificate', 'Certificate plus an adult 21+ on board or within 100 ft'],
  ['16 and over', 'Certificate if born on or after July 1, 1996', 'Alone with a certificate'],
], 'Summary of the Michigan DNR age restrictions page, in our words.', ['l', 'l', 'l'])}
<h2>Getting the certificate</h2>
<p>The DNR approves classroom courses and online courses studied at your own pace. The free BoatUS course is ${s.freeL} in Michigan (${h.ext(s.freeUrl, 'its Michigan page')}). The DNR pages read do not publish a state card fee, shown as ${s.feeL}; course providers may charge. A lost certificate is reprinted online through the DNR eLicense system.</p>
<h2>Michigan beside its neighbors</h2>
${h.table(['', 'Michigan', 'Ohio', 'Wisconsin', 'Indiana'], [
  ['Who needs it', s.whoL, oh.whoL, wi.whoL, ind.whoL],
  ['PWC alone from', s.pwcAgeL, oh.pwcAgeL, wi.pwcAgeL, ind.pwcAgeL],
  ['Free BoatUS course', s.freeL, oh.freeL, wi.freeL, ind.freeL],
], 'Michigan and the states across its borders and lakes, from the official pages read.', ['l', 'l', 'l', 'l', 'l'])}
<p>On the Great Lakes, Michigan waters meet ${h.sl('OH')} in Lake Erie and ${h.sl('WI')} in Lake Michigan. The rule of the state whose water you are on applies; a certificate from an approved course is the simplest way to be covered on both sides.</p>
<h2>On the water</h2>
<p>Great Lakes boating also means federal equipment rules: wearable life jackets for each person, a throwable device on boats of 16 feet or more and visual distress signals, which ${h.src('cfr175', '33 CFR part 175')} requires on the Great Lakes as on coastal waters. The ${h.a('test', 'practice test')} covers them. Facts on this page were read on ${h.os(C, 'the Michigan DNR pages')} on ${s.checkedL}; this site is not affiliated with the DNR.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-michigan',
    nav: 'Míchigan',
    card: 'Nacidos desde el 1 de julio de 1996 para más de 6 hp, y desde 1979 para moto acuática: dos fechas y límites para jóvenes.',
    title: 'Licencia de navegación en Míchigan 2026: dos fechas',
    description: 'Licencia de navegación en Míchigan: nacidos desde el 1 de julio de 1996 para más de 6 hp, y después de 1978 para moto acuática. Vea su caso y los límites.',
    h1: 'Licencia de navegación en Míchigan: dos fechas de corte',
    intro: 'Míchigan tiene una fecha para las lanchas y otra más antigua para las motos acuáticas, además de límites de potencia para los niños. Indique una fecha de nacimiento y una embarcación.',
    resume: (h) => {
      const { s } = F(h);
      return `El Departamento de Recursos Naturales (DNR) de Míchigan exige un certificado de seguridad náutica, también llamado tarjeta de educación náutica, a quien nació a partir del ${s.cutoffL ?? h.nc} y maneja una lancha con motor de más de 6 hp. Para una moto acuática la fecha es más antigua: toda persona nacida después del 31 de diciembre de 1978 necesita el certificado, así que alguien de cuarenta y tantos años puede necesitarlo para una moto acuática y no para una lancha. Las embarcaciones de 6 hp o menos quedan fuera. Los límites para jóvenes están entre los más estrictos: un niño menor de 12 años puede manejar hasta 6 hp libremente, de más de 6 a 35 hp solo con certificado y un supervisor de 16 años o más a bordo, y nunca más de 35 hp. En moto acuática, nadie menor de 14 puede manejar; a los 14 y 15 años hacen falta el certificado y un padre, tutor o adulto designado de 21 años o más a bordo o en otra moto a menos de 100 pies; desde los 16, quien tiene certificado puede ir solo. Los cursos aprobados pueden hacerse en línea a su ritmo, y el curso gratis de la BoatUS Foundation está ${s.freeL} en Míchigan, así que hace falta un curso aprobado de pago o presencial.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Nací en 1985. ¿Puedo manejar una moto acuática en Míchigan sin certificado?', a: 'No. Para una moto acuática la regla de Míchigan cubre a toda persona nacida después del 31 de diciembre de 1978, así que alguien nacido en 1985 necesita el certificado. La misma persona puede manejar una lancha sin él, porque la fecha para las lanchas es el 1 de julio de 1996.' },
        { q: '¿Cuánta potencia puede manejar un niño de 10 años en Míchigan?', a: 'Hasta 6 hp sin condiciones. De más de 6 hasta 35 hp, solo con certificado de seguridad náutica y alguien de al menos 16 años supervisando directamente a bordo. Más de 35 hp no se permite en ningún caso a un niño menor de 12 años.' },
        { q: '¿Se acepta el curso gratis en línea en Míchigan?', a: `El curso gratuito de la BoatUS Foundation está ${s.freeL} en Míchigan según su propia lista por estado. Míchigan aprueba otros cursos en línea y presenciales, que el DNR enumera en su página de seguridad náutica con su formato y proveedor. Compare esa lista antes de pagar un curso.` },
      ];
    },
    body: (h) => {
      const { s, oh, wi, ind } = F(h);
      return `
<h2>Dos fechas, un certificado</h2>
<ul>
<li><strong>Lancha de más de 6 hp:</strong> nacidos a partir del ${s.cutoffL ?? h.nc}.</li>
<li><strong>Moto acuática:</strong> nacidos después del 31 de diciembre de 1978.</li>
</ul>
<p>El mismo certificado cubre las dos. Como la comprobación lee el tipo de embarcación, elija «moto acuática» para ver aplicarse la fecha más antigua. La miniherramienta responde para un piloto de moto acuática de una edad dada.</p>
<!--tool:mini:pwc|{"state":"MI","age":15}-->
<h2>Niños y potencia</h2>
${h.table(['Edad', 'Lancha', 'Moto acuática'], [
  ['Menos de 12', 'Hasta 6 hp libremente; de más de 6 a 35 hp con certificado y supervisor de 16+ a bordo; nunca más de 35 hp', 'No permitido'],
  ['12 a 13', 'Más de 6 hp con certificado', 'No permitido'],
  ['14 a 15', 'Más de 6 hp con certificado', 'Certificado y un adulto de 21+ a bordo o a menos de 100 pies'],
  ['16 o más', 'Certificado si nació a partir del 1 de julio de 1996', 'Solo con certificado'],
], 'Resumen de la página de restricciones de edad del DNR de Míchigan, con nuestras palabras.', ['l', 'l', 'l'])}
<h2>Cómo obtener el certificado</h2>
<p>El DNR aprueba cursos presenciales y cursos en línea a su ritmo. El curso gratis de BoatUS está ${s.freeL} en Míchigan (${h.ext(s.freeUrl, 'su página de Míchigan')}). Las páginas del DNR consultadas no publican una tarifa estatal por la tarjeta, mostrada como ${s.feeL}; los proveedores de cursos pueden cobrar. Un certificado perdido se reimprime en línea en el sistema eLicense del DNR.</p>
<h2>Míchigan frente a sus vecinos</h2>
${h.table(['', 'Míchigan', 'Ohio', 'Wisconsin', 'Indiana'], [
  ['Quién la necesita', s.whoL, oh.whoL, wi.whoL, ind.whoL],
  ['Moto acuática sola desde', s.pwcAgeL, oh.pwcAgeL, wi.pwcAgeL, ind.pwcAgeL],
  ['Curso gratis BoatUS', s.freeL, oh.freeL, wi.freeL, ind.freeL],
], 'Míchigan y los estados al otro lado de sus fronteras y lagos, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l', 'l'])}
<p>En los Grandes Lagos, las aguas de Míchigan lindan con ${h.sl('OH')} en el lago Erie y con ${h.sl('WI')} en el lago Míchigan. Se aplica la regla del estado cuyas aguas pisa; un certificado de un curso aprobado es la forma más sencilla de estar cubierto a ambos lados.</p>
<h2>En el agua</h2>
<p>Navegar en los Grandes Lagos supone también las reglas federales de equipo: chalecos ponibles para cada persona, un dispositivo arrojadizo en embarcaciones de 16 pies o más y señales visuales de socorro, que el ${h.src('cfr175', '33 CFR parte 175')} exige en los Grandes Lagos como en aguas costeras. El ${h.a('test', 'examen de práctica')} los repasa. Los datos de esta página se leyeron en ${h.os(C, 'las páginas del DNR de Míchigan')} el ${s.checkedL}; este sitio no está afiliado al DNR.</p>`;
    },
  },
});
