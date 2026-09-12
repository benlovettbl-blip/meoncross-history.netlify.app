const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const publicUnitsDir = PATHS.UNITS;
let dataParserCode = '';
try {
  const dataParserSrc = fs.readFileSync(path.join(PATHS.SRC, 'data_parser.js'), 'utf8');
  dataParserCode = dataParserSrc.replace(/export /g, '');
  eval(dataParserCode);
} catch (err) {
  console.warn(
    '⚠️ Warning: data_parser.js is missing or cannot be read. Skipping parser initialization.',
    err.message,
  );
}

let examGuideSrc = '';
try {
  if (fs.existsSync(path.join(PATHS.SRC, 'exam_guide_content.js'))) {
    examGuideSrc = fs.readFileSync(path.join(PATHS.SRC, 'exam_guide_content.js'), 'utf8');
    const examGuideCode = examGuideSrc.replace(/export const /g, 'global.');
    eval(examGuideCode);
  } else {
    global.sectionAGuide = '';
    global.sectionBGuide = '';
  }
} catch (err) {
  console.warn('⚠️ Warning: Could not read exam_guide_content.js.', err.message);
  global.sectionAGuide = '';
  global.sectionBGuide = '';
}

const getTariffBadge = (topic) => {
  if (!topic) return '';
  let marks = 8;
  let match = topic.match(/\((\d+)\s*marks?\)/i);
  if (match) {
    marks = parseInt(match[1]);
    topic = topic.replace(match[0], '').trim();
  } else {
    if (topic.toLowerCase().includes('narrative account')) marks = 8;
    else if (topic.toLowerCase().includes('how useful')) marks = 8;
    else if (topic.toLowerCase().includes('explain why')) marks = 12;
    else if (topic.toLowerCase().includes('explain one consequence')) marks = 4;
    else if (
      topic.toLowerCase().includes('describe two features') ||
      topic.toLowerCase().includes('describe one feature')
    )
      marks = 4;
  }
  let time = Math.round(marks * 1.25);
  if (marks === 4) time = 5;
  if (marks === 8) time = 10;
  if (marks === 12) time = 15;
  if (marks === 16) time = 20;

  return {
    cleanTopic: topic,
    badgeHtml: ` <span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle; margin-left: 10px;">[${marks} marks &bull; ${time} mins]</span>`,
  };
};

const processTaskTextWithTariff = (text, isExamContext = false) => {
  if (!text) return { cleanText: '', badgeHtml: '' };

  let isExam =
    text.toLowerCase().includes('assessment') ||
    /\b\d+\s*marks?\b/i.test(text) ||
    (isExamContext && text.toLowerCase().includes('explain why'));
  if (isExam) {
    let marks = 8;
    let time = 10;
    let spag = 0;

    let match = text.match(/\(?\s*\b(\d+)\s*marks?(?:\s*\+\s*(\d+)\s*marks?\s*for\s*SPaG)?\s*\)?/i);
    if (match) {
      marks = parseInt(match[1]);
      if (match[2]) {
        spag = parseInt(match[2]);
      }
    } else {
      if (text.toLowerCase().includes('narrative account')) marks = 8;
      else if (text.toLowerCase().includes('explain why')) marks = 12;
      else if (text.toLowerCase().includes('16 marks')) marks = 16;
    }

    let totalMarks = marks + spag;

    if (totalMarks === 4) time = 5;
    else if (totalMarks === 8) time = 10;
    else if (totalMarks === 12) time = 15;
    else if (totalMarks === 16) time = 20;
    else if (totalMarks === 20) time = 25;

    let cleanText = text;
    if (match) {
      cleanText = text.replace(match[0], '').trim();
    }

    // Also manually strip brackets if any exist, e.g. [16 marks 20 mins]
    cleanText = cleanText.replace(/\s*\[\d+\s*marks?\s*\d*\s*mins?\]/g, '').trim();

    if (typeof unitData !== 'undefined' && unitData.is_ks3) {
      return {
        cleanText: formatText(cleanText),
        badgeHtml: '',
      };
    }

    return {
      cleanText: formatText(cleanText),
      badgeHtml: `<div style="margin-top: 5px; margin-bottom: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[${totalMarks} marks &bull; ${time} mins]</span></div>`,
    };
  }

  return {
    cleanText: formatText(text),
    badgeHtml: '',
  };
};

const formatText = (text) => {
  if (!text) return '';
  return text
    .replace(/\(Weighing the Evidence toggle tabs\)/gi, '')
    .replace(/_{3,}/g, '[ . . . . . . . . ]')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
};

// Narrative blocks sometimes consist entirely of a "[Key Individual: Name]" tag (or a bare
// name matching one) as a pointer to the unit's key_individuals biography data, rather than
// containing prose directly. Render the full biography instead of just bolding the name.
const renderKeyIndividualBlock = (unitData, rawText) => {
  if (!rawText || !Array.isArray(unitData.key_individuals)) return null;
  const trimmed = rawText.trim();
  const bracketMatch = trimmed.match(/^\[Key Individual:\s*([^\]]+)\]$/i);
  const name = bracketMatch ? bracketMatch[1].trim() : trimmed;
  const person = unitData.key_individuals.find(
    (k) => k.name && k.name.toLowerCase() === name.toLowerCase(),
  );
  if (!person) return null;
  if (!bracketMatch && trimmed.length > 60) return null; // avoid matching prose that merely mentions a name
  return `<div style="border: 1px solid #cbd5e1; border-left: 4px solid #1e3a8a; border-radius: 6px; padding: 12px 15px; margin: 10px 0;">
      <h4 style="margin: 0 0 4px 0; color: #1e3a8a; font-size: 12pt;">${person.name}${person.role ? ` <span style="font-weight: 400; color: #64748b; font-size: 10pt;">&mdash; ${person.role}</span>` : ''}</h4>
      ${person.bio ? `<p style="margin: 6px 0;">${person.bio}</p>` : ''}
      ${person.actions ? `<p style="margin: 6px 0;"><strong>Key actions:</strong> ${person.actions}</p>` : ''}
      ${person.achievements ? `<p style="margin: 6px 0;"><strong>Significance:</strong> ${person.achievements}</p>` : ''}
      ${person.limitations ? `<p style="margin: 6px 0;"><strong>Limitations:</strong> ${person.limitations}</p>` : ''}
    </div>`;
};

const badgeSource = (title, overrideLetter = null) => {
  if (!title) return '';
  if (overrideLetter) {
    if (/(Source )\s*[A-Z]/i.test(title)) {
      title = title.replace(/(Source )\s*[A-Z]/i, '$1' + overrideLetter);
    } else if (/(Source)(?!s)/i.test(title)) {
      title = title.replace(/(Source)/i, '$1 ' + overrideLetter + ':');
    } else {
      title = 'Source ' + overrideLetter + ': ' + title;
    }
  }
  return title.replace(
    /(Source [A-Z])/i,
    '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">$1</span>',
  );
};

const ignoredDirs = ['node_modules', 'public', '.git', '.agents', 'dist'];
let allDirs = fs
  .readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory() && !ignoredDirs.includes(dirent.name))
  .map((dirent) => dirent.name);

const targetUnit = process.argv[2];
if (targetUnit && allDirs.includes(targetUnit)) {
  allDirs = [targetUnit];
}

// -------------------------------------------------------------
// CME Minimalist 1-Page War Narrative Timeline & Master Chronology Generators
// -------------------------------------------------------------
const cmeWarNarrativeConfigs = {
  lesson_2: {
    title: 'GCSE Narrative Account: The First Arab-Israeli War (1948–49)',
    question:
      'Write a narrative account analysing the key events of the first Arab-Israeli War (1948–49). [8 marks]',
    stimulus: ['The Arab invasion (15 May 1948)', 'The First UN Truce (June 1948)'],
    events: [
      'David Ben-Gurion proclaims independence; five Arab armies invade Palestine.',
      'Count Folke Bernadotte brokers a 4-week First UN Truce (11 June – 8 July).',
      'IDF secretly imports Czech arms via Škoda factories (Operation Balak).',
      'The "Ten Days of Fighting": Israeli counter-offensives break Arab sieges.',
      'Operation Yoav and Operation Horev drive Egyptian forces from the southern Negev.',
      '1949 Rhodes Armistice Agreements establish the Green Line and divide Jerusalem.',
    ],
    keywords: [
      'Yishuv',
      'David Ben-Gurion',
      'Arab Legion (Glubb Pasha)',
      'Count Bernadotte',
      'Operation Balak',
      'Czech Arms (Škoda)',
      'Ten Days',
      'Operation Yoav',
      '750k Nakba Refugees',
      'Green Line (1949)',
    ],
    phases: [
      { label: 'Phase 1: Outbreak & Arab Invasion (14–15 May 1948)', lines: 7 },
      {
        label: 'Phase 2: The First UN Truce & Secret Czech Arms Resupply (June – July 1948)',
        lines: 7,
      },
      { label: 'Phase 3: Israeli Counter-Offensives & 1949 Rhodes Armistice Agreements', lines: 7 },
    ],
  },
  lesson_4: {
    title: 'GCSE Narrative Account: The Suez Crisis (1956)',
    question:
      'Write a narrative account analysing the key events of the Suez Crisis (1956). [8 marks]',
    stimulus: [
      'Nationalisation of the Suez Canal (July 1956)',
      'The Sèvres Protocol (October 1956)',
    ],
    events: [
      'US and Britain cancel promised loan funding for the Aswan High Dam.',
      'Nasser nationalises the Suez Canal Company during a speech in Alexandria.',
      'Britain, France, and Israel secretly draft the tripartite Protocol of Sèvres in Paris.',
      'Israel launches Operation Kadesh, parachuting troops at Mitla Pass in Sinai.',
      'Anglo-French forces bomb Egyptian airfields and land paratroopers at Port Said.',
      'President Eisenhower threatens financial collapse, forcing Britain to accept a ceasefire.',
    ],
    keywords: [
      'Gamal Abdel Nasser',
      'Anthony Eden',
      'Aswan High Dam',
      'Nationalisation (26 July)',
      'Protocol of Sèvres',
      'Operation Kadesh',
      'Mitla Pass',
      'Operation Musketeer (Port Said)',
      'Dwight Eisenhower',
      'UNEF Peacekeepers',
    ],
    phases: [
      {
        label: 'Phase 1: Causes & Nationalisation of the Suez Canal Company (July 1956)',
        lines: 7,
      },
      {
        label:
          'Phase 2: Secret Tripartite Collusion at Sèvres & The Invasion (October – November 1956)',
        lines: 7,
      },
      {
        label: 'Phase 3: US Financial Ultimatum, Humiliating Withdrawal & UNEF Deployment',
        lines: 7,
      },
    ],
  },
  lesson_5: {
    title: 'GCSE Narrative Account: The Six Day War (June 1967)',
    question:
      'Write a narrative account analysing the key events of the Six Day War (June 1967). [8 marks]',
    stimulus: ['Operation Focus (5 June 1967)', 'The capture of East Jerusalem (7 June 1967)'],
    events: [
      'Nasser expels UNEF peacekeepers from Sinai and blockades the Straits of Tiran.',
      'Operation Focus: Israeli Air Force destroys 300+ Egyptian aircraft in three hours.',
      'Israeli armoured divisions shatter Egyptian defensive positions across the Sinai.',
      'Jordan shells West Jerusalem; IDF paratroopers storm and capture the Old City.',
      'Israeli infantry scale the Syrian volcanic ramparts to capture the Golan Heights.',
      'Ceasefire leaves Israel in control of Sinai, Gaza, West Bank, Jerusalem, and Golan.',
    ],
    keywords: [
      'UNEF Expulsion',
      'Straits of Tiran',
      'Operation Focus (Moked)',
      'General Moshe Dayan',
      'Air Supremacy',
      'Sinai Tank Battles',
      'Western Wall ("Temple Mount in our hands")',
      'Golan Heights',
      'UN Resolution 242',
      'Khartoum "Three Nos"',
    ],
    phases: [
      {
        label: 'Phase 1: Diplomatic Escalation & Operation Focus Pre-emptive Strike (5 June 1967)',
        lines: 7,
      },
      {
        label: 'Phase 2: Three-Front Combat: Sinai Blitz, Fall of Jerusalem & Golan Heights',
        lines: 7,
      },
      {
        label: 'Phase 3: Ceasefire, Tripled Territory & The Khartoum "Three Nos" Resolution',
        lines: 7,
      },
    ],
  },
  lesson_7: {
    title: 'GCSE Narrative Account: The Yom Kippur War (October 1973)',
    question:
      'Write a narrative account analysing the key events of the Yom Kippur War (October 1973). [8 marks]',
    stimulus: ['Operation Badr (6 October 1973)', 'The US and Soviet arms airlifts'],
    events: [
      'Sadat expels 15,000 Soviet advisers to prepare an independent military strategy.',
      'Operation Badr: Egyptian troops use water monitors to breach the Bar-Lev Line.',
      'Soviet SAM-6 missile umbrellas inflict devastating losses on the Israeli Air Force.',
      'IDF reserves mobilize, halt the Syrian tank surge at the Valley of Tears, and counter-attack.',
      'General Ariel Sharon leads tanks across the Suez Canal at the Chinese Farm.',
      'Arab OPEC members enact the oil embargo; superpowers face off at DEFCON 3.',
    ],
    keywords: [
      'Anwar Sadat',
      'Operation Badr (6 Oct)',
      'Bar-Lev Line',
      'Water Monitors',
      'SAM-6 Missiles',
      'Valley of Tears',
      'Chinese Farm (Suez Crossing)',
      'Operation Nickel Grass',
      'OPEC Oil Embargo ($3 to $12)',
      'Agranat Commission',
    ],
    phases: [
      {
        label:
          'Phase 1: Operation Badr Surprise Attack & The Breaching of the Bar-Lev Line (6–8 Oct 1973)',
        lines: 7,
      },
      {
        label: 'Phase 2: Israeli Mobilization, Chinese Farm Suez Crossing & Superpower Airlifts',
        lines: 7,
      },
      {
        label: 'Phase 3: Superpower Nuclear Alert (DEFCON 3), OPEC Oil Shock & Ceasefire Legacy',
        lines: 7,
      },
    ],
  },
  lesson_9: {
    title: 'GCSE Narrative Account: The Israeli Invasion of Lebanon (1982–83)',
    question:
      'Write a narrative account analysing the key events of the Israeli invasion of Lebanon (1982–83). [8 marks]',
    stimulus: [
      'Operation Peace for Galilee (June 1982)',
      'The Sabra and Shatila massacre (September 1982)',
    ],
    events: [
      'Abu Nidal gunmen shoot Israeli Ambassador Shlomo Argov in London.',
      'Ariel Sharon launches Operation Peace for Galilee, advancing 60 miles to Beirut.',
      'IDF surrounds West Beirut, subjecting PLO strongholds to a punishing 10-week siege.',
      'Multinational Force oversees the evacuation of Yasser Arafat and 14,000 PLO fighters to Tunis.',
      'Lebanese President-elect Bachir Gemayel is assassinated in a bomb blast.',
      'Christian Phalangist militia massacre hundreds of refugees in Sabra and Shatila.',
    ],
    keywords: [
      'Shlomo Argov',
      'Operation Peace for Galilee',
      'Ariel Sharon',
      'Siege of West Beirut',
      'PLO Evacuation (Tunis)',
      'Bachir Gemayel',
      'Phalangist Militia',
      'Sabra and Shatila',
      '400k Tel Aviv Protest',
      'Kahan Commission (Personal Responsibility)',
    ],
    phases: [
      {
        label: 'Phase 1: Pretext & The Invasion of Lebanon to Besiege Beirut (June – August 1982)',
        lines: 7,
      },
      {
        label:
          'Phase 2: PLO Evacuation to Tunis & The Assassination of Bachir Gemayel (Aug – Sept 1982)',
        lines: 7,
      },
      {
        label:
          'Phase 3: Sabra & Shatila Massacres, Global Moral Outcry & Kahan Commission Resignation',
        lines: 7,
      },
    ],
  },
};

const cmeMasterTimelines = {
  KT1: {
    title: 'Key Topic 1 Master Chronology: The Birth of Israel (1936–1963)',
    lead: 'Master Chronology Challenge: Using your workbook notes and the event bank below, match each pivotal event to its correct year on the timeline and annotate it with one decisive historical consequence.',
    bank: [
      '1936–39: Arab Revolt',
      '1937: Peel Commission (First Partition)',
      '1939: MacDonald White Paper (75k Quota)',
      '1946: King David Hotel Bombing',
      '1947: Sergeants Affair & SS Exodus',
      '1947: UN Resolution 181 (Partition)',
      '1948: Independence Declared & Arab Invasion',
      '1948: First UN Truce & Czech Arms Resupply',
      '1949: Rhodes Armistice (Green Line)',
      '1950: Law of Return Enacted',
      '1953: Qibya Massacre (Unit 101)',
      '1955: Operation Black Arrow & Czech Arms Deal',
      '1956: Nationalisation of Suez & Sèvres Protocol',
      '1956: Suez Crisis & Eisenhower Ultimatum',
    ],
    anchors: [
      { year: '1936–39', label: 'Arab Revolt & 1939 MacDonald White Paper' },
      { year: '1946–47', label: 'King David Hotel, Sergeants Affair & UN Res 181' },
      { year: '1948–49', label: 'Declaration of Israel, 1948–49 War & Green Line' },
      { year: '1950–53', label: 'Law of Return, Mass Migration & Qibya Reprisal' },
      { year: '1955–56', label: 'Black Arrow, Czech Arms & Nationalisation of Suez' },
      { year: 'Late 1956', label: 'Protocol of Sèvres, Suez War & US Financial Veto' },
    ],
  },
  KT2: {
    title: 'Key Topic 2 Master Chronology: The Escalating Conflict (1964–1973)',
    lead: 'Master Chronology Challenge: Using your workbook notes and the event bank below, match each pivotal event to its correct year on the timeline and annotate it with one decisive historical consequence.',
    bank: [
      '1964: Cairo Summit & PLO Formed (Shuqayri)',
      '1966: Samu Raid & Syrian Border Clashes',
      'April 1967: Air Battle over Golan (6 MiGs)',
      'May 1967: Soviet Disinformation & UNEF Expulsion',
      'May 1967: Straits of Tiran Closed by Nasser',
      '5 June 1967: Operation Focus Air Strike',
      '7 June 1967: Capture of East Jerusalem & Western Wall',
      'August 1967: Khartoum Resolution ("Three Nos")',
      'Nov 1967: UN Resolution 242 ("Land for Peace")',
      '1968: Battle of Karameh (Arafat Rises)',
      '1969–70: War of Attrition & Bar-Lev Line',
      "Sept 1970: Dawson's Field & Black September",
      'Sept 1972: Munich Olympics Hostage Massacre',
      'July 1972: Sadat Expels 15,000 Soviet Advisers',
      '6 Oct 1973: Operation Badr Breaches Bar-Lev Line',
      'Oct 1973: Sharon Suez Crossing & OPEC Oil Embargo',
    ],
    anchors: [
      { year: '1964–66', label: 'Creation of PLO, Syrian Border Clashes & Samu Raid' },
      { year: 'May 1967', label: 'Soviet False Reports, UNEF Expelled & Tiran Blockaded' },
      { year: 'June 1967', label: 'Operation Focus, Fall of Jerusalem & Six Day War' },
      { year: 'Late 1967', label: 'Khartoum "Three Nos" & UN Resolution 242' },
      { year: '1968–70', label: "Battle of Karameh, Dawson's Field & Black September" },
      { year: '1972–73', label: 'Munich Olympics Massacre & Soviet Advisers Expelled' },
      { year: 'Oct 1973', label: 'Operation Badr, Yom Kippur War, DEFCON 3 & OPEC Embargo' },
    ],
  },
  KT3: {
    title: 'Key Topic 3 Master Chronology: Attempts at Peace (1974–1995)',
    lead: 'Master Chronology Challenge: Using your workbook notes and the event bank below, match each pivotal event to its correct year on the timeline and annotate it with one decisive historical consequence.',
    bank: [
      '1974: Arafat "Olive Branch" Speech at UN',
      '1974–75: Kissinger Shuttle Diplomacy & Sinai Pacts',
      'June 1975: Suez Canal Reopened by Sadat',
      '1977: Menachem Begin (Likud) Elected PM',
      'Nov 1977: Sadat Addresses Israeli Knesset',
      'Sept 1978: Camp David Accords (Two Frameworks)',
      'March 1979: Treaty of Washington Signed',
      'Oct 1981: Anwar Sadat Assassinated in Cairo',
      'June 1982: Operation Peace for Galilee (Lebanon)',
      'Sept 1982: Sabra and Shatila Massacre (Kahan Report)',
      'Dec 1987: Jabalia Crash Sparks First Intifada',
      '1987: Hamas Founded by Sheikh Yassin',
      'Dec 1988: Arafat Renounces Terrorism in Geneva',
      '1989–92: 400,000 Soviet Jews Immigrate to Israel',
      '1991: Gulf War & Madrid Peace Conference',
      'June 1992: Rabin & Labour Win Israeli Election',
      'Jan–Aug 1993: Secret Oslo Farmhouse Negotiations',
      '13 Sept 1993: Oslo I Accords (White House Handshake)',
      'Feb 1994: Hebron Mosque Massacre (Baruch Goldstein)',
      'Oct 1994: Israel-Jordan Peace Treaty Signed',
      'Sept 1995: Oslo II Partition (Areas A, B, C)',
      '4 Nov 1995: Yitzhak Rabin Assassinated by Yigal Amir',
    ],
    anchors: [
      { year: '1974–75', label: 'Arafat UN Address, Shuttle Diplomacy & Suez Reopened' },
      { year: '1977–79', label: 'Sadat in Jerusalem, Camp David Accords & Peace Treaty' },
      { year: '1981–82', label: 'Sadat Assassinated, Lebanon Invasion & Sabra-Shatila' },
      { year: '1987–88', label: 'Jabalia Crash, First Intifada & Arafat Geneva Renunciation' },
      { year: '1991–93', label: 'Soviet Influx, Gulf War, Madrid & Secret Oslo Backchannel' },
      { year: '1993–94', label: 'Oslo I Handshake, Cairo Agreement & Israel-Jordan Treaty' },
      { year: '1995', label: 'Oslo II (Areas A, B, C) & Rabin Assassinated in Tel Aviv' },
    ],
  },
};

function generateMedievalCastleDraftingPage(lesson) {
  if (!lesson || !lesson.creative_task) return '';
  const ct = lesson.creative_task;
  if (ct.type !== 'architectural_drafting') return '';

  return `
  <div class="creative-drafting-page" style="page-break-before: always; page-break-after: always; box-sizing: border-box; padding: 12px 16px; font-family: 'Inter', sans-serif;">
    <div style="border-bottom: 2px solid #1e293b; padding-bottom: 6px; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 8pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
          Key Stage 3 History &bull; The Norman Conquest (1066–1087)
        </span>
        <span style="font-size: 8pt; font-weight: 700; color: #1e293b; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
          Year 7 &bull; Lesson 2
        </span>
      </div>
      <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14pt; color: #0f172a; margin: 3px 0 4px 0; border: none; padding: 0;">
        ${ct.title}
      </h2>
      <div style="font-size: 8pt; color: #334155; background: #f8fafc; border-left: 3px solid #475569; padding: 4px 8px; border-radius: 3px; line-height: 1.35;">
        <strong>Instructions:</strong> ${ct.briefing}
      </div>
    </div>

    <!-- Central Drawing Canvas: Completely blank white area with clean border -->
    <div style="height: 290px; border: 1.5px solid #334155; border-radius: 6px; background-color: #ffffff; margin-bottom: 8px;">
    </div>

    <!-- 5 Analysis Callouts Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 6px;">
      ${ct.callouts
        .slice(0, 3)
        .map(
          (c) => `
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 5px 7px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-size: 7.8pt; color: #0f172a;">${c.num} ${c.label}</strong>
            <span style="font-size: 6.8pt; font-weight: 700; color: #334155; background: #f1f5f9; padding: 1px 4px; border-radius: 2px; border: 1px solid #e2e8f0;">${c.badge}</span>
          </div>
          <div style="font-size: 7pt; color: #475569; line-height: 1.25; margin-bottom: 3px;">
            ${c.prompt}
          </div>
          <div class="task-lines" style="height: 11px; margin-top: 2px;"></div>
          <div class="task-lines" style="height: 11px; margin-top: 2px;"></div>
        </div>
      `,
        )
        .join('')}
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
      ${ct.callouts
        .slice(3, 5)
        .map(
          (c) => `
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 5px 7px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-size: 7.8pt; color: #0f172a;">${c.num} ${c.label}</strong>
            <span style="font-size: 6.8pt; font-weight: 700; color: #334155; background: #f1f5f9; padding: 1px 4px; border-radius: 2px; border: 1px solid #e2e8f0;">${c.badge}</span>
          </div>
          <div style="font-size: 7pt; color: #475569; line-height: 1.25; margin-bottom: 3px;">
            ${c.prompt}
          </div>
          <div class="task-lines" style="height: 11px; margin-top: 2px;"></div>
          <div class="task-lines" style="height: 11px; margin-top: 2px;"></div>
        </div>
      `,
        )
        .join('')}
    </div>

    <!-- Bottom Evaluation Question (5 generous ruled lines) -->
    ${
      ct.synthesis
        ? `
      <div style="background: #ffffff; border: 1.5px solid #1e293b; border-radius: 6px; padding: 6px 9px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-size: 8pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            ${ct.synthesis.title}
          </strong>
          <span style="font-size: 7pt; font-weight: 700; color: #334155; background: #f1f5f9; padding: 1px 5px; border-radius: 3px; border: 1px solid #cbd5e1;">
            ${ct.synthesis.badge}
          </span>
        </div>
        <div style="font-size: 7.5pt; color: #1e293b; font-weight: 600; margin-bottom: 4px; line-height: 1.3;">
          ${ct.synthesis.question}
        </div>
        ${Array(ct.synthesis.lines || 5)
          .fill('<div class="task-lines" style="height: 11px; margin-top: 3px;"></div>')
          .join('')}
      </div>
    `
        : ''
    }
  </div>
  `;
}

function generateConceptualTriadPage(lesson, unitId) {
  if (!lesson || !lesson.creative_task) return '';
  const ct = lesson.creative_task;
  if (ct.type !== 'conceptual_triad') return '';

  const churchPillar = ct.pillars.find((p) => p.id === 'church') || ct.pillars[0];
  const hippoPillar = ct.pillars.find((p) => p.id === 'hippocrates') || ct.pillars[1];
  const galenPillar = ct.pillars.find((p) => p.id === 'galen') || ct.pillars[2];
  const et = ct.exam_task || {};
  const q3 = et.q3 || null;
  const q4 = et.q4 || (et.question ? et : null);

  return `
  <!-- PAGE 1: FULL VISUAL REVISION GUIDE (LEFT-HAND PAGE) -->
  <div class="creative-triad-page creative-triad-left-page" style="page-break-before: always; page-break-after: always; box-sizing: border-box; padding: 16px 20px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; height: 1123px;">
    <div>
      <!-- Top Header -->
      <div style="border-bottom: 2px solid #1e293b; padding-bottom: 5px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 8pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
            Edexcel GCSE (9–1) History &bull; Paper 1: Medicine in Britain (c.1250–present)
          </span>
          <span style="font-size: 8pt; font-weight: 700; color: #1e293b; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
            Topic 1 &bull; Comprehensive Knowledge Masterclass
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14.5pt; color: #0f172a; margin: 3px 0 4px 0; border: none; padding: 0;">
          ${ct.title}
        </h2>
        <div style="font-size: 7.8pt; color: #334155; background: #f8fafc; border-left: 3.5px solid #475569; padding: 4px 10px; border-radius: 3px; line-height: 1.35;">
          <strong>Core Historical Context:</strong> ${ct.briefing}
        </div>
      </div>

      <!-- Marginal Keywords HUD -->
      <div style="display: flex; flex-wrap: wrap; gap: 4px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 5px; padding: 4px 8px; margin-bottom: 9px; align-items: center;">
        <span style="font-size: 7.2pt; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 4px;">
          High-Yield Terminology:
        </span>
        ${(ct.keywords || []).map((kw) => `<span style="font-size: 6.9pt; background: #e2e8f0; color: #0f172a; padding: 1.5px 6px; border-radius: 3px; font-weight: 600;">${kw}</span>`).join(' ')}
      </div>

      <!-- SECTION 1: THE INTELLECTUAL TRIAD -->
      <!-- APEX PILLAR: The Catholic Church -->
      <div style="background: #ffffff; border: 1.5px solid #334155; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <div>
            <strong style="font-size: 9.5pt; color: #0f172a;">${churchPillar.name}</strong>
            <span style="font-size: 7.5pt; color: #475569; margin-left: 6px;">(${churchPillar.dates})</span>
          </div>
          <span style="font-size: 7.2pt; font-weight: 700; color: #1e293b; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 2px 7px; border-radius: 3px;">
            ${churchPillar.badge}
          </span>
        </div>
        <div style="font-size: 7.4pt; font-weight: 700; color: #334155; margin-bottom: 5px;">
          Institutional Control: ${churchPillar.role}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${churchPillar.core_knowledge
            .map(
              (ck) => `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 5px 8px;">
              <div style="font-size: 7.3pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${ck.q}</div>
              <div style="font-size: 7pt; color: #334155; line-height: 1.3;">${ck.a}</div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- CAUSAL TRANSMISSION VECTORS -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; margin-bottom: 8px;">
        ${ct.vectors
          .map(
            (vec) => `
          <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 5px 8px;">
            <div style="font-size: 7.2pt; font-weight: 700; color: #0f172a; margin-bottom: 2px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
              ${vec.label}
            </div>
            <div style="font-size: 6.9pt; color: #334155; line-height: 1.25;">${vec.text}</div>
          </div>
        `,
          )
          .join('')}
      </div>

      <!-- BOTTOM PILLARS: Hippocrates (Left) & Galen (Right) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 9px;">
        <!-- Hippocrates -->
        <div style="background: #ffffff; border: 1.5px solid #334155; border-radius: 6px; padding: 8px 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 5px;">
            <img src="${hippoPillar.image}" alt="${hippoPillar.name}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #334155; flex-shrink: 0;">
            <div>
              <strong style="font-size: 9pt; color: #0f172a;">${hippoPillar.name}</strong>
              <div style="font-size: 7pt; color: #475569;">${hippoPillar.dates} &bull; <span style="font-weight: 700; color: #1e293b;">${hippoPillar.badge}</span></div>
              <div style="font-size: 7pt; font-weight: 600; color: #334155;">${hippoPillar.role}</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${hippoPillar.core_knowledge
              .map(
                (ck) => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 7px;">
                <div style="font-size: 7.2pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${ck.q}</div>
                <div style="font-size: 6.9pt; color: #334155; line-height: 1.25;">${ck.a}</div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- Galen -->
        <div style="background: #ffffff; border: 1.5px solid #334155; border-radius: 6px; padding: 8px 10px;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 5px;">
            <img src="${galenPillar.image}" alt="${galenPillar.name}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #334155; flex-shrink: 0;">
            <div>
              <strong style="font-size: 9pt; color: #0f172a;">${galenPillar.name}</strong>
              <div style="font-size: 7pt; color: #475569;">${galenPillar.dates} &bull; <span style="font-weight: 700; color: #1e293b;">${galenPillar.badge}</span></div>
              <div style="font-size: 7pt; font-weight: 600; color: #334155;">${galenPillar.role}</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${galenPillar.core_knowledge
              .map(
                (ck) => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 7px;">
                <div style="font-size: 7.2pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">${ck.q}</div>
                <div style="font-size: 6.9pt; color: #334155; line-height: 1.25;">${ck.a}</div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- SECTION 2: SUPERNATURAL, ASTROLOGICAL & ENVIRONMENTAL CAUSES -->
      ${
        ct.supernatural_and_environmental
          ? `
      <div style="margin-bottom: 9px;">
        <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span>Medieval Explanations for Disease: Supernatural &amp; Environmental</span>
          <span style="height: 1px; background: #cbd5e1; flex-grow: 1;"></span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px;">
          ${ct.supernatural_and_environmental
            .map(
              (sec) => `
            <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 6px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 7.2pt; color: #0f172a;">${sec.title}</strong>
                <span style="font-size: 6.4pt; font-weight: 700; color: #475569; background: #f1f5f9; padding: 1px 4px; border-radius: 2px;">${sec.badge}</span>
              </div>
              <div style="font-size: 6.9pt; color: #334155; line-height: 1.28;">${sec.text}</div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
      `
          : ''
      }

      <!-- SECTION 3: MEDIEVAL DIAGNOSTIC TOOLKIT & TRAINING -->
      ${
        ct.diagnostic_toolkit
          ? `
      <div style="margin-bottom: 9px;">
        <div style="font-size: 7.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span>The Physician's Diagnostic Toolkit &amp; Academic Training</span>
          <span style="height: 1px; background: #cbd5e1; flex-grow: 1;"></span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px;">
          ${ct.diagnostic_toolkit
            .map(
              (tool) => `
            <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 6px 8px;">
              <div style="font-size: 7.4pt; font-weight: 700; color: #0f172a; margin-bottom: 2px;">
                ${tool.title}
              </div>
              <div style="font-size: 7.1pt; color: #334155; line-height: 1.3;">${tool.text}</div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
      `
          : ''
      }

      <!-- SECTION 4: SYNOPTIC CROSS-ERA THEMATIC BRIDGE -->
      ${
        ct.cross_era_links
          ? `
      <div style="margin-bottom: 9px;">
        <div style="font-size: 7.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <span>Synoptic Cross-Era Links: Medieval vs. Renaissance (c.1500–c.1700)</span>
          <span style="height: 1px; background: #cbd5e1; flex-grow: 1;"></span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px;">
          ${ct.cross_era_links
            .map(
              (link) => `
            <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 6px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                <strong style="font-size: 7.4pt; color: #0f172a;">${link.title}</strong>
                <span style="font-size: 6.6pt; font-weight: 700; color: #1e293b; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 1px 4px; border-radius: 2px;">${link.badge}</span>
              </div>
              <div style="font-size: 7.1pt; color: #334155; line-height: 1.3;">${link.text}</div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
      `
          : ''
      }
    </div>

    <!-- BOTTOM SYNTHESIS: 3 CORE EXAM ARGUMENTS -->
    <div style="background: #f8fafc; border: 1.5px solid #1e293b; border-radius: 6px; padding: 7px 10px; margin-top: auto;">
      <div style="font-size: 7.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
        3 Key Causal Factors: Why Ideas About Cause Remained Stagnant (c.1250–c.1500)
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px;">
        ${ct.takeaway_points
          .map(
            (tp, i) => `
          <div style="font-size: 7.1pt; color: #334155; line-height: 1.3; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 7px;">
            <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Factor ${i + 1}:</strong>
            ${tp}
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  </div>

  <!-- PAGE 2: DEDICATED EXAM PRACTICE PAGE (RIGHT-HAND PAGE) -->
  <div class="creative-exam-page creative-triad-right-page" style="page-break-before: always; page-break-after: always; box-sizing: border-box; padding: 16px 22px; font-family: 'Inter', sans-serif; background-color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; height: 1123px;">
    <div>
      <!-- Top Header -->
      <div style="border-bottom: 2px solid #1e293b; padding-bottom: 5px; margin-bottom: 9px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 8pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">
            Edexcel GCSE (9–1) History &bull; Paper 1 (Section B): Medicine in Britain
          </span>
          <span style="font-size: 8pt; font-weight: 700; color: #1e293b; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
            Assessment Total: 16 Marks
          </span>
        </div>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 14.5pt; color: #0f172a; margin: 3px 0 4px 0; border: none; padding: 0;">
          Exam Practice: Similarity/Difference &amp; Analytical Explanation
        </h2>
      </div>

      <!-- PART A: QUESTION 3 (4 MARKS) -->
      ${
        q3
          ? `
      <div style="margin-bottom: 10px;">
        <div style="background: #ffffff; border: 1.5px solid #334155; border-radius: 6px; padding: 7px 12px; margin-bottom: 5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-size: 8.8pt; color: #0f172a;">${q3.board || 'Question 3'}</strong>
            <span style="font-size: 7.8pt; font-weight: 800; color: #0f172a; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 2px 7px; border-radius: 3px;">
              [4 Marks]
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 10pt; font-weight: 700; color: #0f172a; line-height: 1.35; margin-bottom: 4px;">
            ${q3.question}
          </div>
          <div style="font-size: 7.2pt; color: #334155; background: #f8fafc; border-left: 3px solid #334155; padding: 3px 8px; border-radius: 3px;">
            <strong>Strategy:</strong> ${q3.guidance || 'Timing: 5 mins • 1 developed comparative PEEL paragraph with specific knowledge from both eras.'}
          </div>
        </div>
        <!-- Q3 Ruled lines (8 lines) -->
        <div style="margin-bottom: 6px;">
          ${Array(8)
            .fill(
              '<div class="task-lines" style="height: 20px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>',
            )
            .join('')}
        </div>
      </div>
      `
          : ''
      }

      <!-- PART B: QUESTION 4 (12 MARKS) -->
      ${
        q4
          ? `
      <div style="margin-bottom: 8px;">
        <div style="background: #ffffff; border: 1.5px solid #1e293b; border-radius: 6px; padding: 7px 12px; margin-bottom: 5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <strong style="font-size: 8.8pt; color: #0f172a;">${q4.board || 'Question 4'}</strong>
            <span style="font-size: 7.8pt; font-weight: 800; color: #0f172a; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 2px 7px; border-radius: 3px;">
              [12 Marks]
            </span>
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 10pt; font-weight: 700; color: #0f172a; line-height: 1.35; margin-bottom: 4px;">
            ${q4.question}
          </div>
          <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 4px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
            <span style="font-size: 7.3pt; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.3px;">
              Stimulus Tracking Checklist:
            </span>
            <div style="display: flex; gap: 10px; align-items: center;">
              ${(q4.stimulus || ['The Catholic Church', 'Galen'])
                .map(
                  (s) => `
                <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 7.4pt; font-weight: 600; color: #0f172a; background: #ffffff; border: 1px solid #94a3b8; padding: 1.5px 6px; border-radius: 3px;">
                  <span style="display: inline-block; width: 10px; height: 10px; border: 1.5px solid #1e293b; border-radius: 2px; background: #ffffff;"></span>
                  ${s}
                </span>
              `,
                )
                .join('')}
              <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 7.4pt; font-weight: 700; color: #0f172a; background: #ffffff; border: 1px solid #94a3b8; padding: 1.5px 6px; border-radius: 3px;">
                <span style="display: inline-block; width: 10px; height: 10px; border: 1.5px solid #1e293b; border-radius: 2px; background: #ffffff;"></span>
                Own Knowledge (P3)
              </span>
            </div>
          </div>
          <div style="font-size: 7.1pt; color: #475569; font-style: italic; margin-bottom: 3px;">
            ${q4.note || '(You must also use information of your own.)'} [12 marks]
          </div>
          <div style="font-size: 7.2pt; color: #334155; background: #f8fafc; border-left: 3px solid #1e293b; padding: 3px 8px; border-radius: 3px;">
            <strong>Strategy:</strong> ${q4.guidance || 'Timing: 18 mins • 3 fully developed PEEL paragraphs (P1: Church, P2: Galen, P3: Own Knowledge).'}
          </div>
        </div>
        <!-- Q4 Ruled lines (24 lines) -->
        <div style="margin-bottom: 6px;">
          ${Array(24)
            .fill(
              '<div class="task-lines" style="height: 20px; border-bottom: 1px dotted #94a3b8; margin-top: 1px;"></div>',
            )
            .join('')}
        </div>
      </div>
      `
          : ''
      }
    </div>

    <!-- EDEXCEL MARK SCHEME RUBRIC & FEEDBACK BOX -->
    <div style="border: 1.5px solid #cbd5e1; border-radius: 6px; background: #ffffff; padding: 6px 10px; margin-top: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="font-size: 7.5pt; color: #0f172a; text-transform: uppercase;">Edexcel Paper 1 Assessment &bull; Marking Criteria</strong>
        <div style="display: flex; gap: 10px;">
          <span style="font-size: 7.8pt; font-weight: 700; color: #0f172a; border: 1px solid #94a3b8; padding: 2px 7px; border-radius: 3px; background: #f8fafc;">
            Q3: &nbsp;&nbsp;&nbsp;&nbsp; / 4
          </span>
          <span style="font-size: 7.8pt; font-weight: 700; color: #0f172a; border: 1px solid #94a3b8; padding: 2px 7px; border-radius: 3px; background: #f8fafc;">
            Q4: &nbsp;&nbsp;&nbsp;&nbsp; / 12
          </span>
          <span style="font-size: 7.8pt; font-weight: 800; color: #0f172a; border: 1.5px solid #1e293b; padding: 2px 9px; border-radius: 3px; background: #f1f5f9;">
            Total: &nbsp;&nbsp;&nbsp;&nbsp; / 16
          </span>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px; font-size: 6.6pt; color: #475569; line-height: 1.22;">
        <div style="background: #f8fafc; padding: 3px 5px; border-radius: 3px; border: 1px solid #e2e8f0;">
          <strong style="color: #0f172a; display: block;">Q4 L1 (1–3 m):</strong> Generalised statements; simple points with limited knowledge.
        </div>
        <div style="background: #f8fafc; padding: 3px 5px; border-radius: 3px; border: 1px solid #e2e8f0;">
          <strong style="color: #0f172a; display: block;">Q4 L2 (4–6 m):</strong> Descriptive explanation of 1–2 factors with basic links to question.
        </div>
        <div style="background: #f8fafc; padding: 3px 5px; border-radius: 3px; border: 1px solid #e2e8f0;">
          <strong style="color: #0f172a; display: block;">Q4 L3 (7–9 m):</strong> Explains 2 factors with accurate detail and clear causal reasoning.
        </div>
        <div style="background: #f1f5f9; padding: 3px 5px; border-radius: 3px; border: 1px solid #cbd5e1;">
          <strong style="color: #0f172a; display: block;">Q4 L4 (10–12 m):</strong> Analytical explanation of 3 factors (stimuli + own); sustained causal focus.
        </div>
      </div>
      <div style="margin-top: 4px; font-size: 7.2pt; color: #334155;">
        <strong>Teacher / Self Feedback:</strong> <span style="border-bottom: 1px solid #94a3b8; display: inline-block; width: 78%; height: 10px;"></span>
      </div>
    </div>
  </div>
  `;
}

function generateCmeWarTimelineCanvas(lesson) {
  if (!lesson) return '';
  let cfg = null;
  if (lesson.id === 'lesson_2' || (lesson.title && lesson.title.includes('KT 1.1')))
    cfg = cmeWarNarrativeConfigs.lesson_2;
  else if (lesson.id === 'lesson_4' || (lesson.title && lesson.title.includes('KT 1.3')))
    cfg = cmeWarNarrativeConfigs.lesson_4;
  else if (lesson.id === 'lesson_5' || (lesson.title && lesson.title.includes('KT 2.1')))
    cfg = cmeWarNarrativeConfigs.lesson_5;
  else if (lesson.id === 'lesson_7' || (lesson.title && lesson.title.includes('KT 2.3')))
    cfg = cmeWarNarrativeConfigs.lesson_7;
  else if (lesson.id === 'lesson_9' || (lesson.title && lesson.title.includes('KT 3.2')))
    cfg = cmeWarNarrativeConfigs.lesson_9;

  if (!cfg) return '';
  return `
  <div style="page-break-before: always; page-break-after: always; padding: 10px 14px; font-family: 'Inter', sans-serif;">
    <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 8.5pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">GCSE Exam Masterclass &bull; Question 2 [8 Marks]</span>
        <span style="font-size: 8pt; font-weight: 700; color: #64748b;">Target Time: 10 mins</span>
      </div>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 14pt; color: #1e3a8a; margin: 3px 0 5px 0;">${cfg.question}</h2>
      <div style="font-size: 8pt; color: #334155; background: #eff6ff; border-left: 3px solid #3b82f6; padding: 4px 8px; border-radius: 4px;">
        <strong>Edexcel Stimulus Clues:</strong> You may use the following in your answer: &bull; <em>${cfg.stimulus[0]}</em> &bull; <em>${cfg.stimulus[1]}</em>. <span style="color: #b91c1c; font-weight: 600;">You must also use information of your own.</span>
      </div>
    </div>

    <!-- Condensed Top Box: 6 Jumbled Events + High-Yield Fact Bank -->
    <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 8px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; margin-bottom: 8px;">
      <div>
        <div style="font-size: 8pt; font-weight: 800; color: #1e3a8a; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px;">
          <i class="fa-solid fa-arrow-down-1-9"></i> Chronological Challenge (Number 1–6)
        </div>
        <div style="font-size: 7.5pt; line-height: 1.3; color: #1e293b;">
          ${cfg.events.map((ev) => `<div style="margin-bottom: 2px; display: flex; align-items: flex-start; gap: 4px;"><span style="display: inline-block; width: 16px; height: 13px; border: 1px solid #94a3b8; border-radius: 3px; background: #fff; text-align: center; font-size: 6.5pt; font-weight: bold; flex-shrink: 0;">&nbsp;</span> <span>${ev}</span></div>`).join('')}
        </div>
      </div>
      <div style="border-left: 1px solid #cbd5e1; padding-left: 8px;">
        <div style="font-size: 8pt; font-weight: 800; color: #0284c7; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px;">
          <i class="fa-solid fa-key"></i> High-Yield Fact & Keyword Bank
        </div>
        <div style="font-size: 7.5pt; line-height: 1.35; color: #334155;">
          ${cfg.keywords.map((kw) => `<span style="display: inline-block; background: #e2e8f0; padding: 1px 4px; border-radius: 3px; margin: 1px; font-weight: 600;">${kw}</span>`).join(' ')}
        </div>
      </div>
    </div>

    <!-- Wide Open Ruled Lines Across 3 Phased Nodes -->
    <div>
      ${cfg.phases
        .map(
          (ph) => `
        <div style="margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
            <span style="background: #1e3a8a; color: white; padding: 2px 7px; border-radius: 10px; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${ph.label}</span>
            <span style="font-size: 7pt; color: #64748b; font-style: italic;">Cause &bull; Action &bull; Consequence &bull; Link</span>
          </div>
          ${Array(ph.lines).fill('<div class="task-lines-large"></div>').join('')}
        </div>
      `,
        )
        .join('')}
    </div>
  </div>
  `;
}

function generateCmeMasterRevisionTimeline(periodName) {
  const cfg = cmeMasterTimelines[periodName];
  if (!cfg) return '';
  return `
  <div style="page-break-before: always; page-break-after: always; padding: 12px 15px; font-family: 'Inter', sans-serif;">
    <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 8px; text-align: center;">
      <div style="font-size: 8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 1px;">Master Revision & Chronology Retrieval</div>
      <h2 style="font-family: 'Playfair Display', serif; font-size: 15pt; color: #1e3a8a; margin: 3px 0;">${cfg.title}</h2>
      <p style="font-size: 8pt; color: #475569; margin: 0; font-style: italic;">${cfg.lead}</p>
    </div>

    <!-- Condensed Master Event Bank -->
    <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; margin-bottom: 10px;">
      <div style="font-size: 7.5pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px; letter-spacing: 0.5px;">
        <i class="fa-solid fa-layer-group"></i> Master Chronology Event Bank (Match & Deploy)
      </div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px 10px; font-size: 7pt; color: #334155; line-height: 1.3;">
        ${cfg.bank.map((b) => `<div>&bull; ${b}</div>`).join('')}
      </div>
    </div>

    <!-- Ruled Timeline Anchors Spine -->
    <div>
      ${cfg.anchors
        .map(
          (a) => `
        <div style="display: flex; gap: 10px; margin-bottom: 8px; align-items: flex-start;">
          <div style="flex-shrink: 0; width: 75px; text-align: right;">
            <span style="background: #1e40af; color: white; font-weight: 800; font-size: 8pt; padding: 2px 6px; border-radius: 4px; display: inline-block;">${a.year}</span>
          </div>
          <div style="flex-grow: 1; border-left: 2px solid #0284c7; padding-left: 8px; padding-bottom: 1px;">
            <div style="font-size: 8pt; font-weight: 700; color: #1e293b; margin-bottom: 1px;">${a.label}</div>
            <div style="font-size: 7pt; color: #64748b; margin-bottom: 1px;">Specific Historical Details & Key Consequence:</div>
            <div class="task-lines-large"></div>
            <div class="task-lines-large"></div>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  </div>
  `;
}

allDirs.forEach((unitId) => {
  console.log(`Processing workbooks for unit: ${unitId}`);
  let canonicalPath = path.join(PATHS.ROOT, 'units', unitId, 'data.js');
  let dataPath = fs.existsSync(canonicalPath)
    ? canonicalPath
    : path.join(publicUnitsDir, unitId, 'data.js');
  if (!fs.existsSync(dataPath)) return;

  let dataContent;
  try {
    dataContent = fs.readFileSync(dataPath, 'utf8');
  } catch (err) {
    console.warn(`⚠️ Warning: Could not read data.js for ${unitId}. Skipping.`, err.message);
    return;
  }
  let startIndex = dataContent.indexOf('{');
  if (startIndex === -1) {
    console.log(`Skipping workbook generation for ${unitId} (no opening brace found).`);
    return;
  }
  const endIndex = dataContent.lastIndexOf('}');
  if (endIndex === -1) return;

  const jsonStr = dataContent.substring(startIndex, endIndex + 1);
  let unitData;
  try {
    unitData = eval('(function(){ const mock_exams=[]; return ' + jsonStr + ';})()');
  } catch (e) {
    console.error(`Error parsing data.js for ${unitId}:`, e.message);
    return;
  }

  if (!unitData.lessons) return;

  const markersPath = path.join(PATHS.ROOT, 'scratch', `pdf_markers_${unitId}.json`);
  let pdfMarkers = [];
  if (fs.existsSync(markersPath)) {
    try {
      pdfMarkers = JSON.parse(fs.readFileSync(markersPath, 'utf8'));
    } catch (e) {
      console.error(`Error reading pdf markers for ${unitId}:`, e.message);
    }
  }

  unitData.lessons.forEach((lesson, lIdx) => {
    if (lesson.exam_practice || lesson.extended) {
      if (lesson.tasks) {
        lesson.tasks = lesson.tasks.filter((t) => {
          let txt = t.question || t.text || t.instruction || '';
          return !txt.toLowerCase().includes('lesson consolidation');
        });
      }
    }
    if (lesson.tasks) {
      lesson.tasks.sort((a, b) => {
        let txtA = a.question || a.text || a.instruction || '';
        let txtB = b.question || b.text || b.instruction || '';
        let matchA = txtA.match(/Q(\d+)/i);
        let matchB = txtB.match(/Q(\d+)/i);
        if (matchA && matchB) {
          return parseInt(matchA[1]) - parseInt(matchB[1]);
        }
        return 0;
      });
    }
    if (lesson.questions) {
      lesson.questions.sort((a, b) => {
        let txtA = a.question || a.text || '';
        let txtB = b.question || b.text || '';
        let matchA = txtA.match(/Q(\d+)/i);
        let matchB = txtB.match(/Q(\d+)/i);
        if (matchA && matchB) {
          return parseInt(matchA[1]) - parseInt(matchB[1]);
        }
        return 0;
      });
    }

    let allVideos = [];
    let imgTags = '';
    let sources = [];
    let interpretations = [];
    let sourceCharCode = 65;
    if (typeof sanitizeLessonData === 'function') sanitizeLessonData(lesson);

    const startMarker = pdfMarkers.find((m) => m.marker === `L${lIdx}_Start`);
    if (startMarker) {
      lesson.startPage = startMarker.page;
    }

    if (lesson.sources) {
      lesson.sources.forEach((source, sIdx) => {
        const markerKey = `L${lIdx}_Source_${sIdx}`;
        const markerObj = pdfMarkers.find((m) => m.marker === markerKey);
        if (markerObj) {
          source.page = markerObj.page;
        }
      });
    }

    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach((block, bIdx) => {
        if (block.tasks) {
          block.tasks.forEach((task, tIdx) => {
            const markerKey = `L${lIdx}_Task_${bIdx}_${tIdx}`;
            const markerObj = pdfMarkers.find((m) => m.marker === markerKey);
            if (markerObj) {
              task.page = markerObj.page;
            }
          });
        }
        if (block.extended) {
          const markerKey = `L${lIdx}_Extended_${bIdx}`;
          const markerObj = pdfMarkers.find((m) => m.marker === markerKey);
          if (markerObj) {
            block.extended.page = markerObj.page;
          }
        }
      });
    }
  });

  let workbooksToGenerate = [];
  if (unitData.workbooks && unitData.workbooks.length > 0) {
    workbooksToGenerate = unitData.workbooks.map((wb) => ({
      name: wb.id,
      title: wb.title,
      image: wb.image,
      filter: (l) => {
        const prefix = wb.prefix || '';
        if (unitId === 'cme_new') {
          const normP = prefix.replace(/\s+/g, '');
          const normT = (l.title || '').replace(/\s+/g, '');
          return (
            l.title.startsWith(prefix) ||
            normT.startsWith(normP) ||
            (l.id && l.id.startsWith(prefix))
          );
        }
        return l.title.startsWith(prefix) || (l.id && l.id.startsWith(prefix));
      },
    }));
  } else {
    // Generate one comprehensive workbook for the unit
    workbooksToGenerate = [
      {
        name: 'full',
        title: unitData.title,
        filter: () => true,
      },
    ];
  }

  const htmlHead = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pupil Workbook - ${unitId}</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
      
    @page { size: A4 portrait; margin: 15mm 15mm 25mm 15mm; }
    body { font-family: 'Georgia', 'Garamond', serif; font-size: 11pt; line-height: 1.4; color: #1e293b;  }
    h1, h2, h3, h4, h5, h6, strong, .do-now-q, th { font-family: 'Inter', 'Helvetica Neue', 'Arial', sans-serif; }
    h1 { font-family: 'Playfair Display', serif; font-size: 30pt; text-align: center; margin-top: 80px; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
    h2 { font-size: 18pt; color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 15px; page-break-after: auto; }
    h4 { font-size: 11pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: avoid; }
    h3 { font-size: 13pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: auto; }
    .narrative-block { margin-bottom: 10pt; text-align: justify; orphans: 3; widows: 3; color: #334155; }
    .task-box { margin-top: 22px; margin-bottom: 16px; width: 100%; page-break-inside: auto !important; }
    ${
      unitId === 'cme_new'
        ? `
    .task-box.consolidation-box,
    .consolidation-box,
    .task-box.historians-corner-box,
    .task-box.no-break,
    .task-box[style*="border: 1.5px solid"],
    .exit-ticket-box,
    .dirt-box {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }
    `
        : ''
    }
    .task-lines { border-bottom: 1px solid #cbd5e1; height: 7.5mm; margin-top: 0px; box-sizing: border-box; }
    .task-lines-large { border-bottom: 1px solid #cbd5e1; height: 8mm; margin-top: 0px; box-sizing: border-box; }
    .dirt-box { margin-top: 20px; margin-bottom: 10px; border: 2px dashed #94a3b8; border-radius: 8px; padding: 15px; background-color: #f8fafc; page-break-inside: avoid; }
    .do-now-box { border-top: 2px solid #e2e8f0; padding-top: 10px; margin-top: 10px; margin-bottom: 10px; width: 100%; page-break-inside: auto; }
    .do-now-q { font-weight: 600; margin-bottom: 8px; color: #0f172a; }
    .source-container { border-top: 2px solid #e2e8f0; padding-top: 10px; margin-top: 10px; margin-bottom: 10px; text-align: center; page-break-inside: auto; }
    .source-container img { max-height: 250px !important; object-fit: contain !important; display: block; margin: 0 auto; }
    .source-caption { font-size: 9.5pt; color: #64748b; font-style: italic; margin-top: 10px; text-align: center; font-family: 'Inter', sans-serif; }
    .cover-image { width: 100%; max-width: 600px; height: auto; margin: 40px auto; display: block; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    table { page-break-inside: avoid; width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; }
    th {  color: white; padding-top: 12px; padding-bottom: 12px; font-weight: 600; text-align: left; border-right: 1px solid #3b82f6; }
    td { border-bottom: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; padding-top: 5px; padding-bottom: 5px; }
    tr:last-child td { border-bottom: none; }
    td:last-child, th:last-child { border-right: none; }
    tbody tr:nth-child(even) {  }
    .grading-footer { margin-top: 30px; padding-top: 15px; font-size: 9.5pt; color: #555; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #ccc; page-break-inside: auto; }
    .grading-boxes { display: flex; justify-content: space-between; }
    .grade-box { display: flex; align-items: center; gap: 5px; }
    .grade-box input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; border: 1px solid #777; border-radius: 2px;  }
    .teacher-comment { border-bottom: 1px solid #777; width: 100%; height: 20px; display: inline-block; margin-top: 5px; }
    @media print { body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } * { box-shadow: none !important; border-radius: 0 !important; }
        img { max-width: 100% !important; object-fit: contain !important;  }
        ${
          unitId === 'cme_new'
            ? `
        .svg-diagram, img[src$=".svg"] {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          max-height: 480px !important;
          width: auto !important;
          max-width: 100% !important;
          object-fit: contain !important;
          margin: 10px auto !important;
          display: block !important;
        }
        `
            : ''
        }
        .source-container { page-break-inside: auto; }
        .narrative-block { page-break-inside: auto; }
        .task-box { page-break-inside: auto !important; }
        ${
          unitId === 'cme_new'
            ? `
        .task-box.consolidation-box,
        .consolidation-box,
        .task-box.historians-corner-box,
        .task-box.no-break,
        .task-box[style*="border: 1.5px solid"],
        .exit-ticket-box,
        .dirt-box {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        `
            : ''
        }
        h1, h2, h3, h4, h5, h6 { page-break-after: auto; }
        div[style*="display: none"] { display: block !important; }
        button[onclick*="display='none'"] { display: none !important; }
      }
      img { max-width: 100% !important; object-fit: contain !important;  }
      .source-container {  }
    }
</style>
</head>
<body>
`;

  workbooksToGenerate.forEach((period) => {
    let html = htmlHead;
    const periodLessons = unitData.lessons.filter(period.filter);
    if (periodLessons.length === 0) return;
    const periodTitle = period.title;
    const periodName = period.name;

    let bannerQuestion = unitData.enquiry || 'Student Workbook';
    if (periodName === 'medieval')
      bannerQuestion = 'How much did medicine really change in Medieval England?';
    else if (periodName === 'renaissance')
      bannerQuestion = 'How much did medicine really change during the Medical Renaissance?';
    else if (periodName === '18th_19th')
      bannerQuestion = 'How much did medicine really change in 18th and 19th Century Britain?';
    else if (periodName === 'modern')
      bannerQuestion = 'How much did medicine really change in Modern Britain?';
    else if (periodName === 'western_front')
      bannerQuestion = 'How did treatments and the trenches develop on the Western Front?';

    let appendixData = [];

    let progressTrackerRows = '';
    periodLessons.forEach((l, i) => {
      const isAssessment = l.title && l.title.startsWith('End of Unit Assessment');
      const label = isAssessment ? `Assessment: ${l.title}` : `L${i + 1}: ${l.title}`;
      const bg = isAssessment ? '' : 'background-color: #f1f5f9;';
      progressTrackerRows += `<tr style="${bg}"><td style="border: 1px solid #333; padding: 4px 6px; font-weight:bold;">${label}</td><td style="border: 1px solid #333; padding: 4px 6px;"></td><td style="border: 1px solid #333; padding: 4px 6px;"></td><td style="border: 1px solid #333; padding: 4px 6px;"></td></tr>\n`;
    });

    let imageToUse =
      period.image || unitData.cover_image || unitData.homepage_background || unitData.banner;
    let heroImgSrc = imageToUse
      ? typeof resolveAssetPath === 'function'
        ? resolveAssetPath(imageToUse, 2)
        : `../..${imageToUse.startsWith('/') ? imageToUse : '/' + imageToUse}`
      : '';
    let heroHtml = heroImgSrc
      ? `<img src="${heroImgSrc}" style="max-height: 40vh; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">`
      : '';
    if (unitId === 'edexcel_medicine') {
      // Period-specific authentic cover images
      const medicinePanoMap = {
        medieval: '../../units/edexcel_medicine/assets/authentic_medieval.jpg',
        renaissance: '../../units/edexcel_medicine/assets/authentic_renaissance.jpg',
        '18th_19th': '../../units/edexcel_medicine/assets/authentic_18th_19th.jpg',
        modern: '../../units/edexcel_medicine/assets/authentic_modern.jpg',
        western_front: '../../units/edexcel_medicine/assets/authentic_western_front.jpg',
      };

      // Period-specific Edexcel enquiry questions (baked into generator — do not use generic title)
      const medicineEnquiryMap = {
        medieval:
          'Why did medieval medicine change so little — and what finally broke the deadlock?',
        renaissance: 'Did the Renaissance truly revolutionise medicine, or was it all talk?',
        '18th_19th': 'Was the 19th century the real turning point for medicine in Britain?',
        modern:
          'Why has medicine advanced more in the 20th century than in all previous history combined?',
        western_front: 'How did the horror of the Western Front both damage and advance medicine?',
      };

      // Period-specific Edexcel specification bullet points for page 2
      const medicineSpecMap = {
        medieval: {
          heading: 'Edexcel Specification: c1250–c1500',
          bullets: [
            '<strong>1. Causes of disease:</strong> Supernatural/religious explanations, Astrology, Four Humours, and Miasma.',
            '<strong>2. Prevention and treatment:</strong> Religious actions, bloodletting, purging, purifying air.',
            '<strong>3. Medical care:</strong> The role of physicians, apothecaries, barber surgeons, and hospitals.',
            '<strong>4. Case Study: The Black Death (1348):</strong> Beliefs about its causes, treatments, and prevention.',
          ],
        },
        renaissance: {
          heading: 'Edexcel Specification: c1500–c1700',
          bullets: [
            '<strong>1. Causes of disease:</strong> Continuity of the Four Humours; new ideas from Vesalius and Harvey.',
            '<strong>2. Treatments:</strong> Continuity of Galenic remedies; new chemical cures (Paracelsus).',
            '<strong>3. Impact of the Renaissance:</strong> The printing press, the Royal Society, and scientific method.',
            '<strong>4. Case Study: The Great Plague (1665):</strong> Causes, responses, and impact.',
          ],
        },
        '18th_19th': {
          heading: 'Edexcel Specification: c1700–c1900',
          bullets: [
            '<strong>1. Causes of disease:</strong> From miasma to germ theory (Pasteur, Koch).',
            '<strong>2. Prevention:</strong> Jenner and the smallpox vaccine; public health reform.',
            '<strong>3. Treatment:</strong> Simpson and anaesthetics; Lister and antiseptics; Nightingale and nursing.',
            '<strong>4. Case Study: Cholera and the Broad Street Pump (Snow, 1854).</strong>',
          ],
        },
        modern: {
          heading: 'Edexcel Specification: c1900–present',
          bullets: [
            '<strong>1. Causes of disease:</strong> Lifestyle factors, genetics, and the role of the NHS.',
            '<strong>2. Prevention:</strong> Immunisation programmes, screening, and public health campaigns.',
            '<strong>3. Treatment:</strong> Fleming and penicillin; blood transfusions; transplants; radiotherapy.',
            '<strong>4. Modern Britain:</strong> The founding of the NHS (1948) and its ongoing impact.',
          ],
        },
        western_front: {
          heading: 'Edexcel Specification: The Western Front, c1914–c1918',
          bullets: [
            '<strong>1. Nature of warfare:</strong> The scale of casualties and the challenge for medical services.',
            '<strong>2. Surgical advances:</strong> Blood transfusions, X-rays, and the development of triage.',
            '<strong>3. Treatment of wounds:</strong> Shell shock, infection, and the Thomas splint.',
            '<strong>4. The RAMC and FANY:</strong> The organisation of medical care on the Western Front.',
          ],
        },
      };

      const medicineCoverImgSrc =
        heroImgSrc || medicinePanoMap[periodName] || medicinePanoMap.medieval;
      const medicineEnquiry = medicineEnquiryMap[periodName] || medicineEnquiryMap.medieval;
      const medicineSpec = medicineSpecMap[periodName] || medicineSpecMap.medieval;

      // Cover page: just the image, no spec box
      heroHtml = `<div style="flex: 1; overflow: hidden; display: flex; align-items: center; justify-content: center; background-color: #f8fafc; min-height: 0;">
  <img src="${medicineCoverImgSrc}" style="max-height: 100%; max-width: 100%; width: 100%; object-fit: cover; display: block;">
</div>`;

      // Store spec and enquiry for injection into page 2 below
      unitData._medicineEnquiry = medicineEnquiry;
      unitData._medicineSpecHtml = `<div style="border: 2px solid #1e3a8a; padding: 10px 15px; margin-bottom: 12px; background-color: #f0f4ff; flex-shrink: 0; border-radius: 4px;">
        <h3 style="color: #1e3a8a; margin: 0 0 6px 0; font-size: 12pt;">${medicineSpec.heading}</h3>
        <ul style="font-size: 10pt; line-height: 1.4; margin: 0; padding-left: 18px;">${medicineSpec.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      </div>`;
    }

    html += `
    <div class="cover-page" style="page-break-after: always; display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch; padding: 0; height: 95vh; box-sizing: border-box; background: #fff; border: 4px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); position: relative;">
      ${heroHtml}
      
      <div style="background-color: #1e293b; color: #ffffff; padding: 8px 20px; font-size: 11pt; letter-spacing: 2px; text-transform: uppercase; text-align: center; font-weight: bold; width: 100%; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center;">
        <span style="flex: 1; text-align: center;">Meoncross School | History Department</span>
        <span style="font-size: 8.5pt; font-weight: 600; letter-spacing: 1px; opacity: 0.9; background: rgba(255,255,255,0.18); padding: 2px 8px; border-radius: 4px; white-space: nowrap;">Edition ${unitData.edition || '2026.1'}</span>
      </div>
      
      <div style="padding: 20px 30px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: flex-start;">
        ${(function () {
          // For edexcel_medicine, use the period-specific enquiry question baked into the generator
          const finalCoverTitle =
            unitId === 'edexcel_medicine' && unitData._medicineEnquiry
              ? unitData._medicineEnquiry
              : unitData.enquiry || unitData.enquiry_question
                ? unitData.enquiry || unitData.enquiry_question
                : periodTitle === 'Complete Unit'
                  ? unitData.title
                  : periodTitle;
          const titleFontSize =
            finalCoverTitle.length > 50 ? '28pt' : finalCoverTitle.length > 35 ? '34pt' : '38pt';
          return `<h1 class="unit-title" style="font-family: 'Playfair Display', 'Garamond', serif; font-size: ${titleFontSize}; margin: 10px 0; color: #0f172a; font-weight: 800; line-height: 1.1;">
            ${finalCoverTitle}
          </h1>`;
        })()}
        <h2 style="font-family: 'Playfair Display', 'Garamond', serif; font-size: 20pt; margin: 0 0 15px 0; color: #475569; font-weight: 600; font-style: italic; border: none; padding-bottom: 0;">
          ${unitData.title} ${periodTitle && periodTitle !== 'Complete Unit' && periodTitle !== unitData.title ? ` - ${periodTitle}` : ''}
        </h2>
        
        
        
        <div class="student-details" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 25px 40px 45px 40px; margin: auto auto 10px auto; width: 75%; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); text-align: center;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px;">
                <span style="font-weight: 600; color: #334155; font-size: 13pt;">Scholar:</span>
                <span style="border-bottom: 1.5px solid #94a3b8; width: 75%; display: inline-block;"></span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <span style="font-weight: 600; color: #334155; font-size: 13pt;">Class:</span>
                <span style="border-bottom: 1.5px solid #94a3b8; width: 75%; display: inline-block;"></span>
            </div>
        </div>
      </div>
    </div>`;
    html += `
    <div style="page-break-after: always; page-break-inside: avoid; display: flex; flex-direction: column; height: 95vh; overflow: hidden;">
      ${unitId === 'edexcel_medicine' && unitData._medicineSpecHtml ? unitData._medicineSpecHtml : ''}
      <h2 style="margin: 0; color: #1e3a8a; font-size: 16pt; text-transform: uppercase; letter-spacing: 1px;">PROGRESS & ASSESSMENT TRACKER <span style="float: right; font-size: 0.8em; font-weight: normal; color: #333;">Target Grade: _________</span></h2>
      
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85em; line-height: 1.2; margin-bottom: 8px;">
        <tbody>

          ${
            !['weimar_nazi_germany', 'cme_new', 'edexcel_medicine', 'eee'].includes(unitId)
              ? `
          <tr>
            <td style="border: 1px solid #333; padding: 4px 6px; font-weight: bold; background-color: #f1f5f9;">Level</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">Emerging (1-2)</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">Emerging+ (3)</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">Expected (4-5)</td>
            <td style="border: 1px solid #333; padding: 4px 6px;">Expected+ (6-7) / Greater Depth (8-9)</td>
          </tr>
          `
              : `
          <tr>
            <td style="border: 1px solid #333; padding: 4px 6px; font-weight: bold; background-color: #f1f5f9;">Grade</td>
            <td style="border: 1px solid #333; padding: 4px 6px;" colspan="4">9-1 GCSE Grading Scale</td>
          </tr>
          `
          }
        </tbody>
      </table>

      <div style="width: 100%; display: flex; justify-content: center; flex: 1; min-height: 0; overflow: hidden;">
        <table style="page-break-inside: avoid; width: 100%; height: 100%; border-collapse: collapse; text-align: left; font-size: 0.85em; line-height: 1.2; background-color: #ffffff; box-shadow: 0 5px 15px rgba(0,0,0,0.05); margin-bottom: 8px;">
          <thead>
            <tr style="background-color: #1a237e; color: white;">
              <th style="border: 1px solid #333; padding: 4px 6px; width: 35%;">Lesson / Assessment Title</th>
              <th style="border: 1px solid #333; padding: 4px 6px; width: 10%; text-align: center;">Effort</th>
              <th style="border: 1px solid #333; padding: 4px 6px; width: 10%; text-align: center;">Level</th>
              <th style="border: 1px solid #333; padding: 4px 6px; width: 45%;">Teacher Comments</th>
            </tr>
          </thead>
          <tbody>
            ${progressTrackerRows}
            <tr style=" font-weight: bold;">
              <td style="border: 1px solid #333; padding: 4px 6px; text-align: right;">Final Unit Grade:</td>
              <td style="border: 1px solid #333; padding: 4px 6px; background:#eee;"></td>
              <td style="border: 1px solid #333; padding: 4px 6px; background:#eee;"></td>
              <td style="border: 1px solid #333; padding: 4px 6px;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;

    periodLessons.forEach((lesson, lessonIndex) => {
      let globalQNum = 1;
      let allVideos = [];
      let imgTags = '';
      let sources = [];
      let interpretations = [];
      let sourceCharCode = 65;
      let currentUnitId = typeof unitId !== 'undefined' ? unitId : 'great_war';
      // Synced Chronological Numbering matching generate_textbooks.js

      if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block) => {
          if (block.tasks) {
            block.tasks.forEach((task) => {
              if (currentUnitId === 'great_war' || currentUnitId === 'great_war_part2') {
                if (typeof task.text === 'string')
                  task.text = task.text.replace(/^Task\s*\d*:\s*/i, '');
                if (typeof task.question === 'string')
                  task.question = task.question.replace(/^Task\s*\d*:\s*/i, '');
              }
            });
          }
        });
      }

      if (lesson.sources) {
      }

      if (lesson.gcse_task) {
        if (lesson.gcse_task.tasks) {
        } else {
        }
      }

      const isAssessmentLesson = lesson.title && lesson.title.startsWith('End of Unit Assessment');
      const lessonLabel = isAssessmentLesson
        ? formatText(lesson.title)
        : `L${lessonIndex + 1}: ${formatText(lesson.title)}`;
      html += `<h2 style="margin-top: 40px; border-top: 3px solid #1e3a8a; padding-top: 20px; margin-bottom: 5px; page-break-before: always; page-break-after: auto;">${lessonLabel}</h2>`;
      let flatQuestions = [];
      if (lesson.startPage) {
        // Page references removed — they become stale when content changes
        html += `<div style="margin-bottom: 10px;"></div>`;
      } else {
        html += `<div style="margin-bottom: 10px;"></div>`;
      }

      if (false && lesson.a4_map) {
        if (Array.isArray(lesson.a4_map)) {
          html += `<div style="page-break-after: always; width: 100%; height: 85vh; display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 20px;">`;
          lesson.a4_map.forEach((img) => {
            let mapPath =
              typeof resolveAssetPath === 'function'
                ? resolveAssetPath(img, 2)
                : `../..${img.startsWith('/') ? img : '/' + img}`;
            html += `<img src="${mapPath}" style="max-width: 48%; max-height: 100%; object-fit: contain;  padding: 5px; box-sizing: border-box;">`;
          });
          html += `</div>`;
        } else {
          let mapPath =
            typeof resolveAssetPath === 'function'
              ? resolveAssetPath(lesson.a4_map, 2)
              : `../..${lesson.a4_map.startsWith('/') ? lesson.a4_map : '/' + lesson.a4_map}`;
          html += `<div style="page-break-after: always; width: 100%; height: 85vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">`;
          html += `<img src="${mapPath}" style="max-width: 100%; max-height: 100%; object-fit: contain;  padding: 5px; box-sizing: border-box;">`;
          html += `</div>`;
        }
      }

      if (
        lesson.teacher_notes &&
        lesson.teacher_notes.objectives &&
        lesson.teacher_notes.objectives.length > 0
      ) {
        html += `<div style="margin-bottom: 15px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbd5e1; border-radius: 8px;  ">`;
        html += `<h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 10pt; text-transform: uppercase;">Learning Objectives</h4>`;
        lesson.teacher_notes.objectives.forEach((obj) => {
          html += `<div style="display: flex; align-items: flex-start; margin-bottom: 4px;">`;
          html += `<div style="width: 12px; height: 12px; border: 1.5px solid #64748b; border-radius: 2px; margin-right: 8px; margin-top: 2px; flex-shrink: 0; "></div>`;
          html += `<div style="font-size: 9.5pt; color: #334155; line-height: 1.2;">${formatText(obj.objective)}</div>`;
          html += `</div>`;
        });
        html += `</div>`;
      }
      // Hook text and fun facts removed for Pupil Workbook

      // Primary Source
      if (lesson.primary_source) {
        let _psHtml = '';
        let srcs = Array.isArray(lesson.primary_source.src || lesson.primary_source.source)
          ? lesson.primary_source.src || lesson.primary_source.source
          : [lesson.primary_source.src || lesson.primary_source.source];
        let renderImages = false; // globally disabled for pupil workbooks to save space
        if (lesson.a4_map && (lesson.primary_source.src || lesson.primary_source.source)) {
          let a4Str = JSON.stringify(lesson.a4_map);
          let srcStr = JSON.stringify(lesson.primary_source.src || lesson.primary_source.source);
          if (
            a4Str === srcStr ||
            lesson.a4_map === (lesson.primary_source.src || lesson.primary_source.source)
          )
            renderImages = false;
        }

        imgTags = '';
        if (renderImages) {
          imgTags = srcs
            .map((src) => {
              let resolved =
                typeof resolveAssetPath === 'function'
                  ? resolveAssetPath(src, 2)
                  : `../..${src.startsWith('/') ? src : '/' + src}`;
              const style =
                lesson.primary_source.custom_style ||
                (srcs.length > 1
                  ? 'max-width: 100%; max-height: 450px; object-fit: contain; display: block; margin: 0 auto; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);'
                  : 'max-width: 100%; max-height: 350px; object-fit: contain;  border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);');
              return `<img src="${resolved}" alt="Primary Source" style="${style}">`;
            })
            .join(' ');
        }

        html += `
        <div class="source-container" style=" margin-bottom: 0px; padding-top: 0px; border-top: none;">
          ${renderImages && lesson.primary_source.title ? `<strong>${badgeSource(lesson.primary_source.title, unitId === 'cme_new' ? null : String.fromCharCode(sourceCharCode++))}</strong><br>` : ''}
          <div style="${srcs.length > 1 ? 'display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px;' : 'display: flex; justify-content: center; gap: 10px;'} margin: 15px 0;">${imgTags}</div>
          ${renderImages && lesson.primary_source.caption ? `<div class="source-caption">${lesson.primary_source.caption}</div>` : ''}
          ${lesson.primary_source.question ? `<div style="margin-top: 15px; text-align: left;"><strong>Q${globalQNum++}. ${lesson.primary_source.question.replace('Enquiry: ', '').replace(/^Source Detective[:.]?\s*/i, '')}${lesson.primary_source.page ? ` [p. ${lesson.primary_source.page}]` : ''}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>` : ''}
        </div>
      `;
      }

      // Starter Activities (Do Now & Vocab stacked)
      html += `<div style="width: 100%; margin-bottom: 10px;">`;

      // Do Now
      html += `<div>`;
      if (lesson.do_now) {
        if (lesson.do_now.type === 'timeline') {
          html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">Chronological Domino Flowchart</h3>
                     <div style=" padding: 3px 10px; font-weight: bold; font-size: 10pt; border-radius: 4px; ">Score: &nbsp;&nbsp;&nbsp;&nbsp; / 5</div>
                   </div>
                   <p style="font-style: italic; color: #555; margin-top: 0; font-size: 9.5pt; margin-bottom: 5px;"><strong>Task:</strong> The historical events below are out of order. Read them carefully, then use your pen to <strong>draw arrows connecting the boxes</strong> in the correct chronological and causal order (Event A ➔ Event B ➔ Event C...).</p>
                   <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 5px;">`;

          let shuffledEvents = [...(lesson.do_now.events || [])];
          for (let i = shuffledEvents.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledEvents[i], shuffledEvents[j]] = [shuffledEvents[j], shuffledEvents[i]];
          }

          shuffledEvents.forEach((ev, idx) => {
            if (unitId === 'cme_new') {
              html += `<div style="flex: 1 1 30%; max-width: 31%; border: 1px solid #94a3b8; padding: 5px; box-sizing: border-box; box-shadow: 2px 2px 0px #cbd5e1; border-radius: 4px; background: #fff;">
                        <strong style="font-size: 8pt; color: #1e3a8a;">${ev.year || ''}</strong><br>
                        <strong style="font-size: 8pt;">${ev.title || ''}</strong><br>
                        <span style="font-size: 7.5pt; color: #475569;">${ev.detail || ''}</span>
                     </div>`;
            } else {
              html += `<div style="flex: 1 1 30%; max-width: 31%; border: 2px solid #334155; padding: 15px; box-sizing: border-box; box-shadow: 2px 2px 0px #cbd5e1; border-radius: 8px; background: #f8fafc;">
                        <strong style="font-size: 9.5pt; color: #1e3a8a;">${ev.year || ''}</strong><br>
                        <strong style="font-size: 9.5pt;">${ev.title || ''}</strong><br>
                        <span style="font-size: 9pt; color: #475569;">${ev.detail || ''}</span>
                     </div>`;
            }
          });
          html += `</div><div style="clear: both; margin-bottom: 5px;"></div>`;

          if (lesson.do_now.prediction_question) {
            html += `<div class="do-now-q" style="margin-top: 5px; font-size: 9.5pt;"><strong>${lesson.do_now.qNum ? 'Q' + lesson.do_now.qNum + '. ' : '1. '}${lesson.do_now.prediction_question}</strong></div>`;
            html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
          }
          html += `</div>`;
        } else if (lesson.do_now.type === 'text') {
          html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">${lesson.do_now.title || 'Do Now Activity'}</h3>
                     <div style=" padding: 3px 10px; font-weight: bold; font-size: 10pt; border-radius: 4px; ">Score: &nbsp;&nbsp;&nbsp;&nbsp; / 5</div>
                   </div>`;
          html += `<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;"><strong>${lesson.do_now.text}${lesson.startPage ? ` [p. ${lesson.startPage}]` : ''}</strong></div>`;
          for (let i = 0; i < 5; i++) {
            html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
          }
          html += `</div>`;
        } else if (lesson.do_now.type === 'timeline') {
          html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px; page-break-inside: avoid;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px;">
                     <h3 style="margin: 0; font-size: 11pt;">${lesson.do_now.title || 'Domino Flowchart'}</h3>
                   </div>
                   <p style="font-size: 9.5pt; font-style: italic; margin-bottom: 15px;">${lesson.do_now.text || 'Draw arrows connecting the events in the correct chronological and causal order.'}</p>
                   <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; padding: 10px;">`;

          let shuffledEvents = [...lesson.do_now.events].sort(() => Math.random() - 0.5);
          shuffledEvents.forEach((ev) => {
            let rot = Math.random() * 6 - 3;
            html += `<div style="border: 2px solid #334155; padding: 10px; border-radius: 6px; background-color: #f8fafc; font-weight: bold; font-size: 9pt; width: 40%; text-align: center; transform: rotate(${rot}deg); box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">${ev}</div>`;
          });

          html += `</div>
                 <div style="height: 40px;"></div>
                 </div>`;
        } else if (
          lesson.do_now.type === 'questions' ||
          lesson.do_now.type === 'retrieval' ||
          (!lesson.do_now.type && (lesson.do_now.items || lesson.do_now.questions))
        ) {
          let items = lesson.do_now.items || lesson.do_now.questions;
          let maxScore = items ? items.length : 5;
          html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">Do Now Activity</h3>
                     <div style=" padding: 3px 10px; font-weight: bold; font-size: 10pt; border-radius: 4px; ">Score: &nbsp;&nbsp;&nbsp;&nbsp; / ${maxScore}</div>
                   </div>`;
          if (items) {
            items.forEach((item, index) => {
              html += `<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;">${unitId === 'early_modern_world' ? index + 1 + '. ' : ''}${item.question}</div>`;
              let linesToDraw = 2;
              for (let i = 0; i < linesToDraw; i++) {
                html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
              }
              html += `<div style="height: 6px;"></div>`;
            });
          }
          html += `</div>`;
        }
      }

      html += `</div>`;

      // Vocab
      html += `<div>`;
      let vocabTerms =
        lesson.vocab && lesson.vocab.length > 0
          ? lesson.vocab
          : lesson.flashcards && lesson.flashcards.length > 0
            ? lesson.flashcards
            : lesson.glossary
              ? Object.keys(lesson.glossary).map((k) => ({
                  term: k,
                  definition: lesson.glossary[k],
                }))
              : [];
      if (vocabTerms && vocabTerms.length > 0) {
        let vocabStyle = lessonIndex % 4;
        html += `<div class="task-box" style="margin-bottom: 0px; padding: 5px; page-break-inside: avoid;">`;
        html += `<div style="break-inside: avoid; page-break-inside: avoid;"><h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Vocabulary Check</h3>`;

        let words = vocabTerms.map((v) => v.term).join(' &nbsp;|&nbsp; ');
        let wordBox = `<div style="border: 1px solid #cbd5e1; background: #f8fafc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt; border-radius: 4px;">${words}</div>`;

        if (vocabStyle === 0) {
          // Style 0: The Odd One Out
          html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;"><strong>The Odd One Out:</strong> Select THREE terms that share a close historical connection. Identify which ONE remaining term is the 'Odd One Out' in this lesson, and explain your historical reasoning:</p>`;
          html += wordBox;
          html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
        } else if (vocabStyle === 1) {
          // Style 1: The Golden Sentence (Connect Two)
          html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;"><strong>The Golden Sentence:</strong> Choose TWO terms from the word bank. Write ONE grammatically sophisticated, historically accurate sentence connecting them using a causal conjunction (<em>because</em>, <em>although</em>, or <em>consequently</em>):</p>`;
          html += wordBox;
          html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
        } else if (vocabStyle === 2) {
          // Style 2: Conceptual Binary Sort
          html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;"><strong>Conceptual Classification:</strong> Categorise the terms from the word bank into the two historical boxes below:</p>`;
          html += wordBox;
          html += `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 5px;">
              <div style="border: 1px solid #94a3b8; border-radius: 4px; padding: 4px;">
                <strong style="font-size: 9pt; display: block; text-align: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; color: #1e3a8a;">Power, Governance & Warfare</strong>
                <div class="task-lines" style="height: 10px; margin-top: 2px;"></div>
                <div class="task-lines" style="height: 10px; margin-top: 2px;"></div>
                <div class="task-lines" style="height: 10px; margin-top: 2px;"></div>
              </div>
              <div style="border: 1px solid #94a3b8; border-radius: 4px; padding: 4px;">
                <strong style="font-size: 9pt; display: block; text-align: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; color: #047857;">Economy, Trade & Society</strong>
                <div class="task-lines" style="height: 10px; margin-top: 2px;"></div>
                <div class="task-lines" style="height: 10px; margin-top: 2px;"></div>
                <div class="task-lines" style="height: 10px; margin-top: 2px;"></div>
              </div>
            </div>
          `;
        } else if (vocabStyle === 3) {
          // Style 3: Spot the Deliberate Historical Error!
          html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;"><strong>Spot the Deliberate Error:</strong> Read the statement below. One historical fact or vocabulary concept has been deliberately falsified. Underline the error and explain the accurate historical reality below:</p>`;
          html += wordBox;
          if (lesson.vocab_deliberate_error) {
            html += `<div style="border-left: 3px solid #dc2626; background: #fef2f2; padding: 4px 8px; margin: 4px 0 5px 0; font-size: 9pt; font-style: italic; color: #991b1b; border-radius: 0 4px 4px 0;">"${lesson.vocab_deliberate_error}"</div>`;
            html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
          } else {
            let t1 = vocabTerms[0] ? vocabTerms[0].term : 'Term 1';
            let t2 = vocabTerms[1] ? vocabTerms[1].term : 'Term 2';
            html += `<p style="font-size: 9pt; margin: 3px 0; color: #334155;"><em>Challenge:</em> Write ONE statement containing a deliberate historical misconception using <strong>${t1}</strong> or <strong>${t2}</strong>. Swap with a partner to identify and correct the error:</p>`;
            html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
          }
        }
        html += `</div></div>`;
      }

      html += `</div>`;

      html += `</div>`;

      // Sources

      let isGCSE = unitId === 'weimar_nazi_germany' || unitId === 'cme_new';
      if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {
        const hasQuestions = lesson.sources.some((s) => s.question);
        if (hasQuestions) {
          html += `<div style="page-break-inside: auto; margin-bottom: 15px;">`;
          lesson.sources.forEach((source) => {
            if (source.question) {
              html += `
              <div class="source-container" style="border: none; padding-top: 0; margin-top: 0; margin-bottom: 10px; text-align: left;">
                <div style="margin-top: 10px; text-align: left;"><strong>Q${globalQNum++} ${source.question}${source.page ? ` [p. ${source.page}]` : ''}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>
              </div>
            `;
            }
          });
          html += `</div>`;
        }
      }

      // Narrative Blocks & Tasks
      if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block, bIdx) => {
          let textToRender = block.text || '';
          const kiCard = renderKeyIndividualBlock(unitData, textToRender);
          if (kiCard) {
            textToRender = kiCard;
          } else {
            const kiRegex = /\[Key Individual:\s*([^\]]+)\]/gi;
            textToRender = textToRender.replace(kiRegex, (match, p1) => {
              return `<strong>${p1.trim()}</strong>`;
            });
          }

          let finalRenderedText = kiCard ? textToRender : formatText(textToRender);
          finalRenderedText = finalRenderedText.replace(
            /<details[^>]*>/gi,
            '<div class="side-quest-box" style="border-top: 2px solid #e2e8f0; padding-top: 15px; margin: 15px 0; page-break-inside: auto;">',
          );
          let isSideQuest = finalRenderedText.includes('<details class="side-quest-box"');
          finalRenderedText = finalRenderedText.replace(/<\/details>/gi, '</div>'); // Close side-quest-box properly
          finalRenderedText = finalRenderedText.replace(
            /<summary[^>]*>(.*?)<\/summary>/gi,
            '<h3 style="color: #334155; margin-top: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px dashed #94a3b8; padding-bottom: 8px; display: flex; align-items: center; gap: 10px; page-break-after: avoid; break-after: avoid;">$1</h3>',
          );

          let hasContent =
            finalRenderedText.trim() !== '' ||
            block.hinge_question ||
            (block.tasks && block.tasks.length > 0) ||
            (block.source && block.source.question) ||
            block.extended;
          if (hasContent) {
            let _nbHtml = '';
            let _firstQNum = 9999;
            _nbHtml += `<div class="narrative-block" id="para-${bIdx + 1}">`;
            if (finalRenderedText.trim() !== '') {
              // Narrative text removed for Pupil Workbook
            }

            if (block.source && block.source.question) {
              let cleanQuestion = block.source.question
                .replace(/^Q\d+[\.\:]\s*/i, '')
                .replace(/^Source Detective[:.]?\s*/i, '');
              let prefix = !cleanQuestion.startsWith(' ') ? '. ' : ' ';
              _nbHtml += `<div class="task-box">`;
              _nbHtml += `<h4 style="margin-top: 10px; margin-bottom: 15px;">Q${globalQNum++}${prefix}${cleanQuestion}${block.source.page ? ` [p. ${block.source.page}]` : ''}</h4>`;
              for (let i = 0; i < 4; i++) {
                _nbHtml += `<div class="task-lines"></div>`;
              }
              _nbHtml += `</div>`;
            }

            if (block.hinge_question) {
              if (block.hinge_question.qNum && block.hinge_question.qNum < _firstQNum)
                _firstQNum = block.hinge_question.qNum;
              _nbHtml += `<div class="task-box" style=" ">`;
              _nbHtml += `<p style="margin-top:0px; margin-bottom: 10px; color: #475569; font-size: 0.9em; text-transform: uppercase;"><strong>Knowledge Check (Q${globalQNum++})</strong></p>`;
              _nbHtml += `<div style="margin-bottom: 15px;"><strong>${block.hinge_question.text || block.hinge_question.question}</strong></div>`;
              _nbHtml += `<ul style="list-style-type: none; padding-left: 0; margin-bottom: 0;">`;
              block.hinge_question.options.forEach((opt, idx) => {
                _nbHtml += `<li style="margin-bottom: 8px;"><div style="display: inline-block; width: 16px; height: 16px; border: 1px solid #333; margin-right: 10px; border-radius: 3px; position: relative; top: 3px;"></div>${String.fromCharCode(65 + idx)}. ${opt}</li>`;
              });
              _nbHtml += `</ul></div>`;
            }

            if (block.extended && block.extended.question) {
              if (block.extended.qNum && block.extended.qNum < _firstQNum)
                _firstQNum = block.extended.qNum;
              _nbHtml += `<div class="task-box" style="margin-bottom: 20px;">`;
              _nbHtml += `<div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">${block.extended.question}</div>`;
              if (block.extended.scaffolding && block.extended.scaffolding.length > 0) {
                _nbHtml += `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; color: #92400e;">`;
                block.extended.scaffolding.forEach((hint) => {
                  _nbHtml += `<li>${formatText(hint)}</li>`;
                });
                _nbHtml += `</ul></div>`;
              }
              _nbHtml += `<div style="min-height: 200px;">`;
              const lineCount = block.extended.lines || 8;
              for (let i = 0; i < lineCount; i++) {
                _nbHtml += `<div class="task-lines-large"></div>`;
              }
              _nbHtml += `</div></div>`;
            }

            if (block.tasks && block.tasks.length > 0) {
              _nbHtml += `<div class="task-box">`;
              block.tasks.forEach((task) => {
                if (task.flowchart) {
                  const fc = task.flowchart;
                  _nbHtml += `
                    <div style="margin: 8px 0 10px 0; padding: 8px 10px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; page-break-inside: avoid;">
                      <div style="font-weight: bold; font-size: 8.5pt; color: #0f172a; margin-bottom: 6px;">${fc.title}</div>
                      <div style="display: flex; gap: 8px;">
                        ${fc.steps
                          .map(
                            (s, sIdx) => `
                          <div style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; border-top: 3px solid ${sIdx === 0 ? '#0284c7' : sIdx === 1 ? '#d97706' : '#dc2626'}; border-radius: 4px; padding: 6px 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                              <strong style="font-size: 7.8pt; color: #334155;">Step ${s.num}</strong>
                              <span style="font-size: 6.8pt; font-weight: bold; text-transform: uppercase; color: ${sIdx === 0 ? '#0284c7' : sIdx === 1 ? '#d97706' : '#dc2626'}; border: 0.5px solid #cbd5e1; padding: 1px 4px; border-radius: 3px;">${s.badge}</span>
                            </div>
                            <div style="font-weight: bold; font-size: 8pt; color: #0f172a; margin-bottom: 2px;">${s.title}</div>
                            <div style="font-size: 7.2pt; color: #475569; line-height: 1.25;">${s.desc}</div>
                          </div>
                        `,
                          )
                          .join('')}
                      </div>
                    </div>
                  `;
                }
                if (task.type === 'drawing' || task.type === 'draw') {
                  if (
                    unitId === 'medieval_england' &&
                    lesson.title &&
                    lesson.title.includes('Lesson 2')
                  ) {
                    _nbHtml += `<div class="task-box" style="margin-bottom: 12px; border-left: 3.5px solid #1e3a8a; background: #eff6ff; padding: 8px 12px; border-radius: 4px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                        <strong style="color: #1e3a8a; font-size: 9.5pt;"><i class="fa-solid fa-compass-drafting" style="color: #0284c7; margin-right: 5px;"></i> Q${globalQNum++}. Architectural Drafting & Fortress Blueprint</strong>
                        <span style="font-size: 7.5pt; font-weight: 700; color: #0284c7; background: #ffffff; padding: 2px 6px; border-radius: 3px; border: 1px solid #bfdbfe;">Full-Page Masterclass</span>
                      </div>
                      <p style="margin: 0; font-size: 8.5pt; color: #334155; line-height: 1.3;">
                        Turn to the dedicated <strong>Motte-and-Bailey Fortress Worksheet</strong> at the end of this lesson to complete your annotated architectural drawing and tactical evaluation.
                      </p>
                    </div>`;
                    return;
                  }
                  _nbHtml += `<div class="task-box" style="box-sizing: border-box; margin-bottom: 20px; border: 2px dashed #f59e0b; padding: 15px; border-radius: 8px; page-break-inside: avoid;">`;
                  let _t = processTaskTextWithTariff(task.text || task.question);
                  _nbHtml += `<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q${globalQNum++} ${_t.cleanText}</h4>`;
                  if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                  _nbHtml += `<div style="height: 250px;"></div>`;
                  _nbHtml += `</div>`;
                  return;
                }
                if (task.type === 'multiple_choice') {
                  _nbHtml += `<div class="task-box">`;
                  let _t = processTaskTextWithTariff(
                    task.text || task.question || task.instruction || task.title || '',
                  );
                  _nbHtml += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
                  if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                  task.questions.forEach((q, qIdx) => {
                    _nbHtml += `<p style="font-weight:bold; margin-bottom:5px;">${qIdx + 1}. ${q.q}</p><ul style="list-style-type:none; padding-left:10px; margin-top:0;">`;
                    q.options.forEach((opt) => {
                      _nbHtml += `<li style="margin-bottom: 5px;"><input type="checkbox" style="margin-right:8px; position:relative; top:2px;">${opt}</li>`;
                    });
                    _nbHtml += `</ul>`;
                  });
                  _nbHtml += `</div>`;
                  return;
                }
                if (task.type === 'sorting') {
                  _nbHtml += `<div class="task-box">`;
                  let _t = processTaskTextWithTariff(
                    task.text || task.question || task.instruction || task.title || '',
                  );
                  _nbHtml += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
                  if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                  _nbHtml += `<ul style="list-style-type:none; padding-left:0;">`;
                  task.events.forEach((ev) => {
                    _nbHtml += `<li style="margin-bottom: 10px; display:flex; gap:10px;"><div style="width:30px; height:30px; border:1px solid #333; display:flex; align-items:center; justify-content:center;"></div><span>${ev}</span></li>`;
                  });
                  _nbHtml += `</ul></div>`;
                  return;
                }
                if (task.type === 'cloze') {
                  let cloze = task.cloze_text.replace(/\[([^\]]+)\]/g, '[ . . . . . . . . ]');
                  _nbHtml += `<div class="task-box">`;
                  let _t = processTaskTextWithTariff(
                    task.text || task.question || task.instruction || task.title || '',
                  );
                  _nbHtml += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
                  if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                  _nbHtml += `<p style="border: 1px solid #ccc; padding: 5px; font-weight: bold; font-size: 0.9em; text-align:center;">Word Bank: ${task.words.join(' | ')}</p>`;
                  _nbHtml += `<p style="line-height: 2;">${cloze}</p>`;
                  _nbHtml += `</div>`;
                  return;
                }

                if (task.type === 'physician_game') {
                  _nbHtml += `<div class="task-box">`;
                  let _t = processTaskTextWithTariff(
                    task.text || task.question || task.instruction || task.title || '',
                  );
                  _nbHtml += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
                  if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                  _nbHtml += `<p style="font-style: italic;">Read the patient symptoms below. Write down your recommended medieval cure in the empty box. Your teacher will reveal the outcome!</p>`;
                  _nbHtml += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">`;
                  _nbHtml += `<thead><tr><th style="border:1px solid #333; padding:8px; width:20%; background:#f1f5f9;">Patient</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Symptoms</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Your Recommended Cure</th></tr></thead>`;
                  _nbHtml += `<tbody>`;
                  const patients = [
                    {
                      name: 'William',
                      symptoms:
                        'High fever, shivering, and large, painful black swellings (buboes) in his armpits.',
                    },
                    {
                      name: 'Agnes',
                      symptoms: 'Coughing up blood, severe chest pain, and struggling to breathe.',
                    },
                    {
                      name: 'John',
                      symptoms:
                        'Fingers and toes have turned completely black. High fever and vomiting.',
                    },
                    {
                      name: 'Thomas',
                      symptoms: 'A runny nose, a mild cough, and feeling a bit tired.',
                    },
                  ];
                  patients.forEach((p) => {
                    _nbHtml += `<tr>
                      <td style="border:1px solid #333; padding:8px; font-weight:bold;">${p.name}</td>
                      <td style="border:1px solid #333; padding:8px;">${p.symptoms}</td>
                      <td style="border:1px solid #333; padding:8px; height: 60px;"></td>
                    </tr>`;
                  });
                  _nbHtml += `</tbody></table></div>`;
                  return;
                }
                if (task.type === 'matching') {
                  _nbHtml += `<div class="task-box">`;
                  let _t = processTaskTextWithTariff(
                    task.text || task.question || task.instruction || task.title || '',
                  );
                  _nbHtml += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
                  if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                  _nbHtml += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border:none;"><tbody>`;
                  const rightMixed = [...task.pairs];
                  task.pairs.forEach((p, i) => {
                    _nbHtml += `<tr>
                     <td style="border:1px solid #333; padding:10px; width:40%;">${(p.left || '').replace(/\n/g, '<br>')}</td>
                     <td style="width:20%; text-align:center;">&bull; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;</td>
                     <td style="border:1px solid #333; padding:10px; width:40%;">${(rightMixed[i].right || '').replace(/\n/g, '<br>')}</td>
                   </tr>`;
                  });
                  _nbHtml += `</tbody></table></div>`;
                  return;
                }
                if (task.type === 'table_planner') {
                  _nbHtml += `<div class="task-box">`;
                  let _t = processTaskTextWithTariff(
                    task.text || task.question || task.instruction || task.title || '',
                  );
                  _nbHtml += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
                  if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                  _nbHtml += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;"><thead><tr>`;
                  task.columns.forEach((c) => {
                    _nbHtml += `<th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">${c}</th>`;
                  });
                  _nbHtml += `</tr></thead><tbody>`;
                  for (let i = 0; i < task.rows; i++) {
                    _nbHtml += `<tr>`;
                    task.columns.forEach(() => {
                      _nbHtml += `<td style="border: 1px solid #333; padding: 8px; height: 60px;"></td>`;
                    });
                    _nbHtml += `</tr>`;
                  }
                  _nbHtml += `</tbody></table></div>`;
                  return;
                }
                if (task.type === 'think_pair_share') {
                  _nbHtml += `<div class="task-box" style="page-break-inside: avoid; box-sizing: border-box; border: 2px solid #10b981; padding: 15px; border-radius: 8px;">`;
                  let _t = processTaskTextWithTariff(task.text || task.question);
                  _nbHtml += `<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q${globalQNum++} ${_t.cleanText}</h4>`;
                  if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                  _nbHtml += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px;">
                   <thead><tr>
                     <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">1. My Thoughts (Think)</th>
                     <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">2. Partner's Thoughts (Pair)</th>
                   </tr></thead>
                   <tbody><tr>
                     <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                     <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                   </tr></tbody>
                 </table></div>`;
                  return;
                }
                if (true) {
                  let isSixteen = (task.text || task.question || '')
                    .toLowerCase()
                    .includes('16 marks');
                  let pbBefore = isSixteen
                    ? 'page-break-before: always; margin-top: 30px;'
                    : 'margin-top: 10px;';

                  if (task.type === 'vocab_match' || task.type === 'drag_drop_timeline') {
                    // Do nothing
                  } else {
                    let _t = processTaskTextWithTariff(task.text || task.question);
                    _nbHtml += `<div style="${pbBefore}; margin-bottom: 15px;"><strong>Q${globalQNum++}. ${_t.cleanText}</strong></div>`;
                    if (_t.badgeHtml) _nbHtml += _t.badgeHtml;
                    if (task.type === 'extended_writing' && task.instructions) {
                      _nbHtml += `<p style="font-style: italic; color: #334155; margin-bottom: 5px; margin-top: 5px; font-size: 10pt;">${task.instructions}</p>`;
                    }
                  }

                  let tText = (task.text || task.question || '').toLowerCase();
                  if (tText.includes('16 marks')) {
                    for (let i = 0; i < 40; i++) {
                      _nbHtml += `<div class="task-lines-large"></div>`;
                    }
                    _nbHtml += `<div style="page-break-before: always;"></div>`;
                    for (let i = 0; i < 40; i++) {
                      _nbHtml += `<div class="task-lines-large"></div>`;
                    }
                  } else {
                    let linesToDraw = 4;
                    if (task.type === 'extended_writing') {
                      linesToDraw = 18;
                    } else if (
                      task.type === 'analysis' ||
                      task.type === 'debate' ||
                      tText.includes('explain') ||
                      tText.includes('describe') ||
                      tText.includes('two ') ||
                      tText.length > 60
                    ) {
                      linesToDraw = 4;
                    }
                    for (let i = 0; i < linesToDraw; i++) {
                      _nbHtml += `<div class="task-lines"></div>`;
                    }
                  }
                }
              });
              _nbHtml += `</div>`;
            }

            _nbHtml += `</div>`; // Close narrative-block div
            html += _nbHtml;
          }
        });
      }

      // Extended Scholarship
      if (lesson.extended && lesson.extended.paragraphs) {
        if (!(
          unitId === 'cme_new' &&
          lesson.extended.title &&
          lesson.extended.title.toLowerCase().includes('map task')
        )) {
          html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;
          lesson.extended.paragraphs.forEach((para) => {
            html += `<p class="narrative-block" style="font-size: 12pt; color: #444;">${formatText(para)}</p>`;
          });
        }
      }

      // Narrative
      if (lesson.narrative) {
        lesson.narrative.forEach((block, idx) => {
          html += `<p class="narrative-block"><strong style="color:#000;">${idx + 1}.</strong> ${formatText(block.text)}</p>`;
        });
      }

      // Pair Share (Hidden for Great War units here, moved to later)
      if (lesson.pair_share && !(unitId === 'great_war' || unitId === 'great_war_part2')) {
        if (unitId === 'cme_new') {
          html += `<div class="task-box consolidation-box" style="box-sizing: border-box; width: 100%; margin-top: 10px; margin-bottom: 12px; border: 1.5px solid #0f766e; border-radius: 8px; padding: 10px 14px 14px 14px; background: #ffffff; break-inside: avoid !important; page-break-inside: avoid !important;">`;
          html += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">`;
          html += `<h3 style="margin: 0; color: #0f766e; font-size: 11pt; text-transform: uppercase; letter-spacing: 0.5px;">✍️ Written Consolidation & Recall</h3>`;
          html += `<span style="font-size: 8pt; background: #ccfbf1; color: #0f766e; padding: 2px 7px; border-radius: 9999px; font-weight: 600;">Recall & Analysis</span>`;
          html += `</div>`;
          html += `<p style="font-weight: bold; font-size: 10pt; margin: 0 0 6px 0; color: #0f172a; line-height: 1.35;">Q${globalQNum++}. ${lesson.pair_share.prompt}</p>`;
          if (lesson.pair_share.think) {
            html += `<p style="font-size: 8.5pt; font-style: italic; color: #475569; margin: 0 0 6px 0; line-height: 1.3;"><strong>Guidance:</strong> ${lesson.pair_share.think}</p>`;
          }
          if (lesson.pair_share.starters && lesson.pair_share.starters.length > 0) {
            html += `<div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 6px 10px; margin-bottom: 8px; font-size: 8.5pt; color: #166534; line-height: 1.35;">`;
            html += `<strong style="display: block; margin-bottom: 2px; font-size: 8pt; text-transform: uppercase;">Sentence Starters:</strong>`;
            lesson.pair_share.starters.forEach((s) => {
              html += `<div style="margin-top: 1px;">• <em>${s}</em></div>`;
            });
            html += `</div>`;
          }
          html += `<div style="font-size: 8.5pt; font-weight: bold; color: #0f766e; margin-bottom: 4px;">Pupil Response:</div>`;
          html += `<div style="margin-bottom: 4px;">`;
          const lineCount = lesson.pair_share.lines || (lesson.historians_corner ? 6 : 8);
          for (let i = 0; i < lineCount; i++) {
            html += `<div class="task-lines-large"></div>`;
          }
          html += `</div>`;
          html += `</div>`;
        } else {
          html += `<div class="task-box" style="  ">`;
          html += `<h3 style="margin-top: 0; color: #0f766e;">Pair & Share Activity</h3>`;

          if (lesson.pair_share.sources) {
            let sourceHTML = '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
            lesson.pair_share.sources.forEach((srcObj) => {
              sourceHTML +=
                '<div style="flex: 1; border: 1px solid #0d9488; padding-top: 5px; padding-bottom: 5px; text-align: left; ">';
              if (
                (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) &&
                unitId !== 'cme_new'
              ) {
                let imgSrc =
                  typeof resolveAssetPath === 'function'
                    ? resolveAssetPath(srcObj.src || srcObj.source || srcObj.image, 2)
                    : srcObj.src || srcObj.source || srcObj.image;
                sourceHTML += `<img src="${imgSrc}" style="max-width: 100%; max-height: 250px;">`;
              }
              if (srcObj.text || srcObj.content) {
                sourceHTML += `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${srcObj.text}</blockquote>`;
              }
              if (srcObj.title)
                sourceHTML += `<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\</p>`;
              sourceHTML += '</div>';
            });
            sourceHTML += '</div>';
            html += sourceHTML;
          }

          html += `<p style="font-weight: bold; font-size: 12pt; margin-bottom: 5px;">Q${globalQNum++}. Prompt: ${lesson.pair_share.prompt}</p>`;
          if (lesson.pair_share.think)
            html += `<p style="font-size: 12pt; font-style: italic; margin-top: 0;">Think: ${lesson.pair_share.think}</p>`;
          html += `<div style="margin-top: 15px; border-left: 4px solid #0f766e; padding-left: 15px;"><strong>Your Notes:</strong>`;
          for (let i = 0; i < 6; i++) {
            html += `<div class="task-lines-large"></div>`;
          }
          html += `</div>`;
          html += `</div>`;
        }
      }

      // Phase 1: Standard Tasks
      if (lesson.tasks && lesson.tasks.length > 0) {
        let originalTasks = lesson.tasks;
        lesson.tasks = originalTasks.filter(
          (t) =>
            t.type !== 'gcse_exam_practice' &&
            t.type !== 'exam_practice' &&
            t.type !== 'drawing' &&
            t.type !== 'draw',
        );
        if (lesson.tasks.length > 0) {
          if (currentUnitId !== 'weimar_nazi_germany') {
            html += `<h3 style="margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; page-break-after: avoid; break-after: avoid;">Active Tasks</h3>`;
          }
          lesson.tasks.forEach((task, tIdx) => {
            if (task.type === 'spectrum_mapper') {
              // html += `<div style="page-break-before: always;"></div>`;
              html += `<h2 style="text-align: center; margin-bottom: 30px;">${task.text || 'Spectrum Planner'}</h2>`;

              // Draw the spectrum line
              html += `<div style="margin-top: 50px; margin-bottom: 50px; position: relative;">`;
              html += `<div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14pt; margin-bottom: 10px;">`;
              html += `<div>${task.labels[0]}</div><div>${task.labels[1]}</div>`;
              html += `</div>`;
              html += `<div style="height: 4px;  width: 100%; position: relative;">`;
              html += `<div style="position: absolute; left: 0%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `<div style="position: absolute; left: 25%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `<div style="position: absolute; left: 50%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `<div style="position: absolute; left: 75%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `<div style="position: absolute; left: 100%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `</div></div>`;

              html += `<h3 style="margin-top: 40px;">Factors to map:</h3>`;
              html += `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px;">`;
              task.items.forEach((item) => {
                html += `<div style=" padding: 15px; width: 45%; border-radius: 8px;">`;
                html += `<strong>${item.title}</strong><br>`;
                if (item.desc)
                  html += `<span style="font-size: 0.9em; color: #555;">${item.desc}</span>`;
                html += `</div>`;
              });
              html += `</div>`;

              html += `<h3>Notes & Paragraph Plan</h3>`;
              for (let i = 0; i < 10; i++) {
                html += `<div class="task-lines-large"></div>`;
              }

              // Add two pages for the final essay
              html += `<div style="page-break-before: always; margin-top: 20px;">`;
              html += `<h2 style="color: #0284c7; font-size: 18pt;">Final Assessment Essay</h2>`;
              html += `<p style="font-weight: bold; font-size: 12pt;">How 'modern' was Britain by 1750?</p>`;
              for (let i = 0; i < 30; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
              html += `</div>`;
              html += `<div style="page-break-before: always; margin-top: 20px;">`;
              for (let i = 0; i < 35; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
              html += `</div>`;

              return;
            }

            if (task.type === 'drawing' || task.type === 'draw') {
              html += `<div class="task-box" style="box-sizing: border-box; margin-bottom: 20px; border: 2px dashed #f59e0b; padding: 15px; border-radius: 8px; page-break-inside: avoid;">`;
              let _t = processTaskTextWithTariff(task.text || task.question);
              html += `<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<div style="height: 250px;"></div>`;
              html += `</div>`;
              return;
            }
            if (task.type === 'multiple_choice') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              task.questions.forEach((q, qIdx) => {
                html += `<p style="font-weight:bold; margin-bottom:5px;">${qIdx + 1}. ${q.q}</p><ul style="list-style-type:none; padding-left:10px; margin-top:0;">`;
                q.options.forEach((opt) => {
                  html += `<li style="margin-bottom: 5px;"><input type="checkbox" style="margin-right:8px; position:relative; top:2px;">${opt}</li>`;
                });
                html += `</ul>`;
              });
              html += `</div>`;
              return;
            }
            if (task.type === 'sorting') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<ul style="list-style-type:none; padding-left:0;">`;
              task.events.forEach((ev) => {
                html += `<li style="margin-bottom: 10px; display:flex; gap:10px;"><div style="width:30px; height:30px; border:1px solid #333; display:flex; align-items:center; justify-content:center;"></div><span>${ev}</span></li>`;
              });
              html += `</ul></div>`;
              return;
            }
            if (task.type === 'cloze') {
              let cloze = task.cloze_text.replace(/\[([^\]]+)\]/g, '[ . . . . . . . . ]');
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<p style="border: 1px solid #ccc; padding: 5px; font-weight: bold; font-size: 0.9em; text-align:center;">Word Bank: ${task.words.join(' | ')}</p>`;
              html += `<p style="line-height: 2;">${cloze}</p>`;
              html += `</div>`;
              return;
            }

            if (task.type === 'physician_game') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<p style="font-style: italic;">Read the patient symptoms below. Write down your recommended medieval cure in the empty box. Your teacher will reveal the outcome!</p>`;
              html += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">`;
              html += `<thead><tr><th style="border:1px solid #333; padding:8px; width:20%; background:#f1f5f9;">Patient</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Symptoms</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Your Recommended Cure</th></tr></thead>`;
              html += `<tbody>`;
              const patients = [
                {
                  name: 'William',
                  symptoms:
                    'High fever, shivering, and large, painful black swellings (buboes) in his armpits.',
                },
                {
                  name: 'Agnes',
                  symptoms: 'Coughing up blood, severe chest pain, and struggling to breathe.',
                },
                {
                  name: 'John',
                  symptoms:
                    'Fingers and toes have turned completely black. High fever and vomiting.',
                },
                {
                  name: 'Thomas',
                  symptoms: 'A runny nose, a mild cough, and feeling a bit tired.',
                },
              ];
              patients.forEach((p) => {
                html += `<tr>
                      <td style="border:1px solid #333; padding:8px; font-weight:bold;">${p.name}</td>
                      <td style="border:1px solid #333; padding:8px;">${p.symptoms}</td>
                      <td style="border:1px solid #333; padding:8px; height: 60px;"></td>
                    </tr>`;
              });
              html += `</tbody></table></div>`;
              return;
            }
            if (task.type === 'matching') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border:none;"><tbody>`;
              const rightMixed = [...task.pairs];
              task.pairs.forEach((p, i) => {
                html += `<tr>
                 <td style="border:1px solid #333; padding:10px; width:40%;">${(p.left || '').replace(/\n/g, '<br>')}</td>
                 <td style="width:20%; text-align:center;">&bull; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;</td>
                 <td style="border:1px solid #333; padding:10px; width:40%;">${(rightMixed[i].right || '').replace(/\n/g, '<br>')}</td>
               </tr>`;
              });
              html += `</tbody></table></div>`;
              return;
            }
            if (task.type === 'table_planner') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;"><thead><tr>`;
              task.columns.forEach((c) => {
                html += `<th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">${c}</th>`;
              });
              html += `</tr></thead><tbody>`;
              for (let i = 0; i < task.rows; i++) {
                html += `<tr>`;
                task.columns.forEach(() => {
                  html += `<td style="border: 1px solid #333; padding: 8px; height: 60px;"></td>`;
                });
                html += `</tr>`;
              }
              html += `</tbody></table></div>`;
              return;
            }
            if (task.type === 'think_pair_share') {
              html += `<div class="task-box" style="page-break-inside: avoid; box-sizing: border-box; border: 2px solid #10b981; padding: 15px; border-radius: 8px;">`;
              let _t = processTaskTextWithTariff(task.text || task.question);
              html += `<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px;">
               <thead><tr>
                 <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">1. My Thoughts (Think)</th>
                 <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">2. Partner's Thoughts (Pair)</th>
               </tr></thead>
               <tbody><tr>
                 <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                 <td style="border:1px solid #333; padding:8px; height:120px;"></td>
               </tr></tbody>
             </table></div>`;
              return;
            }

            let qText = task.question || task.text || '';
            qText = qText.replace(/\(Weighing the Evidence toggle tabs\)/gi, '');
            html += `<div class="task-box" style="page-break-inside: auto;">`;

            let match = qText.match(/^([A-Za-z0-9'\-\/ ]+):\s*([\s\S]*)/);
            if (match) {
              let subhead = match[1];
              let rest = match[2];
              if (currentUnitId === 'weimar_nazi_germany') {
                rest = rest.replace(/\n/g, '<br>');
              }
              html += `<h4 style="margin-top: 0; color: #0284c7; margin-bottom: 8px; font-size: 1.1em;">${subhead}</h4>`;
              html += `<div style="font-weight: bold; margin-top: 0; margin-bottom: 5px;">Q${globalQNum++}. ${rest}</div>`;
            } else {
              let formattedQ =
                currentUnitId === 'weimar_nazi_germany' ? qText.replace(/\n/g, '<br>') : qText;
              html += `<div style="font-weight: bold; margin-top: 0; margin-bottom: 5px;">Q${globalQNum++}. ${formattedQ}</div>`;
            }
            let hasExamTaskLater =
              lesson.gcse_task ||
              lesson.exam_practice ||
              (lesson.extended && lesson.extended.question);
            let numLines = !hasExamTaskLater && tIdx === lesson.tasks.length - 1 ? 20 : 6;
            for (let i = 0; i < numLines; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
            html += `</div>`;
          });
        }
        lesson.tasks = originalTasks; // Restore
      }

      // Phase 2: Historian's Corner
      if (lesson.historians_corner && !lesson.historians_corner.textbook_only) {
        const hcClass = unitId === 'cme_new' ? 'task-box historians-corner-box' : 'task-box';
        const hcStyle =
          unitId === 'cme_new'
            ? 'break-inside: avoid !important; page-break-inside: avoid !important;'
            : ' ';
        html += `<div class="${hcClass}" style="${hcStyle}">`;
        html += `<h3 style="margin-top: 0;">Historian's Corner: ${lesson.historians_corner.title}</h3>`;
        html += `<p style="font-size: 12pt; font-style: italic;">${formatText(lesson.historians_corner.text)}</p>`;
        if (lesson.historians_corner.stretch_question) {
          html += `<div style="margin-top: 15px; font-weight: bold;">Q${globalQNum++}. ${lesson.historians_corner.stretch_question}</div>`;
          for (let i = 0; i < 4; i++) {
            html += `<div class="task-lines"></div>`;
          }
        }
        html += `</div>`;
      }

      // Phase 3 & 4: GCSE Exam Practice
      if (lesson.tasks && lesson.tasks.length > 0) {
        let originalTasks = lesson.tasks;
        lesson.tasks = originalTasks.filter(
          (t) => t.type === 'gcse_exam_practice' || t.type === 'exam_practice',
        );
        if (lesson.tasks.length > 0) {
          lesson.tasks.forEach((task, tIdx) => {
            if (task.type === 'spectrum_mapper') {
              // html += `<div style="page-break-before: always;"></div>`;
              html += `<h2 style="text-align: center; margin-bottom: 30px;">${task.text || 'Spectrum Planner'}</h2>`;

              // Draw the spectrum line
              html += `<div style="margin-top: 50px; margin-bottom: 50px; position: relative;">`;
              html += `<div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14pt; margin-bottom: 10px;">`;
              html += `<div>${task.labels[0]}</div><div>${task.labels[1]}</div>`;
              html += `</div>`;
              html += `<div style="height: 4px;  width: 100%; position: relative;">`;
              html += `<div style="position: absolute; left: 0%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `<div style="position: absolute; left: 25%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `<div style="position: absolute; left: 50%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `<div style="position: absolute; left: 75%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `<div style="position: absolute; left: 100%; top: -10px; width: 2px; height: 24px; "></div>`;
              html += `</div></div>`;

              html += `<h3 style="margin-top: 40px;">Factors to map:</h3>`;
              html += `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px;">`;
              task.items.forEach((item) => {
                html += `<div style=" padding: 15px; width: 45%; border-radius: 8px;">`;
                html += `<strong>${item.title}</strong><br>`;
                if (item.desc)
                  html += `<span style="font-size: 0.9em; color: #555;">${item.desc}</span>`;
                html += `</div>`;
              });
              html += `</div>`;

              html += `<h3>Notes & Paragraph Plan</h3>`;
              for (let i = 0; i < 10; i++) {
                html += `<div class="task-lines-large"></div>`;
              }

              // Add two pages for the final essay
              html += `<div style="page-break-before: always; margin-top: 20px;">`;
              html += `<h2 style="color: #0284c7; font-size: 18pt;">Final Assessment Essay</h2>`;
              html += `<p style="font-weight: bold; font-size: 12pt;">How 'modern' was Britain by 1750?</p>`;
              for (let i = 0; i < 30; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
              html += `</div>`;
              html += `<div style="page-break-before: always; margin-top: 20px;">`;
              for (let i = 0; i < 35; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
              html += `</div>`;

              return;
            }

            if (task.type === 'drawing' || task.type === 'draw') {
              html += `<div class="task-box" style="box-sizing: border-box; margin-bottom: 20px; border: 2px dashed #f59e0b; padding: 15px; border-radius: 8px; page-break-inside: avoid;">`;
              let _t = processTaskTextWithTariff(task.text || task.question);
              html += `<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<div style="height: 250px;"></div>`;
              html += `</div>`;
              return;
            }
            if (task.type === 'multiple_choice') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              task.questions.forEach((q, qIdx) => {
                html += `<p style="font-weight:bold; margin-bottom:5px;">${qIdx + 1}. ${q.q}</p><ul style="list-style-type:none; padding-left:10px; margin-top:0;">`;
                q.options.forEach((opt) => {
                  html += `<li style="margin-bottom: 5px;"><input type="checkbox" style="margin-right:8px; position:relative; top:2px;">${opt}</li>`;
                });
                html += `</ul>`;
              });
              html += `</div>`;
              return;
            }
            if (task.type === 'sorting') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<ul style="list-style-type:none; padding-left:0;">`;
              task.events.forEach((ev) => {
                html += `<li style="margin-bottom: 10px; display:flex; gap:10px;"><div style="width:30px; height:30px; border:1px solid #333; display:flex; align-items:center; justify-content:center;"></div><span>${ev}</span></li>`;
              });
              html += `</ul></div>`;
              return;
            }
            if (task.type === 'cloze') {
              let cloze = task.cloze_text.replace(/\[([^\]]+)\]/g, '[ . . . . . . . . ]');
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<p style="border: 1px solid #ccc; padding: 5px; font-weight: bold; font-size: 0.9em; text-align:center;">Word Bank: ${task.words.join(' | ')}</p>`;
              html += `<p style="line-height: 2;">${cloze}</p>`;
              html += `</div>`;
              return;
            }

            if (task.type === 'physician_game') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<p style="font-style: italic;">Read the patient symptoms below. Write down your recommended medieval cure in the empty box. Your teacher will reveal the outcome!</p>`;
              html += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">`;
              html += `<thead><tr><th style="border:1px solid #333; padding:8px; width:20%; background:#f1f5f9;">Patient</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Symptoms</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Your Recommended Cure</th></tr></thead>`;
              html += `<tbody>`;
              const patients = [
                {
                  name: 'William',
                  symptoms:
                    'High fever, shivering, and large, painful black swellings (buboes) in his armpits.',
                },
                {
                  name: 'Agnes',
                  symptoms: 'Coughing up blood, severe chest pain, and struggling to breathe.',
                },
                {
                  name: 'John',
                  symptoms:
                    'Fingers and toes have turned completely black. High fever and vomiting.',
                },
                {
                  name: 'Thomas',
                  symptoms: 'A runny nose, a mild cough, and feeling a bit tired.',
                },
              ];
              patients.forEach((p) => {
                html += `<tr>
                      <td style="border:1px solid #333; padding:8px; font-weight:bold;">${p.name}</td>
                      <td style="border:1px solid #333; padding:8px;">${p.symptoms}</td>
                      <td style="border:1px solid #333; padding:8px; height: 60px;"></td>
                    </tr>`;
              });
              html += `</tbody></table></div>`;
              return;
            }
            if (task.type === 'matching') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border:none;"><tbody>`;
              const rightMixed = [...task.pairs];
              task.pairs.forEach((p, i) => {
                html += `<tr>
                 <td style="border:1px solid #333; padding:10px; width:40%;">${(p.left || '').replace(/\n/g, '<br>')}</td>
                 <td style="width:20%; text-align:center;">&bull; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;</td>
                 <td style="border:1px solid #333; padding:10px; width:40%;">${(rightMixed[i].right || '').replace(/\n/g, '<br>')}</td>
               </tr>`;
              });
              html += `</tbody></table></div>`;
              return;
            }
            if (task.type === 'table_planner') {
              html += `<div class="task-box">`;
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<h4 style="margin-top: 0;">Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;"><thead><tr>`;
              task.columns.forEach((c) => {
                html += `<th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">${c}</th>`;
              });
              html += `</tr></thead><tbody>`;
              for (let i = 0; i < task.rows; i++) {
                html += `<tr>`;
                task.columns.forEach(() => {
                  html += `<td style="border: 1px solid #333; padding: 8px; height: 60px;"></td>`;
                });
                html += `</tr>`;
              }
              html += `</tbody></table></div>`;
              return;
            }
            if (task.type === 'think_pair_share') {
              html += `<div class="task-box" style="page-break-inside: avoid; box-sizing: border-box; border: 2px solid #10b981; padding: 15px; border-radius: 8px;">`;
              let _t = processTaskTextWithTariff(task.text || task.question);
              html += `<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q${globalQNum++} ${_t.cleanText}</h4>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              html += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px;">
               <thead><tr>
                 <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">1. My Thoughts (Think)</th>
                 <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">2. Partner's Thoughts (Pair)</th>
               </tr></thead>
               <tbody><tr>
                 <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                 <td style="border:1px solid #333; padding:8px; height:120px;"></td>
               </tr></tbody>
             </table></div>`;
              return;
            }

            let qText = task.question || task.text || '';
            qText = qText.replace(/\(Weighing the Evidence toggle tabs\)/gi, '');
            html += `<div class="task-box" style="page-break-inside: auto;">`;

            let match = qText.match(/^([A-Za-z0-9'\-\/ ]+):\s*([\s\S]*)/);
            if (match) {
              let subhead = match[1];
              let rest = match[2];
              if (currentUnitId === 'weimar_nazi_germany') {
                rest = rest.replace(/\n/g, '<br>');
              }
              html += `<h4 style="margin-top: 0; color: #0284c7; margin-bottom: 8px; font-size: 1.1em;">${subhead}</h4>`;
              html += `<div style="font-weight: bold; margin-top: 0; margin-bottom: 5px;">Q${globalQNum++}. ${rest}</div>`;
            } else {
              let formattedQ =
                currentUnitId === 'weimar_nazi_germany' ? qText.replace(/\n/g, '<br>') : qText;
              html += `<div style="font-weight: bold; margin-top: 0; margin-bottom: 5px;">Q${globalQNum++}. ${formattedQ}</div>`;
            }
            let hasExamTaskLater =
              lesson.gcse_task ||
              lesson.exam_practice ||
              (lesson.extended && lesson.extended.question);
            let numLines = !hasExamTaskLater && tIdx === lesson.tasks.length - 1 ? 20 : 6;
            for (let i = 0; i < numLines; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
            html += `</div>`;
          });
        }
        lesson.tasks = originalTasks; // Restore
      } else {
        let skipConsolidation =
          lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
        if (!skipConsolidation) {
          html += `<div style="page-break-inside: auto; margin-top: 30px; border-top: 2px solid #e2e8f0; padding-top: 20px;">`;
          html += `<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-pen-nib"></i> Lesson Consolidation</h2>`;

          if (lesson.lesson_assessment) {
            html += `<div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin-bottom: 15px;">`;
            html += `<div style="font-weight: bold; color: #166534; margin-top: 0; margin-bottom: 15px; font-size: 1.1em;">${lesson.lesson_assessment.question}</div>`;
            if (lesson.lesson_assessment.hints) {
              html += `<p style="font-size: 0.95rem; margin-bottom: 5px;"><strong>Hints:</strong> ${lesson.lesson_assessment.hints}</p>`;
            }
            if (lesson.lesson_assessment.sentence_starters) {
              html += `<p style="font-size: 0.95rem; margin-top: 5px; margin-bottom: 0;"><strong>Sentence Starters:</strong></p>`;
              html += `<ul style="font-size: 0.95rem; margin-top: 5px; margin-bottom: 0; padding-left: 20px;">`;
              lesson.lesson_assessment.sentence_starters.forEach((starter) => {
                html += `<li><em>${starter}</em></li>`;
              });
              html += `</ul>`;
            }
            html += `</div>`;
          } else {
            const consolText =
              lesson.consolidation ||
              "Reflect on today's learning and answer your teacher's final challenge.";
            html += `<p style="font-weight: bold; margin-bottom: 15px;">${consolText}</p>`;
          }

          for (let i = 0; i < 15; i++) {
            html += `<div class="task-lines-large"></div>`;
          }
          html += `</div>`;
        }
      }

      // GCSE Task
      let hasExamTask =
        lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
      if (hasExamTask) {
        html += `<div style="page-break-before: always; margin-top: 20px;">`;
        let fallbackExamTitle = [
          'water_and_sanitation',
          'early_modern_world',
          'change_1450_1750',
          'industrialisation_and_empire',
          'great_war',
          'great_war_part2',
        ].includes(unitId)
          ? 'Writing Practice'
          : 'GCSE Exam Practice';
        let examTitle =
          lesson.extended && lesson.extended.title ? lesson.extended.title : fallbackExamTitle;
        html += `<h2 style="margin-top: 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">${examTitle}</h2>`;

        const renderLines = (text, customLines) => {
          if (customLines) {
            for (let i = 0; i < customLines; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (text.includes('16 marks') || text.includes('12 marks')) {
            for (let i = 0; i < 40; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
            html += `<div style="page-break-before: always;"></div>`;
            for (let i = 0; i < 40; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (text.includes('Explain why')) {
            for (let i = 0; i < 64; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (text.includes('8 marks')) {
            for (let i = 0; i < 32; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (text.includes('2 marks')) {
            for (let i = 0; i < 3; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (
            text.includes('4 marks') ||
            text.includes('Explain one way') ||
            text.includes('Explain one consequence')
          ) {
            for (let i = 0; i < 5; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else {
            for (let i = 0; i < 6; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          }
        };

        // Injected Pair Share for Great War units, immediately before extended writing
        if (lesson.pair_share && (unitId === 'great_war' || unitId === 'great_war_part2')) {
          html += `<div class="task-box" style="  ">`;
          html += `<h3 style="margin-top: 0; color: #0f766e;">Pair & Share Activity</h3>`;

          if (lesson.pair_share.sources) {
            let sourceHTML = '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
            lesson.pair_share.sources.forEach((srcObj) => {
              sourceHTML +=
                '<div style="flex: 1; border: 1px solid #0d9488; padding-top: 5px; padding-bottom: 5px; text-align: left; ">';
              if (
                (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) &&
                unitId !== 'cme_new'
              ) {
                let imgSrc =
                  typeof resolveAssetPath === 'function'
                    ? resolveAssetPath(srcObj.src || srcObj.source || srcObj.image, 2)
                    : srcObj.src || srcObj.source || srcObj.image;
                sourceHTML += `<img src="${imgSrc}" style="max-width: 100%; max-height: 250px;">`;
              }
              if (srcObj.text || srcObj.content) {
                sourceHTML += `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${srcObj.text}</blockquote>`;
              }
              if (srcObj.title)
                sourceHTML += `<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\</p>`;
              sourceHTML += '</div>';
            });
            sourceHTML += '</div>';
            html += sourceHTML;
          }

          html += `<p style="font-weight: bold; font-size: 12pt; margin-bottom: 5px;">Q${globalQNum++}. Prompt: ${lesson.pair_share.prompt}</p>`;
          if (lesson.pair_share.think)
            html += `<p style="font-size: 12pt; font-style: italic; margin-top: 0;">Think: ${lesson.pair_share.think}</p>`;
          html += `<div style="margin-top: 15px; border-left: 4px solid #0f766e; padding-left: 15px;"><strong>Your Notes:</strong>`;
          for (let i = 0; i < 6; i++) {
            html += `<div class="task-lines-large"></div>`;
          }
          html += `</div>`;
          html += `</div>`;
        }

        if (lesson.extended && lesson.extended.question) {
          if (
            unitId === 'cme_new' &&
            lesson.extended.title &&
            lesson.extended.title.toLowerCase().includes('map task')
          ) {
            html += `<div class="task-box" style="margin-top: 10px; margin-bottom: 15px; border: 2px solid #1e3a8a; border-radius: 8px; padding: 10px 14px; background: #ffffff; page-break-inside: avoid;">`;
            if (lesson.extended.paragraphs && lesson.extended.paragraphs.length > 0) {
              html += `<div style="font-size: 9pt; color: #475569; margin-bottom: 8px; line-height: 1.35;">${lesson.extended.paragraphs.map((p) => formatText(p)).join(' ')}</div>`;
            }
            html += `<p style="font-size: 9.5pt; color: #1e293b; font-weight: 500; margin-bottom: 8px; line-height: 1.4;">${lesson.extended.instructions || lesson.extended.question}</p>`;

            if (lesson.extended.checklist) {
              const cl = lesson.extended.checklist;
              html += `<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; font-size: 8.5pt; line-height: 1.45;">`;
              html += `<div style="font-weight: bold; color: #1e293b; margin-bottom: 4px; text-transform: uppercase; font-size: 8pt; letter-spacing: 0.5px;">Pupil Task Checklist:</div>`;
              html += `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px 14px;">`;
              if (cl.countries) {
                html += `<div><strong style="color: #1e3a8a;">🌍 Countries (9):</strong><br>${cl.countries.map((c) => `<span style="display: inline-block; margin-right: 8px; font-family: monospace;">&#9633; ${c}</span>`).join(' ')}</div>`;
              }
              if (cl.capitals) {
                html += `<div><strong style="color: #1e3a8a;">🏛️ Capitals (8):</strong><br>${cl.capitals.map((c) => `<span style="display: inline-block; margin-right: 8px; font-family: monospace;">&#9633; ${c}</span>`).join(' ')}</div>`;
              }
              if (cl.waterways) {
                html += `<div style="grid-column: 1 / -1; margin-top: 3px; border-top: 1px dashed #cbd5e1; padding-top: 4px;"><strong style="color: #1e3a8a;">🌊 Waterways & Chokepoints (8):</strong><br>${cl.waterways.map((w) => `<span style="display: inline-block; margin-right: 10px; font-family: monospace;">&#9633; ${w}</span>`).join(' ')} <span style="display: inline-block; margin-right: 10px; font-family: monospace; font-weight: bold; color: #9a3412;">&#9633; Sinai Peninsula</span></div>`;
              }
              html += `</div></div>`;
            }

            const mapImg =
              typeof lesson.extended.source_a === 'string'
                ? lesson.extended.source_a
                : lesson.extended.source_a
                  ? lesson.extended.source_a.content
                  : '/images/middle_east_map.png';
            html += `<div style="text-align: center; margin: 4px 0;">`;
            html += `<img src="../../${mapImg.replace(/^\//, '')}" style="width: 100%; max-height: 440px; object-fit: contain; border: 1.5px solid #475569; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); background: #ffffff;" alt="Middle East Blank Outline Map">`;
            html += `</div>`;
            html += `</div>`; // Close task-box
            html += `</div>`; // Close Map Task 1 page wrapper
          } else {
            if (lesson.extended.source_a || lesson.extended.source_b) {
              let letterA = String.fromCharCode(sourceCharCode++);
              let letterB =
                lesson.extended.source_b && lesson.extended.source_a
                  ? String.fromCharCode(sourceCharCode++)
                  : '';
              if (letterB) {
                lesson.extended.question = lesson.extended.question.replace(
                  /Sources\s+A\s+and\s+B/g,
                  'Sources ' + letterA + ' and ' + letterB,
                );
                lesson.extended.question = lesson.extended.question.replace(
                  /Source\s+A/g,
                  'Source ' + letterA,
                );
                lesson.extended.question = lesson.extended.question.replace(
                  /Source\s+B/g,
                  'Source ' + letterB,
                );
              }

              html += `<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 10px; ">`;
              if (lesson.extended.source_a) {
                const prov =
                  typeof lesson.extended.source_a === 'string'
                    ? ''
                    : lesson.extended.source_a.provenance;
                const content =
                  typeof lesson.extended.source_a === 'string'
                    ? lesson.extended.source_a
                    : lesson.extended.source_a.content;
                const isImageA =
                  content.toLowerCase().endsWith('.png') || content.toLowerCase().endsWith('.jpg');
                const renderedA = isImageA
                  ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(content, 2) : `../..${content.startsWith('/') ? content : '/' + content}`}" style="max-width: 100%; max-height: 400px; object-fit: contain; margin: 0 auto; display: block;">`
                  : content.replace(/\n/g, '<br>');
                html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                    <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${letterA}</strong>
                    ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                    <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px;  color: #0f172a; flex-grow: 1;">
                      ${renderedA}
                    </div>
                  </div>`;
              }
              if (lesson.extended.source_b) {
                const prov =
                  typeof lesson.extended.source_b === 'string'
                    ? ''
                    : lesson.extended.source_b.provenance;
                const content =
                  typeof lesson.extended.source_b === 'string'
                    ? lesson.extended.source_b
                    : lesson.extended.source_b.content;
                const isImageB =
                  content.toLowerCase().endsWith('.png') || content.toLowerCase().endsWith('.jpg');
                const renderedB = isImageB
                  ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(content, 2) : `../..${content.startsWith('/') ? content : '/' + content}`}" style="max-width: 100%; max-height: 400px; object-fit: contain; margin: 0 auto; display: block;">`
                  : content.replace(/\n/g, '<br>');
                html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                    <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${letterB}</strong>
                    ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                    <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px;  color: #0f172a; flex-grow: 1;">
                      ${renderedB}
                    </div>
                  </div>`;
              }
              html += `</div>`;
            }

            if (lesson.extended.provenance_clue) {
              html += `<div style="margin-top: 15px; margin-bottom: 15px; padding-top: 12px; padding-bottom: 12px;  border: 1px solid #bfdbfe; border-radius: 6px; "><strong style="color: #1e3a8a;">Provenance Scaffolding:</strong><p style="margin: 5px 0 0 0; color: #1e40af; font-style: italic;">${formatText(lesson.extended.provenance_clue)}</p></div>`;
            }
            if (lesson.extended.hints && lesson.extended.hints.length > 0) {
              html += `<div style="margin-top: 15px; margin-bottom: 15px; padding: 15px; background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px;">`;
              html += `<strong style="color: #166534; font-size: 11pt;">Scaffolding & Hints:</strong>`;
              html += `<ul style="margin: 8px 0 0 0; padding-left: 20px; color: #15803d; font-size: 10pt;">`;
              lesson.extended.hints.forEach((hint) => {
                html += `<li style="margin-bottom: 4px;">${formatText(hint)}</li>`;
              });
              html += `</ul></div>`;
            }
            let _extInfo = processTaskTextWithTariff(lesson.extended.question, true);
            html += `<div style="margin-top: 15px;"><strong>Q${globalQNum++}. ${_extInfo.cleanText}</strong></div>`;
            if (_extInfo.badgeHtml) {
              html += _extInfo.badgeHtml;
            }
            if (
              !lesson.extended.title ||
              !lesson.extended.title.toLowerCase().includes('map task')
            ) {
              renderLines(lesson.extended.question, lesson.extended.lines);
            }
            html += `<br>`;
          }
        }

        if (unitId === 'cme_new' && lesson.secondary_map) {
          const sm = lesson.secondary_map;
          html += `<div style="page-break-before: always; break-before: always; margin-top: 20px;">`;
          html += `<h2 style="margin-top: 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">${sm.title}</h2>`;
          html += `<div class="task-box" style="page-break-inside: avoid; break-inside: avoid; border: 2px solid #1e3a8a; border-radius: 8px; padding: 10px 14px; background: #ffffff; margin-top: 10px; margin-bottom: 15px;">`;
          html += `<p style="font-size: 9.5pt; color: #334155; margin-bottom: 8px; line-height: 1.4;">${sm.instructions}</p>`;

          if (sm.checklist) {
            html += `<div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; margin-bottom: 8px; font-size: 8.5pt; line-height: 1.45;">`;
            html += `<div style="font-weight: bold; color: #1e293b; margin-bottom: 4px; text-transform: uppercase; font-size: 8pt; letter-spacing: 0.5px;">Pupil Task Checklist:</div>`;
            html += `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px 14px;">`;
            if (sm.checklist.neighbours) {
              html += `<div><strong style="color: #1e3a8a;">🚩 4 Immediate Neighbours:</strong><br>${sm.checklist.neighbours.map((n) => `<div style="font-family: monospace; margin: 1px 0;">&#9633; ${n}</div>`).join('')}</div>`;
            }
            if (sm.checklist.waterways) {
              html += `<div><strong style="color: #1e3a8a;">💧 Strategic Water Bodies:</strong><br>${sm.checklist.waterways.map((w) => `<div style="font-family: monospace; margin: 1px 0;">&#9633; ${w}</div>`).join('')}</div>`;
            }
            if (sm.checklist.occupied_territories) {
              html += `<div style="grid-column: 1 / -1; margin-top: 3px; border-top: 1px dashed #cbd5e1; padding-top: 4px;">`;
              html += `<strong style="color: #dc2626;">🖍️ Occupied Territories (June 1967):</strong> <span style="font-style: italic; color: #475569;">(Shade with diagonal lines /// and label)</span><br>`;
              html += `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px 14px; margin-top: 2px;">`;
              html += sm.checklist.occupied_territories
                .map((ot) => `<div style="font-family: monospace;">&#9633; ${ot}</div>`)
                .join('');
              html += `</div>`;
              html += `<div style="margin-top: 4px; font-family: monospace; font-weight: bold; color: #1e3a8a;">&#9633; Jerusalem ★ (Mark with a star on the 1949 Green Line)</div>`;
              html += `</div>`;
            }
            html += `</div></div>`;
          }

          const smMapImg =
            typeof sm.source_a === 'string'
              ? sm.source_a
              : sm.source_a
                ? sm.source_a.content
                : '/images/israel_zoomed_map.png';
          html += `<div style="text-align: center; margin: 4px 0;">`;
          html += `<img src="../../${smMapImg.replace(/^\//, '')}" style="width: 100%; max-height: 480px; object-fit: contain; border: 1.5px solid #475569; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); background: #ffffff;" alt="Israel and Frontiers Outline Map">`;
          html += `</div>`;
          html += `</div>`; // close task-box
          html += `</div>`; // close Map Task 2 page wrapper
        }

        if (lesson.gcse_task) {
          html += `<div class="task-box" style="margin-bottom: 15px; page-break-inside: auto; border-top: none; padding-top: 0; margin-top: 0;">`;

          if (lesson.gcse_task.tasks) {
            lesson.gcse_task.tasks.forEach((task) => {
              let isLong =
                task.text.includes('12 marks') ||
                task.text.includes('16 marks') ||
                task.marks === 12 ||
                task.marks === 16;
              if (isLong) {
                html += `<div class="dirt-box">
                    <h4 style="margin: 0 0 10px 0; color: #64748b; text-transform: uppercase; font-size: 0.85em; font-family: 'Inter', sans-serif;">Teacher Feedback / D.I.R.T.</h4>
                    <div style="height: 60px;"></div>
                 </div>`;
              }
              let pbBefore = isLong
                ? 'page-break-before: always; margin-top: 30px;'
                : 'margin-top: 15px;';
              let _t = processTaskTextWithTariff(
                task.text || task.question || task.instruction || task.title || '',
              );
              html += `<div style="${pbBefore}"><strong>${'Q' + globalQNum++ + '. '}${_t.cleanText}</strong></div>`;
              if (_t.badgeHtml) html += _t.badgeHtml;
              renderLines(task.text);
              html += `<br>`;
            });
          } else if (lesson.gcse_task.sources) {
            let letterA = String.fromCharCode(sourceCharCode++);
            let letterB =
              lesson.gcse_task.sources.length > 1 ? String.fromCharCode(sourceCharCode++) : '';

            if (lesson.gcse_task.topic) {
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(
                /Sources\s+A\s+and\s+B/g,
                'Sources ' + letterA + ' and ' + letterB,
              );
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(
                /Source\s+A/g,
                'Source ' + letterA,
              );
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(
                /Source\s+B/g,
                'Source ' + letterB,
              );
            }

            html += `<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 20px;">`;
            let topicText = lesson.gcse_task.topic || '';
            let tLower = topicText.toLowerCase();
            let isFullQuestion =
              tLower.includes('write a narrative account') ||
              tLower.includes('explain one consequence') ||
              tLower.includes('explain the importance') ||
              tLower.includes('how useful') ||
              tLower.includes('explain why') ||
              tLower.includes('describe');
            if (isFullQuestion) {
              let tariff = getTariffBadge(topicText);
              topicText = tariff.cleanTopic;
              html += `<div style="font-weight: bold; font-size: 13pt; margin-bottom: 10px;">Q${globalQNum++}. ${topicText}${tariff.badgeHtml}</div>`;
              if (tLower.includes('write a narrative account')) {
                html += `<div style="font-size: 11pt; color: #475569; font-style: italic; margin-bottom: 10px;">Read the historical sources below before writing your narrative account:</div>`;
              }
            } else {
              let tariff = getTariffBadge(topicText);
              topicText = tariff.cleanTopic;
              html += `<div style="font-weight: bold; font-size: 13pt; margin-bottom: 10px;">Q${globalQNum++}. How useful are Sources A and B for an enquiry into ${topicText}?${tariff.badgeHtml}</div>`;
            }

            let sourceHTML =
              '<div style="display: flex; gap: 20px; margin-bottom: 10px; page-break-inside: avoid; break-inside: avoid;">';
            lesson.gcse_task.sources.forEach((srcObj, i) => {
              sourceHTML +=
                '<div style="flex: 1; display: flex; flex-direction: column; justify-content: center; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1; page-break-inside: avoid; break-inside: avoid;">' +
                '<strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem; text-align: left;">Source ' +
                String.fromCharCode(65 + i) +
                '</strong>' +
                (srcObj.title
                  ? '<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic; text-align: left;">' +
                    srcObj.title.replace(/Source [A-Z]:\s*/g, '') +
                    '</span>'
                  : '');
              if (
                (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) &&
                unitId !== 'cme_new'
              ) {
                let imgSrc =
                  typeof resolveAssetPath === 'function'
                    ? resolveAssetPath(srcObj.src || srcObj.source || srcObj.image, 2)
                    : srcObj.src || srcObj.source || srcObj.image;
                sourceHTML += `<img src="${imgSrc}" style="max-width: 100%; max-height: 250px;">`;
              }
              if (srcObj.text || srcObj.content) {
                sourceHTML += `<blockquote style="font-size: 12pt; font-style: italic; margin: 0 0 10px 0; text-align: left;">${srcObj.text}</blockquote>`;
              }
              sourceHTML += `<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\</p>`;
              sourceHTML += '</div>';
            });
            sourceHTML += '</div>';
            html += sourceHTML;
            html += `</div>`;

            if (unitId === 'edexcel_medicine' || unitId === 'weimar_nazi_germany') {
              html += `<h3 style="margin-top: 0;">Source Evaluation Notes</h3>
              <table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; ">
                <tr><th style=" padding-top: 8px; padding-bottom: 8px; width: 10%;">Source</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">N.O.P.</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">Content</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">Context</th></tr>
                <tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">${letterA}</td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td></tr>
                <tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">${letterB}</td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td></tr>
              </table>`;
              html += `<h3 style="margin-top: 0;">Final Written Evaluation</h3>`;
              for (let i = 0; i < 10; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
            } else {
              html += `<br>`;
              for (let i = 0; i < 20; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
            }
          } else if (lesson.gcse_task.topic) {
            let tariff = getTariffBadge(lesson.gcse_task.topic);
            lesson.gcse_task.topic = tariff.cleanTopic;
            html += `<div style="font-weight: bold; font-size: 13pt; margin-bottom: 10px;">Q${globalQNum++}. ${lesson.gcse_task.topic}${tariff.badgeHtml}</div>`;

            if (lesson.gcse_task.topic.toLowerCase().includes('narrative account')) {
              html += `<div style="margin: 15px 0; padding-top: 12px; padding-bottom: 12px;   border-radius: 6px; ">
                <strong style="color: #b71c1c; font-size: 11pt;">Planning your narrative account:</strong>
                <p style="font-size: 10pt; margin-top: 5px; margin-bottom: 5px;">Remember to link your paragraphs chronologically. You could use these sentence starters:</p>
                <ul style="font-size: 10pt; margin-top: 0; margin-bottom: 0; padding-left: 20px;">
                  <li><em>The first key event was...</em></li>
                  <li><em>This directly led to...</em></li>
                  <li><em>Consequently, this triggered...</em></li>
                  <li><em>This situation culminated in...</em></li>
                </ul>
             </div>`;
            }

            html += `<br>`;
            let match = lesson.gcse_task.topic.match(/\((\d+)\s*marks?\)/i);
            let marks = match ? parseInt(match[1]) : 8;
            let numLines = marks === 4 ? 4 : marks * 3;
            for (let i = 0; i < numLines; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          }

          html += `</div>`;
        }

        if (lesson.sources && lesson.sources.length > 0 && isGCSE) {
          html += `<div style="page-break-inside: auto; margin-bottom: 15px; margin-top: 20px;">`;
          lesson.sources.forEach((source, sIdx) => {
            let sourceContent = source.content || source.text;
            let hasImage = source.src || source.source || source.image;
            // Strip purely visual sources from pupil workbook
            if (hasImage && !sourceContent && unitId === 'cme_new') return;

            if (hasImage || source.caption || sourceContent) {
              html += `
              <div class="source-container" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 6px;">
                ${source.title ? `<strong style="font-size: 11pt;">${source.title}</strong><br>` : ''}
                ${source.src || source.source || source.image ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(source.src || source.source || source.image, 2) : source.src || source.source || source.image}" alt="Source" style="max-width: 100%; max-height: 250px; margin-top: 10px;">` : ''}
                ${sourceContent ? `<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px; font-style: italic;">${formatText(sourceContent)}</blockquote>` : ''}
                ${source.caption ? `<div class="source-caption" style="margin-top: 5px; font-size: 10pt;">${source.caption}</div>` : ''}
              </div>
            `;
            }
          });
          html += `</div>`;
        }

        let epArray = lesson.exam_practice;
        let epStimulus = [];
        if (
          lesson.exam_practice &&
          !Array.isArray(lesson.exam_practice) &&
          lesson.exam_practice.questions
        ) {
          epArray = lesson.exam_practice.questions;
          epStimulus = lesson.exam_practice.stimulus || [];
        }
        if (epArray && epArray.length > 0) {
          if (unitId === 'cme_new' && lesson.secondary_map) {
            html += `<div style="page-break-before: always; margin-top: 20px;">`;
            html += `<h2 style="margin-top: 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">GCSE Exam Practice</h2>`;
          }
          html += `<div class="task-box" style="margin-bottom: 10px; page-break-inside: avoid; border-top: none; padding-top: 0; margin-top: 0;">`;

          let questionsBefore = [];
          let questionsAfter = [];
          epArray.forEach((ep, index) => {
            let qText = (ep.question || ep.text || '').toLowerCase();
            if (
              qText.includes('explain why') ||
              qText.includes('explain one consequence') ||
              qText.includes('describe two features') ||
              qText.includes('describe one feature')
            ) {
              questionsBefore.push({ ep, index });
            } else if (qText.includes('source') || qText.includes('interpretation')) {
              questionsAfter.push({ ep, index });
            } else {
              if (index < 2) questionsBefore.push({ ep, index });
              else questionsAfter.push({ ep, index });
            }
          });

          const renderQuestionLines = (qText) => {
            qText = qText || '';
            let lines = 8;
            if (qText.includes('16 marks')) lines = 96;
            else if (qText.includes('12 marks') || qText.includes('Explain why')) lines = 64;
            else if (qText.includes('8 marks')) lines = 32;
            else if (
              qText.includes('4 marks') ||
              qText.includes('Explain one way') ||
              qText.includes('Explain one consequence') ||
              qText.includes('difference') ||
              qText.includes('Suggest one reason')
            )
              lines = 5;
            else if (qText.includes('2 marks')) lines = 3;
            let lHtml = '';
            for (let i = 0; i < lines; i++) {
              lHtml += `<div class="task-lines-large"></div>`;
            }
            return lHtml;
          };

          const getDirtBoxHtml = (marks) => {
            const isSpag = marks === 16;
            const properNounExample =
              unitId === 'weimar_nazi_germany' ? ' (e.g. Reichstag, Ebert)' : '';
            const spagHtml = isSpag
              ? `
            <div style="margin-top: 6px; margin-bottom: 8px; padding: 6px 10px; background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 8.5pt; color: #334155;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                <strong style="color: #1e3a8a;">SPaG Self/Peer Checklist (4 Marks):</strong>
                <span><input type="checkbox" style="vertical-align: middle; margin-right: 4px;"> Historical terminology spelled accurately</span>
                <span><input type="checkbox" style="vertical-align: middle; margin-right: 4px;"> Capital letters for proper nouns${properNounExample}</span>
                <span><input type="checkbox" style="vertical-align: middle; margin-right: 4px;"> Punctuation separates complex clauses</span>
              </div>
            </div>`
              : '';

            return `
          <div class="dirt-box" style="margin-top: 20px; margin-bottom: 15px; border: 2px dashed #94a3b8; border-radius: 8px; padding: 12px 16px; background-color: #f8fafc; page-break-inside: avoid; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 6px; margin-bottom: 10px;">
              <h4 style="margin: 0; color: #1e3a8a; text-transform: uppercase; font-size: 10pt; letter-spacing: 0.5px; font-family: 'Inter', sans-serif;">Teacher Feedback &amp; D.I.R.T.</h4>
              <div style="font-size: 9.5pt; color: #334155;">
                <strong>Mark:</strong> &nbsp;______ / ${marks === 16 ? '16 (+4 SPaG)' : marks} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; <strong>Effort:</strong> &nbsp;1 &nbsp;2 &nbsp;3 &nbsp;4 &nbsp;5
              </div>
            </div>
            ${spagHtml}
            <div style="display: flex; gap: 15px; font-size: 9pt; margin-bottom: 8px;">
              <div style="flex: 1;">
                <strong style="color: #16a34a;">What Went Well (WWW):</strong>
                <div style="border-bottom: 1px dotted #94a3b8; height: 18px; margin-top: 4px;"></div>
                <div style="border-bottom: 1px dotted #94a3b8; height: 18px; margin-top: 4px;"></div>
              </div>
              <div style="flex: 1;">
                <strong style="color: #ea580c;">Even Better If (EBI):</strong>
                <div style="border-bottom: 1px dotted #94a3b8; height: 18px; margin-top: 4px;"></div>
                <div style="border-bottom: 1px dotted #94a3b8; height: 18px; margin-top: 4px;"></div>
              </div>
            </div>
            <div style="font-size: 9pt; margin-top: 6px;">
              <strong style="color: #2563eb;">Student D.I.R.T. Response / Correction:</strong>
              <div style="border-bottom: 1px dotted #94a3b8; height: 18px; margin-top: 4px;"></div>
              <div style="border-bottom: 1px dotted #94a3b8; height: 18px; margin-top: 4px;"></div>
            </div>
          </div>`;
          };

          const renderQuestionItem = (item, isBeforeSources = false, itemIdx = 0) => {
            let ep = item.ep;
            let index = item.index;
            let rawQText = ep.question || ep.text || '';
            let marksStr = ep.marks ? ` (${ep.marks} marks)` : '';
            if (rawQText.includes('marks)')) marksStr = '';
            let isLong =
              rawQText.includes('12 marks') ||
              rawQText.includes('16 marks') ||
              ep.marks === 12 ||
              ep.marks === 16;

            let pbBefore;
            if (unitId === 'weimar_nazi_germany') {
              if (isBeforeSources && itemIdx === 0) {
                pbBefore = 'margin-top: 15px;';
              } else {
                pbBefore = 'margin-top: 20px;';
              }
            } else {
              pbBefore = isLong
                ? 'page-break-before: always; margin-top: 30px;'
                : 'margin-top: 15px;';
            }

            let _tInfo3 = processTaskTextWithTariff(rawQText, true);
            let questionHtml = `<div style="${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>${'Q' + globalQNum++}. ${_tInfo3.cleanText}</strong></div>`;
            if (_tInfo3.badgeHtml) {
              questionHtml += _tInfo3.badgeHtml.replace(
                '<div style="margin-top: 5px; margin-bottom: 15px;">',
                '<div style="margin-top: 5px; margin-bottom: 15px; margin-left: 15px;">',
              );
            } else if (ep.marks) {
              // ... fallback handled by existing code
            }
            if (isLong && unitId !== 'weimar_nazi_germany') {
              questionHtml =
                `<div class="dirt-box">
                    <h4 style="margin: 0 0 10px 0; color: #64748b; text-transform: uppercase; font-size: 0.85em; font-family: 'Inter', sans-serif;">Teacher Feedback / D.I.R.T.</h4>
                    <div style="height: 60px;"></div>
                 </div>` + questionHtml;
            }

            if (ep.stimulus && ep.stimulus.length > 0) {
              let isSources =
                ep.question.toLowerCase().includes('useful') ||
                ep.question.toLowerCase().includes('follow up') ||
                ep.stimulus.some(
                  (s) =>
                    typeof s === 'string' && (s.includes('Source A') || s.includes('Source B')),
                );
              if (isSources) {
                questionHtml += `<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 10px;">`;
                ep.stimulus.forEach((stimText, i) => {
                  questionHtml += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                       <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${String.fromCharCode(65 + i)}</strong>
                       <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px;  color: #0f172a; flex-grow: 1;">
                         ${formatText(stimText.replace(/<strong>Source [A-Z]:\s*<\/strong>/, '').replace(/\n/g, '<br>'))}
                       </div>
                     </div>`;
                });
                questionHtml += `</div>`;
              } else {
                questionHtml += `<div style="margin-top: 5px; margin-bottom: 10px; padding-top: 5px; padding-bottom: 5px; border: 1.5px solid #cbd5e1; border-radius: 8px;   font-size: 0.95rem;">
                     <p style="margin-top: 0; margin-bottom: 8px; font-weight: bold;">You may use the following in your answer:</p>
                     <ul style="margin-top: 0; margin-bottom: 8px; padding-left: 25px;">`;
                ep.stimulus.forEach((stimText) => {
                  questionHtml += `<li style="margin-bottom: 4px;">${formatText(stimText)}</li>`;
                });
                questionHtml += `</ul><p style="margin-top: 0; margin-bottom: 0; font-weight: bold;">You must also use information of your own.</p></div>`;
              }
            }
            let scaffoldBoxHtml = '';
            const is4Mark =
              (item.tariff && item.tariff.includes('4')) ||
              item.type === '4-mark' ||
              (lesson.exam_practice && lesson.exam_practice.type === 'consequence_4m');
            if (is4Mark && unitId === 'cme_new') {
              scaffoldBoxHtml += `
                <div style="margin: 8px 0 10px 0; border: 1.5px solid #0284c7; border-radius: 6px; background: #f0f9ff; padding: 8px 12px; page-break-inside: avoid;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid #bae6fd; padding-bottom: 4px;">
                    <span style="font-weight: 800; font-size: 8.5pt; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;">🎯 Edexcel 4-Mark Consequence Formula Stamp</span>
                    <span style="background: #0284c7; color: white; font-size: 7.5pt; font-weight: bold; padding: 1px 6px; border-radius: 8px;">[4 marks &bull; 5 mins]</span>
                  </div>
                  <div style="display: grid; grid-template-columns: auto 1fr; gap: 4px 8px; font-size: 7.8pt; line-height: 1.3; color: #0f172a;">
                    <span style="background: #0284c7; color: white; font-weight: bold; padding: 1px 6px; border-radius: 3px; font-family: monospace; text-align: center; height: fit-content;">P</span>
                    <div><strong>Point (Consequence):</strong> <em>"One significant consequence of [Event] was..."</em> (Directly name the resulting change)</div>
                    <span style="background: #0284c7; color: white; font-weight: bold; padding: 1px 6px; border-radius: 3px; font-family: monospace; text-align: center; height: fit-content;">E</span>
                    <div><strong>Evidence (Historical Fact):</strong> <em>"Specifically, [names, dates, treaties, or figures]..."</em> (Deploy precise detail)</div>
                    <span style="background: #0284c7; color: white; font-weight: bold; padding: 1px 6px; border-radius: 3px; font-family: monospace; text-align: center; height: fit-content;">E</span>
                    <div><strong>Explanation (Causal Impact):</strong> <em>"This resulted in... / Consequently, this led to..."</em> (Explain the ongoing effect)</div>
                  </div>
                </div>
              `;
            }
            if (unitId === 'cme_new' && ep.scaffolding) {
              const sc = ep.scaffolding;
              const stepsText = (sc.steps || [])
                .map((s) => `<strong>[${s.letter}] ${s.name}:</strong> ${s.prompt}`)
                .join('<br>');
              const startersText = (sc.sentence_starters || [])
                .slice(0, 3)
                .map((st) => `• <em>"${st}"</em>`)
                .join('<br>');
              const connectivesText = (sc.connectives_bank || []).join(' &bull; ');
              scaffoldBoxHtml = `
                <div style="margin: 10px 0 12px 0; border: 1.5px solid #1e3a8a; border-radius: 6px; overflow: hidden; background: #ffffff; page-break-inside: avoid;">
                  <div style="background: #1e3a8a; color: #ffffff; padding: 4px 10px; font-size: 8.5pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; display: flex; justify-content: space-between;">
                    <span>Exam Structure Strip: ${sc.acronym_title || sc.acronym}</span>
                    <span style="font-weight: normal; opacity: 0.9;">Edexcel Paper 2</span>
                  </div>
                  <div style="padding: 8px 12px; font-size: 8pt; color: #1e293b; line-height: 1.35; background: #f8fafc;">
                    ${sc.guidance ? `<div style="font-style: italic; color: #475569; margin-bottom: 6px;">${sc.guidance}</div>` : ''}
                    <div style="margin-bottom: 6px;">${stepsText}</div>
                    ${startersText ? `<div style="margin-top: 4px; border-top: 1px dashed #cbd5e1; padding-top: 4px; color: #1e40af;"><strong>Sentence Starters:</strong><br>${startersText}</div>` : ''}
                    ${connectivesText ? `<div style="margin-top: 4px; color: #64748b;"><strong>Causal Connectives:</strong> ${connectivesText}</div>` : ''}
                  </div>
                </div>
              `;
            }
            html += questionHtml + scaffoldBoxHtml + renderQuestionLines(ep.question);

            if (unitId === 'weimar_nazi_germany') {
              let is3d = rawQText.includes('3d') || rawQText.includes('16 marks');
              if (is3d) {
                html += getDirtBoxHtml(16);
              }
            }
          };

          questionsBefore.forEach((item, qIdx) => renderQuestionItem(item, true, qIdx));

          if (epStimulus && epStimulus.length > 0) {
            html += `</div>`; // Close the initial task-box
            html += `<div style="page-break-before: always; page-break-inside: auto; margin-top: 20px;">`; // Force new page for sources
            html += `<h2 style="margin-top: 15px; margin-bottom: 15px; color: #1a237e; font-size: 14pt; border-bottom: none;">Exam Sources & Interpretations</h2>`;
            sources = [];
            interpretations = [];
            epStimulus.forEach((stim, i) => {
              let sTitle = stim.title || `Source ${String.fromCharCode(65 + i)}`;
              if (sTitle.toLowerCase().includes('interpretation')) {
                interpretations.push({ stim, sTitle });
              } else {
                sources.push({ stim, sTitle });
              }
            });

            if (sources.length > 0) {
              html += `<div style="display: flex; gap: 15px; margin-top: 15px; margin-bottom: 15px;">`;
              sources.forEach((item) => {
                let content = formatText(item.stim.content || item.stim).replace(/\n/g, '<br>');
                html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.9rem; line-height: 1.3;">
                      <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1rem;">${item.sTitle}</strong>
                      <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding-top: 5px; padding-bottom: 5px;  color: #0f172a; flex-grow: 1;">
                        ${content}
                      </div>
                    </div>`;
              });
              html += `</div>`;
            }
            if (interpretations.length > 0) {
              html += `<div style="display: flex; gap: 15px; margin-top: 15px; margin-bottom: 15px;">`;
              interpretations.forEach((item) => {
                let content = formatText(item.stim.content || item.stim).replace(/\n/g, '<br>');
                html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.9rem; line-height: 1.3;">
                      <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1rem;">${item.sTitle}</strong>
                      <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding-top: 5px; padding-bottom: 5px;  color: #0f172a; flex-grow: 1;">
                        ${content}
                      </div>
                    </div>`;
              });
              html += `</div>`;
            }
            html += `</div>`; // Close the isolated sources page
            html += `<div class="task-box" style="margin-bottom: 10px;   page-break-inside: auto;">`; // Re-open task-box for the remaining questions
          }

          questionsAfter.forEach((item, qIdx) => renderQuestionItem(item, false, qIdx));
          html += `</div>`;
        }
        if (!(unitId === 'cme_new' && lesson.secondary_map)) {
          html += `</div>`;
        }
      }

      // Full Page Map
      if (false && lesson.full_page_map) {
        let mapSrc =
          typeof resolveAssetPath === 'function'
            ? resolveAssetPath(lesson.full_page_map, 2)
            : `../..${lesson.full_page_map}`;
        html += `<div style="page-break-before: always; height: 95vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">`;
        html += `<img src="${mapSrc}" style="max-width: 100%; max-height: 95vh; object-fit: contain; margin: auto; display: block;">`;
        html += `</div>`;
      }
      allVideos = [];
      if (lesson.video) {
        if (Array.isArray(lesson.video)) allVideos = allVideos.concat(lesson.video);
        else allVideos.push(lesson.video);
      }
      if (lesson.extra_videos && lesson.extra_videos.length > 0) {
        allVideos = allVideos.concat(lesson.extra_videos);
      }
      flatQuestions.sort((a, b) => a.qNum - b.qNum);
      flatQuestions.forEach((q) => (html += q.html));

      // --- EXIT TICKET (LESSON CLOSURE) FOR CME_NEW / PUPIL VOICE FOR OTHER UNITS ---
      if (unitId === 'cme_new' && lesson.exit_ticket) {
        const et = lesson.exit_ticket;
        const etMargin = lesson.secondary_map ? '12px' : '20px';
        html += `<div class="exit-ticket-box" style="page-break-inside: avoid; margin-top: ${etMargin}; border: 2px solid #3b82f6; border-radius: 8px; padding: 10px 14px; background: #f8fafc;">`;
        html += `<div style="margin-bottom: 8px;">
          <div style="font-weight: bold; color: #1e3a8a; font-size: 10pt; margin-bottom: 4px; text-transform: uppercase; display: flex; justify-content: space-between; align-items: center;">
            <span>🚪 ${et.title || 'Exit Ticket'}</span>
            <span style="font-size: 8pt; background: #dbeafe; color: #1e40af; padding: 2px 7px; border-radius: 9999px; font-weight: 600;">${et.type_label || 'Closure Activity'}</span>
          </div>
          <p style="margin: 0 0 6px 0; font-size: 9pt; color: #1e293b; line-height: 1.35; font-weight: 500;">${formatText(et.prompt)}</p>
          ${et.options && et.options.length > 0 ? `<div style="font-size: 8.5pt; color: #334155; margin-bottom: 6px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; line-height: 1.3;">${et.options.map((o) => `<div style="margin-bottom: 3px;">• ${formatText(o)}</div>`).join('')}</div>` : ''}
          ${et.guidance ? `<p style="margin: 0; font-size: 8pt; color: #64748b; font-style: italic;"><strong>Teacher Guidance:</strong> ${formatText(et.guidance)}</p>` : ''}
        </div>`;
        html += `<div style="font-size: 8.5pt; font-weight: bold; color: #475569; margin-bottom: 4px;">Pupil Response:</div>`;
        for (let i = 0; i < 4; i++) {
          html += `<div class="task-lines-large"></div>`;
        }
        html += `</div>`;
        if (unitId === 'cme_new' && lesson.secondary_map) {
          html += `</div>`; // closes the GCSE Exam Practice + Exit Ticket page wrapper
        }
      }

      // Inject General Notes Box
      if (unitId !== 'cme_new') {
        html += `
        <div style="page-break-before: always; margin-top: 20px;">
          <h3 style="margin-top: 0; color: #334155;">General Notes</h3>
      `;
        for (let i = 0; i < 18; i++) {
          html += `<div class="task-lines-large"></div>`;
        }
        html += `</div>`;
      }

      // Inject Discreet Grading Footer for the Lesson (KS3 ONLY)
      const isGCSEUnit = ['weimar_nazi_germany', 'cme_new', 'edexcel_medicine', 'eee'].includes(
        unitId,
      );
      if (!isGCSEUnit) {
        html += `
        <div style="margin-top: 10px;"></div>
        <div class="grading-footer">
          <div class="grading-boxes">
            <label class="grade-box"><input type="checkbox"> Emerging (1-2)</label>
            <label class="grade-box"><input type="checkbox"> Emerging+ (3)</label>
            <label class="grade-box"><input type="checkbox"> Expected (4-5)</label>
            <label class="grade-box"><input type="checkbox"> Expected+ (6-7)</label>
            <label class="grade-box"><input type="checkbox"> Greater Depth (8-9)</label>
          </div>
          <div>Teacher Comment: <span class="teacher-comment"></span></div>
        </div>
      `;
      }

      if (unitId === 'cme_new') {
        const warCanvas = generateCmeWarTimelineCanvas(lesson);
        if (warCanvas) html += warCanvas;
      }

      if (unitId === 'medieval_england') {
        const castleCanvas = generateMedievalCastleDraftingPage(lesson);
        if (castleCanvas) html += castleCanvas;
      }

      if (unitId === 'edexcel_medicine') {
        const triadCanvas = generateConceptualTriadPage(lesson, unitId);
        if (triadCanvas) html += triadCanvas;
      }

      if (allVideos.length > 0) {
        appendixData.push({ title: lesson.title, videos: allVideos });
      }
    });

    if (unitId === 'cme_new') {
      const masterTimeline = generateCmeMasterRevisionTimeline(period.name);
      if (masterTimeline) html += masterTimeline;
    }

    // --- PUPIL VOICE (END OF UNIT CAPSTONE) ---
    // Generate the holistic pupil voice page at the very end of the booklet
    if (unitId !== 'v2-app' && periodLessons.length > 0) {
      // Find the unit title from curriculum_meta.json or fallback
      let titleDisplay = 'this unit';
      try {
        const metaPath = path.join(PATHS.PUBLIC, 'curriculum_meta.json');
        if (fs.existsSync(metaPath)) {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
          let found = false;
          for (const yg of meta.yearGroups) {
            for (const u of yg.units) {
              if (u.uid === unitId) {
                titleDisplay = u.shortTitle;
                found = true;
                break;
              }
            }
            if (found) break;
          }
        }
      } catch (e) {
        // Just fallback
      }

      html += `<div style="page-break-before: always; padding: 18px 20px; border: 2px solid #1b365d; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 14px;">
          <h2 style="font-family: 'Playfair Display', serif; color: #1b365d; font-size: 20pt; margin: 0; border-bottom: 2px solid #facc15; display: inline-block; padding-bottom: 4px;">End of Unit Reflection & Pupil Voice</h2>
          <p style="color: #475569; font-style: italic; margin-top: 6px; margin-bottom: 0; font-size: 10pt;">Unit: ${titleDisplay}</p>
        </div>

        <p style="font-size: 10pt; margin-bottom: 14px;"><strong>Instructions:</strong> Now that you have completed your final assessment, take 10 minutes to reflect on your learning across this entire unit. Be honest—this is your chance to use your <strong>Pupil Voice</strong> to help your teacher plan future lessons.</p>

        <div style="margin-top: 10px;">
            <h3 style="color: #1e40af; margin-bottom: 3px; font-size: 12pt;">1. What Went Well (WWW)</h3>
            <p style="font-size: 9pt; color: #64748b; margin-top: 0; margin-bottom: 5px;">What topic or skill did you find most engaging or easiest to understand in this unit?</p>
            <div style="border: 1px solid #cbd5e1; height: 70px; background: #f8fafc; margin-bottom: 12px;"></div>
        </div>

        <div style="margin-top: 10px;">
            <h3 style="color: #1e40af; margin-bottom: 3px; font-size: 12pt;">2. Even Better If (EBI)</h3>
            <p style="font-size: 9pt; color: #64748b; margin-top: 0; margin-bottom: 5px;">What did you find most challenging? Are there any concepts you are still confused about?</p>
            <div style="border: 1px solid #cbd5e1; height: 70px; background: #f8fafc; margin-bottom: 12px;"></div>
        </div>

        <div style="margin-top: 10px;">
            <h3 style="color: #1e40af; margin-bottom: 3px; font-size: 12pt;">3. Effort & Target Setting</h3>
            <p style="font-size: 9.5pt; color: #0f172a; margin-top: 0; margin-bottom: 5px;">Circle your effort level for this unit: &nbsp;&nbsp; <strong>1 (Low) &nbsp;&nbsp;&nbsp; 2 &nbsp;&nbsp;&nbsp; 3 &nbsp;&nbsp;&nbsp; 4 &nbsp;&nbsp;&nbsp; 5 (Excellent)</strong></p>
            <p style="font-size: 9pt; color: #64748b; margin-bottom: 5px; margin-top: 0;">What is one specific target you want to set for yourself in the next unit?</p>
            <div style="border: 1px solid #cbd5e1; height: 55px; background: #f8fafc; margin-bottom: 14px;"></div>
        </div>

        <hr style="border: 0; border-top: 2px dashed #cbd5e1; margin: 14px 0;">

        <h3 style="color: #92400e; margin-bottom: 3px; font-size: 12pt;">Teacher Feedback & Coaching</h3>
        <p style="font-size: 9pt; color: #64748b; margin-top: 0; margin-bottom: 5px;">(To be completed during live marking / feedback lessons)</p>
        <div style="border: 2px solid #fde68a; height: 120px; background: #fef3c7; border-radius: 4px;"></div>

      </div>`;
    }
    // --- END PUPIL VOICE CAPSTONE ---

    if (unitId === 'cme_new') {
      let allExamTasksHtml = '';
      periodLessons.forEach((lesson) => {
        let hasExamTask =
          lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
        if (hasExamTask) {
          allExamTasksHtml += `<div style="margin-bottom: 25px; padding: 15px; border: 1px solid #cbd5e1; border-radius: 8px; background-color: #f8fafc; page-break-inside: avoid;">`;
          allExamTasksHtml += `<h4 style="margin: 0 0 10px 0; color: #1e3a8a; font-size: 13pt;">From ${lesson.title}</h4>`;

          if (lesson.extended && lesson.extended.question) {
            allExamTasksHtml += `<div style="margin-bottom: 10px;"><strong>Q. ${formatText(lesson.extended.question)}</strong></div>`;
          }

          if (lesson.gcse_task) {
            if (lesson.gcse_task.tasks) {
              lesson.gcse_task.tasks.forEach((task) => {
                let _t2 = processTaskTextWithTariff(
                  task.text || task.question || task.instruction || task.title || '',
                );
                allExamTasksHtml += `<div style="margin-top: 10px;"><strong>Q. ${_t2.cleanText}</strong></div>`;
                if (_t2.badgeHtml) allExamTasksHtml += _t2.badgeHtml;
              });
            } else if (lesson.gcse_task.topic) {
              let topicText = lesson.gcse_task.topic || '';
              let tLower = topicText.toLowerCase();
              let isFullQuestion =
                tLower.includes('write a narrative account') ||
                tLower.includes('explain one consequence') ||
                tLower.includes('explain the importance') ||
                tLower.includes('how useful') ||
                tLower.includes('explain why') ||
                tLower.includes('describe');
              if (isFullQuestion) {
                allExamTasksHtml += `<div style="font-weight: bold; margin-bottom: 10px; margin-top: 10px;">Q.. ${topicText}</div>`;
              } else {
                allExamTasksHtml += `<div style="font-weight: bold; margin-bottom: 10px; margin-top: 10px;">Q.. How useful are Sources A and B for an enquiry into ${topicText}?</div>`;
              }

              if (lesson.gcse_task.sources) {
                lesson.gcse_task.sources.forEach((srcObj, i) => {
                  if (srcObj.type !== 'visual') {
                    allExamTasksHtml += `<div style="margin-top: 10px; padding: 10px; border-left: 3px solid #ccc; font-style: italic; font-size: 11pt;"><strong>${srcObj.title}:</strong> ${srcObj.text}</div>`;
                  }
                });
              }
            }
          }

          if (lesson.exam_practice) {
            let epArray = lesson.exam_practice;
            if (!Array.isArray(lesson.exam_practice) && lesson.exam_practice.questions) {
              epArray = lesson.exam_practice.questions;
            }
            if (epArray && epArray.length > 0) {
              epArray.forEach((ep, index) => {
                let epQuestion = ep.question || ep.text || '';
                let marksStr = ep.marks ? ` (${ep.marks} marks)` : '';
                if (epQuestion.includes('marks)')) marksStr = '';
                if (epQuestion.toLowerCase().includes('explain why')) marksStr = '';
                let _tInfo2 = processTaskTextWithTariff(epQuestion, true);
                allExamTasksHtml += `<div style="margin-top: 10px;"><strong>${index + 1}. ${_tInfo2.cleanText}</strong></div>`;
                if (_tInfo2.badgeHtml) allExamTasksHtml += _tInfo2.badgeHtml;
              });
            }
          }

          allExamTasksHtml += `</div>`;
        }
      });

      if (allExamTasksHtml) {
        html += `<div style="page-break-before: always;">
            <h2 style="font-size: 24pt; color: #1e3a8a; text-align: center; border-bottom: 3px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 30px;">GCSE Exam Practice: Question Bank</h2>
            <p style="font-size: 12pt; text-align: center; margin-bottom: 30px; font-style: italic;">Choose an exam question from the bank below and answer it on the blank lined pages that follow.</p>
            ${allExamTasksHtml}
          </div>`;

        let examPagesCount = 4;
        if (unitId === 'cme_new') {
          if (period.name === 'KT2') examPagesCount = 3;
          if (period.name === 'KT3') examPagesCount = 4;
        }
        for (let p = 0; p < examPagesCount; p++) {
          html += `<div style="page-break-before: always; padding-top: 20px;">`;
          html += `<h3 style="margin-top: 0; color: #64748b; margin-bottom: 20px;">Exam Practice Space (Page ${p + 1})</h3>`;
          for (let i = 0; i < 32; i++) {
            html += `<div class="task-lines-large"></div>`;
          }
          html += `</div>`;
        }
      }
    }

    if (unitId === 'edexcel_medicine' || unitId === 'western_front') {
      html += `
    <div style="page-break-before: always; padding: 20px;">
      <h2 style="text-align: center; font-size: 18pt; margin-bottom: 15px; font-family: 'Playfair Display', serif; color: #1a237e;">Factors Overview: ${periodTitle}</h2>
      <p style="text-align: center; font-size: 12pt; margin-bottom: 15px;">Edexcel focuses heavily on the factors that drove medical progress (or held it back). For each factor below, write one specific historical example from this period that either helped or hindered medical progress.</p>
      <table   style="page-break-inside: avoid; width: 100%; border-collapse: collapse; border: 2px solid #1a237e;">
        <thead>
          <tr style="background-color: #1a237e; color: white;">
            <th style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; width: 25%; font-size: 12pt;">Factor</th>
            <th style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; width: 75%; font-size: 12pt;">Specific Historical Example & Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Individuals</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">The Church & Religion</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Government & Wealth</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Science & Technology</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Attitudes in Society</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">War</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
        </tbody>
      </table>
    </div>
    `;
    }

    // QR Code Appendix removed per user request

    const genDate = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const edition = unitData.edition || '2026.1';
    html += `<div style="text-align: center; margin-top: 50px; font-size: 8pt; color: #94a3b8;  border-top: 1px solid #e2e8f0; padding-top: 10px; font-family: sans-serif;">Generated: ${genDate} | Unit: ${unitId} | Edition: ${edition}</div>`;
    html += `<script>
  document.addEventListener("DOMContentLoaded", function() {
    if (navigator.userAgent.includes("HeadlessChrome") || navigator.userAgent.includes("Puppeteer")) return;
    function replaceLines(className) {
      const lines = document.querySelectorAll('.' + className);
      if (lines.length === 0) return;
      let group = [];
      lines.forEach((line, i) => {
        group.push(line);
        const next = lines[i + 1];
        if (!next || line.nextElementSibling !== next) {
          const wrapper = document.createElement('textarea');
          wrapper.className = 'interactive-textarea';
          wrapper.style.width = '100%';
          wrapper.style.height = (group.length * line.offsetHeight) + 'px';
          wrapper.style.border = '2px dashed #94a3b8';
          wrapper.style.borderRadius = '6px';
          wrapper.style.padding = '12px';
          wrapper.style.boxSizing = 'border-box';
          wrapper.style.fontFamily = 'Outfit, sans-serif';
          wrapper.style.fontSize = '1.1rem';
          wrapper.style.resize = 'vertical';
          wrapper.style.marginTop = group[0].style.marginTop || '10px';
          wrapper.style.marginBottom = '10px';
          wrapper.style.background = '#f8fafc';
          wrapper.placeholder = 'Type your answer here...';
          group[0].parentNode.insertBefore(wrapper, group[0]);
          group.forEach(l => l.remove());
          group = [];
        }
      });
    }
    // replaceLines('task-lines');
    // replaceLines('task-lines-large');
    document.querySelectorAll('.dirt-box, .hint-box').forEach(b => b.contentEditable = true);
  });
</script></body></html>`;

    html = html.replace(/src="\/units\//g, 'src="../../units/');
    html = html.replace(/src="\/images\//g, 'src="../../images/');
    html = html.replace(/src="\/assets\//g, 'src="../../assets/');

    // Clean up any remaining Key Individual tags globally across the entire HTML string
    html = html.replace(/\[Key Individual:\s*([^\]]+)\]/gi, '<strong>$1</strong>');

    // Print-specific UX fixes for interactive elements
    html = html.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, ''); // Remove interactive buttons
    html = html.replace(/display:\s*none;?/gi, 'display: block; margin-top: 15px;'); // Stack toggle tabs
    html = html.replace(/(?:using the toggle tabs,?\s*)/gi, ''); // Remove app-only phrasing

    // Safely strip HTML/Markdown link wrappers but preserve inner display text
    html = html.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    html = html.replace(/<a[^>]*>(.*?)<\/a>/g, '$1');

    // Dynamically inject correct page numbers for ANY manual placeholder references
    // Syntax: [[PAGE_REF:Marker_Name]] e.g. [[PAGE_REF:L3_Start]]
    html = html.replace(/\[\[PAGE_REF:([a-zA-Z0-9_]+)\]\]/g, (match, marker) => {
      const markerObj = pdfMarkers.find((m) => m.marker === marker);
      return markerObj ? markerObj.page : 'XX';
    });

    const filename =
      period.name === 'full' ? 'pupil_workbook.html' : `pupil_workbook_${period.name}.html`;
    const outPath = path.join(publicUnitsDir, unitId, filename);
    try {
      fs.writeFileSync(outPath, html);
      const altUnitsPath = path.join(PATHS.ROOT, 'units', unitId, filename);
      if (fs.existsSync(path.dirname(altUnitsPath))) {
        fs.writeFileSync(altUnitsPath, html);
      }
      console.log(`Generated workbook for ${unitId}: ${filename}`);
    } catch (err) {
      console.error(`❌ Failed to write workbook for ${unitId}: ${filename}`, err.message);
    }
  });
});
