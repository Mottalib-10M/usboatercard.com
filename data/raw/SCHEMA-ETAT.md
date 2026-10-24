# One file per jurisdiction: raw/states/<CODE>.json (CODE = 2-letter USPS code, DC for District of Columbia)

{
  "code": "TX",
  "name": "Texas",
  "es": "Texas",
  "agency": "Texas Parks and Wildlife Department",
  "agencyUrl": "https://tpwd.texas.gov/...",          // the official page that states the education rule
  "required": true,                                     // does ANY mandatory boater education requirement exist for recreational operators (not court-ordered only)?
  "rule": {
    "kind": "bornOnOrAfter" | "all" | "ageBand" | "pwcOnly" | "none" | "mixed",
    "bornOnOrAfter": "1993-09-01" | null,               // requirement applies to people born on/after this date
    "ageMax": null | 17,                                // requirement applies only to people aged <= ageMax (ageBand)
    "ageMin": null | 12,                                // requirement applies only from this age (ageBand)
    "hpMin": 15 | null,                                 // requirement applies only to motors strictly above / at least this hp (say which in hpNote)
    "hpNote": "more than 15 hp",
    "pwc": true,                                        // requirement applies to PWC operators
    "sailFtMin": 14 | null,                             // windblown vessels of this length or more
    "phaseIn": null | "text",                           // phase-in schedule if the state is mid-phase-in (e.g. NY Brianna's Law, CA by age)
    "textEn": "Anyone born on or after Sept. 1, 1993 who operates a motorboat over 15 hp, a PWC or a sailboat 14 ft or longer.",  // OUR words
    "textEs": "..."
  },
  "minAge": {                                           // minimum ages to operate ALONE (null when the official page gives none)
    "motorboat": 13 | null, "pwc": 13 | null, "note": "short note in our words"
  },
  "exemptions": ["short items in our words: e.g. 'supervised by a qualified adult 18+ on board'", "..."],
  "card": {
    "nameEn": "Boater Education Certificate",          // name of the credential as the state calls it
    "stateFee": 0 | 10 | null,                          // fee charged BY THE STATE for the card/certificate (USD), null if not stated
    "feeNote": "e.g. card issued free by TPWD; course providers set their own price; replacement $X",
    "replacementFee": null | 10,
    "validity": "lifetime" | "N years" | null,
    "inPersonExamRequired": false | true,               // e.g. NJ requires a proctored exam
    "onlineAllowed": true | false | null
  },
  "nonResident": "short note: accepts NASBLA-approved certificates from other states? visitor grace period? (our words)" | null,
  "rental": "short note: temporary/rental certificate or livery checklist exemption (our words)" | null,
  "pwcExtra": "short note on PWC-specific rules (age, hours) if stated" | null,
  "penalty": "fine for operating without the card, only if stated on an official page" | null,
  "statute": "e.g. Tex. Parks & Wild. Code §31.109" | null,
  "sources": [
    { "url": "https://...", "publisher": "Texas Parks and Wildlife Department", "quote": "exact short quote that supports the rule/age/fee", "supports": ["rule","minAge","card.stateFee"] }
  ],
  "checked": "2026-10-24",
  "uncertain": ["list any field you could not confirm on an official page; leave that field null"]
}

Rules: only official sources (state agency .gov / .us pages, state legislature statute text, state administrative code). A vendor (boat-ed, boaterexam, boatsmart, aceboater), insurer, blog or law firm is NEVER a source. Every non-null value must be supported by a quote in "sources". If not confirmed: null + listed in "uncertain". All texts (textEn, notes) are written in our own words, never copied. Today is 2026-10-24: watch for 2025-2026 changes (California all ages since 2025-01-01, New York all motorboat operators since 2025-01-01 under Brianna's Law, Alabama, etc.).
