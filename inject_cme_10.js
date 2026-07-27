const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let code = fs.readFileSync(dataPath, 'utf8');

const newQuestions = {
    "KT1.1: The End of the British Mandate and the Creation of Israel, 1945–1949": [
        {
            "question": "Why did Britain refer the Palestine issue to the United Nations in 1947?",
            "options": [
                "They had secured a long-term oil treaty with Egypt",
                "The rising cost and violence of the Jewish insurgency",
                "The Soviet Union threatened to invade Palestine",
                "The Arab League officially declared war on Britain"
            ],
            "answer": 1
        },
        {
            "question": "What did the UN Special Committee on Palestine (UNSCOP) recommend in 1947?",
            "options": [
                "A unified binational state with a Jewish Prime Minister",
                "The partition of Palestine into separate Jewish and Arab states",
                "Keeping Palestine under permanent British control",
                "Handing control of Palestine entirely to the Arab League"
            ],
            "answer": 1
        },
        {
            "question": "How did the Arab Higher Committee respond to the UN Partition Plan?",
            "options": [
                "They rejected it completely and declared a general strike",
                "They accepted it conditionally based on Jerusalem's status",
                "They agreed to share power in a newly formed Jewish state",
                "They requested a ten-year delay to prepare for independence"
            ],
            "answer": 0
        },
        {
            "question": "What was the significance of the attack on Deir Yassin in April 1948?",
            "options": [
                "It was a major British military victory over the Irgun",
                "It led to the mass exodus of Palestinian Arabs out of fear",
                "It was the first time the Arab League captured a Jewish settlement",
                "It resulted in the immediate signing of a ceasefire agreement"
            ],
            "answer": 1
        },
        {
            "question": "When did David Ben-Gurion officially declare the creation of the State of Israel?",
            "options": [
                "14 May 1948",
                "29 November 1947",
                "15 May 1949",
                "1 January 1948"
            ],
            "answer": 0
        },
        {
            "question": "Which of these groups carried out the bombing of the King David Hotel in 1946?",
            "options": [
                "The Haganah",
                "The Arab Liberation Army",
                "The Irgun",
                "The British Mandatory Police"
            ],
            "answer": 2
        }
    ],
    "KT1.2: The Aftermath of the 1948–49 War": [
        {
            "question": "What was a major consequence of the 1948-49 Arab-Israeli War for the Palestinian Arabs?",
            "options": [
                "They gained full control of the West Bank and Gaza",
                "Approximately 700,000 became refugees (the Nakba)",
                "They formed a new coalition government with Israel",
                "They were immediately granted citizenship in Egypt and Syria"
            ],
            "answer": 1
        },
        {
            "question": "Which Arab nation took control of the West Bank after the 1948-49 war?",
            "options": [
                "Egypt",
                "Syria",
                "Lebanon",
                "Transjordan (Jordan)"
            ],
            "answer": 3
        },
        {
            "question": "What was the Law of Return passed by Israel in 1950?",
            "options": [
                "A law allowing Palestinian refugees to return to their homes",
                "A law granting every Jew in the world the right to immigrate to Israel",
                "A treaty returning captured territory to Egypt",
                "An agreement to return British military bases in Haifa"
            ],
            "answer": 1
        },
        {
            "question": "How did the Israeli government handle the abandoned properties of Palestinian refugees?",
            "options": [
                "They were preserved untouched until a peace treaty could be signed",
                "They were handed over to the United Nations for administration",
                "They were expropriated by the state and given to Jewish immigrants",
                "They were destroyed to create a demilitarized buffer zone"
            ],
            "answer": 2
        },
        {
            "question": "Which territory was occupied by Egypt following the 1948-49 War?",
            "options": [
                "The Golan Heights",
                "The Sinai Peninsula",
                "The Gaza Strip",
                "East Jerusalem"
            ],
            "answer": 2
        },
        {
            "question": "Why did many Arab nations refuse to sign formal peace treaties with Israel after 1949?",
            "options": [
                "They were waiting for Soviet approval",
                "They refused to formally recognize the existence of the State of Israel",
                "Israel demanded they pay massive war reparations",
                "Britain threatened to cut off their oil supplies if they did"
            ],
            "answer": 1
        },
        {
            "question": "How did the demographics of Israel change rapidly in the early 1950s?",
            "options": [
                "A massive influx of Jewish refugees from Arab nations and Holocaust survivors",
                "A sharp decline in population due to emigration to America",
                "The forced relocation of all Christians to Lebanon",
                "The gradual return of the Palestinian refugees under UN supervision"
            ],
            "answer": 0
        }
    ],
    "KT1.3: Increased Tension, 1955–1963": [
        {
            "question": "Why did the US and Britain withdraw funding for the Aswan High Dam in 1956?",
            "options": [
                "Nasser signed a major arms deal with Czechoslovakia (Soviet Bloc)",
                "The dam's construction was causing severe environmental damage",
                "Egypt failed to repay its loans to the World Bank",
                "Nasser threatened to blow up the Suez Canal"
            ],
            "answer": 0
        },
        {
            "question": "How did President Nasser respond to the withdrawal of Aswan Dam funding?",
            "options": [
                "He declared a military alliance with Israel",
                "He resigned as President of Egypt",
                "He nationalised the Suez Canal",
                "He invaded the British bases in Cyprus"
            ],
            "answer": 2
        },
        {
            "question": "What was the 'Protocol of Sèvres'?",
            "options": [
                "A peace treaty signed between Egypt and Syria",
                "A secret agreement between Britain, France, and Israel to invade Egypt",
                "A UN resolution demanding the return of Palestinian refugees",
                "An American plan to send nuclear weapons to the Middle East"
            ],
            "answer": 1
        },
        {
            "question": "Why did Britain and France want to overthrow Nasser during the Suez Crisis?",
            "options": [
                "Because Nasser had nationalised the canal and threatened their imperial interests",
                "Because Nasser had closed the canal to all European shipping permanently",
                "Because Nasser had launched an unprovoked attack on London",
                "Because they wanted to install a Soviet-friendly government in Cairo"
            ],
            "answer": 0
        },
        {
            "question": "What role did the United Nations play at the end of the Suez Crisis?",
            "options": [
                "It authorized a joint US-Soviet invasion of Egypt",
                "It deployed the first UN Emergency Force (UNEF) to the Sinai to keep peace",
                "It expelled Israel from the UN General Assembly",
                "It handed control of the Suez Canal over to Britain"
            ],
            "answer": 1
        },
        {
            "question": "What was a significant outcome of the Suez Crisis for Gamal Abdel Nasser?",
            "options": [
                "He was forced into exile in Saudi Arabia",
                "He emerged as a hero of the Arab world for standing up to imperialism",
                "He lost control of the Egyptian military to radical Islamists",
                "He was forced to sign a peace treaty with Israel"
            ],
            "answer": 1
        },
        {
            "question": "How did the United States react to the Anglo-French-Israeli invasion of Egypt in 1956?",
            "options": [
                "They fully supported it and sent the US Navy to assist",
                "They were furious and used economic pressure to force a withdrawal",
                "They remained entirely neutral and ignored the conflict",
                "They threatened to use nuclear weapons against Egypt"
            ],
            "answer": 1
        }
    ],
    "KT2.1: The Six Day War, 1967": [
        {
            "question": "What action did Nasser take in May 1967 that directly escalated tensions before the war?",
            "options": [
                "He closed the Straits of Tiran to Israeli shipping",
                "He launched a surprise aerial bombardment on Tel Aviv",
                "He expelled the US ambassador from Cairo",
                "He assassinated the King of Jordan"
            ],
            "answer": 0
        },
        {
            "question": "What false information did the Soviet Union give to Egypt in 1967?",
            "options": [
                "That the US was planning to invade Egypt",
                "That Israel was massing troops on the Syrian border",
                "That Britain had secretly taken over the Suez Canal again",
                "That the UN was preparing to dismantle the State of Israel"
            ],
            "answer": 1
        },
        {
            "question": "How did the Six Day War begin on 5 June 1967?",
            "options": [
                "Egyptian tanks crossed the border into the Negev Desert",
                "Syrian artillery bombarded Israeli settlements near the Sea of Galilee",
                "Israel launched a devastating pre-emptive airstrike, destroying the Egyptian air force on the ground",
                "Jordanian forces attacked West Jerusalem"
            ],
            "answer": 2
        },
        {
            "question": "Which of these territories was captured by Israel from Syria during the Six Day War?",
            "options": [
                "The Sinai Peninsula",
                "The Golan Heights",
                "The West Bank",
                "The Gaza Strip"
            ],
            "answer": 1
        },
        {
            "question": "What was the significance of Israel capturing East Jerusalem in 1967?",
            "options": [
                "It allowed them to gain access to the Western Wall for the first time since 1948",
                "It caused the immediate collapse of the Jordanian monarchy",
                "It forced the United Nations to relocate its headquarters to Tel Aviv",
                "It led to the immediate signing of a peace treaty with Egypt"
            ],
            "answer": 0
        },
        {
            "question": "How long did it take for Israel to effectively win the Six Day War?",
            "options": [
                "Six months",
                "Six days",
                "Six weeks",
                "Six years"
            ],
            "answer": 1
        },
        {
            "question": "Which Arab nations fought against Israel in the Six Day War?",
            "options": [
                "Egypt, Syria, and Jordan",
                "Saudi Arabia, Iraq, and Iran",
                "Lebanon, Egypt, and Turkey",
                "Syria, Yemen, and Oman"
            ],
            "answer": 0
        }
    ],
    "KT2.2: The Aftermath of the 1967 War": [
        {
            "question": "What was the main principle of UN Resolution 242?",
            "options": [
                "The complete dismantling of the State of Israel",
                "'Land for Peace'—Israel should withdraw from territories in exchange for recognized boundaries",
                "The permanent annexation of the West Bank by Israel",
                "The forced relocation of all Palestinian refugees to Jordan"
            ],
            "answer": 1
        },
        {
            "question": "What was the 'Khartoum Resolution' declared by the Arab League in 1967?",
            "options": [
                "No peace with Israel, no recognition of Israel, no negotiations with Israel",
                "An agreement to conditionally accept UN Resolution 242",
                "A declaration of immediate war against the United States",
                "A treaty forming a united Arab military command under Nasser"
            ],
            "answer": 0
        },
        {
            "question": "How did the PLO's strategy change after the Arab defeat in the Six Day War?",
            "options": [
                "They disbanded their militant wings and focused entirely on diplomacy",
                "They realized Arab armies couldn't defeat Israel and turned to guerrilla warfare and terrorism",
                "They relocated their headquarters to Tel Aviv to negotiate directly",
                "They joined forces with the Israeli government to fight communism"
            ],
            "answer": 1
        },
        {
            "question": "What was the War of Attrition (1967-1970)?",
            "options": [
                "A large-scale tank battle in the Golan Heights",
                "A diplomatic dispute at the UN over refugee funding",
                "A low-intensity conflict of artillery duels and commando raids along the Suez Canal",
                "A civil war within Israel between secular and religious groups"
            ],
            "answer": 2
        },
        {
            "question": "What happened during 'Black September' in 1970?",
            "options": [
                "The PLO successfully assassinated the Israeli Prime Minister",
                "King Hussein of Jordan crushed the PLO and expelled them from his country",
                "Egypt launched a massive surprise attack on the Sinai Peninsula",
                "A major oil spill destroyed the ecosystem of the Dead Sea"
            ],
            "answer": 1
        },
        {
            "question": "Where did the PLO relocate their primary base of operations after being expelled from Jordan?",
            "options": [
                "Egypt",
                "Syria",
                "Lebanon",
                "Saudi Arabia"
            ],
            "answer": 2
        },
        {
            "question": "How did the Israeli government justify keeping the occupied territories immediately after 1967?",
            "options": [
                "They claimed the UN had ordered them to annex the land",
                "They used them as a strategic military buffer zone and bargaining chips for peace",
                "They argued that the British had secretly given them the land in 1917",
                "They wanted to sell the land back to the Ottoman Empire"
            ],
            "answer": 1
        }
    ],
    "KT2.3: Israel and Egypt, 1967–1973": [
        {
            "question": "Who succeeded Gamal Abdel Nasser as President of Egypt in 1970?",
            "options": [
                "Hosni Mubarak",
                "Anwar Sadat",
                "Yasser Arafat",
                "King Farouk"
            ],
            "answer": 1
        },
        {
            "question": "Why did Anwar Sadat launch the Yom Kippur War in 1973?",
            "options": [
                "To completely destroy the State of Israel",
                "To break the diplomatic stalemate and force Israel to negotiate over the Sinai",
                "To distract the Egyptian public from a massive economic depression",
                "Because the Soviet Union ordered him to attack"
            ],
            "answer": 1
        },
        {
            "question": "Why was the initial Arab attack on 6 October 1973 so successful?",
            "options": [
                "It was the holiest day of the Jewish calendar (Yom Kippur) and Israel was caught by surprise",
                "Israel had dismantled its entire military the week before",
                "The US actively jammed Israeli radar systems",
                "Egypt used experimental nuclear weapons"
            ],
            "answer": 0
        },
        {
            "question": "How did the Yom Kippur War ultimately end militarily?",
            "options": [
                "Egypt captured Tel Aviv and forced an Israeli surrender",
                "Israel recovered, crossed the Suez Canal, and encircled the Egyptian Third Army",
                "The UN stepped in and forced Israel to immediately return the Sinai",
                "Syria successfully held the Golan Heights permanently"
            ],
            "answer": 1
        },
        {
            "question": "What powerful economic weapon did Arab nations use during the 1973 war?",
            "options": [
                "They bought up all Israeli currency to cause hyperinflation",
                "They placed an oil embargo on countries that supported Israel, causing a global energy crisis",
                "They refused to allow Western ships to use the Suez Canal for a decade",
                "They hacked into the US banking system"
            ],
            "answer": 1
        },
        {
            "question": "What was the 'Bar Lev Line'?",
            "options": [
                "A chain of massive Israeli sand fortifications along the Suez Canal",
                "A secret diplomatic backchannel between Israel and Egypt",
                "The border drawn by the UN in 1947",
                "A new type of advanced fighter jet used by Israel"
            ],
            "answer": 0
        },
        {
            "question": "How did the Yom Kippur War change the psychological dynamic between Israel and Egypt?",
            "options": [
                "It convinced Egypt that peace was absolutely impossible",
                "It shattered Israel's myth of invincibility and restored Arab pride, making negotiations possible",
                "It caused the complete collapse of the Egyptian military command",
                "It led to Israel abandoning the entire Sinai immediately without a treaty"
            ],
            "answer": 1
        }
    ],
    "KT3.1: Diplomatic negotiations, 1974–1979": [
        {
            "question": "What dramatic gesture did Anwar Sadat make in November 1977?",
            "options": [
                "He resigned as President of Egypt",
                "He became the first Arab leader to visit Israel and speak to the Knesset",
                "He declared a second surprise war on Israel",
                "He signed a secret military alliance with the Soviet Union"
            ],
            "answer": 1
        },
        {
            "question": "Which US President was the primary mediator of the Camp David Accords?",
            "options": [
                "Richard Nixon",
                "Gerald Ford",
                "Jimmy Carter",
                "Ronald Reagan"
            ],
            "answer": 2
        },
        {
            "question": "What was the main outcome of the 1979 Egypt-Israel Peace Treaty?",
            "options": [
                "Israel returned the Sinai Peninsula to Egypt in exchange for full peace and recognition",
                "Israel returned the Golan Heights to Syria",
                "Egypt was given control of the Gaza Strip",
                "The complete establishment of an independent Palestinian state"
            ],
            "answer": 0
        },
        {
            "question": "Who was the Israeli Prime Minister who signed the Camp David Accords?",
            "options": [
                "David Ben-Gurion",
                "Golda Meir",
                "Menachem Begin",
                "Yitzhak Rabin"
            ],
            "answer": 2
        },
        {
            "question": "How did the rest of the Arab world react to Egypt signing a peace treaty with Israel?",
            "options": [
                "They applauded Sadat's bravery and followed his lead",
                "They were furious, expelled Egypt from the Arab League, and cut diplomatic ties",
                "They ignored the treaty completely",
                "They requested that the US broker similar deals for them immediately"
            ],
            "answer": 1
        },
        {
            "question": "What eventually happened to Anwar Sadat as a result of making peace with Israel?",
            "options": [
                "He was awarded the Nobel Peace Prize and lived a long, peaceful life",
                "He was assassinated by Islamic extremists within the Egyptian army in 1981",
                "He was overthrown in a popular democratic election",
                "He was exiled to France by the Egyptian military"
            ],
            "answer": 1
        },
        {
            "question": "What did the Camp David Accords fail to fully resolve?",
            "options": [
                "The border dispute in the Sinai Peninsula",
                "The reopening of the Suez Canal to Israeli shipping",
                "The creation of an independent Palestinian state and the status of Jerusalem",
                "The withdrawal of Israeli forces from Egyptian territory"
            ],
            "answer": 2
        }
    ],
    "KT3.2: The Palestinian Issue, 1974–1993": [
        {
            "question": "Why did Israel invade Lebanon in 1982?",
            "options": [
                "To capture the Litani River for fresh water supplies",
                "To destroy the PLO bases that were launching attacks into northern Israel",
                "To assist the Syrian army in putting down a rebellion",
                "To establish a new Jewish settlement in Beirut"
            ],
            "answer": 1
        },
        {
            "question": "What tragic event occurred at the Sabra and Shatila refugee camps in 1982?",
            "options": [
                "A massive earthquake destroyed the camps",
                "Christian Phalangist militias massacred Palestinian refugees while Israeli troops stood by",
                "The PLO successfully defended the camps against a massive Syrian assault",
                "The UN forcibly relocated all the refugees to Jordan"
            ],
            "answer": 1
        },
        {
            "question": "What was the First Intifada which began in 1987?",
            "options": [
                "A heavily armed tank battle between Israel and Syria",
                "A spontaneous, grassroots uprising by Palestinians in the West Bank and Gaza against Israeli occupation",
                "A diplomatic peace conference held in Madrid",
                "The code name for the Israeli withdrawal from Lebanon"
            ],
            "answer": 1
        },
        {
            "question": "What characterized the tactics of the Palestinians during the First Intifada?",
            "options": [
                "Extensive use of advanced surface-to-air missiles",
                "Stone-throwing, strikes, boycotts, and barricades",
                "Deploying fighter jets against Israeli cities",
                "The exclusive use of cyber-warfare to disable Israeli communications"
            ],
            "answer": 1
        },
        {
            "question": "Which new Palestinian militant group emerged during the First Intifada in 1987?",
            "options": [
                "The PLO",
                "Fatah",
                "Hamas",
                "Hezbollah"
            ],
            "answer": 2
        },
        {
            "question": "How did Yasser Arafat change the PLO's stance in 1988?",
            "options": [
                "He publicly renounced terrorism and accepted Israel's right to exist",
                "He declared total war on the United States",
                "He announced that the PLO would merge with Hamas",
                "He stated that the PLO would only accept a one-state solution"
            ],
            "answer": 0
        },
        {
            "question": "How did the Israeli 'Iron Fist' policy attempt to deal with the Intifada?",
            "options": [
                "By immediately granting full independence to the West Bank",
                "By using harsh military crackdowns, curfews, and mass arrests",
                "By building a massive concrete wall around Gaza",
                "By negotiating directly with Hamas leaders in secret"
            ],
            "answer": 1
        }
    ],
    "KT3.3: Attempts at a solution, 1988–1995": [
        {
            "question": "What was the significance of the 1993 Oslo Accords?",
            "options": [
                "It was the first face-to-face agreement between Israel and the PLO, establishing limited Palestinian self-rule",
                "It was a treaty where Israel handed over the entirety of Jerusalem to the PLO",
                "It was an economic agreement that merged the Israeli and Palestinian currencies",
                "It was a military alliance between Israel and Syria"
            ],
            "answer": 0
        },
        {
            "question": "What new governing body was created by the Oslo Accords?",
            "options": [
                "The Arab League",
                "The Palestinian Authority (PA)",
                "The United Nations Relief and Works Agency",
                "The Supreme Court of Palestine"
            ],
            "answer": 1
        },
        {
            "question": "Which Israeli Prime Minister shook hands with Yasser Arafat on the White House lawn in 1993?",
            "options": [
                "Benjamin Netanyahu",
                "Ariel Sharon",
                "Yitzhak Rabin",
                "Menachem Begin"
            ],
            "answer": 2
        },
        {
            "question": "Why did the Oslo peace process begin to break down in the mid-1990s?",
            "options": [
                "The United States withdrew all funding for the Middle East",
                "Extremists on both sides used violence (such as Hamas suicide bombings) to derail the process",
                "Egypt declared war on Israel again",
                "The PLO refused to hold democratic elections"
            ],
            "answer": 1
        },
        {
            "question": "What tragic event happened on 4 November 1995 that dealt a massive blow to the peace process?",
            "options": [
                "Yasser Arafat was assassinated in Gaza",
                "Israeli Prime Minister Yitzhak Rabin was assassinated by a right-wing Jewish extremist",
                "A massive earthquake destroyed the newly built Palestinian parliament",
                "The UN voted to dissolve the State of Israel"
            ],
            "answer": 1
        },
        {
            "question": "What controversial issue was deliberately left out of the Oslo I agreement to be solved later?",
            "options": [
                "The status of Jerusalem and the Right of Return for refugees",
                "The withdrawal of Israeli troops from Jericho",
                "The recognition of the PLO as the representative of the Palestinian people",
                "The creation of the Palestinian Authority"
            ],
            "answer": 0
        }
    ]
};

try {
    let jsonStr = code.replace(/import .*?;\n/g, '');
    jsonStr = jsonStr.replace(/export const unitData = |export default /g, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    
    let mock_exams = {};
    let unitData = eval('(' + jsonStr + ')');

    unitData.lessons.forEach(l => {
        if (!l.quiz) l.quiz = [];
        const toAdd = newQuestions[l.title];
        if (toAdd) {
            toAdd.forEach(q => l.quiz.push(q));
            
            // Deduplicate based on question text
            let uniqueQuiz = [];
            let seen = new Set();
            l.quiz.forEach(q => {
                let qText = q.question || q.q;
                if (!seen.has(qText)) {
                    seen.add(qText);
                    uniqueQuiz.push(q);
                }
            });
            l.quiz = uniqueQuiz;
            console.log(`Updated ${l.title}: now has ${l.quiz.length} questions`);
        }
    });

    let newCode = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
    fs.writeFileSync(dataPath, newCode);
    console.log("Successfully injected new CME questions.");
} catch(e) {
    console.error("Error updating file:", e);
}
