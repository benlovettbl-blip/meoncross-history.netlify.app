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
// COMPREHENSIVE CURRICULUM DATA: KT1, KT2, KT3 WITH RICH SPECIFICATION SCAFFOLDING
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
        lines: 8,
        vocabBank: [
          '22 July 1946',
          'Irgun militants',
          'Menachem Begin',
          '91 casualties',
          'British Secretariat',
        ],
        connectives: [
          'One direct consequence was...',
          'This meant that...',
          'Consequently, this led to...',
        ],
        guide:
          'Identify one consequence &rarr; Support with precise historical facts &rarr; Explain how this forced Britain to refer the mandate to the UN.',
      },
      q1b: {
        num: '1 (b)',
        stem: 'Explain one consequence of the Israeli attacks on Gaza in 1955.',
        marks: 4,
        lines: 8,
        vocabBank: [
          '28 February 1955',
          'Fedayeen raids',
          'Ariel Sharon',
          '38 Egyptian soldiers',
          'Czech Arms Deal',
        ],
        connectives: [
          'As a consequence, ...',
          'This action provoked...',
          'This directly resulted in...',
        ],
        guide:
          'Identify one consequence &rarr; Support with precise facts &rarr; Explain how this humiliated Nasser and triggered the Czech Arms Deal.',
      },
      q2: {
        num: '2',
        stem: 'Write a narrative account analysing the key events of the Arab-Israeli war (1948–49).',
        marks: 8,
        stimulus: ['The invasion by Arab armies (May 1948)', 'The June 1948 truce'],
        linesPage3: 11,
        linesPage4: 22,
        vocabBank: [
          '14 May Declaration',
          'Arab Legion & Jerusalem',
          'UN 4-Week Truce',
          'Czech Avia S-199s',
          'Operation Yoav',
          '1949 Green Line Armistices',
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
            'Stage 1: Outbreak & Arab Invasion (May 1948) — 5 Arab armies invade; Jerusalem besieged',
          stage2:
            'Stage 2: Turning Point & UN Truce (June 1948) — Ben-Gurion unifies IDF; Czech arms imported',
          stage3:
            'Stage 3: Counter-Offensives & Armistice (1949) — IDF secures 79% territory; 700,000 refugees',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Explain the importance of UN Resolution 181 for the creation of Israel.',
        marks: 8,
        focus:
          'Explain why the resolution was important for providing international legal legitimacy and securing immediate diplomatic recognition for the sovereign state.',
        lines: 16,
        vocabBank: [
          '29 Nov 1947 vote',
          'UN General Assembly',
          '55% territory allocation',
          'Two-thirds majority',
          'Truman & Soviet recognition',
        ],
        connectives: [
          'This was vital because...',
          'Furthermore, ...',
          'Without this international mandate, ...',
          'This directly enabled...',
        ],
        p1: 'International Legal Legitimacy: Explain how Res 181 gave Jewish leaders recognised authority to proclaim a state without being branded an illegal rebellion.',
        p2: 'Superpower Recognition: Explain how the vote secured immediate US/Soviet diplomatic recognition and Czechoslovak arms shipments.',
      },
      q3b: {
        num: '3 (b)',
        stem: 'Explain the importance of the creation of the Israeli Defence Forces (IDF) for the aftermath of the 1948–49 war.',
        marks: 8,
        focus:
          'Explain why unifying rival paramilitary militias under centralized government command was important for political stability and permanent defense.',
        lines: 16,
        vocabBank: [
          'David Ben-Gurion',
          'Order No. 4 (May 1948)',
          'Dissolution of Haganah, Irgun, Lehi',
          'Altalena affair',
          'Unified command',
        ],
        connectives: [
          'This was important because...',
          'Consequently, ...',
          'In addition, ...',
          'This ensured that...',
        ],
        p1: 'Centralised Command: Explain why disbanding independent political militias prevented civil war and unified national defense under cabinet control.',
        p2: 'Permanent Border Security: Explain how the standing army established deterrence and fortified settlements against persistent Arab non-recognition.',
      },
    },
    depthBank: {
      q4a: {
        num: '4 (a)',
        stem: 'Explain one consequence of the territorial changes resulting from the 1948–49 war.',
        marks: 4,
        lines: 8,
        vocabBank: [
          '1949 Green Line',
          '79% of Palestine',
          'Gaza Strip to Egypt',
          'West Bank to Jordan',
          'Divided Jerusalem',
        ],
        connectives: ['One consequence was...', 'This directly caused...', 'As a result, ...'],
        guide:
          'Identify territorial shift &rarr; Give specific facts (79% vs 55% UN partition) &rarr; Explain permanent loss of an independent Palestinian Arab state.',
      },
      q4b: {
        num: '4 (b)',
        stem: 'Explain one consequence of the formation of the United Arab Republic (UAR) in 1958.',
        marks: 4,
        lines: 8,
        vocabBank: [
          'Gamal Abdel Nasser',
          'Egypt-Syria political union',
          'Pan-Arabism',
          'Encirclement of Israel',
          'Regional destabilisation',
        ],
        connectives: ['One consequence was...', 'This meant that...', 'Consequently, ...'],
        guide:
          'Identify regional impact &rarr; Give precise facts &rarr; Explain how merging Egypt and Syria heightened Israeli fears of hostile encirclement.',
      },
      q5: {
        num: '5',
        stem: 'Explain the importance of the refugee status of Palestinian Arabs for relations between Israel and Arab states after 1949.',
        marks: 8,
        focus:
          'Explain how the displacement of 700,000 refugees and the refusal of Arab states to permit permanent resettlement entrenched regional hostility.',
        lines: 16,
        vocabBank: [
          '700,000 displaced (Nakba)',
          'Right of Return (UN Res 194)',
          'UNRWA border camps',
          'Fedayeen guerrilla raids',
          'Arab boycott of peace',
        ],
        connectives: [
          'This was important because...',
          'Furthermore, ...',
          'This directly hardened attitudes by...',
          'As a consequence, ...',
        ],
        p1: 'Entrenched Diplomatic Hostility: Explain how the refugee camps became enduring political symbols preventing Arab states from formally recognizing Israel.',
        p2: 'Cycle of Border Violence: Explain how displaced refugees formed fedayeen guerrilla cells, launching raids that prompted devastating Israeli military reprisals.',
      },
      q6: {
        num: '6',
        stem: 'Explain the importance of US aid to Israel in the period 1949–1963.',
        marks: 8,
        focus:
          'Explain how American financial loans and diplomatic backing enabled the fledgling state to absorb mass immigration and build sovereign infrastructure.',
        lines: 16,
        vocabBank: [
          'Export-Import Bank loans',
          'PL 480 food aid',
          'Mass immigration absorption (1m)',
          'National Water Carrier',
          'Hawk surface-to-air missiles (1962)',
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
        stimulus: [
          'Nationalisation of the Suez Canal (July 1956)',
          'British and French military intervention',
        ],
        lines: 14,
        vocabBank: [
          'Aswan Dam loan cancellation',
          'Nasser 26 July speech',
          'Secret Protocol of Sèvres',
          'Israeli Sinai invasion',
          'Port Said landings',
          'Eisenhower financial ultimatum',
        ],
        connectives: [
          'The crisis began when...',
          'In response, Britain and France...',
          'A decisive military escalation occurred when...',
          'However, the situation reversed when...',
          'Ultimately, this resulted in...',
        ],
        stages: {
          stage1:
            'Stage 1: Outbreak & Catalyst (July 1956) — US cancels Aswan funding; Nasser nationalises Suez Canal',
          stage2:
            'Stage 2: Collusion & Invasion (Oct–Nov 1956) — Secret Sèvres pact; Israel invades Sinai; Anglo-French assault',
          stage3:
            'Stage 3: Superpower Intervention & Defeat (Nov 1956) — Eisenhower forces allied retreat; Nasser elevated to Pan-Arab hero',
        },
      },
    },
    exemplars: {
      consequence: {
        stem: 'Explain one consequence of the bombing of the King David Hotel (1946).',
        marks: 4,
        model:
          'One consequence of the bombing of the King David Hotel was that it shattered British political and domestic resolve to maintain the Palestine Mandate. On 22 July 1946, Irgun militants disguised as milkmen detonated explosives in the basement, killing 91 British, Arab, and Jewish administrative staff and destroying the British military secretariat. This was significant because it forced Prime Minister Clement Attlee’s cabinet to conclude that keeping 100,000 troops in Palestine amid an escalating guerrilla insurgency was financially and militarily unsustainable, directly prompting Britain in February 1947 to announce its withdrawal and refer the problem to the United Nations.',
        examiner:
          'Level 2 (4 Marks): Precise point identified in sentence 1; detailed historical facts (22 July 1946, 91 killed, Attlee cabinet, 100,000 troops); sustained causal explanation of why this led to the British referral to the UN.',
      },
      importance: {
        stem: 'Explain the importance of UN Resolution 181 for the creation of Israel.',
        marks: 8,
        modelP1:
          'UN Resolution 181 was important for the creation of Israel because it provided essential international legal legitimacy for sovereign Jewish statehood. Passed by a two-thirds majority in the United Nations General Assembly on 29 November 1947, the resolution voted to terminate the British Mandate and partition Palestine into independent Arab and Jewish states, allocating 55% of the territory to the Jewish state despite them forming only a third of the population. This international mandate was vital because it granted Jewish leaders the recognized diplomatic authority to establish a sovereign government without being dismissed as an illegal rebellion.',
        modelP2:
          'Furthermore, Resolution 181 was critical because it enabled David Ben-Gurion to formally proclaim the State of Israel on 14 May 1948 and immediately secure superpower recognition. Within hours of the declaration, both the United States under President Truman and the Soviet Union granted de facto recognition to the new nation based directly on the UN partition vote. Without this international legal foundation, Israel would have lacked the diplomatic backing required to establish formal foreign relations and secure emergency Czech arms shipments during the subsequent 1948–49 war.',
        examiner:
          'Level 3 (8 Marks): Two fully developed explanations; precise AO1 evidence (29 Nov 1947, 55% territory, 14 May 1948, Truman recognition); sustained analytical focus on statehood creation.',
      },
      narrative: {
        stem: 'Write a narrative account analysing the key events of the Arab-Israeli war (1948–49).',
        stimulus: ['The invasion by Arab armies (May 1948)', 'The June 1948 truce'],
        marks: 8,
        modelP1:
          'The Arab-Israeli War began immediately following the proclamation of the State of Israel on 14 May 1948. On 15 May, regular armies from Egypt, Transjordan, Syria, Lebanon, and Iraq invaded simultaneously. In the opening weeks, Arab forces achieved significant gains: Transjordan’s Arab Legion captured East Jerusalem and besieged 100,000 Jewish residents in the New City, while Egyptian armoured columns advanced to within 20 miles of Tel Aviv. At this initial stage, the fledgling Israeli state faced imminent military collapse due to severe shortages of heavy artillery and combat aircraft.',
        modelP2:
          'A decisive turning point occurred on 11 June 1948 when the United Nations brokered a four-week truce. David Ben-Gurion exploited this breathing space to centralize command, dissolving rival paramilitary groups (Haganah, Irgun, and Lehi) into the unified Israeli Defence Forces (IDF) under Order No. 4. Furthermore, Israel covertly imported modern rifles, artillery, and Avia S-199 fighter aircraft from Czechoslovakia. Consequently, when fighting resumed in July (the "Ten Days"), the IDF possessed a decisive tactical advantage in firepower, air control, and coordinated leadership.',
        modelP3:
          'This organizational superiority directly enabled the IDF to launch devastating autumn counter-offensives. Operation Yoav broke the Egyptian blockade in the Negev, while Operation Hiram cleared the Galilee in the north. The fighting concluded with the 1949 Armistice Agreements (the Green Line), which left Israel in control of 79% of Mandatory Palestine—far exceeding the original 55% UN partition boundary. This outcome secured Israeli sovereign survival but displaced over 700,000 Palestinian Arabs into permanent refugee status (the Nakba).',
        examiner:
          'Level 3 (8 Marks): Seamless 3-stage chronological narrative; explicit causal connectives explaining how the June truce unlocked autumn counter-offensives; rich historical knowledge (Operation Yoav, Avia S-199s, Green Line).',
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
          desc: 'Britain and France achieved military victory in capturing Port Said in November 1956, but suffered a catastrophic political defeat when US President Eisenhower threatened financial sanctions, forcing an immediate withdrawal and elevating Nasser into a Pan-Arab hero.',
        },
      ],
    },
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
          topic: 'UN Partition Plan (Resolution 181) for Statehood',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Importance',
          topic: 'Creation of Israeli Defence Forces (IDF) after 1949',
          page: 'P6',
          marks: 8,
        },
      ],
      sectionB: [
        {
          q: '4 (a)',
          type: 'Consequence',
          topic: 'Territorial Changes of the 1948–49 Armistices',
          page: 'P7',
          marks: 4,
        },
        {
          q: '4 (b)',
          type: 'Consequence',
          topic: 'Formation of the United Arab Republic (1958)',
          page: 'P7',
          marks: 4,
        },
        {
          q: '5',
          type: 'Importance',
          topic: 'Palestinian Refugee Problem (1948–56) & Relations',
          page: 'P8',
          marks: 8,
        },
        {
          q: '6',
          type: 'Importance',
          topic: 'US Financial & Diplomatic Aid to Israel (1949–63)',
          page: 'P9',
          marks: 8,
        },
        {
          q: '7',
          type: 'Narrative',
          topic: 'Escalation to Outbreak of the Suez Crisis (1956)',
          page: 'P10',
          marks: 8,
        },
      ],
      sectionC: [
        {
          q: 'Ref',
          type: 'Exemplars',
          topic: 'Grade 8/9 Level 3 Models (Q1, Q2, Q3) & Top 3 Pitfalls',
          page: 'P11–12',
          marks: 'Audit',
        },
      ],
    },
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
        stem: 'Explain one consequence of the events of 7 April 1967 for escalating tension between Israel and Syria.',
        marks: 4,
        lines: 8,
        vocabBank: [
          'Demilitarised zones (DMZ)',
          'Tractor farming disputes',
          'Golan Heights artillery',
          '6 Syrian MiG-21s downed',
          'Flyover above Damascus',
        ],
        connectives: [
          'One direct consequence was...',
          'This escalated tensions because...',
          'Consequently, this led to...',
        ],
        guide:
          'Identify one consequence &rarr; Support with precise facts (6 MiGs shot down, Damascus flyover) &rarr; Explain how this humiliated Syria and pushed Nasser into Sinai.',
      },
      q1b: {
        num: '1 (b)',
        stem: 'Explain one consequence of the expulsion of the PLO from Jordan (1970).',
        marks: 4,
        lines: 8,
        vocabBank: [
          'Black September 1970',
          'King Hussein & Jordanian Army',
          'Dawson’s Field hijackings',
          'Relocation to Southern Lebanon',
          'Fatahland enclave',
        ],
        connectives: [
          'As a direct result, ...',
          'This meant that...',
          'Consequently, this directly led to...',
        ],
        guide:
          'Identify one consequence &rarr; Support with precise facts (Amman crackdown, move to Lebanon) &rarr; Explain how this created a new border front against northern Israel.',
      },
      q2: {
        num: '2',
        stem: 'Write a narrative account analysing the key events of the Six Day War (1967).',
        marks: 8,
        stimulus: [
          'Air attacks on Egyptian airfields (5 June 1967)',
          'The capture of East Jerusalem (7 June)',
        ],
        linesPage3: 11,
        linesPage4: 22,
        vocabBank: [
          'Operation Focus (7:45 am)',
          '300+ aircraft destroyed',
          'Total air supremacy',
          'Sinai armoured offensive',
          'Motta Gur & Western Wall',
          'Golan Heights capture (9–10 June)',
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
        focus:
          'Explain why the "land for peace" formula and its deliberate linguistic ambiguity dictated all subsequent diplomatic negotiations.',
        lines: 16,
        vocabBank: [
          '22 November 1967',
          'UN Security Council',
          '"Land for peace" formula',
          'Deliberate ambiguity ("territories occupied")',
          'Rejection by PLO as "refugees"',
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
        focus:
          'Explain how establishing a pan-Arab institutional framework provided the platform that Yasser Arafat’s guerrilla movement subsequently took over.',
        lines: 16,
        vocabBank: [
          'Arab League summit',
          'Gamal Abdel Nasser',
          'Creation of PLO (1964)',
          'Ahmad Shukeiri',
          'Yasser Arafat & Fatah takeover (1969)',
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
        stem: 'Explain one consequence of Israel’s raid on Samu (1966) for tension between Israel and Jordan.',
        marks: 4,
        lines: 8,
        vocabBank: [
          '13 November 1966',
          'West Bank border village',
          'Fedayeen landmine reprisal',
          'Jordanian civilian & military casualties',
          'King Hussein defense pact with Egypt',
        ],
        connectives: ['One consequence was...', 'This directly caused...', 'Consequently, ...'],
        guide:
          'Identify consequence &rarr; Support with facts &rarr; Explain how attacking Jordan alienated King Hussein and pushed him into a mutual defense pact with Nasser.',
      },
      q4b: {
        num: '4 (b)',
        stem: 'Explain one consequence of the Black September attack at the Munich Olympics (1972) for international attitudes towards the Palestine issue.',
        marks: 4,
        lines: 8,
        vocabBank: [
          '5 September 1972',
          'Black September faction',
          '11 Israeli athletes murdered',
          'Televised global audience (900m)',
          'Operation Wrath of God (Mossad)',
        ],
        connectives: ['One consequence was...', 'This meant that...', 'As a result, ...'],
        guide:
          'Identify consequence &rarr; Support with facts &rarr; Explain how Munich horrified Western publics while thrusting Palestinian national grievances onto the world stage.',
      },
      q5: {
        num: '5',
        stem: 'Explain the importance of the occupied territories (Golan Heights, West Bank, Sinai) for Israeli security after 1967.',
        marks: 8,
        focus:
          'Explain how strategic depth provided military buffer zones while creating permanent administrative, legal, and demographic burdens.',
        lines: 16,
        vocabBank: [
          'Sinai strategic buffer (130 miles)',
          'Golan Heights artillery high ground',
          'West Bank border along Jordan River',
          'Bar-Lev Line fortifications',
          '1 million Palestinian demographic burden',
        ],
        connectives: [
          'This was important for security because...',
          'On the other hand, ...',
          'Furthermore, ...',
          'This directly created...',
        ],
        p1: 'Strategic Military Buffer: Explain how holding Sinai and the Golan Heights provided essential warning time and removed Syrian artillery from Israeli towns.',
        p2: 'Internal Security Dilemma: Explain how occupying one million Palestinians created permanent internal unrest, international condemnation, and policing burdens.',
      },
      q6: {
        num: '6',
        stem: 'Explain the importance of Egyptian relations with the USSR between 1967 and 1973.',
        marks: 8,
        focus:
          'Explain how Soviet surface-to-air missile umbrellas and advanced armour enabled Egypt to plan and execute military operations in 1973.',
        lines: 16,
        vocabBank: [
          'Resupply of MiG-21s & T-55/62 tanks',
          'SAM missile umbrellas (SAM-2, 3, 6)',
          '15,000 Soviet military advisers',
          'War of Attrition (1969–70)',
          'Expulsion of Soviet advisers by Sadat (1972)',
        ],
        connectives: [
          'This relationship was vital because...',
          'Furthermore, ...',
          'Without Soviet weaponry, ...',
          'This directly enabled...',
        ],
        p1: 'Rebuilding Military Hardware: Explain how Soviet arms shipments completely replaced Egypt’s destroyed military equipment following the 1967 disaster.',
        p2: 'The SAM Air Defence Umbrella: Explain how advanced Soviet anti-aircraft missiles neutralized the Israeli Air Force over the Suez Canal, making the 1973 offensive possible.',
      },
      q7: {
        num: '7',
        stem: 'Write a narrative account analysing the key events of the Yom Kippur War (1973).',
        marks: 8,
        stimulus: [
          'The Arab surprise attack (October 1973)',
          'Israeli counter-attacks across the Suez Canal',
        ],
        lines: 14,
        vocabBank: [
          '6 October 1973 (Yom Kippur)',
          'Suez water-cannons & SAM shield',
          'Bar-Lev Line overrun',
          'Golan Heights tank battles',
          'Sharon’s canal crossing (Deversoir)',
          'OPEC oil embargo & UN Res 338',
        ],
        connectives: [
          'The war erupted when...',
          'In the opening 48 hours, ...',
          'However, the strategic momentum shifted when...',
          'Following this, ...',
          'By the ceasefire, ...',
        ],
        stages: {
          stage1:
            'Stage 1: Coordinated Surprise Attack (6 Oct 1973) — Egyptian forces cross Suez under SAM shield; Syrian armour assaults Golan',
          stage2:
            'Stage 2: Critical Defence & Counter-Blows (7–14 Oct 1973) — IDF reserves halt Syrian breakthrough; US Operation Nickel Grass airlift arrives',
          stage3:
            'Stage 3: Canal Crossing & Ceasefire (15–24 Oct 1973) — Sharon breaches canal, encircles Egyptian 3rd Army; UN ceasefire enforced',
        },
      },
    },
    exemplars: {
      consequence: {
        stem: 'Explain one consequence of the expulsion of the PLO from Jordan (1970).',
        marks: 4,
        model:
          'One consequence of the expulsion of the PLO from Jordan in 1970 was that it forced Palestinian guerrilla factions to relocate their main military and political headquarters to Southern Lebanon. Following King Hussein’s violent crackdown during Black September (1970), which killed several thousand fedayeen, Yasser Arafat and the PLO were expelled from Amman. In Lebanon, the PLO established an autonomous armed enclave along Israel’s northern frontier. This directly triggered frequent cross-border rocket strikes and raids into northern Israel, provoking regular Israeli artillery reprisals and ultimately prompting Israel’s 1982 invasion of Lebanon.',
        examiner:
          'Level 2 (4 Marks): Precise focus on the consequence (relocation to Lebanon and creation of border enclave); specific factual details (Black September, Amman, cross-border raids, 1982 invasion).',
      },
      importance: {
        stem: 'Explain the importance of UN Resolution 242 for the aftermath of the 1967 war.',
        marks: 8,
        modelP1:
          'UN Resolution 242 was important for the aftermath of the 1967 war because it established the fundamental "land for peace" diplomatic formula that framed all subsequent Middle East negotiations. Adopted unanimously by the UN Security Council on 22 November 1967, it called for the withdrawal of Israeli armed forces from territories occupied during the conflict in return for the termination of belligerency and the acknowledgement of every state’s right to live in peace within secure, recognized borders. This provided the first universally accepted legal compromise between Arab demands for land return and Israeli demands for permanent recognition.',
        modelP2:
          'Furthermore, Resolution 242 was important because its deliberate linguistic ambiguity dictated decades of regional diplomacy. The English text called for withdrawal from "territories occupied" rather than "THE territories occupied", allowing Israel to insist that it was not required to surrender all the land captured in 1967 (such as East Jerusalem and the Golan Heights). While the PLO initially rejected the resolution because it treated Palestinians merely as "refugees", Resolution 242 served as the mandatory foundation for the 1978 Camp David Accords, the 1979 Treaty of Washington, and the 1993 Oslo Accords.',
        examiner:
          'Level 3 (8 Marks): Two fully developed paragraphs; clear analysis of "land for peace" and linguistic ambiguity; precise knowledge (22 Nov 1967, Camp David, English drafting).',
      },
      narrative: {
        stem: 'Write a narrative account analysing the key events of the Six Day War (1967).',
        stimulus: [
          'Air attacks on Egyptian airfields (5 June 1967)',
          'The capture of East Jerusalem (7 June)',
        ],
        marks: 8,
        modelP1:
          'The Six Day War began at 7:45 am on 5 June 1967 when Israel launched Operation Focus, a pre-emptive airstrike against Egyptian airbases. Flying below Egyptian radar across the Mediterranean, the Israeli Air Force caught the Egyptian air force completely by surprise, destroying over 300 combat aircraft on the runway within three hours and disabling runways with specialized penetration bombs. This instantaneous destruction of Egyptian airpower established total Israeli air supremacy from the opening morning, leaving Arab ground forces without air support.',
        modelP2:
          'With aerial supremacy secured, Israeli ground forces executed rapid multi-front offensives. In the south, three armoured divisions under Sharon and Tal smashed through Egyptian defenses in Sinai, racing to block the Mitla Pass and reaching the Suez Canal by 8 June. Meanwhile, after King Hussein opened artillery fire on West Jerusalem under false Egyptian reports of victory, Israeli paratroopers under Motta Gur counter-attacked into East Jerusalem, capturing the Old City and the Western Wall on 7 June while clearing Jordanian forces from the entire West Bank.',
        modelP3:
          'Following victory on the southern and central fronts, the IDF turned against Syria on 9 June. Israeli brigades scaled the heavily fortified Golan Heights escarpment under intense artillery fire, capturing the strategic high ground overlooking the Sea of Galilee. By the time a UN ceasefire took effect on 10 June, Israel had shattered three Arab armies in six days and quadrupled its territory, bringing one million Palestinian Arabs under military rule in Sinai, Gaza, the West Bank, East Jerusalem, and the Golan Heights.',
        examiner:
          'Level 3 (8 Marks): 3-stage causal narrative covering air strikes, multi-front advance, and the Golan climax; explicit causal links; integration of both stimulus points with rich tactical knowledge.',
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
    },
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
          topic: 'Expulsion of the PLO from Jordan / Black September (1970)',
          page: 'P2',
          marks: 4,
        },
        {
          q: '2',
          type: 'Narrative',
          topic: 'Key Military Operations of the Six Day War (1967)',
          page: 'P3–4',
          marks: 8,
        },
        {
          q: '3 (a)',
          type: 'Importance',
          topic: 'UN Resolution 242 ("Land for Peace" Formula)',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Importance',
          topic: 'Cairo Conference (1964) for Fatah & Rise of PLO',
          page: 'P6',
          marks: 8,
        },
      ],
      sectionB: [
        {
          q: '4 (a)',
          type: 'Consequence',
          topic: 'Israeli Raid on the Jordanian Village of Samu (1966)',
          page: 'P7',
          marks: 4,
        },
        {
          q: '4 (b)',
          type: 'Consequence',
          topic: 'Munich Olympics Terrorist Attack by Black September (1972)',
          page: 'P7',
          marks: 4,
        },
        {
          q: '5',
          type: 'Importance',
          topic: 'Occupied Territories (Golan, West Bank, Sinai) for Security',
          page: 'P8',
          marks: 8,
        },
        {
          q: '6',
          type: 'Importance',
          topic: 'Egyptian Military Relations with the USSR (1967–73)',
          page: 'P9',
          marks: 8,
        },
        {
          q: '7',
          type: 'Narrative',
          topic: 'Key Military Events of the Yom Kippur War (1973)',
          page: 'P10',
          marks: 8,
        },
      ],
      sectionC: [
        {
          q: 'Ref',
          type: 'Exemplars',
          topic: 'Grade 8/9 Level 3 Models (Q1, Q2, Q3) & Top 3 Pitfalls',
          page: 'P11–12',
          marks: 'Audit',
        },
      ],
    },
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
        stem: 'Explain one consequence of the Treaty of Washington (1979) for Egyptian relations with other Arab states.',
        marks: 4,
        lines: 8,
        vocabBank: [
          '26 March 1979',
          'Anwar Sadat & Menachem Begin',
          'Arab League suspension of Egypt',
          'Move of HQ to Tunis',
          'Severing of diplomatic ties',
        ],
        connectives: [
          'One direct consequence was...',
          'This meant that...',
          'Consequently, Egypt faced...',
        ],
        guide:
          'Identify Arab reaction &rarr; Support with facts (suspension from Arab League, move to Tunis) &rarr; Explain how Egypt was ostracized for breaking pan-Arab unity.',
      },
      q1b: {
        num: '1 (b)',
        stem: 'Explain one consequence of the Israeli invasion of Lebanon (1982).',
        marks: 4,
        lines: 8,
        vocabBank: [
          'Operation Peace for Galilee (June 1982)',
          'Ariel Sharon',
          'Siege of Beirut',
          'Expulsion of PLO to Tunisia',
          'Rise of Hezbollah',
        ],
        connectives: [
          'As a direct result, ...',
          'This directly led to...',
          'Consequently, this created...',
        ],
        guide:
          'Identify one consequence &rarr; Support with facts (Beirut siege, PLO expulsion to Tunis, Hezbollah) &rarr; Explain long-term border conflict.',
      },
      q2: {
        num: '2',
        stem: 'Write a narrative account analysing diplomatic negotiations between Egypt and Israel from Sadat’s visit (1977) to the Treaty of Washington (1979).',
        marks: 8,
        stimulus: [
          'Sadat’s address to the Knesset (November 1977)',
          'The Camp David summit (September 1978)',
        ],
        linesPage3: 11,
        linesPage4: 22,
        vocabBank: [
          '19 Nov 1977 Knesset speech',
          'Begin visit to Ismailia',
          'Jimmy Carter mediation',
          '13-day Camp David summit',
          '23 framework drafts',
          'Treaty of Washington (26 March 1979)',
        ],
        connectives: [
          'Negotiations began when...',
          'However, talks soon deadlocked until...',
          'During the intense 13-day summit, ...',
          'This breakthrough directly enabled...',
          'Ultimately, the process culminated in...',
        ],
        stages: {
          stage1:
            'Stage 1: Dramatic Peace Initiative (Nov 1977) — Sadat flies to Jerusalem offering peace; breaks psychological barrier',
          stage2:
            'Stage 2: US Mediation & Camp David (Sept 1978) — Carter drafts 23 revisions at secluded summit to prevent collapse',
          stage3:
            'Stage 3: Formal Bilateral Treaty (March 1979) — Treaty of Washington signed: Sinai returned, canal opened, Egypt isolated',
        },
      },
      q3a: {
        num: '3 (a)',
        stem: 'Explain the importance of the Oslo Accords (1993) for the setting up of the Palestinian National Authority.',
        marks: 8,
        focus:
          'Explain why establishing the legal and administrative framework for interim self-government in Gaza and Jericho was critical for formal state administration.',
        lines: 16,
        vocabBank: [
          '13 September 1993',
          'Declaration of Principles',
          'Rabin & Arafat handshake',
          'Withdrawal from Gaza & Jericho',
          'Creation of PNA (May 1994)',
          'Arafat return from exile',
        ],
        connectives: [
          'This was important because...',
          'Furthermore, ...',
          'Without this agreement, ...',
          'This directly transformed...',
        ],
        p1: 'Framework for Civilian Self-Rule: Explain how the accords transferred civil administration over population centres (Gaza and Jericho) to Palestinians for the first time.',
        p2: 'Transformation into Recognized Government: Explain how it transformed the PLO from an exiled militant movement into an internationally recognized sovereign governing body.',
      },
      q3b: {
        num: '3 (b)',
        stem: 'Explain the importance of Arafat’s renunciation of terrorism (1988) for diplomatic relations with the USA.',
        marks: 8,
        focus:
          'Explain why meeting Washington’s long-standing mandatory precondition unlocked direct US dialogue with the PLO and opened the path to Madrid and Oslo.',
        lines: 16,
        vocabBank: [
          'December 1988 Geneva speech',
          'Acceptance of UN Res 242 & 338',
          'Recognition of Israel’s right to exist',
          'Explicit renunciation of terrorism',
          'US opens official diplomatic dialogue',
        ],
        connectives: [
          'This was vital because...',
          'Moreover, ...',
          'By fulfilling Washington’s condition, ...',
          'This directly opened the way to...',
        ],
        p1: 'Unlocking Direct American Dialogue: Explain how renouncing terrorism satisfied Washington’s mandatory statutory precondition, opening official US-PLO diplomacy.',
        p2: 'Paving the Path to Madrid and Oslo: Explain how American engagement gave the PLO international diplomatic credibility, leading directly to future peace negotiations.',
      },
    },
    depthBank: {
      q4a: {
        num: '4 (a)',
        stem: 'Explain one consequence of the Israel-Jordan peace treaty (1994).',
        marks: 4,
        lines: 8,
        vocabBank: [
          '26 October 1994',
          'King Hussein & Yitzhak Rabin',
          'Wadi Araba border post',
          'Water sharing agreements',
          'Second Arab state recognition',
        ],
        connectives: [
          'One consequence was...',
          'This directly resulted in...',
          'Consequently, ...',
        ],
        guide:
          'Identify bilateral consequence &rarr; Support with facts (Wadi Araba, water allocations) &rarr; Explain stabilization and security along Israel’s longest border.',
      },
      q4b: {
        num: '4 (b)',
        stem: 'Explain one consequence of the Oslo II agreement (1995) for Palestinian self-rule in the West Bank.',
        marks: 4,
        lines: 8,
        vocabBank: [
          'September 1995 (Taba)',
          'Division into Areas A, B, and C',
          'Area A (full PNA control, ~3%)',
          'Area B (joint security, ~24%)',
          'Area C (full Israeli security, ~73%)',
        ],
        connectives: ['One consequence was...', 'This meant that...', 'Consequently, ...'],
        guide:
          'Identify territorial consequence &rarr; Support with precise facts (Areas A, B, C breakdown) &rarr; Explain how self-rule remained severely fragmented.',
      },
      q5: {
        num: '5',
        stem: 'Explain the importance of US President Carter for the Camp David negotiations (1978).',
        marks: 8,
        focus:
          'Explain how Carter’s personal marathon mediation and drafting of 23 revisions prevented summit collapse and produced the framework accords.',
        lines: 16,
        vocabBank: [
          'Jimmy Carter personal diplomacy',
          'Secluded 13-day summit in Maryland',
          'Drafting of 23 agreement revisions',
          'Bilateral pressure on Begin & Sadat',
          'US financial aid package guarantees',
        ],
        connectives: [
          'President Carter was critical because...',
          'Furthermore, ...',
          'When negotiations neared total collapse, ...',
          'His intervention ensured that...',
        ],
        p1: 'Marathon Personal Mediation: Explain how Carter shuttled tirelessly between isolated cabins drafting 23 revisions to overcome bitter personal distrust.',
        p2: 'US Strategic Guarantees: Explain how Carter committed billions in ongoing US economic and military aid to induce both nations to accept difficult compromises.',
      },
      q6: {
        num: '6',
        stem: 'Explain the importance of the oil crisis (1973) for the involvement of the USA in the Middle East.',
        marks: 8,
        focus:
          'Explain how the Arab oil embargo directly threatened domestic US economic security, compelling Washington to launch active shuttle diplomacy.',
        lines: 16,
        vocabBank: [
          'OPEC & OAPEC embargo (Oct 1973)',
          'Price of oil quadrupled ($3 to $12)',
          'US petrol rationing & severe inflation',
          'Henry Kissinger "shuttle diplomacy"',
          'Disengagement agreements (1974–75)',
        ],
        connectives: [
          'This was critical because...',
          'Moreover, ...',
          'The economic shock forced Washington to...',
          'This directly initiated...',
        ],
        p1: 'Domestic Economic Vulnerability: Explain how fuel shortages and rampant inflation demonstrated that US economic survival depended directly on Middle Eastern stability.',
        p2: 'Active Diplomatic Mediation: Explain how the crisis compelled Kissinger to launch active shuttle diplomacy to resolve military standoffs and prevent future oil embargoes.',
      },
      q7: {
        num: '7',
        stem: 'Write a narrative account analysing the events of the First Palestinian Intifada (1987–93).',
        marks: 8,
        stimulus: [
          'The outbreak of protests in Gaza (December 1987)',
          'Yitzhak Rabin’s ‘Iron Fist’ policy',
        ],
        lines: 14,
        vocabBank: [
          'Jabalia camp traffic incident',
          'Stone-throwing youth vs IDF armour',
          'Unified National Leadership (UNLU)',
          'Commercial strikes & tax boycotts',
          'Rabin "broken bones" policy',
          'Rise of Hamas (1987)',
          'Secret Oslo negotiations (1993)',
        ],
        connectives: [
          'The uprising erupted when...',
          'Rapidly spreading across Gaza and the West Bank, ...',
          'In response, the Israeli government...',
          'However, international outcry intensified when...',
          'Ultimately, the Intifada proved that...',
        ],
        stages: {
          stage1:
            'Stage 1: Spontaneous Uprising (Dec 1987) — Fatal Gaza road incident sparks mass demonstrations; youth confront IDF tanks',
          stage2:
            'Stage 2: Civil Resistance & Iron Fist (1988–90) — UNLU organizes strikes and boycotts; Rabin’s harsh crackdown draws global condemnation',
          stage3:
            'Stage 3: Political Realisation & Oslo (1991–93) — Rise of Hamas; recognition that military occupation was unsustainable, unlocking Oslo',
        },
      },
    },
    exemplars: {
      consequence: {
        stem: 'Explain one consequence of the Treaty of Washington (1979) for Egyptian relations with other Arab states.',
        marks: 4,
        model:
          'One consequence of the Treaty of Washington (1979) was that Egypt was politically and economically ostracized by the rest of the Arab world. Signed on 26 March 1979 by Anwar Sadat and Menachem Begin, the bilateral treaty made Egypt the first Arab nation to formally recognize Israel in exchange for the return of the Sinai Peninsula. Arab League nations viewed this as a treacherous betrayal of the Palestinian cause, voting immediately to suspend Egypt from the Arab League, move the League’s headquarters from Cairo to Tunis, and sever diplomatic ties. This regional isolation shattered pan-Arab diplomatic solidarity and fueled domestic Islamist fury inside Egypt, leading directly to Sadat’s assassination in October 1981.',
        examiner:
          'Level 2 (4 Marks): Direct point on Arab ostracization; specific evidence (26 March 1979, Arab League suspension, Tunis move, Sadat assassination); causal explanation of why this severed pan-Arab unity.',
      },
      importance: {
        stem: 'Explain the importance of the Oslo Accords (1993) for the setting up of the Palestinian National Authority.',
        marks: 8,
        modelP1:
          'The Oslo Accords (Declaration of Principles) were important because they established the legal and administrative framework for formal Palestinian self-government for the first time. Signed on 13 September 1993 following secret Norwegian backchannel talks, the agreement mandated that Israel would withdraw its military forces from the Gaza Strip and the West Bank town of Jericho, transferring civil administration to an interim Palestinian authority. This breakthrough transformed the PLO from an exiled guerrilla organization into an internationally recognized civilian government, creating the Palestinian National Authority (PNA) in May 1994.',
        modelP2:
          'Furthermore, the Oslo Accords were important because they enabled Yasser Arafat and the exiled PLO leadership to return to Palestine to govern directly. In July 1994, Arafat returned to Gaza after 27 years in exile to head the newly established PNA, creating an elected Palestinian Legislative Council and a dedicated Palestinian civil police force. Although the accords controversially deferred permanent status issues (borders, Jerusalem, refugees), the creation of the PNA permanently altered Middle Eastern politics by granting Palestinians direct administrative authority over their major population centres.',
        examiner:
          'Level 3 (8 Marks): Direct focus on setting up the PNA; precise facts (13 Sept 1993, Jericho and Gaza withdrawal, July 1994 return, police force); clear evaluation of immediate governance vs deferred final status issues.',
      },
      narrative: {
        stem: 'Write a narrative account analysing diplomatic negotiations between Egypt and Israel from Sadat’s visit (1977) to the Treaty of Washington (1979).',
        stimulus: [
          'Sadat’s address to the Knesset (November 1977)',
          'The Camp David summit (September 1978)',
        ],
        marks: 8,
        modelP1:
          'Diplomatic negotiations began with Anwar Sadat’s unprecedented direct peace initiative in November 1977. Recognising that Egypt’s economy was exhausted by warfare and seeking to reclaim the Sinai Peninsula, Sadat shocked the world by flying to Jerusalem on 19 November and addressing the Israeli Knesset, proclaiming "no more war" and offering direct bilateral negotiations. While Israeli Prime Minister Menachem Begin made a reciprocal visit to Ismailia in December, negotiations soon stalled over Israeli unwillingness to dismantle Jewish settlements in Sinai and grant Palestinian autonomy.',
        modelP2:
          'Faced with complete diplomatic collapse, US President Jimmy Carter intervened decisively in September 1978 by inviting Sadat and Begin to a secluded 13-day summit at Camp David. Carter conducted intensive marathon diplomacy, drafting 23 revisions of the agreements to mediate between Begin’s rigid legalism and Sadat’s emotional demands. Carter’s personal pressure successfully produced the Camp David Accords on 17 September 1978, establishing two frameworks: one for the full return of the Sinai Peninsula to Egypt in exchange for peace, and a second, vaguer framework for interim self-government in the West Bank and Gaza.',
        modelP3:
          'This breakthrough directly culminated in the signing of the formal Treaty of Washington on the White House lawn on 26 March 1979. Under the treaty, Israel agreed to completely evacuate the Sinai Peninsula (dismantling the Yamit settlement) and reopen the Suez Canal to Israeli shipping, while Egypt became the first Arab state to recognize Israel’s right to exist. This historic treaty fundamentally transformed Middle East geopolitics by removing the largest and most powerful Arab military from the anti-Israel coalition, ending thirty years of state-on-state warfare between Egypt and Israel.',
        examiner:
          'Level 3 (8 Marks): Complete 3-stage causal progression from Knesset speech through Camp David mediation to the Treaty of Washington; explicit explanation of Carter’s personal intervention; detailed knowledge (19 Nov 1977, 13-day summit, Yamit, 26 March 1979).',
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
    },
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
          topic: 'Negotiations: Sadat’s Knesset Visit to Treaty of Washington',
          page: 'P3–4',
          marks: 8,
        },
        {
          q: '3 (a)',
          type: 'Importance',
          topic: 'Oslo Accords (1993) & Setting up Palestinian Authority',
          page: 'P5',
          marks: 8,
        },
        {
          q: '3 (b)',
          type: 'Importance',
          topic: 'Arafat’s Renunciation of Terrorism (1988) for US Relations',
          page: 'P6',
          marks: 8,
        },
      ],
      sectionB: [
        {
          q: '4 (a)',
          type: 'Consequence',
          topic: 'The 1994 Israel-Jordan Peace Treaty',
          page: 'P7',
          marks: 4,
        },
        {
          q: '4 (b)',
          type: 'Consequence',
          topic: 'The Oslo II Agreement (1995) for West Bank Self-Rule',
          page: 'P7',
          marks: 4,
        },
        {
          q: '5',
          type: 'Importance',
          topic: 'US President Carter for Camp David Negotiations (1978)',
          page: 'P8',
          marks: 8,
        },
        {
          q: '6',
          type: 'Importance',
          topic: '1973 Oil Crisis for US Involvement in Middle East',
          page: 'P9',
          marks: 8,
        },
        {
          q: '7',
          type: 'Narrative',
          topic: 'Events of the First Palestinian Intifada (1987–93)',
          page: 'P10',
          marks: 8,
        },
      ],
      sectionC: [
        {
          q: 'Ref',
          type: 'Exemplars',
          topic: 'Grade 8/9 Level 3 Models (Q1, Q2, Q3) & Top 3 Pitfalls',
          page: 'P11–12',
          marks: 'Audit',
        },
      ],
    },
  },
};

// =============================================================================
// CSS: AUTHENTIC PEARSON EDEXCEL EXAM PAPER STYLING (A4 PORTRAIT)
// =============================================================================
const COMMON_CSS = `
  @page {
    size: A4 portrait;
    margin: 10mm 12mm;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    color: #000;
    margin: 0;
    padding: 0;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    page-break-after: always;
    height: 277mm;
    max-height: 277mm;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
  }
  .page:last-child {
    page-break-after: avoid;
  }

  /* Authentic Pearson Cover Layout */
  .cover-warning {
    text-align: center;
    font-weight: 600;
    font-size: 8.5pt;
    color: #333;
    margin-bottom: 6px;
  }
  .candidate-box {
    border: 2px solid #555;
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 12px;
  }
  .candidate-row {
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
  }
  .candidate-row:last-child {
    margin-bottom: 0;
  }
  .field-label {
    font-size: 8pt;
    font-weight: 600;
    margin-bottom: 3px;
    color: #222;
  }
  .field-input {
    border: 1.5px solid #666;
    border-radius: 4px;
    height: 26px;
    background: #fff;
  }
  .char-cell {
    border: 1.5px solid #666;
    border-radius: 4px;
    height: 26px;
    width: 22px;
    display: inline-block;
    background: #fff;
    margin-right: 2px;
  }
  .edexcel-banner {
    font-size: 16pt;
    font-weight: 700;
    margin: 8px 0 6px 0;
    letter-spacing: -0.3px;
    color: #111;
  }
  .exam-header-box {
    border: 2px solid #555;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .exam-header-left {
    flex: 1;
  }
  .exam-date {
    font-size: 8pt;
    font-weight: 600;
    color: #444;
  }
  .exam-time {
    font-size: 8pt;
    color: #444;
    margin-bottom: 4px;
  }
  .exam-subject {
    font-size: 18pt;
    font-weight: 800;
    line-height: 1.1;
    margin: 2px 0;
  }
  .exam-booklet {
    font-size: 10pt;
    font-weight: 700;
    color: #222;
  }
  .exam-subtopic {
    font-size: 9pt;
    color: #444;
    margin-top: 2px;
  }
  .exam-header-right {
    text-align: right;
    padding-left: 15px;
    border-left: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ref-label {
    font-size: 7.5pt;
    font-weight: 600;
    color: #555;
  }
  .ref-val {
    font-size: 14pt;
    font-weight: 800;
    color: #111;
  }
  .must-have-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  .must-have-box {
    border: 2px solid #555;
    border-radius: 6px;
    padding: 8px 12px;
    flex: 1;
    font-size: 8.5pt;
    line-height: 1.35;
  }
  .marks-box {
    border: 2px solid #555;
    border-radius: 6px;
    width: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 8.5pt;
    font-weight: 700;
    background: #f8fafc;
  }
  .marks-number {
    font-size: 16pt;
    font-weight: 800;
    color: #0f172a;
  }
  .exam-notice-strip {
    border: 1.5px solid #64748b;
    border-radius: 5px;
    background: #f8fafc;
    padding: 6px 10px;
    font-size: 8pt;
    line-height: 1.35;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
  .exam-notice-strip > div {
    flex: 1;
  }
  .exam-notice-strip strong {
    color: #0f172a;
  }

  /* Spec-Mapped Question & Mark Tracker */
  .tracker-container {
    margin-bottom: 6px;
  }
  .tracker-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.5pt;
  }
  .tracker-table th, .tracker-table td {
    border: 1px solid #94a3b8;
    padding: 3.5px 6px;
    vertical-align: middle;
  }
  .tracker-table th {
    background: #0f172a;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 7.2pt;
    letter-spacing: 0.3px;
  }
  .tracker-section-hdr td {
    background: #e2e8f0;
    font-weight: 800;
    color: #0f172a;
    font-size: 7.2pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 3px 6px;
  }
  .tracker-row td {
    background: #fff;
  }
  .tracker-row:nth-child(even) td {
    background: #f8fafc;
  }
  .tracker-box {
    width: 11px;
    height: 11px;
    border: 1.5px solid #475569;
    border-radius: 2px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 3px;
    background: #fff;
  }
  .score-cell {
    font-weight: 700;
    color: #0f172a;
    text-align: center;
    white-space: nowrap;
    width: 58px;
  }
  .marks-cell {
    font-weight: 600;
    color: #334155;
    text-align: center;
    width: 44px;
  }
  .page-cell {
    font-weight: 700;
    color: #1e3a8a;
    text-align: center;
    width: 42px;
  }
  .type-tag {
    font-size: 7pt;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
  }
  .cover-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 7.5pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 4px;
    margin-top: 4px;
  }
  .turn-over {
    font-weight: 700;
    font-size: 8.5pt;
    color: #000;
  }

  /* Standard Inner Page Layouts */
  .page-header {
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 4px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h2 {
    margin: 0;
    font-size: 10.2pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .header-left p {
    margin: 1px 0 0 0;
    font-size: 7.6pt;
    color: #475569;
  }
  .header-tag {
    font-size: 7pt;
    font-weight: 700;
    background: #0f172a;
    color: #fff;
    padding: 2px 7px;
    border-radius: 3px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .question-container {
    margin-bottom: 6px;
  }
  .question-prompt {
    font-size: 10.5pt;
    font-weight: 700;
    color: #000;
    line-height: 1.3;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .q-num {
    font-weight: 800;
    margin-right: 6px;
  }
  .q-marks {
    font-size: 10pt;
    font-weight: 700;
    color: #334155;
    margin-left: 10px;
    white-space: nowrap;
  }
  .stimulus-card {
    border: 1.5px solid #64748b;
    border-radius: 5px;
    padding: 6px 10px;
    font-size: 8.5pt;
    background: #f8fafc;
    margin-bottom: 6px;
    line-height: 1.3;
  }
  .stimulus-card ul {
    margin: 2px 0 0 0;
    padding-left: 18px;
  }
  .focus-guidance {
    font-size: 7.8pt;
    color: #475569;
    font-style: italic;
    margin-bottom: 5px;
  }

  /* Ruled / Dotted Lines for Handwriting (24px spacing) */
  .dotted-line {
    border-bottom: 1.5px dotted #94a3b8;
    height: 24px;
    width: 100%;
    box-sizing: border-box;
  }

  /* Pearson Professional Monochrome Scaffolding Containers */
  .scaffold-bar {
    border: 1.5px solid #475569;
    border-radius: 4px;
    background: #f8fafc;
    padding: 4px 8px;
    margin-bottom: 6px;
    font-size: 7.2pt;
    line-height: 1.25;
    display: flex;
    gap: 8px;
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
    font-size: 6.6pt;
    color: #0f172a;
    margin-bottom: 2px;
    display: block;
    letter-spacing: 0.2px;
  }
  .scaffold-content {
    color: #334155;
  }
  .scaffold-pill {
    display: inline-block;
    background: #fff;
    border: 1px solid #94a3b8;
    border-radius: 3px;
    padding: 1px 4px;
    margin: 1px 2px 1px 0;
    font-size: 6.6pt;
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
  }

  .importance-scaffold-grid {
    border: 1.5px solid #475569;
    border-radius: 4px;
    background: #f8fafc;
    padding: 4px 8px;
    margin-bottom: 6px;
    font-size: 7.2pt;
    line-height: 1.25;
    display: grid;
    grid-template-columns: 1.35fr 1.35fr 1fr;
    gap: 8px;
  }
  .importance-scaffold-cell {
    border-right: 1px solid #cbd5e1;
    padding-right: 6px;
  }
  .importance-scaffold-cell:last-child {
    border-right: none;
    padding-right: 0;
  }

  .narrative-flow-planner {
    border: 1.5px solid #475569;
    border-radius: 4px;
    background: #f8fafc;
    padding: 4px 8px;
    margin-bottom: 6px;
    font-size: 7.2pt;
    line-height: 1.25;
  }
  .narrative-stages-row {
    display: flex;
    gap: 6px;
    margin-bottom: 4px;
  }
  .narrative-stage-box {
    flex: 1;
    background: #fff;
    border: 1px solid #94a3b8;
    border-radius: 3px;
    padding: 3px 5px;
  }
  .narrative-stage-hdr {
    font-weight: 800;
    font-size: 6.6pt;
    text-transform: uppercase;
    color: #0f172a;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 1px;
    margin-bottom: 2px;
  }

  /* Exemplar and Trap Containers */
  .exemplar-box {
    border: 1.5px solid #cbd5e1;
    border-radius: 5px;
    padding: 7px 9px;
    background: #fff;
    margin-bottom: 6px;
  }
  .exemplar-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }
  .exemplar-title {
    font-size: 8.5pt;
    font-weight: 800;
    color: #0f172a;
    text-transform: uppercase;
  }
  .exemplar-grade {
    font-size: 7.2pt;
    font-weight: 700;
    background: #dbeafe;
    color: #1e40af;
    padding: 1.5px 5px;
    border-radius: 3px;
  }
  .exemplar-stem {
    font-size: 8.2pt;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 3px;
  }
  .exemplar-text {
    font-family: Georgia, serif;
    font-size: 8pt;
    line-height: 1.32;
    color: #1e293b;
    background: #fafaf9;
    border-left: 3px solid #0284c7;
    padding: 5px 7px;
    border-radius: 0 4px 4px 0;
    margin-bottom: 3px;
  }
  .examiner-note {
    font-size: 7pt;
    color: #15803d;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 3px;
    padding: 2.5px 5px;
    line-height: 1.25;
  }

  .traps-card {
    border: 1.5px solid #ef4444;
    border-radius: 5px;
    padding: 7px 9px;
    background: #fef2f2;
    margin-top: 5px;
  }
  .traps-header {
    font-size: 8.2pt;
    font-weight: 800;
    color: #991b1b;
    text-transform: uppercase;
    border-bottom: 1px solid #fca5a5;
    padding-bottom: 2px;
    margin-bottom: 4px;
  }
  .traps-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
  }
  .trap-item {
    background: #fff;
    border: 1px solid #fca5a5;
    border-radius: 4px;
    padding: 4px 5px;
    font-size: 7pt;
    line-height: 1.22;
  }
  .trap-item strong {
    color: #991b1b;
    display: block;
    margin-bottom: 2px;
  }
  .trap-item span {
    color: #7f1d1d;
  }

  .page-footer {
    font-size: 7.2pt;
    color: #64748b;
    border-top: 1px solid #cbd5e1;
    padding-top: 3px;
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

// Helper to generate n ruled lines
function renderLines(count) {
  let lines = '';
  for (let i = 0; i < count; i++) {
    lines += '<div class=\"dotted-line\"></div>\n';
  }
  return lines;
}

// =============================================================================
// HTML RENDERER: 12-PAGE PER-KEY-TOPIC MASTER BOOKLET
// =============================================================================
function renderBookletHtml(ktKey, meta) {
  const e = meta.exam;
  const d = meta.depthBank;
  const x = meta.exemplars;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${meta.title} — GCSE (9–1) Exam Practice Pack</title>
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
                    <div class="ref-val">1HI0/P5</div>
                </div>
            </div>

            <!-- Must Have & Total Marks Row -->
            <div class="must-have-row">
                <div class="must-have-box">
                    <strong>You must have:</strong><br>
                    Black ink or ball-point pen. Ruler for margin checks.
                </div>
                <div class="marks-box">
                    <span>Section A Total</span>
                    <span class="marks-number">32</span>
                    <span>Marks</span>
                </div>
            </div>

            <!-- Exam Instructions & Timing Guidance Bar -->
            <div class="exam-notice-strip">
                <div><strong>Instructions:</strong> Use black ink. Complete Section A as a timed 32-mark mock (~50 mins). Complete Section B for full syllabus mastery. Mark using Section C models.</div>
                <div><strong>Timing Advice:</strong> 4-mark Consequence (~6 mins) · 8-mark Importance (~12 mins) · 8-mark Narrative (~12 mins).</div>
            </div>

            <!-- Spec-Mapped Question & Mark Tracker -->
            <div class="tracker-container">
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
                            <td colspan="6">SECTION C: EXAMINER STANDARDS &amp; MODEL ANSWERS (Self &amp; Peer Assessment)</td>
                        </tr>
                        ${meta.tracker.sectionC
                          .map(
                            (item) => `
                        <tr class="tracker-row">
                            <td><strong>${item.q}</strong></td>
                            <td><span class="type-tag">${item.type}</span></td>
                            <td>${item.topic}</td>
                            <td class="page-cell">${item.page}</td>
                            <td class="marks-cell">Audit</td>
                            <td class="score-cell"><span class="tracker-box"></span> Read</td>
                        </tr>
                        `,
                          )
                          .join('')}
                    </tbody>
                </table>
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
                    <span><strong class="q-num">${e.q1a.num}</strong> ${e.q1a.stem}</span>
                    <span class="q-marks">(4)</span>
                </div>
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Facts Bank:</span>
                        <div class="scaffold-content">${e.q1a.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${e.q1a.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.3;">
                        <span class="scaffold-label">Response Structure:</span>
                        <div class="scaffold-content" style="font-size: 6.8pt;">${e.q1a.guide}</div>
                    </div>
                </div>
                ${renderLines(e.q1a.lines)}
            </div>

            <!-- Question 1(b) -->
            <div class="question-container" style="margin-top: 8px;">
                <div class="question-prompt">
                    <span><strong class="q-num">${e.q1b.num}</strong> ${e.q1b.stem}</span>
                    <span class="q-marks">(4)</span>
                </div>
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Facts Bank:</span>
                        <div class="scaffold-content">${e.q1b.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${e.q1b.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.3;">
                        <span class="scaffold-label">Response Structure:</span>
                        <div class="scaffold-content" style="font-size: 6.8pt;">${e.q1b.guide}</div>
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
                    <span><strong class="q-num">${e.q2.num}</strong> ${e.q2.stem}</span>
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
                    <div style="font-weight: 800; font-size: 6.8pt; text-transform: uppercase; color: #0f172a; margin-bottom: 2px;">
                        Chronological 3-Stage Narrative Architecture:
                    </div>
                    <div class="narrative-stages-row">
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${e.q2.stages.stage1.split(' — ')[0]}</div>
                            <div style="font-size: 6.6pt; color: #334155;">${e.q2.stages.stage1.split(' — ')[1]}</div>
                        </div>
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${e.q2.stages.stage2.split(' — ')[0]}</div>
                            <div style="font-size: 6.6pt; color: #334155;">${e.q2.stages.stage2.split(' — ')[1]}</div>
                        </div>
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${e.q2.stages.stage3.split(' — ')[0]}</div>
                            <div style="font-size: 6.6pt; color: #334155;">${e.q2.stages.stage3.split(' — ')[1]}</div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 2px; font-size: 6.6pt; color: #475569;">
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
                <div style="border: 1px solid #94a3b8; border-radius: 4px; background: #f8fafc; padding: 4px 8px; margin-bottom: 6px; font-size: 7pt; color: #334155; display: flex; justify-content: space-between;">
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
                    <span><strong class="q-num">${e.q3a.num}</strong> ${e.q3a.stem}</span>
                    <span class="q-marks">(8)</span>
                </div>
                <div class="focus-guidance">
                    <strong>Examiner Guidance:</strong> ${e.q3a.focus}
                </div>

                <!-- Importance Scaffold Grid -->
                <div class="importance-scaffold-grid">
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Paragraph 1 Focus:</span>
                        <div style="font-size: 6.8pt; color: #334155;">${e.q3a.p1}</div>
                    </div>
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Paragraph 2 Focus:</span>
                        <div style="font-size: 6.8pt; color: #334155;">${e.q3a.p2}</div>
                    </div>
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Vocabulary &amp; Stems:</span>
                        <div>${e.q3a.vocabBank
                          .slice(0, 4)
                          .map((v) => `<span class="scaffold-pill">${v}</span>`)
                          .join(' ')}</div>
                        <div style="margin-top: 2px; font-size: 6.6pt; color: #475569;"><em>Stem:</em> "This was vital because..."</div>
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
                    <span><strong class="q-num">${e.q3b.num}</strong> ${e.q3b.stem}</span>
                    <span class="q-marks">(8)</span>
                </div>
                <div class="focus-guidance">
                    <strong>Examiner Guidance:</strong> ${e.q3b.focus}
                </div>

                <!-- Importance Scaffold Grid -->
                <div class="importance-scaffold-grid">
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Paragraph 1 Focus:</span>
                        <div style="font-size: 6.8pt; color: #334155;">${e.q3b.p1}</div>
                    </div>
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Paragraph 2 Focus:</span>
                        <div style="font-size: 6.8pt; color: #334155;">${e.q3b.p2}</div>
                    </div>
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Vocabulary &amp; Stems:</span>
                        <div>${e.q3b.vocabBank
                          .slice(0, 4)
                          .map((v) => `<span class="scaffold-pill">${v}</span>`)
                          .join(' ')}</div>
                        <div style="margin-top: 2px; font-size: 6.6pt; color: #475569;"><em>Stem:</em> "This ensured that..."</div>
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
                <span class="header-tag" style="background: #0284c7;">Spec Depth: Consequence</span>
            </div>

            <!-- Question 4(a) -->
            <div class="question-container">
                <div class="question-prompt">
                    <span><strong class="q-num">${d.q4a.num}</strong> ${d.q4a.stem}</span>
                    <span class="q-marks">(4)</span>
                </div>
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Facts Bank:</span>
                        <div class="scaffold-content">${d.q4a.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${d.q4a.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.3;">
                        <span class="scaffold-label">Response Structure:</span>
                        <div class="scaffold-content" style="font-size: 6.8pt;">${d.q4a.guide}</div>
                    </div>
                </div>
                ${renderLines(d.q4a.lines)}
            </div>

            <!-- Question 4(b) -->
            <div class="question-container" style="margin-top: 8px;">
                <div class="question-prompt">
                    <span><strong class="q-num">${d.q4b.num}</strong> ${d.q4b.stem}</span>
                    <span class="q-marks">(4)</span>
                </div>
                <div class="scaffold-bar">
                    <div class="scaffold-col" style="flex: 1.2;">
                        <span class="scaffold-label">Key Facts Bank:</span>
                        <div class="scaffold-content">${d.q4b.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1;">
                        <span class="scaffold-label">Causal Connectives:</span>
                        <div class="scaffold-content">${d.q4b.connectives.map((c) => `<span class="scaffold-pill">${c}</span>`).join(' ')}</div>
                    </div>
                    <div class="scaffold-col" style="flex: 1.3;">
                        <span class="scaffold-label">Response Structure:</span>
                        <div class="scaffold-content" style="font-size: 6.8pt;">${d.q4b.guide}</div>
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
                <span class="header-tag" style="background: #0284c7;">Spec Depth: Importance A</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span><strong class="q-num">${d.q5.num}</strong> ${d.q5.stem}</span>
                    <span class="q-marks">(8)</span>
                </div>
                <div class="focus-guidance">
                    <strong>Examiner Guidance:</strong> ${d.q5.focus}
                </div>

                <!-- Importance Scaffold Grid -->
                <div class="importance-scaffold-grid">
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Paragraph 1 Focus:</span>
                        <div style="font-size: 6.8pt; color: #334155;">${d.q5.p1}</div>
                    </div>
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Paragraph 2 Focus:</span>
                        <div style="font-size: 6.8pt; color: #334155;">${d.q5.p2}</div>
                    </div>
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Vocabulary &amp; Stems:</span>
                        <div>${d.q5.vocabBank
                          .slice(0, 4)
                          .map((v) => `<span class="scaffold-pill">${v}</span>`)
                          .join(' ')}</div>
                        <div style="margin-top: 2px; font-size: 6.6pt; color: #475569;"><em>Stem:</em> "This was important because..."</div>
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
                <span class="header-tag" style="background: #0284c7;">Spec Depth: Importance B</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span><strong class="q-num">${d.q6.num}</strong> ${d.q6.stem}</span>
                    <span class="q-marks">(8)</span>
                </div>
                <div class="focus-guidance">
                    <strong>Examiner Guidance:</strong> ${d.q6.focus}
                </div>

                <!-- Importance Scaffold Grid -->
                <div class="importance-scaffold-grid">
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Paragraph 1 Focus:</span>
                        <div style="font-size: 6.8pt; color: #334155;">${d.q6.p1}</div>
                    </div>
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Paragraph 2 Focus:</span>
                        <div style="font-size: 6.8pt; color: #334155;">${d.q6.p2}</div>
                    </div>
                    <div class="importance-scaffold-cell">
                        <span class="scaffold-label">Vocabulary &amp; Stems:</span>
                        <div>${d.q6.vocabBank
                          .slice(0, 4)
                          .map((v) => `<span class="scaffold-pill">${v}</span>`)
                          .join(' ')}</div>
                        <div style="margin-top: 2px; font-size: 6.6pt; color: #475569;"><em>Stem:</em> "Without this relationship, ..."</div>
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
    <!-- PAGE 10: SECTION B — SPECIFICATION BANK: NARRATIVE DEPTH       -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section B: Specification Depth Bank · Narrative Account</h2>
                    <p>Exhaustive curriculum coverage. Analyse the chronological sequence and causal links.</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Spec Depth: Narrative</span>
            </div>

            <div class="question-container">
                <div class="question-prompt">
                    <span><strong class="q-num">${d.q7.num}</strong> ${d.q7.stem}</span>
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
                    <div style="font-weight: 800; font-size: 6.8pt; text-transform: uppercase; color: #0f172a; margin-bottom: 2px;">
                        Chronological 3-Stage Narrative Architecture:
                    </div>
                    <div class="narrative-stages-row">
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${d.q7.stages.stage1.split(' — ')[0]}</div>
                            <div style="font-size: 6.6pt; color: #334155;">${d.q7.stages.stage1.split(' — ')[1]}</div>
                        </div>
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${d.q7.stages.stage2.split(' — ')[0]}</div>
                            <div style="font-size: 6.6pt; color: #334155;">${d.q7.stages.stage2.split(' — ')[1]}</div>
                        </div>
                        <div class="narrative-stage-box">
                            <div class="narrative-stage-hdr">${d.q7.stages.stage3.split(' — ')[0]}</div>
                            <div style="font-size: 6.6pt; color: #334155;">${d.q7.stages.stage3.split(' — ')[1]}</div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 2px; font-size: 6.6pt; color: #475569;">
                        <span><strong>Fact Bank:</strong> ${d.q7.vocabBank.map((v) => `<span class="scaffold-pill">${v}</span>`).join(' ')}</span>
                        <span><strong>Connectives:</strong> ${d.q7.connectives.slice(0, 3).join(' · ')}</span>
                    </div>
                </div>

                ${renderLines(d.q7.lines)}
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · 100% Specification Practice Bank</span>
            <span class="turn-over">Turn over for Section C (Exemplar Answers) &#9654;</span>
            <span>Page 10 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 11: SECTION C — GRADE 8/9 MODEL ANSWERS (Q1 & Q3)        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section C: High-Scoring Exemplar Responses</h2>
                    <p>Official Pearson Edexcel Level 3 continuous prose exemplars with examiner annotations.</p>
                </div>
                <span class="header-tag" style="background: #15803d;">Grade 8/9 Models: Q1 &amp; Q3</span>
            </div>

            <!-- Consequence Model -->
            <div class="exemplar-box">
                <div class="exemplar-header">
                    <span class="exemplar-title">Question 1: Consequence Exemplar</span>
                    <span class="exemplar-grade">Full Marks · Level 2 (4/4)</span>
                </div>
                <div class="exemplar-stem">${x.consequence.stem}</div>
                <div class="exemplar-text">
                    ${x.consequence.model}
                </div>
                <div class="examiner-note">
                    <strong>Examiner Annotation:</strong> ${x.consequence.examiner}
                </div>
            </div>

            <!-- Importance Model -->
            <div class="exemplar-box" style="margin-bottom: 0;">
                <div class="exemplar-header">
                    <span class="exemplar-title">Question 3: Importance Exemplar</span>
                    <span class="exemplar-grade">Full Marks · Level 3 (8/8)</span>
                </div>
                <div class="exemplar-stem">${x.importance.stem}</div>
                <div class="exemplar-text">
                    <p style="margin: 0 0 4px 0;">${x.importance.modelP1}</p>
                    <p style="margin: 0;">${x.importance.modelP2}</p>
                </div>
                <div class="examiner-note">
                    <strong>Examiner Annotation:</strong> ${x.importance.examiner}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Option P5 · Official Exam Criteria &amp; Exemplars</span>
            <span class="turn-over">Turn over for Narrative Model &amp; Traps &#9654;</span>
            <span>Page 11 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 12: SECTION C — GRADE 8/9 MODEL ANSWER & EXAMINER TRAPS  -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h2>Section C: Narrative Exemplar &amp; Fatal Examiner Traps</h2>
                    <p>Official Level 3 continuous prose model answer and high-frequency pitfalls to avoid.</p>
                </div>
                <span class="header-tag" style="background: #15803d;">Grade 8/9 Model: Q2</span>
            </div>

            <!-- Narrative Model -->
            <div class="exemplar-box">
                <div class="exemplar-header">
                    <span class="exemplar-title">Question 2: Narrative Account Exemplar</span>
                    <span class="exemplar-grade">Full Marks · Level 3 (8/8)</span>
                </div>
                <div class="exemplar-stem">${x.narrative.stem}</div>
                <div class="exemplar-text">
                    <p style="margin: 0 0 3px 0;">${x.narrative.modelP1}</p>
                    <p style="margin: 0 0 3px 0;">${x.narrative.modelP2}</p>
                    <p style="margin: 0;">${x.narrative.modelP3}</p>
                </div>
                <div class="examiner-note">
                    <strong>Examiner Annotation:</strong> ${x.narrative.examiner}
                </div>
            </div>

            <!-- Top 3 Fatal Examiner Traps -->
            <div class="traps-card">
                <div class="traps-header">
                    Top 3 Fatal Examiner Traps to Avoid for Key Topic ${meta.number}
                </div>
                <div class="traps-grid">
                    ${x.traps
                      .map(
                        (t) => `
                        <div class="trap-item">
                            <strong>• ${t.title}</strong>
                            <span>${t.desc}</span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Pearson Edexcel GCSE (9–1) History · Option P5 Conflict in the Middle East</span>
            <span style="font-weight: 700; color: #0f172a;">100% Specification Coverage Completed</span>
            <span>Page 12 of 12</span>
        </div>
    </div>

</body>
</html>`;
}

// =============================================================================
// MAIN COMPILATION & PDF EXPORT
// =============================================================================
(async () => {
  try {
    console.log('🚀 Starting compilation of authentic 12-page Middle East Exam Practice Packs...');

    const generatedHtmlFiles = {};

    for (const [ktKey, meta] of Object.entries(KT_DATA)) {
      console.log(`\n📄 Generating 12-Page Exam Practice Pack HTML for ${ktKey}...`);
      const htmlContent = renderBookletHtml(ktKey, meta);
      const outHtmlPath = path.join(bookletsDir, `cme_mastery_${ktKey}.html`);
      fs.writeFileSync(outHtmlPath, htmlContent, 'utf8');
      generatedHtmlFiles[ktKey] = outHtmlPath;
      console.log(`   ✅ Saved: ${path.basename(outHtmlPath)}`);
    }

    // Compile the Combined Master HTML booklet (36 Pages)
    console.log('\n📚 Compiling 36-Page Full Master Booklet (cme_mastery_FULL.html)...');
    let fullHtmlPages = '';
    for (const [ktKey] of Object.entries(KT_DATA)) {
      const htmlFile = generatedHtmlFiles[ktKey];
      const rawHtml = fs.readFileSync(htmlFile, 'utf8');
      const bodyMatch = rawHtml.match(/<body>([\s\S]*?)<\/body>/);
      if (bodyMatch) {
        fullHtmlPages += bodyMatch[1] + '\n';
      }
    }

    const fullHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Conflict in the Middle East, 1945–1995 — Complete Unit Exam Master Pack</title>
    <style>${COMMON_CSS}</style>
</head>
<body>
    ${fullHtmlPages}
</body>
</html>`;

    const fullHtmlPath = path.join(bookletsDir, 'cme_mastery_FULL.html');
    fs.writeFileSync(fullHtmlPath, fullHtmlContent, 'utf8');
    console.log(`   ✅ Saved: cme_mastery_FULL.html (36 Pages Total)`);

    // Launch Puppeteer
    console.log('\n🖨️ Launching Puppeteer to compile print-perfect PDFs...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--allow-file-access-from-files',
        '--disable-web-security',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });

    const renderPdf = async (htmlPath, pdfPath, label) => {
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(180000);
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0', timeout: 180000 });

      // Page overflow audit inside Puppeteer
      const overflows = await page.evaluate(() => {
        const pages = document.querySelectorAll('.page');
        const results = [];
        pages.forEach((p, idx) => {
          if (p.scrollHeight > p.clientHeight + 2) {
            results.push({
              page: idx + 1,
              scrollHeight: p.scrollHeight,
              clientHeight: p.clientHeight,
            });
          }
        });
        return results;
      });

      if (overflows.length > 0) {
        console.warn(
          `   ⚠️ WARNING: Layout overflow detected on page(s): ${JSON.stringify(overflows)}`,
        );
      } else {
        console.log(`   ✨ Layout check passed: Zero overflows across all pages.`);
      }

      await page.pdf({
        path: pdfPath,
        format: 'A4',
        landscape: false,
        printBackground: true,
        margin: { top: '10mm', bottom: '10mm', left: '12mm', right: '12mm' },
        timeout: 180000,
      });
      await page.close();

      // Verify physical page count via PDF buffer
      const buf = fs.readFileSync(pdfPath);
      const matches = buf.toString('latin1').match(/\/Type\s*\/Page\b/g);
      const pageCount = matches ? matches.length : 0;
      console.log(`   📕 Exported PDF: ${label} — Exact Page Count: ${pageCount} pages`);
      return pageCount;
    };

    // 1. KT1 PDF
    const kt1PdfPath = path.join(pdfsDir, 'cme_mastery_pack_KT1.pdf');
    await renderPdf(generatedHtmlFiles['KT1'], kt1PdfPath, 'cme_mastery_pack_KT1.pdf');

    // 2. KT2 PDF
    const kt2PdfPath = path.join(pdfsDir, 'cme_mastery_pack_KT2.pdf');
    await renderPdf(generatedHtmlFiles['KT2'], kt2PdfPath, 'cme_mastery_pack_KT2.pdf');

    // 3. KT3 PDF
    const kt3PdfPath = path.join(pdfsDir, 'cme_mastery_pack_KT3.pdf');
    await renderPdf(generatedHtmlFiles['KT3'], kt3PdfPath, 'cme_mastery_pack_KT3.pdf');

    // 4. FULL Master PDF
    const fullPdfPath = path.join(pdfsDir, 'cme_mastery_pack_FULL.pdf');
    await renderPdf(fullHtmlPath, fullPdfPath, 'cme_mastery_pack_FULL.pdf');

    // Sync to public/pdfs/ root and preserve legacy V17 naming scheme for compatibility
    fs.copyFileSync(kt1PdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_KT1.pdf'));
    fs.copyFileSync(kt2PdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_KT2.pdf'));
    fs.copyFileSync(kt3PdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_KT3.pdf'));
    fs.copyFileSync(fullPdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_FULL.pdf'));

    fs.copyFileSync(kt1PdfPath, path.join(globalPdfsDir, 'cme_new_mastery_pack_KT1_FINAL_V17.pdf'));
    fs.copyFileSync(kt2PdfPath, path.join(globalPdfsDir, 'cme_new_mastery_pack_KT2_FINAL_V17.pdf'));
    fs.copyFileSync(kt3PdfPath, path.join(globalPdfsDir, 'cme_new_mastery_pack_KT3_FINAL_V17.pdf'));

    console.log(`   📋 Synced PDFs to public/pdfs/ root (both modern and V17 naming)`);

    await browser.close();
    console.log(
      '\n🎉 Successfully compiled all 4 CME Exam Practice Booklets into print-perfect PDFs!',
    );
  } catch (err) {
    console.error('❌ Error generating CME mastery booklets:', err);
    process.exit(1);
  }
})();
