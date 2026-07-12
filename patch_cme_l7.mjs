import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(filePath, 'utf8');

const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Parse error:", e);
  process.exit(1);
}

const lesson7 = {
  "id": "lesson_7",
  "title": "Lesson 7: Diplomatic negotiations, 1974–1979",
  "teacher_notes": {
    "primer": "This lesson explores the shift from military conflict to high-stakes diplomacy in the Middle East. Students will examine how the 1973 Oil Crisis incentivized the superpowers to broker peace, the intricacies of Kissinger's 'shuttle diplomacy', and the dramatic breakthrough of the Camp David Accords.",
    "objectives": [
      {
        "objective": "Evaluate the geopolitical impact of the 1973 Oil Crisis.",
        "primer": "Discuss how OPEC's embargo caused stagflation in the West, forcing the US to actively mediate peace to secure its energy supply.",
        "question": "Why did the United States suddenly have a powerful financial incentive to broker peace after 1973?"
      },
      {
        "objective": "Understand Henry Kissinger's 'shuttle diplomacy'.",
        "primer": "Map out the step-by-step agreements of Sinai I, Golan, and Sinai II, highlighting the reopening of the Suez Canal.",
        "question": "What specific strategic concessions did Israel make in the Sinai II Agreement?"
      },
      {
        "objective": "Analyze the Camp David Accords and the Treaty of Washington.",
        "primer": "Break down the two framework agreements of Camp David and the resulting 1979 Peace Treaty, evaluating the severe backlash Sadat faced from the Arab world.",
        "question": "What were the two distinct framework agreements produced during the 13 days of seclusion at Camp David?"
      }
    ]
  },
  "do_now": {
    "type": "retrieval",
    "items": [
      {
        "question": "Who succeeded Gamal Abdel Nasser as President of Egypt following his death in September 1970?",
        "answer": "Anwar Sadat."
      },
      {
        "question": "On which major Jewish holy day did Egypt and Syria launch their coordinated surprise attack in October 1973?",
        "answer": "Yom Kippur (the Day of Atonement)."
      },
      {
        "question": "What was the name of the massive sand-wall fortification built by Israel along the east bank of the Suez Canal that Egyptian forces successfully overran?",
        "answer": "The Bar Lev Line."
      },
      {
        "question": "Which global organisation, dominated by Arab oil-producing countries, implemented the 'oil weapon' in October 1973 to pressure Western nations?",
        "answer": "OPEC (Organization of the Petroleum Exporting Countries)."
      },
      {
        "question": "What was the static, attrition-based conflict along the Suez Canal from 1969 to 1970 called, and which superpower provided Egypt with 15,000 advisors and SAM-3 missiles during it?",
        "answer": "The War of Attrition. The Soviet Union (USSR) provided the advisors and missiles."
      },
      {
        "question": "Why did Anwar Sadat make the dramatic decision to expel 15,000 Soviet military advisors from Egypt in July 1972?",
        "answer": "He was frustrated by Soviet reluctance to supply offensive weaponry and calculated that expelling them would please the United States, hoping Washington would then pressure Israel into returning the Sinai Peninsula."
      },
      {
        "question": "Explain how the US military airlift, known as Operation Nickel Grass, influenced the course of the Yom Kippur War.",
        "answer": "It replaced Israel’s heavy initial losses of tanks, jets, and ammunition. This vital logistical support allowed the IDF to stabilize their defense lines, launch a counter-offensive, and encircle Egypt's Third Army."
      },
      {
        "question": "What were the two primary targets of Egypt's maritime blockade established in the years immediately following the 1949 armistice?",
        "answer": "Egypt blocked the Suez Canal to all Israel-bound cargo and established a naval blockade at the Straits of Tiran to choke off Israeli trade through its southern port of Eilat."
      },
      {
        "question": "Explain the two key economic effects of the OPEC 'oil weapon' on Western nations supporting Israel in late 1973.",
        "answer": "OPEC placed a total oil embargo on the US and Western nations. This caused a severe global energy crisis (fuel shortages) and quadrupled the price of oil from $3 to $12 a barrel, triggering massive inflation."
      },
      {
        "question": "Write an analytical sentence linking the outcome of the Yom Kippur War to the emergence of diplomatic negotiations in the mid-1970s.",
        "answer": "Because the Yom Kippur War ended in a costly military stalemate that shattered the myth of Israeli invincibility and triggered a global oil crisis, superpowers realized military force had its limits, paving the way for 'shuttle diplomacy'."
      }
    ]
  },
  "vocab": [
    {
      "term": "OPEC",
      "definition": "Organization of the Petroleum Exporting Countries; enacted the 'Oil Weapon' in 1973, placing an embargo on Western nations."
    },
    {
      "term": "Shuttle Diplomacy",
      "definition": "Henry Kissinger's mediation technique of flying continuously between hostile capitals to broker military disengagement treaties."
    },
    {
      "term": "Likud",
      "definition": "A right-wing Israeli political bloc that came to power in 1977 under Menachem Begin, a staunch supporter of Revisionist Zionism."
    },
    {
      "term": "Camp David Accords",
      "definition": "Two framework agreements signed in September 1978 after 13 days of secret negotiations mediated by US President Jimmy Carter."
    },
    {
      "term": "Treaty of Washington",
      "definition": "The 1979 formal peace treaty where Israel returned the Sinai to Egypt in exchange for official diplomatic recognition."
    }
  ],
  "narrative": [
    "The Yom Kippur War of October 1973 was a military conflict that triggered a global economic and geopolitical revolution. Alarmed by the massive US arms airlift to Israel (Operation Nickel Grass), the Arab members of OPEC (Organization of the Petroleum Exporting Countries) enacted the \"Oil Weapon.\" They placed a total oil embargo on the United States, Denmark, and the Netherlands, while cutting production for other Western nations by 25%.",
    "This move had a devastating, cascading impact on the global economy. The price of crude oil quadrupled in a matter of months, skyrocketing from $3 to $12 a barrel. Western industrial nations, highly dependent on cheap oil, plunged into a deep economic crisis characterized by soaring inflation (rising prices) and high unemployment. As oil prices rose, production costs increased, making goods more expensive; consequently, consumers bought fewer items, leading to factory bankruptcies and mass layoffs.",
    "<pre class=\"ascii-diagram\">\n                 [THE COGNITIVE IMPACT OF OPEC'S EMBARGO]\n                                    |\n+-----------------------------------+-----------------------------------+\n|                                   v                                   |\n|                     [United States Peace Incentive]                   |\n| - Economy severely damaged by inflation and fuel shortages.           |\n| - Realized they must stabilize the Middle East to prevent future oil  |\n|   crises and limit expanding Soviet influence in Egypt and Syria.     |\n+-----------------------------------------------------------------------+\n</pre>",
    "For the superpowers, the crisis changed the calculation of Middle Eastern diplomacy. The Yom Kippur War had brought the United States and the Soviet Union to the brink of a nuclear confrontation. The United States, badly hit by the embargo, now had a powerful financial incentive to broker a lasting peace between Israel and its Arab neighbors to ensure the stable flow of Middle Eastern oil. Furthermore, US policymakers wanted to use diplomatic negotiations to pull Egypt out of the Soviet sphere of influence.",
    "Because Egypt and Syria refused to meet face-to-face with Israeli officials, US Secretary of State Henry Kissinger stepped in as a mediator. Kissinger pioneered a form of negotiation known as \"shuttle diplomacy,\" flying back and forth between Cairo, Damascus, and Tel Aviv for two months to relay messages, draft proposals, and bridge the deep psychological divide between the hostile states.",
    "<pre class=\"ascii-diagram\">\n               [KISSINGER'S SHUTTLE DIPLOMACY PIPELINE (1974-75)]\n                                       |\n[Sinai I (Jan 1974)] -> [Golan Accord (May 1974)] -> [Sinai II (Sept 1975)]\n- Egypt-Israel pull-back  - Syria-Israel cease-fire   - Israel abandons passes\n- Reopened Suez Canal     - UN buffer zone created    - US early-warning hubs built\n</pre>",
    "Kissinger’s efforts produced three highly important interim agreements. The Sinai I Agreement (January 1974) saw Israeli forces pull back from the west bank of the Suez Canal, creating a UN-patrolled buffer zone. The Golan Accord (May 1974) brokered a cease-fire line on the Golan Heights, with Israel withdrawing from Quneitra. The Sinai II Agreement (September 1975) saw Israel surrender the strategic Gidi and Mitla passes and the vital Abu Rudeis oil fields to Egypt. Crucially, the US established manned early-warning electronic monitoring stations in Sinai to guarantee compliance.",
    "A direct consequence of Kissinger's Sinai I agreement was the clearing of the Suez Canal. The canal had been blocked since the 1967 Six Day War by sunken ships and landmines. On 5 June 1975—exactly eight years to the day after its closure—President Anwar Sadat officially reopened the Suez Canal to international trade, providing a major boost to the Egyptian economy.",
    "By 1977, the momentum of Kissinger’s shuttle diplomacy had stalled. In May 1977, the right-wing Likud bloc came to power in Israel, with Menachem Begin installed as Prime Minister. Begin firmly believed in Israel’s biblical claim to the entire Land of Israel, including the West Bank. Most observers assumed Begin's election would end all hopes of peace.",
    "<pre class=\"ascii-diagram\">\n[Sadat faces economic collapse & riots] -> [Realises conventional war is too costly]\n                                               |\n[Declares to Egyptian Parliament] -> [Will go to \"the ends of the earth\" for peace]\n                                               |\n[Begin extends formal invitation] -> [Sadat lands at Ben Gurion Airport (19 Nov 1977)]\n</pre>",
    "However, Anwar Sadat was facing severe internal pressures, a failing economy, and food riots in Cairo. Sadat realized only a dramatic, direct gesture could break the diplomatic deadlock. On 19 November 1977, Sadat’s presidential plane landed at Ben Gurion Airport in Israel. The following day, he addressed the Israeli Knesset, offering Israel complete recognition and permanent peace in exchange for complete Israeli withdrawal from all occupied Arab lands.",
    "By mid-1978, direct talks between Egypt and Israel had once again broken down over Begin’s refusal to dismantle Jewish settlements in the Sinai. To rescue the process, US President Jimmy Carter took a massive political risk, inviting both Sadat and Begin to the presidential retreat at Camp David, Maryland, for face-to-face negotiations.",
    "<pre class=\"ascii-diagram\">\n                     [THE CAMP DAVID SUMMIT (SEPT 1978)]\n                                     |\n[13 Days of Seclusion] -> [Jimmy Carter's Mediation] -> [Two Framework Agreements]\n</pre>",
    "For 13 days, Carter acted as a tireless mediator. The grueling summit resulted in the signing of the Camp David Accords on 17 September 1978. Framework 1 addressed the wider Palestinian issue, agreeing to a five-year transitional period of autonomy for the West Bank and Gaza Strip. Framework 2 outlined a bilateral peace treaty: Israel agreed to a phased, complete withdrawal from the Sinai Peninsula, and Egypt agreed to normalise relations.",
    "On 26 March 1979, Begin, Sadat, and Carter signed the formal Treaty of Peace between Egypt and Israel (the Treaty of Washington). Israel returned the entire Sinai Peninsula to Egypt, which became demilitarised. In return, Egypt officially recognized Israel’s right to exist, becoming the first Arab nation to do so. The Suez Canal and the Straits of Tiran were permanently open to Israeli maritime shipping.",
    "<pre class=\"ascii-diagram\">\n[Sinai returned to Egypt (phased)] -> [Egypt grants diplomatic recognition to Israel]\n                                                 |\n[Sinai demilitarised & monitored] -> [Suez Canal & Straits of Tiran fully open to IDF]\n</pre>",
    "While celebrated in the West, the peace treaty triggered a massive geopolitical backlash in the Middle East. The Arab League expelled Egypt for abandoning the Palestinian cause. Tragically, on 6 October 1981, Anwar Sadat was assassinated by radical Islamic militants within the Egyptian army who opposed his peace with Israel. Begin also faced furious opposition from hardline settlers, but the Knesset approved the treaty with a massive majority of 84 votes to 19."
  ],
  "tasks": [
    {
      "text": "Explain one consequence of the 1973 Oil Crisis for diplomatic negotiations in the Middle East. (4 marks)",
      "type": "consequence",
      "model": "<p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">One consequence of</mark> the 1973 Oil Crisis was that it forced the United States to abandon its policy of indifference and actively intervene as a neutral mediator to negotiate peace in the Middle East. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Following the Yom Kippur War</mark>, Arab members of <strong>OPEC</strong> implemented an oil embargo and quadrupled oil prices from $3 to $12 a barrel to punish the West for supporting Israel, plunging the US economy into severe inflation and high unemployment.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">As a direct consequence of this economic shock</mark>, US Secretary of State <strong>Henry Kissinger</strong> launched a tireless campaign of <strong>'shuttle diplomacy'</strong>. Kissinger flew continuously between Middle Eastern capitals to broker military disengagement treaties (<strong>Sinai I and II</strong>), which successfully eased regional tensions and directly led to Egypt reopening the strategically vital <strong>Suez Canal</strong> in June 1975.</p>"
    }
  ],
  "flashcards": [
    {
      "term": "Stagflation",
      "definition": "An economic crisis characterized by soaring inflation and high unemployment, triggered by the 1973 OPEC oil shock."
    },
    {
      "term": "Shuttle Diplomacy",
      "definition": "Henry Kissinger's mediation technique of flying continuously between Cairo, Damascus, and Tel Aviv to bridge the psychological divide."
    },
    {
      "term": "Sinai II Agreement",
      "definition": "A 1975 treaty where Israel surrendered the strategic Gidi and Mitla passes and Abu Rudeis oil fields to Egypt."
    },
    {
      "term": "Likud",
      "definition": "The right-wing Israeli political bloc led by Menachem Begin that swept to power in 1977."
    },
    {
      "term": "Camp David Accords",
      "definition": "Two framework agreements signed in September 1978 after 13 days of intense, secluded negotiations mediated by Jimmy Carter."
    },
    {
      "term": "Treaty of Washington",
      "definition": "The 1979 formal peace treaty where Israel returned the Sinai Peninsula to Egypt in exchange for full diplomatic recognition."
    }
  ]
};

const existingIndex = data.lessons.findIndex(l => l.id === "lesson_7");
if (existingIndex >= 0) {
  data.lessons[existingIndex] = lesson7;
} else {
  data.lessons.push(lesson7);
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully injected Lesson 7 in cme_new/data.js");
