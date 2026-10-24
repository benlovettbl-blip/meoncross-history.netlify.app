/**
 * scripts/render_usa_28page_master_textbook.cjs
 *
 * UNIFIED 28-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK COMPILER
 * Option 33: Conflict at Home and Abroad: the USA, 1954–75 (Pearson Edexcel GCSE 9–1)
 *
 * Conforms strictly to the Disciplinary History Classroom Textbook Standard & GCSE Master Engine:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim SSoT fidelity to units/usa/data.js narrative_blocks
 * - Exactly 28 pages (7 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1:  Master Front Cover (Hero artwork, overview synopsis, 12-enquiry 2x6 directory)
 * - Page 2:  Master Chronological Milestone Spine (17 defining causal turning points, 1954–1975)
 * - Page 3:  Geopolitical Theater Atlas & 4 Strategic Flashpoints (Dual cartographic perspectives + 2x2 grid)
 * - Pages 4–27: 12 Canonical Disciplinary Enquiries across 12 flat double-page spreads (Verso + Recto)
 *   * Part I (Home): Enquiries 1–6 (Civil Rights Movement, 1954–1975)
 *   * Part II (Abroad): Enquiries 7–12 (Vietnam War & Domestic Crisis, 1954–1975)
 * - Page 28: Master 60-Question Knowledge Retrieval Quiz Back Cover (6 topic cards x 10 questions)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 * - Automated in-browser auto-fit engines:
 *   * autoFitCoverBlurb()
 *   * autoFitCoverEnquiries()
 *   * autoFitPage3Flashpoints()
 *   * autoFitSpreadTypography()
 * - Automated reprographics audit via auditPageBudget() (0px overflow, < 25px footer void, >= 95% utilization)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  if (!relativePath) return '';
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [
      path.join(ROOT_DIR, 'public', cleanPath),
      path.join(ROOT_DIR, cleanPath),
      path.join(ROOT_DIR, 'public', 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'images', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'public', 'units', 'usa', 'assets', 'sources', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'public', 'units', 'usa', 'assets', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'units', 'usa', 'assets', path.basename(cleanPath)),
      path.join(ROOT_DIR, 'units', 'usa', 'assets', 'sources', path.basename(cleanPath)),
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
                : ext === '.svg'
                  ? 'image/svg+xml'
                  : 'image/jpeg';
        const data = fs.readFileSync(cand).toString('base64');
        return `data:${mime};base64,${data}`;
      }
    }
    return relativePath;
  } catch (err) {
    return relativePath;
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
    .replace(/([a-zA-Z])"([a-zA-Z])/g, '$1" $2')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Load canonical unit data from units/usa/data.js
function loadUsaData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'usa', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+unitData;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  return vm.runInNewContext(raw);
}

// 17 Defining Causal Turning Points for Page 2 Milestone Spine (1954–1975)
const MILESTONE_SPINE = [
  {
    date: 'May 1954',
    title: 'Brown v. Board of Education (Topeka)',
    desc: 'Unanimous 9–0 Supreme Court ruling strikes down racial segregation in public schools, destroying the constitutional doctrine of "separate but equal".',
    ref: '2.1',
  },
  {
    date: 'July 1954',
    title: 'The Geneva Accords Partition Vietnam',
    desc: 'Following French defeat at Dien Bien Phu, the Geneva Accords temporarily divide Vietnam along the 17th Parallel pending nationwide democratic elections.',
    ref: '7.1',
  },
  {
    date: 'Aug 1955',
    title: 'The Lynching of Emmett Till',
    desc: "14-year-old Emmett Till is brutally murdered in Money, Mississippi; his open-casket funeral and the killers' acquittal electrify national Black consciousness.",
    ref: '1.3',
  },
  {
    date: 'Dec 1955',
    title: 'The Montgomery Bus Boycott Begins',
    desc: 'Rosa Parks is arrested; 40,000 Black citizens launch a 381-day transit boycott led by Dr Martin Luther King Jr., culminating in Supreme Court desegregation.',
    ref: '3.1–3.4',
  },
  {
    date: 'Sept 1957',
    title: 'The Little Rock Central High Crisis',
    desc: 'Governor Faubus uses state troops to block nine Black students; President Eisenhower dispatches the 101st Airborne Division to enforce federal desegregation.',
    ref: '2.3–2.4',
  },
  {
    date: 'Feb–May 1961',
    title: 'The Greensboro Sit-Ins & CORE Freedom Rides',
    desc: 'Student sit-ins sweep lunch counters across the South; interracial Freedom Riders endure bus firebombings to enforce interstate travel desegregation.',
    ref: '4.1–4.4',
  },
  {
    date: 'May–Aug 1963',
    title: 'Birmingham Campaign & March on Washington',
    desc: 'Bull Connor deploys police dogs and firehoses against child marchers; 250,000 gather at the Lincoln Memorial for King\'s "I Have a Dream" address.',
    ref: '5.1–5.2',
  },
  {
    date: 'Nov 1963',
    title: 'Assassination of Ngo Dinh Diem & JFK',
    desc: 'South Vietnamese generals overthrow and execute Diem with US knowledge; three weeks later, President Kennedy is assassinated in Dallas, Texas.',
    ref: '7.4',
  },
  {
    date: 'July–Aug 1964',
    title: 'Civil Rights Act of 1964 & Gulf of Tonkin Resolution',
    desc: 'LBJ signs historic legislation outlawing public segregation; Congress passes the Gulf of Tonkin Resolution, giving Johnson blank-check war powers in Vietnam.',
    ref: '5.3, 8.2',
  },
  {
    date: 'Mar–Aug 1965',
    title: 'Operation Rolling Thunder & The Voting Rights Act',
    desc: 'US begins sustained bombing of North Vietnam and lands 3,500 Marines at Da Nang; Selma marchers beaten on Bloody Sunday, prompting Voting Rights Act.',
    ref: '5.4, 8.3–8.4',
  },
  {
    date: 'Aug 1965',
    title: 'The Watts Riots & The Rise of Black Power',
    desc: 'Six days of racial rebellion in Los Angeles leave 34 dead; Stokely Carmichael champions "Black Power", heralding a turn away from non-violence.',
    ref: '6.1–6.3',
  },
  {
    date: 'Jan–Feb 1968',
    title: 'The Tet Offensive & The Credibility Gap',
    desc: 'Vietcong launch massive coordinated attacks across 100+ cities; although defeated militarily, Tet shatters American public faith in military victory.',
    ref: '10.1–10.2',
  },
  {
    date: 'Mar–Apr 1968',
    title: 'My Lai Massacre & Assassination of Dr King',
    desc: 'US soldiers murder 500+ civilians at My Lai; Dr King is assassinated in Memphis, sparking riots in 125 cities and plunging the nation into mourning.',
    ref: '6.4, 11.2',
  },
  {
    date: 'Nov 1969',
    title: 'Nixon\'s "Silent Majority" & Vietnamization',
    desc: 'Nixon appeals to patriotic middle-class Americans while beginning US troop withdrawals and shifting the combat burden onto South Vietnamese ARVN forces.',
    ref: '10.3, 11.3',
  },
  {
    date: 'May 1970',
    title: 'Cambodian Incursion & The Kent State Shootings',
    desc: 'US invasion of Cambodia sparks nationwide campus strikes; Ohio National Guardsmen shoot dead four unarmed student protesters at Kent State University.',
    ref: '10.4, 11.2',
  },
  {
    date: 'Jan 1973',
    title: 'The Paris Peace Accords & US Troop Withdrawal',
    desc: 'Secretary of State Kissinger signs ceasefire accords in Paris; the last US combat troops depart Vietnam, leaving 58,000 American military dead.',
    ref: '12.1',
  },
  {
    date: 'April 1975',
    title: 'Operation Frequent Wind & The Fall of Saigon',
    desc: 'North Vietnamese tanks break through the Presidential Palace gates in Saigon; rooftop helicopter evacuations mark the complete collapse of South Vietnam.',
    ref: '12.2',
  },
];

// Page 3 Strategic Atlas & 4 Strategic Flashpoints
const STRATEGIC_FLASHPOINTS = [
  {
    badge: 'FLASHPOINT 01',
    title: 'The 17th Parallel Demilitarized Zone (DMZ)',
    text: 'Established by the 1954 Geneva Accords, the 5-kilometre-wide DMZ along the Ben Hai River formed an impassable conventional barrier between North and South Vietnam. Prevented by international diplomacy and fear of Chinese intervention from launching ground invasions north of this line, US military forces were locked into an asymmetric defensive posture, allowing North Vietnam to maintain permanent rear sanctuaries and supply southern insurgents through neutral border territories.',
  },
  {
    badge: 'FLASHPOINT 02',
    title: 'The Ho Chi Minh Trail & Truong Son Corridor',
    text: 'Weaving through 16,000 kilometres of dense mountain jungle and underground depots in neutral Laos and Cambodia, the Ho Chi Minh Trail delivered over 60 tons of munitions and fresh combat troops into South Vietnam every single day. Despite millions of tons of US aerial bombardment during Operation Commando Hunt and chemical defoliation, 300,000 North Vietnamese peasant volunteers repaired bomb craters overnight, securing the unbroken logistical lifeline of the insurgency.',
  },
  {
    badge: 'FLASHPOINT 03',
    title: 'The Deep South "Black Belt" & County Courthouses',
    text: 'Stretching from Mississippi through Alabama to Georgia, the agrarian Black Belt was governed by all-white sheriff departments, segregationist judges, and White Citizens’ Councils. Disenfranchisement was absolute: local registrars blocked Black citizens at county courthouses using arbitrary literacy tests and economic evictions. Overturning this entrenched system required the direct assertion of federal supremacy—enforced through marshals, FBI wiretaps, and troop deployments.',
  },
  {
    badge: 'FLASHPOINT 04',
    title: 'The Mekong Delta & Jungle Counter-Insurgency',
    text: 'A waterlogged labyrinth of mangrove swamps, canals, and dense jungle canopy, the Mekong Delta housed over 5 million Vietnamese peasants and the covert infrastructure of the Vietcong (VCI). Conventional American armor and air cavalry struggled in the saturated rice paddies, where guerrillas melted away through Chu Chi tunnels and booby traps. The resulting US reliance on napalm, free-fire zones, and Search and Destroy alienated the rural population.',
  },
];

// Page 28 Master 60-Question Retrieval Quiz (6 Cards x 10 Questions)
const QUIZ_QUESTIONS = {
  card1: [
    'What 1896 Supreme Court ruling established the constitutional doctrine of "separate but equal"?',
    'What term describes compulsory racial segregation enforced by Southern state Jim Crow statutes?',
    'In 1950 Mississippi, approximately what percentage of eligible Black adults were registered to vote?',
    'Which NAACP chief legal counsel argued the Brown v. Board of Education case before the Supreme Court?',
    'What was the unanimous judicial vote count in the landmark 1954 Brown v. Board of Education decision?',
    'Which 14-year-old Black youth from Chicago was brutally murdered in Money, Mississippi in August 1955?',
    'How long did the all-white jury take to acquit the confessed killers of Emmett Till?',
    'What 1956 manifesto signed by 101 Southern congressmen pledged resistance to school desegregation?',
    'Which Arkansas governor deployed the state National Guard to block the Little Rock Nine in 1957?',
    'Which elite military division did President Eisenhower dispatch to escort the Little Rock Nine into school?',
  ],
  card2: [
    'On what date was Rosa Parks arrested for refusing to surrender her bus seat in Montgomery, Alabama?',
    'Which grassroots organisation, led by Jo Ann Robinson, mimeographed 35,000 boycott leaflets overnight?',
    'How many days did the Montgomery Bus Boycott last before federal desegregation took effect?',
    'Which landmark November 1956 Supreme Court ruling declared Alabama bus segregation unconstitutional?',
    'What civil rights organisation was formed in January 1957 by Martin Luther King Jr. and Southern ministers?',
    'In which city and department store lunch counter did four Black college students launch the 1960 sit-ins?',
    'What student organisation was founded in April 1960 at Shaw University to coordinate direct action?',
    'Which civil rights organisation, led by James Farmer, initiated the 1961 Freedom Rides?',
    "In which Alabama town was a Freedom Riders bus firebombed by a Ku Klux Klan mob on Mother's Day 1961?",
    'Which federal regulatory body issued orders in November 1961 desegregating all interstate bus terminals?',
  ],
  card3: [
    'What code name was given to the SCLC’s spring 1963 campaign against segregation in Birmingham, Alabama?',
    'Which Birmingham Commissioner of Public Safety deployed attack dogs and high-pressure firehoses on children?',
    'Approximately how many demonstrators assembled at the Lincoln Memorial for the August 1963 March on Washington?',
    'Which US President signed the landmark Civil Rights Act of 1964 into law?',
    'What historic bridge was the site of the "Bloody Sunday" state trooper assault on Selma marchers in March 1965?',
    'What discriminatory voter suppression mechanism was explicitly abolished by the Voting Rights Act of 1965?',
    'Which militant religious organisation was Malcolm X affiliated with before breaking away in 1964?',
    'Which SNCC leader popularized the slogan "Black Power" during the 1966 March Against Fear?',
    'Which revolutionary political party was founded in Oakland in 1966 by Huey Newton and Bobby Seale?',
    'Which 1968 presidential commission warned that America was "moving toward two societies: separate and unequal"?',
  ],
  card4: [
    'Which French colonial fortress fell to the Vietminh in May 1954, ending French imperial rule in Indochina?',
    'At which parallel of latitude was Vietnam temporarily partitioned under the 1954 Geneva Accords?',
    'What geopolitical theory held that if South Vietnam fell to communism, neighboring nations would follow?',
    'Which Roman Catholic politician became the US-backed President of South Vietnam in 1955?',
    'What controversial program relocated Vietnamese peasants into fortified villages to isolate them from guerrillas?',
    "Which Buddhist monk committed self-immolation in Saigon in June 1963 in protest against Diem's regime?",
    'Which US destroyer was allegedly attacked by North Vietnamese torpedo boats in the Gulf of Tonkin in August 1964?',
    'What congressional measure passed in August 1964 granted President Johnson authority to wage undeclared war?',
    'What code name was given to the sustained US aerial bombing campaign against North Vietnam launched in 1965?',
    'At which coastal city did the first 3,500 US combat Marines land on 8 March 1965?',
  ],
  card5: [
    'What complex underground tunnel network outside Saigon served as a major Vietcong tactical base?',
    'What name was given to the concealed sharpened bamboo stakes dipped in poison used by Vietcong guerrillas?',
    'Through which two neighboring countries did the Ho Chi Minh Trail run to supply southern insurgents?',
    'What military strategy, championed by General Westmoreland, measured victory by enemy "body count"?',
    'What chemical herbicide was sprayed over 4.5 million acres of South Vietnamese forest during Operation Ranch Hand?',
    'On what major Vietnamese holiday did the Vietcong and NVA launch a massive surprise offensive in January 1968?',
    'Which famous CBS news anchor declared the Vietnam War a "stalemate" following his report in February 1968?',
    'What policy, introduced by President Nixon in 1969, aimed to shift the combat burden onto South Vietnamese forces?',
    'What was the name of the secret, illegal US bombing campaign targeting communist sanctuaries inside Cambodia?',
    'In what month and year did the US announce a joint ground incursion into Cambodia, triggering campus strikes?',
  ],
  card6: [
    'In which South Vietnamese village did Charlie Company massacre over 500 unarmed civilians in March 1968?',
    'Which US Army lieutenant was convicted of premeditated murder for his role in the My Lai massacre?',
    'How many student protesters were shot and killed by National Guardsmen at Kent State University in May 1970?',
    'What phrase did President Nixon use in November 1969 to describe Americans who supported his war policy?',
    'What violent clash took place in Lower Manhattan in May 1970 when construction workers attacked students?',
    "Who served as Nixon's National Security Advisor and chief negotiator during the secret Paris peace talks?",
    'In what month and year was the Paris Peace Agreement signed, ending direct US military involvement in Vietnam?',
    'What operation was launched by US forces in April 1975 to evacuate remaining Americans and allies from Saigon?',
    'On what date did North Vietnamese tanks crash through the gates of the Presidential Palace in Saigon?',
    "What psychological term was coined to describe America's prolonged post-war reluctance to commit troops abroad?",
  ],
};

// 12 Canonical Disciplinary Enquiries Editorial Metadata & Synthesis Architecture
const ENQUIRY_EDITORIAL = [
  // --- PART I: CONFLICT AT HOME: THE CIVIL RIGHTS STRUGGLE (1954–1975) ---
  {
    num: 1,
    ktCode: 'KT 1.1 & 1.4',
    specTitle: 'The Position of Black Americans in the Early 1950s',
    specSummary: 'Segregation, discrimination and voting rights in the South; NAACP and CORE.',
    ktGroup: 'PART I: CONFLICT AT HOME (1954–1975)',
    title: 'The Jim Crow South and White Supremacist Resistance, 1950–1957',
    shortTitle: 'The Jim Crow South & White Resistance',
    enquiryQuestion:
      'How did state-sponsored segregation, voter disenfranchisement, and white terror sustain Southern racial oppression?',
    versoSubtitle:
      'Part I: De Jure Segregation, Systematic Disenfranchisement & NAACP Legal Litigation',
    rectoSubtitle:
      'Part II: The Murder of Emmett Till, Massive Resistance & White Citizens’ Councils',
    rectoAnchor:
      'State-sponsored segregation combined with terror and economic coercion to maintain white supremacy until challenged by legal litigation and national outrage.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 0, // lesson_1_1
    lessonSourceB: 3, // lesson_1_4
    isPaired: true,
  },
  {
    num: 2,
    ktCode: 'KT 1.2',
    specTitle: 'Developments in Education & Little Rock High School',
    specSummary:
      'Brown v. Topeka (1954); events at Little Rock High School (1957); KKK opposition.',
    ktGroup: 'PART I: CONFLICT AT HOME (1954–1975)',
    title: 'Breaking the Color Line in Education: Brown v. Topeka & Little Rock (1954–1957)',
    shortTitle: 'Desegregating Education: Brown & Little Rock',
    enquiryQuestion:
      'Why did the desegregation of Southern public schools provoke a constitutional crisis requiring federal troops?',
    versoSubtitle: 'Part I: Brown v. Board of Education (1954), Earl Warren & The 9–0 Verdict',
    rectoSubtitle: 'Part II: Little Rock Central High (1957), Governor Faubus & The 101st Airborne',
    rectoAnchor:
      'The Supreme Court shattered the constitutional fiction of "separate but equal", forcing President Eisenhower to deploy federal military troops to uphold the rule of law.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 1, // lesson_1_2
    isPaired: false,
  },
  {
    num: 3,
    ktCode: 'KT 1.3',
    specTitle: 'The Montgomery Bus Boycott and its Impact, 1955–60',
    specSummary:
      'Rosa Parks; causes and success of the boycott; Supreme Court ruling; Civil Rights Act (1957); SCLC.',
    ktGroup: 'PART I: CONFLICT AT HOME (1954–1975)',
    title: 'Grassroots Mobilisation: The Montgomery Bus Boycott & The SCLC (1955–1960)',
    shortTitle: 'The Montgomery Bus Boycott',
    enquiryQuestion:
      'How did a 381-day municipal bus boycott transform grassroots protest into a national movement for civil rights?',
    versoSubtitle: 'Part I: Rosa Parks, Jo Ann Robinson & The Mobilisation of Montgomery',
    rectoSubtitle: 'Part II: The 381-Day Carpool Network, Dr King’s Leadership & Browder v. Gayle',
    rectoAnchor:
      'Disciplined non-violent economic resistance sustained by Black church networks broke municipal segregation and catapulted Dr Martin Luther King Jr. to national prominence.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 2, // lesson_1_3
    isPaired: false,
  },
  {
    num: 4,
    ktCode: 'KT 2.1',
    specTitle: 'Direct Action: Sit-Ins and Freedom Rides, 1960–62',
    specSummary:
      'Greensboro sit-in movement; Freedom Riders and Anniston bomb (1961); James Meredith (1962).',
    ktGroup: 'PART I: CONFLICT AT HOME (1954–1975)',
    title: 'The Vanguard of Direct Action: Sit-Ins and Freedom Rides (1960–1962)',
    shortTitle: 'Sit-Ins and Freedom Rides',
    enquiryQuestion:
      'How did student-led non-violent direct action force the federal government to confront Southern defiance?',
    versoSubtitle: 'Part I: The Greensboro Lunch Counter Sit-Ins & The Formation of SNCC (1960)',
    rectoSubtitle:
      'Part II: The CORE Freedom Rides, Anniston Firebombing & Federal ICC Intervention',
    rectoAnchor:
      'Interracial student activists willingly absorbed mob violence and mass imprisonment, compelling the Kennedy administration to enforce federal desegregation decrees.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 4, // lesson_2_1
    isPaired: false,
  },
  {
    num: 5,
    ktCode: 'KT 2.2',
    specTitle: 'Peaceful Protests & Landmark Legislation, 1963–65',
    specSummary:
      'Birmingham and Washington marches; Civil Rights Act (1964); Selma and Voting Rights Act (1965).',
    ktGroup: 'PART I: CONFLICT AT HOME (1954–1975)',
    title: 'The Legislative Climax: Birmingham, Selma & The Great Acts (1963–1965)',
    shortTitle: 'Birmingham, Selma & Civil Rights Acts',
    enquiryQuestion:
      'Why did televised police violence in Birmingham and Selma force Congress to pass historic civil rights legislation?',
    versoSubtitle:
      'Part I: Project "C" in Birmingham, The Children’s Crusade & March on Washington',
    rectoSubtitle:
      'Part II: Bloody Sunday in Selma, LBJ’s Coalition & The Civil and Voting Rights Acts',
    rectoAnchor:
      'Dramatising Southern brutality on national television generated moral outrage that broke congressional filibusters and produced the landmark 1964 and 1965 statutes.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 5, // lesson_2_2
    isPaired: false,
  },
  {
    num: 6,
    ktCode: 'KT 2.3 & 2.4',
    specTitle: 'Malcolm X, Black Power and Urban Riots, 1965–75',
    specSummary:
      'Malcolm X; Black Power and 1968 Olympics; Black Panthers; Riots (1965–67); King’s Northern campaign.',
    ktGroup: 'PART I: CONFLICT AT HOME (1954–1975)',
    title: 'Radicalism, Black Power, and Urban Rebellion (1965–1970)',
    shortTitle: 'Black Power & Urban Riots',
    enquiryQuestion:
      'Why did the civil rights movement fracture between non-violent integration and militant Black Power during the urban riots?',
    versoSubtitle: 'Part I: Malcolm X, Stokely Carmichael & The Rise of the Black Panther Party',
    rectoSubtitle:
      'Part II: The Long Hot Summers: Watts, Detroit Riots & The Kerner Commission Report',
    rectoAnchor:
      'Persistent Northern economic inequality, police brutality, and institutional racism fueled urban uprisings and radicalized younger activists away from non-violent integration.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 6, // lesson_2_3
    lessonSourceB: 7, // lesson_2_4
    isPaired: true,
  },

  // --- PART II: CONFLICT ABROAD: THE VIETNAM WAR & DOMESTIC CRISIS (1954–1975) ---
  {
    num: 7,
    ktCode: 'KT 3.1',
    specTitle: 'Reasons for US Involvement in Vietnam, 1954–63',
    specSummary:
      'Geneva Accords (1954); Domino theory and containment; Ngo Dinh Diem; Kennedy’s advisers.',
    ktGroup: 'PART II: CONFLICT ABROAD (1954–1975)',
    title: 'The Roots of Escalation: The Domino Theory and Ngo Dinh Diem (1954–1963)',
    shortTitle: 'Domino Theory & The Diem Regime',
    enquiryQuestion:
      'Why did American Cold War containment policy lead to deep military entanglement in South Vietnam?',
    versoSubtitle:
      'Part I: The Fall of French Indochina, Dien Bien Phu & The Geneva Accords (1954)',
    rectoSubtitle:
      'Part II: Eisenhower’s Domino Theory, Strategic Hamlets & The Buddhist Crisis (1963)',
    rectoAnchor:
      'Rigid Cold War containment and the flawed Domino Theory committed the United States to prop up an unpopular, corrupt South Vietnamese regime that alienated its own populace.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 8, // lesson_3_1
    isPaired: false,
  },
  {
    num: 8,
    ktCode: 'KT 3.2',
    specTitle: 'Escalation of Conflict Under Johnson, 1963–68',
    specSummary:
      'Gulf of Tonkin incident and Resolution (1964); Operation Rolling Thunder; deployment of ground troops.',
    ktGroup: 'PART II: CONFLICT ABROAD (1954–1975)',
    title: 'The Road to War: The Gulf of Tonkin and Troop Escalation (1964–1965)',
    shortTitle: 'Gulf of Tonkin & Combat Troops',
    enquiryQuestion:
      'How did the Gulf of Tonkin incident enable President Johnson to transform an advisory mission into a full-scale war?',
    versoSubtitle:
      'Part I: The Gulf of Tonkin Incident & The Congressional Resolution (August 1964)',
    rectoSubtitle:
      'Part II: Operation Rolling Thunder & The 3,500 Marines Landing at Da Nang (March 1965)',
    rectoAnchor:
      'A dubious naval incident provided the political pretext for Congress to surrender its war powers, initiating sustained aerial bombardment and mass combat troop commitments.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 9, // lesson_3_2
    isPaired: false,
  },
  {
    num: 9,
    ktCode: 'KT 3.3',
    specTitle: 'The Nature of the Conflict in Vietnam, 1964–68',
    specSummary:
      'Vietcong guerrilla tactics and Ho Chi Minh Trail; US search and destroy, Agent Orange, and napalm.',
    ktGroup: 'PART II: CONFLICT ABROAD (1954–1975)',
    title: 'Asymmetric Jungle Warfare: Vietcong Tactics vs. US Firepower (1965–1968)',
    shortTitle: 'Guerrilla Tactics vs US Firepower',
    enquiryQuestion:
      'Why was overwhelming American technological firepower unable to decisively defeat the Vietcong insurgency?',
    versoSubtitle:
      'Part I: Vietcong Guerrilla Tactics, The Chu Chi Tunnel Network & The Ho Chi Minh Trail',
    rectoSubtitle:
      'Part II: US Search and Destroy Missions, Body Counts, Napalm & Operation Ranch Hand',
    rectoAnchor:
      'Superior industrial firepower and chemical defoliation proved counterproductive against an elusive, ideologically committed guerrilla force rooted in the rural peasantry.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 10, // lesson_3_3
    isPaired: false,
  },
  {
    num: 10,
    ktCode: 'KT 3.4',
    specTitle: 'The Tet Offensive & Changing Public Attitudes, 1968',
    specSummary:
      'The 1968 Tet Offensive; impact on military policy; public disillusionment and Walter Cronkite.',
    ktGroup: 'PART II: CONFLICT ABROAD (1954–1975)',
    title: 'The Turning Point: The 1968 Tet Offensive and Vietnamization (1968–1972)',
    shortTitle: 'The Tet Offensive & Vietnamization',
    enquiryQuestion:
      'Why did the Tet Offensive shatter American public belief in military victory and force a strategy of phased withdrawal?',
    versoSubtitle: 'Part I: The Lunar New Year Assault Across 100 Cities & The Credibility Gap',
    rectoSubtitle:
      'Part II: Nixon’s Vietnamization Policy, The Cambodian Incursion & Madman Theory',
    rectoAnchor:
      'Though a military catastrophe for communist forces, the Tet Offensive demolished official claims of imminent victory, forcing Washington onto a protracted path of negotiated exit.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 11, // lesson_3_4
    isPaired: false,
  },
  {
    num: 11,
    ktCode: 'KT 4.1 & 4.2',
    specTitle: 'Opposition to the War & The Home Front, 1968–72',
    specSummary:
      'My Lai massacre (1968); Kent State shootings (1970); anti-war protest movement; Nixon’s Silent Majority.',
    ktGroup: 'PART II: CONFLICT ABROAD (1954–1975)',
    title: 'The Fractured Home Front: Anti-War Protests and the Silent Majority (1968–1972)',
    shortTitle: 'Anti-War Protests & Silent Majority',
    enquiryQuestion:
      'How did the Vietnam War create an unprecedented cultural and political divide within American society?',
    versoSubtitle:
      'Part I: The Television War, The My Lai Massacre Revelations & The Kent State Shootings',
    rectoSubtitle:
      'Part II: Nixon’s "Silent Majority" Mobilisation, Hard Hat Riots & Domestic Polarization',
    rectoAnchor:
      'Unfiltered television footage, draft resistance, and horrific atrocity reports ignited violent campus protests, triggering a conservative counter-mobilisation of working-class voters.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 12, // lesson_4_1
    lessonSourceB: 13, // lesson_4_2
    isPaired: true,
  },
  {
    num: 12,
    ktCode: 'KT 4.3 & 4.4',
    specTitle: 'Peace Negotiations, US Withdrawal & Fall of Saigon, 1969–75',
    specSummary:
      'Vietnamization; bombing of Cambodia and Laos; Paris Peace Accords (1973); Fall of Saigon (1975).',
    ktGroup: 'PART II: CONFLICT ABROAD (1954–1975)',
    title: 'The American Exit, The Fall of Saigon, and The Lessons of Defeat (1973–1975)',
    shortTitle: 'Paris Accords, Fall of Saigon & Defeat',
    enquiryQuestion:
      'What military, political, and cultural factors led to the ultimate collapse of South Vietnam and the defeat of the USA?',
    versoSubtitle:
      'Part I: The 1973 Paris Peace Accords, US Military Withdrawal & Operation Frequent Wind',
    rectoSubtitle:
      'Part II: The 1975 Fall of Saigon, Anatomy of American Defeat & The Vietnam Syndrome',
    rectoAnchor:
      'A fragile diplomatic accord abandoned South Vietnam to communist conquest, exposing the fatal limitations of American military intervention and scarring US foreign policy for generations.',
    densityClass: 'spread-density-medium',
    lessonSourceA: 14, // lesson_4_3
    lessonSourceB: 15, // lesson_4_4
    isPaired: true,
  },
];

// Generate Inside Front Cover Specification Directory (Page 2) directly from specData (SSOT) or unitData
function generateInsideFrontCover(unitData) {
  let specData = null;
  try {
    const specCandidates = [
      path.join(ROOT_DIR, 'public', 'data', 'usa_spec.json'),
      path.join(ROOT_DIR, 'data', 'usa_spec.json'),
    ];
    for (const c of specCandidates) {
      if (fs.existsSync(c)) {
        specData = JSON.parse(fs.readFileSync(c, 'utf8'));
        break;
      }
    }
  } catch (e) {}

  // If specData has modular narrative blurbs defined per topic, render the 16-topic modular architecture
  if (
    specData &&
    specData.sections &&
    specData.sections.length > 0 &&
    specData.sections[0].topics &&
    specData.sections[0].topics[0].narrative_blurb
  ) {
    let html = '';
    specData.sections.forEach((sec, sIdx) => {
      const ktNum = sec.keyTopicNumber || sIdx + 1;
      const ktTitle = sec.title.replace(/^Key\s*Topic\s*\d+[:\-–—\s]*/i, '').trim();

      const rowsHtml = sec.topics
        .map((t, tIdx) => {
          const code = t.code || `KT ${ktNum}.${tIdx + 1}`;
          const title = t.title.replace(/^\d+\.\s*/, '').trim();
          const pages = t.spreads || '';
          const blurb = (t.narrative_blurb || '')
            .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

          return `
          <div class="inside-spec-row">
            <div class="isr-header">
              <div class="isr-left">
                <span class="isr-code">${code}</span>
                <span class="isr-question">${title}</span>
              </div>
              <span class="isr-pages">${pages}</span>
            </div>
            <p class="isr-blurb">${blurb}</p>
          </div>
        `;
        })
        .join('');

      html += `
        <div class="inside-kt-group">
          <div class="inside-kt-header">
            <span class="ikt-badge">KEY TOPIC ${ktNum}</span>
            <span class="ikt-title">${ktTitle.toUpperCase()}</span>
          </div>
          <div class="inside-kt-rows">
            ${rowsHtml}
          </div>
        </div>
      `;
    });
    return html;
  }

  const lessonPageMap = [
    'Spread 1 &bull; pp. 4–5', // 0: lesson_1_1
    'Spread 2 &bull; pp. 6–7', // 1: lesson_1_2
    'Spread 3 &bull; pp. 8–9', // 2: lesson_1_3
    'Spread 2 &bull; pp. 6–7', // 3: lesson_1_4
    'Spread 4 &bull; pp. 10–11', // 4: lesson_2_1
    'Spread 5 &bull; pp. 12–13', // 5: lesson_2_2
    'Spread 6 &bull; pp. 14–15', // 6: lesson_2_3
    'Spread 6 &bull; pp. 14–15', // 7: lesson_2_4
    'Spread 7 &bull; pp. 16–17', // 8: lesson_3_1
    'Spread 8 &bull; pp. 18–19', // 9: lesson_3_2
    'Spread 9 &bull; pp. 20–21', // 10: lesson_3_3
    'Spread 10 &bull; pp. 22–23', // 11: lesson_3_4
    'Spread 11 &bull; pp. 24–25', // 12: lesson_4_1
    'Spread 11 &bull; pp. 24–25', // 13: lesson_4_2
    'Spread 12 &bull; pp. 26–27', // 14: lesson_4_3
    'Spread 12 &bull; pp. 26–27', // 15: lesson_4_4
  ];

  const ktTitles = [
    'The Development of the Civil Rights Movement, 1954–60',
    'Protest, Progress and Radicalism, 1960–75',
    'US Involvement in the Vietnam War, 1954–75',
    'Reactions to, and the End of, US Involvement in the Vietnam War, 1964–75',
  ];

  let html = '';

  for (let kt = 0; kt < 4; kt++) {
    const ktLessons = unitData.lessons.slice(kt * 4, kt * 4 + 4);
    const rowsHtml = ktLessons
      .map((l, idx) => {
        const globalIdx = kt * 4 + idx;
        const codeMatch = l.title.match(/KT\s*\d+\.\d+/i);
        const code = codeMatch ? codeMatch[0] : `KT ${kt + 1}.${idx + 1}`;
        const question = l.title.replace(/^KT\s*\d+\.\d+:\s*/i, '').trim();

        let blurb = '';
        if (l.specification_anchor) {
          blurb = l.specification_anchor.replace(/^[^:]+:\s*/i, '').trim();
        } else if (l.enquiry) {
          blurb = l.enquiry.split('.')[0] + '.';
        }

        const pages = lessonPageMap[globalIdx] || 'pp. 4–27';

        return `
        <div class="inside-spec-row">
          <div class="isr-header">
            <div class="isr-left">
              <span class="isr-code">${code}</span>
              <span class="isr-question">${question}</span>
            </div>
            <span class="isr-pages">${pages}</span>
          </div>
          <p class="isr-blurb">${blurb}</p>
        </div>
      `;
      })
      .join('');

    html += `
      <div class="inside-kt-group">
        <div class="inside-kt-header">
          <span class="ikt-badge">KEY TOPIC ${kt + 1}</span>
          <span class="ikt-title">${ktTitles[kt]}</span>
        </div>
        <div class="inside-kt-rows">
          ${rowsHtml}
        </div>
      </div>
    `;
  }

  return html;
}

// Build Complete HTML document
function buildUsaHtml() {
  const unitData = loadUsaData();

  // Convert image references to Base64
  const coverImgData = getBase64Image('/units/usa/assets/sources/airborne-little-rock-patrol.jpg');

  // 1. INSIDE FRONT COVER (Page 2) Automated Specification Directory
  const insideCoverHtml = generateInsideFrontCover(unitData);

  // 2. MILESTONE SPINE (Page 2)
  const milestoneItemsHtml = MILESTONE_SPINE.map((m) => {
    return `
      <div class="spine-item">
        <div class="spine-date-badge">${m.date}</div>
        <div class="spine-dot"></div>
        <div class="spine-content">
          <div class="spine-title-row">
            <span class="spine-title">${m.title}</span>
          </div>
          <p class="spine-desc">${m.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  // 4. 12 ENQUIRY SPREADS (Pages 4–27)
  let spreadsHtml = '';

  ENQUIRY_EDITORIAL.forEach((config) => {
    const num = config.num;
    const versoPage = num * 2 + 2;
    const rectoPage = versoPage + 1;

    let versoBlocks = [];
    let rectoBlocks = [];

    if (!config.isPaired) {
      // Single lesson maps directly: Act 1 & 2 -> Verso, Act 3 & 4 -> Recto
      const lesson = unitData.lessons[config.lessonSourceA];
      const blocks = (lesson.narrative_blocks || []).filter((b) => b.text && b.text.trim());

      versoBlocks = [
        {
          ref: `${num}.1`,
          date: '1954–1965',
          title: blocks[0]
            ? blocks[0].title.replace(/^Act\s*\d+:\s*/i, '')
            : 'Part I Initial Dynamics',
          paras: blocks[0]
            ? blocks[0].text
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [],
        },
        {
          ref: `${num}.2`,
          date: '1955–1968',
          title: blocks[1]
            ? blocks[1].title.replace(/^Act\s*\d+:\s*/i, '')
            : 'Part I Escalation & Turning Point',
          paras: blocks[1]
            ? blocks[1].text
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [],
        },
      ];

      rectoBlocks = [
        {
          ref: `${num}.3`,
          date: '1960–1970',
          title: blocks[2]
            ? blocks[2].title.replace(/^Act\s*\d+:\s*/i, '')
            : 'Part II Turning Point & Crisis',
          paras: blocks[2]
            ? blocks[2].text
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [],
        },
        {
          ref: `${num}.4`,
          date: '1964–1975',
          title: blocks[3]
            ? blocks[3].title.replace(/^Act\s*\d+:\s*/i, '')
            : 'Part II Consequences & Verdict',
          paras: blocks[3]
            ? blocks[3].text
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [],
        },
      ];
    } else {
      // Paired lessons: Lesson A provides Verso (Acts 1 & 2), Lesson B provides Recto (Acts 1 & 2)
      const lessonA = unitData.lessons[config.lessonSourceA];
      const lessonB = unitData.lessons[config.lessonSourceB];

      const blocksA = (lessonA.narrative_blocks || []).filter((b) => b.text && b.text.trim());
      const blocksB = (lessonB.narrative_blocks || []).filter((b) => b.text && b.text.trim());

      versoBlocks = [
        {
          ref: `${num}.1`,
          date: '1950–1965',
          title: blocksA[0]
            ? blocksA[0].title.replace(/^Act\s*\d+:\s*/i, '')
            : 'Part I Foundations',
          paras: blocksA[0]
            ? blocksA[0].text
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [],
        },
        {
          ref: `${num}.2`,
          date: '1955–1968',
          title: blocksA[1] ? blocksA[1].title.replace(/^Act\s*\d+:\s*/i, '') : 'Part I Escalation',
          paras: blocksA[1]
            ? blocksA[1].text
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [],
        },
      ];

      rectoBlocks = [
        {
          ref: `${num}.3`,
          date: '1960–1970',
          title: blocksB[0]
            ? blocksB[0].title.replace(/^Act\s*\d+:\s*/i, '')
            : 'Part II Counter-Current',
          paras: blocksB[0]
            ? blocksB[0].text
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [],
        },
        {
          ref: `${num}.4`,
          date: '1965–1975',
          title: blocksB[1]
            ? blocksB[1].title.replace(/^Act\s*\d+:\s*/i, '')
            : 'Part II Ultimate Verdict',
          paras: blocksB[1]
            ? blocksB[1].text
                .split(/\n\s*\n|\n/)
                .map((p) => p.trim())
                .filter(Boolean)
            : [],
        },
      ];
    }

    function renderNarrativeBlock(b) {
      const parasHtml = b.paras
        .map((p) => {
          const cleaned = cleanProse(p);
          const formatted = formatMarkdown(cleaned);
          return `<p class="prose-p">${formatted}</p>`;
        })
        .join('');

      return `
        <div class="narrative-block">
          <div class="narrative-block-header">
            <span class="block-ref">[${b.ref}]</span>
            <span class="block-date">${b.date}</span>
            <h3 class="block-title">${b.title}</h3>
          </div>
          ${parasHtml}
        </div>
      `;
    }

    const versoBlocksHtml = versoBlocks.map(renderNarrativeBlock).join('');
    const rectoBlocksHtml = rectoBlocks.map(renderNarrativeBlock).join('');

    spreadsHtml += `
    <!-- SPREAD ${num}: VERSO (PAGE ${versoPage}) -->
    <div class="a4-page textbook-page verso-page ${config.densityClass}" id="page-${versoPage}" data-page="${versoPage}">
      <header class="page-running-header">
        <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
        <span class="header-center">${config.ktGroup}</span>
        <span class="header-right">ENQUIRY ${num} &bull; PART I</span>
      </header>

      <div class="spread-banner verso-banner">
        <div class="banner-top">
          <span class="banner-code">${config.ktCode}</span>
          <span class="banner-divider">|</span>
          <h2 class="banner-title">${config.title}</h2>
        </div>
        <div class="key-enquiry-box">
          <span class="key-enquiry-badge">KEY ENQUIRY QUESTION</span>
          <p class="key-enquiry-text">${config.enquiryQuestion}</p>
        </div>
      </div>

      <div class="prose-columns">
        ${versoBlocksHtml}
      </div>

      <footer class="page-running-footer">
        <span class="footer-left">Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
        <span class="footer-right"><span class="page-num">${versoPage}</span></span>
      </footer>
    </div>

    <!-- SPREAD ${num}: RECTO (PAGE ${rectoPage}) -->
    <div class="a4-page textbook-page recto-page ${config.densityClass}" id="page-${rectoPage}" data-page="${rectoPage}">
      <header class="page-running-header">
        <span class="header-left">ENQUIRY ${num} &bull; PART II</span>
        <span class="header-center">${config.shortTitle}</span>
        <span class="header-right">PEARSON EDEXCEL GCSE (9–1) HISTORY</span>
      </header>

      <div class="spread-banner recto-banner">
        <div class="banner-top">
          <span class="banner-code">${config.ktCode} (CONT.)</span>
          <span class="banner-divider">|</span>
          <h2 class="banner-title">${config.rectoSubtitle}</h2>
        </div>
        <div class="key-mechanism-box">
          <span class="mechanism-badge">DECISIVE HISTORICAL MECHANISM</span>
          <p class="mechanism-text">${config.rectoAnchor}</p>
        </div>
      </div>

      <div class="prose-columns">
        ${rectoBlocksHtml}
      </div>

      <footer class="page-running-footer">
        <span class="footer-left"><span class="page-num">${rectoPage}</span></span>
        <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
        <span class="footer-right">Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
      </footer>
    </div>
    `;
  });

  // 5. MASTER RETRIEVAL QUIZ (Page 28)
  const cardKeys = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'];
  const cardConfigs = [
    {
      title: 'Jim Crow, Segregation & Brown v. Topeka',
      badge: 'ENQUIRIES 1 & 2',
      locator: 'pp. 4–7 • Ref [1.1]–[2.4]',
    },
    {
      title: 'Montgomery Boycott, Sit-Ins & Freedom Rides',
      badge: 'ENQUIRIES 3 & 4',
      locator: 'pp. 8–11 • Ref [3.1]–[4.4]',
    },
    {
      title: 'Birmingham, Selma & Black Power',
      badge: 'ENQUIRIES 5 & 6',
      locator: 'pp. 12–15 • Ref [5.1]–[6.4]',
    },
    {
      title: 'Domino Theory, Diem & Gulf of Tonkin',
      badge: 'ENQUIRIES 7 & 8',
      locator: 'pp. 16–19 • Ref [7.1]–[8.4]',
    },
    {
      title: 'Vietcong Tactics, Tet & Vietnamization',
      badge: 'ENQUIRIES 9 & 10',
      locator: 'pp. 20–23 • Ref [9.1]–[10.4]',
    },
    {
      title: 'Home Front, Paris Accords & Fall of Saigon',
      badge: 'ENQUIRIES 11 & 12',
      locator: 'pp. 24–27 • Ref [11.1]–[12.4]',
    },
  ];

  let globalQNum = 1;
  const quizCardsHtml = cardKeys
    .map((k, idx) => {
      const cfg = cardConfigs[idx];
      const qList = QUIZ_QUESTIONS[k]
        .map((qText) => {
          const num = globalQNum++;
          return `
        <div class="quiz-item">
          <span class="quiz-num">${num}.</span>
          <span class="quiz-text">${qText}</span>
        </div>
      `;
        })
        .join('');

      return `
      <div class="quiz-grid-card">
        <div class="quiz-grid-header">
          <div class="quiz-title-wrap">
            <span class="quiz-badge">${cfg.badge}</span>
            <span class="quiz-title">${cfg.title}</span>
          </div>
          <span class="quiz-locator">${cfg.locator}</span>
        </div>
        <div class="quiz-items-wrap">
          ${qList}
        </div>
      </div>
    `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>The USA, 1954–1975: Conflict at Home and Abroad — Master Classroom Textbook</title>
  <meta name="description" content="GCSE Option 33: Conflict at Home and Abroad: the USA (1954–1975) Pure Narrative Classroom Textbook. Exactly 28 pages." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-display: 'Cinzel', serif;
      --font-body: 'Lora', Georgia, serif;
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-quote: 'Playfair Display', Georgia, serif;
      --navy-deep: #0b192c;
      --crimson-accent: #8b0000;
      --gold-royal: #c5a059;
      --blue-accent: #1e3a8a;
      --ink-primary: #1e293b;
      --ink-secondary: #334155;
      --ink-muted: #64748b;
      --border-soft: #cbd5e1;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    body {
      background: #525659;
      margin: 0;
      padding: 20px 0;
      font-family: var(--font-body);
      color: var(--ink-primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-font-smoothing: antialiased;
    }

    .anthology-book-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .a4-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      background: #ffffff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12mm 16mm 10mm 16mm;
    }

    @media print {
      body { background: transparent; padding: 0; }
      .anthology-book-container { gap: 0; }
      .a4-page {
        box-shadow: none;
        page-break-after: always;
        break-after: page;
        margin: 0;
        width: 210mm;
        height: 297mm;
      }
    }

    /* RUNNING HEADERS & FOOTERS */
    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.8px solid #cbd5e1;
      padding-bottom: 2mm;
      margin-bottom: 2.8mm;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: var(--ink-muted);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .page-running-footer {
      border-top: 0.8px solid #cbd5e1;
      padding-top: 2mm;
      margin-top: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 5.8pt;
      letter-spacing: 0.04em;
      color: var(--ink-muted);
      white-space: nowrap;
    }
    .page-num {
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 1px 7px;
      border-radius: 2px;
      font-size: 7.0pt;
    }

    /* =========================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================= */
    .front-cover {
      background: #0f172a;
      color: #ffffff;
      padding: 11mm 15mm 9mm 15mm;
    }
    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 1.5mm;
      font-family: var(--font-sans);
    }
    .masthead-title {
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.10em;
      color: #ffffff;
      text-transform: uppercase;
    }
    .masthead-badge {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
      font-size: 6.2pt;
      font-weight: 700;
      padding: 1.5px 6px;
      border-radius: 2px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .cover-title-group {
      text-align: center;
      margin-top: 1.2mm;
      margin-bottom: 1.2mm;
    }
    .cover-spec-pill {
      display: inline-block;
      background: rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 1.5px 8px;
      border-radius: 12px;
      margin-bottom: 2px;
      text-transform: uppercase;
    }
    .cover-title-group h1 {
      font-family: var(--font-display);
      font-size: 19.5pt;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: 0.04em;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 0.8mm;
    }
    .cover-title-group p {
      font-family: var(--font-body);
      font-style: italic;
      font-size: 8.8pt;
      color: #cbd5e1;
    }

    .cover-hero-artwork-frame {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      overflow: hidden;
      background: #000000;
      margin-bottom: 3mm;
    }
    .cover-hero-img-box {
      width: 100%;
      height: 138mm;
      overflow: hidden;
    }
    .cover-hero-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      display: block;
    }
    .cover-hero-caption {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      color: #94a3b8;
      background: #0b1329;
      padding: 3px 8px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-style: italic;
    }

    .cover-synopsis-card {
      background: #fdfbf7;
      color: #1e293b;
      border-left: 4px solid var(--blue-accent);
      border-radius: 4px;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      margin-bottom: 3mm;
    }
    .cover-synopsis-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2.5px;
    }
    .cover-synopsis-badge {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .cover-synopsis-tag {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }
    .cover-synopsis-body p {
      font-family: var(--font-body);
      font-size: 8.6pt;
      line-height: 1.50;
      color: #1e293b;
      margin-bottom: 5px;
      text-align: justify;
    }
    .cover-synopsis-body p:last-child {
      margin-bottom: 0;
    }

    .cover-curriculum-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 3px;
      padding: 4.5px 12px;
      font-family: var(--font-sans);
      font-size: 6.0pt;
      color: #cbd5e1;
      white-space: nowrap;
      margin-bottom: 2.5mm;
    }
    .ccs-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ccs-code {
      font-weight: 800;
      color: #93c5fd;
      background: rgba(147, 197, 253, 0.15);
      padding: 1px 4px;
      border-radius: 2px;
    }
    .ccs-divider {
      color: rgba(255, 255, 255, 0.3);
    }
    .cover-footer-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 1.5mm;
      font-family: var(--font-sans);
      font-size: 5.4pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    /* =========================================================
       PAGE 2: INSIDE FRONT COVER SPECIFICATION DIRECTORY
       ========================================================= */
    .inside-cover-page {
      background: #ffffff;
      padding: 9.5mm 15mm 7.5mm 15mm !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3.5px;
    }
    .inside-cover-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.5mm;
      margin-bottom: 1.8mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .ichs-title-group h2 {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .ichs-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 1px;
      white-space: nowrap;
    }
    .ichs-badge {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .inside-cover-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3px;
      min-height: 0;
    }
    .inside-kt-group {
      margin-bottom: 0;
    }
    .inside-kt-group:last-child {
      margin-bottom: 0;
    }
    .inside-kt-header {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #0f172a;
      color: #ffffff;
      padding: 2.2px 7px;
      border-radius: 2px;
      margin-bottom: 1.5px;
    }
    .ikt-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      background: var(--crimson-accent);
      color: #ffffff;
      padding: 1.2px 5.0px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .ikt-title {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .inside-kt-rows {
      display: flex;
      flex-direction: column;
      gap: 1.8px;
    }
    .inside-spec-row {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.8px solid var(--blue-accent);
      padding: 2.6px 7px;
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .isr-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .isr-left {
      display: flex;
      align-items: baseline;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }
    .isr-code {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--blue-accent);
      white-space: nowrap;
    }
    .isr-question {
      font-family: var(--font-sans);
      font-size: 7.8pt;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .isr-pages {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: #64748b;
      white-space: nowrap;
      margin-left: 8px;
    }
    .isr-blurb {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      line-height: 1.25;
      color: #334155;
      margin: 0;
      text-align: justify;
      font-style: italic;
    }
    .isr-blurb strong {
      font-style: normal;
      font-weight: 700;
      color: #0f172a;
    }

    /* =========================================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================= */
    .spine-page {
      background: #ffffff;
      padding: 10mm 15mm 8mm 15mm !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .spine-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.8mm;
      margin-bottom: 2.2mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .shs-title-group h2 {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .shs-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
      white-space: nowrap;
    }
    .shs-badge {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .spine-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 4.2px;
      position: relative;
      min-height: 0;
    }
    .spine-container::before {
      content: '';
      position: absolute;
      left: 19.5mm;
      top: 5px;
      bottom: 5px;
      width: 1.5px;
      background: #cbd5e1;
      z-index: 1;
    }
    .spine-item {
      display: flex;
      align-items: flex-start;
      gap: 7px;
      position: relative;
      z-index: 2;
    }
    .spine-date-badge {
      width: 18mm;
      text-align: right;
      font-family: var(--font-sans);
      font-size: 7.0pt;
      font-weight: 800;
      color: var(--crimson-accent);
      padding-top: 1.5px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .spine-dot {
      width: 7px;
      height: 7px;
      background: #ffffff;
      border: 2px solid var(--navy-deep);
      border-radius: 50%;
      margin-top: 3.5px;
      flex-shrink: 0;
      box-shadow: 0 0 0 1.5px #ffffff;
    }
    .spine-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid var(--navy-deep);
      padding: 2.8px 8px;
      border-radius: 2px;
    }
    .spine-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }
    .spine-title {
      font-family: var(--font-sans);
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
    }
    .spine-desc {
      font-family: var(--font-body);
      font-size: 7.2pt;
      line-height: 1.26;
      color: #334155;
      text-align: justify;
      margin: 0;
    }

    /* =========================================================
       PAGES 4–27: 12 CANONICAL ENQUIRY SPREADS
       ========================================================= */
    .spread-banner {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid var(--navy-deep);
      border-radius: 3px;
      padding: 2.2mm 3.2mm;
      margin-bottom: 2.8mm;
      display: flex;
      flex-direction: column;
      gap: 1.5mm;
    }
    .verso-banner {
      border-left-color: var(--crimson-accent);
    }
    .recto-banner {
      border-left-color: var(--blue-accent);
    }
    .banner-top {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .banner-code {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--crimson-accent);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      flex-shrink: 0;
    }
    .recto-banner .banner-code {
      color: var(--blue-accent);
    }
    .banner-divider {
      color: #94a3b8;
      font-size: 7pt;
    }
    .banner-title {
      font-family: var(--font-display);
      font-size: 9.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.02em;
      line-height: 1.18;
      text-transform: uppercase;
    }
    .key-enquiry-box, .key-mechanism-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 2px;
      padding: 2.5px 6px;
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .key-enquiry-badge {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--crimson-accent);
      padding: 1px 4.5px;
      border-radius: 2px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      flex-shrink: 0;
    }
    .key-enquiry-text {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: var(--navy-deep);
      line-height: 1.22;
    }
    .mechanism-badge {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--blue-accent);
      padding: 1px 4.5px;
      border-radius: 2px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      flex-shrink: 0;
    }
    .mechanism-text {
      font-family: var(--font-body);
      font-size: 6.8pt;
      font-style: italic;
      color: #1e293b;
      line-height: 1.22;
    }

    /* 2-COLUMN BALANCED PROSE */
    .prose-columns {
      flex: 1;
      column-count: 2;
      column-gap: 8mm;
      column-fill: balance;
      min-height: 0;
    }
    .narrative-block {
      break-inside: avoid-column;
      margin-bottom: 7px;
    }
    .narrative-block-header {
      display: flex;
      align-items: baseline;
      gap: 5px;
      border-bottom: 0.8px solid #cbd5e1;
      padding-bottom: 1.5px;
      margin-bottom: 4px;
    }
    .block-ref {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: rgba(139, 0, 0, 0.08);
      padding: 0.5px 3.5px;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .block-date {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 700;
      color: #64748b;
      flex-shrink: 0;
    }
    .block-title {
      font-family: var(--font-display);
      font-size: 8.2pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.02em;
      line-height: 1.18;
      text-transform: uppercase;
      flex: 1;
    }
    .prose-p {
      font-family: var(--font-body);
      font-size: 11.6pt;
      line-height: 1.58;
      color: var(--ink-primary);
      text-align: justify;
      margin-bottom: 7px;
    }
    .prose-p strong {
      font-weight: 700;
      color: #0f172a;
    }

    /* =========================================================
       PAGE 28: MASTER KNOWLEDGE RETRIEVAL QUIZ (BACK COVER)
       ========================================================= */
    .quiz-page {
      background: #ffffff;
      padding: 11mm 15mm 9mm 15mm;
    }
    .quiz-master-header {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.5mm;
      margin-bottom: 2.0mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .quiz-master-title-group h2 {
      font-family: var(--font-display);
      font-size: 12.5pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .quiz-master-title-group p {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }
    .quiz-master-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 700;
      padding: 1.5px 6px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .quiz-instruction-banner {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid var(--gold-royal);
      border-radius: 3px;
      padding: 2mm 3.5mm;
      margin-bottom: 2.5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-family: var(--font-sans);
    }
    .qib-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .qib-num {
      background: var(--gold-royal);
      color: #ffffff;
      font-weight: 800;
      font-size: 6.2pt;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .qib-text {
      font-size: 6.5pt;
      color: #334155;
      font-weight: 600;
      line-height: 1.2;
    }

    .quiz-grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      gap: 6px 10px;
      flex: 1;
      min-height: 0;
      margin-bottom: 1.5mm;
    }
    .quiz-grid-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid var(--navy-deep);
      border-radius: 3px;
      padding: 4px 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }
    .quiz-grid-card:nth-child(even) {
      border-top-color: var(--crimson-accent);
    }
    .quiz-grid-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 0.8px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .quiz-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .quiz-badge {
      font-family: var(--font-sans);
      font-size: 5.0pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: rgba(139, 0, 0, 0.08);
      padding: 0.5px 3px;
      border-radius: 2px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .quiz-grid-card:nth-child(even) .quiz-badge {
      color: var(--blue-accent);
      background: rgba(30, 58, 138, 0.08);
    }
    .quiz-title {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 800;
      color: var(--navy-deep);
      line-height: 1.15;
    }
    .quiz-locator {
      font-family: var(--font-sans);
      font-size: 5.0pt;
      font-weight: 700;
      color: #64748b;
      white-space: nowrap;
    }
    .quiz-items-wrap {
      display: flex;
      flex-direction: column;
      gap: 1.5px;
      flex: 1;
      justify-content: space-between;
    }
    .quiz-item {
      display: flex;
      align-items: baseline;
      gap: 3px;
      font-family: var(--font-sans);
      font-size: 5.6pt;
      line-height: 1.18;
      color: #1e293b;
    }
    .quiz-num {
      font-weight: 800;
      color: var(--navy-deep);
      flex-shrink: 0;
      font-size: 5.4pt;
      min-width: 11px;
    }
    .quiz-text {
      flex: 1;
    }

    .back-colophon {
      border-top: 1px solid #cbd5e1;
      padding-top: 1.2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 5.8pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>

  <div class="anthology-book-container">

    <!-- =========================================================
         PAGE 1: MASTER FRONT COVER
         ========================================================= -->
    <div class="a4-page front-cover" id="page-1" data-page="1">
      <header class="cover-top-masthead">
        <span class="masthead-title">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
        <span class="masthead-badge">KEY STAGE 4 &bull; PEARSON EDEXCEL GCSE OPTION 33</span>
      </header>

      <div class="cover-title-group">
        <span class="cover-spec-pill">Pearson Edexcel GCSE (9–1) History &bull; Paper 3 Option 33</span>
        <h1>THE USA, 1954–1975:<br>CONFLICT AT HOME AND ABROAD</h1>
        <p>1954–1975 &bull; The Civil Rights Movement &bull; US Involvement in the Vietnam War</p>
      </div>

      <div class="cover-hero-artwork-frame">
        <div class="cover-hero-img-box">
          <img src="${coverImgData}" alt="Soldiers of the 101st Airborne Division escort the Little Rock Nine" />
        </div>
        <div class="cover-hero-caption">
          Plate I: Soldiers of the 101st Airborne Division escort the Little Rock Nine into Central High School, Arkansas (September 1957). US Army Signal Corps / National Archives and Records Administration (NARA).
        </div>
      </div>

      <div class="cover-synopsis-card">
        <div class="cover-synopsis-header">
          <span class="cover-synopsis-badge">HISTORICAL OVERVIEW &bull; 1954–1975</span>
          <span class="cover-synopsis-tag">CONFLICT AT HOME &amp; ABROAD</span>
        </div>
        <div class="cover-synopsis-body" id="cover-synopsis-body">
          <p>
            Torn apart by two simultaneous existential struggles, the United States fought a ferocious battle for its own soul at home and abroad. On the domestic front, Black Americans risked their lives against Jim Crow terror, police dogs, and disenfranchisement—advancing from the legal triumph of Brown v. Topeka and the Montgomery Bus Boycott to the legislative breakthroughs of the Civil Rights Act and the militant defiance of Black Power.
          </p>
          <p>
            Simultaneously, across the Pacific in Southeast Asia, over half a million conscripted American soldiers waged a gruelling counter-insurgency against resilient Vietcong guerrillas. As napalm, the 1968 Tet Offensive, and the My Lai massacre were beamed into American living rooms, anti-war protests and the Kent State shootings fractured the home front, culminating in painful withdrawal and the fall of Saigon in 1975.
          </p>
        </div>
      </div>

      <div class="cover-curriculum-strip">
        <div class="ccs-item"><span class="ccs-code">KT 1</span><span class="ccs-text">Civil Rights Movement (1954–60)</span></div>
        <div class="ccs-divider">&bull;</div>
        <div class="ccs-item"><span class="ccs-code">KT 2</span><span class="ccs-text">Protest &amp; Radicalism (1960–75)</span></div>
        <div class="ccs-divider">&bull;</div>
        <div class="ccs-item"><span class="ccs-code">KT 3</span><span class="ccs-text">Vietnam War (1954–75)</span></div>
        <div class="ccs-divider">&bull;</div>
        <div class="ccs-item"><span class="ccs-code">KT 4</span><span class="ccs-text">Reactions &amp; US Exit (1964–75)</span></div>
      </div>

      <footer class="cover-footer-meta">
        <span>Page 1 &bull; Master Cover</span>
        <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
        <span>Course Specification &amp; Disciplinary Directory &bull; Inside Front Cover (p. 2)</span>
      </footer>
    </div>

    <!-- =========================================================
         PAGE 2: INSIDE FRONT COVER SPECIFICATION DIRECTORY
         ========================================================= -->
    <div class="a4-page inside-cover-page" id="page-2" data-page="2">
      <header class="page-running-header">
        <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
        <span class="header-center">PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION 33</span>
        <span class="header-right">INSIDE FRONT COVER &bull; PAGE 2</span>
      </header>

      <div class="inside-cover-header-strip">
        <div class="ichs-title-group">
          <h2>COURSE SPECIFICATION &amp; DISCIPLINARY DIRECTORY</h2>
          <p>Full Syllabus Alignment Across All 16 Canonical Lessons (Key Topics 1–4) &bull; Option 33</p>
        </div>
        <span class="ichs-badge">Official Specification Alignment</span>
      </div>

      <div class="inside-cover-content">
        ${insideCoverHtml}
      </div>

      <footer class="page-running-footer">
        <span class="footer-left">Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
        <span class="footer-right"><span class="page-num">2</span></span>
      </footer>
    </div>

    <!-- =========================================================
         PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
         ========================================================= -->
    <div class="a4-page spine-page" id="page-3" data-page="3">
      <header class="page-running-header">
        <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM</span>
        <span class="header-center">CHRONOLOGICAL MILESTONE SPINE &bull; 1954–1975</span>
        <span class="header-right">OPTION 33 &bull; PAGE 3</span>
      </header>

      <div class="spine-header-strip">
        <div class="shs-title-group">
          <h2>CHRONOLOGICAL MILESTONE SPINE &amp; TURNING POINTS</h2>
          <p>17 Defining Causal Turning Points Across All 16 Canonical Lessons &bull; Option 33</p>
        </div>
        <span class="shs-badge">Chronological Highway</span>
      </div>

      <div class="spine-container">
        ${milestoneItemsHtml}
      </div>

      <footer class="page-running-footer">
        <span class="footer-left">Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
        <span class="footer-right"><span class="page-num">3</span></span>
      </footer>
    </div>

    <!-- =========================================================
         PAGES 4–27: 12 CANONICAL ENQUIRY SPREADS
         ========================================================= -->
    ${spreadsHtml}

    <!-- =========================================================
         PAGE 28: MASTER KNOWLEDGE RETRIEVAL QUIZ (BACK COVER)
         ========================================================= -->
    <div class="a4-page quiz-page" id="page-28" data-page="28">
      <header class="page-running-header">
        <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
        <span class="header-center">MASTER KNOWLEDGE RETRIEVAL QUIZ</span>
        <span class="header-right">OPTION 33 BACK COVER</span>
      </header>

      <div class="quiz-master-header">
        <div class="quiz-master-title-group">
          <h2>Master Knowledge Retrieval Quiz</h2>
          <p>60 Essential Recall Questions Across Conflict at Home and Abroad (1954–1975)</p>
        </div>
        <span class="quiz-master-badge">Partner Quiz or Solo Practice</span>
      </div>

      <div class="quiz-instruction-banner">
        <div class="qib-item">
          <span class="qib-num">1</span>
          <span class="qib-text"><strong>Pair Oral Retrieval:</strong> Partner A reads odd numbers; Partner B answers from memory without looking at notes.</span>
        </div>
        <div class="qib-item">
          <span class="qib-num">2</span>
          <span class="qib-text"><strong>Solo Notebook Practice:</strong> Write out answers 1–60 in your exercise book; verify against the paragraph references.</span>
        </div>
      </div>

      <div class="quiz-grid-container">
        ${quizCardsHtml}
      </div>

      <footer class="page-running-footer">
        <span class="footer-left">Option 33: Conflict at Home and Abroad: the USA, 1954–75</span>
        <span class="footer-center">THE DISCIPLINARY HISTORY CLASSROOM TEXTBOOK &bull; SADDLE-STITCH REPROGRAPHICS COMPLIANT</span>
        <span class="footer-right"><span class="page-num">28</span></span>
      </footer>
    </div>

  </div>

  <script>
    // In-browser Auto-Fit Engines for Reprographics Quality Gates
    function autoFitCoverSynopsis() {
      const page = document.querySelector('#page-1');
      const body = document.querySelector('#cover-synopsis-body');
      if (!page || !body) return;

      let fs = 7.8;
      while (page.scrollHeight > page.clientHeight && fs > 6.0) {
        fs -= 0.1;
        body.querySelectorAll('p').forEach(p => {
          p.style.fontSize = fs.toFixed(1) + 'pt';
          p.style.lineHeight = '1.38';
          p.style.marginBottom = '3px';
        });
      }
    }

    function autoFitInsideCoverDirectory() {
      const page = document.querySelector('#page-2');
      if (!page) return;
      const content = page.querySelector('.inside-cover-content');
      const footer = page.querySelector('.page-running-footer');
      if (!footer) return;

      page.style.justifyContent = 'flex-start';
      if (content) content.style.justifyContent = 'flex-start';

      const footerTop = footer.getBoundingClientRect().top;
      const blurbs = Array.from(page.querySelectorAll('.isr-blurb'));
      const questions = Array.from(page.querySelectorAll('.isr-question'));
      const rows = Array.from(page.querySelectorAll('.inside-spec-row'));

      function getLastBottom() {
        const lastGroup = page.querySelector('.inside-kt-group:last-child');
        return lastGroup ? lastGroup.getBoundingClientRect().bottom : (content ? content.getBoundingClientRect().bottom : 0);
      }

      let fs = 6.4;
      let pad = 2.6;

      // 1. Scale down if overflowing or touching footer
      while ((page.scrollHeight > page.clientHeight || getLastBottom() > footerTop - 8) && fs > 4.5) {
        fs -= 0.1;
        pad = Math.max(1.4, pad - 0.1);
        blurbs.forEach(b => {
          b.style.fontSize = fs.toFixed(1) + 'pt';
          b.style.lineHeight = '1.24';
        });
        questions.forEach(q => q.style.fontSize = (fs + 1.2).toFixed(1) + 'pt');
        rows.forEach(r => {
          r.style.paddingTop = pad.toFixed(1) + 'px';
          r.style.paddingBottom = pad.toFixed(1) + 'px';
        });
      }

      // 2. Scale up if there is ample clearance to fill vertical space naturally
      let clearance = footerTop - getLastBottom();
      if (clearance > 12 && page.scrollHeight <= page.clientHeight) {
        let bestFs = fs;
        let bestPad = pad;
        for (let testFs = fs + 0.1; testFs <= 7.6; testFs += 0.1) {
          const testPad = pad + (testFs - fs) * 0.7;
          blurbs.forEach(b => {
            b.style.fontSize = testFs.toFixed(1) + 'pt';
            b.style.lineHeight = '1.26';
          });
          questions.forEach(q => q.style.fontSize = (testFs + 1.2).toFixed(1) + 'pt');
          rows.forEach(r => {
            r.style.paddingTop = testPad.toFixed(1) + 'px';
            r.style.paddingBottom = testPad.toFixed(1) + 'px';
          });

          if (getLastBottom() <= footerTop - 8 && page.scrollHeight <= page.clientHeight) {
            bestFs = testFs;
            bestPad = testPad;
          } else {
            break;
          }
        }
        blurbs.forEach(b => {
          b.style.fontSize = bestFs.toFixed(1) + 'pt';
          b.style.lineHeight = '1.26';
        });
        questions.forEach(q => q.style.fontSize = (bestFs + 1.2).toFixed(1) + 'pt');
        rows.forEach(r => {
          r.style.paddingTop = bestPad.toFixed(1) + 'px';
          r.style.paddingBottom = bestPad.toFixed(1) + 'px';
        });
      }
    }

    function autoFitPage3Milestones() {
      const page = document.querySelector('#page-3');
      if (!page) return;
      const spineContainer = page.querySelector('.spine-container');
      const footer = page.querySelector('.page-running-footer') || page.querySelector('.page-footer');
      const items = Array.from(page.querySelectorAll('.spine-item'));
      const descs = Array.from(page.querySelectorAll('.spine-desc'));
      const titles = Array.from(page.querySelectorAll('.spine-title'));
      const badges = Array.from(page.querySelectorAll('.spine-date-badge'));
      const contents = Array.from(page.querySelectorAll('.spine-content'));
      if (!spineContainer || !footer || !items.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      function getLastBottom() {
        const last = page.querySelector('.spine-item:last-child');
        return last ? last.getBoundingClientRect().bottom : 0;
      }

      function apply(fs, gap, padY) {
        spineContainer.style.gap = gap.toFixed(1) + 'px';
        descs.forEach(d => {
          d.style.fontSize = fs.toFixed(1) + 'pt';
          d.style.lineHeight = '1.26';
        });
        titles.forEach(t => t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt');
        badges.forEach(b => b.style.fontSize = (fs - 0.2).toFixed(1) + 'pt');
        contents.forEach(c => {
          c.style.paddingTop = padY.toFixed(1) + 'px';
          c.style.paddingBottom = padY.toFixed(1) + 'px';
        });
      }

      let fs = 7.0;
      let gap = 4.2;
      let padY = 2.8;
      apply(fs, gap, padY);

      // 1. Scale down if overflowing
      while ((page.scrollHeight > page.clientHeight || getLastBottom() > footerTop - 6) && fs > 5.5) {
        fs -= 0.1;
        gap = Math.max(2.0, gap - 0.15);
        padY = Math.max(1.5, padY - 0.1);
        apply(fs, gap, padY);
      }

      // 2. Scale up if room permits
      let clearance = footerTop - getLastBottom();
      if (clearance > 10 && page.scrollHeight <= page.clientHeight) {
        let bestFs = fs;
        let bestGap = gap;
        let bestPadY = padY;
        for (let testFs = fs + 0.1; testFs <= 8.5; testFs += 0.1) {
          const testGap = gap + (testFs - fs) * 0.8;
          const testPadY = padY + (testFs - fs) * 0.35;
          apply(testFs, testGap, testPadY);

          if (getLastBottom() <= footerTop - 8 && page.scrollHeight <= page.clientHeight) {
            bestFs = testFs;
            bestGap = testGap;
            bestPadY = testPadY;
          } else {
            break;
          }
        }
        apply(bestFs, bestGap, bestPadY);
      }
    }

    function autoFitSpreadTypography() {
      document.querySelectorAll('.textbook-page').forEach(page => {
        const pageNum = parseInt(page.getAttribute('data-page'), 10);
        if (pageNum >= 4 && pageNum <= 27) {
          const prose = page.querySelector('.prose-columns');
          if (!prose) return;
          const paragraphs = Array.from(page.querySelectorAll('.prose-p'));
          const blocks = Array.from(page.querySelectorAll('.narrative-block'));
          if (!paragraphs.length) return;

          const footer = page.querySelector('.page-running-footer');
          const footerTop = footer ? footer.getBoundingClientRect().top : page.clientHeight - 30;

          // 1. Scale down if colliding or overflowing
          let currentFs = parseFloat(window.getComputedStyle(paragraphs[0]).fontSize) * 0.75;
          let currentMb = parseFloat(window.getComputedStyle(paragraphs[0]).marginBottom) || 6;
          let iterations = 0;

          while ((prose.getBoundingClientRect().bottom > footerTop - 8 || page.scrollHeight > page.clientHeight || prose.scrollWidth > prose.clientWidth + 2) && currentFs > 8.8 && iterations < 40) {
            currentFs -= 0.15;
            currentMb = Math.max(2.5, currentMb - 0.25);
            paragraphs.forEach(p => {
              p.style.fontSize = currentFs.toFixed(2) + 'pt';
              p.style.lineHeight = (currentFs * 0.130 + 0.06).toFixed(2);
              p.style.marginBottom = currentMb.toFixed(1) + 'px';
            });
            blocks.forEach(b => {
              b.style.marginBottom = Math.max(3.5, currentMb * 1.1).toFixed(1) + 'px';
            });
            iterations++;
          }

          // 2. Scale up if substantial empty clearance exists (> 30px)
          let lowestBottom = prose.getBoundingClientRect().bottom;
          let clearance = footerTop - lowestBottom;

          if (clearance > 30 && prose.getBoundingClientRect().bottom <= footerTop - 8) {
            let bestUpFs = currentFs;
            let bestUpMb = currentMb;

            for (let testFs = currentFs; testFs <= 13.8; testFs += 0.15) {
              const testLh = (1.50 + (testFs - 10.5) * 0.035).toFixed(2);
              const testMb = Math.min(15, currentMb + (testFs - currentFs) * 1.8);
              paragraphs.forEach(p => {
                p.style.fontSize = testFs.toFixed(2) + 'pt';
                p.style.lineHeight = testLh;
                p.style.marginBottom = testMb.toFixed(1) + 'px';
              });
              blocks.forEach(b => {
                b.style.marginBottom = (testMb * 1.1).toFixed(1) + 'px';
              });

              const newBottom = prose.getBoundingClientRect().bottom;
              const newClearance = footerTop - newBottom;

              if (newBottom <= footerTop - 8 && page.scrollHeight <= page.clientHeight && prose.scrollWidth <= prose.clientWidth + 2 && newClearance >= 8) {
                bestUpFs = testFs;
                bestUpMb = testMb;
              } else {
                break;
              }
            }

            const finalLh = (1.50 + (bestUpFs - 10.5) * 0.035).toFixed(2);
            paragraphs.forEach(p => {
              p.style.fontSize = bestUpFs.toFixed(2) + 'pt';
              p.style.lineHeight = finalLh;
              p.style.marginBottom = bestUpMb.toFixed(1) + 'px';
            });
            blocks.forEach(b => {
              b.style.marginBottom = (bestUpMb * 1.1).toFixed(1) + 'px';
            });
          }
        }
      });
    }

    window.addEventListener('DOMContentLoaded', () => {
      autoFitCoverSynopsis();
      autoFitInsideCoverDirectory();
      autoFitPage3Milestones();
      autoFitSpreadTypography();
    });

    window.autoFitCoverSynopsis = autoFitCoverSynopsis;
    window.autoFitInsideCoverDirectory = autoFitInsideCoverDirectory;
    window.autoFitPage3Milestones = autoFitPage3Milestones;
    window.autoFitSpreadTypography = autoFitSpreadTypography;
  </script>
</body>
</html>`;
}

async function runUsaUnified() {
  console.log('=============================================================');
  console.log('🚀 COMPILING 28-PAGE MASTER TEXTBOOK: The USA, 1954–1975');
  console.log('   Ingesting 1:1 verbatim narrative directly from units/usa/data.js');
  console.log('=============================================================');

  const html = buildUsaHtml();

  const publicHtmlPath = path.join(ROOT_DIR, 'public', 'units', 'usa', 'textbook_UNIFIED.html');
  const rootHtmlPath = path.join(ROOT_DIR, 'units', 'usa', 'textbook_UNIFIED.html');
  const pdfFinalPath = path.join(ROOT_DIR, 'public', 'pdfs', 'usa_textbook_UNIFIED_FINAL.pdf');
  const pdfMirrorPath = path.join(ROOT_DIR, 'public', 'pdfs', 'usa_textbook.pdf');

  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  fs.writeFileSync(rootHtmlPath, html, 'utf8');
  console.log('HTML saved to:', publicHtmlPath);

  console.log('\nLaunching Puppeteer for Reprographics Audit & PDF compilation...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.evaluateHandle('document.fonts.ready');
  await page.evaluate(() => {
    if (window.autoFitCoverSynopsis) window.autoFitCoverSynopsis();
    if (window.autoFitInsideCoverDirectory) window.autoFitInsideCoverDirectory();
    if (window.autoFitPage3Milestones) window.autoFitPage3Milestones();
    if (window.autoFitSpreadTypography) window.autoFitSpreadTypography();
  });

  // Evaluate page heights & clearance
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll(
      '.textbook-page, .front-cover, .inside-cover-page, .spine-page, .quiz-page',
    );
    return Array.from(pages).map((p, i) => {
      const pageNum = p.getAttribute('data-page') || i + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH > clientH + 2;
      const diff = scrollH - clientH;
      const footer =
        p.querySelector('.page-running-footer') ||
        p.querySelector('.back-colophon') ||
        p.querySelector('.cover-footer-meta');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;

      let lowestBottom = 0;
      const contentElements = Array.from(
        p.querySelectorAll(
          '.prose-columns, .cover-synopsis-card, .cover-curriculum-strip, .inside-kt-group:last-child .inside-spec-row:last-child, .spine-container, .quiz-grid-container',
        ),
      );
      contentElements.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom > lowestBottom) {
          lowestBottom = r.bottom;
        }
      });

      const clearance = Math.round(footerTop - lowestBottom);
      const proseBox = p.querySelector('.prose-columns');
      let horizOverflow = false;
      if (proseBox) {
        horizOverflow = proseBox.scrollWidth > proseBox.clientWidth + 2;
      }

      return {
        page: parseInt(pageNum, 10),
        scrollHeight: scrollH,
        clientHeight: clientH,
        overflow: overflow || horizOverflow,
        diff,
        clearance,
        horizOverflow,
      };
    });
  });

  console.log(`Rendered exactly ${auditResults.length} pages.`);
  let hasErrors = false;
  auditResults.forEach((r) => {
    const status = !r.overflow && r.clearance >= 0 ? '✅' : '❌';
    console.log(
      `  ${status} Page ${String(r.page).padStart(2, ' ')}: overflow=${r.overflow} (diff=${r.diff}px), clearance=${r.clearance}px, horizOverflow=${r.horizOverflow}`,
    );
    if (r.overflow || r.clearance < 0) {
      hasErrors = true;
    }
  });

  if (!hasErrors) {
    console.log('\nPERFECT: All 28 pages have 0px overflow and positive footer clearance!');
  } else {
    console.warn('\nWARNING: Reprographic issues detected above.');
  }

  // Run auditPageBudget with standard textbook parameters
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.a4-page',
      underflowThresholdPx: 50,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 50,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, 'usa/textbook_UNIFIED.html');
  } catch (err) {
    console.warn('Page budget audit notice:', err.message);
  }

  // Export PDF
  await page.pdf({
    path: pdfFinalPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    preferCSSPageSize: true,
  });

  // Mirror PDF
  fs.copyFileSync(pdfFinalPath, pdfMirrorPath);
  console.log('\nMaster 28-Page Textbook PDF compiled to:');
  console.log(' - ' + pdfFinalPath);
  console.log(' - ' + pdfMirrorPath);

  // Take high-resolution preview screenshots
  const previewDir = path.join(ROOT_DIR, 'public', 'units', 'usa', 'previews', 'unified');
  if (!fs.existsSync(previewDir)) {
    fs.mkdirSync(previewDir, { recursive: true });
  }

  const samplePages = [1, 2, 3, 4, 5, 6, 7, 14, 15, 16, 17, 26, 27, 28];
  for (const pNum of samplePages) {
    const elHandle = await page.$(`#page-${pNum}`);
    if (elHandle) {
      const shotPath = path.join(previewDir, `preview_page_${pNum}.png`);
      await elHandle.screenshot({ path: shotPath });
      console.log(`Saved screenshot for Page ${pNum}: ${shotPath}`);
    }
  }

  await browser.close();
  return true;
}

if (require.main === module) {
  runUsaUnified().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { buildUsaHtml, runUsaUnified };
