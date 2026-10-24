/**
 * scripts/render_cme_28page_master_textbook.cjs
 *
 * UNIFIED 28-PAGE PURE NARRATIVE CLASSROOM TEXTBOOK COMPILER
 * Option P5: Conflict in the Middle East, 1945–1995 (Pearson Edexcel GCSE 9–1)
 *
 * Conforms strictly to the Disciplinary History Classroom Textbook Standard & GCSE Master Engine:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero exam rubrics)
 * - Exact 1:1 verbatim SSoT fidelity to units/cme_new/data.js narrative_blocks (12 lessons)
 * - Exactly 28 pages (7 folded A3 sheets, saddle-stitch reprographics compatible)
 * - Page 1:  Master Front Cover (Hero artwork, archival caption, overview synopsis, 12-enquiry 2x6 directory)
 * - Page 2:  Inside Front Cover Course Specification & Disciplinary Directory (Key Topics 1–3 syllabus alignment)
 * - Page 3:  Master Chronological Milestone Spine (15 defining causal turning points, 1917–1995 - Zero Maps Standard)
 * - Pages 4–27: 12 Canonical Disciplinary Enquiries across 12 flat double-page spreads (Verso + Recto)
 *   * Key Topic 1: The Birth of the State of Israel, 1945–63 (Enquiries 1–4)
 *   * Key Topic 2: The Escalating Conflict, 1964–73 (Enquiries 5–9)
 *   * Key Topic 3: Attempts at a Solution, 1974–95 (Enquiries 10–12)
 * - Page 28: Master 60-Question Knowledge Retrieval Quiz Back Cover (6 topic cards x 10 questions)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub", zero school names)
 * - Automated in-browser auto-fit engines:
 *   * autoFitCoverSynopsis()
 *   * autoFitInsideCoverDirectory()
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

// Clean in-prose paragraph ref pills and bracketed tags
function cleanProse(text) {
  if (!text) return '';
  return text
    .replace(/\(\s*see\s+<span\s+class=["']archival-meta-tag["']>[^<]*<\/span>\s*\)/gi, '')
    .replace(/\(\s*<span\s+class=["']archival-meta-tag["']>[^<]*<\/span>\s*\)/gi, '')
    .replace(/<span\s+class=["']para-ref["']>[^<]*<\/span>\s*/gi, '')
    .replace(/<span\s+class=["']archival-meta-tag["']>[^<]*<\/span>\s*/gi, '')
    .replace(/\[\d+\.\d+\]\s*/g, '')
    .replace(/\[Key Individual:\s*([^\]]+)\]/gi, '$1')
    .replace(/([a-zA-Z])"([a-zA-Z])/g, '$1" $2')
    .replace(/\(\s*see\s*\)/gi, '')
    .replace(/\s*\(\s*\)/g, '')
    .replace(/[^\S\r\n]{2,}/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Markdown bold and italics parser
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

// 15 Defining Turning Points & Causal Dominoes for Page 3
const MILESTONE_SPINE = [
  {
    date: 'Nov 1917',
    title: 'The Balfour Declaration & Contradictory British Pledges',
    desc: 'Foreign Secretary Balfour pledges British support for a Jewish national home, contradicting wartime Arab promises and establishing irreconcilable claims.',
    ref: '1.1',
  },
  {
    date: 'July 1946',
    title: 'The Bombing of the King David Hotel & Mandate Collapse',
    desc: 'Zionist paramilitary Irgun detonates 350kg of explosives at British military HQ in Jerusalem, killing 91 and forcing war-weary Britain to hand Palestine to the UN.',
    ref: '1.5',
  },
  {
    date: 'Nov 1947',
    title: 'UN Resolution 181: The Palestine Partition Plan',
    desc: 'The UN votes to partition Palestine into separate Jewish and Arab states with international Jerusalem; Jewish acceptance and Arab rejection trigger immediate civil war.',
    ref: '2.1',
  },
  {
    date: '14 May 1948',
    title: 'Declaration of the State of Israel & The 1948–49 War',
    desc: 'Ben-Gurion proclaims Israeli statehood as British Mandate ends; five Arab League armies invade. Israel wins military victory, expanding its territory beyond partition lines.',
    ref: '2.3–2.4',
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

// Page 28 Master 60-Question Retrieval Quiz
const QUIZ_QUESTIONS = {
  card1: [
    'Which collapsing empire ruled Mandatory Palestine for 400 years until World War One?',
    'Which 1915 correspondence promised British support for Arab independence in exchange for an armed revolt?',
    'Which 1917 British pledge promised support for a "Jewish national home" in Palestine?',
    'What was the official British White Paper quota ceiling for Jewish immigration in 1939?',
    'Which Zionist paramilitary group was led by Menachem Begin?',
    'In what month and year did the Irgun bomb the King David Hotel in Jerusalem?',
    'What was the number of the November 1947 UN Partition Plan resolution?',
    'What percentage of Palestine was allocated to the Jewish state under the UN plan?',
    'On what date did David Ben-Gurion formally declare the State of Israel?',
    'Which five Arab League nations invaded Israel on 15 May 1948?',
  ],
  card2: [
    'What Arabic term meaning "catastrophe" denotes the displacement of 700,000 Palestinians in 1948?',
    'What was the popular name given to the 1949 armistice demarcation lines?',
    'Which UN agency was established in December 1949 to provide relief to Palestinian refugees?',
    'What 1950 Israeli statute granted every Jewish person worldwide the right to settle in Israel?',
    'Which Egyptian military officer led the Free Officers in overthrowing King Farouk in 1952?',
    'Which vital waterway did Nasser nationalise on 26 July 1956?',
    'At which French villa did Britain, France, and Israel secretly plan the Suez invasion?',
    'Which US President threatened financial ruin to force Britain and France out of Suez?',
    'What UN peacekeeping force was deployed to Sinai following the Suez Crisis in 1956?',
    'What political union was formed between Egypt and Syria between 1958 and 1961?',
  ],
  card3: [
    'In what city and year was the Palestine Liberation Organization (PLO) founded?',
    'Which armed guerrilla faction was founded by Yasser Arafat in 1959?',
    'What vital river water diversion project triggered clashes between Israel and Syria in 1964?',
    'Which border village in the Jordanian West Bank was raided by the IDF in November 1966?',
    'What false intelligence did the Soviet Union feed to Egypt in May 1967?',
    'Which maritime bottleneck at the mouth of Aqaba did Nasser blockade in May 1967?',
    'What was the code name of the Israeli preemptive air strike on 5 June 1967?',
    'Approximately how many Egyptian aircraft were destroyed in the first three hours of the Six-Day War?',
    'Which four territorial areas did Israel conquer during the Six-Day War?',
    'What famous three-word holy site did Israeli paratroopers capture in East Jerusalem?',
  ],
  card4: [
    'What was the number of the landmark November 1967 UN Security Council resolution?',
    'What diplomatic formula did UN Resolution 242 establish for Middle East peace?',
    'What were the "Three Noes" declared at the August 1967 Arab League summit in Khartoum?',
    'In which Jordanian town did Palestinian fedayeen resist an Israeli armored assault in 1968?',
    'Which Marxist-Leninist Palestinian faction hijacked multiple airliners to Dawson’s Field in 1970?',
    'What was the term for the civil war in September 1970 that expelled the PLO from Jordan?',
    'To which neighboring capital city did the PLO leadership relocate after expulsion from Jordan?',
    'Which Palestinian terrorist faction executed the Munich Olympics hostage attack in 1972?',
    'How many Israeli athletes and coaches were murdered during the Munich massacre?',
    'What was the code name of the Mossad covert assassination campaign targeting Munich conspirators?',
  ],
  card5: [
    'Who succeeded Gamal Abdel Nasser as President of Egypt following his death in September 1970?',
    'What heavily fortified defensive barrier did Israel construct along the east bank of the Suez Canal?',
    'On which sacred Jewish holiday did Egyptian and Syrian forces launch their surprise attack in 1973?',
    'Which Syrian president coordinated the northern offensive on the Golan Heights in 1973?',
    'Which cartel weaponized the global oil supply by imposing an oil embargo on Western nations in 1973?',
    'Which US Secretary of State conducted "shuttle diplomacy" to negotiate post-war disengagements?',
    'In what year did Egyptian President Anwar Sadat make his historic address to the Israeli Knesset?',
    'At which presidential retreat did Jimmy Carter broker the 1978 Middle East accords?',
    'Which Israeli Prime Minister signed the 1979 Egypt-Israel Peace Treaty with Sadat?',
    'What happened to Anwar Sadat during a military parade in Cairo in October 1981?',
  ],
  card6: [
    'What code name was given to the June 1982 Israeli invasion of southern Lebanon?',
    'Which Israeli Defence Minister directed the siege of West Beirut in 1982?',
    'In which two Beirut refugee camps did Lebanese Christian Phalangist militia massacre civilians in 1982?',
    'What judicial commission held Ariel Sharon indirectly responsible for the Beirut massacres?',
    'What Arabic word for "shaking off" describes the grassroots Palestinian uprising that erupted in 1987?',
    'In which refugee camp in the Gaza Strip did the First Intifada begin in December 1987?',
    'What Islamist militant movement was founded in Gaza by Sheikh Ahmed Yassin in 1987?',
    'In what Scandinavian city were secret peace talks hosted between Israeli and PLO negotiators in 1993?',
    'Where did Yitzhak Rabin and Yasser Arafat stage their historic public handshake in September 1993?',
    'In which city and month was Israeli Prime Minister Yitzhak Rabin assassinated in 1995?',
  ],
};

// 12 Canonical Disciplinary Enquiries Editorial Metadata
const ENQUIRY_EDITORIAL = [
  {
    num: 1,
    ktCode: 'KT 1.1',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    title: 'The Post-War Crisis & The Collapse of the British Mandate, 1945–1947',
    shortTitle: 'Post-War Crisis & Mandate Collapse',
    enquiryQuestion:
      'Why did British imperial control in Mandatory Palestine collapse between 1945 and 1947?',
    versoSubtitle: 'Part I: Post-War Impasse, Arab Opposition & The Insurgency (1945–1946)',
    rectoSubtitle:
      'Part II: King David Hotel, The Sergeants Affair & Mandate Surrender (1946–1947)',
    rectoAnchor:
      'Paramilitary insurgency, domestic economic exhaustion, and international outrage over Holocaust refugees rendered the British Mandate ungovernable, forcing Britain to surrender Palestine to the United Nations.',
    densityClass: 'spread-density-medium',
  },
  {
    num: 2,
    ktCode: 'KT 1.1',
    ktGroup: 'KEY TOPIC 1 (1945–1963)',
    title: 'UN Partition, Civil War & The Creation of Israel, 1947–1949',
    shortTitle: 'UN Partition & Creation of Israel',
    enquiryQuestion:
      'How was the State of Israel established and defended amidst communal civil war and international invasion?',
    versoSubtitle: 'Part I: UN Resolution 181, Communal Civil War & Plan Dalet (1947–1948)',
    rectoSubtitle:
      'Part II: Declaration of Independence, The 1948–49 War & The Green Line (1948–1949)',
    rectoAnchor:
      'Decisive international diplomacy, Zionist organizational cohesion, and vital Czech weaponry secured Israeli victory against invading Arab armies, resulting in the partition of Mandatory Palestine along the 1949 Green Line.',
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
      'The humiliation of Arab armies in 1967 compelled Palestinian fedayeen to pursue asymmetric warfare and international terrorism to force their national cause onto the global diplomatic stage.',
    densityClass: 'spread-density-medium',
  },
  {
    num: 9,
    ktCode: 'KT 2.5',
    ktGroup: 'KEY TOPIC 2 (1964–1973)',
    title: 'The War of Attrition & The Yom Kippur War (1969–1973)',
    shortTitle: 'War of Attrition & Yom Kippur War',
    enquiryQuestion:
      'How did the surprise assault on Yom Kippur shatter the myth of Israeli invincibility and transform Middle Eastern diplomacy?',
    versoSubtitle: 'Part I: The War of Attrition, The Bar-Lev Line & The Agranat Conceit',
    rectoSubtitle: 'Part II: Operation Badr, The Golan Counter-Stroke & The Oil Weapon',
    rectoAnchor:
      'Initial Arab tactical surprise breached the Bar-Lev Line and shattered Israeli strategic complacency, forcing Washington to engage in sustained shuttle diplomacy to avert superpower confrontation.',
    densityClass: 'spread-density-medium',
  },
  {
    num: 10,
    ktCode: 'KT 3.1',
    ktGroup: 'KEY TOPIC 3 (1974–1995)',
    title: 'Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    shortTitle: 'Shuttle Diplomacy to Camp David',
    enquiryQuestion:
      'How did bilateral diplomacy between Egypt and Israel achieve peace, while leaving the Palestinian issue unresolved?',
    versoSubtitle: 'Part I: Kissinger’s Step-by-Step Diplomacy & Sadat’s Historic Journey',
    rectoSubtitle: 'Part II: The Camp David Accords, The 1979 Treaty & Arab Backlash',
    rectoAnchor:
      'Sadat’s courageous bilateral gamble recovered the Sinai and neutralized Israel’s most powerful military foe, but isolated Egypt from the Arab world while postponing the unresolved core issue of Palestinian sovereignty.',
    densityClass: 'spread-density-dense',
  },
  {
    num: 11,
    ktCode: 'KT 3.2',
    ktGroup: 'KEY TOPIC 3 (1974–1995)',
    title: 'The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada, 1974–1993',
    shortTitle: 'Lebanon & The First Intifada',
    enquiryQuestion:
      'How did the trauma of the 1982 Lebanon War and the eruption of the First Intifada redefine the Palestinian struggle?',
    versoSubtitle: 'Part I: Operation Peace for Galilee, The Siege of Beirut & Sabra and Shatila',
    rectoSubtitle: 'Part II: The Iron Fist, The Stones of the Intifada & The 1988 Turn',
    rectoAnchor:
      'The devastation of the 1982 Lebanon War failed to eradicate Palestinian nationalism, which erupted from within the occupied territories in 1987 as a mass popular uprising that shattered the status quo.',
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

// Generate Inside Front Cover Specification Directory (Page 2) directly from specData (SSOT) or unitData
function generateInsideFrontCover(unitData) {
  let specData = null;
  try {
    const specPath = path.join(ROOT_DIR, 'public', 'data', 'cme_new_spec.json');
    if (fs.existsSync(specPath)) {
      specData = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    }
  } catch (e) {}

  // If specData has modular narrative blurbs defined per topic, render the 9-topic modular architecture
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
          const blurb = (t.narrative_blurb || '').replace(
            /\*\*([^*]+)\*\*/g,
            '<strong>$1</strong>',
          );

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
    'Spread 1 &bull; pp. 4–5', // 0: lesson_1_1 (KT 1.0)
    'Spread 2 &bull; pp. 6–7', // 1: lesson_1_2 (KT 1.1)
    'Spread 3 &bull; pp. 8–9', // 2: lesson_1_3 (KT 1.2)
    'Spread 4 &bull; pp. 10–11', // 3: lesson_1_4 (KT 1.3)
    'Spread 5 &bull; pp. 12–13', // 4: lesson_2_1 (KT 2.1)
    'Spread 6 &bull; pp. 14–15', // 5: lesson_2_2 (KT 2.2)
    'Spread 7 &bull; pp. 16–17', // 6: lesson_2_3 (KT 2.3)
    'Spread 8 &bull; pp. 18–19', // 7: lesson_2_4 (KT 2.4)
    'Spread 9 &bull; pp. 20–21', // 8: lesson_2_5 (KT 2.5)
    'Spread 10 &bull; pp. 22–23', // 9: lesson_3_1 (KT 3.1)
    'Spread 11 &bull; pp. 24–25', // 10: lesson_3_2 (KT 3.2)
    'Spread 12 &bull; pp. 26–27', // 11: lesson_3_3 (KT 3.3)
  ];

  const ktTitles = [
    'The Birth of the State of Israel, 1945–63',
    'The Escalating Conflict, 1964–73',
    'Attempts at a Solution, 1974–95',
  ];

  const ktLessonSlices = [
    { start: 0, count: 4, ktNum: 1 },
    { start: 4, count: 5, ktNum: 2 },
    { start: 9, count: 3, ktNum: 3 },
  ];

  let html = '';

  ktLessonSlices.forEach(({ start, count, ktNum }, ktIdx) => {
    const ktLessons = unitData.lessons.slice(start, start + count);
    const rowsHtml = ktLessons
      .map((l, idx) => {
        const globalIdx = start + idx;
        const editorial = ENQUIRY_EDITORIAL[globalIdx];
        const code = editorial ? editorial.ktCode : `KT ${ktNum}.${idx + 1}`;
        let question = l.title
          .replace(/^(?:KT|Key Topic)\s*\d+\.\d+[:\-–—\s]*/i, '')
          .replace(/^Enquiry[:\-–—\s]*/i, '')
          .trim();

        let blurb = '';
        if (l.specification_anchor) {
          blurb = l.specification_anchor.replace(/^[^:]+:\s*/i, '').trim();
        } else if (
          specData &&
          specData.sections &&
          specData.sections[ktIdx] &&
          specData.sections[ktIdx].topics &&
          specData.sections[ktIdx].topics[idx]
        ) {
          const pts = specData.sections[ktIdx].topics[idx].points || [];
          blurb = pts.map((p) => p.replace(/\*\*/g, '').replace(/\*/g, '')).join(' ');
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
          <span class="ikt-badge">KEY TOPIC ${ktNum}</span>
          <span class="ikt-title">${ktTitles[ktIdx]}</span>
        </div>
        <div class="inside-kt-rows">
          ${rowsHtml}
        </div>
      </div>
    `;
  });

  return html;
}

// Build Complete HTML document
function buildCmeHtml() {
  const unitData = loadCmeData();

  // Convert image references to Base64 (Oslo Accords Handshake Plate I)
  const coverImgData =
    getBase64Image('/images/cme_oslo_handshake_1993.jpg') ||
    getBase64Image('/images/cme_cover.jpg');

  // 1. INSIDE FRONT COVER (Page 2) Automated Specification Directory
  const insideCoverHtml = generateInsideFrontCover(unitData);

  // 2. MILESTONE SPINE (Page 3)
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

  // 3. 12 ENQUIRY SPREADS (Pages 4–27)
  let spreadsHtml = '';

  ENQUIRY_EDITORIAL.forEach((config, idx) => {
    const lesson = unitData.lessons[idx];
    const num = config.num;
    const versoPage = num * 2 + 2;
    const rectoPage = versoPage + 1;

    // Helper to parse single narrative block
    function parseSingleBlock(b, ref) {
      let rawTitle = b.theme_heading || b.title || 'Section';
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
        ref,
        date,
        title: rawTitle,
        paras,
        rawText: cleaned,
        rawOriginalText: b.text,
      };
    }

    // Determine Verso vs Recto block distribution
    let versoBlocks = [];
    let rectoBlocks = [];

    if (num === 1) {
      // Enquiry 1 (Spread 1, pp. 4–5): Mandate Collapse (Blocks 0–6 of lesson_1_2)
      const lesson1 = unitData.lessons[1];
      const rawBlocks = (lesson1.narrative_blocks || []).filter((b) => b.text && b.text.trim());
      versoBlocks = rawBlocks.slice(0, 4).map((b, bIdx) => parseSingleBlock(b, `1.${bIdx + 1}`));
      rectoBlocks = rawBlocks.slice(4, 7).map((b, bIdx) => parseSingleBlock(b, `1.${bIdx + 5}`));
    } else if (num === 2) {
      // Enquiry 2 (Spread 2, pp. 6–7): Creation of Israel (Blocks 7–11 of lesson_1_2)
      const lesson1 = unitData.lessons[1];
      const rawBlocks = (lesson1.narrative_blocks || []).filter((b) => b.text && b.text.trim());
      versoBlocks = rawBlocks.slice(7, 9).map((b, bIdx) => parseSingleBlock(b, `2.${bIdx + 1}`));
      rectoBlocks = rawBlocks.slice(9, 12).map((b, bIdx) => parseSingleBlock(b, `2.${bIdx + 3}`));
    } else {
      const lesson = unitData.lessons[idx];
      const rawBlocks = (lesson.narrative_blocks || []).filter((b) => b.text && b.text.trim());
      const parsedBlocks = rawBlocks.map((b, bIdx) => parseSingleBlock(b, `${num}.${bIdx + 1}`));
      if (num === 3 || num === 4) {
        versoBlocks = parsedBlocks.slice(0, 4);
        rectoBlocks = parsedBlocks.slice(4);
      } else {
        versoBlocks = parsedBlocks.slice(0, 2);
        rectoBlocks = parsedBlocks.slice(2);
      }
    }

    // Helper to render narrative block HTML
    function renderNarrativeBlock(b) {
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

  // 4. MASTER RETRIEVAL QUIZ (Page 28)
  const quizCardsConfig = [
    { num: 1, range: 'pp. 4–7 • Ref [1.1]–[2.5]', title: 'THE MANDATE & 1948 WAR', qKey: 'card1' },
    { num: 2, range: 'pp. 8–11 • Ref [3.1]–[4.8]', title: 'REFUGEES & SUEZ CRISIS', qKey: 'card2' },
    {
      num: 3,
      range: 'pp. 12–15 • Ref [5.1]–[6.4]',
      title: 'SIX-DAY WAR & ESCALATION',
      qKey: 'card3',
    },
    { num: 4, range: 'pp. 16–19 • Ref [7.1]–[8.4]', title: 'OCCUPIED LANDS & PLO', qKey: 'card4' },
    {
      num: 5,
      range: 'pp. 20–23 • Ref [9.1]–[10.4]',
      title: 'YOM KIPPUR & CAMP DAVID',
      qKey: 'card5',
    },
    {
      num: 6,
      range: 'pp. 24–27 • Ref [11.1]–[12.4]',
      title: 'LEBANON, INTIFADA & OSLO',
      qKey: 'card6',
    },
  ];

  const quizCardsHtml = quizCardsConfig
    .map((c) => {
      const questions = QUIZ_QUESTIONS[c.qKey] || [];
      const baseNum = (c.num - 1) * 10;
      const qListHtml = questions
        .map((q, qIdx) => {
          return `
          <li class="quiz-q-item">
            <span class="q-num">${baseNum + qIdx + 1}.</span>
            <span class="q-text">${q}</span>
          </li>
        `;
        })
        .join('');

      return `
      <div class="quiz-card">
        <div class="quiz-card-head">
          <span class="quiz-card-title">${c.title}</span>
          <span class="quiz-card-range">${c.range}</span>
        </div>
        <ol class="quiz-card-list">
          ${qListHtml}
        </ol>
      </div>
    `;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conflict in the Middle East, 1945–1995 &bull; 28-Page Master Classroom Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* =========================================================
       MASTER COLOR PALETTE & TYPOGRAPHIC DESIGN TOKENS
       ========================================================= */
    :root {
      --font-display: 'Cinzel', Georgia, serif;
      --font-body: 'Lora', Georgia, serif;
      --font-synopsis: 'Playfair Display', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      
      --cme-gold: #c5a059;
      --cme-gold-dark: #9a7b3c;
      --cme-navy: #0f172a;
      --cme-blue-accent: #1e3a8a;
      --cme-terracotta: #991b1b;
      --cme-slate-ink: #1e293b;
      --cme-border: #cbd5e1;
      --cme-parchment: #fdfbf7;
      --cme-sand: #f8fafc;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    @page {
      size: 210mm 297mm;
      margin: 0;
    }

    html, body {
      width: 210mm;
      background: #f1f5f9;
      color: var(--cme-slate-ink);
      font-family: var(--font-body);
      font-size: 11.5pt;
      line-height: 1.58;
      -webkit-font-smoothing: antialiased;
    }

    .a4-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      position: relative;
      background: #ffffff;
      padding: 11mm 15mm 9mm 15mm;
      margin: 0 auto 12mm auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    @media print {
      body {
        background: transparent;
      }
      .a4-page {
        margin: 0;
        box-shadow: none;
      }
    }

    /* RUNNING HEADERS & FOOTERS */
    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid var(--cme-navy);
      padding-bottom: 1.8mm;
      margin-bottom: 2.2mm;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: var(--cme-navy);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .page-running-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #cbd5e1;
      padding-top: 1.5mm;
      margin-top: 1.5mm;
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .page-num {
      font-weight: 800;
      color: var(--cme-navy);
      font-size: 7.2pt;
    }

    /* =========================================================
       PAGE 1: MASTER FRONT COVER
       ========================================================= */
    .front-cover {
      background: linear-gradient(145deg, #0b1329 0%, #0f172a 50%, #1e293b 100%);
      color: #ffffff;
      padding: 10mm 15mm 8mm 15mm !important;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
      font-family: var(--font-synopsis);
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
      height: 144mm;
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
      border-left: 4px solid var(--cme-blue-accent);
      border-radius: 4px;
      padding: 13px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      margin-bottom: 3.5mm;
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
      color: var(--cme-navy);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .cover-synopsis-tag {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 700;
      color: var(--cme-terracotta);
      letter-spacing: 0.04em;
    }

    .cover-synopsis-body p {
      font-family: var(--font-body);
      font-size: 8.8pt;
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
      padding: 4.5px 14px;
      font-family: var(--font-sans);
      font-size: 6.2pt;
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
      padding: 10mm 15mm 8mm 15mm !important;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .inside-cover-header-strip {
      border-bottom: 2px solid var(--cme-navy);
      padding-bottom: 1.8mm;
      margin-bottom: 3.0mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .ichs-title-group h2 {
      font-family: var(--font-display);
      font-size: 11pt;
      font-weight: 800;
      color: var(--cme-navy);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .ichs-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--cme-terracotta);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
      white-space: nowrap;
    }

    .ichs-badge {
      font-family: var(--font-sans);
      font-size: 6.0pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--cme-navy);
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
      gap: 8px;
      min-height: 0;
    }

    .inside-kt-group {
      margin-bottom: 0;
    }

    .inside-kt-group:last-child {
      margin-bottom: 0;
    }

    .inside-kt-header {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid var(--cme-navy);
      padding: 2.2px 8px;
      margin-bottom: 3px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ikt-badge {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--cme-navy);
      letter-spacing: 0.04em;
    }

    .ikt-title {
      font-family: var(--font-display);
      font-size: 8.6pt;
      font-weight: 700;
      color: var(--cme-navy);
    }

    .inside-kt-rows {
      display: flex;
      flex-direction: column;
      gap: 3.5px;
    }

    .inside-spec-row {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid var(--cme-blue-accent);
      padding: 3.5px 8px;
      border-radius: 3px;
    }

    .isr-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5px;
    }

    .isr-left {
      display: flex;
      align-items: baseline;
      gap: 7px;
      flex: 1;
      min-width: 0;
    }

    .isr-code {
      font-family: var(--font-sans);
      font-size: 7.6pt;
      font-weight: 800;
      color: var(--cme-blue-accent);
      white-space: nowrap;
    }

    .isr-question {
      font-family: var(--font-sans);
      font-size: 8.6pt;
      font-weight: 700;
      color: #0f172a;
      white-space: nowrap;
    }

    .isr-pages {
      font-family: var(--font-sans);
      font-size: 7.0pt;
      font-weight: 700;
      color: #64748b;
      white-space: nowrap;
      margin-left: 8px;
    }

    .isr-blurb {
      font-family: var(--font-sans);
      font-size: 8.0pt;
      line-height: 1.30;
      color: #334155;
      margin: 0;
      text-align: justify;
      font-style: italic;
    }

    .isr-blurb strong {
      font-weight: 700;
      color: #0f172a;
      font-style: normal;
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
      border-bottom: 2px solid var(--cme-navy);
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
      color: var(--cme-navy);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .shs-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--cme-terracotta);
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
      background: var(--cme-navy);
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
      gap: 5px;
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
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--cme-terracotta);
      padding-top: 2px;
      flex-shrink: 0;
      white-space: nowrap;
    }

    .spine-dot {
      width: 7px;
      height: 7px;
      background: #ffffff;
      border: 2px solid var(--cme-navy);
      border-radius: 50%;
      margin-top: 4px;
      flex-shrink: 0;
      box-shadow: 0 0 0 1.5px #ffffff;
    }

    .spine-content {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid var(--cme-navy);
      padding: 3.5px 8px;
      border-radius: 2px;
    }

    .spine-title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5px;
    }

    .spine-title {
      font-family: var(--font-sans);
      font-size: 8.0pt;
      font-weight: 800;
      color: #0f172a;
    }

    .spine-desc {
      font-family: var(--font-body);
      font-size: 7.4pt;
      line-height: 1.28;
      color: #334155;
      text-align: justify;
      margin: 0;
    }

    /* =========================================================
       PAGES 4–27: 12 ENQUIRY SPREADS (VERSO & RECTO)
       ========================================================= */
    .enquiry-title-banner {
      border-bottom: 2px solid var(--cme-navy);
      padding-bottom: 2.5mm;
      margin-bottom: 3.5mm;
    }

    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5mm;
    }

    .enquiry-badge {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--cme-navy);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .enquiry-subtitle-tag {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: var(--cme-terracotta);
      letter-spacing: 0.04em;
    }

    .enquiry-main-title {
      font-family: var(--font-display);
      font-size: 14.5pt;
      font-weight: 800;
      color: var(--cme-navy);
      line-height: 1.15;
      margin-bottom: 2mm;
    }

    .enquiry-question-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid var(--cme-blue-accent);
      padding: 2.2mm 3.5mm;
      border-radius: 2px;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .eq-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--cme-blue-accent);
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .eq-text {
      font-family: var(--font-synopsis);
      font-style: italic;
      font-size: 9.2pt;
      font-weight: 600;
      color: var(--cme-navy);
      line-height: 1.25;
    }

    .recto-header-banner {
      border-bottom: 2px solid var(--cme-navy);
      padding-bottom: 2.5mm;
      margin-bottom: 3.5mm;
    }

    .recto-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5mm;
    }

    .recto-part-tag {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--cme-terracotta);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .recto-subhead {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: #475569;
    }

    .recto-anchor-box {
      background: var(--cme-parchment);
      border: 1px solid #cbd5e1;
      border-left: 3.5px solid var(--cme-gold-dark);
      padding: 2.2mm 3.5mm;
      border-radius: 2px;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .anchor-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--cme-gold-dark);
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .anchor-text {
      font-family: var(--font-body);
      font-style: italic;
      font-size: 8.8pt;
      color: var(--cme-slate-ink);
      line-height: 1.28;
    }

    .prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 0;
    }

    .prose-columns {
      column-count: 2;
      column-gap: 8mm;
      column-fill: balance;
      text-align: justify;
      hyphens: auto;
    }

    .narrative-block {
      break-inside: auto;
      margin-bottom: 3.5mm;
    }

    .block-header {
      break-after: avoid;
      break-inside: avoid;
      display: flex;
      align-items: baseline;
      gap: 5px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.2px;
      margin-bottom: 2mm;
    }

    .block-ref {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--cme-navy);
      padding: 1px 4.5px;
      border-radius: 2px;
      white-space: nowrap;
    }

    .block-date {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 700;
      color: var(--cme-terracotta);
      white-space: nowrap;
    }

    .block-title {
      font-family: var(--font-display);
      font-size: 8.6pt;
      font-weight: 700;
      color: var(--cme-navy);
      line-height: 1.15;
    }

    .prose-p {
      font-family: var(--font-body);
      font-size: 11.5pt;
      line-height: 1.58;
      color: var(--cme-slate-ink);
      margin-bottom: 2.8mm;
      text-align: justify;
      hyphens: auto;
      orphans: 2;
      widows: 2;
    }

    .prose-p:last-child {
      margin-bottom: 0;
    }

    /* FLASHPOINT SUBCARDS FOR ENQUIRY 1 RECTO */
    .flashpoints-subcard-grid {
      display: block;
    }

    .flashpoint-subcard {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3px solid var(--cme-navy);
      padding: 2.5mm 3.5mm;
      border-radius: 2px;
      break-inside: avoid;
      margin-bottom: 3mm;
    }

    .subcard-header {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 1mm;
    }

    .subcard-ref {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 800;
      color: var(--cme-blue-accent);
    }

    .subcard-title {
      font-family: var(--font-display);
      font-size: 8.2pt;
      font-weight: 700;
      color: var(--cme-navy);
    }

    .flashpoint-subcard .prose-p {
      font-size: 10.5pt;
      line-height: 1.45;
      margin-bottom: 0;
    }

    /* =========================================================
       PAGE 28: MASTER KNOWLEDGE RETRIEVAL QUIZ (BACK COVER)
       ========================================================= */
    .quiz-page {
      padding: 10mm 15mm 8mm 15mm !important;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .quiz-top-masthead {
      border-bottom: 2px solid var(--cme-navy);
      padding-bottom: 1.8mm;
      margin-bottom: 2mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .qtm-title-group h2 {
      font-family: var(--font-display);
      font-size: 13pt;
      font-weight: 900;
      color: var(--cme-navy);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .qtm-title-group p {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: var(--cme-terracotta);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }

    .qtm-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      background: var(--cme-navy);
      padding: 2px 7px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .quiz-instructions-banner {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3px solid var(--cme-blue-accent);
      padding: 2mm 3.5mm;
      border-radius: 2px;
      font-family: var(--font-sans);
      font-size: 6.4pt;
      line-height: 1.35;
      color: #334155;
      margin-bottom: 2.2mm;
    }

    .quiz-instructions-banner strong {
      color: var(--cme-navy);
    }

    .quiz-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 3.5mm 12px;
      flex: 1;
      min-height: 0;
    }

    .quiz-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid var(--cme-navy);
      border-radius: 3px;
      padding: 2.5mm 3.5mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .quiz-card-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1mm;
      margin-bottom: 1.5mm;
    }

    .quiz-card-title {
      font-family: var(--font-display);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--cme-navy);
      letter-spacing: 0.04em;
    }

    .quiz-card-range {
      font-family: var(--font-sans);
      font-size: 5.6pt;
      font-weight: 700;
      color: #64748b;
    }

    .quiz-card-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      gap: 1.2px;
    }

    .quiz-q-item {
      display: flex;
      align-items: baseline;
      gap: 3px;
      font-size: 6.4pt;
      line-height: 1.22;
      color: #1e293b;
    }

    .q-num {
      font-weight: 700;
      color: #475569;
      min-width: 14px;
      text-align: right;
    }

    .q-text {
      flex: 1;
    }
  </style>
</head>
<body>

  <!-- ==========================================
       PAGE 1: MASTER FRONT COVER
  =========================================== -->
  <div class="a4-page front-cover" id="page-1" data-page="1">
    <header class="cover-top-masthead">
      <span class="masthead-title">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="masthead-badge">KEY STAGE 4 &bull; PEARSON EDEXCEL GCSE OPTION P5</span>
    </header>

    <div class="cover-title-group">
      <span class="cover-spec-pill">Pearson Edexcel GCSE (9–1) History &bull; Paper 2 Option P5</span>
      <h1>Conflict in the Middle East</h1>
      <p>1945–1995 &bull; The Birth of Israel &bull; The Escalating Conflict &bull; Attempts at a Solution</p>
    </div>

    <div class="cover-hero-artwork-frame">
      <div class="cover-hero-img-box">
        <img src="${coverImgData}" alt="Historic Signing of the Oslo Accords (1993)">
      </div>
      <div class="cover-hero-caption">
        Plate I: Prime Minister Yitzhak Rabin, President Bill Clinton, and PLO Chairman Yasser Arafat on the South Lawn of the White House following the signing of the Oslo Accords (13 September 1993). US National Archives and Records Administration (NARA).
      </div>
    </div>

    <div class="cover-synopsis-card">
      <div class="cover-synopsis-header">
        <span class="cover-synopsis-badge">HISTORICAL OVERVIEW &bull; 1945–1995</span>
        <span class="cover-synopsis-tag">TERRITORY, FAITH &amp; DIPLOMACY</span>
      </div>
      <div class="cover-synopsis-body" id="cover-synopsis-body">
        <p>
          Imperial promises carved across desert sand, post-Holocaust desperation, and sacred claims to the same ancient earth ignited fifty years of unrelenting conflict. From the fiery collapse of the British Mandate and the 1948–49 War of Independence to Gamal Abdel Nasser’s defiance during the 1956 Suez Crisis, the lightning preemptive strikes of the 1967 Six-Day War, and the existential shock of the 1973 Yom Kippur assault, the Middle East became the world’s most volatile geopolitical crucible.
        </p>
        <p>
          As displaced Palestinian refugees mobilized through the PLO and asymmetric resistance, the contest evolved from interstate warfare into insurgent confrontation and urban intifada. Yet amidst recurrent tragedy, courageous diplomatic gambits emerged—from Anwar Sadat’s historic journey to Jerusalem and the Camp David Accords to the secret Norwegian backchannels of the Oslo Peace Process. This master classroom textbook provides an authoritative, unbroken 28-page historical narrative charting five decades of war, diplomacy, and the elusive search for peace.
        </p>
      </div>
    </div>

    <div class="cover-curriculum-strip">
      <div class="ccs-item"><span class="ccs-code">KT 1</span><span class="ccs-text">The Birth of the State of Israel (1945–63)</span></div>
      <div class="ccs-divider">&bull;</div>
      <div class="ccs-item"><span class="ccs-code">KT 2</span><span class="ccs-text">The Escalating Conflict (1964–73)</span></div>
      <div class="ccs-divider">&bull;</div>
      <div class="ccs-item"><span class="ccs-code">KT 3</span><span class="ccs-text">Attempts at a Solution (1974–95)</span></div>
    </div>

    <footer class="cover-footer-meta">
      <span>Page 1 &bull; Master Cover</span>
      <span>The History Revision Hub &bull; GCSE Master Textbook Standard</span>
      <span>Course Specification &amp; Disciplinary Directory &bull; Inside Front Cover (p. 2)</span>
    </footer>
  </div>

  <!-- ==========================================
       PAGE 2: INSIDE FRONT COVER SPECIFICATION DIRECTORY
  =========================================== -->
  <div class="a4-page inside-cover-page" id="page-2" data-page="2">
    <header class="page-running-header">
      <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="header-center">PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION P5</span>
      <span class="header-right">INSIDE FRONT COVER &bull; PAGE 2</span>
    </header>

    <div class="inside-cover-header-strip">
      <div class="ichs-title-group">
        <h2>COURSE SPECIFICATION &amp; DISCIPLINARY DIRECTORY</h2>
        <p>Full Syllabus Alignment Across All 12 Canonical Lessons (Key Topics 1–3) &bull; Option P5</p>
      </div>
      <span class="ichs-badge">Official Specification Alignment</span>
    </div>

    <div class="inside-cover-content">
      ${insideCoverHtml}
    </div>

    <footer class="page-running-footer">
      <span>Conflict in the Middle East (1945&ndash;1995) &bull; Course Specification &amp; Disciplinary Directory</span>
      <span class="page-num">2</span>
    </footer>
  </div>

  <!-- ==========================================
       PAGE 3: MASTER CHRONOLOGICAL MILESTONE SPINE
  =========================================== -->
  <div class="a4-page spine-page" id="page-3" data-page="3">
    <header class="page-running-header">
      <span class="header-left">THE HISTORY REVISION HUB &bull; MASTER CURRICULUM SERIES</span>
      <span class="header-center">PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION P5</span>
      <span class="header-right">CHRONOLOGICAL SPINE &bull; PAGE 3</span>
    </header>

    <div class="spine-header-strip">
      <div class="shs-title-group">
        <h2>MASTER CHRONOLOGICAL MILESTONE SPINE</h2>
        <p>15 Defining Turning Points &amp; Causal Dominoes (1917–1995) &bull; Advance Organizer</p>
      </div>
      <span class="shs-badge">Causal Turning Points</span>
    </div>

    <div class="spine-container">
      ${milestoneItemsHtml}
    </div>

    <footer class="page-running-footer">
      <span>Conflict in the Middle East (1945&ndash;1995) &bull; Master Chronological Milestone Spine</span>
      <span class="page-num">3</span>
    </footer>
  </div>

  <!-- ==========================================
       PAGES 4–27: 12 CANONICAL ENQUIRY SPREADS
  =========================================== -->
  ${spreadsHtml}

  <!-- ==========================================
       PAGE 28: MASTER KNOWLEDGE RETRIEVAL QUIZ (BACK COVER)
  =========================================== -->
  <div class="a4-page quiz-page" id="page-28" data-page="28">
    <header class="quiz-top-masthead">
      <div class="qtm-title-group">
        <h2>MASTER KNOWLEDGE RETRIEVAL QUIZ</h2>
        <p>60 Essential Recall Questions &bull; Conflict in the Middle East (1945–1995)</p>
      </div>
      <span class="qtm-badge">Partner Quiz or Solo Practice</span>
    </header>

    <div class="quiz-instructions-banner">
      <strong>Active Recall Protocol:</strong> Work systematically with a study partner or complete solo in your revision notebook. Each topic card targets 10 non-negotiable core facts, individuals, and turning points. Cross-referenced paragraph codes cite the exact narrative blocks where each answer is explained. <em>(Zero answers printed.)</em>
    </div>

    <div class="quiz-grid">
      ${quizCardsHtml}
    </div>

    <footer class="page-running-footer">
      <span>Conflict in the Middle East (1945&ndash;1995) &bull; Master Knowledge Retrieval Quiz</span>
      <span class="page-num">28</span>
    </footer>
  </div>

  <script>
    // Browser auto-fit algorithms
    function autoFitCoverBlurb() {
      const page = document.querySelector('#page-1');
      const body = document.querySelector('#cover-synopsis-body');
      if (!page || !body) return;

      let fs = 8.8;
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
      const rows = Array.from(page.querySelectorAll('.inside-spec-row'));
      const blurbs = Array.from(page.querySelectorAll('.isr-blurb'));
      const questions = Array.from(page.querySelectorAll('.isr-question'));
      const codes = Array.from(page.querySelectorAll('.isr-code'));
      const pages = Array.from(page.querySelectorAll('.isr-pages'));
      const ktTitles = Array.from(page.querySelectorAll('.ikt-title'));
      const ktBadges = Array.from(page.querySelectorAll('.ikt-badge'));
      if (!content || !footer || !rows.length) return;

      // Ensure natural vertical flow without artificial space-between voids
      content.style.justifyContent = 'flex-start';
      page.style.justifyContent = 'flex-start';

      const footerTop = footer.getBoundingClientRect().top;
      function getLastBottom() {
        const last = page.querySelector('.inside-kt-group:last-child .inside-spec-row:last-child') || page.querySelector('.inside-spec-row:last-child');
        return last ? last.getBoundingClientRect().bottom : 0;
      }

      let fs = 8.0;
      let padY = 3.6;
      let rowGap = 3.5;
      let groupGap = 8.0;

      function applyStyles(testFs, testPadY, testRowGap, testGroupGap) {
        content.style.gap = testGroupGap.toFixed(1) + 'px';
        page.querySelectorAll('.inside-kt-rows').forEach(r => {
          r.style.gap = testRowGap.toFixed(1) + 'px';
        });
        rows.forEach(r => {
          r.style.padding = testPadY.toFixed(1) + 'px 8px';
        });
        blurbs.forEach(b => {
          b.style.fontSize = testFs.toFixed(2) + 'pt';
          b.style.lineHeight = '1.30';
        });
        questions.forEach(q => q.style.fontSize = (testFs + 0.8).toFixed(2) + 'pt');
        codes.forEach(c => c.style.fontSize = (testFs).toFixed(2) + 'pt');
        pages.forEach(p => p.style.fontSize = (testFs - 0.6).toFixed(2) + 'pt');
        ktTitles.forEach(t => t.style.fontSize = (testFs + 0.8).toFixed(2) + 'pt');
        ktBadges.forEach(b => b.style.fontSize = (testFs - 0.6).toFixed(2) + 'pt');
      }

      applyStyles(fs, padY, rowGap, groupGap);

      // 1. Scale down if overflowing
      while ((page.scrollHeight > page.clientHeight || getLastBottom() > footerTop - 8) && fs > 6.0) {
        fs -= 0.1;
        padY = Math.max(2.0, padY - 0.1);
        rowGap = Math.max(2.0, rowGap - 0.1);
        groupGap = Math.max(5.0, groupGap - 0.2);
        applyStyles(fs, padY, rowGap, groupGap);
      }

      // 2. Scale up if generous clearance
      let clearance = footerTop - getLastBottom();
      if (clearance > 14 && page.scrollHeight <= page.clientHeight) {
        let bestFs = fs;
        let bestPadY = padY;
        let bestRowGap = rowGap;
        let bestGroupGap = groupGap;

        for (let testFs = fs + 0.1; testFs <= 8.6; testFs += 0.1) {
          const testPadY = padY + (testFs - fs) * 0.5;
          const testRowGap = rowGap + (testFs - fs) * 0.4;
          const testGroupGap = groupGap + (testFs - fs) * 0.8;
          applyStyles(testFs, testPadY, testRowGap, testGroupGap);

          if (getLastBottom() <= footerTop - 8 && page.scrollHeight <= page.clientHeight) {
            bestFs = testFs;
            bestPadY = testPadY;
            bestRowGap = testRowGap;
            bestGroupGap = testGroupGap;
          } else {
            break;
          }
        }
        applyStyles(bestFs, bestPadY, bestRowGap, bestGroupGap);
      }
    }

    function autoFitPage3Milestones() {
      const page = document.querySelector('#page-3');
      if (!page) return;
      const spineContainer = page.querySelector('.spine-container');
      const footer = page.querySelector('.page-running-footer');
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
          d.style.lineHeight = '1.28';
        });
        titles.forEach(t => t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt');
        badges.forEach(b => b.style.fontSize = (fs - 0.2).toFixed(1) + 'pt');
        contents.forEach(c => {
          c.style.paddingTop = padY.toFixed(1) + 'px';
          c.style.paddingBottom = padY.toFixed(1) + 'px';
        });
      }

      let fs = 7.4;
      let gap = 5.0;
      let padY = 3.5;
      apply(fs, gap, padY);

      // 1. Scale down if overflowing
      while ((page.scrollHeight > page.clientHeight || getLastBottom() > footerTop - 6) && fs > 6.0) {
        fs -= 0.1;
        gap = Math.max(2.5, gap - 0.2);
        padY = Math.max(1.8, padY - 0.15);
        apply(fs, gap, padY);
      }

      // 2. Scale up if room permits to maximize legibility and fill space evenly
      let clearance = footerTop - getLastBottom();
      if (clearance > 12 && page.scrollHeight <= page.clientHeight) {
        let bestFs = fs;
        let bestGap = gap;
        let bestPadY = padY;
        for (let testFs = fs + 0.1; testFs <= 8.8; testFs += 0.1) {
          const testGap = gap + (testFs - fs) * 0.9;
          const testPadY = padY + (testFs - fs) * 0.4;
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
          const blocks = Array.from(page.querySelectorAll('.narrative-block, .flashpoint-subcard'));
          if (!paragraphs.length) return;

          const footer = page.querySelector('.page-running-footer');
          const footerTop = footer ? footer.getBoundingClientRect().top : page.clientHeight - 30;

          // 1. Check if colliding with footer or overflowing horizontally/vertically -> Scale DOWN
          let currentFs = parseFloat(window.getComputedStyle(paragraphs[0]).fontSize) * 0.75;
          let currentMb = parseFloat(window.getComputedStyle(paragraphs[0]).marginBottom) || 6;
          let iterations = 0;

          while ((prose.getBoundingClientRect().bottom > footerTop - 6 || page.scrollHeight > page.clientHeight || prose.scrollWidth > prose.clientWidth + 2) && currentFs > 8.5 && iterations < 45) {
            currentFs -= 0.15;
            currentMb = Math.max(2.0, currentMb - 0.25);
            paragraphs.forEach(p => {
              p.style.fontSize = currentFs.toFixed(2) + 'pt';
              p.style.lineHeight = (currentFs * 0.130 + 0.06).toFixed(2);
              p.style.marginBottom = currentMb.toFixed(1) + 'px';
            });
            blocks.forEach(b => {
              b.style.marginBottom = Math.max(3.0, currentMb * 1.05).toFixed(1) + 'px';
            });
            iterations++;
          }

          // 2. If page has substantial empty space (clearance > 30px) -> Scale UP
          let lowestBottom = prose.getBoundingClientRect().bottom;
          let clearance = footerTop - lowestBottom;

          if (clearance > 30 && prose.getBoundingClientRect().bottom <= footerTop - 6) {
            let bestUpFs = currentFs;
            let bestUpMb = currentMb;

            for (let testFs = currentFs; testFs <= 13.5; testFs += 0.15) {
              const testLh = (1.50 + (testFs - 10.5) * 0.035).toFixed(2);
              const testMb = Math.min(14, currentMb + (testFs - currentFs) * 1.8);
              paragraphs.forEach(p => {
                p.style.fontSize = testFs.toFixed(2) + 'pt';
                p.style.lineHeight = testLh;
                p.style.marginBottom = testMb.toFixed(1) + 'px';
              });
              blocks.forEach(b => {
                b.style.marginBottom = (testMb * 1.05).toFixed(1) + 'px';
              });

              const newBottom = prose.getBoundingClientRect().bottom;
              const newClearance = footerTop - newBottom;

              if (newBottom <= footerTop - 6 && page.scrollHeight <= page.clientHeight && prose.scrollWidth <= prose.clientWidth + 2 && newClearance >= 6) {
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
              b.style.marginBottom = (bestUpMb * 1.05).toFixed(1) + 'px';
            });
          }
        }
      });
    }

    window.addEventListener('load', () => {
      autoFitCoverBlurb();
      autoFitInsideCoverDirectory();
      autoFitPage3Milestones();
      autoFitSpreadTypography();
    });
  </script>
</body>
</html>`;
}

// Main execution function
async function main() {
  console.log('================================================================');
  console.log('🏛️ COMPILING UNIFIED 28-PAGE MASTER TEXTBOOK: CONFLICT IN THE MIDDLE EAST');
  console.log('================================================================\n');

  const unitData = loadCmeData();
  console.log(`Loaded unit data: "${unitData.title}" (${unitData.lessons.length} lessons)`);

  const htmlContent = buildCmeHtml();

  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });

  const htmlPath = path.join(htmlOutputDir, 'textbook_UNIFIED.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(
    `Saved unified textbook HTML: ${htmlPath} (${Math.round(htmlContent.length / 1024)} KB)`,
  );

  // Mirror to root units folder
  const rootUnitsDir = path.join(ROOT_DIR, 'units', 'cme_new');
  if (fs.existsSync(rootUnitsDir)) {
    fs.writeFileSync(path.join(rootUnitsDir, 'textbook_UNIFIED.html'), htmlContent, 'utf8');
  }

  console.log('\nLaunching Puppeteer for reprographic audit and PDF rendering...');
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

  await page.goto(`file://${htmlPath}`, { waitUntil: ['load', 'networkidle0'] });
  await page.evaluateHandle('document.fonts.ready');

  // Trigger in-browser auto-fit functions
  await page.evaluate(() => {
    if (typeof autoFitCoverSynopsis === 'function') autoFitCoverSynopsis();
    if (typeof autoFitCoverEnquiries === 'function') autoFitCoverEnquiries();
    if (typeof autoFitInsideCoverDirectory === 'function') autoFitInsideCoverDirectory();
    if (typeof autoFitPage3Milestones === 'function') autoFitPage3Milestones();
    if (typeof autoFitSpreadTypography === 'function') autoFitSpreadTypography();
  });

  await new Promise((r) => setTimeout(r, 1000));

  // Run the automated Reprographic Quality Audit
  console.log('Running Reprographics & Page Budget Audit...');
  const auditResults = await auditPageBudget(page, {
    footerSelector: '.page-running-footer, .cover-footer-meta',
    pageSelector: '.a4-page',
    maxPageBudgetPx: 1122,
    targetPages: 28,
  });

  printSpaceAuditReport(auditResults, 'cme_new/textbook_UNIFIED.html');

  if (auditResults.hasErrors) {
    console.warn('⚠️ Warning: Reprographic audit detected errors or page budget violations.');
  } else {
    console.log('✅ REPROGRAPHICS AUDIT PASSED: 100% compliant across all 28 pages.');
  }

  // Export PDF
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });

  const pdfPath = path.join(pdfOutputDir, 'cme_new_textbook_UNIFIED_FINAL.pdf');
  const legacyPdfPath = path.join(pdfOutputDir, 'cme_new_textbook.pdf');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });
  console.log(`\n🎉 Master 28-Page Textbook PDF compiled to:\n  -> ${pdfPath}`);

  fs.copyFileSync(pdfPath, legacyPdfPath);

  // Generate page preview snapshots
  const previewsDir = path.join(htmlOutputDir, 'previews', 'unified');
  if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir, { recursive: true });

  const pagesToPreview = [1, 2, 3, 4, 5, 28];
  for (const pNum of pagesToPreview) {
    const pageEl = await page.$(`#page-${pNum}`);
    if (pageEl) {
      const snapPath = path.join(previewsDir, `page_${String(pNum).padStart(2, '0')}.png`);
      await pageEl.screenshot({ path: snapPath });
      console.log(`Saved preview: ${snapPath}`);
    }
  }

  await browser.close();
  console.log('\n✅ CONFLICT IN THE MIDDLE EAST 28-PAGE MASTER TEXTBOOK COMPILED SUCCESSFULLY!\n');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during CME master textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { buildCmeHtml, main };
