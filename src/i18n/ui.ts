import type { Locale } from './routes';
const en = {
  updatedOn: 'State rules checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'State rules read and practice questions written by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'What boaters ask about this', relatedCalculators: 'Related answers', sourcesTitle: 'Official pages and federal rules behind this page', writtenBy: 'Written by',
  asOf: 'Boating education rules of', lastUpdated: 'read on each state agency page, last checked on',
  footerValidated: 'Each state rule links to the agency page it was read on',
  footerBrowser: 'Checks and tests run in your browser · nothing you type is sent · free, no account, no email, nothing sold',
  footerDisclaimer: 'US Boater Card is an independent site published by Radif Partners. It is not a state boating agency, the US Coast Guard, NASBLA or a course provider, it issues no card and its practice questions are not an official exam. This is general information, not legal advice, and it does not replace the state agency: rules change, so confirm with it before you go out on the water.',
  footerPopular: 'Boating license by state',
  notFound: 'There is no page at this address. The check "do I need a boater card?" for every state is on the home page.',
  readMore: 'Read more', back: 'Home',
  disclaimer: 'General information read on official state and federal pages, not legal advice. The state agency has the last word.',
};
const es: typeof en = {
  updatedOn: 'Reglas estatales revisadas el', editorialPolicy: 'Política editorial', contactLabel: 'Contacto', reviewedBy: 'Reglas estatales leídas y preguntas de práctica escritas por',
  skipToContent: 'Ir al contenido', mainNav: 'Navegación principal', breadcrumbLabel: 'Ruta de navegación', breadcrumbHome: 'Inicio', menuOpen: 'Abrir menú',
  faqTitle: 'Lo que preguntan los navegantes', relatedCalculators: 'Respuestas relacionadas', sourcesTitle: 'Páginas oficiales y reglas federales de esta página', writtenBy: 'Escrito por',
  asOf: 'Reglas de educación náutica de', lastUpdated: 'leídas en la página de cada agencia estatal, última revisión el',
  footerValidated: 'Cada regla estatal enlaza a la página de la agencia donde se leyó',
  footerBrowser: 'Las comprobaciones y exámenes se hacen en su navegador · nada de lo que escribe se envía · gratis, sin cuenta, sin correo, nada a la venta',
  footerDisclaimer: 'Tarjeta Náutica por Estado es un sitio independiente publicado por Radif Partners. No es una agencia náutica estatal, ni la Guardia Costera, ni NASBLA, ni un proveedor de cursos; no emite ninguna tarjeta y sus preguntas de práctica no son un examen oficial. Es información general, no asesoría legal, y no sustituye a la agencia del estado: las reglas cambian, confírmelas con ella antes de salir al agua.',
  footerPopular: 'Licencia de navegación por estado',
  notFound: 'No hay ninguna página en esta dirección. La comprobación «¿necesito la tarjeta náutica?» de cada estado está en la página de inicio.',
  readMore: 'Leer más', back: 'Inicio',
  disclaimer: 'Información general leída en páginas oficiales estatales y federales, no asesoría legal: no sustituye a la agencia del estado, que tiene la última palabra.',
};
export function t(lang: Locale) { return lang === 'es' ? es : en; }
