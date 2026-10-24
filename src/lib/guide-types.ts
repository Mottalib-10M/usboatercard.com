/**
 * One page = ONE data file in `src/content/pages/<id>.ts`, with an English version and, when it
 * exists, a Spanish one. How to add a page: CONTRIBUTING-PAGES.md at the repository root.
 */
import type { Helpers } from './helpers';

export type Lang = 'en' | 'es';
export type Group = 'card' | 'course' | 'states';
export interface FAQ { q: string; a: string }
/** `check` (do I need a card), `quiz` (practice test) or `mini:<spec>` from `lib/mini-specs.ts`. */
export interface ToolDef { kind: string; props?: Record<string, string | number | boolean> }
export interface PageText {
  slug: string; nav: string; card: string;
  /** 50–60 characters, key term first (RECETTE §11). */
  title: string;
  /** 150–160 characters. */
  description: string;
  h1: string; intro: string;
  /** Citable block, one paragraph of 120 words or more (RECETTE §21). */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  /** HTML; `<!--tool:mini:spec|{"state":"TX"}-->` places a tool in the body. */
  body: (h: Helpers) => string;
}
export interface PageDef {
  id: string; group: Group; order: number;
  /** State code for a state page: the tools open on that state. */
  state?: string;
  tool?: ToolDef; mini?: ToolDef;
  related: string[];
  /** Keys of `data/params-2026.json` sources; a state page adds its agency and every page a figure was read on. */
  sources: string[];
  en: PageText; es?: PageText;
}
export const definePage = (g: PageDef): PageDef => g;
