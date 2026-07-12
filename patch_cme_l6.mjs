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

// 1. ADD LESSON 6
const lesson6 = {
  "id": "lesson_6",
  "title": "Lesson 6: Israel and Egypt, 1967–1973",
  "teacher_notes": {
    "primer": "This lesson focuses on the transition from the War of Attrition to the dramatic outbreak of the Yom Kippur War. Students will explore Sadat's diplomatic maneuvers, the failure of the Bar Lev Line, and the devastating global impact of the OPEC oil weapon.",
    "objectives": [
      {
        "objective": "Understand the causes and nature of the War of Attrition.",
        "primer": "Explain Nasser's strategy to wear down the IDF using Soviet support and continuous artillery fire.",
        "question": "Why did President Nasser launch the War of Attrition instead of engaging in full-scale warfare?"
      },
      {
        "objective": "Analyze Anwar Sadat's motivations for launching the Yom Kippur War.",
        "primer": "Highlight Sadat's domestic economic crisis and his expulsion of Soviet advisors to win US favor.",
        "question": "What two diplomatic actions did Sadat take before deciding on a surprise military attack?"
      },
      {
        "objective": "Evaluate the geopolitical consequences of the Yom Kippur War, including the OPEC oil embargo.",
        "primer": "Trace the escalation from the American 'Operation Nickel Grass' airlift to the Soviet intervention threat and the Arab oil embargo.",
        "question": "How did the OPEC 'oil weapon' successfully force the United States to pressure Israel into a ceasefire?"
      }
    ]
  },
  "do_now": {
    "type": "retrieval",
    "items": [
      {
        "question": "What major United Nations Security Council Resolution was passed on 22 November 1967 to establish the guiding principles of a 'land for peace' formula?",
        "answer": "UN Resolution 242."
      },
      {
        "question": "Name the radical, Marxist-leaning Palestinian group founded by George Habash that pioneered international aviation terrorism in the early 1970s.",
        "answer": "The Popular Front for the Liberation of Palestine (PFLP)."
      },
      {
        "question": "Explain how a translation discrepancy in the wording of UN Resolution 242 created a loophole that hindered its implementation.",
        "answer": "The English text called for a withdrawal from 'territories occupied,' allowing Israel to retain some land for secure borders. The French translation demanded a withdrawal from 'the territories' (all of them), which Arab states demanded."
      },
      {
        "question": "What Arabic term refers to the Arab League Summit of August 1967, and what were the famous declarations issued there?",
        "answer": "The Khartoum Conference. The Arab states issued the 'Three Nos': No peace, No recognition, and No negotiations with Israel."
      },
      {
        "question": "What was the immediate result of the Dawson's Field hijackings of September 1970 for the PLO's position in Jordan?",
        "answer": "The hijackings severely embarrassed King Hussein of Jordan, prompting him to order his army to crush and forcibly expel the PLO from the country during 'Black September'."
      },
      {
        "question": "To which country did the PLO relocate its central headquarters after its expulsion from Jordan in 1970–71?",
        "answer": "Lebanon."
      },
      {
        "question": "Describe the events of the Munich Olympics of September 1972 and state how Israel's Prime Minister Golda Meir responded.",
        "answer": "The 'Black September' group took nine Israeli athletes hostage (killing two immediately), resulting in the deaths of all 11 during a failed rescue attempt. In response, Prime Minister Meir launched 'Operation Wrath of God' to assassinate the planners globally."
      },
      {
        "question": "How did Israel's capture of the Golan Heights, the West Bank, the Gaza Strip, and the Sinai Peninsula in 1967 initially improve its military security?",
        "answer": "These territories acted as strategic military buffer zones: keeping Egyptian forces far from the heartland, creating a defensible border along the Jordan, and preventing Syrian shelling of Galilee."
      },
      {
        "question": "Why did the PLO reject UN Resolution 242?",
        "answer": "Because it treated the Palestinian population merely as a 'refugee problem' rather than a nation with a right to self-determination."
      },
      {
        "question": "Write an analytical sentence linking the outcome of the Six Day War to the rise of international Palestinian terrorism.",
        "answer": "Because the devastating defeat of Arab armies in 1967 proved they could not destroy Israel, disillusioned Palestinian nationalists turned to grassroots armed groups like the PFLP, which launched high-profile terror attacks to force the issue onto the global stage."
      }
    ]
  },
  "vocab": [
    {
      "term": "War of Attrition",
      "definition": "A grinding border conflict (1969-1970) where Nasser used continuous artillery fire and raids to wear down Israel along the Suez Canal."
    },
    {
      "term": "SAM-3 Missiles",
      "definition": "Advanced Soviet surface-to-air missiles installed along the Suez Canal to shoot down Israeli fighter jets."
    },
    {
      "term": "Bar Lev Line",
      "definition": "A massive Israeli military fortification consisting of a 20-meter-high sand wall designed to block Egyptian crossings of the Suez Canal."
    },
    {
      "term": "Operation Nickel Grass",
      "definition": "A massive American military airlift of tanks and weapons in October 1973 that saved the Israeli army from running out of supplies."
    },
    {
      "term": "OPEC Oil Weapon",
      "definition": "An Arab oil embargo that quadrupled global energy prices to force the West into restraining Israel."
    }
  ],
  "narrative": [
    "The immediate aftermath of the 1967 war did not bring peace, but rather a grueling, undeclared border war along the Suez Canal known as the War of Attrition (1969–1970).",
    "Egyptian President Gamal Abdel Nasser refused to accept the static Israeli occupation of the Sinai Peninsula. Backed by massive military aid from the Soviet Union, Nasser launched a continuous campaign of heavy artillery shelling, commando raids, and rocket barrages across the Suez Canal to wear down the Israeli Defence Forces (IDF) and make the occupation too costly to sustain.",
    "<pre class=\"ascii-diagram\">\n               [THE COLD WAR ESCALATION ON THE SUEZ]\n                                |\n[Nasser launches artillery bombardments] -> [Israel retaliates with deep air strikes]\n                                |\n[Egypt receives 15,000 Soviet advisors] -> [Soviet SAM-3 missile sites built (1970)]\n                                |\n[US mediates August 1970 Ceasefire] -> [Uneasy stalemate remains unaddressed]\n</pre>",
    "Israel responded aggressively by utilizing its absolute air superiority to conduct deep-penetration bombing raids into Egypt, targeting Egyptian military garrisons, industrial factories, and infrastructure along the Nile.",
    "To protect his regime, Nasser turned directly to his Soviet patrons. By 1970, approximately 15,000 Soviet military advisers were stationed in Egypt. Soviet pilots actively flew combat missions, engaging Israeli jets in dogfights over the canal, while Soviet engineers constructed advanced SAM-3 surface-to-air missile bases along the Suez front.",
    "Alarmed that this direct superpower clash could drag the United States and the USSR into a global conflict, US Secretary of State William Rogers intervened. In August 1970, he successfully brokered a ceasefire that halted the active fighting. However, neither Egypt nor Israel was committed to substantive peace talks.",
    "Shortly after, on 28 September 1970, the strain of regional politics took its toll when Nasser suffered a sudden, fatal heart attack. His death shocked the Arab world. Five million mourners flooded the streets of Cairo for his funeral, marking the end of the charismatic era of Pan-Arabism.",
    "Nasser was succeeded by his relatively unknown and underestimated Vice President, Anwar Sadat. Sadat inherited a country on the brink of political and economic collapse.",
    "Egypt's economy was severely damaged by the continuous military mobilization, the Suez Canal was closed (depriving Egypt of vital transit toll revenues), and millions of displaced civilians had fled the devastated cities along the canal zone. Sadat realized that to rebuild Egypt’s economy and send home his one million mobilized soldiers, he desperately needed to secure the return of the Sinai Peninsula and reopen the Suez Canal.",
    "<pre class=\"ascii-diagram\">\n                  [SADAT'S DIPLOMATIC ATTEMPTS (1971-72)]\n                                     |\n         +---------------------------+---------------------------+\n         v                                                       v\n[The Golda Meir Proposal]                            [Expelling the Soviets]\n- Sadat offers peace in return                       - Sadat expels 15,000 Soviet advisors\n  for the complete return of Sinai                   - Aim: Please USA and force them\n- Rejected by Golda Meir                             - Result: Met with complete US indifference\n</pre>",
    "Between 1970 and 1972, Sadat pursued two distinct diplomatic tracks: The \"Peace for Sinai\" Offer and Expelling the Soviet Advisers.",
    "Sadat approached Israeli Prime Minister Golda Meir with a bold proposal based on UN Resolution 242. He offered a formal peace agreement and the reopening of the Suez Canal in exchange for Israel returning the Sinai Peninsula. Confident in their military superiority, Golda Meir and her cabinet rejected the offer, refusing to return to the vulnerable pre-1967 borders.",
    "Frustrated by Soviet reluctance to supply him with offensive weapons and hoping to win diplomatic favor with the United States, Sadat took the dramatic step of expelling 15,000 Soviet advisers from Egypt in July 1972. He calculated that this anti-communist move would prompt the US to pressure Israel into territorial concessions. However, the Nixon administration was preoccupied with the Vietnam War and met Sadat's gesture with total indifference.",
    "By late 1972, Sadat's popularity had plummeted to its lowest point. The Egyptian public mocked him, the economy was stagnant, and the Sinai remained firmly in Israeli hands. Sadat realized that Israel would never negotiate as long as it felt militarily secure. He concluded that Egypt's only option was to launch a limited, surprise military strike to shatter the myth of Israeli invincibility and force the global superpowers to intervene and broker a diplomatic solution.",
    "While Egypt struggled with stagnation, Israel utilized the years between 1967 and 1973 to consolidate its firm military and political control over the Occupied Territories (the Sinai, Gaza, West Bank, Golan Heights, and East Jerusalem). Israel's policy transitioned from a temporary military occupation to a permanent program of state-sponsored colonization.",
    "<pre class=\"ascii-diagram\">\n                      [ISRAELI SETTLEMENT POLICY]\n                                   |\n         +-------------------------+-------------------------+\n         v                                                   v\n[Labor Government: Security]                        [Likud/Gush Emunim: Biblical]\n- Guided by the \"Allon Plan\"                        - Claimed divine right to Eretz Israel\n- Built settlements as defensive                    - Aimed to block any future\n  barriers along borders                            - Palestinian statehood\n</pre>",
    "Along the east bank of the Suez Canal, Israel constructed a massive military fortification. The Bar Lev Line consisted of a towering, 20-meter-high artificial sand wall backed by concrete bunkers, artillery emplacements, and early-warning systems designed to make any Egyptian crossing of the canal impossible.",
    "Israel began constructing permanent civilian communities (settlements) in the captured lands. The ruling Labor coalition focused on establishing defensive settlements in strategic buffer zones, such as the Jordan Valley. However, religious-nationalist groups like Gush Emunim began establishing unauthorized, radical settlements deep in the biblical lands of the West Bank.",
    "By 1973, these settlements had become permanent \"facts on the ground,\" deeply fragmenting Palestinian society and convincing Arab leaders that Israel was expanding permanently.",
    "On 6 October 1973, Sadat’s secret plan for war was put into action. Egypt and its ally, Syria, launched a highly coordinated, two-front surprise attack against Israel.",
    "<pre class=\"ascii-diagram\">\nSurprise Attack launched on Yom Kippur -> IDF caught off-guard; mobilization slowed\n                                                 |\nEgyptians breach the Bar Lev Line -> Syrian tanks overrun the Golan Heights\n                                                 |\nIDF suffers heavy initial losses -> Superpower arms airlifts begin (15 Oct)\n</pre>",
    "The offensive was launched on Yom Kippur, the holiest day in the Jewish calendar. On this day, Israel was at a complete standstill: radio stations were silent, shops were closed, public transport was shut down, and most soldiers were at home fasting. This severely delayed the mobilization of the IDF’s reserve forces.",
    "Egyptian forces crossed the Suez Canal and used high-pressure water hoses pumped from the canal to rapidly wash away and breach Israel's formidable sand-wall defenses at the Bar Lev Line. Within hours, thousands of Egyptian infantry and tanks poured into Sinai, utilizing advanced Soviet-supplied anti-tank (Sagger) and anti-aircraft (SAM) missiles to destroy Israeli counter-attacks.",
    "Simultaneously, Syrian tank divisions launched a massive assault across the Golan Heights, overrunning Israel's thin border defenses and threatening to break through into the Galilee. Caught completely off-guard, Israel suffered catastrophic initial casualties. For the first three days, the survival of the state hung in the balance.",
    "By 10 October 1973, Israeli reserves were fully mobilized, and the tide of the war began to turn through ruthless military execution and vital international assistance. On the Northern Front, the IDF successfully halted the Syrian advance and pushed Syrian forces back beyond the 1967 border.",
    "On the Southern Front, the conflict escalated into a massive superpower proxy war. To replace Israel’s heavy losses, US President Richard Nixon authorized Operation Nickel Grass on 12 October—a massive, direct military airlift of advanced American weapons, tanks, and ammunition that arrived in Israel on 15 October. Simultaneously, the Soviet Union launched an equally massive arms resupply to Egypt and Syria.",
    "Utilizing their newly arrived equipment, Israeli tank divisions led by General Ariel Sharon exploited a gap between Egypt's Second and Third Armies. The IDF crossed the Suez Canal onto the Egyptian mainland, destroying Soviet-bloc SAM missile sites and completely encircling Egypt's Third Army in the Sinai Desert.",
    "<pre class=\"ascii-diagram\">\n                  [THE SUPERPOWER GEOPOLITICAL FACE-OFF]\n                                     |\n         +---------------------------+---------------------------+\n         v                           v                           v\n[The US Weapons Airlift]    [Soviet Intervention Threat]  [The Arab OPEC Oil Embargo]\n- Nixon sends tanks/jets    - Brezhnev threatens troops   - OPEC quadruples oil prices\n- Stabilizes IDF defenses   - US goes to DEFCON 3 alert   - Chokes Western economies\n</pre>",
    "As the Egyptian Third Army faced complete destruction, the Soviet Union threatened to intervene directly by deploying Soviet troops to Egypt. To deter the Soviets, the United States put its military forces on a high-alert status (DEFCON 3), bringing the world to the brink of a nuclear confrontation.",
    "To resolve the crisis, the UN Security Council passed Resolution 338 on 22 October, calling for an immediate ceasefire. To force the United States to restrain Israel, the Arab members of OPEC unleashed the \"Oil Weapon.\" They placed a total oil embargo on the US and Western nations that supported Israel, cutting production and quadrupling oil prices from $3 to $12 a barrel.",
    "Choked by a severe global energy crisis and fuel shortages, President Nixon pressured Israel into accepting a permanent ceasefire on 25 October 1973.",
    "<pre class=\"ascii-diagram\">\n+------------------------------------------------------------------------------------+\n|                       THE SIGNIFICANCE OF THE YOM KIPPUR WAR                       |\n+--------------------------+---------------------------+-----------------------------+\n|      For Egypt           |         For Israel        |      For the Peace Road     |\n+--------------------------+---------------------------+-----------------------------+\n| Sadat restored Egyptian  | Golda Meir and Moshe      | Proved military force had   |\n| honor and proved the     | Dayan resigned due to     | limits; forced US into      |\n| Bar Lev Line was not     | immense public anger over | exhaustive \"shuttle         |\n| invincible.              | initial war failures      | diplomacy\".                 |\n+--------------------------+---------------------------+-----------------------------+\n</pre>"
  ],
  "tasks": [
    {
      "text": "Write a narrative account analysing the key developments of the Yom Kippur War (1973) and its aftermath. (8 marks)",
      "type": "narrative_account",
      "model": "<p>The Yom Kippur War began on <strong>6 October 1973</strong>, when Egypt and Syria launched a coordinated surprise attack on the holiest day in the Jewish calendar. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Because the country was at a complete standstill</mark>, Israeli military mobilization was severely delayed, allowing Egyptian troops to easily overrun the outer sand fortifications of the <strong>Bar Lev Line</strong> while Syrian forces seized the <strong>Golan Heights</strong>.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This critical initial breakthrough prompted</mark> the United States to launch a massive military airlift on 12 October to resupply the heavily depleted Israeli forces. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">As a direct result of this American military support</mark>, the IDF successfully launched a decisive counter-offensive, driving Syrian forces back and enabling <strong>General Ariel Sharon’s tank divisions</strong> to cross the Suez Canal to encircle Egypt’s Third Army.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">With Egypt facing complete military collapse, the crisis escalated</mark> into a dangerous Cold War confrontation as the Soviet Union threatened to deploy troops, forcing the US to place its military on nuclear alert. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">To pressure the West into restraining Israel</mark>, Arab members of <strong>OPEC</strong> implemented the 'oil weapon' by placing a total oil embargo on nations supporting Israel. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Ultimately, this economic pressure forced</mark> the United States to compel Israel to agree to a UN ceasefire on <strong>25 October 1973</strong>. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">The long-term consequence of this conflict</mark> was a profound psychological shift: it shattered the myth of Israeli invincibility and paved the way for 'shuttle diplomacy'.</p>"
    }
  ],
  "flashcards": [
    {
      "term": "War of Attrition",
      "definition": "Nasser's 1969-1970 campaign of continuous artillery fire and commando raids along the Suez Canal to wear down the IDF."
    },
    {
      "term": "Bar Lev Line",
      "definition": "A formidable 20-meter-high Israeli sand wall fortification built along the eastern bank of the Suez Canal."
    },
    {
      "term": "Operation Nickel Grass",
      "definition": "A vital American military airlift of weapons and tanks in October 1973 that saved Israel from running out of supplies."
    },
    {
      "term": "OPEC Oil Weapon",
      "definition": "A 1973 Arab oil embargo that quadrupled global energy prices in order to force Western nations to restrain Israel."
    },
    {
      "term": "Gush Emunim",
      "definition": "A Jewish religious-nationalist movement that established unauthorized settlements deep in the biblical lands of the West Bank."
    }
  ]
};

const existingIndex = data.lessons.findIndex(l => l.id === "lesson_6");
if (existingIndex >= 0) {
  data.lessons[existingIndex] = lesson6;
} else {
  data.lessons.push(lesson6);
}

// 2. PATCH LESSON 4 FLASHCARDS & MODEL
const l4 = data.lessons.find(l => l.id === "lesson_4");
if (l4) {
  l4.flashcards = [
    { "term": "PLO", "definition": "Palestine Liberation Organisation; founded in 1964 to unite Palestinian resistance groups." },
    { "term": "Fatah", "definition": "Palestinian guerrilla group founded in 1959 by Yasser Arafat, became dominant military faction in the PLO." },
    { "term": "Samu Raid", "definition": "Massive Israeli reprisal attack in the West Bank in 1966 that humiliated Jordan's King Hussein." },
    { "term": "Operation Focus", "definition": "Pre-emptive Israeli air strike on 5 June 1967 that destroyed Arab air capabilities on the ground." }
  ];
  if (l4.tasks && l4.tasks[0]) {
    l4.tasks[0].model = "<p>The May 1967 crisis began with false intelligence provided by the <strong>Soviet Union</strong> on 13 May, which warned Egyptian President Nasser that Israel was massing ten military brigades on the Syrian border for an imminent invasion. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Consequently</mark>, Nasser reacted by taking immediate military action, mobilizing the Egyptian army on 15 May and marching his troops into the demilitarised <strong>Sinai Peninsula</strong>.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This aggressive move was quickly followed by</mark> Nasser’s order on 16 May forcing the United Nations Emergency Force (<strong>UNEF</strong>) peacekeepers to withdraw from the border. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">With tensions already at a fever pitch, Nasser escalated the crisis further</mark> on 23 May by reoccupying Sharm el-Sheikh and ordering the closure of the <strong>Straits of Tiran</strong> to all Israeli shipping, a move Israel considered a formal <em>casus belli</em>.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This economic threat was compounded</mark> on 30 May when <strong>King Hussein of Jordan</strong> flew to Cairo to sign a joint defense pact. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This final step convinced the Israeli Cabinet that</mark> a coordinated, three-front Arab invasion was imminent. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This sequence of events culminated</mark> on the morning of 5 June 1967, when Israel launched its pre-emptive air strike, <strong>Operation Focus</strong>, destroying the Egyptian air force on the ground and initiating the Six Day War.</p>";
  }
}

// 3. PATCH LESSON 5 FLASHCARDS & MODEL
const l5 = data.lessons.find(l => l.id === "lesson_5");
if (l5) {
  l5.flashcards = [
    { "term": "UN Resolution 242", "definition": "A 1967 resolution that called for 'land for peace' but was hindered by translation loopholes." },
    { "term": "Three Nos of Khartoum", "definition": "An Arab League declaration in 1967: No peace, no recognition, no negotiations with Israel." },
    { "term": "Dawson's Field", "definition": "A remote airstrip in Jordan where the PFLP blew up hijacked international airliners in 1970." },
    { "term": "Black September", "definition": "The 1970 Jordanian civil war where the PLO was expelled, and the name of the terrorist group responsible for the Munich massacre." },
    { "term": "Operation Wrath of God", "definition": "Israel's covert global assassination campaign to hunt down the planners of the Munich massacre." }
  ];
  if (l5.tasks && l5.tasks[0]) {
    l5.tasks[0].model = "<p>The escalation of Palestinian militant activity began in September 1970, when the <strong>Popular Front for the Liberation of Palestine (PFLP)</strong> launched a campaign of international aviation terrorism by hijacking commercial airliners and blowing them up at <strong>Dawson’s Field</strong> in Jordan. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This event acted as the immediate trigger</mark> for the 'Black September' crisis, prompting <strong>King Hussein</strong> to launch an all-out offensive that successfully crushed the militias and expelled the PLO from Jordan by July 1971.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">As a direct consequence of this expulsion</mark>, the PLO relocated its headquarters to <strong>Lebanon</strong>, establishing a new military base in the south. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Seeking revenge for their defeat in Jordan</mark> and desperate for global recognition, a radical PLO splinter group calling itself 'Black September' was formed. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">This development culminated in</mark> the <strong>Munich Olympics attack</strong> in September 1972, where terrorists took Israeli athletes hostage, resulting in the deaths of 11 Israeli team members during a failed West German rescue attempt.</p><p><mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">Ultimately, this tragic event drew</mark> widespread international condemnation of Palestinian tactics but forced the Palestinian issue onto the global diplomatic stage. <mark style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: bold; color: #854d0e;\">In response to the Munich massacre</mark>, Israeli Prime Minister <strong>Golda Meir</strong> authorized a severe reprisal policy, launching <strong>'Operation Wrath of God'</strong>—a targeted global assassination campaign to hunt down the conspirators—which locked both sides into a violent shadow war.</p>";
  }
}

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully injected Lesson 6 and patched L4/L5 in cme_new/data.js");
