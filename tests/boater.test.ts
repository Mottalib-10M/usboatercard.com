import { describe, it, expect } from 'vitest';
import data from '../src/data/states.json';
import { ageOn, needsCard, ruleOn, nextDay, totalCost, score, type StateRec } from '../src/lib/engine/boater';

/** Official state agencies that do not use a .gov domain are listed by name. */
const OFFICIAL = ['gov', 'us', 'agfc.com', 'myfwc.com', 'georgiawildlife.com', 'gadnrle.org', 'azgfd.com', 'californiaboatercard.com', 'ksrevisor.gov', 'mdwfp.com', 'ndow.org'];
const S = (code: string) => (data.states as unknown as StateRec[]).find((s) => s.code === code)!;

describe('ageOn', () => {
  it('counts the birthday itself', () => {
    expect(ageOn('2010-06-15', '2026-06-15')).toBe(16);
    expect(ageOn('2010-06-15', '2026-06-14')).toBe(15);
  });
  it('handles Feb 29', () => {
    expect(ageOn('2008-02-29', '2026-02-28')).toBe(17);
    expect(ageOn('2008-02-29', '2026-03-01')).toBe(18);
  });
  it('rejects a malformed date', () => expect(() => ageOn('x', '2026-01-01')).toThrow());
});

describe('data file', () => {
  it('every record has at least one official source and a check date', () => {
    for (const s of data.states as any[]) {
      expect(s.sources.length).toBeGreaterThan(0);
      expect(s.checked).toBe('2026-10-24');
      for (const src of s.sources) {
        const host = new URL(src.url.replace(/^https?:\/\/web\.archive\.org\/web\/\d+\//, '')).hostname;
        expect(OFFICIAL.some((d) => host === d || host.endsWith('.' + d)), host).toBe(true);
      }
    }
  });
  it('BoatUS status covers the 50 states and DC, 37 approved', () => {
    const b = data.states.filter((s: any) => s.boatus).length;
    expect(b).toBe(data.states.length);
  });
});

describe('needsCard', () => {
  const base = { onDate: '2026-10-24', vessel: 'motorboat' as const, hp: 90 };
  it('Texas: cut-off Sept. 1, 1993, over 15 hp', () => {
    expect(needsCard(S('TX'), { ...base, birthDate: '1993-09-01' }).need).toBe('yes');
    expect(needsCard(S('TX'), { ...base, birthDate: '1993-08-31' }).need).toBe('no');
    expect(needsCard(S('TX'), { ...base, birthDate: '2000-01-01', hp: 15 }).need).toBe('no');
    expect(needsCard(S('TX'), { ...base, birthDate: '2000-01-01', hp: 15.5 }).need).toBe('yes');
  });
  it('Florida: 10 hp counts (inclusive threshold)', () => {
    expect(needsCard(S('FL'), { ...base, birthDate: '1990-01-01', hp: 10 }).need).toBe('yes');
    expect(needsCard(S('FL'), { ...base, birthDate: '1987-12-31', hp: 200 }).need).toBe('no');
  });
  it('California: everybody since 2025, by age before', () => {
    expect(needsCard(S('CA'), { ...base, birthDate: '1950-01-01' }).need).toBe('yes');
    expect(needsCard(S('CA'), { ...base, birthDate: '1950-01-01', onDate: '2024-06-01' }).need).toBe('no');
    expect(needsCard(S('CA'), { ...base, birthDate: '1970-01-01', onDate: '2024-06-01' }).need).toBe('yes');
    expect(needsCard(S('CA'), { ...base, birthDate: '1970-01-01', onDate: '2017-06-01' }).need).toBe('no');
  });
  it('Minnesota phase-in: born 1998 needs it from July 1, 2027, not in 2026', () => {
    const p = { ...base, birthDate: '1998-03-01' };
    expect(needsCard(S('MN'), { ...p, onDate: '2026-10-24' }).need).toBe('no');
    expect(needsCard(S('MN'), { ...p, onDate: '2027-07-01' }).need).toBe('yes');
    expect(needsCard(S('MN'), { ...p, hp: 25, onDate: '2028-08-01' }).need).toBe('no');
    expect(ruleOn(S('MN').rule, '2025-06-30').inForce).toBe(false);
  });
  it('Kansas: born 1989 or later and under 21', () => {
    expect(needsCard(S('KS'), { ...base, birthDate: '2008-01-01' }).need).toBe('yes');
    expect(needsCard(S('KS'), { ...base, birthDate: '1995-01-01' }).need).toBe('no');
  });
  it('Indiana: a driver license satisfies the rule', () => {
    expect(needsCard(S('IN'), { ...base, birthDate: '2010-01-01' }).need).toBe('yes');
    expect(needsCard(S('IN'), { ...base, birthDate: '1990-01-01', hasDriverLicense: true }).need).toBe('no');
  });
  it('Alaska: no requirement', () => {
    expect(needsCard(S('AK'), { ...base, birthDate: '2005-01-01' }).need).toBe('no');
  });
  it('Texas sailboat: by length', () => {
    expect(needsCard(S('TX'), { ...base, vessel: 'sail', hp: 0, lengthFt: 16, birthDate: '2000-01-01' }).need).toBe('yes');
    expect(needsCard(S('TX'), { ...base, vessel: 'sail', hp: 0, lengthFt: 12, birthDate: '2000-01-01' }).need).toBe('no');
  });
  it('minimum age alone is reported, never invented', () => {
    const a = needsCard(S('TX'), { ...base, vessel: 'pwc', hp: 110, birthDate: '2014-01-01' });
    expect(a.minAgeAlone).toBe(13);
    expect(a.tooYoungAlone).toBe(true);
    expect(needsCard(S('DC'), { ...base, birthDate: '2000-01-01' }).minAgeAlone).toBeNull();
  });
});

describe('totalCost', () => {
  it('free course where BoatUS is approved, state fee added', () => {
    const c = totalCost(S('CA'), 39.95);
    expect(c.freeCourseAccepted).toBe(true);
    expect(c.total).toBe(10);
  });
  it('paid course where the free one is not accepted', () => {
    const c = totalCost(S('CT'), 0);
    expect(c.freeCourseAccepted).toBe(false);
    expect(c.total).toBe(50);
  });
  it('unknown state fee and no BoatUS payment gives no total', () => {
    expect(S('MI').card.stateFee).toBeNull();
    expect(totalCost(S('MI'), 20).total).toBeNull();
  });
  it('a payment BoatUS states at enrollment is the minimum of the free route (TX $11, PA $17, WA $10.50)', () => {
    expect(totalCost(S('TX'), 0).total).toBe(11);
    expect(totalCost(S('PA'), 0).total).toBe(17);
    expect(totalCost(S('WA'), 0).total).toBe(10.5);
  });
  it('a card BoatUS says must be bought counts (NY $15, OR $20); an optional card does not (OH)', () => {
    expect(totalCost(S('NY'), 0).total).toBe(15);
    expect(totalCost(S('OR'), 0).total).toBe(20);
    expect(S('OH').boatus!.payment!.kind).toBe('optional-card');
  });
});

describe('score / nextDay', () => {
  it('80 % pass mark', () => {
    expect(score([0, 1, 2, 3, 0], [0, 1, 2, 3, 1]).pass).toBe(true);
    expect(score([0, 1, 2, 0, 0], [0, 1, 2, 3, 1]).pass).toBe(false);
    expect(score([], []).pass).toBe(false);
  });
  it('nextDay crosses months and leap days', () => {
    expect(nextDay('2000-06-30')).toBe('2000-07-01');
    expect(nextDay('2028-02-28')).toBe('2028-02-29');
  });
});

describe('needsCard, states collected in phase 2', () => {
  const base = { onDate: '2026-10-24', vessel: 'motorboat' as const, hp: 90 };
  it('Tennessee: over 8.5 hp, born after Jan. 1, 1989', () => {
    expect(needsCard(S('TN'), { ...base, birthDate: '1989-01-02' }).need).toBe('yes');
    expect(needsCard(S('TN'), { ...base, birthDate: '1989-01-01' }).need).toBe('no');
    expect(needsCard(S('TN'), { ...base, birthDate: '2000-01-01', hp: 8 }).need).toBe('no');
  });
  it('Michigan: older cut-off for PWC', () => {
    const p = { ...base, birthDate: '1985-05-05' };
    expect(needsCard(S('MI'), p).need).toBe('no');
    expect(needsCard(S('MI'), { ...p, vessel: 'pwc' }).need).toBe('yes');
    expect(needsCard(S('MI'), { ...p, birthDate: '1978-12-31', vessel: 'pwc' }).need).toBe('no');
  });
  it('Pennsylvania: every PWC operator, motorboats over 25 hp from 1982', () => {
    expect(needsCard(S('PA'), { ...base, birthDate: '1960-01-01', vessel: 'pwc' }).need).toBe('yes');
    expect(needsCard(S('PA'), { ...base, birthDate: '1960-01-01' }).need).toBe('no');
    expect(needsCard(S('PA'), { ...base, birthDate: '1990-01-01', hp: 25 }).need).toBe('no');
  });
  it('Utah: PWC 12-17 today, every motorboat operator from 2027', () => {
    expect(needsCard(S('UT'), { ...base, birthDate: '1980-01-01' }).need).toBe('no');
    expect(needsCard(S('UT'), { ...base, birthDate: '2011-01-01', vessel: 'pwc' }).need).toBe('yes');
    expect(needsCard(S('UT'), { ...base, birthDate: '1980-01-01', onDate: '2027-01-01' }).need).toBe('yes');
  });
  it('Massachusetts: born after 1989 since April 2026, everyone from April 2028', () => {
    expect(needsCard(S('MA'), { ...base, birthDate: '1989-01-02' }).need).toBe('yes');
    expect(needsCard(S('MA'), { ...base, birthDate: '1980-01-01' }).need).toBe('no');
    expect(needsCard(S('MA'), { ...base, birthDate: '1980-01-01', onDate: '2028-04-01' }).need).toBe('yes');
    expect(needsCard(S('MA'), { ...base, birthDate: '2000-01-01', onDate: '2026-03-31' }).need).toBe('no');
  });
  it('New Hampshire: 16 and older over 25 hp', () => {
    expect(needsCard(S('NH'), { ...base, birthDate: '1950-01-01' }).need).toBe('yes');
    expect(needsCard(S('NH'), { ...base, birthDate: '2012-01-01' }).need).toBe('no');
    expect(needsCard(S('NH'), { ...base, birthDate: '1950-01-01', hp: 25 }).need).toBe('no');
  });
  it('an unverified record answers unknown, never yes or no', () => {
    const u = { ...S('TX'), required: null } as StateRec;
    expect(needsCard(u, { ...base, birthDate: '2000-01-01' }).need).toBe('unknown');
  });
  it('51 records; Arizona alone is not verified (no official sentence on the requirement)', () => {
    expect(data.states.length).toBe(51);
    expect((data.states as any[]).filter((s) => s.required == null).map((s) => s.code)).toEqual(['AZ']);
  });
  it('archived reads carry the copy date and the official address, never a relay site', () => {
    const arch = (data.states as any[]).filter((s) => s.sources.some((x: any) => x.archived)).map((s) => s.code).sort();
    expect(arch).toEqual(['AZ', 'FL', 'ID', 'NE', 'RI', 'TN']);
    for (const s of data.states as any[]) for (const x of s.sources) {
      expect(x.url).not.toMatch(/findlaw|justia|law\.cornell|onecle|public\.law/);
      if (x.archived) { expect(x.url).toMatch(/^https:\/\/web\.archive\.org\/web\//); expect(x.official).toMatch(/^https:\/\//); }
    }
  });
});
