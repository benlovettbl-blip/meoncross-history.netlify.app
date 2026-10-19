/**
 * scripts/render_standard_textbook_cme_unified.cjs
 *
 * UNIFIED 28-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK COMPILER
 * Option P5: Conflict in the Middle East, 1945–1995 (Pearson Edexcel GCSE 9-1)
 *
 * Conforms strictly to the Disciplinary History Classroom Textbook Standard & GCSE Engine:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim fidelity to the live web application narrative in units/cme_new/data.js
 * - Canonical dramatic synopsis from src/unit_synopses.js in Playfair Display italic serif parchment card
 * - Exactly 28 pages (7 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1:  Master Front Cover (Hero artwork, canonical synopsis parchment card, 12-enquiry directory)
 * - Page 2:  Master Chronological Milestone Spine (15 defining turning points & causal dominoes, 1917–1995)
 * - Page 3:  Geopolitical Theater Atlas & 4 Strategic Flashpoints (Dual maps + 2x2 flashpoints grid)
 * - Pages 4–27: 12 Canonical Enquiries across 12 flat double-page spreads (Verso + Recto)
 * - Page 28: Master 60-Question Knowledge Retrieval Quiz Back Cover (6 topic cards x 10 questions)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
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
      path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'assets', path.basename(cleanPath)),
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
    return relativePath;
  } catch (err) {
    return relativePath;
  }
}

// Clean in-prose paragraph ref pills (e.g. <span class="para-ref">[1.1]</span>) and bracketed tags
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

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// Load canonical unit data from units/cme_new/data.js
function loadCmeData() {
  const dataPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');
  let raw = fs.readFileSync(dataPath, 'utf8');
  raw =
    raw
      .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
      .replace(/export\s+default\s+unitData;?/g, '')
      .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';
  return vm.runInNewContext(raw);
}

// Canonical unit synopsis from src/unit_synopses.js
const CANONICAL_SYNOPSIS =
  'Imperial promises carved across desert sand, post-Holocaust desperation, and sacred claims to the same ancient earth ignited fifty years of unrelenting conflict. From the fiery partition of the British Mandate and the 1948 War to Nasser’s defiance in the Suez Crisis, the lightning strikes of the Six-Day War, and the shock of Yom Kippur. Follow the high-stakes diplomacy and tragic human cost—from Camp David to the Oslo Accords—in the world’s most volatile geopolitical crossroads.';

// 15 Defining Turning Points & Causal Dominoes for Page 2
const MILESTONE_SPINE = [
  {
    date: 'Nov 1917',
    title: 'The Balfour Declaration & Contradictory British Pledges',
    desc: 'Foreign Secretary Balfour pledges British support for a Jewish national home, contradicting wartime Arab promises and establishing irreconcilable claims.',
    ref: '1.2',
  },
  {
    date: 'July 1946',
    title: 'The Bombing of the King David Hotel & Mandate Collapse',
    desc: 'Zionist paramilitary Irgun detonates 350kg of explosives at British military HQ in Jerusalem, killing 91 and forcing war-weary Britain to hand Palestine to the UN.',
    ref: '2.5',
  },
  {
    date: 'Nov 1947',
    title: 'UN Resolution 181: The Palestine Partition Plan',
    desc: 'The UN votes to partition Palestine into separate Jewish and Arab states with international Jerusalem; Jewish acceptance and Arab rejection trigger immediate civil war.',
    ref: '2.8',
  },
  {
    date: '14 May 1948',
    title: 'Declaration of the State of Israel & The 1948–49 War',
    desc: 'Ben-Gurion proclaims Israeli statehood as British Mandate ends; five Arab League armies invade. Israel wins military victory, expanding its territory beyond partition lines.',
    ref: '2.10–2.11',
  },
  {
    date: 'July 1950',
    title: 'The Law of Return & Demographic Surge',
    desc: 'Knesset enacts the Law of Return granting worldwide Jewish immigration rights; population doubles within four years funded by US aid and German reparations.',
    ref: '3.4',
  },
  {
    date: 'Oct–Nov 1956',
    title: 'The Suez Crisis, Sèvres Protocol & UNEF Buffer',
    desc: 'Nasser nationalises the Suez Canal; Britain, France, and Israel secretly collude to invade. US financial pressure halts the operation, establishing UNEF peacekeepers.',
    ref: '4.4–4.8',
  },
  {
    date: 'Jan 1964',
    title: 'The Cairo Summit, PLO Creation & Water Wars',
    desc: 'Arab summit establishes the PLO to represent Palestinians and attempts Jordan River diversion; Israel executes air strikes on diversion sites, escalating tension.',
    ref: '5.1',
  },
  {
    date: '5 June 1967',
    title: 'The Six-Day War & Pre-Emptive Strike (Operation Focus)',
    desc: 'Israel destroys 300+ Egyptian aircraft in three hours, going on to conquer the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights.',
    ref: '6.2–6.4',
  },
  {
    date: 'Nov 1967',
    title: 'UN Resolution 242 & The "Land for Peace" Principle',
    desc: 'The UN Security Council calls for Israeli withdrawal in exchange for recognised, secure borders, establishing the diplomatic formula for all future negotiations.',
    ref: '7.3',
  },
  {
    date: 'Sept 1970–72',
    title: 'Dawson’s Field, Black September & Munich Olympics',
    desc: 'PFLP hijackings spark the Jordan civil war and PLO expulsion to Lebanon; Black September terrorists murder eleven Israeli Olympic athletes in Munich.',
    ref: '8.2–8.3',
  },
  {
    date: '6 Oct 1973',
    title: 'The Yom Kippur Surprise Assault & OPEC Oil Embargo',
    desc: 'Surprise Egyptian and Syrian assault breaches the Bar-Lev Line on Yom Kippur; Arab oil embargo triggers global stagflation and compels US diplomatic mediation.',
    ref: '9.2–9.3',
  },
  {
    date: 'Sept 1978–79',
    title: 'The Camp David Accords & 1979 Peace Treaty',
    desc: 'President Carter brokers peace between Sadat and Begin; Israel returns Sinai to Egypt in exchange for formal recognition, shattering Arab military unity.',
    ref: '10.3–10.4',
  },
  {
    date: 'June 1982',
    title: 'Operation Peace for Galilee & The Siege of Beirut',
    desc: 'Sharon orders invasion of Lebanon to expel the PLO; ends in Phalangist massacres at Sabra and Shatila, international outrage, and Sharon’s political removal.',
    ref: '11.2–11.3',
  },
  {
    date: 'Dec 1987–88',
    title: 'The First Intifada & The 1988 Geneva Turn',
    desc: 'Grassroots civil uprising of stone-throwing youth in Gaza and the West Bank; Arafat declares Palestinian statehood, accepts UN 242, and renounces terrorism.',
    ref: '11.3–11.4',
  },
  {
    date: '1993–1995',
    title: 'The Secret Oslo Accords, Oslo II & Rabin Assassinated',
    desc: 'Secret backchannel in Norway leads to historic Rabin-Arafat White House handshake; Oslo II divides West Bank; PM Rabin is assassinated by a Jewish extremist in Tel Aviv.',
    ref: '12.2–12.4',
  },
];

// Page 3 Strategic Atlas & 4 Strategic Flashpoints
const STRATEGIC_FLASHPOINTS = [
  {
    badge: 'FLASHPOINT 01',
    title: 'The Golan Heights & Syrian Escarpment',
    text: 'Rising 1,000 metres above the Sea of Galilee, the fortified Golan Heights gave Syrian artillery direct command over Israeli agricultural settlements in the Hula Valley. Syrian engineering attempts to divert the Jordan River headwaters triggered pre-war dogfights. In June 1967, Israeli armor scaled the escarpment, seizing the plateau to eliminate artillery threats, secure water sources, and establish early-warning listening posts overlooking Damascus.',
  },
  {
    badge: 'FLASHPOINT 02',
    title: 'The Straits of Tiran & Sharm el-Sheikh',
    text: 'The narrow maritime bottleneck at the mouth of the Gulf of Aqaba controlled maritime access to Israel’s southern port of Eilat—vital for oil shipments from Iran and trade with Asia and East Africa. In October 1956 and May 1967, Egyptian President Nasser blockaded the straits from gun batteries at Sharm el-Sheikh. Israel declared the maritime blockade an unambiguous act of war (casus belli), launching preemptive military campaigns.',
  },
  {
    badge: 'FLASHPOINT 03',
    title: 'The West Bank & Mountain Aquifers',
    text: 'Mandatory Palestine’s central mountain spine dominates Israel’s narrow coastal plain, which narrows to a mere 14 kilometres between Tel Aviv and the Green Line. Conquered in 1967 from Jordan, the West Bank provided critical military strategic depth. Crucially, the western and northeastern mountain aquifers supplied over 25% of Israel’s freshwater, making territorial control an existential economic and strategic imperative.',
  },
  {
    badge: 'FLASHPOINT 04',
    title: 'The Suez Canal & Sinai Desert Buffer',
    text: 'The 150-kilometre-wide arid Sinai desert formed a vital strategic buffer zone between Egypt and the Israeli heartland. Following the 1967 conquest, Israel constructed the fortified Bar-Lev Line along the canal bank. The canal’s closure from 1967 to 1975 disrupted global oil trade, while the 1979 Egyptian-Israeli peace treaty demilitarised the Sinai under international observation, exchanging strategic depth for diplomatic peace.',
  },
];

// Page 28 Master 60-Question Retrieval Quiz
const QUIZ_QUESTIONS = {
  card1: [
    'Which collapsing empire ruled Mandatory Palestine for 400 years until World War One?',
    'What 1916 secret Anglo-French agreement partitioned the Ottoman Middle East into spheres of influence?',
    'Which 1917 British pledge promised support for a "Jewish national home" in Palestine?',
    'What 1939 British policy document restricted Jewish immigration to 75,000 over five years?',
    'Which Zionist paramilitary group bombed the King David Hotel headquarters in July 1946?',
    'What July 1947 event caused British public outrage after three Irgun members were executed?',
    'Which British passenger ship carrying 4,500 Holocaust survivors was turned back to Europe in 1947?',
    'What UN Resolution in November 1947 proposed the partition of Palestine into two states?',
    'On what date did David Ben-Gurion proclaim the declaration of the State of Israel?',
    'What term describes the 1949 armistice ceasefire boundaries established on the island of Rhodes?',
  ],
  card2: [
    'What Arabic term, meaning "The Catastrophe", describes the mass displacement of 700,000 Palestinians?',
    'Which UN agency was established in December 1949 to provide direct relief and camps for refugees?',
    'What UN resolution recognised the conditional "right of return" for displaced Palestinian refugees?',
    'Which landmark 1950 Israeli law granted every Jewish person worldwide the right to settle in Israel?',
    'What armed national force was created on 26 May 1948 by integrating Haganah, Irgun, and Lehi?',
    'Which country supplied crucial tanks and aircraft to Israel during the 1948 war via an arms deal?',
    'What Egyptian president nationalised the Suez Canal Company on 26 July 1956?',
    'Which secret protocol brought Britain, France, and Israel together in October 1956 to plan invasion?',
    'What international peace force was deployed to the Sinai buffer zone following the Suez Crisis?',
    'Which US President threatened financial collapse to force Britain and France to withdraw from Suez?',
  ],
  card3: [
    'What was the name of Israel’s national pipeline system completed in 1964 to pump water to the Negev?',
    'Which Arab summit founded the Palestine Liberation Organisation (PLO) in January 1964?',
    'In what November 1966 cross-border raid did Israeli forces destroy dozens of homes in the West Bank?',
    'How many Syrian MiG fighter jets did the Israeli Air Force shoot down on 7 April 1967?',
    'What strategic waterway did President Nasser close to Israeli shipping on 22 May 1967?',
    'What code name was given to Israel’s surprise dawn airstrike on Egyptian airfields on 5 June 1967?',
    'Approximately how many Egyptian combat aircraft were destroyed on the ground within three hours?',
    'Which three Arab nations fought against Israel during the Six-Day War in June 1967?',
    'On what historic date did Israeli paratroopers capture the Old City of Jerusalem and the Western Wall?',
    'What fortified plateau did Israeli forces scale and conquer from Syria on 9–10 June 1967?',
  ],
  card4: [
    'Which four territories did Israel conquer during the six days of combat in June 1967?',
    'At which August 1967 Arab summit were the famous "Three Noes" of Arab diplomacy declared?',
    'What were the "Three Noes" agreed upon by Arab leaders at the Khartoum Summit in 1967?',
    'What landmark UN resolution established the diplomatic formula of "Land for Peace" in November 1967?',
    'Which Palestinian guerrilla movement, founded by Yasser Arafat, seized leadership of the PLO in 1969?',
    'At which Jordanian airstrip did the PFLP blow up three hijacked passenger jetliners in September 1970?',
    'What month-long military crackdown by King Hussein in September 1970 expelled the PLO to Lebanon?',
    'Which covert faction carried out the murder of eleven Israeli athletes at the 1972 Munich Olympics?',
    'What was the code name of the Mossad assassination campaign launched in response to Munich?',
    'What phrase did Yasser Arafat use when addressing the UN General Assembly in New York in 1974?',
  ],
  card5: [
    'What was the name of the fortified 150-kilometre sand rampart built by Israel along the Suez Canal?',
    'Which Egyptian president succeeded Gamal Abdel Nasser following his death in September 1970?',
    'On which Jewish holy day did Egyptian and Syrian forces launch a surprise attack on 6 October 1973?',
    'What Soviet weapon system initially neutralized Israeli air superiority during the Yom Kippur assault?',
    'What retaliatory economic measure did Arab OPEC members impose on nations supporting Israel in 1973?',
    'Which Israeli general led the armored counter-crossing across the Suez Canal to encircle Egypt’s Third Army?',
    'What diplomatic shuttle technique was used by US Secretary of State Henry Kissinger from 1973 to 1975?',
    'Which Israeli right-wing prime minister won the May 1977 election, ending 29 years of Labour rule?',
    'In what month and year did Anwar Sadat make his historic address to the Israeli Knesset in Jerusalem?',
    'At which US presidential retreat did Jimmy Carter broker peace between Anwar Sadat and Menachem Begin?',
  ],
  card6: [
    'In what year did Israel and Egypt sign the historic Treaty of Peace on the White House lawn?',
    'What entire territory did Israel return to Egypt in phases between 1979 and 1982 in exchange for peace?',
    'In which European capital was Israeli ambassador Shlomo Argov shot in June 1982, triggering invasion?',
    'What code name was given to Israel’s full-scale military invasion of southern Lebanon in June 1982?',
    'In which two Beirut refugee camps did Lebanese Christian Phalangists massacre Palestinian civilians?',
    'What grassroots civil uprising began in Gaza in December 1987, spreading across the West Bank?',
    'In what city did Israeli and PLO negotiators conduct 14 rounds of secret talks from January 1993?',
    'Which Israeli Prime Minister shook hands with Yasser Arafat on the White House lawn in September 1993?',
    'Under the 1995 Oslo II agreement, which area zone remained under exclusive Israeli military control?',
    'On what date was Israeli Prime Minister Yitzhak Rabin assassinated by an extremist in Tel Aviv?',
  ],
};

// Spread metadata and editorial configuration for all 12 Enquiries
const ENQUIRY_EDITORIAL = [
  {
    num: 1,
    ktCode: 'KT 1.0',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    title: 'Broken Promises & Imperial Borders: Why Was Conflict in the Middle East Inevitable?',
    shortTitle: 'Broken Promises & Imperial Borders',
    enquiryQuestion:
      'Water, Faith, and Imperial Rulers: How did physical geography and artificial borders make conflict in the Middle East inevitable?',
    versoSubtitle: 'Part I: The Collapse of the Ottoman Empire & Contradictory Imperial Pledges',
    rectoSubtitle: 'Part II: The Four Geo-Strategic Flashpoints of the Arab-Israeli Conflict',
    rectoAnchor:
      'Conflicting imperial wartime promises and artificial colonial borders established an irreconcilable territorial contest between Jewish national homeland aspirations and Arab independence.',
    densityClass: 'spread-density-medium',
  },
  {
    num: 2,
    ktCode: 'KT 1.1',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    title: 'The End of the British Mandate and the Creation of Israel, 1945–1949',
    shortTitle: 'British Mandate & Creation of Israel',
    enquiryQuestion:
      'Why did the British Mandate collapse and how was the State of Israel created amidst war?',
    versoSubtitle: 'Part I: Post-War Crisis, Insurgency & British Abandonment (1945–1947)',
    rectoSubtitle: 'Part II: UN Partition, Civil War & The 1948–49 War of Independence',
    rectoAnchor:
      'Zionist paramilitary insurgency broke British imperial resolve, while superior organizational cohesion and Czech weaponry secured Israeli military victory across the 1948–49 War.',
    densityClass: 'spread-density-medium',
  },
  {
    num: 3,
    ktCode: 'KT 1.2',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    title: 'The Aftermath of the 1948–49 War & The Palestinian Refugee Crisis',
    shortTitle: 'Aftermath of 1948 War & Refugee Crisis',
    enquiryQuestion:
      'What were the territorial, human, and geopolitical consequences of the 1948–49 War?',
    versoSubtitle: 'Part I: Al-Nakba, The Green Line & The Demographic Transformation',
    rectoSubtitle: 'Part II: State Consolidation, Border Tensions & Retaliatory Raids',
    rectoAnchor:
      'Mass refugee displacement and irreversible demographic engineering transformed an imperial dispute into an existential demographic confrontation.',
    densityClass: 'spread-density-medium',
  },
  {
    num: 4,
    ktCode: 'KT 1.3',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    title: 'Increased Tension, Nasser, and the Suez Crisis, 1955–1963',
    shortTitle: 'Increased Tension & The Suez Crisis',
    enquiryQuestion:
      'Why did the nationalisation of the Suez Canal trigger a global crisis in 1956?',
    versoSubtitle: 'Part I: Nasser’s Ascendancy, Arms Deals & The Sèvres Collusion',
    rectoSubtitle: 'Part II: The Tripartite Invasion, Superpower Ultimatum & Aftermath',
    rectoAnchor:
      'Nasser’s defiance of Anglo-French imperialism elevated Egyptian prestige, while Eisenhower’s ultimatum proved that Middle Eastern hegemony now belonged to Cold War superpowers.',
    densityClass: 'spread-density-medium',
  },
  {
    num: 5,
    ktCode: 'KT 2.1',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    title: 'The Outbreak of the Six-Day War (1964–1967)',
    shortTitle: 'Outbreak of the Six-Day War',
    enquiryQuestion:
      'How did water disputes, border raids, and escalating rhetoric make a second Arab-Israeli war inevitable?',
    versoSubtitle: 'Part I: The Arab Summit, Water Conflicts & Syrian Frontier Skirmishes',
    rectoSubtitle: 'Part II: Escalation, The Samu Raid & The Path to War',
    rectoAnchor:
      'Existential competition over Jordan River headwaters combined with aggressive fedayeen raiding and militant Syrian-Egyptian mutual defence pacts to create an unstoppable spiral into conflict.',
    densityClass: 'spread-density-light',
  },
  {
    num: 6,
    ktCode: 'KT 2.2',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    title: 'The Course of the Six-Day War (May–June 1967)',
    shortTitle: 'The Course of the Six-Day War',
    enquiryQuestion:
      'Why was the Six-Day War decided in three hours, and did Nasser intend to fight?',
    versoSubtitle: 'Part I: The May Crisis, Miscalculation & Operation Focus',
    rectoSubtitle: 'Part II: Lightning Assault Across Three Fronts & The New Map',
    rectoAnchor:
      'Total pre-emptive air dominance achieved in Operation Focus neutralized Arab numerical superiority, allowing rapid Israeli armored columns to shatter three armies on three fronts.',
    densityClass: 'spread-density-ultra-light',
  },
  {
    num: 7,
    ktCode: 'KT 2.3',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    title: 'Conquered Territories & "Land for Peace" (1967)',
    shortTitle: 'Conquered Territories & "Land for Peace"',
    enquiryQuestion:
      '"Land for Peace" or permanent stalemate: how did the 1967 conquered territories transform the conflict?',
    versoSubtitle: 'Part I: Military Occupation, The Three Noes & Khartoum Hardline',
    rectoSubtitle: 'Part II: UN Resolution 242 & The Architecture of Stalemate',
    rectoAnchor:
      'The conquest of the West Bank, Gaza, Golan, and Sinai created the diplomatic "Land for Peace" formula, but Arab refusal to recognise Israel and Israeli settlement expansion entrenched an enduring stalemate.',
    densityClass: 'spread-density-ultra-light',
  },
  {
    num: 8,
    ktCode: 'KT 2.4',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    title: 'The Rise of Palestinian Resistance: The PLO, Black September & Munich (1968–1972)',
    shortTitle: 'The Rise of Palestinian Resistance',
    enquiryQuestion:
      'How did Palestinian nationalism transform from reliance on Arab states into independent armed resistance?',
    versoSubtitle: 'Part I: Fatah Autonomy, Guerrilla War & The Jordan Crisis',
    rectoSubtitle: 'Part II: Munich Olympics Hostage Crisis & The Calculus of Terrorism',
    rectoAnchor:
      'Shattered faith in conventional Arab militaries compelled the PLO toward autonomous guerrilla warfare and spectacular international terrorism to force Palestinian identity onto the global stage.',
    densityClass: 'spread-density-ultra-light',
  },
  {
    num: 9,
    ktCode: 'KT 2.5',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    title: 'The War of Attrition & The Yom Kippur War (1969–1973)',
    shortTitle: 'War of Attrition & Yom Kippur War',
    enquiryQuestion:
      'Why did the 1973 Yom Kippur surprise attack shatter Israeli military invincibility and reshape Middle East diplomacy?',
    versoSubtitle: 'Part I: The Suez Impasse, Sadat’s Strategy & The Holy Day Assault',
    rectoSubtitle: 'Part II: Superpower Resupply, Sharon’s Counter-Offensive & The Oil Weapon',
    rectoAnchor:
      'Sadat weaponized tactical surprise and Soviet surface-to-air missiles to shatter Israeli deterrence, while the OPEC oil embargo forced the United States to prioritize direct Middle East peace mediation.',
    densityClass: 'spread-density-ultra-light',
  },
  {
    num: 10,
    ktCode: 'KT 3.1',
    ktGroup: 'KEY TOPIC 3 (1974–1995)',
    title: 'Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    shortTitle: 'Diplomatic Negotiations & Camp David',
    enquiryQuestion:
      'How did historic enemies Egypt and Israel finally achieve a lasting peace treaty?',
    versoSubtitle: 'Part I: Kissinger’s Shuttle Diplomacy, Likud Election & Sadat in Jerusalem',
    rectoSubtitle: 'Part II: The Camp David Summit, The 1979 Treaty & The Violent Backlash',
    rectoAnchor:
      'Bilateral land-for-peace diplomacy exchanged the entire Sinai Peninsula for full diplomatic recognition, neutralizing the Arab world’s strongest military at the cost of Arab unity.',
    densityClass: 'spread-density-medium',
  },
  {
    num: 11,
    ktCode: 'KT 3.2',
    ktGroup: 'KEY TOPIC 3 (1974–1995)',
    title: 'The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada, 1974–1993',
    shortTitle: 'Palestinian Issue: Lebanon & First Intifada',
    enquiryQuestion:
      'How did the First Intifada fundamentally alter the nature of the Palestinian struggle?',
    versoSubtitle: 'Part I: The Gun and Olive Branch, Operation Peace for Galilee & Beirut Siege',
    rectoSubtitle: 'Part II: Sabra & Shatila, Grassroots Rebellion & The Geneva Diplomatic Pivot',
    rectoAnchor:
      'Grassroots civil rebellion inside the occupied territories seized political leadership from exiled factions, forcing the PLO to accept UN 242 and recognize Israel to remain diplomatically relevant.',
    densityClass: 'spread-density-dense',
  },
  {
    num: 12,
    ktCode: 'KT 3.3',
    ktGroup: 'KEY TOPIC 3 (1974–1995)',
    title: 'Attempts at a Solution: From the Oslo Accords to Oslo II, 1988–1995',
    shortTitle: 'Attempts at a Solution: Oslo to Oslo II',
    enquiryQuestion:
      'Why did the Oslo Accords bring historic hope for peace, yet fail to resolve the conflict?',
    versoSubtitle: 'Part I: Post-Cold War Realignment, Madrid & The Secret Oslo Channel',
    rectoSubtitle: 'Part II: The Oslo II Matrix, Extremist Violence & Rabin’s Assassination',
    rectoAnchor:
      'Postponing explosive permanent status issues enabled an initial breakthrough, but allowed extremists on both sides to derail the peace process through terrorism, settlement growth, and assassination.',
    densityClass: 'spread-density-extra-dense',
  },
];

// Build Complete HTML document
function buildCmeHtml() {
  const unitData = loadCmeData();

  // Convert image references to Base64
  const coverImgData = getBase64Image('/images/cme_cover.jpg');
  const mapRegionalData = getBase64Image('/images/middle_east_map_cia_reference.jpg');
  const mapIsraelData = getBase64Image('/images/cme_1967_occupied_territories_cia_map.png');

  // 1. FRONT COVER (Page 1) Pearson Specification Word-For-Word Matrix
  const specPath = path.join(ROOT_DIR, 'public', 'data', 'cme_new_spec.json');
  const specData = JSON.parse(fs.readFileSync(specPath, 'utf8'));

  const topicLocators = {
    'key-topic-1': ['Enquiries 1–2 • pp. 4–7', 'Enquiry 3 • pp. 8–9', 'Enquiry 4 • pp. 10–11'],
    'key-topic-2': [
      'Enquiries 5–6 • pp. 12–15',
      'Enquiries 7–8 • pp. 16–19',
      'Enquiry 9 • pp. 20–21',
    ],
    'key-topic-3': ['Enquiry 10 • pp. 22–23', 'Enquiry 11 • pp. 24–25', 'Enquiry 12 • pp. 26–27'],
  };

  const specColumnsHtml = specData.sections
    .map((section, sIdx) => {
      const locators = topicLocators[section.id] || [];
      const subtopicsHtml = section.topics
        .map((t, tIdx) => {
          const loc = locators[tIdx] || '';
          const pointsHtml = t.points
            .map((p) => {
              const formatted = formatMarkdown(p);
              return `<li class="spec-point-item">${formatted}</li>`;
            })
            .join('');

          return `
        <div class="spec-subtopic">
          <div class="spec-subtopic-head">
            <span class="spec-subtopic-title">${t.title}</span>
            <span class="spec-subtopic-locator">${loc}</span>
          </div>
          <ul class="spec-point-list">
            ${pointsHtml}
          </ul>
        </div>
      `;
        })
        .join('');

      const shortTitle =
        sIdx === 0
          ? 'The Birth of Israel (1945–1963)'
          : sIdx === 1
            ? 'The Escalating Conflict (1964–1973)'
            : 'Attempts at a Solution (1974–1995)';

      return `
      <div class="cover-spec-col">
        <div class="spec-col-header">
          <span class="spec-col-badge">KEY TOPIC ${sIdx + 1}</span>
          <span class="spec-col-title">${shortTitle}</span>
        </div>
        <div class="spec-col-subtopics">
          ${subtopicsHtml}
        </div>
      </div>
    `;
    })
    .join('');

  // 2. MILESTONE SPINE (Page 2)
  const milestoneItemsHtml = MILESTONE_SPINE.map((m) => {
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
  }).join('');

  // 3. FLASHPOINTS (Page 3)
  const flashpointsHtml = STRATEGIC_FLASHPOINTS.map((f) => {
    return `
      <div class="fp-card">
        <div class="fp-header">
          <span class="fp-badge">${f.badge}</span>
          <h3 class="fp-title">${f.title}</h3>
        </div>
        <p class="fp-text">${f.text}</p>
      </div>
    `;
  }).join('');

  // 4. 12 ENQUIRY SPREADS (Pages 4–27)
  let spreadsHtml = '';

  ENQUIRY_EDITORIAL.forEach((config, idx) => {
    const lesson = unitData.lessons[idx];
    const num = config.num;
    const versoPage = num * 2 + 2;
    const rectoPage = versoPage + 1;

    // Filter valid narrative blocks with text
    const rawBlocks = (lesson.narrative_blocks || []).filter((b) => b.text && b.text.trim());

    // Normalize block data
    const parsedBlocks = rawBlocks.map((b, bIdx) => {
      let rawTitle = b.theme_heading || b.title || `Section ${bIdx + 1}`;
      rawTitle = rawTitle.replace(/^\d+\.\s*/, '').trim();

      let date = b.period || '';
      const dateMatch = rawTitle.match(/\(([^)]+)\)$/);
      if (dateMatch && !date) {
        date = dateMatch[1];
        rawTitle = rawTitle.replace(/\s*\([^)]+\)$/, '').trim();
      }

      // Split paragraphs
      const cleaned = cleanProse(b.text);
      const paras = cleaned
        .split(/\n\s*\n|\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      return {
        ref: `${num}.${bIdx + 1}`,
        date,
        title: rawTitle,
        paras,
        rawText: cleaned,
        rawOriginalText: b.text,
      };
    });

    // Determine Verso vs Recto block distribution
    let versoBlocks = [];
    let rectoBlocks = [];

    if (num === 1) {
      versoBlocks = parsedBlocks.slice(0, 2);
      rectoBlocks = parsedBlocks.slice(2);
    } else if (num === 2) {
      versoBlocks = parsedBlocks.slice(0, 6);
      rectoBlocks = parsedBlocks.slice(6);
    } else if (num === 3 || num === 4) {
      versoBlocks = parsedBlocks.slice(0, 4);
      rectoBlocks = parsedBlocks.slice(4);
    } else {
      versoBlocks = parsedBlocks.slice(0, 2);
      rectoBlocks = parsedBlocks.slice(2);
    }

    // Helper to render narrative block HTML
    function renderNarrativeBlock(b) {
      // Special rendering for Lesson 1 Block 3 (Flashpoints breakdown on Recto Page 5)
      if (num === 1 && b.ref === '1.3') {
        const raw = b.rawOriginalText || b.rawText || '';
        const intro = raw.split(/<ol>/i)[0].trim();
        const liMatches = [...raw.matchAll(/<li>(.*?)<\/li>/gis)].map((m) => m[1].trim());

        const subItemsHtml = liMatches
          .map((item, itemIdx) => {
            const letter = String.fromCharCode(65 + itemIdx);
            let subTitle = `Strategic Flashpoint 0${itemIdx + 1}`;
            let itemBody = item;

            const match = item.match(/^<strong>([^<]+?):?<\/strong>:?\s*(.*)$/is);
            if (match) {
              subTitle = match[1].trim();
              itemBody = match[2].trim();
            }

            return `
              <div class="flashpoint-subcard">
                <div class="subcard-header">
                  <span class="subcard-ref">[1.3${letter}]</span>
                  <h3 class="subcard-title">${subTitle}</h3>
                </div>
                <p class="prose-p">${cleanProse(itemBody)}</p>
              </div>
            `;
          })
          .join('');

        return `
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${b.ref}]</span>
              <h2 class="block-title">${b.title}</h2>
            </div>
            ${intro ? `<p class="prose-p intro-p">${cleanProse(intro)}</p>` : ''}
            <div class="flashpoints-subcard-grid">
              ${subItemsHtml}
            </div>
          </section>
        `;
      }

      return `
        <section class="narrative-block">
          <div class="block-header">
            <span class="block-ref">[${b.ref}]</span>
            ${b.date ? `<span class="block-date">${b.date}</span>` : ''}
            <h2 class="block-title">${b.title}</h2>
          </div>
          ${b.paras.map((p) => `<p class="prose-p">${formatMarkdown(p)}</p>`).join('')}
        </section>
      `;
    }

    const versoBlocksHtml = versoBlocks.map(renderNarrativeBlock).join('');
    const rectoBlocksHtml = rectoBlocks.map(renderNarrativeBlock).join('');

    spreadsHtml += `
    <!-- =========================================================
         PAGE ${versoPage} (VERSO): ENQUIRY ${String(num).padStart(2, '0')} PART I
         ========================================================= -->
    <div class="a4-page verso textbook-page ${config.densityClass}" data-page="${versoPage}" id="page-${versoPage}">
      
      <header class="page-running-header">
        <span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995) &bull; ${config.ktGroup}</span>
        <span class="rh-right">${config.ktCode} &bull; PART I</span>
      </header>

      <div class="enquiry-title-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-badge">${config.ktCode} &bull; ENQUIRY ${String(num).padStart(2, '0')} &bull; GCSE OPTION P5</span>
          <span class="enquiry-subtitle-tag">${config.versoSubtitle}</span>
        </div>
        <h1 class="enquiry-main-title">${config.title}</h1>
        <div class="enquiry-question-box">
          <span class="eq-badge">KEY ENQUIRY QUESTION</span>
          <span class="eq-text">${config.enquiryQuestion}</span>
        </div>
      </div>

      <div class="prose-body">
        <div class="prose-columns">
          ${versoBlocksHtml}
        </div>
      </div>

      <footer class="page-running-footer">
        <span>Conflict in the Middle East (1945&ndash;1995) &bull; Enquiry ${String(num).padStart(2, '0')} Part I</span>
        <span class="page-num">${versoPage}</span>
      </footer>

    </div>

    <!-- =========================================================
         PAGE ${rectoPage} (RECTO): ENQUIRY ${String(num).padStart(2, '0')} PART II
         ========================================================= -->
    <div class="a4-page recto textbook-page ${config.densityClass}" data-page="${rectoPage}" id="page-${rectoPage}">
      
      <header class="page-running-header">
        <span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995)</span>
        <span class="rh-right">${config.ktCode} &bull; PART II</span>
      </header>

      <div class="recto-header-banner">
        <div class="recto-meta-row">
          <span class="recto-part-tag">${config.ktCode} PART II: CLIMAX, TURNING POINTS &amp; CONSEQUENCES</span>
          <span class="recto-subhead">${config.rectoSubtitle}</span>
        </div>
        <div class="recto-anchor-box">
          <span class="anchor-badge">DECISIVE HISTORICAL MECHANISM</span>
          <span class="anchor-text">${config.rectoAnchor}</span>
        </div>
      </div>

      <div class="prose-body">
        <div class="prose-columns">
          ${rectoBlocksHtml}
        </div>
      </div>

      <footer class="page-running-footer">
        <span>Conflict in the Middle East (1945&ndash;1995) &bull; Enquiry ${String(num).padStart(2, '0')} Part II</span>
        <span class="page-num">${rectoPage}</span>
      </footer>

    </div>
    `;
  });

  // 5. MASTER RETRIEVAL QUIZ (Page 28)
  const cardKeys = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'];
  const cardConfigs = [
    {
      title: 'Mandate, Partition & 1948 War',
      badge: 'KT 1.0 & KT 1.1',
      locator: 'pp. 4–7 • Ref [1.1]–[2.12]',
    },
    {
      title: 'Nakba, IDF, US Aid & Suez Crisis',
      badge: 'KT 1.2 & KT 1.3',
      locator: 'pp. 8–11 • Ref [3.1]–[4.8]',
    },
    {
      title: 'Cairo Summit, Water & Six-Day War',
      badge: 'KT 2.1 & KT 2.2',
      locator: 'pp. 12–15 • Ref [5.1]–[6.4]',
    },
    {
      title: 'Conquered Lands, UN 242 & PLO',
      badge: 'KT 2.3 & KT 2.4',
      locator: 'pp. 16–19 • Ref [7.1]–[8.4]',
    },
    {
      title: 'Yom Kippur War & Camp David',
      badge: 'KT 2.5 & KT 3.1',
      locator: 'pp. 20–23 • Ref [9.1]–[10.4]',
    },
    {
      title: 'Lebanon, Intifada, Cold War & Oslo',
      badge: 'KT 3.2 & KT 3.3',
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
  <title>Conflict in the Middle East (1945–1995) — Master Classroom Textbook</title>
  <meta name="description" content="GCSE Option P5: Conflict in the Middle East (1945–1995) Pure Narrative Classroom Textbook. Exactly 28 pages." />
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
      margin-top: 1.5mm;
      margin-bottom: 1.5mm;
    }
    .cover-date-pill {
      display: inline-block;
      background: var(--crimson-accent);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.15em;
      padding: 1.5px 9px;
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
      font-size: 9.0pt;
      color: #cbd5e1;
    }

    .cover-hero-row {
      display: grid;
      grid-template-columns: 82mm 1fr;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 2.2mm;
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
      width: 82mm;
      height: 74mm;
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
      font-size: 6.0pt;
      color: #94a3b8;
      background: #0b1329;
      padding: 3px 6px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-style: italic;
    }

    /* Canonical synopsis in Playfair Display italic serif parchment card */
    .cover-synopsis-card {
      background: #fdfbf7;
      color: #1e293b;
      border-left: 4.5px solid #1e3a8a;
      border-radius: 4px;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    }
    .cover-synopsis-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 5px;
    }
    .cover-synopsis-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #1e3a8a;
      background: rgba(30, 58, 138, 0.08);
      border: 1px solid rgba(30, 58, 138, 0.2);
      padding: 1px 4px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .cover-synopsis-tag {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .cover-synopsis-quote {
      font-family: var(--font-quote);
      font-size: 8.8pt;
      line-height: 1.48;
      color: #1e293b;
      font-style: italic;
      text-align: justify;
      margin: 0;
    }

    /* Master Front Cover Specification Matrix (Word-for-Word Pearson Edexcel Option P5) */
    .cover-spec-box {
      background: #ffffff;
      color: #0f172a;
      border-radius: 4px;
      padding: 6px 10px 4px 10px;
      margin-bottom: 2mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }
    .cover-spec-header-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid var(--navy-deep);
      padding-bottom: 3px;
      margin-bottom: 5px;
    }
    .cover-spec-header-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .cover-spec-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--navy-deep);
      padding: 1px 4.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .cover-spec-subtitle {
      font-family: var(--font-sans);
      font-size: 6.5pt;
      font-weight: 700;
      color: #334155;
    }
    .cover-spec-tag {
      font-family: var(--font-sans);
      font-size: 5.8pt;
      font-weight: 700;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-spec-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      flex: 1;
      min-width: 0;
      min-height: 0;
    }
    .cover-spec-col {
      display: flex;
      flex-direction: column;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-top: 2.5px solid var(--navy-deep);
      border-radius: 3px;
      padding: 4px 6px;
      min-width: 0;
    }
    .spec-col-header {
      display: flex;
      flex-direction: column;
      gap: 1px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 3px;
    }
    .spec-col-badge {
      font-family: var(--font-sans);
      font-size: 5.4pt;
      font-weight: 800;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .spec-col-title {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      line-height: 1.15;
    }
    .spec-col-subtopics {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      justify-content: space-evenly;
    }
    .spec-subtopic {
      border-bottom: 1px dashed #e2e8f0;
      padding-bottom: 3px;
    }
    .spec-subtopic:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .spec-subtopic-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 1.5px;
    }
    .spec-subtopic-title {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.15;
    }
    .spec-subtopic-locator {
      font-family: var(--font-sans);
      font-size: 5.2pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 0.5px 3px;
      border-radius: 2px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .spec-point-list {
      list-style-type: disc;
      padding-left: 11px;
      margin: 0;
    }
    .spec-point-item {
      font-family: var(--font-sans);
      font-size: 5.4pt;
      line-height: 1.20;
      color: #334155;
      margin-bottom: 1.5px;
    }
    .spec-point-item strong {
      color: #0f172a;
      font-weight: 700;
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
       PAGE 2: MASTER CHRONOLOGICAL MILESTONE SPINE
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
    }
    .spine-container::before {
      content: '';
      position: absolute;
      left: 17mm;
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
      width: 17mm;
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
      padding: 3px 6px;
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
      font-size: 7.2pt;
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
      font-size: 7.0pt;
      line-height: 1.25;
      color: #334155;
      margin-top: 1px;
    }

    /* =========================================================
       PAGE 3: DUAL CARTOGRAPHIC THEATER & 4 FLASHPOINTS
       ========================================================= */
    .page-3-dual-maps {
      display: flex;
      flex-direction: column;
    }
    .map-header-strip {
      border-bottom: 2px solid var(--navy-deep);
      padding-bottom: 1.8mm;
      margin-bottom: 2.0mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .map-header-strip h2 {
      font-family: var(--font-display);
      font-size: 13pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .map-header-strip p {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }
    .dual-maps-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 2.5mm;
    }
    .map-card {
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
    }
    .map-card-img-box {
      width: 100%;
      height: 94mm;
      background: #ffffff;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .map-card-img-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .map-card-caption {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 600;
      color: #475569;
      padding: 3px 6px;
      background: #f1f5f9;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      line-height: 1.22;
    }
    .flashpoints-section-header {
      border-top: 1.5px solid var(--navy-deep);
      border-bottom: 1px solid #e2e8f0;
      padding: 1.5mm 0;
      margin-bottom: 2mm;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .flashpoints-section-header h3 {
      font-family: var(--font-display);
      font-size: 9.6pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .flashpoints-section-header span {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 700;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .flashpoints-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 3.5mm;
      flex: 1;
      min-height: 0;
      margin-bottom: 2mm;
    }
    .fp-card {
      background: #f8fafc;
      border-left: 3px solid var(--crimson-accent);
      border-top: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      border-radius: 3px;
      padding: 6px 10px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      box-sizing: border-box;
    }
    .fp-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    .fp-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: #b45309;
      padding: 1px 4.5px;
      border-radius: 2px;
      text-transform: uppercase;
      white-space: nowrap;
      letter-spacing: 0.04em;
    }
    .fp-title {
      font-family: var(--font-sans);
      font-size: 8.5pt;
      font-weight: 800;
      color: #7c2d12;
      line-height: 1.2;
    }
    .fp-text {
      font-family: var(--font-body);
      font-size: 8.5pt;
      line-height: 1.45;
      color: #334155;
      text-align: justify;
      flex: 1;
      margin: 0;
    }

    /* =========================================================
       NARRATIVE ENQUIRY SPREADS (Pages 4–27)
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

    /* PROSE TWO-COLUMN ENGINE (Matching Medieval England Standard) */
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
      margin-bottom: 8px;
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
    .block-date {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 600;
      color: var(--ink-muted);
      text-transform: uppercase;
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
      margin-bottom: 6px;
    }
    .prose-p:last-child {
      margin-bottom: 0;
    }

    /* Calibrated Spread Densities */
    .spread-density-ultra-light .prose-p {
      font-size: 13.0pt;
      line-height: 1.66;
      margin-bottom: 12px;
    }
    .spread-density-ultra-light .narrative-block {
      margin-bottom: 14px;
    }
    .spread-density-ultra-light .block-title {
      font-size: 9.6pt;
    }
    .spread-density-light .prose-p {
      font-size: 11.8pt;
      line-height: 1.60;
      margin-bottom: 9px;
    }
    .spread-density-medium .prose-p {
      font-size: 11.0pt;
      line-height: 1.50;
      margin-bottom: 6.5px;
    }
    .spread-density-dense .prose-p {
      font-size: 10.4pt;
      line-height: 1.44;
      margin-bottom: 5.5px;
    }
    .spread-density-extra-dense .prose-p {
      font-size: 10.15pt;
      line-height: 1.40;
      margin-bottom: 5.0px;
    }

    /* Page 5: Flashpoint sub-cards */
    .flashpoints-subcard-grid {
      margin-top: 4px;
    }
    .flashpoint-subcard {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.8px solid #2563eb;
      border-radius: 2px;
      padding: 4px 7px;
      margin-bottom: 7px;
      break-inside: avoid;
    }
    .subcard-header {
      display: flex;
      align-items: baseline;
      gap: 5px;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.5px;
    }
    .subcard-ref {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: #2563eb;
    }
    .subcard-title {
      font-family: var(--font-sans);
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
    }

    /* =========================================================
       PAGE 28: MASTER RETRIEVAL QUIZ BACK COVER
       ========================================================= */
    .back-cover {
      background: #ffffff;
      padding: 11mm 16mm 10mm 16mm;
    }
    .back-header-strip {
      border-bottom: 2.2px solid var(--crimson-accent);
      padding-bottom: 1.5mm;
      margin-bottom: 1.8mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-left h2 {
      font-family: var(--font-display);
      font-size: 14.5pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.04em;
      line-height: 1.1;
    }
    .header-left p {
      font-family: var(--font-sans);
      font-size: 7.4pt;
      color: var(--crimson-accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1.5px;
    }
    .badge-capsule {
      background: var(--navy-deep);
      color: #fff;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 3px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      display: inline-block;
    }
    .quiz-instruction-banner {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3px solid var(--navy-deep);
      padding: 1.8mm 3mm;
      margin-bottom: 2.2mm;
      font-family: var(--font-sans);
      font-size: 6.6pt;
      color: #334155;
      line-height: 1.35;
    }
    .quiz-grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5mm 3.5mm;
      flex: 1;
      align-content: space-between;
      margin-bottom: 2mm;
    }
    .quiz-grid-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid var(--navy-deep);
      border-radius: 3px;
      padding: 2.5mm 3.0mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .quiz-grid-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.2px;
      margin-bottom: 1.8px;
    }
    .quiz-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .quiz-badge {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 0.5px 3.5px;
      border-radius: 2px;
      white-space: nowrap;
    }
    .quiz-title {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
    }
    .quiz-locator {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 600;
      color: #64748b;
    }
    .quiz-items-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .quiz-item {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      font-size: 6.6pt;
      line-height: 1.22;
      color: #1e293b;
    }
    .quiz-num {
      font-family: var(--font-sans);
      font-weight: 800;
      color: var(--crimson-accent);
      width: 14px;
      flex-shrink: 0;
      text-align: right;
    }
    .quiz-text {
      flex: 1;
      font-family: var(--font-sans);
    }
    .back-colophon {
      border-top: 0.8px solid #cbd5e1;
      padding-top: 2mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--ink-muted);
    }
  </style>
</head>
<body>

  <div class="anthology-book-container">

    <!-- =========================================================
         PAGE 1: MASTER FRONT COVER
         ========================================================= -->
    <div class="a4-page front-cover cover-page textbook-page" data-page="1" id="page-1">
      <div class="cover-top-masthead">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Key Stage 4 &bull; Pearson Edexcel GCSE Option P5</span>
      </div>

      <div class="cover-title-group">
        <span class="cover-date-pill">1945 &ndash; 1995</span>
        <h1>CONFLICT IN THE MIDDLE EAST</h1>
        <p>Zionism, Arab Nationalism &amp; The Struggle for the Holy Land</p>
      </div>

      <div class="cover-hero-row">
        <div class="cover-hero-artwork-frame">
          <div class="cover-hero-img-box">
            <img src="${coverImgData}" alt="Camp David Accords Signing" />
          </div>
          <div class="cover-hero-caption">The Camp David Accords Signing &bull; White House Lawn, Washington D.C. (September 1978)</div>
        </div>

        <div class="cover-synopsis-card">
          <div class="cover-synopsis-header">
            <span class="cover-synopsis-badge">HISTORICAL OVERVIEW</span>
            <span class="cover-synopsis-tag">1945&ndash;1995</span>
          </div>
          <p class="cover-synopsis-quote">
            &ldquo;${CANONICAL_SYNOPSIS}&rdquo;
          </p>
        </div>
      </div>

      <div class="cover-spec-box">
        <div class="cover-spec-header-strip">
          <div class="cover-spec-header-left">
            <span class="cover-spec-badge">PEARSON EDEXCEL SPECIFICATION</span>
            <span class="cover-spec-subtitle">Option P5: Conflict in the Middle East, 1945&ndash;1995 &bull; Disciplinary Content Matrix</span>
          </div>
          <span class="cover-spec-tag">Official Syllabus &bull; Cross-Referenced To Enquiries</span>
        </div>
        <div class="cover-spec-grid">
          ${specColumnsHtml}
        </div>
      </div>

      <div class="cover-footer-meta">
        <span>The History Revision Hub &bull; Commercial Educational Publishing</span>
        <span>Classroom Reading Edition &bull; 100% Pure Disciplinary Narrative Architecture</span>
      </div>
    </div>

    <!-- =========================================================
         PAGE 2: CHRONOLOGICAL MILESTONE SPINE (1917–1995)
         ========================================================= -->
    <div class="a4-page textbook-page" data-page="2" id="page-2">
      <header class="page-running-header">
        <span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995)</span>
        <span class="rh-right">CHRONOLOGICAL MILESTONE SPINE &bull; 1917&ndash;1995</span>
      </header>

      <div class="spine-header-strip">
        <div>
          <h2>The Chronological Milestone Spine</h2>
          <p>15 Defining Turning Points &amp; Causal Dominoes</p>
        </div>
        <span class="spine-badge">One-Page Chronology Highway</span>
      </div>

      <div class="spine-container">
        ${milestoneItemsHtml}
      </div>

      <footer class="page-running-footer">
        <span>Conflict in the Middle East (1945&ndash;1995) &bull; Master Chronology</span>
        <span class="page-num">2</span>
      </footer>
    </div>

    <!-- =========================================================
         PAGE 3: DUAL CARTOGRAPHIC THEATER & 4 FLASHPOINTS
         ========================================================= -->
    <div class="a4-page textbook-page page-3-dual-maps" data-page="3" id="page-3">
      <header class="page-running-header">
        <span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995)</span>
        <span class="rh-right">GEOPOLITICAL THEATER ATLAS &bull; REGIONAL &amp; LOCAL PERSPECTIVES</span>
      </header>

      <div class="map-header-strip">
        <div>
          <h2>The Geopolitical Theater: Dual Cartographic Perspectives</h2>
          <p>Regional Pan-Arab Theater &amp; The Conquered Territories</p>
        </div>
        <span class="spine-badge">Strategic Atlas</span>
      </div>

      <div class="dual-maps-row">
        <div class="map-card">
          <div class="map-card-img-box">
            <img src="${mapRegionalData}" alt="Regional Theater Map" />
          </div>
          <div class="map-card-caption">Regional Pan-Arab Arena &bull; The Levant, Persian Gulf oil corridors &amp; Red Sea maritime routes.</div>
        </div>
        <div class="map-card">
          <div class="map-card-img-box">
            <img src="${mapIsraelData}" alt="Occupied Territories Map" />
          </div>
          <div class="map-card-caption">The Conquered Territories &bull; 1949 Green Line, West Bank, Gaza, Golan Heights &amp; Sinai frontier.</div>
        </div>
      </div>

      <div class="flashpoints-section-header">
        <h3>Four Defining Strategic Geopolitical Flashpoints</h3>
        <span>Topography &bull; Water &bull; Chokepoints &bull; Strategic Depth</span>
      </div>

      <div class="flashpoints-grid">
        ${flashpointsHtml}
      </div>

      <footer class="page-running-footer">
        <span>Conflict in the Middle East (1945&ndash;1995) &bull; Strategic Atlas</span>
        <span class="page-num">3</span>
      </footer>
    </div>

    <!-- PAGES 4–27: 12 ENQUIRY SPREADS -->
    ${spreadsHtml}

    <!-- =========================================================
         PAGE 28: MASTER KNOWLEDGE RETRIEVAL QUIZ (BACK COVER)
         ========================================================= -->
    <div class="a4-page back-cover textbook-page" data-page="28" id="page-28">
      <header class="page-running-header">
        <span class="rh-left">CONFLICT IN THE MIDDLE EAST (1945&ndash;1995)</span>
        <span class="rh-right">MASTER RETRIEVAL QUIZ &bull; BACK COVER</span>
      </header>

      <div class="back-header-strip">
        <div class="header-left">
          <h2>Master Knowledge Retrieval Quiz</h2>
          <p>60 Essential Recall Questions &bull; Conflict in the Middle East (1945&ndash;1995)</p>
        </div>
        <div class="badge-capsule">Partner Quiz or Solo Practice</div>
      </div>

      <div class="quiz-instruction-banner">
        <strong>Instructions:</strong> Test your mastery of the complete Middle East chronicle. Work with a study partner taking alternate cards, or self-quiz by covering the page with your revision notebook. Verify all answers using the paragraph cross-references.
      </div>

      <div class="quiz-grid-container">
        ${quizCardsHtml}
      </div>

      <div class="back-colophon">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Pearson Edexcel GCSE (9&ndash;1) Option P5 &bull; 100% Institutional Neutrality</span>
        <span class="page-num">28</span>
      </div>
    </div>

  </div>

  <script>
    function autoFitCoverBlurb() {
      const p1 = document.querySelector('#page-1');
      const card = document.querySelector('#page-1 .cover-synopsis-card');
      const quote = document.querySelector('#page-1 .cover-synopsis-quote');
      const frame = document.querySelector('#page-1 .cover-hero-artwork-frame');
      if (!p1 || !card || !quote || !frame) return;

      const targetHeight = frame.clientHeight;
      card.style.height = targetHeight + 'px';
      card.style.boxSizing = 'border-box';

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
      return { bestFs, bestLh };
    }

    function autoFitCoverSpecification() {
      const p1 = document.querySelector('#page-1');
      const specBox = document.querySelector('#page-1 .cover-spec-box');
      const footer = document.querySelector('#page-1 .cover-footer-meta');
      const cols = Array.from(document.querySelectorAll('#page-1 .cover-spec-col'));
      const items = Array.from(document.querySelectorAll('#page-1 .spec-point-item'));
      const titles = Array.from(document.querySelectorAll('#page-1 .spec-subtopic-title'));
      const colTitles = Array.from(document.querySelectorAll('#page-1 .spec-col-title'));
      if (!p1 || !specBox || !items.length || !footer || !cols.length) return;

      const footerTop = footer.getBoundingClientRect().top;
      let bestFs = 5.0;

      for (let fs = 5.0; fs <= 7.8; fs += 0.1) {
        items.forEach(it => {
          it.style.fontSize = fs.toFixed(1) + 'pt';
          it.style.lineHeight = (fs * 0.18 + 0.22).toFixed(2);
        });
        titles.forEach(t => {
          t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt';
        });
        colTitles.forEach(ct => {
          ct.style.fontSize = (fs + 1.0).toFixed(1) + 'pt';
        });
        const maxColBottom = Math.max(...cols.map(c => c.getBoundingClientRect().bottom));
        const noColOverflow = cols.every(c => c.scrollHeight <= c.clientHeight + 2);
        if (maxColBottom <= footerTop - 8 && noColOverflow && p1.scrollHeight <= p1.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }

      items.forEach(it => {
        it.style.fontSize = bestFs.toFixed(1) + 'pt';
        it.style.lineHeight = (bestFs * 0.18 + 0.22).toFixed(2);
      });
      titles.forEach(t => {
        t.style.fontSize = (bestFs + 0.6).toFixed(1) + 'pt';
      });
      colTitles.forEach(ct => {
        ct.style.fontSize = (bestFs + 1.0).toFixed(1) + 'pt';
      });
      return bestFs;
    }

    function autoFitPage3Flashpoints() {
      const p3 = document.querySelector('#page-3');
      const cards = Array.from(document.querySelectorAll('#page-3 .fp-card'));
      const footer = document.querySelector('#page-3 .page-running-footer');
      const texts = Array.from(document.querySelectorAll('#page-3 .fp-text'));
      const titles = Array.from(document.querySelectorAll('#page-3 .fp-title'));
      if (!p3 || !cards.length || !texts.length || !footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      let bestFs = 6.4;
      let bestLh = 1.28;

      for (let fs = 6.4; fs <= 9.6; fs += 0.1) {
        const lh = (1.28 + (fs - 6.4) * 0.03).toFixed(2);
        texts.forEach(t => {
          t.style.fontSize = fs.toFixed(1) + 'pt';
          t.style.lineHeight = lh;
        });
        titles.forEach(ti => {
          ti.style.fontSize = (fs + 0.5).toFixed(1) + 'pt';
        });

        let lowestCardBottom = 0;
        cards.forEach(c => {
          const b = c.getBoundingClientRect().bottom;
          if (b > lowestCardBottom) lowestCardBottom = b;
        });

        if (lowestCardBottom <= footerTop - 8 && p3.scrollHeight <= p3.clientHeight) {
          bestFs = fs;
          bestLh = lh;
        } else {
          break;
        }
      }
      texts.forEach(t => {
        t.style.fontSize = bestFs.toFixed(1) + 'pt';
        t.style.lineHeight = bestLh;
      });
      titles.forEach(ti => {
        ti.style.fontSize = (bestFs + 0.5).toFixed(1) + 'pt';
      });
      return { bestFs, bestLh };
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

          // 1. Check if colliding with footer or overflowing -> Scale DOWN until clearance >= 8
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

          // 2. If page has substantial empty space (clearance > 30px) -> Scale UP
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
      autoFitCoverSpecification();
      autoFitPage3Flashpoints();
      autoFitSpreadTypography();
    });

    window.autoFitCoverBlurb = autoFitCoverBlurb;
    window.autoFitCoverSpecification = autoFitCoverSpecification;
    window.autoFitPage3Flashpoints = autoFitPage3Flashpoints;
    window.autoFitSpreadTypography = autoFitSpreadTypography;
  </script>

</body>
</html>`;
}

async function runCmeUnified() {
  console.log('=============================================================');
  console.log('🚀 COMPILING 28-PAGE MASTER TEXTBOOK: Conflict in the Middle East (1945–1995)');
  console.log('   Ingesting 1:1 verbatim narrative directly from units/cme_new/data.js');
  console.log('=============================================================');

  const html = buildCmeHtml();

  const publicHtmlPath = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'textbook_UNIFIED.html');
  const rootHtmlPath = path.join(ROOT_DIR, 'units', 'cme_new', 'textbook_UNIFIED.html');
  const pdfFinalPath = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new_textbook_UNIFIED_FINAL.pdf');
  const pdfMirrorPath = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new_textbook.pdf');

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
    if (window.autoFitCoverBlurb) window.autoFitCoverBlurb();
    if (window.autoFitCoverSpecification) window.autoFitCoverSpecification();
    if (window.autoFitPage3Flashpoints) window.autoFitPage3Flashpoints();
    if (window.autoFitSpreadTypography) window.autoFitSpreadTypography();
  });

  // Evaluate page heights & clearance (same rigorous inspection as Medieval England)
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.textbook-page');
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
          '.prose-columns, .cover-spec-box, .spine-container, .flashpoints-grid, .quiz-grid-container',
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

  // Run auditPageBudget with standard textbook parameters (same as Medieval England)
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.textbook-page',
      underflowThresholdPx: 50,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 50,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, 'cme_new/textbook_UNIFIED.html');
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

  // Take high-resolution preview screenshots for visual quality verification
  const previewDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'previews');
  if (!fs.existsSync(previewDir)) {
    fs.mkdirSync(previewDir, { recursive: true });
  }

  const samplePages = [1, 2, 3, 4, 5, 6, 7, 14, 15, 26, 27, 28];
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
  runCmeUnified().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { buildCmeHtml, runCmeUnified };
