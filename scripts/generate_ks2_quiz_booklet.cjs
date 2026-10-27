/**
 * generate_ks2_quiz_booklet.cjs
 *
 * Compiles the 4-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Key Stage 2: World War II & The Home Front (1939–1945).
 *
 * Reprographic Architecture (4-Page Saddle-Stitch Format / 1 Folded A3 Sheet):
 * - Page 1: Master Front Cover, Hero Archival Plate, Instructions Banner,
 *           Dual-Attempt Knowledge Tracking Ledger (ZERO RAG) & 4-Pillar Historical Anchor Bar.
 * - Page 2: Part 1 Retrieval Drills • Enquiries 1 to 5 (Questions 1 to 20)
 *           + Q1 Bracketed Warm-Ups + Connective Stems + Bottom Key Term Vault.
 * - Page 3: Part 2 Retrieval Drills • Enquiries 6 to 10 (Questions 21 to 40)
 *           + Q1 Bracketed Warm-Ups + Connective Stems + Bottom Key Term Vault.
 * - Page 4: Master Department Marking Bank (All 40 Questions)
 *           + Full-Width Historical Vocabulary & Disciplinary Concepts Vault (Zero DIRT / Zero Performative Lines).
 *
 * Strict School Anonymity: 100% Institutional Neutrality under 'The History Revision Hub'.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');
const UNIT_DIR = path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2');
const LOCAL_UNIT_DIR = path.join(ROOT_DIR, 'units', 'ks2_ww2');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const KS2_PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs', 'ks2_ww2');

if (!fs.existsSync(PDFS_DIR)) fs.mkdirSync(PDFS_DIR, { recursive: true });
if (!fs.existsSync(KS2_PDFS_DIR)) fs.mkdirSync(KS2_PDFS_DIR, { recursive: true });
if (!fs.existsSync(UNIT_DIR)) fs.mkdirSync(UNIT_DIR, { recursive: true });

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'units', 'ks2_ww2', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'ks2_ww2', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'ks2_ww2', path.basename(clean)),
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
// 40 RIGOROUS QUESTIONS ACROSS ALL 10 ENQUIRIES (WITH WARM-UP SCAFFOLDING)
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  {
    enquiry: 1,
    title: '1. Outbreak 1939 & Home Front Mobilisation',
    shortTitle: 'Outbreak & Gas Masks',
    narrative: "Chamberlain's Broadcast • 38 Million Gas Masks • Blackout Drills",
    pageRef: 'p. 2 • Q1–4',
    items: [
      {
        q: 'On what date did Prime Minister Neville Chamberlain announce that Britain was at war with Germany? [ 3 September 1939 / 11 November 1918 ]',
        a: '3 September 1939 (at 11:15am)',
        exp: "Chamberlain broadcast from 10 Downing Street after Hitler ignored Britain's ultimatum to withdraw from Poland.",
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'How many million civilian gas masks in cardboard boxes did the British government distribute in 1939?',
        a: '38 million gas masks',
        exp: 'Fearing poison gas bombs remembered from the First World War, the government issued gas masks to every citizen.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Why did volunteer ARP wardens enforce the blackout so strictly across British cities?',
        a: 'To prevent German bomber pilots from seeing streetlights or illuminated landmarks at night',
        exp: 'Every window had to be covered with heavy black curtains so enemy bombers flying in darkness could not navigate.',
        tier: 'Silver',
        stem: 'Because...',
      },
      {
        q: 'How did carrying a gas mask change the daily school routine for British children?',
        a: 'Children carried the cardboard box on their shoulder everywhere and practiced wearing respirators in regular drills',
        exp: 'Pupils could not enter school or board buses without their box, practicing reading and writing while wearing rubber masks.',
        tier: 'Gold',
        stem: 'This meant that...',
      },
    ],
  },
  {
    enquiry: 2,
    title: '2. Operation Pied Piper & British Evacuation',
    shortTitle: 'The Evacuation Experience',
    narrative: "Operation Pied Piper • Railway Luggage Labels • Billeting Officers",
    pageRef: 'p. 2 • Q5–8',
    items: [
      {
        q: 'What official code name was given to the government’s evacuation plan in September 1939? [ Operation Pied Piper / Operation Dynamo ]',
        a: 'Operation Pied Piper',
        exp: 'In four days, 1.5 million schoolchildren, teachers, and mothers with babies were evacuated to rural reception areas.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'Why did authorities attach cardboard luggage labels directly onto children’s coats?',
        a: 'So billeting officers and volunteers could immediately identify bewildered children at busy railway stations',
        exp: "Labels recorded each child's name, home address, school, and destination station to keep classes and families organized.",
        tier: 'Silver',
        stem: 'So that...',
      },
      {
        q: 'What was the official title of the local person responsible for finding foster homes for arriving evacuees?',
        a: 'The Billeting Officer',
        exp: 'Billeting officers inspected village cottages and assigned children to foster families, often in local village halls.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Why was evacuation both an exciting adventure and a heartbreaking separation for families?',
        a: 'Children discovered green fields and farm animals, but suffered deep homesickness separated from parents',
        exp: 'Many city children had never seen cows or orchards, but missed their mothers and fathers with only letters to stay in touch.',
        tier: 'Gold',
        stem: 'Because...',
      },
    ],
  },
  {
    enquiry: 3,
    title: "3. Vera's Journey & The Kindertransport",
    shortTitle: 'The Kindertransport Rescue',
    narrative: "Kristallnacht (1938) • 10,000 Refugee Children • One Small Suitcase",
    pageRef: 'p. 2 • Q9–12',
    items: [
      {
        q: 'Following which violent event in November 1938 did Britain agree to accept child refugees? [ The November Pogrom (Kristallnacht) / The Blitz ]',
        a: 'The November Pogrom (Kristallnacht)',
        exp: 'After widespread violent Nazi attacks against Jewish homes and synagogues, Britain permitted unaccompanied child refugees.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'Approximately how many predominantly Jewish refugee children were rescued on the Kindertransport?',
        a: 'Nearly 10,000 children (approx. 9,354)',
        exp: 'Rescue trains brought children from Germany, Austria, and Czechoslovakia to the Netherlands and by ferry to Harwich.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'How many suitcases was each child permitted to pack when boarding the rescue train?',
        a: 'Only one small suitcase',
        exp: 'Nazi authorities strictly limited children to one bag with clothes and keepsakes; no money or valuables were allowed.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Why did children like 9-year-old Vera Schaufeld wear a numbered identity card around their neck?',
        a: 'To allow British volunteers and foster families to identify the correct child upon arrival in London',
        exp: 'Most children spoke only German or Czech; their numbered neck tags matched records held at Liverpool Street Station.',
        tier: 'Gold',
        stem: 'So that...',
      },
    ],
  },
  {
    enquiry: 4,
    title: '4. The Blitz & Air Raid Shelters',
    shortTitle: 'The Blitz & Shelters',
    narrative: "57 Nights of the Blitz • Anderson Garden Shelters • Tube Station Platforms",
    pageRef: 'p. 2 • Q13–16',
    items: [
      {
        q: 'For how many consecutive nights was the city of London bombed during the Blitz in 1940? [ 57 consecutive nights / 7 consecutive nights ]',
        a: '57 consecutive nights',
        exp: 'Between September 1940 and May 1941, German bombers attacked London and industrial ports to crush civilian morale.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'Name the garden air raid shelter made of curved corrugated steel covered with soil.',
        a: 'The Anderson shelter',
        exp: 'Over 3 million Anderson shelters were distributed free to low-income families to bury in back gardens.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Which indoor steel-cage shelter was designed to be built inside a room and double as a dining table?',
        a: 'The Morrison shelter',
        exp: 'Designed by Herbert Morrison, this steel cage protected families in homes without gardens from falling debris.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Where did over 150,000 London civilians choose to sleep each night to escape the bombing?',
        a: 'On Underground tube station platforms',
        exp: 'Civilians camped along deep tube platforms where dozens of feet of earth protected them from explosive bomb blasts.',
        tier: 'Gold',
        stem: null,
      },
    ],
  },
  {
    enquiry: 5,
    title: '5. Blackout & ARP Wardens',
    shortTitle: 'Blackout & ARP Wardens',
    narrative: "Air Raid Precautions • 'Put That Light Out!' • Wailing Warning Sirens",
    pageRef: 'p. 2 • Q17–20',
    items: [
      {
        q: 'What does the abbreviation "ARP" stand for in Second World War Britain? [ Air Raid Precautions / Armed Royal Patrol ]',
        a: 'Air Raid Precautions',
        exp: 'ARP wardens were civilian volunteers who patrolled streets, directed people to shelters, and gave first aid.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'What warning phrase did ARP wardens shout when spotting a chink of light from a window?',
        a: '"Put that light out!"',
        exp: 'Wardens patrolled streets on foot and bicycle checking for light leaks that could guide enemy bombers.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'What did town councils paint white on streets and trees to help pedestrians walk in the dark?',
        a: 'Curbs, lampposts, tree trunks, and car bumpers',
        exp: 'Because streetlights and normal car headlights were banned, white paint prevented accidents in total darkness.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'What sound warned that an enemy air raid was approaching, and what sound signalled the danger had passed?',
        a: 'A rising and falling wailing siren (warning), followed by a continuous single-pitch tone (All Clear)',
        exp: 'Sirens were mounted on police stations and town halls to give people enough time to enter shelters.',
        tier: 'Gold',
        stem: null,
      },
    ],
  },
  {
    enquiry: 6,
    title: '6. Dig for Victory & Food Rationing',
    shortTitle: 'Rationing & Dig for Victory',
    narrative: "Atlantic U-Boat Blockade • The Ration Book • 'Dig for Victory' Gardens",
    pageRef: 'p. 3 • Q21–24',
    items: [
      {
        q: 'Why did Britain introduce food rationing in January 1940? [ German U-boats sank merchant cargo ships / Britain ran out of money ]',
        a: 'German U-boats sank merchant cargo ships in the Atlantic, causing dangerous food shortages',
        exp: 'Britain imported 55 million tonnes of food yearly; rationing guaranteed equal, fair shares for every civilian.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'What was the official document containing tear-out coupons that every citizen had to carry to buy food?',
        a: 'The Ration Book',
        exp: 'Coupons were registered with local shopkeepers who stamped or clipped them when buying meat, butter, and sugar.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'What nationwide campaign urged families to turn flowerbeds and parks into vegetable allotments?',
        a: '"Dig for Victory"',
        exp: 'The government urged families to grow potatoes and cabbages, producing over 3 million tonnes of domestic food.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Why was throwing away leftover food made a criminal offence punishable by fines during wartime?',
        a: 'Because waste squandered supplies that Merchant Navy sailors had risked their lives to bring across the ocean',
        exp: 'Wasting food was treated as helping the enemy; kitchen scraps were collected in pig swill bins to feed livestock.',
        tier: 'Gold',
        stem: 'Because...',
      },
    ],
  },
  {
    enquiry: 7,
    title: '7. Women at War & The Land Army',
    shortTitle: 'Women at War',
    narrative: "The Women's Land Army • Aircraft Assembly Lines • Breaking Gender Barriers",
    pageRef: 'p. 3 • Q25–28',
    items: [
      {
        q: 'What popular nickname was given to the 80,000 volunteers who joined the Women’s Land Army? [ "Land Girls" / "Wren Cadets" ]',
        a: '"Land Girls"',
        exp: 'Land Girls worked 50-hour weeks milking cows, ploughing fields, driving tractors, and harvesting food across Britain.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'Name the specialized branch of the Women’s Land Army who worked in forestry felling timber.',
        a: 'The "Lumber Jills" (Women’s Timber Corps)',
        exp: 'Over 6,000 women operated heavy crosscut saws and worked in sawmills to produce timber for pit props and construction.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Name two vital roles women performed in wartime Britain outside of agricultural farming.',
        a: 'Assembling aircraft in factories, driving ambulances, operating radar, or codebreaking at Bletchley Park',
        exp: 'Women entered heavy industry, engineering, and the auxiliary armed services (ATS, WAAF, WRNS) in record numbers.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'How did wartime service permanently alter women’s position in British society?',
        a: 'It proved women could master skilled, demanding jobs equally with men, accelerating the move toward equality',
        exp: 'Earning independent wages and running vital national infrastructure challenged outdated domestic stereotypes.',
        tier: 'Gold',
        stem: 'It proved that...',
      },
    ],
  },
  {
    enquiry: 8,
    title: '8. Pre-War Everyday Life & Rights Lost',
    shortTitle: 'Pre-War Life & Lost Rights',
    narrative: "Pre-War Jewish Life • Nuremberg Anti-Jewish Laws • Rights & Freedom Stripped",
    pageRef: 'p. 3 • Q29–32',
    items: [
      {
        q: 'Approximately how many Jewish people lived across the cities and towns of Europe before 1939? [ Over 9 million / Under 50,000 ]',
        a: 'Over 9 million Jewish people',
        exp: 'Jewish families lived in 21 European countries, attending ordinary schools, playing sports, and running businesses.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'What traditional cardboard cone filled with sweets did German children carry on their first school day?',
        a: 'A Schultüte (school cone)',
        exp: 'The Schultüte celebrated entering school and was cherished by German children of all backgrounds before Nazi rule.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'In what year were Jewish pupils completely banned from attending state schools in Germany?',
        a: 'November 1938',
        exp: 'Following the November Pogrom, Nazi decrees expelled all Jewish children from state schools into segregation.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'How did discriminatory laws systematically strip away ordinary childhood joys between 1933 and 1939?',
        a: 'Jewish children were banned from sports clubs, swimming pools, public parks, riding bicycles, and owning pets',
        exp: 'Step-by-step exclusion isolated Jewish children from friends and public life long before deportations began.',
        tier: 'Gold',
        stem: 'This meant that...',
      },
    ],
  },
  {
    enquiry: 9,
    title: '9. Bletchley Park & Codebreakers',
    shortTitle: 'Bletchley Park Codebreakers',
    narrative: "The Enigma Cipher • Alan Turing's Bombe • Top-Secret Women of Station X",
    pageRef: 'p. 3 • Q33–36',
    items: [
      {
        q: 'What was the name of the German electro-mechanical cipher machine used to scramble secret orders? [ The Enigma machine / The Telegraph ]',
        a: 'The Enigma machine',
        exp: 'Enigma used rotating wheels and a plugboard to scramble text into billions of mathematical code combinations.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'Which Buckinghamshire country estate served as Britain’s top-secret codebreaking headquarters?',
        a: 'Bletchley Park (Station X)',
        exp: 'Over 10,000 codebreakers, mathematicians, and service personnel worked in wooden huts intercepting enemy radio signals.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Name the brilliant mathematician who designed the "Bombe" machines to crack Enigma codes.',
        a: 'Alan Turing',
        exp: 'Turing and his team designed electromechanical Bombe machines that tested rotor positions in minutes.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'What percentage of the Bletchley Park workforce were women, and how long was their work kept secret?',
        a: 'About 75% were women, and their work was kept secret for over 30 years (until the 1970s)',
        exp: 'Women operated complex Bombe machines and decoded messages, strictly obeying the Official Secrets Act.',
        tier: 'Gold',
        stem: null,
      },
    ],
  },
  {
    enquiry: 10,
    title: '10. Rescuers, VE Day & Remembrance',
    shortTitle: 'Rescuers, VE Day & Legacy',
    narrative: "Sir Nicholas Winton • Upstanders vs Bystanders • VE Day Street Celebrations",
    pageRef: 'p. 3 • Q37–40',
    items: [
      {
        q: 'Who was the 29-year-old London stockbroker who organized rescue trains saving 669 Czech children? [ Nicholas Winton / Winston Churchill ]',
        a: 'Nicholas Winton (later Sir Nicholas Winton)',
        exp: 'Winton cancelled a Swiss holiday in December 1938, opened an office in Prague, and arranged British foster homes.',
        tier: 'Bronze',
        stem: null,
      },
      {
        q: 'What is the definition of an "upstander" in historical studies?',
        a: 'A person who takes active moral action to help or defend others in danger rather than remaining a bystander',
        exp: 'Upstanders like Winton, Trevor Chadwick, and volunteer foster parents actively stepped forward to rescue innocent children.',
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'What does "VE Day" stand for, and on what exact date was it celebrated across Britain in 1945?',
        a: 'Victory in Europe Day, celebrated on 8 May 1945',
        exp: "Following Germany's surrender, a national holiday was declared with joyful street parties and community feasts.",
        tier: 'Silver',
        stem: null,
      },
      {
        q: 'Why is it vital that we continue to remember the courage and sacrifices of the Second World War generation?',
        a: 'To honour those who defended freedom, protect democracy, and learn from past atrocities to prevent prejudice',
        exp: 'Remembrance ensures younger generations understand that freedom and human dignity must be protected.',
        tier: 'Gold',
        stem: 'To ensure that...',
      },
    ],
  },
];

async function compileQuizBookletHtml() {
  const heroImageBase64 = getBase64Image('evacuees_railway_1939.jpg') || '';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Key Stage 2 History: World War II &amp; The Home Front — Knowledge Retrieval Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    :root {
      --ink-primary: #0f172a;
      --ink-muted: #475569;
      --navy-deep: #1e3a8a;
      --navy-light: #eff6ff;
      --border-gray: #cbd5e1;
      --bg-warm: #ffffff;
      --line-color: #94a3b8;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: var(--ink-primary);
      background: #e2e8f0;
      line-height: 1.35;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .a4-page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      padding: 6.5mm 10.5mm 5.5mm 10.5mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      page-break-after: always;
      box-sizing: border-box;
    }
    @media print {
      body { background: transparent; }
      .a4-page { margin: 0; box-shadow: none; page-break-after: always; }
    }

    /* Common Header & Masthead */
    .sheet-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.4mm;
      margin-bottom: 1.6mm;
    }
    .brand-left {
      display: flex;
      align-items: center;
      gap: 3mm;
    }
    .brand-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-weight: 800;
      font-size: 7.4pt;
      padding: 1.1mm 3mm;
      border-radius: 3px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .brand-text {
      font-size: 8.4pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
    .masthead-right {
      font-size: 7.2pt;
      font-weight: 700;
      color: var(--ink-muted);
      letter-spacing: 0.04em;
    }

    /* Page 1: Cover Header & Title */
    .cover-top-box {
      text-align: center;
      margin-bottom: 1.8mm;
    }
    .cover-date-pill {
      display: inline-block;
      background: #eff6ff;
      color: #1e3a8a;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 0.7mm 3.5mm;
      border-radius: 12px;
      border: 1px solid #bfdbfe;
      margin-bottom: 1.2mm;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .cover-main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 19pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      letter-spacing: -0.01em;
      margin-bottom: 0.8mm;
    }
    .cover-subtitle {
      font-size: 8.8pt;
      font-weight: 700;
      color: #2563eb;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* Cover Hero Plate */
    .cover-plate-box {
      border: 1.5px solid var(--border-gray);
      border-radius: 6px;
      padding: 1.8mm;
      background: #f8fafc;
      text-align: center;
      margin-bottom: 1.8mm;
    }
    .cover-hero-img {
      max-height: 48mm;
      max-width: 100%;
      object-fit: contain;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
      display: block;
      margin: 0 auto;
    }
    .cover-plate-caption {
      font-size: 6.8pt;
      color: #475569;
      font-style: italic;
      margin-top: 1.0mm;
    }

    /* Student ID Box */
    .id-block {
      border: 1.2px solid var(--border-gray);
      border-radius: 5px;
      background: #ffffff;
      padding: 1.8mm 3.5mm;
      margin-bottom: 1.8mm;
      display: grid;
      grid-template-columns: 1.2fr 1.2fr 1fr;
      gap: 2mm 5mm;
      font-size: 7.8pt;
    }
    .id-field {
      display: flex;
      align-items: baseline;
      gap: 2mm;
    }
    .id-label {
      font-weight: 700;
      color: var(--navy-deep);
      white-space: nowrap;
    }
    .id-line {
      flex-grow: 1;
      border-bottom: 1px dotted #94a3b8;
      height: 3.5mm;
    }

    /* Instructions Banner */
    .instructions-banner {
      background: #f1f5f9;
      border-left: 3.5px solid #2563eb;
      border-radius: 0 4px 4px 0;
      padding: 1.4mm 3mm;
      margin-bottom: 1.8mm;
      display: flex;
      align-items: center;
      gap: 2.5mm;
      font-size: 6.9pt;
      color: #1e293b;
      line-height: 1.3;
    }
    .inst-badge {
      background: #2563eb;
      color: #ffffff;
      font-weight: 800;
      font-size: 6.2pt;
      padding: 0.8mm 2mm;
      border-radius: 3px;
      letter-spacing: 0.05em;
      white-space: nowrap;
      text-transform: uppercase;
    }

    /* Tracking Ledger Table (NO RAG) */
    .ledger-header {
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1.0mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tracking-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.2pt;
      margin-bottom: 1.8mm;
    }
    .tracking-table th {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1.5mm 2.0mm;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      border: 1px solid #1e3a8a;
      text-align: center;
      font-size: 6.9pt;
    }
    .tracking-table td {
      border: 1px solid var(--border-gray);
      padding: 0.9mm 2.0mm;
      text-align: center;
      vertical-align: middle;
    }
    .tracking-table td.title-col {
      text-align: left;
      color: #1e293b;
    }
    .ks2-td-title {
      font-weight: 800;
      color: #0f172a;
      font-size: 7.0pt;
      line-height: 1.15;
    }
    .ks2-td-narrative {
      font-size: 5.7pt;
      font-weight: 600;
      color: #475569;
      line-height: 1.15;
      margin-top: 0.8px;
    }
    .tracking-table td.page-col {
      color: #64748b;
      font-weight: 600;
      font-size: 6.8pt;
    }

    /* Clean Academic Mastery Strip (Replaces RAG) */
    .mastery-standard-strip {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      padding: 1.4mm 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.8pt;
      font-weight: 600;
      color: #334155;
      margin-bottom: 1.8mm;
    }
    .standard-item {
      display: inline-flex;
      align-items: center;
      gap: 1.5mm;
    }
    .badge-mastery {
      font-weight: 800;
      color: #166534;
      background: #dcfce7;
      padding: 1px 5px;
      border-radius: 3px;
    }
    .badge-secure {
      font-weight: 800;
      color: #1e40af;
      background: #dbeafe;
      padding: 1px 5px;
      border-radius: 3px;
    }
    .badge-review {
      font-weight: 800;
      color: #92400e;
      background: #fef3c7;
      padding: 1px 5px;
      border-radius: 3px;
    }

    /* 4-Pillar Historical Anchor Bar (Page 1) */
    .pillars-anchor-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2mm;
      border: 1.2px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 4px;
      padding: 1.6mm 2.2mm;
    }
    .pillar-col {
      display: flex;
      flex-direction: column;
      gap: 0.6mm;
      border-right: 1px solid #e2e8f0;
      padding-right: 1.5mm;
    }
    .pillar-col:last-child {
      border-right: none;
      padding-right: 0;
    }
    .pillar-title {
      font-weight: 800;
      font-size: 6.8pt;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .pillar-desc {
      font-size: 6.2pt;
      line-height: 1.25;
      color: #475569;
    }

    /* Enquiry Cards (Pages 2 & 3: 5 Enquiries Per Page) */
    .page-overview-bar {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      color: #ffffff;
      padding: 1.0mm 2.8mm;
      border-radius: 4px;
      margin-bottom: 1.0mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.0pt;
      font-weight: 700;
    }
    .enquiry-card {
      border: 1.2px solid var(--border-gray);
      border-radius: 4px;
      padding: 1.0mm 2.2mm 0.8mm 2.2mm;
      margin-bottom: 0.8mm;
      background: #ffffff;
    }
    .enquiry-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.5mm;
      margin-bottom: 0.6mm;
    }
    .enquiry-badge-num {
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
      font-weight: 800;
      font-size: 6.8pt;
      padding: 0.3mm 1.6mm;
      border-radius: 3px;
      text-transform: uppercase;
    }
    .enquiry-card-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.6pt;
      font-weight: 700;
      color: #0f172a;
    }
    .enquiry-score-pill {
      font-size: 6.6pt;
      font-weight: 700;
      color: #1e3a8a;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 0.3mm 1.8mm;
      border-radius: 4px;
    }
    .questions-grid {
      display: flex;
      flex-direction: column;
      gap: 0.6mm;
    }
    .q-item {
      display: flex;
      flex-direction: column;
      gap: 0.3mm;
    }
    .q-header-row {
      display: flex;
      align-items: baseline;
      gap: 1.6mm;
      font-size: 8.0pt;
      line-height: 1.2;
    }
    .q-tier-badge {
      font-weight: 800;
      font-size: 5.8pt;
      padding: 0.3mm 1.2mm;
      border-radius: 2px;
      white-space: nowrap;
      text-transform: uppercase;
    }
    .tier-bronze { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
    .tier-silver { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
    .tier-gold { background: #fef08a; color: #854d0e; border: 1px solid #fde047; }
    .q-num-text {
      font-weight: 600;
      color: #1e293b;
    }
    .q-num-text strong {
      color: #0f172a;
      font-weight: 700;
    }
    .q-option-choice {
      font-weight: 700;
      color: #1e40af;
      background: #eff6ff;
      padding: 0.2mm 1.2mm;
      border-radius: 3px;
      border: 1px solid #dbeafe;
    }
    .q-line-wrap {
      display: flex;
      align-items: flex-end;
      gap: 1.8mm;
      height: 3.8mm;
      width: 100%;
    }
    .q-stem {
      font-size: 7.4pt;
      font-style: italic;
      font-weight: 700;
      color: #2563eb;
      white-space: nowrap;
      line-height: 1;
      padding-bottom: 0.6mm;
    }
    .q-writing-line {
      flex-grow: 1;
      border-bottom: 1.1px dashed #94a3b8;
      height: 100%;
    }

    /* Page Key Term Vault (Pages 2 & 3) */
    .page-keyterm-vault {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      padding: 1.0mm 2.5mm;
      display: flex;
      align-items: center;
      gap: 2.5mm;
      margin-top: 0.8mm;
    }
    .vault-tag {
      background: #1e3a8a;
      color: #ffffff;
      font-weight: 800;
      font-size: 6.0pt;
      padding: 0.5mm 2.0mm;
      border-radius: 3px;
      letter-spacing: 0.04em;
      white-space: nowrap;
      text-transform: uppercase;
    }
    .vault-terms {
      font-size: 6.7pt;
      color: #334155;
      font-weight: 600;
      line-height: 1.2;
    }

    /* Page 4: Marking Bank */
    .bank-header-bar {
      background: #78350f;
      color: #ffffff;
      padding: 1.3mm 3mm;
      border-radius: 4px;
      margin-bottom: 1.4mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      font-weight: 700;
    }
    .marking-grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.4mm 3.2mm;
      margin-bottom: 1.6mm;
    }
    .answer-enquiry-block {
      border: 1px solid #fed7aa;
      border-radius: 3px;
      padding: 1.1mm 2.2mm;
      background: #fffdfa;
      margin-bottom: 1.1mm;
    }
    .answer-enquiry-header {
      font-size: 7.2pt;
      font-weight: 800;
      color: #92400e;
      border-bottom: 1px solid #fed7aa;
      padding-bottom: 0.4mm;
      margin-bottom: 0.6mm;
      display: flex;
      justify-content: space-between;
    }
    .answer-item {
      font-size: 6.7pt;
      line-height: 1.25;
      margin-bottom: 0.5mm;
    }
    .answer-q-tag {
      font-weight: 800;
      color: #1e3a8a;
    }
    .answer-bold {
      font-weight: 700;
      color: #0f172a;
    }
    .answer-exp {
      color: #64748b;
      font-size: 6.1pt;
      margin-left: 2px;
    }

    /* Page 4: Full-Width Historical Vocabulary & Disciplinary Concepts Vault */
    .p4-bottom-vault {
      border: 1.2px solid #bfdbfe;
      border-radius: 4px;
      background: #f8fafc;
      padding: 1.8mm 2.5mm;
      display: flex;
      flex-direction: column;
      gap: 1.2mm;
    }
    .p4-vault-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #bfdbfe;
      padding-bottom: 0.8mm;
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e40af;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .p4-vault-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5mm 3.0mm;
      font-size: 6.3pt;
      line-height: 1.25;
      color: #334155;
    }
    .p4-vault-item strong {
      color: #1e3a8a;
      font-weight: 800;
    }
    .p4-vault-verification-bar {
      border-top: 1px solid #e2e8f0;
      padding-top: 0.8mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.2pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Common Footer */
    .sheet-footer {
      border-top: 1px solid var(--border-gray);
      padding-top: 1.2mm;
      margin-top: 1.0mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.8pt;
      color: #64748b;
    }
  </style>
</head>
<body>

  <!-- ========================================================================= -->
  <!-- PAGE 1: FRONT COVER & DUAL-ATTEMPT KNOWLEDGE TRACKING LEDGER (NO RAG)     -->
  <!-- ========================================================================= -->
  <div class="a4-page" id="page-1">
    <div>
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">THE HISTORY REVISION HUB</span>
          <span class="brand-text">Key Stage 2 History</span>
        </div>
        <div class="masthead-right">1939–1945 • NATIONAL CURRICULUM COMPLIANT</div>
      </div>

      <div class="cover-top-box">
        <span class="cover-date-pill">Curriculum Retrieval Standard • 40 Recall Checkpoints</span>
        <h1 class="cover-main-title">WORLD WAR II &amp; THE HOME FRONT</h1>
        <p class="cover-subtitle">Master Knowledge Retrieval &amp; Assessment Companion</p>
      </div>

      <div class="cover-plate-box">
        ${heroImageBase64 ? `<img src="${heroImageBase64}" class="cover-hero-img" alt="Evacuee luggage tag check 1939">` : ''}
        <div class="cover-plate-caption">Primary Archival Record: A London police sergeant checks the luggage label of a young evacuee at a railway station before departure, September 1939 (IWM).</div>
      </div>

      <div class="id-block">
        <div class="id-field"><span class="id-label">Pupil Name:</span> <div class="id-line"></div></div>
        <div class="id-field"><span class="id-label">Class / Teacher:</span> <div class="id-line"></div></div>
        <div class="id-field"><span class="id-label">Target Score:</span> <span style="font-weight:800; color:#1e3a8a;">____ / 40</span></div>
      </div>

      <div class="instructions-banner">
        <span class="inst-badge">RETRIEVAL PRACTICE GUIDE</span>
        <span><strong>Attempt 1 (Solo):</strong> Complete from memory in blue or black ink. Peer-mark in green pen using Page 4. &bull; <strong>Attempt 2 (Spaced):</strong> Re-test unmastered checkpoints after 48 hours.</span>
      </div>

      <div class="ledger-header">
        <span>10-Enquiry Knowledge Tracking Ledger</span>
        <span style="font-size:7.2pt; color:#1e3a8a; font-weight:700;">Target: 40/40 Mastery Standard</span>
      </div>

      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 7%;">Enq</th>
            <th style="width: 41%; text-align: left;">Historical Enquiry Focus</th>
            <th style="width: 12%;">Page Ref</th>
            <th style="width: 13%;">Att 1 Score</th>
            <th style="width: 13%;">Att 2 Score</th>
            <th style="width: 14%;">Parent / Teacher Sign</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (q) => `
            <tr>
              <td><strong>${q.enquiry < 10 ? '0' + q.enquiry : q.enquiry}</strong></td>
              <td class="title-col">
                <div class="ks2-td-title">${q.title}</div>
                <div class="ks2-td-narrative">${q.narrative}</div>
              </td>
              <td class="page-col">${q.pageRef}</td>
              <td><strong>____ / 4</strong></td>
              <td><strong>____ / 4</strong></td>
              <td></td>
            </tr>
          `,
          ).join('')}
        </tbody>
      </table>

      <div class="mastery-standard-strip">
        <span class="standard-item"><span class="badge-mastery">Greater Depth: 36–40 / 40</span> Secure recall from long-term memory.</span>
        <span class="standard-item"><span class="badge-secure">Expected Standard: 30–35 / 40</span> Solid understanding of wartime events.</span>
        <span class="standard-item"><span class="badge-review">Focused Review: &le; 29 / 40</span> Review answers on Page 4.</span>
      </div>

      <div class="pillars-anchor-box">
        <div class="pillar-col">
          <span class="pillar-title">1. Total Mobilisation</span>
          <span class="pillar-desc">State control of civilian life, mass evacuation, blackout regulations, and food rationing.</span>
        </div>
        <div class="pillar-col">
          <span class="pillar-title">2. Civilian Resilience</span>
          <span class="pillar-desc">Anderson &amp; Morrison shelters, ARP wardens, volunteer services, and enduring the Blitz.</span>
        </div>
        <div class="pillar-col">
          <span class="pillar-title">3. Industrial Labour</span>
          <span class="pillar-desc">Women's Land Army ('Land Girls'), aircraft assembly lines, timber felling, and radar.</span>
        </div>
        <div class="pillar-col">
          <span class="pillar-title">4. Moral Courage</span>
          <span class="pillar-desc">Nicholas Winton, the Kindertransport rescue, Bletchley codebreakers, and VE Day.</span>
        </div>
      </div>
    </div>

    <div class="sheet-footer">
      <span>The History Revision Hub • Independent Commercial Curriculum Standard</span>
      <span>Front Cover &amp; Mastery Ledger • Page 1 of 4</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 2: PART 1 RETRIEVAL DRILLS • ENQUIRIES 1 TO 5 (QUESTIONS 1 TO 20)    -->
  <!-- ========================================================================= -->
  <div class="a4-page" id="page-2">
    <div>
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">PART 1 DRILL</span>
          <span class="brand-text">Enquiries 01 to 05</span>
        </div>
        <div class="masthead-right">KS2 WWII RETRIEVAL • QUESTIONS 1–20</div>
      </div>

      <div class="page-overview-bar">
        <span>Part 1: The Outbreak, Evacuation, Kindertransport, The Blitz &amp; Blackout</span>
        <span>20 Marks Available</span>
      </div>

      ${QUIZ_DATA.slice(0, 5)
        .map(
          (enq) => `
        <div class="enquiry-card">
          <div class="enquiry-card-header">
            <div style="display:flex; align-items:center; gap:2mm;">
              <span class="enquiry-badge-num">ENQUIRY 0${enq.enquiry}</span>
              <span class="enquiry-card-title">${enq.title}</span>
            </div>
            <span class="enquiry-score-pill">Score: ____ / 4</span>
          </div>

          <div class="questions-grid">
            ${enq.items
              .map((it, idx) => {
                const qNum = (enq.enquiry - 1) * 4 + idx + 1;
                let formattedPrompt = it.q;
                if (formattedPrompt.includes('[')) {
                  const parts = formattedPrompt.split('[');
                  formattedPrompt = `${parts[0]} <span class="q-option-choice">[ ${parts[1]}</span>`;
                }
                return `
              <div class="q-item">
                <div class="q-header-row">
                  <span class="q-tier-badge ${it.tier === 'Bronze' ? 'tier-bronze' : it.tier === 'Silver' ? 'tier-silver' : 'tier-gold'}">${it.tier}</span>
                  <span class="q-num-text"><strong>${qNum}.</strong> ${formattedPrompt}</span>
                </div>
                <div class="q-line-wrap">
                  ${it.stem ? `<span class="q-stem">${it.stem}</span>` : ''}
                  <div class="q-writing-line"></div>
                </div>
              </div>
            `;
              })
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}

      <div class="page-keyterm-vault">
        <span class="vault-tag">KEY TERM VAULT (PART 1)</span>
        <span class="vault-terms">Blackout &bull; Operation Pied Piper &bull; Billeting Officer &bull; Kindertransport &bull; Anderson Shelter &bull; ARP Warden</span>
      </div>
    </div>

    <div class="sheet-footer">
      <span>The History Revision Hub • KS2 WWII Retrieval Companion</span>
      <span>Part 1 Checkpoints (Questions 1–20) • Page 2 of 4</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 3: PART 2 RETRIEVAL DRILLS • ENQUIRIES 6 TO 10 (QUESTIONS 21 TO 40)   -->
  <!-- ========================================================================= -->
  <div class="a4-page" id="page-3">
    <div>
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">PART 2 DRILL</span>
          <span class="brand-text">Enquiries 06 to 10</span>
        </div>
        <div class="masthead-right">KS2 WWII RETRIEVAL • QUESTIONS 21–40</div>
      </div>

      <div class="page-overview-bar" style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%);">
        <span>Part 2: Rationing, Women's Work, Pre-War Rights, Codebreaking &amp; VE Day</span>
        <span>20 Marks Available</span>
      </div>

      ${QUIZ_DATA.slice(5, 10)
        .map(
          (enq) => `
        <div class="enquiry-card">
          <div class="enquiry-card-header">
            <div style="display:flex; align-items:center; gap:2mm;">
              <span class="enquiry-badge-num" style="background:#f0fdfa; color:#0f766e; border-color:#99f6e4;">ENQUIRY ${enq.enquiry < 10 ? '0' + enq.enquiry : enq.enquiry}</span>
              <span class="enquiry-card-title">${enq.title}</span>
            </div>
            <span class="enquiry-score-pill" style="color:#0f766e;">Score: ____ / 4</span>
          </div>

          <div class="questions-grid">
            ${enq.items
              .map((it, idx) => {
                const qNum = (enq.enquiry - 1) * 4 + idx + 1;
                let formattedPrompt = it.q;
                if (formattedPrompt.includes('[')) {
                  const parts = formattedPrompt.split('[');
                  formattedPrompt = `${parts[0]} <span class="q-option-choice">[ ${parts[1]}</span>`;
                }
                return `
              <div class="q-item">
                <div class="q-header-row">
                  <span class="q-tier-badge ${it.tier === 'Bronze' ? 'tier-bronze' : it.tier === 'Silver' ? 'tier-silver' : 'tier-gold'}">${it.tier}</span>
                  <span class="q-num-text"><strong>${qNum}.</strong> ${formattedPrompt}</span>
                </div>
                <div class="q-line-wrap">
                  ${it.stem ? `<span class="q-stem">${it.stem}</span>` : ''}
                  <div class="q-writing-line"></div>
                </div>
              </div>
            `;
              })
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}

      <div class="page-keyterm-vault">
        <span class="vault-tag" style="background:#0f766e;">KEY TERM VAULT (PART 2)</span>
        <span class="vault-terms">Ration Book &bull; Dig for Victory &bull; Women’s Land Army &bull; Kristallnacht &bull; Enigma Machine &bull; Upstander</span>
      </div>
    </div>

    <div class="sheet-footer">
      <span>The History Revision Hub • KS2 WWII Retrieval Companion</span>
      <span>Part 2 Checkpoints (Questions 21–40) • Page 3 of 4</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 4: MASTER DEPARTMENT MARKING BANK (ALL 40 QUESTIONS) & CONCEPTS VAULT -->
  <!-- ========================================================================= -->
  <div class="a4-page" id="page-4">
    <div>
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge" style="background:#78350f;">MARKING BANK</span>
          <span class="brand-text" style="color:#78350f;">Teacher &amp; Self-Assessment Key</span>
        </div>
        <div class="masthead-right">ALL 40 QUESTIONS • ENQUIRIES 1 TO 10</div>
      </div>

      <div class="bank-header-bar">
        <span>Award 1 mark per correct historical fact. Pupils use green pen for peer assessment.</span>
        <span>Total: 40 Marks</span>
      </div>

      <div class="marking-grid-container">
        <!-- Left Column: Enquiries 1 to 5 -->
        <div>
          ${QUIZ_DATA.slice(0, 5)
            .map(
              (enq) => `
            <div class="answer-enquiry-block">
              <div class="answer-enquiry-header">
                <span>Enquiry 0${enq.enquiry}: ${enq.shortTitle}</span>
                <span>Q${(enq.enquiry - 1) * 4 + 1}–${enq.enquiry * 4}</span>
              </div>
              ${enq.items
                .map(
                  (it, idx) => `
                <div class="answer-item">
                  <span class="answer-q-tag">Q${(enq.enquiry - 1) * 4 + idx + 1}:</span>
                  <span class="answer-bold">${it.a}</span>
                  <span class="answer-exp">(${it.exp})</span>
                </div>
              `,
                )
                .join('')}
            </div>
          `,
            )
            .join('')}
        </div>

        <!-- Right Column: Enquiries 6 to 10 -->
        <div>
          ${QUIZ_DATA.slice(5, 10)
            .map(
              (enq) => `
            <div class="answer-enquiry-block">
              <div class="answer-enquiry-header">
                <span>Enquiry 0${enq.enquiry}: ${enq.shortTitle}</span>
                <span>Q${(enq.enquiry - 1) * 4 + 1}–${enq.enquiry * 4}</span>
              </div>
              ${enq.items
                .map(
                  (it, idx) => `
                <div class="answer-item">
                  <span class="answer-q-tag">Q${(enq.enquiry - 1) * 4 + idx + 1}:</span>
                  <span class="answer-bold">${it.a}</span>
                  <span class="answer-exp">(${it.exp})</span>
                </div>
              `,
                )
                .join('')}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Bottom Panel: Full-Width Historical Vocabulary & Disciplinary Concepts Vault -->
      <div class="p4-bottom-vault">
        <div class="p4-vault-header">
          <span>Key Stage 2 Historical Vocabulary &amp; Conceptual Anchor Vault</span>
          <span>Zero Tokenistic DIRT • Department Verified Key</span>
        </div>
        <div class="p4-vault-grid">
          <div class="p4-vault-item"><strong>ARP (Air Raid Precautions):</strong> Civilian volunteers who patrolled darkened streets, enforced blackout rules, and directed families to safety.</div>
          <div class="p4-vault-item"><strong>Kindertransport:</strong> British rescue mission that transported nearly 10,000 unaccompanied refugee children to safety from Nazi Europe.</div>
          <div class="p4-vault-item"><strong>Anderson Shelter:</strong> Arched corrugated steel shelter assembled and buried in private gardens to protect against bomb blasts and debris.</div>
          <div class="p4-vault-item"><strong>Morrison Shelter:</strong> Indoor steel cage erected inside living rooms to shelter families without gardens, designed to double as a table.</div>
          <div class="p4-vault-item"><strong>Food Rationing:</strong> Fair-shares distribution system using coupon books to guarantee essential food after German U-boats sank merchant shipping.</div>
          <div class="p4-vault-item"><strong>Dig for Victory:</strong> Mass government campaign urging families to transform flowerbeds, lawns, and public parks into vegetable allotments.</div>
          <div class="p4-vault-item"><strong>Enigma Machine:</strong> Complex electro-mechanical cipher device used by the German military, decrypted by codebreakers at Bletchley Park.</div>
          <div class="p4-vault-item"><strong>Upstander:</strong> An individual who takes conscious, courageous action to defend and rescue others facing danger or persecution.</div>
        </div>
        <div class="p4-vault-verification-bar">
          <span>Department Verified Marking Standard • Green Pen Revision Standard</span>
          <span>Pupils Verify in Green Pen • Spaced Retest After 48h</span>
        </div>
      </div>
    </div>

    <div class="sheet-footer">
      <span>The History Revision Hub • Independent Commercial Curriculum Standard</span>
      <span>Department Marking Bank &amp; Concept Vault • Page 4 of 4</span>
    </div>
  </div>

</body>
</html>`;

  return html;
}

async function run() {
  console.log('🚀 Compiling 4-Page KS2 WWII Knowledge Retrieval Companion (No RAG, Accessible Standard)...');
  const html = await compileQuizBookletHtml();

  const PUB_HTML = path.join(UNIT_DIR, 'quiz_pack.html');
  const LOCAL_HTML = path.join(LOCAL_UNIT_DIR, 'quiz_pack.html');
  fs.writeFileSync(PUB_HTML, html, 'utf8');
  if (fs.existsSync(LOCAL_UNIT_DIR)) {
    fs.writeFileSync(LOCAL_HTML, html, 'utf8');
  }
  console.log(`✅ Saved HTML: ${PUB_HTML}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2.0 });
  await page.setContent(html, { waitUntil: ['load', 'networkidle0'] });
  await page.evaluateHandle('document.fonts.ready');

  const pageMetrics = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.a4-page'));
    return pages.map((p, idx) => {
      const overflow = p.scrollHeight - p.clientHeight;
      return { pageNum: idx + 1, overflow };
    });
  });

  let hasOverflow = false;
  pageMetrics.forEach((m) => {
    if (m.overflow > 1) {
      console.log(`❌ Page ${m.pageNum} has ${m.overflow}px overflow!`);
      hasOverflow = true;
    } else {
      console.log(`✅ Page ${m.pageNum}: 0px overflow`);
    }
  });

  const PDF_FINAL_V17 = path.join(PDFS_DIR, 'ks2_ww2_quiz_pack_FINAL_V17.pdf');
  const PDF_ROOT = path.join(PDFS_DIR, 'ks2_ww2_quiz_pack.pdf');
  const PDF_SUBDIR = path.join(KS2_PDFS_DIR, 'ks2_ww2_quiz_pack.pdf');

  await page.pdf({
    path: PDF_FINAL_V17,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  fs.copyFileSync(PDF_FINAL_V17, PDF_ROOT);
  fs.copyFileSync(PDF_FINAL_V17, PDF_SUBDIR);

  console.log(`🖨️ Successfully generated 4-page Retrieval Companion PDF: ${PDF_FINAL_V17}`);
  console.log(`🖨️ Copied to: ${PDF_ROOT}`);
  console.log(`🖨️ Copied to: ${PDF_SUBDIR}`);

  // Capture preview screenshots of all 4 pages for visual inspection
  for (let i = 1; i <= 4; i++) {
    const el = await page.$(`#page-${i}`);
    if (el) {
      const outImg = path.join(ROOT_DIR, 'public', 'screenshots', `ks2_quiz_pack_page${i}.png`);
      await el.screenshot({ path: outImg });
      console.log(`📸 Captured Page ${i} preview: ${outImg}`);
    }
  }

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
