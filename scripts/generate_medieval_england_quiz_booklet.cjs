/**
 * generate_medieval_england_quiz_booklet.cjs
 *
 * Compiles the 8-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 7): Medieval England (1066–1485).
 *
 * Page Architecture (8-Page Saddle-Stitch Booklet / 2 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 * - Pages 2–6: 5 Dedicated Lesson Retrieval Pages (Enquiries 1 to 5 • 8 questions each = 40 questions total)
 * - Page 7: Department Marking Bank (Part 1 • Enquiries 1–3 • Q1–Q20)
 * - Page 8: Department Marking Bank (Part 2 • Enquiries 3–5 • Q21–Q40) + DIRT Feedback Box
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'medieval_england');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}
if (!fs.existsSync(UNIT_DIR)) {
  fs.mkdirSync(UNIT_DIR, { recursive: true });
}

// Base64 image helper for 100% offline self-contained HTML/PDF rendering
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'images', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

// --------------------------------------------------------------------------
// 40 RIGOROUS QUESTIONS ACROSS 5 ENQUIRIES: 3-TIER COGNITIVE ASCENT
// Tier 1 (Q1–Q3): Core Substantive Recall & Chronology (▸)
// Tier 2 (Q4–Q6): Causal Mechanisms & Historical Dynamics (▸▸)
// Tier 3 (Q7–Q8): Synoptic Significance, Precedent & High-Stretch (▸▸▸)
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  // LESSON 1: 1066 & The Battle of Hastings
  {
    lesson: 1,
    lessonTitle: '1. 1066 & The Battle of Hastings',
    shortTitle: '1066 & Battle of Hastings',
    enquiry: 'Why did William of Normandy win the Battle of Hastings in 1066?',
    items: [
      {
        q: 'In what year did King Edward the Confessor die without leaving a direct heir?',
        a: '1066 (5 January 1066)',
        exp: 'Edward the Confessor’s death on 5 January 1066 triggered an immediate three-way succession crisis for the English throne.',
      },
      {
        q: 'Who did the Anglo-Saxon Witan (council of nobles) choose to succeed Edward as King of England?',
        a: 'Harold Godwinson, Earl of Wessex',
        exp: 'Harold was crowned King Harold II the day after Edward died, claiming Edward had promised him the throne on his deathbed.',
      },
      {
        q: 'At which battle in Yorkshire did King Harold defeat Viking invader Harald Hardrada in September 1066?',
        a: 'The Battle of Stamford Bridge',
        exp: 'Harold surprised the Viking invaders on 25 September 1066, killing Hardrada and crushing the last major Norse invasion of England.',
      },
      {
        q: 'Why did King Harold’s victory at Stamford Bridge dangerously weaken his army for the Battle of Hastings?',
        a: 'His army suffered heavy casualties and had to march 200 miles south in just two weeks to confront William',
        exp: 'Harold’s elite housecarls were depleted, and his fyrd peasant levies were exhausted by the 400-mile round trip before facing fresh Norman cavalry.',
      },
      {
        q: 'What defensive formation did the Anglo-Saxons form atop Senlac Hill that Norman cavalry repeatedly failed to break?',
        a: 'The shield wall',
        exp: 'The housecarls and fyrd locked their heavy wooden shields together along the ridge, creating an impenetrable barrier against Norman arrows and horses.',
      },
      {
        q: 'How did the Normans use the tactic of the ‘feigned retreat’ to break the Anglo-Saxon shield wall?',
        a: 'Norman cavalry pretended to flee downhill, tricking undisciplined Saxons into breaking ranks to pursue them',
        exp: 'When Saxon fyrdmen charged down the hill chasing the retreating Normans, Norman cavalry wheeled around and encircled them on open ground.',
      },
      {
        q: 'Why was Duke William’s combined-arms army superior to King Harold’s traditional Anglo-Saxon forces?',
        a: 'William combined heavy cavalry with stirrups, archers, and infantry, whereas Harold relied solely on a stationary infantry shield wall',
        exp: 'Norman tactical flexibility and archers firing high into the air forced the Saxons to look up, exposing them to cavalry charges and fatal arrow wounds.',
      },
      {
        q: 'How did contemporary Norman chronicler William of Poitiers interpret the collapse of the Saxon shield wall?',
        a: 'As divine punishment for Harold’s broken sacred oath to support William’s claim to the throne',
        exp: 'Norman propaganda claimed Harold was a perjurer who swore holy relics at Bayeux, justifying William’s conquest as God’s providential judgement.',
      },
    ],
  },

  // LESSON 2: Castles, Terror & Domesday
  {
    lesson: 2,
    lessonTitle: '2. Castles, Terror & Domesday',
    shortTitle: 'Castles, Terror & Domesday',
    enquiry: 'How did the Normans subjugate England and enforce total royal control?',
    items: [
      {
        q: 'What type of rapid, pre-fabricated castles did William build across England to intimidate Saxon populations?',
        a: 'Motte-and-bailey castles',
        exp: 'Using earth mounds (mottes) and wooden palisades (baileys), Norman garrisons could erect a fortress within eight to ten days.',
      },
      {
        q: 'What brutal scorched-earth campaign did William conduct in 1069–1070 to crush northern rebellion?',
        a: 'The Harrying of the North',
        exp: 'William ordered crops burned, livestock slaughtered, and fields salted across Yorkshire and the north, causing over 100,000 people to starve.',
      },
      {
        q: 'In what year was the exhaustive national audit known as the Domesday Book completed?',
        a: '1086',
        exp: 'Commissioned by William at Gloucester in 1085, Domesday recorded every manor, ox, mill, and woodland across England to maximize tax revenue.',
      },
      {
        q: 'Why was the Norman keep at Portchester Castle constructed inside an ancient Roman shore fort?',
        a: 'To exploit 1,700-year-old Roman stone walls and command the deep-water sea approaches to Portsmouth Harbour',
        exp: 'Portchester provided a secure military landing and embarkation port between England and Normandy, combining Roman defense with Norman power.',
      },
      {
        q: 'How did the Norman feudal system completely replace the Anglo-Saxon ruling aristocracy?',
        a: 'All land was declared property of the King, who redistributed it to around 200 Norman tenants-in-chief in exchange for military service',
        exp: "Over 4,000 Anglo-Saxon thegns were dispossessed by 1086, reducing English landowners to less than 5% of the kingdom's soil.",
      },
      {
        q: 'Why did Anglo-Saxons name William’s comprehensive land and tax survey the ‘Domesday Book’?',
        a: 'Because its legal verdicts were final and unchangeable, like the Day of Judgement (Doomsday)',
        exp: 'No appeal was permitted against the commissioners’ written records, symbolising the inescapable judicial power of the Norman Crown.',
      },
      {
        q: 'How does chronicler Orderic Vitalis’s account of the Harrying of the North challenge Norman triumphalism?',
        a: 'Although half-Norman himself, Vitalis condemned William’s barbarous slaughter and predicted God would avenge the innocent victims',
        exp: 'Vitalis wrote that William’s brutal starvation of women and children was a sin that no earthly crown or military glory could excuse.',
      },
      {
        q: 'What do local Domesday entries for Portchester, Fareham, and Titchfield reveal about the social impact of the Conquest?',
        a: "They record English landholders being demoted to sub-tenants or displaced entirely by Norman lords like William d'Arques",
        exp: 'Local manorial records provide forensic proof that the Conquest was not a peaceful transition but a total redistribution of wealth and power.',
      },
    ],
  },

  // LESSON 3: Crown vs Church: Henry II & Thomas Becket
  {
    lesson: 3,
    lessonTitle: '3. Crown vs Church: Henry II & Thomas Becket',
    shortTitle: 'Crown vs Church: Becket',
    enquiry: 'Why did Henry II clash with Thomas Becket, and who triumphed?',
    items: [
      {
        q: 'What high government position did Thomas Becket hold before Henry II appointed him Archbishop of Canterbury?',
        a: 'Lord Chancellor of England',
        exp: 'Becket was Henry’s closest friend, lavish companion, and chief advisor, helping the king rebuild royal finances and enforce crown law.',
      },
      {
        q: 'What term described priests or churchmen accused of serious secular crimes such as murder or robbery?',
        a: 'Criminous clerks',
        exp: "In the 12th century, roughly one-sixth of England's male population claimed clerical status to escape royal hanging in secular courts.",
      },
      {
        q: 'What 1164 royal document attempted to bring church courts and criminous clerks under royal jurisdiction?',
        a: 'The Constitutions of Clarendon',
        exp: 'Henry II demanded that clerks accused of felony be tried in royal courts and, if guilty, stripped of holy orders and punished by royal judges.',
      },
      {
        q: 'Why did Becket violently oppose the Constitutions of Clarendon after becoming Archbishop?',
        a: 'He believed in canon law and argued that punishing a clerk in a secular court violated God’s law by punishing a man twice for one offence',
        exp: 'Becket’s sudden spiritual transformation led him to defend the total autonomy of the Catholic Church against secular royal intrusion.',
      },
      {
        q: 'What words did Henry II famously shout in anger that prompted four knights to ride to Canterbury?',
        a: '‘Will no one rid me of this turbulent priest?’ (or words to that effect)',
        exp: 'Henry’s furious outburst at his Christmas court in Bures led Reginald FitzUrse and three fellow knights to travel across the Channel to assassinate Becket.',
      },
      {
        q: 'On what date was Thomas Becket murdered inside Canterbury Cathedral?',
        a: '29 December 1170',
        exp: 'The four knights confronted Becket in the cathedral, drawing swords and hacking him to death at the altar when he refused to lift his excommunications.',
      },
      {
        q: 'How did Becket’s murder transform European public opinion and weaken King Henry II’s power?',
        a: 'Becket was instantly revered as a martyr and canonised as a saint in 1173, forcing Henry to abandon the Constitutions of Clarendon',
        exp: 'Christendom was horrified by cathedral bloodshed; pilgrims flocked to Becket’s shrine, and Henry was forced to perform public barefoot penance.',
      },
      {
        q: 'Why did Henry II allow eighty Canterbury monks to whip him with rods during his 1174 penance?',
        a: 'To prove his sincere remorse to the Pope, secure absolution, and rally divine support during a dangerous rebellion by his sons',
        exp: 'Facing simultaneous invasions by the Scots, the French king, and his own rebel sons, Henry used dramatic religious submission to restore royal legitimacy.',
      },
    ],
  },

  // LESSON 4: Magna Carta (1215) & Medieval Kingship
  {
    lesson: 4,
    lessonTitle: '4. Magna Carta (1215) & Medieval Kingship',
    shortTitle: 'Magna Carta & Kingship',
    enquiry: 'Was Magna Carta a foundation of human liberty or a selfish barons’ power grab?',
    items: [
      {
        q: 'What insulting nickname did King John earn after losing Normandy and Anjou to King Philip Augustus of France?',
        a: '‘John Lackland’ or ‘John Softsword’',
        exp: 'By 1204, John had lost almost all the ancestral continental territories built up by his father Henry II and brother Richard the Lionheart.',
      },
      {
        q: 'What feudal tax paid by barons in place of providing military knights did King John raise eleven times in sixteen years?',
        a: 'Scutage (‘shield money’)',
        exp: 'John used aggressive scutage extortion and exorbitant inheritance fines (‘reliefs’) to fund his ruinously expensive French military campaigns.',
      },
      {
        q: 'At which decisive 1214 battle in Flanders was King John’s allied army crushed by the French King Philip Augustus?',
        a: 'The Battle of Bouvines',
        exp: 'Bouvines ended John’s hopes of reconquering Normandy, emptied the English treasury, and convinced the English barons that the King was militarily incompetent.',
      },
      {
        q: 'Where and on what date did King John meet rebel barons to grant and seal Magna Carta?',
        a: 'At Runnymede on 15 June 1215',
        exp: 'Surrounded by rebel barons calling themselves the ‘Army of God’, John met them in the water-meadows of Runnymede beside the River Thames.',
      },
      {
        q: 'What fundamental legal principle did Clause 39 of Magna Carta establish?',
        a: 'That no free man could be seized, imprisoned, or stripped of possessions except by the lawful judgment of his equals or by the law of the land',
        exp: 'Clause 39 established the Rule of Law: the revolutionary precedent that even the king was subject to legal due process and could not act arbitrarily.',
      },
      {
        q: 'Why did Pope Innocent III annul Magna Carta just two months after it was sealed?',
        a: 'He declared it illegal and shameful because it had been extracted from an anointed king by armed coercion and rebellion',
        exp: 'Having previously allied with John, the Pope released the king from his oath, plunging England immediately into the First Barons’ War.',
      },
      {
        q: 'Why do modern historians debate whether Magna Carta was a declaration of universal human rights or a selfish barons’ charter?',
        a: 'Because in 1215 it protected only the narrow privileges of ‘free men’ (barons and churchmen), while 80% of the population were unfree serfs',
        exp: 'Serfs and villeins gained no personal liberty from the 1215 charter; however, its legal principles were reinterpreted across centuries into universal civil rights.',
      },
      {
        q: 'How did Simon de Montfort’s 1265 Parliament build upon the constitutional legacy of Magna Carta?',
        a: 'It summoned two elected knights from every shire and two burgesses from every borough, establishing the foundation of the House of Commons',
        exp: 'De Montfort expanded political representation beyond the great barons, linking parliamentary taxation to wider popular representation.',
      },
    ],
  },

  // LESSON 5: The Black Death (1348) & The Peasants’ Revolt (1381)
  {
    lesson: 5,
    lessonTitle: '5. The Black Death (1348) & The Peasants’ Revolt (1381)',
    shortTitle: 'Black Death & Peasants’ Revolt',
    enquiry: 'How did demographic catastrophe and peasant rebellion shatter the feudal order?',
    items: [
      {
        q: 'What bacterium was responsible for the pandemic known to history as the Black Death?',
        a: 'Yersinia pestis',
        exp: 'Carried by oriental rat fleas living on black rats, Yersinia pestis attacked lymph nodes to cause bubonic plague, or lungs to cause pneumonic plague.',
      },
      {
        q: 'In what English port did the Black Death first arrive in the summer of 1348?',
        a: 'Melcombe Regis (Weymouth), Dorset',
        exp: 'A ship arriving from Gascony brought infected sailors and fleas ashore in June 1348, rapidly spreading infection across the kingdom.',
      },
      {
        q: 'Approximately what percentage of the English population died during the 1348–1350 Black Death?',
        a: 'Between 35% and 50% (roughly 1.5 to 2.5 million people)',
        exp: 'Whole villages were abandoned, crops rotted in untilled fields, and parish clergy died in vast numbers administering last rites.',
      },
      {
        q: 'Why did the demographic collapse caused by the Black Death dramatically shift economic power toward surviving peasants?',
        a: 'The acute labour shortage meant landowners had to compete for workers by paying higher cash wages and lowering rents',
        exp: 'For the first time in medieval history, serfs and labourers could negotiate higher pay or walk away to neighboring manors desperate for harvest workers.',
      },
      {
        q: 'What 1351 parliamentary law attempted to freeze peasant wages at pre-plague (1346) levels and punish fleeing workers?',
        a: 'The Statute of Labourers',
        exp: 'Passed by land-owning MPs, the statute imposed fines, imprisonment, and even branding with a hot iron ‘F’ (for Falsity) on peasants demanding wage rises.',
      },
      {
        q: 'What regressive tax levied in 1377, 1379, and 1381 sparked the outbreak of the Peasants’ Revolt?',
        a: 'The Poll Tax (head tax)',
        exp: 'To pay for the Hundred Years’ War against France, Parliament taxed every person over fourteen equally, forcing poor peasants to pay the same as wealthy lords.',
      },
      {
        q: 'How did radical priest John Ball’s preaching challenge the entire medieval feudal hierarchy?',
        a: 'He argued that God created all men equal, asking: ‘When Adam delved and Eve span, who was then the gentleman?’',
        exp: 'Ball attacked the divine right of lords to hold men in bondage, demanding the abolition of serfdom, equal wealth distribution, and church land confiscation.',
      },
      {
        q: 'Why was the Peasants’ Revolt a turning point even though Wat Tyler was murdered and its leaders executed?',
        a: 'Parliament never dared to pass another poll tax, and landlords were forced to gradually commute serfdom into free wage labour',
        exp: 'Although Richard II crushed the rebels, fear of renewed peasant uprising prevented landowners from enforcing feudal servitude, leading to the extinction of serfdom.',
      },
    ],
  },
];

function getPipBadge(idx) {
  if (idx < 3) {
    return '<span class="pip-badge pip-emerald" title="Tier 1: Core Substantive Recall">&#9658;</span>';
  } else if (idx < 6) {
    return '<span class="pip-badge pip-amber" title="Tier 2: Causal Mechanism">&#9658;&#9658;</span>';
  } else {
    return '<span class="pip-badge pip-crimson" title="Tier 3: Synoptic Significance">&#9658;&#9658;&#9658;</span>';
  }
}

// --------------------------------------------------------------------------
// CSS STYLING FOR A5 SADDLE-STITCH BOOKLET
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  *, *:before, *:after { box-sizing: border-box; }
  @page {
    size: A5 portrait;
    margin: 6mm 8mm;
  }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 8.0pt;
    line-height: 1.25;
    color: #000000;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }
  .a5-page {
    width: 100%;
    height: 198mm;
    max-height: 198mm;
    overflow: hidden;
    position: relative;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    box-sizing: border-box;
  }
  .a5-page:last-child {
    page-break-after: auto;
  }
  .page-flex-full {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Micro Pips */
  .pip-badge {
    font-size: 6.2pt;
    letter-spacing: -0.5px;
    font-weight: 900;
  }
  .pip-emerald { color: #047857; }
  .pip-amber { color: #b45309; }
  .pip-crimson { color: #b91c1c; }

  /* Page Headers and Footers */
  .page-header-strip {
    border-bottom: 2px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-compact {
    padding-bottom: 1.5px;
    margin-bottom: 2px;
  }
  .page-header-strip h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 9.5pt;
    margin: 0;
    font-weight: 800;
    color: #000000;
    line-height: 1.15;
  }
  .page-header-strip p {
    font-size: 6.8pt;
    color: #000000;
    margin: 0.5px 0 0 0;
    font-style: italic;
    font-weight: 600;
  }
  .page-tag {
    font-size: 6.6pt;
    font-weight: 800;
    text-transform: uppercase;
    border: 1px solid #000000;
    padding: 1px 4.5px;
    border-radius: 2px;
    color: #000000;
    background: #f1f5f9;
    white-space: nowrap;
  }
  .page-footer-strip {
    border-top: 1px solid #000000;
    padding-top: 1.5px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-size: 6.2pt;
    color: #000000;
    font-weight: 600;
  }

  /* FRONT COVER SPECIFIC STYLES */
  .cover-banner {
    background: #000000;
    color: #ffffff;
    padding: 5px 8px;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.8pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  /* Commercial School Cover Customizer */
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target {
    display: inline-block;
    font-size: 0;
  }
  [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]) .school-brand-target::after {
    content: attr(data-department-name);
    font-size: 6.8pt;
  }
  .cover-header-block {
    text-align: center;
    padding: 7px 6px 6px 6px;
    background: #f8fafc;
    border-left: 1.2px solid #000000;
    border-right: 1.2px solid #000000;
  }
  .cover-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 11.8pt;
    font-weight: 800;
    color: #000000;
    line-height: 1.15;
    margin: 0 0 2px 0;
  }
  .cover-subtitle {
    font-size: 7.2pt;
    font-weight: 700;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0;
  }

  /* Pupil Box */
  .pupil-box {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-top: none;
    padding: 7px 8px;
    font-size: 7.2pt;
    color: #000000;
  }
  .pupil-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1.5fr;
    gap: 10px;
    align-items: center;
  }
  .pupil-field {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .pupil-field span.lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
  }
  .pupil-field span.line {
    border-bottom: 1.2px solid #000000;
    flex: 1;
    min-height: 12px;
  }

  /* Cover Portrait Container */
  .cover-map-container {
    margin: 3px 0 3px 0;
    text-align: center;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 4px;
    padding: 3px 6px;
  }
  .cover-map-frame {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-height: 56.5mm;
  }
  .cover-map-img {
    max-height: 56.5mm;
    max-width: 100%;
    object-fit: contain;
    border: 1.2px solid #000000;
    border-radius: 2px;
  }
  .cover-map-caption {
    font-size: 5.6pt;
    color: #000000;
    margin-top: 1.5px;
    font-style: italic;
    font-weight: 600;
  }

  /* Tracking Ledger */
  .ledger-container {
    margin-top: 3px;
  }
  .tracking-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.4pt;
    background: #ffffff;
    color: #000000;
  }
  .tracking-table th {
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    padding: 3.5px 3px;
    border: 1px solid #000000;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    text-align: center;
  }
  .tracking-table td {
    border: 1px solid #000000;
    padding: 6.0px 3.5px;
    text-align: center;
    vertical-align: middle;
    color: #000000;
  }
  .tracking-table td.left-title {
    text-align: left;
    color: #000000;
  }
  .tb-lesson-title {
    font-weight: 800;
    font-size: 6.6pt;
    color: #000000;
    line-height: 1.15;
  }
  .tb-lesson-enquiry {
    font-size: 5.4pt;
    color: #000000;
    font-style: italic;
    line-height: 1.15;
    margin-top: 0.5px;
  }
  .score-line {
    display: inline-block;
    width: 14px;
    border-bottom: 1.2px solid #000000;
  }
  .retrieval-vertical {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 6px;
    gap: 2.5px;
    font-size: 5.4pt;
    line-height: 1.15;
    color: #000000;
    font-weight: 700;
  }
  .parent-sig-cell {
    padding: 2px 4px;
    vertical-align: middle;
    text-align: center;
  }

  /* Page 1: 3-Tier Traffic Light Mastery Rule (DIRT Loop) */
  .mastery-traffic-strip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 2.5px 6px;
    margin-top: 2.5px;
    margin-bottom: 2.5px;
    font-size: 5.8pt;
    line-height: 1.15;
    color: #000000;
    font-weight: 600;
  }
  .traffic-tier {
    display: flex;
    align-items: center;
    gap: 3.5px;
    color: #000000;
  }
  .traffic-dot {
    font-size: 7pt;
    line-height: 1;
  }
  .green-dot { color: #16a34a; }
  .amber-dot { color: #d97706; }
  .red-dot { color: #dc2626; }

  /* QR Strip */
  .qr-strip {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 4px;
    padding: 3px 6px;
    gap: 8px;
    margin-top: 2.5px;
    margin-bottom: 1.5px;
    color: #000000;
  }
  .qr-code-img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }
  .qr-caption-text {
    font-size: 6.0pt;
    color: #000000;
    line-height: 1.15;
    text-align: left;
    font-weight: 700;
  }

  /* Pages 2–6: Dedicated Question Page Layout */
  .q-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 2px;
  }
  .q-block {
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 3px;
    padding: 3.5px 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 8.8pt;
    line-height: 1.16;
  }
  .q-num-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 17px;
    flex-shrink: 0;
    line-height: 1;
    padding-top: 0.5px;
  }
  .q-num {
    font-weight: 800;
    color: #000000;
    font-size: 8.8pt;
    line-height: 1.1;
  }
  .q-pips {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    line-height: 1;
  }
  .q-prompt {
    font-weight: 700;
    color: #000000;
    font-size: 8.8pt;
    line-height: 1.16;
    flex: 1;
  }
  .q-line-row {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    font-size: 7.6pt;
    margin-top: 1px;
  }
  .q-line-lbl {
    font-weight: 800;
    color: #000000;
    white-space: nowrap;
    font-size: 7.6pt;
    min-width: 44px;
  }
  .q-solid-line {
    flex: 1;
    border-bottom: 1.2px solid #000000;
    min-height: 18px;
  }

  /* Pages 7 & 8: Marking Bank */
  .mb-section-title {
    background: #f1f5f9;
    border-left: 3.5px solid #000000;
    border-top: 1px solid #000000;
    border-right: 1px solid #000000;
    border-bottom: 1px solid #000000;
    padding: 1px 4.5px;
    font-size: 6.3pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
    margin: 1px 0 1px 0;
  }
  .mb-section-title:first-child { margin-top: 0; }
  .mb-container {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex: 1;
    justify-content: space-between;
  }
  .ans-card {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    font-size: 6.3pt;
    line-height: 1.15;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 1px 4.5px;
    color: #000000;
  }
  .ans-num-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 14px;
    flex-shrink: 0;
    line-height: 1;
    padding-top: 0.5px;
  }
  .ans-num {
    font-weight: 800;
    color: #000000;
    font-size: 6.6pt;
    line-height: 1.1;
  }
  .ans-pip {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    line-height: 1;
  }
  .ans-pip .pip-badge {
    font-size: 5.6pt;
    letter-spacing: -1px;
  }
  .ans-content {
    flex: 1;
    color: #000000;
  }
  .ans-core {
    font-weight: 800;
    color: #000000;
    font-size: 6.6pt;
  }
  .ans-exp {
    color: #000000 !important;
    font-weight: 600 !important;
    font-style: normal !important;
    font-size: 6.3pt;
  }
  .dirt-box {
    margin-top: 2px;
    border: 1.2px solid #000000;
    background: #ffffff;
    padding: 3px 5px;
  }
  .dirt-title {
    font-weight: 900;
    font-size: 6.8pt;
    text-transform: uppercase;
    color: #000000;
    margin-bottom: 1.5px;
    display: flex;
    justify-content: space-between;
  }
  .dirt-lines {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .dirt-line {
    border-bottom: 1.2px solid #000000;
    height: 1.5px;
  }
`;

// --------------------------------------------------------------------------
// MAIN COMPILATION SCRIPT
// --------------------------------------------------------------------------
async function compileQuizBookletHtml() {
  const qrUrl = 'https://the-history-revision-hub.netlify.app/?unit=medieval_england&view=quizzes';
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  });

  const coverImgBase64 =
    getBase64Image('images/battle_of_hastings_bayeux.jpg') ||
    getBase64Image('public/images/battle_of_hastings_bayeux.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Medieval England (1066–1485) Knowledge Retrieval Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    ${A5_BOOKLET_CSS}
  </style>
</head>
<body>
`;

  // ========================================================================
  // PAGE 1: FRONT COVER & FORMATIVE RETRIEVAL TRACKING LEDGER
  // ========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div>
      <div class="cover-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span>
        <span>Key Stage 3 &bull; Year 7 History</span>
      </div>
      <div class="cover-header-block">
        <h1 class="cover-title">Medieval England: 1066–1485</h1>
        <p class="cover-subtitle">Knowledge Retrieval &bull; Formative Tracking &bull; Homework Companion &bull; 40 Questions</p>
      </div>
      <div class="pupil-box">
        <div class="pupil-grid">
          <div class="pupil-field"><span class="lbl">Pupil Name:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Class:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Teacher:</span><span class="line"></span></div>
        </div>
      </div>
    </div>

    <!-- Centerpiece Historical Evidence -->
    <div class="cover-map-container">
      <div class="cover-map-frame">
        <img src="${coverImgBase64}" class="cover-map-img" alt="The Bayeux Tapestry &bull; Battle of Hastings" />
      </div>
      <div class="cover-map-caption">
        Primary Visual Evidence: <em>The Death of King Harold at Hastings</em> (Bayeux Tapestry, c. 1070s &bull; Bayeux Museum)
      </div>
    </div>

    <!-- Tracking Ledger Table -->
    <div class="ledger-container">
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 44%;">Unit Enquiry Sequence</th>
            <th style="width: 8%;">Att. 1</th>
            <th style="width: 8%;">Att. 2</th>
            <th style="width: 24%;">Retrieval Strength</th>
            <th style="width: 16%; font-size: 5.6pt; letter-spacing: -0.2px; white-space: nowrap;">Parent Initials</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (item) => `
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">Enquiry ${item.lesson}: ${item.shortTitle}</div>
              <div class="tb-lesson-enquiry">${item.enquiry}</div>
            </td>
            <td><span class="score-line"></span> / 8</td>
            <td><span class="score-line"></span> / 8</td>
            <td>
              <div class="retrieval-vertical">
                <div>[ ] Instant</div>
                <div>[ ] Effortful</div>
                <div>[ ] Restudy</div>
              </div>
            </td>
            <td class="parent-sig-cell"></td>
          </tr>`,
          ).join('')}
        </tbody>
      </table>
    </div>

    <!-- 3-Tier Traffic Light Mastery Rule (DIRT Loop) -->
    <div class="mastery-traffic-strip">
      <div class="traffic-tier">
        <span class="traffic-dot green-dot">&#9679;</span>
        <strong>7–8/8 Mastered:</strong> Secure factual recall.
      </div>
      <div class="traffic-tier">
        <span class="traffic-dot amber-dot">&#9679;</span>
        <strong>5–6/8 Consolidate:</strong> Flashcard restudy on missed terms.
      </div>
      <div class="traffic-tier">
        <span class="traffic-dot red-dot">&#9679;</span>
        <strong>&lt;5/8 Action Required:</strong> Mandatory re-test after DIRT corrections.
      </div>
    </div>

    <!-- Interactive Portal QR Code -->
    <div class="qr-strip">
      <img src="${qrDataUrl}" alt="Digital Portal QR" class="qr-code-img">
      <div class="qr-caption-text">
        <strong>Scan for Interactive Digital Quizzes & Audio Lessons:</strong><br>
        Access online self-marking retrieval flashcards, diagnostic feedback, and audio narration at <strong>the-history-revision-hub.netlify.app</strong>.
      </div>
    </div>

    <div class="page-footer-strip">
      <span><strong>The History Department</strong> &bull; Key Stage 3 History</span>
      <span>Page 1 of 8</span>
    </div>
  </div>
`;

  // ========================================================================
  // PAGES 2–6: 5 DEDICATED ENQUIRY RETRIEVAL PAGES (8 QUESTIONS EACH)
  // ========================================================================
  let globalQNum = 1;
  QUIZ_DATA.forEach((lessonData, lIdx) => {
    const pageNum = lIdx + 2;
    html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip">
      <div>
        <h2>Enquiry ${lessonData.lesson}: ${lessonData.shortTitle}</h2>
        <p>${lessonData.enquiry}</p>
      </div>
      <span class="page-tag">Questions ${globalQNum}–${globalQNum + 7}</span>
    </div>

    <div class="q-container">
      ${lessonData.items
        .map((item, itemIdx) => {
          const currentNum = globalQNum++;
          const pipBadge = getPipBadge(itemIdx);
          return `
      <div class="q-block">
        <div class="q-header">
          <div class="q-num-box">
            <span class="q-num">${currentNum}.</span>
            <span class="q-pips">${pipBadge}</span>
          </div>
          <span class="q-prompt">${item.q}</span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Answer:</span>
          <span class="q-solid-line"></span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Detail:</span>
          <span class="q-solid-line"></span>
        </div>
      </div>`;
        })
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span>Enquiry ${lessonData.lesson}: ${lessonData.shortTitle}</span>
      <span>Page ${pageNum} of 8</span>
    </div>
  </div>
`;
  });

  // ========================================================================
  // PAGE 7: DEPARTMENT MARKING BANK (PART 1 • ENQUIRIES 1–3 • Q1–Q20)
  // Exactly 20 Questions evenly distributed across Page 7 (Zero spillover)
  // ========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip page-header-compact">
      <h2>Department Marking Bank &bull; Part 1: Enquiries 1–3 (Q1–Q20)</h2>
    </div>

    <div class="mb-container">
      <div class="mb-section-title">Enquiry 1: 1066 & The Battle of Hastings (Q1–Q8)</div>
      ${QUIZ_DATA[0].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 1}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Enquiry 2: Castles, Terror & Domesday (Q9–Q16)</div>
      ${QUIZ_DATA[1].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 9}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Enquiry 3: Crown vs Church: Becket (Q17–Q20)</div>
      ${QUIZ_DATA[2].items
        .slice(0, 4)
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 17}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span>Medieval England: 1066–1485</span>
      <span>Marking Bank Part 1 &bull; Page 7 of 8</span>
    </div>
  </div>
`;

  // ========================================================================
  // PAGE 8: DEPARTMENT MARKING BANK (PART 2 • ENQUIRIES 3–5 • Q21–Q40) + DIRT
  // Exactly 20 Questions evenly distributed across Page 8 + DIRT Feedback Box
  // ========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip page-header-compact">
      <h2>Department Marking Bank &bull; Part 2: Enquiries 3–5 (Q21–Q40)</h2>
    </div>

    <div class="mb-container">
      <div class="mb-section-title">Enquiry 3: Crown vs Church: Becket (Q21–Q24)</div>
      ${QUIZ_DATA[2].items
        .slice(4, 8)
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 21}.</span>
          <span class="ans-pip">${getPipBadge(i + 4)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Enquiry 4: Magna Carta & Medieval Kingship (Q25–Q32)</div>
      ${QUIZ_DATA[3].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 25}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}

      <div class="mb-section-title">Enquiry 5: The Black Death & Peasants' Revolt (Q33–Q40)</div>
      ${QUIZ_DATA[4].items
        .map(
          (item, i) => `
      <div class="ans-card">
        <div class="ans-num-box">
          <span class="ans-num">${i + 33}.</span>
          <span class="ans-pip">${getPipBadge(i)}</span>
        </div>
        <div class="ans-content">
          <span class="ans-core">${item.a}</span> &mdash;
          <span class="ans-exp">${item.exp}</span>
        </div>
      </div>`,
        )
        .join('')}
    </div>

    <!-- DIRT Feedback & Self-Correction Protocol Box -->
    <div class="dirt-box">
      <div class="dirt-title">
        <span>DIRT Feedback &bull; Dedicated Improvement &amp; Reflection Time</span>
        <span>Target Score: &ge;32 / 40</span>
      </div>
      <div style="font-size: 5.8pt; margin-bottom: 2px; color: #000000; line-height: 1.15;">
        Review any questions answered incorrectly. Write out the corrected historical fact and causal explanation below:
      </div>
      <div class="dirt-lines">
        <div class="dirt-line"></div>
        <div class="dirt-line"></div>
        <div class="dirt-line"></div>
        <div class="dirt-line"></div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span>Medieval England: 1066–1485</span>
      <span>Marking Bank Part 2 &bull; Page 8 of 8</span>
    </div>
  </div>
`;

  html += `
</body>
</html>`;

  return html;
}

async function run() {
  console.log('=============================================================');
  console.log('📖 COMPILING MEDIEVAL ENGLAND 8-PAGE QUIZ BOOKLET');
  console.log('=============================================================\n');

  const htmlContent = await compileQuizBookletHtml();
  const htmlPath = path.join(UNIT_DIR, 'quiz_pack.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Written HTML Booklet: ${htmlPath}`);

  console.log('🚀 Launching Puppeteer for PDF export and space budget audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Space Budget & Overflow Audit
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a5-page');
    const pageData = [];
    pages.forEach((p, idx) => {
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH - clientH;
      pageData.push({
        pageNum: idx + 1,
        scrollH,
        clientH,
        overflow: overflow > 1 ? overflow : 0,
      });
    });
    return pageData;
  });

  console.log('--- A5 Page Budget Telemetry ---');
  let hasOverflow = false;
  auditResults.forEach((res) => {
    if (res.overflow > 0) {
      console.error(
        `❌ PAGE ${res.pageNum}: OVERFLOW DETECTED (+${res.overflow}px) [scroll: ${res.scrollH}px, client: ${res.clientH}px]`,
      );
      hasOverflow = true;
    } else {
      console.log(
        `✅ Page ${res.pageNum}: Perfect Fit (Budget: ${res.clientH}px / Used: ${res.scrollH}px)`,
      );
    }
  });

  if (hasOverflow) {
    await browser.close();
    throw new Error(
      'Compilation halted: One or more pages exceeded the strict A5 printable budget.',
    );
  }

  const pdfPath = path.join(PDFS_DIR, 'medieval_england_quiz_pack.pdf');
  const pdfCompanionPath = path.join(PDFS_DIR, 'medieval_england_8p_companion.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A5',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  // Also write 8p companion alias
  fs.copyFileSync(pdfPath, pdfCompanionPath);

  await browser.close();
  console.log(`\n🎉 PDF Compiled successfully: ${pdfPath}`);
  console.log(`🎉 8P Companion PDF alias compiled: ${pdfCompanionPath}`);
}

run().catch((err) => {
  console.error('Fatal compilation error:', err);
  process.exit(1);
});
