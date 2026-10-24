# Structured fields the engine needs, derived from the quoted sources (run after the b*.py files).
import json,os,glob
D=os.path.join(os.path.dirname(__file__),'..','states')
HP_INCLUSIVE={'FL','VA'}           # "10 hp or more" / "10 hp or greater"
PHASES={'MN':[{'from':'2025-07-01','bornAfter':'2004-06-30'},{'from':'2026-07-01','bornAfter':'2000-06-30'},{'from':'2027-07-01','bornAfter':'1996-06-30'},{'from':'2028-07-01','bornAfter':'1987-06-30'}],
        'CA':[{'from':'2018-01-01','ageMax':20},{'from':'2019-01-01','ageMax':25},{'from':'2020-01-01','ageMax':35},{'from':'2021-01-01','ageMax':40},{'from':'2022-01-01','ageMax':45},{'from':'2023-01-01','ageMax':50},{'from':'2024-01-01','ageMax':60},{'from':'2025-01-01','ageMax':None}]}
ALT_DL={'IN'}                      # a valid driver license satisfies the rule
for f in glob.glob(os.path.join(D,'*.json')):
    o=json.load(open(f)); c=o['code']; r=o['rule']
    r['hpInclusive']= c in HP_INCLUSIVE
    r['phases']=PHASES.get(c)
    r['altDriverLicense']= c in ALT_DL
    json.dump(o,open(f,'w'),ensure_ascii=False,indent=1)
print('ok')
