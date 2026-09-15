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
  // ---------------------------------------------------------------------------
  // SPREAD 1 (KT 1.1): BRITISH MANDATE & JEWISH INSURGENCY (1945–47)
  // ---------------------------------------------------------------------------
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
            '**1923 Mandate Dilemma:** The League of Nations Mandate held 3 contradictory terms: (1) protect civil/religious rights of the Arab majority, (2) establish a Jewish national home, (3) prepare the country for independent self-government.',
            '**Demographic Shift & Arab Revolt:** Jewish population doubled by 1931; Britain crushed the 1936–39 Arab Revolt with Haganah aid, leading to the 1937 Peel Commission partition proposal and the restrictive 1939 White Paper (15,000 immigrants/yr).',
            '**The SS Exodus (July 1947):** Over 250,000 Holocaust survivors remained trapped in European DP camps; the Royal Navy intercepted the SS Exodus with 4,500 refugees, forcibly deporting them to Germany and provoking worldwide moral condemnation.',
          ],
        },
        {
          title: 'Armed Insurgency & Sabotage',
          subtitle: 'Guerrilla Strikes vs British Rule',
          bullets: [
            '**Railway & Infrastructure Sabotage:** Jewish underground fighters detonated **153 bombs on railway lines** to paralyze British troop movements, severed telephone communications, and blew up radar posts and oil pipelines.',
            '**Night of the Bridges (June 1946):** Haganah commandos destroyed 11 road and rail bridges linking Palestine to surrounding Arab states, demonstrating complete tactical dominance across the countryside.',
            '**King David Hotel Bombing (22 July 1946):** Irgun detonated milk churns with 225kg of TNT inside British military headquarters, killing **91 people** (British, Arab, Jewish civil servants). Ben-Gurion and the Haganah publicly condemned the Irgun after Begin refused calls to delay the blast.',
          ],
        },
        {
          title: 'British Military Collapse',
          subtitle: 'The Police State & Surrender',
          bullets: [
            '**The Police State & Curfews:** Britain deployed **100,000 soldiers** (1 soldier for every 6 Jews) costing £40 million annually; Tel Aviv and Jerusalem were placed under military curfews inside fortified barbed-wire compounds ("Bevingrad").',
            '**The Sergeants Affair (July 1947):** After Britain hanged 3 Irgun fighters in Acre Prison, Begin retaliated by hanging 2 captured British military intelligence sergeants (Paice and Martin) and booby-trapping their bodies, triggering anti-Jewish riots across Britain.',
            '**UN Referral (18 Feb 1947):** Facing insolvency, domestic calls to "bring the boys home", and US threats to withhold postwar loans, Foreign Secretary Ernest Bevin announced Britain would hand Palestine to the UN without recommending any solution.',
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
          ],
        },
        {
          title: '2. Railway Sabotage (153 Bombs) & King David Hotel',
          points: [
            '**Railway Sabotage:** Underground fighters set **153 bombs on railway lines**, blowing up tracks, locomotives, and signal boxes to restrict British troop deployments.',
            '**King David Hotel Strike (July 1946):** Irgun commandos disguised as Arab milk delivery men planted explosives in the basement; **91 civilians and military staff were killed**.',
            '**Haganah Condemnation:** While initially united under the Hebrew Resistance Movement, Ben-Gurion condemned the Irgun for ignoring evacuation warnings, splitting the underground.',
          ],
        },
        {
          title: '3. SS Exodus (4,500 Survivors) & US Pressure',
          points: [
            '**Blockade Running:** Haganah bought former American passenger ships to run Royal Navy blockades; the SS Exodus carried **4,500 Holocaust survivors** in July 1947.',
            '**Global Moral Outrage:** British destroyers rammed the vessel and forcibly deported refugees back to DP camps in Hamburg, Germany, shocking American public opinion.',
            "**Truman's Ultimatum:** President Truman pressured Britain to admit 100,000 survivors, threatening to withhold crucial $3.75 billion Anglo-American postwar financial loans.",
          ],
        },
        {
          title: '4. The Sergeants Affair & The Bevingrad Police State',
          points: [
            '**Acre Prison Raid (May 1947):** Irgun dynamited the ancient fortress of Acre, freeing 27 underground prisoners; Britain responded by sentencing 3 captured Irgun men to death.',
            '**Sergeants Hanged (July 1947):** Irgun hanged two captured British sergeants (Paice and Martin) in an orange grove and booby-trapped the ground with landmines.',
            '**Domestic Collapse:** The deaths caused anti-Semitic riots in Liverpool and London; British newspapers declared Palestine an "unbearable drain in blood and treasure" (£40m/yr).',
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
        { term: 'Haganah', def: 'Main Jewish paramilitary defense force led by David Ben-Gurion.' },
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

  // ---------------------------------------------------------------------------
  // SPREAD 2 (KT 1.2): UN PARTITION RES 181 & 1948–49 ARAB-ISRAELI WAR
  // ---------------------------------------------------------------------------
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
            '**The Partition Vote:** Passed 29 Nov 1947 (33 to 13, 10 abstentions) dividing Palestine into 3 Jewish segments (55% of land) and 3 Arab segments (under 44% of land); Jerusalem placed under international UN trusteeship.',
            '**The Demographic Imbalance:** Arabs formed **67% (two-thirds) of the population** and owned most cultivated land, but received under 44%; the proposed Jewish state had a demographic trap: **55% Jewish and 45% Arab (400,000 Arabs inside Jewish state borders)**.',
            '**The Economic Union Mandate:** Resolution 181 stipulated that both states must form an Economic Union sharing currency, customs, railways, postal services, and ports; Arab leaders rejected this outright as an imperial imposition.',
          ],
        },
        {
          title: 'Civil War & Deir Yassin Panic',
          subtitle: 'December 1947 – May 1948',
          bullets: [
            '**Arab Liberation Army (ALA):** The Arab League sponsored volunteers under Fawzi al-Qawuqji crossing into Palestine before British withdrawal; Arab militias blockaded 100,000 Jews in Jerusalem.',
            '**Operation Dalet (April 1948):** Haganah plan to secure territory and roads linking Jewish settlements; commanded seizure of strategic Arab villages along the Tel Aviv-Jerusalem corridor.',
            '**Deir Yassin Massacre (9 April 1948):** Irgun and Lehi commandos attacked the village on the road to Jerusalem, killing **around 100 villagers**; Arab radio broadcasts exaggerated the atrocities to rally Arab nations, which backfired by spreading panic and causing **250,000 Palestinians to flee before 15 May 1948**.',
          ],
        },
        {
          title: 'The Five-Army Invasion & Victory',
          subtitle: '15 May 1948 – July 1949',
          bullets: [
            '**Declaration & Invasion:** 14 May 1948 Ben-Gurion proclaimed independence; on 15 May, regular armies of Egypt, Transjordan, Syria, Iraq, and Lebanon invaded. Population: **650,000 Israelis vs 40 million in surrounding Arab nations**.',
            '**The First UN Truce (June 1948):** Mediated by Count Folke Bernadotte (11 June – 8 July); Israel used this breathing space to import vital Czech rifles, machine guns, and fighter aircraft (Operation Balak) and construct the secret "Burma Road" into Jerusalem.',
            '**Unified Command vs Arab Rivalry:** Newly created IDF (28 May 1948) operated under a single unified staff; Arab armies were deeply divided: King Abdullah of Jordan sought only to annex the West Bank, while Egypt and Syria distrusted each other.',
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
          ],
        },
        {
          title: '2. Deir Yassin (100 Dead) & The 250,000 Refugee Wave',
          points: [
            '**Jerusalem Blockade:** Arab forces cut off the supply road to 100,000 Jewish residents in Jerusalem, causing severe starvation and water rationing.',
            '**The Deir Yassin Attack (9 April):** Irgun and Lehi fighters stormed the strategic hillside village; house-to-house fighting and grenade clearing resulted in **around 100 villagers killed**.',
            '**Mass Flight Mechanism:** Broadcasts by Arab radio intended to shame Arab leaders into invading instead triggered widespread panic; **250,000 Palestinians fled their homes before the war formally began on 15 May**.',
          ],
        },
        {
          title: '3. The First UN Truce & The Czech Arms Lifeline',
          points: [
            '**Existential Threat (May 1948):** In the first three weeks, Syrian tanks pushed into Galilee and Egyptian columns reached Ashdod, just 32km south of Tel Aviv.',
            '**The June Truce (11 June – 8 July):** Four-week ceasefire mediated by Count Bernadotte allowed Israel to import 25,000 rifles, 5,000 machine guns, and 25 Avia S-199 fighters from communist Czechoslovakia.',
            '**Burma Road Lifeline:** Israeli engineers secretly carved a mountain bypass road through steep hills, breaking the siege of West Jerusalem and transporting convoys of food and ammunition.',
          ],
        },
        {
          title: '4. Divided Arab Armies vs Unified IDF Structure',
          points: [
            '**650,000 vs 40 Million:** While Arab nations possessed massive demographic superiority, their invading expeditionary forces totaled only 40,000 troops vs 35,000 initial Israeli fighters.',
            '**Inter-Arab Rivalry:** King Abdullah of Transjordan refused to advance beyond the West Bank, having reached an informal understanding with the Jewish Agency, which angered Egypt and Syria.',
            '**IDF Mobilization:** By October 1948, Israel mobilized 100,000 troops under unified national command, launching Operation Yoav in the Negev and Operation Hiram in Galilee to crush Arab forces.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Res 181 Partition (Nov 47)',
          text: 'UN votes 33-13 to partition Palestine; Arabs reject giving 55% land to 33% population with 400k Arabs in Jewish zone.',
        },
        {
          stage: '2. Civil War & Deir Yassin',
          text: 'ALA attacks convoys; Irgun kills ~100 at Deir Yassin; Arab media exaggerates, prompting 250k Palestinians to flee.',
        },
        {
          stage: '3. Declaration & Invasion',
          text: 'Ben-Gurion proclaims Israel (14 May); 5 Arab armies invade 650k Israelis; Arab Legion captures Old City.',
        },
        {
          stage: '4. Czech Arms & IDF Victory',
          text: 'June truce allows Czech arms airlifts & Burma Road; unified IDF offensive pushes Arab forces beyond borders.',
        },
      ],
      masterWordBank: [
        {
          term: 'Resolution 181',
          def: 'UN partition plan (29 Nov 1947) dividing Palestine into Arab and Jewish states.',
        },
        {
          term: 'Corpus Separatum',
          def: 'Special international legal status designated for Jerusalem under the UN.',
        },
        {
          term: '400,000 Arabs in State',
          def: 'Demographic reality of Arabs residing within the proposed 1947 Jewish state.',
        },
        {
          term: 'Arab Liberation Army',
          def: 'Arab League volunteer force under Fawzi al-Qawuqji entering Palestine early 1948.',
        },
        {
          term: 'Operation Dalet',
          def: 'Haganah military plan (April 1948) to secure roads and borders before invasion.',
        },
        {
          term: 'Deir Yassin Massacre',
          def: 'Attack on village on 9 April 1948; ~100 killed, prompting panic flight of 250,000.',
        },
        {
          term: '650k vs 40 Million',
          def: 'Demographic disparity between Israeli population and surrounding Arab nations.',
        },
        {
          term: 'June Truce (1948)',
          def: '4-week ceasefire mediated by Count Bernadotte allowing Israel to rearm.',
        },
        {
          term: 'Czech Arms Airlift',
          def: 'Secret delivery of rifles and Avia fighter planes from Czechoslovakia (Op Balak).',
        },
        {
          term: 'Burma Road',
          def: 'Improvised mountain track constructed to break the Arab siege of Jerusalem.',
        },
        {
          term: 'IDF Creation (28 May)',
          def: 'Ben-Gurion orders dissolution of militias into a unified Israel Defense Forces.',
        },
        {
          term: 'Count Bernadotte',
          def: 'UN mediator who negotiated the first truce; assassinated by Lehi in Sept 1948.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 3 (KT 1.3): REFUGEE CRISIS & BORDER CONFRONTATION (1949–55)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_3',
    spreadNum: 3,
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.3: The Palestinian Refugee Crisis & Border Confrontation (1949–55)',
    left: {
      tag: 'KT 1.3 • The Nakba, Armistices & The Law of Return',
      headline: 'Exile, Armistice & Austerity: The Dual Human Cost of 1948–49',
      summary:
        'The 1948–49 Arab-Israeli War created an enduring refugee tragedy known to Palestinians as Al-Nakba (The Catastrophe), with 700,000 to 750,000 civilians fleeing or expelled from their ancestral homes. The 1949 Rhodes Armistice Agreements established the "Green Line", leaving Israel in control of 79% of mandatory Palestine (a 21% increase over the UN partition). While Jordan annexed the West Bank and Egypt administered Gaza, only 160,000 Arabs remained in Israel out of 900,000. In December 1949, the UN created UNRWA to provide emergency relief for 59 refugee camps. Simultaneously, Israel doubled its population in three years under the Law of Return (July 1950), instituting 30-month male / 18-month female military conscription, enduring severe food rationing, and housing hundreds of thousands in transit tent camps (ma\'abarot) funded by $300 million in US government aid.',
      pillars: [
        {
          title: 'Al-Nakba & Refugee Settlement',
          subtitle: 'The 1949 Regional Distribution',
          bullets: [
            '**The Scale of Displacement:** Between 700,000 and 750,000 Palestinians fled or were expelled; over 400 Arab villages were depopulated and systematically demolished or re-settled.',
            '**Exact 1949 Settlement Breakdown:** Pearson records the exact 1949 refugee settlement numbers: **280,000 in the West Bank (Jordan), 190,000 in the Gaza Strip (Egypt), 100,000 in Lebanon, 75,000 in Syria, and 70,000 in Transjordan**.',
            '**Only 160,000 Remained:** Out of 900,000 Arabs living in the territory that became Israel, only **160,000 remained inside Israeli borders**, living under military administration until 1966. UNRWA was established in Dec 1949 to provide emergency food, schools, and medical care.',
          ],
        },
        {
          title: '1949 Rhodes Armistices',
          subtitle: 'The Green Line & Territorial Shifts',
          bullets: [
            '**The Rhodes Bilateral Treaties:** Mediated by UN diplomat Ralph Bunche on the island of Rhodes (Feb–July 1949) between Israel and Egypt, Lebanon, Jordan, and Syria.',
            '**Territorial Expansion (79% Control):** Israel expanded from 55% under UN Res 181 to **79% of mandatory Palestine**; Transjordan annexed the West Bank and East Jerusalem, while Egypt occupied the narrow Gaza Strip.',
            '**UN Resolution 194 Rejected:** Passed Dec 1948 stating refugees wishing to return and live at peace should be permitted at earliest practicable date or compensated; Israel rejected return, arguing Arab states bore war guilt.',
          ],
        },
        {
          title: 'Israeli Nation-Building & Aid',
          subtitle: "Conscription, Ma'abarot & US Aid",
          bullets: [
            '**Mandatory Conscription (1949):** The 1949 Defence Service Law established compulsory service at age 18: **30 months for males, 18 months for females**, plus annual reserve service up to age **55**.',
            '**Law of Return & Austerity (Tzena):** The July 1950 Law of Return gave every Jew worldwide the right to settle in Israel; 685,000 immigrants arrived in 3 years. Severe rationing of meat, butter, and furniture was imposed.',
            "**Ma'abarot & $300m US Aid:** Immigrants were housed in corrugated tin and canvas transit camps (*ma'abarot*); national bankruptcy was averted by **$300 million in US government grants and loans**, plus American Jewish philanthropy.",
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
          ],
        },
        {
          title: '2. The Rhodes Armistices & The 79% Green Line',
          points: [
            '**Green Line Borders:** The 1949 armistice lines drawn in green grease pencil on maps in Rhodes; never recognized by Arab states as permanent international borders.',
            '**21% Land Gain:** Israel gained Galilee, the coastal plain, and the Negev corridor down to Eilat on the Gulf of Aqaba, securing vital agricultural and maritime depth.',
            '**Absentee Property Law (1950):** Transferred ownership of all land, homes, and bank accounts abandoned by Palestinian refugees to the Israeli Custodian of Absentee Property.',
          ],
        },
        {
          title: '3. IDF Conscription & The "Citizen Army"',
          points: [
            '**Universal Conscription (1949):** At 18, **men served 30 months, women served 18 months**, with mandatory annual reserve service up to age **55**.',
            '**Strategic Imperative:** Surrounded by 40 million hostile neighbors, Israel could not maintain a massive standing army; conscription turned society into a mobile reserve force in 48 hours.',
            '**Social Melting Pot:** The IDF served as the primary instrument for integrating immigrant youths from 70 different languages and cultures into a Hebrew-speaking citizenry.',
          ],
        },
        {
          title: "4. Economic Austerity, Ma'abarot & $300m US Aid",
          points: [
            '**Population Doubled (1948–51):** 685,000 immigrants arrived, including 300,000 Holocaust survivors and 300,000 Sephardic/Mizrahi Jews fleeing Arab states.',
            '**Tzena (Austerity):** Severe food rationing; points books required for meat, eggs, and bread; widespread public unrest over harsh living standards.',
            "**Ma'abarot Tent Camps:** Over 200,000 immigrants housed in overcrowded tin shacks and tents prone to winter flooding; resolved by **$300m in US grants and German reparations (1952)**.",
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

  // ---------------------------------------------------------------------------
  // SPREAD 4 (KT 1.4): NASSER, PAN-ARABISM & SUEZ CRISIS (1956–63)
  // ---------------------------------------------------------------------------
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
            '**Tripartite Assault (Oct–Nov 1956):** Israel launched Operation Kadesh on 29 Oct, capturing Sinai and Sharm el-Sheikh; Britain and France bombed airfields and dropped paratroopers at Port Said on 5 Nov; Egypt sank cement-laden ships blocking the canal.',
          ],
        },
        {
          title: 'US Ultimatum & Aftermath',
          subtitle: 'Superpower Hegemony & The UAR',
          bullets: [
            "**Eisenhower's Ultimatum:** US President Dwight D. Eisenhower was furious at being deceived during the US presidential election; he threatened to crash the British Pound and block IMF loans unless invasion forces withdrew.",
            '**Withdrawal Timeline:** British and French troops withdrew in humiliation on **23 November 1956**; Israel withdrew from Sinai and Gaza in **March 1957** after Eisenhower threatened to cut off US economic aid.',
            '**The United Arab Republic (1958–61):** UNEF peacekeepers were stationed in Sinai to guarantee Israeli shipping through Aqaba; Nasser emerged as a pan-Arab titan, merging Egypt and Syria into the **United Arab Republic (UAR) in 1958**.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Gamal Abdel Nasser',
          role: 'Egyptian President who nationalised the Suez Canal, defied Britain and France, secured Soviet financing for the Aswan Dam, and led the UAR.',
        },
        {
          name: 'Sir Anthony Eden',
          role: 'British Prime Minister who viewed Nasser as a "new Mussolini"; disgraced by US financial pressure and forced to resign in Jan 1957.',
        },
        {
          name: 'David Ben-Gurion',
          role: 'Israeli Prime Minister who signed the secret Sèvres Protocol, captured Sinai, and opened the Straits of Tiran before yielding to US threats.',
        },
        {
          name: 'Dwight D. Eisenhower',
          role: 'US President who halted the Anglo-French-Israeli invasion using financial sanctions, asserting American supremacy in the Middle East.',
        },
      ],
      archivalSource: {
        title: 'President Gamal Abdel Nasser Speech in Alexandria (26 July 1956)',
        citation: 'Egyptian State Information Service Official Broadcast Archives',
        quote:
          'This money is ours! This canal is ours! It was dug by Egyptian hands and 120,000 Egyptians died while building it. We shall run the canal ourselves! The Suez Canal Company is an Egyptian company and it will be run by Egyptians!',
        significance:
          'Signaled the formal nationalisation of the Suez Canal Company, directly challenging Anglo-French imperial prestige and triggering the war.',
      },
    },
    right: {
      tag: 'KT 1.4 • Geopolitical Deep-Dive, Turning Points & Word Bank',
      deepCases: [
        {
          title: '1. The Gaza Raid (38 Dead) & Czech Arms Deal',
          points: [
            '**80,000 British Troops Out:** Nasser secured the 1954 treaty removing British garrison troops from Suez, aiming to focus on domestic economic reform.',
            '**Gaza Humiliation (Feb 1955):** Israeli paratroopers killed 38 Egyptian soldiers at Gaza railway station; Nasser realized Western arms embargoes left Egypt defenseless.',
            '**Soviet Breakthrough:** Nasser purchased 200 MiG-15 jets and T-34 tanks from Czechoslovakia in Sept 1955, breaking Western monopoly and bringing the Cold War into the region.',
          ],
        },
        {
          title: '2. The Secret Protocol of Sèvres (22 Oct 1956)',
          points: [
            '**The Sèvres Villa:** Met in secret near Paris; Ben-Gurion, Selwyn Lloyd (UK), and Christian Pineau (France) signed a pre-arranged timetable for war.',
            '**Pretext of Separation:** Israel would attack across Sinai on 29 Oct; Anglo-French forces would issue an ultimatum demanding both sides withdraw 16km from the canal, then invade.',
            '**Canal Paralyzed:** Egyptian troops sank 40 ships filled with concrete, completely blocking the Suez Canal for months and halting Middle Eastern oil exports to Europe.',
          ],
        },
        {
          title: '3. US Financial Coercion & Withdrawal Dates',
          points: [
            '**The Run on Sterling:** The US refused to allow IMF emergency loans while Britain was losing millions in foreign reserves, forcing Eden to accept a ceasefire on 6 Nov.',
            "**Withdrawal Dates:** British and French forces completed their retreat on **23 November 1956**; Israel held Sinai until **March 1957**, yielding only to Eisenhower's sanctions threat.",
            '**End of Imperial Pretense:** The crisis proved that Britain and France were no longer first-tier world superpowers, leaving the USA and USSR as undisputed regional arbiters.',
          ],
        },
        {
          title: '4. Consequences: UNEF Deployment & The UAR (1958)',
          points: [
            '**UNEF Deployment (1957):** United Nations Emergency Force "blue helmets" stationed on the Egyptian side of the Sinai border and at Sharm el-Sheikh to protect navigation.',
            '**Pan-Arab Triumphalism:** Nasser lost militarily but won a massive political victory; the USSR fully funded and built the Aswan High Dam.',
            '**The United Arab Republic (UAR):** In 1958, Syria requested a political merger with Egypt, creating the UAR under Nasser’s presidency, lasting until Syria seceded in 1961.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Gaza Raid & Czech Arms',
          text: 'Feb 1955 Gaza raid kills 38 Egyptians; Nasser blockades Aqaba and signs Czech Arms Deal for 200 Soviet jets.',
        },
        {
          stage: '2. Dam Funding Cancelled',
          text: 'US cancels $70m Aswan Dam loan; Nasser nationalises Suez Canal on 26 July 1956 to fund dam construction.',
        },
        {
          stage: '3. Sèvres Collusion (22 Oct)',
          text: 'UK, France & Israel secretly sign Sèvres Protocol; Israel invades Sinai; Anglo-French paratroopers land at Port Said.',
        },
        {
          stage: '4. US Halt & UAR (1958)',
          text: 'Eisenhower threatens to crash Sterling; UK/France withdraw 23 Nov; UNEF deploys; Nasser forms UAR in 1958.',
        },
      ],
      masterWordBank: [
        {
          term: 'Free Officers (1952)',
          def: 'Egyptian military movement led by Nasser that overthrew King Farouk.',
        },
        {
          term: '80,000 British Troops',
          def: 'British garrison troops withdrawn from the Suez Canal Zone under 1954 treaty.',
        },
        {
          term: 'Aswan High Dam',
          def: 'Massive engineering project planned by Nasser to provide irrigation and electricity.',
        },
        {
          term: 'Gaza Raid (Feb 1955)',
          def: 'IDF cross-border attack killing 38 Egyptian soldiers, triggering rearmament.',
        },
        {
          term: 'Czech Arms Deal (1955)',
          def: 'Soviet-bloc arms agreement providing Egypt with 200 MiG jets and 300 tanks.',
        },
        {
          term: 'Suez Nationalisation',
          def: 'Nasser’s seizure of the Suez Canal Company on 26 July 1956 to fund the dam.',
        },
        {
          term: 'Protocol of Sèvres',
          def: 'Secret collusion treaty (22 Oct 1956) between Britain, France, and Israel.',
        },
        {
          term: 'Port Said Invasion',
          def: 'Anglo-French paratrooper landings on 5 November 1956 to seize the canal.',
        },
        {
          term: 'Eisenhower Ultimatum',
          def: 'US financial threat to crash the British Pound unless troops withdrew immediately.',
        },
        {
          term: 'Withdrawal (Nov 56 / Mar 57)',
          def: 'Anglo-French retreat on 23 Nov 1956; Israel leaves Sinai in March 1957.',
        },
        {
          term: 'UNEF Blue Helmets',
          def: 'First UN peacekeeping force deployed to Sinai to guarantee maritime security.',
        },
        {
          term: 'UAR (1958–61)',
          def: 'United Arab Republic: political merger of Egypt and Syria under Nasser’s leadership.',
        },
      ],
    },
  },
  ,
  // ---------------------------------------------------------------------------
  // SPREAD 5 (KT 2.1): ROAD TO SIX DAY WAR & JUNE 1967 BLITZKRIEG
  // ---------------------------------------------------------------------------
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
            '**Fatah Raids & Samu Raid (Nov 1966):** Fatah staged **over 70 raids** against Israeli water pumps and railways from Jordan, Syria, and Lebanon (none from Gaza due to UNEF); on 13 Nov 1966, Israel struck back at Samu village with **600 troops, 11 tanks, and 60 vehicles**, killing 15 Jordanian soldiers, 1 Israeli, and 3 villagers.',
            '**7 April 1967 Air Clash:** Syrian artillery fired on an Israeli armored tractor in the demilitarized zone; the IAF shot down **6 Syrian MiG-21s**, flying victoriously directly over Damascus, humiliating the Syrian military regime.',
          ],
        },
        {
          title: 'The May Crisis & Ultimatums',
          subtitle: 'Soviet False Reports & Tiran Closure',
          bullets: [
            '**Soviet False Intelligence (13 May):** Moscow gave Nasser a false intelligence report claiming 10 to 12 Israeli brigades were massing for an invasion of Syria, pressuring Nasser to act.',
            "**Nasser's Escalation (16–22 May):** Nasser expelled UNEF peacekeepers from Sinai, deployed 100,000 troops and 1,000 tanks to the Israeli border, and illegally blockaded the Straits of Tiran, cutting off Israel's oil supply from Iran.",
            '**The 29 May Ultimatums:** Nasser threatened full war unless Israel met two non-negotiable demands: (1) allow all 1948 Palestinian refugees to return, (2) surrender all territory conquered in 1948–49. On 30 May, King Hussein signed an Egyptian-Jordanian defense pact.',
          ],
        },
        {
          title: 'Operation Focus & Tri-Front Rout',
          subtitle: '5–10 June 1967 Blitzkrieg',
          bullets: [
            '**Operation Focus (5 June):** At 7:45 AM, 200 Israeli jets flew low beneath radar; using French runway-cratering bombs, they wiped out **over 300 Egyptian aircraft on the tarmac** in 3 hours, then demolished Syrian and Jordanian airforces.',
            '**Tri-Front Ground Offensive:** IDF ground columns broke Egyptian lines in Sinai reaching Suez (5–8 June); paratroopers captured East Jerusalem and the West Bank (5–7 June); Golan Heights stormed (9–10 June).',
            '**The Staggering Toll & Spoils:** Israel captured **70,000 sq km of territory** (quadrupling its land area); **779 Israeli soldiers were killed vs approximately 20,000 Arab soldiers**; 1 million Palestinians fell under military occupation.',
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
          ],
        },
        {
          title: '2. The April 7 Dogfight & Soviet Disinformation',
          points: [
            '**Damascus Dogfight (7 April 1967):** Syrian gunners fired on an Israeli armored tractor; IAF fighter jets responded by downing **6 Syrian MiG-21s** and buzzing over Damascus.',
            '**Soviet Lie (13 May 1967):** Moscow claimed Israel was preparing to invade Syria; Nasser mobilized 100,000 troops in Sinai to prove he was still leader of the Arab world.',
            '**The 29 May Demands:** Nasser threatened war unless Israel surrendered all 1948 lands and returned all refugees, leaving Prime Minister Eshkol convinced war was inevitable.',
          ],
        },
        {
          title: '3. Operation Focus: Total Air Decapitation (5 June)',
          points: [
            '**Low-Level Flight:** 200 Israeli jets flew 15 meters above the Mediterranean waves beneath Egyptian radar, striking during the morning shift change when pilots were eating breakfast.',
            '**Dibber Bombs:** French rocket-assisted penetration bombs created massive craters in runways, trapping 300 Egyptian aircraft on the tarmac before destroying them.',
            '**Air Supremacy in 4 Hours:** By midday, Egypt, Syria, and Jordan lost 452 aircraft; IDF ground forces operated with complete, unchallenged air support across all fronts.',
          ],
        },
        {
          title: '4. The Spoils: 70,000 sq km & Quadrupled Borders',
          points: [
            '**Casualty Disparity:** 779 Israeli dead vs **~20,000 Arab soldiers killed** (15,000 Egyptians, 6,000 Jordanians, 1,000 Syrians); Arab military prestige lay completely in ruins.',
            '**Quadrupled Land Area:** Israel captured **70,000 sq km of territory**, including the Sinai Peninsula, Gaza Strip, West Bank, Old City of Jerusalem, and Golan Heights.',
            '**Strategic Depth:** For the first time, Israel gained massive buffer territories, insulating Tel Aviv and Jerusalem from surprise artillery bombardment.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Water Wars & Samu (1964–66)',
          text: 'Arab diversion plan bombed; Fatah stages 70 raids; IDF Samu raid (600 troops, 11 tanks) inflames Jordan.',
        },
        {
          stage: '2. Dogfight & Soviet False Alert',
          text: 'IAF downs 6 Syrian MiGs over Damascus; USSR falsely claims Israeli border massing; Nasser expels UNEF.',
        },
        {
          stage: '3. Tiran Blockade & Ultimatums',
          text: 'Nasser closes Straits of Tiran; demands return of 1948 land on 29 May; Dayan appointed Defence Minister.',
        },
        {
          stage: '4. Operation Focus & 6-Day Rout',
          text: 'Pre-emptive strike destroys 300 jets on tarmac; IDF takes Sinai, West Bank & Golan; 70,000 sq km captured.',
        },
      ],
      masterWordBank: [
        {
          term: 'Cairo Conference (1964)',
          def: 'Arab League summit that created the PLO and the Palestine Liberation Army (PLA).',
        },
        {
          term: 'PLA (12,000 troops)',
          def: 'Conventional military wing of the PLO established under Arab state command.',
        },
        {
          term: 'Headwater Diversion',
          def: "Arab project to divert Jordan River tributaries away from Israel's water network.",
        },
        {
          term: 'Samu Raid (Nov 1966)',
          def: 'IDF reprisal raid using 600 troops and 11 tanks into Jordanian West Bank.',
        },
        {
          term: '7 April 1967 Dogfight',
          def: 'Air battle downing 6 Syrian MiG-21s with IAF jets buzzing over Damascus.',
        },
        {
          term: 'Soviet False Intel (13 May)',
          def: 'Fabricated Moscow report claiming Israel was massing troops on Syrian border.',
        },
        {
          term: 'Straits of Tiran',
          def: 'Strategic maritime chokepoint closed by Nasser on 22 May, triggering casus belli.',
        },
        {
          term: '29 May Demands',
          def: "Nasser's ultimatum demanding return of 1948 refugees and all 1948–49 lands.",
        },
        {
          term: 'Operation Focus',
          def: 'Pre-emptive Israeli airstrike on 5 June 1967 destroying 300+ jets on runways.',
        },
        {
          term: '779 vs ~20,000 Dead',
          def: 'Casualty ratio demonstrating total Israeli military dominance in the 1967 war.',
        },
        {
          term: '70,000 sq km Captured',
          def: "Vast territorial conquest (Sinai, Gaza, West Bank, Golan) quadrupling Israel's size.",
        },
        {
          term: 'Motta Gur',
          def: 'Paratrooper brigade commander who announced the capture of the Western Wall.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 6 (KT 2.2): THE 1967 AFTERMATH: OCCUPIED TERRITORIES & RES 242
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_6',
    spreadNum: 6,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.2: The 1967 Aftermath: Occupied Territories & UN Res 242',
    left: {
      tag: 'KT 2.2 • Occupation, Khartoum Summit & Resolution 242',
      headline: 'The Dilemmas of Conquest: Occupied Lands, Khartoum & Resolution 242',
      summary:
        'The Six Day War transformed Israel from an insecure coastal state into an undisputed regional superpower with 350% more land. However, conquest created profound strategic and humanitarian dilemmas: Israel now controlled 1 million Palestinian Arabs across the West Bank and Gaza Strip, alongside the strategic Golan Heights and Sinai Peninsula. In the war\'s wake, 300,000 Palestinians fled the West Bank into Jordan, while Israel highlighted its absorption of 618,500 Jewish refugees from Arab states. In September 1967, Arab League leaders issued the defiant "Three No\'s" at the Khartoum Summit. In response, the UN Security Council passed Resolution 242 on 22 November 1967, establishing the foundational "land for peace" formula, though deliberate linguistic ambiguities between the English and French texts left its implementation contested for decades.',
      pillars: [
        {
          title: 'The Occupied Lands Matrix',
          subtitle: 'Strategic & Economic Value',
          bullets: [
            '**Golan Heights (Syria):** High volcanic plateau home to 100,000 Syrians (mostly displaced); secured freshwater tributaries of the Jordan River and eliminated Syrian artillery shelling of Galilee kibbutzim.',
            '**West Bank & East Jerusalem (Jordan):** Home to 600,000 Palestinians; fertile agricultural land next to River Jordan; East Jerusalem and the Old City holy sites were formally annexed into sovereign municipal borders.',
            "**Sinai & Gaza (Egypt):** Gaza (350,000 Palestinians) eliminated Fedayeen staging grounds; Sinai contained Egypt's only oil reserves, blocked Egypt from using the Suez Canal, secured Aqaba shipping, and provided a 60,000 sq km buffer.",
          ],
        },
        {
          title: 'The Double Refugee Reality',
          subtitle: 'West Bank Flight vs Jewish Influx',
          bullets: [
            '**300,000 West Bank Refugees:** During the 1967 war, around **300,000 Palestinians fled the West Bank**, moving into 6 new emergency refugee camps in Jordan; Arab states insisted Israel must rehome and compensate them.',
            '**618,500 Jewish Refugees:** Israel highlighted that since 1948 it had permanently absorbed and integrated **618,500 Jewish refugees forcibly displaced or expelled from Arab nations** (Iraq, Yemen, Egypt, Syria, Morocco).',
            '**Annexation vs Military Occupation:** Israel annexed East Jerusalem immediately on religious and historical grounds; all other conquered lands (Sinai, Gaza, West Bank, Golan) were placed under strict IDF military administration.',
          ],
        },
        {
          title: 'Khartoum Summit & Res 242',
          subtitle: 'The "Three No\'s" vs "Land for Peace"',
          bullets: [
            '**Khartoum Arab Summit (Sept 1967):** Shattered Arab leaders met in Sudan and issued the uncompromising **"Three No\'s": No peace with Israel, No recognition of Israel, No negotiation with Israel**; oil-rich states funded front-line armies.',
            '**UN Resolution 242 (22 Nov 1967):** Adopted unanimously; called for withdrawal of Israeli armed forces from territories occupied in recent conflict, termination of belligerency, and freedom of international navigation.',
            '**The Palestinian Omission:** Resolution 242 referred to Palestinians purely as "the refugee problem", offering humanitarian resettlement without acknowledging their national identity or right to statehood.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Lord Caradon',
          role: 'British Ambassador to the UN who drafted Resolution 242, deliberately omitting the word "the" to create constructive ambiguity.',
        },
        {
          name: 'Gamal Abdel Nasser',
          role: 'Signed the Khartoum Summit resolution rejecting direct peace talks, while accepting Soviet arms to rebuild the Egyptian military.',
        },
        {
          name: 'Levi Eshkol',
          role: 'Israeli Prime Minister who offered in June 1967 to return Sinai and Golan for full bilateral peace treaties, which Khartoum rejected.',
        },
        {
          name: 'Yigal Allon',
          role: 'Deputy Prime Minister who authored the Allon Plan, advocating security annexations in the Jordan Valley while returning populated areas.',
        },
      ],
      archivalSource: {
        title: 'UN Security Council Resolution 242 (22 November 1967)',
        citation: 'United Nations Official Document S/RES/242',
        quote:
          'Emphasizing the inadmissibility of the acquisition of territory by war and the need to work for a just and lasting peace in which every State in the area can live in security... Affirms that the fulfillment of Charter principles requires the withdrawal of Israel armed forces from territories occupied in the recent conflict...',
        significance:
          'Became the international legal cornerstone of all future Arab-Israeli peace diplomacy ("land for peace"), despite conflicting linguistic interpretations.',
      },
    },
    right: {
      tag: 'KT 2.2 • Territorial Analysis, Legal Ambiguities & Word Bank',
      deepCases: [
        {
          title: '1. Strategic Breakdown of the Five Occupied Territories',
          points: [
            '**Golan Heights:** Vital fresh water springs feeding the Sea of Galilee; volcanic ridges provided military high ground and defensive depth.',
            '**Sinai Peninsula:** Provided 60,000 sq km of buffer space; gave Israel control of Abu Rudeis oilfields and unhindered trade through the Straits of Tiran.',
            '**West Bank & Gaza:** Placed 950,000 Palestinians under IDF military governorates; ended Fedayeen incursions but created a permanent demographic challenge.',
          ],
        },
        {
          title: '2. The Double Refugee Displacements (1948–67)',
          points: [
            '**300,000 New Displaced Persons:** The 1967 war created a second wave of Palestinian refugees; 300,000 crossed the Jordan River into overcrowded UNRWA camps.',
            '**618,500 Jewish Refugees:** Israel argued that Arab states bore responsibility for absorbing Palestinian refugees, just as Israel had absorbed 618,500 Jewish refugees from Arab lands.',
            '**East Jerusalem Annexation:** Israel unified Jerusalem, granting Arab residents permanent municipal residency cards, but denying automatic national citizenship.',
          ],
        },
        {
          title: '3. The Linguistic Battle: English vs French Text',
          points: [
            '**English Text (Lord Caradon):** Mandated withdrawal from *"territories occupied"* (omitting the definite article "the"), meaning Israel was not required to withdraw from all lands.',
            '**French Text:** Read *"de tous les territoires"* (from all the territories); backed by Arab states and the USSR to demand full retreat to 4 June 1967 lines.',
            '**Conditionality:** Israel maintained that withdrawal was strictly conditional on Arab states granting full diplomatic recognition and secure, recognized boundaries.',
          ],
        },
        {
          title: '4. The Allon Plan & The Beginnings of Settlements',
          points: [
            '**Security Perimeter:** Formulated by Yigal Allon in 1967; proposed permanent Israeli annexation of a 15km strip along the Jordan Valley and Greater Jerusalem.',
            '**Arab Autonomy:** Envisioned returning densely populated Palestinian urban areas (Nablus, Hebron) to Jordanian civil administration ("the Jordanian Option").',
            '**Early Settlements:** First post-1967 Jewish settlements established at Kfar Etzion in the West Bank and in the Golan Heights, laying roots for the religious settler movement.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Six Day War Conquests',
          text: 'Israel captures Golan, Sinai, West Bank, Gaza & East Jerusalem; 1m Palestinians fall under military control.',
        },
        {
          stage: '2. Dual Refugee Movements',
          text: '300k Palestinians flee West Bank into Jordan; Israel notes its absorption of 618,500 Jewish refugees from Arab lands.',
        },
        {
          stage: '3. Khartoum "Three No\'s"',
          text: 'Arab states reject defeat: "No peace, no recognition, no negotiation"; pledge to finance front-line armies.',
        },
        {
          stage: '4. UN Resolution 242',
          text: 'Resolution 242 establishes "land for peace"; deliberate ambiguity over "the territories" sparks decades of debate.',
        },
      ],
      masterWordBank: [
        {
          term: 'UN Resolution 242',
          def: 'Foundational 1967 UN resolution establishing the "land for peace" negotiating formula.',
        },
        {
          term: 'Lord Caradon',
          def: 'British UN diplomat who drafted the ambiguous wording of Resolution 242.',
        },
        {
          term: 'Khartoum Summit (1967)',
          def: 'Arab League meeting issuing the "Three No\'s" (no peace, recognition, or negotiation).',
        },
        {
          term: "Three No's",
          def: 'Defiant Arab resolution refusing peace, recognition, or direct negotiations with Israel.',
        },
        {
          term: '300,000 Fled West Bank',
          def: 'Scale of Palestinian civilian displacement across the Jordan River in the 1967 war.',
        },
        {
          term: '618,500 Jewish Refugees',
          def: 'Number of Jewish refugees absorbed into Israel from Arab states after 1948.',
        },
        {
          term: 'Golan Water Sources',
          def: 'Strategic freshwater tributaries of River Jordan controlled by holding the Golan Heights.',
        },
        {
          term: 'Sinai Oil Reserves',
          def: 'Egyptian oilfields captured by Israel, providing domestic fuel and economic leverage.',
        },
        {
          term: 'East Jerusalem Annexation',
          def: 'Extension of Israeli sovereign law over the Old City and holy sites on 27 June 1967.',
        },
        {
          term: 'Allon Plan',
          def: '1967 Israeli strategic proposal to annex the Jordan Valley while returning populated cities.',
        },
        {
          term: 'Linguistic Ambiguity',
          def: 'Dispute over whether Res 242 required withdrawal from "all" or "some" occupied lands.',
        },
        {
          term: 'Refugee Problem Clause',
          def: 'Article in Res 242 treating Palestinians as displaced persons rather than a nation.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 7 (KT 2.3): PALESTINIAN RESISTANCE & BLACK SEPTEMBER (1968–72)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_7',
    spreadNum: 7,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.3: The Rise of Palestinian Resistance, Fatah & Black September (1964–72)',
    left: {
      tag: "KT 2.3 • Karameh, Dawson's Field & Munich 1972",
      headline: 'The Guerrilla Shift: Karameh, Black September & Munich Olympics',
      summary:
        "The crushing defeat of conventional Arab armies in 1967 convinced Palestinians that they had to liberate their homeland through independent armed struggle. Yasser Arafat's Fatah gained legendary status at the Battle of Karameh (March 1968), propelling him to the PLO chairmanship in 1969. Simultaneously, the War of Attrition (1969–70) along the Suez Canal saw 20,000 Soviet troops and 80 SAM missile bases deploy to Egypt, displacing 1.5 million Egyptian civilians and killing ~1,000 Israeli soldiers. However, radical groups like George Habash's PFLP hijacked international aircraft, climaxing in the September 1970 Dawson's Field hijackings. King Hussein deployed the Arab Legion during \"Black September\" to crush the PLO in 10 days of heavy fighting, expelling them to Lebanon. In response, the Black September splinter group murdered 11 Israeli athletes at the 1972 Munich Olympics, provoking Golda Meir's retaliatory Operation Wrath of God.",
      pillars: [
        {
          title: 'War of Attrition (1969–70)',
          subtitle: 'Soviet Pilots & Suez Shelling',
          bullets: [
            '**Canal Artillery War:** Nasser launched daily artillery bombardments across the Suez Canal to prevent Israel from entrenching along the sand ramparts of the Bar-Lev Line.',
            '**Direct Soviet Military Intervention:** Moscow sent **20,000 Soviet troops and 80 advanced SAM missile batteries**; Soviet pilots flew combat sorties directly against Israeli Phantom jets over the canal.',
            '**Devastating Toll:** Israel bombed Egyptian cities, factories, and oil refineries; **over 1.5 million Egyptian civilians were evacuated** from Suez cities, and **around 1,000 Israeli soldiers were killed** before the US brokered a ceasefire in Aug 1970. Nasser died of a heart attack on 28 Sept 1970; Anwar Sadat succeeded him.',
          ],
        },
        {
          title: 'Karameh & Black September (1970)',
          subtitle: "Dawson's Field & Jordan Expulsion",
          bullets: [
            "**Battle of Karameh (March 1968):** Following a school bus bombing, the IDF raided Fatah's base at Karameh in Jordan; Fatah fighters fought fiercely alongside Jordanian artillery; Arafat claimed a symbolic victory and became PLO Chairman in 1969.",
            "**Dawson's Field Hijackings (Sept 1970):** The PFLP hijacked 4 airliners, forcing 3 to land at Dawson's Field (Jordan) and 1 in Cairo; they held **56 Jewish passengers hostage** and blew up the empty planes on 12 Sept, directly challenging King Hussein's royal authority.",
            '**Expulsion from Jordan (Black September):** King Hussein declared martial law on 16 Sept 1970; the Arab Legion engaged the PLO in **10 days of intense urban warfare**; by July 1971, King Hussein totally expelled the PLO to Lebanon, where they established new headquarters in Beirut.',
          ],
        },
        {
          title: 'Munich Olympics & Retaliation',
          subtitle: '5 Sept 1972 & Wrath of God',
          bullets: [
            '**The Munich Attack (5 Sept 1972):** 8 Black September militants stormed the Olympic Village, killing 2 Israeli athletes and taking 9 hostage; they demanded the release of **234 Palestinian prisoners held in Israel** and 2 German militants.',
            '**Airfield Disaster & Letter Bombs:** A botched German police rescue at Fürstenfeldbruck airfield resulted in all 9 hostages being killed; weeks later, **51 parcel bombs were sent to Israeli diplomats** worldwide (1 killed in London).',
            '**Operation Wrath of God:** Prime Minister Golda Meir authorized a secret Mossad hit squad ("Committee X") to track down and assassinate every Black September and PLO operative linked to the Munich massacre across Europe and Beirut.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Yasser Arafat (Abu Ammar)',
          role: 'Founder of Fatah who achieved heroic stature at Karameh; elected Chairman of the PLO in 1969, unifying Palestinian guerrilla resistance.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'Ruler of Jordan who launched the Black September military offensive to destroy the PLO "state-within-a-state" and protect his throne.',
        },
        {
          name: 'George Habash',
          role: 'Christian doctor and Marxist leader of the PFLP who pioneered international aircraft hijackings to force the Palestinian question into world headlines.',
        },
        {
          name: 'Golda Meir',
          role: "Israeli Prime Minister who rejected hostage negotiations at Munich and authorized Mossad's covert Operation Wrath of God assassinations.",
        },
      ],
      archivalSource: {
        title: 'Yasser Arafat Statement on the Battle of Karameh (March 1968)',
        citation: 'Voice of Palestine Radio Broadcast, Central Archives',
        quote:
          'What we did at Karameh was to shatter the myth of the invincible Israeli army... We have proved that armed struggle is the only path to the liberation of our homeland and the dignity of our people.',
        significance:
          'Transformed the PLO into a mass movement, inspiring tens of thousands of young fedayeen volunteers across the Arab diaspora.',
      },
    },
    right: {
      tag: 'KT 2.3 • Forensic Case Studies, Terror Dynamics & Word Bank',
      deepCases: [
        {
          title: '1. The War of Attrition (20k Soviets & 1.5m Displaced)',
          points: [
            '**Bar-Lev Ramparts:** Israel built 35 fortified bunkers along the Suez Canal; Nasser responded with massive artillery saturation to exhaust Israeli manpower.',
            '**Direct Soviet Intervention:** 20,000 Soviet personnel operated 80 SAM-2 and SAM-3 missile sites; in July 1970, Israeli jets ambushed and shot down 5 Soviet-piloted MiG-21s.',
            '**Civilian Displacement:** Israeli deep-penetration bombing into the Nile Delta forced **1.5 million Egyptian civilians** to flee damaged canal zone cities.',
          ],
        },
        {
          title: "2. The Dawson's Field Hijackings (Sept 1970)",
          points: [
            '**Coordinated Air Piracy:** PFLP hijacked 4 commercial jetliners (TWA, Swissair, BOAC, Pan Am); 3 aircraft forced to land at an abandoned desert airstrip in Zarqa, Jordan.',
            '**56 Jewish Hostages:** Hostages segregated by religion and nationality; non-Jewish passengers released, while 56 Jewish passengers were held hostage in desert heat.',
            '**Direct Challenge to Sovereignty:** PFLP blew up the multi-million dollar airliners in front of international TV cameras, proving King Hussein had lost control of his nation.',
          ],
        },
        {
          title: '3. Black September Civil War & Expulsion (1970–71)',
          points: [
            '**State-Within-a-State:** PLO guerrillas carried weapons openly in Amman, ran checkpoints, and refused to obey Jordanian law, threatening the Hashemite monarchy.',
            '**10 Days of Ferocious Urban War:** On 16 Sept 1970, the Arab Legion attacked PLO headquarters; thousands died; Syrian tank columns intervened but were driven off by Jordanian airstrikes.',
            '**Relocation to Beirut:** By July 1971, King Hussein totally expelled all PLO guerrillas to Lebanon, where they built "Fatahland" in southern refugee camps.',
          ],
        },
        {
          title: '4. The Munich Olympics Massacre & Wrath of God',
          points: [
            '**234 Prisoners Demanded:** 8 Black September terrorists took 9 Israeli athletes hostage in Munich; German police attempted an ambush with snipers lacking radios or night-vision.',
            '**Airfield Slaughter (5 Sept 1972):** A terrorist tossed a grenade into a helicopter packed with bound hostages; all 9 Israeli hostages, 5 terrorists, and 1 German policeman were killed.',
            '**Operation Wrath of God:** Mossad agents assassinated 11 targeted operatives across Rome, Paris, and Athens; in 1973, commandos under Ehud Barak stormed Beirut to kill PLO leaders.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. War of Attrition (1969–70)',
          text: 'Artillery duels along Suez; 20k Soviet troops deploy; 1.5m Egyptians displaced; ~1,000 Israeli soldiers killed.',
        },
        {
          stage: '2. Karameh & Fatah Legend',
          text: 'Fatah fights IDF at Karameh (1968); Arafat elected PLO Chairman; fedayeen establish state-within-a-state in Jordan.',
        },
        {
          stage: "3. Dawson's Field & Black Sept",
          text: 'PFLP blows up 3 jetliners; King Hussein launches 10 days of urban war; PLO expelled to Lebanon by July 1971.',
        },
        {
          stage: '4. Munich & Wrath of God',
          text: 'Black September kills 11 at Munich; 51 letter bombs sent; Golda Meir orders Mossad covert assassination campaign.',
        },
      ],
      masterWordBank: [
        {
          term: 'War of Attrition (1969–70)',
          def: 'Canal artillery conflict killing ~1,000 Israelis and displacing 1.5m Egyptians.',
        },
        {
          term: '20,000 Soviet Troops',
          def: 'Soviet personnel deployed to operate 80 SAM missile sites along the Suez Canal.',
        },
        {
          term: 'Battle of Karameh (1968)',
          def: 'IDF raid on Jordan where fierce Palestinian resistance made Arafat a legend.',
        },
        {
          term: 'PFLP (George Habash)',
          def: 'Marxist militant faction pioneering international aircraft hijackings.',
        },
        {
          term: "Dawson's Field (1970)",
          def: 'Desert runway in Jordan where PFLP blew up 3 hijacked international airliners.',
        },
        {
          term: '56 Jewish Hostages',
          def: 'Passengers held hostage in Jordan desert while non-Jews were released.',
        },
        {
          term: 'Black September (1970)',
          def: '10 days of ferocious fighting where King Hussein expelled the PLO to Lebanon.',
        },
        {
          term: 'Munich Olympics (1972)',
          def: 'Terrorist attack killing 11 Israeli athletes; demanded 234 Palestinian prisoners.',
        },
        {
          term: '234 Palestinian Prisoners',
          def: 'Number of prisoners demanded by Black September during the Munich hostage siege.',
        },
        {
          term: '51 Parcel Bombs',
          def: 'Explosive mail sent to Israeli embassies worldwide post-Munich, killing 1 in London.',
        },
        {
          term: 'Operation Wrath of God',
          def: 'Covert Mossad targeted assassination campaign authorized by PM Golda Meir.',
        },
        {
          term: 'Anwar Sadat',
          def: 'Succeeded Nasser as Egyptian President on 28 Sept 1970; charted a new strategy.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 8 (KT 2.4): THE WAR OF ATTRITION & YOM KIPPUR WAR (1973)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_8',
    spreadNum: 8,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.4: The War of Attrition & The Yom Kippur War (October 1973)',
    left: {
      tag: 'KT 2.4 • Operation Badr, Bar Lev Breach & The Oil Crisis',
      headline: 'Surprise, Water Monitors & Superpower Brinkmanship: The 1973 War',
      summary:
        "Following frustrated diplomatic overtures, Egyptian President Anwar Sadat prepared for war to break the geopolitical stalemate. In July 1972, Sadat expelled 15,000 Soviet military advisers to regain strategic independence, secured Saudi financial subsidies, and forged a joint war plan with Syria. On 6 October 1973 (Yom Kippur and Ramadan), Egypt and Syria launched a devastating surprise attack. Egyptian engineers used 450 high-pressure water monitors to wash away the 20-meter Bar-Lev sand rampart in under two hours, while Syrian armor stormed the Golan Heights. Israel rallied through US Operation Nickel Grass airlifts, and General Sharon crossed the Suez Canal, trapping Egypt's Third Army. When Moscow threatened unilateral military intervention, the US raised readiness to DEFCON 3 nuclear alert. The war shattered Israel's myth of invincibility, prompted an OAPEC oil embargo that quadrupled oil prices (up 400%), and compelled the US to pursue active peace diplomacy.",
      pillars: [
        {
          title: "Sadat's Plan & Preparation",
          subtitle: 'Expulsion of Soviets & Saudi Alliance',
          bullets: [
            '**Expulsion of 15,000 Soviets (July 1972):** Sadat expelled 15,000 Soviet advisers because Moscow withheld offensive weapons and urged caution, giving Egypt operational independence.',
            '**Alliance with Saudi Arabia & Syria:** Sadat allied with President Hafez al-Assad of Syria and King Faisal of Saudi Arabia, securing vital financial subsidies and a pledge to use the "oil weapon".',
            '**Deception & Israeli Hubris (Conception):** Israel’s intelligence chief Eli Zeira believed the "Conception"—that Egypt would never attack without long-range bombers; Israel dismissed repeated Egyptian military build-ups along the canal as routine exercises.',
          ],
        },
        {
          title: 'Operation Badr & Bar Lev Breach',
          subtitle: 'The 6 October Surprise Attack',
          bullets: [
            '**The Surprise Assault (2:00 PM, 6 Oct):** Launched on Yom Kippur (holiest Jewish fast day) and during Ramadan; 8,000 Egyptian infantry crossed the canal in the first 20 minutes under a massive 2,000-gun artillery barrage.',
            '**Water Monitors Breach the Ramparts:** Egyptian engineers deployed **450 high-pressure water pumps** to blast 3 million cubic meters of sand into the water, cutting 60 breaches in the 20-meter Bar-Lev sand wall in under 2 hours.',
            '**SAM Missile Umbrella:** Soviet-supplied SAM-6 surface-to-air missiles and man-portable Sagger anti-tank wire-guided missiles decimated initial Israeli armored and air counter-attacks, establishing 5 bridgeheads.',
          ],
        },
        {
          title: 'Turning the Tide & DEFCON 3',
          subtitle: "Sharon's Crossing & Nuclear Alert",
          bullets: [
            '**Valley of Tears (Golan):** 100 Israeli Centurion tanks held off 1,400 Syrian tanks for 4 days in brutal combat before counter-attacking to within 40km of Damascus.',
            '**Operation Nickel Grass Airlift:** On 14 October, President Nixon ordered an emergency US military airlift, flying **22,000 tons of tanks, artillery, and electronic gear** directly into Israeli airbases.',
            '**Sharon Crosses Suez & DEFCON 3:** On 16 Oct, Ariel Sharon found a gap between Egyptian armies, bridged the canal, and encircled the Egyptian Third Army (20,000 troops); when USSR threatened troop deployments, the US went on **DEFCON 3 nuclear alert** before a ceasefire took effect on 24 Oct.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Anwar Sadat',
          role: 'Egyptian President who conceived Operation Badr, restored Arab military honor, and leveraged the war to initiate direct peace negotiations.',
        },
        {
          name: 'Golda Meir',
          role: 'Israeli Prime Minister who faced existential crisis, delayed pre-emptive strike to secure US diplomatic backing, and resigned post-war.',
        },
        {
          name: 'Moshe Dayan',
          role: 'Defence Minister whose confidence collapsed during the opening days ("destruction of the Third Temple"); criticized heavily by Agranat Commission.',
        },
        {
          name: 'Henry Kissinger',
          role: 'US Secretary of State who organized Operation Nickel Grass airlift and mediated the ceasefires, initiating "shuttle diplomacy".',
        },
      ],
      archivalSource: {
        title: 'Prime Minister Golda Meir Address to the Knesset (23 October 1973)',
        citation: 'Knesset Records, Special Emergency War Session',
        quote:
          'We have never suffered such a bitter blow... Our losses are heavy, very heavy. But our forces have stemmed the onslaught, driven the enemy back, and are now fighting across the Suez Canal and deep within Syria.',
        significance:
          "Acknowledged the unprecedented scale of Israeli casualties (over 2,600 dead), publicly signaling the end of Israel's military invincibility.",
      },
    },
    right: {
      tag: 'KT 2.4 • Tactical Deep-Dive, Superpower Dynamics & Word Bank',
      deepCases: [
        {
          title: '1. Expulsion of 15,000 Soviets & The Saudi Lifeline',
          points: [
            '**July 1972 Expulsion:** Sadat ordered 15,000 Soviet military technicians out of Egypt; this convinced Israeli intelligence that Egypt was militarily unready for war.',
            '**Saudi Financial Underwriting:** King Faisal provided $400 million in low-interest loans and agreed to coordinate oil production cuts to support the front-line attack.',
            '**Hafez al-Assad Alliance:** Egypt and Syria secretly synchronized operational watches, agreeing to attack at 2:00 PM with the sun behind Egyptian gunners.',
          ],
        },
        {
          title: '2. The High-Pressure Water Monitor Engineering Feat',
          points: [
            '**The Sand Wall Barrier:** Israel spent $300m building a 20-meter high, 55-degree sand wall along the canal designed to withstand conventional high explosives.',
            '**Engineering Breakthrough:** Egyptian General Baki Zaki Youssef adapted British firefighting water monitors; water pumps blasted gaps through the sand ramparts in 90 minutes.',
            '**Bridging the Canal:** Egyptian engineers laid 10 pontoon bridges, transferring 100,000 troops, 1,000 tanks, and 13,500 vehicles into Sinai within 24 hours.',
          ],
        },
        {
          title: '3. Operation Nickel Grass & The DEFCON 3 Nuclear Stand-Off',
          points: [
            '**Emergency Airlift:** Nixon dispatched C-5 Galaxy transports carrying 22,000 tons of supplies; Soviet Union conducted an equivalent massive airlift to Syria and Egypt.',
            "**Sharon's Counter-Crossing:** Ariel Sharon's division crossed the canal on 16 Oct, cutting supply lines and trapping 20,000 troops of Egypt's Third Army in Sinai.",
            '**Superpower Nuclear Alert:** Soviet Premier Brezhnev warned Nixon that USSR would send troops to enforce the ceasefire; US placed global nuclear forces on **DEFCON 3** alert until Moscow backed down.',
          ],
        },
        {
          title: '4. The OAPEC Oil Weapon: The 400% Price Shock',
          points: [
            '**The Oil Embargo:** On 17 Oct 1973, Arab oil ministers imposed an embargo on the US, Netherlands, and allies, cutting monthly oil production by 25%.',
            '**Quadrupled Oil Prices (400% Rise):** The price of crude oil skyrocketed from $3 to nearly $12 per barrel, triggering severe global inflation, factory closures, and petrol rationing.',
            '**Diplomatic Transformation:** The oil shock proved Arab collective economic power, forcing US foreign policy to shift from unilateral support for Israel toward active regional diplomacy.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Soviet Expulsion & Secret Pact',
          text: 'Sadat expels 15k Soviet advisers; secures Saudi subsidies and coordinates 2-front surprise attack with Syria.',
        },
        {
          stage: '2. Operation Badr & Bar Lev Breach',
          text: '450 water monitors blast through sand wall in 2 hours; 100k Egyptian troops cross Suez under SAM missile umbrella.',
        },
        {
          stage: '3. US Airlift & Sharon Crossing',
          text: 'US airlifts 22k tons of arms; Sharon crosses canal and encircles Third Army; US goes to DEFCON 3 nuclear alert.',
        },
        {
          stage: '4. Invincibility Shattered & Oil Shock',
          text: 'Myth of invincibility broken (2,600 dead); OAPEC embargo quadruples oil prices (400%); forces US active diplomacy.',
        },
      ],
      masterWordBank: [
        {
          term: 'Operation Badr (1973)',
          def: 'Egyptian surprise military assault across the Suez Canal on 6 October 1973.',
        },
        {
          term: '15,000 Soviet Advisers',
          def: 'Soviet personnel expelled by Sadat in July 1972 to regain operational freedom.',
        },
        {
          term: '450 Water Monitors',
          def: 'High-pressure water pumps used to breach the 20m Bar-Lev sand wall in 2 hours.',
        },
        {
          term: 'Bar-Lev Line',
          def: 'Fortified chain of 35 Israeli concrete bunkers and sand barriers along the Suez Canal.',
        },
        {
          term: 'SAM-6 Missile Umbrella',
          def: 'Soviet mobile air defense batteries neutralizing Israeli air superiority over Suez.',
        },
        {
          term: 'Valley of Tears',
          def: 'Ferocious tank battle on the Golan Heights where 100 Israeli tanks halted 1,400 Syrian tanks.',
        },
        {
          term: 'Operation Nickel Grass',
          def: 'Massive emergency US military airlift delivering 22,000 tons of supplies to Israel.',
        },
        {
          term: 'DEFCON 3 Nuclear Alert',
          def: 'Heightened US military readiness ordered by Nixon when USSR threatened intervention.',
        },
        {
          term: 'OAPEC Oil Weapon',
          def: 'Arab oil production cuts and embargo against nations supporting Israel in the 1973 war.',
        },
        {
          term: 'Quadrupled Oil Prices (400%)',
          def: 'Economic shock wave resulting from the Arab oil embargo, forcing Western diplomacy.',
        },
        {
          term: 'Agranat Commission',
          def: "Israeli judicial inquiry investigating military unreadiness, leading to Golda Meir's resignation.",
        },
        {
          term: 'Myth of Invincibility',
          def: 'Psychological trauma for Israel, having lost 2,600 soldiers to an Arab surprise attack.',
        },
      ],
    },
  },
  ,
  // ---------------------------------------------------------------------------
  // SPREAD 9 (KT 3.1): SHUTTLE DIPLOMACY, SUEZ REOPENING & ROAD TO CAMP DAVID
  // ---------------------------------------------------------------------------
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
          subtitle: 'Step-by-Step Disengagement',
          bullets: [
            "**Step-by-Step Mediation:** Henry Kissinger traveled continuously between Middle Eastern capitals; because Arab states refused to speak directly to Israel, Kissinger acted as intermediary, exploiting Israel's total dependence on US military aid.",
            '**Sinai I (1974) & Sinai II (1975):** Egypt and Israel agreed to a troop withdrawal from the Suez Canal and established a UN buffer zone; in 1975, Israel pulled back 20km from the strategic Gidi and Mitla passes, returning the Abu Rudeis oilfields to Egypt.',
            "**Lifting the Oil Embargo:** Kissinger's diplomacy persuaded Arab oil producers to end the devastating oil embargo against the United States in March 1974, though Syria refused to negotiate peace without the return of the Golan Heights.",
          ],
        },
        {
          title: 'Reopening the Suez Canal',
          subtitle: '700,000 Mines & 5 June 1975',
          bullets: [
            "**Canal Clearance Operation:** The canal had been completely closed since 1967; **1,700 Egyptian military engineers cleared nearly 700,000 mines** from the canal's 164 km of banks; **96 Egyptian soldiers were killed** during the three-month operation.",
            '**Multinational Naval Clearance:** Navies of the US, UK, France, and Egypt cleared the waterway itself of unexploded bombs, sunken warships, aircraft, and tanks, and demolished the causeway built across the canal by Israeli forces.',
            "**Grand Reopening (5 June 1975):** President Sadat presided over a ceremonial reopening of the Suez Canal, exactly eight years to the day after it was closed during the Six Day War, restoring millions in vital transit revenue to Egypt's bankrupt economy.",
          ],
        },
        {
          title: "Sadat's Journey to Jerusalem",
          subtitle: 'Food Riots & The Knesset Address',
          bullets: [
            '**Cairo Food Riots (Jan 1977):** Violent riots against bread price increases threatened Sadat’s regime; Sadat realized Egypt was economically exhausted and desperately needed peace to redirect military spending to domestic needs.',
            '**Historic Knesset Speech (20 Nov 1977):** Sadat stunned the world by declaring he would go "to the ends of the earth" for peace; he flew to Israel and spoke directly to the Knesset, offering full peace in exchange for complete Israeli withdrawal from Sinai.',
            "**Begin's Reciprocal Visit (Dec 1977):** Israeli Prime Minister Menachem Begin visited Ismailia, Egypt; though talks stalled over Palestinian self-rule, the psychological barrier of 30 years of war was permanently shattered.",
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
            '**Bypassing the Arab Boycott:** Arab leaders would not sit in the same room as Israeli negotiators; Kissinger flew over 30 round-trip missions carrying handwritten compromise drafts.',
            '**Golan Disengagement (May 1974):** Kissinger negotiated a disengagement treaty between Israel and Syria, establishing a UN Disengagement Observer Force (UNDOF) buffer zone that held for 40 years.',
            '**Lifting the Oil Embargo:** Progress in the Sinai talks convinced Saudi Arabia to end the OAPEC oil embargo in March 1974, restoring petroleum flows to Western economies.',
          ],
        },
        {
          title: '2. Clearing the Suez Canal (700k Mines & 5 June 1975)',
          points: [
            '**Canal Clearance Danger:** **1,700 Egyptian engineers cleared 700,000 mines** along 164 km of banks; **96 men died** in three months from exploding ordnance.',
            '**Dredging the Waterway:** International naval teams removed 10 sunken cargo vessels, military bridge causeways, and hundreds of live mortar shells and rockets.',
            '**Reopened 5 June 1975:** Sadat led a naval convoy through the canal exactly 8 years after the 1967 closure, revitalizing world commerce and securing Egyptian transit fees.',
          ],
        },
        {
          title: '3. Economic Crisis & Cairo Bread Riots (Jan 1977)',
          points: [
            '**Economic Insolvency:** Decades of wartime mobilization left Egypt with $12 billion in foreign debt, collapsing infrastructure, and runaway inflation.',
            '**Food Riots (18–19 Jan 1977):** When the government cut bread and fuel subsidies to meet IMF loan conditions, riots erupted in Cairo and Alexandria, killing 79 people.',
            '**Strategic Imperative:** Sadat concluded Egypt could never achieve economic survival or feed its growing population while devoting 40% of its budget to military conflict with Israel.',
          ],
        },
        {
          title: '4. The Historic Knesset Speech (20 November 1977)',
          points: [
            '**Stunning the Arab World:** Sadat announced to the Egyptian National Assembly that he was willing to go to the Israeli Knesset; Arab allies reacted with fury and disbelief.',
            '**Arrival in Tel Aviv:** On 19 Nov 1977, Sadat landed at Ben Gurion Airport and was received by an Israeli honor guard, shaking hands with Golda Meir and Ariel Sharon.',
            '**Knesset Demands:** Sadat offered genuine peace and recognition, but insisted that lasting peace required total Israeli withdrawal from Sinai, Golan, and West Bank.',
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

  // ---------------------------------------------------------------------------
  // SPREAD 10 (KT 3.2): CAMP DAVID ACCORDS & TREATY OF WASHINGTON (1978–79)
  // ---------------------------------------------------------------------------
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
            '**Total Diplomatic Isolation:** In Sept 1978, Carter brought Sadat and Begin to Maryland; when the two leaders refused to speak to each other after day three, Carter personally drafted and redrafted proposals 23 times.',
            '**The Sinai vs Settlements Crisis:** Begin agreed to return the entire Sinai Peninsula, but refused to dismantle Israeli settlements (e.g. Yamit) or concede sovereignty over the West Bank and East Jerusalem.',
            '**The Breakthrough Moment:** When Sadat packed his bags to leave on day 11, Carter warned him that abandoning the talks would destroy the US-Egyptian alliance and invite Soviet domination, convincing him to sign.',
          ],
        },
        {
          title: 'The Two Frameworks & US Aid',
          subtitle: '$10bn Egypt / $3bn Israel Packages',
          bullets: [
            '**Framework 1 (Sinai Peace):** Israel would return all of Sinai within three years, dismantle all Jewish settlements, and restore Egyptian sovereignty; Egypt recognized Israel and granted navigation rights in Suez and Aqaba.',
            '**Framework 2 (Palestinian Autonomy):** Envisioned an elected self-governing authority for West Bank and Gaza for 5 years, followed by final-status talks; however, Palestinians were not consulted, and the terms were deliberately vague.',
            '**Massive US Economic Underwriting:** Carter secured the pact by pledging **$10 billion in US aid to Egypt** ($1 billion annually for 10 years) and **$3 billion in US loans/grants to Israel** to build replacement airbases in the Negev Desert.',
          ],
        },
        {
          title: 'The Treaty & Fatal Backlash',
          subtitle: 'Washington 1979 & Sadat Assassination',
          bullets: [
            "**Treaty of Washington (26 March 1979):** Signed on the White House lawn; Egypt became the first Arab state to officially recognize Israel's right to exist in peace.",
            '**Arab League Expulsion:** Arab nations denounced Sadat as a traitor; Egypt was expelled from the Arab League, and the League moved its headquarters from Cairo to Tunis; Saudi Arabia severed financial subsidies.',
            '**Assassination of Sadat (6 Oct 1981):** During a military victory parade in Cairo celebrating the 1973 canal crossing, Islamic Jihad soldiers led by Lieutenant Khalid Islambouli leaped from a truck and assassinated Sadat with automatic weapons.',
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
            '**Total Seclusion:** Carter kept the delegations cut off from the media at the wooded Maryland retreat; Sadat and Begin developed such mutual hostility they could not meet face-to-face.',
            "**The Photographs Breakthrough:** On the final day, Carter presented Begin with signed photographs of Carter, Sadat, and Begin for Begin's grandchildren; deeply moved, Begin softened his stance on settlement removal.",
            '**Knesset Settlement Vote:** Begin agreed that the Israeli Knesset would hold a free vote on whether to dismantle the 15 Jewish settlements in Sinai, including the town of Yamit.',
          ],
        },
        {
          title: '2. The US Financial Packages ($10bn & $3bn)',
          points: [
            '**$10 Billion to Egypt:** US pledged $10 billion in civilian and military grants over a decade, modernizing Egypt’s infrastructure and providing grain shipments.',
            '**$3 Billion to Israel:** US funded the construction of two state-of-the-art military airbases (Nevatim and Ramon) in the Negev Desert to replace bases surrendered in Sinai.',
            '**Economic Dependency:** Both Egypt and Israel became permanently dependent on massive annual congressional foreign aid appropriations.',
          ],
        },
        {
          title: '3. Why Palestinians Rejected the Framework',
          points: [
            '**Zero Consultation:** The PLO and West Bank Palestinians were completely excluded from the Camp David negotiations, viewing Sadat as a traitor who sold out Palestine for the Sinai.',
            '**No Guarantee of Statehood:** Framework 2 promised only "administrative autonomy", leaving internal security, border control, and land ownership in the hands of the IDF.',
            "**Settlement Surge:** Freed from the threat of war with Egypt, Begin's government dramatically accelerated the construction of Jewish settlements across the West Bank.",
          ],
        },
        {
          title: '4. The Arab Backlash & 1981 Assassination',
          points: [
            '**Arab League Sanctions:** Meeting in Baghdad, 18 Arab nations suspended Egypt from the Arab League and imposed a total diplomatic and economic boycott.',
            '**Islamic Extremist Rage:** Egyptian Islamists viewed peace with Israel as a betrayal of Islam; Sadat further inflamed tensions by arresting 1,500 political opponents in Sept 1981.',
            '**6 October 1981 Parade:** Lieutenant Islambouli and three fellow conspirators sprayed the presidential viewing stand with bullets and hand grenades, assassinating Sadat on live television.',
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

  // ---------------------------------------------------------------------------
  // SPREAD 11 (KT 3.3): THE 1982 LEBANON WAR & THE FIRST INTIFADA (1987–93)
  // ---------------------------------------------------------------------------
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
            '**Fatahland in South Lebanon:** 300,000 Palestinian refugees lived in Lebanon; the PLO built a heavily armed military enclave, firing Soviet Katyusha rockets into northern Israeli towns like Kiryat Shmona.',
            '**Coastal Road Massacre (11 March 1978):** Fatah commandos landed by boat, hijacked a bus near Tel Aviv, and engaged in a shootout killing **38 Israeli civilians (including 13 children)** and wounding 71.',
            '**Operation Litani (15 March 1978):** Israel responded with **26,000 IDF troops** invading southern Lebanon up to the Litani River, killing 300 PLO fighters; UN Resolution 425 established UNIFIL peacekeepers in southern Lebanon.',
          ],
        },
        {
          title: 'Lebanon Invasion & Sabra-Shatila',
          subtitle: 'Operation Peace for Galilee (1982)',
          bullets: [
            '**The Assassination Pretext:** On 3 June 1982, the Abu Nidal group (anti-Arafat extremists) shot Israeli Ambassador Shlomo Argov in London; Defence Minister Ariel Sharon seized on this to launch a full-scale invasion on 6 June 1982.',
            '**Two-Month Siege of Beirut:** IDF surrounded West Beirut, cutting water and electricity while bombing residential areas; US envoy Philip Habib negotiated a ceasefire, and 14,000 PLO fighters evacuated by sea to Tunis.',
            '**Sabra & Shatila Massacre (Sept 1982):** Following the assassination of Lebanese President Bashir Gemayel, the IDF allowed Lebanese Christian Phalangists into the refugee camps; **between 800 and 3,500 Palestinian civilians were slaughtered**; the Israeli Kahan Commission found Sharon personally responsible.',
          ],
        },
        {
          title: 'The First Intifada (1987–93)',
          subtitle: 'Jabalya Spark & Grassroots Revolt',
          bullets: [
            '**The Jabalya Spark (8 Dec 1987):** An IDF tank transporter collided with civilian cars at Jabalya refugee camp in Gaza, killing 4 Palestinians; rumors of intentional murder triggered mass rioting that engulfed the West Bank and Gaza.',
            '**UNLU & Civil Disobedience:** The Unified National Leadership of the Uprising (UNLU) distributed clandestine leaflets organizing strikes, tax boycotts, and barricades, while stone-throwing youths confronted IDF patrols.',
            '**Human Toll & Shift in Opinion:** Yitzhak Rabin ordered an "Iron Fist" policy; **1,200 Palestinians were killed by the IDF**, while Palestinian vigilantes executed **over 800 suspected Israeli collaborators (mukhbirin)**; 160 Israelis were killed. TV broadcasts of children facing armored vehicles shattered Israel’s moral standing.',
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
            '**Bus Hijacking (11 March 1978):** 11 Fatah commandos landed by dinghy from Lebanon, seized an intercity bus, and shot at motorists along the highway; 38 civilians died.',
            '**26,000 IDF Troops Invade:** PM Menachem Begin ordered Operation Litani; Israeli troops pushed to the Litani River, killing 300 PLO fighters and displacing 100,000 Lebanese.',
            '**UNIFIL Buffer:** UN Resolution 425 deployed 4,000 UN peacekeepers to southern Lebanon, but failed to prevent cross-border Palestinian rocket fire.',
          ],
        },
        {
          title: '2. Shlomo Argov Pretext & The 1982 Beirut Siege',
          points: [
            "**The London Pretext:** Ambassador Argov was paralyzed by Abu Nidal assassins; despite knowing Abu Nidal was Arafat's deadly enemy, Sharon used the shooting to justify war.",
            '**The Deceptive Mandate:** Sharon told the Israeli cabinet the invasion would penetrate only 40km to clear rocket range, but drove straight to Beirut, 85km north.',
            '**Two-Month Siege:** From June to August 1982, the IDF cut water, electricity, and food supplies to West Beirut, subjecting the city to relentless artillery and air bombardment.',
          ],
        },
        {
          title: '3. Sabra-Shatila Massacre & The Rise of Hezbollah',
          points: [
            "**Phalangist Entry (16–18 Sept 1982):** Seeking revenge for President Gemayel's assassination, Christian militias entered the camps while Israeli troops fired illumination flares.",
            '**800 to 3,500 Slaughtered:** Phalangists massacred unarmed women, children, and elderly men with knives and machine guns, dumping bodies into mass graves.',
            "**The Birth of Hezbollah:** While the PLO was exiled to Tunis, the invasion alienated Lebanon's Shi'ite population, birthing **Hezbollah**, an Iranian-funded militant guerrilla army.",
          ],
        },
        {
          title: '4. The Intifada Toll (1,200 IDF / 800 Collaborators)',
          points: [
            '**Grassroots Uprising (1987–93):** Began in Jabalya camp; driven by local youths throwing stones and petrol bombs rather than foreign-based PLO leaders in Tunis.',
            '**UNLU Leaflets & Underground Schools:** UNLU distributed secret mimeographed flyers dictating strike days; women established clandestine schools when Israel closed universities.',
            '**The Grim Balance:** **1,200 Palestinians killed by the IDF**, while Palestinian vigilantes murdered **over 800 fellow Palestinians** accused of collaboration (*mukhbirin*); 160 Israelis killed.',
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

  // ---------------------------------------------------------------------------
  // SPREAD 12 (KT 3.4): ROAD TO OSLO, PEACE WITH JORDAN & OSLO II (1993–95)
  // ---------------------------------------------------------------------------
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
            "**End of Cold War & 600,000 Soviet Jews:** The collapse of the USSR in Dec 1991 deprived Syria and the PLO of weapons; **over 600,000 Soviet Jews migrated to Israel between 1989 and 1995**, transforming Israel's economic and military strength.",
          ],
        },
        {
          title: 'Oslo I & The Historic Handshake',
          subtitle: 'Secret Talks & White House Lawn (1993)',
          bullets: [
            '**Secret Oslo Channel (1992–93):** Israeli academics and PLO officials met covertly outside Oslo, hosted by Norwegian Foreign Minister Johan Jørgen Holst, bypassing the stalled Madrid Conference.',
            "**Mutual Recognition:** Letters of mutual recognition were exchanged: the PLO recognized Israel's right to live in peace and renounced terrorism; Israel recognized the PLO as the official representative of the Palestinian people.",
            '**Signing Oslo I (13 Sept 1993):** Signed in Washington; Prime Minister Yitzhak Rabin and Yasser Arafat shook hands on the White House lawn before President Bill Clinton; established the **Palestinian Authority (PA) in 1994** with civil control in Gaza and Jericho.',
          ],
        },
        {
          title: 'Oslo II, Jordan Peace & Murder',
          subtitle: 'Areas A/B/C & Rabin Assassination',
          bullets: [
            "**Israel-Jordan Peace Treaty (Oct 1994):** King Hussein and Yitzhak Rabin signed a formal peace treaty at Wadi Araba, with the US agreeing to cancel Jordan's national debt; Jordan became the second Arab nation to make peace.",
            '**Oslo II Agreement (Sept 1995):** Divided the West Bank into three administrative zones: **Area A (3% of land)** under full PA control; **Area B (25% of land)** under PA civil and joint Israeli security control; **Area C (72% of land)** under full Israeli civil and military control.',
            '**Extremist Surge & Rabin Assassinated:** Hamas and Islamic Jihad launched deadly suicide bus bombings across Israeli cities; on **4 November 1995**, Yitzhak Rabin was assassinated at a Tel Aviv peace rally by Yigal Amir, an Orthodox Jewish extremist.',
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
            "**Arafat's Gulf War Blunder:** By embracing Saddam Hussein in 1990, Arafat alienated wealthy Gulf monarchies; Kuwait expelled 400,000 Palestinian workers who remitted wages.",
            '**Financial Ruin:** The PLO lost $100 million annually in Arab aid and could no longer pay salaries, leaving Arafat desperate for a diplomatic breakthrough to retain power.',
            '**600,000 Soviet Jewish Immigrants:** Between 1989 and 1995, over 600,000 highly educated Soviet Jews arrived in Israel, eliminating Israeli demographic anxiety.',
          ],
        },
        {
          title: '2. The Oslo Secret Negotiations & Mutual Recognition',
          points: [
            '**Norwegian Discretion:** Norwegian social scientist Terje Rød-Larsen and Foreign Minister Johan Jørgen Holst organized 14 secret meetings in rural Norway.',
            '**Breaking Taboos:** For the first time, Israeli officials sat directly with PLO leaders; they bypassed thorny final-status issues (Jerusalem, refugees) to achieve an interim breakthrough.',
            '**The White House Handshake (13 Sept 1993):** Rabin famously hesitated before shaking Arafat\'s hand on the White House lawn, declaring "Enough of blood and tears!"',
          ],
        },
        {
          title: '3. The Oslo II West Bank Division (Areas A, B, C)',
          points: [
            '**Area A (3% of West Bank):** Encompassed major Palestinian cities (Ramallah, Nablus, Bethlehem, Jenin, Hebron); full PA civil and security control.',
            '**Area B (25% of West Bank):** Covered 450 Palestinian rural villages; PA exercised civil administration, but Israel retained overriding military security control.',
            '**Area C (72% of West Bank):** Full Israeli civil and military control; contained all Jewish settlements, military bases, bypass roads, and the Jordan Valley.',
          ],
        },
        {
          title: "4. The Extremist Sabotage & Rabin's Assassination",
          points: [
            '**Hamas Bus Bombings:** Militant Islamists opposed conceding Islamic land; suicide bombings in Afula, Hadera, and Tel Aviv killed dozens of Israeli commuters.',
            '**Hebron Mosque Massacre (Feb 1994):** Jewish extremist Baruch Goldstein opened fire inside the Ibrahimi Mosque, killing 29 Palestinian worshippers.',
            '**4 November 1995 Assassination:** At the conclusion of a massive peace rally in Kings of Israel Square, Tel Aviv, law student Yigal Amir shot Rabin twice in the back.',
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
    padding: 9.5mm 12mm 8.5mm 12mm;
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
    font-size: 7.2pt;
    font-weight: 800;
    padding: 1px 4px;
    border-radius: 2px;
    margin-right: 4px;
    white-space: nowrap;
  }
`;
}

function renderPage1(getImageDataUri) {
  const nakbaImgUri = getImageDataUri('/images/nakba_galilee_1948.jpg');

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

        <!-- Primary Historical Archival Plate: Al-Nakba (1948) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 5px 7px; background: #fafafa; display: flex; gap: 10px; align-items: center;">
          <div style="width: 290px; height: 175px; flex-shrink: 0; border: 1px solid #000000; overflow: hidden; background: #000000;">
            <img src="${nakbaImgUri}" alt="Palestinian refugees in Galilee, 1948" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%) contrast(115%); display: block;" />
          </div>
          <div style="flex: 1; font-size: 7.2pt; color: #1e293b; line-height: 1.30;">
            <div style="font-size: 7.6pt; font-weight: 800; text-transform: uppercase; color: #000000; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; display: flex; justify-content: space-between;">
              <span>PRIMARY ARCHIVE &bull; AL-NAKBA (1948)</span>
              <span style="font-size: 6.8pt; color: #475569;">ICRC / UNRWA Photo Record</span>
            </div>
            <p style="margin: 0 0 4px 0; font-family: 'Playfair Display', serif; font-size: 7.8pt; color: #000000; font-style: italic;">
              "Palestinian civilian refugees from Galilee fleeing towards the Lebanese border in summer 1948 during Al-Nakba (The Catastrophe), carrying personal possessions on foot past an abandoned truck."
            </p>
            <div style="font-size: 6.8pt; color: #334155;">
              <strong>Historical Grounding:</strong> The 1948–49 War displaced over 700,000 Palestinian Arabs (including 280,000 to the West Bank and 190,000 to Gaza). Grounding Paper 2 revision in primary human evidence ensures rigorous historical empathy, source awareness, and balanced specification mastery.
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
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 9px 12px; background: #ffffff;">
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
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 11px; background: #ffffff;">
          <div style="font-size: 9.0pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px;">
            Examiner Level Descriptors: How Top Marks Are Awarded
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 8.0pt; line-height: 1.30; color: #1e293b;">
            <div style="background: #f8fafc; border: 1px solid #94a3b8; border-radius: 2px; padding: 6px 8px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.4pt;">Q1: Consequence [4m each]</strong>
              <div><strong>Level 1 (1–2m):</strong> Simple or general consequence; limited facts.</div>
              <div><strong>Level 2 (3–4m):</strong> Specific historical knowledge + fully explained consequence showing cause-and-effect chain.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #94a3b8; border-radius: 2px; padding: 6px 8px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.4pt;">Q2: Narrative Account [8m]</strong>
              <div><strong>Level 1 (1–2m):</strong> Simple narrative; fragmented chronology.</div>
              <div><strong>Level 2 (3–5m):</strong> Chronological narrative, but relies only on stimulus.</div>
              <div><strong>Level 3 (6–8m):</strong> Coherent, causally linked narrative + <strong>substantial own knowledge beyond stimulus</strong>.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #94a3b8; border-radius: 2px; padding: 6px 8px;">
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
            <div style="background: #fff; border: 1px solid #94a3b8; border-radius: 2px; padding: 6px 8px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.2pt;">Direct Causal Stems (Q1)</strong>
              <div>&bull; "As a direct consequence, ..."</div>
              <div>&bull; "This fundamentally provoked..."</div>
              <div>&bull; "The decisive catalyst was..."</div>
              <div>&bull; "This directly resulted in..."</div>
            </div>
            <div style="background: #fff; border: 1px solid #94a3b8; border-radius: 2px; padding: 6px 8px;">
              <strong style="color: #000000; display: block; margin-bottom: 2px; font-size: 8.2pt;">Sequencing &amp; Linkage (Q2)</strong>
              <div>&bull; "During the opening phase, ..."</div>
              <div>&bull; "A decisive turning point came when..."</div>
              <div>&bull; "This breathing space allowed..."</div>
              <div>&bull; "In the immediate aftermath, ..."</div>
            </div>
            <div style="background: #fff; border: 1px solid #94a3b8; border-radius: 2px; padding: 6px 8px;">
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
    <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 6px;">
      <div>
        <div style="font-size: 8.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 1px;">${p.title}</div>
        <div style="font-size: 7.6pt; color: #475569; font-style: italic; margin-bottom: 5px;">${p.subtitle}</div>
      </div>
      <ul style="margin: 0; padding-left: 12px; font-size: 8.2pt; color: #000000; line-height: 1.26;">
        ${p.bullets.map((b) => `<li style="margin-bottom: 4px;">${formatMd(b)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const figuresHtml = left.keyFigures
    .map(
      (f) => `
    <div style="background: #f8fafc; border: 1px solid #000000; border-radius: 2px; padding: 5px 7px;">
      <strong style="color: #000000; display: block; font-size: 8.4pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">${f.name}</strong>
      <span style="font-size: 7.4pt; color: #1e293b; line-height: 1.20;">${f.role}</span>
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
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-left: 5px solid #000000; border-radius: 3px; padding: 8px 12px;">
          <div style="font-size: 10.4pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #000000; margin-bottom: 3px;">
            ${left.headline}
          </div>
          <div style="font-size: 8.4pt; color: #1e293b; line-height: 1.28;">
            ${formatMd(left.summary)}
          </div>
        </div>

        <!-- Three Core Historical Pillars -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; flex: 1; margin: 4px 0;">
          ${pillarsHtml}
        </div>

        <!-- Key Figures & Factions (4 Cards) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 11px; background: #ffffff;">
          <div style="font-size: 8.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Key Historical Figures &amp; Organisations</span>
            <span style="font-size: 7.2pt; color: #475569;">Specification Protagonists</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 7px;">
            ${figuresHtml}
          </div>
        </div>

        <!-- Archival Source & Historical Evidence Box -->
        <div style="background: #f8fafc; border: 1.5px solid #000000; border-radius: 3px; padding: 7px 11px; font-size: 8.2pt; line-height: 1.30; color: #000000;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            <strong style="font-size: 8.0pt; text-transform: uppercase; color: #000000; letter-spacing: 0.4px;">PRIMARY ARCHIVAL EVIDENCE &bull; ${left.archivalSource.title}:</strong>
            <span style="font-size: 7.2pt; font-weight: 700; color: #334155;">${left.archivalSource.citation}</span>
          </div>
          <p style="margin: 3px 0 3px 0; font-style: italic; font-family: 'Playfair Display', serif; font-size: 8.2pt; color: #000000;">
            "${left.archivalSource.quote}"
          </p>
          <div style="margin-top: 2px; font-size: 7.6pt; color: #334155;">
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
    <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 8px 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; gap: 6px;">
      <div style="font-size: 8.6pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px;">
        ${c.title}
      </div>
      <ul style="margin: 0; padding-left: 12px; font-size: 8.0pt; color: #000000; line-height: 1.25;">
        ${c.points.map((p) => `<li style="margin-bottom: 3px;">${formatMd(p)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const pathwayHtml = right.causalPathway
    .map(
      (p) => `
    <div style="background: #ffffff; border: 1px solid #000000; border-radius: 2px; padding: 6px 7px;">
      <strong style="color: #000000; display: block; font-size: 8.2pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">${p.stage}</strong>
      <span style="font-size: 7.4pt; color: #1e293b; line-height: 1.20;">${p.text}</span>
    </div>
  `,
    )
    .join('');

  const wordBankHtml = right.masterWordBank
    .map(
      (w) => `
    <div>
      <span class="wb-pill">${w.term}</span>
      <span style="font-size: 7.2pt; color: #1e293b;">${w.def}</span>
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
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; flex: 1;">
          ${casesHtml}
        </div>

        <!-- Visual Causal Pathway (4 Connected Stages) -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 11px; background: #f8fafc; margin: 4px 0;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #000000; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #cbd5e1; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Visual Causal Pathway: Key Historical Mechanisms</span>
            <span style="font-size: 7.2pt; color: #475569;">Cause &amp; Consequence Chain</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 7px;">
            ${pathwayHtml}
          </div>
        </div>

        <!-- Master GCSE Specification Word Bank Box -->
        <div style="border: 1.5px solid #000000; border-radius: 3px; padding: 7px 11px; background: #ffffff;">
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
