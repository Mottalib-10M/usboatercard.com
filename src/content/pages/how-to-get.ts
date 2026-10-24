import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const req = h.where((s) => s.required === true);
  const free = req.filter((s) => s.boatus?.status === 'approved');
  const proctor = req.filter((s) => s.card.inPersonExamRequired === true);
  const withFee = req.filter((s) => (s.card.stateFee ?? 0) > 0);
  return { req, free, proctor, withFee };
};

export default definePage({
  id: 'how-to-get',
  group: 'card',
  order: 20,
  tool: { kind: 'check', props: { state: 'OH' } },
  mini: { kind: 'mini:credential', props: { state: 'OH' } },
  related: ['safety-course', 'free-license', 'how-much', 'test', 'state-oh'],
  sources: ['boatus', 'navrules'],
  en: {
    slug: 'how-to-get-a-boating-license',
    nav: 'How to get a boating license',
    card: 'Check, course, exam, card: the four steps and what each costs in your state.',
    title: 'Boating License: How to Get One in 4 Steps, State by State',
    description: 'How to get a boating license: check if your state requires it, take an approved course, pass the exam, get the card. See the steps and cost for your state.',
    h1: 'How to get a boating license in four steps',
    intro: 'First the check: do you need it at all, and for which boat. Then the course, the exam and the card. The tool starts with the first step for your state.',
    resume: (h) => {
      const { req, free, proctor, withFee } = F(h);
      return `Getting a boating license takes four steps, and the first one often ends the process: check whether your state requires a card for your age and your boat, because many people born before their state's cut-off date, or running a small motor, need none. If you do, take a course approved by your state: in ${free.length} of the ${req.length} verified states with a requirement, the free online course of the BoatUS Foundation is approved, and elsewhere the state agency lists approved online or classroom courses. Third, pass the course's final exam, online in most states${proctor.length ? ` and in person or under a proctor in ${h.list(h.names(proctor))}` : ''}. Fourth, get the card: in some states the provider reports the result and the state mails the card, in others you apply to the agency, and ${withFee.length} states charge a fee for it. Keep the course certificate on board until the card arrives where the state accepts it as temporary proof. The check above does step one; the mini-tool names the credential and who issues it.`;
    },
    faqs: () => [
      { q: 'How long does it take to get a boating license?', a: 'The course itself can be done in a day online. The card then arrives by mail after the provider reports the result, which can take some weeks depending on the state. Several states accept the course certificate as temporary proof meanwhile, so you can usually boat soon after passing.' },
      { q: 'What do I need to bring or provide?', a: 'An approved course asks for your name, date of birth and address so the state can issue the card, and sometimes a photo ID at the exam. On the water, carry the card with a photo ID. Do not send personal details to any site that is not your state agency or an approved course.' },
      { q: 'Can a child get a boating license?', a: 'Yes. Courses are open to children, and the card is often how a young person is allowed to operate at all. States set the youngest age to take the course or to operate alone, and some limit what a young card holder may drive. The age page lists those limits by state.' },
    ],
    body: (h) => {
      const { req, free } = F(h);
      return `
<h2>Step 1: check that you need it</h2>
<p>The answer depends on your state, your date of birth, your boat and its engine, and for some states the date of the outing. The tool above runs this check. If the answer is no, you are done: no course, no fee. You still follow the federal rules on equipment and navigation that apply to every boater.</p>
<h2>Step 2: choose an approved course</h2>
<p>Only a course approved by your state leads to its card. Three kinds exist: free online (the BoatUS Foundation course, approved in ${free.length} states), paid online from approved providers, and classroom courses given by state agencies or volunteer organizations. The ${h.a('safety-course', 'course page')} shows which formats each state accepts, and the ${h.a('free-license', 'free course page')} where the free one counts.</p>
<h2>Step 3: pass the exam</h2>
<p>The exam covers the federal ${h.src('navrules', 'Navigation Rules')}, lights, sound signals, buoys, required equipment and your state's law. Most courses let you retake it. The ${h.a('test', 'practice test')} uses the same topics, and the explanation after each answer gives the rule.</p>
<h2>Step 4: get the card</h2>
<p>Depending on the state, the card is mailed after the course reports your result, or you apply to the agency, sometimes paying a fee. The mini-tool names the credential in your state and who issues it.</p>
<!--tool:mini:credential|{"state":"TX"}-->
<h2>The four steps across the verified states</h2>
${h.table(['State', 'Required for', 'Free course', 'Exam supervised', 'State fee'], req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.whoL, x.freeL, x.proctorL, x.feeL]; }), 'Verified states with a requirement.', ['l', 'l', 'r', 'r', 'r'])}
<h2>After you have it</h2>
<p>Carry the card with a photo ID when you operate. It is valid in other states for visitors in almost every case, and it does not need renewing where the state says it is valid for life. Keep a photo of it: replacing a lost card goes through the agency or the provider that reported your course.</p>`;
    },
  },
  es: {
    slug: 'como-obtener-licencia-de-navegacion',
    nav: 'Cómo obtener la licencia náutica',
    card: 'Comprobar, curso, examen, tarjeta: los cuatro pasos y lo que cuesta cada uno en su estado.',
    title: 'Licencia de navegación: cómo obtenerla en 4 pasos por estado',
    description: 'Cómo obtener la licencia de navegación: vea si su estado la exige, haga un curso aprobado, apruebe el examen y reciba la tarjeta. Pasos y costo por estado.',
    h1: 'Cómo obtener la licencia de navegación en cuatro pasos',
    intro: 'Primero, la comprobación: si la necesita y para qué embarcación. Luego el curso, el examen y la tarjeta. La herramienta empieza por el primer paso para su estado.',
    resume: (h) => {
      const { req, free, proctor, withFee } = F(h);
      return `Obtener una licencia de navegación lleva cuatro pasos, y el primero a menudo termina el trámite: compruebe si su estado exige la tarjeta para su edad y su embarcación, porque mucha gente nacida antes de la fecha de corte de su estado, o con un motor pequeño, no la necesita. Si la necesita, tome un curso aprobado por su estado: en ${free.length} de los ${req.length} estados verificados con requisito, el curso gratuito en línea de la BoatUS Foundation está aprobado, y en los demás la agencia estatal publica los cursos aprobados en línea o presenciales. Tercero, apruebe el examen final del curso, en línea en la mayoría de los estados${proctor.length ? ` y en persona o con supervisión en ${h.list(h.names(proctor))}` : ''}. Cuarto, reciba la tarjeta: en algunos estados el proveedor informa el resultado y el estado la envía por correo, en otros se solicita a la agencia, y ${withFee.length} estados cobran una tarifa por ella. Lleve a bordo el certificado del curso hasta que llegue la tarjeta donde el estado lo acepta como prueba provisional. La comprobación de arriba hace el primer paso; la miniherramienta da el nombre del documento y quién lo emite.`;
    },
    faqs: () => [
      { q: '¿Cuánto se tarda en obtener la licencia de navegación?', a: 'El curso en sí puede hacerse en un día en línea. La tarjeta llega luego por correo cuando el proveedor informa el resultado, lo que puede tardar algunas semanas según el estado. Varios estados aceptan el certificado del curso como prueba provisional mientras tanto, así que suele poder navegar poco después de aprobar.' },
      { q: '¿Qué tengo que llevar o dar?', a: 'Un curso aprobado pide su nombre, fecha de nacimiento y dirección para que el estado emita la tarjeta, y a veces una identificación con foto en el examen. En el agua, lleve la tarjeta con una identificación con foto. No dé sus datos personales a ningún sitio que no sea su agencia estatal o un curso aprobado.' },
      { q: '¿Puede un niño obtener la licencia de navegación?', a: 'Sí. Los cursos están abiertos a los niños, y la tarjeta es a menudo lo que permite a un joven manejar. Los estados fijan la edad mínima para tomar el curso o para manejar solo, y algunos limitan lo que puede manejar un joven con tarjeta. La página de la edad enumera esos límites por estado.' },
    ],
    body: (h) => {
      const { req, free } = F(h);
      return `
<h2>Paso 1: compruebe que la necesita</h2>
<p>La respuesta depende de su estado, su fecha de nacimiento, su embarcación y su motor, y en algunos estados de la fecha de la salida. La herramienta de arriba hace esta comprobación. Si la respuesta es no, ha terminado: ni curso ni tarifa. Igual sigue las reglas federales de equipo y navegación que se aplican a todos.</p>
<h2>Paso 2: elija un curso aprobado</h2>
<p>Solo un curso aprobado por su estado da su tarjeta. Hay tres tipos: gratis en línea (el curso de la BoatUS Foundation, aprobado en ${free.length} estados), de pago en línea de proveedores aprobados, y presencial, dado por agencias estatales u organizaciones voluntarias. La ${h.a('safety-course', 'página del curso')} muestra qué formatos acepta cada estado, y la ${h.a('free-license', 'página del curso gratuito')} dónde cuenta el gratis.</p>
<h2>Paso 3: apruebe el examen</h2>
<p>El examen cubre las ${h.src('navrules', 'Reglas de Navegación')} federales, las luces, las señales sonoras, las boyas, el equipo obligatorio y la ley de su estado. La mayoría de los cursos permiten repetirlo. El ${h.a('test', 'examen de práctica')} usa los mismos temas, y la explicación tras cada respuesta da la regla.</p>
<h2>Paso 4: reciba la tarjeta</h2>
<p>Según el estado, la tarjeta llega por correo cuando el curso informa su resultado, o se solicita a la agencia, a veces pagando una tarifa. La miniherramienta da el nombre del documento en su estado y quién lo emite.</p>
<!--tool:mini:credential|{"state":"TX"}-->
<h2>Los cuatro pasos en los estados verificados</h2>
${h.table(['Estado', 'Exigida a', 'Curso gratis', 'Examen supervisado', 'Tarifa del estado'], req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.whoL, x.freeL, x.proctorL, x.feeL]; }), 'Estados verificados con requisito.', ['l', 'l', 'r', 'r', 'r'])}
<h2>Después de obtenerla</h2>
<p>Lleve la tarjeta con una identificación con foto cuando maneje. Vale en otros estados para los visitantes casi siempre, y no hay que renovarla donde el estado dice que vale de por vida. Guarde una foto: reponer una tarjeta perdida pasa por la agencia o por el proveedor que informó su curso.</p>`;
    },
  },
});
