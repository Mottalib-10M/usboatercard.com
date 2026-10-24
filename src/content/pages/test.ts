import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { BANK, TOPICS } from '../../lib/engine/quiz';

const count = (t: string) => BANK.filter((q) => q.t === t).length;
const F = (h: Helpers) => ({ fl: h.S('FL'), byTopic: Object.fromEntries(TOPICS.map((t) => [t, count(t)])) as Record<string, number> });

export default definePage({
  id: 'test',
  group: 'course',
  order: 20,
  tool: { kind: 'quiz', props: { type: 'full' } },
  related: ['home', 'safety-course', 'how-to-get', 'free-license', 'state-fl'],
  sources: ['navrules', 'cfr62', 'cfr175', 'cfr173', 'cfr183', 'cfr95', 'cfr25', 'ecos'],
  en: {
    slug: 'boating-license-test',
    nav: 'Practice test',
    card: 'Free 20-question boating test from the federal rules and your state, every answer explained.',
    title: 'Boating License Test: Free Practice Questions for 2026',
    description: 'Boating license test practice: free questions on the Navigation Rules, lights, buoys and equipment, plus your state\'s rules, with the reason for every answer.',
    h1: 'Boating license practice test',
    intro: 'Pick your state and answer: navigation rules, sound signals, lights, buoys, required equipment and your state\'s own rule, with the reason given after every answer.',
    resume: (h) => {
      const { byTopic } = F(h);
      return `The exam at the end of an approved boating safety course is a multiple-choice test on the same ground in every state, because the rules of the road on the water are federal: the Inland Navigation Rules decide who gives way, which sound signals mean what and which lights a boat shows at night, and the Coast Guard's equipment rules set the life jackets, distress signals and extinguishers you must carry. Each course then adds the law of its state: who needs the card, the minimum ages, the local rules for personal watercraft. This practice test draws 20 questions from ${h.counts.questions} we wrote from those federal texts (${byTopic.rules} on right of way, ${byTopic.sound} on sound signals, ${byTopic.lights} on lights, ${byTopic.aids} on buoys and markers, ${byTopic.equipment} on equipment, ${byTopic.law + byTopic.safety} on the law and safe operation) and adds questions generated from the verified rule of the state you pick, ${h.counts.stateQ} in all. Each answer is explained at once with the rule behind it. The score panel uses 80 % as a practice target; each course sets its own pass mark.`;
    },
    faqs: () => [
      { q: 'Are these the questions of the real boating exam?', a: 'No. Course providers write their own exams and do not publish them, and we do not copy them. Each question here is written from a federal rule or a verified state fact, so it covers the same knowledge the course exam checks. If the explanations make sense to you, you know what the exam is testing.' },
      { q: 'What score do I need to pass the course exam?', a: 'Each approved course sets its own pass mark and retake rule, and states do not publish a single figure, so we give none as official. This practice test marks a target at 80 % so you can see where you stand. Aim higher than that before the real exam, and read the explanation of every question you miss.' },
      { q: 'Is the exam the same in every state?', a: 'The federal part is the same everywhere: Navigation Rules, lights, sound signals, buoys and equipment. The state part changes: who needs the card, ages, local speed and wake rules, rules for jet skis and water skiing. That is why the test asks for your state and mixes in questions from its verified rule.' },
    ],
    body: (h) => {
      const { byTopic, fl } = F(h);
      return `
<h2>What the test covers</h2>
${h.table(['Topic', 'Questions', 'Federal text'], [
  ['Right of way and conduct', byTopic.rules, h.src('navrules', '33 CFR 83, Rules 5 to 18')],
  ['Sound signals', byTopic.sound, h.src('navrules', '33 CFR 83, Rules 32 to 35')],
  ['Navigation lights', byTopic.lights, h.src('navrules', '33 CFR 83, Rules 20 to 31')],
  ['Buoys and markers', byTopic.aids, h.src('cfr62', '33 CFR 62')],
  ['Required equipment', byTopic.equipment, `${h.src('cfr175', '33 CFR 175')}, ${h.src('cfr183', '183')}, ${h.src('cfr25', '46 CFR 25')}`],
  ['Law and safe operation', byTopic.law + byTopic.safety, `${h.src('cfr173', '33 CFR 173')}, ${h.src('cfr95', '95')}`],
  ['Your state', h.counts.stateQ, 'state records'],
], 'Questions in the practice bank, by topic.', ['l', 'r', 'l'])}
<p>A test of 20 draws about one question in five from the state you pick, when its rule is verified, and the rest from the federal bank. Choose "Navigation rules, lights and buoys" or "Equipment, law and safety" in the selector to drill one half.</p>
<h2>The four rules most often missed</h2>
<p><strong>Crossing.</strong> When two powerboats cross, the one that sees the other on its right (starboard) side gives way. A simple way to hold it: the boat on your right shows you its red port light at night, and red means you stop or turn.</p>
<p><strong>Head-on.</strong> Both turn to starboard and pass port to port, like cars on a road. Under the Inland Rules, one short blast says "I intend to leave you on my port side".</p>
<p><strong>Red, right, returning.</strong> Coming back from the sea, red marks with even numbers stay on your right, green marks with odd numbers on your left. On a lake or river that does not flow to the sea, the chart or the state shows the direction.</p>
<p><strong>Life jackets.</strong> One approved wearable per person, plus a throwable on boats of 16 feet or more; a child under 13 wears one while the boat is underway, under the federal rule, unless the state sets its own age.</p>
<h2>How to study with it</h2>
<p>Take one full test cold to find your weak topics, then drill them with the selector. Read every explanation, even when you were right: the course exam often asks the same rule from another angle. When you reach 18 of 20 three times in a row, you are ready for the course exam. In ${h.sl('FL')} the course is required for anyone born on or after ${fl.cutoffL ?? h.nc}; the ${h.a('safety-course', 'course page')} lists how each state lets you take it.</p>
<h2>What the test is not</h2>
<p>It is not an approved course and it does not lead to a card. To get one, take a course approved by your state; the ${h.a('free-license', 'free course page')} shows where a free one is accepted. Questions were written by us; none comes from a course exam, a vendor test or a book.</p>`;
    },
  },
  es: {
    slug: 'examen-de-licencia-de-navegacion',
    nav: 'Examen de práctica',
    card: 'Examen náutico gratis de 20 preguntas con las reglas federales y su estado, cada respuesta explicada.',
    title: 'Examen de licencia de navegación: práctica gratis 2026',
    description: 'Examen de licencia de navegación: preguntas gratis sobre reglas de navegación, luces, boyas y equipo, y las reglas de su estado, con la razón de cada respuesta.',
    h1: 'Examen de práctica de la licencia de navegación',
    intro: 'Elija su estado y responda: reglas de navegación, señales sonoras, luces, boyas, equipo obligatorio y la regla propia de su estado, con el motivo después de cada respuesta.',
    resume: (h) => {
      const { byTopic } = F(h);
      return `El examen al final de un curso de seguridad náutica aprobado es un cuestionario de opción múltiple sobre los mismos temas en todos los estados, porque las reglas de circulación en el agua son federales: las Reglas de Navegación Interiores deciden quién cede el paso, qué significa cada señal sonora y qué luces muestra una embarcación de noche, y las reglas de equipo de la Guardia Costera fijan los chalecos, las señales de socorro y los extintores que hay que llevar. Cada curso añade luego la ley de su estado: quién necesita la tarjeta, las edades mínimas, las reglas locales de las motos acuáticas. Este examen de práctica saca 20 preguntas de las ${h.counts.questions} que escribimos a partir de esos textos federales (${byTopic.rules} sobre preferencia de paso, ${byTopic.sound} sobre señales sonoras, ${byTopic.lights} sobre luces, ${byTopic.aids} sobre boyas y marcas, ${byTopic.equipment} sobre equipo y ${byTopic.law + byTopic.safety} sobre la ley y la seguridad) y añade preguntas generadas a partir de la regla verificada del estado elegido, ${h.counts.stateQ} en total. Cada respuesta se explica al momento con la regla que la sostiene. El marcador usa el 80 % como meta de práctica; cada curso fija su propia nota.`;
    },
    faqs: () => [
      { q: '¿Son estas las preguntas del examen náutico real?', a: 'No. Los proveedores de cursos escriben sus propios exámenes y no los publican, y nosotros no los copiamos. Cada pregunta de aquí sale de una regla federal o de un dato estatal verificado, así que cubre lo mismo que comprueba el examen del curso. Si las explicaciones le resultan claras, sabe lo que se evalúa.' },
      { q: '¿Qué nota necesito para aprobar el examen del curso?', a: 'Cada curso aprobado fija su propia nota y su regla para repetir, y los estados no publican una cifra única, así que no damos ninguna como oficial. Este examen de práctica marca una meta del 80 % para que vea dónde está. Apunte más alto antes del examen real y lea la explicación de cada pregunta que falle.' },
      { q: '¿El examen es igual en todos los estados?', a: 'La parte federal es la misma en todas partes: Reglas de Navegación, luces, señales sonoras, boyas y equipo. La parte estatal cambia: quién necesita la tarjeta, las edades, las reglas locales de velocidad y estela, las motos acuáticas y el esquí acuático. Por eso el examen pide su estado y mezcla preguntas de su regla verificada.' },
    ],
    body: (h) => {
      const { byTopic, fl } = F(h);
      return `
<h2>Lo que cubre el examen</h2>
${h.table(['Tema', 'Preguntas', 'Texto federal'], [
  ['Preferencia de paso y conducta', byTopic.rules, h.src('navrules', '33 CFR 83, Reglas 5 a 18')],
  ['Señales sonoras', byTopic.sound, h.src('navrules', '33 CFR 83, Reglas 32 a 35')],
  ['Luces de navegación', byTopic.lights, h.src('navrules', '33 CFR 83, Reglas 20 a 31')],
  ['Boyas y marcas', byTopic.aids, h.src('cfr62', '33 CFR 62')],
  ['Equipo obligatorio', byTopic.equipment, `${h.src('cfr175', '33 CFR 175')}, ${h.src('cfr183', '183')}, ${h.src('cfr25', '46 CFR 25')}`],
  ['Ley y seguridad', byTopic.law + byTopic.safety, `${h.src('cfr173', '33 CFR 173')}, ${h.src('cfr95', '95')}`],
  ['Su estado', h.counts.stateQ, 'registros estatales'],
], 'Preguntas del banco de práctica, por tema.', ['l', 'r', 'l'])}
<p>Un examen de 20 saca alrededor de una pregunta de cada cinco del estado elegido, cuando su regla está verificada, y el resto del banco federal. Elija «Reglas de navegación, luces y boyas» o «Equipo, ley y seguridad» en el selector para repasar una mitad.</p>
<h2>Las cuatro reglas que más se fallan</h2>
<p><strong>Cruce.</strong> Cuando dos lanchas se cruzan, la que ve a la otra por su derecha (estribor) cede el paso. Una forma de recordarlo: la embarcación a su derecha le muestra de noche su luz roja de babor, y el rojo significa detenerse o virar.</p>
<p><strong>De frente.</strong> Las dos viran a estribor y se cruzan por babor, como los autos en una carretera. Según las Reglas Interiores, un pitido corto dice «le dejaré por mi babor».</p>
<p><strong>Rojo a la derecha al regresar.</strong> Al volver del mar, las marcas rojas con números pares quedan a su derecha y las verdes con números impares a su izquierda. En un lago o un río que no da al mar, la carta náutica o el estado indican el sentido.</p>
<p><strong>Chalecos.</strong> Un chaleco ponible aprobado por persona, más un arrojadizo en embarcaciones de 16 pies o más; un niño menor de 13 años lo lleva puesto mientras la embarcación está en marcha, según la regla federal, salvo que el estado fije su propia edad.</p>
<h2>Cómo estudiar con él</h2>
<p>Haga un examen completo sin preparar para encontrar sus temas débiles y luego repáselos con el selector. Lea cada explicación, incluso cuando acierte: el examen del curso suele preguntar la misma regla desde otro ángulo. Cuando llegue a 18 de 20 tres veces seguidas, está listo para el examen del curso. En ${h.sl('FL')} el curso se exige a quien nació a partir del ${fl.cutoffL ?? h.nc}; la ${h.a('safety-course', 'página del curso')} indica cómo permite tomarlo cada estado.</p>
<h2>Lo que este examen no es</h2>
<p>No es un curso aprobado y no da derecho a una tarjeta. Para obtenerla, tome un curso aprobado por su estado; la ${h.a('free-license', 'página del curso gratuito')} muestra dónde se acepta uno gratis. Las preguntas las escribimos nosotros; ninguna sale de un examen de curso, del examen de un proveedor ni de un libro.</p>`;
    },
  },
});
