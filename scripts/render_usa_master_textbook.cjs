/**
 * scripts/render_usa_master_textbook.cjs
 *
 * UNIFIED 12-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK COMPILER
 * Option 33: Conflict at Home and Abroad: the USA, 1954–75 (Pearson Edexcel GCSE 9–1)
 *
 * Conforms strictly to the Disciplinary History Classroom Textbook Standard & Master Architecture:
 * - Exactly 12 Pages per Key Topic (3 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1:  Master Front Cover (Hero artwork 90x80mm, dramatic synopsis parchment card, 4-Enquiry Table of Contents Directory)
 * - Page 2:  Official Pearson Edexcel Specification Master Directory (100% verbatim from official Issue 6 PDF, Paper 3 exam structure, 4 subtopic bands)
 * - Page 3:  Master Chronological Milestone Spine (10–12 defining causal turning points & historical dominoes with paragraph cross-references)
 * - Pages 4–11: 4 Canonical Enquiries across 4 flat double-page spreads (Verso Part I + Recto Part II: 100% pure narrative, 11.6pt–12.2pt Lora serif)
 * - Page 12: Master 40-Question Knowledge Retrieval Quiz Back Cover (4 enquiry cards x 10 recall questions, zero answers printed)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 * - Automated in-browser auto-fit engines:
 *   * autoFitCoverBlurb()
 *   * autoFitCoverEnquiries()
 *   * autoFitPage2Specification()
 *   * autoFitPage3Milestones()
 *   * autoFitSpreadTypography()
 * - Automated reprographics audit via auditPageBudget() (0px overflow, < 25px footer void, >= 95% utilization)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'usa', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('Data file not found:', dataPath);
  process.exit(1);
}

// Ingest unit data via VM context to safely parse ES module export syntax
let rawData = fs.readFileSync(dataPath, 'utf8');
rawData =
  rawData
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
const unitData = vm.runInNewContext(rawData);

/**
 * Base64 Image Inliner for zero-latency rendering
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'usa', 'assets', 'sources', path.basename(clean)),
    path.join(
      ROOT_DIR,
      'public',
      'units',
      'usa',
      'assets',
      'sources',
      'portraits',
      path.basename(clean),
    ),
    path.join(ROOT_DIR, 'units', 'usa', 'assets', 'sources', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'usa', 'assets', 'sources', 'portraits', path.basename(clean)),
    path.join(ROOT_DIR, 'dist', 'units', 'usa', 'assets', 'sources', path.basename(clean)),
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

// Clean in-prose paragraph ref pills and bracketed tags
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(/<span\s+class=["']para-ref["']>[^<]*<\/span>\s*/gi, '')
    .replace(/<span\s+class=["']archival-meta-tag["']>[^<]*<\/span>\s*/gi, '')
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(/([a-zA-Z])"([a-zA-Z])/g, '$1" $2')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

/**
 * Tailored canonical synopsis blurbs for each Key Topic
 */
const KT_SYNOPSES = {
  kt1: {
    dates: '1954 – 1960',
    title: 'The Development of the Civil Rights Movement',
    blurb:
      'In the Jim Crow South, daily life was governed by an unforgiving racial caste system enforced through poll taxes, segregated schools, and Ku Klux Klan terror. Yet behind church doors and inside legal offices, Black Americans organized to challenge the constitutional foundation of white supremacy.\n\nFrom the unanimous Supreme Court victory of Brown v. Board of Education to the 381-day trial of the Montgomery Bus Boycott and the federal bayonets protecting the Little Rock Nine, discover how ordinary citizens dismantled legal segregation.',
  },
  kt2: {
    dates: '1960 – 1975',
    title: 'Protest, Progress and Radicalism',
    blurb:
      "A new generation took to lunch counters, interstate buses, and city streets to accelerate the fight for equality. Confronting police dogs in Birmingham, tear gas on the Edmund Pettus Bridge in Selma, and bomb attacks across the South, direct action galvanized national conscience and compelled historic federal legislation.\n\nYet legal victories could not heal the economic scars of Northern urban ghettos. Witness the shift toward Black Power, the rise of the Black Panther Party, and the tragic assassination of Dr. Martin Luther King Jr. that fractured the nation's civil rights coalition.",
  },
  kt3: {
    dates: '1954 – 1975',
    title: 'US Involvement in the Vietnam War',
    blurb:
      "Haunted by the Domino Theory and the spectre of global communist expansion, the United States plunged into the steaming jungles of Southeast Asia. What began as financial subsidies and military advisors to Ngo Dinh Diem's regime spiralled after the Gulf of Tonkin into a full-scale ground war.\n\nDeploying half a million conscripted troops, Operation Rolling Thunder, and devastating defoliants, American commanders believed overwhelming firepower would force Hanoi to yield. Instead, resilient Vietcong guerrillas and the Ho Chi Minh Trail turned the war into an agonizing quagmire.",
  },
  kt4: {
    dates: '1964 – 1975',
    title: 'Reactions to, and the End of, US Involvement in Vietnam',
    blurb:
      'As graphic television footage beamed uncensored carnage, body bags, and civilian casualties directly into American living rooms, the home front fractured. Discontent over the military draft, student strikes, and moral atrocities like My Lai culminated in the Kent State tragedy, shattering national unity.\n\nWhile President Nixon rallied the "Silent Majority" and unleashed ferocious Christmas Bombings to secure "peace with honour", the 1973 Paris Peace Accords merely delayed the inevitable. Follow the dramatic downfall of South Vietnam, culminating in the historic Fall of Saigon.',
  },
};

/**
 * 10–12 Milestone Spine Events for Page 3
 */
const KT_MILESTONES = {
  kt1: [
    {
      date: '1896',
      title: 'Plessy v. Ferguson & "Separate but Equal"',
      desc: 'Supreme Court legalizes racial segregation under the 14th Amendment, providing the legal foundation for Jim Crow.',
      ref: '1.1',
    },
    {
      date: '1909',
      title: 'Founding of the NAACP Legal Defense Fund',
      desc: 'Civil rights leaders establish a sustained constitutional litigation campaign to overturn state segregation statutes.',
      ref: '1.1',
    },
    {
      date: '17 May 1954',
      title: 'Brown v. Board of Education (Topeka)',
      desc: 'Chief Justice Earl Warren delivers a unanimous 9–0 verdict declaring segregated schools inherently unequal.',
      ref: '1.2',
    },
    {
      date: '28 Aug 1955',
      title: 'The Murder of Emmett Till in Mississippi',
      desc: "14-year-old Chicago youth is lynched; his mother's open-casket funeral exposes Southern terror to national horror.",
      ref: '1.4',
    },
    {
      date: '1 Dec 1955',
      title: 'Rosa Parks Arrested in Montgomery',
      desc: 'NAACP activist refuses to yield bus seat, igniting the 381-day Montgomery Bus Boycott led by Martin Luther King Jr.',
      ref: '1.3',
    },
    {
      date: '12 Mar 1956',
      title: 'The Southern Manifesto Signed',
      desc: '101 Southern congressmen pledge resistance to federal desegregation, encouraging state nullification.',
      ref: '1.4',
    },
    {
      date: '13 Nov 1956',
      title: 'Browder v. Gayle Supreme Court Ruling',
      desc: 'Supreme Court affirms bus segregation violates the 14th Amendment, ending the Montgomery Bus Boycott in victory.',
      ref: '1.3',
    },
    {
      date: 'Jan 1957',
      title: 'Founding of the SCLC',
      desc: 'Southern Christian Leadership Conference established to coordinate non-violent direct action with King as president.',
      ref: '1.3',
    },
    {
      date: '9 Sept 1957',
      title: 'Passage of the Civil Rights Act of 1957',
      desc: 'First federal civil rights legislation since Reconstruction establishes the Civil Rights Commission, though enforcement is weak.',
      ref: '1.4',
    },
    {
      date: '24 Sept 1957',
      title: 'Eisenhower Deploys 101st Airborne to Little Rock',
      desc: 'President federalizes Arkansas National Guard to escort the Little Rock Nine past armed mobs into Central High.',
      ref: '1.2',
    },
  ],
  kt2: [
    {
      date: '1 Feb 1960',
      title: 'Greensboro Lunch Counter Sit-Ins',
      desc: "Four Black students refuse to leave segregated Woolworth's counter, sparking a movement across 50 cities and founding SNCC.",
      ref: '2.1',
    },
    {
      date: '4 May 1961',
      title: 'CORE Freedom Rides & Anniston Bus Bombing',
      desc: 'Interracial activists test transit desegregation; KK mob firebombs bus in Alabama, forcing federal protection.',
      ref: '2.1',
    },
    {
      date: '30 Sept 1962',
      title: 'James Meredith & Battle of Ole Miss',
      desc: 'Federal troops escort Meredith to enroll at University of Mississippi after Governor Barnett incites lethal riots.',
      ref: '2.1',
    },
    {
      date: '3 May 1963',
      title: "Project C & The Children's Crusade in Birmingham",
      desc: 'Bull Connor turns high-pressure hoses and attack dogs on child marchers; televised brutality outrages nation.',
      ref: '2.2',
    },
    {
      date: '28 Aug 1963',
      title: 'The March on Washington for Jobs and Freedom',
      desc: '250,000 demonstrators gather at Lincoln Memorial; King delivers iconic "I Have a Dream" address.',
      ref: '2.2',
    },
    {
      date: '21 June 1964',
      title: 'Freedom Summer Murders in Mississippi',
      desc: 'KKK murders civil rights workers Schwerner, Chaney, and Goodman during Black voter registration drive.',
      ref: '2.2',
    },
    {
      date: '2 July 1964',
      title: 'Civil Rights Act of 1964 Signed',
      desc: 'President Johnson signs landmark bill outlawing racial segregation in public accommodations, schools, and jobs.',
      ref: '2.2',
    },
    {
      date: '21 Feb 1965',
      title: 'Assassination of Malcolm X',
      desc: 'Former Nation of Islam leader assassinated in Harlem after adopting orthodox Sunni Islam and global solidarity.',
      ref: '2.3',
    },
    {
      date: '7 Mar 1965',
      title: '"Bloody Sunday" on the Edmund Pettus Bridge',
      desc: 'State troopers brutally attack voting rights marchers in Selma, Alabama; Johnson introduces Voting Rights Act.',
      ref: '2.2',
    },
    {
      date: '6 Aug 1965',
      title: 'Voting Rights Act of 1965 Passed',
      desc: 'Federal law bans literacy tests and deploys federal registrars, transforming Southern Black political participation.',
      ref: '2.2',
    },
    {
      date: 'Oct 1966',
      title: 'Founding of the Black Panther Party',
      desc: 'Huey Newton and Bobby Seale establish armed citizen patrols and community survival programs in Oakland.',
      ref: '2.3',
    },
    {
      date: '4 Apr 1968',
      title: 'Assassination of Martin Luther King Jr.',
      desc: 'King shot dead at Lorraine Motel in Memphis; nationwide rebellions erupt in over 100 cities, fragmenting movement.',
      ref: '2.4',
    },
  ],
  kt3: [
    {
      date: '7 May 1954',
      title: 'Fall of Dien Bien Phu & French Defeat',
      desc: 'Vietminh defeat French colonial forces, ending French Indochina and prompting US financial backing of South Vietnam.',
      ref: '3.1',
    },
    {
      date: '21 July 1954',
      title: 'Geneva Accords Partition Vietnam',
      desc: 'Vietnam temporarily divided at the 17th parallel pending 1956 national elections, which the US and Diem block.',
      ref: '3.1',
    },
    {
      date: 'Dec 1960',
      title: 'National Liberation Front (Vietcong) Formed',
      desc: 'Communist insurgent network established in South Vietnam, supported by North Vietnam via Ho Chi Minh Trail.',
      ref: '3.1',
    },
    {
      date: 'May–June 1963',
      title: "The Buddhist Crisis & Diem's Repression",
      desc: "Diem's Catholic regime bans Buddhist flags; monk Thich Quang Duc self-immolates in Saigon in protest.",
      ref: '3.1',
    },
    {
      date: '2 Nov 1963',
      title: 'Overthrow and Assassination of Ngo Dinh Diem',
      desc: 'US-backed military coup deposes Diem; South Vietnam enters period of chaotic military junta instability.',
      ref: '3.1',
    },
    {
      date: '2–4 Aug 1964',
      title: 'The Gulf of Tonkin Incident',
      desc: 'US destroyers Maddox and Turner Joy report attacks by North Vietnamese torpedo boats in disputed waters.',
      ref: '3.2',
    },
    {
      date: '7 Aug 1964',
      title: 'Congress Passes Tonkin Gulf Resolution',
      desc: 'Congress grants President Johnson authority to "take all necessary measures", providing blank check for war.',
      ref: '3.2',
    },
    {
      date: '2 Mar 1965',
      title: 'Operation Rolling Thunder Commences',
      desc: 'US Air Force begins three-year aerial bombing campaign against North Vietnam infrastructure and supply routes.',
      ref: '3.2',
    },
    {
      date: '8 Mar 1965',
      title: 'US Ground Combat Deployment at Da Nang',
      desc: '3,500 US Marines land on the beaches of Da Nang, transitioning American involvement from advisory to direct combat.',
      ref: '3.2',
    },
    {
      date: 'Nov 1965',
      title: 'Battle of the Ia Drang Valley',
      desc: 'First major clash between US air-cavalry and regular North Vietnamese PAVN forces; establishes search-and-destroy doctrine.',
      ref: '3.3',
    },
    {
      date: '30 Jan 1968',
      title: 'The Communist Tet Offensive',
      desc: 'Vietcong and PAVN launch surprise coordinated attacks on 100+ cities; shatters US claims of imminent victory.',
      ref: '3.4',
    },
    {
      date: '3 Nov 1969',
      title: 'Nixon Announces Policy of Vietnamisation',
      desc: 'President outlines withdrawal of US ground forces while transferring combat burden to the South Vietnamese ARVN.',
      ref: '3.4',
    },
  ],
  kt4: [
    {
      date: '16 Mar 1968',
      title: 'The My Lai Massacre in Son My Hamlet',
      desc: 'Charlie Company slaughters over 500 unarmed Vietnamese civilians; military cover-up exposed by Seymour Hersh in 1969.',
      ref: '4.1',
    },
    {
      date: '3 Nov 1969',
      title: 'Nixon\'s "Silent Majority" Televised Address',
      desc: 'President appeals to conservative Middle America over the heads of protesters, securing a 77% approval rating.',
      ref: '4.2',
    },
    {
      date: '1 Dec 1969',
      title: 'First Selective Service Draft Lottery',
      desc: 'First televised military draft lottery since WWII broadcast live, galvanizing collegiate resistance nationwide.',
      ref: '4.1',
    },
    {
      date: '30 Apr 1970',
      title: 'Invasion of Cambodia Announced',
      desc: 'Nixon orders US and ARVN ground troops into neutral Cambodia to destroy communist sanctuaries, sparking campus strikes.',
      ref: '4.1',
    },
    {
      date: '4 May 1970',
      title: 'The Kent State Shootings in Ohio',
      desc: 'Ohio National Guardsmen fire 67 rounds into unarmed student demonstrators, killing 4 and wounding 9.',
      ref: '4.1',
    },
    {
      date: '8 May 1970',
      title: 'The Hard Hat Riot in Lower Manhattan',
      desc: 'Construction workers assault anti-war students near Wall Street; union leaders forge alliance with Nixon administration.',
      ref: '4.2',
    },
    {
      date: 'June 1971',
      title: 'Daniel Ellsberg Leaks The Pentagon Papers',
      desc: 'Top-secret DoD history published by New York Times, exposing systematic executive deception regarding Vietnam.',
      ref: '4.1',
    },
    {
      date: '18–29 Dec 1972',
      title: 'Operation Linebacker II ("Christmas Bombings")',
      desc: 'Eleven days of B-52 carpet bombing of Hanoi and Haiphong forces North Vietnam back to the Paris negotiating table.',
      ref: '4.3',
    },
    {
      date: '27 Jan 1973',
      title: 'Signing of the Paris Peace Accords',
      desc: 'US, North Vietnam, South Vietnam, and Vietcong sign ceasefire; mandates withdrawal of all US combat troops within 60 days.',
      ref: '4.3',
    },
    {
      date: '29 Mar 1973',
      title: 'Last American Combat Troops Depart Vietnam',
      desc: 'Final US combat forces leave Saigon; 591 American POWs repatriated, leaving 150,000 North Vietnamese troops in South.',
      ref: '4.3',
    },
    {
      date: '7 Nov 1973',
      title: 'Congress Enacts the War Powers Act',
      desc: "Passed over Nixon's veto, law severely limits presidential authority to commit armed forces overseas without approval.",
      ref: '4.3',
    },
    {
      date: '30 Apr 1975',
      title: 'The Fall of Saigon to Communist Forces',
      desc: 'PAVN tanks crash through the gates of the Presidential Palace; South Vietnam surrenders unconditionally.',
      ref: '4.4',
    },
  ],
};

/**
 * Editorial Matrix for all 16 Enquiries across KT1–KT4
 */
const ENQUIRY_EDITORIAL = {
  // KEY TOPIC 1
  1.1: {
    title: 'The Position of Black Americans in the Early 1950s',
    enquiryQuestion:
      'How did the legal doctrine of "separate but equal" enforce Jim Crow segregation and systematic voter disenfranchisement across the Southern states?',
    versoSubtitle: 'Part I: Jim Crow Segregation & Systematic Voter Disenfranchisement',
    rectoSubtitle: 'Part II: Legal Defense Strategy vs CORE Direct Action',
    rectoAnchor:
      "Thurgood Marshall weaponized the 14th Amendment's Equal Protection Clause to systematically challenge state segregation laws in federal courts, laying the constitutional foundation to overturn Jim Crow.",
  },
  1.2: {
    title: 'Developments in Education: Brown v. Topeka & Little Rock Central High',
    enquiryQuestion:
      'Why did the desegregation of Southern public schools provoke massive white resistance and require federal military intervention?',
    versoSubtitle: 'Part I: The Brown Decision & Overturning "Separate but Equal"',
    rectoSubtitle: 'Part II: The Little Rock Nine & Federal Military Enforcement',
    rectoAnchor:
      'Cold War geopolitical embarrassment and state nullification compelled President Eisenhower to federalize the Arkansas National Guard, proving that the federal government would enforce desegregation decrees.',
  },
  1.3: {
    title: 'The Montgomery Bus Boycott & The Rise of Dr. Martin Luther King Jr.',
    enquiryQuestion:
      "How did 381 days of disciplined economic boycotting and non-violent direct action force the desegregation of Montgomery's public transit?",
    versoSubtitle: 'Part I: Rosa Parks, Grassroots Solidarity & The 381-Day Transit Boycott',
    rectoSubtitle: 'Part II: SCLC Mobilization, Browder v. Gayle & Supreme Court Victory',
    rectoAnchor:
      'Sustained economic leverage combined with Christian non-violent discipline starved municipal transit of revenue and established Dr. Martin Luther King Jr. as the moral vanguard of the civil rights movement.',
  },
  1.4: {
    title: 'White Resistance in the Deep South: KKK, Dixiecrats & The 1957 Civil Rights Act',
    enquiryQuestion:
      'Why did Southern white resistance harden in the late 1950s, and why was the 1957 Civil Rights Act largely ineffective?',
    versoSubtitle: "Part I: White Citizens' Councils, The Murder of Emmett Till & KKK Terror",
    rectoSubtitle: 'Part II: Congressional Filibusters & The Limitations of the 1957 Act',
    rectoAnchor:
      "Southern Dixiecrats weaponized congressional filibusters and White Citizens' Councils deployed economic terror to hollow out federal voting rights enforcement, exposing the limits of early federal legislation.",
  },

  // KEY TOPIC 2
  2.1: {
    title: 'Non-Violent Direct Action: Sit-Ins, Freedom Rides & James Meredith',
    enquiryQuestion:
      'How did student-led direct action provoke violent white backlash and force federal protection of interstate transit?',
    versoSubtitle: 'Part I: The Greensboro Lunch Counter Sit-Ins & The Birth of SNCC',
    rectoSubtitle: 'Part II: The Freedom Rides, Anniston Firebombing & Ole Miss Riots',
    rectoAnchor:
      'Non-violent activists deliberately provoked violent white extremist overreactions in full view of national media, compelling reluctant federal officials to intervene and enforce desegregation decrees.',
  },
  2.2: {
    title: 'Birmingham, The March on Washington & Landmark Legislation (1963–65)',
    enquiryQuestion:
      'How did peaceful campaigns in Birmingham and Selma directly compel the passage of the Civil Rights Act (1964) and Voting Rights Act (1965)?',
    versoSubtitle: "Part I: Project C in Birmingham, Children's Crusade & The 1963 March",
    rectoSubtitle: "Part II: Bloody Sunday in Selma, LBJ's Leverage & The Voting Rights Act",
    rectoAnchor:
      'Televised police brutality against peaceful marchers created unbearable moral pressure on Washington, allowing President Johnson to overcome Southern filibusters and dismantle legal segregation.',
  },
  2.3: {
    title: 'Black Power, Malcolm X & The Fragmentation of the Movement',
    enquiryQuestion:
      'Why did the civil rights movement fracture in the mid-1960s into the radicalism of Black Power and armed self-defense?',
    versoSubtitle: 'Part I: Malcolm X, The Nation of Islam & The Rejection of Non-Violence',
    rectoSubtitle: 'Part II: Stokely Carmichael, Black Power & The Black Panther Party',
    rectoAnchor:
      "Persistent Northern ghetto poverty and police brutality unmasked the limits of non-violence, leading disillusioned youth to embrace Malcolm X's nationalism and community self-defense.",
  },
  2.4: {
    title: 'Urban Rebellions, The Kerner Report & The Assassination of MLK',
    enquiryQuestion:
      "Why did violent rebellions erupt across American cities between 1965 and 1968, and what were the consequences of MLK's assassination?",
    versoSubtitle: 'Part I: Urban Rioting in Watts and Detroit & The 1968 Kerner Report',
    rectoSubtitle: "Part II: The Chicago Campaign, King's Assassination & Movement Legacy",
    rectoAnchor:
      'Structural racism, systemic job discrimination, and residential segregation sparked explosive urban riots; the assassination of Martin Luther King Jr. ended the heroic era of non-violent coalition politics.',
  },

  // KEY TOPIC 3
  3.1: {
    title: 'The Cold War Crucible: The Domino Theory & The Ngo Dinh Diem Regime',
    enquiryQuestion:
      'Why did the United States commit financial subsidies and military advisors to support the unpopular regime of Ngo Dinh Diem in South Vietnam?',
    versoSubtitle: "Part I: The Geneva Partition, The Domino Theory & Eisenhower's Support",
    rectoSubtitle: 'Part II: Buddhist Persecution, Strategic Hamlets & The Overthrow of Diem',
    rectoAnchor:
      'Domino Theory paranoia blinded Washington to Vietnamese nationalist aspirations, tying American prestige to a corrupt and repressive Saigon dictatorship that alienated the Buddhist peasantry.',
  },
  3.2: {
    title: 'Escalation under Johnson: The Gulf of Tonkin & Operation Rolling Thunder',
    enquiryQuestion:
      'How did the Gulf of Tonkin incident enable President Johnson to transform an advisory mission into a full-scale American ground war?',
    versoSubtitle: 'Part I: The Tonkin Incident & The Blank-Check Congressional Resolution',
    rectoSubtitle: 'Part II: Danang Beach Deployments & The Operation Rolling Thunder Air War',
    rectoAnchor:
      'Congressional authorization through the Tonkin Gulf Resolution granted the executive unchecked war powers, locking the United States into an irreversible military escalation to prevent South Vietnamese collapse.',
  },
  3.3: {
    title: 'Battlefield Asymmetry: Search & Destroy, Bombing & Vietcong Guerilla Tactics',
    enquiryQuestion:
      'Why did overwhelming American technological superiority fail to defeat the resilient guerrilla tactics of the Vietcong?',
    versoSubtitle: 'Part I: Search and Destroy Missions, Body Counts & Chemical Defoliants',
    rectoSubtitle: 'Part II: Cu Chi Tunnel Networks, Booby Traps & The Ho Chi Minh Trail',
    rectoAnchor:
      "Conventional search-and-destroy doctrine and carpet bombing alienated the rural civilian population, while the Vietcong's complex tunnel networks and Ho Chi Minh Trail supply lines neutralized US firepower.",
  },
  3.4: {
    title: "The Turning Point: The 1968 Tet Offensive & Nixon's Vietnamisation",
    enquiryQuestion:
      'Why did the 1968 Tet Offensive shatter American military optimism and compel President Nixon to pursue Vietnamisation?',
    versoSubtitle: 'Part I: The Surprise Lunar New Year Assault & The Battle for Hue',
    rectoSubtitle: "Part II: The Credibility Gap, Cronkite's Verdict & Vietnamisation",
    rectoAnchor:
      "Though a catastrophic tactical defeat for communist forces, the Tet Offensive shattered the administration's claims of impending victory, destroying domestic political support and initiating the gradual withdrawal of ground forces.",
  },

  // KEY TOPIC 4
  4.1: {
    title: 'The Living Room War, Conscription & Flashpoints of Moral Outrage',
    enquiryQuestion:
      'How did uncensored television coverage, draft inequities, and moral atrocities like My Lai fuel unstoppable domestic anti-war opposition?',
    versoSubtitle: 'Part I: Graphic Television Broadcasts & Deepening Draft Resistance',
    rectoSubtitle: 'Part II: Moral Catastrophe at My Lai & The Kent State Shootings',
    rectoAnchor:
      'Graphic television broadcasts exposed the stark divergence between official claims and battlefield carnage, transforming the anti-war movement from a student fringe into an irresistible national force.',
  },
  4.2: {
    title: 'Support for the War: Nixon\'s "Silent Majority" & The Blue-Collar Backlash',
    enquiryQuestion:
      'Why did millions of working-class and conservative Americans actively support the Vietnam War against student anti-war protesters?',
    versoSubtitle: 'Part I: Cold War Patriotism & Working-Class Resentment of Counterculture',
    rectoSubtitle: 'Part II: The 1969 Address, The Hard Hat Riot & The 1972 Landslide',
    rectoAnchor:
      'Nixon mobilized deep-seated cultural and class resentment among Middle Americans who viewed college protesters as privileged draft-dodgers, securing a populist political mandate to prolong the war.',
  },
  4.3: {
    title: 'Exit with Honour: Secret Paris Diplomacy, Christmas Bombings & 1973 Accords',
    enquiryQuestion:
      'How did secret diplomacy in Paris and ferocious aerial bombardment lead to the January 1973 Paris Peace Accords?',
    versoSubtitle: "Part I: Kissinger and Le Duc Tho's Secret Paris Breakthrough",
    rectoSubtitle: "Part II: Operation Linebacker II, Thieu's Isolation & The Final Accords",
    rectoAnchor:
      'Relentless B-52 bombing forced Hanoi back to the negotiating table, while secret diplomatic concessions allowed North Vietnamese troops to remain in the South, achieving an American exit under the guise of a "decent interval".',
  },
  4.4: {
    title: 'The Final Collapse: The Spring Offensive, Fall of Saigon & The Vietnam Legacy',
    enquiryQuestion:
      'Why did South Vietnam collapse so rapidly in 1975, and what were the decisive causes of American defeat?',
    versoSubtitle: 'Part I: The 1975 Spring Offensive & Operation Frequent Wind Evacuation',
    rectoSubtitle: 'Part II: The Fourfold Synthesis of Failure & The Vietnam Syndrome',
    rectoAnchor:
      'Congressional aid cutoffs and executive paralysis following Watergate stripped South Vietnam of air support, triggering a rapid military collapse and leaving the US deeply scarred by the enduring "Vietnam Syndrome".',
  },
};

/**
 * Builds the complete 12-page publisher HTML string for a Key Topic
 */
async function buildPublisherTextbookHtml(targetKt = 'kt1') {
  const ktLower = targetKt.toLowerCase();
  let getKtData;
  try {
    getKtData = require(`./usa_textbook_data_${ktLower}.cjs`);
  } catch (e) {
    console.error(`Failed to load data module for ${targetKt}:`, e.message);
    process.exit(1);
  }

  const ktData = getKtData({ getBase64Image });
  const { coverConfig } = ktData;
  const ktNum = coverConfig.topicNumber;
  const synopsisInfo = KT_SYNOPSES[ktLower] || KT_SYNOPSES.kt1;
  const milestones = KT_MILESTONES[ktLower] || KT_MILESTONES.kt1;

  let lessonSliceStart = 0;
  if (ktLower === 'kt2') lessonSliceStart = 4;
  else if (ktLower === 'kt3') lessonSliceStart = 8;
  else if (ktLower === 'kt4') lessonSliceStart = 12;

  const targetLessons = unitData.lessons.slice(lessonSliceStart, lessonSliceStart + 4);

  // Ingest official Pearson Edexcel Specification PDF JSON
  const officialSpecPath = path.join(
    ROOT_DIR,
    'public',
    'data',
    'specifications',
    'paper3_33_usa_conflict_home_abroad.json',
  );
  let officialSpec = null;
  let specSection = null;
  if (fs.existsSync(officialSpecPath)) {
    try {
      officialSpec = JSON.parse(fs.readFileSync(officialSpecPath, 'utf8'));
      specSection = officialSpec.sections.find(
        (s) => s.keyTopicNumber === ktNum || s.id === `key-topic-${ktNum}`,
      );
    } catch (err) {
      console.warn('Could not read official specification JSON:', err.message);
    }
  }

  // Fallback to coverConfig if spec file is unavailable
  const specTopics =
    specSection && specSection.topics && specSection.topics.length
      ? specSection.topics
      : (coverConfig.specTopics || []).map((t, idx) => ({
          number: idx + 1,
          title: t.title,
          points: t.bullets,
        }));

  // =========================================================
  // PAGE 1: Table of Contents Enquiry Directory (2x2 Grid)
  // =========================================================
  const tocCardsHtml = targetLessons
    .map((lesson, idx) => {
      const eqNum = idx + 1;
      const startP = 2 + eqNum * 2;
      const endP = startP + 1;
      const keyRef = `${ktNum}.${eqNum}`;
      const ed = ENQUIRY_EDITORIAL[keyRef] || {
        title: lesson.title.replace(/^KT\s*\d+\.\d+:\s*/i, ''),
        enquiryQuestion: lesson.enquiry || lesson.title,
        versoSubtitle: 'Part I: Context & Catalysts',
        rectoSubtitle: 'Part II: Turning Points & Consequences',
      };

      return `
      <div class="toc-enquiry-card">
        <div class="toc-card-header">
          <div class="toc-header-left">
            <span class="toc-card-badge">ENQUIRY ${ktNum}.${eqNum}</span>
            <span class="toc-card-locator">pp. ${startP}–${endP}</span>
          </div>
          <span class="toc-card-ref">Ref [${eqNum}.1]–[${eqNum}.4]</span>
        </div>
        <div class="toc-card-title">${ed.title}</div>
        <div class="toc-card-breakdown">
          <div class="toc-part-row"><span class="toc-part-pill">Part I</span> <span class="toc-part-text">${ed.versoSubtitle.replace(/^Part I:\s*/i, '')}</span></div>
          <div class="toc-part-row"><span class="toc-part-pill">Part II</span> <span class="toc-part-text">${ed.rectoSubtitle.replace(/^Part II:\s*/i, '')}</span></div>
        </div>
        <div class="toc-card-q">
          <span class="toc-q-badge">KEY QUESTION</span>
          <span class="toc-q-text">${ed.enquiryQuestion}</span>
        </div>
      </div>
    `;
    })
    .join('');

  // =========================================================
  // PAGE 2: Official Pearson Specification Full-Page Directory
  // =========================================================
  const specBandsHtml = specTopics
    .map((topic, tIdx) => {
      const eqNum = tIdx + 1;
      const startP = 2 + eqNum * 2;
      const endP = startP + 1;
      const cleanTitle = topic.title.replace(/^\d+\.\s*/, '').trim();

      const bulletsHtml = topic.points
        .map((pt) => `<li class="spec-band-bullet">${formatMarkdown(pt)}</li>`)
        .join('');

      return `
      <div class="spec-full-band">
        <div class="spec-band-left">
          <div class="spec-band-badges">
            <span class="spec-band-num">SUBTOPIC ${ktNum}.${eqNum}</span>
            <span class="spec-band-locator">pp. ${startP}–${endP} &bull; Ref [${eqNum}.1]–[${eqNum}.4]</span>
          </div>
          <h3 class="spec-band-title">${cleanTitle}</h3>
        </div>
        <div class="spec-band-right">
          <ul class="spec-band-list">
            ${bulletsHtml}
          </ul>
        </div>
      </div>
    `;
    })
    .join('');

  // =========================================================
  // PAGE 3: Master Chronological Milestone Spine
  // =========================================================
  const milestoneSpineHtml = milestones
    .map((m) => {
      return `
      <div class="spine-item">
        <div class="spine-date-badge">${m.date}</div>
        <div class="spine-dot"></div>
        <div class="spine-content">
          <div class="spine-title-row">
            <span class="spine-title">${m.title}</span>
            <span class="spine-ref">Ref [${m.ref}]</span>
          </div>
          <p class="spine-desc">${m.desc}</p>
        </div>
      </div>
    `;
    })
    .join('');

  // =========================================================
  // PAGES 4–11: 4 Flat Double-Page Pure Narrative Spreads
  // =========================================================
  let spreadsHtml = '';

  targetLessons.forEach((lesson, idx) => {
    const enquiryNum = idx + 1;
    const versoPage = 2 + enquiryNum * 2;
    const rectoPage = versoPage + 1;
    const keyRef = `${ktNum}.${enquiryNum}`;
    const editorial = ENQUIRY_EDITORIAL[keyRef] || {
      title: lesson.title.replace(/^KT\s*\d+\.\d+:\s*/i, ''),
      enquiryQuestion: lesson.enquiry || lesson.title,
      versoSubtitle: `Part I: Context, Catalysts & Evidence`,
      rectoSubtitle: `Part II: Turning Points & Consequences`,
      rectoAnchor: `Historical analysis examining key causal mechanisms and political turning points during this phase.`,
    };

    const enquiryNarrative =
      ktData.narratives &&
      (ktData.narratives[`enquiry${enquiryNum}`] || ktData.narratives[`enquiry${idx + 1}`]);

    let act1 = { title: 'Context & Catalyst', text: '' };
    let act2 = { title: 'Escalation & Conflict', text: '' };
    let act3 = { title: 'Turning Points & Evidence', text: '' };
    let act4 = { title: 'The Historical Verdict', text: '' };

    if (enquiryNarrative) {
      act1 = enquiryNarrative.act1 || act1;
      act2 = enquiryNarrative.act2 || act2;
      act3 = enquiryNarrative.act3 || act3;
      act4 = enquiryNarrative.act4 || act4;
    } else {
      const rawBlocks = (lesson.narrative_blocks || []).filter(
        (b) => b && b.text && b.title !== 'Consolidation Task',
      );
      if (rawBlocks.length >= 4) {
        act1 = { title: rawBlocks[0].title || rawBlocks[0].heading, text: rawBlocks[0].text };
        act2 = { title: rawBlocks[1].title || rawBlocks[1].heading, text: rawBlocks[1].text };
        act3 = { title: rawBlocks[2].title || rawBlocks[2].heading, text: rawBlocks[2].text };
        act4 = { title: rawBlocks[3].title || rawBlocks[3].heading, text: rawBlocks[3].text };
      }
    }

    const renderNarrativeBlock = (act, actIndex, secRef) => {
      const cleanTitle = (act.title || `Section ${actIndex}`)
        .replace(/^Act\s*\d+:\s*/i, '')
        .replace(/^\d+\.\s*/, '')
        .trim();

      const raw = act.text || '';
      let paras = raw
        .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n')
        .split(/\n\s*\n/)
        .map((p) => cleanProse(p))
        .filter((p) => p.length > 5 && !p.startsWith('>') && !p.includes('Lived Experience:'));

      const parasHtml = paras.map((p) => `<p class="prose-p">${formatMarkdown(p)}</p>`).join('');

      return `
        <section class="narrative-block">
          <div class="block-header">
            <span class="block-ref">[${secRef}]</span>
            <h2 class="block-title">${cleanTitle}</h2>
          </div>
          ${parasHtml}
        </section>
      `;
    };

    const versoBlocksHtml = `
      ${renderNarrativeBlock(act1, 1, `${enquiryNum}.1`)}
      ${renderNarrativeBlock(act2, 2, `${enquiryNum}.2`)}
    `;

    const rectoBlocksHtml = `
      ${renderNarrativeBlock(act3, 3, `${enquiryNum}.3`)}
      ${renderNarrativeBlock(act4, 4, `${enquiryNum}.4`)}
    `;

    spreadsHtml += `
    <!-- =========================================================
         PAGE ${versoPage} (VERSO): ENQUIRY ${ktNum}.${enquiryNum} PART I
         ========================================================= -->
    <div class="a4-page verso textbook-page" data-page="${versoPage}" id="page-${versoPage}">
      
      <header class="page-running-header">
        <span class="rh-left">THE USA, 1954&ndash;1975 (OPTION 33) &bull; KEY TOPIC ${ktNum}</span>
        <span class="rh-right">ENQUIRY ${ktNum}.${enquiryNum} &bull; PART I</span>
      </header>

      <div class="enquiry-title-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-badge">KEY TOPIC ${ktNum} &bull; ENQUIRY ${enquiryNum} OF 4</span>
          <span class="enquiry-subtitle-tag">${editorial.versoSubtitle}</span>
        </div>
        <h1 class="enquiry-main-title">${editorial.title}</h1>
        <div class="enquiry-question-box">
          <span class="eq-badge">KEY ENQUIRY QUESTION</span>
          <span class="eq-text">${editorial.enquiryQuestion}</span>
        </div>
      </div>

      <div class="prose-body">
        <div class="prose-columns">
          ${versoBlocksHtml}
        </div>
      </div>

      <footer class="page-running-footer">
        <span>The USA, 1954&ndash;75: Conflict at Home &amp; Abroad &bull; Key Topic ${ktNum}: ${coverConfig.title.replace(/^KEY TOPIC \d+:\s*/i, '')}</span>
        <span class="page-num">${versoPage}</span>
      </footer>

    </div>

    <!-- =========================================================
         PAGE ${rectoPage} (RECTO): ENQUIRY ${ktNum}.${enquiryNum} PART II
         ========================================================= -->
    <div class="a4-page recto textbook-page" data-page="${rectoPage}" id="page-${rectoPage}">
      
      <header class="page-running-header">
        <span class="rh-left">THE USA, 1954&ndash;1975: CONFLICT AT HOME AND ABROAD</span>
        <span class="rh-right">ENQUIRY ${ktNum}.${enquiryNum} &bull; PART II</span>
      </header>

      <div class="recto-header-banner">
        <div class="recto-meta-row">
          <span class="recto-part-tag">ENQUIRY ${ktNum}.${enquiryNum} PART II: CLIMAX, TURNING POINTS &amp; CONSEQUENCES</span>
          <span class="recto-subhead">${editorial.rectoSubtitle}</span>
        </div>
        <div class="recto-anchor-box">
          <span class="anchor-badge">DECISIVE HISTORICAL MECHANISM</span>
          <span class="anchor-text">${editorial.rectoAnchor}</span>
        </div>
      </div>

      <div class="prose-body">
        <div class="prose-columns">
          ${rectoBlocksHtml}
        </div>
      </div>

      <footer class="page-running-footer">
        <span>The USA, 1954&ndash;75: Conflict at Home &amp; Abroad &bull; Key Topic ${ktNum}: ${coverConfig.title.replace(/^KEY TOPIC \d+:\s*/i, '')}</span>
        <span class="page-num">${rectoPage}</span>
      </footer>

    </div>
    `;
  });

  // =========================================================
  // PAGE 12: Master Knowledge Retrieval Quiz (Back Cover)
  // =========================================================
  let globalQNum = 1;
  const quizCardsHtml = targetLessons
    .map((lesson, lIdx) => {
      const eqNum = lIdx + 1;
      const startPage = 2 + eqNum * 2;
      const endPage = startPage + 1;
      const qs = (lesson.quiz || []).slice(0, 10);
      const editorial = ENQUIRY_EDITORIAL[`${ktNum}.${eqNum}`] || { title: lesson.title };

      const qItemsHtml = qs
        .map((q) => {
          const num = globalQNum++;
          const qText = q.question || q.prompt || '';
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
            <span class="quiz-badge">ENQUIRY ${ktNum}.${eqNum}</span>
            <span class="quiz-title">${editorial.title}</span>
          </div>
          <span class="quiz-locator">pp. ${startP(startPage, endPage)} &bull; Ref [${eqNum}.1]–[${eqNum}.4]</span>
        </div>
        <div class="quiz-items-wrap">
          ${qItemsHtml}
        </div>
      </div>
    `;
    })
    .join('');

  function startP(s, e) {
    return `${s}–${e}`;
  }

  const coverImgData = getBase64Image(coverConfig.coverImage);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>The USA, 1954–75: Conflict at Home and Abroad — Key Topic ${ktNum} Master Textbook</title>
  <meta name="description" content="Pearson Edexcel GCSE History Option 33: Key Topic ${ktNum} Master Textbook. Exactly 12 pages." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-display: 'Cinzel', Georgia, serif;
      --font-body: 'Lora', Georgia, serif;
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-quote: 'Playfair Display', Georgia, serif;
      --navy-deep: #0f172a;
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

    .textbook-book-container {
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
      .textbook-book-container { gap: 0; }
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
      font-size: 6.8pt;
      font-weight: 700;
      color: var(--ink-muted);
      letter-spacing: 0.08em;
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
      font-size: 6.8pt;
      color: var(--ink-muted);
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
      padding: 12mm 16mm 10mm 16mm;
    }
    .cover-top-masthead {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 1.8mm;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    .cover-title-group {
      text-align: center;
      margin-top: 2mm;
      margin-bottom: 2mm;
    }
    .cover-date-pill {
      display: inline-block;
      background: var(--crimson-accent);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 7.4pt;
      font-weight: 800;
      letter-spacing: 0.15em;
      padding: 2px 10px;
      border-radius: 3px;
      margin-bottom: 1.5mm;
      text-transform: uppercase;
    }
    .cover-title-group h1 {
      font-family: var(--font-display);
      font-size: 21pt;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: 0.04em;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 1mm;
    }
    .cover-title-group p {
      font-family: var(--font-body);
      font-style: italic;
      font-size: 9.2pt;
      color: #cbd5e1;
    }

    .cover-hero-row {
      display: grid;
      grid-template-columns: 88mm 1fr;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 3.5mm;
    }
    .cover-hero-artwork-frame {
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      overflow: hidden;
      background: #000000;
    }
    .cover-hero-img-box {
      width: 88mm;
      height: 78mm;
      overflow: hidden;
    }
    .cover-hero-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .cover-hero-caption {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      color: #94a3b8;
      background: #0b1329;
      padding: 3.5px 6px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-style: italic;
    }

    .cover-synopsis-card {
      background: #fdfbf7;
      color: #1e293b;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    .cover-synopsis-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    .cover-synopsis-badge {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 800;
      color: #1e3a8a;
      background: rgba(30, 58, 138, 0.08);
      border: 1px solid rgba(30, 58, 138, 0.2);
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .cover-synopsis-tag {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .cover-synopsis-quote {
      font-family: var(--font-quote);
      font-size: 9.0pt;
      line-height: 1.48;
      color: #1e293b;
      font-style: italic;
      text-align: justify;
      margin: 0;
    }

    /* Table of Contents Enquiry Directory (Page 1) */
    .cover-toc-box {
      background: #ffffff;
      color: #0f172a;
      border-radius: 4px;
      padding: 7px 10px 6px 10px;
      margin-bottom: 2mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      min-height: 0;
    }
    .cover-toc-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid var(--navy-deep);
      padding-bottom: 3px;
      margin-bottom: 6px;
    }
    .cover-toc-header-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .cover-toc-badge {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .cover-toc-subhead {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: #334155;
    }
    .cover-toc-tag {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 700;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-toc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 7px;
      flex: 1;
      min-height: 0;
    }
    .toc-enquiry-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid var(--navy-deep);
      border-radius: 3px;
      padding: 5px 8px 4px 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }
    .toc-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }
    .toc-header-left {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .toc-card-badge {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .toc-card-locator {
      font-family: var(--font-sans);
      font-size: 5.4pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 1px 4px;
      border-radius: 2px;
      white-space: nowrap;
    }
    .toc-card-ref {
      font-family: var(--font-sans);
      font-size: 5.2pt;
      font-weight: 700;
      color: #64748b;
    }
    .toc-card-title {
      font-family: var(--font-sans);
      font-size: 7.0pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.16;
      margin-top: 1px;
      margin-bottom: 2px;
    }
    .toc-card-breakdown {
      display: flex;
      flex-direction: column;
      gap: 1.5px;
      margin-bottom: 2px;
    }
    .toc-part-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
      font-family: var(--font-sans);
      font-size: 5.6pt;
      line-height: 1.18;
      color: #334155;
    }
    .toc-part-pill {
      font-size: 4.8pt;
      font-weight: 800;
      color: #1e3a8a;
      background: rgba(30, 58, 138, 0.08);
      border: 0.8px solid rgba(30, 58, 138, 0.2);
      padding: 0.5px 3px;
      border-radius: 2px;
      text-transform: uppercase;
      flex-shrink: 0;
    }
    .toc-part-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .toc-card-q {
      background: #f1f5f9;
      border-left: 2.5px solid var(--blue-accent);
      border-radius: 2px;
      padding: 2.5px 5px;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .toc-q-badge {
      font-family: var(--font-sans);
      font-size: 4.8pt;
      font-weight: 800;
      color: var(--blue-accent);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .toc-q-text {
      font-family: var(--font-body);
      font-size: 5.8pt;
      line-height: 1.20;
      color: #1e293b;
      font-style: italic;
    }
    .cover-footer-meta {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 1.5mm;
      font-family: var(--font-sans);
      font-size: 6pt;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* =========================================================
       PAGE 2: DEDICATED PEARSON SPECIFICATION DIRECTORY
       ========================================================= */
    .spec-page {
      background: #ffffff;
      padding: 12mm 16mm 10mm 16mm;
    }
    .spec-page-header {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 2mm;
      margin-bottom: 2.5mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .spec-page-header h2 {
      font-family: var(--font-display);
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .spec-page-header p {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }
    .spec-page-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .exam-arch-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid var(--blue-accent);
      border-radius: 3px;
      padding: 2.5mm 3.5mm;
      margin-bottom: 3.0mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-family: var(--font-sans);
    }
    .eac-item {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .eac-label {
      font-size: 5.6pt;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .eac-val {
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--navy-deep);
    }
    .spec-page-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
      margin-bottom: 2mm;
    }
    .spec-bands-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 2.2mm;
      min-height: 0;
      margin-top: 1.5mm;
      margin-bottom: 2.0mm;
    }
    .spec-full-band {
      flex: 1;
      min-height: 0;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid var(--crimson-accent);
      border-radius: 3px;
      padding: 6px 10px;
      display: grid;
      grid-template-columns: 54mm 1fr;
      gap: 10px;
      align-items: center;
    }
    .spec-band-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
      border-right: 1px solid #cbd5e1;
      padding-right: 8px;
    }
    .spec-band-badges {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
    }
    .spec-band-num {
      font-family: var(--font-sans);
      font-size: 5.8pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .spec-band-locator {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 700;
      color: #64748b;
    }
    .spec-band-title {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.18;
      margin-top: 1px;
    }
    .spec-band-list {
      list-style-type: disc;
      padding-left: 14px;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 2.5px;
    }
    .spec-band-bullet {
      font-family: var(--font-sans);
      font-size: 7.0pt;
      line-height: 1.32;
      color: #334155;
    }
    .spec-band-bullet strong {
      color: #0f172a;
      font-weight: 700;
    }
    .spec-exam-matrix {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 3px solid var(--navy-deep);
      border-radius: 3px;
      padding: 5px 9px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 1.5mm;
    }
    .sem-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2.5px;
    }
    .sem-title {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .sem-badge {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 1px 4px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .sem-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .sem-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .sem-col-heading {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 0.8px solid #e2e8f0;
      padding-bottom: 1px;
      margin-bottom: 1px;
    }
    .sem-row {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      line-height: 1.22;
      color: #334155;
    }
    .sem-row strong {
      color: #0f172a;
      font-weight: 700;
    }

    /* =========================================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
       ========================================================= */
    .spine-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 2mm;
      margin-bottom: 2.8mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .spine-header-strip h2 {
      font-family: var(--font-display);
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .spine-header-strip p {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }
    .spine-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .spine-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      margin-bottom: 2mm;
    }
    .spine-container::before {
      content: '';
      position: absolute;
      left: 19mm;
      top: 5px;
      bottom: 5px;
      width: 1.5px;
      background: #cbd5e1;
      z-index: 1;
    }
    .spine-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      position: relative;
      z-index: 2;
    }
    .spine-date-badge {
      width: 19mm;
      text-align: right;
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 800;
      color: var(--navy-deep);
      padding-top: 1px;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .spine-dot {
      width: 7px;
      height: 7px;
      background: #ffffff;
      border: 2px solid var(--crimson-accent);
      border-radius: 50%;
      margin-top: 3px;
      flex-shrink: 0;
      box-shadow: 0 0 0 2px #ffffff;
    }
    .spine-content {
      flex: 1;
      background: #f8fafc;
      border-left: 2.5px solid var(--navy-deep);
      padding: 3px 7px;
      border-radius: 2px;
      border-top: 1px solid #f1f5f9;
      border-right: 1px solid #f1f5f9;
      border-bottom: 1px solid #f1f5f9;
    }
    .spine-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 4px;
    }
    .spine-title {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      font-weight: 800;
      color: #0f172a;
    }
    .spine-ref {
      font-family: var(--font-sans);
      font-size: 5.8pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      white-space: nowrap;
    }
    .spine-desc {
      font-family: var(--font-body);
      font-size: 7.2pt;
      line-height: 1.25;
      color: #334155;
      margin-top: 1px;
    }

    /* =========================================================
       PAGES 4–11: NARRATIVE ENQUIRY SPREADS
       ========================================================= */
    .enquiry-title-banner {
      background: #f8fafc;
      border-left: 3.5px solid var(--crimson-accent);
      border-bottom: 1px solid #e2e8f0;
      padding: 2.2mm 3.5mm;
      margin-bottom: 3.0mm;
    }
    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }
    .enquiry-badge {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .enquiry-subtitle-tag {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 600;
      color: var(--ink-muted);
      font-style: italic;
    }
    .enquiry-main-title {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 900;
      color: var(--navy-deep);
      line-height: 1.15;
      margin-bottom: 2mm;
    }
    .enquiry-question-box {
      display: flex;
      align-items: center;
      gap: 7px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 1.8mm 3mm;
      border-radius: 3px;
    }
    .eq-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      white-space: nowrap;
      text-transform: uppercase;
    }
    .eq-text {
      font-family: var(--font-body);
      font-size: 8.8pt;
      font-style: italic;
      color: #1e293b;
      line-height: 1.25;
    }

    /* RECTO HEADER BANNER */
    .recto-header-banner {
      background: #f8fafc;
      border-left: 3.5px solid var(--navy-deep);
      border-bottom: 1px solid #e2e8f0;
      padding: 2.2mm 3.5mm;
      margin-bottom: 3.0mm;
    }
    .recto-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5mm;
    }
    .recto-part-tag {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .recto-subhead {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 600;
      color: var(--ink-muted);
      font-style: italic;
    }
    .recto-anchor-box {
      display: flex;
      align-items: baseline;
      gap: 7px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 1.8mm 3mm;
      border-radius: 3px;
    }
    .anchor-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: #7f1d1d;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      white-space: nowrap;
      text-transform: uppercase;
    }
    .anchor-text {
      font-family: var(--font-body);
      font-size: 8.4pt;
      font-style: italic;
      color: #1e293b;
      line-height: 1.25;
    }

    /* PROSE TWO-COLUMN ENGINE (Matching CME Standard) */
    .prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 0;
    }
    .prose-columns {
      column-count: 2;
      column-gap: 8mm;
      column-fill: balance;
      text-align: justify;
      hyphens: auto;
      text-justify: inter-word;
    }
    .narrative-block {
      break-inside: auto;
      margin-bottom: 9px;
    }
    .block-header {
      break-after: avoid;
      break-inside: avoid;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1.5px;
      margin-bottom: 2.5px;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 5px;
    }
    .block-ref {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }
    .block-title {
      font-family: var(--font-sans);
      font-size: 8.5pt;
      font-weight: 800;
      color: var(--ink-primary);
      width: 100%;
      margin-top: 1px;
      line-height: 1.22;
    }
    .prose-p {
      color: #1e293b;
      text-align: justify;
      hyphens: auto;
      text-justify: inter-word;
      font-size: 11.6pt;
      line-height: 1.58;
      margin-bottom: 8px;
    }
    .prose-p:last-child {
      margin-bottom: 0;
    }

    /* =========================================================
       PAGE 12: MASTER KNOWLEDGE RETRIEVAL QUIZ (BACK COVER)
       ========================================================= */
    .back-quiz-page {
      background: #ffffff;
      padding: 12mm 16mm 10mm 16mm;
    }
    .quiz-master-header {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 2mm;
      margin-bottom: 2.5mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .quiz-master-header h2 {
      font-family: var(--font-display);
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .quiz-master-header p {
      font-family: var(--font-sans);
      font-size: 7.4pt;
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
      font-size: 6.8pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .quiz-instructions-banner {
      background: #f8fafc;
      border-left: 3.5px solid var(--navy-deep);
      border-top: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      border-radius: 3px;
      padding: 2.2mm 3.5mm;
      margin-bottom: 3.2mm;
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .qib-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: #0284c7;
      padding: 1px 4.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .qib-text {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      color: #334155;
      line-height: 1.25;
    }
    .quiz-grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 3.5mm;
      flex: 1;
      min-height: 0;
      margin-bottom: 2mm;
    }
    .quiz-grid-card {
      background: #f8fafc;
      border-left: 3px solid var(--crimson-accent);
      border-top: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      border-radius: 3px;
      padding: 5px 8px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }
    .quiz-grid-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #cbd5e1;
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
      font-size: 5.8pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 0.5px 3.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .quiz-title {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--navy-deep);
    }
    .quiz-locator {
      font-family: var(--font-sans);
      font-size: 5.4pt;
      font-weight: 700;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 0.5px 3px;
      border-radius: 2px;
      white-space: nowrap;
    }
    .quiz-items-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      gap: 2px;
    }
    .quiz-item {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      line-height: 1.20;
      color: #1e293b;
    }
    .quiz-num {
      font-weight: 800;
      color: var(--crimson-accent);
      flex-shrink: 0;
      width: 13px;
    }
    .quiz-text {
      flex: 1;
    }
  </style>
</head>
<body>

  <div class="textbook-book-container">

    <!-- =========================================================
         PAGE 1: MASTER FRONT COVER
         ========================================================= -->
    <div class="a4-page front-cover textbook-page" data-page="1" id="page-1">
      
      <div class="cover-top-masthead">
        <span>THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
        <span>KEY STAGE 4 &bull; PEARSON EDEXCEL GCSE (9&ndash;1) OPTION 33</span>
      </div>

      <div class="cover-title-group">
        <div class="cover-date-pill">${synopsisInfo.dates} &bull; THE USA: CONFLICT AT HOME AND ABROAD</div>
        <h1>THE USA, 1954&ndash;1975</h1>
        <p>Key Topic ${ktNum}: ${synopsisInfo.title} (${synopsisInfo.dates})</p>
      </div>

      <div class="cover-hero-row">
        <div class="cover-hero-artwork-frame">
          <div class="cover-hero-img-box">
            ${coverImgData ? `<img src="${coverImgData}" alt="${coverConfig.caption}">` : ''}
          </div>
          <div class="cover-hero-caption">
            ${coverConfig.caption}
          </div>
        </div>

        <div class="cover-synopsis-card">
          <div class="cover-synopsis-header">
            <span class="cover-synopsis-badge">HISTORICAL OVERVIEW</span>
            <span class="cover-synopsis-tag">${synopsisInfo.dates}</span>
          </div>
          <p class="cover-synopsis-quote">
            &ldquo;${synopsisInfo.blurb.replace(/\n\n/g, '&rdquo;</p><p class="cover-synopsis-quote" style="margin-top: 4px;">&ldquo;')}&rdquo;
          </p>
        </div>
      </div>

      <!-- Table of Contents Enquiry Directory (2x2 Grid) -->
      <div class="cover-toc-box">
        <div class="cover-toc-header">
          <div class="cover-toc-header-left">
            <span class="cover-toc-badge">KEY TOPIC ${ktNum} DIRECTORY</span>
            <span class="cover-toc-subhead">Christine Counsell Disciplinary Enquiry Programme &bull; 4 Flat Double-Page Spreads</span>
          </div>
          <span class="cover-toc-tag">Four Canonical Enquiries</span>
        </div>
        <div class="cover-toc-grid">
          ${tocCardsHtml}
        </div>
      </div>

      <div class="cover-footer-meta">
        <span>The History Revision Hub &bull; Disciplinary History Textbook Standard</span>
        <span>Pearson Edexcel GCSE (9&ndash;1) Option 33 &bull; 12-Page Saddle-Stitch Edition</span>
      </div>

    </div>

    <!-- =========================================================
         PAGE 2: DEDICATED PEARSON SPECIFICATION DIRECTORY
         ========================================================= -->
    <div class="a4-page spec-page textbook-page" data-page="2" id="page-2">
      
      <header class="page-running-header">
        <span class="rh-left">PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; SPECIFICATION DIRECTORY</span>
        <span class="rh-right">OPTION 33 (1HI0/33) &bull; KEY TOPIC ${ktNum}</span>
      </header>

      <div class="page-body-full spec-page-body">
        <div class="spec-page-header">
          <div>
            <h2>Pearson Edexcel Specification Directory</h2>
            <p>Official Syllabus Content &bull; Key Topic ${ktNum}: ${synopsisInfo.title}</p>
          </div>
          <span class="spec-page-badge">Issue 6 Verbatim</span>
        </div>

        <div class="exam-arch-card">
          <div class="eac-item">
            <span class="eac-label">Paper Code &amp; Title</span>
            <span class="eac-val">1HI0/33 &bull; Paper 3 Modern Depth Study</span>
          </div>
          <div class="eac-item">
            <span class="eac-label">Assessment Tariff</span>
            <span class="eac-val">90 Mins &bull; 52 Marks Total (incl. 4 SPaG) &bull; 30% GCSE</span>
          </div>
          <div class="eac-item">
            <span class="eac-label">Exam Questions</span>
            <span class="eac-val">Section A (Inference 4m, Causation 12m) &bull; Section B (Utility 8m, Verdict 16m+4)</span>
          </div>
        </div>

        <div class="spec-bands-container">
          ${specBandsHtml}
        </div>

        <div class="spec-exam-matrix">
          <div class="sem-header">
            <span class="sem-title">Pearson Edexcel Paper 3 Examination Blueprint &amp; Question Tariff</span>
            <span class="sem-badge">52 MARKS TOTAL &bull; 90 MINS &bull; 30% OF GCSE HISTORY</span>
          </div>
          <div class="sem-grid">
            <div class="sem-col">
              <div class="sem-col-heading">Assessment Objectives (Tariff Breakdown)</div>
              <div class="sem-row"><strong>AO1 (14m &bull; 27%):</strong> Recall, select and deploy accurate historical knowledge.</div>
              <div class="sem-row"><strong>AO2 (12m &bull; 23%):</strong> Explain and analyse causation, consequence and change.</div>
              <div class="sem-row"><strong>AO3 (8m &bull; 15%):</strong> Analyse and evaluate contemporary source utility in historical context.</div>
              <div class="sem-row"><strong>AO4 (16m &bull; 31%):</strong> Analyse, evaluate and judge differing historical interpretations.</div>
              <div class="sem-row"><strong>SPaG (4m &bull; 4%):</strong> Accurate spelling, punctuation, grammar and specialist vocabulary.</div>
            </div>
            <div class="sem-col">
              <div class="sem-col-heading">Paper 3 Question Architecture (Section A &amp; Section B)</div>
              <div class="sem-row"><strong>Section A Q1 (4m &bull; AO3):</strong> Source Inference &bull; Two supported inferences from Source A.</div>
              <div class="sem-row"><strong>Section A Q2 (12m &bull; AO1/AO2):</strong> Causation &bull; Explain why [event happened] (3 PEEL paras).</div>
              <div class="sem-row"><strong>Section B Q3(a) (8m &bull; AO3):</strong> Source Utility &bull; How useful are Sources B &amp; C (Content &amp; COP).</div>
              <div class="sem-row"><strong>Section B Q3(b&ndash;c) (8m &bull; AO4):</strong> Interpretations &bull; Main difference (4m) and reasons for difference (4m).</div>
              <div class="sem-row"><strong>Section B Q3(d) (16m+4 &bull; AO4/AO1):</strong> Interpretation Evaluation &bull; How far do you agree?</div>
            </div>
          </div>
        </div>
      </div>

      <footer class="page-running-footer">
        <span>The History Revision Hub &bull; Pearson Edexcel GCSE Option 33 &bull; Key Topic ${ktNum} Official Syllabus</span>
        <span class="page-num">2</span>
      </footer>

    </div>

    <!-- =========================================================
         PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
         ========================================================= -->
    <div class="a4-page textbook-page" data-page="3" id="page-3">
      
      <header class="page-running-header">
        <span class="rh-left">THE USA, 1954&ndash;1975 (OPTION 33) &bull; KEY TOPIC ${ktNum}</span>
        <span class="rh-right">CHRONOLOGICAL SPINE &bull; ADVANCE ORGANIZER</span>
      </header>

      <div class="spine-header-strip">
        <div>
          <h2>Key Topic ${ktNum} Milestone Spine</h2>
          <p>Ten Defining Causal Turning Points &bull; ${synopsisInfo.dates}</p>
        </div>
        <span class="spine-badge">Chronological Highway</span>
      </div>

      <div class="spine-container">
        ${milestoneSpineHtml}
      </div>

      <footer class="page-running-footer">
        <span>The USA, 1954&ndash;75: Conflict at Home &amp; Abroad &bull; Key Topic ${ktNum} Chronological Anchor</span>
        <span class="page-num">3</span>
      </footer>

    </div>

    <!-- PAGES 4–11: ENQUIRY SPREADS -->
    ${spreadsHtml}

    <!-- =========================================================
         PAGE 12: MASTER KNOWLEDGE RETRIEVAL QUIZ (BACK COVER)
         ========================================================= -->
    <div class="a4-page back-quiz-page textbook-page" data-page="12" id="page-12">
      
      <div class="quiz-master-header">
        <div>
          <h2>Master Knowledge Retrieval Quiz</h2>
          <p>40 Essential Recall Questions &bull; Key Topic ${ktNum}: ${synopsisInfo.title}</p>
        </div>
        <span class="quiz-master-badge">Partner Quiz or Solo Practice</span>
      </div>

      <div class="quiz-instructions-banner">
        <span class="qib-badge">Classroom Protocol</span>
        <span class="qib-text">
          <strong>Oral Retrieval:</strong> Work with a revision partner to test each card aloud without consulting the reading text. &bull; 
          <strong>Written Synthesis:</strong> Complete questions 1 to 40 in your revision book, referencing the paragraph anchors above each card to verify your answers.
        </span>
      </div>

      <div class="quiz-grid-container">
        ${quizCardsHtml}
      </div>

      <footer class="page-running-footer">
        <span>The History Revision Hub &bull; GCSE Option 33: The USA, 1954&ndash;1975 &bull; Key Topic ${ktNum} Master Revision</span>
        <span class="page-num">12</span>
      </footer>

    </div>

  </div>

  <script>
    // Universal in-browser adaptive layout engine (Matching CME Standard)
    function autoFitCoverBlurb() {
      const card = document.querySelector('.cover-synopsis-card');
      const quote = document.querySelector('.cover-synopsis-quote');
      if (!card || !quote) return;
      const targetHeight = 78 * 3.78; // 78mm in px (~295px)
      let bestFs = 8.5;
      let bestLh = 1.40;
      for (let fs = 8.5; fs <= 12.0; fs += 0.1) {
        const lh = (1.40 + (fs - 8.5) * 0.025).toFixed(2);
        quote.style.fontSize = fs.toFixed(1) + 'pt';
        quote.style.lineHeight = lh;
        if (card.scrollHeight <= targetHeight + 2) {
          bestFs = fs;
          bestLh = lh;
        } else {
          break;
        }
      }
      quote.style.fontSize = bestFs.toFixed(1) + 'pt';
      quote.style.lineHeight = bestLh;
    }

    function autoFitCoverEnquiries() {
      const p1 = document.querySelector('#page-1');
      const tocBox = document.querySelector('#page-1 .cover-toc-box');
      const footer = document.querySelector('#page-1 .cover-footer-meta');
      const cards = Array.from(document.querySelectorAll('#page-1 .toc-enquiry-card'));
      const titles = Array.from(document.querySelectorAll('#page-1 .toc-card-title'));
      const questions = Array.from(document.querySelectorAll('#page-1 .toc-card-q'));
      if (!p1 || !tocBox || !footer || !cards.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      let bestFs = 6.4;

      for (let fs = 6.4; fs <= 8.5; fs += 0.1) {
        titles.forEach(t => t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt');
        questions.forEach(q => q.style.fontSize = fs.toFixed(1) + 'pt');

        const maxBottom = Math.max(...cards.map(c => c.getBoundingClientRect().bottom));
        if (maxBottom <= footerTop - 8 && p1.scrollHeight <= p1.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      titles.forEach(t => t.style.fontSize = (bestFs + 0.6).toFixed(1) + 'pt');
      questions.forEach(q => q.style.fontSize = bestFs.toFixed(1) + 'pt');
    }

    function autoFitPage2Specification() {
      const p2 = document.querySelector('#page-2');
      const footer = document.querySelector('#page-2 .page-running-footer');
      const bands = Array.from(document.querySelectorAll('#page-2 .spec-full-band'));
      const bullets = Array.from(document.querySelectorAll('#page-2 .spec-band-bullet'));
      const titles = Array.from(document.querySelectorAll('#page-2 .spec-band-title'));
      const matrix = document.querySelector('#page-2 .spec-exam-matrix');
      if (!p2 || !footer || !bands.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      let bestFs = 6.8;

      for (let fs = 6.8; fs <= 8.8; fs += 0.1) {
        bullets.forEach(b => {
          b.style.fontSize = fs.toFixed(1) + 'pt';
          b.style.lineHeight = (fs * 0.18 + 0.20).toFixed(2);
        });
        titles.forEach(t => {
          t.style.fontSize = (fs + 0.4).toFixed(1) + 'pt';
        });

        const bottomElem = matrix || bands[bands.length - 1];
        if (bottomElem.getBoundingClientRect().bottom <= footerTop - 4 && p2.scrollHeight <= p2.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      bullets.forEach(b => {
        b.style.fontSize = bestFs.toFixed(1) + 'pt';
        b.style.lineHeight = (bestFs * 0.18 + 0.20).toFixed(2);
      });
      titles.forEach(t => {
        t.style.fontSize = (bestFs + 0.4).toFixed(1) + 'pt';
      });
    }

    function autoFitPage3Milestones() {
      const p3 = document.querySelector('#page-3');
      const spineContainer = document.querySelector('#page-3 .spine-container');
      const footer = document.querySelector('#page-3 .page-running-footer');
      const items = Array.from(document.querySelectorAll('#page-3 .spine-item'));
      const descs = Array.from(document.querySelectorAll('#page-3 .spine-desc'));
      const titles = Array.from(document.querySelectorAll('#page-3 .spine-title'));
      if (!p3 || !spineContainer || !footer || !items.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      let bestFs = 6.6;

      for (let fs = 6.6; fs <= 8.4; fs += 0.1) {
        descs.forEach(d => {
          d.style.fontSize = fs.toFixed(1) + 'pt';
          d.style.lineHeight = 1.25;
        });
        titles.forEach(t => {
          t.style.fontSize = (fs + 0.3).toFixed(1) + 'pt';
        });

        const maxBottom = Math.max(...items.map(it => it.getBoundingClientRect().bottom));
        if (maxBottom <= footerTop - 8 && p3.scrollHeight <= p3.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      descs.forEach(d => {
        d.style.fontSize = bestFs.toFixed(1) + 'pt';
        d.style.lineHeight = 1.25;
      });
      titles.forEach(t => {
        t.style.fontSize = (bestFs + 0.3).toFixed(1) + 'pt';
      });
    }

    function autoFitSpreadTypography() {
      document.querySelectorAll('.textbook-page').forEach(page => {
        const pageNum = parseInt(page.getAttribute('data-page'), 10);
        if (pageNum >= 4 && pageNum <= 11) {
          const prose = page.querySelector('.prose-columns');
          if (!prose) return;
          const paragraphs = Array.from(page.querySelectorAll('.prose-p'));
          const blocks = Array.from(page.querySelectorAll('.narrative-block'));
          if (!paragraphs.length) return;

          const footer = page.querySelector('.page-running-footer');
          const footerTop = footer ? footer.getBoundingClientRect().top : page.clientHeight - 30;

          // 1. Scale down if colliding or overflowing
          let currentFs = parseFloat(window.getComputedStyle(paragraphs[0]).fontSize) * 0.75;
          let currentMb = parseFloat(window.getComputedStyle(paragraphs[0]).marginBottom) || 8;
          let iterations = 0;

          while ((prose.getBoundingClientRect().bottom > footerTop - 8 || page.scrollHeight > page.clientHeight || prose.scrollWidth > prose.clientWidth + 2) && currentFs > 9.0 && iterations < 40) {
            currentFs -= 0.15;
            currentMb = Math.max(3.0, currentMb - 0.25);
            paragraphs.forEach(p => {
              p.style.fontSize = currentFs.toFixed(2) + 'pt';
              p.style.lineHeight = (currentFs * 0.130 + 0.08).toFixed(2);
              p.style.marginBottom = currentMb.toFixed(1) + 'px';
            });
            blocks.forEach(b => {
              b.style.marginBottom = Math.max(4.0, currentMb * 1.1).toFixed(1) + 'px';
            });
            iterations++;
          }

          // 2. Scale up if substantial empty space (clearance > 30px)
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

            // Apply best upward settings
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
      autoFitCoverBlurb();
      autoFitCoverEnquiries();
      autoFitPage2Specification();
      autoFitPage3Milestones();
      autoFitSpreadTypography();
    });

    window.autoFitCoverBlurb = autoFitCoverBlurb;
    window.autoFitCoverEnquiries = autoFitCoverEnquiries;
    window.autoFitPage2Specification = autoFitPage2Specification;
    window.autoFitPage3Milestones = autoFitPage3Milestones;
    window.autoFitSpreadTypography = autoFitSpreadTypography;
  </script>

</body>
</html>`;
}

/**
 * Compiles a specific Key Topic or all Key Topics
 */
async function compileUsaTextbook(targetKt = 'kt1') {
  const ktLower = targetKt.toLowerCase();
  const ktUpper = targetKt.toUpperCase();
  console.log('=============================================================');
  console.log(
    `📘 GENERATING MASTER 12-PAGE PURE NARRATIVE TEXTBOOK: The USA, 1954–75 (${ktUpper})`,
  );
  console.log('=============================================================');

  const htmlContent = await buildPublisherTextbookHtml(ktLower);
  const outDir = path.join(ROOT_DIR, 'public', 'units', 'usa');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const htmlFileName = `textbook_${ktUpper}_PUBLISHER.html`;
  const pubUnitHtmlPath = path.join(outDir, htmlFileName);
  fs.writeFileSync(pubUnitHtmlPath, htmlContent, 'utf8');

  const devUnitDir = path.join(ROOT_DIR, 'units', 'usa');
  if (!fs.existsSync(devUnitDir)) fs.mkdirSync(devUnitDir, { recursive: true });
  fs.writeFileSync(path.join(devUnitDir, `textbook_${ktUpper}.html`), htmlContent, 'utf8');

  console.log(`✅ Saved HTML: ${pubUnitHtmlPath}`);
  console.log('🖨️ Compiling PDF with Puppeteer & Auditing Space Budget...\n');

  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  await page.setContent(htmlContent, { waitUntil: ['load', 'networkidle0'], timeout: 60000 });

  // Execute in-browser auto-fit engines
  await page.evaluate(() => {
    if (window.autoFitCoverBlurb) window.autoFitCoverBlurb();
    if (window.autoFitCoverEnquiries) window.autoFitCoverEnquiries();
    if (window.autoFitPage2Specification) window.autoFitPage2Specification();
    if (window.autoFitPage3Milestones) window.autoFitPage3Milestones();
    if (window.autoFitSpreadTypography) window.autoFitSpreadTypography();
  });

  await new Promise((r) => setTimeout(r, 600));

  // Run automated reprographics and space budget audit
  const auditReport = await auditPageBudget(page, {
    pageSelector: '.textbook-page, .page, .a4-page',
    underflowThresholdPx: 25,
    minUtilizationPct: 88,
  });

  printSpaceAuditReport(auditReport, `textbook_${ktUpper}_PUBLISHER.html`);

  const pdfName = `usa_textbook_${ktUpper}_FINAL_V17.pdf`;
  const targetPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', pdfName);
  const pubUnitPdfPath = path.join(outDir, `textbook_${ktUpper}_PUBLISHER.pdf`);

  await page.pdf({
    path: targetPdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  // Mirror PDF
  fs.copyFileSync(targetPdfPath, pubUnitPdfPath);
  const publicPdfsDir = path.join(ROOT_DIR, 'public', 'pdfs', 'usa');
  if (!fs.existsSync(publicPdfsDir)) fs.mkdirSync(publicPdfsDir, { recursive: true });
  fs.copyFileSync(targetPdfPath, path.join(publicPdfsDir, pdfName));
  fs.copyFileSync(
    targetPdfPath,
    path.join(ROOT_DIR, 'public', 'pdfs', `usa_textbook_${ktUpper}_PUBLISHER.pdf`),
  );

  // High-resolution preview screenshots to verify visual quality
  const previewDir = path.join(outDir, 'previews');
  if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir, { recursive: true });
  for (const pNum of [1, 2, 3, 6, 7, 12]) {
    const el = await page.$(`#page-${pNum}`);
    if (el) {
      const shotPath = path.join(previewDir, `${ktLower}_preview_page_${pNum}.png`);
      await el.screenshot({ path: shotPath });
      console.log(`📸 Captured Page ${pNum} preview: ${shotPath}`);
    }
  }

  await browser.close();

  console.log(`✅ Compiled Master PDF: ${targetPdfPath}`);
  console.log(`✅ Mirrored to Public PDFs:`);
  console.log(`   - ${pubUnitPdfPath}`);
  console.log(`   - ${path.join(publicPdfsDir, pdfName)}`);

  return auditReport.hasErrors === false;
}

async function main() {
  const arg = (process.argv[2] || 'all').toLowerCase();
  if (arg === 'all') {
    console.log('================================================================');
    console.log('🏛️ COMPILING ALL USA 1954–75 MASTER TEXTBOOKS (KT1–KT4)');
    console.log('================================================================\n');
    await compileUsaTextbook('kt1');
    await compileUsaTextbook('kt2');
    await compileUsaTextbook('kt3');
    await compileUsaTextbook('kt4');
    console.log('\n🎉 ALL USA 1954–75 MASTER TEXTBOOKS COMPILED SUCCESSFULLY!');
  } else {
    await compileUsaTextbook(arg);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during USA textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { compileUsaTextbook, buildPublisherTextbookHtml };
