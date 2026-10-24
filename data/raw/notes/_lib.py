import json,os
D=os.path.join(os.path.dirname(__file__),'..','states')
os.makedirs(D,exist_ok=True)
def S(code,name,es,agency,agencyUrl,required,rule,minAge,exemptions,card,sources,nonResident=None,rental=None,pwcExtra=None,penalty=None,statute=None,uncertain=None):
    base=dict(kind=None,bornOnOrAfter=None,ageMax=None,ageMin=None,hpMin=None,hpNote=None,pwc=None,sailFtMin=None,phaseIn=None,textEn=None,textEs=None)
    base.update(rule)
    c=dict(nameEn=None,stateFee=None,feeNote=None,replacementFee=None,validity=None,inPersonExamRequired=None,onlineAllowed=None); c.update(card)
    m=dict(motorboat=None,pwc=None,note=None); m.update(minAge)
    o=dict(code=code,name=name,es=es,agency=agency,agencyUrl=agencyUrl,required=required,rule=base,minAge=m,exemptions=exemptions,card=c,
      nonResident=nonResident,rental=rental,pwcExtra=pwcExtra,penalty=penalty,statute=statute,
      sources=[dict(url=s[0],publisher=s[1],quote=s[2],supports=s[3]) for s in sources],checked='2026-10-24',uncertain=uncertain or [])
    json.dump(o,open(os.path.join(D,code+'.json'),'w'),ensure_ascii=False,indent=1)
