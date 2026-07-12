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

// Helper to clean reference tags like [21_branch1]
const cleanText = (text) => text.replace(/\s*\[\d+(_[a-zA-Z0-9]+)?\]/g, '');

const doNowItems = [
  {
    "question": "Who was the US Secretary of State who pioneered the stage-by-step mediation strategy known as 'shuttle diplomacy' following the 1973 Yom Kippur War?",
    "answer": "Henry Kissinger."
  },
  {
    "question": "In what month and year did Egypt officially reopen the Suez Canal to international shipping, exactly eight years to the day after its closure?",
    "answer": "June 1975 (specifically 5 June 1975)."
  },
  {
    "question": "Explain how the 1973 Oil Crisis acted as a direct catalyst for the United States to become heavily involved in Middle Eastern diplomacy.",
    "answer": "The Arab OPEC oil embargo caused severe inflation and fuel shortages in the West. This economic shock forced the US to actively stabilize the region to secure its energy supply and limit growing Soviet influence."
  },
  {
    "question": "Which right-wing, revisionist Zionist leader won the May 1977 Israeli election, ending nearly thirty years of Labor Party dominance?",
    "answer": "Menachem Begin."
  },
  {
    "question": "Explain how Anwar Sadat’s historic visit to Jerusalem in November 1977 broke a decades-long Arab diplomatic taboo.",
    "answer": "By traveling directly to Jerusalem and addressing the Israeli Knesset, Sadat broke the Arab League's 'Three Nos'. He offered Israel full diplomatic recognition and permanent peace in exchange for a complete withdrawal from occupied territories."
  },
  {
    "question": "Name the two distinct framework agreements that comprised the Camp David Accords signed on 17 September 1978.",
    "answer": "1. 'A Framework for Peace in the Middle East' (autonomy for West Bank/Gaza). 2. 'Framework for the Conclusion of a Peace Treaty between Egypt and Israel' (bilateral peace and Sinai withdrawal)."
  },
  {
    "question": "Detail the primary bilateral terms of the Treaty of Washington signed on 26 March 1979.",
    "answer": "Israel agreed to a phased, complete withdrawal from the Sinai Peninsula. In return, Egypt officially recognized Israel’s right to exist, demilitarized the Sinai, and guaranteed free passage through the Suez Canal."
  },
  {
    "question": "How did the wider Arab world react to Egypt signing a separate peace treaty with Israel in 1979?",
    "answer": "The Arab world viewed Sadat as a traitor who abandoned the Palestinian cause. The Arab League expelled Egypt, suspended all economic aid, and relocated its headquarters to Tunis."
  },
  {
    "question": "Explain the domestic backlash and political fallout that both Anwar Sadat and Menachem Begin faced within their own countries after signing the peace agreements.",
    "answer": "Sadat was assassinated in 1981 by radical Islamic militants in the Egyptian military. Begin faced intense condemnation from Likud hardliners and Gush Emunim settlers for dismantling Jewish settlements in Sinai."
  },
  {
    "question": "Using a relative clause and an analytical linking phrase, write a single sentence showing how the 1973 Oil Crisis historically connected to the Treaty of Washington (1979).",
    "answer": "The 1973 Oil Crisis, which devastated Western economies through quadrupled oil prices, forced the United States to prioritize Middle Eastern stability, leading directly to their extensive mediation at Camp David and the 1979 Treaty of Washington."
  }
].map(item => ({ question: cleanText(item.question), answer: cleanText(item.answer) }));

const lesson8 = {
  "id": "lesson_8",
  "title": "Lesson 8: The Palestinian Issue, 1974–1993",
  "teacher_notes": {
    "primer": "This lesson covers the diplomatic shift of the PLO, its military relocation to Lebanon, and the brutal civil uprising of the First Intifada. Students will trace Arafat's dual strategy of 'the gun and the olive branch' and evaluate the consequences of the 1982 Lebanese invasion.",
    "objectives": [
      {
        "objective": "Understand the significance of Yasser Arafat's 1974 speech to the UN.",
        "primer": "Emphasize the metaphorical 'gun and olive branch' and the resulting UN Resolution 3236 which granted the PLO observer status.",
        "question": "Why did Arafat bring both a gun and an olive branch to the UN General Assembly?"
      },
      {
        "objective": "Analyze the causes and consequences of the 1982 Israeli invasion of Lebanon.",
        "primer": "Track the establishment of 'Fatahland' to the assassination of Bashir Gemayel and the ensuing Sabra and Shatila massacres.",
        "question": "Why did Ariel Sharon use the attempted assassination of Shlomo Argov as a pretext to invade Lebanon?"
      },
      {
        "objective": "Evaluate the nature of the First Intifada and its impact on Israeli policy.",
        "primer": "Highlight the grassroots civil disobedience of the Intifada and how global media coverage of Rabin's 'Iron Fist' policy shifted international sympathy.",
        "question": "How did the First Intifada differ fundamentally from previous PLO military operations?"
      }
    ]
  },
  "do_now": {
    "type": "retrieval",
    "items": doNowItems
  },
  "vocab": [
    {
      "term": "UN Resolution 3236",
      "definition": "A 1974 UN resolution that recognized the inalienable rights of the Palestinian people to self-determination and granted the PLO observer status."
    },
    {
      "term": "Fatahland",
      "definition": "The PLO's powerful 'state-within-a-state' in southern Lebanon, from which they launched rocket attacks into northern Israel."
    },
    {
      "term": "Operation Peace for Galilee",
      "definition": "The 1982 full-scale Israeli military invasion of Lebanon aimed at destroying the PLO's infrastructure."
    },
    {
      "term": "Sabra and Shatila",
      "definition": "Two Palestinian refugee camps in Beirut where Phalangist militias massacred hundreds of civilians in 1982 while the IDF held the perimeter."
    },
    {
      "term": "First Intifada",
      "definition": "A grassroots, popular civilian uprising ('The Shaking Off') against Israeli occupation that erupted in Gaza and the West Bank in 1987."
    },
    {
      "term": "Hezbollah",
      "definition": "A radical Shia militant movement ('The Party of God') backed by Iran that emerged in Lebanon following the PLO's expulsion."
    }
  ],
  "narrative": [
    "Following the 1973 Yom Kippur War, the Palestine Liberation Organisation (PLO) sought to capitalize on the shifting geopolitical landscape to advance its diplomatic standing. On 13 November 1974, PLO Chairman Yasser Arafat made a historic address to the United Nations General Assembly in New York. This invitation was highly significant, representing the first time a representative of a non-state national movement was permitted to address the UN General Assembly plenary.",
    "Arafat, who delivered his speech wearing his signature checkered keffiyeh and olive-green uniform, famously concluded his remarks with a powerful metaphorical warning: \"I have come bearing an olive branch and a freedom fighter's gun. Do not let the olive branch fall from my hand.\"",
    "<pre class=\"ascii-diagram\">\n                     [ARAFAT'S 1974 DIPLOMATIC COGNITION]\n                                      |\n         +----------------------------+----------------------------+\n         v                                                         v\n[Arafat's Metaphorical Warning]                     [UN Resolution 3236 (Nov 1974)]\n- Bearer of \"olive branch\" (diplomacy)               - Recognized right to self-determination\n- Bearer of \"freedom fighter's gun\" (violence)       - Conferred permanent UN Observer Status\n- Demanded sovereign homeland                        - Legitimized PLO as sole representative\n</pre>",
    "This dual-track message signaled that while the PLO was prepared to engage in international diplomacy to secure a sovereign Palestinian state, it would not abandon its armed struggle if diplomatic avenues were blocked. The diplomatic offensive yielded immediate results at the UN. Resolution 3236 formally recognized the inalienable rights of the Palestinian people to self-determination, and granted the PLO permanent Observer Status. At the Arab League Summit in Algiers, the PLO was officially recognized as the \"sole legitimate representative of the Palestinian nation.\"",
    "Following its bloody expulsion from Jordan during the \"Black September\" civil war of 1970, the PLO relocated its central leadership, military apparatus, and thousands of fighters to Lebanon. Lebanon was an ideal haven: its central government in Beirut was weak, and the country already hosted over 400,000 Palestinian refugees living in camps.",
    "<pre class=\"ascii-diagram\">\n                 [THE RISE OF \"FATAHLAND\" IN LEBANON]\n                                  |\n[PLO Expelled from Jordan (1970)] -> [PLO Establishes HQ in Southern Lebanon]\n                                  |\n[Cross-Border Katyusha Rocket Attacks] -> [Galilee Settlements Targeted]\n                                  |\n[1975 Lebanese Civil War Erupts] -> [PLO Allies with Leftist Muslim Coalition]\n</pre>",
    "By the mid-1970s, the PLO had established a powerful \"state-within-a-state\" in southern Lebanon, widely known as \"Fatahland\". The PLO operated its own checkpoints, collected taxes, ran hospitals, and established military training camps. From these bases, PLO guerrilla fighters launched cross-border raids and fired Katyusha rocket barrages into northern Israel, terrorizing the civilian settlements of the Galilee region.",
    "On 11 March 1978, a Fatah commando unit launched the Coastal Road Massacre, hijacking a civilian bus and engaging in a gun battle that resulted in the deaths of 37 Israeli civilians. In direct retaliation, Prime Minister Menachem Begin ordered the IDF to launch Operation Litani on 15 March 1978.",
    "<pre class=\"ascii-diagram\">\n[Fatah Coastal Road Massacre (37 Dead)] -> [Operation Litani Launched (March 1978)]\n                                                     |\n[IDF Occupies Southern Lebanon Buffer Zone] -> [UN Security Council Resolution 425]\n                                                     |\n[UNIFIL Deployed to Border] -> [Israel Builds South Lebanon Army (SLA) Militia]\n</pre>",
    "Over 26,000 IDF troops invaded southern Lebanon, occupying a 10-kilometer-wide security strip. The UN established the United Nations Interim Force in Lebanon (UNIFIL) to confirm the Israeli withdrawal. Israel withdrew but left control of the buffer zone to a friendly, pro-Israeli Christian militia known as the South Lebanon Army (SLA).",
    "The UNIFIL buffer failed to stop the conflict. The final trigger for full-scale war occurred on 3 June 1982, when the Abu Nidal Organization shot and critically wounded Shlomo Argov, Israel’s ambassador to Great Britain. Although British intelligence confirmed the PLO was not responsible, Israeli Defense Minister Ariel Sharon used the assassination attempt as the necessary pretext to launch a long-planned, total invasion of Lebanon: Operation Peace for Galilee.",
    "<pre class=\"ascii-diagram\">\n                             [THE 1982 LEBANESE INVASION]\n                                          |\n[Ambassador Shlomo Argov Shot (3 June)] -> [Operation Peace for Galilee (6 June)]\n                                          |\n[IDF Bypasses UNIFIL and Races North] -> [Heavy Syrian Air Clashes (100 MiGs Shot Down)]\n                                          |\n[Siege of West Beirut Encirclement] -> [14,000 PLO Fighters Evacuated to Tunis]\n</pre>",
    "On 6 June 1982, Israeli forces launched a massive armored invasion. Ariel Sharon secretly harbored much larger geopolitical ambitions: to completely destroy the PLO in Lebanon, defeat Syrian forces, and install a pro-Israeli Christian government in Beirut led by Maronite leader Bashir Gemayel.",
    "By mid-June, Israeli forces surrounded Lebanon's capital, trapping Yasser Arafat and 15,000 PLO fighters in West Beirut. For over two months, Israel subjected the city to relentless bombardments. To prevent total destruction, a multinational peacekeeping force supervised the evacuation of Yasser Arafat and over 14,000 fighters by ship to Tunis, Tunisia.",
    "Having successfully expelled the PLO, Israel's close Maronite ally, Bashir Gemayel, was elected President of Lebanon. However, on 14 September 1982, Gemayel was assassinated in a massive bomb blast by Syrian agents.",
    "<pre class=\"ascii-diagram\">\n[Bashir Gemayel Assassinated (14 Sept)] -> [IDF Encirclement of Sabra & Shatila Camps]\n                                                   |\n[Phalangist Militias Allowed Into Camps] -> [Three-Day Brutal Massacre of Civilians]\n                                                   |\n[Global Outrage & Kahan Commission] -> [Ariel Sharon Forced to Resign]\n</pre>",
    "In response to the assassination, the IDF occupied West Beirut. On 16 September 1982, Israeli forces surrounded the Palestinian refugee camps of Sabra and Shatila. Claiming PLO terrorists remained inside, Ariel Sharon authorized the Lebanese Christian Phalangist militias to enter the camps to clear them. Fueled by anger over the death of Gemayel, the Phalangists systematically slaughtered unarmed civilians. While the IDF held the perimeter and illuminated the night skies with flares, the militias murdered between 800 and 3,500 people.",
    "The revelation of the atrocities triggered immediate, furious international condemnation. The extraparliamentary peace movement \"Peace Now\" organized a protest of 400,000 Israelis in Tel Aviv. The Kahan Commission concluded that Defense Minister Ariel Sharon bore \"personal, indirect responsibility\" for the tragedy. He was forced to resign.",
    "<pre class=\"ascii-diagram\">\n               [LONG-TERM RESULTS OF LEBANESE INVASION]\n                                  |\n     +----------------------------+----------------------------+\n     v                            v                            v\n[PLO Expelled to Tunis]      [The Rise of Hezbollah]      [Israeli Security Zone]\n- Leadership moved 2,400km   - Formed by Shia militants   - Narrow corridor (5-15km)\n  away from Israel's borders   to resist IDF occupation   - SLA and IDF manned corridor\n- Weakened military threat   - Backed directly by Iran    - High IDF casualties\n</pre>",
    "While the PLO leadership remained isolated in Tunis, the core of the Palestinian struggle shifted back to the occupied territories. On 8 December 1987, an Israeli military truck collided with a civilian car, killing four Palestinians. The local population erupted in massive demonstrations that swept across Gaza and the West Bank, marking the start of the First Palestinian Intifada (\"The Shaking Off\").",
    "<pre class=\"ascii-diagram\">\n                 [THE INTIFADA ESCALATION CYCLE]\n                                |\n[Israeli Military Truck Collision kills 4 Palestinians] -> [Spontaneous Mass Uprising]\n                                |\n[Grassroots Civil Disobedience & Stone Throwing] -> [Yitzhak Rabin's \"Iron Fist\" Reprisal]\n                                |\n[Global Sympathy Shifts to Palestinian Cause] -> [Emergence of Militant Hamas]\n</pre>",
    "Unlike the PLO operations, the First Intifada was a grassroots, popular civilian uprising utilizing non-violent civil disobedience (strikes, boycotts) alongside low-level street violence. The iconic visual of the Intifada consisted of Palestinian youth throwing stones at heavily armored Israeli tanks.",
    "Israeli Defense Minister Yitzhak Rabin responded with a severe \"Iron Fist\" policy, ordering the IDF to \"break the bones\" of demonstrators. However, television cameras broadcasted graphic footage of heavily armed soldiers beating stone-throwing children across the globe. For the first time, global public sympathy shifted decisively toward the Palestinian cause, severely damaging Israel’s international moral standing.",
    "<pre class=\"ascii-diagram\">\n+------------------------------------------------------------------------------------+\n|                        CONSEQUENCES OF THE FIRST INTIFADA                          |\n+--------------------------+---------------------------+-----------------------------+\n|      For the PLO         |         For Israel        |     The Rise of Hamas       |\n+--------------------------+---------------------------+-----------------------------+\n| Forced Yasser Arafat to  | Convinced Yitzhak Rabin   | Formed in 1987 as a rival   |\n| renounce terrorism and   | and military planners     | to the PLO, Hamas rejected  |\n| officially accept the    | that there was no purely  | compromises and conducted   |\n| two-state solution (1988)| military solution to the  | violent armed attacks       |\n| to retain leadership     | Palestinian issue         | against Israelis            |\n+--------------------------+---------------------------+-----------------------------+\n</pre>",
    "<h3>Writing Historically: Level 9 Stylistic Masterclass</h3>\n<p>GCSE history examiners actively look for clear, sophisticated written expression that demonstrates analytical links between historical causes, events, and consequences.</p>\n<ul>\n<li><strong>1. Using Relative Clauses to Pack in Evidence (AO1):</strong> Add vital historical information directly to a noun using relative pronouns like 'who', 'which', or 'whose'. For example: <em>Yasser Arafat, <strong>who addressed the UN General Assembly in 1974 wearing his signature keffiyeh and military uniform</strong>, successfully secured international legitimacy...</em></li>\n<li><strong>2. Using Noun Phrases in Apposition (AO1):</strong> Place two noun phrases side-by-side to provide concise historical detail. For example: <em>Ariel Sharon, <strong>the hardline Israeli Defense Minister</strong>, launched Operation Peace for Galilee in June 1982.</em></li>\n<li><strong>3. Using Present Participles (AO2):</strong> Link cause and effect using verbs ending in '-ing'. For example: <em>...Palestinian guerrillas launched frequent cross-border attacks, <strong>provoking</strong> disproportionate Israeli military reprisals.</em></li>\n</ul>"
  ],
  "tasks": [
    {
      "text": "Write a narrative account analysing the key developments of the PLO in Lebanon in the years 1970–82. (8 marks)",
      "type": "narrative_account",
      "model": "<p>Following their crushing military defeat and subsequent expulsion from Jordan during the Black September civil war of 1970, <strong>the PLO relocated their central headquarters to Lebanon</strong>. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This relocation was highly significant because</mark> Lebanon's weak central government and its large population of 400,000 Palestinian refugees allowed <strong>Yasser Arafat</strong> to establish a powerful \"state-within-a-state\" in southern Lebanon, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">which became widely known as \"Fatahland\"</mark>. From these secure bases, Fatah launched frequent rocket attacks and sabotage raids into northern Israel, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">deeply threatening</mark> Israeli security and provoking a cycle of violent border reprisals.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This escalating border conflict reached a critical turning point</mark> in March 1978, when a Fatah commando unit conducted the <strong>Coastal Road Massacre</strong>, killing 37 Israeli civilians. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">In direct response to this atrocity</mark>, Israel launched <strong>Operation Litani</strong>, occupying southern Lebanon up to the Litani River. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Although Israel subsequently withdrew under UN pressure</mark>, the deployment of <strong>UNIFIL</strong> peacekeepers failed to halt the violence. The conflict was pushed to a final crisis on 3 June 1982, when the attempted assassination of <strong>Shlomo Argov</strong>, the Israeli ambassador in London, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">provided the immediate pretext for Defense Minister Ariel Sharon to launch a full-scale invasion</mark>.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This invasion, codenamed Operation Peace for Galilee, quickly escalated</mark> as IDF armored divisions bypassed UN lines, defeated Syrian forces, and completely encircled the capital city of West Beirut. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">The resulting two-month Siege of West Beirut was highly important because</mark> the intense military and diplomatic pressure forced the PLO to surrender. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This sequence of events culminated in late August 1982</mark>, when Yasser Arafat and over 14,000 PLO fighters were evacuated by a multinational force to <strong>Tunis, Tunisia</strong>, <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">leaving</mark> the PLO geographically isolated 2,400 kilometers away from Israel's borders.</p>"
    }
  ],
  "flashcards": [
    {
      "term": "UN Resolution 3236",
      "definition": "1974 UN resolution granting the PLO permanent observer status and recognizing Palestinian self-determination."
    },
    {
      "term": "Fatahland",
      "definition": "The PLO's 'state-within-a-state' in southern Lebanon used as a base for cross-border rocket attacks into Galilee."
    },
    {
      "term": "Operation Peace for Galilee",
      "definition": "Israel's 1982 full-scale invasion of Lebanon aimed at pushing the PLO out of artillery range and installing a friendly Christian government."
    },
    {
      "term": "Sabra & Shatila",
      "definition": "Palestinian refugee camps in Beirut where Lebanese Christian Phalangist militias massacred hundreds of civilians in 1982."
    },
    {
      "term": "First Intifada",
      "definition": "A grassroots, popular civilian uprising ('The Shaking Off') against Israeli occupation that erupted in Gaza and the West Bank in 1987."
    },
    {
      "term": "Iron Fist Policy",
      "definition": "Yitzhak Rabin's severe military response to the First Intifada, utilizing tear gas, rubber bullets, and mass arrests to 'break the bones' of demonstrators."
    }
  ]
};

const existingIndex = data.lessons.findIndex(l => l.id === "lesson_8");
if (existingIndex >= 0) {
  data.lessons[existingIndex] = lesson8;
} else {
  data.lessons.push(lesson8);
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully injected Lesson 8 in cme_new/data.js");
