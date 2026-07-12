import fs from 'fs';

const oldDataPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(oldDataPath, 'utf8');

// We will extract the JSON part
const jsonStart = content.indexOf('{');
const jsonStr = content.substring(jsonStart, content.lastIndexOf('}') + 1);

let data;
try {
  data = JSON.parse(jsonStr);
} catch (e) {
  console.error("Parse error:", e);
  process.exit(1);
}

// 1. Fix Lesson 1 do_now
data.lessons[0].do_now = {
  items: [
    {
      "question": "What did the British government promise in the 1917 Balfour Declaration?",
      "answer": "They supported the creation of a 'national home' for the Jewish people in Palestine."
    },
    {
      "question": "How many Jewish people were systematically murdered during the Holocaust (1939-1945)?",
      "answer": "6 million."
    },
    {
      "question": "At the end of WWII in 1945, what happened to hundreds of thousands of Jewish survivors?",
      "answer": "They were stuck in European Displaced Persons (DP) camps, seeking a new home."
    }
  ]
};

// 2. Add Lesson 2
const lesson2 = {
  id: "lesson_2",
  title: "Lesson 2: The Aftermath of the 1948–49 War",
  learning_objective: "To understand the consequences of the 1948-49 war for Palestinians, Israelis, and regional borders.",
  narrative: [
    "The signing of separate Armistice Agreements between Israel and its Arab neighbors (Egypt in February, Lebanon in March, Transjordan in April, and Syria in July 1949) formally ended the military hostilities of the first Arab-Israeli War but left a highly volatile political landscape. The armistice lines, drawn in green ink on the negotiators' maps and thereafter referred to as the 'Green Line,' fundamentally redrew the geography of the Middle East.",
    "Rather than the 55% of mandate Palestine allocated under the 1947 UN Partition Plan, Israel's military victory secured control over 75% to 79% of the territory, including the fertile coastal plains, the Galilee, the Negev Desert, and a secure corridor to West Jerusalem.",
    "The remaining portions of mandate Palestine were occupied by neighboring Arab states, entirely preventing the creation of an independent Palestinian Arab state. The West Bank and East Jerusalem were occupied and subsequently annexed by King Abdullah of Transjordan, a unilateral move designed to expand his Hashemite kingdom that was widely condemned as illegal by the rest of the Arab world. Meanwhile, the Gaza Strip—a narrow coastal territory crowded with displaced refugees—was placed under the military and administrative control of Egypt.",
    "Jerusalem itself was left deeply divided, with barbed wire, concrete walls, and military checkpoints separating Israeli-controlled West Jerusalem from Jordanian-controlled East Jerusalem.",
    "For Palestinian Arabs, the immediate aftermath of the war was a tragedy of historic proportions, remembered as the Nakba ('The Catastrophe'). Approximately 700,000 Palestinian Arabs—representing over half of the Arab population of mandate Palestine—were permanently displaced from their ancestral homes. These refugees fled or were forcibly expelled by advancing Jewish forces during the fighting, seeking safety in the neighboring territories of Jordan, Syria, Lebanon, the West Bank, and the Gaza Strip.",
    "To cope with this vast humanitarian emergency, the United Nations General Assembly established the United Nations Relief and Works Agency (UNRWA) in December 1949. UNRWA constructed and managed dozens of temporary refugee camps, providing basic food rations, emergency tents, rudimentary healthcare, and elementary schooling.",
    "Despite the end of the war, a permanent resolution to the crisis was blocked by deep political divisions. Israel strictly denied the Palestinians their 'right of return' to their former homes. The Israeli government argued that allowing hundreds of thousands of hostile Arab refugees to return would destroy the Jewish majority, compromise national security, and undermine the sovereign Jewish character of the state.",
    "Conversely, the Arab host states (with the exception of Jordan) refused to grant the refugees citizenship or integrate them into their national societies. They insisted that the camps must remain intact to prevent the international community from forgetting the Palestinian issue and to keep permanent diplomatic and moral pressure on Israel to honor the right of return. As a result, generations of Palestinians were left stranded in squalid, overcrowded camps, suffering from poor sanitation, deep economic poverty, and a permanent lack of civil rights.",
    "Faced with permanent hostility from its neighbors, the fledgling State of Israel focused intensely on consolidating its security and building up its population. On 26 May 1948, Prime Minister David Ben-Gurion issued a decree officially establishing the Israeli Defence Forces (IDF). This measure was highly significant because it systematically dismantled and banned the independent paramilitary groups (the Haganah, the Irgun, and the Lehi) that had operated during the British Mandate and the civil war, unifying them under a single, highly professional state command.",
    "The creation of the IDF gave Israel a powerful national army capable of defending its highly vulnerable borders against future Arab invasions. To bolster national security, Israel implemented a system of compulsory military conscription for its citizens, transforming the state into a highly mobilized 'nation in arms'.",
    "To solve its demographic vulnerability, the Israeli Knesset passed the Law of Return in July 1950. This landmark legislation declared that any Jew anywhere in the world had the legal right to immigrate to Israel and secure immediate, automatic citizenship. This policy triggered an immense demographic boom, doubling Israel’s population within just a few years.",
    "The influx included hundreds of thousands of Holocaust survivors from Europe and Jewish refugees expelled from Arab nations across the Middle East who had lost their properties and livelihoods. Although the massive wave of immigration strained Israel's fragile housing and food supplies, it was highly important because it provided a massive, determined workforce to develop the economy and supplied the IDF with a constant stream of military manpower to protect the state.",
    "In its early years, Israel faced severe economic crises that threatened to collapse the state from within. The young country had to fund a massive military defense budget, build housing for hundreds of thousands of destitute immigrants arriving under the Law of Return, and survive a total economic boycott implemented by the Arab League, which banned all trade with Israel and penalised foreign companies that did business with the Jewish state.",
    "In this precarious position, direct financial and political aid from the United States was absolutely critical to Israel's survival. President Harry Truman, driven by strong domestic sympathy for Holocaust survivors and intense political lobbying, quickly recognized Israel and authorized massive emergency loans and grants.",
    "These funds allowed the Israeli government to buy food, build infrastructure, establish agricultural settlements, and import vital materials to industrialize the country. This early financial pipeline established a powerful strategic relationship between the United States and Israel, which deepened as Cold War rivalries intensified in the Middle East.",
    "The 1949 armistice did not lead to a lasting peace, and relations between Israel and its most powerful neighbor, Egypt, remained intensely hostile. Egypt refused to recognize Israel’s right to exist and took active measures to strangle the new state economically and militarily.",
    "Egypt closed the internationally vital Suez Canal to all Israeli ships and systematically searched neutral vessels, confiscating any cargo purchased at Israeli ports or bound for Israel’s armed forces. Furthermore, from 1951, Egyptian forces established a permanent military blockade at the Straits of Tiran (Sharm el-Sheikh), stopping all foreign cargo vessels heading toward Israel's southern port of Eilat, completely choking Israeli trade with Asia and East Africa.",
    "Egypt also utilized the Gaza Strip—which it controlled—as a launchpad for Fedayeen (Palestinian guerrilla) raids. These displaced refugees launched cross-border attacks into Israel to sabotage infrastructure, steal livestock, and kill Jewish civilians.",
    "To counter this threat, David Ben-Gurion implemented a severe reprisal policy, ordering the IDF to respond to every border raid with disproportionate military force against Egyptian military posts to deter future attacks. This created a violent, escalating border war that kept the region on the brink of conflict.",
    "This border tension escalated dramatically in July 1952, when the corrupt and pro-Western King Farouk of Egypt was overthrown in a military coup by the Free Officers Movement. This coup eventually brought the charismatic and fiercely anti-Western Colonel Gamal Abdel Nasser to power in Egypt. Nasser’s championing of Pan-Arabism and his determination to avenge the Arab defeat of 1948 made him the undisputed leader of the Arab world, setting Egypt and Israel on a direct collision course that would culminate in the 1956 Suez Crisis."
  ],
  vocab: [
    { term: "Green Line", definition: "The 1949 armistice borders drawn in green ink, giving Israel 79% of mandate Palestine." },
    { term: "UNRWA", definition: "United Nations agency created in 1949 to provide relief for Palestinian refugees." },
    { term: "Law of Return", definition: "1950 Israeli law granting any Jew the right to immigrate to Israel and receive automatic citizenship." },
    { term: "Fedayeen", definition: "Palestinian guerrilla fighters who launched cross-border raids into Israel from the Gaza Strip." }
  ],
  do_now: {
    items: [
      { question: "In what month and year did the British Mandate officially end and the State of Israel get declared?", answer: "May 1948 (specifically 14 May 1948)." },
      { question: "Which extreme Jewish paramilitary group carried out the bombing of the King David Hotel in July 1946?", answer: "The Irgun (led by Menachem Begin)." },
      { question: "What was the name of the British Foreign Secretary who ultimately decided to hand the Palestine Mandate over to the United Nations in 1947?", answer: "Ernest Bevin." },
      { question: "Under UN Resolution 181 (the 1947 Partition Plan), what percentage of Palestine was allocated to the proposed Jewish state, and what was to be the status of Jerusalem?", answer: "The Jewish state was allocated 55% of the land, while Jerusalem was designated as an international zone (corpus separatum) under direct UN administration." },
      { question: "Give two reasons why the Arab League and Palestinian leaders rejected UN Resolution 181.", answer: "1. They argued the UN had no legal authority to partition a land against the democratic wishes of its majority Arab population. 2. The plan was grossly unfair, allocating 55% of Palestine to the Jewish minority, who made up only one-third of the population." },
      { question: "What was 'Plan Dalet' (Plan D), implemented by the Haganah in March 1948, and why is it a subject of intense historical debate?", answer: "Plan D was a military strategy to secure the borders of the future Jewish state. It is debated because Israeli historians view it as a defensive strategy, whereas Palestinian historians argue it was an offensive blueprint for ethnic cleansing." },
      { question: "Name the five sovereign Arab states that launched a coordinated invasion of Israel on 15 May 1948.", answer: "Egypt, Syria, Jordan (Transjordan), Lebanon, and Iraq." },
      { question: "Explain how the first UN-brokered truce (starting 11 June 1948) changed the military balance of the 1948 War in Israel's favor.", answer: "Israel used the 30-day truce to unify its forces under the IDF and import massive quantities of modern weaponry from Czechoslovakia, neutralizing the Arabs' initial material superiority." },
      { question: "Explain the significance of the Deir Yassin massacre (April 1948) for the subsequent Palestinian flight.", answer: "The massacre of over 100 Arab villagers was sensationalized by Arab radio, which backfired and triggered widespread panic among Arab civilians, causing hundreds of thousands to flee." },
      { question: "In a narrative account of the end of the British Mandate, how would you link the bombing of the King David Hotel to UN Resolution 181?", answer: "The bombing (1946) demonstrated to the British public that policing the Mandate was too costly, leading directly to Britain referring the problem to the UN in 1947, which proposed partition under Resolution 181." }
    ]
  },
  gcse_task: {
    topic: "Explain one consequence of the territorial changes following the 1948–49 Arab-Israeli war. (4 marks)",
    model: "One consequence of the territorial changes following the 1948–49 Arab-Israeli War was the permanent displacement of the Palestinian Arab population and the creation of a massive refugee crisis. Prior to the war, the UN Partition Plan had allocated 45% of the land to a proposed Arab state; however, Israel's military victory expanded its borders to cover 79% of mandate Palestine, while Jordan occupied and annexed the West Bank and Egypt took control of the Gaza Strip.\n\nAs a direct result of these territorial changes, over 700,000 Palestinian Arabs lost their homes and became stateless refugees. They were forced to resettle in squalid, overcrowded refugee camps managed by UNRWA in the Gaza Strip, West Bank, Jordan, and Lebanon, where they were denied the \"right of return\" by Israel, cementing a permanent humanitarian crisis that remains unresolved."
  },
  teacher_notes: {
    primer: "This lesson covers the immediate fallout of the 1948-49 war, focusing on the redrawing of borders (the Green Line) and the birth of the Palestinian refugee crisis (the Nakba). It also introduces the consolidation of the Israeli state via the IDF and Law of Return, and sets the stage for the Suez Crisis by detailing Egyptian hostilities (blockades and Fedayeen raids).",
    objectives: [
      {
        objective: "Describe the territorial changes established by the 1949 Green Line armistice.",
        primer: "Use the map to show how Israel expanded from 55% to 79%, and explain the fates of the West Bank (Jordan) and Gaza Strip (Egypt).",
        question: "Why was an independent Palestinian state not created after the 1948-49 war?"
      },
      {
        objective: "Explain the causes and consequences of the Palestinian refugee crisis (Nakba).",
        primer: "Focus on the scale of displacement (700,000) and contrast the Israeli policy (denial of return to maintain Jewish majority) with the Arab states' policy (refusal to integrate refugees).",
        question: "Why did neighboring Arab states (except Jordan) refuse to grant citizenship to Palestinian refugees?"
      },
      {
        objective: "Analyze how Israel consolidated its new state and countered Egyptian hostility.",
        primer: "Explain the importance of the IDF and the Law of Return for Israel's survival, and outline the cycle of Egyptian Fedayeen raids and Israeli reprisal attacks.",
        question: "How did the Law of Return help solve Israel's security vulnerability?"
      }
    ]
  }
};

data.lessons.push(lesson2);

const output = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(oldDataPath, output, 'utf8');
console.log("Successfully patched data.js");
