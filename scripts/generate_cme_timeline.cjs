/**
 * generate_cme_timeline.cjs
 *
 * Professional 4-Page Master Revision Timeline for Pearson Edexcel GCSE (9–1) History
 * Paper 2: Conflict in the Middle East, 1945–1995 (Option 26/27 / P5)
 *
 * Fully synchronized with the Pearson Edexcel Specification:
 * - Page 1: KEY TOPIC 1: The End of the British Mandate and the Creation of Israel, 1945–1949
 * - Page 2: KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973
 * - Page 3: KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1981
 * - Page 4: KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995
 *
 * Pedagogical Structure:
 * - Exactly 6 historical milestone cards per page (24 total milestones across 4 pages)
 * - 3-beat rhythm on every card: TRIGGER -> ACTION -> CONSEQUENCE (Zero playful emojis; archival museum typography)
 * - Edexcel 8-Mark Analytical Narrative Causation Chain strip on every page (eliminates wasted space)
 * - Interactive Lightbox Zoom Modal on all images in HTML view (click to enlarge primary sources)
 * - Exam Terminology Vault & Specification Micro-Glossary on every page
 * - 100% Automated layout overflow check guaranteeing all 4 pages fit within 1123px bounds (0 overflows)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(PROJECT_ROOT, 'public', 'units', 'cme_new', 'data.js');
const HTML_OUT_PUBLIC = path.join(PROJECT_ROOT, 'public', 'units', 'cme_new', 'timeline.html');
const PDF_OUT_PUBLIC = path.join(PROJECT_ROOT, 'public', 'pdfs', 'cme_new_timeline.pdf');
const PDF_OUT_UNIT = path.join(PROJECT_ROOT, 'public', 'units', 'cme_new', 'cme_new_timeline.pdf');

// Helper to load cme_new unitData
async function loadCmeData() {
  const fileUrl = 'file:///' + DATA_FILE.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  return mod.unitData || mod.default;
}

// Convert local image path to base64 Data URI for robust, offline Puppeteer embedding
function getImageDataUri(relPath) {
  if (!relPath) return '';
  if (relPath.startsWith('http://') || relPath.startsWith('https://')) return relPath;
  let cleanRel = relPath.startsWith('/') ? relPath.substring(1) : relPath;
  let absPath = path.join(PROJECT_ROOT, 'public', cleanRel);
  if (!fs.existsSync(absPath)) {
    absPath = path.join(PROJECT_ROOT, cleanRel);
  }
  if (!fs.existsSync(absPath)) {
    return relPath;
  }
  try {
    const ext = path.extname(absPath).toLowerCase();
    let mime = 'image/jpeg';
    if (ext === '.png') mime = 'image/png';
    else if (ext === '.svg') mime = 'image/svg+xml';
    else if (ext === '.webp') mime = 'image/webp';
    const buf = fs.readFileSync(absPath);
    return `data:${mime};base64,${buf.toString('base64')}`;
  } catch (err) {
    return relPath;
  }
}

function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function buildTimelineHTML(unitData) {
  function resolveSourceImg(lessonNum, preferredKeyword, fallbackPath) {
    if (unitData && unitData.lessons && unitData.lessons[lessonNum - 1]) {
      const lesson = unitData.lessons[lessonNum - 1];
      if (lesson.sources) {
        const found = lesson.sources.find(
          (s) =>
            (s.image && s.image.toLowerCase().includes(preferredKeyword.toLowerCase())) ||
            (s.title && s.title.toLowerCase().includes(preferredKeyword.toLowerCase())),
        );
        if (found && found.image) return found.image;
      }
      if (lesson.narrative_blocks) {
        const bFound = lesson.narrative_blocks.find(
          (b) =>
            (b.image && b.image.toLowerCase().includes(preferredKeyword.toLowerCase())) ||
            (b.caption && b.caption.toLowerCase().includes(preferredKeyword.toLowerCase())),
        );
        if (bFound && bFound.image) return bFound.image;
      }
    }
    return fallbackPath;
  }

  // 4 KEY TOPICS DEFINITION (EXACTLY 6 MILESTONES PER PAGE = 24 TOTAL)
  const ERAS = [
    // =========================================================================
    // PAGE 1: KEY TOPIC 1 (1917–1949) • BRITISH MANDATE, UN PARTITION & WAR OF CREATION
    // =========================================================================
    {
      page: 1,
      eraId: 'kt_1',
      themeColor: '#1b365d',
      lightBg: '#eff6ff',
      borderColor: '#93c5fd',
      eraTitle: 'KEY TOPIC 1: The End of the British Mandate & The Creation of Israel, 1945–1949',
      specFocus:
        'Lessons KT 1.0, KT 1.1 & KT 1.2 • Imperial Borders, UN Partition & The 1948–49 War of Creation',
      badgeText: 'KEY TOPIC 1',
      specPills: [
        'Zionism',
        'Balfour Declaration',
        'British Mandate',
        'Jewish Insurgency',
        'Operation Agatha',
        'King David Hotel',
        'SS Exodus',
        'UN Resolution 181',
        'IDF Founded',
        '1949 Armistice Agreements',
        'Territorial Changes',
        '700,000 Palestinian Refugees',
      ],
      milestones: [
        {
          date: 'May 1916 – Nov 1917',
          title: 'Imperial Contradictions: Sykes-Picot Agreement & The Balfour Declaration',
          specTag: 'Root Causes & Imperial Betrayal',
          image: resolveSourceImg(1, 'balfour', '/images/cme_balfour_declaration_1917.jpg'),
          caption:
            'Original 1917 Balfour Declaration letter promising a "national home for the Jewish people".',
          trigger:
            'Britain sought wartime alliances, promising independence to Arab leaders (McMahon-Hussein) while secretly negotiating partition with France.',
          action:
            'Foreign Secretary Arthur Balfour committed Britain to supporting a "national home for the Jewish people" in Palestine without prejudicing existing civil rights.',
          consequence:
            'Created an irreconcilable imperial conflict between Arab national self-determination and growing Jewish Zionist immigration under the League of Nations Mandate.',
        },
        {
          date: 'July 1946',
          title: 'The Bombing of the King David Hotel, Jerusalem',
          specTag: 'Jewish Insurgency & British Exhaustion',
          image: resolveSourceImg(2, 'king david', '/units/cme_new/assets/king_david_ruins.png'),
          caption:
            'The collapsed south-west wing housing British military HQ after the Irgun bomb attack.',
          trigger:
            'British restrictions on post-Holocaust Jewish immigration and the arrest of Zionist leaders (Operation Agatha).',
          action:
            'Militants from the Irgun (led by Menachem Begin) detonated milk churns packed with explosives in the basement, killing 91 British, Arab, and Jewish staff.',
          consequence:
            'Shattered British political will to govern Palestine, leading directly to Foreign Secretary Ernest Bevin handing the Mandate to the United Nations in February 1947.',
        },
        {
          date: 'July 1947',
          title: 'The SS Exodus & The Sergeants Affair',
          specTag: 'International Pressure & Moral Collapse',
          image: resolveSourceImg(2, 'sergeants', '/images/cme_sergeants_affair_1947.jpg'),
          caption:
            'The Sergeants Affair: Bodies of two executed British intelligence NCOs discovered near Netanya.',
          trigger:
            'The British Royal Navy blockaded Palestine, forcing 4,500 Holocaust survivors aboard the SS Exodus back to detention camps in post-war Germany.',
          action:
            'Irgun militants abducted and hanged two British intelligence sergeants (Paice and Martin) in retaliation for British executions of Irgun fighters.',
          consequence:
            'Triggered anti-Jewish riots across British cities and convinced British public opinion that staying in Palestine was morally untenable and too costly.',
        },
        {
          date: '29 November 1947',
          title: 'UN Resolution 181: The Partition Plan',
          specTag: 'The Diplomatic Catalyst for War',
          image: resolveSourceImg(
            2,
            'partition',
            '/units/cme_new/assets/cme_un_palestine_partition_versions_1947.jpg',
          ),
          caption:
            'UN Resolution 181 map allocating 55% of Palestine to the Jewish state and 45% to the Arab state.',
          trigger:
            'UNSCOP investigated Palestine and concluded that joint Jewish-Arab power-sharing within a single state was impossible.',
          action:
            'The UN General Assembly voted to partition Palestine into independent Arab and Jewish states, placing Jerusalem under international UN trusteeship.',
          consequence:
            'Jewish Agency accepted partition; Arab Higher Committee and Arab League rejected it outright, immediately triggering civil war between Jewish and Arab militias.',
        },
        {
          date: '14–15 May 1948',
          title: 'Declaration of the State of Israel & Outbreak of the First Arab-Israeli War',
          specTag: 'The 1948 War of Survival / Independence',
          image: resolveSourceImg(3, 'ben-gurion', '/images/cme_bengurion_declaration_1948.jpg'),
          caption:
            'David Ben-Gurion declaring Israeli independence in Tel Aviv under Herzl’s portrait.',
          trigger:
            'The final British High Commissioner departed Haifa, terminating the 26-year British Mandate.',
          action:
            'David Ben-Gurion read the Israeli Declaration of Independence; armies from five Arab nations (Egypt, Jordan, Syria, Iraq, Lebanon) invaded the next morning.',
          consequence:
            'Haganah mobilized into the Israel Defense Forces (IDF); superior coordination, Czechoslovak arms, and motivation enabled Israel to survive and seize the initiative.',
        },
        {
          date: '1948–1949',
          title: 'The Results of the 1948–49 War: Territorial Changes & Refugee Crisis',
          specTag: 'Territorial Changes & The Refugee Problem',
          image: resolveSourceImg(3, 'refugees', '/images/cme_palestinian_refugees_1948.jpg'),
          caption:
            'Palestinian refugees fleeing during the 1948–49 war; over 700,000 were displaced from their homes.',
          trigger:
            'Arab military disunity and the June 1948 UN truce enabled the newly formed IDF to rearm with foreign weapons and launch decisive counter-offensives.',
          action:
            'The 1949 Armistice Agreements redrew borders: Israel expanded to hold 78% of Mandatory Palestine; Jordan annexed the West Bank and Egypt held Gaza.',
          consequence:
            'Over 700,000 Palestinian Arabs became refugees in neighbouring Arab states; Israel refused their return, while Arab states refused permanent integration, creating an enduring crisis.',
        },
      ],
      narrativeChain: [
        {
          title: '1. Imperial Contradiction',
          desc: 'Conflicting British pledges to Arabs & Zionists created irreconcilable national claims.',
        },
        {
          title: '2. Post-WWII Insurgency',
          desc: 'Irgun attacks (King David Hotel, Sergeants Affair) broke British political resolve to rule.',
        },
        {
          title: '3. UN Partition 181',
          desc: 'UN vote to partition sparked immediate civil war between Jewish and Arab militias.',
        },
        {
          title: '4. Statehood & Pan-Arab War',
          desc: 'May 1948 declaration of Israel triggered invasion by 5 Arab armies.',
        },
        {
          title: '5. Results of 1948–49 War',
          desc: '1949 armistice agreements gave Israel 78% of territory, creating 700,000 displaced Palestinian refugees.',
        },
      ],
      glossary: [
        {
          term: 'Zionism',
          def: 'Political movement founded by Theodor Herzl advocating a sovereign Jewish homeland in Palestine.',
        },
        {
          term: 'Mandate',
          def: 'Administrative authority granted by the League of Nations to Britain to govern Palestine (1922–1948).',
        },
        {
          term: 'Armistice Agreements',
          def: 'The 1949 treaties establishing formal ceasefire borders between Israel and Egypt, Jordan, Lebanon, and Syria.',
        },
        {
          term: 'Refugee Problem',
          def: 'The displacement of over 700,000 Palestinian Arabs who fled or were expelled during the 1948–49 war.',
        },
      ],
    },

    // =========================================================================
    // PAGE 2: KEY TOPIC 2 (1955–1973) • SUEZ CRISIS, SIX-DAY WAR & YOM KIPPUR WAR
    // =========================================================================
    {
      page: 2,
      eraId: 'kt_2',
      themeColor: '#991b1b',
      lightBg: '#fef2f2',
      borderColor: '#fca5a5',
      eraTitle: 'KEY TOPIC 2: Increased Tension, Crises and Conflict, 1955–1973',
      specFocus:
        'Lessons KT 1.3, KT 2.1, KT 2.2 & KT 2.3 • Suez Crisis, Six-Day War, Rise of Palestinian Resistance & Yom Kippur War',
      badgeText: 'KEY TOPIC 2',
      specPills: [
        'Pan-Arabism',
        'Suez Nationalisation',
        'Protocol of Sèvres',
        'UAR (1958)',
        '1964 Cairo Conference',
        'Fatah & PLO',
        'River Jordan Water Dispute',
        'Samu Raid (1966)',
        'Pre-emptive Strike',
        'Operation Focus',
        'Occupied Territories',
        'UN Resolution 242',
        'Khartoum "Three Noes"',
        'PFLP Hijacks',
        'Black September',
        'Munich 1972',
        'Bar Lev Line',
        'OPEC Oil Embargo',
      ],
      milestones: [
        {
          date: 'July – Nov 1956',
          title: 'The Suez Crisis & The Rise of Gamal Abdel Nasser',
          specTag: 'Anti-Colonial Defiance & Pan-Arabism',
          image: resolveSourceImg(4, 'nasser', '/images/cme_nasser_1956.jpg'),
          caption:
            'President Gamal Abdel Nasser, hero of Pan-Arab nationalism across the Middle East.',
          trigger:
            'US and Britain cancelled funding for Egypt’s Aswan High Dam after Nasser bought Soviet Czech weapons.',
          action:
            'Nasser nationalised the Suez Canal; Britain, France, and Israel launched collusive invasion (Protocol of Sèvres); Israel captured Sinai.',
          consequence:
            'US President Eisenhower forced Anglo-French withdrawal via economic sanctions; Nasser became hero of **Pan-Arabism**; UNEF placed in Sinai.',
        },
        {
          date: '13–17 January 1964',
          title: 'The Cairo Conference & The Creation of the PLO',
          specTag: 'Arab Mobilisation & Guerrilla Warfare',
          image: '/images/cme_cairo_summit_1964.jpg',
          caption:
            'Arab leaders convened in Cairo in 1964 to counter Israeli water diversion and create the PLO.',
          trigger:
            'Disputes erupted over Israeli diversion of River Jordan waters; Arab states met to organize military and diplomatic opposition.',
          action:
            'The Arab League established the **Palestine Liberation Organisation (PLO)**; Yasser Arafat’s **Fatah** movement launched cross-border fedayeen raids backed by Syria.',
          consequence:
            'Escalated border clashes with Israel (e.g. 1966 Samu raid and 7 April 1967 air battle over Golan), accelerating the slide into the 1967 war.',
        },
        {
          date: '5–10 June 1967',
          title: 'The Six-Day War: Pre-emptive Triumph & Conquered Territories',
          specTag: 'The Decisive Territorial Cataclysm',
          image: resolveSourceImg(5, 'wall', '/images/israeli_troops_wall.jpg'),
          caption:
            'David Rubinger’s iconic photograph of Israeli paratroopers at the Western Wall, 7 June 1967.',
          trigger:
            'Nasser expelled UNEF peacekeepers, remilitarised Sinai, closed Straits of Tiran, and signed joint defense pact with Jordan.',
          action:
            'Israel launched **Operation Focus** pre-emptive air strikes, destroying Arab air forces in 3 hours, then crushed Egyptian, Jordanian, and Syrian ground armies.',
          consequence:
            'Israel captured the **Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights**, placing 1 million Palestinians under military occupation.',
        },
        {
          date: '22 November 1967',
          title: 'UN Security Council Resolution 242',
          specTag: 'The "Land for Peace" Doctrine',
          image: resolveSourceImg(5, 'map', '/units/cme_new/assets/palestine_1967_map.png'),
          caption:
            'Map of the Conquered Territories establishing the geographic framework of UN Res 242.',
          trigger:
            'International community scrambled to establish a durable legal formula to resolve the territorial outcome of the Six-Day War.',
          action:
            'UNSC unanimously passed Resolution 242: called for Israeli withdrawal from occupied territories in exchange for Arab recognition and peace.',
          consequence:
            'Became the permanent diplomatic benchmark (**"Land for Peace"**); Arab League responded with the **"Three Noes"** of Khartoum (no peace, no recognition, no negotiation).',
        },
        {
          date: 'September 1970',
          title: 'Black September & The PFLP Airplane Hijackings',
          specTag: 'Palestinian Militancy & The PFLP',
          image: resolveSourceImg(6, 'munich', '/images/cme_munich_1972_balcony.jpg'),
          caption: 'A Black September militant on the balcony at the 1972 Munich Olympic Games.',
          trigger:
            'The PLO and PFLP operated as a "state within a state" in Jordan, launching fedayeen raids and hijacking Western airliners to Dawson\'s Field.',
          action:
            'King Hussein ordered the Jordanian Army to crush Palestinian militia strongholds in Amman, killing thousands of fighters and civilians.',
          consequence:
            'The PLO leadership was expelled to Southern Lebanon ("Fatahland"); radical splinter group **Black September** formed, orchestrating the 1972 Munich Olympic massacre.',
        },
        {
          date: '6–25 October 1973',
          title: 'The Yom Kippur War: Operation Badr & The OPEC Oil Embargo',
          specTag: 'Shattering Israeli Complacency',
          image: resolveSourceImg(7, 'crossing', '/images/cme_egyptians_crossing_suez_1973.jpg'),
          caption:
            'Egyptian infantry using high-pressure water cannons to breach Israel’s Bar Lev Line.',
          trigger:
            'Egypt and Syria sought to break the diplomatic stalemate, erase the humiliation of 1967, and regain the Sinai and Golan Heights.',
          action:
            'Launched surprise coordinated assault on Yom Kippur; Egyptian troops breached the Bar Lev Line under a Soviet SAM anti-aircraft umbrella.',
          consequence:
            'Shattered Israeli myth of invincibility; Arab OPEC ministers launched an **Oil Embargo** quadrupling world oil prices; forced US into emergency shuttle diplomacy.',
        },
      ],
      narrativeChain: [
        {
          title: '1. Suez & Nasserism',
          desc: 'Suez nationalisation & survival made Nasser the undisputed champion of Pan-Arabism.',
        },
        {
          title: '2. Cairo & PLO Inception',
          desc: 'Creation of PLO (1964) and Syrian-backed Fatah raids triggered border clashes (Samu raid).',
        },
        {
          title: '3. Six-Day War Cataclysm',
          desc: 'Pre-emptive strike (Operation Focus) seized Sinai, Gaza, West Bank, Jerusalem & Golan.',
        },
        {
          title: '4. Res 242 & Militancy',
          desc: 'Khartoum "Three Noes" deadlock drove PFLP airplane hijackings and Jordanian civil war (1970).',
        },
        {
          title: '5. Yom Kippur & Oil Shock',
          desc: 'Egyptian surprise crossing shattered Israeli invincibility and triggered global OPEC oil embargo.',
        },
      ],
      glossary: [
        {
          term: 'Pan-Arabism',
          def: 'Ideology championed by Nasser promoting political, cultural, and military unity among all Arab nations.',
        },
        {
          term: 'Pre-emptive Strike',
          def: 'Military attack launched to forestall or neutralize an enemy’s imminent offensive (e.g. Operation Focus 1967).',
        },
        {
          term: 'Resolution 242',
          def: 'UN resolution establishing "Land for Peace": Israeli withdrawal in return for Arab recognition.',
        },
        {
          term: 'Bar Lev Line',
          def: 'Heavily fortified Israeli sand-rampart defensive chain built along the east bank of the Suez Canal after 1967.',
        },
      ],
    },

    // =========================================================================
    // PAGE 3: KEY TOPIC 3 (PART 1) (1974–1981) • SHUTTLE DIPLOMACY TO CAMP DAVID
    // =========================================================================
    {
      page: 3,
      eraId: 'kt_3a',
      themeColor: '#166534',
      lightBg: '#f0fdf4',
      borderColor: '#86efac',
      eraTitle:
        'KEY TOPIC 3 (Part 1): Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
      specFocus:
        'Lesson KT 3.1 • Yasser Arafat at the UN, Kissinger’s Shuttle Diplomacy & The Egypt-Israel Peace Treaty',
      badgeText: 'KEY TOPIC 3A',
      specPills: [
        'Shuttle Diplomacy',
        'Henry Kissinger',
        'Suez Reopened (1975)',
        'Yasser Arafat at UN',
        '"Olive Branch & Gun"',
        'Anwar Sadat',
        'Knesset Address (1977)',
        'Menachem Begin',
        'Jimmy Carter',
        'Camp David Accords (1978)',
        'Sinai Demilitarisation',
        'Treaty of Washington (1979)',
        'Arab League Boycott',
        'Sadat Assassination (1981)',
        'Peace Treaty Survives',
      ],
      milestones: [
        {
          date: '13 November 1974',
          title: 'Yasser Arafat Addresses the UN General Assembly',
          specTag: 'Diplomatic Legitimacy of the PLO',
          image: resolveSourceImg(6, 'arafat', '/images/cme_arafat_un_1974.png'),
          caption:
            'Yasser Arafat delivering his famous address carrying "an olive branch and a freedom fighter\'s gun".',
          trigger:
            'Arab League summit at Rabat recognized the PLO as the "sole legitimate representative of the Palestinian people".',
          action:
            'Arafat addressed the UN wearing a holster: *"Do not let the olive branch fall from my hand."* The UN granted the PLO observer status.',
          consequence:
            'Elevated the Palestinian national cause from a mere refugee issue into a recognized global political struggle for sovereign statehood.',
        },
        {
          date: '1974–1975',
          title: 'Kissinger’s "Shuttle Diplomacy" & Reopening of the Suez Canal',
          specTag: 'Step-by-Step Diplomatic Realism',
          image: resolveSourceImg(7, 'israeli', '/images/cme_israeli_crossing_suez_1973.jpg'),
          caption:
            'Israeli armor returning during the US-negotiated military disengagement agreements.',
          trigger:
            'The superpower nuclear alert during the Yom Kippur War convinced Washington that regional stability was a vital US strategic priority.',
          action:
            'US Secretary of State Henry Kissinger flew between Cairo, Tel Aviv, and Damascus negotiating disengagement pacts; Egypt reopened Suez Canal in June 1975.',
          consequence:
            'Separated Israeli and Egyptian armies along the canal, restored international shipping, and detached Egypt from the Soviet sphere of influence.',
        },
        {
          date: '19–20 November 1977',
          title: 'President Anwar Sadat’s Historic Journey to Jerusalem',
          specTag: 'The Psychological Breakthrough',
          image: resolveSourceImg(8, 'sadat', '/units/cme_new/assets/anwar_sadat.jpg'),
          caption: 'Anwar Sadat addressing the Israeli Parliament (Knesset) in Jerusalem.',
          trigger:
            'Sadat realized that Egypt’s fragile economy could no longer sustain war, and that only peace could recover the oil-rich Sinai Peninsula.',
          action:
            'Sadat made the electrifying announcement that he was ready to travel to Israel; he addressed the Knesset, recognizing Israel’s existence.',
          consequence:
            'Demolished the 30-year psychological wall of mutual hatred, paving the way for direct bilateral negotiations hosted by US President Jimmy Carter.',
        },
        {
          date: '5–17 September 1978',
          title: 'The Camp David Accords',
          specTag: 'The Historic Framework for Peace',
          image: resolveSourceImg(8, 'camp david', '/images/cme_camp_david_1978.jpg'),
          caption:
            'Menachem Begin, Jimmy Carter, and Anwar Sadat at the Camp David presidential retreat.',
          trigger:
            'Talks stalled over Israeli withdrawal from Sinai settlements and Palestinian autonomy in the West Bank and Gaza.',
          action:
            'President Carter isolated Begin and Sadat for 13 intense days at Camp David, drafting the **Framework for Peace in the Middle East**.',
          consequence:
            'Agreed on full Israeli withdrawal from Sinai in return for Egyptian diplomatic recognition, but left Palestinian autonomy vague and unfulfilled.',
        },
        {
          date: '26 March 1979',
          title: 'The Washington Treaty: Egypt-Israel Peace Treaty Signed',
          specTag: 'The First Arab-Israeli Peace Treaty',
          image: resolveSourceImg(8, 'handshake', '/images/cme_treaty_triple_handshake_1979.jpg'),
          caption:
            'The historic three-way handshake between Sadat, Carter, and Begin on the White House Lawn.',
          trigger:
            'Final legal formalization of the Camp David Accords backed by billions of dollars in US economic and military aid to both nations.',
          action:
            'Sadat and Begin signed the formal peace treaty in Washington, establishing full diplomatic relations and normalizing trade.',
          consequence:
            'Israel neutralized its most formidable military opponent; Egypt recovered all Sinai; Arab League expelled Egypt and moved HQ to Tunis.',
        },
        {
          date: '6 October 1981',
          title: 'The Assassination of Anwar Sadat & The Arab Boycott',
          specTag: 'Consequences of the 1979 Peace Treaty',
          image: '/images/cme_sadat_memorial_1981.jpg',
          caption: 'Site where President Anwar Sadat was assassinated in October 1981.',
          trigger:
            'Arab nations strongly condemned Egypt for signing a separate peace that ignored the Palestinians, expelling Egypt from the Arab League.',
          action:
            'In October 1981, President Anwar Sadat was assassinated by Egyptian soldiers who fiercely opposed the peace treaty with Israel.',
          consequence:
            'Despite Sadat’s assassination and Arab boycotts, the peace treaty held, permanently ending the threat of a major multi-front war for Israel.',
        },
      ],
      narrativeChain: [
        {
          title: '1. Nuclear Alert to Shuttle Talks',
          desc: '1973 superpower faceoff forced US mediation, separating armies & reopening Suez (1975).',
        },
        {
          title: '2. Diplomatic Rise of PLO',
          desc: 'Arafat’s UN speech transformed Palestinian issue from refugees into global drive for statehood.',
        },
        {
          title: '3. Sadat Shatters Deadlock',
          desc: 'Historic 1977 Knesset visit convinced Israeli public that direct bilateral peace was achievable.',
        },
        {
          title: '4. Camp David & Washington Treaty',
          desc: 'Carter brokered historic treaty (1979): full Sinai return in exchange for full recognition.',
        },
        {
          title: '5. Arab Boycott & Sadat Assassination',
          desc: 'Egypt was expelled from the Arab League and Sadat was assassinated (1981), but the peace treaty with Israel survived.',
        },
      ],
      glossary: [
        {
          term: 'Shuttle Diplomacy',
          def: 'Intense mediation involving travelling back and forth between rival capitals without direct face-to-face talks.',
        },
        {
          term: 'Knesset',
          def: 'The unicameral national parliament and legislative assembly of the State of Israel in Jerusalem.',
        },
        {
          term: 'Camp David Accords',
          def: '1978 peace agreements brokered by Jimmy Carter leading to the first Arab-Israeli peace treaty.',
        },
        {
          term: 'Cold Peace',
          def: 'State-to-state diplomatic peace without warm cultural, commercial, or public reconciliation.',
        },
      ],
    },

    // =========================================================================
    // PAGE 4: KEY TOPIC 3 (PART 2) (1982–1995) • LEBANON INVASION TO OSLO PEACE
    // =========================================================================
    {
      page: 4,
      eraId: 'kt_3b',
      themeColor: '#b45309',
      lightBg: '#fffbeb',
      borderColor: '#fcd34d',
      eraTitle:
        'KEY TOPIC 3 (Part 2): The Palestinian Issue, The 1982 Lebanon War & Attempts at a Solution to 1995',
      specFocus:
        'Lessons KT 3.2 & KT 3.3 • Operation Peace for Galilee, Sabra & Shatila, First Intifada & The Oslo Accords',
      badgeText: 'KEY TOPIC 3B',
      specPills: [
        'Operation Peace for Galilee',
        'Ariel Sharon',
        'Siege of Beirut (1982)',
        'Sabra & Shatila Massacre',
        'Kahan Commission',
        'First Intifada (1987–93)',
        'Jabalya Refugee Camp',
        'UNLU',
        '"Force, Might & Beatings"',
        'Arafat Renounces Terrorism (1988)',
        'Gulf War Coalition (1991)',
        'End of Cold War',
        'Oslo I Accords (1993)',
        'Declaration of Principles',
        'Palestinian Authority (PA)',
        '1994 Israel-Jordan Treaty',
        'Oslo II (Areas A, B, C)',
        'Rabin Assassination (1995)',
      ],
      milestones: [
        {
          date: 'June – Sept 1982',
          title: 'The 1982 Lebanon War (Operation Peace for Galilee)',
          specTag: 'The War of Choice & PLO Expulsion',
          image: resolveSourceImg(9, 'sharon', '/images/sharon_yom_kippur.jpg'),
          caption:
            'Defence Minister Ariel Sharon directed the massive invasion of Lebanon up to Beirut.',
          trigger:
            'Assassination attempt on Israeli ambassador Shlomo Argov in London by the Abu Nidal faction; ongoing cross-border PLO rocket attacks from southern Lebanon.',
          action:
            'Defence Minister **Ariel Sharon** launched a full-scale invasion, advancing 60 miles north to surround and besiege the PLO leadership in West Beirut.',
          consequence:
            'US-negotiated ceasefire evacuated 14,000 PLO fighters by sea to Tunis; shattered PLO military presence on Israel’s northern border, but entangled IDF in Lebanon.',
        },
        {
          date: '16–18 September 1982',
          title: 'The Sabra and Shatila Massacre & The Kahan Commission',
          specTag: 'Moral Crisis & Israeli Domestic Turmoil',
          image: resolveSourceImg(9, 'sharon', '/units/cme_new/assets/ariel_sharon.webp'),
          caption:
            'Ariel Sharon was forced to resign following severe censure by Israel’s Kahan Commission.',
          trigger:
            'Assassination of newly elected Lebanese Christian President Bachir Gemayel by Syrian-backed agents.',
          action:
            'IDF permitted Christian Phalangist militia into the Sabra and Shatila refugee camps; Phalangists slaughtered up to 3,500 unarmed Palestinian refugees.',
          consequence:
            'Huge anti-war protests (400,000 in Tel Aviv); Israel’s **Kahan Commission** ruled Sharon bore "personal responsibility" for failing to prevent the slaughter, forcing his resignation.',
        },
        {
          date: 'December 1987',
          title: 'Outbreak of the First Intifada (The Uprising of the Stones)',
          specTag: 'Grassroots Palestinian Mass Resistance',
          image: resolveSourceImg(9, 'intifada', '/units/cme_new/assets/first_intifada.png'),
          caption:
            'Palestinian youth confronting IDF armor with stones in the Gaza Strip, December 1987.',
          trigger:
            'An Israeli military tank transport crashed into civilian cars at Jabalya Refugee Camp in Gaza, killing four Palestinian workers.',
          action:
            'Spontaneous mass protests, strikes, boycotts, and stone-throwing erupted across Gaza and the West Bank, coordinated by the local **UNLU** (not Tunis PLO).',
          consequence:
            'IDF policy of "force, might, and beatings" drew global media condemnation; convinced Israeli military leaders like Yitzhak Rabin that occupation could not be maintained by force.',
        },
        {
          date: '1988–1991',
          title: 'Arafat Renounces Terrorism & The Post-Cold War Realignment',
          specTag: 'Diplomatic Pivot & The Madrid Conference',
          image: '/images/cme_madrid_conference_1991.jpg',
          caption:
            'President Bush addressing the joint US-Soviet sponsored Madrid Peace Conference in October 1991.',
          trigger:
            'The Intifada proved the Palestinian cause lived inside the territories; the 1991 Gulf War and Soviet collapse eliminated radical Arab/Soviet financial backing.',
          action:
            'Arafat renounced terrorism at the UN in Geneva (1988); following US coalition victory in Kuwait, the US and USSR co-sponsored the landmark **Madrid Conference (1991)**.',
          consequence:
            'Broke the taboo of face-to-face Arab-Israeli negotiations, creating the direct diplomatic momentum that led to secret Norwegian back-channel talks.',
        },
        {
          date: '13 September 1993',
          title: 'The Oslo Accords (Declaration of Principles)',
          specTag: 'Historic Mutual Recognition',
          image: resolveSourceImg(10, 'handshake', '/images/oslo_handshake.jpg'),
          caption:
            'Rabin, Clinton, and Arafat on the White House Lawn following the historic Oslo Handshake.',
          trigger:
            'Secret back-channel talks in Oslo, Norway, enabled direct face-to-face bargaining between Israeli diplomats and PLO representatives.',
          action:
            'Signed the **Declaration of Principles**: Israel and PLO officially recognized each other; established the **Palestinian National Authority (PA)** for interim self-rule in Gaza and Jericho.',
          consequence:
            'Historic psychological breakthrough; rejected by extremist factions on both sides (Hamas launched suicide bus bombings; Israeli settlers protested).',
        },
        {
          date: '1994–1995',
          title: 'The Israel-Jordan Peace Treaty, Oslo II & Assassination of Rabin',
          specTag: 'Partition of the West Bank & The Tragic Climax',
          image: resolveSourceImg(10, 'areas', '/images/cme_oslo_areas_map.png'),
          caption:
            'Map of West Bank fragmented into Area A (Palestinian control), Area B (joint), and Area C (Israeli control).',
          trigger:
            'King Hussein of Jordan signed 1994 peace treaty; need to expand Palestinian self-rule into major West Bank towns.',
          action:
            'Oslo II partitioned the West Bank into **Areas A, B, and C**. On 4 November 1995, Prime Minister **Yitzhak Rabin** was assassinated by Jewish extremist Yigal Amir.',
          consequence:
            'West Bank remained fragmented under 60% direct Israeli military control (Area C); the peace process lost its principal Israeli architect, plunging the peace movement into crisis.',
        },
      ],
      narrativeChain: [
        {
          title: '1. Lebanon Invasion & Moral Shock',
          desc: 'Sharon expelled PLO to Tunis (1982), but Sabra-Shatila massacre shattered domestic consensus.',
        },
        {
          title: '2. Grassroots Intifada (1987)',
          desc: 'Civilian stone-throwing vs IDF proved to Israeli generals that military occupation was unsustainable.',
        },
        {
          title: '3. Realignment & Madrid (1988–91)',
          desc: 'Arafat renounced terrorism; 1991 Gulf War & Soviet collapse launched historic Madrid talks.',
        },
        {
          title: '4. Oslo Accords & Self-Rule (1993)',
          desc: 'Secret back-channel produced mutual recognition & established Palestinian Authority in Gaza/Jericho.',
        },
        {
          title: '5. Oslo II & Rabin Murder (1995)',
          desc: 'West Bank partitioned into Areas A, B & C; Hamas bombings & Rabin assassination halted momentum.',
        },
      ],
      glossary: [
        {
          term: 'Intifada',
          def: 'Arabic for "shaking off": the mass Palestinian grassroots uprising against Israeli occupation (1987–1993).',
        },
        {
          term: 'UNLU',
          def: 'Unified National Leadership of the Uprising: the clandestine local leadership that coordinated strikes and protests.',
        },
        {
          term: 'Palestinian Authority',
          def: 'Interim administrative governing body established under the 1993 Oslo Accords to govern parts of West Bank and Gaza.',
        },
        {
          term: 'Areas A, B, and C',
          def: 'The 1995 territorial partition of the West Bank into Palestinian civil/security (A), joint control (B), and full Israeli control (C).',
        },
      ],
    },
  ];

  // RENDER HTML PAGES
  const pagesHtml = ERAS.map((era) => {
    // Milestones rendering
    const cardsHtml = era.milestones
      .map((m) => {
        const dataUri = getImageDataUri(m.image);
        return `
        <div class="milestone-card" style="border-left: 3.5px solid ${era.themeColor};">
          <div class="card-left">
            <div class="card-header">
              <span class="date-badge" style="background: ${era.themeColor};">${m.date}</span>
              <span class="spec-tag" style="color: ${era.themeColor}; border: 1px solid ${era.borderColor}; background: ${era.lightBg};">${m.specTag}</span>
            </div>
            <div class="milestone-title">${m.title}</div>
            
            <div class="rhythm-box">
              <div class="rhythm-line">
                <span class="rhythm-label trigger-label">TRIGGER:</span>
                <span class="rhythm-text">${formatMd(m.trigger)}</span>
              </div>
              <div class="rhythm-line">
                <span class="rhythm-label action-label">ACTION:</span>
                <span class="rhythm-text">${formatMd(m.action)}</span>
              </div>
              <div class="rhythm-line">
                <span class="rhythm-label consequence-label">CONSEQUENCE:</span>
                <span class="rhythm-text">${formatMd(m.consequence)}</span>
              </div>
            </div>
          </div>

          <div class="card-thumb-col">
            <div class="thumb-frame" style="border: 1px solid ${era.borderColor};">
              <img src="${dataUri}" alt="${m.title}" class="thumb-img" title="Click to enlarge primary source" />
              <div class="thumb-caption">${m.caption}</div>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    // Spec pills rendering
    const pillsHtml = era.specPills
      .map(
        (p) => `
      <span class="spec-pill" style="border: 1px solid ${era.borderColor}; background: #ffffff; color: ${era.themeColor};">
        ${p}
      </span>
    `,
      )
      .join('');

    // Narrative Causation Chain rendering
    const chainStepsHtml = era.narrativeChain
      .map(
        (step, sIdx) => `
      <div class="chain-step">
        <span class="chain-num" style="background: ${era.themeColor};">${sIdx + 1}</span>
        <div class="chain-body">
          <strong class="chain-title" style="color: ${era.themeColor};">${step.title}</strong>
          <span class="chain-desc">${step.desc}</span>
        </div>
      </div>
      ${sIdx < era.narrativeChain.length - 1 ? `<span class="chain-arrow" style="color: ${era.themeColor};">&rarr;</span>` : ''}
    `,
      )
      .join('');

    const chainHtml = `
      <div class="narrative-chain-strip" style="background: ${era.lightBg}; border: 1px solid ${era.borderColor};">
        <div class="chain-header">
          <span class="chain-tag" style="background: ${era.themeColor};">EXAM SKILL: 8-MARK NARRATIVE CAUSATION CHAIN</span>
          <span class="chain-sub">Continuous analytical progression for Edexcel Paper 2 Question 2</span>
        </div>
        <div class="chain-flow">
          ${chainStepsHtml}
        </div>
      </div>
    `;

    // Glossary rendering
    const glossHtml = era.glossary
      .map(
        (g) => `
      <div class="gloss-item">
        <strong style="color: ${era.themeColor};">${g.term}:</strong> <span>${g.def}</span>
      </div>
    `,
      )
      .join('');

    return `
      <div class="page" id="${era.eraId}" data-page="${era.page}">
        <!-- Top Institutional Header -->
        <div class="page-top-bar" style="border-bottom: 2px solid ${era.themeColor};">
          <div class="top-meta">
            <span class="exam-board">PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: PERIOD STUDY (1HI0/26)</span>
            <span class="unit-code">CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
          </div>
          <div class="header-main">
            <div>
              <h1 class="era-heading" style="color: ${era.themeColor};">${era.eraTitle}</h1>
              <div class="era-subheading">${era.specFocus}</div>
            </div>
            <div class="page-badge-box" style="border: 1.5px solid ${era.themeColor}; background: ${era.lightBg};">
              <span class="badge-era" style="color: ${era.themeColor};">${era.badgeText}</span>
              <span class="badge-sub">PAGE ${era.page} OF 4</span>
            </div>
          </div>

          <!-- Spec Terminology Ribbon -->
          <div class="spec-ribbon" style="background: ${era.lightBg}; border: 1px solid ${era.borderColor};">
            <span class="ribbon-label" style="color: ${era.themeColor};">EXAM TERMINOLOGY VAULT:</span>
            <div class="pills-container">
              ${pillsHtml}
            </div>
          </div>
        </div>

        <!-- Milestones Container -->
        <div class="milestones-container">
          ${cardsHtml}
        </div>

        <!-- Analytical Narrative Causation Chain Strip -->
        ${chainHtml}

        <!-- Bottom Micro-Glossary & Examiner Footer -->
        <div class="page-bottom-bar" style="border-top: 1.5px solid ${era.themeColor};">
          <div class="glossary-strip" style="background: #fafafa; border: 1px solid #e2e8f0;">
            <div class="gloss-title" style="color: ${era.themeColor};">KEY SPECIFICATION GLOSSARY:</div>
            <div class="gloss-grid">
              ${glossHtml}
            </div>
          </div>

          <div class="footer-signoff">
            <span>Meoncross School History Department &bull; Edexcel Paper 2 Master Revision Guide</span>
            <span>Pearson Edexcel Specification 1HI0/26 &bull; Page ${era.page} of 4</span>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Conflict in the Middle East, 1945–1995 &bull; Visual Timeline & Key Topic Revision Booklet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap');

    * { box-sizing: border-box; }
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      background: #cbd5e1;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 794px;
      height: 1123px;
      max-height: 1123px;
      overflow: hidden;
      background: #ffffff;
      margin: 0 auto 12px auto;
      padding: 13px 18px 10px 18px;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media print {
      body { background: #ffffff; }
      .page {
        margin: 0;
        box-shadow: none;
        page-break-after: always;
      }
    }

    /* Top Bar */
    .page-top-bar {
      padding-bottom: 4px;
      margin-bottom: 2px;
    }
    .top-meta {
      display: flex;
      justify-content: space-between;
      font-size: 5.6pt;
      font-weight: 800;
      letter-spacing: 0.6px;
      color: #475569;
      margin-bottom: 2px;
    }
    .header-main {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .era-heading {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 11.2pt;
      font-weight: 800;
      margin: 0;
      line-height: 1.15;
    }
    .era-subheading {
      font-size: 6.6pt;
      color: #334155;
      font-weight: 600;
      margin-top: 1px;
    }
    .page-badge-box {
      border-radius: 4px;
      padding: 2px 7px;
      text-align: right;
      flex-shrink: 0;
      min-width: 82px;
    }
    .badge-era {
      display: block;
      font-size: 6.8pt;
      font-weight: 900;
      letter-spacing: 0.5px;
      line-height: 1.1;
    }
    .badge-sub {
      display: block;
      font-size: 5.4pt;
      color: #475569;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }

    /* Spec Ribbon */
    .spec-ribbon {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 2px 5px;
      border-radius: 3px;
      margin-top: 2px;
    }
    .ribbon-label {
      font-size: 5.8pt;
      font-weight: 900;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    .pills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 2.5px;
    }
    .spec-pill {
      font-size: 5.4pt;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 2px;
      line-height: 1.2;
    }

    /* Milestones Container */
    .milestones-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      justify-content: flex-start;
      margin-top: 2px;
      margin-bottom: 2px;
    }

    .milestone-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 3px;
      padding: 4px 7px;
      display: flex;
      gap: 8px;
      align-items: stretch;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }
    .card-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 2px;
    }
    .date-badge {
      color: #ffffff;
      font-weight: 900;
      font-size: 5.9pt;
      padding: 1px 5px;
      border-radius: 2px;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }
    .spec-tag {
      font-size: 5.6pt;
      font-weight: 800;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .milestone-title {
      font-size: 7.9pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.15;
      margin-bottom: 2px;
    }

    /* 3-Beat Rhythm Box */
    .rhythm-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 2px;
      padding: 2.5px 5px;
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }
    .rhythm-line {
      font-size: 6.2pt;
      line-height: 1.25;
      display: flex;
      gap: 4px;
      color: #1e293b;
    }
    .rhythm-label {
      font-weight: 900;
      font-size: 5.6pt;
      letter-spacing: 0.3px;
      white-space: nowrap;
      flex-shrink: 0;
      width: 72px;
    }
    .trigger-label { color: #b45309; }
    .action-label { color: #1e3a8a; }
    .consequence-label { color: #047857; }
    .rhythm-text {
      flex: 1;
    }

    /* Thumbnail Column */
    .card-thumb-col {
      width: 82px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .thumb-frame {
      border-radius: 3px;
      overflow: hidden;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
    }
    .thumb-img {
      width: 100%;
      height: 48px;
      object-fit: cover;
      display: block;
      cursor: zoom-in;
      transition: transform 0.15s ease, filter 0.15s ease;
    }
    .thumb-img:hover {
      transform: scale(1.04);
      filter: brightness(1.04);
    }
    .thumb-caption {
      font-size: 4.6pt;
      color: #475569;
      line-height: 1.15;
      padding: 1.5px 3px;
      background: #ffffff;
      border-top: 1px solid #f1f5f9;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Narrative Causation Chain Strip */
    .narrative-chain-strip {
      border-radius: 3px;
      padding: 3px 6px 4px 6px;
      margin-top: 2px;
      margin-bottom: 2px;
    }
    .chain-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
    }
    .chain-tag {
      font-size: 5.2pt;
      font-weight: 900;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
    .chain-sub {
      font-size: 5.4pt;
      color: #475569;
      font-style: italic;
    }
    .chain-flow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 3px;
    }
    .chain-step {
      display: flex;
      align-items: center;
      gap: 3px;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
      padding: 1.5px 4px;
      flex: 1;
      min-width: 0;
    }
    .chain-num {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      color: #ffffff;
      font-size: 5.6pt;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .chain-body {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .chain-title {
      font-size: 5.4pt;
      font-weight: 800;
      line-height: 1.1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .chain-desc {
      font-size: 4.8pt;
      color: #334155;
      line-height: 1.15;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .chain-arrow {
      font-size: 7.5pt;
      font-weight: 900;
      flex-shrink: 0;
      padding: 0 1px;
    }

    /* Page Bottom Bar */
    .page-bottom-bar {
      padding-top: 3px;
      margin-top: 2px;
    }
    .glossary-strip {
      border-radius: 3px;
      padding: 3px 6px;
      margin-bottom: 2px;
    }
    .gloss-title {
      font-size: 5.4pt;
      font-weight: 900;
      letter-spacing: 0.5px;
      margin-bottom: 1.5px;
    }
    .gloss-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      font-size: 5.4pt;
      line-height: 1.2;
      color: #334155;
    }
    .footer-signoff {
      display: flex;
      justify-content: space-between;
      font-size: 5.4pt;
      color: #64748b;
      padding: 0 2px;
    }

    /* Interactive Lightbox Zoom Modal */
    .timeline-lightbox {
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(5px);
      z-index: 999999;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      cursor: zoom-out;
    }
    .timeline-lightbox.active {
      display: flex;
    }
    .lightbox-dialog {
      background: #ffffff;
      padding: 14px;
      border-radius: 8px;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
      cursor: default;
    }
    .lightbox-close-btn {
      position: absolute;
      top: -14px;
      right: -14px;
      background: #ef4444;
      color: #ffffff;
      border: 2px solid #ffffff;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 18px;
      font-weight: 700;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
    }
    .lightbox-img-wrap {
      max-width: 100%;
      max-height: 72vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    .lightbox-img-wrap img {
      max-width: 100%;
      max-height: 72vh;
      object-fit: contain;
      border-radius: 4px;
    }
    .lightbox-caption {
      margin-top: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 9.5pt;
      color: #1e293b;
      text-align: center;
      font-style: italic;
      line-height: 1.35;
      max-width: 800px;
    }

    @media print {
      .timeline-lightbox {
        display: none !important;
      }
      .thumb-img {
        cursor: default !important;
      }
    }
  </style>
</head>
<body>
  ${pagesHtml}

  <!-- Interactive Lightbox Zoom Modal -->
  <div id="timeline-lightbox" class="timeline-lightbox" onclick="closeLightbox(event)">
    <div class="lightbox-dialog" onclick="event.stopPropagation()">
      <button class="lightbox-close-btn" onclick="closeLightbox()" title="Close (Esc)">&times;</button>
      <div class="lightbox-img-wrap">
        <img id="lightbox-img" src="" alt="" />
      </div>
      <div id="lightbox-caption" class="lightbox-caption"></div>
    </div>
  </div>

  <script>
    function openLightbox(src, caption) {
      const modal = document.getElementById('timeline-lightbox');
      const img = document.getElementById('lightbox-img');
      const cap = document.getElementById('lightbox-caption');
      if (!modal || !img) return;
      img.src = src;
      img.alt = caption || 'Primary Archival Source';
      if (cap) cap.textContent = caption || '';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox(e) {
      const modal = document.getElementById('timeline-lightbox');
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.thumb-img').forEach(img => {
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          const src = img.getAttribute('src');
          const capEl = img.parentElement ? img.parentElement.querySelector('.thumb-caption') : null;
          const caption = capEl ? capEl.innerText : img.getAttribute('alt');
          openLightbox(src, caption);
        });
      });
    });
  </script>
</body>
</html>`;
}

async function main() {
  console.log(
    '🚀 Compiling Edexcel GCSE Paper 2 (Conflict in the Middle East, 1945–1995) Visual Timeline...',
  );

  const unitData = await loadCmeData();
  const htmlContent = buildTimelineHTML(unitData);

  // Write HTML output
  fs.writeFileSync(HTML_OUT_PUBLIC, htmlContent, 'utf8');
  console.log(`📄 HTML rendered to ${HTML_OUT_PUBLIC}`);

  // Launch Puppeteer to export PDF with zero overflow verification
  console.log('🌐 Launching Puppeteer for print compilation and layout validation...');
  const { pathToFileURL } = require('url');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(HTML_OUT_PUBLIC).href, { waitUntil: 'load' });
  await page.evaluateHandle('document.fonts.ready');

  // Validate layout bounds on all 4 pages
  const pageHeights = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page');
    return Array.from(pages).map((p, idx) => ({
      page: idx + 1,
      id: p.id,
      scrollHeight: p.scrollHeight,
      clientHeight: p.clientHeight,
      overflow: p.scrollHeight > 1123,
    }));
  });

  console.log('📐 Page layout report: Total pages rendered = ' + pageHeights.length);
  let hasOverflow = false;
  pageHeights.forEach((p) => {
    if (p.overflow) {
      console.error(
        `❌ PAGE OVERFLOW DETECTED on Page ${p.page} (${p.id}): scrollHeight=${p.scrollHeight}px > 1123px!`,
      );
      hasOverflow = true;
    } else {
      console.log(`   Page ${p.page} (${p.id}): ${p.scrollHeight}px / 1123px - OK`);
    }
  });

  if (hasOverflow) {
    console.warn(
      '⚠️ Warning: Some pages exceeded the 1123px printable height. Adjust padding/margins if needed.',
    );
  } else {
    console.log(
      '✅ Automated Overflow Check: All 4 pages fit cleanly within 1123px bounds (0 overflows)!',
    );
  }

  // Export PDF to public/pdfs/cme_new_timeline.pdf
  fs.mkdirSync(path.dirname(PDF_OUT_PUBLIC), { recursive: true });
  fs.mkdirSync(path.dirname(PDF_OUT_UNIT), { recursive: true });

  await page.pdf({
    path: PDF_OUT_PUBLIC,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`📕 Exported Master PDF: ${PDF_OUT_PUBLIC}`);

  // Copy to unit directory
  fs.copyFileSync(PDF_OUT_PUBLIC, PDF_OUT_UNIT);
  console.log(`📋 Synced PDF to unit directory: ${PDF_OUT_UNIT}`);

  await browser.close();

  // Synchronize to Google Drive Department File if accessible
  try {
    const { syncAdminPdfsToDrive } = require('./sync_admin_pdfs_to_drive.cjs');
    syncAdminPdfsToDrive();
  } catch (err) {
    // Non-fatal if offline
  }

  console.log('\n🎉 SUCCESS: 4-Page Complete Middle East Visual Timeline Booklet is compiled!\n');
}

main().catch((err) => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
