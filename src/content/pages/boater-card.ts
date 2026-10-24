import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const F = (h: Helpers) => {
  const req = h.where((s) => s.required === true);
  const life = req.filter((s) => s.card.validity === 'lifetime');
  const otherV = req.filter((s) => s.card.validity && s.card.validity !== 'lifetime');
  const names = [...new Set(req.map((s) => s.card.nameEn).filter(Boolean))] as string[];
  const repl = req.filter((s) => s.card.replacementFee != null);
  return { req, life, otherV, names, repl };
};

export default definePage({
  id: 'boater-card',
  group: 'card',
  order: 25,
  tool: { kind: 'mini:cardfee', props: { state: 'TX' } },
  mini: { kind: 'mini:credential', props: { state: 'NJ' } },
  related: ['how-much', 'how-to-get', 'states', 'state-ca', 'state-mi'],
  sources: ['boatus', 'cfr173'],
  en: {
    slug: 'boater-education-card',
    nav: 'Boater education card',
    card: 'What the card is called in each state, what it costs, how long it lasts and how to replace it.',
    title: 'Boater Education Card: Fee, Validity and Replacement',
    description: 'Boater education card by state: its official name, the fee the state charges, whether it lasts for life and what a replacement costs, read on each agency page.',
    h1: 'Boater education card: fee, validity and replacement',
    intro: 'The card goes by many names: certificate, permit, ID card, vessel license. Pick your state to see its name, what the state charges for it and how long it lasts.',
    resume: (h) => {
      const { req, life, otherV, names } = F(h);
      return `A boater education card is the proof that you completed a boating safety course approved by your state. It is not a driver license for the water: in most states it is issued once and does not expire, and it is not tied to a boat. Among the ${req.length} verified states that require boater education, the official page says the credential is valid for life in ${life.length}${otherV.length ? `, and gives a limited validity in ${otherV.length} (${h.list(h.names(otherV))})` : ''}; for the others the page does not say. The name changes from state to state: ${h.list(names.slice(0, 5))}${names.length > 5 ? ' and more' : ''}, which is why searching for a "boating license" can lead to different words for the same thing. The fee is set by each state and paid to the state, separately from the course price. Most states recognize a card from another state when the course was NASBLA-approved. The tool gives the fee, replacement price and validity in your state; the second one gives the official name and the agency that issues it.`;
    },
    faqs: (h) => {
      const { repl } = F(h);
      return [
        { q: 'I lost my boater education card. How do I get a new one?', a: `Contact the agency that issued it or, in some states, the course provider that reported your result: they keep the record. ${repl.length} verified states publish a replacement fee on their official page, shown by the tool above. Have your name, date of birth and the approximate date of your course ready.` },
        { q: 'Is a boater education card the same as boat registration?', a: 'No. The card belongs to the operator and proves education. Registration belongs to the boat: a number shown on both sides of the bow and a certificate kept on board, renewed on the state schedule. You may need both, and one never replaces the other.' },
        { q: 'Do I have to carry the card on the boat?', a: 'States that require the card generally require the operator to have it on board and show it to an officer on request, often with a photo ID. A photo on a phone is accepted only where the state says so; when in doubt, carry the card itself.' },
      ];
    },
    body: (h) => {
      const { req } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.cardL, x.agency, x.validL, x.feeL]; });
      return `
<h2>The card in each state</h2>
${h.table(['State', 'Credential', 'Issued by', 'Valid', 'State fee'], rows, 'Verified states with an education requirement, from the official pages read.', ['l', 'l', 'l', 'l', 'r'])}
<h2>What the card proves, and what it does not</h2>
<p>It proves you passed an approved course, so you know the federal Navigation Rules, the required equipment and your state's law. It does not license the boat, which is registered and numbered separately under ${h.src('cfr173', '33 CFR part 173')}, and it does not allow you to carry paying passengers, which takes a Coast Guard credential. In some states the same credential also sets what a young holder may operate.</p>
<h2>Names that mean the same thing</h2>
<p>Certificate, card, permit, ID card: what matters is that the state issues or recognizes it after an approved course. Alabama is the main exception to the pattern, with a class on the driver license rather than a separate card. The mini-tool shows the name in a state and the agency to contact.</p>
<!--tool:mini:credential|{"state":"MN"}-->
<h2>Visiting another state with your card</h2>
<p>States generally recognize a card from another state when the course was NASBLA-approved, sometimes only for visitors or for a set number of days. A person who moves to a new state can usually keep using a card from such a course, but some states want residents to obtain their own credential. Each state page gives what its agency says about nonresidents.</p>
<h2>Getting one</h2>
<p>The ${h.a('how-to-get', 'four steps')} go from the check to the card, and the ${h.a('how-much', 'cost page')} adds the course price to the state fee. A free approved course exists in most states; see the ${h.a('free-license', 'free course page')}.</p>`;
    },
  },
  es: {
    slug: 'tarjeta-de-educacion-nautica',
    nav: 'Tarjeta de educación náutica',
    card: 'Cómo se llama la tarjeta en cada estado, cuánto cuesta, cuánto dura y cómo reponerla.',
    title: 'Tarjeta de educación náutica: tarifa, validez y duplicado',
    description: 'Tarjeta de educación náutica por estado: su nombre oficial, la tarifa del estado, si vale de por vida y lo que cuesta un duplicado, según cada agencia.',
    h1: 'Tarjeta de educación náutica: tarifa, validez y duplicado',
    intro: 'La tarjeta recibe muchos nombres: certificado, permiso, tarjeta de identificación, licencia de embarcación. Elija su estado para ver su nombre, lo que cobra el estado y cuánto dura.',
    resume: (h) => {
      const { req, life, otherV, names } = F(h);
      return `Una tarjeta de educación náutica es la prueba de que aprobó un curso de seguridad náutica aprobado por su estado. No es una licencia de conducir para el agua: en la mayoría de los estados se emite una vez y no caduca, y no está ligada a una embarcación. Entre los ${req.length} estados verificados que exigen educación náutica, la página oficial dice que el documento vale de por vida en ${life.length}${otherV.length ? `, y da una validez limitada en ${otherV.length} (${h.list(h.names(otherV))})` : ''}; en los demás la página no lo dice. El nombre cambia de un estado a otro (en inglés: ${h.list(names.slice(0, 5))}${names.length > 5 ? ' y otros' : ''}), por eso buscar una «licencia de navegación» puede llevar a palabras distintas para lo mismo. La tarifa la fija cada estado y se paga al estado, aparte del precio del curso. La mayoría de los estados reconocen la tarjeta de otro estado cuando el curso estaba aprobado por NASBLA. La herramienta da la tarifa, el precio del duplicado y la validez en su estado; la segunda da el nombre oficial y la agencia que la emite.`;
    },
    faqs: (h) => {
      const { repl } = F(h);
      return [
        { q: 'Perdí mi tarjeta de educación náutica. ¿Cómo consigo otra?', a: `Contacte a la agencia que la emitió o, en algunos estados, al proveedor del curso que informó su resultado: ellos guardan el registro. ${repl.length} estados verificados publican una tarifa de duplicado en su página oficial, que muestra la herramienta de arriba. Tenga a mano su nombre, fecha de nacimiento y la fecha aproximada de su curso.` },
        { q: '¿La tarjeta de educación náutica es lo mismo que el registro de la embarcación?', a: 'No. La tarjeta es del operador y prueba su formación. El registro es de la embarcación: un número a ambos lados de la proa y un certificado a bordo, renovado según el calendario del estado. Puede necesitar los dos, y uno nunca sustituye al otro.' },
        { q: '¿Tengo que llevar la tarjeta en la embarcación?', a: 'Los estados que exigen la tarjeta piden en general que el operador la lleve a bordo y la muestre a un agente si se la pide, a menudo con una identificación con foto. Una foto en el teléfono solo se acepta donde el estado lo dice; ante la duda, lleve la tarjeta misma.' },
      ];
    },
    body: (h) => {
      const { req } = F(h);
      const rows = req.map((s) => { const x = h.S(s.code); return [h.sl(s.code), x.cardL, x.agency, x.validL, x.feeL]; });
      return `
<h2>La tarjeta en cada estado</h2>
${h.table(['Estado', 'Documento', 'Emitido por', 'Validez', 'Tarifa del estado'], rows, 'Estados verificados con requisito de educación, según las páginas oficiales consultadas.', ['l', 'l', 'l', 'l', 'r'])}
<h2>Lo que prueba la tarjeta, y lo que no</h2>
<p>Prueba que aprobó un curso aprobado, así que conoce las Reglas de Navegación federales, el equipo obligatorio y la ley de su estado. No autoriza la embarcación, que se registra y se numera aparte según el ${h.src('cfr173', '33 CFR parte 173')}, ni permite llevar pasajeros de pago, para lo que hace falta una credencial de la Guardia Costera. En algunos estados el mismo documento fija además lo que puede manejar un joven.</p>
<h2>Nombres que significan lo mismo</h2>
<p>Certificado, tarjeta, permiso, tarjeta de identificación: lo que importa es que el estado lo emita o lo reconozca tras un curso aprobado. Alabama es la principal excepción, con una clase de la licencia de conducir en lugar de una tarjeta aparte. La miniherramienta muestra el nombre en un estado y la agencia a la que dirigirse.</p>
<!--tool:mini:credential|{"state":"MN"}-->
<h2>Visitar otro estado con su tarjeta</h2>
<p>Los estados reconocen en general la tarjeta de otro estado cuando el curso estaba aprobado por NASBLA, a veces solo para visitantes o durante un número de días. Quien se muda a otro estado suele poder seguir usando una tarjeta de ese tipo de curso, pero algunos estados piden a los residentes su propio documento. Cada página de estado indica lo que dice su agencia sobre los no residentes.</p>
<h2>Cómo obtenerla</h2>
<p>Los ${h.a('how-to-get', 'cuatro pasos')} van de la comprobación a la tarjeta, y la ${h.a('how-much', 'página del costo')} suma el precio del curso a la tarifa del estado. En la mayoría de los estados existe un curso gratuito aprobado; vea la ${h.a('free-license', 'página del curso gratuito')}.</p>`;
    },
  },
});
