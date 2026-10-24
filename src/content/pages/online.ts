import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const req = h.where((s) => s.required === true);
  const yes = req.filter((s) => s.card.onlineAllowed === true && s.card.inPersonExamRequired !== true);
  const proctor = req.filter((s) => s.card.inPersonExamRequired === true);
  const noOnline = req.filter((s) => s.card.onlineAllowed === false);
  const unknown = req.filter((s) => s.card.onlineAllowed == null);
  return { req, yes, proctor, noOnline, unknown };
};

export default definePage({
  id: 'online',
  group: 'course',
  order: 12,
  tool: { kind: 'mini:online', props: { state: 'NJ' } },
  mini: { kind: 'mini:credential', props: { state: 'CT' } },
  related: ['safety-course', 'free-license', 'how-to-get', 'state-nj', 'test'],
  sources: ['boatus', 'navrules'],
  en: {
    slug: 'boating-license-online',
    nav: 'Boating license online',
    card: 'Which states let you take the course and exam fully online, and which want a proctored or classroom exam.',
    title: 'Boating License Online: States That Accept It in 2026',
    description: 'Boating license online by state: where an online course and exam earn the card, where a proctored or classroom exam is needed, and where the free course counts.',
    h1: 'Boating license online: which states accept it',
    intro: 'In most states you can earn the card without leaving home. A few want the exam in person or under a proctor. Pick your state to see which applies.',
    resume: (h) => {
      const { req, yes, proctor, noOnline, unknown } = F(h);
      return `In ${yes.length} of the ${req.length} verified states that require boater education, a course and its exam taken entirely online are enough for the state card: you study at your own pace, pass the final test on screen and receive a certificate, then the card. ${proctor.length ? `${h.list(h.names(proctor))} ${proctor.length > 1 ? 'require' : 'requires'} the final exam to be taken in person or under a proctor, even after an online course` : 'No verified state requires a proctored exam'}${noOnline.length ? `, and ${h.list(h.names(noOnline))} ${noOnline.length > 1 ? 'do' : 'does'} not accept an online course for the credential at all` : ''}. ${unknown.length ? `For ${unknown.length} states, the official pages we read do not say clearly whether online is accepted; the tool shows them as not confirmed.` : ''} "Online" is not the same as "free": the free BoatUS Foundation course is online too, but only approved in some states, while paid online courses from approved providers exist in most. The tool reads both facts for your state, and the second tool gives the name of the credential you will receive.`;
    },
    faqs: () => [
      { q: 'Is an online boating license legitimate?', a: 'It is, when the course is approved by your state: the card you receive is the same as after a classroom course. Look for the state approval on the agency page, not only for a national logo on the course site. A course not approved by your state can still teach you, but it will not give you the state card.' },
      { q: 'Can I take the online exam on my phone?', a: 'Most approved online courses work in a phone browser. In states that require a proctored exam, the final test is taken at a set location or under supervision, so check the state line before you start. The card is issued only after the exam result is reported.' },
      { q: 'How fast do I get the card after an online course?', a: 'Usually the course gives a printable certificate at once, and the state card follows by mail. Several states accept the certificate as temporary proof for a set number of days. The state page on this site gives that period when the agency publishes it.' },
    ],
    body: (h) => {
      const { req, proctor } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.onlineL, x.proctorL, x.cardL]; });
      return `
<h2>The answer for each state</h2>
${h.table(['State', 'Online course accepted', 'Exam in person or proctored', 'Credential issued'], rows, `Verified states with an education requirement. "Not confirmed": the agency pages read do not state it.`, ['l', 'r', 'r', 'l'])}
<h2>How an online course works</h2>
<p>An approved online course is split into chapters, each with a short quiz, and ends with a final exam. You can usually stop and come back; some states set a minimum time spent in the course. At the end you get a certificate of completion, and the provider reports your result to the state, which issues the card or tells you how to apply for it. The course content follows the national standard: the boat and its equipment, the ${h.src('navrules', 'Navigation Rules')}, lights, sound signals, buoys, emergencies and the state's own law.</p>
<h2>Where the exam is supervised</h2>
<p>${proctor.length ? `${h.list(h.names(proctor))} ${proctor.length > 1 ? 'require' : 'requires'} more than an online quiz: the final exam is taken in person, at a classroom session or a set location, or under supervision. The state page explains the arrangement.` : 'None of the verified states requires a supervised exam.'} The mini-tool gives the name of the credential in a state; in some states the "card" is in fact a certificate, a permit or a class on the driver license.</p>
<!--tool:mini:credential|{"state":"AL"}-->
<h2>Free and online</h2>
<p>The BoatUS Foundation course is free and online. Where the state approves it, it is the cheapest way to the card; where it is not approved, an approved paid course is needed. The ${h.a('free-license', 'free course page')} shows the status in every state.</p>
<h2>Before you pay for a course</h2>
<p>Check first whether you need the card: being born before your state's cut-off date, or running a motor below its power threshold, means no course is required. The ${h.a('home', 'check')} gives the answer from your birth date, then the ${h.a('test', 'practice test')} helps you pass the exam on the first try.</p>`;
    },
  },
  es: {
    slug: 'licencia-de-navegacion-en-linea',
    nav: 'Licencia náutica en línea',
    card: 'Qué estados permiten hacer el curso y el examen todo en línea y cuáles piden un examen supervisado o presencial.',
    title: 'Licencia de navegación en línea: estados que la aceptan',
    description: 'Licencia de navegación en línea: dónde un curso y un examen en línea dan la tarjeta, dónde se exige un examen supervisado y dónde cuenta el curso gratis.',
    h1: 'Licencia de navegación en línea: qué estados la aceptan',
    intro: 'En la mayoría de los estados se puede obtener la tarjeta sin salir de casa. Unos pocos piden el examen en persona o con supervisión. Elija su estado para saber cuál se aplica.',
    resume: (h) => {
      const { req, yes, proctor, noOnline, unknown } = F(h);
      return `En ${yes.length} de los ${req.length} estados verificados que exigen educación náutica, un curso y su examen hechos totalmente en línea bastan para la tarjeta del estado: estudia a su ritmo, aprueba el examen final en la pantalla y recibe un certificado y luego la tarjeta. ${proctor.length ? `${h.list(h.names(proctor))} ${proctor.length > 1 ? 'exigen' : 'exige'} que el examen final se haga en persona o con supervisión, incluso tras un curso en línea` : 'Ningún estado verificado exige un examen supervisado'}${noOnline.length ? `, y ${h.list(h.names(noOnline))} no ${noOnline.length > 1 ? 'aceptan' : 'acepta'} un curso en línea para el documento` : ''}. ${unknown.length ? `En ${unknown.length} estados, las páginas oficiales consultadas no dicen con claridad si se acepta en línea; la herramienta los muestra como no confirmados.` : ''} «En línea» no es lo mismo que «gratis»: el curso gratuito de la BoatUS Foundation también es en línea, pero solo está aprobado en algunos estados, mientras que hay cursos de pago en línea de proveedores aprobados en la mayoría. La herramienta lee los dos datos para su estado, y la segunda da el nombre del documento que recibirá.`;
    },
    faqs: () => [
      { q: '¿Es legítima una licencia de navegación en línea?', a: 'Sí, cuando el curso está aprobado por su estado: la tarjeta que recibe es la misma que tras un curso presencial. Busque la aprobación del estado en la página de la agencia, no solo un logotipo nacional en el sitio del curso. Un curso no aprobado por su estado puede enseñarle, pero no le dará la tarjeta estatal.' },
      { q: '¿Puedo hacer el examen en línea en mi teléfono?', a: 'La mayoría de los cursos en línea aprobados funcionan en el navegador del teléfono. En los estados que exigen un examen supervisado, la prueba final se hace en un lugar fijo o con supervisión, así que revise la línea del estado antes de empezar. La tarjeta solo se emite cuando se informa el resultado.' },
      { q: '¿Cuánto tarda la tarjeta tras un curso en línea?', a: 'Normalmente el curso da al instante un certificado imprimible, y la tarjeta del estado llega por correo. Varios estados aceptan el certificado como prueba provisional durante un número de días. La página del estado en este sitio indica ese plazo cuando la agencia lo publica.' },
    ],
    body: (h) => {
      const { req, proctor } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.onlineL, x.proctorL, x.cardL]; });
      return `
<h2>La respuesta para cada estado</h2>
${h.table(['Estado', 'Curso en línea aceptado', 'Examen presencial o supervisado', 'Documento emitido'], rows, 'Estados verificados con requisito de educación. «No confirmado»: las páginas de la agencia consultadas no lo indican.', ['l', 'r', 'r', 'l'])}
<h2>Cómo funciona un curso en línea</h2>
<p>Un curso en línea aprobado se divide en capítulos, cada uno con un cuestionario corto, y termina con un examen final. Normalmente se puede parar y volver; algunos estados fijan un tiempo mínimo dentro del curso. Al final recibe un certificado de finalización, y el proveedor informa su resultado al estado, que emite la tarjeta o le dice cómo solicitarla. El contenido sigue el estándar nacional: la embarcación y su equipo, las ${h.src('navrules', 'Reglas de Navegación')}, las luces, las señales sonoras, las boyas, las emergencias y la ley propia del estado.</p>
<h2>Dónde se supervisa el examen</h2>
<p>${proctor.length ? `${h.list(h.names(proctor))} ${proctor.length > 1 ? 'piden' : 'pide'} algo más que un cuestionario en línea: el examen final se hace en persona, en una sesión presencial o en un lugar fijo, o con supervisión. La página del estado explica cómo.` : 'Ningún estado verificado exige un examen supervisado.'} La miniherramienta da el nombre del documento en un estado; en algunos, la «tarjeta» es en realidad un certificado, un permiso o una clase de la licencia de conducir.</p>
<!--tool:mini:credential|{"state":"AL"}-->
<h2>Gratis y en línea</h2>
<p>El curso de la BoatUS Foundation es gratuito y en línea. Donde el estado lo aprueba, es el camino más barato hacia la tarjeta; donde no, hace falta un curso de pago aprobado. La ${h.a('free-license', 'página del curso gratuito')} muestra la situación en cada estado.</p>
<h2>Antes de pagar un curso</h2>
<p>Compruebe primero si necesita la tarjeta: haber nacido antes de la fecha de corte de su estado, o manejar un motor por debajo de su umbral de potencia, significa que no se exige ningún curso. La ${h.a('home', 'comprobación')} da la respuesta con su fecha de nacimiento, y el ${h.a('test', 'examen de práctica')} le ayuda a aprobar a la primera.</p>`;
    },
  },
});
