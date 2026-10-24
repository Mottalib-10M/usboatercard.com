from _lib import S
MN='https://files.dnr.state.mn.us/rlp/regulations/boatwater/boatingguide.pdf'
S('MN','Minnesota','Minnesota','Minnesota Department of Natural Resources',MN,True,
 dict(kind='bornOnOrAfter',bornOnOrAfter='2000-07-01',hpMin=25,hpNote='motor factory-rated over 25 hp (any PWC)',pwc=True,
  phaseIn='Born after June 30, 2004 from July 1, 2025; after June 30, 2000 from July 1, 2026; after June 30, 1996 from July 1, 2027; after June 30, 1987 from July 1, 2028.',
  textEn='Minnesota is phasing in a watercraft operator\'s permit: since July 1, 2026 anyone born after June 30, 2000 needs it for a motorboat over 25 hp or any PWC; the cut-off moves to June 30, 1996 on July 1, 2027 and to June 30, 1987 on July 1, 2028.',
  textEs='Minnesota está ampliando por etapas el permiso de operador: desde el 1 de julio de 2026 lo necesita quien nació después del 30 de junio de 2000 para una lancha de más de 25 hp o cualquier moto acuática; la fecha pasa al 30 de junio de 1996 el 1 de julio de 2027 y al 30 de junio de 1987 el 1 de julio de 2028.'),
 dict(motorboat=12,pwc=12,note='Under 12: motorboats under 75 hp only with an accompanying operator; no PWC even with an adult. Any age may run a motor of 25 hp or less without a permit.'),
 ['Motorboat with a motor factory-rated at 25 hp or less (not a PWC).','Visitors 12-26 holding a valid home-state certificate.'],
 dict(nameEn='Watercraft operator\'s permit',onlineAllowed=True),
 [(MN,'Minnesota DNR, 2026 Boating Guide','Born after the following dates: • June 30, 2004 (effective July 1, 2025) • June 30, 2000 (effective July 1, 2026) • June 30, 1996 (effective July 1, 2027) • June 30, 1987 (effective July 1, 2028)',['rule']),
  (MN,'Minnesota DNR, 2026 Boating Guide','People of any age can operate a motorboat powered by a motor with a factory rating of 25 horsepower or less without a watercraft operator’s permit or an accompanying operator on board.',['rule','exemptions']),
  (MN,'Minnesota DNR, 2026 Boating Guide','Less than 12 years Cannot operate — even with an adult on board.',['minAge']),
  (MN,'Minnesota DNR, 2026 Boating Guide','If you are visiting Minnesota and are between the ages of 12‑26 years and already possess a valid watercraft operator’s certificate/permit issued by your home state, you don’t need to obtain another one from Minnesota.',['nonResident']),
  (MN,'Minnesota DNR, 2026 Boating Guide','Effective July 1, 2025, no one under the age of 18 is able to rent or lease a motorboat, including a personal watercraft.',['rental'])],
 nonResident='Visitors with a valid home-state certificate do not need a Minnesota permit.',rental='Since July 1, 2025 nobody under 18 may rent a motorboat or PWC; renters without a permit take a rental operator exam.',
 uncertain=['card.stateFee','card.validity'])
OR='https://www.oregon.gov/osmb/boater-info/pages/boater-education-cards.aspx'
S('OR','Oregon','Oregón','Oregon State Marine Board',OR,True,
 dict(kind='all',hpMin=10,hpNote='more than 10 hp',pwc=True,textEn='Anyone 16 or older needs a boater education card to run a powerboat (PWC included) over 10 hp; youths 12-15 need it to run any motorboat alone.',textEs='Toda persona de 16 años o más necesita la tarjeta de educación náutica para manejar una lancha (incluidas motos acuáticas) de más de 10 hp; de 12 a 15 años la necesitan para manejar sola cualquier lancha con motor.'),
 dict(note='12-15: up to 10 hp alone; over 10 hp only with a card holder 16+ (18+ for PWC) on board.'),
 ['Current US Coast Guard boat operator license.','Commercial fishing license holders boating recreationally.','Uncertified adult under direct supervision of a card holder 16+ (18+ for PWC).','Renters, after a watercraft rental safety checklist.'],
 dict(nameEn='Oregon Boater Education Card',stateFee=20,replacementFee=16,feeNote='$20 when applying to the Marine Board by mail or online store; course providers may order it for an added fee.',onlineAllowed=True),
 [(OR,'Oregon State Marine Board','A person 16 or older will need a boating education card to operate a powerboat (including a PWC) greater than 10 hp.',['rule']),
  (OR,'Oregon State Marine Board','download an application ​ to print and mail in with a check or money order for $20.',['card.stateFee']),
  (OR,'Oregon State Marine Board','The fee for a replacement boater education card is $16.',['card.replacementFee']),
  (OR,'Oregon State Marine Board','Boat renters are exempt from completing a boater education course prior to renting, but must complete a watercraft rental safety checklist prior to departure.',['rental'])],
 rental='Renters are exempt but must complete a rental safety checklist.',statute='ORS 830.082-830.092',uncertain=['card.validity','nonResident','statute (citation from memory, not re-read)'])
VA='https://dwr.virginia.gov/boating/education/'
S('VA','Virginia','Virginia','Virginia Department of Wildlife Resources',VA,True,
 dict(kind='all',hpMin=10,hpNote='10 hp or more',pwc=True,textEn='Every operator of a motorboat with a 10 hp or larger engine, whatever the age, and every PWC operator must carry a boating safety course card.',textEs='Todo operador de una lancha con motor de 10 hp o más, de cualquier edad, y todo operador de moto acuática debe llevar la tarjeta de un curso de seguridad náutica.'),
 dict(pwc=14,note='No PWC under 14; at 14-15 proof of an approved course (not the challenge exam) is required.'),
 ['US Coast Guard master, captain or mate license.','Virginia registered commercial fisherman.','Qualified military boat operators.','Boat registered in another state whose owner meets the home-state requirement.'],
 dict(nameEn='Boating safety education card (Virginia Lifetime Boater\'s Card available)',onlineAllowed=True),
 [(VA,'Virginia DWR','All PWC operators age 14 and older and all operators (regardless of age) of motorboats with a 10 hp or greater engine need to take a boating safety course.',['rule']),
  (VA,'Virginia DWR','No person under the age of 14 may operate a PWC.',['minAge']),
  (VA,'Virginia DWR','No – If you are operating a boat registered in another state if you meet the applicable boating safety education requirements of your state of residency.',['nonResident'])],
 nonResident='Boats registered in another state: the home-state education rule applies.',uncertain=['card.stateFee','card.validity'])
