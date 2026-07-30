import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'eee', 'data.js');

let content = fs.readFileSync(dataFilePath, 'utf8');

let jsonStr = content.replace('export const unitData = ', '').trim();
if (jsonStr.endsWith(';')) {
    jsonStr = jsonStr.slice(0, -1);
}

let unitData;
try {
    unitData = eval('(' + jsonStr + ')');
} catch (e) {
    console.error("Error evaluating data.js", e);
    process.exit(1);
}

const newLesson = {
    id: "lesson_2_4",
    title: "KT2.4: The Armada",
    enquiry: "Why did King Philip II launch the 'Invincible' Spanish Armada in 1588, and how did its catastrophic failure shape Elizabeth's legacy and the future of Europe?",
    teacher_notes: {
        primer: "This lesson covers the culmination of Anglo-Spanish tensions: the Armada. The focus is on evaluating the overlapping motivations for the invasion, the logistical flaws in the Spanish plan, and the combination of English tactics and weather that caused its defeat.",
        objectives: [
            {
                objective: "Understand the complex, overlapping reasons why Philip II finally decided to launch the Spanish Armada in 1588.",
                primer: "Discuss the religious (crusade), political (Treaty of Joinville), and commercial (privateering) motivations.",
                question: "Which Pope gave his blessing to the Armada, turning it into a Catholic crusade?"
            },
            {
                objective: "Analyse the Spanish invasion plans, highlighting the critical logistical flaws from the very beginning.",
                primer: "Focus on the lack of a deep-water port for Parma and the communication delays.",
                question: "At which port did the Armada mistakenly drop anchor to wait for the land army?"
            },
            {
                objective: "Evaluate the intersecting reasons for the English victory, weighing English tactics against Spanish mistakes and the weather.",
                primer: "Explain the fireships, the superior English cannon reload speeds at Gravelines, and the Protestant Wind.",
                question: "What devastating tactic did the English use at midnight to break the Spanish formation?"
            },
            {
                objective: "Explain the immense domestic and international consequences of the Armada's defeat.",
                primer: "Cover the propaganda victory, the Armada Portrait, and the breaking of the myth of Spanish invincibility.",
                question: "What famous piece of propaganda was painted to celebrate the victory?"
            }
        ]
    },
    learning_objectives: {
        target: [
            "Understand the complex, overlapping reasons why Philip II finally decided to launch the Spanish Armada in 1588.",
            "Analyse the Spanish invasion plans, highlighting the critical logistical flaws from the very beginning.",
            "Evaluate the intersecting reasons for the English victory, weighing English tactics against Spanish mistakes and the weather.",
            "Explain the immense domestic and international consequences of the Armada's defeat."
        ],
        scaffolded: [
            "List the reasons why Philip II launched the Armada.",
            "Describe the Spanish plan and why it went wrong.",
            "Explain how the English defeated the Armada.",
            "Describe what happened after the Armada was defeated."
        ]
    },
    narrative: [
        {
            heading: "Why did Philip II launch the Armada?",
            content: "By 1588, the 'Cold War' between England and Spain had reached a boiling point. The personal animosity began decades earlier when Elizabeth rejected Philip II's proposal of marriage. Ultimately, his decision to launch the Armada was driven by three overlapping factors:\n\n1. **Religious Motivation:** Philip II was a fanatical Catholic who believed it was his holy duty to destroy Protestantism. Pope Sixtus V actively encouraged him, turning the invasion into a crusade by promising to forgive the sins of the sailors and offering a massive financial reward of one million gold ducats if they successfully landed.\n\n2. **Political Motivation:** The 1584 Treaty of Joinville united France and Spain, leaving England isolated. Elizabeth's retaliation—signing the 1585 Treaty of Nonsuch to send English troops to the Netherlands—acted as the definitive *catalyst for* war. Furthermore, the execution of the Catholic Mary, Queen of Scots in 1587 meant Philip could no longer rely on assassination plots; he had to conquer England directly to place a Catholic on the throne.\n\n3. **Provocation and Commerce:** Francis Drake’s relentless privateering in places like Peru and Mexico had cost Spain hundreds of thousands of pounds in stolen silver. Elizabeth publicly knighting Drake, followed by his humiliating raid on Cadiz in 1587, convinced Philip that English piracy had to be stamped out by force."
        },
        {
            heading: "The Flawed Masterplan",
            content: "Philip’s plan was ambitious but *intrinsically linked* to logistical impossibilities. The Armada, consisting of 130 ships and 30,000 men, was commanded by the Duke of Medina Sidonia, a wealthy nobleman with severe seasickness and zero naval experience. The plan dictated that the Armada would sail in an unbreakable crescent formation up the English Channel. They were to anchor off the coast of the Netherlands at Calais. Here, they would meet the Duke of Parma, who commanded 27,000 battle-hardened Spanish soldiers. The Armada would protect Parma’s flat-bottomed barges as they ferried the army across the Channel to land in Kent and march on London.\n\nThe fatal flaw was communication and deep-water access. Parma did not have a deep-water port, meaning the massive Armada ships could not dock to pick his men up. This logistical nightmare was *exacerbated* by nimble Dutch flyboats blockading Parma's troops in the shallow waters, and the fact that communication by sea took over a week."
        },
        {
            heading: "The Defeat of the Armada",
            content: "When the Armada was spotted off the coast of Cornwall on 29 July, warning beacons were lit across England. As the Spanish sailed up the Channel, the English fleet engaged them in skirmishes at Plymouth and the Isle of Wight (3-4 August).\n\nThe decisive moment occurred when the Armada anchored at Calais, waiting for Parma (who was delayed). At midnight on 7 August 1588, the English sent eight burning fireships drifting into the tightly packed Spanish fleet. Panic erupted. Spanish captains cut their anchors and scattered, entirely destroying their defensive formation.\n\nThe next day, at the Battle of Gravelines, the English capitalised on the chaos. English cannons were mounted on smaller gun carriages, giving them enough space to recoil and be reloaded rapidly. Conversely, Spanish cannons were designed to fire a single volley before soldiers grappled and boarded enemy ships. The English refused to board, instead staying out of range and firing relentless broadsides, leaving the Spanish utterly defenceless."
        },
        {
            heading: "The Protestant Wind and the Consequences",
            content: "Following Gravelines, the wind changed, forcing the battered Armada to flee northwards around the treacherous, uncharted coasts of Scotland and Ireland. Fierce storms smashed over 50 Spanish ships against the rocks, killing roughly 20,000 men. The English celebrated these storms as the \"Protestant Wind\", claiming God had intervened to protect them.\n\nWhile the fleet was away, Elizabeth visited her troops at Tilbury, delivering a legendary speech: *\"I know I have the body but of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too.\"*\n\nThe consequences of the victory were monumental. Domestically, it was a massive propaganda triumph. Commemorative medals were struck reading *\"God blew, and they were scattered\"*, and Elizabeth's legacy was immortalised in the famous Armada Portrait. Internationally, while the war dragged on for another 15 years and Philip II built further armadas, the 1588 victory permanently broke the myth of Spanish invincibility, boosted English naval confidence, and secured England's survival as an independent, Protestant nation."
        },
        {
            heading: "The Big Picture",
            content: "The Spanish Armada of 1588 was the ultimate test of Elizabeth’s reign. Philip II’s motivations were a potent mix of holy crusade, political retaliation for the Netherlands, and fury over privateering. However, his grand strategy required a level of logistical perfection that simply did not exist in the 16th century. The failure of Medina Sidonia and Parma to coordinate at Calais allowed English tactical brilliance (fireships and rapidly reloading long-range broadsides) to break the Spanish lines. Ultimately, however, it was the catastrophic weather—the \"Protestant Wind\"—that annihilated the fleet. The victory did not end the Anglo-Spanish war, but it delivered an unprecedented propaganda victory that cemented Elizabeth’s authority and England's Protestant identity forever."
        }
    ],
    exam_questions: [
        {
            type: "12_marks",
            question: "Explain the consequences of the English victory over the Spanish Armada in 1588.",
            examiner_tip: "When a question asks for *consequences*, do not waste time explaining *why* the Armada was defeated (e.g., fireships, weather). Instead, focus entirely on the aftermath. Paragraph 1 could focus on the **religious consequences** (it gave Protestants immense confidence, striking medals that claimed God's favour). Paragraph 2 could focus on **political/propaganda consequences** (the Tilbury speech, the Armada portrait, cementing Elizabeth's legendary status). Paragraph 3 could focus on the **geopolitical consequences** (it broke the myth of Spanish invincibility, boosted English maritime confidence for trade, and though the war continued, England survived as an independent power). Ensure every paragraph ends with a strong link back to the question using phrases like *\"This exacerbated the situation by...\"* or *\"This was intrinsically linked to...\"*."
        }
    ],
    recall_questions: [
        { q: "Who had Elizabeth rejected a marriage proposal from in 1559?", a: "King Philip II of Spain" },
        { q: "Which Pope gave his blessing to the Armada, turning it into a Catholic crusade?", a: "Pope Sixtus V" },
        { q: "How much money did the Pope promise Philip if the Armada was successful?", a: "One million gold ducats" },
        { q: "What 1584 treaty between France and Spain isolated England and pushed Philip closer to war?", a: "The Treaty of Joinville" },
        { q: "The execution of which monarch in 1587 gave Philip II his final political motivation to invade?", a: "Mary, Queen of Scots" },
        { q: "What was the name of the inexperienced commander chosen by Philip to lead the Armada?", a: "The Duke of Medina Sidonia" },
        { q: "How many ships made up the Spanish Armada?", a: "130" },
        { q: "What highly effective, defensive shape did the Spanish fleet sail in?", a: "A crescent formation" },
        { q: "Who commanded the Spanish land army waiting in the Netherlands?", a: "The Duke of Parma" },
        { q: "What type of small rebel ships blockaded the Spanish army in the shallow coastal waters?", a: "Dutch flyboats" },
        { q: "At which port did the Armada mistakenly drop anchor to wait for the land army?", a: "Calais" },
        { q: "What devastating tactic did the English use at midnight to break the Spanish formation?", a: "Fireships" },
        { q: "How many fireships did the English send into the Spanish fleet?", a: "Eight" },
        { q: "What was the name of the major naval battle that took place the day after the fireships were used?", a: "The Battle of Gravelines" },
        { q: "Why were English cannons able to fire more quickly than the Spanish during this battle?", a: "They were mounted on smaller gun carriages, allowing them space to recoil and reload" },
        { q: "Which way was the Armada forced to sail to escape the English fleet?", a: "Northwards, around Scotland and Ireland" },
        { q: "What nickname did the English give to the storms that destroyed the fleeing Spanish ships?", a: "The \"Protestant Wind\"" },
        { q: "Where did Elizabeth deliver her famous speech to her troops (\"I have the heart and stomach of a king\")?", a: "Tilbury" },
        { q: "What famous piece of propaganda was painted to celebrate the victory?", a: "The Armada Portrait" },
        { q: "Did the defeat of the Armada in 1588 mean the end of the war with Spain?", a: "No, the war continued for another 15 years and Philip built more armadas" }
    ],
    do_now: {
        type: "questions",
        tasks: [
            { q: "In what year did Elizabeth sign the Treaty of Nonsuch?", a: "1585" },
            { q: "What is a 'galleon'?", a: "A large sailing ship used especially by the Spanish for war and commerce" },
            { q: "How did Francis Drake’s 1587 raid on Cadiz specifically impact Spanish food and water supplies?", a: "He destroyed thousands of seasoned wooden barrel staves, causing the food to rot in new wood" },
            { q: "15 Second Challenge", a: "Try to speak for 15 seconds non-stop about the execution of Mary, Queen of Scots." }
        ]
    }
};

const existingIndex = unitData.lessons.findIndex(l => l.id === "lesson_2_4");
if (existingIndex !== -1) {
    unitData.lessons[existingIndex] = newLesson;
} else {
    unitData.lessons.push(newLesson);
}

unitData.lessons.sort((a, b) => a.id.localeCompare(b.id));

const newIndividuals = [
    {
        "id": "pope_sixtus_v",
        "name": "Pope Sixtus V",
        "role": "Head of the Catholic Church",
        "bio": "The Pope who turned the 1588 Spanish Armada into a holy crusade by blessing the invasion and promising Philip II a million gold ducats upon a successful landing.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "duke_of_medina_sidonia",
        "name": "Duke of Medina Sidonia",
        "role": "Commander of the Armada",
        "bio": "A wealthy Spanish nobleman reluctantly chosen by Philip II to lead the 1588 Armada. Despite his bravery, he lacked naval experience and suffered from severe seasickness.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "duke_of_parma",
        "name": "Alexander Farnese",
        "role": "Duke of Parma",
        "bio": "The brilliant Spanish military commander leading 27,000 battle-hardened troops in the Netherlands, who were supposed to join the Armada at Calais for the invasion of England.",
        "image": "/assets/placeholder_cover.jpg"
    }
];

newIndividuals.forEach(ind => {
    if (!unitData.key_individuals.find(k => k.id === ind.id)) {
        unitData.key_individuals.push(ind);
    }
});

fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
console.log("Successfully injected lesson_2_4 to eee/data.js and added missing individuals.");
