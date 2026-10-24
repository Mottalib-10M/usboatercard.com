/** llms.txt (RECETTE §21): what the site is, where its figures come from, its main pages. Built from the data. */
import type { APIRoute } from 'astro';
import { PAGES } from '../lib/guides';
import { route } from '../i18n/routes';
import { SITE_URL, LAST_UPDATED } from '../data/site-config';
import { STATES, VERIFIED } from '../lib/engine/states';
import { BANK } from '../lib/engine/quiz';
export const GET: APIRoute = () => {
  const lines = [
    '# US Boater Card',
    '',
    `> Boater education rules of the ${STATES.length} US jurisdictions (50 states and DC), in English and Spanish: who needs a boater education card (birth-date cut-off, age band or everyone, phase-in schedules), the horsepower threshold, the minimum ages to operate alone, the name and validity of the credential, the fee the state charges and whether the free BoatUS Foundation course is accepted. ${VERIFIED.length} jurisdictions verified on their official agency page or statute, last checked ${LAST_UPDATED}; others are shown as not verified. A tool applies the rule to a date of birth, a boat, an engine power and the day of the outing. Free practice test of ${BANK.length} questions written from the federal Navigation Rules and 33 CFR, plus state questions. Published by Radif Partners, an independent publisher; not an agency or a course provider.`,
    '',
    '## Pages (English)',
    `- [Do I need a boater card?](${SITE_URL}${route('home', 'en')}): the check for every state.`,
    ...PAGES.map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`),
    '',
    '## En español',
    `- [¿Necesito la tarjeta náutica?](${SITE_URL}${route('home', 'es')})`,
    ...PAGES.filter((p) => p.es).map((p) => `- [${p.es!.nav}](${SITE_URL}${route(p.id, 'es')}): ${p.es!.card}`),
    '',
    '## Method',
    `- [How each state rule is checked](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
