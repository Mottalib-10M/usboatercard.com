/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://usboatercard.com";
export const SITE_NAMES: Record<string, string> = {"en": "US Boater Card", "es": "Tarjeta Náutica por Estado"};
export const LANG_TAGS: Record<string, string> = {"en": "en-US", "es": "es-US"};
export const OG_LOCALES: Record<string, string> = {"en": "en_US", "es": "es_US"};
export const LOCALE_TAG = 'en-US';
export const CURRENCY = 'USD';
export const YEAR = 2026;
/** Année de création du site, signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-24';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Independent publisher of state-by-state boater education rules, costs and free practice tests for the United States", "es": "Editor independiente de las reglas, costos y exámenes de práctica gratuitos de la educación náutica de cada estado de Estados Unidos"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners reads each state's boating agency page and boating statute, records who needs a boater education card, the birth-date or age cut-off, the horsepower threshold, the minimum ages, the state's own card fee and whether the free BoatUS Foundation course is accepted, each with its official source and the date it was read, and writes its own practice questions from those facts. No account, no paid plan, nothing sold.", "es": "Radif Partners lee la página de la agencia náutica y la ley de cada estado, anota quién necesita la tarjeta de educación náutica, la fecha de nacimiento o la edad que la exige, la potencia a partir de la cual cuenta, las edades mínimas, la tarifa propia del estado y si acepta el curso gratuito de la BoatUS Foundation, cada dato con su fuente oficial y la fecha de lectura, y escribe sus propias preguntas de práctica a partir de esos datos. Sin cuenta, sin plan de pago, nada a la venta."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["State boater education requirements", "Boater education cards and certificates", "Personal watercraft operator age rules", "NASBLA-approved boating safety courses", "Phase-in schedules of state boating laws", "Boating rental exemptions and temporary certificates"], "es": ["Requisitos estatales de educación náutica", "Tarjetas y certificados de educación náutica", "Edades mínimas para motos acuáticas", "Cursos de seguridad náutica aprobados por NASBLA", "Calendarios de entrada en vigor de las leyes náuticas", "Exenciones para alquiler y certificados temporales"]};
export const CONTACT_EMAIL = "contact@usboatercard.com";
export const THEME_COLOR = '#0B5563';
export const LOGO_SYMBOL = 'BC';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '7bb7f062ef09a268e041e8d2c0a90ae4';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE, À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',            // raison sociale ou nom commercial exploité
  legalForm: '',             // ex. entreprise individuelle, SASU, GmbH, eenmanszaak
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "VAT",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];  // forme juridique non publiée, comme sur les autres sites du portefeuille

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
