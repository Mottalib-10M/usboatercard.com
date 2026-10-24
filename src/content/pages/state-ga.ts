import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const C = 'GA';
const F = (h: Helpers) => ({ s: h.S(C), fl: h.S('FL'), al: h.S('AL'), sc: h.S('SC'), nc: h.S('NC') });

export default definePage({
  id: 'state-ga',
  group: 'states',
  order: 107,
  state: C,
  tool: { kind: 'check' },
  mini: { kind: 'mini:age' },
  related: ['home', 'age', 'state-fl', 'free-license', 'how-to-get', 'test'],
  sources: ['boatus', 'cfr175', 'cfr173'],
  en: {
    slug: 'georgia-boating-license',
    nav: 'Georgia',
    card: 'Born in 1998 or later and any motor: a DNR-approved course, with length and horsepower limits for children.',
    title: 'Georgia Boating License 2026: Born 1998 or Later, Any Motor',
    description: 'Georgia boating license rules: anyone born on or after Jan. 1, 1998 needs a DNR-approved course for any motorized boat. Check your case and the youth limits.',
    h1: 'Georgia boating license: born in 1998 or later, any motor',
    intro: 'Georgia ties the course to the year of birth and to any engine, with no horsepower floor. Enter your birth date and boat to see whether you need it.',
    resume: (h) => {
      const { s } = F(h);
      return `Since July 1, 2014, every person born on or after ${s.cutoffL ?? h.nc} who operates any motorized vessel on Georgia waters must first complete a boater education course approved by the Georgia Department of Natural Resources (DNR). Unlike many states, Georgia sets no horsepower floor: a small outboard on a jon boat counts as much as a bass boat, and a personal watercraft is covered too. People born before 1998 need no course. Three groups are exempt: a person licensed by the Coast Guard as master of a vessel, a person operating on a private lake or pond, and a nonresident who carries proof of a NASBLA-approved course or equivalency exam from another state. Separate age limits apply to young operators: under 12, only a boat under 16 feet that is unpowered or has 30 hp or less, and only with a competent adult; from 12 to 15, boats under 16 feet including PWC with the course or a competent adult, and nothing of 16 feet or more; the DNR lists 16 as the age to operate any boat alone. The free BoatUS Foundation course is ${s.freeL} in Georgia.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: 'Does a trolling motor on a kayak count in Georgia?', a: 'The Georgia rule applies to any motorized vessel, with no horsepower threshold, so a kayak with a motor is covered for an operator born on or after January 1, 1998. A paddled kayak or canoe is not. This differs from neighbors that start at 10 hp.' },
        { q: 'Can my 14-year-old drive our 20-foot boat on Lake Lanier?', a: 'No. Georgia does not allow a person aged 12 to 15 to operate a vessel of 16 feet or more, even with a course. They may operate a boat or PWC under 16 feet if they passed the course or a competent adult is with them.' },
        { q: 'I live in Georgia but boat in Florida. Which course do I need?', a: `A course approved by Georgia DNR is NASBLA-approved, so Florida accepts it from a visitor with a photo ID. Florida applies its own cut-off date of January 1, 1988 and 10 hp, so a Georgian born in 1990 needs proof of a course in Florida too. The free BoatUS course is ${s.freeL} in Georgia.` },
      ];
    },
    body: (h) => {
      const { s, fl, al, sc, nc } = F(h);
      return `
<h2>The Georgia rule</h2>
<p>Two facts decide: your date of birth, on or after ${s.cutoffL ?? h.nc}, and whether the boat has a motor. Power does not matter. The course must be completed before the outing; there is no grace period for residents on the pages read.</p>
<h2>Age and boat length</h2>
${h.table(['Age', 'What may be operated'], [
  ['Under 12', 'A vessel under 16 ft, unpowered or with 30 hp or less, only with a competent adult'],
  ['12 to 15', 'A vessel under 16 ft, PWC included, with the course or a competent adult; nothing of 16 ft or more'],
  ['16 and over', 'Any vessel, with the course if born on or after January 1, 1998'],
], 'Summary of the Georgia DNR boat operation page, in our words.', ['l', 'l'])}
<p>The mini-tool gives the motorboat and PWC ages in any state.</p>
<!--tool:mini:age|{"state":"GA","age":14}-->
<h2>Getting the course</h2>
<p>Georgia DNR publishes the list of approved courses, online and classroom. The BoatUS Foundation course is ${s.freeL} (${h.ext(s.freeUrl, 'its Georgia page')}). The DNR pages read do not state a card fee, shown as ${s.feeL}.</p>
<h2>Georgia beside its neighbors</h2>
${h.table(['', 'Georgia', 'Florida', 'Alabama', 'South Carolina', 'North Carolina'], [
  ['Who needs it', s.whoL, fl.whoL, al.whoL, sc.whoL, nc.whoL],
  ['Power', 'any motor', fl.hpL ?? h.nc, al.hpL ?? 'any motor', sc.hpL ?? h.nc, nc.hpL ?? h.nc],
  ['Free BoatUS course', s.freeL, fl.freeL, al.freeL, sc.freeL, nc.freeL],
], 'Georgia and the states on its borders, from the official pages read.', ['l', 'l', 'l', 'l', 'l', 'l'])}
<p>Lake Hartwell and Lake Thurmond are shared with ${h.sl('SC')}, Lake Seminole and the St. Marys River with ${h.sl('FL')}, West Point Lake and the Chattahoochee with ${h.sl('AL')}. ${h.sl('AL')} asks for a vessel license from nearly every operator, a different system.</p>
<h2>On the water</h2>
<p>Federal rules apply on every lake and on the coast: registration numbers under ${h.src('cfr173', '33 CFR part 173')}, a wearable life jacket per person and the equipment of ${h.src('cfr175', '33 CFR part 175')}. The ${h.a('test', 'practice test')} covers them. Facts on this page were read on ${h.os(C, 'the Georgia DNR pages')} on ${s.checkedL}; this site is not affiliated with the DNR.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-georgia',
    nav: 'Georgia',
    card: 'Nacidos desde 1998 y cualquier motor: un curso aprobado por el DNR, con límites de eslora y potencia para niños.',
    title: 'Licencia de navegación en Georgia 2026: nacidos desde 1998',
    description: 'Licencia de navegación en Georgia: quien nació desde el 1 de enero de 1998 necesita un curso aprobado por el DNR para toda lancha. Vea su caso y los límites.',
    h1: 'Licencia de navegación en Georgia: nacidos desde 1998, cualquier motor',
    intro: 'Georgia liga el curso al año de nacimiento y a cualquier motor, sin mínimo de potencia. Indique su fecha de nacimiento y su embarcación para ver si lo necesita.',
    resume: (h) => {
      const { s } = F(h);
      return `Desde el 1 de julio de 2014, toda persona nacida a partir del ${s.cutoffL ?? h.nc} que maneje cualquier embarcación con motor en aguas de Georgia debe haber aprobado antes un curso de educación náutica aprobado por el Departamento de Recursos Naturales de Georgia (DNR). A diferencia de muchos estados, Georgia no fija mínimo de potencia: un pequeño fueraborda en un bote cuenta igual que una lancha de pesca, y las motos acuáticas también están cubiertas. Quien nació antes de 1998 no necesita curso. Hay tres grupos exentos: quien tiene licencia de capitán de la Guardia Costera, quien navega en un lago o estanque privado, y un no residente que lleva la prueba de un curso aprobado por NASBLA o de un examen equivalente de otro estado. Los jóvenes tienen límites propios: menos de 12 años, solo una embarcación de menos de 16 pies sin motor o de 30 hp o menos, y solo con un adulto competente; de 12 a 15, embarcaciones de menos de 16 pies, motos acuáticas incluidas, con el curso o con un adulto competente, y nada de 16 pies o más; el DNR indica 16 años como la edad para manejar cualquier embarcación solo. El curso gratis de la BoatUS Foundation está ${s.freeL} en Georgia.`;
    },
    faqs: (h) => {
      const { s } = F(h);
      return [
        { q: '¿Cuenta un motor eléctrico en un kayak en Georgia?', a: 'La regla de Georgia se aplica a toda embarcación con motor, sin umbral de potencia, así que un kayak con motor está cubierto para un operador nacido a partir del 1 de enero de 1998. Un kayak o una canoa a remo no. Esto difiere de los vecinos que empiezan en 10 hp.' },
        { q: '¿Puede mi hijo de 14 años manejar nuestra lancha de 20 pies en el lago Lanier?', a: 'No. Georgia no permite a una persona de 12 a 15 años manejar una embarcación de 16 pies o más, ni siquiera con curso. Puede manejar una embarcación o moto acuática de menos de 16 pies si aprobó el curso o va con un adulto competente.' },
        { q: 'Vivo en Georgia pero navego en Florida. ¿Qué curso necesito?', a: `Un curso aprobado por el DNR de Georgia está aprobado por NASBLA, así que Florida lo acepta de un visitante con identificación con foto. Florida aplica su propia fecha de corte del 1 de enero de 1988 y 10 hp, así que un georgiano nacido en 1990 también necesita la prueba de un curso en Florida. El curso gratis de BoatUS está ${s.freeL} en Georgia.` },
      ];
    },
    body: (h) => {
      const { s, fl, al, sc, nc } = F(h);
      return `
<h2>La regla de Georgia</h2>
<p>Deciden dos datos: su fecha de nacimiento, a partir del ${s.cutoffL ?? h.nc}, y si la embarcación tiene motor. La potencia no importa. El curso debe estar aprobado antes de la salida; las páginas consultadas no prevén plazo de gracia para los residentes.</p>
<h2>Edad y eslora</h2>
${h.table(['Edad', 'Qué se puede manejar'], [
  ['Menos de 12', 'Una embarcación de menos de 16 pies, sin motor o de 30 hp o menos, solo con un adulto competente'],
  ['12 a 15', 'Una embarcación de menos de 16 pies, motos acuáticas incluidas, con el curso o un adulto competente; nada de 16 pies o más'],
  ['16 o más', 'Cualquier embarcación, con el curso si nació a partir del 1 de enero de 1998'],
], 'Resumen de la página de manejo de embarcaciones del DNR de Georgia, con nuestras palabras.', ['l', 'l'])}
<p>La miniherramienta da las edades para lancha y moto acuática en cualquier estado.</p>
<!--tool:mini:age|{"state":"GA","age":14}-->
<h2>Cómo hacer el curso</h2>
<p>El DNR de Georgia publica la lista de cursos aprobados, en línea y presenciales. El curso de la BoatUS Foundation está ${s.freeL} (${h.ext(s.freeUrl, 'su página de Georgia')}). Las páginas del DNR consultadas no indican tarifa por la tarjeta, mostrada como ${s.feeL}.</p>
<h2>Georgia frente a sus vecinos</h2>
${h.table(['', 'Georgia', 'Florida', 'Alabama', 'Carolina del Sur', 'Carolina del Norte'], [
  ['Quién la necesita', s.whoL, fl.whoL, al.whoL, sc.whoL, nc.whoL],
  ['Potencia', 'cualquier motor', fl.hpL ?? h.nc, al.hpL ?? 'cualquier motor', sc.hpL ?? h.nc, nc.hpL ?? h.nc],
  ['Curso gratis BoatUS', s.freeL, fl.freeL, al.freeL, sc.freeL, nc.freeL],
], 'Georgia y los estados de su frontera, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l', 'l', 'l'])}
<p>Los lagos Hartwell y Thurmond se comparten con ${h.sl('SC')}, el lago Seminole y el río St. Marys con ${h.sl('FL')}, y el lago West Point y el Chattahoochee con ${h.sl('AL')}. ${h.sl('AL')} pide una licencia de embarcación a casi todo operador, un sistema distinto.</p>
<h2>En el agua</h2>
<p>Las reglas federales se aplican en todos los lagos y en la costa: números de registro según el ${h.src('cfr173', '33 CFR parte 173')}, un chaleco salvavidas ponible por persona y el equipo del ${h.src('cfr175', '33 CFR parte 175')}. El ${h.a('test', 'examen de práctica')} los repasa. Los datos de esta página se leyeron en ${h.os(C, 'las páginas del DNR de Georgia')} el ${s.checkedL}; este sitio no está afiliado al DNR.</p>`;
    },
  },
});
