/**
 * generate_usa_quiz_booklet.cjs
 *
 * Compiles the Master 24-Page A4 Saddle-Stitch Knowledge Retrieval & Homework Companion
 * for Pearson Edexcel GCSE History Paper 3 (1HI0/33): The USA, 1954–75: Conflict at Home and Abroad.
 *
 * Strict Compliance:
 * - Institutional neutrality (The History Department / GCSE History Revision Hub)
 * - Zero AI educational jargon / authentic classroom examiner standard
 * - 100% uniformity across all 16 enquiries (8 tiered questions per enquiry = 128 questions)
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
  'Edexcel Paper 3 Examination Strategy: Section A & Section B Question Guide • The History Department', // P23
  'Edexcel Paper 3 Synoptic Evaluation Essay Architect & Digital Revision Hub • Departmental Archival Standard', // P24
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
// LEDGER SPECIFICATION ENTRIES (PAGE 1)
// --------------------------------------------------------------------------
const LEDGER_ENTRIES = [
  {
    topicCode: 'KT 1.1',
    title: 'Enq 1: Position of Black Americans in Early 1950s',
    sub: 'Jim Crow laws, Plessy v. Ferguson, 14th Amendment, NAACP legal strategy, poll taxes & literacy tests',
  },
  {
    topicCode: 'KT 1.2',
    title: 'Enq 2: Education: Brown v. Topeka & Little Rock',
    sub: 'Brown v. Topeka 1954, Earl Warren, Ku Klux Klan revival, Little Rock Nine 1957, Faubus & 101st Airborne',
  },
  {
    topicCode: 'KT 1.3',
    title: 'Enq 3: The Montgomery Bus Boycott (1955–56)',
    sub: 'Rosa Parks, Jo Ann Robinson & WPC, MLK leadership, 381-day carpools, Browder v. Gayle desegregation ruling',
  },
  {
    topicCode: 'KT 1.4',
    title: 'Enq 4: White Resistance, Emmett Till & 1957 Act',
    sub: "Murder of Emmett Till 1955, all-white juries, White Citizens' Councils, Southern Manifesto, 1957 Civil Rights Act",
  },
  {
    topicCode: 'KT 2.1',
    title: 'Enq 5: Sit-Ins, Freedom Rides & James Meredith',
    sub: 'Greensboro 1960, SNCC, CORE Freedom Rides 1961, Anniston firebombing, James Meredith & Ole Miss riots 1962',
  },
  {
    topicCode: 'KT 2.2',
    title: 'Enq 6: Birmingham, Washington & Landmark Acts',
    sub: 'Project C & Bull Connor 1963, March on Washington, 1964 Civil Rights Act, Selma & 1965 Voting Rights Act',
  },
  {
    topicCode: 'KT 2.3',
    title: 'Enq 7: Malcolm X & The Rise of Black Power',
    sub: 'Nation of Islam, Malcolm X, Stokely Carmichael & 1966 Meredith March, Black Panther Party 1966, 1968 Olympics',
  },
  {
    topicCode: 'KT 2.4',
    title: 'Enq 8: Urban Rioting, Kerner Report & King (1965–68)',
    sub: 'Watts riots 1965, Chicago Campaign 1966, 1968 Kerner Report ("two societies"), MLK assassination & 1968 Housing Act',
  },
  {
    topicCode: 'KT 3.1',
    title: 'Enq 9: US Intervention: Domino Theory & Diem',
    sub: 'Dien Bien Phu & 1954 Geneva Accords, Domino Theory, SEATO, Ngo Dinh Diem, Vietcong & Strategic Hamlets',
  },
  {
    topicCode: 'KT 3.2',
    title: 'Enq 10: Tonkin, Escalation & Rolling Thunder',
    sub: '1963 Diem coup, Gulf of Tonkin Incident & Resolution 1964, Operation Rolling Thunder 1965, US combat troops landing',
  },
  {
    topicCode: 'KT 3.3',
    title: 'Enq 11: Tactics: Guerrillas vs Search & Destroy',
    sub: 'Vietcong guerrilla tactics & Ho Chi Minh Trail, Cu Chi tunnels, Operation Cedar Falls, Agent Orange & Napalm',
  },
  {
    topicCode: 'KT 3.4',
    title: 'Enq 12: Vietnamization, Secret Bombing & Accords',
    sub: 'Nixon Doctrine, Vietnamization policy, Operation Menu bombing Cambodia & Laos 1969–70, Kissinger secret diplomacy',
  },
  {
    topicCode: 'KT 4.1',
    title: 'Enq 13: Tet Offensive & The Anti-War Movement',
    sub: 'Tet Offensive Jan 1968, Battle of Hue & Saigon Embassy, Walter Cronkite credibility gap, SDS, draft card burning',
  },
  {
    topicCode: 'KT 4.2',
    title: 'Enq 14: Media, My Lai, Kent State & Silent Majority',
    sub: "1968 My Lai Massacre & Ron Ridenhour, Kent State shootings May 1970, Pentagon Papers 1971, Nixon's Silent Majority",
  },
  {
    topicCode: 'KT 4.3',
    title: 'Enq 15: Peace Process, Paris Agreement & Costs',
    sub: '1972 Linebacker bombing, Jan 1973 Paris Peace Accords, US troop withdrawal, War Powers Act 1973, 1975 Fall of Saigon',
  },
  {
    topicCode: 'KT 4.4',
    title: 'Enq 16: Why the US Failed: Synoptic Evaluation',
    sub: 'Military vs political failure, Vietnamese nationalism, anti-war movement at home, human and financial cost of the war',
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
  const qrKt1 = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=usa#kt1');
  const qrKt2 = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=usa#kt2');
  const qrKt3 = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=usa#kt3');
  const qrHub = generateQrSvg('https://the-history-revision-hub.netlify.app/?unit=usa');

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
    .pupil-meta-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 14px;
      border: 1.4px solid #0f172a;
      padding: 6px 12px;
      background: #ffffff;
      margin-bottom: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
    }
    .pupil-field { display: flex; align-items: baseline; gap: 6px; }
    .pupil-field strong { font-weight: 900; color: #0f172a; }
    .pupil-field .field-line { flex: 1; border-bottom: 1.4px solid #0f172a; height: 11px; }

    /* Expanded Full-Page Homework Tracking Dual Grid */
    .hw-ledger-full-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;
      margin-bottom: 6px;
    }
    .hw-ledger-dual-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      flex: 1;
    }
    .hw-ledger-table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
    }
    .hw-ledger-table thead th {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 4px;
      font-weight: 900;
      text-transform: uppercase;
      border: 1.2px solid #0f172a;
      font-size: 6.8pt;
      letter-spacing: 0.3px;
    }
    .hw-ledger-table td {
      border: 1.2px solid #cbd5e1;
      padding: 3px 5px;
      vertical-align: middle;
      color: #000000;
      line-height: 1.15;
    }
    .hw-ledger-table tr:nth-child(even) td { background: #f8fafc; }
    .hw-col-title {
      background: #0f172a !important;
      color: #ffffff;
      font-size: 7.6pt;
      font-weight: 900;
      text-align: center;
      padding: 3px 5px !important;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .ledger-topic-badge {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 5.8pt;
      font-weight: 900;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      margin-right: 3px;
      letter-spacing: 0.2px;
      vertical-align: baseline;
    }
    .ledger-title-text {
      font-family: 'Inter', sans-serif;
      font-size: 7.1pt;
      font-weight: 800;
      color: #0f172a;
      display: inline;
    }
    .ledger-sub-text {
      font-family: 'Georgia', serif;
      font-size: 6.0pt;
      color: #334155;
      font-style: italic;
      line-height: 1.10;
      margin-top: 1px;
    }

    .cover-protocol-box {
      border: 1.4px solid #0f172a;
      border-left: 5px solid #0f172a;
      border-radius: 2px;
      padding: 6px 10px;
      background: #f8fafc;
      font-family: 'Inter', sans-serif;
      font-size: 7.4pt;
      line-height: 1.30;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .cover-protocol-title {
      color: #0f172a;
      font-size: 7.7pt;
      font-weight: 900;
      margin-bottom: 2px;
      display: block;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .cover-protocol-box strong {
      color: #0f172a;
      font-weight: 800;
      display: inline;
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f8fafc;
      border: 1.3px solid #0f172a;
      border-left: 5px solid #0f172a;
      padding: 2.5px 8px;
      margin-bottom: 2px;
      border-radius: 2px;
    }
    .lesson-meta-title { font-family: 'Playfair Display', serif; font-size: 9.8pt; font-weight: 900; color: #000000; margin: 0; line-height: 1.15; }
    .lesson-meta-enquiry { font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; font-style: italic; margin-top: 1px; }

    .enquiry-score-pill {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      padding: 1px 7px;
      min-width: 96px;
      text-align: center;
      flex-shrink: 0;
    }
    .score-main {
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.5px;
    }
    .score-num {
      font-family: 'Inter', sans-serif;
      font-size: 8.8pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1;
      margin: 1px 0;
    }
    .score-sub {
      font-family: 'Inter', sans-serif;
      font-size: 5.0pt;
      font-weight: 700;
      color: #475569;
    }

    .q-block {
      border: 1.1px solid #94a3b8;
      border-radius: 2px;
      padding: 2.8px 6px;
      margin-bottom: 2.0px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }
    .q-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 5px;
      line-height: 1.18;
    }
    .q-prompt-wrap { display: flex; gap: 4px; flex: 1; }
    .q-num { font-family: 'Inter', sans-serif; font-size: 9.6pt; font-weight: 900; color: #000000; min-width: 17px; }
    .q-prompt { font-family: 'Georgia', serif; font-size: 9.6pt; font-weight: 700; color: #000000; line-height: 1.18; }
    .q-marks-pill {
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 800;
      color: #0f172a;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      padding: 1px 5px;
      white-space: nowrap;
      margin-left: 6px;
      flex-shrink: 0;
    }

    .q-line-row {
      display: flex;
      align-items: flex-end;
      gap: 5px;
      margin-top: 0.5px;
    }
    .q-line-lbl {
      font-family: 'Inter', sans-serif;
      font-size: 8.0pt;
      font-weight: 800;
      color: #0f172a;
      white-space: nowrap;
      min-width: 65px;
    }
    .q-solid-line {
      flex: 1;
      border-bottom: 1.2px solid #000000;
      height: 8.4mm;
    }

    /* Examiner Trap Box at Base of Enquiry Pages (Clean SVG/HTML Badge, Zero Glyph Failure) */
    .examiner-trap-box {
      border: 1.3px solid #b91c1c;
      border-left: 4.5px solid #b91c1c;
      background: #fef2f2;
      padding: 4px 8px;
      margin-top: 3px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.2pt;
      line-height: 1.28;
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .trap-tag {
      background: #b91c1c;
      color: #ffffff;
      font-weight: 900;
      font-size: 6.4pt;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      padding: 1.5px 5px;
      border-radius: 2px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .trap-text {
      font-weight: 600;
      color: #991b1b;
      flex: 1;
    }

    /* Pages 19–22: Department Marking Bank (4 Pages • 0px Spillover Standard) */
    .mb-meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f1f5f9;
      border: 1.2px solid #cbd5e1;
      padding: 2.5px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.0pt;
      color: #334155;
      border-radius: 2px;
      margin-bottom: 3px;
    }
    .mb-meta-bar strong {
      color: #0f172a;
      font-weight: 800;
    }
    .mb-grid-4enq {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
      flex: 1;
      margin-top: 1px;
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
      gap: 1px;
    }
    .mb-ans-row {
      border-bottom: 1px dashed #cbd5e1;
      padding: 2.0px 1px;
      font-size: 7.6pt;
      line-height: 1.24;
      display: flex;
      gap: 4px;
      align-items: baseline;
    }
    .mb-ans-row:last-child { border-bottom: none; }
    .mb-ans-num { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; min-width: 15px; }
    .mb-ans-text { flex: 1; color: #000000; font-weight: 500; }
    .mb-ans-bold { font-family: 'Inter', sans-serif; font-weight: 900; color: #000000; font-size: 7.8pt; }
    .mb-check-box { font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 800; color: #000000; white-space: nowrap; }

    /* Page 23: Section A & B Question Guide */
    .strat-meta-bar-23 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 700;
      letter-spacing: 0.3px;
      border-radius: 2px;
      margin-bottom: 3px;
    }
    .strat-meta-bar-23 strong { color: #f8fafc; font-weight: 900; text-transform: uppercase; }
    .strat-stack-23 {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 7px;
      margin: 1px 0;
    }
    .strat-card-full {
      border: 1.3px solid #0f172a;
      border-radius: 2px;
      background: #ffffff;
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 4px;
    }
    .strat-card-header {
      font-family: 'Inter', sans-serif;
      font-size: 9.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      border-bottom: 1.3px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 3px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      letter-spacing: 0.3px;
    }
    .strat-badge {
      font-size: 7.2pt;
      background: #e2e8f0;
      color: #0f172a;
      padding: 1.5px 6px;
      border-radius: 2px;
      font-weight: 800;
    }
    .strat-task-prompt {
      font-family: 'Georgia', serif;
      font-size: 8.6pt;
      color: #1e293b;
      margin-bottom: 3px;
    }
    .strat-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      flex: 1;
    }
    .strat-grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      flex: 1;
    }
    .strat-subbox {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 6px 10px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 8.5pt;
      line-height: 1.36;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3px;
    }
    .strat-subbox-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.6pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2.5px;
    }
    .highlight-box {
      border-left-color: #b91c1c;
      background: #fff5f5;
    }
    .strat-rule-strip {
      margin-top: 3px;
      border: 1px solid #cbd5e1;
      background: #f1f5f9;
      padding: 3.5px 7px;
      border-radius: 2px;
      display: flex;
      align-items: baseline;
      gap: 6px;
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
    }
    .strat-mini-trap {
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      line-height: 1.32;
      color: #991b1b;
      font-weight: 700;
      margin-top: 2px;
      display: flex;
      align-items: baseline;
      gap: 5px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      padding: 3px 6px;
      border-radius: 2px;
    }

    /* Page 24: Synoptic Essay Architect & Digital Revision Hub */
    .strat-meta-bar-24 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      font-family: 'Inter', sans-serif;
      font-size: 7.3pt;
      font-weight: 700;
      letter-spacing: 0.3px;
      border-radius: 2px;
      margin-bottom: 4px;
    }
    .strat-meta-bar-24 strong { color: #f8fafc; font-weight: 900; text-transform: uppercase; }
    .strat-stack-24 {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 10px;
      margin: 2px 0;
    }
    .strat-card-24 {
      border: 1.4px solid #0f172a;
      border-radius: 2px;
      padding: 10px 14px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 6px;
    }
    .strat-header-24 {
      font-family: 'Inter', sans-serif;
      font-size: 10.2pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      border-bottom: 1.3px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      letter-spacing: 0.3px;
    }
    .strat-header-badge {
      font-size: 7.3pt;
      background: #e2e8f0;
      color: #0f172a;
      padding: 1.5px 6px;
      border-radius: 2px;
      font-weight: 800;
    }
    .strat-essay-grid-24 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .strat-essay-step-24 {
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid #0f172a;
      background: #f8fafc;
      padding: 7px 10px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 8.4pt;
      line-height: 1.36;
      color: #1e293b;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3px;
    }
    .strat-step-num {
      font-family: 'Inter', sans-serif;
      font-size: 8.9pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .strat-essay-phrases {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px;
      margin-top: 2px;
    }
    .strat-phrase-col {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      padding: 6px 9px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 8.0pt;
      line-height: 1.34;
      color: #1e293b;
    }
    .strat-phrase-title {
      font-family: 'Inter', sans-serif;
      font-size: 8.3pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2.5px;
    }
    .strat-model-para-24 {
      border: 1.2px solid #0f172a;
      border-left: 4.5px solid #0f172a;
      background: #f8fafc;
      padding: 7px 11px;
      border-radius: 2px;
      font-family: 'Georgia', serif;
      font-size: 8.2pt;
      line-height: 1.38;
      color: #1e293b;
      margin-top: 2px;
    }
    .strat-model-tag {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 2px;
    }
    .strat-criteria-box {
      border: 1px dashed #0f172a;
      background: #f1f5f9;
      padding: 5px 9px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      line-height: 1.34;
      color: #1e293b;
      margin-top: 2px;
    }
    .strat-traps-bar-fixed {
      border: 1.3px solid #b91c1c;
      border-left: 5px solid #b91c1c;
      background: #fef2f2;
      padding: 8px 12px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Inter', sans-serif;
      font-size: 8.1pt;
      color: #7f1d1d;
    }
    .strat-traps-list {
      flex: 1;
      font-weight: 600;
      line-height: 1.36;
    }
    .back-hub-grid-wrap {
      border: 1.4px solid #0f172a;
      background: #f8fafc;
      border-radius: 2px;
      overflow: hidden;
      margin-top: 1px;
    }
    .back-hub-banner {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
    }
    .back-hub-banner-title {
      font-size: 7.8pt;
      font-weight: 900;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
    .back-hub-banner-sub {
      font-size: 6.8pt;
      color: #94a3b8;
      font-weight: 700;
    }
    .back-hub-gateways-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      padding: 5px 8px;
    }
    .hub-gw-card {
      background: #ffffff;
      border: 1.1px solid #cbd5e1;
      border-radius: 2px;
      padding: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 2px;
    }
    .hub-gw-qr {
      width: 58px;
      height: 58px;
      background: #ffffff;
      padding: 1px;
      border: 1px solid #e2e8f0;
    }
    .hub-gw-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
    }
    .hub-gw-badge {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 5.7pt;
      font-weight: 800;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      letter-spacing: 0.2px;
    }
    .hub-gw-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
    }
    .hub-gw-desc {
      font-family: 'Georgia', serif;
      font-size: 6.2pt;
      color: #475569;
      line-height: 1.15;
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
      <p class="cover-sub-title">Pearson Edexcel GCSE (9–1) History • Paper 3 (1HI0/33) • Master Knowledge Companion (128 Core Exam Questions)</p>
    </div>

    <div class="pupil-meta-grid">
      <div class="pupil-field"><strong>Pupil Name:</strong> <div class="field-line"></div></div>
      <div class="pupil-field"><strong>Class / Group:</strong> <div class="field-line"></div></div>
      <div class="pupil-field"><strong>Teacher:</strong> <div class="field-line"></div></div>
    </div>

    <!-- FULL CENTRAL EXPANDED PARENTAL HOMEWORK & RETRIEVAL TRACKER -->
    <div class="hw-ledger-full-wrap">
      <div class="hw-ledger-dual-grid">
        <!-- Part I: Civil Rights Movement (Enquiries 1-8) -->
        <table class="hw-ledger-table">
          <thead>
            <tr>
              <th colspan="5" class="hw-col-title">Part I: Civil Rights Movement (1954–1975)</th>
            </tr>
            <tr>
              <th style="width: 50%; text-align: left; padding-left: 6px;">Enquiry &amp; Specification Focus</th>
              <th style="width: 14%; text-align: center;">Due Date</th>
              <th style="width: 16%; text-align: center;">Score (/16)<br><span style="font-size: 5.4pt; font-weight: 700; text-transform: none; color: #94a3b8;">8 Qs × 2m</span></th>
              <th style="width: 12%; text-align: center;">Parent Sign</th>
              <th style="width: 8%; text-align: center;">RAG</th>
            </tr>
          </thead>
          <tbody>
            ${LEDGER_ENTRIES.slice(0, 8)
              .map(
                (item) => `
            <tr>
              <td>
                <span class="ledger-topic-badge">${item.topicCode}</span>
                <div class="ledger-title-text">${item.title}</div>
                <div class="ledger-sub-text">${item.sub}</div>
              </td>
              <td style="text-align: center; font-family: monospace; font-size: 7.2pt; color: #475569;">____/____</td>
              <td style="text-align: center; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #0f172a;">&nbsp;&nbsp;&nbsp;&nbsp;/ 16</td>
              <td style="text-align: center; border-bottom: 1px dotted #94a3b8;">&nbsp;</td>
              <td style="text-align: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #64748b;">[ &nbsp; ]</td>
            </tr>`,
              )
              .join('')}
          </tbody>
        </table>

        <!-- Part II: The USA & The Vietnam War (Enquiries 9-16) -->
        <table class="hw-ledger-table">
          <thead>
            <tr>
              <th colspan="5" class="hw-col-title">Part II: The USA &amp; The Vietnam War (1954–1975)</th>
            </tr>
            <tr>
              <th style="width: 50%; text-align: left; padding-left: 6px;">Enquiry &amp; Specification Focus</th>
              <th style="width: 14%; text-align: center;">Due Date</th>
              <th style="width: 16%; text-align: center;">Score (/16)<br><span style="font-size: 5.4pt; font-weight: 700; text-transform: none; color: #94a3b8;">8 Qs × 2m</span></th>
              <th style="width: 12%; text-align: center;">Parent Sign</th>
              <th style="width: 8%; text-align: center;">RAG</th>
            </tr>
          </thead>
          <tbody>
            ${LEDGER_ENTRIES.slice(8, 16)
              .map(
                (item) => `
            <tr>
              <td>
                <span class="ledger-topic-badge">${item.topicCode}</span>
                <div class="ledger-title-text">${item.title}</div>
                <div class="ledger-sub-text">${item.sub}</div>
              </td>
              <td style="text-align: center; font-family: monospace; font-size: 7.2pt; color: #475569;">____/____</td>
              <td style="text-align: center; font-family: 'Inter', sans-serif; font-size: 7.6pt; font-weight: 800; color: #0f172a;">&nbsp;&nbsp;&nbsp;&nbsp;/ 16</td>
              <td style="text-align: center; border-bottom: 1px dotted #94a3b8;">&nbsp;</td>
              <td style="text-align: center; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #64748b;">[ &nbsp; ]</td>
            </tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <div class="cover-protocol-box">
        <div class="cover-protocol-title">DEPARTMENT RETRIEVAL PROTOCOL &amp; SPACED LEARNING STANDARDS:</div>
        Complete one enquiry weekly as targeted homework. Each question has a 2-mark structure: <strong>Core Fact</strong> (Line 1: 1 mark for the precise historical anchor, date, key figure, act, or battle) and <strong>Historical Explanation</strong> (Line 2: 1 mark for the causal mechanism, tactical impact, or significance). Total: 8 questions × 2 marks = <strong>16 marks per enquiry</strong>. Self-assess in class using green pen against the verified Department Marking Bank on pages 19–22. Scores below 12/16 trigger immediate digital flashcard consolidation.
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
    const cleanTrap = (enq.examinerTrap || '').replace(/^Examiner Warning:\s*/i, '');
    html += `
  <div class="page-container" id="page-${pageNum}">
    <div class="running-header">
      <span>${enq.keyTopic}</span>
      <span>Enquiry ${enq.num} of 16</span>
    </div>

    <div class="lesson-meta-bar">
      <div>
        <h2 class="lesson-meta-title">Enquiry ${enq.num}: ${enq.title}</h2>
        <div class="lesson-meta-enquiry"><strong>Enquiry Focus:</strong> ${enq.enquiry}</div>
      </div>
      <div class="enquiry-score-pill">
        <span class="score-main">ENQUIRY SCORE</span>
        <span class="score-num">/ 16</span>
        <span class="score-sub">Fact: __/8 • Expl: __/8</span>
      </div>
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
          <span class="q-marks-pill">Fact: [ ] &nbsp; Expl: [ ] &nbsp; / 2m</span>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Core Fact:</span>
          <div class="q-solid-line"></div>
        </div>
        <div class="q-line-row">
          <span class="q-line-lbl">Explanation:</span>
          <div class="q-solid-line"></div>
        </div>
      </div>`,
        )
        .join('')}
    </div>

    <div class="examiner-trap-box">
      <span class="trap-tag">EXAMINER WARNING</span>
      <span class="trap-text">${cleanTrap}</span>
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

    <div class="mb-meta-bar">
      <span><strong>Department Marking Bank (Part ${mpIdx + 1} of 4):</strong> ${mp.title}</span>
      <span>Self-Assessment Key • Award [✓] Core Fact + [✓] Explanation</span>
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
  // PAGE 23: EDEXCEL PAPER 3 EXAMINATION STRATEGY (SECTION A & SECTION B)
  // =========================================================================
  html += `
  <div class="page-container" id="page-23">
    <div class="running-header">
      <span>Edexcel Paper 3 Examination Strategy</span>
      <span>Section A & Section B Analytical Blueprints (1HI0/33)</span>
    </div>

    <div class="strat-meta-bar-23">
      <span><strong>Edexcel Paper 3 Question Guide:</strong> Section A & Section B Technical Execution</span>
      <span>Paper 3: 52 Marks Total • 1 Hour 20 Mins (80 Mins)</span>
    </div>

    <div class="strat-stack-23">
      <!-- QUESTION 1: SOURCE INFERENCE -->
      <div class="strat-card-full">
        <div class="strat-card-header">
          <span>Question 1: Contemporary Source Inference</span>
          <span class="strat-badge">4 Marks • Target: 5 Mins</span>
        </div>
        <div class="strat-task-prompt">
          <strong>Official Stem:</strong> <em>"Give two things you can infer from Source A about [historical topic]..."</em>
        </div>
        <div class="strat-grid-2col">
          <div class="strat-subbox">
            <div class="strat-subbox-title">Inference 1 [2 Marks: 1m Insight + 1m Verbatim Evidence]</div>
            <div>• <strong>Valid Deduction:</strong> <em>"I can infer that Southern local authorities deliberately used administrative obstruction and literacy tests to disenfranchise Black citizens."</em></div>
            <div>• <strong>Direct Supporting Quote:</strong> <em>"The source provides evidence for this when it states: '[quote precise factual phrase from Source A]'."</em></div>
            <div>• <strong>Mark Rule:</strong> Never copy a quote without explaining the deduction; a quote alone earns 0/2.</div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Inference 2 [2 Marks: Distinct Second Deduction]</div>
            <div>• <strong>Valid Deduction:</strong> <em>"Secondly, I can also infer that Black applicants faced widespread economic coercion and retaliatory violence from employers."</em></div>
            <div>• <strong>Direct Supporting Quote:</strong> <em>"This is corroborated in the text where the author observes: '[quote distinct second phrase]'."</em></div>
            <div>• <strong>Mark Rule:</strong> Must target an entirely different historical insight from Inference 1.</div>
          </div>
        </div>
        <div class="strat-mini-trap">
          <span class="trap-tag" style="padding: 1px 4px; font-size: 6.2pt;">EXAMINER RULE</span>
          Never copy a quotation without explaining the inference behind it! A quote alone earns 0/2. Always pair 1 mark for inference + 1 mark for supportive detail.
        </div>
      </div>

      <!-- QUESTION 2: CAUSAL EXPLANATION -->
      <div class="strat-card-full">
        <div class="strat-card-header">
          <span>Question 2: Causal Explanation (Why an Event Happened)</span>
          <span class="strat-badge">12 Marks • Target: 18 Mins</span>
        </div>
        <div class="strat-task-prompt">
          <strong>Official Stem:</strong> <em>"Explain why [historical event/development occurred]... You may use [Stimulus 1] and [Stimulus 2]."</em>
        </div>
        <div class="strat-grid-3col">
          <div class="strat-subbox">
            <div class="strat-subbox-title">Paragraph 1: Stimulus 1</div>
            <div>• <strong>Point:</strong> State first causal factor clearly.</div>
            <div>• <strong>Evidence:</strong> Precise dates, acts, statistics.</div>
            <div>• <strong>Explain:</strong> Causal mechanism linking to outcome.</div>
            <div>• <strong>Link:</strong> Clinch direct connection to stem.</div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Paragraph 2: Stimulus 2</div>
            <div>• <strong>Point:</strong> State second causal factor.</div>
            <div>• <strong>Evidence:</strong> Detailed historical proof.</div>
            <div>• <strong>Explain:</strong> How this escalated or forced change.</div>
            <div>• <strong>Link:</strong> Reinforce causal importance.</div>
          </div>
          <div class="strat-subbox highlight-box">
            <div class="strat-subbox-title" style="color: #991b1b;">Paragraph 3: Own Knowledge Gate</div>
            <div>• <strong>MANDATORY LEVEL 4 GATE:</strong></div>
            <div>• Introduce a substantial 3rd factor entirely from own knowledge (omitted from stimulus).</div>
            <div>• Develop full PEEL causation linking to stem.</div>
          </div>
        </div>
        <div class="strat-mini-trap">
          <span class="trap-tag" style="padding: 1px 4px; font-size: 6.2pt;">FATAL TRAP</span>
          Relying solely on the two printed stimulus points strictly caps your mark at Level 2/3 (maximum 7/12 marks). Grade 9 requires rich independent historical knowledge.
        </div>
      </div>

      <!-- QUESTION 3(a): SOURCE UTILITY -->
      <div class="strat-card-full">
        <div class="strat-card-header">
          <span>Question 3(a): Contemporary Source Utility (COP Matrix)</span>
          <span class="strat-badge">8 Marks • Target: 12 Mins</span>
        </div>
        <div class="strat-task-prompt">
          <strong>Official Stem:</strong> <em>"How useful are Sources B and C for an enquiry into [historical issue]?"</em>
        </div>
        <div class="strat-grid-2col">
          <div class="strat-subbox">
            <div class="strat-subbox-title">Source B Evaluation [4 Marks: Content + Context + Provenance]</div>
            <div>• <strong>Content &amp; Context:</strong> What specific details does the source give, and does your own knowledge corroborate or challenge them?</div>
            <div>• <strong>Provenance (NOP):</strong> Nature (speech/report), Origin (author/date), Purpose (motive/audience). How does this affect its historical value?</div>
            <div>• <strong>Enquiry Value:</strong> State how this specific source illuminates the enquiry topic.</div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">Source C Evaluation [4 Marks: Content + Context + Provenance]</div>
            <div>• <strong>Content &amp; Context:</strong> Analyse the specific claims, statistics, or visual evidence presented in the second source.</div>
            <div>• <strong>Provenance (NOP):</strong> Evaluate author credibility, contemporary biases, and emotional intent within the historical context.</div>
            <div>• <strong>Enquiry Value:</strong> Explain what Source C adds that Source B omitted.</div>
          </div>
        </div>
        <div class="strat-mini-trap">
          <span class="trap-tag" style="padding: 1px 4px; font-size: 6.2pt;">FATAL TRAP</span>
          Never dismiss a source as "useless because it is biased"! Even biased propaganda is exceptionally useful for revealing official ideology, motives, and contemporary attitudes.
        </div>
      </div>

      <!-- QUESTIONS 3(b) & 3(c): INTERPRETATIONS -->
      <div class="strat-card-full">
        <div class="strat-card-header">
          <span>Questions 3(b) &amp; 3(c): Historians' Interpretations</span>
          <span class="strat-badge">8 Marks Total (4m + 4m) • Target: 10 Mins</span>
        </div>
        <div class="strat-grid-2col">
          <div class="strat-subbox">
            <div class="strat-subbox-title">3(b) Main Difference in Views [4 Marks • 5 Mins]</div>
            <div>• <strong>State the precise clash:</strong> <em>"Interpretation 1 views [X] as [positive/caused by Y], arguing '[quote]', whereas Interpretation 2 contends [X] was [negative/caused by Z], stating '[quote]'."</em></div>
            <div>• <strong>Direct Comparison:</strong> Use explicit comparative language showing the divergent emphasis.</div>
          </div>
          <div class="strat-subbox">
            <div class="strat-subbox-title">3(c) Why the Historians Disagree [4 Marks • 5 Mins]</div>
            <div>• <strong>Explain the historiographical cause:</strong> <em>"The historians disagree because they relied on different contemporary sources or prioritised different aspects of the enquiry."</em></div>
            <div>• <strong>Concrete Focus:</strong> e.g. Historian 1 focuses on presidential politics; Historian 2 on grassroots community protest.</div>
          </div>
        </div>
        <div class="strat-mini-trap">
          <span class="trap-tag" style="padding: 1px 4px; font-size: 6.2pt;">EXAMINER RULE</span>
          Do NOT treat Interpretations 1 &amp; 2 as primary sources! They are modern historical accounts written after the event. Focus strictly on their historiographical arguments.
        </div>
      </div>
    </div>

    <div class="page-footer-strip">
      <span class="footer-page-num">Page 23</span>
      <span class="footer-quip">${APPROVED_FOOTERS[22]}</span>
      <span class="footer-page-num">1HI0/33</span>
    </div>
  </div>
`;

  // =========================================================================
  // PAGE 24: EDEXCEL PAPER 3 SYNOPTIC ESSAY ARCHITECT & BACK COVER
  // =========================================================================
  html += `
  <div class="page-container" id="page-24">
    <div class="running-header">
      <span>Edexcel Paper 3 Examination Strategy</span>
      <span>Synoptic Evaluation Essay Architect & Back Cover (1HI0/33)</span>
    </div>

    <div class="strat-meta-bar-24">
      <span><strong>Question 3(d) Synoptic Essay Architect:</strong> Grade 9 Evaluative Structure</span>
      <span>16 Marks Content + 4 Marks SPaG • Target: 30 Mins</span>
    </div>

    <div class="strat-stack-24">
      <!-- 20-MARK ESSAY ARCHITECT CARD -->
      <div class="strat-card-24">
        <div class="strat-header-24">
          <span>Question 3(d): The 20-Mark Synoptic Evaluation Essay</span>
          <span class="strat-header-badge">16m Content + 4m SPaG • 30 Mins</span>
        </div>
        <div style="font-family: 'Georgia', serif; font-size: 8.4pt; color: #1e293b; margin-bottom: 2px;">
          <strong>Official Stem:</strong> <em>"How far do you agree with Interpretation 2 about [historical issue]? Explain your answer, using both interpretations and your knowledge of the historical context."</em>
        </div>

        <div class="strat-essay-grid-24">
          <div class="strat-essay-step-24">
            <div class="strat-step-num">Step 1: Agree with Target Interpretation (Interp 2)</div>
            <div>• <strong>Validate Thesis:</strong> Explain why Interpretation 2 provides valid historical insight into the question.</div>
            <div>• <strong>Embed Quotations:</strong> Quote directly from the interpretation to illustrate its causal focus.</div>
            <div>• <strong>Deploy Own Knowledge:</strong> Corroborate with 2–3 precise historical facts (dates, acts, data, key figures).</div>
          </div>
          <div class="strat-essay-step-24">
            <div class="strat-step-num">Step 2: Alternative Viewpoint (Interpretation 1)</div>
            <div>• <strong>Explore Counter-Argument:</strong> Examine the alternative perspective presented in Interpretation 1.</div>
            <div>• <strong>Embed Quotations:</strong> Quote directly to demonstrate where Interpretation 1 places primary causal emphasis.</div>
            <div>• <strong>Deploy Own Knowledge:</strong> Provide conflicting historical evidence validating this alternative view.</div>
          </div>
          <div class="strat-essay-step-24">
            <div class="strat-step-num">Step 3: Broader Causal Context &amp; Synthesis</div>
            <div>• <strong>Wider Factors:</strong> Introduce decisive specification factors omitted by both interpretations (e.g. federal action, media scrutiny, economic boycotts).</div>
            <div>• <strong>Panoramic Scope:</strong> Demonstrate comprehensive specification knowledge beyond the two extracts.</div>
          </div>
          <div class="strat-essay-step-24">
            <div class="strat-step-num">Step 4: Criteria-Based Historical Verdict</div>
            <div>• <strong>Definitive Conclusion:</strong> Deliver a decisive judgement on "how far" you agree. Never sit on the fence!</div>
            <div>• <strong>Establish Criteria:</strong> Use historical benchmarks (short-term spark vs. long-term structure; rhetoric vs. reality).</div>
            <div>• <strong>Clinch Verdict:</strong> Justify why one interpretation ultimately offers superior explanatory power.</div>
          </div>
        </div>

        <!-- Grade 9 Evaluative Synthesis Model -->
        <div class="strat-model-para-24">
          <div class="strat-model-tag">Grade 9 Evaluative Synthesis Model (Sample Paragraph Excerpt):</div>
          <em>"Interpretation 2 offers substantial explanatory weight by arguing that northern urban unrest stemmed directly from deep-seated economic exclusion rather than civil rights agitation. Historian X correctly identifies that 'de facto housing segregation and discriminatory job markets left 80% of urban Black families below the poverty line.' This is powerfully corroborated by the 1968 Kerner Commission report, which warned of 'two societies, one black, one white, separate and unequal,' proving that federal legislative victories like the 1964 Civil Rights Act had failed to address structural economic disenfranchisement."</em>
        </div>

        <!-- Grade 9 Sentence Starters & Discourse Markers -->
        <div class="strat-essay-phrases">
          <div class="strat-phrase-col">
            <div class="strat-phrase-title">Evaluating Target (Interp 2)</div>
            • <em>"Interpretation 2 offers substantial explanatory weight regarding..."</em><br>
            • <em>"This argument is powerfully corroborated by..."</em>
          </div>
          <div class="strat-phrase-col">
            <div class="strat-phrase-title">Counter-Arguing (Interp 1)</div>
            • <em>"Conversely, Interpretation 1 prioritises the decisive role of..."</em><br>
            • <em>"A critical limitation of Interpretation 2 is that it overlooks..."</em>
          </div>
          <div class="strat-phrase-col">
            <div class="strat-phrase-title">Substantiating Verdict</div>
            • <em>"When evaluated against the benchmark of [criterion], the balance of evidence..."</em><br>
            • <em>"Ultimately, while Interp 1 accurately identifies X, Interp 2 is more persuasive because Y..."</em>
          </div>
        </div>

        <div class="strat-criteria-box">
          <strong>Level 4 (Grade 9) Examiner Mark Scheme Requirements:</strong>
          Thoroughly evaluates Interpretation 2 using both interpretations and rich contextual own knowledge • Deploys a balanced, analytical argument exploring strengths and limitations • Reaches a sustained, criteria-led judgement on "how far" the target interpretation is valid.
        </div>
      </div>

      <!-- EXAMINER PITFALLS RED STRIP -->
      <div class="strat-traps-bar-fixed">
        <span class="trap-tag" style="background: #b91c1c;">EXAMINER PITFALLS</span>
        <span class="strat-traps-list">
          <strong>5 Fatal Traps to Avoid:</strong> 1. Quoting without inferring on Q1 • 2. Omitting independent own knowledge on Q2 (capped at 7/12) • 3. Calling sources "useless" on Q3(a) • 4. Paraphrasing without contrasting on Q3(b) • 5. On Q3(d): Writing a one-sided essay without criteria, or forgetting to use and evaluate both interpretations (capped at Level 2).
        </span>
      </div>

      <!-- DIGITAL REVISION HUB 4-GATEWAY COMMAND DECK -->
      <div class="back-hub-grid-wrap">
        <div class="back-hub-banner">
          <span class="back-hub-banner-title">DIGITAL REVISION HUB • DIRECT TOPIC QR REVISION GATEWAYS</span>
          <span class="back-hub-banner-sub">the-history-revision-hub.netlify.app/?unit=usa • Scan with smartphone camera</span>
        </div>
        <div class="back-hub-gateways-grid">
          <div class="hub-gw-card">
            <div class="hub-gw-qr">${qrKt1}</div>
            <div class="hub-gw-body">
              <span class="hub-gw-badge">KEY TOPIC 1</span>
              <div class="hub-gw-title">Civil Rights (1954–60)</div>
              <div class="hub-gw-desc">Enquiries 1–4: Jim Crow, Brown v. Topeka, Montgomery &amp; Little Rock.</div>
            </div>
          </div>
          <div class="hub-gw-card">
            <div class="hub-gw-qr">${qrKt2}</div>
            <div class="hub-gw-body">
              <span class="hub-gw-badge">KEY TOPIC 2</span>
              <div class="hub-gw-title">Protest &amp; Radicalism (1960–75)</div>
              <div class="hub-gw-desc">Enquiries 5–8: Sit-Ins, Birmingham, Malcolm X, Black Power &amp; 1964/65 Acts.</div>
            </div>
          </div>
          <div class="hub-gw-card">
            <div class="hub-gw-qr">${qrKt3}</div>
            <div class="hub-gw-body">
              <span class="hub-gw-badge">KEY TOPIC 3</span>
              <div class="hub-gw-title">Vietnam Involvement (1954–75)</div>
              <div class="hub-gw-desc">Enquiries 9–12: Geneva, Diem, Tonkin, Rolling Thunder &amp; Guerrilla Warfare.</div>
            </div>
          </div>
          <div class="hub-gw-card">
            <div class="hub-gw-qr">${qrHub}</div>
            <div class="hub-gw-body">
              <span class="hub-gw-badge" style="background: #0284c7;">KT4 &amp; MASTER PORTAL</span>
              <div class="hub-gw-title">End of War &amp; All 16 Quizzes</div>
              <div class="hub-gw-desc">Enquiries 13–16: Tet, My Lai, Kent State, Paris Accords &amp; Flashcard Vault.</div>
            </div>
          </div>
        </div>
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

  // Take visual screenshots for all 24 pages
  const debugDir = path.join(ROOT_DIR, 'public', 'images', 'usa_pages');
  if (!fs.existsSync(debugDir)) {
    fs.mkdirSync(debugDir, { recursive: true });
  }

  for (let pNum = 1; pNum <= 24; pNum++) {
    const el = await page.$(`#page-${pNum}`);
    if (el) {
      await el.screenshot({ path: path.join(debugDir, `page_${pNum}.png`) });
    }
  }
  console.log(`📸 Rendered high-resolution screenshots for all 24 pages in: ${debugDir}`);

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
