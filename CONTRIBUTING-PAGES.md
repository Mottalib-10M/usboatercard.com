# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Models: `state-fl.ts` (state page) and
`states.ts` (guide built on the whole state file). The page is built at `/en/<en.slug>/` and, when
`es` is present, at `/es/<es.slug>/`; the hreflang pair, menus, home lists and sitemap follow by
themselves.

## Data

- One record per state in `data/raw/states/<CODE>.json` (schema: `data/raw/SCHEMA-ETAT.md`), each
  value backed by an exact quote from an official page in `sources`. A value not confirmed on an
  official page is `null` and listed in `uncertain`. A state whose core rule is not confirmed has
  `"required": null` and is shown as "not verified yet" everywhere.
- Spanish versions of our own notes (exemptions, fee note, visitors, rentals, minimum-age note,
  credential name): `data/raw/es-notes.json`, keyed by state code.
- `node scripts/update-data.mjs` rebuilds `src/data/states.json` (adds the BoatUS free-course status
  read on boatus.org) and re-reads every official page: a quote that is no longer found is listed
  for a person to re-check. `--offline` rebuilds only. The GitHub workflow
  `.github/workflows/update-data.yml` runs it every month once the repository exists.

## Fields of a page

- `group`: `card` (rules, age, cost), `course` (course and practice test) or `states`.
- `order`: position in its group (guides 1–60, states 100+).
- `state`: two-letter code on a state page; the tools open on that state.
- `tool`: the main tool, right under the H1 (first screen): `{ kind: 'check' }` (do I need a card),
  `{ kind: 'quiz', props: { type: 'full' | 'rules' | 'equipment' } }` or `{ kind: 'mini:<spec>' }`.
- `mini`: a second, smaller tool under the citable block (optional). Specs in `src/lib/mini-specs.ts`:
  `quick`, `credential`, `cardfee`, `online`, `free`, `age`, `pwc`, `cost`, `compare`.
  Props: `{"state":"TX"}`, `{"state":"FL","b":"GA"}` (compare), numbers for number fields
  (`year`, `hp`, `age`, `price`).
- In a body, `<!--tool:mini:quick|{"state":"OH","year":1990,"hp":90}-->` places a tool between paragraphs.
- `related`: 4–6 page ids. Ids that do not exist in a language are skipped.
- `sources`: keys of `src/data/params-2026.json` (`navrules`, `navcen`, `cfr62`, `cfr175`, `cfr173`,
  `cfr183`, `cfr95`, `cfr25`, `ecos`, `usc2303`, `boatus`). A state page adds its agency and every
  official page its record quotes.

## Text rules (checked by `npm run check`)

- `title` 50–60 characters, key term first ("Texas Boating License 2026: …").
- `description` 150–160 characters.
- `resume(h)`: ONE paragraph of at least 130 words answering the page's question with figures from
  the data; shown folded after its first sentence.
- `faqs(h)`: 3–5 questions unique to the page, answers of 40–90 words. Never the same question on
  two pages.
- `body(h)`: HTML with `<h2>` sections, at least 600 words on a guide (tables count), 450 on a state
  page. No `<h1>`.
- No em dash anywhere; American spelling. Spanish: neutral US Spanish ("usted", "manejar", "lancha").
- check-unique fails above 30 % shared sentences between two pages: do not reuse sentence templates.
- Links only to official sources (`.gov`, state agencies, eCFR, GovInfo) and the BoatUS free course
  page where the state approves it. No course vendor, insurer, dealer or affiliate link. Never present
  the site as an agency; no official logo.
- On the site, say what the tool does; never mention Google, "the first result" or any competitor.

## Figures

Never type a state figure: read it through the helpers `h` (`src/lib/helpers.ts`):
`h.S('TX')` gives the record and labels (`nameL`, `cardL`, `whoL`, `cutoff`, `cutoffL`, `hpL`,
`feeL`, `replL`, `validL`, `free`, `freeOk`, `freeL`, `freeUrl`, `motorAgeL`, `pwcAgeL`, `onlineL`,
`proctorL`, `ruleL`, `ex` (exemptions), `n('nonResident' | 'rental' | 'pwcExtra' | 'feeNote' |
'minAgeNote' | 'penalty' | 'phaseIn' | 'hpNote')`, `checkedL`, `verified`), `h.sl(code)` state link,
`h.a(id, text)` internal link, `h.os(code, text, field?)` link to the official page of a figure,
`h.src(key, text)` federal source link, `h.table(headers, rows, caption, align)`, `h.where(fn)`
(verified states matching), `h.names(list)`, `h.list(strings)`, `h.rank(fn, dir)`, `h.m` (money),
`h.nc` ("not confirmed"). A null figure must read naturally: test it and say the agency does not
publish it. Federal facts may be written as text with their source link.
