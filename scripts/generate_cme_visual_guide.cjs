/**
 * generate_cme_visual_guide.cjs
 *
 * Compiles the complete, print-perfect Pearson Edexcel GCSE (9–1) History Paper 2 (Period Study):
 * "Option P5: Conflict in the Middle East, 1945–1995 (1HI0/P5)"
 * Visual Revision Masterclasses & Exam Technique Guide (28-Page Master Volume).
 *
 * Enforces the Paper 2 Period Study 4-4-4 Question Matrix across 12 Spreads:
 * - 4x Consequence [4m] (Question 1 format)
 * - 4x Narrative Account [8m] (Question 2 format)
 * - 4x Importance [8m] (Question 3 format)
 *
 * Commercial Saddle-Stitch Format (28 Pages = 7 folded A3 sheets, 0 blank pages, 0 overflows):
 * - Page 1: Official Pearson Edexcel Examination Cover
 * - Page 2: Paper 2 Period Study Blueprint, Command Words & Level 3 Criteria
 * - Page 3: Master Chronology & Geopolitical Shift Matrix (1945–1995)
 * - Pages 4–27: 12 Double-Page Content Spreads (KT1: Spreads 1–4, KT2: Spreads 5–8, KT3: Spreads 9–12)
 * - Page 28: Master Historiographical Debates & Evaluative Criteria Toolkit
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

function formatMd(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function renderLines(count) {
  return Array.from({ length: count }, () => '<div class="line"></div>').join('');
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
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.1: The British Mandate, Jewish Underground & UN Referral (1945–47)',
    examType: 'consequence_4m',
    left: {
      tag: 'KT 1.1 • Deep Knowledge Masterclass',
      headline: 'Terror, Exhaustion & Abandonment: How Britain Lost Control of Palestine',
      summary:
        'Following the Holocaust in Europe, Britain attempted to maintain its 1939 White Paper immigration restrictions (15,000 Jewish refugees per year) to placate Arab oil states. In response, Jewish underground paramilitary organisations—the Haganah, Irgun (led by Menachem Begin), and Lehi—launched a violent insurgency against British military infrastructure. Paralyzed by mounting casualties, economic exhaustion after WWII, and international outrage over intercepted refugee ships (such as the SS Exodus), Foreign Secretary Ernest Bevin announced in February 1947 that Britain would surrender the Mandate to the United Nations.',
      pillars: [
        {
          title: 'The 1939 White Paper Crisis',
          subtitle: 'Immigration Caps & Post-Holocaust Clashes',
          bullets: [
            'Britain restricted Jewish immigration to **15,000 annually**, trapping 250,000 Holocaust survivors in European DP camps.',
            'Clandestine immigration network (**Aliyah Bet**) ran blockade runners across the Mediterranean.',
            'In July 1947, Royal Navy warships rammed the **SS Exodus**, forcibly returning 4,500 survivors to camps in Germany, causing global moral outrage.',
          ],
        },
        {
          title: 'Jewish Paramilitary Insurgency',
          subtitle: 'The Guerrilla War Against British Rule',
          bullets: [
            '**Haganah:** Official defense force of the Jewish Agency (led by David Ben-Gurion); sabotaged railways, radar, and airfields.',
            '**Irgun (Etzel):** Militant revisionist splinter group commanded by **Menachem Begin**, targeting British military headquarters.',
            '**Night of the Bridges (June 1946):** Haganah blew up 11 bridges linking Palestine to neighbouring Arab states.',
          ],
        },
        {
          title: 'British Political Collapse',
          subtitle: 'Economic Exhaustion & UN Referral',
          bullets: [
            'Britain stationed **100,000 soldiers** in Palestine (1 soldier for every 6 Jews), costing £40 million annually.',
            '**King David Hotel Bombing (22 July 1946):** Irgun disguised explosives in milk churns, killing 91 British, Arab, and Jewish civil servants.',
            'Foreign Secretary **Ernest Bevin** surrendered the Mandate to the UN General Assembly in February 1947.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Anglo-American Committee',
          points: [
            '**1946 Inquiry:** Recommended immediate admission of 100,000 Holocaust survivors.',
            '**British Rejection:** Attlee government refused without Jewish disarmament, alienating President Truman.',
            '**US Pressure:** US financial loans to war-bankrupted Britain were threatened over Palestine.',
          ],
        },
        {
          title: '2. The Sergeants Affair (1947)',
          points: [
            '**Kidnapping:** Irgun hanged two British intelligence sergeants (Martin & Paice) in retaliation for executed Irgun fighters.',
            '**Booby-Trapped Bodies:** Left hanging in a eucalyptus grove; wire booby-trap injured a British officer.',
            '**Domestic Uproar:** Triggered anti-Jewish riots in London and Liverpool; British public demanded immediate troop withdrawal.',
          ],
        },
        {
          title: '3. Martial Law & "Operation Agatha"',
          points: [
            '**Black Saturday (29 June 1946):** British raided Jewish Agency HQ, arresting 2,700 leaders and seizing weapons archives.',
            '**Curfews & Barbed Wire:** Tel Aviv and Jerusalem placed under martial law inside fortified "Bevingrad" security zones.',
            '**Intelligence Blindness:** Underground cells operated clandestinely with widespread civilian sympathy.',
          ],
        },
        {
          title: "4. Bevin's Strategic Dilemma",
          points: [
            '**Middle East Oil & Canal:** Britain sought Arab alliance to protect the Suez Canal and Persian Gulf oil concessions.',
            '**Irreconcilable Claims:** Arabs demanded a unitary state with an Arab majority; Jews demanded immediate sovereign partition.',
            '**UN Referral (Feb 1947):** Bevin referred Palestine without recommending any solution, expecting the UN to fail.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'White Paper (1939)',
          def: 'British policy limiting Jewish immigration to 75,000 over 5 years and restricting land sales.',
        },
        {
          term: 'Irgun (Etzel)',
          def: 'Zionist militant underground group led by Menachem Begin that waged armed attacks on British forces.',
        },
        {
          term: 'King David Hotel',
          def: 'Headquarters of the British Secretariat and Armed Forces in Jerusalem, bombed 22 July 1946 (91 dead).',
        },
        {
          term: 'SS Exodus (1947)',
          def: 'Refugee ship carrying 4,500 Holocaust survivors intercepted and forced back to Germany by Britain.',
        },
        {
          term: 'Ernest Bevin',
          def: 'British Labour Foreign Secretary who enforced immigration caps and referred Palestine to the UN.',
        },
        {
          term: 'Sergeants Affair',
          def: 'Hanging of two British sergeants by the Irgun in July 1947 that broke British public resolve to stay.',
        },
      ],
      causalFactors: [
        '**1. Post-WWII British Bankruptcy:** Rationing and debt made sustaining 100,000 garrison troops in Palestine politically impossible.',
        '**2. Asymmetric Underground Warfare:** Urban bombings and sabotage inflicted humiliating casualties British forces could not stop.',
        '**3. American Diplomatic Leverage:** President Truman insisted on admitting 100,000 refugees, putting Washington at odds with London.',
      ],
      examinerTraps: [
        {
          trap: 'Claiming the British left Palestine solely because of the King David Hotel bombing.',
          correction:
            'The bombing shattered administrative morale, but British departure was caused by postwar economic bankruptcy, US pressure, and the Sergeants Affair.',
        },
        {
          trap: 'Confusing the Haganah with the Irgun and Lehi militant splinter groups.',
          correction:
            'Haganah was the official defense militia under Ben-Gurion; Irgun and Lehi were independent revisionist militant groups.',
        },
        {
          trap: 'Believing Britain supported Jewish partition in 1947.',
          correction:
            'Britain abstained on the UN partition vote and refused to enforce it, prioritising relations with Arab oil monarchies.',
        },
      ],
    },
    right: {
      q1: {
        num: '1 (a)',
        stem: 'Explain one consequence of the bombing of the King David Hotel (1946).',
        marks: 4,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        guide: {
          pathwayA:
            'Pathway A (Immediate / Military Crisis): Irgun explosives (milk churns) &rarr; 91 dead (British, Arab, Jewish officials) &rarr; British administration paralyzed into fortified "Bevingrad" zones &rarr; martial law across major cities.',
          pathwayB:
            'Pathway B (Strategic / Diplomatic Outcome): Outrage in London &rarr; British domestic political will to maintain the Mandate broke &rarr; Bevin announced UN referral (Feb 1947) &rarr; UNSCOP fact-finding tour &rarr; 1947 Partition Plan.',
        },
        modelAnswer:
          'One consequence of the bombing of the King David Hotel was the collapse of British political resolve to continue administering the Palestine Mandate. On 22 July 1946, the Irgun detonated explosives inside milk churns in the basement of the hotel, which housed the British Secretariat and Military Headquarters, killing 91 people. This devastating destruction of British command infrastructure proved that 100,000 British soldiers could not suppress the Jewish insurgency. Consequently, public and parliamentary outcry in Britain intensified, leading Foreign Secretary Ernest Bevin to surrender the Mandate to the United Nations in February 1947, which directly paved the way for the UN partition plan.',
        examinerNote:
          'Level 2 (4/4 marks): Clear identification of ONE consequence (collapse of British resolve & UN referral) supported by precise factual evidence (22 July 1946, Irgun, 91 dead, Secretariat HQ) and a sustained 3-stage causal chain.',
      },
      practice: {
        num: '1 (b) Practice',
        stem: 'Explain one consequence of the SS Exodus incident (July 1947) for international attitudes towards the British Mandate.',
        marks: 4,
        lines: 9,
        factPills: [
          '4,500 Holocaust survivors',
          'President Truman condemnation',
          'Forcible return to Hamburg camps',
          'UNSCOP investigators present in Palestine',
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 2 (KT 1.2): UN PARTITION & 1948–49 ARAB-ISRAELI WAR
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_2',
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.2: UN Resolution 181 & The Arab-Israeli War (1948–49)',
    examType: 'narrative_8m',
    left: {
      tag: 'KT 1.2 • Deep Knowledge Masterclass',
      headline: 'From Partition to Survival: The War of Independence & The Nakba',
      summary:
        'In November 1947, the UN General Assembly voted 33 to 13 to pass Resolution 181, partitioning Palestine into separate Jewish (55%) and Arab (44%) states, with Jerusalem under international trusteeship. Jewish leaders accepted; the Arab Higher Committee and Arab League rejected it outright. When Britain evacuated on 14 May 1948, David Ben-Gurion proclaimed the State of Israel. The next morning, armies from five Arab states (Egypt, Syria, Transjordan, Iraq, Lebanon) invaded. Despite initial Arab advances, Israeli forces unified into the IDF, secured covert Czechoslovak arms during the June 1948 truce, launched devastating counter-offensives, and expanded Israeli control to 79% of mandatory Palestine by the 1949 armistices.',
      pillars: [
        {
          title: 'UN Resolution 181 (Nov 1947)',
          subtitle: 'The Partition Recommendation',
          bullets: [
            'Awarded **55% of Palestine** to the Jewish state (including Negev desert) and **44% to Arab state**; Jerusalem a *corpus separatum*.',
            'Jewish population owned under 7% of land and formed one-third of population; Arabs regarded partition as an imperial theft.',
            'Triggered immediate civil war between Jewish Haganah and Palestinian Arab irregulars (Nov 1947 – May 1948).',
          ],
        },
        {
          title: 'The Outbreak of War (May 1948)',
          subtitle: 'Five Armies Invade the New State',
          bullets: [
            '**14 May 1948:** Ben-Gurion declared independence in Tel Aviv; recognised immediately by USA and USSR.',
            '**15 May 1948:** Arab League forces invaded; Egyptian armour pushed up coast toward Tel Aviv; Arab Legion besieged Jewish Jerusalem.',
            'Arab armies lacked unified command, coordination, and shared political objectives (King Abdullah sought West Bank for Jordan).',
          ],
        },
        {
          title: 'Turning Point & 1949 Armistices',
          subtitle: 'The June Truce & Israeli Breakthrough',
          bullets: [
            '**UN Truce (11 June – 8 July 1948):** Mediated by Count Bernadotte; IDF unified (Order No. 4) and imported **Czech rifles, machine guns, and Avia S-199 fighters**.',
            '**Ten Days Offensive (July 1948):** IDF seized Lydda, Ramle, and Nazareth, lifting the siege of central Galilee.',
            '**1949 Green Line Armistices:** Israel expanded to 79% of territory; Jordan annexed West Bank; Egypt occupied Gaza.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Plan Dalet (Plan D, April 1948)',
          points: [
            '**Haganah Strategy:** Military plan to secure roads and territory within proposed Jewish state prior to British withdrawal.',
            '**Deir Yassin (9 April):** Irgun/Lehi assault killed over 100 Arab villagers; triggered panic-stricken Palestinian flight.',
            '**Haifa & Jaffa:** Major urban Arab populations evacuated amidst military bombardment and psychological terror.',
          ],
        },
        {
          title: '2. The Transjordan Arab Legion',
          points: [
            '**Elite Force:** British-officered and trained army under General John Bagot Glubb (Glubb Pasha).',
            "**Old City Jerusalem:** Captured the Jewish Quarter of Jerusalem's Old City and expelled its Jewish inhabitants.",
            '**Collusion Theory:** Secret contacts between Golda Meir and King Abdullah to divide Palestine and avoid clashes.',
          ],
        },
        {
          title: '3. Czechoslovak Arms Bridge',
          points: [
            '**Operation Balak:** Covert airlift of German-designed Mauser rifles and fighter aircraft via communist Czechoslovakia.',
            '**Decisive Air Power:** Israeli pilots (many WWII foreign volunteers - Mahal) shot down Egyptian aircraft over Tel Aviv.',
            '**Breaking the Embargo:** Bypassed UN arms embargo, giving IDF numerical and firepower superiority by autumn 1948.',
          ],
        },
        {
          title: '4. The 1949 Armistice Lines (Green Line)',
          points: [
            '**Rhodes Agreements:** Bilateral armistices signed with Egypt (Feb), Lebanon (Mar), Jordan (Apr), and Syria (July 1949).',
            "**No Formal Peace:** Arab states refused to recognise Israel's existence or sign permanent peace treaties.",
            '**Divided Jerusalem:** City divided with barbed wire; Jordan controlled East Jerusalem; Israel controlled West Jerusalem.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'UN Resolution 181',
          def: 'UN General Assembly resolution (29 Nov 1947) partitioning Palestine into Jewish and Arab states.',
        },
        {
          term: 'David Ben-Gurion',
          def: 'Zionist leader who declared the State of Israel (14 May 1948) and served as its first Prime Minister.',
        },
        {
          term: 'Arab Legion',
          def: 'British-trained armed force of Transjordan, commanded by Glubb Pasha, which captured East Jerusalem.',
        },
        {
          term: 'Count Folke Bernadotte',
          def: 'UN mediator assassinated by the militant Lehi group in Sept 1948 after proposing border adjustments.',
        },
        {
          term: 'Czech Arms Deal (1948)',
          def: 'Covert shipment of rifles and fighter planes that gave the IDF decisive air and artillery superiority.',
        },
        {
          term: 'Green Line',
          def: 'The 1949 armistice border demarcating Israel from Jordan-controlled West Bank and Egyptian-held Gaza.',
        },
      ],
      causalFactors: [
        '**1. Divided Arab Leadership:** Arab monarchs distrusted one another; King Abdullah secretly prioritised annexing the West Bank.',
        '**2. Effective Truce Exploitation:** Israel converted the 4-week June truce into an arms buildup, transforming militias into a disciplined army.',
        '**3. Existential Israeli Motivation:** Having survived the Holocaust, Jewish soldiers fought with zero room for retreat ("Ein Breira").',
      ],
      examinerTraps: [
        {
          trap: 'Believing the 1948 Arab invasion took place as a complete surprise.',
          correction:
            'A bitter 6-month civil war between Jewish and Palestinian Arab militias had already raged since the Nov 1947 UN vote.',
        },
        {
          trap: 'Assuming Arab armies heavily outnumbered the Israeli forces throughout the entire war.',
          correction:
            'While Arab armies had more heavy artillery initially, by late 1948 the unified IDF mobilised over 100,000 troops, outnumbering Arab forces in the field.',
        },
        {
          trap: 'Treating the 1949 Armistice agreements as permanent peace treaties.',
          correction:
            'The armistices were strictly military ceasefires; Arab states insisted on maintaining a technical state of war.',
        },
      ],
    },
    right: {
      narrative: {
        num: '2',
        stem: 'Write a narrative account analysing the key events of the Arab-Israeli war (1948–49).',
        marks: 8,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        stimulus: ['The invasion by Arab armies (May 1948)', 'The June 1948 truce'],
        planner: [
          {
            stage: 'Stage 1: Opening Attack & Crisis (May 1948)',
            detail:
              'Five Arab armies invade; Egypt attacks up coastal plain; Arab Legion besieges Jewish Jerusalem; existential crisis for infant state.',
          },
          {
            stage: 'Stage 2: The Decisive Turning Point (June 1948)',
            detail:
              'UN 4-week truce brokered by Bernadotte; Ben-Gurion unifies IDF under central command; covert Czech arms and fighter planes imported.',
          },
          {
            stage: 'Stage 3: Counter-Offensive & Armistice (1948–49)',
            detail:
              'Operation Dani and Yoav shatter Egyptian and Syrian armies; IDF secures 79% of Palestine; Green Line armistices signed at Rhodes.',
          },
        ],
        techniqueTip:
          'To achieve Level 3 (7–8 marks), do not write a simple timeline. You MUST link each paragraph causally using phrases like "This breathing space allowed the IDF to..." and "Consequently, this tactical superiority resulted in...". You must also use information of your own beyond the stimulus (e.g. Czech arms, Ben-Gurion\'s unified command, Operation Yoav).',
        lines: 24,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 3 (KT 1.3): REFUGEE CRISIS, ARMISTICE BORDERS & THE IDF
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_3',
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.3: The Palestinian Refugee Crisis & Border Confrontation (1949–55)',
    examType: 'importance_8m',
    left: {
      tag: 'KT 1.3 • Deep Knowledge Masterclass',
      headline: 'The Unresolved Wound: Displaced Millions, Fedayeen & Border Reprisals',
      summary:
        'The 1948–49 war produced a devastating humanitarian crisis known to Palestinians as the Nakba ("Catastrophe"). Over 700,000 Arab residents fled or were expelled from their homes within the new Israeli borders, resettling in squalid refugee camps in the West Bank, Gaza, Lebanon, Syria, and Jordan. When Israel passed the Absentee Property Law (1950) barring their return, and Arab states refused permanent resettlement to keep the national grievance alive, border friction erupted. Displaced Palestinians formed Fedayeen ("self-sacrificers") guerrilla cells that launched infiltrations into Israeli border settlements. Under Prime Minister Ben-Gurion and General Moshe Dayan, Israel adopted an aggressive doctrine of disproportionate military reprisals, culminating in the 1953 Qibya raid and 1955 Gaza attack.',
      pillars: [
        {
          title: 'The Nakba & 700,000 Refugees',
          subtitle: 'Displacement & The Right of Return',
          bullets: [
            'Over **700,000 Palestinian Arabs** (80% of Arab population in Israeli territory) became stateless refugees.',
            '**UN Resolution 194 (Dec 1948):** Declared refugees wishing to live at peace should be permitted to return; Israel refused.',
            '**UNRWA (founded 1949):** United Nations Relief and Works Agency created to provide rations, schooling, and tents in camps.',
          ],
        },
        {
          title: 'Creation & Doctrine of the IDF',
          subtitle: 'Consolidating Defense & Deterrence',
          bullets: [
            '**Ordinance No. 4 (May 1948):** Disbanded militias (Irgun/Lehi); created a citizen-army with mandatory universal conscription.',
            '**Frontier Settlement Defense:** Kibbutzim placed strategically along borders to serve as fortified tripwire garrisons.',
            '**Disproportionate Reprisal Doctrine:** Any cross-border raid was answered with massive military retaliation to enforce deterrence.',
          ],
        },
        {
          title: 'Fedayeen Raids & Escalation',
          subtitle: 'Guerrilla Infiltration & Border Clashes',
          bullets: [
            'Initially economic infiltrations (harvesting crops, reclaiming livestock), raids evolved into armed sabotage and ambushes.',
            '**Unit 101 (1953):** Elite commando unit founded by **Ariel Sharon** to conduct night-time cross-border retaliation.',
            '**Qibya Massacre (Oct 1953):** Unit 101 blew up 45 houses in Jordanian West Bank, killing 69 civilians; drew global condemnation.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Absentee Property Law (1950)',
          points: [
            '**Expropriation:** Legalized seizure of land, homes, and farms belonging to Arabs who left during the war.',
            '**Resettling Jewish Immigrants:** Vacant Arab properties used to house 700,000 Jewish refugees expelled from Arab lands (Mizrahi).',
            '**Demographic Shift:** Permanently altered the ethnic balance, preventing any peaceful Palestinian return.',
          ],
        },
        {
          title: '2. Arab State Policy on Refugees',
          points: [
            '**Refusal of Integration:** Except for Jordan, Arab states denied refugees citizenship, keeping them confined to camps.',
            '**Diplomatic Weapon:** Maintained camps as living political evidence of Israeli injustice and UN hypocrisy.',
            '**Arab League Boycott:** Secondary and tertiary commercial boycott implemented against foreign firms trading with Israel.',
          ],
        },
        {
          title: '3. The Law of Return (1950)',
          points: [
            '**Foundational Law:** Guaranteed every Jew worldwide the absolute legal right to settle in Israel and gain citizenship.',
            '**Operation Magic Carpet & Ezra:** Airlifted 50,000 Yemenite Jews and 120,000 Iraqi Jews to Israel amidst persecution.',
            '**Contrast:** Arabs noted Jewish foreigners were welcomed while native-born Palestinian refugees were shot at borders.',
          ],
        },
        {
          title: '4. Gaza Raid (28 Feb 1955)',
          points: [
            '**Operation Black Arrow:** Israeli paratroopers raided Egyptian army base in Gaza, killing 38 soldiers.',
            "**Nasser's Humiliation:** Exposed Egyptian army's utter weakness, shattering Gamal Abdel Nasser's military prestige.",
            '**Catalyst:** Drove Nasser to seek modern arms from Soviet bloc, signing the historic Czech arms deal in Sept 1955.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'The Nakba (1948)',
          def: 'The "Catastrophe": displacement and flight of over 700,000 Palestinian Arabs during the 1948 war.',
        },
        {
          term: 'UNRWA',
          def: 'UN agency established in 1949 to provide emergency relief, healthcare, and education to Palestinian refugees.',
        },
        {
          term: 'Absentee Property Law',
          def: '1950 Israeli law transferring property of displaced Arabs to the Israeli State Development Authority.',
        },
        {
          term: 'Fedayeen',
          def: 'Arab guerrilla fighters ("those who sacrifice themselves") who launched cross-border raids into Israel.',
        },
        {
          term: 'Unit 101',
          def: 'Elite Israeli commando force formed in 1953 by Ariel Sharon to execute aggressive border reprisal operations.',
        },
        {
          term: 'Law of Return (1950)',
          def: 'Israeli statute giving every Jew in the world the right to immigrate to Israel and claim citizenship.',
        },
      ],
      causalFactors: [
        '**1. Refusal of Mutual Compromise:** Israel refused to readmit refugees fearing demographic destruction; Arab states refused formal peace.',
        '**2. Porous Armistice Borders:** The Green Line split Arab villages from their agricultural lands, making cross-border infiltration inevitable.',
        '**3. Escalatory Reprisal Spiral:** Israeli reprisal raids radicalised refugee youth, swelling Fedayeen ranks sponsored by Egyptian intelligence.',
      ],
      examinerTraps: [
        {
          trap: 'Asserting that all Palestinian refugees left purely because Arab radio broadcasts ordered them to vacate.',
          correction:
            'Modern historical consensus (e.g. Benny Morris) shows displacement was caused by a combination of fear, direct expulsions (Lydda/Ramle), and military collapse.',
        },
        {
          trap: 'Believing Fedayeen were an organized regular army.',
          correction:
            'Fedayeen were informal guerrilla cells, initially operating independently before receiving Egyptian and Syrian weapons.',
        },
        {
          trap: 'Assuming Jordan treated refugees identically to other Arab nations.',
          correction:
            'Jordan was the only Arab state to grant full citizenship to Palestinian refugees, seeking to integrate the West Bank.',
        },
      ],
    },
    right: {
      importance: {
        num: '3',
        stem: 'Explain the importance of the creation of the Israeli Defence Forces (IDF) for the aftermath of the 1948–49 war.',
        marks: 8,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        focus:
          'Explain why unifying rival paramilitary militias under central state command was important both for internal political stability and for defending vulnerable armistice frontiers against fedayeen raids.',
        p1Focus:
          'Paragraph 1: Internal Political Consolidation — Explain how disbanding the Irgun and Lehi eliminated the danger of a factional civil war (e.g. the Altalena affair) and established civilian government authority.',
        p2Focus:
          'Paragraph 2: Strategic Frontier Defense & Deterrence — Explain how a universal citizen-army backed by kibbutzim tripwire defenses allowed Israel to counter cross-border fedayeen raids and deter hostile neighbours.',
        modelParagraph:
          "The creation of the IDF was of paramount importance for internal political consolidation following the 1948–49 war. Prior to statehood, the Jewish community was fractured between rival paramilitary groups, including the socialist Haganah and the right-wing revisionist Irgun. In May 1948, David Ben-Gurion issued Ordinance No. 4, ordering all militias to disband and submit to unified government command. When Menachem Begin's Irgun attempted to land their own arms ship (the Altalena) in June 1948, Ben-Gurion ordered the newly formed IDF to fire on it. By subordinating all military power to the elected government, the IDF prevented factional warlordism and ensured Israel emerged as a stable, unified parliamentary democracy capable of collective action.",
        lines: 22,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 4 (KT 1.4): NASSER, SUEZ CRISIS & AFTERMATH (1956–63)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_4',
    topic: 'Key Topic 1 • The Birth of Israel, 1945–63',
    title: 'KT 1.4: Nasser, the Suez Crisis & Its Aftermath (1956–63)',
    examType: 'importance_8m',
    left: {
      tag: 'KT 1.4 • Deep Knowledge Masterclass',
      headline: 'The Imperial Twilight: Collusion, Invasion & Cold War Humiliation',
      summary:
        'In 1952, Gamal Abdel Nasser overthrew the corrupt Egyptian monarchy, championing pan-Arabism and anti-imperialism. Humiliated by the 1955 Gaza raid, Nasser broke Western arms dominance by signing the September 1955 Czech Arms Deal. When the US and Britain cancelled funding for the vital Aswan High Dam, Nasser retaliated on 26 July 1956 by nationalising the Anglo-French-owned Suez Canal Company. In response, Britain, France, and Israel met in secret to draft the Protocol of Sèvres collusion agreement: Israel would invade the Sinai Peninsula, providing Britain and France with an excuse to intervene as "peacekeepers" and seize the canal. Militarily, the operation succeeded; diplomatically, it was a catastrophe. US President Eisenhower threatened to collapse the British pound, forcing a humiliating Anglo-French withdrawal that ended Britain\'s status as an independent global superpower.',
      pillars: [
        {
          title: "Nasser's Pan-Arab Challenge",
          subtitle: 'Czech Arms & Canal Nationalisation',
          bullets: [
            "**Czech Arms Deal (Sept 1955):** Acquired 200 MiG-15 jets and 300 modern Soviet tanks, shattering Israel's military qualitative edge.",
            "**Blockade of Tiran:** Closed Gulf of Aqaba to Israeli shipping at Sharm el-Sheikh, choking Israel's port of Eilat.",
            '**26 July 1956:** Nationalised Suez Canal to fund the **Aswan Dam** following US/UK withdrawal of World Bank loans.',
          ],
        },
        {
          title: 'The Protocol of Sèvres (Oct 1956)',
          subtitle: 'Secret Tripartite Collusion',
          bullets: [
            'British PM **Anthony Eden**, French PM Guy Mollet, and Ben-Gurion met covertly at a villa in Sèvres, France.',
            '**The Plan:** Israel attacks across Sinai on 29 Oct; Britain & France issue an ultimatum to both sides to withdraw 10 miles from canal; allies bomb Egyptian airfields and invade Port Said.',
            'Kept secret from the United States, Commonwealth allies, and British Parliament.',
          ],
        },
        {
          title: 'US Ultimatum & Soviet Threat',
          subtitle: 'The Superpower Hammer Blow',
          bullets: [
            '**Eisenhower Outrage:** Furious at Anglo-French deceit during US election week; threatened to dump US-held British sterling bonds.',
            '**Soviet Nuclear Threat:** Khrushchev threatened rocket attacks on London and Paris; UN passed emergency ceasefire resolution.',
            'UN Emergency Force (**UNEF**) deployed to Sinai buffer zone; Anthony Eden resigned in political ruin in Jan 1957.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Operation Kadesh (Israeli Campaign)',
          points: [
            '**Mitla Pass Paratroopers:** Sharon dropped battalion deep in Sinai on 29 Oct, linking up with ground columns.',
            '**Sinai Blitz:** IDF captured entire Sinai Peninsula and opened Straits of Tiran within 100 hours.',
            '**Trophy Arms:** Captured massive quantities of newly delivered Egyptian Soviet tanks and munitions.',
          ],
        },
        {
          title: '2. Operation Musketeer (Allied Invasion)',
          points: [
            "**Air Campaign (31 Oct):** RAF and French air strikes destroyed Egypt's air force on ground runways.",
            '**Paratroopers at Port Said (5 Nov):** British and French forces seized Port Said, but halted before securing full canal.',
            '**Canal Blockage:** Nasser ordered 40 ships filled with concrete sunk in the canal, completely blocking international oil traffic.',
          ],
        },
        {
          title: '3. The UNEF Blue Helmets',
          points: [
            '**Lester B. Pearson:** Canadian diplomat created first UN peacekeeping force (UN Emergency Force - UNEF).',
            '**Buffer in Sinai:** Stationed along Israeli-Egyptian frontier and at Sharm el-Sheikh to guarantee Israeli shipping access.',
            "**10 Years of Peace:** Secured Israel's southern frontier and Eilat maritime route from 1957 until Nasser expelled them in 1967.",
          ],
        },
        {
          title: '4. The United Arab Republic (1958)',
          points: [
            '**Pan-Arab Hero:** Nasser emerged from military defeat as an untouchable anti-imperialist political titan.',
            '**Syria-Egypt Merger:** Political union creating the UAR in Feb 1958, raising Israeli fears of hostile encirclement.',
            '**Overthrow in Iraq:** 1958 bloody military coup in Baghdad toppled pro-British monarchy, escalating Cold War tension.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Gamal Abdel Nasser',
          def: 'President of Egypt (1954–70), championed pan-Arabism and nationalised the Suez Canal in 1956.',
        },
        {
          term: 'Czech Arms Deal (1955)',
          def: 'Agreement to import advanced Soviet jet fighters and tanks, ending Western Middle East arms monopoly.',
        },
        {
          term: 'Protocol of Sèvres',
          def: 'Secret collusion agreement (Oct 1956) between Britain, France, and Israel to invade Egypt.',
        },
        {
          term: 'Anthony Eden',
          def: 'British Prime Minister who viewed Nasser as an Egyptian Hitler; resigned following the Suez disaster.',
        },
        {
          term: 'Straits of Tiran',
          def: "Strategic maritime chokepoint connecting Israel's port of Eilat to the Red Sea, blockaded by Egypt.",
        },
        {
          term: 'UNEF',
          def: 'United Nations Emergency Force deployed to Sinai in 1957 to monitor ceasefire and protect Israeli shipping.',
        },
      ],
      causalFactors: [
        '**1. Imperial Hubris:** Eden and Mollet failed to realize Britain and France were no longer independent imperial powers capable of defying Washington.',
        '**2. Decisive US Financial Leverage:** The threat of a sterling collapse forced Britain to surrender military gains within 48 hours.',
        '**3. Strategic Israeli Dividend:** Israel won 10 years of southern maritime security and UN buffer deployment despite withdrawing from Sinai.',
      ],
      examinerTraps: [
        {
          trap: 'Concluding that Britain and France withdrew because Egyptian troops defeated them militarily.',
          correction:
            'Militarily, allied forces achieved all tactical objectives; withdrawal was forced entirely by US financial sanctions and UN pressure.',
        },
        {
          trap: 'Believing Israel permanently retained the Sinai Peninsula after the 1956 war.',
          correction:
            'President Eisenhower forced Ben-Gurion to withdraw Israeli troops in early 1957 in exchange for free passage through the Gulf of Aqaba.',
        },
        {
          trap: 'Viewing the Suez Crisis as purely a regional conflict.',
          correction:
            "It was a critical Cold War crossroads: it coincided with the Soviet invasion of Hungary and established the USSR as Egypt's patron.",
        },
      ],
    },
    right: {
      importance: {
        num: '3',
        stem: 'Explain the importance of the nationalisation of the Suez Canal (1956) for relations between Britain, France, and Egypt.',
        marks: 8,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        focus:
          'Explain how nationalising the canal provoked intense imperial outrage in London and Paris, leading directly to the secret Protocol of Sèvres and military invasion.',
        p1Focus:
          "Paragraph 1: Economic & Imperial Threat to Britain and France — Explain why Eden viewed Nasser as a dangerous dictator threatening Britain's oil supply and international trade routes.",
        p2Focus:
          'Paragraph 2: Catalyst for Secret Tripartite Collusion — Explain how the nationalisation led directly to the secret meeting at Sèvres, where France, Britain, and Israel engineered an unprovoked war.',
        modelParagraph:
          'The nationalisation of the Suez Canal was of decisive importance because it threatened Britain and France\'s vital economic lifelines and imperial prestige. On 26 July 1956, Nasser seized the canal company to fund the Aswan Dam. For Britain, through whose ships two-thirds of Western Europe\'s oil flowed, Prime Minister Anthony Eden viewed the nationalisation as an intolerable act of piracy by a "Middle Eastern Hitler." For France, Nasser was actively supplying weapons to Algerian rebels fighting French colonial rule. Consequently, both European powers concluded that Nasser had to be removed by force, transforming an economic dispute into the secret Protocol of Sèvres and triggering the military invasion of Egypt in October 1956.',
        lines: 22,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 5 (KT 2.1): ROAD TO WAR & SIX DAY WAR (JUNE 1967)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_5',
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.1: The Road to War & The Six Day War (June 1967)',
    examType: 'narrative_8m',
    left: {
      tag: 'KT 2.1 • Deep Knowledge Masterclass',
      headline: 'The Hundred-Hour Blitz: Pre-Emption, Air Supremacy & Total Triumph',
      summary:
        'In early 1967, Syrian artillery on the Golan Heights bombarded Israeli farming kibbutzim, while Soviet false intelligence warned Nasser that Israel was massing troops on the Syrian border. Seeking to reassert pan-Arab leadership, Nasser made three fatal gambles in May 1967: he moved 100,000 troops into the Sinai, expelled the UNEF peacekeepers, and closed the Straits of Tiran to Israeli shipping (a recognised casus belli). Facing complete economic strangulation and hostile military encirclement by Egypt, Syria, and Jordan, Israel launched Operation Focus on 5 June 1967. Within three hours, Israeli Mirage fighters destroyed over 300 Egyptian aircraft on their runways. With total air supremacy secured, the IDF shattered three Arab armies in six days, capturing the Sinai Peninsula, Gaza Strip, West Bank, Old City of Jerusalem, and the Golan Heights.',
      pillars: [
        {
          title: 'The Road to Escalation (May 1967)',
          subtitle: "Nasser's Gambles & War Rhetoric",
          bullets: [
            '**16 May:** Nasser demanded the immediate withdrawal of UNEF peacekeepers from Sinai; UN Secretary-General U Thant complied.',
            "**22 May:** Nasser closed the **Straits of Tiran**, cutting off Israel's oil supply from Iran; Israel declared this an act of war.",
            '**30 May:** King Hussein of Jordan signed a mutual defense pact with Egypt, placing Jordanian forces under Egyptian command.',
          ],
        },
        {
          title: 'Operation Focus (Moked)',
          subtitle: 'The Decisive Air Pre-Emption',
          bullets: [
            '**7:45 am, 5 June 1967:** Israel launched nearly its entire air force under radar beneath Mediterranean waves.',
            'Struck Egyptian airfields just as pilots returned from breakfast patrols; destroyed **309 Egyptian planes** in 170 minutes.',
            'Destroyed Syrian, Jordanian, and Iraqi air forces later that afternoon, securing unchallengeable command of the skies.',
          ],
        },
        {
          title: 'The Six-Day Ground Blitz',
          subtitle: 'Triple Front Decimation',
          bullets: [
            '**Sinai Front (5–8 June):** Armoured divisions under Sharon and Tal blitzed across Sinai, trapping Egyptian forces at Mitla Pass.',
            '**Jordanian Front (5–7 June):** Motta Gur\'s paratroopers captured East Jerusalem and the Western Wall ("The Temple Mount is in our hands!").',
            '**Syrian Front (9–10 June):** Stormed the fortified Golan Heights escarpment, halting 40 miles from Damascus.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Syrian-Israeli Border Friction',
          points: [
            "**Water Diversion (1964):** Syria attempted to divert headwaters of Jordan River to starve Israel's National Water Carrier.",
            '**Golan Bombardments:** Syrian artillery shelled kibbutzim below the heights.',
            '**April 1967 Air Clash:** Israeli jets shot down 6 Syrian MiG-21s and flew victory flypasts directly over Damascus.',
          ],
        },
        {
          title: '2. Soviet False Intelligence',
          points: [
            '**Moscow Disinformation:** Soviet diplomats warned Cairo that Israel had massed 13 brigades on the Syrian border.',
            '**UN Verification:** UN observers inspected the frontier and confirmed zero Israeli troop mobilizations.',
            '**Entrapment:** Nasser was pressured into public action to defend his credibility as leader of pan-Arabism.',
          ],
        },
        {
          title: '3. Israeli "Waiting Period" (Hamtana)',
          points: [
            '**Existential Dread (May 1967):** Israel mobilised civilian reserve army; economy ground to a halt; mass graves prepared in parks.',
            '**Government of National Unity:** PM Levi Eshkol appointed war hero **Moshe Dayan** as Minister of Defense.',
            '**US "Amber Light":** President Johnson signaled Washington could not break the Tiran blockade unilaterally, leaving Israel to act.',
          ],
        },
        {
          title: '4. The Spoils of Victory',
          points: [
            '**Quadrupling of Territory:** Israel captured 42,000 square miles (Sinai Peninsula, Gaza, West Bank, Golan Heights).',
            '**Unified Jerusalem:** Knesset immediately declared Jerusalem unified and undivided capital of Israel.',
            "**Human Cost:** Over 15,000 Arab troops killed vs 776 Israelis; shattered Nasser's pan-Arab ideology forever.",
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Operation Focus (Moked)',
          def: 'Israeli pre-emptive air strike on 5 June 1967 destroying 450 Arab aircraft on runways.',
        },
        {
          term: 'Moshe Dayan',
          def: 'Iconic Israeli Defense Minister who oversaw the 1967 Blitzkrieg victory.',
        },
        {
          term: 'Straits of Tiran',
          def: "Chokepoint closed by Nasser in May 1967, choking Israel's southern port of Eilat.",
        },
        {
          term: 'Western Wall (Kotel)',
          def: 'Holiest prayer site in Judaism, captured by Israeli paratroopers in East Jerusalem on 7 June 1967.',
        },
        {
          term: 'Golan Heights',
          def: 'Strategic Syrian mountainous escarpment captured by Israel on 9–10 June 1967.',
        },
        {
          term: 'Levi Eshkol',
          def: 'Israeli Prime Minister during the 1967 war who formed the cross-party National Unity Government.',
        },
      ],
      causalFactors: [
        '**1. Pre-Emptive Air Dominance:** Wiping out Arab air forces on morning one allowed Israeli armour to advance with zero enemy air interference.',
        '**2. Tactical & Operational Agility:** Israeli commanders practiced decentralised mobile warfare, while Egyptian generals issued panicked retreat orders.',
        '**3. Egyptian Chain of Command Collapse:** Field Marshal Amer ordered a chaotic retreat across Sinai, resulting in thousands of abandoned vehicles.',
      ],
      examinerTraps: [
        {
          trap: 'Claiming that Israel attacked unprovoked without any hostile Arab actions.',
          correction:
            "While Israel fired first on 5 June, it acted in response to Nasser's expulsion of UNEF, closing of Tiran, and massing of 100,000 troops.",
        },
        {
          trap: 'Believing Jordan remained neutral in 1967.',
          correction:
            'Jordan launched artillery shelling into West Jerusalem on 5 June, directly provoking the Israeli counter-attack that captured East Jerusalem.',
        },
        {
          trap: 'Assuming all Arab air forces were destroyed simultaneously at 7:45 am.',
          correction:
            'Egypt was struck first; Syrian and Jordanian air forces were attacked hours later when they attempted retaliatory raids.',
        },
      ],
    },
    right: {
      narrative: {
        num: '2',
        stem: 'Write a narrative account analysing the key events of the Six Day War (1967).',
        marks: 8,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        stimulus: [
          'Air attacks on Egyptian airfields (5 June 1967)',
          'The capture of East Jerusalem (7 June)',
        ],
        planner: [
          {
            stage: 'Stage 1: Pre-Emptive Air Strike (5 June 1967)',
            detail:
              'Operation Focus launches at 7:45 am; Israeli jets destroy 309 Egyptian planes on runways within 3 hours, achieving complete air supremacy.',
          },
          {
            stage: 'Stage 2: Ground Blitz & Jerusalem (6–8 June 1967)',
            detail:
              "Israeli armour tears through Sinai passes; paratroopers enter Lions' Gate to secure East Jerusalem and the Western Wall; West Bank cleared.",
          },
          {
            stage: 'Stage 3: Storming of Golan & Ceasefire (9–10 June 1967)',
            detail:
              'IDF scales Syrian fortifications on Golan Heights; Arab armies shattered; UN ceasefire takes effect with Israel controlling 4x its territory.',
          },
        ],
        techniqueTip:
          "To achieve Level 3, make sure you explain how the opening air victory directly enabled the army to capture East Jerusalem and the Golan Heights without fear of enemy bombing. Include outside knowledge like General Tal's armour, Motta Gur's paratroopers, and the capture of the Golan.",
        lines: 24,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 6 (KT 2.2): AFTERMATH OF 1967: OCCUPIED TERRITORIES & UN RES 242
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_6',
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.2: The 1967 Aftermath: Occupied Territories & UN Res 242',
    examType: 'importance_8m',
    left: {
      tag: 'KT 2.2 • Deep Knowledge Masterclass',
      headline: 'The Curse of Victory: Strategic Depth vs Military Occupation',
      summary:
        'The lightning victory of 1967 fundamentally transformed the Middle East. Israel found itself in possession of vast strategic depth: the Sinai Peninsula provided a 200km buffer zone against Egypt, the Golan Heights neutralized Syrian artillery, and the Jordan Valley secured the eastern border. However, victory brought an acute dilemma: Israel now governed over one million Palestinian Arabs in the West Bank and Gaza Strip under military administration. While Israeli religious nationalists launched illegal settlement construction (Gush Emunim), the Arab League convened at Khartoum in September 1967, issuing the defiant "Three No\'s" (No peace, No recognition, No negotiations). In November 1967, the UN Security Council passed Resolution 242, establishing the enduring "land for peace" formula, though its deliberate English linguistic ambiguity allowed both sides to interpret withdrawal obligations differently.',
      pillars: [
        {
          title: 'Strategic Depth vs Burden',
          subtitle: 'The Conquered Territories',
          bullets: [
            'Israel held **Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights**.',
            '**Bar-Lev Line:** Massive sand rampart fortification built along the eastern bank of the Suez Canal.',
            'Governing one million hostile Palestinians required continuous IDF military occupation, arrests, and curfews.',
          ],
        },
        {
          title: 'The Khartoum Summit (Sept 1967)',
          subtitle: 'The Defiant "Three No\'s"',
          bullets: [
            'Arab League leaders met in Khartoum, Sudan, to recover from the humiliating 1967 catastrophe.',
            'Issued the famous **Three No\'s:** "No peace with Israel, no recognition of Israel, no negotiations with it."',
            'Resolved that oil-rich monarchies (Saudi Arabia, Kuwait) would fund front-line states (Egypt, Jordan) to rearm.',
          ],
        },
        {
          title: 'UN Resolution 242 (Nov 1967)',
          subtitle: 'The "Land for Peace" Formula',
          bullets: [
            'Drafted by British ambassador Lord Caradon; passed unanimously by the UN Security Council on 22 Nov 1967.',
            '**Core Principle:** "Inadmissibility of the acquisition of territory by war" in exchange for "secure and recognized boundaries."',
            'Deliberately omitted the word **"the"** in English ("withdrawal from territories occupied"), allowing Israel to retain borders.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The Linguistic Ambiguity',
          points: [
            '**English Text:** "Withdrawal of Israel armed forces from territories occupied in the recent conflict."',
            '**French Text:** "Retrait des forces armées israéliennes *des* territoires occupés" (implying all territories).',
            '**Diplomatic Deadlock:** Arab states demanded total 100% withdrawal; Israel claimed it required defensible border adjustments.',
          ],
        },
        {
          title: '2. The Beginning of Settlements',
          points: [
            '**Allon Plan (1967):** Proposed retaining military buffer along Jordan Valley while returning Palestinian cities to Jordan.',
            '**Kfar Etzion (1967):** First West Bank settlement rebuilt by children of settlers killed in 1948.',
            '**Religious Zionism:** Gush Emunim movement viewed the West Bank (Judea and Samaria) as God-given biblical patrimony.',
          ],
        },
        {
          title: '3. East Jerusalem Annexation',
          points: [
            "**Municipal Expansion:** Israel expanded Jerusalem's municipal borders to include 70 sq km of West Bank land.",
            '**Demolition of Moroccan Quarter:** Cleared ancient Arab quarter in front of Western Wall within 48 hours to create a public plaza.',
            '**International Illegality:** UN declared annexation null and void; foreign embassies refused to move to Jerusalem.',
          ],
        },
        {
          title: '4. Palestinian Nationalism Ignited',
          points: [
            '**Disillusionment:** Shattered Palestinian faith that Arab state armies would liberate their homeland.',
            '**Independent Identity:** Palestinian youth realised only independent guerrilla warfare could reclaim their national rights.',
            '**Rise of Resistance:** Paved the way for Fatah and the PLO to seize control of the Palestinian national movement.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'UN Resolution 242',
          def: '1967 UN Security Council resolution establishing the "land for peace" formula.',
        },
        {
          term: 'Khartoum Summit (1967)',
          def: 'Arab League meeting issuing the "Three No\'s": no peace, no recognition, no negotiations.',
        },
        {
          term: 'Strategic Depth',
          def: 'The geographic distance between military frontiers and vital population centers acquired in 1967.',
        },
        {
          term: 'Bar-Lev Line',
          def: 'Massive Israeli fortification chain built along the Suez Canal to prevent Egyptian crossings.',
        },
        {
          term: 'Allon Plan',
          def: '1967 Israeli strategic proposal to annex the Jordan Valley while ceding populated areas to Jordan.',
        },
        {
          term: 'Judea and Samaria',
          def: 'Biblical Hebrew names for the West Bank used by Israeli religious settler movements.',
        },
      ],
      causalFactors: [
        '**1. Deliberate UN Ambiguity:** Lord Caradon intentionally left Resolution 242 vague so both Arabs and Israelis would sign it.',
        '**2. Hardening of Arab Position:** The humiliation of 1967 forced Arab leaders to adopt the Khartoum "Three No\'s" to maintain domestic legitimacy.',
        '**3. Irreversible Settlement Politics:** Capturing biblical heartlands empowered religious factions in Israel, making withdrawal politically divisive.',
      ],
      examinerTraps: [
        {
          trap: 'Assuming UN Resolution 242 specifically mentioned an independent Palestinian state.',
          correction:
            'Resolution 242 referred to Palestinians only as a "refugee problem"; Palestinian national sovereignty was completely unaddressed.',
        },
        {
          trap: 'Believing Israel immediately began mass settlement building across the West Bank.',
          correction:
            'In 1967–70, settlements were limited and strategic (Allon Plan); mass ideological settlement exploded after the Likud election in 1977.',
        },
        {
          trap: 'Assuming Resolution 242 created an immediate path to peace.',
          correction:
            'Because Israel insisted on direct bilateral treaties and Arabs insisted on prior withdrawal, the resolution remained completely stalled.',
        },
      ],
    },
    right: {
      importance: {
        num: '3',
        stem: 'Explain the importance of UN Resolution 242 for the aftermath of the 1967 war.',
        marks: 8,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        focus:
          'Explain why the "land for peace" formula and its deliberate linguistic ambiguity dictated all subsequent diplomatic negotiations.',
        p1Focus:
          'Paragraph 1: Foundational "Land for Peace" Principle — Explain how Res 242 established the universal formula requiring Israel to return land in exchange for Arab peace treaties.',
        p2Focus:
          'Paragraph 2: Deliberate Linguistic Ambiguity & Deadlock — Explain how omitting the word "the" from the English draft allowed Israel to claim it was not required to surrender all 1967 conquests.',
        modelParagraph:
          'UN Resolution 242 was of vital importance because it established the universal "land for peace" principle that governed all subsequent Middle East diplomacy. Passed unanimously by the UN Security Council on 22 November 1967, it declared the "inadmissibility of the acquisition of territory by war" and required Israel to withdraw from territories occupied during the Six Day War in exchange for Arab states recognizing Israel\'s right to exist within secure borders. This provided the legal foundation for every major peace initiative for the next three decades, directly enabling the 1979 Egyptian-Israeli peace treaty and the 1993 Oslo Accords.',
        lines: 22,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 7 (KT 2.3): RISE OF PALESTINIAN RESISTANCE & BLACK SEPTEMBER (1964–72)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_7',
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.3: The Rise of the PLO & Black September (1964–72)',
    examType: 'consequence_4m',
    left: {
      tag: 'KT 2.3 • Deep Knowledge Masterclass',
      headline: 'From Refugees to Guerrillas: Armed Struggle, Hijackings & Munich',
      summary:
        'Disillusioned by the catastrophic defeat of Arab regular armies in 1967, Palestinians abandoned reliance on Arab regimes. In 1968, Palestinian commandos resisted an Israeli raid at the Battle of Karameh in Jordan; although taking heavy casualties, their defiance transformed Yasser Arafat\'s Fatah movement into legendary heroes. In 1969, Arafat took over the Palestine Liberation Organization (PLO), making independent armed struggle its central pillar. In Jordan, armed fedayeen operated as a "state within a state," openly defying King Hussein. In September 1970, the Marxist PFLP hijacked four airliners to Dawson\'s Field in Jordan and blew them up. Pushed to the brink, King Hussein launched a brutal military crackdown ("Black September"), killing over 3,000 Palestinians and expelling the PLO to Lebanon. In revenge, a covert cell murdered 11 Israeli athletes at the 1972 Munich Olympics.',
      pillars: [
        {
          title: 'Battle of Karameh (March 1968)',
          subtitle: 'The Birth of the Guerrilla Myth',
          bullets: [
            'IDF launched massive reprisal raid across Jordan River into the fedayeen base at **Karameh**.',
            "Arafat's fighters held their ground, inflicting 28 Israeli deaths and destroying four tanks before retreating.",
            'Celebrated as a magnificent moral victory; thousands of Palestinian volunteers flooded to enlist in Fatah.',
          ],
        },
        {
          title: "Dawson's Field & Black September",
          subtitle: 'Civil War in Jordan (Sept 1970)',
          bullets: [
            "**PFLP Hijackings (6 Sept 1970):** Blew up three hijacked airliners at Dawson's Field desert strip in front of global TV.",
            "**King Hussein's Crackdown:** Jordanian army tanks shelled refugee camps in Amman; crushed Palestinian militias.",
            '**Expulsion to Lebanon:** Arafat and thousands of fighters evacuated to southern Lebanon, establishing **"Fatahland"**.',
          ],
        },
        {
          title: 'Munich Olympics Massacre (1972)',
          subtitle: 'Global Terror & Mossad Retaliation',
          bullets: [
            '**5 Sept 1972:** Black September terrorists stormed Israeli quarters in Munich Olympic village; 11 athletes murdered.',
            'Broadcast live to 900 million viewers worldwide, placing the Palestinian national cause in the global spotlight.',
            '**Operation Wrath of God:** PM Golda Meir authorized Mossad assassination teams to hunt down Black September planners across Europe.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Creation of the PLO (1964)',
          points: [
            '**Cairo Summit:** Nasser created the PLO to control Palestinian nationalism under Egyptian puppet Ahmad Shukeiri.',
            '**National Charter (1968):** Rewritten by Fatah; declared armed struggle the *only* way to liberate Palestine.',
            '**Arafat Elected Chairman (1969):** Marked the complete liberation of Palestinian leadership from Arab government control.',
          ],
        },
        {
          title: '2. The "State Within a State"',
          points: [
            '**Armed Militias:** Fedayeen set up checkpoints in Jordanian towns, collected taxes, and ignored Jordanian police.',
            '**Assassination Attempts:** King Hussein survived two assassination ambushes by radical Palestinian factions in 1970.',
            '**Sovereignty Crisis:** Hussein realized Jordan would be partitioned or overthrown if fedayeen were not crushed.',
          ],
        },
        {
          title: '3. Syrian Invasion of Jordan (1970)',
          points: [
            '**Syrian Armour Crosses Border:** Sent 300 tanks disguised with PLO markings to assist Palestinian fighters.',
            '**Jordanian Air Superiority:** Jordanian Hawker Hunter jets destroyed Syrian columns; Hafez al-Assad refused air support.',
            '**US & Israeli Deterrence:** US deployed Sixth Fleet; Israel readied troops to protect Hussein; Syria withdrew.',
          ],
        },
        {
          title: '4. The Move to Lebanon ("Fatahland")',
          points: [
            '**Cairo Agreement (1969):** Allowed PLO autonomous control over southern refugee camps bordering northern Israel.',
            '**New War Front:** Replaced Jordan with southern Lebanon as the primary launchpad for cross-border Katyusha rocket attacks.',
            '**Destabilizing Lebanon:** Tipped the delicate Christian-Muslim balance, directly precipitating the Lebanese Civil War (1975).',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Palestine Liberation Organization',
          def: 'Umbrella political and paramilitary organisation founded in 1964 to represent Palestinian Arabs.',
        },
        {
          term: 'Yasser Arafat',
          def: 'Founder of Fatah who became PLO Chairman in 1969, leading the armed and diplomatic struggle.',
        },
        {
          term: 'Battle of Karameh (1968)',
          def: 'Clash in Jordan where fedayeen resistance against the IDF made Arafat a national hero.',
        },
        {
          term: 'Black September (1970)',
          def: 'Jordanian civil war where King Hussein crushed and expelled the PLO to Lebanon.',
        },
        {
          term: 'PFLP',
          def: 'Popular Front for the Liberation of Palestine, a Marxist faction led by George Habash that pioneered airliner hijackings.',
        },
        {
          term: 'Operation Wrath of God',
          def: 'Covert Mossad assassination campaign hunting down planners of the 1972 Munich massacre.',
        },
      ],
      causalFactors: [
        '**1. Collapse of Faith in Arab Armies:** 1967 proved that Arab leaders could not defeat Israel, forcing Palestinians to take up arms.',
        '**2. Threat to Jordanian Sovereignty:** PFLP hijackings and street lawlessness forced King Hussein to choose between crushing the PLO or losing his throne.',
        "**3. Strategic Vacuum in Lebanon:** Weak Lebanese state authority allowed the PLO to rebuild an armed sanctuary on Israel's northern border.",
      ],
      examinerTraps: [
        {
          trap: 'Believing the PLO was a single unified political party.',
          correction:
            'The PLO was a broad umbrella coalition containing rival factions: nationalist Fatah, Marxist PFLP, and Maoist DFLP.',
        },
        {
          trap: 'Confusing Black September the historical month with Black September the terrorist cell.',
          correction:
            'Black September in 1970 was the civil war in Jordan; the militant cell that murdered athletes at Munich in 1972 took its name in revenge.',
        },
        {
          trap: 'Assuming Munich was viewed as a total defeat by the PLO.',
          correction:
            "While universally condemned, the Munich attack achieved the PLO's goal of thrusting Palestinian statelessness into the international media spotlight.",
        },
      ],
    },
    right: {
      q1: {
        num: '1 (a)',
        stem: 'Explain one consequence of the expulsion of the PLO from Jordan (1970).',
        marks: 4,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        guide: {
          pathwayA:
            'Pathway A (Military / Regional Displacement): King Hussein\'s crackdown (3,000+ dead) &rarr; PLO expelled &rarr; relocated to Southern Lebanon ("Fatahland") &rarr; established cross-border base against Galilee &rarr; paved way for 1982 Israeli invasion.',
          pathwayB:
            'Pathway B (Terrorist Radicalization): Bitterness at betrayal by Arab brothers &rarr; formation of secret "Black September" vengeance cell &rarr; launched international terrorist attacks, culminating in the Munich Olympics massacre (1972).',
        },
        modelAnswer:
          'One consequence of the expulsion of the PLO from Jordan was the relocation of its guerrilla headquarters to southern Lebanon. In September 1970 ("Black September"), King Hussein launched a brutal military assault on Palestinian refugee camps following the Dawson\'s Field hijackings, killing over 3,000 people and driving Arafat\'s forces out of the country. Consequently, thousands of armed fighters moved to southern Lebanon, establishing an autonomous base known as "Fatahland." From here, the PLO launched cross-border Katyusha rocket attacks and guerrilla raids into northern Israel, which destabilised Lebanon and directly triggered the 1982 Israeli invasion.',
        examinerNote:
          'Level 2 (4/4 marks): Identifies ONE distinct consequence (relocation to Lebanon and cross-border rocket front), supports with precise details (Sept 1970, King Hussein, 3,000 dead, Fatahland), and traces a full 3-step causal link to the 1982 invasion.',
      },
      practice: {
        num: '1 (b) Practice',
        stem: 'Explain one consequence of the Black September attack at the Munich Olympics (1972) for Israeli security policy.',
        marks: 4,
        lines: 9,
        factPills: [
          '11 Israeli athletes murdered',
          'Golda Meir decision',
          'Operation Wrath of God',
          'Mossad targeted assassinations in Europe',
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 8 (KT 2.4): WAR OF ATTRITION & YOM KIPPUR WAR (OCTOBER 1973)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_8',
    topic: 'Key Topic 2 • The Escalating Conflict, 1964–73',
    title: 'KT 2.4: The Yom Kippur War (October 1973)',
    examType: 'narrative_8m',
    left: {
      tag: 'KT 2.4 • Deep Knowledge Masterclass',
      headline: 'The Earthquake: Deception, Crossing the Canal & Superpower Nuclear Alert',
      summary:
        "Following Nasser's death in 1970, Anwar Sadat became President of Egypt. Recognising that Israel would never negotiate while it held military supremacy, Sadat resolved to launch a limited war to shatter Israeli complacency and force superpower diplomacy. Partnering with Syrian President Hafez al-Assad, Sadat executed a masterclass in strategic deception. On 6 October 1973 (Yom Kippur and Ramadan), Egyptian troops crossed the Suez Canal using high-pressure water cannons to breach the Bar-Lev sand ramparts (Operation Badr), sheltered under an impenetrable Soviet SAM anti-aircraft missile umbrella. Simultaneously, 1,400 Syrian tanks stormed the Golan Heights. Caught completely off guard, Israel suffered staggering initial casualties. However, backed by a massive US emergency arms airlift (Operation Nickel Grass), the IDF counter-attacked: General Ariel Sharon breached Egyptian lines, crossed the canal, and encircled Egypt's Third Army, prompting a US-Soviet nuclear standoff before UN Resolution 338 imposed a ceasefire.",
      pillars: [
        {
          title: 'Operation Badr & The Crossing',
          subtitle: 'The 6 October Surprise Offensive',
          bullets: [
            'Struck at 2:00 pm on **Yom Kippur**; Israeli military communications down and reserve soldiers at prayer.',
            'Used high-pressure fire hoses to melt **Bar-Lev Line** sand walls in hours; pontoon bridges brought 100,000 troops across.',
            '**Soviet SAM Missile Umbrella:** Surface-to-air missiles shot down 40 Israeli jets attempting close-air support.',
          ],
        },
        {
          title: 'Crisis on the Golan Heights',
          subtitle: 'The Valley of Tears Tank Battles',
          bullets: [
            '1,400 Syrian tanks attacked 177 Israeli tanks along the 1967 Purple Line, advancing toward Sea of Galilee.',
            'Heroic Israeli 7th Armoured Brigade held the **Valley of Tears**, destroying over 300 Syrian tanks in 48 hours.',
            'By 10 October, Israeli counter-offensives pushed Syrian forces back within artillery range of Damascus.',
          ],
        },
        {
          title: 'The Counter-Crossing & Encirclement',
          subtitle: 'Sharon at the Chinese Farm',
          bullets: [
            '**Ariel Sharon** found a gap between Egyptian Second and Third Armies; crossed pontoon bridge to the west bank of Suez.',
            'Destroyed Soviet SAM batteries from the ground, restoring Israeli air force dominance.',
            'Completely encircled the **Egyptian Third Army** (30,000 troops) in Sinai, threatening Cairo.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The "Conceptzia" Intelligence Failure',
          points: [
            '**Israeli Blind Spot:** Military intelligence assumed Egypt would never attack without long-range strike bombers.',
            '**Deception:** Sadat conducted dozens of mobilization drills, conditioning IDF to ignore Egyptian troop build-ups.',
            '**Agranat Commission:** 1974 post-war inquiry blamed Chief of Staff Elazar and intelligence head; forced PM Golda Meir to resign.',
          ],
        },
        {
          title: '2. Superpower Airlifts (Cold War Crisis)',
          points: [
            '**Soviet Resupply (9 Oct):** USSR launched massive sea and air resupply to Egypt and Syria.',
            '**Operation Nickel Grass (14 Oct):** Nixon ordered US transport planes to deliver 22,000 tons of tanks and munitions to Tel Aviv.',
            '**DEFCON 3 Alert:** US put nuclear forces on worldwide DEFCON 3 alert when Soviets threatened unilateral intervention.',
          ],
        },
        {
          title: '3. The Arab Oil Weapon (OPEC)',
          points: [
            '**Embargo:** Arab oil ministers (OAPEC led by Saudi Arabia) cut oil production and embargoed the USA and Netherlands.',
            '**Price Shock:** Quadrupled crude oil prices ($3 to $12 a barrel), triggering global stagflation and long petrol queues.',
            '**Diplomatic Power:** Proved that oil dependency made unconditional Western support for Israel economically unsustainable.',
          ],
        },
        {
          title: "4. Sadat's Political Victory",
          points: [
            '**Restored Pride:** Pierced the myth of Israeli invincibility and erased the psychological shame of 1967.',
            '**Strategic Objective Met:** Convinced Washington (Kissinger) that the Middle East status quo was a ticking time-bomb.',
            '**Path to Peace:** Provided Sadat the domestic prestige needed to travel to Jerusalem in 1977.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Operation Badr (1973)',
          def: 'Egyptian military assault crossing the Suez Canal and breaching the Bar-Lev Line on 6 October.',
        },
        {
          term: 'Anwar Sadat',
          def: 'President of Egypt who planned the 1973 war to break diplomatic stalemate and later signed peace with Israel.',
        },
        {
          term: 'SAM Missile Umbrella',
          def: 'Soviet mobile anti-aircraft missile batteries that neutralized Israeli air supremacy over Suez.',
        },
        {
          term: 'Valley of Tears',
          def: 'Fierce tank battle on the Golan Heights where outnumbered Israeli armor repelled Syrian invasion.',
        },
        {
          term: 'Operation Nickel Grass',
          def: 'Emergency US military airlift ordered by President Nixon delivering vital munitions to Israel.',
        },
        {
          term: 'UN Resolution 338',
          def: 'UN Security Council resolution (22 Oct 1973) enforcing ceasefire and calling for Res 242 peace talks.',
        },
      ],
      causalFactors: [
        '**1. Brilliant Strategic Deception:** Sadat feigned economic weakness and repeatedly announced cancelled invasions until Israel was lulled into complacency.',
        "**2. Soviet Technological Countermeasures:** Sagger anti-tank wire-guided missiles and SAM batteries neutralized Israel's traditional tank and air advantages.",
        "**3. US Global Intervention:** Nickel Grass arms deliveries and Kissinger's shuttle diplomacy prevented an Egyptian collapse and forced a ceasefire.",
      ],
      examinerTraps: [
        {
          trap: 'Concluding that Egypt won a total military victory in 1973.',
          correction:
            'Militarily, Israel won the war on the ground (encircling the Egyptian Third Army); politically and psychologically, Egypt triumphed by forcing negotiations.',
        },
        {
          trap: 'Assuming Golda Meir received zero warning of the attack.',
          correction:
            'King Hussein secretly flew to Tel Aviv to warn Meir, and Mossad agent Ashraf Marwan issued a warning hours before, but Meir feared launching a pre-emptive strike would lose US backing.',
        },
        {
          trap: 'Confusing the 1967 and 1973 wars regarding territory.',
          correction:
            '1967 resulted in massive territorial conquest for Israel; 1973 produced zero permanent territorial change, leading directly to disengagement.',
        },
      ],
    },
    right: {
      narrative: {
        num: '2',
        stem: 'Write a narrative account analysing the key events of the Yom Kippur War (1973).',
        marks: 8,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        stimulus: [
          'The crossing of the Suez Canal (October 1973)',
          'The Israeli counter-attack across the Suez Canal',
        ],
        planner: [
          {
            stage: 'Stage 1: Surprise Attack & Crisis (6–8 Oct 1973)',
            detail:
              'Simultaneous Egyptian crossing of Suez (Operation Badr) and Syrian armour assault on Golan; Bar-Lev breached; SAM umbrella inflicts heavy IDF losses.',
          },
          {
            stage: 'Stage 2: Golan Stabilization & US Airlift (9–14 Oct)',
            detail:
              'IDF pushes Syrians off Golan in Valley of Tears; Nixon orders Operation Nickel Grass emergency airlift to resupply munitions and tanks.',
          },
          {
            stage: "Stage 3: Sharon's Counter-Crossing & Ceasefire (15–24 Oct)",
            detail:
              'Ariel Sharon crosses canal at Chinese Farm; encircles Egyptian Third Army; US-Soviet nuclear alert averted by UN Resolution 338 ceasefire.',
          },
        ],
        techniqueTip:
          "In Q2, ensure you explain the causal connections: why did the success of the SAM umbrella force Israel to seek the US airlift, and how did Sharon's counter-crossing compel the UN to impose an urgent ceasefire?",
        lines: 24,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 9 (KT 3.1): THE ROAD TO PEACE: CAMP DAVID & WASHINGTON (1973–79)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_9',
    topic: 'Key Topic 3 • Attempts at a Solution, 1974–95',
    title: 'KT 3.1: The Road to Peace: Camp David & The Washington Treaty (1973–79)',
    examType: 'consequence_4m',
    left: {
      tag: 'KT 3.1 • Deep Knowledge Masterclass',
      headline: 'The Historic Handshake: Shuttle Diplomacy, Camp David & Arab Isolation',
      summary:
        'The 1973 war broke the diplomatic deadlock. US Secretary of State Henry Kissinger launched "shuttle diplomacy," brokering disengagement agreements that reopened the Suez Canal in 1975. In November 1977, Egyptian President Anwar Sadat stunned the world by flying to Jerusalem and addressing the Israeli Knesset, declaring: "No more war, no more bloodshed." In September 1978, US President Jimmy Carter hosted Sadat and Israeli Prime Minister Menachem Begin at Camp David for 13 days of secluded, grueling negotiations. The resulting Camp David Accords led to the Treaty of Washington on 26 March 1979: Israel returned the entire Sinai Peninsula and dismantled its Jewish settlements (Yamit) in exchange for Egypt granting full diplomatic recognition and permanent peace. While hailed as a triumph in the West, the treaty led to Egypt\'s expulsion from the Arab League, deep anger among Palestinians, and Sadat\'s assassination by Islamist soldiers in October 1981.',
      pillars: [
        {
          title: "Sadat's Historic Visit (Nov 1977)",
          subtitle: 'Breaking the Psychological Wall',
          bullets: [
            "Sadat realised Egypt's economy was crippled by endless war; offered peace directly to the Israeli people.",
            '**19 Nov 1977:** Touched down at Ben-Gurion airport; addressed the Knesset alongside Begin and Meir.',
            'Shattered three decades of Arab rejectionism, proving that direct bilateral peace was possible.',
          ],
        },
        {
          title: 'Camp David Summit (Sept 1978)',
          subtitle: "Carter's 13-Day Mediation Triumph",
          bullets: [
            'President **Jimmy Carter** isolated Sadat and Begin at the presidential retreat in Maryland for nearly two weeks.',
            'Drafted over 20 compromise proposals; physically shuttled between hostile cabins when leaders refused to speak.',
            'Pledged **billions in annual US financial and military subsidies** to both nations to seal the deal.',
          ],
        },
        {
          title: 'Treaty of Washington (March 1979)',
          subtitle: 'First Arab-Israeli Peace Accord',
          bullets: [
            'Signed on the White House lawn by Sadat and Begin with Carter witnessing.',
            '**Sinai for Peace:** Israel completed phased return of Sinai by April 1982 and bulldozed Yamit settlement.',
            'Guaranteed Israeli shipping free passage through Suez Canal and Straits of Tiran; established mutual embassies.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: "1. Henry Kissinger's Shuttle Diplomacy",
          points: [
            '**Step-by-Step Approach:** Flew between Jerusalem, Cairo, and Damascus to negotiate tactical disengagements.',
            '**Sinai I (1974) & Sinai II (1975):** Israel pulled back from canal and returned oil fields; Egypt reopened Suez Canal.',
            '**Excluding the Soviets:** Kissinger used diplomacy to flip Egypt from Soviet client state into premier American ally.',
          ],
        },
        {
          title: '2. The Palestinian Dilemma at Camp David',
          points: [
            '**Framework Agreement:** Proposed a 5-year autonomy period for West Bank and Gaza leading to self-government.',
            "**Begin's Narrow View:** Begin interpreted autonomy as applying strictly to *people*, never to the *land*.",
            '**PLO Rejection:** Arafat denounced Sadat for signing a separate peace that abandoned the Palestinian national cause.',
          ],
        },
        {
          title: '3. Arab World Retaliation',
          points: [
            '**Baghdad Summit (1978):** Arab League condemned Sadat as a traitor to the Arab nation.',
            '**Diplomatic Boycott:** Expelled Egypt from Arab League; headquarters moved from Cairo to Tunis; severed diplomatic ties.',
            '**Financial Sanctions:** Rich Gulf states terminated financial subsidies and aid programs to Egypt.',
          ],
        },
        {
          title: '4. Assassination of Sadat (Oct 1981)',
          points: [
            '**Victory Parade:** Assassinated by Egyptian Islamic Jihad soldiers led by Lt. Khaled Islambouli.',
            '**Motive:** Extremists cited peace with Israel and domestic crackdowns on Islamists as treason.',
            '**Hosni Mubarak:** Succeeded Sadat; pledged to maintain the peace treaty while slowly repairing ties with Arab states.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Camp David Accords (1978)',
          def: 'Framework agreements brokered by Jimmy Carter establishing peace between Egypt and Israel.',
        },
        {
          term: 'Treaty of Washington (1979)',
          def: 'Formal bilateral peace treaty where Israel returned Sinai in exchange for full diplomatic relations.',
        },
        {
          term: 'Menachem Begin',
          def: 'Right-wing Likud Prime Minister of Israel who agreed to withdraw from Sinai and signed peace with Sadat.',
        },
        {
          term: 'Jimmy Carter',
          def: 'US President who tirelessly mediated the 13-day Camp David summit and guaranteed US financial aid.',
        },
        {
          term: 'Shuttle Diplomacy',
          def: 'Diplomatic method used by Henry Kissinger, travelling back and forth between capitals to broker agreements.',
        },
        {
          term: 'Yamit',
          def: 'Major Israeli settlement in northern Sinai evacuated and bulldozed by the IDF prior to returning Sinai in 1982.',
        },
      ],
      causalFactors: [
        '**1. Crippling Egyptian Economic Strain:** Sadat recognized that Egypt was spending 40% of its budget on defense, causing bread riots in Cairo.',
        "**2. Tenacious American Presidential Pressure:** Carter's personal commitment and massive financial aid packages bridged Begin and Sadat's hostility.",
        '**3. Strategic Isolation of Arab Front:** By removing Egypt (the largest Arab military power) from the battlefield, Israel neutralized the threat of another multi-front war.',
      ],
      examinerTraps: [
        {
          trap: 'Assuming the Camp David Accords solved the wider Palestinian issue.',
          correction:
            'The accords achieved peace only between Egypt and Israel; the Palestinian autonomy clauses were vague and never implemented.',
        },
        {
          trap: 'Believing Menachem Begin was a left-wing peacemaker.',
          correction:
            'Begin was a hardline revisionist Zionist (former Irgun leader); he sacrificed Sinai to retain permanent Israeli control over the West Bank.',
        },
        {
          trap: "Assuming all Arab states celebrated Sadat's achievement.",
          correction:
            "Sadat was reviled across the Arab world as a traitor, leading directly to Egypt's suspension from the Arab League.",
        },
      ],
    },
    right: {
      q1: {
        num: '1 (a)',
        stem: 'Explain one consequence of the Treaty of Washington (1979) for Egyptian relations with other Arab states.',
        marks: 4,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        guide: {
          pathwayA:
            'Pathway A (Diplomatic Isolation & Arab Boycott): Treaty signed &rarr; Arab states viewed separate peace as betrayal of Palestinian cause &rarr; Arab League expelled Egypt, moved HQ from Cairo to Tunis, severed diplomatic relations & cut financial aid.',
          pathwayB:
            "Pathway B (Domestic Radicalization & Assassination): Signing separate treaty with Israel &rarr; sparked fierce Islamist fury inside Egypt (Egyptian Islamic Jihad) &rarr; resulted in Anwar Sadat's assassination at a military parade in October 1981.",
        },
        modelAnswer:
          'One consequence of the Treaty of Washington was the complete diplomatic isolation of Egypt within the Arab world. On 26 March 1979, Anwar Sadat signed a separate bilateral peace treaty with Israeli Prime Minister Menachem Begin, securing the return of the Sinai Peninsula. The rest of the Arab world viewed this as a catastrophic betrayal of Palestinian rights and Arab solidarity. Consequently, at the Baghdad Summit, the Arab League voted to expel Egypt, moved its headquarters from Cairo to Tunis, severed all diplomatic relations, and terminated billions in financial subsidies, isolating Egypt from its traditional regional allies for a decade.',
        examinerNote:
          'Level 2 (4/4 marks): Identifies ONE valid consequence (diplomatic and political isolation of Egypt), backs with specific evidence (26 March 1979, Sadat and Begin, Baghdad Summit, Arab League HQ moved to Tunis), and traces the complete causal chain.',
      },
      practice: {
        num: '1 (b) Practice',
        stem: 'Explain one consequence of the assassination of Anwar Sadat (1981) for the Middle East peace process.',
        marks: 4,
        lines: 9,
        factPills: [
          '6 October 1981 parade',
          'Egyptian Islamic Jihad',
          'Hosni Mubarak succession',
          'Commitment to uphold 1979 treaty while cooling bilateral relations',
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 10 (KT 3.2): CONFLICT IN LEBANON & RISE OF HEZBOLLAH (1982)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_10',
    topic: 'Key Topic 3 • Attempts at a Solution, 1974–95',
    title: 'KT 3.2: The Lebanon War & The Rise of Hezbollah (1982)',
    examType: 'importance_8m',
    left: {
      tag: 'KT 3.2 • Deep Knowledge Masterclass',
      headline: 'The Northern Quagmire: Operation Peace for Galilee, Sabra & Shatila',
      summary:
        'Following expulsion from Jordan in 1970, the PLO turned southern Lebanon into an armed redoubt, launching rocket bombardments into northern Israeli towns. After a Palestinian splinter group attempted to assassinate the Israeli ambassador in London, Israeli Defense Minister Ariel Sharon launched Operation Peace for Galilee on 6 June 1982. Sharon assured the cabinet troops would advance only 40km, but pushed 100km to besiege Beirut, trapping Arafat and 14,000 PLO fighters. Following a US-brokered evacuation of the PLO to Tunisia, Lebanese Christian Phalangist militiamen entered the Sabra and Shatila refugee camps, massacring over 1,000 defenseless civilians while Israeli forces illuminated the night sky. The massacre sparked massive domestic protests in Tel Aviv and led to the Kahan Commission inquiry, which found Sharon personally responsible. The invasion eliminated the PLO border threat, but created a far more dangerous adversary: the Iranian-backed Shiite militant group Hezbollah.',
      pillars: [
        {
          title: 'Operation Peace for Galilee (June 1982)',
          subtitle: "Sharon's Drive to Beirut",
          bullets: [
            '**Pretext:** Abu Nidal terror cell shot Israeli ambassador Shlomo Argov in London; Israel blamed the entire PLO.',
            '**The Offensive:** Sharon sent 76,000 troops and 800 tanks into Lebanon, destroying Syrian SAM batteries in the Bekaa Valley.',
            '**Siege of Beirut:** Two-month artillery bombardment of West Beirut cut off water, electricity, and food to civilian quarters.',
          ],
        },
        {
          title: 'Sabra & Shatila Massacre (Sept 1982)',
          subtitle: 'Phalangist Atrocity & Global Condemnation',
          bullets: [
            'Lebanese Christian President-elect **Bachir Gemayel** assassinated on 14 Sept 1982.',
            'IDF allowed Christian Phalangist fighters into the refugee camps to "clear terrorists"; militiamen slaughtered 800–2,000 civilians.',
            'IDF fired illumination flares over the camps; global outcry erupted when international journalists entered the camps.',
          ],
        },
        {
          title: 'The Kahan Commission & Legacy',
          subtitle: 'Political Fallout & The Rise of Hezbollah',
          bullets: [
            '**Peace Now Protest:** 400,000 Israelis marched in Tel Aviv demanding an independent judicial inquiry.',
            '**Kahan Commission (1983):** Ruled Sharon bore "personal responsibility" for failing to prevent the massacre; Sharon resigned as Defense Minister.',
            '**Rise of Hezbollah:** Shiite population originally welcomed the removal of the PLO, but turned into fanatical anti-Israeli resistance backed by Iran.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. The PLO Evacuation to Tunis',
          points: [
            '**Philip Habib Mediation:** US envoy brokered international agreement to save trapped PLO fighters.',
            '**Sea Evacuation (Aug 1982):** French, Italian, and US peacekeepers supervised the sea evacuation of 14,000 fighters to Tunisia.',
            '**Loss of Front Line:** Arafat was exiled 1,500 miles from Palestine, depriving the PLO of an immediate military launchpad.',
          ],
        },
        {
          title: '2. The Bekaa Valley Air Triumph',
          points: [
            '**Operation Mole Cricket 19:** In one afternoon, Israeli air force destroyed 19 Syrian SAM batteries without losing a single jet.',
            '**82–0 Dogfight:** Israeli F-15s and F-16s shot down 82 Syrian MiGs in the largest jet air battle in history.',
            "**Soviet Humiliation:** Moscow's military hardware was proven totally obsolete against Western electronics and drones.",
          ],
        },
        {
          title: '3. The Israeli Security Zone Buffer',
          points: [
            '**Southern Lebanon Occupation:** Israel withdrew from Beirut but established a 10km "Security Zone" buffer in southern Lebanon.',
            '**South Lebanon Army (SLA):** Proxy Christian-led militia financed and armed by Israel to patrol the buffer.',
            '**18-Year Quagmire:** Guerrilla attrition by Hezbollah resulted in hundreds of Israeli casualties until complete withdrawal in 2000.',
          ],
        },
        {
          title: '4. Birth of Suicide Bombing',
          points: [
            '**Hezbollah Emergence:** Iranian Revolutionary Guards entered Bekaa Valley, radicalising young Shiites into Hezbollah ("Party of God").',
            '**Beirut Barracks Bombing (1983):** Suicide truck bombings killed 241 US Marines and 58 French paratroopers, forcing Western withdrawal.',
            '**New Warfare Paradigm:** Replaced secular Palestinian guerrilla raids with religious martyrdom operations.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Operation Peace for Galilee',
          def: 'Israeli military invasion of Lebanon launched on 6 June 1982 to destroy PLO infrastructure.',
        },
        {
          term: 'Ariel Sharon',
          def: 'Defense Minister in 1982 who directed the siege of Beirut; removed after the Kahan Commission report.',
        },
        {
          term: 'Sabra and Shatila',
          def: 'Palestinian refugee camps in Beirut where Christian Phalangists slaughtered over 1,000 civilians in Sept 1982.',
        },
        {
          term: 'Kahan Commission',
          def: 'Israeli judicial inquiry (1983) investigating the Sabra and Shatila massacre, finding Sharon personally responsible.',
        },
        {
          term: 'Hezbollah',
          def: 'Iranian-backed Lebanese Shiite militant organization formed in 1982 that waged guerrilla war against the IDF.',
        },
        {
          term: 'Phalangists',
          def: 'Lebanese Christian right-wing militia allied with Israel during the 1982 Lebanon invasion.',
        },
      ],
      causalFactors: [
        "**1. Sharon's Maximalist Ambitions:** Sharon sought not just a 40km buffer, but the total destruction of the PLO and installation of a friendly Christian government.",
        '**2. Inevitable Inter-Communal Hatred:** Arming Lebanese Christian militias to enter Palestinian refugee camps predictably triggered savage score-settling.',
        '**3. The Law of Unintended Consequences:** Destroying the secular PLO in Beirut unintentionally midwifed the far more lethal, religious Hezbollah in the south.',
      ],
      examinerTraps: [
        {
          trap: 'Claiming that Israeli soldiers directly pulled the triggers in the Sabra and Shatila massacre.',
          correction:
            'The murders were carried out by Lebanese Christian Phalangist militiamen; the IDF was guilty of negligence and failing to intervene.',
        },
        {
          trap: 'Believing the 1982 war ended Palestinian resistance.',
          correction:
            'Exiling Arafat to Tunisia neutralised cross-border artillery, but set the stage for the spontaneous grassroots First Intifada in the West Bank.',
        },
        {
          trap: 'Assuming Israel completely left Lebanon in 1982.',
          correction:
            'Israel maintained its occupied "Security Zone" buffer in southern Lebanon for 18 years, withdrawing only in May 2000.',
        },
      ],
    },
    right: {
      importance: {
        num: '3',
        stem: 'Explain the importance of the Israeli invasion of Lebanon (1982) for the Palestine Liberation Organization (PLO).',
        marks: 8,
        provenance: { tag: '★ High-Yield Forecast', type: 'forecast' },
        focus:
          'Explain why the siege of Beirut and the subsequent evacuation to Tunisia deprived the PLO of its military front line, forcing a shift towards international diplomacy.',
        p1Focus:
          'Paragraph 1: Loss of Military Frontier & Strategic Sanctuary — Explain how being expelled from "Fatahland" ended the PLO\'s ability to launch direct cross-border rocket attacks and ground operations.',
        p2Focus:
          'Paragraph 2: Exile to Tunisia & Shift to Diplomacy — Explain how being geographically isolated 1,500 miles away compelled Yasser Arafat to pursue diplomatic recognition, paving the way to renounce terrorism in 1988.',
        modelParagraph:
          "The 1982 Israeli invasion of Lebanon was of monumental importance for the PLO because it destroyed its armed sanctuary on Israel's northern border and forced a fundamental transformation toward diplomacy. Following the two-month siege of West Beirut by Ariel Sharon's forces, US envoy Philip Habib negotiated the evacuation of Yasser Arafat and 14,000 fighters by sea. Dispersed to distant Arab nations, with leadership establishing headquarters in Tunis 1,500 miles away, the PLO permanently lost its physical front line against Israel. Consequently, armed cross-border raids became impossible, forcing Arafat to abandon the fantasy of military liberation and focus on diplomatic negotiations, culminating in his 1988 renunciation of terrorism.",
        lines: 22,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 11 (KT 3.3): THE FIRST PALESTINIAN INTIFADA (1987–93)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_11',
    topic: 'Key Topic 3 • Attempts at a Solution, 1974–95',
    title: 'KT 3.3: The First Palestinian Intifada (1987–93)',
    examType: 'narrative_8m',
    left: {
      tag: 'KT 3.3 • Deep Knowledge Masterclass',
      headline: 'The Stones of Revolt: Grassroots Uprising, Hamas & Television Diplomacy',
      summary:
        'By 1987, twenty years of Israeli military occupation had bred intense despair among the 1.5 million Palestinians in the West Bank and Gaza. Economic subjugation, land confiscations for growing Jewish settlements, arbitrary detentions, and daily humiliations at military checkpoints created a combustible atmosphere. On 8 December 1987, an IDF tank transport crashed into four civilian taxis at the Jabalya refugee camp in Gaza, killing four Palestinian workers. Rumours spread that the crash was deliberate revenge for an Israeli stabbed in Gaza. The funeral erupted into spontaneous riots, igniting the First Intifada ("shaking off"). Led not by the exiled PLO leadership in Tunis, but by local youth and the Unified National Leadership of the Uprising (UNLU), the revolt utilized strikes, boycotts, and stone-throwing against IDF armour. Broadcast globally, the "David vs. Goliath" imagery devastated Israel\'s international standing, produced the rise of Hamas, and compelled both sides toward the Madrid Conference and Oslo Accords.',
      pillars: [
        {
          title: 'The Spark & The Uprising',
          subtitle: 'Jabalya & Spontaneous Revolt',
          bullets: [
            '**8 Dec 1987:** Road collision at Jabalya camp in Gaza killed 4 Palestinians; funerals erupted into mass demonstrations.',
            'Spread instantly across Gaza and the West Bank; barricades erected, tires burned, and curfews defied.',
            '**Popular Mobilization:** Coordinated by the **UNLU** (local grassroots committees), utilizing leaflets to direct general strikes and tax resistance.',
          ],
        },
        {
          title: 'Rabin\'s "Iron Fist" & Media Impact',
          subtitle: 'The "Broken Bones" Controversy',
          bullets: [
            'Defense Minister **Yitzhak Rabin** adopted an "Iron Fist" policy, ordering troops to use "force, might, and beatings."',
            'Televised footage of Israeli soldiers using truncheons to systematically break the bones of teenage demonstrators shocked the world.',
            'Over **1,100 Palestinians killed** and 120,000 arrested; inverted the global narrative from "tiny brave Israel" to "repressive occupier."',
          ],
        },
        {
          title: 'The Rise of Hamas (1987)',
          subtitle: 'Islamist Resistance Challenges Secular PLO',
          bullets: [
            'Founded in Gaza by quadriplegic cleric **Sheikh Ahmed Yassin** as the militant arm of the Muslim Brotherhood.',
            '**1988 Covenant:** Rejected any compromise; called for total destruction of Israel through Islamic holy war (Jihad).',
            "Challenged Arafat's secular, nationalist PLO; established charitable clinics and mosques to win grassroots loyalty.",
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Root Causes of Despair',
          points: [
            '**Economic Exploitation:** Palestinians formed low-wage day-labour pool in Israel, treated as second-class citizens.',
            '**Settlement Expansion:** Over 65,000 Israeli settlers lived in the West Bank by 1987, seizing fertile land and scarce water aquifers.',
            '**Frustration with Arab Leaders:** Nov 1987 Amman Arab Summit focused entirely on Iran-Iraq War, completely ignoring Palestine.',
          ],
        },
        {
          title: '2. The Role of the Exiled PLO',
          points: [
            '**Caught Unprepared:** Arafat in Tunis was completely surprised by the grassroots uprising.',
            '**Hijacking Leadership:** PLO quickly sent funds and directives to associate itself with UNLU strike commands.',
            '**Pressure on Arafat:** The bravery of local youth forced Arafat to declare independent Palestinian statehood and seek peace in 1988.',
          ],
        },
        {
          title: '3. Arafat Renounces Terrorism (1988)',
          points: [
            '**Algiers PNC (Nov 1988):** Proclaimed the State of Palestine, implicitly recognizing Israel by accepting UN Res 181.',
            '**Geneva UN Speech (Dec 1988):** Explicitly accepted UN Res 242 and renounced terrorism "in all its forms."',
            '**US Dialogue Opened:** Secretary of State George Shultz ended 13-year diplomatic boycott, opening direct talks with PLO.',
          ],
        },
        {
          title: '4. The Madrid Conference (1991)',
          points: [
            '**Gulf War Impact:** Arafat backed Saddam Hussein in 1991, losing Gulf funding; US victory left Washington undisputed superpower.',
            '**George H.W. Bush Pressure:** Bush threatened to withhold $10 billion in housing loan guarantees to force Israel to negotiate.',
            '**Historic Assembly:** First time Israeli, Syrian, Lebanese, and Palestinian representatives sat together in public diplomacy.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'The First Intifada (1987)',
          def: 'The spontaneous Palestinian civil uprising ("shaking off") against Israeli military occupation.',
        },
        {
          term: 'Jabalya Camp',
          def: 'Overcrowded Gaza refugee camp where a fatal traffic crash on 8 Dec 1987 triggered the Intifada.',
        },
        {
          term: 'UNLU',
          def: 'Unified National Leadership of the Uprising, local grassroots committees coordinating strikes and boycotts.',
        },
        {
          term: 'Hamas',
          def: 'Islamic Resistance Movement founded in 1987 by Sheikh Yassin, rejecting peace and pledging armed destruction of Israel.',
        },
        {
          term: 'Sheikh Ahmed Yassin',
          def: 'Charismatic founder and spiritual leader of Hamas, assassinated by an Israeli missile strike in 2004.',
        },
        {
          term: 'Madrid Conference (1991)',
          def: 'Landmark peace conference co-sponsored by the US and USSR bringing Arab states and Israel to direct talks.',
        },
      ],
      causalFactors: [
        '**1. Demographic Pressure & Economic Exploitation:** 20 years of military rule created a young, educated, but unemployed population with nothing to lose.',
        "**2. Television & Shifting Global Sympathy:** Nightly news broadcasts of stone-throwing children facing heavily armed soldiers shattered Israel's international PR.",
        '**3. Strategic Catalyst for Oslo:** Yitzhak Rabin realized that military force could not permanently suppress 1.5 million Palestinians, paving the path to compromise.',
      ],
      examinerTraps: [
        {
          trap: 'Assuming Yasser Arafat and the PLO orchestrated the outbreak of the Intifada.',
          correction:
            'The uprising erupted spontaneously from local youths inside Gaza; the exiled PLO leadership in Tunis was caught completely by surprise.',
        },
        {
          trap: 'Believing the First Intifada was primarily a campaign of suicide bombings.',
          correction:
            'The First Intifada was overwhelmingly a civil protest: commercial strikes, tax refusal, graffiti, and stone-throwing. Suicide bombings emerged later (1994).',
        },
        {
          trap: 'Assuming Hamas and the PLO worked as cooperative allies.',
          correction:
            "Hamas was formed specifically to oppose the PLO's secular nationalism, violently rejecting Arafat's diplomatic recognition of Israel.",
        },
      ],
    },
    right: {
      narrative: {
        num: '2',
        stem: 'Write a narrative account analysing the events of the First Palestinian Intifada (1987–93).',
        marks: 8,
        provenance: { tag: 'Edexcel Past Paper', type: 'past' },
        stimulus: [
          'The Jabalya camp road incident (December 1987)',
          'The "Iron Fist" policy and stone-throwing youth',
        ],
        planner: [
          {
            stage: 'Stage 1: The Outbreak & Civil Revolt (Dec 1987)',
            detail:
              'Jabalya tank transporter crash kills 4 workers; funerals erupt into riots; UNLU coordinates civil disobedience, strikes, and stone-throwing.',
          },
          {
            stage: 'Stage 2: Escalation, "Iron Fist" & Hamas (1988–90)',
            detail:
              'Rabin implements "force, might, and beatings"; global media broadcasts brutal beatings; Sheikh Yassin founds Hamas to wage holy war.',
          },
          {
            stage: 'Stage 3: Political Breakthrough & Madrid (1991–93)',
            detail:
              'Intifada convinces Rabin occupation is unsustainable; Arafat renounces terrorism; US forces Madrid Conference (1991), opening secret Oslo channel.',
          },
        ],
        techniqueTip:
          'Demonstrate clear cause-and-effect: show how the media backlash against the "Iron Fist" policy and the emergence of Hamas created an urgent crisis that forced Israeli and PLO moderates to seek the Oslo peace channel.',
        lines: 24,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // SPREAD 12 (KT 3.4): THE OSLO PEACE PROCESS & ITS FRAGILITY (1988–95)
  // ---------------------------------------------------------------------------
  {
    id: 'cme_spread_12',
    topic: 'Key Topic 3 • Attempts at a Solution, 1974–95',
    title: 'KT 3.4: The Oslo Peace Process & Its Fragility (1988–95)',
    examType: 'consequence_4m',
    left: {
      tag: 'KT 3.4 • Deep Knowledge Masterclass',
      headline: 'The Fragile Handshake: Mutual Recognition, Divided Land & Extremist Sabotage',
      summary:
        "With public negotiations stalled after Madrid, Norwegian academics set up backchannel secret talks in an Oslo forest in 1993 between Israeli academics and PLO officials. The breakthrough produced the historic Letters of Mutual Recognition: Israel recognized the PLO as the representative of the Palestinian people, while Arafat recognized Israel's right to exist in peace and explicitly renounced terrorism. On 13 September 1993, Yitzhak Rabin and Yasser Arafat shook hands on the White House lawn before President Bill Clinton, signing the Declaration of Principles (Oslo I). The accord created the Palestinian National Authority (PNA) to govern Gaza and Jericho, followed in 1995 by Oslo II, which divided the West Bank into Areas A, B, and C. However, the process was sabotaged by extremists on both sides: Hamas launched suicide bus bombings to destroy the talks, while a Jewish fanatic assassinated Prime Minister Rabin in Tel Aviv on 4 November 1995, plunging the peace process into permanent crisis.",
      pillars: [
        {
          title: 'The Oslo I Accord (1993)',
          subtitle: 'Declaration of Principles (DOP)',
          bullets: [
            "**Mutual Recognition:** Israel recognised the PLO; PLO recognised Israel's right to exist in peace and security.",
            '**Creation of PNA:** Established interim Palestinian self-government for a 5-year transitional period.',
            '**Gaza-Jericho First (1994):** Israeli troops withdrew from Gaza Strip and Jericho; Arafat returned from exile to head the PNA.',
          ],
        },
        {
          title: 'The Oslo II Agreement (1995)',
          subtitle: 'Partition of the West Bank (Areas A, B, C)',
          bullets: [
            '**Area A (3%):** Full Palestinian civil and security control (major cities like Ramallah, Nablus, Bethlehem).',
            '**Area B (24%):** Palestinian civil administration, but shared Israeli-Palestinian military security.',
            '**Area C (73%):** Complete Israeli civil and military control (contained all Jewish settlements, bypass roads, Jordan Valley).',
          ],
        },
        {
          title: 'The Extremist Backlash',
          subtitle: "Suicide Bombs & Rabin's Assassination",
          bullets: [
            "**Baruch Goldstein (Feb 1994):** Jewish extremist massacred 29 Muslims praying in Hebron's Ibrahimi Mosque.",
            '**Hamas Suicide Campaign:** Retaliated with suicide bus bombings in Tel Aviv and Jerusalem, shattering Israeli public faith in peace.',
            '**4 Nov 1995:** Jewish religious extremist **Yigal Amir** assassinated Prime Minister Yitzhak Rabin at a peace rally in Tel Aviv.',
          ],
        },
      ],
      deepKnowledgeGrid: [
        {
          title: '1. Deferred "Final Status" Issues',
          points: [
            '**Postponed Problems:** Negotiators deliberately delayed the hardest issues: Jerusalem, refugee Right of Return, and permanent borders.',
            '**Fatal Flaw:** Both sides operated under different assumptions: Palestinians expected a fully sovereign state; Israel expected demilitarised autonomy.',
            '**Settlement Growth:** Israeli settlement construction continued unabated under Oslo, doubling settler populations by 2000.',
          ],
        },
        {
          title: '2. Israel-Jordan Peace Treaty (1994)',
          points: [
            '**26 Oct 1994:** King Hussein and Yitzhak Rabin signed formal peace treaty at Wadi Araba, witnessed by Clinton.',
            '**Second Arab Accord:** Jordan became only the second Arab state to normalize relations with Israel.',
            "**Water & Shrines:** Resolved Jordan River water rights and recognized Jordan's special role as custodian of Muslim holy shrines in Jerusalem.",
          ],
        },
        {
          title: "3. Arafat's Governance Dilemma",
          points: [
            "**Security Contractor Accusations:** Radical Palestinians accused PNA police of acting as Israel's subcontractors to suppress Hamas.",
            '**Corruption & Nepotism:** Return of elderly PLO "Tunisian faction" alienated local West Bank youth who had fought the Intifada.',
            '**Fragmented Archipelago:** Area A cities became isolated islands surrounded by Israeli checkpoints and Area C territory.',
          ],
        },
        {
          title: '4. The Death of the Peace Camp',
          points: [
            '**Incitement against Rabin:** Right-wing opposition (including Benjamin Netanyahu) held rallies depicting Rabin in Nazi SS uniform.',
            "**Yigal Amir's Motive:** Believed Jewish religious law (Din Rodef) permitted killing a prime minister who surrendered God's land.",
            '**1996 Election:** Following a wave of Hamas suicide bombs, Likud candidate Benjamin Netanyahu narrowly defeated Shimon Peres.',
          ],
        },
      ],
      vocabBank: [
        {
          term: 'Oslo Accords (1993)',
          def: 'Historic breakthrough agreements establishing mutual recognition and interim Palestinian self-rule.',
        },
        {
          term: 'Yitzhak Rabin',
          def: 'Israeli Prime Minister who signed the Oslo Accords; awarded Nobel Peace Prize; assassinated 4 Nov 1995.',
        },
        {
          term: 'Palestinian National Authority',
          def: 'Interim Palestinian governing body created under Oslo to administer Palestinian population centers.',
        },
        {
          term: 'Areas A, B, and C',
          def: 'Territorial division of the West Bank created under Oslo II in 1995.',
        },
        {
          term: 'Yigal Amir',
          def: 'Right-wing Jewish extremist who assassinated Prime Minister Yitzhak Rabin to derail the Oslo peace process.',
        },
        {
          term: 'Israel-Jordan Treaty (1994)',
          def: 'Peace agreement normalizing diplomatic relations and border security between Israel and Jordan.',
        },
      ],
      causalFactors: [
        '**1. Asymmetric Postponement Strategy:** By deferring the critical issues of Jerusalem and settlements, the peace process left room for bad-faith expansion on the ground.',
        '**2. Terrorist Spoiling Dynamics:** Hamas and Islamic Jihad deliberately timed suicide bombings before elections to drive the Israeli public toward right-wing parties.',
        '**3. The Tragic Decapitation of Leadership:** The murder of Yitzhak Rabin removed the only Israeli leader with the security credentials and political courage to enforce territorial compromise.',
      ],
      examinerTraps: [
        {
          trap: 'Believing the Oslo Accords created a fully sovereign independent State of Palestine.',
          correction:
            'Oslo created the Palestinian National Authority (PNA) as an interim self-governing administration, not an independent state.',
        },
        {
          trap: 'Assuming Yigal Amir was an Arab terrorist.',
          correction:
            "Yigal Amir was an orthodox Jewish extremist law student who opposed Rabin's surrender of biblical West Bank land.",
        },
        {
          trap: 'Claiming that the Oslo Accords collapsed immediately in 1993.',
          correction:
            "Oslo progressed through Oslo I (1993), Gaza-Jericho (1994), Jordan Treaty (1994), and Oslo II (1995) before being derailed by Rabin's murder and Hamas bombings.",
        },
      ],
    },
    right: {
      q1: {
        num: '1 (a)',
        stem: 'Explain one consequence of the Oslo II agreement (1995) for Palestinian self-rule in the West Bank.',
        marks: 4,
        provenance: { tag: 'Unexamined Spec Target', type: 'unexamined' },
        guide: {
          pathwayA:
            'Pathway A (Territorial Fragmentation & Enclaves): Division into Areas A, B, and C &rarr; Area A gave civil/security control over only 3% of land &rarr; Area C (73%) remained under exclusive Israeli military control &rarr; West Bank fragmented into isolated enclaves separated by checkpoints.',
          pathwayB:
            'Pathway B (Establishment of Direct Palestinian Governance): Transfer of authority &rarr; PNA established civilian ministries, elected legislative council, and deployed civil police force in major cities (Ramallah, Nablus, Bethlehem) &rarr; first time Palestinians governed their own civic affairs.',
        },
        modelAnswer:
          'One consequence of the Oslo II agreement was the fragmentation of the West Bank into disconnected Palestinian enclaves. Signed in September 1995, the accord divided the West Bank into three separate administrative zones: Area A (3% of land, covering major cities under full Palestinian control), Area B (24%, under Palestinian civil and shared security control), and Area C (73%, under exclusive Israeli civil and military control). Consequently, because Israel retained total control over Area C—which contained all Jewish settlements, bypass roads, and open land—Palestinian towns became isolated islands completely surrounded by Israeli military checkpoints, severely restricting freedom of movement and preventing the development of a contiguous territory.',
        examinerNote:
          'Level 2 (4/4 marks): Identifies ONE distinct consequence (fragmentation of the West Bank into isolated enclaves), supports with precise specification facts (September 1995, Areas A, B, C with exact percentages and roles), and establishes a complete causal chain to military checkpoints and movement restrictions.',
      },
      practice: {
        num: '1 (b) Practice',
        stem: 'Explain one consequence of the assassination of Yitzhak Rabin (November 1995) for the Oslo peace process.',
        marks: 4,
        lines: 9,
        factPills: [
          '4 November 1995 peace rally',
          'Yigal Amir',
          'Shattered Israeli peace movement',
          '1996 election of Benjamin Netanyahu and slowdown of territorial handovers',
        ],
      },
    },
  },
];

// =============================================================================
// HELPER FUNCTIONS: PAGE RENDERING & LAYOUT
// =============================================================================

function renderLeftPage(data, pageNum, spreadNum) {
  const left = data.left;
  const deepGrid = left.deepKnowledgeGrid || [];
  const vocab = left.vocabBank || [];
  const causal = left.causalFactors || [];
  const traps = left.examinerTraps || [];

  const pillarsHtml = left.pillars
    .map((pillar) => {
      const bulletsHtml = pillar.bullets
        .map((b) => `<li style="margin-bottom: 2px;">${formatMd(b)}</li>`)
        .join('');
      return `
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 4px; padding: 7px 9px; flex: 1; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
          <div style="font-size: 8.4pt; font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 1px;">${pillar.title}</div>
          <div style="font-size: 6.8pt; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 0.3px;">${pillar.subtitle || ''}</div>
        </div>
        <ul style="margin: 0; padding-left: 12px; font-size: 7.1pt; color: #334155; line-height: 1.34; flex: 1;">
          ${bulletsHtml}
        </ul>
      </div>
    `;
    })
    .join('');

  const colsHtml = deepGrid
    .map((col) => {
      const ptsHtml = col.points
        .map((pt) => `<li style="margin-bottom: 2px;">${formatMd(pt)}</li>`)
        .join('');
      return `
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 7px;">
        <div style="font-size: 7.2pt; font-weight: 800; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px; margin-bottom: 2px;">
          ${col.title}
        </div>
        <ul style="margin: 0; padding-left: 10px; font-size: 6.8pt; color: #1e293b; line-height: 1.30;">
          ${ptsHtml}
        </ul>
      </div>
    `;
    })
    .join('');

  const deepGridHtml = `
    <div style="border: 1.5px solid #334155; border-radius: 4px; padding: 6px 9px; background: #fafafa;">
      <div style="font-size: 7.6pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 4px; display: flex; justify-content: space-between;">
        <span>Core Knowledge Matrix &bull; Specification Evidence:</span>
        <span style="color: #64748b; font-weight: 700;">Textbook Grounded Evidence</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
        ${colsHtml}
      </div>
    </div>
  `;

  const vItems = vocab
    .map(
      (v) =>
        `<div style="margin-bottom: 1.5px;"><strong>${v.term}:</strong> ${formatMd(v.def)}</div>`,
    )
    .join('');
  const vocabHtml = `
    <div style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; font-size: 6.9pt; line-height: 1.30; color: #334155;">
      <div style="font-size: 7.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5px;">
        Key Terminology &amp; Analytical Vocabulary:
      </div>
      ${vItems}
    </div>
  `;

  const cItems = causal
    .map((c) => `<div style="margin-bottom: 1.5px;">${formatMd(c)}</div>`)
    .join('');
  const causalHtml = `
    <div style="flex: 1.2; background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 6px 8px; font-size: 6.9pt; line-height: 1.30; color: #78350f;">
      <div style="font-size: 7.2pt; font-weight: 800; color: #92400e; text-transform: uppercase; margin-bottom: 3px; border-bottom: 1px solid #fef3c7; padding-bottom: 1.5px;">
        Causal Factors &amp; Historical Analysis:
      </div>
      ${cItems}
    </div>
  `;

  const tItems = traps
    .map(
      (t) => `
    <div style="margin-bottom: 1.5px;">
      <strong>&bull; Common Error:</strong> ${formatMd(t.trap)}<br/>
      <strong style="color: #0284c7;">&rarr; How to improve:</strong> ${formatMd(t.correction)}
    </div>
  `,
    )
    .join('');

  const trapsHtml = `
    <div style="background: #ffffff; border: 1.5px solid #b91c1c; border-radius: 4px; padding: 6px 9px; font-size: 6.8pt; line-height: 1.30; color: #1e293b;">
      <div style="font-size: 7.2pt; font-weight: 800; color: #b91c1c; text-transform: uppercase; margin-bottom: 3px; display: flex; justify-content: space-between;">
        <span>Examiner Pitfalls &amp; High-Yield Distinction Corrections:</span>
        <span style="font-size: 6.4pt; color: #7f1d1d;">Avoid Generalised Assertions</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        ${tItems}
      </div>
    </div>
  `;

  return `
    <div class="page" id="spread-${spreadNum}-left" data-page="${pageNum}" data-spread="${spreadNum}">
      <span id="page_${pageNum}" style="display:none;"></span>
      <div class="page-header">
        <div>
          <span class="archival-tag">${data.topic}</span>
          <h2 class="page-title">${data.title}</h2>
        </div>
        <div class="page-badge">Paper 2 &bull; Deep Knowledge</div>
      </div>

      <div class="masterclass-container" style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <div style="background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 4px; padding: 6px 10px;">
          <div style="font-size: 8.8pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">${left.headline}</div>
          <div style="font-size: 7.4pt; color: #334155; line-height: 1.36;">${left.summary}</div>
        </div>

        <div style="display: flex; gap: 6px;">
          ${pillarsHtml}
        </div>

        ${deepGridHtml}

        <div style="display: flex; gap: 6px;">
          ${vocabHtml}
          ${causalHtml}
        </div>

        ${trapsHtml}
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">${pageNum}</span>
      </div>
    </div>
  `;
}

function renderRightPage(data, pageNum, spreadNum) {
  const right = data.right;
  let examContentHtml = '';

  if (data.examType === 'consequence_4m') {
    const q1 = right.q1;
    const practice = right.practice;

    examContentHtml = `
      <!-- Q1(a) Masterclass with Annotated Level 2 Model -->
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 4px; padding: 6px 9px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <span style="font-size: 8.8pt; font-weight: 800; color: #0f172a;">
            <strong>Question ${q1.num}:</strong> ${q1.stem}
          </span>
          <span style="font-size: 8.4pt; font-weight: 800; color: #0f172a; white-space: nowrap;">(4 Marks)</span>
        </div>
        <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 4px;">
          <span class="exam-provenance-pill ${q1.provenance.type}">${q1.provenance.tag}</span>
          <span style="font-size: 6.8pt; color: #64748b; font-weight: 600;">Spend approx. 6 minutes &bull; Level 2 Maximum: 4 Marks</span>
        </div>

        <!-- Multi-Pathway Causal Guide -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 7px; margin-bottom: 5px; font-size: 6.8pt; line-height: 1.30; color: #1e293b;">
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 6.6pt; display: block; margin-bottom: 1px;">Choose ONE Valid Causal Pathway:</strong>
          <div>&bull; <strong>Option A (Direct / Immediate Shock):</strong> ${q1.guide.pathwayA}</div>
          <div>&bull; <strong>Option B (Systemic / Strategic Outcome):</strong> ${q1.guide.pathwayB}</div>
        </div>

        <!-- Annotated Level 2 Model Answer -->
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 3px; padding: 5px 8px; margin-bottom: 4px; font-size: 7.2pt; line-height: 1.35; color: #14532d;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <strong style="text-transform: uppercase; font-size: 6.6pt; color: #15803d;">★ Pearson Level 2 Benchmark Model Answer (4/4 Marks):</strong>
            <span style="font-size: 6.4pt; font-weight: 700; color: #166534;">Full Marks</span>
          </div>
          <p style="margin: 0; font-style: italic;">"${q1.modelAnswer}"</p>
        </div>

        <div style="font-size: 6.4pt; color: #334155; line-height: 1.25;">
          <strong>Examiner Assessment Commentary:</strong> ${q1.examinerNote}
        </div>
      </div>

      <!-- Practice Question with Handwriting Lines -->
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 4px; padding: 6px 9px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <span style="font-size: 8.8pt; font-weight: 800; color: #0f172a;">
            <strong>Question ${practice.num}:</strong> ${practice.stem}
          </span>
          <span style="font-size: 8.4pt; font-weight: 800; color: #0f172a; white-space: nowrap;">(4 Marks)</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-size: 6.8pt; color: #64748b; font-weight: 600;">Timed Student Execution &bull; Target: 6 Minutes</span>
          <div style="display: flex; gap: 4px;">
            ${practice.factPills.map((p) => `<span class="scaffold-pill">${p}</span>`).join('')}
          </div>
        </div>

        ${renderLines(practice.lines)}

        <!-- Self-Assessment Rubric -->
        <div style="border-top: 1px solid #cbd5e1; padding-top: 3px; margin-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 6.6pt; color: #475569;">
          <div>
            <strong>Level 2 Audit:</strong> [1] Stated single consequence &rarr; [2] Added specific facts &rarr; [3] Traced 3-step causal chain.
          </div>
          <div style="border: 1px solid #0f172a; border-radius: 3px; padding: 1.5px 6px; font-weight: 800; color: #0f172a;">
            Score: _____ / 4
          </div>
        </div>
      </div>
    `;
  } else if (data.examType === 'narrative_8m') {
    const q2 = right.narrative;

    examContentHtml = `
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 4px; padding: 6px 9px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <span style="font-size: 8.8pt; font-weight: 800; color: #0f172a;">
            <strong>Question ${q2.num}:</strong> ${q2.stem}
          </span>
          <span style="font-size: 8.4pt; font-weight: 800; color: #0f172a; white-space: nowrap;">(8 Marks)</span>
        </div>
        <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 4px;">
          <span class="exam-provenance-pill ${q2.provenance.type}">${q2.provenance.tag}</span>
          <span style="font-size: 6.8pt; color: #64748b; font-weight: 600;">Spend approx. 12 minutes &bull; Level 3 Maximum: 8 Marks</span>
        </div>

        <!-- Stimulus Card -->
        <div class="stimulus-card" style="margin-bottom: 4px;">
          You may use the following in your answer:
          <ul style="margin: 1px 0 1px 16px; padding: 0;">
            <li><strong>${q2.stimulus[0]}</strong></li>
            <li><strong>${q2.stimulus[1]}</strong></li>
          </ul>
          <span style="display: block; font-style: italic; color: #475569; font-size: 6.6pt;">(You must also use information of your own.)</span>
        </div>

        <!-- Chronological 3-Stage Narrative Planner -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 7px; margin-bottom: 4px;">
          <div style="font-size: 6.8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
            Chronological 3-Stage Architecture (Beginning &rarr; Turning Point &rarr; Outcome):
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-size: 6.4pt; line-height: 1.25;">
            ${q2.planner
              .map(
                (p) => `
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 2px; padding: 3px 5px;">
                <strong style="color: #0284c7; display: block;">${p.stage}</strong>
                <span>${p.detail}</span>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 3px 6px; margin-bottom: 4px; font-size: 6.6pt; color: #1e3a8a; line-height: 1.25;">
          <strong>Exam Technique Formula:</strong> ${q2.techniqueTip}
        </div>

        ${renderLines(q2.lines)}

        <!-- Examiner Level 3 Audit -->
        <div style="border-top: 1px solid #cbd5e1; padding-top: 3px; margin-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 6.6pt; color: #475569;">
          <div>
            <strong>Level 3 Audit (7–8m):</strong> [1] Chronological flow &rarr; [2] Direct causal links (no gaps) &rarr; [3] Beyond stimulus own knowledge.
          </div>
          <div style="border: 1.5px solid #0284c7; background: #0284c7; color: #fff; border-radius: 3px; padding: 1.5px 6px; font-weight: 800;">
            Score: _____ / 8
          </div>
        </div>
      </div>
    `;
  } else if (data.examType === 'importance_8m') {
    const q3 = right.importance;

    examContentHtml = `
      <div style="background: #ffffff; border: 1.5px solid #0f172a; border-radius: 4px; padding: 6px 9px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <span style="font-size: 8.8pt; font-weight: 800; color: #0f172a;">
            <strong>Question ${q3.num}:</strong> ${q3.stem}
          </span>
          <span style="font-size: 8.4pt; font-weight: 800; color: #0f172a; white-space: nowrap;">(8 Marks)</span>
        </div>
        <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 4px;">
          <span class="exam-provenance-pill ${q3.provenance.type}">${q3.provenance.tag}</span>
          <span style="font-size: 6.8pt; color: #64748b; font-weight: 600;">Spend approx. 12 minutes &bull; Level 3 Maximum: 8 Marks</span>
        </div>

        <div class="focus-guidance" style="margin-bottom: 4px;">
          <strong>Examiner Guidance:</strong> ${q3.focus}
        </div>

        <!-- Dual-Paragraph Focus Scaffolding -->
        <div class="importance-scaffold-stack" style="margin-bottom: 4px;">
          <div class="scaffold-focus-row">
            <span class="scaffold-badge">Paragraph 1 Focus</span>
            <span class="scaffold-text">${q3.p1Focus}</span>
          </div>
          <div class="scaffold-focus-row">
            <span class="scaffold-badge">Paragraph 2 Focus</span>
            <span class="scaffold-text">${q3.p2Focus}</span>
          </div>
        </div>

        <!-- Annotated Level 3 Exemplar Paragraph -->
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 3px; padding: 4px 7px; margin-bottom: 4px; font-size: 7.0pt; line-height: 1.32; color: #14532d;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 1.5px;">
            <strong style="text-transform: uppercase; font-size: 6.6pt; color: #15803d;">★ Model Explanatory Paragraph (Level 3 Standard):</strong>
            <span style="font-size: 6.4pt; font-weight: 700; color: #166534;">Analysis, Not Storytelling</span>
          </div>
          <p style="margin: 0; font-style: italic;">"${q3.modelParagraph}"</p>
        </div>

        ${renderLines(q3.lines)}

        <!-- Examiner Level 3 Audit -->
        <div style="border-top: 1px solid #cbd5e1; padding-top: 3px; margin-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 6.6pt; color: #475569;">
          <div>
            <strong>Level 3 Audit (7–8m):</strong> Two developed paragraphs analyzing significance/impact, NOT narrative description.
          </div>
          <div style="border: 1.5px solid #0284c7; background: #0284c7; color: #fff; border-radius: 3px; padding: 1.5px 6px; font-weight: 800;">
            Score: _____ / 8
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="page" id="spread-${spreadNum}-right" data-page="${pageNum}" data-spread="${spreadNum}">
      <span id="page_${pageNum}" style="display:none;"></span>
      <div class="page-header">
        <div>
          <span class="archival-tag">${data.topic}</span>
          <h2 class="page-title">Exam Masterclass: ${data.title.split(': ')[1]}</h2>
        </div>
        <div class="page-badge">${data.examType.replace('_', ' ').toUpperCase()}</div>
      </div>

      <div class="masterclass-container" style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        ${examContentHtml}
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">${pageNum}</span>
      </div>
    </div>
  `;
}

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
    padding: 22px 26px;
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
    padding-bottom: 4px;
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
    font-size: 10.5pt;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
    line-height: 1.15;
  }
  .page-badge {
    background: #0f172a;
    color: #ffffff;
    font-size: 6.4pt;
    font-weight: 700;
    padding: 2.5px 6px;
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
    font-size: 7.5pt;
  }

  /* Ruled lines for handwriting */
  .line {
    height: 7.2mm;
    border-bottom: 1.2px solid #475569;
    width: 100%;
    box-sizing: border-box;
  }

  /* Provenance Badges */
  .exam-provenance-pill {
    font-size: 6.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 1px 4px;
    border-radius: 2.5px;
    display: inline-block;
    line-height: 1.25;
  }
  .exam-provenance-pill.past {
    background: #f1f5f9;
    border: 1px solid #475569;
    color: #1e293b;
  }
  .exam-provenance-pill.specimen {
    background: #f0fdfa;
    border: 1px solid #0d9488;
    color: #0f766e;
  }
  .exam-provenance-pill.unexamined {
    background: #fffbeb;
    border: 1px solid #d97706;
    color: #92400e;
  }
  .exam-provenance-pill.forecast {
    background: #eef2ff;
    border: 1px solid #4338ca;
    color: #3730a3;
  }

  .scaffold-pill {
    display: inline-block;
    background: #fff;
    border: 1px solid #94a3b8;
    border-radius: 2px;
    padding: 0.5px 4px;
    font-size: 6.4pt;
    font-weight: 700;
    color: #0f172a;
    white-space: nowrap;
  }

  .stimulus-card {
    border: 1px solid #64748b;
    border-radius: 3px;
    background: #f8fafc;
    padding: 4px 7px;
    font-size: 7.0pt;
    line-height: 1.25;
  }

  .focus-guidance {
    font-size: 7.0pt;
    color: #334155;
    font-style: italic;
    line-height: 1.25;
  }

  .importance-scaffold-stack {
    border: 1.2px solid #334155;
    border-radius: 3px;
    background: #f8fafc;
    padding: 3px 6px;
    font-size: 6.9pt;
    line-height: 1.25;
  }
  .scaffold-focus-row {
    display: flex;
    align-items: baseline;
    gap: 5px;
    padding: 1.5px 0;
    border-bottom: 1px solid #e2e8f0;
  }
  .scaffold-focus-row:last-child {
    border-bottom: none;
  }
  .scaffold-badge {
    font-size: 6.4pt;
    font-weight: 800;
    text-transform: uppercase;
    color: #0369a1;
    background: #e0f2fe;
    padding: 1px 4px;
    border-radius: 2px;
    white-space: nowrap;
  }
  .scaffold-text {
    font-size: 6.8pt;
    color: #1e293b;
  }

  /* Cover Styling */
  .cover-border {
    border: 2.5px solid #0f172a;
    outline: 1px solid #0284c7;
    outline-offset: -5px;
    height: 100%;
    border-radius: 4px;
    padding: 22px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
  }
`;

// =============================================================================
// HTML BUILDER: FULL 28-PAGE MASTER VOLUME
// =============================================================================
function generateFullHTML() {
  // Page 1: Official Pearson Edexcel Examination Cover
  const page1 = `
    <div class="page" id="page_1" data-page="1">
      <div class="cover-border">
        <!-- Header -->
        <div style="border-bottom: 2px solid #0f172a; padding-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 8pt; font-weight: 800; letter-spacing: 0.8px; color: #0284c7; text-transform: uppercase;">
            ARCHIVAL STUDY COMPENDIUM &bull; GCSE (9–1) REVISION SERIES
          </span>
          <span style="font-size: 7.5pt; font-weight: 700; color: #475569;">
            Option P5 &bull; Paper 2 Period Study
          </span>
        </div>

        <!-- Main Title -->
        <div style="margin: 12px 0 6px 0; text-align: center;">
          <h1 style="font-family: 'Playfair Display', serif; font-size: 23pt; font-weight: 800; color: #0f172a; margin: 0 0 5px 0; line-height: 1.1;">
            Conflict in the Middle East, 1945–1995
          </h1>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; font-weight: 700; color: #0284c7; margin: 0 0 6px 0;">
            Visual Revision Masterclasses &amp; Exam Technique Guide
          </h2>
          <div style="font-size: 7.6pt; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px;">
            12 Double-Page Spreads &bull; 4-4-4 Question Matrix &bull; 100% Specification Mastery
          </div>
        </div>

        <!-- Hero Image -->
        <div style="height: 170px; border: 1.5px solid #0f172a; border-radius: 4px; overflow: hidden; background: #0f172a; position: relative;">
          <img src="${getImageDataUri('images/cme_treaty_triple_handshake_1979.jpg')}" style="width: 100%; height: 100%; object-fit: cover; object-position: center 25%; opacity: 0.92;" alt="Camp David Accords 1979" />
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(15, 23, 42, 0.85); color: #fff; padding: 3px 8px; font-size: 6.8pt; display: flex; justify-content: space-between;">
            <span>Historical Keystone: The Treaty of Washington (26 March 1979)</span>
            <span>President Anwar Sadat, President Jimmy Carter, Prime Minister Menachem Begin</span>
          </div>
        </div>

        <!-- Key Topic Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 8px 0;">
          <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 7px 9px;">
            <div style="font-size: 6.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">Key Topic 1 &bull; 1945–63</div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 9.6pt; color: #0f172a; margin: 0 0 3px 0;">The Birth of Israel</h3>
            <p style="font-size: 6.8pt; color: #334155; line-height: 1.30; margin: 0;">British Mandate collapse, UN Partition 181, 1948–49 War, Palestinian Nakba, creation of IDF, and 1956 Suez Crisis.</p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 7px 9px;">
            <div style="font-size: 6.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">Key Topic 2 &bull; 1964–73</div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 9.6pt; color: #0f172a; margin: 0 0 3px 0;">The Escalating Conflict</h3>
            <p style="font-size: 6.8pt; color: #334155; line-height: 1.30; margin: 0;">1967 Six Day War blitz, occupied territories, UN Res 242, rise of PLO, Black September 1970, and 1973 Yom Kippur War.</p>
          </div>
          <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 7px 9px;">
            <div style="font-size: 6.8pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 2px;">Key Topic 3 &bull; 1974–95</div>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 9.6pt; color: #0f172a; margin: 0 0 3px 0;">Attempts at a Solution</h3>
            <p style="font-size: 6.8pt; color: #334155; line-height: 1.30; margin: 0;">Camp David Accords 1978, 1982 Lebanon War, Sabra &amp; Shatila, First Intifada 1987, and 1993–95 Oslo Peace Process.</p>
          </div>
        </div>

        <!-- Pupil & Department Signoff -->
        <div style="border-top: 1.5px solid #0f172a; padding-top: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 7.2pt; color: #475569;">
          <div>
            <strong style="color: #0f172a;">MEONCROSS SCHOOL HISTORY DEPARTMENT</strong> &bull; GCSE History Masterclass Series<br/>
            <span>Candidate Name: ____________________________________ &bull; Class: Year 11 &bull; Teacher: Mr Lovett</span>
          </div>
          <div style="text-align: right;">
            <span style="font-weight: 800; color: #0284c7; text-transform: uppercase;">Pearson Edexcel 1HI0/P5</span><br/>
            <span>28-Page Master Volume &bull; 0 Overflows</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Page 2: Paper 2 Period Study Blueprint & Exam Architecture
  const page2 = `
    <div class="page" id="page_2" data-page="2">
      <div class="page-header">
        <div>
          <span class="archival-tag">Paper 2 Blueprint &bull; Period Study</span>
          <h2 class="page-title">Edexcel GCSE Paper 2: Exam Architecture &amp; Command Words Guide</h2>
        </div>
        <div class="page-badge">Total Marks: 32 &bull; Time: 50 Mins</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <!-- Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 10px 14px; border-radius: 4px; border-left: 4px solid #0284c7;">
          <div style="font-size: 10.5pt; font-weight: 800; margin-bottom: 2px;">
            Pearson Edexcel GCSE (9–1) History &bull; Paper 2 Period Study (Option P5) Blueprint
          </div>
          <div style="font-size: 7.6pt; color: #cbd5e1; line-height: 1.35;">
            Paper 2 Period Study tests knowledge recall and historical causation across three distinct question types. Candidates have 50 minutes to complete 32 raw marks (approx. 1.5 minutes per mark). There are no source utility or interpretation questions in the Period Study.
          </div>
        </div>

        <!-- Question Grid: The 3 Core Question Types -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
          <!-- Q1: Consequence -->
          <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 8px 10px; background: #ffffff;">
            <div style="font-size: 8.4pt; font-weight: 800; color: #0284c7; text-transform: uppercase; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>Question 1: Consequence</span>
              <span>4+4 = 8 Marks</span>
            </div>
            <div style="font-size: 7.0pt; color: #64748b; font-style: italic; margin-bottom: 3px;">
              "Explain one consequence of [event]..."
            </div>
            <ul style="margin: 0; padding-left: 12px; font-size: 6.8pt; color: #334155; line-height: 1.30;">
              <li>Appears twice: 1(a) and 1(b). Candidates answer BOTH questions.</li>
              <li>Spend approx. <strong>6 minutes per question</strong> (write 1 developed paragraph).</li>
              <li>Identify ONE consequence &rarr; State precise facts &rarr; Explain 3-step causal link.</li>
              <li><strong>Do NOT write two consequences;</strong> examiners penalise breadth over depth.</li>
            </ul>
          </div>

          <!-- Q2: Narrative Account -->
          <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 8px 10px; background: #ffffff;">
            <div style="font-size: 8.4pt; font-weight: 800; color: #0284c7; text-transform: uppercase; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>Question 2: Narrative</span>
              <span>8 Marks</span>
            </div>
            <div style="font-size: 7.0pt; color: #64748b; font-style: italic; margin-bottom: 3px;">
              "Write a narrative account analysing..."
            </div>
            <ul style="margin: 0; padding-left: 12px; font-size: 6.8pt; color: #334155; line-height: 1.30;">
              <li>Compulsory question; spend approx. <strong>12 minutes</strong> on continuous prose.</li>
              <li>Structure in 3 chronological acts: <strong>Beginning &rarr; Turning Point &rarr; Outcome</strong>.</li>
              <li>Must address the 2 stimulus points + <strong>compulsory own knowledge</strong>.</li>
              <li>Link events causally: explain *why* event A directly produced event B.</li>
            </ul>
          </div>

          <!-- Q3: Importance -->
          <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 8px 10px; background: #ffffff;">
            <div style="font-size: 8.4pt; font-weight: 800; color: #0284c7; text-transform: uppercase; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>Question 3: Importance</span>
              <span>8+8 = 16 Marks</span>
            </div>
            <div style="font-size: 7.0pt; color: #64748b; font-style: italic; margin-bottom: 3px;">
              "Explain the importance of [X] for [Y]..."
            </div>
            <ul style="margin: 0; padding-left: 12px; font-size: 6.8pt; color: #334155; line-height: 1.30;">
              <li>Choose TWO out of three options: 3(a), 3(b), or 3(c). Spend <strong>12 mins each</strong>.</li>
              <li>Write TWO distinct explanatory paragraphs for each selected question.</li>
              <li>Focus strictly on <strong>significance and impact</strong>, NOT narrative description.</li>
              <li>Deploy analytical stems: *"This was vital because..."*, *"Without this, ..."*</li>
            </ul>
          </div>
        </div>

        <!-- Success Principles -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 8px 11px; background: #fafafa;">
          <div style="font-size: 8.2pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 4px;">
            ★ Four Non-Negotiable Exam Success Principles for Paper 2 Period Study:
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 6.8pt; line-height: 1.30; color: #334155;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 1px;">1. Strict Time Discipline</strong>
              Allocate exactly 12m for Q1 (6m each), 12m for Q2, and 24m for Q3 (12m each). Leave 2 minutes to check dates and spellings.
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 1px;">2. Beyond the Stimulus</strong>
              In Q2 (Narrative), using only the two provided bullet points caps your score at Level 2 (5 marks). You MUST add substantial own knowledge.
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 1px;">3. Causal Transitions</strong>
              In Q2, never write "Then this happened... Next that happened." Use connectives: *"This breathing space allowed the IDF to import Czech arms, which directly enabled..."*
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 5px 7px;">
              <strong style="color: #0284c7; display: block; margin-bottom: 1px;">4. Significance vs Story</strong>
              In Q3 (Importance), examiners penalize candidates who merely describe what happened. Always explain *why* it mattered for the specific outcome named.
            </div>
          </div>
        </div>

        <!-- 4-4-4 Matrix Roadmap -->
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 7px 10px; font-size: 7.0pt; line-height: 1.32; color: #1e3a8a;">
          <strong style="text-transform: uppercase; font-size: 7.2pt; display: block; margin-bottom: 2px;">The 4-4-4 Question Matrix Structure in This Guide:</strong>
          This 28-page master volume contains 12 double-page spreads covering every syllabus bullet point. The right-hand pages enforce an exact 4-4-4 balance: <strong>4x Consequence [4m]</strong> (Spreads 1, 7, 9, 12), <strong>4x Narrative Account [8m]</strong> (Spreads 2, 5, 8, 11), and <strong>4x Importance [8m]</strong> (Spreads 3, 4, 6, 10). Every question format is mastered four times.
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">2</span>
      </div>
    </div>
  `;

  // Page 3: Master Chronology & Conflict Shift Matrix (1945–1995)
  const page3 = `
    <div class="page" id="page_3" data-page="3">
      <div class="page-header">
        <div>
          <span class="archival-tag">Synoptic Chronology &bull; 1945–1995</span>
          <h2 class="page-title">Master Comparative Timeline: Wars, Diplomacy &amp; Territorial Shifts</h2>
        </div>
        <div class="page-badge">50-Year Synoptic Matrix</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <div style="background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 3px; padding: 5px 9px; font-size: 7.2pt; color: #334155; line-height: 1.32;">
          <strong>Chronological Mastery:</strong> Paper 2 requires precise chronological sequencing. Use this master matrix to trace how military conflicts, peace negotiations, and territorial boundaries evolved across five decades.
        </div>

        <!-- 3 Key Topics Comparative Chronology -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; flex: 1; margin: 6px 0;">
          <!-- KT1 Column -->
          <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; font-size: 6.7pt; line-height: 1.28;">
            <div style="font-size: 7.6pt; font-weight: 800; color: #0284c7; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
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
          <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; font-size: 6.7pt; line-height: 1.28;">
            <div style="font-size: 7.6pt; font-weight: 800; color: #0284c7; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
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
          <div style="border: 1.2px solid #0f172a; border-radius: 4px; padding: 7px 8px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; font-size: 6.7pt; line-height: 1.28;">
            <div style="font-size: 7.6pt; font-weight: 800; color: #0284c7; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px; text-transform: uppercase;">
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
        <div style="background: #fafafa; border: 1.5px solid #0f172a; border-radius: 4px; padding: 5px 8px; font-size: 6.8pt; color: #1e293b; line-height: 1.30;">
          <strong>Examiner Synoptic Takeaway:</strong> Notice the decisive historical turning points: <strong>1948</strong> (Statehood &amp; Nakba), <strong>1967</strong> (Quadrupling of Israeli territory &amp; Rise of PLO), <strong>1973</strong> (Shattering of invincibility &amp; Oil weapon), <strong>1979</strong> (First Arab peace treaty), and <strong>1993</strong> (Mutual recognition). Every exam question connects to one of these pivotal transformations.
        </div>
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">3</span>
      </div>
    </div>
  `;

  // Pages 4–27: 12 Double-Page Content Spreads
  let contentPagesHtml = '';
  SPREADS.forEach((spread, idx) => {
    const leftPageNum = 4 + idx * 2;
    const rightPageNum = 5 + idx * 2;
    const spreadNum = idx + 1;
    contentPagesHtml += renderLeftPage(spread, leftPageNum, spreadNum);
    contentPagesHtml += renderRightPage(spread, rightPageNum, spreadNum);
  });

  // Page 28: Master Historiographical Debates & Evaluative Criteria Toolkit
  const page28 = `
    <div class="page" id="page_28" data-page="28">
      <div class="page-header">
        <div>
          <span class="archival-tag">Historiographical Perspectives &bull; Evaluative Synthesis</span>
          <h2 class="page-title">Master Historiographical Debates: Traditional vs. New Historians</h2>
        </div>
        <div class="page-badge">High-Yield Evaluation Toolkit</div>
      </div>

      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 1010px;">
        <div style="background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 3px; padding: 5px 9px; font-size: 7.2pt; color: #334155; line-height: 1.34;">
          <strong>Evaluating Historical Arguments:</strong> High-scoring answers demonstrate awareness that historical events are interpreted differently depending on national perspectives and access to declassified archives. Use this guide to add sophisticated evaluative depth to your extended writing.
        </div>

        <!-- Historiographical Debates Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <!-- Debate 1: The 1948 War and Palestinian Flight -->
          <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.0pt; font-weight: 800; color: #0284c7; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
              Debate 1: The Causes of the 1948 Palestinian Flight (Nakba)
            </div>
            <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.30; margin-bottom: 3px;">
              <strong>Traditional Zionist Narrative:</strong> Palestinian Arabs fled voluntarily, encouraged by Arab radio broadcasts and leaders who promised a triumphant return once the Jewish state was destroyed.
            </div>
            <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.30; margin-bottom: 3px;">
              <strong>Traditional Arab Narrative:</strong> The Zionist leadership implemented a deliberate, premeditated master-plan (Plan Dalet) of ethnic cleansing to expel the native population through terror.
            </div>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 3px; padding: 4px 6px; font-size: 6.6pt; line-height: 1.28; color: #14532d;">
              <strong>"New Historians" Synthesis (Benny Morris, Avi Shlaim):</strong> Declassified Israeli military archives show there was neither a single Arab order to flee nor a universal Zionist expulsion plan. The flight occurred in multiple waves driven by local military assaults, fear of atrocities (Deir Yassin), and direct expulsions in key strategic zones (Lydda and Ramle).
            </div>
          </div>

          <!-- Debate 2: The Origins of the 1967 Six Day War -->
          <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 7px 9px; background: #ffffff;">
            <div style="font-size: 8.0pt; font-weight: 800; color: #0284c7; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
              Debate 2: Was the 1967 War Defensive or Expansionist?
            </div>
            <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.30; margin-bottom: 3px;">
              <strong>Israeli Traditional Perspective:</strong> A textbook act of pre-emptive self-defense against an existential threat. Nasser\'s closure of Tiran, expulsion of UNEF, and bloodcurdling radio threats left Israel with zero choice but to strike first to survive.
            </div>
            <div style="font-size: 6.8pt; color: #1e293b; line-height: 1.30; margin-bottom: 3px;">
              <strong>Revisionist Arab Perspective:</strong> Israel manipulated border tensions with Syria to lure Nasser into a diplomatic trap, using the pre-emptive strike as a pretext to fulfill long-standing territorial ambitions in Jerusalem, the West Bank, and Golan.
            </div>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 3px; padding: 4px 6px; font-size: 6.6pt; line-height: 1.28; color: #14532d;">
              <strong>Academic Consensus (Michael Oren):</strong> The war resulted from an accidental escalatory spiral driven by Soviet false intelligence, Nasser\'s political miscalculations, and Israeli military panic, rather than a planned conspiracy by either side.
            </div>
          </div>
        </div>

        <!-- Debate 3: Why Did the Oslo Peace Process Collapse? -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 7px 9px; background: #ffffff;">
          <div style="font-size: 8.0pt; font-weight: 800; color: #0284c7; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
            Debate 3: Why Did the Oslo Peace Process Ultimately Collapse?
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.7pt; line-height: 1.28; color: #334155;">
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 6px;">
              <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Perspective 1: Palestinian Rejectionism &amp; Terrorism</strong>
              Argues that Yasser Arafat never accepted Israel\'s permanent right to exist. The failure of the PNA to dismantle terrorist groups (Hamas and Islamic Jihad) and the continuous suicide bus bombings destroyed Israeli public trust in territorial compromise.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 6px;">
              <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Perspective 2: Israeli Settlement Colonisation</strong>
              Argues that Israel used Oslo as an umbrella to double its West Bank settler population. By dividing the land into Areas A, B, and C and constructing military bypass roads, Israel made an independent, viable Palestinian state physically impossible.
            </div>
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 4px 6px;">
              <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Perspective 3: The Flawed Incremental Architecture</strong>
              Argues the Oslo framework was fundamentally flawed by deferring the critical "final status" issues (Jerusalem, refugees, borders) to the end. This created an interim vacuum that gave extremists on both sides (Yigal Amir, Hamas) time to sabotage peace.
            </div>
          </div>
        </div>

        <!-- Specification Revision Checklist -->
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 6px 9px;">
          <div style="font-size: 7.4pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px; display: flex; justify-content: space-between;">
            <span>Final Revision Audit: 12 Key Topics Mastered</span>
            <span>Tick Once Revised</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-size: 6.4pt; color: #334155;">
            <div>&bull; [ ] 1.1 British Mandate &amp; Insurgency</div>
            <div>&bull; [ ] 1.2 UN Res 181 &amp; 1948 War</div>
            <div>&bull; [ ] 1.3 Nakba, Refugees &amp; IDF</div>
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
      </div>

      <div class="page-footer">
        <span>Pearson Edexcel GCSE (9–1) History &bull; Option P5: Conflict in the Middle East, 1945–1995</span>
        <span class="page-num">28</span>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Conflict in the Middle East, 1945–1995 — Visual Revision &amp; Exam Technique Guide</title>
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
