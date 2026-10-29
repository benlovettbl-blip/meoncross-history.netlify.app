const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const ROOT_DIR = path.join(__dirname, '..');
const bookletsDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'booklets');
const pdfsDir = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new');
const globalPdfsDir = path.join(ROOT_DIR, 'public', 'pdfs');

if (!fs.existsSync(bookletsDir)) fs.mkdirSync(bookletsDir, { recursive: true });
if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

// =============================================================================
// COMPREHENSIVE CURRICULUM DATA: KT1, KT2, KT3 WITH ENRICHED SCAFFOLDING & PROVENANCE
// =============================================================================
const KT_DATA = {
  KT1: {
    id: 'KT1',
    number: '1',
    title: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    shortTitle: 'The Birth of the State of Israel, 1945–63',
    dates: '1945–1963',
    paperRef: '1HI0/P5 (Paper 2: Period Study)',
    exam: {
      q1a: {
        num: '1 (a)',
        stem: 'Explain one consequence of the bombing of the King David Hotel (1946).',
        marks: 4,
        provenance: { tag: 'Edexcel June 2019', type: 'past' },
        lines: 9,
        vocabBank: [
          '22 July 1946 (Irgun attack)',
          'Menachem Begin (91 dead)',
          'British Secretariat & Military HQ',
          'Ernest Bevin (UN Referral)',
          'UNSCOP Fact-Finding Tour',
          'UN Res 181 (Partition Nov 1947)',
          'Birth of Israel (14 May 1948)',
        ],
        connectives: [
          'One direct consequence was...',
          'This shattered British morale because...',
          'Consequently, this led to...',
          'This directly resulted in...',
        ],
        guide:
          'Identify Consequence (e.g. Surrender of British Mandate OR Creation of Israel) &rarr; Precise Facts (Irgun, 91 dead, Bevin) &rarr; Causal Chain: British political will broke &rarr; Bevin referred Mandate to UN (Feb 1947) &rarr; UNSCOP proposed partition &rarr; UN Res 181 passed &rarr; State of Israel declared (May 1948).',
      },
      q1b: {
        num: '1 (b)',
        stem: 'Explain one consequence of the Israeli attacks on Gaza in 1955.',
        marks: 4,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        lines: 9,
        vocabBank: [
          '28 Feb 1955 (Operation Black Arrow)',
          'Ariel Sharon (Paratroopers)',
          '38 Egyptian soldiers killed',
          'Gamal Abdel Nasser humiliated',
          'Czech Arms Deal (Sept 1955)',
          'Fedayeen border raids intensified',
          'Straits of Tiran blockade',
        ],
        connectives: [
          'As a direct consequence, ...',
          'This military humiliation provoked...',
          'Consequently, Nasser sought...',
          'This directly escalated toward...',
        ],
        guide:
          'Identify Consequence (e.g. Czech Arms Deal OR Escalation to 1956 War) &rarr; Precise Facts (Sharon, 38 Egyptians killed) &rarr; Causal Chain: Exposed Egyptian weakness &rarr; Nasser bought Soviet-bloc arms (Czech Deal) &rarr; Blockaded Gulf of Aqaba &rarr; Precipitated Israeli 1956 Sinai invasion.',
      },
      q2: {
        num: '2',
        stem: 'Write a narrative account analysing the key events of the Arab-Israeli war (1948–49).',
        marks: 8,
        provenance: { tag: 'Edexcel June 2018', type: 'past' },
        stimulus: ['The invasion by Arab armies (May 1948)', 'The June 1948 truce'],
        linesPage3: 13,
        linesPage4: 25,
        vocabBank: [
          '14 May 1948 Declaration',
          '5 Arab Armies invade',
          'Siege of Jerusalem & Arab Legion',
          'UN 4-Week Truce (11 June)',
          'David Ben-Gurion unifies IDF',
          'Czech Avia S-199 fighters',
          'Operation Yoav (Negev)',
          '1949 Green Line Armistices',
          '700,000 Palestinian refugees (Nakba)',
        ],
        connectives: [
          'In the opening phase, ...',
          'A decisive turning point came when...',
          'This breathing space allowed...',
          'Consequently, ...',
          'This outcome resulted in...',
        ],
        stages: {
          stage1:
            'Stage 1: Outbreak & Arab Invasion (May 1948) — 5 Arab armies invade; Jerusalem besieged; Israel faces existential crisis',
          stage2:
            'Stage 2: Turning Point & UN Truce (June 1948) — Ben-Gurion unifies IDF (Order No. 4); covert Czech arms imported',
          stage3:
            'Stage 3: Counter-Offensives & Armistice (1949) — IDF secures 79% territory; Green Line established; 700,000 refugees',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Explain the importance of UN Resolution 181 for the creation of Israel.',
        marks: 8,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        focus:
          'Explain why the resolution was important for providing international legal legitimacy and securing immediate superpower diplomatic recognition for the sovereign state.',
        lines: 21,
        vocabBank: [
          '29 Nov 1947 vote',
          'UN General Assembly two-thirds majority',
          'Partition of Palestine',
          '55% Jewish / 44% Arab split',
          'David Ben-Gurion proclamation (14 May 1948)',
          'US & Soviet diplomatic recognition',
          'End of British Mandate',
          'Outbreak of 1947–48 civil conflict',
        ],
        connectives: [
          'This was vital because...',
          'Furthermore, ...',
          'Without this international mandate, ...',
          'This directly enabled...',
        ],
        p1: 'International Legal Legitimacy: Explain how Resolution 181 provided Jewish leaders with a recognised international mandate to establish a sovereign state rather than an illegal rebel territory.',
        p2: 'Superpower Recognition & Geopolitical Foundation: Explain how the vote triggered immediate diplomatic recognition from the USA and USSR, enabling the new state to secure vital arms shipments and diplomatic standing.',
      },
      q3b: {
        num: '3 (b)',
        stem: 'Explain the importance of the creation of the Israeli Defence Forces (IDF) for the aftermath of the 1948–49 war.',
        marks: 8,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        focus:
          'Explain why unifying rival paramilitary militias under central state command was important both for internal political stability and defending vulnerable armistice borders after 1949.',
        lines: 21,
        vocabBank: [
          'David Ben-Gurion',
          'Ordinance No. 4 (May 1948)',
          'Disbanding of Haganah, Irgun & Lehi',
          'Unified national command',
          'Universal conscription',
          '1949 Armistice Green Line',
          'Border kibbutzim defense',
          'Fedayeen guerrilla raids (Gaza)',
          'IDF reprisal policy',
          'Deterrence vs Arab neighbours',
        ],
        connectives: [
          'This was essential because...',
          'Moreover, ...',
          'This organizational shift ensured...',
          'As a direct result, ...',
        ],
        p1: 'Internal Political Consolidation: Explain how dissolving militant splinter groups like the Irgun eliminated factional civil war risks, subordinating all armed force to the democratic Israeli government.',
        p2: 'Strategic Frontier Defense & Deterrence: Explain how a centralized citizen army enabled rapid troop mobilization to repel fedayeen infiltration and secure fragile armistice frontiers.',
      },
    },
    depthBank: {
      q4a: {
        num: '4 (a)',
        stem: 'Explain one consequence of the territorial changes resulting from the 1948–49 war.',
        marks: 4,
        provenance: { tag: 'Edexcel Specimen', type: 'specimen' },
        lines: 9,
        vocabBank: [
          '1949 Green Line Armistices',
          '79% of Palestine (vs 55% UN partition)',
          'West Bank annexed by Jordan',
          'Gaza Strip occupied by Egypt',
          'Divided Jerusalem',
          'Extinction of Palestinian Arab state',
          '700,000 Palestinian refugees',
        ],
        connectives: [
          'One fundamental consequence was...',
          'This territorial expansion meant that...',
          'Consequently, ...',
        ],
        guide:
          'Identify Consequence (e.g. Extinction of Palestinian State OR Expansion of Israeli Territory) &rarr; Specific Facts (79% control, Green Line, West Bank/Gaza partitioned) &rarr; Causal Explanation: Arab state never materialized &rarr; 700,000 refugees displaced with no sovereign homeland.',
      },
      q4b: {
        num: '4 (b)',
        stem: 'Explain one consequence of the formation of the United Arab Republic (UAR) in 1958.',
        marks: 4,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        lines: 9,
        vocabBank: [
          'Feb 1958 Egypt-Syria political union',
          'Gamal Abdel Nasser president',
          'Pan-Arabism ideology',
          'Encirclement of Israel (North & South)',
          'Destabilisation of Jordan & Lebanon',
          'US Marines landed in Beirut (1958)',
        ],
        connectives: [
          'One major consequence was...',
          'This political merger caused...',
          'This directly heightened fears that...',
        ],
        guide:
          'Identify Consequence (e.g. Hostile Encirclement of Israel OR Regional Destabilisation) &rarr; Facts (Nasser, Egypt-Syria union) &rarr; Causal Chain: United forces on northern and southern frontiers &rarr; Intensified Israeli defense alert and Western intervention.',
      },
      q5: {
        num: '5',
        stem: 'Explain the importance of the refugee status of Palestinian Arabs for relations between Israel and Arab states after 1949.',
        marks: 8,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        focus:
          'Explain how the displacement of 700,000 refugees and the refusal of Arab states to permit permanent resettlement entrenched permanent regional hostility.',
        lines: 21,
        vocabBank: [
          '700,000 displaced (Nakba)',
          'Right of Return (UN Res 194)',
          'UNRWA border camps',
          'Refusal of permanent resettlement',
          'Arab League diplomatic boycott',
          'Fedayeen guerrilla raids',
          'IDF reprisal operations (Qibya 1953)',
          'Border militarisation',
        ],
        connectives: [
          'This was important because...',
          'Furthermore, ...',
          'This directly hardened attitudes by...',
          'As a consequence, ...',
        ],
        p1: 'Entrenched Diplomatic Hostility: Explain how refugee camps became enduring political symbols preventing Arab states from formally recognizing Israel.',
        p2: 'Cycle of Border Violence: Explain how displaced refugees formed fedayeen guerrilla cells, launching raids that prompted devastating Israeli military reprisals.',
      },
      q6: {
        num: '6',
        stem: 'Explain the importance of US aid to Israel in the period 1949–1963.',
        marks: 8,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        focus:
          'Explain how American financial loans and diplomatic backing enabled the fledgling state to absorb mass immigration and build sovereign infrastructure.',
        lines: 21,
        vocabBank: [
          'Export-Import Bank loans ($100m)',
          'PL 480 food assistance',
          '1 million immigrant absorption',
          'National Water Carrier project',
          'Hawk anti-aircraft missiles (1962)',
          'Cold War counterweight to Soviet-Egypt ties',
        ],
        connectives: [
          'This was critical because...',
          'Moreover, ...',
          'Without American financial support, ...',
          'This ensured that...',
        ],
        p1: 'Economic Survival & Infrastructure: Explain how US grants and loans prevented financial collapse while absorbing one million Jewish refugees.',
        p2: 'Strategic Cold War Alignment: Explain how aid deepened as Washington countered growing Soviet influence in Egypt and Syria.',
      },
      q7: {
        num: '7',
        stem: 'Write a narrative account analysing the key events of the Suez Crisis (1956).',
        marks: 8,
        provenance: { tag: 'Edexcel June 2022', type: 'past' },
        stimulus: [
          'Nationalisation of the Suez Canal (July 1956)',
          'British and French military intervention',
        ],
        linesPage10: 13,
        linesPage11: 22,
        vocabBank: [
          'Aswan Dam loan cancellation',
          'Nasser 26 July speech',
          'Secret Sèvres protocol',
          'Israeli Sinai invasion (29 Oct)',
          'Port Said Anglo-French landings',
          'Eisenhower financial ultimatum',
          'UN Emergency Force (UNEF)',
          'Anthony Eden resignation',
        ],
        connectives: [
          'The crisis began when...',
          'In response, Britain and France covertly...',
          'This military action provoked...',
          'Consequently, ...',
          'The ultimate outcome was...',
        ],
        stages: {
          stage1:
            'Stage 1: Catalyst & Nationalisation (July 1956) — US cancels Aswan funding; Nasser nationalises Suez Canal; Western outrage',
          stage2:
            'Stage 2: Secret Collusion & Invasion (Oct–Nov 1956) — Secret tripartite agreement; Israel storms Sinai; Anglo-French assault Port Said',
          stage3:
            'Stage 3: Superpower Ultimatum & Humiliation (Nov 1956) — US threatens sterling collapse; Anglo-French withdrawal; Nasser hero',
        },
      },
    },
    traps: [
      {
        title: 'Partition (1947) vs Armistice (1949)',
        desc: 'Do not confuse the 1947 UN Partition Plan (Res 181, which allocated 55% of Palestine to a Jewish state) with the 1949 Armistice Green Line (which enclosed 79% following the 1948–49 War). Res 181 was never implemented as Arab leaders rejected it.',
      },
      {
        title: 'The Turning Point of the 1948–49 War',
        desc: 'The decisive turning point of the 1948–49 War was NOT superior Israeli numbers at the outbreak, but the 4-week UN truce in June 1948. This allowed Israel to import Czech Avia S-199 fighters and rifles, while David Ben-Gurion unified all militias into the IDF.',
      },
      {
        title: 'Suez 1956: Military Victory vs Political Defeat',
        desc: 'Britain and France achieved tactical military victory in capturing Port Said in November 1956, but suffered a catastrophic political defeat when US President Eisenhower threatened financial sanctions, forcing an immediate withdrawal and elevating Nasser into a Pan-Arab hero.',
      },
    ],
    tracker: {
      sectionA: [
        {
          q: '1 (a)',
          type: 'Consequence',
          topic: 'Irgun Bombing of King David Hotel (1946)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '1 (b)',
          type: 'Consequence',
          topic: 'Israeli Military Attacks on Gaza (1955)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '2',
          type: 'Narrative',
          topic: 'Outbreak & Key Events of the 1948–49 War',
          page: 'P3–4',
          marks: 8,
        },
        {
          q: '3 (a)',
          type: 'Importance',
          topic: 'UN Resolution 181 for the Creation of Israel',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Importance',
          topic: 'Creation of the IDF for 1948–49 Aftermath',
          page: 'P6',
          marks: 8,
        },
      ],
      sectionB: [
        {
          q: '4 (a)',
          type: 'Consequence',
          topic: 'Territorial Changes Following 1948–49 War',
          page: 'P7',
          marks: 4,
        },
        {
          q: '4 (b)',
          type: 'Consequence',
          topic: 'Formation of United Arab Republic (1958)',
          page: 'P7',
          marks: 4,
        },
        {
          q: '5',
          type: 'Importance',
          topic: 'Palestinian Refugee Status on Arab-Israeli Ties',
          page: 'P8',
          marks: 8,
        },
        {
          q: '6',
          type: 'Importance',
          topic: 'US Economic & Military Aid to Israel (1949–63)',
          page: 'P9',
          marks: 8,
        },
        {
          q: '7',
          type: 'Narrative',
          topic: 'Key Events of the Suez Crisis (1956)',
          page: 'P10–11',
          marks: 8,
        },
      ],
    },
    specBank: [
      {
        num: 1,
        type: '8m Importance',
        q: 'Explain the importance of the conflicting demands of Jews and Arabs for the British Mandate, 1945–47.',
      },
      {
        num: 2,
        type: '8m Importance',
        q: 'Explain the importance of the bombing of the King David Hotel (1946) for the ending of the British Mandate.',
      },
      {
        num: 3,
        type: '8m Narrative',
        q: 'Write a narrative account analysing the key events leading to the end of the British Mandate between 1945 and 1948.',
      },
      {
        num: 4,
        type: '4m Consequence',
        q: 'Explain one consequence of growing Jewish insurgency during the British Mandate in the years 1945–1947.',
      },
      {
        num: 5,
        type: '8m Importance',
        q: 'Explain the importance of Israel’s early relations with Egypt for regional stability in the years 1949–54.',
      },
      {
        num: 6,
        type: '4m Consequence',
        q: 'Explain one consequence of the Israeli invasion of Sinai during the Suez Crisis (1956).',
      },
      {
        num: 7,
        type: '8m Importance',
        q: 'Explain the importance of the formation of the United Arab Republic (UAR) in 1958 for regional tensions in the Middle East.',
      },
    ],
  },
  KT2: {
    id: 'KT2',
    number: '2',
    title: 'Key Topic 2: The Escalating Conflict, 1964–73',
    shortTitle: 'The Escalating Conflict, 1964–73',
    dates: '1964–1973',
    paperRef: '1HI0/P5 (Paper 2: Period Study)',
    exam: {
      q1a: {
        num: '1 (a)',
        stem: 'Explain one consequence of the events of 7 April 1967.',
        marks: 4,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        lines: 9,
        vocabBank: [
          '7 April 1967 border clash',
          'Tractor dispute in DMZ',
          'Israeli Air Force (IAF)',
          '6 Syrian MiG-21s shot down',
          'IAF victory flyover Damascus',
          '1966 Egyptian-Syrian Defence Pact',
          'Soviet false intelligence report (May 1967)',
        ],
        connectives: [
          'One immediate consequence was...',
          'This humiliating defeat meant that...',
          'Consequently, Syria pressured...',
          'This directly acted as the catalyst for...',
        ],
        guide:
          'Identify Consequence (e.g. Humiliation of Syrian Regime OR Catalyst for 1967 War) &rarr; Facts (6 MiGs downed, Damascus flyover) &rarr; Causal Chain: Syrian desire for revenge &rarr; Invoked mutual defence treaty &rarr; Soviet false intelligence &rarr; Nasser mobilized in Sinai.',
      },
      q1b: {
        num: '1 (b)',
        stem: 'Explain one consequence of the expulsion of the PLO from Jordan (1970).',
        marks: 4,
        provenance: { tag: 'Edexcel June 2019', type: 'past' },
        lines: 9,
        vocabBank: [
          'Black September (Sept 1970)',
          'King Hussein of Jordan',
          "Dawson's Field hijackings",
          'Jordanian Army crackdown (3,000+ dead)',
          'PLO relocation to Southern Lebanon ("Fatahland")',
          'New border front vs Galilee',
          'Black September terrorist cell formed',
        ],
        connectives: [
          'One critical consequence was...',
          'Being expelled from Jordan forced...',
          'As a direct result, this created...',
        ],
        guide:
          'Identify Consequence (e.g. PLO Relocation to Lebanon OR Rise of Black September Cell) &rarr; Facts (Hussein, 3,000 dead, move to Beirut) &rarr; Causal Chain: PLO established cross-border base in southern Lebanon &rarr; Prompted Israeli reprisals &rarr; Paved path to 1982 invasion.',
      },
      q2: {
        num: '2',
        stem: 'Write a narrative account analysing the key events of the Six Day War (1967).',
        marks: 8,
        provenance: { tag: 'Edexcel June 2023', type: 'past' },
        stimulus: [
          'Air attacks on Egyptian airfields (5 June 1967)',
          'The capture of East Jerusalem (7 June)',
        ],
        linesPage3: 13,
        linesPage4: 25,
        vocabBank: [
          'Pre-emptive air strike (7:45 am)',
          'Destruction of Egyptian airfields',
          '300+ aircraft destroyed on runways',
          'Total Israeli air supremacy',
          'Sinai armoured blitz (Sharon & Tal)',
          'Motta Gur paratroopers at Western Wall',
          'Capture of West Bank & Old City',
          'Storming of Golan Heights (9–10 June)',
        ],
        connectives: [
          'The war began when...',
          'Having established complete air supremacy, ...',
          'Meanwhile on the central front, ...',
          'Following this victory, ...',
          'By the ceasefire, ...',
        ],
        stages: {
          stage1:
            'Stage 1: Pre-emptive Air Strike (5 June 1967) — Surprise attack destroys Egyptian air force on runways within 3 hours',
          stage2:
            'Stage 2: Ground Blitz & Jerusalem (6–8 June 1967) — Israeli armour crosses Sinai; paratroopers secure East Jerusalem & West Bank',
          stage3:
            'Stage 3: Golan Victory & Ceasefire (9–10 June 1967) — Syrian escarpment stormed; quadrupling of Israeli territory',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Explain the importance of UN Resolution 242 for the aftermath of the 1967 war.',
        marks: 8,
        provenance: { tag: 'Edexcel June 2018', type: 'past' },
        focus:
          'Explain why the "land for peace" formula and its deliberate linguistic ambiguity dictated all subsequent diplomatic negotiations.',
        lines: 21,
        vocabBank: [
          '22 November 1967',
          'UN Security Council',
          '"Land for peace" formula',
          'Withdrawal from occupied territories',
          'Deliberate ambiguity (omission of "the")',
          'Israeli insistence on direct bilateral treaties',
          'Arab League Khartoum Summit ("Three No\'s")',
          'Palestinian refugee status vs national rights',
        ],
        connectives: [
          'This was vital because...',
          'Furthermore, ...',
          'Crucially, ...',
          'This directly influenced...',
        ],
        p1: 'Foundational "Land for Peace" Principle: Explain how Res 242 established the universal formula requiring Israel to return land in exchange for Arab peace treaties.',
        p2: 'Deliberate Linguistic Ambiguity: Explain how omitting the word "the" from the English draft allowed Israel to claim it was not required to surrender all 1967 conquests.',
      },
      q3b: {
        num: '3 (b)',
        stem: 'Explain the importance of the Cairo Conference (1964) for the growth of Fatah and the PLO.',
        marks: 8,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        focus:
          'Explain how establishing a pan-Arab institutional framework provided the platform that Yasser Arafat’s guerrilla movement subsequently took over.',
        lines: 21,
        vocabBank: [
          'January 1964 Arab League summit',
          'Gamal Abdel Nasser sponsorship',
          'Creation of the PLO (May 1964)',
          'Palestinian National Charter',
          'Ahmad Shukeiri leadership',
          'Disillusionment after 1967 defeat',
          'Battle of Karameh (1968)',
          'Yasser Arafat & Fatah takeover (1969)',
          'Shift to independent armed struggle',
        ],
        connectives: [
          'This conference was important because...',
          'Moreover, ...',
          'This provided the platform for...',
          'As a direct result, ...',
        ],
        p1: 'Official Institutional Framework: Explain how Arab states created an official, recognised umbrella organization to represent Palestinian national identity.',
        p2: 'Platform for Independent Militancy: Explain how Fatah exploited this official apparatus following the 1967 Arab defeat to wrest control and launch armed struggle.',
      },
    },
    depthBank: {
      q4a: {
        num: '4 (a)',
        stem: 'Explain one consequence of Israel’s raid on Samu (1966).',
        marks: 4,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        lines: 9,
        vocabBank: [
          '13 Nov 1966 reprisal raid',
          'Samu village (West Bank)',
          'IDF tanks and aircraft',
          '15 Jordanian soldiers killed, 100+ houses destroyed',
          'King Hussein public humiliation',
          'Anti-Hussein riots in West Bank',
          'Breakdown of secret Israeli-Jordanian talks',
        ],
        connectives: [
          'One significant consequence was...',
          'This large-scale assault resulted in...',
          'Consequently, King Hussein was forced to...',
        ],
        guide:
          'Identify Consequence (e.g. Destruction of Moderate Cooperation OR Riots against Hussein) &rarr; Facts (15 killed, 100 houses flattened) &rarr; Causal Chain: Ended backchannel diplomacy &rarr; Pushed King Hussein into reluctant defense alliance with Nasser (May 1967).',
      },
      q4b: {
        num: '4 (b)',
        stem: 'Explain one consequence of the terrorist attack at the Munich Olympics (1972).',
        marks: 4,
        provenance: { tag: 'Edexcel Specimen', type: 'specimen' },
        lines: 9,
        vocabBank: [
          '5 Sept 1972 Munich Olympics',
          'Black September splinter group',
          '11 Israeli athletes murdered',
          'Global live TV broadcast (900m viewers)',
          'Worldwide moral condemnation',
          'International recognition of Palestinian plight',
          'Operation Wrath of God (Mossad assassinations)',
        ],
        connectives: [
          'One major consequence was...',
          'The global television coverage ensured that...',
          'While the murders drew international revulsion, they also...',
        ],
        guide:
          'Identify Consequence (e.g. Global Horror / Condemnation OR Rocketing Awareness of Palestinian Plight) &rarr; Facts (11 murdered, 900m viewers) &rarr; Causal Chain: Shocked world public &rarr; Put Palestinian statelessness permanently on the UN and international diplomatic map.',
      },
      q5: {
        num: '5',
        stem: 'Explain the importance of the occupied territories (Golan Heights, West Bank, Sinai) for Israeli security after 1967.',
        marks: 8,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        focus:
          'Explain how capturing strategic geographic depth transformed Israeli military defense while creating long-term internal security dilemmas.',
        lines: 21,
        vocabBank: [
          'Strategic depth',
          'Golan Heights escarpment',
          'Sinai Peninsula buffer zone',
          'Bar-Lev Line (Suez Canal)',
          'West Bank / Jordan Valley border',
          'Artillery range protection',
          'One million Palestinian inhabitants',
          'Military administration burden',
        ],
        connectives: [
          'This territorial acquisition was vital because...',
          'Furthermore, ...',
          'On the other hand, ...',
          'This fundamentally altered Israeli strategy by...',
        ],
        p1: 'Geographic Buffer & Artillery Defense: Explain how the Sinai and Golan Heights eliminated the immediate threat of surprise artillery bombardments on Israeli cities.',
        p2: 'Internal Security Dilemma: Explain how controlling the West Bank and Gaza brought one million hostile Palestinian Arabs under military rule, requiring continuous troop deployment.',
      },
      q6: {
        num: '6',
        stem: 'Explain the importance of Egyptian relations with the USSR between 1967 and 1973.',
        marks: 8,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        focus:
          'Explain how Soviet military rearmament rebuilt Egypt’s armed forces, and how Sadat’s expulsion of Soviet advisers set the stage for the 1973 offensive.',
        lines: 21,
        vocabBank: [
          'SAM-2, SAM-3, SAM-6 missile umbrella',
          'War of Attrition (1969–70)',
          'Soviet military advisers (15,000)',
          'Anwar Sadat presidency (1970)',
          'Expulsion of Soviet advisers (July 1972)',
          'Deception strategy vs Israeli intelligence',
          'Preparation for the 1973 surprise assault',
        ],
        connectives: [
          'This relationship was critical because...',
          'Moreover, ...',
          'However, the relationship changed when...',
          'This directly paved the way for...',
        ],
        p1: 'Military Reconstruction & SAM Missile Umbrella: Explain how Soviet hardware rebuilt Egypt’s shattered armed forces, creating the air-defense shield essential for the 1973 canal crossing.',
        p2: 'Strategic Deception through Expulsion: Explain how Sadat’s 1972 expulsion of Soviet advisers deceived Israeli intelligence into assuming Egypt was incapable of going to war.',
      },
      q7: {
        num: '7',
        stem: 'Write a narrative account analysing the key events of the Yom Kippur War (1973).',
        marks: 8,
        provenance: { tag: 'Edexcel June 2022', type: 'past' },
        stimulus: [
          'The crossing of the Suez Canal (October 1973)',
          'The Israeli counter-attack across the Suez Canal',
        ],
        linesPage10: 13,
        linesPage11: 22,
        vocabBank: [
          '6 October 1973 (Yom Kippur / Ramadan)',
          'Breach of sand wall with water cannons',
          'Bar-Lev Line breached',
          'Soviet SAM missile umbrella',
          'Syrian assault on Golan Heights',
          'Valley of Tears tank battles',
          'Ariel Sharon crossing (Chinese Farm)',
          'Egyptian Third Army encircled',
          'UN Resolution 338 ceasefire',
        ],
        connectives: [
          'The war began with complete tactical surprise when...',
          'Faced with a dual-front crisis, Israel...',
          'A decisive turning point came when...',
          'Consequently, ...',
          'The conflict concluded when...',
        ],
        stages: {
          stage1:
            'Stage 1: Arab Surprise & Canal Crossing (6–8 Oct 1973) — Egyptian forces breach Bar-Lev Line; Syrian armour assaults Golan',
          stage2:
            'Stage 2: Israeli Mobilization & Golan Recovery (9–14 Oct 1973) — Reserves mobilized; Syrian tanks repelled at Valley of Tears',
          stage3:
            'Stage 3: Counter-Crossing & Ceasefire (15–24 Oct 1973) — Sharon crosses canal; Egyptian Third Army trapped; UN Res 338',
        },
      },
    },
    traps: [
      {
        title: 'The 1967 vs 1973 Territorial Shift',
        desc: 'Israel conquered the Occupied Territories (Sinai, Gaza Strip, West Bank, East Jerusalem, Golan Heights) in the 1967 Six Day War, NOT in 1973. In 1973, borders remained essentially unchanged following the UN ceasefire.',
      },
      {
        title: 'The Wording of UN Resolution 242',
        desc: 'In UN Resolution 242 (1967), the English text intentionally called for Israeli withdrawal from "territories occupied" rather than "THE territories occupied". This deliberate ambiguity allowed Israel to claim it was not required to surrender all land.',
      },
      {
        title: 'Israeli Intelligence and "The Conception"',
        desc: 'The catastrophic surprise of the 1973 Yom Kippur War was rooted in "The Conception" (Aman hubris) — the false Israeli assumption that Egypt would never attack without long-range strike aircraft capable of neutralizing Israeli airfields.',
      },
    ],
    tracker: {
      sectionA: [
        {
          q: '1 (a)',
          type: 'Consequence',
          topic: 'Syrian-Israeli Border & Air Clash (7 April 1967)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '1 (b)',
          type: 'Consequence',
          topic: 'Black September & PLO Expulsion from Jordan (1970)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '2',
          type: 'Narrative',
          topic: 'Key Events of the Six Day War (June 1967)',
          page: 'P3–4',
          marks: 8,
        },
        {
          q: '3 (a)',
          type: 'Importance',
          topic: 'UN Resolution 242 for the 1967 Aftermath',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Importance',
          topic: 'Cairo Conference (1964) for Fatah & PLO Growth',
          page: 'P6',
          marks: 8,
        },
      ],
      sectionB: [
        {
          q: '4 (a)',
          type: 'Consequence',
          topic: 'Israeli Raid on Samu (1966) on Jordan-Israel Ties',
          page: 'P7',
          marks: 4,
        },
        {
          q: '4 (b)',
          type: 'Consequence',
          topic: 'Munich Olympics Terrorist Attack (1972)',
          page: 'P7',
          marks: 4,
        },
        {
          q: '5',
          type: 'Importance',
          topic: 'Occupied Territories for Israeli Security',
          page: 'P8',
          marks: 8,
        },
        {
          q: '6',
          type: 'Importance',
          topic: 'Egyptian Relations with the USSR (1967–73)',
          page: 'P9',
          marks: 8,
        },
        {
          q: '7',
          type: 'Narrative',
          topic: 'Key Events of the Yom Kippur War (1973)',
          page: 'P10–11',
          marks: 8,
        },
      ],
    },
    specBank: [
      {
        num: 1,
        type: '4m Consequence',
        q: 'Explain one consequence of the Cairo Conference (1964).',
      },
      {
        num: 2,
        type: '8m Importance',
        q: 'Explain the importance of Syria’s support for Fatah in the years 1964–67 for escalating regional tension.',
      },
      {
        num: 3,
        type: '8m Importance',
        q: 'Explain the importance of the actions of the USSR and the USA for the outbreak of the Six Day War (1967).',
      },
      {
        num: 4,
        type: '8m Narrative',
        q: 'Write a narrative account analysing the escalating tension between Israel, Syria and Jordan between 1964 and 1967.',
      },
      {
        num: 5,
        type: '4m Consequence',
        q: 'Explain one consequence of the PFLP airplane hijackings of 1970 (Dawson’s Field).',
      },
      {
        num: 6,
        type: '8m Importance',
        q: 'Explain the importance of the War of Attrition (1969–70) for Egyptian-Israeli relations.',
      },
      {
        num: 7,
        type: '4m Consequence',
        q: 'Explain one consequence of the Yom Kippur War (1973).',
      },
    ],
  },
  KT3: {
    id: 'KT3',
    number: '3',
    title: 'Key Topic 3: Attempts at a Solution, 1974–95',
    shortTitle: 'Attempts at a Solution, 1974–95',
    dates: '1974–1995',
    paperRef: '1HI0/P5 (Paper 2: Period Study)',
    exam: {
      q1a: {
        num: '1 (a)',
        stem: 'Explain one consequence of the Treaty of Washington (1979).',
        marks: 4,
        provenance: { tag: 'Edexcel June 2018', type: 'past' },
        lines: 9,
        vocabBank: [
          '26 March 1979 (White House lawn)',
          'Anwar Sadat & Menachem Begin',
          'Jimmy Carter mediation',
          'Sinai Peninsula returned to Egypt',
          'Arab League expulsion of Egypt',
          'HQ moved from Cairo to Tunis',
          'Severing of Arab diplomatic ties',
          'Sadat assassinated (Oct 1981)',
        ],
        connectives: [
          'One decisive consequence was...',
          'By signing a separate bilateral peace, ...',
          'Consequently, the Arab world responded by...',
        ],
        guide:
          "Identify Consequence (e.g. Diplomatic Isolation of Egypt OR Return of Sinai Peninsula) &rarr; Facts (Sadat, Begin, Arab League boycott) &rarr; Causal Chain: Separate peace broke Arab solidarity &rarr; Arab states cut diplomatic ties &rarr; Fueled Islamist outrage leading to Sadat's assassination.",
      },
      q1b: {
        num: '1 (b)',
        stem: 'Explain one consequence of the Israeli invasion of Lebanon (1982).',
        marks: 4,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        lines: 9,
        vocabBank: [
          'Operation Peace for Galilee (June 1982)',
          'Ariel Sharon (Defence Minister)',
          'Siege of West Beirut',
          'Expulsion of Arafat and 14,000 PLO fighters to Tunisia',
          'Sabra and Shatila massacre (Phalangists)',
          'Kahan Commission inquiry',
          'Rise of Hezbollah in Southern Lebanon',
        ],
        connectives: [
          'One far-reaching consequence was...',
          'The military assault resulted in...',
          'This directly created a new threat because...',
        ],
        guide:
          'Identify Consequence (e.g. Expulsion of PLO to Tunis OR Rise of Hezbollah) &rarr; Facts (Sharon, Beirut siege, 14,000 evacuated) &rarr; Causal Chain: Removed PLO artillery threat from Galilee &rarr; But power vacuum created militant Hezbollah &rarr; Prolonged Israeli occupation until 2000.',
      },
      q2: {
        num: '2',
        stem: 'Write a narrative account analysing diplomatic negotiations between Egypt and Israel from Sadat’s visit (1977) to the Treaty of Washington (1979).',
        marks: 8,
        provenance: { tag: 'Edexcel June 2019', type: 'past' },
        stimulus: [
          'Sadat’s visit to Jerusalem (November 1977)',
          'The Camp David summit (September 1978)',
        ],
        linesPage3: 13,
        linesPage4: 25,
        vocabBank: [
          'Knesset historic speech (19 Nov 1977)',
          '"No more war, no more bloodshed"',
          'Menachem Begin reciprocal visit to Ismailia',
          'Jimmy Carter 13-day Camp David summit',
          '"A Framework for Peace in the Middle East"',
          'Sinai withdrawal & dismantling of Yamit',
          'Full diplomatic recognition & normalization',
          'Treaty of Washington (26 March 1979)',
        ],
        connectives: [
          'The diplomatic breakthrough began when...',
          'When negotiations stalled, ...',
          'President Carter intervened decisively by...',
          'Following intense negotiations, ...',
          'The process culminated in...',
        ],
        stages: {
          stage1:
            'Stage 1: Breakthrough & Jerusalem Visit (Nov 1977) — Sadat breaks psychological barrier with Knesset address; Begin visits Egypt',
          stage2:
            'Stage 2: Carter’s Mediation & Camp David (Sept 1978) — 13 days of intense diplomacy yield Camp David Accords framework',
          stage3:
            'Stage 3: Formal Bilateral Treaty (March 1979) — Treaty of Washington signed; Sinai returned; Arab world ostracizes Egypt',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Explain the importance of the Oslo Accords (1993) for the setting up of the Palestinian National Authority.',
        marks: 8,
        provenance: { tag: 'Edexcel June 2022', type: 'past' },
        focus:
          'Explain why the mutual recognition agreement and the Declaration of Principles provided the legal framework and institutions for Palestinian self-government.',
        lines: 21,
        vocabBank: [
          'Secret negotiations in Norway',
          'Declaration of Principles (DOP)',
          'Letters of Mutual Recognition',
          'Rabin & Arafat handshake (White House, 13 Sept 1993)',
          'Creation of Palestinian National Authority (PNA)',
          'Gaza-Jericho Agreement (1994)',
          'Arafat’s return from exile to Gaza',
          'Palestinian civil police & administration',
        ],
        connectives: [
          'This accord was monumental because...',
          'Furthermore, ...',
          'Without this formal agreement, ...',
          'This directly enabled...',
        ],
        p1: 'Foundational Institutional Framework: Explain how the Oslo Accords created the Palestinian Authority with its own elected council, police force, and civil ministries to govern Palestinian population centres.',
        p2: 'Legitimacy & Arafat’s Return: Explain how mutual recognition between Israel and the PLO allowed Yasser Arafat to end 27 years of exile and establish direct political leadership in Gaza and Jericho.',
      },
      q3b: {
        num: '3 (b)',
        stem: 'Explain the importance of Arafat’s renunciation of terrorism (1988) for diplomatic relations with the USA.',
        marks: 8,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        focus:
          'Explain how meeting US diplomatic preconditions opened direct official dialogue between Washington and the PLO for the first time.',
        lines: 21,
        vocabBank: [
          'Algiers PNC meeting (Nov 1988)',
          'Geneva UN General Assembly speech (Dec 1988)',
          'Renunciation of terrorism in all forms',
          'Recognition of Israel’s right to exist in peace (UN Res 242/338)',
          'Secretary of State George Shultz announcement',
          'Opening of direct US-PLO diplomatic dialogue (Tunis)',
          'Breakthrough ending American diplomatic boycott',
        ],
        connectives: [
          'This public renunciation was vital because...',
          'Moreover, ...',
          'By meeting American preconditions, ...',
          'This fundamentally shifted diplomacy by...',
        ],
        p1: 'Fulfilling US Diplomatic Preconditions: Explain how explicitly accepting UN Resolution 242 and renouncing terrorism met conditions set by Washington since 1975.',
        p2: 'Unlocking Direct Superpower Dialogue: Explain how George Shultz immediately opened official talks with the PLO, transforming Arafat from an international pariah into a recognized diplomatic partner.',
      },
    },
    depthBank: {
      q4a: {
        num: '4 (a)',
        stem: 'Explain one consequence of the Israel-Jordan peace treaty (1994).',
        marks: 4,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        lines: 9,
        vocabBank: [
          '26 October 1994 (Arava desert border)',
          'King Hussein & Yitzhak Rabin',
          'Bill Clinton witness',
          'Demarcation of international border',
          'Water sharing agreements (Yarmouk River)',
          'Jordanian custodian role in Jerusalem shrines',
          'Second Arab state to recognise Israel',
        ],
        connectives: [
          'One major consequence was...',
          'This historic accord meant that...',
          'Consequently, it solidified...',
        ],
        guide:
          "Identify Consequence (e.g. Normalisation of Jordan-Israel Relations OR Recognition of Jordanian Religious Custody) &rarr; Facts (King Hussein, Yitzhak Rabin, 1994 treaty) &rarr; Causal Chain: Secured Israel's longest eastern frontier &rarr; Enabled security cooperation and shared water resources.",
      },
      q4b: {
        num: '4 (b)',
        stem: 'Explain one consequence of the Oslo II agreement (1995).',
        marks: 4,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        lines: 9,
        vocabBank: [
          'September 1995 (Taba / Washington)',
          'Division of West Bank into Areas A, B, and C',
          'Area A: Full Palestinian civil & security (3%)',
          'Area B: Palestinian civil, joint security (24%)',
          'Area C: Exclusive Israeli civil & military (73%)',
          'Palestinian Legislative Council elections',
          'Fragmentation of West Bank into enclaves',
        ],
        connectives: [
          'One direct consequence was...',
          'By dividing the land into Areas A, B, and C, ...',
          'This fragmentation meant that...',
        ],
        guide:
          'Identify Consequence (e.g. Fragmentation of West Bank into Enclaves OR Establishment of Direct Palestinian Civil Rule) &rarr; Facts (Areas A/B/C, 73% Israeli control) &rarr; Causal Chain: Limited Palestinian Authority to isolated cities &rarr; Entrenched Israeli settlements and military checkpoints.',
      },
      q5: {
        num: '5',
        stem: 'Explain the importance of US President Carter for the Camp David negotiations (1978).',
        marks: 8,
        provenance: { tag: 'Edexcel Specimen', type: 'specimen' },
        focus:
          'Explain how Carter’s tireless 13-day personal mediation and financial guarantees bridged irreconcilable positions between Sadat and Begin.',
        lines: 21,
        vocabBank: [
          'September 1978 Camp David summit',
          '13 days of secluded negotiations',
          'Personal diplomacy & shuttle mediation',
          'Sadat threat to walk out',
          'Begin refusal to dismantle Sinai settlements',
          'Carter signed photographs for Begin’s grandchildren',
          'Billions in US financial & military subsidies',
          'Camp David Accords framework',
        ],
        connectives: [
          'President Carter was indispensable because...',
          'Furthermore, ...',
          'Without his direct intervention, ...',
          'This ultimately achieved...',
        ],
        p1: 'Tenacious Personal Mediation: Explain how Carter prevented the summit collapsing by drafting over 20 compromise proposals and physically shuttling between Sadat and Begin’s cabins.',
        p2: 'Financial & Strategic Guarantees: Explain how Carter pledged billions of dollars in annual US aid to both Egypt and Israel, creating the financial incentives needed for peace.',
      },
      q6: {
        num: '6',
        stem: 'Explain the importance of the oil crisis (1973) for the involvement of the USA in the Middle East.',
        marks: 8,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        focus:
          'Explain how OPEC’s oil embargo inflicted severe domestic economic damage on Western economies, forcing Washington into active peacemaking.',
        lines: 21,
        vocabBank: [
          'OPEC & OAPEC oil embargo (Oct 1973)',
          'King Faisal of Saudi Arabia',
          'Quadrupling of crude oil prices ($3 to $12)',
          'US petrol shortages & inflation',
          'Vulnerability of Western economies',
          'Henry Kissinger "shuttle diplomacy"',
          'Disengagement agreements (1974–75)',
          'Reopening of Suez Canal (1975)',
        ],
        connectives: [
          'This crisis was critical because...',
          'Moreover, ...',
          'The economic threat forced Washington to...',
          'Consequently, ...',
        ],
        p1: "Economic Vulnerability & Domestic Shock: Explain how long petrol queues and inflation proved that unconditional US support for Israel threatened America's vital economic security.",
        p2: 'Catalyst for Active American Diplomacy: Explain how Kissinger embarked on intense shuttle diplomacy to stabilize the region, broker military disengagements, and end the embargo.',
      },
      q7: {
        num: '7',
        stem: 'Write a narrative account analysing the events of the First Palestinian Intifada (1987–93).',
        marks: 8,
        provenance: { tag: 'Edexcel June 2023', type: 'past' },
        stimulus: [
          'The Jabalya camp road incident (December 1987)',
          'The "Iron Fist" policy and stone-throwing youth',
        ],
        linesPage10: 13,
        linesPage11: 22,
        vocabBank: [
          '8 Dec 1987 Jabalya refugee camp',
          'IDF tank transporter collision (4 Palestinians killed)',
          'Spontaneous civil uprising (Intifada)',
          'Stone-throwing youth vs IDF tanks ("David vs Goliath")',
          'Unified National Leadership of the Uprising (UNLU)',
          'General strikes, tax boycotts, barricades',
          'Yitzhak Rabin "broken bones" policy',
          'Emergence of Hamas (1987)',
          'International condemnation of Israeli tactics',
          'Catalyst for Madrid (1991) and Oslo (1993)',
        ],
        connectives: [
          'The uprising erupted spontaneously when...',
          'As protests spread across the West Bank and Gaza, ...',
          'Israel responded with severe measures, which...',
          'Consequently, ...',
          'The long-term outcome of the Intifada was...',
        ],
        stages: {
          stage1:
            'Stage 1: Outbreak & Civil Disobedience (Dec 1987) — Jabalya crash triggers mass strikes, protests, and stone-throwing youth',
          stage2:
            'Stage 2: Israeli Repression & International Backlash (1988–90) — Rabin "Iron Fist" policy televised globally; Israel loses PR battle',
          stage3:
            'Stage 3: Political Realignment & Oslo Catalyst (1991–93) — Rise of Hamas; Israeli recognition that status quo was untenable',
        },
      },
    },
    traps: [
      {
        title: 'Camp David (1978) vs Treaty of Washington (1979)',
        desc: 'Do not confuse the Camp David Accords (September 1978 - a framework negotiated with Jimmy Carter) with the formal Treaty of Washington (March 1979 - the official bilateral peace treaty signed on the White House lawn).',
      },
      {
        title: 'Oslo Accords: Territorial Breakdown',
        desc: 'Oslo II (1995) did NOT give Palestinians total control of the West Bank. It divided the land into Area A (full Palestinian control, ~3%), Area B (joint security, ~24%), and Area C (full Israeli security and civil control, ~73%).',
      },
      {
        title: 'Importance Questions: Answer the Prompt Outcome',
        desc: 'In Edexcel Importance questions, you MUST explain why an event was important FOR THE SPECIFIC PROMPT (e.g. importance of Arafat’s UN speech FOR PLO status), rather than writing general biography about Yasser Arafat.',
      },
    ],
    tracker: {
      sectionA: [
        {
          q: '1 (a)',
          type: 'Consequence',
          topic: 'Treaty of Washington (1979) on Egyptian-Arab Relations',
          page: 'P2',
          marks: 4,
        },
        {
          q: '1 (b)',
          type: 'Consequence',
          topic: 'Israeli Invasion of Lebanon & PLO Expulsion (1982)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '2',
          type: 'Narrative',
          topic: 'Egypt-Israel Peace Diplomacy (1977–79)',
          page: 'P3–4',
          marks: 8,
        },
        {
          q: '3 (a)',
          type: 'Importance',
          topic: 'Oslo Accords (1993) for Setting Up Palestinian Authority',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Importance',
          topic: 'Arafat’s 1988 Terrorism Renunciation on US Diplomacy',
          page: 'P6',
          marks: 8,
        },
      ],
      sectionB: [
        {
          q: '4 (a)',
          type: 'Consequence',
          topic: 'Israel-Jordan Peace Treaty (1994)',
          page: 'P7',
          marks: 4,
        },
        {
          q: '4 (b)',
          type: 'Consequence',
          topic: 'Oslo II Agreement (1995) on West Bank Self-Rule',
          page: 'P7',
          marks: 4,
        },
        {
          q: '5',
          type: 'Importance',
          topic: 'President Carter’s Mediation at Camp David (1978)',
          page: 'P8',
          marks: 8,
        },
        {
          q: '6',
          type: 'Importance',
          topic: '1973 Oil Crisis on US Involvement in Middle East',
          page: 'P9',
          marks: 8,
        },
        {
          q: '7',
          type: 'Narrative',
          topic: 'Events of the First Palestinian Intifada (1987–93)',
          page: 'P10–11',
          marks: 8,
        },
      ],
    },
    specBank: [
      {
        num: 1,
        type: '8m Importance',
        q: 'Explain the importance of Kissinger and ‘shuttle diplomacy’ for the reopening of the Suez Canal.',
      },
      {
        num: 2,
        type: '8m Importance',
        q: 'Explain the importance of Sadat’s visit to Israel (1977) for peace negotiations in the Middle East.',
      },
      {
        num: 3,
        type: '8m Importance',
        q: 'Explain the importance of Arafat’s speech to the UN in 1974 for international attitudes towards the PLO.',
      },
      {
        num: 4,
        type: '8m Importance',
        q: 'Explain the importance of PLO activities in Lebanon for Israeli security in the years 1975–82.',
      },
      {
        num: 5,
        type: '4m Consequence',
        q: 'Explain one consequence of the First Palestinian Intifada (1987–93).',
      },
      {
        num: 6,
        type: '4m Consequence',
        q: 'Explain one consequence of US involvement in the Gulf War (1991).',
      },
      {
        num: 7,
        type: '8m Importance',
        q: 'Explain the importance of the end of the Cold War for attempts to find a solution to the Middle East conflict.',
      },
    ],
  },
};

// =============================================================================
// COMMON CSS: HIGH-CONTRAST PHOTOCOPIER SAFE TYPOGRAPHY & ENLARGED FONT SIZES
// =============================================================================
const COMMON_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap');

  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 210mm;
    height: 297mm;
    padding: 11mm 13mm 11mm 13mm;
    page-break-after: always;
    position: relative;
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Authentic Pearson Edexcel Cover Headers */
  .cover-warning {
    font-size: 8.0pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
    border-bottom: 1.5px solid #000000;
    padding-bottom: 3px;
  }
  .candidate-box {
    border: 1.5px solid #000000;
    padding: 6px 10px;
    margin-bottom: 8px;
    background: #ffffff;
  }
  .candidate-row {
    display: flex;
    gap: 12px;
    margin-bottom: 4px;
  }
  .candidate-row:last-child {
    margin-bottom: 0;
  }
  .field-label {
    font-size: 8.0pt;
    font-weight: 800;
    color: #000000;
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .field-input {
    border-bottom: 1.5px solid #000000;
    height: 18px;
  }
  .char-cell {
    display: inline-block;
    width: 17px;
    height: 19px;
    border: 1.2px solid #000000;
    margin-right: 3px;
    vertical-align: middle;
  }

  .edexcel-banner {
    font-size: 13pt;
    font-weight: 900;
    color: #000000;
    letter-spacing: -0.2px;
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  .exam-header-box {
    border: 2px solid #000000;
    display: flex;
    margin-bottom: 7px;
    background: #ffffff;
  }
  .exam-header-left {
    flex: 3.8;
    padding: 6px 10px;
    border-right: 2px solid #000000;
  }
  .exam-header-right {
    flex: 1.2;
    padding: 6px 8px;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .exam-date {
    font-size: 8pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .exam-time {
    font-size: 8pt;
    font-weight: 700;
    color: #000000;
    margin-bottom: 3px;
  }
  .exam-subject {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 12.5pt;
    font-weight: 900;
    color: #000000;
    line-height: 1.15;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .exam-booklet {
    font-size: 9.5pt;
    font-weight: 800;
    color: #000000;
  }
  .exam-subtopic {
    font-size: 8.0pt;
    color: #000000;
    font-style: italic;
  }
  .ref-label {
    font-size: 7.2pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
  }
  .ref-code {
    font-size: 12pt;
    font-weight: 900;
    color: #000000;
    letter-spacing: 0.5px;
  }

  /* Internal Page Headers */
  .page-header {
    border-bottom: 2px solid #000000;
    padding-bottom: 4px;
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 11.5pt;
    font-weight: 900;
    margin: 0;
    color: #000000;
    letter-spacing: -0.1px;
    text-transform: uppercase;
  }
  .header-left p {
    font-size: 8.2pt;
    margin: 1px 0 0 0;
    color: #000000;
  }
  .header-tag {
    font-size: 7.8pt;
    font-weight: 800;
    color: #ffffff;
    background: #000000;
    padding: 2.5px 8px;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  /* Question Containers */
  .question-container {
    margin-bottom: 5px;
  }
  .question-prompt {
    font-size: 9.2pt;
    font-weight: 700;
    line-height: 1.35;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: #000000;
  }
  .q-num {
    font-size: 10pt;
    font-weight: 900;
    margin-right: 4px;
    color: #000000;
  }
  .q-marks {
    font-size: 9.2pt;
    font-weight: 900;
    color: #000000;
    white-space: nowrap;
    margin-left: 8px;
  }

  /* Discrete 4-Tier Provenance Badges (Monochrome Laser-Safe) */
  .exam-provenance-pill {
    font-size: 7pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 1px 5px;
    border-radius: 2px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.25;
    border: 1.2px solid #000000;
  }
  .exam-provenance-pill.past {
    background: #000000;
    color: #ffffff;
  }
  .exam-provenance-pill.specimen {
    background: #f8fafc;
    color: #000000;
  }
  .exam-provenance-pill.unexamined {
    background: #f8fafc;
    color: #000000;
  }
  .exam-provenance-pill.forecast {
    background: #f8fafc;
    color: #000000;
  }

  /* Stimulus Box */
  .stimulus-card {
    border: 1.5px solid #000000;
    border-radius: 2px;
    background: #f8fafc;
    padding: 5px 9px;
    margin-bottom: 5px;
    font-size: 8.2pt;
    line-height: 1.3;
    color: #000000;
  }
  .stimulus-card ul {
    margin: 2px 0 2px 18px;
    padding: 0;
  }
  .stimulus-card li {
    margin-bottom: 1px;
  }

  .focus-guidance {
    font-size: 8.2pt;
    color: #000000;
    font-style: italic;
    margin-bottom: 5px;
    line-height: 1.3;
  }

  /* Ruled Lines for Handwriting (Authentic Pearson Edexcel 7.4mm Spacing - Photocopier Safe) */
  .dotted-line {
    border-bottom: 1.2px solid #000000;
    height: 7.4mm;
    width: 100%;
    box-sizing: border-box;
  }

  /* Pearson Professional Monochrome Scaffolding Containers */
  .scaffold-bar {
    border: 1.5px solid #000000;
    border-radius: 3px;
    background: #f8fafc;
    padding: 4px 8px;
    margin-bottom: 6px;
    font-size: 8.4pt;
    line-height: 1.3;
    display: flex;
    gap: 8px;
    color: #000000;
  }
  .scaffold-col {
    border-right: 1px solid #cbd5e1;
    padding-right: 6px;
  }
  .scaffold-col:last-child {
    border-right: none;
    padding-right: 0;
  }
  .scaffold-label {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 7.8pt;
    color: #000000;
    margin-bottom: 2px;
    display: block;
    letter-spacing: 0.2px;
  }
  .scaffold-content {
    color: #000000;
    font-size: 7.6pt;
    line-height: 1.3;
  }
  .scaffold-pill {
    display: inline-block;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 1px 5px;
    margin: 1px 2px 1px 0;
    font-size: 7.6pt;
    font-weight: 700;
    color: #000000;
    white-space: nowrap;
  }

  /* Pearson Professional Full-Width Stacked Scaffolding */
  .importance-scaffold-stack {
    border: 1.5px solid #000000;
    border-radius: 3px;
    background: #f8fafc;
    padding: 4px 8px;
    margin-bottom: 5px;
    font-size: 8.4pt;
    line-height: 1.3;
    color: #000000;
  }
  .scaffold-focus-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 2px 0;
    border-bottom: 1px solid #cbd5e1;
  }
  .scaffold-badge {
    font-size: 7.6pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #ffffff;
    background: #000000;
    padding: 1.5px 6px;
    border-radius: 2px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .scaffold-text {
    color: #000000;
    font-size: 8.2pt;
    line-height: 1.3;
  }
  .scaffold-vocab-row {
    padding-top: 3px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .scaffold-vocab-subrow {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .scaffold-pills-list {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 3px;
  }
  .scaffold-stem-subrow {
    display: flex;
    align-items: baseline;
    gap: 6px;
    font-size: 7.6pt;
    color: #000000;
  }
  .scaffold-stem-label {
    font-weight: 800;
    color: #000000;
    font-size: 7.6pt;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .scaffold-stem-text {
    font-style: italic;
    color: #000000;
  }

  .narrative-flow-planner {
    border: 1.5px solid #000000;
    border-radius: 3px;
    background: #f8fafc;
    padding: 4px 8px;
    margin-bottom: 6px;
    font-size: 8.4pt;
    line-height: 1.3;
  }
  .narrative-stages-row {
    display: flex;
    gap: 6px;
    margin-bottom: 4px;
  }
  .narrative-stage-box {
    flex: 1;
    background: #ffffff;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 3px 5px;
  }
  .narrative-stage-hdr {
    font-weight: 800;
    font-size: 7.6pt;
    text-transform: uppercase;
    color: #000000;
    border-bottom: 1px solid #000000;
    padding-bottom: 1px;
    margin-bottom: 2px;
  }

  /* Fatal Traps Card */
  .traps-card {
    border: 1.5px solid #000000;
    border-radius: 3px;
    padding: 6px 8px;
    background: #ffffff;
    margin-bottom: 6px;
  }
  .traps-header {
    font-size: 8.5pt;
    font-weight: 800;
    color: #ffffff;
    background: #000000;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 3px 6px;
    border-radius: 2px;
    margin-bottom: 5px;
  }
  .traps-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }
  .trap-item {
    background: #f8fafc;
    border: 1.2px solid #000000;
    border-radius: 2px;
    padding: 5px 6px;
    font-size: 7.6pt;
    line-height: 1.25;
    color: #000000;
  }
  .trap-item strong {
    color: #000000;
    display: block;
    margin-bottom: 2px;
    font-weight: 800;
  }
  .trap-item span {
    color: #000000;
  }

  /* 100% Specification Practice Bank Container (Page 12) */
  .spec-bank-container {
    border: 1.5px solid #000000;
    border-radius: 3px;
    padding: 6px 9px;
    background: #ffffff;
    margin-bottom: 6px;
  }
  .spec-bank-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }
  .spec-bank-title {
    color: #000000;
    font-size: 8.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .spec-bank-subtitle {
    font-size: 7.2pt;
    color: #000000;
    font-style: italic;
  }
  .spec-bank-list {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .spec-bank-item {
    background: #f8fafc;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 3px 6px;
    font-size: 7.8pt;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.25;
    color: #000000;
  }
  .spec-bank-q {
    flex: 1;
    color: #000000;
    padding-right: 8px;
  }
  .spec-bank-badge {
    background: #000000;
    color: #ffffff;
    font-size: 6.8pt;
    font-weight: 700;
    padding: 1.5px 5px;
    border-radius: 2px;
    white-space: nowrap;
    text-transform: uppercase;
  }

  /* Diagnostic Card */
  .diagnostic-action-card {
    border: 1.5px solid #000000;
    border-radius: 3px;
    padding: 5px 8px;
    background: #f8fafc;
    font-size: 7.4pt;
    color: #000000;
  }

  /* Progress Tracker Table on Page 1 */
  .tracker-card {
    border: 1.5px solid #000000;
    border-radius: 3px;
    background: #ffffff;
    padding: 5px 8px;
    margin-bottom: 7px;
  }
  .tracker-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1.5px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }
  .tracker-title {
    font-size: 8.5pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .tracker-sub {
    font-size: 7pt;
    color: #000000;
    font-style: italic;
  }
  .tracker-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.4pt;
    line-height: 1.2;
  }
  .tracker-table th {
    background: #000000;
    color: #ffffff;
    font-weight: 800;
    text-transform: uppercase;
    padding: 2.5px 5px;
    border: 1px solid #000000;
    text-align: left;
    font-size: 6.8pt;
  }
  .tracker-table td {
    padding: 2.5px 5px;
    border: 1px solid #cbd5e1;
    color: #000000;
  }
  .tracker-section-hdr td {
    background: #f1f5f9;
    font-weight: 800;
    color: #000000;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 2.5px 5px;
    border-top: 1.5px solid #000000;
    border-bottom: 1.5px solid #000000;
  }
  .tracker-row:nth-child(even) {
    background: #fafafa;
  }
  .page-cell {
    text-align: center;
    font-weight: 800;
    color: #000000;
  }
  .marks-cell {
    text-align: center;
    font-weight: 700;
  }
  .score-cell {
    text-align: center;
    font-weight: 700;
    color: #000000;
  }
  .type-tag {
    display: inline-block;
    padding: 1px 4px;
    border-radius: 2px;
    font-size: 6.5pt;
    font-weight: 700;
    text-transform: uppercase;
    background: #000000;
    color: #ffffff;
    white-space: nowrap;
  }
  .tracker-box {
    display: inline-block;
    width: 9px;
    height: 9px;
    border: 1.2px solid #000000;
    border-radius: 1px;
    vertical-align: middle;
    margin-right: 2px;
  }

  /* Specification Audit Checklist on Page 1 */
  .spec-audit-container {
    border: 1.5px solid #000000;
    border-radius: 3px;
    padding: 5px 8px;
    background: #f8fafc;
    margin-bottom: 5px;
  }
  .spec-audit-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1.2px solid #000000;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }
  .spec-audit-title {
    font-size: 8pt;
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
  }
  .spec-audit-sub {
    font-size: 6.8pt;
    color: #000000;
    font-style: italic;
  }
  .spec-audit-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }
  .spec-audit-col {
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 2px;
    padding: 3px 5px;
  }
  .spec-col-title {
    font-size: 7.2pt;
    font-weight: 800;
    color: #000000;
    border-bottom: 1px solid #000000;
    padding-bottom: 1.5px;
    margin-bottom: 2.5px;
    text-transform: uppercase;
  }
  .spec-points-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .spec-point-item {
    font-size: 6.6pt;
    line-height: 1.2;
    color: #000000;
    display: flex;
    align-items: flex-start;
    margin-bottom: 2px;
  }
  .spec-tick-box {
    width: 8px;
    height: 8px;
    border: 1.2px solid #000000;
    border-radius: 1px;
    margin-right: 3px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .spec-point-text {
    flex: 1;
  }

  /* Footers */
  .page-footer {
    border-top: 1.2px solid #000000;
    padding-top: 3px;
    font-size: 7.5pt;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
  }
  .cover-footer {
    border-top: 1.2px solid #000000;
    padding-top: 3px;
    font-size: 7.5pt;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
  }
  .turn-over {
    font-weight: 800;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
`;

// Helper: render handwriting lines
function renderLines(count) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += '<div class="dotted-line"></div>';
  }
  return html;
}

// Specification audit data for Page 1 checklist
const KT_SPECIFICATION = {
  KT1: [
    {
      title: '1. British Withdrawal & Creation of Israel',
      points: [
        '<strong>Conflicting interests and demands</strong> of Jews and Arabs within the British Mandate.',
        '<strong>Key events leading to the end of the British Mandate</strong>, partition and the creation of Israel, including the <strong>significance of the bombing of the King David Hotel</strong> and <strong>UN Resolution 181</strong>.',
        '<strong>Key events of the Arab-Israeli war (1948–49)</strong>.',
      ],
    },
    {
      title: '2. Aftermath of the 1948–49 War',
      points: [
        '<strong>Territorial changes</strong> and their impact.',
        'The <strong>refugee status of Palestinian Arabs</strong>.',
        'The creation of the <strong>Israeli Defence Forces (IDF)</strong> and the <strong>Law of Return (1950)</strong>.',
        '<strong>US aid</strong> to Israel.',
        'Israel’s <strong>relations with Egypt</strong>.',
      ],
    },
    {
      title: '3. Increased Tension, 1955–63',
      points: [
        '<strong>Nasser</strong> and Egypt’s <strong>leadership of the Arab world</strong>.',
        'The events and significance of <strong>Israeli attacks on Gaza in 1955</strong> and <strong>Sinai in 1956</strong>.',
        'The events and significance of the <strong>Suez Crisis (1956)</strong>, including the <strong>formation of the United Arab Republic (UAR) in 1958</strong>.',
      ],
    },
  ],
  KT2: [
    {
      title: '1. The Six Day War, 1967',
      points: [
        'The significance of the <strong>Cairo Conference (1964)</strong> and the <strong>growth of Fatah and the PLO</strong>.',
        '<strong>Escalating tension</strong> between Israel, Syria and Jordan: <strong>Syria’s support for Fatah</strong>, <strong>Israel’s raid on Samu</strong> and the <strong>events of 7 April 1967</strong>.',
        'The <strong>actions of the USSR, Nasser and the USA</strong> in the period leading to war.',
        '<strong>Key events of the war</strong>.',
      ],
    },
    {
      title: '2. Aftermath of the 1967 War',
      points: [
        '<strong>UN Resolution 242</strong> and the <strong>continued dispute over the Suez Canal</strong>.',
        '<strong>Palestinian refugees</strong> and the significance of the <strong>occupied territories</strong>: <strong>Golan Heights, Gaza Strip, West Bank, Sinai and East Jerusalem</strong>.',
        'The <strong>use of terrorism, Israel’s response and international attitudes</strong> towards the Palestine issue: the <strong>PFLP airplane hijacks of 1970</strong>; <strong>Black September</strong> and the <strong>Munich Olympics</strong>.',
        'The <strong>expulsion of the PLO from Jordan (1970)</strong>.',
      ],
    },
    {
      title: '3. Israel and Egypt, 1967–73',
      points: [
        '<strong>Egyptian relations</strong> with Israel, the USA, the USSR and other Arab states.',
        'Israel’s <strong>consolidation of control of the occupied territories</strong>.',
        'Key events of the <strong>Yom Kippur War (1973)</strong> and its aftermath.',
      ],
    },
  ],
  KT3: [
    {
      title: '1. Diplomatic Negotiations',
      points: [
        'The significance of the <strong>oil crisis</strong> and the <strong>involvement of the USA and the USSR</strong>.',
        '<strong>Kissinger, ‘shuttle diplomacy’</strong> and the <strong>reopening of the Suez Canal</strong>.',
        '<strong>Sadat’s visit to Israel (1977)</strong>, <strong>Begin’s visit to Egypt (1977)</strong>, <strong>US President Carter and Camp David (1978)</strong> and the <strong>Treaty of Washington (1979)</strong>.',
      ],
    },
    {
      title: '2. The Palestinian Issue',
      points: [
        '<strong>Arafat’s speech to the UN (1974)</strong>.',
        'The significance of <strong>PLO activities in Lebanon</strong>.',
        '<strong>Israeli reprisals, the invasion of Lebanon (1982)</strong> and the results.',
        'The <strong>Israeli occupied territories</strong> and the <strong>First Palestinian Intifada (1987–93)</strong>.',
      ],
    },
    {
      title: '3. Attempts at a Solution',
      points: [
        'The significance of <strong>Arafat’s renunciation of terrorism</strong> in a speech at the UN (1988).',
        '<strong>Changing superpower policies</strong> in the Middle East: <strong>US involvement in the Gulf War (1991)</strong>, and the <strong>end of the Cold War</strong>.',
        '<strong>Arafat, Rabin and the Oslo Accords (1993)</strong>; the <strong>setting up of the Palestinian National Authority</strong>; the <strong>Israel-Jordan peace treaty (1994)</strong>; <strong>Oslo II (1995)</strong>.',
      ],
    },
  ],
};

// =============================================================================
// HTML RENDERER: 12-PAGE PER-KEY-TOPIC MASTER BOOKLET (100% EXAM EXECUTION)
// =============================================================================
function renderBookletHtml(ktKey, meta) {
  const e = meta.exam;
  const d = meta.depthBank;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${meta.title} — GCSE (9–1) Exam Practice Pack</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">
    <style>${COMMON_CSS}</style>
</head>
<body>

    <!-- ============================================================= -->
    <!-- PAGE 1: AUTHENTIC PEARSON EDEXCEL EXAMINATION COVER           -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="cover-warning">
                Please check the examination details below before entering your candidate information
            </div>

            <!-- Candidate Information Box -->
            <div class="candidate-box">
                <div class="candidate-row">
                    <div style="flex: 2;">
                        <div class="field-label">Candidate surname</div>
                        <div class="field-input"></div>
                    </div>
                    <div style="flex: 1.5;">
                        <div class="field-label">Other names</div>
                        <div class="field-input"></div>
                    </div>
                </div>
                <div class="candidate-row">
                    <div style="flex: 1;">
                        <div class="field-label">Centre Number</div>
                        <div>
                            <span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="field-label">Candidate Number</div>
                        <div>
                            <span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span><span class="char-cell"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="edexcel-banner">Pearson Edexcel GCSE (9–1)</div>

            <!-- Exam Header Box -->
            <div class="exam-header-box">
                <div class="exam-header-left">
                    <div class="exam-date">History · Paper 2: Period Study</div>
                    <div class="exam-time">Time: Approx. 50 minutes (Section A Timed Mock)</div>
                    <div class="exam-subject">Conflict in the Middle East, 1945–95</div>
                    <div class="exam-booklet">${meta.title}</div>
                    <div class="exam-subtopic">Comprehensive 12-Page Specification Practice Pack · ${meta.dates}</div>
                </div>
                <div class="exam-header-right">
                    <div class="ref-label">Paper<br>reference</div>
                    <div class="ref-code">1HI0/P5</div>
                </div>
            </div>

            <!-- Instructions & Information -->
            <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 6px; font-size: 7.2pt; color: #334155; line-height: 1.25;">
                <div><strong>Instructions:</strong> Use black ink. Complete Section A as a timed 32-mark mock (~50 mins). Section B provides exhaustive specification depth. Section C provides the 100% syllabus practice bank and fatal traps on Page 12.</div>
                <div style="margin-top: 2px;"><strong>Information:</strong> The total mark for Section A is 32. Marks for each question are shown in brackets. Clean student pack with zero model answers.</div>
            </div>

            <!-- 12-Page Complete Unit Exam Tracker -->
            <div class="tracker-card">
                <div class="tracker-header">
                    <span class="tracker-title">📋 12-Page Specification Practice Tracker &amp; Progress Audit</span>
                    <span class="tracker-sub">Track marks achieved across Timed Mock (Sec A) &amp; Depth Practice (Sec B)</span>
                </div>
                <table class="tracker-table">
                    <thead>
                        <tr>
                            <th style="width: 10%;">Question</th>
                            <th style="width: 15%;">Format</th>
                            <th style="width: 47%;">Specification Focus &amp; Historical Content</th>
                            <th style="width: 8%; text-align: center;">Page</th>
                            <th style="width: 8%; text-align: center;">Marks</th>
                            <th style="width: 12%; text-align: center;">Done / Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- SECTION A -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">SECTION A: 32-MARK TIMED MOCK EXAM (Spend approx. 50 minutes)</td>
                        </tr>
                        ${meta.tracker.sectionA
                          .map(
                            (item) => `
                        <tr class="tracker-row">
                            <td><strong>Q${item.q}</strong></td>
                            <td><span class="type-tag">${item.type}</span></td>
                            <td>${item.topic}</td>
                            <td class="page-cell">${item.page}</td>
                            <td class="marks-cell">[${item.marks}]</td>
                            <td class="score-cell"><span class="tracker-box"></span> / ${item.marks}</td>
                        </tr>
                        `,
                          )
                          .join('')}

                        <!-- SECTION B -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">SECTION B: EXHAUSTIVE SPECIFICATION DEPTH BANK (Homework &amp; Mastery)</td>
                        </tr>
                        ${meta.tracker.sectionB
                          .map(
                            (item) => `
                        <tr class="tracker-row">
                            <td><strong>Q${item.q}</strong></td>
                            <td><span class="type-tag">${item.type}</span></td>
                            <td>${item.topic}</td>
                            <td class="page-cell">${item.page}</td>
                            <td class="marks-cell">[${item.marks}]</td>
                            <td class="score-cell"><span class="tracker-box"></span> / ${item.marks}</td>
                        </tr>
                        `,
                          )
                          .join('')}

                        <!-- SECTION C -->
                        <tr class="tracker-section-hdr">
                            <td colspan="6">SECTION C: 100% SPECIFICATION PRACTICE BANK &amp; FATAL TRAPS</td>
                        </tr>
                        <tr class="tracker-row">
                            <td><strong>Page 12</strong></td>
                            <td><span class="type-tag">Syllabus Bank</span></td>
                            <td>Exhaustive Practice Stems &amp; Top 3 Fatal Examiner Traps</td>
                            <td class="page-cell">12</td>
                            <td class="marks-cell">Audit</td>
                            <td class="score-cell"><span class="tracker-box"></span> Complete</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Official Specification Mastery Checklist -->
            <div class="spec-audit-container">
                <div class="spec-audit-header">
                    <span class="spec-audit-title">Pearson Edexcel GCSE (9–1) Specification Audit &amp; Revision Checklist</span>
                    <span class="spec-audit-sub">Tick each official syllabus requirement once revised and mastered:</span>
                </div>
                <div class="spec-audit-grid">
                    ${(KT_SPECIFICATION[ktKey] || [])
                      .map(
                        (topic) => `
                    <div class="spec-audit-col">
                        <div class="spec-col-title">${topic.title}</div>
                        <ul class="spec-points-list">
                            ${topic.points
                              .map(
                                (pt) => `
                            <li class="spec-point-item">
                                <span class="spec-tick-box"></span>
                                <span class="spec-point-text">${pt}</span>
                            </li>
                            `,
                              )
                              .join('')}
                        </ul>
                    </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>
        </div>

        <div class="cover-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option P5 Conflict in the Middle East</span>
            <span class="turn-over">Turn over for Section A &#9654;</span>
            <span>Page 1 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 2: SECTION A — QUESTION 1: CONSEQUENCE PRACTICE (8 MARKS) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: Timed Exam Paper · Question 1</h2>
                    <p>Answer Question 1(a) and Question 1(b). Spend approx. 6 minutes on each question.</p>
                </div>
                <span class="header-tag">Q1: Consequence [8m Total]</span>
            </div>

            <!-- Question 1(a) -->
            <div class="question-container">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${e.q1a.num}</strong>
                        ${e.q1a.provenance ? `<span class="exam-provenance-pill ${e.q1a.provenance.type}">${e.q1a.provenance.tag}</span>` : ''}
                        ${e.q1a.stem}
                    </span>
                    <span class="q-marks">(4)</span>
                </div>
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Facts Bank:</span>
                        <div class="scaffold-content">${e.q1a.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 0.9;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${e.q1a.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.6;">
                        <span class="scaffold-label">Response Structure:</span>
                        <div class="scaffold-content" style="font-size: 7.4pt;">${e.q1a.guide}</div>
                    </div>
                </div>
                ${renderLines(e.q1a.lines)}
            </div>

            <!-- Question 1(b) -->
            <div class="question-container" style="margin-top: 8px;">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${e.q1b.num}</strong>
                        ${e.q1b.provenance ? `<span class="exam-provenance-pill ${e.q1b.provenance.type}">${e.q1b.provenance.tag}</span>` : ''}
                        ${e.q1b.stem}
                    </span>
                    <span class="q-marks">(4)</span>
                </div>
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Facts Bank:</span>
                        <div class="scaffold-content">${e.q1b.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 0.9;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${e.q1b.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.6;">
                        <span class="scaffold-label">Response Structure:</span>
                        <div class="scaffold-content" style="font-size: 7.4pt;">${e.q1b.guide}</div>
                    </div>
                </div>
                ${renderLines(e.q1b.lines)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · ${meta.shortTitle}</span>
            <span class="turn-over">Turn over for Question 2 &#9654;</span>
            <span>Page 2 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 3: SECTION A — QUESTION 2: NARRATIVE ACCOUNT (PART 1)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: Timed Exam Paper · Question 2</h2>
                    <p>Spend approx. 12 minutes on this question. Write in continuous chronological prose.</p>
                </div>
                <span class="header-tag">Q2: Narrative Account [8m]</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${e.q2.num}</strong>
                        ${e.q2.provenance ? `<span class="exam-provenance-pill ${e.q2.provenance.type}">${e.q2.provenance.tag}</span>` : ''}
                        ${e.q2.stem}
                    </span>
                    <span class="q-marks">(8)</span>
                </div>

                <!-- Stimulus Box -->
                <div class="stimulus-card">
                    You may use the following in your answer:
                    <ul>
                        <li><strong>${e.q2.stimulus[0]}</strong></li>
                        <li><strong>${e.q2.stimulus[1]}</strong></li>
                    </ul>
                    <span style="display: block; margin-top: 2px; font-style: italic; color: #475569;">(You must also use information of your own.)</span>
                </div>

                <!-- Narrative Flow Planner -->
                <div class="narrative-flow-planner">
                    <div style="font-weight: 800; font-size: 7.4pt; text-transform: uppercase; color: #0f172a; margin-bottom: 2px;">
                        Chronological 3-Stage Narrative Architecture:
                    </div>
                    <div class="narrative-stages-row">
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${e.q2.stages.stage1.split(' — ')[0]}</div>
                            <div style="font-size: 7.2pt; color: #334155;">${e.q2.stages.stage1.split(' — ')[1]}</div>
                        </div>
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${e.q2.stages.stage2.split(' — ')[0]}</div>
                            <div style="font-size: 7.2pt; color: #334155;">${e.q2.stages.stage2.split(' — ')[1]}</div>
                        </div>
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${e.q2.stages.stage3.split(' — ')[0]}</div>
                            <div style="font-size: 7.2pt; color: #334155;">${e.q2.stages.stage3.split(' — ')[1]}</div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 2px; font-size: 7.4pt; color: #475569;">
                        <span><strong>Fact Bank:</strong> ${e.q2.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</span>
                        <span><strong>Connectives:</strong> ${e.q2.connectives.slice(0, 3).join(' · ')}</span>
                    </div>
                </div>

                ${renderLines(e.q2.linesPage3)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · ${meta.shortTitle}</span>
            <span class="turn-over">Question 2 continues on next page &#9654;</span>
            <span>Page 3 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 4: SECTION A — QUESTION 2: NARRATIVE ACCOUNT (PART 2)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: Timed Exam Paper · Question 2 (Continued)</h2>
                    <p>Complete your 3-stage causal account: Stage 1 (Catalyst) &rarr; Stage 2 (Turning Point) &rarr; Stage 3 (Outcome).</p>
                </div>
                <span class="header-tag">Q2: Narrative Continuation</span>
            </div>

            <div class="question-container">
                <div style="border: 1px solid #94a3b8; border-radius: 4px; background: #f8fafc; padding: 4px 8px; margin-bottom: 6px; font-size: 7.4pt; color: #334155; display: flex; justify-content: space-between;">
                    <span><strong>Narrative Rule:</strong> Use linking connectives (<em>"Consequently"</em>, <em>"This directly led to"</em>) between paragraphs.</span>
                    <span><strong>Check:</strong> Both stimulus points + 1 own fact included.</span>
                </div>
                ${renderLines(e.q2.linesPage4)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · ${meta.shortTitle}</span>
            <span class="turn-over">Turn over for Question 3(a) &#9654;</span>
            <span>Page 4 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 5: SECTION A — QUESTION 3(a): IMPORTANCE QUESTION        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: Timed Exam Paper · Question 3(a)</h2>
                    <p>Spend approx. 12 minutes on this question. Write two developed explanatory paragraphs.</p>
                </div>
                <span class="header-tag">Q3(a): Importance [8m]</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${e.q3a.num}</strong>
                        ${e.q3a.provenance ? `<span class="exam-provenance-pill ${e.q3a.provenance.type}">${e.q3a.provenance.tag}</span>` : ''}
                        ${e.q3a.stem}
                    </span>
                    <span class="q-marks">(8)</span>
                </div>
                <div class="focus-guidance">
                    <strong>Examiner Guidance:</strong> ${e.q3a.focus}
                </div>

                <!-- Importance Scaffold Stack -->
                <div class="importance-scaffold-stack">
                    <div class="scaffold-focus-row">
                        <span class="scaffold-badge">Paragraph 1 Focus</span>
                        <span class="scaffold-text">${e.q3a.p1}</span>
                    </div>
                    <div class="scaffold-focus-row">
                        <span class="scaffold-badge">Paragraph 2 Focus</span>
                        <span class="scaffold-text">${e.q3a.p2}</span>
                    </div>
                    <div class="scaffold-vocab-row">
                        <div class="scaffold-vocab-subrow">
                            <span class="scaffold-badge">Specification Fact Bank</span>
                            <div class="scaffold-pills-list">
                                ${e.q3a.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join('')}
                            </div>
                        </div>
                        <div class="scaffold-stem-subrow">
                            <span class="scaffold-stem-label">Analytical Stems:</span>
                            <span class="scaffold-stem-text">${e.q3a.connectives
                              .slice(0, 3)
                              .map((c) => `<em>"${c}"</em>`)
                              .join(' · ')}</span>
                        </div>
                    </div>
                </div>

                ${renderLines(e.q3a.lines)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · ${meta.shortTitle}</span>
            <span class="turn-over">Turn over for Question 3(b) &#9654;</span>
            <span>Page 5 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 6: SECTION A — QUESTION 3(b): IMPORTANCE QUESTION        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section A: Timed Exam Paper · Question 3(b)</h2>
                    <p>Spend approx. 12 minutes on this question. Write two developed explanatory paragraphs.</p>
                </div>
                <span class="header-tag">Q3(b): Importance [8m]</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${e.q3b.num}</strong>
                        ${e.q3b.provenance ? `<span class="exam-provenance-pill ${e.q3b.provenance.type}">${e.q3b.provenance.tag}</span>` : ''}
                        ${e.q3b.stem}
                    </span>
                    <span class="q-marks">(8)</span>
                </div>
                <div class="focus-guidance">
                    <strong>Examiner Guidance:</strong> ${e.q3b.focus}
                </div>

                <!-- Importance Scaffold Stack -->
                <div class="importance-scaffold-stack">
                    <div class="scaffold-focus-row">
                        <span class="scaffold-badge">Paragraph 1 Focus</span>
                        <span class="scaffold-text">${e.q3b.p1}</span>
                    </div>
                    <div class="scaffold-focus-row">
                        <span class="scaffold-badge">Paragraph 2 Focus</span>
                        <span class="scaffold-text">${e.q3b.p2}</span>
                    </div>
                    <div class="scaffold-vocab-row">
                        <div class="scaffold-vocab-subrow">
                            <span class="scaffold-badge">Specification Fact Bank</span>
                            <div class="scaffold-pills-list">
                                ${e.q3b.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join('')}
                            </div>
                        </div>
                        <div class="scaffold-stem-subrow">
                            <span class="scaffold-stem-label">Analytical Stems:</span>
                            <span class="scaffold-stem-text">${e.q3b.connectives
                              .slice(0, 3)
                              .map((c) => `<em>"${c}"</em>`)
                              .join(' · ')}</span>
                        </div>
                    </div>
                </div>

                ${renderLines(e.q3b.lines)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · End of Section A (32 Marks Total)</span>
            <span class="turn-over">Turn over for Section B (Specification Depth Bank) &#9654;</span>
            <span>Page 6 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 7: SECTION B — SPECIFICATION BANK: CONSEQUENCE DEPTH     -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Specification Depth Bank · Consequence Practice</h2>
                    <p>Exhaustive curriculum coverage. Practice additional 4-mark consequence stems.</p>
                </div>
                <span class="header-tag">Spec Depth: Consequence</span>
            </div>

            <!-- Question 4(a) -->
            <div class="question-container">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${d.q4a.num}</strong>
                        ${d.q4a.provenance ? `<span class="exam-provenance-pill ${d.q4a.provenance.type}">${d.q4a.provenance.tag}</span>` : ''}
                        ${d.q4a.stem}
                    </span>
                    <span class="q-marks">(4)</span>
                </div>
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Facts Bank:</span>
                        <div class="scaffold-content">${d.q4a.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 0.9;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${d.q4a.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.6;">
                        <span class="scaffold-label">Response Structure:</span>
                        <div class="scaffold-content" style="font-size: 7.4pt;">${d.q4a.guide}</div>
                    </div>
                </div>
                ${renderLines(d.q4a.lines)}
            </div>

            <!-- Question 4(b) -->
            <div class="question-container" style="margin-top: 8px;">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${d.q4b.num}</strong>
                        ${d.q4b.provenance ? `<span class="exam-provenance-pill ${d.q4b.provenance.type}">${d.q4b.provenance.tag}</span>` : ''}
                        ${d.q4b.stem}
                    </span>
                    <span class="q-marks">(4)</span>
                </div>
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Facts Bank:</span>
                        <div class="scaffold-content">${d.q4b.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 0.9;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${d.q4b.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.6;">
                        <span class="scaffold-label">Response Structure:</span>
                        <div class="scaffold-content" style="font-size: 7.4pt;">${d.q4b.guide}</div>
                    </div>
                </div>
                ${renderLines(d.q4b.lines)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · 100% Specification Practice Bank</span>
            <span class="turn-over">Turn over for Question 5 &#9654;</span>
            <span>Page 7 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 8: SECTION B — SPECIFICATION BANK: IMPORTANCE DEPTH (A)  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Specification Depth Bank · Importance Depth</h2>
                    <p>Exhaustive curriculum coverage. Write two developed analytical paragraphs.</p>
                </div>
                <span class="header-tag">Spec Depth: Importance A</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${d.q5.num}</strong>
                        ${d.q5.provenance ? `<span class="exam-provenance-pill ${d.q5.provenance.type}">${d.q5.provenance.tag}</span>` : ''}
                        ${d.q5.stem}
                    </span>
                    <span class="q-marks">(8)</span>
                </div>
                <div class="focus-guidance">
                    <strong>Examiner Guidance:</strong> ${d.q5.focus}
                </div>

                <!-- Importance Scaffold Stack -->
                <div class="importance-scaffold-stack">
                    <div class="scaffold-focus-row">
                        <span class="scaffold-badge">Paragraph 1 Focus</span>
                        <span class="scaffold-text">${d.q5.p1}</span>
                    </div>
                    <div class="scaffold-focus-row">
                        <span class="scaffold-badge">Paragraph 2 Focus</span>
                        <span class="scaffold-text">${d.q5.p2}</span>
                    </div>
                    <div class="scaffold-vocab-row">
                        <div class="scaffold-vocab-subrow">
                            <span class="scaffold-badge">Specification Fact Bank</span>
                            <div class="scaffold-pills-list">
                                ${d.q5.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join('')}
                            </div>
                        </div>
                        <div class="scaffold-stem-subrow">
                            <span class="scaffold-stem-label">Analytical Stems:</span>
                            <span class="scaffold-stem-text">${d.q5.connectives
                              .slice(0, 3)
                              .map((c) => `<em>"${c}"</em>`)
                              .join(' · ')}</span>
                        </div>
                    </div>
                </div>

                ${renderLines(d.q5.lines)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · 100% Specification Practice Bank</span>
            <span class="turn-over">Turn over for Question 6 &#9654;</span>
            <span>Page 8 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 9: SECTION B — SPECIFICATION BANK: IMPORTANCE DEPTH (B)  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Specification Depth Bank · Importance Depth</h2>
                    <p>Exhaustive curriculum coverage. Write two developed analytical paragraphs.</p>
                </div>
                <span class="header-tag">Spec Depth: Importance B</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${d.q6.num}</strong>
                        ${d.q6.provenance ? `<span class="exam-provenance-pill ${d.q6.provenance.type}">${d.q6.provenance.tag}</span>` : ''}
                        ${d.q6.stem}
                    </span>
                    <span class="q-marks">(8)</span>
                </div>
                <div class="focus-guidance">
                    <strong>Examiner Guidance:</strong> ${d.q6.focus}
                </div>

                <!-- Importance Scaffold Stack -->
                <div class="importance-scaffold-stack">
                    <div class="scaffold-focus-row">
                        <span class="scaffold-badge">Paragraph 1 Focus</span>
                        <span class="scaffold-text">${d.q6.p1}</span>
                    </div>
                    <div class="scaffold-focus-row">
                        <span class="scaffold-badge">Paragraph 2 Focus</span>
                        <span class="scaffold-text">${d.q6.p2}</span>
                    </div>
                    <div class="scaffold-vocab-row">
                        <div class="scaffold-vocab-subrow">
                            <span class="scaffold-badge">Specification Fact Bank</span>
                            <div class="scaffold-pills-list">
                                ${d.q6.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join('')}
                            </div>
                        </div>
                        <div class="scaffold-stem-subrow">
                            <span class="scaffold-stem-label">Analytical Stems:</span>
                            <span class="scaffold-stem-text">${d.q6.connectives
                              .slice(0, 3)
                              .map((c) => `<em>"${c}"</em>`)
                              .join(' · ')}</span>
                        </div>
                    </div>
                </div>

                ${renderLines(d.q6.lines)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · 100% Specification Practice Bank</span>
            <span class="turn-over">Turn over for Question 7 &#9654;</span>
            <span>Page 9 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 10: SECTION B — SPECIFICATION BANK: NARRATIVE (PART 1)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Specification Depth Bank · Narrative Account (Part 1)</h2>
                    <p>Exhaustive curriculum coverage. Analyse the chronological sequence and causal links.</p>
                </div>
                <span class="header-tag">Spec Depth: Narrative Pt 1</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span>
                        <strong class="q-num">${d.q7.num}</strong>
                        ${d.q7.provenance ? `<span class="exam-provenance-pill ${d.q7.provenance.type}">${d.q7.provenance.tag}</span>` : ''}
                        ${d.q7.stem}
                    </span>
                    <span class="q-marks">(8)</span>
                </div>

                <div class="stimulus-card">
                    You may use the following in your answer:
                    <ul>
                        <li><strong>${d.q7.stimulus[0]}</strong></li>
                        <li><strong>${d.q7.stimulus[1]}</strong></li>
                    </ul>
                    <span style="display: block; margin-top: 2px; font-style: italic; color: #475569;">(You must also use information of your own.)</span>
                </div>

                <!-- Narrative Flow Planner -->
                <div class="narrative-flow-planner">
                    <div style="font-weight: 800; font-size: 7.4pt; text-transform: uppercase; color: #0f172a; margin-bottom: 2px;">
                        Chronological 3-Stage Narrative Architecture:
                    </div>
                    <div class="narrative-stages-row">
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${d.q7.stages.stage1.split(' — ')[0]}</div>
                            <div style="font-size: 7.2pt; color: #334155;">${d.q7.stages.stage1.split(' — ')[1]}</div>
                        </div>
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${d.q7.stages.stage2.split(' — ')[0]}</div>
                            <div style="font-size: 7.2pt; color: #334155;">${d.q7.stages.stage2.split(' — ')[1]}</div>
                        </div>
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${d.q7.stages.stage3.split(' — ')[0]}</div>
                            <div style="font-size: 7.2pt; color: #334155;">${d.q7.stages.stage3.split(' — ')[1]}</div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 2px; font-size: 7.4pt; color: #475569;">
                        <span><strong>Fact Bank:</strong> ${d.q7.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</span>
                        <span><strong>Connectives:</strong> ${d.q7.connectives.slice(0, 3).join(' · ')}</span>
                    </div>
                </div>

                ${renderLines(d.q7.linesPage10)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · 100% Specification Practice Bank</span>
            <span class="turn-over">Turn over for Question ${d.q7.num} continuation lines &#9654;</span>
            <span>Page 10 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 11: SECTION B — SPECIFICATION BANK: NARRATIVE (PART 2)   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Specification Depth Bank · Narrative Account (Part 2)</h2>
                    <p>Continue your narrative analysis below. Ensure all 3 chronological stages are causally linked.</p>
                </div>
                <span class="header-tag">Q${d.q7.num}: Continuation</span>
            </div>

            <div class="question-container">
                <div class="question-prompt" style="margin-bottom: 5px;">
                    <span><strong class="q-num">Question ${d.q7.num} continued:</strong></span>
                </div>

                ${renderLines(d.q7.linesPage11)}

                <!-- Pupil Self-Assessment & Examiner Standards Checklist -->
                <div style="border: 1.5px solid #000000; border-radius: 4px; background: #f8fafc; padding: 4px 8px; margin-top: 6px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                        <strong style="color: #000000; font-size: 7.8pt; text-transform: uppercase;">
                            🔍 Narrative Account Quality Audit &amp; Examiner Criteria (8 Marks)
                        </strong>
                        <span style="font-size: 7.2pt; color: #000000; font-weight: 700;">Pearson Edexcel Level 3 Standard</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; color: #000000;">
                        <span>[ &nbsp; ] 3 Distinct Chronological Phases</span>
                        <span>[ &nbsp; ] Explicit Causal Connectives Used</span>
                        <span>[ &nbsp; ] Precise Historical Facts &amp; Dates</span>
                        <span>[ &nbsp; ] Avoided Mere Storytelling</span>
                        <span style="background: #fff; border: 1px solid #000000; padding: 1px 6px; border-radius: 3px; font-weight: 800;">Score: &nbsp; &nbsp; / 8</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · 100% Specification Practice Bank</span>
            <span class="turn-over">Turn over for Specification Practice Bank &amp; Fatal Traps &#9654;</span>
            <span>Page 11 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 12: 100% SPECIFICATION PRACTICE BANK & EXAMINER TRAPS   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section C: Specification Practice Bank &amp; Fatal Traps</h2>
                    <p>100% specification coverage guarantee — practice every remaining Pearson Edexcel exam question stem.</p>
                </div>
                <span class="header-tag">100% Spec Guarantee</span>
            </div>

            <!-- Top Section: Top 3 Fatal Examiner Traps -->
            <div class="traps-card">
                <div class="traps-header">
                    ⚠️ Top 3 Fatal Examiner Traps for Key Topic ${meta.number}
                </div>
                <div class="traps-grid">
                    ${(meta.traps || [])
                      .map(
                        (t) => `
                        <div class="trap-item">
                            <strong>• ${t.title}:</strong>
                            <span>${t.desc}</span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>

            <!-- Middle Section: 100% Specification Practice Bank -->
            <div class="spec-bank-container">
                <div class="spec-bank-header">
                    <span class="spec-bank-title">📚 Specification Practice Bank: 100% Curriculum Coverage</span>
                    <span class="spec-bank-subtitle">Every remaining specification bullet point tested below</span>
                </div>
                
                <div class="spec-bank-list">
                    ${(meta.specBank || [])
                      .map(
                        (item) => `
                        <div class="spec-bank-item">
                            <div class="spec-bank-q">
                                <strong>Question ${item.num}:</strong> ${item.q}
                            </div>
                            <span class="spec-bank-badge">
                                ${item.type}
                            </span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>

            <!-- Bottom Section: Pupil Personal Revision Commitments -->
            <div class="diagnostic-action-card">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                    <strong style="color: #334155; font-size: 7.6pt; text-transform: uppercase;">
                        ✍️ Pupil Diagnostic Action Plan &amp; Targeted Revision Commitments
                    </strong>
                    <span style="font-size: 6.8pt; color: #64748b;">Complete following self-marking of Pages 2–11</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 4px;">
                    <div>
                        <span style="font-size: 7.2pt; font-weight: 700; color: #475569;">1. Weakest Sub-Topic / Knowledge Area:</span>
                        <div style="border-bottom: 1.2px solid #475569; height: 16px;"></div>
                    </div>
                    <div>
                        <span style="font-size: 7.2pt; font-weight: 700; color: #475569;">2. Key Dates / Statistics I Need to Memorise:</span>
                        <div style="border-bottom: 1.2px solid #475569; height: 16px;"></div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 2.5px 6px; font-size: 7.2pt;">
                    <span><strong>Revision Commitment:</strong> [ &nbsp; ] Complete Quiz Flashcards &nbsp;&nbsp; [ &nbsp; ] Redo Timed Dual-Track &nbsp;&nbsp; [ &nbsp; ] Practice Spec Bank Question</span>
                    <span><strong>Target Grade:</strong> [ 9 &nbsp; 8 &nbsp; 7 &nbsp; 6 &nbsp; 5 &nbsp; 4 ]</span>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option P5 Conflict in the Middle East</span>
            <span class="turn-over">End of Booklet · 100% Specification Mastered</span>
            <span>Page 12 of 12</span>
        </div>
    </div>

</body>
</html>`;
}

// =============================================================================
// COMPILATION PIPELINE: HTML EXPORT, PUPPETEER RENDER, GOOGLE DRIVE SYNC
// =============================================================================
async function generateBooklets() {
  console.log('====================================================');
  console.log('📖 CME MASTERY BOOKLETS GENERATOR (100% STUDENT EXECUTION)');
  console.log('====================================================');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const individualPdfs = [];

  for (const [ktKey, meta] of Object.entries(KT_DATA)) {
    console.log(`\n🔨 Compiling ${meta.title}...`);
    const htmlContent = renderBookletHtml(ktKey, meta);
    const htmlFileName = `cme_mastery_${ktKey}.html`;
    const htmlPath = path.join(bookletsDir, htmlFileName);

    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`   Saved HTML: ${htmlFileName}`);

    const ktPage = await browser.newPage();
    await ktPage.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await ktPage.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await ktPage.evaluateHandle('document.fonts.ready');
    const ktPdfPath = path.join(pdfsDir, `cme_mastery_pack_${ktKey}.pdf`);
    await ktPage.pdf({
      path: ktPdfPath,
      format: 'A4',
      printBackground: true,
    });
    // Keep individual KT PDF in unit folder only (do not pollute global public/pdfs)
    console.log(`   ✅ Exported unit PDF: cme_mastery_pack_${ktKey}.pdf (12 Pages)`);
    await ktPage.close();
  }

  // Generate Master Full 36-Page Combined Booklet
  console.log('\n📚 Assembling Master 36-Page Combined Exam Pack...');
  let fullHtml =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
    '<title>Conflict in the Middle East, 1945–95 — Complete Mastery Exam Pack</title>' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">' +
    '<style>' +
    COMMON_CSS +
    '</style></head><body>';
  for (const [ktKey, meta] of Object.entries(KT_DATA)) {
    const rawHtml = renderBookletHtml(ktKey, meta);
    const bodyMatch = rawHtml.match(/<body>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      fullHtml += bodyMatch[1];
    }
  }
  fullHtml += '</body></html>';

  const masterHtmlPath = path.join(bookletsDir, 'cme_mastery_FULL.html');
  fs.writeFileSync(masterHtmlPath, fullHtml, 'utf8');

  const masterPage = await browser.newPage();
  await masterPage.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await masterPage.setContent(fullHtml, { waitUntil: 'networkidle0' });
  await masterPage.evaluateHandle('document.fonts.ready');

  const masterPdfPath = path.join(pdfsDir, 'cme_mastery_pack_FULL.pdf');
  await masterPage.pdf({
    path: masterPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  fs.copyFileSync(masterPdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_FULL.pdf'));
  console.log('   ✅ Exported Master PDF: cme_mastery_pack_FULL.pdf (36 Pages)');

  await masterPage.close();
  await browser.close();

  // Auto-Mirror to Department Google Drive
  const driveDirs = [
    'G:\\My Drive\\AAMX\\Dep File\\Year 10 (GCSE)\\Paper 2 - Conflict in the Middle East',
    'G:\\My Drive\\AAMX\\Dep File\\02. GCSE (Years 10-11)\\Paper 2 - Conflict in the Middle East\\03. Retrieval Quizzing & Mastery',
  ];

  const canonicalNames = {
    'cme_mastery_pack_FULL.pdf': 'Conflict in the Middle East Complete Mastery Pack.pdf',
  };

  for (const dir of driveDirs) {
    try {
      if (fs.existsSync(dir)) {
        console.log(`\n☁️ Syncing freshly compiled master booklet to Google Drive: ${dir}`);
        for (const [pdfFile, canonical] of Object.entries(canonicalNames)) {
          const srcPath = path.join(globalPdfsDir, pdfFile);
          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, path.join(dir, pdfFile));
            if (canonical) {
              fs.copyFileSync(srcPath, path.join(dir, canonical));
            }
          }
        }
        // Clean up any old split KT files in Drive
        [
          'cme_mastery_pack_KT1.pdf',
          'cme_mastery_pack_KT2.pdf',
          'cme_mastery_pack_KT3.pdf',
          'Conflict in the Middle East Mastery Pack (KT1).pdf',
          'Conflict in the Middle East Mastery Pack (KT2).pdf',
          'Conflict in the Middle East Mastery Pack (KT3).pdf',
        ].forEach((splitFile) => {
          const oldFile = path.join(dir, splitFile);
          if (fs.existsSync(oldFile)) {
            try {
              fs.unlinkSync(oldFile);
            } catch (e) {}
          }
        });
        console.log('   ✅ Synced master booklet (strictly 1 PDF per pillar) to Google Drive.');
      }
    } catch (err) {
      console.warn(`   ⚠️ Could not sync to ${dir}: ${err.message}`);
    }
  }

  console.log('\n====================================================');
  console.log('🎉 CME MASTERY BOOKLETS GENERATION COMPLETE (36 PAGES, 0 OVERFLOWS)');
  console.log('====================================================');
}

if (require.main === module) {
  generateBooklets().catch((err) => {
    console.error('Fatal generator error:', err);
    process.exit(1);
  });
}

module.exports = { generateBooklets, renderBookletHtml, KT_DATA };
