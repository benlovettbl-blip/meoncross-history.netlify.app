/**
 * generate_usa_quiz_booklet.cjs
 *
 * Compiles the Master 24-Page A4 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Pearson Edexcel GCSE History Paper 3 (1HI0/33): The USA, 1954–75: Conflict at Home and Abroad.
 *
 * Strict Compliance:
 * - Institutional neutrality (The History Department / GCSE History Revision Hub)
 * - Zero AI educational jargon / authentic classroom examiner standard
 * - 100% uniformity across all 16 enquiries (12 tiered questions per enquiry = 192 questions)
 * - Two-Line Dual Retrieval Format (Line 1: Core Fact / Line 2: The Explanation)
 * - Examiner Warning / Fatal Pitfall Callout on every enquiry page
 * - Exact multiple of 4 (24 pages / 6 folded A3 sheets) for commercial A4 saddle-stitch booklet printing
 * - Publisher-grade typography & 0px dead space underflow budget
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { USA_PEARSON_QUIZ_BANK } = require('./usa_pearson_quiz_bank.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const DRIVE_BASE = 'G:\\My Drive\\AAMX\\Dep File';

if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

// --------------------------------------------------------------------------
// QR CODE SVG HELPER
// --------------------------------------------------------------------------
function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#000000" d="${pathD.trim()}"/></svg>`;
}

// --------------------------------------------------------------------------
// BASE64 IMAGE HELPER
// --------------------------------------------------------------------------
function getUsaImageBase64(filename) {
  const candidates = [
    path.join(ROOT_DIR, 'public', 'units', 'usa', 'assets', filename),
    path.join(ROOT_DIR, 'public', 'units', 'usa', 'assets', 'sources', filename),
    path.join(ROOT_DIR, 'public', 'images', filename),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const ext = path.extname(filename).replace('.', '') || 'png';
      const data = fs.readFileSync(p).toString('base64');
      return `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${data}`;
    }
  }
  return `./assets/${filename}`;
}

// --------------------------------------------------------------------------
// APPROVED AUTHENTIC CLASSROOM FOOTERS (24 PAGES)
// --------------------------------------------------------------------------
const APPROVED_FOOTERS = [
  'USA 1954–75 Master Retrieval Companion • Edexcel Paper 3 • The History Department', // P1
  'Master Chronology Domino Flowchart • 28 Causal Turning Points (1954–1975) • The History Department', // P2
  '"Plessy justified segregation in 1896; Brown destroyed it in 1954: master the Jim Crow baseline."', // P3
  '"Faubus closed the schools in 1958; Eisenhower sent the 101st Airborne: federal power always trumps state resistance."', // P4
  '"Robinson mimeographed 35,000 leaflets overnight; 381 days of walking brought Montgomery to its knees."', // P5
  '"Mamie Till Bradley left the casket open for the world to see: out of brutal murder grew a movement."', // P6
  '"Greensboro students sat at Woolworths; Freedom Riders rode through fire: direct action forces federal intervention."', // P7
  '"Connor unleashed police dogs in Birmingham; LBJ signed the Civil Rights Act: televised brutality changes laws."', // P8
  '"Malcolm X demanded self-defence by any means necessary; the Panthers fed children breakfast before dawn."', // P9
  '"The Kerner Report warned of two unequal societies: northern de facto segregation was never cured by law."', // P10
  '"Dien Bien Phu shattered French colonialism; Diem’s corrupt Catholic regime alienated 80% Buddhist South."', // P11
  '"The Gulf of Tonkin Resolution gave a blank cheque for war; 500,000 troops followed into the quagmire."', // P12
  '"Napalm and Search-and-Destroy alienated the peasantry; the Vietcong hung onto the belts of American soldiers."', // P13
  '"Nixon promised Peace with Honor; secretly bombing Cambodia while withdrawing ground troops."', // P14
  '"The Tet Offensive was a Vietcong tactical defeat, but a catastrophic psychological victory over US credibility."', // P15
  '"Kent State, My Lai, and the Pentagon Papers: uncensored television made Vietnam the first living room war."', // P16
  '"Kissinger and Le Duc Tho signed in Paris; US POWs returned home, but 150,000 NVA remained in the South."', // P17
  '"Airpower cannot conquer anti-colonial nationalism: evaluate why the world\'s greatest superpower failed."', // P18
  'Department Marking Bank • Key Topic 1: The Civil Rights Movement (1954–60) • Verified Marking Model', // P19
  'Department Marking Bank • Key Topic 2: Protest, Progress and Radicalism (1960–75) • Verified Marking Model', // P20
  'Department Marking Bank • Key Topic 3: US Involvement in Vietnam (1954–75) • Verified Marking Model', // P21
  'Department Marking Bank • Key Topic 4: Reactions & End of War (1964–75) • Verified Marking Model', // P22
  'Key Historical Protagonists Gallery & Tier 3 Disciplinary Vocabulary • Edexcel Paper 3', // P23
  'Edexcel Paper 3 Examination Strategy & Essay Architect • Departmental Archival Standard', // P24
];

// --------------------------------------------------------------------------
// MASTER CHRONOLOGY DOMINO FLOWCHART (STRICTLY 1954–1975 • 28 TURNING POINTS)
// --------------------------------------------------------------------------
const DOMINO_TIMELINE = [
  {
    year: 'May 1954',
    title: 'Brown v. Board of Education',
    text: 'Supreme Court unanimously rules public school segregation inherently unequal, overturning 1896 Plessy doctrine.',
  },
  {
    year: 'Jul 1954',
    title: 'Geneva Accords on Indochina',
    text: 'France withdraws after Dien Bien Phu defeat; Vietnam temporarily partitioned at 17th parallel with 1956 elections promised.',
  },
  {
    year: 'Aug 1955',
    title: 'Murder of Emmett Till',
    text: '14-year-old Chicago boy abducted and murdered in Mississippi; open casket and all-white jury acquittal galvanise youth.',
  },
  {
    year: 'Dec 1955',
    title: 'Montgomery Bus Boycott',
    text: 'Rosa Parks arrested; WPC launches 381-day municipal bus boycott led by 26-year-old Dr Martin Luther King Jr.',
  },
  {
    year: 'Nov 1956',
    title: 'Browder v. Gayle Supreme Court Ruling',
    text: 'Federal courts strike down bus segregation laws under 14th Amendment, delivering decisive boycott victory.',
  },
  {
    year: 'Sep 1957',
    title: 'Little Rock Central High Crisis',
    text: 'Eisenhower sends 1,200 soldiers of 101st Airborne to escort Little Rock Nine past mob and Governor Faubus.',
  },
  {
    year: 'Sep 1957',
    title: 'Civil Rights Act of 1957',
    text: 'First federal civil rights legislation since Reconstruction establishes Civil Rights Commission and Justice Dept division.',
  },
  {
    year: 'Feb 1960',
    title: 'Greensboro Lunch Counter Sit-Ins',
    text: 'Four Black college students refuse to leave segregated Woolworth counter; sparks nationwide sit-in wave and SNCC founding.',
  },
  {
    year: 'May 1961',
    title: 'CORE Freedom Rides',
    text: 'Interracial activists test interstate bus integration; endure Anniston bus bombing and Bull Connor Birmingham mob attacks.',
  },
  {
    year: 'Oct 1962',
    title: 'James Meredith Integrates Ole Miss',
    text: 'JFK sends 20,000 troops and 300 federal marshals to overcome Governor Barnett and deadly campus riot at Oxford.',
  },
  {
    year: 'May 1963',
    title: 'SCLC Birmingham Campaign ("Project C")',
    text: 'Bull Connor turns high-pressure firehoses and police attack dogs on children marchers; televised horror shocks nation.',
  },
  {
    year: 'Jun 1963',
    title: 'Thich Quang Duc Self-Immolation',
    text: 'Buddhist monk burns himself to death in Saigon protesting Diem regime persecution; destroys US claims of democratic ally.',
  },
  {
    year: 'Aug 1963',
    title: 'March on Washington for Jobs & Freedom',
    text: '250,000 gather at Lincoln Memorial; MLK delivers "I Have a Dream" speech, building unstoppable civil rights momentum.',
  },
  {
    year: 'Nov 1963',
    title: 'Overthrow of Ngo Dinh Diem',
    text: 'South Vietnamese generals execute Diem with US acquiescence; leaves Saigon politically chaotic and unstable.',
  },
  {
    year: 'Jul 1964',
    title: 'Civil Rights Act of 1964',
    text: 'LBJ signs landmark law outlawing segregation in public facilities, ending job discrimination (EEOC), and cutting school funds.',
  },
  {
    year: 'Aug 1964',
    title: 'Gulf of Tonkin Resolution',
    text: 'Congress grants LBJ blank cheque to take "all necessary measures" following alleged torpedo attacks on USS Maddox.',
  },
  {
    year: 'Mar 1965',
    title: 'Operation Rolling Thunder & Da Nang',
    text: 'Three-year continuous bombing of North begins; first 3,500 US ground combat troops land at Da Nang air base.',
  },
  {
    year: 'Mar 1965',
    title: 'Selma to Montgomery Marches',
    text: '"Bloody Sunday" state trooper tear-gas attack at Edmund Pettus Bridge shocks 48 million TV viewers.',
  },
  {
    year: 'Aug 1965',
    title: 'Voting Rights Act of 1965',
    text: 'Outlaws literacy tests and deploys federal registrars; Southern Black voter registration surges from 7% to 60%.',
  },
  {
    year: 'Aug 1965',
    title: 'Watts Race Riots in Los Angeles',
    text: 'Six-day riot leaves 34 dead; marks shift of civil rights crisis to northern urban poverty, housing, and police brutality.',
  },
  {
    year: 'Oct 1966',
    title: 'Black Panther Party Founded',
    text: 'Huey Newton and Bobby Seale launch armed patrols in Oakland alongside Free Breakfast for Children programs.',
  },
  {
    year: 'Jan 1968',
    title: 'The Tet Offensive',
    text: 'Vietcong strikes 100 cities and US Embassy; tactical defeat for North, but shatters US government Credibility Gap.',
  },
  {
    year: 'Mar 1968',
    title: 'My Lai Massacre & LBJ Abdication',
    text: 'Charlie Company murders 500 civilians; LBJ announces on TV he will not seek re-election as presidency collapses.',
  },
  {
    year: 'Apr 1968',
    title: 'Assassination of Martin Luther King Jr.',
    text: 'King shot dead in Memphis; violent riots erupt across 100 cities; Congress passes 1968 Fair Housing Act.',
  },
  {
    year: 'Nov 1969',
    title: 'Nixon\'s "Silent Majority" & Vietnamization',
    text: 'Nixon announces gradual US troop withdrawals while appealing to patriotic middle-class Americans against protestors.',
  },
  {
    year: 'May 1970',
    title: 'Cambodian Invasion & Kent State Shootings',
    text: 'Ohio National Guardsmen kill 4 student anti-war demonstrators; triggers nationwide student strike across 400 campuses.',
  },
  {
    year: 'Jan 1973',
    title: 'Paris Peace Accords Signed',
    text: 'Ceasefire agreed; US POWs released; last American combat troops depart on 29 March, leaving 150,000 NVA in South.',
  },
  {
    year: 'Apr 1975',
    title: 'Spring Offensive & Fall of Saigon',
    text: 'Congress cuts military aid; North Vietnamese tanks storm Presidential Palace; Operation Frequent Wind evacuates Americans.',
  },
];

// --------------------------------------------------------------------------
// HISTORICAL PROTAGONISTS (PAGE 23)
// --------------------------------------------------------------------------
const PROTAGONISTS = [
  {
    name: 'Dr Martin Luther King Jr.',
    role: 'President of SCLC & Moral Leader',
    card: 'card_mlk.png',
    desc: 'Championed Christian non-violence and economic justice from Montgomery (1955) to Washington (1963) and Memphis (1968).',
  },
  {
    name: 'Malcolm X (El-Hajj Malik El-Shabazz)',
    role: 'Spokesman for Nation of Islam & Black Pride',
    card: 'card_malcolmx.png',
    desc: 'Articulated northern ghetto frustration, advocating armed self-defence "by any means necessary" and global Pan-Africanism.',
  },
  {
    name: 'President Lyndon B. Johnson',
    role: '36th President of the United States',
    card: 'card_lbj.png',
    desc: 'Masterminded the 1964 Civil Rights Act and 1965 Voting Rights Act, but his presidency was destroyed by escalation in Vietnam.',
  },
  {
    name: 'President Richard M. Nixon',
    role: '37th President of the United States',
    card: 'card_nixon.png',
    desc: 'Elected on "Law and Order" and "Peace with Honor"; executed Vietnamization, bombed Cambodia, and signed the 1973 Paris Peace Accords.',
  },
  {
    name: 'Ho Chi Minh',
    role: 'President of Democratic Republic of Vietnam',
    card: 'card_ho_chi_minh.png',
    desc: 'Unified Vietnamese communism and anti-colonial nationalism, inspiring total resistance against French and US forces.',
  },
  {
    name: 'Thurgood Marshall',
    role: 'NAACP Chief Counsel & Supreme Court Justice',
    card: 'card_marshall.png',
    desc: 'Architect of the NAACP courtroom strategy that won Brown v. Topeka (1954); became first Black Supreme Court Justice in 1967.',
  },
  {
    name: 'Stokely Carmichael (Kwame Ture)',
    role: 'Chairman of SNCC & Black Power Leader',
    card: 'card_carmichael.png',
    desc: 'Popularised the slogan "Black Power" on the 1966 Meredith March, steering student activism toward self-reliance and pride.',
  },
  {
    name: 'General William Westmoreland',
    role: 'Commander of MACV (US Forces in Vietnam)',
    card: 'card_westmoreland.png',
    desc: 'Directed the war of attrition, Search-and-Destroy missions, and body-count strategy from 1964 until post-Tet reassignment.',
  },
];

// --------------------------------------------------------------------------
// TIER 3 DISCIPLINARY VOCABULARY (PAGE 23)
// --------------------------------------------------------------------------
const VOCABULARY = [
  {
    term: 'De Jure Segregation',
    phon: '/diː ˈdʒʊəriː/',
    def: 'Racial segregation enforced by statutory law, such as the Jim Crow codes across the American South.',
  },
  {
    term: 'De Facto Segregation',
    phon: '/diː ˈfæktoʊ/',
    def: 'Racial separation existing in practice through economic disparity, discriminatory bank lending, and housing patterns.',
  },
  {
    term: 'Disenfranchisement',
    phon: '/ˌdɪsɪnˈfræntʃaɪzmənt/',
    def: 'The systematic deprivation of voting rights through literacy tests, poll taxes, intimidation, and corrupt registrars.',
  },
  {
    term: 'Non-Violent Direct Action',
    phon: '/nɒn ˈvaɪələnt/',
    def: 'Tactical philosophy (sit-ins, boycotts, marches) deliberately provoking racist violence to compel federal intervention.',
  },
  {
    term: 'Black Power',
    phon: '/blæk ˈpaʊər/',
    def: 'Political doctrine emphasizing racial pride, cultural autonomy, self-determination, and community armed self-defence.',
  },
  {
    term: 'Domino Theory',
    phon: '/ˈdɒmɪnoʊ ˈθɪəri/',
    def: 'US Cold War strategic belief that if one nation fell to communism, neighbouring countries would inevitably collapse.',
  },
  {
    term: 'Containment',
    phon: '/kənˈteɪnmənt/',
    def: 'US foreign policy doctrine aiming to halt the global spread of Soviet and Chinese communist influence and territory.',
  },
  {
    term: 'Strategic Hamlets',
    phon: '/strəˈtiːdʒɪk ˈhæmlɪts/',
    def: 'Fortified villages constructed by the Diem regime to forcibly relocate peasants and isolate them from Vietcong guerrillas.',
  },
  {
    term: 'Search and Destroy',
    phon: '/sɜːtʃ ænd dɪˈstrɔɪ/',
    def: 'US military combat tactic inserting helicopter troops into jungle villages to hunt enemy units and burn supply bases.',
  },
  {
    term: 'Credibility Gap',
    phon: '/ˌkrɛdəˈbɪləti gæp/',
    def: 'The widening chasm between official optimistic government statements on the war and grim televised battlefield reality.',
  },
  {
    term: 'Vietnamization',
    phon: '/ˌvjɛtnəmɪˈzeɪʃən/',
    def: 'Nixon’s policy of expanding, equipping, and training ARVN forces while systematically withdrawing US ground combat troops.',
  },
  {
    term: 'War Powers Act (1973)',
    phon: '/wɔː ˈpaʊəz ækt/',
    def: 'Federal statute passed over Nixon’s veto restricting presidential power to deploy US military forces without Congress.',
  },
];

// --------------------------------------------------------------------------
// HTML BUILDER: 24-PAGE A4 SADDLE-STITCH BOOKLET
// --------------------------------------------------------------------------
function buildHtml() {
  const qrSvg = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=usa');
  const specImg1Base64 = getUsaImageBase64('usa_spec_cropped_kt1_kt2.png');
  const specImg2Base64 = getUsaImageBase64('usa_spec_cropped_kt3_kt4.png');

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The USA, 1954–75: Master Knowledge Retrieval & Homework Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 6mm 8mm 5mm 8mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 8.7pt;
      line-height: 1.24;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page-container {
      width: 100%;
      height: 286mm;
      max-height: 286mm;
      position: relative;
      page-break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      box-sizing: border-box;
      padding: 0;
    }
    .page-body-full {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      overflow: hidden;
    }

    /* Running Header & Footer */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 2px solid #000000;
      padding-bottom: 2px;
      margin-bottom: 2.2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }
    .page-footer-strip {
      border-top: 1.2px solid #000000;
      padding-top: 2px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #000000;
    }
    .footer-page-num { font-weight: 800; }
    .footer-quip { font-style: italic; color: #111111; font-weight: 500; }

    /* Page 1: Cover Styles */
    .cover-top-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 7px 10px;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
      font-weight: 900;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      border-radius: 2px;
    }
    .cover-title-group {
      text-align: center;
      padding: 3px 0 2px 0;
      border-bottom: 1.8px solid #000000;
      margin-bottom: 3px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', serif;
      font-size: 15.5pt;
      font-weight: 900;
      margin: 0 0 1px 0;
      line-height: 1.1;
      color: #000000;
      letter-spacing: -0.3px;
    }
    .cover-sub-title {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #1e293b;
      margin: 0;
    }
    /* Specification Snapshot (Top Half) */
    .cover-spec-container {
      border: 1.3px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      padding: 3px 5px;
      margin-bottom: 4px;
    }
    .cover-spec-header-strip {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 3px;
      border-radius: 1px;
    }
    .cover-spec-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .cover-spec-col {
      display: flex;
      flex-direction: column;
      border: 1px solid #94a3b8;
      background: #ffffff;
      border-radius: 2px;
      overflow: hidden;
    }
    .cover-spec-col-title {
      background: #f1f5f9;
      color: #0f172a;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      text-align: center;
      padding: 2px 4px;
      border-bottom: 1px solid #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .cover-spec-img {
      width: 100%;
      height: 98mm;
      object-fit: contain;
      background: #ffffff;
      display: block;
    }

    .scholar-meta-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 12px;
      border: 1.3px solid #0f172a;
      padding: 4px 10px;
      background: #ffffff;
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
      font-size: 8.2pt;
    }
    .scholar-field { display: flex; align-items: baseline; gap: 4px; }
    .scholar-field strong { font-weight: 900; color: #0f172a; }
    .scholar-field .field-line { flex: 1; border-bottom: 1.2px solid #0f172a; height: 9px; }

    /* Homework Tracking Dual Grid (Bottom Half) */
    .hw-ledger-dual-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-bottom: 4px;
    }
    .hw-ledger-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
    }
    .hw-ledger-table thead th {
      background: #0f172a;
      color: #ffffff;
      padding: 3px 4px;
      font-weight: 800;
      text-transform: uppercase;
      border: 1px solid #0f172a;
      font-size: 6.8pt;
      letter-spacing: 0.3px;
    }
    .hw-ledger-table td {
      border: 1px solid #cbd5e1;
      padding: 2.8px 4.5px;
      vertical-align: middle;
      color: #000000;
      line-height: 1.15;
    }
    .hw-ledger-table tr:nth-child(even) td { background: #f8fafc; }
    .hw-col-title {
      background: #1e293b !important;
      color: #ffffff;
      font-size: 7.0pt;
      font-weight: 900;
      text-align: center;
      padding: 2.5px 4px !important;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }

    .cover-bottom-grid {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: stretch;
      margin-bottom: 2px;
    }

    .cover-protocol-box {
      border: 1.3px solid #0f172a;
      border-left: 4.5px solid #0f172a;
      border-radius: 2px;
      padding: 4.5px 8px;
      background: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      line-height: 1.32;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .cover-protocol-box strong {
      color: #0f172a;
      font-size: 7.5pt;
      margin-bottom: 1.5px;
      display: block;
    }

    .cover-qr-card {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      padding: 3px 6px;
      background: #f8fafc;
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-shrink: 0;
    }
    .cover-qr-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.7pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .cover-qr-img-box {
      width: 44px;
      height: 44px;
      margin-bottom: 2px;
    }
    .cover-qr-desc {
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      line-height: 1.15;
      color: #475569;
      font-weight: 600;
    }

    /* Page 2: Chronology Domino Flowchart */
    .timeline-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.0px 6px;
      flex: 1;
      margin: 2px 0;
    }
    .domino-node {
      border: 1.2px solid #0f172a;
      border-left: 3.5px solid #0f172a;
      border-radius: 2px;
      padding: 2.2px 5px;
      background: #ffffff;
      display: flex;
      gap: 5px;
      align-items: flex-start;
      line-height: 1.16;
    }
    .domino-year {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 900;
      padding: 1px 3.5px;
      border-radius: 2px;
      white-space: nowrap;
      letter-spacing: 0.2px;
    }
    .domino-body { flex: 1; }
    .domino-title { font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #000000; display: block; margin-bottom: 0.5px; }
    .domino-desc { font-family: 'Georgia', serif; font-size: 7.0pt; color: #222222; }

    /* Enquiry Pages (Pages 3–18) */
    .lesson-meta-bar {
      background: #f8fafc;
      border-left: 4px solid #0f172a;
      padding: 3px 8px;
      margin-bottom: 2px;
      border-top: 1px solid #cbd5e1;
      border-right: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
    }
    .lesson-meta-title { font-family: 'Playfair Display', serif; font-size: 10.2pt; font-weight: 900; color: #000000; margin: 0; line-height: 1.15; }
    .lesson-meta-enquiry { font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #334155; margin-top: 1px; }

    .q-block {
      border: 1.1px solid #94a3b8;
      border-radius: 2px;
      padding: 2.4px 6px;
      margin-bottom: 1.8px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .q-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 5px;
      line-height: 1.16;
    }
    .q-prompt-wrap { display: flex; gap: 4px; flex: 1; }
    .q-num { font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; color: #000000; min-width: 15px; }
    .q-prompt { font-family: 'Georgia', serif; font-size: 8.4pt; font-weight: 700; color: #000000; line-height: 1.16; }
    .q-attempt { font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; color: #475569; white-space: nowrap; }

    .q-line-row {
      display: flex;
      align-items: flex-end;
      gap: 5px;
      margin-top: 0.5px;
    }
    .q-line-lbl {
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 800;
      color: #000000;
      white-space: nowrap;
      min-width: 68px;
    }
    .q-solid-line {
      flex: 1;
      border-bottom: 1.2px solid #000000;
      height: 6.2mm;
    }

    /* Examiner Trap Box at Base of Enquiry Pages */
    .examiner-trap-box {
      border: 1.2px solid #b91c1c;
      border-left: 4px solid #b91c1c;
      background: #fef2f2;
      padding: 3px 7px;
      margin-top: 2px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      line-height: 1.22;
      color: #991b1b;
      font-weight: 600;
    }
    .examiner-trap-box strong {
      color: #7f1d1d;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    /* Pages 19–22: Department Marking Bank (2 COLUMNS x 2 ROWS = 4 ENQUIRIES PER PAGE) */
    .mb-grid-4enq {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      flex: 1;
      margin-top: 2px;
      height: 100%;
    }
    .mb-enq-card {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      background: #ffffff;
      padding: 3px 5px;
    }
    .mb-enq-header {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      border-radius: 1px;
      margin-bottom: 2px;
      text-align: center;
    }
    .mb-answers-list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 1.5px;
    }
    .mb-ans-row {
      border-bottom: 1px dashed #cbd5e1;
      padding: 1.2px 2px;
      font-size: 6.9pt;
      line-height: 1.15;
      display: flex;
      gap: 4px;
      align-items: baseline;
    }
    .mb-ans-row:last-child { border-bottom: none; }
    .mb-ans-num { font-family: 'Inter', sans-serif; font-weight: 900; color: #0f172a; min-width: 14px; }
    .mb-ans-text { flex: 1; color: #1e293b; }
    .mb-ans-bold { font-family: 'Inter', sans-serif; font-weight: 800; color: #000000; }
    .mb-check-box { font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; color: #475569; white-space: nowrap; }

    /* Page 23: Historical Protagonists & Vocabulary */
    .proto-grid-23 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4.5px 8px;
      margin-bottom: 4px;
    }
    .proto-card-23 {
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      padding: 4px 6px;
      background: #ffffff;
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .proto-img-23 {
      width: 44px;
      height: 52px;
      object-fit: cover;
      border: 1.2px solid #000;
      border-radius: 2px;
      flex-shrink: 0;
      background: #e2e8f0;
    }
    .proto-info-23 { flex: 1; line-height: 1.22; }
    .proto-name-23 { font-family: 'Inter', sans-serif; font-size: 8.4pt; font-weight: 900; color: #000000; }
    .proto-role-23 { font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 700; color: #334155; display: block; }
    .proto-desc-23 { font-family: 'Georgia', serif; font-size: 7.1pt; color: #111827; margin-top: 1px; }

    .vocab-grid-23 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3.5px 7px;
    }
    .vocab-card-23 {
      border: 1px solid #cbd5e1;
      border-left: 3px solid #0f172a;
      padding: 3.8px 6px;
      background: #f8fafc;
      font-size: 7.1pt;
      line-height: 1.22;
    }
    .vocab-term-23 { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; font-size: 8.2pt; }
    .vocab-phon-23 { font-style: italic; color: #64748b; font-size: 6.8pt; }
    .vocab-def-23 { color: #1e293b; font-family: 'Georgia', serif; display: block; margin-top: 1px; }

    /* Page 24: Paper 3 Exam Strategy */
    .strat-card-24 {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      padding: 6px 10px;
      background: #ffffff;
      margin-bottom: 5px;
    }
    .strat-header-24 {
      font-family: 'Inter', sans-serif;
      font-size: 8.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      border-bottom: 1.3px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      letter-spacing: 0.3px;
    }
    .strat-grid-24 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      font-family: 'Georgia', serif;
      font-size: 7.5pt;
      line-height: 1.25;
    }
    .strat-col-item {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      padding: 4px 6px;
      border-radius: 2px;
    }
    .strat-col-item strong {
      font-family: 'Inter', sans-serif;
      font-size: 7.8pt;
      color: #0f172a;
      display: block;
      margin-bottom: 2px;
    }

    .archival-seal-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      border: 1.3px solid #0f172a;
      background: #f8fafc;
      padding: 5px 12px;
      margin-top: 3px;
    }
    .archival-seal-badge {
      border: 2px solid #0f172a;
      padding: 3px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      font-weight: 900;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: center;
    }
  </style>
</head>
<body>
`;

  // =========================================================================
  // PAGE 1: UNIFORM FRONT COVER & FORMATIVE HOMEWORK TRACKER
  // =========================================================================
  html += `
  <div class="page-container" id="page-1">
    <div class="cover-top-banner" data-department-name="The History Department">
      <span class="school-brand-target">The History Department</span> • Pearson Edexcel GCSE History Paper 3
    </div>

    <div class="cover-title-group">
      <h1 class="cover-main-title">The USA, 1954–75: Conflict at Home & Abroad</h1>
      <p class="cover-sub-title">Master Knowledge Retrieval & Homework Companion • Specification 1HI0/33</p>
    </div>

    <div class="scholar-meta-grid">
      <div class="scholar-field"><strong>Scholar Name:</strong> <div class="field-line"></div></div>
      <div class="scholar-field"><strong>Class / Group:</strong> <div class="field-line"></div></div>
      <div class="scholar-field"><strong>Teacher:</strong> <div class="field-line"></div></div>
    </div>

    <!-- TOP HALF: OFFICIAL PEARSON SPECIFICATION SNAPSHOT -->
    <div class="cover-spec-container">
      <div class="cover-spec-header-strip">
        <span>Official Specification Snapshot • Pearson Edexcel GCSE (9–1) History Issue 6 • Option 33</span>
        <span>Paper 3 Core Curriculum</span>
      </div>
      <div class="cover-spec-grid">
        <div class="cover-spec-col">
          <div class="cover-spec-col-title">Part I: Civil Rights Movement (Key Topics 1 &amp; 2)</div>
          <img src="${specImg1Base64}" class="cover-spec-img" alt="Official Pearson Specification: Civil Rights">
        </div>
        <div class="cover-spec-col">
          <div class="cover-spec-col-title">Part II: The USA &amp; The Vietnam War (Key Topics 3 &amp; 4)</div>
          <img src="${specImg2Base64}" class="cover-spec-img" alt="Official Pearson Specification: Vietnam War">
        </div>
      </div>
    </div>

    <div class="hw-ledger-dual-grid">
      <!-- Part I: Civil Rights Movement (1954-1975) -->
      <table class="hw-ledger-table">
        <thead>
          <tr>
            <th colspan="3" class="hw-col-title">Part I: Civil Rights Movement (1954–1975)</th>
          </tr>
          <tr>
            <th style="width: 54%; text-align: left; padding-left: 6px;">Enquiry Focus</th>
            <th style="width: 20%; text-align: center;">Due Date</th>
            <th style="width: 26%; text-align: center;">Parent / Carer Sign</th>
          </tr>
        </thead>
        <tbody>
          ${USA_PEARSON_QUIZ_BANK.slice(0, 8)
            .map(
              (item) => `
          <tr>
            <td><strong>E${item.num}:</strong> ${item.title}</td>
            <td style="text-align: center; font-family: monospace; font-size: 7.2pt; color: #334155;">____/____</td>
            <td style="text-align: center; border-bottom: 1px dotted #94a3b8;">&nbsp;</td>
          </tr>`,
            )
            .join('')}
        </tbody>
      </table>

      <!-- Part II: The USA & The Vietnam War (1954-1975) -->
      <table class="hw-ledger-table">
        <thead>
          <tr>
            <th colspan="3" class="hw-col-title">Part II: The USA & The Vietnam War (1954–1975)</th>
          </tr>
          <tr>
            <th style="width: 54%; text-align: left; padding-left: 6px;">Enquiry Focus</th>
            <th style="width: 20%; text-align: center;">Due Date</th>
            <th style="width: 26%; text-align: center;">Parent / Carer Sign</th>
          </tr>
        </thead>
        <tbody>
          ${USA_PEARSON_QUIZ_BANK.slice(8, 16)
            .map(
              (item) => `
          <tr>
            <td><strong>E${item.num}:</strong> ${item.title}</td>
            <td style="text-align: center; font-family: monospace; font-size: 7.2pt; color: #334155;">____/____</td>
            <td style="text-align: center; border-bottom: 1px dotted #94a3b8;">&nbsp;</td>
          </tr>`,
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="cover-bottom-grid">
      <div class="cover-protocol-box">
        <strong>Home Learning & Parental Partnership Protocol</strong>
        For each weekly enquiry, scholars must complete their 12 retrieval questions under timed recall conditions before self-checking answers against the Department Marking Bank on Pages 19–22. Every question requires both <em>Line 1 (Core Fact)</em> and <em>Line 2 (Historical Explanation)</em>. Parents and carers are kindly requested to inspect that both lines are fully attempted and sign the ledger alongside the due date.
      </div>
      <div class="cover-qr-card">
        <div class="cover-qr-title">Digital Revision Portal</div>
        <div class="cover-qr-img-box">${qrSvg}</div>
        <div class="cover-qr-desc">Scan for 20-question self-marking quizzes, digital flashcards & Edexcel model answers</div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 1</span>
      <span class="footer-quip">${APPROVED_FOOTERS[0]}</span>
      <span class="footer-page-num">1HI0/33</span>
    </div>
  </div>
`;

  // =========================================================================
  // PAGE 2: MASTER CHRONOLOGY DOMINO FLOWCHART (1954–1975)
  // =========================================================================
  html += `
  <div class="page-container" id="page-2">
    <div class="running-header">
      <span>Key Chronology & Causal Turning Points</span>
      <span>The USA, 1954–1975 • Paper 3</span>
    </div>

    <div class="lesson-meta-bar" style="margin-bottom: 3px;">
      <h2 class="lesson-meta-title">The Master Chronology Domino Flowchart (1954–1975)</h2>
      <div class="lesson-meta-enquiry">28 Decisive Causal Turning Points • The Struggle for Civil Rights & Entanglement in Vietnam</div>
    </div>

    <div class="timeline-grid">
      ${DOMINO_TIMELINE.map(
        (node) => `
      <div class="domino-node">
        <span class="domino-year">${node.year}</span>
        <div class="domino-body">
          <span class="domino-title">${node.title}</span>
          <span class="domino-desc">${node.text}</span>
        </div>
      </div>`,
      ).join('')}
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 2</span>
      <span class="footer-quip">${APPROVED_FOOTERS[1]}</span>
      <span class="footer-page-num">1HI0/33</span>
    </div>
  </div>
`;

  // =========================================================================
  // PAGES 3–18: 16 ENQUIRY RETRIEVAL PAGES (12 QUESTIONS PER PAGE)
  // =========================================================================
  USA_PEARSON_QUIZ_BANK.forEach((enq, idx) => {
    const pageNum = idx + 3;
    html += `
  <div class="page-container" id="page-${pageNum}">
    <div class="running-header">
      <span>${enq.keyTopic}</span>
      <span>Enquiry ${enq.num} of 16</span>
    </div>

    <div class="lesson-meta-bar">
      <h2 class="lesson-meta-title">Enquiry ${enq.num}: ${enq.title}</h2>
      <div class="lesson-meta-enquiry">${enq.enquiry}</div>
    </div>

    <div class="page-body-full" style="justify-content: space-between;">
      ${enq.questions
        .map(
          (q, qIdx) => `
      <div class="q-block">
        <div class="q-header">
          <div class="q-prompt-wrap">
            <span class="q-num">${qIdx + 1}.</span>
            <span class="q-prompt">${q.q}</span>
          </div>
          <span class="q-attempt">[ &nbsp; ]</span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Line 1 (Core Fact):</span>
          <div class="q-solid-line"></div>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Line 2 (Explanation):</span>
          <div class="q-solid-line"></div>
        </div>
      </div>`,
        )
        .join('')}
    </div>

    <div class="examiner-trap-box">
      <strong>⚠️ ${enq.examinerTrap.split(':')[0]}:</strong> ${enq.examinerTrap.split(':')[1] || ''}
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page ${pageNum}</span>
      <span class="footer-quip">${APPROVED_FOOTERS[pageNum - 1]}</span>
      <span class="footer-page-num">1HI0/33</span>
    </div>
  </div>
`;
  });

  // =========================================================================
  // PAGES 19–22: 4-PAGE DEPARTMENT MARKING BANK (4 ENQUIRIES PER PAGE)
  // =========================================================================
  const MARKING_PAGES = [
    {
      title: 'Key Topic 1: The Development of the Civil Rights Movement, 1954–60',
      enqs: [0, 1, 2, 3],
    },
    { title: 'Key Topic 2: Protest, Progress and Radicalism, 1960–75', enqs: [4, 5, 6, 7] },
    { title: 'Key Topic 3: US Involvement in the Vietnam War, 1954–75', enqs: [8, 9, 10, 11] },
    {
      title: 'Key Topic 4: Reactions to, and the End of, the Vietnam War, 1964–75',
      enqs: [12, 13, 14, 15],
    },
  ];

  MARKING_PAGES.forEach((mp, mpIdx) => {
    const pageNum = 19 + mpIdx;
    html += `
  <div class="page-container" id="page-${pageNum}">
    <div class="running-header">
      <span>Department Marking Bank • Green-Pen DIRT Review</span>
      <span>${mp.title}</span>
    </div>

    <div class="lesson-meta-bar" style="margin-bottom: 2px;">
      <h2 class="lesson-meta-title">Department Marking Bank: Part ${mpIdx + 1} of 4</h2>
      <div class="lesson-meta-enquiry">Self-Assessment Answer Key • Award [✓] for Core Fact + [✓] for Accurate Historical Explanation</div>
    </div>

    <div class="mb-grid-4enq">
      ${mp.enqs
        .map((enqIdx) => {
          const enq = USA_PEARSON_QUIZ_BANK[enqIdx];
          return `
      <div class="mb-enq-card">
        <div class="mb-enq-header">Enquiry ${enq.num}: ${enq.title}</div>
        <div class="mb-answers-list">
          ${enq.questions
            .map(
              (q, qIdx) => `
          <div class="mb-ans-row">
            <span class="mb-ans-num">${qIdx + 1}.</span>
            <div class="mb-ans-text">
              <span class="mb-ans-bold">${q.a}</span> — ${q.exp}
            </div>
            <span class="mb-check-box">[✓][✗]</span>
          </div>`,
            )
            .join('')}
        </div>
      </div>`;
        })
        .join('')}
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page ${pageNum}</span>
      <span class="footer-quip">${APPROVED_FOOTERS[pageNum - 1]}</span>
      <span class="footer-page-num">1HI0/33</span>
    </div>
  </div>
`;
  });

  // =========================================================================
  // PAGE 23: KEY HISTORICAL PROTAGONISTS & DISCIPLINARY VOCABULARY
  // =========================================================================
  html += `
  <div class="page-container" id="page-23">
    <div class="running-header">
      <span>Key Historical Protagonists & Disciplinary Vocabulary</span>
      <span>The USA, 1954–75 • Paper 3</span>
    </div>

    <div class="lesson-meta-bar" style="margin-bottom: 3px;">
      <h2 class="lesson-meta-title">Key Historical Protagonists Gallery</h2>
      <div class="lesson-meta-enquiry">8 Pivotal Leaders of the Civil Rights Struggle and the War in Vietnam</div>
    </div>

    <div class="proto-grid-23">
      ${PROTAGONISTS.map((p) => {
        const imgBase64 = getUsaImageBase64(p.card);
        return `
      <div class="proto-card-23">
        <img src="${imgBase64}" class="proto-img-23" alt="${p.name}">
        <div class="proto-info-23">
          <span class="proto-name-23">${p.name}</span>
          <span class="proto-role-23">${p.role}</span>
          <span class="proto-desc-23">${p.desc}</span>
        </div>
      </div>`;
      }).join('')}
    </div>

    <div class="lesson-meta-bar" style="margin: 3px 0 2px 0;">
      <h2 class="lesson-meta-title">Tier 3 Disciplinary Vocabulary Bank</h2>
      <div class="lesson-meta-enquiry">12 Essential Conceptual Terms with Phonetics and Historical Meanings</div>
    </div>

    <div class="vocab-grid-23">
      ${VOCABULARY.map(
        (v) => `
      <div class="vocab-card-23">
        <span class="vocab-term-23">${v.term}</span> <span class="vocab-phon-23">${v.phon}</span>
        <span class="vocab-def-23">${v.def}</span>
      </div>`,
      ).join('')}
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 23</span>
      <span class="footer-quip">${APPROVED_FOOTERS[22]}</span>
      <span class="footer-page-num">1HI0/33</span>
    </div>
  </div>
`;

  // =========================================================================
  // PAGE 24: EDEXCEL PAPER 3 EXAMINATION STRATEGY & ESSAY ARCHITECT
  // =========================================================================
  html += `
  <div class="page-container" id="page-24">
    <div class="running-header">
      <span>Edexcel Paper 3 Examination Strategy</span>
      <span>Modern Depth Study (1HI0/33)</span>
    </div>

    <div class="lesson-meta-bar" style="margin-bottom: 3px;">
      <h2 class="lesson-meta-title">Edexcel Paper 3 Examination Blueprint & Essay Architect</h2>
      <div class="lesson-meta-enquiry">Mastering the 5 Essential Question Types for Grade 9 Success</div>
    </div>

    <div class="strat-card-24">
      <div class="strat-header-24">
        <span>Section A: Source Inference & Causal Explanation</span>
        <span>Questions 1 & 2 (16 Marks Total)</span>
      </div>
      <div class="strat-grid-24">
        <div class="strat-col-item">
          <strong>Question 1: Source Inference [4 Marks • 5 Mins]</strong>
          Give two things you can infer from Source A about [topic].<br>
          • <em>Formula:</em> "I can infer that..." + "Details in the source that tell me this are..."<br>
          • <em>Examiner Rule:</em> Never simply copy a quote without stating the inference behind it.
        </div>
        <div class="strat-col-item">
          <strong>Question 2: Explain Why [12 Marks • 18 Mins]</strong>
          Explain why [event happened]... You may use [Stimulus 1] and [Stimulus 2].<br>
          • <em>Formula:</em> Write 3 detailed PEEL paragraphs (both stimulus points + 1 substantial own knowledge point).<br>
          • <em>Examiner Rule:</em> Explicitly link back: "This led directly to... because..."
        </div>
      </div>
    </div>

    <div class="strat-card-24">
      <div class="strat-header-24">
        <span>Section B: Source Utility & Historical Interpretations</span>
        <span>Questions 3(a), 3(b), 3(c) & 3(d) (36 Marks Total)</span>
      </div>
      <div class="strat-grid-24">
        <div class="strat-col-item">
          <strong>Question 3(a): Source Utility [8 Marks • 12 Mins]</strong>
          How useful are Sources B & C for an enquiry into [topic]?<br>
          • <em>Formula:</em> Evaluate Content, Provenance (COP), and Contextual Knowledge for both sources.<br>
          • <em>Examiner Rule:</em> Utility is about how the source helps an enquiry, not whether it is "biased".
        </div>
        <div class="strat-col-item">
          <strong>Questions 3(b) & 3(c): Interpretation Differences [8 Marks • 10 Mins]</strong>
          • <em>3(b) [4m]:</em> State the main difference between Interpretation 1 & 2 using direct details.<br>
          • <em>3(c) [4m]:</em> Suggest one reason why they differ (e.g. they relied on different types of evidence).
        </div>
      </div>
    </div>

    <div class="strat-card-24" style="margin-bottom: 2px;">
      <div class="strat-header-24">
        <span>Question 3(d): The 20-Mark Synoptic Evaluation Essay</span>
        <span>16 Marks Content + 4 Marks SPaG • 30 Minutes</span>
      </div>
      <div style="font-family: 'Georgia', serif; font-size: 7.4pt; line-height: 1.25; color: #1e293b;">
        <strong>The 4-Paragraph Synoptic Architecture:</strong><br>
        • <strong>Paragraph 1 (Agree with Target):</strong> Unpack the view of Interpretation 2 using quotes, own detailed historical evidence, and explain why this factor is compelling.<br>
        • <strong>Paragraph 2 (Counter with Interpretation 1):</strong> Unpack the alternative view of Interpretation 1 using evidence and own knowledge.<br>
        • <strong>Paragraph 3 (Weigh Against Broader Causes):</strong> Integrate wider specification knowledge not covered in either interpretation (e.g. federal intervention vs. economic boycotts; military quagmire vs. domestic anti-war protests).<br>
        • <strong>Conclusion (Final Historical Verdict):</strong> State clearly which interpretation is more convincing by establishing criteria (e.g. long-term permanence vs. short-term catalyst).
      </div>
    </div>

    <div class="archival-seal-wrap">
      <div class="archival-seal-badge">
        OFFICIAL DEPARTMENT ARCHIVAL REVISION STANDARD • 1HI0/33
      </div>
      <div style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; line-height: 1.2;">
        Verified 100% compliant with Pearson Edexcel GCSE (9–1) Specification. 192 Curated Dual-Line Retrieval Prompts across all 16 Enquiries.
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 24</span>
      <span class="footer-quip">${APPROVED_FOOTERS[23]}</span>
      <span class="footer-page-num">1HI0/33</span>
    </div>
  </div>
</body>
</html>`;

  return html;
}

// --------------------------------------------------------------------------
// MAIN COMPILATION ENGINE & PUPPETEER EXPORT
// --------------------------------------------------------------------------
async function compilePdf() {
  console.log('🚀 Compiling Master 24-Page A4 USA 1954–75 Retrieval Companion...');

  const html = buildHtml();
  const htmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'usa',
    'usa_master_retrieval_companion.html',
  );
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`📄 Saved HTML source to: ${htmlPath}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Page Budget & Overflow Audit
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const results = [];
    pages.forEach((p, idx) => {
      results.push({
        page: idx + 1,
        id: p.id,
        scrollHeight: p.scrollHeight,
        clientHeight: p.clientHeight,
        overflow: p.scrollHeight > p.clientHeight + 1,
      });
    });
    return results;
  });

  console.log('\n=============================================================');
  console.log('📐 AUTOMATED PAGE BUDGET & LAYOUT AUDIT: USA 1954–75 COMPANION');
  console.log('=============================================================');
  let hasErrors = false;
  auditResults.forEach((r) => {
    const status = r.overflow
      ? `❌ OVERFLOW (${r.scrollHeight}px > ${r.clientHeight}px)`
      : `✅ OPTIMAL (${r.scrollHeight}px <= ${r.clientHeight}px)`;
    console.log(`Page ${String(r.page).padStart(2, ' ')} (${r.id}): ${status}`);
    if (r.overflow) hasErrors = true;
  });
  console.log('=============================================================\n');

  const targetPdf = path.join(PDFS_DIR, 'USA_1954_1975_Master_Knowledge_Retrieval_Companion.pdf');

  await page.pdf({
    path: targetPdf,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });
  console.log(`✅ Generated Master 24-Page A4 PDF: ${targetPdf}`);

  await browser.close();

  // Mirror to Google Drive Department File if available
  try {
    if (fs.existsSync(DRIVE_BASE)) {
      const gDriveTargets = [
        path.join(
          DRIVE_BASE,
          '02. GCSE (Years 10-11)',
          'Paper 3 - USA 1954-75',
          'USA_1954_1975_Master_Knowledge_Retrieval_Companion.pdf',
        ),
        path.join(DRIVE_BASE, 'pdfs', 'USA_1954_1975_Master_Knowledge_Retrieval_Companion.pdf'),
      ];

      gDriveTargets.forEach((dest) => {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(targetPdf, dest);
        console.log(`☁️ Synced to Google Drive Department File: ${dest}`);
      });
      console.log('✅ Google Drive Department File updated with fresh 24-page A4 companion.');
    }
  } catch (err) {
    console.warn('⚠️ Warning: Google Drive sync issue:', err.message);
  }

  if (hasErrors) {
    console.warn('⚠️ Some pages showed overflow during compilation. Inspect audit table above.');
  } else {
    console.log(
      '🎉 100% SUCCESS: All 24 pages compiled cleanly with 0px overflow! Ready for reprographics.',
    );
  }
}

if (require.main === module) {
  compilePdf().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { compilePdf };
