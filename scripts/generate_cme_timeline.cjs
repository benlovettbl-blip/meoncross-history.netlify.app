/**
 * generate_cme_timeline.cjs
 *
 * Compiles the complete, print-perfect Pearson Edexcel GCSE (9–1) History Paper 2:
 * "Conflict in the Middle East, 1945–1995" Visual Timeline & Key Topic Revision Booklet (4-Page Master Volume).
 *
 * Key Architectural & Pedagogical Features:
 * 1. Dynamic Source Synchronization: Automatically inspects `units/cme_new/data.js` and extracts
 *    the active primary visual sources and contemporary maps, ensuring zero manual resyncing when sources change.
 * 2. 3-Beat Pedagogical Rhythm: Formats each milestone into:
 *    - ⚡ THE TRIGGER (Underlying Cause & Immediate Spark)
 *    - 💥 THE ACTION (Military Campaign / Diplomatic Breakthrough / Street Mobilization)
 *    - 🎯 THE CONSEQUENCE (Territorial Shift / Treaty / Political Realignment)
 *    Directly trains pupils for Edexcel's 4-mark Consequence and 8-mark Analytical Narrative questions.
 * 3. 4-Era Color-Coded Architecture (1 Page per Era / Key Topic):
 *    - Page 1: Era 1 (1917–1949) — British Mandate, UN Partition & War of Creation (Navy #1b365d)
 *    - Page 2: Era 2 (1955–1973) — The Decades of Total War & Arab Nationalism (Crimson #991b1b)
 *    - Page 3: Era 3 (1974–1979) — Cold War Diplomacy, Shuttle Diplomacy & Camp David (Forest Green #166534)
 *    - Page 4: Era 4 (1982–1995) — The 1982 Lebanon Invasion, First Intifada & Oslo (Amber #b45309)
 * 4. Specification Terminology Highlighter & Micro-Glossaries on every page.
 * 5. Complete Coverage of all Major Conflicts, prominently including the 1982 Lebanon War & Sabra-Shatila.
 * 6. Puppeteer PDF Compilation with Automated Zero-Overflow Layout Guardrail (<= 1123px per page).
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const PDF_OUT_PUBLIC = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new_timeline.pdf');
const PDF_OUT_UNIT = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'cme_new_timeline.pdf');
const PDF_OUT_GDRIVE =
  'G:\\My Drive\\AAMX\\Dep File\\Conflict in the Middle East Visual Timeline.pdf';
const HTML_OUT_PUBLIC = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'timeline.html');

// Helper to convert relative public paths to base64 Data URIs for offline Puppeteer rendering
function getImageDataUri(imgPath) {
  if (!imgPath) return '';
  const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  const fullPath = path.join(ROOT_DIR, 'public', cleanPath);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).toLowerCase().replace('.', '');
    const mime =
      ext === 'svg'
        ? 'image/svg+xml'
        : ext === 'png'
          ? 'image/png'
          : ext === 'webp'
            ? 'image/webp'
            : 'image/jpeg';
    const b64 = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${b64}`;
  }
  return imgPath;
}

// Markdown formatting helper
function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

async function loadCmeData() {
  const dataPath = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'data.js');
  const fileUrl = require('url').pathToFileURL(dataPath).href;
  const mod = await import(fileUrl);
  return mod.unitData || mod.default;
}

function buildTimelineHTML(unitData) {
  // Extract all sources mapped by lesson for dynamic fallback
  const lessonSources = {};
  unitData.lessons.forEach((l, idx) => {
    lessonSources[idx + 1] = {
      title: l.title,
      sources: l.sources || [],
      blocks: l.narrative_blocks || [],
    };
  });

  // Helper to dynamically resolve visual source image from lesson data
  function resolveSourceImg(lessonNum, preferredKeyword, fallbackPath) {
    const lData = lessonSources[lessonNum];
    if (lData) {
      if (lData.sources) {
        const found = lData.sources.find(
          (s) =>
            (s.title && s.title.toLowerCase().includes(preferredKeyword.toLowerCase())) ||
            (s.caption && s.caption.toLowerCase().includes(preferredKeyword.toLowerCase())),
        );
        if (found && (found.image || found.src)) return found.image || found.src;
      }
      if (lData.blocks) {
        const bFound = lData.blocks.find(
          (b) =>
            (b.image && b.image.toLowerCase().includes(preferredKeyword.toLowerCase())) ||
            (b.caption && b.caption.toLowerCase().includes(preferredKeyword.toLowerCase())),
        );
        if (bFound && bFound.image) return bFound.image;
      }
    }
    return fallbackPath;
  }

  // 4 ERAS DEFINITION
  const ERAS = [
    // =========================================================================
    // PAGE 1: ERA 1 (1917–1949) • BRITISH MANDATE, UN PARTITION & WAR OF CREATION
    // =========================================================================
    {
      page: 1,
      eraId: 'era_1',
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
        'UN Resolution 181',
        'Al-Nakba',
        '1949 Green Line Armistice',
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
          image: resolveSourceImg(2, 'king david', '/assets/cme_new_king_david_ruins.png'),
          caption:
            'The collapsed south-west wing housing British military & administrative headquarters.',
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
          image: resolveSourceImg(2, 'sergeant', '/images/cme_sergeants_affair_1947.jpg'),
          caption:
            'The Sergeants Affair: Bodies of two executed British sergeants hung near Netanya.',
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
          title: 'The Palestinian Nakba & The 1949 Armistice Green Line',
          specTag: 'Permanent Displacement & The Green Line',
          image: resolveSourceImg(3, 'refugees', '/images/cme_palestinian_refugees_1948.jpg'),
          caption:
            'Palestinian refugees fleeing their ancestral villages during the 1948 Nakba (Catastrophe).',
          trigger:
            'Intense military fighting, Plan Dalet clearing operations, and panic following massacres (e.g. Deir Yassin).',
          action:
            'Over 700,000 Palestinian Arabs were expelled or fled into exile in Gaza, the West Bank, Lebanon, Syria, and Jordan (known as *Al-Nakba*).',
          consequence:
            'UN-brokered Armistice Agreements established the **Green Line**: Israel expanded from 55% to 78% of Palestine; Gaza held by Egypt; West Bank annexed by Jordan.',
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
          term: 'Al-Nakba',
          def: 'Arabic for "The Catastrophe": the expulsion and flight of 700,000+ Palestinians during the 1948 war.',
        },
        {
          term: 'Green Line',
          def: 'The 1949 armistice border separating Israel from Jordanian-held West Bank and Egyptian-held Gaza.',
        },
      ],
    },

    // =========================================================================
    // PAGE 2: ERA 2 (1955–1973) • THE DECADES OF TOTAL WAR & ARAB NATIONALISM
    // =========================================================================
    {
      page: 2,
      eraId: 'era_2',
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
        'Pre-emptive Strike',
        'Operation Focus',
        'UN Resolution 242',
        'Fedayeen',
        'Black September',
        'Bar Lev Line',
        'OPEC Oil Embargo',
      ],
      milestones: [
        {
          date: 'July – Nov 1956',
          title: 'The Suez Crisis & The Rise of Gamal Abdel Nasser',
          specTag: 'Anti-Colonial Defiance & The Cold War',
          image: resolveSourceImg(4, 'nasser', '/images/cme_nasser_1956.jpg'),
          caption:
            'President Gamal Abdel Nasser, hero of Pan-Arab nationalism across the Middle East.',
          trigger:
            'US and Britain cancelled funding for Egypt’s Aswan High Dam after Nasser bought Soviet Czech weapons.',
          action:
            'Nasser nationalised the Suez Canal; Britain, France, and Israel launched secret collusive invasion (Protocol of Sèvres).',
          consequence:
            'US President Eisenhower forced British and French withdrawal via economic threats; Nasser became the undisputed hero of **Pan-Arabism**; UNEF placed in Sinai.',
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
          title: 'Black September: The Civil War in Jordan',
          specTag: 'Palestinian Militancy & The PFLP',
          image: resolveSourceImg(6, 'munich', '/images/cme_munich_1972_balcony.jpg'),
          caption: 'A Black September militant on the balcony at the 1972 Munich Olympic Games.',
          trigger:
            'The PLO and PFLP operated as a "state within a state" in Jordan, launching cross-border fedayeen raids and hijacking 4 Western airliners to Dawson\'s Field.',
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
            'Launched surprise coordinated assault on the holiest Jewish day; Egyptian troops breached the Bar Lev Line under a Soviet SAM anti-aircraft umbrella.',
          consequence:
            'Shattered Israeli myth of military invincibility; Arab OPEC ministers launched an **Oil Embargo** quadrupling world oil prices; forced US into emergency shuttle diplomacy.',
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
    // PAGE 3: ERA 3 (1974–1979) • COLD WAR DIPLOMACY, SHUTTLE DIPLOMACY & CAMP DAVID
    // =========================================================================
    {
      page: 3,
      eraId: 'era_3',
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
        'Yasser Arafat at UN',
        'Anwar Sadat',
        'Knesset Address',
        'Menachem Begin',
        'Jimmy Carter',
        'Camp David Accords',
        'Sinai Demilitarisation',
        'Arab League Boycott',
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
            'Elevated the Palestinian national cause from a mere refugee issue into a recognized global political struggle for statehood.',
        },
        {
          date: '1974–1975',
          title: 'Kissinger’s "Shuttle Diplomacy" & Sinai Disengagement',
          specTag: 'Step-by-Step Diplomatic Realism',
          image: resolveSourceImg(7, 'israeli', '/images/cme_israeli_crossing_suez_1973.jpg'),
          caption:
            'Israeli armor returning during the US-negotiated military disengagement agreements.',
          trigger:
            'The terrifying superpower nuclear alert during the Yom Kippur War convinced Washington that regional stability was a vital US priority.',
          action:
            'US Secretary of State Henry Kissinger flew relentlessly between Cairo, Tel Aviv, and Damascus negotiating military disengagement pacts.',
          consequence:
            'Separated Israeli and Egyptian armies along the Suez Canal, reopened the canal to shipping, and detached Egypt from the Soviet sphere of influence.',
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
            'Sadat made the electrifying announcement that he was ready to travel to the heart of Israel; he addressed the Knesset, recognizing Israel’s existence.',
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
            'Sadat and Begin signed the formal peace treaty in Washington, establishing diplomatic relations and trade ties.',
          consequence:
            'Israel neutralized its most formidable military opponent; the Arab League expelled Egypt, relocated its headquarters to Tunis, and Sadat was assassinated in 1981.',
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
          term: 'Normalisation',
          def: 'Establishing standard diplomatic, commercial, cultural, and travel relations between formerly hostile nations.',
        },
      ],
    },

    // =========================================================================
    // PAGE 4: ERA 4 (1982–1995) • LEBANON INVASION, FIRST INTIFADA & OSLO PEACE
    // =========================================================================
    {
      page: 4,
      eraId: 'era_4',
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
        'Sabra & Shatila',
        'Kahan Commission',
        'First Intifada',
        'UNLU',
        'Oslo Accords',
        'Declaration of Principles',
        'Palestinian Authority',
        'Oslo II (Areas A, B, C)',
        'Yitzhak Rabin Assassination',
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
            'Historic psychological breakthrough; rejected by extremist factions on both sides (Hamas and Islamic Jihad launched suicide bombings; Israeli settlers protested).',
        },
        {
          date: 'October 1994',
          title: 'The Israel-Jordan Peace Treaty',
          specTag: 'Consolidating Regional Peace',
          image: resolveSourceImg(10, 'handshake', '/images/cme_treaty_triple_handshake_1979.jpg'),
          caption:
            'King Hussein of Jordan and Yitzhak Rabin signing the peace treaty in the Arava desert.',
          trigger:
            'The momentum generated by the Oslo Accords created diplomatic cover for King Hussein of Jordan to formalize relations with Israel.',
          action:
            'Yitzhak Rabin and King Hussein signed the second full peace treaty between Israel and an Arab state, settling border and water disputes.',
          consequence:
            'Solidified Israel’s longest eastern frontier, opened bilateral trade and security cooperation, and isolated hardline rejectionist states like Syria and Iraq.',
        },
        {
          date: '1995',
          title: 'The Oslo II Agreement & The Assassination of Yitzhak Rabin',
          specTag: 'Partition of the West Bank & The Tragic Climax',
          image: resolveSourceImg(10, 'areas', '/images/cme_oslo_areas_map.png'),
          caption:
            'Map of West Bank fragmented into Area A (Palestinian control), Area B (joint), and Area C (Israeli control).',
          trigger:
            'Need to expand Palestinian civil self-rule beyond Jericho into major West Bank Palestinian towns.',
          action:
            'Oslo II partitioned the West Bank into **Areas A, B, and C**. On 4 November 1995, Prime Minister **Yitzhak Rabin** was assassinated by right-wing Jewish extremist Yigal Amir.',
          consequence:
            'West Bank remained fragmented under 60% direct Israeli military control (Area C); the peace process lost its principal Israeli architect, plunging the peace movement into crisis.',
        },
      ],
      glossary: [
        {
          term: 'Intifada',
          def: 'Arabic for "shaking off": the mass Palestinian grassroots uprising against Israeli occupation (1987–1993).',
        },
        {
          term: 'UNLU',
          def: 'Unified National Leadership of the Uprising: the clandestine local leadership that coordinated strikes and protests during the Intifada.',
        },
        {
          term: 'Palestinian Authority',
          def: 'Interim administrative governing body established under the 1993 Oslo Accords to govern parts of the West Bank and Gaza.',
        },
        {
          term: 'Areas A, B, and C',
          def: 'The 1995 territorial partition of the West Bank into Palestinian civil/security (A), Palestinian civil/Israeli security (B), and full Israeli control (C).',
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
              <img src="${dataUri}" alt="${m.title}" class="thumb-img" />
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
      padding: 16px 20px 14px 20px;
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
      padding-bottom: 5px;
      margin-bottom: 6px;
    }
    .top-meta {
      display: flex;
      justify-content: space-between;
      font-size: 6.2pt;
      font-weight: 800;
      color: #475569;
      letter-spacing: 0.6px;
      margin-bottom: 2px;
    }
    .header-main {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 5px;
    }
    .era-heading {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13.5pt;
      font-weight: 900;
      line-height: 1.1;
      margin: 0;
      letter-spacing: -0.3px;
    }
    .era-subheading {
      font-size: 7.0pt;
      font-weight: 700;
      color: #475569;
      margin-top: 1px;
    }
    .page-badge-box {
      padding: 2px 7px;
      border-radius: 4px;
      text-align: right;
      line-height: 1.15;
    }
    .badge-era {
      display: block;
      font-size: 7.5pt;
      font-weight: 800;
    }
    .badge-sub {
      display: block;
      font-size: 5.6pt;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.4px;
    }

    /* Spec Ribbon */
    .spec-ribbon {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 3px 6px;
      border-radius: 4px;
      margin-top: 2px;
    }
    .ribbon-label {
      font-size: 6.2pt;
      font-weight: 900;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    .pills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
    }
    .spec-pill {
      font-size: 5.8pt;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      line-height: 1.2;
    }

    /* Milestones */
    .milestones-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      justify-content: space-between;
      margin-top: 2px;
      margin-bottom: 4px;
    }

    .milestone-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 5px 8px;
      display: flex;
      gap: 9px;
      align-items: stretch;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }

    .card-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
    }
    .date-badge {
      color: #ffffff;
      font-size: 6.4pt;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 3px;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }
    .spec-tag {
      font-size: 5.9pt;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .milestone-title {
      font-size: 8.4pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      margin-bottom: 3px;
    }

    /* 3-Beat Rhythm Box */
    .rhythm-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 3px;
      padding: 3px 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .rhythm-line {
      font-size: 6.5pt;
      line-height: 1.28;
      display: flex;
      gap: 4px;
      color: #1e293b;
    }
    .rhythm-label {
      font-weight: 900;
      font-size: 5.9pt;
      white-space: nowrap;
      flex-shrink: 0;
      width: 76px;
    }
    .trigger-label { color: #b45309; }
    .action-label { color: #1e3a8a; }
    .consequence-label { color: #047857; }
    .rhythm-text {
      flex: 1;
    }

    /* Thumbnail Column */
    .card-thumb-col {
      width: 86px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .thumb-frame {
      background: #ffffff;
      border-radius: 4px;
      overflow: hidden;
      padding: 2px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .thumb-img {
      width: 100%;
      height: 52px;
      object-fit: cover;
      border-radius: 2px;
      display: block;
    }
    .thumb-caption {
      font-size: 5.0pt;
      font-style: italic;
      color: #475569;
      line-height: 1.15;
      margin-top: 2px;
      padding: 0 1px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Bottom Bar */
    .page-bottom-bar {
      padding-top: 4px;
    }
    .glossary-strip {
      padding: 3px 7px;
      border-radius: 4px;
      margin-bottom: 3px;
    }
    .gloss-title {
      font-size: 5.8pt;
      font-weight: 900;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }
    .gloss-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      font-size: 5.8pt;
      line-height: 1.25;
      color: #334155;
    }
    .footer-signoff {
      display: flex;
      justify-content: space-between;
      font-size: 5.8pt;
      color: #64748b;
      padding: 0 2px;
    }
  </style>
</head>
<body>
  ${pagesHtml}
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
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

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
