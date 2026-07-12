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

const newLesson = {
  "id": "lesson_5",
  "title": "Lesson 5: The Aftermath of the 1967 War",
  "teacher_notes": {
    "primer": "This lesson shifts focus from conventional warfare to the diplomatic stalemate and the rise of asymmetrical guerrilla conflict. Students will explore how the Six Day War created the occupied territories and triggered the radicalization of the PLO, culminating in the Black September civil war and the Munich Olympics massacre.",
    "objectives": [
      {
        "objective": "Understand the diplomatic deadlock created by UN Resolution 242 and the Khartoum 'Three Nos'.",
        "primer": "Guide students through the linguistic loopholes of 242 and the Arab League's steadfast refusal to negotiate.",
        "question": "What was the fundamental disagreement in interpreting the English and French texts of UN Resolution 242?"
      },
      {
        "objective": "Analyze the strategic and demographic consequences of the Israeli occupation of the West Bank, Gaza, Sinai, and the Golan Heights.",
        "primer": "Use the buffer zone diagram to explain Israel's military logic, while highlighting the origins of the Jewish settlement project.",
        "question": "Why did the occupied territories act as a vital military buffer for Israel?"
      },
      {
        "objective": "Evaluate the shift in Palestinian tactics from conventional reliance on Arab armies to international terrorism under the PFLP and Black September.",
        "primer": "Trace the causal chain from the Dawson's Field hijackings to the expulsion of the PLO from Jordan and the subsequent Munich Olympics massacre.",
        "question": "Why did King Hussein order the Jordanian army to attack the PLO during 'Black September'?"
      }
    ]
  },
  "do_now": {
    "type": "retrieval",
    "items": [
      {
        "question": "What major political organization was established at the Cairo Conference in January 1964 with the backing of the Arab League, and what was its primary objective?",
        "answer": "The Palestine Liberation Organisation (PLO) was established. Its primary objective was to unite various Palestinian resistance groups under a single political umbrella to reclaim the lost homeland."
      },
      {
        "question": "Which Palestinian guerrilla group, founded in 1959 by Yasser Arafat, became the dominant military faction within the PLO?",
        "answer": "Fatah."
      },
      {
        "question": "Explain how disputes over water resources between Israel and Syria in the mid-1960s contributed to rising regional tensions.",
        "answer": "Israel completed its National Water Carrier to divert water from the Sea of Galilee. In response, Arab states drafted the Headwater Diversion Plan to divert the Dan and Banias rivers. This led to cross-border skirmishes where Israeli tanks and artillery fired on Syrian workers to destroy their heavy machinery."
      },
      {
        "question": "What was the Samu Raid of November 1966, and how did it affect King Hussein of Jordan's position?",
        "answer": "The Samu Raid was a massive Israeli reprisal attack in the West Bank after a Fatah landmine killed three Israeli policemen. Over 600 IDF troops entered the village of Samu, destroying dozens of homes and clashing with the Jordanian military, leaving 15 Jordanian soldiers dead. It humiliated King Hussein and prompted him to order national mobilization."
      },
      {
        "question": "What major air battle occurred on 7 April 1967, and how did it affect Syrian military morale?",
        "answer": "Syrian artillery on the Golan Heights fired on Israeli tractors in the demilitarized zone, leading to a massive aerial dogfight over Damascus in which the Israeli air force shot down six Syrian Soviet-built MiG-21 jet fighters. This humiliated Syria and increased the pressure to retaliate."
      },
      {
        "question": "How did the Soviet Union act as a catalyst for the May 1967 crisis?",
        "answer": "On 13 May 1967, the USSR gave Egyptian President Nasser a false intelligence report claiming Israel was massing ten brigades on the Syrian border for an imminent invasion. This placed Nasser under immense pressure to act to honor his defense pact with Syria."
      },
      {
        "question": "Detail three specific actions taken by Gamal Abdel Nasser in May 1967 that Israel considered a direct casus belli (act of war).",
        "answer": "1. Mobilizing his army into the demilitarized Sinai Peninsula. 2. Demanding the immediate withdrawal of UN peacekeepers (UNEF) from the border. 3. Closing the Straits of Tiran to Israeli and Israel-bound shipping, choking Israel's southern port of Eilat."
      },
      {
        "question": "What was Operation Focus, launched on 5 June 1967, and why was it so critical to the outcome of the war?",
        "answer": "It was a pre-emptive Israeli air strike that flew low to evade Egyptian radar, catching the Egyptian air force on the ground. Within three hours, Israel destroyed 309 of Egypt's 340 combat aircraft on the tarmac, securing absolute air superiority, which allowed Israeli ground forces to advance without fear of aerial attack."
      },
      {
        "question": "List the territories captured by Israel during the Six Day War and identify the nation from which each was taken.",
        "answer": "Sinai Peninsula and the Gaza Strip from Egypt. The West Bank and East Jerusalem from Jordan. The Golan Heights from Syria."
      },
      {
        "question": "Write an analytical sentence linking the May 1967 Crisis to the ultimate outcome of the Six Day War.",
        "answer": "Because Nasser closed the Straits of Tiran and signed a mutual defense pact with Jordan in May 1967, Israel launched a pre-emptive air strike on 5 June 1967 that destroyed Arab air capabilities on the ground, enabling a lightning ground campaign that expanded Israeli territory to three times its pre-war size."
      }
    ]
  },
  "vocab": [
    {
      "term": "UN Resolution 242",
      "definition": "A UN Security Council resolution adopted in 1967 calling for 'land for peace' and Israeli withdrawal from occupied territories."
    },
    {
      "term": "Khartoum Resolution",
      "definition": "An August 1967 Arab League agreement issuing the 'Three Nos': no peace, no recognition, and no negotiations with Israel."
    },
    {
      "term": "PFLP",
      "definition": "The Popular Front for the Liberation of Palestine, a radical Marxist splinter group that pioneered international aviation terrorism."
    },
    {
      "term": "Black September",
      "definition": "A 1970 civil war where Jordan's King Hussein crushed the PLO; also the name of the secretive PLO faction responsible for the Munich Olympics massacre."
    },
    {
      "term": "Operation Wrath of God",
      "definition": "A highly secretive, global assassination campaign launched by the Israeli Mossad to hunt down the planners of the Munich Olympics massacre."
    }
  ],
  "narrative": [
    "The lightning ending of the Six Day War left the Middle East in a deep diplomatic deadlock. On 22 November 1967, the United Nations Security Council unanimously adopted Resolution 242. This resolution was designed to establish the guiding principles for a \"just and lasting peace\" in the region, introducing the fundamental \"land for peace\" formula.",
    "Resolution 242 stressed the \"inadmissibility of the acquisition of territory by war\" and called for: 1. The withdrawal of Israeli armed forces from territories occupied in the conflict. 2. The termination of all states of belligerency, and respect for the right of every state in the area to live in peace within secure and recognized borders. 3. A just settlement of the refugee problem.",
    "<pre class=\"ascii-diagram\">\n                     [UN RESOLUTION 242 (NOV 1967)]\n                                   |\n         +-------------------------+-------------------------+\n         v                                                   v\n[English Wording: Loophole]                       [French Wording: Strict]\n- \"Withdrawal from territories\"                   - \"des territoires occupés\"\n- Israel argued it did NOT mean ALL               - Interpreted as requiring a\n  territories; allowed border expansion       complete withdrawal to 1967 lines\n</pre>",
    "However, the resolution's deliberate ambiguity created long-term loopholes that both sides exploited. The English text called for withdrawal from \"territories occupied,\" omitting the definite article 'the'. Israel’s government argued this meant they were not required to withdraw from all the occupied land, but rather from some territories, to ensure \"secure and recognized\" borders. Conversely, the equally official French version translated the phrase as \"des territoires occupés\" (from the territories), which the Arab states interpreted as a mandate for a complete Israeli return to the pre-war boundaries.",
    "The PLO immediately rejected Resolution 242 because it referred to the Palestinians merely as a \"refugee problem\" rather than as a nation with a legitimate right to self-determination and statehood.",
    "The Arab states responded defiantly at the Arab League Summit in Khartoum in August 1967. They issued the famous \"Three Nos\" of Khartoum: No peace with Israel, No recognition of Israel, and No negotiations with Israel. This diplomatic deadlock meant the Suez Canal—which Egypt had blocked at the start of the war—remained closed. The canal became a heavily fortified military front line separating the Egyptian army on the west bank from the IDF on the east bank, leading directly to the War of Attrition (1969–1970).",
    "The Six Day War triggered a second massive wave of Palestinian displacement. Approximately 300,000 Palestinian Arabs fled the West Bank and Gaza Strip during the fighting, with many being forced to flee for a second time from existing refugee camps.",
    "The vast majority crossed the River Jordan, putting immense economic strain on Jordan. This left over 1.5 million Palestinians living under military occupation or in crowded, temporary UNRWA camps.",
    "<pre class=\"ascii-diagram\">\n               [THE STRATEGIC OCCUPIED Buffer ZONES]\n                                 |\n     +---------------------------+---------------------------+\n     v                           v                           v\n[The Golan Heights]       [The Sinai Peninsula]       [The West Bank & Gaza]\n- Prevented Syrian shelling  - Kept Egyptian artillery  - Created defensible borders\n  of Galilee farming        far from Israeli cities    - Blocked cross-border raids\n</pre>",
    "For Israel's security, the captured territories held immense strategic and military significance. The territories acted as vast physical buffers. The Sinai Desert kept Egyptian artillery far from Israel's borders, the West Bank created a defensible border along the River Jordan, and the Golan Heights prevented Syria from shelling Israeli farming villages in Galilee.",
    "The Golan Heights also provided vital water sources, while the Sinai Peninsula offered oil fields in the Gulf of Suez. Israel immediately annexed East Jerusalem, declaring the unified city its eternal capital.",
    "However, the occupation quickly became a source of deep political and demographic division. In September 1967, Israel established its first Jewish settlement in Gush Etzion on the West Bank. Under both Labor and Likud governments, Israel promoted a policy of building Jewish settlements in the occupied territories, offering financial subsidies and tax breaks to settlers. By the late 1980s, the number of settlers rose to over 200,000, creating permanent \"facts on the ground\" that fragmented Palestinian society, restricted movement through military checkpoints, and deeply alienated the local Arab population.",
    "The total military defeat of conventional Arab armies in 1967 convinced Palestinian nationalists that they could not rely on Arab states to liberate their homeland. Under Yasser Arafat's leadership, the PLO shifted toward guerrilla warfare and irregular tactics.",
    "Simultaneously, more radical, Marxist splinter groups emerged, most notably the Popular Front for the Liberation of Palestine (PFLP), founded by George Habash.",
    "<pre class=\"ascii-diagram\">\nConventional Arab Armies Defeated (1967) -> Grassroots Nationalist Awakening\n                                                      |\nRadical Splinter Groups Form (e.g., PFLP) -> Strategy of \"Internationalized\" Terror\n                                                      |\nDawson's Field Hijackings (1970) -> World Spotlight Forced onto Palestinian Issue\n</pre>",
    "To force the Palestinian issue onto the international diplomatic stage, the PFLP pioneered international aviation terrorism. On 6 September 1970, PFLP militants hijacked four international commercial airliners bound for New York and forced three of them to land at Dawson's Field, a remote desert airstrip near Zarka in Jordan.",
    "After evacuating the passengers, the hijackers blew up the multi-million-dollar aircraft in front of the world's media. This dramatic event succeeded in grabbing global attention, but it also deeply embarrassed Jordan's King Hussein, whose sovereignty had been publicly undermined.",
    "By 1970, the PLO had established a virtual \"state-within-a-state\" inside Jordan, collecting its own taxes, running checkpoints, and launching unauthorized rocket attacks on Israel, which drew destructive Israeli military reprisals onto Jordanian territory.",
    "The Dawson's Field hijackings were the final straw for King Hussein. He realized that the PLO threatened to overthrow his Hashemite monarchy and plunge Jordan into a civil war.",
    "<pre class=\"ascii-diagram\">\n                 [THE BLACK SEPTEMBER CIVIL WAR]\n                                |\n[PLO \"State-within-a-State\" in Jordan] -> [King Hussein's Sovereignty Undermined]\n                                |\n[Dawson's Field Hijackings (1970)] -> [Jordanian Army Launches All-Out Attack]\n                                |\n[PLO Defeated & Expelled] -> [PLO Re-establishes HQ in Southern Lebanon]\n</pre>",
    "On 17 September 1970, King Hussein declared martial law and ordered his elite, British-trained army to launch an all-out military offensive against PLO bases in Amman and northern Jordan.",
    "This brutal, ten-day civil war became known as \"Black September\". The Jordanian army used heavy artillery and tanks in crowded refugee camps, crushing the PLO forces.",
    "Defeated and politically isolated, Yasser Arafat and thousands of PLO fighters were forcibly expelled from Jordan. They relocated their central headquarters to Lebanon, establishing a new base of operations in southern Lebanon (known as \"Fatahland\") and Beirut, which destabilized Lebanon's delicate political balance.",
    "In the wake of their defeat in Jordan, a radical, highly secretive PLO splinter group calling itself \"Black September\" was formed to conduct covert operations against Israeli and Western targets. Their most notorious attack occurred during the Munich Olympic Games in September 1972.",
    "<pre class=\"ascii-diagram\">\n[Black September Infiltrates Olympic Village] -> [11 Israeli Athletes Taken Hostage]\n                                                        |\n[Failed German Rescue Attempt at Airport] -> [All Hostages & 5 Terrorists Killed]\n                                                        |\n[Worldwide TV Broadcast: Severe Condemnation] -> [Israel Launches Operation Wrath of God]\n</pre>",
    "On 5 September 1972, eight heavily armed Black September terrorists scaled the fence of the Olympic Village in Munich, killing two members of the Israeli Olympic team and taking nine others hostage. The terrorists demanded the release of 234 Palestinian prisoners held in Israeli jails. During a botched rescue attempt by West German police at the Fürstenfeldbruck military airfield, the terrorists detonated a grenade inside a helicopter containing the bound hostages. In total, 11 Israeli athletes, five terrorists, and one German police officer were killed.",
    "The massacre unfolded on live television, shocking a global audience of hundreds of millions. It drew severe international condemnation of Palestinian terrorism, but it also succeeded in giving the Palestinian cause unprecedented public visibility.",
    "In response, Israeli Prime Minister Golda Meir ordered the IDF to launch heavy bombing raids against PLO camps in Lebanon and Syria. More significantly, she authorized the Mossad to launch \"Operation Wrath of God\"—a highly secretive, global assassination campaign that hunted down and killed the key planners of the Munich massacre across Europe and the Middle East."
  ],
  "tasks": [
    {
      "text": "Write a narrative account analysing the key developments in the Palestinian issue in the years 1970–72. (8 marks)",
      "type": "narrative_account",
      "model": "The escalation of Palestinian militant activity began in September 1970, when the Popular Front for the Liberation of Palestine (PFLP) launched a campaign of international aviation terrorism by hijacking four commercial airliners, forcing three of them to land at Dawson’s Field in Jordan, and blowing them up on camera. This event acted as the immediate trigger for the \"Black September\" crisis. King Hussein of Jordan, feeling his royal sovereignty was being completely undermined by the PLO's virtual \"state-within-a-state,\" ordered his army to launch an all-out offensive that successfully crushed the militias and expelled Yasser Arafat's forces from Jordan by July 1971.\n\nAs a direct consequence of this expulsion, the PLO relocated its headquarters to Lebanon, establishing a new military base in the south to launch rocket attacks into Galilee. Seeking revenge for their defeat in Jordan and desperate for global recognition, a radical PLO splinter group calling itself \"Black September\" was formed to carry out international operations. This development culminated in the Munich Olympics attack in September 1972, where terrorists infiltrated the Olympic Village and took Israeli athletes hostage, resulting in the deaths of 11 Israeli team members during a failed West German rescue attempt.\n\nUltimately, this tragic event drew widespread international condemnation of Palestinian tactics but forced the Palestinian issue onto the global diplomatic stage. In response to the Munich massacre, Israeli Prime Minister Golda Meir authorized a severe reprisal policy, launching \"Operation Wrath of God\"—a targeted global assassination campaign to hunt down the Black September conspirators across Europe—which locked both sides into a violent, undeclared shadow war."
    }
  ]
};

const existingIndex = data.lessons.findIndex(l => l.id === "lesson_5");
if (existingIndex >= 0) {
  data.lessons[existingIndex] = newLesson;
} else {
  data.lessons.push(newLesson);
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully injected Lesson 5 into cme_new/data.js");
