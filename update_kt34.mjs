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
    id: "lesson_3_4",
    title: "KT3.4: Raleigh and Virginia",
    enquiry: "Why did Walter Raleigh’s ambitious dream of establishing an English empire in Virginia end in the mysterious disaster of the 'Lost Colony'?",
    teacher_notes: {
        primer: "This final lesson of the Elizabethan unit examines Raleigh's Virginia colonies. It highlights the intersection of economic motives, disastrous planning (like the grounding of The Tiger), aggressive leadership, and the catastrophic impact of the Spanish Armada on supply lines, culminating in the mystery of the Lost Colony.",
        objectives: [
            {
                objective: "Understand the significance of Sir Walter Raleigh in planning, promoting, and financing the Virginia colonies.",
                primer: "Discuss how Raleigh secured the Royal Charter, raised funds, and used Manteo and Wanchese, even though he never went himself.",
                question: "In what year did Queen Elizabeth grant Walter Raleigh a Royal Charter?"
            },
            {
                objective: "Analyse the economic, political, and strategic reasons for the attempted colonisation of North America.",
                primer: "Cover the collapse of the Antwerp market, the desire to break Spain's monopoly, and the need for a privateering base.",
                question: "Strategically, what did the English hope to use a colony in Virginia for?"
            },
            {
                objective: "Evaluate the intersecting reasons for the catastrophic failure of the 1585 and 1587 expeditions, weighing poor planning against Native American resistance and the Spanish Armada.",
                primer: "Explain how the grounding of the Tiger, Ralph Lane's aggression, and the Armada trapping John White in England all combined to destroy the colony.",
                question: "Why was John White unable to return to Virginia with supplies in 1588?"
            }
        ]
    },
    learning_objectives: {
        target: [
            "Understand the significance of Sir Walter Raleigh in planning, promoting, and financing the Virginia colonies.",
            "Analyse the economic, political, and strategic reasons for the attempted colonisation of North America.",
            "Evaluate the intersecting reasons for the catastrophic failure of the 1585 and 1587 expeditions, weighing poor planning against Native American resistance and the Spanish Armada."
        ],
        scaffolded: [
            "Explain what Walter Raleigh did to organise the Virginia expeditions.",
            "List the reasons why England wanted a colony in America.",
            "Describe the problems faced by the 1585 and 1587 colonies."
        ]
    },
    vocab: [
        { term: "Royal Charter", definition: "A formal document from the monarch granting a person legal power and rights. Elizabeth gave Raleigh a charter in 1584 to colonise any land not already ruled by a Christian monarch." },
        { term: "Virginia", definition: "The name given to the newly claimed territory in North America, named in honour of Elizabeth, the 'Virgin Queen'." },
        { term: "Roanoke", definition: "The specific island off the coast of North America (in modern-day North Carolina) where the colonies were established." },
        { term: "Algonquian", definition: "The local Native American tribes who initially traded with the English but were later driven to war by English aggression." }
    ],
    narrative: [
        {
            heading: "The Significance of Walter Raleigh",
            content: "Sir Walter Raleigh was one of Elizabeth’s most favoured courtiers. In 1584, Elizabeth granted him a **Royal Charter** to explore and colonise North America. Crucially, Elizabeth refused to let Raleigh lead the expeditions himself; he was too valuable to her at court. Instead, Raleigh’s significance lies in his brilliant planning. He raised the massive funds required by persuading merchants to invest, designed the strategy, and brought two Native Americans, **Manteo and Wanchese**, back to England in 1584 to help the English learn the Algonquian language.\n\nThe colonisation attempt was driven by multiple motives. Economically, England desperately needed a new market for its cloth exports following the collapse of the Antwerp market. Furthermore, establishing a foothold in the Americas was *intrinsically linked* to breaking Spain's lucrative commercial monopoly in the New World. Strategically, a colony in North America would provide a vital, hidden base for English privateers to launch raids against the Spanish treasure fleets."
        },
        {
            heading: "The First Attempt: The 1585 Expedition",
            content: "In 1585, Raleigh sent 107 men to Roanoke, led by the naval commander Richard Grenville and the military governor **Ralph Lane**. It included the brilliant mathematician **Thomas Harriot**, who mapped the area.\n\nHowever, the expedition was doomed from the start. As they arrived, their flagship, *The Tiger*, hit a sandbank and let in seawater. This ruined almost all their food supplies and the seeds they had brought to plant crops. The demographics of the settlers *exacerbated* this disaster: they were mostly soldiers and wealthy gentlemen who lacked the practical farming skills needed to survive.\n\nDesperate, the English relied heavily on the local Algonquian tribes for food, depleting the locals' fish weirs and crucial winter stores. Governor Ralph Lane was highly aggressive, treating the Native Americans with suspicion and violence. Furthermore, the English unwittingly brought European diseases to which the locals had no immunity, wiping out whole villages. This acted as a *catalyst for* war. The local leader, **Chief Wingina**, planned to attack the English, but Lane ambushed and killed Wingina first. By 1586, the colony was starving, terrified, and entirely untenable. When Francis Drake sailed past after raiding the Caribbean, the surviving colonists abandoned Roanoke and hitched a ride home with him."
        },
        {
            heading: "The Second Attempt: The 1587 'Lost Colony'",
            content: "Raleigh learned from his mistakes. In 1587, he sent a second expedition led by **John White**. This time, the 117 settlers were mostly families—men, women, and children with practical farming skills—intended to create a peaceful, sustainable community.\n\nTragically, they arrived at the exact same location (Roanoke) where Lane’s men had previously slaughtered Wingina. Unsurprisingly, the Native Americans were deeply hostile from the moment they landed. After a colonist was found murdered, John White was forced to sail back to England to beg Raleigh for immediate military and food supplies.\n\nWhite's ability to return was destroyed by the unfolding geopolitical crisis in Europe. In 1588, Elizabeth banned all ships from leaving English ports because every vessel was needed to fight the imminent threat of the Spanish Armada. White was stranded in England for three years. When he finally returned to Roanoke in 1590, the settlement was completely deserted. There were no bodies, just the word **\"CROATOAN\"** carved into a wooden post. The fate of the colonists remains a mystery to this day."
        },
        {
            heading: "The Big Picture",
            content: "Raleigh’s ambitious dream of a New World empire ended in complete failure. The colonies collapsed due to a lethal intersection of terrible luck (the grounding of *The Tiger*), poor leadership (Lane's aggression), a lack of farming expertise, and the overarching shadow of the Anglo-Spanish war. However, Raleigh’s failure was highly significant because it provided the ultimate blueprint for future success. It proved that private funding was not enough and that successful colonisation required massive, state-backed investment and a focus on sustainable farming rather than aggressive military conquest. These harsh lessons laid the foundation for the successful establishment of Jamestown shortly after Elizabeth's death."
        }
    ],
    exam_practice: [
        {
            type: "12_marks",
            question: "Explain why the English attempt to colonise Virginia in 1585–87 failed.",
            examiner_tip: "To achieve Level 4, ensure you explain the *interaction* between the different causes of failure.\n\n**Paragraph 1 (Supplies & Planning):** Explain how the physical damage to the ship *The Tiger* ruined their food/seeds, and how a lack of farming skills *exacerbated* the crisis, forcing them to rely on Algonquian fish weirs.\n\n**Paragraph 2 (Native American Resistance & Leadership):** Explain how Ralph Lane's aggressive military tactics and the spread of English disease acted as a *catalyst for* conflict, leading to the murder of Chief Wingina and making the 1585 colony untenable.\n\n**Paragraph 3 (The Spanish Armada):** Focus on the 1587 colony. Explain how the failure was *intrinsically linked* to the war with Spain; because all ships were requisitioned to fight the 1588 Armada, John White could not return with rescue supplies for three years, leading to the 'Lost Colony'."
        }
    ],
    recall_questions: [
        { q: "In what year did Queen Elizabeth grant Walter Raleigh a Royal Charter?", a: "1584" },
        { q: "What traditional European English trade market had collapsed, encouraging New World expansion?", a: "The Antwerp cloth market" },
        { q: "What name was given to the new territory in North America in honour of Elizabeth?", a: "Virginia" },
        { q: "Did Walter Raleigh personally lead the expeditions to North America?", a: "No, Elizabeth refused to let him leave court" },
        { q: "Name the two Native Americans brought to England in 1584 to help with translation.", a: "Manteo and Wanchese" },
        { q: "Strategically, what did the English hope to use a colony in Virginia for?", a: "As a hidden base for privateers to attack Spanish treasure ships" },
        { q: "On which specific island was the colony established?", a: "Roanoke Island" },
        { q: "Who was the aggressive military governor of the 1585 expedition?", a: "Ralph Lane" },
        { q: "Who was the brilliant mathematician and mapmaker on the 1585 expedition?", a: "Thomas Harriot" },
        { q: "What was the name of the flagship that hit a sandbank, ruining the food and seeds?", a: "The Tiger" },
        { q: "Why were the 1585 colonists poorly suited to building a settlement?", a: "They were mostly soldiers and gentlemen with no farming skills" },
        { q: "Which Native American Chief turned against the English and was killed by Ralph Lane?", a: "Chief Wingina" },
        { q: "Apart from violence, what unwittingly killed many Native Americans?", a: "European diseases to which they had no immunity" },
        { q: "Who rescued the surviving 1585 colonists and took them back to England?", a: "Francis Drake" },
        { q: "How did the demographics of the 1587 expedition differ from the 1585 expedition?", a: "It included families, women, and children with farming skills" },
        { q: "Who was the leader of the 1587 expedition?", a: "John White" },
        { q: "Why were the Native Americans immediately hostile to the 1587 colonists?", a: "Because of the violence and murders committed by Ralph Lane's men in 1585" },
        { q: "Why was John White unable to return to Virginia with supplies in 1588?", a: "Elizabeth banned all ships from leaving England to fight the Spanish Armada" },
        { q: "How long was John White stranded in England?", a: "Three years / until 1590" },
        { q: "What single word was found carved into a post when White finally returned?", a: "CROATOAN" }
    ],
    do_now: {
        type: "questions",
        tasks: [
            { q: "How much Spanish treasure did Francis Drake capture during his circumnavigation?", a: "£400,000" },
            { q: "What was the purpose of an 'astrolabe'?", a: "It was a navigational instrument used by sailors to determine their latitude by the position of the stars." },
            { q: "Why was the 1576 Poor Relief Act considered a turning point in government attitudes to poverty?", a: "It finally recognised that some able-bodied people genuinely wanted to work but couldn't, providing them with raw materials instead of just brutal punishment." },
            { q: "15 Second Challenge", a: "Try to speak for 15 seconds non-stop about the Battle of Gravelines." }
        ]
    }
};

const existingIndex = unitData.lessons.findIndex(l => l.id === "lesson_3_4");
if (existingIndex !== -1) {
    unitData.lessons[existingIndex] = newLesson;
} else {
    unitData.lessons.push(newLesson);
}

unitData.lessons.sort((a, b) => a.id.localeCompare(b.id));

const newIndividuals = [
    {
        "id": "thomas_harriot",
        "name": "Thomas Harriot",
        "role": "Mathematician and Scientist",
        "bio": "A brilliant mathematician and scientist who accompanied the 1585 Roanoke expedition. He was responsible for mapping the new territory and studying the local resources.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "manteo_wanchese",
        "name": "Manteo and Wanchese",
        "role": "Algonquian Emissaries",
        "bio": "Two Native Americans brought back to England in 1584 by Raleigh's explorers. They helped the English learn the Algonquian language and provided vital intelligence about Roanoke.",
        "image": "/assets/placeholder_cover.jpg"
    }
];

newIndividuals.forEach(ind => {
    if (!unitData.key_individuals.find(k => k.id === ind.id)) {
        unitData.key_individuals.push(ind);
    }
});

fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
console.log("Successfully injected lesson_3_4 to eee/data.js and added Key Individuals.");
