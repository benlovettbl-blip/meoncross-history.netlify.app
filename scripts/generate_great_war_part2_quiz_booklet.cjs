/**
 * generate_great_war_part2_quiz_booklet.cjs
 *
 * Compiles the 8-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for KS3 History (Year 9): The Course of the Great War (1914–1919).
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
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'great_war_part2');
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
  // ENQUIRY 1: Recruitment, Enlistment & Propaganda (1914)
  {
    lesson: 1,
    lessonTitle: '1. Recruitment, Enlistment & Propaganda (1914)',
    shortTitle: 'Recruitment & Propaganda',
    enquiry: 'Why were millions of young men desperate to enlist in 1914?',
    items: [
      {
        q: 'Approximately how many professional soldiers made up the British Expeditionary Force (BEF) in August 1914?',
        a: '120,000 men',
        exp: 'Britain had a small, highly trained professional army compared to the mass conscript armies of France and Germany.',
      },
      {
        q: 'Who was appointed British Secretary of State for War in August 1914 and appeared on famous recruitment posters?',
        a: 'Lord Horatio Kitchener',
        exp: 'Kitchener correctly predicted a long, brutal war lasting at least three years requiring an army of millions.',
      },
      {
        q: 'What was the nickname given to battalions of friends, workmates, and neighbours who enlisted together?',
        a: 'Pals Battalions',
        exp: 'Units like the Grimsby Chums and Accrington Pals allowed men to serve side-by-side, boosting recruitment.',
      },
      {
        q: 'Why did hundreds of thousands of young British men rush to enlist in August and September 1914?',
        a: 'A wave of patriotic enthusiasm, peer pressure, and the popular belief that the war would be over by Christmas',
        exp: 'Young men viewed enlistment as an exciting adventure, an escape from boring factory work, and a moral duty.',
      },
      {
        q: 'How did British propaganda posters persuade men to volunteer before conscription was introduced?',
        a: 'By appealing to national pride, portraying German soldiers as barbaric, and using guilt about protecting families',
        exp: 'Iconic posters asked "What did you do in the Great War, Daddy?" to make civilian men feel ashamed of not enlisting.',
      },
      {
        q: 'What symbol of cowardice was handed to men in civilian clothes on the streets of Britain?',
        a: 'A white feather',
        exp: 'The White Feather movement used intense public humiliation to shame young men into joining the armed forces.',
      },
      {
        q: 'Why did the concept of "Pals Battalions" ultimately prove to be a catastrophic social disaster?',
        a: 'Heavy casualties at the Somme wiped out an entire generation of young men from the same towns on a single day',
        exp: 'When local battalions were devastated, whole communities lost virtually all their young fathers, brothers, and sons at once.',
      },
      {
        q: 'How did the transition from a small professional army to a mass citizen army transform British society?',
        a: 'It made the war a shared national trauma that touched every household, town, and social class in the country',
        exp: 'The unprecedented scale of enlistment laid the groundwork for total war and sweeping postwar social changes.',
      },
    ],
  },

  // ENQUIRY 2: Trench Warfare, Technology & Generalship on the Western Front (1914–1918)
  {
    lesson: 2,
    lessonTitle: '2. Trench Warfare, Technology & Generalship on the Western Front (1914–1918)',
    shortTitle: 'Trench Warfare & The Somme',
    enquiry: 'Did British generals make the horror of trench warfare worse?',
    items: [
      {
        q: 'What series of maneuvers in late 1914 ended open fighting and created the 400-mile Western Front?',
        a: 'The "Race to the Sea"',
        exp: 'Both sides tried to outflank each other until defensive trench networks stretched unbroken from Switzerland to the North Sea.',
      },
      {
        q: 'What dangerous medical condition was caused by soldiers standing in cold, waterlogged mud for days?',
        a: 'Trench Foot',
        exp: 'Prolonged exposure to damp mud caused bacterial infection, numbness, and gangrene, often requiring foot amputation.',
      },
      {
        q: 'Which weapon was responsible for approximately 60% of all combat casualties on the Western Front?',
        a: 'Heavy Artillery (high-explosive shells)',
        exp: 'Massive artillery barrages pulverized trenches, caused horrific shrapnel wounds, and induced severe shell shock.',
      },
      {
        q: 'Why were frontline trenches constructed in a zig-zag or traverse pattern rather than straight lines?',
        a: 'To stop enemy machine-gunners firing down the entire length and to contain artillery blast shockwaves',
        exp: 'The angular design isolated explosions and ensured that if an enemy entered a trench, they could not shoot far ahead.',
      },
      {
        q: 'Why was attacking across "No Man\'s Land" suicidal against defensive firepower?',
        a: 'Barbed wire entanglements trapped infantry while rapid-firing machine guns and artillery mowed them down',
        exp: 'Industrial defensive weapons held an overwhelming tactical advantage over advancing infantry throughout most of the war.',
      },
      {
        q: 'Why did the British artillery bombardment fail to destroy German defences before the Battle of the Somme (1916)?',
        a: 'A third of the shells were duds and the deep German concrete bunkers protected soldiers beneath the bombardment',
        exp: 'When the week-long bombardment ended, German soldiers emerged from deep dugouts to set up machine guns before the British arrived.',
      },
      {
        q: 'Why is Field Marshal Sir Douglas Haig remembered both as a callous "Butcher" and the architect of victory?',
        a: 'Critics condemn his costly attrition tactics, while defenders argue he adapted modern technology to defeat Germany in 1918',
        exp: 'Haig presided over 57,000 casualties on 1 July 1916, but later mastered combined-arms warfare in the decisive Hundred Days Offensive.',
      },
      {
        q: 'How did the development of tanks and combined-arms tactics eventually break the trench deadlock in 1918?',
        a: 'Tanks crushed barbed wire, protected infantry, and worked with creeping artillery barrages and aircraft to breakthrough lines',
        exp: 'Coordinated warfare replaced futile infantry charges, restoring mobility to the battlefield during the final Allied offensives.',
      },
    ],
  },

  // ENQUIRY 3: A Global Conflict: Empire Troops & Forgotten Fronts (1914–1918)
  {
    lesson: 3,
    lessonTitle: '3. A Global Conflict: Empire Troops & Forgotten Fronts (1914–1918)',
    shortTitle: 'Empire Troops & Global Reach',
    enquiry: 'How much of a "World" War was it, and why were colonial troops forgotten?',
    items: [
      {
        q: 'Approximately how many Indian soldiers and non-combatant labourers served the British Empire during the war?',
        a: 'Approximately 1.3 million men',
        exp: 'The Indian Army provided essential divisions on the Western Front, in Gallipoli, and across the Middle East.',
      },
      {
        q: 'Who was the first South Asian soldier to be awarded the Victoria Cross (VC) in October 1914?',
        a: 'Sepoy Khudadad Khan VC',
        exp: "Serving with the 129th Duke of Connaught's Own Baluchis at Hollebeke, he fought his machine gun alone despite severe wounds.",
      },
      {
        q: 'What historic English royal building in Brighton was converted into a military hospital for wounded Indian troops?',
        a: 'The Royal Pavilion',
        exp: 'The exotic oriental palace was transformed into a showcase hospital with separate kitchens and prayer areas for Hindu, Muslim, and Sikh troops.',
      },
      {
        q: 'What exhausting and dangerous physical duties were men of the British West Indies Regiment (BWIR) primarily restricted to?',
        a: 'Carrying heavy live artillery shells, building roads, and digging frontline trenches under enemy fire',
        exp: 'British military authorities imposed racial restrictions, refusing to let Black soldiers fight in frontline combat on the Western Front.',
      },
      {
        q: 'Why was the 1915 Gallipoli Campaign launched against the Ottoman Empire?',
        a: 'To knock the Ottomans out of the war, open a sea route to Russia, and break the stalemate on the Western Front',
        exp: 'Conceived by Winston Churchill, the amphibious invasion failed disastrously amid fierce Turkish resistance on steep cliffs.',
      },
      {
        q: 'How did the Battle of Gallipoli forge a powerful national identity for Australia and New Zealand (ANZAC)?',
        a: 'The bravery, endurance, and heavy sacrifices of the ANZAC soldiers became a founding national legend of independence',
        exp: 'Anzac Day on 25 April remains the principal day of national remembrance in Australia and New Zealand.',
      },
      {
        q: 'Why were the massive wartime contributions of colonial and Commonwealth soldiers largely forgotten in Europe after 1918?',
        a: 'European commemorative narratives focused almost exclusively on white soldiers and the Western Front battlefields',
        exp: 'Decades of Eurocentric textbooks ignored the global reach of the war and the crucial sacrifices of Asian, Caribbean, and African troops.',
      },
      {
        q: 'How did fighting in the Great War accelerate demands for national independence across the British Empire?',
        a: 'Colonial soldiers saw European weakness firsthand and expected political self-government in exchange for their wartime loyalty',
        exp: "Broken British promises in India and the Caribbean triggered mass strikes, nationalist revolts, and the rise of Gandhi's independence movement.",
      },
    ],
  },

  // ENQUIRY 4: The Total Home Front: DORA, Women\'s War Work & Conscription (1914–1918)
  {
    lesson: 4,
    lessonTitle: "4. The Total Home Front: DORA, Women's War Work & Conscription (1914–1918)",
    shortTitle: 'The Home Front & DORA',
    enquiry: 'How did a war fought miles away completely control daily life in Britain?',
    items: [
      {
        q: 'What emergency law passed on 8 August 1914 gave the British government vast powers to control daily life?',
        a: 'The Defence of the Realm Act (DORA)',
        exp: 'DORA allowed the state to censor newspapers, take over factories, arrest suspects without trial, and regulate daily habits.',
      },
      {
        q: 'What was the nickname given to women working in dangerous explosives factories whose skin turned yellow?',
        a: '"Canary Girls"',
        exp: 'Exposure to toxic TNT chemicals during shell filling stained their skin and hair bright yellow and caused severe liver damage.',
      },
      {
        q: 'In what year did the British government introduce compulsory military conscription for single men?',
        a: '1916 (Military Service Act)',
        exp: 'Heavy casualties on the Western Front forced Britain to abandon voluntary recruitment and draft men aged 18 to 41.',
      },
      {
        q: 'What term was used for men who refused to serve in the armed forces on moral or religious grounds?',
        a: 'Conscientious Objectors ("Conchies")',
        exp: 'Many were forced before tribunals, imprisoned with hard labour in Dartmoor, or assigned to non-combatant medical units.',
      },
      {
        q: 'Why did the British government regulate pub opening hours and water down beer under DORA?',
        a: 'To stop industrial absenteeism and ensure factory workers produced munitions at maximum efficiency',
        exp: 'Lloyd George famously warned that "drink is doing us more damage in the war than all the German submarines put together."',
      },
      {
        q: 'Why was compulsory food rationing introduced across Britain in early 1918?',
        a: 'German unrestricted submarine warfare sank Allied merchant ships, causing severe shortages of sugar, butter, and meat',
        exp: "German U-boats came close to cutting off Britain's overseas food supply, making fair rationing essential to prevent starvation.",
      },
      {
        q: "How did women's vital work in wartime industry and transport challenge traditional Victorian gender roles?",
        a: 'By proving women could perform heavy, skilled physical labour just as effectively as men, earning financial independence',
        exp: 'Over one million women entered the workforce as bus conductors, police officers, railway workers, and munitions makers.',
      },
      {
        q: "To what extent was the Representation of the People Act 1918 a reward for women's wartime service?",
        a: 'It granted the vote to women over 30 with property, partly recognizing war work and avoiding pre-war suffragette militancy',
        exp: 'While a landmark constitutional breakthrough, younger working-class women under 30 who worked in factories still had to wait until 1928.',
      },
    ],
  },

  // ENQUIRY 5: The End of the War, The Paris Peace Settlement & The Middle East (1918–1919)
  {
    lesson: 5,
    lessonTitle: '5. The End of the War, The Paris Peace Settlement & The Middle East (1918–1919)',
    shortTitle: 'Versailles & The Middle East',
    enquiry:
      'Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?',
    items: [
      {
        q: 'On what exact date and time did the Armistice on the Western Front come into effect, ending the fighting?',
        a: '11 November 1918 at 11:00 am (the eleventh hour of the eleventh day of the eleventh month)',
        exp: 'German representatives signed the surrender terms in a railway carriage in the Compiègne Forest in France.',
      },
      {
        q: 'Which three Allied leaders dominated the 1919 Paris Peace Conference as "The Big Three"?',
        a: 'Georges Clemenceau (France), David Lloyd George (Britain), and Woodrow Wilson (USA)',
        exp: 'The leaders had conflicting goals: Clemenceau wanted revenge, Wilson sought ideal peace, and Lloyd George balanced both.',
      },
      {
        q: 'What was the official number of the controversial "War Guilt Clause" in the Treaty of Versailles?',
        a: 'Article 231',
        exp: 'Article 231 forced Germany to accept sole moral responsibility for causing all the loss and damage of the war.',
      },
      {
        q: 'What huge financial sum was Germany ordered to pay in reparations for war damages in 1921?',
        a: '£6.6 billion ($33 billion)',
        exp: 'The crippling indemnity was intended to pay for repairing devastated French towns and pensions for Allied soldiers.',
      },
      {
        q: "What severe military restrictions were imposed on Germany's armed forces by the Treaty of Versailles?",
        a: 'Army restricted to 100,000 volunteers, conscription banned, no tanks, no air force, and navy limited to six battleships',
        exp: "The Allies aimed to dismantle Germany's offensive capability so it could never launch another European invasion.",
      },
      {
        q: 'What secret 1916 agreement between Britain and France planned to carve up Ottoman Middle East territories?',
        a: 'The Sykes-Picot Agreement',
        exp: 'Diplomat Mark Sykes and François Georges-Picot drew arbitrary lines in the sand, dividing Syria, Lebanon, Iraq, and Palestine.',
      },
      {
        q: 'What was the 1917 Balfour Declaration, and why did it create enduring conflict in the Middle East?',
        a: 'A British pledge supporting a "national home for the Jewish people" in Palestine while promising not to prejudice existing Arab rights',
        exp: 'Contradictory British promises to both Arab leaders and Zionist movements created decades of bitter territorial and national struggle.',
      },
      {
        q: 'Did the Treaty of Versailles fail because it was too harsh, or because the Allies failed to enforce it?',
        a: 'It humiliated and economically enraged Germany while leaving its industrial core strong enough to rearm twenty years later',
        exp: 'Condemned by Germans as an unjust "Diktat", Versailles fostered deep political resentment that Adolf Hitler exploited to destroy the Weimar Republic.',
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
  const qrUrl = 'https://the-history-revision-hub.netlify.app/?unit=great_war_part2&view=quizzes';
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  });

  const coverImgData =
    getBase64Image('images/bg_great_war_part2.jpg') ||
    getBase64Image('public/images/bg_great_war_part2.jpg') ||
    '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Course of the Great War (1914–1919) Knowledge Retrieval Companion</title>
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
        <h1 class="cover-title">The Course of the Great War (1914–1919)</h1>
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
            ? `<img src="${coverImgData}" alt="From Sarajevo to the Treaty of Versailles" class="cover-map-img">`
            : `<div style="padding: 10px; font-weight: bold; color: #000000;">From Sarajevo to Versailles (1914–1919)</div>`
        }
      </div>
      <div class="cover-map-caption">
        Primary Historical Records: Archduke Franz Ferdinand in Sarajevo (June 1914) & the signing of the Treaty of Versailles in the Hall of Mirrors (June 1919).
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
      <div class="mb-section-title">Enquiry 1: Recruitment & Propaganda (Q1–Q8)</div>
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

      <div class="mb-section-title">Enquiry 2: Trench Warfare & The Somme (Q9–Q16)</div>
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

      <div class="mb-section-title">Enquiry 3: Empire Troops & Global Reach (Q17–Q20)</div>
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
      <span>The Course of the Great War (1914–1919)</span>
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
      <div class="mb-section-title">Enquiry 3: Empire Troops & Global Reach (Q21–Q24)</div>
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

      <div class="mb-section-title">Enquiry 4: The Home Front & DORA (Q25–Q32)</div>
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

      <div class="mb-section-title">Enquiry 5: Versailles & The Middle East (Q33–Q40)</div>
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
      <span>The Course of the Great War (1914–1919)</span>
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
  console.log('📖 COMPILING COURSE OF THE GREAT WAR 8-PAGE QUIZ BOOKLET');
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
  console.log('📐 SPACE BUDGET & OVERFLOW AUDIT: Course of the Great War');
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

  const pdfPathFinal = path.join(PDFS_DIR, 'great_war_part2_quiz_pack_FINAL_V1.pdf');
  const pdfPathAlias = path.join(PDFS_DIR, 'great_war_part2_quiz_pack.pdf');

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
