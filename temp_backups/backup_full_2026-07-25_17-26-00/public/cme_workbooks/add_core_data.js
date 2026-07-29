const fs = require('fs');

const dataToAdd = {
  "subtopic_1_1": {
    "coreSupport": {
      "vocab": [
        { "word": "Mandate", "definition": "Official control given to a country (Britain) to rule an area (Palestine) until it is ready to govern itself." },
        { "word": "Zionism", "definition": "The movement to create and protect a Jewish nation in Israel." },
        { "word": "Insurgency", "definition": "A violent rebellion or fight against a ruling government or force." },
        { "word": "Partition", "definition": "Splitting or dividing a country into separate pieces (in this case, Jewish and Arab areas)." },
        { "word": "Armistice", "definition": "An official agreement between enemies to stop fighting a war." }
      ],
      "timeline": [
        { "date": "July 1946", "event": "King David Hotel Bombing", "description": "Jewish rebels attack British HQ, breaking British willpower to stay." },
        { "date": "Nov 1947", "event": "UN Partition Plan", "description": "UN votes to split Palestine into Jewish and Arab states." },
        { "date": "May 1948", "event": "Israel Created", "description": "British troops leave, and Israel immediately declares independence." },
        { "date": "1948–1949", "event": "Arab-Israeli War", "description": "Five Arab nations invade; Israel wins and expands its territory." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "consequence",
      "questionText": "Explain one consequence of the King David Hotel bombing (1946). (4 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. Britain decided to launch a counter-offensive to occupy the neighboring Arab nations.", "correct": false },
            { "text": "B. One consequence of the bombing of the King David Hotel was that it shattered British political resolve to govern Palestine.", "correct": true },
            { "text": "C. One consequence was that it led to the immediate signature of the Camp David Accords.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. For example, the United Nations voted in November 1947 to divide Palestine into two states.", "correct": false },
            { "text": "B. Specifically, the attack on 22 July 1946 by the Irgun killed 91 people, devastating their administrative headquarters.", "correct": true },
            { "text": "C. Specifically, President Harry Truman demanded the immediate entry of 100,000 Jewish refugees.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This meant that Egypt immediately blockaded the Straits of Tiran, halting all international trade.", "correct": false },
            { "text": "B. This massive loss of life and security breach convinced an exhausted British government that maintaining the mandate was too dangerous and expensive, prompting them to refer the problem to the United Nations and withdraw.", "correct": true },
            { "text": "C. This resulted in the Israeli Defence Forces being consolidated into a single unified national military under David Ben-Gurion.", "correct": false }
          ]
        }
      },
      "commentary": "Excellent building! You've structured a perfect 4-mark response. Notice how the response connects a clear consequence (loss of British resolve) to solid evidence (July 1946 bombing, 91 deaths) and then explains the ultimate impact (withdrawal and UN referral)."
    }
  },
  "subtopic_1_2": {
    "coreSupport": {
      "vocab": [
        { "word": "Conscription", "definition": "Compulsory enlistment for state service, typically into the armed forces." },
        { "word": "Austerity", "definition": "Difficult economic conditions created by government measures to reduce public expenditure (Tzena)." },
        { "word": "Reprisal", "definition": "An act of military retaliation." },
        { "word": "Ingathering", "definition": "The gathering or bringing together of people (specifically the Law of Return)." }
      ],
      "timeline": [
        { "date": "May 1948", "event": "Creation of IDF", "description": "Paramilitary forces Haganah, Irgun, and Lehi are merged into a unified national army." },
        { "date": "July 1950", "event": "Law of Return", "description": "Israel grants any Jew in the world the right to settle and gain immediate citizenship." },
        { "date": "1949–1953", "event": "Austerity (Tzena)", "description": "Rapid immigration strains the economy, forcing strict food rationing and tent cities." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "narrative",
      "questionText": "Write a narrative account of the 1948–49 war. (Focus: The Ceasefire & Reorganisation) (8 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. One consequence of the war was that it led to the immediate signing of the Camp David Accords.", "correct": false },
            { "text": "B. The war began when five Arab nations invaded Israel in May 1948, but a crucial UN-mandated ceasefire in June 1948 changed the course of the conflict.", "correct": true },
            { "text": "C. The conflict started with the Balfour Declaration being rejected by Arab leaders.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. For example, British forces withdrew completely and handed control over to the United Nations.", "correct": false },
            { "text": "B. During this truce, Israel secretly imported modern weapons from Czechoslovakia and consolidated rival militias into the unified IDF.", "correct": true },
            { "text": "C. During the ceasefire, Egypt signed an armistice returning the Gaza Strip to Israeli control.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This meant that the Suez Canal was nationalized by Egypt.", "correct": false },
            { "text": "B. This allowed the reinforced IDF to launch successful counter-offensives when fighting resumed, ultimately securing Israel's survival and expanding its territory by 50% more than the UN plan.", "correct": true },
            { "text": "C. This resulted in the United States cutting all financial aid to the new state of Israel.", "correct": false }
          ]
        }
      },
      "commentary": "Excellent work! You have constructed a strong narrative sequence. Notice how the ceasefire acts as a key turning point that connects the initial invasion (beginning) to the reorganisation and Czech arms deals (middle), leading to the final victory and territorial expansion (end)."
    }
  },
  "subtopic_1_3": {
    "coreSupport": {
      "vocab": [
        { "word": "Fedayeen", "definition": "Palestinian militant groups who launched cross-border raids into Israel." },
        { "word": "Nakba", "definition": "The Arabic term for 'The Catastrophe', referring to the displacement of Palestinians in 1948." },
        { "word": "UNRWA", "definition": "The UN agency established in 1949 to support Palestinian refugees." },
        { "word": "Blockade", "definition": "An act of sealing off a place to prevent goods or people from entering or leaving." }
      ],
      "timeline": [
        { "date": "Dec 1948", "event": "UN Resolution 194", "description": "Declares that refugees wishing to return to their homes should be permitted to do so." },
        { "date": "Dec 1949", "event": "UNRWA Established", "description": "UN starts providing food, health, and education aid to refugee camps." },
        { "date": "1950s", "event": "Fedayeen Raids", "description": "Constant border clashes and retaliatory raids occur along the Gaza border." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "importance",
      "questionText": "Explain the importance of the Palestinian refugee crisis (Nakba) for Arab-Israeli relations. (8 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. The refugee crisis was important because it allowed Israel to quickly sign peace treaties with Jordan.", "correct": false },
            { "text": "B. The refugee crisis was highly important because it created a permanent source of border conflict and hostility between Israel and Egypt.", "correct": true },
            { "text": "C. The crisis was important because it led to the immediate creation of the United Nations.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. Specifically, Israel decided to accept all 700,000 refugees back into their original homes.", "correct": false },
            { "text": "B. Specifically, 200,000 Palestinian refugees were trapped in the Gaza Strip, from where Fedayeen militants launched frequent cross-border raids into Israel.", "correct": true },
            { "text": "C. Specifically, the US government stopped all trade with the Middle East to protest the crisis.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This led to the signing of the Oslo Accords in Washington.", "correct": false },
            { "text": "B. This led to harsh Israeli military reprisal raids and economic retaliation from Egypt, such as blockading the Straits of Tiran, which made any peaceful relations impossible.", "correct": true },
            { "text": "C. This resulted in Egypt opening the Suez Canal to Israeli shipping.", "correct": false }
          ]
        }
      },
      "commentary": "Great job! You have written a solid importance paragraph. By connecting the point (border conflict) to the evidence (200,000 refugees in Gaza and Fedayeen raids) and explaining the consequence (reprisals and Straits blockade), you have demonstrated why the crisis was a major barrier to peace."
    }
  },
  "subtopic_2_1": {
    "coreSupport": {
      "vocab": [
        { "word": "Nationalisation", "definition": "The transfer of a major branch of industry or commerce from private to state ownership or control." },
        { "word": "Tripartite", "definition": "Shared by or involving three parties (Britain, France, and Israel in 1956)." },
        { "word": "Pretext", "definition": "A false reason given to justify an action." },
        { "word": "Brinkmanship", "definition": "The practice of pursuing a dangerous policy to the limits of safety before stopping." }
      ],
      "timeline": [
        { "date": "July 1956", "event": "Suez Canal Nationalised", "description": "President Nasser takes control of the canal to fund the Aswan High Dam." },
        { "date": "Oct 1956", "event": "Protocol of Sèvres", "description": "Britain, France, and Israel make a secret agreement to attack Egypt." },
        { "date": "Nov 1956", "event": "Tripartite Invasion", "description": "Israel invades Sinai, followed by British and French troops occupying the canal." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "consequence",
      "questionText": "Explain one consequence of the nationalisation of the Suez Canal (1956). (4 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. One consequence of the nationalisation was that Britain and France gained permanent control of the canal.", "correct": false },
            { "text": "B. One consequence of the nationalisation of the Suez Canal was that it triggered a secret military invasion of Egypt by Britain, France, and Israel.", "correct": true },
            { "text": "C. One consequence was that it led to the immediate outbreak of the Six-Day War.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. Specifically, Egypt signed the Camp David Accords with Israel to resolve the dispute.", "correct": false },
            { "text": "B. Specifically, under the secret Protocol of Sèvres in October 1956, Israel invaded the Sinai Peninsula, giving Britain and France a pretext to intervene and occupy the Canal Zone.", "correct": true },
            { "text": "C. Specifically, the United Nations sent 100,000 troops to defend Egypt from any attack.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This meant that Israel annexed the Sinai Peninsula permanently.", "correct": false },
            { "text": "B. This meant that international condemnation from the US and USSR forced the invaders to withdraw, boosting President Nasser's prestige as a hero of Arab nationalism who successfully stood up to Western powers.", "correct": true },
            { "text": "C. This resulted in the immediate collapse of the Soviet Union.", "correct": false }
          ]
        }
      },
      "commentary": "Well done! You have built a perfect consequence paragraph. It clearly links the nationalisation to the military response (invasion via the secret Protocol of Sèvres) and explains the geopolitical result (forced withdrawal and Nasser's massive political boost)."
    }
  },
  "subtopic_2_2": {
    "coreSupport": {
      "vocab": [
        { "word": "Preemptive", "definition": "Done to prevent an anticipated threat (such as an air strike before an invasion)." },
        { "word": "Mobilisation", "definition": "The act of assembling and readying military troops and supplies for war." },
        { "word": "Resolution 242", "definition": "The UN resolution calling for Israeli withdrawal from occupied lands in exchange for peace." },
        { "word": "Demilitarised", "definition": "An area from which military forces and installations are prohibited." }
      ],
      "timeline": [
        { "date": "May 1967", "event": "Straits Blockaded Again", "description": "Nasser expels UN peacekeepers and closes the Straits of Tiran to Israeli shipping." },
        { "date": "5 June 1967", "event": "Operation Focus", "description": "Israel launches a surprise preemptive air strike, destroying the Egyptian air force." },
        { "date": "10 June 1967", "event": "Six-Day War Ends", "description": "Israel defeats Egypt, Jordan, and Syria, capturing massive new territories." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "importance",
      "questionText": "Explain the importance of the Six-Day War (1967) for the balance of power in the Middle East. (8 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. The war was important because it led to the immediate creation of a Palestinian state.", "correct": false },
            { "text": "B. The Six-Day War was highly important because it established Israel as the dominant military power in the region and humiliated Arab leadership.", "correct": true },
            { "text": "C. The war was important because it caused Egypt to annex the Gaza Strip.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. Specifically, Jordan successfully captured West Jerusalem and forced Israel to surrender.", "correct": false },
            { "text": "B. Specifically, Israel's preemptive air strike (Operation Focus) destroyed 338 Egyptian planes on the ground in three hours, securing complete air superiority.", "correct": true },
            { "text": "C. Specifically, the Soviet Union sent troops to occupy the Sinai Peninsula.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This led to Israel returning all captured territories within a week.", "correct": false },
            { "text": "B. This complete military dominance enabled Israel to defeat three Arab nations simultaneously in just six days, capturing East Jerusalem, the West Bank, Gaza, Sinai, and the Golan Heights.", "correct": true },
            { "text": "C. This resulted in the immediate signing of the Oslo peace treaty.", "correct": false }
          ]
        }
      },
      "commentary": "Excellent work! You have shown why the Six-Day War was a turning point. The paragraph explains how Israel's air superiority (Operation Focus) translated into total victory on the ground, reshaping the map and regional balance of power."
    }
  },
  "subtopic_2_3": {
    "coreSupport": {
      "vocab": [
        { "word": "Annexation", "definition": "The formal act of acquiring something (especially territory) by conquest or occupation." },
        { "word": "Intifada", "definition": "An Arabic word meaning 'uprising' or 'shaking off'." },
        { "word": "Diplomacy", "definition": "The profession, activity, or skill of managing international relations." },
        { "word": "Sovereignty", "definition": "The authority of a state to govern itself or another state." }
      ],
      "timeline": [
        { "date": "Nov 1967", "event": "UN Resolution 242", "description": "Formulates the 'land for peace' principle to resolve the conflict." },
        { "date": "1970", "event": "Black September", "description": "Jordan expels the PLO after violent clashes, forcing them to move to Lebanon." },
        { "date": "Sept 1972", "event": "Munich Massacre", "description": "Palestinian militants kill 11 Israeli athletes at the Olympic Games." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "narrative",
      "questionText": "Write a narrative account of the rise of Palestinian militancy after 1967. (Focus: The Munich Olympics Massacre, 1972) (8 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. One consequence of the Munich massacre was the immediate signing of the Camp David Accords.", "correct": false },
            { "text": "B. Following the 1967 war, Palestinian militant groups turned to international terrorism, leading to the Black September attack at the 1972 Munich Olympics.", "correct": true },
            { "text": "C. The rise of militancy began when Israel withdrew from the Gaza Strip in 1972.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. For example, Ariel Sharon visited the Temple Mount, sparking widespread protests.", "correct": false },
            { "text": "B. During the games, militants took 11 Israeli athletes hostage, resulting in a failed West German rescue attempt where all hostages were killed.", "correct": true },
            { "text": "C. During the attack, the UN peacekeepers successfully negotiated the release of all hostages.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This meant that the Suez Canal was permanently closed to all international shipping.", "correct": false },
            { "text": "B. This tragedy shocked the international community and drew global media attention to the Palestinian cause, while prompting Israel to launch targeted assassinations of PLO operatives.", "correct": true },
            { "text": "C. This resulted in the immediate collapse of the State of Israel.", "correct": false }
          ]
        }
      },
      "commentary": "Outstanding sequence! You've traced the narrative accurately. The tragic events in Munich (middle) flowed directly from the shift toward global terrorism (beginning) and led to massive international publicity as well as covert Israeli retaliation (end)."
    }
  },
  "subtopic_3_1": {
    "coreSupport": {
      "vocab": [
        { "word": "Coalition", "definition": "A temporary alliance for joint action, especially of distinct states." },
        { "word": "Holy Day", "definition": "A day set aside for religious observance (Yom Kippur)." },
        { "word": "Embargo", "definition": "An official ban on trade or other commercial activity with a particular country." },
        { "word": "Invincibility", "definition": "The quality of being too powerful to be defeated or overcome." }
      ],
      "timeline": [
        { "date": "6 Oct 1973", "event": "Yom Kippur Surprise", "description": "Egypt and Syria attack Israeli forces on the holy day of Yom Kippur." },
        { "date": "Oct 1973", "event": "Oil Embargo", "description": "Arab OPEC members cut oil production and embargo the West, triggering a global energy crisis." },
        { "date": "Oct 1973", "event": "Superpower Alert", "description": "US and USSR engage in intense diplomacy to enforce a UN ceasefire." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "consequence",
      "questionText": "Explain one consequence of the Yom Kippur War (1973). (4 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. One consequence was that Israel permanently annexed the Suez Canal.", "correct": false },
            { "text": "B. One consequence of the Yom Kippur War was that it shattered the myth of Israeli military invincibility and restored Arab political pride.", "correct": true },
            { "text": "C. One consequence was the immediate return of the West Bank to Jordanian control.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. Specifically, Israeli forces were caught entirely by surprise, allowing Egyptian troops to breach the Bar Lev Line.", "correct": true },
            { "text": "B. Specifically, President Jimmy Carter immediately signed the Camp David Accords.", "correct": false },
            { "text": "C. Specifically, the UN sent 50,000 peacekeepers to establish a Palestinian state.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This meant that Egypt joined the Soviet Union as a formal satellite state.", "correct": false },
            { "text": "B. This initial success demonstrated that Arab armies could challenge Israel, which forced Israel to realize it could not rely purely on military dominance, paving the long-term path to the Camp David peace talks.", "correct": true },
            { "text": "C. This resulted in the immediate disarmament of the Israeli military.", "correct": false }
          ]
        }
      },
      "commentary": "Perfect structure! Your answer connects the consequence (shattered myth of invincibility) to the evidence (surprise attack and Bar Lev Line breach) and explains the outcome (forcing Israel to seek diplomatic negotiations at Camp David)."
    }
  },
  "subtopic_3_2": {
    "coreSupport": {
      "vocab": [
        { "word": "Accord", "definition": "An official agreement or treaty." },
        { "word": "Neutralise", "definition": "Render something ineffective or harmless." },
        { "word": "Solidarity", "definition": "Unity or agreement of feeling or action, especially among individuals with a common interest." },
        { "word": "Autonomy", "definition": "The right or condition of self-government." }
      ],
      "timeline": [
        { "date": "Nov 1977", "event": "Sadat's Knesset Speech", "description": "Egyptian President Anwar Sadat makes a historic visit to speak to the Knesset." },
        { "date": "Sept 1978", "event": "Camp David Accords", "description": "Jimmy Carter hosts Sadat and Menachem Begin for 12 days of secret talks." },
        { "date": "March 1979", "event": "Peace Treaty Signed", "description": "Egypt and Israel sign a formal peace treaty in Washington." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "importance",
      "questionText": "Explain the importance of the Camp David Accords (1978) for the peace process in the Middle East. (8 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. The Accords were important because they immediately solved the Palestinian refugee crisis.", "correct": false },
            { "text": "B. The Camp David Accords were highly important because they led to the first-ever peace treaty between Israel and a major Arab nation.", "correct": true },
            { "text": "C. The Accords were important because they forced Israel to withdraw from East Jerusalem.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. Specifically, Egypt declared war on the United States to show solidarity with Palestine.", "correct": false },
            { "text": "B. Specifically, in 1979, Israeli Prime Minister Menachem Begin and Egyptian President Anwar Sadat signed a treaty returning the Sinai Peninsula to Egypt in exchange for recognition.", "correct": true },
            { "text": "C. Specifically, Syria and Jordan signed identical peace treaties with Israel the following week.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This led to Egypt becoming the leader of a unified Arab war coalition.", "correct": false },
            { "text": "B. This meant that Egypt was suspended from the Arab League for breaking Arab solidarity, but it successfully neutralized Israel's largest military opponent, creating a lasting peace on Israel's southern border.", "correct": true },
            { "text": "C. This resulted in the United Nations taking direct administrative control of the Sinai.", "correct": false }
          ]
        }
      },
      "commentary": "Great work! This paragraph demonstrates the importance of Camp David by showing how the return of Sinai and Egypt's recognition of Israel neutralized Israel's largest military opponent, changing regional dynamics forever."
    }
  },
  "subtopic_3_3": {
    "coreSupport": {
      "vocab": [
        { "word": "Intifada", "definition": "A Palestinian uprising against the Israeli occupation of the West Bank and Gaza Strip." },
        { "word": "Settlement", "definition": "Israeli communities established in the West Bank and Gaza Strip." },
        { "word": "Extremism", "definition": "The holding of extreme political or religious views." },
        { "word": "Accord", "definition": "An official agreement (such as the Oslo Accords)." }
      ],
      "timeline": [
        { "date": "Sept 1993", "event": "Oslo I Accord", "description": "Rabin and Arafat sign the Declaration of Principles in Washington." },
        { "date": "Nov 1995", "event": "Rabin Assassinated", "description": "Israeli Prime Minister Yitzhak Rabin is killed by a Jewish extremist." },
        { "date": "Sept 2000", "event": "Second Intifada", "description": "Ariel Sharon visits Al-Aqsa, triggering a five-year violent uprising." }
      ]
    },
    "scaffoldedPractice": {
      "questionType": "narrative",
      "questionText": "Write a narrative account of the collapse of the Oslo peace process. (Focus: The Second Intifada, 2000) (8 marks)",
      "steps": {
        "point": {
          "options": [
            { "text": "A. The collapse of the peace process began when Egypt and Israel signed the Camp David Accords.", "correct": false },
            { "text": "B. The Oslo peace process of the 1990s collapsed due to unresolved issues, leading to the outbreak of the Second Intifada in September 2000.", "correct": true },
            { "text": "C. The Oslo process collapsed because the UN withdrew all peacekeepers from the West Bank.", "correct": false }
          ]
        },
        "evidence": {
          "options": [
            { "text": "A. For example, Israel immediately withdrew from East Jerusalem in response to the Oslo Accords.", "correct": false },
            { "text": "B. This uprising was sparked by Ariel Sharon's controversial visit to the Al-Aqsa compound, escalating into widespread suicide bombings and Israeli military crackdowns.", "correct": true },
            { "text": "C. This conflict was resolved when Yasser Arafat signed the Camp David treaty in 2000.", "correct": false }
          ]
        },
        "explain": {
          "options": [
            { "text": "A. This meant that Israel and Egypt signed a permanent mutual defense pact.", "correct": false },
            { "text": "B. This violence destroyed the Israeli peace movement, led to the construction of the West Bank barrier wall, and locked both sides into a cycle of mutual distrust and security containment.", "correct": true },
            { "text": "C. This resulted in the immediate creation of a fully independent state of Palestine.", "correct": false }
          ]
        }
      },
      "commentary": "Superb narrative writing! You've traced the tragic collapse of the peace process. Sharon's visit and the Second Intifada (middle) linked the breakdown of Oslo negotiations (beginning) to a complete breakdown in trust and the building of the security wall (end)."
    }
  }
};

let content = fs.readFileSync('src/lessons_data.js', 'utf8');

// We will parse it and add the keys
// Because it's an ES module, let's use eval but strip export first
let evalStr = content.replace('export const LESSONS_DATA =', 'const data =') + '; data;';
const parsedData = eval(evalStr);

// Now update all subtopics
for (let key in dataToAdd) {
  if (parsedData[key]) {
    parsedData[key].coreSupport = dataToAdd[key].coreSupport;
    parsedData[key].scaffoldedPractice = dataToAdd[key].scaffoldedPractice;
    console.log(`✓ Added data for ${key}`);
  } else {
    console.error(`✗ Key ${key} not found in LESSONS_DATA`);
  }
}

// Write it back
const serialized = 'export const LESSONS_DATA = ' + JSON.stringify(parsedData, null, 2) + ';\n';
fs.writeFileSync('src/lessons_data.js', serialized, 'utf8');
console.log('✓ Successfully wrote lessons_data.js updates!');
