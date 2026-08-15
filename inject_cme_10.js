const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let code = fs.readFileSync(dataPath, 'utf8');

const match = code.match(/export const unitData = (\{[\s\S]+\});/);
if (!match) {
    console.error("Could not find unitData object in CME data.js");
    process.exit(1);
}

let data = new Function(`return ${match[1]}`)();

const doNows = {
    "lesson_0": [
        { "question": "What does 'empire' mean?", "answer": "A group of countries or territories controlled by a single ruler or state." },
        { "question": "What does 'colony' mean?", "answer": "A country or area under the political control of another country." },
        { "question": "In what year did the First World War end?", "answer": "1918." },
        { "question": "What does 'mandate' mean in an international context?", "answer": "An official order or commission given by the League of Nations to govern a territory." },
        { "question": "What was the League of Nations?", "answer": "An international organization formed after WW1 to promote peace and prevent war." },
        { "question": "What does 'assassination' mean?", "answer": "The murder of a prominent person, often for political reasons." },
        { "question": "What is a 'dictatorship'?", "answer": "A country ruled by a single leader with total power." },
        { "question": "What is a 'republic'?", "answer": "A country without a monarch." },
        { "question": "What does 'nationalism' mean?", "answer": "A strong identification with one's own nation and support for its interests." },
        { "question": "What is 'propaganda'?", "answer": "Biased or misleading information used to promote a political cause." }
    ],
    "lesson_1": [
        { "question": "Why did Britain refer the Palestine issue to the UN in 1947?", "answer": "Due to the rising cost and the violence of the Jewish insurgency." },
        { "question": "What did the UN Special Committee on Palestine (UNSCOP) recommend?", "answer": "The partition of Palestine into separate Jewish and Arab states." },
        { "question": "How did the Arab Higher Committee respond to the UN Partition Plan?", "answer": "They rejected it completely." },
        { "question": "What was the significance of the attack on Deir Yassin in April 1948?", "answer": "It led to a mass exodus of Palestinian Arabs out of fear." },
        { "question": "When did David Ben-Gurion officially declare the creation of the State of Israel?", "answer": "14 May 1948." },
        { "question": "What does 'empire' mean?", "answer": "Countries controlled by a single ruler." },
        { "question": "What does 'mandate' mean?", "answer": "A commission given by the League of Nations to govern a territory." },
        { "question": "What was the League of Nations?", "answer": "An international peace organization formed after WW1." },
        { "question": "In what year did WW1 end?", "answer": "1918." },
        { "question": "What does 'nationalism' mean?", "answer": "Strong identification with one's own nation." }
    ],
    "lesson_2": [
        { "question": "What was the 1948-49 Arab-Israeli War?", "answer": "The invasion of Israel by surrounding Arab nations immediately after it declared independence." },
        { "question": "Which Arab nations invaded Israel in 1948?", "answer": "Egypt, Syria, Transjordan, Lebanon, and Iraq." },
        { "question": "Why did the Israelis ultimately win the 1948-49 war?", "answer": "They were highly motivated, secured weapons from Czechoslovakia, and the Arab armies were uncoordinated." },
        { "question": "What was the impact of the war on Israel's borders?", "answer": "Israel gained 21% more territory than the UN Partition Plan had given them." },
        { "question": "What was the Nakba?", "answer": "The 'Catastrophe'—the expulsion and flight of approx. 700,000 Palestinian Arabs." },
        { "question": "When did David Ben-Gurion declare the State of Israel?", "answer": "14 May 1948." },
        { "question": "What did UNSCOP recommend in 1947?", "answer": "The partition of Palestine into two states." },
        { "question": "Why did Britain refer the issue to the UN?", "answer": "Violence and cost of the mandate." },
        { "question": "What was the attack on Deir Yassin?", "answer": "A massacre that caused mass Arab panic and flight." },
        { "question": "What does 'colony' mean?", "answer": "A country controlled by another." }
    ],
    "lesson_3": [
        { "question": "What was the Law of Return (1950)?", "answer": "An Israeli law granting every Jew in the world the right to immigrate to Israel." },
        { "question": "Which Arab nation took control of the West Bank after 1949?", "answer": "Transjordan (Jordan)." },
        { "question": "Which Arab nation took control of the Gaza Strip after 1949?", "answer": "Egypt." },
        { "question": "How did Arab states treat the Palestinian refugees?", "answer": "They largely kept them in squalid refugee camps and refused to integrate them." },
        { "question": "What were the 'fedayeen'?", "answer": "Palestinian guerrilla fighters who launched raids into Israel from neighboring Arab states." },
        { "question": "What was the 1948-49 Arab-Israeli War?", "answer": "The first major conflict following Israel's creation." },
        { "question": "Why did Israel win in 1949?", "answer": "Better organization, motivation, and weapons." },
        { "question": "What was the Nakba?", "answer": "The Palestinian refugee crisis (approx. 700,000 people)." },
        { "question": "What did UNSCOP recommend in 1947?", "answer": "Partition into a Jewish and Arab state." },
        { "question": "When was the State of Israel created?", "answer": "14 May 1948." }
    ],
    "lesson_4": [
        { "question": "Who became President of Egypt in 1954?", "answer": "Gamal Abdel Nasser." },
        { "question": "Why did Nasser nationalize the Suez Canal in 1956?", "answer": "To pay for the Aswan High Dam after the US and UK withdrew their funding." },
        { "question": "Which three countries secretly conspired to attack Egypt during the Suez Crisis?", "answer": "Israel, Britain, and France (The Sèvres Protocol)." },
        { "question": "What was Israel's role in the Suez plan?", "answer": "To invade the Sinai Peninsula, giving Britain and France an excuse to 'intervene'." },
        { "question": "Why did Britain and France humiliate themselves in the Suez Crisis?", "answer": "The USA forced them to withdraw by threatening economic ruin." },
        { "question": "What was the Law of Return (1950)?", "answer": "A law allowing any Jew to immigrate to Israel." },
        { "question": "Who controlled the West Bank between 1949 and 1967?", "answer": "Jordan." },
        { "question": "What were the 'fedayeen'?", "answer": "Palestinian guerrilla fighters." },
        { "question": "What was the Nakba?", "answer": "The mass displacement of Palestinians in 1948." },
        { "question": "Why did Israel win the 1948-49 war?", "answer": "Arab disunity and superior Israeli organization/arms." }
    ],
    "lesson_5": [
        { "question": "What was the PLO (Palestine Liberation Organization) created in 1964?", "answer": "An umbrella organization aiming to destroy Israel and create a Palestinian state." },
        { "question": "Who became the chairman of the PLO in 1969?", "answer": "Yasser Arafat." },
        { "question": "What triggered the Six Day War in 1967?", "answer": "Nasser expelled UN peacekeepers from Sinai and blockaded the Straits of Tiran." },
        { "question": "How did Israel win the Six Day War so quickly?", "answer": "They launched a devastating pre-emptive air strike, destroying the Egyptian air force on the ground." },
        { "question": "What territories did Israel capture in the Six Day War?", "answer": "The Sinai Peninsula, Gaza Strip, West Bank, and Golan Heights." },
        { "question": "Why did Nasser nationalize the Suez Canal?", "answer": "To fund the Aswan High Dam." },
        { "question": "Which three nations attacked Egypt in 1956?", "answer": "Israel, Britain, and France." },
        { "question": "Why did Britain and France withdraw from Suez?", "answer": "Massive financial pressure from the USA." },
        { "question": "What was the Law of Return?", "answer": "Israel's law allowing Jewish immigration." },
        { "question": "Who controlled the Gaza Strip between 1949 and 1967?", "answer": "Egypt." }
    ],
    "lesson_6": [
        { "question": "What was UN Resolution 242 (1967)?", "answer": "A resolution calling for 'Land for Peace'—Israel returns land in exchange for recognition." },
        { "question": "Why was the Yom Kippur War (1973) launched?", "answer": "Egypt and Syria launched a surprise attack to regain the Sinai and Golan Heights lost in 1967." },
        { "question": "Why was Israel caught off guard in 1973?", "answer": "It was the holiest day in Judaism (Yom Kippur), and they underestimated Arab military improvements." },
        { "question": "What was the oil weapon used during the Yom Kippur War?", "answer": "Arab states (OPEC) reduced oil production to punish countries supporting Israel, causing a global energy crisis." },
        { "question": "Who won the Yom Kippur War militarily?", "answer": "Israel eventually repelled the attacks, but suffered heavy casualties." },
        { "question": "Who became chairman of the PLO in 1969?", "answer": "Yasser Arafat." },
        { "question": "What territories did Israel capture in 1967?", "answer": "Sinai, Gaza, West Bank, Golan Heights." },
        { "question": "How did Israel win the Six Day War?", "answer": "A massive pre-emptive air strike." },
        { "question": "Why did Nasser blockade the Straits of Tiran in 1967?", "answer": "To choke off Israel's southern trade route." },
        { "question": "Who forced Britain and France out of Suez in 1956?", "answer": "The USA." }
    ],
    "lesson_7": [
        { "question": "What was the significance of Anwar Sadat visiting Jerusalem in 1977?", "answer": "He was the first Arab leader to officially visit Israel, opening the door for peace." },
        { "question": "What were the Camp David Accords (1978)?", "answer": "A peace framework brokered by US President Jimmy Carter between Egypt and Israel." },
        { "question": "What was the 1979 Egypt-Israel Peace Treaty?", "answer": "Egypt officially recognized Israel, and Israel agreed to return the Sinai Peninsula." },
        { "question": "How did the Arab world react to Sadat's peace treaty?", "answer": "They were furious; Egypt was expelled from the Arab League, and Sadat was later assassinated." },
        { "question": "What was the PLO's strategy in the 1970s?", "answer": "They used international terrorism, such as the 1972 Munich Olympics massacre, to gain attention." },
        { "question": "Why did Egypt and Syria attack in 1973?", "answer": "To reclaim land lost in 1967." },
        { "question": "What was the 'oil weapon' (OPEC embargo)?", "answer": "Arab nations cutting oil supplies to punish Israel's allies." },
        { "question": "What was UN Resolution 242?", "answer": "The 'Land for Peace' formula." },
        { "question": "What territory did Israel capture from Syria in 1967?", "answer": "The Golan Heights." },
        { "question": "Who was the leader of the PLO?", "answer": "Yasser Arafat." }
    ],
    "lesson_8": [
        { "question": "Why did Israel invade Lebanon in 1982?", "answer": "To destroy PLO bases in southern Lebanon that were attacking northern Israel." },
        { "question": "What were the Sabra and Shatila massacres?", "answer": "Christian militias massacred Palestinian refugees while the Israeli army stood by." },
        { "question": "What was the First Intifada (1987)?", "answer": "A spontaneous, grassroots Palestinian uprising against the Israeli occupation in the West Bank and Gaza." },
        { "question": "What methods were used during the First Intifada?", "answer": "Strikes, boycotts, and most famously, youths throwing stones at heavily armed Israeli soldiers." },
        { "question": "What was the political impact of the First Intifada?", "answer": "It severely damaged Israel's international reputation and pressured them into negotiations." },
        { "question": "What was the 1979 Egypt-Israel Peace Treaty?", "answer": "Israel returned the Sinai in exchange for peace." },
        { "question": "Who brokered the Camp David Accords?", "answer": "US President Jimmy Carter." },
        { "question": "Why was Anwar Sadat assassinated?", "answer": "For making peace with Israel." },
        { "question": "What happened at the 1972 Munich Olympics?", "answer": "Palestinian terrorists took Israeli athletes hostage and murdered them." },
        { "question": "Why was the Yom Kippur War launched?", "answer": "To regain territories lost in 1967." }
    ],
    "lesson_9": [
        { "question": "What were the Oslo Accords (1993)?", "answer": "A historic peace agreement where the PLO recognized Israel, and Israel agreed to limited Palestinian self-rule." },
        { "question": "What was the Palestinian Authority (PA)?", "answer": "The new governing body created by Oslo to administer parts of the West Bank and Gaza." },
        { "question": "Why was Israeli Prime Minister Yitzhak Rabin assassinated in 1995?", "answer": "He was murdered by a right-wing Israeli extremist who opposed giving land to the Palestinians." },
        { "question": "Why did the peace process stall after 1995?", "answer": "Continued violence by Hamas, the expansion of Israeli settlements, and Rabin's assassination." },
        { "question": "What was the fundamental flaw of the Oslo Accords?", "answer": "It delayed solving the hardest issues (Jerusalem, refugees, borders) for a later date." },
        { "question": "What was the First Intifada (1987)?", "answer": "A massive Palestinian uprising against Israeli occupation." },
        { "question": "Why did Israel invade Lebanon in 1982?", "answer": "To destroy the PLO." },
        { "question": "What were the Camp David Accords (1978)?", "answer": "The peace framework between Israel and Egypt." },
        { "question": "What land did Israel agree to return in 1979?", "answer": "The Sinai Peninsula." },
        { "question": "Who was Yasser Arafat?", "answer": "The Chairman of the PLO." }
    ]
};

data.lessons.forEach(lesson => {
    if (doNows[lesson.id]) {
        lesson.do_now = {
            type: "retrieval",
            questions: doNows[lesson.id]
        };
    }
});

const updatedCode = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(dataPath, updatedCode, 'utf8');

console.log("Successfully OVERWROTE cme_new/data.js with 10-question 'Do Now' tasks.");
