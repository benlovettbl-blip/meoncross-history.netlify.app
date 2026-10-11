/**
 * generate_great_war_quiz_booklet.cjs
 *
 * Compiles the 8-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 9): Causes of the Great War (1871–1914).
 *
 * Page Architecture (8-Page Saddle-Stitch Booklet / 2 sheets A4 landscape folded in half):
 * - Page 1: Uniform Front Cover & Formative Homework & Retrieval Tracking Ledger
 *           (Scholar box, Attempt 1 vs 2 scores, Retrieval Strength [ ] Instant [ ] Effortful [ ] Restudy,
 *           Roomy Parent Initial box, QR code to interactive portal, Subtle Cognitive Progression Key)
 * - Pages 2–6: 5 Dedicated Enquiry Retrieval Pages (Enquiries 1 to 5 • 8 questions each = 40 questions total)
 *              Scaffolded on the 3-Tier Cognitive Ascent with Disciplinary Micro-Pips:
 *              • Q1–Q3 (▸): Substantive Anchor Knowledge & Chronology (Emerald)
 *              • Q4–Q6 (▸▸): Causal Mechanisms & Historical Context (Amber)
 *              • Q7–Q8 (▸▸▸): Synoptic Significance & Disciplinary Precedent (Crimson)
 *              Featuring 2 roomy write-in lines per question with strong #000000 black typography:
 *              Line 1: Answer: [Core Fact]
 *              Line 2: Detail / Why: [Historical Mechanism or Consequence]
 * - Page 7: Department Marking Bank (Part 1 • Enquiries 1–3 • Q1–Q20 • Bold answers + Explanations)
 * - Page 8: Department Marking Bank (Part 2 • Enquiries 3–5 • Q21–Q40 • Bold answers + Explanations)
 *           100% vertical space dedicated to answer cards (Zero DIRT box).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'great_war');
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
  // ENQUIRY 1: German Unification, Franco-Prussian War & Bismarck (1871–1890)
  {
    lesson: 1,
    lessonTitle: '1. German Unification, Franco-Prussian War & Bismarck (1871–1890)',
    shortTitle: 'German Unification & Revanche',
    enquiry: 'How did German unification and the Franco-Prussian War divide Europe?',
    items: [
      {
        q: 'How many independent states existed in Central Europe before German unification?',
        a: '39 independent states',
        exp: 'Prior to 1871, the German states were loosely connected in the German Confederation, dominated by Prussia and Austria.',
      },
      {
        q: 'Which powerful military kingdom united the German states under Berlin?',
        a: 'Prussia',
        exp: 'Prussia used its disciplined military, rail network, and industrial steel power to lead the unification of Germany.',
      },
      {
        q: 'Which French border territory was seized by Germany following the Franco-Prussian War in 1871?',
        a: 'Alsace-Lorraine',
        exp: 'Germany annexed this mineral-rich border province, creating an enduring French national desire to reclaim it.',
      },
      {
        q: 'What was the French national desire for vengeance against Germany called?',
        a: 'Revanche (Revanchism)',
        exp: 'French school maps, veiled in black, and politicians kept the loss of Alsace-Lorraine alive as an open wound.',
      },
      {
        q: 'How did Chancellor Otto von Bismarck use "Blood and Iron" to unite Germany?',
        a: 'Through three short, victorious wars and military power rather than democratic speeches',
        exp: 'Bismarck believed grand historical questions were decided by pragmatic military strength (Realpolitik).',
      },
      {
        q: 'Why was a "war on two fronts" Germany’s greatest strategic nightmare?',
        a: 'It risked being attacked simultaneously by France in the west and Russia in the east',
        exp: 'Germany feared its army would be split in two, leading Bismarck to build alliances to keep Russia neutral.',
      },
      {
        q: 'Why did Kaiser Wilhelm II’s dismissal of Bismarck in 1890 trigger a European diplomatic crisis?',
        a: 'He abandoned Bismarck’s cautious diplomacy and let the Reinsurance Treaty with Russia lapse',
        exp: 'Dropping the treaty left Russia isolated, prompting the Tsar to sign a military alliance with France in 1894.',
      },
      {
        q: 'How did the creation of the German Empire in 1871 permanently shift the European balance of power?',
        a: 'It placed a colossal, unified industrial and military giant in the geographic centre of Europe',
        exp: 'The new empire replaced fractured, weak states with an economic powerhouse that rivalled Britain and alarmed France.',
      },
    ],
  },

  // ENQUIRY 2: Imperial Rivalry & the Moroccan Crises (1884–1911)
  {
    lesson: 2,
    lessonTitle: '2. Imperial Rivalry & the Moroccan Crises (1884–1911)',
    shortTitle: 'Imperial Rivalry & Morocco',
    enquiry: 'How did imperial ambition in Africa bring European powers to the brink of war?',
    items: [
      {
        q: 'What term describes the rapid colonisation and partition of Africa by European powers (1881–1914)?',
        a: 'The Scramble for Africa',
        exp: 'European empires took control of 90% of the African continent to secure raw materials, prestige, and trade markets.',
      },
      {
        q: 'Which 1884–85 conference laid down international rules for claiming African territory?',
        a: 'The Berlin Conference',
        exp: 'Hosted by Bismarck, it required powers to prove "effective occupation" before claiming colonies to prevent war.',
      },
      {
        q: 'What famous phrase did Kaiser Wilhelm II use to demand a German global empire?',
        a: 'A "place in the sun" (Platz an der Sonne)',
        exp: 'Wilhelm II argued that Germany’s rapid industrial growth entitled it to an overseas colonial empire equal to Britain’s.',
      },
      {
        q: 'What was Kaiser Wilhelm II’s aggressive global foreign policy called?',
        a: 'Weltpolitik ("World Policy")',
        exp: 'Weltpolitik abandoned continental defence in favour of overseas expansion, colonial acquisitions, and naval buildup.',
      },
      {
        q: 'Why did Kaiser Wilhelm II land at Tangier in 1905 to trigger the First Moroccan Crisis?',
        a: 'To challenge French influence in North Africa and test the strength of the Anglo-French Entente',
        exp: 'Wilhelm hoped to humiliate France and drive a wedge between Britain and France, but his tactic backfired completely.',
      },
      {
        q: 'Why did Germany send the gunboat SMS Panther to Agadir during the 1911 Moroccan Crisis?',
        a: 'To use "gunboat diplomacy" to force France into handing over colonial territory in the Congo',
        exp: 'Germany demanded French land in exchange for accepting French control over Morocco, alarming Britain.',
      },
      {
        q: 'Why did the two Moroccan Crises ironically strengthen rather than weaken the Anglo-French alliance?',
        a: 'German bullying convinced Britain that Germany was a dangerous rogue state, prompting joint military talks',
        exp: 'Rather than splitting Britain and France, the crises led to secret naval agreements and unified diplomatic resistance.',
      },
      {
        q: 'To what extent did imperial rivalry in Africa make a general European war more likely?',
        a: 'It convinced German leaders they were encircled by hostile rivals and normalised armed brinkmanship',
        exp: 'Repeated colonial confrontations conditioned European publics to expect war and deepened military planning.',
      },
    ],
  },

  // ENQUIRY 3: The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)
  {
    lesson: 3,
    lessonTitle: '3. The Anglo-German Naval Arms Race & HMS Dreadnought (1898–1914)',
    shortTitle: 'Naval Arms Race & Dreadnought',
    enquiry: 'Why did a battleship building contest destroy Anglo-German relations?',
    items: [
      {
        q: 'Which revolutionary, all-big-gun British battleship was launched in 1906?',
        a: 'HMS Dreadnought',
        exp: 'Dreadnought carried ten 12-inch guns and turbine engines, rendering all existing battleships instantly obsolete.',
      },
      {
        q: 'Which German Admiral directed the rapid expansion of the German High Seas Fleet?',
        a: 'Admiral Alfred von Tirpitz',
        exp: 'Tirpitz passed the German Naval Laws (1898/1900) to build a navy capable of confronting Britain in the North Sea.',
      },
      {
        q: 'What long-standing British naval policy required its fleet to equal the next two navies combined?',
        a: 'The Two-Power Standard',
        exp: 'Britain considered unquestioned naval mastery essential to guard its worldwide trade routes and island food supply.',
      },
      {
        q: 'Why was naval supremacy a matter of national survival for Great Britain?',
        a: 'As an island empire, Britain relied on maritime trade for raw materials and to feed its population',
        exp: 'A hostile blockade would starve Britain within months, making any threat to the North Sea intolerable.',
      },
      {
        q: 'What was Admiral Tirpitz’s "Risk Theory" (Risikotheorie)?',
        a: 'Building a fleet strong enough that fighting Germany would cripple Britain’s global supremacy',
        exp: 'Tirpitz calculated that fear of naval damage would force Britain to make diplomatic and colonial concessions.',
      },
      {
        q: 'What popular slogan was chanted in Britain in 1909 demanding more battleships?',
        a: '“We want eight and we won’t wait!”',
        exp: 'Public alarm over secret German shipbuilding forced the British government to double its naval construction budget.',
      },
      {
        q: 'Why did the launch of HMS Dreadnought ironically endanger Britain’s established naval supremacy?',
        a: 'It wiped out Britain’s enormous numerical lead in older pre-dreadnoughts, resetting the race to zero',
        exp: 'By making existing warships obsolete, Germany could compete on equal terms by building only new dreadnoughts.',
      },
      {
        q: 'How did the naval arms race permanently damage relations between Britain and Germany?',
        a: 'It turned friendly trading partners into suspicious military rivals and drove Britain toward France and Russia',
        exp: 'German naval expansion convinced British statesmen that Germany aimed to dominate Europe by military force.',
      },
    ],
  },

  // ENQUIRY 4: The Alliance Systems & the Balkan Powder Keg (1882–1913)
  {
    lesson: 4,
    lessonTitle: '4. The Alliance Systems & the Balkan Powder Keg (1882–1913)',
    shortTitle: 'Alliances & Balkan Powder Keg',
    enquiry:
      'Did European military alliances protect peace or guarantee a continental catastrophe?',
    items: [
      {
        q: 'Which three empires made up the Triple Alliance signed in 1882?',
        a: 'Germany, Austria-Hungary, and Italy',
        exp: 'The members promised mutual military assistance if attacked by two or more rival great powers.',
      },
      {
        q: 'Which three nations united into the rival Triple Entente by 1907?',
        a: 'Great Britain, France, and Russia',
        exp: 'Agreements between France, Russia, and Britain settled past disputes and formed a defensive diplomatic counterweight.',
      },
      {
        q: 'What mountainous region of south-eastern Europe was known as the "Powder Keg of Europe"?',
        a: 'The Balkans',
        exp: 'Ethnic nationalism, crumbling Ottoman rule, and great power rivalry made the Balkans extremely volatile.',
      },
      {
        q: 'Why did the decline of the Ottoman Empire create dangerous tension in the Balkans?',
        a: 'It left a power vacuum that Austria-Hungary and Russia both competed to dominate',
        exp: 'Both empires sought influence over newly independent Balkan states and control of the Black Sea straits.',
      },
      {
        q: 'Why was Serbia furious when Austria-Hungary annexed Bosnia-Herzegovina in 1908?',
        a: 'Bosnia contained a large Slavic population that Serbia wanted to unite into an independent South Slav state',
        exp: 'The annexation frustrated Serbian nationalist dreams of creating a united "Greater Serbia".',
      },
      {
        q: 'Why did Russia feel an ideological duty to support Serbia in Balkan disputes?',
        a: 'Russia viewed itself as the natural protector of fellow Slavic and Orthodox Christian peoples',
        exp: 'Russian "Pan-Slavism" and the desire for warm-water Mediterranean access drove its alliance with Serbia.',
      },
      {
        q: 'Why was the Bosnian Crisis of 1908 a fatal rehearsal for the outbreak of war in 1914?',
        a: 'Russia was forced to back down under German threats, vowing never to retreat in the Balkans again',
        exp: 'The humiliation accelerated Russian military rearmament and ensured Russia would mobilise if Serbia was threatened.',
      },
      {
        q: 'How did the European alliance system turn a local Balkan confrontation into a world war?',
        a: 'It chained the great powers together so that an attack on one ally triggered mandatory mobilization of all',
        exp: 'The treaties transformed a local conflict between Austria and Serbia into an uncontrollable continental domino effect.',
      },
    ],
  },

  // ENQUIRY 5: The July Crisis: Sarajevo to the Outbreak of War (June–August 1914)
  {
    lesson: 5,
    lessonTitle: '5. The July Crisis: Sarajevo to the Outbreak of War (June–August 1914)',
    shortTitle: 'Sarajevo & The July Crisis',
    enquiry: 'Why did a single assassination in Sarajevo ignite the First World War?',
    items: [
      {
        q: 'Who was assassinated in Sarajevo on 28 June 1914?',
        a: 'Archduke Franz Ferdinand (heir to the Austro-Hungarian throne)',
        exp: 'His assassination during an official inspection tour provided the immediate catalyst for the outbreak of war.',
      },
      {
        q: 'What was the name of the 19-year-old Bosnian Serb student who fired the fatal shots?',
        a: 'Gavrilo Princip',
        exp: 'Princip was a member of Young Bosnia, trained and armed by the Serbian nationalist secret society, the Black Hand.',
      },
      {
        q: 'What secret nationalist military society provided the weapons and cyanide for the assassins?',
        a: 'The Black Hand (Unity or Death)',
        exp: 'Led by Serbian military intelligence officer Dragutin Dimitrijević ("Apis"), the group aimed to liberate South Slavs.',
      },
      {
        q: 'What unconditional pledge of military backing did Germany give Austria-Hungary on 5 July 1914?',
        a: 'The "Blank Cheque"',
        exp: 'Kaiser Wilhelm II promised German military support even if Austrian action against Serbia triggered war with Russia.',
      },
      {
        q: 'Why did Austria-Hungary issue Serbia with a harsh 10-point ultimatum on 23 July 1914?',
        a: 'To provide a pretext for military invasion and permanently crush Serbian independence',
        exp: 'Austrian leaders drafted demands so humiliating that they expected Serbia to reject them, justifying war.',
      },
      {
        q: 'What German military operational plan aimed to defeat France in six weeks before turning to face Russia?',
        a: 'The Schlieffen Plan',
        exp: 'The plan relied on invading neutral Belgium to bypass French border fortresses and encircle Paris rapidly.',
      },
      {
        q: 'Why did the German invasion of Belgium directly cause Great Britain to enter the war?',
        a: 'Britain had guaranteed Belgian neutrality in the 1839 Treaty of London and could not accept hostile ports on the Channel',
        exp: 'When Germany refused to respect Belgian neutrality, Britain delivered an ultimatum and declared war on 4 August 1914.',
      },
      {
        q: 'Was the outbreak of war in 1914 caused primarily by imperial militarism or the rigid mechanics of military mobilisation?',
        a: 'A fatal combination of calculated risk-taking by leaders and inflexible rail mobilisation timetables',
        exp: 'Once Tsar Nicholas II ordered general mobilisation, German war plans left zero time for diplomatic negotiation.',
      },
    ],
  },
];

// Helper to render micro-pips (Tier 1: ▸, Tier 2: ▸▸, Tier 3: ▸▸▸)
function getPipBadge(itemIdx) {
  if (itemIdx < 3) {
    return '<span class="pip-badge pip-t1" title="Tier 1: Substantive Recall">&#9658;</span>';
  } else if (itemIdx < 6) {
    return '<span class="pip-badge pip-t2" title="Tier 2: Causal Mechanism">&#9658;&#9658;</span>';
  } else {
    return '<span class="pip-badge pip-t3" title="Tier 3: Synoptic Significance">&#9658;&#9658;&#9658;</span>';
  }
}

// --------------------------------------------------------------------------
// STRICT A5 PRINT CSS SYSTEM (Monarchy Gold Standard Reference)
// --------------------------------------------------------------------------
const A5_BOOKLET_CSS = `
  @page {
    size: A5 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #000000;
    background: #ffffff;
    font-size: 8.8pt;
    line-height: 1.25;
  }
  .a5-page {
    width: 148mm;
    height: 210mm;
    padding: 8.5mm 9.5mm 7.5mm 9.5mm;
    margin: 0 auto;
    page-break-after: always;
    break-after: page;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media screen {
    body {
      background: #475569;
      padding: 20px 0;
    }
    .a5-page {
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
      margin-bottom: 25px;
    }
  }

  /* Utility classes */
  .page-flex-full {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  /* Headers and Footers */
  .page-header-strip {
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 2.5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .page-header-compact {
    padding-bottom: 1.5px;
    margin-bottom: 1.5px;
  }
  .page-header-strip h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 10.2pt;
    font-weight: 800;
    margin: 0;
    color: #000000;
    line-height: 1.1;
  }
  .page-header-strip p {
    margin: 1px 0 0 0;
    font-size: 6.8pt;
    color: #000000;
    font-weight: 600;
  }
  .page-tag {
    font-size: 6.5pt;
    font-weight: 800;
    background: #000000;
    color: #ffffff;
    padding: 2.5px 6px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }
  .page-footer-strip {
    font-size: 6.8pt;
    color: #000000;
    border-top: 1.2px solid #000000;
    padding-top: 2px;
    margin-top: 2px;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }

  /* Cover Page Styling (Page 1) */
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

  /* Page 1: 3-Tier Traffic Light Mastery Rule */
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
  .pip-badge {
    font-size: 6.2pt;
    line-height: 1;
    letter-spacing: -0.5px;
  }
  .pip-t1 { color: #16a34a; }
  .pip-t2 { color: #d97706; }
  .pip-t3 { color: #dc2626; }

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
`;

// --------------------------------------------------------------------------
// MAIN COMPILATION SCRIPT
// --------------------------------------------------------------------------
async function compileQuizBookletHtml() {
  const qrUrl = 'https://the-history-revision-hub.netlify.app/?unit=great_war&view=quizzes';
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  });

  const coverImgData =
    getBase64Image('images/great_war_cover.jpg') ||
    getBase64Image('public/images/great_war_cover.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Causes of the Great War (1871–1914) Knowledge Retrieval Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    ${A5_BOOKLET_CSS}
  </style>
</head>
<body>
`;

  // ==========================================================================
  // PAGE 1: FRONT COVER & TRACKING LEDGER
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div>
      <div class="cover-banner" data-department-name="The History Department">
        <span class="school-brand-target">The History Department</span>
        <span>Key Stage 3 • Year 9 History</span>
      </div>
      <div class="cover-header-block">
        <h1 class="cover-title">Causes of the Great War (1871–1914)</h1>
        <p class="cover-subtitle">Knowledge Retrieval & Homework Companion &bull; 40 Questions</p>
      </div>
      <div class="pupil-box">
        <div class="pupil-grid">
          <div class="pupil-field"><span class="lbl">Pupil Name:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Class:</span><span class="line"></span></div>
          <div class="pupil-field"><span class="lbl">Teacher:</span><span class="line"></span></div>
        </div>
      </div>
    </div>

    <!-- Centerpiece Source -->
    <div class="cover-map-container">
      <div class="cover-map-frame">
        ${
          coverImgData
            ? `<img src="${coverImgData}" alt="HMS Dreadnought at sea" class="cover-map-img">`
            : `<div style="padding: 10px; font-weight: bold; color: #000000;">HMS Dreadnought at Sea (1906)</div>`
        }
      </div>
      <div class="cover-map-caption">
        The Royal Navy battleship HMS Dreadnought (c. 1906–1907) • Revolutionary steam turbine propulsion and ten 12-inch guns triggered the Anglo-German naval arms race.
      </div>
    </div>

    <!-- Homework & Retrieval Tracking Table -->
    <div class="ledger-container">
      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 32%;">Lesson Unit</th>
            <th style="width: 14%;">Att 1 Score</th>
            <th style="width: 14%;">Att 2 Score</th>
            <th style="width: 24%;">Retrieval Strength</th>
            <th style="width: 16%; font-size: 5.6pt; letter-spacing: -0.2px; white-space: nowrap;">Parent Initials</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (l) => `
          <tr>
            <td class="left-title">
              <div class="tb-lesson-title">Enquiry ${l.lesson}: ${l.shortTitle}</div>
              <div class="tb-lesson-enquiry">${l.enquiry}</div>
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

    <!-- 3-Tier Traffic Light Mastery Rule (DIRT Loop) & Micro-Pip Guide -->
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

  // ==========================================================================
  // PAGES 2–6: 5 DEDICATED ENQUIRY RETRIEVAL PAGES (8 Questions Each)
  // ==========================================================================
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

  // ==========================================================================
  // PAGE 7: DEPARTMENT MARKING BANK (PART 1 • ENQUIRIES 1–3 • Q1–Q20)
  // 20 Questions evenly distributed across Page 7 (Zero spillover, generous spacing)
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip page-header-compact">
      <h2>Department Marking Bank &bull; Part 1: Enquiries 1–3 (Q1–Q20)</h2>
    </div>

    <div class="mb-container">
      <div class="mb-section-title">Enquiry 1: German Unification & Revanche (Q1–Q8)</div>
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

      <div class="mb-section-title">Enquiry 2: Imperial Rivalry & Morocco (Q9–Q16)</div>
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

      <div class="mb-section-title">Enquiry 3: Naval Arms Race & Dreadnought (Q17–Q20)</div>
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
      <span>Causes of the Great War (1871–1914)</span>
      <span>Marking Bank Part 1 &bull; Page 7 of 8</span>
    </div>
  </div>
`;

  // ==========================================================================
  // PAGE 8: DEPARTMENT MARKING BANK (PART 2 • ENQUIRIES 3–5 • Q21–Q40)
  // 20 Questions evenly distributed across Page 8 (Zero spillover, generous spacing)
  // ==========================================================================
  html += `
  <div class="a5-page page-flex-full">
    <div class="page-header-strip page-header-compact">
      <h2>Department Marking Bank &bull; Part 2: Enquiries 3–5 (Q21–Q40)</h2>
    </div>

    <div class="mb-container">
      <div class="mb-section-title">Enquiry 3: Naval Arms Race & Dreadnought (Q21–Q24)</div>
      ${QUIZ_DATA[2].items
        .slice(4)
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

      <div class="mb-section-title">Enquiry 4: Alliances & Balkan Powder Keg (Q25–Q32)</div>
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

      <div class="mb-section-title">Enquiry 5: Sarajevo & The July Crisis (Q33–Q40)</div>
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

    <div class="page-footer-strip">
      <span>Causes of the Great War (1871–1914)</span>
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
  console.log('📖 COMPILING CAUSES OF THE GREAT WAR 8-PAGE QUIZ BOOKLET');
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

  console.log('\n=============================================================');
  console.log('📐 SPACE BUDGET & OVERFLOW AUDIT: Causes of the Great War');
  console.log('=============================================================');
  let hasOverflow = false;
  auditResults.forEach((res) => {
    if (res.overflow > 0) {
      console.error(
        `Page ${String(res.pageNum).padStart(2, ' ')}: ❌ OVERFLOW DETECTED (+${res.overflow}px) [scrollH: ${res.scrollH}px, clientH: ${res.clientH}px]`,
      );
      hasOverflow = true;
    } else {
      console.log(
        `Page ${String(res.pageNum).padStart(2, ' ')}: ✅ 0px overflow (PERFECT FIT) (clientH: ${res.clientH}px, scrollH: ${res.scrollH}px)`,
      );
    }
  });
  console.log('=============================================================\n');

  if (hasOverflow) {
    await browser.close();
    throw new Error(
      'Compilation halted: One or more pages exceeded the strict A5 printable budget.',
    );
  }

  console.log('🎉 Audit Passed: 100% clean across all 8 pages with ZERO overflow!');

  const pdfPathFinal = path.join(PDFS_DIR, 'great_war_quiz_pack_FINAL_V1.pdf');
  const pdfPathAlias = path.join(PDFS_DIR, 'great_war_quiz_pack.pdf');

  await page.pdf({
    path: pdfPathFinal,
    format: 'A5',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
  });

  fs.copyFileSync(pdfPathFinal, pdfPathAlias);
  await browser.close();

  console.log(`✅ Generated Master 8-Page Saddle-Stitch PDF: ${pdfPathFinal}`);
  console.log(`✅ Updated PDF alias: ${pdfPathAlias}`);
  console.log(
    '\n🎉 Complete 8-page saddle-stitch Knowledge Retrieval Companion compiled successfully!\n',
  );
}

run().catch((err) => {
  console.error('Fatal compilation error:', err);
  process.exit(1);
});
