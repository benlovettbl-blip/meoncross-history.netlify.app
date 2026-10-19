/**
 * generate_ks2_quiz_booklet.cjs
 *
 * Compiles the 4-Page Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Key Stage 2 (Year 5): World War II & The Home Front (1939–1945).
 *
 * Page Architecture (4-Page Saddle-Stitch Format / 1 Folded A3 Sheet):
 * - Page 1: Master Front Cover & 10-Enquiry Knowledge Tracking Ledger (ZERO RAG)
 * - Page 2: Part 1 Retrieval Drills • Enquiries 1 to 5 (Questions 1 to 20)
 * - Page 3: Part 2 Retrieval Drills • Enquiries 6 to 10 (Questions 21 to 40)
 * - Page 4: Master Department Marking Bank (All 40 Questions) + Teacher Feedback & Glossary
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
// 40 RIGOROUS QUESTIONS ACROSS ALL 10 ENQUIRIES
// --------------------------------------------------------------------------
const QUIZ_DATA = [
  {
    enquiry: 1,
    title: '1. Outbreak 1939 & Home Front Mobilisation',
    shortTitle: 'Outbreak & Gas Masks',
    pageRef: 'p. 2 • Q1–4',
    questionPrompt:
      'Why did ordinary families carry cardboard boxes and tape windows in September 1939?',
    items: [
      {
        q: 'On what date did Prime Minister Neville Chamberlain announce that Britain was at war with Germany?',
        a: '3 September 1939 (at 11:15am)',
        exp: "Chamberlain broadcast from 10 Downing Street after Hitler ignored Britain's ultimatum to withdraw from Poland.",
      },
      {
        q: 'How many million civilian gas masks in cardboard boxes did the British government distribute in 1939?',
        a: '38 million gas masks',
        exp: 'Fearing poison gas bombs remembered from the First World War, the government issued gas masks to every citizen.',
      },
      {
        q: 'Why did volunteer ARP wardens enforce the blackout so strictly across British cities?',
        a: 'To prevent German bomber pilots from seeing streetlights or illuminated landmarks at night',
        exp: 'Every window had to be covered with heavy black curtains so enemy bombers flying in darkness could not navigate.',
      },
      {
        q: 'How did carrying a gas mask change the daily school routine for British children?',
        a: 'Children carried the cardboard box on their shoulder everywhere and practiced wearing respirators in regular drills',
        exp: 'Pupils could not enter school or board buses without their box, practicing reading and writing while wearing rubber masks.',
      },
    ],
  },
  {
    enquiry: 2,
    title: '2. Operation Pied Piper & British Evacuation',
    shortTitle: 'The Evacuation Experience',
    pageRef: 'p. 2 • Q5–8',
    questionPrompt: 'What was it like for 1.5 million children to be sent away with luggage tags?',
    items: [
      {
        q: 'What official code name was given to the British government’s evacuation plan in September 1939?',
        a: 'Operation Pied Piper',
        exp: 'In four days, 1.5 million schoolchildren, teachers, and mothers with babies were evacuated to rural reception areas.',
      },
      {
        q: 'Why did authorities attach cardboard luggage labels directly onto children’s coats?',
        a: 'So billeting officers and volunteers could immediately identify bewildered children at busy railway stations',
        exp: "Labels recorded each child's name, home address, school, and destination station to keep classes and families organized.",
      },
      {
        q: 'What was the title of the local official responsible for finding foster homes for arriving evacuees?',
        a: 'The Billeting Officer',
        exp: 'Billeting officers inspected village cottages and assigned children to foster families, often in local village halls.',
      },
      {
        q: 'Why was evacuation both an exciting adventure and a heartbreaking separation for families?',
        a: 'Children discovered green fields and farm animals, but suffered deep homesickness separated from parents',
        exp: 'Many city children had never seen cows or orchards, but missed their mothers and fathers with only letters to stay in touch.',
      },
    ],
  },
  {
    enquiry: 3,
    title: "3. Vera's Journey & The Kindertransport",
    shortTitle: 'The Kindertransport Rescue',
    pageRef: 'p. 2 • Q9–12',
    questionPrompt: 'How did nearly 10,000 refugee children travel alone across Europe to safety?',
    items: [
      {
        q: 'Following which violent event in November 1938 did Britain agree to accept child refugees?',
        a: 'The November Pogrom (Kristallnacht)',
        exp: 'After widespread violent Nazi attacks against Jewish homes and synagogues, Britain permitted unaccompanied child refugees.',
      },
      {
        q: 'Approximately how many predominantly Jewish refugee children were rescued on the Kindertransport?',
        a: 'Nearly 10,000 children (approx. 9,354)',
        exp: 'Rescue trains brought children from Germany, Austria, and Czechoslovakia to the Netherlands and by ferry to Harwich.',
      },
      {
        q: 'How many suitcases was each child permitted to pack when boarding the rescue train?',
        a: 'Only one small suitcase',
        exp: 'Nazi authorities strictly limited children to one bag with clothes and keepsakes; no money or valuables were allowed.',
      },
      {
        q: 'Why did children like 9-year-old Vera Schaufeld wear a numbered identity card around their neck?',
        a: 'To allow British volunteers and foster families to identify the correct child upon arrival in London',
        exp: 'Most children spoke only German or Czech; their numbered neck tags matched records held at Liverpool Street Station.',
      },
    ],
  },
  {
    enquiry: 4,
    title: '4. The Blitz & Air Raid Shelters',
    shortTitle: 'The Blitz & Shelters',
    pageRef: 'p. 2 • Q13–16',
    questionPrompt:
      'How did ordinary families protect themselves when bombs fell night after night?',
    items: [
      {
        q: 'For how many consecutive nights was the city of London bombed during the Blitz in 1940?',
        a: '57 consecutive nights',
        exp: 'Between September 1940 and May 1941, German bombers attacked London and industrial ports to crush civilian morale.',
      },
      {
        q: 'Name the garden air raid shelter made of curved corrugated steel covered with soil.',
        a: 'The Anderson shelter',
        exp: 'Over 3 million Anderson shelters were distributed free to low-income families to bury in back gardens.',
      },
      {
        q: 'Which indoor steel-cage shelter was designed to be built inside a room and double as a dining table?',
        a: 'The Morrison shelter',
        exp: 'Designed by Herbert Morrison, this steel cage protected families in homes without gardens from falling debris.',
      },
      {
        q: 'Where did over 150,000 London civilians choose to sleep each night to escape the bombing?',
        a: 'On Underground tube station platforms',
        exp: 'Civilians camped along deep tube platforms where dozens of feet of earth protected them from explosive bomb blasts.',
      },
    ],
  },
  {
    enquiry: 5,
    title: '5. Blackout & ARP Wardens',
    shortTitle: 'Blackout & ARP Wardens',
    pageRef: 'p. 2 • Q17–20',
    questionPrompt:
      'How did ARP wardens keep communities safe in pitch-black streets during night raids?',
    items: [
      {
        q: 'What does the abbreviation "ARP" stand for in Second World War Britain?',
        a: 'Air Raid Precautions',
        exp: 'ARP wardens were civilian volunteers who patrolled streets, directed people to shelters, and gave first aid.',
      },
      {
        q: 'What warning phrase did ARP wardens shout when spotting a chink of light from a window?',
        a: '"Put that light out!"',
        exp: 'Wardens patrolled streets on foot and bicycle checking for light leaks that could guide enemy bombers.',
      },
      {
        q: 'What did town councils paint white on streets and trees to help pedestrians walk in the dark?',
        a: 'Curbs, lampposts, tree trunks, and car bumpers',
        exp: 'Because streetlights and normal car headlights were banned, white paint prevented accidents in total darkness.',
      },
      {
        q: 'What sound warned civilians that an enemy air raid was approaching, and what sound signalled danger had passed?',
        a: 'A rising and falling wailing siren (warning), followed by a continuous single-pitch tone (All Clear)',
        exp: 'Sirens were mounted on police stations and town halls to give people enough time to enter shelters.',
      },
    ],
  },
  {
    enquiry: 6,
    title: '6. Dig for Victory & Food Rationing',
    shortTitle: 'Rationing & Dig for Victory',
    pageRef: 'p. 3 • Q21–24',
    questionPrompt: 'Why did the government ration food and order citizens to Dig for Victory?',
    items: [
      {
        q: 'Why did Britain introduce food rationing in January 1940?',
        a: 'German U-boats sank merchant cargo ships in the Atlantic, causing dangerous food shortages',
        exp: 'Britain imported 55 million tonnes of food yearly; rationing guaranteed equal, fair shares for every civilian.',
      },
      {
        q: 'What was the official document containing tear-out coupons that every citizen had to carry to buy food?',
        a: 'The Ration Book',
        exp: 'Coupons were registered with local shopkeepers who stamped or clipped them when buying meat, butter, and sugar.',
      },
      {
        q: 'What nationwide campaign urged families to turn flowerbeds and parks into vegetable allotments?',
        a: '"Dig for Victory"',
        exp: 'The government urged families to grow potatoes and cabbages, producing over 3 million tonnes of domestic food.',
      },
      {
        q: 'Why was throwing away leftover food made a criminal offence punishable by fines during wartime?',
        a: 'Because waste squandered supplies that Merchant Navy sailors had risked their lives to bring across the ocean',
        exp: 'Wasting food was treated as helping the enemy; kitchen scraps were collected in pig swill bins to feed livestock.',
      },
    ],
  },
  {
    enquiry: 7,
    title: '7. Women at War & The Land Army',
    shortTitle: 'Women at War',
    pageRef: 'p. 3 • Q25–28',
    questionPrompt:
      'How did the Second World War transform the roles and daily lives of British women?',
    items: [
      {
        q: 'What popular nickname was given to the 80,000 volunteers who joined the Women’s Land Army?',
        a: '"Land Girls"',
        exp: 'Land Girls worked 50-hour weeks milking cows, ploughing fields, driving tractors, and harvesting food across Britain.',
      },
      {
        q: 'Name the specialized branch of the Women’s Land Army who worked in forestry felling timber.',
        a: 'The "Lumber Jills" (Women’s Timber Corps)',
        exp: 'Over 6,000 women operated heavy crosscut saws and worked in sawmills to produce timber for pit props and construction.',
      },
      {
        q: 'Name two vital roles women performed in wartime Britain outside of agricultural farming.',
        a: 'Assembling aircraft in factories, driving ambulances, operating radar, or codebreaking at Bletchley Park',
        exp: 'Women entered heavy industry, engineering, and the auxiliary armed services (ATS, WAAF, WRNS) in record numbers.',
      },
      {
        q: 'How did wartime service permanently alter women’s position in British society?',
        a: 'It proved women could master skilled, demanding jobs equally with men, accelerating the move toward equality',
        exp: 'Earning independent wages and running vital national infrastructure challenged outdated domestic stereotypes.',
      },
    ],
  },
  {
    enquiry: 8,
    title: '8. Pre-War Everyday Life & Rights Lost',
    shortTitle: 'Pre-War Life & Lost Rights',
    pageRef: 'p. 3 • Q29–32',
    questionPrompt:
      'What was childhood like before 1939 and how were rights systematically stripped away?',
    items: [
      {
        q: 'Approximately how many Jewish people lived across the cities and towns of Europe before 1939?',
        a: 'Over 9 million Jewish people',
        exp: 'Jewish families lived in 21 European countries, attending ordinary schools, playing sports, and running businesses.',
      },
      {
        q: 'What traditional cardboard cone filled with sweets did German children carry on their first school day?',
        a: 'A Schultüte (school cone)',
        exp: 'The Schultüte celebrated entering school and was cherished by German children of all backgrounds before Nazi rule.',
      },
      {
        q: 'In what year were Jewish pupils completely banned from attending state schools in Germany?',
        a: 'November 1938',
        exp: 'Following the November Pogrom, Nazi decrees expelled all Jewish children from state schools into segregation.',
      },
      {
        q: 'How did discriminatory laws systematically strip away ordinary childhood joys between 1933 and 1939?',
        a: 'Jewish children were banned from sports clubs, swimming pools, public parks, riding bicycles, and owning pets',
        exp: 'Step-by-step exclusion isolated Jewish children from friends and public life long before deportations began.',
      },
    ],
  },
  {
    enquiry: 9,
    title: '9. Bletchley Park & Codebreakers',
    shortTitle: 'Bletchley Park Codebreakers',
    pageRef: 'p. 3 • Q33–36',
    questionPrompt: 'How did codebreakers in secret wooden huts help defeat the German military?',
    items: [
      {
        q: 'What was the name of the German electro-mechanical cipher machine used to scramble secret orders?',
        a: 'The Enigma machine',
        exp: 'Enigma used rotating wheels and a plugboard to scramble text into billions of mathematical code combinations.',
      },
      {
        q: 'Which Buckinghamshire country estate served as Britain’s top-secret codebreaking headquarters?',
        a: 'Bletchley Park (Station X)',
        exp: 'Over 10,000 codebreakers, mathematicians, and service personnel worked in wooden huts intercepting enemy radio signals.',
      },
      {
        q: 'Name the brilliant mathematician who designed the "Bombe" machines to crack Enigma codes.',
        a: 'Alan Turing',
        exp: 'Turing and his team designed electromechanical Bombe machines that tested rotor positions in minutes.',
      },
      {
        q: 'What percentage of the Bletchley Park workforce were women, and how long was their work kept secret?',
        a: 'About 75% were women, and their work was kept secret for over 30 years (until the 1970s)',
        exp: 'Women operated complex Bombe machines and decoded messages, strictly obeying the Official Secrets Act.',
      },
    ],
  },
  {
    enquiry: 10,
    title: '10. Rescuers, VE Day & Remembrance',
    shortTitle: 'Rescuers, VE Day & Legacy',
    pageRef: 'p. 3 • Q37–40',
    questionPrompt: 'How did moral courage save lives and why do we remember the WWII generation?',
    items: [
      {
        q: 'Who was the 29-year-old London stockbroker who organized rescue trains saving 669 Czech children?',
        a: 'Nicholas Winton (later Sir Nicholas Winton)',
        exp: 'Winton cancelled a Swiss holiday in December 1938, opened an office in Prague, and arranged British foster homes.',
      },
      {
        q: 'What is the definition of an "upstander" in historical studies?',
        a: 'A person who takes active moral action to help or defend others in danger rather than remaining a bystander',
        exp: 'Upstanders like Winton, Trevor Chadwick, and volunteer foster parents actively stepped forward to rescue innocent children.',
      },
      {
        q: 'What does "VE Day" stand for, and on what exact date was it celebrated across Britain in 1945?',
        a: 'Victory in Europe Day, celebrated on 8 May 1945',
        exp: "Following Germany's surrender, a national holiday was declared with joyful street parties and community feasts.",
      },
      {
        q: 'Why is it vital that we continue to remember the courage and sacrifices of the Second World War generation?',
        a: 'To honour those who defended freedom, protect democracy, and learn from past atrocities to prevent prejudice',
        exp: 'Remembrance ensures younger generations understand that freedom and human dignity must be protected.',
      },
    ],
  },
];

async function generateQrDataUri(url) {
  try {
    return await QRCode.toDataURL(url, {
      margin: 1,
      width: 140,
      color: { dark: '#000000', light: '#ffffff' },
    });
  } catch (e) {
    return '';
  }
}

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
      padding: 6.5mm 11mm 5.5mm 11mm;
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
      padding-bottom: 1.5mm;
      margin-bottom: 1.8mm;
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
      font-size: 7.2pt;
      padding: 1.2mm 3mm;
      border-radius: 3px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .brand-text {
      font-size: 8.2pt;
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
      margin-bottom: 2mm;
    }
    .cover-date-pill {
      display: inline-block;
      background: #f1f5f9;
      color: #1e3a8a;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 0.8mm 3.5mm;
      border-radius: 12px;
      border: 1px solid #bfdbfe;
      margin-bottom: 1.5mm;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .cover-main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      letter-spacing: -0.01em;
      margin-bottom: 1mm;
    }
    .cover-subtitle {
      font-size: 9pt;
      font-weight: 700;
      color: #2563eb;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* Cover Hero Plate */
    .cover-plate-box {
      border: 1.5px solid var(--border-gray);
      border-radius: 6px;
      padding: 2mm;
      background: #f8fafc;
      text-align: center;
      margin-bottom: 2.2mm;
    }
    .cover-hero-img {
      max-height: 44mm;
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
      margin-top: 1.2mm;
    }

    /* Student ID Box */
    .id-block {
      border: 1.2px solid var(--border-gray);
      border-radius: 6px;
      background: #ffffff;
      padding: 2mm 3.5mm;
      margin-bottom: 2.2mm;
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
      height: 4mm;
    }

    /* Tracking Ledger Table (NO RAG) */
    .ledger-header {
      font-size: 8pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1.2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tracking-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.2pt;
      margin-bottom: 2.2mm;
    }
    .tracking-table th {
      background: #1e3a8a;
      color: #ffffff;
      padding: 1.8mm 2.2mm;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      border: 1px solid #1e3a8a;
      text-align: center;
    }
    .tracking-table td {
      border: 1px solid var(--border-gray);
      padding: 1.8mm 2.2mm;
      text-align: center;
      vertical-align: middle;
    }
    .tracking-table td.title-col {
      text-align: left;
      font-weight: 700;
      color: #1e293b;
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
      border-radius: 5px;
      padding: 1.8mm 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.0pt;
      font-weight: 600;
      color: #334155;
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
      padding: 1px 6px;
      border-radius: 3px;
    }
    .badge-secure {
      font-weight: 800;
      color: #1e40af;
      background: #dbeafe;
      padding: 1px 6px;
      border-radius: 3px;
    }
    .badge-review {
      font-weight: 800;
      color: #92400e;
      background: #fef3c7;
      padding: 1px 6px;
      border-radius: 3px;
    }

    /* Enquiry Cards (Pages 2 & 3: 5 Enquiries Per Page) */
    .page-overview-bar {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      color: #ffffff;
      padding: 1.3mm 3mm;
      border-radius: 4px;
      margin-bottom: 1.5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      font-weight: 700;
    }
    .enquiry-card {
      border: 1.2px solid var(--border-gray);
      border-radius: 4px;
      padding: 1.4mm 2.5mm;
      margin-bottom: 1.2mm;
      background: #ffffff;
    }
    .enquiry-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.8mm;
      margin-bottom: 1.0mm;
    }
    .enquiry-badge-num {
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
      font-weight: 800;
      font-size: 7.0pt;
      padding: 0.5mm 1.8mm;
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
      font-size: 6.8pt;
      font-weight: 700;
      color: #1e3a8a;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 0.5mm 2.2mm;
      border-radius: 6px;
    }
    .questions-grid {
      display: flex;
      flex-direction: column;
      gap: 1.0mm;
    }
    .q-item {
      display: flex;
      flex-direction: column;
      gap: 0.4mm;
    }
    .q-header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 7.8pt;
      line-height: 1.2;
    }
    .q-num-text {
      font-weight: 700;
      color: #1e293b;
    }
    .q-writing-line {
      border-bottom: 1px dashed var(--line-color);
      height: 3.4mm;
      width: 100%;
    }

    /* Page 4: Marking Bank & Feedback */
    .bank-header-bar {
      background: #78350f;
      color: #ffffff;
      padding: 1.4mm 3mm;
      border-radius: 4px;
      margin-bottom: 1.5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      font-weight: 700;
    }
    .marking-grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5mm 3.5mm;
      margin-bottom: 1.8mm;
    }
    .answer-enquiry-block {
      border: 1px solid #fed7aa;
      border-radius: 3px;
      padding: 1.2mm 2.2mm;
      background: #fffdfa;
      margin-bottom: 1.2mm;
    }
    .answer-enquiry-header {
      font-size: 7.2pt;
      font-weight: 800;
      color: #92400e;
      border-bottom: 1px solid #fed7aa;
      padding-bottom: 0.5mm;
      margin-bottom: 0.8mm;
      display: flex;
      justify-content: space-between;
    }
    .answer-item {
      font-size: 6.6pt;
      line-height: 1.2;
      margin-bottom: 0.6mm;
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
      font-size: 6.0pt;
      margin-left: 2px;
    }

    /* Bottom Feedback Panel (Page 4) */
    .p4-bottom-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2.5mm;
      margin-bottom: 1.5mm;
    }
    .feedback-panel {
      border: 1.2px solid #cbd5e1;
      border-radius: 4px;
      padding: 1.6mm 2.5mm;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .feedback-panel-header {
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 1.0mm;
    }
    .feedback-ruled-lines {
      display: flex;
      flex-direction: column;
      gap: 3.0mm;
      margin-bottom: 1.5mm;
      padding-top: 0.5mm;
    }
    .writing-line {
      border-bottom: 1px dashed var(--line-color);
      height: 1px;
      width: 100%;
    }
    .glossary-panel {
      border: 1.2px solid #bfdbfe;
      border-radius: 4px;
      padding: 1.6mm 2.5mm;
      background: #eff6ff;
    }
    .glossary-panel-header {
      font-size: 7.2pt;
      font-weight: 800;
      color: #1e40af;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 1.0mm;
    }
    .glossary-mini-list {
      display: flex;
      flex-direction: column;
      gap: 0.8mm;
      font-size: 6.4pt;
      line-height: 1.2;
    }
    .glossary-term {
      font-weight: 800;
      color: #1e3a8a;
    }

    /* Common Footer */
    .sheet-footer {
      border-top: 1px solid var(--border-gray);
      padding-top: 1.2mm;
      margin-top: 1.2mm;
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
  <!-- PAGE 1: FRONT COVER & 10-ENQUIRY KNOWLEDGE TRACKING LEDGER (NO RAG)      -->
  <!-- ========================================================================= -->
  <div class="a4-page" id="page-1">
    <div>
      <div class="sheet-masthead">
        <div class="brand-left">
          <span class="brand-badge">THE HISTORY REVISION HUB</span>
          <span class="brand-text">Key Stage 2 • Year 5 History</span>
        </div>
        <div class="masthead-right">1939–1945 • NATIONAL CURRICULUM COMPLIANT</div>
      </div>

      <div class="cover-top-box">
        <span class="cover-date-pill">Curriculum Retrieval Standard • 40 Recall Checkpoints</span>
        <h1 class="cover-main-title">WORLD WAR II &amp; THE HOME FRONT</h1>
        <p class="cover-subtitle">Knowledge Retrieval &amp; Assessment Companion</p>
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

      <div class="ledger-header">
        <span>10-Enquiry Knowledge Tracking Ledger</span>
        <span style="font-size:7.2pt; color:#1e3a8a; font-weight:700;">Target: 40/40 Mastery</span>
      </div>

      <table class="tracking-table">
        <thead>
          <tr>
            <th style="width: 8%;">Enq</th>
            <th style="width: 48%; text-align: left;">Historical Enquiry Focus</th>
            <th style="width: 14%;">Page Ref</th>
            <th style="width: 14%;">Score</th>
            <th style="width: 16%;">Teacher Sign</th>
          </tr>
        </thead>
        <tbody>
          ${QUIZ_DATA.map(
            (q) => `
            <tr>
              <td><strong>${q.enquiry < 10 ? '0' + q.enquiry : q.enquiry}</strong></td>
              <td class="title-col">${q.title}</td>
              <td class="page-col">${q.pageRef}</td>
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
        <span class="standard-item"><span class="badge-review">Review: &le; 29 / 40</span> Review answers on Page 4.</span>
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
        <div class="masthead-right">YEAR 5 WWII RETRIEVAL • QUESTIONS 1–20</div>
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
              .map(
                (it, idx) => `
              <div class="q-item">
                <div class="q-header-row">
                  <span class="q-num-text">${(enq.enquiry - 1) * 4 + idx + 1}. ${it.q}</span>
                </div>
                <div class="q-writing-line"></div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}
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
        <div class="masthead-right">YEAR 5 WWII RETRIEVAL • QUESTIONS 21–40</div>
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
              .map(
                (it, idx) => `
              <div class="q-item">
                <div class="q-header-row">
                  <span class="q-num-text">${(enq.enquiry - 1) * 4 + idx + 1}. ${it.q}</span>
                </div>
                <div class="q-writing-line"></div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      `,
        )
        .join('')}
    </div>

    <div class="sheet-footer">
      <span>The History Revision Hub • KS2 WWII Retrieval Companion</span>
      <span>Part 2 Checkpoints (Questions 21–40) • Page 3 of 4</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- PAGE 4: MASTER DEPARTMENT MARKING BANK (ALL 40 QUESTIONS) & FEEDBACK      -->
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

      <!-- Bottom Panels: Teacher Feedback + Vocabulary Glossary -->
      <div class="p4-bottom-grid">
        <div class="feedback-panel">
          <div>
            <div class="feedback-panel-header">Teacher Commendation &amp; Growth Target</div>
            <div class="feedback-ruled-lines">
              <div class="writing-line"></div>
              <div class="writing-line"></div>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:7.2pt; font-weight:700; color:#334155; border-top:1px solid #e2e8f0; padding-top:1.5mm;">
            <span>Signature: ______________________</span>
            <span>Date: _________</span>
            <span style="color:#1e3a8a; font-weight:800; font-size:8pt;">Total: ____ / 40</span>
          </div>
        </div>

        <div class="glossary-panel">
          <div class="glossary-panel-header">Core KS2 Historical Terms</div>
          <div class="glossary-mini-list">
            <div><span class="glossary-term">ARP:</span> Air Raid Precautions volunteers enforcing blackout.</div>
            <div><span class="glossary-term">Kindertransport:</span> Rescue of 10,000 child refugees.</div>
            <div><span class="glossary-term">Anderson Shelter:</span> Steel shelter buried in gardens.</div>
            <div><span class="glossary-term">Rationing:</span> Fair sharing of food during shortages.</div>
            <div><span class="glossary-term">Enigma:</span> German cipher machine cracked at Bletchley.</div>
            <div><span class="glossary-term">Upstander:</span> Person taking action to help those in peril.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sheet-footer">
      <span>The History Revision Hub • Independent Commercial Curriculum Standard</span>
      <span>Department Marking Bank &amp; Feedback • Page 4 of 4</span>
    </div>
  </div>

</body>
</html>`;

  return html;
}

async function run() {
  console.log('🚀 Compiling 4-Page KS2 WWII Knowledge Retrieval Companion (No RAG)...');
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
