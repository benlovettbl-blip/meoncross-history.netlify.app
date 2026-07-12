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

const lesson3 = {
  id: "lesson_3",
  title: "Lesson 3: Increased Tension, 1955–1963",
  learning_objective: "To understand the causes and consequences of the 1956 Suez Crisis and its impact on the Middle East.",
  narrative: [
    "The fragile status quo established by the 1949 armistice was permanently shattered by political upheavals inside Egypt. In July 1952, a group of nationalist army officers known as the \"Free Officers Movement\" overthrew Egypt's corrupt, pro-Western monarch, King Farouk. By 1954, the charismatic and fiercely anti-imperialist Colonel Gamal Abdel Nasser emerged as the undisputed President of Egypt.",
    "Nasser quickly positioned himself as the champion of Pan-Arabism—a powerful political ideology aimed at uniting Arab nations to throw off Western colonial influence, secure Arab dignity, and avenge the humiliating 1948 defeat by Israel.",
    "Nasser’s immediate political objectives were both local and geopolitical. Although Egypt was technically independent, 80,000 British troops still occupied the strategically vital Suez Canal Zone. Nasser immediately placed heavy diplomatic pressure on Britain, successfully forcing them to sign an agreement to withdraw their forces by June 1956.",
    "Nasser initiated sweeping domestic reforms to help the poor Egyptian peasants (fellahin), including the redistribution of agricultural land and the construction of thousands of state schools and clinics.",
    "The cornerstone of Nasser’s developmental vision was the construction of a massive hydroelectric dam on the River Nile at Aswan. This monumental engineering project was designed to control the annual flooding of the Nile, provide clean electricity for industrialization, and irrigate millions of acres of desert land to feed Egypt's growing population. To fund this expensive project, Egypt required massive financial loans from Western powers, primarily the United States and Great Britain.",
    "Tensions between Egypt and Israel escalated dramatically on 28 February 1955 during the Gaza Raid. In retaliation for the ambush and murder of an Israeli civilian, Prime Minister David Ben-Gurion ordered the IDF to launch a massive reprisal raid against an Egyptian military headquarters in the Gaza Strip. The attack was devastating: IDF paratroopers blew up the garrison, killing 38 Egyptian soldiers and leaving Nasser's army thoroughly humiliated.",
    "The Gaza Raid served as a turning point for Nasser, proving that his forces were too weakly equipped to deter Israeli military power. When the United States refused to sell him weapons without political strings attached, Nasser turned to the Soviet bloc. In September 1955, Nasser stunned the West by signing the Czech Arms Deal.",
    "Under this agreement, Czechoslovakia (acting as a front for the Soviet Union) supplied Egypt with a massive arsenal of modern military hardware, including 200 advanced MiG-15 jet fighters, 300 modern tanks, and heavy artillery. This deal brought the Cold War directly into the heart of the Middle East, deeply alarming both Israel and the Western powers.",
    "In response to Nasser's Soviet alignment and his continued support for Gaza-based Fedayeen raids (which killed 58 Israeli civilians in April 1956 alone), the United States and Great Britain took retaliatory economic action. In July 1956, they abruptly withdrew their joint offer to finance the Aswan High Dam.",
    "Nasser refused to let his pride project die. On 26 July 1956, he delivered a fiery speech in Alexandria and announced the nationalisation of the Suez Canal Company. He declared that Egypt would seize the canal from its British and French shareholders and use the £35 million annual toll revenues to directly fund the construction of the Aswan High Dam.",
    "The nationalisation of the Suez Canal outraged Great Britain and France. British Prime Minister Anthony Eden viewed Nasser as a dangerous dictator who threatened Europe’s vital oil supply line. Behind the scenes, Britain and France colluded with Israel to plan a military intervention to overthrow Nasser and retake the canal. This conspiracy was codified in the highly secret Protocol of Sèvres in October 1956.",
    "Under this secret tripartite plan, Israel would launch a pre-emptive strike across the Sinai Desert toward the Suez Canal. Once hostilities began, Britain and France would issue an ultimatum to both sides to stop fighting and pull back ten miles from the canal.",
    "Knowing Egypt would refuse to abandon its own territory, Britain and France would then launch an air and sea invasion to occupy the Suez Canal Zone under the guise of \"protecting\" international shipping.",
    "On 29 October 1956, the plan was put into action. The IDF launched a highly successful blitzkrieg across Sinai, routing the Egyptian army and advancing rapidly toward the canal. Britain and France immediately issued their pre-planned ultimatum and, as expected, launched heavy bombing raids and landed paratroopers at Port Said to seize control of the canal.",
    "The conspiracy backfired due to furious resistance from the global superpowers. Soviet leader Nikita Khrushchev threatened to launch nuclear missile strikes against London and Paris. More decisively, US President Dwight D. Eisenhower was outraged that his allies had launched a war without consulting him, fearing it would drive the entire Arab world into the arms of the USSR. Eisenhower applied massive economic pressure on Great Britain, threatening to refuse loans and block Britain's access to oil.",
    "Buckling under American financial pressure, Britain and France were forced into a humiliating retreat, withdrawing their forces by December 1956. Israel, under intense US pressure, was forced to return the entire Sinai Peninsula to Egypt in early 1957.",
    "While the Suez Crisis was a political humiliation for Britain and France, it fundamentally transformed the security situation in the Middle East. Nasser emerged from the crisis as an undisputed Arab folk hero. Although his army had been defeated on the battlefield, he had successfully stood up to British, French, and Israeli \"imperialism\" and kept control of the Suez Canal, cementing Egypt’s leadership of the Arab world.",
    "Israel scored massive military and strategic benefits. The IDF had proven its unquestioned military superiority, routing the Egyptian army in just a few days, which acted as a powerful deterrent against future Arab invasions.",
    "The Middle East became a central theater of the Cold War. British and French colonial influence in the region was permanently broken, replaced by direct US support for Israel and Soviet backing for Egypt and Syria.",
    "Crucially, Israel's forced withdrawal from the Sinai Peninsula was conditioned on three vital security guarantees. First, the United Nations deployed its first-ever peacekeeping force, the United Nations Emergency Force (UNEF), along the Gaza border and the Sinai Desert. This UNEF buffer successfully halted the Gaza Fedayeen raids, guaranteeing Israel ten years of relative border security.",
    "Second, the UNEF took control of Sharm el-Sheikh, forcing Egypt to lift its naval blockade. The Straits of Tiran were reopened to Israeli vessels, allowing Eilat to flourish as a vital trade port for oil, materials, and commerce with Asia and East Africa.",
    "Finally, the political momentum of Nasser's victory led directly to the formation of the United Arab Republic (UAR) in February 1958—a total political and military union between Egypt and Syria. While this union increased Israeli fears of encirclement, it also locked the region into an uneasy, highly armed decade-long stalemate that lasted until 1967."
  ],
  vocab: [
    { term: "Pan-Arabism", definition: "A political movement aimed at uniting all Arab nations to throw off Western colonial influence and secure Arab independence." },
    { term: "Czech Arms Deal", definition: "A 1955 agreement where the Soviet bloc supplied Egypt with massive amounts of advanced weaponry, shocking the West." },
    { term: "Nationalisation", definition: "The transfer of a major branch of industry or commerce from private to state ownership or control (e.g., the Suez Canal)." },
    { term: "Protocol of Sèvres", definition: "A secret agreement in 1956 between Britain, France, and Israel to militarily invade Egypt and retake the Suez Canal." },
    { term: "UNEF", definition: "The United Nations Emergency Force, deployed in 1956 to act as a buffer between Israel and Egypt in the Sinai Desert." }
  ],
  vocab_cloze_text: "Driven by the ideology of [Pan-Arabism], Gamal Abdel Nasser sought to modernize Egypt. Following the [Czech Arms Deal], the West refused to fund his dam project. In retaliation, Nasser announced the [Nationalisation] of the Suez Canal. This led to the secret [Protocol of Sèvres] where Israel, Britain, and France invaded Egypt. The conflict ended with the deployment of [UNEF] peacekeepers in the Sinai.",
  do_now: {
    items: [
      { question: "What is the historical name given to the 1949 armistice line that established Israel's borders after its victory in the first Arab-Israeli War?", answer: "The \"Green Line\"." },
      { question: "Which neighbouring Arab country occupied and annexed the West Bank and East Jerusalem following the 1948–49 war?", answer: "Transjordan (which renamed itself Jordan in 1949)." },
      { question: "What Arabic term, meaning \"The Catastrophe,\" do Palestinians use to describe the 1948–49 war and its immediate consequences?", answer: "al-Nakba." },
      { question: "Approximately how many Palestinian Arabs became refugees as a result of the 1948–49 war, and what agency was set up by the UN in December 1949 to support them?", answer: "Over 700,000 Palestinian Arabs became refugees. The UN set up the United Nations Relief and Works Agency (UNRWA) to manage the camps." },
      { question: "Give one reason why Israel strictly denied Palestinian refugees the \"right of return,\" and one reason why Arab host states (except Jordan) refused to permanently integrate these refugees.", answer: "Israel denied it to preserve a Jewish demographic majority. Arab host states kept refugees in camps to maintain moral pressure on Israel." },
      { question: "Explain the twofold significance of the Law of Return, passed by the Israeli Knesset in July 1950.", answer: "1. Granted every Jew automatic citizenship, doubling the population. 2. Provided massive labor and military conscripts to defend vulnerable borders." },
      { question: "What was the value of the vital economic grant given to Israel by the US government in 1949, and what was the further amount provided by 1960?", answer: "A $100 million grant in 1949 and a further $200 million by 1960." },
      { question: "Describe the two primary ways Egypt chose to economically choke the State of Israel in the years immediately following the 1949 armistice.", answer: "1. Closed the Suez Canal to Israeli vessels. 2. Blockaded the Straits of Tiran to choke trade through Eilat." },
      { question: "What were the Fedayeen, and how did Israel's official reprisal policy under David Ben-Gurion attempt to deal with them?", answer: "Fedayeen were Palestinian guerrillas operating from Gaza. Ben-Gurion responded with disproportionate IDF reprisal attacks against Egyptian outposts." },
      { question: "Write an analytical sentence linking the 1948-49 Arab-Israeli War to the creation of the Israeli Defence Forces (IDF).", answer: "Because Israel had suffered 6,000 casualties during its war of survival, David Ben-Gurion unified all independent paramilitaries into the IDF in May 1948 to guarantee a professional defense force." }
    ]
  },
  tasks: [
    {
      text: "Explain one consequence of the nationalisation of the Suez Canal in 1956. (4 marks)",
      model: "One consequence of the nationalisation of the Suez Canal in 1956 was the secret military collusion between Great Britain, France, and Israel, which led directly to the Suez Crisis. Following Nasser’s seizure of the canal to fund his Aswan High Dam project, Britain and France, who were the primary shareholders, feared their vital oil supply lines were threatened by a hostile Egyptian nationalist leader.\n\nAs a result, they signed the secret Protocol of Sèvres with Israel, planning a tripartite military invasion where Israel would attack Sinai, providing a pretext for Anglo-French troops to land at Port Said to \"protect\" the canal. This consequence escalated border tensions into a major regional war on 29 October 1956, bringing the Cold War superpowers directly into the Middle Eastern conflict."
    }
  ],
  teacher_notes: {
    primer: "This lesson shifts the focus from internal Palestinian-Israeli conflict to the wider Cold War context. The narrative traces how Nasser's Pan-Arabism and domestic ambitions (Aswan High Dam) clashed with Western interests, leading to the Suez Crisis. The key pedagogical focus is the cause-and-consequence chain: Gaza Raid -> Czech Arms Deal -> Dam Funding Pulled -> Canal Nationalised -> Protocol of Sèvres.",
    objectives: [
      {
        objective: "Explain how the Czech Arms Deal and the Aswan High Dam led to the nationalisation of the Suez Canal.",
        primer: "Draw the cause-and-effect chain on the board. Emphasize that Nasser needed money for the dam, but lost Western funding because he bought weapons from the Soviets.",
        question: "Why did the US and UK cancel their loan for the Aswan High Dam?"
      },
      {
        objective: "Describe the secret tripartite plan detailed in the Protocol of Sèvres.",
        primer: "Use a map to show the intended pincer movement: Israel attacks across Sinai first, giving Britain and France an excuse to drop paratroopers on the canal to 'separate' the fighting.",
        question: "What was the 'excuse' Britain and France used to invade the Canal Zone?"
      },
      {
        objective: "Analyze the consequences of the Suez Crisis for Israel and Egypt.",
        primer: "Contrast the military reality (Israel won and routed Egypt) with the political reality (Nasser survived, stood up to imperialists, and became a hero). Highlight the UNEF deployment as the key to a decade of peace.",
        question: "How did the deployment of UNEF benefit Israel's security?"
      }
    ]
  }
};

// Check if lesson_3 already exists to replace it, otherwise push it.
const existingIndex = data.lessons.findIndex(l => l.id === 'lesson_3');
if (existingIndex !== -1) {
  data.lessons[existingIndex] = lesson3;
} else {
  data.lessons.push(lesson3);
}

// Ensure flashcards array is populated for the consolidation phase
data.lessons.forEach(l => {
  if (l.vocab && !l.flashcards) l.flashcards = [...l.vocab];
});

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(filePath, output, 'utf8');
console.log("Successfully injected Lesson 3 into cme_new/data.js");
