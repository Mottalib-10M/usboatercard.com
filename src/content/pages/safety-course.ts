import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const req = h.where((s) => s.required === true);
  const free = req.filter((s) => s.boatus?.status === 'approved');
  const notFree = req.filter((s) => s.boatus?.status === 'not-approved');
  const proctor = req.filter((s) => s.card.inPersonExamRequired === true);
  const noOnline = req.filter((s) => s.card.onlineAllowed === false);
  return { req, free, notFree, proctor, noOnline };
};

export default definePage({
  id: 'safety-course',
  group: 'course',
  order: 10,
  tool: { kind: 'mini:online', props: { state: 'TX' } },
  mini: { kind: 'mini:free', props: { state: 'NJ' } },
  related: ['test', 'free-license', 'online', 'how-to-get', 'state-tx'],
  sources: ['boatus', 'navrules', 'cfr175'],
  en: {
    slug: 'boater-safety-course',
    nav: 'Boater safety course',
    card: 'Which course formats each state accepts, where the free one counts and where an exam must be proctored.',
    title: 'Boater Safety Course: Formats Each State Accepts (2026)',
    description: 'Boater safety course by state: the formats each state accepts, where the free online course counts, and what the exam covers. Pick your state to see it.',
    h1: 'Boater safety course: what your state accepts',
    intro: 'Every state card starts with an approved course. Pick your state to see whether it can be done fully online, whether the free course counts and what comes after.',
    resume: (h) => {
      const { req, free, notFree, proctor } = F(h);
      return `A boater safety course is the education the state card certifies: a course approved by the state and, in almost every case, recognized by the National Association of State Boating Law Administrators (NASBLA), which sets the national content standard. It covers the same core everywhere: boat types and terms, the federal Navigation Rules, lights and sound signals, buoys, required equipment, fueling and ventilation, emergencies, and the law of the state. Formats vary: online at your own pace, a classroom session given by the state or by volunteer groups, or an equivalency exam. Of the ${req.length} verified states with a requirement, ${free.length} accept the free online course of the BoatUS Foundation, and ${notFree.length} do not, so there a state-approved course is needed. ${proctor.length ? `${h.list(h.names(proctor))} also ${proctor.length > 1 ? 'require' : 'requires'} the final exam to be taken in person or under a proctor.` : ''} The tool above gives the answer for your state, and the second one shows the cheapest legal route.`;
    },
    faqs: (h) => {
      const { notFree } = F(h);
      return [
        { q: 'How long does a boater safety course take?', a: 'Most online courses are built to take a few hours, and you can stop and resume. Classroom courses usually fit in one day or two evenings. States rarely set a minimum number of hours on their own pages, so the length depends on the course you choose; what counts is passing its final exam.' },
        { q: 'Is a NASBLA-approved course accepted in every state?', a: `A NASBLA-approved course from your home state is recognized by other states for visitors almost everywhere. For a card issued by a given state, the course must be approved by that state. Some states, such as ${notFree.length ? h.list(h.names(notFree).slice(0, 3)) : 'a few in the Northeast'}, do not accept the free BoatUS course for their own card.` },
        { q: 'Can I take the course before I buy a boat?', a: 'Yes. The card belongs to the person, not to the boat, and it can be earned at any age the course allows. Many families take it before the season so that a teen can operate legally from the first outing. The certificate usually lets you boat until the card arrives.' },
      ];
    },
    body: (h) => {
      const { req, free, notFree, proctor, noOnline } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.onlineL, x.proctorL, x.freeL]; });
      return `
<h2>What the course teaches</h2>
<p>NASBLA's national standard is the common base of every approved course, which is why a card from one state is honored in another. Expect chapters on:</p>
<ul>
<li><strong>The boat:</strong> hull types, parts and terms (bow, stern, port, starboard), capacity plates, engines and fueling, with the ventilation rule for gasoline inboards in ${h.src('cfr183', '33 CFR part 183')}.</li>
<li><strong>Equipment:</strong> life jackets for each person, throwable devices, distress signals, fire extinguishers and sound devices, set by ${h.src('cfr175', '33 CFR part 175')}.</li>
<li><strong>Rules of the road:</strong> the ${h.src('navrules', 'Navigation Rules')}: lookout, safe speed, crossing, meeting, overtaking, sound signals and lights.</li>
<li><strong>Buoys and markers:</strong> the lateral system, "red, right, returning", regulatory markers.</li>
<li><strong>Emergencies:</strong> falling overboard, capsizing, cold water, carbon monoxide, accident reporting.</li>
<li><strong>State law:</strong> who needs the card, ages, personal watercraft, water skiing, local speed and wake rules.</li>
</ul>
<h2>Formats, state by state</h2>
<p>"Online" is whether a course taken online is accepted for the state card; "Proctored exam" is whether the final exam must be taken in person or under supervision. A state not verified yet is left out of the table.</p>
${h.table(['State', 'Online course', 'Proctored exam', 'Free BoatUS course'], rows, `The ${req.length} verified states with an education requirement. "Not confirmed": the official pages read do not say.`, ['l', 'r', 'r', 'r'])}
<p>${noOnline.length ? `${h.list(h.names(noOnline))} ${noOnline.length > 1 ? 'do' : 'does'} not accept a purely online course for the state credential.` : ''} ${proctor.length ? `In ${h.list(h.names(proctor))}, the exam is taken under supervision.` : ''} Elsewhere, an online course with an online exam is enough.</p>
<h2>Where the free course counts</h2>
<p>The BoatUS Foundation offers its course at no cost and lists, state by state, where it is approved. It is accepted in ${free.length} of the states above and refused in ${notFree.length}. When it is accepted, the course itself is free, and what remains is the state's own fee, if any, or the payment the Foundation states on its page for the state (collected at enrollment in ${h.list(h.names(free.filter((s) => s.boatus?.payment?.kind === 'enrollment')))}; the card must be bought in ${h.list(h.names(free.filter((s) => s.boatus?.payment?.kind === 'card-required')))}).</p>
<!--tool:mini:free|{"state":"OH"}-->
<h2>After the course</h2>
<p>Passing the exam is not always the end: some states issue the card themselves after the course provider reports the result, some ask you to apply and pay a fee, and a few let the course certificate serve as the card. The ${h.a('how-to-get', 'step-by-step page')} gives the sequence for each state, and the ${h.a('test', 'practice test')} lets you check that you are ready before the exam.</p>`;
    },
  },
  es: {
    slug: 'curso-de-seguridad-nautica',
    nav: 'Curso de seguridad náutica',
    card: 'Qué formatos de curso acepta cada estado, dónde vale el gratuito y dónde el examen debe ser supervisado.',
    title: 'Curso de seguridad náutica: lo que acepta cada estado',
    description: 'Curso de seguridad náutica por estado: los formatos que acepta cada estado, dónde cuenta el curso gratis en línea y qué cubre el examen. Elija su estado.',
    h1: 'Curso de seguridad náutica: lo que acepta su estado',
    intro: 'Toda tarjeta estatal empieza con un curso aprobado. Elija su estado para ver si puede hacerse todo en línea, si cuenta el curso gratuito y qué viene después.',
    resume: (h) => {
      const { req, free, notFree, proctor } = F(h);
      return `Un curso de seguridad náutica es la formación que certifica la tarjeta del estado: un curso aprobado por el estado y, casi siempre, reconocido por la Asociación Nacional de Administradores Estatales de Leyes Náuticas (NASBLA), que fija el estándar nacional de contenido. Cubre en todas partes la misma base: tipos de embarcación y vocabulario, las Reglas de Navegación federales, luces y señales sonoras, boyas, equipo obligatorio, carga de combustible y ventilación, emergencias y la ley del estado. Los formatos varían: en línea a su ritmo, una sesión presencial del estado o de grupos voluntarios, o un examen de equivalencia. De los ${req.length} estados verificados con requisito, ${free.length} aceptan el curso gratuito en línea de la BoatUS Foundation y ${notFree.length} no, así que allí hace falta un curso aprobado por el estado. ${proctor.length ? `${h.list(h.names(proctor))} ${proctor.length > 1 ? 'exigen' : 'exige'} además que el examen final se haga en persona o con supervisión.` : ''} La herramienta de arriba da la respuesta para su estado, y la segunda muestra la vía legal más barata.`;
    },
    faqs: (h) => {
      const { notFree } = F(h);
      return [
        { q: '¿Cuánto dura un curso de seguridad náutica?', a: 'La mayoría de los cursos en línea están pensados para unas pocas horas, y se pueden pausar y retomar. Los presenciales suelen caber en un día o en dos tardes. Los estados rara vez fijan un mínimo de horas en sus páginas, así que la duración depende del curso elegido; lo que cuenta es aprobar su examen final.' },
        { q: '¿Se acepta en todos los estados un curso aprobado por NASBLA?', a: `Un curso aprobado por NASBLA en su estado de residencia lo reconocen los demás estados para los visitantes casi en todas partes. Para la tarjeta de un estado concreto, el curso debe estar aprobado por ese estado. Algunos estados, como ${notFree.length ? h.list(h.names(notFree).slice(0, 3)) : 'varios del noreste'}, no aceptan el curso gratuito de BoatUS para su propia tarjeta.` },
        { q: '¿Puedo tomar el curso antes de comprar una embarcación?', a: 'Sí. La tarjeta es de la persona, no de la embarcación, y se puede obtener a la edad que permita el curso. Muchas familias lo hacen antes de la temporada para que un adolescente pueda manejar legalmente desde la primera salida. El certificado suele permitir navegar hasta que llega la tarjeta.' },
      ];
    },
    body: (h) => {
      const { req, free, notFree, proctor, noOnline } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.onlineL, x.proctorL, x.freeL]; });
      return `
<h2>Lo que enseña el curso</h2>
<p>El estándar nacional de NASBLA es la base común de todo curso aprobado, y por eso la tarjeta de un estado se reconoce en otro. Espere capítulos sobre:</p>
<ul>
<li><strong>La embarcación:</strong> tipos de casco, partes y vocabulario (proa, popa, babor, estribor), placas de capacidad, motores y carga de combustible, con la regla de ventilación de los motores interiores de gasolina del ${h.src('cfr183', '33 CFR parte 183')}.</li>
<li><strong>El equipo:</strong> chalecos para cada persona, dispositivos arrojadizos, señales de socorro, extintores y medios sonoros, fijados por el ${h.src('cfr175', '33 CFR parte 175')}.</li>
<li><strong>Las reglas de circulación:</strong> las ${h.src('navrules', 'Reglas de Navegación')}: vigilancia, velocidad segura, cruce, encuentro de frente, adelantamiento, señales sonoras y luces.</li>
<li><strong>Boyas y marcas:</strong> el sistema lateral, «rojo a la derecha al regresar», las marcas reglamentarias.</li>
<li><strong>Emergencias:</strong> caída al agua, vuelco, agua fría, monóxido de carbono, notificación de accidentes.</li>
<li><strong>La ley del estado:</strong> quién necesita la tarjeta, edades, motos acuáticas, esquí acuático, reglas locales de velocidad y estela.</li>
</ul>
<h2>Formatos, estado por estado</h2>
<p>«En línea» indica si se acepta un curso hecho en línea para la tarjeta del estado; «Examen supervisado» indica si el examen final debe hacerse en persona o con supervisión. Un estado aún no verificado no aparece en la tabla.</p>
${h.table(['Estado', 'Curso en línea', 'Examen supervisado', 'Curso gratis BoatUS'], rows, `Los ${req.length} estados verificados con requisito de educación. «No confirmado»: las páginas oficiales consultadas no lo dicen.`, ['l', 'r', 'r', 'r'])}
<p>${noOnline.length ? `${h.list(h.names(noOnline))} no ${noOnline.length > 1 ? 'aceptan' : 'acepta'} un curso solo en línea para el documento del estado.` : ''} ${proctor.length ? `En ${h.list(h.names(proctor))}, el examen se hace con supervisión.` : ''} En los demás, basta un curso en línea con examen en línea.</p>
<h2>Dónde cuenta el curso gratuito</h2>
<p>La BoatUS Foundation ofrece su curso sin costo y publica, estado por estado, dónde está aprobado. Se acepta en ${free.length} de los estados de arriba y se rechaza en ${notFree.length}. Donde se acepta, el curso en sí es gratis, y lo que queda es la tarifa propia del estado, si la hay, o el pago que la fundación indica en su página del estado (se cobra al inscribirse en ${h.list(h.names(free.filter((s) => s.boatus?.payment?.kind === 'enrollment')))}; hay que comprar la tarjeta en ${h.list(h.names(free.filter((s) => s.boatus?.payment?.kind === 'card-required')))}).</p>
<!--tool:mini:free|{"state":"OH"}-->
<h2>Después del curso</h2>
<p>Aprobar el examen no siempre es el final: algunos estados emiten la tarjeta ellos mismos cuando el proveedor informa el resultado, otros piden que la solicite y pague una tarifa, y unos pocos dejan que el certificado del curso sirva de tarjeta. La ${h.a('how-to-get', 'página paso a paso')} da la secuencia de cada estado, y el ${h.a('test', 'examen de práctica')} le permite comprobar que está listo antes del examen.</p>`;
    },
  },
});
