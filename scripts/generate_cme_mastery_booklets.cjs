const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const ROOT_DIR = path.join(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');
const specPath = path.join(ROOT_DIR, 'public', 'data', 'cme_new_spec.json');
const bookletsDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'booklets');
const pdfsDir = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new');

if (!fs.existsSync(bookletsDir)) fs.mkdirSync(bookletsDir, { recursive: true });
if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

const KT_DATA = {
  KT1: {
    id: 'KT1',
    title: 'Key Topic 1: The Birth of the State of Israel, 1945–63',
    lessons: [0, 1, 2, 3],
    dates: '1945–1963',
    examSpecTag: 'Option P5 · Key Topic 1 (Lessons 1–4)',
    color: '#0284c7',
    traps: [
      {
        title: 'Partition (1947) vs Armistice (1949)',
        desc: 'Do not confuse the 1947 UN Partition Plan (Res 181, which allocated 55% of Mandatory Palestine to a Jewish state) with the 1949 Armistice Green Line (which enclosed 79% following the 1948–49 War). Res 181 was never implemented as Arab leaders rejected it.',
      },
      {
        title: 'The Turning Point of the 1948–49 War',
        desc: 'The decisive turning point of the 1948–49 War was NOT superior Israeli numbers at the outbreak, but the 4-week UN truce in June 1948. This allowed Israel to import Czech Avia S-199 fighters and rifles, while David Ben-Gurion unified all militias into the IDF.',
      },
      {
        title: 'Suez 1956: Military Victory vs Political Defeat',
        desc: 'Britain and France achieved total military victory in capturing Port Said in November 1956, but suffered a catastrophic political humiliation when US President Eisenhower threatened financial sanctions, forcing an immediate withdrawal and elevating Nasser into a Pan-Arab hero.',
      },
    ],
    round1: {
      consequence: {
        stem: 'Explain one consequence of the bombing of the King David Hotel (1946).',
        marks: 4,
        starter:
          'One consequence was that it shattered British domestic and political resolve to maintain the Palestine Mandate.',
        facts:
          'On 22 July 1946, Irgun militants disguised as milkmen detonated explosives in the basement, killing 91 British, Arab, and Jewish staff and destroying the British administrative secretariat.',
        link: 'This was significant because it forced Prime Minister Clement Attlee’s cabinet to conclude that keeping 100,000 troops in Palestine was unsustainable, prompting Britain to refer the problem to the United Nations in February 1947.',
        stretch:
          'Grade 9 Nuance: Evaluate whether the British decision to quit Palestine was an intended or unintended consequence of the Irgun’s insurgency, and whether economic exhaustion after WW2 made withdrawal inevitable anyway.',
      },
      importance: {
        stem: 'Explain the importance of UN Resolution 181 for the creation of Israel.',
        marks: 8,
        starter:
          'UN Resolution 181 was important for the creation of Israel because it provided essential international legal legitimacy for sovereign statehood.',
        facts:
          'Passed by a 2/3 UN majority on 29 November 1947, allocating 55% of Mandatory Palestine to a Jewish state, 45% to an Arab state, and designating Jerusalem an international corpus separatum under UN administration.',
        link: 'Without this international mandate, David Ben-Gurion would have lacked the diplomatic backing to proclaim the sovereign State of Israel on 14 May 1948, which secured immediate de facto recognition from the USA and USSR.',
        stretch:
          'Grade 9 Evaluation: Counter-factual analysis — explain whether Resolution 181 secured peace or whether its rejection by Arab states guaranteed that statehood could only be finalized through military warfare in 1948–49.',
      },
      narrative: {
        stem: 'Write a narrative account analysing the key events of the Arab-Israeli war (1948–49).',
        stimulus: ['The invasion by Arab armies (May 1948)', 'The June 1948 truce'],
        marks: 8,
        stages: [
          {
            label: 'Stage 1: The Outbreak (May 1948)',
            desc: 'On 15 May 1948, armies from Egypt, Transjordan, Syria, Lebanon, and Iraq invaded simultaneously; Arab forces besieged 100,000 Jews in Jerusalem and advanced towards Tel Aviv.',
          },
          {
            label: 'Stage 2: The Turning Point (June 1948)',
            desc: 'A 4-week UN truce enabled Israel to secretly import Avia S-199 fighters and rifles from Czechoslovakia, while David Ben-Gurion unified Haganah, Irgun, and Lehi into the IDF.',
          },
          {
            label: 'Stage 3: Outcome & Green Line (1948–49)',
            desc: 'IDF counter-offensives broke the siege of Jerusalem via the Burma Road and secured 1949 armistices enclosing 79% of Palestine, creating 700,000 Palestinian refugees (the Nakba).',
          },
        ],
        connectives: [
          'This triggered an immediate...',
          'A decisive turning point occurred when...',
          'Consequently, this enabled the IDF to...',
          'The culmination of this development was...',
        ],
        stretch:
          'Grade 9 Analytical Glue: Avoid writing a descriptive chronological story. Explicitly explain the CAUSAL LINK between the June truce breathing space and Israel’s tactical dominance in the autumn counter-offensives.',
      },
    },
    round2: {
      consequence: {
        stem: 'Explain one consequence of the Israeli attacks on Gaza in 1955.',
        marks: 4,
        factVault: [
          '28 February 1955: IDF paratroopers under Ariel Sharon raided an Egyptian military camp in Gaza.',
          '38 Egyptian soldiers and 8 Israelis were killed, exposing severe Egyptian military deficiencies.',
          'Convinced President Nasser that Western arms embargos left Egypt vulnerable to Israeli aggression.',
        ],
        connectiveVault: [
          'The immediate consequence was...',
          'This directly convinced Nasser to...',
          'As a result, the regional balance of power shifted...',
        ],
        trapAlert:
          'Do not describe how the raid was carried out; focus solely on the political and military consequence for Nasser.',
        upgradeChallenge:
          'Grade 9 Upgrade: Explain how this raid directly drove Nasser to seek Soviet-bloc weaponry, culminating in the September 1955 Czech Arms Deal and triggering the countdown to the Suez Crisis.',
      },
      importance: {
        stem: 'Explain the importance of the Law of Return (1950) for the new state of Israel.',
        marks: 8,
        factVault: [
          'Passed by Knesset on 5 July 1950: granted every Jewish person worldwide the legal right to settle in Israel as an automatic citizen.',
          'Doubled Israel’s population within four years, absorbing 680,000 immigrants including European Holocaust survivors and Mizrahi/Sephardic refugees expelled from Arab nations.',
          'Created vital military manpower for the newly formed IDF and established demographic security against surrounding Arab majorities.',
        ],
        connectiveVault: [
          'This was vital for the state because...',
          'Demographically and militarily, this ensured...',
          'Without this legislation, Israel would have struggled to...',
        ],
        trapAlert:
          'Ensure your answer links directly to the survival and development OF THE NEW STATE, rather than writing a general history of immigration.',
        upgradeChallenge:
          'Grade 9 Upgrade: Balance the military and demographic security advantages against the severe economic strain (ma’abarot tent cities, strict food rationing) it placed on the fledgling state.',
      },
      narrative: {
        stem: 'Write a narrative account analysing the key events of the Suez Crisis (1956).',
        stimulus: [
          'Nationalisation of the Suez Canal (July 1956)',
          'The Protocol of Sèvres (October 1956)',
        ],
        marks: 8,
        anchors: [
          {
            year: 'July 1956',
            event: 'Nasser nationalises Suez Canal after US withdraws Aswan Dam funding.',
          },
          {
            year: 'Oct 1956',
            event: 'Protocol of Sèvres: Britain, France, and Israel secret collusion agreement.',
          },
          {
            year: 'Oct–Nov 1956',
            event:
              'Israel invades Sinai; Anglo-French ultimatum and paratrooper landings at Port Said.',
          },
          {
            year: 'Nov 1956',
            event:
              'US financial sanctions and UN pressure force humiliating Anglo-French withdrawal.',
          },
        ],
        bridges: [
          'Nasser’s nationalisation prompted...',
          'This led directly to secret tripartite collusion when...',
          'However, the military advance was halted when...',
        ],
        trap: 'Do not focus purely on military clashes in Sinai. You must explain how US financial sanctions and UN pressure converted an Anglo-French military victory into a political defeat.',
        vocab: [
          { term: 'Nationalisation', desc: 'Nasser state seizure of Suez Canal Company' },
          { term: 'Protocol of Sèvres', desc: 'Secret UK-France-Israel collusion pact' },
          { term: 'Ultimatum', desc: 'Anglo-French pretext to occupy canal zone' },
          { term: 'Financial Sanctions', desc: 'US pressure on sterling forcing British exit' },
        ],
        level3Criteria:
          'To achieve Level 3 (7–8 marks): Your account must explain how superpower intervention (US threats to collapse the British pound) converted an Anglo-French military victory into a political defeat.',
      },
    },
    round3: {
      consequence: {
        stem: 'Explain one consequence of the formation of the United Arab Republic (UAR) in 1958.',
        marks: 4,
        planner: {
          point:
            'One consequence was that it encircled Israel with a unified Pan-Arab political union under President Nasser.',
          facts:
            'Egypt and Syria merged into a single state in February 1958, placing Egyptian military commanders in control of Syria’s southern border with northern Israel.',
          link: 'This heightened Israeli security fears of a coordinated two-front war and pushed Israel to seek closer defensive ties with the United States and France.',
        },
      },
      importance: {
        stem: 'Explain the importance of the creation of the Israeli Defence Forces (IDF) for the aftermath of the 1948–49 war.',
        marks: 8,
        planner: {
          factor:
            'The IDF was important because it dissolved competing political militias into a unified, disciplined national army under state control.',
          facts:
            'Established by David Ben-Gurion’s Order No. 4 on 26 May 1948, forcibly disbanding the Haganah, Irgun, and Lehi (culminating in the Altalena affair), and introducing universal conscription.',
          link: 'This prevented factional civil war among Jewish groups, established firm civilian political control over the military, and created a permanent standing force capable of defending armistice borders.',
        },
      },
      narrative: {
        stem: 'Write a narrative account analysing the key events leading to the end of the British Mandate in Palestine (1945–48).',
        stimulus: ['Post-war Jewish immigration', 'The bombing of the King David Hotel (1946)'],
        marks: 8,
        planner: {
          stage1:
            'Post-war Holocaust survivors sought entry; British White Paper strictly limited immigration to 1,500/month, triggering illegal Aliyah Bet ships (e.g. SS Exodus) and militant Jewish insurgency.',
          stage2:
            'Irgun and Lehi launched guerrilla warfare against British infrastructure, climaxing in the July 1946 King David Hotel bombing and the hanging of two British sergeants in 1947.',
          stage3:
            'Facing economic crisis at home and international outrage over turning back refugee ships, Britain announced in February 1947 it would surrender the Mandate, referring Palestine to the UN.',
        },
      },
    },
    specBank: [
      {
        num: 1,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of the conflicting interests and demands of Jews and Arabs within the British Mandate.',
        focus:
          'Focus on conflicting British promises (Balfour Declaration vs McMahon-Hussein Correspondence) and rising communal violence.',
      },
      {
        num: 2,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of the territorial changes resulting from the 1948–49 war.',
        focus:
          'Explain how Israeli expansion to 79% of Palestine created 700,000 Palestinian refugees (the Nakba) and armistice green lines.',
      },
      {
        num: 3,
        type: 'Importance (8m)',
        q: 'Explain the importance of the refugee status of Palestinian Arabs for relations between Israel and Arab states after 1949.',
        focus:
          'Explain how Arab states refused resettlement to maintain the Palestinian "Right of Return", entrenching regional hostility.',
      },
      {
        num: 4,
        type: 'Importance (8m)',
        q: 'Explain the importance of US aid to Israel in the period 1949–1963.',
        focus:
          'Explain how US loans and diplomatic backing enabled Israel to absorb 680,000 immigrants and develop sovereign infrastructure.',
      },
      {
        num: 5,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of Nasser’s leadership of the Arab world for relations with Israel.',
        focus:
          'Explain how Nasser’s charismatic Pan-Arabism united Arab public opinion against Israel and led to the formation of the UAR and Fedayeen raids.',
      },
      {
        num: 6,
        type: 'Importance (8m)',
        q: 'Explain the importance of the Israeli attacks on Sinai in 1956 for Israeli security.',
        focus:
          'Explain how capturing Sinai eliminated fedayeen bases in Gaza and secured Israeli navigation through the Straits of Tiran via UNEF peacekeepers.',
      },
      {
        num: 7,
        type: 'Narrative (8m)',
        q: 'Write a narrative account analysing the development of Israel’s relations with Egypt between 1949 and 1956.',
        focus:
          'Analyse the chronological sequence: 1949 Armistice → 1955 Gaza raid → Czech Arms Deal → nationalisation → 1956 Suez War.',
      },
    ],
  },

  KT2: {
    id: 'KT2',
    title: 'Key Topic 2: The Escalating Conflict, 1964–73',
    lessons: [4, 5, 6],
    dates: '1964–1973',
    examSpecTag: 'Option P5 · Key Topic 2 (Lessons 5–7)',
    color: '#dc2626',
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
    round1: {
      consequence: {
        stem: 'Explain one consequence of the expulsion of the PLO from Jordan (1970).',
        marks: 4,
        starter:
          'One consequence was that the PLO relocated its primary military and political headquarters to Southern Lebanon.',
        facts:
          'Following King Hussein’s crackdown in Black September (1970) which killed thousands of Palestinian fedayeen, Yasser Arafat and PLO brigades were forced out of Amman into Beirut and southern Lebanon.',
        link: 'This created a "state within a state" (Fatahland) along Israel’s northern frontier, leading to continuous cross-border rocket strikes, Israeli reprisals, and ultimately Israel’s 1982 invasion of Lebanon.',
        stretch:
          'Grade 9 Nuance: Analyse how the loss of Jordan as a direct border with the West Bank forced Palestinian factions to turn to international terrorism (e.g. Munich 1972) to maintain global media attention.',
      },
      importance: {
        stem: 'Explain the importance of UN Resolution 242 for the aftermath of the 1967 war.',
        marks: 8,
        starter:
          'UN Resolution 242 was important because it established the fundamental "Land for Peace" diplomatic formula that governed all subsequent Middle East negotiations.',
        facts:
          'Adopted unanimously on 22 November 1967; called for the withdrawal of Israeli forces from occupied territories in exchange for the termination of belligerency and recognition of every state’s right to live in peace within secure borders.',
        link: 'It provided the legal basis for the 1978 Camp David Accords, the 1979 Treaty of Washington, and the 1993 Oslo Accords, even though initial Syrian and PLO rejection entrenched the diplomatic stalemate.',
        stretch:
          'Grade 9 Evaluation: Examine how the deliberate omission of the word "the" before "territories" in the English draft allowed Israel to retain strategic buffer zones while Egypt and Jordan demanded total withdrawal.',
      },
      narrative: {
        stem: 'Write a narrative account analysing the key events of the Six Day War (1967).',
        stimulus: ['Operation Focus airstrikes (5 June)', 'The capture of East Jerusalem (7 June)'],
        marks: 8,
        stages: [
          {
            label: 'Stage 1: Operation Focus (5 June 1967)',
            desc: 'Israel launched pre-emptive airstrikes flying below Egyptian radar, destroying over 300 aircraft on the ground in 3 hours and securing absolute air supremacy.',
          },
          {
            label: 'Stage 2: Fronts Encircled (5–8 June)',
            desc: 'IDF armoured columns swept across Sinai to the Suez Canal; paratroopers under Motta Gur took the Old City of Jerusalem and cleared Jordanian forces from the West Bank.',
          },
          {
            label: 'Stage 3: Golan Heights & Ceasefire (9–10 June)',
            desc: 'IDF brigades scaled the fortified Golan escarpment, driving Syrian artillery back from the Sea of Galilee before accepting a UN ceasefire, quadrupling Israel’s territory.',
          },
        ],
        connectives: [
          'The war opened decisively when...',
          'With aerial control secured, Israeli forces...',
          'Following victory on the Jordanian front...',
          'The outcome of this rapid advance was...',
        ],
        stretch:
          'Grade 9 Analytical Glue: Explicitly trace how Israel’s complete air supremacy established in the first 180 minutes directly enabled ground commanders to execute rapid flanking maneuvers across three separate fronts.',
      },
    },
    round2: {
      consequence: {
        stem: 'Explain one consequence of the events of 7 April 1967 for escalating tension between Israel and Syria.',
        marks: 4,
        factVault: [
          'Tractor dispute in the demilitarized zone escalated into a major aerial battle over the Golan Heights.',
          'Israeli Air Force Mirage jets shot down 6 Syrian MiG-21 fighters and flew victory rolls directly over Damascus.',
          'Syria invoked its mutual defence treaty with Egypt, pressuring President Nasser to mobilize troops and expel UN peacekeepers.',
        ],
        connectiveVault: [
          'The direct repercussion was...',
          'This public humiliation pushed Syria to...',
          'As a consequence, Nasser felt compelled to...',
        ],
        trapAlert:
          'Focus strictly on how the dogfight escalated tension towards the Six Day War, not on the tractor farming dispute itself.',
        upgradeChallenge:
          'Grade 9 Upgrade: Explain how this humiliation combined with false Soviet intelligence reports of Israeli troop mobilization on 13 May to make Nasser’s closure of the Straits of Tiran unavoidable.',
      },
      importance: {
        stem: 'Explain the importance of the Cairo Conference (1964) for the growth of Fatah and the PLO.',
        marks: 8,
        factVault: [
          'Convened by President Nasser in January 1964; brought 13 Arab heads of state together to formulate a strategy against Israeli water diversions.',
          'Formally established the Palestine Liberation Organization (PLO) and the Palestinian National Council, adopting the Palestinian National Charter.',
          'Provided an official pan-Arab umbrella framework that Yasser Arafat’s independent guerrilla movement, Fatah, ultimately took over in 1969.',
        ],
        connectiveVault: [
          'The conference was significant because...',
          'By institutionalising Palestinian identity, this led to...',
          'This was critical for Arafat because...',
        ],
        trapAlert:
          'Differentiate between the initial PLO created as Nasser’s diplomatic puppet in 1964 and Arafat’s militant Fatah takeover in 1969.',
        upgradeChallenge:
          'Grade 9 Upgrade: Contrast Nasser’s intention to control Palestinian nationalism with the unintended consequence of providing a platform that radicalized fedayeen guerrilla warfare.',
      },
      narrative: {
        stem: 'Write a narrative account analysing the key events of the Yom Kippur War (1973).',
        stimulus: [
          'Operation Badr canal crossing (6 October)',
          'The battle of the Chinese Farm (15–17 October)',
        ],
        marks: 8,
        anchors: [
          {
            year: '6 Oct 1973',
            event:
              'Simultaneous Egyptian-Syrian surprise assault; Egypt breaches Bar-Lev Line with high-pressure water monitors.',
          },
          {
            year: '7–10 Oct',
            event:
              'IDF reserves mobilize under SAM umbrellas; Syrian armour pushed off the Golan Heights.',
          },
          {
            year: '15–18 Oct',
            event:
              'General Ariel Sharon leads IDF crossing of the Suez Canal, encircling Egypt’s Third Army.',
          },
          {
            year: '22–25 Oct',
            event:
              'US and USSR sponsor UN Resolution 338 ceasefire after superpowers reach nuclear alert.',
          },
        ],
        bridges: [
          'The surprise offensive began when...',
          'Having stabilized the northern front, the IDF...',
          'This pivotal counter-attack resulted in...',
        ],
        trap: 'Do not treat this as an uncomplicated Israeli military victory. You must explain how Egypt’s initial canal crossing broke the Bar-Lev Line, shattered the myth of IDF invincibility, and paved the way for diplomatic negotiations.',
        vocab: [
          { term: 'Operation Badr', desc: 'Water monitors breaching Bar-Lev sand wall' },
          { term: 'SAM Umbrellas', desc: 'Soviet anti-aircraft cover shielding Egyptian armour' },
          { term: 'Suez Crossing', desc: 'Sharon’s counter-strike encircling Egypt’s 3rd Army' },
          { term: 'UN Res 338', desc: 'Superpower ceasefire ending superpower nuclear alert' },
        ],
        level3Criteria:
          'Must demonstrate how the tactical success of the Egyptian canal crossing shattered the myth of Israeli invincibility and enabled Anwar Sadat to pursue diplomacy from equal dignity.',
      },
    },
    round3: {
      consequence: {
        stem: 'Explain one consequence of Israel’s raid on Samu (1966) for tension between Israel and Jordan.',
        marks: 4,
        planner: {
          point:
            'One consequence was that it wrecked secret cooperative security relations between King Hussein of Jordan and Israel.',
          facts:
            'On 13 November 1966, following a Fatah landmine, the IDF launched a massive punitive assault on the West Bank village of Samu, destroying 125 houses and killing 15 Jordanian soldiers.',
          link: 'Riots erupted across Jordan demanding King Hussein’s overthrow, forcing Hussein to sign a mutual defence pact with Egypt in May 1967, ensuring Jordan would enter the Six Day War.',
        },
      },
      importance: {
        stem: 'Explain the importance of the PFLP airplane hijacks of 1970 for international attitudes towards the Palestine issue.',
        marks: 8,
        planner: {
          factor:
            'The Dawson’s Field hijacks forced the Palestinian national cause onto the front pages of world media, but alienated Western public opinion.',
          facts:
            'In September 1970, George Habash’s PFLP hijacked four airliners, landing three in Dawson’s Field in Jordan, holding over 300 Western hostages, and blowing up empty aircraft on global TV.',
          link: 'While it pressured Western powers to acknowledge that Middle East peace required addressing Palestinian identity, it triggered Black September and led Western governments to brand Palestinian guerrilla groups as terrorist organizations.',
        },
      },
      narrative: {
        stem: 'Write a narrative account analysing the actions of Nasser, the USSR, and the USA leading to the Six Day War (1967).',
        stimulus: [
          'False Soviet intelligence reports (May 1967)',
          'Closure of the Straits of Tiran (22 May 1967)',
        ],
        marks: 8,
        planner: {
          stage1:
            'On 13 May, the USSR falsely warned Nasser that Israel was massing brigades on the Syrian border; to maintain his leadership, Nasser mobilized 100,000 troops in Sinai and expelled UN peacekeepers.',
          stage2:
            'On 22 May, Nasser closed the Straits of Tiran to Israeli shipping (an explicit Israeli casus belli) and signed a military pact with King Hussein of Jordan on 30 May, completing Israel’s encirclement.',
          stage3:
            'The USA refused to intervene militarily to open the Straits, signaling to Israeli Prime Minister Levi Eshkol and Moshe Dayan that Washington would not oppose an immediate pre-emptive strike.',
        },
      },
    },
    specBank: [
      {
        num: 1,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of Syria’s support for Fatah between 1964 and 1967.',
        focus:
          'Explain how Syrian Ba’athist support for cross-border fedayeen raids provoked Israeli artillery strikes and the 7 April 1967 dogfight.',
      },
      {
        num: 2,
        type: 'Importance (8m)',
        q: 'Explain the importance of the continued dispute over the Suez Canal between 1967 and 1973.',
        focus:
          'Explain how the closure of the canal during the War of Attrition (1969–70) heightened superpower Cold War tensions along the waterway.',
      },
      {
        num: 3,
        type: 'Importance (8m)',
        q: 'Explain the importance of the occupied territories (Golan Heights, West Bank, Sinai) for Israeli security after 1967.',
        focus:
          'Explain how strategic depth protected Israeli population centres, but created the long-term demographic and security burden of military occupation.',
      },
      {
        num: 4,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of the Black September attack at the Munich Olympics (1972) for international attitudes towards the Palestine issue.',
        focus:
          'Explain how the hostage killings shocked world opinion, leading Western nations to brand Palestinian factions as terrorist organisations.',
      },
      {
        num: 5,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of Israel’s consolidation of control in the occupied territories between 1967 and 1973.',
        focus:
          'Explain how the establishment of Jewish settlements and military administration radicalised Palestinian resistance under the PLO.',
      },
      {
        num: 6,
        type: 'Importance (8m)',
        q: 'Explain the importance of Egyptian relations with the USSR between 1967 and 1973.',
        focus:
          'Explain how Soviet SAM air-defence batteries and military hardware re-armed Egypt for Operation Badr across the Suez Canal in 1973.',
      },
      {
        num: 7,
        type: 'Narrative (8m)',
        q: 'Write a narrative account analysing the key events in the aftermath of the Yom Kippur War in 1973.',
        focus:
          'Analyse the causal chain: UN Res 338 ceasefire → OPEC oil embargo → Kissinger shuttle diplomacy → 1974–75 Sinai Disengagement.',
      },
    ],
  },

  KT3: {
    id: 'KT3',
    title: 'Key Topic 3: Attempts at a Solution, 1974–95',
    lessons: [7, 8, 9],
    dates: '1974–1995',
    examSpecTag: 'Option P5 · Key Topic 3 (Lessons 8–10)',
    color: '#059669',
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
    round1: {
      consequence: {
        stem: 'Explain one consequence of the Treaty of Washington (1979) for Egyptian relations with other Arab states.',
        marks: 4,
        starter:
          'One consequence was that Egypt was politically isolated and ostracized by the rest of the Arab world.',
        facts:
          'Arab League states condemned Anwar Sadat for signing a separate bilateral peace with Menachem Begin, expelled Egypt from the Arab League, moved League headquarters from Cairo to Tunis, and severed diplomatic and economic ties.',
        link: 'This broke pan-Arab diplomatic unity and fueled violent Islamist backlash inside Egypt, directly culminating in Anwar Sadat’s assassination by Islamic Jihad during a military parade in October 1981.',
        stretch:
          'Grade 9 Nuance: Assess whether Sadat anticipated this isolation but calculated that regaining the oil-rich Sinai Peninsula and securing billions in annual US foreign aid outweighed pan-Arab solidarity.',
      },
      importance: {
        stem: 'Explain the importance of the Oslo Accords (1993) for the setting up of the Palestinian National Authority.',
        marks: 8,
        starter:
          'The Oslo Accords were critically important because they established the legal and administrative framework for Palestinian self-government.',
        facts:
          'Signed on 13 September 1993 following secret Norwegian backchannel talks; established a 5-year interim period of Palestinian self-rule, starting with Israeli withdrawal from the Gaza Strip and Jericho.',
        link: 'This directly led to the formal creation of the Palestinian National Authority (PNA) in 1994, allowing Yasser Arafat to return from exile to head an elected civilian administration with its own police force.',
        stretch:
          'Grade 9 Evaluation: Analyse the structural limitations of Oslo — why did deferring "permanent status issues" (Jerusalem, refugees, borders, Jewish settlements) ultimately undermine the authority of the PNA?',
      },
      narrative: {
        stem: 'Write a narrative account analysing the events of the First Palestinian Intifada (1987–93).',
        stimulus: [
          'Incident at the Erez checkpoint (Dec 1987)',
          'Yitzhak Rabin’s ‘Iron Fist’ policy',
        ],
        marks: 8,
        stages: [
          {
            label: 'Stage 1: The Spark & Outbreak (Dec 1987)',
            desc: 'An IDF tank transporter crashed into civilian cars killing 4 labourers at Erez; funerals in Jabalia camp exploded into spontaneous demonstrations, stone-throwing, and barricades.',
          },
          {
            label: 'Stage 2: Civil Disobedience & Repression (1988–90)',
            desc: 'The underground UNLU directed commercial boycotts and tax strikes; Defence Minister Rabin ordered ‘force, might, and beatings’, drawing unprecedented global media condemnation.',
          },
          {
            label: 'Stage 3: Political Realisation & Oslo (1991–93)',
            desc: 'King Hussein surrendered Jordan’s claims to the West Bank in 1988; Israeli leaders recognized direct military rule was unsustainable, unlocking backchannel negotiations leading to Oslo in 1993.',
          },
        ],
        connectives: [
          'The uprising erupted spontaneously when...',
          'As civil disobedience expanded under the UNLU...',
          'Faced with mounting international outcry...',
          'This fundamental political deadlock led directly to...',
        ],
        stretch:
          'Grade 9 Analytical Glue: Trace how the grassroots nature of the Intifada threatened both the Israeli security establishment and Arafat’s external PLO leadership in Tunis, forcing both sides to compromise at Oslo.',
      },
    },
    round2: {
      consequence: {
        stem: 'Explain one consequence of the Israeli invasion of Lebanon (1982).',
        marks: 4,
        factVault: [
          'Operation Peace for Galilee launched in June 1982 under Ariel Sharon, pushing 25 miles north to besiege West Beirut.',
          'US envoy Philip Habib brokered the evacuation of Yasser Arafat and 14,000 PLO fighters to Tunisia.',
          'Phalangist militia massacred hundreds of civilians in Sabra and Shatila refugee camps, provoking 400,000 Israelis to protest in Tel Aviv and forcing Sharon’s resignation.',
        ],
        connectiveVault: [
          'The immediate consequence was...',
          'This military operation resulted in...',
          'Consequently, the political fallout within Israel led to...',
        ],
        trapAlert:
          'Do not confuse the 1978 Litani operation with the full 1982 invasion of Beirut.',
        upgradeChallenge:
          'Grade 9 Upgrade: Explain how the elimination of the PLO in Southern Lebanon inadvertently created a far more radical and formidable adversary in the Iranian-backed Hezbollah militia.',
      },
      importance: {
        stem: 'Explain the importance of Arafat’s renunciation of terrorism (1988) for diplomatic relations with the USA.',
        marks: 8,
        factVault: [
          'In December 1988, addressing a special UN General Assembly session in Geneva, Yasser Arafat explicitly recognized Israel’s right to exist in peace and security and renounced all forms of terrorism.',
          'Met the mandatory precondition established by US Secretary of State Henry Kissinger in 1975 prohibiting US dialogue with the PLO.',
          'Outgoing President Ronald Reagan and Secretary of State George Shultz immediately authorized direct, official diplomatic contacts between Washington and the PLO.',
        ],
        connectiveVault: [
          'This diplomatic move was pivotal because...',
          'By meeting long-standing US conditions, Arafat achieved...',
          'Without this renunciation, the United States would not have...',
        ],
        trapAlert:
          'Focus strictly on the impact ON DIPLOMATIC RELATIONS WITH THE USA, rather than internal Palestinian factional disputes.',
        upgradeChallenge:
          'Grade 9 Upgrade: Explain how this diplomatic breakthrough laid the indispensable groundwork for the 1991 Madrid Conference and the subsequent 1993 Oslo Peace Process.',
      },
      narrative: {
        stem: 'Write a narrative account analysing diplomatic negotiations between Egypt and Israel from Sadat’s visit (1977) to the Treaty of Washington (1979).',
        stimulus: [
          'Sadat’s address to the Knesset (November 1977)',
          'The Camp David summit (September 1978)',
        ],
        marks: 8,
        anchors: [
          {
            year: 'Nov 1977',
            event:
              'Anwar Sadat makes historic direct flight to Jerusalem, addressing Knesset with "No more war".',
          },
          {
            year: 'Dec 1977',
            event:
              'Menachem Begin makes reciprocal visit to Ismailia, but bilateral negotiations stall over Sinai settlements.',
          },
          {
            year: 'Sept 1978',
            event:
              'President Jimmy Carter hosts 13-day marathon summit at Camp David, producing two framework accords.',
          },
          {
            year: 'March 1979',
            event:
              'Sadat and Begin sign formal Treaty of Washington on White House lawn, restoring Sinai to Egypt.',
          },
        ],
        bridges: [
          'Sadat’s bold initiative broke thirty years of hostility when...',
          'When subsequent talks deadlocked, President Carter intervened by...',
          'This intense mediation finally culminated in...',
        ],
        trap: 'Do not confuse Camp David (September 1978 framework) with the formal Treaty of Washington (March 1979). You must explain how Carter’s personal mediation overcame bitter hostility to turn a precarious framework into a binding treaty.',
        vocab: [
          { term: 'Knesset Speech', desc: 'Sadat’s "No more war" direct address in Jerusalem' },
          { term: 'Shuttle Diplomacy', desc: 'Carter’s 13-day marathon mediation at Camp David' },
          { term: 'Framework Accords', desc: 'Sinai return agreed; Palestinian autonomy deferred' },
          { term: 'Treaty of Washington', desc: 'Formal March 1979 bilateral peace treaty' },
        ],
        level3Criteria:
          'Must explain how Carter’s personal mediation overcame bitter personal hostility between Begin and Sadat, turning a precarious framework into a binding peace treaty.',
      },
    },
    round3: {
      consequence: {
        stem: 'Explain one consequence of the Israel-Jordan peace treaty (1994).',
        marks: 4,
        planner: {
          point:
            'One consequence was that it normalized diplomatic, trade, and water-sharing relations between Israel and its second Arab neighbour.',
          facts:
            'Signed by Yitzhak Rabin and King Hussein in the Arava desert on 26 October 1994, resolving border and water disputes along the Jordan and Yarmouk rivers.',
          link: 'Israel recognized Jordan’s special historic role as custodian of Muslim holy shrines in Jerusalem, securing Israel’s longest land border and strengthening the pro-Western moderate bloc in the region.',
        },
      },
      importance: {
        stem: 'Explain the importance of the oil crisis (1973) for the involvement of the USA in the Middle East.',
        marks: 8,
        planner: {
          factor:
            'The OPEC oil embargo demonstrated that Middle Eastern instability directly threatened the domestic economic security of the United States.',
          facts:
            'OAPEC cut oil production and placed a total embargo on petroleum exports to the US in response to Nixon’s $2.2bn military airlift to Israel, quadrupling world oil prices and causing fuel shortages and inflation.',
          link: 'This forced US Secretary of State Henry Kissinger to abandon passive diplomacy and launch intense "shuttle diplomacy" between Cairo, Damascus, and Tel Aviv, establishing Washington as the dominant mediator.',
        },
      },
      narrative: {
        stem: 'Write a narrative account analysing changing superpower policies in the Middle East from the Gulf War (1991) to the Oslo Accords (1993).',
        stimulus: ['The Gulf War (1991)', 'The collapse of the Soviet Union (1991)'],
        marks: 8,
        planner: {
          stage1:
            'The 1991 Gulf War saw the US lead an international coalition including Arab states (Egypt, Syria) to liberate Kuwait, while Arafat backed Saddam Hussein, severely isolating the PLO financially.',
          stage2:
            'The collapse of the Soviet Union left the USA as the sole global superpower, ending Moscow’s financial and military backing for Arab client states and bringing 400,000 Soviet Jewish immigrants to Israel.',
          stage3:
            'Exploiting this unipolar moment, President George H.W. Bush convened the 1991 Madrid Conference; when official bilateral talks stalled, Israel and the weakened PLO initiated secret talks in Oslo.',
        },
      },
    },
    specBank: [
      {
        num: 1,
        type: 'Importance (8m)',
        q: 'Explain the importance of Kissinger’s ‘shuttle diplomacy’ for the reopening of the Suez Canal.',
        focus:
          'Explain how the 1974 and 1975 Sinai Disengagement Accords allowed Egypt to clear mines and reopen the canal to world commerce in June 1975.',
      },
      {
        num: 2,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of Begin’s visit to Egypt in 1977.',
        focus:
          'Explain how Begin’s reciprocal Ismailia summit demonstrated mutual willingness to negotiate, laying groundwork for Camp David.',
      },
      {
        num: 3,
        type: 'Importance (8m)',
        q: 'Explain the importance of US President Carter for the Camp David negotiations (1978).',
        focus:
          'Explain Carter’s pivotal role in keeping Begin and Sadat at the table for 13 days, drafting 23 revisions to overcome personal deadlock.',
      },
      {
        num: 4,
        type: 'Importance (8m)',
        q: 'Explain the importance of Arafat’s speech to the UN (1974) for the international standing of the PLO.',
        focus:
          'Explain how Arafat’s "gun and olive branch" address secured official UN Observer status and recognition as sole legitimate representative.',
      },
      {
        num: 5,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of PLO activities in Lebanon for Israeli reprisals in the late 1970s.',
        focus:
          'Explain how cross-border rocket strikes and coastal road raids directly triggered Operation Litani in 1978, creating a buffer zone.',
      },
      {
        num: 6,
        type: 'Importance (8m)',
        q: 'Explain the importance of the end of the Cold War for Middle East peace negotiations.',
        focus:
          'Explain how the collapse of the USSR left the US as the sole superpower, depriving Syria and the PLO of Soviet patronage and unlocking Madrid (1991).',
      },
      {
        num: 7,
        type: 'Consequence (4m)',
        q: 'Explain one consequence of the Oslo II agreement (1995) for Palestinian self-rule in the West Bank.',
        focus:
          'Explain how dividing the West Bank into Areas A (Palestinian control), B (joint), and C (Israeli control) fragmented territory and deepened friction.',
      },
    ],
  },
};

// Common CSS for print-perfect 12-page booklets
const COMMON_CSS = `
  @page { size: A4 portrait; margin: 8mm 10mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 8.5pt; line-height: 1.3; background: #fff; }
  
  .page { 
    page-break-after: always; 
    height: 280mm; 
    max-height: 280mm; 
    box-sizing: border-box; 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    padding: 0;
  }
  .page:last-child { page-break-after: avoid; }
  
  /* Headers */
  .page-header { border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end; }
  .header-left h1 { margin: 0; font-size: 11pt; color: #1e3a8a; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; }
  .header-left p { margin: 1px 0 0 0; font-size: 7pt; color: #64748b; font-weight: 500; }
  .header-tag { font-size: 6.8pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; }
  
  .page-footer { font-size: 6.5pt; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 3px; margin-top: 3px; display: flex; justify-content: space-between; }
  
  /* Realistic Lined paper simulation (7.5mm / 21px notebook ruling) */
  .writing-line { height: 21px; border-bottom: 1px solid #cbd5e1; margin-bottom: 0; box-sizing: border-box; display: flex; align-items: flex-end; padding-bottom: 2px; }
  .writing-line.starter { color: #334155; font-style: italic; font-size: 7.2pt; }
  
  /* Answers-Only Bank (Green Pages 4 & 5) */
  .ans-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5px 10px; font-size: 7.2pt; flex: 1 1 auto; }
  .ans-item { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 3px; padding: 2.5px 6px; display: flex; gap: 6px; align-items: baseline; }
  .ans-num { color: #166534; font-weight: 800; font-size: 7.2pt; flex-shrink: 0; min-width: 18px; }
  .ans-text { color: #15803d; font-weight: 600; line-height: 1.25; }
  
  /* Cover Tracker Table */
  .tracker-table { width: 100%; border-collapse: collapse; font-size: 7.4pt; margin: 4px 0; }
  .tracker-table th, .tracker-table td { border: 1px solid #cbd5e1; padding: 4px 6px; vertical-align: middle; }
  .tracker-table th { background: #1e3a8a; color: white; font-weight: 800; text-align: left; }
  .tracker-table tr:nth-child(even) { background: #f8fafc; }
  
  /* 2-Column Quiz Grids */
  .quiz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5px 8px; font-size: 6.9pt; line-height: 1.2; flex: 1 1 auto; overflow: hidden; }
  .quiz-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px; display: flex; gap: 4px; align-items: flex-start; }
  .quiz-cb { width: 9px; height: 9px; border: 1px solid #94a3b8; border-radius: 2px; flex-shrink: 0; margin-top: 1px; }
  
  /* Stepped Ladder Boxes */
  .ladder-zone { border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 5px; }
  .ladder-launchpad { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 4px 6px; font-size: 7.2pt; color: #1e40af; margin-bottom: 4px; }
  .ladder-stretch { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 4px; padding: 4px 6px; font-size: 7.2pt; color: #6d28d9; margin-top: 4px; }
  
  /* Dual Track Split Columns */
  .dual-track-container { display: grid; grid-template-columns: 32% 68%; gap: 8px; margin-bottom: 4px; }
  .toolkit-col { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 6px; font-size: 7pt; display: flex; flex-direction: column; gap: 4px; }
  .writing-col { border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 6px; display: flex; flex-direction: column; }
  .toolkit-box { background: #fff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px; margin-bottom: 2px; }
  
  /* Planning Engine Tables */
  .plan-table { width: 100%; border-collapse: collapse; font-size: 7.2pt; margin-bottom: 4px; }
  .plan-table th, .plan-table td { border: 1px solid #cbd5e1; padding: 4px 6px; vertical-align: top; }
  .plan-table th { background: #f1f5f9; font-weight: 800; color: #1e293b; text-align: left; }
`;

function getShortTitle(stem) {
  if (!stem) return '';
  return stem
    .replace(/^Explain one consequence of (the )?/i, '')
    .replace(/^Explain the importance of (the )?/i, '')
    .replace(/^Write a narrative account analysing (the )?/i, '')
    .replace(/\s*\(\d+\s*Marks\)\s*$/i, '')
    .slice(0, 30)
    .replace(/[.,]$/, '');
}

function renderBookletHtml(ktKey, meta, questions, answers, bookletNum, totalBooklets) {
  const isKT1 = ktKey === 'KT1';
  const halfQ = isKT1 ? 40 : 30;

  // Split Qs & Answers
  const qPage1 = questions.slice(0, halfQ);
  const qPage2 = questions.slice(halfQ, halfQ * 2);
  const aPage1 = answers.slice(0, halfQ);
  const aPage2 = answers.slice(halfQ, halfQ * 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${meta.title} — Complete Mastery & Exam Pack</title>
    <style>${COMMON_CSS}</style>
</head>
<body>

    <!-- ============================================================= -->
    <!-- PAGE 1: FRONT COVER & PROGRESS TRACKER                        -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <!-- Banner Header -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: white; padding: 10px 14px; border-radius: 6px; margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.25); padding-bottom: 4px; margin-bottom: 5px;">
                    <span style="font-size: 7.6pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #93c5fd;">Pearson Edexcel GCSE (9–1) History · Option P5 Conflict in the Middle East, 1945–1995</span>
                    <span style="font-size: 7pt; background: #2563eb; color: #fff; padding: 2px 7px; border-radius: 3px; font-weight: 800; text-transform: uppercase;">12-Page Complete Pack</span>
                </div>
                <h1 style="margin: 0; font-size: 13pt; font-weight: 800; line-height: 1.2;">${meta.title}</h1>
                <p style="margin: 2px 0 0 0; font-size: 7.8pt; color: #cbd5e1;">Comprehensive Mastery &amp; Exam Practice Booklet · Foundation to Grade 9 · ${meta.dates}</p>
            </div>

            <!-- Student Metadata Box -->
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1.2fr; gap: 8px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 6px; font-size: 7.6pt;">
                <div><strong>Pupil Name:</strong> ____________________________</div>
                <div><strong>Candidate No:</strong> _________</div>
                <div><strong>Class / Set:</strong> _________</div>
                <div><strong>Target Grade:</strong> [ &nbsp; ] &nbsp;|&nbsp; <strong>Working:</strong> [ &nbsp; ]</div>
            </div>

            <!-- The Master Assessment & Progress Tracker -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 5px 8px; background: #fff; margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 3px; margin-bottom: 4px;">
                    <strong style="color: #1e3a8a; font-size: 8.2pt; text-transform: uppercase;">📊 Progress &amp; Assessment Tracker (GCSE 9–1)</strong>
                    <span style="font-size: 6.8pt; color: #64748b;">RAG: 🔴 Red (Needs Review) · 🟡 Amber (Securing) · 🟢 Green (Mastered)</span>
                </div>

                <table class="tracker-table">
                    <thead>
                        <tr>
                            <th style="width: 46%;">Assessment Component &amp; Stem Focus</th>
                            <th style="width: 14%; text-align: center;">Format Style</th>
                            <th style="width: 10%; text-align: center;">Max</th>
                            <th style="width: 14%; text-align: center;">Score</th>
                            <th style="width: 16%; text-align: center;">Pupil RAG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background: #f1f5f9; font-weight: 700;">
                            <td>🧠 Complete Knowledge Vault (All ${questions.length} Recall Questions)</td>
                            <td style="text-align: center;">Checklist</td>
                            <td style="text-align: center;">/${questions.length}</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q1 Consequence (${getShortTitle(meta.round1.consequence.stem)}...)</td>
                            <td style="text-align: center;">Ladder</td>
                            <td style="text-align: center;">/4</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q2 Importance (${getShortTitle(meta.round1.importance.stem)}...)</td>
                            <td style="text-align: center;">Ladder</td>
                            <td style="text-align: center;">/8</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 1 (Stepped):</strong> Q3 Narrative Account (${getShortTitle(meta.round1.narrative.stem)}...)</td>
                            <td style="text-align: center;">Ladder</td>
                            <td style="text-align: center;">/8</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q1 Consequence (${getShortTitle(meta.round2.consequence.stem)}...)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/4</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q2 Importance (${getShortTitle(meta.round2.importance.stem)}...)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/8</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 2 (Dual-Track):</strong> Q3 Narrative Account (${getShortTitle(meta.round2.narrative.stem)}...)</td>
                            <td style="text-align: center;">Dual Track</td>
                            <td style="text-align: center;">/8</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 3 (Simulation):</strong> Q1 Consequence (${getShortTitle(meta.round3.consequence.stem)}...)</td>
                            <td style="text-align: center;">Exam Hall</td>
                            <td style="text-align: center;">/4</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 3 (Simulation):</strong> Q2 Importance (${getShortTitle(meta.round3.importance.stem)}...)</td>
                            <td style="text-align: center;">Exam Hall</td>
                            <td style="text-align: center;">/8</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr>
                            <td><strong>Round 3 (Simulation):</strong> Q3 Narrative Account (${getShortTitle(meta.round3.narrative.stem)}...)</td>
                            <td style="text-align: center;">Exam Hall</td>
                            <td style="text-align: center;">/8</td>
                            <td style="text-align: center;">_____</td>
                            <td style="text-align: center; font-size: 7pt; color: #475569;">[ 🔴 &nbsp; 🟡 &nbsp; 🟢 ]</td>
                        </tr>
                        <tr style="background: #e0e7ff; font-weight: 800; font-size: 7.5pt;">
                            <td colspan="2">TOTAL COMBINED EXAM MARKS:</td>
                            <td style="text-align: center;">/60</td>
                            <td style="text-align: center;">_____ / 60</td>
                            <td style="text-align: center; font-size: 6.8pt; color: #3730a3;">Overall: [ 9 8 7 6 5 4 ]</td>
                        </tr>
                    </tbody>
                </table>
                <div style="font-size: 6.6pt; color: #475569; margin-top: 3px; font-weight: 600; text-align: center; background: #f8fafc; padding: 2px 4px; border-radius: 3px; border: 1px solid #e2e8f0;">
                    <strong>Edexcel GCSE Grade Boundaries (Indicative):</strong> &nbsp;
                    Grade 9: 52+ (87%) &nbsp;•&nbsp; Grade 8: 47+ (78%) &nbsp;•&nbsp; Grade 7: 42+ (70%) &nbsp;•&nbsp; Grade 6: 37+ (62%) &nbsp;•&nbsp; Grade 5: 32+ (53%) &nbsp;•&nbsp; Grade 4: 26+ (43%)
                </div>
            </div>

            <!-- Teacher / Examiner Diagnostic Feedback Box (WWW & EBI) -->
            <div style="border: 1.5px solid #475569; border-radius: 6px; padding: 5px 8px; background: #f8fafc; margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 3px;">
                    <strong style="color: #334155; font-size: 7.5pt; text-transform: uppercase;">📝 Examiner / Teacher Diagnostic Feedback</strong>
                    <span style="font-size: 6.8pt; color: #64748b;">Strengths (WWW) &amp; Priority Next Steps (EBI)</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                    <div>
                        <strong style="color: #166534; font-size: 6.8pt; display: block; margin-bottom: 1px;">🌟 What Went Well (WWW):</strong>
                        <div class="writing-line" style="height: 18px;"></div>
                        <div class="writing-line" style="height: 18px;"></div>
                        <div class="writing-line" style="height: 18px;"></div>
                    </div>
                    <div>
                        <strong style="color: #991b1b; font-size: 6.8pt; display: block; margin-bottom: 1px;">🎯 Even Better If / Next Steps (EBI):</strong>
                        <div class="writing-line" style="height: 18px;"></div>
                        <div class="writing-line" style="height: 18px;"></div>
                        <div class="writing-line" style="height: 18px;"></div>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 6.8pt; color: #334155; margin-top: 4px; border-top: 1px solid #e2e8f0; padding-top: 2px;">
                    <span>Teacher Signature: ___________________________</span>
                    <span>Date Marked: _______________</span>
                    <span>Action Follow-up: _______________</span>
                </div>
            </div>

            <!-- Bottom Box: Fast Facts & Stem Formulas -->
            <div style="border: 1.5px solid #0f766e; background: #f0fdfa; border-radius: 6px; padding: 5px 8px; font-size: 6.8pt; line-height: 1.3; color: #115e59;">
                <div style="font-weight: 800; color: #0f766e; font-size: 7.2pt; text-transform: uppercase; margin-bottom: 2px; display: flex; justify-content: space-between;">
                    <span>⏱️ Edexcel Exam Fast Facts &amp; Stem Blueprints (Option P5 Period Study)</span>
                    <span>Total Paper 2: 32 Marks · 50 Mins</span>
                </div>
                <div><strong>• 4-Mark Consequence (~6 mins):</strong> <em>P-F-C Formula.</em> State <strong>Point</strong> clearly in sentence 1 &rarr; support with <strong>2–3 detailed facts</strong> &rarr; explain direct <strong>Consequence Link</strong> (why this mattered for relations or statehood).</div>
                <div><strong>• 8-Mark Narrative Account (~12 mins):</strong> <em>3-Stage Causal Storyboard.</em> Write 3 linked paragraphs: <strong>Trigger / Outbreak</strong> &rarr; <strong>Decisive Turning Point</strong> &rarr; <strong>Climax / Outcome</strong>. Must use explicit causal connectives explaining how Stage 1 caused Stage 2.</div>
                <div><strong>• 8-Mark Importance (~12 mins each):</strong> <em>2 Developed Explanations.</em> Write 2 distinct paragraphs: Identify <strong>Factor</strong> &rarr; provide <strong>precise historical facts</strong> &rarr; explain causal <strong>Link</strong> showing directly why it was important <em>for the named outcome</em>.</div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Pearson Edexcel GCSE History</span>
            <span>Key Topic ${ktKey.replace('KT', '')} Complete Mastery Booklet</span>
            <span>Page 1 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 2: COMPLETE KNOWLEDGE VAULT (PART 1: Q1 TO Q30/40)       -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Complete Knowledge Retrieval Vault · Questions 1 to ${halfQ} (No notes! Check your recall)</p>
                </div>
                <span class="header-tag">Vault Part 1</span>
            </div>

            <div class="quiz-grid">
                ${qPage1
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${i + 1}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault Questions</span>
            <span>Self-Check using Official Mark Scheme on Pages 4–5</span>
            <span>Page 2 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 3: COMPLETE KNOWLEDGE VAULT (PART 2: Q31/41 TO Q60/80)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Complete Knowledge Retrieval Vault · Questions ${halfQ + 1} to ${questions.length} (Self-mark on Pages 4–5)</p>
                </div>
                <span class="header-tag">Vault Part 2</span>
            </div>

            <div class="quiz-grid">
                ${qPage2
                  .map(
                    (item, i) => `
                    <div class="quiz-item">
                        <div class="quiz-cb"></div>
                        <div style="flex: 1;">
                            <strong>${halfQ + i + 1}.</strong> ${item.q}
                            <div style="color: #94a3b8; font-size: 6.5pt; margin-top: 1px;">[${item.source}]</div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Knowledge Vault Questions</span>
            <span>Turn page for Official Mark Scheme Answers</span>
            <span>Page 3 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 4: OFFICIAL MARK SCHEME (PART 1: ANSWERS 1 TO ${halfQ})   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Official Mark Scheme &amp; Knowledge Vault Answers · Answers 1 to ${halfQ} (Self &amp; Peer Marking Bank)</p>
                </div>
                <span class="header-tag" style="background: #059669;">Mark Scheme 1</span>
            </div>

            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 3px 8px; font-size: 6.8pt; color: #065f46; margin-bottom: 5px; display: flex; justify-content: space-between;">
                <span>💡 <strong>Quick-Marking Bank:</strong> Cover this bank with your hand or a sheet of paper to test yourself against Pages 2–3, or use for rapid peer marking.</span>
                <span>Answers 1–${halfQ}</span>
            </div>

            <div class="ans-grid">
                ${aPage1
                  .map(
                    (item, i) => `
                    <div class="ans-item">
                        <span class="ans-num">${i + 1}.</span>
                        <span class="ans-text">${item.a}</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Official Mark Scheme</span>
            <span>Score checked items and log on Front Cover Tracker</span>
            <span>Page 4 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 5: OFFICIAL MARK SCHEME (PART 2: ANSWERS ${halfQ + 1} TO ${questions.length}) -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Official Mark Scheme &amp; Knowledge Vault Answers · Answers ${halfQ + 1} to ${questions.length} (Self &amp; Peer Marking Bank)</p>
                </div>
                <span class="header-tag" style="background: #059669;">Mark Scheme 2</span>
            </div>

            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 3px 8px; font-size: 6.8pt; color: #065f46; margin-bottom: 5px; display: flex; justify-content: space-between;">
                <span>💡 <strong>Quick-Marking Bank:</strong> Use for rapid recall checking against Vault Part 2 (Page 3). Log total correct recall items on Page 1.</span>
                <span>Answers ${halfQ + 1}–${questions.length}</span>
            </div>

            <div class="ans-grid">
                ${aPage2
                  .map(
                    (item, i) => `
                    <div class="ans-item">
                        <span class="ans-num">${halfQ + i + 1}.</span>
                        <span class="ans-text">${item.a}</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Official Mark Scheme</span>
            <span>Round 1 Exam Practice begins on Page 6</span>
            <span>Page 5 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 6: ROUND 1 — THE STEPPED LADDER (CAUSE & IMPACT)         -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Round 1: The Stepped Ladder · Cause &amp; Impact Studio (Foundation to Grade 9)</p>
                </div>
                <span class="header-tag" style="background: #7c3aed;">Round 1: Stems 1 &amp; 2</span>
            </div>

            <!-- Q1: 4-Mark Consequence -->
            <div class="ladder-zone" style="border-left: 3.5px solid #f59e0b; margin-bottom: 5px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 1: Consequence (4 Marks)</strong>
                    <span style="font-size: 7pt; color: #b45309; font-weight: 700;">P-F-C Formula · ~6 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.5pt; color: #0f172a; margin-bottom: 3px;">
                    ${meta.round1.consequence.stem}
                </div>

                <!-- Launchpad -->
                <div class="ladder-launchpad" style="padding: 4px 7px; margin-bottom: 3px;">
                    <strong>🚀 Level 1 Launchpad:</strong> Starter: <em>"${meta.round1.consequence.starter}"</em><br>
                    <strong>Facts to Include:</strong> ${meta.round1.consequence.facts}
                </div>

                <!-- Writing lines -->
                <div style="padding: 1px 0;">
                    <div class="writing-line starter">One consequence was that...</div>
                    <div class="writing-line starter">Specifically, (include 2–3 historical facts)...</div>
                    <div class="writing-line starter">This was significant because it led directly to...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                </div>

                <!-- Stretch Callout -->
                <div class="ladder-stretch" style="padding: 4px 7px; margin-top: 3px;">
                    <strong>⚡ Level 3 (Grade 9) Stretch:</strong> ${meta.round1.consequence.stretch}
                </div>
            </div>

            <!-- Q2: 8-Mark Importance -->
            <div class="ladder-zone" style="border-left: 3.5px solid #8b5cf6;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 2: Importance (8 Marks)</strong>
                    <span style="font-size: 7pt; color: #6d28d9; font-weight: 700;">F-I-L Formula · ~12 Mins · 2 Developed Explanations</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    ${meta.round1.importance.stem}
                </div>

                <!-- Launchpad -->
                <div class="ladder-launchpad" style="padding: 4px 7px; margin-bottom: 3px;">
                    <strong>🚀 Level 1 Launchpad:</strong> Starter: <em>"${meta.round1.importance.starter}"</em><br>
                    <strong>Facts to Include:</strong> ${meta.round1.importance.facts}
                </div>

                <!-- Writing lines (12 Lines Total: 2 Developed Paragraphs) -->
                <div style="padding: 1px 0;">
                    <div style="font-size: 6.8pt; font-weight: 800; color: #6d28d9; margin: 1px 0; text-transform: uppercase;">Paragraph 1: First Reason for Importance</div>
                    <div class="writing-line starter">One reason this was important was because...</div>
                    <div class="writing-line starter">For example, (deploy 2–3 precise historical facts)...</div>
                    <div class="writing-line starter">This was critical because it directly caused / led to...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>

                    <div style="font-size: 6.8pt; font-weight: 800; color: #6d28d9; margin: 3px 0 1px 0; text-transform: uppercase;">Paragraph 2: Second Reason for Importance</div>
                    <div class="writing-line starter">A second reason this was important was because...</div>
                    <div class="writing-line starter">Specifically, (support with detailed factual evidence)...</div>
                    <div class="writing-line starter">Without this development, the outcome would have differed because...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                </div>

                <!-- Stretch Callout -->
                <div class="ladder-stretch" style="padding: 4px 7px; margin-top: 3px;">
                    <strong>⚡ Level 3 (Grade 9) Stretch:</strong> ${meta.round1.importance.stretch}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 1 Stepped Ladder</span>
            <span>Edexcel Option P5 · Turn page for Narrative Account</span>
            <span>Page 6 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 7: ROUND 1 — THE STEPPED LADDER (NARRATIVE ACCOUNT)      -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Round 1: The Stepped Ladder · 8-Mark Narrative Account Masterclass</p>
                </div>
                <span class="header-tag" style="background: #3b82f6;">Round 1: Stem 3</span>
            </div>

            <div class="ladder-zone" style="border-left: 3.5px solid #2563eb; margin-bottom: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 3: Narrative Account (8 Marks)</strong>
                    <span style="font-size: 7pt; color: #1d4ed8; font-weight: 700;">T-P-C Storyboard · ~12 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.5pt; color: #0f172a; margin-bottom: 4px;">
                    ${meta.round1.narrative.stem}
                </div>
                <div style="font-size: 7pt; color: #475569; margin-bottom: 4px;">
                    You may use the following in your answer: &nbsp; 
                    <strong>• ${meta.round1.narrative.stimulus[0]}</strong> &nbsp;&nbsp; 
                    <strong>• ${meta.round1.narrative.stimulus[1]}</strong> &nbsp;&nbsp; 
                    <em>(You must also use information of your own.)</em>
                </div>

                <!-- 3-Phase Storyboard -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 4px;">
                    ${meta.round1.narrative.stages
                      .map(
                        (st, i) => `
                        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 4px 6px; font-size: 6.8pt;">
                            <strong style="color: #1d4ed8; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 2px;">${st.label}</strong>
                            <span style="color: #1e3a8a;">${st.desc}</span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>

                <!-- Connectives Box -->
                <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 3px 6px; font-size: 6.8pt; color: #334155; margin-bottom: 4px;">
                    <strong>🔗 Causal Connectives Bank:</strong> ${meta.round1.narrative.connectives.join(' &nbsp;•&nbsp; ')}
                </div>

                <!-- Writing lines: 3 Developed Paragraphs (18 Ruled Lines Total) -->
                <div style="padding: 1px 0;">
                    <div style="font-size: 6.8pt; font-weight: 800; color: #1d4ed8; margin: 1px 0; text-transform: uppercase;">Paragraph 1: Stage 1 — Trigger &amp; Outbreak</div>
                    <div class="writing-line starter">The conflict / crisis began when...</div>
                    <div class="writing-line starter">Specifically, (deploy precise historical facts and figures)...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>

                    <div style="font-size: 6.8pt; font-weight: 800; color: #1d4ed8; margin: 3px 0 1px 0; text-transform: uppercase;">Paragraph 2: Stage 2 — Decisive Turning Point (Explicit Causal Link)</div>
                    <div class="writing-line starter">As a direct consequence of this initial outbreak, a decisive turning point occurred when...</div>
                    <div class="writing-line starter">For example, (include key names, operations, or policy shifts)...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>

                    <div style="font-size: 6.8pt; font-weight: 800; color: #1d4ed8; margin: 3px 0 1px 0; text-transform: uppercase;">Paragraph 3: Stage 3 — Climax &amp; Outcome (Explicit Causal Link)</div>
                    <div class="writing-line starter">This turning point directly triggered the final outcome when...</div>
                    <div class="writing-line starter">Consequently, the long-term impact on the region was that...</div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                    <div class="writing-line"></div>
                </div>

                <!-- Stretch Callout -->
                <div class="ladder-stretch" style="padding: 3px 6px; margin-top: 3px;">
                    <strong>⚡ Level 3 (Grade 9) Analytical Glue:</strong> ${meta.round1.narrative.stretch}
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 1 Stepped Ladder</span>
            <span>Edexcel Option P5 · Round 2 Dual-Track begins on Page 8</span>
            <span>Page 7 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 8: ROUND 2 — SPLIT-COLUMN DUAL TRACK (CAUSE & IMPACT)    -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Round 2: The Split-Column Dual Track · Cause &amp; Impact Toolkit</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Round 2: Stems 1 &amp; 2</span>
            </div>

            <!-- Q1 Consequence (Dual Track) -->
            <div style="border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 5px 8px; margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.2pt; color: #1e293b;">Question 1: Consequence (4 Marks)</strong>
                    <span style="font-size: 6.8pt; color: #0369a1; font-weight: 700;">Independent Toolkit · P-F-C Formula · ~6 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 4px;">
                    ${meta.round2.consequence.stem}
                </div>

                <div class="dual-track-container" style="height: 78mm;">
                    <div class="toolkit-col" style="justify-content: space-between;">
                        <div>
                            <strong style="color: #0369a1; font-size: 6.8pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">🧰 Fact Vault (AO1)</strong>
                            ${meta.round2.consequence.factVault.map((f) => `<div style="font-size: 6.2pt; margin-bottom: 2px;">• ${f}</div>`).join('')}
                        </div>
                        <div>
                            <div style="font-size: 6.2pt; color: #b91c1c; border-top: 1px dashed #f87171; padding-top: 2px; margin-bottom: 2px;">
                                <strong>⚠️ Trap:</strong> ${meta.round2.consequence.trapAlert}
                            </div>
                            <div style="background: #fdf4ff; border: 1px solid #f0abfc; border-radius: 3px; padding: 2px 4px; font-size: 6.2pt; color: #86198f;">
                                ${meta.round2.consequence.upgradeChallenge}
                            </div>
                        </div>
                    </div>
                    <div class="writing-col">
                        <div class="writing-line starter">One consequence was that...</div>
                        <div class="writing-line starter">Specifically, (deploy 2–3 precise historical facts)...</div>
                        <div class="writing-line starter">This was significant because it led directly to...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>

            <!-- Q2 Importance (Dual Track) -->
            <div style="border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 5px 8px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.2pt; color: #1e293b;">Question 2: Importance (8 Marks)</strong>
                    <span style="font-size: 6.8pt; color: #0369a1; font-weight: 700;">Independent Toolkit · F-I-L Formula · 2 Developed Explanations · ~12 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 4px;">
                    ${meta.round2.importance.stem}
                </div>

                <div class="dual-track-container" style="height: 140mm;">
                    <div class="toolkit-col" style="justify-content: space-between;">
                        <div>
                            <strong style="color: #0369a1; font-size: 6.8pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">🧰 Fact Vault (AO1)</strong>
                            ${meta.round2.importance.factVault.map((f) => `<div style="font-size: 6.2pt; margin-bottom: 2px;">• ${f}</div>`).join('')}
                        </div>
                        <div>
                            <div style="font-size: 6.2pt; color: #b91c1c; border-top: 1px dashed #f87171; padding-top: 2px; margin-bottom: 2px;">
                                <strong>⚠️ Trap:</strong> ${meta.round2.importance.trapAlert}
                            </div>
                            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 2px 4px; font-size: 6.2pt; color: #1e40af; margin-bottom: 2px;">
                                <strong>🎯 Examiner Focus:</strong> Explain importance directly for the named outcome, not general background.
                            </div>
                            <div style="background: #fdf4ff; border: 1px solid #f0abfc; border-radius: 3px; padding: 2px 4px; font-size: 6.2pt; color: #86198f;">
                                ${meta.round2.importance.upgradeChallenge}
                            </div>
                        </div>
                    </div>
                    <div class="writing-col">
                        <div style="font-size: 6.6pt; font-weight: 800; color: #0369a1; text-transform: uppercase; margin-bottom: 1px;">Paragraph 1: First Reason for Importance</div>
                        <div class="writing-line starter">One reason this was important was because...</div>
                        <div class="writing-line starter">Specifically, (deploy detailed factual evidence)...</div>
                        <div class="writing-line starter">This was critical for the named outcome because it directly led to...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>

                        <div style="font-size: 6.6pt; font-weight: 800; color: #0369a1; text-transform: uppercase; margin: 3px 0 1px 0;">Paragraph 2: Second Reason for Importance</div>
                        <div class="writing-line starter">A second reason this was important was because...</div>
                        <div class="writing-line starter">For example, (include key names, dates, or terms)...</div>
                        <div class="writing-line starter">Without this development, the outcome would have differed because...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 2 Dual Track</span>
            <span>Edexcel Option P5 · Turn page for Narrative Account</span>
            <span>Page 8 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 9: ROUND 2 — SPLIT-COLUMN DUAL TRACK (NARRATIVE)         -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Round 2: The Split-Column Dual Track · 8-Mark Narrative Account Masterclass</p>
                </div>
                <span class="header-tag" style="background: #0284c7;">Round 2: Stem 3</span>
            </div>

            <div style="border: 1.5px solid #cbd5e1; border-radius: 5px; padding: 5px 8px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 8.5pt; color: #1e293b;">Question 3: Narrative Account (8 Marks)</strong>
                    <span style="font-size: 7pt; color: #0284c7; font-weight: 700;">Chronological Anchor Toolkit · ~12 Mins</span>
                </div>
                <div style="font-weight: 800; font-size: 8.2pt; color: #0f172a; margin-bottom: 3px;">
                    ${meta.round2.narrative.stem}
                </div>
                <div style="font-size: 6.9pt; color: #475569; margin-bottom: 4px;">
                    Stimulus Points: <strong>• ${meta.round2.narrative.stimulus[0]}</strong> &nbsp;&nbsp; <strong>• ${meta.round2.narrative.stimulus[1]}</strong> &nbsp;&nbsp; <em>(You must also use information of your own.)</em>
                </div>

                <div class="dual-track-container" style="margin-bottom: 0;">
                    <!-- Left Toolkit Column (Dense, no whitespace) -->
                    <div class="toolkit-col" style="display: flex; flex-direction: column; gap: 3.5px; padding: 5px;">
                        <div>
                            <strong style="color: #0284c7; font-size: 6.8pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">⏱️ Chronological Anchors (AO1)</strong>
                            ${meta.round2.narrative.anchors
                              .map(
                                (a) => `
                                <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 2px 4px; margin-bottom: 2px; font-size: 6.1pt; line-height: 1.25;">
                                    <strong style="color: #0369a1;">${a.year}:</strong> ${a.event}
                                </div>
                            `,
                              )
                              .join('')}
                        </div>

                        <div>
                            <strong style="color: #0284c7; font-size: 6.8pt; display: block; border-bottom: 1px solid #cbd5e1; padding-bottom: 1px; margin-bottom: 2px;">🌉 Causal Bridges Bank (AO2)</strong>
                            ${meta.round2.narrative.bridges.map((b) => `<div style="font-size: 6.1pt; margin-bottom: 1.5px; color: #334155;">• <em>"${b}"</em></div>`).join('')}
                        </div>

                        ${
                          meta.round2.narrative.vocab
                            ? `
                        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 3px; padding: 3px 4px;">
                            <strong style="color: #166534; font-size: 6.4pt; display: block; margin-bottom: 1.5px;">🔑 Essential Historical Terms:</strong>
                            ${meta.round2.narrative.vocab.map((v) => `<div style="font-size: 5.9pt; color: #14532d; line-height: 1.25; margin-bottom: 1px;">• <strong>${v.term}:</strong> ${v.desc}</div>`).join('')}
                        </div>`
                            : ''
                        }

                        <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 3px; padding: 3px 4px; font-size: 6pt; color: #991b1b; line-height: 1.25;">
                            <strong>🚫 Fatal Narrative Trap:</strong> ${meta.round2.narrative.trap || 'Do not write a descriptive story without causation. Every paragraph must explain how the previous stage directly triggered the next.'}
                        </div>

                        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 4px; font-size: 6pt; color: #334155; line-height: 1.3;">
                            <strong style="color: #1e3a8a; display: block; margin-bottom: 1px;">📋 Pre-Flight Self-Audit:</strong>
                            <div>[ ] Stage 1: Trigger &amp; crisis identified</div>
                            <div>[ ] Stage 2: Decisive turning point explained</div>
                            <div>[ ] Stage 3: Long-term outcome &amp; legacy</div>
                            <div>[ ] Both stimulus points + 1 own fact used</div>
                            <div>[ ] Explicit causal connective links stages</div>
                        </div>

                        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 3px; padding: 3px 4px; font-size: 6pt; color: #1e40af; line-height: 1.25;">
                            <strong>🎯 Level 3 Standard (7–8 Marks):</strong> ${meta.round2.narrative.level3Criteria}
                        </div>

                        <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 3px; padding: 2.5px 4px; font-size: 5.9pt; color: #6b21a8; line-height: 1.25;">
                            <strong>📐 3-Stage Causal Storyboard Arc:</strong>
                            <div style="margin-top: 1px;">Stage 1 (Catalyst) → Stage 2 (Pivot) → Stage 3 (Climax &amp; Outcome)</div>
                        </div>
                    </div>

                    <!-- Right Writing Column: 3 Developed Paragraphs (28 Ruled Lines Total) -->
                    <div class="writing-col" style="justify-content: flex-start; padding: 4px 6px;">
                        <div style="font-size: 6.6pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 1px;">Paragraph 1: Stage 1 — Trigger &amp; Outbreak (Initial Crisis)</div>
                        <div class="writing-line starter">The crisis / conflict began when...</div>
                        <div class="writing-line starter">Specifically, (deploy precise historical facts and figures)...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>

                        <div style="font-size: 6.6pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin: 3px 0 1px 0;">Paragraph 2: Stage 2 — Decisive Turning Point (Explicit Causal Link)</div>
                        <div class="writing-line starter">As a direct consequence of this initial outbreak, a decisive turning point occurred when...</div>
                        <div class="writing-line starter">For example, (include key operations, military maneuvers, or diplomatic shifts)...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>

                        <div style="font-size: 6.6pt; font-weight: 800; color: #0284c7; text-transform: uppercase; margin: 3px 0 1px 0;">Paragraph 3: Stage 3 — Climax &amp; Regional Outcome (Explicit Causal Link)</div>
                        <div class="writing-line starter">This turning point directly triggered the final outcome when...</div>
                        <div class="writing-line starter">Consequently, the long-term impact on the region was that...</div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                        <div class="writing-line"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 2 Dual Track</span>
            <span>Edexcel Option P5 · Round 3 Exam Simulation begins on Page 10</span>
            <span>Page 9 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 10: ROUND 3 — THE PLANNING ENGINE ROOM                   -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Round 3: The Planning Engine Room · Causal Architecture (Plan here, write on Page 11)</p>
                </div>
                <span class="header-tag" style="background: #dc2626;">Round 3: Engine Room</span>
            </div>

            <!-- Q1 Plan Table -->
            <div style="margin-bottom: 5px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 7.8pt; color: #991b1b;">1. 4-Mark Consequence Planning Grid:</strong>
                    <span style="font-size: 6.8pt; color: #64748b;">P-F-C Structure</span>
                </div>
                <div style="font-weight: bold; font-size: 7.6pt; margin-bottom: 3px;">${meta.round3.consequence.stem}</div>
                <table class="plan-table">
                    <tr>
                        <th style="width: 25%;">Point (Sentence 1)</th>
                        <th style="width: 45%;">2–3 Specific Historical Facts (AO1)</th>
                        <th style="width: 30%;">Causal Link to Outcome (AO2)</th>
                    </tr>
                    <tr>
                        <td>${meta.round3.consequence.planner.point}</td>
                        <td>${meta.round3.consequence.planner.facts}</td>
                        <td>${meta.round3.consequence.planner.link}</td>
                    </tr>
                </table>
            </div>

            <!-- Q2 Plan Table -->
            <div style="margin-bottom: 5px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 7.8pt; color: #991b1b;">2. 8-Mark Importance Planning Grid:</strong>
                    <span style="font-size: 6.8pt; color: #64748b;">F-I-L Structure</span>
                </div>
                <div style="font-weight: bold; font-size: 7.6pt; margin-bottom: 3px;">${meta.round3.importance.stem}</div>
                <table class="plan-table">
                    <tr>
                        <th style="width: 25%;">Core Factor</th>
                        <th style="width: 45%;">Factual Information (Names, Dates, Treaties)</th>
                        <th style="width: 30%;">Direct Link to Named Outcome</th>
                    </tr>
                    <tr>
                        <td>${meta.round3.importance.planner.factor}</td>
                        <td>${meta.round3.importance.planner.facts}</td>
                        <td>${meta.round3.importance.planner.link}</td>
                    </tr>
                </table>
            </div>

            <!-- Q3 Plan Table -->
            <div style="margin-bottom: 5px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 7.8pt; color: #991b1b;">3. 8-Mark Narrative Storyboard Grid:</strong>
                    <span style="font-size: 6.8pt; color: #64748b;">3-Stage Causal Arc</span>
                </div>
                <div style="font-weight: bold; font-size: 7.6pt; margin-bottom: 3px;">${meta.round3.narrative.stem}</div>
                <table class="plan-table">
                    <tr>
                        <th style="width: 33%;">Stage 1: Catalyst / Outbreak</th>
                        <th style="width: 33%;">Stage 2: Decisive Pivot</th>
                        <th style="width: 34%;">Stage 3: Climax &amp; Outcome</th>
                    </tr>
                    <tr>
                        <td>${meta.round3.narrative.planner.stage1}</td>
                        <td>${meta.round3.narrative.planner.stage2}</td>
                        <td>${meta.round3.narrative.planner.stage3}</td>
                    </tr>
                </table>
            </div>

            <!-- Examiner AO Rubric Guidance Card -->
            <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; font-size: 6.8pt; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <div>
                    <strong style="color: #1e3a8a;">🎯 AO1 (Knowledge &amp; Recall):</strong> Accurate, specific, and detailed historical facts deployed throughout. Include key figures, statistics, dates, and treaties.
                </div>
                <div>
                    <strong style="color: #1e3a8a;">🎯 AO2 (Historical Analysis):</strong> Sustained causal explanation. Explain consequence, importance, and causal linkages rather than narrative description.
                </div>
            </div>

            <!-- Self-Audit Checklist -->
            <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 4px; padding: 3px 8px; font-size: 6.7pt; color: #991b1b; margin-bottom: 5px;">
                <strong>📋 PRE-FLIGHT AUDIT CHECKLIST:</strong> &nbsp;
                [ ] 2 precise dates/statistics per question &nbsp;&nbsp;
                [ ] Q2 links to the NAMED outcome &nbsp;&nbsp;
                [ ] Q3 explains how Stage 1 caused Stage 2 &nbsp;&nbsp;
                [ ] Full continuous prose on Page 11
            </div>

            <!-- Edexcel Exam Timing, Mark Strategy & Planning Engine Blueprint -->
            <div style="background: #fff; border: 1.5px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; margin-bottom: 5px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                    <strong style="font-size: 7.2pt; color: #0f172a; text-transform: uppercase;">⏱️ Edexcel Real-Time Exam Timing &amp; Stem Blueprints (32 Marks · 50 Mins)</strong>
                    <span style="font-size: 6.4pt; color: #64748b;">Option P5 Conflict in the Middle East</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1.15fr 1.35fr; gap: 6px; font-size: 6.2pt; line-height: 1.25;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
                        <strong style="color: #0369a1; display: block; margin-bottom: 1px;">Q1: Consequence (4m · ~6 Mins)</strong>
                        • Formula: <em>Point → Facts → Consequence Link (P-F-C)</em><br/>
                        • Target: 1 tightly argued paragraph with 2–3 precise dates/names explaining the immediate aftermath.
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
                        <strong style="color: #0369a1; display: block; margin-bottom: 1px;">Q2: Importance (8m · ~12 Mins)</strong>
                        • Formula: <em>Factor → Facts → Direct Link to Named Outcome</em><br/>
                        • Target: 2 distinct paragraphs; must evaluate why it was important FOR THE SPECIFIC PROMPT.
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 5px;">
                        <strong style="color: #0369a1; display: block; margin-bottom: 1px;">Q3: Narrative Account (8m · ~12 Mins)</strong>
                        • Formula: <em>3-Stage Causal Storyboard (Trigger → Pivot → Outcome)</em><br/>
                        • Target: 3 chronological paragraphs with explicit causal connectives explaining how Stage 1 triggered Stage 2.
                    </div>
                </div>
            </div>

            <!-- Student Pre-Exam Data Bank & Rapid Recall Scratchpad -->
            <div style="background: #f8fafc; border: 1.5px solid #94a3b8; border-radius: 4px; padding: 4px 8px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="font-size: 7.2pt; color: #1e293b; text-transform: uppercase;">🧠 Pupil Pre-Writing Scratchpad &amp; Data Vault (Jot before writing on Page 11)</strong>
                    <span style="font-size: 6.3pt; color: #64748b;">Verify 2 key dates / statistics per question</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.2pt;">
                    <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; height: 38px;">
                        <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Q1 Target Facts / Dates:</strong>
                        <div class="writing-line" style="height: 13px;"></div>
                        <div class="writing-line" style="height: 13px;"></div>
                    </div>
                    <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; height: 38px;">
                        <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Q2 Factors &amp; Treaties:</strong>
                        <div class="writing-line" style="height: 13px;"></div>
                        <div class="writing-line" style="height: 13px;"></div>
                    </div>
                    <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; height: 38px;">
                        <strong style="color: #0f172a; display: block; margin-bottom: 1px;">Q3 Causal Connectives:</strong>
                        <div class="writing-line" style="height: 13px;"></div>
                        <div class="writing-line" style="height: 13px;"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Round 3 Engine Room</span>
            <span>Edexcel Option P5 · Execute continuous prose on Page 11</span>
            <span>Page 10 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 11: ROUND 3 — THE EXAM PITCH (CONTINUOUS PROSE)          -->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <div class="page-header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Round 3: The Exam Pitch · Authentic Edexcel Continuous Prose Simulation</p>
                </div>
                <span class="header-tag" style="background: #dc2626;">Exam Conditions</span>
            </div>

            <!-- Official Examiner Rubric Header -->
            <div style="background: #f1f5f9; border: 1.5px solid #475569; border-radius: 4px; padding: 4px 8px; font-size: 6.8pt; margin-bottom: 5px; display: flex; justify-content: space-between;">
                <div>
                    <strong>AO1 Knowledge (Level 3 Standard):</strong> Accurate, specific, and detailed historical facts deployed throughout.
                </div>
                <div>
                    <strong>AO2 Analysis (Level 3 Standard):</strong> Sustained causal focus, explaining consequence, importance, and causal flow.
                </div>
            </div>

            <!-- Continuous Exam Lines (33 Lines Total, ~20px each, perfectly fills page) -->
            <div style="padding: 0;">
                <div class="writing-line starter" style="height: 20px;"><strong>Question 1: Consequence (4 Marks):</strong> ___________________________________________________________</div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>

                <div class="writing-line starter" style="height: 20px; margin-top: 3px;"><strong>Question 2: Importance (8 Marks) — Paragraph 1:</strong> ____________________________________________</div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>

                <div class="writing-line starter" style="height: 20px; margin-top: 2px;"><strong>Question 2: Importance (8 Marks) — Paragraph 2:</strong> ____________________________________________</div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>

                <div class="writing-line starter" style="height: 20px; margin-top: 3px;"><strong>Question 3: Narrative Account (8 Marks) — Stage 1:</strong> _________________________________________</div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>

                <div class="writing-line starter" style="height: 20px; margin-top: 2px;"><strong>Question 3: Narrative Account (8 Marks) — Stage 2:</strong> _________________________________________</div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>

                <div class="writing-line starter" style="height: 20px; margin-top: 2px;"><strong>Question 3: Narrative Account (8 Marks) — Stage 3:</strong> _________________________________________</div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
                <div class="writing-line" style="height: 20px;"></div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · Authentic Exam Pitch</span>
            <span>Edexcel Option P5 · Turn page for 100% Spec Coverage Bank</span>
            <span>Page 11 of 12</span>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- PAGE 12: BACK COVER — 100% SPECIFICATION PRACTICE BANK & TRAPS-->
    <!-- ============================================================= -->
    <div class="page">
        <div>
            <!-- Header Banner -->
            <div style="background: #0f172a; color: white; padding: 8px 12px; border-radius: 5px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="margin: 0; font-size: 10pt; font-weight: 800; text-transform: uppercase;">⚠️ Examiner Trap Doors &amp; 100% Specification Bank</h2>
                    <p style="margin: 1px 0 0 0; font-size: 7pt; color: #94a3b8;">${meta.title} · Pearson Edexcel GCSE History Option P5</p>
                </div>
                <span style="background: #ef4444; color: white; font-size: 6.8pt; font-weight: 800; padding: 2px 6px; border-radius: 3px; text-transform: uppercase;">100% KT${ktKey.replace('KT', '')} Spec Guarantee</span>
            </div>

            <!-- Top Section: Trap Doors -->
            <div style="border: 1.5px solid #ef4444; background: #fef2f2; border-radius: 5px; padding: 5px 8px; margin-bottom: 5px;">
                <strong style="color: #b91c1c; font-size: 7.2pt; text-transform: uppercase; display: block; border-bottom: 1px solid #fecaca; padding-bottom: 2px; margin-bottom: 3px;">
                    🚫 Top 3 Fatal Examiner Traps to Avoid for Key Topic ${ktKey.replace('KT', '')}
                </strong>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
                    ${meta.traps
                      .map(
                        (t) => `
                        <div style="background: #fff; border: 1px solid #fca5a5; border-radius: 3px; padding: 3.5px 5px; font-size: 6.4pt; line-height: 1.25;">
                            <strong style="color: #991b1b; display: block; margin-bottom: 1px;">• ${t.title}</strong>
                            <span style="color: #7f1d1d;">${t.desc}</span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>

            <!-- Middle Section: 100% Specification Coverage Bank -->
            <div style="border: 1.5px solid #1e3a8a; border-radius: 5px; padding: 5px 8px; background: #fff; margin-bottom: 5px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #1e3a8a; padding-bottom: 2px; margin-bottom: 3px;">
                    <strong style="color: #1e3a8a; font-size: 7.6pt; text-transform: uppercase;">📚 Key Topic ${ktKey.replace('KT', '')} Specification Practice Bank: 100% Curriculum Coverage</strong>
                    <span style="font-size: 6.4pt; color: #64748b;">Every remaining specification bullet point tested below</span>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 2.5px;">
                    ${meta.specBank
                      .map(
                        (item) => `
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; font-size: 6.6pt; display: flex; justify-content: space-between; align-items: center;">
                            <span style="flex: 1; padding-right: 6px;">
                                <strong style="color: #1e3a8a;">Question ${item.num}:</strong> ${item.q}
                                ${item.focus ? `<div style="color: #64748b; font-size: 6pt; margin-top: 1px;">💡 <em>${item.focus}</em></div>` : ''}
                            </span>
                            <span style="font-size: 6.2pt; font-weight: 800; background: #e0e7ff; color: #3730a3; padding: 1.5px 5px; border-radius: 3px; white-space: nowrap;">
                                ${item.type}
                            </span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>

            <!-- Bottom Section: Pupil Personal Revision Action Plan -->
            <div style="border: 1.5px dashed #475569; border-radius: 5px; padding: 5px 8px; background: #f8fafc;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                    <strong style="color: #334155; font-size: 7.2pt; text-transform: uppercase;">
                        ✍️ Pupil Diagnostic Action Plan &amp; Targeted Revision Commitments
                    </strong>
                    <span style="font-size: 6.4pt; color: #64748b;">Complete following self-marking of Pages 2–11</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 3px;">
                    <div>
                        <span style="font-size: 6.5pt; font-weight: 700; color: #475569;">1. Weakest Sub-Topic / Knowledge Area:</span>
                        <div class="writing-line" style="height: 19px;"><span style="color: #94a3b8; font-size: 6.5pt;">Specific lesson or event:</span></div>
                    </div>
                    <div>
                        <span style="font-size: 6.5pt; font-weight: 700; color: #475569;">2. Key Dates / Statistics I Need to Memorise:</span>
                        <div class="writing-line" style="height: 19px;"><span style="color: #94a3b8; font-size: 6.5pt;">Flashcard priorities:</span></div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 6px; font-size: 6.5pt;">
                    <span><strong>Revision Commitment:</strong> [ &nbsp; ] Complete Quiz Flashcards &nbsp;&nbsp; [ &nbsp; ] Redo Timed Dual-Track &nbsp;&nbsp; [ &nbsp; ] Practice Spec Bank Question</span>
                    <span><strong>Target Grade:</strong> [ 9 &nbsp; 8 &nbsp; 7 &nbsp; 6 &nbsp; 5 &nbsp; 4 ]</span>
                </div>
            </div>
        </div>

        <div class="page-footer">
            <span>Mr Lovett's History Hub · End of Key Topic ${ktKey.replace('KT', '')} Mastery Booklet</span>
            <span>100% Specification Exhaustive Revision Suite</span>
            <span>Page 12 of 12</span>
        </div>
    </div>

</body>
</html>`;
}

(async () => {
  try {
    console.log('🚀 Loading CME unit data and official specification...');
    const mod = await import(pathToFileURL(dataJsPath).href);
    const unitData = mod.default || mod.unitData || mod.cme_new;

    // Build each of the 3 Key Topic HTML booklets
    const generatedHtmlFiles = {};

    for (const [ktKey, meta] of Object.entries(KT_DATA)) {
      console.log(`\n📄 Compiling 12-Page Mastery Booklet for ${ktKey}...`);

      let questions = [];
      let answers = [];

      meta.lessons.forEach((lIdx) => {
        const lesson = unitData.lessons[lIdx];
        if (lesson && lesson.quiz) {
          lesson.quiz.forEach((q) => {
            const qText = q.q || q.question;
            const aText = q.a || q.answer;
            const srcTitle = (lesson.title || '').split(':')[0].trim();
            questions.push({ q: qText, source: srcTitle });
            answers.push({ q: qText, a: aText, source: srcTitle });
          });
        }
      });

      console.log(`   Found ${questions.length} recall questions for ${ktKey}.`);

      const htmlContent = renderBookletHtml(ktKey, meta, questions, answers, 1, 1);
      const outHtmlPath = path.join(bookletsDir, `cme_mastery_${ktKey}.html`);
      fs.writeFileSync(outHtmlPath, htmlContent, 'utf8');
      generatedHtmlFiles[ktKey] = outHtmlPath;
      console.log(`   ✅ Saved HTML: ${path.basename(outHtmlPath)}`);
    }

    // Now compile the Combined Master HTML booklet (36 Pages)
    console.log('\n📚 Compiling 36-Page Full Unit Master Booklet (cme_mastery_FULL.html)...');
    let fullHtmlPages = '';
    for (const [ktKey, meta] of Object.entries(KT_DATA)) {
      const htmlFile = generatedHtmlFiles[ktKey];
      const rawHtml = fs.readFileSync(htmlFile, 'utf8');
      // Extract the body content
      const bodyMatch = rawHtml.match(/<body>([\s\S]*?)<\/body>/);
      if (bodyMatch) {
        fullHtmlPages += bodyMatch[1] + '\n';
      }
    }

    const fullHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Conflict in the Middle East, 1945–1995 — Complete Unit Mastery Booklet</title>
    <style>${COMMON_CSS}</style>
</head>
<body>
    ${fullHtmlPages}
</body>
</html>`;

    const fullHtmlPath = path.join(bookletsDir, 'cme_mastery_FULL.html');
    fs.writeFileSync(fullHtmlPath, fullHtmlContent, 'utf8');
    console.log(`   ✅ Saved Full Master HTML: cme_mastery_FULL.html`);

    // Launch Puppeteer to compile the 4 PDFs
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
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        landscape: false,
        printBackground: true,
        margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' },
        timeout: 180000,
      });
      await page.close();
      console.log(`   📕 Exported PDF: ${label}`);
    };

    // 1. KT1 PDF
    const kt1PdfPath = path.join(pdfsDir, 'cme_mastery_pack_KT1.pdf');
    await renderPdf(generatedHtmlFiles['KT1'], kt1PdfPath, 'cme_mastery_pack_KT1.pdf (12 Pages)');

    // 2. KT2 PDF
    const kt2PdfPath = path.join(pdfsDir, 'cme_mastery_pack_KT2.pdf');
    await renderPdf(generatedHtmlFiles['KT2'], kt2PdfPath, 'cme_mastery_pack_KT2.pdf (12 Pages)');

    // 3. KT3 PDF
    const kt3PdfPath = path.join(pdfsDir, 'cme_mastery_pack_KT3.pdf');
    await renderPdf(generatedHtmlFiles['KT3'], kt3PdfPath, 'cme_mastery_pack_KT3.pdf (12 Pages)');

    // 4. FULL Master PDF
    const fullPdfPath = path.join(pdfsDir, 'cme_mastery_pack_FULL.pdf');
    await renderPdf(
      fullHtmlPath,
      fullPdfPath,
      'cme_mastery_pack_FULL.pdf (36 Pages Master Volume)',
    );

    // Also copy to public/pdfs/ so both /pdfs/cme_new/ and /pdfs/ routes resolve cleanly
    const globalPdfsDir = path.join(__dirname, '..', 'public', 'pdfs');
    fs.copyFileSync(kt1PdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_KT1.pdf'));
    fs.copyFileSync(kt2PdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_KT2.pdf'));
    fs.copyFileSync(kt3PdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_KT3.pdf'));
    fs.copyFileSync(fullPdfPath, path.join(globalPdfsDir, 'cme_mastery_pack_FULL.pdf'));
    console.log(`   📋 Synced PDFs to public/pdfs/ root`);

    await browser.close();
    console.log('\n🎉 Successfully compiled all 4 Mastery Booklets into print-perfect PDFs!');
  } catch (err) {
    console.error('❌ Error generating CME mastery booklets:', err);
    process.exit(1);
  }
})();
