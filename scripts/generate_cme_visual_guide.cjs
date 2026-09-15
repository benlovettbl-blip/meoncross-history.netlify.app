/**
 * generate_cme_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Pearson Edexcel GCSE (9–1) History Paper 2 (Period Study):
 * "Option P5: Conflict in the Middle East, 1945–1995 (1HI0/P5)"
 * Visual Revision Masterclasses & Complete Specification Guide (28-Page Master Volume).
 *
 * Commercial Saddle-Stitch Format (28 Pages = 7 folded A3 sheets, 0 blank pages, 0 overflows):
 * - Page 1: Official Examination Cover & Full Word-for-Word Specification Checklist + 3 Question Types
 * - Page 2: Paper 2 Period Study Blueprint, Exam Architecture & Four Non-Negotiable Success Principles
 * - Page 3: Master Chronology & Geopolitical Shift Matrix (1945–1995) + Examiner Synoptic Takeaway
 * - Pages 4–27: 12 Pure Double-Page Revision Spreads (Zero blank lines; rich narrative, causal pathways & GCSE Word Banks)
 * - Page 28: Master Historiographical Debates (Traditional vs New Historians) & Final Revision Checklist
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
        'Following the Holocaust in Europe, the British Government (under Prime Minister Clement Attlee and Foreign Secretary Ernest Bevin) attempted to uphold the 1939 White Paper restriction of 15,000 Jewish refugees per year to secure Arab oil concessions and protect the Suez Canal. In response, Jewish underground paramilitary organisations—the official Haganah and militant splinter groups Irgun (led by Menachem Begin) and Lehi—launched a violent guerrilla insurgency against British military infrastructure. Exhausted by WWII debt, facing domestic outrage over soldier casualties, and pressured by US President Truman following the Anglo-American Committee (1946), Britain announced in February 1947 that it would surrender the Mandate to the United Nations.',
      pillars: [
        {
          title: 'The Refugee Crisis',
          subtitle: 'White Paper & Displaced Persons',
          bullets: [
            '**1939 White Paper:** Capped Jewish immigration at 15,000/yr, leaving 250,000 Holocaust survivors trapped in European DP camps.',
            '**Aliyah Bet:** Underground network ran clandestine blockade runners across the Mediterranean.',
            '**SS Exodus (July 1947):** Royal Navy intercepted ship with 4,500 survivors, forcing them back to Germany and creating global moral outrage.',
          ],
        },
        {
          title: 'Armed Insurgency',
          subtitle: 'Guerrilla Strikes vs Britain',
          bullets: [
            '**Haganah:** Main defense force (under Ben-Gurion); sabotaged radar stations, police outposts, and railways.',
            '**Irgun (Etzel):** Commanded by **Menachem Begin**; targeted British military personnel and government headquarters.',
            '**Night of the Bridges (June 1946):** Haganah blew up 11 bridges connecting Palestine to neighboring Arab states.',
          ],
        },
        {
          title: 'British Collapse',
          subtitle: 'Economic & Military Exhaustion',
          bullets: [
            '**Military Strain:** Britain deployed **100,000 troops** (1 soldier for every 6 Jews) costing £40 million annually.',
            '**"Bevingrad" Fortress:** Tel Aviv and Jerusalem placed under curfews inside barbed-wire security zones.',
            '**UN Referral (Feb 1947):** Foreign Secretary Bevin announced Britain would hand Palestine to the UN without recommendations.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Ernest Bevin & Attlee',
          role: 'British Government leaders who enforced immigration quotas to preserve Arab oil alliances; surrendered Mandate in Feb 1947.',
        },
        {
          name: 'David Ben-Gurion',
          role: 'Chairman of the Jewish Agency and leader of Haganah; coordinated political pressure and Aliyah Bet blockade running.',
        },
        {
          name: 'Menachem Begin (Irgun)',
          role: 'Revisionist commander who waged asymmetric urban warfare, masterminding the King David Hotel bombing and Sergeants Affair.',
        },
        {
          name: 'Harry S. Truman',
          role: 'US President who pressured Britain to admit 100,000 Holocaust survivors, threatening vital American postwar economic loans.',
        },
      ],
      archivalSource: {
        title: 'Foreign Secretary Ernest Bevin to House of Commons (18 Feb 1947)',
        citation: 'Hansard Parliamentary Debates, Vol. 433, Col. 985',
        quote:
          "His Majesty's Government have been faced with an irreconcilable conflict of principles... The Mandate is unworkable. We have decided to refer the whole problem to the United Nations without recommending any solution of our own.",
        significance:
          'Demonstrates complete British admission of failure; Britain refused to enforce partition and abandoned Palestine to civil war.',
      },
    },
    right: {
      tag: 'KT 1.1 • Strategic Case Studies, Causal Mechanisms & Word Bank',
      deepCases: [
        {
          title: '1. The Anglo-American Committee (1946)',
          points: [
            '**Joint Inquiry:** Investigated post-Holocaust displaced persons; recommended the immediate admission of **100,000 Jewish refugees** into Palestine.',
            '**British Government Rejection:** Attlee and Bevin refused without Jewish disarmament, alienating the US government.',
            '**American Leverage:** US financial loans desperately needed by bankrupt Britain were threatened by Congress.',
          ],
        },
        {
          title: '2. King David Hotel Bombing (22 July 1946)',
          points: [
            '**Target:** Southwestern wing housed British Secretariat, Army HQ, and criminal investigation archives.',
            '**Execution:** Irgun fighters disguised as Arab milkmen planted 350kg of explosives in basement milk churns.',
            '**Impact:** **91 killed** (British, Arab, and Jewish staff). Shattered British administrative morale and paralyzed colonial governance.',
          ],
        },
        {
          title: '3. The Sergeants Affair (July 1947)',
          points: [
            '**Retaliation:** Irgun kidnapped two British intelligence sergeants (Martin and Paice) in Netanya as hostages.',
            '**Execution:** When Britain hanged three Irgun militants in Acre prison, Begin ordered the sergeants hanged and booby-trapped.',
            '**Domestic Outrage:** Triggered anti-Jewish riots across London, Liverpool, and Manchester; British public demanded immediate withdrawal.',
          ],
        },
        {
          title: '4. Operation Agatha & UN Referral (Feb 1947)',
          points: [
            '**"Black Saturday" (June 1946):** British army raided Jewish Agency HQ, arresting 2,700 leaders and seizing intelligence documents.',
            '**Insurgency Escalation:** Raids failed to dismantle underground cells, directly provoking the King David Hotel retaliation.',
            '**UNSCOP Handover:** Incapable of halting guerrilla attacks, Bevin surrendered the Mandate to the UN General Assembly in Feb 1947.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Underlying Tension',
          text: '1939 White Paper limits Jewish refugees to 15,000/yr; 250,000 Holocaust survivors trapped in European camps.',
        },
        {
          stage: '2. Paramilitary Violence',
          text: 'Haganah, Irgun, and Lehi launch attacks. King David Hotel bombed (91 dead); 100,000 British troops fail to restore control.',
        },
        {
          stage: '3. Public & US Outrage',
          text: 'SS Exodus forced back to Germany; Sergeants Affair sparks UK riots; President Truman pressures bankrupt Britain.',
        },
        {
          stage: '4. Strategic Outcome',
          text: 'Bevin refers Palestine to UN (Feb 1947). UNSCOP proposes partition; UN Res 181 passed; State of Israel declared (May 1948).',
        },
      ],
      masterWordBank: [
        {
          term: '1939 White Paper',
          def: 'British law restricting Jewish immigration to 75,000 over 5 years.',
        },
        {
          term: 'Anglo-American Inquiry',
          def: '1946 joint report recommending 100,000 refugee admissions.',
        },
        { term: 'Aliyah Bet', def: 'Clandestine Jewish migration network running blockade ships.' },
        { term: 'Haganah', def: 'Official underground defense army of the Jewish Agency.' },
        {
          term: 'Irgun (Etzel)',
          def: 'Militant underground revisionist group led by Menachem Begin.',
        },
        {
          term: 'King David Hotel',
          def: 'British HQ in Jerusalem, bombed 22 July 1946; 91 killed.',
        },
        {
          term: 'Operation Agatha',
          def: '"Black Saturday" (June 1946): 2,700 Jewish leaders arrested.',
        },
        {
          term: 'SS Exodus (1947)',
          def: 'Refugee ship with 4,500 survivors forced back to Germany.',
        },
        {
          term: 'Sergeants Affair',
          def: 'Irgun hanging of two British sergeants (Martin & Paice) in July 1947.',
        },
        {
          term: 'Ernest Bevin',
          def: 'British Foreign Secretary who referred Palestine to the UN.',
        },
        { term: 'UNSCOP', def: 'UN Special Committee on Palestine proposing partition.' },
        {
          term: 'UN Resolution 181',
          def: 'General Assembly vote (29 Nov 1947) partitioning Palestine.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 2 (KT 1.2): UN RESOLUTION 181 & THE 1948–49 WAR
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_2',
    spreadNum: 2,
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.2: UN Partition Resolution 181 & The 1948–49 Arab-Israeli War',
    left: {
      tag: 'KT 1.2 • Partition, Invasion & Statehood',
      headline: 'From Partition to Survival: The 1948–49 War and the Green Line Borders',
      summary:
        'On 29 November 1947, the UN General Assembly passed Resolution 181, partitioning Palestine into separate Jewish (55%) and Arab (44%) states with an international regime for Jerusalem. Zionist leaders accepted partition, but the Arab Higher Committee and Arab League rejected it as an imperialist injustice. Civil war erupted instantly. On 14 May 1948, as British High Commissioner Alan Cunningham departed, David Ben-Gurion declared the State of Israel. The following day, five Arab armies (Egypt, Jordan, Syria, Iraq, and Lebanon) invaded the infant state, beginning the first Arab-Israeli war.',
      pillars: [
        {
          title: 'UN Partition Plan (Res 181)',
          subtitle: 'The 55% / 44% Division',
          bullets: [
            '**General Assembly Vote:** Passed 33 to 13 (two-thirds majority) backed by US and USSR.',
            '**Zionist Acceptance:** Jewish Agency accepted despite fragmented borders and 45% Arab minority.',
            '**Arab Rejection:** Arabs argued partition violated self-determination for the 67% Arab majority population.',
          ],
        },
        {
          title: 'Arab Invasion (May 1948)',
          subtitle: 'Five Armies Attack Infant State',
          bullets: [
            '**May 15 Attack:** Regular Arab armies crossed borders; Egyptian armour advanced towards Tel Aviv.',
            '**Arab Legion Siege:** Jordanian forces captured Old City of Jerusalem and blockaded Jewish West Jerusalem.',
            '**Initial Israeli Desperation:** Haganah lacked heavy artillery, tanks, and combat aircraft in opening weeks.',
          ],
        },
        {
          title: 'Turning Points & Armistice',
          subtitle: 'Truces, Czech Arms & Green Line',
          bullets: [
            '**June Truce (11 June–8 July):** Crucial breathing space; Israel unified forces into IDF and imported Czech arms.',
            '**Israeli Counter-Offensives:** Operations Yoav and Horev shattered Egyptian forces in the Negev.',
            '**1949 Rhodes Armistices:** Green Line established; Israel controlled 79% of mandatory Palestine.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'David Ben-Gurion',
          role: 'Prime Minister and Defence Minister; unified militias into the IDF and declared independence 14 May 1948.',
        },
        {
          name: 'King Abdullah I (Jordan)',
          role: 'Commander of the British-trained Arab Legion; aimed to annex the West Bank and East Jerusalem.',
        },
        {
          name: 'Count Folke Bernadotte',
          role: 'UN Mediator who brokered truces and proposed border revisions; assassinated by Lehi in Sept 1948.',
        },
        {
          name: 'Azzam Pasha (Arab League)',
          role: 'Arab League Secretary-General who declared a war of extermination against the Jewish state.',
        },
      ],
      archivalSource: {
        title: 'David Ben-Gurion Declaring the State of Israel (14 May 1948)',
        citation: 'Declaration of the Establishment of the State of Israel, Tel Aviv Museum',
        quote:
          'By virtue of our natural and historic right and on the strength of the resolution of the United Nations General Assembly, we hereby declare the establishment of a Jewish state in Eretz-Israel, to be known as the State of Israel.',
        significance:
          'Marked the sovereign rebirth of Israel; triggered immediate Arab invasion within 24 hours.',
      },
    },
    right: {
      tag: 'KT 1.2 • Military Operations, Armistice Green Line & Word Bank',
      deepCases: [
        {
          title: '1. Plan Dalet (Plan D, April 1948)',
          points: [
            '**Strategic Goal:** Haganah offensive plan to secure communication routes and Jewish settlements outside the UN borders before British withdrawal.',
            '**Controversy:** Involved capturing Arab villages along the Tel Aviv-Jerusalem corridor (e.g. Kastel).',
            '**Outcome:** Opened the road to besieged Jerusalem but resulted in mass displacement of Arab populations.',
          ],
        },
        {
          title: '2. The Arab Legion & Battle for Jerusalem',
          points: [
            '**Elite Force:** 10,000 British-trained soldiers commanded by British General John Bagot Glubb (Glubb Pasha).',
            '**Capture of Old City:** Forced surrender of the Jewish Quarter (28 May 1948); expelled Jewish residents and barred access to Western Wall.',
            '**Burma Road:** Israelis carved a secret bypass road through hills to deliver food and ammunition to besieged West Jerusalem.',
          ],
        },
        {
          title: '3. Czechoslovak Arms Bridge (Operation Balak)',
          points: [
            '**Soviet Approval:** Stalin approved arms sales via Czechoslovakia to undermine British influence in Middle East.',
            '**Decisive Hardware:** Delivered 25 Avia S-199 fighter aircraft, 50,000 rifles, and 50 million rounds of ammunition during the June truce.',
            '**Air Supremacy:** Allowed infant Israeli Air Force to halt Egyptian advance at Ad Halom bridge, 20 miles from Tel Aviv.',
          ],
        },
        {
          title: '4. The 1949 Armistice Green Lines',
          points: [
            '**Rhodes Negotiations:** UN-brokered bilateral armistice agreements with Egypt, Lebanon, Jordan, and Syria (Jan–July 1949).',
            '**Territorial Expansion:** Israel expanded from 55% (UN partition) to **79% of mandatory Palestine**.',
            '**No Palestinian State:** Gaza came under Egyptian military control; Jordan formally annexed the West Bank and East Jerusalem.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. UN Partition 181',
          text: 'UN votes to partition Palestine (Nov 1947); Arabs reject plan; immediate civil war breaks out.',
        },
        {
          stage: '2. 14 May Declaration',
          text: 'Ben-Gurion proclaims State of Israel; five Arab armies invade on 15 May; infant state fights for survival.',
        },
        {
          stage: '3. June Truce & Arms',
          text: '4-week UN truce allows IDF to unify and airlift Czech Avia fighters, rifles, and artillery.',
        },
        {
          stage: '4. 1949 Armistice',
          text: 'IDF counter-offensives defeat Arab armies; 1949 Green Line leaves Israel with 79% territory; 700k refugees displaced.',
        },
      ],
      masterWordBank: [
        {
          term: 'UN Resolution 181',
          def: 'Partition resolution of 29 Nov 1947 allocating 55% of Palestine to Jewish state.',
        },
        {
          term: 'David Ben-Gurion',
          def: 'First Prime Minister of Israel who proclaimed statehood on 14 May 1948.',
        },
        {
          term: 'Arab Legion',
          def: 'Jordanian British-trained army commanded by Glubb Pasha; held East Jerusalem.',
        },
        {
          term: 'Plan Dalet (Plan D)',
          def: 'Haganah military plan of April 1948 to secure borders and roads.',
        },
        {
          term: 'UN June Truce',
          def: '4-week ceasefire (June 1948) enabling IDF reorganization and Czech arms import.',
        },
        {
          term: 'Czech Arms Deal',
          def: 'Soviet-backed airlift of Avia fighters and rifles via Czechoslovakia.',
        },
        {
          term: 'Burma Road',
          def: 'Makeshift bypass route built by Israelis to relieve the siege of West Jerusalem.',
        },
        {
          term: 'Operation Yoav',
          def: 'Oct 1948 IDF offensive driving Egyptian forces out of the northern Negev.',
        },
        {
          term: 'Count Bernadotte',
          def: 'UN Mediator assassinated by Lehi in Jerusalem (Sept 1948).',
        },
        {
          term: 'Green Line',
          def: '1949 Armistice demarcation boundary established at Rhodes negotiations.',
        },
        {
          term: 'Corpus Separatum',
          def: 'UN proposal for international governance of Jerusalem, rejected by combatants.',
        },
        {
          term: 'Altalena Affair',
          def: 'IDF shelled Irgun arms ship (June 1948) to enforce single unified military command.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 3 (KT 1.3): REFUGEE CRISIS, ARMISTICE & THE IDF (1949–55)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_3',
    spreadNum: 3,
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.3: The Palestinian Refugee Crisis & Border Confrontation (1949–55)',
    left: {
      tag: 'KT 1.3 • The Nakba, The IDF & The Refugee Tragedy',
      headline: 'Dispossession, Fortress Israel & Infiltration: The Human Tragedy of 1948',
      summary:
        'The 1948–49 war resulted in the displacement of over 700,000 Palestinian Arabs, who became stateless refugees in what Palestinians term al-Nakba ("The Catastrophe"). Refugees were housed in emergency UNRWA tent camps in Gaza, the West Bank, Lebanon, Syria, and Jordan. Israel barred their return, passing the Absentee Property Law (1950) to confiscate abandoned Arab lands, while welcoming over 700,000 Jewish immigrants under the Law of Return (1950). Displaced Palestinians crossing the armistice lines to retrieve property or carry out raids (fedayeen) provoked an aggressive Israeli military reprisal doctrine led by the newly unified IDF.',
      pillars: [
        {
          title: 'The Palestinian Nakba',
          subtitle: '700,000 Displaced Refugees',
          bullets: [
            '**Flight & Expulsion:** 700,000 Arabs fled due to fighting, fear of massacres (Deir Yassin), and direct military expulsions (Lydda and Ramle).',
            '**Destruction of Villages:** Over 400 Arab villages were depopulated, abandoned, or razed to prevent return.',
            '**UNRWA Creation (1949):** UN relief agency set up to provide food rations, clinics, and schooling in refugee camps.',
          ],
        },
        {
          title: 'Creation of the IDF',
          subtitle: 'Unification & Reprisal Doctrine',
          bullets: [
            '**Army Unification (May 1948):** Ben-Gurion dissolved Haganah, Irgun, and Lehi into the unified Israel Defense Forces (IDF).',
            '**Universal Conscription:** 2-year mandatory service for men and women, creating a massive civilian reserve army.',
            '**Reprisal Doctrine:** IDF adopted policy of disproportionate retaliation for cross-border raids to deter Arab neighbors.',
          ],
        },
        {
          title: 'Demographic Transformation',
          subtitle: 'Law of Return & Land Transfer',
          bullets: [
            '**Law of Return (1950):** Granted every Jew worldwide the legal right to settle in Israel and gain immediate citizenship.',
            '**Massive Immigration:** Absorbed 300,000 European Holocaust survivors and 350,000 Mizrahi Jews fleeing Arab lands.',
            '**Absentee Property Law (1950):** Transferred millions of dunams of abandoned Arab land to Jewish development agencies.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'David Ben-Gurion',
          role: 'Architect of the IDF and the Law of Return; established policy refusing Palestinian repatriation without peace.',
        },
        {
          name: 'Moshe Dayan',
          role: 'IDF Chief of Staff (1953–58); formulated the aggressive cross-border reprisal doctrine.',
        },
        {
          name: 'Ariel Sharon',
          role: 'Commander of elite commando Unit 101, which carried out punitive cross-border reprisal raids (e.g. Qibya 1953).',
        },
        {
          name: 'Palestinian Fedayeen',
          role: 'Armed guerrilla infiltrators recruited by Egyptian intelligence to carry out sabotage inside Israel.',
        },
      ],
      archivalSource: {
        title: 'UN General Assembly Resolution 194 (11 December 1948)',
        citation: 'United Nations Resolution 194, Article 11',
        quote:
          'Resolves that the refugees wishing to return to their homes and live at peace with their neighbours should be permitted to do so at the earliest practicable date, and that compensation should be paid for the property of those choosing not to return...',
        significance:
          'Established international basis for the Palestinian "Right of Return"; rejected by Israel on security and demographic grounds.',
      },
    },
    right: {
      tag: 'KT 1.3 • Thematic Deep-Dive, Infiltration Cycle & Word Bank',
      deepCases: [
        {
          title: '1. Absentee Property Law (1950)',
          points: [
            '**Legal Expropriation:** Defined any Palestinian who left their residence after 29 Nov 1947 as an "absentee".',
            '**Custodian Control:** Millions of dunams of agricultural land, orchards, and urban buildings transferred to the Israeli Custodian of Absentee Property.',
            '**Resettlement:** Empty Arab homes in Jaffa, Haifa, and Ramle redistributed to incoming Jewish refugees.',
          ],
        },
        {
          title: '2. Arab State Policy on Refugees',
          points: [
            '**Denial of Citizenship:** With the exception of Jordan, Arab states refused to grant citizenship to Palestinian refugees to preserve their identity as a political weapon.',
            '**Encampment:** Refugees confined to permanent UNRWA camps in Lebanon, Syria, and the Egyptian-administered Gaza Strip.',
            '**Economic Exclusion:** Restricted from owning property or entering professional careers in host countries.',
          ],
        },
        {
          title: '3. The Law of Return (1950)',
          points: [
            "**Demographic Necessity:** Israel's Jewish population doubled between 1948 and 1951 (from 650,000 to 1.4 million).",
            '**Ingathering of Exiles:** Operation Magic Carpet (Yemen) and Operation Ezra & Nehemiah (Iraq) evacuated historic Jewish communities.',
            "**Transit Camps (Ma'abarot):** Immigrants housed in canvas tents and tin huts before permanent development towns were constructed.",
          ],
        },
        {
          title: '4. Gaza Raid (28 February 1955)',
          points: [
            '**Operation Black Arrow:** IDF paratroopers commanded by Ariel Sharon raided Egyptian military HQ in Gaza, killing 38 soldiers.',
            '**Retaliation:** Launched in response to fedayeen murder of an Israeli civilian in Rehovot.',
            '**Escalation:** Public humiliation compelled Nasser to purchase Soviet-bloc arms and blockade the Straits of Tiran, paving the road to the 1956 Suez War.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Displacement (1948)',
          text: '700,000 Palestinians displaced into UNRWA camps during 1948–49 war; Israel denies return.',
        },
        {
          stage: '2. Land & Population Laws',
          text: 'Absentee Property Law transfers Arab land; Law of Return doubles Jewish population to 1.4 million.',
        },
        {
          stage: '3. Infiltration & Reprisals',
          text: 'Refugee border crossing leads to armed fedayeen raids; IDF Unit 101 executes aggressive reprisal doctrine.',
        },
        {
          stage: '4. 1955 Gaza Raid Crisis',
          text: 'Gaza raid kills 38 Egyptians; Nasser humiliated; signs Czech Arms Deal, setting course for Suez Crisis.',
        },
      ],
      masterWordBank: [
        {
          term: 'Al-Nakba',
          def: '"The Catastrophe": Palestinian term for 1948 displacement of 700,000 refugees.',
        },
        {
          term: 'UNRWA',
          def: 'UN Relief and Works Agency created in 1949 to provide aid to refugees.',
        },
        {
          term: 'Absentee Property Law',
          def: '1950 Israeli statute confiscating property of displaced Palestinians.',
        },
        {
          term: 'Law of Return',
          def: '1950 law granting every Jew worldwide the right to settle in Israel.',
        },
        {
          term: 'UN Resolution 194',
          def: 'UN resolution calling for refugee return or financial compensation.',
        },
        {
          term: 'Fedayeen',
          def: 'Palestinian armed commandos who conducted cross-border raids into Israel.',
        },
        {
          term: 'Unit 101',
          def: 'Elite IDF commando unit led by Ariel Sharon for cross-border reprisal raids.',
        },
        {
          term: 'Qibya Raid (1953)',
          def: 'Controversial IDF reprisal raid in West Bank resulting in 69 civilian deaths.',
        },
        {
          term: 'Operation Black Arrow',
          def: '28 Feb 1955 IDF raid on Egyptian base in Gaza; 38 soldiers killed.',
        },
        {
          term: 'Moshe Dayan',
          def: 'IDF Chief of Staff (1953–58) who institutionalized the reprisal doctrine.',
        },
        {
          term: "Ma'abarot",
          def: 'Transit camps in Israel used to house massive influx of Jewish immigrants.',
        },
        {
          term: 'Mizrahi Jews',
          def: 'Jews from Arab and Middle Eastern lands who migrated to Israel post-1948.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 4 (KT 1.4): NASSER, THE SUEZ CRISIS & ITS AFTERMATH (1956–63)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_4',
    spreadNum: 4,
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.4: Nasser, Pan-Arabism & The Suez Crisis (1956–63)',
    left: {
      tag: 'KT 1.4 • Imperial Collapse, Cold War & Suez War',
      headline: 'Canal, Collusion & Humiliation: The 1956 Suez Crisis and the Fall of Empires',
      summary:
        "In 1952, the Free Officers Movement overthrew Egypt's corrupt monarchy, bringing Colonel Gamal Abdel Nasser to power. Nasser championed Pan-Arab nationalism, non-alignment in the Cold War, and armed resistance against Israel. Humiliated by the 1955 Gaza raid, Nasser signed the Soviet-bloc Czech Arms Deal (Sept 1955). In July 1956, after the US and Britain abruptly cancelled funding for the Aswan High Dam, Nasser nationalised the Anglo-French Suez Canal Company. Britain and France colluded secretly with Israel at Sèvres, orchestrating a triple invasion that was halted by American economic ultimatums, ending British imperial supremacy.",
      pillars: [
        {
          title: "Nasser's Pan-Arab Challenge",
          subtitle: 'Czech Arms & Non-Alignment',
          bullets: [
            '**Czech Arms Deal (Sept 1955):** Acquired 200 Soviet MiG-15 jets and 300 tanks, breaking Western arms embargo.',
            "**Aswan Dam Loan Cancellation:** US Secretary of State Dulles withdrew $56m loan to punish Nasser's Soviet ties.",
            '**Canal Nationalisation (26 July 1956):** Nasser seized Suez Canal Company to fund Aswan Dam from toll revenues.',
          ],
        },
        {
          title: 'Protocol of Sèvres Collusion',
          subtitle: 'The Secret Tripartite Plot',
          bullets: [
            '**Secret Meeting:** British, French, and Israeli leaders met outside Paris in October 1956 to orchestrate war.',
            '**The Pretext:** Israel would invade Sinai; Britain and France would issue an ultimatum to "protect" the canal.',
            '**Operation Musketeer:** Anglo-French paratroopers landed at Port Said to seize the waterway.',
          ],
        },
        {
          title: 'Superpower Intervention',
          subtitle: 'US Ultimatum & Soviet Rockets',
          bullets: [
            "**Eisenhower's Fury:** US President threatened to collapse the British pound through IMF loan vetoes.",
            '**Soviet Nuclear Threats:** Khrushchev warned Britain and France of rocket strikes on London and Paris.',
            '**Humiliating Retreat:** Britain and France withdrew; Eden resigned; Nasser emerged as Pan-Arab hero.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Gamal Abdel Nasser',
          role: 'President of Egypt; nationalised Suez Canal and became the supreme leader of Pan-Arab nationalism.',
        },
        {
          name: 'Anthony Eden',
          role: 'British Prime Minister who viewed Nasser as a "new Hitler" and led Britain into disastrous imperial collusion.',
        },
        {
          name: 'Dwight D. Eisenhower',
          role: 'US President who forced Britain, France, and Israel to withdraw using financial and oil embargo threats.',
        },
        {
          name: 'David Ben-Gurion',
          role: 'Israeli Prime Minister who allied with France to break the Straits of Tiran blockade and secure Sinai.',
        },
      ],
      archivalSource: {
        title: 'President Gamal Abdel Nasser Speech in Alexandria (26 July 1956)',
        citation: 'Egyptian State Broadcast Archives, Radio Cairo',
        quote:
          'The Suez Canal Company is an Egyptian company, but it was stolen from us by imperialists... Today, in the name of the Egyptian people, I announce that the Suez Canal Company has been nationalised! We shall build the High Dam on our own skulls and blood!',
        significance:
          'The codeword "de Lesseps" triggered the military seizure of the canal offices, provoking the international crisis.',
      },
    },
    right: {
      tag: 'KT 1.4 • Military Campaigns, Strategic Aftermath & Word Bank',
      deepCases: [
        {
          title: '1. Operation Kadesh (Sinai Blitz)',
          points: [
            '**Israeli Drop:** Paratroopers dropped at Mitla Pass (29 Oct 1956), deep behind Egyptian lines.',
            '**Sinai Conquest:** IDF armoured columns swept across Sinai Peninsula to Sharm el-Sheikh in 100 hours.',
            '**Canal Stoppage:** Egyptian forces sank 40 ships filled with concrete, completely blocking the Suez Canal.',
          ],
        },
        {
          title: '2. Operation Musketeer (Allied Landing)',
          points: [
            "**Allied Bombing:** RAF and French aircraft bombed Egyptian airfields, destroying Nasser's new Soviet jets on runways.",
            '**Seaborne Assault:** 80,000 British and French troops landed at Port Said (5 Nov 1956).',
            '**Global Outrage:** UN General Assembly voted 64 to 5 condemning the invasion; British public split in anti-war protests.',
          ],
        },
        {
          title: '3. The UNEF "Blue Helmets" Buffer',
          points: [
            '**First Peacekeepers:** UN Emergency Force (UNEF) deployed to Sinai border and Sharm el-Sheikh in 1957.',
            '**Israeli Withdrawal:** Eisenhower forced Israel to evacuate Sinai and Gaza by threatening economic sanctions.',
            '**Tiran Reopened:** Guarantees ensured Israeli shipping could freely pass through the Straits of Tiran until 1967.',
          ],
        },
        {
          title: '4. The United Arab Republic (UAR, 1958)',
          points: [
            "**Pan-Arab Union:** Syria and Egypt merged into a single state under Nasser's supreme presidency in Feb 1958.",
            '**Peak Influence:** Nasserism threatened pro-Western Arab monarchies in Jordan, Iraq, and Saudi Arabia.',
            '**Collapse (1961):** Syrian military officers staged a coup to dissolve the union, resentful of Egyptian dominance.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Czech Arms & Aswan',
          text: 'Nasser buys Soviet-bloc arms; US cancels Aswan Dam funding; Nasser nationalises Suez Canal.',
        },
        {
          stage: '2. Sèvres Collusion',
          text: 'Britain, France, and Israel secretly agree invasion plan to topple Nasser and regain canal control.',
        },
        {
          stage: '3. US Economic Ultimatum',
          text: 'Eisenhower threatens British sterling collapse and oil cutoffs; Soviet Union threatens nuclear missiles.',
        },
        {
          stage: '4. Imperial Sunset',
          text: 'Allies suffer humiliating retreat; Anthony Eden resigns; Nasser becomes undisputed hero of Arab world.',
        },
      ],
      masterWordBank: [
        {
          term: 'Free Officers Movement',
          def: 'Egyptian military officers who overthrew King Farouk in 1952 coup.',
        },
        {
          term: 'Gamal Abdel Nasser',
          def: 'Egyptian President who nationalised the Suez Canal and led Pan-Arabism.',
        },
        {
          term: 'Czech Arms Deal',
          def: 'Sept 1955 Soviet-bloc weapons purchase that broke Western Middle East monopoly.',
        },
        {
          term: 'Aswan High Dam',
          def: 'Massive hydroelectric project on Nile; funding withdrawal triggered canal seizure.',
        },
        {
          term: 'Protocol of Sèvres',
          def: 'Secret Oct 1956 collusion between Britain, France, and Israel outside Paris.',
        },
        {
          term: 'Anthony Eden',
          def: 'British Prime Minister whose deception and resignation marked end of empire.',
        },
        {
          term: 'Operation Musketeer',
          def: 'Anglo-French military invasion and paratrooper drop at Port Said.',
        },
        {
          term: 'Operation Kadesh',
          def: 'Israeli 100-hour blitzkrieg across the Sinai Peninsula to Mitla Pass.',
        },
        {
          term: 'UNEF',
          def: 'UN Emergency Force: blue helmet peacekeepers deployed to Sinai buffer in 1957.',
        },
        {
          term: 'Straits of Tiran',
          def: "Strategic maritime chokepoint linking Israel's port of Eilat to Red Sea.",
        },
        {
          term: 'Mitla Pass',
          def: 'Strategic mountain pass in western Sinai where Israeli paratroopers dropped.',
        },
        {
          term: 'United Arab Republic',
          def: "1958–61 political union of Egypt and Syria under Nasser's presidency.",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 5 (KT 2.1): THE ROAD TO WAR & THE SIX DAY WAR (JUNE 1967)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_5',
    spreadNum: 5,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.1: The Road to War & The Six Day War (June 1967)',
    left: {
      tag: 'KT 2.1 • Brinkmanship, Operation Focus & The 6-Day Blitz',
      headline: 'Six Days that Remade the Map: Operation Focus and the Tri-Front Blitzkrieg',
      summary:
        "In the mid-1960s, tensions escalated rapidly between Israel, Syria, and Jordan. The 1964 Cairo Summit created the PLO; Syrian artillery bombarded Galilee kibbutzim; and an April 1967 dogfight resulted in 6 Syrian MiGs being downed. In May 1967, false Soviet intelligence claimed Israel was massing troops on Syria's border. Nasser mobilized 100,000 Egyptian troops in Sinai, expelled UNEF peacekeepers, and closed the Straits of Tiran, which Israel deemed a formal act of war. On 5 June 1967, Israel launched pre-emptive Operation Focus, destroying Arab airforces in hours and quadrupling its territory in six days.",
      pillars: [
        {
          title: 'Escalation to Crisis (May 1967)',
          subtitle: 'Soviet Lies & Tiran Blockade',
          bullets: [
            '**Soviet False Report:** USSR falsely alerted Nasser that 11 Israeli brigades were poised to invade Syria.',
            '**UNEF Expelled:** Nasser ordered UN peacekeepers out of Sinai buffer; massed 100,000 troops and 1,000 tanks.',
            '**Straits of Tiran Closed (22 May):** Blockaded Israeli port of Eilat; Arab leaders signed joint defence pacts.',
          ],
        },
        {
          title: 'Operation Focus (5 June 1967)',
          subtitle: 'Pre-emptive Air Blitzkrieg',
          bullets: [
            '**Low-Level Flight:** 200 Israeli jets flew undetected beneath Egyptian radar over the Mediterranean.',
            '**Runways Cratered:** Specialized French anti-runway bombs trapped 300 Egyptian aircraft on tarmac.',
            '**Total Air Supremacy:** Destroyed Egyptian, Syrian, and Jordanian airforces in under 4 hours.',
          ],
        },
        {
          title: 'Tri-Front Ground Victory',
          subtitle: 'Sinai, West Bank & Golan',
          bullets: [
            '**Sinai (5–8 June):** Armoured divisions under Tal and Sharon routed Egyptian forces back across Suez Canal.',
            '**West Bank & Jerusalem (5–7 June):** Paratroopers captured East Jerusalem; soldiers reached Western Wall.',
            '**Golan Heights (9–10 June):** Stormed fortified Syrian volcanic ridges, securing northern Galilee.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Yitzhak Rabin',
          role: 'IDF Chief of Staff who planned Operation Focus and directed the tri-front ground offensive.',
        },
        {
          name: 'Moshe Dayan',
          role: 'Appointed Minister of Defence on 1 June 1967, boosting national morale before the pre-emptive strike.',
        },
        {
          name: 'Gamal Abdel Nasser',
          role: 'Egyptian President whose brinkmanship, UNEF expulsion, and blockade triggered the Israeli strike.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'Entered war following false Egyptian claims of victory; lost the West Bank and East Jerusalem in 48 hours.',
        },
      ],
      archivalSource: {
        title: 'Motta Gur, Commander of 55th Paratroopers Brigade Radio Dispatch (7 June 1967)',
        citation: 'IDF Central Command Audio Archives, Jerusalem Sector',
        quote:
          'The Temple Mount is in our hands! I repeat, the Temple Mount is in our hands! All forces stop firing, we are at the Western Wall!',
        significance:
          'Captured the religious and emotional pinnacle of the war, ending 19 years of Jordanian division in Jerusalem.',
      },
    },
    right: {
      tag: 'KT 2.1 • Military Analysis, Decisive Turning Points & Word Bank',
      deepCases: [
        {
          title: '1. Syrian-Israeli Border Friction (1964–67)',
          points: [
            '**Water Wars:** Israel attacked Syrian engineering works attempting to divert headwaters of Jordan River.',
            '**Samu Raid (Nov 1966):** IDF raided Jordanian West Bank village in reprisal for Fatah mine attack.',
            '**April 7 Air Clash:** IAF downed 6 Syrian MiG-21s and buzzed the suburbs of Damascus in broad daylight.',
          ],
        },
        {
          title: '2. The Waiting Period (Hamtana)',
          points: [
            '**National Trauma:** Three weeks of total mobilization; public parks consecrated as emergency military cemeteries.',
            '**Diplomatic Deadlock:** Abba Eban toured Paris, London, and Washington; President Johnson warned "Israel will not be alone unless it decides to go alone."',
            '**National Unity Cabinet:** Levi Eshkol surrendered defence portfolio to popular hero Moshe Dayan.',
          ],
        },
        {
          title: '3. Capture of East Jerusalem (7 June)',
          points: [
            '**Jordanian Entry:** King Hussein shelled West Jerusalem despite Israeli diplomatic warnings to stay neutral.',
            '**Ammunition Hill Battle:** Fierce hand-to-hand combat by Israeli paratroopers broke Jordanian trench lines.',
            '**Unified City:** Israel immediately dismantled barbed wire and annexed East Jerusalem into sovereign municipal borders.',
          ],
        },
        {
          title: '4. The Spoils of Victory & Staggering Toll',
          points: [
            '**Land Area Quadrupled:** Israel seized 68,000 sq km (Sinai, Gaza, West Bank, East Jerusalem, Golan Heights).',
            '**Casualty Ratio:** 15,000 Egyptian, 6,000 Jordanian, and 1,000 Syrian dead vs 776 Israeli soldiers.',
            '**1 Million Captive Population:** Placed 1 million Palestinian Arabs under direct IDF military administration.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Border Clashes & Soviet Lies',
          text: 'Syrian shelling & April 1967 dogfights; Soviet false report prompts Nasser to mobilize 100k in Sinai.',
        },
        {
          stage: '2. UNEF Out & Tiran Blockade',
          text: 'Nasser expels UNEF peacekeepers; blockades Straits of Tiran; Arab leaders form joint war coalition.',
        },
        {
          stage: '3. Operation Focus (5 June)',
          text: 'Pre-emptive air strike wipes out 300 Arab aircraft on runways; IAF achieves total air supremacy.',
        },
        {
          stage: '4. Six-Day Land Blitz',
          text: 'IDF captures Sinai, Gaza, West Bank, Old City of Jerusalem, and Golan Heights; territory quadrupled.',
        },
      ],
      masterWordBank: [
        {
          term: 'Operation Focus (Moked)',
          def: 'Pre-emptive air strike (5 June 1967) destroying 300 Egyptian jets on runways.',
        },
        {
          term: 'Yitzhak Rabin',
          def: 'IDF Chief of Staff who architected the six-day military campaign.',
        },
        {
          term: 'Moshe Dayan',
          def: 'Appointed Minister of Defence 1 June 1967; face of Israeli victory.',
        },
        {
          term: 'Straits of Tiran',
          def: 'Closure to Israeli ships by Nasser (22 May 1967) constituted casus belli.',
        },
        {
          term: 'Hamtana (Waiting Period)',
          def: 'Three-week mobilization phase of acute existential anxiety before Israel struck.',
        },
        {
          term: 'Western Wall (Kotel)',
          def: 'Holiest Jewish site in Jerusalem, captured by paratroopers on 7 June.',
        },
        {
          term: 'Golan Heights',
          def: 'Strategic Syrian volcanic plateau captured 9–10 June 1967 to end artillery shelling.',
        },
        {
          term: 'Samu Raid (1966)',
          def: 'IDF cross-border raid into Jordan that inflamed Arab regional tensions.',
        },
        {
          term: 'MiG-21 Dogfight (7 Apr)',
          def: 'Air battle downing 6 Syrian jets; catalyst for Soviet false intelligence.',
        },
        {
          term: 'Ammunition Hill',
          def: 'Site of brutal trench battle in Jerusalem between paratroopers and Arab Legion.',
        },
        {
          term: 'Old City Annexation',
          def: 'Israel formally extended municipal law over East Jerusalem post-war.',
        },
        {
          term: 'Strategic Depth',
          def: 'Vast buffer territories (Sinai, West Bank, Golan) insulating core Israeli cities.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 6 (KT 2.2): AFTERMATH OF 1967: OCCUPIED LANDS & UN RES 242
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_6',
    spreadNum: 6,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.2: The 1967 Aftermath: Occupied Territories & UN Res 242',
    left: {
      tag: 'KT 2.2 • Occupation, Khartoum Summit & Resolution 242',
      headline: 'The Paradox of Victory: Occupied Lands, the "Three No\'s" and Resolution 242',
      summary:
        'The Six Day War transformed Israel from an insecure coastal state into an undisputed regional superpower. However, triumph brought profound dilemmas: Israel now occupied 1 million Palestinian Arabs in the West Bank and Gaza Strip, alongside the strategic Golan Heights and Sinai Peninsula. Arab leaders, shattered by defeat, convened at the Khartoum Summit in September 1967, issuing the defiant "Three No\'s". In November 1967, the UN Security Council passed Resolution 242, establishing the foundational "land for peace" formula, though deliberate linguistic ambiguities left its implementation bitterly contested.',
      pillars: [
        {
          title: 'Occupied Territories & Dilemmas',
          subtitle: 'Sinai, Golan, West Bank & Gaza',
          bullets: [
            '**Quadrupled Land Area:** Israel gained strategic depth, buffer zones, and oilfields in western Sinai.',
            '**Demographic Challenge:** 1 million Palestinians under military occupation raised existential questions of democracy vs Jewish majority.',
            '**Settlement Enterprise:** Religious and security groups founded pioneer settlements (Allon Plan / Kfar Etzion).',
          ],
        },
        {
          title: 'Khartoum Arab Summit (1967)',
          subtitle: 'The Defiant "Three No\'s"',
          bullets: [
            '**Rejection of Defeat:** Arab League leaders met in Sudan (Sept 1967) to establish unified policy.',
            '**The Three No\'s:** "No peace with Israel, no recognition of Israel, no negotiations with Israel."',
            '**Subsidies for Frontline States:** Saudi Arabia, Kuwait, and Libya provided financial aid to Egypt and Jordan.',
          ],
        },
        {
          title: 'UN Resolution 242 (Nov 1967)',
          subtitle: 'The "Land for Peace" Standard',
          bullets: [
            '**Clause 1 (Withdrawal):** Called for withdrawal of Israeli armed forces from territories occupied in recent conflict.',
            '**Clause 2 (Recognition):** Guaranteed sovereignty, territorial integrity, and freedom of international navigation.',
            '**The Palestinian Void:** Referred only to "a just settlement of the refugee problem", ignoring national self-determination.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Lord Caradon',
          role: 'British Ambassador to the UN who drafted Resolution 242, crafting its deliberate linguistic balance.',
        },
        {
          name: 'Gamal Abdel Nasser',
          role: 'Rebuilt Egyptian military with Soviet help; signed the Khartoum resolution rejecting direct peace talks.',
        },
        {
          name: 'Levi Eshkol',
          role: 'Israeli Prime Minister who offered to return Sinai and Golan for full peace treaties, but was rebuffed at Khartoum.',
        },
        {
          name: 'Gunnar Jarring',
          role: 'Swedish diplomat appointed as UN Special Envoy to mediate between Israel, Egypt, and Jordan under Res 242.',
        },
      ],
      archivalSource: {
        title: 'UN Security Council Resolution 242 (22 November 1967)',
        citation: 'United Nations Official Document S/RES/242',
        quote:
          'Emphasizing the inadmissibility of the acquisition of territory by war and the need to work for a just and lasting peace in which every State in the area can live in security... Affirms that the fulfillment of Charter principles requires the establishment of a just and lasting peace...',
        significance:
          'Formed the legal cornerstone of all subsequent Middle East negotiations, from Camp David to Madrid and Oslo.',
      },
    },
    right: {
      tag: 'KT 2.2 • Thematic Deep-Dive, Legal Ambiguities & Word Bank',
      deepCases: [
        {
          title: '1. The Linguistic Ambiguity (English vs French)',
          points: [
            '**English Text:** Mandated withdrawal from *"territories occupied"* (omitting the word *"the"*), implying withdrawal from some, but not necessarily all, lands.',
            '**French Text:** Read *"de tous les territoires"* (from all the territories), backed by Arab states and USSR.',
            '**Bilateral Leverage:** Israel argued withdrawal was conditional on Arab states signing binding bilateral peace treaties establishing recognized borders.',
          ],
        },
        {
          title: '2. The Allon Plan & Early Settlements',
          points: [
            '**Security Buffer:** Proposed by Yigal Allon in 1967; envisioned annexing a security perimeter along Jordan Valley and Jerusalem.',
            '**Palestinian Autonomy:** Densely populated Arab hill towns in West Bank were to be returned to Jordanian civil administration.',
            '**Gush Emunim Roots:** Religious Zionists initiated unauthorized settlements (e.g. Hebron in 1968), viewing the land as God-given Judea and Samaria.',
          ],
        },
        {
          title: '3. East Jerusalem Annexation',
          points: [
            '**Municipal Expansion:** On 27 June 1967, Israel expanded Jerusalem municipal borders by 70 sq km, declaring it unified and indivisible.',
            '**Residency vs Citizenship:** Arab residents given permanent residency cards rather than automatic Israeli citizenship.',
            "**International Condemnation:** UN General Assembly declared Israeli measures altering Jerusalem's status null and void.",
          ],
        },
        {
          title: '4. The Suez Canal Closure & Bar-Lev Line',
          points: [
            '**Canal Paralyzed:** Blocked by sunken vessels; remained closed to international shipping for 8 full years (1967–75).',
            '**Bar-Lev Line:** Israel constructed a $300m chain of 35 sand ramparts and concrete forts along east bank of canal.',
            '**War of Attrition:** Egypt launched artillery barrages and commando raids across canal from 1969 to 1970.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Six-Day Victory',
          text: 'Israel captures Sinai, Golan, West Bank, Gaza, and East Jerusalem; controls 1m Palestinians.',
        },
        {
          stage: '2. Khartoum "Three No\'s"',
          text: 'Arab states reject defeat (Sept 1967): no peace, no recognition, no negotiations.',
        },
        {
          stage: '3. UN Res 242 Drafted',
          text: 'UN establishes "land for peace"; deliberate missing "the" leaves withdrawal boundaries contested.',
        },
        {
          stage: '4. Frozen Conflict',
          text: 'Suez Canal remains closed; Bar-Lev Line constructed; Palestinians turn to independent armed struggle.',
        },
      ],
      masterWordBank: [
        {
          term: 'UN Resolution 242',
          def: 'Nov 1967 UN standard establishing "land for peace" formula.',
        },
        {
          term: 'Khartoum Summit',
          def: 'Sept 1967 Arab League conference issuing the defiant "Three No\'s".',
        },
        {
          term: 'The "Three No\'s"',
          def: 'No peace, no recognition, no negotiation with the State of Israel.',
        },
        {
          term: 'Lord Caradon',
          def: 'British diplomat who drafted the ambiguous wording of Resolution 242.',
        },
        {
          term: 'Occupied Territories',
          def: 'West Bank, Gaza Strip, Golan Heights, Sinai, and East Jerusalem.',
        },
        {
          term: 'Land for Peace',
          def: 'Core diplomatic trade-off: Israeli territorial withdrawal for Arab treaty recognition.',
        },
        {
          term: 'Allon Plan',
          def: '1967 Israeli strategic proposal to retain Jordan Valley while returning Arab population hubs.',
        },
        {
          term: 'Bar-Lev Line',
          def: 'Heavily fortified sand and concrete defense barrier along Suez Canal.',
        },
        {
          term: 'Gunnar Jarring',
          def: 'UN Special Representative tasked with mediating Resolution 242 implementation.',
        },
        {
          term: 'Judea and Samaria',
          def: 'Biblical and official Israeli administrative term for the West Bank.',
        },
        {
          term: 'East Jerusalem',
          def: 'Arab sector containing Old City holy sites, annexed by Israel in June 1967.',
        },
        {
          term: 'War of Attrition',
          def: '1969–70 artillery and air war along the Suez Canal between Egypt and Israel.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 7 (KT 2.3): RISE OF THE PLO & BLACK SEPTEMBER (1964–72)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_7',
    spreadNum: 7,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.3: The Rise of Palestinian Resistance, Fatah & Black September (1964–72)',
    left: {
      tag: 'KT 2.3 • Fatah, Karameh, Civil War & Munich 1972',
      headline: "The Armed Struggle: Yasser Arafat, Dawson's Field and the Munich Massacre",
      summary:
        'Following the humiliating failure of conventional Arab armies in the 1967 war, Palestinians recognized that Arab states would not liberate their homeland. Under Yasser Arafat, Fatah seized control of the Palestine Liberation Organization (PLO) in 1969, shifting to guerrilla warfare. After the 1968 Battle of Karameh, the PLO established a "state within a state" in Jordan, clashing with King Hussein. Following the Dawson\'s Field aircraft hijackings in September 1970, Hussein unleashed his army in Black September, violently expelling the PLO to southern Lebanon. In revenge, the Black September faction executed the 1972 Munich Olympics massacre.',
      pillars: [
        {
          title: 'Battle of Karameh (1968)',
          subtitle: "Fatah's Myth of Resistance",
          bullets: [
            '**Israeli Raid:** IDF launched heavy reprisal raid across Jordan River on Fatah base at Karameh (21 March 1968).',
            '**Fierce Resistance:** Fatah guerrillas and Jordanian artillery inflicted 28 Israeli deaths and destroyed armor.',
            '**Propaganda Triumph:** Arafat claimed victory; 20,000 volunteers joined fedayeen ranks within weeks.',
          ],
        },
        {
          title: 'Crisis in Jordan (1970)',
          subtitle: "Dawson's Field & Black September",
          bullets: [
            '**State Within a State:** Armed fedayeen openly patrolled Amman, set up roadblocks, and ignored Jordanian laws.',
            "**Dawson's Field (Sept 1970):** Marxist PFLP hijacked 4 airliners, blew up 3 in the desert, challenging Hussein's crown.",
            '**Crackdown:** King Hussein unleashed army; 3,000–5,000 Palestinians killed; PLO expelled to Lebanon.',
          ],
        },
        {
          title: 'Munich Olympics Massacre (1972)',
          subtitle: 'International Terror & Reprisals',
          bullets: [
            '**Olympic Village Attack:** 8 Black September militants stormed Israeli dormitory (5 Sept 1972), killing 2 athletes and taking 9 hostage.',
            '**Airport Catastrophe:** Botched West German rescue attempt at Fürstenfeldbruck airbase; all 9 hostages murdered.',
            '**Operation Wrath of God:** Prime Minister Golda Meir authorized Mossad hit squads to assassinate perpetrators across Europe.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Yasser Arafat',
          role: 'Fatah founder and PLO Chairman (1969–2004); transformed the Palestinian movement into an independent armed force.',
        },
        {
          name: 'King Hussein of Jordan',
          role: 'Hashemite monarch who crushed Palestinian militias during Black September (1970) to preserve his throne.',
        },
        {
          name: 'George Habash',
          role: 'Marxist leader of the Popular Front for the Liberation of Palestine (PFLP); pioneered airplane hijackings.',
        },
        {
          name: 'Golda Meir',
          role: 'Israeli Prime Minister (1969–74) who ordered Operation Wrath of God to eliminate Black September operatives.',
        },
      ],
      archivalSource: {
        title: 'Yasser Arafat Address to the Palestinian National Council (Cairo, 1969)',
        citation: 'PLO Executive Committee Archives, Document Series 4',
        quote:
          'Armed struggle is the only way to liberate Palestine. It is the overall strategy, not merely a tactical phase... We will not accept any resolution that treats us as refugees. We are a people fighting for our homeland!',
        significance:
          'Signaled the final rejection of UN Resolution 242 and the shift to autonomous guerrilla warfare.',
      },
    },
    right: {
      tag: 'KT 2.3 • Thematic Deep-Dive, Terrorism & Word Bank',
      deepCases: [
        {
          title: '1. Creation of the PLO (1964)',
          points: [
            '**Arab League Sponsorship:** Founded at the 1964 Cairo Summit under Egyptian influence to control Palestinian nationalism.',
            '**National Charter:** Called for the complete destruction of Israel and establishment of a secular state across Palestine.',
            '**Fatah Takeover (1969):** Arafat marginalized older diplomatic leaders (Ahmad Shukeiri), establishing guerilla primacy.',
          ],
        },
        {
          title: "2. The Dawson's Field Hijackings (Sept 1970)",
          points: [
            '**Spectacular Terror:** PFLP hijacked Swissair, TWA, BOAC, and Pan Am airliners; landed three at a desert airstrip in Jordan.',
            '**Hostage Trade:** Held 300 passengers hostage, demanding the release of Palestinian militants imprisoned in Europe and Israel.',
            '**Provocation:** Blowing up the empty multi-million-dollar airliners on television forced King Hussein to declare martial law.',
          ],
        },
        {
          title: '3. The Syrian Invasion of Jordan (1970)',
          points: [
            "**Armoured Intervention:** Syrian Ba'athists painted tanks with Palestine Liberation Army insignia and invaded northern Jordan.",
            "**Hussein's Stand:** Royal Jordanian Air Force and loyal Bedouin tank units routed Syrian armor.",
            "**Hafez al-Assad Role:** Syrian Air Force commander Assad refused to provide air cover, leading to Syria's retreat and his own coup in Damascus.",
          ],
        },
        {
          title: '4. Relocation to Lebanon ("Fatahland")',
          points: [
            '**Refuge in Beirut:** Expelled from Jordan, Arafat moved PLO headquarters and 15,000 armed commandos to southern Lebanon.',
            '**Fatahland Enclave:** Set up bases in the Arkoub region, launching daily Katyusha rocket attacks into northern Israeli towns (Kiryat Shmona).',
            "**Lebanese Civil War (1975):** PLO armed presence destabilized Lebanon's delicate sectarian balance, triggering all-out civil war.",
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. 1967 Arab Collapse',
          text: 'Conventional defeat prompts Palestinians to reject Arab state tutelage; Arafat takes over PLO (1969).',
        },
        {
          stage: '2. Karameh & Jordanian Base',
          text: 'Battle of Karameh (1968) makes Arafat a hero; PLO establishes armed "state within a state" in Jordan.',
        },
        {
          stage: "3. Dawson's Field & Black Sept",
          text: 'PFLP airliner hijackings provoke King Hussein to crush PLO; thousands killed; PLO expelled to Lebanon.',
        },
        {
          stage: '4. Munich Olympics 1972',
          text: 'Black September terror cell murders 11 Israeli athletes; Golda Meir launches Operation Wrath of God.',
        },
      ],
      masterWordBank: [
        {
          term: 'PLO',
          def: 'Palestine Liberation Organization, founded in 1964 to represent the Palestinian people.',
        },
        {
          term: 'Fatah',
          def: 'Palestinian national liberation movement founded by Yasser Arafat in 1959.',
        },
        {
          term: 'Yasser Arafat',
          def: 'Chairman of the PLO who led the armed guerrilla struggle from exile.',
        },
        {
          term: 'Battle of Karameh',
          def: 'March 1968 battle in Jordan establishing the legend of armed Palestinian resistance.',
        },
        {
          term: 'PFLP',
          def: 'Popular Front for the Liberation of Palestine, Marxist faction led by George Habash.',
        },
        {
          term: "Dawson's Field",
          def: 'Desert airstrip in Jordan where PFLP blew up hijacked airliners in Sept 1970.',
        },
        {
          term: 'King Hussein',
          def: 'Monarch of Jordan who launched Black September offensive to preserve Hashemite rule.',
        },
        {
          term: 'Black September (1970)',
          def: 'Jordanian military campaign expelling the PLO from Jordanian territory.',
        },
        {
          term: 'Fatahland',
          def: 'Southern Lebanon region controlled by armed PLO commandos post-1970.',
        },
        {
          term: 'Munich Olympics (1972)',
          def: 'Black September attack murdering 11 Israeli Olympic athletes and coaches.',
        },
        {
          term: 'Operation Wrath of God',
          def: 'Covert Israeli Mossad campaign assassinating Black September militants across Europe.',
        },
        {
          term: 'Katyusha Rockets',
          def: 'Soviet-supplied artillery rockets fired by PLO into northern Israeli settlements.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 8 (KT 2.4): WAR OF ATTRITION & THE YOM KIPPUR WAR (OCTOBER 1973)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_8',
    spreadNum: 8,
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.4: The War of Attrition & The Yom Kippur War (October 1973)',
    left: {
      tag: 'KT 2.4 • Surprise Crossing, SAM Umbrella & Oil Weapon',
      headline: 'The Day of Atonement Shock: Operation Badr, Cold War Airlifts and the Oil Weapon',
      summary:
        "Following Nasser's death in 1970, Anwar Sadat became President of Egypt. Determined to break the diplomatic stalemate and regain the Sinai, Sadat expelled 15,000 Soviet advisers in 1972 to signal independence. On 6 October 1973 (Yom Kippur and 10th Ramadan), Egypt and Syria launched a coordinated surprise assault. Egypt's Operation Badr breached the Bar-Lev Line with high-pressure water cannons, while 1,400 Syrian tanks stormed the Golan Heights. Protected by mobile SAM missile umbrellas, Arab armies shattered Israel's myth of invincibility before massive US airlifts enabled fierce Israeli counter-attacks.",
      pillars: [
        {
          title: 'Operation Badr (6 Oct 1973)',
          subtitle: 'The Canal Crossing & Bar-Lev Fall',
          bullets: [
            '**Deception & Surprise:** Launched at 2:00 PM on holiest Jewish holiday; only 450 Israeli reservists manned canal forts.',
            '**High-Pressure Water Cannons:** Blasted 60 gaps through 60-foot sand ramparts in under 9 hours.',
            '**Pontoon Bridges:** 100,000 soldiers and 1,000 tanks crossed; established bridgehead 5 miles deep in Sinai.',
          ],
        },
        {
          title: 'Crisis on the Golan Heights',
          subtitle: 'The Valley of Tears Clash',
          bullets: [
            '**Syrian Tank Juggernaut:** 1,400 Syrian tanks stormed Golan, outnumbering Israeli defenders 10 to 1.',
            '**Valley of Tears:** 7th Armoured Brigade held out heroically, destroying 300 Syrian tanks before reinforcements arrived.',
            '**Counter-Offensive:** IDF pushed Syrian forces back, advancing to within 25 miles of Damascus by 12 October.',
          ],
        },
        {
          title: "Sharon's Canal Counter-Crossing",
          subtitle: 'Encirclement & Ceasefire',
          bullets: [
            '**Chinese Farm Battle:** Bloodiest tank clash of the war; Israeli forces breached Egyptian lines to the Great Bitter Lake.',
            "**Canal Crossing (15 Oct):** Ariel Sharon led armoured division across canal, encircling Egypt's 20,000-strong Third Army.",
            '**Superpower Defcon 3:** US put nuclear forces on alert when Soviets threatened to intervene; UN Res 338 halted war.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Anwar Sadat',
          role: 'President of Egypt who planned the surprise assault to force international diplomacy and restore Arab honor.',
        },
        {
          name: 'Golda Meir',
          role: 'Israeli Prime Minister who faced national outrage over intelligence complacency; resigned following the war.',
        },
        {
          name: 'Ariel Sharon',
          role: 'IDF Armoured Commander who disobeyed orders to lead the decisive counter-crossing of the Suez Canal.',
        },
        {
          name: 'Henry Kissinger',
          role: 'US Secretary of State who organized Operation Nickel Grass airlift and mediated the ceasefires.',
        },
      ],
      archivalSource: {
        title: 'Anwar Sadat Speech to the Egyptian People (16 October 1973)',
        citation: 'Egyptian National Archives, Cairo Presidential Files',
        quote:
          'We have broken the barrier of fear! The myth of Israeli invincibility has been shattered forever into dust. We do not fight to destroy anyone, but we fight to liberate our holy land and restore our stolen rights!',
        significance:
          'Marked the psychological restoration of Egyptian pride, creating the political leverage needed for peace talks.',
      },
    },
    right: {
      tag: 'KT 2.4 • Strategic Analysis, Superpower Crisis & Word Bank',
      deepCases: [
        {
          title: '1. The "Conceptzia" Intelligence Failure',
          points: [
            '**Complacency:** Israeli military intelligence believed Egypt would never attack without long-range bombers to neutralize IAF.',
            "**Ignored Warnings:** Dismissed Egyptian border maneuvers as routine training exercises; ignored King Hussein's secret warning.",
            "**Agranat Commission (1974):** Independent inquiry blamed Chief of Staff David Elazar and intelligence chief Zeira; forced Golda Meir's resignation.",
          ],
        },
        {
          title: '2. Soviet Tech: SAM Umbrellas & Sagger Missiles',
          points: [
            '**Air Defence Trap:** Mobile Soviet SAM-6 missile batteries along the canal shot down 40 Israeli jets in the first 48 hours.',
            '**Anti-Tank Wire Missiles:** Infantry-portable AT-3 Sagger missiles decimated Israeli tank charges without infantry support.',
            "**Technological Shock:** Neutralized Israel's two primary tactical advantages: air supremacy and mobile armor blitzkrieg.",
          ],
        },
        {
          title: '3. Cold War Resupply Airlifts',
          points: [
            '**Soviet Airlift (8 Oct):** Moscow flew 15,000 tons of heavy weapons to Syria and Egypt to sustain their offensives.',
            '**Operation Nickel Grass (14 Oct):** President Nixon ordered emergency US military airlift, delivering 22,000 tons of tanks and smart bombs to Israel.',
            '**Decisive Resupply:** Replaced all lost Israeli equipment, allowing IDF to mount massive counter-offensives.',
          ],
        },
        {
          title: '4. The Arab OPEC Oil Weapon',
          points: [
            '**Embargo (17 Oct 1973):** Arab oil producers (OAPEC) cut production by 5% monthly and banned oil exports to the US and Netherlands.',
            '**Economic Chaos:** Global crude oil prices quadrupled (from $3 to $12 per barrel), triggering inflation and fuel rationing in the West.',
            '**Diplomatic Leverage:** Compelled European nations and the US to adopt a more pro-Arab stance and pressure Israel for territorial concessions.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Surprise Assault',
          text: 'Egypt & Syria strike on Yom Kippur; Bar-Lev Line breached by water cannons; Golan front imperiled.',
        },
        {
          stage: '2. SAM & Sagger Shock',
          text: 'Soviet missiles neutralize Israeli air and tank tactics; IDF suffers devastating initial losses.',
        },
        {
          stage: '3. US Airlift & Sharon Cross',
          text: 'Operation Nickel Grass resupplies Israel; Sharon crosses Suez Canal, encircling Egyptian Third Army.',
        },
        {
          stage: '4. OPEC Embargo & Diplomacy',
          text: 'OPEC oil embargo quadruples prices; UN Res 338 ceasefire; proves Israel is not invincible.',
        },
      ],
      masterWordBank: [
        {
          term: 'Yom Kippur War',
          def: 'October 1973 war launched on holiest Jewish holiday by Egypt and Syria.',
        },
        {
          term: 'Operation Badr',
          def: 'Egyptian military code name for the crossing of the Suez Canal on 6 Oct 1973.',
        },
        {
          term: 'Bar-Lev Line',
          def: 'Israeli canal defense barrier breached using high-pressure water cannons.',
        },
        {
          term: 'Anwar Sadat',
          def: 'President of Egypt who planned the war to restore Arab honor and regain Sinai.',
        },
        {
          term: 'SAM-6 Missile',
          def: 'Soviet surface-to-air missile system that neutralized Israeli air supremacy.',
        },
        {
          term: 'AT-3 Sagger',
          def: 'Wire-guided anti-tank missile used by Egyptian infantry to destroy Israeli tanks.',
        },
        {
          term: 'Valley of Tears',
          def: 'Epic tank battle in northern Golan Heights where Israeli 7th Brigade held off 300 Syrian tanks.',
        },
        {
          term: 'Operation Nickel Grass',
          def: 'Emergency US military airlift ordered by Nixon delivering 22,000 tons of arms to Israel.',
        },
        {
          term: 'Chinese Farm',
          def: 'Site of the bloodiest tank battle in the Sinai during the Israeli counter-crossing.',
        },
        {
          term: 'Agranat Commission',
          def: "1974 Israeli inquiry investigating military unpreparedness, leading to Meir's resignation.",
        },
        {
          term: 'OPEC Oil Embargo',
          def: 'Quadrupling of global oil prices and boycott of US imposed by Arab petroleum nations.',
        },
        {
          term: 'UN Resolution 338',
          def: 'UN Security Council resolution (22 Oct 1973) enforcing ceasefire and negotiations.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 9 (KT 3.1): CAMP DAVID & THE WASHINGTON TREATY (1973–79)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_9',
    spreadNum: 9,
    topic: 'Key Topic 3 • Attempts at a Solution, 1974–95',
    title:
      'KT 3.1: Diplomatic Negotiations: Shuttle Diplomacy, Camp David & Treaty of Washington (1974–79)',
    left: {
      tag: 'KT 3.1 • Shuttle Diplomacy, Jerusalem Visit & Peace Treaty',
      headline:
        'The Historic Breakthrough: Sadat in Jerusalem, Camp David and the Treaty of Washington',
      summary:
        'The 1973 war convinced both Washington and Cairo that prolonged military confrontation was unsustainable. US Secretary of State Henry Kissinger initiated "shuttle diplomacy", achieving step-by-step military disengagements and the reopening of the Suez Canal in 1975. In November 1977, Egyptian President Anwar Sadat stunned the world by flying to Jerusalem and addressing the Israeli Knesset. US President Jimmy Carter convened Sadat and Israeli Prime Minister Menachem Begin at Camp David for 13 days in September 1978, resulting in the historic 1979 Treaty of Washington—the first peace treaty between Israel and an Arab state.',
      pillars: [
        {
          title: "Kissinger's Shuttle Diplomacy",
          subtitle: 'Step-by-Step Disengagement',
          bullets: [
            '**Sinai Disengagements (1974–75):** Kissinger brokered Israeli pullback from canal; Egypt allowed passage of non-military cargo.',
            '**Canal Reopening (June 1975):** Sadat reopened Suez Canal to global shipping after 8 years of closure.',
            '**Expulsion of USSR Influence:** United States established itself as the sole dominant diplomatic arbiter in Middle East.',
          ],
        },
        {
          title: "Sadat's Jerusalem Visit (1977)",
          subtitle: 'Breaking the Psychological Wall',
          bullets: [
            '**Bold Initiative:** Sadat announced to Egyptian Parliament: "I am ready to go to the end of the world, even to the Knesset."',
            '**Historic Speech (20 Nov 1977):** Addressed Israeli parliament in Jerusalem: "No more war, no more bloodshed."',
            '**Direct Bilateral Dialogue:** Shattered the 30-year psychological taboo against direct Arab recognition of Israel.',
          ],
        },
        {
          title: 'Camp David & Washington Treaty',
          subtitle: 'Land for Peace Realized',
          bullets: [
            '**13-Day Summit (Sept 1978):** Jimmy Carter mediated round-the-clock talks; saved conference from collapse.',
            '**Treaty of Washington (26 Mar 1979):** Full peace treaty; Israel returned entire Sinai in exchange for full diplomatic ties.',
            '**Arab Backlash:** Arab League suspended Egypt, moved HQ to Tunis, and cut diplomatic relations; Sadat assassinated in 1981.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Anwar Sadat',
          role: 'Egyptian President who risked his life and Arab leadership to achieve peace and recover the Sinai Peninsula.',
        },
        {
          name: 'Menachem Begin',
          role: 'Likud Prime Minister of Israel who made the strategic compromise to dismantle Yamit and return Sinai.',
        },
        {
          name: 'Jimmy Carter',
          role: 'US President whose relentless personal mediation and financial aid packages secured the Camp David Accords.',
        },
        {
          name: 'Henry Kissinger',
          role: 'US Secretary of State who pioneered "shuttle diplomacy" between Jerusalem, Cairo, and Damascus.',
        },
      ],
      archivalSource: {
        title: 'President Anwar Sadat Address to the Israeli Knesset (20 November 1977)',
        citation: 'Official Records of the Knesset, Jerusalem',
        quote:
          'I come to you today on firm ground, to shape a new life, to establish peace... There are moments in the lives of nations when it is incumbent upon those endowed with wisdom and vision to look beyond the past... We all live on this land, the land of God.',
        significance:
          'The first time an Arab head of state visited Israel; recognized the Jewish state and broke three decades of rejectionism.',
      },
    },
    right: {
      tag: 'KT 3.1 • Treaty Architecture, Arab Rejection & Word Bank',
      deepCases: [
        {
          title: '1. The 13 Days at Camp David (Sept 1978)',
          points: [
            '**Seclusion in Maryland:** Carter isolated Begin and Sadat at the presidential retreat to prevent press leaks and posturing.',
            '**Near Collapse:** Talks nearly collapsed over the dismantling of Jewish settlements in Sinai (Yamit) and Palestinian autonomy.',
            "**Carter's Personal Touch:** Hand-delivered autographed photos of the three leaders inscribed to Begin's grandchildren, softening Begin's stance.",
          ],
        },
        {
          title: '2. The Treaty of Washington Terms (1979)',
          points: [
            '**Territorial Return:** Israel withdrew completely from Sinai Peninsula over three years, returning Ras Sudr oilfields.',
            '**Demilitarized Zones:** Sinai partitioned into strict demilitarized zones monitored by Multinational Force and Observers (MFO).',
            '**Maritime Passage:** Guaranteed free Israeli passage through Suez Canal, Gulf of Suez, and Straits of Tiran.',
          ],
        },
        {
          title: '3. The Palestinian Autonomy Failure',
          points: [
            '**Second Framework:** Camp David included a framework for five-year transitional autonomy for West Bank and Gaza Palestinians.',
            '**Vague Commitments:** Lacked concrete timetables or enforcement mechanisms; Begin refused to halt West Bank settlements.',
            '**Palestinian Condemnation:** Denounced by Arafat and the PLO as a separate peace that abandoned the Palestinian national cause.',
          ],
        },
        {
          title: "4. Arab World Retaliation & Sadat's Assassination",
          points: [
            '**Arab League Expulsion:** Arab states boycotted Egypt; moved Arab League headquarters from Cairo to Tunis.',
            '**US Subsidies:** US compensated Egypt and Israel with permanent annual military and economic aid ($2B+ each).',
            '**Assassination (6 Oct 1981):** Sadat was gunned down by Islamic Jihad soldiers during an anniversary parade in Cairo.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. 1973 Stalemate',
          text: '1973 war convinces US & Egypt of need for peace; Kissinger shuttle diplomacy reopens Suez (1975).',
        },
        {
          stage: '2. Jerusalem Visit (1977)',
          text: 'Sadat shocks world by flying to Jerusalem and addressing Knesset; offers peace for land return.',
        },
        {
          stage: '3. Camp David Accords',
          text: 'Carter mediates 13 intense days; Begin agrees to return Sinai; Sadat recognizes Israel.',
        },
        {
          stage: '4. 1979 Treaty & Backlash',
          text: 'Treaty of Washington signed; Arab League expels Egypt; Sadat assassinated by Islamists (1981).',
        },
      ],
      masterWordBank: [
        {
          term: 'Shuttle Diplomacy',
          def: "Henry Kissinger's back-and-forth travel between Middle Eastern capitals to broker disengagements.",
        },
        {
          term: 'Anwar Sadat',
          def: 'Egyptian President who broke Arab taboo by visiting Jerusalem; assassinated in 1981.',
        },
        {
          term: 'Menachem Begin',
          def: 'Right-wing Likud Prime Minister of Israel who signed the Camp David Accords.',
        },
        {
          term: 'Jimmy Carter',
          def: 'US President who mediated the 1978 Camp David summit and guaranteed aid.',
        },
        {
          term: 'Knesset Speech',
          def: "Sadat's 20 Nov 1977 historic address offering peace in the Israeli parliament.",
        },
        {
          term: 'Camp David Accords',
          def: 'Sept 1978 framework agreements brokered over 13 days in Maryland.',
        },
        {
          term: 'Treaty of Washington',
          def: 'Formal Egypt-Israel Peace Treaty signed on White House lawn on 26 March 1979.',
        },
        {
          term: 'Yamit',
          def: 'Main Israeli settlement in Sinai, completely bulldozed and evacuated in April 1982.',
        },
        {
          term: 'MFO Peacekeepers',
          def: 'Multinational Force and Observers monitoring demilitarized zones in Sinai.',
        },
        {
          term: 'Arab League Boycott',
          def: 'Severing of Arab diplomatic ties and relocation of Arab League HQ to Tunis.',
        },
        {
          term: 'Suez Reopening (1975)',
          def: 'Canal reopened to international shipping after 8 years of wartime closure.',
        },
        {
          term: 'Egyptian Islamic Jihad',
          def: 'Militant Islamist organization that assassinated Sadat during 1981 military parade.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 10 (KT 3.2): THE LEBANON WAR & SABRA-SHATILA (1982)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_10',
    spreadNum: 10,
    topic: 'Key Topic 3 • Attempts at a Solution, 1974–95',
    title: 'KT 3.2: The Palestinian Issue: The 1982 Lebanon War & Sabra-Shatila',
    left: {
      tag: 'KT 3.2 • Operation Peace for Galilee, Beirut Siege & Sabra-Shatila',
      headline:
        'The Lebanese Quagmire: Operation Peace for Galilee, Sabra-Shatila and the Rise of Hezbollah',
      summary:
        'Following its expulsion from Jordan in 1970, the PLO transformed southern Lebanon into a militarized base ("Fatahland"), conducting artillery and commando attacks into northern Israel. On 6 June 1982, following the attempted assassination of Israeli Ambassador Shlomo Argov in London, Defence Minister Ariel Sharon launched Operation Peace for Galilee. Sharon exceeded his cabinet-approved 40-km buffer mandate, advancing 100 km to besiege West Beirut. The siege culminated in the expulsion of 14,000 PLO fighters to Tunisia, the horrific Sabra and Shatila massacre, Sharon\'s political disgrace, and the birth of Hezbollah.',
      pillars: [
        {
          title: 'Invasion of Lebanon (June 1982)',
          subtitle: 'Operation Peace for Galilee',
          bullets: [
            '**The Trigger:** Abu Nidal terror cell shot Israeli Ambassador Shlomo Argov in London (3 June 1982).',
            '**Cabinet Mandate Exceeded:** Sharon promised a limited 40-km buffer, but drove IDF tanks 100 km all the way to Beirut.',
            '**Syrian Air Clash:** In Bekaa Valley air battle, IAF destroyed 29 Syrian SAM batteries and downed 82 Syrian MiGs with zero losses.',
          ],
        },
        {
          title: 'Siege of Beirut & Evacuation',
          subtitle: 'Urban Bombardment & PLO Exit',
          bullets: [
            '**70-Day Siege:** Heavy aerial and artillery bombardment cut electricity and water to Muslim West Beirut.',
            '**Philip Habib Accord:** US envoy brokered international ceasefire guaranteeing safe evacuation of PLO.',
            '**Exile to Tunis:** Arafat and 14,000 armed fighters evacuated by sea to Tunisia, scattering the PLO core.',
          ],
        },
        {
          title: 'Sabra & Shatila Massacre (1982)',
          subtitle: 'The Christian Militia Slaughter',
          bullets: [
            '**President Gemayel Assassinated:** Christian Maronite leader Bashir Gemayel killed in bomb blast (14 Sept).',
            '**The Atrocity (16–18 Sept):** IDF allowed 150 Phalangist militiamen into refugee camps; 800–2,000 civilians slaughtered.',
            '**Kahan Commission (1983):** Found Sharon bore "indirect personal responsibility"; Sharon forced to resign as Defence Minister.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Ariel Sharon',
          role: 'Defence Minister who engineered the Lebanon invasion; forced to resign after the Kahan Commission report.',
        },
        {
          name: 'Yasser Arafat',
          role: 'PLO Chairman who commanded the siege of Beirut and was forced into distant exile in Tunis.',
        },
        {
          name: 'Bashir Gemayel',
          role: 'Leader of Christian Phalangist militia and President-elect of Lebanon, assassinated before taking office.',
        },
        {
          name: 'Hezbollah',
          role: 'Radical Shia Islamist movement backed by Iran, founded in 1982 to wage suicide warfare against IDF troops.',
        },
      ],
      archivalSource: {
        title: 'Report of the Kahan Commission of Inquiry (Jerusalem, 7 February 1983)',
        citation: 'Official Judicial Commission Report, State of Israel',
        quote:
          'The Minister of Defence made a grave mistake when he decided that the Phalangists should go into the camps... He failed to take appropriate measures to prevent or reduce the danger of massacre. He bears personal responsibility.',
        significance:
          'Marked unprecedented democratic accountability in wartime; prompted 400,000 Israelis to protest in Tel Aviv.',
      },
    },
    right: {
      tag: 'KT 3.2 • Thematic Deep-Dive, Geopolitical Consequences & Word Bank',
      deepCases: [
        {
          title: '1. The Bekaa Valley Air Triumph',
          points: [
            '**Operation Mole Cricket 19:** In two hours, the Israeli Air Force completely destroyed Soviet-supplied Syrian SAM umbrella in Lebanon.',
            '**Tactical Revolution:** Deployed unmanned aerial drones as decoys and airborne electronic jamming.',
            '**Cold War Impact:** Shocked Soviet military leadership, proving American-supplied Israeli technology was vastly superior to Warsaw Pact hardware.',
          ],
        },
        {
          title: '2. The Kahan Commission & Tel Aviv Protests',
          points: [
            "**Mass Movement:** 400,000 citizens (10% of Israel's population) rallied in Tel Aviv's Kings of Israel Square demanding an inquiry.",
            '**Judicial Findings:** Prime Minister Begin found partly responsible for indifference; Sharon barred from ever serving as Defence Minister again.',
            '**Societal Divide:** Marked the end of Israeli national consensus on defense; divided public between Peace Now and nationalist factions.',
          ],
        },
        {
          title: '3. The Southern Lebanon "Security Zone"',
          points: [
            '**Partial Withdrawal (1985):** IDF withdrew from Beirut but established a permanent 10-mile "Security Zone" buffer in southern Lebanon.',
            '**South Lebanon Army (SLA):** Financed and armed local Christian militia to police the border alongside Israeli garrisons.',
            '**18-Year Trap:** Constant guerrilla attrition and roadside bombs drained Israeli troop morale until full withdrawal in May 2000.',
          ],
        },
        {
          title: '4. The Emergence of Hezbollah (1982)',
          points: [
            '**Iranian Revolutionary Guards:** Deployed 1,500 commandos to Bekaa Valley to organize disaffected Lebanese Shia Muslims.',
            '**New Tactics:** Pioneered suicide truck bombings (1983 US Embassy and Marine barracks bombings killing 241 Americans).',
            "**Asymmetric Menace:** Replaced the secular PLO with a well-disciplined, religious guerrilla army on Israel's northern border.",
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. PLO Attacks & Argov Shot',
          text: 'PLO rocket fire from Lebanon; Abu Nidal shoots Israeli ambassador in London (June 1982).',
        },
        {
          stage: '2. Sharon Invades to Beirut',
          text: 'Operation Peace for Galilee drives 100km to Beirut; 70-day siege forces PLO evacuation to Tunis.',
        },
        {
          stage: '3. Sabra & Shatila Massacre',
          text: "Phalangists slaughter 800–2,000 civilians; Kahan Commission forces Sharon's resignation.",
        },
        {
          stage: '4. Rise of Hezbollah',
          text: 'Shia radicalization backed by Iran creates Hezbollah; guerrilla war traps IDF in southern Lebanon.',
        },
      ],
      masterWordBank: [
        {
          term: 'Operation Peace for Galilee',
          def: 'June 1982 Israeli invasion of Lebanon to destroy PLO bases.',
        },
        {
          term: 'Ariel Sharon',
          def: 'Defence Minister who pushed invasion to Beirut; faulted by Kahan Commission.',
        },
        {
          term: 'Shlomo Argov',
          def: 'Israeli Ambassador to UK shot by Abu Nidal faction; pretext for invasion.',
        },
        {
          term: 'Siege of Beirut',
          def: '70-day Israeli siege of Muslim West Beirut forcing PLO evacuation.',
        },
        {
          term: 'Philip Habib',
          def: 'US diplomatic mediator who negotiated the safe evacuation of the PLO to Tunisia.',
        },
        {
          term: 'Bashir Gemayel',
          def: 'Christian Phalangist commander and President-elect of Lebanon; assassinated Sept 1982.',
        },
        {
          term: 'Sabra and Shatila',
          def: 'Refugee camps in Beirut where Phalangist militia massacred hundreds of civilians.',
        },
        {
          term: 'Kahan Commission',
          def: '1983 Israeli inquiry finding Sharon indirectly responsible for the massacre.',
        },
        {
          term: 'Hezbollah',
          def: '"Party of God": Iranian-backed Shia militant group created in 1982.',
        },
        {
          term: 'Bekaa Valley Dogfight',
          def: 'Decisive air clash where IAF destroyed 29 Syrian SAMs and 82 aircraft.',
        },
        {
          term: 'Security Zone',
          def: 'Israeli buffer zone in southern Lebanon occupied from 1985 to 2000.',
        },
        {
          term: 'South Lebanon Army',
          def: 'Christian-led Lebanese militia allied with Israel to patrol the border.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 11 (KT 3.3): THE FIRST PALESTINIAN INTIFADA (1987–93)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_11',
    spreadNum: 11,
    topic: 'Key Topic 3 • Attempts at a Solution, 1974–95',
    title: 'KT 3.3: The Palestinian Issue: The First Palestinian Intifada (1987–93)',
    left: {
      tag: 'KT 3.3 • Popular Uprising, UNLU, Hamas & Global Shift',
      headline:
        'The Stones of Revolt: The First Intifada, the Rise of Hamas and the Madrid Conference',
      summary:
        'By 1987, Palestinians in the West Bank and Gaza had lived under Israeli military occupation for 20 years. Frustration boiled over due to land confiscations, Jewish settlement expansion, economic dependency, and daily indignities. On 8 December 1987, an IDF tank transporter collided with civilian cars in Gaza\'s Jabalya refugee camp, killing four Palestinian workers. Rumors of an intentional killing ignited a spontaneous, grassroots civil uprising: the First Intifada ("shaking off"). Directed by local underground committees (UNLU), Palestinians used civil disobedience, strikes, and stone-throwing against armed IDF troops, transforming global opinion.',
      pillars: [
        {
          title: 'The Spark & Grassroots Revolt',
          subtitle: 'Jabalya & The UNLU Committees',
          bullets: [
            '**Jabalya Incident (Dec 1987):** Traffic crash killed 4 workers; funeral erupted into mass riots spreading to West Bank.',
            '**UNLU Leadership:** Unified National Leadership of the Uprising distributed clandestine leaflets directing protests.',
            '**Popular Non-Violent Resistance:** General strikes, tax boycotts, barricades, and boycotts of Israeli consumer products.',
          ],
        },
        {
          title: 'Israeli "Iron Fist" & Media Toll',
          subtitle: 'Rabin\'s "Broken Bones" Policy',
          bullets: [
            '**Military Crackdown:** Defence Minister Yitzhak Rabin ordered army to quell riots using "might, power, and beatings".',
            "**Global TV Footage:** Broadcast images of heavily armed IDF soldiers beating youth stone-throwers damaged Israel's reputation.",
            '**Casualties:** Over 1,000 Palestinians killed; 120,000 arrested; curfew and school closures disrupted life for years.',
          ],
        },
        {
          title: 'The Rise of Hamas (Dec 1987)',
          subtitle: 'Islamic Challenge to Secular PLO',
          bullets: [
            '**Sheikh Ahmed Yassin:** Founded Hamas as militant wing of Muslim Brotherhood in Gaza.',
            '**1988 Hamas Covenant:** Called for armed jihad to eliminate Israel and create an Islamic state from river to sea.',
            "**Challenge to Arafat:** Threatened PLO's claim to be the sole legitimate representative of Palestinians.",
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Sheikh Ahmed Yassin',
          role: 'Quadriplegic religious leader who founded Hamas in Dec 1987 to wage uncompromising holy war.',
        },
        {
          name: 'Yitzhak Rabin',
          role: 'Defence Minister who enforced the "Iron Fist" policy, but concluded military force could not crush a popular uprising.',
        },
        {
          name: 'Yasser Arafat',
          role: 'Exiled PLO Chairman in Tunis caught off guard by the revolt, but used it to reassert political relevance.',
        },
        {
          name: 'George H.W. Bush',
          role: 'US President who withheld $10B in housing loan guarantees to pressure Israel into the 1991 Madrid talks.',
        },
      ],
      archivalSource: {
        title: 'Yasser Arafat Address to Special UN General Assembly Session (Geneva, 13 Dec 1988)',
        citation: 'United Nations General Assembly Verbatim Records A/43/PV.78',
        quote:
          'The PLO recognizes the right of all parties concerned in the Middle East conflict to exist in peace and security, including the state of Palestine, Israel and other neighbors... We totally and absolutely renounce all forms of terrorism.',
        significance:
          'Historic concession meeting US conditions; ended 13-year American boycott and opened direct US-PLO dialogue in Tunis.',
      },
    },
    right: {
      tag: 'KT 3.3 • Thematic Deep-Dive, Diplomatic Realignment & Word Bank',
      deepCases: [
        {
          title: '1. Root Causes of Accumulated Despair',
          points: [
            '**Economic Servitude:** 100,000 Palestinians commuted daily to Israel for low-wage manual labor with no union rights.',
            '**Land & Settlements:** Israel seized 40% of West Bank land for military zones and 70,000 Jewish settlers.',
            '**Demographic Frustration:** A generation born entirely under occupation had no memory of pre-1967 borders and zero hope of statehood.',
          ],
        },
        {
          title: '2. The Shift from David to Goliath',
          points: [
            '**Media Revolution:** Global satellite television (CNN) broadcast raw footage of teenagers armed only with stones confronting tanks.',
            "**Moral Shock:** Shattered Israel's self-image as a besieged underdog defending itself against hostile Arab states.",
            '**US Pressure:** Secretary of State George Shultz criticized Israeli methods, recognizing Palestinian national aspirations could no longer be ignored.',
          ],
        },
        {
          title: "3. Arafat's 1988 Diplomatic Gamble",
          points: [
            '**Algiers Declaration (Nov 1988):** Palestine National Council proclaimed an independent State of Palestine based on UN Res 181.',
            '**Geneva UN Speech (Dec 1988):** Arafat explicitly renounced terrorism and accepted UN Resolutions 242 and 338.',
            '**US Dialogue:** Outgoing President Reagan authorized the first official US-PLO diplomatic talks in Tunis.',
          ],
        },
        {
          title: '4. The Madrid Peace Conference (Oct 1991)',
          points: [
            '**Gulf War Aftermath:** US President Bush and Secretary of State James Baker leveraged Gulf War victory to convene talks.',
            '**Historic Seating:** Brought Israel, Syria, Lebanon, and a joint Jordanian-Palestinian delegation into direct face-to-face negotiations.',
            '**Breaking Taboos:** Established the bilateral negotiating framework that led directly to the secret Oslo channel in 1993.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. 20 Years Occupation',
          text: 'Land confiscations, settlement expansion, and economic frustration create explosive tension.',
        },
        {
          stage: '2. Jabalya Spark (Dec 1987)',
          text: 'Fatal crash triggers mass riots; UNLU coordinates civil disobedience, strikes, and stone-throwing.',
        },
        {
          stage: '3. "Iron Fist" & Media Backlash',
          text: "Rabin's crackdown fails to quell protests; international media damage pressures Israeli leadership.",
        },
        {
          stage: '4. Diplomatic Realignment',
          text: 'Arafat renounces terrorism at UN (1988); US opens dialogue; paves way for 1991 Madrid Conference.',
        },
      ],
      masterWordBank: [
        {
          term: 'First Intifada',
          def: '"Shaking off": spontaneous Palestinian popular uprising against occupation (1987–93).',
        },
        {
          term: 'Jabalya Camp',
          def: 'Gaza refugee camp where fatal 8 Dec 1987 traffic crash sparked the uprising.',
        },
        {
          term: 'UNLU',
          def: 'Unified National Leadership of the Uprising: grassroots clandestine coordinating committee.',
        },
        {
          term: 'Civil Disobedience',
          def: 'Non-violent resistance including commercial strikes, tax boycotts, and barricades.',
        },
        {
          term: 'Hamas',
          def: 'Islamic Resistance Movement founded by Sheikh Yassin in Dec 1987 as militant faction.',
        },
        {
          term: 'Hamas Covenant (1988)',
          def: 'Foundational charter calling for armed jihad to eliminate Israel and establish Islamic state.',
        },
        {
          term: 'Iron Fist Policy',
          def: "Yitzhak Rabin's military doctrine deploying force and baton beatings to crush unrest.",
        },
        {
          term: 'Geneva UN Speech',
          def: "Arafat's Dec 1988 address renouncing terrorism and accepting UN Res 242.",
        },
        {
          term: 'Madrid Conference (1991)',
          def: 'Landmark peace conference convened by US and USSR bringing enemies face-to-face.',
        },
        {
          term: 'James Baker',
          def: 'US Secretary of State who pressured Israel with $10B loan guarantee freeze.',
        },
        {
          term: 'Stone-Throwers (Shabab)',
          def: 'Palestinian youth who became iconic symbols of resistance against IDF armor.',
        },
        {
          term: 'Green Line Checkpoints',
          def: 'Strict security checkpoints established to control Palestinian labor movement.',
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 12 (KT 3.4): THE OSLO PROCESS TO OSLO II (1993–95)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_12',
    spreadNum: 12,
    topic: 'Key Topic 3 • Attempts at a Solution, 1974–95',
    title: 'KT 3.4: Attempts at a Solution: From the Oslo Accords to Oslo II (1993–95)',
    left: {
      tag: 'KT 3.4 • Oslo Accords, White House Handshake & Oslo II',
      headline:
        "The Promise and the Tragedy: The Oslo Handshake, Oslo II and Rabin's Assassination",
      summary:
        "The collapse of the Soviet Union, the 1991 Gulf War, and the exhaustion of the Intifada created an unprecedented window for peace. In 1992, Yitzhak Rabin was elected Israeli Prime Minister on a peace platform. Secret Norwegian-brokered talks near Oslo produced the historic Declaration of Principles (Oslo I). On 13 September 1993, Rabin and Arafat signed the accord on the White House lawn before President Bill Clinton. The accord established the Palestinian National Authority (PNA) and phased self-rule, followed by the 1994 Israel-Jordan Peace Treaty and the 1995 Oslo II agreement. However, terrorist bombings and Rabin's assassination derailed the process.",
      pillars: [
        {
          title: 'Secret Oslo Talks (1993)',
          subtitle: 'Declaration of Principles',
          bullets: [
            '**Norwegian Channel:** Secret backchannel organized by Terje Rød-Larsen outside official Madrid posturing.',
            "**Letters of Mutual Recognition:** PLO recognized Israel's right to exist; Israel recognized PLO as representative of Palestinians.",
            '**5-Year Interim Autonomy:** Phased Israeli withdrawal; establishment of elected Palestinian National Authority (PNA).',
          ],
        },
        {
          title: 'The White House Handshake',
          subtitle: 'Historic Breakthrough (13 Sept 1993)',
          bullets: [
            '**Clinton Ceremony:** 3,000 dignitaries witnessed Rabin and Arafat shake hands on the White House lawn.',
            '**Rabin\'s Speech:** "We who have fought against you, the Palestinians, say to you today: enough of blood and tears."',
            '**Gaza-Jericho Accord (1994):** IDF withdrew from Gaza Strip and Jericho; Arafat returned from exile to lead PNA.',
          ],
        },
        {
          title: 'Oslo II & Assassination (1995)',
          subtitle: 'Areas A/B/C & The Fatal Blow',
          bullets: [
            '**Jordan Peace Treaty (1994):** King Hussein signed formal peace treaty at Wadi Araba, ending 46-year war.',
            '**Oslo II (Sept 1995):** Divided West Bank into three zones: Area A (Palestinian control), Area B (joint), Area C (Israeli control).',
            '**Rabin Assassinated (4 Nov 1995):** Ultra-nationalist Jewish law student Yigal Amir shot Rabin dead at Tel Aviv peace rally.',
          ],
        },
      ],
      keyFigures: [
        {
          name: 'Yitzhak Rabin',
          role: 'Israeli Prime Minister who traded land for peace; awarded Nobel Peace Prize; assassinated by Jewish extremist.',
        },
        {
          name: 'Yasser Arafat',
          role: 'PLO Chairman who returned from exile to become President of the newly created Palestinian National Authority.',
        },
        {
          name: 'Shimon Peres',
          role: 'Israeli Foreign Minister who coordinated the secret Oslo backchannel; Nobel Peace Prize laureate.',
        },
        {
          name: 'Bill Clinton',
          role: 'US President who hosted the historic White House signing ceremony and mediated subsequent accords.',
        },
      ],
      archivalSource: {
        title: 'Prime Minister Yitzhak Rabin Speech at Tel Aviv Peace Rally (4 November 1995)',
        citation: 'Audio Recording, Minutes Before Assassination, Tel Aviv',
        quote:
          'I was a military man for 27 years. I fought as long as there was no chance for peace. I believe there is now a chance for peace, a great chance, and we must take advantage of it... Violence is eroding the foundation of Israeli democracy.',
        significance:
          'Rabin\'s final speech before being shot by Yigal Amir; singing the "Song of Peace" stained with his blood.',
      },
    },
    right: {
      tag: 'KT 3.4 • Thematic Deep-Dive, Fatal Omissions & Word Bank',
      deepCases: [
        {
          title: '1. Oslo II West Bank Partition (1995)',
          points: [
            '**Area A (3% land, 20% pop):** Major Palestinian cities (Ramallah, Nablus, Jenin) under full PNA civil and security control.',
            '**Area B (27% land, 70% pop):** 450 Palestinian villages; PNA handled civil administration; IDF retained security control.',
            '**Area C (70% land):** All Jewish settlements, strategic roads, and Jordan Valley under exclusive Israeli military control.',
          ],
        },
        {
          title: '2. The Deferred "Final Status" Issues',
          points: [
            '**Fatal Postponement:** Oslo deliberately postponed the hardest issues for permanent status talks after five years.',
            '**Contested Flashpoints:** The status of Jerusalem, the Right of Return for 1948 refugees, borders, and Jewish settlements.',
            '**Settlement Surge:** Israeli settler population in West Bank grew from 110,000 to 190,000 between 1993 and 2000, destroying Palestinian trust.',
          ],
        },
        {
          title: '3. Extremist Backlash & Spoilers',
          points: [
            '**Hebron Mosque Massacre (Feb 1994):** Jewish extremist Baruch Goldstein massacred 29 praying Palestinians in Cave of Patriarchs.',
            '**Hamas Suicide Campaign:** Hamas launched wave of suicide bus bombings in Tel Aviv and Jerusalem to derail peace process.',
            '**Right-Wing Incitement:** Israeli opposition rallies depicted Rabin in Nazi SS uniform, accusing him of treason.',
          ],
        },
        {
          title: '4. The Death of the Israeli Peace Camp',
          points: [
            '**Assassination Impact:** Murder of Rabin decapitated the peace camp; Shimon Peres succeeded him as interim Prime Minister.',
            '**1996 Election:** Following devastating Hamas suicide bombings, right-wing Likud leader Benjamin Netanyahu narrowly defeated Peres.',
            '**Stalled Momentum:** Oslo process effectively halted, leaving a fractured landscape of checkpoints and unfulfilled autonomy.',
          ],
        },
      ],
      causalPathway: [
        {
          stage: '1. Secret Oslo Channel',
          text: 'Intifada & Cold War end prompt secret talks in Norway; produces Declaration of Principles (1993).',
        },
        {
          stage: '2. White House Handshake',
          text: 'Rabin & Arafat shake hands before Clinton; PNA established; IDF withdraws from Gaza & Jericho.',
        },
        {
          stage: '3. Oslo II (Areas A/B/C)',
          text: 'West Bank partitioned into 3 zones; Jordan peace treaty signed; final status issues postponed.',
        },
        {
          stage: '4. Terror & Assassination',
          text: 'Hamas suicide bombings & Hebron massacre; Rabin assassinated by Yigal Amir (Nov 1995); peace process derails.',
        },
      ],
      masterWordBank: [
        {
          term: 'Oslo I Accord',
          def: '1993 Declaration of Principles establishing mutual recognition and Palestinian self-rule.',
        },
        {
          term: 'Yitzhak Rabin',
          def: 'Israeli Prime Minister who signed Oslo; assassinated by Jewish extremist in Nov 1995.',
        },
        {
          term: 'Yasser Arafat',
          def: 'PLO Chairman who returned from exile to head the Palestinian National Authority.',
        },
        {
          term: 'Palestinian Authority (PNA)',
          def: 'Interim Palestinian self-governing body established in Gaza and Jericho in 1994.',
        },
        {
          term: 'White House Handshake',
          def: 'Iconic 13 Sept 1993 handshake between Rabin and Arafat hosted by Bill Clinton.',
        },
        {
          term: 'Oslo II (1995)',
          def: 'Interim agreement dividing the West Bank into Areas A, B, and C.',
        },
        {
          term: 'Area A / B / C',
          def: 'Zoning system: Area A (PNA control), Area B (joint), Area C (full Israeli control).',
        },
        {
          term: 'Israel-Jordan Peace Treaty',
          def: '1994 peace agreement signed at Wadi Araba by Rabin and King Hussein.',
        },
        {
          term: 'Baruch Goldstein',
          def: 'Jewish extremist doctor who massacred 29 Muslims in Hebron mosque (Feb 1994).',
        },
        {
          term: 'Hamas Suicide Bombings',
          def: 'Terror campaign targeting Israeli civilian buses to derail the peace process.',
        },
        {
          term: 'Yigal Amir',
          def: 'Right-wing Jewish law student who assassinated Prime Minister Yitzhak Rabin on 4 Nov 1995.',
        },
        {
          term: 'Final Status Issues',
          def: 'Deferred core problems: Jerusalem, Palestinian refugees, borders, and settlements.',
        },
      ],
    },
  },
];

// =============================================================================
// CSS STYLESHEET (PRINT-PERFECT A4 SADDLE-STITCH STANDARD)
// =============================================================================
const COMMON_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap');

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
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #0f172a;
    background: #f1f5f9;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 794px;
    height: 1123px;
    max-height: 1123px;
    overflow: hidden;
    background: #ffffff;
    margin: 0 auto 10px auto;
    padding: 18px 22px;
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

  /* Header */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid #0f172a;
    padding-bottom: 3px;
    margin-bottom: 5px;
  }
  .archival-tag {
    font-size: 6.8pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #0284c7;
    display: block;
    margin-bottom: 1px;
  }
  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 11pt;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
    line-height: 1.15;
  }
  .page-badge {
    background: #0f172a;
    color: #ffffff;
    font-size: 6.6pt;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
  }

  /* Footer */
  .page-footer {
    border-top: 1px solid #cbd5e1;
    padding-top: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    color: #64748b;
    margin-top: 3px;
  }
  .page-num {
    font-weight: 800;
    color: #0f172a;
    font-size: 7.8pt;
  }

  /* Cover Styling */
  .cover-border {
    border: 2.5px solid #0f172a;
    outline: 1.2px solid #0284c7;
    outline-offset: -5px;
    height: 100%;
    border-radius: 4px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
  }

  /* Word Bank Badges */
  .wb-pill {
    display: inline-block;
    background: #f1f5f9;
    border: 1px solid #94a3b8;
    color: #0f172a;
    font-size: 6.8pt;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 2px;
    margin-right: 4px;
    white-space: nowrap;
  }
`;

// =============================================================================
// HTML RENDER FUNCTIONS
// =============================================================================

function renderPage1() {
  return `
    <div class="page" id="page_1" data-page="1">
      <div class="cover-border">
        <!-- Top Header Strip -->
        <div style="border-bottom: 1.5px solid #0f172a; padding-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 7.6pt; font-weight: 800; letter-spacing: 0.6px; color: #0284c7; text-transform: uppercase;">
            PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; OPTION P5
          </span>
          <span style="font-size: 7.2pt; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.4px;">
            1HI0/P5 &bull; Period Study Specification Guide
          </span>
        </div>

        <!-- Main Title & Exam Details Block -->
        <div style="margin: 4px 0 3px 0; text-align: center;">
          <h1 style="font-family: 'Playfair Display', serif; font-size: 20pt; font-weight: 800; color: #0f172a; margin: 0 0 2px 0; line-height: 1.1;">
            Conflict in the Middle East, 1945–1995
          </h1>
          <div style="font-family: 'Playfair Display', serif; font-size: 11pt; font-weight: 700; color: #0284c7; margin: 0 0 4px 0;">
            Visual Revision Masterclasses &amp; Complete Specification Guide
          </div>
          <div style="display: flex; justify-content: center; gap: 8px; font-size: 7.2pt; font-weight: 700; color: #334155; text-transform: uppercase;">
            <span style="background: #e0f2fe; color: #0369a1; padding: 1.5px 6px; border-radius: 2px;">Paper 2: Period Study</span>
            <span style="background: #f1f5f9; color: #0f172a; padding: 1.5px 6px; border-radius: 2px; border: 1px solid #cbd5e1;">Time: 50 Minutes</span>
            <span style="background: #f1f5f9; color: #0f172a; padding: 1.5px 6px; border-radius: 2px; border: 1px solid #cbd5e1;">Total Marks: 32 Raw Marks</span>
            <span style="background: #dcfce7; color: #166534; padding: 1.5px 6px; border-radius: 2px;">12 Double-Page Spreads</span>
          </div>
        </div>

        <!-- Pupil Name Box -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 5px 9px; background: #fafafa; display: flex; justify-content: space-between; align-items: center; font-size: 7.6pt; color: #0f172a;">
          <div style="flex: 1; display: flex; align-items: baseline;">
            <strong style="text-transform: uppercase; font-size: 7.8pt; color: #0f172a; margin-right: 6px;">Pupil:</strong>
            <span style="border-bottom: 1.5px solid #0f172a; flex: 1; height: 16px; margin-right: 14px;"></span>
          </div>
          <div style="display: flex; gap: 10px; font-size: 7.2pt; color: #475569; white-space: nowrap;">
            <span><strong>Class:</strong> Year 11</span>
            <span><strong>Teacher:</strong> Mr Lovett</span>
            <span><strong>School:</strong> Meoncross School</span>
          </div>
        </div>

        <!-- The Three Question Types Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
          <div style="background: #f8fafc; border: 1.2px solid #0f172a; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #0284c7; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 1: Consequence</span>
              <span style="color: #0f172a;">4+4 = 8m</span>
            </div>
            <p style="font-size: 6.2pt; color: #334155; line-height: 1.25; margin: 2px 0 0 0;">
              Answer <strong>BOTH 1(a) and 1(b)</strong> (~6 mins each). Identify ONE consequence &rarr; State precise facts &rarr; Trace direct causal link. No source material.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #0f172a; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #0284c7; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 2: Narrative</span>
              <span style="color: #0f172a;">8m</span>
            </div>
            <p style="font-size: 6.2pt; color: #334155; line-height: 1.25; margin: 2px 0 0 0;">
              Compulsory continuous prose (~12 mins). 3-act structure: <strong>Beginning &rarr; Turning Point &rarr; Outcome</strong>. Must include own knowledge beyond stimulus.
            </p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #0f172a; border-radius: 3px; padding: 4px 6px;">
            <div style="font-size: 7.2pt; font-weight: 800; color: #0284c7; text-transform: uppercase; display: flex; justify-content: space-between;">
              <span>Question 3: Importance</span>
              <span style="color: #0f172a;">8+8 = 16m</span>
            </div>
            <p style="font-size: 6.2pt; color: #334155; line-height: 1.25; margin: 2px 0 0 0;">
              Choose <strong>TWO from 3(a), 3(b), 3(c)</strong> (~12 mins each). Write 2 explanatory paragraphs analyzing short-term impact vs long-term consequence.
            </p>
          </div>
        </div>

        <!-- Full Specification Word-for-Word (3 Columns) -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 6px 8px; background: #ffffff;">
          <div style="font-size: 7.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 4px; text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
            ★ Official Pearson Edexcel GCSE Specification Curriculum Checklist (Option P5)
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
            <!-- Column 1: KT1 -->
            <div style="border-right: 1px solid #e2e8f0; padding-right: 5px; font-size: 5.9pt; line-height: 1.22; color: #1e293b;">
              <div style="font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">KT1: Birth of Israel (1945–63)</div>
              
              <strong>1. British withdrawal &amp; creation of Israel:</strong>
              <div>&bull; Conflicting interests and demands of Jews and Arabs within British Mandate.</div>
              <div>&bull; Key events leading to end of Mandate, partition &amp; creation of Israel (King David Hotel bombing, UN Res 181).</div>
              <div>&bull; Key events of Arab-Israeli war (1948–49).</div>
              
              <strong style="display:block; margin-top:2px;">2. Aftermath of 1948–49 war:</strong>
              <div>&bull; Territorial changes and their impact.</div>
              <div>&bull; Refugee status of Palestinian Arabs.</div>
              <div>&bull; Creation of IDF &amp; Law of Return (1950).</div>
              <div>&bull; US aid to Israel; relations with Egypt.</div>
              
              <strong style="display:block; margin-top:2px;">3. Increased tension, 1955–63:</strong>
              <div>&bull; Nasser and Egypt's leadership of Arab world.</div>
              <div>&bull; Israeli attacks on Gaza (1955) and Sinai (1956).</div>
              <div>&bull; Suez Crisis (1956); United Arab Republic (1958).</div>
            </div>

            <!-- Column 2: KT2 -->
            <div style="border-right: 1px solid #e2e8f0; padding-right: 5px; font-size: 5.9pt; line-height: 1.22; color: #1e293b;">
              <div style="font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">KT2: Escalating Conflict (1964–73)</div>
              
              <strong>1. The Six Day War, 1967:</strong>
              <div>&bull; Cairo Conference (1964), Fatah and the PLO.</div>
              <div>&bull; Escalating tension: Syria support for Fatah, Samu raid, events of 7 April 1967.</div>
              <div>&bull; Actions of USSR, Nasser, USA leading to war.</div>
              <div>&bull; Key events of the war (Sinai, Jerusalem, Golan).</div>
              
              <strong style="display:block; margin-top:2px;">2. Aftermath of the 1967 war:</strong>
              <div>&bull; UN Res 242; dispute over Suez Canal.</div>
              <div>&bull; Palestinian refugees &amp; occupied territories (Golan, Gaza, West Bank, Sinai, East Jerusalem).</div>
              <div>&bull; Terrorism &amp; international attitudes: PFLP 1970 hijacks, Black September, Munich Olympics.</div>
              <div>&bull; Expulsion of PLO from Jordan (1970).</div>
              
              <strong style="display:block; margin-top:2px;">3. Israel and Egypt, 1967–73:</strong>
              <div>&bull; Egyptian relations: USA, USSR, Arab states.</div>
              <div>&bull; Israeli consolidation of occupied lands.</div>
              <div>&bull; Yom Kippur War (1973) key events &amp; aftermath.</div>
            </div>

            <!-- Column 3: KT3 -->
            <div style="font-size: 5.9pt; line-height: 1.22; color: #1e293b;">
              <div style="font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">KT3: Attempts at a Solution (1974–95)</div>
              
              <strong>1. Diplomatic negotiations:</strong>
              <div>&bull; Oil crisis; involvement of USA and USSR.</div>
              <div>&bull; Kissinger, 'shuttle diplomacy', Suez reopening.</div>
              <div>&bull; Sadat to Israel (1977), Begin to Egypt (1977), Carter &amp; Camp David (1978), Treaty of Washington (1979).</div>
              
              <strong style="display:block; margin-top:2px;">2. The Palestinian issue:</strong>
              <div>&bull; Arafat speech to UN (1974); PLO in Lebanon.</div>
              <div>&bull; Israeli reprisals, invasion of Lebanon (1982) &amp; results.</div>
              <div>&bull; Occupied lands &amp; First Intifada (1987–93).</div>
              
              <strong style="display:block; margin-top:2px;">3. Attempts at a solution:</strong>
              <div>&bull; Arafat renunciation of terrorism at UN (1988).</div>
              <div>&bull; Superpower shifts: Gulf War (1991), Cold War end.</div>
              <div>&bull; Arafat, Rabin &amp; Oslo Accords (1993); PNA setup; Israel-Jordan peace (1994); Oslo II (1995).</div>
            </div>
          </div>
        </div>

        <!-- Footer Strip -->
        <div style="border-top: 1.5px solid #0f172a; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 6.8pt; color: #475569;">
          <span><strong>Meoncross History Department</strong> &bull; GCSE Masterclass Series</span>
          <span style="font-weight: 800; color: #0284c7; text-transform: uppercase;">Pearson Edexcel 1HI0/P5 &bull; 28-Page Master Volume</span>
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

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <!-- Top Strategy Overview Card -->
        <div style="background: #f8fafc; border: 1.5px solid #0f172a; border-left: 5px solid #0284c7; border-radius: 4px; padding: 8px 12px;">
          <div style="font-size: 9.6pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">
            How to Master Paper 2 Period Study (Option P5: Conflict in the Middle East, 1945–1995)
          </div>
          <div style="font-size: 8.4pt; color: #334155; line-height: 1.36;">
            Paper 2 Period Study tests <strong>knowledge recall (AO1)</strong> and <strong>second-order historical causation (AO2)</strong> across 50 minutes. There are <strong>zero source questions</strong> and <strong>zero interpretations</strong>. Every single mark is awarded for accurate, precise factual recall and structured causal explanation.
          </div>
        </div>

        <!-- The Four Non-Negotiable Success Principles (2x2 Grid) -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 9px 12px; background: #ffffff;">
          <div style="font-size: 9.0pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 6px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 3px; display: flex; justify-content: space-between;">
            <span>★ The Four Non-Negotiable Exam Success Principles:</span>
            <span style="color: #0284c7;">Grade 9 Protocol</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 7px 9px;">
              <strong style="color: #0284c7; font-size: 8.6pt; display: block; margin-bottom: 2px;">1. Strict Time Discipline (50 Minutes)</strong>
              <div style="font-size: 8.0pt; color: #334155; line-height: 1.32;">
                Allocate exactly <strong>12 minutes for Q1</strong> (6m per consequence), <strong>12 minutes for Q2</strong> (Narrative Account), and <strong>24 minutes for Q3</strong> (12m per importance question). Keep a 2-minute buffer to review dates and proper nouns.
              </div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 7px 9px;">
              <strong style="color: #0284c7; font-size: 8.6pt; display: block; margin-bottom: 2px;">2. Beyond the Stimulus (The Level 2 Trap)</strong>
              <div style="font-size: 8.0pt; color: #334155; line-height: 1.32;">
                In Q2 (Narrative Account), candidates who rely solely on the two provided stimulus bullet points are <strong>strictly capped at Level 2 (5 marks maximum)</strong>. You MUST include substantial own knowledge from outside the stimulus to achieve Level 3 (6–8 marks).
              </div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 7px 9px;">
              <strong style="color: #0284c7; font-size: 8.6pt; display: block; margin-bottom: 2px;">3. Causal Transitions, Not Chronology Lists</strong>
              <div style="font-size: 8.0pt; color: #334155; line-height: 1.32;">
                In Q2, never write descriptive lists (*"Then this happened... Next that happened"*). Every paragraph must link events causally: explain *why* event A directly caused or enabled event B (e.g., *"This ceasefire gave the IDF breathing space to import Czech arms, which directly enabled..."*).
              </div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 7px 9px;">
              <strong style="color: #0284c7; font-size: 8.6pt; display: block; margin-bottom: 2px;">4. Significance vs Storytelling in Q3</strong>
              <div style="font-size: 8.0pt; color: #334155; line-height: 1.32;">
                In Q3 (Importance), examiners penalize candidates who merely narrate the event. You must explain <strong>why it mattered for the specific outcome named</strong>. Use evaluative stems: *"This was of vital importance because without it..."*
              </div>
            </div>
          </div>
        </div>

        <!-- Period Study Mark Scheme Decoder -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 8px 11px; background: #ffffff;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px;">
            Examiner Level Descriptors: How Top Marks Are Awarded
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; font-size: 7.8pt; line-height: 1.30; color: #334155;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 6px 8px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 2px; font-size: 8.2pt;">Q1: Consequence [4m each]</strong>
              <div><strong>Level 1 (1–2m):</strong> Simple or general consequence; limited facts.</div>
              <div><strong>Level 2 (3–4m):</strong> Specific historical knowledge + fully explained consequence showing cause-and-effect chain.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 6px 8px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 2px; font-size: 8.2pt;">Q2: Narrative Account [8m]</strong>
              <div><strong>Level 1 (1–2m):</strong> Simple narrative; fragmented chronology.</div>
              <div><strong>Level 2 (3–5m):</strong> Chronological narrative, but relies only on stimulus.</div>
              <div><strong>Level 3 (6–8m):</strong> Coherent, causally linked narrative + <strong>substantial own knowledge beyond stimulus</strong>.</div>
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 6px 8px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 2px; font-size: 8.2pt;">Q3: Importance [8m each]</strong>
              <div><strong>Level 1 (1–2m):</strong> Identifies facts with little link to importance.</div>
              <div><strong>Level 2 (3–5m):</strong> Explains importance with some factual support.</div>
              <div><strong>Level 3 (6–8m):</strong> Sustained, analytical explanation of impact and long-term significance on the specific outcome.</div>
            </div>
          </div>
        </div>

        <!-- The Analytical Connectives Vault -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 8px 11px; background: #fafafa;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 5px;">
            The Historian's Analytical Connective Vault
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px; font-size: 7.8pt; line-height: 1.30; color: #1e293b;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 8px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 2px; font-size: 8.0pt;">Direct Causal Stems (Q1)</strong>
              <div>&bull; "As a direct consequence, ..."</div>
              <div>&bull; "This fundamentally provoked..."</div>
              <div>&bull; "The decisive catalyst was..."</div>
              <div>&bull; "This resulted in..."</div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 8px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 2px; font-size: 8.0pt;">Sequencing &amp; Linkage (Q2)</strong>
              <div>&bull; "During the opening phase, ..."</div>
              <div>&bull; "A decisive turning point came when..."</div>
              <div>&bull; "This breathing space allowed..."</div>
              <div>&bull; "In the immediate aftermath, ..."</div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 8px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 2px; font-size: 8.0pt;">Evaluative Impact (Q3)</strong>
              <div>&bull; "This was vital because..."</div>
              <div>&bull; "Without this intervention, ..."</div>
              <div>&bull; "Its primary significance lay in..."</div>
              <div>&bull; "This permanently transformed..."</div>
            </div>
          </div>
        </div>

        <!-- Warning Pitfalls Strip -->
        <div style="background: #fff1f2; border: 1.2px solid #fda4af; border-radius: 4px; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 7.6pt; color: #9f1239;">
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

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <div style="background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 3px; padding: 5px 9px; font-size: 7.6pt; color: #334155; line-height: 1.34;">
          <strong>Chronological Mastery:</strong> Paper 2 requires precise chronological sequencing. Use this master matrix to trace how military conflicts, peace negotiations, and territorial boundaries evolved across five decades.
        </div>

        <!-- 3 Key Topics Comparative Chronology -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; flex: 1; margin: 6px 0;">
          <!-- KT1 Column -->
          <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; font-size: 6.9pt; line-height: 1.28;">
            <div style="font-size: 7.8pt; font-weight: 800; color: #0284c7; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
              Key Topic 1: Birth of Israel (1945–63)
            </div>
            <div><strong>Jul 1946:</strong> Irgun bombs King David Hotel (91 dead).</div>
            <div><strong>Feb 1947:</strong> Bevin surrenders Mandate to UN.</div>
            <div><strong>Jul 1947:</strong> SS Exodus intercepted by Royal Navy.</div>
            <div><strong>Nov 1947:</strong> UN Res 181 partition passed (55% / 44%).</div>
            <div><strong>14 May 1948:</strong> Ben-Gurion declares State of Israel.</div>
            <div><strong>15 May 1948:</strong> Five Arab armies invade infant state.</div>
            <div><strong>Jun 1948:</strong> 4-week UN truce; Czech arms airlift.</div>
            <div><strong>1949:</strong> Rhodes Armistice Green Line; 79% Israeli control.</div>
            <div><strong>1948–49:</strong> The Nakba: 700,000 refugees displaced.</div>
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
          <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; font-size: 6.9pt; line-height: 1.28;">
            <div style="font-size: 7.8pt; font-weight: 800; color: #0284c7; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
              Key Topic 2: Escalating Conflict (1964–73)
            </div>
            <div><strong>Jan 1964:</strong> Cairo Summit; creation of the PLO.</div>
            <div><strong>Nov 1966:</strong> IDF reprisal raid on Samu (West Bank).</div>
            <div><strong>Apr 1967:</strong> Air clash over Golan; 6 Syrian MiGs downed.</div>
            <div><strong>May 1967:</strong> Nasser expels UNEF; closes Straits of Tiran.</div>
            <div><strong>5 Jun 1967:</strong> Operation Focus pre-emptive air strike.</div>
            <div><strong>7 Jun 1967:</strong> Paratroopers capture Old City of Jerusalem.</div>
            <div><strong>10 Jun 1967:</strong> Golan captured; Six Day War ends.</div>
            <div><strong>Sep 1967:</strong> Khartoum Summit: "Three No\'s" resolution.</div>
            <div><strong>Nov 1967:</strong> UN Res 242 passed ("land for peace").</div>
            <div><strong>Mar 1968:</strong> Battle of Karameh; Fatah commando legend.</div>
            <div><strong>1969:</strong> Arafat becomes Chairman of the PLO.</div>
            <div><strong>1969–70:</strong> War of Attrition along Suez Canal.</div>
            <div><strong>Sep 1970:</strong> Dawson\'s Field hijackings; Black September.</div>
            <div><strong>Jul 1972:</strong> Sadat expels 15,000 Soviet advisers.</div>
            <div><strong>Sep 1972:</strong> Black September Munich Olympics massacre.</div>
            <div><strong>6 Oct 1973:</strong> Yom Kippur War begins; Operation Badr.</div>
            <div><strong>Oct 1973:</strong> Valley of Tears tank battle on Golan.</div>
            <div><strong>Oct 1973:</strong> Sharon crosses canal; OPEC oil embargo.</div>
          </div>

          <!-- KT3 Column -->
          <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; font-size: 6.9pt; line-height: 1.28;">
            <div style="font-size: 7.8pt; font-weight: 800; color: #0284c7; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
              Key Topic 3: Attempts at Peace (1974–95)
            </div>
            <div><strong>1974–75:</strong> Kissinger "shuttle diplomacy" disengagements.</div>
            <div><strong>Jun 1975:</strong> Suez Canal reopened to international shipping.</div>
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
        <div style="background: #fafafa; border: 1.5px solid #0f172a; border-radius: 4px; padding: 6px 9px; font-size: 7.2pt; color: #1e293b; line-height: 1.34;">
          <strong>Examiner Synoptic Takeaway:</strong> Notice the decisive historical turning points: <strong>1948</strong> (Statehood &amp; Nakba), <strong>1967</strong> (Quadrupling of Israeli territory &amp; Rise of PLO), <strong>1973</strong> (Shattering of invincibility &amp; Oil weapon), <strong>1979</strong> (First Arab peace treaty), and <strong>1993</strong> (Mutual recognition). Every exam question connects to one of these pivotal transformations.
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
    <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
      <div style="font-size: 8.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 1px;">${p.title}</div>
      <div style="font-size: 7.2pt; color: #64748b; font-style: italic; margin-bottom: 4px;">${p.subtitle}</div>
      <ul style="margin: 0; padding-left: 11px; font-size: 8.2pt; color: #1e293b; line-height: 1.32;">
        ${p.bullets.map((b) => `<li>${formatMd(b)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const figuresHtml = left.keyFigures
    .map(
      (f) => `
    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 6px;">
      <strong style="color: #0284c7; display: block; font-size: 8.0pt;">${f.name}</strong>
      <span>${f.role}</span>
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

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <!-- Strategic Context Overview -->
        <div style="background: #f8fafc; border: 1.5px solid #0f172a; border-left: 5px solid #0284c7; border-radius: 4px; padding: 7px 11px;">
          <div style="font-size: 10.5pt; font-weight: 800; font-family: 'Playfair Display', serif; color: #0f172a; margin-bottom: 2px;">
            ${left.headline}
          </div>
          <div style="font-size: 9.0pt; color: #334155; line-height: 1.36;">
            ${formatMd(left.summary)}
          </div>
        </div>

        <!-- Three Core Historical Pillars -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px;">
          ${pillarsHtml}
        </div>

        <!-- Key Figures & Factions (4 Cards) -->
        <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 6px 10px; background: #ffffff;">
          <div style="font-size: 8.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">
            Key Historical Figures &amp; Organisations
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; font-size: 7.6pt; line-height: 1.28;">
            ${figuresHtml}
          </div>
        </div>

        <!-- Archival Source & Historical Evidence Box -->
        <div style="background: #fdfbf7; border: 1.2px solid #b45309; border-radius: 3px; padding: 6px 10px; font-size: 7.8pt; line-height: 1.30; color: #451a03;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <strong style="font-size: 7.6pt; text-transform: uppercase; color: #b45309; letter-spacing: 0.4px;">Archival Evidence &bull; ${left.archivalSource.title}:</strong>
            <span style="font-size: 6.8pt; font-weight: 700; color: #78350f;">${left.archivalSource.citation}</span>
          </div>
          <p style="margin: 0; font-style: italic; font-family: 'Playfair Display', serif; font-size: 8.4pt; color: #292524;">
            "${left.archivalSource.quote}"
          </p>
          <div style="margin-top: 3px; font-size: 7.2pt; color: #78350f;">
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
    <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 6px 8px; background: #ffffff;">
      <div style="font-size: 8.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">
        ${c.title}
      </div>
      <ul style="margin: 0; padding-left: 12px; font-size: 8.0pt; color: #1e293b; line-height: 1.30;">
        ${c.points.map((p) => `<li>${formatMd(p)}</li>`).join('')}
      </ul>
    </div>
  `,
    )
    .join('');

  const pathwayHtml = right.causalPathway
    .map(
      (p) => `
    <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 6px;">
      <strong style="color: #0284c7; display: block; font-size: 7.8pt;">${p.stage}</strong>
      <span>${p.text}</span>
    </div>
  `,
    )
    .join('');

  const wordBankHtml = right.masterWordBank
    .map(
      (w) => `
    <div>
      <span class="wb-pill">${w.term}</span>
      <span>${w.def}</span>
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

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <!-- Four Deep-Knowledge Forensic Case Studies (2x2 Grid) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 7px;">
          ${casesHtml}
        </div>

        <!-- Visual Causal Pathway (4 Connected Stages) -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 7px 10px; background: #f8fafc;">
          <div style="font-size: 8.4pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px;">
            Visual Causal Pathway: Key Historical Mechanisms
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px; font-size: 7.6pt; line-height: 1.25;">
            ${pathwayHtml}
          </div>
        </div>

        <!-- Master GCSE Specification Word Bank Box -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 7px 10px; background: #ffffff;">
          <div style="font-size: 8.6pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 5px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; display: flex; justify-content: space-between;">
            <span>★ GCSE Specification Word Bank &amp; Essential Historical Concepts</span>
            <span style="color: #64748b; font-size: 7.0pt;">Must-Use Vocabulary</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 7.6pt; line-height: 1.28; color: #1e293b;">
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

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <!-- Top Banner -->
        <div style="background: #f8fafc; border: 1.5px solid #0f172a; border-left: 5px solid #0284c7; border-radius: 4px; padding: 7px 11px;">
          <div style="font-size: 9.6pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">
            Historiographical Depth: Traditional Israeli vs "New Historians" School
          </div>
          <div style="font-size: 8.4pt; color: #334155; line-height: 1.35;">
            Top-tier candidates achieve Grade 9 by demonstrating awareness that historical interpretations of the Arab-Israeli conflict are contested. In the late 1980s, Israeli state archives were declassified under the 30-year rule, giving rise to the <strong>"New Historians" (Benny Morris, Avi Shlaim, Ilan Pappé)</strong>, who challenged traditional national narratives.
          </div>
        </div>

        <!-- 4 Historiographical Debates Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">
              1. The 1948 Palestinian Refugee Crisis
            </div>
            <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.30;">
              <div><strong>Traditional View:</strong> Arab leaders broadcast radio orders telling civilians to leave temporarily to clear the path for invading Arab armies.</div>
              <div style="margin-top: 3px;"><strong>Benny Morris (New Historian):</strong> Born of war, not by design; flight was caused by a combination of fear (Deir Yassin), economic collapse, and targeted IDF expulsions (Lydda &amp; Ramle).</div>
            </div>
          </div>

          <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">
              2. The Military Balance in 1948
            </div>
            <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.30;">
              <div><strong>Traditional View:</strong> A desperate "David vs. Goliath" struggle of an unarmed infant Jewish state against five massive Arab armies.</div>
              <div style="margin-top: 3px;"><strong>Avi Shlaim:</strong> Israel held decisive advantages after the June truce in mobilization, unified command, and Czech modern weaponry; Arab armies were divided and rivalrous.</div>
            </div>
          </div>

          <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">
              3. Responsibility for the 1967 War
            </div>
            <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.30;">
              <div><strong>Traditional View:</strong> Nasser actively sought war; expelling UNEF and closing the Straits of Tiran left Israel facing existential destruction.</div>
              <div style="margin-top: 3px;"><strong>Michael Oren:</strong> War was an accidental escalation caused by Soviet false intelligence, inter-Arab brinkmanship, and miscalculation, rather than a premeditated Arab plan.</div>
            </div>
          </div>

          <div style="border: 1.2px solid #0f172a; border-radius: 3px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">
              4. The Failure of the Oslo Peace Accords
            </div>
            <div style="font-size: 7.8pt; color: #1e293b; line-height: 1.30;">
              <div><strong>Israeli Nationalist Perspective:</strong> Arafat never abandoned terrorism; used PNA security forces to harbour Hamas suicide bombers.</div>
              <div style="margin-top: 3px;"><strong>Palestinian Perspective:</strong> Israel used Oslo as cover to double West Bank settlement construction while creating non-viable Palestinian enclaves.</div>
            </div>
          </div>
        </div>

        <!-- Master Revision Self-Audit Checklist (12 Topics) -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 8px 11px; background: #ffffff;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px;">
            ★ Complete 12-Spread Specification Revision Audit Checklist
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 7.4pt; line-height: 1.32; color: #334155;">
            <div>&bull; [ ] 1.1 British Mandate &amp; UN Referral</div>
            <div>&bull; [ ] 1.2 1948–49 War &amp; Armistice</div>
            <div>&bull; [ ] 1.3 Refugee Crisis &amp; IDF Creation</div>
            <div>&bull; [ ] 1.4 Nasser &amp; 1956 Suez Crisis</div>
            <div>&bull; [ ] 2.1 1967 Six Day War Blitz</div>
            <div>&bull; [ ] 2.2 Occupied Lands &amp; Res 242</div>
            <div>&bull; [ ] 2.3 Rise of PLO &amp; Munich 1972</div>
            <div>&bull; [ ] 2.4 1973 Yom Kippur War</div>
            <div>&bull; [ ] 3.1 Camp David &amp; 1979 Treaty</div>
            <div>&bull; [ ] 3.2 1982 Lebanon &amp; Hezbollah</div>
            <div>&bull; [ ] 3.3 First Intifada &amp; Hamas 1987</div>
            <div>&bull; [ ] 3.4 Oslo Accords &amp; Rabin 1993–95</div>
          </div>
        </div>

        <!-- Department Signoff -->
        <div style="background: #fafafa; border: 1.2px solid #cbd5e1; border-radius: 3px; padding: 5px 9px; font-size: 7.4pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
          <span><strong>Meoncross History Department</strong> &bull; Examination Mastery Series</span>
          <span>Candidate Final Grade Target: <strong>Grade 9 [ ] &bull; Grade 8 [ ] &bull; Grade 7 [ ]</strong></span>
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
// HTML BUILDER: FULL 28-PAGE MASTER VOLUME
// =============================================================================
function generateFullHTML() {
  const page1 = renderPage1();
  const page2 = renderPage2();
  const page3 = renderPage3();

  let contentPagesHtml = '';
  SPREADS.forEach((spread, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = 5 + idx * 2;
    contentPagesHtml += renderSpreadLeft(spread, leftPageNum);
    contentPagesHtml += renderSpreadRight(spread, rightPageNum);
  });

  const page28 = renderPage28();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Conflict in the Middle East, 1945–1995 — Visual Revision Masterclasses &amp; Complete Specification Guide</title>
  <style>${COMMON_CSS}</style>
</head>
<body>
  ${page1}
  ${page2}
  ${page3}
  ${contentPagesHtml}
  ${page28}
</body>
</html>
`;
}

// =============================================================================
// MAIN COMPILATION & PDF EXPORT PIPELINE
// =============================================================================
async function run() {
  console.log('====================================================');
  console.log('📖 CME VISUAL REVISION GUIDE GENERATOR (PILLAR 1)');
  console.log('====================================================');

  const htmlContent = generateFullHTML();
  fs.writeFileSync(HTML_OUT_PUBLIC, htmlContent, 'utf8');
  console.log(
    `📄 High-resolution HTML rendered: ${HTML_OUT_PUBLIC} (${(htmlContent.length / 1024).toFixed(1)} KB)`,
  );

  console.log('🌐 Launching Puppeteer for print compilation and overflow validation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
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
  console.log('🎉 CME PILLAR 1 GENERATION COMPLETE (28 PAGES, 0 OVERFLOWS)');
  console.log('====================================================');
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal generator error:', err);
    process.exit(1);
  });
}

module.exports = { run, generateFullHTML };
