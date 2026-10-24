/**
 * scripts/render_standard_textbook_ks2_ww2.cjs
 *
 * THE HISTORY REVISION HUB — KEY STAGE 2 MASTER CLASSROOM TEXTBOOK COMPILER
 * Unit: World War II & The Home Front (1939–1945) [ks2_ww2]
 *
 * Reprographic Architecture (A3 Saddle-Stitch 16-Page Standard — Full KS3 Engine Parity):
 * - Page 1: Full-width uncropped hero plate, central enquiry banner, historical overview card,
 *           and structured 10-lesson directory table across the full width.
 * - Page 2: Inside Front Cover "Your Learning Journey" — 100% pupil-facing for 8–9 year olds with
 *           rich, child-friendly narrative blurbs and enquiry questions (zero teacher primer jargon, zero empty voids).
 * - Page 3: Master Chronological Turning Points Highway — 12 causal milestones (strictly 0 Ref tags).
 * - Pages 4–13: 10 Canonical Lessons (1 page per enquiry, Single Wide-Margin Column, pure narrative,
 *               clean "Lesson X" branding, calibrated 11.5pt–13pt Lora serif, strictly zero Extension Enquiry 11 boxes).
 * - Pages 14–15: Master Knowledge Retrieval Quiz (40 questions, 20 per page across Pages 14 & 15,
 *                large 8.8pt–9.8pt font, checkboxes, scorecard strip, zero answers printed).
 * - Page 16: Master Back Cover — The Home Front Vocabulary Bank & Core Concepts (10 rich terms with
 *            definitions, historical mechanisms, and Big Picture synthesis prompts; zero empty boxes).
 *
 * Strict Compliance:
 * - 100% Commercial Independence & Anonymity under "The History Revision Hub".
 * - Verbatim Single Source of Truth from units/ks2_ww2/data.js and data/ks2_ww2.json.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');
const { autoBalanceTextbook } = require('./engine/auto_balancer.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency offline rendering
function getBase64Image(relativePath) {
  try {
    if (!relativePath) return null;
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2', 'assets', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'units', 'ks2_ww2', 'assets', path.basename(cleanPath)),
    ];
    for (const cand of candidates) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        const ext = path.extname(cand).toLowerCase();
        const mime =
          ext === '.png'
            ? 'image/png'
            : ext === '.jpg' || ext === '.jpeg'
              ? 'image/jpeg'
              : ext === '.webp'
                ? 'image/webp'
                : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>) and bracketed tags
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(
      /<span\s+class=["'](?:para-ref|para-pill|archival-meta-tag)["']>[^<]*<\/span>\s*/gi,
      '',
    )
    .replace(/\[\d+\.\d+[A-Z]?\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(
      /\s*\((?:<strong>)?(?:Source|Interpretation|Figure)\s+[A-Z0-9]+(?:<\/strong>)?\)/gi,
      '',
    )
    .replace(/<div\b[^>]*Extension Enquiry 11[\s\S]*?<\/div>/gi, '')
    .replace(/<div\b[^>]*background:\s*linear-gradient[\s\S]*?<\/div>/gi, '')
    .replace(/<button\b[^>]*Launch Enquiry 11[\s\S]*?<\/button>/gi, '')
    .replace(/<div\b[^>]*style="[^"]*background:[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/([a-zA-Z])"([a-zA-Z])/g, '$1" $2')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Load canonical data dynamically from units/ks2_ww2/data.js and merge pupil-facing blurbs from data/ks2_ww2.json
function loadUnitData() {
  const jsonPath = path.join(ROOT_DIR, 'data', 'ks2_ww2.json');
  let jsonData = null;
  if (fs.existsSync(jsonPath)) {
    try {
      jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {}
  }

  const dataPath = path.join(ROOT_DIR, 'units', 'ks2_ww2', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+[^;]+;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  const data = vm.runInNewContext(raw);

  if (jsonData && jsonData.lessons) {
    data.lessons.forEach((l, i) => {
      const jl = jsonData.lessons[i];
      if (jl && jl.blurb) {
        l.blurb = jl.blurb;
      }
      if (jl && jl.quiz && (!l.quiz || l.quiz.length === 0)) {
        l.quiz = jl.quiz;
      }
    });
  }

  return data;
}

// Page 1 Dramatic Overview Synopsis
const canonicalOverviewP1 =
  'Between 1939 and 1945, the Second World War touched every aspect of daily life across Great Britain. From the sudden sounding of air raid sirens and the compulsory fitting of 38 million gas masks, to the poignant exodus of 1.5 million young evacuees clutching cardboard suitcases and brown luggage tags, the civilian population stood on the front line of modern conflict.';

const canonicalOverviewP2 =
  'Discover how ordinary families sheltered through 57 consecutive nights of bombing during the Blitz, dug flowerbeds into vegetable allotments for Victory, and worked around the clock in factories and fields. Experience the humanitarian rescue of 10,000 child refugees on the Kindertransport, the secret genius of Alan Turing’s codebreakers at Bletchley Park, and the euphoric street celebrations of VE Day.';

// Page 3 Chronological Milestone Spine (12 Defining Turning Points — strictly zero Ref [X.Y] tags)
const milestones = [
  {
    date: 'Nov 1938',
    title: 'The Kindertransport Begins & Prague Rescue Network',
    desc: 'Following Kristallnacht, the British Parliament permits 10,000 unaccompanied refugee children. Nicholas Winton and Trevor Chadwick organise rescue trains from Prague.',
  },
  {
    date: '1 Sept 1939',
    title: 'Operation Pied Piper: 1.5 Million Civilians Evacuated',
    desc: 'In three days, British railways move nearly 1.5 million school children, mothers, and teachers from target cities to rural host families with luggage tags pinned to their coats.',
  },
  {
    date: '3 Sept 1939',
    title: 'Britain Enters World War II & ARP Blackout Imposed',
    desc: 'Chamberlain announces war on wireless radios. 38 million gas masks are distributed in cardboard boxes, and strict nightly blackouts plunge cities into darkness.',
  },
  {
    date: 'May 1940',
    title: 'Churchill Becomes Prime Minister & Dunkirk Evacuation',
    desc: 'Winston Churchill leads a wartime coalition government. Over 338,000 Allied troops are saved from Dunkirk beaches by a flotilla of naval ships and civilian "Little Ships".',
  },
  {
    date: 'July–Oct 1940',
    title: 'The Battle of Britain & Fighter Command Defense',
    desc: 'RAF pilots in Spitfires and Hurricanes thwart the Luftwaffe above southern England, forcing Hitler to indefinitely postpone Operation Sea Lion, the planned invasion.',
  },
  {
    date: 'Sept 1940–May 1941',
    title: 'The Blitz Bombardment of London & Industrial Hubs',
    desc: 'German bombers strike London for 57 consecutive nights and devastate industrial centres like Coventry. Families rely on corrugated Anderson shelters and Tube station platforms.',
  },
  {
    date: 'Jan 1940–1941',
    title: 'Food Rationing Commences & Dig for Victory Campaign',
    desc: 'To counteract Atlantic U-boat blockades, the Ministry of Food introduces ration books. The Ministry of Agriculture converts parks, lawns, and gardens into vegetable plots.',
  },
  {
    date: 'Dec 1941',
    title: 'Conscription of Women for War Work & Land Army Surge',
    desc: 'Britain becomes the first nation to conscript women. Over 80,000 join the Women’s Land Army, while hundreds of thousands enter aircraft factories and munitions works.',
  },
  {
    date: '1941–1943',
    title: 'Turning the Tide: Turing’s Bombe & Ultra Intelligence',
    desc: 'At Bletchley Park, Alan Turing and a predominantly female workforce operate electromechanical Bombes, breaking German Enigma military codes and shortening the war.',
  },
  {
    date: '6 June 1944',
    title: 'D-Day: Allied Amphibious Landings in Normandy',
    desc: 'Operation Overlord launches the liberation of Western Europe. British, American, and Canadian forces breach Hitler’s Atlantic Wall, beginning the final march toward Berlin.',
  },
  {
    date: '8 May 1945',
    title: 'VE Day: Victory in Europe & Jubilant Street Celebrations',
    desc: 'Churchill declares peace in Europe. Millions celebrate with street parties, Union Jack bunting, and bonfires, remembering the six years of sacrifice and loss.',
  },
  {
    date: '1945–Present',
    title: 'Post-War Reconstruction, NHS Founding & Remembrance',
    desc: 'Post-war Britain establishes the National Health Service (1948) and modern welfare safety net, enshrining annual November Remembrance at the Cenotaph and local memorials.',
  },
];

// Page 16 Core Vocabulary Bank (10 Foundational KS2 Concepts — Engaging, Child-Friendly & Rigorous)
const vocabBank = [
  {
    term: 'Air Raid Siren',
    lesson: 'Lesson 1',
    badge: 'Causation',
    definition:
      'A loud, undulating mechanical horn mounted on city roofs to warn families that enemy bombers were heading toward their streets.',
    evidence:
      'Real Wartime Clue: Over 1,000 sirens guarded London; a steady drone meant all-clear, while rising wails warned families to dash to shelters.',
    mechanism:
      'Why It Changed Britain: Forced 38 million civilians to carry gas masks everywhere, black out windows, and adapt to wartime life.',
  },
  {
    term: 'Evacuee',
    lesson: 'Lesson 2',
    badge: 'Empathy',
    definition:
      'An urban schoolchild sent away from dangerous city targets to live with volunteer foster families in the quiet countryside.',
    evidence:
      'Real Wartime Clue: Operation Pied Piper moved 1.5 million children in three days; pupils wore luggage labels and carried small suitcases.',
    mechanism:
      'Why It Changed Britain: United city and country folk, creating lifelong friendships while challenging deep differences in wealth.',
  },
  {
    term: 'Kindertransport',
    lesson: 'Lesson 3',
    badge: 'Humanitarian',
    definition:
      'The emergency rescue mission that brought nearly 10,000 unaccompanied refugee children to safety in Great Britain.',
    evidence:
      'Real Wartime Clue: After the Kristallnacht attacks in 1938, British families pledged £50 per child to give them a safe home.',
    mechanism:
      'Why It Changed Britain: Saved thousands of young Jewish lives from Nazi persecution, showing the power of international sanctuary.',
  },
  {
    term: 'The Blitz',
    lesson: 'Lesson 4',
    badge: 'Consequence',
    definition:
      'The relentless German bombing offensive targeting London, Liverpool, and industrial cities between 1940 and 1941.',
    evidence:
      'Real Wartime Clue: London was bombed for 57 nights in a row; over 150,000 people slept safely on Tube station platforms.',
    mechanism:
      'Why It Changed Britain: Forged the famous "Blitz Spirit", inspiring neighbours to rescue one another and pull together through disaster.',
  },
  {
    term: 'Ration Book',
    lesson: 'Lesson 5',
    badge: 'Evidence',
    definition:
      'Official government coupon booklets ensuring that scarce food, clothes, and fuel were shared out equally and fairly to all.',
    evidence:
      'Real Wartime Clue: Coupons strictly limited sugar, butter, and meat; children received green books with free orange juice and cod liver oil.',
    mechanism:
      'Why It Changed Britain: Beat Atlantic submarine blockades, inspired "Dig for Victory", and improved the health of the poorest children.',
  },
  {
    term: "Women's Land Army",
    lesson: 'Lesson 6',
    badge: 'Significance',
    definition:
      'Over 80,000 civilian women ("Land Girls") who worked on British farms to feed the nation while men fought overseas.',
    evidence:
      'Real Wartime Clue: Recruits drove heavy tractors, ploughed fields, and looked after farm animals, increasing home food production by 50%.',
    mechanism:
      'Why It Changed Britain: Shattered old-fashioned stereotypes, proving women could perform tough manual labour and transforming work rights.',
  },
  {
    term: 'Anti-Jewish Laws',
    lesson: 'Lesson 7',
    badge: 'Civil Rights',
    definition:
      "Cruel discriminatory laws passed by the Nazi regime that systematically took away Jewish citizens' rights and freedom.",
    evidence:
      'Real Wartime Clue: The 1935 Nuremberg Laws stripped German Jews of citizenship, banning children from playgrounds, pools, and schools.',
    mechanism:
      'Why It Changed Britain: Shows how state prejudice grows step by step, reminding us why human rights and democracy must be protected.',
  },
  {
    term: 'Enigma Cipher',
    lesson: 'Lesson 8',
    badge: 'Technology',
    definition:
      'A complex rotor machine used by the German military to scramble top-secret radio messages into secret codes.',
    evidence:
      'Real Wartime Clue: Over 10,000 codebreakers worked in wooden huts at Bletchley Park, operating Alan Turing\'s whirring "Bombe" machines.',
    mechanism:
      'Why It Changed Britain: Secretly cracked enemy messages, shortening the war by up to four years and giving birth to modern computing.',
  },
  {
    term: 'Upstander',
    lesson: 'Lesson 9',
    badge: 'Moral Courage',
    definition:
      'A brave individual who refuses to stand by when others are treated unfairly, risking their own safety to defend and rescue them.',
    evidence:
      'Real Wartime Clue: Nicholas Winton, Trevor Chadwick, and Doreen Warriner organised eight trains from Prague, saving 669 Czech children.',
    mechanism:
      'Why It Changed Britain: Inspires young people today to speak up against bullying and injustice, showing one person can change the world.',
  },
  {
    term: 'VE Day & Remembrance',
    lesson: 'Lesson 10',
    badge: 'Legacy',
    definition:
      "Victory in Europe Day (8 May 1945), celebrating peace and honouring the wartime generation's bravery and sacrifice.",
    evidence:
      'Real Wartime Clue: Millions danced at street parties, while King George VI and Churchill waved to cheering crowds from Buckingham Palace.',
    mechanism:
      'Why It Changed Britain: Led to post-war rebuilding, the founding of the NHS in 1948, and annual November Remembrance Day traditions.',
  },
];

// Pages 14 & 15 Master Knowledge Retrieval Bank (60 High-Yield Recall Questions across 10 Lessons)
const MASTER_QUIZ_QUESTIONS = {
  lesson_1: [
    {
      q: 'At what time on Sunday 3 September 1939 did Neville Chamberlain announce war on the radio?',
      a: '11:15am',
    },
    {
      q: 'How many civilian gas masks did the British government distribute before the war broke out?',
      a: '38 million',
    },
    {
      q: "What color and letter were painted on an ARP warden's steel helmet?",
      a: 'White letter W on black',
    },
    {
      q: 'Why was the blackout strictly enforced across Britain every night?',
      a: 'To prevent bombers seeing light',
    },
    {
      q: 'Why were street corners and car bumpers painted with white strips?',
      a: 'To prevent collisions in dark',
    },
    {
      q: 'What item was inside the brown cardboard box that every schoolchild carried?',
      a: 'A rubber gas mask',
    },
  ],
  lesson_2: [
    {
      q: 'When was Operation Pied Piper officially launched across Britain?',
      a: 'Friday 1 September 1939',
    },
    {
      q: 'Approximately how many children, mothers, and teachers were evacuated in three days?',
      a: 'Nearly 1.5 million',
    },
    {
      q: 'Why were parents forbidden from accompanying children onto railway platforms?',
      a: 'To prevent overcrowding',
    },
    {
      q: "What identity item was pinned to every evacuee child's coat?",
      a: 'A brown cardboard luggage tag',
    },
    {
      q: 'Who was responsible for assigning arriving evacuees to local host families in village halls?',
      a: 'Local billeting officers',
    },
    {
      q: 'What common culture shock did many inner-city evacuees experience in the countryside?',
      a: 'Farm animals and open fields',
    },
  ],
  lesson_3: [
    {
      q: 'What violent event in November 1938 prompted British politicians to permit the Kindertransport?',
      a: 'Kristallnacht pogroms',
    },
    {
      q: 'How much money did a British sponsor have to guarantee for each refugee child?',
      a: '£50 per child',
    },
    {
      q: 'Where did Vera Schaufeld live before boarding the Kindertransport train in 1939?',
      a: 'Klatovy / Prague',
    },
    {
      q: 'Which London railway station welcomed almost all Kindertransport trains?',
      a: 'Liverpool Street Station',
    },
    {
      q: 'What treasured toy did ten-year-old Vera pack in her small suitcase before leaving?',
      a: 'Her beloved doll',
    },
    {
      q: 'Approximately how many unaccompanied refugee children were rescued on the Kindertransport?',
      a: 'Nearly 10,000 children',
    },
  ],
  lesson_4: [
    {
      q: 'Which date marked "Black Saturday", the start of the heavy bombing Blitz on London?',
      a: '7 September 1940',
    },
    {
      q: 'For how many consecutive nights was the city of London bombed by the Luftwaffe?',
      a: '57 consecutive nights',
    },
    {
      q: "What materials were used to construct an Anderson shelter in a family's back garden?",
      a: 'Corrugated steel sheets & soil',
    },
    {
      q: 'How deep into the ground did families have to dig to install an Anderson shelter?',
      a: 'At least 3 feet / 1 metre',
    },
    {
      q: 'Where did over 150,000 Londoners shelter every night during the Blitz?',
      a: 'Underground Tube platforms',
    },
    {
      q: 'What tool did volunteer firewatchers use to extinguish burning incendiary bombs?',
      a: 'Stirrup pumps and sand',
    },
  ],
  lesson_5: [
    {
      q: "What percentage of Britain's food was imported from overseas before the war in 1939?",
      a: 'Over 60% / nearly two-thirds',
    },
    {
      q: 'In which month and year did British food rationing officially begin?',
      a: 'January 1940',
    },
    {
      q: 'What was the typical weekly ration of butter per adult during the war?',
      a: '2 ounces / about 50 grams',
    },
    {
      q: 'What famous campaign encouraged families to convert lawns into vegetable plots?',
      a: 'Dig for Victory',
    },
    {
      q: 'Which famous vegetarian dish was named after the wartime Minister of Food?',
      a: 'Lord Woolton Pie',
    },
    {
      q: 'What free nutritional supplements were given to young children during rationing?',
      a: 'Cod liver oil & orange juice',
    },
  ],
  lesson_6: [
    {
      q: "Approximately how many civilian women served in the Women's Land Army?",
      a: 'Over 80,000 Land Girls',
    },
    {
      q: 'Why were female munitions factory workers nicknamed "Canary Girls"?',
      a: 'TNT turned skin and hair yellow',
    },
    {
      q: "What was the uniform worn by Land Girls in the Women's Land Army?",
      a: 'Green jumpers & corduroy breeches',
    },
    {
      q: 'What vital wartime mission did female pilots of the ATA perform?',
      a: 'Ferrying Spitfires from factories',
    },
    {
      q: 'What dangerous roles did women perform in the Auxiliary Fire Service during air raids?',
      a: 'Driving tenders & communications',
    },
    {
      q: 'In which year did Britain introduce conscription for unmarried women aged 20–30?',
      a: 'December 1941',
    },
  ],
  lesson_7: [
    {
      q: 'What gift cone filled with sweets did German children carry on their first day of school?',
      a: 'A Schultüte',
    },
    {
      q: 'Which antisemitic laws passed in 1935 stripped German Jews of their citizenship?',
      a: 'The Nuremberg Laws',
    },
    {
      q: 'In which year were Jewish children completely expelled from German state schools?',
      a: 'November 1938',
    },
    {
      q: 'What discriminatory badge were Jewish people forced to wear in Nazi-occupied Europe?',
      a: 'A yellow Star of David',
    },
    {
      q: 'Name two public places Jewish children were banned from visiting under Nazi decrees.',
      a: 'Playgrounds, parks, pools',
    },
    {
      q: 'Why is it important to study Jewish family life and traditions before the war broke out?',
      a: 'To remember them as real people',
    },
  ],
  lesson_8: [
    {
      q: "Where was Britain's top-secret wartime codebreaking headquarters located?",
      a: 'Bletchley Park in Buckinghamshire',
    },
    {
      q: 'What was the name of the German cipher machine that scrambled messages with rotors?',
      a: 'The Enigma Machine',
    },
    {
      q: 'Which brilliant mathematician designed the electro-mechanical Bombe machine?',
      a: 'Alan Turing',
    },
    {
      q: 'What percentage of the 10,000 workers at Bletchley Park were civilian women?',
      a: 'Approximately 75%',
    },
    {
      q: 'What secret codename was given to intelligence decrypted at Bletchley Park?',
      a: 'Ultra intelligence',
    },
    {
      q: 'By how many years do historians estimate codebreakers at Bletchley Park shortened the war?',
      a: 'Between 2 and 4 years',
    },
  ],
  lesson_9: [
    {
      q: "What was Nicholas Winton's ordinary job before travelling to Prague in December 1938?",
      a: 'A London stockbroker',
    },
    {
      q: 'What organization in Prague did Trevor Chadwick lead to organize child transports?',
      a: 'British Committee for Refugees',
    },
    {
      q: 'How many rescue trains did Nicholas Winton and his team successfully dispatch from Prague?',
      a: 'Eight trains',
    },
    {
      q: 'How many children did the Prague rescue network successfully save from Nazi persecution?',
      a: '669 Czech children',
    },
    {
      q: 'What tragic event stopped the ninth rescue train from leaving Prague on 1 September 1939?',
      a: 'The outbreak of war',
    },
    {
      q: 'On which famous BBC television programme was Nicholas Winton reunited with evacuees?',
      a: "That's Life! in 1988",
    },
  ],
  lesson_10: [
    { q: 'What does the abbreviation "VE Day" stand for?', a: 'Victory in Europe Day' },
    {
      q: 'On what exact date was VE Day celebrated across Britain and Europe?',
      a: 'Tuesday 8 May 1945',
    },
    {
      q: 'Where did huge crowds gather in London to cheer Winston Churchill and the Royal Family?',
      a: 'Buckingham Palace balcony',
    },
    {
      q: 'Which famous British institution offering free healthcare was founded in 1948?',
      a: 'The NHS (National Health Service)',
    },
    {
      q: 'What red flower is worn every November to remember those who died in wartime?',
      a: 'The remembrance poppy',
    },
    {
      q: 'Where does the national Remembrance Sunday service take place in London?',
      a: 'The Cenotaph on Whitehall',
    },
  ],
};

function buildHtml() {
  const unitData = loadUnitData();
  const lessons = unitData.lessons.slice(0, 10);

  const heroImageBase64 = getBase64Image(
    '/units/ks2_ww2/assets/kindertransport_prague_airport_1939.jpg',
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Stage 2: World War II &amp; The Home Front (1939–1945) — Classroom Companion Textbook</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4 portrait;
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
      font-family: 'Lora', Georgia, serif;
      background: #e2e8f0;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }

    .page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      position: relative;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10mm 15mm 9mm 15mm;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      page-break-after: always;
      page-break-inside: avoid;
    }

    @media print {
      body { background: #ffffff; }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }

    /* RUNNING HEADERS & FOOTERS */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #475569;
    }

    .running-header span.tag {
      background: #0f172a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      font-weight: 800;
    }

    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 3px;
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #64748b;
    }

    .running-footer .page-pill {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 7px;
      border-radius: 2px;
      font-weight: 800;
      font-size: 6.8pt;
    }

    /* ==========================================================================
       PAGE 1: MASTER FRONT COVER (FULL-WIDTH KS3 ENGINE PARITY)
       ========================================================================== */
    .cover-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      color: #0f172a;
      text-transform: uppercase;
    }

    .cover-date-pill {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1.5px 7px;
      border-radius: 3px;
      font-weight: 800;
      font-size: 7.2pt;
      letter-spacing: 0.08em;
    }

    .cover-title-block {
      text-align: center;
      margin-bottom: 3px;
    }

    .cover-main-title {
      font-family: 'Cinzel', serif;
      font-size: 20pt;
      font-weight: 900;
      letter-spacing: 0.04em;
      color: #0f172a;
      line-height: 1.10;
      margin: 0;
    }

    .cover-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 8.8pt;
      color: #334155;
      margin-top: 1.5px;
    }

    .cover-enquiry-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
      border: 2px solid #3b82f6;
      border-radius: 4px;
      padding: 5px 12px;
      margin-bottom: 3.5mm;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 3px 10px rgba(30, 58, 138, 0.22);
    }

    .cover-enquiry-badge {
      background: #f59e0b;
      color: #0f172a;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 900;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 3px;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .cover-enquiry-text {
      font-family: 'Lora', Georgia, serif;
      font-size: 10.5pt;
      font-weight: 700;
      font-style: italic;
      color: #ffffff;
      margin: 0;
      line-height: 1.25;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
    }

    /* FULL-WIDTH HERO PLATE (ZERO BLACK BLOCKS) */
    .cover-hero-wrap {
      width: 100%;
      height: 75mm;
      border: 1.5px solid #0f172a;
      border-radius: 3px;
      background: #ffffff;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
      margin-bottom: 1.5mm;
    }

    .cover-hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 30%;
      display: block;
    }

    .cover-hero-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      line-height: 1.25;
      color: #475569;
      font-style: italic;
      text-align: center;
      margin-bottom: 3.5mm;
    }

    .cover-overview-box {
      flex: 1;
      background: #fdfbf7;
      border: 1.5px solid #e2d9cc;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 4px;
    }

    .cover-overview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2d9cc;
      padding-bottom: 2px;
      margin-bottom: 2px;
    }

    .cover-overview-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: #1e3a8a;
    }

    .cover-overview-period {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
    }

    .cover-overview-text {
      font-family: 'Lora', Georgia, serif;
      font-style: italic;
      font-size: 10.5pt;
      line-height: 1.38;
      color: #1e293b;
      margin: 0;
      text-align: justify;
    }

    /* Structured 10-Lesson Directory Table (KS3 Parity, Zero Voids) */
    .cover-directory {
      border: 1.5px solid #0f172a;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 1px;
    }

    .cover-directory-head {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
    }

    .cover-directory-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      background: #ffffff;
    }

    .cover-directory-table tr {
      border-bottom: 0.5px solid #e2e8f0;
    }

    .cover-directory-table tr:last-child {
      border-bottom: none;
    }

    .cover-directory-table td {
      padding: 3.8px 8px;
      vertical-align: middle;
    }

    .col-num {
      width: 60px;
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .col-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 7.4pt;
      width: 42%;
      line-height: 1.20;
    }

    .col-eq {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      color: #475569;
      font-size: 7.2pt;
      padding-left: 6px;
      line-height: 1.22;
    }

    .col-page {
      width: 52px;
      text-align: right;
      font-weight: 800;
      color: #1e3a8a;
      white-space: nowrap;
    }

    /* ==========================================================================
       PAGE 2: INSIDE FRONT COVER PUPIL-FACING LEARNING JOURNEY (ZERO VOIDS)
       ========================================================================== */
    .journey-header {
      text-align: center;
      margin-bottom: 4px;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2.5px;
    }

    .journey-title {
      font-family: 'Cinzel', serif;
      font-size: 13.5pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: #0f172a;
      margin: 0;
    }

    .journey-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 8.2pt;
      color: #475569;
      margin-top: 1.5px;
    }

    .journey-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 8px;
      flex: 1;
    }

    .journey-card {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 6px 9.5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3px;
    }

    .journey-card-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 0.5px solid #e2e8f0;
      padding-bottom: 1.5px;
      margin-bottom: 1px;
    }

    .journey-card-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f172a;
    }

    .journey-card-page {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      padding: 0.5px 5px;
      border-radius: 2px;
      white-space: nowrap;
    }

    .journey-card-question {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.6pt;
      font-style: italic;
      font-weight: 700;
      color: #1e3a8a;
      line-height: 1.22;
      margin: 0;
    }

    .journey-card-desc {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.9pt;
      line-height: 1.30;
      color: #334155;
      margin: 0;
      text-align: justify;
    }

    /* ==========================================================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE (ZERO REF TAGS)
       ========================================================================== */
    .spine-header-block {
      text-align: center;
      margin-bottom: 4px;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2.5px;
    }

    .spine-main-title {
      font-family: 'Cinzel', serif;
      font-size: 13.5pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: #0f172a;
      margin: 0;
    }

    .spine-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 8.0pt;
      color: #475569;
      margin-top: 1.5px;
    }

    .milestone-timeline {
      display: flex;
      flex-direction: column;
      position: relative;
      margin: 1px 0;
      flex: 1;
      justify-content: space-between;
    }

    .milestone-timeline::before {
      content: '';
      position: absolute;
      top: 5px;
      bottom: 5px;
      left: 74px;
      width: 2px;
      background: #cbd5e1;
      z-index: 1;
    }

    .milestone-row {
      display: flex;
      align-items: flex-start;
      position: relative;
      z-index: 2;
      margin-bottom: 1.5px;
    }

    .milestone-date-box {
      width: 68px;
      text-align: right;
      padding-right: 7px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      white-space: nowrap;
      padding-top: 2px;
    }

    .milestone-node {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #1e3a8a;
      border: 2px solid #ffffff;
      box-shadow: 0 0 0 1.5px #1e3a8a;
      margin-top: 3px;
      margin-right: 7px;
      flex-shrink: 0;
    }

    .milestone-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      border-radius: 2px;
      padding: 2.5px 7px;
    }

    .milestone-header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }

    .milestone-title {
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
    }

    .milestone-desc {
      font-family: 'Lora', serif;
      font-size: 7.2pt;
      line-height: 1.26;
      color: #334155;
      margin: 0;
    }

    /* ==========================================================================
       PAGES 4–13: TEN CANONICAL ENQUIRIES (SINGLE WIDE-MARGIN COLUMN MODEL)
       ========================================================================== */
    .enquiry-banner {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }

    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .enquiry-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      padding: 1.5px 7px;
      border-radius: 2px;
    }

    .enquiry-canon-tag {
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .enquiry-title {
      font-family: 'Cinzel', serif;
      font-size: 13.5pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin: 0 0 3px 0;
    }

    .enquiry-core-question {
      background: #f1f5f9;
      border-left: 3.5px solid #1e3a8a;
      padding: 3px 8px;
      font-size: 8.0pt;
      font-weight: 700;
      color: #1e3a8a;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .enquiry-core-question span.label {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1px 5.5px;
      border-radius: 2px;
      font-size: 6.4pt;
      font-weight: 900;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    /* SINGLE WIDE-MARGIN COLUMN (KS2 Fluency Measure) */
    .prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin: 0 auto;
      width: 100%;
      max-width: 162mm;
    }

    .prose-single-column {
      width: 100%;
    }

    .block-section {
      margin-bottom: 14px;
    }

    .block-section:last-child {
      margin-bottom: 0;
    }

    .block-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 1.5mm;
      border-bottom: 0.5px solid #e2e8f0;
      padding-bottom: 1px;
    }

    .block-ref {
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      padding: 0.5px 4.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }

    .block-title {
      font-family: 'Cinzel', serif;
      font-size: 9.6pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.02em;
    }

    .prose-p {
      font-family: 'Lora', Georgia, serif;
      font-size: 12.0pt;
      line-height: 1.62;
      color: #1e293b;
      text-align: justify;
      hyphens: auto;
      margin: 0 0 3.5px 0;
    }

    .prose-p:last-child {
      margin-bottom: 0;
    }

    .prose-p strong {
      color: #0f172a;
      font-weight: 700;
    }

    /* ==========================================================================
       PAGES 14 & 15: MASTER KNOWLEDGE RETRIEVAL QUIZ (PARTS I & II)
       ========================================================================== */
    .quiz-page-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      color: #0f172a;
      text-transform: uppercase;
    }

    .quiz-page-title-block {
      text-align: center;
      margin-bottom: 3px;
    }

    .quiz-page-main-title {
      font-family: 'Cinzel', serif;
      font-size: 14pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      letter-spacing: 0.04em;
    }

    .quiz-instructions {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 4px solid #1e3a8a;
      padding: 3px 9px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 700;
      color: #1e3a8a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .quiz-stack {
      display: flex;
      flex-direction: column;
      gap: 7px;
      flex: 1;
      justify-content: flex-start;
    }

    .quiz-topic-card {
      background: #ffffff;
      border: 1.5px solid #cbd5e1;
      border-left: 4px solid #1e3a8a;
      border-radius: 3px;
      padding: 7.5px 12px;
    }

    .quiz-topic-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 0.5px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }

    .quiz-topic-title {
      font-family: 'Inter', sans-serif;
      font-size: 9.8pt;
      font-weight: 800;
      color: #0f172a;
    }

    .quiz-topic-ref {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      padding: 1px 6px;
      border-radius: 2px;
    }

    .quiz-questions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 14px;
    }

    .quiz-q-item {
      font-size: 9.6pt;
      line-height: 1.38;
      color: #1e293b;
      display: flex;
      align-items: baseline;
      gap: 5px;
    }

    .quiz-q-box {
      width: 9px;
      height: 9px;
      border: 1.5px solid #1e3a8a;
      border-radius: 2px;
      flex-shrink: 0;
      display: inline-block;
      margin-top: 1.5px;
    }

    .quiz-q-num {
      color: #1e3a8a;
      font-weight: 800;
      white-space: nowrap;
    }

    /* ==========================================================================
       PAGE 16: MASTER VOCABULARY BANK & CORE CONCEPTS BACK COVER (ZERO VOIDS)
       ========================================================================== */
    .vocab-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      color: #0f172a;
      text-transform: uppercase;
    }

    .vocab-title-block {
      text-align: center;
      margin-bottom: 4px;
    }

    .vocab-main-title {
      font-family: 'Cinzel', serif;
      font-size: 13.5pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      letter-spacing: 0.04em;
    }

    .vocab-subtitle {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 8.0pt;
      color: #475569;
      margin-top: 1.5px;
    }

    .vocab-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px 8px;
      flex: 1;
    }

    .vocab-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 6.5px 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3.5px;
    }

    .vocab-card-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 0.5px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 1px;
    }

    .vocab-term {
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
    }

    .vocab-badge {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      padding: 1px 5px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .vocab-desc {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.8pt;
      line-height: 1.30;
      color: #0f172a;
      margin: 0;
    }

    .vocab-evidence {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.4pt;
      line-height: 1.26;
      color: #334155;
      margin: 0;
    }

    .vocab-evidence strong {
      color: #475569;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .vocab-mechanism {
      font-family: 'Lora', Georgia, serif;
      font-size: 7.4pt;
      line-height: 1.26;
      color: #1e3a8a;
      font-style: italic;
      margin: 0;
    }

    .vocab-mechanism strong {
      color: #1e3a8a;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-style: normal;
    }

    .big-picture-card {
      background: #eff6ff;
      border: 1.5px solid #bfdbfe;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 3px;
      padding: 8px 12px;
      margin-top: 6px;
    }

    .big-picture-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2.5px;
    }

    .big-picture-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #1e3a8a;
    }

    .big-picture-question {
      font-family: 'Lora', serif;
      font-size: 8.6pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 3.5px;
    }

    .big-picture-prompts {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      font-size: 7.4pt;
      line-height: 1.30;
      color: #334155;
    }

    .bp-prompt strong {
      color: #1e3a8a;
      font-weight: 800;
    }
  </style>
</head>
<body>

  <!-- ==========================================================================
       PAGE 1: MASTER FRONT COVER (FULL-WIDTH KS3 ENGINE PARITY)
       ========================================================================== -->
  <div class="page" id="page-1">
    <div class="cover-masthead">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 MASTER COMPANION TEXTBOOK</span>
      <span class="cover-date-pill">1939 – 1945</span>
    </div>

    <div class="cover-title-block">
      <h1 class="cover-main-title">WORLD WAR II &amp; THE HOME FRONT</h1>
      <div class="cover-subtitle">Total Civilian Mobilisation, Evacuation, The Blitz &amp; Rebuilding Britain</div>
    </div>

    <div class="cover-enquiry-banner">
      <span class="cover-enquiry-badge">KEY ENQUIRY QUESTION</span>
      <span class="cover-enquiry-text">&ldquo;${unitData.enquiry_question || "How did World War II transform children's lives in Britain and Europe?"}&rdquo;</span>
    </div>

    <div class="cover-hero-wrap">
      <img class="cover-hero-img" src="${heroImageBase64 || ''}" alt="Czech refugee children at Prague Airport 1939" />
    </div>
    <div class="cover-hero-caption">
      Primary Photograph: Czech refugee children, including Peter Needham (centre foreground), waving farewell at Prague Airport on 12 January 1939 before boarding an evacuation flight to Great Britain (Imperial War Museum HU 88871 / Object 205184254).
    </div>

    <div class="cover-overview-box">
      <div class="cover-overview-header">
        <span class="cover-overview-title">HISTORICAL OVERVIEW • 1939–1945</span>
        <span class="cover-overview-period">HOME FRONT SCHEMA</span>
      </div>
      <p class="cover-overview-text">${canonicalOverviewP1}</p>
      <p class="cover-overview-text" style="margin-top: 3px;">${canonicalOverviewP2}</p>
    </div>

    <div class="cover-directory">
      <div class="cover-directory-head">
        <span>LESSON DIRECTORY • TEN CANONICAL ENQUIRIES</span>
        <span>A3 SADDLE-STITCH COMPANION</span>
      </div>
      <table class="cover-directory-table">
        <tbody>
          ${lessons
            .map((lesson, idx) => {
              const pageNum = idx + 4;
              const cleanTitle = lesson.title.replace(/^Enquiry \d+:\s*/i, '');
              return `
            <tr>
              <td class="col-num">Lesson ${idx + 1}</td>
              <td class="col-title">${cleanTitle}</td>
              <td class="col-eq">&ldquo;${lesson.enquiryQuestion}&rdquo;</td>
              <td class="col-page">Page ${pageNum}</td>
            </tr>`;
            })
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Disciplinary History Series • KS2 Companion Reader</span>
      <span class="page-pill">Page 1</span>
    </div>
  </div>

  <!-- ==========================================================================
       PAGE 2: INSIDE FRONT COVER PUPIL-FACING LEARNING JOURNEY (ZERO VOIDS)
       ========================================================================== -->
  <div class="page" id="page-2">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 COMPANION TEXTBOOK</span>
      <span>YOUR LEARNING JOURNEY &nbsp;|&nbsp; 1939–1945</span>
    </div>

    <div class="journey-header">
      <h2 class="journey-title">Your Journey Through World War II</h2>
      <div class="journey-subtitle">Ten Historical Enquiries into How the Second World War Changed Children's Lives</div>
    </div>

    <div class="journey-grid">
      ${lessons
        .map((lesson, idx) => {
          const pageNum = idx + 4;
          const cleanTitle = lesson.title.replace(/^Enquiry \d+:\s*/i, '');
          const blurbText = lesson.blurb || lesson.subtitle || '';
          return `
        <div class="journey-card">
          <div class="journey-card-head">
            <span class="journey-card-title">Lesson ${idx + 1}: ${cleanTitle}</span>
            <span class="journey-card-page">Page ${pageNum}</span>
          </div>
          <div class="journey-card-question">&ldquo;${lesson.enquiryQuestion}&rdquo;</div>
          <p class="journey-card-desc">${blurbText}</p>
        </div>`;
        })
        .join('')}
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Disciplinary Scheme of Learning &amp; Historical Concepts</span>
      <span class="page-pill">Page 2</span>
    </div>
  </div>

  <!-- ==========================================================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE (ZERO REF TAGS)
       ========================================================================== -->
  <div class="page" id="page-3">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 CHRONOLOGICAL SPINE</span>
      <span>TURNING POINTS HIGHWAY &nbsp;|&nbsp; 1938–1945</span>
    </div>

    <div class="spine-header-block">
      <h2 class="spine-main-title">Chronological Turning Points Highway</h2>
      <div class="spine-subtitle">Twelve Decisive Causal Milestones of the Second World War &amp; The Home Front</div>
    </div>

    <div class="milestone-timeline">
      ${milestones
        .map(
          (m) => `
        <div class="milestone-row">
          <div class="milestone-date-box">${m.date}</div>
          <div class="milestone-node"></div>
          <div class="milestone-content">
            <div class="milestone-header-row">
              <span class="milestone-title">${m.title}</span>
            </div>
            <p class="milestone-desc">${m.desc}</p>
          </div>
        </div>`,
        )
        .join('')}
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Chronological Schema Mastery • 1938–1945 Turning Points</span>
      <span class="page-pill">Page 3</span>
    </div>
  </div>

  <!-- ==========================================================================
       PAGES 4–13: TEN CANONICAL ENQUIRIES (SINGLE WIDE-MARGIN COLUMN)
       ========================================================================== -->
  ${lessons
    .map((lesson, idx) => {
      const pageNum = idx + 4;
      const cleanTitle = lesson.title.replace(/^Enquiry \d+:\s*/i, '');

      return `
  <div class="page" id="page-${pageNum}">
    <div class="running-header">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORY</span>
      <span>Lesson ${idx + 1} &nbsp;|&nbsp; Page ${pageNum}</span>
    </div>

    <div class="enquiry-banner">
      <div class="enquiry-meta-row">
        <span class="enquiry-pill">LESSON ${idx + 1} • CORE HISTORICAL NARRATIVE</span>
        <span class="enquiry-canon-tag">${lesson.skill || 'Historical Enquiry'}</span>
      </div>
      <h2 class="enquiry-title">${cleanTitle}</h2>
      <div class="enquiry-core-question">
        <span class="label">Key Enquiry Question:</span>
        <span>&ldquo;${lesson.enquiryQuestion}&rdquo;</span>
      </div>
    </div>

    <div class="prose-body">
      <div class="prose-single-column">
        ${(lesson.narrative_blocks || [])
          .map((b, bIdx) => {
            const blockRef = `[${idx + 1}.${bIdx + 1}]`;
            const cleanText = cleanProse(b.text);
            return `
          <div class="block-section">
            <div class="block-header">
              <span class="block-ref">${blockRef}</span>
              <span class="block-title">${b.title || ''}</span>
            </div>
            <p class="prose-p">${cleanText}</p>
          </div>`;
          })
          .join('')}
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • KS2 History • Lesson ${idx + 1} • ${cleanTitle}</span>
      <span class="page-pill">Page ${pageNum}</span>
    </div>
  </div>`;
    })
    .join('')}

  <!-- ==========================================================================
       PAGE 14: MASTER KNOWLEDGE RETRIEVAL QUIZ: PART I (LESSONS 1 TO 5)
       ========================================================================== -->
  <div class="page" id="page-14">
    <div class="quiz-page-masthead">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 RETRIEVAL PRACTICE</span>
      <span>PART I: LESSONS 1 TO 5 &nbsp;|&nbsp; QUESTIONS 1–30</span>
    </div>

    <div class="quiz-page-title-block">
      <h2 class="quiz-page-main-title">Master Knowledge Retrieval Quiz: Part I</h2>
    </div>

    <div class="quiz-instructions">
      <span><strong>PARTNER QUIZ OR SOLO RETRIEVAL:</strong> Close earlier pages. Take turns recalling in pairs, or practise silent solo retrieval.</span>
      <span style="white-space: nowrap; flex-shrink: 0;"><strong>Verified on pp. 4–8</strong></span>
    </div>

    <div class="quiz-stack">
      ${lessons
        .slice(0, 5)
        .map((lesson, idx) => {
          const pageNum = idx + 4;
          const cleanTopic = lesson.title.replace(/^Enquiry \d+:\s*/i, '');
          const questions = MASTER_QUIZ_QUESTIONS['lesson_' + (idx + 1)] || [];
          return `
        <div class="quiz-topic-card">
          <div class="quiz-topic-head">
            <span class="quiz-topic-title">Lesson ${idx + 1}: ${cleanTopic}</span>
            <span class="quiz-topic-ref">p. ${pageNum} • Questions ${idx * 6 + 1}–${idx * 6 + 6}</span>
          </div>
          <div class="quiz-questions-grid">
            ${questions
              .map(
                (q, qIdx) => `
              <div class="quiz-q-item">
                <span class="quiz-q-box"></span>
                <span class="quiz-q-num">Q${idx * 6 + qIdx + 1}.</span>
                <span>${q.q}</span>
              </div>`,
              )
              .join('')}
          </div>
        </div>`;
        })
        .join('')}
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Thirty Essential Recall Questions • Part I (Lessons 1–5)</span>
      <span class="page-pill">Page 14</span>
    </div>
  </div>

  <!-- ==========================================================================
       PAGE 15: MASTER KNOWLEDGE RETRIEVAL QUIZ: PART II (LESSONS 6 TO 10)
       ========================================================================== -->
  <div class="page" id="page-15">
    <div class="quiz-page-masthead">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 RETRIEVAL PRACTICE</span>
      <span>PART II: LESSONS 6 TO 10 &nbsp;|&nbsp; QUESTIONS 31–60</span>
    </div>

    <div class="quiz-page-title-block">
      <h2 class="quiz-page-main-title">Master Knowledge Retrieval Quiz: Part II</h2>
    </div>

    <div class="quiz-instructions">
      <span><strong>PARTNER QUIZ OR SOLO RETRIEVAL:</strong> Close earlier pages. Take turns recalling in pairs, or practise silent solo retrieval.</span>
      <span style="white-space: nowrap; flex-shrink: 0;"><strong>Verified on pp. 9–13</strong></span>
    </div>

    <div class="quiz-stack">
      ${lessons
        .slice(5, 10)
        .map((lesson, offset) => {
          const idx = offset + 5;
          const pageNum = idx + 4;
          const cleanTopic = lesson.title.replace(/^Enquiry \d+:\s*/i, '');
          const questions = MASTER_QUIZ_QUESTIONS['lesson_' + (idx + 1)] || [];
          return `
        <div class="quiz-topic-card">
          <div class="quiz-topic-head">
            <span class="quiz-topic-title">Lesson ${idx + 1}: ${cleanTopic}</span>
            <span class="quiz-topic-ref">p. ${pageNum} • Questions ${idx * 6 + 1}–${idx * 6 + 6}</span>
          </div>
          <div class="quiz-questions-grid">
            ${questions
              .map(
                (q, qIdx) => `
              <div class="quiz-q-item">
                <span class="quiz-q-box"></span>
                <span class="quiz-q-num">Q${idx * 6 + qIdx + 1}.</span>
                <span>${q.q}</span>
              </div>`,
              )
              .join('')}
          </div>
        </div>`;
        })
        .join('')}
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Thirty Essential Recall Questions • Part II (Lessons 6–10)</span>
      <span class="page-pill">Page 15</span>
    </div>
  </div>

  <!-- ==========================================================================
       PAGE 16: MASTER VOCABULARY BANK & CORE CONCEPTS BACK COVER (ZERO VOIDS)
       ========================================================================== -->
  <div class="page" id="page-16">
    <div class="vocab-masthead">
      <span>THE HISTORY REVISION HUB • KEY STAGE 2 HISTORICAL SCHEMATA</span>
      <span>VOCABULARY &amp; CORE CONCEPTS</span>
    </div>

    <div class="vocab-title-block">
      <h2 class="vocab-main-title">The Home Front Vocabulary Bank &amp; Core Concepts</h2>
      <div class="vocab-subtitle">Ten Essential Historical Terms for Explaining How World War II Transformed British Society</div>
    </div>

    <div class="vocab-grid">
      ${vocabBank
        .map(
          (v) => `
        <div class="vocab-card">
          <div class="vocab-card-head">
            <span class="vocab-term">${v.term}</span>
            <span class="vocab-badge">${v.lesson} • ${v.badge}</span>
          </div>
          <p class="vocab-desc">${v.definition}</p>
          <p class="vocab-evidence"><strong>Real Wartime Clue:</strong> ${v.evidence.replace(/^Real Wartime Clue:\s*/i, '')}</p>
          <p class="vocab-mechanism"><strong>Why It Changed Britain:</strong> ${v.mechanism.replace(/^Why It Changed Britain:\s*/i, '')}</p>
        </div>`,
        )
        .join('')}
    </div>

    <div class="big-picture-card">
      <div class="big-picture-header">
        <span class="big-picture-title">Big Picture Historical Thinking • Overarching Enquiry</span>
        <span class="vocab-badge">Synoptic Synthesis</span>
      </div>
      <div class="big-picture-question">
        &ldquo;How did World War II transform children's lives in Britain and Europe?&rdquo;
      </div>
      <div class="big-picture-prompts">
        <div class="bp-prompt">
          <strong>1. Disruption:</strong> How did gas masks, blackouts, and evacuation upend ordinary childhood routines and family life?
        </div>
        <div class="bp-prompt">
          <strong>2. Resilience:</strong> How did communities, families, and children pull together to overcome danger, bombings, and food shortages?
        </div>
        <div class="bp-prompt">
          <strong>3. Legacy:</strong> Why is it vital to preserve the stories of refugees, evacuees, codebreakers, and rescuers for future generations?
        </div>
      </div>
    </div>

    <div class="running-footer">
      <span>The History Revision Hub • Disciplinary History Series • KS2 Companion Reader</span>
      <span class="page-pill">Page 16</span>
    </div>
  </div>

</body>
</html>`;
}

async function renderKs2Ww2Textbook() {
  console.log('='.repeat(75));
  console.log('🚀 Compiling 16-Page Master Classroom Textbook for KS2 [ks2_ww2]...');
  console.log('   Standard: Model 1 Single Wide-Margin Column Pure Narrative Standard');
  console.log('='.repeat(75));

  const html = buildHtml();

  const publicDir = path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const rootDir = path.join(ROOT_DIR, 'units', 'ks2_ww2');
  if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir, { recursive: true });

  const pdfDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

  const publicHtmlPath = path.join(publicDir, 'textbook.html');
  const publicPublisherHtmlPath = path.join(publicDir, 'textbook_PUBLISHER.html');
  const unitsHtmlPath = path.join(rootDir, 'textbook.html');
  const pdfOutPath = path.join(pdfDir, 'ks2_ww2_textbook_FINAL.pdf');
  const pdfCompatPath = path.join(pdfDir, 'ks2_ww2_textbook.pdf');

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  fs.writeFileSync(publicPublisherHtmlPath, html, 'utf8');
  fs.writeFileSync(unitsHtmlPath, html, 'utf8');
  console.log(`✅ Saved 16-Page Textbook HTML to: ${publicHtmlPath}`);

  // Launch Puppeteer with Chrome
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--allow-file-access-from-files', '--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600 });
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 120000 });

    // Dynamic In-Memory Typography Calibration with KS2 Profile
    console.log(
      '\n[Auto-Balancer] Dynamically calibrating font metrics (KS2 Profile: 11.5pt–13.0pt)...',
    );
    try {
      await autoBalanceTextbook(page, { keyStage: 'KS2', pageSelector: '.page' });
      const calibratedHtml = await page.content();
      fs.writeFileSync(publicHtmlPath, calibratedHtml, 'utf8');
      fs.writeFileSync(publicPublisherHtmlPath, calibratedHtml, 'utf8');
      fs.writeFileSync(unitsHtmlPath, calibratedHtml, 'utf8');
    } catch (e) {
      console.warn('⚠️ Auto-calibrate note:', e.message);
    }

    // Run automated space budget audit
    console.log('\n🔍 Running Automated Space Budget Audit on 16-Page KS2 Textbook...');
    const audit = await auditPageBudget(page, {
      underflowThresholdPx: 60,
      pageSelector: '.page',
    });
    printSpaceAuditReport(audit, 'ks2_ww2_textbook.html');

    // Export PDF
    await page.pdf({
      path: pdfOutPath,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    fs.copyFileSync(pdfOutPath, pdfCompatPath);
    console.log(`🎉 Successfully generated 16-Page Master Textbook PDF at: ${pdfOutPath}`);
    console.log(`📄 Copied to: ${pdfCompatPath}`);

    return audit;
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  renderKs2Ww2Textbook().catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });
}

module.exports = { buildHtml, renderKs2Ww2Textbook, run: renderKs2Ww2Textbook };
