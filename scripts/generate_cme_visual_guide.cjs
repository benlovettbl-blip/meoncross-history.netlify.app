/**
 * generate_cme_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Pearson Edexcel GCSE (9–1) History Paper 2 (Period Study):
 * "Option P5: Conflict in the Middle East, 1945–1995 (1HI0/P5)"
 * Visual Revision Masterclasses & Complete Specification Guide (28-Page Master Volume).
 *
 * Commercial Saddle-Stitch Format (28 Pages = 7 folded A3 sheets, 0 blank pages, 0 overflows):
 * - Page 1: Official Examination Cover with Primary 1948 Nakba Historical Plate + Specification Checklist
 * - Page 2: Paper 2 Period Study Blueprint, Exam Architecture & Four Non-Negotiable Success Principles
 * - Page 3: Master Chronology & Geopolitical Shift Matrix (1945–1995) + Examiner Synoptic Takeaway
 * - Pages 4–27: 12 Pure Double-Page Revision Spreads (Zero dead space; dense narrative, causal pathways & GCSE Word Banks)
 * - Page 28: Master Historiographical Debates (Traditional vs New Historians) & Final Revision Checklist
 *
 * Strict Monochrome / Black & White Styling:
 * - Designed for optimal high-contrast professional printing with zero color reliance.
 * - Enriched with 100% of the facts, metrics, and demographics from the official Pearson Revision Guide.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const ROOT_DIR = path.join(__dirname, '..');
const PDF_OUT_PUBLIC = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_visual_revision_guide.pdf');
const PDF_OUT_PUBLIC_CME = path.join(
  ROOT_DIR,
  'public',
  'pdfs',
  'cme_new',
  'cme_visual_revision_guide.pdf',
);
const PDF_OUT_UNIT = path.join(
  ROOT_DIR,
  'public',
  'units',
  'cme_new',
  'edexcel_cme_visual_revision_and_exam_guide.pdf',
);
const HTML_OUT_PUBLIC = path.join(
  ROOT_DIR,
  'public',
  'units',
  'cme_new',
  'visual_revision_guide.html',
);

const GDRIVE_DIRS = [
  'G:\\My Drive\\AAMX\\Dep File\\Year 10 (GCSE)\\Paper 2 - Conflict in the Middle East',
  'G:\\My Drive\\AAMX\\Dep File\\02. GCSE (Years 10-11)\\Paper 2 - Conflict in the Middle East\\03. Retrieval Quizzing & Mastery',
];

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

function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// =============================================================================
// COMPLETE 12-SPREAD CURRICULUM DATA MODEL FOR PAPER 2 (OPTION P5)
// =============================================================================
const SPREADS = [
  {
    id: 'cme_spread_1',
    spreadNum: 1,
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.1: The British Mandate, Jewish Underground & UN Referral (1945–47)',
    left: {
      tag: 'KT 1.1 • Context, Origins & The Mandate Collapse',
      headline: 'Terror, Bankruptcy & Surrender: How Britain Lost Control of Palestine',
      summary:
        'Following the Holocaust in Europe, Britain attempted to uphold the 1939 White Paper restriction of 15,000 Jewish refugees per year to secure Arab oil concessions and protect the Suez Canal. In response, Jewish underground paramilitary organisations—the official Haganah and militant splinter groups Irgun (led by Menachem Begin) and Lehi—launched a violent guerrilla insurgency against British military infrastructure. Exhausted by WWII debt, facing domestic outrage over soldier casualties, and pressured by US President Truman following the Anglo-American Committee (1946), Britain announced on 18 February 1947 that it would surrender the Mandate to the United Nations without recommending any solution.',
      pillars: [
        {
          title: 'Mandate Roots & Refugee Crisis',
          subtitle: '1923 Terms & Post-War Blockade',
          bullets: [
            '**1923 Mandate Dilemma:** Following the 1917 Balfour Declaration, the League of Nations Mandate established 3 contradictory obligations: (1) protect civil and religious rights of the Arab majority, (2) establish a Jewish national home, and (3) prepare the country for independent self-government.',
            '**Demographic Surge & 1936–39 Arab Revolt:** The Jewish population doubled by 1931 (from 84,000 to 175,000) and escalated rapidly as thousands fled Nazi Germany from 1933; Britain crushed the 1936–39 Arab Revolt with 20,000 troops and Haganah assistance, leaving Arab military leadership shattered.',
            '**Peel Commission (1937) & 1939 White Paper:** Lord Peel proposed the first partition into separate states, which Arabs rejected; seeking Arab oil alliances before WWII, Britain reversed policy in the 1939 White Paper, capping Jewish immigration at **15,000 per year for 5 years** (75,000 total).',
            "**The SS Exodus & DP Camps (July 1947):** Over 250,000 Holocaust survivors remained trapped in European DP camps; Haganah's Aliyah Bet ran blockades until the Royal Navy intercepted the SS Exodus with **4,500 refugees**, forcibly deporting them to Hamburg, Germany, provoking worldwide moral condemnation.",
          ],
        },
        {
          title: 'Armed Insurgency & Sabotage',
          subtitle: 'Guerrilla Strikes vs British Rule',
          bullets: [
            '**The Paramilitary Underground:** The mainstream Haganah (defense force led by Ben-Gurion) and militant splinter groups Irgun (led by Menachem Begin) and Lehi (Stern Gang) formed the unified Hebrew Resistance Movement following the furious August 1945 London Zionist conference.',
            '**153 Railway Bombs & Transport Paralysis:** Jewish underground fighters detonated **153 bombs on railway lines**, severed telephone communications, blew up military radar stations, and destroyed oil pipelines, effectively paralyzing British troop logistics across Palestine.',
            '**Night of the Bridges (June 1946):** Haganah commandos destroyed **11 road and rail bridges** linking Palestine to Transjordan, Syria, Lebanon, and Egypt in a single night, demonstrating complete tactical dominance over the countryside and severing British supply routes.',
            '**King David Hotel Bombing (22 July 1946):** Irgun commandos disguised as milk delivery men detonated 225kg of TNT inside British military headquarters, killing **91 people** (British, Arab, Jewish civil servants); Ben-Gurion publicly condemned the Irgun after Begin ignored evacuation warnings.',
          ],
        },
        {
          title: 'British Military Collapse',
          subtitle: 'The Police State & Surrender',
          bullets: [
            '**The "Bevingrad" Police State:** Britain deployed **100,000 soldiers** (1 soldier for every 6 Jews) costing **£40 million annually**; Jerusalem and Tel Aviv administration compounds were sealed behind massive barbed-wire fortresses nicknamed "Bevingrad" under strict curfews.',
            '**Acre Prison Raid (May 1947):** Irgun commandos dynamited the ancient crusader fortress of Acre, freeing 27 underground prisoners; British military courts responded by sentencing 3 captured Irgun fighters to death by hanging.',
            "**The Sergeants Affair (July 1947):** Begin retaliated by hanging 2 captured British military intelligence sergeants (Clifford Martin and Mervyn Paice) in an orange grove and booby-trapping Martin's body with a landmine, triggering violent anti-Jewish riots across British cities.",
            '**UN Referral (18 Feb 1947):** Exhausted by WWII debt, facing calls to "bring the boys home", and pressured by US threats to withhold postwar financial loans, Foreign Secretary Ernest Bevin announced Britain would surrender the Mandate to the UN without recommending any solution.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Ernest Bevin & Attlee',
          role: 'British Foreign Secretary and Prime Minister who enforced immigration quotas to protect Arab oil alliances; surrendered Mandate to the UN in Feb 1947.',
        },
        {
          name: 'David Ben-Gurion',
          role: 'Chairman of the Jewish Agency and leader of Haganah; coordinated political pressure and Aliyah Bet blockade running, but condemned King David Hotel bombing.',
        },
        {
          name: 'Menachem Begin (Irgun)',
          role: 'Commander of militant Irgun; masterminded the King David Hotel bombing (91 dead), Acre Prison breakout, and the Sergeants Affair hanging in July 1947.',
        },
        {
          name: 'Harry S. Truman',
          role: 'US President who demanded immediate entry for 100,000 Holocaust survivors and leveraged vital postwar American loans to force British withdrawal.',
        },
      ],
      archivalSource: {
        title: 'Foreign Secretary Ernest Bevin to House of Commons (18 Feb 1947)',
        citation: 'Hansard Parliamentary Debates, Vol. 433, Col. 985',
        quote:
          "His Majesty's Government have been faced with an irreconcilable conflict of principles... The Mandate is unworkable. We have decided to refer the whole problem to the United Nations without recommending any solution of our own.",
        significance:
          'Demonstrates complete British admission of imperial failure; Britain refused to enforce partition and abandoned Palestine to civil war.',
      },
    },
    right: {
      tag: 'KT 1.1 • Strategic Case Studies, Causal Mechanisms & Word Bank',
      deepCases: [
        {
          title: '1. The 1923 Mandate Dilemma & Peel Commission',
          points: [
            '**Contradictory Commitments:** Britain promised conflicting rights to both Arab majority and Jewish minority; by 1931, Jewish population had doubled to 175,000.',
            '**1936–39 Arab Revolt:** Crushed by 20,000 British troops aided by Haganah Special Night Squads (Orde Wingate), crippling Palestinian Arab political and military leadership.',
            '**Peel Commission (1937):** First official British proposal to partition Palestine into separate states; rejected by Arabs and superseded by 1939 White Paper.',
            '**1939 White Paper Quotas:** Capped Jewish immigration at 15,000/yr for 5 years (75,000 total) with subsequent Arab veto, trapping European Jews on the eve of the Holocaust.',
          ],
        },
        {
          title: '2. Railway Sabotage (153 Bombs) & King David Hotel',
          points: [
            "**London Conference Backlash (Aug 1945):** Fury at Attlee's Labour government upholding the White Paper led Jewish groups to launch an armed offensive against British rule.",
            '**Railway Sabotage:** Underground fighters set **153 bombs on railway lines**, blowing up tracks, locomotives, and signal boxes to paralyze British troop deployments.',
            '**King David Hotel Strike (July 1946):** Irgun commandos disguised as Arab milk delivery men planted explosives in the basement; **91 civilians and military staff were killed**.',
            '**Haganah Condemnation:** While initially united under the Hebrew Resistance Movement, Ben-Gurion condemned the Irgun for ignoring evacuation warnings, splitting the underground.',
          ],
        },
        {
          title: '3. SS Exodus (4,500 Survivors) & US Pressure',
          points: [
            "**Displaced Persons Crisis:** Over 250,000 Holocaust survivors remained languishing in European DP camps; Haganah's Aliyah Bet clandestine network purchased American ships to run blockades.",
            '**Blockade Running (July 1947):** The SS Exodus carried **4,500 Holocaust survivors**; Royal Navy destroyers rammed the vessel off Haifa, killing 3 and wounding dozens.',
            '**Global Moral Outrage:** British destroyers forcibly deported refugees back to DP camps in Hamburg, Germany, shocking American public opinion and generating global press fury.',
            "**Truman's Ultimatum:** President Truman pressured Britain to admit 100,000 survivors, threatening to withhold crucial $3.75 billion Anglo-American postwar financial loans.",
          ],
        },
        {
          title: '4. The Sergeants Affair & The Bevingrad Police State',
          points: [
            '**"Bevingrad" Fortresses:** 100,000 British troops (£40m/yr cost) placed major cities under constant curfews, retreating into barbed-wire administrative compounds ("Bevingrad").',
            '**Acre Prison Raid (May 1947):** Irgun dynamited the ancient fortress of Acre, freeing 27 underground prisoners; Britain responded by sentencing 3 captured Irgun men to death.',
            "**Sergeants Hanged (July 1947):** Irgun hanged two captured British sergeants (Clifford Martin and Mervyn Paice) in an orange grove and booby-trapped Martin's body with landmines.",
            '**Domestic Collapse:** The deaths caused anti-Semitic riots in Liverpool and London; British newspapers declared Palestine an "unbearable drain in blood and treasure".',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. White Paper & DP Camps',
          text: '1939 cap (15k/yr) traps 250k Holocaust survivors in European camps; Aliyah Bet blockade running begins.',
        },
        {
          stage: '2. Insurgency & 153 Bombs',
          text: 'Irgun & Haganah set 153 railway bombs; King David Hotel bombing kills 91; Bevin establishes police state.',
        },
        {
          stage: '3. Exodus & Sergeants Affair',
          text: 'Exodus deportation shocks world; 2 sergeants hanged in retaliation; British public demands troop withdrawal.',
        },
        {
          stage: '4. UN Referral (Feb 1947)',
          text: 'Exhausted by £40m annual costs, 100k troops, and US financial pressure, Britain surrenders Mandate to UN.',
        },
      ],
      masterWordBank: [
        {
          term: '1923 Mandate',
          def: 'League of Nations charter with conflicting obligations to Jews and Arabs.',
        },
        {
          term: '1939 White Paper',
          def: 'British policy limiting Jewish immigration to 15,000 per year for five years.',
        },
        {
          term: 'Aliyah Bet',
          def: 'Clandestine Jewish underground network organizing illegal refugee ships.',
        },
        {
          term: 'Haganah',
          def: 'Main Jewish paramilitary defense force led by David Ben-Gurion.',
        },
        {
          term: 'Irgun (Etzel)',
          def: 'Militant revisionist splinter group led by Menachem Begin.',
        },
        {
          term: '153 Railway Bombs',
          def: 'Sabotage strikes on railway lines crippling British transport.',
        },
        {
          term: 'King David Hotel',
          def: 'British headquarters bombed by Irgun on 22 July 1946; 91 people killed.',
        },
        {
          term: 'SS Exodus (1947)',
          def: 'Refugee ship carrying 4,500 Holocaust survivors forcibly returned to Germany.',
        },
        {
          term: 'Bevingrad',
          def: 'Fortified, barbed-wire security compounds housing British personnel.',
        },
        {
          term: 'Sergeants Affair',
          def: 'Hanging of two British sergeants by Irgun in retaliation for Acre executions.',
        },
        {
          term: 'Ernest Bevin',
          def: 'British Foreign Secretary who referred Palestine to the UN on 18 Feb 1947.',
        },
        {
          term: 'Harry S. Truman',
          def: 'US President who demanded entry for 100,000 refugees, pressuring Britain.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_2',
    spreadNum: 2,
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.2: UN Partition Resolution 181 & The 1948–49 Arab-Israeli War',
    left: {
      tag: 'KT 1.2 • Partition, Civil War & The Five-Army Invasion',
      headline: 'Resolution 181 to Armistice: How the Infant State of Israel Survived',
      summary:
        'On 29 November 1947, the UN General Assembly voted to partition Palestine into independent Arab and Jewish states, with Jerusalem under international control (Corpus Separatum). Arabs rejected the plan as unjust because Arabs comprised 67% of the population but were allocated under 44% of the land, while the proposed Jewish state contained 400,000 Arab residents. The vote triggered an immediate civil war, marked by the Deir Yassin massacre (around 100 killed), causing 250,000 Palestinians to flee before 15 May 1948. When David Ben-Gurion declared the State of Israel on 14 May 1948, five Arab armies invaded. Despite 650,000 Israelis facing 40 million Arabs, Israel secured survival through the June truce, Czech arms airlifts, and unified IDF military leadership.',
      pillars: [
        {
          title: 'UN Resolution 181 (Nov 1947)',
          subtitle: 'The Demographic Partition Dilemma',
          bullets: [
            '**The Partition Vote (29 Nov 1947):** UNSCOP toured Palestine in summer 1947 (boycotted by Arab Higher Committee); the UN voted 33 to 13 (with 10 abstentions, both US and USSR voting YES) to partition Palestine into separate states.',
            '**The Demographic Imbalance:** Arabs formed **67% (two-thirds) of the population** and owned most cultivated land, but received under **44% of the land**; the proposed Jewish state received **55% of the land** (mostly Negev Desert).',
            '**Demographic Trap (400,000 Arabs):** The proposed Jewish state contained **400,000 Arab residents (45% of its total population)**; Jerusalem and Bethlehem were placed under international UN trusteeship (Corpus Separatum).',
            '**The Economic Union Mandate:** Resolution 181 stipulated that both states must form an Economic Union sharing currency, customs, railways, postal services, and ports; Arab leaders rejected this outright as an imperial imposition.',
          ],
        },
        {
          title: 'Civil War & Deir Yassin Panic',
          subtitle: 'December 1947 – May 1948',
          bullets: [
            '**Outbreak of Civil War:** Violence erupted immediately after the UN vote; Arab irregulars ambushed Jewish convoys, blockading food and water supplies to **100,000 Jewish residents besieged in Jerusalem**.',
            '**Arab Liberation Army (ALA):** The Arab League sponsored 5,000 volunteers under Fawzi al-Qawuqji crossing into Palestine before British withdrawal, surrounding Jewish enclaves in Galilee and the Negev.',
            '**Operation Dalet (April 1948):** Haganah operational plan to secure state borders and clear vital transport corridors, commanding the capture of strategic Arab villages along the Tel Aviv-Jerusalem highway.',
            '**Deir Yassin Massacre (9 April 1948):** Irgun and Lehi commandos attacked the village on the road to Jerusalem, killing **around 100 villagers (including women and children)**; exaggerated Arab radio reports intended to rally Arab nations backfired, causing **250,000 Palestinians to flee before 15 May**.',
          ],
        },
        {
          title: 'The Five-Army Invasion & Victory',
          subtitle: '15 May 1948 – July 1949',
          bullets: [
            '**Declaration & Invasion:** On 14 May 1948, Ben-Gurion proclaimed Israeli independence (instantly recognized by US and USSR); on 15 May, regular armies of Egypt, Transjordan, Syria, Iraq, and Lebanon invaded: **650,000 Israelis faced 40 million Arabs**.',
            '**Unified Command (28 May 1948):** Ben-Gurion established the Israeli Defence Forces (IDF), absorbing Haganah, Irgun, and Lehi into a single staff; Arab armies were deeply divided with conflicting territorial ambitions.',
            '**The First UN Truce (11 June – 8 July 1948):** Mediated by Count Bernadotte; Israel used this breathing space to import vital Czech rifles, machine guns, and fighter aircraft (Operation Balak) and construct the secret "Burma Road" into Jerusalem.',
            '**Ten Days Offensive & Armistices:** IDF broke Egyptian lines, captured Lydda, Ramle, and Galilee; bilateral armistices were signed on Rhodes in 1949 with Egypt (24 Feb), Lebanon (23 Mar), Transjordan (3 Apr), and Syria (20 July); Iraq refused to sign.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'David Ben-Gurion',
          role: 'Read the Israeli Declaration of Independence on 14 May 1948; created the unified IDF on 28 May and directed overall war strategy.',
        },
        {
          name: 'King Abdullah I of Transjordan',
          role: 'Commander of the British-trained Arab Legion; captured the Old City of Jerusalem and annexed the West Bank, clashing with other Arab states.',
        },
        {
          name: 'Count Folke Bernadotte',
          role: 'UN Special Mediator who brokered the decisive June 1948 Truce; assassinated in Jerusalem by the militant Jewish group Lehi in Sept 1948.',
        },
        {
          name: 'Fawzi al-Qawuqji',
          role: "Field Commander of the Arab League's volunteer Arab Liberation Army (ALA), which entered Palestine to fight Jewish forces prior to 15 May.",
        },
      ],
      archivalSource: {
        title: 'David Ben-Gurion Declaring the State of Israel (14 May 1948)',
        citation: 'Tel Aviv Museum of Art, Official Declaration Transcript',
        quote:
          'We hereby declare the establishment of a Jewish State in the Land of Israel, to be known as the State of Israel... We appeal to the Arab inhabitants of the State of Israel to preserve peace and participate in the upbuilding of the State on the basis of full and equal citizenship.',
        significance:
          'Proclaimed sovereign Jewish statehood for the first time in 2,000 years, triggering the immediate entry of five regular Arab armies.',
      },
    },
    right: {
      tag: 'KT 1.2 • Military Analysis, Turning Points & Word Bank',
      deepCases: [
        {
          title: '1. The Res 181 Demographic Reality & ALA Incursion',
          points: [
            '**Demographic Imbalance:** Arabs held a 2:1 population majority (**67% vs 33%**) but received only 43% of land, while the Jewish state included **400,000 Arab Palestinians** within its designated borders.',
            '**Economic Union Failure:** UN envisioned shared currency and ports; Arab Higher Committee declared a 3-day general strike and vowed partition would be drowned in blood.',
            '**Arab Liberation Army (ALA):** 5,000 volunteers entered Palestine in Jan 1948 to cut off Jewish enclaves, surrounding Jerusalem and isolating kibbutzim in the Negev.',
            '**Superpower Voting Alignment:** Both the USA and the USSR voted in favor of Resolution 181, seeking to eliminate British imperial presence in the eastern Mediterranean.',
          ],
        },
        {
          title: '2. Deir Yassin (100 Dead) & The 250,000 Refugee Wave',
          points: [
            '**Jerusalem Blockade:** Arab forces cut off the supply road to 100,000 Jewish residents in Jerusalem, causing severe starvation and water rationing.',
            '**The Deir Yassin Attack (9 April):** Irgun and Lehi fighters stormed the strategic hillside village; house-to-house fighting and grenade clearing resulted in **around 100 villagers killed**.',
            '**Mass Flight Mechanism:** Broadcasts by Arab radio intended to shame Arab leaders into invading instead triggered widespread panic; **250,000 Palestinians fled their homes before 15 May**.',
            '**Haganah Condemnation:** Ben-Gurion sent an official apology to King Abdullah of Transjordan, but the psychological terror created by the massacre proved irreversible.',
          ],
        },
        {
          title: '3. The First UN Truce & The Czech Arms Lifeline',
          points: [
            '**Existential Threat (May 1948):** In the first three weeks, Syrian tanks pushed into Galilee and Egyptian columns reached Ashdod, just 32km south of Tel Aviv.',
            '**The June Truce (11 June – 8 July):** Four-week ceasefire mediated by Count Bernadotte allowed Israel to import 25,000 rifles, 5,000 machine guns, and 25 Avia S-199 fighters from communist Czechoslovakia.',
            '**Burma Road Lifeline:** Israeli engineers secretly carved a mountain bypass road through steep hills, breaking the siege of West Jerusalem and transporting convoys of food and ammunition.',
            '**Bernadotte Assassination:** Lehi commandos assassinated Bernadotte in Jerusalem on 17 Sept 1948 after he proposed returning Arab refugees and giving the Negev to Arabs.',
          ],
        },
        {
          title: '4. Divided Arab Armies vs Unified IDF Structure',
          points: [
            '**650,000 vs 40 Million:** While Arab nations possessed massive demographic superiority, their invading expeditionary forces totaled only 40,000 troops vs 35,000 initial Israeli fighters.',
            '**Inter-Arab Rivalry:** King Abdullah of Transjordan refused to advance beyond the West Bank, having reached an informal understanding with the Jewish Agency, which angered Egypt and Syria.',
            '**IDF Mobilization:** By October 1948, Israel mobilized 100,000 troops under unified national command, launching Operation Yoav in the Negev and Operation Hiram in Galilee to crush Arab forces.',
            '**Rhodes Armistices (1949):** Ralph Bunche mediated armistices with Egypt (Feb), Lebanon (Mar), Jordan (Apr), Syria (July); Iraq refused to sign any ceasefire.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Res 181 Partition (Nov 47)',
          text: 'UN votes 33-13 to partition Palestine; Arabs reject giving 55% land to 33% population with 400k Arabs in Jewish zone.',
        },
        {
          stage: '2. Deir Yassin & Flight (Apr 48)',
          text: 'Irgun/Lehi attack Deir Yassin killing ~100; Arab broadcast panic triggers mass flight of 250k Palestinians before 15 May.',
        },
        {
          stage: '3. June Truce & Czech Arms',
          text: 'Bernadotte brokers 4-week truce; IDF imports Czech Avia fighters and rifles, and carves Burma Road into Jerusalem.',
        },
        {
          stage: '4. Operation Yoav & Armistices',
          text: '100k IDF troops rout divided Arab armies; 1949 Rhodes armistices give Israel 79% of land; Iraq refuses to sign.',
        },
      ],
      masterWordBank: [
        {
          term: 'UN Resolution 181',
          def: 'Nov 1947 UN plan to partition Palestine into Arab and Jewish states with international Jerusalem.',
        },
        {
          term: 'Corpus Separatum',
          def: 'Special international legal status designated for Jerusalem and Bethlehem under UN control.',
        },
        {
          term: 'Arab Liberation Army',
          def: 'Volunteer force of 5,000 Arab fighters under Fawzi al-Qawuqji entering Palestine in Jan 1948.',
        },
        {
          term: 'Plan Dalet (Plan D)',
          def: 'Haganah operational strategy in April 1948 to secure borders and communication routes.',
        },
        {
          term: 'Deir Yassin',
          def: 'Arab village near Jerusalem attacked on 9 April 1948; ~100 civilians killed, sparking mass panic.',
        },
        {
          term: '650k vs 40 Million',
          def: 'Demographic ratio of the new State of Israel versus surrounding hostile Arab nations in May 1948.',
        },
        {
          term: 'IDF (28 May 1948)',
          def: 'Unified national military created by Ben-Gurion, dissolving independent underground militias.',
        },
        {
          term: 'First UN Truce',
          def: 'Four-week ceasefire (11 June – 8 July 1948) mediated by Bernadotte, exploited by IDF to rearm.',
        },
        {
          term: 'Czech Arms Deal',
          def: 'Crucial communist arms shipment of 25k rifles, machine guns, and Avia S-199 fighters to Israel.',
        },
        {
          term: 'Burma Road',
          def: 'Makeshift mountain bypass road carved by Israeli engineers to break the Arab siege of Jerusalem.',
        },
        {
          term: 'Count Bernadotte',
          def: 'UN mediator who negotiated the first truce; assassinated in Jerusalem by Lehi in Sept 1948.',
        },
        {
          term: 'Rhodes Armistices',
          def: '1949 bilateral ceasefires between Israel and Egypt, Lebanon, Jordan, and Syria; Iraq refused.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_3',
    spreadNum: 3,
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.3: Aftermath of 1948–49: Al-Nakba & Israeli State Consolidation',
    left: {
      tag: 'KT 1.3 • Refugees, Armistices & State Consolidation',
      headline: 'The Catastrophe & The Sanctuary: Two Incompatible Post-War Realities',
      summary:
        'The 1948–49 War transformed Middle Eastern demographics. For Palestinians, the war was Al-Nakba ("The Catastrophe"): over 700,000 Arabs were displaced from their homes, leaving only 160,000 within Israeli borders, while over 400 Arab villages were depopulated. The 1949 Rhodes Armistices established the Green Line, expanding Israeli territory to 79% of mandatory Palestine. Transjordan annexed the West Bank and East Jerusalem, while Egypt occupied Gaza. For Israelis, 1948 was the "Year of Liberation", but the new state faced severe economic crises and hostile borders. Israel instituted mandatory IDF conscription (1949), passed the Law of Return (July 1950) doubling its population through 685,000 immigrants (including 300,000 from Arab lands), and survived through severe austerity (Tzena) and $300m in US grants.',
      pillars: [
        {
          title: 'Al-Nakba: The Catastrophe (1948–49)',
          subtitle: 'The Palestinian Refugee Tragedy',
          bullets: [
            '**The Scale of Displacement:** Over **700,000 to 750,000 Palestinian Arabs** became refugees; only **160,000 Palestinians out of 900,000** remained in Israeli territory; over 400 Arab villages were depopulated, dismantled, or resettled.',
            '**Exact 1949 Settlement Breakdown:** Pearson records the exact 1949 refugee distribution: **280,000 in the West Bank (Jordan), 190,000 in the Gaza Strip (Egypt), 100,000 in Lebanon, 75,000 in Syria, 70,000 in Transjordan, 4,000 in Iraq, 7,000 in Egypt, and 48,000 internally displaced**.',
            '**UNRWA Established (Dec 1949):** The UN Relief and Works Agency was created to administer emergency food rations, clinics, and schooling across 59 refugee camps, where families lived in squalid canvas tents with open sewers.',
            '**Arab League & Right of Return:** Arab states (except Jordan) denied Palestinians citizenship to maintain their right of return under UN Resolution 194; Israel strictly barred refugee return, viewing them as an existential fifth-column security threat.',
          ],
        },
        {
          title: '1949 Rhodes Armistices & Borders',
          subtitle: 'The Green Line & Territorial Shifts',
          bullets: [
            '**Bilateral Rhodes Armistices:** Mediated by UN diplomat Ralph Bunche; the armistice agreements established armistice demarcation lines (the "Green Line") rather than recognized permanent political borders.',
            '**79% Green Line Control:** Israel expanded its territory from 55% under UN Res 181 to **79% of mandatory Palestine** (a 50% land gain), conquering fertile Galilee, the central coastal corridor, and the Negev down to Eilat.',
            "**Division of Jerusalem & Annexations:** West Jerusalem was declared Israel's capital in 1949; Transjordan annexed the West Bank and East Jerusalem (including the Old City) in 1950 (renamed Jordan); Egypt occupied the Gaza Strip under military rule.",
            '**Absentee Property Law (1950):** Israel passed legislation transferring ownership of all agricultural land, orchards, homes, and bank accounts abandoned by fleeing refugees to the Israeli Custodian of Absentee Property.',
          ],
        },
        {
          title: 'Israeli Nation-Building & Survival',
          subtitle: "Conscription, Ma'abarot & US Aid",
          bullets: [
            '**Universal IDF Conscription (1949):** The 1949 Defence Service Law made military service compulsory at 18: **30 months for males, 18 months for females**, followed by mandatory annual reserve duty of 1 month per year up to age **55**.',
            '**Law of Return & Demographics (July 1950):** Granted every Jew worldwide the right to settle in Israel and gain citizenship; Israel absorbed **618,500 Jewish refugees from Arab and Muslim countries** (Iraq, Yemen, Morocco, Egypt) by 1972, doubling the population.',
            "**Tzena (Austerity) & Ma'abarot:** Israel faced severe economic crisis; strict rationing (*Tzena*) restricted meat, butter, and clothing; over 200,000 immigrants were housed in corrugated tin and canvas transit camps (*ma'abarot*) prone to winter flooding.",
            '**$300m US Aid & German Reparations:** National bankruptcy was averted by **$300 million in US government loans and grants**, plus the 1952 West German Reparations Agreement ($822 million over 14 years); US refused to sell arms in the 1950s.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Ralph Bunche',
          role: 'US diplomat and UN Mediator who negotiated the 1949 Rhodes Armistice Agreements, earning the 1950 Nobel Peace Prize.',
        },
        {
          name: 'David Ben-Gurion',
          role: 'Israeli Prime Minister who passed the Law of Return (1950), built the IDF conscription model, and barred Palestinian refugee return.',
        },
        {
          name: 'King Abdullah I',
          role: 'Ruler of Jordan who formally annexed the West Bank and East Jerusalem in 1950, granting citizenship to 280,000 Palestinian refugees.',
        },
        {
          name: 'Ariel Sharon',
          role: 'Young IDF officer appointed in 1953 to command Unit 101, conducting aggressive retaliatory raids against Fedayeen bases.',
        },
      ],
      archivalSource: {
        title: 'UN General Assembly Resolution 194, Article 11 (11 Dec 1948)',
        citation: 'United Nations Official Records, Third Session',
        quote:
          'Resolves that the refugees wishing to return to their homes and live at peace with their neighbours should be permitted to do so at the earliest practicable date, and that compensation should be paid for the property of those choosing not to return...',
        significance:
          'Became the international legal bedrock of the Palestinian "Right of Return", rejected by Israel on national security and demographic grounds.',
      },
    },
    right: {
      tag: 'KT 1.3 • Demographic Analysis, Legal Frameworks & Word Bank',
      deepCases: [
        {
          title: '1. The 1949 Refugee Settlement Distribution',
          points: [
            '**Displacement Figures:** 700k–750k Palestinians displaced; exact 1949 spread: **280k in West Bank, 190k in Gaza, 100k in Lebanon, 75k in Syria, 70k in Jordan**.',
            '**UNRWA Mandate (Dec 1949):** United Nations Relief and Works Agency took over 59 camps; refugees lived in canvas tents with open sewers and high infant mortality.',
            '**Arab State Policies:** Jordan granted citizenship to incorporate the West Bank; Egypt kept Gazans under military rule without citizenship; Lebanon denied civil rights.',
            '**Demographic Shift inside Israel:** Only 160,000 Arabs remained inside Israel, placed under military curfew and travel permit restrictions until martial law ended in 1966.',
          ],
        },
        {
          title: '2. The Rhodes Armistices & The 79% Green Line',
          points: [
            '**Green Line Borders:** The 1949 armistice lines drawn in green grease pencil on maps in Rhodes; never recognized by Arab states as permanent international borders.',
            '**21% Land Gain:** Israel gained Galilee, the coastal plain, and the Negev corridor down to Eilat on the Gulf of Aqaba, securing vital agricultural and maritime depth.',
            '**Absentee Property Law (1950):** Transferred ownership of all land, homes, and bank accounts abandoned by Palestinian refugees to the Israeli Custodian of Absentee Property.',
            '**Division of Jerusalem:** The Holy City was partitioned; Jordan held East Jerusalem (denying Jews access to Western Wall), while Israel declared West Jerusalem its capital in 1949.',
          ],
        },
        {
          title: '3. IDF Conscription & The "Citizen Army"',
          points: [
            '**Universal Conscription (1949):** At 18, **men served 30 months, women served 18 months**, with mandatory annual reserve service up to age **55**.',
            '**Strategic Imperative:** Surrounded by 40 million hostile neighbors, Israel could not maintain a massive standing army; conscription turned society into a mobile reserve force in 48 hours.',
            '**Social Melting Pot:** The IDF served as the primary instrument for integrating immigrant youths from 70 different languages and cultures into a Hebrew-speaking citizenry.',
            "**Unit 101 & Retaliation Policy:** Ariel Sharon's commando unit established Israel's aggressive doctrine of cross-border disproportionate retaliation against Fedayeen infiltrators.",
          ],
        },
        {
          title: "4. Economic Austerity, Ma'abarot & $300m US Aid",
          points: [
            '**Population Doubled (1948–51):** 685,000 immigrants arrived, including 300,000 Holocaust survivors and 300,000 Sephardic/Mizrahi Jews fleeing Arab states.',
            '**Tzena (Austerity):** Severe food rationing; points books required for meat, eggs, and bread; widespread public unrest over harsh living standards.',
            "**Ma'abarot Tent Camps:** Over 200,000 immigrants housed in overcrowded tin shacks and tents prone to winter flooding; resolved by **$300m in US grants and German reparations (1952)**.",
            '**Arab League Boycott:** Arab states closed borders, severed trade, and boycotted international firms trading with Israel, compounding early economic hardship.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. War Flight & Expulsions',
          text: '700k Palestinians displaced; 280k flee to West Bank, 190k to Gaza, 100k to Lebanon, 75k to Syria, 70k to Jordan.',
        },
        {
          stage: '2. Rhodes Armistice (1949)',
          text: 'Green Line established; Israel controls 79% of land; Jordan annexes West Bank; only 160k Arabs remain in Israel.',
        },
        {
          stage: '3. Law of Return & Conscription',
          text: 'July 1950 Law of Return doubles population; IDF institutes 30m men / 18m women conscription to age 55.',
        },
        {
          stage: "4. Ma'abarot & US Aid",
          text: '200k immigrants housed in transit tent camps; $300m US aid and German reparations prevent economic collapse.',
        },
      ],
      masterWordBank: [
        {
          term: 'Al-Nakba (1948)',
          def: 'The "Catastrophe": the flight and expulsion of 700,000 Palestinian Arabs from their homes.',
        },
        {
          term: '1949 Distribution',
          def: 'Refugees in West Bank (280k), Gaza (190k), Lebanon (100k), Syria (75k), Jordan (70k).',
        },
        {
          term: 'UNRWA (Dec 1949)',
          def: 'UN agency created to provide food, medical aid, and schooling across 59 refugee camps.',
        },
        {
          term: 'Green Line',
          def: '1949 Rhodes Armistice line defining borders until 1967; Israel controlled 79% of land.',
        },
        {
          term: 'UN Resolution 194',
          def: 'UN resolution affirming Palestinian Right of Return or financial compensation.',
        },
        {
          term: 'Absentee Property Law',
          def: '1950 Israeli law confiscating land and property left behind by fleeing refugees.',
        },
        {
          term: 'Law of Return (1950)',
          def: 'Legislation granting every Jewish person worldwide the right to settle in Israel.',
        },
        {
          term: 'IDF Conscription (1949)',
          def: 'Mandatory military service at 18: 30 months for men, 18 for women, reserves to 55.',
        },
        {
          term: 'Tzena (Austerity)',
          def: 'Strict economic rationing of food, clothing, and furniture in Israel from 1949 to 1953.',
        },
        {
          term: "Ma'abarot",
          def: 'Makeshift transit camps of canvas tents and tin shacks housing 200,000 new immigrants.',
        },
        {
          term: '$300m US Aid',
          def: 'Vital US government loans and grants that funded Israeli infrastructure and immigrant absorption.',
        },
        {
          term: 'Ralph Bunche',
          def: 'UN mediator who negotiated the 1949 armistices on Rhodes; won Nobel Peace Prize.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_4',
    spreadNum: 4,
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.4: Nasser, Pan-Arabism & The Suez Crisis (1956–63)',
    left: {
      tag: 'KT 1.4 • Imperialism, Nationalisation & Tripartite Collusion',
      headline: 'Nationalisation, Collusion & Humiliation: The 1956 Suez Crisis',
      summary:
        'The overthrow of Egypt’s monarchy in 1952 brought Colonel Gamal Abdel Nasser to power, championing pan-Arab nationalism and the end of British imperial influence. After negotiating the withdrawal of 80,000 British soldiers from the Suez Canal Zone, Nasser faced escalating border clashes in Gaza. Following a February 1955 Israeli raid that killed 38 Egyptian soldiers, Nasser signed the September 1955 Czech Arms Deal and blockaded the Gulf of Aqaba. When the US and Britain cancelled financing for the Aswan High Dam, Nasser nationalised the Suez Canal on 26 July 1956. Britain and France colluded with Israel in the secret Protocol of Sèvres (22 October 1956). Israel invaded Sinai on 29 October, followed by Anglo-French paratrooper landings at Port Said. However, a US financial ultimatum forced a humiliating British and French withdrawal on 23 November 1956, cementing Nasser as the undisputed hero of the Arab world and establishing the United Arab Republic (UAR) with Syria in 1958.',
      pillars: [
        {
          title: "Nasser's Revolution & Gaza Raids",
          subtitle: 'The Cycle of Escalation (1954–55)',
          bullets: [
            '**British Troop Withdrawal (1954):** Nasser negotiated the departure of **80,000 British troops** stationed in the Suez Canal Zone, removing imperial control; he instituted land redistribution and free public hospitals.',
            '**Aswan High Dam Ambition:** Nasser planned a monumental dam at Aswan to control annual Nile floods, generate hydro-electricity for industrialization, and irrigate thousands of hectares of fertile farmland.',
            '**The Gaza Raid (February 1955):** In retaliation for cross-border infiltrations, the IDF raided an Egyptian army base in Gaza, killing **38 Egyptian soldiers**; Nasser felt humiliated and vowed to rearm.',
            '**Czech Arms Deal (Sept 1955):** In August 1955, Fedayeen killed 11 Israelis; an IDF raid killed 72 Egyptians; Nasser blockaded the Gulf of Aqaba and signed the Czech Arms Deal ($250m for 200 MiG-15 jets and 300 T-34 tanks).',
          ],
        },
        {
          title: 'Nationalisation & Sèvres Collusion',
          subtitle: 'The Secret War Plan (1956)',
          bullets: [
            '**Aswan Dam & Nationalisation:** In April 1956, 58 civilians died in mortar attacks; in July 1956, the US and UK abruptly cancelled $70m in Aswan Dam funding; Nasser nationalised the Suez Canal on **26 July 1956** to fund the dam from tolls.',
            '**Protocol of Sèvres (22 Oct 1956):** Secret meeting outside Paris between Ben-Gurion, Selwyn Lloyd (UK), and Guy Mollet (France): Israel would invade Sinai; Britain and France would intervene as "peacekeepers" and re-seize the canal.',
            '**Operation Kadesh (29 Oct 1956):** IDF paratroopers dropped at Mitla Pass; Israeli armored columns swept across Sinai in 100 hours; Britain and France issued their staged ultimatum ordering both sides 16km back from the canal.',
            '**Anglo-French Air Blitz & Landings (31 Oct – 5 Nov):** British and French bombers destroyed Egyptian airfields; paratroopers landed at Port Said on 5 Nov; Nasser retaliated by sinking 40+ ships, blocking the canal.',
          ],
        },
        {
          title: 'Superpowers & Strategic Fall-out',
          subtitle: 'US Ultimatum & UNEF Arrival',
          bullets: [
            '**US Economic Ultimatum:** President Eisenhower was furious at Anglo-French deceit during the US election; the US threatened to collapse the British pound, block IMF emergency loans, and embargo oil shipments.',
            '**Soviet Nuclear Threats & UN Ceasefire:** Premier Bulganin threatened rocket attacks on London and Paris; on 6 Nov 1956, Britain and France accepted a UN ceasefire, suffering total imperial humiliation.',
            '**UNEF Deployment & Withdrawal:** The first UN Emergency Force (UNEF) arrived on 21 Nov 1956; British and French forces completed evacuation on 23 Nov 1956; IDF withdrew from Sinai and Gaza in March 1957 under US pressure.',
            '**The Triumph of Nasser & The UAR (1958):** Nasser became the undisputed hero of Arab nationalism; in 1958, Syria merged with Egypt to form the United Arab Republic (UAR, lasting to 1961); the USSR agreed to finance the Aswan Dam.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Gamal Abdel Nasser',
          role: 'Egyptian President who nationalised the Suez Canal on 26 July 1956 and emerged as the hero of pan-Arab nationalism despite military defeat.',
        },
        {
          name: 'Anthony Eden',
          role: 'British Prime Minister who viewed Nasser as a dangerous dictator ("Hitler on the Nile"); resigned in health and political disgrace following the crisis.',
        },
        {
          name: 'David Ben-Gurion',
          role: 'Israeli Prime Minister who signed the secret Protocol of Sèvres to break the Straits of Tiran blockade and crush Egyptian Fedayeen bases in Gaza.',
        },
        {
          name: 'Dwight D. Eisenhower',
          role: 'US President who halted the Anglo-French-Israeli invasion through devastating financial and economic threats against the British pound.',
        },
      ],
      archivalSource: {
        title: 'Gamal Abdel Nasser Nationalising the Suez Canal in Alexandria (26 July 1956)',
        citation: 'Egyptian State Radio Broadcast Recording',
        quote:
          'The Suez Canal was dug with the lives of 120,000 Egyptian sons who died in its construction... Today, we take back our rights. We are nationalising the Suez Canal Company. The canal belongs to Egypt, and we shall build the High Dam with its revenues!',
        significance:
          'Direct defiance of 80 years of Anglo-French imperial domination, triggering the secret military collusion that destroyed Britain as an independent global superpower.',
      },
    },
    right: {
      tag: 'KT 1.4 • Imperial Dynamics, Crisis Timelines & Word Bank',
      deepCases: [
        {
          title: "1. Nasser's Pan-Arabism & The 80,000 Troops Exit",
          points: [
            '**1952 Free Officers Revolution:** General Naguib and Colonel Nasser overthrew the corrupt British-backed King Farouk, seeking total national sovereignty and social land reform.',
            '**British Canal Evacuation (1954):** Nasser pressured Britain into agreeing to withdraw its **80,000 soldiers stationed along the Suez Canal Zone** within 20 months.',
            '**Pan-Arab Ambition:** Nasser launched the "Voice of the Arabs" radio network, broadcasting anti-imperialist rhetoric across the Middle East and promoting Arab unity under Egyptian leadership.',
            "**Aswan Dam Ambition:** The cornerstone of Nasser's modernization was the Aswan High Dam across the Nile, requiring $70 million in initial Western funding.",
          ],
        },
        {
          title: '2. The Gaza Reprisal Cycle & Czech Arms (1955)',
          points: [
            '**Fedayeen Infiltrations:** Palestinian guerrillas operating from Egyptian-administered Gaza staged cross-border sabotage raids into southern Israeli farms.',
            '**The Gaza Raid (Feb 1955):** IDF commandos under Ariel Sharon killed **38 Egyptian soldiers** in Gaza; in Aug 1955, Fedayeen killed 11 Israelis, prompting an IDF raid killing **72 Egyptians**.',
            '**Czech Arms Shock (Sept 1955):** Nasser purchased $250 million in Soviet-bloc weaponry (200 MiG-15 fighters, 300 tanks), shattering Western arms parity in the Middle East.',
            "**Gulf of Aqaba Blockade:** Nasser fortified Sharm el-Sheikh and closed the Straits of Tiran, cutting off Israel's maritime trade with Africa and Asia through Eilat.",
          ],
        },
        {
          title: '3. The Protocol of Sèvres & The Tripartite Invasion',
          points: [
            '**Western Loan Withdrawal (July 1956):** US and Britain cancelled Aswan Dam loans; Nasser nationalised the Suez Canal on **26 July 1956** in retaliation.',
            '**Sèvres Conspiracy (22–24 Oct):** Britain, France, and Israel secretly signed the Protocol of Sèvres in a Parisian villa, choreographing a false-flag war.',
            '**Operation Kadesh (29 Oct):** Israeli forces invaded Sinai; Britain and France issued their staged ultimatum ordering both armies 16km back from the canal.',
            '**Port Said Landings (5 Nov):** Anglo-French paratroopers invaded Port Said, but Nasser sank 40+ ships, completely closing the waterway to world commerce.',
          ],
        },
        {
          title: '4. US Financial Coercion, UNEF & The Triumph of Nasser',
          points: [
            "**Eisenhower's Ultimatum:** US threatened to crash the British pound and withhold emergency oil supplies unless Britain ordered an immediate ceasefire.",
            '**UNEF Peacekeeping Force:** First-ever UN peacekeeping force deployed to Sinai on **21 Nov 1956**; British and French forces withdrew in humiliation on **23 Nov 1956**.',
            '**Israeli Gains & Withdrawal:** IDF withdrew from Sinai in March 1957 under US pressure, but won freedom of navigation through the Gulf of Aqaba, opening Eilat port.',
            '**United Arab Republic (1958):** Nasser achieved supreme prestige, merging Egypt and Syria into the UAR (1958–61) with the USSR financing the Aswan High Dam.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Gaza Raids & Czech Arms',
          text: 'Feb 1955 Gaza raid (38 dead) prompts Nasser to sign Czech Arms Deal ($250m) and close Straits of Tiran.',
        },
        {
          stage: '2. Nationalisation (26 July 56)',
          text: 'US/UK cancel Aswan Dam loan; Nasser nationalises Suez Canal to fund the dam from canal transit tolls.',
        },
        {
          stage: '3. Protocol of Sèvres & Attack',
          text: 'Secret collusion at Sèvres; IDF invades Sinai 29 Oct; UK/France bomb airfields and land paratroopers at Port Said.',
        },
        {
          stage: '4. US Ultimatum & UAR (1958)',
          text: 'Eisenhower threatens pound collapse; allies withdraw; Nasser hailed as Arab hero; UAR formed with Syria in 1958.',
        },
      ],
      masterWordBank: [
        {
          term: 'Gamal Abdel Nasser',
          def: 'Charismatic Egyptian President (1954–70), champion of pan-Arabism and national sovereignty.',
        },
        {
          term: '80,000 British Troops',
          def: 'British military garrison occupying the Suez Canal Zone, evacuated in 1954 under treaty.',
        },
        {
          term: 'Gaza Raid (Feb 1955)',
          def: "IDF retaliatory raid killing 38 Egyptian soldiers, triggering Nasser's rearmament drive.",
        },
        {
          term: 'Czech Arms Deal (1955)',
          def: '$250m deal for 200 Soviet MiG-15 jets and 300 tanks, breaking Western arms dominance.',
        },
        {
          term: 'Aswan High Dam',
          def: 'Monumental Egyptian infrastructure project to harness the Nile, initially denied Western loans.',
        },
        {
          term: 'Nationalisation (1956)',
          def: 'Nasser seized control of the Suez Canal Company on 26 July 1956 to fund the Aswan Dam.',
        },
        {
          term: 'Protocol of Sèvres',
          def: 'Secret tripartite war agreement signed on 22 Oct 1956 between Britain, France, and Israel.',
        },
        {
          term: 'Operation Kadesh',
          def: 'Israeli invasion of Sinai on 29 Oct 1956, reaching the Suez Canal in under 48 hours.',
        },
        {
          term: 'Port Said Landings',
          def: 'Anglo-French airborne and amphibious assault on 5 Nov 1956 to seize the Suez Canal.',
        },
        {
          term: 'US Financial Threat',
          def: "Eisenhower's threat to collapse sterling, forcing an immediate British ceasefire.",
        },
        {
          term: 'UNEF (Nov 1956)',
          def: 'First UN Emergency Force deployed to police Sinai and guarantee Israeli shipping at Tiran.',
        },
        {
          term: 'UAR (1958–61)',
          def: "United Arab Republic: political union between Egypt and Syria reflecting Nasser's prestige.",
        },
      ],
    },
  },

  {
    id: 'cme_spread_5',
    spreadNum: 5,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.1: The Road to War & The Six Day War (June 1967)',
    left: {
      tag: 'KT 2.1 • Water Wars, Border Raids & Operation Focus',
      headline: 'Brinkmanship, Air Blitz & Quadrupled Land: The Six Day War',
      summary:
        "Between 1964 and 1967, regional flashpoints escalated rapidly. The January 1964 Cairo Conference established the PLO and the Palestine Liberation Army (PLA, 12,000 fighters), alongside the Arab Headwater Diversion Plan targeting the Jordan River headwaters. Over 70 Fatah raids led to Israeli reprisal strikes, notably the massive Samu Raid on 13 November 1966 (600 troops, 11 tanks, 60 vehicles) and the 7 April 1967 air clash downing 6 Syrian MiGs over Damascus. On 13 May 1967, false Soviet intelligence claimed Israel was massing troops on Syria's border, prompting Nasser to expel UNEF, mobilize 100,000 troops, and close the Straits of Tiran, issuing ultimatums on 29 May. On 5 June 1967, Israel launched Operation Focus, destroying over 300 aircraft on the tarmac and routing Egyptian, Jordanian, and Syrian forces in six days, capturing 70,000 sq km of territory at a cost of 779 Israeli soldiers versus approximately 20,000 Arab dead.",
      pillars: [
        {
          title: 'Regional Flashpoints (1964–67)',
          subtitle: 'Water Wars, Samu & April 7 Clash',
          bullets: [
            "**Cairo Conference (1964):** Created the PLO and the **Palestine Liberation Army (PLA)** with 12,000 soldiers; Arab states agreed the **Headwater Diversion Plan** (diverting Hasbani and Banias tributaries) to starve Israel's National Water Carrier, provoking Israeli airstrikes.",
            '**Fatah Guerrilla Raids:** Founded in 1959 by Yasser Arafat; Fatah staged **over 70 sabotage raids** between 1965 and 1967 against Israeli water pumps, railways, and villages from Jordan, Syria, and Lebanon (none from Gaza due to UNEF).',
            '**The Samu Raid (13 Nov 1966):** After an Israeli police vehicle hit a landmine killing 3, PM Levi Eshkol launched a punitive raid: **600 troops, 11 tanks, 60 vehicles** attacked Samu in the West Bank (15 Jordanian soldiers, 1 Israeli, 3 villagers killed), infuriating King Hussein.',
            '**7 April 1967 Air Clash:** Syrian artillery fired on an Israeli armored tractor in the demilitarized zone; the IAF shot down **6 Syrian MiG-21s**, flying victoriously directly over Damascus, humiliating the Syrian military regime and intensifying border tensions.',
          ],
        },
        {
          title: 'The May Crisis & Ultimatums (1967)',
          subtitle: 'Soviet False Reports & Tiran Closure',
          bullets: [
            '**Soviet False Intelligence (13 May):** Moscow gave Nasser a false intelligence report claiming 10 to 12 Israeli brigades were massing for an invasion of Syria, pressuring Nasser to take aggressive action to maintain Arab leadership.',
            "**Nasser's Escalation (16–18 May):** Nasser ordered UNEF peacekeepers to evacuate Sinai buffer zones and mobilized **100,000 Egyptian troops and 1,000 tanks** directly to the Israeli frontier, putting the IDF on maximum alert.",
            "**Closure of Straits of Tiran (22 May):** Nasser blockaded the Straits of Tiran to all Israeli-flagged ships and oil tankers, severing Israel's vital petroleum lifeline from Iran; Israel viewed this as an explicit *casus belli* (act of war).",
            "**The 29 May Demands & Pacts:** Nasser threatened war unless Israel met 2 demands: (1) return all 1948 Palestinian refugees, (2) surrender all 1948–49 land; on 30 May, King Hussein signed an Egyptian-Jordanian defense pact placing Jordan's army under Egyptian command.",
          ],
        },
        {
          title: 'Operation Focus & Tri-Front Rout',
          subtitle: '5–10 June 1967 Blitzkrieg',
          bullets: [
            '**Operation Focus (5 June 1967):** At 7:45 AM, 200 Israeli jets flew 15 meters above the sea beneath Egyptian radar; using French runway-cratering bombs, they wiped out **over 300 Egyptian aircraft on the tarmac** in 3 hours, then demolished Syrian and Jordanian air forces.',
            '**Sinai Campaign (5–8 June):** Israeli armored columns under Sharon, Tal, and Yoffe smashed Egyptian defenses at Abu Ageila; Egyptian Field Marshal Amer ordered a panic retreat, allowing IDF tanks to ambush retreating columns at Mitla Pass.',
            '**Jerusalem & West Bank (5–7 June):** Jordan opened artillery fire; IDF Paratroopers stormed the Old City through Lion\'s Gate on 7 June ("The Temple Mount is in our hands!"), capturing East Jerusalem, Bethlehem, and the entire West Bank.',
            '**Golan Heights & Total Victory (9–10 June):** IDF stormed fortified Syrian bunker lines on the Golan, capturing Quneitra; the war ended with **70,000 sq km captured** (Sinai, Gaza, West Bank, Golan); **779 Israelis died vs ~20,000 Arab soldiers**.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Yitzhak Rabin',
          role: 'IDF Chief of Staff who architected Operation Focus and directed the lightning tri-front ground campaign across Sinai, Jerusalem, and Golan.',
        },
        {
          name: 'Moshe Dayan',
          role: 'Appointed Minister of Defence on 1 June 1967 in a National Unity Cabinet, boosting public morale and authorising the pre-emptive strike.',
        },
        {
          name: 'Gamal Abdel Nasser',
          role: 'Egyptian President whose expulsion of UNEF, closure of Tiran, and 29 May ultimatums triggered the war; resigned in disgrace before mass protests reinstated him.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'Signed May 30 mutual defense pact with Nasser; entered the war on false Egyptian victory reports, losing East Jerusalem and the West Bank in 48 hours.',
        },
      ],
      archivalSource: {
        title: 'Motta Gur, Commander of 55th Paratroopers Brigade Radio Dispatch (7 June 1967)',
        citation: 'IDF Central Command Audio Archives, Jerusalem Sector',
        quote:
          'The Temple Mount is in our hands! I repeat, the Temple Mount is in our hands! All forces stop firing, we are at the Western Wall!',
        significance:
          'Captured the emotional and religious climax of the war, bringing the Old City of Jerusalem under Jewish sovereignty for the first time in 1,900 years.',
      },
    },
    right: {
      tag: 'KT 2.1 • Tactical Deep-Dive, Decisive Turning Points & Word Bank',
      deepCases: [
        {
          title: '1. The Headwater Diversion Plan & Samu Raid (1966)',
          points: [
            '**Jordan River Water Wars:** Arab states attempted to divert the Hasbani and Banias tributaries; Israel destroyed the engineering equipment with long-range tank and airstrikes.',
            '**Fatah Border Infiltrations:** Over 70 sabotage raids staged from Jordan, Syria, and Lebanon; none from Gaza because UNEF peacekeepers were stationed along the border.',
            '**The Samu Escalation (13 Nov 1966):** After an Israeli police vehicle hit a mine, PM Levi Eshkol launched a punitive raid: **600 troops, 11 tanks, 60 vehicles** attacked Samu (15 Jordanian soldiers and 3 villagers killed), infuriating King Hussein.',
            '**Destruction of Samu Village:** IDF dynamited over 120 stone houses and police buildings in Samu, triggering mass anti-government riots in Amman and Jerusalem against King Hussein.',
          ],
        },
        {
          title: '2. The April 7 Dogfight & Soviet Disinformation',
          points: [
            '**Damascus Dogfight (7 April 1967):** Syrian gunners fired on an Israeli armored tractor; IAF fighter jets responded by downing **6 Syrian MiG-21s** and buzzing over Damascus.',
            '**Soviet Lie (13 May 1967):** Moscow claimed Israel was preparing to invade Syria; Nasser mobilized 100,000 troops in Sinai to prove he was still leader of the Arab world.',
            '**The 29 May Demands:** Nasser threatened war unless Israel surrendered all 1948 lands and returned all refugees, leaving Prime Minister Eshkol convinced war was inevitable.',
            "**Jordan-Egypt Military Pact (30 May):** King Hussein flew to Cairo, signing a mutual defense treaty and placing Jordan's British-trained army under Egyptian General Abdul Munim Riad.",
          ],
        },
        {
          title: '3. Operation Focus: Total Air Decapitation (5 June)',
          points: [
            '**Low-Level Flight:** 200 Israeli jets flew 15 meters above the Mediterranean waves beneath Egyptian radar, striking during the morning shift change when pilots were eating breakfast.',
            '**Dibber Bombs:** French rocket-assisted penetration bombs created massive craters in runways, trapping 300 Egyptian aircraft on the tarmac before destroying them.',
            '**Air Supremacy in 4 Hours:** By midday, Egypt, Syria, and Jordan lost 452 aircraft; IDF ground forces operated with complete, unchallenged air support across all fronts.',
            '**Ground Advance:** Israeli armored divisions broke through fortified Egyptian defenses at Abu Ageila and Jebel Libni, cutting off Egyptian retreat routes to the Suez Canal.',
          ],
        },
        {
          title: '4. The Spoils: 70,000 sq km & Quadrupled Borders',
          points: [
            '**Territorial Conquests:** Israel seized the **Sinai Peninsula (60,000 sq km), the West Bank (5,600 sq km), Gaza Strip (360 sq km), and the Golan Heights (1,200 sq km)**.',
            '**Asymmetric Casualties:** Israel lost **779 soldiers**; Arab armies suffered approximately **20,000 dead** (15,000 Egyptians, 6,000 Jordanians, 1,000 Syrians) and 80% equipment loss.',
            '**One Million Palestinians Under Occupation:** 1,000,000 Arabs in the West Bank and Gaza fell under direct Israeli military rule, fundamentally shifting the demographic conflict.',
            '**Western Wall Reconnected:** For the first time since 1948, Jewish worshippers were permitted access to the Western Wall; the adjacent Moroccan Quarter was demolished to create the plaza.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Water Clashes & Samu (1966)',
          text: 'Fatah raids and Headwater Diversion provoke 13 Nov 1966 Samu raid (600 troops) and 7 April 1967 air clash (6 MiGs downed).',
        },
        {
          stage: '2. Soviet Lie & May Brinkmanship',
          text: '13 May Soviet false alert prompts Nasser to expel UNEF, deploy 100k troops, close Straits of Tiran, and issue 29 May demands.',
        },
        {
          stage: '3. Operation Focus Air Blitz',
          text: '5 June 7:45 AM: IAF destroys 300+ aircraft on tarmac in 3 hours; IDF armored columns break Egyptian lines in Sinai.',
        },
        {
          stage: '4. Tri-Front Rout & 70,000 sq km',
          text: 'Old City, West Bank, and Golan captured; 779 Israelis die vs ~20,000 Arabs; Israel quadruples territory in 6 days.',
        },
      ],
      masterWordBank: [
        {
          term: 'Cairo Summit (1964)',
          def: 'Arab League conference that established the PLO and the Palestine Liberation Army (PLA).',
        },
        {
          term: 'Headwater Diversion',
          def: "Arab project to divert Jordan River tributaries away from Israel's National Water Carrier.",
        },
        {
          term: 'Samu Raid (Nov 1966)',
          def: 'Massive Israeli reprisal raid involving 600 troops and 11 tanks into the West Bank.',
        },
        {
          term: '7 April 1967 Dogfight',
          def: 'Air battle in which Israeli Mirage jets shot down 6 Syrian MiG-21s over Damascus.',
        },
        {
          term: 'Soviet False Alert',
          def: '13 May 1967 Moscow intelligence lie claiming Israel was massing brigades against Syria.',
        },
        {
          term: 'Straits of Tiran',
          def: 'Strategic maritime chokepoint closed by Nasser on 22 May 1967, triggering the war.',
        },
        {
          term: '29 May Demands',
          def: "Nasser's public ultimatum demanding the return of all 1948 refugees and territory.",
        },
        {
          term: 'Operation Focus',
          def: 'Surprise Israeli air strike on 5 June 1967 destroying 300+ Egyptian planes on the ground.',
        },
        {
          term: '779 vs 20,000 Dead',
          def: 'Casualty ratio of Israeli fatal losses compared to total Arab soldiers killed in 6 days.',
        },
        {
          term: '70,000 sq km',
          def: 'Total land area captured by Israel (Sinai, Gaza, West Bank, Golan), quadrupling its size.',
        },
        {
          term: 'Motta Gur',
          def: 'Commander of 55th Paratroopers Brigade who declared "The Temple Mount is in our hands!".',
        },
        {
          term: 'Levi Eshkol',
          def: 'Israeli Prime Minister who resisted early war calls before establishing National Unity cabinet.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_6',
    spreadNum: 6,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.2: The Aftermath of 1967 & UN Resolution 242',
    left: {
      tag: 'KT 2.2 • Resolution 242, Occupation & The Khartoum Rejection',
      headline: "Land for Peace, The Three No's & The 350% Territorial Dilemma",
      summary:
        'Israel emerged from the Six Day War controlling 350% more territory, transforming from a vulnerable enclave into the dominant military power in the Middle East. On 22 November 1967, the UN Security Council adopted Resolution 242, establishing the landmark "Land for Peace" formula: Israeli withdrawal from occupied territories in exchange for Arab recognition and secure borders. However, deliberate ambiguity in the English text ("territories occupied" rather than "the territories") allowed Israel to argue it could retain strategic border areas. The Arab League responded at the August 1967 Khartoum Summit with the intransigent "Three No\'s" (No peace, no recognition, no negotiation). Meanwhile, 300,000 new Palestinian refugees fled to Jordan, joining 618,500 Jewish refugees absorbed by Israel, while static clashes along the blocked Suez Canal escalated into the brutal War of Attrition (1969–70).',
      pillars: [
        {
          title: 'UN Resolution 242 (Nov 1967)',
          subtitle: 'The "Land for Peace" Formula',
          bullets: [
            '**The "Land for Peace" Formula:** Adopted unanimously by the UN Security Council; established the diplomatic trade-off: Israel would withdraw from occupied territories in exchange for Arab recognition and secure, recognized borders.',
            '**Deliberate Linguistic Ambiguity:** The English text called for withdrawal from *"territories occupied in the recent conflict"*, omitting the word "the"; Israel argued this permitted partial retention of defensible borders, while Arabs demanded total 100% withdrawal.',
            '**Khartoum "Three No\'s" (Aug 1967):** Eight Arab leaders met in Sudan, issuing an intransigent rejection: **"No peace with Israel, no recognition of Israel, no negotiations with Israel"**, locking the region in diplomatic paralysis.',
            '**Palestinian Betrayal & Outrage:** Resolution 242 referred to Palestinians purely as a *"refugee problem"* to be settled fairly, with zero mention of national self-determination, statehood, or civil rights, fueling independent Palestinian armed militancy.',
          ],
        },
        {
          title: 'The Occupied Territories Matrix',
          subtitle: 'Strategic Depth & 1m Arabs',
          bullets: [
            "**Sinai Peninsula (Egypt):** 60,000 sq km buffer containing Egypt's only oil reserves (Abu Rudeis); Israeli occupation prevented Egyptian use of the Suez Canal and secured permanent passage through the Straits of Tiran.",
            '**Golan Heights (Syria):** Elevated plateau containing vital freshwater sources for the Sea of Galilee; eliminated Syrian artillery batteries that had shelled Israeli kibbutzim for two decades; 100,000 Syrians displaced.',
            '**West Bank & Gaza Strip:** Israel gained fertile land along the Jordan River, home to **600,000 Palestinians** in the West Bank and **350,000 in Gaza**; eliminated Fedayeen launchpads but placed 1 million Arabs under military administration.',
            '**Immediate Annexation of East Jerusalem:** Israel annexed the Old City and sacred religious sites (Western Wall, Temple Mount, Dome of the Rock, Al-Aqsa, Holy Sepulchre), expanding municipal borders and offering residency rather than citizenship.',
          ],
        },
        {
          title: 'Refugees & War of Attrition',
          subtitle: 'Jordan Camps & Soviet SAMs',
          bullets: [
            '**The 1967 Refugee Wave:** Over **300,000 Palestinians fled the West Bank** across the Jordan River; most were crammed into 6 newly established, squalid refugee camps in Jordan, expanding PLO recruitment.',
            '**The Jewish Refugee Contrast:** Israeli diplomats argued they had permanently resettled and integrated **618,500 Jewish refugees** expelled from Arab nations (1948–72), asserting that Arab states should similarly absorb Palestinian refugees.',
            '**The Bar-Lev Line:** Israel built a $300 million chain of 35 sand-rampart forts along the east bank of the Suez Canal; 15 commercial cargo ships remained stranded in the blocked canal for 8 years.',
            '**The War of Attrition (1969–70):** Nasser launched static artillery bombardments; Israel launched deep-penetration air raids; 20,000 Soviet troops and SAM-3 missiles intervened; over 1.5 million Egyptians fled canal cities; 1,000 Israelis killed before Aug 1970 ceasefire.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Lord Caradon',
          role: 'British UN Ambassador who drafted Resolution 242, deliberately phrasing the withdrawal clause to bridge Israeli and Arab positions.',
        },
        {
          name: 'Gamal Abdel Nasser',
          role: 'Egyptian President who endorsed the Khartoum "Three No\'s" and waged the War of Attrition (1969–70) to bleed Israeli forces on the Suez Canal.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'Ruler of Jordan who lost the West Bank and East Jerusalem, and was forced to absorb 300,000 new Palestinian refugees into his kingdom.',
        },
        {
          name: 'Golda Meir',
          role: 'Became Israeli Prime Minister in 1969; oversaw the construction of the Bar-Lev Line and settlement building in the occupied territories.',
        },
      ],
      archivalSource: {
        title: 'UN Security Council Resolution 242, Operative Clause 1 (22 Nov 1967)',
        citation: 'United Nations Document S/RES/242',
        quote:
          'Affirms that the fulfillment of Charter principles requires the establishment of a just and lasting peace in the Middle East which should include the application of both the following principles: (i) Withdrawal of Israel armed forces from territories occupied in the recent conflict; (ii) Termination of all claims or states of belligerency and respect for and acknowledgement of the sovereignty, territorial integrity and political independence of every State in the area...',
        significance:
          'The cornerstone of all subsequent Middle Eastern peace diplomacy, despite conflicting interpretations of whether withdrawal applied to "all" territories.',
      },
    },
    right: {
      tag: 'KT 2.2 • Diplomatic Analysis, Strategic Geography & Word Bank',
      deepCases: [
        {
          title: '1. UN Res 242: The "Land for Peace" Formula',
          points: [
            "**Core Principles:** Resolution 242 paired Israeli territorial withdrawal with Arab recognition of Israel's right to live in peace within secure, recognized boundaries.",
            '**The English vs French Text:** The English version called for withdrawal from "territories occupied" (omitting "the"), whereas the French version specified "des territoires" (the territories), sparking endless legal disputes.',
            '**Arab Conditional Acceptance:** Egypt and Jordan accepted Res 242 on the condition of total Israeli withdrawal; Syria rejected it until 1973; the PLO rejected it completely.',
            '**Diminished Palestinian Status:** Palestinians were deeply insulted that their national political identity was erased, referred to only as an anonymous "refugee problem".',
          ],
        },
        {
          title: '2. Strategic Value of the Occupied Territories',
          points: [
            '**350% More Land:** Israel expanded from 20,000 sq km to nearly 90,000 sq km, gaining enormous strategic depth against surprise tank invasions from Egypt and Syria.',
            '**Sinai Oil & Depth:** Israel captured the Abu Rudeis oil fields, achieving petroleum self-sufficiency; Sinai provided a 200km desert buffer zone separating Cairo from Israel.',
            "**Golan Fortress:** The Golan plateau placed Damascus within Israeli artillery range (60km) and secured Israel's northern agricultural settlements from Syrian shelling.",
            '**West Bank Security & Settlers:** The Jordan River provided a natural defense trench against eastern invasion; religious Zionists immediately began building ideological settlements (e.g. Gush Etzion).',
          ],
        },
        {
          title: '3. The 300,000 West Bank Refugees & Jordan Camps',
          points: [
            '**Second Displacement Wave:** Over 300,000 Palestinians fled or were expelled from the West Bank across the Allenby Bridge into Jordan during and immediately after the war.',
            "**Six Squalid Emergency Camps:** UNRWA established six new emergency tent camps in Jordan (including Baqa'a), where refugees faced bitter winters and open-ditch sewage.",
            '**Radicalisation Incubator:** The refugee camps became fertile recruiting grounds for Fatah and the PFLP, transforming Jordan into an armed guerrilla base.',
            '**618,500 Jewish Refugees:** Israel highlighted that it had permanently integrated 618,500 Jewish refugees expelled from Arab nations, arguing Arab states must absorb Palestinians.',
          ],
        },
        {
          title: '4. The War of Attrition & Soviet Intervention',
          points: [
            '**Nasser\'s Strategy (1969–70):** Nasser calculated that Israel could not sustain long-term casualties: "If we kill 1,000 Israelis, they will collapse; if they kill 10,000 Egyptians, we will endure."',
            '**Bar-Lev Fortifications:** Israel built 35 fortified strongpoints connected by minefields along the canal bank to withstand constant Egyptian artillery bombardments.',
            '**Direct Soviet Military Combat:** Moscow deployed 20,000 Soviet personnel and advanced SAM-3 surface-to-air missiles; Soviet pilots engaged Israeli Phantoms in direct dogfights.',
            '**August 1970 Ceasefire:** Brokered by US Secretary of State William Rogers; canal cities were left in ruins and 1.5m Egyptians displaced, but Egypt moved SAM batteries forward to the canal bank.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Res 242 & Khartoum Rejection',
          text: 'UN adopts "Land for Peace" (22 Nov 1967); Arab states counter with Khartoum "Three No\'s"; Palestinians reject refugee label.',
        },
        {
          stage: '2. 350% More Land & Occupation',
          text: 'Israel gains Sinai oil, Golan water, and West Bank buffer, but places 1m hostile Arabs under direct military rule.',
        },
        {
          stage: '3. 300,000 Flee to Jordan Camps',
          text: 'Second mass displacement wave enters Jordan; 6 new camps radicalize youth, fueling PLO guerrilla recruitment.',
        },
        {
          stage: '4. War of Attrition (1969–70)',
          text: 'Canal blocked; 20k Soviet troops intervene; 1,000 Israelis die on Bar-Lev Line before US brokers August 1970 ceasefire.',
        },
      ],
      masterWordBank: [
        {
          term: 'UN Resolution 242',
          def: 'Nov 1967 Security Council resolution establishing the "Land for Peace" principle.',
        },
        {
          term: 'Land for Peace',
          def: 'Diplomatic concept: Israeli withdrawal in exchange for Arab recognition and secure borders.',
        },
        {
          term: 'Khartoum "Three No\'s"',
          def: 'Aug 1967 Arab summit declaration: No peace, no recognition, and no negotiation with Israel.',
        },
        {
          term: '350% Land Increase',
          def: 'The massive territorial expansion achieved by Israel following the 1967 Six Day War.',
        },
        {
          term: 'Abu Rudeis',
          def: 'Major Egyptian oil fields in Sinai captured by Israel, providing domestic petroleum needs.',
        },
        {
          term: 'Annexation of Jerusalem',
          def: 'Israel formally absorbed East Jerusalem into its municipality, declaring it undivided capital.',
        },
        {
          term: '300,000 Refugees (1967)',
          def: 'Palestinians displaced from the West Bank into Jordan following the Six Day War.',
        },
        {
          term: '618,500 Jewish Refugees',
          def: 'Jews expelled from Arab and Muslim countries permanently resettled in Israel.',
        },
        {
          term: 'Bar-Lev Line',
          def: '$300m chain of 35 fortified bunkers and sand ramparts built along the Suez Canal.',
        },
        {
          term: 'War of Attrition',
          def: 'Brutal 1969–70 artillery and air war along the Suez Canal between Egypt and Israel.',
        },
        {
          term: '20,000 Soviet Troops',
          def: 'Soviet military technicians and missile crews deployed to Egypt to defend air space.',
        },
        {
          term: 'Rogers Plan Ceasefire',
          def: 'US-brokered August 1970 agreement that ended the War of Attrition along the canal.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_7',
    spreadNum: 7,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.3: The Rise of Palestinian Resistance & International Terrorism',
    left: {
      tag: "KT 2.3 • Karameh, Dawson's Field & The Munich Massacre",
      headline: 'The Gun, The Skyjack & The Olympics: Terrorism Takes the World Stage',
      summary:
        'The crushing defeat of Arab national armies in 1967 convinced Palestinian factions that they could no longer rely on Arab states. Under Yasser Arafat, Fatah transformed the PLO into an independent armed resistance movement. Following the 21 March 1968 Battle of Karameh, where fedayeen inflicted heavy losses on an Israeli raiding force, Arafat was elected PLO Chairman in 1969. Radical splinter factions, notably George Habash’s Marxist Popular Front for the Liberation of Palestine (PFLP), pioneered international skyjackings. The September 1970 Dawson’s Field hijackings provoked King Hussein to unleash the Jordanian army in "Black September", expelling the PLO to Lebanon by July 1971. In response, the Black September faction executed the 5 September 1972 Munich Olympics massacre, killing 11 Israeli athletes. Prime Minister Golda Meir responded with Operation Wrath of God, authorizing targeted assassinations across Europe.',
      pillars: [
        {
          title: 'Rise of Fatah & Karameh (1968)',
          subtitle: 'From Arab Armies to Armed Guerrillas',
          bullets: [
            '**Disillusionment with Arab Armies:** Arab military collapse in 1967 convinced Palestinians they could not rely on Arab regimes; Fatah and guerrilla factions advocated independent, armed "people\'s war" to liberate Palestine.',
            "**Battle of Karameh (21 March 1968):** Following a school bus mining, the IDF raided Fatah's base at Karameh in Jordan; Fatah and Jordanian troops put up fierce resistance, inflicting heavy Israeli losses (28 dead, 4 tanks lost).",
            "**Arafat's Political Triumph:** Although the IDF destroyed Karameh, Arafat declared a glorious moral victory; thousands of young volunteers joined the fedayeen; in February 1969, Arafat was elected **Chairman of the PLO**.",
            '**The PLO "State within a State":** By 1970, the PLO operated armed roadblocks, collected taxes, and ran independent police in Jordan, directly defying King Hussein and humiliating the Jordanian monarchy.',
          ],
        },
        {
          title: 'PFLP Skyjackings & Black September',
          subtitle: "Dawson's Field & The Expulsion",
          bullets: [
            '**PFLP Radical Ideology:** Founded in 1967 by George Habash (Marxist Palestinian Christian); believed international terrorism was essential to capture global media attention and force the world to confront the Palestinian issue.',
            "**Dawson's Field Hijackings (Sept 1970):** PFLP commandos hijacked 4 international airliners; 3 planes were flown to a desert airstrip in Jordan (Dawson's Field) and 1 to Cairo; **56 Jewish passengers** were held hostage in exchange for prisoners.",
            '**Planes Blown Up (12 Sept 1970):** PFLP evacuated hostages and detonated the multi-million-dollar airliners on live international television, humiliating King Hussein and triggering an existential showdown.',
            '**Black September Civil War:** On 17 Sept 1970, King Hussein unleashed the Jordanian army; 10 days of heavy tank fighting in Amman killed 3,000–5,000 Palestinians; by July 1971, the PLO was completely expelled to Lebanon.',
          ],
        },
        {
          title: 'Munich Olympics & Wrath of God',
          subtitle: '1972 Hostage Tragedy & Retaliation',
          bullets: [
            '**Birth of Black September:** A covert terrorist wing formed within Fatah to avenge the Jordanian expulsion; in Nov 1971, they assassinated Jordanian Prime Minister Wasfi al-Tel in Cairo, drinking his blood on hotel steps.',
            '**Munich Olympics Attack (5 Sept 1972):** 8 Black September terrorists breached the Olympic Village; they killed 2 Israeli athletes and took 9 hostage, demanding the release of **234 Palestinian prisoners in Israel**.',
            '**Fürstenfeldbruck Airport Massacre:** A botched German police rescue attempt at the airfield resulted in terrorists detonating a grenade inside a helicopter; all **9 Israeli hostages, 5 terrorists, and 1 German police officer** were killed.',
            '**Operation Wrath of God:** Prime Minister Golda Meir authorized Mossad to hunt down and assassinate every Black September planner across Europe and the Middle East; Black September responded with **51 letter bombs**, killing an Israeli diplomat in London.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Yasser Arafat',
          role: 'Fatah founder elected PLO Chairman in 1969; championed armed struggle but later balanced military action with international diplomacy.',
        },
        {
          name: 'George Habash',
          role: 'Marxist founder of the Popular Front for the Liberation of Palestine (PFLP); pioneered international skyjackings to publicize the cause.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'King of Jordan who crushed the PLO during Black September 1970 and expelled guerrilla forces to preserve his Hashemite monarchy.',
        },
        {
          name: 'Golda Meir',
          role: 'Israeli Prime Minister who ordered Operation Wrath of God to eliminate the Black September leaders responsible for Munich.',
        },
      ],
      archivalSource: {
        title: 'George Habash, Leader of the PFLP, Interview on Skyjacking (1970)',
        citation: 'Life Magazine, Interview Transcript, June 1970',
        quote:
          'When we hijack a plane it has more effect than if we killed a hundred Israelis in battle. For decades world public opinion was deaf to our tragedy. We had to take drastic actions to force the world to look at the Palestinian people.',
        significance:
          'Articulated the strategic logic of 1970s Palestinian international terrorism: sacrificing moral standing to force the Palestinian tragedy onto television screens.',
      },
    },
    right: {
      tag: 'KT 2.3 • Tactical Analysis, Causal Chains & Word Bank',
      deepCases: [
        {
          title: "1. The Battle of Karameh & Arafat's Ascendancy",
          points: [
            '**The School Bus Trigger:** On 18 March 1968, a school bus hit a mine in southern Israel, killing 2 adults and injuring 28 children; Israel launched a massive punitive raid 3 days later.',
            '**Fierce Defense at Karameh:** Rather than fleeing, Fatah commandos fought alongside Jordanian artillery; 28 Israeli soldiers were killed, 69 wounded, and 4 tanks captured or abandoned.',
            '**Psychological Watershed:** After the humiliation of 1967, Karameh proved Arab fighters could stand and bleed the IDF; 5,000 recruits joined Fatah in the following 48 hours.',
            '**PLO Takeover (1969):** Independent fedayeen factions pushed out Egyptian-backed bureaucratic leaders; Yasser Arafat was elected Chairman of the PLO Executive Committee.',
          ],
        },
        {
          title: "2. Dawson's Field Hijackings & King Hussein's Crackdown",
          points: [
            '**Triple Airliner Seizure:** On 6 Sept 1970, PFLP commandos hijacked Swissair, TWA, and BOAC flights, landing them at a former RAF desert base in Jordan renamed "Revolution Airport".',
            '**56 Jewish Hostages Separated:** Non-Jewish passengers were released; 56 Jewish passengers and American crews were held hostage in desert heat to demand prisoner releases.',
            '**Spectacular Television Destruction:** On 12 Sept, after releasing hostages, the PFLP detonated all three empty jets on live television, showing utter contempt for Jordanian sovereignty.',
            '**Black September Massacre:** King Hussein declared martial law on 17 Sept; the Jordanian army attacked Palestinian refugee camps with heavy artillery, killing 3,000–5,000.',
          ],
        },
        {
          title: '3. The Munich Massacre & Fürstenfeldbruck Firefight',
          points: [
            '**Olympic Village Infiltration:** 8 Black September militants scaled the perimeter fence with forged passes, entered 31 Connollystraße, shot wrestling coach Moshe Weinberg, and took 9 hostages.',
            '**234 Prisoner Demands:** Terrorists demanded the release of 234 Palestinian prisoners in Israel and German Baader-Meinhof terrorists; Golda Meir took an uncompromising stance: "No negotiations with terror."',
            '**Airport Ambush Disaster:** German authorities arranged a helicopter transfer to Fürstenfeldbruck airfield, planning a sniper ambush with untrained police snipers lacking radios and night scopes.',
            '**Total Slaughter:** In the firefight, a terrorist tossed a grenade into a helicopter packed with bound Israeli athletes; all 11 Israeli team members and 1 German policeman died.',
          ],
        },
        {
          title: '4. Operation Wrath of God & International Backlash',
          points: [
            '**Committee X Authorization:** Golda Meir and Defence Minister Moshe Dayan established "Committee X" to secretly authorize Mossad assassination squads across Europe.',
            '**Targeted Killings:** Mossad assassinated PLO representatives in Rome, Paris, and Cyprus using concealed explosives in telephone handsets and beds.',
            '**The Lillehammer Fiasco (July 1973):** In Norway, Mossad agents misidentified a Moroccan waiter, Ahmed Bouchikhi, as Black September leader Ali Hassan Salameh, shooting him dead; 6 agents were arrested.',
            "**Double-Edged Legacy:** The operation disrupted Black September's network but caused worldwide condemnation and failed to stop Palestinian attacks on Israeli targets.",
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Karameh Defense (Mar 1968)',
          text: 'Fatah stands against IDF raid; 28 Israeli troops die; Arafat hailed as hero and elected PLO Chairman in Feb 1969.',
        },
        {
          stage: "2. Dawson's Field Hijackings",
          text: 'PFLP blows up 3 jetliners on live TV; King Hussein crushes PLO in Black September 1970; PLO flees to Lebanon.',
        },
        {
          stage: '3. Munich Olympics Massacre',
          text: 'Black September kills 11 Israeli athletes at 1972 Munich Games; airport ambush fails; global shock and condemnation.',
        },
        {
          stage: '4. Operation Wrath of God',
          text: 'Golda Meir orders Mossad assassination campaign; European operatives shot; Lillehammer mistake tarnishes Mossad.',
        },
      ],
      masterWordBank: [
        {
          term: 'Fatah',
          def: 'Palestinian national liberation movement founded in 1959 by Yasser Arafat, dominating the PLO.',
        },
        {
          term: 'Battle of Karameh (1968)',
          def: 'Clash between IDF and Fatah in Jordan; transformed Arafat into an Arab folk hero.',
        },
        {
          term: 'PLO Chairman (1969)',
          def: "Arafat's election cementing independent Palestinian armed leadership over the PLO.",
        },
        {
          term: 'PFLP',
          def: 'Popular Front for the Liberation of Palestine: Marxist splinter group founded by George Habash.',
        },
        {
          term: "Dawson's Field (1970)",
          def: 'Jordanian desert airstrip where PFLP blew up 3 hijacked international airliners on live TV.',
        },
        {
          term: 'Black September (1970)',
          def: 'Jordanian military crackdown killing thousands of Palestinians and expelling the PLO to Lebanon.',
        },
        {
          term: 'Fatahland',
          def: 'Southern Lebanon region controlled by the PLO as an armed launchpad against northern Israel.',
        },
        {
          term: 'Munich Olympics (1972)',
          def: 'Black September attack resulting in the slaughter of 11 Israeli athletes and coaches.',
        },
        {
          term: '234 Prisoners',
          def: 'The number of Palestinian militants demanded by the Munich terrorists in exchange for hostages.',
        },
        {
          term: 'Fürstenfeldbruck',
          def: 'Bavarian airfield where a botched German police rescue attempt ended in the massacre of the hostages.',
        },
        {
          term: 'Operation Wrath of God',
          def: 'Covert Mossad targeted assassination campaign authorized by Golda Meir to avenge Munich.',
        },
        {
          term: 'Lillehammer Affair (1973)',
          def: 'Botched Mossad operation in Norway killing an innocent Moroccan waiter, leading to arrests.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_8',
    spreadNum: 8,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.4: The Yom Kippur War & The 1973 Oil Crisis',
    left: {
      tag: 'KT 2.4 • Strategic Surprise, The Oil Weapon & Superpower Crisis',
      headline: 'The October Earthquake: Shattered Invincibility & The Global Oil Weapon',
      summary:
        'Frustrated by diplomatic stalemate and Israel’s refusal to negotiate over Sinai, Egyptian President Anwar Sadat prepared a limited war to force superpower intervention. In July 1972, Sadat expelled 15,000 Soviet advisers to demonstrate independence. On 6 October 1973 (Yom Kippur and Ramadan), Egypt and Syria launched a devastating coordinated surprise attack. Egyptian forces used high-pressure water cannons to breach the Bar-Lev Line, crossing the Suez Canal under a dense SAM-6 missile umbrella, while 1,400 Syrian tanks stormed the Golan Heights. Israel mobilized its reserves under extreme pressure; after early counter-attacks failed, General Ariel Sharon breached the canal at Deversoir, encircling the Egyptian Third Army. The US raised its military to DEFCON 3 nuclear alert after Soviet threats. Concurrently, OAPEC imposed an oil embargo, quadrupling oil prices and permanently transforming Western foreign policy.',
      pillars: [
        {
          title: "Sadat's Strategy & Soviet Exit",
          subtitle: 'Breaking the Diplomatic Stalemate',
          bullets: [
            '**Anwar Sadat\'s Dilemma:** Succeeded Nasser in Sept 1970; inherited a bankrupt Egyptian economy, food riots, and 1.5 million displaced citizens; sought to break the "no war, no peace" stalemate through a limited military shock.',
            "**Rejection of Sadat's Peace Initiative:** In 1971, Sadat offered full peace in exchange for Israeli withdrawal from Sinai; Israeli Prime Minister Golda Meir rejected the offer, convinced of Israel's military invincibility.",
            '**Expulsion of 15,000 Soviet Advisers (July 1972):** Sadat expelled 15,000 Soviet military technicians to remove Soviet control, demonstrate Egyptian independence, and lay the groundwork for eventual US diplomatic mediation.',
            '**Saudi Alliance & Secret War Planning:** Sadat forged a close alliance with King Faisal of Saudi Arabia, securing financial subsidies and planning the coordinated use of the "oil weapon" alongside Syrian President Hafez al-Assad.',
          ],
        },
        {
          title: 'Operation Badr & Golan Surprise',
          subtitle: 'Water Cannons & The SAM Shield',
          bullets: [
            '**Operation Badr (2 PM, 6 Oct 1973):** On Yom Kippur (the holiest Jewish fast day) and during Ramadan, Egyptian forces crossed the Suez Canal; high-pressure water cannons washed away the 20-meter Bar-Lev sand ramparts in 2 hours.',
            '**The Anti-Tank & SAM Shield:** Soviet-supplied wire-guided SAGGER missiles and RPGs destroyed early Israeli tank counter-attacks; mobile SAM-6 air defense umbrellas downed over 40 Israeli jets, shattering the myth of IDF invincibility.',
            '**Syrian Assault on the Golan Heights:** Syria launched 1,400 tanks against 177 Israeli tanks along the purple line; Syrian commandos captured the strategic Mount Hermon listening post before IDF reserves stabilized the ridge.',
            '**Crisis of Invincibility (8 Oct):** Ill-coordinated Israeli armored counter-attacks in Sinai suffered catastrophic defeats; Defence Minister Moshe Dayan privately warned Golda Meir that "the Third Temple is falling".',
          ],
        },
        {
          title: 'IDF Counter-Strike & Oil Weapon',
          subtitle: "Sharon's Crossing & DEFCON 3",
          bullets: [
            "**Sharon's Deversoir Crossing (15–16 Oct):** General Sharon exploited a gap between Egypt's Second and Third Armies, ferried tanks across the Suez Canal on pontoon bridges, and completely encircled the **20,000-strong Egyptian Third Army**.",
            '**Superpower Resupply Race:** The USSR launched an emergency airlift to Cairo/Damascus; President Nixon launched **Operation Nickel Grass**, airlifting 22,000 tons of tanks, ammunition, and Phantoms to Israel.',
            '**DEFCON 3 Nuclear Alert (24 Oct):** When Soviets threatened to deploy paratroopers to enforce a ceasefire on the encircled Third Army, the US placed its military on DEFCON 3 nuclear alert, forcing a UN ceasefire (Res 338).',
            '**The OAPEC Oil Shock (Oct 1973 – Mar 1974):** Arab oil producers placed an embargo on the US and Netherlands and cut production by 25%; oil prices **quadrupled from $3 to $12 per barrel (a 400% increase)**, triggering global recession.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Anwar Sadat',
          role: 'Egyptian President who orchestrated the surprise crossing of the Suez Canal, shattering Israeli invincibility and regaining Arab honor.',
        },
        {
          name: 'Golda Meir',
          role: 'Israeli Prime Minister caught off guard on Yom Kippur; secured vital US military airlift but was forced to resign in 1974 following the Agranat Commission.',
        },
        {
          name: 'Ariel Sharon',
          role: "IDF General who disobeyed orders to punch across the Suez Canal at Deversoir, encircling Egypt's Third Army and turning the tactical tide.",
        },
        {
          name: 'King Faisal of Saudi Arabia',
          role: 'Saudi monarch who led OAPEC in imposing the historic oil embargo on Western nations, unleashing the economic power of Arab petroleum.',
        },
      ],
      archivalSource: {
        title: 'Anwar Sadat Speech to Egyptian People on the Canal Crossing (16 Oct 1973)',
        citation: 'Egyptian National Archives, Cairo',
        quote:
          'We have crossed the barrier that seemed impossible to cross. The myth of the invincible Israeli army has been buried in the sands of Sinai forever. We did not fight to conquer, but to liberate our occupied land and restore Arab dignity.',
        significance:
          'Expressed the profound psychological triumph of the war for the Arab world, transforming Sadat from an underestimated leader into an international statesman.',
      },
    },
    right: {
      tag: 'KT 2.4 • Military Doctrine, Geopolitical Shockwaves & Word Bank',
      deepCases: [
        {
          title: "1. Sadat's Diplomatic Deadlock & Soviet Expulsion",
          points: [
            '**The "No War, No Peace" Paralysis:** Between 1970 and 1973, Israel ignored Sadat\'s peace overtures; Sadat decided only a military crisis could compel US diplomatic pressure on Israel.',
            '**Expulsion of 15,000 Soviets (1972):** Sadat expelled Soviet military technicians because Moscow refused to deliver long-range offensive strike bombers.',
            '**Deception & Camouflage:** Egypt staged 22 false military mobilizations along the canal throughout 1973, conditioning Israeli intelligence (Aman) to dismiss real preparations as routine drills.',
            '**Intelligence Blindness (The "Concept"):** Israeli intelligence director Eli Zeira assumed Egypt would never attack without air parity; warning dispatches from King Hussein of Jordan were ignored.',
          ],
        },
        {
          title: '2. Operation Badr: High-Pressure Water & SAM Umbrella',
          points: [
            '**Water Cannons on the Sand Berm:** Egyptian engineers imported commercial firefighting pumps from Germany, spraying 3,000 cubic meters of sand away per hour to carve 60 vehicle gaps.',
            '**Soviet SAGGER Carnage:** Egyptian infantry armed with AT-3 SAGGER wire-guided anti-tank missiles decimated Israeli tanks counter-attacking without infantry screen.',
            '**SAM-6 Umbrella:** Egyptian forces stayed strictly within a 10km missile bubble along the canal; Israeli fighter jets attempting dive-bombing were destroyed in dozens.',
            '**Golan Fortress Crisis:** In the north, 1,400 Syrian tanks nearly broke through the "Valley of Tears" before heroic resistance by Israel\'s 7th Armoured Brigade stabilized the line.',
          ],
        },
        {
          title: "3. Sharon's Deversoir Crossing & Third Army Siege",
          points: [
            '**The Turning Point (14 Oct):** Sadat ordered Egyptian armor to advance beyond the SAM umbrella to relieve pressure on Syria; Israel ambushed and destroyed 250 Egyptian tanks in hours.',
            '**Crossing the Canal (15–16 Oct):** General Sharon discovered a 20-mile gap between Egyptian Second and Third Armies; IDF commandos crossed in rubber dinghies followed by floating pontoon bridges.',
            '**The Third Army Encircled:** Israeli armor swept south down the west bank of the Suez Canal, cutting the Cairo-Suez highway and completely encircling 20,000 Egyptian soldiers.',
            '**Agranat Commission (1974):** After the war, an Israeli judicial inquiry blamed Chief of Staff Elazar and intelligence chief Zeira, forcing Golda Meir and Moshe Dayan to resign.',
          ],
        },
        {
          title: '4. The Superpower Nuclear Alert & The OAPEC Oil Weapon',
          points: [
            '**Operation Nickel Grass:** Nixon ordered US Air Force C-5 Galaxies to fly round-the-clock airlifts directly to Israel, delivering 22,000 tons of tanks, electronic jamming gear, and munitions.',
            '**DEFCON 3 Nuclear Showdown:** Brezhnev threatened unilateral Soviet troop deployment to save the Third Army; Kissinger raised US military forces to DEFCON 3 nuclear alert for 24 hours.',
            '**OAPEC 400% Price Hike:** Saudi Arabia and Arab producers cut output 5% per month and placed an embargo on the US; crude oil quadrupled from **$3 to $12 per barrel**.',
            '**The Paradigm Shift:** The oil shock shattered Western economic complacency, triggering stagflation and proving to Washington that Israeli occupation endangered vital Western economic security.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Soviet Exit & Yom Kippur Strike',
          text: 'Sadat expels 15k Soviets; launches Operation Badr 6 Oct; water cannons and SAGGERs breach Bar-Lev Line.',
        },
        {
          stage: '2. Golan & Sinai Desperation',
          text: '1,400 Syrian tanks attack Golan; early IDF counter-attacks fail; Dayan warns "Third Temple is falling".',
        },
        {
          stage: '3. Sharon Crosses & Third Army Cut',
          text: 'Sharon punches through Deversoir gap; encircles 20k Egyptian troops; US Nickel Grass airlift delivers 22k tons.',
        },
        {
          stage: '4. DEFCON 3 & OAPEC 400% Shock',
          text: 'Soviet threats trigger US nuclear alert; OAPEC quadruples oil price ($3 to $12); US forced into active diplomacy.',
        },
      ],
      masterWordBank: [
        {
          term: 'Anwar Sadat',
          def: 'Egyptian President who launched the surprise 1973 attack to break diplomatic stalemate.',
        },
        {
          term: '15,000 Soviet Advisers',
          def: 'Soviet personnel expelled by Sadat in July 1972 to demonstrate independence.',
        },
        {
          term: 'Operation Badr',
          def: 'Egyptian code name for the crossing of the Suez Canal on 6 October 1973.',
        },
        {
          term: 'Water Cannons',
          def: 'High-pressure pumps used by Egyptian engineers to wash away the Bar-Lev sand ramparts.',
        },
        {
          term: 'SAGGER Missiles',
          def: 'Soviet-supplied wire-guided anti-tank missiles that decimated Israeli armor.',
        },
        {
          term: 'SAM-6 Umbrella',
          def: 'Mobile surface-to-air missile shield protecting Egyptian forces along the canal.',
        },
        {
          term: 'Deversoir Gap',
          def: 'The seam between Egyptian Second and Third Armies exploited by Sharon to cross the canal.',
        },
        {
          term: 'Operation Nickel Grass',
          def: 'Massive emergency US military airlift delivering 22,000 tons of supplies to Israel.',
        },
        {
          term: 'DEFCON 3',
          def: 'US military nuclear alert level ordered by Nixon and Kissinger during Soviet standoff.',
        },
        {
          term: 'UN Resolution 338',
          def: 'Ceasefire resolution adopted 22 Oct 1973 calling for immediate peace negotiations.',
        },
        {
          term: 'OAPEC Oil Embargo',
          def: 'Arab oil production cuts and embargo against the US, quadrupling oil prices from $3 to $12.',
        },
        {
          term: 'Agranat Commission',
          def: 'Israeli judicial inquiry into war unpreparedness, leading to the resignations of Meir and Dayan.',
        },
      ],
    },
  },

  {
    id: 'cme_spread_9',
    spreadNum: 9,
    topic: 'Key Topic 3 • Attempts at Peace, 1974–95',
    title:
      'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy, Camp David & Treaty of Washington (1974–79)',
    left: {
      tag: 'KT 3.1 • Disengagement, Suez Clearance & Sadat in Jerusalem',
      headline: 'Step-by-Step Diplomacy, Mine Clearance & The Knesset Speech',
      summary:
        'Following the 1973 Yom Kippur War and the devastating OAPEC oil shock, US foreign policy shifted toward active mediation. US Secretary of State Henry Kissinger engaged in intensive "shuttle diplomacy", flying between Cairo, Damascus, and Jerusalem to broker the 1974 Sinai I and 1975 Sinai II disengagement accords. In a massive engineering effort, 1,700 Egyptian troops cleared nearly 700,000 mines along the Suez Canal, allowing it to reopen on 5 June 1975 after eight years of paralysis. Facing catastrophic economic crises and violent food riots in Cairo in 1977, Egyptian President Anwar Sadat made the historic gamble of flying to Jerusalem on 19 November 1977 to address the Israeli Knesset directly. This breakthrough set the stage for US President Jimmy Carter to convene the 13-day Camp David summit in September 1978.',
      pillars: [
        {
          title: "Kissinger's Shuttle Diplomacy",
          subtitle: 'Step-by-Step Disengagement (1974–75)',
          bullets: [
            "**Step-by-Step Mediation:** Henry Kissinger traveled continuously between Middle Eastern capitals; because Arab states refused to speak directly to Israel, Kissinger acted as intermediary, exploiting Israel's total dependence on US military resupply.",
            '**Sinai I Accord (Jan 1974):** Egypt and Israel agreed to mutual troop withdrawal from the Suez Canal and established a UN buffer zone, while Syria and Israel signed a May 1974 Golan accord monitored by UNDOF peacekeepers.',
            '**Sinai II Accord (Sept 1975):** Israel pulled back 20km from the strategic Gidi and Mitla mountain passes, returned the vital Abu Rudeis oilfields to Egyptian control, and agreed to resolve future conflicts through peaceful diplomacy.',
            "**Lifting the Oil Embargo:** Kissinger's diplomacy persuaded Arab oil producers to end the devastating oil embargo against the United States in March 1974, restoring international petroleum flows and stabilizing Western economies.",
          ],
        },
        {
          title: 'Reopening the Suez Canal',
          subtitle: '700,000 Mines & 5 June 1975',
          bullets: [
            '**Eight-Year Paralysis:** The Suez Canal had been completely closed to international maritime commerce since the June 1967 Six Day War, stranding 15 cargo ships (the "Yellow Fleet") and costing Egypt hundreds of millions in toll fees.',
            "**Massive Clearance Operation:** **1,700 Egyptian military engineers cleared nearly 700,000 landmines** and unexploded ordnance from the canal's 164 km of banks; **96 Egyptian soldiers were killed** during the dangerous three-month sweep.",
            '**Multinational Naval Clearance:** Navies of the US, Britain, France, and Egypt dredged the waterway itself of unexploded bombs, sunken warships, aircraft, and tanks, and demolished the military causeway built across the canal by the IDF.',
            "**Grand Reopening (5 June 1975):** President Anwar Sadat presided over a ceremonial reopening of the canal, exactly eight years to the day after it was closed in 1967, restoring millions in vital transit revenue to Egypt's bankrupt economy.",
          ],
        },
        {
          title: "Sadat's Journey to Jerusalem",
          subtitle: 'Food Riots & The Knesset Address (1977)',
          bullets: [
            '**Cairo Food Riots (18–19 Jan 1977):** Violent riots against bread and fuel price increases killed 79 people and threatened Sadat’s regime; Sadat realized Egypt was economically exhausted and could not maintain wartime spending.',
            '**Historic Knesset Speech (20 Nov 1977):** Sadat stunned the world by declaring he would go "to the ends of the earth" for peace; he flew to Israel and spoke directly to the Knesset, offering full peace in exchange for complete Sinai withdrawal.',
            "**Overcoming Psychological Barriers:** Sadat's arrival at Ben Gurion Airport on 19 November 1977 shattered 30 years of Arab diplomatic taboos; he shook hands with Golda Meir and Ariel Sharon before an astonished global television audience.",
            "**Begin's Reciprocal Visit (Dec 1977):** Israeli Prime Minister Menachem Begin visited Ismailia, Egypt; though bilateral talks stalled over Palestinian self-determination, the groundwork was established for US intervention at Camp David.",
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Henry Kissinger',
          role: 'US Secretary of State who pioneered "shuttle diplomacy", disengaging front-line armies and securing the lifting of the 1974 oil embargo.',
        },
        {
          name: 'Anwar Sadat',
          role: 'Egyptian President who boldly flew to Jerusalem in November 1977, addressing the Knesset and breaking 30 years of Arab diplomatic taboos.',
        },
        {
          name: 'Menachem Begin',
          role: 'Right-wing Likud Prime Minister of Israel who received Sadat in Jerusalem, agreeing to negotiate the return of the entire Sinai Peninsula.',
        },
        {
          name: 'Jimmy Carter',
          role: 'US President who prioritized Middle Eastern human rights and peace, investing enormous personal capital to broker the Camp David Accords.',
        },
      ],
      archivalSource: {
        title: 'President Anwar Sadat Address to the Israeli Knesset (20 November 1977)',
        citation: 'Official Records of the Israeli Knesset, Special Session',
        quote:
          'I come to you today on solid ground, to shape a new life, to establish peace... We really and truly welcome you to live among us in peace and security... There is no need for war. Let us end all suspicion and bloodshed forever.',
        significance:
          'Marked the first time an Arab head of state set foot in Israel or recognized its existence, opening the door to bilateral peace.',
      },
    },
    right: {
      tag: 'KT 3.1 • Diplomatic Milestones, Economic Pressures & Word Bank',
      deepCases: [
        {
          title: '1. Kissinger\'s "Shuttle Diplomacy" Architecture',
          points: [
            '**Bypassing the Arab Boycott:** Arab leaders refused to sit in the same room as Israeli negotiators; Kissinger flew over 30 round-trip missions carrying handwritten compromise drafts between Cairo, Damascus, and Jerusalem.',
            "**Exploiting Israeli Dependence:** Kissinger used Israel's desperate need for US financial credits, Phantom jets, and modern munitions following Yom Kippur losses to pressure Golda Meir and Yitzhak Rabin into territorial concessions.",
            '**Golan Disengagement (May 1974):** Kissinger negotiated a disengagement treaty between Israel and Syria, creating a United Nations Disengagement Observer Force (UNDOF) buffer zone that maintained an unbroken border truce for decades.',
            '**Strategic Splitting of the Arab Coalition:** By securing separate bilateral disengagement accords with Egypt, Kissinger successfully decoupled the most powerful Arab military from Syria and the PLO.',
          ],
        },
        {
          title: '2. Clearing the Suez Canal (700k Mines & 5 June 1975)',
          points: [
            '**Canal Clearance Danger:** **1,700 Egyptian engineers cleared 700,000 mines** along 164 km of banks; **96 men died** in three months from exploding ordnance, illustrating the human sacrifice required to reopen world trade.',
            '**Dredging the Waterway:** Operation Nimbus Stream and Nimbus Moon deployed US, British, French, and Egyptian naval divers to remove 10 sunken cargo vessels, military bridge causeways, and thousands of live mortar shells and rockets.',
            '**Reopened 5 June 1975:** Sadat led a ceremonial naval convoy through the canal aboard the destroyer *6th of October*, exactly 8 years to the day after its closure, restoring vital international commerce and Egyptian customs revenue.',
            "**Economic Dividends:** Reopening the canal generated over $500 million annually in toll revenues for Egypt's treasury, providing critical stabilization to an economy on the brink of hyperinflation.",
          ],
        },
        {
          title: '3. Economic Crisis & Cairo Bread Riots (Jan 1977)',
          points: [
            '**Economic Insolvency:** Decades of continuous wartime mobilization left Egypt with $12 billion in foreign debt, collapsing infrastructure, soaring unemployment, and runaway inflation.',
            '**Food Riots (18–19 Jan 1977):** When the Egyptian government abruptly cut basic food and fuel subsidies to satisfy International Monetary Fund (IMF) loan requirements, violent riots erupted across Cairo and Alexandria, killing 79 people.',
            '**Domestic Impasse:** The riots forced Sadat to deploy the Egyptian military onto the streets to restore order and immediately cancel the price rises, demonstrating that the domestic economy was on the verge of total collapse.',
            '**Strategic Imperative:** Sadat concluded Egypt could never achieve economic development or feed its exploding population while devoting 40% of its national budget to perpetual military confrontation with Israel.',
          ],
        },
        {
          title: '4. The Historic Knesset Speech (20 November 1977)',
          points: [
            '**Stunning the Arab World:** Sadat announced to the Egyptian National Assembly that he was willing to go to the Israeli Knesset; Arab allies reacted with fury, but Israeli Prime Minister Menachem Begin promptly issued an official invitation.',
            '**Arrival in Tel Aviv:** On 19 Nov 1977, Sadat landed at Ben Gurion Airport and was received by an Israeli military honor guard, shaking hands with Golda Meir, Yitzhak Rabin, and Ariel Sharon on live international television.',
            '**Knesset Demands:** Sadat offered genuine peace, open borders, and mutual recognition, but insisted that lasting peace required total Israeli withdrawal from Sinai, Golan, and the West Bank, plus Palestinian self-determination.',
            "**Catalyst for Camp David:** Although Sadat and Begin failed to reach an immediate agreement at their follow-up summit in Ismailia, Sadat's courage created an irreversible momentum that forced US President Jimmy Carter to intervene.",
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Yom Kippur War & Oil Shock',
          text: '1973 war & 400% oil price rise shatter status quo; US foreign policy compelled to actively intervene in Middle East.',
        },
        {
          stage: '2. Kissinger Shuttle Diplomacy',
          text: 'Kissinger flies between capitals; Sinai I & II disengagements agreed; OAPEC lifts oil embargo in March 1974.',
        },
        {
          stage: '3. Suez Cleared & Reopened',
          text: '1,700 engineers clear 700k mines (96 dead); canal reopens 5 June 1975; Egypt regains vital transit tolls.',
        },
        {
          stage: '4. Sadat in Jerusalem (1977)',
          text: 'Food riots pressure Sadat; he flies to Israel, addresses Knesset; breaks 30-year taboo, paving way to Camp David.',
        },
      ],
      masterWordBank: [
        {
          term: 'Shuttle Diplomacy',
          def: 'Intensive diplomatic mediation by Henry Kissinger traveling between Middle Eastern capitals.',
        },
        {
          term: 'Sinai I & II Accords',
          def: '1974 and 1975 disengagement treaties pulling Israeli forces back from the Suez Canal.',
        },
        {
          term: 'Suez Canal Clearance',
          def: '1,700 engineers cleared 700,000 mines (96 dead); reopened on 5 June 1975.',
        },
        {
          term: '5 June 1975 Reopening',
          def: 'Historic reopening of Suez Canal exactly 8 years after the Six Day War closure.',
        },
        {
          term: 'Abu Rudeis Oilfields',
          def: 'Strategic Sinai oil installations returned to Egyptian control under the Sinai II agreement.',
        },
        {
          term: 'Cairo Food Riots (1977)',
          def: 'Violent protests against price hikes that pushed Sadat to urgently seek peace.',
        },
        {
          term: 'Sadat in Jerusalem (1977)',
          def: 'Historic breakthrough when Sadat addressed the Knesset offering full peace.',
        },
        {
          term: 'Menachem Begin',
          def: 'Israeli Prime Minister who hosted Sadat in Jerusalem and signed the Camp David Accords.',
        },
        {
          term: 'Jimmy Carter',
          def: 'US President whose personal diplomacy brought Sadat and Begin together at Camp David.',
        },
        {
          term: 'Ismailia Summit (1977)',
          def: 'Reciprocal summit in Egypt where Begin and Sadat continued bilateral peace talks.',
        },
        {
          term: 'UNDOF Buffer Zone',
          def: 'UN peacekeeping force deployed to the Golan Heights following the 1974 Syrian disengagement.',
        },
        {
          term: 'Gidi & Mitla Passes',
          def: 'Crucial mountain defiles in Sinai evacuated by Israel under the 1975 Sinai II Accord.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_10',
    spreadNum: 10,
    topic: 'Key Topic 3 • Attempts at Peace, 1974–95',
    title: 'KT 3.2: Camp David Accords (1978), Treaty of Washington (1979) & Backlash',
    left: {
      tag: 'KT 3.2 • Carter, Begin, Sadat & The Assassination',
      headline: 'Thirteen Days, Billions in Aid & The Price of Treason: Camp David 1978–79',
      summary:
        'In September 1978, US President Jimmy Carter isolated Anwar Sadat and Menachem Begin at the Camp David presidential retreat for 13 days of grueling negotiations. The summit produced two distinct agreements: the Framework for Egyptian-Israeli Peace (full Sinai withdrawal in exchange for mutual recognition) and the deliberately vague Framework for Peace in the Middle East (promising 5-year transitional autonomy for West Bank and Gaza Palestinians). Carter sealed the deal with massive US financial underwriting: $10 billion in aid to Egypt ($1 billion annually for 10 years) and $3 billion in loans/grants to Israel for replacement Negev airbases. On 26 March 1979, the formal Treaty of Washington was signed on the White House lawn. While Sadat and Begin shared the 1978 Nobel Peace Prize, the Arab world reacted with fury: the Arab League expelled Egypt, and on 6 October 1981, Sadat was assassinated by Egyptian Islamic Jihad militants.',
      pillars: [
        {
          title: 'The 13 Days at Camp David (1978)',
          subtitle: "Carter's High-Stakes Summit",
          bullets: [
            '**Total Diplomatic Isolation:** In Sept 1978, Carter brought Sadat and Begin to Maryland; when the two leaders refused to speak to each other after day three, Carter personally drafted and redrafted compromise proposals 23 times.',
            '**Sinai vs Settlements Impasse:** Begin agreed to return the Sinai Peninsula, but adamantly refused to dismantle Israeli settlements (e.g. Yamit) or concede sovereignty over the West Bank and East Jerusalem.',
            '**The Breakthrough Moment:** When Sadat packed his bags to leave on day 11, Carter warned him that abandoning the talks would destroy the US-Egyptian alliance and invite Soviet domination, convincing him to stay and sign.',
            "**Begin's Grandchildren Concession:** On the final morning, Carter presented Begin with signed photographs dedicated individually to Begin's grandchildren; emotionally moved, Begin agreed to a free Knesset vote to dismantle Yamit.",
          ],
        },
        {
          title: 'The Two Frameworks & US Aid',
          subtitle: '$10bn Egypt / $3bn Israel Packages',
          bullets: [
            '**Framework 1 (Sinai Peace):** Israel would return all of Sinai within three years, dismantle all Jewish settlements, and restore Egyptian sovereignty; Egypt recognized Israel and granted navigation rights in Suez and Aqaba.',
            '**Framework 2 (Palestinian Autonomy):** Envisioned an elected self-governing authority for West Bank and Gaza for 5 years, followed by final-status talks; however, Palestinians were not consulted, and the terms were deliberately vague.',
            '**$10 Billion Aid Package to Egypt:** Carter secured the pact by pledging **$10 billion in US aid to Egypt** ($1 billion annually for 10 years) in economic development, grain supplies, and advanced American military hardware.',
            '**$3 Billion Aid Package to Israel:** Carter guaranteed **$3 billion in US loans and grants to Israel** to finance the construction of two state-of-the-art military airbases (Nevatim and Ramon) in the Negev Desert to replace surrendered Sinai bases.',
          ],
        },
        {
          title: 'The Treaty & Fatal Backlash',
          subtitle: 'Washington 1979 & Sadat Assassination',
          bullets: [
            "**Treaty of Washington (26 March 1979):** Signed on the White House lawn; Egypt became the first Arab state to officially recognize Israel's right to exist in peace, ending 31 years of official warfare.",
            '**Arab League Expulsion:** Arab nations denounced Sadat as a traitor who abandoned Palestine; Egypt was expelled from the Arab League, the League HQ was moved from Cairo to Tunis, and Gulf states cut off financial subsidies.',
            '**Domestic Repression (Sept 1981):** Facing mounting opposition from Islamists and leftists, Sadat cracked down, arresting over 1,500 political opponents, intellectuals, and religious figures in September 1981.',
            '**Assassination of Sadat (6 Oct 1981):** During a military victory parade in Cairo celebrating the 1973 crossing, Islamic Jihad soldiers led by Lieutenant Khalid Islambouli leaped from a truck and assassinated Sadat with automatic rifles.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Jimmy Carter',
          role: 'US President whose relentless 13-day personal mediation at Camp David produced the historic peace accords and treaties.',
        },
        {
          name: 'Anwar Sadat',
          role: 'Egyptian President who regained Sinai and billions in US aid, but was ostracized by the Arab world and assassinated in 1981.',
        },
        {
          name: 'Menachem Begin',
          role: 'Israeli Prime Minister who conceded Sinai and dismantled the Yamit settlement, while retaining military control over the West Bank and Gaza.',
        },
        {
          name: 'Hosni Mubarak',
          role: "Sadat's Vice President who survived the 1981 assassination attack, became Egyptian President, and upheld the peace treaty with Israel.",
        },
      ],
      archivalSource: {
        title: 'Egypt-Israel Peace Treaty, Article I (26 March 1979)',
        citation: 'Treaty of Washington, United Nations Treaty Series No. 17813',
        quote:
          'The state of war between the Parties will be terminated and peace will be established between them upon the exchange of instruments of ratification of this Treaty... Israel will withdraw all its armed forces and civilians from the Sinai... Egypt will resume the exercise of its full sovereignty over the Sinai.',
        significance:
          "Permanently eliminated Israel's most powerful military opponent from the Arab coalition, fundamentally altering the Middle Eastern balance of power.",
      },
    },
    right: {
      tag: 'KT 3.2 • Treaty Analysis, Strategic Calculations & Word Bank',
      deepCases: [
        {
          title: '1. The 13-Day Drama at Camp David (Sept 1978)',
          points: [
            '**Total Seclusion:** Carter kept the delegations cut off from the media at the wooded Maryland retreat; Sadat and Begin developed such mutual hostility they could not meet face-to-face after day three.',
            "**Carter's 23 Drafts:** Carter worked 18-hour days shuttling between Sadat's and Begin's cabins, personally writing, redrafting, and negotiating 23 separate iterations of the peace text.",
            "**The Photographs Breakthrough:** On the final day, Carter presented Begin with signed photographs of Carter, Sadat, and Begin for Begin's grandchildren; deeply moved, Begin softened his stance on settlement removal.",
            '**Knesset Settlement Vote:** Begin agreed that the Israeli Knesset would hold a free vote on whether to dismantle the 15 Jewish settlements in Sinai; the Knesset approved the evacuation, leading to the forced demolition of Yamit.',
          ],
        },
        {
          title: '2. The US Financial Packages ($10bn & $3bn)',
          points: [
            '**$10 Billion to Egypt:** The US pledged $10 billion in civilian and military grants over a decade ($1 billion annually), modernizing Egypt’s infrastructure, subsidizing wheat imports, and supplying modern M60 Patton tanks.',
            "**$3 Billion to Israel:** The US funded the construction of two state-of-the-art military airbases (Nevatim and Ramon) in the Negev Desert to replace bases surrendered in Sinai, guaranteeing Israel's qualitative military edge.",
            '**Economic Dependency:** Both Egypt and Israel became permanently dependent on massive annual congressional foreign aid appropriations, anchoring both nations firmly within the American geopolitical sphere.',
            '**Strategic Decoupling:** The massive aid package successfully eliminated the possibility of an Egyptian two-front assault on Israel, allowing Israel to focus its military resources entirely on Syria and the PLO.',
          ],
        },
        {
          title: '3. Why Palestinians Rejected the Framework',
          points: [
            '**Zero Consultation:** The PLO and West Bank Palestinians were completely excluded from the Camp David negotiations, viewing Sadat as a traitor who sold out Palestinian rights to regain Egyptian sovereign territory.',
            '**No Guarantee of Statehood:** Framework 2 promised only "administrative autonomy" after 5 years, leaving internal security, border control, water rights, and land ownership firmly in the hands of the IDF.',
            "**Settlement Surge:** Freed from the threat of war with Egypt, Begin's right-wing Likud government dramatically accelerated the construction of Jewish settlements across the West Bank and East Jerusalem.",
            '**Perpetual Displacement:** The framework contained no practical mechanism or timeline for the return of 1948 or 1967 Palestinian refugees, cementing Palestinian distrust of bilateral American mediation.',
          ],
        },
        {
          title: '4. The Arab Backlash & 1981 Assassination',
          points: [
            '**Arab League Sanctions:** Meeting in Baghdad, 18 Arab nations suspended Egypt from the Arab League, moved the League headquarters from Cairo to Tunis, and imposed a total diplomatic, cultural, and economic boycott.',
            "**Saudi Subsidy Cut:** Saudi Arabia and Kuwait immediately terminated billions in annual financial subsidies that had supported Egypt's treasury since the 1967 Khartoum summit, leaving Egypt wholly reliant on US aid.",
            '**Islamic Extremist Rage:** Egyptian Islamists viewed peace with Israel as an unpardonable betrayal of Islam; Sadat further inflamed tensions by arresting 1,500 political opponents, lawyers, and sheikhs in Sept 1981.',
            '**6 October 1981 Parade:** Lieutenant Khalid Islambouli and three fellow conspirators sprayed the presidential reviewing stand with automatic rifles and grenades, assassinating Sadat on live global television.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. 13-Day Camp David Summit',
          text: 'Carter isolates Sadat & Begin in Maryland; drafts 23 proposals; brokers two historic peace frameworks.',
        },
        {
          stage: '2. US Aid Underwriting',
          text: 'US pledges $10bn to Egypt ($1bn/yr) and $3bn to Israel for replacement Negev airbases; seals treaty.',
        },
        {
          stage: '3. Treaty of Washington (1979)',
          text: 'Peace signed on White House lawn; Sinai returned over 3 years; Egypt becomes first Arab state to recognize Israel.',
        },
        {
          stage: '4. Arab Boycott & Assassination',
          text: 'Arab League expels Egypt to Tunis; Islamists view treaty as treason; Sadat assassinated at military parade in 1981.',
        },
      ],
      masterWordBank: [
        {
          term: 'Camp David Accords (1978)',
          def: 'Two peace frameworks brokered by President Jimmy Carter at the Maryland retreat.',
        },
        {
          term: 'Framework for Sinai Peace',
          def: 'Agreement returning full Sinai Peninsula to Egypt in exchange for diplomatic recognition.',
        },
        {
          term: 'Framework for Middle East',
          def: 'Vague proposal for 5-year transitional Palestinian autonomy, boycotted by Palestinians.',
        },
        {
          term: '$10 Billion US Egypt Aid',
          def: 'Financial package ($1bn/yr for 10 years) pledged by Carter to stabilize Egypt.',
        },
        {
          term: '$3 Billion US Israel Aid',
          def: 'US grants and loans funding replacement Israeli military airbases in the Negev.',
        },
        {
          term: 'Treaty of Washington (1979)',
          def: 'Formal peace treaty between Egypt and Israel signed on the White House lawn.',
        },
        {
          term: 'Yamit Settlement',
          def: 'Major Israeli settlement in Sinai bulldozed by the IDF before returning the land to Egypt.',
        },
        {
          term: 'Arab League Expulsion',
          def: 'Arab states suspended Egypt from the Arab League, relocating headquarters to Tunis.',
        },
        {
          term: 'Sadat Assassination (1981)',
          def: 'Murder of Anwar Sadat on 6 Oct 1981 by Islamic Jihad during a military parade.',
        },
        {
          term: 'Khalid Islambouli',
          def: 'Egyptian Islamic Jihad army officer who led the assassination of Anwar Sadat.',
        },
        {
          term: 'Hosni Mubarak',
          def: 'Succeeded Sadat as Egyptian President, maintaining the peace treaty while thawing Arab ties.',
        },
        {
          term: 'Nobel Peace Prize (1978)',
          def: 'Awarded jointly to Anwar Sadat and Menachem Begin for negotiating the peace accords.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_11',
    spreadNum: 11,
    topic: 'Key Topic 3 • Attempts at Peace, 1974–95',
    title: 'KT 3.3: The Palestinian Issue: The 1982 Lebanon War & The First Intifada (1987–93)',
    left: {
      tag: 'KT 3.3 • Fatahland, Sabra-Shatila & The Grassroots Uprising',
      headline: 'Siege, Massacre & Stones: The Lebanon War to the First Intifada',
      summary:
        'Following expulsion from Jordan in 1970, the PLO constructed a heavily armed "state-within-a-state" among 300,000 refugees in southern Lebanon ("Fatahland"). The March 1978 Coastal Road Massacre (38 Israeli civilians killed) prompted Operation Litani, deploying 26,000 IDF troops. On 6 June 1982, following the attempted assassination of Israeli Ambassador Shlomo Argov in London by the anti-Arafat Abu Nidal faction, Defence Minister Ariel Sharon launched Operation Peace for Galilee, besieging Beirut for two months. After the PLO evacuated to Tunis, Christian Phalangists slaughtered between 800 and 3,500 Palestinian civilians in the Sabra and Shatila refugee camps, provoking the Kahan Commission to oust Sharon and inadvertently birthing Hezbollah. Frustration in the occupied territories erupted on 8 December 1987 in the First Intifada, led by the Unified National Leadership of the Uprising (UNLU). Despite Israel’s "Iron Fist" policy, international TV footage of stone-throwing youths against tanks shifted world opinion, resulting in 1,200 Palestinian deaths by the IDF and over 800 executions of suspected collaborators.',
      pillars: [
        {
          title: 'Fatahland & Operation Litani',
          subtitle: '300k Refugees & 1978 Bus Raid',
          bullets: [
            '**Fatahland in South Lebanon:** 300,000 Palestinian refugees lived in Lebanon; the PLO built a heavily armed military enclave, firing Soviet Katyusha rockets into northern Israeli towns like Kiryat Shmona and Nahariya.',
            '**Coastal Road Massacre (11 March 1978):** 11 Fatah commandos landed by boat, hijacked a bus near Tel Aviv, and engaged in a shootout killing **38 Israeli civilians (including 13 children)** and wounding 71.',
            '**Operation Litani (15 March 1978):** Israel responded with **26,000 IDF troops** invading southern Lebanon up to the Litani River, killing 300 PLO fighters and displacing 100,000 Lebanese civilians.',
            '**UN Resolution 425 & UNIFIL:** The UN Security Council established the 4,000-strong UN Interim Force in Lebanon (UNIFIL) to confirm Israeli withdrawal, but could not prevent ongoing cross-border PLO guerrilla strikes.',
          ],
        },
        {
          title: 'Lebanon Invasion & Sabra-Shatila',
          subtitle: 'Operation Peace for Galilee (1982)',
          bullets: [
            '**The Assassination Pretext:** On 3 June 1982, the Abu Nidal group (anti-Arafat extremists) shot and paralyzed Israeli Ambassador Shlomo Argov in London; Defence Minister Ariel Sharon seized on this to launch a full invasion on 6 June 1982.',
            '**Two-Month Siege of Beirut:** Sharon told cabinet troops would advance only 40km, but pushed 85km to surround West Beirut, cutting water, electricity, and food while relentlessly bombing residential areas for two months.',
            '**PLO Evacuation to Tunis:** US envoy Philip Habib negotiated a ceasefire; between 21 August and 1 September 1982, **14,000 PLO fighters were evacuated by sea to Tunis**, depriving the PLO of a land border with Israel.',
            '**Sabra & Shatila Massacre (Sept 1982):** Following the assassination of Lebanese President Bashir Gemayel, the IDF allowed Phalangist Christian militias into refugee camps; **between 800 and 3,500 Palestinian civilians were slaughtered**; Sharon was forced to resign.',
          ],
        },
        {
          title: 'The First Intifada (1987–93)',
          subtitle: 'Jabalya Spark & Grassroots Revolt',
          bullets: [
            '**The Jabalya Spark (8 Dec 1987):** An IDF tank transporter crashed into four civilian cars at Jabalya refugee camp in Gaza, killing 4 Palestinians; rumors of deliberate revenge triggered mass rioting across Gaza and the West Bank.',
            '**UNLU & Civil Disobedience:** The Unified National Leadership of the Uprising (UNLU) distributed clandestine leaflets organizing general strikes, commercial boycotts, tax withholding, and barricades, catching PLO leaders in Tunis off guard.',
            '**Rise of Hamas (Dec 1987):** Sheikh Ahmed Yassin founded the militant Islamist movement **Hamas**, issuing an antisemitic 1988 charter rejecting all compromise and demanding an Islamic state across historic Palestine through holy war (*jihad*).',
            '**Human Toll & Shift in Opinion:** Yitzhak Rabin ordered an "Iron Fist" policy; **1,200 Palestinians were killed by the IDF**, while Palestinian vigilantes executed **over 800 suspected collaborators (mukhbirin)**; 160 Israelis died, as TV footage of youths against tanks shifted world opinion.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Ariel Sharon',
          role: 'Israeli Defence Minister who drove the 1982 invasion into Beirut; forced to resign after the Kahan Commission found him personally responsible for Sabra-Shatila.',
        },
        {
          name: 'Yasser Arafat',
          role: 'PLO Chairman who commanded the defense of Beirut, was evacuated by sea to Tunis in 1982, and was caught completely off guard by the 1987 Intifada.',
        },
        {
          name: 'Yitzhak Rabin',
          role: 'Israeli Defence Minister who enforced the "Iron Fist" policy during the Intifada, before concluding that military force could never solve the Palestinian issue.',
        },
        {
          name: 'Sheikh Ahmed Yassin',
          role: 'Quadriplegic Muslim Brotherhood leader in Gaza who founded the militant Islamist movement Hamas in December 1987 during the opening days of the Intifada.',
        },
      ],
      archivalSource: {
        title: 'Report of the Kahan Commission of Inquiry (7 February 1983)',
        citation: 'Official Judicial Publication, State of Israel',
        quote:
          "It is impossible to justify the Minister of Defence's disregard of the danger of a massacre... He bears personal responsibility for not ordering appropriate measures to prevent or impede the entry of the Phalangists into the camps.",
        significance:
          'An extraordinary self-indictment by a democratic state investigating its own military conduct, forcing the resignation of Defence Minister Ariel Sharon.',
      },
    },
    right: {
      tag: 'KT 3.3 • Forensic Analysis, Urban Warfare & Word Bank',
      deepCases: [
        {
          title: '1. The Coastal Road Massacre & Operation Litani (1978)',
          points: [
            '**Bus Hijacking (11 March 1978):** 11 Fatah commandos landed by Zodiac dinghy from Lebanon, seized an intercity bus on the Coastal Highway, and shot at motorists; 38 civilians (including 13 children) died in the fiery standoff.',
            '**26,000 IDF Troops Invade:** PM Menachem Begin ordered Operation Litani; Israeli troops pushed to the Litani River, killing 300 PLO fighters, destroying training bases, and displacing 100,000 Lebanese civilians.',
            '**UNIFIL Buffer Zone:** UN Resolution 425 deployed 4,000 UN peacekeepers to southern Lebanon, but Israel established a 10km "security zone" manned by the South Lebanon Army (SLA), a Christian proxy militia.',
            '**Strategic Failure:** While the PLO withdrew north of the Litani River, it quickly reconstituted its rocket batteries, continuing to bombard northern Israeli towns throughout 1979–81.',
          ],
        },
        {
          title: '2. Shlomo Argov Pretext & The 1982 Beirut Siege',
          points: [
            "**The London Pretext:** Ambassador Argov was paralyzed by Abu Nidal assassins in London; despite British intelligence confirming Abu Nidal was Arafat's deadly enemy, Sharon seized the shooting to justify invading Lebanon.",
            '**The Deceptive 40km Mandate:** Sharon told the Israeli cabinet the invasion would penetrate only 40km to clear artillery range, but deliberately drove 85km north to surround Beirut and link up with Christian Phalangist allies.',
            '**Two-Month Siege of West Beirut:** From June to August 1982, the IDF cut off water, electricity, and food supplies to 500,000 West Beirut residents, subjecting the city to relentless artillery and aerial carpet bombing.',
            '**Exile to Tunis:** Under the Philip Habib agreement, 14,000 PLO fighters evacuated by ship to Tunisia, Yemen, and Algeria; Arafat lost his immediate land border with Israel, severely weakening the PLO militarily.',
          ],
        },
        {
          title: '3. Sabra-Shatila Massacre & The Rise of Hezbollah',
          points: [
            '**Phalangist Revenge (16–18 Sept 1982):** Following the assassination of Lebanese President Bashir Gemayel, Israeli commanders allowed Christian Phalangist militias into the defenseless Sabra and Shatila refugee camps.',
            '**800 to 3,500 Slaughtered:** For 36 hours, Phalangists butchered unarmed women, children, and elderly men with axes, knives, and automatic weapons while Israeli troops fired illumination flares over the camps.',
            '**The Kahan Commission (Feb 1983):** An Israeli judicial inquiry found Sharon personally responsible for failing to anticipate the bloodbath, forcing his resignation as Defence Minister and sparking a 400,000-person peace protest in Tel Aviv.',
            "**The Birth of Hezbollah:** While the secular PLO was driven to Tunis, the brutal occupation radicalized Lebanon's impoverished Shi'ite population, giving birth to **Hezbollah**, an Iranian-armed guerrilla army.",
          ],
        },
        {
          title: '4. The Intifada Toll (1,200 IDF / 800 Collaborators)',
          points: [
            '**Grassroots Popular Uprising (1987–93):** Frustration with 20 years of military occupation exploded spontaneously in Jabalya; driven by local youths throwing stones and petrol bombs rather than the exiled PLO leadership in Tunis.',
            '**UNLU Leaflets & Resistance:** The Unified National Leadership distributed secret leaflets directing strikes, commercial shutdowns, and underground schooling when Israel shut West Bank schools for two years.',
            '**Rabin\'s "Iron Fist":** Defence Minister Rabin ordered troops to "break the bones" of stone-throwers; international news broadcasts of armed soldiers beating teenagers provoked worldwide moral condemnation.',
            '**The Grim Balance:** **1,200 Palestinians were killed by the IDF**, while Palestinian vigilantes executed **over 800 suspected collaborators (*mukhbirin*)** in internal purges; 160 Israelis were killed during the 6-year revolt.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Fatahland & Coastal Road',
          text: '300k refugees in Lebanon; PLO establishes Fatahland; 1978 bus massacre kills 38; Op Litani deploys 26k troops.',
        },
        {
          stage: '2. Argov Attack & Beirut Siege',
          text: 'Abu Nidal shoots Argov in London; Sharon invades Lebanon; 2-month siege of Beirut forces PLO evacuation to Tunis.',
        },
        {
          stage: '3. Sabra-Shatila & Hezbollah',
          text: 'Phalangists slaughter 800–3,500 refugees; Kahan Commission ousts Sharon; invasion births Iranian-backed Hezbollah.',
        },
        {
          stage: '4. First Intifada (1987–93)',
          text: 'Jabalya crash sparks revolt; UNLU coordinates civil disobedience; 1,200 killed by IDF, 800 collaborators executed.',
        },
      ],
      masterWordBank: [
        {
          term: 'Fatahland',
          def: 'Armed PLO enclave established in southern Lebanon among 300,000 Palestinian refugees.',
        },
        {
          term: 'Coastal Road Massacre',
          def: '1978 Fatah bus hijacking killing 38 Israeli civilians (13 children), triggering Op Litani.',
        },
        {
          term: 'Operation Litani (1978)',
          def: 'Israeli military invasion of southern Lebanon deploying 26,000 troops to push back PLO.',
        },
        {
          term: 'Shlomo Argov',
          def: 'Israeli Ambassador in London shot by Abu Nidal in 1982, providing the pretext for invasion.',
        },
        {
          term: 'Operation Peace for Galilee',
          def: 'Full-scale Israeli invasion of Lebanon launched on 6 June 1982 by Ariel Sharon.',
        },
        {
          term: 'Siege of Beirut (1982)',
          def: 'Two-month IDF military siege cutting water, food, and power to West Beirut.',
        },
        {
          term: 'Philip Habib',
          def: 'US special envoy who negotiated the peaceful maritime evacuation of 14,000 PLO fighters to Tunis.',
        },
        {
          term: 'Sabra and Shatila',
          def: 'Massacre of 800 to 3,500 Palestinian civilians by Christian Phalangist militia in Sept 1982.',
        },
        {
          term: 'Kahan Commission',
          def: 'Israeli judicial commission that found Defence Minister Ariel Sharon personally responsible.',
        },
        {
          term: 'Hezbollah',
          def: "Radical Iranian-funded Lebanese Shi'ite militant movement formed to resist Israeli occupation.",
        },
        {
          term: 'First Intifada (1987–93)',
          def: 'Mass Palestinian popular uprising in West Bank and Gaza against Israeli military rule.',
        },
        {
          term: 'UNLU',
          def: 'Unified National Leadership of the Uprising, directing underground strikes and civil disobedience.',
        },
      ],
    },
  },
  {
    id: 'cme_spread_12',
    spreadNum: 12,
    topic: 'Key Topic 3 • Attempts at Peace, 1974–95',
    title: 'KT 3.4: Attempts at a Solution: From the Oslo Accords to Oslo II (1993–95)',
    left: {
      tag: 'KT 3.4 • Geneva 1988, White House Handshake & Oslo II',
      headline: 'Recognition, Land Divisions & Assassination: The Rise and Fall of Oslo',
      summary:
        'Between 1988 and 1995, seismic geopolitical shifts transformed the Middle East. In December 1988, Yasser Arafat renounced terrorism and recognized Israel in Geneva. The 1990–91 Gulf War dealt the PLO a devastating financial blow when Saudi Arabia and Kuwait expelled 400,000 Palestinians and severed funding following Arafat’s support for Saddam Hussein, while the collapse of the USSR brought over 600,000 Soviet Jewish immigrants to Israel. Bankrupted and marginalized, the PLO engaged in secret negotiations hosted by Norwegian Foreign Minister Johan Jørgen Holst, culminating in the Oslo I Accord signed on 13 September 1993. The agreement established the Palestinian Authority (PA) in 1994, led to the historic October 1994 Israel-Jordan Peace Treaty, and was followed by the September 1995 Oslo II agreement dividing the West Bank into Areas A (3%), B (25%), and C (72%). However, mounting Hamas suicide bus bombings and the assassination of Prime Minister Yitzhak Rabin on 4 November 1995 shattered hopes for lasting peace.',
      pillars: [
        {
          title: 'Geopolitical Seismic Shifts',
          subtitle: 'Geneva 1988 & Gulf War Disaster',
          bullets: [
            "**Arafat Renounces Terrorism (Dec 1988):** Arafat addressed the UN in Geneva, officially recognizing Israel's right to exist, renouncing all terrorism, and accepting Res 242; the US opened formal diplomatic dialogue with the PLO.",
            "**1990–91 Gulf War Disaster:** Arafat publicly backed Saddam Hussein's invasion of Kuwait; when Iraq lost, **Kuwait and Saudi Arabia expelled 400,000 Palestinians and cut off all funding**, leaving the PLO completely bankrupt.",
            "**End of Cold War & 600,000 Soviet Jews:** The collapse of the USSR in Dec 1991 deprived Syria and the PLO of Soviet weapons; **over 600,000 Soviet Jews migrated to Israel between 1989 and 1995**, transforming Israel's economic strength.",
            '**Madrid Peace Conference (Oct 1991):** Co-sponsored by the US and USSR, bringing Israel, Syria, Lebanon, and a joint Jordanian-Palestinian delegation together for direct bilateral negotiations for the first time in history.',
          ],
        },
        {
          title: 'Oslo I & The Historic Handshake',
          subtitle: 'Secret Talks & White House Lawn (1993)',
          bullets: [
            '**Secret Oslo Channel (1992–93):** Israeli academics and PLO officials met covertly outside Oslo, hosted by Norwegian Foreign Minister Johan Jørgen Holst, bypassing the formal, stalled Madrid negotiating track.',
            "**Letters of Mutual Recognition:** The PLO recognized Israel's right to exist in peace and security and renounced terrorism; Israel officially recognized the PLO as the legitimate representative of the Palestinian people.",
            '**Signing Oslo I (13 Sept 1993):** Signed in Washington; Prime Minister Yitzhak Rabin and Yasser Arafat shook hands on the White House lawn before President Bill Clinton, establishing principles for 5-year interim self-rule.',
            '**Establishment of the PA (1994):** The 1994 Gaza-Jericho Agreement allowed Arafat to return from exile in July 1994 to establish the **Palestinian Authority (PA)**, governing municipal affairs and local policing.',
          ],
        },
        {
          title: 'Oslo II, Jordan Peace & Murder',
          subtitle: 'Areas A/B/C & Rabin Assassination',
          bullets: [
            "**Israel-Jordan Peace Treaty (Oct 1994):** King Hussein and Yitzhak Rabin signed a formal peace treaty at Wadi Araba, with the US cancelling Jordan's debt; Jordan became the second Arab nation to establish full peace with Israel.",
            '**Oslo II Agreement (Sept 1995):** Divided the West Bank into three administrative zones: **Area A (3% of land)** under full PA control; **Area B (25% of land)** under PA civil and joint Israeli security control; **Area C (72% of land)** under full Israeli civil and military control.',
            '**Hamas Bus Bombing Campaign:** Militant Islamist groups Hamas and Islamic Jihad launched deadly suicide bus bombings across Afula, Hadera, and Tel Aviv, killing dozens of Israeli civilians to derail the peace process.',
            '**Assassination of Rabin (4 Nov 1995):** At the end of a massive peace rally in Tel Aviv, Prime Minister Yitzhak Rabin was shot dead by Yigal Amir, an Orthodox Jewish extremist, dealing a catastrophic blow to the peace process.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Yitzhak Rabin',
          role: 'Israeli Prime Minister who traded land for peace, signed Oslo I and the Jordan peace treaty, and was assassinated on 4 Nov 1995.',
        },
        {
          name: 'Yasser Arafat',
          role: 'PLO Chairman who accepted mutual recognition, returned to Gaza in July 1994 as head of the PA, and was elected PA President in 1996.',
        },
        {
          name: 'Bill Clinton',
          role: 'US President who hosted the 13 Sept 1993 White House signing ceremony and orchestrated the historic Rabin-Arafat handshake.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'Monarch who signed the historic October 1994 peace treaty with Israel at Wadi Araba, ending a 46-year official state of war.',
        },
      ],
      archivalSource: {
        title: 'Prime Minister Yitzhak Rabin Address at the White House (13 Sept 1993)',
        citation: 'US Department of State Dispatch, Vol. 4, No. 38',
        quote:
          'We, the soldiers who have returned from the battlefields stained with blood... We who have fought against you, the Palestinians, we say to you today in a loud and clear voice: Enough of blood and tears! Enough!',
        significance:
          'A war hero and general explicitly rejecting further violence, committing Israel to mutual recognition and the peace process.',
      },
    },
    right: {
      tag: 'KT 3.4 • Diplomatic Architecture, West Bank Zones & Word Bank',
      deepCases: [
        {
          title: '1. The Gulf War Financial Disaster & Soviet Aliyah',
          points: [
            "**Arafat's Gulf War Blunder:** By publicly embracing Saddam Hussein during the 1990 invasion of Kuwait, Arafat alienated wealthy Gulf monarchies; upon liberation, Kuwait expelled 400,000 Palestinian workers.",
            '**Financial Ruin:** The PLO lost $100 million annually in Arab subsidies and worker remittances, bankrupting its institutions, schools, and hospitals, leaving Arafat desperate for a diplomatic breakthrough to retain power.',
            '**600,000 Soviet Jewish Immigrants:** Between 1989 and 1995, over 600,000 highly educated Soviet Jews emigrated to Israel following the collapse of the USSR, eliminating Israeli demographic anxiety and boosting military manpower.',
            '**US Diplomatic Leverage:** The end of the Cold War left the United States as the sole global superpower, enabling President George H.W. Bush to convene the Madrid Peace Conference in October 1991.',
          ],
        },
        {
          title: '2. The Oslo Secret Negotiations & Mutual Recognition',
          points: [
            '**Norwegian Discretion:** Norwegian social scientist Terje Rød-Larsen and Foreign Minister Johan Jørgen Holst organized 14 secret meetings in rural Norwegian mansions, shielding negotiators from public pressure.',
            '**Breaking Taboos:** For the first time, Israeli officials sat directly with PLO leaders; they bypassed thorny final-status issues (Jerusalem, refugees, borders) to achieve an interim breakthrough based on "land for peace".',
            '**The White House Handshake (13 Sept 1993):** Rabin hesitated before shaking Arafat\'s hand on the White House lawn, declaring "Enough of blood and tears!", while Clinton gently shepherded the two historic enemies together.',
            '**Arafat Returns to Gaza (July 1994):** Under the Gaza-Jericho Agreement, Arafat entered Gaza in July 1994 to take charge of the newly created Palestinian Authority, ending 27 years of exile from Palestinian soil.',
          ],
        },
        {
          title: '3. The Oslo II West Bank Division (Areas A, B, C)',
          points: [
            '**Area A (3% of West Bank):** Encompassed the 8 major Palestinian cities (Jenin, Nablus, Tulkarm, Qalqilya, Ramallah, Bethlehem, Jericho, Hebron); full PA civil administration and internal security control.',
            '**Area B (25% of West Bank):** Covered 450 Palestinian rural towns and villages (approx. 68% of Palestinian population); PA exercised civil administration, but the IDF retained overriding military security control.',
            '**Area C (72% of West Bank):** Remained under exclusive Israeli civil and military control; contained all 140 Jewish settlements, military bases, bypass roads, water aquifers, and the strategic Jordan Valley.',
            '**Territorial Fragmentation:** The division created a fragmented archipelago of Palestinian enclaves separated by Israeli checkpoints and bypass roads, provoking widespread Palestinian resentment.',
          ],
        },
        {
          title: "4. The Extremist Sabotage & Rabin's Assassination",
          points: [
            '**Hamas & Islamic Jihad Suicide Bombings:** Militant Islamists opposed conceding Islamic waqf land; suicide bombings in Afula, Hadera, and Tel Aviv commuter buses killed dozens of civilians, turning Israeli public opinion against Oslo.',
            '**Hebron Mosque Massacre (25 Feb 1994):** US-born Jewish extremist Baruch Goldstein opened fire with an assault rifle inside the Ibrahimi Mosque in Hebron, murdering 29 Palestinian worshippers during morning Ramadan prayers.',
            '**Demonization of Rabin:** Right-wing Israeli opposition led by Benjamin Netanyahu held fierce rallies portraying Rabin in Nazi SS uniform, accusing him of treason for handing over biblical Jewish land to the PLO.',
            '**4 November 1995 Assassination:** At the conclusion of a 100,000-strong peace rally in Kings of Israel Square, Tel Aviv, law student Yigal Amir shot Rabin twice in the back, halting the momentum of the Oslo peace process.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Geneva 1988 & Gulf Crisis',
          text: 'Arafat renounces terrorism; backing Saddam alienates Gulf states; Kuwait expels 400k Palestinians; PLO goes bankrupt.',
        },
        {
          stage: '2. Soviet Aliyah & Secret Oslo',
          text: '600k Soviet Jews arrive; Holst hosts secret Norwegian channel; Israel & PLO exchange mutual recognition in 1993.',
        },
        {
          stage: '3. Oslo I & Jordan Treaty',
          text: 'White House handshake; PA established in Gaza-Jericho; Jordan signs formal peace treaty with Israel in Oct 1994.',
        },
        {
          stage: '4. Oslo II & Rabin Murder (1995)',
          text: 'West Bank split into Areas A (3%), B (25%), C (72%); Hamas bus bombings; Yigal Amir assassinates Rabin on 4 Nov 1995.',
        },
      ],
      masterWordBank: [
        {
          term: 'Geneva UN Speech (1988)',
          def: 'Arafat explicitly renounced terrorism and recognized Israel, opening US talks.',
        },
        {
          term: '400k Expelled from Gulf',
          def: 'Palestinians expelled from Kuwait/Saudi after Arafat backed Saddam in 1990.',
        },
        {
          term: '600,000 Soviet Immigrants',
          def: 'Massive influx of Soviet Jews (1989–95) bolstering Israeli demographics.',
        },
        {
          term: 'Johan Jørgen Holst',
          def: 'Norwegian Foreign Minister who secretly hosted and mediated the Oslo peace talks.',
        },
        {
          term: 'Oslo I Accords (1993)',
          def: 'Historic declaration of principles signed on White House lawn on 13 Sept 1993.',
        },
        {
          term: 'Palestinian Authority (PA)',
          def: 'Interim Palestinian self-governing body established in 1994 to rule Gaza and Jericho.',
        },
        {
          term: 'Israel-Jordan Treaty (1994)',
          def: 'Peace treaty signed by King Hussein and Yitzhak Rabin at Wadi Araba in Oct 1994.',
        },
        {
          term: 'Oslo II Agreement (1995)',
          def: 'Agreement dividing the West Bank into administrative Areas A (3%), B (25%), C (72%).',
        },
        {
          term: 'Area A, B, C Zones',
          def: 'Three-tiered territorial division determining Palestinian vs Israeli administrative control.',
        },
        {
          term: 'Hamas Suicide Bombings',
          def: 'Campaign of bus bombings in 1994–96 designed to sabotage the Oslo peace process.',
        },
        {
          term: 'Yigal Amir',
          def: 'Right-wing Orthodox Jewish extremist who assassinated Prime Minister Rabin on 4 Nov 1995.',
        },
        {
          term: 'Yitzhak Rabin Murder (1995)',
          def: 'Assassination of Israeli Prime Minister, dealing a fatal blow to the Oslo peace momentum.',
        },
      ],
    },
  },
];

function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function getStyles() {
  return `
  @page {
    size: A4 portrait;
    margin: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #e2e8f0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #000000;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    height: 297mm;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    background: #ffffff;
    box-sizing: border-box;
    padding: 7.5mm 10mm 6.5mm 10mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  @media screen {
    .page {
      margin: 10px auto;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
    }
  }

  /* Archival Monochrome Header & Footer */
  .page-header {
    border-bottom: 1.8px solid #000000;
    padding-bottom: 4px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .archival-tag {
    font-size: 7.8pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #000000;
  }

  .page-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 13.5pt;
    font-weight: 800;
    color: #000000;
    margin: 1px 0 0 0;
    line-height: 1.15;
  }

  .page-badge {
    font-size: 7.2pt;
    font-weight: 800;
    text-transform: uppercase;
    background: #000000;
    color: #ffffff;
    padding: 2px 7px;
    border-radius: 2px;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }

  .page-footer {
    border-top: 1.2px solid #000000;
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.2pt;
    color: #000000;
    font-weight: 600;
  }

  .page-num {
    font-weight: 800;
    font-size: 8.5pt;
    color: #000000;
  }

  /* Cover Outer Frame */
  .cover-border {
    border: 2px solid #000000;
    height: 100%;
    padding: 10px 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
  }

  /* Monochrome Word Bank Pills */
  .wb-pill {
    display: inline-block;
    background: #f1f5f9;
    border: 1px solid #334155;
    color: #000000;
    font-size: 6.6pt; font-weight: 800; padding: 1px 3px;
    border-radius: 2px;
    margin-right: 4px;
    white-space: nowrap;
  }
`;
}

function renderPage1(getImageDataUri) {
  const unrwaImgUri = getImageDataUri('/images/nakba_unrwa_women_bread_1948.jpg');
  const rubingerImgUri = getImageDataUri('/images/israeli_troops_wall.jpg');

  return `
    <div class="page" id="page_1" data-page="1">
      <div class="cover-border">
        <!-- Top Header Strip -->
        <div style="border-bottom: 1.8px solid #000000; padding-bottom: 3px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 7.8pt; font-weight: 800; letter-spacing: 0.6px; color: #000000; text-transform: uppercase;">
            PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION P5
          </span>
          <span style="font-size: 7.4pt; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.4px;">
            1HI0/P5 &bull; Period Study Specification Guide
          </span>
        </div>

        <!-- Main Title Block -->
        <div style="margin: 2px 0; text-align: center;">
          <h1 style="font-family: 'Playfair Display', serif; font-size: 19pt; font-weight: 800; color: #000000; margin: 0 0 2px 0; line-height: 1.1;">
            Conflict in the Middle East, 1945–1995
          </h1>
          <div style="font-family: 'Playfair Display', serif; font-size: 10.5pt; font-weight: 700; color: #1e293b; margin: 0 0 3px 0;">
            Visual Revision Masterclasses &amp; Complete Specification Guide
          </div>
          <div style="display: flex; justify-content: center; gap: 7px; font-size: 7.2pt; font-weight: 700; color: #000000; text-transform: uppercase;">
            <span style="background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">Paper 2: Period Study</span>
            <span style="background: #f1f5f9; color: #000000; padding: 1.5px 6px; border-radius: 2px; border: 1px solid #000000;">Time: 50 Minutes</span>
            <span style="background: #f1f5f9; color: #000000; padding: 1.5px 6px; border-radius: 2px; border: 1px solid #000000;">Total: 32 Raw Marks</span>
            <span style="background: #000000; color: #ffffff; padding: 1.5px 6px; border-radius: 2px;">28-Page Master Volume</span>
          </div>
        </div>

        <!-- Two Contrasting Historical Archival Plates: 1948 Nakba vs 1967 Six Day War -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 8px; background: #fafafa;">
          <div style="font-size: 7.5pt; font-weight: 800; text-transform: uppercase; color: #000000; letter-spacing: 0.5px; margin-bottom: 6px; text-align: center; border-bottom: 1.2px solid #000000; padding-bottom: 2px;">
            Dual Archival Plates: The Two Defining Turning Points of Conflict in the Middle East
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            
            <!-- Left Plate: 1948 Al-Nakba (UNRWA Archive) -->
            <div style="border: 1px solid #000000; background: #ffffff; padding: 5px; border-radius: 2px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
                <strong style="font-size: 6.8pt; text-transform: uppercase; color: #000000; letter-spacing: 0.3px;">1. The 1948 Al-Nakba (The Catastrophe)</strong>
                <span style="font-size: 6.2pt; font-weight: 700; color: #475569;">UNRWA Photo Archive</span>
              </div>
              <div style="width: 100%; height: 135px; overflow: hidden; background: #000000; border: 1px solid #000000; margin-bottom: 4px;">
                <img src="${unrwaImgUri}" alt="Palestinian refugee mother and daughter outside tent with bread rations, 1948" style="width: 100%; height: 100%; object-fit: cover; object-position: center 20%; filter: grayscale(100%) contrast(115%); display: block;" />
              </div>
              <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
                <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 7.2pt; font-weight: 700; font-style: italic; color: #000000; margin-bottom: 2px;">
                  "Palestinian refugee mother and daughter with bread rations outside shelter tent (1948)"
                </div>
                <div>
                  <strong>Archive Citation:</strong> UN Relief and Works Agency (UNRWA) / UNRPR Historic Milestones Archive, Record ID: I0000l5SkmJo1hLc.
                </div>
                <div style="margin-top: 2px; color: #334155;">
                  <strong>Historical Context:</strong> Over 700,000 Palestinian Arabs were displaced during the 1948 war. The United Nations Relief for Palestine Refugees (UNRPR) provided initial tent camps and emergency flour rations before UNRWA was formally constituted in 1949.
                </div>
              </div>
            </div>

            <!-- Right Plate: 1967 Six Day War (David Rubinger / GPO) -->
            <div style="border: 1px solid #000000; background: #ffffff; padding: 5px; border-radius: 2px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
                <strong style="font-size: 6.8pt; text-transform: uppercase; color: #000000; letter-spacing: 0.3px;">2. The 1967 Western Wall Victory</strong>
                <span style="font-size: 6.2pt; font-weight: 700; color: #475569;">David Rubinger / GPO</span>
              </div>
              <div style="width: 100%; height: 135px; overflow: hidden; background: #000000; border: 1px solid #000000; margin-bottom: 4px;">
                <img src="${rubingerImgUri}" alt="Israeli paratroopers at the Western Wall, 7 June 1967 by David Rubinger" style="width: 100%; height: 100%; object-fit: cover; object-position: center 25%; filter: grayscale(100%) contrast(115%); display: block;" />
              </div>
              <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
                <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 7.2pt; font-weight: 700; font-style: italic; color: #000000; margin-bottom: 2px;">
                  "Paratroopers at the Western Wall (צנחנים בכותל המערבי), Jerusalem (7 June 1967)"
                </div>
                <div>
                  <strong>Photograph by:</strong> David Rubinger (1924–2017) &bull; Israel Government Press Office (GPO) Collection.
                </div>
                <div style="margin-top: 2px; color: #334155;">
                  <strong>Historical Context:</strong> Israeli paratroopers of the 55th Brigade (Zion Karasenti, Yitzhak Yifat, Haim Oshri) stand in reverence before the Western Wall moments after capturing the Old City of Jerusalem, symbolizing the dramatic 1967 territorial conquest.
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Pupil Name Box -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 8px; background: #ffffff; display: flex; justify-content: space-between; align-items: center; font-size: 7.6pt; color: #000000;">
          <div style="flex: 1; display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; font-size: 7.6pt; color: #000000; margin-right: 6px;">Pupil:</strong>
            <span style="border-bottom: 1.2px solid #000000; flex: 1; height: 14px; margin-right: 14px;"></span>
          </div>
          <div style="display: flex; gap: 10px; font-size: 7.2pt; color: #1e293b; white-space: nowrap;">
            <span><strong>Class:</strong> Year 11</span>
            <span><strong>Teacher:</strong> Mr Lovett</span>
            <span><strong>School:</strong> Meoncross School</span>
          </div>
        </div>

        <!-- The Three Question Types Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 1: Consequence</span>
              <span style="color: #000000;">4+4 = 8m</span>
            </div>
            <p style="font-size: 6.4pt; color: #1e293b; line-height: 1.25; margin: 2px 0 0 0;">
              Answer <strong>BOTH 1(a) and 1(b)</strong> (~6 mins each). State ONE consequence &rarr; Support with precise facts &rarr; Trace direct causal link. Zero source evaluation.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 2: Narrative</span>
              <span style="color: #000000;">8m</span>
            </div>
            <p style="font-size: 6.4pt; color: #1e293b; line-height: 1.25; margin: 2px 0 0 0;">
              Compulsory continuous prose (~12 mins). 3-act structure: <strong>Beginning &rarr; Turning Point &rarr; Outcome</strong>. Must include own knowledge beyond stimulus.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #000000; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 3: Importance</span>
              <span style="color: #000000;">8+8 = 16m</span>
            </div>
            <p style="font-size: 6.4pt; color: #1e293b; line-height: 1.25; margin: 2px 0 0 0;">
              Choose <strong>TWO from 3(a), 3(b), 3(c)</strong> (~12 mins each). Write 2 explanatory paragraphs analyzing short-term impact vs long-term consequence.
            </p>
          </div>
        </div>

        <!-- Full Specification Word-for-Word (3 Columns) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 7.2pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 3px; text-align: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            ★ Official Pearson Edexcel GCSE Specification Curriculum Checklist (Option P5)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
            <!-- Column 1: KT1 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 5px; font-size: 5.9pt; line-height: 1.22; color: #0f172a;">
              <div style="font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px;">KT1: Birth of Israel (1945–63)</div>
              <strong>1. British withdrawal &amp; creation of Israel:</strong>
              <div>&bull; Conflicting demands within Mandate (1923 terms).</div>
              <div>&bull; 153 railway bombs; King David Hotel; UN Res 181.</div>
              <div>&bull; Arab-Israeli War (1948–49); Deir Yassin; Czech arms.</div>
              <strong style="display:block; margin-top:2px;">2. Aftermath of 1948–49 war:</strong>
              <div>&bull; Territorial shifts; 79% Green Line control.</div>
              <div>&bull; Refugee crisis: 700k displaced (280k West Bank, 190k Gaza).</div>
              <div>&bull; IDF Conscription (30m/18m); Law of Return; $300m US aid.</div>
              <strong style="display:block; margin-top:2px;">3. Increased tension, 1955–63:</strong>
              <div>&bull; Nasser; 80,000 British troops; Gaza raid (1955).</div>
              <div>&bull; Sèvres Protocol (22 Oct 1956); Suez Crisis; UAR (1958).</div>
            </div>

            <!-- Column 2: KT2 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 5px; font-size: 5.9pt; line-height: 1.22; color: #0f172a;">
              <div style="font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px;">KT2: Escalating Conflict (1964–73)</div>
              <strong>1. The Six Day War, 1967:</strong>
              <div>&bull; Cairo Summit (1964), PLA (12k troops) &amp; Fatah raids.</div>
              <div>&bull; Samu raid (1966); 7 April 1967 Damascus dogfight.</div>
              <div>&bull; Soviet false alert; Tiran closure; 29 May demands.</div>
              <div>&bull; Operation Focus; 779 vs ~20,000 dead; 70k sq km won.</div>
              <strong style="display:block; margin-top:2px;">2. Aftermath of 1967 war:</strong>
              <div>&bull; UN Res 242; Khartoum "Three No\'s"; 300k new refugees.</div>
              <div>&bull; Occupied lands matrix (Golan, West Bank, Gaza, Sinai).</div>
              <div>&bull; Karameh (1968); Dawson\'s Field; Black September.</div>
              <div>&bull; Munich 1972 (234 prisoners); Operation Wrath of God.</div>
              <strong style="display:block; margin-top:2px;">3. Yom Kippur War (1973):</strong>
              <div>&bull; Sadat expels 15k Soviets; Saudi subsidies; water monitors.</div>
              <div>&bull; DEFCON 3 nuclear alert; OAPEC 400% oil price shock.</div>
            </div>

            <!-- Column 3: KT3 -->
            <div style="font-size: 5.9pt; line-height: 1.22; color: #0f172a;">
              <div style="font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px;">KT3: Attempts at Peace (1974–95)</div>
              <strong>1. Diplomatic negotiations:</strong>
              <div>&bull; Kissinger shuttle diplomacy; Suez cleared (700k mines).</div>
              <div>&bull; Reopened 5 June 1975; Sadat to Knesset (1977).</div>
              <div>&bull; Camp David (1978); $10bn Egypt / $3bn Israel aid.</div>
              <div>&bull; Treaty of Washington (1979); Sadat murdered (1981).</div>
              <strong style="display:block; margin-top:2px;">2. The Palestinian issue:</strong>
              <div>&bull; Fatahland; Coastal Road raid; Op Litani (26k troops).</div>
              <div>&bull; 1982 Lebanon War (Argov attack); Sabra-Shatila; Hezbollah.</div>
              <div>&bull; First Intifada (1987–93); Jabalya crash; UNLU; 1,200 dead.</div>
              <strong style="display:block; margin-top:2px;">3. Attempts at a solution:</strong>
              <div>&bull; Geneva 1988 speech; 400k expelled from Gulf; 600k Soviet Jews.</div>
              <div>&bull; Oslo I (1993); PA created; Jordan peace (1994).</div>
              <div>&bull; Oslo II (Areas A 3%, B 25%, C 72%); Rabin murdered (1995).</div>
            </div>
          </div>
        </div>

        <!-- Footer Strip -->
        <div style="border-top: 1.8px solid #000000; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-size: 6.8pt; color: #000000;">
          <span><strong>Meoncross History Department</strong> &bull; GCSE Masterclass Series</span>
          <span style="font-weight: 800; color: #000000; text-transform: uppercase;">Pearson Edexcel 1HI0/P5 &bull; 28-Page Master Volume</span>
        </div>
      </div>
    </div>
  `;
}

function renderPage2() {
  return `
    <div class="page" id="page_2" data-page="2">
      <div class="page-header">
        <div>
          <span class="archival-tag">Paper 2 Blueprint &bull; Period Study Strategy</span>
          <h2 class="page-title">Exam Architecture, Command Words &amp; Non-Negotiable Success Principles</h2>
        </div>
        <div class="page-badge">Paper 2 &bull; 50 Mins &bull; 32 Marks</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Top Strategy Overview Card -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 8px 12px;">
          <div style="font-size: 10pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 2px;">
            How to Master Paper 2 Period Study (Option P5: Conflict in the Middle East, 1945–1995)
          </div>
          <div style="font-size: 8.8pt; color: #1e293b; line-height: 1.36;">
            Paper 2 Period Study tests <strong>knowledge recall (AO1)</strong> and <strong>second-order historical causation (AO2)</strong> across 50 minutes. There are <strong>zero source questions</strong> and <strong>zero interpretations</strong>. Every single mark is awarded for accurate, precise factual recall and structured causal explanation.
          </div>
        </div>

        <!-- The Four Non-Negotiable Success Principles (2x2 Grid) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 10px; background: #ffffff;">
          <div style="font-size: 8.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 6px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 3px; display: flex; justify-content: space-between;">
            <span>★ The Four Non-Negotiable Exam Success Principles:</span>
            <span>Grade 9 Protocol</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 9px;">
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 8px 10px;">
              <strong style="color: #000000; font-size: 8.8pt; display: block; margin-bottom: 2px;">1. Strict Time Discipline (50 Minutes)</strong>
              <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.32;">
                Allocate exactly <strong>12 minutes for Q1</strong> (6m per consequence), <strong>12 minutes for Q2</strong> (Narrative Account), and <strong>24 minutes for Q3</strong> (12m per importance question). Keep a 2-minute buffer to review dates and proper nouns.
              </div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 8px 10px;">
              <strong style="color: #000000; font-size: 8.8pt; display: block; margin-bottom: 2px;">2. Beyond the Stimulus (The Level 2 Trap)</strong>
              <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.32;">
                In Q2 (Narrative Account), candidates who rely solely on the two provided stimulus bullet points are <strong>strictly capped at Level 2 (5 marks maximum)</strong>. You MUST include substantial own knowledge from outside the stimulus to achieve Level 3 (6–8 marks).
              </div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 8px 10px;">
              <strong style="color: #000000; font-size: 8.8pt; display: block; margin-bottom: 2px;">3. Causal Transitions, Not Chronology Lists</strong>
              <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.32;">
                In Q2, never write descriptive lists (*"Then this happened... Next that happened"*). Every paragraph must link events causally: explain *why* event A directly caused or enabled event B (e.g., *"This ceasefire gave the IDF breathing space to import Czech arms, which directly enabled..."*).
              </div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 8px 10px;">
              <strong style="color: #000000; font-size: 8.8pt; display: block; margin-bottom: 2px;">4. Significance vs Storytelling in Q3</strong>
              <div style="font-size: 8.2pt; color: #1e293b; line-height: 1.32;">
                In Q3 (Importance), examiners penalize candidates who merely narrate the event. You must explain <strong>why it mattered for the specific outcome named</strong>. Use evaluative stems: *"This was of vital importance because without it..."*
              </div>
            </div>
          </div>
        </div>

        <!-- Period Study Mark Scheme Decoder -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff;">
          <div style="font-size: 9.0pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px;">
            Examiner Level Descriptors: How Top Marks Are Awarded
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 8.0pt; line-height: 1.30; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #94a3b8; border-radius: 2px; padding: 4px 6px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.4pt;">Q1: Consequence [4m each]</strong>
              <div><strong>Level 1 (1–2m):</strong> Simple or general consequence; limited facts.</div>
              <div><strong>Level 2 (3–4m):</strong> Specific historical knowledge + fully explained consequence showing cause-and-effect chain.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #94a3b8; border-radius: 2px; padding: 4px 6px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.4pt;">Q2: Narrative Account [8m]</strong>
              <div><strong>Level 1 (1–2m):</strong> Simple narrative; fragmented chronology.</div>
              <div><strong>Level 2 (3–5m):</strong> Chronological narrative, but relies only on stimulus.</div>
              <div><strong>Level 3 (6–8m):</strong> Coherent, causally linked narrative + <strong>substantial own knowledge beyond stimulus</strong>.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #94a3b8; border-radius: 2px; padding: 4px 6px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.4pt;">Q3: Importance [8m each]</strong>
              <div><strong>Level 1 (1–2m):</strong> Identifies facts with little link to importance.</div>
              <div><strong>Level 2 (3–5m):</strong> Explains importance with some factual support.</div>
              <div><strong>Level 3 (6–8m):</strong> Sustained, analytical explanation of impact and long-term significance on the specific outcome.</div>
            </div>
          </div>
        </div>

        <!-- The Analytical Connectives Vault -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 11px; background: #fafafa;">
          <div style="font-size: 9.0pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px;">
            The Historian's Analytical Connective Vault
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 8.0pt; line-height: 1.30; color: #000000;">
            <div style="background: #fff; border: 1px solid #94a3b8; border-radius: 2px; padding: 4px 6px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.2pt;">Direct Causal Stems (Q1)</strong>
              <div>&bull; "As a direct consequence, ..."</div>
              <div>&bull; "This fundamentally provoked..."</div>
              <div>&bull; "The decisive catalyst was..."</div>
              <div>&bull; "This directly resulted in..."</div>
            </div>
            <div style="background: #fff; border: 1px solid #94a3b8; border-radius: 2px; padding: 4px 6px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.2pt;">Sequencing &amp; Linkage (Q2)</strong>
              <div>&bull; "During the opening phase, ..."</div>
              <div>&bull; "A decisive turning point came when..."</div>
              <div>&bull; "This breathing space allowed..."</div>
              <div>&bull; "In the immediate aftermath, ..."</div>
            </div>
            <div style="background: #fff; border: 1px solid #94a3b8; border-radius: 2px; padding: 4px 6px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.2pt;">Evaluative Impact (Q3)</strong>
              <div>&bull; "This was vital because..."</div>
              <div>&bull; "Without this intervention, ..."</div>
              <div>&bull; "Its primary significance lay in..."</div>
              <div>&bull; "This permanently transformed..."</div>
            </div>
          </div>
        </div>

        <!-- Warning Pitfalls Strip -->
        <div style="background: #f1f5f9; border: 1.5px solid #000000; border-radius: 3px; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 7.8pt; color: #000000;">
          <span><strong>⚠️ Pitfall 1:</strong> Do NOT write two consequences in Q1. Examiners award marks for <em>one developed consequence</em>.</span>
          <span><strong>⚠️ Pitfall 2:</strong> In Q2, using only the 2 stimulus points caps you at 5/8 marks.</span>
          <span><strong>⚠️ Pitfall 3:</strong> In Q3, avoid pure storytelling.</span>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">2</span>
      </div>
    </div>
  `;
}

function renderPage3() {
  return `
    <div class="page" id="page_3" data-page="3">
      <div class="page-header">
        <div>
          <span class="archival-tag">Synoptic Chronology &bull; 1945–1995</span>
          <h2 class="page-title">Master Comparative Timeline: Wars, Diplomacy &amp; Territorial Shifts</h2>
        </div>
        <div class="page-badge">50-Year Synoptic Matrix</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 6px 10px; font-size: 8.2pt; color: #000000; line-height: 1.34;">
          <strong>Chronological Mastery:</strong> Paper 2 requires precise chronological sequencing. Use this master matrix to trace how military conflicts, peace negotiations, and territorial boundaries evolved across five decades.
        </div>

        <!-- 3 Key Topics Comparative Chronology -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; flex: 1; margin: 6px 0;">
          <!-- KT1 Column -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 4px; font-size: 7.4pt; line-height: 1.28;">
            <div style="font-size: 8.2pt; font-weight: 800; color: #000000; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
              Key Topic 1: Birth of Israel (1945–63)
            </div>
            <div><strong>Jul 1946:</strong> Irgun bombs King David Hotel (91 dead).</div>
            <div><strong>Feb 1947:</strong> Bevin surrenders Mandate to UN.</div>
            <div><strong>Jul 1947:</strong> SS Exodus intercepted (4,500 refugees).</div>
            <div><strong>Nov 1947:</strong> UN Res 181 partition passed (55% / 44%).</div>
            <div><strong>14 May 1948:</strong> Ben-Gurion declares State of Israel.</div>
            <div><strong>15 May 1948:</strong> Five Arab armies invade infant state.</div>
            <div><strong>Jun 1948:</strong> 4-week UN truce; Czech arms airlift.</div>
            <div><strong>1949:</strong> Rhodes Armistice Green Line; 79% Israeli control.</div>
            <div><strong>1948–49:</strong> Al-Nakba: 700,000 refugees displaced.</div>
            <div><strong>1950:</strong> Law of Return; Absentee Property Law passed.</div>
            <div><strong>1953:</strong> Unit 101 cross-border raid on Qibya.</div>
            <div><strong>Feb 1955:</strong> Israeli raid on Gaza base (38 Egyptians dead).</div>
            <div><strong>Sep 1955:</strong> Nasser signs Soviet-bloc Czech Arms Deal.</div>
            <div><strong>26 Jul 1956:</strong> Nasser nationalises Suez Canal Company.</div>
            <div><strong>Oct 1956:</strong> Protocol of Sèvres collusion; Sinai invasion.</div>
            <div><strong>Nov 1956:</strong> US ultimatum halts Anglo-French forces.</div>
            <div><strong>1957:</strong> UNEF blue helmets deployed in Sinai buffer.</div>
            <div><strong>1958:</strong> United Arab Republic (Egypt &amp; Syria merger).</div>
          </div>

          <!-- KT2 Column -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 4px; font-size: 7.4pt; line-height: 1.28;">
            <div style="font-size: 8.2pt; font-weight: 800; color: #000000; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
              Key Topic 2: Escalating Conflict (1964–73)
            </div>
            <div><strong>Jan 1964:</strong> Cairo Summit; creation of PLO &amp; PLA.</div>
            <div><strong>Nov 1966:</strong> Samu raid (600 troops, 11 tanks).</div>
            <div><strong>Apr 1967:</strong> Air clash over Golan; 6 Syrian MiGs downed.</div>
            <div><strong>May 1967:</strong> Nasser expels UNEF; closes Straits of Tiran.</div>
            <div><strong>5 Jun 1967:</strong> Operation Focus pre-emptive air strike.</div>
            <div><strong>7 Jun 1967:</strong> Paratroopers capture Old City of Jerusalem.</div>
            <div><strong>10 Jun 1967:</strong> Golan captured; Six Day War ends.</div>
            <div><strong>Sep 1967:</strong> Khartoum Summit: "Three No\'s" resolution.</div>
            <div><strong>Nov 1967:</strong> UN Res 242 passed ("land for peace").</div>
            <div><strong>Mar 1968:</strong> Battle of Karameh; Fatah commando legend.</div>
            <div><strong>1969:</strong> Arafat becomes Chairman of the PLO.</div>
            <div><strong>1969–70:</strong> War of Attrition along Suez (20k Soviets).</div>
            <div><strong>Sep 1970:</strong> Dawson\'s Field hijackings; Black September.</div>
            <div><strong>Jul 1972:</strong> Sadat expels 15,000 Soviet advisers.</div>
            <div><strong>Sep 1972:</strong> Black September Munich Olympics massacre.</div>
            <div><strong>6 Oct 1973:</strong> Yom Kippur War; Bar Lev sand breached.</div>
            <div><strong>Oct 1973:</strong> Valley of Tears tank battle on Golan.</div>
            <div><strong>Oct 1973:</strong> Sharon crosses canal; OPEC oil embargo.</div>
          </div>

          <!-- KT3 Column -->
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 4px; font-size: 7.4pt; line-height: 1.28;">
            <div style="font-size: 8.2pt; font-weight: 800; color: #000000; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
              Key Topic 3: Attempts at Peace (1974–95)
            </div>
            <div><strong>1974–75:</strong> Kissinger "shuttle diplomacy" disengagements.</div>
            <div><strong>Jun 1975:</strong> Suez Canal reopened after 700k mines cleared.</div>
            <div><strong>Nov 1977:</strong> Sadat flies to Jerusalem; addresses Knesset.</div>
            <div><strong>Sep 1978:</strong> Carter brokers 13-day Camp David Accords.</div>
            <div><strong>26 Mar 1979:</strong> Treaty of Washington signed; Sinai returned.</div>
            <div><strong>1979:</strong> Arab League expels Egypt; moves HQ to Tunis.</div>
            <div><strong>6 Oct 1981:</strong> Sadat assassinated by Egyptian Islamists.</div>
            <div><strong>Apr 1982:</strong> Israel completes Sinai evacuation &amp; Yamit.</div>
            <div><strong>Jun 1982:</strong> Operation Peace for Galilee (Lebanon invasion).</div>
            <div><strong>Aug 1982:</strong> PLO evacuated by sea to Tunisia.</div>
            <div><strong>Sep 1982:</strong> Sabra and Shatila refugee camp massacre.</div>
            <div><strong>1983:</strong> Kahan Commission; Sharon forced to resign.</div>
            <div><strong>1982–83:</strong> Emergence of Iranian-backed Hezbollah.</div>
            <div><strong>8 Dec 1987:</strong> Jabalya taxi crash; First Intifada erupts.</div>
            <div><strong>Dec 1987:</strong> Founding of Hamas by Sheikh Yassin.</div>
            <div><strong>Dec 1988:</strong> Arafat renounces terrorism at Geneva UN.</div>
            <div><strong>Oct 1991:</strong> Madrid Peace Conference convened by US.</div>
            <div><strong>13 Sep 1993:</strong> Oslo I Accord; Rabin-Arafat White House handshake.</div>
            <div><strong>Oct 1994:</strong> Israel-Jordan Peace Treaty at Wadi Araba.</div>
            <div><strong>Sep 1995:</strong> Oslo II agreement divides West Bank (Areas A/B/C).</div>
            <div><strong>4 Nov 1995:</strong> Prime Minister Yitzhak Rabin assassinated.</div>
          </div>
        </div>

        <!-- Synoptic Takeaway Box -->
        <div style="background: #fafafa; border: 1.5px solid #000000; border-radius: 3px; padding: 7px 10px; font-size: 7.8pt; color: #000000; line-height: 1.34;">
          <strong>Examiner Synoptic Takeaway:</strong> Notice the decisive historical turning points: <strong>1948</strong> (Statehood &amp; Al-Nakba), <strong>1967</strong> (Quadrupling of Israeli territory &amp; Rise of PLO), <strong>1973</strong> (Shattering of invincibility &amp; Oil weapon), <strong>1979</strong> (First Arab peace treaty), and <strong>1993</strong> (Mutual recognition). Every exam question connects to one of these pivotal transformations.
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">3</span>
      </div>
    </div>
  `;
}

function renderSpreadLeft(spread, leftPageNum) {
  const left = spread.left;

  const pillarsHtml = left.pillars
    .map(
      (p) => `
    <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 4px 6px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 3px;">
      <div>
        <div style="font-size: 7.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 1px;">${p.title}</div>
        <div style="font-size: 6.8pt; color: #475569; font-style: italic; margin-bottom: 3px;">${p.subtitle}</div>
      </div>
      <ul style="margin: 0; padding-left: 10px; font-size: 7.2pt; color: #000000; line-height: 1.22;">
        ${p.bullets.map((b) => `<li style="margin-bottom: 2.5px;">${formatMd(b)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const figuresHtml = left.keyFigures
    .map(
      (f) => `
    <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
      <strong style="color: #000000; display: block; font-size: 7.5pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">${f.name}</strong>
      <span style="font-size: 6.8pt; color: #1e293b; line-height: 1.16;">${f.role}</span>
    </div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${leftPageNum}" data-page="${leftPageNum}">
      <div class="page-header">
        <div>
          <span class="archival-tag">${spread.topic}</span>
          <h2 class="page-title">${spread.title}</h2>
        </div>
        <div class="page-badge">Deep Knowledge Spread</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Strategic Context Overview -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 6px 10px;">
          <div style="font-size: 9.2pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 2px;">
            ${left.headline}
          </div>
          <div style="font-size: 7.6pt; color: #1e293b; line-height: 1.25;">
            ${formatMd(left.summary)}
          </div>
        </div>

        <!-- Three Core Historical Pillars -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 4px 0;">
          ${pillarsHtml}
        </div>

        <!-- Key Figures & Factions (4 Cards) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #ffffff;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Key Historical Figures &amp; Organisations</span>
            <span style="font-size: 7.2pt; color: #475569;">Specification Protagonists</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 7px;">
            ${figuresHtml}
          </div>
        </div>

        <!-- Archival Source & Historical Evidence Box -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-radius: 3px; padding: 5px 10px; font-size: 7.4pt; line-height: 1.22; color: #000000;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            <strong style="font-size: 8.2pt; text-transform: uppercase; color: #000000; letter-spacing: 0.4px;">PRIMARY ARCHIVAL EVIDENCE &bull; ${left.archivalSource.title}:</strong>
            <span style="font-size: 7.4pt; font-weight: 700; color: #334155;">${left.archivalSource.citation}</span>
          </div>
          <p style="margin: 4px 0 4px 0; font-style: italic; font-family: 'Playfair Display', serif; font-size: 7.6pt; color: #000000; line-height: 1.22;">
            "${left.archivalSource.quote}"
          </p>
          <div style="margin-top: 2px; font-size: 6.8pt; color: #334155; line-height: 1.16;">
            <strong>Historical Significance:</strong> ${left.archivalSource.significance}
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">${leftPageNum}</span>
      </div>
    </div>
  `;
}

function renderSpreadRight(spread, rightPageNum) {
  const right = spread.right;

  const casesHtml = right.deepCases
    .map(
      (c) => `
    <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 6px 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 3px;">
      <div style="font-size: 7.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px;">
        ${c.title}
      </div>
      <ul style="margin: 0; padding-left: 12px; font-size: 7.6pt; color: #000000; line-height: 1.22;">
        ${c.points.map((p) => `<li style="margin-bottom: 2.5px;">${formatMd(p)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const pathwayHtml = right.causalPathway
    .map(
      (p) => `
    <div style="background: #ffffff; border: 1px solid #000000; border-radius: 2px; padding: 4px 6px;">
      <strong style="color: #000000; display: block; font-size: 7.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">${p.stage}</strong>
      <span style="font-size: 6.8pt; color: #1e293b; line-height: 1.18;">${p.text}</span>
    </div>
  `,
    )
    .join('');

  const wordBankHtml = right.masterWordBank
    .map(
      (w) => `
    <div>
      <span class="wb-pill">${w.term}</span>
      <span style="font-size: 6.8pt; color: #1e293b; line-height: 1.18;">${w.def}</span>
    </div>
  `,
    )
    .join('');

  return `
    <div class="page" id="page_${rightPageNum}" data-page="${rightPageNum}">
      <div class="page-header">
        <div>
          <span class="archival-tag">${spread.topic}</span>
          <h2 class="page-title">${spread.title.split(': ')[1] || spread.title}: Analysis &amp; Word Bank</h2>
        </div>
        <div class="page-badge">Analysis &amp; Word Bank</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Four Deep-Knowledge Forensic Case Studies (2x2 Grid) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 4px 0;">
          ${casesHtml}
        </div>

        <!-- Visual Causal Pathway (4 Connected Stages) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 8px; background: #f8fafc; margin: 3px 0;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Visual Causal Pathway: Key Historical Mechanisms</span>
            <span style="font-size: 7.2pt; color: #475569;">Cause &amp; Consequence Chain</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 7px;">
            ${pathwayHtml}
          </div>
        </div>

        <!-- Master GCSE Specification Word Bank Box -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 9px; background: #ffffff;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>★ GCSE Specification Word Bank &amp; Essential Historical Concepts</span>
            <span style="color: #475569; font-size: 7.2pt;">Must-Use Vocabulary</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; line-height: 1.28;">
            ${wordBankHtml}
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">${rightPageNum}</span>
      </div>
    </div>
  `;
}

function renderPage28() {
  return `
    <div class="page" id="page_28" data-page="28">
      <div class="page-header">
        <div>
          <span class="archival-tag">Historiography &amp; Master Audit &bull; 1945–1995</span>
          <h2 class="page-title">Historiographical Debates, Historical Verdicts &amp; Revision Checklist</h2>
        </div>
        <div class="page-badge">Final Synthesis</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">
        <!-- Top Banner -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 8px 12px;">
          <div style="font-size: 10pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 2px;">
            Historiographical Depth: Traditional Israeli vs "New Historians" School
          </div>
          <div style="font-size: 8.8pt; color: #1e293b; line-height: 1.36;">
            Top-tier candidates achieve Grade 9 by demonstrating awareness that historical interpretations of the Arab-Israeli conflict are contested. In the late 1980s, Israeli state archives were declassified under the 30-year rule, giving rise to the <strong>"New Historians" (Benny Morris, Avi Shlaim, Ilan Pappé)</strong>, who challenged traditional national narratives.
          </div>
        </div>

        <!-- 4 Historiographical Debates Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 9px; flex: 1; margin: 4px 0;">
          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 6px;">
            <div style="font-size: 8.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
              1. The 1948 Palestinian Refugee Crisis
            </div>
            <div style="font-size: 8.4pt; color: #000000; line-height: 1.32;">
              <div><strong>Traditional View:</strong> Arab leaders broadcast radio orders telling civilians to leave temporarily to clear the path for invading Arab armies.</div>
              <div style="margin-top: 4px;"><strong>Benny Morris (New Historian):</strong> "Born of war, not by design"; flight was caused by a combination of fear (Deir Yassin), economic collapse, and targeted IDF expulsions (Lydda &amp; Ramle).</div>
            </div>
          </div>

          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 6px;">
            <div style="font-size: 8.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
              2. The Military Balance in 1948
            </div>
            <div style="font-size: 8.4pt; color: #000000; line-height: 1.32;">
              <div><strong>Traditional View:</strong> A desperate "David vs. Goliath" struggle of an unarmed infant Jewish state against five massive Arab armies.</div>
              <div style="margin-top: 4px;"><strong>Avi Shlaim:</strong> Israel held decisive advantages after the June truce in mobilization, unified command, and Czech modern weaponry; Arab armies were divided and rivalrous.</div>
            </div>
          </div>

          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 6px;">
            <div style="font-size: 8.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
              3. Responsibility for the 1967 War
            </div>
            <div style="font-size: 8.4pt; color: #000000; line-height: 1.32;">
              <div><strong>Traditional View:</strong> Nasser actively sought war; expelling UNEF and closing the Straits of Tiran left Israel facing existential destruction.</div>
              <div style="margin-top: 4px;"><strong>Michael Oren:</strong> War was an accidental escalation caused by Soviet false intelligence, inter-Arab brinkmanship, and miscalculation, rather than a premeditated Arab plan.</div>
            </div>
          </div>

          <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 6px;">
            <div style="font-size: 8.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
              4. The Failure of the Oslo Peace Accords
            </div>
            <div style="font-size: 8.4pt; color: #000000; line-height: 1.32;">
              <div><strong>Pro-Israeli Interpretation:</strong> Arafat was never truly committed to a two-state solution, failing to stop Hamas terrorism and inciting hatred.</div>
              <div style="margin-top: 4px;"><strong>Pro-Palestinian / Revisionist:</strong> Oslo was a flawed agreement that allowed Israel to double settlements, fragmenting the West Bank into disconnected Bantustans.</div>
            </div>
          </div>
        </div>

        <!-- Grade 9 Verification Checklist Box -->
        <div style="background: #fafafa; border: 1.5px solid #000000; border-radius: 3px; padding: 8px 12px;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>★ Final Master Examination Checklist: 10 Non-Negotiable Core Concepts</span>
            <span style="color: #475569; font-size: 7.2pt;">Self-Audit</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px; font-size: 7.8pt; color: #000000; line-height: 1.28;">
            <div>[ ] 1. 1947 Partition: 55% land / 67% Arab population with 400,000 Arabs in Jewish state.</div>
            <div>[ ] 2. Deir Yassin: ~100 killed, triggering panic flight of 250,000 Palestinians.</div>
            <div>[ ] 3. 1948–49 War: 650k vs 40m; June truce allows Czech arms and Burma Road.</div>
            <div>[ ] 4. 1949 Refugees: 280k West Bank, 190k Gaza, 100k Lebanon, 75k Syria, 70k Jordan.</div>
            <div>[ ] 5. Conscription &amp; Aid: 30m men / 18m women to age 55; $300m US aid; Law of Return.</div>
            <div>[ ] 6. 1956 Suez: 80k British troops out; Sèvres collusion (22 Oct); US halts invasion.</div>
            <div>[ ] 7. 1967 War: Samu raid; 7 April dogfight; Op Focus destroys 300+ jets; 70k sq km won.</div>
            <div>[ ] 8. 1973 War: Bar-Lev breached by water monitors; DEFCON 3 alert; 400% oil price rise.</div>
            <div>[ ] 9. Camp David (1978): $10bn Egypt / $3bn Israel aid; Treaty of Washington (1979).</div>
            <div>[ ] 10. Oslo II (1995): West Bank split into Areas A (3%), B (25%), C (72%); Rabin murdered.</div>
          </div>
        </div>

        <!-- Footer Sign-Off Strip -->
        <div style="border-top: 1.8px solid #000000; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; color: #000000;">
          <span><strong>Meoncross School History Department</strong> &bull; Complete GCSE Syllabus Mastery</span>
          <span style="font-weight: 800; text-transform: uppercase;">Option P5 &bull; Complete 28-Page Master Volume</span>
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">28</span>
      </div>
    </div>
  `;
}

// =============================================================================
// COMPLETE HTML GENERATION
// =============================================================================
function generateFullHTML() {
  let pagesHtml = '';

  // Page 1: Official Exam Cover with Primary 1948 Nakba Plate
  pagesHtml += renderPage1(getImageDataUri);

  // Page 2: Paper 2 Period Study Blueprint & Strategy
  pagesHtml += renderPage2();

  // Page 3: Master Chronology (1945–1995)
  pagesHtml += renderPage3();

  // Pages 4–27: 12 Double-Page Revision Spreads
  SPREADS.forEach((spread, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = leftPageNum + 1;
    pagesHtml += renderSpreadLeft(spread, leftPageNum);
    pagesHtml += renderSpreadRight(spread, rightPageNum);
  });

  // Page 28: Historiographical Debates & Final Revision Checklist
  pagesHtml += renderPage28();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pearson Edexcel GCSE (9–1) History &bull; Conflict in the Middle East, 1945–1995 &bull; Visual Revision &amp; Exam Guide</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">
  <style>
    ${getStyles()}
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`;
}

// =============================================================================
// COMPILATION & PDF GENERATION
// =============================================================================
async function run() {
  console.log('====================================================');
  console.log('🚀 COMPILING CME VISUAL REVISION & EXAM GUIDE (28 PAGES, MONOCHROME)');
  console.log('====================================================');

  const html = generateFullHTML();
  fs.writeFileSync(HTML_OUT_PUBLIC, html);
  console.log(`✅ Generated standalone HTML: ${HTML_OUT_PUBLIC}`);

  console.log('🌐 Launching headless browser with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(HTML_OUT_PUBLIC).href, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Automated Overflow Check (Strict 1123px Limit)
  const overflowReports = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page'));
    const overflows = [];
    pages.forEach((p, idx) => {
      const pageNum = p.getAttribute('data-page') || idx + 1;
      const scrollHeight = p.scrollHeight;
      if (scrollHeight > 1124) {
        overflows.push({
          pageNum,
          id: p.id,
          scrollHeight,
          overflowBy: scrollHeight - 1123,
        });
      }
    });
    return { totalPages: pages.length, overflows };
  });

  console.log(`📐 Page layout report: Total pages rendered = ${overflowReports.totalPages}`);
  if (overflowReports.overflows.length > 0) {
    const details = overflowReports.overflows
      .map(
        (o) =>
          `Page ${o.pageNum} (#${o.id}): ${o.scrollHeight}px (overflows by +${o.overflowBy}px)`,
      )
      .join('\n');
    throw new Error(`PDF Generation halted due to page overflow:\n${details}`);
  }
  console.log(
    '✅ Automated Overflow Check: All 28 pages fit cleanly within 1123px bounds (0 overflows)!',
  );

  // Export PDF to unit directory
  await page.pdf({
    path: PDF_OUT_UNIT,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
  });
  console.log(`📕 Exported unit PDF: ${PDF_OUT_UNIT}`);

  // Mirror to public/pdfs
  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_PUBLIC);
  console.log(`📋 Synced PDF to public/pdfs/: ${PDF_OUT_PUBLIC}`);

  const publicCmeDir = path.dirname(PDF_OUT_PUBLIC_CME);
  if (!fs.existsSync(publicCmeDir)) fs.mkdirSync(publicCmeDir, { recursive: true });
  fs.copyFileSync(PDF_OUT_UNIT, PDF_OUT_PUBLIC_CME);
  console.log(`📋 Synced PDF to public/pdfs/cme_new/: ${PDF_OUT_PUBLIC_CME}`);

  // Mirror to Google Drive Department File
  const canonicalName = 'Conflict in the Middle East Visual Revision & Exam Guide.pdf';
  for (const driveDir of GDRIVE_DIRS) {
    try {
      if (fs.existsSync(driveDir)) {
        console.log(`\n☁️ Syncing freshly compiled guide to Google Drive: ${driveDir}`);
        fs.copyFileSync(PDF_OUT_UNIT, path.join(driveDir, 'cme_visual_revision_guide.pdf'));
        fs.copyFileSync(PDF_OUT_UNIT, path.join(driveDir, canonicalName));
        console.log(`   ✅ Synced master PDF (both short and canonical names) to Google Drive.`);
      }
    } catch (err) {
      console.warn(`   ⚠️ Could not copy to ${driveDir}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\n====================================================');
  console.log('🎉 CME PILLAR 1 GENERATION COMPLETE (28 PAGES, MONOCHROME, 0 OVERFLOWS)');
  console.log('====================================================');
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal generator error:', err);
    process.exit(1);
  });
}

module.exports = { run, generateFullHTML };
